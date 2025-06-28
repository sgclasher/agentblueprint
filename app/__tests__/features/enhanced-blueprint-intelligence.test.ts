import { AgenticBlueprintService } from '../../services/agenticBlueprintService';
import { Profile, OpportunityContext, DomainContext } from '../../services/types';
import { detectBusinessDomain, getDomainAgentPattern } from '../../lib/llm/patterns/domainAgentPatterns';

/**
 * Enhanced Blueprint Intelligence System Tests
 * 
 * Validates that the new domain-specific agent generation system produces
 * business-specific agent teams instead of generic templates.
 */

describe('Enhanced Blueprint Intelligence System', () => {
  
  const mockProfile: Profile = {
    id: 'test-profile-123',
    companyName: 'Test Procurement Company',
    industry: 'Manufacturing',
    employeeCount: '500-999',
    strategicInitiatives: [
      {
        initiative: 'Automate Procurement Process',
        contact: {
          name: 'John Smith',
          title: 'Procurement Director',
          email: 'john@test.com',
          linkedin: '',
          phone: ''
        },
        businessProblems: [
          'Manual RFP creation takes 5 days',
          'Vendor evaluation lacks consistency',
          'Contract review bottlenecks'
        ],
        priority: 'High'
      }
    ],
    systemsAndApplications: [
      { name: 'SAP ERP', category: 'ERP', criticality: 'High' },
      { name: 'Oracle Procurement', category: 'Procurement', criticality: 'High' }
    ]
  };

  const mockProcurementOpportunity = {
    title: 'Procurement Process Automation',
    category: 'Process Automation',
    description: 'Automate procurement workflows to reduce cycle time and improve compliance with vendor management and RFP processes',
    businessProblems: ['Manual RFP creation', 'Inconsistent vendor evaluation'],
    recommendedPattern: 'Manager-Workers',
    patternRationale: 'Selected for standardized workflow coordination',
    implementationApproach: 'Deploy coordinator with specialist agents',
    estimatedROI: '250-400%',
    timeToValue: '3-6 months',
    confidenceLevel: 'High',
    timeframe: '4-8 months',
    prerequisites: ['System integration', 'Staff training'],
    aiTechnologies: ['RPA', 'ML', 'NLP']
  };

  describe('Step 1: Opportunity Context Analysis Enhancement', () => {
    
    test('should detect procurement domain from opportunity context', () => {
      const domain = detectBusinessDomain(
        'Process Automation',
        'Automate procurement workflows to reduce cycle time and improve compliance with vendor management and RFP processes',
        mockProfile.industry
      );
      
      expect(domain).toBe('procurement');
    });

    test('should detect financial services domain correctly', () => {
      const domain = detectBusinessDomain(
        'Risk Management',
        'Automate credit analysis and risk assessment for loan portfolios',
        'Financial Services'
      );
      
      expect(domain).toBe('financial-services');
      
      const pattern = getDomainAgentPattern(domain);
      expect(pattern.coordinationPattern).toBe('Hierarchical-Hub-Spoke');
      expect(pattern.agentRoles[0].role).toBe('risk-management-coordinator');
    });

    test('should detect healthcare domain with HIPAA considerations', () => {
      const domain = detectBusinessDomain(
        'Healthcare Management',
        'Automate patient care workflows and clinical decision support',
        'Healthcare'
      );
      
      expect(domain).toBe('healthcare');
      
      const pattern = getDomainAgentPattern(domain);
      expect(pattern.coordinationPattern).toBe('Plan-Act-Reflect');
      expect(pattern.agentRoles.some(role => role.title.includes('Patient'))).toBe(true);
    });

    test('should fallback to generic domain for unknown contexts', () => {
      const domain = detectBusinessDomain(
        'Unknown Category',
        'Some generic business process improvement',
        'Unknown Industry'
      );
      
      expect(domain).toBe('generic');
    });

    test('should get domain-specific tools correctly', () => {
      const { getDomainSpecificTools } = require('../../lib/llm/patterns/domainAgentPatterns');
      
      const existingSystems = ['SAP Ariba', 'Oracle Procurement Cloud'];
      const tools = getDomainSpecificTools('procurement', existingSystems);
      
      expect(tools.length).toBeGreaterThan(0);
      expect(tools).toContain('SAP Ariba');
    });

  });

  describe('Domain Pattern Validation', () => {
    
    test('should validate procurement pattern completeness', () => {
      const { validateDomainPattern } = require('../../lib/llm/patterns/domainAgentPatterns');
      
      const validation = validateDomainPattern('procurement');
      
      expect(validation.isComplete).toBe(true);
      expect(validation.missingElements).toHaveLength(0);
      expect(validation.qualityScore).toBe(100);
    });

    test('should detect incomplete domain patterns', () => {
      const { validateDomainPattern } = require('../../lib/llm/patterns/domainAgentPatterns');
      
      const validation = validateDomainPattern('education'); // Has empty agentRoles
      
      expect(validation.isComplete).toBe(false);
      expect(validation.missingElements.length).toBeGreaterThan(0);
      expect(validation.qualityScore).toBeLessThan(100);
    });

  });

  describe('Multi-Domain Business Scenarios', () => {
    
    test('should handle manufacturing domain with production focus', () => {
      const domain = detectBusinessDomain(
        'Production Optimization',
        'Optimize manufacturing production schedules and quality control processes',
        'Manufacturing'
      );
      
      expect(domain).toBe('manufacturing');
      
      const pattern = getDomainAgentPattern(domain);
      expect(pattern.coordinationPattern).toBe('Blackboard-Shared-Memory');
      expect(pattern.agentRoles.some(role => role.role.includes('production'))).toBe(true);
    });

    test('should handle technology domain with DevOps patterns', () => {
      const domain = detectBusinessDomain(
        'Software Development',
        'Automate CI/CD pipelines and code review processes for development teams',
        'Technology'
      );
      
      expect(domain).toBe('technology');
      
      const pattern = getDomainAgentPattern(domain);
      expect(pattern.coordinationPattern).toBe('Market-Based-Auction');
      expect(pattern.agentRoles.some(role => role.title.includes('DevOps'))).toBe(true);
    });

  });

  describe('Procurement Domain Deep Dive', () => {
    
    test('should provide complete procurement pattern with all required agents', () => {
      const pattern = getDomainAgentPattern('procurement');
      
      expect(pattern.agentRoles).toHaveLength(5);
      
      const roleNames = pattern.agentRoles.map(role => role.role);
      expect(roleNames).toContain('procurement-coordinator');
      expect(roleNames).toContain('rfp-management-agent');
      expect(roleNames).toContain('vendor-evaluation-agent');
      expect(roleNames).toContain('contract-review-agent');
      expect(roleNames).toContain('procurement-execution-agent');
    });

    test('should have proper workflow positioning for procurement agents', () => {
      const pattern = getDomainAgentPattern('procurement');
      
      const coordinator = pattern.agentRoles.find(role => role.role === 'procurement-coordinator');
      const rfpAgent = pattern.agentRoles.find(role => role.role === 'rfp-management-agent');
      
      expect(coordinator?.workflowPosition).toBe(1);
      expect(rfpAgent?.workflowPosition).toBe(2);
    });

    test('should include domain-specific KPIs for procurement agents', () => {
      const pattern = getDomainAgentPattern('procurement');
      
      const rfpAgent = pattern.agentRoles.find(role => role.role === 'rfp-management-agent');
      
      expect(rfpAgent?.domainKPIs).toContain('RFP creation time');
      expect(rfpAgent?.domainKPIs).toContain('Vendor participation rate');
    });

  });

});

