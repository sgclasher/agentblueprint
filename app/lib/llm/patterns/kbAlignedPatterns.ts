/**
 * KB-Aligned Pattern Definitions
 * 
 * This module provides pattern definitions that align with the Knowledge Base philosophy:
 * - Focus on coordination mechanisms, not rigid structures
 * - Flexible agent counts based on business needs
 * - Guidance rather than requirements
 * 
 * Based on: KB_AGENTIC_DESIGN_PATTERNS.md
 * Created: January 2025
 */

export interface KBPatternDefinition {
  patternName: string;
  patternType: 'single-agent' | 'planning-hybrid' | 'multi-agent';
  description: string;
  coordinationMechanism: string;
  bestFor: string[];
  agentCountGuidance: {
    min: number;
    max: number;
    typical: number;
    rationale: string;
  };
  scalabilityPath: string;
  riskProfile: 'low' | 'medium' | 'high';
  implementationComplexity: 'low' | 'medium' | 'high';
  // Key difference: No prescriptive agent definitions
  // AI providers will design agents based on business context
}

// =============================================================================
// SINGLE-AGENT REASONING LOOPS
// =============================================================================

const TOOL_USE_PATTERN: KBPatternDefinition = {
  patternName: 'Tool-Use',
  patternType: 'single-agent',
  description: 'LLM decides when to invoke an external function/API and merges the result into context',
  coordinationMechanism: 'Single agent with tool orchestration',
  bestFor: ['One-shot answer + optional API call', 'Simple data retrieval', 'Direct system integration'],
  agentCountGuidance: {
    min: 1,
    max: 1,
    typical: 1,
    rationale: 'Single agent pattern by definition'
  },
  scalabilityPath: 'Add Self-Reflection for critical outputs',
  riskProfile: 'low',
  implementationComplexity: 'low'
};

const REACT_PATTERN: KBPatternDefinition = {
  patternName: 'ReAct',
  patternType: 'single-agent',
  description: 'Interleave Thought → Action → Observation steps; reasoning guides tool calls and vice-versa',
  coordinationMechanism: 'Internal thought-action-observation loops',
  bestFor: ['Research tasks', 'Multi-step analysis', 'Exploratory workflows', 'Complex problem solving'],
  agentCountGuidance: {
    min: 1,
    max: 1,
    typical: 1,
    rationale: 'Single agent with iterative reasoning cycles'
  },
  scalabilityPath: 'Evolve to Plan-Act-Reflect for complex objectives',
  riskProfile: 'low',
  implementationComplexity: 'medium'
};

const SELF_REFLECTION_PATTERN: KBPatternDefinition = {
  patternName: 'Self-Reflection',
  patternType: 'single-agent',
  description: 'Agent critiques its own draft against a rubric and revises if quality is low',
  coordinationMechanism: 'Creator-critic feedback loops (can be one agent with dual roles or two specialized agents)',
  bestFor: ['Quality assurance', 'Compliance checking', 'Content validation', 'Error reduction'],
  agentCountGuidance: {
    min: 1,
    max: 2,
    typical: 2,
    rationale: 'Can be implemented as one agent with self-critique or two agents (creator + critic)'
  },
  scalabilityPath: 'Add multiple specialist critics for different quality dimensions',
  riskProfile: 'low',
  implementationComplexity: 'medium'
};

// =============================================================================
// PLANNING-HEAVY HYBRIDS
// =============================================================================

const PLAN_AND_EXECUTE_PATTERN: KBPatternDefinition = {
  patternName: 'Plan-and-Execute',
  patternType: 'planning-hybrid',
  description: 'Large planner decomposes goal; cheaper executor handles each step; can re-plan',
  coordinationMechanism: 'Plan handoff from planner to executor with progress feedback',
  bestFor: ['Multi-step tasks where cost matters', 'Data-migration scripts', 'Workflow automation'],
  agentCountGuidance: {
    min: 2,
    max: 4,
    typical: 2,
    rationale: 'Minimum planner + executor; can add specialized executors for different task types'
  },
  scalabilityPath: 'Wrap in Plan-Act-Reflect if objectives drift',
  riskProfile: 'medium',
  implementationComplexity: 'medium'
};

