import { 
    AgenticWorkflowPattern,
    PersonalizedWorkflow,
    WorkflowCategory,
    WorkflowStep,
    GovernanceCheckpoint,
    RiskAssessment,
    ROIMetrics,
    KPIMetric,
    ImplementationPhase,
    RiskFactor,
    CostBreakdown,
    Profile
} from './types';

/**
 * Agentic Workflow Pattern Library Service
 * 
 * Provides a library of proven, platform-agnostic workflow patterns
 * based on enterprise success stories and "bounded, internal, process-oriented" principles
 * from the AI Agent Handbook research.
 */
export class AgenticWorkflowService {
    
    /**
     * Get all available workflow patterns
     */
    public static getWorkflowPatterns(): AgenticWorkflowPattern[] {
        return [
            this.getDocumentProcessingPattern(),
            this.getCustomerServiceTriagePattern(),
            this.getDataEntryValidationPattern(),
            this.getSupplyChainOptimizationPattern(),
            this.getAdministrativeTaskAutomationPattern(),
            this.getDecisionSupportPattern(),
            this.getRiskMonitoringPattern()
        ];
    }

    /**
     * Get personalized workflow recommendations based on user profile
     */
    public static getPersonalizedWorkflows(profile: Profile): PersonalizedWorkflow[] {
        const allPatterns = this.getWorkflowPatterns();
        const personalizedWorkflows: PersonalizedWorkflow[] = [];

        for (const pattern of allPatterns) {
            // Check if pattern fits user's industry and company size
            if (this.isPatternSuitableForProfile(pattern, profile)) {
                const personalizedWorkflow = this.personalizeWorkflow(pattern, profile);
                personalizedWorkflows.push(personalizedWorkflow);
            }
        }

        // Sort by ROI potential and complexity
        return personalizedWorkflows.sort((a, b) => {
            const aScore = a.roiMetrics.roi3Year / a.complexityScore;
            const bScore = b.roiMetrics.roi3Year / b.complexityScore;
            return bScore - aScore;
        });
    }

