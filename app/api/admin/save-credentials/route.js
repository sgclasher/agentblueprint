import { NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { createClient } from '@supabase/supabase-js';

// Create service role client for server-side database operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    // Verify user authentication
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const {
      id,
      serviceType,
      serviceName,
      displayName,
      encryptedCredentials,
      encryptionMetadata,
      configuration = {},
      isActive = true,
      isDefault = false
    } = body;

    console.log('💾 Server-side save credentials for user:', user.id);

    const recordData = {
      user_id: user.id,
      service_type: serviceType,
      service_name: serviceName,
      display_name: displayName,
      credentials_encrypted: encryptedCredentials,
      encryption_metadata: encryptionMetadata,
      configuration,
      is_active: isActive,
      is_default: isDefault,
      updated_at: new Date().toISOString()
    };

    let result;
    if (id) {
      console.log('🔄 Updating existing credential with ID:', id);
      const { data, error } = await supabaseAdmin
        .from('external_service_credentials')
        .update(recordData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      console.log('➕ Creating new credential...');
      const { data, error } = await supabaseAdmin
        .from('external_service_credentials')
        .insert([{
          ...recordData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    console.log('✅ Credential saved successfully:', result.id);
    return NextResponse.json(result);

  } catch (error) {
    console.error('❌ Save credentials error:', error);
    return NextResponse.json(
      { error: 'Failed to save credentials', details: error.message },
      { status: 500 }
    );
  }
} 