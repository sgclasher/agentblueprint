import { NextRequest, NextResponse } from 'next/server';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';
import { Profile, Timeline } from '../../services/types';

interface TestAiPostBody {
    // profileId is no longer needed, we'll use the current user's profile
    useMarkdown?: boolean;
}

export async function POST(request: NextRequest) {
  try {
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

    let body: TestAiPostBody;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { useMarkdown = true } = body;

    // The profileId is no longer needed from the body.
    // We will get the profile for the currently authenticated user.
    const profile: Profile | null = await ProfileService.getCurrentUserProfile();
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found for current user' },
        { status: 404 }
      );
    }

    const timelineData: Timeline = await ProfileService.generateTimelineFromProfile(profile);
    const profileMarkdown: string = markdownService.generateMarkdown(profile);

    return NextResponse.json({
      success: true,
      profileId: profile.id, // Return the ID of the profile we used
      profileName: profile.companyName,
      timeline: timelineData,
      markdown: useMarkdown ? profileMarkdown : '[Hidden - set useMarkdown:true to view]',
      generatedAt: new Date().toISOString(),
      provider: 'OpenAI GPT-4o',
      method: 'Full Profile Markdown Context'
    });

  } catch (error: any) {
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

/*
export async function GET() {
  try {
    const profiles: Profile[] = await ProfileService.getProfiles();
    
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

  } catch (error: any) {
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
*/ 