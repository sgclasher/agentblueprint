import { Profile } from "../../../services/types";
import { 
  generateIndustryPromptSection, 
  getIndustryKPITemplates, 
  getIndustryPainPoints, 
  getIndustryAgentRoles,
  IndustryType 
} from './industryContextPrompts';
import { 
  buildPatternSpecificSystemPrompt,
  buildPatternSpecificUserPrompt,
  validatePatternCompliance,
  PatternSpecificBlueprintResponse
} from '../patterns/patternPromptTemplates';
import { 
  getPatternDefinition,
  getRecommendedPatternForProblemType,
  AgentDefinition
} from '../patterns/agenticPatternDefinitions';

// 🔍 AUDIT FINDINGS - CURRENT PROMPT QUALITY ASSESSMENT
// =====================================================
// Based on KB_AGENTIC_WORKFLOW_MVP.md standards and quality test results:
//
// ✅ STRENGTHS:
// - Comprehensive 5-agent team model (coordinator, researcher, analyst, quality-checker, actuator)
// - Progressive trust framework (crawl-walk-run) properly defined
// - Human oversight checkpoints align with KB standards
// - Structured JSON output format ensures consistency
//
// ❌ CRITICAL GAPS IDENTIFIED:
// 1. **Business Context Utilization** (Business Specificity Score: 10/25)
//    - Generic agent descriptions not tailored to industry
//    - Profile systems referenced but not deeply integrated into agent roles
//    - Business problems mentioned but not mapped to specific agent capabilities
//    - Industry terminology missing from agent job descriptions
//
// 2. **KPI Alignment Issues** (Calculated alignment < 0.8)
//    - KPI improvements not directly derived from strategic initiative problems
//    - Improvement percentages not based on business context or industry benchmarks
//    - Agent-to-KPI linkage too generic, not considering actual business workflows
//
// 3. **Implementation Specificity**
//    - Timelines generic (24 weeks) regardless of business size or complexity
//    - Risk mitigations not tailored to industry-specific challenges
//    - Tool assignments don't leverage full profile system inventory
//
// 🎯 IMPROVEMENT PRIORITIES:
// Phase 2: Enhanced business context processing
// Phase 3: Industry-specific prompt variations and dynamic assembly
// Phase 4: AI-powered quality validation and scoring

// 🎯 PHASE 3: ADVANCED PROMPT ENGINEERING - RESTRUCTURED ARCHITECTURE
// ===================================================================
// This refactored system integrates:
// ✅ Industry-specific intelligence (Phase 3.1 complete)
// ✅ KB_AGENTIC_WORKFLOW_MVP.md agent cooperation patterns
// ✅ Latest model capabilities (OpenAI structured outputs, Claude extended thinking, Gemini adaptive thinking)
// ✅ Dynamic prompt assembly based on business context
// ✅ Constraint-based reasoning for company-specific limitations

export interface AgenticBlueprintPromptConfig {
  industry?: IndustryType;
  includeIndustryContext?: boolean;
  enableChainOfThought?: boolean;
  modelProvider?: 'openai' | 'claude' | 'gemini';
  enableAdaptiveThinking?: boolean;
  enableExtendedThinking?: boolean;
  enableStructuredOutputs?: boolean;
  businessContext?: {
    complexityScore?: number;
    riskLevel?: 'low' | 'medium' | 'high';
    implementationReadiness?: 'low' | 'medium' | 'high';
  };
  includeKPIProbability?: boolean;
  includeROIProjection?: boolean;
  blueprintFocusContext?: string;  // 🆕 PHASE 2.2: Initiative focus context
  specialInstructions?: string;    // 🆕 PHASE 2.3: User customization instructions
  selectedPattern?: string;        // 🆕 PHASE 2: Pattern-specific blueprint generation
}

/**
 * Builds a dynamic system prompt with pattern-specific agent structures and model optimizations
 * 
 * @param config Configuration including selectedPattern for dynamic generation
 */
export function buildAgenticBlueprintSystemPrompt(config: AgenticBlueprintPromptConfig = {}): string {
  // If a specific pattern is selected, use pattern-specific generation
  if (config.selectedPattern) {
    return buildPatternSpecificSystemPrompt(config.selectedPattern, {
      includeROIProjection: config.includeROIProjection,
      modelProvider: config.modelProvider,
      industry: config.industry,
      businessContext: JSON.stringify(config.businessContext)
    });
  }
  
  // Fallback to legacy hard-coded system for backward compatibility
  console.warn('[AgenticBlueprintPrompt] No pattern selected, using legacy 5-agent system. Consider migrating to pattern-based generation.');
  return buildLegacySystemPrompt(config);
}

/**
 * Legacy system prompt builder (hard-coded 5-agent model) - DEPRECATED
 * Only used for backward compatibility when no pattern is specified
 */
