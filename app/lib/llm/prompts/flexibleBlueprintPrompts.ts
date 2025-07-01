/**
 * Flexible Blueprint Prompts - Enhanced Quality Version
 * 
 * Generates prompts that guide AI providers toward business-appropriate
 * solutions without enforcing rigid structural requirements.
 * 
 * Philosophy: Guide, don't dictate; trust AI intelligence
 * 
 * ENHANCED FEATURES (January 2025):
 * - Forceful opportunity context integration
 * - Mandatory special instructions enforcement
 * - Specific agent and tool requirement extraction
 * - Strict validation criteria to prevent generic outputs
 * 
 * Created: January 2025
 */

import { Profile } from '../../../services/types';
import { KBPatternDefinition } from '../patterns/kbAlignedPatterns';

export interface FlexiblePromptConfig {
  pattern: KBPatternDefinition;
  profile: Profile;
  opportunityContext?: any;
  specialInstructions?: string;
  includeROI?: boolean;
  modelProvider?: 'openai' | 'claude' | 'gemini';
}

/**
 * Build flexible system prompt that emphasizes guidance over requirements
 */
export function buildFlexibleSystemPrompt(config: FlexiblePromptConfig): string {
  const { pattern, modelProvider } = config;
  
  return `You are an expert AI architect specializing in ${pattern.patternName} implementations for business transformation. Your role is to design intelligent AI agent teams that solve real business problems using the ${pattern.coordinationMechanism} coordination style.

## Core Philosophy
- **Business value over rigid structure**: Design agents that solve the specific business problems
- **Flexible team composition**: Use ${pattern.agentCountGuidance.min}-${pattern.agentCountGuidance.max} agents as appropriate (typically ${pattern.agentCountGuidance.typical})
- **Intelligent coordination**: Ensure agents work together effectively using ${pattern.coordinationMechanism}
- **Appropriate oversight**: Design governance that matches the ${pattern.riskProfile} risk profile

## Pattern Guidance: ${pattern.patternName}
- **Description**: ${pattern.description}
- **Best for**: ${pattern.bestFor.join(', ')}
- **Coordination style**: ${pattern.coordinationMechanism}
- **Scalability path**: ${pattern.scalabilityPath}

## Design Principles
1. **Agent specialization**: Each agent should have a clear, valuable role in solving the business problem
2. **Coordination effectiveness**: Agents must work together smoothly using the pattern's coordination mechanism
3. **Business alignment**: Every design decision should tie back to solving real business problems
4. **Flexible implementation**: Adapt the pattern to fit the specific context, don't force the context to fit the pattern

${getModelSpecificGuidance(modelProvider)}

## Output Requirements
Generate a comprehensive blueprint that includes:
- Clear business objective tied to specific problems
- Well-coordinated agent team (size appropriate to the challenge)
- Sensible human oversight (appropriate to risk level)
- Realistic implementation timeline
- Measurable business improvements

Remember: The goal is an intelligent, business-focused solution, not filling out a template.`;
}

/**
 * Build flexible user prompt focused on business context
 */
