import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { validateBusinessProfile, validateScenarioType, checkRateLimit } from '../../../utils/validation';
import { TimelineService } from '../../../services/timelineService';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import type { BusinessProfile } from '../../../utils/validation';

interface RequestBody {
  businessProfile: BusinessProfile;
  scenarioType: string;
}

interface AiStatus {
  configured: boolean;
  provider: string;
  apiKeyStatus: string;
}

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // Check if the AI service is configured via TimelineService
    if (!await TimelineService.isConfigured(userId, CredentialsRepository)) {
      const status: AiStatus = await TimelineService.getStatus(userId, CredentialsRepository) as any;
      return NextResponse.json(
        {
          error: 'AI timeline generation not available',
          details: 'The AI service is not configured on the server. Please contact the administrator.',
          ...status
        },
        { status: 503 }
      );
    }

    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    const rateLimitCheck = await checkRateLimit(`timeline-${userId}`, 20, 60000); // 20 timeline generations per minute per user
    if (!rateLimitCheck.allowed) {
      const headers = new Headers();
      if (rateLimitCheck.retryAfter) {
        headers.set('Retry-After', rateLimitCheck.retryAfter.toString());
      }
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfter: rateLimitCheck.retryAfter },
        { status: 429, headers }
      );
    }

    // Parse request body
    let body: RequestBody;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { businessProfile, scenarioType } = body;

    // Validate business profile
    const profileValidation = validateBusinessProfile(businessProfile);
    if (!profileValidation.isValid) {
      return NextResponse.json(
        {
          error: 'Invalid business profile',
          details: profileValidation.errors
        },
        { status: 400 }
      );
    }

    if (!profileValidation.sanitized) {
        return NextResponse.json(
            {
                error: 'Invalid business profile',
                details: profileValidation.errors
            },
            { status: 400 }
        );
    }

    // Validate scenario type
    const scenarioValidation = validateScenarioType(scenarioType);
    if (!scenarioValidation.isValid) {
      return NextResponse.json(
        { error: `Invalid scenario type: ${scenarioValidation.error}` },
        { status: 400 }
      );
    }

    // Generate timeline using the AI-powered service
    try {
      const timelineData = await TimelineService.generateTimeline(
        profileValidation.sanitized,
        scenarioValidation.sanitized,
        userId,
        CredentialsRepository
      );

      // TODO: Refactor TimelineService.getStatus to return a typed object
      const status = await TimelineService.getStatus(userId, CredentialsRepository) as any as AiStatus;

      return NextResponse.json({
        success: true,
        timeline: timelineData,
        generatedAt: new Date().toISOString(),
        provider: status.provider
      });

    } catch (serviceError: any) {
      console.error('Timeline generation service error:', serviceError);

      return NextResponse.json(
        {
          error: 'AI timeline generation failed',
          details: serviceError.message,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Timeline API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: (error as Error).message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 