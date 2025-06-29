import { 
  OpportunityBlueprint, 
  AgenticBlueprint, 
  AIOpportunity,
  generateOpportunityId,
  validateOpportunityBlueprint 
} from '../../services/types';

describe('OpportunityBlueprint Interface', () => {
  const mockAIOpportunity: AIOpportunity = {
    title: 'Automated Invoice Processing',
    description: 'AI-powered invoice automation system',
    category: 'Process Automation',
    businessImpact: {
      primaryMetrics: ['Processing time reduction: 80%', 'Error reduction: 95%'],
      estimatedROI: '250-400% within 18 months',
      timeToValue: '3-6 months',
      confidenceLevel: 'High'
    },
    implementation: {
      complexity: 'Medium',
      timeframe: '4-8 months',
      prerequisites: ['ERP integration', 'OCR setup'],
      riskFactors: ['Data quality', 'System integration']
    },
    agenticPattern: {
      recommendedPattern: 'Manager-Workers',
      patternRationale: 'Coordinated processing workflow',
      implementationApproach: 'Central manager with specialist workers',
      patternComplexity: 'Medium'
    },
    relevantInitiatives: ['Digital Transformation'],
    aiTechnologies: ['OCR', 'Machine Learning', 'NLP']
  };

  const mockAgenticBlueprint: AgenticBlueprint = {
    id: 'blueprint_test_123',
    profileId: 'profile_123',
    userId: 'user_123',
    businessObjective: 'Automate invoice processing to reduce cycle time by 80%',
    digitalTeam: [
      {
        role: 'coordinator',
        title: 'Invoice Coordinator',
        coreJob: 'Orchestrate invoice processing workflow',
        responsibilities: ['Workflow coordination', 'Task delegation'],
        toolsUsed: ['ERP System', 'Workflow Engine'],
        oversightLevel: 'policy-checked',
        oversightDescription: 'Human review for exceptions',
        linkedKPIs: ['Processing time'],
        interactionPatterns: ['Direct coordination']
      }
    ],
    humanCheckpoints: [
      {
        checkpoint: 'Exception Review',
        description: 'Review failed processing attempts',
        importance: 'Critical for quality assurance',
        frequency: 'as-needed'
      }
    ],
    agenticTimeline: {
      phases: [
        {
          phase: 'crawl',
          name: 'Pilot Phase',
          durationWeeks: 4,
          description: 'Initial testing with human oversight',
          milestones: ['Setup complete', 'First invoices processed'],
          riskMitigations: ['Manual fallback available'],
          oversightLevel: 'high',
          humanInvolvement: 'Direct supervision'
        }
      ],
      totalDurationWeeks: 12,
      progressiveTrust: []
    },
    kpiImprovements: [
      {
        kpi: 'Invoice processing time',
        targetValue: '2 hours',
        improvementPercent: 80,
        linkedAgents: ['Invoice Coordinator'],
        measurementMethod: 'System tracking',
        timeframe: 'Within 6 months'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  describe('OpportunityBlueprint interface', () => {
    test('should create valid OpportunityBlueprint with all required fields', () => {
      const opportunityId = generateOpportunityId(mockAIOpportunity);
      
      const opportunityBlueprint: OpportunityBlueprint = {
        opportunityId,
        opportunity: mockAIOpportunity,
        blueprint: mockAgenticBlueprint,
        generatedAt: new Date().toISOString(),
        aiModel: 'gpt-4o',
        specialInstructions: 'Focus on compliance requirements'
      };

      expect(opportunityBlueprint.opportunityId).toBeTruthy();
      expect(opportunityBlueprint.opportunity).toEqual(mockAIOpportunity);
      expect(opportunityBlueprint.blueprint).toEqual(mockAgenticBlueprint);
      expect(opportunityBlueprint.generatedAt).toBeTruthy();
      expect(opportunityBlueprint.aiModel).toBe('gpt-4o');
      expect(opportunityBlueprint.specialInstructions).toBe('Focus on compliance requirements');
    });

    test('should create OpportunityBlueprint without optional fields', () => {
      const opportunityId = generateOpportunityId(mockAIOpportunity);
      
      const opportunityBlueprint: OpportunityBlueprint = {
        opportunityId,
        opportunity: mockAIOpportunity,
        blueprint: mockAgenticBlueprint,
        generatedAt: new Date().toISOString(),
        aiModel: 'claude-sonnet'
      };

      expect(opportunityBlueprint.specialInstructions).toBeUndefined();
      expect(opportunityBlueprint.opportunityId).toBeTruthy();
    });
  });

  describe('generateOpportunityId function', () => {
    test('should generate consistent ID for same opportunity', () => {
      const id1 = generateOpportunityId(mockAIOpportunity);
      const id2 = generateOpportunityId(mockAIOpportunity);
      
      expect(id1).toBe(id2);
      expect(id1).toMatch(/^opp_[a-f0-9]{8}$/);
    });

    test('should generate different IDs for different opportunities', () => {
      const opportunity2 = {
        ...mockAIOpportunity,
        title: 'Different Opportunity'
      };
      
      const id1 = generateOpportunityId(mockAIOpportunity);
      const id2 = generateOpportunityId(opportunity2);
      
      expect(id1).not.toBe(id2);
    });

    test('should handle opportunities with missing optional fields', () => {
      const minimalOpportunity: AIOpportunity = {
        title: 'Minimal Opportunity',
        description: 'Basic description',
        category: 'Process Automation',
        businessImpact: {
          primaryMetrics: ['Efficiency'],
          estimatedROI: '100%',
          timeToValue: '6 months',
          confidenceLevel: 'Medium'
        },
        implementation: {
          complexity: 'Low',
          timeframe: '3 months',
          prerequisites: [],
          riskFactors: []
        },
        relevantInitiatives: [],
        aiTechnologies: []
      };
      
      const id = generateOpportunityId(minimalOpportunity);
      expect(id).toMatch(/^opp_[a-f0-9]{8}$/);
    });
  });

  describe('validateOpportunityBlueprint function', () => {
    test('should validate correct OpportunityBlueprint', () => {
      const opportunityBlueprint: OpportunityBlueprint = {
        opportunityId: generateOpportunityId(mockAIOpportunity),
        opportunity: mockAIOpportunity,
        blueprint: mockAgenticBlueprint,
        generatedAt: new Date().toISOString(),
        aiModel: 'gpt-4o'
      };

      const result = validateOpportunityBlueprint(opportunityBlueprint);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    test('should catch missing required fields', () => {
      const invalidBlueprint = {
        // Missing opportunityId
        opportunity: mockAIOpportunity,
        blueprint: mockAgenticBlueprint,
        generatedAt: new Date().toISOString(),
        aiModel: 'gpt-4o'
      } as OpportunityBlueprint;

      const result = validateOpportunityBlueprint(invalidBlueprint);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('opportunityId is required');
    });

    test('should catch invalid date format', () => {
      const invalidBlueprint: OpportunityBlueprint = {
        opportunityId: generateOpportunityId(mockAIOpportunity),
        opportunity: mockAIOpportunity,
        blueprint: mockAgenticBlueprint,
        generatedAt: 'invalid-date',
        aiModel: 'gpt-4o'
      };

      const result = validateOpportunityBlueprint(invalidBlueprint);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('generatedAt must be valid ISO date string');
    });
  });

  describe('Backward compatibility', () => {
    test('should maintain existing AgenticBlueprint interface compatibility', () => {
      // This test ensures existing blueprint functionality still works
      const existingBlueprint: AgenticBlueprint = mockAgenticBlueprint;
      
      expect(existingBlueprint.id).toBeTruthy();
      expect(existingBlueprint.businessObjective).toBeTruthy();
      expect(existingBlueprint.digitalTeam).toHaveLength(1);
      expect(existingBlueprint.humanCheckpoints).toHaveLength(1);
      expect(existingBlueprint.agenticTimeline).toBeTruthy();
      expect(existingBlueprint.kpiImprovements).toHaveLength(1);
    });

    test('should handle conversion from legacy blueprint to opportunity blueprint', () => {
      const legacyBlueprint = mockAgenticBlueprint;
      const opportunityId = 'legacy_migration';
      
      // Simulate converting legacy blueprint to opportunity blueprint
      const convertedBlueprint: OpportunityBlueprint = {
        opportunityId,
        opportunity: mockAIOpportunity, // Would be derived/reconstructed
        blueprint: legacyBlueprint,
        generatedAt: legacyBlueprint.createdAt || new Date().toISOString(),
        aiModel: legacyBlueprint.aiModel || 'legacy'
      };
      
      expect(convertedBlueprint.opportunityId).toBe(opportunityId);
      expect(convertedBlueprint.blueprint).toEqual(legacyBlueprint);
    });
  });
}); 