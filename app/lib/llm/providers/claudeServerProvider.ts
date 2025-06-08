/**
 * Anthropic Claude Server Provider
 *
 * Server-side implementation for interacting with Anthropic's Claude API.
 * This class is designed to be used by the central `aiService`.
 */
export class ClaudeServerProvider {
  private apiKey: string;
  private baseUrl: string;
  private model: string;
  private anthropicVersion: string;

  constructor({ apiKey, model = 'claude-3-sonnet-20240229' }: { apiKey: string, model?: string }) {
    if (!apiKey) {
      throw new Error('Anthropic API key must be provided.');
    }
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.anthropic.com/v1';
    this.model = model;
    this.anthropicVersion = '2023-06-01';
  }

  /**
   * Generates a JSON object from a given set of prompts using Claude's API.
   * @param {string} systemPrompt - The system prompt to guide the AI's behavior.
   * @param {string} userPrompt - The user-specific prompt or question.
   * @param {object} options - Additional options for the generation (e.g., temperature).
   * @returns {Promise<object>} The generated JSON object.
   */
  async generateJson(systemPrompt: string, userPrompt: string, options: { temperature?: number, max_tokens?: number } = {}) {
    // Anthropic API requires the prompt to explicitly ask for JSON and start with an opening brace.
    const finalUserPrompt = `${userPrompt}
    
Please provide the output in a single, valid JSON object, starting with { and ending with }. Do not include any other text or explanation.`;

    console.log('--- Claude Provider Request ---');
    console.log('System Prompt:', systemPrompt);
    console.log('User Prompt:', finalUserPrompt);
    console.log('-----------------------------');

    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'anthropic-version': this.anthropicVersion,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          system: systemPrompt,
          messages: [{ role: 'user', content: finalUserPrompt }],
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 4000,
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        throw new Error(`Anthropic API error: ${response.status} - ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.content?.[0]?.text;

      if (!content) {
        throw new Error('No content received from Anthropic API');
      }

      console.log('--- Claude Provider Response ---');
      console.log('Raw JSON Content:', content);
      console.log('------------------------------');

      return JSON.parse(content);

    } catch (error: any) {
      console.error('Claude Server Provider Error:', error);
      throw new Error(`Failed to generate JSON from Anthropic: ${error.message}`);
    }
  }

  /**
   * Returns the configuration status of this provider.
   * @returns {{configured: boolean, provider: string, apiKeyStatus: string}}
   */
  getStatus() {
    return {
      configured: true, // If instantiated, the key was provided.
      provider: `Anthropic ${this.model}`,
      apiKeyStatus: 'Set',
    };
  }
} 