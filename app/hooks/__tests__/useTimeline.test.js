import { renderHook, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTimeline } from '../useTimeline';
import { ProfileService } from '../../services/profileService';
import useBusinessProfileStore from '../../store/useBusinessProfileStore';

// Mock dependencies
jest.mock('../../services/profileService', () => ({
  ProfileService: {
    getProfiles: jest.fn(),
    getProfile: jest.fn()
  }
}));

jest.mock('../../store/useBusinessProfileStore');

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => ({
    get: jest.fn()
  }))
}));

// Mock next/navigation
const mockUseSearchParams = require('next/navigation').useSearchParams;

const mockProfiles = [
  {
    id: 'profile-1',
    companyName: 'Acme Corp',
    industry: 'Technology',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'profile-2',
    companyName: 'Wellspring Health', 
    industry: 'Healthcare',
    createdAt: '2024-01-02T00:00:00Z'
  }
];

const mockStoreState = {
  businessProfile: {},
  timelineData: null,
  isGenerating: false,
  generateTimelineFromProfile: jest.fn(),
  regenerateTimelineFromProfile: jest.fn(),
  hasValidProfile: jest.fn(() => false),
  theme: 'dark',
  toggleTheme: jest.fn(),
  timelineCached: false,
  timelineGeneratedAt: null,
  timelineScenarioType: null
};