export function buildFlexibleUserPrompt(config: FlexiblePromptConfig): string {
  const { pattern, profile, opportunityContext, specialInstructions, includeROI } = config;
  
  let prompt = `Design an AI agent team using the ${pattern.patternName} pattern for the following business context:

## Company Profile
- **Company**: ${profile.companyName}
- **Industry**: ${profile.industry}
- **Size**: ${profile.employeeCount || 'Not specified'} employees
- **Location**: ${profile.primaryLocation || 'Not specified'}

## Business Challenge
`;

  // Add opportunity context if available - ENHANCED: Make this mandatory and specific
  if (opportunityContext) {
    prompt += `
### 🎯 SPECIFIC OPPORTUNITY REQUIREMENTS (MANDATORY)
**Opportunity**: ${opportunityContext.title}

**CRITICAL BUSINESS PROBLEMS TO SOLVE**:
${Array.isArray(opportunityContext.businessProblems) ? 
  opportunityContext.businessProblems.map((problem: string, idx: number) => `${idx + 1}. ${problem}`).join('\n') :
  opportunityContext.description || 'Process automation and optimization'
}

**EXPECTED BUSINESS OUTCOMES**:
${Array.isArray(opportunityContext.expectedOutcomes) ? 
  opportunityContext.expectedOutcomes.map((outcome: string, idx: number) => `${idx + 1}. ${outcome}`).join('\n') :
  `${opportunityContext.primaryMetrics || 'Efficiency and quality improvements'}`
}

**IMPLEMENTATION REQUIREMENTS**:
- Category: ${opportunityContext.category || 'Process Automation'}
- Recommended Pattern: ${opportunityContext.recommendedPattern || pattern.patternName}
- Pattern Rationale: ${opportunityContext.patternRationale || 'Optimal for this use case'}
- Implementation Approach: ${opportunityContext.implementationApproach || 'Phased rollout'}
- Complexity: ${opportunityContext.patternComplexity || 'Medium'}
- Timeframe: ${opportunityContext.timeframe || 'Standard timeline'}

⚠️ **CRITICAL**: Your agent design MUST directly implement these specific business problems and outcomes. Generic agents will not be acceptable.
`;
  }

  // Add strategic initiatives with enhanced focus
  const initiatives = profile.strategicInitiatives || [];
  if (initiatives.length > 0) {
    prompt += `
### 📋 STRATEGIC INITIATIVE CONTEXT
`;
    initiatives.forEach((init, idx) => {
      prompt += `
${idx + 1}. **${init.initiative}** (${init.priority || 'Medium'} priority)
   - **Specific Problems**: ${init.businessProblems?.join(', ') || 'General improvement needed'}
   - **Expected Outcomes**: ${init.expectedOutcomes?.join(', ') || 'Improved performance'}
   - **Contact**: ${init.contact?.name || 'TBD'} (${init.contact?.title || 'TBD'})`;
      
      if (init.processMetrics) {
        prompt += `
   - **Current Performance**: Cycle time ${init.processMetrics.currentCycleTime || 'N/A'}, Error rate ${init.processMetrics.currentErrorRate || 'N/A'}`;
      }
    });
  }

  // Add special instructions with MAXIMUM emphasis
  if (specialInstructions) {
    prompt += `

### 🚨 MANDATORY SPECIAL REQUIREMENTS
${specialInstructions}

**ABSOLUTE REQUIREMENTS**:
- These requirements are MANDATORY and must be implemented exactly as specified
- Every agent you design must align with these special instructions
- Ignore these requirements at your own risk - the blueprint will be rejected if they are not followed
- These requirements should be the PRIMARY driver of your agent design decisions

⚠️ **ENFORCEMENT**: Your response will be validated against these requirements. Non-compliance will result in rejection.`;
  }

  // Enhanced pattern-specific guidance with specific requirements extraction
  prompt += `

## 🎯 PATTERN IMPLEMENTATION REQUIREMENTS

You're using the **${pattern.patternName}** pattern because it's excellent for ${pattern.bestFor[0].toLowerCase()}.

### MANDATORY AGENT REQUIREMENTS
Based on the opportunity context and special instructions above, you MUST design agents that:

${opportunityContext ? `
**FROM OPPORTUNITY CONTEXT**:
${extractSpecificAgentRequirements(opportunityContext, specialInstructions)}
` : ''}

**FROM PATTERN REQUIREMENTS**:
- Design ${pattern.agentCountGuidance.min}-${pattern.agentCountGuidance.max} agents (typically ${pattern.agentCountGuidance.typical} work well)
- Each agent must have a clear role in the ${pattern.coordinationMechanism}
- Size the team based on the complexity of the business challenge
- Implement ${pattern.coordinationMechanism} effectively
- Ensure smooth handoffs and information flow
- Design interactions that support the business workflow

### AGENT NAMING AND SPECIALIZATION REQUIREMENTS
- **NO GENERIC TITLES**: Avoid generic titles like "Process Coordinator", "Data Specialist", "Workflow Manager"
- **SPECIFIC BUSINESS FOCUS**: Each agent title should reflect the specific business domain and function
- **DOMAIN-SPECIFIC TOOLS**: Include tools that are specific to the business problem, not generic automation tools
- **SPECIALIZED RESPONSIBILITIES**: Each agent should have responsibilities that directly map to the business problems listed above

### TOOL AND CAPABILITY REQUIREMENTS
Based on the opportunity context, you must include these specific capabilities:
${extractSpecificToolRequirements(opportunityContext, specialInstructions)}

### Risk & Oversight
- This pattern has ${pattern.riskProfile} risk profile
- Design appropriate human checkpoints (not too many, not too few)
- Include progressive trust as the system proves itself

${includeROI ? `
### ROI Considerations
- Identify specific cost savings opportunities
- Quantify efficiency improvements
- Consider both hard and soft benefits
- Be realistic but compelling in projections
` : ''}

## ✅ SUCCESS CRITERIA (VALIDATION REQUIREMENTS)
Your blueprint will be validated against these criteria:

1. **OPPORTUNITY ALIGNMENT**: Every agent must directly address the specific business problems from the opportunity context
2. **SPECIAL INSTRUCTIONS COMPLIANCE**: All special requirements must be implemented exactly as specified
3. **PATTERN COMPLIANCE**: Uses the ${pattern.patternName} pattern intelligently with proper coordination
4. **AGENT SPECIFICITY**: No generic agent titles or responsibilities - everything must be business-specific
5. **TOOL SPECIFICITY**: Tools must be specific to the business domain and problems, not generic automation tools
6. **BUSINESS VALUE**: Provides clear, measurable business value tied to the specific opportunity

**REJECTION CRITERIA**: Your blueprint will be rejected if it contains:
- Generic agent titles (e.g., "Process Manager", "Data Analyst", "Workflow Coordinator")
- Generic tools (e.g., "Automation Software", "Monitoring Tools", "Dashboard Tools")
- Agents that don't directly address the specific business problems listed above
- Missing capabilities explicitly mentioned in the opportunity context or special instructions

Design a solution that directly implements the specific opportunity requirements, not a generic template.`;

  return prompt;
}

