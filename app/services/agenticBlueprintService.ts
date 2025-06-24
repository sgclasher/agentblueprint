import { Profile, AgenticBlueprint, DigitalTeamMember, HumanCheckpoint, AgenticTimeline, KPIImprovement } from './types';

/**
 * Agentic Blueprint Service
 * 
 * This service transforms client profile data into a comprehensive AI "digital team" 
 * blueprint showing exactly what each AI agent will do, how humans stay in control, 
 * and which KPIs will improve. Uses the vendor-neutral framework to create clear,
 * actionable strategies for business transformation through agentic AI.
 */

// 🆕 Enhanced Business Context Processing for Quality Improvement
interface BusinessContext {
  industrySpecific: {
    terminology: string[];
    commonTools: string[];
    typicalKPIs: string[];
    regulatoryRequirements: string[];
    riskFactors: string[];
  };
  companySpecific: {
    systemsInventory: string[];
    businessProblems: string[];
    existingMetrics: string[];
    priorityInitiatives: string[];
    organizationalConstraints: string[];
  };
  implementationContext: {
    complexityScore: number;
    timelineMultiplier: number;
    riskLevel: 'low' | 'medium' | 'high';
    changeReadiness: number;
  };
}

export class AgenticBlueprintService {
  
  /**
   * Generate agentic blueprint for a profile using AI service
   * @param profile - Client profile data
   * @param userId - User ID for authentication
   * @param credentialsRepo - Credentials repository
   * @param preferredProvider - AI provider preference
   * @returns AI-generated agentic blueprint
   */
  static async generateBlueprint(
    profile: Profile, 
    userId: string, 
    credentialsRepo: any, 
    preferredProvider?: string
  ): Promise<AgenticBlueprint> {
    if (!profile) {
      throw new Error('Profile is required for blueprint generation');
    }

    // Validate profile has sufficient data
    if (!profile.strategicInitiatives || profile.strategicInitiatives.length === 0) {
      throw new Error('Profile must have at least one strategic initiative to generate a blueprint');
    }

    // 🆕 PHASE 2 ENHANCEMENT: Extract rich business context before AI generation
    const businessContext = this.extractBusinessContext(profile);
    
    // 🆕 Generate industry-specific constraints and priorities
    const industryConstraints = this.generateIndustryConstraints(profile.industry, businessContext);
    
    // 🆕 Map strategic initiatives to agent capabilities
    const agentCapabilityMapping = this.mapInitiativesToAgentCapabilities(profile.strategicInitiatives || []);
    
    // 🆕 Calculate realistic timeline based on business context
    const timelineRecommendation = this.calculateTimelineRecommendation(businessContext);

    // Check if AI service is configured
    const { aiService } = await import('./aiService');
    const isConfigured = await aiService.isConfigured(userId, credentialsRepo, preferredProvider);
    
    if (!isConfigured) {
      throw new Error('No AI provider configured. Please configure an AI provider in admin settings.');
    }

    // Import prompts and types
    const { 
      AGENTIC_BLUEPRINT_SYSTEM_PROMPT, 
      AGENTIC_BLUEPRINT_USER_PROMPT, 
      validateAgenticBlueprintResponse
    } = await import('../lib/llm/prompts/agenticBlueprintPrompt');
    
    // Import the interface type
    type AgenticBlueprintResponse = import('../lib/llm/prompts/agenticBlueprintPrompt').AgenticBlueprintResponse;

    // 🆕 Enhanced prompt with business context
    const systemPrompt = AGENTIC_BLUEPRINT_SYSTEM_PROMPT;
    const userPrompt = AGENTIC_BLUEPRINT_USER_PROMPT(profile, businessContext, agentCapabilityMapping, timelineRecommendation);

    try {
      const aiResponse: AgenticBlueprintResponse = await aiService.generateJson(
        systemPrompt,
        userPrompt,
        userId,
        credentialsRepo,
        preferredProvider
      );

      // Validate response structure
      const warnings = validateAgenticBlueprintResponse(aiResponse);
      if (warnings && warnings.length > 0) {
        console.warn('AI blueprint response validation warnings:', warnings);
        if (warnings.some((w: string) => w.includes('Digital team must have exactly 5') || w.includes('missing required fields'))) {
          throw new Error('Invalid AI response structure: missing required fields or incorrect team size');
        }
      }

      // Transform AI response to AgenticBlueprint format
      const blueprint: AgenticBlueprint = {
        id: this.generateBlueprintId(),
        profileId: profile.id,
        userId: userId,
        businessObjective: aiResponse.businessObjective,
        digitalTeam: aiResponse.digitalTeam,
        humanCheckpoints: aiResponse.humanCheckpoints,
        agenticTimeline: {
          ...aiResponse.agenticTimeline,
          progressiveTrust: this.generateProgressiveTrustLevels(aiResponse.agenticTimeline)
        },
        kpiImprovements: aiResponse.kpiImprovements,
        aiModel: preferredProvider || 'auto-selected',
        promptVersion: '2.0', // 🆕 Updated for enhanced context processing
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      return blueprint;
    } catch (error: any) {
      console.error('Agentic blueprint generation failed:', error);
      throw error;
    }
  }

  /**
   * 🆕 Extract comprehensive business context from profile
   */
  private static extractBusinessContext(profile: Profile): BusinessContext {
    try {
      const industrySpecific = this.getIndustrySpecificContext(profile.industry);
      const companySpecific = this.getCompanySpecificContext(profile);
      const implementationContext = this.calculateImplementationContext(profile);

      return {
        industrySpecific,
        companySpecific,
        implementationContext
      };
    } catch (error) {
      console.error('[AgenticBlueprint] Error extracting business context:', error);
      // Return safe defaults if context extraction fails
      return {
        industrySpecific: {
          terminology: ['business process', 'operational efficiency'],
          commonTools: ['Business applications', 'Data analytics'],
          typicalKPIs: ['Operational efficiency', 'Cost reduction'],
          regulatoryRequirements: ['Industry standards'],
          riskFactors: ['Operational risk']
        },
        companySpecific: {
          systemsInventory: [],
          businessProblems: [],
          existingMetrics: [],
          priorityInitiatives: [],
          organizationalConstraints: []
        },
        implementationContext: {
          complexityScore: 50,
          timelineMultiplier: 1.0,
          riskLevel: 'medium',
          changeReadiness: 50
        }
      };
    }
  }

  /**
   * 🆕 Get industry-specific context for AI prompt enhancement
   */
  private static getIndustrySpecificContext(industry: string): BusinessContext['industrySpecific'] {
    const industryMap: Record<string, BusinessContext['industrySpecific']> = {
      'Manufacturing': {
        terminology: ['production planning', 'lean manufacturing', 'quality control', 'supply chain', 'throughput', 'OEE'],
        commonTools: ['ERP systems', 'MES platforms', 'WMS solutions', 'Quality management systems', 'Production planning tools'],
        typicalKPIs: ['Overall Equipment Effectiveness', 'First Pass Yield', 'Cycle Time', 'Inventory Turnover', 'Schedule Adherence'],
        regulatoryRequirements: ['ISO 9001', 'FDA compliance', 'OSHA safety standards', 'Environmental regulations'],
        riskFactors: ['Supply chain disruption', 'Equipment downtime', 'Quality control failures', 'Safety incidents']
      },
      'Technology': {
        terminology: ['deployment', 'scalability', 'DevOps', 'API integration', 'cloud architecture', 'microservices'],
        commonTools: ['CI/CD pipelines', 'Cloud platforms', 'Monitoring tools', 'API gateways', 'Container orchestration'],
        typicalKPIs: ['System uptime', 'Deployment frequency', 'Lead time', 'Mean time to recovery', 'Customer acquisition cost'],
        regulatoryRequirements: ['SOC 2', 'GDPR compliance', 'Data privacy laws', 'Security frameworks'],
        riskFactors: ['Security breaches', 'System outages', 'Data loss', 'Compliance violations']
      },
      'Healthcare': {
        terminology: ['patient care', 'clinical workflow', 'EHR integration', 'care coordination', 'clinical decision support'],
        commonTools: ['Electronic Health Records', 'PACS systems', 'Clinical decision support', 'Revenue cycle management'],
        typicalKPIs: ['Patient satisfaction', 'Clinical quality metrics', 'Length of stay', 'Readmission rates', 'Provider efficiency'],
        regulatoryRequirements: ['HIPAA', 'Joint Commission', 'CMS regulations', 'Clinical quality measures'],
        riskFactors: ['Patient safety', 'Privacy breaches', 'Regulatory non-compliance', 'Medical errors']
      },
      'Financial Services': {
        terminology: ['risk management', 'compliance', 'customer onboarding', 'fraud detection', 'regulatory reporting'],
        commonTools: ['Core banking systems', 'Risk management platforms', 'CRM systems', 'Trading platforms'],
        typicalKPIs: ['Customer acquisition cost', 'Loan processing time', 'Risk-adjusted returns', 'Compliance metrics'],
        regulatoryRequirements: ['SOX', 'Basel III', 'GDPR', 'PCI DSS', 'Anti-money laundering'],
        riskFactors: ['Regulatory penalties', 'Fraud losses', 'Market volatility', 'Cyber attacks']
      }
    };

    return industryMap[industry] || {
      terminology: ['business process', 'operational efficiency', 'performance optimization'],
      commonTools: ['Business applications', 'Data analytics', 'Process automation'],
      typicalKPIs: ['Operational efficiency', 'Cost reduction', 'Process improvement'],
      regulatoryRequirements: ['Industry standards', 'Data protection'],
      riskFactors: ['Operational risk', 'Compliance risk', 'Technology risk']
    };
  }

  /**
   * 🆕 Extract company-specific context from profile
   */
  private static getCompanySpecificContext(profile: Profile): BusinessContext['companySpecific'] {
    const systemsInventory = (profile.systemsAndApplications || []).map(sys => sys.name);
    const businessProblems = (profile.strategicInitiatives || []).flatMap(init => init.businessProblems || []);
    const existingMetrics = (profile.strategicInitiatives || []).flatMap(init => init.successMetrics || []);
    const priorityInitiatives = (profile.strategicInitiatives || [])
      .filter(init => init.priority === 'High')
      .map(init => init.initiative);

    // Generate organizational constraints based on company size
    const organizationalConstraints = this.generateOrganizationalConstraints(profile);

    return {
      systemsInventory,
      businessProblems,
      existingMetrics,
      priorityInitiatives,
      organizationalConstraints
    };
  }

  /**
   * 🆕 Calculate implementation context for timeline and complexity assessment
   */
  private static calculateImplementationContext(profile: Profile): BusinessContext['implementationContext'] {
    let complexityScore = 0;
    let timelineMultiplier = 1.0;
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    let changeReadiness = 50; // Default moderate readiness

    // Factor in company size
    const employeeCount = this.parseEmployeeCount(profile.employeeCount);
    if (employeeCount > 1000) {
      complexityScore += 30;
      timelineMultiplier *= 1.5;
      riskLevel = 'high';
    } else if (employeeCount > 250) {
      complexityScore += 15;
      timelineMultiplier *= 1.2;
      riskLevel = 'medium';
    }

    // Factor in number of systems
    const systemCount = (profile.systemsAndApplications || []).length;
    complexityScore += systemCount * 5;
    timelineMultiplier *= (1 + systemCount * 0.1);

    // Factor in number of high-priority initiatives
    const highPriorityCount = (profile.strategicInitiatives || [])
      .filter(init => init.priority === 'High').length;
    complexityScore += highPriorityCount * 10;

    // Industry-specific risk adjustment
    if (['Healthcare', 'Financial Services'].includes(profile.industry)) {
      riskLevel = riskLevel === 'low' ? 'medium' : 'high';
      changeReadiness -= 15; // More conservative in regulated industries
    }

    return {
      complexityScore: Math.min(complexityScore, 100),
      timelineMultiplier: Math.min(timelineMultiplier, 2.0),
      riskLevel,
      changeReadiness: Math.max(20, Math.min(changeReadiness, 100))
    };
  }

  /**
   * 🆕 Generate organizational constraints based on company characteristics
   */
  private static generateOrganizationalConstraints(profile: Profile): string[] {
    const constraints: string[] = [];
    const employeeCount = this.parseEmployeeCount(profile.employeeCount);

    // Size-based constraints
    if (employeeCount < 50) {
      constraints.push('Limited IT resources for implementation');
      constraints.push('Need for simple, low-maintenance solutions');
    } else if (employeeCount > 1000) {
      constraints.push('Complex approval processes required');
      constraints.push('Multiple stakeholder alignment needed');
      constraints.push('Enterprise security and compliance requirements');
    }

    // Industry-specific constraints
    if (['Healthcare', 'Financial Services'].includes(profile.industry)) {
      constraints.push('Strict regulatory compliance requirements');
      constraints.push('Extensive documentation and audit trails needed');
    }

    // System complexity constraints
    const systemCount = (profile.systemsAndApplications || []).length;
    if (systemCount > 5) {
      constraints.push('Complex system integration requirements');
      constraints.push('Data consistency across multiple platforms');
    }

    return constraints;
  }

  /**
   * 🆕 Map strategic initiatives to agent capabilities
   */
  private static mapInitiativesToAgentCapabilities(initiatives: Profile['strategicInitiatives']): Record<string, string[]> {
    const mapping: Record<string, string[]> = {
      coordinator: [],
      researcher: [],
      analyst: [],
      'quality-checker': [],
      actuator: []
    };

    (initiatives || []).forEach(initiative => {
      const problems = initiative.businessProblems || [];
      
      problems.forEach(problem => {
        const lowerProblem = problem.toLowerCase();
        
        // Map problems to appropriate agent roles
        if (lowerProblem.includes('planning') || lowerProblem.includes('scheduling') || lowerProblem.includes('coordination')) {
          mapping.coordinator.push(problem);
        }
        if (lowerProblem.includes('data') || lowerProblem.includes('information') || lowerProblem.includes('search')) {
          mapping.researcher.push(problem);
        }
        if (lowerProblem.includes('analysis') || lowerProblem.includes('insights') || lowerProblem.includes('reporting')) {
          mapping.analyst.push(problem);
        }
        if (lowerProblem.includes('quality') || lowerProblem.includes('compliance') || lowerProblem.includes('error')) {
          mapping['quality-checker'].push(problem);
        }
        if (lowerProblem.includes('process') || lowerProblem.includes('execution') || lowerProblem.includes('automation')) {
          mapping.actuator.push(problem);
        }
      });
    });

    return mapping;
  }

  /**
   * 🆕 Calculate timeline recommendation based on business context
   */
  private static calculateTimelineRecommendation(context: BusinessContext): {
    totalWeeks: number;
    crawlWeeks: number;
    walkWeeks: number;
    runWeeks: number;
    rationale: string;
  } {
    const baseWeeks = 24;
    const adjustedWeeks = Math.round(baseWeeks * context.implementationContext.timelineMultiplier);
    
    // Distribute phases based on risk level
    let crawlRatio = 0.33;
    let walkRatio = 0.42;
    let runRatio = 0.25;

    if (context.implementationContext.riskLevel === 'high') {
      crawlRatio = 0.42;
      walkRatio = 0.33;
      runRatio = 0.25;
    } else if (context.implementationContext.riskLevel === 'low') {
      crawlRatio = 0.25;
      walkRatio = 0.42;
      runRatio = 0.33;
    }

    const crawlWeeks = Math.round(adjustedWeeks * crawlRatio);
    const walkWeeks = Math.round(adjustedWeeks * walkRatio);
    const runWeeks = adjustedWeeks - crawlWeeks - walkWeeks;

    const rationale = `Timeline adjusted for ${context.implementationContext.riskLevel} risk level and complexity score of ${context.implementationContext.complexityScore}`;

    return {
      totalWeeks: adjustedWeeks,
      crawlWeeks,
      walkWeeks,
      runWeeks,
      rationale
    };
  }

  /**
   * 🆕 Generate industry-specific constraints for AI prompt
   */
  private static generateIndustryConstraints(industry: string, context: BusinessContext): string[] {
    const constraints: string[] = [];
    
    // Add regulatory constraints
    constraints.push(...context.industrySpecific.regulatoryRequirements.map(req => 
      `Must comply with ${req} regulations`
    ));
    
    // Add risk-based constraints
    constraints.push(...context.industrySpecific.riskFactors.map(risk => 
      `Must mitigate ${risk.toLowerCase()}`
    ));
    
    // Add organizational constraints
    constraints.push(...context.companySpecific.organizationalConstraints);
    
    return constraints;
  }

  /**
   * 🆕 Helper to parse employee count from string or number
   */
  private static parseEmployeeCount(employeeCount?: string | number): number {
    if (!employeeCount) return 100; // Default assumption
    
    // Handle if it's already a number
    if (typeof employeeCount === 'number') {
      return employeeCount;
    }
    
    // Handle if it's a string
    if (typeof employeeCount === 'string') {
      const number = parseInt(employeeCount.replace(/[^0-9]/g, ''));
      return isNaN(number) ? 100 : number;
    }
    
    // Fallback for any other type
    return 100;
  }

  /**
   * 🆕 Generate progressive trust levels for the timeline
   */
  private static generateProgressiveTrustLevels(timeline: any): any[] {
    const trustLevels: any[] = [];
    let currentWeek = 1;
    
    timeline.phases?.forEach((phase: any) => {
      const phaseWeeks = phase.durationWeeks || 8;
      const startTrust = phase.phase === 'crawl' ? 20 : phase.phase === 'walk' ? 50 : 80;
      const endTrust = phase.phase === 'crawl' ? 40 : phase.phase === 'walk' ? 75 : 95;
      
      // Generate trust level for middle of phase
      const midWeek = currentWeek + Math.floor(phaseWeeks / 2);
      const midTrust = (startTrust + endTrust) / 2;
      
      trustLevels.push({
        week: midWeek,
        trustLevel: midTrust,
        autonomyDescription: `${phase.phase.charAt(0).toUpperCase() + phase.phase.slice(1)} phase autonomy`,
        safeguards: phase.riskMitigations || []
      });
      
      currentWeek += phaseWeeks;
    });
    
    return trustLevels;
  }

  /**
   * Generate a unique blueprint ID
   */
  private static generateBlueprintId(): string {
    return `blueprint_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Validate profile readiness for blueprint generation
   * @param profile - Client profile data
   * @returns Validation result with readiness score and recommendations
   */
  static validateProfileReadiness(profile: Profile): {
    isReady: boolean;
    readinessScore: number;
    recommendations: string[];
  } {
    const recommendations: string[] = [];
    let score = 0;

    // Check strategic initiatives (40 points max)
    const initiatives = profile.strategicInitiatives || [];
    if (initiatives.length === 0) {
      recommendations.push('Add at least one strategic initiative with business problems');
    } else {
      score += Math.min(initiatives.length * 10, 30);
      
      // Check for business problems
      const initiativesWithProblems = initiatives.filter(init => 
        init.businessProblems && init.businessProblems.length > 0
      );
      
      if (initiativesWithProblems.length === 0) {
        recommendations.push('Add specific business problems to your strategic initiatives');
      } else {
        score += 10;
      }
    }

    // Check systems and applications (30 points max)
    const systems = profile.systemsAndApplications || [];
    if (systems.length === 0) {
      recommendations.push('Add your current systems and applications to understand integration opportunities');
    } else {
      score += Math.min(systems.length * 5, 20);
      
      // Bonus for system details
      const detailedSystems = systems.filter(sys => sys.description && sys.description.length > 0);
      if (detailedSystems.length > 0) {
        score += 10;
      }
    }

    // Check company information (20 points max)
    if (!profile.industry || !profile.employeeCount) {
      recommendations.push('Complete company information (industry and employee count)');
    } else {
      score += 20;
    }

    // Check for outcomes and metrics (10 points max)
    const initiativesWithOutcomes = initiatives.filter(init => 
      (init.expectedOutcomes && init.expectedOutcomes.length > 0) ||
      (init.successMetrics && init.successMetrics.length > 0)
    );
    
    if (initiativesWithOutcomes.length === 0) {
      recommendations.push('Add expected outcomes and success metrics to your initiatives');
    } else {
      score += 10;
    }

    return {
      isReady: score >= 50, // Minimum 50% readiness required
      readinessScore: score,
      recommendations
    };
  }

  /**
   * Analyze blueprint effectiveness and provide improvement suggestions
   * @param blueprint - Generated blueprint
   * @param profile - Original profile data
   * @returns Analysis with effectiveness score and suggestions
   */
  static analyzeBlueprint(blueprint: AgenticBlueprint, profile: Profile): {
    effectivenessScore: number;
    strengths: string[];
    improvementSuggestions: string[];
  } {
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Analyze business objective clarity (20 points)
    if (blueprint.businessObjective && blueprint.businessObjective.length > 50) {
      score += 20;
      strengths.push('Clear, specific business objective defined');
    } else {
      improvements.push('Business objective could be more specific and measurable');
    }

    // Analyze digital team completeness (25 points)
    if (blueprint.digitalTeam.length === 5) {
      score += 15;
      
      // Check for role diversity
      const roles = blueprint.digitalTeam.map(agent => agent.role);
      const uniqueRoles = new Set(roles);
      if (uniqueRoles.size === 5) {
        score += 10;
        strengths.push('Complete digital team with all 5 specialized roles');
      }
    } else {
      improvements.push('Digital team should have exactly 5 specialized agents');
    }

    // Analyze human oversight design (20 points)
    if (blueprint.humanCheckpoints.length === 4) {
      score += 20;
      strengths.push('Comprehensive human oversight framework with all control points');
    } else {
      improvements.push('Human oversight should include all 4 critical checkpoints');
    }

    // Analyze timeline structure (20 points)
    if (blueprint.agenticTimeline.phases.length === 3) {
      score += 15;
      
      // Check for progressive trust model
      const phases = blueprint.agenticTimeline.phases.map(p => p.phase);
      if (phases.includes('crawl') && phases.includes('walk') && phases.includes('run')) {
        score += 5;
        strengths.push('Well-structured crawl-walk-run implementation timeline');
      }
    } else {
      improvements.push('Implementation timeline should follow the crawl-walk-run methodology');
    }

    // Analyze KPI alignment (15 points)
    if (blueprint.kpiImprovements.length >= 3) {
      score += 10;
      
      // Check for quantified improvements
      const quantifiedKPIs = blueprint.kpiImprovements.filter(kpi => 
        kpi.improvementPercent > 0 && kpi.targetValue
      );
      
      if (quantifiedKPIs.length === blueprint.kpiImprovements.length) {
        score += 5;
        strengths.push('All KPIs have quantified improvement targets');
      }
    } else {
      improvements.push('Should identify at least 3 key KPI improvements');
    }

    return {
      effectivenessScore: score,
      strengths,
      improvementSuggestions: improvements
    };
  }

  /**
   * Extract key insights from blueprint for executive summary
   * @param blueprint - Generated blueprint
   * @returns Executive insights
   */
  static extractExecutiveInsights(blueprint: AgenticBlueprint): {
    primaryObjective: string;
    keyBenefits: string[];
    implementationDuration: string;
    riskMitigations: string[];
    expectedROI: string;
  } {
    // Calculate total expected improvement
    const avgImprovement = blueprint.kpiImprovements.reduce((sum, kpi) => 
      sum + kpi.improvementPercent, 0
    ) / blueprint.kpiImprovements.length;

    // Extract risk mitigations from all phases
    const allRiskMitigations = blueprint.agenticTimeline.phases.flatMap(phase => 
      phase.riskMitigations
    );

    // Get unique risk mitigations
    const uniqueRiskMitigations = [...new Set(allRiskMitigations)];

    return {
      primaryObjective: blueprint.businessObjective,
      keyBenefits: blueprint.kpiImprovements.map(kpi => 
        `${kpi.kpi}: ${kpi.improvementPercent}% improvement`
      ),
      implementationDuration: `${blueprint.agenticTimeline.totalDurationWeeks} weeks`,
      riskMitigations: uniqueRiskMitigations.slice(0, 5), // Top 5 risk mitigations
      expectedROI: `${Math.round(avgImprovement)}% average improvement across key metrics`
    };
  }

  /**
   * Generate implementation checklist from blueprint
   * @param blueprint - Generated blueprint
   * @returns Structured implementation checklist
   */
  static generateImplementationChecklist(blueprint: AgenticBlueprint): {
    phase: string;
    weeks: number;
    tasks: Array<{
      category: string;
      task: string;
      owner: string;
      priority: 'High' | 'Medium' | 'Low';
    }>;
  }[] {
    return blueprint.agenticTimeline.phases.map(phase => ({
      phase: phase.name,
      weeks: phase.durationWeeks,
      tasks: [
        ...phase.milestones.map(milestone => ({
          category: 'Milestone',
          task: milestone,
          owner: 'Project Team',
          priority: 'High' as const
        })),
        ...phase.riskMitigations.map(risk => ({
          category: 'Risk Mitigation',
          task: risk,
          owner: 'Risk Manager',
          priority: 'Medium' as const
        })),
        {
          category: 'Human Oversight',
          task: phase.humanInvolvement,
          owner: 'Leadership Team',
          priority: 'High' as const
        }
      ]
    }));
  }
} 