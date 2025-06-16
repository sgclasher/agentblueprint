/**
 * Profile Repository
 * 
 * Abstracts data access for the user's single business profile.
 * All methods require an authenticated user and operate on the 'profiles' table.
 */

import { supabase } from '../lib/supabase';
import { markdownService } from '../services/markdownService';
import { Profile } from '../services/types';

export class ProfileRepository {
  /**
   * Save (upsert) a profile for a user.
   * This handles both creation of a new profile and updates to an existing one.
   * @param {string} userId - User ID (from Supabase Auth)
   * @param {Partial<Profile>} profileData - Profile data to save
   * @returns {Promise<Profile>} The saved profile
   */
  static async saveProfile(userId: string, profileData: Partial<Profile>): Promise<Profile> {
    if (!userId) {
      throw new Error('User authentication is required to save a profile.');
    }

    try {
      const { markdown, ...dataForJson } = profileData;

      // The 'id' field is managed by the database, so we remove it from the upsert data
      // to avoid conflicts, especially when the profile object comes from an existing state.
      if ('id' in dataForJson) {
        delete (dataForJson as { id?: string }).id;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          user_id: userId,
          profile_data: dataForJson,
          markdown_content: markdownService.generateMarkdown(profileData),
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' }) // Upsert based on the unique user_id
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase saveProfile (upsert) error:', error);
        
        // Handle specific RLS-related errors
        if (error.code === '42501' || error.message?.includes('row-level security')) {
          throw new Error('Profile access denied. Please check your permissions or sign in again.');
        }
        
        if (error.code === 'PGRST301') {
          throw new Error('Profile access denied due to security policies. Please try again or contact support.');
        }
        
        throw error;
      }

      return this.transformFromDatabase(data);
    } catch (error) {
      console.error('❌ Exception in saveProfile:', error);
      throw new Error('Failed to save profile in Supabase.');
    }
  }

