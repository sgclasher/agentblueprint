import { aiService } from './aiService';
import { CredentialsRepository } from '../repositories/credentialsRepository';
import { 
  PROFILE_EXTRACTION_SYSTEM_PROMPT, 
  PROFILE_EXTRACTION_USER_PROMPT,
  PROFILE_FIELD_DEFINITIONS,
  validateExtractedField
} from '../lib/llm/prompts/profileExtraction';

export class ProfileExtractionService {
  constructor() {
    this.confidenceThreshold = 0.3; // Minimum confidence to include a field
  }

  /**
   * Extract profile data from markdown using AI
   * @param {string} markdown - The markdown content to extract from
   * @param {string} userId - The user ID for credential lookup
   * @param {string} preferredProvider - Optional preferred AI provider
   * @returns {Promise<Object>} Extraction result with confidence scores
   */
  async extractProfileFromMarkdown(markdown, userId, preferredProvider) {
    const startTime = Date.now();
    
    try {
      console.log(`🔍 [ProfileExtraction] Starting extraction with provider: ${preferredProvider || 'default'}`);
      console.log(`📝 [ProfileExtraction] Markdown length: ${markdown.length} characters`);
      
      // Pre-extraction validation
      if (!markdown || markdown.trim().length < 50) {
        throw new Error('Markdown content is too short for meaningful extraction');
      }

      // Call AI service to extract profile data
      const extractedData = await aiService.generateJson(
        PROFILE_EXTRACTION_SYSTEM_PROMPT,
        PROFILE_EXTRACTION_USER_PROMPT(markdown),
        userId,
        CredentialsRepository,
        preferredProvider
      );

      const extractionTime = Date.now() - startTime;
      console.log(`✅ [ProfileExtraction] Extraction completed in ${extractionTime}ms`);

      // Analyze confidence scores and validate structure
      const analysis = this.analyzeExtraction(extractedData);

      // Add provider-specific recommendations
      const recommendations = this.generateProviderRecommendations(
        preferredProvider, 
        analysis, 
        extractionTime
      );

      return {
        success: true,
        data: extractedData,
        hasLowConfidenceFields: analysis.hasLowConfidenceFields,
        lowConfidenceFields: analysis.lowConfidenceFields,
        validationWarnings: analysis.validationWarnings,
        averageConfidence: analysis.averageConfidence,
        extractionTime,
        provider: preferredProvider,
        recommendations
      };
    } catch (error) {
      const extractionTime = Date.now() - startTime;
      
      console.error(`❌ [ProfileExtraction] Error after ${extractionTime}ms:`, error);
      
      // Enhanced error handling with provider-specific debugging
      const enhancedError = this.enhanceErrorForProvider(error, preferredProvider, markdown);
      
      return {
        success: false,
        error: enhancedError.message,
        errorType: enhancedError.type,
        provider: preferredProvider,
        extractionTime,
        data: null,
        troubleshooting: enhancedError.troubleshooting
      };
    }
  }

  /**
   * Analyze extracted data for confidence scores and validation issues
   * @param {Object} extractedData - The extracted data with confidence scores
   * @returns {Object} Analysis results
   */
  analyzeExtraction(extractedData) {
    const lowConfidenceFields = [];
    const validationWarnings = [];
    let totalConfidence = 0;
    let fieldCount = 0;

    // Check each extracted field
    Object.entries(extractedData).forEach(([fieldName, field]) => {
      if (field && typeof field === 'object' && 'confidence' in field) {
        fieldCount++;
        totalConfidence += field.confidence;

        // Check for low confidence
        if (field.confidence < 0.5) {
          lowConfidenceFields.push(fieldName);
        }

        // Enhanced validation for complex nested structures
        const warnings = this.validateComplexField(fieldName, field.value);
        validationWarnings.push(...warnings);

        // Validate field structure if definition exists
        const fieldDef = PROFILE_FIELD_DEFINITIONS[fieldName];
        if (fieldDef && field.value !== undefined) {
          const basicWarnings = validateExtractedField(fieldName, field.value, fieldDef);
          validationWarnings.push(...basicWarnings);
        }
      }
    });

    return {
      hasLowConfidenceFields: lowConfidenceFields.length > 0,
      lowConfidenceFields,
      validationWarnings,
      averageConfidence: fieldCount > 0 ? totalConfidence / fieldCount : 0
    };
  }

