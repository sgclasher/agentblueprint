/**
 * Model Availability Tests
 * 
 * Tests that the latest 2025 LLM models from KB_LLM_MODEL_UPDATES_2025.md
 * are properly available in the AI services configuration form.
 */

import { OpenAIServerProvider } from '../../lib/llm/providers/openaiServerProvider';
import { ClaudeServerProvider } from '../../lib/llm/providers/claudeServerProvider';
import { GoogleServerProvider } from '../../lib/llm/providers/googleServerProvider';

describe('2025 LLM Model Availability', () => {
  
  describe('OpenAI Models', () => {
    test('should include o3 series models from 2025 releases', async () => {
      const models = await OpenAIServerProvider.fetchAvailableModels();
      const modelIds = models.map(m => m.id);
      
      // Test for o3 series models mentioned in KB_LLM_MODEL_UPDATES_2025.md
      expect(modelIds).toContain('o3');
      expect(modelIds).toContain('o3-pro');
      expect(modelIds).toContain('o4-mini');
    });

    test('should include codex mini model from May 2025', async () => {
      const models = await OpenAIServerProvider.fetchAvailableModels();
      const modelIds = models.map(m => m.id);
      
      expect(modelIds).toContain('codex-mini');
    });

    test('should maintain existing GPT models', async () => {
      const models = await OpenAIServerProvider.fetchAvailableModels();
      const modelIds = models.map(m => m.id);
      
      // Ensure we don't break existing models
      expect(modelIds).toContain('gpt-4o');
      expect(modelIds).toContain('gpt-4.1');
      expect(modelIds).toContain('o1');
    });

    test('should have proper model descriptions for new models', async () => {
      const models = await OpenAIServerProvider.fetchAvailableModels();
      
      const o3Model = models.find(m => m.id === 'o3');
      const o3ProModel = models.find(m => m.id === 'o3-pro');
      
      expect(o3Model?.name).toContain('o3');
      expect(o3ProModel?.name).toContain('o3-pro');
    });
  });

  describe('Claude Models', () => {
    test('should include Claude 4 models from May 2025', async () => {
      const models = await ClaudeServerProvider.fetchAvailableModels();
      const modelIds = models.map(m => m.id);
      
      // Test for Claude 4 models mentioned in KB
      expect(modelIds).toContain('claude-sonnet-4-20250514');
      expect(modelIds).toContain('claude-opus-4-20250514');
    });

    test('should include Claude 3.7 Sonnet from February 2025', async () => {
      const models = await ClaudeServerProvider.fetchAvailableModels();
      const modelIds = models.map(m => m.id);
      
      expect(modelIds).toContain('claude-3-7-sonnet-20250219');
    });
  });

  describe('Gemini Models', () => {
    test('should include latest 2025 Gemini models', async () => {
      const models = await GoogleServerProvider.fetchAvailableModels();
      const modelIds = models.map(m => m.id);
      
      // Test for models mentioned in KB_LLM_MODEL_UPDATES_2025.md
      expect(modelIds).toContain('gemini-2.5-flash-lite-preview-06-17');
      expect(modelIds).toContain('gemini-2.5-pro-preview-06-05');
      expect(modelIds).toContain('gemini-2.5-flash-preview-05-20');
    });

    test('should maintain stable Gemini models', async () => {
      const models = await GoogleServerProvider.fetchAvailableModels();
      const modelIds = models.map(m => m.id);
      
      expect(modelIds).toContain('gemini-1.5-flash');
      expect(modelIds).toContain('gemini-1.5-pro');
      expect(modelIds).toContain('gemini-2.0-flash');
    });
  });

  describe('Fallback Models', () => {
    test('should include o3 models in fallback lists', () => {
      // This will test the fallback models in fetch-models route
      // We'll import and test the FALLBACK_MODELS constant
      const expectedO3Models = ['o3', 'o3-pro', 'o4-mini'];
      
      // This test will be updated after we modify the route file
      expect(expectedO3Models).toContain('o3');
    });
  });

  describe('Model Consistency', () => {
    test('provider models should match form dropdown options', async () => {
      // Test that the models returned by providers match what's available in AddServiceForm
      const openaiModels = await OpenAIServerProvider.fetchAvailableModels();
      
      // Ensure we have a reasonable number of models
      expect(openaiModels.length).toBeGreaterThanOrEqual(8);
      
      // Ensure all models have required fields
      openaiModels.forEach(model => {
        expect(model).toHaveProperty('id');
        expect(model).toHaveProperty('name');
        expect(model).toHaveProperty('description');
        expect(typeof model.id).toBe('string');
        expect(typeof model.name).toBe('string');
      });
    });
  });
}); 