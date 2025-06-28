import { 
    BusinessDomain, 
    DomainAgentPattern, 
    DomainAgentRole, 
    AgenticPattern,
    WorkflowStory,
    WorkflowStep 
} from '../../../services/types';

/**
 * Domain-Specific Agent Pattern Definitions
 * 
 * This module provides business domain expertise to generate specialized agent teams
 * instead of generic coordinator/researcher/analyst templates. Each domain pattern
 * defines specific agent roles, workflows, and coordination mechanisms.
 */

// ================================================================================================
// PROCUREMENT DOMAIN PATTERN
// ================================================================================================

const PROCUREMENT_PATTERN: DomainAgentPattern = {
    domain: 'procurement',
    coordinationPattern: 'Manager-Workers',
    agentRoles: [
        {
            role: 'procurement-coordinator',
            title: 'Procurement Coordinator',
            domainSpecificJob: 'Orchestrate end-to-end procurement processes and manage vendor relationships',
            workflowPosition: 1,
            interactionPattern: 'Central orchestrator managing all procurement workflow stages',
            responsibilities: [
                'Route procurement requests based on value and category',
                'Coordinate between requisitioners, vendors, and approvers',
                'Track procurement milestones and SLA compliance',
                'Manage vendor communication and relationship maintenance',
                'Escalate high-value or complex procurement cases'
            ],
            domainKPIs: [
                'Average procurement cycle time',
                'Procurement request routing accuracy',
                'Vendor response rate',
                'Process compliance rate'
            ]
        },
        {
            role: 'rfp-management-agent',
            title: 'RFP Management Agent',
            domainSpecificJob: 'Create, distribute, and evaluate Request for Proposal processes',
            workflowPosition: 2,
            interactionPattern: 'Receives requirements from coordinator, manages vendor interactions',
            responsibilities: [
                'Generate RFP documents from business requirements',
                'Distribute RFPs to qualified vendor networks',
                'Track vendor proposal submissions and compliance',
                'Coordinate proposal evaluation processes',
                'Manage RFP timeline and milestone tracking'
            ],
            domainKPIs: [
                'RFP creation time',
                'Vendor participation rate',
                'Proposal quality score',
                'RFP-to-award cycle time'
            ]
        },
        {
            role: 'vendor-evaluation-agent',
            title: 'Vendor Evaluation Agent',
            domainSpecificJob: 'Assess vendor capabilities, financial stability, and proposal quality',
            workflowPosition: 3,
            interactionPattern: 'Collaborates with RFP agent, reports to coordinator',
            responsibilities: [
                'Evaluate vendor financial stability and references',
                'Score proposals against predefined criteria',
                'Conduct risk assessment for vendor relationships',
                'Compare vendor capabilities and pricing models',
                'Generate vendor scorecards and recommendations'
            ],
            domainKPIs: [
                'Vendor evaluation accuracy',
                'Time to complete vendor assessment',
                'Vendor risk identification rate',
                'Proposal scoring consistency'
            ]
        },
        {
            role: 'contract-review-agent',
            title: 'Contract Review Agent',
            domainSpecificJob: 'Review, negotiate, and finalize procurement contracts and agreements',
            workflowPosition: 4,
            interactionPattern: 'Receives vendor selection from evaluation agent, coordinates with legal',
            responsibilities: [
                'Review contract terms and identify risk areas',
                'Ensure compliance with procurement policies',
                'Negotiate standard terms and pricing structures',
                'Track contract amendments and renewals',
                'Maintain contract repository and documentation'
            ],
            domainKPIs: [
                'Contract review turnaround time',
                'Contract compliance rate',
                'Risk identification accuracy',
                'Contract amendment processing time'
            ]
        },
        {
            role: 'procurement-execution-agent',
            title: 'Procurement Execution Agent',
            domainSpecificJob: 'Execute final procurement transactions and manage post-award activities',
            workflowPosition: 5,
            interactionPattern: 'Receives approved contracts, executes transactions, reports completion',
            responsibilities: [
                'Generate purchase orders and execute transactions',
                'Coordinate delivery schedules and logistics',
                'Track invoice processing and payment workflows',
                'Monitor vendor performance against SLAs',
                'Manage procurement documentation and audit trails'
            ],
            domainKPIs: [
                'Purchase order accuracy',
                'Delivery timeline adherence',
                'Invoice processing time',
                'Vendor performance scores'
            ]
        }
    ],
    workflowStory: `
**PROCUREMENT WORKFLOW STORY:**

1. **Request Initiation**: Business unit submits procurement request via portal
2. **Coordinator Assessment**: Procurement Coordinator categorizes request and determines approval workflow
3. **RFP Generation**: If competitive bidding required, RFP Management Agent creates and distributes RFP
4. **Vendor Response**: Vendors submit proposals through structured submission process
5. **Evaluation Process**: Vendor Evaluation Agent scores proposals and conducts risk assessments
6. **Contract Review**: Contract Review Agent negotiates terms and ensures policy compliance
7. **Final Execution**: Procurement Execution Agent generates POs and manages delivery
8. **Performance Tracking**: Ongoing monitoring of vendor performance and contract compliance

**COORDINATION MECHANISM**: Central Procurement Coordinator orchestrates workflow, with each specialist agent handling domain-specific tasks in sequence or parallel based on procurement category and complexity.
`,
    toolCategories: [
        'Procurement Management Systems (SAP Ariba, Oracle Procurement)',
        'Vendor Management Platforms (Coupa, Jaggaer)',
        'Contract Management Systems (DocuSign CLM, Agiloft)',
        'Spend Analytics Tools (SpendHQ, Zycus)',
        'ERP Integration (SAP, Oracle, Microsoft Dynamics)',
        'Compliance Monitoring (GRC platforms, audit tools)'
    ]
};