function buildLegacySystemPrompt(config: AgenticBlueprintPromptConfig = {}): string {
  const basePrompt = `You are a senior enterprise AI architect and agentic workflow strategist with deep expertise in designing and implementing AI "digital teams" for business transformation. Your specialized knowledge includes autonomous agent orchestration, human-AI collaboration patterns, and progressive trust frameworks for enterprise environments.

EXPERTISE AREAS:
- Agentic AI Architecture: Multi-agent systems, role-based delegation, autonomous workflows
- Business Process Mapping: Strategic initiative decomposition, workflow optimization, KPI alignment
- Human-AI Collaboration: Progressive trust models, oversight frameworks, control point design
- Enterprise Integration: System connectivity, tool orchestration, security by design
- Implementation Strategy: Crawl-walk-run methodologies, risk mitigation, change management

🎯 AGENTIC DESIGN PATTERNS EXPERTISE (2025 Knowledge Base):
You are an expert in modern agentic AI design patterns and must select the optimal pattern combination for each business scenario. Your expertise covers proven patterns from 2022-2025 implementations.

**FOUNDATIONAL AGENTIC DESIGN PATTERNS:**

**1. Single-Agent Reasoning Loops:**
- **Tool-Use/Function-Calling**: LLM invokes external APIs and merges results into context
  • Best for: Simple data retrieval, single API calls, direct system integration
  • Example: "Get payroll data" → Call HR API → "Return formatted answer"

- **ReAct (Reason + Act)**: Interleave Thought → Action → Observation cycles
  • Best for: Research tasks, multi-step analysis, exploratory workflows
  • Example: "Research topic" → think → search → observe → think → summarize

- **Self-Reflection/Critique**: Agent reviews its own output against quality rubrics
  • Best for: Quality assurance, compliance checking, content validation
  • Example: Draft policy → self-check compliance → fix → publish

**2. Planning-Heavy Hybrids:**
- **Plan-and-Execute**: Strategic planner decomposes goals; executor handles steps
  • Best for: Multi-step tasks, cost optimization, data migration workflows
  • Strength: Cost efficiency through planning once, executing cheaply

- **Plan-Act-Reflect**: Adds supervisory loop that monitors progress and replans
  • Best for: Open-ended research, adaptive workflows, creative projects
  • Strength: Handles objective drift and changing requirements

- **Hierarchical Planning**: Goal cascades through multiple planner layers
  • Best for: Very long horizon projects, complex supply chains, game AI
  • Strength: Scales to enormous task graphs with clear accountability

**3. Multi-Agent Orchestration Styles:**
- **Manager-Workers (Orchestrator-Worker)**: Central coordinator assigns tasks to specialists
  • Best for: Clear workflows, deterministic processes, easy governance
  • Strength: Auditable, predictable, simple guardrails
  • Watch-out: Single point of failure if manager fails

- **Hierarchical/Hub-and-Spoke**: Tree structure (CEO → VP → Staff)
  • Best for: Large organizations, complex reporting structures
  • Strength: Clear accountability, scales to huge graphs
  • Watch-out: Added latency per layer

- **Blackboard/Shared-Memory**: Agents publish to common store; peers subscribe/react
  • Best for: High parallelism, loose coupling, event-driven workflows
  • Strength: Flexible collaboration, handles unpredictable workloads
  • Watch-out: Needs conflict-resolution logic

- **Market-Based/Auction**: Agents bid for tasks based on cost/confidence
  • Best for: Load balancing, resource optimization, specialized capabilities
  • Strength: Robust under spikes, fosters specialization
  • Watch-out: Coordination overhead

- **Decentralized Swarm**: Peers communicate directly, sometimes with voting
  • Best for: Fault tolerance, emergent behavior, distributed systems
  • Strength: No single point of failure, adaptive
  • Watch-out: Hard to debug, difficult policy enforcement

**PATTERN SELECTION HEURISTICS:**
Use these decision criteria to choose the optimal pattern for each business scenario:

| Business Need | Primary Pattern | Scale-Up Path |
|---------------|----------------|---------------|
| Simple data retrieval + API calls | **ReAct + Tool-Use** | Add Self-Reflection for critical outputs |
| Multi-step business process automation | **Plan-and-Execute** | Wrap in Plan-Act-Reflect if objectives drift |
| Specialist handoffs (research → draft → review) | **Manager-Workers** | Evolve to Hierarchical if tasks explode |
| Unpredictable, bursty collaboration needs | **Blackboard or Market-Based** | Layer guardrails & monitoring |
| High-volume, standardized processes | **Manager-Workers** | Add auction elements for load balancing |
| Complex, long-term strategic initiatives | **Hierarchical Planning** | Include market-based resource allocation |

**PROVEN DOMAIN BLUEPRINTS (Pattern Examples):**

**Customer Support Concierge** (Manager-Workers Pattern):
- Trigger: Customer ticket → Triage Bot classifies → Solution Finder searches KB → Escalation Agent routes
- Guardrails: Policy-checked on escalation; human approval for account credits
- KPIs: First-response time, CSAT, resolution rate
- Outcome: <30s first response, 24x7 coverage

**Security Operations Copilot** (Blackboard Pattern):
- Trigger: SIEM alert → Alert Ingestor posts IoCs → Threat Hunter correlates → Remediation Agent drafts playbook
- Guardrails: Human approval before quarantine actions
- KPIs: Mean-time-to-detect, mean-time-to-remediate
- Outcome: 50% MTTR reduction

**Marketing Campaign Optimizer** (Plan-and-Execute Pattern):
- Trigger: Campaign goal → Planner allocates budget → Channel Bots test creatives → Reflector replans
- Guardrails: Policy-checked compliance (brand, privacy)
- KPIs: ROAS, conversion rate, CAC
- Outcome: 15-25% conversion lift

**Healthcare Appointment Scheduler** (Single ReAct Agent):
- Trigger: Patient request → Check availability → Verify insurance → Book slot → Send reminders
- Guardrails: HIPAA policy filters before data output
- KPIs: No-show rate, scheduling latency
- Outcome: 30% fewer no-shows, halved admin time

**HR Onboarding Orchestrator** (Hierarchical Pattern):
- Trigger: Offer accepted → Onboarding Manager spawns tasks → IT/Policy/Buddy agents execute
- Guardrails: Human approval for equipment purchases
- KPIs: Time-to-productivity, new-hire satisfaction
- Outcome: Faster ramp-up, 40% less HR email traffic

**Supply Chain Resilience Monitor** (Market-Based Pattern):
- Trigger: Stock-out forecast → Broadcast event → Agents bid mitigation plans → Highest score executes
- Guardrails: Cost ceiling policies; human approval for >$100K contracts
- KPIs: Stock-out days, logistics cost, service level
- Outcome: Double-digit reduction in lost-sales days

**BUSINESS CONTEXT PATTERN MAPPING:**
When analyzing strategic initiatives, map business problems to appropriate patterns:

- **Process Automation** (high volume, standardized) → Manager-Workers
- **Research & Analysis** (exploratory, iterative) → Plan-Act-Reflect or ReAct
- **Complex Decision Support** (multi-factor, high stakes) → Hierarchical Planning
- **Real-time Operations** (event-driven, reactive) → Blackboard/Shared-Memory
- **Resource Optimization** (variable demand, cost-sensitive) → Market-Based/Auction
- **Quality Assurance** (validation, compliance) → Self-Reflection + Tool-Use
- **Multi-department Coordination** (handoffs, approvals) → Hierarchical Hub-and-Spoke

**INDUSTRY-SPECIFIC PATTERN PREFERENCES:**
- **Financial Services**: Manager-Workers + Self-Reflection (compliance focus)
- **Healthcare**: Single ReAct + Policy engines (HIPAA, safety-critical)
- **Manufacturing**: Plan-and-Execute + Blackboard (process optimization + real-time monitoring)
- **Technology**: Market-Based + Hierarchical (resource optimization + scaling)
- **Retail/E-commerce**: Manager-Workers + Plan-Act-Reflect (customer service + campaign optimization)
- **Government**: Hierarchical + Self-Reflection (approval chains + compliance)

**PATTERN SELECTION METHODOLOGY:**
1. **Analyze Business Context**: Evaluate industry, company size, risk tolerance, regulatory requirements
2. **Map Problem Types**: Identify whether problems are process-oriented, research-heavy, or decision-support
3. **Consider Scale & Complexity**: Choose simpler patterns first, evolve to complex orchestration as needed
4. **Factor Risk Profile**: High-risk industries need more Manager-Workers; innovative companies can use Market-Based
5. **Plan Evolution Path**: Start with proven patterns, design clear upgrade paths to more sophisticated orchestration

**KEY PRINCIPLES:**
- **Inner loop first, orchestration second**: Perfect single-agent patterns before multi-agent complexity
- **Planning = cost lever**: Strategic planning once, cheaper execution many times
- **Memory & guardrails non-negotiible**: Prevent forgetfulness and unsafe actions
- **Pattern choice is situational**: Start simple, add complexity only when scale demands it
- **Business problems drive pattern selection**: Don't force patterns; let business needs guide architecture

**INITIATIVE-FOCUSED PATTERN SELECTION:**
When focusing on a single strategic initiative, apply these enhanced mapping rules:

**Problem-to-Pattern Mapping for Focused Blueprints:**

1. **Process Automation & Efficiency Problems:**
   - "Manual data entry", "Document processing", "Invoice processing", "Report generation"
   - **Primary Pattern**: Manager-Workers (central coordination of standardized tasks)
   - **Enhancement**: Add Self-Reflection for quality control
   - **Agent Focus**: Actuator becomes specialized for the specific process type

2. **Research & Analysis Problems:**
   - "Market research", "Competitive analysis", "Data gathering", "Trend analysis"
   - **Primary Pattern**: Plan-Act-Reflect (adaptive research with course correction)
   - **Enhancement**: Add Tool-Use for data source integration
   - **Agent Focus**: Researcher and Analyst become domain specialists

3. **Decision Support & Strategy Problems:**
   - "Investment decisions", "Resource allocation", "Strategic planning", "Risk assessment"
   - **Primary Pattern**: Hierarchical Planning (multi-layer analysis and validation)
   - **Enhancement**: Add Market-Based elements for option evaluation
   - **Agent Focus**: Multiple analyst specialists with distinct perspectives

4. **Quality & Compliance Problems:**
   - "Error reduction", "Compliance monitoring", "Quality assurance", "Audit processes"
   - **Primary Pattern**: Self-Reflection + Manager-Workers
   - **Enhancement**: Add Policy engines and validation checkpoints
   - **Agent Focus**: Quality-Checker becomes compliance specialist with industry expertise

5. **Customer Experience Problems:**
   - "Customer service", "Onboarding", "Support tickets", "Response time"
   - **Primary Pattern**: Blackboard/Shared-Memory (real-time event handling)
   - **Enhancement**: Add escalation protocols and sentiment analysis
   - **Agent Focus**: Coordinator manages customer journey orchestration

6. **Resource Optimization Problems:**
   - "Cost reduction", "Workflow optimization", "Capacity planning", "Supply chain"
   - **Primary Pattern**: Market-Based/Auction (resource bidding and allocation)
   - **Enhancement**: Add Plan-and-Execute for implementation
   - **Agent Focus**: Multiple agents compete to optimize different resource dimensions

**SINGLE VS. MULTI-INITIATIVE APPROACH:**

**Single-Initiative Focus (Targeted Blueprint):**
- Select ONE primary agentic pattern based on the initiative's core problem type
- Specialize all 5 agents around that initiative's specific workflow
- Reference only the systems and tools relevant to that initiative
- Create industry-specific agent job descriptions and tool selections
- Generate highly detailed, implementation-ready workflows

**Multi-Initiative Synthesis (Comprehensive Blueprint):**
- Select Manager-Workers as base pattern with hybrid elements
- Balance agent capabilities across multiple problem types
- Reference all available systems for maximum flexibility
- Create generalist agent descriptions that can handle multiple initiatives
- Generate broader, foundation-building workflows

**PATTERN SELECTION OUTPUT REQUIREMENTS:**
In your response, you MUST include:
- **selectedPattern**: The primary agentic pattern chosen (e.g., "Manager-Workers", "Plan-Act-Reflect")
- **patternRationale**: 2-3 sentence explanation of why this pattern fits the business problems best

**Pattern Selection Examples:**
- "Manager-Workers" - "Selected because the initiative focuses on standardizing invoice processing workflows, which benefits from central coordination and clear task delegation to specialist agents."
- "Plan-Act-Reflect" - "Chosen for market research initiative due to the exploratory nature requiring adaptive planning and course correction based on findings."
- "Hierarchical-Planning" - "Applied for strategic resource allocation decision, requiring multi-layer analysis and validation before high-stakes investment decisions."`;

  const coreFramework = `
CORE AGENTIC BLUEPRINT FRAMEWORK:

**THE 5-AGENT DIGITAL TEAM MODEL:**

1. **COORDINATOR (Project Manager)**
   - Role: Breaks overall goals into bite-sized tasks, sets deadlines, assigns work
   - Tools: Calendar systems, task trackers, project management platforms
   - Oversight: Policy-checked autonomy - can plan but not finalize actions
   - KPI Impact: Project completion rates, timeline adherence, resource optimization

2. **RESEARCHER (Analyst)**
   - Role: Digs up data and documents needed for decision-making
   - Tools: Internal search engines, knowledge bases, web search (if allowed), databases
   - Oversight: Human-in-the-loop - output reviewed for accuracy and relevance
   - KPI Impact: Data quality, research speed, information completeness

3. **ANALYST/WRITER (Consultant)**
   - Role: Turns raw data into insights, drafts reports, creates recommendations
   - Tools: BI query systems, spreadsheet formulas, text generation, analysis platforms
   - Oversight: Policy-checked autonomy - quality bot flags anomalies for human review
   - KPI Impact: Insight quality, report generation speed, decision support effectiveness

4. **QUALITY-CHECKER (Auditor)**
   - Role: Reviews team output, finds mistakes, enforces brand/compliance rules
   - Tools: Style guides, policy engines, plagiarism scanners, compliance frameworks
   - Oversight: Full autonomy for low-risk edits, human escalation for high-risk items
   - KPI Impact: Error reduction, compliance adherence, output consistency

5. **ACTUATOR (Operations Specialist)**
   - Role: Pushes approved changes into live systems (updates records, sends emails, executes transactions)
   - Tools: ERP write APIs, email gateways, RPA bots, system integrations
   - Oversight: Human approval required initially, progresses to policy-guarded autonomy
   - KPI Impact: Process automation, execution speed, operational efficiency

**HUMAN CONTROL FRAMEWORK:**

1. **Kick-off Workshop**
   - What: Confirm KPIs, success criteria, risk constraints with leadership
   - Why: Ensures agents solve the right problem and align with business objectives
   - Frequency: One-time per initiative

2. **Review Gates**
   - What: Human review of Researcher/Analyst outputs flagged as "needs approval"
   - Why: Catches context mistakes and ensures quality before downstream actions
   - Frequency: Periodic based on output confidence scores

3. **Exception Escalations**
   - What: Immediate notification when risk scores spike (privacy breaches, compliance violations)
   - Why: Maintains human accountability for edge cases and high-risk scenarios
   - Frequency: As-needed based on automated risk assessment

4. **Quarterly Tune-Up**
   - What: Inspect logs, adjust guardrails, set new KPIs, update success criteria
   - Why: Continuous improvement and governance evolution
   - Frequency: Quarterly review cycles

**PROGRESSIVE TRUST MODEL (CRAWL-WALK-RUN):**

**CRAWL Phase (Weeks 1-8):**
- Human approval for all agent actions
- Read-only access to systems
- Manual review of all outputs
- Strict guardrails and safety checks
- Focus: Proof of concept and trust building

**WALK Phase (Weeks 9-20):**
- Policy-checked autonomy for low-risk tasks
- Limited write access to non-critical systems
- Automated quality gates with human escalation
- Expanded tool access based on performance
- Focus: Selective automation and capability expansion

**RUN Phase (Weeks 21+):**
- Full autonomy for approved workflows
- Complete system access within security boundaries
- Exception-based human intervention only
- Continuous learning and optimization
- Focus: Full-scale automation and business transformation`;

  let industrySection = '';
  if (config.includeIndustryContext && config.industry) {
    industrySection = generateIndustryPromptSection(config.industry);
  }

  let chainOfThoughtSection = '';
  if (config.enableChainOfThought) {
    chainOfThoughtSection = `
**CHAIN-OF-THOUGHT REASONING FRAMEWORK:**
When generating blueprints, follow this structured thinking process:

1. **ANALYZE THE BUSINESS CONTEXT**
   - Evaluate industry-specific challenges and opportunities
   - Assess company size and complexity constraints
   - Map strategic initiatives to potential agent capabilities

2. **MAP PROBLEMS TO AGENT CAPABILITIES**
   - Identify which business problems each agent type can address
   - Consider tool availability and system integration requirements
   - Evaluate automation potential and risk factors

3. **VALIDATE KPI ALIGNMENT**
   - Ensure proposed improvements are measurable and realistic
   - Consider industry benchmarks and company constraints
   - Calculate achievability based on available resources

4. **OPTIMIZE IMPLEMENTATION STRATEGY**
   - Design progressive trust levels appropriate for risk tolerance
   - Plan realistic timelines based on organizational readiness
   - Include appropriate risk mitigations and fallback options`;
  }

  let modelSpecificSection = '';
  
  if (config.modelProvider === 'gemini') {
    modelSpecificSection = `
**GEMINI ADAPTIVE THINKING MODE (2025 API Optimization):**
- Use adaptive thinking to carefully count and validate KPI requirements
- Apply parallel analysis paths: business context + KPI generation + validation
- CRITICAL: Before finalizing response, verify kpiImprovements array contains 3+ items
- Leverage Gemini's JSON mode for strict schema compliance
- Double-check all required array lengths against specifications
- Use step-by-step validation of each JSON section before output`;
  } else if (config.modelProvider === 'claude') {
    modelSpecificSection = `
**CLAUDE EXTENDED THINKING MODE (2025 API Optimization):**
- Engage extended thinking to methodically validate response structure
- Use interleaved thinking between tool calls to verify requirements
- CRITICAL: Think through KPI generation step-by-step, ensuring minimum 3 items
- Apply Claude's citations capability for requirement tracking
- Use fine-grained tool streaming for structured output validation
- Verify each JSON array meets specified length requirements`;
  } else if (config.modelProvider === 'openai') {
    modelSpecificSection = `
**OPENAI STRUCTURED OUTPUT MODE (2025 API Optimization):**
- Leverage GPT-4o's enhanced structured outputs and schema validation
- Use OpenAI's built-in JSON schema enforcement for array requirements
- CRITICAL: Validate kpiImprovements array length meets minimum 3 requirement
- Apply hybrid approach: deterministic validation + AI content generation
- Use schema validation features introduced in May 2025 updates
- Ensure backwards compatibility with existing integration patterns`;
  }

  const designPrinciples = `
**BUSINESS OBJECTIVE METHODOLOGY:**
- Derive single, measurable goal from strategic initiatives (e.g., "Cut invoice processing time by 40%")
- Map business problems to specific agent capabilities
- Identify systems and tools available for automation
- Define clear success metrics and measurement methods
- Establish realistic timelines and resource requirements

**KPI IMPROVEMENT FRAMEWORK:**
- ⚠️ **MANDATORY**: Must identify minimum 3 KPI improvements (validation requirement)
- Link each agent to specific business KPIs
- Quantify expected improvements with percentage targets
- Define measurement methods and tracking mechanisms
- Set realistic timeframes for achieving targets
- Include both efficiency and quality metrics
- Cover diverse aspects: efficiency, quality, speed, accuracy, cost reduction

${config.includeROIProjection ? `
**ROI BUSINESS CASE FRAMEWORK:**
- Calculate realistic financial impact based on process metrics and KPI improvements
- Consider current process costs, labor intensity, and operational inefficiencies
- Estimate investment requirements including implementation and ongoing costs
- Project annual value creation through efficiency gains and risk reduction
- Apply industry-specific benchmarks for credibility
- Include risk adjustments and confidence levels
- Generate executive-ready financial justification
- Use conservative assumptions to ensure defensibility

ROI CALCULATION METHODOLOGY:
1. **Process Cost Savings**: Based on cycle time reduction, volume processed, and current cost levels
2. **Labor Reallocation**: FTE capacity freed for higher-value work (30-50% of total savings)
3. **Risk Avoidance**: Compliance improvements, error reduction, quality gains (10-20% of value)
4. **Revenue Enablement**: Optional - new capabilities enabled by AI (if applicable)
5. **Investment Requirements**: Implementation costs scaled by complexity and readiness
6. **Payback Analysis**: Months to break even based on annual value vs total investment
` : ''}

DESIGN PRINCIPLES:
- Start with bounded, internal, process-oriented tasks
- Augment human capabilities rather than replace jobs
- Approach customer-facing autonomy with extreme caution
- Follow risk-gated iteration model for safe deployment
- Maintain clear audit trails and explainability
- Ensure compliance with industry regulations and data privacy

OUTPUT REQUIREMENTS:
- Generate vendor-neutral AI digital team blueprint
- Map business goals to specific agent roles and capabilities
- Define clear human oversight and control mechanisms
- Provide realistic implementation timeline with risk mitigation
- Link agent activities to measurable KPI improvements
${config.includeROIProjection ? '- Include comprehensive ROI projection and business case' : ''}
- Use business-friendly language without technical jargon

TONE & APPROACH:
- Executive-focused and strategically oriented
- Practical and implementable solutions
- Risk-aware with clear governance frameworks
- Quantifiable benefits and realistic timelines
- Industry-agnostic but context-sensitive`;

  return [
    basePrompt,
    coreFramework,
    industrySection,
    chainOfThoughtSection,
    modelSpecificSection,
    designPrinciples
  ].filter(section => section.trim()).join('\n');
}

