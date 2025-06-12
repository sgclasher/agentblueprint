/**
 * Profile Field Mapper
 * Maps extracted AI data to the ProfileWizard schema structure
 */

// Field mapping configuration
export const FIELD_MAPPINGS = {
  // Direct mappings (field name matches exactly)
  direct: [
    'companyName',
    'industry', 
    'size',
    'annualRevenue',
    'employeeCount', 
    'primaryLocation'
  ],

  // Nested mappings (need to be placed in nested objects)
  nested: {
    'expectedOutcome.strategicInitiatives': ['expectedOutcome', 'strategicInitiatives'],
    'expectedOutcome.businessObjectives': ['expectedOutcome', 'businessObjectives'],
    'problems.businessProblems': ['problems', 'businessProblems'],
    'problems.agenticOpportunities': ['problems', 'agenticOpportunities'],
    'solutions.capabilities': ['solutions', 'capabilities'],
    'solutions.differentiators': ['solutions', 'differentiators'],
    'solutions.competitorGaps': ['solutions', 'competitorGaps'],
    'valueSellingFramework.impact.totalAnnualImpact': ['valueSellingFramework', 'impact', 'totalAnnualImpact'],
    'valueSellingFramework.decisionMakers.economicBuyer': ['valueSellingFramework', 'decisionMakers', 'economicBuyer'],
    'valueSellingFramework.solutionCapabilities': ['valueSellingFramework', 'solutionCapabilities'],
    'aiOpportunityAssessment.aiReadinessScore': ['aiOpportunityAssessment', 'aiReadinessScore'],
    'aiOpportunityAssessment.opportunities': ['aiOpportunityAssessment', 'opportunities'],
    'aiOpportunityAssessment.quickWins': ['aiOpportunityAssessment', 'quickWins'],
    'aiOpportunityAssessment.strategicInitiatives': ['aiOpportunityAssessment', 'strategicInitiatives'],
    'aiOpportunityAssessment.currentTechnology': ['aiOpportunityAssessment', 'currentTechnology'],
    'summary.nextSteps': ['summary', 'nextSteps']
  },

  // Aliases (alternative names that map to schema fields)
  aliases: {
    'company': 'companyName',
    'businessName': 'companyName',
    'revenue': 'annualRevenue',
    'employees': 'employeeCount',
    'headcount': 'employeeCount',
    'location': 'primaryLocation',
    'headquarters': 'primaryLocation',
    'hq': 'primaryLocation',
    'sector': 'industry',
    'companySize': 'size',
    'aiScore': 'aiOpportunityAssessment.aiReadinessScore',
    'readinessScore': 'aiOpportunityAssessment.aiReadinessScore'
  }
};

// Company size mapping
export const COMPANY_SIZE_MAPPINGS = {
  patterns: [
    { regex: /startup|start-up|<\s*50|1\s*-\s*49/i, size: 'Startup' },
    { regex: /small|50\s*-\s*249|SMB/i, size: 'Small' },
    { regex: /mid-?market|medium|250\s*-\s*999/i, size: 'Mid-Market' },
    { regex: /enterprise|large|1000\+|>?\s*1000|5000\+/i, size: 'Enterprise' }
  ],
  
  fromEmployeeCount: (count) => {
    const num = parseInt(count);
    if (isNaN(num)) return null;
    
    if (num < 50) return 'Startup';
    if (num < 250) return 'Small';
    if (num < 1000) return 'Mid-Market';
    return 'Enterprise';
  },
  
  fromRevenue: (revenue) => {
    // Extract number from revenue string
    const match = revenue.match(/(\d+(?:\.\d+)?)\s*([BMK])?/i);
    if (!match) return null;
    
    let amount = parseFloat(match[1]);
    const unit = match[2]?.toUpperCase();
    
    // Convert to millions
    if (unit === 'B') amount *= 1000;
    else if (unit === 'K') amount /= 1000;
    
    if (amount < 5) return 'Startup';
    if (amount < 50) return 'Small';
    if (amount < 500) return 'Mid-Market';
    return 'Enterprise';
  }
};

/**
 * Normalize field value based on expected type
 * @param {any} value - The value to normalize
 * @param {string} fieldName - The field name for context
 * @returns {any} Normalized value
 */
