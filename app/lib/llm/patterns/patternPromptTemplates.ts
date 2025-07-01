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

  // 🆕 ENHANCED: Rich special instructions processing (matching legacy system sophistication)
  let specialInstructionsSection = '';
  if (config.specialInstructions) {
    specialInstructionsSection = `

🚨 CRITICAL OVERRIDE INSTRUCTIONS 🚨
The user has provided MANDATORY customization requirements that MUST take precedence over the general profile context:

"${config.specialInstructions}"

IMPORTANT: These instructions should COMPLETELY RESHAPE the blueprint focus:
- ALL agent roles MUST be redesigned around these specific requirements using the ${selectedPattern} pattern
- The business objective MUST reflect this focused scope, NOT generic company operations
- ALL tools and systems MUST align with this specific workflow/opportunity
- ALL KPI improvements MUST be relevant to this specific context
- The implementation timeline MUST be tailored to this specific challenge
- Agent coordination MUST follow ${pattern.coordinationMechanism} principles for this specific use case

⚠️ DO NOT generate a generic company-wide blueprint. Focus EXCLUSIVELY on the specific opportunity/workflow described in these instructions while strictly adhering to the ${selectedPattern} agentic pattern requirements.`;
  }

  // 🆕 ENHANCED: Rich opportunity context processing (matching legacy system)
  let focusContextSection = '';
  if (config.blueprintFocusContext) {
    focusContextSection = `

🎯 OPPORTUNITY-SPECIFIC BLUEPRINT GENERATION:
${config.blueprintFocusContext}

CRITICAL PATTERN INTEGRATION:
The ${selectedPattern} pattern has been pre-selected for this opportunity based on AI analysis. You MUST:
1. Design exactly ${pattern.agentCount} agents following ${pattern.coordinationMechanism} coordination
2. Specialize each agent role for the specific opportunity workflow described above
3. Ensure agent interactions follow ${pattern.patternType} principles
4. Tailor tools and systems to the opportunity's specific AI technologies and prerequisites
5. Map KPI improvements directly to the opportunity's primary metrics
6. Create a business objective that references the specific opportunity, not generic transformation

This is a FOCUSED implementation plan for the specific AI opportunity - not a general company blueprint.`;
  }

  // 🆕 ENHANCED: Calculate timeline based on pattern complexity
  const timelineWeeks = (() => {
    const baseWeeks = 24; // Default 6 months
    const patternComplexityMultiplier: Record<string, number> = {
      'Tool-Use': 0.5,
      'ReAct': 0.6,
      'Self-Reflection': 0.7,
      'Plan-and-Execute': 0.8,
      'Plan-Act-Reflect': 0.9,
      'Hierarchical-Planning': 1.2,
      'Manager-Workers': 1.0,
      'Hierarchical-Hub-Spoke': 1.3,
      'Blackboard-Shared-Memory': 1.1,
      'Market-Based-Auction': 1.4,
      'Decentralized-Swarm': 1.5
    };
    
    const multiplier = patternComplexityMultiplier[selectedPattern] || 1.0;
    return Math.ceil(baseWeeks * multiplier);
  })();

  // 🆕 ENHANCED: Strategic initiatives processing with opportunity filtering
  const strategicInitiativesList = (profile.strategicInitiatives || []).map((initiative: any, index: number) => {
    // Include process metrics and investment context if available
    let processMetricsSection = '';
    if (initiative.processMetrics) {
      const pm = initiative.processMetrics;
      processMetricsSection = `
   - Process Metrics:
     • Current Cycle Time: ${pm.currentCycleTime || 'Not specified'}
     • Current Volume: ${pm.currentVolume || 'Not specified'}
     • Current Error Rate: ${pm.currentErrorRate || 'Not specified'}
     • Current Cost Level: ${pm.currentCost || 'Not specified'}
     • Labor Intensity: ${pm.laborIntensity || 'Not specified'}
     • Process Complexity: ${pm.processComplexity || 'Not specified'}`;
    }
    
    let investmentContextSection = '';
    if (initiative.investmentContext) {
      const ic = initiative.investmentContext;
      investmentContextSection = `
   - Investment Context:
     • Budget Range: ${ic.budgetRange || 'Not specified'}
     • Timeframe: ${ic.timeframePreference || 'Not specified'}
     • Implementation Readiness: ${ic.implementationReadiness || 'Not specified'}
     • Risk Tolerance: ${ic.riskTolerance || 'Not specified'}
     • Success Definition: ${ic.successDefinition || 'Not specified'}
     • Stakeholder Buy-in: ${ic.stakeholderBuyIn || 'Not specified'}`;
    }
    
    return `${index + 1}. ${initiative.initiative}
   - Contact: ${initiative.contact?.name || 'Not specified'} (${initiative.contact?.title || 'Not specified'})
   - Priority: ${initiative.priority || 'Not specified'}
   - Status: ${initiative.status || 'Not specified'}
   - Business Problems: ${(initiative.businessProblems || []).length > 0 ? initiative.businessProblems.join('; ') : 'None specified'}
   - Expected Outcomes: ${(initiative.expectedOutcomes && initiative.expectedOutcomes.length > 0) ? initiative.expectedOutcomes.join('; ') : 'None specified'}${processMetricsSection}${investmentContextSection}`;
  }).join('\n');

  // 🆕 ENHANCED: Systems list with criticality assessment
  const systemsList = (profile.systemsAndApplications || []).map((system: any, index: number) => 
    `${index + 1}. ${system.name} (${system.category})
   - Vendor: ${system.vendor || 'Not specified'}
   - Criticality: ${system.criticality || 'Not specified'}
   - Description: ${system.description || 'Not specified'}`
  ).join('\n');

  // 🆕 ENHANCED: Pattern-specific agent count and role requirements
  let patternAgentRequirements = '';
  if (selectedPattern === 'Manager-Workers') {
    patternAgentRequirements = `
🔧 MANAGER-WORKERS PATTERN REQUIREMENTS (CRITICAL):
- Generate EXACTLY 5 specialized agents (not 4, not 6 - exactly 5)
- Agent 1: Orchestration Coordinator (manages workflow and coordinates other agents)
- Agent 2: Research/Intelligence Specialist (data gathering and analysis)
- Agent 3: Evaluation/Analysis Specialist (assessment and scoring)
- Agent 4: Implementation/Execution Specialist (action execution and monitoring)
- Agent 5: Communication/Stakeholder Specialist (cross-departmental coordination and stakeholder management)

AGENT SPECIALIZATION REQUIREMENTS:
- Each agent must have a domain-specific title (not generic "Project Manager" or "Analyst")
- Tools must be domain-appropriate and specific to the agent's role
- Each agent must have clear, non-overlapping responsibilities
- Coordination mechanism: Central orchestrator delegates to 4 specialist workers
`;
  } else if (selectedPattern === 'ReAct') {
    patternAgentRequirements = `
🔧 REACT PATTERN REQUIREMENTS:
- Generate 1 primary ReAct agent with Think→Act→Observe cycles
- Include specific reasoning steps and tool interaction protocols
- Focus on iterative problem-solving and self-correction capabilities
`;
  } else if (selectedPattern === 'Plan-Act-Reflect') {
    patternAgentRequirements = `
🔧 PLAN-ACT-REFLECT PATTERN REQUIREMENTS:
- Generate 3 coordinated agents: Strategic Planner, Tactical Executor, Reflective Assessor
- Include clear feedback loops and adaptation mechanisms
- Focus on iterative improvement and goal adjustment
`;
  } else if (selectedPattern === 'Hierarchical-Planning') {
    patternAgentRequirements = `
🔧 HIERARCHICAL PLANNING PATTERN REQUIREMENTS:
- Generate 4-6 agents in clear hierarchical structure
- Include strategic, tactical, and operational layers
- Define clear escalation and delegation protocols
`;
  } else {
    // Default fallback for other patterns
    patternAgentRequirements = `
🔧 ${selectedPattern.toUpperCase()} PATTERN REQUIREMENTS:
- Follow the specific coordination mechanisms for ${selectedPattern}
- Ensure agent count and roles align with pattern best practices
- Include appropriate oversight and collaboration protocols
`;
  }

  // 🆕 ENHANCED: Constitutional AI and advanced governance requirements
  const governanceRequirements = `
🛡️ ENHANCED GOVERNANCE & RISK MANAGEMENT (CRITICAL):

CONSTITUTIONAL AI INTEGRATION:
- Each agent must include ethical guardrails and decision validation
- High-stakes actions require constitutional review against company values
- Include explicit bias detection and mitigation protocols

ADVANCED HUMAN OVERSIGHT FRAMEWORK:
- POLICY-CHECKED: Standard operational decisions with AI guardrails
- CONSTITUTIONAL-AI: Ethical decision validation for sensitive actions
- HUMAN-APPROVAL: Manual review required for high-risk/high-value actions
- DUAL-APPROVAL: Two-person authorization for critical business impacts

OVERSIGHT ESCALATION MATRIX:
- Low risk operations: Policy-checked with automated guardrails
- Medium risk decisions: Constitutional-AI review + senior staff notification
- High risk actions: Human approval + legal/compliance review where applicable
- Critical business impact: Dual approval + executive oversight

CHAIN-OF-THOUGHT MONITORING:
- All agent reasoning must be transparent and auditable
- Include decision rationale in all agent outputs
- Enable real-time reasoning validation for high-stakes decisions
`;

  // 🆕 ENHANCED: Implementation timeline with crawl-walk-run methodology
  const implementationTimeline = `
📅 IMPLEMENTATION TIMELINE REQUIREMENTS (CRAWL-WALK-RUN):

Include a detailed 3-phase implementation timeline that aligns with the opportunity timeframe:

PHASE 1 - CRAWL (Proof of Concept):
- Duration: ${Math.ceil((timelineWeeks || 24) * 0.33)} weeks
- Scope: Limited pilot with high human oversight
- Success criteria: Basic workflow automation with 100% human validation
- Risk level: High human involvement, minimal autonomous decisions

PHASE 2 - WALK (Controlled Deployment):
- Duration: ${Math.ceil((timelineWeeks || 24) * 0.42)} weeks  
- Scope: Expanded deployment with selective autonomy
- Success criteria: Achieving target efficiency gains with reduced oversight
- Risk level: Medium autonomy with exception-based human intervention

PHASE 3 - RUN (Full Autonomy):
- Duration: ${Math.ceil((timelineWeeks || 24) * 0.25)} weeks
- Scope: Full autonomous operation with strategic oversight
- Success criteria: Meeting all KPI targets with minimal human intervention
- Risk level: High autonomy with periodic human review

PROGRESSIVE TRUST METHODOLOGY:
- Week 1-8: Trust level 20-40% (High oversight, agent suggestions require approval)
- Week 9-18: Trust level 50-75% (Medium oversight, agents handle routine decisions)
- Week 19-24: Trust level 80-95% (Low oversight, agents operate autonomously)
`;

  // 🆕 ENHANCED: Model-specific optimization guidance
  const modelOptimization = `
🤖 AI MODEL OPTIMIZATION STRATEGY:

Based on the latest 2025 model capabilities, optimize agent-model pairing:

ORCHESTRATION/COORDINATION AGENTS:
- Recommended: GPT-4o or Claude Sonnet 4
- Rationale: Structured decision-making and workflow coordination
- Features: Function calling, JSON mode, reliable tool use

ANALYSIS/RESEARCH AGENTS:
- Recommended: Claude Opus 4 with Extended Thinking
- Rationale: Deep analysis and complex reasoning requirements
- Features: 200k context, extended thinking mode, comprehensive analysis

EVALUATION/SCORING AGENTS:
- Recommended: Gemini 2.5 Pro with Adaptive Thinking
- Rationale: Dynamic evaluation criteria and real-time adaptation
- Features: 1M context, adaptive thinking, mathematical reasoning

COMMUNICATION/STAKEHOLDER AGENTS:
- Recommended: Gemini 2.5 Flash
- Rationale: Fast response times for real-time communication
- Features: Low latency, natural language generation, multi-turn conversations

IMPLEMENTATION/EXECUTION AGENTS:
- Recommended: GPT-4o
- Rationale: Precise action execution and document processing
- Features: Multimodal capabilities, tool use, structured outputs

Include specific model recommendations for each agent in the blueprint.
`;

  // 🆕 ENHANCED: Quality validation requirements
  const qualityRequirements = `
✅ BLUEPRINT QUALITY VALIDATION CHECKLIST:

PATTERN COMPLIANCE:
□ Agent count matches ${selectedPattern} pattern requirements exactly
□ Coordination mechanism aligns with pattern definition
□ Agent roles are properly specialized and non-overlapping

GOVERNANCE COMPLIANCE:
□ All agents include appropriate oversight levels
□ Constitutional AI guardrails are specified
□ Escalation protocols are clearly defined
□ Risk management is proportional to business impact

IMPLEMENTATION READINESS:
□ Crawl-walk-run timeline is included and realistic
□ Progressive trust levels are defined
□ Success criteria are measurable and specific
□ Risk mitigation strategies are comprehensive

BUSINESS ALIGNMENT:
□ All opportunity metrics are preserved and addressed
□ KPIs directly relate to business objectives
□ Tools and systems align with existing infrastructure
□ ROI projections are realistic and well-justified
`;

  let prompt = `Create a comprehensive AI Digital Team Blueprint using the ${selectedPattern} agentic pattern for the following business profile. This blueprint must implement the ${selectedPattern} coordination mechanism with exactly ${pattern.agentCount} specialized agents.${specialInstructionsSection}${focusContextSection}

**BUSINESS PROFILE:**
Company: ${profile.companyName}
Industry: ${profile.industry}
Size: ${profile.employeeCount || 'Not specified'} employees
Revenue: ${profile.annualRevenue || 'Not specified'}
Location: ${profile.primaryLocation || 'Not specified'}

**STRATEGIC INITIATIVES:**
${strategicInitiativesList}

**SYSTEMS & APPLICATIONS:**
${systemsList}

**SELECTED AGENTIC PATTERN: ${selectedPattern}**
- **Agent Count Required**: Exactly ${pattern.agentCount} agents (non-negotiable)
- **Coordination Mechanism**: ${pattern.coordinationMechanism}
- **Pattern Type**: ${pattern.patternType}
- **Best For**: ${pattern.bestFor.join(', ')}
- **Risk Profile**: ${pattern.riskProfile}

**PATTERN-SPECIFIC AGENT STRUCTURE:**
${pattern.agents.map((agent, index) => `
${index + 1}. **${agent.title}** (Role: ${agent.role})
   Primary Responsibility: ${agent.coreJob}
   Key Capabilities: ${agent.responsibilities.join(', ')}
   Oversight Requirements: ${agent.oversightLevel}
   Interaction Style: ${agent.interactionPatterns.join(', ')}
