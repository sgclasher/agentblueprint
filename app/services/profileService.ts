'use client';

import { markdownService } from './markdownService';
import { ProfileRepository } from '../repositories/profileRepository';
import { getCurrentUser } from '../lib/supabase';
import { Profile, Timeline } from './types';

type ScenarioType = 'conservative' | 'balanced' | 'aggressive';

export class ProfileService {
  static async getCurrentUserId(): Promise<string | null> {
    try {
      const user = await getCurrentUser();
      return user?.id || null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  static async createProfile(profileData: Partial<Profile>): Promise<Profile> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error("User must be authenticated to create a profile.");
      }

      const markdown = markdownService.generateMarkdown(profileData);
      
      const profile: Partial<Profile> = {
        ...profileData,
        markdown,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft'
      };
      
      const createdProfile = await ProfileRepository.createProfile(profile, userId);
      return createdProfile as Profile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  static async getProfiles(): Promise<Profile[]> {
    try {
      const userId = await this.getCurrentUserId();
      const profiles = await ProfileRepository.getProfiles(userId);
      return profiles as Profile[];
    } catch (error) {
      console.error('Error getting profiles:', error);
      return [];
    }
  }

  static async getProfile(id: string): Promise<Profile | null> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) return null;
      const profile = await ProfileRepository.getProfile(id, userId);
      return profile as Profile | null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  static async updateProfile(profileId: string, updates: Partial<Profile>): Promise<Profile> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error("User must be authenticated to update a profile.");
      }
      
      const updatedData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      const updatedProfile = await ProfileRepository.updateProfile(profileId, updatedData, userId);
      return updatedProfile as Profile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  static async deleteProfile(profileId: string): Promise<boolean> {
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

  static async getTimelineFromProfile(profile: Profile, forceRegenerate = false, scenarioType: ScenarioType | null = null): Promise<Timeline> {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error("User authentication is required for timeline generation.");
      }
      
      const hasProfileId = profile && profile.id;
      
      if (hasProfileId && !forceRegenerate) {
        const cached = await ProfileRepository.getCachedTimeline(profile.id, userId) as { timeline: Timeline; generatedAt: string; scenarioType: ScenarioType } | null;
        if (cached && cached.timeline) {
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
      
      const finalScenarioType = scenarioType || this.determineScenarioType(profile);
      const timeline = await this._generateTimelineFromProfile(profile, finalScenarioType);
      
      if (hasProfileId) {
        try {
          await ProfileRepository.saveTimeline(profile.id, timeline, finalScenarioType, userId);
        } catch (saveError: any) {
          console.warn('⚠️ Could not save timeline to cache:', saveError.message);
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

  static async regenerateTimelineFromProfile(profile: Profile, scenarioType: ScenarioType = 'balanced'): Promise<Timeline> {
    return await this.getTimelineFromProfile(profile, true, scenarioType);
  }

  static async generateTimelineFromProfile(profile: Profile): Promise<Timeline> {
    return await this.getTimelineFromProfile(profile, false);
  }

  static async _generateTimelineFromProfile(profile: Profile, scenarioType: ScenarioType = 'balanced'): Promise<Timeline> {
    try {
      const profileMarkdown = markdownService.generateMarkdown(profile);
      
      const businessProfile = this.extractBusinessProfile(profile);
      
      const { TimelineService } = await import('./timelineService');
      const timeline = await TimelineService.generateTimelineFromMarkdown(profileMarkdown, scenarioType, businessProfile);
      
      return this.enhanceTimelineWithProfile(timeline, profile);
    } catch (error) {
      console.error('Error generating timeline from profile:', error);
      throw error;
    }
  }

  static extractBusinessProfile(profile: Profile): any {
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

  static estimateBudgetRange(profile: Profile): string {
    const budget = profile.valueSellingFramework?.decisionMakers?.economicBuyer?.budget;
    if (budget) {
      return budget;
    }
    
    const impact = profile.valueSellingFramework?.impact?.totalAnnualImpact || 0;
    if (impact > 5000000) return '>5m';
    if (impact > 1000000) return '1m-5m';
    if (impact > 500000) return '500k-1m';
    if (impact > 100000) return '100k-500k';
    return '<100k';
  }

  static extractTimeframe(profile: Profile): string {
    const timeline = profile.valueSellingFramework?.buyingProcess?.timeline;
    if (timeline) {
      const months = parseInt(timeline);
      if (months <= 3) return '3months';
      if (months <= 6) return '6months';
      if (months <= 12) return '1year';
      return '2years+';
    }
    return '1year';
  }

  static determineScenarioType(profile: Profile): ScenarioType {
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

  static async generateOpportunityRecommendations(profile: Profile): Promise<any[]> {
    const opportunities: any[] = [];
    
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

  static getPhaseInsights(profile: Profile, phaseIndex: number): string {
    const insights: { [key: number]: string } = {
      0: `Focus on ${profile.primaryBusinessIssue} while building foundation`,
      1: `Address ${profile.topProblem} with targeted automation`,
      2: `Scale successful pilots across ${profile.size} organization`,
      3: `Optimize for ${profile.successMetrics?.join(', ')} improvements`
    };
    
    return insights[phaseIndex] || 'Continue systematic AI adoption';
  }

  static getPhaseOpportunities(profile: Profile, phaseIndex: number): any[] {
      // This is a placeholder for a more complex implementation
      return [];
  }

  static calculateFinanceImpact(profile: Profile): number {
    const laborCosts = profile.valueSellingFramework?.impact?.laborCosts || 0;
    const errorCosts = profile.valueSellingFramework?.impact?.errorCosts || 0;
    return Math.round((laborCosts * 0.3) + (errorCosts * 0.8));
  }

  static calculateHRImpact(profile: Profile): number {
    const employeeCount = parseInt(profile.employeeCount) || 100;
    return Math.round(employeeCount * 1000);
  }

  static calculateServiceImpact(profile: Profile): number {
    const totalImpact = profile.valueSellingFramework?.impact?.totalAnnualImpact || 0;
    return Math.round(totalImpact * 0.25);
  }

  static mapCompanySize(size: string): string {
    const mapping: { [key: string]: string } = {
      '1-50 employees': 'startup',
      '51-200 employees': 'small',
      '201-1000 employees': 'medium',
      '1000+ employees': 'large'
    };
    return mapping[size] || 'medium';
  }

  static calculateAIMaturity(profile: Profile): string {
    const score = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
    if (score <= 3) return 'beginner';
    if (score <= 6) return 'emerging';
    if (score <= 8) return 'developing';
    return 'advanced';
  }

  static extractPrimaryGoals(profile: Profile): string[] {
    const goals: string[] = [];
    if (profile.businessIssue?.revenueGrowth) goals.push('Increase Revenue');
    if (profile.businessIssue?.costReduction) goals.push('Reduce Operational Costs');
    if (profile.businessIssue?.customerExperience) goals.push('Improve Customer Experience');
    if (profile.businessIssue?.operationalEfficiency) goals.push('Automate Workflows');
    return goals;
  }

  static identifyRiskFactors(profile: Profile): any[] {
    const risks: any[] = [];
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

  static getCompetitiveContext(profile: Profile): any {
    return {
      urgency: profile.competitivePressure ? 'High' : 'Medium',
      differentiators: profile.differentiationRequirements || [],
      marketPosition: profile.industry === 'Technology' ? 'Fast-moving' : 'Traditional'
    };
  }
}
