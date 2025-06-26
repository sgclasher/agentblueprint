/**
 * Pattern-Specific Prompt Templates
 * 
 * This module provides dynamic prompt generation and JSON schemas
 * for each agentic design pattern, replacing the hard-coded 5-agent model.
 * 
 * Based on: agenticPatternDefinitions.ts and KB_AGENTIC_DESIGN_PATTERNS.md
 * Last Updated: January 2025
 */

import { PatternDefinition, AgentDefinition, getPatternDefinition } from './agenticPatternDefinitions';

// =============================================================================
// PATTERN-SPECIFIC JSON SCHEMAS
// =============================================================================

export interface PatternSpecificBlueprintResponse {
  businessObjective: string;
  selectedPattern: string;
  patternRationale: string;
  digitalTeam: AgentDefinition[];
  humanCheckpoints: Array<{
    checkpoint: string;
    description: string;
    importance: string;
    frequency: 'one-time' | 'periodic' | 'as-needed';
  }>;
  agenticTimeline: {
    totalDurationWeeks: number;
    phases: Array<{
      phase: 'crawl' | 'walk' | 'run';
      name: string;
      durationWeeks: number;
      description: string;
      milestones: string[];
      riskMitigations: string[];
      oversightLevel: 'high' | 'medium' | 'low';
      humanInvolvement: string;
    }>;
  };
  kpiImprovements: Array<{
    kpi: string;
    currentValue?: string;
    targetValue: string;
    improvementPercent: number;
    linkedAgents: string[];
    measurementMethod: string;
    timeframe: string;
  }>;
  roiProjection?: {
    processCostSavings: string;
    laborReallocation: string;
    riskAvoidance: string;
    totalInvestment: string;
    ongoingCosts: string;
    annualValue: string;
    roiPercentage: number;
    paybackMonths: number;
    keyAssumptions: string[];
    confidenceLevel: 'High' | 'Medium' | 'Low';
    confidenceFactors: string[];
    executiveSummary: string;
    recommendedAction: string;
  };
}

// =============================================================================
// PATTERN-SPECIFIC PROMPT BUILDERS
// =============================================================================

/**
 * Generate pattern-specific system prompt based on selected pattern
 */
export function buildPatternSpecificSystemPrompt(
  patternName: string,
  config: {
    includeROIProjection?: boolean;
    modelProvider?: 'openai' | 'claude' | 'gemini';
    industry?: string;
    businessContext?: string;
  } = {}
): string {
  const pattern = getPatternDefinition(patternName);
  
  if (!pattern) {
    throw new Error(`Unknown pattern: ${patternName}`);
  }

  const basePrompt = `You are a senior enterprise AI architect specializing in ${pattern.patternName} agentic implementations. You design AI "digital teams" based on proven agentic design patterns, ensuring each pattern's unique characteristics are properly implemented.

🎯 **SELECTED AGENTIC PATTERN: ${pattern.patternName}**

**Pattern Overview:**
${pattern.description}

**Best Applications:**
${pattern.bestFor.map(item => `• ${item}`).join('\n')}

**Agent Structure Requirements:**
- **Agent Count**: Exactly ${pattern.agentCount} agents (this is pattern-specific and cannot be changed)
- **Pattern Type**: ${pattern.patternType}
- **Coordination Mechanism**: ${pattern.coordinationMechanism}
- **Risk Profile**: ${pattern.riskProfile}
- **Implementation Complexity**: ${pattern.implementationComplexity}

**Agents in this Pattern:**
${pattern.agents.map((agent, index) => `
${index + 1}. **${agent.title}** (Role: ${agent.role})
   Core Job: ${agent.coreJob}
   Key Responsibilities:
   ${agent.responsibilities.map(resp => `   • ${resp}`).join('\n')}
   Oversight Level: ${agent.oversightLevel}
   Interaction Patterns: ${agent.interactionPatterns.join(', ')}
`).join('')}

${getPatternSpecificGuidance(pattern)}

**CRITICAL REQUIREMENTS:**
1. **Agent Count**: You MUST generate exactly ${pattern.agentCount} agents - no more, no less
2. **Pattern Fidelity**: Agents must follow the ${pattern.patternName} coordination mechanism
3. **Role Accuracy**: Each agent role must align with the pattern's defined structure
4. **Business Integration**: Tailor agent capabilities to the specific business context provided

${config.includeROIProjection ? getROIProjectionPromptSection() : ''}

${getModelSpecificOptimizations(config.modelProvider)}

**JSON SCHEMA REQUIREMENTS:**
- digitalTeam: Array of exactly ${pattern.agentCount} agent objects
- selectedPattern: Must be "${pattern.patternName}"
- patternRationale: Explain why this pattern fits the business context (2-3 sentences)
- Each agent must include: role, title, coreJob, responsibilities, toolsUsed, oversightLevel, oversightDescription, linkedKPIs, interactionPatterns

**VALIDATION CHECKLIST:**
✓ Agent count equals ${pattern.agentCount}
✓ Coordination mechanism reflects ${pattern.patternName} principles
✓ Each agent has distinct, non-overlapping responsibilities
✓ Oversight levels are appropriate for pattern risk profile (${pattern.riskProfile})
✓ KPI improvements are linked to specific agents and their capabilities`;

  return basePrompt;
}

