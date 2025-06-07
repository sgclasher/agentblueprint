import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    detectSessionInUrl: true,
    autoRefreshToken: true,
  },
})

// Server-side helper for getting authenticated user from Authorization header
export const getServerUser = async (request) => {
  try {
    if (!request) {
      return { id: 'server-context' }
    }

    // Extract authorization header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Create a server-side Supabase client with the token
    const serverClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    const { data: { user }, error } = await serverClient.auth.getUser()
    
    if (error) {
      console.error('Server auth error:', error)
      return null
    }

    return user
  } catch (error) {
    console.error('Error in server authentication:', error)
    return null
  }
}

// Client-side only helper for getting the current session
export const getSession = async () => {
  if (typeof window === 'undefined') return null
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Client-side only helper for getting the current user
export const getCurrentUser = async () => {
  if (typeof window === 'undefined') return null
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Universal helper that works on both client and server
export const getUser = async (request = null) => {
  if (typeof window === 'undefined') {
    return await getServerUser(request)
  } else {
    return await getCurrentUser()
  }
} 