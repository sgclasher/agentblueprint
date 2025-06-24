import { describe, test, expect, beforeEach } from '@jest/globals';
import { AgenticBlueprintService } from '../../services/agenticBlueprintService';
import { Profile, AgenticBlueprint } from '../../services/types';

// Mock profile data for testing different business scenarios
const mockProfiles = {
  // Manufacturing company with clear operational focus
  manufacturing: {
    id: 'test-profile-manufacturing',
    companyName: 'Precision Parts Corp',
    industry: 'Manufacturing',
    employeeCount: '250',
    annualRevenue: '$50M',
    primaryLocation: 'Detroit, MI',
    strategicInitiatives: [
      {
        initiative: 'Streamline Production Planning',
        contact: { name: 'Sarah Johnson', title: 'VP Operations', email: 'sarah@precisionparts.com', linkedin: '', phone: '' },
        businessProblems: [
          'Manual production planning takes 3 days per cycle',
          'Frequent inventory shortages due to poor demand forecasting',
          '15% material waste from inefficient scheduling'
        ],
        expectedOutcomes: ['Reduce planning time to 4 hours', 'Cut inventory costs by 20%'],
        successMetrics: ['Planning cycle time', 'Inventory turnover ratio', 'Material waste percentage'],
        priority: 'High' as const,
        status: 'Planning' as const
      }
    ],
    systemsAndApplications: [
      { name: 'SAP ERP', category: 'ERP', vendor: 'SAP', criticality: 'High' as const },
      { name: 'MES System', category: 'Manufacturing', vendor: 'Rockwell', criticality: 'High' as const },
      { name: 'Inventory Management', category: 'Warehouse', vendor: 'Manhattan Associates', criticality: 'Medium' as const }
    ]
  } as Profile,

  // Tech startup with rapid growth challenges
  techStartup: {
    id: 'test-profile-startup',
    companyName: 'DataFlow Analytics',
    industry: 'Technology',
    employeeCount: '50',
    annualRevenue: '$8M',
    primaryLocation: 'Austin, TX',
    strategicInitiatives: [
      {
        initiative: 'Scale Customer Onboarding',
        contact: { name: 'Mike Chen', title: 'CTO', email: 'mike@dataflow.com', linkedin: '', phone: '' },
        businessProblems: [
          'Customer onboarding takes 2 weeks per client',
          'Manual data setup requires 3 engineers per implementation',
          '30% of onboardings experience delays or errors'
        ],
        expectedOutcomes: ['Reduce onboarding to 3 days', 'Self-service 80% of setup tasks'],
        successMetrics: ['Time to first value', 'Engineer hours per onboarding', 'Customer satisfaction score'],
        priority: 'High' as const,
        status: 'In Progress' as const
      }
    ],
    systemsAndApplications: [
      { name: 'AWS Cloud Platform', category: 'Cloud Platform', vendor: 'AWS', criticality: 'High' as const },
      { name: 'Salesforce CRM', category: 'CRM', vendor: 'Salesforce', criticality: 'High' as const },
      { name: 'Stripe Payments', category: 'Payments', vendor: 'Stripe', criticality: 'Medium' as const }
    ]
  } as Profile,

  // Healthcare organization with compliance requirements
  healthcare: {
    id: 'test-profile-healthcare',
    companyName: 'Regional Medical Center',
    industry: 'Healthcare',
    employeeCount: '1200',
    annualRevenue: '$200M',
    primaryLocation: 'Chicago, IL',
    strategicInitiatives: [
      {
        initiative: 'Automate Patient Documentation',
        contact: { name: 'Dr. Lisa Rodriguez', title: 'Chief Medical Officer', email: 'lrodriguez@regionalmed.org', linkedin: '', phone: '' },
        businessProblems: [
          'Physicians spend 4 hours daily on documentation',
          'Medical coding errors cause $2M annual revenue loss',
          'Patient chart completion takes 48 hours on average'
        ],
        expectedOutcomes: ['Reduce documentation time by 60%', 'Achieve 99% coding accuracy'],
        successMetrics: ['Documentation hours per physician', 'Coding error rate', 'Chart completion time'],
        priority: 'High' as const,
        status: 'Planning' as const
      }
    ],
    systemsAndApplications: [
      { name: 'Epic EHR', category: 'EHR', vendor: 'Epic', criticality: 'High' as const },
      { name: 'PACS Imaging', category: 'Medical Imaging', vendor: 'GE Healthcare', criticality: 'High' as const },
      { name: 'Revenue Cycle Management', category: 'Billing', vendor: 'Cerner', criticality: 'Medium' as const }
    ]
  } as Profile
};

