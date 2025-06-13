import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { profileId } = await request.json();

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

    // Clear the opportunities cache
    const { error: clearError } = await supabase
      .from('client_profiles')
      .update({
        opportunities_data: null,
        last_opportunities_generated_at: null
      })
      .eq('id', profileId)
      .eq('user_id', user.id);

    if (clearError) {
      console.error('[Clear Cache] Error:', clearError);
      return NextResponse.json(
        { success: false, error: 'Failed to clear cache' },
        { status: 500 }
      );
    }

    console.log('[Clear Cache] Successfully cleared opportunities cache for profile:', profileId);

    return NextResponse.json({
      success: true,
      message: 'Opportunities cache cleared successfully'
    });

  } catch (error: any) {
    console.error('[Clear Cache] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
} 