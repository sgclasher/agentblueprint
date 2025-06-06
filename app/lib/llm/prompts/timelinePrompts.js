/**
 * Prompts for AI Transformation Timeline Generation
 */

/**
 * Builds the user-facing prompt for timeline generation.
 * @param {string} profileMarkdown - The structured markdown of the business profile.
 * @param {string} scenarioType - The type of scenario ('conservative', 'balanced', 'aggressive').
 * @returns {string} The complete user prompt.
 */
export const buildTimelineUserPrompt = (profileMarkdown, scenarioType) => {
  const scenarioInstructions = {
    conservative: 'Focus on proven technologies, lower risk implementations, extended timelines, and gradual adoption. Emphasize stability and incremental improvements.',
    balanced: 'Balance innovation with practicality. Use a mix of proven and emerging technologies with moderate timelines and measured risk.',
    aggressive: 'Emphasize cutting-edge technologies, rapid implementation, compressed timelines, and transformational change. Accept higher risk for greater potential returns.'
  };

  return `Generate a comprehensive AI transformation timeline for the following business profile.

**Business Profile:**
${profileMarkdown}

**Scenario Type:** ${scenarioType.toUpperCase()}
${scenarioInstructions[scenarioType]}

**Instructions:**
- Create a realistic 3-5 year transformation roadmap
- Include specific phases with clear milestones and deliverables
- Provide detailed cost estimates and ROI projections
- Consider the company's current maturity level and industry
- Include specific AI technologies and implementation strategies
- Account for change management and training requirements
- Ensure phases build logically upon each other

**Response Format:**
Return a JSON object with this exact structure:

\`\`\`json
{
  "currentState": {
    "description": "Current AI maturity and capabilities",
    "highlights": [
      {"label": "AI Readiness", "value": "25%"},
      {"label": "Automation Level", "value": "15%"},
      {"label": "Data Maturity", "value": "30%"}
    ]
  },
  "phases": [
    {
      "title": "Foundation Phase",
      "description": "Brief phase description",
      "duration": "6 months",
      "initiatives": [
        {
          "title": "Initiative Name",
          "description": "What this initiative accomplishes",
          "impact": "Business impact description"
        }
      ],
      "technologies": ["Technology 1", "Technology 2"],
      "outcomes": [
        {
          "metric": "Efficiency Gain",
          "value": "25%",
          "description": "Detailed outcome description"
        }
      ],
      "highlights": [
        {"label": "ROI", "value": "150%"},
        {"label": "Time to Value", "value": "3 months"}
      ]
    }
  ],
  "futureState": {
    "description": "Vision of the transformed organization",
    "highlights": [
      {"label": "AI Integration", "value": "95%"},
      {"label": "Automation Level", "value": "80%"},
      {"label": "Revenue Impact", "value": "+45%"}
    ]
  },
  "summary": {
    "totalInvestment": "$2.5M - $4.2M",
    "expectedROI": "425% over 3 years",
    "timeToValue": "6-9 months",
    "riskLevel": "Medium"
  }
}
\`\`\``;
};

/**
 * Gets the system prompt for the AI transformation consultant role.
 * @returns {string} The system prompt.
 */
export const getTimelineSystemPrompt = () => {
  return `You are an expert AI transformation consultant with deep expertise in enterprise AI adoption strategies. You create detailed, actionable transformation roadmaps that consider:

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

Always respond with valid JSON that matches the exact structure specified in the user prompt.`;
}; 