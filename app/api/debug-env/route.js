import { NextResponse } from 'next/server';

/**
 * Debug Environment Configuration Endpoint
 * 
 * This endpoint helps developers verify that the AI integration
 * is properly configured with all required environment variables.
 */
export async function GET() {
  try {
    const isConfigured = !!process.env.OPENAI_API_KEY;
    
    const envStatus = {
      timestamp: new Date().toISOString(),
      timelineService: {
        configured: isConfigured,
        provider: 'OpenAI GPT-4o',
        apiKeyStatus: isConfigured ? 'Set' : 'Missing'
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        openaiKeyConfigured: isConfigured,
        openaiKeyLength: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0
      },
      features: {
        aiTimelineGeneration: isConfigured,
        profileMarkdownConversion: true,
        timelineValidation: true
      }
    };

    return NextResponse.json({
      configured: isConfigured,
      status: isConfigured ? 'ready' : 'configuration_needed',
      ...envStatus
    });

  } catch (error) {
    console.error('Environment debug error:', error);
    return NextResponse.json({
      configured: false,
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 