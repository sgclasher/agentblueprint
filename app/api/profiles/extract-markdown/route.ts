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

    // Create extraction service instance
    const extractionService = new ProfileExtractionService();

    // Extract profile data from markdown
    console.log(`📝 Starting profile extraction for user ${user.id} with provider: ${preferredProvider || 'default'}`);
    console.log(`📊 Markdown input analysis:`, {
      characterCount: markdown.length,
      lineCount: markdown.split('\n').length,
      containsHeaders: /^#{1,6}\s/m.test(markdown!),
      containsLists: /^[-*]\s/m.test(markdown!),
      containsProblems: /problem|challenge|issue|pain point/i.test(markdown!),
      containsAI: /ai|artificial intelligence|automation|machine learning|ml/i.test(markdown!),
      containsInitiatives: /initiative|project|strategic|goal/i.test(markdown!)
    });
    
    const extractionResult = await extractionService.extractProfileFromMarkdown(
      markdown,
      user.id,
      preferredProvider || null
    ) as ExtractionResult;

    if (!extractionResult.success) {
      console.error('❌ Profile extraction failed:', extractionResult.error);
      return NextResponse.json(
        { 
          success: false, 
          error: extractionResult.error || 'Extraction failed',
          details: extractionResult 
        },
        { status: 500 }
      );
    }

    // Enhanced debugging for complex field extraction
    const complexFieldsAnalysis = analyzeComplexFieldExtraction(extractionResult.data!);
    console.log(`🔍 Complex fields extraction analysis:`, complexFieldsAnalysis);

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
      provider: preferredProvider || 'default',
      extractedSections: summary.extractedSections,
      complexFieldsFound: complexFieldsAnalysis.fieldsFound,
      complexFieldsMissing: complexFieldsAnalysis.fieldsMissing,
      validationWarnings: extractionResult.validationWarnings?.length || 0,
      hasLowConfidenceFields: extractionResult.hasLowConfidenceFields,
      lowConfidenceFieldsList: extractionResult.lowConfidenceFields
    };
    
    console.log(`✅ Profile extraction completed for user ${user.id}:`, detailedMetrics);
    
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