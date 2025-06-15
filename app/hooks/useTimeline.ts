'use client';

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import useBusinessProfileStore, { ScenarioType } from '../store/useBusinessProfileStore';
import { ProfileService } from '../services/profileService';
import { Profile, Timeline } from '../services/types';

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
    businessProfile,
    timelineData,
    isGenerating,
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
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  
  // New state for profile selection
  const [availableProfiles, setAvailableProfiles] = useState<Profile[]>([]);
  const [isLoadingProfiles, setIsLoadingProfiles] = useState<boolean>(false);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(profileIdFromUrl);

  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement }>({});
  const effectRan = useRef(false);

  const timelineSections = getTimelineSections(timelineData);

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
            setCurrentProfile(null);
          }
        } catch (error) {
          console.error("Error loading profile for timeline:", error);
          setCurrentProfile(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        // No profile ID in URL - clear timeline data and current profile
        setIsLoading(false);
        setCurrentProfile(null);
        // Clear any persisted timeline data when no profile is selected
        const { clearTimeline } = useBusinessProfileStore.getState();
        clearTimeline();
      }
    };
    initializeTimeline();

    return () => {
      effectRan.current = true;
    }
  }, [profileIdFromUrl, generateTimelineFromProfile]);


  useLayoutEffect(() => {
    const handleScroll = () => {
      const contentEl = contentRef.current;
      if (!contentEl || !timelineSections.length) return;

      const { scrollTop, scrollHeight, clientHeight } = contentEl;
      const progress = scrollHeight > clientHeight ? (scrollTop / (scrollHeight - clientHeight)) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(100, progress)));
      
      let newActiveSectionId: string;
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
  }, [timelineData, timelineSections]);

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

  const regenerateTimeline = useCallback(async (profile: Profile | null, scenarioType: ScenarioType | null = null, provider: string | null = null) => {
    if (profile) {
      return await regenerateTimelineFromProfile(profile, scenarioType, provider);
    }
    return undefined;
  }, [regenerateTimelineFromProfile]);

  // Load available profiles for dropdown
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setIsLoadingProfiles(true);
        const profiles = await ProfileService.getProfiles();
        setAvailableProfiles(profiles);
      } catch (error) {
        console.error('Error loading profiles for selector:', error);
        setAvailableProfiles([]);
      } finally {
        setIsLoadingProfiles(false);
      }
    };

    loadProfiles();
  }, []);

  // Profile selection handler
  const handleProfileSelect = useCallback(async (profile: Profile | null) => {
    if (!profile) {
      setSelectedProfileId(null);
      setCurrentProfile(null);
      return;
    }

    setSelectedProfileId(profile.id);
    setCurrentProfile(profile);
    
    try {
      // Use generateTimelineFromProfile which includes caching logic
      await generateTimelineFromProfile(profile);
    } catch (error) {
      console.error('Error generating timeline for selected profile:', error);
    }
  }, [generateTimelineFromProfile]);

  // Sync selectedProfileId with URL parameter
  useEffect(() => {
    setSelectedProfileId(profileIdFromUrl);
  }, [profileIdFromUrl]);

  return {
    timelineData,
    businessProfile,
    currentProfile,
    isLoading: isLoading || isGenerating,
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
    hasValidProfile,
    isProfileTimeline: !!profileIdFromUrl,
    // Profile selection functionality
    availableProfiles,
    isLoadingProfiles,
    selectedProfileId,
    handleProfileSelect
  };
} 