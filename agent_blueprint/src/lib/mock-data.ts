// ============================================================================
// MOCK DATA FOR BUSINESS PROFILE
// ============================================================================
// This file contains rich, realistic mock data that perfectly adheres to the
// interfaces defined in types.ts. This data powers the entire UI shell.

import {
  BusinessProfile,
  AIOpportunity,
  AIBlueprint,
  AnalysisData,
  SystemInventory,
  ContactDirectory,
  OverviewData,
} from './types';

// ============================================================================
// CORE BUSINESS PROFILE
// ============================================================================

export const mockBusinessProfile: BusinessProfile = {
  id: 'bp-001',
  companyName: 'TechFlow Solutions',
  industry: 'Software Development',
  size: 'Medium',
  revenue: '$15M - $50M',
  description: 'A mid-size software development company specializing in enterprise SaaS solutions.',
  strategicInitiatives: [
    {
      id: 'si-001',
      title: 'Digital Transformation Initiative',
      description: 'Modernize internal processes and customer-facing applications.',
      priority: 'High',
      status: 'In Progress',
      budget: '$2.5M',
      timeline: '18 months',
      expectedOutcomes: [
        'Reduce manual processing time by 60%',
        'Improve customer satisfaction scores by 25%'
      ],
      keyMetrics: ['Processing time reduction', 'Customer satisfaction score']
    }
  ],
  aiReadinessScore: 72,
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-12-20T14:45:00Z'
};

// ============================================================================
// AI OPPORTUNITIES
// ============================================================================

export const mockAIOpportunities: AIOpportunity[] = [
  {
    id: 'opp-001',
    title: 'Intelligent Document Processing System',
    description: 'Automate processing of contracts, invoices, and technical specifications.',
    category: 'Process Automation',
    priority: 'High',
    status: 'Approved',
    estimatedROI: '285%',
    timeToImplement: '16 weeks',
    complexityLevel: 'Medium',
    requiredResources: ['AI/ML Engineer (2 FTE)', 'Data Engineer (1 FTE)'],
    businessImpact: {
      costSavings: '$450K annually',
      efficiencyGains: '65% reduction in processing time',
      revenueIncrease: '$200K from faster client onboarding',
      riskReduction: '90% reduction in data entry errors',
      qualityImprovement: 'Consistent document classification'
    },
    recommendedPattern: 'Manager-Workers',
    riskLevel: 'Medium',
    successMetrics: ['Document processing time < 2 minutes', 'Data extraction accuracy > 95%']
  }
];

// ============================================================================
// AI BLUEPRINT
// ============================================================================

