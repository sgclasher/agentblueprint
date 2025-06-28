import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import { AgenticBlueprintService } from '../../../services/agenticBlueprintService';
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

export async function POST(request: NextRequest) {
  try {
    const { preferredProvider, forceRegenerate = false, selectedInitiativeIndex, specialInstructions, opportunityContext } = await request.json();

    // Verify authentication and get user
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get the user's profile using service role client
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
      console.error('[AI Blueprint] Profile fetch error:', profileError);
      throw profileError;
    }

    // Transform profile to match expected format
    const profile: Profile = {
      id: profileData.id,
      ...profileData.profile_data,
      markdown: profileData.markdown_content,
      createdAt: profileData.created_at,
      updatedAt: profileData.updated_at,
    };

    // Validate profile readiness for blueprint generation
    const readinessCheck = AgenticBlueprintService.validateProfileReadiness(profile);
    if (!readinessCheck.isReady) {
      return NextResponse.json(
        {
          success: false,
          error: 'Profile not ready for blueprint generation',
          readinessScore: readinessCheck.readinessScore,
          recommendations: readinessCheck.recommendations,
          requiresProfileUpdate: true
        },
        { status: 400 }
      );
    }

    // Check for cached blueprint (unless forcing regeneration)
    if (!forceRegenerate) {
      const { data: cacheData, error: cacheError } = await supabase
        .from('profiles')
        .select('agentic_blueprint_cache')
        .eq('user_id', user.id)
        .single();
        
      const cachedBlueprint = cacheData?.agentic_blueprint_cache || null;
      
      if (cachedBlueprint) {
        return NextResponse.json({
          success: true,
          blueprint: cachedBlueprint,
          cached: true,
          provider: cachedBlueprint.aiModel || 'cached'
        });
      }
    }

    // Generate agentic blueprint using service
    console.log('🤖 [AI Blueprint] Generating blueprint...');
    if (opportunityContext) {
      console.log('🎯 [AI Blueprint] Using opportunity context:', opportunityContext.title);
    }
    const blueprint = await AgenticBlueprintService.generateBlueprint(
      profile,
      user.id,
      CredentialsRepository,
      preferredProvider,
      selectedInitiativeIndex,
      specialInstructions,
      opportunityContext
    );

    console.log('✅ [AI Blueprint] Blueprint generated successfully');

    // Cache the blueprint using service role client
    await supabase
      .from('profiles')
      .update({
        agentic_blueprint_cache: blueprint,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    return NextResponse.json({
      success: true,
      blueprint: blueprint,
      cached: false,
      provider: blueprint.aiModel || 'unknown'
    });

  } catch (error: any) {
    console.error('[AI Blueprint] Generation failed:', error);

    let errorMessage = 'Failed to generate AI blueprint';
    let statusCode = 500;
    
    if (error.message?.includes('No AI provider configured')) {
      errorMessage = 'No AI provider configured. Please set up an AI provider in admin settings.';
      statusCode = 400;
    } else if (error.message?.includes('Profile must have at least one strategic initiative')) {
      errorMessage = 'Profile must have at least one strategic initiative to generate a blueprint.';
      statusCode = 400;
    } else if (error.message?.includes('rate limit') || error.message?.includes('quota')) {
      errorMessage = 'AI service rate limit exceeded. Please try again later.';
      statusCode = 429;
    } else if (error.message?.includes('Authentication failed')) {
      errorMessage = 'Authentication failed. Please sign in again.';
      statusCode = 401;
    } else if (error.message?.includes('Profile not found')) {
      errorMessage = 'Profile not found. Please create your profile before generating a blueprint.';
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

    // Get cached blueprint using service role client
    const { data, error } = await supabase
      .from('profiles')
      .select('agentic_blueprint_cache')
      .eq('user_id', user.id)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      console.error('[AI Blueprint] Cache fetch error:', error);
      throw error;
    }
    
    const cachedBlueprint = data?.agentic_blueprint_cache || null;

    if (!cachedBlueprint) {
      return NextResponse.json({
        success: true,
        hasBlueprint: false,
        cached: false,
        message: 'No cached blueprint found'
      });
    }

    return NextResponse.json({
      success: true,
      hasBlueprint: true,
      blueprint: cachedBlueprint,
      cached: true,
      provider: cachedBlueprint.aiModel || 'cached'
    });

  } catch (error: any) {
    console.error('[AI Blueprint] Get cached failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve cached blueprint',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
} 