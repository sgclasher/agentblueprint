import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { ServiceType } from '../../../admin/types';

interface TestCredentialsBody {
    serviceType: ServiceType;
    serviceName: string;
    credentials: { [key: string]: any };
    configuration?: { [key: string]: any };
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
  console.log('🔍 test-credentials route called');
  
  try {
    let body: TestCredentialsBody;
    try {
      body = await request.json();
      console.log('📝 Request body:', JSON.stringify(body, null, 2));
    } catch (error: any) {
      console.log('❌ JSON parse error:', error.message);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    console.log('🔐 Checking authentication...');
    const user = await getUser(request);
    console.log('👤 User result:', user ? `User ID: ${user.id}` : 'No user');
    
    if (!user) {
      console.log('🚫 Authentication failed - returning 401');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { serviceType, serviceName, credentials, configuration } = body;
    console.log('🔧 Extracted params:', { serviceType, serviceName, hasCredentials: !!credentials, hasConfiguration: !!configuration });

    if (!serviceType || !serviceName || !credentials) {
      console.log('❌ Missing required parameters');
      return NextResponse.json(
        { error: 'Service type, service name, and credentials are required' },
        { status: 400 }
      );
    }

    console.log('🧪 Starting direct credential test...');
    let testResult: TestResult;
    switch (serviceType) {
      case 'ai_provider':
        testResult = await testAIProvider(serviceName, credentials, configuration);
        break;
      case 'crm_system':
        testResult = await testCRMSystem(serviceName, credentials, configuration);
        break;
      case 'integration_platform':
        testResult = await testIntegrationPlatform(serviceName, credentials, configuration);
        break;
      default:
        console.log('❌ Unsupported service type:', serviceType);
        return NextResponse.json(
          { error: `Unsupported service type: ${serviceType}` },
          { status: 400 }
        );
    }

    console.log('✅ Test completed:', testResult.success ? 'SUCCESS' : 'FAILED');
    return NextResponse.json(testResult);

  } catch (error: any) {
    console.error('💥 Credential test error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Credential test failed', 
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

async function testAIProvider(serviceName: string, credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
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

async function testCRMSystem(serviceName: string, credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    switch (serviceName) {
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

async function testIntegrationPlatform(serviceName: string, credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
  const startTime = Date.now();
  
  try {
    switch (serviceName) {
      case 'servicenow':
        return await testServiceNow(credentials, configuration);
      default:
        throw new Error(`Unsupported integration platform: ${serviceName}`);
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

async function testOpenAI(credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
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
        recommendedModel: configuration?.model || 'gpt-4o',
        endpoint: 'https://api.openai.com/v1'
      },
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
  
  async function testGemini(credentials: { [key: string]: any }, configuration: { [key: string]: any }| undefined): Promise<TestResult> {
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
        recommendedModel: configuration?.model || 'gemini-pro',
        endpoint: 'https://generativelanguage.googleapis.com/v1'
      },
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
  
  async function testClaude(credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
    const startTime = Date.now();
    const { api_key, model } = credentials;
    
    if (!api_key) {
      throw new Error('Anthropic API key is required');
    }
  
    const modelToUse = configuration?.model || model;
    if (!modelToUse) {
      throw new Error('Anthropic model is required');
    }
  
    const requestBody = {
      model: modelToUse,
      max_tokens: 10,
      messages: [
        { role: 'user', content: 'Test' }
      ]
    };
  
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': api_key,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });
  
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`Claude API error: ${response.status} - ${error.error?.message || 'Authentication failed'}`);
    }
  
    return {
      success: true,
      message: 'Anthropic Claude connection successful',
      details: {
        recommendedModel: modelToUse,
        endpoint: 'https://api.anthropic.com/v1'
      },
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
  
  async function testServiceNow(credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
    const startTime = Date.now();
    const { username, password } = credentials;

    if (!configuration || !configuration.instance_url) {
        throw new Error('ServiceNow instance URL is required in configuration');
    }
    const { instance_url } = configuration;
    
    if (!username || !password) {
      throw new Error('ServiceNow username and password are required');
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
  
  async function testHubSpot(credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
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
