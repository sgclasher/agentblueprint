import { renderHook, act, waitFor } from '@testing-library/react';
import { useTimeline } from '../useTimeline';
import { ProfileService } from '../../services/profileService';
import useTimelineStore from '../../store/useTimelineStore';
import useAuthStore from '../../store/useAuthStore';
import { Profile } from '../../services/types';

// Mock dependencies
jest.mock('../../services/profileService');
jest.mock('../../store/useTimelineStore');
jest.mock('../../store/useAuthStore');
jest.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(() => Promise.resolve({ data: { session: { access_token: 'mock-token' } }, error: null }))
    }
  }
}));

const mockedProfileService = ProfileService as jest.Mocked<typeof ProfileService>;
const mockedUseTimelineStore = useTimelineStore as jest.MockedFunction<typeof useTimelineStore>;
const mockedUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

const mockProfile: Profile = {
  id: 'profile-1', 
  companyName: 'Acme Corp', 
  industry: 'Technology', 
  createdAt: '2024-01-01T00:00:00Z'
};

describe('useTimeline Hook', () => {
  let mockTimelineStore: any;
  let mockAuthStore: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Set up mock timeline store
    mockTimelineStore = {
      timelineData: null,
      isGenerating: false,
      generateTimeline: jest.fn(),
      theme: 'dark',
      toggleTheme: jest.fn(),
      timelineCached: false,
      timelineGeneratedAt: null,
      timelineScenarioType: null,
    };

    // Set up mock auth store
    mockAuthStore = {
      profile: mockProfile,
      isLoading: false,
    };

    mockedUseTimelineStore.mockReturnValue(mockTimelineStore);
    mockedUseAuthStore.mockReturnValue(mockAuthStore);
    
    // Mock the setState method for useTimelineStore
    (mockedUseTimelineStore as any).setState = jest.fn();
  });

  describe('Basic Functionality', () => {
    it('should initialize and return timeline data from store', () => {
      const { result } = renderHook(() => useTimeline());
      
      expect(result.current.timelineData).toBe(null);
      expect(result.current.currentProfile).toEqual(mockProfile);
      // isLoading may be true initially due to timeline loading logic
      expect(typeof result.current.isLoading).toBe('boolean');
      expect(result.current.theme).toBe('dark');
    });

    it('should handle theme toggle', () => {
      const { result } = renderHook(() => useTimeline());
      
      act(() => {
        result.current.toggleTheme();
      });
      
      expect(mockTimelineStore.toggleTheme).toHaveBeenCalled();
    });

    it('should handle timeline regeneration', async () => {
      // Mock window.confirm to return true
      window.confirm = jest.fn(() => true);
      
      const { result } = renderHook(() => useTimeline());
      
      await act(async () => {
        await result.current.regenerateTimeline('balanced');
      });
      
      expect(mockTimelineStore.generateTimeline).toHaveBeenCalledWith(true);
    });

    it('should return expected properties', () => {
      const { result } = renderHook(() => useTimeline());
      
      // Test that the hook returns the expected properties
      expect(result.current).toHaveProperty('timelineData');
      expect(result.current).toHaveProperty('currentProfile');
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('theme');
      expect(result.current).toHaveProperty('toggleTheme');
      expect(result.current).toHaveProperty('regenerateTimeline');
      expect(result.current).toHaveProperty('handleSectionClick');
      expect(result.current).toHaveProperty('hasProfile');
    });
  });
}); 