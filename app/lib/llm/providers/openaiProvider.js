'use client';

/**
 * OpenAI Provider for Timeline Generation
 * 
 * Implements the LLM provider interface for generating AI transformation timelines
 * using OpenAI's GPT-4o model with structured prompts and JSON response formatting.
 */

export class OpenAIProvider {
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
      console.error('OpenAI Provider Error:', error);
      throw new Error(`Failed to generate timeline: ${error.message}`);
    }
  }

  /**
   * Get the system prompt that defines the AI's role and output format
   */
  getSystemPrompt() {
    return `You are an expert AI transformation consultant who creates detailed, personalized AI adoption roadmaps for businesses. You analyze client profiles and generate comprehensive transformation timelines.

Your role:
- Analyze the provided client profile data comprehensively
- Create realistic, actionable AI transformation roadmaps
- Tailor recommendations to the specific industry, company size, and maturity level
- Provide specific initiatives, technologies, and ROI projections
- Consider the chosen scenario (conservative, balanced, aggressive) for pacing and risk

You MUST respond with valid JSON in this exact structure:
{
  "currentState": {
    "description": "string",
    "initiatives": [{"title": "string", "description": "string", "impact": "string"}],
    "technologies": ["string"],
    "outcomes": [{"metric": "string", "value": "string", "description": "string"}]
  },
  "phases": [
    {
      "description": "string",
      "highlights": [{"label": "string", "value": "string"}],
      "initiatives": [{"title": "string", "description": "string", "impact": "string"}],
      "technologies": ["string"],
      "outcomes": [{"metric": "string", "value": "string", "description": "string"}]
    }
  ],
  "futureState": {
    "description": "string",
    "highlights": [{"label": "string", "value": "string"}],
    "initiatives": [{"title": "string", "description": "string", "impact": "string"}],
    "technologies": ["string"],
    "outcomes": [{"metric": "string", "value": "string", "description": "string"}]
  },
  "summary": {
    "totalInvestment": "string",
    "expectedROI": "string",
    "timeToValue": "string",
    "riskLevel": "string"
  }
}

Key guidelines:
- Always include exactly 4 phases (Foundation, Implementation, Expansion, Optimization)
- Base recommendations on actual profile data, not generic advice
- Use specific metrics and realistic investment ranges
- Tailor technology recommendations to company size and industry
- Consider existing problems and opportunities mentioned in the profile
- Factor in strategic initiatives and decision maker information
- Provide actionable, specific initiatives with measurable impacts`;
  }

  /**
   * Build the specific prompt for timeline generation
   */
  buildTimelinePrompt(profileMarkdown, scenarioType) {
    const scenarioGuidance = {
      conservative: {
        description: 'Conservative approach: Lower risk, proven technologies, extended timelines, gradual adoption',
        characteristics: [
          'Longer implementation phases (6-9 months each)',
          'Focus on proven, stable technologies',
          'Lower investment amounts ($250K-3M total)',
          'ROI targets: 200-350%',
          'Risk-averse technology choices',
          'Emphasis on change management and training'
        ]
      },
      balanced: {
        description: 'Balanced approach: Moderate risk/reward, mainstream technologies, standard timelines',
        characteristics: [
          'Standard implementation phases (4-6 months each)',
          'Mix of proven and emerging technologies',
          'Moderate investment amounts ($500K-8M total)',
          'ROI targets: 350-500%',
          'Balanced risk profile',
          'Strategic focus on both quick wins and transformation'
        ]
      },
      aggressive: {
        description: 'Aggressive approach: Higher risk/reward, cutting-edge technologies, accelerated timelines',
        characteristics: [
          'Compressed implementation phases (3-4 months each)',
          'Latest and emerging technologies',
          'Higher investment amounts ($1M-15M total)',
          'ROI targets: 500-800%',
          'Acceptance of higher risk for competitive advantage',
          'Focus on innovation and market leadership'
        ]
      }
    };

    const scenario = scenarioGuidance[scenarioType] || scenarioGuidance.balanced;

    return `Please analyze the following client profile and create a detailed AI transformation timeline using the ${scenarioType.toUpperCase()} scenario approach.

SCENARIO: ${scenario.description}

Scenario Characteristics:
${scenario.characteristics.map(char => `- ${char}`).join('\n')}

CLIENT PROFILE:
${profileMarkdown}

REQUIREMENTS:
1. Analyze the client's current state, industry, size, and specific challenges
2. Create a 4-phase transformation roadmap (Foundation → Implementation → Expansion → Optimization)
3. Tailor all recommendations to their specific industry and business context
4. Reference their specific problems, opportunities, and strategic initiatives
5. Consider their decision makers and budget constraints
6. Provide realistic timelines, investments, and ROI projections for the ${scenarioType} scenario
7. Include specific technologies appropriate for their industry and maturity level
8. Make all initiatives actionable and measurable

Respond with valid JSON only, following the exact structure specified in the system prompt.`;
  }

  /**
   * Validate the timeline response structure
   */
  validateTimelineResponse(timeline) {
    const requiredFields = ['currentState', 'phases', 'futureState', 'summary'];
    
    for (const field of requiredFields) {
      if (!timeline[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (!Array.isArray(timeline.phases) || timeline.phases.length !== 4) {
      throw new Error('Timeline must contain exactly 4 phases');
    }

    // Validate each phase has required structure
    timeline.phases.forEach((phase, index) => {
      if (!phase.description || !phase.initiatives || !phase.technologies || !phase.outcomes) {
        throw new Error(`Phase ${index + 1} missing required fields`);
      }
    });

    // Validate summary has required fields
    const summaryFields = ['totalInvestment', 'expectedROI', 'timeToValue', 'riskLevel'];
    for (const field of summaryFields) {
      if (!timeline.summary[field]) {
        throw new Error(`Summary missing required field: ${field}`);
      }
    }
  }

  /**
   * Generate insights from profile data (future enhancement)
   * @param {string} profileMarkdown - Structured markdown from profile data
   * @returns {Promise<Object>} Generated insights
   */
  async generateInsights(profileMarkdown) {
    // Future implementation for profile enrichment
    throw new Error('generateInsights not yet implemented');
  }
} 