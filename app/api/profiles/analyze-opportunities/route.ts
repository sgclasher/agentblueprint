import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import { aiService } from '../../../services/aiService';
import { AI_OPPORTUNITIES_SYSTEM_PROMPT, AI_OPPORTUNITIES_USER_PROMPT } from '../../../lib/llm/prompts/aiOpportunitiesPrompt';
import { Profile } from '../../../services/types';
import { getUser } from '../../../lib/supabase';

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
    const { preferredProvider, forceRegenerate = false } = await request.json();

    // Verify authentication and get user
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get the user's profile using service role client (same pattern as /api/profiles/get)
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (profileError) {
      if (profileError.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Profile not found. Please create a profile first.' },
          { status: 404 }
        );
      }
      console.error('[AI Opportunities] Profile fetch error:', profileError);
      throw profileError;
    }

    // Transform profile to match expected format (same as /api/profiles/get)
    const profile = {
      id: profileData.id,
      ...profileData.profile_data,
      markdown: profileData.markdown_content,
      createdAt: profileData.created_at,
      updatedAt: profileData.updated_at,
    };

    // Check for cached opportunities (unless forcing regeneration)
    if (!forceRegenerate) {
      const { data: cacheData, error: cacheError } = await supabase
        .from('profiles')
        .select('ai_opportunities_cache')
        .eq('user_id', user.id)
        .single();
        
      const cachedOpportunities = cacheData?.ai_opportunities_cache || null;
      
      if (cachedOpportunities) {
        return NextResponse.json({
          success: true,
          opportunities: cachedOpportunities,
          cached: true,
          provider: cachedOpportunities.analysisMetadata?.provider || 'cached'
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

    // Basic validation
    if (!aiResponse || typeof aiResponse !== 'object' || !aiResponse.opportunities) {
      console.error('[AI Opportunities] Invalid AI response:', aiResponse);
      throw new Error('Invalid AI response format');
    }

    // Add metadata
    const opportunitiesAnalysis = {
      ...aiResponse,
      generatedAt: new Date().toISOString(),
      profileId: profile.id, // Keep for context, though not used for fetching
      analysisMetadata: {
        ...aiResponse.analysisMetadata,
        provider: actualProvider,
        version: '1.0'
      }
    };

    // Cache the opportunities analysis using service role client
    await supabase
      .from('profiles')
      .update({
        ai_opportunities_cache: opportunitiesAnalysis,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    return NextResponse.json({
      success: true,
      opportunities: opportunitiesAnalysis,
      cached: false,
      provider: actualProvider
    });

  } catch (error: any) {
    console.error('[AI Opportunities] Generation failed:', error);

    let errorMessage = 'Failed to generate AI opportunities analysis';
    let statusCode = 500;
    if (error.message?.includes('No AI provider configured')) {
      errorMessage = 'No AI provider configured. Please set up an AI provider in admin settings.';
      statusCode = 400;
    } else if (error.message?.includes('rate limit') || error.message?.includes('quota')) {
      errorMessage = 'AI service rate limit exceeded. Please try again later.';
      statusCode = 429;
    } else if (error.message?.includes('Authentication failed')) {
      errorMessage = 'Authentication failed. Please sign in again.';
      statusCode = 401;
    } else if (error.message?.includes('Profile not found')) {
      errorMessage = 'Profile not found. Please create your profile before generating opportunities.';
      statusCode = 404;
    } else if (error.message?.includes('Invalid AI response')) {
      errorMessage = 'AI service returned an invalid response. Please try again.';
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
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get cached opportunities using service role client directly
    const { data, error } = await supabase
      .from('profiles')
      .select('ai_opportunities_cache')
      .eq('user_id', user.id)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      console.error('[AI Opportunities] Cache fetch error:', error);
      throw error;
    }
    
    const cachedOpportunities = data?.ai_opportunities_cache || null;

    if (!cachedOpportunities) {
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
      opportunities: cachedOpportunities,
      cached: true,
      provider: cachedOpportunities.analysisMetadata?.provider || 'cached'
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