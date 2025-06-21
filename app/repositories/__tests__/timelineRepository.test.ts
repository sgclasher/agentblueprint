/**
 * Tests for ProfileRepository Timeline Methods
 * Tests the updated timeline caching functionality
 */

import { ProfileRepository } from '../profileRepository';
import { supabase } from '../../lib/supabase';

// Mock Supabase
jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
    rpc: jest.fn()
  }
}));

const mockSupabase = supabase as jest.Mocked<typeof supabase>;

describe('ProfileRepository Timeline Methods', () => {
  const testUserId = 'test-user-id';
  const mockTimelineData = {
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
    scenarioType: 'balanced'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCachedTimeline', () => {
    it('should return cached timeline with metadata', async () => {
      const mockData = {
        timeline_data: mockTimelineData,
        last_timeline_generated_at: '2025-01-15T10:00:00Z'
      };

      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockData,
              error: null
            })
          })
        })
      } as any);

      const result = await ProfileRepository.getCachedTimeline(testUserId);

      expect(result).toEqual({
        ...mockTimelineData,
        _cached: true,
        _generatedAt: '2025-01-15T10:00:00Z',
        _scenarioType: 'balanced'
      });

      expect(mockSupabase.from).toHaveBeenCalledWith('profiles');
    });

    it('should return null when no timeline exists', async () => {
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { timeline_data: null },
              error: null
            })
          })
        })
      } as any);

      const result = await ProfileRepository.getCachedTimeline(testUserId);

      expect(result).toBeNull();
    });

    it('should return null when user not found', async () => {
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: null,
              error: { code: 'PGRST116' } // Not found error
            })
          })
        })
      } as any);

      const result = await ProfileRepository.getCachedTimeline(testUserId);

      expect(result).toBeNull();
    });

    it('should handle database errors gracefully', async () => {
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: null,
              error: { code: 'PGRST301', message: 'Database error' }
            })
          })
        })
      } as any);

      const result = await ProfileRepository.getCachedTimeline(testUserId);

      expect(result).toBeNull();
    });

    it('should warn and return null for missing userId', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      const result = await ProfileRepository.getCachedTimeline('');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('⚠️ No userId provided to getCachedTimeline');
      
      consoleSpy.mockRestore();
    });
  });

  describe('saveTimeline', () => {
    it('should save timeline with metadata', async () => {
      const timelineWithMetadata = {
        ...mockTimelineData,
        _cached: true,
        _generatedAt: '2025-01-15T10:00:00Z',
        _scenarioType: 'balanced'
      };

      mockSupabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({
            error: null
          })
        })
      } as any);

      const result = await ProfileRepository.saveTimeline(testUserId, timelineWithMetadata);

      expect(result).toBe(true);
      expect(mockSupabase.from).toHaveBeenCalledWith('profiles');

      // Verify that metadata fields are stripped from timeline data
      const updateCall = mockSupabase.from.mock.results[0].value.update.mock.calls[0][0];
      expect(updateCall.timeline_data).toEqual(mockTimelineData);
      expect(updateCall.last_timeline_generated_at).toBeDefined();
      expect(updateCall.updated_at).toBeDefined();
    });

    it('should handle save errors', async () => {
      mockSupabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({
            error: { message: 'Save failed' }
          })
        })
      } as any);

      await expect(ProfileRepository.saveTimeline(testUserId, mockTimelineData))
        .rejects.toThrow('Failed to save timeline to database.');
    });

    it('should require userId', async () => {
      await expect(ProfileRepository.saveTimeline('', mockTimelineData))
        .rejects.toThrow('User authentication is required to save timeline.');
    });
  });

  describe('clearTimelineCache', () => {
    it('should clear timeline cache successfully', async () => {
      mockSupabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({
            error: null
          })
        })
      } as any);

      const result = await ProfileRepository.clearTimelineCache(testUserId);

      expect(result).toBe(true);

      const updateCall = mockSupabase.from.mock.results[0].value.update.mock.calls[0][0];
      expect(updateCall.timeline_data).toBeNull();
      expect(updateCall.last_timeline_generated_at).toBeNull();
    });

    it('should handle clear errors', async () => {
      mockSupabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockResolvedValue({
            error: { message: 'Clear failed' }
          })
        })
      } as any);

      await expect(ProfileRepository.clearTimelineCache(testUserId))
        .rejects.toThrow('Failed to clear timeline cache.');
    });
  });

  describe('getTimelineMetadata', () => {
    it('should return timeline metadata', async () => {
      const mockMetadata = {
        has_timeline: true,
        generated_at: '2025-01-15T10:00:00Z',
        scenario_type: 'balanced',
        cache_age_minutes: 30
      };

      mockSupabase.rpc.mockResolvedValue({
        data: [mockMetadata],
        error: null
      } as any);

      const result = await ProfileRepository.getTimelineMetadata(testUserId);

      expect(result).toEqual(mockMetadata);
      expect(mockSupabase.rpc).toHaveBeenCalledWith('get_timeline_metadata', {
        user_uuid: testUserId
      });
    });

    it('should return null when RPC fails', async () => {
      mockSupabase.rpc.mockResolvedValue({
        data: null,
        error: { message: 'RPC failed' } as any
      } as any);

      const result = await ProfileRepository.getTimelineMetadata(testUserId);

      expect(result).toBeNull();
    });

    it('should return null for missing userId', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      const result = await ProfileRepository.getTimelineMetadata('');

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('⚠️ No userId provided to getTimelineMetadata');
      
      consoleSpy.mockRestore();
    });
  });

  describe('hasTimelineForScenario', () => {
    it('should return true when timeline exists for scenario', async () => {
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                timeline_data: { scenarioType: 'balanced' }
              },
              error: null
            })
          })
        })
      } as any);

      const result = await ProfileRepository.hasTimelineForScenario(testUserId, 'balanced');

      expect(result).toBe(true);
    });

    it('should return false when scenario does not match', async () => {
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: {
                timeline_data: { scenarioType: 'conservative' }
              },
              error: null
            })
          })
        })
      } as any);

      const result = await ProfileRepository.hasTimelineForScenario(testUserId, 'aggressive');

      expect(result).toBe(false);
    });

    it('should return false when no timeline exists', async () => {
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: { timeline_data: null },
              error: null
            })
          })
        })
      } as any);

      const result = await ProfileRepository.hasTimelineForScenario(testUserId, 'balanced');

      expect(result).toBe(false);
    });

    it('should return false for missing userId', async () => {
      const result = await ProfileRepository.hasTimelineForScenario('', 'balanced');

      expect(result).toBe(false);
    });

    it('should handle database errors gracefully', async () => {
      mockSupabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockRejectedValue(new Error('Database error'))
          })
        })
      } as any);

      const result = await ProfileRepository.hasTimelineForScenario(testUserId, 'balanced');

      expect(result).toBe(false);
    });
  });
}); 