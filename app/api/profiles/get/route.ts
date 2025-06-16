import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { ProfileRepository } from '../../../repositories/profileRepository';

interface GetProfileResponse {
  success: boolean;
  profile?: any;
  error?: string;
  details?: any;
}

/**
 * GET /api/profiles/get
 * Fetches the current user's profile using server-side authentication
 * This bypasses potential RLS issues by using service role with explicit authorization
 */
export async function GET(request: NextRequest): Promise<NextResponse<GetProfileResponse>> {
  try {
    // Get authenticated user
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in to access your profile.' },
        { status: 401 }
      );
    }
    
    console.log(`🔐 Profile fetch authorized for user ${user.id}`);

    // Fetch profile using repository (which uses service role)
    const profile = await ProfileRepository.getProfileByUserId(user.id);
    
    if (!profile) {
      // No profile found - this is not an error, user simply hasn't created one yet
      return NextResponse.json({
        success: true,
        profile: null
      });
    }

    console.log(`✅ Profile retrieved successfully for user ${user.id}`);
    
    return NextResponse.json({
      success: true,
      profile
    });

  } catch (error: any) {
    console.error('💥 Profile fetch API error:', error);
    
    // Handle specific error types
    if (error.message?.includes('Authentication')) {
      return NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in and try again.' },
        { status: 401 }
      );
    }
    
    if (error.message?.includes('rate limit')) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch profile. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 