/**
 * Agentic Blueprint System Prompt Testing
 * 
 * Tests the prompt engineering system for AI blueprint generation,
 * specifically focusing on the KPI improvements compliance issue
 * and cross-provider validation.
 */

import { 
  buildAgenticBlueprintSystemPrompt,
  buildAgenticBlueprintUserPrompt,
  validateAgenticBlueprintResponse,
  AgenticBlueprintPromptConfig,
  AgenticBlueprintResponse
} from '../../lib/llm/prompts/agenticBlueprintPrompt';
import { Profile } from '../../services/types';

describe('Agentic Blueprint System Prompt Tests', () => {
  // Sample profile for testing
  const mockProfile: Profile = {
    id: 'test-profile-123',
    userId: 'test-user-123',
    companyName: 'TechCorp Manufacturing',
    industry: 'Manufacturing',
    employeeCount: '500',
    annualRevenue: '$50M',
    primaryLocation: 'United States',
    strategicInitiatives: [
      {
        initiative: 'Automate Invoice Processing',
        priority: 'High',
        status: 'Planning',
        businessProblems: [
          'Manual invoice processing takes 5 days on average',
          'High error rate in data entry (15%)',
          'Vendor payment delays affecting relationships'
        ],
        expectedOutcomes: [
          'Reduce processing time by 60%',
          'Eliminate data entry errors',
          'Improve vendor satisfaction'
        ],
        successMetrics: [
          'Invoice processing time',
          'Error rate percentage',
          'Vendor satisfaction score'
        ],
        contact: {
          name: 'John Smith',
          title: 'CFO',
          email: 'john.smith@techcorp.com',
          linkedin: 'https://linkedin.com/in/johnsmith',
          phone: '+1-555-123-4567'
        }
      }
    ],
    systemsAndApplications: [
      {
        name: 'SAP ERP',
        category: 'Enterprise Resource Planning',
        vendor: 'SAP',
        criticality: 'High',
        description: 'Core ERP system for financial operations'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  describe('Provider-Specific Prompt Generation', () => {
    const providers: Array<'openai' | 'claude' | 'gemini'> = ['openai', 'claude', 'gemini'];

    providers.forEach(provider => {
      it(`should generate provider-specific optimizations for ${provider}`, () => {
        const config: AgenticBlueprintPromptConfig = {
          modelProvider: provider,
          industry: 'Manufacturing',
          includeIndustryContext: true,
          enableChainOfThought: true
        };

        const systemPrompt = buildAgenticBlueprintSystemPrompt(config);
        const userPrompt = buildAgenticBlueprintUserPrompt(mockProfile, config);

        // Check that provider-specific sections are included
        expect(systemPrompt).toContain(`${provider.toUpperCase()}`);
        
        // Check for 2025 API optimization content
        expect(systemPrompt).toContain('2025 API Optimization');
        
        // Check for KPI validation instructions
        expect(systemPrompt).toContain('CRITICAL: ');
        if (provider === 'claude') {
          expect(systemPrompt).toContain('CLAUDE EXTENDED THINKING MODE');
          expect(systemPrompt).toContain('Think through KPI generation step-by-step');
        } else if (provider === 'gemini') {
          expect(systemPrompt).toContain('GEMINI ADAPTIVE THINKING MODE');
          expect(systemPrompt).toContain('verify kpiImprovements array contains 3+ items');
        } else if (provider === 'openai') {
          expect(systemPrompt).toContain('OPENAI STRUCTURED OUTPUT MODE');
          expect(systemPrompt).toContain('kpiImprovements array length meets minimum 3 requirement');
        }
        
        // All should contain the mandatory KPI framework
        expect(systemPrompt).toContain('Must identify minimum 3 KPI improvements');
        
        // Verify prompt is substantial (not empty/minimal)
        expect(systemPrompt.length).toBeGreaterThan(1000);
        expect(userPrompt.length).toBeGreaterThan(500);
      });
    });
  });

  describe('KPI Requirements Validation', () => {
    it('should include explicit KPI minimum requirements in user prompt', () => {
      const config: AgenticBlueprintPromptConfig = {
        industry: 'Manufacturing',
        includeIndustryContext: true
      };

      const userPrompt = buildAgenticBlueprintUserPrompt(mockProfile, config);

      // Check for explicit KPI requirements
      expect(userPrompt).toContain('MANDATORY: Exactly 3, 4, or 5 metrics');
      expect(userPrompt).toContain('NO FEWER THAN 3');
      expect(userPrompt).toContain('CRITICAL REQUIREMENT');
      expect(userPrompt).toContain('validation failure');
      
      // Check for KPI examples
      expect(userPrompt).toContain('EXAMPLES OF VALID KPI IMPROVEMENTS');
      
      // Check for final reminder
      expect(userPrompt).toContain('FINAL REMINDER');
      expect(userPrompt).toContain('at least 3 items');
    });

    it('should show 3 KPI items in JSON schema example', () => {
      const userPrompt = buildAgenticBlueprintUserPrompt(mockProfile);

      // Extract the JSON schema section with better regex
      const jsonSchemaMatch = userPrompt.match(/"kpiImprovements": \[([\s\S]*?)\]\s*\}/);
      expect(jsonSchemaMatch).toBeTruthy();
      
      if (jsonSchemaMatch) {
        const kpiSection = jsonSchemaMatch[1];
        
        // Count the number of KPI objects by counting "kpi": occurrences
        const kpiMatches = kpiSection.match(/"kpi":/g);
        expect(kpiMatches).toBeTruthy();
        expect(kpiMatches!.length).toBeGreaterThanOrEqual(3);
        
        // Verify specific KPI examples are present
        expect(kpiSection).toContain('Invoice processing time');
        expect(kpiSection).toContain('Document accuracy rate');
        expect(kpiSection).toContain('Task completion speed');
      }
    });
  });

  describe('Response Validation Logic', () => {
    it('should reject responses with fewer than 3 KPI improvements', () => {
      const invalidResponse: AgenticBlueprintResponse = {
        businessObjective: 'Automate invoice processing to reduce manual work and improve accuracy',
        digitalTeam: Array(5).fill(null).map((_, i) => ({
          role: ['coordinator', 'researcher', 'analyst', 'quality-checker', 'actuator'][i] as any,
          title: ['Project Manager', 'Data Analyst', 'Process Consultant', 'Quality Auditor', 'Operations Specialist'][i],
          coreJob: `Job description for role ${i + 1}`,
          toolsUsed: ['Tool 1', 'Tool 2', 'Tool 3'],
          oversightLevel: 'policy-checked' as any,
          oversightDescription: 'Human oversight description',
          linkedKPIs: ['KPI 1', 'KPI 2']
        })),
        humanCheckpoints: Array(4).fill(null).map((_, i) => ({
          checkpoint: ['Kick-off Workshop', 'Review Gates', 'Exception Escalations', 'Quarterly Tune-Up'][i],
          description: `Description for checkpoint ${i + 1}`,
          importance: `Importance for checkpoint ${i + 1}`,
          frequency: ['one-time', 'periodic', 'as-needed', 'periodic'][i] as any
        })),
        agenticTimeline: {
          totalDurationWeeks: 24,
          phases: [
            {
              phase: 'crawl',
              name: 'Proof of Concept',
              durationWeeks: 8,
              description: 'Initial testing phase',
              milestones: ['Milestone 1', 'Milestone 2'],
              riskMitigations: ['Risk mitigation 1', 'Risk mitigation 2'],
              oversightLevel: 'high',
              humanInvolvement: 'Direct supervision'
            },
            {
              phase: 'walk',
              name: 'Selective Automation',
              durationWeeks: 10,
              description: 'Expanded automation phase',
              milestones: ['Milestone 3', 'Milestone 4'],
              riskMitigations: ['Risk mitigation 3', 'Risk mitigation 4'],
              oversightLevel: 'medium',
              humanInvolvement: 'Exception-based review'
            },
            {
              phase: 'run',
              name: 'Full Automation',
              durationWeeks: 6,
              description: 'Complete autonomous operation',
              milestones: ['Milestone 5', 'Milestone 6'],
              riskMitigations: ['Risk mitigation 5', 'Risk mitigation 6'],
              oversightLevel: 'low',
              humanInvolvement: 'Strategic oversight only'
            }
          ]
        },
        // INVALID: Only 2 KPI improvements instead of required minimum 3
        kpiImprovements: [
          {
            kpi: 'Invoice processing time',
            currentValue: '5 days',
            targetValue: '2 days',
            improvementPercent: 60,
            linkedAgents: ['coordinator', 'actuator'],
            measurementMethod: 'Average time from receipt to payment',
            timeframe: 'Within 6 months'
          },
          {
            kpi: 'Data entry error rate',
            currentValue: '15%',
            targetValue: '2%',
            improvementPercent: 87,
            linkedAgents: ['quality-checker', 'analyst'],
            measurementMethod: 'Percentage of invoices requiring manual correction',
            timeframe: 'Within 4 months'
          }
        ]
      };

      const warnings = validateAgenticBlueprintResponse(invalidResponse);
      
      // Should fail validation due to insufficient KPI improvements
      expect(warnings).toContain('Should identify at least 3 KPI improvements');
    });

    it('should accept valid responses with exactly 3 KPI improvements', () => {
      const validResponse: AgenticBlueprintResponse = {
        businessObjective: 'Automate invoice processing to reduce manual work and improve accuracy',
        digitalTeam: Array(5).fill(null).map((_, i) => ({
          role: ['coordinator', 'researcher', 'analyst', 'quality-checker', 'actuator'][i] as any,
          title: ['Project Manager', 'Data Analyst', 'Process Consultant', 'Quality Auditor', 'Operations Specialist'][i],
          coreJob: `Job description for role ${i + 1}`,
          toolsUsed: ['Tool 1', 'Tool 2', 'Tool 3'],
          oversightLevel: 'policy-checked' as any,
          oversightDescription: 'Human oversight description',
          linkedKPIs: ['KPI 1', 'KPI 2']
        })),
        humanCheckpoints: Array(4).fill(null).map((_, i) => ({
          checkpoint: ['Kick-off Workshop', 'Review Gates', 'Exception Escalations', 'Quarterly Tune-Up'][i],
          description: `Description for checkpoint ${i + 1}`,
          importance: `Importance for checkpoint ${i + 1}`,
          frequency: ['one-time', 'periodic', 'as-needed', 'periodic'][i] as any
        })),
        agenticTimeline: {
          totalDurationWeeks: 24,
          phases: [
            {
              phase: 'crawl',
              name: 'Proof of Concept',
              durationWeeks: 8,
              description: 'Initial testing phase',
              milestones: ['Milestone 1', 'Milestone 2'],
              riskMitigations: ['Risk mitigation 1', 'Risk mitigation 2'],
              oversightLevel: 'high',
              humanInvolvement: 'Direct supervision'
            },
            {
              phase: 'walk',
              name: 'Selective Automation',
              durationWeeks: 10,
              description: 'Expanded automation phase',
              milestones: ['Milestone 3', 'Milestone 4'],
              riskMitigations: ['Risk mitigation 3', 'Risk mitigation 4'],
              oversightLevel: 'medium',
              humanInvolvement: 'Exception-based review'
            },
            {
              phase: 'run',
              name: 'Full Automation',
              durationWeeks: 6,
              description: 'Complete autonomous operation',
              milestones: ['Milestone 5', 'Milestone 6'],
              riskMitigations: ['Risk mitigation 5', 'Risk mitigation 6'],
              oversightLevel: 'low',
              humanInvolvement: 'Strategic oversight only'
            }
          ]
        },
        // VALID: Exactly 3 KPI improvements
        kpiImprovements: [
          {
            kpi: 'Invoice processing time',
            currentValue: '5 days',
            targetValue: '2 days',
            improvementPercent: 60,
            linkedAgents: ['coordinator', 'actuator'],
            measurementMethod: 'Average time from receipt to payment',
            timeframe: 'Within 6 months'
          },
          {
            kpi: 'Data entry error rate',
            currentValue: '15%',
            targetValue: '2%',
            improvementPercent: 87,
            linkedAgents: ['quality-checker', 'analyst'],
            measurementMethod: 'Percentage of invoices requiring manual correction',
            timeframe: 'Within 4 months'
          },
          {
            kpi: 'Vendor payment processing speed',
            currentValue: '10 days',
            targetValue: '3 days',
            improvementPercent: 70,
            linkedAgents: ['actuator', 'coordinator'],
            measurementMethod: 'Average days from approval to payment',
            timeframe: 'Within 8 months'
          }
        ]
      };

      const warnings = validateAgenticBlueprintResponse(validResponse);
      
      // Should not contain KPI-related warnings
      expect(warnings).not.toContain('Should identify at least 3 KPI improvements');
    });
  });

  describe('Industry Context Integration', () => {
    it('should include industry-specific guidance when enabled', () => {
      const config: AgenticBlueprintPromptConfig = {
        industry: 'Manufacturing',
        includeIndustryContext: true
      };

      const userPrompt = buildAgenticBlueprintUserPrompt(mockProfile, config);

      // Check for industry-specific guidance section
      expect(userPrompt).toContain('INDUSTRY-SPECIFIC GUIDANCE');
      expect(userPrompt).toContain('Manufacturing');
    });

    it('should not include industry guidance when disabled', () => {
      const config: AgenticBlueprintPromptConfig = {
        industry: 'Manufacturing',
        includeIndustryContext: false
      };

      const userPrompt = buildAgenticBlueprintUserPrompt(mockProfile, config);

      // Should not contain industry-specific guidance
      expect(userPrompt).not.toContain('INDUSTRY-SPECIFIC GUIDANCE');
    });
  });

  describe('Business Context Processing', () => {
    it('should include business context when provided', () => {
      const config: AgenticBlueprintPromptConfig = {
        businessContext: {
          complexityScore: 75,
          riskLevel: 'high',
          implementationReadiness: 'medium'
        }
      };

      const userPrompt = buildAgenticBlueprintUserPrompt(mockProfile, config);

      // Check for business context section
      expect(userPrompt).toContain('BUSINESS CONTEXT ANALYSIS');
      expect(userPrompt).toContain('complexity score: 75');
      expect(userPrompt).toContain('risk level: high');
      expect(userPrompt).toContain('readiness: medium');
    });
  });

  describe('Prompt Quality Metrics', () => {
    it('should generate substantial prompts for complex scenarios', () => {
      const config: AgenticBlueprintPromptConfig = {
        industry: 'Manufacturing',
        includeIndustryContext: true,
        enableChainOfThought: true,
        modelProvider: 'gemini',
        businessContext: {
          complexityScore: 80,
          riskLevel: 'high',
          implementationReadiness: 'low'
        },
        includeKPIProbability: true
      };

      const systemPrompt = buildAgenticBlueprintSystemPrompt(config);
      const userPrompt = buildAgenticBlueprintUserPrompt(mockProfile, config);

      // Verify prompts are comprehensive
      expect(systemPrompt.length).toBeGreaterThan(2000);
      expect(userPrompt.length).toBeGreaterThan(1000);

      // Check for all major sections
      expect(systemPrompt).toContain('CORE AGENTIC BLUEPRINT FRAMEWORK');
      expect(systemPrompt).toContain('PROGRESSIVE TRUST MODEL');
      expect(userPrompt).toContain('KPI IMPROVEMENTS');
      expect(userPrompt).toContain('DIGITAL TEAM');
      expect(userPrompt).toContain('IMPLEMENTATION TIMELINE');
    });
  });
}); 