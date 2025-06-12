export interface Profile {
    id: string;
    companyName: string;
    industry: string;
    employeeCount?: string;
    annualRevenue?: string;
    primaryLocation?: string;
    websiteUrl?: string;
    strategicInitiatives?: StrategicInitiative[];
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