  /**
   * Enhanced validation for complex nested field structures
   * @param {string} fieldName - The field name
   * @param {any} value - The extracted value
   * @returns {string[]} Array of validation warnings
   */
  validateComplexField(fieldName, value) {
    const warnings = [];

    // Validate strategic initiatives structure
    if (fieldName === 'strategicInitiatives') {
      if (!Array.isArray(value)) {
        warnings.push(`${fieldName} should be an array of strategic initiative objects`);
      } else if (value.length === 0) {
        warnings.push(`${fieldName} array is empty - no strategic initiatives extracted`);
      } else {
        value.forEach((initiative, index) => {
          if (!initiative || typeof initiative !== 'object') {
            warnings.push(`${fieldName}[${index}] should be an object`);
            return;
          }

          // Check for initiative name
          if (!initiative.initiative || initiative.initiative.trim().length === 0) {
            warnings.push(`${fieldName}[${index}].initiative is missing or empty`);
          }

          // Check contact structure
          if (!initiative.contact || typeof initiative.contact !== 'object') {
            warnings.push(`${fieldName}[${index}].contact should be an object with contact details`);
          } else {
            // Check if at least one contact field is provided
            const contactFields = ['name', 'title', 'email', 'linkedin', 'phone'];
            const hasAnyContact = contactFields.some(field => 
              initiative.contact[field] && initiative.contact[field].trim().length > 0
            );
            
            if (!hasAnyContact) {
              warnings.push(`${fieldName}[${index}].contact has no contact information provided`);
            }
          }

          // Check business problems structure
          if (initiative.businessProblems !== undefined) {
            if (!Array.isArray(initiative.businessProblems)) {
              warnings.push(`${fieldName}[${index}].businessProblems should be an array of problem strings`);
            } else {
              // Validate each business problem
              initiative.businessProblems.forEach((problem, problemIndex) => {
                if (typeof problem !== 'string' || problem.trim().length === 0) {
                  warnings.push(`${fieldName}[${index}].businessProblems[${problemIndex}] should be a non-empty string`);
                }
              });
            }
          }
        });
      }
    }

    // Validate basic string fields
    if (['companyName', 'industry', 'employeeCount', 'annualRevenue', 'primaryLocation', 'websiteUrl'].includes(fieldName)) {
      if (typeof value !== 'string' || value.trim().length === 0) {
        warnings.push(`${fieldName} should be a non-empty string`);
      }
    }

    // Validate website URL format (basic validation)
    if (fieldName === 'websiteUrl' && value) {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
      if (!urlPattern.test(value)) {
        warnings.push(`${fieldName} should be a valid URL format`);
      }
    }

    return warnings;
  }

