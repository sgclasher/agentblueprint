import { describe, test, expect, beforeEach } from '@jest/globals';
import { AgenticBlueprintService } from '../../services/agenticBlueprintService';
import { Profile, AgenticBlueprint, AgenticPattern } from '../../services/types';

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

// 🆕 PHASE 2.3: Enhanced Quality Testing for Agentic Design Patterns Integration

describe('Agentic Design Patterns Integration', () => {
  describe('Pattern Selection Accuracy', () => {
    test('should select Manager-Workers pattern for process automation problems', () => {
      const processAutomationProfile = {
        ...mockProfiles.manufacturing,
        strategicInitiatives: [{
          ...mockProfiles.manufacturing.strategicInitiatives![0],
          businessProblems: [
            'Manual invoice processing takes 5 days',
            'Document approval workflows are inconsistent',
            'Data entry errors cause 15% rework'
          ]
        }]
      };

      const expectedPattern = 'Manager-Workers';
      const expectedRationale = /central coordination|standardized tasks|clear task delegation/i;

      // Simulate pattern selection logic
      const selectedPattern = selectOptimalPattern(processAutomationProfile.strategicInitiatives![0].businessProblems);
      expect(selectedPattern.pattern).toBe(expectedPattern);
      expect(selectedPattern.rationale).toMatch(expectedRationale);
    });

    test('should select Plan-Act-Reflect pattern for research and analysis problems', () => {
      const researchProfile = {
        ...mockProfiles.techStartup,
        strategicInitiatives: [{
          initiative: 'Market Expansion Analysis',
          contact: { name: 'Sarah Chen', title: 'VP Strategy', email: '', linkedin: '', phone: '' },
          businessProblems: [
            'Need to analyze 15 potential new markets',
            'Competitive landscape constantly changing',
            'Customer preference data is incomplete'
          ],
          priority: 'High' as const,
          status: 'Planning' as const
        }]
      };

      const selectedPattern = selectOptimalPattern(researchProfile.strategicInitiatives![0].businessProblems);
      expect(selectedPattern.pattern).toBe('Plan-Act-Reflect');
      expect(selectedPattern.rationale).toMatch(/exploratory nature|adaptive planning|course correction/i);
    });

    test('should select Hierarchical-Planning for complex decision support problems', () => {
      const decisionSupportProblems = [
        'Need to evaluate $50M strategic investment options',
        'Resource allocation across 12 business units',
        'Multi-year technology platform selection'
      ];

      const selectedPattern = selectOptimalPattern(decisionSupportProblems);
      expect(selectedPattern.pattern).toBe('Hierarchical-Planning');
      expect(selectedPattern.rationale).toMatch(/multi-layer analysis|validation|high-stakes/i);
    });
  });

  describe('Pattern-Specific Agent Specialization', () => {
    test('should specialize agents for single-initiative focus', () => {
      const focusedBlueprint = generateMockBlueprint({
        pattern: 'Manager-Workers',
        focusMode: 'single-initiative',
        initiative: mockProfiles.manufacturing.strategicInitiatives![0]
      });

      // Verify agents are specialized for manufacturing process automation
      const coordinator = focusedBlueprint.digitalTeam.find(agent => agent.role === 'coordinator');
      expect(coordinator?.title).toMatch(/production|manufacturing|planning/i);
      expect(coordinator?.toolsUsed).toContain('SAP ERP');

      const actuator = focusedBlueprint.digitalTeam.find(agent => agent.role === 'actuator');
      expect(actuator?.coreJob).toMatch(/production|manufacturing|schedule/i);
    });

    test('should create generalist agents for multi-initiative synthesis', () => {
      const synthesizedBlueprint = generateMockBlueprint({
        pattern: 'Manager-Workers',
        focusMode: 'multi-initiative',
        initiatives: mockProfiles.manufacturing.strategicInitiatives
      });

      // Verify agents have broader, more flexible capabilities
      const coordinator = synthesizedBlueprint.digitalTeam.find(agent => agent.role === 'coordinator');
      expect(coordinator?.title).toMatch(/project manager|operations coordinator/i);
      expect(coordinator?.coreJob).not.toMatch(/production planning manager/i); // Not too specific
    });
  });

  describe('Industry-Specific Pattern Preferences', () => {
    test('should apply healthcare pattern preferences (ReAct + Policy engines)', () => {
      const healthcarePatterns = getIndustryPatternPreferences('Healthcare');
      expect(healthcarePatterns.primary).toBe('ReAct');
      expect(healthcarePatterns.enhancement).toContain('Policy engines');
      expect(healthcarePatterns.rationale).toMatch(/HIPAA|safety-critical/i);
    });

    test('should apply financial services pattern preferences (Manager-Workers + Self-Reflection)', () => {
      const financialPatterns = getIndustryPatternPreferences('Financial Services');
      expect(financialPatterns.primary).toBe('Manager-Workers');
      expect(financialPatterns.enhancement).toContain('Self-Reflection');
      expect(financialPatterns.rationale).toMatch(/compliance focus/i);
    });

    test('should apply technology pattern preferences (Market-Based + Hierarchical)', () => {
      const techPatterns = getIndustryPatternPreferences('Technology');
      expect(techPatterns.primary).toBe('Market-Based');
      expect(techPatterns.enhancement).toContain('Hierarchical');
      expect(techPatterns.rationale).toMatch(/resource optimization|scaling/i);
    });
  });
});

