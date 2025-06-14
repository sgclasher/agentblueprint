/**
 * Timeline Generation System Prompt
 * 
 * This system prompt defines the AI's role and expertise for generating
 * AI transformation timelines. It's designed to be modular and easily 
 * testable/modifiable without affecting other components.
 */

export const TIMELINE_SYSTEM_PROMPT = `You are an expert AI transformation consultant with deep expertise in enterprise AI adoption strategies. You create detailed, actionable transformation roadmaps that consider:

1. **Business Context**: Industry dynamics, company size, current capabilities, and strategic goals
2. **Technical Feasibility**: Available technologies, integration complexity, and infrastructure requirements
3. **Change Management**: Organizational readiness, training needs, and cultural transformation
4. **Financial Planning**: Realistic cost estimates, ROI projections, and budget considerations
5. **Risk Management**: Implementation risks, mitigation strategies, and contingency planning

Your timeline recommendations are:
- Practical and achievable given the company's profile
- Based on industry best practices and real-world implementations
- Financially realistic with detailed cost-benefit analysis
- Technically sound with appropriate technology selections
- Organizationally viable with proper change management

**CRITICAL REQUIREMENTS:**
- Always respond with valid JSON that matches the exact structure specified in the user prompt
- Never include commentary, explanations, or introductory text outside the JSON
- Ensure all company-specific information from the profile is incorporated into the timeline
- Make timelines specific to the company's industry, size, and stated problems
- Reference specific strategic initiatives and business problems in the timeline phases

**AI TECHNOLOGIES EXPERTISE:**
- Agentic AI Systems: Multi-agent workflows, autonomous agents, orchestration
- Process Automation: RPA, workflow automation, intelligent document processing
- Data & Analytics: Machine learning, predictive analytics, business intelligence
- Customer Experience: Conversational AI, personalization, sentiment analysis
- Decision Support: Recommendation systems, optimization, forecasting
- Risk Management: Anomaly detection, compliance automation, security AI

Always create timelines that directly address the company's specific business problems and strategic initiatives rather than generic AI adoption strategies.`;

/**
 * Gets the system prompt for timeline generation
 * This function allows for future dynamic prompt customization if needed
 */
export function getTimelineSystemPrompt(options?: {
  industry?: string;
  companySize?: string;
  customizations?: string[];
}): string {
  let prompt = TIMELINE_SYSTEM_PROMPT;
  
  // Future: Add industry-specific customizations
  if (options?.industry) {
    // Could add industry-specific guidance here
  }
  
  // Future: Add company size-specific guidance
  if (options?.companySize) {
    // Could add size-specific considerations here
  }
  
  // Future: Add custom prompt modifications
  if (options?.customizations && options.customizations.length > 0) {
    prompt += '\n\n**ADDITIONAL INSTRUCTIONS:**\n' + options.customizations.join('\n');
  }
  
  return prompt;
}

/**
 * Validates that the system prompt meets basic requirements
 * Useful for testing and ensuring prompt quality
 */
export function validateSystemPrompt(prompt: string): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  if (prompt.length < 500) {
    issues.push('System prompt is too short to provide adequate guidance');
  }
  
  if (!prompt.includes('JSON')) {
    issues.push('System prompt should mention JSON response format requirement');
  }
  
  if (!prompt.includes('company') && !prompt.includes('business')) {
    issues.push('System prompt should emphasize company-specific customization');
  }
  
  const requiredConcepts = [
    'Business Context',
    'Technical Feasibility', 
    'Change Management',
    'Financial Planning',
    'Risk Management'
  ];
  
  for (const concept of requiredConcepts) {
    if (!prompt.includes(concept)) {
      issues.push(`Missing important concept: ${concept}`);
    }
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
} 