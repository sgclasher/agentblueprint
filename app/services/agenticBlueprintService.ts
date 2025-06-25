import { Profile, AgenticBlueprint, DigitalTeamMember, HumanCheckpoint, AgenticTimeline, KPIImprovement, ROIProjection } from './types';
import { ROICalculationService } from './roiCalculationService';

/**
 * Agentic Blueprint Service
 * 
 * This service transforms client profile data into a comprehensive AI "digital team" 
 * blueprint showing exactly what each AI agent will do, how humans stay in control, 
 * and which KPIs will improve. Uses the vendor-neutral framework to create clear,
 * actionable strategies for business transformation through agentic AI.
 */

// 🆕 Enhanced Business Context Processing for Quality Improvement
interface BusinessContext {
  industrySpecific: {
    terminology: string[];
    commonTools: string[];
    typicalKPIs: string[];
    regulatoryRequirements: string[];
    riskFactors: string[];
  };
  companySpecific: {
    systemsInventory: string[];
    businessProblems: string[];
    existingMetrics: string[];
    priorityInitiatives: string[];
    organizationalConstraints: string[];
  };
  implementationContext: {
    complexityScore: number;
    timelineMultiplier: number;
    riskLevel: 'low' | 'medium' | 'high';
    changeReadiness: number;
  };
}

export class AgenticBlueprintService {
  
  /**
   * Generate agentic blueprint for a profile using AI service
   * @param profile - Client profile data
   * @param userId - User ID for authentication
   * @param credentialsRepo - Credentials repository
   * @param preferredProvider - AI provider preference
   * @returns AI-generated agentic blueprint
   */
  static async generateBlueprint(
    profile: Profile, 
    userId: string, 
    credentialsRepo: any, 
    preferredProvider?: string
  ): Promise<AgenticBlueprint> {
    if (!profile) {
      throw new Error('Profile is required for blueprint generation');
    }

    // Validate profile has sufficient data
    if (!profile.strategicInitiatives || profile.strategicInitiatives.length === 0) {
      throw new Error('Profile must have at least one strategic initiative to generate a blueprint');
    }

    // 🆕 PHASE 2 ENHANCEMENT: Extract rich business context before AI generation
    const businessContext = this.extractBusinessContext(profile);
    
    // 🆕 Generate industry-specific constraints and priorities
    const industryConstraints = this.generateIndustryConstraints(profile.industry, businessContext);
    
    // 🆕 Map strategic initiatives to agent capabilities
    const agentCapabilityMapping = this.mapInitiativesToAgentCapabilities(profile.strategicInitiatives || []);
    
    // 🆕 Calculate realistic timeline based on business context
    const timelineRecommendation = this.calculateTimelineRecommendation(businessContext);
    
    // 🆕 PHASE 1.4: Calculate ROI projection from process metrics
    let roiProjection: ROIProjection | undefined;
    const hasProcessMetrics = profile.strategicInitiatives.some(init => init.processMetrics || init.investmentContext);
    
    if (hasProcessMetrics) {
      console.log('[ROI Calculation] Process metrics detected, calculating ROI projection...');
      // Use the highest priority initiative with process metrics for primary ROI calculation
      const primaryInitiative = profile.strategicInitiatives
        .filter(init => init.processMetrics || init.investmentContext)
        .sort((a, b) => {
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return (priorityOrder[b.priority || 'Medium'] || 2) - (priorityOrder[a.priority || 'Medium'] || 2);
        })[0];
      
      if (primaryInitiative) {
        try {
          roiProjection = ROICalculationService.calculateROIFromProcessMetrics(
            primaryInitiative.processMetrics,
            primaryInitiative.investmentContext,
            profile.industry
          );
          
          // Validate ROI projection
          const validation = ROICalculationService.validateROIProjection(
            { roiPercentage: roiProjection.roiPercentage, paybackMonths: roiProjection.paybackMonths },
            profile.industry
          );
          
          if (!validation.isValid) {
            console.warn('[ROI Validation] Warnings:', validation.warnings);
            // Add warnings to confidence factors
            roiProjection.confidenceFactors = [
              ...roiProjection.confidenceFactors,
              ...validation.warnings.map(w => `⚠️ ${w}`)
            ];
            // Adjust confidence level if needed
            if (validation.warnings.length > 1) {
              roiProjection.confidenceLevel = 'Low';
            }
          }
          
          console.log('[ROI Calculation] ROI projection generated:', {
            roi: roiProjection.roiPercentage,
            payback: roiProjection.paybackMonths,
            confidence: roiProjection.confidenceLevel
          });
        } catch (error) {
          console.error('[ROI Calculation] Failed to calculate ROI:', error);
          // Continue without ROI projection if calculation fails
        }
      }
    }

    // Check if AI service is configured
    const { aiService } = await import('./aiService');
    const isConfigured = await aiService.isConfigured(userId, credentialsRepo, preferredProvider);
    
    if (!isConfigured) {
      throw new Error('No AI provider configured. Please configure an AI provider in admin settings.');
    }

    // Import prompts and types
    const { 
      buildAgenticBlueprintSystemPrompt,
      buildAgenticBlueprintUserPrompt, 
      validateAgenticBlueprintResponse
    } = await import('../lib/llm/prompts/agenticBlueprintPrompt');
    
    type AgenticBlueprintPromptConfig = import('../lib/llm/prompts/agenticBlueprintPrompt').AgenticBlueprintPromptConfig;
    
    // Import the interface type
    type AgenticBlueprintResponse = import('../lib/llm/prompts/agenticBlueprintPrompt').AgenticBlueprintResponse;

    // 🆕 PHASE 3.4: Determine actual provider and detect capabilities
    console.log('[Provider Detection] Getting AI provider status to determine actual provider...');
    const providerStatus = await aiService.getStatus(userId, credentialsRepo, preferredProvider);
    const actualProvider = this.normalizeProviderName(providerStatus.provider);
    console.log('[Provider Detection] Actual provider selected:', actualProvider, 'from status:', providerStatus.provider);
    
    const modelCapabilities = this.detectModelCapabilities(actualProvider);
    
    // Configure prompt generation with industry intelligence and model optimizations
    const promptConfig: AgenticBlueprintPromptConfig = {
      industry: profile.industry as any,
      includeIndustryContext: true,
      enableChainOfThought: true,
      modelProvider: modelCapabilities.provider,
      enableAdaptiveThinking: modelCapabilities.supportsAdaptiveThinking,
      enableExtendedThinking: modelCapabilities.supportsExtendedThinking,
      enableStructuredOutputs: modelCapabilities.supportsStructuredOutputs,
      businessContext: {
        complexityScore: businessContext.implementationContext.complexityScore / 100,
        riskLevel: businessContext.implementationContext.riskLevel,
        implementationReadiness: this.mapChangeReadinessToLevel(businessContext.implementationContext.changeReadiness)
      },
      includeKPIProbability: true,
      includeROIProjection: !!roiProjection  // 🆕 Enable ROI in prompt if we have process metrics
    };

    // 🆕 Generate optimized prompts with model-specific features
    const systemPrompt = buildAgenticBlueprintSystemPrompt(promptConfig);
    const userPrompt = buildAgenticBlueprintUserPrompt(profile, promptConfig);

    // 🔍 LOG REQUEST DETAILS FOR TROUBLESHOOTING
    console.log('=== AI BLUEPRINT REQUEST DETAILS ===');
    console.log('[Request] User ID:', userId);
    console.log('[Request] Preferred Provider:', preferredProvider || 'auto-selected');
    console.log('[Request] Model Capabilities:', modelCapabilities);
    console.log('[Request] Prompt Config:', promptConfig);
    console.log('[Request] System Prompt Length:', systemPrompt.length, 'characters');
    console.log('[Request] User Prompt Length:', userPrompt.length, 'characters');
    console.log('[Request] Business Context:', businessContext);

    // 🆕 PHASE 3.5.6: Intelligent retry logic with prompt adjustments
    let aiResponse: AgenticBlueprintResponse;
    let lastError: Error | null = null;
    const maxRetries = 3;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`[Request] Calling AI service (attempt ${attempt}/${maxRetries})...`);
        
