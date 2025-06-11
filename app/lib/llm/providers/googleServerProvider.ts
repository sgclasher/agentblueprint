/**
 * Google Gemini Server Provider
 *
 * Server-side implementation for interacting with Google's Gemini API.
 * This class is designed to be used by the central `aiService`.
 */
export class GoogleServerProvider {
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor({ apiKey, model = 'gemini-1.5-flash', baseUrl = 'https://generativelanguage.googleapis.com/v1beta' }: { apiKey: string, model?: string, baseUrl?: string }) {
    if (!apiKey) {
      throw new Error('Google Gemini API key must be provided.');
    }
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = baseUrl;
  }

  /**
   * Generates a JSON object from a given set of prompts using the Gemini API.
   * @param {string} systemPrompt - The system prompt (part of the user prompt for Gemini).
   * @param {string} userPrompt - The user-specific prompt or question.
   * @param {object} options - Additional options for the generation.
   * @returns {Promise<object>} The generated JSON object.
   */
  async generateJson(systemPrompt: string, userPrompt: string, options: { temperature?: number, max_tokens?: number } = {}) {
    if (!this.apiKey) {
      throw new Error('Google Gemini API key not configured.');
    }
    
    const finalPrompt = `${systemPrompt}\n\n${userPrompt}\n\nPlease provide the output in a single, valid JSON object, starting with { and ending with }. Do not include any other text or explanation.`;

    try {
      const response = await fetch(`${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: finalPrompt }]
          }],
          generationConfig: {
            temperature: options.temperature || 0.7,
            maxOutputTokens: options.max_tokens || 4000,
          }
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        throw new Error(`Google Gemini API error: ${response.status} - ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!content) {
        throw new Error('No content received from Google Gemini API');
      }

      // Google Gemini might wrap JSON in markdown code blocks, so we need to strip them
      let cleanedContent = content.trim();
      
      // Remove markdown code block markers if present
      if (cleanedContent.startsWith('```json')) {
        cleanedContent = cleanedContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      return JSON.parse(cleanedContent);
      
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