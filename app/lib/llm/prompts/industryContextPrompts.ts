/**
 * Industry-Specific Prompt Context Generation
 * Based on KB_AGENTIC_WORKFLOW_MVP.md agent cooperation patterns
 */

export type IndustryType = 'Manufacturing' | 'Technology' | 'Healthcare' | 'Financial Services' | 'Other';

type KnownIndustryType = Exclude<IndustryType, 'Other'>;

interface AgentRoles {
  coordinator: string;
  researcher: string;
  analyst: string;
  qualityChecker: string;
  actuator: string;
}

/**
 * Generates industry-specific context for AI blueprint prompts
 */
export function generateIndustryContext(industry: IndustryType): string {
  const contexts: Record<KnownIndustryType, string> = {
    'Manufacturing': `
      Focus on production efficiency, lean manufacturing principles, supply chain optimization, and quality control.
      Key operational areas include equipment effectiveness, inventory management, production scheduling, and waste reduction.
      Safety protocols and regulatory compliance (ISO standards) are critical considerations.
      Emphasize continuous improvement methodologies like Six Sigma and Kaizen.
    `,
    'Technology': `
      Focus on development velocity, system reliability, user experience optimization, and innovation cycles.
      Key operational areas include CI/CD pipelines, system monitoring, technical debt management, and cross-team collaboration.
      Security, scalability, and code quality are paramount concerns.
      Emphasize agile methodologies, DevOps practices, and data-driven decision making.
    `,
    'Healthcare': `
      Focus on patient outcomes, clinical efficiency, regulatory compliance, and safety protocols.
      Key operational areas include patient care coordination, medical record management, staff scheduling, and clinical workflow optimization.
      HIPAA compliance and medical safety standards are non-negotiable requirements.
      Emphasize evidence-based practices, patient-centered care, and quality improvement initiatives.
    `,
    'Financial Services': `
      Focus on risk management, regulatory compliance, customer onboarding efficiency, and fraud detection.
      Key operational areas include loan processing, compliance monitoring, customer service, and financial analysis.
      SOX compliance, PCI-DSS standards, and regulatory reporting are critical requirements.
      Emphasize risk mitigation, audit trails, and customer experience optimization.
    `
  };

  return contexts[industry as KnownIndustryType] || `
    Focus on business processes, operational efficiency, and strategic goal achievement.
    Key operational areas include workflow optimization, data management, and stakeholder coordination.
    Regulatory compliance and industry best practices should be considered.
    Emphasize continuous improvement and measurable outcomes.
  `;
}

/**
 * Returns industry-specific KPI templates
 */
export function getIndustryKPITemplates(industry: IndustryType): string[] {
  const templates: Record<KnownIndustryType, string[]> = {
    'Manufacturing': [
      'Reduce production cycle time by X%',
      'Improve Overall Equipment Effectiveness (OEE) by X%',
      'Decrease defect rate by X%',
      'Reduce inventory holding costs by X%',
      'Increase production throughput by X%',
      'Improve supplier on-time delivery to X%',
      'Reduce workplace safety incidents by X%',
      'Decrease energy consumption per unit by X%'
    ],
    'Technology': [
      'Reduce deployment frequency from X to Y',
      'Improve system uptime to X%',
      'Decrease bug resolution time by X%',
      'Increase user engagement by X%',
      'Reduce technical debt ratio by X%',
      'Improve code coverage to X%',
      'Decrease customer support tickets by X%',
      'Increase feature adoption rate by X%'
    ],
    'Healthcare': [
      'Reduce patient wait times by X%',
      'Improve patient satisfaction scores by X points',
      'Decrease readmission rates by X%',
      'Increase care team efficiency by X%',
      'Reduce medical errors by X%',
      'Improve medication adherence to X%',
      'Decrease documentation time by X%',
      'Increase preventive care completion by X%'
    ],
    'Financial Services': [
      'Reduce loan processing time by X%',
      'Improve fraud detection accuracy to X%',
      'Decrease customer onboarding time by X%',
      'Increase regulatory compliance score by X%',
      'Reduce operational risk incidents by X%',
      'Improve customer satisfaction by X points',
      'Decrease manual processing errors by X%',
      'Increase cross-selling success rate by X%'
    ]
  };

  return templates[industry as KnownIndustryType] || [
    'Improve process efficiency by X%',
    'Reduce operational costs by X%',
    'Increase customer satisfaction by X%',
    'Decrease error rates by X%',
    'Improve response times by X%'
  ];
}

/**
 * Returns industry-specific pain points
 */
export function getIndustryPainPoints(industry: IndustryType): string[] {
  const painPoints: Record<KnownIndustryType, string[]> = {
    'Manufacturing': [
      'Equipment downtime',
      'Supply chain disruptions',
      'Quality control inconsistencies',
      'Inventory management inefficiencies',
      'Production scheduling conflicts',
      'Safety compliance monitoring',
      'Maintenance cost overruns',
      'Skill gaps in workforce'
    ],
    'Technology': [
      'Development bottlenecks',
      'System reliability issues',
      'Technical debt accumulation',
      'Cross-team communication gaps',
      'Security vulnerabilities',
      'Deployment complexity',
      'Performance optimization challenges',
      'User experience inconsistencies'
    ],
    'Healthcare': [
      'Administrative burden',
      'Patient data fragmentation',
      'Regulatory compliance complexity',
      'Staff scheduling inefficiencies',
      'Medical error risks',
      'Patient communication gaps',
      'Documentation overhead',
      'Resource allocation challenges'
    ],
    'Financial Services': [
      'Manual compliance processes',
      'Legacy system integration challenges',
      'Risk assessment complexity',
      'Customer onboarding friction',
      'Regulatory reporting overhead',
      'Fraud detection gaps',
      'Data security concerns',
      'Cross-departmental silos'
    ]
  };

  return painPoints[industry as KnownIndustryType] || [
    'Manual process inefficiencies',
    'Data silos and integration challenges',
    'Communication bottlenecks',
    'Compliance and audit overhead',
    'Resource allocation difficulties'
  ];
}

