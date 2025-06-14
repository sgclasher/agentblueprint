import { Profile } from "../../../services/types";

export const AI_OPPORTUNITIES_SYSTEM_PROMPT = `You are a senior AI transformation consultant with deep expertise in agentic AI technologies, business process optimization, and strategic implementation. Your specialized knowledge includes the latest developments in autonomous AI agents, intelligent automation, and enterprise AI applications across all industries.

EXPERTISE AREAS:
- Agentic AI Systems: Multi-agent workflows, autonomous decision-making, intelligent orchestration
- Process Intelligence: Business process analysis, bottleneck identification, automation opportunity mapping  
- Industry Applications: Sector-specific AI use cases, regulatory considerations, implementation patterns
- ROI Analysis: Financial modeling, investment planning, risk assessment, value realization timelines
- Technology Assessment: AI readiness evaluation, system integration, scalability considerations

CURRENT AGENTIC AI LANDSCAPE (2024-2025):
- **Proven ROI Patterns**: $3.50 return per $1 invested within 14-month payback period
- **Enterprise Adoption**: 73% of organizations planning significant AI investments
- **Technology Maturity**: Autonomous agents, multi-modal AI, real-time decision systems
- **Integration Capabilities**: Seamless API connectivity, low-code platforms, enterprise workflows

KEY AGENTIC AI CATEGORIES FOR ANALYSIS:

1. **INTELLIGENT PROCESS ORCHESTRATION**
   - Multi-step workflow automation with decision points
   - Cross-system data orchestration and validation
   - Exception handling and escalation management
   - ROI: 250-400% within 18 months

2. **AUTONOMOUS DECISION AGENTS**
   - Real-time business rule execution
   - Predictive decision-making with confidence scoring
   - Dynamic resource allocation and optimization
   - ROI: 180-300% within 12 months

3. **COGNITIVE CUSTOMER EXPERIENCE**
   - Conversational AI with business context awareness
   - Proactive customer success management
   - Omnichannel experience orchestration
   - ROI: 200-350% within 15 months

4. **INTELLIGENT DATA OPERATIONS**
   - Automated data pipeline management
   - Real-time analytics and insight generation
   - Predictive modeling and forecasting
   - ROI: 300-500% within 24 months

5. **ADAPTIVE WORKFORCE AUGMENTATION**
   - AI-powered productivity tools and assistants
   - Intelligent task routing and workload balancing
   - Skill-based automation and training recommendations
   - ROI: 220-380% within 18 months

6. **PROACTIVE RISK & COMPLIANCE**
   - Continuous monitoring and threat detection
   - Automated compliance validation and reporting
   - Predictive risk assessment and mitigation
   - ROI: 150-250% within 12 months

INDUSTRY-SPECIFIC OPTIMIZATION PATTERNS:

**Technology**: Development acceleration, DevOps automation, intelligent operations, code generation, testing automation
**Healthcare**: Clinical workflow optimization, patient experience, regulatory compliance, diagnostic support, population health
**Manufacturing**: Predictive maintenance, quality control, supply chain optimization, production planning, safety management
**Finance**: Risk assessment, fraud detection, regulatory compliance, customer onboarding, portfolio optimization
**Retail**: Demand forecasting, inventory optimization, personalization, omnichannel integration, supply chain visibility
**Education**: Personalized learning, administrative automation, student success prediction, resource optimization
**Energy**: Grid optimization, predictive maintenance, demand forecasting, sustainability initiatives, asset management
**Transportation**: Route optimization, fleet management, safety systems, logistics automation, maintenance planning

ANALYSIS METHODOLOGY:
1. **Business Context Assessment**: Industry dynamics, company maturity, competitive positioning
2. **Problem-Solution Mapping**: Specific business problems to proven AI capabilities
3. **Technical Feasibility**: System integration requirements, data readiness, infrastructure needs
4. **Financial Modeling**: Investment requirements, ROI projections, payback timelines
5. **Implementation Planning**: Complexity assessment, risk factors, success prerequisites
6. **Strategic Alignment**: Alignment with business objectives, stakeholder benefits, change impact

OUTPUT REQUIREMENTS:
- Generate comprehensive AI opportunity analysis based on client profile data
- Provide specific, actionable recommendations with clear business impact
- Include realistic ROI estimates based on proven industry patterns
- Consider implementation complexity and organizational readiness
- Focus on practical, achievable solutions with measurable outcomes
- Align recommendations with stated strategic initiatives and business problems

TONE & APPROACH:
- Professional, consultative, and strategic
- Data-driven with specific metrics and projections
- Practical focus on implementable solutions
- Balanced view of opportunities and challenges
- Industry-aware and context-sensitive`;

