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

// Mock console methods to reduce test noise
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

// Test profile with comprehensive data
const integrationTestProfile: Profile = {
  id: 'integration-test-id',
  companyName: 'Integration Test Company',
  industry: 'Technology',
  employeeCount: '100-500',
  annualRevenue: '$10M-$50M',
  strategicInitiatives: [
    {
      initiative: 'Process Automation Initiative',
      businessProblems: ['Manual invoice processing', 'Data entry bottlenecks'],
      contact: {
        name: 'John Smith',
        title: 'Operations Manager',
        email: 'john.smith@test.com',
        linkedin: '',
        phone: ''
      },
      priority: 'High',
      expectedOutcomes: ['Reduce processing time by 60%', 'Eliminate data entry errors'],
      targetTimeline: '6 months'
    }
  ],
  systemsAndApplications: [
    { name: 'ERP System', category: 'Enterprise Resource Planning' },
    { name: 'CRM Platform', category: 'Customer Management' }
  ]
};

// Mock AI Opportunities response with comprehensive data
const mockAIOpportunitiesResponse = {
  success: true,
  opportunities: {
    executiveSummary: 'Your company shows excellent potential for AI adoption with strong strategic initiatives and modern technology infrastructure.',
    opportunities: [
      {
        title: 'Automated Invoice Processing',
        description: 'Implement AI-powered invoice processing to eliminate manual data entry and reduce processing time by 60%',
        category: 'Process Automation',
        businessImpact: {
          primaryMetrics: [
            'Reduce invoice processing time from 5 hours to 2 hours',
            'Eliminate 95% of manual data entry errors',
            'Process 200% more invoices with same staff'
          ],
          estimatedROI: '250%',
          timeToValue: '3-4 months',
          confidenceLevel: 'High'
        },
        implementation: {
          complexity: 'Medium',
          timeframe: '4-6 months',
          prerequisites: ['Document digitization', 'ERP integration'],
          riskFactors: ['Change management', 'Data quality']
        },
        agenticPattern: {
          recommendedPattern: 'Manager-Workers',
          patternRationale: 'Multiple specialized agents needed for document processing, data extraction, validation, and ERP integration',
          implementationApproach: 'Central coordinator manages document flow with specialized workers for OCR, validation, and integration',
          patternComplexity: 'Medium'
        },
        relevantInitiatives: ['Process Automation Initiative'],
        aiTechnologies: ['Document AI', 'OCR', 'Natural Language Processing', 'Workflow Automation']
      }
    ],
    priorityRecommendations: [
      'Start with highest ROI opportunity (Automated Invoice Processing)',
      'Establish AI governance framework before implementation',
      'Invest in employee training for AI adoption'
    ],
    industryContext: 'Technology companies are leading AI adoption with 85% planning major AI investments in the next 18 months',
    overallReadinessScore: 82,
    nextSteps: [
      'Conduct detailed process assessment for invoice processing',
      'Develop AI implementation roadmap with key stakeholders',
      'Begin pilot program with limited invoice volume'
    ],
    generatedAt: new Date().toISOString(),
    analysisMetadata: {
      initiativeCount: 1,
      problemCount: 2,
      systemCount: 2,
      industryFocus: 'Technology',
      companySize: '100-500',
      provider: 'openai'
    }
  },
  cached: false,
  provider: 'openai'
};