/**
 * Get pattern-specific guidance for implementation
 */
function getPatternSpecificGuidance(pattern: PatternDefinition): string {
  switch (pattern.patternName) {
    case 'Tool-Use':
      return `
**Tool-Use Pattern Guidance:**
- Focus on intelligent API orchestration and system integration
- Emphasize tool selection logic and error handling capabilities
- Design for efficiency and accuracy in single-agent operations
- Include guardrails for tool usage safety and compliance`;

    case 'ReAct':
      return `
**ReAct Pattern Guidance:**
- Structure thinking-action-observation cycles clearly
- Emphasize iterative problem-solving and adaptive reasoning
- Design for learning and course-correction capabilities
- Include reasoning chain validation and quality checks`;

    case 'Self-Reflection':
      return `
**Self-Reflection Pattern Guidance:**
- Create clear creator-critic feedback loops
- Establish quality criteria and validation frameworks
- Design for continuous improvement and error reduction
- Include escalation paths for quality failures`;

    case 'Plan-and-Execute':
      return `
**Plan-and-Execute Pattern Guidance:**
- Separate strategic planning from tactical execution
- Design for cost optimization through planning efficiency
- Include progress monitoring and replanning triggers
- Emphasize clear handoffs between planner and executor`;

    case 'Plan-Act-Reflect':
      return `
**Plan-Act-Reflect Pattern Guidance:**
- Create adaptive planning with environmental monitoring
- Design for changing requirements and course correction
- Include learning loops between all three agents
- Emphasize flexibility while maintaining goal focus`;

    case 'Hierarchical-Planning':
      return `
**Hierarchical-Planning Pattern Guidance:**
- Create clear command and accountability chains
- Design for complex multi-layer coordination
- Include escalation paths and conflict resolution
- Emphasize strategic alignment across all levels`;

    case 'Manager-Workers':
      return `
**Manager-Workers Pattern Guidance:**
- Create central coordination with specialist delegation
- Design for clear task assignment and progress tracking
- Include specialist expertise and capability matching
- Emphasize efficient coordination and quality handoffs`;

    default:
      return `
**Pattern-Specific Guidance:**
- Follow the ${pattern.coordinationMechanism} coordination model
- Implement ${pattern.patternType} interaction patterns
- Design for ${pattern.scalabilityPath}
- Consider ${pattern.riskProfile} risk mitigation strategies`;
  }
}

/**
 * Generate ROI projection prompt section
 */
function getROIProjectionPromptSection(): string {
  return `
**ROI PROJECTION REQUIREMENTS:**
When process metrics are available, generate sophisticated ROI projections that include:
- Process cost savings based on efficiency improvements
- Labor reallocation value from automation benefits
- Risk avoidance benefits from improved quality and compliance
- Realistic investment requirements and ongoing costs
- Executive-ready business case with confidence assessment

ROI projections should be:
- Industry-appropriate and realistic
- Based on agent capabilities and business impact
- Conservative in assumptions but compelling in value proposition
- Supported by clear assumptions and confidence factors`;
}

/**
 * Get model-specific optimizations
 */