// ================================================================================================
// FINANCIAL SERVICES DOMAIN PATTERN
// ================================================================================================

const FINANCIAL_SERVICES_PATTERN: DomainAgentPattern = {
    domain: 'financial-services',
    coordinationPattern: 'Hierarchical-Hub-Spoke',
    agentRoles: [
        {
            role: 'risk-management-coordinator',
            title: 'Risk Management Coordinator',
            domainSpecificJob: 'Oversee enterprise risk assessment and mitigation strategies',
            workflowPosition: 1,
            interactionPattern: 'Central risk orchestrator with specialized risk analysis teams',
            responsibilities: [
                'Coordinate cross-functional risk assessments',
                'Monitor regulatory compliance requirements',
                'Escalate high-risk scenarios to executive oversight',
                'Manage risk reporting and dashboard generation',
                'Coordinate stress testing and scenario analysis'
            ],
            domainKPIs: [
                'Risk identification accuracy',
                'Regulatory compliance rate',
                'Risk mitigation response time',
                'Audit finding closure rate'
            ]
        },
        {
            role: 'credit-analysis-agent',
            title: 'Credit Analysis Agent',
            domainSpecificJob: 'Evaluate credit worthiness and loan portfolio risk',
            workflowPosition: 2,
            interactionPattern: 'Specialist reporting to risk coordinator with fraud detection collaboration',
            responsibilities: [
                'Analyze credit applications and financial statements',
                'Assess borrower risk profiles and credit histories',
                'Generate credit scores and lending recommendations',
                'Monitor portfolio performance and early warning indicators',
                'Conduct stress testing on loan portfolios'
            ],
            domainKPIs: [
                'Credit decision accuracy',
                'Loan processing time',
                'Default prediction accuracy',
                'Portfolio risk assessment quality'
            ]
        },
        {
            role: 'fraud-detection-agent',
            title: 'Fraud Detection Agent',
            domainSpecificJob: 'Identify and prevent fraudulent activities across all channels',
            workflowPosition: 2,
            interactionPattern: 'Real-time monitoring with escalation to risk coordinator',
            responsibilities: [
                'Monitor transaction patterns for anomalies',
                'Identify suspicious account activities',
                'Generate fraud alerts and case investigations',
                'Coordinate with law enforcement and regulatory bodies',
                'Maintain fraud prevention rules and models'
            ],
            domainKPIs: [
                'Fraud detection rate',
                'False positive rate',
                'Investigation resolution time',
                'Financial loss prevention'
            ]
        },
        {
            role: 'regulatory-compliance-agent',
            title: 'Regulatory Compliance Agent',
            domainSpecificJob: 'Ensure adherence to financial regulations and reporting requirements',
            workflowPosition: 3,
            interactionPattern: 'Policy enforcement across all agents with direct regulatory reporting',
            responsibilities: [
                'Monitor compliance with banking regulations',
                'Generate regulatory reports and filings',
                'Conduct compliance audits and assessments',
                'Track regulatory changes and impact analysis',
                'Manage compliance training and certification'
            ],
            domainKPIs: [
                'Regulatory filing accuracy',
                'Compliance violation rate',
                'Audit preparation time',
                'Regulatory change adaptation speed'
            ]
        },
        {
            role: 'portfolio-optimization-agent',
            title: 'Portfolio Optimization Agent',
            domainSpecificJob: 'Optimize investment portfolios and asset allocation strategies',
            workflowPosition: 4,
            interactionPattern: 'Strategic analysis coordination with risk and compliance validation',
            responsibilities: [
                'Analyze portfolio performance and risk metrics',
                'Generate asset allocation recommendations',
                'Conduct market research and trend analysis',
                'Monitor portfolio rebalancing opportunities',
                'Generate investment performance reports'
            ],
            domainKPIs: [
                'Portfolio return optimization',
                'Risk-adjusted performance',
                'Rebalancing frequency',
                'Client satisfaction scores'
            ]
        }
    ],
    workflowStory: `
**FINANCIAL SERVICES WORKFLOW STORY:**

1. **Risk Assessment Initiation**: Business event triggers risk evaluation (loan application, investment request, compliance review)
2. **Specialist Analysis**: Domain-specific agents (Credit, Fraud, Compliance) conduct parallel analysis
3. **Risk Coordination**: Risk Management Coordinator synthesizes findings and identifies interdependencies
4. **Decision Framework**: Portfolio Optimization Agent incorporates risk findings into strategic recommendations
5. **Compliance Validation**: Regulatory Compliance Agent validates all decisions against current regulations
6. **Executive Reporting**: Consolidated risk and performance reports generated for executive oversight
7. **Continuous Monitoring**: Ongoing surveillance and real-time risk monitoring across all portfolios

**COORDINATION MECHANISM**: Hierarchical structure with Risk Management Coordinator overseeing specialist teams, ensuring regulatory compliance while optimizing business outcomes.
`,
    toolCategories: [
        'Risk Management Systems (GRC platforms, Moody\'s Analytics)',
        'Credit Analysis Tools (FICO, Experian, Credit Bureau APIs)',
        'Fraud Detection Systems (NICE Actimize, SAS Fraud Management)',
        'Regulatory Reporting (Thomson Reuters, Bloomberg Regulatory)',
        'Portfolio Management (BlackRock Aladdin, FactSet)',
        'Core Banking Systems (Temenos, FIS, Jack Henry)'
    ]
};

