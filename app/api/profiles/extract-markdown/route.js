import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { ProfileExtractionService } from '../../../services/profileExtractionService';
import { postProcessProfile } from '../../../lib/profileFieldMapper';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request) {
  try {
    // Parse request body
    const { markdown, preferredProvider } = await request.json();

    if (!markdown) {
      return NextResponse.json(
        { success: false, error: 'Markdown content is required' },
        { status: 400 }
      );
    }

    // Get user from request headers
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Authorization required' },
        { status: 401 }
      );
    }

    // Create Supabase client and verify user
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const token = authHeader.replace('Bearer ', '');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Invalid authentication' },
        { status: 401 }
      );
    }

    // Create extraction service instance
    const extractionService = new ProfileExtractionService();

    // Extract profile data from markdown
    const extractionResult = await extractionService.extractProfileFromMarkdown(
      markdown,
      user.id,
      preferredProvider
    );

    if (!extractionResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: extractionResult.error || 'Extraction failed',
          details: extractionResult 
        },
        { status: 500 }
      );
    }

    // Map extracted data to profile schema
    const mappedProfile = extractionService.mapToProfileSchema(extractionResult.data);
    
    // Post-process the profile to ensure all required fields exist
    const processedProfile = postProcessProfile(mappedProfile);

    // Generate extraction summary
    const summary = extractionService.generateExtractionSummary(extractionResult.data);

    // Log extraction metrics (useful for debugging and monitoring)
    console.log(`Profile extraction completed for user ${user.id}:`, {
      totalFields: summary.totalFields,
      highConfidence: summary.highConfidenceFields,
      averageConfidence: extractionResult.averageConfidence,
      provider: preferredProvider || 'default'
    });

    return NextResponse.json({
      success: true,
      extractionResult: {
        ...extractionResult,
        mappedProfile: processedProfile,
        summary
      }
    });

  } catch (error) {
    console.error('Profile extraction API error:', error);
    
    // Handle specific error types
    if (error.message?.includes('No AI provider configured')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No AI provider configured. Please configure at least one AI provider in the admin dashboard.' 
        },
        { status: 400 }
      );
    }

    if (error.message?.includes('rate limit')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded. Please try again later.' 
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to extract profile data',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 