    /**
     * Document Processing Automation Pattern
     * Based on proven success in enterprises like Honeywell
     */
    private static getDocumentProcessingPattern(): AgenticWorkflowPattern {
        return {
            id: 'doc-processing-automation',
            name: 'Document Processing Automation',
            category: 'Process Automation',
            description: 'Automate the classification, extraction, and routing of business documents with intelligent processing and human oversight.',
            businessObjective: 'Reduce document processing time by 80% while maintaining 95%+ accuracy',
            
            industryFit: ['Healthcare', 'Financial Services', 'Insurance', 'Legal', 'Manufacturing'],
            companySizeFit: ['Mid-Market', 'Enterprise'],
            maturityRequired: 'Medium',
            
            workflowSteps: [
                {
                    stepNumber: 1,
                    name: 'Document Intake',
                    description: 'Receive documents from multiple channels (email, upload, scan)',
                    stepType: 'Trigger',
                    businessLogic: 'Monitor designated channels for new documents',
                    dataRequired: ['Document file', 'Source channel', 'Timestamp'],
                    expectedOutcome: 'Document securely captured and logged',
                    requiresHumanApproval: false,
                    errorHandling: 'Log error and notify IT support',
                    fallbackAction: 'Move to manual processing queue'
                },
                {
                    stepNumber: 2,
                    name: 'Document Classification',
                    description: 'Automatically classify document type and extract key information',
                    stepType: 'Decision',
                    businessLogic: 'If confidence score < 85%, escalate to human review',
                    dataRequired: ['Document content', 'Historical patterns'],
                    expectedOutcome: 'Document classified with confidence score',
                    requiresHumanApproval: false,
                    escalationCriteria: 'Confidence score below 85%',
                    errorHandling: 'Flag for manual review',
                    fallbackAction: 'Route to document specialist'
                },
                {
                    stepNumber: 3,
                    name: 'Data Extraction',
                    description: 'Extract relevant data points from classified documents',
                    stepType: 'Action',
                    businessLogic: 'Extract data based on document type template',
                    dataRequired: ['Document classification', 'Extraction templates'],
                    expectedOutcome: 'Structured data extracted with validation',
                    requiresHumanApproval: false,
                    errorHandling: 'Highlight extraction errors for review',
                    fallbackAction: 'Manual data entry workflow'
                },
                {
                    stepNumber: 4,
                    name: 'Quality Review',
                    description: 'Human review of high-value or low-confidence extractions',
                    stepType: 'Human Review',
                    businessLogic: 'Review required for amounts > $10K or confidence < 90%',
                    dataRequired: ['Extracted data', 'Confidence scores'],
                    expectedOutcome: 'Human-validated data ready for processing',
                    requiresHumanApproval: true,
                    escalationCriteria: 'No review within 4 hours',
                    errorHandling: 'Escalate to supervisor',
                    fallbackAction: 'Hold in review queue'
                },
                {
                    stepNumber: 5,
                    name: 'System Integration',
                    description: 'Route processed data to appropriate business systems',
                    stepType: 'Integration',
                    businessLogic: 'Route based on document type and business rules',
                    dataRequired: ['Validated data', 'Routing rules'],
                    expectedOutcome: 'Data successfully integrated into target systems',
                    requiresHumanApproval: false,
                    errorHandling: 'Retry with exponential backoff',
                    fallbackAction: 'Queue for manual system entry'
                }
            ],
            
            governanceCheckpoints: [
                {
                    checkpointName: 'High-Value Document Review',
                    trigger: 'Document value exceeds $10,000',
                    approvalRequired: true,
                    approvers: ['Department Manager', 'Finance Reviewer'],
                    maxResponseTime: '4 hours',
                    escalationPath: 'Escalate to director level after 8 hours',
                    requiresDocumentation: true,
                    retentionPeriod: '7 years'
                },
                {
                    checkpointName: 'Low Confidence Review',
                    trigger: 'AI confidence score below 85%',
                    approvalRequired: true,
                    approvers: ['Document Specialist'],
                    maxResponseTime: '2 hours',
                    escalationPath: 'Route to senior specialist',
                    requiresDocumentation: false,
                    retentionPeriod: '1 year'
                }
            ],
            
            riskAssessment: {
                overallRiskLevel: 'Medium',
                riskFactors: [
                    {
                        factor: 'Data privacy breach',
                        likelihood: 'Low',
                        impact: 'High',
                        mitigation: 'Implement data encryption and access controls'
                    },
                    {
                        factor: 'Processing errors',
                        likelihood: 'Medium',
                        impact: 'Medium',
                        mitigation: 'Human review checkpoints and validation rules'
                    }
                ],
                mitigationStrategies: [
                    'Implement robust human oversight for high-risk documents',
                    'Maintain parallel manual processes during transition',
                    'Regular accuracy audits and model retraining'
                ],
                complianceRequirements: ['SOX', 'GDPR', 'Industry-specific regulations'],
                securityConsiderations: ['Data encryption at rest and in transit', 'Access logging and monitoring'],
                operationalRisks: ['System downtime during peak processing', 'Staff training requirements'],
                reputationalRisks: ['Customer data mishandling', 'Processing delays'],
                financialRisks: ['Implementation cost overruns', 'Compliance violations']
            },
            
            roiMetrics: {
                estimatedCostSavings: {
                    annual: 250000,
                    confidence: 85,
                    breakdown: [
                        {
                            category: 'Labor reduction',
                            annualSavings: 180000,
                            confidence: 90,
                            explanation: 'Equivalent to 2.5 FTE document processors'
                        },
                        {
                            category: 'Error reduction',
                            annualSavings: 40000,
                            confidence: 75,
                            explanation: 'Reduced rework and compliance issues'
                        },
                        {
                            category: 'Faster processing',
                            annualSavings: 30000,
                            confidence: 80,
                            explanation: 'Improved cash flow and customer satisfaction'
                        }
                    ]
                },
                revenueImpact: {
                    annual: 100000,
                    confidence: 70,
                    source: 'Faster customer onboarding and service delivery'
                },
                efficiencyGains: {
                    timeReduction: '80% faster document processing',
                    resourceReduction: 'Equivalent to 2.5 FTE positions',
                    qualityImprovement: '95% accuracy vs 82% manual processing'
                },
                implementationCost: {
                    low: 75000,
                    high: 125000,
                    breakdown: ['Platform licensing', 'Integration costs', 'Training and change management']
                },
                paybackPeriod: '4-6 months',
                roi3Year: 420  // 4.2x return = $4.20 per $1 invested
            },
            
            successCriteria: [
                'Process 95% of documents without human intervention',
                'Achieve 95%+ accuracy in data extraction',
                'Reduce average processing time from 4 hours to 30 minutes',
                'Maintain 99.9% uptime during business hours'
            ],
            
            kpis: [
                {
                    name: 'Processing Time',
                    currentValue: '4 hours average',
                    targetValue: '30 minutes average',
                    measurementMethod: 'Automated system logs',
                    reviewFrequency: 'Daily'
                },
                {
                    name: 'Accuracy Rate',
                    currentValue: '82% manual accuracy',
                    targetValue: '95% automated accuracy',
                    measurementMethod: 'Quality audit sampling',
                    reviewFrequency: 'Weekly'
                },
                {
                    name: 'Automation Rate',
                    currentValue: '0% automated',
                    targetValue: '95% automated',
                    measurementMethod: 'System processing metrics',
                    reviewFrequency: 'Daily'
                }
            ],
            
            implementationPhases: [
                {
                    phaseName: 'Pilot Phase',
                    duration: '6-8 weeks',
                    objectives: ['Validate accuracy on sample documents', 'Test integration points'],
                    deliverables: ['Pilot results report', 'Accuracy metrics', 'User feedback'],
                    successCriteria: ['90% accuracy on pilot documents', 'Successful system integration'],
                    teamRequired: ['Process Owner', 'IT Developer', 'Business Analyst'],
                    budgetRequired: '$25K-35K',
                    riskMitigation: ['Parallel manual process maintained', 'Limited document volume'],
                    rollbackPlan: 'Return to manual processing if accuracy below 85%',
                    reviewMilestones: ['Week 2: Initial results', 'Week 4: Mid-pilot review', 'Week 6: Final assessment'],
                    approvalGates: ['Business sponsor approval', 'IT security sign-off']
                },
                {
                    phaseName: 'Production Rollout',
                    duration: '8-12 weeks',
                    objectives: ['Full volume processing', 'Staff training', 'Optimization'],
                    deliverables: ['Production system', 'Training materials', 'Operating procedures'],
                    successCriteria: ['95% accuracy at full volume', 'Staff proficiency achieved'],
                    teamRequired: ['Full project team', 'Change management', 'Training specialists'],
                    budgetRequired: '$50K-90K',
                    riskMitigation: ['Gradual volume increase', 'Dedicated support team'],
                    rollbackPlan: 'Phased rollback with manual backup procedures',
                    reviewMilestones: ['Week 4: Volume ramp-up', 'Week 8: Full production', 'Week 12: Optimization complete'],
                    approvalGates: ['Executive sponsor approval', 'Operational readiness review']
                }
            ],
            
            timeToValue: '4-6 months',
            complexityScore: 6,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    /**
     * Customer Service Triage Pattern
     * Based on proven success in customer service automation
     */
    private static getCustomerServiceTriagePattern(): AgenticWorkflowPattern {
        return {
            id: 'customer-service-triage',
            name: 'Customer Service Triage',
            category: 'Customer Experience',
            description: 'Intelligently route and prioritize customer inquiries with automated response for common issues and escalation for complex cases.',
            businessObjective: 'Reduce response time by 70% while improving customer satisfaction scores',
            
            industryFit: ['Retail', 'SaaS', 'Financial Services', 'Healthcare', 'Telecommunications'],
            companySizeFit: ['SMB', 'Mid-Market', 'Enterprise'],
            maturityRequired: 'Low',
            
            workflowSteps: [
                {
                    stepNumber: 1,
                    name: 'Inquiry Reception',
                    description: 'Receive customer inquiries from multiple channels',
                    stepType: 'Trigger',
                    businessLogic: 'Monitor email, chat, and form submissions',
                    dataRequired: ['Customer message', 'Channel source', 'Customer ID'],
                    expectedOutcome: 'Inquiry logged and assigned unique ticket ID',
                    requiresHumanApproval: false,
                    errorHandling: 'Log error and create manual ticket',
                    fallbackAction: 'Route to general support queue'
                },
                {
                    stepNumber: 2,
                    name: 'Intent Classification',
                    description: 'Analyze inquiry to determine customer intent and urgency',
                    stepType: 'Decision',
                    businessLogic: 'If confidence < 80% or urgent keywords detected, escalate immediately',
                    dataRequired: ['Customer message', 'Historical patterns', 'Urgency keywords'],
                    expectedOutcome: 'Inquiry classified with priority and category',
                    requiresHumanApproval: false,
                    escalationCriteria: 'Confidence below 80% or urgent keywords detected',
                    errorHandling: 'Default to human review',
                    fallbackAction: 'Route to general support agent'
                },
                {
                    stepNumber: 3,
                    name: 'Automated Response',
                    description: 'Provide automated resolution for common issues',
                    stepType: 'Action',
                    businessLogic: 'If issue in knowledge base with >90% confidence, provide solution',
                    dataRequired: ['Classified intent', 'Knowledge base', 'Customer context'],
                    expectedOutcome: 'Immediate response provided or escalated to agent',
                    requiresHumanApproval: false,
                    errorHandling: 'Escalate to human agent',
                    fallbackAction: 'Generic acknowledgment with agent assignment'
                },
                {
                    stepNumber: 4,
                    name: 'Agent Assignment',
                    description: 'Route complex issues to appropriate specialist agents',
                    stepType: 'Integration',
                    businessLogic: 'Route based on issue type, customer tier, and agent availability',
                    dataRequired: ['Issue classification', 'Agent skills', 'Customer priority'],
                    expectedOutcome: 'Ticket assigned to qualified agent with context',
                    requiresHumanApproval: false,
                    errorHandling: 'Assign to supervisor queue',
                    fallbackAction: 'Round-robin assignment to available agents'
                }
            ],
            
            governanceCheckpoints: [
                {
                    checkpointName: 'VIP Customer Escalation',
                    trigger: 'Customer tier = VIP or Premium',
                    approvalRequired: false,
                    approvers: ['Senior Support Agent'],
                    maxResponseTime: '15 minutes',
                    escalationPath: 'Escalate to account manager after 30 minutes',
                    requiresDocumentation: true,
                    retentionPeriod: '2 years'
                },
                {
                    checkpointName: 'Urgent Issue Handling',
                    trigger: 'Priority = Urgent or keywords: outage, down, emergency',
                    approvalRequired: false,
                    approvers: ['On-call Support Manager'],
                    maxResponseTime: '5 minutes',
                    escalationPath: 'Immediate escalation to technical team',
                    requiresDocumentation: true,
                    retentionPeriod: '3 years'
                }
            ],
            
            riskAssessment: {
                overallRiskLevel: 'Low',
                riskFactors: [
                    {
                        factor: 'Customer dissatisfaction',
                        likelihood: 'Medium',
                        impact: 'Medium',
                        mitigation: 'Maintain human escalation paths and satisfaction monitoring'
                    },
                    {
                        factor: 'Misclassification of urgent issues',
                        likelihood: 'Low',
                        impact: 'High',
                        mitigation: 'Conservative classification rules and rapid escalation'
                    }
                ],
                mitigationStrategies: [
                    'Implement customer satisfaction monitoring',
                    'Maintain easy escalation to human agents',
                    'Regular review of automated responses'
                ],
                complianceRequirements: ['Customer data privacy', 'Industry-specific regulations'],
                securityConsiderations: ['Customer data protection', 'Secure communication channels'],
                operationalRisks: ['System downtime affecting customer service', 'Agent training requirements'],
                reputationalRisks: ['Poor automated responses', 'Customer service degradation'],
                financialRisks: ['Customer churn from poor service', 'Implementation costs']
            },
            
            roiMetrics: {
                estimatedCostSavings: {
                    annual: 180000,
                    confidence: 88,
                    breakdown: [
                        {
                            category: 'Agent time savings',
                            annualSavings: 120000,
                            confidence: 85,
                            explanation: 'Automated resolution of 60% of inquiries'
                        },
                        {
                            category: 'Faster resolution',
                            annualSavings: 35000,
                            confidence: 80,
                            explanation: 'Reduced average resolution time'
                        },
                        {
                            category: 'Improved efficiency',
                            annualSavings: 25000,
                            confidence: 75,
                            explanation: 'Better agent utilization and routing'
                        }
                    ]
                },
                revenueImpact: {
                    annual: 75000,
                    confidence: 70,
                    source: 'Improved customer satisfaction and retention'
                },
                efficiencyGains: {
                    timeReduction: '70% faster initial response time',
                    resourceReduction: 'Handle 150% more inquiries with same staff',
                    qualityImprovement: '24/7 availability and consistent responses'
                },
                implementationCost: {
                    low: 45000,
                    high: 75000,
                    breakdown: ['Platform setup', 'Integration', 'Training and knowledge base']
                },
                paybackPeriod: '3-5 months',
                roi3Year: 380  // 3.8x return
            },
            
            successCriteria: [
                'Resolve 60% of inquiries without human intervention',
                'Reduce average response time from 2 hours to 15 minutes',
                'Maintain customer satisfaction score above 4.2/5',
                'Achieve 99.5% uptime for automated responses'
            ],
            
            kpis: [
                {
                    name: 'Response Time',
                    currentValue: '2 hours average',
                    targetValue: '15 minutes average',
                    measurementMethod: 'Ticket system metrics',
                    reviewFrequency: 'Daily'
                },
                {
                    name: 'Automation Rate',
                    currentValue: '0% automated',
                    targetValue: '60% automated',
                    measurementMethod: 'Ticket resolution tracking',
                    reviewFrequency: 'Weekly'
                },
                {
                    name: 'Customer Satisfaction',
                    currentValue: '3.8/5 current rating',
                    targetValue: '4.2/5 target rating',
                    measurementMethod: 'Post-interaction surveys',
                    reviewFrequency: 'Monthly'
                }
            ],
            
            implementationPhases: [
                {
                    phaseName: 'Pilot Phase',
                    duration: '4-6 weeks',
                    objectives: ['Test automated responses', 'Validate routing logic'],
                    deliverables: ['Pilot metrics report', 'Customer feedback', 'System performance data'],
                    successCriteria: ['50% automation rate', 'Customer satisfaction maintained'],
                    teamRequired: ['Customer Service Manager', 'System Administrator', 'Business Analyst'],
                    budgetRequired: '$15K-25K',
                    riskMitigation: ['Limited customer segment', 'Easy escalation path'],
                    rollbackPlan: 'Disable automation and return to manual routing',
                    reviewMilestones: ['Week 2: Initial metrics', 'Week 4: Customer feedback review'],
                    approvalGates: ['Customer service manager approval', 'Customer feedback review']
                },
                {
                    phaseName: 'Full Deployment',
                    duration: '6-8 weeks',
                    objectives: ['Scale to all customers', 'Optimize performance', 'Staff training'],
                    deliverables: ['Production system', 'Training materials', 'Performance dashboards'],
                    successCriteria: ['60% automation rate', 'Customer satisfaction > 4.2/5'],
                    teamRequired: ['Full customer service team', 'Training specialists', 'System support'],
                    budgetRequired: '$30K-50K',
                    riskMitigation: ['Gradual rollout', 'Performance monitoring', 'Rapid response team'],
                    rollbackPlan: 'Phased rollback with manual override capabilities',
                    reviewMilestones: ['Week 3: Partial rollout', 'Week 6: Full deployment', 'Week 8: Optimization'],
                    approvalGates: ['Executive approval', 'Customer satisfaction review']
                }
            ],
            
            timeToValue: '2-4 months',
            complexityScore: 4,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    // Additional patterns would be implemented here...
    // For MVP, I'll provide placeholders for the remaining patterns
    
    private static getDataEntryValidationPattern(): AgenticWorkflowPattern {
        // Placeholder - would implement full pattern similar to above
        return {
            id: 'data-entry-validation',
            name: 'Data Entry Validation',
            category: 'Process Automation',
            description: 'Automated validation and correction of data entry with intelligent error detection.',
            businessObjective: 'Reduce data errors by 85% and validation time by 60%',
            industryFit: ['All Industries'],
            companySizeFit: ['SMB', 'Mid-Market', 'Enterprise'],
            maturityRequired: 'Low',
            workflowSteps: [], // Would be implemented
            governanceCheckpoints: [],
            riskAssessment: {} as RiskAssessment,
            roiMetrics: {} as ROIMetrics,
            successCriteria: [],
            kpis: [],
            implementationPhases: [],
            timeToValue: '1-3 months',
            complexityScore: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    private static getSupplyChainOptimizationPattern(): AgenticWorkflowPattern {
        return {
            id: 'supply-chain-optimization',
            name: 'Supply Chain Optimization',
            category: 'Decision Support',
            description: 'Intelligent inventory management and supplier selection with predictive analytics.',
            businessObjective: 'Reduce inventory costs by 15% while improving service levels',
            industryFit: ['Manufacturing', 'Retail', 'Distribution'],
            companySizeFit: ['Mid-Market', 'Enterprise'],
            maturityRequired: 'High',
            workflowSteps: [],
            governanceCheckpoints: [],
            riskAssessment: {} as RiskAssessment,
            roiMetrics: {} as ROIMetrics,
            successCriteria: [],
            kpis: [],
            implementationPhases: [],
            timeToValue: '6-12 months',
            complexityScore: 8,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    private static getAdministrativeTaskAutomationPattern(): AgenticWorkflowPattern {
        return {
            id: 'admin-task-automation',
            name: 'Administrative Task Automation',
            category: 'Process Automation',
            description: 'Automate routine administrative tasks like scheduling, reporting, and communications.',
            businessObjective: 'Reduce administrative overhead by 50% and improve accuracy',
            industryFit: ['All Industries'],
            companySizeFit: ['SMB', 'Mid-Market', 'Enterprise'],
            maturityRequired: 'Low',
            workflowSteps: [],
            governanceCheckpoints: [],
            riskAssessment: {} as RiskAssessment,
            roiMetrics: {} as ROIMetrics,
            successCriteria: [],
            kpis: [],
            implementationPhases: [],
            timeToValue: '2-4 months',
            complexityScore: 4,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    private static getDecisionSupportPattern(): AgenticWorkflowPattern {
        return {
            id: 'decision-support',
            name: 'Decision Support System',
            category: 'Decision Support',
            description: 'Provide data-driven insights and recommendations for business decisions.',
            businessObjective: 'Improve decision quality and reduce decision time by 40%',
            industryFit: ['All Industries'],
            companySizeFit: ['Mid-Market', 'Enterprise'],
            maturityRequired: 'Medium',
            workflowSteps: [],
            governanceCheckpoints: [],
            riskAssessment: {} as RiskAssessment,
            roiMetrics: {} as ROIMetrics,
            successCriteria: [],
            kpis: [],
            implementationPhases: [],
            timeToValue: '3-6 months',
            complexityScore: 6,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    private static getRiskMonitoringPattern(): AgenticWorkflowPattern {
        return {
            id: 'risk-monitoring',
            name: 'Risk Monitoring & Alerts',
            category: 'Risk Management',
            description: 'Continuous monitoring of business risks with automated alerting and escalation.',
            businessObjective: 'Reduce risk exposure by 60% through early detection and response',
            industryFit: ['Financial Services', 'Healthcare', 'Manufacturing', 'Energy'],
            companySizeFit: ['Mid-Market', 'Enterprise'],
            maturityRequired: 'High',
            workflowSteps: [],
            governanceCheckpoints: [],
            riskAssessment: {} as RiskAssessment,
            roiMetrics: {} as ROIMetrics,
            successCriteria: [],
            kpis: [],
            implementationPhases: [],
            timeToValue: '4-8 months',
            complexityScore: 7,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    /**
     * Check if a workflow pattern is suitable for the user's profile
     */
    private static isPatternSuitableForProfile(pattern: AgenticWorkflowPattern, profile: Profile): boolean {
        // Check industry fit
        const industryMatch = pattern.industryFit.includes('All Industries') || 
                             pattern.industryFit.includes(profile.industry);
        
        // Check company size fit (simplified logic)
        const companySizeMatch = this.getCompanySizeCategory(profile.employeeCount) 
                                ? pattern.companySizeFit.includes(this.getCompanySizeCategory(profile.employeeCount)!)
                                : true;
        
        return industryMatch && companySizeMatch;
    }

    /**
     * Personalize a workflow pattern for a specific user profile
     */
    private static personalizeWorkflow(pattern: AgenticWorkflowPattern, profile: Profile): PersonalizedWorkflow {
        return {
            ...pattern,
            profileId: profile.id,
            userId: profile.id, // Assuming user ID is same as profile ID for now
            
            customizedFor: {
                industry: profile.industry,
                companySize: profile.employeeCount || 'Unknown',
                specificUseCase: this.generateSpecificUseCase(pattern, profile)
            },
            
            // Default user preferences - would be customizable in UI
            selectedGovernanceLevel: 'Standard',
            preferredImplementationSpeed: 'Balanced',
            riskTolerance: 'Medium',
            
            status: 'Draft',
            hasTimeline: false
        };
    }

    /**
     * Generate a specific use case based on the pattern and profile
     */
    private static generateSpecificUseCase(pattern: AgenticWorkflowPattern, profile: Profile): string {
        const initiatives = profile.strategicInitiatives || [];
        const relevantInitiative = initiatives.find(init => 
            init.businessProblems.some(problem => 
                problem.toLowerCase().includes(pattern.category.toLowerCase()) ||
                problem.toLowerCase().includes('automation') ||
                problem.toLowerCase().includes('efficiency')
            )
        );

        if (relevantInitiative) {
            return `Applied to ${relevantInitiative.initiative}: ${relevantInitiative.businessProblems[0]}`;
        }

        return `Generic ${pattern.category.toLowerCase()} implementation for ${profile.industry}`;
    }

    /**
     * Determine company size category from employee count
     */
    private static getCompanySizeCategory(employeeCount?: string): string | null {
        if (!employeeCount || typeof employeeCount !== 'string') return null;
        
        const count = employeeCount.toLowerCase();
        if (count.includes('1-10') || count.includes('11-50')) return 'SMB';
        if (count.includes('51-200') || count.includes('201-1000')) return 'Mid-Market';
        if (count.includes('1000+') || count.includes('enterprise')) return 'Enterprise';
        
        return null;
    }
} 