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

// ===================================================================
// EXECUTIVE SUMMARY SYSTEM - DYNAMIC LLM-GENERATED CONTENT INTERFACES
// ===================================================================

/**
 * Complete executive summary data structure for LLM-generated business intelligence.
 * This interface supports dynamic content generation while providing robust fallbacks.
 * 
 * @example
 * ```typescript
 * const summary: ExecutiveSummaryData = {
 *   company: { name: "TechCorp", industry: "Software", size: "medium", maturityLevel: 78 },
 *   financialImpact: { totalROI: { amount: 1200000, currency: "USD", timeframe: "24 months" }, ... },
 *   strategicOpportunities: [...],
 *   // ... other required fields
 * };
 * ```
 */
export interface ExecutiveSummaryData {
    /** Company context and basic information */
    company: CompanyContext;
    
    /** Financial impact analysis including ROI, payback, and cost-benefit data */
    financialImpact: FinancialImpactData;
    
    /** Array of strategic AI opportunities with business impact metrics */
    strategicOpportunities: StrategicOpportunity[];
    
    /** Business intelligence insights and KPI analysis */
    businessIntelligence: BusinessIntelligenceData;
    
    /** Implementation readiness assessment with risks and success factors */
    implementationAssessment: ImplementationAssessmentData;
    
    /** Competitive analysis and market positioning data */
    competitiveAnalysis: CompetitiveAnalysisData;
    
    /** Risk assessment with mitigation strategies */
    riskAssessment: RiskAssessmentData;
    
    /** Quick wins for immediate implementation (90-day goals) */
    quickWins?: QuickWin[];
    
    /** Generated metadata for caching and validation */
    generatedAt: string;
    confidence: number; // 0-100 confidence in the analysis
    dataVersion: string;
    
    /** Optional industry-specific data extensions */
    industrySpecific?: Record<string, any>;
}

/**
 * Company context information for executive summary analysis.
 * Provides foundational data for all business intelligence calculations.
 */
export interface CompanyContext {
    /** Company name as it appears in executive reports */
    name: string;
    
    /** Industry classification for benchmarking and analysis */
    industry: string;
    
    /** Company size classification for appropriate comparisons */
    size: 'small' | 'medium' | 'large' | 'enterprise';
    
    /** Annual revenue (optional, formatted string like "$200M") */
    revenue?: string;
    
    /** Employee count (optional, formatted string like "500") */
    employees?: string;
    
    /** Geographic region for regulatory and market context */
    region?: string;
    
    /** AI readiness maturity score (1-100) */
    maturityLevel: number;
    
    /** Key business challenges driving AI adoption */
    primaryChallenges?: string[];
    
    /** Current digital transformation status */
    digitalMaturity?: 'low' | 'medium' | 'high' | 'advanced';
}

/**
 * Comprehensive financial impact analysis for executive decision-making.
 * All monetary values should be in the company's primary currency.
 */
export interface FinancialImpactData {
    /** Total return on investment projection */
    totalROI: {
        amount: number; // Total ROI amount in primary currency
        currency: string; // "USD", "EUR", etc.
        timeframe: string; // "24 months", "3 years", etc.
    };
    
    /** Payback period analysis with industry benchmarking */
    paybackPeriod: {
        months: number; // Expected payback period in months
        industryAverage: number; // Industry average for comparison
    };
    
    /** Investment requirements broken down by implementation phases */
    investmentRequired: {
        total: number; // Total investment required
        phases: InvestmentPhase[];
    };
    
    /** Detailed cost-benefit analysis over time */
    costBenefitAnalysis: {
        year1Savings: number;
        year2Savings: number;
        year5Total: number;
        netROIPercentage: number;
    };
    
    /** Timeline data for ROI visualization charts */
    roiTimeline: ROITimelinePoint[];
    
    /** Optional total cost of ownership analysis */
    totalCostOfOwnership?: {
        year1: number;
        year3: number;
        year5: number;
    };
    
    /** Industry benchmark comparison data */
    industryBenchmarks?: {
        averageROI: number;
        averagePayback: number;
        topQuartileROI: number;
    };
}

/**
 * Investment phase breakdown for executive budget planning.
 */
export interface InvestmentPhase {
    /** Phase identifier (e.g., "Phase 1", "Pilot", "Scale") */
    phase: string;
    
    /** Investment amount for this phase */
    amount: number;
    
    /** Timeline for this phase (e.g., "Months 1-6") */
    timeline: string;
    
    /** Key deliverables or milestones for this phase */
    deliverables?: string[];
    
    /** Expected outcomes from this phase */
    expectedOutcomes?: string[];
}

/**
 * ROI timeline point for financial visualization charts.
 * Includes both business data and chart coordinates for rendering.
 */
export interface ROITimelinePoint {
    /** Month number (0 = start, 12 = year 1, etc.) */
    month: number;
    
    /** Cumulative investment at this point */
    investment: number;
    
    /** Cumulative savings at this point */
    savings: number;
    
    /** Net ROI (savings - investment) */
    netRoi: number;
    
