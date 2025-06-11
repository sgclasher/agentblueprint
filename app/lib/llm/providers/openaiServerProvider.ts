/**
 * OpenAI Server Provider
 * 
 * Server-side implementation for interacting with OpenAI's API.
 * This class is designed to be used by the central `aiService`.
 */
export class OpenAIServerProvider {
  private _apiKey?: string;
  private baseUrl: string;
  private model: string;

  constructor({ apiKey, model = 'gpt-4o' }: { apiKey?: string, model?: string } = {}) {
    this._apiKey = apiKey; // Can be undefined
    this.baseUrl = 'https://api.openai.com/v1';
    this.model = model;
    
    // Don't cache the API key - check it dynamically to handle environment changes
    // This is important for testing where the environment variable might be changed
  }

  get apiKey() {
    // Use the provided API key if it exists, otherwise fallback to environment variable.
    // This allows for both user-specific credentials and system-wide fallbacks.
    return this._apiKey || process.env.OPENAI_API_KEY;
  }

  /**
   * Generates a JSON object from a given set of prompts using OpenAI's API.
   * @param {string} systemPrompt - The system prompt to guide the AI's behavior.
   * @param {string} userPrompt - The user-specific prompt or question.
   * @param {object} options - Additional options for the generation (e.g., temperature).
   * @returns {Promise<object>} The generated JSON object.
   */
  async generateJson(systemPrompt: string, userPrompt: string, options: { temperature?: number, max_tokens?: number } = {}) {
    // Check for API key before making the request
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 4000,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(`OpenAI API error: ${response.status} - ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from OpenAI API');
      }

      // The provider's responsibility is just to return the parsed JSON, not to validate its structure.
      return JSON.parse(content);
      
    } catch (error: any) {
      console.error('OpenAI Server Provider Error:', error);
      // Re-throwing the error allows the calling service to handle it appropriately.
      throw new Error(`Failed to generate JSON from OpenAI: ${error.message}`);
    }
  }

  /**
   * Returns the configuration status of this provider.
   * @returns {{configured: boolean, provider: string, apiKeyStatus: string}}
   */
  getStatus() {
    const isConfigured = !!this.apiKey;
    return {
      configured: isConfigured,
      provider: `OpenAI ${this.model}`,
      apiKeyStatus: isConfigured ? 'Set' : 'Missing'
    };
  }

  /**
   * Fetches available models for OpenAI (returns curated list since API requires auth)
   * @returns {Promise<Array>} Array of available models with standardized format
   */
  static async fetchAvailableModels() {
    try {
      // OpenAI API requires API key to list models, so we return a curated list
      // This list is based on the official OpenAI documentation and pricing page
      const openaiModels = [
        {
          id: 'gpt-4o',
          name: 'GPT-4o (Recommended)',
          description: 'Most capable GPT-4 model with multimodal capabilities',
          created: null,
        },
        {
          id: 'gpt-4o-mini',
          name: 'GPT-4o Mini (Cost-Effective)',
          description: 'Faster and more cost-effective version of GPT-4o',
          created: null,
        },
        {
          id: 'gpt-4.1',
          name: 'GPT-4.1 (Latest - 1M Context)',
          description: 'Latest GPT model with 1 million token context window',
          created: null,
        },
        {
          id: 'o1',
          name: 'o1 (Advanced Reasoning)',
          description: 'Advanced reasoning model for complex problem-solving',
          created: null,
        },
        {
          id: 'o1-preview',
          name: 'o1 Preview (Reasoning Beta)',
          description: 'Preview version of the o1 reasoning model',
          created: null,
        },
        {
          id: 'o1-mini',
          name: 'o1 Mini (Fast Reasoning)',
          description: 'Smaller, faster version of the o1 reasoning model',
          created: null,
        },
        {
          id: 'gpt-4-turbo',
          name: 'GPT-4 Turbo (Legacy)',
          description: 'High-performance GPT-4 model with improved speed',
          created: null,
        },
        {
          id: 'gpt-4',
          name: 'GPT-4 (Classic)',
          description: 'Original GPT-4 model with excellent reasoning capabilities',
          created: null,
        },
      ];

      // Simulate slight delay as if fetching from API
      await new Promise(resolve => setTimeout(resolve, 200));

      return openaiModels;
    } catch (error: any) {
      console.error('Failed to fetch OpenAI models:', error);
      throw new Error(`Failed to fetch OpenAI models: ${error.message}`);
    }
  }
} 