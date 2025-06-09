import { OpenAIServerProvider } from '../lib/llm/providers/openaiServerProvider';
import { ClaudeServerProvider } from '../lib/llm/providers/claudeServerProvider';
import { GoogleServerProvider } from '../lib/llm/providers/googleServerProvider';
import { decryptCredential } from '../utils/encryption';

/**
 * Central AI Service
 *
 * This service is the single entry point for all LLM interactions in the application.
 * It abstracts the specific provider implementation and provides generic methods
 * for interacting with LLMs, dynamically selecting the provider based on user configuration.
 */
class AIService {
  /**
   * Retrieves and configures the appropriate AI provider based on user settings.
   * This method uses dependency injection for the repository to avoid circular dependencies.
   *
   * @param {string} userId - The ID of the user.
   * @param {object} Repository - The CredentialsRepository class.
   * @param {string} [preferredProviderName=null] - The name of a preferred provider.
   * @returns {Promise<OpenAIServerProvider|ClaudeServerProvider|GoogleServerProvider|null>} An instance of the configured provider.
   * @private
   */
  async #getConfiguredProvider(userId: string, Repository: any, preferredProviderName: string | null = null) {
    if (!userId) {
      // No fallback to OpenAI. If no user context, return null.
      return null;
    }

    let credential;

    // If a specific provider is requested, try to fetch it directly.
    if (preferredProviderName) {
      const allProviders = await Repository.getCredentials(userId, 'ai_provider');
      console.log('[aiService] Providers fetched for user:', allProviders.map((p: any) => p.service_name));
      credential = allProviders.find((p: any) => p.service_name === preferredProviderName);
      console.log('[aiService] Looking for provider:', preferredProviderName);
      console.log('[aiService] Credential found:', credential);
    } else {
      // Otherwise, get the default provider.
      credential = await Repository.getDefaultProvider(userId, 'ai_provider');
      console.log('[aiService] Using default provider credential:', credential);
    }
    
    // If we have a credential, decrypt and instantiate the provider.
    if (credential && credential.credentials_encrypted && credential.encryption_metadata) {
      try {
        const decryptedString = decryptCredential(
          credential.credentials_encrypted,
          credential.encryption_metadata.iv,
          credential.encryption_metadata.authTag
        );
        const credentials = JSON.parse(decryptedString);
        // Normalize: support both 'apiKey' and 'api_key' for backward compatibility
        const apiKey = credentials.apiKey || credentials.api_key;
        const model = credentials.model || credential.configuration?.model;
        console.log('[aiService] Decrypted credentials:', { apiKey: !!apiKey, model });

        if (apiKey) {
          switch (credential.service_name.toLowerCase()) {
            case 'openai':
              return new OpenAIServerProvider({ apiKey, model });
            case 'claude':
              return new ClaudeServerProvider({ apiKey, model });
            case 'gemini':
              return new GoogleServerProvider({ apiKey, model });
            default:
              console.warn(`Unsupported service name: ${credential.service_name}`);
              throw new Error(`Selected provider '${credential.service_name}' is not supported by the backend.`);
          }
        }
      } catch (error) {
        console.error('Failed to decrypt or instantiate user-configured provider:', error);
        throw new Error('Failed to decrypt or instantiate user-configured provider.');
      }
    }

    // If no user-configured provider is found or works, do not fallback. Throw error.
    throw new Error('No valid AI provider configured for this user. Please check your provider selection.');
  }

  /**
   * Generates a JSON object from a given set of prompts.
   * @param {string} systemPrompt - The system prompt.
   * @param {string} userPrompt - The user prompt.
   * @param {string} userId - The ID of the user.
   * @param {object} CredentialsRepository - The repository class to use for DB access.
   * @param {string} [provider=null] - Optional specific provider to use.
   * @returns {Promise<object>} The generated JSON object.
   */
  async generateJson(systemPrompt: string, userPrompt: string, userId: string, CredentialsRepository: any, provider: string | null = null) {
    if (!userId || !CredentialsRepository) {
      throw new Error('User context (userId) and CredentialsRepository are required.');
    }

    // Log for backend: which provider is selected
    console.log(`[aiService] Requested provider: ${provider}`);
    const providerInstance = await this.#getConfiguredProvider(userId, CredentialsRepository, provider);
    if (!providerInstance) {
      throw new Error('No AI provider configured. Please check admin settings.');
    }
    // Log for backend: which provider is actually run
    if (providerInstance.getStatus) {
      const status = providerInstance.getStatus();
      console.log(`[aiService] Running provider: ${status.provider}`);
    }
    return providerInstance.generateJson(systemPrompt, userPrompt);
  }

  /**
   * Checks the status of the configured AI provider for a specific user.
   * @param {string} userId - The ID of the user.
   * @param {object} CredentialsRepository - The repository class to use for DB access.
   * @param {string} [provider=null] - Optional specific provider to check.
   * @returns {Promise<object>} Status object.
   */
  async getStatus(userId: string, CredentialsRepository: any, provider: string | null = null) {
    if (!userId || !CredentialsRepository) {
        return { configured: false, provider: 'None', apiKeyStatus: 'Missing user ID or Repository' };
    }
    
    try {
      const providerInstance = await this.#getConfiguredProvider(userId, CredentialsRepository, provider);
      if (!providerInstance) {
        return {
          configured: false,
          provider: 'None',
          apiKeyStatus: 'Not configured',
        };
      }
      return providerInstance.getStatus();
    } catch (err) {
      let message = 'Unknown error';
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === 'string') {
        message = err;
      }
      return {
        configured: false,
        provider: 'None',
        apiKeyStatus: 'Error: ' + message,
      };
    }
  }

  /**
   * Checks if an AI provider is configured for the user.
   * @param {string} userId - The ID of the user.
   * @param {object} CredentialsRepository - The repository class to use for DB access.
   * @param {string} [provider=null] - Optional specific provider to check.
   * @returns {Promise<boolean>} True if a provider is configured.
   */
  async isConfigured(userId: string, CredentialsRepository: any, provider: string | null = null): Promise<boolean> {
    const status = await this.getStatus(userId, CredentialsRepository, provider);
    return status.configured;
  }

  /**
   * Generates a streaming timeline.
   * @param {object} businessProfile - The business profile.
   * @param {string} scenarioType - The scenario type.
   * @param {string} userId - The ID of the user.
   * @returns {AsyncGenerator<any>} An async generator yielding stream chunks.
   */
  async * streamTimelineGeneration(businessProfile: any, scenarioType: string, userId: string): AsyncGenerator<any> {
    // This is a placeholder implementation.
    // The actual implementation would call the provider's streaming method.
    yield { type: 'start', data: 'Timeline generation started' };
    yield { type: 'complete', data: { phases: [] } };
  }
}

// Export a singleton instance of the service
export const aiService = new AIService(); 