const PLAN_ACT_REFLECT_PATTERN: KBPatternDefinition = {
  patternName: 'Plan-Act-Reflect',
  patternType: 'planning-hybrid',
  description: 'Adds a supervisory loop that periodically checks progress vs. goal and replans if off-track',
  coordinationMechanism: 'Continuous feedback loops between planning, execution, and supervision',
  bestFor: ['Open-ended research', 'Creative writing', 'Exploratory data analysis', 'Adaptive workflows'],
  agentCountGuidance: {
    min: 3,
    max: 5,
    typical: 3,
    rationale: 'Core triad of planner-actor-reflector; can expand with specialized agents'
  },
  scalabilityPath: 'Evolve to Hierarchical Planning for complex multi-objective scenarios',
  riskProfile: 'medium',
  implementationComplexity: 'high'
};

const HIERARCHICAL_PLANNING_PATTERN: KBPatternDefinition = {
  patternName: 'Hierarchical-Planning',
  patternType: 'planning-hybrid',
  description: 'Goal cascades through multiple planner layers; each abstracts detail for its parent',
  coordinationMechanism: 'Tree structure with clear command chains and abstraction layers',
  bestFor: ['Very long horizon projects', 'Supply-chain simulations', 'Multi-department coordination'],
  agentCountGuidance: {
    min: 4,
    max: 8,
    typical: 5,
    rationale: 'Needs multiple layers (strategic → tactical → operational); exact count depends on scope'
  },
  scalabilityPath: 'Add more layers or domains as organizational complexity increases',
  riskProfile: 'high',
  implementationComplexity: 'high'
};

// =============================================================================
// MULTI-AGENT ORCHESTRATION STYLES
// =============================================================================

const MANAGER_WORKERS_PATTERN: KBPatternDefinition = {
  patternName: 'Manager-Workers',
  patternType: 'multi-agent',
  description: 'One coordinator assigns tasks to specialist agents',
  coordinationMechanism: 'Central manager with clear task delegation and specialist coordination',
  bestFor: ['Specialist hand-offs', 'Clear workflows', 'Deterministic processes', 'Easy governance'],
  agentCountGuidance: {
    min: 3,
    max: 6,
    typical: 4,
    rationale: 'KB examples show 3-4 agents; needs 1 manager + 2-5 specialists based on workflow complexity'
  },
  scalabilityPath: 'Evolve to Hierarchical if tasks explode; add auction elements for load balancing',
  riskProfile: 'low',
  implementationComplexity: 'medium'
};

const HIERARCHICAL_HUB_SPOKE_PATTERN: KBPatternDefinition = {
  patternName: 'Hierarchical-Hub-Spoke',
  patternType: 'multi-agent',
  description: 'Tree of managers (CEO → VP → Staff)',
  coordinationMechanism: 'Multi-level hierarchy with clear reporting lines',
  bestFor: ['Large-scale operations', 'Complex organizations', 'Clear accountability needs'],
  agentCountGuidance: {
    min: 5,
    max: 15,
    typical: 7,
    rationale: 'Minimum 3 levels with 2 branches; scales based on organizational complexity'
  },
  scalabilityPath: 'Add departments/branches as needed',
  riskProfile: 'medium',
  implementationComplexity: 'high'
};

const BLACKBOARD_SHARED_MEMORY_PATTERN: KBPatternDefinition = {
  patternName: 'Blackboard-Shared-Memory',
  patternType: 'multi-agent',
  description: 'Agents publish to a common store; peers subscribe/react',
  coordinationMechanism: 'Shared memory space with publish-subscribe patterns',
  bestFor: ['Unpredictable collaboration', 'High parallelism needs', 'Loose coupling requirements'],
  agentCountGuidance: {
    min: 3,
    max: 10,
    typical: 5,
    rationale: 'Works best with 3+ agents; too many can cause coordination overhead'
  },
  scalabilityPath: 'Layer guardrails & monitoring to tame chaos',
  riskProfile: 'medium',
  implementationComplexity: 'medium'
};

