'use client';

import { markdownService } from './markdownService';
import { ProfileRepository } from '../repositories/profileRepository';
import { getCurrentUser } from '../lib/supabase';
import { Profile, Timeline } from './types';

type ScenarioType = 'conservative' | 'balanced' | 'aggressive';

export class ProfileService {
  private static async getCurrentUserId(): Promise<string> {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User must be authenticated.");
    }
    return user.id;
  }

  /**
   * Saves the profile for the currently authenticated user.
   * Handles both creation and updates (upsert).
   * @param {Partial<Profile>} profileData - The profile data to save.
   * @returns {Promise<Profile>} The saved profile.
   */
  static async saveCurrentUserProfile(profileData: Partial<Profile>): Promise<Profile> {
    try {
      const profileToSave: Partial<Profile> = {
        ...profileData,
        updatedAt: new Date().toISOString()
      };

      // If it's a new profile, set the creation date and status
      if (!profileData.id) {
        profileToSave.createdAt = new Date().toISOString();
        profileToSave.status = 'complete'; // Mark as complete on first save
      }

      // Get current session for authorization
      const { supabase } = await import('../lib/supabase');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error('Authentication required for profile saving. Please sign in.');
      }

      // Use server-side API route to save profile (bypasses RLS issues)
      const response = await fetch('/api/profiles/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(profileToSave),
        credentials: 'same-origin'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Profile save failed: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Profile save failed');
      }

      console.log('✅ Profile saved successfully via API');
      return result.profile;
      
    } catch (error) {
      console.error('Error saving current user profile:', error);
      throw error;
    }
  }

  /**
   * Retrieves the profile for the currently authenticated user.
   * @returns {Promise<Profile | null>} The user's profile or null if not found.
   */
  static async getCurrentUserProfile(): Promise<Profile | null> {
    try {
      // Get current user session for authorization
      const { supabase } = await import('../lib/supabase');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.log('ℹ️ [ProfileService] No active session, user not authenticated');
        return null;
      }

      // Prepare request headers with authorization
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      // Call the profile fetch API route (server-side)
      console.log(`🌐 [ProfileService] Fetching profile via API...`);
      
      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch('/api/profiles/get', {
        method: 'GET',
        headers,
        credentials: 'same-origin',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 401) {
          console.log('ℹ️ [ProfileService] Authentication failed, user needs to sign in');
          return null;
        }
        
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ [ProfileService] Profile fetch API error:', errorData);
        throw new Error(errorData.error || `Profile fetch failed: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Profile fetch failed');
      }

      console.log(`✅ [ProfileService] Profile fetched successfully via API`);
      console.log(`📊 [ProfileService] API Response:`, { 
        success: result.success, 
        hasProfile: !!result.profile,
        profileId: result.profile?.id,
        profileCompany: result.profile?.companyName 
      });
      
      // Return the profile from API response (null if no profile exists)
      return result.profile;
      
    } catch (error) {
      console.error('❌ [ProfileService] Error in getCurrentUserProfile:', error);
      return null;
    }
  }

  /**
   * Deletes the profile for the currently authenticated user.
   * @returns {Promise<boolean>} Success status.
   */
  static async deleteCurrentUserProfile(): Promise<boolean> {
    try {
      const userId = await this.getCurrentUserId();
      return await ProfileRepository.deleteProfile(userId);
    } catch (error) {
      console.error('Error deleting current user profile:', error);
      return false;
    }
  }

  static async getTimelineFromProfile(profile: Profile, forceRegenerate = false, scenarioType: ScenarioType | null = null): Promise<Timeline> {
    try {
      const userId = await this.getCurrentUserId();
      
      if (!forceRegenerate) {
        const cachedTimeline = await ProfileRepository.getCachedTimeline(userId);
        if (cachedTimeline) {
            const scenarioMatches = !scenarioType || cachedTimeline.scenarioType === scenarioType;
            if (scenarioMatches) {
              console.log(`✅ Using cached timeline for user ${userId}`);
              return {
                ...cachedTimeline,
                _cached: true,
              };
            }
        }
      }
      
      console.log(`🔄 Generating new timeline for user ${userId}`);
      
      const finalScenarioType = scenarioType || this.determineScenarioType(profile);
      const timeline = await this._generateTimelineFromProfile(profile, finalScenarioType);
      
      try {
        await ProfileRepository.saveTimeline(userId, {
            ...timeline,
            _scenarioType: finalScenarioType,
            _generatedAt: new Date().toISOString(),
        });
      } catch (saveError: any) {
        console.warn('⚠️ Could not save timeline to cache:', saveError.message);
      }
      
      return {
        ...timeline,
        _cached: false,
        _generatedAt: new Date().toISOString(),
        _scenarioType: finalScenarioType,
      };
    } catch (error) {
      console.error('Error getting timeline from profile:', error);
      throw error;
    }
  }

  static async regenerateTimelineFromProfile(profile: Profile, scenarioType: ScenarioType = 'balanced'): Promise<Timeline> {
    return await this.getTimelineFromProfile(profile, true, scenarioType);
  }

  static async generateTimelineFromProfile(profile: Profile): Promise<Timeline> {
    return await this.getTimelineFromProfile(profile, false);
  }

  private static async _generateTimelineFromProfile(profile: Profile, scenarioType: ScenarioType = 'balanced'): Promise<Timeline> {
    try {
      console.log(`🔄 [ProfileService] Generating timeline via API for scenario: ${scenarioType}`);
      
      // Get current user session for authorization
      const { supabase } = await import('../lib/supabase');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.error('❌ [ProfileService] Authentication failed for timeline generation:', sessionError?.message);
        throw new Error('Authentication required for timeline generation. Please sign in.');
      }

      // Prepare request headers with authorization
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      // Call the timeline generation API route (server-side)
      console.log(`🌐 [ProfileService] Making API call to generate timeline...`);
      
      const response = await fetch('/api/timeline/generate-from-profile', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          // The API will fetch the user's profile on the server-side,
          // but we send the current state of the profile from the client
          // to ensure the latest unsaved data is used for generation.
          profile: profile,
          scenarioType: scenarioType,
          forceRegenerate: true // Always generate fresh for direct calls
        }),
        credentials: 'same-origin'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ [ProfileService] Timeline API error:', errorData);
        throw new Error(errorData.error || `Timeline generation failed: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Timeline generation failed');
      }

      console.log(`✅ [ProfileService] Timeline generated successfully via API`);
      
      // Return the timeline from API response
      return result.timeline;
      
    } catch (error) {
      console.error('❌ [ProfileService] Error generating timeline from profile:', error);
      
      // Enhanced error messages for common issues
      if (error instanceof Error) {
        if (error.message.includes('Authentication')) {
          throw new Error('Please sign in to generate timelines.');
        } else if (error.message.includes('AI provider not configured')) {
          throw new Error('No AI provider configured. Please configure an AI provider in admin settings.');
        } else if (error.message.includes('rate limit')) {
          throw new Error('Rate limit exceeded. Please try again in a few minutes.');
        }
      }
      
      throw error;
    }
  }

  static extractBusinessProfile(profile: Profile): any {
    return {
      companyName: profile.companyName,
      industry: profile.industry,
      companySize: this.mapCompanySize(profile.size || 'medium'),
      aiMaturityLevel: this.calculateAIMaturity(profile),
      primaryGoals: this.extractPrimaryGoals(profile),
      currentTechStack: profile.systemsAndApplications?.map(s => s.name) || [],
      budget: this.estimateBudgetRange(profile),
      timeframe: this.extractTimeframe(profile)
    };
  }

  private static estimateBudgetRange(profile: Profile): string {
    const initiativesBudget = profile.strategicInitiatives?.[0]?.estimatedBudget;
    if (initiativesBudget) return initiativesBudget;
    
    // Fallback logic if needed
    return '<100k';
  }

  private static extractTimeframe(profile: Profile): string {
    const initiativesTimeline = profile.strategicInitiatives?.[0]?.targetTimeline;
    if (initiativesTimeline) return initiativesTimeline;

    // Fallback logic
    return '1year';
  }

  static determineScenarioType(profile: Profile): ScenarioType {
    // Simplified logic, can be expanded
    const readinessScore = (profile.aiOpportunityAssessment?.aiReadinessScore || 50);
    if (readinessScore > 75) return 'aggressive';
    if (readinessScore < 50) return 'conservative';
    return 'balanced';
  }

  static async generateOpportunityRecommendations(profile: Profile): Promise<any[]> {
    const opportunities: any[] = [];
    
    profile.strategicInitiatives?.forEach(initiative => {
        initiative.businessProblems?.forEach(problem => {
            opportunities.push({
                department: initiative.initiative,
                title: `AI solution for: ${problem}`,
                description: `Develop an AI-driven approach to address the business problem '${problem}' within the '${initiative.initiative}' initiative.`,
                impact: 'High', // Placeholder
                effort: 'Medium', // Placeholder
                timeline: '3-6 months', // Placeholder
                priority: initiative.priority || 'Medium'
            });
        });
    });
    
    return opportunities.sort((a, b) => {
      const priorityOrder: { [key: string]: number } = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return (priorityOrder[b.priority] || 1) - (priorityOrder[a.priority] || 1);
    });
  }

  static enhanceTimelineWithProfile(timeline: Timeline, profile: Profile): Timeline {
    if (timeline.phases) {
      timeline.phases = timeline.phases.map((phase, index) => ({
        ...phase,
        profileInsights: this.getPhaseInsights(profile, index),
        specificOpportunities: this.getPhaseOpportunities(profile, index)
      }));
    }
    
    timeline.riskFactors = this.identifyRiskFactors(profile);
    
    timeline.competitiveContext = this.getCompetitiveContext(profile);
    
    return timeline;
  }

  private static getPhaseInsights(profile: Profile, phaseIndex: number): string {
    const topInitiative = profile.strategicInitiatives?.[0]?.initiative || 'your primary business goals';
    const topMetric = profile.strategicInitiatives?.[0]?.successMetrics?.[0] || 'key performance indicators';

    const insights: { [key: number]: string } = {
      0: `Focus on establishing a data foundation to support ${topInitiative}.`,
      1: `Implement a pilot project to address a key business problem, aiming for quick wins related to '${topMetric}'.`,
      2: `Scale successful pilots across the organization, leveraging the modern tech stack including ${profile.systemsAndApplications?.[0]?.name || 'your core systems'}.`,
      3: `Optimize AI models and workflows to maximize ROI and drive continuous improvement towards '${topMetric}'.`
    };
    
    return insights[phaseIndex] || 'Continue systematic AI adoption and innovation.';
  }

  private static getPhaseOpportunities(profile: Profile, phaseIndex: number): any[] {
      // This is a placeholder for a more complex implementation
      return [];
  }

  private static mapCompanySize(size: string): string {
    const mapping: { [key:string]: string } = {
        '1-50': 'startup',
        '51-250': 'small',
        '251-1000': 'medium',
        '1000+': 'large'
    };
    return mapping[size] || 'medium';
  }

  private static calculateAIMaturity(profile: Profile): string {
    const score = profile.aiOpportunityAssessment?.aiReadinessScore || 5; // Default to 5/10
    if (score <= 3) return 'beginner';
    if (score <= 6) return 'emerging';
    if (score <= 8) return 'developing';
    return 'advanced';
  }

  private static extractPrimaryGoals(profile: Profile): string[] {
    return profile.strategicInitiatives?.map(i => i.initiative) || [];
  }

  private static identifyRiskFactors(profile: Profile): any[] {
    const risks: any[] = [];
    const aiReadiness = profile.aiOpportunityAssessment?.aiReadinessScore || 50;
    
    if (aiReadiness < 40) {
      risks.push({
        type: 'Technical Readiness',
        level: 'High',
        description: 'Low AI readiness score may indicate foundational gaps (data, infrastructure) that could slow implementation.'
      });
    }
    
    // Add more risk factor identification logic here based on profile data
    
    return risks;
  }

  private static getCompetitiveContext(profile: Profile): any {
    return {
      urgency: 'Medium', // Placeholder
      differentiators: [], // Placeholder
      marketPosition: profile.industry === 'Technology' ? 'Fast-moving' : 'Traditional'
    };
  }

  // 🆕 Progressive Complexity - Core Normalization Functions

  /**
   * Generates strategic initiatives from business goals and challenges.
   * This is the core auto-generation logic for SMB users.
   * @param businessGoals - Array of business objectives/goals
   * @param keyChallenges - Array of key business challenges
   * @returns Array of StrategicInitiative objects
   */
  static generateInitiativesFromObjectives(
    businessGoals: string[], 
    keyChallenges: string[]
  ): any[] {
    if (!businessGoals || businessGoals.length === 0) {
      return [];
    }

    const initiatives: any[] = [];

    businessGoals.forEach((goal, index) => {
      // Map goal to initiative name
      const initiativeName = ProfileService.generateInitiativeName(goal);
      
      // Distribute challenges among goals (if fewer goals than challenges)
      const assignedChallenges = ProfileService.distributeChallenges(keyChallenges, index, businessGoals.length);
      
      const initiative = {
        initiative: initiativeName,
        businessProblems: assignedChallenges,
        expectedOutcomes: [goal],
        linkedObjective: goal,
        contact: {
          name: '',
          title: '',
          email: '',
          linkedin: '',
          phone: ''
        },
        priority: 'High' as const,
        status: 'Planning' as const
      };

      initiatives.push(initiative);
    });

    return initiatives;
  }

  /**
   * Normalizes profile data from different input methods (SMB vs Enterprise)
   * into a consistent Profile structure for LLM processing.
   * @param profileData - Raw profile input data
   * @param companySize - Company size classification
   * @returns Normalized Profile object
   */
  static normalizeProfileData(
    profileData: Partial<any>, 
    companySize?: 'SMB' | 'Mid-Market' | 'Enterprise'
  ): any {
    console.log('🔄 [ProfileService] Normalizing profile data:', { 
      companyName: profileData.companyName,
      companySize,
      hasBusinessGoals: !!profileData.businessGoals,
      hasStrategicInitiatives: !!profileData.strategicInitiatives 
    });

    // Start with the base profile data
    const normalized: any = {
      ...profileData,
      companySize: companySize || 'Enterprise', // Default fallback
      businessObjectives: profileData.businessObjectives || [],
      strategicInitiatives: profileData.strategicInitiatives || []
    };

    // Auto-generate business objectives from business goals (SMB input)
    if (profileData.businessGoals && profileData.businessGoals.length > 0) {
      const autoObjectives = profileData.businessGoals.map((goal: string) => ({
        objective: goal,
        targetMetric: ProfileService.extractTargetMetric(goal)
      }));
      
      normalized.businessObjectives = [...normalized.businessObjectives, ...autoObjectives];
    }

    // Auto-generate strategic initiatives if we have goals but no initiatives (SMB scenario)
    if (companySize === 'SMB' && 
        profileData.businessGoals && 
        profileData.businessGoals.length > 0 && 
        (!profileData.strategicInitiatives || profileData.strategicInitiatives.length === 0)) {
      
      const autoInitiatives = ProfileService.generateInitiativesFromObjectives(
        profileData.businessGoals || [],
        profileData.keyChallenges || []
      );
      
      normalized.strategicInitiatives = autoInitiatives;
      
      console.log(`✅ [ProfileService] Auto-generated ${autoInitiatives.length} initiatives for SMB`);
    }

    // If we have both user-provided and auto-generated initiatives, merge them
    if (profileData.businessGoals && 
        profileData.strategicInitiatives && 
        profileData.strategicInitiatives.length > 0) {
      
      const autoInitiatives = ProfileService.generateInitiativesFromObjectives(
        profileData.businessGoals || [],
        profileData.keyChallenges || []
      );
      
      normalized.strategicInitiatives = [
        ...profileData.strategicInitiatives,
        ...autoInitiatives
      ];
      
      console.log(`✅ [ProfileService] Combined existing and auto-generated initiatives`);
    }

    console.log('✅ [ProfileService] Profile normalization complete:', {
      objectivesCount: normalized.businessObjectives.length,
      initiativesCount: normalized.strategicInitiatives.length,
      companySize: normalized.companySize
    });

    return normalized;
  }

  // Helper functions for auto-generation

  private static generateInitiativeName(goal: string): string {
    // Smart mapping of goals to initiative names
    const goalLower = goal.toLowerCase();
    
    if (goalLower.includes('cost') || goalLower.includes('expense')) {
      return 'Cost Reduction Program';
    } else if (goalLower.includes('revenue') || goalLower.includes('sales') || goalLower.includes('growth')) {
      return 'Revenue Growth Program';
    } else if (goalLower.includes('efficiency') || goalLower.includes('productivity')) {
      return 'Operational Efficiency Program';
    } else if (goalLower.includes('customer') || goalLower.includes('satisfaction')) {
      return 'Customer Experience Enhancement Program';
    } else if (goalLower.includes('digital') || goalLower.includes('automation')) {
      return 'Digital Transformation Program';
    } else if (goalLower.includes('quality') || goalLower.includes('improve')) {
      return 'Quality Improvement Program';
    } else {
      return 'Strategic Business Program';
    }
  }

  private static distributeChallenges(challenges: string[], goalIndex: number, totalGoals: number): string[] {
    if (!challenges || challenges.length === 0) {
      return [];
    }

    // If we have as many or more goals than challenges, distribute evenly
    if (totalGoals >= challenges.length) {
      return goalIndex < challenges.length ? [challenges[goalIndex]] : [];
    }

    // If we have more challenges than goals, distribute them across goals
    const challengesPerGoal = Math.ceil(challenges.length / totalGoals);
    const startIndex = goalIndex * challengesPerGoal;
    const endIndex = Math.min(startIndex + challengesPerGoal, challenges.length);
    
    return challenges.slice(startIndex, endIndex);
  }

  private static extractTargetMetric(goal: string): string {
    // Extract numeric targets from goal text
    const percentMatch = goal.match(/(\d+)%/);
    if (percentMatch) {
      const goalLower = goal.toLowerCase();
      // More specific metric based on goal context
      if (goalLower.includes('cost') || goalLower.includes('expense')) {
        return `${percentMatch[1]}% cost reduction`;
      } else if (goalLower.includes('revenue') || goalLower.includes('sales')) {
        return `${percentMatch[1]}% revenue increase`;
      } else if (goalLower.includes('efficiency') || goalLower.includes('productivity')) {
        return `${percentMatch[1]}% efficiency gain`;
      } else if (goalLower.includes('satisfaction')) {
        return `${percentMatch[1]}% satisfaction improvement`;
      } else {
        return `${percentMatch[1]}% improvement`;
      }
    }
    
    const dollarMatch = goal.match(/\$([0-9,]+[KMB]?)/);
    if (dollarMatch) {
      return `${dollarMatch[0]} target`;
    }
    
    // Generic fallback
    return 'Measurable improvement';
  }
}

// Export the normalization functions for use in other modules and tests
export const normalizeProfileData = ProfileService.normalizeProfileData;
export const generateInitiativesFromObjectives = ProfileService.generateInitiativesFromObjectives;
