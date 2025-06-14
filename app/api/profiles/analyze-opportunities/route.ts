import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ProfileRepository } from '../../../repositories/profileRepository';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import { aiService } from '../../../services/aiService';
import { AI_OPPORTUNITIES_SYSTEM_PROMPT, AI_OPPORTUNITIES_USER_PROMPT } from '../../../lib/llm/prompts/aiOpportunitiesPrompt';

// Initialize Supabase client with service role for server-side operations
// SECURITY: This is secure because:
// 1. Service role key is never exposed to client (server-side only)
// 2. All requests are authenticated via JWT token verification
// 3. User ownership is explicitly verified with .eq('user_id', user.id)
// 4. This pattern is recommended by Supabase for API routes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { profileId, preferredProvider, forceRegenerate = false } = await request.json();

    if (!profileId) {
      return NextResponse.json(
        { success: false, error: 'Profile ID is required' },
        { status: 400 }
      );
    }

    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get the profile and verify user access using the service role client
    // Query the profile directly using the service role client to avoid client/server mismatch
    const { data: profileData, error: profileError } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('id', profileId)
      .eq('user_id', user.id)
      .single();
    
    if (profileError || !profileData) {
      return NextResponse.json(
        { success: false, error: 'Profile not found or access denied' },
        { status: 404 }
      );
    }
    
    // Transform the profile data using ProfileRepository's transform method
    const profile = ProfileRepository.transformFromDatabase(profileData);
    
    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Profile not found or access denied' },
        { status: 404 }
      );
    }

    // Check for cached opportunities (unless forcing regeneration)
    if (!forceRegenerate) {
      // Query cached opportunities directly using service role client
      const { data: cacheData, error: cacheError } = await supabase
        .from('client_profiles')
        .select('opportunities_data, last_opportunities_generated_at')
        .eq('id', profileId)
        .eq('user_id', user.id)
        .single();
        
      if (cacheData?.opportunities_data) {
        return NextResponse.json({
          success: true,
          opportunities: cacheData.opportunities_data,
          cached: true,
          generatedAt: cacheData.last_opportunities_generated_at,
          provider: cacheData.opportunities_data.analysisMetadata?.provider || 'cached'
        });
      }
    }

    // Check if user has any AI providers configured
    const isAIConfigured = await aiService.isConfigured(user.id, CredentialsRepository, preferredProvider);
    if (!isAIConfigured) {
      return NextResponse.json(
        {
          success: false,
          error: 'No AI provider configured. Please configure an AI provider in admin settings.',
          requiresSetup: true
        },
        { status: 400 }
      );
    }

    // Generate AI opportunities analysis
    const systemPrompt = AI_OPPORTUNITIES_SYSTEM_PROMPT;
    const userPrompt = AI_OPPORTUNITIES_USER_PROMPT(profile);

    const aiResponse = await aiService.generateJson(
      systemPrompt,
      userPrompt,
      user.id,
      CredentialsRepository,
      preferredProvider
    );

    // Validate the AI response structure
    if (!aiResponse || typeof aiResponse !== 'object') {
      console.error('[AI Opportunities] Invalid AI response:', aiResponse);
      throw new Error('Invalid AI response format');
    }

    // Ensure required fields are present
    const requiredFields = ['executiveSummary', 'opportunities', 'priorityRecommendations', 'industryContext', 'overallReadinessScore', 'nextSteps'];
    const missingFields = requiredFields.filter(field => !aiResponse[field]);
    
    if (missingFields.length > 0) {
      console.error('[AI Opportunities] Missing fields in AI response:', missingFields);
      console.error('[AI Opportunities] Full AI response:', JSON.stringify(aiResponse, null, 2));
      throw new Error(`AI response missing required fields: ${missingFields.join(', ')}. Please try again.`);
    }

    // Validate opportunities array
    if (!Array.isArray(aiResponse.opportunities) || aiResponse.opportunities.length === 0) {
      console.error('[AI Opportunities] Invalid opportunities array:', aiResponse.opportunities);
      throw new Error('AI response must include at least one opportunity. Please try again.');
    }

    // Add metadata
    const opportunitiesAnalysis = {
      ...aiResponse,
      generatedAt: new Date().toISOString(),
      profileId: profileId,
      analysisMetadata: {
        ...aiResponse.analysisMetadata,
        generatedBy: 'AI',
        provider: preferredProvider || 'default',
        version: '1.0'
      }
    };

    // Cache the opportunities analysis using service role client
    try {
      const { data: saveData, error: saveError } = await supabase
        .from('client_profiles')
        .update({
          opportunities_data: opportunitiesAnalysis,
          last_opportunities_generated_at: new Date().toISOString()
        })
        .eq('id', profileId)
        .eq('user_id', user.id)
        .select('id, opportunities_data, last_opportunities_generated_at');
        
      if (saveError) {
        console.error('[AI Opportunities] Failed to cache opportunities:', saveError);
      }
    } catch (cacheError) {
      console.error('[AI Opportunities] Exception during cache save:', cacheError);
    }

    return NextResponse.json({
      success: true,
      opportunities: opportunitiesAnalysis,
      cached: false,
      generatedAt: opportunitiesAnalysis.generatedAt,
      provider: preferredProvider || 'default'
    });

  } catch (error: any) {
    console.error('[AI Opportunities] Generation failed:', error);

    // Provide specific error messages for common issues
    let errorMessage = 'Failed to generate AI opportunities analysis';
    let statusCode = 500;

    if (error.message?.includes('No AI provider configured')) {
      errorMessage = 'No AI provider configured. Please set up an AI provider in admin settings.';
      statusCode = 400;
    } else if (error.message?.includes('rate limit') || error.message?.includes('quota')) {
      errorMessage = 'AI service rate limit exceeded. Please try again later.';
      statusCode = 429;
    } else if (error.message?.includes('Invalid or expired token')) {
      errorMessage = 'Authentication failed. Please sign in again.';
      statusCode = 401;
    } else if (error.message?.includes('Invalid AI response')) {
      errorMessage = 'AI service returned invalid response. Please try again.';
      statusCode = 502;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: statusCode }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Extract profileId from URL search params
    const url = new URL(request.url);
    const profileId = url.searchParams.get('profileId');

    if (!profileId) {
      return NextResponse.json(
        { success: false, error: 'Profile ID is required' },
        { status: 400 }
      );
    }

    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Get cached opportunities using service role client (same as POST handler)
    const { data: cacheData, error: cacheError } = await supabase
      .from('client_profiles')
      .select('opportunities_data, last_opportunities_generated_at')
      .eq('id', profileId)
      .eq('user_id', user.id)
      .single();

    if (!cacheData?.opportunities_data) {
      return NextResponse.json({
        success: true,
        hasOpportunities: false,
        cached: false,
        message: 'No cached opportunities found'
      });
    }
    return NextResponse.json({
      success: true,
      hasOpportunities: true,
      opportunities: cacheData.opportunities_data,
      cached: true,
      generatedAt: cacheData.last_opportunities_generated_at,
      provider: cacheData.opportunities_data.analysisMetadata?.provider || 'cached'
    });

  } catch (error: any) {
    console.error('[AI Opportunities] Get cached failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve cached opportunities',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
} 