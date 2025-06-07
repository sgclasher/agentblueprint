'use client';

/**
 * External Service Credentials Repository
 * 
 * Manages all external service credentials (AI providers, CRM systems, etc.)
 * using unified database table with AES-256 encryption.
 */

import { supabase } from '../lib/supabase';

export class CredentialsRepository {
  /**
   * Get all service credentials for a user
   * @param {string} userId - User ID
   * @param {string} serviceType - Optional filter by service type
   * @returns {Promise<Array>} Array of credential configurations
   */
  static async getCredentials(userId, serviceType = null) {
    if (!userId) {
      return [];
    }

    try {
      let query = supabase
        .from('external_service_credentials')
        .select('*')
        .eq('user_id', userId)
        .order('service_type', { ascending: true })
        .order('display_name', { ascending: true });

      if (serviceType) {
        query = query.eq('service_type', serviceType);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Error fetching credentials:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('❌ Exception in getCredentials:', error);
      throw new Error('Failed to fetch service credentials.');
    }
  }

  /**
   * Get active default provider for a service type
   * @param {string} userId - User ID
   * @param {string} serviceType - Service type ('ai_provider', 'crm_system', etc.)
   * @returns {Promise<Object|null>} Default provider configuration
   */
  static async getDefaultProvider(userId, serviceType) {
    if (!userId || !serviceType) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('external_service_credentials')
        .select('*')
        .eq('user_id', userId)
        .eq('service_type', serviceType)
        .eq('is_active', true)
        .eq('is_default', true)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') { // Not found is not an error
          console.error('❌ Error fetching default provider:', error);
        }
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Exception in getDefaultProvider:', error);
      return null;
    }
  }

  /**
   * Save or update service credentials
   * @param {string} userId - User ID
   * @param {Object} credentialData - Credential configuration
   * @returns {Promise<Object>} Saved credential record
   */
  static async saveCredentials(userId, credentialData) {
    if (!userId) {
      throw new Error('User authentication required.');
    }

    console.log('🚀 saveCredentials called with:', { userId, credentialData: { ...credentialData, credentials: '[HIDDEN]' } });

    try {
      const {
        id,
        serviceType,
        serviceName,
        displayName,
        credentials, // Plain text credentials (will be encrypted)
        configuration = {},
        isActive = true,
        isDefault = false
      } = credentialData;

      console.log('🔑 Extracting credentials for encryption...');
      console.log('📋 Extracted data:', { id, serviceType, serviceName, displayName, hasCredentials: !!credentials, configuration, isActive, isDefault });

      // Encrypt credentials first
      const encryptionResponse = await this._encryptCredentials(credentials);
      
      // Save via API route (server-side database operation)
      const { data: { session } } = await supabase.auth.getSession();
      const headers = { 'Content-Type': 'application/json' };
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      const response = await fetch('/api/admin/save-credentials', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          id,
          serviceType,
          serviceName,
          displayName,
          encryptedCredentials: encryptionResponse.encrypted,
          encryptionMetadata: encryptionResponse.metadata,
          configuration,
          isActive,
          isDefault
        })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.details || errorResponse.error || 'Failed to save credentials');
      }

      const result = await response.json();
      console.log('🎉 saveCredentials completed successfully with result ID:', result?.id);
      return result;
    } catch (error) {
      console.error('💥 Exception in saveCredentials:', error);
      console.error('🔍 Error details:', { 
        message: error.message, 
        stack: error.stack, 
        name: error.name,
        cause: error.cause 
      });
      throw new Error(`Failed to save credentials: ${error.message}`);
    }
  }

  /**
   * Test connection for service credentials
   * @param {string} userId - User ID
   * @param {string} credentialId - Credential ID
   * @returns {Promise<Object>} Test result
   */
  static async testConnection(userId, credentialId) {
    if (!userId || !credentialId) {
      throw new Error('User ID and credential ID required.');
    }

    try {
      // Get the credential record
      const { data: credential, error } = await supabase
        .from('external_service_credentials')
        .select('*')
        .eq('id', credentialId)
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      // Update status to testing
      await supabase
        .from('external_service_credentials')
        .update({ 
          test_status: 'testing',
          last_tested_at: new Date().toISOString()
        })
        .eq('id', credentialId)
        .eq('user_id', userId);

      // Call appropriate test API based on service type/name
      const testResult = await this._callTestAPI(credential);

      // Update with test results
      const finalStatus = testResult.success ? 'success' : 'failed';
      await supabase
        .from('external_service_credentials')
        .update({ 
          test_status: finalStatus,
          test_result: testResult,
          last_tested_at: new Date().toISOString()
        })
        .eq('id', credentialId)
        .eq('user_id', userId);

      return testResult;
    } catch (error) {
      console.error('❌ Exception in testConnection:', error);
      
      // Update status to failed
      if (credentialId) {
        await supabase
          .from('external_service_credentials')
          .update({ 
            test_status: 'failed',
            test_result: { 
              success: false, 
              error: error.message,
              timestamp: new Date().toISOString()
            },
            last_tested_at: new Date().toISOString()
          })
          .eq('id', credentialId)
          .eq('user_id', userId);
      }

      throw error;
    }
  }

  /**
   * Delete service credentials
   * @param {string} userId - User ID
   * @param {string} credentialId - Credential ID
   * @returns {Promise<boolean>} Success status
   */
  static async deleteCredentials(userId, credentialId) {
    if (!userId || !credentialId) {
      throw new Error('User ID and credential ID required.');
    }

    try {
      const { error } = await supabase
        .from('external_service_credentials')
        .delete()
        .eq('id', credentialId)
        .eq('user_id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('❌ Exception in deleteCredentials:', error);
      throw new Error('Failed to delete credentials.');
    }
  }

  /**
   * Set default provider for a service type
   * @param {string} userId - User ID
   * @param {string} credentialId - Credential ID to set as default
   * @returns {Promise<boolean>} Success status
   */
  static async setDefaultProvider(userId, credentialId) {
    if (!userId || !credentialId) {
      throw new Error('User ID and credential ID required.');
    }

    try {
      // Get the credential to know its service type
      const { data: credential, error } = await supabase
        .from('external_service_credentials')
        .select('service_type')
        .eq('id', credentialId)
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      // The database trigger will handle unsetting other defaults
      await supabase
        .from('external_service_credentials')
        .update({ is_default: true })
        .eq('id', credentialId)
        .eq('user_id', userId);

      return true;
    } catch (error) {
      console.error('❌ Exception in setDefaultProvider:', error);
      throw new Error('Failed to set default provider.');
    }
  }

  // =============================================
  // Private Helper Methods
  // =============================================

  /**
   * Encrypt credentials using server-side API
   * @param {Object} credentials - Plain text credentials
   * @returns {Promise<Object>} Encrypted credentials with metadata
   * @private
   */
  static async _encryptCredentials(credentials) {
    console.log('🔐 _encryptCredentials called with credentials keys:', Object.keys(credentials || {}));
    
    // Get current session for authentication
    const { data: { session } } = await supabase.auth.getSession();
    console.log('🎫 Session check:', { hasSession: !!session, hasAccessToken: !!session?.access_token });
    
    const headers = { 'Content-Type': 'application/json' };
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
    
    console.log('🌐 Making encryption API call...');
    const response = await fetch('/api/admin/encrypt-credentials', {
      method: 'POST',
      headers,
      body: JSON.stringify({ credentials })
    });

    console.log('📡 Encryption API response:', { status: response.status, ok: response.ok });
    
    if (!response.ok) {
      try {
        const errorResponse = await response.json();
        console.error('❌ Encryption API failed:', errorResponse);
        
        // Provide specific error message for setup issues
        if (response.status === 503 && errorResponse.setupRequired) {
          throw new Error('Credential encryption not configured. Please set up your ENCRYPTION_KEY environment variable. Visit /api/admin/generate-encryption-key for help.');
        }
        
        throw new Error(errorResponse.details || errorResponse.error || 'Failed to encrypt credentials');
      } catch (jsonError) {
        // Fallback if response is not JSON
        const errorText = await response.text();
        console.error('❌ Encryption API failed with non-JSON response:', errorText);
        throw new Error('Failed to encrypt credentials - server error');
      }
    }

    const result = await response.json();
    console.log('✅ Encryption API success:', { hasEncrypted: !!result.encrypted, hasMetadata: !!result.metadata });
    return result;
  }

  /**
   * Call appropriate test API based on service
   * @param {Object} credential - Credential record
   * @returns {Promise<Object>} Test result
   * @private
   */
  static async _callTestAPI(credential) {
    const { service_type, service_name } = credential;
    
    // Get current session for authentication
    const { data: { session } } = await supabase.auth.getSession();
    
    const headers = { 'Content-Type': 'application/json' };
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
    
    const response = await fetch('/api/admin/test-connection', {
      method: 'POST',
      headers,
      body: JSON.stringify({ 
        credentialId: credential.id,
        serviceType: service_type,
        serviceName: service_name
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.message || 'Connection test failed');
    }

    return await response.json();
  }
} 