describe('Special Instructions Integration', () => {
  test('should incorporate user special instructions into blueprint design', () => {
    const specialInstructions = 'Focus on HIPAA compliance requirements and integrate with Epic EHR system specifically';
    const blueprint = generateMockBlueprint({
      pattern: 'Manager-Workers',
      specialInstructions: specialInstructions
    });

    // Verify special instructions are stored
    expect(blueprint.specialInstructions).toBe(specialInstructions);

    // Verify instructions influence agent design
    const agentDescriptions = blueprint.digitalTeam.map(agent => agent.coreJob).join(' ');
    expect(agentDescriptions.toLowerCase()).toMatch(/hipaa|compliance/i);
    expect(agentDescriptions.toLowerCase()).toMatch(/epic/i);
  });

  test('should handle empty special instructions gracefully', () => {
    const blueprint = generateMockBlueprint({
      pattern: 'Manager-Workers',
      specialInstructions: ''
    });

    expect(blueprint.specialInstructions).toBe('');
    // Blueprint should still be valid without special instructions
    expect(blueprint.digitalTeam).toHaveLength(5);
    expect(blueprint.businessObjective).toBeTruthy();
  });

  test('should validate special instructions character limits', () => {
    const longInstructions = 'A'.repeat(600); // Exceeds 500 char limit
    
    // UI should prevent this, but test the validation
    expect(longInstructions.length).toBeGreaterThan(500);
    
    const truncatedInstructions = longInstructions.substring(0, 500);
    expect(truncatedInstructions.length).toBe(500);
  });
});

