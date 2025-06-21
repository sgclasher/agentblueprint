'use client';

import { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import useBusinessProfileStore, { ScenarioType } from '../store/useBusinessProfileStore';
import useAuthStore from '../store/useAuthStore';
import { Timeline } from '../services/types';

interface TimelineSection {
    id: string;
    year: string;
    title: string;
    subtitle: string;
    iconId: string;
}

const getTimelineSections = (timelineData: Timeline | null): TimelineSection[] => {
  if (!timelineData) return [];

  const sections: TimelineSection[] = [];

  sections.push({
    id: 'current-state',
    year: 'Today',
    title: 'Current State',
    subtitle: 'Where you are now',
    iconId: 'MapPin'
  });

  if (timelineData.phases && Array.isArray(timelineData.phases)) {
    timelineData.phases.forEach((phase, index) => {
      sections.push({
        id: `phase-${index + 1}`,
        year: phase.duration || `Year ${index + 1}`,
        title: phase.title,
        subtitle: phase.description.substring(0, 50) + '...',
        iconId: 'Rocket'
      });
    });
  }

  sections.push({
    id: 'future-state',
    year: `Year ${timelineData.phases?.length ? timelineData.phases.length + 1 : '3-5'}`,
    title: 'Future State',
    subtitle: 'Vision realized',
    iconId: 'Target'
  });

  return sections;
};

export function useTimeline() {
  const {
    timelineData,
    isGenerating,
    generateTimeline,
    theme,
    toggleTheme,
    timelineCached,
    timelineGeneratedAt,
    timelineScenarioType,
  } = useBusinessProfileStore();
  
  const { profile: currentProfile, isLoading: isAuthLoading } = useAuthStore();

  const [activeSection, setActiveSection] = useState('current-state');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoadingTimeline, setIsLoadingTimeline] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement }>({});
  
  const timelineSections = useMemo(() => getTimelineSections(timelineData), [timelineData]);

  useEffect(() => {
    console.log('🔄 [useTimeline] useEffect triggered with state:', {
      isAuthLoading,
      hasCurrentProfile: !!currentProfile,
      hasTimelineData: !!timelineData,
      isLoadingTimeline,
      currentProfileId: currentProfile?.id
    });
    
    // Load cached timeline when profile is available, but don't auto-generate
    if (!isAuthLoading && currentProfile && !timelineData && !isLoadingTimeline) {
      console.log('✅ [useTimeline] Conditions met, starting timeline load');
      setIsLoadingTimeline(true);
      loadCachedTimeline();
    } else {
      console.log('❌ [useTimeline] Conditions not met for timeline load:', {
        authLoading: isAuthLoading,
        hasProfile: !!currentProfile,
        hasTimeline: !!timelineData,
        alreadyLoading: isLoadingTimeline
      });
    }
  }, [currentProfile, isAuthLoading, timelineData]); // Removed isLoadingTimeline from dependencies

  const loadCachedTimeline = async () => {
    console.log('🚀 [loadCachedTimeline] Starting timeline load');
    try {
      // Get current session for authorization (same pattern as ProfileService)
      const { supabase } = await import('../lib/supabase');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.log('❌ [loadCachedTimeline] No active session for timeline loading');
        setIsLoadingTimeline(false);
        return;
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      const response = await fetch('/api/timeline/load?includeMetadata=true', {
        method: 'GET',
        headers,
        credentials: 'same-origin'
      });

      if (!response.ok) {
        console.log('❌ [loadCachedTimeline] Failed to load cached timeline:', response.status);
        // Clear loading state so UI doesn't hang
        useBusinessProfileStore.setState({
          timelineData: null,
          timelineCached: false,
          timelineGeneratedAt: null,
          timelineScenarioType: null,
          isGenerating: false
        });
        console.log('🔧 [loadCachedTimeline] Setting isLoadingTimeline to false after API error');
        setIsLoadingTimeline(false);
        return;
      }

      const result = await response.json();
      
      if (result.success && result.timeline) {
        // Load cached timeline into store
        console.log('✅ [loadCachedTimeline] Timeline found, loading into store');
        useBusinessProfileStore.setState({
          timelineData: result.timeline,
          timelineCached: true,
          timelineGeneratedAt: result.generatedAt,
          timelineScenarioType: result.scenarioType,
          isGenerating: false
        });
        console.log('🔧 [loadCachedTimeline] Setting isLoadingTimeline to false after successful load');
        setIsLoadingTimeline(false);
        console.log('✅ [loadCachedTimeline] Cached timeline loaded successfully');
      } else {
        // No timeline found - clear loading state so UI shows generate button
        console.log('💾 [loadCachedTimeline] No timeline found, clearing state');
        useBusinessProfileStore.setState({
          timelineData: null,
          timelineCached: false,
          timelineGeneratedAt: null,
          timelineScenarioType: null,
          isGenerating: false
        });
        console.log('🔧 [loadCachedTimeline] Setting isLoadingTimeline to false after no timeline found');
        setIsLoadingTimeline(false);
        console.log('💾 [loadCachedTimeline] No cached timeline available - ready for generation');
      }
    } catch (error) {
      console.error('❌ [loadCachedTimeline] Error loading cached timeline:', error);
      // Clear loading state on any error
      useBusinessProfileStore.setState({
        timelineData: null,
        timelineCached: false,
        timelineGeneratedAt: null,
        timelineScenarioType: null,
        isGenerating: false
      });
      console.log('🔧 [loadCachedTimeline] Setting isLoadingTimeline to false after exception');
      setIsLoadingTimeline(false);
    }
  };


  useLayoutEffect(() => {
    const handleScroll = () => {
      const contentEl = contentRef.current;
      if (!contentEl || !timelineSections.length) return;

      const { scrollTop, scrollHeight, clientHeight } = contentEl;
      const progress = scrollHeight > clientHeight ? (scrollTop / (scrollHeight - clientHeight)) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(100, progress)));
      
      let newActiveSectionId: string;
      const isScrollable = scrollHeight > clientHeight;
      const atBottom = isScrollable && (scrollHeight - scrollTop - clientHeight < 5);

      if (atBottom) {
        newActiveSectionId = timelineSections[timelineSections.length - 1].id;
      } else {
        const scrollPosition = scrollTop + 150;
        
        const currentSection = timelineSections
          .slice()
          .reverse()
          .find(section => {
            const el = sectionRefs.current[section.id];
            return el && el.offsetTop <= scrollPosition;
          });
        
        newActiveSectionId = currentSection ? currentSection.id : (timelineSections[0]?.id || 'current-state');
      }
      
      setActiveSection(newActiveSectionId);
    };

    setActiveSection('current-state');

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll, { passive: true });
      
      const timer = setTimeout(() => handleScroll(), 100);

      return () => {
        clearTimeout(timer);
        contentElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [timelineSections]);

  const handleSectionClick = useCallback((sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element && contentRef.current) {
      setActiveSection(sectionId);
      contentRef.current.scrollTo({
        top: element.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  }, []);

  const regenerateTimeline = useCallback(async (scenarioType?: ScenarioType) => {
    // Add confirmation dialog to prevent accidental expensive API calls
    const confirmed = window.confirm(
      'Are you sure you want to regenerate the timeline? This will create a new AI-generated timeline and may take a few minutes.'
    );
    
    if (!confirmed) {
      console.log('Timeline regeneration cancelled by user');
      return;
    }

    console.log('🔄 User confirmed timeline regeneration');
    
    // Clear existing data to show generating state
    useBusinessProfileStore.setState({
      timelineData: null,
      timelineCached: false,
      timelineGeneratedAt: null,
      timelineScenarioType: null,
      isGenerating: true
    });

    try {
      // Force regeneration through the store
      await generateTimeline(true);
    } catch (error) {
      console.error('Timeline regeneration failed:', error);
      // Reset generating state on error
      useBusinessProfileStore.setState({
        isGenerating: false
      });
      throw error;
    }
  }, [generateTimeline]);

  const checkScenarioAndLoad = useCallback(async (requestedScenario: ScenarioType) => {
    if (!currentProfile) return;

    try {
      // Get current session for authorization
      const { supabase } = await import('../lib/supabase');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.log('No active session for scenario check');
        return;
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      const response = await fetch(`/api/timeline/load?scenarioType=${requestedScenario}`, {
        method: 'GET',
        headers,
        credentials: 'same-origin'
      });

      if (!response.ok) {
        console.log('Failed to check scenario timeline');
        return;
      }

      const result = await response.json();
      
      if (result.success && result.timeline) {
        // Timeline exists for this scenario
        useBusinessProfileStore.setState({
          timelineData: result.timeline,
          timelineCached: true,
          timelineGeneratedAt: result.generatedAt,
          timelineScenarioType: result.scenarioType,
          scenarioType: requestedScenario
        });
        console.log(`✅ Timeline loaded for ${requestedScenario} scenario`);
      } else if (result.scenarioMismatch) {
        // Need to regenerate for different scenario
        console.log(`🔄 Need to regenerate for ${requestedScenario} scenario`);
        return { needsRegeneration: true, cachedScenario: result.cachedScenario };
      } else {
        // No timeline exists
        console.log(`💾 No timeline exists for ${requestedScenario} scenario`);
        return { needsRegeneration: true };
      }
    } catch (error) {
      console.error('Error checking scenario timeline:', error);
    }
  }, [currentProfile]);

  return {
    timelineData,
    currentProfile,
    isLoading: isAuthLoading || isLoadingTimeline || isGenerating,
    activeSection,
    scrollProgress,
    timelineSections,
    theme,
    timelineCached,
    timelineGeneratedAt,
    timelineScenarioType,
    contentRef,
    sectionRefs,
    handleSectionClick,
    toggleTheme,
    regenerateTimeline,
    checkScenarioAndLoad,
    loadCachedTimeline,
    hasProfile: !!currentProfile,
  };
} 