// ================================================================================================
// HEALTHCARE DOMAIN PATTERN
// ================================================================================================

const HEALTHCARE_PATTERN: DomainAgentPattern = {
    domain: 'healthcare',
    coordinationPattern: 'Plan-Act-Reflect',
    agentRoles: [
        {
            role: 'patient-care-coordinator',
            title: 'Patient Care Coordinator',
            domainSpecificJob: 'Orchestrate patient journey and care plan management',
            workflowPosition: 1,
            interactionPattern: 'Central care coordination with clinical and administrative specialists',
            responsibilities: [
                'Coordinate patient care plans across specialties',
                'Schedule appointments and manage care timelines',
                'Track patient outcomes and care quality metrics',
                'Facilitate communication between care team members',
                'Ensure continuity of care across care transitions'
            ],
            domainKPIs: [
                'Care plan adherence rate',
                'Patient satisfaction scores',
                'Care coordination efficiency',
                'Appointment scheduling accuracy'
            ]
        },
        {
            role: 'clinical-decision-support-agent',
            title: 'Clinical Decision Support Agent',
            domainSpecificJob: 'Provide evidence-based clinical recommendations and alerts',
            workflowPosition: 2,
            interactionPattern: 'Real-time clinical guidance with care coordinator integration',
            responsibilities: [
                'Analyze patient data for clinical insights',
                'Generate evidence-based treatment recommendations',
                'Provide drug interaction and allergy alerts',
                'Support diagnostic decision-making processes',
                'Monitor clinical guidelines compliance'
            ],
            domainKPIs: [
                'Clinical recommendation accuracy',
                'Alert relevance rate',
                'Treatment outcome improvement',
                'Clinical guideline adherence'
            ]
        },
        {
            role: 'administrative-workflow-agent',
            title: 'Administrative Workflow Agent',
            domainSpecificJob: 'Manage healthcare administrative processes and documentation',
            workflowPosition: 3,
            interactionPattern: 'Administrative support with clinical validation checkpoints',
            responsibilities: [
                'Process insurance authorizations and claims',
                'Manage medical record documentation',
                'Coordinate billing and coding workflows',
                'Handle patient communications and notifications',
                'Generate administrative reports and analytics'
            ],
            domainKPIs: [
                'Claims processing time',
                'Documentation accuracy',
                'Authorization approval rate',
                'Administrative efficiency'
            ]
        },
        {
            role: 'quality-assurance-agent',
            title: 'Quality Assurance Agent',
            domainSpecificJob: 'Monitor care quality and patient safety indicators',
            workflowPosition: 4,
            interactionPattern: 'Quality oversight with clinical and administrative monitoring',
            responsibilities: [
                'Monitor patient safety indicators and adverse events',
                'Conduct quality audits and assessments',
                'Track clinical outcome measurements',
                'Ensure regulatory compliance (HIPAA, Joint Commission)',
                'Generate quality improvement recommendations'
            ],
            domainKPIs: [
                'Patient safety incident rate',
                'Quality metric compliance',
                'Audit finding resolution',
                'Regulatory compliance score'
            ]
        }
    ],
    workflowStory: `
**HEALTHCARE WORKFLOW STORY:**

1. **Patient Encounter**: Patient interaction triggers care coordination workflow
2. **Care Planning**: Patient Care Coordinator assesses needs and develops care plan
3. **Clinical Support**: Clinical Decision Support Agent provides evidence-based recommendations
4. **Administrative Processing**: Administrative Workflow Agent handles insurance, scheduling, documentation
5. **Quality Monitoring**: Quality Assurance Agent monitors outcomes and safety indicators
6. **Care Adaptation**: Plan-Act-Reflect pattern allows care plan adjustments based on outcomes
7. **Continuous Improvement**: Quality feedback loop drives care plan optimization

**COORDINATION MECHANISM**: Adaptive care coordination with continuous monitoring and plan adjustment based on patient outcomes and care quality metrics.
`,
    toolCategories: [
        'Electronic Health Records (Epic, Cerner, Allscripts)',
        'Clinical Decision Support (IBM Watson Health, UpToDate)',
        'Revenue Cycle Management (Epic Resolute, Cerner RevWorks)',
        'Quality Management (Press Ganey, Health Catalyst)',
        'HIPAA Compliance Tools (Compliancy Group, HIPAA One)',
        'Telehealth Platforms (Teladoc, Amwell, Doxy.me)'
    ]
};

