import { NextRequest, NextResponse } from 'next/server';

interface ServiceNowRequestBody {
    instanceUrl: string;
    username: string;
    password: string;
    tableName: string;
    fields?: string[];
    scope?: string;
    query?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ServiceNowRequestBody = await request.json();
    const { 
      instanceUrl, 
      username, 
      password, 
      tableName, 
      fields = [], 
      scope = '',
      query = ''
    } = body;

    if (!instanceUrl || !username || !password || !tableName) {
      return NextResponse.json(
        { error: 'Missing required parameters: instanceUrl, username, password, tableName' },
        { status: 400 }
      );
    }

    let url = `${instanceUrl}/api/now/table/${tableName}?`;
    
    const queryParams: string[] = [];
    
    if (scope) {
      queryParams.push(`sysparm_query=sys_scope=${scope}${query ? '^' + query : ''}`);
    } else if (query) {
      queryParams.push(`sysparm_query=${query}`);
    }
    
    if (fields.length > 0) {
      queryParams.push(`sysparm_fields=${fields.join(',')}`);
    }
    
    queryParams.push('sysparm_display_value=false');
    queryParams.push('sysparm_exclude_reference_link=true');
    
    url += queryParams.join('&');
    
    console.log(`Proxying request to: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ServiceNow Error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { 
          error: `ServiceNow request failed with status ${response.status}`,
          details: errorText
        },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('Error in ServiceNow proxy API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 