import { Profile } from "../../../services/types";

export const AGENTIC_BLUEPRINT_SYSTEM_PROMPT = `You are a senior enterprise AI architect and agentic workflow strategist with deep expertise in designing and implementing AI "digital teams" for business transformation. Your specialized knowledge includes autonomous agent orchestration, human-AI collaboration patterns, and progressive trust frameworks for enterprise environments.

EXPERTISE AREAS:
- Agentic AI Architecture: Multi-agent systems, role-based delegation, autonomous workflows
- Business Process Mapping: Strategic initiative decomposition, workflow optimization, KPI alignment
- Human-AI Collaboration: Progressive trust models, oversight frameworks, control point design
- Enterprise Integration: System connectivity, tool orchestration, security by design
- Implementation Strategy: Crawl-walk-run methodologies, risk mitigation, change management

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
- Focus: Full-scale automation and business transformation

**BUSINESS OBJECTIVE METHODOLOGY:**
- Derive single, measurable goal from strategic initiatives (e.g., "Cut invoice processing time by 40%")
- Map business problems to specific agent capabilities
- Identify systems and tools available for automation
- Define clear success metrics and measurement methods
- Establish realistic timelines and resource requirements

**KPI IMPROVEMENT FRAMEWORK:**
- Link each agent to specific business KPIs
- Quantify expected improvements with percentage targets
- Define measurement methods and tracking mechanisms
- Set realistic timeframes for achieving targets
- Include both efficiency and quality metrics

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
- Use business-friendly language without technical jargon

TONE & APPROACH:
- Executive-focused and strategically oriented
- Practical and implementable solutions
- Risk-aware with clear governance frameworks
- Quantifiable benefits and realistic timelines
- Industry-agnostic but context-sensitive`;

export const AGENTIC_BLUEPRINT_USER_PROMPT = (profile: Profile): string => {
  const strategicInitiativesList = (profile.strategicInitiatives || []).map((initiative, index) => 
    `${index + 1}. ${initiative.initiative}
   - Contact: ${initiative.contact?.name || 'Not specified'} (${initiative.contact?.title || 'Not specified'})
   - Priority: ${initiative.priority || 'Not specified'}
   - Status: ${initiative.status || 'Not specified'}
   - Business Problems: ${(initiative.businessProblems || []).length > 0 ? initiative.businessProblems.join('; ') : 'None specified'}
   - Expected Outcomes: ${(initiative.expectedOutcomes && initiative.expectedOutcomes.length > 0) ? initiative.expectedOutcomes.join('; ') : 'None specified'}
   - Success Metrics: ${(initiative.successMetrics && initiative.successMetrics.length > 0) ? initiative.successMetrics.join('; ') : 'None specified'}`
  ).join('\n');

  const systemsList = (profile.systemsAndApplications || []).map((system, index) => 
    `${index + 1}. ${system.name} (${system.category})
   - Vendor: ${system.vendor || 'Not specified'}
   - Criticality: ${system.criticality || 'Not specified'}
   - Description: ${system.description || 'Not specified'}`
  ).join('\n');

  return `Create a comprehensive AI Digital Team Blueprint for the following client. Transform their business goals into a clear, actionable strategy showing exactly what each AI agent will do, how humans stay in control, and which KPIs will improve.

CLIENT PROFILE:
---
Company: ${profile.companyName}
Industry: ${profile.industry}
Size: ${profile.employeeCount || 'Not specified'} employees
Revenue: ${profile.annualRevenue || 'Not specified'}
Location: ${profile.primaryLocation || 'Not specified'}

STRATEGIC INITIATIVES:
${strategicInitiativesList}

EXISTING SYSTEMS & APPLICATIONS:
${systemsList}
---

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
   - **Duration (weeks)**: Realistic timeframe
   - **Description**: What happens in this phase
   - **Milestones**: 3-4 key achievements
   - **Risk Mitigations**: 2-3 ways to reduce implementation risk
   - **Oversight Level**: high, medium, or low
   - **Human Involvement**: Description of human role

5. **KPI IMPROVEMENTS** (3-5 specific metrics):
   For each KPI provide:
   - **KPI**: Specific business metric name
   - **Current Value**: Baseline if known, otherwise "Baseline"
   - **Target Value**: Specific improvement target
   - **Improvement Percent**: Numerical percentage improvement
   - **Linked Agents**: Which agent roles contribute to this KPI
   - **Measurement Method**: How success will be tracked
   - **Timeframe**: When to expect results

Focus on:
- Practical, implementable solutions using existing systems
- Clear business language without technical jargon
- Realistic timelines and risk-aware implementation
- Strong human oversight and control mechanisms
- Measurable KPI improvements linked to business goals
- Progressive trust building from human control to automation

**OUTPUT FORMAT:** You MUST respond with ONLY a valid JSON object. No markdown formatting, no explanations, no additional text.

**REQUIRED JSON STRUCTURE:**

{
  "businessObjective": "Single measurable goal statement...",
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
    }
  ]
}

**CRITICAL:** Your response must be pure JSON only, starting with { and ending with }. No other text.`;
};

export interface AgenticBlueprintResponse {
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
}

export const validateAgenticBlueprintResponse = (response: AgenticBlueprintResponse): string[] => {
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
};