function getModelSpecificOptimizations(provider?: string): string {
  switch (provider) {
    case 'gemini':
      return `
**GEMINI ADAPTIVE THINKING OPTIMIZATION:**
- Use adaptive thinking to validate agent count against pattern requirements
- Apply parallel analysis for agent role design and capability matching
- Double-check JSON structure compliance before finalizing response
- Leverage Gemini's JSON mode for strict schema adherence`;

    case 'claude':
      return `
**CLAUDE EXTENDED THINKING OPTIMIZATION:**
- Engage extended thinking for pattern-specific agent design validation
- Use interleaved thinking between agent definitions to ensure coherence
- Apply Claude's structured reasoning for complex coordination mechanisms
- Validate each agent's role against pattern requirements systematically`;

    case 'openai':
      return `
**OPENAI STRUCTURED OUTPUT OPTIMIZATION:**
- Leverage GPT-4o's structured outputs for pattern-compliant JSON generation
- Use schema validation for agent count and role requirements
- Apply hybrid deterministic-AI approach for pattern fidelity
- Ensure backwards compatibility with existing system integrations`;

    default:
      return `
**GENERAL AI OPTIMIZATION:**
- Focus on pattern-specific agent count and role validation
- Ensure JSON structure matches pattern requirements exactly
- Validate coordination mechanisms against pattern definitions
- Include comprehensive business context integration`;
  }
}

// =============================================================================
// USER PROMPT BUILDERS
// =============================================================================

/**
 * Build user prompt for pattern-specific blueprint generation
 */
