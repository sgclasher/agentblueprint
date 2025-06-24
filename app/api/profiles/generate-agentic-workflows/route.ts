import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import { aiService } from '../../../services/aiService';
import { 
  WORKFLOW_ANALYSIS_SYSTEM_PROMPT, 
  generateWorkflowAnalysisPrompt 
} from '../../../lib/llm/prompts/agenticWorkflowPrompts';
import { AgenticWorkflowService } from '../../../services/agenticWorkflowService';
import { Profile, PersonalizedWorkflow } from '../../../services/types';
import { getUser } from '../../../lib/supabase';

// Initialize Supabase client with service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Validates and enhances AI-generated workflow recommendations
 */
function validateAndEnhanceWorkflows(aiResponse: any, profile: Profile): PersonalizedWorkflow[] {
  console.log('🔧 [Workflow Generator] Validating and enhancing AI response...');
  
  // Get predefined workflow patterns for reference
  const predefinedWorkflows = AgenticWorkflowService.getPersonalizedWorkflows(profile);
  
  if (!aiResponse.workflows || !Array.isArray(aiResponse.workflows)) {
    console.log('🔧 [Workflow Generator] No workflows in response, using predefined patterns');
    return predefinedWorkflows.slice(0, 5); // Return top 5 predefined workflows
  }
  
  // Enhance AI-generated workflows with our structured data
  const enhancedWorkflows: PersonalizedWorkflow[] = aiResponse.workflows.map((aiWorkflow: any, index: number) => {
    // Find matching predefined pattern for structure
    const matchingPattern = predefinedWorkflows.find(p => 
      p.category === aiWorkflow.category || 
      p.name.toLowerCase().includes(aiWorkflow.name?.toLowerCase() || '')
    );
    
    if (matchingPattern) {
      // Use predefined pattern as base and enhance with AI insights
      return {
        ...matchingPattern,
        name: aiWorkflow.name || matchingPattern.name,
        description: aiWorkflow.description || matchingPattern.description,
        businessObjective: aiWorkflow.businessObjective || matchingPattern.businessObjective,
        customizedFor: {
          ...matchingPattern.customizedFor,
          specificUseCase: aiWorkflow.specificUseCase || matchingPattern.customizedFor?.specificUseCase || `Generic implementation for ${profile.industry}`
        },
        // Update ROI if AI provided better estimates
        roiMetrics: aiWorkflow.roiAnalysis ? {
          estimatedCostSavings: {
            annual: aiWorkflow.roiAnalysis.estimatedAnnualSavings || matchingPattern.roiMetrics?.estimatedCostSavings?.annual || 100000,
            confidence: matchingPattern.roiMetrics?.estimatedCostSavings?.confidence || 75,
            breakdown: matchingPattern.roiMetrics?.estimatedCostSavings?.breakdown || []
          },
          implementationCost: {
            low: matchingPattern.roiMetrics?.implementationCost?.low || 25000,
            high: matchingPattern.roiMetrics?.implementationCost?.high || 50000,
            breakdown: matchingPattern.roiMetrics?.implementationCost?.breakdown || []
          },
          paybackPeriod: aiWorkflow.roiAnalysis.paybackPeriod || matchingPattern.roiMetrics?.paybackPeriod || '6-12 months',
          roi3Year: matchingPattern.roiMetrics?.roi3Year || 350,
          efficiencyGains: matchingPattern.roiMetrics?.efficiencyGains || {
            timeReduction: '50% improvement',
            resourceReduction: 'Reduced manual effort',
            qualityImprovement: 'Improved accuracy'
          }
        } : matchingPattern.roiMetrics || {
          estimatedCostSavings: { annual: 100000, confidence: 75, breakdown: [] },
          implementationCost: { low: 25000, high: 50000, breakdown: [] },
          paybackPeriod: '6-12 months',
          roi3Year: 350,
          efficiencyGains: {
            timeReduction: '50% improvement',
            resourceReduction: 'Reduced manual effort',
            qualityImprovement: 'Improved accuracy'
          }
        },
        // Keep structured workflow steps from pattern
        workflowSteps: matchingPattern.workflowSteps,
        // Keep governance and risk assessment from pattern
        governanceCheckpoints: matchingPattern.governanceCheckpoints || [],
        riskAssessment: matchingPattern.riskAssessment || {
          overallRiskLevel: 'Medium',
          riskFactors: [],
          mitigationStrategies: ['Implement human oversight for critical decisions'],
          complianceRequirements: [],
          securityConsiderations: ['Secure data handling'],
          operationalRisks: [],
          reputationalRisks: [],
          financialRisks: []
        }
      };
    } else {
      // Create new workflow from AI response with fallback structure
      return {
        id: `ai-generated-${index}`,
        name: aiWorkflow.name || `AI Workflow ${index + 1}`,
        category: aiWorkflow.category || 'Process Automation',
        description: aiWorkflow.description || 'AI-generated workflow recommendation',
        businessObjective: aiWorkflow.businessObjective || 'Improve efficiency and reduce costs',
        
        // Use first predefined pattern as template for structure
        industryFit: predefinedWorkflows[0]?.industryFit || [profile.industry],
        companySizeFit: predefinedWorkflows[0]?.companySizeFit || ['SMB', 'Mid-Market'],
        maturityRequired: 'Medium',
        
        workflowSteps: aiWorkflow.workflowSteps || predefinedWorkflows[0]?.workflowSteps || [],
        governanceCheckpoints: predefinedWorkflows[0]?.governanceCheckpoints || [],
        riskAssessment: predefinedWorkflows[0]?.riskAssessment || {
          overallRiskLevel: 'Medium',
          riskFactors: [],
          mitigationStrategies: [],
          complianceRequirements: [],
          securityConsiderations: [],
          operationalRisks: [],
          reputationalRisks: [],
          financialRisks: []
        },
        
        roiMetrics: {
          estimatedCostSavings: {
            annual: aiWorkflow.roiAnalysis?.estimatedAnnualSavings || 100000,
            confidence: 75,
            breakdown: []
          },
          efficiencyGains: {
            timeReduction: '50% faster processing',
            resourceReduction: 'Reduced manual effort',
            qualityImprovement: 'Improved accuracy'
          },
          implementationCost: {
            low: 25000,
            high: 50000,
            breakdown: []
          },
          paybackPeriod: aiWorkflow.roiAnalysis?.paybackPeriod || '6-12 months',
          roi3Year: 350
        },
        
        successCriteria: aiWorkflow.successCriteria || ['Improve efficiency', 'Reduce costs'],
        kpis: [],
        implementationPhases: [],
        timeToValue: '3-6 months',
        complexityScore: 5,
        
        // Personalization fields
        profileId: profile.id,
        userId: profile.id,
        customizedFor: {
          industry: profile.industry,
          companySize: profile.employeeCount || 'Unknown',
          specificUseCase: aiWorkflow.specificUseCase || `Generic implementation for ${profile.industry}`
        },
        selectedGovernanceLevel: 'Standard',
        preferredImplementationSpeed: 'Balanced',
        riskTolerance: 'Medium',
        status: 'Draft',
        hasTimeline: false,
        
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
  });
  
  console.log('🔧 [Workflow Generator] Enhanced', enhancedWorkflows.length, 'workflows');
  return enhancedWorkflows;
}

export async function POST(request: NextRequest) {
  try {
    const { preferredProvider, forceRegenerate = false } = await request.json();

    // Verify authentication and get user
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get the user's profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (profileError) {
      if (profileError.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Profile not found. Please create a profile first.' },
          { status: 404 }
        );
      }
      console.error('[Workflow Generator] Profile fetch error:', profileError);
      throw profileError;
    }

    // Transform profile to match expected format
    const profile = {
      id: profileData.id,
      ...profileData.profile_data,
      markdown: profileData.markdown_content,
      createdAt: profileData.created_at,
      updatedAt: profileData.updated_at,
    };

    // Check for cached workflows (unless forcing regeneration)
    if (!forceRegenerate) {
      const { data: cacheData, error: cacheError } = await supabase
        .from('profiles')
        .select('agentic_workflows_cache')
        .eq('user_id', user.id)
        .single();
        
      const cachedWorkflows = cacheData?.agentic_workflows_cache || null;
      
      if (cachedWorkflows) {
        return NextResponse.json({
          success: true,
          workflows: cachedWorkflows.workflows,
          analysis: cachedWorkflows.analysis,
          cached: true,
          provider: cachedWorkflows.analysisMetadata?.provider || 'cached'
        });
      }
    }

    // Check if user has any AI providers configured
    const isAIConfigured = await aiService.isConfigured(user.id, CredentialsRepository, preferredProvider);
    if (!isAIConfigured) {
      return NextResponse.json(
        {
          success: false,
          error: 'No AI provider configured. Please configure an AI provider in admin settings.',
          requiresSetup: true
        },
        { status: 400 }
      );
    }

    // Generate AI workflow recommendations
    const systemPrompt = WORKFLOW_ANALYSIS_SYSTEM_PROMPT;
    const userPrompt = generateWorkflowAnalysisPrompt(profile);

    console.log('🤖 [Workflow Generator] Sending to AI service...');
    const aiStatus = await aiService.getStatus(user.id, CredentialsRepository, preferredProvider);
    const actualProvider = aiStatus.provider || 'unknown';
    console.log('🤖 [Workflow Generator] Actual provider:', actualProvider);

    const aiResponse = await aiService.generateJson(
      systemPrompt,
      userPrompt,
      user.id,
      CredentialsRepository,
      preferredProvider
    );

    console.log('✅ [Workflow Generator] AI response received');

    // Validate and enhance the AI response
    const enhancedWorkflows = validateAndEnhanceWorkflows(aiResponse, profile);

    // Create the final analysis package
    const workflowAnalysis = {
      workflows: enhancedWorkflows,
      analysis: {
        profileSummary: {
          company: profile.companyName,
          industry: profile.industry,
          size: profile.employeeCount,
          initiativesCount: profile.strategicInitiatives?.length || 0
        },
        recommendations: {
          totalWorkflows: enhancedWorkflows.length,
          quickWins: enhancedWorkflows.filter(w => (w.complexityScore || 0) <= 4).length,
          transformational: enhancedWorkflows.filter(w => (w.complexityScore || 0) >= 7).length,
          averageROI: enhancedWorkflows.length > 0 ? Math.round(enhancedWorkflows.reduce((sum, w) => sum + (w.roiMetrics?.roi3Year || 0), 0) / enhancedWorkflows.length) : 0
        },
        implementationGuidance: {
          recommendedSequence: enhancedWorkflows.map(w => w.name),
          totalInvestment: {
            low: enhancedWorkflows.reduce((sum, w) => sum + (w.roiMetrics?.implementationCost?.low || 0), 0),
            high: enhancedWorkflows.reduce((sum, w) => sum + (w.roiMetrics?.implementationCost?.high || 0), 0)
          },
          totalAnnualSavings: enhancedWorkflows.reduce((sum, w) => sum + (w.roiMetrics?.estimatedCostSavings?.annual || 0), 0)
        },
        riskAssessment: {
          overallRisk: 'Medium',
          keyMitigations: [
            'Implement phased rollout approach',
            'Maintain human oversight for critical decisions',
            'Establish clear governance checkpoints',
            'Ensure robust fallback procedures'
          ]
        },
        aiInsights: aiResponse
      },
      generatedAt: new Date().toISOString(),
      profileId: profile.id,
      analysisMetadata: {
        provider: actualProvider,
        version: '1.0',
        workflowPatterns: enhancedWorkflows.length,
        aiGenerated: true,
        enhancedWithPredefined: true
      }
    };

    // Cache the workflow analysis
    await supabase
      .from('profiles')
      .update({
        agentic_workflows_cache: workflowAnalysis,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    return NextResponse.json({
      success: true,
      workflows: workflowAnalysis.workflows,
      analysis: workflowAnalysis.analysis,
      cached: false,
      provider: actualProvider
    });

  } catch (error: any) {
    console.error('[Workflow Generator] Generation failed:', error);

    let errorMessage = 'Failed to generate agentic workflow recommendations';
    let statusCode = 500;
    
    if (error.message?.includes('No AI provider configured')) {
      errorMessage = 'No AI provider configured. Please set up an AI provider in admin settings.';
      statusCode = 400;
    } else if (error.message?.includes('rate limit') || error.message?.includes('quota')) {
      errorMessage = 'AI service rate limit exceeded. Please try again later.';
      statusCode = 429;
    } else if (error.message?.includes('Authentication failed')) {
      errorMessage = 'Authentication failed. Please sign in again.';
      statusCode = 401;
    } else if (error.message?.includes('Profile not found')) {
      errorMessage = 'Profile not found. Please create your profile before generating workflows.';
      statusCode = 404;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: statusCode }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get cached workflows
    const { data, error } = await supabase
      .from('profiles')
      .select('agentic_workflows_cache')
      .eq('user_id', user.id)
      .single();
      
    if (error && error.code !== 'PGRST116') {
      console.error('[Workflow Generator] Cache fetch error:', error);
      throw error;
    }
    
    const cachedWorkflows = data?.agentic_workflows_cache || null;

    if (!cachedWorkflows) {
      return NextResponse.json({
        success: true,
        hasWorkflows: false,
        cached: false,
        message: 'No cached workflows found'
      });
    }

    return NextResponse.json({
      success: true,
      hasWorkflows: true,
      workflows: cachedWorkflows.workflows,
      analysis: cachedWorkflows.analysis,
      cached: true,
      provider: cachedWorkflows.analysisMetadata?.provider || 'cached'
    });

  } catch (error: any) {
    console.error('[Workflow Generator] Get cached failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve cached workflows',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
} 