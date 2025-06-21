import { 
  ExecutiveSummaryData, 
  CompanyContext, 
  FinancialImpactData, 
  StrategicOpportunity, 
  BusinessIntelligenceData,
  ImplementationAssessmentData,
  CompetitiveAnalysisData,
  RiskAssessmentData,
  QuickWin,
  LegacyDemoData,
  isExecutiveSummaryData,
  isLegacyDemoData,
  Profile
} from './types';

/**
 * Executive Summary Service
 * Provides data transformation, validation, and fallback support for the executive summary system.
 * Ensures robust handling of both LLM-generated and demo data.
 */
export class ExecutiveSummaryService {
  
  /**
   * Validates and transforms any input data into a proper ExecutiveSummaryData structure.
   * Provides comprehensive fallbacks for missing or invalid data.
   * 
   * @param data - Raw data from LLM or demo
   * @param profile - Optional profile for context
   * @returns Validated ExecutiveSummaryData with fallbacks
   */
  static validateAndTransform(data: any, profile?: Profile): ExecutiveSummaryData {
    // If already valid ExecutiveSummaryData, return as-is
    if (isExecutiveSummaryData(data)) {
      return data;
    }

    // If legacy demo data, transform it
    if (isLegacyDemoData(data)) {
      return this.transformLegacyData(data, profile);
    }

    // If unknown format, create from scratch with fallbacks
    return this.createFallbackData(data, profile);
  }

  /**
   * Transforms legacy demo data to new ExecutiveSummaryData format.
   * Maintains backward compatibility with existing demo data.
   */
  static transformLegacyData(legacyData: LegacyDemoData, profile?: Profile): ExecutiveSummaryData {
    const company = this.createCompanyContext(legacyData, profile);
    const financialImpact = this.createFinancialImpactFromLegacy(legacyData);
    const strategicOpportunities = this.transformLegacyOpportunities(legacyData.opportunities);

    return {
      company,
      financialImpact,
      strategicOpportunities,
      businessIntelligence: this.getDefaultBusinessIntelligence(company),
      implementationAssessment: this.getDefaultImplementationAssessment(legacyData.readinessScore),
      competitiveAnalysis: this.getDefaultCompetitiveAnalysis(company),
      riskAssessment: this.getDefaultRiskAssessment(),
      quickWins: this.getDefaultQuickWins(),
      generatedAt: new Date().toISOString(),
      confidence: 85, // Demo data confidence
      dataVersion: '1.0.0'
    };
  }

  /**
   * Creates comprehensive fallback data for unknown or invalid input.
   */
  static createFallbackData(data: any, profile?: Profile): ExecutiveSummaryData {
    const company = this.createCompanyContext(data, profile);
    
    return {
      company,
      financialImpact: this.getDefaultFinancialImpact(),
      strategicOpportunities: this.getDefaultStrategicOpportunities(company.industry),
      businessIntelligence: this.getDefaultBusinessIntelligence(company),
      implementationAssessment: this.getDefaultImplementationAssessment(company.maturityLevel),
      competitiveAnalysis: this.getDefaultCompetitiveAnalysis(company),
      riskAssessment: this.getDefaultRiskAssessment(),
      quickWins: this.getDefaultQuickWins(),
      generatedAt: new Date().toISOString(),
      confidence: 70, // Lower confidence for fallback data
      dataVersion: '1.0.0'
    };
  }

  // ===================================================================
  // COMPANY CONTEXT CREATION
  // ===================================================================

  private static createCompanyContext(data: any, profile?: Profile): CompanyContext {
    return {
      name: data?.company || profile?.companyName || "Sample Company",
      industry: data?.industry || profile?.industry || "Technology",
      size: this.determineCompanySize(data?.employees || profile?.employeeCount),
      revenue: data?.revenue || profile?.annualRevenue,
      employees: data?.employees || profile?.employeeCount,
      region: data?.region || "North America",
      maturityLevel: data?.readinessScore || this.calculateMaturityLevel(profile),
      primaryChallenges: this.extractPrimaryChallenges(profile),
      digitalMaturity: this.assessDigitalMaturity(data?.readinessScore || 50)
    };
  }

