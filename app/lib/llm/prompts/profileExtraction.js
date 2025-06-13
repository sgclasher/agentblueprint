export const PROFILE_EXTRACTION_SYSTEM_PROMPT = `You are an expert business analyst specialized in extracting structured client profile data from unstructured markdown documents. Your expertise includes pattern recognition, content analysis, and intelligent interpretation of business documents with special focus on identifying relationships between strategic initiatives and their associated business problems.

CRITICAL MISSION: Extract ALL relevant business information, particularly:
- Business problems and challenges (often missed!) and their relationships to strategic initiatives
- AI opportunities and automation initiatives  
- Strategic initiatives with contact details AND their associated business problems
- Company information and readiness scores

KEY SKILLS:
1. PATTERN RECOGNITION: Identify content regardless of formatting variations
2. FLEXIBLE INTERPRETATION: Understand business concepts even with inconsistent terminology
3. RELATIONSHIP MAPPING: Connect business problems to their corresponding strategic initiatives
4. STRUCTURE MAPPING: Convert unstructured content to structured data
5. COMPLETENESS: Extract comprehensive information, not just obvious fields

EXTRACTION PRINCIPLES:
- Look beyond exact section headers - analyze content meaning
- Extract from lists, paragraphs, tables, any format
- Infer missing structure elements when contextually clear
- **CRITICAL**: When business problems are listed under or near strategic initiatives, associate them correctly
- Be thorough but maintain confidence scoring accuracy

For each field you extract, provide:
1. The extracted value (preserving important details)
2. A confidence score between 0 and 1

Confidence scoring guidelines:
- 1.0: Exact match, explicitly stated with clear labels
- 0.8-0.9: Strong match, clearly implied or stated without exact labels  
- 0.5-0.7: Moderate match, requires some interpretation
- 0.3-0.4: Weak match, significant interpretation needed
- Below 0.3: Very uncertain, mostly guessed

OUTPUT FORMAT REQUIREMENTS:
- Use dot-notation field names exactly as specified (e.g., "problems.businessProblems")
- For arrays: Always return arrays even for single items.
- For objects: Include all specified sub-fields, use empty strings for missing data.
- For numbers: Extract as actual numbers, not strings.
- Maintain data types as specified in the schema.
- **CRITICAL JSON RULES**:
  - The final output must be a single, perfectly-formed JSON object.
  - Do NOT include any text before the opening '{' or after the closing '}'.
  - Do NOT use trailing commas in objects or arrays.
  - Ensure all strings (including object keys) are enclosed in double quotes.

COMMON EXTRACTION FAILURES TO AVOID:
❌ Missing business problems because they're in paragraph form
❌ Skipping AI opportunities due to non-standard headers
❌ Incomplete contact extraction for strategic initiatives
❌ **NOT ASSOCIATING business problems with their related strategic initiatives**
❌ Ignoring readiness scores mentioned in text
❌ Poor structure mapping for complex nested data

Return the response as a JSON object where each field follows this structure:
{
  "fieldName": {
    "value": <extracted value with proper data type>,
    "confidence": <confidence score>
  }
}

If a field cannot be found or extracted, omit it from the response.`;