`).join('')}

${config.roiContext ? `
**ROI ANALYSIS REQUIREMENTS:**
${config.roiContext}
Base calculations on the process metrics and investment context provided in the strategic initiatives.
` : ''}

**BLUEPRINT GENERATION REQUIREMENTS:**

1. **BUSINESS OBJECTIVE** (Single focused statement)
   - Must be derived from the specific opportunity/workflow being addressed
   - Should be quantifiable and time-bound
   - Must align with the ${selectedPattern} pattern's strengths
   - Examples: "Automate invoice processing using ${selectedPattern} coordination to reduce cycle time by 40%"

2. **DIGITAL TEAM** (Exactly ${pattern.agentCount} agents following ${selectedPattern} pattern):
   For each agent provide:
   - **Role**: Must match the ${selectedPattern} pattern roles (${pattern.agents.map(a => a.role).join(', ')})
   - **Title**: Business-friendly job title appropriate for the specific opportunity
   - **Core Job**: Specialized responsibility for the opportunity workflow
   - **Responsibilities**: Detailed list of agent capabilities (from pattern definition)
   - **Tools Used**: 3-4 specific tools/systems this agent will use for the opportunity
   - **Oversight Level**: ${pattern.agents.map(a => a.oversightLevel).join(', ')} (as defined by pattern)
   - **Oversight Description**: How humans control this agent for the opportunity
   - **Linked KPIs**: 2-3 specific KPIs this agent impacts for the opportunity
   - **Interaction Patterns**: How this agent coordinates with others (${pattern.coordinationMechanism})

3. **HUMAN CHECKPOINTS** (4 control points with pattern-specific adaptations):
   - **Kick-off Workshop**: Pattern-specific setup and coordination design
   - **Review Gates**: Progress evaluation appropriate for ${pattern.coordinationMechanism}
   - **Exception Escalations**: Error handling suited to ${pattern.riskProfile} risk profile
   - **Quarterly Tune-Up**: Pattern optimization and performance tuning

4. **IMPLEMENTATION TIMELINE** (3 phases adapted for ${selectedPattern}):
   For each phase, consider:
   - ${pattern.coordinationMechanism} implementation complexity
   - Agent-to-agent interaction establishment
   - Pattern-specific risk mitigations
   - Appropriate oversight levels for ${pattern.riskProfile} risk profile

5. **KPI IMPROVEMENTS** (MANDATORY: Exactly 3, 4, or 5 metrics - NO FEWER THAN 3):
   ⚠️ **CRITICAL REQUIREMENT**: You MUST provide at least 3 KPI improvements linked to the specific opportunity.
   
   Each KPI must:
   - Relate directly to the opportunity being addressed
   - Show how the ${selectedPattern} pattern will achieve the improvement
   - Map to specific agent roles and their coordination
   - Demonstrate measurable business value

${config.roiContext ? `
6. **ROI PROJECTION** (Pattern-Enhanced Business Case):
   Provide financial analysis that includes:
   - How the ${selectedPattern} pattern specifically enables cost savings
   - Agent coordination efficiency benefits
   - Risk mitigation value from the pattern's design
   - Implementation costs considering pattern complexity
   - Realistic timelines based on ${pattern.coordinationMechanism} requirements
