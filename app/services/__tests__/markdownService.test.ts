import { markdownService } from '../markdownService';
import { Profile } from '../types';

describe('MarkdownService', () => {
  // A sample profile object that conforms to the current 'types.ts' interfaces
  const sampleProfile: Partial<Profile> = {
    companyName: 'Innovate Corp',
    industry: 'FinTech',
    employeeCount: '500-1000',
    annualRevenue: '$250M',
    primaryLocation: 'New York, NY',
    websiteUrl: 'https://innovatecorp.com',
    notes: 'This is a sample note for the profile.',
    strategicInitiatives: [
      {
        initiative: 'AI-Powered Risk Assessment',
        contact: { name: 'Alice Johnson', title: 'Chief Risk Officer', email: 'alice@innovatecorp.com', linkedin: '', phone: '' },
        businessProblems: ['High manual effort in risk analysis', 'Inaccurate risk predictions'],
        expectedOutcomes: ['Reduce manual analysis time by 60%', 'Improve prediction accuracy by 30%'],
        successMetrics: ['Time-to-decision < 4 hours', 'Model accuracy > 95%'],
        targetTimeline: 'Q4 2025',
        estimatedBudget: '$1.5M',
        priority: 'High',
        status: 'In Progress',
      },
      {
        initiative: 'Customer Onboarding Automation',
        contact: { name: 'Bob Williams', title: 'Head of Operations', email: 'bob@innovatecorp.com', linkedin: '', phone: '' },
        businessProblems: ['Slow customer onboarding process'],
        expectedOutcomes: ['Decrease onboarding time from 2 days to 2 hours'],
        successMetrics: ['Customer satisfaction score > 9.0'],
        targetTimeline: 'Q1 2026',
        estimatedBudget: '$750K',
        priority: 'Medium',
        status: 'Planning',
      },
    ],
    systemsAndApplications: [
      {
        name: 'Core Banking Platform',
        category: 'ERP',
        vendor: 'In-house',
        criticality: 'High',
        description: 'Main transactional system for all banking operations.',
      },
      {
        name: 'Salesforce',
        category: 'CRM',
        vendor: 'Salesforce',
        version: 'Lightning Enterprise',
        criticality: 'Medium',
      },
    ],
  };

  describe('generateMarkdown', () => {
    it('should generate a complete markdown document from a full profile', () => {
      const markdown = markdownService.generateMarkdown(sampleProfile);

      // Check for main headers
      expect(markdown).toContain('# Client Profile: Innovate Corp');
      expect(markdown).toContain('## Company Overview');
      expect(markdown).toContain('## Strategic Initiatives');
      expect(markdown).toContain('## Systems & Applications');
      expect(markdown).toContain('## Notes');
      
      // Check for specific details in the overview
      expect(markdown).toContain('**Website**: https://innovatecorp.com');

      // Check for strategic initiative details
      expect(markdown).toContain('### 1. AI-Powered Risk Assessment');
      expect(markdown).toContain('**Status**: In Progress');
      expect(markdown).toContain('**Priority**: High');
      expect(markdown).toContain('**Leader**: Alice Johnson (Chief Risk Officer)');
      expect(markdown).toContain('#### Business Problems');
      expect(markdown).toContain('- High manual effort in risk analysis');
      expect(markdown).toContain('#### Expected Outcomes');
      expect(markdown).toContain('- Reduce manual analysis time by 60%');
      expect(markdown).toContain('#### Success Metrics');
      expect(markdown).toContain('- Time-to-decision < 4 hours');
      
      // Check for second initiative
      expect(markdown).toContain('### 2. Customer Onboarding Automation');
      
      // Check for system details
      expect(markdown).toContain('### Core Banking Platform');
      expect(markdown).toContain('**Category**: ERP');
      expect(markdown).toContain('**Criticality**: High');
      expect(markdown).toContain('> Main transactional system for all banking operations.');
      
      expect(markdown).toContain('### Salesforce');
      expect(markdown).toContain('**Vendor**: Salesforce');

      // Check for notes
      expect(markdown).toContain('This is a sample note for the profile.');
    });

    it('should handle minimal profile data gracefully', () => {
      const minimalData: Partial<Profile> = {
        companyName: 'Minimal Inc.'
      };

      const markdown = markdownService.generateMarkdown(minimalData);
      
      expect(markdown).toContain('# Client Profile: Minimal Inc.');
      expect(markdown).toContain('## Company Overview'); // It SHOULD contain the header if there is any data
      expect(markdown).not.toContain('## Strategic Initiatives');
      expect(markdown).not.toContain('## Systems & Applications');
      expect(markdown).not.toContain('undefined');
      expect(markdown).not.toContain('null');
    });

    it('should handle empty initiatives and systems arrays', () => {
      const minimalData: Partial<Profile> = {
        companyName: 'Empty Arrays LLC',
        industry: 'Services', // Add one field to ensure overview is generated
        strategicInitiatives: [],
        systemsAndApplications: [],
      };

      const markdown = markdownService.generateMarkdown(minimalData);

      expect(markdown).toContain('# Client Profile: Empty Arrays LLC');
      expect(markdown).toContain('## Company Overview');
      expect(markdown).not.toContain('## Strategic Initiatives');
      expect(markdown).not.toContain('## Systems & Applications');
    });
  });
  
  describe('parseMarkdown', () => {
    it('should parse company name from markdown', () => {
      const markdown = `# Client Profile: Test Company

## Company Overview
- **Company Name**: Test Company
- **Industry**: Technology`;

      const result = markdownService.parseMarkdown(markdown);

      expect(result.companyName).toBe('Test Company');
    });

    it('should handle non-matching markdown gracefully', () => {
      const invalidMarkdown = 'This is not valid markdown format';
      const result = markdownService.parseMarkdown(invalidMarkdown);
      expect(result.companyName).toBeUndefined();
    });
  });
}); 