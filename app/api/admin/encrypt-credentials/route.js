import { NextResponse } from 'next/server';
import { encryptCredential } from '../../../utils/encryption';
import { getUser } from '../../../lib/supabase';

export async function POST(request) {
  try {
    // Check if encryption is configured before doing anything else
    if (!process.env.ENCRYPTION_KEY) {
      console.error('❌ ENCRYPTION_KEY environment variable not configured');
      return NextResponse.json(
        { 
          error: 'Credential encryption not configured', 
          details: 'ENCRYPTION_KEY environment variable is required. Please see setup documentation.',
          setupRequired: true
        },
        { status: 503 }
      );
    }

    // Verify user authentication
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { credentials } = body;

    if (!credentials || typeof credentials !== 'object') {
      return NextResponse.json(
        { error: 'Credentials object is required' },
        { status: 400 }
      );
    }

    console.log('🔐 Encrypting credentials for user:', user.id);
    console.log('🔑 Credential keys to encrypt:', Object.keys(credentials));

    // Encrypt each credential field
    const encryptedCredentials = {};
    const encryptionMetadata = {};

    for (const [key, value] of Object.entries(credentials)) {
      if (value && typeof value === 'string') {
        console.log(`🔒 Encrypting credential: ${key}`);
        const encrypted = encryptCredential(value);
        encryptedCredentials[key] = encrypted.encrypted;
        encryptionMetadata[`${key}_iv`] = encrypted.iv;
        encryptionMetadata[`${key}_auth_tag`] = encrypted.authTag;
      } else {
        console.log(`⏭️ Skipping empty credential: ${key}`);
        // Skip empty or non-string values
        continue;
      }
    }

    // Add algorithm info
    encryptionMetadata.algorithm = 'aes-256-gcm';
    encryptionMetadata.encrypted_at = new Date().toISOString();

    console.log('✅ Encryption completed successfully');
    console.log('📊 Encrypted credentials count:', Object.keys(encryptedCredentials).length);

    return NextResponse.json({
      encrypted: encryptedCredentials,
      metadata: encryptionMetadata
    });

  } catch (error) {
    console.error('💥 Credential encryption error:', error);
    
    // Provide specific error messages for common issues
    let errorMessage = 'Failed to encrypt credentials';
    let details = error.message;
    
    if (error.message.includes('ENCRYPTION_KEY')) {
      errorMessage = 'Encryption configuration error';
      details = 'Please check your ENCRYPTION_KEY environment variable setup.';
    }
    
    return NextResponse.json(
      { 
        error: errorMessage, 
        details,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 