'use client';

import React, { useLayoutEffect, useRef, useState, FC } from 'react';
import styles from './TimelineSidebar.module.css';
import ProfileSelector from './ProfileSelector';
import { ScenarioType } from '../../store/useBusinessProfileStore';
import { Profile, Timeline } from '../../services/types';

interface TimelineSection {
    id: string;
    year: string;
    title: string;
    subtitle: string;
}

interface TimelineSidebarProps {
    sections: TimelineSection[];
    activeSection: string;
    onSectionClick: (id: string) => void;
    theme: string;
    onThemeToggle: () => void;
    // Profile selection props
    availableProfiles?: Profile[];
    isLoadingProfiles?: boolean;
    selectedProfileId?: string | null;
    onProfileSelect?: (profile: Profile | null) => void;
}

const TimelineSidebar: FC<TimelineSidebarProps> = ({ 
  sections, 
  activeSection, 
  onSectionClick,
  theme,
  onThemeToggle,
  // Profile selection props
  availableProfiles = [],
  isLoadingProfiles = false,
  selectedProfileId = null,
  onProfileSelect
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  
  const [trackContainerTop, setTrackContainerTop] = useState('0px');
  const [trackContainerHeight, setTrackContainerHeight] = useState('0px');
  const [blueProgressBarHeight, setBlueProgressBarHeight] = useState('0px');

  const TIMELINE_SPACING_MD_PX = 16;
  const DOT_HALF_HEIGHT_PX = 12;
  const DOT_FULL_HEIGHT_PX = 24;



  useLayoutEffect(() => {
    if (navRef.current && sections && sections.length > 0) {
      const firstItemId = sections[0].id;
      const lastItemId = sections[sections.length - 1].id;
      const firstItemEl = itemRefs.current[firstItemId];
      const lastItemEl = itemRefs.current[lastItemId];
      const activeItemEl = activeSection ? itemRefs.current[activeSection] : null;

      let newTrackTop = 0;
      let newTrackHeight = 0;
      let newBlueBarHeight = 0;

      if (firstItemEl) {
        newTrackTop = firstItemEl.offsetTop + TIMELINE_SPACING_MD_PX + DOT_HALF_HEIGHT_PX;
      } else {
        setTrackContainerTop('0px'); 
        setTrackContainerHeight('0px');
        setBlueProgressBarHeight('0px');
        return;
      }

      if (lastItemEl) {
        const lastDotCenterY = lastItemEl.offsetTop + TIMELINE_SPACING_MD_PX + DOT_HALF_HEIGHT_PX;
        newTrackHeight = lastDotCenterY - newTrackTop;
      }
      
      if (newTrackHeight < DOT_FULL_HEIGHT_PX && sections.length >=1) {
        newTrackHeight = DOT_FULL_HEIGHT_PX; 
      }
      newTrackHeight = Math.max(DOT_FULL_HEIGHT_PX, newTrackHeight);

      setTrackContainerTop(`${newTrackTop}px`);
      setTrackContainerHeight(`${newTrackHeight}px`);

      if (activeItemEl) {
        const activeDotCenterY = activeItemEl.offsetTop + TIMELINE_SPACING_MD_PX + DOT_HALF_HEIGHT_PX;
        newBlueBarHeight = activeDotCenterY - newTrackTop; 
      } else if (firstItemEl) {
        newBlueBarHeight = DOT_HALF_HEIGHT_PX;
      }
      setBlueProgressBarHeight(`${Math.max(0, newBlueBarHeight)}px`);

    } else {
      setTrackContainerTop('0px');
      setTrackContainerHeight('0px');
      setBlueProgressBarHeight('0px');
    }
  }, [activeSection, sections, TIMELINE_SPACING_MD_PX, DOT_HALF_HEIGHT_PX, DOT_FULL_HEIGHT_PX]);



  return (
    <aside className={styles.timelineSidebar}>
      <div className={styles.timelineSidebarHeader}>
        <div className={styles.headerContainer}>
          <h3>Your AI Journey</h3>
        </div>
        
        {/* Profile Selector */}
        {onProfileSelect && (
          <ProfileSelector
            selectedProfileId={selectedProfileId}
            onProfileSelect={onProfileSelect}
            disabled={false}
          />
        )}
      </div>
      
      <nav className={styles.timelineNav} ref={navRef}>
        {sections.length > 0 && (
          <div 
            className={styles.timelineProgressBarContainer} 
            style={{ 
              top: trackContainerTop, 
              height: trackContainerHeight,
            }}
          >
            <div 
              className={styles.timelineProgressBar} 
              style={{
                height: blueProgressBarHeight,
              }}
            />
          </div>
        )}

        {sections.map((section) => (
          <button
            key={section.id}
            ref={(el) => { itemRefs.current[section.id] = el; }} 
            className={`${styles.timelineNavItem} ${activeSection === section.id ? styles.active : ''}`}
            onClick={() => onSectionClick(section.id)}
          >
            <div className={styles.timelineNavDot}></div> 
            <div className={styles.timelineNavContent}>
              <div className={styles.timelineNavYear}>{section.year}</div>
              <div className={styles.timelineNavTitle}>{section.title}</div>
              <div className={styles.timelineNavSubtitle}>{section.subtitle}</div>
            </div>
          </button>
        ))}
      </nav>


    </aside>
  );
}

export default TimelineSidebar; 