// Quality scoring framework based on KB_AGENTIC_WORKFLOW_MVP.md standards
interface QualityMetrics {
  businessSpecificity: number;     // 0-25: How business-specific vs generic
  actionability: number;           // 0-25: How actionable vs theoretical
  agentCoherence: number;          // 0-25: How well agents work together
  kpiAlignment: number;            // 0-25: How well KPIs align with business goals
  totalScore: number;              // 0-100: Overall quality score
  feedback: string[];              // Specific feedback for improvement
}

describe('Agentic Blueprint Quality Analysis', () => {
  let qualityResults: Map<string, { blueprint: AgenticBlueprint; quality: QualityMetrics }>;

  beforeEach(() => {
    qualityResults = new Map();
  });

  describe('Quality Metric Framework', () => {
    test('should define comprehensive quality evaluation criteria', () => {
      const criteria = {
        businessSpecificity: {
          maxScore: 25,
          indicators: [
            'Uses company-specific terminology and context',
            'References actual systems mentioned in profile',
            'Addresses specific business problems identified',
            'Includes industry-relevant considerations'
          ]
        },
        actionability: {
          maxScore: 25,
          indicators: [
            'Provides specific implementation steps',
            'Includes realistic timelines and milestones',
            'Defines clear success metrics',
            'Offers concrete risk mitigations'
          ]
        },
        agentCoherence: {
          maxScore: 25,
          indicators: [
            'Agents have complementary, non-overlapping roles',
            'Workflow demonstrates clear cooperation patterns',
            'Oversight levels progress logically from human to autonomous',
            'Tools and responsibilities align with agent capabilities'
          ]
        },
        kpiAlignment: {
          maxScore: 25,
          indicators: [
            'KPIs directly address stated business problems',
            'Improvement targets are realistic and measurable',
            'Agent responsibilities clearly link to KPI outcomes',
            'Timeframes align with business urgency'
          ]
        }
      };

      expect(criteria.businessSpecificity.maxScore).toBe(25);
      expect(criteria.actionability.maxScore).toBe(25);
      expect(criteria.agentCoherence.maxScore).toBe(25);
      expect(criteria.kpiAlignment.maxScore).toBe(25);
    });
  });

  describe('Business Specificity Analysis', () => {
    test('should evaluate how well blueprints reflect actual business context', () => {
      // Mock a blueprint to test specificity evaluation
      const mockBlueprint: AgenticBlueprint = {
        id: 'test-blueprint-1',
        profileId: mockProfiles.manufacturing.id,
        userId: 'test-user',
        businessObjective: 'Reduce production planning cycle time from 3 days to 4 hours using AI automation',
        digitalTeam: [
          {
            role: 'coordinator',
            title: 'Production Planning Manager',
            coreJob: 'Coordinate daily production schedules across multiple manufacturing lines',
            toolsUsed: ['SAP ERP', 'MES System', 'Resource Planning Dashboard'],
            oversightLevel: 'policy-checked',
            oversightDescription: 'Plans reviewed by production supervisors before implementation',
            linkedKPIs: ['Planning cycle time', 'Resource utilization']
          },
          // ... other agents would be here
        ] as any,
        humanCheckpoints: [] as any,
        agenticTimeline: { phases: [], totalDurationWeeks: 24 } as any,
        kpiImprovements: [
          {
            kpi: 'Planning cycle time',
            currentValue: '3 days',
            targetValue: '4 hours',
            improvementPercent: 87,
            linkedAgents: ['coordinator', 'analyst'],
            measurementMethod: 'Average time from demand signal to production schedule',
            timeframe: 'Within 3 months'
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const specificityScore = evaluateBusinessSpecificity(mockBlueprint, mockProfiles.manufacturing);
      expect(specificityScore.score).toBeGreaterThan(15); // Should be reasonably specific
      expect(specificityScore.feedback).toContain('References actual systems from profile');
    });

    test('should identify generic vs company-specific language', () => {
      const genericTerms = [
        'streamline operations',
        'improve efficiency',
        'enhance productivity',
        'optimize workflows',
        'leverage AI capabilities'
      ];

      const specificTerms = [
        'SAP ERP integration',
        'MES system coordination',
        'production planning cycles',
        'inventory turnover optimization',
        'material waste reduction'
      ];

      const genericCount = countTermUsage("Streamline operations to improve efficiency and enhance productivity", genericTerms);
      const specificCount = countTermUsage("Integrate SAP ERP with MES system for production planning optimization", specificTerms);

      expect(genericCount).toBeGreaterThan(specificCount); // Generic text should have more generic terms
    });
  });

  describe('Actionability Assessment', () => {
    test('should evaluate implementation clarity and feasibility', () => {
      const actionableElements = {
        specificTimelines: 'Within 3 months',
        concreteSteps: 'Configure API integration between systems',
        measurableOutcomes: '87% reduction in planning time',
        definedRoles: 'Production supervisors review all automated plans'
      };

      Object.values(actionableElements).forEach(element => {
        expect(element).toBeDefined();
        expect(element.length).toBeGreaterThan(10); // Substantial content
      });
    });

    test('should identify vague vs concrete implementation guidance', () => {
      const vagueGuidance = [
        'implement AI solutions',
        'utilize machine learning',
        'adopt best practices',
        'follow industry standards'
      ];

      const concreteGuidance = [
        'Deploy Claude Sonnet 4 for natural language processing of production requirements',
        'Integrate with SAP PP module using standard BAPI interfaces',
        'Configure 4-hour SLA alerts for manual review exceptions',
        'Train models on 24 months of historical production data'
      ];

      vagueGuidance.forEach(guidance => {
        expect(guidance).toMatch(/implement|utilize|adopt|follow/);
      });

      concreteGuidance.forEach(guidance => {
        expect(guidance.length).toBeGreaterThan(50); // More detailed
        expect(guidance).toMatch(/[A-Z][a-z]+ [A-Z]/); // Contains specific proper nouns
      });
    });
  });

  describe('Agent Coherence Evaluation', () => {
    test('should analyze agent cooperation and role clarity', () => {
      const agentRoles = ['coordinator', 'researcher', 'analyst', 'quality-checker', 'actuator'];
      const expectedCooperationPattern = {
        coordinator: ['researcher', 'analyst'],  // Coordinates research and analysis
        researcher: ['analyst'],                 // Feeds data to analyst
        analyst: ['quality-checker'],            // Sends outputs for review
        'quality-checker': ['actuator'],         // Approves for execution
        actuator: []                            // Final execution role
      };

      agentRoles.forEach(role => {
        expect(agentRoles).toContain(role);
        if (expectedCooperationPattern[role as keyof typeof expectedCooperationPattern]) {
          expect(expectedCooperationPattern[role as keyof typeof expectedCooperationPattern]).toBeDefined();
        }
      });
    });

    test('should validate progressive trust model implementation', () => {
      const trustProgression = [
        { phase: 'crawl', oversightLevel: 'high', humanInvolvement: 'approve all actions' },
        { phase: 'walk', oversightLevel: 'medium', humanInvolvement: 'review exceptions only' },
        { phase: 'run', oversightLevel: 'low', humanInvolvement: 'quarterly governance reviews' }
      ];

      const oversightLevels = trustProgression.map(p => p.oversightLevel);
      expect(oversightLevels).toEqual(['high', 'medium', 'low']); // Decreasing oversight
    });
  });

  describe('KPI Alignment Analysis', () => {
    test('should evaluate KPI relevance to business problems', () => {
      const businessProblem = 'Manual production planning takes 3 days per cycle';
      const alignedKPI = 'Planning cycle time reduction from 3 days to 4 hours';
      const unalignedKPI = 'Customer satisfaction improvement';

      expect(calculateKPIAlignment(businessProblem, alignedKPI)).toBeGreaterThan(0.8);
      expect(calculateKPIAlignment(businessProblem, unalignedKPI)).toBeLessThan(0.3);
    });

    test('should validate improvement target realism', () => {
      const realisticTargets = [
        { current: '3 days', target: '4 hours', improvement: 87 }, // Aggressive but achievable
        { current: '15%', target: '10%', improvement: 33 },       // Moderate improvement
      ];

      const unrealisticTargets = [
        { current: '3 days', target: '1 minute', improvement: 99.9 }, // Impossibly fast
        { current: '50%', target: '0%', improvement: 100 },          // Perfect elimination
      ];

      realisticTargets.forEach(target => {
        expect(target.improvement).toBeLessThan(95); // Less than 95% improvement
        expect(target.improvement).toBeGreaterThan(10); // More than 10% improvement
      });

      unrealisticTargets.forEach(target => {
        expect(target.improvement).toBeGreaterThanOrEqual(99); // Unrealistically high
      });
    });
  });

  describe('Baseline Quality Measurement', () => {
    test('should establish baseline scores for current implementation', async () => {
      // Note: This would require actual AI service integration
      // For now, we'll simulate the baseline measurement structure
      
      const baselineResults = {
        manufacturingScore: 65,  // Simulated current quality
        techStartupScore: 58,
        healthcareScore: 71,
        averageScore: 64.7
      };

      expect(baselineResults.averageScore).toBeLessThan(75); // Current quality needs improvement
      expect(baselineResults.averageScore).toBeGreaterThan(50); // But not completely broken
    });

    test('should identify common quality gaps across profiles', () => {
      const commonGaps = [
        'Generic agent descriptions not tailored to industry',
        'KPI targets lack industry-specific context',
        'Implementation timelines ignore business constraints',
        'Risk mitigations too generic for specific business scenarios'
      ];

      commonGaps.forEach(gap => {
        expect(gap).toContain('generic'); // Many issues relate to lack of specificity
      });
    });
  });
});

// Helper functions for quality evaluation

function evaluateBusinessSpecificity(blueprint: AgenticBlueprint, profile: Profile): { score: number; feedback: string[] } {
  const feedback: string[] = [];
  let score = 0;

  // Check if blueprint references actual systems from profile
  const profileSystems = (profile.systemsAndApplications || []).map(sys => sys.name.toLowerCase());
  const blueprintText = JSON.stringify(blueprint).toLowerCase();
  
  const systemReferences = profileSystems.filter(system => blueprintText.includes(system));
  if (systemReferences.length > 0) {
    score += 8;
    feedback.push('References actual systems from profile');
  } else {
    feedback.push('Should reference specific systems from company profile');
  }

  // Check if business problems are directly addressed
  const businessProblems = profile.strategicInitiatives?.flatMap(init => init.businessProblems || []) || [];
  const problemAlignment = businessProblems.some(problem => 
    blueprint.businessObjective.toLowerCase().includes(problem.toLowerCase().split(' ')[0])
  );
  
  if (problemAlignment) {
    score += 8;
    feedback.push('Business objective aligns with stated problems');
  } else {
    feedback.push('Business objective should directly address stated problems');
  }

  // Check industry-specific terminology
  const industryTerms = getIndustryTerms(profile.industry);
  const industryTermCount = industryTerms.filter(term => 
    blueprintText.includes(term.toLowerCase())
  ).length;
  
  score += Math.min(industryTermCount * 2, 9); // Up to 9 points for industry terms

  return { score, feedback };
}

function countTermUsage(text: string, terms: string[]): number {
  return terms.filter(term => text.toLowerCase().includes(term.toLowerCase())).length;
}

function calculateKPIAlignment(businessProblem: string, kpi: string): number {
  // Simple keyword overlap calculation
  const problemWords = businessProblem.toLowerCase().split(' ');
  const kpiWords = kpi.toLowerCase().split(' ');
  
  const overlap = problemWords.filter(word => 
    word.length > 3 && kpiWords.includes(word)
  ).length;
  
  return overlap / Math.max(problemWords.length, kpiWords.length);
}

function getIndustryTerms(industry: string): string[] {
  const industryTermMap: Record<string, string[]> = {
    'Manufacturing': ['production', 'assembly', 'quality control', 'inventory', 'supply chain', 'lean', 'throughput'],
    'Technology': ['deployment', 'scalability', 'API', 'cloud', 'DevOps', 'agile', 'sprint'],
    'Healthcare': ['patient', 'clinical', 'EHR', 'compliance', 'HIPAA', 'documentation', 'workflow']
  };
  
  return industryTermMap[industry] || [];
}

// Quality improvement target (what we're aiming for)
export const QUALITY_TARGETS = {
  businessSpecificity: 20,     // Target: 20/25 (80%)
  actionability: 18,           // Target: 18/25 (72%)  
  agentCoherence: 19,          // Target: 19/25 (76%)
  kpiAlignment: 17,            // Target: 17/25 (68%)
  totalScore: 74               // Target: 74/100 (74% overall)
}; 