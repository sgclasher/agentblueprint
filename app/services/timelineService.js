import { markdownService } from './markdownService';
import { aiService } from './aiService';
import { buildTimelineUserPrompt, getTimelineSystemPrompt } from '../lib/llm/prompts/timelinePrompts';

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
   * @returns {Promise<Object>} Generated timeline data.
   */
  static async generateTimelineFromMarkdown(profileMarkdown, scenarioType = 'balanced') {
    try {
      if (!aiService.getStatus().configured) {
        throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.');
      }

      this.validateScenario(scenarioType);

      const systemPrompt = getTimelineSystemPrompt();
      const userPrompt = buildTimelineUserPrompt(profileMarkdown, scenarioType);

      const timeline = await aiService.generateJson(systemPrompt, userPrompt);

      this.validateTimelineResponse(timeline);

      return timeline;

    } catch (error) {
      console.error('Timeline generation error:', error);
      throw new Error(`Timeline generation failed: ${error.message}`);
    }
  }

  /**
   * Generate a comprehensive AI transformation timeline using AI.
   * @param {Object} businessProfile - Company profile data.
   * @param {string} scenarioType - 'conservative', 'balanced', or 'aggressive'.
   * @returns {Promise<Object>} Generated timeline data.
   */
  static async generateTimeline(businessProfile, scenarioType = 'balanced') {
    try {
      this.validateInputs(businessProfile, scenarioType);

      const profileMarkdown = markdownService.generateMarkdown(businessProfile);

      return await this.generateTimelineFromMarkdown(profileMarkdown, scenarioType);

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
   * Check if the underlying AI service is configured.
   * @returns {boolean}
   */
  static isConfigured() {
    return aiService.getStatus().configured;
  }

  /**
   * Get configuration status for debugging.
   * @returns {Object}
   */
  static getStatus() {
    return aiService.getStatus();
  }
} 