import { markdownService } from '../../../services/markdownService';
import { Profile } from '../../../services/types';

type ScenarioType = 'conservative' | 'balanced' | 'aggressive';

const extractKeyDataFromObject = (profileData: Partial<Profile>): string => {
  console.log('🔍 [extractKeyDataFromObject] Input profile data:', {
    companyName: profileData.companyName,
    industry: profileData.industry,
    hasStrategicInitiatives: !!profileData.strategicInitiatives,
    strategicInitiativesCount: profileData.strategicInitiatives?.length || 0,
    hasSystemsAndApplications: !!profileData.systemsAndApplications,
    systemsCount: profileData.systemsAndApplications?.length || 0
  });

  const keyData: string[] = [];
  const { expectedOutcome, problems, solutions, value, currentArchitecture } = profileData;

  console.log('🔍 Checking old structure fields:', {
    hasExpectedOutcome: !!expectedOutcome,
    hasProblems: !!problems,
    hasSolutions: !!solutions,
    hasValue: !!value,
    hasCurrentArchitecture: !!currentArchitecture
  });

  // 🚨 DEBUGGING: These are the OLD field names that don't exist in the current Profile structure!
  console.log('⚠️ OLD STRUCTURE CHECK - these fields should be null/undefined:');
  console.log('expectedOutcome:', expectedOutcome);
  console.log('problems:', problems);
  console.log('solutions:', solutions);
  console.log('value:', value);
  console.log('currentArchitecture:', currentArchitecture);

  if (expectedOutcome?.businessObjectives) {
    keyData.push(`**Core Business Objective:** ${expectedOutcome.businessObjectives}`);
  }

  if (expectedOutcome?.strategicInitiatives?.length && expectedOutcome.strategicInitiatives.length > 0) {
    const goals = expectedOutcome.strategicInitiatives.map((i: any) => `- ${i.initiative}`).join('\\n');
    keyData.push(`**Key Strategic Goals:**\\n${goals}`);
  }

  if (problems?.businessProblems?.length && problems.businessProblems.length > 0) {
    const problemList = problems.businessProblems.map((p: string) => `- ${p}`).join('\\n');
    keyData.push(`**Primary Problems to Solve:**\\n${problemList}`);
  }
  
  if (value?.businessValue?.totalAnnualImpact) {
    keyData.push(`**Financial Target:** ${value.businessValue.totalAnnualImpact}`);
  }

  if (currentArchitecture) {
    const techContext: string[] = [];
    if (currentArchitecture.coreSystems?.length > 0) {
      techContext.push(...currentArchitecture.coreSystems.map((s: string) => `- Core System: ${s}`));
    }
    if (currentArchitecture.aiReadiness) {
      techContext.push(`- AI Readiness: ${currentArchitecture.aiReadiness}`);
    }
    if (currentArchitecture.technicalDebt) {
        techContext.push(`- Technical Debt: ${currentArchitecture.technicalDebt}`);
    }
    if (techContext.length > 0) {
      keyData.push(`**Technical Context:**\\n${techContext.join('\\n')}`);
    }
  }

  console.log('📊 Extracted key data (OLD STRUCTURE):', keyData);
  
  // 🔧 NEW STRUCTURE: Let's extract data from the current Profile structure
  console.log('🔧 ATTEMPTING NEW STRUCTURE EXTRACTION...');
  
  if (profileData.companyName) {
    keyData.push(`**Company:** ${profileData.companyName}`);
  }
  
  if (profileData.industry) {
    keyData.push(`**Industry:** ${profileData.industry}`);
  }
  
  if (profileData.strategicInitiatives && profileData.strategicInitiatives.length > 0) {
    const initiatives = profileData.strategicInitiatives.map(init => `- ${init.initiative}`).join('\\n');
    keyData.push(`**Strategic Initiatives:**\\n${initiatives}`);
    
    // Extract business problems from initiatives
    const allProblems = profileData.strategicInitiatives
      .flatMap(init => init.businessProblems || [])
      .filter(problem => problem && problem.trim().length > 0);
    
    if (allProblems.length > 0) {
      const problemList = allProblems.map(p => `- ${p}`).join('\\n');
      keyData.push(`**Business Problems to Solve:**\\n${problemList}`);
    }
  }
  
  if (profileData.systemsAndApplications && profileData.systemsAndApplications.length > 0) {
    const systems = profileData.systemsAndApplications.map(sys => `- ${sys.name} (${sys.category})`).join('\\n');
    keyData.push(`**Current Systems:**\\n${systems}`);
  }

  console.log('📊 Final extracted key data (COMBINED):', keyData);
  console.log('📊 Key data length:', keyData.length);
  
  return keyData.join('\\n\\n');
};

