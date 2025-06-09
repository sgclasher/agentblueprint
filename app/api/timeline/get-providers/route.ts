import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';

interface Provider {
    service_name: string;
    display_name: string;
    is_default: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const providers = await CredentialsRepository.getProvidersByType(supabase, user.id, 'ai_provider');

    return NextResponse.json(providers as Provider[]);
  } catch (error: any) {
    console.error('Error fetching AI providers:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch AI providers', details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
