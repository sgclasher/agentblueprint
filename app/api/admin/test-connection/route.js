import { NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { supabase } from '../../../lib/supabase';
import { decryptCredential } from '../../../utils/encryption';

export async function POST(request) {
  console.log('🔍 test-connection route called');
  
  try {
    // Parse request body first for debugging
    let body;
    try {
      body = await request.json();
      console.log('📝 Request body:', JSON.stringify(body, null, 2));
    } catch (error) {
      console.log('❌ JSON parse error:', error.message);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Verify user authentication
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

    const { credentialId, serviceType, serviceName } = body;
    console.log('🔧 Extracted params:', { credentialId, serviceType, serviceName });

    if (!credentialId || !serviceType || !serviceName) {
      console.log('❌ Missing required parameters');
      return NextResponse.json(
        { error: 'Credential ID, service type, and service name are required' },
        { status: 400 }
      );
    }

    console.log('🗃️ Querying database for credential...');
    
    // First, let's see what credentials exist for this user
    const { data: allCredentials, error: allCredsError } = await supabase
      .from('external_service_credentials')
      .select('id, display_name, service_type, service_name, created_at')
      .eq('user_id', user.id);
    
    console.log('📊 All credentials for user:', {
      count: allCredentials?.length || 0,
      credentials: allCredentials?.map(c => ({ id: c.id, name: c.display_name, type: c.service_type, service: c.service_name })) || []
    });
    
    // Now try to get the specific credential
    const { data: credential, error: dbError } = await supabase
      .from('external_service_credentials')
      .select('*')
      .eq('id', credentialId)
      .eq('user_id', user.id)
      .single();

    console.log('💾 Database query result:', {
      found: !!credential,
      error: dbError?.message,
      credentialId,
      searchingForId: credentialId,
      availableIds: allCredentials?.map(c => c.id) || []
    });

    if (dbError || !credential) {
      console.log('🚫 Credential not found - returning 404');
      return NextResponse.json(
        { error: 'Credential not found or access denied' },
        { status: 404 }
      );
    }

    console.log('🔓 Decrypting credentials...');
    // Decrypt credentials
    const decryptedCredentials = await decryptStoredCredentials(
      credential.credentials_encrypted,
      credential.encryption_metadata
    );

    console.log('🧪 Starting connection test...');
    // Test connection based on service type
    let testResult;
    switch (serviceType) {
      case 'ai_provider':
        testResult = await testAIProvider(serviceName, decryptedCredentials, credential.configuration);
        break;
      case 'crm_system':
        testResult = await testCRMSystem(serviceName, decryptedCredentials, credential.configuration);
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

  } catch (error) {
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

/**
 * Decrypt stored credentials using metadata
 */
async function decryptStoredCredentials(encryptedCredentials, metadata) {
  const decrypted = {};
  
  for (const [key, encryptedValue] of Object.entries(encryptedCredentials)) {
    if (encryptedValue && metadata[`${key}_iv`] && metadata[`${key}_auth_tag`]) {
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

/**
 * Test AI provider connections
 */
async function testAIProvider(serviceName, credentials, configuration) {
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
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

/**
 * Test CRM system connections
 */
async function testCRMSystem(serviceName, credentials, configuration) {
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
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

/**
 * Test OpenAI connection
 */
async function testOpenAI(credentials, configuration) {
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
  const models = data.data?.filter(model => model.id.includes('gpt')) || [];

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

/**
 * Test Google Gemini connection
 */
async function testGemini(credentials, configuration) {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('Google API key is required');
  }

  // Test with a simple generate request
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

/**
 * Test Anthropic Claude connection
 */
async function testClaude(credentials, configuration) {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('Anthropic API key is required');
  }

  // Test with a simple messages request
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${api_key}`,
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

/**
 * Test ServiceNow connection
 */
async function testServiceNow(credentials, configuration) {
  const startTime = Date.now();
  const { username, password } = credentials;
  const { instance_url } = configuration;
  
  if (!username || !password || !instance_url) {
    throw new Error('ServiceNow username, password, and instance URL are required');
  }

  // Test with a simple sys_user query
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

/**
 * Test HubSpot connection
 */
async function testHubSpot(credentials, configuration) {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('HubSpot API key is required');
  }

  // Test with account info endpoint
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