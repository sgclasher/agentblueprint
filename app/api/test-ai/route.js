import { NextResponse } from 'next/server';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';

/**
 * Test AI Timeline Generation with Client Profile Markdown
 * 
 * This endpoint allows testing timeline generation using the full markdown
 * representation of client profiles for richer AI context.
 */
export async function POST(request) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'AI timeline generation not available', 
          details: 'OpenAI API key not configured.',
          configured: false
        },
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

    const { profileId, useMarkdown = true } = body;

    if (!profileId) {
      return NextResponse.json(
        { error: 'Profile ID is required' },
        { status: 400 }
      );
    }

    // Get the profile
    const profile = await ProfileService.getProfile(profileId);
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Generate timeline using the profile service (which uses full markdown)
    const timelineData = await ProfileService.generateTimelineFromProfile(profile);

    // Also generate the markdown for inspection
    const profileMarkdown = markdownService.generateMarkdown(profile);

    return NextResponse.json({
      success: true,
      profileId,
      profileName: profile.companyName,
      timeline: timelineData,
      markdown: useMarkdown ? profileMarkdown : '[Hidden - set useMarkdown:true to view]',
      generatedAt: new Date().toISOString(),
      provider: 'OpenAI GPT-4o',
      method: 'Full Profile Markdown Context'
    });

  } catch (error) {
    console.error('Test AI endpoint error:', error);
    return NextResponse.json(
      { 
        error: 'Timeline generation failed',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * Get available test profiles
 */
export async function GET() {
  try {
    const profiles = await ProfileService.getProfiles();
    
    const testProfiles = profiles.map(profile => ({
      id: profile.id,
      companyName: profile.companyName,
      industry: profile.industry,
      size: profile.size,
      hasMarkdown: !!profile.markdown,
      createdAt: profile.createdAt
    }));

    return NextResponse.json({
      available: testProfiles.length > 0,
      profiles: testProfiles,
      message: testProfiles.length > 0 
        ? 'Use POST with profileId to test timeline generation'
        : 'No profiles available. Create one first at /profiles'
    });

  } catch (error) {
    console.error('Get test profiles error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get test profiles',
        details: error.message
      },
      { status: 500 }
    );
  }
} 