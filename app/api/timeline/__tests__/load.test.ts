/**
 * Tests for Timeline Load API
 * Tests the new cached timeline loading functionality
 */

import { NextRequest } from 'next/server';
import { GET, POST } from '../load/route';
import { ProfileRepository } from '../../../repositories/profileRepository';
import { getUser } from '../../../lib/supabase';

// Mock dependencies
jest.mock('../../../repositories/profileRepository');
jest.mock('../../../lib/supabase');

const mockProfileRepository = ProfileRepository as jest.Mocked<typeof ProfileRepository>;
const mockGetUser = getUser as jest.MockedFunction<typeof getUser>;

describe('/api/timeline/load', () => {
  const mockUser = {
    id: 'test-user-id',
    email: 'test@example.com',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: '2025-01-01T00:00:00Z'
  } as any;

  const mockCachedTimeline = {
    currentState: { description: 'Current state', highlights: [] },
    phases: [
      {
        title: 'Phase 1',
        description: 'First phase',
        initiatives: [],
        technologies: [],
        outcomes: [],
        highlights: []
      }
    ],
    futureState: { description: 'Future state', highlights: [] },
    summary: {
      totalInvestment: '$100k',
      expectedROI: '200%',
      timeToValue: '6 months',
      riskLevel: 'Medium'
    },
    _cached: true,
    _generatedAt: '2025-01-15T10:00:00Z',
    _scenarioType: 'balanced'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetUser.mockResolvedValue(mockUser);
  });

  describe('GET /api/timeline/load', () => {
    it('should return cached timeline when available', async () => {
      mockProfileRepository.getCachedTimeline.mockResolvedValue(mockCachedTimeline);

      const request = new NextRequest('http://localhost:3000/api/timeline/load?scenarioType=balanced');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.timeline).toEqual(mockCachedTimeline);
      expect(data.cached).toBe(true);
      expect(data.method).toBe('Cached Load');
      expect(mockProfileRepository.getCachedTimeline).toHaveBeenCalledWith('test-user-id');
    });

    it('should return null when no cached timeline exists', async () => {
      mockProfileRepository.getCachedTimeline.mockResolvedValue(null);

      const request = new NextRequest('http://localhost:3000/api/timeline/load');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.timeline).toBe(null);
      expect(data.cached).toBe(false);
      expect(data.message).toBe('No cached timeline found');
    });

    it('should handle scenario mismatch', async () => {
      const conservativeTimeline = {
        ...mockCachedTimeline,
        _scenarioType: 'conservative'
      };
      mockProfileRepository.getCachedTimeline.mockResolvedValue(conservativeTimeline);

      const request = new NextRequest('http://localhost:3000/api/timeline/load?scenarioType=aggressive');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.timeline).toBe(null);
      expect(data.cached).toBe(false);
      expect(data.scenarioMismatch).toBe(true);
      expect(data.cachedScenario).toBe('conservative');
      expect(data.requestedScenario).toBe('aggressive');
    });

    it('should include metadata when requested', async () => {
      const mockMetadata = {
        has_timeline: true,
        generated_at: '2025-01-15T10:00:00Z',
        scenario_type: 'balanced',
        cache_age_minutes: 30
      };

      mockProfileRepository.getCachedTimeline.mockResolvedValue(mockCachedTimeline);
      mockProfileRepository.getTimelineMetadata.mockResolvedValue(mockMetadata);

      const request = new NextRequest('http://localhost:3000/api/timeline/load?includeMetadata=true');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.metadata).toEqual(mockMetadata);
      expect(mockProfileRepository.getTimelineMetadata).toHaveBeenCalledWith('test-user-id');
    });

    it('should require authentication', async () => {
      mockGetUser.mockResolvedValue(null);

      const request = new NextRequest('http://localhost:3000/api/timeline/load');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.error).toBe('Authentication required');
    });

    it('should handle repository errors gracefully', async () => {
      mockProfileRepository.getCachedTimeline.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/timeline/load');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to load timeline from cache');
      expect(data.details).toBe('Database error');
    });
  });

  describe('POST /api/timeline/load', () => {
    it('should load cached timeline with POST request', async () => {
      mockProfileRepository.getCachedTimeline.mockResolvedValue(mockCachedTimeline);

      const request = new NextRequest('http://localhost:3000/api/timeline/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioType: 'balanced', includeMetadata: false })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.timeline).toEqual(mockCachedTimeline);
      expect(data.method).toBe('Cached Load (POST)');
    });

    it('should handle forceRefresh request', async () => {
      const request = new NextRequest('http://localhost:3000/api/timeline/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forceRefresh: true })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(false);
      expect(data.shouldRegenerate).toBe(true);
      expect(data.message).toBe('Force refresh requested, use generation API');
    });

    it('should handle invalid JSON in POST body', async () => {
      const request = new NextRequest('http://localhost:3000/api/timeline/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid JSON in request body');
    });

    it('should use default values for missing parameters', async () => {
      mockProfileRepository.getCachedTimeline.mockResolvedValue(mockCachedTimeline);

      const request = new NextRequest('http://localhost:3000/api/timeline/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}) // Empty body
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.scenarioType).toBe('balanced'); // Default value used
    });
  });

  describe('Error Handling', () => {
    it('should handle authentication errors in GET', async () => {
      mockGetUser.mockRejectedValue(new Error('Auth service unavailable'));

      const request = new NextRequest('http://localhost:3000/api/timeline/load');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
      expect(data.details).toBe('Auth service unavailable');
    });

    it('should handle authentication errors in POST', async () => {
      mockGetUser.mockRejectedValue(new Error('Auth service unavailable'));

      const request = new NextRequest('http://localhost:3000/api/timeline/load', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
      expect(data.details).toBe('Auth service unavailable');
    });
  });
}); 