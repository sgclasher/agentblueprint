import { renderHook, act, waitFor } from '@testing-library/react';
import { useTimeline } from '../useTimeline';
import { ProfileService } from '../../services/profileService';
import useBusinessProfileStore from '../../store/useBusinessProfileStore';
import { useSearchParams } from 'next/navigation';
import { Profile } from '../../services/types';

// Mock dependencies
jest.mock('../../services/profileService');
jest.mock('../../store/useBusinessProfileStore');
jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
}));

const mockedProfileService = ProfileService as jest.Mocked<typeof ProfileService>;
const mockedUseBusinessProfileStore = useBusinessProfileStore as any as jest.Mock;
const mockedUseSearchParams = useSearchParams as jest.Mock;

const mockProfiles: Profile[] = [
  { id: 'profile-1', companyName: 'Acme Corp', industry: 'Technology', createdAt: '2024-01-01T00:00:00Z' },
  { id: 'profile-2', companyName: 'Wellspring Health', industry: 'Healthcare', createdAt: '2024-01-02T00:00:00Z' },
];

describe('useTimeline Hook', () => {
  let mockStore: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Set up a base mock store for each test
    mockStore = {
      timelineData: null,
      generateTimelineFromProfile: jest.fn(),
      clearTimeline: jest.fn(),
    };

    mockedUseBusinessProfileStore.mockReturnValue(mockStore);
    mockedProfileService.getProfiles.mockResolvedValue(mockProfiles);
    mockedUseSearchParams.mockReturnValue(new URLSearchParams()); // Default to no URL params
    
    // Also mock the static getState method
    (useBusinessProfileStore.getState as jest.Mock) = jest.fn(() => ({
      clearTimeline: mockStore.clearTimeline,
    }));
  });

  describe('Initialization', () => {
    it('should load profiles on initialization', async () => {
      renderHook(() => useTimeline());
      await waitFor(() => expect(mockedProfileService.getProfiles).toHaveBeenCalled());
    });

    it('should load profile from URL and generate timeline if profileId exists in URL', async () => {
      mockedUseSearchParams.mockReturnValue(new URLSearchParams("profileId=profile-1"));
      mockedProfileService.getProfile.mockResolvedValue(mockProfiles[0]);
      
      renderHook(() => useTimeline());

      await waitFor(() => {
        expect(mockedProfileService.getProfile).toHaveBeenCalledWith('profile-1');
      });
      
      await waitFor(() => {
        expect(mockStore.generateTimelineFromProfile).toHaveBeenCalledWith(mockProfiles[0]);
      });
    });

    it('should call clearTimeline if no profileId exists in URL', async () => {
      renderHook(() => useTimeline());

      await waitFor(() => {
        expect(mockStore.clearTimeline).toHaveBeenCalled();
      });
    });
  });

  describe('Profile Selection', () => {
    it('should select a profile and generate a timeline', async () => {
      const { result } = renderHook(() => useTimeline());
      
      await waitFor(() => {
        expect(result.current.availableProfiles.length).toBe(mockProfiles.length);
      });

      await act(async () => {
        await result.current.handleProfileSelect(mockProfiles[0]);
      });

      expect(result.current.selectedProfileId).toBe('profile-1');
      expect(result.current.currentProfile).toEqual(mockProfiles[0]);
      expect(mockStore.generateTimelineFromProfile).toHaveBeenCalledWith(mockProfiles[0]);
    });

    it('should clear selection when handleProfileSelect is called with null', async () => {
      const { result } = renderHook(() => useTimeline());
      
      // First, select a profile
      await act(async () => {
        await result.current.handleProfileSelect(mockProfiles[0]);
      });
      expect(result.current.selectedProfileId).toBe('profile-1');

      // Then, deselect it
      await act(async () => {
        await result.current.handleProfileSelect(null);
      });

      expect(result.current.selectedProfileId).toBeNull();
      expect(result.current.currentProfile).toBeNull();
    });
  });
}); 