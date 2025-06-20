// New Business Objective interface for progressive complexity
export interface BusinessObjective {
    objective: string;          // "Reduce production costs by 20%"
    targetMetric: string;       // "20% cost reduction" 
}

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
    
    // 🆕 Progressive Complexity Fields
    companySize?: 'SMB' | 'Mid-Market' | 'Enterprise';     // Adaptive UI behavior
    businessObjectives?: BusinessObjective[];               // High-level goals
    businessGoals?: string[];                               // SMB input (converted to objectives)
    keyChallenges?: string[];                               // SMB input (converted to problems)
    
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
    
    // 🆕 Progressive Complexity Fields
    linkedObjective?: string;           // Links to BusinessObjective.objective
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