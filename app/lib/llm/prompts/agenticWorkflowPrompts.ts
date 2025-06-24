import { Profile, AgenticWorkflowPattern } from '../../../services/types';

/**
 * Agentic Workflow Analysis Prompts
 * Platform-agnostic workflow recommendations based on enterprise AI research
 */

export const WORKFLOW_ANALYSIS_SYSTEM_PROMPT = `
You are an expert Enterprise AI Strategy Consultant specializing in agentic workflow design. 

## Core Principles (Based on 2025 Enterprise AI Research):

1. **Bounded, Internal, Process-Oriented Focus**: Prioritize workflows that are:
   - Well-defined with clear boundaries
   - Internal to the organization (not customer-facing initially)  
   - Process-driven with repeatable steps

2. **Risk-Gated Implementation**: Always recommend phased approaches:
   - Draft → Pilot → Production phases
   - Human oversight checkpoints for high-risk decisions
   - Conservative confidence thresholds (85%+ for automation)

3. **Platform-Agnostic Design**: Focus on business logic, not technical implementation:
   - Describe WHAT needs to happen, not HOW to implement it
   - Define governance checkpoints, not specific approval tools

4. **ROI-Driven**: Target the $3.50 per $1 invested benchmark

Generate specific, actionable workflow recommendations based on proven enterprise success patterns.

Your response must be in valid JSON format with structured workflow data.
`;

export const generateWorkflowAnalysisPrompt = (profile: Profile): string => {
    const { 
        companyName, 
        industry, 
        employeeCount, 
        strategicInitiatives = [],
        systemsAndApplications = []
    } = profile;

    return `
## Business Profile Analysis

**Company:** ${companyName}
**Industry:** ${industry}
**Size:** ${employeeCount || 'Not specified'} employees

### Strategic Initiatives:
${strategicInitiatives.length > 0 
    ? strategicInitiatives.map(init => `
**${init.initiative}**
- Business Problems: ${init.businessProblems?.join(', ') || 'Not specified'}
- Priority: ${init.priority || 'Not specified'}
`).join('\n')
    : '- No strategic initiatives specified'
}

### Current Systems:
${systemsAndApplications.length > 0
    ? systemsAndApplications.map(sys => `- ${sys.name} (${sys.category})`).join('\n')
    : '- No systems specified'
}

## Analysis Request:

Based on this business profile, recommend 3-5 specific agentic workflow opportunities that:

1. **Align with Strategic Initiatives**: Connect to stated business problems
2. **Fit Industry Context**: Appropriate for ${industry} 
3. **Match Company Size**: Suitable for ${employeeCount || 'mid-size'} company
4. **Follow Success Patterns**: Based on proven approaches

For each workflow, provide:
- **Workflow Name**: Specific, descriptive name
- **Business Objective**: Measurable goal (e.g., 'Reduce processing time by 70%')
- **Category**: Process Automation, Decision Support, Customer Experience, etc.
- **Workflow Steps**: 3-5 key steps with business logic
- **Governance Checkpoints**: When human oversight is required
- **Risk Assessment**: Key risks and mitigation strategies
- **ROI Analysis**: Cost savings, implementation cost, payback period
- **Implementation Phases**: Pilot and production approach
- **Next Steps**: Immediate action items

Focus on "bounded, internal, process-oriented" patterns like:
- Document processing automation
- Customer service triage  
- Data entry validation
- Administrative task automation
- Decision support systems

Make recommendations specific to ${companyName} and actionable.

Please provide your response in JSON format with the workflow recommendations and analysis.
`;
};

export const WORKFLOW_PERSONALIZATION_PROMPT = `
You are personalizing a generic workflow pattern for a specific business context. Your goal is to make the workflow more relevant and actionable for this particular company.

## Personalization Guidelines:

1. **Industry Contextualization**: 
   - Adapt examples and terminology to the specific industry
   - Include industry-specific compliance and regulatory considerations
   - Reference common industry processes and challenges

2. **Company Size Optimization**:
   - Adjust scope and complexity based on company size
   - Scale resource requirements appropriately
   - Consider organizational maturity levels

3. **Strategic Alignment**:
   - Connect workflow benefits to stated strategic initiatives
   - Map workflow outcomes to specific business problems
   - Align implementation timeline with business priorities

4. **Risk Customization**:
   - Adjust governance checkpoints based on company risk tolerance
   - Include industry-specific security and compliance requirements
   - Customize escalation paths based on organizational structure

5. **ROI Customization**:
   - Adjust cost savings estimates based on company size and location
   - Include industry-specific efficiency benchmarks
   - Customize payback period expectations based on company financial position

## Output Format:
Provide specific modifications to make the generic workflow pattern more relevant to this company, including:
- Industry-specific examples and terminology
- Customized governance checkpoints
- Adjusted ROI calculations
- Modified implementation approach
- Specific risk considerations
`;

