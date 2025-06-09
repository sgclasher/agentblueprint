import { NextRequest, NextResponse } from 'next/server';
import { validateInstanceUrl, validateScopeId, checkRateLimit } from '../../../utils/validation';

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
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitCheck = await checkRateLimit(clientIP, 20, 60000);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfter: rateLimitCheck.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimitCheck.retryAfter) } }
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

    const username = process.env.SERVICENOW_USERNAME;
    const password = process.env.SERVICENOW_PASSWORD;

    if (!username || !password) {
      console.error('Server configuration error: ServiceNow credentials not found in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Authentication credentials not configured' },
        { status: 500 }
      );
    }

    const formattedUrl = urlValidation.sanitized!;
    const sanitizedScopeId = scopeValidation.sanitized!;

    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    const apiUrl = `${formattedUrl}/api/x_nowge_rfx_ai/ai_relationship_explorer/relationships?app_scope_id=${sanitizedScopeId}`;
    
    console.log(`Fetching from: ${apiUrl}`);
    
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
    
    console.log('API Response Structure:', JSON.stringify(data, null, 2));
    
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