export const AI_OPPORTUNITIES_USER_PROMPT = (profile: Profile): string => `Analyze the following client profile and generate a comprehensive AI opportunities assessment. Focus on identifying specific agentic AI solutions that align with their strategic initiatives, address their business problems, and leverage their existing systems infrastructure.

CLIENT PROFILE:
---
Company: ${profile.companyName}
Industry: ${profile.industry}
Size: ${profile.employeeCount || 'Not specified'} employees
Revenue: ${profile.annualRevenue || 'Not specified'}
Location: ${profile.primaryLocation || 'Not specified'}
Website: ${profile.websiteUrl || 'Not specified'}

STRATEGIC INITIATIVES:
${(profile.strategicInitiatives || []).map((initiative, index) => `
${index + 1}. ${initiative.initiative}
   - Contact: ${initiative.contact?.name || 'Not specified'} (${initiative.contact?.title || 'Not specified'})
   - Priority: ${initiative.priority || 'Not specified'}
   - Status: ${initiative.status || 'Not specified'}
   - Timeline: ${initiative.targetTimeline || 'Not specified'}
   - Budget: ${initiative.estimatedBudget || 'Not specified'}
   - Business Problems: ${(initiative.businessProblems || []).length > 0 ? initiative.businessProblems.join('; ') : 'None specified'}
   - Expected Outcomes: ${(initiative.expectedOutcomes && initiative.expectedOutcomes.length > 0) ? initiative.expectedOutcomes.join('; ') : 'None specified'}
   - Success Metrics: ${(initiative.successMetrics && initiative.successMetrics.length > 0) ? initiative.successMetrics.join('; ') : 'None specified'}
`).join('')}

SYSTEMS & APPLICATIONS:
${(profile.systemsAndApplications || []).map((system, index) => `
${index + 1}. ${system.name} (${system.category})
   - Vendor: ${system.vendor || 'Not specified'}
   - Version: ${system.version || 'Not specified'}
   - Criticality: ${system.criticality || 'Not specified'}
   - Description: ${system.description || 'Not specified'}
