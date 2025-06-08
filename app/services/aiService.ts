import { OpenAIServerProvider } from '../lib/llm/providers/openaiServerProvider';
import { ClaudeServerProvider } from '../lib/llm/providers/claudeServerProvider';
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
   * @returns {Promise<OpenAIServerProvider|ClaudeServerProvider|null>} An instance of the configured provider.
   * @private
   */
  async #getConfiguredProvider(userId: string, Repository: any, preferredProviderName: string | null = null) {
    if (!userId) {
      // Fallback to environment variable if no user context is provided.
      if (process.env.OPENAI_API_KEY) {
        return new OpenAIServerProvider();
      }
      return null;
    }

    let credential;

    // If a specific provider is requested, try to fetch it directly.
    if (preferredProviderName) {
      const allProviders = await Repository.getCredentials(userId, 'ai_provider');
      credential = allProviders.find((p: any) => p.service_name === preferredProviderName);
    } else {
      // Otherwise, get the default provider.
      credential = await Repository.getDefaultProvider(userId, 'ai_provider');
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
        const apiKey = credentials.apiKey;

        if (apiKey) {
          switch (credential.service_name.toLowerCase()) {
            case 'openai':
              return new OpenAIServerProvider({ apiKey });
            case 'claude':
              return new ClaudeServerProvider({ apiKey });
            default:
              console.warn(`Unsupported service name: ${credential.service_name}`);
          }
        }
      } catch (error) {
        console.error('Failed to decrypt or instantiate user-configured provider:', error);
      }
    }

    // If no user-configured provider is found or works, fall back to the environment variable.
    if (process.env.OPENAI_API_KEY) {
      return new OpenAIServerProvider();
    }

    return null;
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

    const providerInstance = await this.#getConfiguredProvider(userId, CredentialsRepository, provider);

    if (!providerInstance) {
      throw new Error('No AI provider configured. Please check admin settings or set OPENAI_API_KEY.');
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
    
    const providerInstance = await this.#getConfiguredProvider(userId, CredentialsRepository, provider);
    
    if (!providerInstance) {
      return {
        configured: false,
        provider: 'None',
        apiKeyStatus: 'Not configured',
      };
    }
    
    return providerInstance.getStatus();
  }
}

// Export a singleton instance of the service
export const aiService = new AIService(); 