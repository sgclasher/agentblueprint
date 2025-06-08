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
  async #getConfiguredProvider(userId, Repository, preferredProviderName = null) {
    // 1. Try to get the user's default provider from the database.
    if (userId) {
      const credential = await Repository.getDefaultProvider(userId, 'ai_provider');
      
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
    }

    // 2. Fall back to environment variable.
    if (process.env.OPENAI_API_KEY) {
      return new OpenAIServerProvider();
    }

    // 3. No provider configured.
    return null;
  }

  /**
   * Generates a JSON object from a given set of prompts.
   * @param {string} systemPrompt - The system prompt.
   * @param {string} userPrompt - The user prompt.
   * @param {string} userId - The ID of the user.
   * @param {object} CredentialsRepository - The repository class to use for DB access.
   * @param {object} options - Must include `provider`.
   * @returns {Promise<object>} The generated JSON object.
   */
  async generateJson(systemPrompt, userPrompt, userId, CredentialsRepository, options = {}) {
    const { provider: preferredProvider } = options;
    if (!userId || !CredentialsRepository) {
      throw new Error('User context (userId) and CredentialsRepository are required.');
    }

    const provider = await this.#getConfiguredProvider(userId, CredentialsRepository, preferredProvider);

    if (!provider) {
      throw new Error('No AI provider configured. Please check admin settings or set OPENAI_API_KEY.');
    }

    return provider.generateJson(systemPrompt, userPrompt, options);
  }

  /**
   * Checks the status of the configured AI provider for a specific user.
   * @param {string} userId - The ID of the user.
   * @param {object} CredentialsRepository - The repository class to use for DB access.
   * @returns {Promise<object>} Status object.
   */
  async getStatus(userId, CredentialsRepository) {
    if (!userId || !CredentialsRepository) {
        return { configured: false, provider: 'None', apiKeyStatus: 'Missing user ID or Repository' };
    }
    
    const provider = await this.#getConfiguredProvider(userId, CredentialsRepository);
    
    if (!provider) {
      return {
        configured: false,
        provider: 'None',
        apiKeyStatus: 'Not configured',
      };
    }
    
    return provider.getStatus();
  }
}

// Export a singleton instance of the service
export const aiService = new AIService(); 