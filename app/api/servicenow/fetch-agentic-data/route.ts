import { NextRequest, NextResponse } from 'next/server';
import { validateInstanceUrl, validateScopeId } from '../../../utils/validation';
import { checkRateLimit, getClientIdentifier } from '../../../utils/rateLimiter';
import { getUser } from '../../../lib/supabase';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import { decryptCredential } from '../../../utils/encryption';

const get = <T>(obj: any, path: string, defaultValue: T | undefined = undefined): T | undefined => {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      result = result?.[key];
      if (result === undefined) {
        return defaultValue;
      }
    }
    return result as T;
  };
  
interface FetchAgenticDataBody {
    instanceUrl: string;
    scopeId: string;
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIdentifier(request);
    
    const rateLimitCheck = await checkRateLimit(clientIP);
    if (!rateLimitCheck.allowed) {
      const retryAfter = rateLimitCheck.resetTime ? Math.ceil((rateLimitCheck.resetTime - Date.now()) / 1000) : 60;
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfter },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    let body: FetchAgenticDataBody;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { instanceUrl, scopeId } = body;

    const urlValidation = validateInstanceUrl(instanceUrl);
    if (!urlValidation.isValid) {
      return NextResponse.json(
        { error: `Invalid instance URL: ${urlValidation.error}` },
        { status: 400 }
      );
    }

    const scopeValidation = validateScopeId(scopeId);
    if (!scopeValidation.isValid) {
      return NextResponse.json(
        { error: `Invalid scope ID: ${scopeValidation.error}` },
        { status: 400 }
      );
    }

    // Get authenticated user and their ServiceNow credentials
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get ServiceNow credentials from admin system
    const allCredentials = await CredentialsRepository.getCredentials(
      user.id,
      'integration_platform'
    );

    // Filter for ServiceNow credentials
    const serviceNowCredentials = allCredentials.filter(
      (cred: any) => cred.service_name === 'servicenow' && cred.is_active
    );

    if (!serviceNowCredentials || serviceNowCredentials.length === 0) {
      return NextResponse.json(
        { error: 'ServiceNow credentials not configured. Please configure your ServiceNow credentials in the admin panel.' },
        { status: 400 }
      );
    }

    // Get the default ServiceNow credential, or first available
    const credential = serviceNowCredentials.find((cred: any) => cred.is_default) || serviceNowCredentials[0];
    
    // Decrypt the credentials
    const decryptedCredentials = await decryptStoredCredentials(
      credential.credentials_encrypted,
      credential.encryption_metadata
    );
    
    const { username, password } = decryptedCredentials || {};

    if (!username || !password) {
      return NextResponse.json(
        { error: 'ServiceNow credentials incomplete. Please update your ServiceNow credentials in the admin panel.' },
        { status: 400 }
      );
    }

    const formattedUrl = urlValidation.sanitized!;
    const sanitizedScopeId = scopeValidation.sanitized!;

    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    const apiUrl = `${formattedUrl}/api/x_nowge_rfx_ai/ai_relationship_explorer/relationships?app_scope_id=${sanitizedScopeId}`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch data from scripted REST API: ${response.status} ${response.statusText}. Details: ${errorText}`);
    }

    const data = await response.json();
    
    if (data.x_nowge_rfx_ai && data.x_nowge_rfx_ai.use_cases) {
      return NextResponse.json({ use_cases: data.x_nowge_rfx_ai.use_cases });
    } else if (data.result && data.result.use_cases) {
      return NextResponse.json({ use_cases: data.result.use_cases });
    } else if (data.use_cases) {
      return NextResponse.json(data);
    } else {
      console.error('Could not find use_cases in the API response:', data);
      return NextResponse.json(data);
    }

  } catch (error: any) {
    console.error('Error in fetch-agentic-data API route:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch or process ServiceNow data' },
      { status: 500 }
    );
  }
}

async function decryptStoredCredentials(encryptedCredentials: any, metadata: any): Promise<{ [key: string]: any }> {
  // Handle new AI provider format: encryptedCredentials is a string
  if (typeof encryptedCredentials === 'string') {
    try {
      const decrypted = decryptCredential(
        encryptedCredentials,
        metadata.iv,
        metadata.authTag
      );
      // Should be a JSON string: { apiKey: "...", model: "..." }
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to decrypt single-string credentials:', error);
      throw new Error('Failed to decrypt credentials (single-string)');
    }
  }
  // Legacy/multi-field format
  const decrypted: { [key: string]: string } = {};
  for (const [key, encryptedValue] of Object.entries(encryptedCredentials)) {
    if (typeof encryptedValue === 'string' && metadata[`${key}_iv`] && metadata[`${key}_auth_tag`]) {
      try {
        decrypted[key] = decryptCredential(
          encryptedValue,
          metadata[`${key}_iv`],
          metadata[`${key}_auth_tag`]
        );
      } catch (error) {
        console.error(`Failed to decrypt credential ${key}:`, error);
        throw new Error(`Failed to decrypt credential: ${key}`);
      }
    }
  }
  return decrypted;
} 