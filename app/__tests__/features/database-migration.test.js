/**
 * Database Migration Feature Tests
 * Tests the client profile migration from localStorage to Supabase
 */

// Mock Supabase before any imports
jest.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      getUser: jest.fn()
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis()
  },
  getCurrentUser: jest.fn()
}));

import { ProfileRepository } from '../../repositories/profileRepository';
import { ProfileService } from '../../services/profileService';
import { getCurrentUser } from '../../lib/supabase';

describe('Database Migration Feature', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('ProfileRepository', () => {
    it('should handle unauthenticated users with localStorage fallback', async () => {
      getCurrentUser.mockResolvedValue(null);
      
      const testProfile = {
        companyName: 'Test Company',
        industry: 'Technology',
        size: '1-50 employees'
      };

      // Test createProfile fallback
      const created = await ProfileRepository.createProfile(testProfile, null);
      expect(created.companyName).toBe('Test Company');
      expect(created.id).toBeDefined();

      // Test getProfiles fallback
      const profiles = await ProfileRepository.getProfiles(null);
      expect(Array.isArray(profiles)).toBe(true);
      expect(profiles.length).toBe(1);
      expect(profiles[0].companyName).toBe('Test Company');
    });

    it('should check migration status correctly', async () => {
      // Setup localStorage profiles
      const localProfiles = [
        { id: '1', companyName: 'Company 1' },
        { id: '2', companyName: 'Company 2' }
      ];
      localStorage.setItem('clientProfiles', JSON.stringify(localProfiles));

      // Mock authenticated user
      getCurrentUser.mockResolvedValue({ id: 'user-123' });

      const status = await ProfileRepository.checkMigrationStatus('user-123');
      
      expect(status.localCount).toBe(2);
      expect(status.needsMigration).toBeTruthy();
    });

    it('should transform database records correctly', () => {
      const dbRecord = {
        id: 'db-id-123',
        user_id: 'user-123',
        name: 'Test Company',
        industry: 'Technology',
        profile_data: {
          companyName: 'Test Company',
          industry: 'Technology',
          size: '1-50 employees'
        },
        markdown_content: '# Test Profile',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z'
      };

      const transformed = ProfileRepository.transformFromDatabase(dbRecord);

      expect(transformed.id).toBe('db-id-123');
      expect(transformed.companyName).toBe('Test Company');
      expect(transformed.markdown).toBe('# Test Profile');
      expect(transformed._supabaseRecord).toBe(true);
      expect(transformed._userId).toBe('user-123');
    });
  });

  describe('ProfileService Migration Integration', () => {
    it('should work seamlessly with repository pattern', async () => {
      getCurrentUser.mockResolvedValue({ id: 'user-123' });

      const profileData = {
        companyName: 'Integration Test Company',
        industry: 'Technology',
        size: '51-200 employees'
      };

      // Mock ProfileService dependencies
      const { markdownService } = require('../../services/markdownService');
      markdownService.generateMarkdown = jest.fn().mockReturnValue('# Test Markdown');

      // Create profile should work
      const created = await ProfileService.createProfile(profileData);
      expect(created).toBeDefined();
      expect(created.companyName).toBe('Integration Test Company');
    });

    it('should handle migration methods', async () => {
      getCurrentUser.mockResolvedValue({ id: 'user-123' });

      // Check migration status
      const status = await ProfileService.checkMigrationStatus();
      expect(status).toBeDefined();

      // Migrate profiles (for authenticated user)
      const result = await ProfileService.migrateLocalStorageProfiles();
      expect(result).toBeDefined();
    });

    it('should reject migration for unauthenticated users', async () => {
      getCurrentUser.mockResolvedValue(null);

      const result = await ProfileService.migrateLocalStorageProfiles();
      expect(result.success).toBe(false);
      expect(result.error).toContain('User must be authenticated');
    });
  });

  describe('Backwards Compatibility', () => {
    it('should continue working without authentication', async () => {
      getCurrentUser.mockResolvedValue(null);

      // Create demo profile data  
      const { demoDataService } = require('../../services/demoDataService');
      const demoProfile = demoDataService.getDemoProfile('tech-startup');

      // Should be able to create profile
      const created = await ProfileService.createProfile(demoProfile);
      expect(created).toBeDefined();
      expect(created.companyName).toBe('TechFlow Solutions');

      // Should be able to retrieve profiles
      const profiles = await ProfileService.getProfiles();
      expect(profiles.length).toBe(1);
      expect(profiles[0].companyName).toBe('TechFlow Solutions');

      // Should be able to get specific profile
      const retrieved = await ProfileService.getProfile(created.id);
      expect(retrieved).toBeDefined();
      expect(retrieved.companyName).toBe('TechFlow Solutions');
    });
  });

  describe('Error Handling', () => {
    it('should gracefully handle Supabase errors', async () => {
      // Mock Supabase error
      const { supabase } = require('../../lib/supabase');
      supabase.from.mockImplementation(() => ({
        insert: jest.fn().mockResolvedValue({ 
          data: null, 
          error: { message: 'Connection failed' } 
        }),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockReturnThis()
      }));

      getCurrentUser.mockResolvedValue({ id: 'user-123' });

      const profileData = {
        companyName: 'Error Test Company',
        industry: 'Technology'
      };

      // Should fallback to localStorage on Supabase error
      const created = await ProfileRepository.createProfile(profileData, 'user-123');
      expect(created).toBeDefined();
      expect(created.companyName).toBe('Error Test Company');
    });
  });
}); 