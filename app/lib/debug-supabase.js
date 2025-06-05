'use client';

/**
 * Supabase Debug Utility
 * Quick diagnostic tool to check Supabase configuration and connection status
 */

import { supabase } from './supabase';

export function debugSupabaseConfig() {
  const config = {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    urlLength: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
    keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
    supabaseInstance: !!supabase,
    timestamp: new Date().toISOString()
  };

  console.log('🔍 Supabase Debug Config:', config);
  return config;
}

export async function debugSupabaseConnection() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test 1: Check if client_profiles table exists
    const { data: connectionTest, error: connectionError } = await supabase
      .from('client_profiles')
      .select('id')
      .limit(1);

    if (connectionError) {
      // Check if it's a table not found error
      if (connectionError.code === 'PGRST106' || connectionError.message?.includes('does not exist')) {
        console.warn('⚠️ Database table "client_profiles" does not exist');
        console.log('📋 You need to run the database schema from app/database/schema.sql');
        return { 
          success: false, 
          error: connectionError,
          needsSchema: true,
          message: 'Database tables not found. Run the schema from app/database/schema.sql in your Supabase SQL Editor.'
        };
      }
      
      console.error('❌ Connection test failed:', connectionError);
      return { success: false, error: connectionError };
    }

    console.log('✅ Database connection and table access successful');

    // Test 2: Check current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    console.log('🔍 Current user:', user ? { id: user.id, email: user.email } : 'Not authenticated');
    
    if (userError) {
      console.error('❌ User check failed:', userError);
    }

    // Test 3: Test profile query (if authenticated)
    if (user) {
      const { data: profileData, error: profileError } = await supabase
        .from('client_profiles')
        .select('id, name')
        .eq('user_id', user.id)
        .limit(5);

      console.log('🔍 User profiles:', profileData?.length || 0, 'found');
      
      if (profileError) {
        console.error('❌ Profile query failed:', profileError);
        return { success: false, error: profileError, user };
      }
    }

    console.log('✅ Supabase connection fully successful');
    return { success: true, user, hasProfiles: user ? true : false };
    
  } catch (error) {
    console.error('❌ Supabase debug failed:', error);
    return { success: false, error };
  }
}

export async function debugProfileAccess(profileId) {
  try {
    console.log(`🔍 Testing profile access for ID: ${profileId}`);
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.log('🔍 No authenticated user, checking localStorage...');
      const localProfiles = JSON.parse(localStorage.getItem('clientProfiles') || '[]');
      const localProfile = localProfiles.find(p => p.id === profileId);
      
      return {
        source: 'localStorage',
        found: !!localProfile,
        profile: localProfile ? { id: localProfile.id, name: localProfile.companyName } : null
      };
    }

    // Test Supabase query
    const { data, error } = await supabase
      .from('client_profiles')
      .select('id, name, user_id')
      .eq('id', profileId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('❌ Supabase profile query failed:', error);
      
      // Check if profile exists for any user (to test RLS)
      const { data: anyUserData, error: anyUserError } = await supabase
        .from('client_profiles')
        .select('id, name, user_id')
        .eq('id', profileId)
        .single();

      if (anyUserError) {
        console.log('🔍 Profile does not exist in database at all');
      } else {
        console.log('🔍 Profile exists but belongs to different user:', anyUserData.user_id);
      }
      
      return { source: 'supabase', found: false, error, user: user.id };
    }

    console.log('✅ Profile found in Supabase:', data);
    return { source: 'supabase', found: true, profile: data, user: user.id };
    
  } catch (error) {
    console.error('❌ Profile access debug failed:', error);
    return { source: 'error', error };
  }
}

// Browser console helpers
if (typeof window !== 'undefined') {
  window.debugSupabase = {
    config: debugSupabaseConfig,
    connection: debugSupabaseConnection,
    profile: debugProfileAccess
  };
} 