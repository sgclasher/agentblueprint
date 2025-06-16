import { ProfileService } from '../profileService';
import { ProfileRepository } from '../../repositories/profileRepository';
import { getCurrentUser } from '../../lib/supabase';
import { Profile } from '../types';

// Mock dependencies
jest.mock('../../repositories/profileRepository');
jest.mock('../../lib/supabase');

const mockedProfileRepository = ProfileRepository as jest.Mocked<typeof ProfileRepository>;
const mockedGetCurrentUser = getCurrentUser as jest.Mock;

describe('ProfileService', () => {
  const MOCK_USER_ID = 'user-123';
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetCurrentUser.mockResolvedValue({ id: MOCK_USER_ID, email: 'test@example.com' });
  });

  describe('saveCurrentUserProfile', () => {
    const profileData: Partial<Profile> = { companyName: 'NewCo' };
    const expectedProfile = { ...profileData, id: 'profile-xyz' } as Profile;
    
    it('should save and return a profile for an authenticated user', async () => {
      mockedProfileRepository.saveProfile.mockResolvedValue(expectedProfile);

      const result = await ProfileService.saveCurrentUserProfile(profileData);

      expect(mockedGetCurrentUser).toHaveBeenCalled();
      expect(mockedProfileRepository.saveProfile).toHaveBeenCalledWith(
        MOCK_USER_ID,
        expect.objectContaining(profileData)
      );
      expect(result).toEqual(expectedProfile);
    });

    it('should add createdAt and status fields when creating a new profile', async () => {
        const newProfileData: Partial<Profile> = { companyName: 'BrandNewCo' };
        // No 'id' means it's a new profile
        mockedProfileRepository.saveProfile.mockResolvedValue({ ...newProfileData, id: 'new-id' } as Profile);
        
        await ProfileService.saveCurrentUserProfile(newProfileData);

        expect(mockedProfileRepository.saveProfile).toHaveBeenCalledWith(
            MOCK_USER_ID,
            expect.objectContaining({
                ...newProfileData,
                status: 'complete',
                createdAt: expect.any(String)
            })
        );
    });

    it('should throw an error if user is not authenticated', async () => {
      mockedGetCurrentUser.mockResolvedValue(null);
      await expect(ProfileService.saveCurrentUserProfile(profileData)).rejects.toThrow(
        'User must be authenticated.'
      );
    });
  });

  describe('getCurrentUserProfile', () => {
    it('should return a profile for an authenticated user', async () => {
      const mockProfile = { id: 'profile-abc', companyName: 'TestCo' } as Profile;
      mockedProfileRepository.getProfileByUserId.mockResolvedValue(mockProfile);

      const result = await ProfileService.getCurrentUserProfile();
      
      expect(mockedProfileRepository.getProfileByUserId).toHaveBeenCalledWith(MOCK_USER_ID);
      expect(result).toEqual(mockProfile);
    });

    it('should return null if no profile exists for the user', async () => {
        mockedProfileRepository.getProfileByUserId.mockResolvedValue(null);
        const result = await ProfileService.getCurrentUserProfile();
        expect(result).toBeNull();
    });

    it('should return null if user is not authenticated', async () => {
      mockedGetCurrentUser.mockResolvedValue(null);
      const result = await ProfileService.getCurrentUserProfile();
      expect(result).toBeNull();
      expect(mockedProfileRepository.getProfileByUserId).not.toHaveBeenCalled();
    });
  });

  describe('deleteCurrentUserProfile', () => {
    it('should delete a profile for an authenticated user', async () => {
      mockedProfileRepository.deleteProfile.mockResolvedValue(true);
      
      const result = await ProfileService.deleteCurrentUserProfile();

      expect(mockedProfileRepository.deleteProfile).toHaveBeenCalledWith(MOCK_USER_ID);
      expect(result).toBe(true);
    });

    it('should throw an error if user is not authenticated', async () => {
        mockedGetCurrentUser.mockResolvedValue(null);
        await expect(ProfileService.deleteCurrentUserProfile()).rejects.toThrow(
            'User must be authenticated.'
        );
    });
  });
}); 