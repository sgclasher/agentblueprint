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

// Mock console methods to avoid test noise
const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

// Sample profile for testing
const mockProfile: Profile = {
  id: 'test-profile-id',
  companyName: 'Test Company',
  industry: 'Technology',
  employeeCount: '100-500',
  annualRevenue: '$10M-$50M',
  strategicInitiatives: [
    {
      initiative: 'Digital Transformation',
      businessProblems: ['Manual processes slow us down'],
      contact: {
        name: 'John Doe',
        title: 'CTO',
        email: 'john.doe@test.com',
        linkedin: '',
        phone: ''
      },
      expectedOutcomes: ['Automate key workflows'],
      successMetrics: ['Reduce processing time by 50%'],
      targetTimeline: '6 months',
      estimatedBudget: '$100k',
      priority: 'High',
      status: 'Planning'
    }
  ],
  systemsAndApplications: [
    { name: 'CRM System', category: 'Customer Management' },
    { name: 'ERP System', category: 'Enterprise Resource Planning' }
  ]
};

// Mock successful AI opportunities response
const mockOpportunitiesResponse = {
  success: true,
  opportunities: {
    executiveSummary: 'Your company shows strong potential for AI adoption...',
    opportunities: [
      {
        title: 'Automated Document Processing',
        description: 'Streamline document processing workflows',
        category: 'Process Automation',
        businessImpact: {
          primaryMetrics: ['Reduce processing time by 60%'],
          estimatedROI: '250%',
          timeToValue: '3-4 months',
          confidenceLevel: 'High' as const
        },
        implementation: {
          complexity: 'Medium' as const,
          timeframe: '4-6 months',
          prerequisites: ['Document digitization'],
          riskFactors: ['Change management']
        },
        agenticPattern: {
          recommendedPattern: 'Manager-Workers',
          patternRationale: 'Multiple specialized agents needed',
          implementationApproach: 'Coordinated agent workflow',
          patternComplexity: 'Medium' as const
        },
        relevantInitiatives: ['Digital Transformation'],
        aiTechnologies: ['NLP', 'Document AI']
      }
    ],
    priorityRecommendations: ['Start with highest ROI opportunity'],
    industryContext: 'Technology companies lead AI adoption',
    overallReadinessScore: 75,
    nextSteps: ['Conduct readiness assessment'],
    generatedAt: new Date().toISOString(),
    analysisMetadata: {
      initiativeCount: 1,
      problemCount: 1,
      systemCount: 2,
      industryFocus: 'Technology',
      companySize: '100-500',
      provider: 'openai'
    }
  },
  cached: false,
  provider: 'openai'
};

