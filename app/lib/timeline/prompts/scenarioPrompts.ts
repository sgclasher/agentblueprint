/**
 * Scenario-Specific Timeline Prompts
 * 
 * This module contains the different scenario configurations for timeline generation.
 * Each scenario has specific characteristics for risk tolerance, timeline pace, and technology choices.
 */

export type ScenarioType = 'conservative' | 'balanced' | 'aggressive';

export interface ScenarioConfig {
  type: ScenarioType;
  description: string;
  instructions: string;
  characteristics: {
    riskTolerance: 'Low' | 'Medium' | 'High';
    implementationSpeed: 'Slow' | 'Moderate' | 'Fast';
    technologyFocus: 'Proven' | 'Mixed' | 'Cutting-edge';
    investmentLevel: 'Conservative' | 'Moderate' | 'Aggressive';
  };
  timelineGuidance: {
    totalDuration: string;
    phaseDuration: string;
    pilotApproach: string;
  };
}

/**
 * Scenario configurations with detailed characteristics
 */
export const SCENARIO_CONFIGS: Record<ScenarioType, ScenarioConfig> = {
  conservative: {
    type: 'conservative',
    description: 'Low-risk approach with proven technologies and extended timelines',
    instructions: 'Focus on proven technologies, lower risk, extended timelines, and gradual adoption. Prioritize stability and incremental improvements. Use established AI technologies with strong track records. Implement extensive testing and validation phases. Emphasize change management and user training.',
    characteristics: {
      riskTolerance: 'Low',
      implementationSpeed: 'Slow',
      technologyFocus: 'Proven',
      investmentLevel: 'Conservative'
    },
    timelineGuidance: {
      totalDuration: '24-36 months',
      phaseDuration: '6-12 months per phase',
      pilotApproach: 'Extensive piloting with multiple validation stages'
    }
  },
  
  balanced: {
    type: 'balanced',
    description: 'Balanced approach mixing innovation with practicality',
    instructions: 'Balance innovation with practicality. Use a mix of proven and emerging technologies with moderate timelines and measured risk. Combine stable foundations with selective innovation. Implement in phases with reasonable risk tolerance. Focus on sustainable growth and learning.',
    characteristics: {
      riskTolerance: 'Medium',
      implementationSpeed: 'Moderate',
      technologyFocus: 'Mixed',
      investmentLevel: 'Moderate'
    },
    timelineGuidance: {
      totalDuration: '18-24 months',
      phaseDuration: '4-8 months per phase',
      pilotApproach: 'Strategic pilots with measured expansion'
    }
  },
  
  aggressive: {
    type: 'aggressive',
    description: 'Fast-paced approach with cutting-edge technologies and higher risk tolerance',
    instructions: 'Emphasize cutting-edge technologies, rapid implementation, and transformational change. Accept higher risk for greater potential returns. Use latest AI capabilities and emerging technologies. Implement rapid prototyping and fast iterations. Focus on competitive advantage and market leadership.',
    characteristics: {
      riskTolerance: 'High',
      implementationSpeed: 'Fast',
      technologyFocus: 'Cutting-edge',
      investmentLevel: 'Aggressive'
    },
    timelineGuidance: {
      totalDuration: '12-18 months',
      phaseDuration: '2-6 months per phase',
      pilotApproach: 'Rapid prototyping with quick scaling decisions'
    }
  }
};

/**
 * Gets the scenario configuration for a given scenario type
 */
export function getScenarioConfig(scenarioType: ScenarioType): ScenarioConfig {
  return SCENARIO_CONFIGS[scenarioType];
}

/**
 * Gets the scenario instructions text for prompt building
 */
export function getScenarioInstructions(scenarioType: ScenarioType): string {
  return getScenarioConfig(scenarioType).instructions;
}

/**
 * Gets scenario-specific timeline guidance
 */
