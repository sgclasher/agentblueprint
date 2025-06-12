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
    try {
      // Call AI service to extract profile data
      const extractedData = await aiService.generateJson(
        PROFILE_EXTRACTION_SYSTEM_PROMPT,
        PROFILE_EXTRACTION_USER_PROMPT(markdown),
        userId,
        CredentialsRepository,
        preferredProvider
      );

      // Analyze confidence scores and validate structure
      const analysis = this.analyzeExtraction(extractedData);

      return {
        success: true,
        data: extractedData,
        hasLowConfidenceFields: analysis.hasLowConfidenceFields,
        lowConfidenceFields: analysis.lowConfidenceFields,
        validationWarnings: analysis.validationWarnings,
        averageConfidence: analysis.averageConfidence
      };
    } catch (error) {
      console.error('Profile extraction error:', error);
      return {
        success: false,
        error: error.message || 'Failed to extract profile data',
        data: null
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

        // Validate field structure if definition exists
        const fieldDef = PROFILE_FIELD_DEFINITIONS[fieldName];
        if (fieldDef && field.value !== undefined) {
          const warnings = validateExtractedField(fieldName, field.value, fieldDef);
          validationWarnings.push(...warnings);
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
   * Map extracted data to profile schema
   * @param {Object} extractedData - Extracted data with confidence scores
   * @param {number} minConfidence - Minimum confidence threshold
   * @returns {Object} Profile object
   */
  mapToProfileSchema(extractedData, minConfidence = 0.3) {
    const profile = {};

    Object.entries(extractedData).forEach(([fieldPath, field]) => {
      // Skip fields below confidence threshold
      if (field && field.confidence < minConfidence) {
        return;
      }

      const value = field?.value !== undefined ? field.value : field;
      
      // Handle nested field paths (e.g., "expectedOutcome.strategicInitiatives")
      const parts = fieldPath.split('.');
      let current = profile;
      
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      
      current[parts[parts.length - 1]] = value;
    });

    return profile;
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
} 