/**
 * Agentic Pattern Definitions
 * 
 * This module defines the agent structures, roles, and interaction patterns
 * for each of the 12 foundational agentic design patterns from the knowledge base.
 * 
 * Based on: KB_AGENTIC_DESIGN_PATTERNS.md
 * Last Updated: January 2025
 */

export interface AgentDefinition {
  role: string;
  title: string;
  coreJob: string;
  responsibilities: string[];
  toolsUsed: string[];
  oversightLevel: 'human-approval' | 'policy-checked' | 'full-autonomy';
  oversightDescription: string;
  linkedKPIs: string[];
  interactionPatterns: string[];
}

export interface PatternDefinition {
  patternName: string;
  patternType: 'single-agent' | 'planning-hybrid' | 'multi-agent';
  description: string;
  bestFor: string[];
  agentCount: number;
  agents: AgentDefinition[];
  coordinationMechanism: string;
  scalabilityPath: string;
  riskProfile: 'low' | 'medium' | 'high';
  implementationComplexity: 'low' | 'medium' | 'high';
}

// =============================================================================
// SINGLE-AGENT REASONING LOOPS
// =============================================================================

const TOOL_USE_PATTERN: PatternDefinition = {
  patternName: 'Tool-Use',
  patternType: 'single-agent',
  description: 'LLM decides when to invoke external functions/APIs and merges results into context',
  bestFor: ['Simple data retrieval', 'Single API calls', 'Direct system integration'],
  agentCount: 1,
  agents: [
    {
      role: 'intelligent-assistant',
      title: 'AI Assistant with Tool Access',
      coreJob: 'Process requests by intelligently selecting and invoking the right tools at the right time',
      responsibilities: [
        'Analyze user requests to determine required tools',
        'Execute API calls and system integrations',
        'Merge tool results into coherent responses',
        'Handle errors and retry logic for tool failures'
      ],
      toolsUsed: ['Business APIs', 'Data retrieval systems', 'Integration platforms', 'Utility functions'],
      oversightLevel: 'policy-checked',
      oversightDescription: 'Automated guardrails ensure only approved tools are used within defined parameters',
      linkedKPIs: ['Response accuracy', 'Tool execution success rate', 'Query resolution time'],
      interactionPatterns: ['Direct user interaction', 'Tool invocation', 'Result synthesis']
    }
  ],
  coordinationMechanism: 'Single agent with tool orchestration',
  scalabilityPath: 'Add Self-Reflection for critical outputs',
  riskProfile: 'low',
  implementationComplexity: 'low'
};

const REACT_PATTERN: PatternDefinition = {
  patternName: 'ReAct',
  patternType: 'single-agent',
  description: 'Interleave Thought → Action → Observation cycles for iterative problem solving',
  bestFor: ['Research tasks', 'Multi-step analysis', 'Exploratory workflows', 'Complex problem solving'],
  agentCount: 1,
  agents: [
    {
      role: 'reasoning-agent',
      title: 'Analytical Reasoning Agent',
      coreJob: 'Break down complex problems through systematic thinking, action, and observation cycles',
      responsibilities: [
        'Decompose complex queries into logical steps',
        'Execute research and analysis actions based on reasoning',
        'Observe and interpret results from each action',
        'Adapt strategy based on observations and learnings'
      ],
      toolsUsed: ['Search systems', 'Analysis tools', 'Knowledge bases', 'Research databases'],
      oversightLevel: 'policy-checked',
      oversightDescription: 'Reasoning chain is logged and validated; human review for high-stakes decisions',
      linkedKPIs: ['Problem resolution accuracy', 'Research thoroughness', 'Insight quality'],
      interactionPatterns: ['Iterative thinking loops', 'Sequential action execution', 'Progressive knowledge building']
    }
  ],
  coordinationMechanism: 'Internal thought-action-observation loops',
  scalabilityPath: 'Evolve to Plan-Act-Reflect for complex objectives',
  riskProfile: 'low',
  implementationComplexity: 'medium'
};