// ================================================================================================
// DOMAIN PATTERN REGISTRY
// ================================================================================================

const DOMAIN_PATTERNS: Record<BusinessDomain, DomainAgentPattern> = {
    'procurement': PROCUREMENT_PATTERN,
    'financial-services': FINANCIAL_SERVICES_PATTERN,
    'healthcare': HEALTHCARE_PATTERN,
    'manufacturing': {
        domain: 'manufacturing',
        coordinationPattern: 'Blackboard-Shared-Memory',
        agentRoles: [
            {
                role: 'production-coordinator',
                title: 'Production Coordinator',
                domainSpecificJob: 'Orchestrate manufacturing operations and resource allocation',
                workflowPosition: 1,
                interactionPattern: 'Event-driven coordination with real-time production monitoring',
                responsibilities: [
                    'Coordinate production schedules and resource allocation',
                    'Monitor equipment performance and maintenance needs',
                    'Optimize workflow and eliminate bottlenecks',
                    'Manage inventory levels and supply chain coordination'
                ],
                domainKPIs: ['Production efficiency', 'Equipment utilization', 'Schedule adherence', 'Quality metrics']
            },
            {
                role: 'quality-control-agent',
                title: 'Quality Control Agent',
                domainSpecificJob: 'Monitor product quality and compliance standards',
                workflowPosition: 2,
                interactionPattern: 'Real-time quality monitoring with production feedback',
                responsibilities: [
                    'Monitor quality metrics in real-time',
                    'Identify defects and quality issues',
                    'Ensure compliance with industry standards',
                    'Generate quality improvement recommendations'
                ],
                domainKPIs: ['Defect rate', 'Compliance score', 'Quality improvement rate', 'Customer satisfaction']
            },
            {
                role: 'supply-chain-agent',
                title: 'Supply Chain Agent',
                domainSpecificJob: 'Manage supplier relationships and inventory optimization',
                workflowPosition: 3,
                interactionPattern: 'Supply chain coordination with demand forecasting',
                responsibilities: [
                    'Monitor supplier performance and delivery schedules',
                    'Optimize inventory levels and procurement timing',
                    'Manage vendor relationships and negotiations',
                    'Forecast demand and adjust supply plans'
                ],
                domainKPIs: ['Supplier performance', 'Inventory turnover', 'Cost optimization', 'Delivery reliability']
            },
            {
                role: 'maintenance-optimization-agent',
                title: 'Maintenance Optimization Agent',
                domainSpecificJob: 'Predict and schedule equipment maintenance activities',
                workflowPosition: 4,
                interactionPattern: 'Predictive maintenance with production coordination',
                responsibilities: [
                    'Predict equipment failures and maintenance needs',
                    'Schedule preventive maintenance activities',
                    'Optimize maintenance resource allocation',
                    'Track equipment performance and lifecycle'
                ],
                domainKPIs: ['Equipment uptime', 'Maintenance cost reduction', 'Failure prediction accuracy', 'MTBF improvement']
            }
        ],
        workflowStory: `Manufacturing operations flow through event-driven coordination where agents respond to real-time production events, quality alerts, and supply chain disruptions in parallel.`,
        toolCategories: ['MES Systems', 'ERP Integration', 'IoT Sensors', 'Quality Management', 'Supply Chain Platforms']
    },
    'technology': {
        domain: 'technology',
        coordinationPattern: 'Market-Based-Auction',
        agentRoles: [
            {
                role: 'development-coordinator',
                title: 'Development Coordinator',
                domainSpecificJob: 'Coordinate software development lifecycle and resource allocation',
                workflowPosition: 1,
                interactionPattern: 'Auction-based task assignment with specialist teams',
                responsibilities: [
                    'Prioritize development tasks and feature requests',
                    'Allocate development resources across projects',
                    'Coordinate release cycles and deployment schedules',
                    'Monitor development velocity and quality metrics'
                ],
                domainKPIs: ['Development velocity', 'Release frequency', 'Bug resolution time', 'Feature completion rate']
            },
            {
                role: 'code-review-agent',
                title: 'Code Review Agent',
                domainSpecificJob: 'Ensure code quality and security standards',
                workflowPosition: 2,
                interactionPattern: 'Automated code analysis with developer feedback',
                responsibilities: [
                    'Conduct automated code reviews and security scans',
                    'Identify code quality issues and vulnerabilities',
                    'Ensure coding standards compliance',
                    'Generate improvement recommendations'
                ],
                domainKPIs: ['Code quality score', 'Security vulnerability rate', 'Review turnaround time', 'Standards compliance']
            },
            {
                role: 'devops-automation-agent',
                title: 'DevOps Automation Agent',
                domainSpecificJob: 'Automate deployment pipelines and infrastructure management',
                workflowPosition: 3,
                interactionPattern: 'CI/CD pipeline automation with monitoring integration',
                responsibilities: [
                    'Automate build and deployment processes',
                    'Monitor application performance and infrastructure',
                    'Manage container orchestration and scaling',
                    'Coordinate incident response and recovery'
                ],
                domainKPIs: ['Deployment frequency', 'System uptime', 'Incident response time', 'Infrastructure efficiency']
            },
            {
                role: 'product-analytics-agent',
                title: 'Product Analytics Agent',
                domainSpecificJob: 'Analyze user behavior and product performance metrics',
                workflowPosition: 4,
                interactionPattern: 'Data-driven insights with product strategy coordination',
                responsibilities: [
                    'Analyze user engagement and behavior patterns',
                    'Track product performance metrics and KPIs',
                    'Generate insights for product improvement',
                    'Support A/B testing and experimentation'
                ],
                domainKPIs: ['User engagement rate', 'Feature adoption', 'Conversion metrics', 'Product satisfaction']
            }
        ],
        workflowStory: `Technology development flows through market-based resource allocation where agents bid for development tasks based on expertise and capacity, optimizing delivery speed and quality.`,
        toolCategories: ['Development Tools', 'CI/CD Platforms', 'Monitoring Systems', 'Analytics Platforms', 'Cloud Infrastructure']
    },
    // Generic fallback for unlisted domains
    'education': {
        domain: 'education',
        coordinationPattern: 'Manager-Workers',
        agentRoles: [],
        workflowStory: 'Generic education workflow - requires domain-specific customization',
        toolCategories: ['Learning Management Systems', 'Student Information Systems', 'Assessment Tools']
    },
    'retail': {
        domain: 'retail',
        coordinationPattern: 'Manager-Workers',
        agentRoles: [],
        workflowStory: 'Generic retail workflow - requires domain-specific customization',
        toolCategories: ['E-commerce Platforms', 'Inventory Management', 'Customer Analytics']
    },
    'government': {
        domain: 'government',
        coordinationPattern: 'Hierarchical-Hub-Spoke',
        agentRoles: [],
        workflowStory: 'Generic government workflow - requires domain-specific customization',
        toolCategories: ['GIS Systems', 'Document Management', 'Citizen Portals']
    },
    'legal': {
        domain: 'legal',
        coordinationPattern: 'Manager-Workers',
        agentRoles: [],
        workflowStory: 'Generic legal workflow - requires domain-specific customization',
        toolCategories: ['Case Management', 'Document Review', 'Legal Research']
    },
    'real-estate': {
        domain: 'real-estate',
        coordinationPattern: 'Manager-Workers',
        agentRoles: [],
        workflowStory: 'Generic real estate workflow - requires domain-specific customization',
        toolCategories: ['Property Management', 'CRM Systems', 'Market Analytics']
    },
    'consulting': {
        domain: 'consulting',
        coordinationPattern: 'Plan-Act-Reflect',
        agentRoles: [],
        workflowStory: 'Generic consulting workflow - requires domain-specific customization',
        toolCategories: ['Project Management', 'Analytics Tools', 'Knowledge Management']
    },
    'media': {
        domain: 'media',
        coordinationPattern: 'Manager-Workers',
        agentRoles: [],
        workflowStory: 'Generic media workflow - requires domain-specific customization',
        toolCategories: ['Content Management', 'Publishing Platforms', 'Analytics Tools']
    },
    'logistics': {
        domain: 'logistics',
        coordinationPattern: 'Blackboard-Shared-Memory',
        agentRoles: [],
        workflowStory: 'Generic logistics workflow - requires domain-specific customization',
        toolCategories: ['Transportation Management', 'Warehouse Management', 'Tracking Systems']
    },
    'energy': {
        domain: 'energy',
        coordinationPattern: 'Blackboard-Shared-Memory',
        agentRoles: [],
        workflowStory: 'Generic energy workflow - requires domain-specific customization',
        toolCategories: ['SCADA Systems', 'Grid Management', 'Asset Management']
    },
    'construction': {
        domain: 'construction',
        coordinationPattern: 'Manager-Workers',
        agentRoles: [],
        workflowStory: 'Generic construction workflow - requires domain-specific customization',
        toolCategories: ['Project Management', 'CAD Software', 'Resource Planning']
    },
    'generic': {
        domain: 'generic',
        coordinationPattern: 'Manager-Workers',
        agentRoles: [],
        workflowStory: 'Generic workflow pattern - requires domain-specific customization',
        toolCategories: ['Generic Business Tools', 'Communication Platforms', 'Analytics Tools']
    }
};