    /** Chart X coordinate for SVG rendering */
    x: number;
    
    /** Chart Y coordinate for SVG rendering */
    y: number;
    
    /** Optional milestone marker for this point */
    milestone?: string;
}

/**
 * Strategic AI opportunity with complete business impact analysis.
 * Focuses on business outcomes rather than technical implementation.
 */
export interface StrategicOpportunity {
    /** Unique identifier for this opportunity */
    id: string;
    
    /** Executive-friendly title for the opportunity */
    title: string;
    
    /** AI category classification for grouping and analysis */
    category: 'Process Automation' | 'Decision Support' | 'Customer Experience' | 'Data Analytics' | 'Workforce Augmentation' | 'Risk Management';
    
    /** Detailed description of the business opportunity */
    description: string;
    
    /** Quantified business impact metrics */
    businessImpact: {
        roi: string; // "320%", "2.5x", etc.
        timeframe: string; // "6-8 months", "Q3 2025", etc.
        investment: string; // "$75K-$125K", "€100K", etc.
        annualSavings: string; // "$240K-$400K", etc.
        confidence: 'High' | 'Medium' | 'Low';
    };
    
    /** Specific operational outcomes (NOT technical features) */
    operationalOutcomes: string[]; // ["75% reduction in processing time", "90% accuracy improvement"]
    
    /** Key performance metrics and improvements */
    keyMetrics: {
        efficiencyGain: string; // "75%", "3x faster", etc.
        costReduction: string; // "$240K annually", "30% cost savings", etc.
        revenueImpact?: string; // "15% faster time-to-market", "$500K new revenue", etc.
        qualityImprovement?: string; // "95% accuracy", "50% fewer errors", etc.
    };
    
    /** Implementation complexity assessment */
    implementationComplexity: 'Low' | 'Medium' | 'High';
    
    /** Prerequisites for successful implementation */
    prerequisites: string[];
    
    /** Success criteria and measurement approach */
    successCriteria?: string[];
    
    /** Risk factors specific to this opportunity */
    risks?: string[];
    
    /** Expected timeline milestones */
    milestones?: {
        milestone: string;
        timeframe: string;
        deliverables: string[];
    }[];
}

/**
 * Business intelligence insights and KPI analysis.
 * Provides strategic context and performance indicators.
 */
export interface BusinessIntelligenceData {
    /** AI readiness assessment across multiple dimensions */
    readinessAssessment: {
        overallScore: number; // 0-100
        dataReadiness: number;
        processMaturity: number;
        technicalCapability: number;
        changeReadiness: number;
        leadership: number;
    };
    
    /** Strategic alignment analysis */
    strategicAlignment: {
        alignmentScore: number; // 0-100
        keyAlignmentAreas: string[];
        gapAreas: string[];
        recommendations: string[];
    };
    
    /** Performance KPIs and current state metrics */
    currentStateMetrics: {
        efficiency: {
            metric: string;
            currentValue: string;
            industryBenchmark: string;
            improvementPotential: string;
        };
        costs: {
            metric: string;
            currentValue: string;
            industryBenchmark: string;
            reductionPotential: string;
        };
        quality: {
            metric: string;
            currentValue: string;
            industryBenchmark: string;
            improvementPotential: string;
        };
    };
    
    /** Future state projections post-AI implementation */
    futureStateProjections: {
        efficiency: string;
        costs: string;
        quality: string;
        competitivePosition: string;
    };
}

/**
 * Implementation readiness assessment with detailed analysis.
 */
export interface ImplementationAssessmentData {
    /** Overall readiness score and classification */
    readinessScore: number; // 0-100
    readinessLevel: 'Not Ready' | 'Needs Preparation' | 'Ready' | 'Highly Ready';
    
    /** Organizational strengths supporting AI implementation */
    strengths: string[];
    
    /** Areas requiring preparation or improvement */
    preparationAreas: string[];
    
    /** Critical success factors for implementation */
    successFactors: string[];
    
    /** Implementation approach recommendation */
    recommendedApproach: {
        strategy: 'Aggressive' | 'Balanced' | 'Conservative';
        reasoning: string;
        keyPrinciples: string[];
    };
    
    /** Change management requirements */
    changeManagement: {
        stakeholderEngagement: string[];
        trainingRequirements: string[];
        communicationStrategy: string[];
    };
    
    /** Resource requirements */
    resourceRequirements: {
        internalTeam: string[];
        externalSupport: string[];
        technologyInvestments: string[];
    };
}

/**
 * Competitive analysis and market positioning data.
 */
export interface CompetitiveAnalysisData {
    /** Current competitive position */
    currentPosition: {
        marketRanking: string; // "Top 25%", "Middle tier", etc.
        aiMaturityVsCompetitors: string; // "Above average", "Leading", etc.
        keyDifferentiators: string[];
        competitiveGaps: string[];
    };
    
    /** Post-implementation competitive advantage */
    projectedPosition: {
        expectedRanking: string;
        competitiveAdvantages: string[];
        marketDifferentiation: string[];
        timeToAdvantage: string; // "6-12 months", etc.
    };
    
