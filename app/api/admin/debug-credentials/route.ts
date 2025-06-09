import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { supabase } from '../../../lib/supabase';
import { Credential } from '../../../admin/types';

export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    console.log('🔍 Debug: Checking credentials for user:', user.id);

    const { error: tableError } = await supabase
      .from('external_service_credentials')
      .select('count')
      .limit(0);

    console.log('🗃️ Table accessibility:', { accessible: !tableError, error: tableError?.message });

    const { data: credentials, error } = await supabase
      .from('external_service_credentials')
      .select('*')
      .eq('user_id', user.id);

    console.log('📊 User credentials query:', { 
      success: !error, 
      error: error?.message, 
      count: credentials?.length || 0 
    });

    const { data: authUidTest, error: authError } = await supabase
      .rpc('auth.uid');
    
    console.log('🔐 Auth UID test:', { 
      success: !authError, 
      authUid: authUidTest, 
      userIdMatch: authUidTest === user.id,
      error: authError?.message 
    });

    const { count: totalCount, error: countError } = await supabase
      .from('external_service_credentials')
      .select('*', { count: 'exact', head: true });

    console.log('📈 Total records check:', { 
      success: !countError, 
      totalCount, 
      error: countError?.message 
    });

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recentCreds, error: recentError } = await supabase
      .from('external_service_credentials')
      .select('*')
      .gte('created_at', oneHourAgo);

    console.log('⏰ Recent credentials check:', { 
      success: !recentError, 
      recentCount: recentCreds?.length || 0,
      error: recentError?.message 
    });

    if (error) {
      console.error('❌ Database error:', error);
      return NextResponse.json(
        { 
          error: 'Database error', 
          details: error.message,
          diagnostics: {
            tableAccessible: !tableError,
            authUid: authUidTest,
            userIdMatch: authUidTest === user.id,
            totalRecords: totalCount,
            recentRecords: recentCreds?.length || 0
          }
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user_id: user.id,
      credentials_count: credentials?.length || 0,
      diagnostics: {
        tableAccessible: !tableError,
        authUidWorks: !authError,
        authUid: authUidTest,
        userIdMatch: authUidTest === user.id,
        totalRecordsInTable: totalCount,
        recentRecordsInTable: recentCreds?.length || 0,
        lastHourFilter: oneHourAgo
      },
      credentials: (credentials as Credential[])?.map(cred => ({
        id: cred.id,
        service_type: cred.service_type,
        service_name: cred.service_name,
        display_name: cred.display_name,
        is_active: cred.is_active,
        test_status: cred.test_status,
        created_at: cred.created_at,
        updated_at: cred.updated_at
      }))
    });

  } catch (error: any) {
    console.error('💥 Debug credentials error:', error);
    return NextResponse.json(
      { 
        error: 'Debug failed', 
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 