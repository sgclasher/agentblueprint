/**
 * Timeline Generation After Markdown Import Tests
 * 
 * Tests the complete flow: markdown import → profile creation → timeline generation
 * Specifically testing that the "Encryption utilities should only be used server-side" error is fixed
 */

const { ProfileExtractionService } = require('../../services/profileExtractionService');

// Mock dependencies
jest.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({ 
        data: { session: { access_token: 'mock-token' } } 
      })
    }
  },
  getCurrentUser: jest.fn().mockResolvedValue({ id: 'test-user-id' })
}));

jest.mock('../../repositories/credentialsRepository', () => ({
  CredentialsRepository: {
    getDefaultProvider: jest.fn(),
    getCredentials: jest.fn()
  }
}));

jest.mock('../../repositories/profileRepository', () => ({
  ProfileRepository: {
    createProfile: jest.fn(),
    getCachedTimeline: jest.fn(),
    saveTimeline: jest.fn()
  }
}));

// Mock fetch for API calls
global.fetch = jest.fn();

const sampleMarkdown = `
# TechCorp Industries Profile

## Company Information
**Company Name**: TechCorp Industries  
**Industry**: Technology
**Employee Count**: 500-1000 employees
**Annual Revenue**: $50M - $100M
**Primary Location**: San Francisco, CA
**Website**: https://techcorp.com

## Strategic Initiatives

### Digital Transformation Initiative
**Contact**: John Smith (CTO)
**Email**: john.smith@techcorp.com
**Phone**: (555) 123-4567
`;

