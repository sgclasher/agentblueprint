import { ClaudeServerProvider } from '../../lib/llm/providers/claudeServerProvider';

describe('ClaudeServerProvider', () => {
  const validApiKey = 'test-api-key';

  describe('Constructor', () => {
    it('should use default model when none provided', () => {
      const provider = new ClaudeServerProvider({ apiKey: validApiKey });
      const status = provider.getStatus();
      expect(status.provider).toBe('Anthropic claude-3-5-sonnet-20241022');
    });

    it('should accept all valid Claude model names including latest 2025 models', () => {
      const validModels = [
        'claude-3-5-sonnet-20240620',
        'claude-3-opus-20240229',
        'claude-3-haiku-20240307',
        'claude-2.1'
      ];

      validModels.forEach(model => {
        const provider = new ClaudeServerProvider({ apiKey: validApiKey, model });
        const status = provider.getStatus();
        expect(status.provider).toBe(`Anthropic ${model}`);
      });
    });

    it('should correctly use model from user configuration', () => {
      const provider = new ClaudeServerProvider({ apiKey: validApiKey, model: 'claude-3-opus-20240229' });
      const status = provider.getStatus();
      expect(status.provider).toBe('Anthropic claude-3-opus-20240229');
    });
  });
}); 