        // Adjust prompts for retry attempts
        let adjustedSystemPrompt = systemPrompt;
        let adjustedUserPrompt = userPrompt;
        
        if (attempt > 1) {
          console.log(`[Retry] Adjusting prompts for attempt ${attempt} due to validation failure`);
          
          // Add stronger KPI enforcement for retry attempts
          const kpiRetryEnforcement = `
🚨 RETRY ATTEMPT ${attempt}: The previous response failed validation. This is critical:

ABSOLUTE REQUIREMENT: Generate EXACTLY 3, 4, OR 5 KPI improvements. NO EXCEPTIONS.
- Previous attempt failed because it generated fewer than 3 KPI improvements
- You MUST provide at least 3 distinct KPI objects in the kpiImprovements array
- Each KPI must be unique and measurable
- This is being validated programmatically - failure will result in another retry

ENFORCE: Count your KPI improvements before finishing: 1, 2, 3... minimum!
`;
          
          adjustedUserPrompt = kpiRetryEnforcement + adjustedUserPrompt;
          
          // For specific provider optimizations on retry
          if (modelCapabilities.provider === 'gemini') {
            adjustedSystemPrompt += `

🔄 GEMINI RETRY MODE: You previously failed KPI validation. Use adaptive thinking to:
1. Generate at least 3 distinct KPI improvements
2. Verify each KPI is unique and measurable
3. Double-check the array length before responding
4. Use step-by-step validation of the kpiImprovements section`;
          } else if (modelCapabilities.provider === 'claude') {
            adjustedSystemPrompt += `

🔄 CLAUDE RETRY MODE: Previous response validation failed. Use extended thinking to:
1. Methodically generate each of the 3+ required KPI improvements
2. Think through each KPI's business impact step-by-step
3. Verify the complete response structure before finalizing
4. Ensure kpiImprovements array contains minimum 3 objects`;
          } else if (modelCapabilities.provider === 'openai') {
            adjustedSystemPrompt += `

🔄 OPENAI RETRY MODE: JSON validation failed on previous attempt. 
1. Use structured output mode to enforce minimum 3 KPI improvements
2. Validate kpiImprovements array length against schema requirements
3. Ensure each KPI object is complete and properly formatted
4. Apply built-in schema validation before responding`;
          }
        }
        
        aiResponse = await aiService.generateJson(
          adjustedSystemPrompt,
          adjustedUserPrompt,
          userId,
          credentialsRepo,
          preferredProvider
        );
        
