'use client';

/**
 * Client Profile Management Service
 * 
 * Handles CRUD operations for client profiles using Supabase.
 * Integrates with AI services for timeline generation and opportunity analysis.
 * Requires user authentication for all profile operations.
 */

import { markdownService } from './markdownService';
import { ProfileRepository } from '../repositories/profileRepository';
import { getCurrentUser } from '../lib/supabase';

export class ProfileService {
  /**
   * Get current user ID for database operations
   * @returns {Promise<string|null>} User ID or null if not authenticated
   */
  static async getCurrentUserId() {
    try {
      const user = await getCurrentUser();
      return user?.id || null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Create a new client profile
   * @param {Object} profileData - Raw form data
   * @returns {Promise<Object>} Created profile with ID
   */
  static async createProfile(profileData) {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error("User must be authenticated to create a profile.");
      }

      // Convert form data to structured markdown
      const markdown = markdownService.generateMarkdown(profileData);
      
      // Prepare profile data, omitting client-side ID generation
      const profile = {
        ...profileData,
        markdown,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft'
      };
      
      // Use ProfileRepository for storage
      const createdProfile = await ProfileRepository.createProfile(profile, userId);
      return createdProfile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  /**
   * Get all client profiles for the current user
   * @returns {Promise<Array>} Array of user profiles
   */
  static async getProfiles() {
    try {
      const userId = await this.getCurrentUserId();
      // The repository will handle the case where userId is null
      return await ProfileRepository.getProfiles(userId);
    } catch (error) {
      console.error('Error getting profiles:', error);
      // Fallback to empty array on error
      return [];
    }
  }

  /**
   * Get a specific profile by ID
   * @param {string} id - Profile ID
   * @returns {Promise<Object|null>} Profile data or null
   */
  static async getProfile(id) {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) return null; // No user, no profile
      return await ProfileRepository.getProfile(id, userId);
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  /**
   * Update a profile
   * @param {string} profileId - Profile ID
   * @param {Object} updates - Profile updates
   * @returns {Promise<Object>} Updated profile
   */
  static async updateProfile(profileId, updates) {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error("User must be authenticated to update a profile.");
      }
      
      // Add updated timestamp
      const updatedData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      return await ProfileRepository.updateProfile(profileId, updatedData, userId);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  /**
   * Delete a profile
   * @param {string} profileId - Profile ID
   * @returns {Promise<boolean>} Success status
   */
  static async deleteProfile(profileId) {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error("User must be authenticated to delete a profile.");
      }
      return await ProfileRepository.deleteProfile(profileId, userId);
    } catch (error) {
      console.error('Error deleting profile:', error);
      return false;
    }
  }

  /**
   * Get timeline for profile (cached or generated)
   * @param {Object} profile - Client profile
   * @param {boolean} forceRegenerate - Force new generation instead of using cache
   * @param {string} scenarioType - Override scenario type (optional)
   * @returns {Promise<Object>} Timeline data with cache metadata
   */
  static async getTimelineFromProfile(profile, forceRegenerate = false, scenarioType = null) {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error("User authentication is required for timeline generation.");
      }
      
      // Check if profile has an ID (is saved to database)
      const hasProfileId = profile && profile.id;
      
      // Try to get cached timeline first (only for saved profiles and unless forced to regenerate)
      if (hasProfileId && !forceRegenerate) {
        const cached = await ProfileRepository.getCachedTimeline(profile.id, userId);
        if (cached && cached.timeline) {
          // Check if scenario matches (if specified)
          if (!scenarioType || cached.scenarioType === scenarioType) {
            console.log(`✅ Using cached timeline for profile ${profile.id}`);
            return {
              ...cached.timeline,
              _cached: true,
              _generatedAt: cached.generatedAt,
              _scenarioType: cached.scenarioType
            };
          }
        }
      }
      
      if (hasProfileId) {
        console.log(`🔄 Generating new timeline for profile ${profile.id}`);
      } else {
        console.log(`🔄 Generating timeline for unsaved profile (${profile.companyName || 'unnamed'})`);
      }
      
      // Generate new timeline
      const finalScenarioType = scenarioType || this.determineScenarioType(profile);
      const timeline = await this._generateTimelineFromProfile(profile, finalScenarioType);
      
      // Save to database only if profile has an ID
      if (hasProfileId) {
        try {
          await ProfileRepository.saveTimeline(profile.id, timeline, finalScenarioType, userId);
        } catch (saveError) {
          console.warn('⚠️ Could not save timeline to cache:', saveError.message);
          // Don't fail the entire operation if caching fails
        }
      }
      
