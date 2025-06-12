export const PROFILE_EXTRACTION_SYSTEM_PROMPT = `You are an expert business analyst specialized in extracting structured client profile data from unstructured markdown documents. Your task is to analyze the provided markdown content and extract relevant information that maps to our client profile schema.

For each field you extract, provide:
1. The extracted value
2. A confidence score between 0 and 1 (where 1 is absolute certainty)

Confidence scoring guidelines:
- 1.0: Exact match, explicitly stated with clear labels
- 0.8-0.9: Strong match, clearly implied or stated without exact labels
- 0.5-0.7: Moderate match, requires some interpretation
- 0.3-0.4: Weak match, significant interpretation needed
- Below 0.3: Very uncertain, mostly guessed

Return the response as a JSON object where each field follows this structure:
{
  "fieldName": {
    "value": <extracted value>,
    "confidence": <confidence score>
  }
}

For array fields, extract as arrays. For nested objects, maintain the structure.
If a field cannot be found or extracted, omit it from the response.`;

export const PROFILE_EXTRACTION_USER_PROMPT = (markdown) => `Extract client profile information from the following markdown document:

---
${markdown}
---

Extract the following fields if present:

**Company Information:**
- companyName: The name of the company
- industry: The industry sector
- size: Company size (Startup, Small, Mid-Market, Enterprise)
- annualRevenue: Annual revenue
- employeeCount: Number of employees
- primaryLocation: Main office location

**Strategic Initiatives:**
- expectedOutcome.strategicInitiatives: Array of strategic initiatives with contact details
  Structure: { initiative: string, contact: { name, title, email, linkedin, phone } }
- expectedOutcome.businessObjectives: Overall business objectives

**Problems & Opportunities:**
- problems.businessProblems: Array of current business problems
- problems.agenticOpportunities: Array of AI/automation opportunities

**Solution Requirements:**
- solutions.capabilities: Required capabilities
- solutions.differentiators: Key differentiators needed
- solutions.competitorGaps: Gaps in competitor solutions

**Impact Analysis:**
- valueSellingFramework.impact.totalAnnualImpact: Total financial impact
- Other impact metrics if mentioned

**Decision Makers:**
- valueSellingFramework.decisionMakers.economicBuyer: Economic buyer details (name, title, etc.)
- Other decision makers if mentioned

**AI Readiness:**
- aiOpportunityAssessment.aiReadinessScore: AI readiness score (1-10)
- aiOpportunityAssessment.opportunities: Array of AI opportunities with details
  Structure: { name, department, process, currentState, aiSolution, estimatedImpact, implementationEffort, timeline, priorityScore }
- aiOpportunityAssessment.quickWins: Array of quick wins
  Structure: { name, impact, timeline }
- aiOpportunityAssessment.strategicInitiatives: Long-term AI initiatives
- aiOpportunityAssessment.currentTechnology: Current tech stack

**Summary:**
- summary.nextSteps: Array of recommended next steps

Remember to provide confidence scores for each extracted field based on how clearly it was stated in the document.`;

export const PROFILE_FIELD_DEFINITIONS = {
  // Company Overview
  companyName: {
    type: 'string',
    description: 'The official name of the company',
    examples: ['Acme Corporation', 'TechFlow Solutions']
  },
  industry: {
    type: 'string',
    description: 'The primary industry or sector',
    examples: ['Manufacturing', 'Technology', 'Healthcare', 'Financial Services']
  },
  size: {
    type: 'string',
    enum: ['Startup', 'Small', 'Mid-Market', 'Enterprise'],
    description: 'Company size category based on employees or revenue'
  },
  annualRevenue: {
    type: 'string',
    description: 'Annual revenue in any format',
    examples: ['$100M', '$1.2B', '50 million']
  },
  employeeCount: {
    type: 'string',
    description: 'Number of employees',
    examples: ['500', '10,000+', '50-100']
  },
  primaryLocation: {
    type: 'string',
    description: 'Main headquarters location',
    examples: ['San Francisco, CA', 'New York', 'London, UK']
  },

  // Strategic Initiatives
  'expectedOutcome.strategicInitiatives': {
    type: 'array',
    description: 'List of strategic business initiatives',
    itemStructure: {
      initiative: 'string',
      contact: {
        name: 'string',
        title: 'string',
        email: 'string',
        linkedin: 'string',
        phone: 'string'
      }
    }
  },
  'expectedOutcome.businessObjectives': {
    type: 'string',
    description: 'Overall business objectives or goals'
  },

  // Problems & Opportunities
  'problems.businessProblems': {
    type: 'array',
    description: 'List of current business challenges',
    itemType: 'string'
  },
  'problems.agenticOpportunities': {
    type: 'array',
    description: 'List of AI/automation opportunities',
    itemType: 'string'
  },

  // AI Assessment
  'aiOpportunityAssessment.aiReadinessScore': {
    type: 'number',
    description: 'AI readiness score from 1-10',
    min: 1,
    max: 10
  },
  'aiOpportunityAssessment.opportunities': {
    type: 'array',
    description: 'Detailed AI opportunity assessments',
    itemStructure: {
      name: 'string',
      department: 'string',
      process: 'string',
      currentState: 'string',
      aiSolution: 'string',
      estimatedImpact: 'string',
      implementationEffort: 'enum:High,Medium,Low',
      timeline: 'string',
      priorityScore: 'number'
    }
  },
  'aiOpportunityAssessment.quickWins': {
    type: 'array',
    description: 'Quick win AI initiatives',
    itemStructure: {
      name: 'string',
      impact: 'string',
      timeline: 'string'
    }
  }
};

export const validateExtractedField = (fieldName, extractedValue, fieldDefinition) => {
  const warnings = [];

  if (fieldDefinition.type === 'array' && !Array.isArray(extractedValue)) {
    warnings.push(`${fieldName} should be an array`);
  }

  if (fieldDefinition.type === 'number' && typeof extractedValue !== 'number') {
    warnings.push(`${fieldName} should be a number`);
  }

  if (fieldDefinition.enum && !fieldDefinition.enum.includes(extractedValue)) {
    warnings.push(`${fieldName} should be one of: ${fieldDefinition.enum.join(', ')}`);
  }

  if (fieldDefinition.min !== undefined && extractedValue < fieldDefinition.min) {
    warnings.push(`${fieldName} should be at least ${fieldDefinition.min}`);
  }

  if (fieldDefinition.max !== undefined && extractedValue > fieldDefinition.max) {
    warnings.push(`${fieldName} should be at most ${fieldDefinition.max}`);
  }

  return warnings;
}; 