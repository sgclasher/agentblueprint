export interface Profile {
    id: string;
    companyName: string;
    industry: string;
    size: string;
    annualRevenue?: string;
    employeeCount?: string;
    primaryLocation?: string;
    expectedOutcome?: ExpectedOutcome;
    problems?: Problems;
    solutions?: Solutions;
    value?: Value;
    currentArchitecture?: CurrentArchitecture;
    valueSellingFramework?: ValueSellingFramework;
    aiOpportunityAssessment?: AIAssessment;
    summary?: Summary;
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

export interface ExpectedOutcome {
    strategicInitiatives: StrategicInitiative[];
    businessObjectives: string;
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

export interface Problems {
    businessProblems: string[];
    agenticOpportunities: string[];
}

export interface Solutions {
    capabilities: string[];
    differentiators: string[];
    competitorGaps: string[];
}

export interface Value {
    businessValue: any;
    personalValue: any;
}

export interface CurrentArchitecture {
    coreSystems: string[];
    integrations: string;
    dataQuality: string;
    technicalDebt: string;
    aiReadiness: string;
}

export interface ValueSellingFramework {
    businessIssues: string[];
    problems: {
        [key: string]: any;
    };
    impact: {
        [key: string]: any;
    };
    solutionCapabilities: string[];
    decisionMakers: {
        [key: string]: any;
    };
    buyingProcess: {
        [key: string]: any;
    };
    risksOfInaction: {
        [key: string]: any;
    };
    successMetrics?: string[];
    differentiationRequirements?: string[];
    roiExpectations?: any;
    solutionCapabilitiesOther?: string;
    differentiationOther?: string;
    successMetricsTargets?: string;
    businessIssueOther?: string;
    businessIssueDetails?: string;
    additionalChallenges?: string;
    rootCauses?: string[];
    rootCauseOther?: string;
    rootCauseDetails?: string;
}

export interface AIAssessment {
    currentTechnology: {
        [key: string]: any;
    };
    aiReadinessScore: number;
    opportunities: AIOpportunity[];
    quickWins: QuickWin[];
    strategicInitiatives: string[];
    futureOpportunities: string[];
}

export interface AIOpportunity {
    name: string;
    department: string;
    process: string;
    currentState: string;
    aiSolution: string;
    estimatedImpact: string;
    implementationEffort: 'High' | 'Medium' | 'Low';
    timeline: string;
    priorityScore: number;
}

export interface QuickWin {
    name: string;
    impact: string;
    timeline: string;
}

export interface Summary {
    currentState?: string;
    recommendedApproach?: string;
    notes?: string;
    nextSteps: string[];
} 