  /**
   * Map extracted data to profile schema with enhanced error handling
   * @param {Object} extractedData - Extracted data with confidence scores
   * @param {number} minConfidence - Minimum confidence threshold
   * @returns {Object} Profile object
   */
  mapToProfileSchema(extractedData, minConfidence = 0.3) {
    const profile = {};

    if (!extractedData || typeof extractedData !== 'object') {
      console.warn('⚠️ mapToProfileSchema: Invalid extractedData provided');
      return profile;
    }

    Object.entries(extractedData).forEach(([fieldPath, field]) => {
      try {
        // Skip invalid field structures
        if (!field || typeof field !== 'object') {
          console.warn(`⚠️ mapToProfileSchema: Invalid field structure for ${fieldPath}:`, field);
          return;
        }

        // Skip fields below confidence threshold
        if (field.confidence !== undefined && field.confidence < minConfidence) {
          console.log(`🔍 mapToProfileSchema: Skipping low confidence field ${fieldPath} (${field.confidence})`);
          return;
        }

        const value = field?.value !== undefined ? field.value : field;
        
        // Skip null or undefined values
        if (value === null || value === undefined) {
          console.log(`🔍 mapToProfileSchema: Skipping null/undefined value for ${fieldPath}`);
          return;
        }

        // Enhanced type safety and data cleaning
        const cleanedValue = this.cleanAndValidateValue(fieldPath, value);
        if (cleanedValue === null) {
          console.warn(`⚠️ mapToProfileSchema: Failed to clean value for ${fieldPath}:`, value);
          return;
        }
        
        // Handle nested field paths (e.g., "expectedOutcome.strategicInitiatives")
        const parts = fieldPath.split('.');
        let current = profile;
        
        for (let i = 0; i < parts.length - 1; i++) {
          if (!current[parts[i]]) {
            current[parts[i]] = {};
          }
          current = current[parts[i]];
        }
        
        current[parts[parts.length - 1]] = cleanedValue;
        
      } catch (error) {
        console.error(`❌ mapToProfileSchema: Error processing field ${fieldPath}:`, error);
      }
    });

    return profile;
  }

  /**
   * Clean and validate extracted values based on field type
   * @param {string} fieldPath - The field path
   * @param {any} value - The extracted value
   * @returns {any|null} Cleaned value or null if invalid
   */
  cleanAndValidateValue(fieldPath, value) {
    try {
      // Handle strategic initiatives array
      if (fieldPath.includes('strategicInitiatives')) {
        if (!Array.isArray(value)) {
          console.warn(`⚠️ cleanAndValidateValue: ${fieldPath} should be array, got:`, typeof value);
          return null;
        }

        // Clean array items - ensure all initiatives have proper structure
        return value.filter(item => {
          if (!item || typeof item !== 'object') {
            return false;
          }
          
          // Ensure contact objects have the required structure
          if (item.contact && typeof item.contact === 'object') {
            const contactFields = ['name', 'title', 'email', 'linkedin', 'phone'];
            contactFields.forEach(field => {
              if (!item.contact[field]) {
                item.contact[field] = '';
              }
            });
          }

          // Ensure businessProblems array exists and is properly formatted
          if (item.businessProblems !== undefined) {
            if (Array.isArray(item.businessProblems)) {
              // Clean business problems - remove empty strings and trim
              item.businessProblems = item.businessProblems
                .filter(problem => typeof problem === 'string' && problem.trim().length > 0)
                .map(problem => problem.trim());
            } else {
              // If businessProblems is not an array, initialize as empty array
              item.businessProblems = [];
            }
          } else {
            // Initialize businessProblems array if not present
            item.businessProblems = [];
          }
          
          return item.initiative && item.initiative.trim().length > 0;
        });
      }

      // Handle string fields - clean and validate
      if (typeof value === 'string') {
        const trimmed = value.trim();
        
        // Basic URL validation for websiteUrl
        if (fieldPath.includes('websiteUrl') && trimmed.length > 0) {
          // Add protocol if missing
          if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
            return `https://${trimmed}`;
          }
        }
        
        return trimmed.length > 0 ? trimmed : null;
      }

      // Handle objects (for nested structures like contact info)
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return value;
      }

