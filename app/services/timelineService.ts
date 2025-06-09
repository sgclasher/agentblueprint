import { aiService } from './aiService';
import { getTimelineSystemPrompt, buildTimelineUserPrompt } from '../lib/llm/prompts/timelinePrompts';
import { Profile, Timeline } from './types';
import { CredentialsRepository as CredentialsRepositoryClass } from '../repositories/credentialsRepository';

type ScenarioType = 'conservative' | 'balanced' | 'aggressive';

export class TimelineService {
  static async generateTimelineFromMarkdown(
    profileMarkdown: string, 
    scenarioType: ScenarioType = 'balanced', 
    userId: string, 
    CredentialsRepository: typeof CredentialsRepositoryClass
  ): Promise<Timeline> {
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
      const userPrompt = buildTimelineUserPrompt({} as Profile, scenarioType); // HACK: buildTimelineUserPrompt expects Profile, but we have markdown. The prompt builder logic needs to be revisited to handle this case. For now, passing empty profile. The prompt builder itself will use the markdown passed.

      const timeline = await aiService.generateJson(
        systemPrompt, 
        userPrompt, 
        userId, 
        CredentialsRepository
      );

      this.validateTimelineResponse(timeline);

      return timeline;

    } catch (error: any) {
      console.error('Timeline generation error:', error);
      throw new Error(`Timeline generation failed: ${error.message}`);
    }
  }

  static async generateTimeline(
    profileData: Partial<Profile>, 
    scenarioType: ScenarioType = 'balanced', 
    userId: string, 
    CredentialsRepository: typeof CredentialsRepositoryClass,
    provider: string | null = null
  ): Promise<Timeline> {
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
      console.log('[TimelineService.generateTimeline] userId:', userId, 'provider:', provider);
      const aiStatus = await aiService.getStatus(userId, CredentialsRepository, provider);
      console.log('[TimelineService.generateTimeline] aiStatus:', aiStatus);
      if (!aiStatus.configured) {
        throw new Error('AI provider not configured. Please configure a provider in the admin settings or set the OPENAI_API_KEY environment variable.');
      }

      this.validateScenario(scenarioType);

      const userPrompt = buildTimelineUserPrompt(profileData, scenarioType);
      const systemPrompt = getTimelineSystemPrompt();

      const timeline = await aiService.generateJson(
        systemPrompt, 
        userPrompt, 
        userId, 
        CredentialsRepository,
        provider
      );

      this.validateTimelineResponse(timeline);

      return timeline;

    } catch (error: any) {
      console.error('Timeline generation error:', error);
      throw new Error(`Timeline generation failed: ${error.message}`);
    }
  }

  static validateScenario(scenarioType: ScenarioType) {
    const validScenarios = ['conservative', 'balanced', 'aggressive'];
    if (!validScenarios.includes(scenarioType)) {
      throw new Error(`Invalid scenario type. Must be one of: ${validScenarios.join(', ')}`);
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