// ================================================================================================
// DOMAIN DETECTION AND MAPPING FUNCTIONS
// ================================================================================================

/**
 * Detect business domain from opportunity context and business category
 */
export function detectBusinessDomain(
    opportunityCategory: string,
    opportunityDescription: string,
    industryContext?: string
): BusinessDomain {
    const text = `${opportunityCategory} ${opportunityDescription} ${industryContext || ''}`.toLowerCase();
    
    // Domain keyword mapping with priority scoring
    const domainKeywords: Record<BusinessDomain, { keywords: string[], priority: number }> = {
        'procurement': {
            keywords: ['procurement', 'sourcing', 'vendor', 'supplier', 'rfp', 'rfq', 'purchase', 'contract', 'negotiation', 'bid'],
            priority: 10
        },
        'financial-services': {
            keywords: ['banking', 'finance', 'credit', 'loan', 'investment', 'portfolio', 'risk', 'compliance', 'trading', 'insurance'],
            priority: 9
        },
        'healthcare': {
            keywords: ['healthcare', 'medical', 'patient', 'clinical', 'hospital', 'treatment', 'diagnosis', 'pharmacy', 'hipaa'],
            priority: 9
        },
        'manufacturing': {
            keywords: ['manufacturing', 'production', 'assembly', 'quality', 'inventory', 'supply chain', 'equipment', 'maintenance'],
            priority: 8
        },
        'technology': {
            keywords: ['software', 'development', 'coding', 'devops', 'application', 'system', 'platform', 'api', 'cloud'],
            priority: 8
        },
        'education': {
            keywords: ['education', 'learning', 'student', 'curriculum', 'academic', 'university', 'school', 'training'],
            priority: 7
        },
        'retail': {
            keywords: ['retail', 'sales', 'customer', 'inventory', 'merchandise', 'store', 'e-commerce', 'shopping'],
            priority: 7
        },
        'government': {
            keywords: ['government', 'public', 'municipal', 'federal', 'state', 'citizen', 'regulation', 'policy'],
            priority: 6
        },
        'legal': {
            keywords: ['legal', 'law', 'attorney', 'court', 'litigation', 'contract', 'compliance', 'regulatory'],
            priority: 6
        },
        'real-estate': {
            keywords: ['real estate', 'property', 'leasing', 'rental', 'construction', 'development', 'mortgage'],
            priority: 5
        },
        'consulting': {
            keywords: ['consulting', 'advisory', 'strategy', 'transformation', 'analysis', 'recommendations'],
            priority: 5
        },
        'media': {
            keywords: ['media', 'content', 'publishing', 'broadcasting', 'journalism', 'marketing', 'advertising'],
            priority: 4
        },
        'logistics': {
            keywords: ['logistics', 'transportation', 'shipping', 'delivery', 'warehouse', 'distribution', 'freight'],
            priority: 4
        },
        'energy': {
            keywords: ['energy', 'utility', 'power', 'electric', 'gas', 'renewable', 'grid', 'transmission'],
            priority: 3
        },
        'construction': {
            keywords: ['construction', 'building', 'engineering', 'architecture', 'infrastructure', 'contractor'],
            priority: 3
        },
        'generic': {
            keywords: [],
            priority: 1
        }
    };
    
    let bestMatch: BusinessDomain = 'generic';
    let highestScore = 0;
    
    for (const [domain, config] of Object.entries(domainKeywords)) {
        const matchCount = config.keywords.filter(keyword => text.includes(keyword)).length;
        const score = matchCount * config.priority;
        
        if (score > highestScore) {
            highestScore = score;
            bestMatch = domain as BusinessDomain;
        }
    }
    
    return bestMatch;
}

