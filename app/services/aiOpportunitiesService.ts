import { Profile, StrategicInitiative, SystemApplication, AIOpportunity } from './types';

// Re-export for backward compatibility
export type { AIOpportunity };

export interface AIOpportunitiesAnalysis {
  executiveSummary: string;
  opportunities: AIOpportunity[];
  priorityRecommendations: string[];
  industryContext: string;
  overallReadinessScore: number;
  nextSteps: string[];
  generatedAt: string;
  analysisMetadata: {
    initiativeCount: number;
    problemCount: number;
    systemCount: number;
    industryFocus: string;
    companySize: string;
  };
}

/**
 * AI Opportunities Analysis Service
 * 
 * This service analyzes client profile data to generate tailored AI opportunity
 * recommendations based on strategic initiatives, business problems, existing systems,
 * and industry context. Leverages current agentic AI knowledge and proven ROI patterns.
 */
export class AIOpportunitiesService {
  
  /**
   * Analyze opportunities for a profile using AI service
   * @param profile - Client profile data
   * @param userId - User ID for authentication
   * @param credentialsRepo - Credentials repository
   * @param preferredProvider - AI provider preference
   * @returns AI-generated opportunities analysis
   */
  static async analyzeOpportunities(
    profile: Profile, 
    userId: string, 
    credentialsRepo: any, 
    preferredProvider?: string
  ): Promise<AIOpportunitiesAnalysis> {
    if (!profile) {
      throw new Error('Profile is required for analysis');
    }

    // Check if AI service is configured
    const { aiService } = await import('./aiService');
    const isConfigured = await aiService.isConfigured(userId, credentialsRepo, preferredProvider);
    
    if (!isConfigured) {
      throw new Error('No AI provider configured. Please configure an AI provider in admin settings.');
    }

    // Import prompts
    const { AI_OPPORTUNITIES_SYSTEM_PROMPT, AI_OPPORTUNITIES_USER_PROMPT, validateAIOpportunitiesResponse } = 
      await import('../lib/llm/prompts/aiOpportunitiesPrompt');

    // Generate AI analysis
    const systemPrompt = AI_OPPORTUNITIES_SYSTEM_PROMPT;
    const userPrompt = AI_OPPORTUNITIES_USER_PROMPT(profile);

    try {
      const aiResponse = await aiService.generateJson(
        systemPrompt,
        userPrompt,
        userId,
        credentialsRepo,
        preferredProvider
      );

      // Validate response
      const warnings = validateAIOpportunitiesResponse(aiResponse);
      if (warnings && warnings.length > 0) {
        console.warn('AI response validation warnings:', warnings);
        if (warnings.some((w: string) => w.includes('Missing executiveSummary') || w.includes('missing required fields'))) {
          throw new Error('Invalid AI response structure: missing required fields');
        }
      }

      return aiResponse;
    } catch (error: any) {
      console.error('AI opportunities analysis failed:', error);
      throw error;
    }
  }

