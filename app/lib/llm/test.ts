import { OpenAIServerProvider } from './providers/openaiServerProvider';

describe('OpenAIServerProvider JSON Generation', () => {
  const validApiKey = 'test-api-key';
  const mockSystemPrompt = 'You are a helpful assistant that provides structured data.';
  const mockUserPrompt = 'List three programming languages and their key features.';

  describe('generateJson', () => {
    it('should generate valid JSON with response_format parameter', async () => {
      const provider = new OpenAIServerProvider({ apiKey: validApiKey, model: 'gpt-4o-mini' });
      const result = await provider.generateJson(mockSystemPrompt, mockUserPrompt);
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should handle custom temperature settings', async () => {
      const provider = new OpenAIServerProvider({ apiKey: validApiKey, model: 'gpt-4o-mini' });
      const result = await provider.generateJson(mockSystemPrompt, mockUserPrompt, { temperature: 0.2 });
      
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });

    it('should throw error when API key is missing', async () => {
      const provider = new OpenAIServerProvider({ model: 'gpt-4o-mini' });
      
      await expect(provider.generateJson(mockSystemPrompt, mockUserPrompt))
        .rejects
        .toThrow('OpenAI API key not configured');
    });

    it('should handle API errors gracefully', async () => {
      const provider = new OpenAIServerProvider({ 
        apiKey: 'invalid-key',
        model: 'gpt-4o-mini'
      });
      
      await expect(provider.generateJson(mockSystemPrompt, mockUserPrompt))
        .rejects
        .toThrow('Failed to generate JSON from OpenAI');
    });
  });

  describe('Response Format Validation', () => {
    it('should return JSON matching the expected schema', async () => {
      const provider = new OpenAIServerProvider({ apiKey: validApiKey, model: 'gpt-4o-mini' });
      const result = await provider.generateJson(
        'Return data in this exact format',
        'List two colors with their hex codes',
        { temperature: 0 }
      );
      
      expect(result).toHaveProperty('colors');
      expect(Array.isArray(result.colors)).toBe(true);
      expect(result.colors.length).toBe(2);
      expect(result.colors[0]).toHaveProperty('name');
      expect(result.colors[0]).toHaveProperty('hex');
    });
  });

  describe('Model Compatibility', () => {
    const compatibleModels = [
      'gpt-4o',
      'gpt-4o-mini',
      'gpt-4.1',
      'gpt-4-turbo'
    ];

    compatibleModels.forEach(model => {
      it(`should work with ${model} model`, async () => {
        const provider = new OpenAIServerProvider({ apiKey: validApiKey, model });
        const result = await provider.generateJson(mockSystemPrompt, mockUserPrompt);
        
        expect(result).toBeDefined();
        expect(typeof result).toBe('object');
      });
    });
  });
});
