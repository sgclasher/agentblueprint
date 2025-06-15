import { Profile } from '../../../services/types';
import { ScenarioType, getScenarioInstructions, getScenarioTimelineGuidance } from './scenarioPrompts';

/**
 * User Prompt Builder for Timeline Generation
 * 
 * This module creates the user prompt by properly extracting data from the current
 * Profile structure and building comprehensive, company-specific prompts.
 */

interface ProfileDataExtraction {
  companyBasics: string;
  strategicContext: string;
  businessProblems: string;
  systemsContext: string;
  keyDataSummary: string;
}

/**
 * Extracts and formats company basic information
 */
function extractCompanyBasics(profile: Partial<Profile>): string {
  const sections: string[] = [];
  
  if (profile.companyName) {
    sections.push(`**Company Name:** ${profile.companyName}`);
  }
  
  if (profile.industry) {
    sections.push(`**Industry:** ${profile.industry}`);
  }
  
  if (profile.employeeCount) {
    sections.push(`**Company Size:** ${profile.employeeCount} employees`);
  }
  
  if (profile.annualRevenue) {
    sections.push(`**Annual Revenue:** ${profile.annualRevenue}`);
  }
  
  if (profile.primaryLocation) {
    sections.push(`**Location:** ${profile.primaryLocation}`);
  }
  
  if (profile.websiteUrl) {
    sections.push(`**Website:** ${profile.websiteUrl}`);
  }
  
  return sections.join('\n');
}

/**
 * Extracts and formats strategic initiatives context
 */
function extractStrategicContext(profile: Partial<Profile>): string {
  if (!profile.strategicInitiatives || profile.strategicInitiatives.length === 0) {
    return '**Strategic Initiatives:** None specified';
  }
  
  const sections: string[] = ['**Strategic Initiatives:**'];
  
  profile.strategicInitiatives.forEach((initiative, index) => {
    const initSection: string[] = [];
    initSection.push(`${index + 1}. **${initiative.initiative}**`);
    
    if (initiative.contact?.name) {
      initSection.push(`   - **Contact:** ${initiative.contact.name} (${initiative.contact.title || 'Title not specified'})`);
    }
    
    if (initiative.priority) {
      initSection.push(`   - **Priority:** ${initiative.priority}`);
    }
    
    if (initiative.status) {
      initSection.push(`   - **Status:** ${initiative.status}`);
    }
    
    if (initiative.targetTimeline) {
      initSection.push(`   - **Target Timeline:** ${initiative.targetTimeline}`);
    }
    
    if (initiative.estimatedBudget) {
      initSection.push(`   - **Estimated Budget:** ${initiative.estimatedBudget}`);
    }
    
    if (initiative.expectedOutcomes && initiative.expectedOutcomes.length > 0) {
      initSection.push(`   - **Expected Outcomes:**`);
      initiative.expectedOutcomes.forEach(outcome => {
        initSection.push(`     • ${outcome}`);
      });
    }
    
    if (initiative.successMetrics && initiative.successMetrics.length > 0) {
      initSection.push(`   - **Success Metrics:**`);
      initiative.successMetrics.forEach(metric => {
        initSection.push(`     • ${metric}`);
      });
    }
    
    sections.push(initSection.join('\n'));
  });
  
  return sections.join('\n\n');
}

/**
 * Extracts and formats business problems from all initiatives
 */
function extractBusinessProblems(profile: Partial<Profile>): string {
  if (!profile.strategicInitiatives || profile.strategicInitiatives.length === 0) {
    return '**Business Problems:** None specified';
  }
  
  const allProblems: string[] = [];
  
  profile.strategicInitiatives.forEach((initiative, initIndex) => {
    if (initiative.businessProblems && initiative.businessProblems.length > 0) {
      initiative.businessProblems.forEach(problem => {
        if (problem && problem.trim().length > 0) {
          allProblems.push(`• ${problem} (from "${initiative.initiative}")`);
        }
      });
    }
  });
  
  if (allProblems.length === 0) {
    return '**Business Problems:** None specified in strategic initiatives';
  }
  
  return `**Business Problems to Address:**\n${allProblems.join('\n')}`;
}

/**
 * Extracts and formats systems and applications context
 */
function extractSystemsContext(profile: Partial<Profile>): string {
  if (!profile.systemsAndApplications || profile.systemsAndApplications.length === 0) {
    return '**Current Systems:** None specified';
  }
  
  const sections: string[] = ['**Current Systems & Applications:**'];
  
  // Group by category
  const systemsByCategory: { [category: string]: any[] } = {};
  
  profile.systemsAndApplications.forEach(system => {
    const category = system.category || 'Other';
    if (!systemsByCategory[category]) {
      systemsByCategory[category] = [];
    }
    systemsByCategory[category].push(system);
  });
  
  Object.keys(systemsByCategory).sort().forEach(category => {
    sections.push(`\n**${category}:**`);
    systemsByCategory[category].forEach(system => {
      let systemDesc = `• ${system.name}`;
      if (system.vendor) systemDesc += ` (${system.vendor})`;
      if (system.criticality) systemDesc += ` - ${system.criticality} criticality`;
      if (system.description) systemDesc += `\n    ${system.description}`;
      sections.push(systemDesc);
    });
  });
  
  return sections.join('\n');
}

