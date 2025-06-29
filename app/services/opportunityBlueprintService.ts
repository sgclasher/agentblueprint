/**
 * Opportunity Blueprint Service
 * 
 * Service layer that manages the relationship between AI opportunities and their associated blueprints.
 * This service provides high-level business logic for the unified opportunity-blueprint architecture.
 */

import { ProfileRepository } from '../repositories/profileRepository';
import { AgenticBlueprintService } from './agenticBlueprintService';
import { 
  OpportunityBlueprint, 
  AIOpportunity, 
  AgenticBlueprint,
  generateOpportunityId,
  validateOpportunityBlueprint 
} from './types';

export class OpportunityBlueprintService {
  
  // =============================================
  // 🆕 PHASE 1: Core Opportunity-Blueprint Operations
  // =============================================

  /**
   * Generate a blueprint for a specific AI opportunity
   * @param userId - User ID (from Supabase Auth)
   * @param opportunity - AI opportunity to generate blueprint for
   * @param profile - User profile for context
   * @returns Generated opportunity blueprint
   */
  static async generateBlueprintForOpportunity(
    userId: string, 
    opportunity: AIOpportunity, 
    profile: any
  ): Promise<OpportunityBlueprint> {
    console.log(`🚀 [OpportunityBlueprintService] Generating blueprint for opportunity: ${opportunity.title}`);
    
    if (!userId) {
      throw new Error('User authentication is required to generate blueprint.');
    }
    
    if (!opportunity?.title) {
      throw new Error('Valid opportunity with title is required.');
    }

    try {
      // Generate unique opportunity ID
      const opportunityId = generateOpportunityId(opportunity);
      console.log(`🆔 [OpportunityBlueprintService] Generated opportunity ID: ${opportunityId}`);

      // Generate the actual blueprint using existing service
      console.log(`⚙️ [OpportunityBlueprintService] Calling AgenticBlueprintService for blueprint generation`);
      const blueprint = await AgenticBlueprintService.generateBlueprint(
        profile, 
        userId, 
        null, // credentialsRepo - will be handled by the service
        undefined, // preferredProvider
        undefined, // selectedInitiativeIndex
        undefined, // specialInstructions
        opportunity // opportunityContext
      );
      
      if (!blueprint) {
        throw new Error('Failed to generate blueprint from agenticBlueprintService');
      }

      console.log(`✅ [OpportunityBlueprintService] Blueprint generated successfully`);

      // Create opportunity blueprint structure
      const opportunityBlueprint: OpportunityBlueprint = {
        opportunityId,
        opportunity,
        blueprint,
        generatedAt: new Date().toISOString(),
        aiModel: blueprint.aiModel || 'unknown'
      };

      // Validate the structure
      const validation = validateOpportunityBlueprint(opportunityBlueprint);
      if (!validation.isValid) {
        console.error('❌ [OpportunityBlueprintService] Blueprint validation failed:', validation.errors);
        throw new Error(`Blueprint validation failed: ${validation.errors.join(', ')}`);
      }

      console.log(`✅ [OpportunityBlueprintService] Opportunity blueprint created and validated`);
      return opportunityBlueprint;

    } catch (error) {
      console.error('❌ [OpportunityBlueprintService] Error generating blueprint:', error);
      throw new Error(`Failed to generate blueprint for opportunity: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Save opportunity blueprint to storage
   * @param userId - User ID (from Supabase Auth)
   * @param opportunityBlueprint - Opportunity blueprint to save
   * @returns Success status
   */
  static async saveOpportunityBlueprint(
    userId: string, 
    opportunityBlueprint: OpportunityBlueprint
  ): Promise<boolean> {
    console.log(`💾 [OpportunityBlueprintService] Saving opportunity blueprint: ${opportunityBlueprint.opportunityId}`);
    
    if (!userId) {
      throw new Error('User authentication is required to save opportunity blueprint.');
    }

    try {
      // Validate blueprint before saving
      const validation = validateOpportunityBlueprint(opportunityBlueprint);
      if (!validation.isValid) {
        console.error('❌ [OpportunityBlueprintService] Blueprint validation failed:', validation.errors);
        throw new Error(`Blueprint validation failed: ${validation.errors.join(', ')}`);
      }

      // Save via repository
      const success = await ProfileRepository.saveOpportunityBlueprint(userId, opportunityBlueprint);
      
      if (success) {
        console.log(`✅ [OpportunityBlueprintService] Opportunity blueprint saved successfully`);
      } else {
        console.error('❌ [OpportunityBlueprintService] Failed to save opportunity blueprint');
      }

      return success;

    } catch (error) {
      console.error('❌ [OpportunityBlueprintService] Error saving blueprint:', error);
      throw new Error(`Failed to save opportunity blueprint: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate and save blueprint for opportunity in one operation
   * @param userId - User ID (from Supabase Auth)
   * @param opportunity - AI opportunity to generate blueprint for
   * @param profile - User profile for context
   * @returns Generated and saved opportunity blueprint
   */
  static async generateAndSaveBlueprint(
    userId: string,
    opportunity: AIOpportunity,
    profile: any
  ): Promise<OpportunityBlueprint> {
    console.log(`🔄 [OpportunityBlueprintService] Generate and save blueprint for: ${opportunity.title}`);

    try {
      // Generate blueprint
      const opportunityBlueprint = await this.generateBlueprintForOpportunity(userId, opportunity, profile);
      
      // Save blueprint
      const success = await this.saveOpportunityBlueprint(userId, opportunityBlueprint);
      
      if (!success) {
        throw new Error('Failed to save generated blueprint');
      }

      console.log(`✅ [OpportunityBlueprintService] Blueprint generated and saved successfully`);
      return opportunityBlueprint;

    } catch (error) {
      console.error('❌ [OpportunityBlueprintService] Error in generate and save:', error);
      throw error;
    }
  }

  /**
   * Get all opportunity blueprints for a user
   * @param userId - User ID (from Supabase Auth)
   * @returns Array of opportunity blueprints
   */
  static async getOpportunityBlueprints(userId: string): Promise<OpportunityBlueprint[]> {
    console.log(`🔍 [OpportunityBlueprintService] Getting all opportunity blueprints for user: ${userId}`);
    
    if (!userId) {
      console.warn('⚠️ No userId provided to getOpportunityBlueprints');
      return [];
    }

    try {
      const blueprints = await ProfileRepository.getOpportunityBlueprints(userId);
      console.log(`✅ [OpportunityBlueprintService] Retrieved ${blueprints.length} opportunity blueprints`);
      return blueprints;

    } catch (error) {
      console.error('❌ [OpportunityBlueprintService] Error getting blueprints:', error);
      return [];
    }
  }

  /**
   * Get specific opportunity blueprint by opportunity ID
   * @param userId - User ID (from Supabase Auth)
   * @param opportunityId - Unique opportunity ID
   * @returns Opportunity blueprint or null if not found
   */
  static async getOpportunityBlueprint(
    userId: string, 
    opportunityId: string
  ): Promise<OpportunityBlueprint | null> {
    console.log(`🔍 [OpportunityBlueprintService] Getting blueprint for opportunity: ${opportunityId}`);
    
    if (!userId || !opportunityId) {
      console.warn('⚠️ userId and opportunityId required for getOpportunityBlueprint');
      return null;
    }

    try {
      const blueprint = await ProfileRepository.getOpportunityBlueprint(userId, opportunityId);
      
      if (blueprint) {
        console.log(`✅ [OpportunityBlueprintService] Found blueprint for opportunity: ${opportunityId}`);
      } else {
        console.log(`ℹ️ [OpportunityBlueprintService] No blueprint found for opportunity: ${opportunityId}`);
      }

      return blueprint;

    } catch (error) {
      console.error('❌ [OpportunityBlueprintService] Error getting blueprint:', error);
      return null;
    }
  }

  /**
   * Remove opportunity blueprint by opportunity ID
   * @param userId - User ID (from Supabase Auth)
   * @param opportunityId - Unique opportunity ID
   * @returns Success status
   */
  static async removeOpportunityBlueprint(userId: string, opportunityId: string): Promise<boolean> {
    console.log(`🗑️ [OpportunityBlueprintService] Removing blueprint for opportunity: ${opportunityId}`);
    
    if (!userId || !opportunityId) {
      throw new Error('User ID and opportunity ID are required to remove blueprint.');
    }

    try {
      const success = await ProfileRepository.removeOpportunityBlueprint(userId, opportunityId);
      
      if (success) {
        console.log(`✅ [OpportunityBlueprintService] Blueprint removed successfully`);
      } else {
        console.log(`ℹ️ [OpportunityBlueprintService] No blueprint found to remove`);
      }

      return success;

    } catch (error) {
      console.error('❌ [OpportunityBlueprintService] Error removing blueprint:', error);
      throw new Error(`Failed to remove opportunity blueprint: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // =============================================
  // 🔄 Legacy Migration Support
  // =============================================

  /**
   * Migrate existing single blueprint to opportunity-based storage
   * @param userId - User ID (from Supabase Auth)
   * @param opportunityContext - Optional opportunity context for migration
   * @returns Success status
   */
  static async migrateLegacyBlueprint(
    userId: string, 
    opportunityContext?: Partial<AIOpportunity>
  ): Promise<boolean> {
    console.log(`🔄 [OpportunityBlueprintService] Migrating legacy blueprint for user: ${userId}`);
    
    if (!userId) {
      throw new Error('User authentication is required for legacy migration.');
    }

    try {
      const success = await ProfileRepository.migrateLegacyBlueprint(userId, opportunityContext);
      
      if (success) {
        console.log(`✅ [OpportunityBlueprintService] Legacy blueprint migrated successfully`);
      } else {
        console.log(`ℹ️ [OpportunityBlueprintService] No legacy blueprint found to migrate`);
      }

      return success;

    } catch (error) {
      console.error('❌ [OpportunityBlueprintService] Error migrating legacy blueprint:', error);
      throw new Error(`Failed to migrate legacy blueprint: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Check if user has existing legacy blueprint and opportunity blueprints
   * @param userId - User ID (from Supabase Auth)
   * @returns Migration status information
   */
  static async getMigrationStatus(userId: string): Promise<{
    hasLegacyBlueprint: boolean;
    hasOpportunityBlueprints: boolean;
    opportunityBlueprintCount: number;
    migrationRecommended: boolean;
  }> {
    console.log(`🔍 [OpportunityBlueprintService] Checking migration status for user: ${userId}`);
    
    if (!userId) {
      return {
        hasLegacyBlueprint: false,
        hasOpportunityBlueprints: false,
        opportunityBlueprintCount: 0,
        migrationRecommended: false
      };
    }

    try {
      // Check for opportunity blueprints
      const opportunityBlueprints = await this.getOpportunityBlueprints(userId);
      const hasOpportunityBlueprints = opportunityBlueprints.length > 0;
      
      // Check for legacy blueprint (this would need to be implemented)
      // For now, assume no legacy blueprint checking
      const hasLegacyBlueprint = false; // This could be implemented to check agentic_blueprint_cache
      
      const migrationRecommended = hasLegacyBlueprint && !hasOpportunityBlueprints;

      const status = {
        hasLegacyBlueprint,
        hasOpportunityBlueprints,
        opportunityBlueprintCount: opportunityBlueprints.length,
        migrationRecommended
      };

      console.log(`✅ [OpportunityBlueprintService] Migration status:`, status);
      return status;

    } catch (error) {
      console.error('❌ [OpportunityBlueprintService] Error checking migration status:', error);
      return {
        hasLegacyBlueprint: false,
        hasOpportunityBlueprints: false,
        opportunityBlueprintCount: 0,
        migrationRecommended: false
      };
    }
  }

  // =============================================
  // 🔧 Utility Methods
  // =============================================

  /**
   * Generate opportunity ID for an AI opportunity
   * @param opportunity - AI opportunity object
   * @returns Unique opportunity ID
   */
  static generateOpportunityId(opportunity: AIOpportunity): string {
    console.log(`🆔 [OpportunityBlueprintService] Generating ID for opportunity: ${opportunity.title}`);
    return generateOpportunityId(opportunity);
  }

  /**
   * Validate opportunity blueprint structure
   * @param blueprint - Opportunity blueprint to validate
   * @returns Validation result with status and errors
   */
  static validateOpportunityBlueprint(blueprint: OpportunityBlueprint): {
    isValid: boolean;
    errors: string[];
  } {
    console.log(`✅ [OpportunityBlueprintService] Validating opportunity blueprint: ${blueprint.opportunityId}`);
    return validateOpportunityBlueprint(blueprint);
  }

  /**
   * Check if user has any opportunity blueprints
   * @param userId - User ID (from Supabase Auth)
   * @returns Whether user has opportunity blueprints
   */
  static async hasOpportunityBlueprints(userId: string): Promise<boolean> {
    if (!userId) return false;
    
    try {
      const blueprints = await this.getOpportunityBlueprints(userId);
      const hasBlueprints = blueprints.length > 0;
      
      console.log(`🔍 [OpportunityBlueprintService] User ${userId} has ${blueprints.length} opportunity blueprints`);
      return hasBlueprints;
      
    } catch (error) {
      console.error('❌ [OpportunityBlueprintService] Error checking for blueprints:', error);
      return false;
    }
  }


}

// Export as both named and default for backward compatibility
export const opportunityBlueprintService = OpportunityBlueprintService;
export default OpportunityBlueprintService; 