  private static determineCompanySize(employees?: string): 'small' | 'medium' | 'large' | 'enterprise' {
    if (!employees) return 'medium';
    
    const num = parseInt(employees.replace(/[^0-9]/g, ''));
    if (num < 50) return 'small';
    if (num < 500) return 'medium';
    if (num < 5000) return 'large';
    return 'enterprise';
  }

  private static calculateMaturityLevel(profile?: Profile): number {
    if (!profile) return 60;
    
    let score = 50; // Base score
    
    // Adjust based on available data
    if (profile.strategicInitiatives?.length) score += 15;
    if (profile.systemsAndApplications?.length) score += 15;
    if (profile.industry) score += 10;
    if (profile.annualRevenue) score += 10;
    
    return Math.min(score, 100);
  }

  private static extractPrimaryChallenges(profile?: Profile): string[] {
    if (!profile?.strategicInitiatives) {
      return [
        "Operational efficiency",
        "Cost optimization", 
        "Digital transformation",
        "Competitive advantage"
      ];
    }

    return profile.strategicInitiatives
      .flatMap(initiative => initiative.businessProblems || [])
      .slice(0, 4);
  }

  private static assessDigitalMaturity(score: number): 'low' | 'medium' | 'high' | 'advanced' {
    if (score < 40) return 'low';
    if (score < 70) return 'medium';
    if (score < 90) return 'high';
    return 'advanced';
  }

  // ===================================================================
  // FINANCIAL IMPACT DEFAULTS
  // ===================================================================

  private static createFinancialImpactFromLegacy(legacyData: LegacyDemoData): FinancialImpactData {
    const totalAmount = this.parseAmount(legacyData.totalRoi);
    const investment = this.parseAmount(legacyData.investmentRequired);

    return {
      totalROI: {
        amount: totalAmount,
        currency: "USD",
        timeframe: "24 months"
      },
      paybackPeriod: {
        months: legacyData.paybackMonths,
        industryAverage: 12
      },
      investmentRequired: {
        total: investment,
        phases: this.createDefaultPhases(investment)
      },
      costBenefitAnalysis: {
        year1Savings: Math.round(totalAmount * 0.4),
        year2Savings: Math.round(totalAmount * 0.6),
        year5Total: Math.round(totalAmount * 2.5),
        netROIPercentage: Math.round((totalAmount / investment) * 100)
      },
      roiTimeline: this.createDefaultROITimeline(investment, totalAmount)
    };
  }

  private static getDefaultFinancialImpact(): FinancialImpactData {
    return {
      totalROI: {
        amount: 800000,
        currency: "USD", 
        timeframe: "24 months"
      },
      paybackPeriod: {
        months: 8,
        industryAverage: 12
      },
      investmentRequired: {
        total: 250000,
        phases: this.createDefaultPhases(250000)
      },
      costBenefitAnalysis: {
        year1Savings: 320000,
        year2Savings: 480000,
        year5Total: 2000000,
        netROIPercentage: 320
      },
      roiTimeline: this.createDefaultROITimeline(250000, 800000)
    };
  }

  private static createDefaultPhases(totalInvestment: number) {
    return [
      {
        phase: "Phase 1 - Foundation",
        amount: Math.round(totalInvestment * 0.6),
        timeline: "Months 1-6",
        deliverables: ["Initial implementation", "Team training", "Process setup"],
        expectedOutcomes: ["Basic automation", "Quick wins"]
      },
      {
        phase: "Phase 2 - Expansion", 
        amount: Math.round(totalInvestment * 0.3),
        timeline: "Months 7-12",
        deliverables: ["Advanced features", "Integration", "Optimization"],
        expectedOutcomes: ["Full capabilities", "Scaled benefits"]
      },
      {
        phase: "Phase 3 - Optimization",
        amount: Math.round(totalInvestment * 0.1),
        timeline: "Months 13-18",
        deliverables: ["Fine-tuning", "Advanced analytics", "Future planning"],
        expectedOutcomes: ["Maximum ROI", "Strategic advantage"]
      }
    ];
  }

