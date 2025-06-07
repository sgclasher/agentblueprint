import { NextResponse } from 'next/server';
import { generateEncryptionKey } from '../../../utils/encryption';

/**
 * Generate Encryption Key Endpoint
 * 
 * Helps users generate a secure 256-bit encryption key for credential storage.
 * This is a one-time setup utility.
 */
export async function GET() {
  try {
    // Generate a secure 256-bit encryption key
    const encryptionKey = generateEncryptionKey();
    
    return NextResponse.json({
      success: true,
      encryptionKey,
      instructions: [
        '1. Copy the encryption key below',
        '2. Add it to your .env.local file as ENCRYPTION_KEY=<key>',
        '3. Restart your development server',
        '4. Your admin interface will now work for credential storage'
      ],
      envFormat: `ENCRYPTION_KEY=${encryptionKey}`,
      security: {
        keyLength: encryptionKey.length,
        algorithm: 'AES-256-GCM',
        warning: 'Keep this key secure and never commit it to version control!'
      }
    });

  } catch (error) {
    console.error('Encryption key generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate encryption key', 
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 