/**
 * Extract specific agent requirements from opportunity context and special instructions
 * 
 * This function analyzes the opportunity context and special instructions to generate
 * mandatory agent requirements that prevent the AI from creating generic solutions.
 * 
 * @param opportunityContext - The AI opportunity context with business problems and outcomes
 * @param specialInstructions - User-provided special requirements and constraints
 * @returns Formatted string with mandatory agent requirements for the AI prompt
 */
function extractSpecificAgentRequirements(opportunityContext: any, specialInstructions?: string): string {
  let requirements = '';
  
  // Extract from business problems
  if (Array.isArray(opportunityContext.businessProblems)) {
    requirements += '\n**REQUIRED AGENT CAPABILITIES FROM BUSINESS PROBLEMS**:\n';
    opportunityContext.businessProblems.forEach((problem: string, idx: number) => {
      requirements += `${idx + 1}. Agent(s) that specifically handle: "${problem}"\n`;
    });
  }
  
  // Extract from special instructions
  if (specialInstructions) {
    requirements += '\n**REQUIRED AGENT CAPABILITIES FROM SPECIAL INSTRUCTIONS**:\n';
    
    // Look for specific agent mentions
    const agentMentions = extractAgentMentions(specialInstructions);
    if (agentMentions.length > 0) {
      agentMentions.forEach((mention, idx) => {
        requirements += `${idx + 1}. ${mention}\n`;
      });
    } else {
      requirements += `- Agents must implement the requirements: "${specialInstructions}"\n`;
    }
  }
  
  // Extract from expected outcomes
  if (Array.isArray(opportunityContext.expectedOutcomes)) {
    requirements += '\n**AGENTS MUST DELIVER THESE OUTCOMES**:\n';
    opportunityContext.expectedOutcomes.forEach((outcome: string, idx: number) => {
      requirements += `${idx + 1}. ${outcome}\n`;
    });
  }
  
  return requirements || '- Agents must address the specific business opportunity described above';
}

/**
 * Extract specific tool requirements from opportunity context and special instructions
 * 
 * This function identifies specific tools and capabilities mentioned in the opportunity
 * context and special instructions, ensuring the AI includes domain-specific tools
 * rather than generic automation tools.
 * 
 * @param opportunityContext - The AI opportunity context with business problems and tech requirements
 * @param specialInstructions - User-provided special requirements mentioning specific tools
 * @returns Formatted string with mandatory tool requirements for the AI prompt
 */