export function buildPatternSpecificUserPrompt(
  profile: any,
  selectedPattern: string,
  config: {
    blueprintFocusContext?: string;
    specialInstructions?: string;
    roiContext?: string;
  } = {}
): string {
  const pattern = getPatternDefinition(selectedPattern);
  
  if (!pattern) {
    throw new Error(`Unknown pattern: ${selectedPattern}`);
  }

  let prompt = `Please generate an AI digital team blueprint using the ${selectedPattern} agentic pattern for the following business profile:

**BUSINESS PROFILE:**
Company: ${profile.companyName}
Industry: ${profile.industry}
Size: ${profile.employeeCount || 'Not specified'}
Revenue: ${profile.annualRevenue || 'Not specified'}

**STRATEGIC INITIATIVES:**
${(profile.strategicInitiatives || []).map((init: any, index: number) => `
${index + 1}. ${init.initiative}
   Priority: ${init.priority || 'Medium'}
   Business Problems: ${(init.businessProblems || []).join(', ') || 'Not specified'}
   Expected Outcomes: ${(init.expectedOutcomes || []).join(', ') || 'Not specified'}
   Contact: ${init.contact?.name || 'Not specified'} (${init.contact?.title || 'Not specified'})
`).join('')}

**SYSTEMS & APPLICATIONS:**
${(profile.systemsAndApplications || []).map((sys: any) => `• ${sys.name} (${sys.category})`).join('\n') || 'None specified'}

${config.blueprintFocusContext || ''}

**PATTERN-SPECIFIC REQUIREMENTS:**
- Use the ${selectedPattern} pattern with exactly ${pattern.agentCount} agents
- Follow the ${pattern.coordinationMechanism} coordination model
- Implement ${pattern.patternType} interaction patterns
- Design for: ${pattern.bestFor.join(', ')}

${config.roiContext || ''}

${config.specialInstructions ? `
**SPECIAL INSTRUCTIONS:**
${config.specialInstructions}
` : ''}

**DELIVERABLE:**
Generate a comprehensive AI digital team blueprint that implements the ${selectedPattern} pattern specifically for this business context. Ensure the agent structure, coordination mechanisms, and implementation approach all align with the chosen agentic design pattern.

Remember: This blueprint must use exactly ${pattern.agentCount} agents as defined by the ${selectedPattern} pattern - this is not negotiable.

**🚨 CRITICAL OUTPUT REQUIREMENTS - NO EXCEPTIONS:**
1. You MUST respond with ONLY a valid JSON object
2. You MUST include ALL required sections - no partial responses
3. No markdown formatting, no explanations, no additional text
4. Start with { and end with } - pure JSON only

**⚠️ VALIDATION WARNING:** 
Partial responses will be rejected. You MUST generate all sections below or the response will fail validation.

**REQUIRED JSON STRUCTURE (ALL SECTIONS MANDATORY):**
{
  "businessObjective": "Single, measurable goal derived from strategic initiatives (e.g., 'Cut invoice processing time by 40%')",
  "selectedPattern": "${selectedPattern}",
  "patternRationale": "2-3 sentence explanation of why ${selectedPattern} pattern fits this business context",
  "digitalTeam": [
    ${pattern.agents.map((agent, index) => `{
      "role": "${agent.role}",
      "title": "${agent.title}",
      "coreJob": "${agent.coreJob}",
      "responsibilities": ${JSON.stringify(agent.responsibilities)},
      "toolsUsed": ["Business-specific tool 1", "Business-specific tool 2", "Business-specific tool 3"],
      "oversightLevel": "${agent.oversightLevel}",
      "oversightDescription": "How humans control this agent",
      "linkedKPIs": ["KPI 1", "KPI 2"],
      "interactionPatterns": ${JSON.stringify(agent.interactionPatterns)}
    }${index < pattern.agents.length - 1 ? ',' : ''}`).join('\n    ')}
  ],
  "humanCheckpoints": [
    {
      "checkpoint": "Kick-off Workshop",
      "description": "Initial setup and goal alignment",
      "importance": "Ensures proper foundation",
      "frequency": "one-time"
    },
    {
      "checkpoint": "Review Gates",
      "description": "Progress evaluation checkpoints",
      "importance": "Quality assurance and course correction",
      "frequency": "periodic"
    },
    {
      "checkpoint": "Exception Escalations",
      "description": "Handling of edge cases and errors",
      "importance": "Risk mitigation and human oversight",
      "frequency": "as-needed"
    },
    {
      "checkpoint": "Quarterly Tune-Up",
      "description": "Performance optimization and learning integration",
      "importance": "Continuous improvement",
      "frequency": "periodic"
    }
  ],
  "agenticTimeline": {
    "totalDurationWeeks": 24,
    "phases": [
      {
        "phase": "crawl",
        "name": "Proof of Concept",
        "durationWeeks": 8,
        "description": "Initial implementation with high oversight",
        "milestones": ["Agent deployment", "Initial testing", "Feedback collection"],
        "riskMitigations": ["Human validation", "Limited scope", "Rollback procedures"],
        "oversightLevel": "high",
        "humanInvolvement": "Continuous monitoring and approval"
      },
      {
        "phase": "walk",
        "name": "Controlled Rollout",
        "durationWeeks": 10,
        "description": "Gradual expansion with reduced oversight",
        "milestones": ["Expanded scope", "Process optimization", "Team training"],
        "riskMitigations": ["Performance monitoring", "Exception handling", "Regular reviews"],
        "oversightLevel": "medium",
        "humanInvolvement": "Periodic review and adjustment"
      },
      {
        "phase": "run",
        "name": "Full Automation",
        "durationWeeks": 6,
        "description": "Autonomous operation with minimal oversight",
        "milestones": ["Full deployment", "Performance targets met", "Integration complete"],
        "riskMitigations": ["Automated monitoring", "Exception escalation", "Continuous learning"],
        "oversightLevel": "low",
        "humanInvolvement": "Strategic oversight and optimization"
      }
    ]
  },
  "kpiImprovements": [
    {
      "kpi": "Process efficiency metric",
      "currentValue": "Current baseline",
      "targetValue": "Improvement target",
      "improvementPercent": 40,
      "linkedAgents": ["${pattern.agents[0].role}", "${pattern.agents[1].role}"],
      "measurementMethod": "How success will be measured",
      "timeframe": "When results expected"
    },
    {
      "kpi": "Quality improvement metric",
      "currentValue": "Current baseline",
      "targetValue": "Improvement target",
      "improvementPercent": 25,
      "linkedAgents": ["${pattern.agents[1].role}", "${pattern.agents[2] ? pattern.agents[2].role : pattern.agents[0].role}"],
      "measurementMethod": "How success will be measured",
      "timeframe": "When results expected"
    },
    {
      "kpi": "Speed enhancement metric",
      "currentValue": "Current baseline",
      "targetValue": "Improvement target",
      "improvementPercent": 60,
      "linkedAgents": ["${pattern.agents[0].role}", "${pattern.agents[3] ? pattern.agents[3].role : pattern.agents[1].role}"],
      "measurementMethod": "How success will be measured",
      "timeframe": "When results expected"
    }
  ]${config.roiContext ? `,
  "roiProjection": {
    "processCostSavings": "$XXXk annual efficiency gains",
    "laborReallocation": "$XXXk FTE capacity redeployment",
    "riskAvoidance": "$XXXk compliance risk reduction",
    "totalInvestment": "$XXXk implementation cost",
    "ongoingCosts": "$XXk annual maintenance",
    "annualValue": "$XXXk total annual value",
    "roiPercentage": XXX,
    "paybackMonths": XX,
    "keyAssumptions": [
      "Assumption 1",
      "Assumption 2",
      "Assumption 3"
    ],
    "confidenceLevel": "High",
    "confidenceFactors": [
      "Factor 1",
      "Factor 2"
    ],
    "executiveSummary": "Executive business case summary",
    "recommendedAction": "Next steps recommendation"
  }` : ''}
}

🚨 **CRITICAL VALIDATION REQUIREMENTS - FAILURE WILL REJECT RESPONSE:**
- businessObjective: Must be non-empty string (20+ characters) ✅ REQUIRED
- digitalTeam: Must have exactly ${pattern.agentCount} agents ✅ REQUIRED  
- humanCheckpoints: Must have exactly 4 checkpoints ✅ REQUIRED
- agenticTimeline.phases: Must have exactly 3 phases (crawl, walk, run) ✅ REQUIRED
- kpiImprovements: Must have at least 3 KPI improvements ✅ REQUIRED
- All agents must have unique roles and non-overlapping responsibilities
- Response must be valid JSON starting with { and ending with }

🔥 **ABSOLUTE FINAL REQUIREMENT:** 
Generate the COMPLETE JSON structure with ALL sections above. Partial responses (missing businessObjective, humanCheckpoints, agenticTimeline, or kpiImprovements) will be automatically rejected and cause validation failure.

Your response must be pure JSON only. No markdown, no explanations, no additional text. Start with { and end with }.`;

  return prompt;
}

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