  /**
   * Get the profile for a specific user by their user ID.
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Profile|null>} The user's profile or null if not found
   */
  static async getProfileByUserId(userId: string): Promise<Profile | null> {
    if (!userId) {
      throw new Error('User ID is required to fetch a profile.');
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        // 'PGRST116' is the code for "Not Found", which is not a throw-worthy error.
        if (error.code !== 'PGRST116') {
          console.error('❌ Supabase getProfileByUserId error:', error);
          
          // Handle specific RLS-related errors
          if (error.code === '42501' || error.message?.includes('row-level security')) {
            throw new Error('Profile access denied. Please check your permissions or sign in again.');
          }
          
          if (error.code === 'PGRST301') {
            throw new Error('Profile access denied due to security policies. Please try again or contact support.');
          }
          
          throw error;
        }
        return null; // A user may not have a profile yet, this is not an error.
      }

      return data ? this.transformFromDatabase(data) : null;
    } catch (error) {
      console.error('❌ Exception in getProfileByUserId:', error);
      throw new Error('Failed to fetch profile from Supabase.');
    }
  }

  /**
   * Delete a user's profile.
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async deleteProfile(userId: string): Promise<boolean> {
    if (!userId) {
      throw new Error('User authentication is required to delete a profile.');
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId);

      if (error) {
        console.error('❌ Supabase delete error:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('❌ Exception in deleteProfile:', error);
      throw new Error('Failed to delete profile from Supabase.');
    }
  }

  // =============================================
  // Timeline Caching Methods
  // =============================================

  /**
   * Get cached timeline for a user's profile.
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object|null>} Cached timeline data or null
   */
  static async getCachedTimeline(userId: string): Promise<any | null> {
    if (!userId) {
      console.warn('⚠️ No userId provided to getCachedTimeline');
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('timeline_cache')
        .eq('user_id', userId)
        .single();
        
      if (error) {
        if (error.code !== 'PGRST116') { // Not a "not found" error
          console.error('❌ Supabase getCachedTimeline error:', error);
        }
        return null;
      }
      
      return data?.timeline_cache || null;
    } catch (error) {
      console.error('❌ Exception in getCachedTimeline:', error);
      return null;
    }
  }

  /**
   * Save timeline to a user's profile.
   * @param {string} userId - User ID (from Supabase Auth)
   * @param {Object} timelineData - Timeline data to save
   * @returns {Promise<boolean>} Success status
   */
  static async saveTimeline(userId: string, timelineData: any): Promise<boolean> {
    if (!userId) {
      throw new Error('User authentication is required to save timeline.');
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          timeline_cache: timelineData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);
        
      if (error) {
        console.error('❌ Supabase saveTimeline error:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('❌ Exception in saveTimeline:', error);
      throw new Error('Failed to save timeline to database.');
    }
  }

  /**
   * Clear cached timeline for a user's profile.
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async clearTimelineCache(userId: string): Promise<boolean> {
    if (!userId) {
      throw new Error('User authentication is required to clear timeline cache.');
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          timeline_cache: null
        })
        .eq('user_id', userId);
        
      if (error) {
        console.error('❌ Supabase clearTimelineCache error:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('❌ Exception in clearTimelineCache:', error);
      throw new Error('Failed to clear timeline cache.');
    }
  }

  // =============================================
  // AI Opportunities Caching Methods
  // =============================================

  /**
   * Get cached AI opportunities for a user's profile.
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object|null>} Cached opportunities data or null
   */
  static async getCachedOpportunities(userId: string): Promise<any | null> {
    if (!userId) {
      console.warn('⚠️ No userId provided to getCachedOpportunities');
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('ai_opportunities_cache')
        .eq('user_id', userId)
        .single();
        
      if (error) {
        if (error.code !== 'PGRST116') { // Not a "not found" error
          console.error('❌ Supabase getCachedOpportunities error:', error);
        }
        return null;
      }
      
      return data?.ai_opportunities_cache || null;

    } catch (error) {
      console.error('❌ Exception in getCachedOpportunities:', error);
      return null;
    }
  }

  /**
   * Save AI opportunities to a user's profile.
   * @param {string} userId - User ID (from Supabase Auth)
   * @param {Object} opportunitiesData - Opportunities data to save
   * @returns {Promise<boolean>} Success status
   */
  static async saveOpportunities(userId: string, opportunitiesData: any): Promise<boolean> {
    if (!userId) {
      throw new Error('User authentication is required to save opportunities.');
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ai_opportunities_cache: opportunitiesData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);
        
      if (error) {
        console.error('❌ Supabase saveOpportunities error:', error);
        throw error;
      }
      
      return true;
    } catch (error)
    {
      console.error('❌ Exception in saveOpportunities:', error);
      throw new Error('Failed to save opportunities to database.');
    }
  }

  /**
   * Clear cached opportunities for a user's profile.
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async clearOpportunitiesCache(userId: string): Promise<boolean> {
    if (!userId) {
      throw new Error('User authentication is required to clear opportunities cache.');
    }
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ai_opportunities_cache: null
        })
        .eq('user_id', userId);
        
      if (error) {
        console.error('❌ Supabase clearOpportunitiesCache error:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('❌ Exception in clearOpportunitiesCache:', error);
      throw new Error('Failed to clear opportunities cache.');
    }
  }

  // =============================================
  // Utility Methods
  // =============================================

  /**
   * Transform a database record to the application's Profile format.
   * @param {any} dbRecord - The raw record from the 'profiles' table.
   * @returns {Profile} The formatted profile object.
   */
  private static transformFromDatabase(dbRecord: any): Profile {
    if (!dbRecord) {
      return null as any;
    }

    // Combine the database row ID with the JSONB data
    const profile: Profile = {
      id: dbRecord.id, // The primary key of the profile itself
      ...dbRecord.profile_data,
      markdown: dbRecord.markdown_content,
      createdAt: dbRecord.created_at,
      updatedAt: dbRecord.updated_at,
    };

    return profile;
  }
}