    /** Industry benchmark data */
    industryBenchmarks: {
        aiAdoptionRate: string; // "35% of companies", etc.
        averageROI: string;
        leaderCharacteristics: string[];
        laggardRisks: string[];
    };
    
    /** Competitive threat analysis */
    threatAnalysis: {
        competitorActions: string[];
        riskOfInaction: string[];
        urgencyFactors: string[];
    };
}

/**
 * Risk assessment with detailed mitigation strategies.
 */
export interface RiskAssessmentData {
    /** Implementation risks with impact and probability */
    implementationRisks: {
        risk: string;
        impact: 'Low' | 'Medium' | 'High';
        probability: 'Low' | 'Medium' | 'High';
        mitigation: string[];
    }[];
    
    /** Business risks of implementing AI */
    businessRisks: {
        risk: string;
        impact: 'Low' | 'Medium' | 'High';
        mitigation: string[];
    }[];
    
    /** Risks of NOT implementing AI (status quo risks) */
    inactionRisks: {
        risk: string;
        impact: 'Low' | 'Medium' | 'High';
        timeframe: string; // "Within 12 months", etc.
    }[];
    
    /** Overall risk assessment */
    riskSummary: {
        overallRiskLevel: 'Low' | 'Medium' | 'High';
        keyRiskFactors: string[];
        primaryMitigationStrategies: string[];
        riskMonitoringPlan: string[];
    };
}

/**
 * Quick win opportunity for immediate implementation.
 * Represents 30-90 day initiatives with rapid ROI.
 */
export interface QuickWin {
    /** Quick win title */
    title: string;
    
    /** Specific business impact description */
    impact: string;
    
    /** Implementation timeline */
    timeline: string; // "30 days", "60-90 days", etc.
    
    /** Required investment */
    investment: string;
    
    /** Expected ROI or savings */
    expectedROI?: string;
    
    /** Implementation complexity */
    complexity: 'Low' | 'Medium';
    
    /** Prerequisites for this quick win */
    prerequisites?: string[];
    
    /** Success metrics */
    successMetrics?: string[];
}

// ===================================================================
// BACKWARD COMPATIBILITY & LEGACY SUPPORT
// ===================================================================

/**
 * Legacy demo data structure for backward compatibility.
 * This interface supports the existing hardcoded demo data.
 * 
 * @deprecated Use ExecutiveSummaryData for new implementations
 */
export interface LegacyDemoData {
    company: string;
    industry: string;
    revenue: string;
    employees: string;
    readinessScore: number;
    totalRoi: string;
    paybackMonths: number;
    investmentRequired: string;
    opportunities: LegacyOpportunity[];
}

/**
 * Legacy opportunity structure with agent references.
 * 
 * @deprecated Use StrategicOpportunity for new implementations
 */
export interface LegacyOpportunity {
    title: string;
    category: string;
    roi: string;
    timeframe: string;
    investment: string;
    annualSavings: string;
    confidence: string;
    agents?: {
        name: string;
        icon: any; // Lucide icon component
        type: string;
    }[];
}

// ===================================================================
// UTILITY TYPES & HELPERS
// ===================================================================

/**
 * Options for executive summary generation.
 */
export interface ExecutiveSummaryGenerationOptions {
    /** Focus areas for the analysis */
    focusAreas?: string[];
    
    /** Whether to include industry benchmarks */
    includeBenchmarks?: boolean;
    
    /** Level of detail in the analysis */
    detailLevel?: 'summary' | 'detailed' | 'comprehensive';
    
    /** Preferred AI provider for generation */
    preferredProvider?: 'openai' | 'claude' | 'gemini';
    
    /** Custom prompt modifications */
    promptModifications?: Record<string, string>;
}

/**
 * Executive summary cache metadata.
 */
export interface ExecutiveSummaryCacheMetadata {
    /** Profile hash for cache invalidation */
    profileHash: string;
    
    /** Generation timestamp */
    generatedAt: Date;
    
    /** Cache expiration timestamp */
    expiresAt: Date;
    
    /** Tokens used for generation cost tracking */
    tokensUsed: number;
    
    /** Generation options used */
    generationOptions: ExecutiveSummaryGenerationOptions;
}

/**
 * Type guard to check if data is new ExecutiveSummaryData format.
 */
export function isExecutiveSummaryData(data: any): data is ExecutiveSummaryData {
    return data && 
           typeof data === 'object' &&
           data.company &&
           data.financialImpact &&
           data.strategicOpportunities &&
           Array.isArray(data.strategicOpportunities) &&
           typeof data.generatedAt === 'string' &&
           typeof data.confidence === 'number';
}

/**
 * Type guard to check if data is legacy demo data format.
 */
export function isLegacyDemoData(data: any): data is LegacyDemoData {
    return data && 
           typeof data === 'object' &&
           typeof data.company === 'string' &&
           typeof data.industry === 'string' &&
           typeof data.readinessScore === 'number' &&
           data.opportunities &&
           Array.isArray(data.opportunities);
} 