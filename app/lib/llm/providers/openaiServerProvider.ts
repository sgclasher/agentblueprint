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
      const requestBody = {
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 4000,
        response_format: { type: 'json_object' }
      };
      
      console.log(`[OpenAI Provider] Making request to model: ${this.model}`);
      console.log(`[OpenAI Provider] API Key present: ${!!this.apiKey}`);
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        
        // Provide more helpful error messages for common issues
        if (response.status === 404) {
          if (error.error?.code === 'model_not_found') {
            throw new Error(`OpenAI API error: Model '${this.model}' not found. This usually means: 1) You need to add $5+ credits to your OpenAI account, 2) Generate a new API key after adding credits, or 3) Check if the model is allowed in your project settings. Visit https://platform.openai.com/account/billing to add credits.`);
          }
        }
        
        if (response.status === 401) {
          throw new Error(`OpenAI API error: Invalid API key. Please generate a new API key at https://platform.openai.com/api-keys`);
        }
        
        if (response.status === 429) {
          throw new Error(`OpenAI API error: Rate limit or quota exceeded. Check your usage at https://platform.openai.com/account/usage`);
        }
        
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
   * Fetches available models for OpenAI using the actual OpenAI API
   * @returns {Promise<Array>} Array of available models with standardized format
   */
  static async fetchAvailableModels() {
    try {
      // Get API key from environment - we'll use the system key for model listing
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OpenAI API key not configured');
      }

      console.log('[OpenAI Provider] Fetching models from actual OpenAI API...');
      
      // Call the actual OpenAI models endpoint
      const response = await fetch('https://api.openai.com/v1/models', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`[OpenAI Provider] Fetched ${data.data?.length || 0} models from OpenAI API`);
      
      // Filter to only chat/completion models and sort by name
      const chatModels = data.data
        .filter((model: any) => {
          const id = model.id.toLowerCase();
          // Include GPT, o1, o3 models and exclude embeddings, tts, etc.
          return (
            id.includes('gpt') || 
            id.startsWith('o1') || 
            id.startsWith('o3')
          ) && !id.includes('embed') && !id.includes('tts');
        })
        .map((model: any) => ({
          id: model.id,
          name: this.formatModelName(model.id),
          description: this.getModelDescription(model.id),
          created: model.created,
        }))
        .sort((a: any, b: any) => a.name.localeCompare(b.name));

      console.log('[OpenAI Provider] Filtered models:', chatModels.map((m: any) => m.id));
      return chatModels;

    } catch (error: any) {
      console.error('Failed to fetch OpenAI models from API:', error);
      
      // Fallback to curated list if API call fails
      console.log('[OpenAI Provider] Falling back to curated model list');
      return [
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
          id: 'o3',
          name: 'o3 (Cost-Effective Reasoning)',
          description: 'Cost-effective reasoning model with improved performance',
          created: null,
        },
        {
          id: 'o3-pro',
          name: 'o3-pro (Advanced Reasoning Pro)',
          description: 'Professional version of o3 with enhanced reasoning capabilities',
          created: null,
        },
      ];
    }
  }

  /**
   * Format model ID into a user-friendly name
   */
  private static formatModelName(modelId: string): string {
    const nameMap: { [key: string]: string } = {
      'gpt-4o': 'GPT-4o (Recommended)',
      'gpt-4o-mini': 'GPT-4o Mini (Cost-Effective)',
      'gpt-4-turbo': 'GPT-4 Turbo',
      'gpt-4': 'GPT-4 (Classic)',
      'gpt-3.5-turbo': 'GPT-3.5 Turbo',
      'o1': 'o1 (Advanced Reasoning)',
      'o1-preview': 'o1 Preview (Beta)',
      'o1-mini': 'o1 Mini (Fast Reasoning)',
      'o3': 'o3 (Cost-Effective Reasoning)',
      'o3-pro': 'o3-pro (Advanced Reasoning Pro)',
    };
    
    return nameMap[modelId] || modelId;
  }

  /**
   * Get description for a model
   */
  private static getModelDescription(modelId: string): string {
    const descMap: { [key: string]: string } = {
      'gpt-4o': 'Most capable GPT-4 model with multimodal capabilities',
      'gpt-4o-mini': 'Faster and more cost-effective version of GPT-4o',
      'gpt-4-turbo': 'High-performance GPT-4 model with improved speed',
      'gpt-4': 'Original GPT-4 model with excellent reasoning capabilities',
      'o1': 'Advanced reasoning model for complex problem-solving',
      'o1-preview': 'Preview version of the o1 reasoning model',
      'o1-mini': 'Smaller, faster version of the o1 reasoning model',
      'o3': 'Cost-effective reasoning model with improved performance',
      'o3-pro': 'Professional version of o3 with enhanced reasoning capabilities',
    };
    
    return descMap[modelId] || `OpenAI model: ${modelId}`;
  }
} 