export const mockAIBlueprint: AIBlueprint = {
  id: 'bp-001',
  title: 'Intelligent Document Processing System',
  description: 'AI-powered system for automating document processing workflows.',
  opportunityId: 'opp-001',
  agenticPattern: 'Manager-Workers',
  executiveSummary: {
    overview: 'This blueprint outlines implementation of an intelligent document processing system.',
    keyBenefits: ['Reduce processing time by 95%', 'Eliminate 90% of data entry errors'],
    investmentRequired: '$485K total implementation cost',
    expectedROI: {
      totalInvestment: '$485,000',
      annualValue: '$1,050,000',
      roiPercentage: 285,
      paybackMonths: 10,
      processCostSavings: '$450,000 annual efficiency gains',
      laborReallocation: '$350,000 FTE capacity redeployment',
      riskAvoidance: '$200,000 compliance risk reduction',
      keyAssumptions: ['95% accuracy rate achieved within 3 months']
    },
    recommendedAction: 'Proceed with immediate implementation.',
    confidenceLevel: 'High'
  },
  digitalTeam: [
    {
      id: 'agent-001',
      name: 'Document Classification Manager',
      role: 'Orchestration Agent',
      responsibilities: ['Receive and analyze incoming documents', 'Coordinate specialized worker agents'],
      capabilities: ['Multi-format document ingestion', 'Document type classification'],
      tools: ['Document Classification ML Model', 'Workflow Orchestration Engine'],
      interactionPattern: 'Receives documents and distributes to appropriate specialist agents.'
    }
  ],
  implementation: {
    phases: [
      {
        id: 'phase-001',
        name: 'Foundation & Infrastructure',
        description: 'Set up core infrastructure and data pipelines.',
        durationWeeks: 6,
        deliverables: ['Cloud infrastructure', 'Document ingestion pipeline'],
        successCriteria: ['Infrastructure can handle 500 documents/hour'],
        dependencies: ['Cloud platform selection']
      }
    ],
    totalDurationWeeks: 18,
    humanCheckpoints: [
      {
        phase: 'Foundation & Infrastructure',
        description: 'Security and compliance review',
        approvalRequired: true,
        escalationCriteria: ['Security vulnerabilities identified'],
        reviewers: ['CISO', 'Compliance Officer']
      }
    ],
    prerequisites: ['Executive sponsorship and budget approval'],
    risks: ['Model accuracy may require additional training time']
  },
  riskAssessment: {
    technicalRisks: [
      {
        description: 'Document quality variations affecting accuracy',
        probability: 'Medium',
        impact: 'Medium',
        mitigation: 'Implement robust preprocessing'
      }
    ],
    businessRisks: [
      {
        description: 'User resistance to automated processing',
        probability: 'Low',
        impact: 'Medium',
        mitigation: 'Comprehensive change management program'
      }
    ],
    mitigationStrategies: ['Phased rollout with pilot testing'],
    contingencyPlans: ['Manual processing backup procedures']
  },
  successCriteria: {
    kpis: [
      {
        name: 'Document Processing Time',
        baseline: '45 minutes average',
        target: '<2 minutes',
        timeframe: '3 months post-deployment',
        measurementMethod: 'Automated system logging'
      }
    ],
    milestones: [
      {
        name: 'Infrastructure Deployment',
        description: 'Core system infrastructure operational',
        targetDate: '2025-02-15',
        dependencies: ['Budget approval']
      }
    ],
    qualitativeMetrics: ['User satisfaction with system performance']
  },
  createdAt: '2024-12-20T15:30:00Z'
};

// ============================================================================
// ANALYSIS DATA
// ============================================================================

export const mockAnalysisData: AnalysisData = {
  aiReadinessScore: {
    overall: 72,
    breakdown: {
      dataReadiness: 78,
      technicalInfrastructure: 68,
      organizationalReadiness: 75,
      skillsAndTalent: 65,
      governanceAndEthics: 70,
      changeManagement: 76
    },
    industryComparison: 68
  },
  maturityAssessment: {
    currentLevel: 'Developing',
    targetLevel: 'Advancing',
    gapAnalysis: ['Need to enhance AI/ML technical skills'],
    timeToTarget: '12-18 months'
  },
  capabilityGaps: [
    {
      area: 'AI/ML Technical Skills',
      currentState: 'Basic understanding',
      desiredState: 'Advanced AI/ML capabilities',
      priority: 'High',
      effortRequired: 'Significant training and hiring',
      recommendations: ['Hire 2-3 experienced AI/ML engineers']
    }
  ],
  recommendations: [
    {
      title: 'Establish AI Center of Excellence',
      description: 'Create dedicated team to drive AI initiatives.',
      priority: 'High',
      category: 'Organizational',
      timeframe: 'Short-term',
      effort: 'High',
      impact: 'High'
    }
  ],
  benchmarkData: {
    industryAverage: 65,
    topPerformers: 85,
    yourPosition: 72,
    improvementOpportunity: 'Strong foundation with clear path to top quartile'
  }
};

// ============================================================================
// SYSTEM INVENTORY
// ============================================================================

