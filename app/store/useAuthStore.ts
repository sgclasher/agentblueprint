'use client';

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { Profile } from '../services/types';
import { ProfileService } from '../services/profileService';

interface AuthState {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  initialize: () => Promise<void>;
  signUp: (email: string, password: string, options?: { name?: string }) => Promise<{ success: boolean; data?: any; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  signInWithMagicLink: (email: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  updateUserAndProfile: (userUpdates: any, profileUpdates: Partial<Profile>) => Promise<{ success: boolean; data?: any; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  setProfile: (profile: Profile | null) => void;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>((set, get) => {
  let isInitializing = false; // Guard to prevent multiple simultaneous initializations
  
  return {
    user: null,
    session: null,
    profile: null,
    isLoading: true,
    isAuthenticated: false,

    initialize: async () => {
      // Prevent multiple simultaneous initializations
      if (isInitializing) {
        console.log('⚠️ [AuthStore] Initialization already in progress, skipping...');
        return;
      }
      
      isInitializing = true;
      console.log('🚀 [AuthStore] Starting initialization...');
      
      try {
        set({ isLoading: true });
      
      console.log('🔍 [AuthStore] Getting session...');
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ [AuthStore] Error getting session:', error);
        set({ user: null, session: null, profile: null, isAuthenticated: false, isLoading: false });
        return;
      }
      
      console.log('✅ [AuthStore] Session retrieved, authenticated:', !!session);
      
      // Fetch user profile if authenticated
      let userProfile: Profile | null = null;
      if (session?.user) {
        console.log('👤 [AuthStore] Fetching user profile...');
        try {
          userProfile = await ProfileService.getCurrentUserProfile();
          console.log('✅ [AuthStore] Profile fetched:', !!userProfile);
        } catch (error) {
          console.error('❌ [AuthStore] Profile fetch failed during init:', error);
          // Don't throw - continue with null profile, user can create one
        }
      }

      console.log('🔧 [AuthStore] Setting initial state...');
      set({
        user: session?.user ?? null,
        session,
        profile: userProfile,
        isAuthenticated: !!session,
        isLoading: false, // ← This should stop the loading spinner
      });
      
      console.log('✅ [AuthStore] Initial state set, isLoading: false');

      // Set up auth state change listener
      console.log('🔧 [AuthStore] Setting up auth state change listener...');
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log(`🔄 [AuthStore] Auth state changed: ${event}`);
        
        // Fetch user profile if authenticated
        let userProfile: Profile | null = null;
        if (session?.user) {
          console.log('👤 [AuthStore] Fetching profile after auth state change...');
          try {
            userProfile = await ProfileService.getCurrentUserProfile();
            console.log('✅ [AuthStore] Profile fetched after auth change:', !!userProfile);
          } catch (error) {
            console.error('❌ [AuthStore] Profile fetch failed after auth change:', error);
            // Don't throw - continue with null profile
          }
        }
        
        set({
          user: session?.user ?? null,
          session,
          profile: userProfile,
          isAuthenticated: !!session,
          isLoading: false,
        });
        
        console.log('✅ [AuthStore] Auth state updated');
      });
      
      console.log('✅ [AuthStore] Initialization completed successfully');
    } catch (error) {
      console.error('💥 [AuthStore] Error initializing auth:', error);
      set({ user: null, session: null, profile: null, isAuthenticated: false, isLoading: false });
    } finally {
      isInitializing = false; // Reset the guard
    }
  },

  signUp: async (email, password, options = {}) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: options.name || '',
          },
        },
      });

      if (error) throw error;

      // On successful sign-up, the onAuthStateChange listener will handle setting user/session
      return { success: true, data };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (email, password) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // On successful sign-in, the onAuthStateChange listener will handle setting user/session/profile
      return { success: true, data };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithMagicLink: async (email) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      console.error('Magic link error:', error);
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      set({ isLoading: true });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      set({
        user: null,
        session: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
      });

      return { success: true };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  },

  updateUserAndProfile: async (userUpdates, profileUpdates) => {
    try {
      set({ isLoading: true });
      
      // Update user metadata in Supabase Auth
      const { data: userData, error: userError } = await supabase.auth.updateUser({
        data: userUpdates,
      });

      if (userError) throw userError;

      // Save profile data to the 'profiles' table
      const savedProfile = await ProfileService.saveCurrentUserProfile(profileUpdates);

      // Update the state
      set({ user: userData.user, profile: savedProfile });

      return { success: true, data: { user: userData.user, profile: savedProfile } };
    } catch (error: any) {
      console.error('Update user and profile error:', error);
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      console.error('Reset password error:', error);
      return { success: false, error: error.message };
    }
  },
  
  setProfile: (profile) => set({ profile }),
  };
});

export default useAuthStore;
