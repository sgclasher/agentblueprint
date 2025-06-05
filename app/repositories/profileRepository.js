'use client';

/**
 * Profile Repository
 * 
 * Abstracts data access for client profiles between localStorage and Supabase.
 * Provides seamless migration from localStorage to database with backwards compatibility.
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
    try {
      if (!userId) {
        // Fallback to localStorage for non-authenticated users
        return this.createProfileLocalStorage(profileData);
      }

      // Save to Supabase
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
        console.error('Supabase error, falling back to localStorage:', error);
        return this.createProfileLocalStorage(profileData);
      }

      // Transform database record to expected format
      return this.transformFromDatabase(data);
    } catch (error) {
      console.error('Error creating profile, falling back to localStorage:', error);
      return this.createProfileLocalStorage(profileData);
    }
  }

  /**
   * Get all profiles for a user
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Array>} Array of user profiles
   */
  static async getProfiles(userId) {
    try {
      if (!userId) {
        // Fallback to localStorage for non-authenticated users
        return this.getProfilesLocalStorage();
      }

      // Get from Supabase
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error, falling back to localStorage:', error);
        return this.getProfilesLocalStorage();
      }

      // Check if we have any profiles in Supabase
      if (data && data.length > 0) {
        return data.map(this.transformFromDatabase);
      }

      // If no Supabase profiles, check for migration opportunity
      const localProfiles = this.getProfilesLocalStorage();
      if (localProfiles.length > 0) {
        console.log('Found localStorage profiles, consider migration');
      }

      return data ? data.map(this.transformFromDatabase) : [];
    } catch (error) {
      console.error('Error getting profiles, falling back to localStorage:', error);
      return this.getProfilesLocalStorage();
    }
  }

  /**
   * Get a specific profile by ID
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object|null>} Profile data or null
   */
  static async getProfile(profileId, userId) {
    try {
      if (!userId) {
        // Fallback to localStorage for non-authenticated users
        return this.getProfileLocalStorage(profileId);
      }

      // Try Supabase first
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('id', profileId)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        console.error('Supabase error, falling back to localStorage:', {
          error,
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
          profileId,
          userId
        });
        return this.getProfileLocalStorage(profileId);
      }

      if (data) {
        return this.transformFromDatabase(data);
      }

      // If not found in Supabase, check localStorage
      return this.getProfileLocalStorage(profileId);
    } catch (error) {
      console.error('Error getting profile, falling back to localStorage:', error);
      return this.getProfileLocalStorage(profileId);
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
    try {
      if (!userId) {
        // Fallback to localStorage for non-authenticated users
        return this.updateProfileLocalStorage(profileId, updates);
      }

      // Update in Supabase
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
        console.error('Supabase error, falling back to localStorage:', error);
        return this.updateProfileLocalStorage(profileId, updates);
      }

      return this.transformFromDatabase(data);
    } catch (error) {
      console.error('Error updating profile, falling back to localStorage:', error);
      return this.updateProfileLocalStorage(profileId, updates);
    }
  }

  /**
   * Delete a profile
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async deleteProfile(profileId, userId) {
    try {
      if (!userId) {
        // Fallback to localStorage for non-authenticated users
        return this.deleteProfileLocalStorage(profileId);
      }

      // Delete from Supabase
      const { error } = await supabase
        .from('client_profiles')
        .delete()
        .eq('id', profileId)
        .eq('user_id', userId);

      if (error) {
        console.error('Supabase error, falling back to localStorage:', error);
        return this.deleteProfileLocalStorage(profileId);
      }

      return true;
    } catch (error) {
      console.error('Error deleting profile, falling back to localStorage:', error);
      return this.deleteProfileLocalStorage(profileId);
    }
  }

  /**
   * Migrate localStorage profiles to Supabase for authenticated user
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object>} Migration result
   */
  static async migrateLocalStorageProfiles(userId) {
    try {
      if (!userId) {
        return { success: false, error: 'User ID required for migration' };
      }

      const localProfiles = this.getProfilesLocalStorage();
      if (localProfiles.length === 0) {
        return { success: true, migrated: 0, message: 'No profiles to migrate' };
      }

      let migrated = 0;
      let failed = 0;
      const errors = [];

      for (const profile of localProfiles) {
        try {
          // Create profile in Supabase
          const { data, error } = await supabase
            .from('client_profiles')
            .insert([{
              user_id: userId,
              name: profile.companyName,
              description: `${profile.industry} profile for ${profile.companyName}`,
              industry: profile.industry,
              company_size: profile.size,
              profile_data: profile,
              markdown_content: profile.markdown || null,
              created_at: profile.createdAt || new Date().toISOString()
            }])
            .select()
            .single();

          if (error) {
            failed++;
            errors.push(`Failed to migrate ${profile.companyName}: ${error.message}`);
          } else {
            migrated++;
          }
        } catch (profileError) {
          failed++;
          errors.push(`Error migrating ${profile.companyName}: ${profileError.message}`);
        }
      }

      // If all profiles migrated successfully, clear localStorage
      if (failed === 0) {
        localStorage.removeItem('clientProfiles');
      }

      return {
        success: migrated > 0,
        migrated,
        failed,
        errors,
        message: `Migrated ${migrated} profiles${failed > 0 ? `, ${failed} failed` : ''}`
      };
    } catch (error) {
      console.error('Migration error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Check if user has profiles that need migration
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object>} Migration status
   */
  static async checkMigrationStatus(userId) {
    try {
      const localProfiles = this.getProfilesLocalStorage();
      
      if (!userId || localProfiles.length === 0) {
        return { needsMigration: false, localCount: localProfiles.length };
      }

      // Check if user already has profiles in Supabase
      const { data, error } = await supabase
        .from('client_profiles')
        .select('id')
        .eq('user_id', userId);

      if (error) {
        return { needsMigration: false, error: error.message };
      }

      const supabaseCount = data ? data.length : 0;
      
      return {
        needsMigration: localProfiles.length > 0 && supabaseCount === 0,
        localCount: localProfiles.length,
        supabaseCount
      };
    } catch (error) {
      console.error('Error checking migration status:', error);
      return { needsMigration: false, error: error.message };
    }
  }

  // =============================================
  // localStorage Fallback Methods
  // =============================================

  static createProfileLocalStorage(profileData) {
    const profiles = JSON.parse(localStorage.getItem('clientProfiles') || '[]');
    const newProfile = {
      id: profileData.id || this.generateProfileId(profileData.companyName),
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    profiles.push(newProfile);
    localStorage.setItem('clientProfiles', JSON.stringify(profiles));
    return newProfile;
  }

  static getProfilesLocalStorage() {
    return JSON.parse(localStorage.getItem('clientProfiles') || '[]');
  }

  static getProfileLocalStorage(profileId) {
    const profiles = this.getProfilesLocalStorage();
    return profiles.find(p => p.id === profileId) || null;
  }

  static updateProfileLocalStorage(profileId, updates) {
    const profiles = this.getProfilesLocalStorage();
    const index = profiles.findIndex(p => p.id === profileId);
    
    if (index === -1) {
      throw new Error('Profile not found');
    }

    profiles[index] = {
      ...profiles[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('clientProfiles', JSON.stringify(profiles));
    return profiles[index];
  }

  static deleteProfileLocalStorage(profileId) {
    const profiles = this.getProfilesLocalStorage();
    const filteredProfiles = profiles.filter(p => p.id !== profileId);
    
    if (filteredProfiles.length === profiles.length) {
      return false; // Profile not found
    }

    localStorage.setItem('clientProfiles', JSON.stringify(filteredProfiles));
    return true;
  }

  // =============================================
  // Utility Methods
  // =============================================

  /**
   * Transform database record to expected profile format
   */
  static transformFromDatabase(dbRecord) {
    return {
      id: dbRecord.id,
      ...dbRecord.profile_data,
      markdown: dbRecord.markdown_content,
      createdAt: dbRecord.created_at,
      updatedAt: dbRecord.updated_at,
      // Add database-specific fields
      _supabaseRecord: true,
      _userId: dbRecord.user_id
    };
  }

  /**
   * Generate profile ID
   */
  static generateProfileId(companyName) {
    const timestamp = Date.now().toString(36);
    const nameSlug = companyName.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 20);
    return `${nameSlug}-${timestamp}`;
  }
} 