export const mockSystemInventory: SystemInventory = {
  systems: [
    {
      id: 'sys-001',
      name: 'Salesforce CRM',
      category: 'CRM',
      vendor: 'Salesforce',
      version: 'Enterprise Edition',
      description: 'Primary customer relationship management system.',
      users: 45,
      criticality: 'Critical',
      aiReadiness: 'Good',
      integrationCapability: ['REST API', 'Bulk API'],
      dataQuality: 'Good',
      lastUpdated: '2024-12-15'
    }
  ],
  integrationMap: [
    {
      id: 'int-001',
      sourceSystem: 'Salesforce CRM',
      targetSystem: 'NetSuite ERP',
      type: 'API',
      frequency: 'Real-time',
      dataVolume: '500 records/day',
      status: 'Active'
    }
  ],
  dataFlows: [
    {
      id: 'df-001',
      name: 'Customer Data Sync',
      source: 'Salesforce CRM',
      destination: 'NetSuite ERP',
      dataType: 'Customer records',
      frequency: 'Real-time',
      quality: 'Good',
      aiPotential: 'High'
    }
  ],
  recommendations: [
    {
      system: 'Salesforce CRM',
      recommendation: 'Implement Einstein AI features',
      priority: 'High',
      effort: 'Medium',
      benefit: 'Improved sales forecasting',
      aiEnablement: 'Native AI capabilities available'
    }
  ]
};

// ============================================================================
// CONTACT DIRECTORY
// ============================================================================

export const mockContactDirectory: ContactDirectory = {
  contacts: [
    {
      id: 'contact-001',
      name: 'Sarah Chen',
      title: 'Chief Technology Officer',
      department: 'Technology',
      email: 'sarah.chen@techflow.com',
      role: 'Executive Sponsor',
      aiEngagement: 'Champion',
      influence: 'High',
      expertise: ['Technology Strategy', 'AI/ML'],
      responsibilities: ['Technology roadmap', 'Innovation initiatives'],
      lastContact: '2024-12-18'
    }
  ],
  teams: [
    {
      id: 'team-001',
      name: 'AI Initiative Team',
      department: 'Technology',
      purpose: 'Drive AI adoption across the organization',
      members: ['contact-001'],
      lead: 'contact-001',
      aiRelevance: 'High',
      readinessLevel: 'Ready'
    }
  ],
  stakeholderMap: [
    {
      contactId: 'contact-001',
      influence: 'High',
      interest: 'High',
      strategy: 'Manage Closely',
      engagementPlan: 'Regular updates, involve in key decisions'
    }
  ]
};

// ============================================================================
// OVERVIEW DATA
// ============================================================================

export const mockOverviewData: OverviewData = {
  summary: {
    completionPercentage: 85,
    lastUpdated: '2024-12-20T14:45:00Z',
    totalOpportunities: 4,
    activeBlueprints: 1,
    implementationProgress: 25
  },
  quickStats: {
    aiReadinessScore: 72,
    totalROIPotential: '$2.1M annually',
    averageImplementationTime: '16 weeks',
    systemsAnalyzed: 5,
    stakeholdersEngaged: 5
  },
  recentActivity: [
    {
      id: 'activity-001',
      type: 'Blueprint Generated',
      description: 'AI Blueprint created for Document Processing System',
      timestamp: '2024-12-20T15:30:00Z'
    }
  ],
  upcomingMilestones: [
    {
      name: 'Infrastructure Deployment',
      description: 'Core system infrastructure operational',
      targetDate: '2025-02-15',
      dependencies: ['Budget approval']
    }
  ],
  alerts: [
    {
      id: 'alert-001',
      type: 'Success',
      title: 'Blueprint Generated Successfully',
      message: 'AI Blueprint ready for review.',
      actionRequired: false,
      timestamp: '2024-12-20T15:30:00Z'
    }
  ],
  progressIndicators: [
    {
      name: 'AI Readiness Score',
      current: 72,
      target: 85,
      unit: 'points',
      trend: 'Up',
      status: 'On Track'
    }
  ]
}; 