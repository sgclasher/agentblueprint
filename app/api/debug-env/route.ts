import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const isAIConfigured = !!process.env.OPENAI_API_KEY;
    const isEncryptionConfigured = !!process.env.ENCRYPTION_KEY;
    
    let encryptionKeyValid = false;
    if (process.env.ENCRYPTION_KEY) {
      const keyHex = process.env.ENCRYPTION_KEY;
      const key = Buffer.from(keyHex, 'hex');
      encryptionKeyValid = key.length === 32; // 32 bytes for AES-256
    }
    
    const envStatus = {
      timestamp: new Date().toISOString(),
      aiService: {
        configured: isAIConfigured,
        provider: 'OpenAI GPT-4o',
        apiKeyStatus: isAIConfigured ? 'Set' : 'Missing'
      },
      credentialEncryption: {
        configured: isEncryptionConfigured,
        encryptionKeyStatus: isEncryptionConfigured ? 'Set' : 'Missing',
        encryptionKeyValid: encryptionKeyValid,
        encryptionKeyLength: process.env.ENCRYPTION_KEY ? process.env.ENCRYPTION_KEY.length : 0,
        expectedLength: 64 // 32 bytes = 64 hex characters
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        openaiKeyConfigured: isAIConfigured,
        openaiKeyLength: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0
      },
      features: {
        aiTimelineGeneration: isAIConfigured,
        credentialStorage: isEncryptionConfigured && encryptionKeyValid,
        profileMarkdownConversion: true,
        timelineValidation: true,
        adminInterface: isEncryptionConfigured && encryptionKeyValid
      },
      issues: [] as string[]
    };

    if (!isAIConfigured) {
      envStatus.issues.push('OPENAI_API_KEY not configured - AI timeline generation disabled');
    }
    if (!isEncryptionConfigured) {
      envStatus.issues.push('ENCRYPTION_KEY not configured - admin interface credential storage disabled');
    } else if (!encryptionKeyValid) {
      envStatus.issues.push('ENCRYPTION_KEY invalid - must be 64 hex characters (32 bytes)');
    }

    const overallConfigured = isAIConfigured && isEncryptionConfigured && encryptionKeyValid;

    return NextResponse.json({
      configured: overallConfigured,
      status: overallConfigured ? 'ready' : 'configuration_needed',
      ...envStatus
    });

  } catch (error: any) {
    console.error('Environment debug error:', error);
    return NextResponse.json({
      configured: false,
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 