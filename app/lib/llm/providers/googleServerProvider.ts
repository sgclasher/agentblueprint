/**
 * Google Gemini Server Provider
 *
 * Server-side implementation for interacting with Google's Gemini API.
 * This class is designed to be used by the central `aiService`.
 */
export class GoogleServerProvider {
  private apiKey: string;
  private model: string;

  constructor({ apiKey, model = 'gemini-1.5-flash-latest' }: { apiKey: string, model?: string }) {
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
} 