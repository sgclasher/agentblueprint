'use client';

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthActions {
  initialize: () => Promise<void>;
  signUp: (email: string, password: string, options?: { name?: string }) => Promise<{ success: boolean; data?: any; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  signInWithMagicLink: (email: string) => Promise<{ success: boolean; data?: any; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  updateProfile: (updates: object) => Promise<{ success: boolean; data?: any; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; data?: any; error?: string }>;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  initialize: async () => {
    try {
      set({ isLoading: true });
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        set({ user: null, session: null, isAuthenticated: false, isLoading: false });
        return;
      }

      set({
        user: session?.user ?? null,
        session,
        isAuthenticated: !!session,
        isLoading: false,
      });

      supabase.auth.onAuthStateChange((_event, session) => {
        set({
          user: session?.user ?? null,
          session,
          isAuthenticated: !!session,
          isLoading: false,
        });
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null, session: null, isAuthenticated: false, isLoading: false });
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
        isAuthenticated: false,
        isLoading: false,
      });

      return { success: true };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  },

  updateProfile: async (updates) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      console.error('Update profile error:', error);
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
}));

export default useAuthStore;
