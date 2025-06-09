import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { decryptCredential } from '../../../utils/encryption';
import { ServiceType, Credential } from '../../../admin/types';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface TestConnectionBody {
    credentialId: string;
    serviceType: ServiceType;
    serviceName: string;
}

interface TestResult {
    success: boolean;
    message?: string;
    error?: string;
    details?: any;
    timestamp: string;
    duration: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: TestConnectionBody = await request.json();
    const user = await getUser(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { credentialId, serviceType, serviceName } = body;

    if (!credentialId || !serviceType || !serviceName) {
      return NextResponse.json(
        { error: 'Credential ID, service type, and service name are required' },
        { status: 400 }
      );
    }

    const { data: credential, error: dbError } = await supabaseAdmin
      .from('external_service_credentials')
      .select('*')
      .eq('id', credentialId)
      .single();

    if (dbError || !credential) {
      return NextResponse.json(
        { error: 'Credential not found' },
        { status: 404 }
      );
    }

    if (credential.user_id !== user.id) {
        return NextResponse.json(
            { error: 'Access denied' },
            { status: 403 }
        );
    }
    
    const decryptedCredentials = await decryptStoredCredentials(
      credential.credentials_encrypted,
      credential.encryption_metadata
    );

    let testResult: TestResult;
    switch (serviceType) {
      case 'ai_provider':
        testResult = await testAIProvider(serviceName, decryptedCredentials, credential.configuration);
        break;
      case 'crm_system':
        testResult = await testCRMSystem(serviceName, decryptedCredentials, credential.configuration);
        break;
      default:
        return NextResponse.json(
          { error: `Unsupported service type: ${serviceType}` },
          { status: 400 }
        );
    }

    return NextResponse.json(testResult);

  } catch (error: any) {
    console.error('💥 Connection test error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Connection test failed', 
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

async function decryptStoredCredentials(encryptedCredentials: any, metadata: any): Promise<{ [key: string]: string }> {
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

async function testAIProvider(serviceName: string, credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    switch (serviceName) {
      case 'openai':
        return await testOpenAI(credentials, configuration);
      case 'gemini':
        return await testGemini(credentials, configuration);
      case 'claude':
        return await testClaude(credentials, configuration);
      default:
        throw new Error(`Unsupported AI provider: ${serviceName}`);
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

async function testCRMSystem(serviceName: string, credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    switch (serviceName) {
      case 'servicenow':
        return await testServiceNow(credentials, configuration);
      case 'hubspot':
        return await testHubSpot(credentials, configuration);
      default:
        throw new Error(`Unsupported CRM system: ${serviceName}`);
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

async function testOpenAI(credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('OpenAI API key is required');
  }

  const response = await fetch('https://api.openai.com/v1/models', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${api_key}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`OpenAI API error: ${response.status} - ${error.error?.message || 'Authentication failed'}`);
  }

  const data = await response.json();
  const models = data.data?.filter((model: any) => model.id.includes('gpt')) || [];

  return {
    success: true,
    message: 'OpenAI connection successful',
    details: {
      modelsAvailable: models.length,
      recommendedModel: configuration.model || 'gpt-4o',
      endpoint: 'https://api.openai.com/v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

async function testGemini(credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('Google API key is required');
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${api_key}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Gemini API error: ${response.status} - ${error.error?.message || 'Authentication failed'}`);
  }

  const data = await response.json();

  return {
    success: true,
    message: 'Google Gemini connection successful',
    details: {
      modelsAvailable: data.models?.length || 0,
      recommendedModel: configuration.model || 'gemini-pro',
      endpoint: 'https://generativelanguage.googleapis.com/v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

async function testClaude(credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('Anthropic API key is required');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': api_key,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: configuration.model || 'claude-3-sonnet-20240229',
      max_tokens: 10,
      messages: [
        { role: 'user', content: 'Test' }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Claude API error: ${response.status} - ${error.error?.message || 'Authentication failed'}`);
  }

  return {
    success: true,
    message: 'Anthropic Claude connection successful',
    details: {
      recommendedModel: configuration.model || 'claude-3-sonnet-20240229',
      endpoint: 'https://api.anthropic.com/v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

async function testServiceNow(credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
  const startTime = Date.now();
  const { username, password } = credentials;
  const { instance_url } = configuration;
  
  if (!username || !password || !instance_url) {
    throw new Error('ServiceNow username, password, and instance URL are required');
  }

  const response = await fetch(`${instance_url}/api/now/table/sys_user?sysparm_limit=1`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`ServiceNow API error: ${response.status} - Authentication failed`);
  }

  const data = await response.json();

  return {
    success: true,
    message: 'ServiceNow connection successful',
    details: {
      instanceUrl: instance_url,
      userCount: data.result?.length || 0,
      apiVersion: 'v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

async function testHubSpot(credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('HubSpot API key is required');
  }

  const response = await fetch(`https://api.hubapi.com/account-info/v3/details?hapikey=${api_key}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HubSpot API error: ${response.status} - Authentication failed`);
  }

  const data = await response.json();

  return {
    success: true,
    message: 'HubSpot connection successful',
    details: {
      accountId: data.portalId,
      accountName: data.accountName || 'Unknown',
      endpoint: 'https://api.hubapi.com'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
} 