import { NextRequest, NextResponse } from 'next/server';
import { TimelineService } from '../../../services/timelineService';
import { ProfileRepository } from '../../../repositories/profileRepository';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import { createClient } from '@supabase/supabase-js';
import { getUser } from '../../../lib/supabase';
import { aiService } from '../../../services/aiService';
import { Profile, Timeline } from '../../../services/types';

type ScenarioType = 'conservative' | 'balanced' | 'aggressive';

interface GenerateFromProfileBody {
    profileId?: string;
    profile?: Profile;
    forceRegenerate?: boolean;
    scenarioType?: ScenarioType;
    provider?: string;
}

export async function POST(request: NextRequest) {
  console.log('🔍 [generate-from-profile] API call started');
  
  try {
    const user = await getUser(request);
    const userId = user?.id;

    console.log('👤 User authentication:', { hasUser: !!user, userId });

    if (!user || !userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const aiStatus = await aiService.getStatus(userId, CredentialsRepository);
    console.log('🤖 AI Status check:', aiStatus);
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
    
    let body: GenerateFromProfileBody & { provider?: string };
    try {
      body = await request.json();
      console.log('📨 Request body received:', {
        hasProfileId: !!body.profileId,
        hasProfile: !!body.profile,
        profileName: body.profile?.companyName || 'N/A',
        forceRegenerate: body.forceRegenerate,
        scenarioType: body.scenarioType,
        provider: body.provider
      });
    } catch (error) {
      console.error('❌ Invalid JSON in request body:', error);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { profileId, profile, forceRegenerate = false, scenarioType, provider } = body;
    
    console.log(`📝 Request details: profileId=${profileId}, userId=${userId}, forceRegenerate=${forceRegenerate}, scenarioType=${scenarioType}, provider=${provider}`);

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json({ error: 'Authorization header is required' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: authHeader
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

    let targetProfile: Profile | null = profile || null;

    if (profileId && !profile) {
      try {
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
        
        targetProfile = transformFromDatabase(profileFromDb);
      } catch (error: any) {
        return NextResponse.json(
          { 
            error: 'Failed to fetch profile',
            details: error.message
          },
          { status: 500 }
        );
      }
    }

    if (!targetProfile) {
      return NextResponse.json(
        { error: 'No valid profile data provided' },
        { status: 400 }
      );
    }

    console.log('📊 Target profile structure:', {
      companyName: targetProfile.companyName,
      industry: targetProfile.industry,
      employeeCount: targetProfile.employeeCount,
      strategicInitiativesCount: targetProfile.strategicInitiatives?.length || 0,
      systemsCount: targetProfile.systemsAndApplications?.length || 0,
      hasId: !!targetProfile.id
    });

    if (!targetProfile.companyName) {
      console.error('❌ Profile validation failed: missing company name');
      return NextResponse.json(
        { 
          error: 'Invalid profile data', 
          details: 'Profile must include company name' 
        },
        { status: 400 }
      );
    }

    try {
      let timeline: Timeline | null = null;
      let cached = false;
      let generatedAt = new Date().toISOString();
      let finalScenarioType: ScenarioType = scenarioType || determineScenarioType(targetProfile);
      let unsavedProfile = !targetProfile.id;

      const hasProfileId = targetProfile && targetProfile.id;
      
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
            if (error && error.code !== 'PGRST116') {
                console.error('Cache check error:', error);
            }
            console.log(`💾 No cached timeline found for profile ${targetProfile.id}`);
          }
        } catch (cacheError: any) {
          console.warn('⚠️ Could not access timeline cache:', cacheError.message);
        }
      }

      if (!timeline) {
        if (hasProfileId) {
          console.log(`🔄 Generating new timeline for profile ${targetProfile.id}`);
        } else {
          console.log(`🔄 Generating timeline for unsaved profile (${targetProfile.companyName || 'unnamed'})`);
        }

        let generatedTimeline = await TimelineService.generateTimeline(
          targetProfile,
          finalScenarioType, 
          userId,
          CredentialsRepository,
          provider
        );
        
        timeline = enhanceTimelineWithProfile(generatedTimeline, targetProfile);

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
          } catch (saveError: any) {
            console.warn('⚠️ Could not save timeline to cache:', saveError.message);
          }
        }
      }

      // Get the actual provider status used for generation
      const actualProviderStatus = cached 
        ? { provider: 'Database Cache' }
        : await aiService.getStatus(userId, CredentialsRepository, provider);

      return NextResponse.json({
        success: true,
        timeline: timeline,
        profileId: targetProfile.id || null,
        profileName: targetProfile.companyName,
        cached: cached,
        generatedAt: generatedAt,
        scenarioType: finalScenarioType,
        unsavedProfile: unsavedProfile,
        provider: actualProviderStatus.provider,
        method: unsavedProfile ? 'Profile-Based Generation (Unsaved)' : 'Profile-Based Generation with Caching'
      });

    } catch (serviceError: any) {
      console.error('Timeline generation service error:', serviceError);
      
      return NextResponse.json(
        { 
          error: 'AI timeline generation failed', 
          details: serviceError.message,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
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

function determineScenarioType(profile: Profile): ScenarioType {
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

function enhanceTimelineWithProfile(timeline: Timeline, profile: Profile): Timeline {
  if (timeline.phases) {
    timeline.phases = timeline.phases.map((phase, index) => ({
      ...phase,
      profileInsights: getPhaseInsights(profile, index),
      specificOpportunities: getPhaseOpportunities(profile, index)
    }));
  }
  
  timeline.riskFactors = identifyRiskFactors(profile);
  timeline.competitiveContext = getCompetitiveContext(profile);
  
  return timeline;
}

function getPhaseInsights(profile: Profile, phaseIndex: number): string {
  const insights: { [key: number]: string } = {
    0: `Focus on ${profile.primaryBusinessIssue || 'core challenges'} while building foundation`,
    1: `Address ${profile.topProblem || 'key issues'} with targeted automation`,
    2: `Scale successful pilots across ${profile.size || 'the organization'}`,
    3: `Optimize for ${profile.successMetrics?.join(', ') || 'key performance'} improvements`
  };
  
  return insights[phaseIndex] || 'Continue systematic AI adoption';
}

function getPhaseOpportunities(profile: Profile, phaseIndex: number): any[] {
  return [];
}

function identifyRiskFactors(profile: Profile): any[] {
  const risks: any[] = [];
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

function getCompetitiveContext(profile: Profile): any {
  return {
    urgency: profile.competitivePressure ? 'High' : 'Medium',
    differentiators: profile.differentiationRequirements || [],
    marketPosition: profile.industry === 'Technology' ? 'Fast-moving' : 'Traditional'
  };
}

function transformFromDatabase(dbRecord: any): Profile {
  const { id: oldId, ...profileDataWithoutId } = dbRecord.profile_data || {};
  
  return {
    id: dbRecord.id,
    ...profileDataWithoutId,
    markdown: dbRecord.markdown_content,
    createdAt: dbRecord.created_at,
    updatedAt: dbRecord.updated_at,
    status: 'draft',
    _supabaseRecord: true,
    _userId: dbRecord.user_id,
    _originalId: oldId || null
  };
} 