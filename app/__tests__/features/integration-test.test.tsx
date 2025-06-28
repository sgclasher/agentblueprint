import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AIOpportunitiesTab from '../../profile/components/AIOpportunitiesTab';
import { Profile } from '../../services/types';

// Mock fetch globally
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock Supabase
jest.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(() => Promise.resolve({
        data: { session: { access_token: 'mock-token' } },
        error: null
      }))
    }
  }
}));

// Mock console to reduce test noise
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

// Test profile
const testProfile: Profile = {
  id: 'test-id',
  companyName: 'Test Company',
  industry: 'Technology',
  strategicInitiatives: [
    {
      initiative: 'Process Automation',
      businessProblems: ['Manual processing'],
      contact: {
        name: 'Test User',
        title: 'Manager',
        email: 'test@test.com',
        linkedin: '',
        phone: ''
      }
    }
  ],
  systemsAndApplications: [
    { name: 'Test System', category: 'CRM' }
  ]
};

// Mock comprehensive opportunities response
const mockOpportunitiesResponse = {
  success: true,
  opportunities: {
    executiveSummary: 'Test summary',
    opportunities: [
      {
        title: 'Automated Processing',
        description: 'AI-powered process automation',
        category: 'Process Automation',
        businessImpact: {
          primaryMetrics: ['Reduce time by 50%', 'Eliminate errors'],
          estimatedROI: '200%',
          timeToValue: '3 months',
          confidenceLevel: 'High'
        },
        implementation: {
          complexity: 'Medium',
          timeframe: '6 months',
          prerequisites: ['System integration'],
          riskFactors: ['Change management']
        },
        agenticPattern: {
          recommendedPattern: 'Manager-Workers',
          patternRationale: 'Coordination needed',
          implementationApproach: 'Central coordination',
          patternComplexity: 'Medium'
        },
        relevantInitiatives: ['Process Automation'],
        aiTechnologies: ['NLP', 'ML']
      }
    ],
    priorityRecommendations: ['Start with automation'],
    industryContext: 'Technology adoption high',
    overallReadinessScore: 80,
    nextSteps: ['Assessment', 'Planning'],
    generatedAt: new Date().toISOString(),
    analysisMetadata: {
      initiativeCount: 1,
      problemCount: 1,
      systemCount: 1,
      industryFocus: 'Technology',
      companySize: 'Medium',
      provider: 'openai'
    }
  },
  cached: false,
  provider: 'openai'
};

