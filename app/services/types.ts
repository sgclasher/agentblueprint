export interface Profile {
    id: string;
    companyName: string;
    industry: string;
    employeeCount?: string;
    annualRevenue?: string;
    primaryLocation?: string;
    websiteUrl?: string;
    strategicInitiatives?: StrategicInitiative[];
    systemsAndApplications?: SystemApplication[];
    markdown?: string;
    createdAt?: string;
    updatedAt?: string;
    status?: 'draft' | 'complete';
    [key: string]: any;
}

export interface Timeline {
    phases: any[];
    riskFactors: any[];
    competitiveContext: any;
    [key: string]: any;
}

// 🆕 NEW: Enhanced Timeline Entity for Multiple Timeline Support
export interface TimelineEntity {
    id: string;
    profileId: string;
    userId: string;
    timelineType: 'master' | 'focused';
    initiativeId?: string;              // Only for focused timelines
    initiativeName?: string;            // Cached for easy display
    timelineData: Timeline;             // The actual timeline content
    scenarioType: 'conservative' | 'balanced' | 'aggressive';
    
    // Quality tracking
    qualityScore?: number;              // 0-100 rating
    promptVersion?: string;             // Track which prompt generated this
    aiModel?: string;                   // Track which AI model was used
    
    // User feedback
    userRating?: number;                // 1-5 star rating
    feedbackNotes?: string;             // User comments
    
    // Generation metadata
    generationDurationMs?: number;      // How long it took to generate
    tokensUsed?: number;                // AI API token usage
    costCents?: number;                 // AI API cost tracking
    
    // Timestamps
    createdAt: string;
    updatedAt: string;
}

// 🆕 NEW: Timeline Summary for UI Display
export interface TimelineSummary {
    timelineType: 'master' | 'focused';
    initiativeId?: string;
    initiativeName?: string;
    scenarioType: string;
    qualityScore?: number;
    userRating?: number;
    createdAt: string;
    updatedAt: string;
}

// 🆕 NEW: Timeline Quality Metrics for Analytics
export interface TimelineQualityMetrics {
    timelineType: string;
    aiModel: string;
    promptVersion: string;
    avgQualityScore: number;
    avgUserRating: number;
    totalTimelines: number;
    avgGenerationTimeMs: number;
}

export interface StrategicInitiative {
    initiative: string;
    contact: {
        name: string;
        title: string;
        email: string;
        linkedin: string;
        phone: string;
    };
    businessProblems: string[];
    
    // 🆕 Phase 1: Business Intelligence Fields
    expectedOutcomes?: string[];        // "Reduce costs by 25%", "Improve efficiency by 40%"
    successMetrics?: string[];          // "Customer satisfaction > 8.5", "Processing time < 2 hours"
    targetTimeline?: string;            // "Q3 2025", "18 months"
    estimatedBudget?: string;           // "$500K", "$2M-5M"
    priority?: 'High' | 'Medium' | 'Low';
    status?: 'Planning' | 'In Progress' | 'On Hold' | 'Completed';
}

export interface SystemApplication {
    name: string;                       // "Salesforce CRM", "SAP ERP", "Microsoft Office 365"
    category: string;                   // "CRM", "ERP", "Cloud Platform", "Database", "Analytics", "Communication"
    vendor?: string;                    // "Salesforce", "SAP", "Microsoft"
    version?: string;                   // "Enterprise", "v2023.1", "Cloud"
    description?: string;               // Optional description of usage/purpose
    criticality?: 'High' | 'Medium' | 'Low';  // Business criticality
}

// 🤖 AGENTIC WORKFLOW PATTERNS - Platform-Agnostic Business Framework

export interface AgenticWorkflowPattern {
    id: string;
    name: string;                       // "Document Processing Automation", "Customer Support Triage"
    category: WorkflowCategory;
    description: string;                // Business-focused description
    businessObjective: string;          // "Reduce processing time by 80%"
    
    // Business Context
    industryFit: string[];             // ["Healthcare", "Financial Services", "Manufacturing"]
    companySizeFit: string[];          // ["SMB", "Mid-Market", "Enterprise"]  
    maturityRequired: 'Low' | 'Medium' | 'High';  // Organizational readiness needed
    
    // Generic Workflow Structure (Platform-Agnostic)
    workflowSteps: WorkflowStep[];
    governanceCheckpoints: GovernanceCheckpoint[];
    riskAssessment: RiskAssessment;
    
    // Business Value
    roiMetrics: ROIMetrics;
    successCriteria: string[];
    kpis: KPIMetric[];
    
    // Implementation Framework
    implementationPhases: ImplementationPhase[];
    timeToValue: string;               // "2-4 weeks", "3-6 months"
    complexityScore: number;           // 1-10 scale
    
    // Metadata
    createdAt: string;
    updatedAt: string;
}

export interface PersonalizedWorkflow extends AgenticWorkflowPattern {
    profileId: string;
    userId: string;
    
    // Customization based on user profile
    customizedFor: {
        industry: string;
        companySize: string;
        specificUseCase: string;
    };
    
    // User Configuration
    selectedGovernanceLevel: 'Minimal' | 'Standard' | 'Strict';
    preferredImplementationSpeed: 'Fast' | 'Balanced' | 'Cautious';
    riskTolerance: 'Low' | 'Medium' | 'High';
    
    // Status Tracking
    status: WorkflowStatus;
    currentPhase?: string;
    lastReviewDate?: string;
    nextReviewDate?: string;
    