export function normalizeFieldValue(value, fieldName) {
  // Handle confidence wrapper objects
  if (value && typeof value === 'object' && 'value' in value && 'confidence' in value) {
    value = value.value;
  }

  // Normalize company size
  if (fieldName === 'size' && typeof value === 'string') {
    // Try to match against known patterns
    for (const pattern of COMPANY_SIZE_MAPPINGS.patterns) {
      if (pattern.regex.test(value)) {
        return pattern.size;
      }
    }
    
    // Try to infer from employee count in the value
    const sizeFromCount = COMPANY_SIZE_MAPPINGS.fromEmployeeCount(value);
    if (sizeFromCount) return sizeFromCount;
    
    // Try to infer from revenue in the value
    const sizeFromRevenue = COMPANY_SIZE_MAPPINGS.fromRevenue(value);
    if (sizeFromRevenue) return sizeFromRevenue;
  }

  // Normalize arrays
  if (Array.isArray(value)) {
    return value.filter(item => item != null);
  }

  // Normalize strings
  if (typeof value === 'string') {
    return value.trim();
  }

  return value;
}

/**
 * Map a single field to the profile schema
 * @param {string} fieldName - The extracted field name
 * @param {any} value - The field value
 * @param {Object} profile - The profile object to update
 */
export function mapFieldToProfile(fieldName, value, profile) {
  // Check for direct mapping
  if (FIELD_MAPPINGS.direct.includes(fieldName)) {
    profile[fieldName] = normalizeFieldValue(value, fieldName);
    return;
  }

  // Check for alias
  if (FIELD_MAPPINGS.aliases[fieldName]) {
    const actualFieldName = FIELD_MAPPINGS.aliases[fieldName];
    if (actualFieldName.includes('.')) {
      // Handle nested alias
      const path = actualFieldName.split('.');
      setNestedValue(profile, path, normalizeFieldValue(value, path[path.length - 1]));
    } else {
      profile[actualFieldName] = normalizeFieldValue(value, actualFieldName);
    }
    return;
  }

  // Check for nested mapping
  if (FIELD_MAPPINGS.nested[fieldName]) {
    const path = FIELD_MAPPINGS.nested[fieldName];
    setNestedValue(profile, path, normalizeFieldValue(value, path[path.length - 1]));
    return;
  }

  // If no mapping found, try to intelligently place it
  if (fieldName.includes('.')) {
    const path = fieldName.split('.');
    setNestedValue(profile, path, normalizeFieldValue(value, path[path.length - 1]));
  } else {
    // Place unmapped fields at root level
    profile[fieldName] = normalizeFieldValue(value, fieldName);
  }
}

/**
 * Set a value in a nested object structure
 * @param {Object} obj - The object to update
 * @param {Array<string>} path - The path to the value
 * @param {any} value - The value to set
 */
function setNestedValue(obj, path, value) {
  let current = obj;
  
  for (let i = 0; i < path.length - 1; i++) {
    if (!current[path[i]]) {
      current[path[i]] = {};
    }
    current = current[path[i]];
  }
  
  current[path[path.length - 1]] = value;
}

/**
 * Post-process the mapped profile to ensure consistency
 * @param {Object} profile - The mapped profile
 * @returns {Object} Post-processed profile
 */
export function postProcessProfile(profile) {
  // Ensure required nested structures exist
  if (!profile.expectedOutcome) profile.expectedOutcome = {};
  if (!profile.problems) profile.problems = {};
  if (!profile.solutions) profile.solutions = {};
  if (!profile.value) profile.value = {};
  if (!profile.currentArchitecture) profile.currentArchitecture = {};
  if (!profile.valueSellingFramework) profile.valueSellingFramework = {};
  if (!profile.aiOpportunityAssessment) profile.aiOpportunityAssessment = {};
  if (!profile.summary) profile.summary = {};

  // Initialize arrays if not present
  if (!profile.expectedOutcome.strategicInitiatives) profile.expectedOutcome.strategicInitiatives = [];
  if (!profile.problems.businessProblems) profile.problems.businessProblems = [];
  if (!profile.problems.agenticOpportunities) profile.problems.agenticOpportunities = [];
  if (!profile.solutions.capabilities) profile.solutions.capabilities = [];
  if (!profile.aiOpportunityAssessment.opportunities) profile.aiOpportunityAssessment.opportunities = [];
  if (!profile.aiOpportunityAssessment.quickWins) profile.aiOpportunityAssessment.quickWins = [];
  if (!profile.summary.nextSteps) profile.summary.nextSteps = [];

  // Try to infer company size if not set
  if (!profile.size) {
    if (profile.employeeCount) {
      profile.size = COMPANY_SIZE_MAPPINGS.fromEmployeeCount(profile.employeeCount);
    } else if (profile.annualRevenue) {
      profile.size = COMPANY_SIZE_MAPPINGS.fromRevenue(profile.annualRevenue);
    }
  }

  return profile;
} 