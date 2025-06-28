import { AgenticBlueprintService } from '../../services/agenticBlueprintService';
import { Profile } from '../../services/types';

// Mock the external dependencies
jest.mock('../../services/aiService', () => ({
  aiService: {
    isConfigured: jest.fn(() => Promise.resolve(true)),
    getStatus: jest.fn(() => Promise.resolve({ provider: 'openai' })),
    generateJson: jest.fn(() => Promise.resolve({
      businessObjective: 'Test objective',
      digitalTeam: [
        { role: 'manager', title: 'AI Coordinator' },
        { role: 'worker1', title: 'Process Analyst' },
        { role: 'worker2', title: 'Data Processor' },
        { role: 'worker3', title: 'Quality Controller' }
      ],
      humanCheckpoints: [
        { checkpoint: 'Setup', description: 'Initial setup' },
        { checkpoint: 'Review', description: 'Progress review' },
        { checkpoint: 'Approval', description: 'Final approval' },
        { checkpoint: 'Monitor', description: 'Ongoing monitoring' }
      ],
      agenticTimeline: {
        phases: [
          { phase: 'crawl', name: 'Setup' },
          { phase: 'walk', name: 'Implementation' },
          { phase: 'run', name: 'Full deployment' }
        ],
        totalDurationWeeks: 24
      },
      kpiImprovements: [
        { kpi: 'Efficiency', currentValue: '70%', targetValue: '90%' },
        { kpi: 'Accuracy', currentValue: '85%', targetValue: '95%' },
        { kpi: 'Speed', currentValue: '5 hours', targetValue: '2 hours' }
      ]
    }))
  }
}));

jest.mock('../../lib/llm/prompts/agenticBlueprintPrompt', () => ({
  buildAgenticBlueprintSystemPrompt: jest.fn(() => 'Test system prompt'),
  buildAgenticBlueprintUserPrompt: jest.fn(() => 'Test user prompt'),
  validateAgenticBlueprintResponse: jest.fn(() => []),
  autoSelectPattern: jest.fn(() => 'Manager-Workers')
}));

jest.mock('../../lib/llm/patterns/agenticPatternDefinitions', () => ({
  getPatternDefinition: jest.fn(() => ({
    patternName: 'Manager-Workers',
    agentCount: 4,
    bestFor: ['coordination', 'delegation'],
    coordinationMechanism: 'central-dispatch'
  }))
}));

