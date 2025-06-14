import { aiService } from './aiService';
import { Profile, Timeline } from './types';
import { CredentialsRepository as CredentialsRepositoryClass } from '../repositories/credentialsRepository';

// Import new modular timeline components
import { validateProfileForTimeline, isProfileReadyForTimeline } from '../lib/timeline/validation';
import { extractTimelineData, formatTimelineDataForPrompt } from '../lib/timeline/dataExtractor';
import { getTimelineSystemPrompt } from '../lib/timeline/prompts/systemPrompt';
import { buildTimelineUserPrompt } from '../lib/timeline/prompts/userPromptBuilder';
import { ScenarioType, validateScenarioType } from '../lib/timeline/prompts/scenarioPrompts';

/**
 * Enhanced Timeline Service with Modular Architecture
 * 
 * This refactored service uses modular components for better maintainability,
 * testing, and debugging while fixing data extraction issues.
 */
export class TimelineService {
  
  /**
   * Generate timeline from profile data using new modular architecture
   */
  static async generateTimeline(
    profileData: Partial<Profile>, 
    scenarioType: ScenarioType = 'balanced', 
    userId: string, 
    CredentialsRepository: typeof CredentialsRepositoryClass,
    provider: string | null = null
  ): Promise<Timeline> {
    console.log('🔍 [TimelineService.generateTimeline] Starting modular generation...');
    console.log('🏢 Profile data structure:', {
      companyName: profileData.companyName,
      industry: profileData.industry,
      employeeCount: profileData.employeeCount,
      strategicInitiativesCount: profileData.strategicInitiatives?.length || 0,
      systemsCount: profileData.systemsAndApplications?.length || 0,
      hasId: !!profileData.id
    });

    // Validate inputs
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
      // Step 1: Validate AI service configuration
      console.log('🤖 Checking AI service configuration...');
      const aiStatus = await aiService.getStatus(userId, CredentialsRepository, provider);
      console.log('🤖 AI Status:', aiStatus);
      if (!aiStatus.configured) {
        throw new Error('AI provider not configured. Please configure a provider in the admin settings or set the OPENAI_API_KEY environment variable.');
      }

      // Step 2: Validate and normalize scenario type
      console.log('🎯 Validating scenario type...');
      const scenarioValidation = validateScenarioType(scenarioType);
      if (!scenarioValidation.isValid) {
        console.warn(`⚠️ Invalid scenario type "${scenarioType}", using corrected: "${scenarioValidation.corrected}"`);
      }
      const normalizedScenario = scenarioValidation.corrected;
      
      // Step 3: Validate profile data for timeline generation
      console.log('📊 Validating profile data...');
      const profileValidation = validateProfileForTimeline(profileData);
      console.log('📊 Profile validation result:', {
        isValid: profileValidation.isValid,
        errors: profileValidation.errors,
        warnings: profileValidation.warnings,
        completenessScore: profileValidation.completenessScore
      });

      if (!profileValidation.isValid) {
        throw new Error(`Profile validation failed: ${profileValidation.errors.join(', ')}`);
      }

      if (profileValidation.warnings.length > 0) {
        console.warn('⚠️ Profile validation warnings:', profileValidation.warnings);
      }

      // Step 4: Extract and process timeline-specific data
      console.log('🔄 Extracting timeline data...');
      const timelineData = extractTimelineData(profileData);
      
      console.log('📊 Timeline data extracted:', {
        companyName: timelineData.companyProfile.name,
        industry: timelineData.companyProfile.industry,
        dataQuality: timelineData.metadata.dataQuality,
        timelineReadiness: timelineData.metadata.timelineReadiness,
        opportunityAreas: timelineData.businessContext.opportunityAreas
      });

      if (!timelineData.metadata.timelineReadiness) {
        console.warn('⚠️ Profile may not be ready for high-quality timeline generation');
        console.warn('Missing data:', timelineData.metadata.missingCriticalData);
        console.warn('Recommendations:', timelineData.metadata.recommendations);
      }

      // Step 5: Build prompts using modular components
      console.log('🔄 Building modular prompts...');
      const systemPrompt = getTimelineSystemPrompt({
        industry: timelineData.companyProfile.industry,
        companySize: timelineData.companyProfile.size.employees
      });
      
      const userPrompt = buildTimelineUserPrompt(profileData, normalizedScenario);
      
      console.log('📋 Prompt statistics:', {
        systemPromptLength: systemPrompt.length,
        userPromptLength: userPrompt.length,
        containsCompanyName: userPrompt.includes(timelineData.companyProfile.name),
        containsIndustry: userPrompt.includes(timelineData.companyProfile.industry),
        scenarioType: normalizedScenario
      });

      // Step 6: Validate prompts contain company-specific information
      const promptValidation = this.validatePromptContent(userPrompt, timelineData);
      if (promptValidation.warnings.length > 0) {
        console.warn('⚠️ Prompt validation warnings:', promptValidation.warnings);
      }

      // Step 7: Generate timeline using AI service
      console.log('🤖 Sending to AI service for generation...');
      const timeline = await aiService.generateJson(
        systemPrompt, 
        userPrompt, 
        userId, 
        CredentialsRepository,
        provider
      );

      console.log('✅ Timeline generated successfully');
      console.log('📊 Timeline structure validation:', {
        hasCurrentState: !!timeline.currentState,
        phasesCount: timeline.phases?.length || 0,
        hasFutureState: !!timeline.futureState,
        hasSummary: !!timeline.summary
      });

      // Step 8: Validate AI response
      this.validateTimelineResponse(timeline);

      // Step 9: Check if company name appears in the timeline
      const timelineStr = JSON.stringify(timeline);
      const containsCompanyName = timelineStr.includes(timelineData.companyProfile.name);
      console.log('🔍 Company name in timeline?', containsCompanyName);
      
      if (!containsCompanyName) {
        console.warn('⚠️ Generated timeline does not contain company name - may be too generic');
      }

      // Step 10: Enhance timeline with metadata
      const enhancedTimeline = this.enhanceTimelineWithMetadata(timeline, timelineData, normalizedScenario);

      return enhancedTimeline;

    } catch (error: any) {
      console.error('❌ Modular timeline generation error:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        profileData: {
          companyName: profileData.companyName,
          hasInitiatives: !!profileData.strategicInitiatives?.length
        }
      });
      throw new Error(`Timeline generation failed: ${error.message}`);
    }
  }

  /**
   * Legacy method for markdown-based generation (maintaining backward compatibility)
   */
  static async generateTimelineFromMarkdown(
    profileMarkdown: string, 
    scenarioType: ScenarioType = 'balanced', 
    userId: string, 
    CredentialsRepository: typeof CredentialsRepositoryClass
  ): Promise<Timeline> {
    console.log('🔍 [TimelineService.generateTimelineFromMarkdown] Legacy method called');
    console.log('📝 Profile markdown length:', profileMarkdown?.length || 0);
    console.log('⚠️ Warning: This legacy method may not provide optimal results. Consider using profile-based generation.');

    if (!userId) {
      throw new Error('User ID is required for timeline generation.');
    }
    if (!CredentialsRepository) {
      throw new Error('CredentialsRepository is required.');
    }

    try {
      const aiStatus = await aiService.getStatus(userId, CredentialsRepository);
      console.log('🤖 AI Status:', aiStatus);
      if (!aiStatus.configured) {
        throw new Error('AI provider not configured. Please configure a provider in the admin settings or set the OPENAI_API_KEY environment variable.');
      }

      const scenarioValidation = validateScenarioType(scenarioType);
      const normalizedScenario = scenarioValidation.corrected;

      // Use legacy prompt building for markdown
      const systemPrompt = getTimelineSystemPrompt();
      
      // For markdown, we'll use a simplified approach since we don't have structured profile data
      const userPrompt = this.buildLegacyMarkdownPrompt(profileMarkdown, normalizedScenario);

      console.log('📋 Legacy prompt lengths:', {
        systemPromptLength: systemPrompt.length,
        userPromptLength: userPrompt.length
      });

      const timeline = await aiService.generateJson(
        systemPrompt, 
        userPrompt, 
        userId, 
        CredentialsRepository
      );

      console.log('✅ Legacy timeline generated successfully');
      this.validateTimelineResponse(timeline);

      return timeline;

    } catch (error: any) {
      console.error('❌ Legacy timeline generation error:', error);
      throw new Error(`Timeline generation failed: ${error.message}`);
    }
  }

  /**
   * Builds a legacy prompt for markdown-based generation
   */
  static buildLegacyMarkdownPrompt(profileMarkdown: string, scenarioType: ScenarioType): string {
    const scenarioInstructions = {
      conservative: 'Focus on proven technologies, lower risk, extended timelines, and gradual adoption.',
      balanced: 'Balance innovation with practicality. Use moderate timelines and measured risk.',
      aggressive: 'Emphasize cutting-edge technologies, rapid implementation, and transformational change.'
    };

    return `Generate a comprehensive AI transformation timeline based on the provided business profile.

**Business Profile (Markdown):**
${profileMarkdown}

**Scenario Instructions:**
${scenarioInstructions[scenarioType]}

Generate a ${scenarioType.toUpperCase()} timeline that directly addresses the company's specific context, problems, and objectives mentioned in the profile.

Respond only with valid JSON following the standard timeline structure.`;
  }

  /**
   * Validates that prompts contain company-specific information
   */
  static validatePromptContent(prompt: string, timelineData: any): { warnings: string[] } {
    const warnings: string[] = [];
    
    if (!prompt.includes(timelineData.companyProfile.name)) {
      warnings.push('Prompt does not contain company name');
    }
    
    if (!prompt.includes(timelineData.companyProfile.industry)) {
      warnings.push('Prompt does not contain industry information');
    }
    
    if (timelineData.strategicContext.totalInitiatives > 0 && !prompt.includes('initiative')) {
      warnings.push('Prompt does not reference strategic initiatives');
    }
    
    return { warnings };
  }

  /**
   * Enhances timeline with metadata from profile analysis
   */
  static enhanceTimelineWithMetadata(
    timeline: Timeline, 
    timelineData: any, 
    scenarioType: ScenarioType
  ): Timeline {
    return {
      ...timeline,
      metadata: {
        generatedAt: new Date().toISOString(),
        scenarioType,
        profileData: {
          companyName: timelineData.companyProfile.name,
          industry: timelineData.companyProfile.industry,
          dataQuality: timelineData.metadata.dataQuality,
          completenessScore: timelineData.metadata.completenessScore,
          opportunityAreas: timelineData.businessContext.opportunityAreas
        },
        generation: {
          method: 'modular',
          version: '2.0'
        }
      }
    };
  }

  // Existing validation methods (keep for backward compatibility)
  static validateScenario(scenarioType: ScenarioType) {
    const validation = validateScenarioType(scenarioType);
    if (!validation.isValid && validation.error) {
      throw new Error(validation.error);
    }
  }

  static validateInputs(businessProfile: Partial<Profile>, scenarioType: ScenarioType) {
    if (!businessProfile) {
      throw new Error('Business profile is required');
    }

    if (!businessProfile.companyName) {
      throw new Error('Company name is required in business profile');
    }

    this.validateScenario(scenarioType);
  }

  static validateTimelineResponse(timeline: any): asserts timeline is Timeline {
    const requiredFields = ['currentState', 'phases', 'futureState', 'summary'];
    
    for (const field of requiredFields) {
      if (!timeline[field]) {
        throw new Error(`Invalid timeline response: missing ${field}`);
      }
    }

    if (!Array.isArray(timeline.phases) || timeline.phases.length === 0) {
      throw new Error('Invalid timeline response: phases must be an array and non-empty');
    }

    timeline.phases.forEach((phase: any, index: number) => {
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

  static async isConfigured(userId: string, CredentialsRepository: typeof CredentialsRepositoryClass, provider: string | null = null): Promise<boolean> {
    if (!userId) return false;
    const status = await aiService.getStatus(userId, CredentialsRepository, provider);
    return status.configured;
  }

  static async getStatus(userId: string | undefined, CredentialsRepository: typeof CredentialsRepositoryClass, provider: string | null = null) {
    if (!userId || !CredentialsRepository) {
      return { configured: false, provider: 'None', apiKeyStatus: 'Missing user ID or Repository' };
    }
    return await aiService.getStatus(userId, CredentialsRepository, provider);
  }
} 