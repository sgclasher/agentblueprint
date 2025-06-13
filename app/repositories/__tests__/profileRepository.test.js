import { ProfileRepository } from '../profileRepository';

describe('ProfileRepository - Data Migration', () => {
  describe('migrateProfileData', () => {
    test('adds businessProblems field to initiatives that lack it', () => {
      const profileData = {
        companyName: 'Test Corp',
        strategicInitiatives: [
          {
            initiative: 'Digital Transformation',
            contact: {
              name: 'John Doe',
              title: 'CTO',
              email: 'john@test.com',
              linkedin: '',
              phone: ''
            }
            // Note: no businessProblems field
          }
        ]
      };

      const migrated = ProfileRepository.migrateProfileData(profileData);

      expect(migrated.strategicInitiatives[0]).toHaveProperty('businessProblems');
      expect(migrated.strategicInitiatives[0].businessProblems).toEqual([]);
    });

    test('initializes null businessProblems as empty array', () => {
      const profileData = {
        companyName: 'Test Corp',
        strategicInitiatives: [
          {
            initiative: 'Digital Transformation',
            contact: { name: 'John', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' },
            businessProblems: null
          }
        ]
      };

      const migrated = ProfileRepository.migrateProfileData(profileData);

      expect(migrated.strategicInitiatives[0].businessProblems).toEqual([]);
    });

    test('initializes undefined businessProblems as empty array', () => {
      const profileData = {
        companyName: 'Test Corp',
        strategicInitiatives: [
          {
            initiative: 'Digital Transformation',
            contact: { name: 'John', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' },
            businessProblems: undefined
          }
        ]
      };

      const migrated = ProfileRepository.migrateProfileData(profileData);

      expect(migrated.strategicInitiatives[0].businessProblems).toEqual([]);
    });

    test('converts non-array businessProblems to empty array', () => {
      const profileData = {
        companyName: 'Test Corp',
        strategicInitiatives: [
          {
            initiative: 'Digital Transformation',
            contact: { name: 'John', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' },
            businessProblems: 'invalid string value'
          }
        ]
      };

      const migrated = ProfileRepository.migrateProfileData(profileData);

      expect(migrated.strategicInitiatives[0].businessProblems).toEqual([]);
    });

    test('preserves valid businessProblems arrays', () => {
      const existingProblems = ['Problem 1', 'Problem 2'];
      const profileData = {
        companyName: 'Test Corp',
        strategicInitiatives: [
          {
            initiative: 'Digital Transformation',
            contact: { name: 'John', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' },
            businessProblems: existingProblems
          }
        ]
      };

      const migrated = ProfileRepository.migrateProfileData(profileData);

      expect(migrated.strategicInitiatives[0].businessProblems).toEqual(existingProblems);
    });

    test('handles multiple initiatives with mixed migration needs', () => {
      const profileData = {
        companyName: 'Test Corp',
        strategicInitiatives: [
          {
            initiative: 'Initiative 1',
            contact: { name: 'John', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' }
            // Missing businessProblems
          },
          {
            initiative: 'Initiative 2',
            contact: { name: 'Jane', title: 'VP', email: 'jane@test.com', linkedin: '', phone: '' },
            businessProblems: ['Existing problem']
          },
          {
            initiative: 'Initiative 3',
            contact: { name: 'Bob', title: 'Dir', email: 'bob@test.com', linkedin: '', phone: '' },
            businessProblems: null
          }
        ]
      };

      const migrated = ProfileRepository.migrateProfileData(profileData);

      expect(migrated.strategicInitiatives[0].businessProblems).toEqual([]);
      expect(migrated.strategicInitiatives[1].businessProblems).toEqual(['Existing problem']);
      expect(migrated.strategicInitiatives[2].businessProblems).toEqual([]);
    });

    test('handles profile without strategicInitiatives', () => {
      const profileData = {
        companyName: 'Test Corp',
        industry: 'Technology'
        // No strategicInitiatives field
      };

      const migrated = ProfileRepository.migrateProfileData(profileData);

      expect(migrated).toEqual(profileData);
    });

    test('handles null/undefined profile data', () => {
      expect(ProfileRepository.migrateProfileData(null)).toBeNull();
      expect(ProfileRepository.migrateProfileData(undefined)).toBeUndefined();
    });

    test('handles empty strategicInitiatives array', () => {
      const profileData = {
        companyName: 'Test Corp',
        strategicInitiatives: []
      };

      const migrated = ProfileRepository.migrateProfileData(profileData);

      expect(migrated.strategicInitiatives).toEqual([]);
    });

    test('handles non-array strategicInitiatives', () => {
      const profileData = {
        companyName: 'Test Corp',
        strategicInitiatives: 'invalid value'
      };

      const migrated = ProfileRepository.migrateProfileData(profileData);

      // Should not process non-array strategicInitiatives
      expect(migrated.strategicInitiatives).toBe('invalid value');
    });

    test('does not mutate original profile data', () => {
      const originalProfileData = {
        companyName: 'Test Corp',
        strategicInitiatives: [
          {
            initiative: 'Digital Transformation',
            contact: { name: 'John', title: 'CTO', email: 'john@test.com', linkedin: '', phone: '' }
            // Missing businessProblems
          }
        ]
      };

      // Create a copy to compare against
      const originalCopy = JSON.parse(JSON.stringify(originalProfileData));

      const migrated = ProfileRepository.migrateProfileData(originalProfileData);

      // Original should be unchanged
      expect(originalProfileData).toEqual(originalCopy);
      
      // Migrated should have the new field
      expect(migrated.strategicInitiatives[0]).toHaveProperty('businessProblems');
      expect(originalProfileData.strategicInitiatives[0]).not.toHaveProperty('businessProblems');
    });
  });
}); 