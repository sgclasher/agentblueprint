'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  MapPin,
  Building,
  Rocket,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react';

const iconMap = {
  MapPin: <MapPin size={24} />,
  Building: <Building size={24} />,
  Rocket: <Rocket size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Zap: <Zap size={24} />,
  Target: <Target size={24} />,
};

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
    <aside className="timeline-sidebar">
      <div className="timeline-sidebar-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Your AI Journey</h3>
          <button 
            className="btn-secondary"
            onClick={onThemeToggle}
            style={{ 
              padding: 'var(--timeline-spacing-sm)', 
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--timeline-spacing-xs)'
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      
      <nav className="timeline-nav" ref={navRef}>
        {/* Grey Track for the progress bar - Dynamically positioned and sized */}
        {sections.length > 0 && (
          <div 
            className="timeline-progress-bar-container" 
            style={{ 
              position: 'absolute', 
              top: trackContainerTop, 
              left: `calc(${TIMELINE_SPACING_MD_PX}px + ${DOT_HALF_HEIGHT_PX}px - 2px)`, // Centers 4px bar with 24px dot
              width: '4px',
              height: trackContainerHeight,
              backgroundColor: 'var(--timeline-border-secondary)', 
              borderRadius: '2px',
              zIndex: 1,
              transition: 'top 0.3s ease-out, height 0.3s ease-out'
            }}
          >
            {/* Blue Progress Bar - Height relative to the container's top */}
            <div 
              className="timeline-progress-bar" 
              style={{
                height: blueProgressBarHeight,
                backgroundColor: 'var(--timeline-accent-blue)', 
                width: '100%',
                borderRadius: '2px',
                transition: 'height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            />
          </div>
        )}

        {sections.map((section) => (
          <button
            key={section.id}
            ref={(el) => itemRefs.current[section.id] = el} 
            className={`timeline-nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionClick(section.id)}
            style={{ zIndex: 2, position: 'relative' }} 
          >
            <div className="timeline-nav-dot">{iconMap[section.iconId]}</div> 
            <div className="timeline-nav-content">
              <div className="timeline-nav-year">{section.year}</div>
              <div className="timeline-nav-title">{section.title}</div>
              <div className="timeline-nav-subtitle">{section.subtitle}</div>
            </div>
          </button>
        ))}
      </nav>

      {/* Cache Status and Regeneration Controls */}
      {timelineGeneratedAt && (
        <div style={{
          padding: 'var(--timeline-spacing-md)',
          marginTop: 'var(--timeline-spacing-lg)',
          background: 'var(--timeline-glass-bg)',
          backdropFilter: 'blur(var(--timeline-backdrop-blur))',
          borderRadius: 'var(--timeline-border-radius-lg)',
          border: '1px solid var(--timeline-border-secondary)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--timeline-spacing-xs)',
            marginBottom: 'var(--timeline-spacing-sm)',
            fontSize: '0.85rem',
            color: 'var(--timeline-text-muted)'
          }}>
            {timelineCached ? '💾' : '✨'} 
            <span>
              {timelineCached ? 'Cached' : 'Fresh'} • {formatGeneratedTime(timelineGeneratedAt)}
            </span>
          </div>
          
          {timelineScenarioType && (
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--timeline-text-muted)',
              marginBottom: 'var(--timeline-spacing-sm)'
            }}>
              Scenario: {timelineScenarioType.charAt(0).toUpperCase() + timelineScenarioType.slice(1)}
            </div>
          )}

          <button
            className="btn-secondary"
            onClick={handleRegenerateClick}
            disabled={isGenerating}
            style={{
              width: '100%',
              fontSize: '0.85rem',
              padding: 'var(--timeline-spacing-sm) var(--timeline-spacing-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--timeline-spacing-xs)'
            }}
          >
            {isGenerating ? (
              <>
                <span style={{ animation: 'spin 1s linear infinite' }}>⟳</span>
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
      
      <div className="timeline-sidebar-footer">
        <button 
          className="btn-secondary"
          onClick={() => window.location.href = '/'}
        >
          ← Back to Flow Visualizer
        </button>
      </div>
    </aside>
  );
} 