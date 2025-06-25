import { createClient, Session, User } from '@supabase/supabase-js'
import { NextRequest } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    detectSessionInUrl: true,
    autoRefreshToken: true,
  },
});

export const getServerUser = async (request: NextRequest | null): Promise<User | null> => {
  try {
    if (!request) {
      console.log('🔐 getServerUser: No request provided, cannot authenticate server-side.');
      return null;
    }

    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ getServerUser: Missing or invalid auth header');
      return null;
    }

    const token = authHeader.substring(7);

    const serverClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { data: { user }, error } = await serverClient.auth.getUser();
    
    if (error) {
      console.error('❌ getServerUser: Server auth error:', error);
      return null;
    }

    return user;
  } catch (error) {
    console.error('💥 getServerUser: Exception in server authentication:', error);
    return null;
  }
};

export const getSession = async (): Promise<Session | null> => {
  if (typeof window === 'undefined') return null;
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

export const getCurrentUser = async (): Promise<User | null> => {
  if (typeof window === 'undefined') return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getUser = async (request: NextRequest | null = null): Promise<User | null> => {
  if (typeof window === 'undefined') {
    return await getServerUser(request);
  } else {
    return await getCurrentUser();
  }
}; 