function extractSpecificToolRequirements(opportunityContext: any, specialInstructions?: string): string {
  let requirements = '';
  
  // Look for specific tools mentioned in the opportunity
  const toolMentions = extractToolMentions(opportunityContext, specialInstructions);
  
  if (toolMentions.length > 0) {
    requirements += '\n**REQUIRED SPECIFIC TOOLS AND CAPABILITIES**:\n';
    toolMentions.forEach((tool, idx) => {
      requirements += `${idx + 1}. ${tool}\n`;
    });
  }
  
  // Add AI technologies if specified
  if (opportunityContext.aiTechnologies) {
    requirements += `\n**AI TECHNOLOGIES TO IMPLEMENT**: ${opportunityContext.aiTechnologies}\n`;
  }
  
  return requirements || '- Tools must be specific to the business domain and opportunity requirements';
}

/**
 * Extract agent mentions from special instructions
 * 
 * Parses special instructions to identify specific agent types, roles, or capabilities
 * that the user has explicitly requested. This helps ensure the AI generates agents
 * that match the user's specific requirements rather than generic roles.
 * 
 * @param specialInstructions - User-provided special requirements and constraints
 * @returns Array of agent-related requirements extracted from the instructions
 */
function extractAgentMentions(specialInstructions: string): string[] {
  const mentions: string[] = [];
  
  // Look for agent-related keywords
  const agentKeywords = [
    'agent', 'specialist', 'coordinator', 'manager', 'worker', 'orchestrator',
    'communication', 'stakeholder', 'vendor', 'compliance', 'evaluation',
    'scoring', 'matching', 'processing', 'monitoring'
  ];
  
  // Split by sentences and look for agent-related content
  const sentences = specialInstructions.split(/[.!?]+/);
  
  sentences.forEach(sentence => {
    const lowerSentence = sentence.toLowerCase();
    
    // Look for agent mentions
    if (agentKeywords.some(keyword => lowerSentence.includes(keyword))) {
      const cleanSentence = sentence.trim();
      if (cleanSentence.length > 10) { // Avoid very short fragments
        mentions.push(cleanSentence);
      }
    }
  });
  
  return mentions;
}

/**
 * Extract tool mentions from opportunity and special instructions
 * 
 * Identifies specific tools, algorithms, systems, or technologies mentioned in the
 * opportunity context and special instructions. This prevents the AI from suggesting
 * generic tools by ensuring domain-specific capabilities are included.
 * 
 * @param opportunityContext - The AI opportunity context with business problems and tech mentions
 * @param specialInstructions - User-provided special requirements mentioning specific tools
 * @returns Array of specific tools and technologies to be included in the blueprint
 */
function extractToolMentions(opportunityContext: any, specialInstructions?: string): string[] {
  const mentions: string[] = [];
  
  // Tool-related keywords to look for
  const toolKeywords = [
    'algorithm', 'scoring', 'matching', 'evaluation', 'analysis', 'automation',
    'system', 'platform', 'software', 'tool', 'intelligence', 'monitoring',
    'tracking', 'processing', 'integration', 'workflow'
  ];
  
  // Search in business problems
  if (Array.isArray(opportunityContext.businessProblems)) {
    opportunityContext.businessProblems.forEach((problem: string) => {
      const lowerProblem = problem.toLowerCase();
      if (toolKeywords.some(keyword => lowerProblem.includes(keyword))) {
        // Extract specific tool mentions
        if (lowerProblem.includes('intelligent scoring')) {
          mentions.push('Intelligent Scoring Algorithms');
        }
        if (lowerProblem.includes('requirement matching') || lowerProblem.includes('requirements matching')) {
          mentions.push('Requirements Matching System');
        }
        if (lowerProblem.includes('vendor evaluation')) {
          mentions.push('Advanced Vendor Evaluation Tools');
        }
        if (lowerProblem.includes('compliance monitoring')) {
          mentions.push('Real-time Compliance Monitoring System');
        }
        if (lowerProblem.includes('communication') && lowerProblem.includes('department')) {
          mentions.push('Cross-departmental Communication Platform');
        }
      }
    });
  }
  
  // Search in special instructions
  if (specialInstructions) {
    const lowerInstructions = specialInstructions.toLowerCase();
    if (lowerInstructions.includes('intelligent scoring') || lowerInstructions.includes('scoring algorithm')) {
      mentions.push('Intelligent Scoring Algorithms');
    }
    if (lowerInstructions.includes('stakeholder communication')) {
      mentions.push('Stakeholder Communication Tools');
    }
    if (lowerInstructions.includes('vendor matching')) {
      mentions.push('Advanced Vendor Matching System');
    }
  }
  
  return [...new Set(mentions)]; // Remove duplicates
}