` : ''}

**CRITICAL SUCCESS FACTORS:**
- Agents must work together using ${pattern.coordinationMechanism} principles
- Each agent role must be distinct and non-overlapping per pattern requirements
- Tools and systems must enable the specific coordination mechanism
- Timeline must account for ${pattern.implementationComplexity} complexity
- Risk mitigations must address ${pattern.riskProfile} profile considerations

**🚨 CRITICAL OUTPUT REQUIREMENTS - NO EXCEPTIONS:**
1. You MUST respond with ONLY a valid JSON object
2. You MUST include ALL required sections - no partial responses
3. No markdown formatting, no explanations, no additional text
4. Start with { and end with } - pure JSON only
5. digitalTeam MUST have exactly ${pattern.agentCount} agents
6. selectedPattern MUST be "${selectedPattern}"
7. patternRationale MUST explain why ${selectedPattern} fits this specific opportunity

**⚠️ VALIDATION WARNING:** 
Partial responses will be rejected. You MUST generate all sections below or the response will fail validation.

**REQUIRED JSON STRUCTURE (ALL SECTIONS MANDATORY):**
{
  "businessObjective": "Single, measurable goal specific to the opportunity using ${selectedPattern} pattern coordination",
  "selectedPattern": "${selectedPattern}",
  "patternRationale": "2-3 sentence explanation of why ${selectedPattern} pattern specifically fits this opportunity context and business problems",
  "digitalTeam": [
    ${pattern.agents.map((agent, index) => `{
      "role": "${agent.role}",
      "title": "Opportunity-specific ${agent.title}",
      "coreJob": "Specialized for the opportunity: ${agent.coreJob}",
      "responsibilities": ${JSON.stringify(agent.responsibilities)},
      "toolsUsed": ["Opportunity-specific tool 1", "Opportunity-specific tool 2", "Opportunity-specific tool 3"],
      "oversightLevel": "${agent.oversightLevel}",
      "oversightDescription": "How humans control this agent for the opportunity",
      "linkedKPIs": ["Opportunity KPI 1", "Opportunity KPI 2"],
      "interactionPatterns": ${JSON.stringify(agent.interactionPatterns)}
    }${index < pattern.agents.length - 1 ? ',' : ''}`).join('\n    ')}
  ],
  "humanCheckpoints": [
    {
      "checkpoint": "Kick-off Workshop",
      "description": "${selectedPattern} pattern setup and coordination design",
      "importance": "Ensures proper ${pattern.coordinationMechanism} implementation",
      "frequency": "one-time"
    },
    {
      "checkpoint": "Review Gates",
      "description": "Pattern-specific progress evaluation and coordination tuning",
      "importance": "Validates ${selectedPattern} effectiveness and agent interactions",
      "frequency": "periodic"
    },
    {
      "checkpoint": "Exception Escalations",
      "description": "Handling edge cases and ${pattern.coordinationMechanism} failures",
      "importance": "Risk mitigation for ${pattern.riskProfile} profile",
      "frequency": "as-needed"
    },
    {
      "checkpoint": "Quarterly Tune-Up",
      "description": "Pattern optimization and agent coordination refinement",
      "importance": "Continuous improvement of ${selectedPattern} implementation",
      "frequency": "periodic"
    }
  ],
  "agenticTimeline": {
    "totalDurationWeeks": 24,
    "phases": [
      {
        "phase": "crawl",
        "name": "${selectedPattern} Pattern Proof of Concept",
        "durationWeeks": 8,
        "description": "Initial ${pattern.coordinationMechanism} implementation with high oversight",
        "milestones": ["Agent deployment", "${selectedPattern} coordination testing", "Pattern validation"],
        "riskMitigations": ["Human validation", "Limited scope", "${pattern.coordinationMechanism} monitoring"],
        "oversightLevel": "high",
        "humanInvolvement": "Continuous monitoring of ${selectedPattern} pattern effectiveness"
      },
      {
        "phase": "walk",
        "name": "${selectedPattern} Controlled Rollout",
        "durationWeeks": 10,
        "description": "Gradual expansion of ${pattern.coordinationMechanism} with reduced oversight",
        "milestones": ["Expanded scope", "Pattern optimization", "Coordination tuning"],
        "riskMitigations": ["Performance monitoring", "Pattern validation", "Agent interaction reviews"],
        "oversightLevel": "medium",
        "humanInvolvement": "Periodic review of ${selectedPattern} coordination effectiveness"
      },
      {
        "phase": "run",
        "name": "${selectedPattern} Full Automation",
        "durationWeeks": 6,
        "description": "Autonomous ${pattern.coordinationMechanism} operation with minimal oversight",
        "milestones": ["Full deployment", "Pattern mastery", "Integration complete"],
        "riskMitigations": ["Automated monitoring", "Exception escalation", "Pattern learning"],
        "oversightLevel": "low",
        "humanInvolvement": "Strategic oversight of ${selectedPattern} pattern optimization"
      }
    ]
  },
  "kpiImprovements": [
    {
      "kpi": "Opportunity-specific efficiency metric",
      "currentValue": "Current baseline",
      "targetValue": "Improvement target enabled by ${selectedPattern}",
      "improvementPercent": 40,
      "linkedAgents": ["${pattern.agents[0].role}", "${pattern.agents[1].role}"],
      "measurementMethod": "How success will be measured for this opportunity",
      "timeframe": "When results expected with ${selectedPattern} pattern"
    },
    {
      "kpi": "Opportunity-specific quality metric",
      "currentValue": "Current baseline",
      "targetValue": "Quality improvement via ${pattern.coordinationMechanism}",
      "improvementPercent": 25,
      "linkedAgents": ["${pattern.agents[1].role}", "${pattern.agents[2] ? pattern.agents[2].role : pattern.agents[0].role}"],
      "measurementMethod": "Quality measurement specific to the opportunity",
      "timeframe": "Quality improvement timeline"
    },
    {
      "kpi": "Opportunity-specific speed metric",
      "currentValue": "Current baseline",
      "targetValue": "Speed enhancement via ${selectedPattern} coordination",
      "improvementPercent": 60,
      "linkedAgents": ["${pattern.agents[0].role}", "${pattern.agents[3] ? pattern.agents[3].role : pattern.agents[1].role}"],
      "measurementMethod": "Speed measurement for the specific opportunity",
      "timeframe": "Speed improvement timeline"
    }
  ]${config.roiContext ? `,
  "roiProjection": {
    "processCostSavings": "$XXXk annual efficiency gains via ${selectedPattern} coordination",
    "laborReallocation": "$XXXk FTE capacity redeployment through pattern efficiency",
    "riskAvoidance": "$XXXk risk reduction from ${pattern.coordinationMechanism} reliability",
    "totalInvestment": "$XXXk implementation cost including ${selectedPattern} pattern setup",
    "ongoingCosts": "$XXk annual maintenance for pattern operations",
    "annualValue": "$XXXk total annual value from ${selectedPattern} implementation",
    "roiPercentage": XXX,
    "paybackMonths": XX,
    "keyAssumptions": [
      "${selectedPattern} pattern assumption 1",
      "Coordination mechanism assumption 2", 
      "Agent interaction assumption 3"
    ],
    "confidenceLevel": "High",
    "confidenceFactors": [
      "${selectedPattern} pattern proven effectiveness",
      "Strong coordination mechanism design"
    ],
    "executiveSummary": "Executive business case for ${selectedPattern} pattern implementation",
    "recommendedAction": "Next steps for ${selectedPattern} pattern deployment"
  }` : ''}
}

🚨 **CRITICAL VALIDATION REQUIREMENTS - FAILURE WILL REJECT RESPONSE:**
- businessObjective: Must reference the specific opportunity, not generic company operations ✅ REQUIRED
- selectedPattern: Must be exactly "${selectedPattern}" ✅ REQUIRED
- digitalTeam: Must have exactly ${pattern.agentCount} agents with pattern-compliant roles ✅ REQUIRED  
- humanCheckpoints: Must have exactly 4 checkpoints adapted for ${selectedPattern} ✅ REQUIRED
- agenticTimeline.phases: Must have exactly 3 phases with pattern-specific considerations ✅ REQUIRED
- kpiImprovements: Must have at least 3 KPI improvements related to the specific opportunity ✅ REQUIRED
- All agents must follow ${pattern.coordinationMechanism} interaction principles
- Response must be valid JSON starting with { and ending with }

🔥 **ABSOLUTE FINAL REQUIREMENT:** 
Generate the COMPLETE JSON structure with ALL sections above. Focus on the SPECIFIC OPPORTUNITY, not generic company transformation. The blueprint must demonstrate how the ${selectedPattern} pattern specifically enables success for this opportunity.

${config.specialInstructions ? `
🚨 FINAL REMINDER: You have received CRITICAL OVERRIDE INSTRUCTIONS above. The blueprint you generate MUST focus exclusively on the specific opportunity/workflow described in those instructions using the ${selectedPattern} pattern, NOT on general company operations.` : ''}

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