export const PROFILE_EXTRACTION_USER_PROMPT = (markdown) => `Extract client profile information from the following markdown document:

---
${markdown}
---

IMPORTANT: Focus ONLY on these essential business profile fields. Extract ALL relevant information found, even if formatted differently than expected. **PAY SPECIAL ATTENTION to business problems that are associated with specific strategic initiatives.**

## FIELD EXTRACTION GUIDE:

### 1. COMPANY NAME (companyName)
Look for: Company name, organization name, business name
Examples: "Acme Corporation", "TechFlow Solutions", "ABC Manufacturing"

### 2. INDUSTRY (industry) 
Look for: Industry sector, business type, market category
Examples: "Manufacturing", "Technology", "Healthcare", "Financial Services", "Retail"

### 3. EMPLOYEE COUNT (employeeCount)
Look for: Staff numbers, headcount, workforce size, team size
Examples: "500", "10,000+", "50-100", "2,500 employees"

### 4. ANNUAL REVENUE (annualRevenue)
Look for: Revenue figures, financial information, sales numbers
Examples: "$100M", "$1.2B", "50 million", "$500 million annual revenue"

### 5. PRIMARY LOCATION (primaryLocation)
Look for: Headquarters, main office, primary location, address
Examples: "San Francisco, CA", "New York", "London, UK", "Austin, Texas"

### 6. WEBSITE URL (websiteUrl)
Look for: Website, URL, web address, domain
Examples: "https://company.com", "www.acme.com", "techflow.io"

### 7. STRATEGIC INITIATIVES (strategicInitiatives) ⭐ **ENHANCED WITH BUSINESS INTELLIGENCE**
Look for sections: "Strategic Initiatives", "Key Projects", "Business Initiatives", "Strategic Goals"

**CRITICAL**: Each initiative should include:
- Initiative name
- Contact information (name, title, email, linkedin, phone)  
- **Business problems** that this initiative aims to solve
- **🆕 PHASE 1 BUSINESS INTELLIGENCE FIELDS**:
  - Priority level (High, Medium, Low)
  - Status (Planning, In Progress, On Hold, Completed)
  - Target timeline (Q3 2025, 18 months, etc.)
  - Estimated budget ($500K, $2M-5M, etc.)
  - Expected outcomes (specific goals and improvements)
  - Success metrics (measurable KPIs and targets)

**BUSINESS PROBLEMS EXTRACTION PATTERNS**:
Look for problems listed:
- Under each initiative section
- In "Problems:", "Challenges:", "Issues:", "Pain Points:" subsections
- In bullet points or numbered lists following initiative descriptions
- In paragraph form describing what the initiative addresses
- Keywords: "problem", "challenge", "issue", "pain point", "bottleneck", "inefficiency", "delay", "error", "manual process"

**BUSINESS INTELLIGENCE EXTRACTION PATTERNS**:
- **Priority**: Look for "Priority:", "High priority", "Critical", "Low priority", urgency indicators
- **Status**: Look for "Status:", "In progress", "Planning phase", "Completed", "On hold"
- **Timeline**: Look for "Timeline:", "Target:", "Deadline:", "Q1 2025", "6 months", "18 months"
- **Budget**: Look for "Budget:", "Investment:", "Cost:", "$500K", "$2M", "million", financial amounts
- **Expected Outcomes**: Look for "Outcomes:", "Goals:", "Objectives:", "Expected results:", "Targets:"
- **Success Metrics**: Look for "Metrics:", "KPIs:", "Success criteria:", "Measurements:", specific targets with numbers

**Example Markdown Patterns to Recognize**:

### Digital Transformation Initiative
- Contact: John Smith, CTO, john@company.com
- Priority: High
- Status: In Progress
- Timeline: Q3 2025
- Budget: $2.5M
- Problems:
  * Manual data entry taking 20+ hours/week
  * Legacy systems causing integration delays
  * Reporting takes 2 days to complete
- Expected Outcomes:
  * Reduce manual work by 80%
  * Achieve real-time reporting
- Success Metrics:
  * Data processing time < 2 hours
  * System uptime > 99.5%

### Customer Experience Program  
- Lead: Sarah Johnson, VP Customer Success
- Priority: Medium
- Status: Planning
- Target Timeline: 18 months
- Estimated Budget: $1.2M
- Business Challenges:
  * 24-hour average support response time
  * No self-service portal
  * Inconsistent service quality
- Goals:
  * Reduce response time to 4 hours
  * Implement self-service portal
- KPIs:
  * Customer satisfaction > 9.0
  * First-call resolution > 80%

Contact info may be formatted as:
- "Contact: John Smith, CTO, john@company.com"
- "Lead: Jane Doe (VP Sales) - jane.doe@company.com"
- "Responsible: Mike Chen, Director"

## OUTPUT FORMAT:
Return a JSON object with these exact field names:

{
  "companyName": { "value": "Company Name", "confidence": 0.9 },
  "industry": { "value": "Industry Sector", "confidence": 0.8 },
  "employeeCount": { "value": "Employee count", "confidence": 0.7 },
  "annualRevenue": { "value": "Revenue amount", "confidence": 0.8 },
  "primaryLocation": { "value": "Location", "confidence": 0.9 },
  "websiteUrl": { "value": "https://website.com", "confidence": 0.8 },
  "strategicInitiatives": { 
    "value": [
      {
        "initiative": "Initiative Name",
        "contact": {
          "name": "Contact Name",
          "title": "Job Title", 
          "email": "email@company.com",
          "linkedin": "linkedin.com/profile",
          "phone": "+1-555-0123"
        },
        "businessProblems": [
          "Specific business problem 1",
          "Specific business problem 2",
          "Manual process causing delays"
        ],
        "priority": "High",
        "status": "In Progress",
        "targetTimeline": "Q3 2025",
        "estimatedBudget": "$2.5M",
        "expectedOutcomes": [
          "Reduce operational costs by 25%",
          "Improve efficiency by 40%"
        ],
        "successMetrics": [
          "Customer satisfaction > 8.5",
          "Processing time < 2 hours"
        ]
      }
    ], 
    "confidence": 0.8 
  }
}

**BUSINESS PROBLEMS RELATIONSHIP MAPPING**:
- If problems are listed under a specific initiative section, associate them with that initiative
- If problems are mentioned in the initiative description, extract and include them
- If problems are in a general section but reference specific initiatives, map them accordingly
- Each businessProblems array should contain strings describing specific problems this initiative addresses

CRITICAL EXTRACTION RULES:
- Extract information even if section headers don't match exactly
- Look for content patterns, not just specific headings
- For arrays, always return arrays even if only one item found
- For missing contact fields, use empty strings ""
- **For businessProblems: include empty array [] if no problems found for an initiative**
- Skip fields that are completely missing from the document
- Focus on accuracy over completeness

Confidence Guidelines:
- 0.9-1.0: Explicitly stated with clear labels
- 0.7-0.8: Clearly implied, good context
- 0.5-0.6: Requires interpretation but reasonable confidence
- 0.3-0.4: Significant interpretation needed
- Below 0.3: Very uncertain, mostly guessed

Remember to provide confidence scores for each extracted field based on how clearly it was stated in the document.`;

