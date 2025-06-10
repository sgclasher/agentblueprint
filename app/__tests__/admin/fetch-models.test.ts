import { NextRequest } from 'next/server';
import { POST } from '../../api/admin/fetch-models/route';

// Mock the provider classes
jest.mock('../../lib/llm/providers/openaiServerProvider', () => ({
  OpenAIServerProvider: {
    fetchAvailableModels: jest.fn(),
  },
}));

jest.mock('../../lib/llm/providers/googleServerProvider', () => ({
  GoogleServerProvider: {
    fetchAvailableModels: jest.fn(),
  },
}));

jest.mock('../../lib/llm/providers/claudeServerProvider', () => ({
  ClaudeServerProvider: {
    fetchAvailableModels: jest.fn(),
  },
}));

// Mock rate limiting
jest.mock('../../utils/rateLimiter', () => ({
  checkRateLimit: jest.fn(),
  getClientIdentifier: jest.fn().mockReturnValue('test-client'),
}));

describe('/api/admin/fetch-models', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Clear the module cache to reset the cache Map
    jest.resetModules();
    
    // Re-mock rate limiter after resetModules
    jest.doMock('../../utils/rateLimiter', () => ({
      checkRateLimit: jest.fn().mockResolvedValue({ allowed: true, remaining: 9 }),
      getClientIdentifier: jest.fn().mockReturnValue('test-client'),
    }));
  });

  const createMockRequest = (body: any) => ({
    json: async () => body,
    headers: { get: (name: string) => name === 'x-forwarded-for' ? '127.0.0.1' : null }
  } as unknown as NextRequest);

  describe('OpenAI Models', () => {
    it('should fetch OpenAI models successfully', async () => {
      const mockModels = [
        { id: 'gpt-4o', name: 'GPT-4o (Recommended)', description: 'Most capable GPT-4 model' },
        { id: 'gpt-4.1', name: 'GPT-4.1 (Latest)', description: '1M context window' },
        { id: 'o1', name: 'o1 (Reasoning)', description: 'Advanced reasoning model' },
      ];

      // Need to re-require after resetModules
      jest.doMock('../../lib/llm/providers/openaiServerProvider', () => ({
        OpenAIServerProvider: {
          fetchAvailableModels: jest.fn().mockResolvedValue(mockModels),
        },
      }));

      const { POST } = require('../../api/admin/fetch-models/route');
      const request = createMockRequest({ provider: 'openai' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.provider).toBe('openai');
      expect(data.models).toEqual(mockModels);
      expect(data.cached).toBe(false);
    });

    it('should handle OpenAI API errors gracefully', async () => {
      // Need to re-require after resetModules
      jest.doMock('../../lib/llm/providers/openaiServerProvider', () => ({
        OpenAIServerProvider: {
          fetchAvailableModels: jest.fn().mockRejectedValue(
            new Error('OpenAI API rate limit exceeded')
          ),
        },
      }));
      
      const { POST } = require('../../api/admin/fetch-models/route');
      const request = createMockRequest({ provider: 'openai' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(false);
      expect(data.error).toBe('OpenAI API rate limit exceeded');
      expect(data.fallbackModels).toBeDefined();
    });
  });

  describe('Google Gemini Models', () => {
    it('should fetch Gemini models successfully', async () => {
      const mockModels = [
        { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash (Recommended)', description: 'Fast and versatile' },
        { id: 'gemini-2.5-pro-preview-06-05', name: 'Gemini 2.5 Pro Preview', description: 'Most advanced' },
        { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Latest stable' },
      ];

      // Need to re-require after resetModules  
      jest.doMock('../../lib/llm/providers/googleServerProvider', () => ({
        GoogleServerProvider: {
          fetchAvailableModels: jest.fn().mockResolvedValue(mockModels),
        },
      }));

      const { POST } = require('../../api/admin/fetch-models/route');
      const request = createMockRequest({ provider: 'gemini' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.provider).toBe('gemini');
      expect(data.models).toEqual(mockModels);
    });

    it('should handle Gemini API errors gracefully', async () => {
      // Need to re-require after resetModules
      jest.doMock('../../lib/llm/providers/googleServerProvider', () => ({
        GoogleServerProvider: {
          fetchAvailableModels: jest.fn().mockRejectedValue(
            new Error('Invalid API key')
          ),
        },
      }));
      
      const { POST } = require('../../api/admin/fetch-models/route');
      const request = createMockRequest({ provider: 'gemini' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid API key');
      expect(data.fallbackModels).toBeDefined();
    });
  });

  describe('Anthropic Claude Models', () => {
    it('should fetch Claude models successfully', async () => {
      const mockModels = [
        { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet (Recommended)', description: 'Best balance of intelligence and speed' },
        { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4', description: 'Latest high-performance model' },
        { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku', description: 'Fastest model' },
      ];

      // Need to re-require after resetModules
      jest.doMock('../../lib/llm/providers/claudeServerProvider', () => ({
        ClaudeServerProvider: {
          fetchAvailableModels: jest.fn().mockResolvedValue(mockModels),
        },
      }));

      const { POST } = require('../../api/admin/fetch-models/route');
      const request = createMockRequest({ provider: 'claude' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.provider).toBe('claude');
      expect(data.models).toEqual(mockModels);
    });
  });

  describe('Caching', () => {
    beforeEach(() => {
      // Don't reset modules for caching tests - we need to test actual cache behavior
      jest.clearAllMocks();
      const { checkRateLimit } = require('../../utils/rateLimiter');
      checkRateLimit.mockResolvedValue({ allowed: true, remaining: 9 });
    });

    it('should return cached models when available', async () => {
      const mockModels = [
        { id: 'gpt-4o', name: 'GPT-4o (Recommended)', description: 'Most capable GPT-4 model' },
      ];

      // First request - should fetch from API
      const { OpenAIServerProvider } = require('../../lib/llm/providers/openaiServerProvider');
      OpenAIServerProvider.fetchAvailableModels.mockResolvedValue(mockModels);

      const { POST } = require('../../api/admin/fetch-models/route');
      const request1 = createMockRequest({ provider: 'openai' });
      const response1 = await POST(request1);
      const data1 = await response1.json();

      expect(data1.cached).toBe(false);
      expect(OpenAIServerProvider.fetchAvailableModels).toHaveBeenCalledTimes(1);

      // Second request within cache period - should return cached
      const request2 = createMockRequest({ provider: 'openai' });
      const response2 = await POST(request2);
      const data2 = await response2.json();

      expect(data2.cached).toBe(true);
      expect(data2.models).toEqual(mockModels);
      // Should not call API again
      expect(OpenAIServerProvider.fetchAvailableModels).toHaveBeenCalledTimes(1);
    });

    it('should allow forced refresh bypass cache', async () => {
      const mockModels = [
        { id: 'gpt-4o', name: 'GPT-4o (Recommended)', description: 'Most capable GPT-4 model' },
      ];

      const { OpenAIServerProvider } = require('../../lib/llm/providers/openaiServerProvider');
      OpenAIServerProvider.fetchAvailableModels.mockResolvedValue(mockModels);

      const { POST } = require('../../api/admin/fetch-models/route');
      
      // First request
      const request1 = createMockRequest({ provider: 'openai' });
      await POST(request1);

      // Second request with forceRefresh
      const request2 = createMockRequest({ provider: 'openai', forceRefresh: true });
      const response2 = await POST(request2);
      const data2 = await response2.json();

      expect(data2.cached).toBe(false);
      // Should call API twice due to forced refresh
      expect(OpenAIServerProvider.fetchAvailableModels).toHaveBeenCalledTimes(2);
    });
  });

  describe('Rate Limiting', () => {
    it('should enforce rate limits', async () => {
      // Mock rate limiter to return not allowed
      jest.doMock('../../utils/rateLimiter', () => ({
        checkRateLimit: jest.fn().mockResolvedValue({ 
          allowed: false, 
          resetTime: Date.now() + 60000 
        }),
        getClientIdentifier: jest.fn().mockReturnValue('test-client'),
      }));

      const { POST } = require('../../api/admin/fetch-models/route');
      const request = createMockRequest({ provider: 'openai' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.error).toContain('Rate limit');
    });
  });

  describe('Input Validation', () => {
    it('should validate provider parameter', async () => {
      const request = createMockRequest({ provider: 'invalid_provider' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Unsupported provider');
    });

    it('should require provider parameter', async () => {
      const request = createMockRequest({});
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Provider is required');
    });

    it('should handle malformed JSON', async () => {
      const request = {
        json: async () => { throw new Error('Invalid JSON') },
        headers: { get: () => null }
      } as unknown as NextRequest;

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Invalid JSON');
    });
  });

  describe('Fallback Behavior', () => {
    it('should return hardcoded models when API fails', async () => {
      // Need to re-require after resetModules
      jest.doMock('../../lib/llm/providers/openaiServerProvider', () => ({
        OpenAIServerProvider: {
          fetchAvailableModels: jest.fn().mockRejectedValue(
            new Error('Network error')
          ),
        },
      }));
      
      const { POST } = require('../../api/admin/fetch-models/route');
      const request = createMockRequest({ provider: 'openai' });
      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(false);
      expect(data.fallbackModels).toBeDefined();
      expect(Array.isArray(data.fallbackModels)).toBe(true);
      expect(data.fallbackModels.length).toBeGreaterThan(0);
    });
  });
}); 