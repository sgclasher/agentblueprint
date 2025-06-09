import { NextResponse } from 'next/server';
import { generateEncryptionKey } from '../../../utils/encryption';

export async function GET() {
  try {
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

  } catch (error: any) {
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