    // User Feedback
    userRating?: number;               // 1-5 stars
    userNotes?: string;
    
    // Future: Timeline Integration
    hasTimeline?: boolean;
    timelineId?: string;
}

export type WorkflowCategory = 
    | 'Process Automation'
    | 'Decision Support' 
    | 'Customer Experience'
    | 'Data Analytics'
    | 'Workforce Augmentation'
    | 'Risk Management';

export type WorkflowStatus = 
    | 'Draft'           // Initial recommendation
    | 'Under Review'    // Business team reviewing
    | 'Approved'        // Ready for pilot
    | 'Pilot'           // Testing phase
    | 'Production'      // Fully deployed
    | 'Paused'          // Temporarily stopped
    | 'Archived';       // No longer relevant

export interface WorkflowStep {
    stepNumber: number;
    name: string;                      // "Analyze incoming document"
    description: string;               // Business description of what happens
    stepType: 'Trigger' | 'Decision' | 'Action' | 'Human Review' | 'Integration';
    
    // Generic Business Logic (not platform-specific)
    businessLogic: string;             // "If confidence < 80%, escalate to human"
    dataRequired: string[];            // ["Document type", "Customer ID"]
    expectedOutcome: string;           // "Document categorized with 95% accuracy"
    
    // Governance
    requiresHumanApproval: boolean;
    escalationCriteria?: string;       // When to involve humans
    
    // Error Handling
    errorHandling: string;             // "Log error and notify supervisor"
    fallbackAction: string;            // "Route to manual processing queue"
}

export interface GovernanceCheckpoint {
    checkpointName: string;            // "High-Value Transaction Review"
    trigger: string;                   // "Transaction amount > $10,000"
    approvalRequired: boolean;
    approvers: string[];               // ["Department Manager", "Compliance Officer"]
    maxResponseTime: string;           // "4 hours", "24 hours"
    escalationPath: string;            // What happens if no response
    
    // Audit Trail
    requiresDocumentation: boolean;
    retentionPeriod: string;           // "7 years", "Indefinite"
}

export interface RiskAssessment {
    overallRiskLevel: 'Low' | 'Medium' | 'High';
    riskFactors: RiskFactor[];
    mitigationStrategies: string[];
    complianceRequirements: string[];  // ["SOX", "GDPR", "HIPAA"]
    securityConsiderations: string[];
    
    // Business Risks
    operationalRisks: string[];        // "System downtime during transition"
    reputationalRisks: string[];       // "Customer experience degradation"
    financialRisks: string[];          // "Implementation cost overruns"
}

export interface RiskFactor {
    factor: string;                    // "Data privacy breach"
    likelihood: 'Low' | 'Medium' | 'High';
    impact: 'Low' | 'Medium' | 'High';
    mitigation: string;                // How to reduce this risk
}

export interface ROIMetrics {
    // Cost Savings
    estimatedCostSavings: {
        annual: number;                // Dollar amount
        confidence: number;            // 0-100%
        breakdown: CostBreakdown[];
    };
    
    // Revenue Impact
    revenueImpact?: {
        annual: number;
        confidence: number;
        source: string;                // "Faster customer onboarding"
    };
    
    // Efficiency Gains
    efficiencyGains: {
        timeReduction: string;         // "80% faster processing"
        resourceReduction: string;     // "Equivalent to 2.5 FTEs"
        qualityImprovement: string;    // "95% accuracy vs 78% manual"
    };
    
    // Investment Required
    implementationCost: {
        low: number;                   // Range estimate
        high: number;
        breakdown: string[];           // ["Platform license", "Training", "Consulting"]
    };
    
    // ROI Calculation
    paybackPeriod: string;             // "6-9 months"
    roi3Year: number;                  // 350% (representing $3.50 per $1)
}

export interface CostBreakdown {
    category: string;                  // "Labor reduction", "Error reduction"
    annualSavings: number;
    confidence: number;
    explanation: string;
}

export interface KPIMetric {
    name: string;                      // "Processing time"
    currentValue: string;              // "4 hours average"
    targetValue: string;               // "30 minutes average"
    measurementMethod: string;         // "Automated system logs"
    reviewFrequency: string;           // "Weekly", "Monthly"
}

export interface ImplementationPhase {
    phaseName: string;                 // "Pilot Phase", "Full Deployment"
    duration: string;                  // "4-6 weeks"
    objectives: string[];              // ["Validate workflow accuracy"]
    deliverables: string[];            // ["Pilot results report"]
    successCriteria: string[];         // ["95% automation rate achieved"]
    
    // Resources Required
    teamRequired: string[];            // ["Process owner", "IT support"]
    budgetRequired: string;            // "$50K-75K"
    
    // Risk Management
    riskMitigation: string[];          // ["Parallel manual process maintained"]
    rollbackPlan: string;              // How to undo if needed
    
    // Governance
    reviewMilestones: string[];        // ["Week 2 checkpoint", "End of phase review"]
    approvalGates: string[];           // ["Business sign-off", "IT security review"]
}

// Archive complex interfaces for future use - these can be added back based on user feedback
/*
ARCHIVED FOR FUTURE ENTERPRISE FEATURES:
- ExpectedOutcome
- Problems  
- Solutions
- Value
- CurrentArchitecture
- ValueSellingFramework
- AIAssessment
- Summary
*/ 