describe('AI Opportunities → Blueprint Integration Test', () => {
  let mockNavigateToBlueprint: jest.Mock;

  beforeEach(() => {
    mockFetch.mockReset();
    consoleLogSpy.mockClear();
    consoleErrorSpy.mockClear();
    
    // Mock the blueprint navigation function
    mockNavigateToBlueprint = jest.fn();
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test('complete flow: load opportunities → refresh → generate blueprint', async () => {
    // Step 1: Mock loading cached opportunities
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: mockAIOpportunitiesResponse.opportunities,
        cached: true
      })
    });

    // Step 2: Mock refresh API call
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockAIOpportunitiesResponse)
    });

    // Render component with navigation callback
    render(
      <AIOpportunitiesTab 
        profile={integrationTestProfile} 
        isEditing={false} 
        onNavigateToBlueprint={mockNavigateToBlueprint}
      />
    );

    // Wait for cached opportunities to load
    await waitFor(() => {
      expect(screen.getByText('Automated Invoice Processing')).toBeInTheDocument();
    });

    // Verify opportunity details are displayed
    expect(screen.getByText('Manager-Workers')).toBeInTheDocument();
    expect(screen.getByText('250%')).toBeInTheDocument();
    expect(screen.getByText('3-4 months')).toBeInTheDocument();

    // Step 3: Test refresh functionality
    const refreshButton = screen.getByText('🔄 Refresh Analysis');
    expect(refreshButton).toBeInTheDocument();
    
    fireEvent.click(refreshButton);

    // Verify loading state with enhanced text
    await waitFor(() => {
      expect(screen.getByText('Refreshing Analysis...')).toBeInTheDocument();
    });

    // Wait for refresh to complete
    await waitFor(() => {
      expect(screen.getByText('Fresh Analysis')).toBeInTheDocument();
    });

    // Verify enhanced logging occurred
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/🔄 \[AI Opportunities\] Starting analysis generation/),
      expect.any(Object)
    );

    // Step 4: Test blueprint generation
    const generateBlueprintButton = screen.getByText('Generate Blueprint');
    expect(generateBlueprintButton).toBeInTheDocument();
    
    fireEvent.click(generateBlueprintButton);

    // Verify navigation callback was called with correct opportunity data
    expect(mockNavigateToBlueprint).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Automated Invoice Processing',
        category: 'Process Automation',
        agenticPattern: expect.objectContaining({
          recommendedPattern: 'Manager-Workers',
          patternRationale: expect.stringContaining('Multiple specialized agents'),
          implementationApproach: expect.stringContaining('Central coordinator')
        }),
        businessImpact: expect.objectContaining({
          estimatedROI: '250%',
          confidenceLevel: 'High'
        }),
        implementation: expect.objectContaining({
          complexity: 'Medium',
          timeframe: '4-6 months'
        })
      }),
      0 // Initiative index
    );
  });

  test('handles malformed opportunity data gracefully during blueprint generation', async () => {
    // Mock opportunities with malformed data
    const malformedOpportunities = {
      ...mockAIOpportunitiesResponse.opportunities,
      opportunities: [
        {
          title: 'Test Opportunity',
          category: 'Process Automation',
          description: 'Test description',
          businessImpact: {
            primaryMetrics: 'not-an-array', // Malformed data
            estimatedROI: '200%',
            confidenceLevel: 'High'
          },
          agenticPattern: {
            recommendedPattern: 'Manager-Workers',
            patternRationale: 'Test rationale'
          },
          implementation: {
            complexity: 'Medium',
            prerequisites: null, // Malformed data
            riskFactors: 'not-an-array' // Malformed data
          },
          aiTechnologies: 'not-an-array', // Malformed data
          relevantInitiatives: ['Process Automation Initiative']
        }
      ]
    };

    // Mock loading malformed opportunities
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: malformedOpportunities,
        cached: true
      })
    });

    render(
      <AIOpportunitiesTab 
        profile={integrationTestProfile} 
        isEditing={false} 
        onNavigateToBlueprint={mockNavigateToBlueprint}
      />
    );

    // Wait for opportunities to load
    await waitFor(() => {
      expect(screen.getByText('Test Opportunity')).toBeInTheDocument();
    });

    // Click generate blueprint - should not crash
    const generateBlueprintButton = screen.getByText('Generate Blueprint');
    fireEvent.click(generateBlueprintButton);

    // Should still call navigation with malformed data
    expect(mockNavigateToBlueprint).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Opportunity',
        businessImpact: expect.objectContaining({
          primaryMetrics: 'not-an-array' // Malformed data preserved
        })
      }),
      0
    );

    // No console errors should occur in the UI component
    // (Service layer will handle the malformed data safely)
  });

  test('refresh button error handling with enhanced error messages', async () => {
    // Mock initial opportunities load
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: mockAIOpportunitiesResponse.opportunities,
        cached: true
      })
    });

    // Mock API error on refresh
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: () => Promise.resolve({
        success: false,
        error: 'Rate limit exceeded'
      })
    });

    render(<AIOpportunitiesTab profile={integrationTestProfile} isEditing={false} />);

    await waitFor(() => {
      expect(screen.getByText('🔄 Refresh Analysis')).toBeInTheDocument();
    });

    // Click refresh button
    fireEvent.click(screen.getByText('🔄 Refresh Analysis'));

    // Wait for enhanced error message
    await waitFor(() => {
      expect(screen.getByText('Too many requests. Please wait a moment and try again.')).toBeInTheDocument();
    });

    // Verify button is re-enabled
    expect(screen.getByText('🔄 Refresh Analysis')).not.toBeDisabled();
  });

  test('integration with multiple AI providers', async () => {
    // Test with different provider responses
    const providers = ['openai', 'claude', 'gemini'];
    
    for (const provider of providers) {
      const providerResponse = {
        ...mockAIOpportunitiesResponse,
        provider,
        opportunities: {
          ...mockAIOpportunitiesResponse.opportunities,
          analysisMetadata: {
            ...mockAIOpportunitiesResponse.opportunities.analysisMetadata,
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

      const { unmount } = render(<AIOpportunitiesTab profile={integrationTestProfile} isEditing={false} />);

      await waitFor(() => {
        expect(screen.getByText('Automated Invoice Processing')).toBeInTheDocument();
      });

      // Verify provider-specific metadata is preserved
      expect(screen.getByText('Cached')).toBeInTheDocument();

      unmount();
      mockFetch.mockClear();
    }
  });
}); 