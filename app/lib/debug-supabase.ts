'use client';

import { supabase } from './supabase';
import { User, PostgrestError } from '@supabase/supabase-js';

interface SupabaseConfig {
    hasUrl: boolean;
    hasAnonKey: boolean;
    urlLength: number;
    keyLength: number;
    supabaseInstance: boolean;
    timestamp: string;
}

interface ConnectionResult {
    success: boolean;
    error?: PostgrestError | Error | null;
    needsSchema?: boolean;
    message?: string;
    user?: User | null;
    hasProfiles?: boolean;
}

interface ProfileAccessResult {
    source: 'localStorage' | 'supabase' | 'error';
    found?: boolean;
    profile?: any;
    error?: PostgrestError | Error | null;
    user?: string;
}


export function debugSupabaseConfig(): SupabaseConfig {
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

export async function debugSupabaseConnection(): Promise<ConnectionResult> {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    const { error: connectionError } = await supabase
      .from('client_profiles')
      .select('id')
      .limit(1);

    if (connectionError) {
      if (connectionError.code === '42P01' || connectionError.message?.includes('does not exist')) {
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

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    console.log('🔍 Current user:', user ? { id: user.id, email: user.email } : 'Not authenticated');
    
    if (userError) {
      console.error('❌ User check failed:', userError);
    }

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
    return { success: true, user, hasProfiles: !!user };
    
  } catch (error: any) {
    console.error('❌ Supabase debug failed:', error);
    return { success: false, error };
  }
}

export async function debugProfileAccess(profileId: string): Promise<ProfileAccessResult> {
  try {
    console.log(`🔍 Testing profile access for ID: ${profileId}`);
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.log('🔍 No authenticated user, checking localStorage...');
      const localProfiles = JSON.parse(localStorage.getItem('clientProfiles') || '[]');
      const localProfile = localProfiles.find((p: any) => p.id === profileId);
      
      return {
        source: 'localStorage',
        found: !!localProfile,
        profile: localProfile ? { id: localProfile.id, name: localProfile.companyName } : null
      };
    }

    const { data, error } = await supabase
      .from('client_profiles')
      .select('id, name, user_id')
      .eq('id', profileId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('❌ Supabase profile query failed:', error);
      
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
    
  } catch (error: any) {
    console.error('❌ Profile access debug failed:', error);
    return { source: 'error', error };
  }
}

declare global {
    interface Window {
        debugSupabase: {
            config: () => SupabaseConfig;
            connection: () => Promise<ConnectionResult>;
            profile: (profileId: string) => Promise<ProfileAccessResult>;
        }
    }
}

if (typeof window !== 'undefined') {
  window.debugSupabase = {
    config: debugSupabaseConfig,
    connection: debugSupabaseConnection,
    profile: debugProfileAccess
  };
} 