/**
 * Get domain-specific agent pattern for a business domain
 */
export function getDomainAgentPattern(domain: BusinessDomain): DomainAgentPattern {
    return DOMAIN_PATTERNS[domain] || DOMAIN_PATTERNS['generic'];
}

/**
 * Generate domain-specific workflow story
 */
export function generateWorkflowStory(
    domain: BusinessDomain,
    opportunityContext: string,
    agentRoles: DomainAgentRole[]
): WorkflowStory {
    const pattern = getDomainAgentPattern(domain);
    
    // Generate workflow steps based on agent roles
    const workflowSteps: WorkflowStep[] = agentRoles.map((agent, index) => ({
        stepNumber: agent.workflowPosition,
        agent: agent.title,
        action: agent.responsibilities[0] || 'Execute domain-specific tasks',
        inputs: [`Previous step outputs`, `Business requirements`, `System data`],
        outputs: [`${agent.title} analysis`, `Recommendations`, `Status updates`],
        nextSteps: index < agentRoles.length - 1 ? [`Step ${index + 2}: ${agentRoles[index + 1]?.title}`] : ['Process completion'],
        riskPoints: [`Data quality issues`, `System integration challenges`, `Approval delays`]
    }));
    
    return {
        triggerEvent: `Business event initiates ${domain} workflow`,
        workflowSteps,
        coordinationMechanism: `${pattern.coordinationPattern} coordination pattern manages agent interactions`,
        humanCheckpoints: ['Initial approval', 'Quality review', 'Final authorization'],
        successOutcome: 'Business objective achieved with measurable outcomes',
        errorHandling: ['Automated retry logic', 'Human escalation procedures', 'Rollback mechanisms']
    };
}