  private static createDefaultROITimeline(investment: number, totalROI: number) {
    return [
      { month: 0, investment: 0, savings: 0, netRoi: 0, x: 50, y: 150 },
      { month: 3, investment: Math.round(investment * 0.3), savings: Math.round(totalROI * 0.05), netRoi: Math.round(totalROI * 0.05 - investment * 0.3), x: 110, y: 145 },
      { month: 6, investment: Math.round(investment * 0.6), savings: Math.round(totalROI * 0.15), netRoi: Math.round(totalROI * 0.15 - investment * 0.6), x: 170, y: 135 },
      { month: 12, investment: Math.round(investment * 0.9), savings: Math.round(totalROI * 0.4), netRoi: Math.round(totalROI * 0.4 - investment * 0.9), x: 230, y: 100 },
      { month: 18, investment: investment, savings: Math.round(totalROI * 0.7), netRoi: Math.round(totalROI * 0.7 - investment), x: 290, y: 70 },
      { month: 24, investment: investment, savings: totalROI, netRoi: totalROI - investment, x: 350, y: 40 }
    ];
  }

  // ===================================================================
  // STRATEGIC OPPORTUNITIES DEFAULTS  
  // ===================================================================

  private static transformLegacyOpportunities(legacyOpportunities: any[]): StrategicOpportunity[] {
    return legacyOpportunities.map((opp, index) => ({
      id: `opportunity-${index + 1}`,
      title: opp.title,
      category: opp.category as any,
      description: `AI-powered solution that delivers significant business value through ${opp.category.toLowerCase()}.`,
      businessImpact: {
        roi: opp.roi,
        timeframe: opp.timeframe,
        investment: opp.investment,
        annualSavings: opp.annualSavings,
        confidence: opp.confidence as any
      },
      operationalOutcomes: this.generateOperationalOutcomes(opp.category),
      keyMetrics: this.generateKeyMetrics(opp),
      implementationComplexity: this.assessComplexity(opp.timeframe),
      prerequisites: this.generatePrerequisites(opp.category)
    }));
  }

  private static getDefaultStrategicOpportunities(industry: string): StrategicOpportunity[] {
    const baseOpportunities = [
      {
        id: "process-automation",
        title: "Intelligent Process Automation",
        category: "Process Automation" as const,
        description: "AI-powered automation of repetitive business processes to improve efficiency and reduce errors.",
        businessImpact: {
          roi: "280%",
          timeframe: "6-8 months",
          investment: "$75K-$125K",
          annualSavings: "$210K-$350K",
          confidence: "High" as const
        },
        operationalOutcomes: [
          "70% reduction in manual processing time",
          "95% improvement in accuracy",
          "50% faster turnaround times",
          "24/7 automated operations"
        ],
        keyMetrics: {
          efficiencyGain: "70%",
          costReduction: "$210K annually",
          qualityImprovement: "95% accuracy"
        },
        implementationComplexity: "Medium" as const,
        prerequisites: [
          "Process documentation",
          "System integration capabilities", 
          "Staff training plan"
        ]
      },
      {
        id: "decision-support",
        title: "AI-Powered Decision Intelligence",
        category: "Decision Support" as const,
        description: "Advanced analytics and AI insights to enhance strategic and operational decision-making.",
        businessImpact: {
          roi: "320%",
          timeframe: "8-12 months",
          investment: "$100K-$175K",
          annualSavings: "$320K-$560K",
          confidence: "High" as const
        },
        operationalOutcomes: [
          "60% faster decision-making",
          "85% improvement in forecast accuracy",
          "40% reduction in operational risks",
          "Enhanced strategic planning capabilities"
        ],
        keyMetrics: {
          efficiencyGain: "60%",
          costReduction: "$320K annually",
          revenueImpact: "15% increase in profitable decisions"
        },
        implementationComplexity: "Medium" as const,
        prerequisites: [
          "Data quality assessment",
          "Analytics infrastructure",
          "Executive stakeholder alignment"
        ]
      }
    ];

    // Add industry-specific opportunity
    const industrySpecific = this.getIndustrySpecificOpportunity(industry);
    if (industrySpecific) {
      baseOpportunities.push(industrySpecific);
    }

    return baseOpportunities;
  }

