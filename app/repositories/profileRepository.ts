/**
 * Profile Repository
 * 
 * Abstracts data access for client profiles, exclusively using Supabase.
 * All methods require an authenticated user.
 */

import { supabase } from '../lib/supabase';
import { markdownService } from '../services/markdownService';
import { Profile, StrategicInitiative } from '../services/types';

export class ProfileRepository {
  /**
   * Create a new profile
   * @param {Partial<Profile>} profileData - Profile data to create
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object>} Created profile with ID
   */
  static async createProfile(profileData: Partial<Profile>, userId: string) {
    if (!userId) {
      throw new Error('User authentication is required to create a profile.');
    }

    try {
      const { markdown, ...dataForJson } = profileData;

      const { data, error } = await supabase
        .from('client_profiles')
        .insert([{
          user_id: userId,
          name: profileData.companyName,
          description: `${profileData.industry} profile for ${profileData.companyName}`,
          industry: profileData.industry,
          company_size: profileData.size,
          profile_data: dataForJson,
          markdown_content: markdownService.generateMarkdown(profileData)
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
  static async getProfiles(userId: string) {
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
  static async getProfile(profileId: string, userId: string) {
    if (!userId) {
      throw new Error('User authentication is required to fetch a profile.');
    }

    console.log('[ProfileRepository] getProfile called with:', { profileId, userId });

    // Debug: Check what profiles exist for this user
    try {
      const { data: allProfiles } = await supabase
        .from('client_profiles')
        .select('id, user_id, name')
        .eq('user_id', userId);
      console.log('[ProfileRepository] All profiles for user:', allProfiles?.map(p => ({ id: p.id, name: p.name })));
    } catch (debugError) {
      console.log('[ProfileRepository] Debug query failed:', debugError);
    }

    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('id', profileId)
        .eq('user_id', userId)
        .single();

      console.log('[ProfileRepository] Supabase query result:', { 
        hasData: !!data, 
        error: error?.code || 'none',
        errorMessage: error?.message 
      });

      if (error) {
        // 'PGRST116' is the code for "Not Found", which is not a throw-worthy error.
        if (error.code !== 'PGRST116') {
          console.error('❌ Supabase getProfile error:', error);
          throw error;
        } else {
          console.log('[ProfileRepository] Profile not found (PGRST116) - no matching record');
        }
        return null;
      }

      console.log('[ProfileRepository] Profile found, transforming data');
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
  static async updateProfile(profileId: string, updates: Partial<Profile>, userId: string) {
    if (!userId) {
      throw new Error('User authentication is required to update a profile.');
    }

    try {
      const { markdown, ...dataForJson } = updates;

      const { data, error } = await supabase
        .from('client_profiles')
        .update({
          name: updates.companyName || undefined,
          description: updates.companyName ? `${updates.industry || ''} profile for ${updates.companyName}` : undefined,
          industry: updates.industry || undefined,
          company_size: updates.size || undefined,
          profile_data: dataForJson,
          markdown_content: markdownService.generateMarkdown(updates),
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
  static async deleteProfile(profileId: string, userId: string) {
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
  // Timeline Caching Methods
  // =============================================

  /**
   * Get cached timeline for a profile
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object|null>} Cached timeline data or null
   */
  static async getCachedTimeline(profileId: string, userId: string) {
    if (!userId) {
      console.warn('⚠️ No userId provided to getCachedTimeline');
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('timeline_data, last_timeline_generated_at')
        .eq('id', profileId)
        .eq('user_id', userId)
        .single();
        
      if (error) {
        if (error.code !== 'PGRST116') { // Not a "not found" error
          console.error('❌ Supabase getCachedTimeline error:', error);
        }
        return null;
      }
      
      if (!data?.timeline_data) {
        return null; // No cached timeline exists
      }
      
      return {
        timeline: data.timeline_data,
        generatedAt: data.last_timeline_generated_at,
        scenarioType: data.timeline_data.scenarioType || 'balanced'
      };
    } catch (error) {
      console.error('❌ Exception in getCachedTimeline:', error);
      return null;
    }
  }

  /**
   * Save timeline to database
   * @param {string} profileId - Profile ID
   * @param {Object} timelineData - Timeline data to save
   * @param {string} scenarioType - Scenario type used for generation
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async saveTimeline(profileId: string, timelineData: any, scenarioType: string, userId: string) {
    if (!userId) {
      throw new Error('User authentication is required to save timeline.');
    }
    
    try {
      // Add metadata to timeline data
      const timelineWithMeta = {
        ...timelineData,
        scenarioType,
        generatedAt: new Date().toISOString(),
        version: '1.0'
      };

      const { error } = await supabase
        .from('client_profiles')
        .update({
          timeline_data: timelineWithMeta,
          last_timeline_generated_at: new Date().toISOString()
        })
        .eq('id', profileId)
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
   * Clear cached timeline for a profile
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async clearTimelineCache(profileId: string, userId: string) {
    if (!userId) {
      throw new Error('User authentication is required to clear timeline cache.');
    }
    
    try {
      const { error } = await supabase
        .from('client_profiles')
        .update({
          timeline_data: null,
          last_timeline_generated_at: null
        })
        .eq('id', profileId)
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
   * Get cached AI opportunities for a profile
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object|null>} Cached opportunities data or null
   */
  static async getCachedOpportunities(profileId: string, userId: string) {
    if (!userId) {
      console.warn('⚠️ No userId provided to getCachedOpportunities');
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('opportunities_data, last_opportunities_generated_at')
        .eq('id', profileId)
        .eq('user_id', userId)
        .single();
        
      if (error) {
        if (error.code !== 'PGRST116') { // Not a "not found" error
          console.error('❌ Supabase getCachedOpportunities error:', error);
        }
        return null;
      }
      
      if (!data?.opportunities_data) {
        return null; // No cached opportunities exist
      }
      
      return {
        opportunities: data.opportunities_data,
        generatedAt: data.last_opportunities_generated_at,
        provider: data.opportunities_data.analysisMetadata?.provider || 'unknown'
      };
    } catch (error) {
      console.error('❌ Exception in getCachedOpportunities:', error);
      return null;
    }
  }

  /**
   * Save AI opportunities to database
   * @param {string} profileId - Profile ID
   * @param {Object} opportunitiesData - Opportunities data to save
   * @param {string} provider - AI provider used for generation
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async saveOpportunities(profileId: string, opportunitiesData: any, provider: string, userId: string) {
    if (!userId) {
      throw new Error('User authentication is required to save opportunities.');
    }
    
    try {
      // Add metadata to opportunities data
      const opportunitiesWithMeta = {
        ...opportunitiesData,
        provider,
        generatedAt: new Date().toISOString(),
        version: '1.0'
      };

      const { error } = await supabase
        .from('client_profiles')
        .update({
          opportunities_data: opportunitiesWithMeta,
          last_opportunities_generated_at: new Date().toISOString()
        })
        .eq('id', profileId)
        .eq('user_id', userId);
        
      if (error) {
        console.error('❌ Supabase saveOpportunities error:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('❌ Exception in saveOpportunities:', error);
      throw new Error('Failed to save opportunities to database.');
    }
  }

  /**
   * Clear cached opportunities for a profile
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async clearOpportunitiesCache(profileId: string, userId: string) {
    if (!userId) {
      throw new Error('User authentication is required to clear opportunities cache.');
    }
    
    try {
      const { error } = await supabase
        .from('client_profiles')
        .update({
          opportunities_data: null,
          last_opportunities_generated_at: null
        })
        .eq('id', profileId)
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
   * Transform database record to expected profile format
   * Includes data migration for backward compatibility
   */
  static transformFromDatabase(dbRecord: any) {
    // Extract profile data and ensure Supabase ID takes precedence
    const { id: oldId, ...profileDataWithoutId } = dbRecord.profile_data || {};
    
    // Data migration: Ensure strategic initiatives have businessProblems field
    const migratedProfileData = ProfileRepository.migrateProfileData(profileDataWithoutId);
    
    return {
      id: dbRecord.id, // Always use the Supabase UUID as the primary ID
      ...migratedProfileData, // Spread migrated profile data
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

  /**
   * Migrate profile data to ensure compatibility with current schema
   * @param {Object} profileData - Raw profile data from database
   * @returns {Object} Migrated profile data
   */
  static migrateProfileData(profileData: any): any {
    if (!profileData) return profileData;

    // Clone the profile data to avoid mutations
    const migrated = { ...profileData };

    // Migration: Add businessProblems field to strategic initiatives
    if (migrated.strategicInitiatives && Array.isArray(migrated.strategicInitiatives)) {
      migrated.strategicInitiatives = migrated.strategicInitiatives.map((initiative: StrategicInitiative) => {
        // If businessProblems field doesn't exist, add it as empty array
        if (!initiative.hasOwnProperty('businessProblems')) {
          return {
            ...initiative,
            businessProblems: []
          };
        }
        
        // If businessProblems exists but is null/undefined, initialize as empty array
        if (initiative.businessProblems == null) {
          return {
            ...initiative,
            businessProblems: []
          };
        }
        
        // If businessProblems exists but is not an array, initialize as empty array
        if (!Array.isArray(initiative.businessProblems)) {
          return {
            ...initiative,
            businessProblems: []
          };
        }
        
        // businessProblems field is valid, return as-is
        return initiative;
      });
    }

    return migrated;
  }
}