import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUser } from '../../../lib/supabase';

// Initialize Supabase client with service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

    // Fetch profile using service role client directly (same as debug endpoint)
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    console.log(`📊 [API] Profile lookup result:`, {
      userId: user.id,
      foundProfile: !!profile,
      profileId: profile?.id,
      profileCompany: profile?.profile_data?.companyName,
      error: error?.code
    });
    
    if (error) {
      // Handle not found error (PGRST116)
      if (error.code === 'PGRST116') {
        console.log(`ℹ️ No profile found for user ${user.id} - user needs to create one`);
        return NextResponse.json({
          success: true,
          profile: null
        });
      }
      
      // Handle other errors
      console.error(`❌ Profile fetch error:`, error);
      throw error;
    }

    console.log(`✅ Profile retrieved successfully for user ${user.id}`);
    
    // Transform profile to match expected format
    const transformedProfile = {
      id: profile.id,
      ...profile.profile_data,
      markdown: profile.markdown_content,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
    };
    
    return NextResponse.json({
      success: true,
      profile: transformedProfile
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