  private static getIndustrySpecificOpportunity(industry: string): StrategicOpportunity | null {
    const industryMap: Record<string, StrategicOpportunity> = {
      "Manufacturing": {
        id: "quality-optimization",
        title: "Intelligent Quality Management",
        category: "Process Automation",
        description: "AI-driven quality control and predictive maintenance to optimize manufacturing operations.",
        businessImpact: {
          roi: "350%",
          timeframe: "6-9 months",
          investment: "$150K-$225K",
          annualSavings: "$525K-$787K",
          confidence: "High"
        },
        operationalOutcomes: [
          "80% reduction in defect rates",
          "60% decrease in unplanned downtime",
          "45% improvement in overall equipment effectiveness",
          "Real-time quality monitoring"
        ],
        keyMetrics: {
          efficiencyGain: "45%",
          costReduction: "$525K annually",
          qualityImprovement: "80% defect reduction"
        },
        implementationComplexity: "High",
        prerequisites: [
          "Equipment sensor integration",
          "Historical quality data",
          "Maintenance team training"
        ]
      },
      "Healthcare": {
        id: "patient-optimization",
        title: "Patient Care Intelligence",
        category: "Decision Support",
        description: "AI-enhanced patient care coordination and clinical decision support systems.",
        businessImpact: {
          roi: "290%",
          timeframe: "8-14 months",
          investment: "$200K-$300K",
          annualSavings: "$580K-$870K",
          confidence: "High"
        },
        operationalOutcomes: [
          "30% improvement in patient outcomes",
          "50% reduction in readmission rates",
          "40% faster diagnosis times",
          "Enhanced care coordination"
        ],
        keyMetrics: {
          efficiencyGain: "40%",
          costReduction: "$580K annually",
          qualityImprovement: "30% better outcomes"
        },
        implementationComplexity: "High",
        prerequisites: [
          "HIPAA compliance framework",
          "EHR system integration",
          "Clinical staff training"
        ]
      }
    };

    return industryMap[industry] || null;
  }

  // ===================================================================
  // UTILITY METHODS
  // ===================================================================

  private static parseAmount(amountStr: string): number {
    if (!amountStr) return 0;
    
    // Remove currency symbols and parse
    const cleaned = amountStr.replace(/[^0-9.]/g, '');
    const amount = parseFloat(cleaned);
    
    // Handle K, M suffixes
    if (amountStr.includes('K')) return amount * 1000;
    if (amountStr.includes('M')) return amount * 1000000;
    
    return amount || 0;
  }

  private static generateOperationalOutcomes(category: string): string[] {
    const outcomeMap: Record<string, string[]> = {
      "Process Automation": [
        "75% reduction in manual processing time",
        "90% improvement in accuracy",
        "50% faster completion times",
        "Elimination of routine errors"
      ],
      "Customer Experience": [
        "80% faster response times",
        "95% customer satisfaction improvement",
        "60% reduction in service costs",
        "24/7 service availability"
      ],
      "Data Analytics": [
        "85% improvement in forecast accuracy",
        "60% faster insights generation",
        "40% better decision outcomes",
        "Real-time performance monitoring"
      ]
    };

    return outcomeMap[category] || outcomeMap["Process Automation"];
  }

  private static generateKeyMetrics(opportunity: any) {
    const roi = this.parseAmount(opportunity.roi || "250%");
    const savings = this.parseAmount(opportunity.annualSavings || "$200K");
    
    return {
      efficiencyGain: `${Math.min(roi / 4, 75)}%`,
      costReduction: opportunity.annualSavings || `$${Math.round(savings)}K annually`,
      revenueImpact: `${Math.round(roi / 10)}% revenue impact`
    };
  }

  private static assessComplexity(timeframe: string): 'Low' | 'Medium' | 'High' {
    if (timeframe.includes('3') || timeframe.includes('4')) return 'Low';
    if (timeframe.includes('6') || timeframe.includes('8')) return 'Medium';
    return 'High';
  }

  private static generatePrerequisites(category: string): string[] {
    const prereqMap: Record<string, string[]> = {
      "Process Automation": [
        "Process documentation and mapping",
        "System integration capabilities",
        "Staff training and change management"
      ],
      "Customer Experience": [
        "Customer data integration",
        "Service platform setup",
        "Agent training program"
      ],
      "Data Analytics": [
        "Data quality assessment",
        "Analytics infrastructure",
        "Analyst team training"
      ]
    };

    return prereqMap[category] || prereqMap["Process Automation"];
  }

  // ===================================================================
  // DEFAULT DATA GENERATORS
  // ===================================================================

