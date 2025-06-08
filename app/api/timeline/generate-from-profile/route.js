import { NextResponse } from 'next/server';
import { markdownService } from '../../../services/markdownService';
import { TimelineService } from '../../../services/timelineService';
import { ProfileRepository } from '../../../repositories/profileRepository';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import { createClient } from '@supabase/supabase-js';
import { getUser } from '../../../lib/supabase';
import { aiService } from '../../../services/aiService';

/**
 * Generate Timeline from Client Profile with Database Caching
 * 
 * This endpoint generates AI timelines using the full client profile context
 * with intelligent caching to avoid unnecessary API calls.
 * 
 * Supports:
 * - Cache-first timeline loading
 * - Force regeneration with forceRegenerate parameter
 * - Scenario type override
 */
export async function POST(request) {
  try {
    // Note: The environment variable check is now a fallback. 
    // The primary check is user-configured providers inside TimelineService.
    const user = await getUser(request);
    const userId = user?.id;

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Early check for any configured AI provider for this user
    const aiStatus = await aiService.getStatus(userId, CredentialsRepository);
    if (!aiStatus.configured) {
      return NextResponse.json(
        { 
          error: 'AI provider not configured', 
          details: 'Please configure an AI provider in the admin settings or set a system-wide OPENAI_API_KEY.',
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

    const { profileId, profile, forceRegenerate = false, scenarioType } = body;
    
    console.log(`📝 Request: profileId=${profileId}, userId=${userId}, forceRegenerate=${forceRegenerate}, scenarioType=${scenarioType}`);

    // Create a new Supabase client authenticated with the user's token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: request.headers.get('authorization')
          }
        }
      }
    );

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
        // Use the authenticated client to respect RLS
        const { data: profileFromDb, error } = await supabase
          .from('client_profiles')
          .select('*')
          .eq('id', profileId)
          .single();
        
        if (error || !profileFromDb) {
          return NextResponse.json(
            { error: 'Profile not found' },
            { status: 404 }
          );
        }
        
        targetProfile = ProfileRepository.transformFromDatabase(profileFromDb);
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

    // For direct profile data (from ProfileWizard), ensure we have the data we need
    if (!targetProfile) {
      return NextResponse.json(
        { error: 'No valid profile data provided' },
        { status: 400 }
      );
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

    // Generate timeline with server-side caching logic
    try {
      let timeline;
      let cached = false;
      let generatedAt = new Date().toISOString();
      let finalScenarioType = scenarioType || determineScenarioType(targetProfile);
      let unsavedProfile = !targetProfile.id;

      // Check if profile has an ID (is saved to database)
      const hasProfileId = targetProfile && targetProfile.id;
      
      // Try to get cached timeline first (only for saved profiles with authentication and unless forced to regenerate)
      if (hasProfileId && !forceRegenerate) {
        try {
          console.log(`🔍 Checking cache for profile ${targetProfile.id}`);
          
          const { data, error } = await supabase
            .from('client_profiles')
            .select('timeline_data, last_timeline_generated_at')
            .eq('id', targetProfile.id)
            .single();
            
          if (!error && data?.timeline_data) {
            const cachedScenarioType = data.timeline_data.scenarioType || 'balanced';
            
            // Check if scenario matches (if specified)
            if (!scenarioType || cachedScenarioType === scenarioType) {
              console.log(`✅ Using cached timeline for profile ${targetProfile.id} (scenario: ${cachedScenarioType})`);
              timeline = data.timeline_data;
              cached = true;
              generatedAt = data.last_timeline_generated_at;
              finalScenarioType = cachedScenarioType;
            } else {
              console.log(`🔄 Cache exists but scenario mismatch: requested ${scenarioType}, cached ${cachedScenarioType}`);
            }
          } else {
            if (error && error.code !== 'PGRST116') { // Don't log "not found" as an error
                console.error('Cache check error:', error);
            }
            console.log(`💾 No cached timeline found for profile ${targetProfile.id}`);
          }
        } catch (cacheError) {
          console.warn('⚠️ Could not access timeline cache:', cacheError.message);
          // Continue with generation if cache access fails
        }
      }

      // Generate new timeline if not cached
      if (!timeline) {
        if (hasProfileId) {
          console.log(`🔄 Generating new timeline for profile ${targetProfile.id}`);
        } else {
          console.log(`🔄 Generating timeline for unsaved profile (${targetProfile.companyName || 'unnamed'})`);
        }

        // Generate full markdown representation of the client profile
        // const profileMarkdown = markdownService.generateMarkdown(targetProfile);
        
        // Generate timeline using the full markdown for richer context
        timeline = await TimelineService.generateTimeline(
          targetProfile,
          finalScenarioType, 
          userId,
          CredentialsRepository
        );
        
        // Enhance timeline with profile-specific insights
        timeline = enhanceTimelineWithProfile(timeline, targetProfile);

        // Save to database only if profile has an ID and user is authenticated
        if (hasProfileId) {
          try {
            console.log(`💾 Saving timeline to cache for profile ${targetProfile.id}`);
            
            const timelineWithMeta = {
              ...timeline,
              scenarioType: finalScenarioType,
              generatedAt: new Date().toISOString(),
              version: '1.0'
            };

            const { error } = await supabase
              .from('client_profiles')
              .update({
                timeline_data: timelineWithMeta,
                last_timeline_generated_at: new Date().toISOString()
              })
              .eq('id', targetProfile.id);
              
            if (error) {
              console.error('❌ Failed to save timeline to cache:', error);
            } else {
              console.log(`✅ Timeline cached successfully for profile ${targetProfile.id}`);
            }
          } catch (saveError) {
            console.warn('⚠️ Could not save timeline to cache:', saveError.message);
            // Don't fail the entire operation if caching fails
          }
        }
      }

      return NextResponse.json({
        success: true,
        timeline: timeline,
        profileId: targetProfile.id || null,
        profileName: targetProfile.companyName,
        cached: cached,
        generatedAt: generatedAt,
        scenarioType: finalScenarioType,
        unsavedProfile: unsavedProfile,
        provider: cached ? 'Database Cache' : aiStatus.provider,
        method: unsavedProfile ? 'Profile-Based Generation (Unsaved)' : 'Profile-Based Generation with Caching'
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
 * Server-side helper functions
 */

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
  const aiReadiness = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
  
  if (aiReadiness < 4) {
    risks.push({
      type: 'Technical Readiness',
      level: 'High',
      description: 'Low AI readiness score may slow implementation'
    });
  }
  
  if (profile.changeManagementCapability === 'Low') {
    risks.push({
      type: 'Change Management',
      level: 'Medium',
      description: 'Limited change management capability requires extra support'
    });
  }
  
  return risks;
}

function getCompetitiveContext(profile) {
  return {
    urgency: profile.competitivePressure ? 'High' : 'Medium',
    differentiators: profile.differentiationRequirements || [],
    marketPosition: profile.industry === 'Technology' ? 'Fast-moving' : 'Traditional'
  };
}

function transformFromDatabase(dbRecord) {
  // Extract profile data and ensure Supabase ID takes precedence
  const { id: oldId, ...profileDataWithoutId } = dbRecord.profile_data || {};
  
  return {
    id: dbRecord.id, // Always use the Supabase UUID as the primary ID
    ...profileDataWithoutId, // Spread profile data but exclude any old ID
    markdown: dbRecord.markdown_content,
    createdAt: dbRecord.created_at,
    updatedAt: dbRecord.updated_at,
    // Add database-specific fields
    _supabaseRecord: true,
    _userId: dbRecord.user_id,
    // Store the original localStorage ID for reference if needed
    _originalId: oldId || null
  };
} 