/**
 * Map opportunity category to suggested tools and systems
 */
export function getDomainSpecificTools(domain: BusinessDomain, existingSystems?: string[]): string[] {
    const pattern = getDomainAgentPattern(domain);
    const domainTools = pattern.toolCategories;
    
    // If existing systems are provided, try to match them to domain tools
    if (existingSystems?.length) {
        const matchedTools = existingSystems.filter(system => 
            domainTools.some(tool => 
                system.toLowerCase().includes(tool.toLowerCase().split(' ')[0]) ||
                tool.toLowerCase().includes(system.toLowerCase().split(' ')[0])
            )
        );
        
        // Combine matched existing systems with domain-specific recommendations
        return [...matchedTools, ...domainTools.slice(0, 6 - matchedTools.length)];
    }
    
    return domainTools.slice(0, 6); // Return top 6 tools for the domain
}

/**
 * Validate domain agent pattern completeness
 */
export function validateDomainPattern(domain: BusinessDomain): {
    isComplete: boolean;
    missingElements: string[];
    qualityScore: number;
} {
    const pattern = DOMAIN_PATTERNS[domain];
    const missingElements: string[] = [];
    
    if (!pattern.agentRoles?.length) missingElements.push('Agent roles not defined');
    if (!pattern.workflowStory) missingElements.push('Workflow story missing');
    if (!pattern.toolCategories?.length) missingElements.push('Tool categories not specified');
    
    const qualityScore = Math.max(0, 100 - (missingElements.length * 25));
    const isComplete = missingElements.length === 0;
    
    return { isComplete, missingElements, qualityScore };
}

export { DOMAIN_PATTERNS }; 