/**
 * Builds a dynamic user prompt with pattern-specific requirements or legacy fallback
 * 
 * @param profile Business profile data
 * @param config Configuration including selectedPattern for dynamic generation
 */
export function buildAgenticBlueprintUserPrompt(
  profile: Profile, 
  config: AgenticBlueprintPromptConfig = {}
): string {
  // If a specific pattern is selected, use pattern-specific generation
  if (config.selectedPattern) {
    return buildPatternSpecificUserPrompt(profile, config.selectedPattern, {
      blueprintFocusContext: config.blueprintFocusContext,
      specialInstructions: config.specialInstructions,
      roiContext: config.includeROIProjection ? 'Include detailed ROI analysis based on process metrics' : undefined
    });
  }
  
  // Fallback to legacy hard-coded system for backward compatibility
  console.warn('[AgenticBlueprintPrompt] No pattern selected, using legacy 5-agent user prompt. Consider migrating to pattern-based generation.');
  return buildLegacyUserPrompt(profile, config);
}

/**
 * Legacy user prompt builder (hard-coded 5-agent model) - DEPRECATED
 * Only used for backward compatibility when no pattern is specified
 */
function buildLegacyUserPrompt(
  profile: Profile, 
  config: AgenticBlueprintPromptConfig = {}
): string {
  // Company size classification for constraint-based reasoning
  const getCompanySizeClassification = (employeeCount: number | string | undefined): string => {
    if (!employeeCount) return 'Not specified';
    const count = typeof employeeCount === 'string' ? 
      parseInt(employeeCount.replace(/[^\d]/g, '')) : employeeCount;
    
    if (count < 50) return 'small-sized (startup/SMB constraints)';
    if (count < 500) return 'medium-sized (moderate resources)';
    if (count < 5000) return 'large-sized (extensive resources)';
    return 'enterprise-sized (complex organizational structure)';
  };

  const strategicInitiativesList = (profile.strategicInitiatives || []).map((initiative, index) => {
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
   - Expected Outcomes: ${(initiative.expectedOutcomes && initiative.expectedOutcomes.length > 0) ? initiative.expectedOutcomes.join('; ') : 'None specified'}
   - Success Metrics: ${(initiative.successMetrics && initiative.successMetrics.length > 0) ? initiative.successMetrics.join('; ') : 'None specified'}${processMetricsSection}${investmentContextSection}`;
  }).join('\n');

  const systemsList = (profile.systemsAndApplications || []).map((system, index) => 
    `${index + 1}. ${system.name} (${system.category})
   - Vendor: ${system.vendor || 'Not specified'}
   - Criticality: ${system.criticality || 'Not specified'}
   - Description: ${system.description || 'Not specified'}`
  ).join('\n');

  // Industry-specific context injection
  let industryGuidance = '';
  if (config.includeIndustryContext && config.industry) {
    const kpiTemplates = getIndustryKPITemplates(config.industry);
    const painPoints = getIndustryPainPoints(config.industry);
    
    industryGuidance = `
INDUSTRY-SPECIFIC GUIDANCE:
Focus on ${config.industry} industry priorities: ${painPoints.slice(0, 3).join(', ')}.
Use relevant KPI templates: ${kpiTemplates.slice(0, 3).join(', ')}.
Apply industry-specific agent capability mapping from the system prompt context.`;
  }

  // Business context integration
  let businessContextSection = '';
  if (config.businessContext) {
    businessContextSection = `
BUSINESS CONTEXT ANALYSIS:
- Company complexity score: ${config.businessContext.complexityScore || 'Not assessed'}
- Implementation risk level: ${config.businessContext.riskLevel || 'Not assessed'}
- Implementation readiness: ${config.businessContext.implementationReadiness || 'Not assessed'}
Consider these factors when determining implementation timeline and agent oversight levels.`;
  }

  // KPI probability scoring
  let kpiProbabilitySection = '';
  if (config.includeKPIProbability) {
    kpiProbabilitySection = `
KPI ACHIEVEMENT PROBABILITY SCORING:
Assess the realistic probability of achieving each KPI improvement based on:
- Industry benchmarks and typical improvement ranges
- Company size and resource constraints
- Current systems and process maturity
- Implementation timeline and risk factors
Include probability scores (High/Medium/Low) for each KPI target.`;
  }

  // Strategic initiative focus context
  let focusContextSection = '';
  if (config.blueprintFocusContext) {
    focusContextSection = config.blueprintFocusContext;
  }

  // Special instructions from user
  let specialInstructionsSection = '';
  if (config.specialInstructions) {
    specialInstructionsSection = `

🚨 CRITICAL OVERRIDE INSTRUCTIONS 🚨
The user has provided MANDATORY customization requirements that MUST take precedence over the general profile context:

"${config.specialInstructions}"

IMPORTANT: These instructions should COMPLETELY RESHAPE the blueprint focus:
- ALL agent roles MUST be redesigned around these specific requirements
- The business objective MUST reflect this focused scope, NOT generic company operations
- ALL tools and systems MUST align with this specific workflow/opportunity
- ALL KPI improvements MUST be relevant to this specific context
- The implementation timeline MUST be tailored to this specific challenge

⚠️ DO NOT generate a generic company-wide blueprint. Focus EXCLUSIVELY on the specific opportunity/workflow described in these instructions.`;
  }

  return `Create a comprehensive AI Digital Team Blueprint for the following client. Transform their business goals into a clear, actionable strategy showing exactly what each AI agent will do, how humans stay in control, and which KPIs will improve.
${specialInstructionsSection}
${focusContextSection}
CLIENT PROFILE:
---
Company: ${profile.companyName}
Industry: ${profile.industry}
Size: ${profile.employeeCount || 'Not specified'} employees (${getCompanySizeClassification(profile.employeeCount)})
Revenue: ${profile.annualRevenue || 'Not specified'}
Location: ${profile.primaryLocation || 'Not specified'}

STRATEGIC INITIATIVES:
${strategicInitiativesList}

EXISTING SYSTEMS & APPLICATIONS:
${systemsList}
---
${industryGuidance}
${businessContextSection}
${kpiProbabilitySection}

BLUEPRINT REQUIREMENTS:

1. **BUSINESS OBJECTIVE** (1 sentence)
   - Single, measurable goal derived from the strategic initiatives
   - Should be specific, quantifiable, and time-bound
   - Examples: "Cut invoice processing time by 40%" or "Reduce customer onboarding from 5 days to 2 days"

2. **DIGITAL TEAM** (Exactly 5 AI specialists):
   For each agent provide:
   - **Role**: One of coordinator, researcher, analyst, quality-checker, actuator
   - **Title**: Business-friendly job title (Project Manager, Analyst, Consultant, Auditor, Ops Specialist)
   - **Core Job**: Clear description of main responsibility in business terms
   - **Tools Used**: 3-4 specific tools/systems this agent will use
   - **Oversight Level**: human-approval, policy-checked, or full-autonomy
   - **Oversight Description**: Explain human control mechanism
   - **Linked KPIs**: 2-3 specific KPIs this agent directly impacts

3. **HUMAN CHECKPOINTS** (4 control points):
   For each checkpoint provide:
   - **Checkpoint**: Kick-off Workshop, Review Gates, Exception Escalations, Quarterly Tune-Up
   - **Description**: What humans do at this checkpoint
   - **Importance**: Why this checkpoint matters for success
   - **Frequency**: one-time, periodic, or as-needed

4. **IMPLEMENTATION TIMELINE** (3 phases - Crawl, Walk, Run):
   For each phase provide:
   - **Phase**: crawl, walk, or run
   - **Name**: Business-friendly phase name
   - **Duration (weeks)**: Realistic timeframe based on company size and complexity
   - **Description**: What happens in this phase
   - **Milestones**: 3-4 key achievements
   - **Risk Mitigations**: 2-3 ways to reduce implementation risk
   - **Oversight Level**: high, medium, or low
   - **Human Involvement**: Description of human role

5. **KPI IMPROVEMENTS** (MANDATORY: Exactly 3, 4, or 5 metrics - NO FEWER THAN 3):
   ⚠️ **CRITICAL REQUIREMENT**: You MUST provide at least 3 KPI improvements. Providing fewer than 3 will result in validation failure.
   
   For each KPI provide:
   - **KPI**: Specific business metric name
   - **Current Value**: Baseline if known, otherwise "Baseline"
   - **Target Value**: Specific improvement target
   - **Improvement Percent**: Numerical percentage improvement
   - **Linked Agents**: Which agent roles contribute to this KPI
   - **Measurement Method**: How success will be tracked
   - **Timeframe**: When to expect results
   
   **EXAMPLES OF VALID KPI IMPROVEMENTS:**
   - "Invoice processing time": 40% reduction
   - "Customer onboarding speed": 60% faster completion
   - "Document accuracy": 25% fewer errors

${config.includeROIProjection ? `
6. **ROI PROJECTION** (Executive Business Case):
   Provide a comprehensive financial analysis including:
   - **Process Cost Savings**: Annual efficiency gains in dollars
   - **Labor Reallocation**: FTE capacity redeployment
   - **Risk Avoidance**: Compliance and quality improvement value
   - **Total Investment**: Implementation cost estimate
   - **Annual Value**: Total yearly benefit
   - **ROI Percentage**: Return on investment calculation
   - **Payback Months**: Time to break even
   - **Key Assumptions**: List of 3-4 critical assumptions
   - **Confidence Level**: High, Medium, or Low
   - **Executive Summary**: 2-3 sentence business case
   - **Recommended Action**: Clear next step recommendation
   
   Base calculations on the process metrics and investment context provided in the strategic initiatives.
` : ''}

Focus on:
- Practical, implementable solutions using existing systems
- Clear business language without technical jargon
- Realistic timelines and risk-aware implementation
- Strong human oversight and control mechanisms
- Measurable KPI improvements linked to business goals
- Progressive trust building from human control to automation
${config.includeROIProjection ? '- Defensible ROI projections based on process metrics' : ''}

**OUTPUT FORMAT:** You MUST respond with ONLY a valid JSON object. No markdown formatting, no explanations, no additional text.

⚠️ **FINAL REMINDER**: The kpiImprovements array MUST contain at least 3 items. This is strictly validated.

**AGENTIC PATTERN SELECTION REQUIREMENT:**
Based on the strategic initiative(s) and business problems, you MUST:
1. **Analyze Problem Types**: Identify the primary business problem categories from the initiatives
2. **Map to Patterns**: Use the problem-to-pattern mapping from your training to select the optimal agentic pattern
3. **Provide Rationale**: Explain why this pattern best fits the business context and problems
4. **Specialize Agents**: If focusing on a single initiative, specialize all agents around that workflow

**REQUIRED JSON STRUCTURE:**

{
  "businessObjective": "Single measurable goal statement...",
  "selectedPattern": "Manager-Workers",
  "patternRationale": "Selected because the initiative focuses on standardizing workflows, which benefits from central coordination and clear task delegation to specialist agents.",
  "digitalTeam": [
    {
      "role": "coordinator",
      "title": "Project Manager",
      "coreJob": "Description of main responsibility...",
      "toolsUsed": ["Tool 1", "Tool 2", "Tool 3"],
      "oversightLevel": "policy-checked",
      "oversightDescription": "How humans control this agent...",
      "linkedKPIs": ["KPI 1", "KPI 2"]
    }
  ],
  "humanCheckpoints": [
    {
      "checkpoint": "Kick-off Workshop",
      "description": "What people do...",
      "importance": "Why it matters...",
      "frequency": "one-time"
    }
  ],
  "agenticTimeline": {
    "totalDurationWeeks": 24,
    "phases": [
      {
        "phase": "crawl",
        "name": "Proof of Concept",
        "durationWeeks": 8,
        "description": "Phase description...",
        "milestones": ["Milestone 1", "Milestone 2"],
        "riskMitigations": ["Risk mitigation 1", "Risk mitigation 2"],
        "oversightLevel": "high",
        "humanInvolvement": "Description of human role..."
      }
    ]
  },
  "kpiImprovements": [
    {
      "kpi": "Invoice processing time",
      "currentValue": "5 days",
      "targetValue": "3 days",
      "improvementPercent": 40,
      "linkedAgents": ["coordinator", "actuator"],
      "measurementMethod": "Average days from receipt to payment",
      "timeframe": "Within 6 months"
    },
    {
      "kpi": "Document accuracy rate",
      "currentValue": "85%",
      "targetValue": "95%",
      "improvementPercent": 12,
      "linkedAgents": ["quality-checker", "analyst"],
      "measurementMethod": "Percentage of error-free documents",
      "timeframe": "Within 4 months"
    },
    {
      "kpi": "Task completion speed",
      "currentValue": "2 hours",
      "targetValue": "1.2 hours",
      "improvementPercent": 40,
      "linkedAgents": ["researcher", "coordinator"],
      "measurementMethod": "Average time per completed task",
      "timeframe": "Within 8 months"
    }
  ]${config.includeROIProjection ? `,
  "roiProjection": {
    "processCostSavings": "$450K annual efficiency gains",
    "laborReallocation": "$320K FTE capacity redeployment",
    "riskAvoidance": "$150K compliance risk reduction",
    "totalInvestment": "$280K implementation cost",
    "ongoingCosts": "$50K annual maintenance",
    "annualValue": "$920K total annual value",
    "roiPercentage": 229,
    "paybackMonths": 11,
    "keyAssumptions": [
      "40% cycle time improvement achievable",
      "2 FTEs can be redeployed to higher-value work",
      "AI model accuracy will meet 95% threshold"
    ],
    "confidenceLevel": "High",
    "confidenceFactors": [
      "Strong technical foundation",
      "Executive sponsorship secured",
      "Industry benchmarks support projections"
    ],
    "executiveSummary": "This AI implementation will deliver 229% ROI with an 11-month payback period. The $280K investment will generate $920K in annual value through process automation and efficiency gains.",
    "recommendedAction": "Proceed with Phase 1 pilot"
  }` : ''}
}

**CRITICAL:** Your response must be pure JSON only, starting with { and ending with }. No other text.

${config.specialInstructions ? `
🚨 FINAL REMINDER: You have received CRITICAL OVERRIDE INSTRUCTIONS above. The blueprint you generate MUST focus exclusively on the specific opportunity/workflow described in those instructions, NOT on general company operations. Ignore generic strategic initiatives if they don't relate to the specific focus area.` : ''}`;
}

// Legacy exports for backwards compatibility
export const AGENTIC_BLUEPRINT_SYSTEM_PROMPT = buildAgenticBlueprintSystemPrompt();

export const AGENTIC_BLUEPRINT_USER_PROMPT = (
  profile: Profile, 
  businessContext?: any, 
  agentCapabilityMapping?: any, 
  timelineRecommendation?: any
): string => {
  // Convert legacy parameters to new config format
  const config: AgenticBlueprintPromptConfig = {
    industry: profile.industry as IndustryType,
    includeIndustryContext: true,
    businessContext: businessContext
  };
  
  return buildAgenticBlueprintUserPrompt(profile, config);
};

// Legacy response interface for backward compatibility - DEPRECATED
export interface LegacyAgenticBlueprintResponse {
  businessObjective: string;
  digitalTeam: Array<{
    role: 'coordinator' | 'researcher' | 'analyst' | 'quality-checker' | 'actuator';
    title: string;
    coreJob: string;
    toolsUsed: string[];
    oversightLevel: 'human-approval' | 'policy-checked' | 'full-autonomy';
    oversightDescription: string;
    linkedKPIs: string[];
  }>;
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
  selectedPattern?: string;
  patternRationale?: string;
}

// New pattern-based response interface - RECOMMENDED
export interface AgenticBlueprintResponse {
  businessObjective: string;
  selectedPattern: string;
  patternRationale: string;
  digitalTeam: AgentDefinition[];  // Dynamic agent structure based on pattern
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

/**
 * Validates agentic blueprint response based on pattern requirements or legacy validation
 */
export const validateAgenticBlueprintResponse = (
  response: AgenticBlueprintResponse | LegacyAgenticBlueprintResponse,
  selectedPattern?: string
): string[] => {
  // If pattern is specified and response has pattern fields, use pattern-specific validation
  if (selectedPattern && 'selectedPattern' in response && response.selectedPattern) {
    console.log('[AgenticBlueprintPrompt] Using pattern-specific validation for:', selectedPattern);
    return validatePatternCompliance(response as PatternSpecificBlueprintResponse, selectedPattern);
  }
  
  // Fallback to legacy validation for backward compatibility
  console.warn('[AgenticBlueprintPrompt] Using legacy 5-agent validation. Consider migrating to pattern-based validation.');
  return validateLegacyResponse(response as LegacyAgenticBlueprintResponse);
};

/**
 * Legacy validation function (hard-coded 5-agent model) - DEPRECATED
 */
function validateLegacyResponse(response: LegacyAgenticBlueprintResponse): string[] {
  const warnings: string[] = [];
  
  if (!response.businessObjective || response.businessObjective.length < 50) {
    warnings.push('Business objective should be specific and measurable (50+ characters)');
  }
  
  if (!response.digitalTeam || response.digitalTeam.length !== 5) {
    warnings.push('Digital team must have exactly 5 AI specialists');
  }
  
  if (response.digitalTeam) {
    const requiredRoles: Array<'coordinator' | 'researcher' | 'analyst' | 'quality-checker' | 'actuator'> = ['coordinator', 'researcher', 'analyst', 'quality-checker', 'actuator'];
    const presentRoles = response.digitalTeam.map(agent => agent.role);
    const missingRoles = requiredRoles.filter(role => !presentRoles.includes(role));
    
    if (missingRoles.length > 0) {
      warnings.push(`Missing required agent roles: ${missingRoles.join(', ')}`);
    }
    
    response.digitalTeam.forEach((agent, index) => {
      if (!agent.title || !agent.coreJob || !agent.toolsUsed || agent.toolsUsed.length < 2) {
        warnings.push(`Agent ${index + 1} missing required fields or insufficient tools`);
      }
    });
  }
  
  if (!response.humanCheckpoints || response.humanCheckpoints.length !== 4) {
    warnings.push('Must have exactly 4 human checkpoints');
  }
  
  if (!response.agenticTimeline?.phases || response.agenticTimeline.phases.length !== 3) {
    warnings.push('Implementation timeline must have exactly 3 phases (crawl, walk, run)');
  }
  
  if (!response.kpiImprovements || response.kpiImprovements.length < 3) {
    warnings.push('Should identify at least 3 KPI improvements');
  }
  
  return warnings;
}

/**
 * Helper function to determine if AI Opportunities identified a specific pattern
 */
export function extractPatternFromOpportunities(opportunities: any[]): string | undefined {
  if (!opportunities || opportunities.length === 0) return undefined;
  
  // Look for pattern recommendations in AI opportunities
  const opportunity = opportunities[0];
  if (opportunity?.agenticPattern?.recommendedPattern) {
    return opportunity.agenticPattern.recommendedPattern;
  }
  
  return undefined;
}

/**
 * Auto-select appropriate pattern based on business problems
 */
export function autoSelectPattern(profile: Profile): string {
  const initiatives = profile.strategicInitiatives || [];
  const allProblems = initiatives.flatMap(init => init.businessProblems || []);
  
  // Simple heuristic mapping - this could be enhanced with ML classification
  const problemText = allProblems.join(' ').toLowerCase();
  
  if (problemText.includes('manual') || problemText.includes('process') || problemText.includes('automation')) {
    return 'Manager-Workers';
  }
  
  if (problemText.includes('research') || problemText.includes('analysis') || problemText.includes('data')) {
    return 'Plan-Act-Reflect';
  }
  
  if (problemText.includes('decision') || problemText.includes('strategy') || problemText.includes('planning')) {
    return 'Hierarchical-Planning';
  }
  
  if (problemText.includes('quality') || problemText.includes('compliance') || problemText.includes('error')) {
    return 'Self-Reflection';
  }
  
  if (problemText.includes('simple') || problemText.includes('retrieval') || problemText.includes('api')) {
    return 'Tool-Use';
  }
  
  if (problemText.includes('complex') || problemText.includes('problem') || problemText.includes('solve')) {
    return 'ReAct';
  }
  
  // Default to Manager-Workers for process-oriented business problems
  return 'Manager-Workers';
}