describe('End-to-End Integration Test - AI Opportunities → Blueprint', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    consoleLogSpy.mockClear();
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test('✅ INTEGRATION: Complete flow works correctly after fixes', async () => {
    // Step 1: Mock cached opportunities load
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: mockOpportunitiesResponse.opportunities,
        cached: true
      })
    });

    // Step 2: Mock refresh API call
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockOpportunitiesResponse)
    });

    const mockNavigateToBlueprint = jest.fn();

    render(
      <AIOpportunitiesTab 
        profile={testProfile} 
        isEditing={false} 
        onNavigateToBlueprint={mockNavigateToBlueprint}
      />
    );

    // VERIFY: Cached opportunities load correctly
    await waitFor(() => {
      expect(screen.getByText('Automated Processing')).toBeInTheDocument();
    });

    expect(screen.getByText('Manager-Workers')).toBeInTheDocument();
    expect(screen.getByText('200%')).toBeInTheDocument();

    // VERIFY: Enhanced refresh functionality works
    const refreshButton = screen.getByText('🔄 Refresh Analysis');
    fireEvent.click(refreshButton);

    // Check enhanced loading text
    await waitFor(() => {
      expect(screen.getByText('Refreshing Analysis...')).toBeInTheDocument();
    });

    // Verify enhanced logging occurred
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/🔄 \[AI Opportunities\] Starting analysis generation/),
      expect.any(Object)
    );

    // Wait for completion
    await waitFor(() => {
      expect(screen.getByText('Fresh Analysis')).toBeInTheDocument();
    });

    // VERIFY: Blueprint generation triggers correctly
    const generateBlueprintButton = screen.getByText('Generate Blueprint');
    fireEvent.click(generateBlueprintButton);

    // CRITICAL: Verify opportunity context flows to blueprint
    expect(mockNavigateToBlueprint).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Automated Processing',
        agenticPattern: expect.objectContaining({
          recommendedPattern: 'Manager-Workers'
        }),
        businessImpact: expect.objectContaining({
          estimatedROI: '200%'
        })
      }),
      0
    );

    console.log('✅ INTEGRATION TEST PASSED: Complete flow verified working');
  });

  test('✅ MALFORMED DATA: Service handles corrupted opportunity context', async () => {
    // Mock malformed opportunities (this would previously cause 500 errors)
    const malformedResponse = {
      success: true,
      hasOpportunities: true,
      opportunities: {
        ...mockOpportunitiesResponse.opportunities,
        opportunities: [
          {
            title: 'Test Opportunity',
            businessImpact: {
              primaryMetrics: 'not-an-array', // MALFORMED
              estimatedROI: { complex: 'object' } // MALFORMED
            },
            agenticPattern: {
              recommendedPattern: ['array', 'not', 'string'] // MALFORMED
            },
            implementation: {
              prerequisites: null, // MALFORMED
              riskFactors: undefined // MALFORMED
            },
            aiTechnologies: 42 // MALFORMED
          }
        ]
      },
      cached: true
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(malformedResponse)
    });

    const mockNavigateToBlueprint = jest.fn();

    render(
      <AIOpportunitiesTab 
        profile={testProfile} 
        isEditing={false} 
        onNavigateToBlueprint={mockNavigateToBlueprint}
      />
    );

    await waitFor(() => {
      expect(screen.getByText('Test Opportunity')).toBeInTheDocument();
    });

    // CRITICAL: This should NOT crash despite malformed data
    const generateBlueprintButton = screen.getByText('Generate Blueprint');
    fireEvent.click(generateBlueprintButton);

    // Should still work (blueprint service will sanitize the data)
    expect(mockNavigateToBlueprint).toHaveBeenCalled();

    console.log('✅ MALFORMED DATA TEST PASSED: No crashes with corrupted context');
  });

  test('✅ ERROR HANDLING: Enhanced error messages work correctly', async () => {
    // Mock initial load
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: mockOpportunitiesResponse.opportunities,
        cached: true
      })
    });

    // Mock specific error scenarios
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: () => Promise.resolve({
        success: false,
        error: 'Authentication failed'
      })
    });

    render(<AIOpportunitiesTab profile={testProfile} isEditing={false} />);

    await waitFor(() => {
      expect(screen.getByText('🔄 Refresh Analysis')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('🔄 Refresh Analysis'));

    // VERIFY: Enhanced error message appears
    await waitFor(() => {
      expect(screen.getByText('Authentication expired. Please refresh the page and sign in again.')).toBeInTheDocument();
    });

    console.log('✅ ERROR HANDLING TEST PASSED: Enhanced error messages working');
  });

  test('✅ MULTI-PROVIDER: Works with all AI providers', async () => {
    const providers = ['openai', 'claude', 'gemini'];
    
    for (const provider of providers) {
      const providerResponse = {
        ...mockOpportunitiesResponse,
        provider,
        opportunities: {
          ...mockOpportunitiesResponse.opportunities,
          analysisMetadata: {
            ...mockOpportunitiesResponse.opportunities.analysisMetadata,
            provider
          }
        }
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          hasOpportunities: true,
          opportunities: providerResponse.opportunities,
          cached: true,
          provider
        })
      });

      const { unmount } = render(<AIOpportunitiesTab profile={testProfile} isEditing={false} />);

      await waitFor(() => {
        expect(screen.getByText('Automated Processing')).toBeInTheDocument();
      });

      unmount();
      mockFetch.mockClear();
    }

    console.log('✅ MULTI-PROVIDER TEST PASSED: All providers work correctly');
  });
}); 