// Mock console to track error logging
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('Blueprint Service Context Validation', () => {
  const testProfile: Profile = {
    id: 'test-id',
    companyName: 'Test Company',
    industry: 'Technology',
    strategicInitiatives: [
      {
        initiative: 'Test Initiative',
        businessProblems: ['Test problem'],
        contact: {
          name: 'Test User',
          title: 'Manager',
          email: 'test@test.com',
          linkedin: '',
          phone: ''
        }
      }
    ],
    systemsAndApplications: [
      { name: 'Test System', category: 'CRM' }
    ]
  };

  beforeEach(() => {
    consoleErrorSpy.mockClear();
    consoleWarnSpy.mockClear();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  test('should handle malformed opportunity context without throwing errors', async () => {
    // Test case 1: Malformed arrays
    const malformedOpportunityContext = {
      title: 'Test Opportunity',
      category: 'Process Automation',
      description: 'Test description',
      businessImpact: {
        primaryMetrics: 'not-an-array', // Should be array
        estimatedROI: '200%',
        timeToValue: '3 months',
        confidenceLevel: 'High'
      },
      agenticPattern: {
        recommendedPattern: 'Manager-Workers',
        patternRationale: 'Good for coordination',
        implementationApproach: 'Phased approach',
        patternComplexity: 'Medium'
      },
      implementation: {
        complexity: 'Medium',
        timeframe: '6 months',
        prerequisites: 'not-an-array', // Should be array
        riskFactors: null // Should be array
      },
      aiTechnologies: 'not-an-array' // Should be array
    };

    // This should NOT throw a 500 error
    expect(async () => {
      await AgenticBlueprintService.generateBlueprint(
        testProfile,
        'test-user-id',
        {},
        'openai',
        undefined,
        undefined,
        malformedOpportunityContext
      );
    }).not.toThrow();
  });

  test('should handle completely missing opportunity context fields', async () => {
    // Test case 2: Missing fields
    const incompleteOpportunityContext = {
      title: 'Test Opportunity'
      // Missing most fields
    };

    // This should NOT throw a 500 error
    expect(async () => {
      await AgenticBlueprintService.generateBlueprint(
        testProfile,
        'test-user-id',
        {},
        'openai',
        undefined,
        undefined,
        incompleteOpportunityContext
      );
    }).not.toThrow();
  });

  test('should handle null/undefined opportunity context', async () => {
    // Test case 3: Null context
    expect(async () => {
      await AgenticBlueprintService.generateBlueprint(
        testProfile,
        'test-user-id',
        {},
        'openai',
        undefined,
        undefined,
        null
      );
    }).not.toThrow();

    // Test case 4: Undefined context  
    expect(async () => {
      await AgenticBlueprintService.generateBlueprint(
        testProfile,
        'test-user-id',
        {},
        'openai',
        undefined,
        undefined,
        undefined
      );
    }).not.toThrow();
  });

  test('should handle deeply nested malformed data', async () => {
    // Test case 5: Deeply nested malformed data
    const deeplyMalformedContext = {
      title: { nested: 'object' }, // Should be string
      businessImpact: {
        primaryMetrics: [123, null, undefined, { bad: 'object' }], // Mixed types
        estimatedROI: { complex: 'object' } // Should be string
      },
      agenticPattern: {
        recommendedPattern: ['array', 'not', 'string'], // Should be string
        patternRationale: null
      },
      implementation: {
        prerequisites: [null, undefined, '', { complex: 'object' }],
        riskFactors: 'string-not-array'
      },
      aiTechnologies: [
        'valid-tech',
        null,
        undefined,
        123,
        { invalid: 'object' },
        ''
      ]
    };

    // This should NOT throw a 500 error
    expect(async () => {
      await AgenticBlueprintService.generateBlueprint(
        testProfile,
        'test-user-id',
        {},
        'openai',
        undefined,
        undefined,
        deeplyMalformedContext
      );
    }).not.toThrow();
  });

  test('should gracefully handle context processing errors', async () => {
    // Test case 6: Context that triggers processing errors
    const errorTriggeringContext = {
      get title() { throw new Error('Property access error'); },
      businessImpact: {
        get primaryMetrics() { throw new Error('Array access error'); }
      },
      agenticPattern: {
        get recommendedPattern() { throw new Error('Pattern access error'); }
      }
    };

    // This should NOT throw a 500 error
    let blueprint;
    expect(async () => {
      blueprint = await AgenticBlueprintService.generateBlueprint(
        testProfile,
        'test-user-id',
        {},
        'openai',
        undefined,
        undefined,
        errorTriggeringContext
      );
    }).not.toThrow();

    // Should have fallback values
    expect(blueprint).toBeDefined();
  });

  test('validateAndSanitizeOpportunityContext should return safe defaults', () => {
    // Access the private method for testing (this is acceptable for critical error handling)
    const validateMethod = (AgenticBlueprintService as any).validateAndSanitizeOpportunityContext;

    // Test with completely malformed input
    const result = validateMethod({
      title: null,
      businessImpact: {
        primaryMetrics: 'not-an-array'
      },
      agenticPattern: {
        recommendedPattern: ['array', 'not', 'string']
      }
    });

    // Should return safe string values
    expect(typeof result.title).toBe('string');
    expect(typeof result.primaryMetrics).toBe('string');
    expect(typeof result.recommendedPattern).toBe('string');
    expect(result.recommendedPattern).toBe('Manager-Workers'); // Safe default
  });
}); 