describe('AI Opportunities Refresh Button', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    mockFetch.mockReset();
    consoleSpy.mockClear();
    consoleLogSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  test('should render refresh button when opportunities exist', async () => {
    // Mock successful GET request (load cached)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: mockOpportunitiesResponse.opportunities,
        cached: true
      })
    });

    render(<AIOpportunitiesTab profile={mockProfile} isEditing={false} />);

    // Wait for cached opportunities to load
    await waitFor(() => {
      expect(screen.getByText('Refresh Analysis')).toBeInTheDocument();
    });

    // Verify the button exists and has correct text
    const refreshButton = screen.getByText('Refresh Analysis');
    expect(refreshButton).toBeInTheDocument();
    expect(refreshButton).not.toBeDisabled();
  });

  test('should call API when refresh button is clicked', async () => {
    // Mock successful GET request (load cached)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: mockOpportunitiesResponse.opportunities,
        cached: true
      })
    });

    // Mock successful POST request (refresh)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockOpportunitiesResponse)
    });

    render(<AIOpportunitiesTab profile={mockProfile} isEditing={false} />);

    // Wait for cached opportunities to load
    await waitFor(() => {
      expect(screen.getByText('Refresh Analysis')).toBeInTheDocument();
    });

    // Click the refresh button
    const refreshButton = screen.getByText('Refresh Analysis');
    fireEvent.click(refreshButton);

    // Verify POST API call was made
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/profiles/analyze-opportunities', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer mock-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          preferredProvider: undefined,
          forceRegenerate: false
        }),
        credentials: 'same-origin'
      });
    });
  });

  test('should show loading state during refresh', async () => {
    // Mock successful GET request (load cached)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: mockOpportunitiesResponse.opportunities,
        cached: true
      })
    });

    // Mock delayed POST request (refresh)
    mockFetch.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => 
        resolve({
          ok: true,
          json: () => Promise.resolve(mockOpportunitiesResponse)
        }), 100))
    );

    render(<AIOpportunitiesTab profile={mockProfile} isEditing={false} />);

    // Wait for cached opportunities to load
    await waitFor(() => {
      expect(screen.getByText('Refresh Analysis')).toBeInTheDocument();
    });

    // Click the refresh button
    const refreshButton = screen.getByText('Refresh Analysis');
    fireEvent.click(refreshButton);

    // Check loading state
    await waitFor(() => {
      expect(screen.getByText('Analyzing...')).toBeInTheDocument();
    });

    // Check button is disabled during loading
    const loadingButton = screen.getByText('Analyzing...');
    expect(loadingButton).toBeDisabled();

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Refresh Analysis')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  test('should handle API errors gracefully', async () => {
    // Mock successful GET request (load cached)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: mockOpportunitiesResponse.opportunities,
        cached: true
      })
    });

    // Mock failed POST request (refresh)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: () => Promise.resolve({
        success: false,
        error: 'Server error occurred'
      })
    });

    render(<AIOpportunitiesTab profile={mockProfile} isEditing={false} />);

    // Wait for cached opportunities to load
    await waitFor(() => {
      expect(screen.getByText('Refresh Analysis')).toBeInTheDocument();
    });

    // Click the refresh button
    const refreshButton = screen.getByText('Refresh Analysis');
    fireEvent.click(refreshButton);

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText(/Server error occurred/)).toBeInTheDocument();
    });

    // Verify button is re-enabled after error
    expect(screen.getByText('Refresh Analysis')).not.toBeDisabled();
  });

  test('should handle network errors', async () => {
    // Mock successful GET request (load cached)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: mockOpportunitiesResponse.opportunities,
        cached: true
      })
    });

    // Mock network error on POST request
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<AIOpportunitiesTab profile={mockProfile} isEditing={false} />);

    // Wait for cached opportunities to load
    await waitFor(() => {
      expect(screen.getByText('Refresh Analysis')).toBeInTheDocument();
    });

    // Click the refresh button
    const refreshButton = screen.getByText('Refresh Analysis');
    fireEvent.click(refreshButton);

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });

    // Verify button is re-enabled after error
    expect(screen.getByText('Refresh Analysis')).not.toBeDisabled();
  });

  test('should validate profile before making API call', async () => {
    const incompleteProfile = { ...mockProfile, companyName: '' };

    render(<AIOpportunitiesTab profile={incompleteProfile} isEditing={false} />);

    // Wait for component to load
    await waitFor(() => {
      expect(screen.getByText('🤖 Generate Analysis')).toBeInTheDocument();
    });

    // Click the generate button (since no opportunities exist yet)
    const generateButton = screen.getByText('🤖 Generate Analysis');
    fireEvent.click(generateButton);

    // Wait for validation error
    await waitFor(() => {
      expect(screen.getByText(/Profile is incomplete/)).toBeInTheDocument();
    });

    // Verify no API call was made
    expect(mockFetch).not.toHaveBeenCalledWith('/api/profiles/analyze-opportunities', expect.objectContaining({
      method: 'POST'
    }));
  });

  test('should update opportunities data after successful refresh', async () => {
    // Mock successful GET request (load cached)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: {
          ...mockOpportunitiesResponse.opportunities,
          executiveSummary: 'Original cached summary'
        },
        cached: true
      })
    });

    // Mock successful POST request (refresh) with updated data
    const updatedResponse = {
      ...mockOpportunitiesResponse,
      opportunities: {
        ...mockOpportunitiesResponse.opportunities,
        executiveSummary: 'Updated fresh summary after refresh'
      }
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(updatedResponse)
    });

    render(<AIOpportunitiesTab profile={mockProfile} isEditing={false} />);

    // Wait for cached opportunities to load
    await waitFor(() => {
      expect(screen.getByText('Original cached summary')).toBeInTheDocument();
    });

    // Click the refresh button
    const refreshButton = screen.getByText('Refresh Analysis');
    fireEvent.click(refreshButton);

    // Wait for updated content to appear
    await waitFor(() => {
      expect(screen.getByText('Updated fresh summary after refresh')).toBeInTheDocument();
    });

    // Verify the cached indicator changed to fresh
    expect(screen.getByText('Fresh Analysis')).toBeInTheDocument();
  });
}); 