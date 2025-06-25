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
    
    // 🆕 Phase 1 ROI Enhancement: Process Baseline Metrics
    processMetrics?: {
        currentCycleTime?: string;      // "5 days", "2 hours", "45 minutes"
        currentVolume?: string;         // "50 requests per month", "daily transactions", "weekly reports"
        currentErrorRate?: string;      // "15%", "3 errors per week", "low/medium/high"
        currentCost?: string;           // "low/medium/high", "$X per transaction", "expensive"
        laborIntensity?: string;        // "high", "medium", "low" - how much manual work required
        processComplexity?: string;     // "simple", "moderate", "complex" - process difficulty level
    };
    
    // 🆕 Phase 1 ROI Enhancement: Investment Context
    investmentContext?: {
        budgetRange?: string;           // "under $100K", "$100K-500K", "$500K-1M", "$1M+"
        timeframePreference?: string;   // "6 months", "1 year", "18 months", "flexible"
        implementationReadiness?: string; // "low", "medium", "high" - organizational readiness
        riskTolerance?: string;         // "conservative", "moderate", "aggressive"
        successDefinition?: string;     // "cost reduction", "efficiency gains", "quality improvement"
        stakeholderBuyIn?: string;      // "low", "medium", "high" - leadership support level
    };
}

export interface SystemApplication {
    name: string;                       // "Salesforce CRM", "SAP ERP", "Microsoft Office 365"
    category: string;                   // "CRM", "ERP", "Cloud Platform", "Database", "Analytics", "Communication"
    vendor?: string;                    // "Salesforce", "SAP", "Microsoft"
    version?: string;                   // "Enterprise", "v2023.1", "Cloud"
    description?: string;               // Optional description of usage/purpose
    criticality?: 'High' | 'Medium' | 'Low';  // Business criticality
}

// 🆕 NEW: ROI Projection for Executive Business Case
export interface ROIProjection {
    // Financial Impact
    processCostSavings: string;         // "$450K annual efficiency gains"
    laborReallocation: string;          // "$320K FTE capacity redeployment"
    riskAvoidance: string;              // "$150K compliance risk reduction"
    revenueEnablement?: string;         // "$200K new revenue opportunities" (optional)
    
    // Investment Requirements
    totalInvestment: string;            // "$280K implementation cost"
    ongoingCosts: string;               // "$50K annual maintenance"
    
    // ROI Metrics
    annualValue: string;                // "$920K total annual value"
    roiPercentage: number;              // 229 (for 229% ROI)
    paybackMonths: number;              // 11 (months to break even)
    threeYearValue?: string;            // "$2.5M cumulative value" (optional)
    
    // Assumptions & Confidence
    keyAssumptions: string[];           // ["40% cycle time improvement", "2 FTEs redeployed", "Zero downtime migration"]
    confidenceLevel: 'High' | 'Medium' | 'Low';
    confidenceFactors: string[];        // ["Industry benchmarks", "Pilot results", "Vendor guarantees"]
    
    // Risk Adjustments
    riskFactors?: string[];             // ["Integration complexity", "Change management", "Data quality"]
    contingencyPercentage?: number;     // 15 (for 15% contingency)
    
    // Executive Summary
    executiveSummary: string;           // 2-3 sentence business case summary
    recommendedAction: string;          // "Proceed with Phase 1 pilot"
}

// 🆕 NEW: Agentic Blueprint Types
export interface AgenticBlueprint {
    id: string;
    profileId: string;
    userId: string;
    businessObjective: string;          // "Cut invoice processing time by 40%"
    digitalTeam: DigitalTeamMember[];   // Array of 5 agent roles
    humanCheckpoints: HumanCheckpoint[];
    agenticTimeline: AgenticTimeline;
    kpiImprovements: KPIImprovement[];
    
    // 🆕 ROI Business Case
    roiProjection?: ROIProjection;      // Optional ROI projection for executive presentation
    
    // Generation metadata
    aiModel?: string;
    promptVersion?: string;
    qualityScore?: number;
    userRating?: number;
    
    // Timestamps
    createdAt: string;
    updatedAt: string;
}

export interface DigitalTeamMember {
    role: 'coordinator' | 'researcher' | 'analyst' | 'quality-checker' | 'actuator';
    title: string;                      // "Project Manager", "Analyst", "Consultant", "Auditor", "Ops Specialist"
    coreJob: string;                    // Description of main responsibility
    toolsUsed: string[];                // ["Calendar", "Task tracker", "Internal search"]
    oversightLevel: 'human-approval' | 'policy-checked' | 'full-autonomy';
    oversightDescription: string;       // "Human approval required initially"
    linkedKPIs: string[];               // KPIs this agent directly impacts
}

export interface HumanCheckpoint {
    checkpoint: string;                 // "Kick-off Workshop", "Review Gates", "Exception Escalations"
    description: string;                // What people do at this checkpoint
    importance: string;                 // Why it matters
    frequency: 'one-time' | 'periodic' | 'as-needed';
    triggerConditions?: string[];       // When this checkpoint is activated
}

export interface AgenticTimeline {
    phases: AgenticPhase[];
    totalDurationWeeks: number;
    progressiveTrust: ProgressiveTrustLevel[];
}

export interface AgenticPhase {
    phase: 'crawl' | 'walk' | 'run';
    name: string;                       // "Proof of Concept", "Pilot Deployment", "Full Autonomy"
    durationWeeks: number;
    description: string;
    milestones: string[];
    riskMitigations: string[];
    oversightLevel: 'high' | 'medium' | 'low';
    humanInvolvement: string;           // Description of human role in this phase
}

export interface ProgressiveTrustLevel {
    week: number;
    trustLevel: number;                 // 0-100 scale
    autonomyDescription: string;
    safeguards: string[];
}

export interface KPIImprovement {
    kpi: string;                        // "Invoice processing time", "Customer satisfaction"
    currentValue?: string;              // "5 days", "7.2/10"
    targetValue: string;                // "3 days", "8.5/10"
    improvementPercent: number;         // 40 (for 40% improvement)
    linkedAgents: string[];             // Which agents contribute to this KPI
    measurementMethod: string;          // How success will be tracked
    timeframe: string;                  // "Within 6 months", "By Q4 2025"
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