  /**
   * Get agentic pattern recommendation for an opportunity category
   * @param category - Opportunity category
   * @returns Agentic pattern recommendation
   */
  static getAgenticPatternForCategory(category: string): {
    recommendedPattern: string;
    patternRationale: string;
    implementationApproach: string;
    patternComplexity: 'Low' | 'Medium' | 'High';
  } {
    const patternMap: Record<string, any> = {
      'Process Automation': {
        recommendedPattern: 'Manager-Workers',
        patternRationale: 'Selected for process automation because it provides central coordination of standardized tasks with clear task delegation to specialist agents, ensuring quality control and audit trails.',
        implementationApproach: 'Deploy a coordinator agent to manage workflow orchestration with specialist worker agents for each process step (data extraction, validation, processing, and output).',
        patternComplexity: 'Medium'
      },
      'Decision Support': {
        recommendedPattern: 'Hierarchical-Planning',
        patternRationale: 'Chosen for decision support due to the need for multi-layer analysis and validation before high-stakes decisions, ensuring comprehensive evaluation and risk assessment.',
        implementationApproach: 'Implement multiple analyst layers with strategic planner, tactical analysts, and validation agents working together to provide comprehensive decision intelligence.',
        patternComplexity: 'High'
      },
      'Customer Experience': {
        recommendedPattern: 'Blackboard-Shared-Memory',
        patternRationale: 'Selected for customer experience because it enables real-time event handling and coordinated response across multiple touchpoints, ensuring seamless omnichannel experience.',
        implementationApproach: 'Create a shared context board where customer events trigger multiple specialized agents (support, personalization, escalation) to collaborate in real-time.',
        patternComplexity: 'Medium'
      },
      'Data Analytics': {
        recommendedPattern: 'Plan-Act-Reflect',
        patternRationale: 'Chosen for data analytics due to the exploratory nature requiring adaptive planning and course correction based on findings, enabling iterative insight generation.',
        implementationApproach: 'Deploy planning agent for analysis strategy, execution agents for data processing, and reflection agent to evaluate findings and adjust analysis approach.',
        patternComplexity: 'High'
      },
      'Workforce Augmentation': {
        recommendedPattern: 'Tool-Use',
        patternRationale: 'Selected for workforce augmentation because it provides AI assistants with quality control that directly augment human capabilities without complex orchestration overhead.',
        implementationApproach: 'Implement individual AI assistants with tool access and self-reflection capabilities, scaling to Manager-Workers pattern for complex task distribution.',
        patternComplexity: 'Low'
      },
      'Risk Management': {
        recommendedPattern: 'ReAct',
        patternRationale: 'Chosen for risk management because it combines reasoning with coordinated response, enabling intelligent threat analysis and systematic mitigation execution.',
        implementationApproach: 'Deploy ReAct agents for risk signal analysis with Manager-Workers coordination for response execution and real-time monitoring integration.',
        patternComplexity: 'Medium'
      }
    };

    return patternMap[category] || patternMap['Workforce Augmentation'];
  }

  /**
   * Categorize an opportunity based on its characteristics
   * @param opportunity - Opportunity object with title, description, and technologies
   * @returns Category string
   */
  static categorizeOpportunity(opportunity: any): string {
    const { title, description, aiTechnologies } = opportunity;
    const text = `${title} ${description} ${(aiTechnologies || []).join(' ')}`.toLowerCase();

    if (text.includes('automation') || text.includes('rpa') || text.includes('workflow')) {
      return 'Process Automation';
    }
    if (text.includes('analytics') || text.includes('data') || text.includes('predictive')) {
      return 'Data Analytics';
    }
    if (text.includes('customer') || text.includes('chatbot') || text.includes('experience')) {
      return 'Customer Experience';
    }
    if (text.includes('decision') || text.includes('intelligence') || text.includes('insights')) {
      return 'Decision Support';
    }
    if (text.includes('risk') || text.includes('compliance') || text.includes('security')) {
      return 'Risk Management';
    }
    
    return 'Workforce Augmentation';
  }

  /**
   * Estimate ROI for an opportunity
   * @param opportunity - AI opportunity
   * @param profile - Client profile
   * @returns ROI estimation
   */
  static estimateROI(opportunity: AIOpportunity, profile: Profile): any {
    let baseROI = 200; // Base 200% ROI
    let timeframe = 12; // Base 12 months
    let confidence = 'Medium';

    // Adjust based on category
    switch (opportunity.category) {
      case 'Process Automation':
        baseROI = 300;
        timeframe = 8;
        confidence = 'High';
        break;
      case 'Data Analytics':
        baseROI = 250;
        timeframe = 15;
        break;
      case 'Customer Experience':
        baseROI = 220;
        timeframe = 10;
        break;
    }

    // Adjust based on complexity
    if (opportunity.implementation.complexity === 'High') {
      baseROI -= 50;
      timeframe += 6;
      confidence = 'Medium';
    } else if (opportunity.implementation.complexity === 'Low') {
      baseROI += 30;
      timeframe -= 3;
      confidence = 'High';
    }

    return {
      percentage: baseROI,
      timeframe: `${timeframe} months`,
      confidence
    };
  }

