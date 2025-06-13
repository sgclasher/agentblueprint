import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getUser } from '../../../lib/supabase';
import { ProfileExtractionService } from '../../../services/profileExtractionService';
import { postProcessProfile } from '../../../lib/profileFieldMapper';

/**
 * Analyze complex field extraction to identify what was found vs missing
 */
function analyzeComplexFieldExtraction(extractedData: Record<string, ExtractedField>) {
  const criticalFields = [
    'companyName',
    'industry',
    'employeeCount', 
    'annualRevenue',
    'primaryLocation',
    'websiteUrl',
    'strategicInitiatives'
  ];

  const fieldsFound: string[] = [];
  const fieldsMissing: string[] = [];

  criticalFields.forEach(field => {
    if (extractedData[field] && extractedData[field].value !== undefined && extractedData[field].value !== null) {
      // Check if array fields have content
      if (Array.isArray(extractedData[field].value)) {
        if (extractedData[field].value.length > 0) {
          fieldsFound.push(field);
        } else {
          fieldsMissing.push(`${field} (empty array)`);
        }
      } else if (typeof extractedData[field].value === 'string') {
        // Check if string fields have meaningful content
        if (extractedData[field].value.trim().length > 0) {
          fieldsFound.push(field);
        } else {
          fieldsMissing.push(`${field} (empty string)`);
        }
      } else {
        fieldsFound.push(field);
      }
    } else {
      fieldsMissing.push(field);
    }
  });

  return {
    fieldsFound,
    fieldsMissing,
    foundCount: fieldsFound.length,
    missingCount: fieldsMissing.length,
    extractionRate: (fieldsFound.length / criticalFields.length * 100).toFixed(1) + '%'
  };
}

interface RequestBody {
  markdown: string;
  preferredProvider?: string;
}

interface ExtractedField {
  value: any;
  confidence: number;
}

interface ExtractionResult {
  success: boolean;
  data: Record<string, ExtractedField> | null;
  hasLowConfidenceFields: boolean;
  lowConfidenceFields: string[];
  validationWarnings: string[];
  averageConfidence: number;
  error?: string;
}

interface ExtractionSummary {
  totalFields: number;
  highConfidenceFields: number;
  mediumConfidenceFields: number;
  lowConfidenceFields: number;
  extractedSections: string[];
}

interface ExtractionResponse {
  success: boolean;
  extractionResult?: {
    success: boolean;
    data: Record<string, ExtractedField> | null;
    hasLowConfidenceFields: boolean;
    lowConfidenceFields: string[];
    validationWarnings: string[];
    averageConfidence: number;
    mappedProfile: any;
    summary: ExtractionSummary;
  };
  error?: string;
  details?: any;
}