const SELF_REFLECTION_PATTERN: PatternDefinition = {
  patternName: 'Self-Reflection',
  patternType: 'single-agent',
  description: 'Agent critiques its own output against quality rubrics and revises if needed',
  bestFor: ['Quality assurance', 'Compliance checking', 'Content validation', 'Error reduction'],
  agentCount: 2,
  agents: [
    {
      role: 'creator',
      title: 'Content Creator',
      coreJob: 'Generate initial drafts, solutions, or outputs based on requirements',
      responsibilities: [
        'Create first-pass solutions or content',
        'Apply domain expertise to generate outputs',
        'Structure information according to requirements',
        'Incorporate feedback for revisions'
      ],
      toolsUsed: ['Content generation tools', 'Template systems', 'Knowledge bases', 'Domain-specific tools'],
      oversightLevel: 'policy-checked',
      oversightDescription: 'Output automatically passed to critic; human escalation for quality failures',
      linkedKPIs: ['Content quality', 'First-pass accuracy', 'Requirement adherence'],
      interactionPatterns: ['Draft creation', 'Revision cycles', 'Quality improvement iterations']
    },
    {
      role: 'critic',
      title: 'Quality Assurance Critic',
      coreJob: 'Review and validate outputs against quality standards, compliance, and business rules',
      responsibilities: [
        'Evaluate outputs against predefined quality criteria',
        'Identify errors, inconsistencies, and improvement opportunities',
        'Provide specific feedback for revisions',
        'Escalate critical issues to human oversight'
      ],
      toolsUsed: ['Quality assessment tools', 'Compliance engines', 'Style guides', 'Validation frameworks'],
      oversightLevel: 'full-autonomy',
      oversightDescription: 'Autonomous quality checking with human escalation for major issues',
      linkedKPIs: ['Error detection rate', 'Quality improvement metrics', 'Compliance adherence'],
      interactionPatterns: ['Quality evaluation', 'Feedback provision', 'Approval/rejection decisions']
    }
  ],
  coordinationMechanism: 'Creator-critic feedback loops',
  scalabilityPath: 'Add multiple specialist critics for different quality dimensions',
  riskProfile: 'low',
  implementationComplexity: 'medium'
};

// =============================================================================
// PLANNING-HEAVY HYBRIDS
// =============================================================================

const PLAN_AND_EXECUTE_PATTERN: PatternDefinition = {
  patternName: 'Plan-and-Execute',
  patternType: 'planning-hybrid',
  description: 'Strategic planner decomposes goals; cheaper executor handles each step',
  bestFor: ['Multi-step business processes', 'Cost optimization', 'Data migration workflows', 'Workflow automation'],
  agentCount: 2,
  agents: [
    {
      role: 'strategic-planner',
      title: 'Strategic Planning Agent',
      coreJob: 'Decompose complex objectives into detailed, executable action plans',
      responsibilities: [
        'Analyze business objectives and requirements',
        'Break down complex goals into manageable tasks',
        'Sequence activities with dependencies and timelines',
        'Create detailed execution blueprints with success criteria'
      ],
      toolsUsed: ['Planning frameworks', 'Project management tools', 'Business analysis tools', 'Timeline generators'],
      oversightLevel: 'human-approval',
      oversightDescription: 'Strategic plans require human review before execution begins',
      linkedKPIs: ['Planning accuracy', 'Task decomposition quality', 'Timeline adherence'],
      interactionPatterns: ['Objective analysis', 'Plan generation', 'Executor coordination']
    },
    {
      role: 'execution-specialist',
      title: 'Execution Specialist',
      coreJob: 'Execute planned tasks efficiently while maintaining quality and compliance standards',
      responsibilities: [
        'Execute individual tasks according to plan specifications',
        'Monitor progress and report status updates',
        'Handle tactical decisions within defined parameters',
        'Escalate issues that require plan modifications'
      ],
      toolsUsed: ['Automation tools', 'System integrations', 'Monitoring dashboards', 'Execution platforms'],
      oversightLevel: 'policy-checked',
      oversightDescription: 'Automated execution with policy guardrails and progress monitoring',
      linkedKPIs: ['Execution efficiency', 'Task completion rate', 'Quality maintenance'],
      interactionPatterns: ['Task execution', 'Progress reporting', 'Issue escalation']
    }
  ],
  coordinationMechanism: 'Plan handoff from planner to executor with progress feedback',
  scalabilityPath: 'Wrap in Plan-Act-Reflect if objectives drift',
  riskProfile: 'medium',
  implementationComplexity: 'medium'
};