const MARKET_BASED_AUCTION_PATTERN: KBPatternDefinition = {
  patternName: 'Market-Based-Auction',
  patternType: 'multi-agent',
  description: 'Agents bid for tasks based on cost/confidence',
  coordinationMechanism: 'Economic market mechanisms with bidding and resource allocation',
  bestFor: ['Bursty workloads', 'Resource optimization', 'Competitive task allocation'],
  agentCountGuidance: {
    min: 4,
    max: 12,
    typical: 6,
    rationale: 'Needs enough agents to create market dynamics; too few defeats purpose'
  },
  scalabilityPath: 'Add specialized agents as new capabilities needed',
  riskProfile: 'high',
  implementationComplexity: 'high'
};

const DECENTRALIZED_SWARM_PATTERN: KBPatternDefinition = {
  patternName: 'Decentralized-Swarm',
  patternType: 'multi-agent',
  description: 'Peers talk directly, sometimes with voting',
  coordinationMechanism: 'Peer-to-peer communication with emergent coordination',
  bestFor: ['Fault-tolerant systems', 'Emergent behavior needs', 'No single point of failure'],
  agentCountGuidance: {
    min: 5,
    max: 20,
    typical: 8,
    rationale: 'Needs critical mass for swarm behavior; too many causes communication explosion'
  },
  scalabilityPath: 'Implement clustering/neighborhoods as scale increases',
  riskProfile: 'high',
  implementationComplexity: 'high'
};

// =============================================================================
// PATTERN REGISTRY AND UTILITIES
// =============================================================================

export const KB_ALIGNED_PATTERNS: Record<string, KBPatternDefinition> = {
  'Tool-Use': TOOL_USE_PATTERN,
  'ReAct': REACT_PATTERN,
  'Self-Reflection': SELF_REFLECTION_PATTERN,
  'Plan-and-Execute': PLAN_AND_EXECUTE_PATTERN,
  'Plan-Act-Reflect': PLAN_ACT_REFLECT_PATTERN,
  'Hierarchical-Planning': HIERARCHICAL_PLANNING_PATTERN,
  'Manager-Workers': MANAGER_WORKERS_PATTERN,
  'Hierarchical-Hub-Spoke': HIERARCHICAL_HUB_SPOKE_PATTERN,
  'Blackboard-Shared-Memory': BLACKBOARD_SHARED_MEMORY_PATTERN,
  'Market-Based-Auction': MARKET_BASED_AUCTION_PATTERN,
  'Decentralized-Swarm': DECENTRALIZED_SWARM_PATTERN
};

/**
 * Get KB-aligned pattern definition by name
 */
export function getKBPatternDefinition(patternName: string): KBPatternDefinition | undefined {
  return KB_ALIGNED_PATTERNS[patternName];
}

/**
 * Get all available KB-aligned pattern names
 */
export function getAvailableKBPatterns(): string[] {
  return Object.keys(KB_ALIGNED_PATTERNS);
}

/**
 * Get patterns filtered by type
 */
export function getKBPatternsByType(type: 'single-agent' | 'planning-hybrid' | 'multi-agent'): KBPatternDefinition[] {
  return Object.values(KB_ALIGNED_PATTERNS).filter(pattern => pattern.patternType === type);
}

/**
 * Get pattern recommendation based on business problem characteristics
 * This is guidance only - AI providers make final decisions based on full context
 */
