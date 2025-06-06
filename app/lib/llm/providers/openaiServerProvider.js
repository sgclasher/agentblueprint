/**
 * OpenAI Server Provider for Timeline Generation
 * 
 * Server-side implementation of the LLM provider interface for generating 
 * AI transformation timelines using OpenAI's GPT-4o model.
 * This version is designed to work in server-side API routes.
 */

export class OpenAIServerProvider {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.baseUrl = 'https://api.openai.com/v1';
    this.model = 'gpt-4o';
    
    if (!this.apiKey) {
      throw new Error('OpenAI API key not found. Set OPENAI_API_KEY environment variable.');
    }
  }

  /**
   * Generate AI transformation timeline from profile markdown
   * @param {string} profileMarkdown - Structured markdown from profile data
   * @param {string} scenarioType - 'conservative', 'balanced', or 'aggressive'
   * @returns {Promise<Object>} Generated timeline data
   */
  async generateTimeline(profileMarkdown, scenarioType = 'balanced') {
    try {
      const prompt = this.buildTimelinePrompt(profileMarkdown, scenarioType);
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: this.getSystemPrompt()
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 4000,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(`OpenAI API error: ${response.status} - ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from OpenAI API');
      }

      // Parse and validate the JSON response
      const timeline = JSON.parse(content);
      this.validateTimelineResponse(timeline);
      
      return timeline;
      
    } catch (error) {
      console.error('OpenAI Server Provider Error:', error);
      throw new Error(`Failed to generate timeline: ${error.message}`);
    }
  }

  /**
   * Build the prompt for timeline generation
   */
  buildTimelinePrompt(profileMarkdown, scenarioType) {
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
  }

  /**
   * Get the system prompt for timeline generation
   */
  getSystemPrompt() {
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
  }

  /**
   * Validate the timeline response structure
   */
  validateTimelineResponse(timeline) {
    const requiredFields = ['currentState', 'phases', 'futureState', 'summary'];
    
    for (const field of requiredFields) {
      if (!timeline[field]) {
        throw new Error(`Invalid timeline response: missing ${field}`);
      }
    }

    if (!Array.isArray(timeline.phases)) {
      throw new Error('Invalid timeline response: phases must be an array');
    }

    if (timeline.phases.length === 0) {
      throw new Error('Invalid timeline response: timeline must contain at least one phase');
    }

    // Validate each phase has required structure
    timeline.phases.forEach((phase, index) => {
      if (!phase.description) {
        throw new Error(`Phase ${index + 1} missing description`);
      }
      if (!phase.initiatives || !Array.isArray(phase.initiatives)) {
        throw new Error(`Phase ${index + 1} missing or invalid initiatives`);
      }
    });

    // Validate summary has required fields
    const summaryFields = ['totalInvestment', 'expectedROI', 'timeToValue', 'riskLevel'];
    for (const field of summaryFields) {
      if (!timeline.summary[field]) {
        throw new Error(`Timeline summary missing ${field}`);
      }
    }
  }
} 