        console.log(`[Request] AI service call completed (attempt ${attempt})`);
        break; // Success - exit retry loop
        
      } catch (error: any) {
        lastError = error;
        console.error(`[Retry] Attempt ${attempt} failed:`, error.message);
        
        if (attempt === maxRetries) {
          console.error('[Retry] All retry attempts exhausted, proceeding with error handling');
          throw error;
        }
        
        // Add delay before retry (exponential backoff)
        const delayMs = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`[Retry] Waiting ${delayMs}ms before attempt ${attempt + 1}`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    try {
      // Ensure aiResponse was assigned during retry loop
      if (!aiResponse!) {
        throw new Error('Internal error: AI response was not assigned during retry attempts');
      }

      // 🔍 COMPREHENSIVE LOGGING FOR TROUBLESHOOTING
      console.log('=== AI BLUEPRINT RESPONSE ANALYSIS ===');
      console.log('[AgenticBlueprintService] Raw AI Response Type:', typeof aiResponse);
      console.log('[AgenticBlueprintService] AI Response Keys:', aiResponse ? Object.keys(aiResponse) : 'NULL/UNDEFINED');
      console.log('[AgenticBlueprintService] Full AI Response:', JSON.stringify(aiResponse, null, 2));
      
      // Individual field analysis
      console.log('[Field Analysis] businessObjective:', {
        exists: !!aiResponse?.businessObjective,
        type: typeof aiResponse?.businessObjective,
        length: aiResponse?.businessObjective?.length || 0,
        value: aiResponse?.businessObjective
      });
      
      console.log('[Field Analysis] digitalTeam:', {
        exists: !!aiResponse?.digitalTeam,
        isArray: Array.isArray(aiResponse?.digitalTeam),
        length: aiResponse?.digitalTeam?.length || 0,
        structure: aiResponse?.digitalTeam?.map((agent: any) => ({ role: agent?.role, name: agent?.name })) || 'INVALID'
      });
      
      console.log('[Field Analysis] humanCheckpoints:', {
        exists: !!aiResponse?.humanCheckpoints,
        isArray: Array.isArray(aiResponse?.humanCheckpoints),
        length: aiResponse?.humanCheckpoints?.length || 0
      });
      
      console.log('[Field Analysis] agenticTimeline:', {
        exists: !!aiResponse?.agenticTimeline,
        hasPhases: !!aiResponse?.agenticTimeline?.phases,
        phasesIsArray: Array.isArray(aiResponse?.agenticTimeline?.phases),
        phasesLength: aiResponse?.agenticTimeline?.phases?.length || 0,
        totalDuration: aiResponse?.agenticTimeline?.totalDurationWeeks
      });
      
      console.log('[Field Analysis] kpiImprovements:', {
        exists: !!aiResponse?.kpiImprovements,
        isArray: Array.isArray(aiResponse?.kpiImprovements),
        length: aiResponse?.kpiImprovements?.length || 0
      });
      
      // 🆕 PHASE 1.4: Log ROI projection analysis
      console.log('[Field Analysis] roiProjection:', {
        exists: !!aiResponse?.roiProjection,
        hasRequiredFields: !!(aiResponse?.roiProjection?.roiPercentage && aiResponse?.roiProjection?.paybackMonths),
        roiPercentage: aiResponse?.roiProjection?.roiPercentage,
        paybackMonths: aiResponse?.roiProjection?.paybackMonths
      });

      // 🚨 STRICT VALIDATION - NO FALLBACKS
      if (!aiResponse) {
        throw new Error('AI provider returned null or undefined response. This indicates a fundamental API communication issue.');
      }

      if (typeof aiResponse !== 'object') {
        throw new Error(`AI provider returned invalid response type: ${typeof aiResponse}. Expected JSON object.`);
      }

      // Validate required fields with specific error messages
      const missingFields: string[] = [];
      const invalidFields: string[] = [];

      if (!aiResponse.businessObjective || typeof aiResponse.businessObjective !== 'string' || aiResponse.businessObjective.trim().length === 0) {
        missingFields.push('businessObjective (must be non-empty string)');
      }

      if (!aiResponse.digitalTeam || !Array.isArray(aiResponse.digitalTeam)) {
        missingFields.push('digitalTeam (must be array)');
      } else if (aiResponse.digitalTeam.length !== 5) {
        invalidFields.push(`digitalTeam has ${aiResponse.digitalTeam.length} agents, must have exactly 5`);
      }

      if (!aiResponse.humanCheckpoints || !Array.isArray(aiResponse.humanCheckpoints)) {
        missingFields.push('humanCheckpoints (must be array)');
      } else if (aiResponse.humanCheckpoints.length !== 4) {
        invalidFields.push(`humanCheckpoints has ${aiResponse.humanCheckpoints.length} items, must have exactly 4`);
      }

      if (!aiResponse.agenticTimeline) {
        missingFields.push('agenticTimeline (must be object)');
      } else {
        if (!aiResponse.agenticTimeline.phases || !Array.isArray(aiResponse.agenticTimeline.phases)) {
          missingFields.push('agenticTimeline.phases (must be array)');
        } else if (aiResponse.agenticTimeline.phases.length !== 3) {
          invalidFields.push(`agenticTimeline.phases has ${aiResponse.agenticTimeline.phases.length} phases, must have exactly 3 (crawl, walk, run)`);
        }
        
        if (!aiResponse.agenticTimeline.totalDurationWeeks || typeof aiResponse.agenticTimeline.totalDurationWeeks !== 'number') {
          missingFields.push('agenticTimeline.totalDurationWeeks (must be number)');
        }
      }

      if (!aiResponse.kpiImprovements || !Array.isArray(aiResponse.kpiImprovements)) {
        missingFields.push('kpiImprovements (must be array)');
      } else if (aiResponse.kpiImprovements.length < 3) {
        invalidFields.push(`kpiImprovements has ${aiResponse.kpiImprovements.length} items, must have at least 3`);
      }

      // 🚨 THROW DETAILED ERROR IF VALIDATION FAILS
      if (missingFields.length > 0 || invalidFields.length > 0) {
        const errorDetails = [
          missingFields.length > 0 ? `Missing fields: ${missingFields.join(', ')}` : '',
          invalidFields.length > 0 ? `Invalid fields: ${invalidFields.join(', ')}` : ''
        ].filter(Boolean).join('. ');

        console.error('=== AI RESPONSE VALIDATION FAILED ===');
        console.error('Error Details:', errorDetails);
        console.error('Provider:', preferredProvider || 'auto-selected');
        console.error('Model Capabilities:', modelCapabilities);
        console.error('Prompt Config:', promptConfig);
        
        throw new Error(`AI provider generated invalid response structure. ${errorDetails}. This may indicate prompt engineering issues or model limitations. Please try again or switch AI providers in admin settings.`);
      }

      // Additional validation warnings (log but don't fail)
      const warnings = validateAgenticBlueprintResponse(aiResponse);
      if (warnings && warnings.length > 0) {
        console.warn('=== AI RESPONSE QUALITY WARNINGS ===');
        warnings.forEach((warning: string, index: number) => {
          console.warn(`Warning ${index + 1}: ${warning}`);
        });
      }

      console.log('=== AI RESPONSE VALIDATION PASSED ===');

      // Transform AI response to AgenticBlueprint format (no fallbacks)
      const blueprint: AgenticBlueprint = {
        id: this.generateBlueprintId(),
        profileId: profile.id,
        userId: userId,
        businessObjective: aiResponse.businessObjective,
        digitalTeam: aiResponse.digitalTeam,
        humanCheckpoints: aiResponse.humanCheckpoints,
        agenticTimeline: {
          ...aiResponse.agenticTimeline,
          progressiveTrust: this.generateProgressiveTrustLevels(aiResponse.agenticTimeline)
        },
        kpiImprovements: aiResponse.kpiImprovements,
        roiProjection: aiResponse.roiProjection || roiProjection,  // 🆕 Use AI-generated ROI or fallback to calculated
        aiModel: preferredProvider || 'auto-selected',
        promptVersion: '3.1', // 🆕 Phase 1.4: ROI-enhanced prompt version
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // 🆕 If we calculated ROI but AI didn't generate one, use our calculation
      if (roiProjection && !aiResponse.roiProjection) {
        console.log('[ROI Integration] Using calculated ROI projection as AI did not provide one');
        blueprint.roiProjection = roiProjection;
      }
      
      // 🆕 Log quality score with ROI consideration
      const qualityScore = this.calculateBlueprintQualityScore(blueprint, profile);
      blueprint.qualityScore = qualityScore;
      console.log('[Quality Score] Blueprint quality assessment:', {
        score: qualityScore,
        hasROI: !!blueprint.roiProjection,
        kpiCount: blueprint.kpiImprovements.length,
        businessSpecificity: blueprint.businessObjective.length > 50 ? 'Good' : 'Needs improvement'
      });

      return blueprint;
    } catch (error: any) {
      console.error('=== AI BLUEPRINT GENERATION FAILED ===');
      console.error('[Error] Full error object:', error);
      console.error('[Error] Error message:', error.message);
      console.error('[Error] Error stack:', error.stack);
      console.error('[Error] Provider used:', preferredProvider || 'auto-selected');
      console.error('[Error] Model capabilities:', modelCapabilities);
      console.error('[Error] Prompt lengths - System:', systemPrompt?.length || 0, 'User:', userPrompt?.length || 0);
      
      // Provide specific troubleshooting guidance based on error type
      if (error.message?.includes('API error')) {
        console.error('[Troubleshooting] This is an AI provider API error. Check:');
        console.error('  1. Provider credentials in admin settings');
        console.error('  2. API key validity and billing status');
        console.error('  3. Provider service status');
        throw new Error(`AI provider API error: ${error.message}. Check your provider credentials and billing status in admin settings.`);
      }
      
      if (error.message?.includes('not configured')) {
        console.error('[Troubleshooting] No AI provider configured. Required steps:');
        console.error('  1. Go to /admin');
        console.error('  2. Add credentials for OpenAI, Google Gemini, or Anthropic Claude');
        console.error('  3. Test connection');
        console.error('  4. Set as default if needed');
        throw new Error('No AI provider configured. Please configure OpenAI, Google Gemini, or Anthropic Claude in admin settings (/admin).');
      }
      
      if (error.message?.includes('Failed to generate JSON')) {
        console.error('[Troubleshooting] AI failed to generate valid JSON. Possible causes:');
        console.error('  1. Model overloaded (try again)');
        console.error('  2. Prompt too complex for model');
        console.error('  3. Model context limit exceeded');
        console.error('  4. Provider temporary issue');
        throw new Error(`AI failed to generate valid response: ${error.message}. This may be temporary - try again or switch providers in admin settings.`);
      }
      
      if (error.message?.includes('AI provider generated invalid response structure')) {
        console.error('[Troubleshooting] AI response structure validation failed. This means:');
        console.error('  1. The AI model could not follow the required output format');
        console.error('  2. The prompt may need adjustment for this provider');
        console.error('  3. Try switching to a different AI provider');
        console.error('  4. The model may be having temporary issues');
        throw new Error(`AI provider could not generate proper response structure: ${error.message}. Try switching AI providers in admin settings or try again later.`);
      }
      
      if (error.message?.includes('Timeline structure invalid')) {
        console.error('[Troubleshooting] Internal timeline processing error. This is likely a code bug.');
        console.error('  This should be reported as it indicates validation logic is inconsistent.');
        throw new Error(`Internal error in timeline processing: ${error.message}. Please report this issue.`);
      }
      
      // Generic fallback error with troubleshooting steps
      console.error('[Troubleshooting] Unhandled error type. General steps:');
      console.error('  1. Check browser console for detailed logs');
      console.error('  2. Verify AI provider is working in admin settings');
      console.error('  3. Try switching AI providers');
      console.error('  4. Check if profile has sufficient data');
      
      throw new Error(`Blueprint generation failed: ${error.message || 'Unknown error'}. Check browser console for detailed troubleshooting information.`);
    }
  }

  /**
   * 🆕 Extract comprehensive business context from profile
   */
  private static extractBusinessContext(profile: Profile): BusinessContext {
    try {
      const industrySpecific = this.getIndustrySpecificContext(profile.industry);
      const companySpecific = this.getCompanySpecificContext(profile);
      const implementationContext = this.calculateImplementationContext(profile);

      return {
        industrySpecific,
        companySpecific,
        implementationContext
      };
    } catch (error) {
      console.error('[AgenticBlueprint] Error extracting business context:', error);
      // Return safe defaults if context extraction fails
      return {
        industrySpecific: {
          terminology: ['business process', 'operational efficiency'],
          commonTools: ['Business applications', 'Data analytics'],
          typicalKPIs: ['Operational efficiency', 'Cost reduction'],
          regulatoryRequirements: ['Industry standards'],
          riskFactors: ['Operational risk']
        },
        companySpecific: {
          systemsInventory: [],
          businessProblems: [],
          existingMetrics: [],
          priorityInitiatives: [],
          organizationalConstraints: []
        },
        implementationContext: {
          complexityScore: 50,
          timelineMultiplier: 1.0,
          riskLevel: 'medium',
          changeReadiness: 50
        }
      };
    }
  }

  /**
   * 🆕 Get industry-specific context for AI prompt enhancement
   */
  private static getIndustrySpecificContext(industry: string): BusinessContext['industrySpecific'] {
    const industryMap: Record<string, BusinessContext['industrySpecific']> = {
      'Manufacturing': {
        terminology: ['production planning', 'lean manufacturing', 'quality control', 'supply chain', 'throughput', 'OEE'],
        commonTools: ['ERP systems', 'MES platforms', 'WMS solutions', 'Quality management systems', 'Production planning tools'],
        typicalKPIs: ['Overall Equipment Effectiveness', 'First Pass Yield', 'Cycle Time', 'Inventory Turnover', 'Schedule Adherence'],
        regulatoryRequirements: ['ISO 9001', 'FDA compliance', 'OSHA safety standards', 'Environmental regulations'],
        riskFactors: ['Supply chain disruption', 'Equipment downtime', 'Quality control failures', 'Safety incidents']
      },
      'Technology': {
        terminology: ['deployment', 'scalability', 'DevOps', 'API integration', 'cloud architecture', 'microservices'],
        commonTools: ['CI/CD pipelines', 'Cloud platforms', 'Monitoring tools', 'API gateways', 'Container orchestration'],
        typicalKPIs: ['System uptime', 'Deployment frequency', 'Lead time', 'Mean time to recovery', 'Customer acquisition cost'],
        regulatoryRequirements: ['SOC 2', 'GDPR compliance', 'Data privacy laws', 'Security frameworks'],
        riskFactors: ['Security breaches', 'System outages', 'Data loss', 'Compliance violations']
      },
      'Healthcare': {
        terminology: ['patient care', 'clinical workflow', 'EHR integration', 'care coordination', 'clinical decision support'],
        commonTools: ['Electronic Health Records', 'PACS systems', 'Clinical decision support', 'Revenue cycle management'],
        typicalKPIs: ['Patient satisfaction', 'Clinical quality metrics', 'Length of stay', 'Readmission rates', 'Provider efficiency'],
        regulatoryRequirements: ['HIPAA', 'Joint Commission', 'CMS regulations', 'Clinical quality measures'],
        riskFactors: ['Patient safety', 'Privacy breaches', 'Regulatory non-compliance', 'Medical errors']
      },
      'Financial Services': {
        terminology: ['risk management', 'compliance', 'customer onboarding', 'fraud detection', 'regulatory reporting'],
        commonTools: ['Core banking systems', 'Risk management platforms', 'CRM systems', 'Trading platforms'],
        typicalKPIs: ['Customer acquisition cost', 'Loan processing time', 'Risk-adjusted returns', 'Compliance metrics'],
        regulatoryRequirements: ['SOX', 'Basel III', 'GDPR', 'PCI DSS', 'Anti-money laundering'],
        riskFactors: ['Regulatory penalties', 'Fraud losses', 'Market volatility', 'Cyber attacks']
      }
    };

    return industryMap[industry] || {
      terminology: ['business process', 'operational efficiency', 'performance optimization'],
      commonTools: ['Business applications', 'Data analytics', 'Process automation'],
      typicalKPIs: ['Operational efficiency', 'Cost reduction', 'Process improvement'],
      regulatoryRequirements: ['Industry standards', 'Data protection'],
      riskFactors: ['Operational risk', 'Compliance risk', 'Technology risk']
    };
  }

  /**
   * 🆕 Extract company-specific context from profile
   */
  private static getCompanySpecificContext(profile: Profile): BusinessContext['companySpecific'] {
    const systemsInventory = (profile.systemsAndApplications || []).map(sys => sys.name);
    const businessProblems = (profile.strategicInitiatives || []).flatMap(init => init.businessProblems || []);
    const existingMetrics = (profile.strategicInitiatives || []).flatMap(init => init.successMetrics || []);
    const priorityInitiatives = (profile.strategicInitiatives || [])
      .filter(init => init.priority === 'High')
      .map(init => init.initiative);

    // Generate organizational constraints based on company size
    const organizationalConstraints = this.generateOrganizationalConstraints(profile);

    return {
      systemsInventory,
      businessProblems,
      existingMetrics,
      priorityInitiatives,
      organizationalConstraints
    };
  }

  /**
   * 🆕 Calculate implementation context for timeline and complexity assessment
   */
  private static calculateImplementationContext(profile: Profile): BusinessContext['implementationContext'] {
    let complexityScore = 0;
    let timelineMultiplier = 1.0;
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    let changeReadiness = 50; // Default moderate readiness

    // Factor in company size
    const employeeCount = this.parseEmployeeCount(profile.employeeCount);
    if (employeeCount > 1000) {
      complexityScore += 30;
      timelineMultiplier *= 1.5;
      riskLevel = 'high';
    } else if (employeeCount > 250) {
      complexityScore += 15;
      timelineMultiplier *= 1.2;
      riskLevel = 'medium';
    }

    // Factor in number of systems
    const systemCount = (profile.systemsAndApplications || []).length;
    complexityScore += systemCount * 5;
    timelineMultiplier *= (1 + systemCount * 0.1);

    // Factor in number of high-priority initiatives
    const highPriorityCount = (profile.strategicInitiatives || [])
      .filter(init => init.priority === 'High').length;
    complexityScore += highPriorityCount * 10;

    // Industry-specific risk adjustment
    if (['Healthcare', 'Financial Services'].includes(profile.industry)) {
      riskLevel = riskLevel === 'low' ? 'medium' : 'high';
      changeReadiness -= 15; // More conservative in regulated industries
    }

    return {
      complexityScore: Math.min(complexityScore, 100),
      timelineMultiplier: Math.min(timelineMultiplier, 2.0),
      riskLevel,
      changeReadiness: Math.max(20, Math.min(changeReadiness, 100))
    };
  }

  /**
   * 🆕 Generate organizational constraints based on company characteristics
   */
  private static generateOrganizationalConstraints(profile: Profile): string[] {
    const constraints: string[] = [];
    const employeeCount = this.parseEmployeeCount(profile.employeeCount);

    // Size-based constraints
    if (employeeCount < 50) {
      constraints.push('Limited IT resources for implementation');
      constraints.push('Need for simple, low-maintenance solutions');
    } else if (employeeCount > 1000) {
      constraints.push('Complex approval processes required');
      constraints.push('Multiple stakeholder alignment needed');
      constraints.push('Enterprise security and compliance requirements');
    }

    // Industry-specific constraints
    if (['Healthcare', 'Financial Services'].includes(profile.industry)) {
      constraints.push('Strict regulatory compliance requirements');
      constraints.push('Extensive documentation and audit trails needed');
    }

    // System complexity constraints
    const systemCount = (profile.systemsAndApplications || []).length;
    if (systemCount > 5) {
      constraints.push('Complex system integration requirements');
      constraints.push('Data consistency across multiple platforms');
    }

    return constraints;
  }

  /**
   * 🆕 Map strategic initiatives to agent capabilities
   */
  private static mapInitiativesToAgentCapabilities(initiatives: Profile['strategicInitiatives']): Record<string, string[]> {
    const mapping: Record<string, string[]> = {
      coordinator: [],
      researcher: [],
      analyst: [],
      'quality-checker': [],
      actuator: []
    };

    (initiatives || []).forEach(initiative => {
      const problems = initiative.businessProblems || [];
      
      problems.forEach(problem => {
        const lowerProblem = problem.toLowerCase();
        
        // Map problems to appropriate agent roles
        if (lowerProblem.includes('planning') || lowerProblem.includes('scheduling') || lowerProblem.includes('coordination')) {
          mapping.coordinator.push(problem);
        }
        if (lowerProblem.includes('data') || lowerProblem.includes('information') || lowerProblem.includes('search')) {
          mapping.researcher.push(problem);
        }
        if (lowerProblem.includes('analysis') || lowerProblem.includes('insights') || lowerProblem.includes('reporting')) {
          mapping.analyst.push(problem);
        }
        if (lowerProblem.includes('quality') || lowerProblem.includes('compliance') || lowerProblem.includes('error')) {
          mapping['quality-checker'].push(problem);
        }
        if (lowerProblem.includes('process') || lowerProblem.includes('execution') || lowerProblem.includes('automation')) {
          mapping.actuator.push(problem);
        }
      });
    });

    return mapping;
  }

  /**
   * 🆕 Calculate timeline recommendation based on business context
   */
  private static calculateTimelineRecommendation(context: BusinessContext): {
    totalWeeks: number;
    crawlWeeks: number;
    walkWeeks: number;
    runWeeks: number;
    rationale: string;
  } {
    const baseWeeks = 24;
    const adjustedWeeks = Math.round(baseWeeks * context.implementationContext.timelineMultiplier);
    
    // Distribute phases based on risk level
    let crawlRatio = 0.33;
    let walkRatio = 0.42;
    let runRatio = 0.25;

    if (context.implementationContext.riskLevel === 'high') {
      crawlRatio = 0.42;
      walkRatio = 0.33;
      runRatio = 0.25;
    } else if (context.implementationContext.riskLevel === 'low') {
      crawlRatio = 0.25;
      walkRatio = 0.42;
      runRatio = 0.33;
    }

    const crawlWeeks = Math.round(adjustedWeeks * crawlRatio);
    const walkWeeks = Math.round(adjustedWeeks * walkRatio);
    const runWeeks = adjustedWeeks - crawlWeeks - walkWeeks;

    const rationale = `Timeline adjusted for ${context.implementationContext.riskLevel} risk level and complexity score of ${context.implementationContext.complexityScore}`;

    return {
      totalWeeks: adjustedWeeks,
      crawlWeeks,
      walkWeeks,
      runWeeks,
      rationale
    };
  }

  /**
   * 🆕 Generate industry-specific constraints for AI prompt
   */
  private static generateIndustryConstraints(industry: string, context: BusinessContext): string[] {
    const constraints: string[] = [];
    
    // Add regulatory constraints
    constraints.push(...context.industrySpecific.regulatoryRequirements.map(req => 
      `Must comply with ${req} regulations`
    ));
    
    // Add risk-based constraints
    constraints.push(...context.industrySpecific.riskFactors.map(risk => 
      `Must mitigate ${risk.toLowerCase()}`
    ));
    
    // Add organizational constraints
    constraints.push(...context.companySpecific.organizationalConstraints);
    
    return constraints;
  }

  /**
   * 🆕 Helper to parse employee count from string or number
   */
  private static parseEmployeeCount(employeeCount?: string | number): number {
    if (!employeeCount) return 100; // Default assumption
    
    // Handle if it's already a number
    if (typeof employeeCount === 'number') {
      return employeeCount;
    }
    
    // Handle if it's a string
    if (typeof employeeCount === 'string') {
      const number = parseInt(employeeCount.replace(/[^0-9]/g, ''));
      return isNaN(number) ? 100 : number;
    }
    
    // Fallback for any other type
    return 100;
  }

  /**
   * 🆕 PHASE 3.4: Detect model capabilities for feature optimization
   */
  private static detectModelCapabilities(preferredProvider?: string): {
    provider: 'openai' | 'claude' | 'gemini' | undefined;
    supportsAdaptiveThinking: boolean;
    supportsExtendedThinking: boolean;
    supportsStructuredOutputs: boolean;
  } {
    const provider = this.normalizeProviderName(preferredProvider);
    
    switch (provider) {
      case 'openai':
        return {
          provider: 'openai',
          supportsAdaptiveThinking: false,
          supportsExtendedThinking: false,
          supportsStructuredOutputs: true // May 2025 feature
        };
      case 'claude':
        return {
          provider: 'claude',
          supportsAdaptiveThinking: false,
          supportsExtendedThinking: true, // Extended thinking mode
          supportsStructuredOutputs: false
        };
      case 'gemini':
        return {
          provider: 'gemini',
          supportsAdaptiveThinking: true, // Gemini 2.5 adaptive thinking
          supportsExtendedThinking: false,
          supportsStructuredOutputs: false
        };
      default:
        return {
          provider: undefined,
          supportsAdaptiveThinking: false,
          supportsExtendedThinking: false,
          supportsStructuredOutputs: false
        };
    }
  }

  /**
   * 🆕 Normalize provider name for capability detection
   */
  private static normalizeProviderName(provider?: string): 'openai' | 'claude' | 'gemini' | undefined {
    if (!provider) return undefined;
    
    const lowerProvider = provider.toLowerCase();
    if (lowerProvider.includes('openai') || lowerProvider.includes('gpt')) {
      return 'openai';
    }
    if (lowerProvider.includes('claude') || lowerProvider.includes('anthropic')) {
      return 'claude';
    }
    if (lowerProvider.includes('gemini') || lowerProvider.includes('google')) {
      return 'gemini';
    }
    
    return undefined;
  }

  /**
   * 🆕 Map change readiness score to level
   */
  private static mapChangeReadinessToLevel(changeReadiness: number): 'low' | 'medium' | 'high' {
    if (changeReadiness < 40) return 'low';
    if (changeReadiness < 70) return 'medium';
    return 'high';
  }



  /**
   * 🆕 Generate progressive trust levels for the timeline
   */
  private static generateProgressiveTrustLevels(timeline: any): any[] {
    console.log('[generateProgressiveTrustLevels] Input timeline:', JSON.stringify(timeline, null, 2));
    
    const trustLevels: any[] = [];
    let currentWeek = 1;
    
    // Add safety check for timeline structure - this should NOT happen if validation passed
    if (!timeline || !timeline.phases || !Array.isArray(timeline.phases)) {
      console.error('[generateProgressiveTrustLevels] CRITICAL: Timeline structure invalid after validation passed!');
      console.error('[generateProgressiveTrustLevels] Timeline:', timeline);
      throw new Error('Internal error: Timeline structure is invalid after passing validation. This indicates a bug in the validation logic.');
    }
    
    console.log('[generateProgressiveTrustLevels] Processing', timeline.phases.length, 'phases');
    
    timeline.phases.forEach((phase: any, index: number) => {
      console.log(`[generateProgressiveTrustLevels] Phase ${index + 1}:`, {
        phase: phase.phase,
        name: phase.name,
        durationWeeks: phase.durationWeeks,
        hasRiskMitigations: !!phase.riskMitigations
      });
      
      const phaseWeeks = phase.durationWeeks || 8;
      const startTrust = phase.phase === 'crawl' ? 20 : phase.phase === 'walk' ? 50 : 80;
      const endTrust = phase.phase === 'crawl' ? 40 : phase.phase === 'walk' ? 75 : 95;
      
      // Generate trust level for middle of phase
      const midWeek = currentWeek + Math.floor(phaseWeeks / 2);
      const midTrust = (startTrust + endTrust) / 2;
      
      const trustLevel = {
        week: midWeek,
        trustLevel: midTrust,
        autonomyDescription: `${phase.phase.charAt(0).toUpperCase() + phase.phase.slice(1)} phase autonomy`,
        safeguards: phase.riskMitigations || []
      };
      
      console.log(`[generateProgressiveTrustLevels] Generated trust level for phase ${phase.phase}:`, trustLevel);
      
      trustLevels.push(trustLevel);
      currentWeek += phaseWeeks;
    });
    
    console.log('[generateProgressiveTrustLevels] Final trust levels:', trustLevels);
    return trustLevels;
  }

  /**
   * Generate a unique blueprint ID
   */
  private static generateBlueprintId(): string {
    return `blueprint_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Validate profile readiness for blueprint generation
   * @param profile - Client profile data
   * @returns Validation result with readiness score and recommendations
   */
  static validateProfileReadiness(profile: Profile): {
    isReady: boolean;
    readinessScore: number;
    recommendations: string[];
  } {
    const recommendations: string[] = [];
    let score = 0;

    // Check strategic initiatives (40 points max)
    const initiatives = profile.strategicInitiatives || [];
    if (initiatives.length === 0) {
      recommendations.push('Add at least one strategic initiative with business problems');
    } else {
      score += Math.min(initiatives.length * 10, 30);
      
      // Check for business problems
      const initiativesWithProblems = initiatives.filter(init => 
        init.businessProblems && init.businessProblems.length > 0
      );
      
      if (initiativesWithProblems.length === 0) {
        recommendations.push('Add specific business problems to your strategic initiatives');
      } else {
        score += 10;
      }
    }

    // Check systems and applications (30 points max)
    const systems = profile.systemsAndApplications || [];
    if (systems.length === 0) {
      recommendations.push('Add your current systems and applications to understand integration opportunities');
    } else {
      score += Math.min(systems.length * 5, 20);
      
      // Bonus for system details
      const detailedSystems = systems.filter(sys => sys.description && sys.description.length > 0);
      if (detailedSystems.length > 0) {
        score += 10;
      }
    }

    // Check company information (20 points max)
    if (!profile.industry || !profile.employeeCount) {
      recommendations.push('Complete company information (industry and employee count)');
    } else {
      score += 20;
    }

    // Check for outcomes and metrics (10 points max)
    const initiativesWithOutcomes = initiatives.filter(init => 
      (init.expectedOutcomes && init.expectedOutcomes.length > 0) ||
      (init.successMetrics && init.successMetrics.length > 0)
    );
    
    if (initiativesWithOutcomes.length === 0) {
      recommendations.push('Add expected outcomes and success metrics to your initiatives');
    } else {
      score += 10;
    }

    return {
      isReady: score >= 50, // Minimum 50% readiness required
      readinessScore: score,
      recommendations
    };
  }

  /**
   * Analyze blueprint effectiveness and provide improvement suggestions
   * @param blueprint - Generated blueprint
   * @param profile - Original profile data
   * @returns Analysis with effectiveness score and suggestions
   */
  static analyzeBlueprint(blueprint: AgenticBlueprint, profile: Profile): {
    effectivenessScore: number;
    strengths: string[];
    improvementSuggestions: string[];
  } {
    const strengths: string[] = [];
    const improvements: string[] = [];
    let score = 0;

    // Analyze business objective clarity (20 points)
    if (blueprint.businessObjective && blueprint.businessObjective.length > 50) {
      score += 20;
      strengths.push('Clear, specific business objective defined');
    } else {
      improvements.push('Business objective could be more specific and measurable');
    }

    // Analyze digital team completeness (25 points)
    if (blueprint.digitalTeam.length === 5) {
      score += 15;
      
      // Check for role diversity
      const roles = blueprint.digitalTeam.map(agent => agent.role);
      const uniqueRoles = new Set(roles);
      if (uniqueRoles.size === 5) {
        score += 10;
        strengths.push('Complete digital team with all 5 specialized roles');
      }
    } else {
      improvements.push('Digital team should have exactly 5 specialized agents');
    }

    // Analyze human oversight design (20 points)
    if (blueprint.humanCheckpoints.length === 4) {
      score += 20;
      strengths.push('Comprehensive human oversight framework with all control points');
    } else {
      improvements.push('Human oversight should include all 4 critical checkpoints');
    }

    // Analyze timeline structure (20 points)
    if (blueprint.agenticTimeline.phases.length === 3) {
      score += 15;
      
      // Check for progressive trust model
      const phases = blueprint.agenticTimeline.phases.map(p => p.phase);
      if (phases.includes('crawl') && phases.includes('walk') && phases.includes('run')) {
        score += 5;
        strengths.push('Well-structured crawl-walk-run implementation timeline');
      }
    } else {
      improvements.push('Implementation timeline should follow the crawl-walk-run methodology');
    }

    // Analyze KPI alignment (15 points)
    if (blueprint.kpiImprovements.length >= 3) {
      score += 10;
      
      // Check for quantified improvements
      const quantifiedKPIs = blueprint.kpiImprovements.filter(kpi => 
        kpi.improvementPercent > 0 && kpi.targetValue
      );
      
      if (quantifiedKPIs.length === blueprint.kpiImprovements.length) {
        score += 5;
        strengths.push('All KPIs have quantified improvement targets');
      }
    } else {
      improvements.push('Should identify at least 3 key KPI improvements');
    }

    return {
      effectivenessScore: score,
      strengths,
      improvementSuggestions: improvements
    };
  }

  /**
   * Extract key insights from blueprint for executive summary
   * @param blueprint - Generated blueprint
   * @returns Executive insights
   */
  static extractExecutiveInsights(blueprint: AgenticBlueprint): {
    primaryObjective: string;
    keyBenefits: string[];
    implementationDuration: string;
    riskMitigations: string[];
    expectedROI: string;
  } {
    // Calculate total expected improvement
    const avgImprovement = blueprint.kpiImprovements.reduce((sum, kpi) => 
      sum + kpi.improvementPercent, 0
    ) / blueprint.kpiImprovements.length;

    // Extract risk mitigations from all phases
    const allRiskMitigations = blueprint.agenticTimeline.phases.flatMap(phase => 
      phase.riskMitigations
    );

    // Get unique risk mitigations
    const uniqueRiskMitigations = [...new Set(allRiskMitigations)];

    return {
      primaryObjective: blueprint.businessObjective,
      keyBenefits: blueprint.kpiImprovements.map(kpi => 
        `${kpi.kpi}: ${kpi.improvementPercent}% improvement`
      ),
      implementationDuration: `${blueprint.agenticTimeline.totalDurationWeeks} weeks`,
      riskMitigations: uniqueRiskMitigations.slice(0, 5), // Top 5 risk mitigations
      expectedROI: `${Math.round(avgImprovement)}% average improvement across key metrics`
    };
  }

  /**
   * Generate implementation checklist from blueprint
   * @param blueprint - Generated blueprint
   * @returns Structured implementation checklist
   */
  static generateImplementationChecklist(blueprint: AgenticBlueprint): {
    phase: string;
    weeks: number;
    tasks: Array<{
      category: string;
      task: string;
      owner: string;
      priority: 'High' | 'Medium' | 'Low';
    }>;
  }[] {
    return blueprint.agenticTimeline.phases.map(phase => ({
      phase: phase.name,
      weeks: phase.durationWeeks,
      tasks: [
        ...phase.milestones.map(milestone => ({
          category: 'Milestone',
          task: milestone,
          owner: 'Project Team',
          priority: 'High' as const
        })),
        ...phase.riskMitigations.map(risk => ({
          category: 'Risk Mitigation',
          task: risk,
          owner: 'Risk Manager',
          priority: 'Medium' as const
        })),
        {
          category: 'Human Oversight',
          task: phase.humanInvolvement,
          owner: 'Leadership Team',
          priority: 'High' as const
        }
      ]
    }));
  }

  /**
   * Calculate blueprint quality score
   * @param blueprint - Generated blueprint
   * @param profile - Original profile data
   * @returns Quality score
   */
  private static calculateBlueprintQualityScore(blueprint: AgenticBlueprint, profile: Profile): number {
    let score = 0;

    // Check business objective clarity (20 points)
    if (blueprint.businessObjective && blueprint.businessObjective.length > 50) {
      score += 20;
    }

    // Check digital team completeness (25 points)
    if (blueprint.digitalTeam.length === 5) {
      score += 15;
    }

    // Check human oversight design (20 points)
    if (blueprint.humanCheckpoints.length === 4) {
      score += 20;
    }

    // Check timeline structure (20 points)
    if (blueprint.agenticTimeline.phases.length === 3) {
      score += 15;
    }

    // Check KPI alignment (15 points)
    if (blueprint.kpiImprovements.length >= 3) {
      score += 10;
    }

    // Check ROI projection (10 points)
    if (blueprint.roiProjection) {
      score += 10;
    }

    return score;
  }
} 