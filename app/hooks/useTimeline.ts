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

  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement }>({});
  
  const timelineSections = useMemo(() => getTimelineSections(timelineData), [timelineData]);

  useEffect(() => {
    // Only attempt to generate a timeline if auth has loaded and a profile exists.
    if (!isAuthLoading && currentProfile) {
      // The generateTimeline function from the store now handles everything.
      // It has its own internal logic to avoid re-fetching if data exists.
      generateTimeline(false); 
    }
  }, [currentProfile, isAuthLoading, generateTimeline]);


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
    // The store's generateTimeline function now handles regeneration.
    await generateTimeline(true);
  }, [generateTimeline]);

  return {
    timelineData,
    currentProfile,
    isLoading: isAuthLoading || isGenerating,
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
    hasProfile: !!currentProfile,
  };
} 