      return value;
      
    } catch (error) {
      console.error(`❌ cleanAndValidateValue: Error cleaning ${fieldPath}:`, error);
      return null;
    }
  }

  /**
   * Merge extracted data with existing profile data
   * @param {Object} existingProfile - Current profile data
   * @param {Object} extractedData - Newly extracted data
   * @param {boolean} overwriteExisting - Whether to overwrite existing values
   * @returns {Object} Merged profile
   */
  mergeWithExistingProfile(existingProfile, extractedData, overwriteExisting = false) {
    const merged = { ...existingProfile };
    const mappedData = this.mapToProfileSchema(extractedData);

    const mergeRecursive = (target, source) => {
      Object.keys(source).forEach(key => {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          if (!target[key]) target[key] = {};
          mergeRecursive(target[key], source[key]);
        } else if (overwriteExisting || !target[key]) {
          target[key] = source[key];
        }
      });
    };

    mergeRecursive(merged, mappedData);
    return merged;
  }

  /**
   * Generate a summary of extracted fields
   * @param {Object} extractedData - Extracted data with confidence scores
   * @returns {Object} Summary statistics
   */
  generateExtractionSummary(extractedData) {
    const summary = {
      totalFields: 0,
      highConfidenceFields: 0,
      mediumConfidenceFields: 0,
      lowConfidenceFields: 0,
      extractedSections: new Set()
    };

    Object.entries(extractedData).forEach(([fieldName, field]) => {
      if (field && typeof field === 'object' && 'confidence' in field) {
        summary.totalFields++;
        
        if (field.confidence >= 0.8) {
          summary.highConfidenceFields++;
        } else if (field.confidence >= 0.5) {
          summary.mediumConfidenceFields++;
        } else {
          summary.lowConfidenceFields++;
        }

        // Track which sections have data
        const section = fieldName.split('.')[0];
        summary.extractedSections.add(section);
      }
    });

    summary.extractedSections = Array.from(summary.extractedSections);
    return summary;
  }

  /**
   * Enhance error messages with provider-specific debugging information
   * @param {Error} error - The original error
   * @param {string} provider - The AI provider used
   * @param {string} markdown - The markdown content
   * @returns {Object} Enhanced error information
   */
  enhanceErrorForProvider(error, provider, markdown) {
    const errorMessage = error.message || 'Unknown error';
    const isGemini = provider && provider.toLowerCase().includes('gemini');
    
    // Gemini-specific error handling
    if (isGemini) {
      console.log(`🔧 [ProfileExtraction] Analyzing Gemini-specific error...`);
      
      if (errorMessage.includes('Model ') && errorMessage.includes('not found')) {
        return {
          type: 'MODEL_NOT_FOUND',
          message: `Gemini model issue: ${errorMessage}`,
          troubleshooting: [
            'Try using "gemini-1.5-flash" instead of the current model',
            'Check if your region supports the selected Gemini model',
            'Verify your Google AI API key has access to the model',
            'Consider switching to OpenAI GPT-4o which works reliably for profile extraction'
          ]
        };
      }

      if (errorMessage.includes('API key') || errorMessage.includes('403')) {
        return {
          type: 'API_ACCESS_ERROR',
          message: `Gemini API access issue: ${errorMessage}`,
          troubleshooting: [
            'Verify your Google AI API key is valid and active',
            'Check if your API key has the necessary permissions',
            'Ensure you\'re not hitting quota limits',
            'Try regenerating your API key in Google AI Studio'
          ]
        };
      }

      if (errorMessage.includes('safety filters') || errorMessage.includes('SAFETY')) {
        return {
          type: 'CONTENT_BLOCKED',
          message: `Gemini blocked the content due to safety filters: ${errorMessage}`,
          troubleshooting: [
            'The markdown content may contain terms flagged by Gemini safety filters',
            'Try removing any potentially sensitive business information temporarily',
            'Consider using OpenAI GPT-4o which has more lenient content policies',
            'Simplify the markdown to focus on basic company information'
          ]
        };
      }

      if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        return {
          type: 'RATE_LIMITED',
          message: `Gemini API rate limit exceeded: ${errorMessage}`,
          troubleshooting: [
            'Wait a few minutes before trying again',
            'Consider upgrading your Google AI API plan for higher rate limits',
            'Switch to OpenAI GPT-4o temporarily while rate limits reset',
            'Try using "gemini-1.5-flash-8b" which may have different rate limits'
          ]
        };
      }

      if (errorMessage.includes('JSON') || errorMessage.includes('parse')) {
        return {
          type: 'RESPONSE_FORMAT_ERROR',
          message: `Gemini returned invalid JSON format: ${errorMessage}`,
          troubleshooting: [
            'Gemini sometimes wraps responses in unexpected formatting',
            'This is a known issue with Gemini\'s response formatting',
            'OpenAI GPT-4o provides more consistent JSON formatting',
            'Try simplifying the markdown content for better extraction'
          ]
        };
      }

      if (errorMessage.includes('network') || errorMessage.includes('ENOTFOUND')) {
        return {
          type: 'NETWORK_ERROR',
          message: `Network connectivity issue with Gemini API: ${errorMessage}`,
          troubleshooting: [
            'Check your internet connection',
            'Verify that Google AI API endpoints are accessible from your network',
            'Try again in a few moments',
            'Consider using OpenAI GPT-4o as a fallback'
          ]
        };
      }

      // Generic Gemini error
      return {
        type: 'GEMINI_GENERAL_ERROR',
        message: `Gemini extraction failed: ${errorMessage}`,
        troubleshooting: [
          'Gemini API integration is being debugged - try OpenAI GPT-4o instead',
          'OpenAI GPT-4o currently has the most reliable profile extraction',
          'If you must use Gemini, try "gemini-1.5-flash" model',
          'Check the admin settings to ensure Gemini is configured correctly'
        ]
      };
    }

    // OpenAI-specific error handling
    if (provider && provider.toLowerCase().includes('openai')) {
      if (errorMessage.includes('API key') || errorMessage.includes('401')) {
        return {
          type: 'API_ACCESS_ERROR',
          message: `OpenAI API access issue: ${errorMessage}`,
          troubleshooting: [
            'Verify your OpenAI API key is valid and active',
            'Check if your API key has sufficient credits',
            'Ensure your API key has access to GPT-4o model'
          ]
        };
      }
    }

    // Generic error handling
    return {
      type: 'GENERAL_ERROR',
      message: errorMessage,
      troubleshooting: [
        'Try using OpenAI GPT-4o which has the most reliable extraction',
        'Check your AI provider configuration in admin settings',
        'Ensure your markdown content is well-formatted',
        'Contact support if the issue persists'
      ]
    };
  }

  /**
   * Generate provider-specific recommendations based on extraction results
   * @param {string} provider - The AI provider used
   * @param {Object} analysis - Extraction analysis results
   * @param {number} extractionTime - Time taken for extraction
   * @returns {Object} Provider recommendations
   */
  generateProviderRecommendations(provider, analysis, extractionTime) {
    const recommendations = {
      performance: '',
      alternatives: [],
      optimizations: []
    };

    const isGemini = provider && provider.toLowerCase().includes('gemini');
    const isOpenAI = provider && provider.toLowerCase().includes('openai');

    if (isGemini) {
      if (analysis.averageConfidence > 0.8 && extractionTime < 10000) {
        recommendations.performance = 'Excellent Gemini extraction performance';
      } else if (analysis.averageConfidence < 0.6) {
        recommendations.performance = 'Low confidence with Gemini - consider switching to OpenAI GPT-4o';
        recommendations.alternatives = [
          'OpenAI GPT-4o provides more reliable profile extraction',
          'Try "gemini-1.5-flash" for better consistency'
        ];
      } else if (extractionTime > 15000) {
        recommendations.performance = 'Slow Gemini response time';
        recommendations.optimizations = [
          'Try "gemini-1.5-flash-8b" for faster responses',
          'Consider OpenAI GPT-4o for more predictable performance'
        ];
      }

      recommendations.alternatives.push('For timeline generation, Gemini excels over other providers');
    }

    if (isOpenAI) {
      if (analysis.averageConfidence > 0.8) {
        recommendations.performance = 'Excellent OpenAI extraction performance (recommended for profiles)';
      }
      recommendations.alternatives.push('For timeline generation, consider switching to Gemini which performs better');
    }

    return recommendations;
  }
} 