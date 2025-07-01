/**
 * Business Context Validator
 * 
 * Validates AI-generated blueprints based on business appropriateness
 * rather than rigid structural requirements.
 * 
 * Philosophy: Trust AI intelligence, validate business value
 * Created: January 2025
 */

import { AgenticBlueprint, Profile } from '../../../services/types';
import { KBPatternDefinition, validateAgentCount } from '../patterns/kbAlignedPatterns';

export interface ValidationResult {
  isValid: boolean;
  warnings: ValidationWarning[];
  suggestions: string[];
  qualityScore: number; // 0-100
}

export interface ValidationWarning {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

export interface BusinessContext {
  profile: Profile;
  opportunityContext?: any;
  selectedPattern: KBPatternDefinition;
}

/**
 * Validate blueprint for business appropriateness
 * Focus on value delivery, not structure
 */
export function validateBusinessAppropriateness(
  blueprint: AgenticBlueprint,
  pattern: KBPatternDefinition,
  context: BusinessContext
): ValidationResult {
  const warnings: ValidationWarning[] = [];
  const suggestions: string[] = [];
  let qualityScore = 100; // Start at 100 and deduct for issues
  
  // 1. Validate agent count appropriateness (guidance, not rigid)
  const agentCountValidation = validateAgentCount(
    pattern.patternName,
    blueprint.digitalTeam?.length || 0
  );
  
  if (!agentCountValidation.isValid) {
    warnings.push({
      field: 'digitalTeam',
      message: agentCountValidation.guidance,
      severity: agentCountValidation.severity
    });
    
    if (agentCountValidation.severity === 'error') {
      qualityScore -= 20; // Significant issue
    } else if (agentCountValidation.severity === 'warning') {
      qualityScore -= 10; // Minor concern
    }
  } else if (agentCountValidation.severity === 'info') {
    // Informational - agent count is acceptable but not typical
    suggestions.push(agentCountValidation.guidance);
  }
  
  // 2. Validate coordination mechanism alignment
  const coordinationScore = validateCoordinationMechanism(blueprint, pattern);
  if (coordinationScore < 80) {
    warnings.push({
      field: 'coordinationMechanism',
      message: `Agent interactions may not fully support ${pattern.coordinationMechanism}`,
      severity: 'warning'
    });
    qualityScore -= (100 - coordinationScore) * 0.3; // 30% weight
  }
  
  // 3. Validate business objective clarity
  const objectiveScore = validateBusinessObjective(blueprint, context);
  if (objectiveScore < 80) {
    warnings.push({
      field: 'businessObjective',
      message: 'Business objective could be more specific or measurable',
      severity: 'info'
    });
    suggestions.push('Consider adding specific metrics or timeframes to the business objective');
    qualityScore -= (100 - objectiveScore) * 0.2; // 20% weight
  }
  
  // 4. Validate KPI alignment with business problems
  const kpiScore = validateKPIAlignment(blueprint, context);
  if (kpiScore < 70) {
    warnings.push({
      field: 'kpiImprovements',
      message: 'KPIs could better align with identified business problems',
      severity: 'warning'
    });
    qualityScore -= (100 - kpiScore) * 0.2; // 20% weight
  }
  
  // 5. Validate human oversight appropriateness
  const oversightScore = validateHumanOversight(blueprint, pattern);
  if (oversightScore < 80) {
    warnings.push({
      field: 'humanCheckpoints',
      message: `Human oversight may not match ${pattern.riskProfile} risk profile`,
      severity: 'info'
    });
    suggestions.push('Consider adjusting oversight levels based on risk profile');
    qualityScore -= (100 - oversightScore) * 0.1; // 10% weight
  }
  
  // 6. Validate timeline realism
  const timelineScore = validateTimeline(blueprint, pattern, context);
  if (timelineScore < 70) {
    warnings.push({
      field: 'agenticTimeline',
      message: 'Timeline may be overly optimistic for implementation complexity',
      severity: 'warning'
    });
    qualityScore -= (100 - timelineScore) * 0.2; // 20% weight
  }
  
  // Generate improvement suggestions based on analysis
  if (context.opportunityContext) {
    suggestions.push('Blueprint appears well-aligned with the specific AI opportunity');
  }
  
  if (pattern.implementationComplexity === 'high' && blueprint.agenticTimeline?.totalDurationWeeks < 20) {
    suggestions.push(`Consider extending timeline for ${pattern.patternName} pattern due to high complexity`);
  }
  
  // Determine overall validity (flexible threshold)
  const isValid = qualityScore >= 60; // 60% is acceptable, not perfect
  
  return {
    isValid,
    warnings,
    suggestions,
    qualityScore: Math.max(0, Math.round(qualityScore))
  };
}

/**
 * Validate coordination mechanism implementation
 */
function validateCoordinationMechanism(
  blueprint: AgenticBlueprint,
  pattern: KBPatternDefinition
): number {
  let score = 100;
  
  // Check if agents have appropriate interaction patterns
  const agents = blueprint.digitalTeam || [];
  
  switch (pattern.patternName) {
    case 'Manager-Workers':
      // Should have one clear coordinator
      const coordinators = agents.filter(a => 
        a.role?.toLowerCase().includes('manager') ||
        a.role?.toLowerCase().includes('coordinator') ||
        a.title?.toLowerCase().includes('orchestrat')
      );
      if (coordinators.length !== 1) {
        score -= 30; // Unclear coordination
      }
      break;
      
    case 'Plan-and-Execute':
      // Should have distinct planner and executor roles
      const planners = agents.filter(a => 
        a.role?.toLowerCase().includes('plan') ||
        a.title?.toLowerCase().includes('strateg')
      );
      const executors = agents.filter(a => 
        a.role?.toLowerCase().includes('execut') ||
        a.role?.toLowerCase().includes('implement')
      );
      if (planners.length === 0 || executors.length === 0) {
        score -= 40; // Missing key roles
      }
      break;
      
    case 'Blackboard-Shared-Memory':
      // All agents should mention shared memory/blackboard
      const sharedMemoryAgents = agents.filter(a =>
        a.interactionPatterns?.some(p => 
          p.toLowerCase().includes('shared') ||
          p.toLowerCase().includes('blackboard') ||
          p.toLowerCase().includes('publish')
        )
      );
      if (sharedMemoryAgents.length < agents.length * 0.7) {
        score -= 30; // Insufficient shared memory usage
      }
      break;
  }
  
  return score;
}

/**
 * Validate business objective quality
 */
function validateBusinessObjective(
  blueprint: AgenticBlueprint,
  context: BusinessContext
): number {
  let score = 100;
  const objective = blueprint.businessObjective || '';
  
  // Check length and specificity
  if (objective.length < 30) {
    score -= 30; // Too brief
  }
  
  // Check for measurability
  const hasMeasurableTerms = /\d+%|\d+ (days|weeks|months|hours)|reduce|increase|improve|optimize/i.test(objective);
  if (!hasMeasurableTerms) {
    score -= 20; // Not measurable
  }
  
  // Check alignment with opportunity
  if (context.opportunityContext) {
    const opportunityTitle = context.opportunityContext.title?.toLowerCase() || '';
    const objectiveLower = objective.toLowerCase();
    
    if (!objectiveLower.includes(opportunityTitle) && opportunityTitle) {
      score -= 20; // Doesn't reference specific opportunity
    }
  }
  
  return score;
}

/**
 * Validate KPI alignment with business problems
 */
function validateKPIAlignment(
  blueprint: AgenticBlueprint,
  context: BusinessContext
): number {
  let score = 100;
  const kpis = blueprint.kpiImprovements || [];
  
  // Check KPI count (flexible)
  if (kpis.length < 2) {
    score -= 30; // Too few KPIs
  } else if (kpis.length > 8) {
    score -= 20; // Too many KPIs (focus concern)
  }
  
  // Check KPI quality
  const wellDefinedKPIs = kpis.filter(kpi => 
    kpi.improvementPercent > 0 &&
    kpi.targetValue &&
    kpi.measurementMethod &&
    kpi.linkedAgents?.length > 0
  );
  
  if (wellDefinedKPIs.length < kpis.length * 0.8) {
    score -= 20; // Some KPIs lack detail
  }
  
  // Check alignment with business problems
  const businessProblems = context.profile.strategicInitiatives
    ?.flatMap(i => i.businessProblems || [])
    .map(p => p.toLowerCase()) || [];
  
  if (businessProblems.length > 0) {
    const alignedKPIs = kpis.filter(kpi => 
      businessProblems.some(problem => 
        kpi.kpi.toLowerCase().includes(problem) ||
        problem.includes(kpi.kpi.toLowerCase())
      )
    );
    
    if (alignedKPIs.length < kpis.length * 0.5) {
      score -= 20; // Poor alignment with stated problems
    }
  }
  
  return score;
}

/**
 * Validate human oversight appropriateness
 */
function validateHumanOversight(
  blueprint: AgenticBlueprint,
  pattern: KBPatternDefinition
): number {
  let score = 100;
  const checkpoints = blueprint.humanCheckpoints || [];
  const agents = blueprint.digitalTeam || [];
  
  // Flexible checkpoint count based on risk
  if (pattern.riskProfile === 'high' && checkpoints.length < 3) {
    score -= 30; // High risk needs more oversight
  } else if (pattern.riskProfile === 'low' && checkpoints.length > 6) {
    score -= 20; // Too much oversight for low risk
  }
  
  // Check agent oversight levels
  const humanApprovalAgents = agents.filter(a => 
    a.oversightLevel === 'human-approval'
  );
  
  if (pattern.riskProfile === 'high' && humanApprovalAgents.length < 1) {
    score -= 30; // High risk needs human approval points
  }
  
  // Check for progressive trust model
  const phases = blueprint.agenticTimeline?.phases || [];
  const hasProgressiveTrust = phases.some(p => p.phase === 'crawl' && p.oversightLevel === 'high') &&
                              phases.some(p => p.phase === 'run' && p.oversightLevel === 'low');
  
  if (!hasProgressiveTrust && phases.length >= 3) {
    score -= 20; // Missing progressive trust model
  }
  
  return score;
}

/**
 * Validate timeline realism
 */
function validateTimeline(
  blueprint: AgenticBlueprint,
  pattern: KBPatternDefinition,
  context: BusinessContext
): number {
  let score = 100;
  const timeline = blueprint.agenticTimeline;
  
  if (!timeline) {
    return 0; // No timeline
  }
  
  const totalWeeks = timeline.totalDurationWeeks || 0;
  
  // Check against pattern complexity
  if (pattern.implementationComplexity === 'high' && totalWeeks < 16) {
    score -= 30; // Too short for complex pattern
  } else if (pattern.implementationComplexity === 'low' && totalWeeks > 32) {
    score -= 20; // Too long for simple pattern
  }
  
  // Check phase distribution
  const phases = timeline.phases || [];
  if (phases.length > 0) {
    const crawlPhase = phases.find(p => p.phase === 'crawl');
    const runPhase = phases.find(p => p.phase === 'run');
    
    if (crawlPhase && runPhase) {
      const crawlRatio = (crawlPhase.durationWeeks || 0) / totalWeeks;
      const runRatio = (runPhase.durationWeeks || 0) / totalWeeks;
      
      // High risk should have longer crawl phase
      if (pattern.riskProfile === 'high' && crawlRatio < 0.3) {
        score -= 20; // Crawl phase too short for risk
      }
      
      // Low risk can have shorter crawl phase
      if (pattern.riskProfile === 'low' && crawlRatio > 0.5) {
        score -= 10; // Overly cautious for low risk
      }
    }
  }
  
  // Check company size impact
  const employeeCount = parseInt(context.profile.employeeCount?.toString() || '0');
  if (employeeCount > 1000 && totalWeeks < 20) {
    score -= 20; // Large org needs more time
  }
  
  return score;
}

/**
 * Generate quality improvement suggestions
 */
export function generateQualitySuggestions(
  blueprint: AgenticBlueprint,
  pattern: KBPatternDefinition,
  validationResult: ValidationResult
): string[] {
  const suggestions: string[] = [...validationResult.suggestions];
  
  // Add pattern-specific suggestions
  if (validationResult.qualityScore < 80) {
    suggestions.push(
      `Consider reviewing the ${pattern.patternName} pattern examples in the knowledge base`,
      `Ensure agents are designed to support ${pattern.coordinationMechanism}`
    );
  }
  
  // Add score-based suggestions
  if (validationResult.qualityScore < 70) {
    suggestions.push(
      'Blueprint may benefit from more specific business problem focus',
      'Consider adding more concrete success metrics'
    );
  }
  
  return suggestions;
} 