/**
 * Get model-specific guidance for better results
 */
function getModelSpecificGuidance(provider?: string): string {
  switch (provider) {
    case 'claude':
      return `
## Claude Optimization
- Use your extended thinking capability to deeply consider business implications
- Design agents that showcase sophisticated reasoning and coordination
- Focus on nuanced solutions that adapt to the specific context`;
      
    case 'gemini':
      return `
## Gemini Optimization
- Leverage your adaptive thinking to explore creative agent designs
- Consider multiple coordination approaches before settling on the best
- Use your broad knowledge to suggest innovative tools and integrations`;
      
    case 'openai':
      return `
## GPT Optimization
- Apply your structured reasoning to create well-organized agent teams
- Use your extensive training to suggest industry-appropriate tools
- Design clear, implementable solutions with good documentation`;
      
    default:
      return `
## AI Provider Optimization
- Use your full capabilities to design intelligent solutions
- Don't be constrained by rigid templates or structures
- Focus on solving the business problem effectively`;
  }
}

/**
 * Build a validation-friendly response template
 * This provides structure without being prescriptive
 */
export function buildResponseTemplate(pattern: KBPatternDefinition): string {
  return `{
  "businessObjective": "Clear, measurable objective that addresses the specific business challenge",
  "selectedPattern": "${pattern.patternName}",
  "patternRationale": "Brief explanation of why ${pattern.patternName} is ideal for this specific situation",
  "digitalTeam": [
    // Include ${pattern.agentCountGuidance.min}-${pattern.agentCountGuidance.max} agents as appropriate
    // Each agent should support the ${pattern.coordinationMechanism}
    {
      "role": "descriptive-role-name",
      "title": "Business-friendly title",
      "coreJob": "What this agent primarily does",
      "responsibilities": ["List of", "specific", "valuable", "responsibilities"],
      "toolsUsed": ["Appropriate tools", "for the role", "and context"],
      "oversightLevel": "human-approval | policy-checked | full-autonomy",
      "oversightDescription": "How humans maintain appropriate control",
      "linkedKPIs": ["Metrics this", "agent impacts"],
      "interactionPatterns": ["How agent", "coordinates with others"]
    }
  ],
  "humanCheckpoints": [
    // Include appropriate checkpoints for ${pattern.riskProfile} risk
    // Not too many (bureaucratic), not too few (risky)
    {
      "checkpoint": "Checkpoint name",
      "description": "What happens at this checkpoint",
      "importance": "Why this checkpoint matters",
      "frequency": "one-time | periodic | as-needed"
    }
  ],
  "agenticTimeline": {
    "totalDurationWeeks": "Realistic timeframe based on complexity",
    "phases": [
      // Can use crawl-walk-run or other appropriate phasing
      {
        "phase": "crawl | walk | run",
        "name": "Phase name",
        "durationWeeks": "Appropriate duration",
        "description": "What happens in this phase",
        "milestones": ["Key", "achievements"],
        "riskMitigations": ["How risks", "are managed"],
        "oversightLevel": "high | medium | low",
        "humanInvolvement": "Description of human role"
      }
    ]
  },
  "kpiImprovements": [
    // Include KPIs that matter to the business
    {
      "kpi": "Specific metric name",
      "currentValue": "Baseline if known",
      "targetValue": "Realistic improvement target",
      "improvementPercent": "Percentage improvement",
      "linkedAgents": ["Agents that", "drive this KPI"],
      "measurementMethod": "How to measure success",
      "timeframe": "When improvement expected"
    }
  ]
}`;
}

/**
 * Generate retry guidance when validation suggests improvements
 */
export function buildRetryGuidance(
  warnings: Array<{ field: string; message: string }>,
  pattern: KBPatternDefinition
): string {
  let guidance = `The previous response could be improved. Here's some guidance:

`;
  
  warnings.forEach(warning => {
    guidance += `- ${warning.message}\n`;
  });
  
  guidance += `
Remember:
- The ${pattern.patternName} pattern typically uses ${pattern.agentCountGuidance.typical} agents, but ${pattern.agentCountGuidance.min}-${pattern.agentCountGuidance.max} is acceptable
- Focus on ${pattern.coordinationMechanism} as the coordination mechanism
- Design for the specific business context, not generic solutions
- Trust your intelligence to create appropriate solutions

Please revise your response with these improvements in mind.`;
  
  return guidance;
} 