/**
 * Validate blueprint response against pattern requirements
 */
export function validatePatternCompliance(
  response: PatternSpecificBlueprintResponse,
  expectedPattern: string
): string[] {
  const errors: string[] = [];
  const pattern = getPatternDefinition(expectedPattern);
  
  if (!pattern) {
    errors.push(`Invalid pattern: ${expectedPattern}`);
    return errors;
  }

  // Validate agent count
  if (!response.digitalTeam || response.digitalTeam.length !== pattern.agentCount) {
    errors.push(`Agent count mismatch: expected ${pattern.agentCount}, got ${response.digitalTeam?.length || 0}`);
  }

  // Validate pattern selection
  if (response.selectedPattern !== expectedPattern) {
    errors.push(`Pattern mismatch: expected ${expectedPattern}, got ${response.selectedPattern}`);
  }

  // Validate required fields
  if (!response.businessObjective || response.businessObjective.trim().length === 0) {
    errors.push('Missing business objective');
  }

  if (!response.patternRationale || response.patternRationale.trim().length === 0) {
    errors.push('Missing pattern rationale');
  }

  // Validate agent structure
  if (response.digitalTeam) {
    response.digitalTeam.forEach((agent, index) => {
      if (!agent.role || !agent.title || !agent.coreJob) {
        errors.push(`Agent ${index + 1} missing required fields (role, title, coreJob)`);
      }
      
      if (!agent.responsibilities || agent.responsibilities.length === 0) {
        errors.push(`Agent ${index + 1} missing responsibilities`);
      }
      
      if (!agent.toolsUsed || agent.toolsUsed.length === 0) {
        errors.push(`Agent ${index + 1} missing tools`);
      }
    });
  }

  // Validate timeline structure
  if (!response.agenticTimeline?.phases || response.agenticTimeline.phases.length !== 3) {
    errors.push('Timeline must have exactly 3 phases (crawl, walk, run)');
  }

  // Validate KPI improvements
  if (!response.kpiImprovements || response.kpiImprovements.length < 3) {
    errors.push(`KPI improvements must have at least 3 items, got ${response.kpiImprovements?.length || 0}`);
  }

  return errors;
}

/**
 * Get pattern-specific JSON schema for response validation
 */