export const generateWorkflowPersonalizationPrompt = (
    genericPattern: AgenticWorkflowPattern, 
    profile: Profile
): string => {
    return `
## Generic Workflow Pattern:
**Name:** ${genericPattern.name}
**Category:** ${genericPattern.category}
**Description:** ${genericPattern.description}

## Company Context:
**Company:** ${profile.companyName}
**Industry:** ${profile.industry}
**Size:** ${profile.employeeCount || 'Not specified'}

### Strategic Initiatives:
${profile.strategicInitiatives?.map(init => `
- **${init.initiative}**: ${init.businessProblems?.join(', ')}
`).join('') || 'None specified'}

## Personalization Request:

Customize this generic workflow for ${profile.companyName} in ${profile.industry}:

1. **Industry-Specific Adaptation:**
   - Use ${profile.industry}-specific examples and terminology
   - Include relevant compliance requirements
   - Reference common ${profile.industry} processes

2. **Strategic Alignment:**
   - Connect to their specific business problems
   - Show ROI relevant to their initiatives
   - Align timeline with their priorities

3. **Risk Customization:**
   - Include ${profile.industry}-specific risks
   - Adjust governance for their context
   - Consider regulatory environment

Return a personalized workflow with specific examples and metrics for ${profile.companyName}.
`;
};

export const WORKFLOW_REFINEMENT_PROMPT = `
You are refining an agentic workflow recommendation based on user feedback and business requirements. Your goal is to improve the workflow's specificity, feasibility, and business value.

## Refinement Principles:

1. **Increase Specificity**: Make recommendations more concrete and actionable
2. **Improve Feasibility**: Ensure implementation is realistic given constraints
3. **Enhance Business Value**: Strengthen ROI justification and success metrics
4. **Address Concerns**: Incorporate user feedback and address implementation challenges
5. **Maintain Platform Agnosticism**: Keep recommendations technology-neutral

## Refinement Areas:

- **Workflow Steps**: Make more specific and detailed
- **Governance Checkpoints**: Define clearer approval criteria and escalation paths
- **Risk Mitigation**: Strengthen risk management strategies
- **ROI Calculations**: Provide more detailed and defensible cost/benefit analysis
- **Implementation Plan**: Create more realistic timeline and resource requirements
- **Success Metrics**: Define clearer KPIs and measurement methods

Focus on making the workflow immediately actionable while maintaining the proven "bounded, internal, process-oriented" approach.
`;

export const WORKFLOW_COMPARISON_PROMPT = `
You are comparing multiple agentic workflow recommendations to help a business prioritize implementation. Your analysis should help stakeholders make informed decisions about which workflows to pursue first.

## Comparison Criteria:

1. **Business Impact**: Potential for significant cost savings and efficiency gains
2. **Implementation Complexity**: Technical and organizational challenges
3. **Risk Level**: Operational and reputational risks
4. **Resource Requirements**: Budget, staff, and time needed
5. **Strategic Alignment**: Connection to business priorities
6. **Success Probability**: Likelihood of achieving stated objectives

## Analysis Framework:

### Quick Wins (High Impact, Low Complexity):
- Workflows that can be implemented quickly with immediate results
- Low risk, high confidence of success
- Minimal resource requirements

### Foundation Builders (Medium Impact, Medium Complexity):
- Workflows that build capabilities for future automation
- Moderate risk, good ROI potential
- Reasonable resource requirements

### Transformational (High Impact, High Complexity):
- Workflows that significantly change business operations
- Higher risk, but major competitive advantage potential
- Substantial resource commitment required

Provide a prioritized recommendation with clear rationale for sequencing and resource allocation.
`;

export const generateWorkflowComparisonPrompt = (
    workflows: AgenticWorkflowPattern[], 
    profile: Profile
): string => {
    return `
## Business Context:
**Company:** ${profile.companyName}
**Industry:** ${profile.industry}
**Size:** ${profile.employeeCount || 'Not specified'}

## Workflow Options to Compare:
${workflows.map((workflow, index) => `
### Option ${index + 1}: ${workflow.name}
- **Category:** ${workflow.category}
- **Business Objective:** ${workflow.businessObjective}
- **Complexity Score:** ${workflow.complexityScore}/10
- **Time to Value:** ${workflow.timeToValue}
- **ROI (3-year):** ${workflow.roiMetrics.roi3Year}%
- **Risk Level:** ${workflow.riskAssessment.overallRiskLevel}
`).join('\n')}

## Comparison Request:

Analyze these workflow options and provide:

1. **Prioritization Matrix**: Rank workflows by business impact vs. implementation complexity
2. **Implementation Sequencing**: Recommended order with rationale
3. **Resource Planning**: Budget and timeline requirements for top 3 priorities
4. **Risk Considerations**: Key risks and mitigation strategies for each option
5. **Success Factors**: Critical requirements for each workflow's success

Consider ${profile.companyName}'s strategic initiatives, industry context, and organizational capacity when making recommendations.

Provide specific recommendations for which workflows to implement first, second, and third, with clear business justification for the prioritization.
`;
}; 