export function getScenarioTimelineGuidance(scenarioType: ScenarioType): string {
  const config = getScenarioConfig(scenarioType);
  const { timelineGuidance, characteristics } = config;
  
  return `**${scenarioType.toUpperCase()} SCENARIO GUIDANCE:**
- Total Implementation Duration: ${timelineGuidance.totalDuration}
- Phase Duration: ${timelineGuidance.phaseDuration}
- Risk Tolerance: ${characteristics.riskTolerance}
- Technology Focus: ${characteristics.technologyFocus}
- Implementation Speed: ${characteristics.implementationSpeed}
- Pilot Approach: ${timelineGuidance.pilotApproach}`;
}

/**
 * Validates scenario type and provides corrected value if needed
 */
export function validateScenarioType(scenarioType: string): {
  isValid: boolean;
  corrected: ScenarioType;
  error?: string;
} {
  const validScenarios: ScenarioType[] = ['conservative', 'balanced', 'aggressive'];
  
  if (validScenarios.includes(scenarioType as ScenarioType)) {
    return {
      isValid: true,
      corrected: scenarioType as ScenarioType
    };
  }
  
  // Try to correct common variations
  const normalized = scenarioType.toLowerCase().trim();
  
  if (['conservative', 'safe', 'low-risk', 'careful'].includes(normalized)) {
    return {
      isValid: true,
      corrected: 'conservative'
    };
  }
  
  if (['balanced', 'moderate', 'medium', 'standard'].includes(normalized)) {
    return {
      isValid: true,
      corrected: 'balanced'
    };
  }
  
  if (['aggressive', 'fast', 'rapid', 'high-risk', 'bold'].includes(normalized)) {
    return {
      isValid: true,
      corrected: 'aggressive'
    };
  }
  
  return {
    isValid: false,
    corrected: 'balanced', // Default fallback
    error: `Invalid scenario type: ${scenarioType}. Must be one of: ${validScenarios.join(', ')}`
  };
}

/**
 * Gets scenario-specific technology recommendations
 */
export function getScenarioTechnologyFocus(scenarioType: ScenarioType): string[] {
  const config = getScenarioConfig(scenarioType);
  
  switch (config.characteristics.technologyFocus) {
    case 'Proven':
      return [
        'Established RPA platforms',
        'Mature machine learning frameworks',
        'Proven business intelligence tools',
        'Standard integration technologies',
        'Well-documented AI APIs'
      ];
      
    case 'Mixed':
      return [
        'Proven AI foundations with selective innovation',
        'Hybrid cloud and on-premise solutions',
        'Established platforms with emerging capabilities',
        'Mature technologies with pilot emerging solutions',
        'Strategic technology partnerships'
      ];
      
    case 'Cutting-edge':
      return [
        'Latest agentic AI frameworks',
        'Emerging multimodal AI capabilities',
        'Advanced automation orchestration',
        'Next-generation analytics platforms',
        'Innovative AI-native solutions'
      ];
      
    default:
      return ['Standard AI technologies'];
  }
}

/**
 * Gets scenario-specific risk mitigation strategies
 */
export function getScenarioRiskMitigation(scenarioType: ScenarioType): string[] {
  const config = getScenarioConfig(scenarioType);
  
  switch (config.characteristics.riskTolerance) {
    case 'Low':
      return [
        'Extensive vendor due diligence and proof of concepts',
        'Multiple validation phases before scaling',
        'Comprehensive backup and rollback procedures',
        'Conservative change management with extensive training',
        'Staged rollouts with extended monitoring periods'
      ];
      
    case 'Medium':
      return [
        'Balanced risk assessment with measured pilots',
        'Phased implementation with checkpoint reviews',
        'Standard change management and user preparation',
        'Reasonable contingency planning',
        'Moderate monitoring and adjustment protocols'
      ];
      
    case 'High':
      return [
        'Rapid prototyping with fast fail-forward approach',
        'Agile risk management with quick pivots',
        'Advanced monitoring and real-time adjustments',
        'Innovation-focused change management',
        'Competitive advantage prioritization'
      ];
      
    default:
      return ['Standard risk mitigation approaches'];
  }
} 