/**
 * Integration Test: Full Opportunity-to-Domain Analysis Flow
 */
describe('End-to-End Domain Analysis Integration', () => {
  
  test('should complete full procurement opportunity analysis flow', () => {
    const mockProfile: Profile = {
      id: 'integration-test',
      companyName: 'Test Manufacturing Corp',
      industry: 'Manufacturing',
      strategicInitiatives: [
        {
          initiative: 'Procurement Automation',
          contact: { name: 'Test', title: 'Test', email: '', linkedin: '', phone: '' },
          businessProblems: ['Slow RFP process', 'Manual vendor evaluation'],
          priority: 'High'
        }
      ],
      systemsAndApplications: [
        { name: 'SAP Ariba', category: 'Procurement', criticality: 'High' }
      ]
    };

    const procurementOpportunity = {
      title: 'RFP Process Automation',
      category: 'Process Automation',
      description: 'Automate RFP creation, vendor evaluation, and contract management workflows',
      recommendedPattern: 'Manager-Workers'
    };

    // Test the complete analysis flow
    const analyzeOpportunityContext = (AgenticBlueprintService as any).analyzeOpportunityContext;
    const extractDomainContext = (AgenticBlueprintService as any).extractDomainContext;
    
    const opportunityContext = analyzeOpportunityContext(procurementOpportunity, mockProfile);
    const domainContext = extractDomainContext(opportunityContext, mockProfile);
    
    // Validate end-to-end results
    expect(opportunityContext.domain).toBe('procurement');
    expect(domainContext.domainTerms).toEqual(expect.arrayContaining(['RFP', 'vendor']));
    expect(domainContext.commonTools).toEqual(expect.arrayContaining(['SAP Ariba']));
    expect(domainContext.keyMetrics).toEqual(expect.arrayContaining(['Procurement cycle time']));
    expect(domainContext.typicalRoles).toEqual(expect.arrayContaining(['Procurement Coordinator', 'RFP Management Agent']));
    
    console.log('✅ End-to-end domain analysis completed successfully');
    console.log('📋 Domain:', domainContext.domain);
    console.log('🔧 Tools:', domainContext.commonTools.slice(0, 3));
    console.log('👥 Roles:', domainContext.typicalRoles.slice(0, 3));
  });

}); 