      return {
        ...timeline,
        _cached: false,
        _generatedAt: new Date().toISOString(),
        _scenarioType: finalScenarioType,
        _unsavedProfile: !hasProfileId
      };
    } catch (error) {
      console.error('Error getting timeline from profile:', error);
      throw error;
    }
  }

  /**
   * Force regenerate timeline for profile
   * @param {Object} profile - Client profile
   * @param {string} scenarioType - Scenario type for generation
   * @returns {Promise<Object>} Newly generated timeline data
   */
  static async regenerateTimelineFromProfile(profile, scenarioType = 'balanced') {
    return await this.getTimelineFromProfile(profile, true, scenarioType);
  }

  /**
   * Legacy method - now redirects to cache-aware method
   * @param {Object} profile - Client profile
   * @returns {Promise<Object>} Timeline data
   * @deprecated Use getTimelineFromProfile instead
   */
  static async generateTimelineFromProfile(profile) {
    return await this.getTimelineFromProfile(profile, false);
  }

  /**
   * Generate AI timeline from profile data (private method)
   * @param {Object} profile - Client profile
   * @param {string} scenarioType - Scenario type for generation
   * @returns {Promise<Object>} Timeline data
   * @private
   */
  static async _generateTimelineFromProfile(profile, scenarioType = 'balanced') {
    try {
      // Generate full markdown representation of the client profile
      const profileMarkdown = markdownService.generateMarkdown(profile);
      
      // Extract business profile data for metadata and scenario determination
      const businessProfile = this.extractBusinessProfile(profile);
      
      // Use existing timeline service but pass the full markdown for richer context
      const { TimelineService } = await import('./timelineService');
      const timeline = await TimelineService.generateTimelineFromMarkdown(profileMarkdown, scenarioType, businessProfile);
      
      // Enhance timeline with profile-specific insights
      return this.enhanceTimelineWithProfile(timeline, profile);
    } catch (error) {
      console.error('Error generating timeline from profile:', error);
      throw error;
    }
  }

  /**
   * Extract business profile data from client profile
   */
  static extractBusinessProfile(profile) {
    return {
      companyName: profile.companyName,
      industry: profile.industry,
      companySize: this.mapCompanySize(profile.size),
      aiMaturityLevel: this.calculateAIMaturity(profile),
      primaryGoals: this.extractPrimaryGoals(profile),
      currentTechStack: profile.currentTechnology || [],
      budget: this.estimateBudgetRange(profile),
      timeframe: this.extractTimeframe(profile)
    };
  }

  /**
   * Estimate budget range based on profile
   */
  static estimateBudgetRange(profile) {
    const budget = profile.valueSellingFramework?.decisionMakers?.economicBuyer?.budget;
    if (budget) {
      return budget;
    }
    
    // Estimate based on company size and impact
    const impact = profile.valueSellingFramework?.impact?.totalAnnualImpact || 0;
    if (impact > 5000000) return '>5m';
    if (impact > 1000000) return '1m-5m';
    if (impact > 500000) return '500k-1m';
    if (impact > 100000) return '100k-500k';
    return '<100k';
  }

  /**
   * Extract timeframe from profile
   */
  static extractTimeframe(profile) {
    const timeline = profile.valueSellingFramework?.buyingProcess?.timeline;
    if (timeline) {
      const months = parseInt(timeline);
      if (months <= 3) return '3months';
      if (months <= 6) return '6months';
      if (months <= 12) return '1year';
      return '2years+';
    }
    return '1year'; // Default
  }

  /**
   * Determine AI adoption scenario based on profile characteristics
   */
  static determineScenarioType(profile) {
    const aiReadiness = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
    const decisionTimeline = profile.decisionTimeline || 12;
    const riskTolerance = profile.riskTolerance || 'medium';
    
    if (aiReadiness >= 8 && decisionTimeline <= 6 && riskTolerance === 'high') {
      return 'aggressive';
    } else if (aiReadiness <= 4 || decisionTimeline >= 18 || riskTolerance === 'low') {
      return 'conservative';
    }
    return 'balanced';
  }

  /**
   * Generate opportunity recommendations based on profile
   */
  static async generateOpportunityRecommendations(profile) {
    // Analyze profile data to suggest AI/automation opportunities
    const opportunities = [];
    
    // Finance opportunities
    if (profile.problems?.finance?.manualInvoiceProcessing) {
      opportunities.push({
        department: 'Finance',
        title: 'Automated Invoice Processing',
        description: 'AI-powered invoice recognition and approval workflows',
        impact: this.calculateFinanceImpact(profile),
        effort: 'Medium',
        timeline: '3-4 months',
        priority: 'High'
      });
    }
    
    // HR opportunities
    if (profile.problems?.hr?.manualResumeScreening) {
      opportunities.push({
        department: 'HR',
        title: 'AI Resume Screening',
        description: 'Automated candidate screening and ranking',
        impact: this.calculateHRImpact(profile),
        effort: 'Low',
        timeline: '1-2 months',
        priority: 'Medium'
      });
    }
    
    // Customer Service opportunities
    if (profile.problems?.customerService?.responseTime) {
      opportunities.push({
        department: 'Customer Service',
        title: 'AI Chatbot & Routing',
        description: 'Intelligent ticket routing and automated responses',
        impact: this.calculateServiceImpact(profile),
        effort: 'Medium',
        timeline: '2-3 months',
        priority: 'High'
      });
    }
    
    return opportunities.sort((a, b) => {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * Enhanced timeline with profile-specific context
   */
  static enhanceTimelineWithProfile(timeline, profile) {
    // Add profile-specific insights to each phase
    if (timeline.phases) {
      timeline.phases = timeline.phases.map((phase, index) => ({
        ...phase,
        profileInsights: this.getPhaseInsights(profile, index),
        specificOpportunities: this.getPhaseOpportunities(profile, index)
      }));
    }
    
    // Add risk factors based on profile
    timeline.riskFactors = this.identifyRiskFactors(profile);
    
    // Add competitive insights
    timeline.competitiveContext = this.getCompetitiveContext(profile);
    
    return timeline;
  }

  /**
   * Get phase-specific insights based on profile
   */
  static getPhaseInsights(profile, phaseIndex) {
    const insights = {
      0: `Focus on ${profile.primaryBusinessIssue} while building foundation`,
      1: `Address ${profile.topProblem} with targeted automation`,
      2: `Scale successful pilots across ${profile.size} organization`,
      3: `Optimize for ${profile.successMetrics?.join(', ')} improvements`
    };
    
    return insights[phaseIndex] || 'Continue systematic AI adoption';
  }

  /**
   * Calculate impact methods
   */
  static calculateFinanceImpact(profile) {
    const laborCosts = profile.valueSellingFramework?.impact?.laborCosts || 0;
    const errorCosts = profile.valueSellingFramework?.impact?.errorCosts || 0;
    // Estimate 30% reduction in finance labor and 80% reduction in errors
    return Math.round((laborCosts * 0.3) + (errorCosts * 0.8));
  }

  static calculateHRImpact(profile) {
    const employeeCount = parseInt(profile.employeeCount) || 100;
    // Estimate savings based on hiring volume
    return Math.round(employeeCount * 1000); // $1000 per employee per year in hiring efficiency
  }

  static calculateServiceImpact(profile) {
    const totalImpact = profile.valueSellingFramework?.impact?.totalAnnualImpact || 0;
    // Customer service typically represents 20-30% of operational impact
    return Math.round(totalImpact * 0.25);
  }

  /**
   * Utility methods
   */
  static mapCompanySize(size) {
    const mapping = {
      '1-50 employees': 'startup',
      '51-200 employees': 'small',
      '201-1000 employees': 'medium',
      '1000+ employees': 'large'
    };
    return mapping[size] || 'medium';
  }

  static calculateAIMaturity(profile) {
    const score = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
    if (score <= 3) return 'beginner';
    if (score <= 6) return 'emerging';
    if (score <= 8) return 'developing';
    return 'advanced';
  }

  static extractPrimaryGoals(profile) {
    const goals = [];
    if (profile.businessIssue?.revenueGrowth) goals.push('Increase Revenue');
    if (profile.businessIssue?.costReduction) goals.push('Reduce Operational Costs');
    if (profile.businessIssue?.customerExperience) goals.push('Improve Customer Experience');
    if (profile.businessIssue?.operationalEfficiency) goals.push('Automate Workflows');
    return goals;
  }

  static identifyRiskFactors(profile) {
    const risks = [];
    const aiReadiness = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
    
    if (aiReadiness < 4) {
      risks.push({
        type: 'Technical Readiness',
        level: 'High',
        description: 'Low AI readiness score may slow implementation'
      });
    }
    
    if (profile.changeManagementCapability === 'Low') {
      risks.push({
        type: 'Change Management',
        level: 'Medium',
        description: 'Limited change management capability requires extra support'
      });
    }
    
    return risks;
  }

  static getCompetitiveContext(profile) {
    return {
      urgency: profile.competitivePressure ? 'High' : 'Medium',
      differentiators: profile.differentiationRequirements || [],
      marketPosition: profile.industry === 'Technology' ? 'Fast-moving' : 'Traditional'
    };
  }
}