'use client';

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import useBusinessProfileStore from '../store/useBusinessProfileStore';
import { ProfileService } from '../services/profileService';

const getTimelineSections = (timelineData) => {
  if (!timelineData) return [];
  return [{
    id: 'current-state',
    year: 'Today',
    title: 'Current State',
    subtitle: 'Where you are now',
    iconId: 'MapPin'
  }, {
    id: 'phase-1',
    year: 'Q1-Q2',
    title: 'Foundation',
    subtitle: 'Building AI capabilities',
    iconId: 'Building'
  }, {
    id: 'phase-2',
    year: 'Q3-Q4',
    title: 'Implementation',
    subtitle: 'Deploying solutions',
    iconId: 'Rocket'
  }, {
    id: 'phase-3',
    year: 'Year 2',
    title: 'Expansion',
    subtitle: 'Scaling operations',
    iconId: 'TrendingUp'
  }, {
    id: 'phase-4',
    year: 'Year 3',
    title: 'Optimization',
    subtitle: 'Maximizing value',
    iconId: 'Zap'
  }, {
    id: 'future-state',
    year: 'Year 5',
    title: 'Future State',
    subtitle: 'Vision realized',
    iconId: 'Target'
  }, ];
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

      // More reliable active section detection
      // We'll find the last section that has scrolled past the top of the viewport
      // with a 150px offset for better user experience.
      const scrollPosition = scrollTop + 150;
      
      const currentSection = timelineSections
        .slice() // Create a shallow copy to reverse
        .reverse()
        .find(section => {
          const el = sectionRefs.current[section.id];
          return el && el.offsetTop <= scrollPosition;
        });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      } else {
        // Fallback to the first section if none are active (e.g., at the very top)
        setActiveSection(timelineSections[0]?.id || 'current-state');
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll, { passive: true });
      // Run on mount to set initial state correctly
      handleScroll(); 
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
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