  private static getDefaultBusinessIntelligence(company: CompanyContext): BusinessIntelligenceData {
    return {
      readinessAssessment: {
        overallScore: company.maturityLevel,
        dataReadiness: company.maturityLevel - 5,
        processMaturity: company.maturityLevel + 5,
        technicalCapability: company.maturityLevel,
        changeReadiness: company.maturityLevel - 10,
        leadership: company.maturityLevel + 10
      },
      strategicAlignment: {
        alignmentScore: 85,
        keyAlignmentAreas: [
          "Operational efficiency",
          "Cost optimization",
          "Competitive advantage"
        ],
        gapAreas: [
          "AI governance framework",
          "Data management strategy"
        ],
        recommendations: [
          "Establish AI center of excellence",
          "Develop comprehensive data strategy",
          "Create change management program"
        ]
      },
      currentStateMetrics: {
        efficiency: {
          metric: "Process completion time",
          currentValue: "4.2 hours average",
          industryBenchmark: "3.8 hours",
          improvementPotential: "70% reduction possible"
        },
        costs: {
          metric: "Operational cost per unit",
          currentValue: "$245",
          industryBenchmark: "$220",
          reductionPotential: "30% cost reduction"
        },
        quality: {
          metric: "Error rate",
          currentValue: "3.2%",
          industryBenchmark: "2.1%",
          improvementPotential: "90% error reduction"
        }
      },
      futureStateProjections: {
        efficiency: "75% improvement in process efficiency",
        costs: "30% reduction in operational costs",
        quality: "95% improvement in accuracy and quality",
        competitivePosition: "Top quartile market position"
      }
    };
  }

  private static getDefaultImplementationAssessment(readinessScore: number): ImplementationAssessmentData {
    const readinessLevel = readinessScore >= 80 ? 'Highly Ready' : 
                          readinessScore >= 60 ? 'Ready' : 
                          readinessScore >= 40 ? 'Needs Preparation' : 'Not Ready';

    return {
      readinessScore,
      readinessLevel,
      strengths: [
        "Strong executive leadership support",
        "Existing technology infrastructure",
        "Clear business process documentation",
        "Experienced IT team"
      ],
      preparationAreas: [
        "AI governance framework development",
        "Staff AI literacy training",
        "Data quality improvement",
        "Change management strategy"
      ],
      successFactors: [
        "Executive sponsorship and commitment",
        "Cross-functional team collaboration",
        "Phased implementation approach",
        "Continuous monitoring and adjustment"
      ],
      recommendedApproach: {
        strategy: readinessScore >= 70 ? 'Balanced' : 'Conservative',
        reasoning: "Based on current readiness level and organizational capabilities",
        keyPrinciples: [
          "Start with high-impact, low-risk opportunities",
          "Build capabilities incrementally",
          "Measure and demonstrate value early",
          "Scale successful implementations"
        ]
      },
      changeManagement: {
        stakeholderEngagement: [
          "Executive steering committee",
          "Department champions network",
          "Regular communication updates"
        ],
        trainingRequirements: [
          "AI awareness sessions for all staff",
          "Detailed training for power users",
          "Technical training for IT team"
        ],
        communicationStrategy: [
          "Regular progress updates",
          "Success story sharing",
          "Feedback collection and response"
        ]
      },
      resourceRequirements: {
        internalTeam: [
          "Project manager",
          "Business analysts",
          "IT technical leads",
          "Change management coordinator"
        ],
        externalSupport: [
          "AI implementation partner",
          "Technical training provider",
          "Change management consultant"
        ],
        technologyInvestments: [
          "AI platform licensing",
          "Infrastructure upgrades",
          "Integration tools",
          "Monitoring and analytics tools"
        ]
      }
    };
  }

