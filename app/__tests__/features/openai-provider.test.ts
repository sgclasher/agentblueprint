import { OpenAIServerProvider } from '../../lib/llm/providers/openaiServerProvider';

describe('OpenAIServerProvider', () => {
  const validApiKey = 'test-api-key';

  describe('Constructor', () => {
    it('should use default model when none provided', () => {
      const provider = new OpenAIServerProvider({ apiKey: validApiKey });
      const status = provider.getStatus();
      expect(status.provider).toBe('OpenAI gpt-4o');
    });

    it('should accept all valid OpenAI model names including latest 2025 models', () => {
      const validModels = [
        'gpt-4o',
        'gpt-4o-mini',
        'gpt-4.1',
        'gpt-4-turbo',
        'o1',
        'o1-preview',
        'o1-mini'
      ];

      validModels.forEach(model => {
        const provider = new OpenAIServerProvider({ apiKey: validApiKey, model });
        const status = provider.getStatus();
        expect(status.provider).toBe(`OpenAI ${model}`);
      });
    });

    it('should correctly use model from user configuration', () => {
      const provider = new OpenAIServerProvider({ apiKey: validApiKey, model: 'gpt-4o' });
      const status = provider.getStatus();
      expect(status.provider).toBe('OpenAI gpt-4o');
    });
  });
}); 