const PLAN_ACT_REFLECT_PATTERN: PatternDefinition = {
  patternName: 'Plan-Act-Reflect',
  patternType: 'planning-hybrid',
  description: 'Adds supervisory loop that monitors progress vs goals and replans if off-track',
  bestFor: ['Open-ended research', 'Adaptive workflows', 'Creative projects', 'Changing requirements'],
  agentCount: 3,
  agents: [
    {
      role: 'adaptive-planner',
      title: 'Adaptive Planning Agent',
      coreJob: 'Create and continuously refine plans based on changing conditions and learnings',
      responsibilities: [
        'Develop initial strategic plans with flexibility built-in',
        'Monitor execution progress and environmental changes',
        'Revise plans based on new information and results',
        'Balance stability with adaptability in planning'
      ],
      toolsUsed: ['Adaptive planning tools', 'Scenario modeling', 'Progress analytics', 'Environmental monitors'],
      oversightLevel: 'policy-checked',
      oversightDescription: 'Major plan changes require human approval; minor adjustments are autonomous',
      linkedKPIs: ['Plan effectiveness', 'Adaptation speed', 'Goal achievement rate'],
      interactionPatterns: ['Continuous planning', 'Progress monitoring', 'Plan refinement']
    },
    {
      role: 'action-executor',
      title: 'Action Executor',
      coreJob: 'Execute current plan activities while gathering intelligence for planning improvements',
      responsibilities: [
        'Execute planned activities with attention to learning opportunities',
        'Collect feedback and performance data during execution',
        'Adapt tactics within strategic parameters',
        'Report insights that might influence planning'
      ],
      toolsUsed: ['Execution platforms', 'Data collection tools', 'Performance monitors', 'Feedback systems'],
      oversightLevel: 'policy-checked',
      oversightDescription: 'Execution monitored with automatic feedback to planning cycle',
      linkedKPIs: ['Execution quality', 'Learning capture rate', 'Tactical effectiveness'],
      interactionPatterns: ['Activity execution', 'Data collection', 'Learning feedback']
    },
    {
      role: 'progress-supervisor',
      title: 'Progress Supervisor',
      coreJob: 'Monitor overall progress against objectives and trigger replanning when needed',
      responsibilities: [
        'Track progress against original objectives and success criteria',
        'Identify when current plans are no longer optimal',
        'Trigger replanning cycles based on performance indicators',
        'Maintain focus on ultimate goals while allowing tactical flexibility'
      ],
      toolsUsed: ['Progress dashboards', 'Goal tracking systems', 'Performance analytics', 'Alert systems'],
      oversightLevel: 'full-autonomy',
      oversightDescription: 'Autonomous monitoring with human escalation for major objective changes',
      linkedKPIs: ['Goal achievement progress', 'Replanning trigger accuracy', 'Overall objective success'],
      interactionPatterns: ['Progress assessment', 'Replanning triggers', 'Objective alignment']
    }
  ],
  coordinationMechanism: 'Continuous feedback loops between planning, execution, and supervision',
  scalabilityPath: 'Evolve to Hierarchical Planning for complex multi-objective scenarios',
  riskProfile: 'medium',
  implementationComplexity: 'high'
};