  private static getDefaultCompetitiveAnalysis(company: CompanyContext): CompetitiveAnalysisData {
    return {
      currentPosition: {
        marketRanking: company.size === 'enterprise' ? "Top 30%" : "Middle tier",
        aiMaturityVsCompetitors: company.maturityLevel > 70 ? "Above average" : "Average",
        keyDifferentiators: [
          "Strong operational foundation",
          "Customer-focused approach",
          "Agile decision-making"
        ],
        competitiveGaps: [
          "AI-powered automation",
          "Predictive analytics capabilities",
          "Real-time insights"
        ]
      },
      projectedPosition: {
        expectedRanking: "Top 15%",
        competitiveAdvantages: [
          "AI-enhanced operational efficiency",
          "Predictive decision-making capabilities",
          "Superior customer experience",
          "Cost leadership through automation"
        ],
        marketDifferentiation: [
          "Industry-leading response times",
          "Proactive service delivery",
          "Data-driven innovation"
        ],
        timeToAdvantage: "12-18 months"
      },
      industryBenchmarks: {
        aiAdoptionRate: "42% of companies in your industry",
        averageROI: "250% within 24 months",
        leaderCharacteristics: [
          "Early AI adoption",
          "Strong data culture",
          "Executive AI literacy",
          "Cross-functional collaboration"
        ],
        laggardRisks: [
          "Competitive disadvantage",
          "Higher operational costs",
          "Reduced market share",
          "Talent retention challenges"
        ]
      },
      threatAnalysis: {
        competitorActions: [
          "Increased AI investment by market leaders",
          "New AI-native competitors entering market",
          "Industry consolidation around AI capabilities"
        ],
        riskOfInaction: [
          "Loss of competitive position",
          "Increased cost disadvantage",
          "Reduced operational efficiency",
          "Customer satisfaction decline"
        ],
        urgencyFactors: [
          "Accelerating AI adoption in industry",
          "Customer expectations rising",
          "Cost pressures increasing",
          "Talent competition intensifying"
        ]
      }
    };
  }

  private static getDefaultRiskAssessment(): RiskAssessmentData {
    return {
      implementationRisks: [
        {
          risk: "Technology integration challenges",
          impact: "Medium",
          probability: "Medium",
          mitigation: [
            "Comprehensive technical assessment",
            "Pilot implementation approach",
            "Expert technical support"
          ]
        },
        {
          risk: "Staff resistance to change",
          impact: "High",
          probability: "Medium",
          mitigation: [
            "Change management program",
            "Training and communication",
            "Early wins demonstration"
          ]
        },
        {
          risk: "Budget overruns",
          impact: "Medium",
          probability: "Low",
          mitigation: [
            "Detailed project planning",
            "Phased budget approval",
            "Regular cost monitoring"
          ]
        }
      ],
      businessRisks: [
        {
          risk: "Data quality issues",
          impact: "High",
          mitigation: [
            "Data quality assessment",
            "Data cleansing processes",
            "Ongoing data governance"
          ]
        },
        {
          risk: "Operational disruption",
          impact: "Medium",
          mitigation: [
            "Parallel system operation",
            "Gradual transition plan",
            "Rollback procedures"
          ]
        }
      ],
      inactionRisks: [
        {
          risk: "Competitive disadvantage",
          impact: "High",
          timeframe: "Within 18 months"
        },
        {
          risk: "Operational inefficiency",
          impact: "Medium",
          timeframe: "Ongoing"
        },
        {
          risk: "Higher costs",
          impact: "Medium",
          timeframe: "Within 12 months"
        }
      ],
      riskSummary: {
        overallRiskLevel: "Medium",
        keyRiskFactors: [
          "Change management complexity",
          "Technology integration",
          "Data readiness"
        ],
        primaryMitigationStrategies: [
          "Comprehensive planning and preparation",
          "Phased implementation approach",
          "Strong project governance"
        ],
        riskMonitoringPlan: [
          "Weekly project status reviews",
          "Monthly stakeholder updates",
          "Quarterly risk assessment"
        ]
      }
    };
  }

  private static getDefaultQuickWins(): QuickWin[] {
    return [
      {
        title: "Automated Report Generation",
        impact: "70% reduction in manual reporting time",
        timeline: "30-45 days",
        investment: "$15K",
        expectedROI: "300% in 6 months",
        complexity: "Low",
        prerequisites: [
          "Report template standardization",
          "Data source identification"
        ],
        successMetrics: [
          "Time to generate reports",
          "Report accuracy improvement",
          "Staff satisfaction"
        ]
      },
      {
        title: "Email Response Automation",
        impact: "80% of routine emails automated",
        timeline: "60-90 days",
        investment: "$25K",
        expectedROI: "250% in 8 months",
        complexity: "Medium",
        prerequisites: [
          "Email categorization",
          "Response template library"
        ],
        successMetrics: [
          "Response time improvement",
          "Customer satisfaction scores",
          "Staff productivity gains"
        ]
      }
    ];
  }
} 