describe('useTimeline Hook - Profile Selection Features', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    ProfileService.getProfiles.mockResolvedValue(mockProfiles);
    ProfileService.getProfile.mockResolvedValue(mockProfiles[0]);
    
    useBusinessProfileStore.mockReturnValue(mockStoreState);
    
    mockUseSearchParams.mockReturnValue({
      get: jest.fn(() => null)
    });
  });

  describe('Profile Loading', () => {
    it('loads available profiles on hook initialization', async () => {
      const { result } = renderHook(() => useTimeline());

      await waitFor(() => {
        expect(ProfileService.getProfiles).toHaveBeenCalledTimes(1);
      });

      expect(result.current.availableProfiles).toEqual(mockProfiles);
      expect(result.current.isLoadingProfiles).toBe(false);
    });

    it('handles profile loading errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      ProfileService.getProfiles.mockRejectedValue(new Error('Failed to load profiles'));

      const { result } = renderHook(() => useTimeline());

      await waitFor(() => {
        expect(result.current.isLoadingProfiles).toBe(false);
      });

      expect(result.current.availableProfiles).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading profiles for selector:', expect.any(Error));
      
      consoleErrorSpy.mockRestore();
    });

    it('shows loading state while fetching profiles', async () => {
      ProfileService.getProfiles.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve(mockProfiles), 100))
      );

      const { result } = renderHook(() => useTimeline());

      expect(result.current.isLoadingProfiles).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoadingProfiles).toBe(false);
      });

      expect(result.current.availableProfiles).toEqual(mockProfiles);
    });
  });

  describe('Profile Selection', () => {
    it('handles profile selection correctly', async () => {
      const { result } = renderHook(() => useTimeline());

      await waitFor(() => {
        expect(result.current.availableProfiles).toEqual(mockProfiles);
      });

      const selectedProfile = mockProfiles[0];

      await act(async () => {
        await result.current.handleProfileSelect(selectedProfile);
      });

      expect(result.current.selectedProfileId).toBe(selectedProfile.id);
      expect(result.current.currentProfile).toBe(selectedProfile);
      expect(mockStoreState.generateTimelineFromProfile).toHaveBeenCalledWith(selectedProfile);
    });

    it('handles profile deselection (null selection)', async () => {
      const { result } = renderHook(() => useTimeline());

      await waitFor(() => {
        expect(result.current.availableProfiles).toEqual(mockProfiles);
      });

      await act(async () => {
        await result.current.handleProfileSelect(null);
      });

      expect(result.current.selectedProfileId).toBe(null);
      expect(result.current.currentProfile).toBe(null);
      expect(mockStoreState.generateTimelineFromProfile).not.toHaveBeenCalled();
    });

    it('handles timeline generation errors during profile selection', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockStoreState.generateTimelineFromProfile.mockRejectedValue(new Error('Timeline generation failed'));

      const { result } = renderHook(() => useTimeline());

      await waitFor(() => {
        expect(result.current.availableProfiles).toEqual(mockProfiles);
      });

      const selectedProfile = mockProfiles[0];

      await act(async () => {
        await result.current.handleProfileSelect(selectedProfile);
      });

      expect(result.current.selectedProfileId).toBe(selectedProfile.id);
      expect(result.current.currentProfile).toBe(selectedProfile);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error generating timeline for selected profile:', 
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('URL Parameter Integration', () => {
    it('syncs selectedProfileId with URL profileId parameter', async () => {
      const profileId = 'profile-from-url';
      mockUseSearchParams.mockReturnValue({
        get: jest.fn((param) => param === 'profileId' ? profileId : null)
      });

      const { result } = renderHook(() => useTimeline());

      await waitFor(() => {
        expect(result.current.selectedProfileId).toBe(profileId);
      });
    });

    it('updates selectedProfileId when URL parameter changes', async () => {
      const mockGet = jest.fn(() => null);
      mockUseSearchParams.mockReturnValue({ get: mockGet });

      const { result, rerender } = renderHook(() => useTimeline());

      expect(result.current.selectedProfileId).toBe(null);

      // Simulate URL parameter change
      mockGet.mockReturnValue('new-profile-id');
      rerender();

      await waitFor(() => {
        expect(result.current.selectedProfileId).toBe('new-profile-id');
      });
    });
  });

  describe('Legacy Profile Loading from URL', () => {
    it('loads profile from URL parameter on initialization', async () => {
      const profileId = 'profile-1';
      mockUseSearchParams.mockReturnValue({
        get: jest.fn((param) => param === 'profileId' ? profileId : null)
      });

      ProfileService.getProfile.mockResolvedValue(mockProfiles[0]);

      const { result } = renderHook(() => useTimeline());

      await waitFor(() => {
        expect(ProfileService.getProfile).toHaveBeenCalledWith(profileId);
        expect(result.current.currentProfile).toBe(mockProfiles[0]);
        expect(mockStoreState.generateTimelineFromProfile).toHaveBeenCalledWith(mockProfiles[0]);
      });
    });

    it('handles URL profile loading errors', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const profileId = 'invalid-profile-id';
      
      mockUseSearchParams.mockReturnValue({
        get: jest.fn((param) => param === 'profileId' ? profileId : null)
      });

      ProfileService.getProfile.mockRejectedValue(new Error('Profile not found'));

      const { result } = renderHook(() => useTimeline());

      await waitFor(() => {
        expect(result.current.currentProfile).toBe(null);
        expect(result.current.isLoading).toBe(false);
      });

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error loading profile for timeline:', 
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Timeline Data Integration', () => {
    it('returns correct timeline sections when timeline data exists', () => {
      const mockTimelineData = {
        phases: [
          { title: 'Phase 1', description: 'Initial setup and foundation building', duration: '3 months' },
          { title: 'Phase 2', description: 'Implementation and rollout', duration: '6 months' }
        ]
      };

      useBusinessProfileStore.mockReturnValue({
        ...mockStoreState,
        timelineData: mockTimelineData
      });

      const { result } = renderHook(() => useTimeline());

      expect(result.current.timelineSections).toHaveLength(4); // current-state + 2 phases + future-state
      expect(result.current.timelineSections[0].id).toBe('current-state');
      expect(result.current.timelineSections[1].id).toBe('phase-1');
      expect(result.current.timelineSections[2].id).toBe('phase-2');
      expect(result.current.timelineSections[3].id).toBe('future-state');
    });

    it('returns empty timeline sections when no timeline data exists', () => {
      const { result } = renderHook(() => useTimeline());

      expect(result.current.timelineSections).toEqual([]);
    });
  });

  describe('Hook Return Values', () => {
    it('returns all expected properties including new profile selection functionality', async () => {
      const { result } = renderHook(() => useTimeline());

      await waitFor(() => {
        expect(result.current.availableProfiles).toBeDefined();
      });

      // Verify all existing properties are still returned
      expect(result.current).toHaveProperty('timelineData');
      expect(result.current).toHaveProperty('businessProfile');
      expect(result.current).toHaveProperty('currentProfile');
      expect(result.current).toHaveProperty('isLoading');
      expect(result.current).toHaveProperty('activeSection');
      expect(result.current).toHaveProperty('scrollProgress');
      expect(result.current).toHaveProperty('timelineSections');
      expect(result.current).toHaveProperty('theme');
      expect(result.current).toHaveProperty('timelineCached');
      expect(result.current).toHaveProperty('timelineGeneratedAt');
      expect(result.current).toHaveProperty('timelineScenarioType');
      expect(result.current).toHaveProperty('contentRef');
      expect(result.current).toHaveProperty('sectionRefs');
      expect(result.current).toHaveProperty('handleSectionClick');
      expect(result.current).toHaveProperty('toggleTheme');
      expect(result.current).toHaveProperty('regenerateTimeline');
      expect(result.current).toHaveProperty('hasValidProfile');
      expect(result.current).toHaveProperty('isProfileTimeline');

      // Verify new profile selection properties
      expect(result.current).toHaveProperty('availableProfiles');
      expect(result.current).toHaveProperty('isLoadingProfiles');
      expect(result.current).toHaveProperty('selectedProfileId');
      expect(result.current).toHaveProperty('handleProfileSelect');

      // Verify types
      expect(Array.isArray(result.current.availableProfiles)).toBe(true);
      expect(typeof result.current.isLoadingProfiles).toBe('boolean');
      expect(typeof result.current.handleProfileSelect).toBe('function');
    });
  });
}); 