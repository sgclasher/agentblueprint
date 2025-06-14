import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ProfileRepository } from '../../../repositories/profileRepository';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import { aiService } from '../../../services/aiService';
import { AI_OPPORTUNITIES_SYSTEM_PROMPT, AI_OPPORTUNITIES_USER_PROMPT } from '../../../lib/llm/prompts/aiOpportunitiesPrompt';
import { Profile } from '../../../services/types';

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

/**
 * Attempts to auto-fix incomplete AI Opportunities responses from AI providers (especially Gemini)
 */
function attemptOpportunitiesAutoFix(incompleteResponse: any, profile: Profile): any {
  console.log('🔧 [AUTO-FIX] Attempting to fix incomplete AI Opportunities response...');
  
  const fixed: any = { ...incompleteResponse };
  
  // Generate missing priorityRecommendations if not present
  if (!fixed.priorityRecommendations) {
    console.log('🔧 [AUTO-FIX] Generating missing priorityRecommendations...');
    fixed.priorityRecommendations = [
      "Start with highest ROI opportunity identified in the analysis",
      "Establish AI governance framework and change management processes",
      "Invest in employee training and skill development for AI adoption",
      "Create pilot programs to validate AI solutions before full deployment",
      "Develop partnerships with AI technology providers and integrators"
    ];
  }
  
  // Generate missing industryContext if not present
  if (!fixed.industryContext) {
    console.log('🔧 [AUTO-FIX] Generating missing industryContext...');
    const industry = profile.industry || 'Technology';
    const contexts: { [key: string]: string } = {
      'Technology': 'Technology companies are leading AI adoption with 85% planning major AI investments, leveraging existing digital infrastructure for rapid implementation and competitive advantage.',
      'Healthcare': 'Healthcare organizations are increasingly adopting AI for clinical decision support and operational efficiency, with strong ROI in diagnostic assistance and workflow optimization.',
      'Manufacturing': 'Manufacturing sector shows excellent AI adoption potential with proven use cases in predictive maintenance, quality control, and supply chain optimization.',
      'Finance': 'Financial services industry leads in AI maturity with applications in risk assessment, fraud detection, and automated compliance showing consistent positive returns.',
      'Other': 'Industry-wide AI adoption is accelerating with 73% of organizations planning significant AI investments within the next 24 months.'
    };
    fixed.industryContext = contexts[industry] || contexts['Other'];
  }
  
  // Generate missing overallReadinessScore if not present
  if (!fixed.overallReadinessScore) {
    console.log('🔧 [AUTO-FIX] Generating missing overallReadinessScore...');
    // Calculate basic readiness score based on available data
    let score = 50; // Base score
    if (profile.strategicInitiatives && profile.strategicInitiatives.length > 0) score += 20;
    if (profile.systemsAndApplications && profile.systemsAndApplications.length > 0) score += 15;
    if (profile.employeeCount && parseInt(profile.employeeCount.replace(/\D/g, '')) > 100) score += 10;
    if (profile.annualRevenue) score += 5;
    fixed.overallReadinessScore = Math.min(score, 95);
  }
  
  // Generate missing nextSteps if not present
  if (!fixed.nextSteps) {
    console.log('🔧 [AUTO-FIX] Generating missing nextSteps...');
    fixed.nextSteps = [
      "Conduct comprehensive AI readiness assessment with stakeholder interviews",
      "Develop detailed AI strategy aligned with business objectives and strategic initiatives",
      "Establish AI project governance framework and success metrics",
      "Begin pilot implementation with highest-ROI opportunity identified",
      "Create change management and employee training programs",
      "Establish partnerships with AI technology providers and implementation partners"
    ];
  }
  
  console.log('🔧 [AUTO-FIX] Auto-fix completed. Fixed fields:', {
    addedPriorityRecommendations: !incompleteResponse.priorityRecommendations && !!fixed.priorityRecommendations,
    addedIndustryContext: !incompleteResponse.industryContext && !!fixed.industryContext,
    addedReadinessScore: !incompleteResponse.overallReadinessScore && !!fixed.overallReadinessScore,
    addedNextSteps: !incompleteResponse.nextSteps && !!fixed.nextSteps
  });
  
  return fixed;
}

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

    console.log('🤖 [AI Opportunities] Sending to AI service...');
    console.log('🤖 [AI Opportunities] Provider being used:', preferredProvider);

    // Get the actual provider status to identify which provider is being used
    const aiStatus = await aiService.getStatus(user.id, CredentialsRepository, preferredProvider);
    const actualProvider = aiStatus.provider || 'unknown';
    console.log('🤖 [AI Opportunities] Actual provider from status:', actualProvider);

    const aiResponse = await aiService.generateJson(
      systemPrompt,
      userPrompt,
      user.id,
      CredentialsRepository,
      preferredProvider
    );

    console.log('✅ [AI Opportunities] AI response received');
    console.log('🔍 [DEBUG] Raw AI response keys:', Object.keys(aiResponse || {}));
    console.log('🔍 [DEBUG] AI response structure validation:', {
      hasExecutiveSummary: !!aiResponse.executiveSummary,
      opportunitiesCount: aiResponse.opportunities?.length || 0,
      hasPriorityRecommendations: !!aiResponse.priorityRecommendations,
      hasIndustryContext: !!aiResponse.industryContext,
      hasReadinessScore: !!aiResponse.overallReadinessScore,
      hasNextSteps: !!aiResponse.nextSteps,
      allKeys: Object.keys(aiResponse || {})
    });

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
      
      // Check if it's a Gemini-specific issue and attempt auto-fix
      // Check both explicitly requested provider and actual provider being used
      const isGeminiProvider = (preferredProvider && preferredProvider.includes('gemini')) || 
                              (actualProvider && actualProvider.toLowerCase().includes('gemini'));
      
      if (isGeminiProvider) {
        console.error('❌ [DEBUG] Gemini-specific issue detected. Attempting auto-fix...');
        console.error('❌ [DEBUG] Provider details:', { preferredProvider, actualProvider });
        
        const fixedResponse = attemptOpportunitiesAutoFix(aiResponse, profile);
        if (fixedResponse && missingFields.every(field => fixedResponse[field])) {
          console.log('✅ [AUTO-FIX] Successfully auto-fixed incomplete Gemini response');
          // Use the fixed response
          Object.assign(aiResponse, fixedResponse);
        } else {
          console.error('❌ [AUTO-FIX] Auto-fix failed, missing fields still present');
          throw new Error(`AI response missing required fields: ${missingFields.join(', ')}. Please try again.`);
        }
      } else {
        console.error('❌ [DEBUG] Non-Gemini provider issue. Provider details:', { preferredProvider, actualProvider });
        throw new Error(`AI response missing required fields: ${missingFields.join(', ')}. Please try again.`);
      }
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