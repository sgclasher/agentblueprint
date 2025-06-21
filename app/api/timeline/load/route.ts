import { NextRequest, NextResponse } from 'next/server';
import { ProfileRepository } from '../../../repositories/profileRepository';
import { getUser } from '../../../lib/supabase';

export async function GET(request: NextRequest) {
  console.log('🔍 [timeline/load] API call started');
  
  try {
    const user = await getUser(request);
    const userId = user?.id;

    console.log('👤 User authentication:', { hasUser: !!user, userId });

    if (!user || !userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const scenarioType = searchParams.get('scenarioType') || 'balanced';
    const includeMetadata = searchParams.get('includeMetadata') === 'true';

    console.log('📊 Load request params:', { scenarioType, includeMetadata });

    try {
      // Get cached timeline data
      const cachedTimeline = await ProfileRepository.getCachedTimeline(userId);
      
      if (!cachedTimeline) {
        console.log('💾 No cached timeline found');
        return NextResponse.json({
          success: true,
          timeline: null,
          cached: false,
          message: 'No cached timeline found'
        });
      }

      // Check if scenario matches requested scenario
      const timelineScenario = cachedTimeline._scenarioType || 'balanced';
      const scenarioMatches = timelineScenario === scenarioType;

      if (!scenarioMatches) {
        console.log(`🔄 Scenario mismatch: requested ${scenarioType}, cached ${timelineScenario}`);
        return NextResponse.json({
          success: true,
          timeline: null,
          cached: false,
          scenarioMismatch: true,
          cachedScenario: timelineScenario,
          requestedScenario: scenarioType,
          message: `Cached timeline is for ${timelineScenario} scenario, but ${scenarioType} was requested`
        });
      }

      console.log('✅ Cached timeline loaded successfully');

      // Prepare response
      const response: any = {
        success: true,
        timeline: cachedTimeline,
        cached: true,
        generatedAt: cachedTimeline._generatedAt,
        scenarioType: timelineScenario,
        method: 'Cached Load'
      };

      // Include metadata if requested
      if (includeMetadata) {
        const metadata = await ProfileRepository.getTimelineMetadata(userId);
        response.metadata = metadata;
      }

      return NextResponse.json(response);

    } catch (repositoryError: any) {
      console.error('Timeline load repository error:', repositoryError);
      
      return NextResponse.json(
        { 
          error: 'Failed to load timeline from cache', 
          details: repositoryError.message,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Timeline load API error:', error);
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

// POST method for more complex load requests
export async function POST(request: NextRequest) {
  console.log('🔍 [timeline/load] POST API call started');
  
  try {
    const user = await getUser(request);
    const userId = user?.id;

    if (!user || !userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    let body: any;
    try {
      body = await request.json();
    } catch (error) {
      console.error('❌ Invalid JSON in request body:', error);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { scenarioType = 'balanced', includeMetadata = false, forceRefresh = false } = body;

    console.log('📊 POST Load request:', { scenarioType, includeMetadata, forceRefresh });

    // If forceRefresh is true, redirect to generation API
    if (forceRefresh) {
      console.log('🔄 Force refresh requested, redirecting to generation API');
      return NextResponse.json({
        success: false,
        shouldRegenerate: true,
        message: 'Force refresh requested, use generation API'
      });
    }

    // Use same logic as GET method
    const cachedTimeline = await ProfileRepository.getCachedTimeline(userId);
    
    if (!cachedTimeline) {
      return NextResponse.json({
        success: true,
        timeline: null,
        cached: false,
        message: 'No cached timeline found'
      });
    }

    const timelineScenario = cachedTimeline._scenarioType || 'balanced';
    const scenarioMatches = timelineScenario === scenarioType;

    if (!scenarioMatches) {
      return NextResponse.json({
        success: true,
        timeline: null,
        cached: false,
        scenarioMismatch: true,
        cachedScenario: timelineScenario,
        requestedScenario: scenarioType,
        message: `Cached timeline is for ${timelineScenario} scenario`
      });
    }

    const response: any = {
      success: true,
      timeline: cachedTimeline,
      cached: true,
      generatedAt: cachedTimeline._generatedAt,
      scenarioType: timelineScenario,
      method: 'Cached Load (POST)'
    };

    if (includeMetadata) {
      const metadata = await ProfileRepository.getTimelineMetadata(userId);
      response.metadata = metadata;
    }

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Timeline load POST API error:', error);
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