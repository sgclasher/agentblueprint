import { AIOpportunitiesService, AIOpportunity, AIOpportunitiesAnalysis } from '../aiOpportunitiesService';
import { Profile, StrategicInitiative, SystemApplication } from '../types';

// Mock the AI service
jest.mock('../aiService', () => ({
  aiService: {
    generateJson: jest.fn(),
    isConfigured: jest.fn()
  }
}));

// Mock the prompts
jest.mock('../../lib/llm/prompts/aiOpportunitiesPrompt', () => ({
  AI_OPPORTUNITIES_SYSTEM_PROMPT: 'Mock system prompt',
  AI_OPPORTUNITIES_USER_PROMPT: jest.fn(() => 'Mock user prompt'),
  validateAIOpportunitiesResponse: jest.fn()
}));

describe('AIOpportunitiesService', () => {
  // Sample test data
  const mockProfile: Profile = {
    id: 'test-profile-1',
    companyName: 'TechCorp Solutions',
    industry: 'Technology',
    employeeCount: '250-500',
    annualRevenue: '$50-100M',
    primaryLocation: 'San Francisco, CA',
    websiteUrl: 'https://techcorp.com',
    strategicInitiatives: [
      {
        initiative: 'Digital Transformation Program',
        contact: {
          name: 'Sarah Johnson',
          title: 'Chief Technology Officer',
          email: 'sarah.johnson@techcorp.com'
        },
        priority: 'High',
        status: 'In Progress',
        targetTimeline: '18 months',
        estimatedBudget: '$2-5M',
        businessProblems: [
          'Manual processes causing delays and errors',
          'Lack of real-time data visibility',
          'Customer service response time too slow'
        ],
        expectedOutcomes: [
          'Reduce operational costs by 30%',
          'Improve customer satisfaction scores',
          'Increase process efficiency by 50%'
        ],
        successMetrics: [
          'Customer satisfaction score >4.5/5',
          'Process completion time reduction',
          'Cost savings measurement'
        ]
      },
      {
        initiative: 'Data Analytics Platform',
        contact: {
          name: 'Mike Chen',
          title: 'Head of Data',
          email: 'mike.chen@techcorp.com'
        },
        priority: 'Medium',
        status: 'Planning',
        targetTimeline: '12 months',
        estimatedBudget: '$1-2M',
        businessProblems: [
          'Data silos across departments',
          'No predictive analytics capabilities',
          'Manual reporting processes'
        ],
        expectedOutcomes: [
          'Unified data platform',
          'Predictive insights for business decisions',
          'Automated reporting and dashboards'
        ],
        successMetrics: [
          'Data query response time <5 seconds',
          'Number of automated reports generated',
          'Business decision speed improvement'
        ]
      }
    ],
    systemsAndApplications: [
      {
        name: 'Salesforce CRM',
        category: 'Customer Relationship Management',
        vendor: 'Salesforce',
        version: 'Enterprise',
        criticality: 'High',
        description: 'Primary CRM system for sales and customer management'
      },
      {
        name: 'SAP ERP',
        category: 'Enterprise Resource Planning',
        vendor: 'SAP',
        version: 'S/4HANA',
        criticality: 'High',
        description: 'Core ERP system for finance, operations, and supply chain'
      },
      {
        name: 'Microsoft Azure',
        category: 'Cloud Infrastructure',
        vendor: 'Microsoft',
        version: 'Enterprise',
        criticality: 'High',
        description: 'Primary cloud platform for hosting applications and data'
      }
    ]
  };

  const mockAIResponse: AIOpportunitiesAnalysis = {
    executiveSummary: 'TechCorp Solutions shows strong AI readiness with well-defined strategic initiatives and robust technology infrastructure. Primary opportunities lie in process automation, intelligent data analytics, and customer experience enhancement.',
    opportunities: [
      {
        title: 'Intelligent Process Automation Platform',
        description: 'Deploy AI-powered workflow automation to eliminate manual processes, reduce errors, and accelerate task completion across departments.',
        category: 'Process Automation',
        businessImpact: {
          primaryMetrics: [
            'Process completion time reduction: 60-80%',
            'Error rate reduction: 90-95%',
            'Employee productivity increase: 40-50%',
            'Operational cost savings: $500K-800K annually'
          ],
          estimatedROI: '280-350% within 18 months',
          timeToValue: '6-9 months',
          confidenceLevel: 'High'
        },
        implementation: {
          complexity: 'Medium',
          timeframe: '6-12 months',
          prerequisites: [
            'Process mapping and documentation',
            'Change management planning',
            'Staff training program'
          ],
          riskFactors: [
            'User adoption resistance',
            'Integration complexity with legacy systems',
            'Data quality requirements'
          ]
        },
        relevantInitiatives: ['Digital Transformation Program'],
        aiTechnologies: [
          'Robotic Process Automation (RPA)',
          'Natural Language Processing',
          'Machine Learning Workflows',
          'Intelligent Document Processing'
        ]
      },
      {
        title: 'Predictive Analytics and Business Intelligence Hub',
        description: 'Create an AI-driven analytics platform that provides real-time insights, predictive modeling, and automated reporting across all business functions.',
        category: 'Data Analytics',
        businessImpact: {
          primaryMetrics: [
            'Decision-making speed improvement: 50-70%',
            'Forecast accuracy increase: 25-40%',
            'Report generation time reduction: 85-90%',
            'Data-driven revenue opportunities: $1M-2M annually'
          ],
          estimatedROI: '320-450% within 24 months',
          timeToValue: '9-12 months',
          confidenceLevel: 'High'
        },
        implementation: {
          complexity: 'High',
          timeframe: '12-18 months',
          prerequisites: [
            'Data governance framework',
            'Cloud infrastructure scaling',
            'Analytics team training'
          ],
          riskFactors: [
            'Data quality and consistency',
            'Integration with multiple systems',
            'Skill gap in advanced analytics'
          ]
        },
        relevantInitiatives: ['Data Analytics Platform', 'Digital Transformation Program'],
        aiTechnologies: [
          'Machine Learning Models',
          'Predictive Analytics',
          'Real-time Data Processing',
          'Natural Language Query',
          'Automated Insights Generation'
        ]
      }
    ],
    priorityRecommendations: [
      'Start with process automation pilot in high-volume, repetitive workflows',
      'Establish data governance framework before advanced analytics implementation',
      'Invest in change management and staff training programs',
      'Consider AI Center of Excellence to coordinate initiatives'
    ],
    industryContext: 'Technology companies are leading AI adoption with 85% planning major investments. Focus on competitive differentiation through customer experience and operational efficiency.',
    overallReadinessScore: 82,
    nextSteps: [
      'Conduct detailed process audit for automation candidates',
      'Assess data readiness and quality for analytics initiatives',
      'Develop AI governance and ethics framework',
      'Create pilot program roadmap with clear success metrics',
      'Identify AI technology partners and vendors',
      'Establish budget allocation for initial implementations'
    ],
    analysisMetadata: {
      generatedBy: 'AI',
      provider: 'openai',
      version: '1.0',
      analysisDate: new Date().toISOString(),
      profileDataHash: 'mock-hash',
      confidenceScore: 0.85
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('analyzeOpportunities', () => {
    it('should successfully analyze opportunities for a complete profile', async () => {
      const mockCredentialsRepo = {
        getCredentials: jest.fn().mockResolvedValue({ openai: { apiKey: 'test-key' } })
      };

      const { aiService } = require('../aiService');
      aiService.generateJson.mockResolvedValue(mockAIResponse);
      aiService.isConfigured.mockResolvedValue(true);

      const result = await AIOpportunitiesService.analyzeOpportunities(
        mockProfile,
        'test-user-id',
        mockCredentialsRepo,
        'openai'
      );

      expect(result).toEqual(mockAIResponse);
      expect(aiService.generateJson).toHaveBeenCalledTimes(1);
      expect(aiService.isConfigured).toHaveBeenCalledWith('test-user-id', mockCredentialsRepo, 'openai');
    });

    it('should handle profiles with no strategic initiatives', async () => {
      const profileWithoutInitiatives = {
        ...mockProfile,
        strategicInitiatives: []
      };

      const mockCredentialsRepo = {
        getCredentials: jest.fn().mockResolvedValue({ openai: { apiKey: 'test-key' } })
      };

      const { aiService } = require('../aiService');
      aiService.generateJson.mockResolvedValue({
        ...mockAIResponse,
        opportunities: [],
        overallReadinessScore: 45,
        executiveSummary: 'Limited strategic direction identified. Recommend developing clear AI strategy before implementation.'
      });
      aiService.isConfigured.mockResolvedValue(true);

      const result = await AIOpportunitiesService.analyzeOpportunities(
        profileWithoutInitiatives,
        'test-user-id',
        mockCredentialsRepo,
        'openai'
      );

      expect(result.overallReadinessScore).toBe(45);
      expect(result.opportunities).toHaveLength(0);
      expect(result.executiveSummary).toContain('Limited strategic direction');
    });

    it('should handle profiles with no systems/applications', async () => {
      const profileWithoutSystems = {
        ...mockProfile,
        systemsAndApplications: []
      };

      const mockCredentialsRepo = {
        getCredentials: jest.fn().mockResolvedValue({ openai: { apiKey: 'test-key' } })
      };

      const { aiService } = require('../aiService');
      aiService.generateJson.mockResolvedValue({
        ...mockAIResponse,
        overallReadinessScore: 58,
        executiveSummary: 'Strong strategic vision but limited technology infrastructure. Infrastructure assessment recommended.'
      });
      aiService.isConfigured.mockResolvedValue(true);

      const result = await AIOpportunitiesService.analyzeOpportunities(
        profileWithoutSystems,
        'test-user-id',
        mockCredentialsRepo,
        'openai'
      );

      expect(result.overallReadinessScore).toBe(58);
      expect(result.executiveSummary).toContain('Infrastructure assessment');
    });

    it('should throw error when AI service is not configured', async () => {
      const mockCredentialsRepo = {
        getCredentials: jest.fn().mockResolvedValue({})
      };

      const { aiService } = require('../aiService');
      aiService.isConfigured.mockResolvedValue(false);

      await expect(
        AIOpportunitiesService.analyzeOpportunities(
          mockProfile,
          'test-user-id',
          mockCredentialsRepo,
          'openai'
        )
      ).rejects.toThrow('No AI provider configured');
    });

    it('should handle AI service errors gracefully', async () => {
      const mockCredentialsRepo = {
        getCredentials: jest.fn().mockResolvedValue({ openai: { apiKey: 'test-key' } })
      };

      const { aiService } = require('../aiService');
      aiService.isConfigured.mockResolvedValue(true);
      aiService.generateJson.mockRejectedValue(new Error('AI service temporarily unavailable'));

      await expect(
        AIOpportunitiesService.analyzeOpportunities(
          mockProfile,
          'test-user-id',
          mockCredentialsRepo,
          'openai'
        )
      ).rejects.toThrow('AI service temporarily unavailable');
    });

    it('should validate AI response structure', async () => {
      const mockCredentialsRepo = {
        getCredentials: jest.fn().mockResolvedValue({ openai: { apiKey: 'test-key' } })
      };

      const { aiService } = require('../aiService');
      const { validateAIOpportunitiesResponse } = require('../../lib/llm/prompts/aiOpportunitiesPrompt');
      
      aiService.isConfigured.mockResolvedValue(true);
      aiService.generateJson.mockResolvedValue(mockAIResponse);
      validateAIOpportunitiesResponse.mockReturnValue([]);

      const result = await AIOpportunitiesService.analyzeOpportunities(
        mockProfile,
        'test-user-id',
        mockCredentialsRepo,
        'openai'
      );

      expect(validateAIOpportunitiesResponse).toHaveBeenCalledWith(mockAIResponse);
      expect(result).toEqual(mockAIResponse);
    });

    it('should handle invalid AI response structure', async () => {
      const mockCredentialsRepo = {
        getCredentials: jest.fn().mockResolvedValue({ openai: { apiKey: 'test-key' } })
      };

      const invalidResponse = {
        // Missing required fields
        opportunities: []
      };

      const { aiService } = require('../aiService');
      const { validateAIOpportunitiesResponse } = require('../../lib/llm/prompts/aiOpportunitiesPrompt');
      
      aiService.isConfigured.mockResolvedValue(true);
      aiService.generateJson.mockResolvedValue(invalidResponse);
      validateAIOpportunitiesResponse.mockReturnValue(['Missing executiveSummary field']);

      await expect(
        AIOpportunitiesService.analyzeOpportunities(
          mockProfile,
          'test-user-id',
          mockCredentialsRepo,
          'openai'
        )
      ).rejects.toThrow('Invalid AI response structure');
    });
  });

  describe('categorizeOpportunity', () => {
    it('should correctly categorize process automation opportunities', () => {
      const opportunity = {
        title: 'Automated Invoice Processing',
        description: 'Implement RPA for invoice processing workflows',
        aiTechnologies: ['Robotic Process Automation', 'OCR']
      };

      const category = AIOpportunitiesService.categorizeOpportunity(opportunity);
      expect(category).toBe('Process Automation');
    });

    it('should correctly categorize data analytics opportunities', () => {
      const opportunity = {
        title: 'Predictive Sales Analytics',
        description: 'Build machine learning models for sales forecasting',
        aiTechnologies: ['Machine Learning', 'Predictive Analytics']
      };

      const category = AIOpportunitiesService.categorizeOpportunity(opportunity);
      expect(category).toBe('Data Analytics');
    });

    it('should correctly categorize customer experience opportunities', () => {
      const opportunity = {
        title: 'AI-Powered Chatbot',
        description: 'Deploy conversational AI for customer support',
        aiTechnologies: ['Natural Language Processing', 'Conversational AI']
      };

      const category = AIOpportunitiesService.categorizeOpportunity(opportunity);
      expect(category).toBe('Customer Experience');
    });

    it('should default to workforce augmentation for unclear categories', () => {
      const opportunity = {
        title: 'General AI Assistant',
        description: 'AI tool to help employees with various tasks',
        aiTechnologies: ['General AI']
      };

      const category = AIOpportunitiesService.categorizeOpportunity(opportunity);
      expect(category).toBe('Workforce Augmentation');
    });
  });

  describe('calculateReadinessScore', () => {
    it('should calculate high readiness score for well-prepared profile', () => {
      const score = AIOpportunitiesService.calculateReadinessScore(mockProfile);
      
      expect(score).toBeGreaterThanOrEqual(70);
      expect(score).toBeLessThanOrEqual(100);
    });

    it('should calculate lower score for profile with limited strategic initiatives', () => {
      const limitedProfile = {
        ...mockProfile,
        strategicInitiatives: [mockProfile.strategicInitiatives![0]] // Only one initiative
      };

      const score = AIOpportunitiesService.calculateReadinessScore(limitedProfile);
      const fullScore = AIOpportunitiesService.calculateReadinessScore(mockProfile);
      
      expect(score).toBeLessThan(fullScore);
    });

    it('should calculate lower score for profile with no systems', () => {
      const noSystemsProfile = {
        ...mockProfile,
        systemsAndApplications: []
      };

      const score = AIOpportunitiesService.calculateReadinessScore(noSystemsProfile);
      const fullScore = AIOpportunitiesService.calculateReadinessScore(mockProfile);
      
      expect(score).toBeLessThan(fullScore);
    });

    it('should handle minimal profile gracefully', () => {
      const minimalProfile: Profile = {
        id: 'minimal',
        companyName: 'Test Company',
        industry: 'Technology'
      };

      const score = AIOpportunitiesService.calculateReadinessScore(minimalProfile);
      
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });

  describe('estimateROI', () => {
    it('should estimate higher ROI for process automation', () => {
      const opportunity: AIOpportunity = {
        title: 'Process Automation',
        description: 'Automate manual processes',
        category: 'Process Automation',
        businessImpact: {
          primaryMetrics: ['Efficiency improvement'],
          estimatedROI: '',
          timeToValue: '',
          confidenceLevel: 'High'
        },
        implementation: {
          complexity: 'Medium',
          timeframe: '6 months',
          prerequisites: [],
          riskFactors: []
        },
        relevantInitiatives: [],
        aiTechnologies: ['RPA']
      };

      const roi = AIOpportunitiesService.estimateROI(opportunity, mockProfile);
      
      expect(roi.percentage).toBeGreaterThan(200);
      expect(roi.timeframe).toContain('months');
    });

    it('should estimate conservative ROI for high complexity implementations', () => {
      const complexOpportunity: AIOpportunity = {
        title: 'Advanced AI System',
        description: 'Complex AI implementation',
        category: 'Data Analytics',
        businessImpact: {
          primaryMetrics: ['Advanced analytics'],
          estimatedROI: '',
          timeToValue: '',
          confidenceLevel: 'Medium'
        },
        implementation: {
          complexity: 'High',
          timeframe: '18 months',
          prerequisites: ['Many requirements'],
          riskFactors: ['High risk factors']
        },
        relevantInitiatives: [],
        aiTechnologies: ['Advanced ML']
      };

      const roi = AIOpportunitiesService.estimateROI(complexOpportunity, mockProfile);
      
      expect(roi.confidence).toBe('Medium');
      expect(parseInt(roi.timeframe)).toBeGreaterThan(12);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null/undefined profile gracefully', async () => {
      const mockCredentialsRepo = {
        getCredentials: jest.fn().mockResolvedValue({ openai: { apiKey: 'test-key' } })
      };

      await expect(
        AIOpportunitiesService.analyzeOpportunities(
          null as any,
          'test-user-id',
          mockCredentialsRepo,
          'openai'
        )
      ).rejects.toThrow();
    });

    it('should handle empty profile gracefully', async () => {
      const emptyProfile: Profile = {
        id: 'empty',
        companyName: ''
      };

      const mockCredentialsRepo = {
        getCredentials: jest.fn().mockResolvedValue({ openai: { apiKey: 'test-key' } })
      };

      const { aiService } = require('../aiService');
      aiService.isConfigured.mockResolvedValue(true);
      aiService.generateJson.mockResolvedValue({
        ...mockAIResponse,
        overallReadinessScore: 20,
        opportunities: [],
        executiveSummary: 'Insufficient profile data for meaningful AI opportunities analysis.',
        priorityRecommendations: ['Develop comprehensive business strategy'],
        industryContext: 'Limited industry context available',
        nextSteps: ['Gather more business requirements']
      });

      const result = await AIOpportunitiesService.analyzeOpportunities(
        emptyProfile,
        'test-user-id',
        mockCredentialsRepo,
        'openai'
      );

      expect(result.overallReadinessScore).toBeLessThan(30);
      expect(result.opportunities).toHaveLength(0);
    });

    it('should handle very large profiles without performance issues', async () => {
      // Create a profile with many initiatives and systems
      const largeProfile: Profile = {
        ...mockProfile,
        strategicInitiatives: Array(50).fill(null).map((_, i) => ({
          ...mockProfile.strategicInitiatives![0],
          initiative: `Initiative ${i + 1}`
        })),
        systemsAndApplications: Array(100).fill(null).map((_, i) => ({
          ...mockProfile.systemsAndApplications![0],
          name: `System ${i + 1}`
        }))
      };

      const mockCredentialsRepo = {
        getCredentials: jest.fn().mockResolvedValue({ openai: { apiKey: 'test-key' } })
      };

      const { aiService } = require('../aiService');
      aiService.isConfigured.mockResolvedValue(true);
      aiService.generateJson.mockResolvedValue({
        ...mockAIResponse,
        executiveSummary: 'Large enterprise profile with extensive strategic initiatives and systems infrastructure.',
        opportunities: mockAIResponse.opportunities,
        priorityRecommendations: mockAIResponse.priorityRecommendations,
        industryContext: mockAIResponse.industryContext,
        nextSteps: mockAIResponse.nextSteps
      });

      const startTime = Date.now();
      const result = await AIOpportunitiesService.analyzeOpportunities(
        largeProfile,
        'test-user-id',
        mockCredentialsRepo,
        'openai'
      );
      const endTime = Date.now();

      expect(result).toBeDefined();
      expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });
}); 