describe('Timeline Generation After Markdown Import', () => {
  let extractionService;
  let mockFetch;

  beforeEach(() => {
    extractionService = new ProfileExtractionService();
    mockFetch = global.fetch;
    
    // Reset all mocks
    jest.clearAllMocks();
    
    // Default mock responses
    mockFetch.mockImplementation((url, options) => {
      if (url.includes('/api/profiles/extract-markdown')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            success: true,
            extractionResult: {
              success: true,
              data: {
                companyName: { value: 'TechCorp Industries', confidence: 0.95 },
                industry: { value: 'Technology', confidence: 0.90 },
                employeeCount: { value: '500-1000 employees', confidence: 0.85 },
                annualRevenue: { value: '$50M - $100M', confidence: 0.80 },
                primaryLocation: { value: 'San Francisco, CA', confidence: 0.90 },
                websiteUrl: { value: 'https://techcorp.com', confidence: 0.95 },
                strategicInitiatives: {
                  value: [{
                    initiative: 'Digital Transformation Initiative',
                    contact: {
                      name: 'John Smith',
                      title: 'CTO',
                      email: 'john.smith@techcorp.com',
                      phone: '(555) 123-4567',
                      linkedin: ''
                    }
                  }],
                  confidence: 0.85
                }
              },
              mappedProfile: {
                companyName: 'TechCorp Industries',
                industry: 'Technology',
                employeeCount: '500-1000 employees',
                annualRevenue: '$50M - $100M',
                primaryLocation: 'San Francisco, CA',
                websiteUrl: 'https://techcorp.com',
                strategicInitiatives: [{
                  initiative: 'Digital Transformation Initiative',
                  contact: {
                    name: 'John Smith',
                    title: 'CTO',
                    email: 'john.smith@techcorp.com',
                    phone: '(555) 123-4567',
                    linkedin: ''
                  }
                }]
              }
            }
          })
        });
      }
      
      if (url.includes('/api/timeline/generate-from-profile')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            success: true,
            timeline: {
              currentState: 'Initial Assessment',
              phases: [
                {
                  phase: 1,
                  title: 'Foundation & Assessment',
                  description: 'Establish AI readiness and infrastructure foundation',
                  duration: '2-3 months',
                  initiatives: [
                    'AI readiness assessment',
                    'Infrastructure evaluation',
                    'Team training'
                  ]
                },
                {
                  phase: 2,
                  title: 'Pilot Implementation',
                  description: 'Deploy initial AI solutions in controlled environments',
                  duration: '3-4 months',
                  initiatives: [
                    'Digital transformation pilot',
                    'Process automation',
                    'Performance monitoring'
                  ]
                }
              ],
              futureState: 'AI-Enhanced Operations',
              summary: {
                totalInvestment: '$500K - $1M',
                expectedROI: '250%',
                timeToValue: '6-9 months',
                riskLevel: 'Medium'
              }
            },
            cached: false,
            generatedAt: '2024-12-01T10:00:00Z',
            scenarioType: 'balanced',
            provider: 'OpenAI GPT-4o'
          })
        });
      }
      
      return Promise.reject(new Error(`Unexpected fetch call to ${url}`));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Complete Flow Integration', () => {
    test('should complete markdown import → profile creation → timeline generation without encryption errors', async () => {
      // Step 1: Import markdown and extract profile data
      const extractionResult = await extractionService.extractProfileFromMarkdown(
        sampleMarkdown,
        'test-user-id',
        'openai'
      );

      expect(extractionResult.success).toBe(true);
      expect(extractionResult.data.companyName.value).toBe('TechCorp Industries');

      // Step 2: Mock ProfileService behavior for timeline generation
      const { ProfileService } = require('../../services/profileService');
      
      const mockProfile = {
        id: 'test-profile-id',
        companyName: 'TechCorp Industries',
        industry: 'Technology',
        employeeCount: '500-1000 employees',
        annualRevenue: '$50M - $100M',
        primaryLocation: 'San Francisco, CA',
        websiteUrl: 'https://techcorp.com',
        strategicInitiatives: [{
          initiative: 'Digital Transformation Initiative',
          contact: {
            name: 'John Smith',
            title: 'CTO',
            email: 'john.smith@techcorp.com',
            phone: '(555) 123-4567'
          }
        }]
      };

      // Step 3: Generate timeline from profile (this should use API call, not direct service)
      const timeline = await ProfileService.generateTimelineFromProfile(mockProfile);

      expect(timeline).toBeDefined();
      expect(timeline.phases).toHaveLength(2);
      expect(timeline.summary.totalInvestment).toBe('$500K - $1M');
      
      // Verify that the API was called correctly (no direct TimelineService import)
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/timeline/generate-from-profile',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer mock-token'
          }),
          body: expect.stringContaining('TechCorp Industries')
        })
      );
    });

    test('should handle authentication errors gracefully in timeline generation', async () => {
      // Mock authentication failure
      const { supabase } = require('../../lib/supabase');
      supabase.auth.getSession.mockResolvedValueOnce({
        data: { session: null },
        error: { message: 'Session expired' }
      });

      const { ProfileService } = require('../../services/profileService');
      
      const mockProfile = {
        companyName: 'Test Company',
        industry: 'Technology'
      };

      await expect(ProfileService.generateTimelineFromProfile(mockProfile))
        .rejects.toThrow('Please sign in to generate timelines');
    });

    test('should handle API errors properly without encryption issues', async () => {
      // Mock API error response
      mockFetch.mockImplementationOnce(() => 
        Promise.resolve({
          ok: false,
          status: 500,
          json: () => Promise.resolve({
            error: 'AI provider not configured'
          })
        })
      );

      const { ProfileService } = require('../../services/profileService');
      
      const mockProfile = {
        companyName: 'Test Company',
        industry: 'Technology'
      };

      await expect(ProfileService.generateTimelineFromProfile(mockProfile))
        .rejects.toThrow('No AI provider configured');
    });

    test('should not attempt to import TimelineService directly from client-side code', async () => {
      const { ProfileService } = require('../../services/profileService');
      
      // Ensure that ProfileService doesn't try to import TimelineService directly
      const mockProfile = {
        companyName: 'Test Company',
        industry: 'Technology'
      };

      // This should make an API call, not import TimelineService
      await ProfileService.generateTimelineFromProfile(mockProfile);

      // Verify API call was made instead of direct service import
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/timeline/generate-from-profile',
        expect.any(Object)
      );
    });
  });

  describe('Error Scenarios', () => {
    test('should handle network errors in timeline generation', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { ProfileService } = require('../../services/profileService');
      
      const mockProfile = {
        companyName: 'Test Company',
        industry: 'Technology'
      };

      await expect(ProfileService.generateTimelineFromProfile(mockProfile))
        .rejects.toThrow('Network error');
    });

    test('should handle malformed API responses', async () => {
      mockFetch.mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            success: false,
            error: 'Malformed response'
          })
        })
      );

      const { ProfileService } = require('../../services/profileService');
      
      const mockProfile = {
        companyName: 'Test Company',
        industry: 'Technology'
      };

      await expect(ProfileService.generateTimelineFromProfile(mockProfile))
        .rejects.toThrow('Malformed response');
    });
  });

  describe('Provider Integration', () => {
    test('should work with different AI providers through API', async () => {
      // Test with Gemini provider
      mockFetch.mockImplementationOnce((url, options) => {
        const body = JSON.parse(options.body);
        expect(body.provider).toBe('gemini');
        
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            success: true,
            timeline: {
              currentState: 'Gemini-powered assessment',
              phases: [{ phase: 1, title: 'Test', description: 'Test', duration: '1 month', initiatives: ['test'] }],
              futureState: 'AI-Enhanced',
              summary: { totalInvestment: '$100K', expectedROI: '200%', timeToValue: '3 months', riskLevel: 'Low' }
            },
            provider: 'Google Gemini 1.5 Flash'
          })
        });
      });

      const { ProfileService } = require('../../services/profileService');
      
      const mockProfile = {
        companyName: 'Test Company',
        industry: 'Technology'
      };

      const timeline = await ProfileService._generateTimelineFromProfile(mockProfile, 'balanced');
      expect(timeline).toBeDefined();
      expect(timeline.currentState).toBe('Gemini-powered assessment');
    });
  });
}); 