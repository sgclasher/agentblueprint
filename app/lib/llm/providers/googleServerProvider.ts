import { jsonrepair } from 'jsonrepair';

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

  // Valid model mappings for API compatibility
  private static readonly MODEL_MAPPINGS: { [key: string]: string } = {
    // 2.5 models are still in preview - use correct preview names from API docs
    'gemini-2.5-pro': 'gemini-2.5-pro-preview-06-05',  // Map to actual preview model
    'gemini-2.5-flash': 'gemini-2.5-flash-preview-05-20',  // Map to actual preview model
    
    // Common fallbacks - use stable models for reliability
    'gemini-pro': 'gemini-1.5-pro',  // Use stable 1.5 Pro
    'gemini-flash': 'gemini-1.5-flash'  // Use stable 1.5 Flash
  };

  constructor({ apiKey, model = 'gemini-1.5-flash', baseUrl = 'https://generativelanguage.googleapis.com/v1beta' }: { apiKey: string, model?: string, baseUrl?: string }) {
    if (!apiKey) {
      throw new Error('Google Gemini API key must be provided.');
    }
    this.apiKey = apiKey;
    
    // Map model name to API-compatible version
    this.model = GoogleServerProvider.MODEL_MAPPINGS[model] || model;
    console.log(`[GoogleServerProvider] Model mapping: ${model} -> ${this.model}`);
    
    this.baseUrl = baseUrl;
  }

  /**
   * Validates if a model name is supported
   * @param {string} modelName - The model name to validate
   * @returns {boolean} True if model is supported
   */
  private isValidModel(modelName: string): boolean {
    const validModels = [
      // Stable models
      'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-1.5-flash-8b',
      // Preview models (correct names from API docs)
      'gemini-2.5-pro-preview-06-05', 'gemini-2.5-flash-preview-05-20',
      // Common aliases
      'gemini-pro', 'gemini-flash'
    ];
    return Object.values(GoogleServerProvider.MODEL_MAPPINGS).includes(modelName) || validModels.includes(modelName);
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

    // Validate model
    if (!this.isValidModel(this.model)) {
      console.warn(`[GoogleServerProvider] Model ${this.model} may not be supported. Attempting anyway...`);
    }
    
    const finalPrompt = `${systemPrompt}\n\n${userPrompt}\n\nPlease provide the output in a single, valid JSON object, starting with { and ending with }. Do not include any other text or explanation.`;

    const requestBody = {
      contents: [{
        parts: [{ text: finalPrompt }]
      }],
      generationConfig: {
        response_mime_type: "application/json",
        temperature: options.temperature || 0.7,
        maxOutputTokens: options.max_tokens || 4000,
        candidateCount: 1,
        stopSequences: [],
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH", 
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    console.log(`[GoogleServerProvider] Making request to model: ${this.model}`);
    console.log(`[GoogleServerProvider] Request URL: ${this.baseUrl}/models/${this.model}:generateContent`);

    try {
      const response = await fetch(`${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log(`[GoogleServerProvider] Response status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        console.error('[GoogleServerProvider] API Error Response:', errorData);
        
        // Handle specific Gemini error cases
        if (response.status === 404) {
          const fallbackModel = 'gemini-1.5-flash';
          console.warn(`[GoogleServerProvider] Model ${this.model} not found. Suggesting fallback to ${fallbackModel}`);
          throw new Error(`Model '${this.model}' not found. Try using '${fallbackModel}' instead. Original error: ${errorData.error?.message || 'Model not available'}`);
        } else if (response.status === 400) {
          // Add a check for JSON parsing issues in the prompt itself
          if (errorData.error?.message.includes('JSON')) {
              throw new Error(`Invalid JSON request to Gemini API. Check prompt formatting. Error: ${errorData.error?.message}`);
          }
          throw new Error(`Invalid request to Gemini API. Check model name '${this.model}' and request format. Error: ${errorData.error?.message || 'Bad request'}`);
        } else if (response.status === 403) {
          throw new Error(`Gemini API access denied. Check your API key permissions. Error: ${errorData.error?.message || 'Forbidden'}`);
        } else if (response.status === 429) {
          throw new Error(`Gemini API rate limit exceeded. Please try again later. Error: ${errorData.error?.message || 'Rate limited'}`);
        }
        
        throw new Error(`Google Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('[GoogleServerProvider] Response received, candidates:', data.candidates?.length || 0);
      
      // Enhanced error checking for blocked content
      if (data.candidates?.[0]?.finishReason === 'SAFETY') {
        console.warn('[GoogleServerProvider] Content was blocked by safety filters');
        throw new Error('Content was blocked by Gemini safety filters. Try rephrasing your request.');
      }
      
      if (data.candidates?.[0]?.finishReason === 'RECITATION') {
        console.warn('[GoogleServerProvider] Content blocked due to recitation concerns');
        throw new Error('Content blocked due to potential copyright concerns. Try using more original content.');
      }

      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log('[GoogleServerProvider] Extracted content length:', content?.length || 0);
      
      if (!content) {
        console.error('[GoogleServerProvider] No content in response. Full response structure:', {
          hasCandidates: !!data.candidates,
          candidatesLength: data.candidates?.length || 0,
          candidate0: data.candidates?.[0],
          finishReason: data.candidates?.[0]?.finishReason,
          contentPath: data.candidates?.[0]?.content,
          partsPath: data.candidates?.[0]?.content?.parts
        });
        throw new Error('No content received from Google Gemini API. Check model availability and safety settings.');
      }

      // Enhanced content cleaning for JSON extraction
      let cleanedContent = content.trim();
      
      // Remove various markdown code block formats
      if (cleanedContent.startsWith('```json')) {
        cleanedContent = cleanedContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // Remove any leading/trailing explanatory text
      const jsonStart = cleanedContent.indexOf('{');
      const jsonEnd = cleanedContent.lastIndexOf('}');
      
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        cleanedContent = cleanedContent.substring(jsonStart, jsonEnd + 1);
      }

      console.log('[GoogleServerProvider] Cleaned content for JSON parsing:', cleanedContent.substring(0, 200) + '...');

      try {
        const repaired = jsonrepair(cleanedContent);
        return JSON.parse(repaired);
      } catch (parseError) {
        console.error('[GoogleServerProvider] JSON parsing failed even after repair:', parseError);
        console.error('[GoogleServerProvider] Content that failed to parse:', cleanedContent);
        throw new Error(`Failed to parse JSON response from Gemini: ${parseError}. Raw content: ${cleanedContent.substring(0, 200)}...`);
      }
      
    } catch (error: any) {
      console.error('[GoogleServerProvider] Generation error:', error);
      
      // Re-throw our custom errors
      if (error.message.includes('Model ') || error.message.includes('Gemini API')) {
        throw error;
      }
      
      // Handle network errors
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        throw new Error(`Network error connecting to Gemini API: ${error.message}`);
      }
      
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
   * Fetches available models for Google Gemini using the actual Google API
   * @returns {Promise<Array>} Array of available models with standardized format
   */
  static async fetchAvailableModels() {
    try {
      // Get API key from environment - we'll use the system key for model listing
      const apiKey = process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        throw new Error('Google API key not configured');
      }

      console.log('[Gemini Provider] Fetching models from actual Google API...');
      
      // Call the actual Google Gemini models endpoint
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Google API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`[Gemini Provider] Fetched ${data.models?.length || 0} models from Google API`);
      
      // Filter and format models - only include generateContent models
      const geminiModels = data.models
        .filter((model: any) => {
          const id = model.name.replace('models/', '');
          // Include only text generation models and exclude embedding models
          return model.supportedGenerationMethods?.includes('generateContent') && 
                 id.includes('gemini') && 
                 !id.includes('embed') &&
                 !id.includes('vision') &&
                 !id.includes('text-') && 
                 !id.includes('aqa');
        })
        .map((model: any) => ({
          id: model.name.replace('models/', ''),
          name: this.formatGeminiModelName(model.name.replace('models/', '')),
          description: this.getGeminiModelDescription(model.name.replace('models/', '')),
          created: null,
        }))
        .sort((a: any, b: any) => a.name.localeCompare(b.name));

      console.log('[Gemini Provider] Filtered models:', geminiModels.map((m: any) => m.id));
      return geminiModels;

    } catch (error: any) {
      console.error('Failed to fetch Gemini models from API:', error);
      
      // Fallback to curated list if API call fails
      console.log('[Gemini Provider] Falling back to curated model list');
      return [
        {
          id: 'gemini-1.5-flash',
          name: 'Gemini 1.5 Flash (Recommended & Stable)',
          description: 'Fast and versatile model for most use cases with proven reliability',
          created: null,
        },
        {
          id: 'gemini-1.5-pro',
          name: 'Gemini 1.5 Pro (Stable)',
          description: 'Advanced reasoning and complex task handling, reliable for production use',
          created: null,
        },
        {
          id: 'gemini-2.0-flash',
          name: 'Gemini 2.0 Flash (Stable)',
          description: 'Next generation features, speed, and enhanced performance',
          created: null,
        },
        {
          id: 'gemini-2.5-pro-preview-06-05',
          name: 'Gemini 2.5 Pro Preview (Latest)',
          description: 'Our most intelligent model with enhanced reasoning - Preview version',
          created: null,
        },
      ];
    }
  }

  /**
   * Format Gemini model ID into a user-friendly name
   */
  private static formatGeminiModelName(modelId: string): string {
    const nameMap: { [key: string]: string } = {
      'gemini-1.5-flash': 'Gemini 1.5 Flash (Recommended & Stable)',
      'gemini-1.5-pro': 'Gemini 1.5 Pro (Stable)',
      'gemini-2.0-flash': 'Gemini 2.0 Flash (Stable)',
      'gemini-2.5-pro-preview-06-05': 'Gemini 2.5 Pro Preview (Latest)',
      'gemini-2.5-flash-preview-05-20': 'Gemini 2.5 Flash Preview (Latest)',
      'gemini-1.5-flash-8b': 'Gemini 1.5 Flash 8B (Efficient)',
    };
    
    return nameMap[modelId] || modelId;
  }

  /**
   * Get description for a Gemini model
   */
  private static getGeminiModelDescription(modelId: string): string {
    const descMap: { [key: string]: string } = {
      'gemini-1.5-flash': 'Fast and versatile model for most use cases with proven reliability',
      'gemini-1.5-pro': 'Advanced reasoning and complex task handling, reliable for production use',
      'gemini-2.0-flash': 'Next generation features, speed, and enhanced performance',
      'gemini-2.5-pro-preview-06-05': 'Our most intelligent model with enhanced reasoning - Preview version',
      'gemini-2.5-flash-preview-05-20': 'Fast and intelligent model with 2.5 generation improvements - Preview version',
      'gemini-1.5-flash-8b': 'Optimized for speed and efficiency with lower costs',
    };
    
    return descMap[modelId] || `Google Gemini model: ${modelId}`;
  }
} 