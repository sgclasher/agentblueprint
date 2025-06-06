import { OpenAIServerProvider } from '../lib/llm/providers/openaiServerProvider';

/**
 * Central AI Service
 *
 * This service is the single entry point for all LLM interactions in the application.
 * It abstracts the specific provider implementation and provides generic methods
 * for interacting with LLMs.
 */
class AIService {
  constructor() {
    // For now, we are hardcoding the OpenAI provider.
    // This could be extended to a factory pattern to select providers based on configuration.
    this.provider = new OpenAIServerProvider();
  }

  /**
   * Generates a JSON object from a given set of prompts.
   * @param {string} systemPrompt - The system prompt to guide the AI's behavior.
   * @param {string} userPrompt - The user-specific prompt or question.
   * @param {object} options - Additional options for the generation (e.g., temperature).
   * @returns {Promise<object>} The generated JSON object.
   */
  async generateJson(systemPrompt, userPrompt, options = {}) {
    if (!this.provider) {
      throw new Error('No AI provider configured.');
    }
    // The actual generation is delegated to the specific provider.
    return this.provider.generateJson(systemPrompt, userPrompt, options);
  }

  /**
   * Checks if the AI service is properly configured.
   * @returns {{configured: boolean, provider: string, apiKeyStatus: string}} Status object.
   */
  getStatus() {
    if (!this.provider) {
        return {
            configured: false,
            provider: 'None',
            apiKeyStatus: 'Not applicable'
        };
    }
    return this.provider.getStatus();
  }
}

// Export a singleton instance of the service
export const aiService = new AIService(); 