/**
 * Creates a focused key data summary for timeline generation
 */
function createKeyDataSummary(profile: Partial<Profile>): string {
  const keyPoints: string[] = [];
  
  // Company context
  if (profile.companyName && profile.industry) {
    keyPoints.push(`**Company:** ${profile.companyName} (${profile.industry})`);
  }
  
  // Size context
  if (profile.employeeCount) {
    keyPoints.push(`**Scale:** ${profile.employeeCount} employees`);
  }
  
  // Strategic priorities
  if (profile.strategicInitiatives && profile.strategicInitiatives.length > 0) {
    const topInitiatives = profile.strategicInitiatives
      .filter(init => init.priority === 'High')
      .map(init => init.initiative);
    
    if (topInitiatives.length > 0) {
      keyPoints.push(`**High Priority Initiatives:** ${topInitiatives.join(', ')}`);
    }
    
    // All initiatives summary
    const allInitiatives = profile.strategicInitiatives.map(init => init.initiative);
    keyPoints.push(`**All Strategic Initiatives:** ${allInitiatives.join(', ')}`);
  }
  
  // Business problems
  const allProblems = profile.strategicInitiatives
    ?.flatMap(init => init.businessProblems || [])
    .filter(problem => problem && problem.trim().length > 0) || [];
    
  if (allProblems.length > 0) {
    keyPoints.push(`**Key Business Problems:**\n${allProblems.map(p => `  • ${p}`).join('\n')}`);
  }
  
  // Technology context
  if (profile.systemsAndApplications && profile.systemsAndApplications.length > 0) {
    const systemCategories = [...new Set(profile.systemsAndApplications.map(s => s.category))].filter(Boolean);
    keyPoints.push(`**Technology Categories:** ${systemCategories.join(', ')}`);
  }
  
  // Financial context
  if (profile.annualRevenue) {
    keyPoints.push(`**Revenue Context:** ${profile.annualRevenue}`);
  }
  
  return keyPoints.join('\n\n');
}

/**
 * Builds the complete user prompt for timeline generation
 */
