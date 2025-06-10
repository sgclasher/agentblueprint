/**
 * Google Gemini Server Provider
 *
 * Server-side implementation for interacting with Google's Gemini API.
 * This class is designed to be used by the central `aiService`.
 */
export class GoogleServerProvider {
  private apiKey: string;
  private model: string;

  constructor({ apiKey, model = 'gemini-1.5-flash' }: { apiKey: string, model?: string }) {
    if (!apiKey) {
      throw new Error('Google Gemini API key must be provided.');
    }
    this.apiKey = apiKey;
    this.model = model;
  }

  /**
   * Generates a JSON object from a given set of prompts using the Gemini API.
   * @param {string} systemPrompt - The system prompt (part of the user prompt for Gemini).
   * @param {string} userPrompt - The user-specific prompt or question.
   * @param {object} options - Additional options for the generation.
   * @returns {Promise<object>} The generated JSON object.
   */
  async generateJson(systemPrompt: string, userPrompt: string, options: { temperature?: number, max_tokens?: number } = {}) {
    // For Gemini, we combine the system and user prompts into a single prompt for the 'user' role.
    const fullPrompt = `${systemPrompt}\n\n${userPrompt}`;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
    
    console.log('--- Google Provider Request ---');
    console.log('Model:', this.model);
    console.log('-----------------------------');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: fullPrompt }]
          }],
          generationConfig: {
            response_mime_type: "application/json",
            temperature: options.temperature || 0.7,
            maxOutputTokens: options.max_tokens || 8192,
          }
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: 'Unknown API error' } }));
        throw new Error(`Google Gemini API error: ${response.status} - ${error.error?.message || 'Failed to get response'}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        throw new Error('No content received from Google Gemini API');
      }
      
      console.log('--- Google Provider Response ---');
      console.log('Raw JSON Content:', content);
      console.log('------------------------------');

      return JSON.parse(content);

    } catch (error: any) {
      console.error('Google Server Provider Error:', error);
      throw new Error(`Failed to generate JSON from Google Gemini: ${error.message}`);
    }
  }

  /**
   * Returns the configuration status of this provider.
   * @returns {{configured: boolean, provider: string, apiKeyStatus: string}}
   */
  getStatus() {
    return {
      configured: true,
      provider: `Google ${this.model}`,
      apiKeyStatus: 'Set',
    };
  }

  /**
   * Fetches available models for Google Gemini (returns curated list since API requires auth)
   * @returns {Promise<Array>} Array of available models with standardized format
   */
  static async fetchAvailableModels() {
    try {
      // Google Gemini API requires API key to list models, so we return a curated list
      // This list is based on the official Google AI Studio documentation
      const geminiModels = [
        {
          id: 'gemini-1.5-flash',
          name: 'Gemini 1.5 Flash (Recommended)',
          description: 'Fast and versatile model for most use cases',
          created: null,
        },
        {
          id: 'gemini-1.5-pro',
          name: 'Gemini 1.5 Pro (Advanced)',
          description: 'Advanced reasoning and complex task handling',
          created: null,
        },
        {
          id: 'gemini-2.0-flash',
          name: 'Gemini 2.0 Flash (Latest Stable)',
          description: 'Latest stable Gemini 2.0 model with improved performance',
          created: null,
        },
        {
          id: 'gemini-1.5-flash-8b',
          name: 'Gemini 1.5 Flash 8B (Fast & Efficient)',
          description: 'Optimized for speed and efficiency',
          created: null,
        },
        {
          id: 'gemini-2.5-pro-preview-06-05',
          name: 'Gemini 2.5 Pro Preview (Most Advanced)',
          description: 'Cutting-edge preview model with latest capabilities',
          created: null,
        },
        {
          id: 'gemini-2.5-flash-preview-05-20',
          name: 'Gemini 2.5 Flash Preview (Experimental)',
          description: 'Experimental preview of Gemini 2.5 Flash',
          created: null,
        },
      ];

      // Simulate slight delay as if fetching from API
      await new Promise(resolve => setTimeout(resolve, 100));

      return geminiModels;
    } catch (error: any) {
      console.error('Failed to fetch Gemini models:', error);
      throw new Error(`Failed to fetch Gemini models: ${error.message}`);
    }
  }
} 