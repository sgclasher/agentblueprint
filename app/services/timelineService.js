import { OpenAIServerProvider } from '../lib/llm/providers/openaiServerProvider';
import { markdownService } from './markdownService';

/**
 * Timeline Generation Service
 * 
 * This service handles the generation of AI transformation timelines based on
 * business profiles using real LLM integration (OpenAI GPT-4o).
 */

export class TimelineService {
  /**
   * Generate a comprehensive AI transformation timeline using AI from markdown content
   * @param {string} profileMarkdown - Full markdown representation of client profile
   * @param {string} scenarioType - 'conservative', 'balanced', or 'aggressive'
   * @param {Object} businessProfile - Extracted business profile for validation
   * @returns {Promise<Object>} Generated timeline data
   */
  static async generateTimelineFromMarkdown(profileMarkdown, scenarioType = 'balanced', businessProfile = null) {
    try {
      // Check if OpenAI API key is available
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured. Set OPENAI_API_KEY environment variable.');
      }

      // Validate scenario type
      const validScenarios = ['conservative', 'balanced', 'aggressive'];
      if (!validScenarios.includes(scenarioType)) {
        throw new Error(`Invalid scenario type. Must be one of: ${validScenarios.join(', ')}`);
      }
      
      // Initialize OpenAI server provider
      const openaiProvider = new OpenAIServerProvider();
      
      // Generate timeline using LLM with full markdown context
      const timeline = await openaiProvider.generateTimeline(profileMarkdown, scenarioType);
      
      // Validate and enhance the response
      this.validateTimelineResponse(timeline);
      
      return timeline;
      
    } catch (error) {
      console.error('Timeline generation error:', error);
      
      // Provide transparent error information
      throw new Error(`Timeline generation failed: ${error.message}`);
    }
  }

  /**
   * Generate a comprehensive AI transformation timeline using AI
   * @param {Object} businessProfile - Company profile data
   * @param {string} scenarioType - 'conservative', 'balanced', or 'aggressive'
   * @returns {Promise<Object>} Generated timeline data
   */
  static async generateTimeline(businessProfile, scenarioType = 'balanced') {
    try {
      // Check if OpenAI API key is available
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured. Set OPENAI_API_KEY environment variable.');
      }

      // Convert profile to markdown for LLM processing
      const profileMarkdown = markdownService.generateMarkdown(businessProfile);
      
      // Validate inputs
      this.validateInputs(businessProfile, scenarioType);
      
      // Use the new markdown-based method
      return await this.generateTimelineFromMarkdown(profileMarkdown, scenarioType, businessProfile);
      
    } catch (error) {
      console.error('Timeline generation error:', error);
      
      // Provide transparent error information
      throw new Error(`Timeline generation failed: ${error.message}`);
    }
  }

  /**
   * Validate input parameters
   */
  static validateInputs(businessProfile, scenarioType) {
    if (!businessProfile) {
      throw new Error('Business profile is required');
    }

    if (!businessProfile.companyName) {
      throw new Error('Company name is required in business profile');
    }

    const validScenarios = ['conservative', 'balanced', 'aggressive'];
    if (!validScenarios.includes(scenarioType)) {
      throw new Error(`Invalid scenario type. Must be one of: ${validScenarios.join(', ')}`);
    }
  }

  /**
   * Validate the timeline response structure
   */
  static validateTimelineResponse(timeline) {
    const requiredFields = ['currentState', 'phases', 'futureState', 'summary'];
    
    for (const field of requiredFields) {
      if (!timeline[field]) {
        throw new Error(`Invalid timeline response: missing ${field}`);
      }
    }

    if (!Array.isArray(timeline.phases)) {
      throw new Error('Invalid timeline response: phases must be an array');
    }

    if (timeline.phases.length === 0) {
      throw new Error('Invalid timeline response: timeline must contain at least one phase');
    }

    // Validate each phase has required structure
    timeline.phases.forEach((phase, index) => {
      if (!phase.description) {
        throw new Error(`Phase ${index + 1} missing description`);
      }
      if (!phase.initiatives || !Array.isArray(phase.initiatives)) {
        throw new Error(`Phase ${index + 1} missing or invalid initiatives`);
      }
    });

    // Validate summary has required fields
    const summaryFields = ['totalInvestment', 'expectedROI', 'timeToValue', 'riskLevel'];
    for (const field of summaryFields) {
      if (!timeline.summary[field]) {
        throw new Error(`Timeline summary missing ${field}`);
      }
    }
  }

  /**
   * Check if API key is configured (for environment validation)
   */
  static isConfigured() {
    return !!process.env.OPENAI_API_KEY;
  }

  /**
   * Get configuration status for debugging
   */
  static getStatus() {
    return {
      configured: this.isConfigured(),
      provider: 'OpenAI GPT-4o',
      apiKeyStatus: process.env.OPENAI_API_KEY ? 'Set' : 'Missing'
    };
  }
} 