/**
 * Simple Smoke Tests for MVP
 * Verifies that key features can be imported and basic functionality exists
 * For actual integration testing, use manual testing or E2E tests
 */

describe('MVP Smoke Tests', () => {
  
  describe('ServiceNow Flow Visualization', () => {
    it('should have required components', () => {
      // Verify components can be imported
      const FlowVisualizer = require('../../components/FlowVisualizer').default;
      const AgenticWorkflowConnector = require('../../components/AgenticWorkflowConnector').default;
      const useAgenticStore = require('../../store/useAgenticStore').default;
      
      expect(FlowVisualizer).toBeDefined();
      expect(AgenticWorkflowConnector).toBeDefined();
      expect(useAgenticStore).toBeDefined();
    });
    
    it('should have flow utility functions', () => {
      const { transformAgenticData } = require('../../utils/transformAgenticData');
      const { applyDagreLayout } = require('../../utils/layoutGraph');
      
      expect(transformAgenticData).toBeDefined();
      expect(applyDagreLayout).toBeDefined();
      expect(typeof transformAgenticData).toBe('function');
      expect(typeof applyDagreLayout).toBe('function');
    });
  });
  
  describe('Client Profile Management', () => {
    it('should have profile services', () => {
      const { ProfileService } = require('../../services/profileService');
      const { markdownService } = require('../../services/markdownService');
      
      expect(ProfileService).toBeDefined();
      expect(markdownService).toBeDefined();
      
      // Verify key methods exist as static methods
      expect(ProfileService.createProfile).toBeDefined();
      expect(ProfileService.getProfiles).toBeDefined();
      expect(markdownService.generateMarkdown).toBeDefined();
    });
    
    it('should generate valid markdown', () => {
      const { markdownService } = require('../../services/markdownService');
      
      const testProfile = {
        companyName: 'Test Company',
        industry: 'Technology',
        companyOverview: {
          description: 'A test company'
        }
      };
      
      const markdown = markdownService.generateMarkdown(testProfile);
      expect(markdown).toContain('# Client Profile: Test Company');
      expect(markdown).toContain('Technology');
    });
  });
  
  describe('AI Timeline Generation', () => {
    it('should have timeline service', () => {
      const { TimelineService } = require('../../services/timelineService');
      
      expect(TimelineService).toBeDefined();
      expect(TimelineService.generateTimeline).toBeDefined();
      expect(typeof TimelineService.generateTimeline).toBe('function');
    });
    
    it('should handle timeline generation with proper error handling', async () => {
      const { TimelineService } = require('../../services/timelineService');
      
      const businessProfile = {
        companyName: 'Test Company',
        industry: 'Technology',
        employeeCount: '100-500',  // Updated field name
        strategicInitiatives: []   // Updated to current structure
      };
      
      // Test configuration check methods exist
      expect(TimelineService.isConfigured).toBeDefined();
      expect(TimelineService.getStatus).toBeDefined();
      
      // Updated to work with new signature requiring parameters
      const status = await TimelineService.getStatus('test-user-id', {});
      expect(status).toBeDefined();
      expect(status.configured).toBe(false); // Should be false in test environment
      expect(typeof status.configured).toBe('boolean');
      
      // In test environment (no credentials), verify proper error handling
      try {
        await expect(TimelineService.generateTimeline(
          businessProfile, 
          'balanced',
          'test-user-id',
          {} // Mock credentials repository
        )).rejects.toThrow(/required|configured|Repository/);
      } catch (error) {
        // Additional safety - ensure we're getting meaningful error messages
        expect(error.message).toContain('Timeline generation failed');
      }
    });
    
    it('should have timeline store', () => {
      const useBusinessProfileStore = require('../../store/useBusinessProfileStore').default;
      
      expect(useBusinessProfileStore).toBeDefined();
      expect(typeof useBusinessProfileStore).toBe('function');
    });
  });
  
  describe('API Routes', () => {
    it('should have validation utilities', () => {
      const validation = require('../../utils/validation');
      
      expect(validation.validateInstanceUrl).toBeDefined();
      expect(validation.validateScopeId).toBeDefined();
      expect(validation.validateBusinessProfile).toBeDefined();
      expect(validation.validateScenarioType).toBeDefined();
    });
  });
  

}); 