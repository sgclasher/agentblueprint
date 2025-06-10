import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import { decryptCredential } from '../../../utils/encryption';

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get ServiceNow credentials from admin system
    const allCredentials = await CredentialsRepository.getCredentials(
      user.id,
      'integration_platform'
    );

    // Filter for ServiceNow credentials
    const serviceNowCredentials = allCredentials.filter(
      (cred: any) => cred.service_name === 'servicenow' && cred.is_active
    );

    if (!serviceNowCredentials || serviceNowCredentials.length === 0) {
      return NextResponse.json({
        instanceUrl: '',
        scopeId: '',
        username: '',
        hasCredentials: false
      });
    }

    // Get the default ServiceNow credential, or first available
    const credential = serviceNowCredentials.find((cred: any) => cred.is_default) || serviceNowCredentials[0];
    
    // Decrypt the credentials
    const decryptedCredentials = await decryptStoredCredentials(
      credential.credentials_encrypted,
      credential.encryption_metadata
    );
    
    const { username, password } = decryptedCredentials || {};
    const { instance_url, scope_id } = credential.configuration || {};

    return NextResponse.json({
      instanceUrl: instance_url || '',
      scopeId: scope_id || '',
      username: username || '',
      password: password || '', // Include password for API calls
      hasCredentials: !!(instance_url && username && password)
    });

  } catch (error: any) {
    console.error('Error getting ServiceNow credentials:', error);
    
    // Fallback to environment variables if admin system fails
    return NextResponse.json({
      instanceUrl: process.env.SERVICENOW_INSTANCE_URL || '',
      scopeId: process.env.SERVICENOW_SCOPE_ID || '',
      username: '',
      hasCredentials: false
    });
  }
}

async function decryptStoredCredentials(encryptedCredentials: any, metadata: any): Promise<{ [key: string]: any }> {
  // Handle new AI provider format: encryptedCredentials is a string
  if (typeof encryptedCredentials === 'string') {
    try {
      const decrypted = decryptCredential(
        encryptedCredentials,
        metadata.iv,
        metadata.authTag
      );
      // Should be a JSON string: { apiKey: "...", model: "..." }
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to decrypt single-string credentials:', error);
      throw new Error('Failed to decrypt credentials (single-string)');
    }
  }
  // Legacy/multi-field format
  const decrypted: { [key: string]: string } = {};
  for (const [key, encryptedValue] of Object.entries(encryptedCredentials)) {
    if (typeof encryptedValue === 'string' && metadata[`${key}_iv`] && metadata[`${key}_auth_tag`]) {
      try {
        decrypted[key] = decryptCredential(
          encryptedValue,
          metadata[`${key}_iv`],
          metadata[`${key}_auth_tag`]
        );
      } catch (error) {
        console.error(`Failed to decrypt credential ${key}:`, error);
        throw new Error(`Failed to decrypt credential: ${key}`);
      }
    }
  }
  return decrypted;
} 