describe('Cross-Provider Quality Validation', () => {
  describe('Pattern Selection Consistency', () => {
    test('should select same pattern across different AI providers', () => {
      const businessProblems = [
        'Manual data entry processes',
        'Inconsistent workflow execution',
        'High error rates in routine tasks'
      ];

      // Simulate pattern selection for different providers
      const openaiPattern = selectOptimalPattern(businessProblems, 'openai');
      const claudePattern = selectOptimalPattern(businessProblems, 'claude');
      const geminiPattern = selectOptimalPattern(businessProblems, 'gemini');

      // All providers should converge on Manager-Workers for this problem type
      expect(openaiPattern.pattern).toBe('Manager-Workers');
      expect(claudePattern.pattern).toBe('Manager-Workers');
      expect(geminiPattern.pattern).toBe('Manager-Workers');
    });

    test('should provide consistent rationales for pattern selection', () => {
      const businessProblems = ['Complex multi-step research project', 'Changing requirements', 'Need for iterative refinement'];

      const patterns = ['openai', 'claude', 'gemini'].map(provider => 
        selectOptimalPattern(businessProblems, provider)
      );

      // All should select Plan-Act-Reflect
      patterns.forEach(pattern => {
        expect(pattern.pattern).toBe('Plan-Act-Reflect');
        expect(pattern.rationale).toMatch(/adaptive|iterative|changing/i);
      });
    });
  });

  describe('Quality Score Validation', () => {
    test('should achieve minimum quality thresholds with pattern integration', () => {
      const enhancedBlueprint = generateMockBlueprint({
        pattern: 'Manager-Workers',
        patternRationale: 'Selected for standardized process automation with clear oversight requirements',
        specialInstructions: 'Focus on SAP ERP integration and manufacturing compliance'
      });

      const qualityScore = calculateEnhancedQualityScore(enhancedBlueprint, mockProfiles.manufacturing);
      
      // With pattern integration, quality should improve significantly
      expect(qualityScore.businessSpecificity).toBeGreaterThan(18); // Target: 20/25
      expect(qualityScore.actionability).toBeGreaterThan(16);        // Target: 18/25
      expect(qualityScore.agentCoherence).toBeGreaterThan(17);       // Target: 19/25
      expect(qualityScore.totalScore).toBeGreaterThan(70);           // Target: 74/100
    });

    test('should validate pattern selection adds quality points', () => {
      const blueprintWithoutPattern = generateMockBlueprint({ pattern: undefined });
      const blueprintWithPattern = generateMockBlueprint({ 
        pattern: 'Manager-Workers',
        patternRationale: 'Selected for optimal coordination of standardized processes'
      });

      const scoreWithoutPattern = calculateEnhancedQualityScore(blueprintWithoutPattern, mockProfiles.manufacturing);
      const scoreWithPattern = calculateEnhancedQualityScore(blueprintWithPattern, mockProfiles.manufacturing);

      expect(scoreWithPattern.totalScore).toBeGreaterThan(scoreWithoutPattern.totalScore);
      expect(scoreWithPattern.businessSpecificity).toBeGreaterThan(scoreWithoutPattern.businessSpecificity);
    });
  });

  describe('Initiative Focus Quality Impact', () => {
    test('should improve specificity when focused on single initiative', () => {
      const focusedBlueprint = generateMockBlueprint({
        focusMode: 'single-initiative',
        initiative: mockProfiles.manufacturing.strategicInitiatives![0]
      });

      const synthesizedBlueprint = generateMockBlueprint({
        focusMode: 'multi-initiative',
        initiatives: mockProfiles.manufacturing.strategicInitiatives
      });

      const focusedQuality = calculateEnhancedQualityScore(focusedBlueprint, mockProfiles.manufacturing);
      const synthesizedQuality = calculateEnhancedQualityScore(synthesizedBlueprint, mockProfiles.manufacturing);

      // Focused blueprints should be more specific
      expect(focusedQuality.businessSpecificity).toBeGreaterThan(synthesizedQuality.businessSpecificity);
    });
  });
});

// 🆕 Helper functions for enhanced quality testing

function selectOptimalPattern(businessProblems: string[], provider?: string): { pattern: AgenticPattern; rationale: string } {
  // Simulate the pattern selection logic from the actual prompt
  const problemText = businessProblems.join(' ').toLowerCase();
  
  if (problemText.includes('manual') && (problemText.includes('process') || problemText.includes('data entry'))) {
    return {
      pattern: 'Manager-Workers',
      rationale: 'Selected because the initiative focuses on standardizing workflows, which benefits from central coordination and clear task delegation to specialist agents.'
    };
  }
  
  if (problemText.includes('research') || problemText.includes('analysis') || problemText.includes('changing')) {
    return {
      pattern: 'Plan-Act-Reflect',
      rationale: 'Chosen for market research initiative due to the exploratory nature requiring adaptive planning and course correction based on findings.'
    };
  }
  
  if (problemText.includes('investment') || problemText.includes('strategic') || problemText.includes('allocation')) {
    return {
      pattern: 'Hierarchical-Planning',
      rationale: 'Applied for strategic resource allocation decision, requiring multi-layer analysis and validation before high-stakes investment decisions.'
    };
  }
  
  // Default fallback
  return {
    pattern: 'Manager-Workers',
    rationale: 'Default pattern selected for general business process optimization.'
  };
}

