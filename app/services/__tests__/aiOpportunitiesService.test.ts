import { AIOpportunitiesService, AIOpportunitiesAnalysis } from '../aiOpportunitiesService';
import { Profile } from '../types';
import { aiService } from '../aiService';
import { validateAIOpportunitiesResponse } from '../../lib/llm/prompts/aiOpportunitiesPrompt';

// Mock dependencies
jest.mock('../aiService');
jest.mock('../../lib/llm/prompts/aiOpportunitiesPrompt', () => ({
  AI_OPPORTUNITIES_SYSTEM_PROMPT: 'Mock system prompt',
  AI_OPPORTUNITIES_USER_PROMPT: jest.fn(() => 'Mock user prompt'),
  validateAIOpportunitiesResponse: jest.fn(),
}));

const mockedAiService = aiService as jest.Mocked<typeof aiService>;
const mockedValidateResponse = validateAIOpportunitiesResponse as jest.Mock;

describe('AIOpportunitiesService', () => {
  const mockProfile: Partial<Profile> = {
    id: 'test-profile-1',
    companyName: 'TechCorp Solutions',
  };

  const mockAIResponse: AIOpportunitiesAnalysis = {
    executiveSummary: 'A great summary.',
    opportunities: [],
    priorityRecommendations: [],
    industryContext: 'Tech',
    overallReadinessScore: 82,
    nextSteps: [],
    generatedAt: new Date().toISOString(),
    analysisMetadata: {
        initiativeCount: 1,
        problemCount: 1,
        systemCount: 1,
        industryFocus: 'Tech',
        companySize: '100',
    }
  };
  
  const mockUserId = 'user-123';
  const mockRepo = {}; // Placeholder, as its usage is within the mocked aiService

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('analyzeOpportunities', () => {
    it('should return AI analysis when service is configured and AI responds successfully', async () => {
      mockedAiService.isConfigured.mockResolvedValue(true);
      mockedAiService.generateJson.mockResolvedValue(mockAIResponse);
      mockedValidateResponse.mockReturnValue([]); // No validation warnings

      const result = await AIOpportunitiesService.analyzeOpportunities(
        mockProfile as Profile,
        mockUserId,
        mockRepo
      );

      expect(mockedAiService.isConfigured).toHaveBeenCalledWith(mockUserId, mockRepo, undefined);
      expect(mockedAiService.generateJson).toHaveBeenCalled();
      expect(mockedValidateResponse).toHaveBeenCalledWith(mockAIResponse);
      expect(result).toEqual(mockAIResponse);
    });

    it('should throw an error if the AI provider is not configured', async () => {
      mockedAiService.isConfigured.mockResolvedValue(false);

      await expect(
        AIOpportunitiesService.analyzeOpportunities(mockProfile as Profile, mockUserId, mockRepo)
      ).rejects.toThrow('No AI provider configured. Please configure an AI provider in admin settings.');
      
      expect(mockedAiService.generateJson).not.toHaveBeenCalled();
    });

    it('should propagate errors from the AI service', async () => {
      mockedAiService.isConfigured.mockResolvedValue(true);
      const aiError = new Error('AI service is down');
      mockedAiService.generateJson.mockRejectedValue(aiError);

      await expect(
        AIOpportunitiesService.analyzeOpportunities(mockProfile as Profile, mockUserId, mockRepo)
      ).rejects.toThrow('AI service is down');
    });

    it('should throw an error for an invalid AI response structure', async () => {
        mockedAiService.isConfigured.mockResolvedValue(true);
        const invalidResponse = { some: 'other object' }; // Missing required fields
        mockedAiService.generateJson.mockResolvedValue(invalidResponse);
        mockedValidateResponse.mockReturnValue(['Missing executiveSummary field']); // Simulate validation failure
  
        await expect(
          AIOpportunitiesService.analyzeOpportunities(mockProfile as Profile, mockUserId, mockRepo)
        ).rejects.toThrow('Invalid AI response structure: missing required fields');
    });

    it('should throw an error if the profile is null or undefined', async () => {
        await expect(
            AIOpportunitiesService.analyzeOpportunities(null as any, mockUserId, mockRepo)
        ).rejects.toThrow('Profile is required for analysis');
    });
  });
}); 