export function getPatternJsonSchema(patternName: string): object {
  const pattern = getPatternDefinition(patternName);
  
  if (!pattern) {
    throw new Error(`Unknown pattern: ${patternName}`);
  }

  return {
    type: 'object',
    required: [
      'businessObjective',
      'selectedPattern',
      'patternRationale',
      'digitalTeam',
      'humanCheckpoints',
      'agenticTimeline',
      'kpiImprovements'
    ],
    properties: {
      businessObjective: {
        type: 'string',
        minLength: 20,
        description: 'Clear, measurable business objective for the AI implementation'
      },
      selectedPattern: {
        type: 'string',
        enum: [patternName],
        description: `Must be exactly "${patternName}"`
      },
      patternRationale: {
        type: 'string',
        minLength: 50,
        description: 'Explanation of why this pattern fits the business context'
      },
      digitalTeam: {
        type: 'array',
        minItems: pattern.agentCount,
        maxItems: pattern.agentCount,
        description: `Exactly ${pattern.agentCount} agents as required by ${patternName} pattern`,
        items: {
          type: 'object',
          required: ['role', 'title', 'coreJob', 'responsibilities', 'toolsUsed', 'oversightLevel', 'oversightDescription', 'linkedKPIs', 'interactionPatterns'],
          properties: {
            role: { type: 'string' },
            title: { type: 'string' },
            coreJob: { type: 'string' },
            responsibilities: {
              type: 'array',
              items: { type: 'string' },
              minItems: 3
            },
            toolsUsed: {
              type: 'array',
              items: { type: 'string' },
              minItems: 2
            },
            oversightLevel: {
              type: 'string',
              enum: ['human-approval', 'policy-checked', 'full-autonomy']
            },
            oversightDescription: { type: 'string' },
            linkedKPIs: {
              type: 'array',
              items: { type: 'string' },
              minItems: 1
            },
            interactionPatterns: {
              type: 'array',
              items: { type: 'string' },
              minItems: 1
            }
          }
        }
      },
      humanCheckpoints: {
        type: 'array',
        minItems: 4,
        maxItems: 4,
        items: {
          type: 'object',
          required: ['checkpoint', 'description', 'importance', 'frequency'],
          properties: {
            checkpoint: { type: 'string' },
            description: { type: 'string' },
            importance: { type: 'string' },
            frequency: {
              type: 'string',
              enum: ['one-time', 'periodic', 'as-needed']
            }
          }
        }
      },
      agenticTimeline: {
        type: 'object',
        required: ['totalDurationWeeks', 'phases'],
        properties: {
          totalDurationWeeks: {
            type: 'number',
            minimum: 12,
            maximum: 52
          },
          phases: {
            type: 'array',
            minItems: 3,
            maxItems: 3,
            items: {
              type: 'object',
              required: ['phase', 'name', 'durationWeeks', 'description', 'milestones', 'riskMitigations', 'oversightLevel', 'humanInvolvement'],
              properties: {
                phase: {
                  type: 'string',
                  enum: ['crawl', 'walk', 'run']
                },
                name: { type: 'string' },
                durationWeeks: { type: 'number', minimum: 1 },
                description: { type: 'string' },
                milestones: {
                  type: 'array',
                  items: { type: 'string' },
                  minItems: 2
                },
                riskMitigations: {
                  type: 'array',
                  items: { type: 'string' },
                  minItems: 1
                },
                oversightLevel: {
                  type: 'string',
                  enum: ['high', 'medium', 'low']
                },
                humanInvolvement: { type: 'string' }
              }
            }
          }
        }
      },
      kpiImprovements: {
        type: 'array',
        minItems: 3,
        description: 'At least 3 KPI improvements are required',
        items: {
          type: 'object',
          required: ['kpi', 'targetValue', 'improvementPercent', 'linkedAgents', 'measurementMethod', 'timeframe'],
          properties: {
            kpi: { type: 'string' },
            currentValue: { type: 'string' },
            targetValue: { type: 'string' },
            improvementPercent: { type: 'number', minimum: 5, maximum: 500 },
            linkedAgents: {
              type: 'array',
              items: { type: 'string' },
              minItems: 1
            },
            measurementMethod: { type: 'string' },
            timeframe: { type: 'string' }
          }
        }
      }
    }
  };
} 