const HIERARCHICAL_PLANNING_PATTERN: PatternDefinition = {
  patternName: 'Hierarchical-Planning',
  patternType: 'planning-hybrid',
  description: 'Goal cascades through multiple planner layers with clear accountability chains',
  bestFor: ['Very long horizon projects', 'Complex supply chains', 'Multi-department coordination', 'Strategic initiatives'],
  agentCount: 4,
  agents: [
    {
      role: 'strategic-director',
      title: 'Strategic Director',
      coreJob: 'Set high-level direction and coordinate multiple strategic planning layers',
      responsibilities: [
        'Define overall strategic objectives and success criteria',
        'Coordinate between different planning layers and domains',
        'Resolve conflicts between competing priorities',
        'Ensure alignment across all organizational levels'
      ],
      toolsUsed: ['Strategic planning tools', 'Coordination platforms', 'Executive dashboards', 'Alignment frameworks'],
      oversightLevel: 'human-approval',
      oversightDescription: 'Strategic decisions require human approval; coordination is autonomous',
      linkedKPIs: ['Strategic alignment', 'Cross-functional coordination', 'Objective achievement'],
      interactionPatterns: ['Strategic direction', 'Layer coordination', 'Conflict resolution']
    },
    {
      role: 'tactical-planner',
      title: 'Tactical Planning Agent',
      coreJob: 'Translate strategic objectives into detailed tactical plans for specific domains',
      responsibilities: [
        'Break down strategic objectives into tactical initiatives',
        'Create detailed plans for specific business domains',
        'Coordinate with other tactical planners for dependencies',
        'Manage resource allocation within domain scope'
      ],
      toolsUsed: ['Tactical planning software', 'Resource management tools', 'Domain-specific platforms', 'Coordination systems'],
      oversightLevel: 'policy-checked',
      oversightDescription: 'Tactical plans validated against strategic direction and resource constraints',
      linkedKPIs: ['Tactical plan quality', 'Resource utilization', 'Domain performance'],
      interactionPatterns: ['Strategic translation', 'Domain planning', 'Resource coordination']
    },
    {
      role: 'operational-coordinator',
      title: 'Operational Coordinator',
      coreJob: 'Coordinate operational execution across multiple domains and manage dependencies',
      responsibilities: [
        'Orchestrate execution across different operational domains',
        'Manage cross-domain dependencies and handoffs',
        'Monitor operational performance and bottlenecks',
        'Escalate issues that require tactical replanning'
      ],
      toolsUsed: ['Operations platforms', 'Workflow orchestration', 'Monitoring systems', 'Communication tools'],
      oversightLevel: 'policy-checked',
      oversightDescription: 'Operational coordination with automated escalation for major issues',
      linkedKPIs: ['Operational efficiency', 'Dependency management', 'Cross-domain coordination'],
      interactionPatterns: ['Operations orchestration', 'Dependency management', 'Performance monitoring']
    },
    {
      role: 'execution-specialist',
      title: 'Specialized Executor',
      coreJob: 'Execute specific operational tasks within assigned domain with high efficiency',
      responsibilities: [
        'Execute domain-specific operational tasks',
        'Maintain quality standards within operational parameters',
        'Report progress and issues to operational coordinator',
        'Optimize execution processes within domain constraints'
      ],
      toolsUsed: ['Domain-specific tools', 'Execution platforms', 'Quality systems', 'Performance monitors'],
      oversightLevel: 'full-autonomy',
      oversightDescription: 'Autonomous execution within well-defined operational parameters',
      linkedKPIs: ['Execution efficiency', 'Quality maintenance', 'Domain performance'],
      interactionPatterns: ['Task execution', 'Progress reporting', 'Process optimization']
    }
  ],
  coordinationMechanism: 'Hierarchical command and control with clear accountability chains',
  scalabilityPath: 'Add more layers or domains as organizational complexity increases',
  riskProfile: 'high',
  implementationComplexity: 'high'
};

// =============================================================================
// MULTI-AGENT ORCHESTRATION STYLES
// =============================================================================

