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
}); 