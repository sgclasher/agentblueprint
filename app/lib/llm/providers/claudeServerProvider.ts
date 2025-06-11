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

  constructor({ apiKey, model = 'claude-3-5-sonnet-20241022' }: { apiKey: string, model?: string }) {
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

    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'x-api-key': this.apiKey,
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

      // Claude often wraps JSON in markdown code blocks, so we need to strip them
      let cleanedContent = content.trim();
      
      // Remove markdown code block markers if present
      if (cleanedContent.startsWith('```json')) {
        cleanedContent = cleanedContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      return JSON.parse(cleanedContent);

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

  /**
   * Fetches available models for Anthropic Claude (returns curated list since API requires auth)
   * @returns {Promise<Array>} Array of available models with standardized format
   */
  static async fetchAvailableModels() {
    try {
      // Anthropic API requires API key to list models, so we return a curated list
      // This list is based on the official Anthropic documentation
      const claudeModels = [
        {
          id: 'claude-3-5-sonnet-20241022',
          name: 'Claude 3.5 Sonnet (Recommended)',
          description: 'Best balance of intelligence, speed, and cost',
          created: null,
        },
        {
          id: 'claude-3-5-haiku-20241022',
          name: 'Claude 3.5 Haiku (Fast)',
          description: 'Fastest model for quick tasks and high-volume use cases',
          created: null,
        },
        {
          id: 'claude-3-opus-20240229',
          name: 'Claude 3 Opus (Advanced)',
          description: 'Most intelligent model for complex reasoning tasks',
          created: null,
        },
        {
          id: 'claude-sonnet-4-20250514',
          name: 'Claude Sonnet 4 (Latest - May 2025)',
          description: 'Latest high-performance model with enhanced capabilities',
          created: null,
        },
        {
          id: 'claude-opus-4-20250514',
          name: 'Claude Opus 4 (Most Intelligent)',
          description: 'Most intelligent Claude model for the most complex tasks',
          created: null,
        },
        {
          id: 'claude-3-7-sonnet-20250219',
          name: 'Claude 3.7 Sonnet (Hybrid Reasoning)',
          description: 'Hybrid model combining fast response with advanced reasoning',
          created: null,
        },
      ];

      // Simulate slight delay as if fetching from API
      await new Promise(resolve => setTimeout(resolve, 150));

      return claudeModels;
    } catch (error: any) {
      console.error('Failed to fetch Claude models:', error);
      throw new Error(`Failed to fetch Claude models: ${error.message}`);
    }
  }
} 