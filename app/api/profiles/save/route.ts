import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUser } from '../../../lib/supabase';
import { markdownService } from '../../../services/markdownService';

// Initialize Supabase client with service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const profileData = await request.json();
    
    // Remove id from profileData to avoid conflicts
    const { id, ...dataForJson } = profileData;
    
    // Prepare the profile data for database
    const profileToSave: any = {
      user_id: user.id,
      profile_data: dataForJson,
      markdown_content: markdownService.generateMarkdown(profileData),
      updated_at: new Date().toISOString()
    };

    // If it's a new profile, set creation date
    if (!id) {
      profileToSave.created_at = new Date().toISOString();
    }

    // Use service role to bypass RLS and upsert the profile
    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileToSave, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      console.error('❌ Server-side profile save error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to save profile' },
        { status: 500 }
      );
    }

    // Transform the response to match client expectations
    const savedProfile = {
      id: data.id,
      ...data.profile_data,
      markdown: data.markdown_content,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    console.log(`✅ Profile saved successfully for user ${user.id}`);

    return NextResponse.json({
      success: true,
      profile: savedProfile
    });

  } catch (error: any) {
    console.error('💥 Profile save API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save profile',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
} 