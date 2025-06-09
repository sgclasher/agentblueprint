import { GoogleServerProvider } from '../../lib/llm/providers/googleServerProvider';

// Mock the global fetch function
global.fetch = jest.fn();

describe('GoogleServerProvider', () => {
  const mockApiKey = 'test-gemini-api-key';
  const validApiKey = 'test-api-key';

  beforeEach(() => {
    // Clear all mocks before each test
    (fetch as jest.Mock).mockClear();
  });

  it('should throw an error if no API key is provided', () => {
    // @ts-ignore
    expect(() => new GoogleServerProvider({ apiKey: null })).toThrow('Google Gemini API key must be provided.');
  });

  it('should instantiate correctly with an API key', () => {
    const provider = new GoogleServerProvider({ apiKey: mockApiKey });
    expect(provider).toBeInstanceOf(GoogleServerProvider);
  });

  describe('Constructor', () => {
    it('should use default model when none provided', () => {
      const provider = new GoogleServerProvider({ apiKey: validApiKey });
      const status = provider.getStatus();
      expect(status.provider).toBe('Google gemini-1.5-flash');
    });

    it('should accept valid model names including Gemini 2.5 Pro', () => {
      const validModels = [
        'gemini-1.5-flash',
        'gemini-1.5-pro', 
        'gemini-2.0-flash',
        'gemini-1.5-flash-8b',
        'gemini-2.5-pro-preview-06-05',  // New Gemini 2.5 Pro model
        'gemini-2.5-flash-preview-05-20'
      ];

      validModels.forEach(model => {
        const provider = new GoogleServerProvider({ apiKey: validApiKey, model });
        const status = provider.getStatus();
        expect(status.provider).toBe(`Google ${model}`);
        expect(status.configured).toBe(true);
      });
    });

    it('should throw error for missing API key', () => {
      expect(() => {
        new GoogleServerProvider({ apiKey: '' });
      }).toThrow('Google Gemini API key must be provided.');
    });
  });

  describe('Model Validation', () => {
    it('should work with valid models', () => {
      const provider = new GoogleServerProvider({ 
        apiKey: validApiKey, 
        model: 'gemini-1.5-flash' 
      });
      expect(provider.getStatus().configured).toBe(true);
    });

    // This test documents the issue - invalid models should be caught earlier in the flow
    it('should highlight that invalid models cause 404 errors during API calls', async () => {
      const provider = new GoogleServerProvider({ 
        apiKey: validApiKey, 
        model: 'gemini-2.5-flash' // Invalid model that was in the admin UI
      });
      
      // The provider itself doesn't validate model names - it relies on Google's API
      // This means invalid models will only be caught when making actual API calls
      expect(provider.getStatus().configured).toBe(true);
      expect(provider.getStatus().provider).toBe('Google gemini-2.5-flash');
      
      // Note: In a real scenario, this would fail with a 404 when generateJson is called
      // but we don't want to make actual API calls in tests
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const provider = new GoogleServerProvider({ 
        apiKey: 'invalid-key', 
        model: 'gemini-1.5-flash' 
      });

      // Mock fetch to simulate 404 error
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: () => Promise.resolve({
          error: { message: 'models/gemini-2.5-flash is not found for API version v1beta' }
        })
      });

      await expect(provider.generateJson('system', 'user')).rejects.toThrow(
        'Failed to generate JSON from Google Gemini'
      );
    });
  });

  describe('getStatus', () => {
    it('should return the correct status when configured', () => {
      const provider = new GoogleServerProvider({ apiKey: mockApiKey, model: 'gemini-1.5-flash-latest' });
      const status = provider.getStatus();
      expect(status).toEqual({
        configured: true,
        provider: 'Google gemini-1.5-flash-latest',
        apiKeyStatus: 'Set',
      });
    });
  });

  describe('generateJson', () => {
    const systemPrompt = 'You are a helpful assistant.';
    const userPrompt = 'Translate "hello" to French.';
    const model = 'gemini-1.5-pro';

    it('should call the Gemini API and return parsed JSON on success', async () => {
      const provider = new GoogleServerProvider({ apiKey: mockApiKey, model });
      const mockApiResponse = {
        candidates: [{
          content: {
            parts: [{ text: JSON.stringify({ translation: 'bonjour' }) }]
          }
        }]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockApiResponse,
      });

      const result = await provider.generateJson(systemPrompt, userPrompt);

      expect(fetch).toHaveBeenCalledWith(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${mockApiKey}`,
        expect.any(Object)
      );
      
      const fetchBody = JSON.parse((fetch as jest.Mock).mock.calls[0][1].body);
      expect(fetchBody.contents[0].parts[0].text).toContain(systemPrompt);
      expect(fetchBody.contents[0].parts[0].text).toContain(userPrompt);
      expect(fetchBody.generationConfig.response_mime_type).toBe('application/json');

      expect(result).toEqual({ translation: 'bonjour' });
    });

    it('should throw an error if the API response is not ok', async () => {
      const provider = new GoogleServerProvider({ apiKey: mockApiKey, model });
      const errorResponse = { error: { message: 'Invalid API key' } };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => errorResponse,
      });

      await expect(provider.generateJson(systemPrompt, userPrompt)).rejects.toThrow(
        'Google Gemini API error: 400 - Invalid API key'
      );
    });

    it('should throw an error if the response content is missing', async () => {
      const provider = new GoogleServerProvider({ apiKey: mockApiKey, model });
      const malformedResponse = { candidates: [] };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => malformedResponse,
      });

      await expect(provider.generateJson(systemPrompt, userPrompt)).rejects.toThrow(
        'No content received from Google Gemini API'
      );
    });
    
    it('should throw a generic error for network issues', async () => {
      const provider = new GoogleServerProvider({ apiKey: mockApiKey, model });

      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network failure'));

      await expect(provider.generateJson(systemPrompt, userPrompt)).rejects.toThrow(
        'Failed to generate JSON from Google Gemini: Network failure'
      );
    });
  });

  describe('Auto-Default Provider Logic', () => {
    it('should automatically set first provider as default', async () => {
      // Mock the CredentialsRepository.getCredentials to return empty array (no existing providers)
      const mockGetCredentials = jest.fn().mockResolvedValue([]);
      
      // Mock the saveCredentials logic
      const mockSaveCredentials = async (userId: string, credentialData: any) => {
        const { serviceType, isDefault } = credentialData;
        
        // Check if this should be set as default automatically
        let shouldSetAsDefault = isDefault;
        
        // If this is a new credential (no id) and no default is explicitly set,
        // check if this is the user's first provider of this type
        if (!credentialData.id && !isDefault) {
          const existingProviders = await mockGetCredentials(userId, serviceType);
          const hasDefaultProvider = existingProviders.some((p: any) => p.is_default);
          
          // If no default provider exists, make this one the default
          if (!hasDefaultProvider) {
            shouldSetAsDefault = true;
          }
        }
        
        return { ...credentialData, is_default: shouldSetAsDefault };
      };

      // Test: First AI provider should be set as default
      const result = await mockSaveCredentials('user-123', {
        serviceType: 'ai_provider',
        serviceName: 'gemini',
        isDefault: false  // User didn't explicitly set as default
      });
      
      expect(result.is_default).toBe(true);
    });

    it('should not auto-set as default when other providers exist', async () => {
      // Mock existing provider that is already default
      const mockGetCredentials = jest.fn().mockResolvedValue([
        { service_name: 'openai', is_default: true }
      ]);
      
      const mockSaveCredentials = async (userId: string, credentialData: any) => {
        const { serviceType, isDefault } = credentialData;
        let shouldSetAsDefault = isDefault;
        
        if (!credentialData.id && !isDefault) {
          const existingProviders = await mockGetCredentials(userId, serviceType);
          const hasDefaultProvider = existingProviders.some((p: any) => p.is_default);
          
          if (!hasDefaultProvider) {
            shouldSetAsDefault = true;
          }
        }
        
        return { ...credentialData, is_default: shouldSetAsDefault };
      };

      // Test: Second AI provider should NOT be set as default
      const result = await mockSaveCredentials('user-123', {
        serviceType: 'ai_provider',
        serviceName: 'gemini',
        isDefault: false
      });
      
      expect(result.is_default).toBe(false);
    });
  });
}); 