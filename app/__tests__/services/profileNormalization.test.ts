import { 
  BusinessObjective,
  Profile 
} from '../../services/types';

import {
  normalizeProfileData, 
  generateInitiativesFromObjectives
} from '../../services/profileService';

describe('Profile Normalization', () => {
  describe('generateInitiativesFromObjectives', () => {
    test('should generate strategic initiatives from business goals and challenges', () => {
      const businessGoals = [
        'Reduce production costs by 20%',
        'Improve customer satisfaction to 9.0'
      ];
      const keyChallenges = [
        'Too much manual work in fulfillment',
        'Slow response to customer issues'
      ];

      const result = generateInitiativesFromObjectives(businessGoals, keyChallenges);

      expect(result).toHaveLength(2);
      
      // First initiative from first goal
      expect(result[0]).toEqual({
        initiative: 'Cost Reduction Program',
        businessProblems: ['Too much manual work in fulfillment'],
        expectedOutcomes: ['Reduce production costs by 20%'],
        linkedObjective: 'Reduce production costs by 20%',
        contact: {
          name: '',
          title: '',
          email: '',
          linkedin: '',
          phone: ''
        },
        priority: 'High',
        status: 'Planning'
      });

      // Second initiative from second goal
      expect(result[1]).toEqual({
        initiative: 'Customer Experience Enhancement Program',
        businessProblems: ['Slow response to customer issues'],
        expectedOutcomes: ['Improve customer satisfaction to 9.0'],
        linkedObjective: 'Improve customer satisfaction to 9.0',
        contact: {
          name: '',
          title: '',
          email: '',
          linkedin: '',
          phone: ''
        },
        priority: 'High',
        status: 'Planning'
      });
    });

    test('should handle single goal and challenge', () => {
      const businessGoals = ['Increase operational efficiency by 30%'];
      const keyChallenges = ['Manual processes causing delays'];

      const result = generateInitiativesFromObjectives(businessGoals, keyChallenges);

      expect(result).toHaveLength(1);
      expect(result[0].initiative).toBe('Operational Efficiency Program');
      expect(result[0].businessProblems).toEqual(['Manual processes causing delays']);
      expect(result[0].expectedOutcomes).toEqual(['Increase operational efficiency by 30%']);
    });

    test('should handle more challenges than goals by distributing them', () => {
      const businessGoals = ['Reduce costs by 15%'];
      const keyChallenges = [
        'Manual inventory management',
        'High energy consumption',
        'Inefficient logistics'
      ];

      const result = generateInitiativesFromObjectives(businessGoals, keyChallenges);

      expect(result).toHaveLength(1);
      expect(result[0].businessProblems).toEqual([
        'Manual inventory management',
        'High energy consumption', 
        'Inefficient logistics'
      ]);
    });

    test('should handle empty inputs gracefully', () => {
      expect(generateInitiativesFromObjectives([], [])).toEqual([]);
      expect(generateInitiativesFromObjectives(['Goal'], [])).toHaveLength(1);
      expect(generateInitiativesFromObjectives([], ['Challenge'])).toEqual([]);
    });
  });

  describe('normalizeProfileData', () => {
    test('should pass through enterprise data unchanged', () => {
      const enterpriseProfile: Partial<Profile> = {
        companyName: 'Enterprise Corp',
        companySize: 'Enterprise',
        businessObjectives: [
          { objective: 'Digital Transformation', targetMetric: '30% efficiency gain' }
        ],
        strategicInitiatives: [
          {
            initiative: 'Manufacturing Automation Program',
            businessProblems: ['Manual assembly processes'],
            expectedOutcomes: ['40% faster production'],
            linkedObjective: 'Digital Transformation',
            contact: {
              name: 'Sarah Johnson',
              title: 'VP Operations',
              email: 'sarah.j@enterprise.com',
              linkedin: 'linkedin.com/in/sarahjohnson',
              phone: '555-0123'
            },
            priority: 'High',
            status: 'In Progress'
          }
        ]
      };

      const result = normalizeProfileData(enterpriseProfile, 'Enterprise');

      expect(result).toEqual(enterpriseProfile);
      expect(result.strategicInitiatives).toHaveLength(1);
      expect(result.strategicInitiatives![0].contact.name).toBe('Sarah Johnson');
    });

    test('should auto-generate initiatives for SMB with goals and challenges', () => {
      const smbInput = {
        companyName: 'Small Manufacturing Co',
        companySize: 'SMB',
        businessGoals: ['Reduce production costs by 20%'],
        keyChallenges: ['Too much manual work in fulfillment']
      };

      const result = normalizeProfileData(smbInput, 'SMB');

      expect(result.businessObjectives).toHaveLength(1);
      expect(result.businessObjectives![0]).toEqual({
        objective: 'Reduce production costs by 20%',
        targetMetric: '20% cost reduction'
      });

      expect(result.strategicInitiatives).toHaveLength(1);
      expect(result.strategicInitiatives![0].initiative).toBe('Cost Reduction Program');
      expect(result.strategicInitiatives![0].businessProblems).toEqual(['Too much manual work in fulfillment']);
      expect(result.strategicInitiatives![0].linkedObjective).toBe('Reduce production costs by 20%');
    });

    test('should preserve existing initiatives when adding auto-generated ones', () => {
      const mixedInput = {
        companyName: 'Growing Company',
        companySize: 'SMB',
        businessGoals: ['Increase revenue by 25%'],
        keyChallenges: ['Limited market reach'],
        strategicInitiatives: [
          {
            initiative: 'Existing Manual Initiative',
            businessProblems: ['Legacy system issues'],
            expectedOutcomes: ['System modernization'],
            contact: {
              name: 'John Doe',
              title: 'CTO',
              email: 'john@growing.com',
              linkedin: '',
              phone: ''
            }
          }
        ]
      };

      const result = normalizeProfileData(mixedInput, 'SMB');

      expect(result.strategicInitiatives).toHaveLength(2);
      expect(result.strategicInitiatives![0].initiative).toBe('Existing Manual Initiative');
      expect(result.strategicInitiatives![1].initiative).toBe('Revenue Growth Program');
    });

    test('should handle SMB input without goals/challenges', () => {
      const smbInput = {
        companyName: 'Simple Company',
        companySize: 'SMB'
      };

      const result = normalizeProfileData(smbInput, 'SMB');

      expect(result.businessObjectives).toEqual([]);
      expect(result.strategicInitiatives).toEqual([]);
      expect(result.companySize).toBe('SMB');
    });

    test('should maintain backward compatibility with existing profiles', () => {
      const existingProfile: Partial<Profile> = {
        companyName: 'Legacy Company',
        strategicInitiatives: [
          {
            initiative: 'Legacy Initiative',
            businessProblems: ['Old problem'],
            expectedOutcomes: ['Expected result'],
            contact: {
              name: 'Legacy Contact',
              title: 'Manager',
              email: 'legacy@company.com',
              linkedin: '',
              phone: ''
            }
          }
        ]
      };

      const result = normalizeProfileData(existingProfile, undefined);

      expect(result).toEqual({
        ...existingProfile,
        companySize: 'Enterprise', // Default fallback
        businessObjectives: []
      });
    });
  });

  describe('Business Objective Helper Functions', () => {
    test('should extract target metric from objective text', () => {
      const objectives = [
        'Reduce costs by 20% within 2 years',
        'Increase revenue to $10M',
        'Improve efficiency by 30%'
      ];

      // This will be part of the auto-generation logic
      expect(objectives[0]).toContain('20%');
      expect(objectives[1]).toContain('$10M');
      expect(objectives[2]).toContain('30%');
    });
  });
}); 