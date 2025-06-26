import { NextRequest, NextResponse } from 'next/server';
import { OpenAIServerProvider } from '../../../lib/llm/providers/openaiServerProvider';
import { GoogleServerProvider } from '../../../lib/llm/providers/googleServerProvider';
import { ClaudeServerProvider } from '../../../lib/llm/providers/claudeServerProvider';
import { checkRateLimit, getClientIdentifier } from '../../../utils/rateLimiter';

// Cache for model data (in-memory for simplicity)
interface CacheEntry {
  models: any[];
  timestamp: number;
}

const modelCache = new Map<string, CacheEntry>();
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Fallback models if API fetching fails
const FALLBACK_MODELS = {
  openai: [
    { id: 'gpt-4o', name: 'GPT-4o (Recommended - Stable & Multimodal)', description: 'Most capable and reliable GPT-4 model' },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini (Cost-Effective & Reliable)', description: 'Faster, cost-effective, and reliable' },
    { id: 'o1', name: 'o1 (Advanced Reasoning - Stable)', description: 'Advanced reasoning model - stable access' },
    { id: 'o1-mini', name: 'o1 Mini (Fast Reasoning - Stable)', description: 'Fast reasoning model - stable access' },
    { id: 'gpt-4.1', name: 'GPT-4.1 (1M Context)', description: '1M context window' },
    { id: 'o3-pro', name: 'o3-pro (2025 - Requires Pro Access)', description: 'Advanced reasoning - requires Pro subscription' },
    { id: 'o3', name: 'o3 (2025 - May Require Special Access)', description: 'Advanced reasoning - may require special access' },
    { id: 'o4-mini', name: 'o4 Mini (2025 - Limited Availability)', description: 'Fast reasoning - limited availability' },
    { id: 'codex-mini', name: 'Codex Mini (2025 - Limited Availability)', description: 'Code generation - limited availability' },
  ],
  gemini: [
    { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Recommended)', description: 'Fast and versatile' },
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Advanced)', description: 'Advanced reasoning' },
    { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash (Latest)', description: 'Latest stable model' },
  ],
  claude: [
    { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (Recommended)', description: 'Best balance' },
    { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku (Fast)', description: 'Fastest model' },
    { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus (Advanced)', description: 'Most intelligent' },
  ],
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { provider, forceRefresh = false } = body;

    // Validate provider parameter
    if (!provider) {
      return NextResponse.json(
        { error: 'Provider is required' },
        { status: 400 }
      );
    }

    const validProviders = ['openai', 'gemini', 'claude'];
    if (!validProviders.includes(provider)) {
      return NextResponse.json(
        { error: `Unsupported provider: ${provider}. Valid providers: ${validProviders.join(', ')}` },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientId = getClientIdentifier(request);
    const rateLimitResult = await checkRateLimit(clientId);
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          resetTime: rateLimitResult.resetTime 
        },
        { status: 429 }
      );
    }

    // Check cache first (unless forced refresh)
    const cacheKey = provider;
    const now = Date.now();
    const cachedEntry = modelCache.get(cacheKey);

    if (!forceRefresh && cachedEntry && (now - cachedEntry.timestamp) < CACHE_DURATION) {
      console.log(`[Fetch Models] Returning cached models for ${provider}`);
      return NextResponse.json({
        success: true,
        provider,
        models: cachedEntry.models,
        cached: true,
        cachedAt: new Date(cachedEntry.timestamp).toISOString(),
      });
    }

    // Fetch fresh models from provider
    console.log(`[Fetch Models] Fetching fresh models for ${provider}${forceRefresh ? ' (forced refresh)' : ''}`);
    
    let models;
    try {
      switch (provider) {
        case 'openai':
          models = await OpenAIServerProvider.fetchAvailableModels();
          break;
        case 'gemini':
          models = await GoogleServerProvider.fetchAvailableModels();
          break;
        case 'claude':
          models = await ClaudeServerProvider.fetchAvailableModels();
          break;
        default:
          throw new Error(`Unsupported provider: ${provider}`);
      }

      // Cache the successful result
      modelCache.set(cacheKey, {
        models,
        timestamp: now,
      });

      return NextResponse.json({
        success: true,
        provider,
        models,
        cached: false,
        fetchedAt: new Date().toISOString(),
        remaining: rateLimitResult.remaining,
      });

    } catch (error: any) {
      console.error(`[Fetch Models] Error fetching ${provider} models:`, error);
      
      // Return fallback models if available
      const fallbackModels = FALLBACK_MODELS[provider as keyof typeof FALLBACK_MODELS];
      
      return NextResponse.json({
        success: false,
        provider,
        error: error.message,
        fallbackModels,
        timestamp: new Date().toISOString(),
      });
    }

  } catch (error: any) {
    console.error('[Fetch Models] Unexpected error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    );
  }
} 