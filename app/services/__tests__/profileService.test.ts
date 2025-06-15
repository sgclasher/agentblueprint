import { ProfileService } from '../profileService';
import { ProfileRepository } from '../../repositories/profileRepository';
import { markdownService } from '../markdownService';
import { getCurrentUser } from '../../lib/supabase';
import { Profile } from '../types';

// Mock dependencies
jest.mock('../../repositories/profileRepository');
jest.mock('../markdownService');
jest.mock('../../lib/supabase');

const mockedProfileRepository = ProfileRepository as jest.Mocked<typeof ProfileRepository>;
const mockedMarkdownService = markdownService as jest.Mocked<typeof markdownService>;
const mockedGetCurrentUser = getCurrentUser as jest.Mock;

describe('ProfileService', () => {
  const MOCK_USER_ID = 'user-123';
  const MOCK_PROFILE_ID = 'profile-abc';
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetCurrentUser.mockResolvedValue({ id: MOCK_USER_ID });
  });

  describe('createProfile', () => {
    const profileData: Partial<Profile> = { companyName: 'NewCo' };
    const generatedMarkdown = '# NewCo';
    
    it('should create and return a profile with correct data', async () => {
      mockedMarkdownService.generateMarkdown.mockReturnValue(generatedMarkdown);
      const expectedProfile = { ...profileData, id: MOCK_PROFILE_ID, markdown: generatedMarkdown };
      mockedProfileRepository.createProfile.mockResolvedValue(expectedProfile as Profile);

      const result = await ProfileService.createProfile(profileData);

      expect(mockedGetCurrentUser).toHaveBeenCalled();
      expect(mockedMarkdownService.generateMarkdown).toHaveBeenCalledWith(profileData);
      expect(mockedProfileRepository.createProfile).toHaveBeenCalledWith(
        expect.objectContaining({
          ...profileData,
          markdown: generatedMarkdown,
          status: 'draft'
        }),
        MOCK_USER_ID
      );
      expect(result).toEqual(expectedProfile);
    });

    it('should throw an error if user is not authenticated', async () => {
      mockedGetCurrentUser.mockResolvedValue(null);
      await expect(ProfileService.createProfile(profileData)).rejects.toThrow(
        'User must be authenticated to create a profile.'
      );
    });
  });

  describe('getProfiles', () => {
    it('should return profiles for an authenticated user', async () => {
      const mockProfiles = [{ id: MOCK_PROFILE_ID, companyName: 'TestCo' }];
      mockedProfileRepository.getProfiles.mockResolvedValue(mockProfiles as Profile[]);

      const result = await ProfileService.getProfiles();
      
      expect(mockedProfileRepository.getProfiles).toHaveBeenCalledWith(MOCK_USER_ID);
      expect(result).toEqual(mockProfiles);
    });

    it('should return an empty array if user is not authenticated', async () => {
      mockedGetCurrentUser.mockResolvedValue(null);
      const result = await ProfileService.getProfiles();
      expect(result).toEqual([]);
      expect(mockedProfileRepository.getProfiles).not.toHaveBeenCalled();
    });
  });

  describe('getProfile', () => {
    it('should retrieve a specific profile by ID for an authenticated user', async () => {
      const mockProfile = { id: MOCK_PROFILE_ID, companyName: 'TestCo' };
      mockedProfileRepository.getProfile.mockResolvedValue(mockProfile as Profile);

      const result = await ProfileService.getProfile(MOCK_PROFILE_ID);

      expect(mockedProfileRepository.getProfile).toHaveBeenCalledWith(MOCK_PROFILE_ID, MOCK_USER_ID);
      expect(result).toEqual(mockProfile);
    });
  });

  describe('updateProfile', () => {
    it('should update a profile for an authenticated user', async () => {
      const updates: Partial<Profile> = { companyName: 'Updated Co' };
      const updatedProfile = { id: MOCK_PROFILE_ID, ...updates };
      mockedProfileRepository.updateProfile.mockResolvedValue(updatedProfile as Profile);

      const result = await ProfileService.updateProfile(MOCK_PROFILE_ID, updates);

      expect(mockedProfileRepository.updateProfile).toHaveBeenCalledWith(
        MOCK_PROFILE_ID,
        expect.objectContaining(updates),
        MOCK_USER_ID
      );
      expect(result).toEqual(updatedProfile);
    });
  });

  describe('deleteProfile', () => {
    it('should delete a profile for an authenticated user', async () => {
      mockedProfileRepository.deleteProfile.mockResolvedValue(true);
      
      const result = await ProfileService.deleteProfile(MOCK_PROFILE_ID);

      expect(mockedProfileRepository.deleteProfile).toHaveBeenCalledWith(MOCK_PROFILE_ID, MOCK_USER_ID);
      expect(result).toBe(true);
    });
  });
}); 