const MANAGER_WORKERS_PATTERN: PatternDefinition = {
  patternName: 'Manager-Workers',
  patternType: 'multi-agent',
  description: 'Central coordinator assigns tasks to specialist agents with clear delegation',
  bestFor: ['Clear workflows', 'Deterministic processes', 'Easy governance', 'Specialist handoffs'],
  agentCount: 4,
  agents: [
    {
      role: 'task-manager',
      title: 'Task Management Coordinator',
      coreJob: 'Orchestrate work distribution and coordinate specialist agents for optimal outcomes',
      responsibilities: [
        'Analyze incoming work and determine specialist requirements',
        'Assign tasks to appropriate specialist agents based on capabilities',
        'Monitor progress across all specialist agents',
        'Coordinate handoffs between specialists and resolve conflicts'
      ],
      toolsUsed: ['Workflow orchestration', 'Task management systems', 'Coordination platforms', 'Progress dashboards'],
      oversightLevel: 'policy-checked',
      oversightDescription: 'Autonomous task assignment with human escalation for complex coordination issues',
      linkedKPIs: ['Task distribution efficiency', 'Coordination effectiveness', 'Specialist utilization'],
      interactionPatterns: ['Work distribution', 'Progress coordination', 'Specialist management']
    },
    {
      role: 'research-specialist',
      title: 'Research Specialist',
      coreJob: 'Conduct thorough research and information gathering for assigned domain areas',
      responsibilities: [
        'Execute comprehensive research on assigned topics',
        'Gather and validate information from multiple sources',
        'Synthesize findings into actionable insights',
        'Provide research support to other specialists as needed'
      ],
      toolsUsed: ['Research databases', 'Search systems', 'Analysis tools', 'Information validation tools'],
      oversightLevel: 'policy-checked',
      oversightDescription: 'Research outputs validated for accuracy and relevance before handoff',
      linkedKPIs: ['Research thoroughness', 'Information accuracy', 'Insight quality'],
      interactionPatterns: ['Research execution', 'Information synthesis', 'Knowledge sharing']
    },
    {
      role: 'analysis-specialist',
      title: 'Analysis Specialist',
      coreJob: 'Transform raw information into strategic insights and actionable recommendations',
      responsibilities: [
        'Analyze data and information provided by research specialist',
        'Apply analytical frameworks to derive meaningful insights',
        'Create recommendations based on analytical findings',
        'Validate analytical conclusions against business objectives'
      ],
      toolsUsed: ['Analytics platforms', 'Business intelligence tools', 'Modeling software', 'Visualization tools'],
      oversightLevel: 'policy-checked',
      oversightDescription: 'Analytical outputs reviewed for logical consistency and business relevance',
      linkedKPIs: ['Analytical accuracy', 'Insight actionability', 'Recommendation quality'],
      interactionPatterns: ['Data analysis', 'Insight generation', 'Recommendation development']
    },
    {
      role: 'implementation-specialist',
      title: 'Implementation Specialist',
      coreJob: 'Execute approved recommendations and manage implementation processes',
      responsibilities: [
        'Implement approved analytical recommendations',
        'Execute tactical actions based on specialist inputs',
        'Monitor implementation progress and outcomes',
        'Provide feedback to improve future analysis and recommendations'
      ],
      toolsUsed: ['Implementation platforms', 'Automation tools', 'Monitoring systems', 'Execution dashboards'],
      oversightLevel: 'human-approval',
      oversightDescription: 'Implementation actions require human approval for high-impact changes',
      linkedKPIs: ['Implementation success rate', 'Execution efficiency', 'Outcome achievement'],
      interactionPatterns: ['Action execution', 'Progress monitoring', 'Outcome reporting']
    }
  ],
  coordinationMechanism: 'Central manager with clear task delegation and specialist coordination',
  scalabilityPath: 'Evolve to Hierarchical if tasks explode; add auction elements for load balancing',
  riskProfile: 'low',
  implementationComplexity: 'medium'
};

// =============================================================================
// PATTERN REGISTRY AND UTILITIES
// =============================================================================

export const AGENTIC_PATTERNS: Record<string, PatternDefinition> = {
  'Tool-Use': TOOL_USE_PATTERN,
  'ReAct': REACT_PATTERN,
  'Self-Reflection': SELF_REFLECTION_PATTERN,
  'Plan-and-Execute': PLAN_AND_EXECUTE_PATTERN,
  'Plan-Act-Reflect': PLAN_ACT_REFLECT_PATTERN,
  'Hierarchical-Planning': HIERARCHICAL_PLANNING_PATTERN,
  'Manager-Workers': MANAGER_WORKERS_PATTERN
};

/**
 * Get pattern definition by name
 */
export function getPatternDefinition(patternName: string): PatternDefinition | undefined {
  return AGENTIC_PATTERNS[patternName];
}

/**
 * Get all available pattern names
 */
export function getAvailablePatterns(): string[] {
  return Object.keys(AGENTIC_PATTERNS);
}

/**
 * Get patterns filtered by type
 */
export function getPatternsByType(type: 'single-agent' | 'planning-hybrid' | 'multi-agent'): PatternDefinition[] {
  return Object.values(AGENTIC_PATTERNS).filter(pattern => pattern.patternType === type);
}

/**
 * Map business problem types to recommended patterns
 */
export function getRecommendedPatternForProblemType(problemType: string): string {
  const problemPatternMap: Record<string, string> = {
    'process-automation': 'Manager-Workers',
    'research-analysis': 'Plan-Act-Reflect',
    'decision-support': 'Hierarchical-Planning',
    'customer-experience': 'Manager-Workers',
    'resource-optimization': 'Plan-and-Execute',
    'quality-compliance': 'Self-Reflection',
    'simple-data-retrieval': 'Tool-Use',
    'complex-problem-solving': 'ReAct'
  };
  
  return problemPatternMap[problemType] || 'Manager-Workers'; // Default fallback
} 