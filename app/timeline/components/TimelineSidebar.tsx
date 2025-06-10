'use client';

import React, { useLayoutEffect, useRef, useState, FC } from 'react';
import styles from './TimelineSidebar.module.css';
import ProviderSelector from './ProviderSelector';
import useBusinessProfileStore, { ScenarioType } from '../../store/useBusinessProfileStore';
import { Profile, Timeline } from '../../services/types';
import { supabase } from '../../lib/supabase';

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
    timelineCached: boolean;
    timelineGeneratedAt: string | null;
    timelineScenarioType: ScenarioType | null;
    onRegenerateTimeline: (profile: Profile, scenarioType: ScenarioType | null, provider: string | null) => Promise<any>;
    isGenerating: boolean;
    currentProfile: Profile | null;
    timelineData?: Timeline | null;
    businessProfile?: Partial<Profile>;
}

const TimelineSidebar: FC<TimelineSidebarProps> = ({ 
  sections, 
  activeSection, 
  onSectionClick, 
  timelineCached,
  timelineGeneratedAt,
  timelineScenarioType,
  onRegenerateTimeline,
  isGenerating = false,
  currentProfile = null,
  timelineData,
  businessProfile
}) => {
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const { selectedProvider, setSelectedProvider } = useBusinessProfileStore();
  const [isExporting, setIsExporting] = useState(false);
  
  const [trackContainerTop, setTrackContainerTop] = useState('0px');
  const [trackContainerHeight, setTrackContainerHeight] = useState('0px');
  const [blueProgressBarHeight, setBlueProgressBarHeight] = useState('0px');

  const TIMELINE_SPACING_MD_PX = 16;
  const DOT_HALF_HEIGHT_PX = 12;
  const DOT_FULL_HEIGHT_PX = 24;

  const formatGeneratedTime = (timestamp: string | null): string => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleRegenerateClick = async () => {
    if (onRegenerateTimeline && currentProfile) {
      try {
        console.log('[Timeline] Selected provider:', selectedProvider);
        const result = await onRegenerateTimeline(currentProfile, timelineScenarioType, selectedProvider);
        if (result && typeof result === 'object' && 'provider' in result) {
          console.log('[Timeline] Provider actually run:', result.provider);
        }
      } catch (error) {
        console.error('Error regenerating timeline:', error);
      }
    }
  };

  const handleExportPDF = async () => {
    if (!timelineData || !businessProfile) {
      alert('No timeline data available to export');
      return;
    }

    setIsExporting(true);
    
    try {
      // Get the current session for authentication
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error('Authentication required. Please sign in to export PDF.');
      }

      const response = await fetch('/api/timeline/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          timelineData,
          businessProfile,
          options: {
            format: 'A4',
            orientation: 'portrait',
            includeMetrics: true
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Export failed');
      }

      // Get the PDF blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from response header or generate one
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'AI_Timeline.pdf';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF: ' + (error as Error).message);
    } finally {
      setIsExporting(false);
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

            <ProviderSelector
              selectedProvider={selectedProvider}
              onProviderChange={setSelectedProvider}
              disabled={isGenerating}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--timeline-spacing-sm)' }}>
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
              
              <button
                className="btn btn-primary"
                onClick={handleExportPDF}
                disabled={isExporting || !timelineData}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--spacing-xs)',
                  fontSize: '0.9rem'
                }}
              >
                {isExporting ? (
                  <>
                    <span className={styles.spinner}>⟳</span>
                    Exporting...
                  </>
                ) : (
                  <>
                    📄 Export PDF
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default TimelineSidebar; 