`).join('')}
---

ANALYSIS REQUIREMENTS:

1. **EXECUTIVE SUMMARY** (3-4 sentences)
   - Overall AI transformation potential and readiness assessment
   - Key opportunity areas with highest business impact
   - Estimated ROI range and implementation timeline

2. **TOP 3-5 AI OPPORTUNITIES** (for each opportunity include):
   - **Title**: Specific, actionable opportunity name
   - **Description**: Detailed explanation of the AI solution and how it addresses business needs
   - **Category**: One of - Process Automation, Decision Support, Customer Experience, Data Analytics, Workforce Augmentation, Risk Management
   - **Business Impact**:
     * Primary metrics (3-4 specific, measurable outcomes)
     * Estimated ROI percentage and timeframe
     * Time to value (months to see initial benefits)
     * Confidence level (High/Medium/Low)
   - **Implementation**:
     * Complexity (Low/Medium/High)
     * Implementation timeframe
     * Key prerequisites
     * Main risk factors
   - **Relevant Initiatives**: Which strategic initiatives this opportunity supports
   - **AI Technologies**: Specific AI/ML technologies involved

3. **PRIORITY RECOMMENDATIONS** (3-5 bullet points)
   - Immediate next steps for highest-impact opportunities
   - Strategic guidance for implementation sequencing
   - Key success factors and risk mitigation strategies

4. **INDUSTRY CONTEXT** (2-3 sentences)
   - Industry-specific AI adoption trends and best practices
   - Competitive advantages available through AI implementation
   - Regulatory or compliance considerations

5. **READINESS SCORE** (0-100)
   - Overall AI readiness assessment based on initiatives, problems, systems, and company profile
   - Justify the score with key factors

6. **NEXT STEPS** (4-6 action items)
   - Specific, actionable recommendations for beginning AI transformation
   - Consider organizational readiness level and recommended preparation activities
   - Include both immediate actions and strategic planning recommendations

Focus on opportunities that:
- Directly address identified business problems
- Align with stated strategic initiatives and expected outcomes
- Leverage existing systems and infrastructure where possible
- Provide clear, measurable ROI within 12-24 months
- Are realistic given the company size and industry context
- Incorporate latest agentic AI capabilities and proven success patterns

CRITICAL: You must return ONLY a valid JSON object with this exact structure:

{
  "executiveSummary": "3-4 sentence summary of AI transformation potential...",
  "opportunities": [
    {
      "title": "Specific opportunity name",
      "description": "Detailed explanation of the AI solution...",
      "category": "Process Automation",
      "businessImpact": {
        "primaryMetrics": ["Metric 1", "Metric 2", "Metric 3"],
        "estimatedROI": "250-400% within 18 months",
        "timeToValue": "3-6 months",
        "confidenceLevel": "High"
      },
      "implementation": {
        "complexity": "Medium",
        "timeframe": "4-8 months",
        "prerequisites": ["Prerequisite 1", "Prerequisite 2"],
        "riskFactors": ["Risk 1", "Risk 2"]
      },
      "relevantInitiatives": ["Initiative name 1", "Initiative name 2"],
      "aiTechnologies": ["RPA", "Machine Learning", "NLP"]
    }
  ],
  "priorityRecommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3"
  ],
  "industryContext": "2-3 sentences about industry-specific AI trends...",
  "overallReadinessScore": 85,
  "nextSteps": [
    "Action item 1",
    "Action item 2",
    "Action item 3",
    "Action item 4"
  ]
}

Do not include any text before or after the JSON. Return only valid JSON.`;

interface AIOpportunity {
    title: string;
    description: string;
    category: string;
    businessImpact: {
        primaryMetrics: string[];
        estimatedROI: string;
        timeToValue: string;
        confidenceLevel: string;
    };
    implementation: {
        complexity: string;
        timeframe: string;
        prerequisites: string[];
        riskFactors: string[];
    };
    relevantInitiatives: string[];
    aiTechnologies: string[];
}

interface AIOpportunitiesResponse {
    executiveSummary: string;
    opportunities: AIOpportunity[];
    priorityRecommendations: string[];
    industryContext: string;
    overallReadinessScore: number;
    nextSteps: string[];
}

export const validateAIOpportunitiesResponse = (response: AIOpportunitiesResponse): string[] => {
  const warnings: string[] = [];
  
  if (!response.executiveSummary || response.executiveSummary.length < 200) {
    warnings.push('Executive summary should be comprehensive (200+ characters)');
  }
  
  if (!response.opportunities || response.opportunities.length < 2) {
    warnings.push('Should identify at least 2-3 meaningful AI opportunities');
  }
  
  if (response.opportunities) {
    response.opportunities.forEach((opp, index) => {
      if (!opp.title || !opp.description || !opp.category) {
        warnings.push(`Opportunity ${index + 1} missing required fields`);
      }
      
      if (!opp.businessImpact?.estimatedROI || !opp.businessImpact?.timeToValue) {
        warnings.push(`Opportunity ${index + 1} missing business impact metrics`);
      }
    });
  }
  
  if (!response.overallReadinessScore || response.overallReadinessScore < 0 || response.overallReadinessScore > 100) {
    warnings.push('Readiness score should be between 0-100');
  }
  
  return warnings;
}; 