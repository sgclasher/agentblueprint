import { ProfileRepository } from '../profileRepository';
import { supabase } from '../../lib/supabase';

// Mock the entire supabase client
jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    upsert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    single: jest.fn(),
    eq: jest.fn().mockReturnThis(),
  },
}));

describe('ProfileRepository', () => {
  beforeEach(() => {
    // Clear mock history before each test
    jest.clearAllMocks();
  });

  describe('saveProfile', () => {
    const userId = 'user-123';
    const profileData = { companyName: 'Test Inc.', industry: 'Tech' };
    const dbRecord = {
      id: 'profile-abc',
      user_id: userId,
      profile_data: profileData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    it('should successfully upsert a profile', async () => {
      const mockUpsert = supabase.from('profiles').upsert().select().single as jest.Mock;
      mockUpsert.mockResolvedValueOnce({
        data: dbRecord,
        error: null,
      });

      const result = await ProfileRepository.saveProfile(userId, profileData);

      expect(supabase.from).toHaveBeenCalledWith('profiles');
      expect(supabase.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          user_id: userId,
          profile_data: profileData,
        }),
        { onConflict: 'user_id' }
      );
      expect(result.id).toBe('profile-abc');
      expect(result.companyName).toBe('Test Inc.');
    });

    it('should throw an error if supabase upsert fails', async () => {
      const mockUpsert = supabase.from('profiles').upsert().select().single as jest.Mock;
      mockUpsert.mockResolvedValueOnce({
        data: null,
        error: new Error('Supabase upsert error'),
      });

      await expect(ProfileRepository.saveProfile(userId, profileData)).rejects.toThrow('Supabase upsert error');
    });

    it('should throw an error if userId is not provided', async () => {
      await expect(ProfileRepository.saveProfile('', profileData)).rejects.toThrow(
        'User authentication is required to save a profile.'
      );
    });
  });

  describe('getProfileByUserId', () => {
    const userId = 'user-123';
    const dbRecord = {
      id: 'profile-abc',
      user_id: userId,
      profile_data: { companyName: 'Test Inc.', industry: 'Tech' },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    it('should return a profile if one exists', async () => {
      const mockSelect = supabase.from('profiles').select().eq().single as jest.Mock;
      mockSelect.mockResolvedValueOnce({
        data: dbRecord,
        error: null,
      });

      const result = await ProfileRepository.getProfileByUserId(userId);

      expect(supabase.from).toHaveBeenCalledWith('profiles');
      expect(supabase.eq).toHaveBeenCalledWith('user_id', userId);
      expect(result).not.toBeNull();
      expect(result?.id).toBe('profile-abc');
      expect(result?.companyName).toBe('Test Inc.');
    });

    it('should return null if no profile exists', async () => {
      const mockSelect = supabase.from('profiles').select().eq().single as jest.Mock;
      mockSelect.mockResolvedValueOnce({
        data: null,
        error: { code: 'PGRST116', message: 'Not found' }, // Supabase "not found" error
      });

      const result = await ProfileRepository.getProfileByUserId(userId);

      expect(result).toBeNull();
    });

    it('should throw an error for other supabase errors', async () => {
      const mockError = new Error('Something went wrong');
      const mockSelect = supabase.from('profiles').select().eq().single as jest.Mock;
      mockSelect.mockResolvedValueOnce({
        data: null,
        error: mockError,
      });

      await expect(ProfileRepository.getProfileByUserId(userId)).rejects.toThrow(mockError);
    });
    
    it('should throw an error if userId is not provided', async () => {
        await expect(ProfileRepository.getProfileByUserId('')).rejects.toThrow(
            'User ID is required to fetch a profile.'
        );
    });
  });
}); 