'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import { Profile, Timeline } from '../services/types';

export type ScenarioType = 'conservative' | 'balanced' | 'aggressive';
type Theme = 'light' | 'dark';

interface BusinessProfileState {
    businessProfile: Partial<Profile>;
    scenarioType: ScenarioType;
    selectedProvider: string | null;
    selectedYear: number;
    expandedSections: { [key: string]: boolean };
    theme: Theme;
    timelineData: Timeline | null;
    isGenerating: boolean;
    timelineCached: boolean;
    timelineGeneratedAt: string | null;
    timelineScenarioType: ScenarioType | null;
}

interface BusinessProfileActions {
    setBusinessProfile: (profile: Partial<Profile>) => void;
    updateBusinessProfile: (updates: Partial<Profile>) => void;
    setScenarioType: (type: ScenarioType) => void;
    setSelectedProvider: (provider: string | null) => void;
    setSelectedYear: (year: number) => void;
    toggleSection: (sectionId: string) => void;
    toggleTheme: () => void;
    expandAllSections: () => void;
    collapseAllSections: () => void;
    hasValidProfile: () => boolean;
    generateTimeline: (profile?: Partial<Profile>) => Promise<void>;
    generateTimelineFromProfile: (profile: Partial<Profile>, forceRegenerate?: boolean, scenarioType?: ScenarioType | null) => Promise<Timeline | undefined>;
    regenerateTimelineFromProfile: (profile: Partial<Profile>, scenarioType?: ScenarioType | null, provider?: string | null) => Promise<Timeline | undefined>;
    clearTimeline: () => void;
}

type BusinessProfileStore = BusinessProfileState & BusinessProfileActions;


const useBusinessProfileStore = create<BusinessProfileStore>()(
  persist(
    (set, get) => ({
      businessProfile: {
        companyName: '',
        industry: '',
        companySize: '',
        currentTechStack: [],
        aiMaturityLevel: '',
        primaryGoals: [],
        budget: '',
        timeframe: '',
      },
      scenarioType: 'balanced',
      selectedProvider: null,
      selectedYear: new Date().getFullYear(),
      expandedSections: {},
      theme: 'dark',
      timelineData: null,
      isGenerating: false,
      timelineCached: false,
      timelineGeneratedAt: null,
      timelineScenarioType: null,
      
      setBusinessProfile: (profile) => 
        set({ businessProfile: { ...get().businessProfile, ...profile } }),
        
      updateBusinessProfile: (updates) => 
        set({ businessProfile: { ...get().businessProfile, ...updates } }),
      
      setScenarioType: (type) => set({ scenarioType: type }),
      
      setSelectedProvider: (provider) => set({ selectedProvider: provider }),
      
      setSelectedYear: (year) => set({ selectedYear: year }),
      
      toggleSection: (sectionId) => 
        set((state) => ({
          expandedSections: {
            ...state.expandedSections,
            [sectionId]: !state.expandedSections[sectionId]
          }
        })),
      
      toggleTheme: () => 
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark'
        })),
      
      expandAllSections: () => {
        const sections = ['current-state', 'phase-1', 'phase-2', 'phase-3', 'phase-4', 'future-state'];
        const expanded: { [key: string]: boolean } = {};
        sections.forEach(section => { expanded[section] = true; });
        set({ expandedSections: expanded });
      },
      
      collapseAllSections: () => set({ expandedSections: {} }),
      
      hasValidProfile: () => {
        const { businessProfile } = get();
        return !!(businessProfile.companyName && 
               businessProfile.industry && 
               businessProfile.companySize &&
               businessProfile.aiMaturityLevel &&
               businessProfile.primaryGoals &&
               (businessProfile.primaryGoals as any[]).length > 0);
      },
      
      generateTimeline: async (profile) => {
        set({ isGenerating: true });
        
        if (profile) {
          set({ businessProfile: profile });
        }
        
        const { businessProfile, scenarioType, selectedProvider } = get();
        
        try {
          const response = await fetch('/api/timeline/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              businessProfile,
              scenarioType,
              provider: selectedProvider,
            })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          set({ timelineData: data.timeline, isGenerating: false });
        } catch (error) {
          console.error('Error generating timeline:', error);
          set({ isGenerating: false });
          throw error;
        }
      },
      
      generateTimelineFromProfile: async (profile, forceRegenerate = false, scenarioType = null) => {
        set({ isGenerating: true });
        
        try {
          const { selectedProvider } = get();
          
          const { data: { session } } = await supabase.auth.getSession();

          const headers: HeadersInit = { 'Content-Type': 'application/json' };
          if (session?.access_token) {
            headers['Authorization'] = `Bearer ${session.access_token}`;
          }
          
          const response = await fetch('/api/timeline/generate-from-profile', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
              profileId: profile.id || null,
              profile: profile,
              forceRegenerate,
              scenarioType,
              provider: selectedProvider,
            })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          
          set({ 
            timelineData: data.timeline, 
            isGenerating: false,
            timelineCached: data.cached || false,
            timelineGeneratedAt: data.generatedAt,
            timelineScenarioType: data.scenarioType || 'balanced'
          });
          
          return data.timeline;
        } catch (error) {
          console.error('Error generating timeline from profile:', error);
          set({ isGenerating: false });
          throw error;
        }
      },

      regenerateTimelineFromProfile: async (profile, scenarioType = null, provider = null) => {
        if (provider) {
          set({ selectedProvider: provider });
        }
        return await get().generateTimelineFromProfile(profile, true, scenarioType);
      },
      
      clearTimeline: () => set({ 
        timelineData: null, 
        expandedSections: {},
        timelineCached: false,
        timelineGeneratedAt: null,
        timelineScenarioType: null
      }),
    }),
    {
      name: 'business-profile-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBusinessProfileStore; 