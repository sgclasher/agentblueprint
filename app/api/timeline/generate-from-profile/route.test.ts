import { NextRequest } from 'next/server';
import { POST } from './route';

jest.mock('../../../services/timelineService', () => ({
  TimelineService: {
    generateTimeline: jest.fn().mockResolvedValue({ phases: [], summary: {} })
  }
}));

const { TimelineService } = require('../../../services/timelineService');

describe('/api/timeline/generate-from-profile API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should pass the provider argument from the request body to TimelineService.generateTimeline', async () => {
    // Mock user authentication
    jest.spyOn(require('../../../lib/supabase'), 'getUser').mockResolvedValue({ id: 'user-123' });
    // Mock CredentialsRepository.getDefaultProvider to avoid DB
    jest.spyOn(require('../../../services/aiService'), 'aiService').mockImplementation(() => ({
      getStatus: async () => ({ configured: true, provider: 'OpenAI', apiKeyStatus: 'Set' })
    }));

    // Create a mock request with provider in the body
    const mockProfile = { id: 'profile-1', companyName: 'Test Inc.' };
    const provider = 'gemini';
    const scenarioType = 'balanced';
    const reqBody = {
      profile: mockProfile,
      scenarioType,
      provider
    };
    const req = {
      json: async () => reqBody,
      headers: { get: () => 'Bearer test-token' }
    } as unknown as NextRequest;

    await POST(req);

    // Check that TimelineService.generateTimeline was called with the provider
    expect(TimelineService.generateTimeline).toHaveBeenCalledWith(
      mockProfile,
      scenarioType,
      'user-123',
      expect.anything(),
      provider
    );
  });
}); 