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
} 