/**
 * Returns industry-specific agent role definitions based on KB_AGENTIC_WORKFLOW_MVP.md
 */
export function getIndustryAgentRoles(industry: IndustryType): AgentRoles {
  const roles: Record<KnownIndustryType, AgentRoles> = {
    'Manufacturing': {
      coordinator: 'Manages production scheduling, workflow coordination, and resource allocation across manufacturing lines. Prioritizes orders based on capacity and delivery commitments.',
      researcher: 'Gathers equipment data, performance metrics, supplier information, and production reports. Monitors real-time manufacturing systems and quality databases.',
      analyst: 'Analyzes production metrics, identifies bottlenecks, calculates OEE improvements, and generates efficiency reports. Transforms raw manufacturing data into actionable insights.',
      qualityChecker: 'Ensures all recommendations meet ISO quality standards, safety protocols, and regulatory requirements. Validates production changes against established manufacturing guidelines.',
      actuator: 'Implements approved changes in production systems, updates manufacturing execution systems (MES), and coordinates with plant floor operations.'
    },
    'Technology': {
      coordinator: 'Manages sprint planning, task prioritization, and cross-team dependencies. Coordinates development workflows and release scheduling across engineering teams.',
      researcher: 'Gathers system logs, performance data, user feedback, and market research. Monitors application performance, security alerts, and development metrics.',
      analyst: 'Analyzes performance metrics, identifies technical bottlenecks, calculates system improvements, and generates development insights. Transforms technical data into strategic recommendations.',
      qualityChecker: 'Ensures all recommendations meet code quality standards, security requirements, and architectural guidelines. Validates changes against development best practices.',
      actuator: 'Implements approved changes in deployment systems, updates CI/CD pipelines, and coordinates with deployment automation tools.'
    },
    'Healthcare': {
      coordinator: 'Manages care coordination, patient flow, and resource scheduling. Prioritizes clinical tasks based on patient acuity and care protocols.',
      researcher: 'Gathers patient data, clinical guidelines, regulatory updates, and care outcome metrics. Monitors electronic health records and clinical systems.',
      analyst: 'Analyzes clinical outcomes, identifies care improvement opportunities, calculates efficiency gains, and generates care quality reports. Transforms clinical data into actionable insights.',
      qualityChecker: 'Ensures all recommendations meet medical protocols, HIPAA requirements, and clinical safety standards. Validates care changes against established medical guidelines.',
      actuator: 'Implements approved changes in clinical systems, updates care protocols, and coordinates with healthcare information systems.'
    },
    'Financial Services': {
      coordinator: 'Manages risk assessment workflow, compliance processes, and customer service priorities. Coordinates financial operations and regulatory reporting timelines.',
      researcher: 'Gathers market data, regulatory updates, customer information, and risk metrics. Monitors financial systems, compliance databases, and market intelligence.',
      analyst: 'Analyzes financial metrics, identifies risk patterns, calculates compliance improvements, and generates regulatory reports. Transforms financial data into strategic insights.',
      qualityChecker: 'Ensures all recommendations meet regulatory requirements, audit standards, and risk management protocols. Validates changes against financial compliance guidelines.',
      actuator: 'Implements approved changes in financial systems, updates compliance processes, and coordinates with regulatory reporting systems.'
    }
  };

  return roles[industry as KnownIndustryType] || {
    coordinator: 'Manages business process coordination, task prioritization, and resource allocation. Coordinates operational workflows and strategic initiatives.',
    researcher: 'Gathers business data, industry information, and performance metrics. Monitors operational systems and market intelligence.',
    analyst: 'Analyzes business metrics, identifies improvement opportunities, calculates efficiency gains, and generates strategic insights.',
    qualityChecker: 'Ensures all recommendations meet business standards, compliance requirements, and operational guidelines.',
    actuator: 'Implements approved changes in business systems, updates operational processes, and coordinates with management systems.'
  };
}

/**
 * Generates a complete industry context prompt section
 */
export function generateIndustryPromptSection(industry: IndustryType): string {
  const context = generateIndustryContext(industry);
  const kpis = getIndustryKPITemplates(industry);
  const painPoints = getIndustryPainPoints(industry);
  const roles = getIndustryAgentRoles(industry);

  return `
## Industry Context: ${industry}

${context}

### Common Industry KPIs:
${kpis.map(kpi => `- ${kpi}`).join('\n')}

### Typical Pain Points:
${painPoints.map(point => `- ${point}`).join('\n')}

### Industry-Specific Agent Roles:

**Coordinator (Project Manager):** ${roles.coordinator}

**Researcher (Analyst):** ${roles.researcher}

**Analyst/Writer (Consultant):** ${roles.analyst}

**Quality-Checker (Auditor):** ${roles.qualityChecker}

**Actuator (Ops Specialist):** ${roles.actuator}
`;
} 