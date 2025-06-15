import { ProfileExtractionService } from '../../services/profileExtractionService';
import { aiService } from '../../services/aiService';

jest.mock('../../services/aiService', () => ({
  aiService: {
    generateJson: jest.fn(),
  },
}));

const mockedAiService = aiService as jest.Mocked<typeof aiService>;

describe('ProfileExtractionService', () => {
  let extractionService: ProfileExtractionService;

  beforeEach(() => {
    jest.clearAllMocks();
    extractionService = new ProfileExtractionService();
  });

  describe('extractProfileFromMarkdown', () => {
    it('should call the AI service and return its successful response', async () => {
      const markdown = '# Test Profile\n\nThis is a test profile with enough content to pass the length check.';
      const mockAIResponse = {
        companyName: { value: 'Acme Corp', confidence: 0.95 },
      };
      mockedAiService.generateJson.mockResolvedValue(mockAIResponse);

      const result = await extractionService.extractProfileFromMarkdown(markdown, 'user-123');

      expect(mockedAiService.generateJson).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockAIResponse);
    });

    it('should return a success=false object when AI service fails', async () => {
        mockedAiService.generateJson.mockRejectedValue(new Error('AI is offline'));
  
        const result = await extractionService.extractProfileFromMarkdown('some markdown with enough content to pass the check', 'user-123');
  
        expect(result.success).toBe(false);
        expect(result.error).toBe('AI is offline');
        expect(result.data).toBeNull();
    });

    it('should enforce a minimum markdown length', async () => {
        const result = await extractionService.extractProfileFromMarkdown('too short', 'user-123');

        expect(result.success).toBe(false);
        expect(result.error).toBe('Markdown content is too short for meaningful extraction');
        expect(mockedAiService.generateJson).not.toHaveBeenCalled();
    });

    it('should run validation warnings on the AI response', async () => {
        const markdown = '# Test Profile\n\nThis is more test content to ensure the length check is passed.';
        const mockAIResponse = {
            // This is not a valid structure
            strategicInitiatives: { value: 'not-an-array', confidence: 0.9 }
        };
        mockedAiService.generateJson.mockResolvedValue(mockAIResponse);

        const result = await extractionService.extractProfileFromMarkdown(markdown, 'user-123');

        expect(result.success).toBe(true); // Extraction is successful
        expect(result.validationWarnings.length).toBeGreaterThan(0);
        expect(result.validationWarnings[0]).toContain('should be an array');
    });
  });

  describe('mapToProfileSchema', () => {
    it('should correctly map flat extracted data to the Profile schema', () => {
      const extractedData = {
        companyName: { value: 'Mapped Inc.', confidence: 0.9 },
        industry: { value: 'Logistics', confidence: 0.88 },
      };

      const mappedProfile = extractionService.mapToProfileSchema(extractedData);

      expect(mappedProfile.companyName).toBe('Mapped Inc.');
      expect(mappedProfile.industry).toBe('Logistics');
    });

    it('should skip mapping fields below the confidence threshold', () => {
        const extractedData = {
          companyName: { value: 'HighConfidence Corp', confidence: 0.9 },
          industry: { value: 'Should be skipped', confidence: 0.2 },
        };
  
        const mappedProfile = extractionService.mapToProfileSchema(extractedData, 0.5);
  
        expect(mappedProfile.companyName).toBe('HighConfidence Corp');
        expect(mappedProfile.industry).toBeUndefined();
    });
  });
}); 