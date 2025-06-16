import { NextRequest, NextResponse } from 'next/server';
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

    // Get authenticated user
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in to use this feature.' },
        { status: 401 }
      );
    }
    
    console.log(`🔐 Markdown extraction authorized for user ${user.id}`);

    // Create extraction service instance
    const extractionService = new ProfileExtractionService();
    
    // Extract profile data from markdown
    console.log(`📝 Starting profile extraction for user ${user.id} with provider: ${preferredProvider || 'default'}`);
    
    const extractionResult = await (extractionService as any).extractProfileFromMarkdown(
      markdown,
      user.id,
      preferredProvider || undefined
    ) as ExtractionResult & {
      extractionTime?: number;
      provider?: string;
      errorType?: string;
    };

    if (!extractionResult.success) {
      console.error(`❌ [ProfileExtractionAPI] Extraction failed:`, extractionResult.error);
      const errorResponse: any = { 
        success: false, 
        error: extractionResult.error || 'Extraction failed',
        provider: extractionResult.provider || preferredProvider,
      };
      return NextResponse.json(errorResponse, { status: 500 });
    }

    // Map extracted data to profile schema
    const mappedProfile = extractionService.mapToProfileSchema(extractionResult.data!);
    
    // Post-process the profile to ensure all required fields exist
    const processedProfile = postProcessProfile(mappedProfile);

    // Generate extraction summary
    const summary = extractionService.generateExtractionSummary(extractionResult.data!) as ExtractionSummary;

    console.log(`✅ [ProfileExtractionAPI] Extraction completed for user ${user.id}`);
    
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
    
    if (error.message?.includes('No AI provider configured')) {
      return NextResponse.json(
        { success: false, error: 'No AI provider configured. Please configure at least one AI provider in the admin dashboard.' },
        { status: 400 }
      );
    }
    if (error.message?.includes('rate limit')) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    if (error.message?.includes('Authentication')) {
      return NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in and try again.' },
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