export const buildTimelineUserPrompt = (profileData: Partial<Profile>, scenarioType: ScenarioType): string => {
  console.log('🔍 [buildTimelineUserPrompt] Starting prompt building...');
  console.log('📊 Profile data preview:', {
    companyName: profileData.companyName,
    industry: profileData.industry,
    strategicInitiativesCount: profileData.strategicInitiatives?.length || 0
  });

  const scenarioInstructions: { [key in ScenarioType]: string } = {
    conservative: 'Focus on proven technologies, lower risk, extended timelines, and gradual adoption. Prioritize stability and incremental improvements.',
    balanced: 'Balance innovation with practicality. Use a mix of proven and emerging technologies with moderate timelines and measured risk.',
    aggressive: 'Emphasize cutting-edge technologies, rapid implementation, and transformational change. Accept higher risk for greater potential returns.'
  };

  console.log('🔄 Generating markdown from profile...');
  const profileMarkdown = markdownService.generateMarkdown(profileData);
  console.log('📝 Generated markdown length:', profileMarkdown.length);
  console.log('📝 Markdown preview (first 500 chars):', profileMarkdown.substring(0, 500));

  console.log('🔄 Extracting key data...');
  const keyDataSummary = extractKeyDataFromObject(profileData);
  console.log('📊 Key data summary length:', keyDataSummary.length);
  console.log('📊 Key data summary:', keyDataSummary);

  const finalPrompt = `Generate a comprehensive AI transformation timeline based on the provided business profile.

**Business Profile:**
${profileMarkdown}

---
**CRITICAL INSTRUCTIONS**
---

1.  **Scenario:** Generate a **${scenarioType.toUpperCase()}** timeline. ${scenarioInstructions[scenarioType]}
2.  **Mandatory Focus:** Your generated timeline is an absolute priority. It must directly address the following strategic goals, problems, and financial targets that have been extracted from the profile. Do not provide a generic response; your initiatives must specifically solve the problems listed below.

**Key Profile Summary for Focused Analysis:**
${keyDataSummary}

3.  **Output Format:** Respond *only* with a single, valid JSON object that strictly follows the structure below. Do not include any commentary, explanations, or introductory text.

\`\`\`json
{
  "currentState": {
    "description": "Current AI maturity and capabilities, referencing the profile's AI Readiness score.",
    "highlights": [
      {"label": "AI Readiness", "value": "25%"},
      {"label": "Automation Level", "value": "15%"},
      {"label": "Data Maturity", "value": "30%"}
    ]
  },
  "phases": [
    {
      "title": "Phase 1: Foundation & Quick Wins",
      "description": "Establish core data infrastructure and deliver immediate value by targeting low-hanging fruit identified in the profile.",
      "duration": "6 months",
      "initiatives": [
        {
          "title": "Initiative directly linked to a Strategic Goal",
          "description": "Detailed description of what this initiative accomplishes and how it addresses a specific problem from the profile.",
          "impact": "Quantifiable business impact, tied to a financial target from the profile."
        }
      ],
      "technologies": ["Technology 1", "Technology 2"],
      "outcomes": [
        {
          "metric": "Key metric improved (e.g., 'Nurse Admin Time Reduction')",
          "value": "e.g., '20%'",
          "description": "Detailed outcome description, referencing a specific problem from the profile."
        }
      ],
      "highlights": [
        {"label": "ROI", "value": "150%"},
        {"label": "Time to Value", "value": "3 months"}
      ]
    },
    {
      "title": "Phase 2: Scaling & Optimization",
      "description": "Expand successful pilots, optimize core processes, and introduce more advanced AI capabilities.",
      "duration": "12-18 months",
      "initiatives": [
        {
          "title": "Next-level initiative to build on Phase 1",
          "description": "Detailed description of a more advanced initiative that leverages the foundation of Phase 1.",
          "impact": "Significant, quantifiable business impact that moves closer to the main financial target."
        }
      ],
      "technologies": ["Advanced Technology 1", "Predictive Analytics"],
      "outcomes": [
        {
          "metric": "Higher-level metric (e.g., 'Market Share Growth')",
          "value": "e.g., '5%'",
          "description": "Description of a more strategic outcome."
        }
      ],
      "highlights": [
        {"label": "ROI", "value": "300%"},
        {"label": "Time to Value", "value": "9 months"}
      ]
    }
  ],
  "futureState": {
    "description": "Vision of the transformed organization, achieving the stated strategic objectives.",
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
\`\`\`
`;

  console.log('✅ Timeline prompt built successfully');
  console.log('📊 Final prompt length:', finalPrompt.length);
  console.log('🔍 Contains company name?', finalPrompt.includes(profileData.companyName || ''));

  return finalPrompt;
};

export const getTimelineSystemPrompt = (): string => {
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