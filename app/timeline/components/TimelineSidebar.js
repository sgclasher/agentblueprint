'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import styles from './TimelineSidebar.module.css';

export default function TimelineSidebar({ 
  sections, 
  activeSection, 
  onSectionClick, 
  theme, 
  onThemeToggle,
  // New props for cache functionality
  timelineCached,
  timelineGeneratedAt,
  timelineScenarioType,
  onRegenerateTimeline,
  isGenerating = false,
  currentProfile = null
}) {
  const navRef = useRef(null); // Ref for the main navigation container
  const itemRefs = useRef({}); // Refs for individual navigation items
  
  const [trackContainerTop, setTrackContainerTop] = useState('0px');
  const [trackContainerHeight, setTrackContainerHeight] = useState('0px');
  const [blueProgressBarHeight, setBlueProgressBarHeight] = useState('0px');

  // Constants for precise calculations based on CSS
  const TIMELINE_SPACING_MD_PX = 16; // From --timeline-spacing-md, used as padding in .timeline-nav-item
  const DOT_HALF_HEIGHT_PX = 12;     // Half of the .timeline-nav-dot height (24px)
  const DOT_FULL_HEIGHT_PX = 24;     // Full height of the .timeline-nav-dot

  // Helper function to format cache timestamp
  const formatGeneratedTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleRegenerateClick = async () => {
    if (onRegenerateTimeline && currentProfile) {
      try {
        await onRegenerateTimeline(currentProfile, timelineScenarioType);
      } catch (error) {
        console.error('Error regenerating timeline:', error);
      }
    }
  };

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
        // Calculate the Y position for the center of the first dot, relative to the nav container's top.
        // offsetTop is distance from nav top to button's top border.
        // TIMELINE_SPACING_MD_PX is button's top padding (distance from button top border to dot's effective top, as dot is inside padding).
        // DOT_HALF_HEIGHT_PX is half of dot's height.
        newTrackTop = firstItemEl.offsetTop + TIMELINE_SPACING_MD_PX + DOT_HALF_HEIGHT_PX;
      } else {
        // Fallback if first item ref not ready - though this state should be brief
        setTrackContainerTop('0px'); 
        setTrackContainerHeight('0px');
        setBlueProgressBarHeight('0px');
        return; // Exit if we can't even find the first item
      }

      if (lastItemEl) {
        const lastDotCenterY = lastItemEl.offsetTop + TIMELINE_SPACING_MD_PX + DOT_HALF_HEIGHT_PX;
        newTrackHeight = lastDotCenterY - newTrackTop; // Height from first dot center to last dot center
      }
      
      // Ensure track has at least the height of one dot if only one section or calculation is too small
      if (newTrackHeight < DOT_FULL_HEIGHT_PX && sections.length >=1) {
        newTrackHeight = DOT_FULL_HEIGHT_PX; 
      }
      // If newTrackHeight is negative (e.g. only one item, lastDotCenterY is same as newTrackTop), ensure it's at least dot height
      newTrackHeight = Math.max(DOT_FULL_HEIGHT_PX, newTrackHeight);

      setTrackContainerTop(`${newTrackTop}px`);
      setTrackContainerHeight(`${newTrackHeight}px`);

      if (activeItemEl) {
        const activeDotCenterY = activeItemEl.offsetTop + TIMELINE_SPACING_MD_PX + DOT_HALF_HEIGHT_PX;
        // Blue bar height is from its own top (which is track's top) to activeDotCenterY
        newBlueBarHeight = activeDotCenterY - newTrackTop; 
      } else if (firstItemEl) { // Default to first item if no active section, blue bar covers first dot center
        newBlueBarHeight = DOT_HALF_HEIGHT_PX; // Effectively fills to its own center
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
            ref={(el) => itemRefs.current[section.id] = el} 
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

      <div className={styles.sidebarFooter}>
        {timelineGeneratedAt && (
          <div className={styles.cacheInfo}>
            <div className={styles.cacheStatus}>
              {timelineCached ? '💾' : '✨'} 
              <span>
                {timelineCached ? 'Cached' : 'Fresh'} • {formatGeneratedTime(timelineGeneratedAt)}
              </span>
            </div>
            
            {timelineScenarioType && (
              <div className={styles.scenarioInfo}>
                Scenario: {timelineScenarioType.charAt(0).toUpperCase() + timelineScenarioType.slice(1)}
              </div>
            )}

            <button
              className="btn btn-secondary"
              onClick={handleRegenerateClick}
              disabled={isGenerating}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-xs)'
              }}
            >
              {isGenerating ? (
                <>
                  <span className={styles.spinner}>⟳</span>
                  Regenerating...
                </>
              ) : (
                <>
                  🔄 Regenerate Timeline
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
} 