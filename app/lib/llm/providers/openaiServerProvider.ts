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

    console.log('--- OpenAI Provider Request ---');
    console.log('Model:', this.model);
    console.log('System Prompt:', systemPrompt);
    console.log('User Prompt:', userPrompt);
    console.log('-----------------------------');
    
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

      console.log('--- OpenAI Provider Response ---');
      console.log('Raw JSON Content:', content);
      console.log('------------------------------');

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
} 