'use client';

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import useBusinessProfileStore from '../store/useBusinessProfileStore';
import { ProfileService } from '../services/profileService';

const getTimelineSections = (timelineData) => {
  if (!timelineData) return [];

  const sections = [];

  // 1. Current State
  sections.push({
    id: 'current-state',
    year: 'Today',
    title: 'Current State',
    subtitle: 'Where you are now',
    iconId: 'MapPin'
  });

  // 2. Dynamically add phases from AI response
  if (timelineData.phases && Array.isArray(timelineData.phases)) {
    timelineData.phases.forEach((phase, index) => {
      sections.push({
        id: `phase-${index + 1}`,
        year: phase.duration || `Year ${index + 1}`,
        title: phase.title,
        subtitle: phase.description.substring(0, 50) + '...', // Short subtitle
        iconId: 'Rocket' // You might want to make this dynamic later
      });
    });
  }

  // 3. Future State
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
    businessProfile,
    timelineData,
    isGenerating,
    generateTimeline,
    generateTimelineFromProfile,
    regenerateTimelineFromProfile,
    hasValidProfile,
    theme,
    toggleTheme,
    timelineCached,
    timelineGeneratedAt,
    timelineScenarioType
  } = useBusinessProfileStore();

  const searchParams = useSearchParams();
  const profileIdFromUrl = searchParams.get('profileId');

  const [activeSection, setActiveSection] = useState('current-state');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProfile, setCurrentProfile] = useState(null);

  const contentRef = useRef(null);
  const sectionRefs = useRef({});
  const effectRan = useRef(false);

  const timelineSections = getTimelineSections(timelineData);

  // Effect to initialize timeline from profile ID
  useEffect(() => {
    if (effectRan.current === true && process.env.NODE_ENV === 'development') {
      return;
    }

    const initializeTimeline = async () => {
      if (profileIdFromUrl) {
        setIsLoading(true);
        try {
          const loadedProfile = await ProfileService.getProfile(profileIdFromUrl);
          if (loadedProfile) {
            setCurrentProfile(loadedProfile);
            await generateTimelineFromProfile(loadedProfile);
          } else {
            console.warn(`Profile with ID ${profileIdFromUrl} not found.`);
            setCurrentProfile(null);
          }
        } catch (error) {
          console.error("Error loading profile for timeline:", error);
          setCurrentProfile(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setCurrentProfile(null);
      }
    };
    initializeTimeline();

    return () => {
      effectRan.current = true;
    }
  }, [profileIdFromUrl, generateTimelineFromProfile]);


  // Improved scroll handling logic
  useLayoutEffect(() => {
    const handleScroll = () => {
      const contentEl = contentRef.current;
      if (!contentEl || !timelineSections.length) return;

      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = contentEl;

      const progress = scrollHeight > clientHeight ? (scrollTop / (scrollHeight - clientHeight)) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(100, progress)));
      
      let newActiveSectionId;
      
      // Prevent a false positive on initial load before the container's height is fully calculated.
      const isScrollable = scrollHeight > clientHeight;
      const atBottom = isScrollable && (scrollHeight - scrollTop - clientHeight < 1);

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

    // Set the initial active section immediately to prevent flickering.
    setActiveSection('current-state');

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll, { passive: true });
      
      // Run on mount to set initial state correctly, with a small delay
      // to allow the browser to paint and calculate correct dimensions.
      const timer = setTimeout(() => handleScroll(), 100);

      return () => {
        clearTimeout(timer);
        contentElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [timelineData]); // Dependency on timelineData to re-run when sections change

  const handleSectionClick = useCallback((sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element && contentRef.current) {
      setActiveSection(sectionId); // Set active state immediately for better responsiveness
      contentRef.current.scrollTo({
        top: element.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  }, []);

  const regenerateTimeline = useCallback(async (profile, scenarioType = null) => {
    if (profile) {
      return await regenerateTimelineFromProfile(profile, scenarioType);
    }
  }, [regenerateTimelineFromProfile]);

  return {
    // State
    timelineData,
    businessProfile,
    currentProfile,
    isLoading: isLoading || isGenerating,
    activeSection,
    scrollProgress,
    timelineSections,
    theme,

    // Cache metadata
    timelineCached,
    timelineGeneratedAt,
    timelineScenarioType,

    // Refs
    contentRef,
    sectionRefs,

    // Actions
    handleSectionClick,
    toggleTheme,
    generateTimeline,
    regenerateTimeline,
    hasValidProfile,

    // Contextual flags
    isProfileTimeline: !!profileIdFromUrl
  };
} 