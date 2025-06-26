/**
 * Pattern-Specific Blueprint Tests
 * 
 * Tests for the new pattern-based blueprint generation system
 * that replaces the hard-coded 5-agent model.
 * 
 * Last Updated: January 2025
 */

import { 
  getPatternDefinition, 
  getAvailablePatterns, 
  getRecommendedPatternForProblemType,
  AGENTIC_PATTERNS 
} from '../../lib/llm/patterns/agenticPatternDefinitions';

import { 
  buildPatternSpecificSystemPrompt,
  buildPatternSpecificUserPrompt,
  validatePatternCompliance,
  getPatternJsonSchema,
  PatternSpecificBlueprintResponse
} from '../../lib/llm/patterns/patternPromptTemplates';

describe('Pattern-Specific Blueprint Generation', () => {
  
  // ==========================================================================
  // PATTERN DEFINITION TESTS
  // ==========================================================================
  
  describe('Pattern Definitions', () => {
    
    test('should have all expected patterns available', () => {
      const availablePatterns = getAvailablePatterns();
      
      expect(availablePatterns).toContain('Tool-Use');
      expect(availablePatterns).toContain('ReAct');
      expect(availablePatterns).toContain('Self-Reflection');
      expect(availablePatterns).toContain('Plan-and-Execute');
      expect(availablePatterns).toContain('Plan-Act-Reflect');
      expect(availablePatterns).toContain('Hierarchical-Planning');
      expect(availablePatterns).toContain('Manager-Workers');
      
      // Should have exactly 7 patterns for MVP
      expect(availablePatterns).toHaveLength(7);
    });
    
    test('should return valid pattern definition for each pattern', () => {
      const patterns = getAvailablePatterns();
      
      patterns.forEach(patternName => {
        const pattern = getPatternDefinition(patternName);
        
        expect(pattern).toBeDefined();
        expect(pattern!.patternName).toBe(patternName);
        expect(pattern!.description).toBeTruthy();
        expect(pattern!.bestFor).toBeInstanceOf(Array);
        expect(pattern!.agentCount).toBeGreaterThan(0);
        expect(pattern!.agents).toHaveLength(pattern!.agentCount);
        expect(pattern!.coordinationMechanism).toBeTruthy();
        expect(['single-agent', 'planning-hybrid', 'multi-agent']).toContain(pattern!.patternType);
        expect(['low', 'medium', 'high']).toContain(pattern!.riskProfile);
        expect(['low', 'medium', 'high']).toContain(pattern!.implementationComplexity);
      });
    });
    
    test('should have correct agent counts per pattern', () => {
      expect(getPatternDefinition('Tool-Use')!.agentCount).toBe(1);
      expect(getPatternDefinition('ReAct')!.agentCount).toBe(1);
      expect(getPatternDefinition('Self-Reflection')!.agentCount).toBe(2);
      expect(getPatternDefinition('Plan-and-Execute')!.agentCount).toBe(2);
      expect(getPatternDefinition('Plan-Act-Reflect')!.agentCount).toBe(3);
      expect(getPatternDefinition('Hierarchical-Planning')!.agentCount).toBe(4);
      expect(getPatternDefinition('Manager-Workers')!.agentCount).toBe(4);
    });
    
    test('should return undefined for invalid pattern', () => {
      expect(getPatternDefinition('Invalid-Pattern')).toBeUndefined();
    });
    
    test('should map problem types to appropriate patterns', () => {
      expect(getRecommendedPatternForProblemType('process-automation')).toBe('Manager-Workers');
      expect(getRecommendedPatternForProblemType('research-analysis')).toBe('Plan-Act-Reflect');
      expect(getRecommendedPatternForProblemType('decision-support')).toBe('Hierarchical-Planning');
      expect(getRecommendedPatternForProblemType('simple-data-retrieval')).toBe('Tool-Use');
      expect(getRecommendedPatternForProblemType('complex-problem-solving')).toBe('ReAct');
      expect(getRecommendedPatternForProblemType('quality-compliance')).toBe('Self-Reflection');
      expect(getRecommendedPatternForProblemType('resource-optimization')).toBe('Plan-and-Execute');
      
      // Should default to Manager-Workers for unknown problem types
      expect(getRecommendedPatternForProblemType('unknown-problem')).toBe('Manager-Workers');
    });
  });
  
  // ==========================================================================
  // AGENT STRUCTURE TESTS
  // ==========================================================================
  
  describe('Agent Structure Validation', () => {
    
    test('each pattern should have well-defined agent structures', () => {
      const patterns = getAvailablePatterns();
      
      patterns.forEach(patternName => {
        const pattern = getPatternDefinition(patternName);
        
        expect(pattern!.agents).toHaveLength(pattern!.agentCount);
        
        pattern!.agents.forEach((agent, index) => {
          // Required fields
          expect(agent.role).toBeTruthy();
          expect(agent.title).toBeTruthy();
          expect(agent.coreJob).toBeTruthy();
          expect(agent.responsibilities).toBeInstanceOf(Array);
          expect(agent.responsibilities.length).toBeGreaterThan(0);
          expect(agent.toolsUsed).toBeInstanceOf(Array);
          expect(agent.toolsUsed.length).toBeGreaterThan(0);
          expect(['human-approval', 'policy-checked', 'full-autonomy']).toContain(agent.oversightLevel);
          expect(agent.oversightDescription).toBeTruthy();
          expect(agent.linkedKPIs).toBeInstanceOf(Array);
          expect(agent.linkedKPIs.length).toBeGreaterThan(0);
          expect(agent.interactionPatterns).toBeInstanceOf(Array);
          expect(agent.interactionPatterns.length).toBeGreaterThan(0);
        });
      });
    });
    
    test('agent roles should be unique within each pattern', () => {
      const patterns = getAvailablePatterns();
      
      patterns.forEach(patternName => {
        const pattern = getPatternDefinition(patternName);
        const roles = pattern!.agents.map(agent => agent.role);
        const uniqueRoles = new Set(roles);
        
        expect(uniqueRoles.size).toBe(roles.length);
      });
    });
    
    test('agent titles should be unique within each pattern', () => {
      const patterns = getAvailablePatterns();
      
      patterns.forEach(patternName => {
        const pattern = getPatternDefinition(patternName);
        const titles = pattern!.agents.map(agent => agent.title);
        const uniqueTitles = new Set(titles);
        
        expect(uniqueTitles.size).toBe(titles.length);
      });
    });
  });
  
  // ==========================================================================
  // PROMPT GENERATION TESTS
  // ==========================================================================
  
  describe('Pattern-Specific Prompt Generation', () => {
    
    test('should generate system prompts for all patterns', () => {
      const patterns = getAvailablePatterns();
      
      patterns.forEach(patternName => {
        const systemPrompt = buildPatternSpecificSystemPrompt(patternName, {
          includeROIProjection: true,
          modelProvider: 'openai',
          industry: 'Technology'
        });
        
        expect(systemPrompt).toBeTruthy();
        expect(systemPrompt).toContain(patternName);
        expect(systemPrompt).toContain('ROI PROJECTION');
        expect(systemPrompt).toContain('OPENAI STRUCTURED OUTPUT');
        
        const pattern = getPatternDefinition(patternName);
        expect(systemPrompt).toContain(`exactly ${pattern!.agentCount} agents`);
        expect(systemPrompt).toContain(pattern!.description);
        expect(systemPrompt).toContain(pattern!.coordinationMechanism);
      });
    });
    
    test('should generate user prompts for all patterns', () => {
      const mockProfile = {
        companyName: 'Test Corp',
        industry: 'Technology',
        employeeCount: '100-500',
        strategicInitiatives: [
          {
            initiative: 'Process Automation',
            priority: 'High',
            businessProblems: ['Manual data entry', 'Slow processes'],
            expectedOutcomes: ['Increased efficiency', 'Reduced errors']
          }
        ],
        systemsAndApplications: [
          { name: 'CRM System', category: 'Customer Management' },
          { name: 'ERP System', category: 'Enterprise Resource Planning' }
        ]
      };
      
      const patterns = getAvailablePatterns();
      
      patterns.forEach(patternName => {
        const userPrompt = buildPatternSpecificUserPrompt(mockProfile, patternName, {
          blueprintFocusContext: 'Focus on process automation',
          specialInstructions: 'Emphasize security and compliance',
          roiContext: 'Include detailed ROI analysis'
        });
        
        expect(userPrompt).toBeTruthy();
        expect(userPrompt).toContain('Test Corp');
        expect(userPrompt).toContain(patternName);
        expect(userPrompt).toContain('Process Automation');
        expect(userPrompt).toContain('Focus on process automation');
        expect(userPrompt).toContain('Emphasize security and compliance');
        expect(userPrompt).toContain('Include detailed ROI analysis');
        
        const pattern = getPatternDefinition(patternName);
        expect(userPrompt).toContain(`exactly ${pattern!.agentCount} agents`);
      });
    });
    
    test('should handle invalid pattern names in prompt generation', () => {
      expect(() => buildPatternSpecificSystemPrompt('Invalid-Pattern')).toThrow();
      expect(() => buildPatternSpecificUserPrompt({}, 'Invalid-Pattern')).toThrow();
    });
    
    test('should generate model-specific optimizations', () => {
      const openaiPrompt = buildPatternSpecificSystemPrompt('Manager-Workers', { modelProvider: 'openai' });
      expect(openaiPrompt).toContain('OPENAI STRUCTURED OUTPUT');
      expect(openaiPrompt).toContain('GPT-4o');
      
      const claudePrompt = buildPatternSpecificSystemPrompt('Manager-Workers', { modelProvider: 'claude' });
      expect(claudePrompt).toContain('CLAUDE EXTENDED THINKING');
      expect(claudePrompt).toContain('interleaved thinking');
      
      const geminiPrompt = buildPatternSpecificSystemPrompt('Manager-Workers', { modelProvider: 'gemini' });
      expect(geminiPrompt).toContain('GEMINI ADAPTIVE THINKING');
      expect(geminiPrompt).toContain('adaptive thinking');
    });
  });
  
  // ==========================================================================
  // JSON SCHEMA TESTS
  // ==========================================================================
  
  describe('Pattern-Specific JSON Schema Generation', () => {
    
    test('should generate valid JSON schemas for all patterns', () => {
      const patterns = getAvailablePatterns();
      
      patterns.forEach(patternName => {
        const schema = getPatternJsonSchema(patternName);
        
        expect(schema).toBeDefined();
        expect(schema).toHaveProperty('type', 'object');
        expect(schema).toHaveProperty('required');
        expect(schema).toHaveProperty('properties');
        
        const properties = (schema as any).properties;
        expect(properties).toHaveProperty('businessObjective');
        expect(properties).toHaveProperty('selectedPattern');
        expect(properties).toHaveProperty('patternRationale');
        expect(properties).toHaveProperty('digitalTeam');
        expect(properties).toHaveProperty('humanCheckpoints');
        expect(properties).toHaveProperty('agenticTimeline');
        expect(properties).toHaveProperty('kpiImprovements');
        
        // Pattern-specific validations
        const pattern = getPatternDefinition(patternName);
        expect(properties.selectedPattern.enum).toContain(patternName);
        expect(properties.digitalTeam.minItems).toBe(pattern!.agentCount);
        expect(properties.digitalTeam.maxItems).toBe(pattern!.agentCount);
      });
    });
    
    test('should enforce correct agent count in schema', () => {
      const toolUseSchema = getPatternJsonSchema('Tool-Use');
      const managerWorkersSchema = getPatternJsonSchema('Manager-Workers');
      
      expect((toolUseSchema as any).properties.digitalTeam.minItems).toBe(1);
      expect((toolUseSchema as any).properties.digitalTeam.maxItems).toBe(1);
      
      expect((managerWorkersSchema as any).properties.digitalTeam.minItems).toBe(4);
      expect((managerWorkersSchema as any).properties.digitalTeam.maxItems).toBe(4);
    });
  });
  
  // ==========================================================================
  // VALIDATION TESTS
  // ==========================================================================
  
  describe('Pattern Compliance Validation', () => {
    
    test('should validate correct pattern compliance', () => {
      const validResponse: PatternSpecificBlueprintResponse = {
        businessObjective: 'Automate manual data entry processes to improve efficiency',
        selectedPattern: 'Manager-Workers',
        patternRationale: 'Manager-Workers pattern is ideal for process automation with clear task delegation and specialist coordination.',
        digitalTeam: [
          {
            role: 'task-manager',
            title: 'Task Management Coordinator',
            coreJob: 'Orchestrate work distribution',
            responsibilities: ['Assign tasks', 'Monitor progress', 'Coordinate handoffs'],
            toolsUsed: ['Workflow system', 'Task tracker'],
            oversightLevel: 'policy-checked',
            oversightDescription: 'Autonomous with escalation',
            linkedKPIs: ['Task efficiency', 'Coordination quality'],
            interactionPatterns: ['Work distribution', 'Progress monitoring']
          },
          {
            role: 'research-specialist',
            title: 'Research Specialist',
            coreJob: 'Conduct thorough research',
            responsibilities: ['Execute research', 'Validate information', 'Synthesize findings'],
            toolsUsed: ['Research databases', 'Analysis tools'],
            oversightLevel: 'policy-checked',
            oversightDescription: 'Output validation required',
            linkedKPIs: ['Research quality', 'Information accuracy'],
            interactionPatterns: ['Research execution', 'Knowledge sharing']
          },
          {
            role: 'analysis-specialist',
            title: 'Analysis Specialist',
            coreJob: 'Transform information into insights',
            responsibilities: ['Analyze data', 'Create recommendations', 'Validate conclusions'],
            toolsUsed: ['Analytics platforms', 'BI tools'],
            oversightLevel: 'policy-checked',
            oversightDescription: 'Quality review required',
            linkedKPIs: ['Analytical accuracy', 'Insight quality'],
            interactionPatterns: ['Data analysis', 'Recommendation development']
          },
          {
            role: 'implementation-specialist',
            title: 'Implementation Specialist',
            coreJob: 'Execute approved recommendations',
            responsibilities: ['Implement actions', 'Monitor outcomes', 'Provide feedback'],
            toolsUsed: ['Implementation platforms', 'Monitoring systems'],
            oversightLevel: 'human-approval',
            oversightDescription: 'Human approval for high-impact changes',
            linkedKPIs: ['Implementation success', 'Outcome achievement'],
            interactionPatterns: ['Action execution', 'Outcome reporting']
          }
        ],
        humanCheckpoints: [
          {
            checkpoint: 'Kick-off Workshop',
            description: 'Confirm objectives and success criteria',
            importance: 'Critical for alignment',
            frequency: 'one-time'
          },
          {
            checkpoint: 'Review Gates',
            description: 'Human review of outputs',
            importance: 'Quality assurance',
            frequency: 'periodic'
          },
          {
            checkpoint: 'Exception Escalations',
            description: 'Immediate notification for risks',
            importance: 'Risk management',
            frequency: 'as-needed'
          },
          {
            checkpoint: 'Quarterly Tune-Up',
            description: 'Review and adjust processes',
            importance: 'Continuous improvement',
            frequency: 'periodic'
          }
        ],
        agenticTimeline: {
          totalDurationWeeks: 24,
          phases: [
            {
              phase: 'crawl',
              name: 'Proof of Concept',
              durationWeeks: 8,
              description: 'Initial implementation with high oversight',
              milestones: ['Setup complete', 'First automation running'],
              riskMitigations: ['Manual fallbacks', 'Extensive monitoring'],
              oversightLevel: 'high',
              humanInvolvement: 'Continuous monitoring and approval'
            },
            {
              phase: 'walk',
              name: 'Selective Automation',
              durationWeeks: 10,
              description: 'Expanding automation with reduced oversight',
              milestones: ['Multiple processes automated', 'Quality gates established'],
              riskMitigations: ['Automated quality checks', 'Performance monitoring'],
              oversightLevel: 'medium',
              humanInvolvement: 'Exception-based review'
            },
            {
              phase: 'run',
              name: 'Full Automation',
              durationWeeks: 6,
              description: 'Complete automation with minimal oversight',
              milestones: ['Full process automation', 'Optimization complete'],
              riskMitigations: ['Continuous monitoring', 'Automated alerting'],
              oversightLevel: 'low',
              humanInvolvement: 'Strategic oversight only'
            }
          ]
        },
        kpiImprovements: [
          {
            kpi: 'Data Entry Efficiency',
            currentValue: '100 records/hour',
            targetValue: '500 records/hour',
            improvementPercent: 400,
            linkedAgents: ['task-manager', 'implementation-specialist'],
            measurementMethod: 'Automated throughput tracking',
            timeframe: '3 months'
          },
          {
            kpi: 'Error Rate',
            currentValue: '5%',
            targetValue: '0.5%',
            improvementPercent: 90,
            linkedAgents: ['analysis-specialist', 'implementation-specialist'],
            measurementMethod: 'Quality control metrics',
            timeframe: '4 months'
          },
          {
            kpi: 'Process Time',
            currentValue: '2 hours',
            targetValue: '30 minutes',
            improvementPercent: 75,
            linkedAgents: ['task-manager', 'research-specialist'],
            measurementMethod: 'End-to-end process timing',
            timeframe: '2 months'
          }
        ]
      };
      
      const errors = validatePatternCompliance(validResponse, 'Manager-Workers');
      expect(errors).toHaveLength(0);
    });
    
    test('should detect agent count mismatches', () => {
      const invalidResponse: PatternSpecificBlueprintResponse = {
        businessObjective: 'Test objective',
        selectedPattern: 'Manager-Workers',
        patternRationale: 'Test rationale that is long enough to pass validation',
        digitalTeam: [
          // Only 2 agents instead of required 4 for Manager-Workers
          {
            role: 'test-role',
            title: 'Test Agent',
            coreJob: 'Test job',
            responsibilities: ['Test responsibility'],
            toolsUsed: ['Test tool'],
            oversightLevel: 'policy-checked',
            oversightDescription: 'Test oversight',
            linkedKPIs: ['Test KPI'],
            interactionPatterns: ['Test pattern']
          },
          {
            role: 'test-role-2',
            title: 'Test Agent 2',
            coreJob: 'Test job 2',
            responsibilities: ['Test responsibility 2'],
            toolsUsed: ['Test tool 2'],
            oversightLevel: 'policy-checked',
            oversightDescription: 'Test oversight 2',
            linkedKPIs: ['Test KPI 2'],
            interactionPatterns: ['Test pattern 2']
          }
        ],
        humanCheckpoints: [],
        agenticTimeline: {
          totalDurationWeeks: 24,
          phases: []
        },
        kpiImprovements: []
      };
      
      const errors = validatePatternCompliance(invalidResponse, 'Manager-Workers');
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(error => error.includes('Agent count mismatch'))).toBeTruthy();
    });
    
    test('should detect pattern mismatches', () => {
      const invalidResponse: PatternSpecificBlueprintResponse = {
        businessObjective: 'Test objective',
        selectedPattern: 'Tool-Use', // Wrong pattern
        patternRationale: 'Test rationale that is long enough to pass validation',
        digitalTeam: [],
        humanCheckpoints: [],
        agenticTimeline: {
          totalDurationWeeks: 24,
          phases: []
        },
        kpiImprovements: []
      };
      
      const errors = validatePatternCompliance(invalidResponse, 'Manager-Workers');
      expect(errors.some(error => error.includes('Pattern mismatch'))).toBeTruthy();
    });
    
    test('should detect missing required fields', () => {
      const invalidResponse: PatternSpecificBlueprintResponse = {
        businessObjective: '', // Empty objective
        selectedPattern: 'Manager-Workers',
        patternRationale: '', // Empty rationale
        digitalTeam: [],
        humanCheckpoints: [],
        agenticTimeline: {
          totalDurationWeeks: 24,
          phases: []
        },
        kpiImprovements: [] // Too few KPIs
      };
      
      const errors = validatePatternCompliance(invalidResponse, 'Manager-Workers');
      expect(errors.some(error => error.includes('Missing business objective'))).toBeTruthy();
      expect(errors.some(error => error.includes('Missing pattern rationale'))).toBeTruthy();
      expect(errors.some(error => error.includes('KPI improvements must have at least 3 items'))).toBeTruthy();
    });
  });
  
  // ==========================================================================
  // INTEGRATION TESTS
  // ==========================================================================
  
  describe('Pattern System Integration', () => {
    
    test('should work end-to-end for each pattern', () => {
      const patterns = getAvailablePatterns();
      const mockProfile = {
        companyName: 'Integration Test Corp',
        industry: 'Technology',
        employeeCount: '50-100'
      };
      
      patterns.forEach(patternName => {
        // Generate prompts
        const systemPrompt = buildPatternSpecificSystemPrompt(patternName);
        const userPrompt = buildPatternSpecificUserPrompt(mockProfile, patternName);
        
        // Generate schema
        const schema = getPatternJsonSchema(patternName);
        
        // Verify everything is consistent
        expect(systemPrompt).toContain(patternName);
        expect(userPrompt).toContain(patternName);
        expect((schema as any).properties.selectedPattern.enum).toContain(patternName);
        
        const pattern = getPatternDefinition(patternName);
        expect(systemPrompt).toContain(`exactly ${pattern!.agentCount} agents`);
        expect(userPrompt).toContain(`exactly ${pattern!.agentCount} agents`);
        expect((schema as any).properties.digitalTeam.minItems).toBe(pattern!.agentCount);
      });
    });
    
    test('should recommend different patterns for different problem types', () => {
      const problemTypes = [
        'process-automation',
        'research-analysis', 
        'decision-support',
        'simple-data-retrieval',
        'complex-problem-solving',
        'quality-compliance',
        'resource-optimization'
      ];
      
      const recommendations = problemTypes.map(type => 
        getRecommendedPatternForProblemType(type)
      );
      
      // Should have different recommendations for different problem types
      const uniqueRecommendations = new Set(recommendations);
      expect(uniqueRecommendations.size).toBeGreaterThan(1);
      
      // Each recommendation should be a valid pattern
      recommendations.forEach(patternName => {
        expect(getAvailablePatterns()).toContain(patternName);
      });
    });
  });
}); 