import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUser } from '../../lib/supabase';

// Initialize Supabase client with service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    console.log(`🔍 [DEBUG] Checking profiles for user: ${user.id}`);

    // Query all profiles for this user (should be 0 or 1)
    const { data: allProfiles, error: allError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id);

    console.log(`📊 [DEBUG] All profiles query result:`, {
      error: allError,
      count: allProfiles?.length || 0,
      profiles: allProfiles?.map(p => ({
        id: p.id,
        user_id: p.user_id,
        hasProfileData: !!p.profile_data,
        companyName: p.profile_data?.companyName,
        createdAt: p.created_at
      }))
    });

    // Also try the single query like the repository does
    const { data: singleProfile, error: singleError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    console.log(`📊 [DEBUG] Single profile query result:`, {
      error: singleError,
      errorCode: singleError?.code,
      hasData: !!singleProfile,
      profileId: singleProfile?.id,
      companyName: singleProfile?.profile_data?.companyName
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      allProfilesCount: allProfiles?.length || 0,
      allProfiles: allProfiles || [],
      singleQueryError: singleError,
      singleProfile: singleProfile,
      debugInfo: {
        timestamp: new Date().toISOString(),
        userEmail: user.email
      }
    });

  } catch (error: any) {
    console.error('💥 [DEBUG] Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Debug query failed',
        details: error.message
      },
      { status: 500 }
    );
  }
} 