  /**
   * Analyze profile data and generate AI opportunities
   * @param profile Client profile data
   * @returns Comprehensive AI opportunities analysis
   */
  static analyzeProfile(profile: Profile): AIOpportunitiesAnalysis {
    const initiatives = profile.strategicInitiatives || [];
    const systems = profile.systemsAndApplications || [];
    const allBusinessProblems = this.extractAllBusinessProblems(initiatives);
    
    // Calculate readiness metrics
    const readinessScore = this.calculateReadinessScore(profile);
    const industryContext = this.getIndustryContext(profile.industry);
    
    // Generate opportunities based on different analysis dimensions
    const opportunities: AIOpportunity[] = [
      ...this.analyzeProcessAutomationOpportunities(profile, allBusinessProblems),
      ...this.analyzeDecisionSupportOpportunities(profile, initiatives),
      ...this.analyzeCustomerExperienceOpportunities(profile, allBusinessProblems),
      ...this.analyzeDataAnalyticsOpportunities(profile, systems),
      ...this.analyzeWorkforceAugmentationOpportunities(profile, allBusinessProblems),
      ...this.analyzeRiskManagementOpportunities(profile, systems)
    ];

    // Remove duplicates and prioritize
    const uniqueOpportunities = this.deduplicateAndPrioritize(opportunities);
    
    // Generate executive summary and recommendations
    const executiveSummary = this.generateExecutiveSummary(profile, uniqueOpportunities, readinessScore);
    const priorityRecommendations = this.generatePriorityRecommendations(uniqueOpportunities, profile);
    const nextSteps = this.generateNextSteps(profile, readinessScore);

    return {
      executiveSummary,
      opportunities: uniqueOpportunities,
      priorityRecommendations,
      industryContext,
      overallReadinessScore: readinessScore,
      nextSteps,
      generatedAt: new Date().toISOString(),
      analysisMetadata: {
        initiativeCount: initiatives.length,
        problemCount: allBusinessProblems.length,
        systemCount: systems.length,
        industryFocus: profile.industry,
        companySize: profile.employeeCount || 'Unknown'
      }
    };
  }

  /**
   * Extract all business problems from strategic initiatives
   */
  private static extractAllBusinessProblems(initiatives: StrategicInitiative[]): string[] {
    return initiatives
      .flatMap(initiative => initiative.businessProblems || [])
      .filter(problem => problem && problem.trim().length > 0);
  }

  /**
   * Calculate AI readiness score based on profile data
   */
  static calculateReadinessScore(profile: Profile): number {
    let score = 50; // Base score

    // Strategic initiatives factor (+20 max)
    const initiativeCount = (profile.strategicInitiatives || []).length;
    score += Math.min(initiativeCount * 4, 20);

    // Business problems factor (+15 max)
    const problemCount = this.extractAllBusinessProblems(profile.strategicInitiatives || []).length;
    score += Math.min(problemCount * 2, 15);

    // Systems & technology factor (+10 max)
    const systemCount = (profile.systemsAndApplications || []).length;
    score += Math.min(systemCount * 2, 10);

    // Company size factor (+5 max)
    if (profile.employeeCount) {
      const empCount = this.parseEmployeeCount(profile.employeeCount);
      if (empCount >= 1000) score += 5;
      else if (empCount >= 100) score += 3;
      else if (empCount >= 50) score += 1;
    }

    return Math.min(score, 100);
  }

