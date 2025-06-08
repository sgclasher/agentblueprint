import { markdownService } from './markdownService';
import { aiService } from './aiService';
import { getTimelineSystemPrompt, buildTimelineUserPrompt } from '../lib/llm/prompts/timelinePrompts';

/**
 * Timeline Generation Service
 *
 * This service handles the business logic for generating AI transformation timelines.
 * It uses the central aiService to interact with LLMs and is responsible for
 * preparing data for and validating the results from the AI.
 */
export class TimelineService {
  /**
   * Generate a comprehensive AI transformation timeline using AI from markdown content.
   * @param {string} profileMarkdown - Full markdown representation of client profile.
   * @param {string} scenarioType - 'conservative', 'balanced', or 'aggressive'.
   * @param {string} userId - The ID of the authenticated user.
   * @param {object} CredentialsRepository - The repository class for DB access.
   * @returns {Promise<Object>} Generated timeline data.
   */
  static async generateTimelineFromMarkdown(profileMarkdown, scenarioType = 'balanced', userId, CredentialsRepository) {
    if (!userId) {
      throw new Error('User ID is required for timeline generation.');
    }
    if (!CredentialsRepository) {
      throw new Error('CredentialsRepository is required.');
    }

    try {
      const aiStatus = await aiService.getStatus(userId, CredentialsRepository);
      if (!aiStatus.configured) {
        throw new Error('AI provider not configured. Please configure a provider in the admin settings or set the OPENAI_API_KEY environment variable.');
      }

      this.validateScenario(scenarioType);

      const systemPrompt = getTimelineSystemPrompt();
      const userPrompt = buildTimelineUserPrompt(profileMarkdown, scenarioType);

      const timeline = await aiService.generateJson(
        systemPrompt, 
        userPrompt, 
        userId, 
        CredentialsRepository
      );

      this.validateTimelineResponse(timeline);

      return timeline;

    } catch (error) {
      console.error('Timeline generation error:', error);
      throw new Error(`Timeline generation failed: ${error.message}`);
    }
  }

  /**
   * Generate a comprehensive AI transformation timeline using AI.
   * @param {object} profileData - Company profile data.
   * @param {string} scenarioType - 'conservative', 'balanced', or 'aggressive'.
   * @param {string} userId - The ID of the authenticated user.
   * @param {object} CredentialsRepository - The repository class for DB access.
   * @returns {Promise<Object>} Generated timeline data.
   */
  static async generateTimeline(profileData, scenarioType = 'balanced', userId, CredentialsRepository) {
    if (!userId) {
      throw new Error('User ID is required for timeline generation.');
    }
    if (!CredentialsRepository) {
      throw new Error('CredentialsRepository is required.');
    }
    if (!profileData) {
      throw new Error('Profile data is required for timeline generation.');
    }

    try {
      const aiStatus = await aiService.getStatus(userId, CredentialsRepository);
      if (!aiStatus.configured) {
        throw new Error('AI provider not configured. Please configure a provider in the admin settings or set the OPENAI_API_KEY environment variable.');
      }

      this.validateScenario(scenarioType);

      // The prompt builder now handles both markdown generation and summary extraction
      const userPrompt = buildTimelineUserPrompt(profileData, scenarioType);
      const systemPrompt = getTimelineSystemPrompt();

      const timeline = await aiService.generateJson(
        systemPrompt, 
        userPrompt, 
        userId, 
        CredentialsRepository
      );

      this.validateTimelineResponse(timeline);

      return timeline;

    } catch (error) {
      console.error('Timeline generation error:', error);
      throw new Error(`Timeline generation failed: ${error.message}`);
    }
  }

  /**
   * Validates the scenario type.
   * @param {string} scenarioType - The scenario to validate.
   */
  static validateScenario(scenarioType) {
    const validScenarios = ['conservative', 'balanced', 'aggressive'];
    if (!validScenarios.includes(scenarioType)) {
      throw new Error(`Invalid scenario type. Must be one of: ${validScenarios.join(', ')}`);
    }
  }

  /**
   * Validate input parameters.
   * @param {Object} businessProfile - The business profile object.
   * @param {string} scenarioType - The scenario type.
   */
  static validateInputs(businessProfile, scenarioType) {
    if (!businessProfile) {
      throw new Error('Business profile is required');
    }

    if (!businessProfile.companyName) {
      throw new Error('Company name is required in business profile');
    }

    this.validateScenario(scenarioType);
  }

  /**
   * Validate the timeline response structure.
   * @param {Object} timeline - The timeline object returned from the AI.
   */
  static validateTimelineResponse(timeline) {
    const requiredFields = ['currentState', 'phases', 'futureState', 'summary'];
    
    for (const field of requiredFields) {
      if (!timeline[field]) {
        throw new Error(`Invalid timeline response: missing ${field}`);
      }
    }

    if (!Array.isArray(timeline.phases) || timeline.phases.length === 0) {
      throw new Error('Invalid timeline response: phases must be an array and non-empty');
    }

    timeline.phases.forEach((phase, index) => {
      if (!phase.description || !phase.initiatives || !Array.isArray(phase.initiatives)) {
        throw new Error(`Phase ${index + 1} is missing description or has invalid initiatives`);
      }
    });

    const summaryFields = ['totalInvestment', 'expectedROI', 'timeToValue', 'riskLevel'];
    for (const field of summaryFields) {
      if (!timeline.summary[field]) {
        throw new Error(`Timeline summary is missing field: ${field}`);
      }
    }
  }

  /**
   * Check if the underlying AI service is configured for a specific user.
   * @param {string} userId - The ID of the authenticated user.
   * @param {object} CredentialsRepository - The repository class for DB access.
   * @returns {Promise<boolean>}
   */
  static async isConfigured(userId, CredentialsRepository) {
    if (!userId) return false;
    const status = await aiService.getStatus(userId, CredentialsRepository);
    return status.configured;
  }

  /**
   * Get configuration status for a specific user for debugging.
   * @param {string} userId - The ID of the authenticated user.
   * @param {object} CredentialsRepository - The repository class for DB access.
   * @returns {Promise<Object>}
   */
  static async getStatus(userId, CredentialsRepository) {
    if (!userId || !CredentialsRepository) {
      return { configured: false, provider: 'None', apiKeyStatus: 'Missing user ID or Repository' };
    }
    return await aiService.getStatus(userId, CredentialsRepository);
  }
} 