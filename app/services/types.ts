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