  /**
   * Parse employee count string to number
   */
  private static parseEmployeeCount(employeeCountStr: string): number {
    const match = employeeCountStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  /**
   * Get industry-specific context and considerations
   */
  private static getIndustryContext(industry: string): string {
    const contexts: { [key: string]: string } = {
      'Technology': 'Tech companies are well-positioned for AI adoption with existing digital infrastructure and technical expertise. Focus on automation, development acceleration, and intelligent operations.',
      'Healthcare': 'Healthcare organizations can leverage AI for diagnostic support, workflow optimization, and patient experience enhancement while maintaining strict compliance requirements.',
      'Manufacturing': 'Manufacturing benefits from AI-driven predictive maintenance, quality control, supply chain optimization, and production planning with proven ROI patterns.',
      'Finance': 'Financial services can implement AI for risk assessment, fraud detection, automated compliance, and customer service enhancement with strong regulatory considerations.',
      'Retail': 'Retail organizations excel with AI in demand forecasting, inventory optimization, personalized customer experiences, and omnichannel integration.',
      'Education': 'Educational institutions can leverage AI for personalized learning, administrative automation, and student success prediction while maintaining data privacy.',
      'Energy': 'Energy sector benefits from AI in grid optimization, predictive maintenance, demand forecasting, and sustainability initiatives with significant operational impact.',
      'Transportation': 'Transportation companies can implement AI for route optimization, predictive maintenance, safety enhancement, and logistics automation.',
      'Real Estate': 'Real estate organizations benefit from AI in property valuation, market analysis, customer matching, and portfolio optimization.',
      'Other': 'Industry-agnostic AI opportunities exist in customer service automation, data analytics, process optimization, and decision support systems.'
    };
    
    return contexts[industry] || contexts['Other'];
  }

  /**
   * Analyze process automation opportunities
   */
  private static analyzeProcessAutomationOpportunities(profile: Profile, businessProblems: string[]): AIOpportunity[] {
    const opportunities: AIOpportunity[] = [];
    
    // Check for manual process problems
    const manualProcessProblems = businessProblems.filter(problem => 
      problem.toLowerCase().includes('manual') || 
      problem.toLowerCase().includes('time-consuming') ||
      problem.toLowerCase().includes('repetitive')
    );

    if (manualProcessProblems.length > 0) {
      opportunities.push({
        title: 'Intelligent Process Automation (IPA)',
        description: 'Deploy AI-powered automation to eliminate manual tasks and streamline business processes. Combines RPA with machine learning for adaptive automation.',
        category: 'Process Automation',
        businessImpact: {
          primaryMetrics: ['Process efficiency improvement: 60-80%', 'Manual work reduction: 70-90%', 'Error reduction: 85-95%'],
          estimatedROI: '250-400% within 18 months',
          timeToValue: '3-6 months',
          confidenceLevel: 'High'
        },
        implementation: {
          complexity: 'Medium',
          timeframe: '4-8 months',
          prerequisites: ['Process documentation', 'Change management plan', 'Integration capabilities'],
          riskFactors: ['Change resistance', 'Process complexity', 'System integration challenges']
        },
        agenticPattern: this.getAgenticPatternForCategory('Process Automation'),
        relevantInitiatives: this.findRelevantInitiatives(profile.strategicInitiatives || [], manualProcessProblems),
        aiTechnologies: ['Robotic Process Automation (RPA)', 'Machine Learning', 'Natural Language Processing', 'Computer Vision']
      });
    }

    return opportunities;
  }

  /**
   * Analyze decision support opportunities
   */
  private static analyzeDecisionSupportOpportunities(profile: Profile, initiatives: StrategicInitiative[]): AIOpportunity[] {
    const opportunities: AIOpportunity[] = [];
    
    // Check for decision-making and analytics needs
    const decisionMakingNeeds = initiatives.filter(initiative => 
      (initiative.expectedOutcomes || []).some(outcome => 
        outcome.toLowerCase().includes('decision') || 
        outcome.toLowerCase().includes('insight') ||
        outcome.toLowerCase().includes('analytics')
      )
    );

    if (decisionMakingNeeds.length > 0 || (profile.systemsAndApplications || []).some(sys => sys.category === 'Analytics')) {
      opportunities.push({
        title: 'AI-Powered Decision Support System',
        description: 'Implement intelligent analytics and decision support tools that provide real-time insights, predictive modeling, and recommendation engines for strategic decision-making.',
        category: 'Decision Support',
        businessImpact: {
          primaryMetrics: ['Decision speed improvement: 40-60%', 'Forecast accuracy: +25-35%', 'Strategic outcome success: +30%'],
          estimatedROI: '180-300% within 12 months',
          timeToValue: '2-4 months',
          confidenceLevel: 'Medium'
        },
        implementation: {
          complexity: 'Medium',
          timeframe: '3-6 months',
          prerequisites: ['Data integration', 'Analytics infrastructure', 'User training'],
          riskFactors: ['Data quality issues', 'User adoption', 'Model accuracy']
        },
        agenticPattern: this.getAgenticPatternForCategory('Decision Support'),
        relevantInitiatives: decisionMakingNeeds.map(init => init.initiative),
        aiTechnologies: ['Predictive Analytics', 'Machine Learning', 'Business Intelligence AI', 'Recommendation Systems']
      });
    }

    return opportunities;
  }

  /**
   * Analyze customer experience opportunities
   */
  private static analyzeCustomerExperienceOpportunities(profile: Profile, businessProblems: string[]): AIOpportunity[] {
    const opportunities: AIOpportunity[] = [];
    
    // Check for customer service and experience problems
    const customerProblems = businessProblems.filter(problem => 
      problem.toLowerCase().includes('customer') || 
      problem.toLowerCase().includes('service') ||
      problem.toLowerCase().includes('support') ||
      problem.toLowerCase().includes('response time')
    );

    if (customerProblems.length > 0) {
      opportunities.push({
        title: 'Intelligent Customer Experience Platform',
        description: 'Deploy AI-powered customer service automation, personalization engines, and predictive customer success tools to enhance customer satisfaction and reduce service costs.',
        category: 'Customer Experience',
        businessImpact: {
          primaryMetrics: ['Customer satisfaction improvement: +20-40%', 'Response time reduction: 60-80%', 'Service cost reduction: 30-50%'],
          estimatedROI: '200-350% within 15 months',
          timeToValue: '2-3 months',
          confidenceLevel: 'High'
        },
        implementation: {
          complexity: 'Medium',
          timeframe: '3-5 months',
          prerequisites: ['Customer data integration', 'Omnichannel strategy', 'Agent training'],
          riskFactors: ['Customer acceptance', 'Integration complexity', 'Data privacy concerns']
        },
        agenticPattern: this.getAgenticPatternForCategory('Customer Experience'),
        relevantInitiatives: this.findRelevantInitiatives(profile.strategicInitiatives || [], customerProblems),
        aiTechnologies: ['Conversational AI', 'Natural Language Understanding', 'Sentiment Analysis', 'Personalization Engines']
      });
    }

    return opportunities;
  }

  /**
   * Analyze data analytics opportunities
   */
  private static analyzeDataAnalyticsOpportunities(profile: Profile, systems: SystemApplication[]): AIOpportunity[] {
    const opportunities: AIOpportunity[] = [];
    
    // Check for data systems and analytics needs
    const hasDataSystems = systems.some(sys => 
      sys.category === 'Database' || 
      sys.category === 'Analytics' || 
      sys.category === 'ERP' || 
      sys.category === 'CRM'
    );

    if (hasDataSystems || systems.length > 3) {
      opportunities.push({
        title: 'Unified AI Analytics & Intelligence Hub',
        description: 'Create a centralized AI-powered analytics platform that connects all business systems, provides real-time insights, and enables predictive analytics across operations.',
        category: 'Data Analytics',
        businessImpact: {
          primaryMetrics: ['Data utilization improvement: +300%', 'Insight generation speed: 10x faster', 'Predictive accuracy: 85-95%'],
          estimatedROI: '300-500% within 24 months',
          timeToValue: '4-6 months',
          confidenceLevel: 'Medium'
        },
        implementation: {
          complexity: 'High',
          timeframe: '6-12 months',
          prerequisites: ['Data integration strategy', 'Cloud infrastructure', 'Analytics team'],
          riskFactors: ['Data silos', 'Integration complexity', 'Governance challenges']
        },
        agenticPattern: this.getAgenticPatternForCategory('Data Analytics'),
        relevantInitiatives: [],
        aiTechnologies: ['Machine Learning Pipelines', 'Automated Analytics', 'Predictive Modeling', 'Data Science Automation']
      });
    }

    return opportunities;
  }

  /**
   * Analyze workforce augmentation opportunities
   */
  private static analyzeWorkforceAugmentationOpportunities(profile: Profile, businessProblems: string[]): AIOpportunity[] {
    const opportunities: AIOpportunity[] = [];
    
    // Check for productivity and efficiency problems
    const productivityProblems = businessProblems.filter(problem => 
      problem.toLowerCase().includes('efficiency') || 
      problem.toLowerCase().includes('productivity') ||
      problem.toLowerCase().includes('workload') ||
      problem.toLowerCase().includes('capacity')
    );

    if (productivityProblems.length > 0) {
      opportunities.push({
        title: 'AI-Powered Workforce Augmentation',
        description: 'Implement AI assistants and automation tools that augment human capabilities, boost productivity, and enable employees to focus on high-value strategic work.',
        category: 'Workforce Augmentation',
        businessImpact: {
          primaryMetrics: ['Employee productivity: +35-50%', 'Task completion time: -40%', 'Employee satisfaction: +25%'],
          estimatedROI: '220-380% within 18 months',
          timeToValue: '2-4 months',
          confidenceLevel: 'High'
        },
        implementation: {
          complexity: 'Low',
          timeframe: '2-4 months',
          prerequisites: ['User training', 'Workflow integration', 'Performance metrics'],
          riskFactors: ['User adoption', 'Workflow disruption', 'Skill gaps']
        },
        agenticPattern: this.getAgenticPatternForCategory('Workforce Augmentation'),
        relevantInitiatives: this.findRelevantInitiatives(profile.strategicInitiatives || [], productivityProblems),
        aiTechnologies: ['AI Assistants', 'Workflow Automation', 'Intelligent Document Processing', 'Smart Scheduling']
      });
    }

    return opportunities;
  }

  /**
   * Analyze risk management opportunities
   */
  private static analyzeRiskManagementOpportunities(profile: Profile, systems: SystemApplication[]): AIOpportunity[] {
    const opportunities: AIOpportunity[] = [];
    
    // Check for security systems and compliance needs
    const hasSecuritySystems = systems.some(sys => sys.category === 'Security');
    const isRegulatedIndustry = ['Healthcare', 'Finance', 'Energy'].includes(profile.industry);

    if (hasSecuritySystems || isRegulatedIndustry) {
      opportunities.push({
        title: 'Intelligent Risk Management & Compliance',
        description: 'Deploy AI-powered risk detection, compliance monitoring, and security automation to proactively identify threats and ensure regulatory adherence.',
        category: 'Risk Management',
        businessImpact: {
          primaryMetrics: ['Risk detection speed: 100x faster', 'Compliance accuracy: +90%', 'Security incident reduction: 60-80%'],
          estimatedROI: '150-250% within 12 months',
          timeToValue: '3-5 months',
          confidenceLevel: 'Medium'
        },
        implementation: {
          complexity: 'High',
          timeframe: '4-8 months',
          prerequisites: ['Security infrastructure', 'Compliance framework', 'Risk assessment processes'],
          riskFactors: ['Regulatory complexity', 'False positives', 'Integration challenges']
        },
        agenticPattern: this.getAgenticPatternForCategory('Risk Management'),
        relevantInitiatives: [],
        aiTechnologies: ['Anomaly Detection', 'Predictive Risk Analytics', 'Automated Compliance', 'Threat Intelligence']
      });
    }

    return opportunities;
  }

  /**
   * Find relevant initiatives for specific problems
   */
  private static findRelevantInitiatives(initiatives: StrategicInitiative[], problems: string[]): string[] {
    return initiatives
      .filter(initiative => 
        (initiative.businessProblems || []).some(problem => 
          problems.some(targetProblem => 
            problem.toLowerCase().includes(targetProblem.toLowerCase()) ||
            targetProblem.toLowerCase().includes(problem.toLowerCase())
          )
        )
      )
      .map(initiative => initiative.initiative);
  }

  /**
   * Remove duplicate opportunities and prioritize
   */
  private static deduplicateAndPrioritize(opportunities: AIOpportunity[]): AIOpportunity[] {
    // Remove exact duplicates
    const unique = opportunities.filter((opp, index, self) => 
      index === self.findIndex(o => o.title === opp.title)
    );

    // Sort by business impact and confidence
    return unique.sort((a, b) => {
      const scoreA = this.calculateOpportunityScore(a);
      const scoreB = this.calculateOpportunityScore(b);
      return scoreB - scoreA;
    });
  }

  /**
   * Calculate opportunity priority score
   */
  private static calculateOpportunityScore(opportunity: AIOpportunity): number {
    let score = 0;
    
    // ROI weight
    const roiMatch = opportunity.businessImpact.estimatedROI.match(/(\d+)/);
    if (roiMatch) score += parseInt(roiMatch[1]) * 0.3;
    
    // Time to value weight
    if (opportunity.businessImpact.timeToValue.includes('month')) {
      const timeMatch = opportunity.businessImpact.timeToValue.match(/(\d+)/);
      const months = timeMatch ? parseInt(timeMatch[1]) : 12;
      score += (12 - months) * 5; // Shorter time = higher score
    }
    
    // Confidence weight
    if (opportunity.businessImpact.confidenceLevel === 'High') score += 30;
    else if (opportunity.businessImpact.confidenceLevel === 'Medium') score += 20;
    else score += 10;
    
    // Complexity weight (lower complexity = higher score)
    if (opportunity.implementation.complexity === 'Low') score += 20;
    else if (opportunity.implementation.complexity === 'Medium') score += 10;
    
    return score;
  }

  /**
   * Generate executive summary
   */
  private static generateExecutiveSummary(profile: Profile, opportunities: AIOpportunity[], readinessScore: number): string {
    const companyName = profile.companyName;
    const industry = profile.industry;
    const opportunityCount = opportunities.length;
    const topOpportunities = opportunities.slice(0, 3);
    
    let summary = `${companyName} demonstrates strong potential for AI transformation with a readiness score of ${readinessScore}/100. `;
    
    if (opportunityCount > 0) {
      summary += `Our analysis identified ${opportunityCount} high-impact AI opportunities specifically tailored to your ${industry} operations. `;
      summary += `The top-priority opportunities focus on ${topOpportunities.map(opp => opp.category.toLowerCase()).join(', ')}, `;
      summary += `with potential ROI ranging from ${topOpportunities[0]?.businessImpact.estimatedROI || '200-400%'} `;
      summary += `and time to value as short as ${topOpportunities[0]?.businessImpact.timeToValue || '2-4 months'}. `;
    }
    
    summary += `Based on current industry trends, companies implementing agentic AI solutions typically achieve $3.50 return per $1 invested within 14 months. `;
    summary += `Your strategic initiatives and existing systems provide a solid foundation for rapid AI implementation and measurable business impact.`;
    
    return summary;
  }

  /**
   * Generate priority recommendations
   */
  private static generatePriorityRecommendations(opportunities: AIOpportunity[], profile: Profile): string[] {
    const recommendations: string[] = [];
    const topOpportunities = opportunities.slice(0, 3);
    
    if (topOpportunities.length > 0) {
      recommendations.push(`Start with ${topOpportunities[0].title} - highest ROI potential with ${topOpportunities[0].businessImpact.confidenceLevel.toLowerCase()} confidence level`);
    }
    
    if (topOpportunities.length > 1) {
      recommendations.push(`Parallel implementation of ${topOpportunities[1].title} to maximize synergies and accelerate transformation`);
    }
    
    recommendations.push('Establish AI governance framework and change management processes before implementation');
    recommendations.push('Invest in employee training and skill development to ensure successful AI adoption');
    recommendations.push('Create pilot programs to validate AI solutions before full-scale deployment');
    
    return recommendations;
  }

  /**
   * Generate next steps recommendations
   */
  private static generateNextSteps(profile: Profile, readinessScore: number): string[] {
    const steps: string[] = [];
    
    steps.push('Conduct detailed AI readiness assessment with stakeholder interviews');
    steps.push('Develop comprehensive AI strategy aligned with business objectives');
    steps.push('Establish AI project governance and success metrics');
    
    if (readinessScore >= 70) {
      steps.push('Begin pilot implementation with highest-ROI opportunity');
      steps.push('Prepare change management and training programs');
    } else {
      steps.push('Address foundational data and process requirements');
      steps.push('Build internal AI awareness and capability');
    }
    
    steps.push('Create timeline and resource allocation plan for AI initiatives');
    steps.push('Establish partnerships with AI technology providers and integrators');
    
    return steps;
  }
} 