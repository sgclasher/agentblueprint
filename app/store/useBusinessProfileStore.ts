'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Profile, Timeline } from '../services/types';
import { ProfileService } from '../services/profileService';
import useAuthStore from './useAuthStore';

export type ScenarioType = 'conservative' | 'balanced' | 'aggressive';
type Theme = 'light' | 'dark';

interface TimelineState {
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

interface TimelineActions {
    setScenarioType: (type: ScenarioType) => void;
    setSelectedProvider: (provider: string | null) => void;
    setSelectedYear: (year: number) => void;
    toggleSection: (sectionId: string) => void;
    toggleTheme: () => void;
    expandAllSections: () => void;
    collapseAllSections: () => void;
    generateTimeline: (forceRegenerate?: boolean) => Promise<Timeline | undefined>;
    clearTimeline: () => void;
}

type TimelineStore = TimelineState & TimelineActions;

const useBusinessProfileStore = create<TimelineStore>()(
  persist(
    (set, get) => ({
      // State related to the timeline generation and UI, not the profile itself
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
      
      generateTimeline: async (forceRegenerate = false) => {
        const { scenarioType, selectedProvider } = get();
        const profile = useAuthStore.getState().profile;

        if (!profile) {
          throw new Error("No profile loaded. Cannot generate timeline.");
        }

        set({ isGenerating: true });
        try {
          const result = await ProfileService.getTimelineFromProfile(
            profile,
            forceRegenerate,
            scenarioType
          );

          set({ 
            timelineData: result,
            isGenerating: false,
            timelineCached: result._cached || false,
            timelineGeneratedAt: result._generatedAt || new Date().toISOString(),
            timelineScenarioType: result._scenarioType || scenarioType
          });

          return result;
        } catch (error) {
          console.error('Error generating timeline from profile:', error);
          set({ isGenerating: false });
          throw error;
        }
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
      name: 'timeline-ui-storage', // Renamed to reflect its new purpose
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBusinessProfileStore; 