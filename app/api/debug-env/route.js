import { NextResponse } from 'next/server';
import { TimelineService } from '../../services/timelineService';

/**
 * Debug Environment Configuration Endpoint
 * 
 * This endpoint helps developers verify that the AI integration
 * is properly configured with all required environment variables.
 */
export async function GET() {
  try {
    const envStatus = {
      timestamp: new Date().toISOString(),
      timelineService: TimelineService.getStatus(),
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        openaiKeyConfigured: !!process.env.OPENAI_API_KEY,
        openaiKeyLength: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0
      },
      features: {
        aiTimelineGeneration: !!process.env.OPENAI_API_KEY,
        profileMarkdownConversion: true,
        timelineValidation: true
      }
    };

    const allConfigured = envStatus.timelineService.configured;

    return NextResponse.json({
      configured: allConfigured,
      status: allConfigured ? 'ready' : 'configuration_needed',
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