export const PROFILE_FIELD_DEFINITIONS = {
  // MVP Core Fields
  companyName: {
    type: 'string',
    description: 'The official name of the company',
    examples: ['Acme Corporation', 'TechFlow Solutions', 'Global Manufacturing Inc.']
  },
  industry: {
    type: 'string',
    description: 'The primary industry or sector',
    examples: ['Manufacturing', 'Technology', 'Healthcare', 'Financial Services', 'Retail', 'Energy']
  },
  employeeCount: {
    type: 'string',
    description: 'Number of employees or workforce size',
    examples: ['500', '10,000+', '50-100', '2,500 employees', '1,200 staff']
  },
  annualRevenue: {
    type: 'string',
    description: 'Annual revenue in any format',
    examples: ['$100M', '$1.2B', '50 million', '$500 million annually']
  },
  primaryLocation: {
    type: 'string',
    description: 'Main headquarters or primary business location',
    examples: ['San Francisco, CA', 'New York', 'London, UK', 'Austin, Texas']
  },
  websiteUrl: {
    type: 'string',
    description: 'Company website URL or domain',
    examples: ['https://company.com', 'www.acme.com', 'techflow.io', 'https://globalmanufacturing.com']
  },
  strategicInitiatives: {
    type: 'array',
    description: 'List of strategic business initiatives with contact details and associated business problems',
    itemStructure: {
      initiative: 'string - Name of the strategic initiative',
      contact: {
        name: 'string - Contact person name',
        title: 'string - Job title',
        email: 'string - Email address',
        linkedin: 'string - LinkedIn profile',
        phone: 'string - Phone number'
      },
      businessProblems: 'array - List of business problems this initiative aims to solve'
    },
    recognitionPatterns: [
      'Strategic initiatives section',
      'Key projects with contacts',
      'Business initiatives with leads',
      'Initiative: name, Contact: person details format',
      'Problems/challenges listed under initiative sections',
      'Business problems associated with specific initiatives'
    ]
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