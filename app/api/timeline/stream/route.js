import { NextResponse } from 'next/server';
import { validateBusinessProfile, validateScenarioType, checkRateLimit } from '../../../utils/validation';
import { AIService } from '../../../services/aiService';

export async function POST(request) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitCheck = checkRateLimit(`timeline-stream-${clientIP}`, 3, 60000); // 3 streams per minute
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfter: rateLimitCheck.retryAfter },
        { status: 429, headers: { 'Retry-After': rateLimitCheck.retryAfter.toString() } }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI streaming not available - OpenAI API key not configured' },
        { status: 503 }
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

    // Validate scenario type
    const scenarioValidation = validateScenarioType(scenarioType);
    if (!scenarioValidation.isValid) {
      return NextResponse.json(
        { error: `Invalid scenario type: ${scenarioValidation.error}` },
        { status: 400 }
      );
    }

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    
    const customReadable = new ReadableStream({
      async start(controller) {
        try {
          // Send initial connection confirmation
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'connected',
              message: 'Timeline generation started',
              timestamp: new Date().toISOString()
            })}\n\n`)
          );

          // Generate timeline with streaming
          const streamGenerator = AIService.streamTimelineGeneration(
            profileValidation.sanitized,
            scenarioValidation.sanitized
          );

          for await (const chunk of streamGenerator) {
            const sseData = `data: ${JSON.stringify({
              type: chunk.type,
              data: chunk.data,
              progress: chunk.progress,
              error: chunk.error,
              timestamp: new Date().toISOString()
            })}\n\n`;
            
            controller.enqueue(encoder.encode(sseData));

            // If we have a complete timeline, we're done
            if (chunk.type === 'complete') {
              break;
            }

            // If there's an error, send it and close
            if (chunk.type === 'error') {
              break;
            }
          }

          // Send completion signal
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'done',
              message: 'Timeline generation completed',
              timestamp: new Date().toISOString()
            })}\n\n`)
          );

        } catch (error) {
          console.error('Streaming timeline generation error:', error);
          
          // Send error to client
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'error',
              error: error.message,
              timestamp: new Date().toISOString()
            })}\n\n`)
          );
        } finally {
          controller.close();
        }
      }
    });

    // Return streaming response
    return new Response(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('Streaming API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 