export async function POST(request: NextRequest): Promise<NextResponse<ExtractionResponse>> {
  try {
    // Parse request body
    const body: RequestBody = await request.json();
    const { markdown, preferredProvider } = body;

    if (!markdown || typeof markdown !== 'string' || markdown.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Markdown content is required' },
        { status: 400 }
      );
    }

    // Use Authorization header pattern (matches /api/timeline/generate-from-profile)
    const user = await getUser(request);
    
    if (!user) {
      console.warn('❌ Authentication failed for markdown extraction');
      return NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in to use this feature.' },
        { status: 401 }
      );
    }
    
    console.log('🔐 Markdown extraction auth check:', { 
      authenticated: true,
      userId: user.id 
    });

    // Provider-specific logging and recommendations
    const isGemini = preferredProvider && preferredProvider.toLowerCase().includes('gemini');
    const isOpenAI = preferredProvider && preferredProvider.toLowerCase().includes('openai');
    
    console.log(`🤖 [ProfileExtractionAPI] Provider analysis:`, {
      requestedProvider: preferredProvider || 'default',
      isGemini,
      isOpenAI,
      recommendation: isGemini 
        ? 'Gemini being debugged - OpenAI GPT-4o recommended for profiles' 
        : isOpenAI 
          ? 'OpenAI GPT-4o - excellent choice for profile extraction'
          : 'Using default provider'
    });

    // Create extraction service instance
    const extractionService = new ProfileExtractionService();

    // Enhanced markdown analysis for debugging
    const markdownAnalysis = {
      characterCount: markdown.length,
      lineCount: markdown.split('\n').length,
      wordCount: markdown.split(/\s+/).length,
      containsHeaders: /^#{1,6}\s/m.test(markdown),
      containsLists: /^[-*]\s/m.test(markdown),
      containsProblems: /problem|challenge|issue|pain point/i.test(markdown),
      containsAI: /ai|artificial intelligence|automation|machine learning|ml/i.test(markdown),
      containsInitiatives: /initiative|project|strategic|goal/i.test(markdown),
      containsContact: /email|phone|linkedin|contact/i.test(markdown),
      containsCompanyInfo: /company|corporation|business|organization/i.test(markdown),
      hasStructuredContent: markdown.includes('**') || markdown.includes('##'),
      estimatedComplexity: markdown.length > 2000 ? 'high' : markdown.length > 1000 ? 'medium' : 'low'
    };

    console.log(`📊 [ProfileExtractionAPI] Markdown analysis:`, markdownAnalysis);

    // Gemini-specific pre-extraction warnings
    if (isGemini) {
      console.log(`🔧 [ProfileExtractionAPI] Gemini-specific analysis:`);
      
      if (markdownAnalysis.estimatedComplexity === 'high') {
        console.warn('⚠️ Complex markdown with Gemini - may have formatting issues');
      }
      
      if (!markdownAnalysis.hasStructuredContent) {
        console.warn('⚠️ Unstructured markdown - Gemini may struggle with extraction');
      }

      console.log('💡 Gemini debugging tips: Watch for JSON formatting issues, safety filter blocks, model compatibility');
    }

    // Extract profile data from markdown
          console.log(`📝 Starting profile extraction for user ${user.id} with provider: ${preferredProvider || 'default provider'}`);
    
    const extractionResult = await (extractionService as any).extractProfileFromMarkdown(
      markdown,
      user.id,
      preferredProvider || undefined
    ) as ExtractionResult & {
      extractionTime?: number;
      provider?: string;
      recommendations?: any;
      errorType?: string;
      troubleshooting?: string[];
    };

    if (!extractionResult.success) {
      console.error(`❌ [ProfileExtractionAPI] Extraction failed:`, extractionResult.error);
      
      // Enhanced error response with provider-specific guidance
      const errorResponse: any = { 
        success: false, 
        error: extractionResult.error || 'Extraction failed',
        provider: extractionResult.provider || preferredProvider,
        extractionTime: extractionResult.extractionTime
      };

      // Add troubleshooting information
      if (extractionResult.troubleshooting) {
        errorResponse.troubleshooting = extractionResult.troubleshooting;
        errorResponse.errorType = extractionResult.errorType;
      }

      // Provider-specific error suggestions
      if (isGemini) {
        errorResponse.suggestion = 'Gemini integration is being debugged. Try OpenAI GPT-4o for more reliable profile extraction.';
        errorResponse.alternativeProvider = 'openai';
      }

      return NextResponse.json(errorResponse, { status: 500 });
    }

    // Enhanced debugging for complex field extraction
    const complexFieldsAnalysis = analyzeComplexFieldExtraction(extractionResult.data!);
    console.log(`🔍 [ProfileExtractionAPI] Complex fields extraction analysis:`, complexFieldsAnalysis);

    // Provider performance analysis
    if (extractionResult.extractionTime) {
      const performanceAnalysis = {
        extractionTime: extractionResult.extractionTime,
        performance: extractionResult.extractionTime < 5000 ? 'fast' : extractionResult.extractionTime < 15000 ? 'moderate' : 'slow',
        provider: extractionResult.provider || preferredProvider,
        averageConfidence: extractionResult.averageConfidence
      };

      console.log(`⚡ [ProfileExtractionAPI] Performance analysis:`, performanceAnalysis);

      // Gemini-specific performance warnings
      if (isGemini && extractionResult.extractionTime > 20000) {
        console.warn('⚠️ Slow Gemini response time - consider OpenAI GPT-4o for better performance');
      }
    }

    // Map extracted data to profile schema
    const mappedProfile = extractionService.mapToProfileSchema(extractionResult.data!);
    
    // Post-process the profile to ensure all required fields exist
    const processedProfile = postProcessProfile(mappedProfile);

    // Generate extraction summary
    const summary = extractionService.generateExtractionSummary(extractionResult.data!) as ExtractionSummary;

    // Enhanced logging for debugging and monitoring
    const detailedMetrics = {
      totalFields: summary.totalFields,
      highConfidence: summary.highConfidenceFields,
      mediumConfidence: summary.mediumConfidenceFields,
      lowConfidence: summary.lowConfidenceFields,
      averageConfidence: extractionResult.averageConfidence,
      provider: extractionResult.provider || preferredProvider || 'default',
      extractedSections: summary.extractedSections,
      complexFieldsFound: complexFieldsAnalysis.fieldsFound,
      complexFieldsMissing: complexFieldsAnalysis.fieldsMissing,
      validationWarnings: extractionResult.validationWarnings?.length || 0,
      hasLowConfidenceFields: extractionResult.hasLowConfidenceFields,
      lowConfidenceFieldsList: extractionResult.lowConfidenceFields,
      extractionTime: extractionResult.extractionTime,
      markdownComplexity: markdownAnalysis.estimatedComplexity,
      extractionRate: complexFieldsAnalysis.extractionRate
    };
    
    console.log(`✅ [ProfileExtractionAPI] Extraction completed for user ${user.id}:`, detailedMetrics);
    
    // Provider-specific success analysis
    if (isGemini) {
      if (extractionResult.averageConfidence > 0.8) {
        console.log('🎉 Excellent Gemini extraction performance!');
      } else if (extractionResult.averageConfidence < 0.6) {
        console.warn('⚠️ Low confidence Gemini extraction - recommend trying OpenAI GPT-4o');
      }
    }
    
    // Log warnings for missing critical fields
    if (complexFieldsAnalysis.fieldsMissing.length > 0) {
      console.warn(`⚠️ Missing critical fields for user ${user.id}:`, complexFieldsAnalysis.fieldsMissing);
    }
    
    if (extractionResult.validationWarnings && extractionResult.validationWarnings.length > 0) {
      console.warn(`⚠️ Validation warnings for user ${user.id}:`, extractionResult.validationWarnings);
    }

    return NextResponse.json({
      success: true,
      extractionResult: {
        success: extractionResult.success,
        data: extractionResult.data,
        hasLowConfidenceFields: extractionResult.hasLowConfidenceFields,
        lowConfidenceFields: extractionResult.lowConfidenceFields,
        validationWarnings: extractionResult.validationWarnings,
        averageConfidence: extractionResult.averageConfidence,
        mappedProfile: processedProfile,
        summary
      }
    });

  } catch (error: any) {
    console.error('💥 Profile extraction API error:', error);
    
    // Handle specific error types with improved error messages
    if (error.message?.includes('No AI provider configured')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'No AI provider configured. Please configure at least one AI provider in the admin dashboard.' 
        },
        { status: 400 }
      );
    }

    if (error.message?.includes('rate limit')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Rate limit exceeded. Please try again later.' 
        },
        { status: 429 }
      );
    }

    if (error.message?.includes('Authentication') || error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication required. Please sign in and try again.' 
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to extract profile data. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

// OPTIONS handler for CORS
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 