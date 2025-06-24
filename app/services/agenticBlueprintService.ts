import { Profile, AgenticBlueprint, DigitalTeamMember, HumanCheckpoint, AgenticTimeline, KPIImprovement } from './types';

/**
 * Agentic Blueprint Service
 * 
 * This service transforms client profile data into a comprehensive AI "digital team" 
 * blueprint showing exactly what each AI agent will do, how humans stay in control, 
 * and which KPIs will improve. Uses the vendor-neutral framework to create clear,
 * actionable strategies for business transformation through agentic AI.
 */
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

    // Generate AI blueprint
    const systemPrompt = AGENTIC_BLUEPRINT_SYSTEM_PROMPT;
    const userPrompt = AGENTIC_BLUEPRINT_USER_PROMPT(profile);

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
        agenticTimeline: aiResponse.agenticTimeline,
        kpiImprovements: aiResponse.kpiImprovements,
        aiModel: preferredProvider || 'auto-selected',
        promptVersion: '1.0',
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