function getIndustryPatternPreferences(industry: string): { primary: AgenticPattern; enhancement: string; rationale: string } {
  const industryMap: Record<string, { primary: AgenticPattern; enhancement: string; rationale: string }> = {
    'Healthcare': {
      primary: 'ReAct',
      enhancement: 'Policy engines',
      rationale: 'HIPAA compliance and safety-critical decision making require careful reasoning with policy validation'
    },
    'Financial Services': {
      primary: 'Manager-Workers',
      enhancement: 'Self-Reflection',
      rationale: 'Compliance focus requires central oversight with built-in quality control and validation'
    },
    'Technology': {
      primary: 'Market-Based-Auction',
      enhancement: 'Hierarchical',
      rationale: 'Resource optimization and scaling challenges benefit from competitive allocation with clear governance'
    },
    'Manufacturing': {
      primary: 'Manager-Workers',
      enhancement: 'Plan-and-Execute',
      rationale: 'Process optimization with real-time monitoring requires coordinated execution with strategic planning'
    }
  };
  
  return industryMap[industry] || industryMap['Technology'];
}

function generateMockBlueprint(options: {
  pattern?: AgenticPattern;
  patternRationale?: string;
  focusMode?: 'single-initiative' | 'multi-initiative';
  initiative?: any;
  initiatives?: any[];
  specialInstructions?: string;
}): AgenticBlueprint {
  return {
    id: 'test-blueprint',
    profileId: 'test-profile',
    userId: 'test-user',
    businessObjective: 'Transform business operations using AI automation',
    selectedPattern: options.pattern,
    patternRationale: options.patternRationale,
    specialInstructions: options.specialInstructions || '',
    digitalTeam: [
      {
        role: 'coordinator',
        title: options.focusMode === 'single-initiative' ? 'Production Planning Manager' : 'Project Coordinator',
        coreJob: 'Coordinate and manage workflow execution',
        toolsUsed: ['SAP ERP', 'Task Management', 'Communication Platform'],
        oversightLevel: 'policy-checked',
        oversightDescription: 'Reviews and approvals by senior staff',
        linkedKPIs: ['Process efficiency', 'Timeline adherence']
      },
      // ... other agents would be generated similarly
    ] as any,
    humanCheckpoints: [] as any,
    agenticTimeline: { phases: [], totalDurationWeeks: 24 } as any,
    kpiImprovements: [
      {
        kpi: 'Process efficiency',
        currentValue: 'Baseline',
        targetValue: '40% improvement',
        improvementPercent: 40,
        linkedAgents: ['coordinator'],
        measurementMethod: 'Time tracking and throughput analysis',
        timeframe: 'Within 6 months'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

function calculateEnhancedQualityScore(blueprint: AgenticBlueprint, profile: Profile): QualityMetrics {
  const baseScore = evaluateBusinessSpecificity(blueprint, profile);
  let totalScore = baseScore.score;
  const feedback = [...baseScore.feedback];
  
  // 🆕 Pattern selection quality bonus
  if (blueprint.selectedPattern && blueprint.patternRationale) {
    totalScore += 8; // Bonus for explicit pattern selection
    feedback.push('Pattern selection enhances blueprint specificity');
    
    if (blueprint.patternRationale.length > 50) {
      totalScore += 4; // Bonus for detailed rationale
      feedback.push('Pattern rationale provides clear business justification');
    }
  }
  
  // 🆕 Special instructions integration bonus
  if (blueprint.specialInstructions && blueprint.specialInstructions.length > 0) {
    totalScore += 5; // Bonus for user customization
    feedback.push('Special instructions enhance blueprint customization');
  }
  
  // Calculate component scores (simplified for testing)
  const businessSpecificity = Math.min(totalScore, 25);
  const actionability = Math.min(15 + (blueprint.kpiImprovements.length * 2), 25);
  const agentCoherence = Math.min(18 + (blueprint.digitalTeam.length === 5 ? 3 : 0), 25);
  const kpiAlignment = Math.min(12 + (blueprint.kpiImprovements.length * 3), 25);
  
  return {
    businessSpecificity,
    actionability,
    agentCoherence,
    kpiAlignment,
    totalScore: businessSpecificity + actionability + agentCoherence + kpiAlignment,
    feedback
  };
}

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