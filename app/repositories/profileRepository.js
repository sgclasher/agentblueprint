'use client';

/**
 * Profile Repository
 * 
 * Abstracts data access for client profiles, exclusively using Supabase.
 * All methods require an authenticated user.
 */

import { supabase } from '../lib/supabase';

export class ProfileRepository {
  /**
   * Create a new profile
   * @param {Object} profileData - Profile data to create
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object>} Created profile with ID
   */
  static async createProfile(profileData, userId) {
    if (!userId) {
      throw new Error('User authentication is required to create a profile.');
    }

    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .insert([{
          user_id: userId,
          name: profileData.companyName,
          description: `${profileData.industry} profile for ${profileData.companyName}`,
          industry: profileData.industry,
          company_size: profileData.size,
          profile_data: profileData,
          markdown_content: profileData.markdown || null
        }])
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase create error:', error);
        throw error;
      }

      return this.transformFromDatabase(data);
    } catch (error) {
      console.error('❌ Exception in createProfile:', error);
      throw new Error('Failed to create profile in Supabase.');
    }
  }

  /**
   * Get all profiles for a user
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Array>} Array of user profiles
   */
  static async getProfiles(userId) {
    if (!userId) {
      // Return empty array for non-authenticated state, as UI might call this before auth check
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase getProfiles error:', error);
        throw error;
      }

      return data ? data.map(this.transformFromDatabase) : [];
    } catch (error) {
      console.error('❌ Exception in getProfiles:', error);
      throw new Error('Failed to fetch profiles from Supabase.');
    }
  }

  /**
   * Get a specific profile by ID
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object|null>} Profile data or null
   */
  static async getProfile(profileId, userId) {
    if (!userId) {
      throw new Error('User authentication is required to fetch a profile.');
    }

    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('id', profileId)
        .eq('user_id', userId)
        .single();

      if (error) {
        // 'PGRST116' is the code for "Not Found", which is not a throw-worthy error.
        if (error.code !== 'PGRST116') {
          console.error('❌ Supabase getProfile error:', error);
          throw error;
        }
        return null;
      }

      return data ? this.transformFromDatabase(data) : null;
    } catch (error) {
      console.error('❌ Exception in getProfile:', error);
      throw new Error('Failed to fetch profile from Supabase.');
    }
  }

  /**
   * Update a profile
   * @param {string} profileId - Profile ID
   * @param {Object} updates - Profile updates
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object>} Updated profile
   */
  static async updateProfile(profileId, updates, userId) {
    if (!userId) {
      throw new Error('User authentication is required to update a profile.');
    }

    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .update({
          name: updates.companyName || undefined,
          description: updates.companyName ? `${updates.industry || ''} profile for ${updates.companyName}` : undefined,
          industry: updates.industry || undefined,
          company_size: updates.size || undefined,
          profile_data: updates,
          markdown_content: updates.markdown || undefined,
          updated_at: new Date().toISOString()
        })
        .eq('id', profileId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase update error:', error);
        throw error;
      }

      return this.transformFromDatabase(data);
    } catch (error) {
      console.error('❌ Exception in updateProfile:', error);
      throw new Error('Failed to update profile in Supabase.');
    }
  }

  /**
   * Delete a profile
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async deleteProfile(profileId, userId) {
    if (!userId) {
      throw new Error('User authentication is required to delete a profile.');
    }

    try {
      const { error } = await supabase
        .from('client_profiles')
        .delete()
        .eq('id', profileId)
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
  // Utility Methods
  // =============================================

  /**
   * Transform database record to expected profile format
   */
  static transformFromDatabase(dbRecord) {
    // Extract profile data and ensure Supabase ID takes precedence
    const { id: oldId, ...profileDataWithoutId } = dbRecord.profile_data || {};
    
    return {
      id: dbRecord.id, // Always use the Supabase UUID as the primary ID
      ...profileDataWithoutId, // Spread profile data but exclude any old ID
      markdown: dbRecord.markdown_content,
      createdAt: dbRecord.created_at,
      updatedAt: dbRecord.updated_at,
      // Add database-specific fields
      _supabaseRecord: true,
      _userId: dbRecord.user_id,
      // Store the original localStorage ID for reference if needed
      _originalId: oldId || null
    };
  }
}