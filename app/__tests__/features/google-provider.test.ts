import { GoogleServerProvider } from '../../lib/llm/providers/googleServerProvider';

// Mock the global fetch function
global.fetch = jest.fn();

describe('GoogleServerProvider', () => {
  const mockApiKey = 'test-gemini-api-key';

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

  describe('Constructor and Model Handling', () => {
    it('should use default model "gemini-1.5-flash" when none is provided', () => {
      const provider = new GoogleServerProvider({ apiKey: mockApiKey });
      const status = provider.getStatus();
      expect(status.provider).toBe('Google gemini-1.5-flash');
    });

    it('should automatically correct known invalid preview model names', () => {
        const corrections = {
          'gemini-2.5-pro': 'gemini-2.5-pro-preview-06-05',
          'gemini-2.5-flash': 'gemini-2.5-flash-preview-05-20',
          'gemini-pro': 'gemini-1.5-pro',
          'gemini-flash': 'gemini-1.5-flash',
        };
  
        for (const [invalid, corrected] of Object.entries(corrections)) {
          const provider = new GoogleServerProvider({
            apiKey: mockApiKey,
            model: invalid,
          });
          const status = provider.getStatus();
          expect(status.provider).toBe(`Google ${corrected}`);
        }
      });

    it('should accept a valid model name', () => {
        const provider = new GoogleServerProvider({ apiKey: mockApiKey, model: 'gemini-1.5-pro' });
        const status = provider.getStatus();
        expect(status.provider).toBe('Google gemini-1.5-pro');
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
        "Invalid request to Gemini API. Check model name 'gemini-1.5-pro' and request format. Error: Invalid API key"
      );
    });

    it('should repair and parse JSON with a trailing comma', async () => {
      const provider = new GoogleServerProvider({ apiKey: mockApiKey, model });
      const malformedApiResponse = {
        candidates: [{
          content: {
            parts: [{ text: '{"translation":"bonjour",}' }] // trailing comma
          }
        }]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => malformedApiResponse,
      });

      const result = await provider.generateJson(systemPrompt, userPrompt);
      expect(result).toEqual({ translation: 'bonjour' });
    });
  });

  describe('getStatus', () => {
    it('should return correct status information', () => {
      const provider = new GoogleServerProvider({ apiKey: mockApiKey, model: 'gemini-2.5-pro-preview-06-05' });
      const status = provider.getStatus();
      
      expect(status).toEqual({
        configured: true,
        provider: 'Google gemini-2.5-pro-preview-06-05',
        apiKeyStatus: 'Set'
      });
    });
  });
}); 