export function buildTimelineUserPrompt(
  profile: Partial<Profile>, 
  scenarioType: ScenarioType
): string {
  console.log('🔍 [buildTimelineUserPrompt] Building modular prompt...');
  console.log('📊 Profile summary:', {
    companyName: profile.companyName,
    industry: profile.industry,
    initiativesCount: profile.strategicInitiatives?.length || 0,
    systemsCount: profile.systemsAndApplications?.length || 0
  });
  
  // Extract all profile data sections
  const companyBasics = extractCompanyBasics(profile);
  const strategicContext = extractStrategicContext(profile);
  const businessProblems = extractBusinessProblems(profile);
  const systemsContext = extractSystemsContext(profile);
  const keyDataSummary = createKeyDataSummary(profile);
  
  console.log('📊 Extracted data sections:', {
    companyBasicsLength: companyBasics.length,
    strategicContextLength: strategicContext.length,
    businessProblemsLength: businessProblems.length,
    systemsContextLength: systemsContext.length,
    keyDataSummaryLength: keyDataSummary.length
  });
  
  // Get scenario-specific instructions
  const scenarioInstructions = getScenarioInstructions(scenarioType);
  const scenarioGuidance = getScenarioTimelineGuidance(scenarioType);
  
  // Build the complete prompt
  const prompt = `Generate a comprehensive AI transformation timeline based on the provided business profile.

**BUSINESS PROFILE:**
${companyBasics}

${strategicContext}

${businessProblems}

${systemsContext}

---
**CRITICAL INSTRUCTIONS**
---

1. **Scenario Requirements:** Generate a **${scenarioType.toUpperCase()}** timeline following these guidelines:
   ${scenarioInstructions}

2. **Timeline Guidance:**
${scenarioGuidance}

3. **Mandatory Focus:** Your timeline MUST be specifically tailored to ${profile.companyName || 'this company'}. Reference their strategic initiatives, business problems, and current systems directly. Do not provide generic AI adoption advice.

**KEY PROFILE SUMMARY FOR FOCUSED ANALYSIS:**
${keyDataSummary}

4. **Company-Specific Requirements:**
   - All timeline phases must directly address the business problems listed above
   - Reference specific strategic initiatives by name in your recommendations
   - Consider the company's industry (${profile.industry || 'not specified'}) in your technology choices
   - Account for their current systems architecture in integration planning
   - Ensure ROI projections are realistic for a company of their size (${profile.employeeCount || 'size not specified'})

5. **Output Format:** You MUST respond with ONLY a valid JSON object. No markdown formatting, no explanations, no additional text. Just pure JSON that starts with { and ends with }.

**REQUIRED JSON STRUCTURE - ALL FIELDS ARE MANDATORY:**

{
  "currentState": {
    "description": "Current AI maturity and capabilities specific to ${profile.companyName || 'the company'}, referencing their actual systems and initiatives.",
    "highlights": [
      {"label": "AI Readiness", "value": "25%"},
      {"label": "Automation Level", "value": "15%"},
      {"label": "Data Maturity", "value": "30%"}
    ]
  },
  "phases": [
    {
      "title": "Phase 1: Foundation & Quick Wins",
      "description": "Establish core data infrastructure and deliver immediate value by targeting the specific business problems identified for ${profile.companyName || 'the company'}.",
      "duration": "6 months",
      "initiatives": [
        {
          "title": "Initiative that directly addresses a specific strategic goal or business problem",
          "description": "Detailed description that references specific problems, systems, or initiatives from the profile.",
          "impact": "Quantifiable business impact tied to the company's specific context and goals."
        }
      ],
      "technologies": ["Technology 1 appropriate for the company's industry", "Technology 2"],
      "outcomes": [
        {
          "metric": "Specific metric that addresses an identified business problem",
          "value": "Realistic percentage improvement",
          "description": "Outcome description that directly references the company's context."
        }
      ],
      "highlights": [
        {"label": "ROI", "value": "150%"},
        {"label": "Time to Value", "value": "3 months"}
      ]
    },
    {
      "title": "Phase 2: Scaling & Optimization",
      "description": "Build on Phase 1 successes and address more complex challenges specific to the company's strategic initiatives.",
      "duration": "12-18 months",
      "initiatives": [
        {
          "title": "Advanced initiative building on Phase 1 and addressing remaining strategic goals",
          "description": "Detailed description that shows progression from Phase 1 and addresses company-specific challenges.",
          "impact": "Significant business impact that moves toward achieving the company's stated objectives."
        }
      ],
      "technologies": ["Advanced technologies appropriate for the scenario type", "Industry-specific solutions"],
      "outcomes": [
        {
          "metric": "Strategic metric aligned with company objectives",
          "value": "Ambitious but realistic improvement",
          "description": "Outcome that demonstrates strategic transformation progress."
        }
      ],
      "highlights": [
        {"label": "ROI", "value": "300%"},
        {"label": "Time to Value", "value": "9 months"}
      ]
    }
  ],
  "futureState": {
    "description": "Vision of ${profile.companyName || 'the company'} after successful AI transformation, achieving their stated strategic objectives and solving their identified business problems.",
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

**CRITICAL REQUIREMENTS FOR GEMINI:**
- MUST include ALL four main sections: currentState, phases, futureState, summary
- NO markdown code blocks (no \`\`\`json or \`\`\`)
- NO explanatory text before or after the JSON
- Start response immediately with { and end with }
- Every element must be specific to ${profile.companyName || 'the company'}
- Directly address their strategic initiatives and business problems
- Validate your JSON structure before responding

**REMINDER:** Your response should be pure JSON only, starting with { and ending with }. No other text.`;

  console.log('✅ Modular prompt built successfully');
  console.log('📊 Final prompt stats:', {
    totalLength: prompt.length,
    containsCompanyName: prompt.includes(profile.companyName || ''),
    containsIndustry: prompt.includes(profile.industry || ''),
    scenarioType: scenarioType
  });
  
  return prompt;
}

/**
 * Validates that the user prompt contains sufficient company-specific information
 */
export function validateUserPrompt(prompt: string, profile: Partial<Profile>): {
  isValid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  
  if (profile.companyName && !prompt.includes(profile.companyName)) {
    warnings.push('Prompt does not contain the company name');
  }
  
  if (profile.industry && !prompt.includes(profile.industry)) {
    warnings.push('Prompt does not contain the industry');
  }
  
  if (!prompt.includes('strategic initiatives') && !prompt.includes('Strategic Initiatives')) {
    warnings.push('Prompt does not reference strategic initiatives');
  }
  
  if (!prompt.includes('business problems') && !prompt.includes('Business Problems')) {
    warnings.push('Prompt does not reference business problems');
  }
  
  const hasGenericLanguage = [
    'generic AI adoption',
    'standard implementation',
    'typical company',
    'most organizations'
  ].some(phrase => prompt.toLowerCase().includes(phrase.toLowerCase()));
  
  if (hasGenericLanguage) {
    warnings.push('Prompt contains generic language that should be company-specific');
  }
  
  return {
    isValid: warnings.length === 0,
    warnings
  };
} 