export function suggestPatternForProblem(characteristics: {
  complexity: 'low' | 'medium' | 'high';
  coordinationNeeds: 'none' | 'simple' | 'complex';
  adaptabilityRequired: boolean;
  specialistExpertiseNeeded: boolean;
  parallelismBenefit: boolean;
}): string[] {
  const suggestions: string[] = [];
  
  // Simple problems with minimal coordination
  if (characteristics.complexity === 'low' && characteristics.coordinationNeeds === 'none') {
    suggestions.push('Tool-Use', 'ReAct');
  }
  
  // Quality-focused problems
  if (characteristics.complexity === 'low' && !characteristics.adaptabilityRequired) {
    suggestions.push('Self-Reflection');
  }
  
  // Multi-step with some planning
  if (characteristics.complexity === 'medium' && characteristics.coordinationNeeds === 'simple') {
    suggestions.push('Plan-and-Execute');
  }
  
  // Adaptive, exploratory problems
  if (characteristics.adaptabilityRequired && characteristics.complexity === 'medium') {
    suggestions.push('Plan-Act-Reflect');
  }
  
  // Complex coordination with specialists
  if (characteristics.specialistExpertiseNeeded && characteristics.coordinationNeeds === 'complex') {
    suggestions.push('Manager-Workers', 'Hierarchical-Hub-Spoke');
  }
  
  // High parallelism needs
  if (characteristics.parallelismBenefit && characteristics.coordinationNeeds === 'complex') {
    suggestions.push('Blackboard-Shared-Memory', 'Market-Based-Auction');
  }
  
  // Very complex, long-horizon problems
  if (characteristics.complexity === 'high' && characteristics.coordinationNeeds === 'complex') {
    suggestions.push('Hierarchical-Planning', 'Decentralized-Swarm');
  }
  
  // Default fallback
  if (suggestions.length === 0) {
    suggestions.push('Manager-Workers'); // Most versatile pattern
  }
  
  return [...new Set(suggestions)]; // Remove duplicates
}

/**
 * Validate if an agent count is within acceptable range for a pattern
 * Returns validation result with guidance
 */
export function validateAgentCount(patternName: string, agentCount: number): {
  isValid: boolean;
  guidance: string;
  severity: 'error' | 'warning' | 'info';
} {
  const pattern = getKBPatternDefinition(patternName);
  
  if (!pattern) {
    return {
      isValid: false,
      guidance: `Unknown pattern: ${patternName}`,
      severity: 'error'
    };
  }
  
  const { min, max, typical } = pattern.agentCountGuidance;
  
  if (agentCount < min) {
    return {
      isValid: false,
      guidance: `${patternName} pattern needs at least ${min} agents for ${pattern.coordinationMechanism}. You have ${agentCount}.`,
      severity: 'error'
    };
  }
  
  if (agentCount > max) {
    return {
      isValid: false,
      guidance: `${patternName} pattern works best with at most ${max} agents to avoid coordination overhead. You have ${agentCount}. Consider ${pattern.scalabilityPath}.`,
      severity: 'warning'
    };
  }
  
  if (agentCount !== typical) {
    return {
      isValid: true,
      guidance: `${patternName} typically uses ${typical} agents, but ${agentCount} is acceptable for your business context.`,
      severity: 'info'
    };
  }
  
  return {
    isValid: true,
    guidance: `${agentCount} agents is a good fit for ${patternName} pattern.`,
    severity: 'info'
  };
}

/**
 * Select optimal pattern based on business context
 */
export function selectOptimalPattern(profile: any, businessContext?: any): string {
  // Extract business problems from strategic initiatives
  const businessProblems = (profile.strategicInitiatives || [])
    .flatMap((init: any) => init.businessProblems || [])
    .join(' ').toLowerCase();
  
  // Pattern selection logic based on business problems
  if (businessProblems.includes('process') || businessProblems.includes('automation') || businessProblems.includes('workflow')) {
    return 'Manager-Workers';
  }
  
  if (businessProblems.includes('research') || businessProblems.includes('analysis') || businessProblems.includes('explore')) {
    return 'Plan-Act-Reflect';
  }
  
  if (businessProblems.includes('data') || businessProblems.includes('integration') || businessProblems.includes('api')) {
    return 'Tool-Use';
  }
  
  if (businessProblems.includes('quality') || businessProblems.includes('compliance') || businessProblems.includes('validation')) {
    return 'Self-Reflection';
  }
  
  if (businessProblems.includes('planning') || businessProblems.includes('strategy') || businessProblems.includes('roadmap')) {
    return 'Plan-and-Execute';
  }
  
  if (businessProblems.includes('scale') || businessProblems.includes('enterprise') || businessProblems.includes('complex')) {
    return 'Hierarchical-Planning';
  }
  
  // Consider business context complexity if provided
  if (businessContext?.implementationContext?.complexityScore > 70) {
    return 'Hierarchical-Planning';
  }
  
  // Default to Manager-Workers for general business process automation
  return 'Manager-Workers';
}

 