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

// Mock console to track logging
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

// Simple test profile
const testProfile: Profile = {
  id: 'test-id',
  companyName: 'Test Company',
  industry: 'Technology',
  strategicInitiatives: [
    {
      initiative: 'Test Initiative',
      businessProblems: ['Test problem'],
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

describe('Enhanced AI Opportunities Refresh Test', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    consoleLogSpy.mockClear();
    consoleErrorSpy.mockClear();
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test('refresh button should trigger API call with enhanced logging', async () => {
    // Mock cached opportunities first
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: {
          executiveSummary: 'Test summary',
          opportunities: [],
          priorityRecommendations: [],
          nextSteps: [],
          overallReadinessScore: 75,
          generatedAt: new Date().toISOString(),
          analysisMetadata: {
            initiativeCount: 1,
            systemCount: 1,
            industryFocus: 'Technology',
            companySize: 'Medium'
          }
        },
        cached: true
      })
    });

    // Mock refresh API call
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        opportunities: {
          executiveSummary: 'Refreshed summary',
          opportunities: [],
          priorityRecommendations: [],
          nextSteps: [],
          overallReadinessScore: 80,
          generatedAt: new Date().toISOString(),
          analysisMetadata: {
            initiativeCount: 1,
            systemCount: 1,
            industryFocus: 'Technology',
            companySize: 'Medium',
            provider: 'openai'
          }
        },
        cached: false,
        provider: 'openai'
      })
    });

    render(<AIOpportunitiesTab profile={testProfile} isEditing={false} />);

    // Wait for cached opportunities to load
    await waitFor(() => {
      expect(screen.getByText('🔄 Refresh Analysis')).toBeInTheDocument();
    });

    // Click refresh button
    const refreshButton = screen.getByText('🔄 Refresh Analysis');
    fireEvent.click(refreshButton);

    // Check that enhanced logging occurred
    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringMatching(/🔄 \[AI Opportunities\] Starting analysis generation/),
        expect.any(Object)
      );
    });

    // Check loading state with enhanced text
    expect(screen.getByText('Refreshing Analysis...')).toBeInTheDocument();

    // Wait for completion
    await waitFor(() => {
      expect(screen.getByText('🔄 Refresh Analysis')).toBeInTheDocument();
    });

    // Verify API was called correctly
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

    // Verify success logging
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringMatching(/🎉 \[AI Opportunities\] Analysis updated successfully/)
    );
  });

  test('should handle API errors with enhanced error messages', async () => {
    // Mock cached opportunities first
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: { executiveSummary: 'Test', opportunities: [], priorityRecommendations: [], nextSteps: [], overallReadinessScore: 75, generatedAt: new Date().toISOString(), analysisMetadata: {} },
        cached: true
      })
    });

    // Mock API error
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

    // Click refresh button
    fireEvent.click(screen.getByText('🔄 Refresh Analysis'));

    // Wait for enhanced error message
    await waitFor(() => {
      expect(screen.getByText('Authentication expired. Please refresh the page and sign in again.')).toBeInTheDocument();
    });

    // Verify error logging
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringMatching(/❌ \[AI Opportunities\] API error/),
      expect.any(Object)
    );
  });

  test('should show "Fresh Analysis" status after successful refresh', async () => {
    // Mock cached opportunities first
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        hasOpportunities: true,
        opportunities: { executiveSummary: 'Cached', opportunities: [], priorityRecommendations: [], nextSteps: [], overallReadinessScore: 75, generatedAt: new Date().toISOString(), analysisMetadata: {} },
        cached: true
      })
    });

    // Mock successful refresh
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        opportunities: { executiveSummary: 'Fresh', opportunities: [], priorityRecommendations: [], nextSteps: [], overallReadinessScore: 80, generatedAt: new Date().toISOString(), analysisMetadata: {} },
        cached: false,
        provider: 'openai'
      })
    });

    render(<AIOpportunitiesTab profile={testProfile} isEditing={false} />);

    await waitFor(() => {
      expect(screen.getByText('Cached')).toBeInTheDocument();
    });

    // Click refresh
    fireEvent.click(screen.getByText('🔄 Refresh Analysis'));

    // Wait for fresh analysis
    await waitFor(() => {
      expect(screen.getByText('Fresh Analysis')).toBeInTheDocument();
      expect(screen.getByText(/Updated at \d{1,2}:\d{2}:\d{2}/)).toBeInTheDocument();
    });
  });
}); 