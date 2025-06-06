import { NextResponse } from 'next/server';
import { ProfileRepository } from '../../../repositories/profileRepository';
import { markdownService } from '../../../services/markdownService';
import { TimelineService } from '../../../services/timelineService';

/**
 * Generate Timeline from Client Profile
 * 
 * This endpoint generates AI timelines using the full client profile context
 * including all the rich markdown data for better AI recommendations.
 */
export async function POST(request) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'AI timeline generation not available', 
          details: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.',
          configured: false
        },
        { status: 503 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { profileId, profile } = body;

    if (!profile && !profileId) {
      return NextResponse.json(
        { error: 'Either profile data or profileId is required' },
        { status: 400 }
      );
    }

    let targetProfile = profile;

    // If profileId is provided but no profile data, fetch it
    if (profileId && !profile) {
      try {
        // Use ProfileRepository directly for server-side access
        targetProfile = await ProfileRepository.getProfile(profileId, null); // null userId for now
        if (!targetProfile) {
          return NextResponse.json(
            { error: 'Profile not found' },
            { status: 404 }
          );
        }
      } catch (error) {
        return NextResponse.json(
          { 
            error: 'Failed to fetch profile',
            details: error.message
          },
          { status: 500 }
        );
      }
    }

    // Validate profile has minimum required data
    if (!targetProfile.companyName) {
      return NextResponse.json(
        { 
          error: 'Invalid profile data', 
          details: 'Profile must include company name' 
        },
        { status: 400 }
      );
    }

    // Generate timeline using server-side logic
    try {
      // Generate full markdown representation of the client profile
      const profileMarkdown = markdownService.generateMarkdown(targetProfile);
      
      // Extract business profile data for metadata and scenario determination
      const businessProfile = extractBusinessProfile(targetProfile);
      
      // Determine scenario type based on profile characteristics
      const scenarioType = determineScenarioType(targetProfile);
      
      // Generate timeline using the full markdown for richer context
      const timeline = await TimelineService.generateTimelineFromMarkdown(profileMarkdown, scenarioType, businessProfile);
      
      // Enhance timeline with profile-specific insights
      const enhancedTimeline = enhanceTimelineWithProfile(timeline, targetProfile);

      return NextResponse.json({
        success: true,
        timeline: enhancedTimeline,
        profileId: targetProfile.id,
        profileName: targetProfile.companyName,
        generatedAt: new Date().toISOString(),
        provider: 'OpenAI GPT-4o',
        method: 'Full Profile Markdown Context'
      });

    } catch (serviceError) {
      console.error('Timeline generation service error:', serviceError);
      
      // Provide transparent error information
      return NextResponse.json(
        { 
          error: 'AI timeline generation failed', 
          details: serviceError.message,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Timeline from profile API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * Server-side helper functions (copied from ProfileService for server-side use)
 */

function extractBusinessProfile(profile) {
  return {
    companyName: profile.companyName,
    industry: profile.industry,
    companySize: mapCompanySize(profile.size),
    aiMaturityLevel: calculateAIMaturity(profile),
    primaryGoals: extractPrimaryGoals(profile),
    currentTechStack: profile.currentTechnology || [],
    budget: estimateBudgetRange(profile),
    timeframe: extractTimeframe(profile)
  };
}

function mapCompanySize(size) {
  const sizeMap = {
    'Small (50-500)': 'small',
    'Mid-Market (500-5K)': 'medium',
    'Enterprise (5K+)': 'large',
    'Small': 'small',
    'Medium': 'medium',
    'Large': 'large'
  };
  return sizeMap[size] || 'medium';
}

function calculateAIMaturity(profile) {
  const score = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
  if (score >= 8) return 'advanced';
  if (score >= 6) return 'intermediate';
  if (score >= 4) return 'beginner';
  return 'minimal';
}

function extractPrimaryGoals(profile) {
  const goals = [];
  if (profile.valueSellingFramework?.businessIssues) {
    goals.push(...profile.valueSellingFramework.businessIssues);
  }
  if (profile.primaryBusinessIssue) {
    goals.push(profile.primaryBusinessIssue);
  }
  return goals.slice(0, 3); // Limit to top 3 goals
}

function estimateBudgetRange(profile) {
  const budget = profile.valueSellingFramework?.decisionMakers?.economicBuyer?.budget;
  if (budget) {
    return budget;
  }
  
  // Estimate based on company size and impact
  const impact = profile.valueSellingFramework?.impact?.totalAnnualImpact || 0;
  if (impact > 5000000) return '>5m';
  if (impact > 1000000) return '1m-5m';
  if (impact > 500000) return '500k-1m';
  if (impact > 100000) return '100k-500k';
  return '<100k';
}

function extractTimeframe(profile) {
  const timeline = profile.valueSellingFramework?.buyingProcess?.timeline;
  if (timeline) {
    const months = parseInt(timeline);
    if (months <= 3) return '3months';
    if (months <= 6) return '6months';
    if (months <= 12) return '1year';
    return '2years+';
  }
  return '1year'; // Default
}

function determineScenarioType(profile) {
  const aiReadiness = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
  const decisionTimeline = profile.decisionTimeline || 12;
  const riskTolerance = profile.riskTolerance || 'medium';
  
  if (aiReadiness >= 8 && decisionTimeline <= 6 && riskTolerance === 'high') {
    return 'aggressive';
  } else if (aiReadiness <= 4 || decisionTimeline >= 18 || riskTolerance === 'low') {
    return 'conservative';
  }
  return 'balanced';
}

function enhanceTimelineWithProfile(timeline, profile) {
  // Add profile-specific insights to each phase
  if (timeline.phases) {
    timeline.phases = timeline.phases.map((phase, index) => ({
      ...phase,
      profileInsights: getPhaseInsights(profile, index),
      specificOpportunities: getPhaseOpportunities(profile, index)
    }));
  }
  
  // Add risk factors based on profile
  timeline.riskFactors = identifyRiskFactors(profile);
  
  // Add competitive insights
  timeline.competitiveContext = getCompetitiveContext(profile);
  
  return timeline;
}

function getPhaseInsights(profile, phaseIndex) {
  const insights = {
    0: `Focus on ${profile.primaryBusinessIssue || 'core challenges'} while building foundation`,
    1: `Address ${profile.topProblem || 'key issues'} with targeted automation`,
    2: `Scale successful pilots across ${profile.size || 'the organization'}`,
    3: `Optimize for ${profile.successMetrics?.join(', ') || 'key performance'} improvements`
  };
  
  return insights[phaseIndex] || 'Continue systematic AI adoption';
}

function getPhaseOpportunities(profile, phaseIndex) {
  // This would be more sophisticated in a real implementation
  return [];
}

function identifyRiskFactors(profile) {
  const risks = [];
  
  if (profile.aiOpportunityAssessment?.aiReadinessScore < 5) {
    risks.push('Low AI readiness may slow adoption');
  }
  
  if (profile.valueSellingFramework?.buyingProcess?.timeline > 12) {
    risks.push('Extended decision timeline may impact momentum');
  }
  
  return risks;
}

function getCompetitiveContext(profile) {
  return {
    industry: profile.industry,
    competitivePressure: 'Moderate',
    marketPosition: 'Stable'
  };
} 