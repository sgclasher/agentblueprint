'use client';

import React, { MutableRefObject } from 'react';
import styles from './TimelineContent.module.css';
import { Timeline, Profile } from '../../services/types';
import ProviderSelector from './ProviderSelector';
import { ScenarioType } from '../../store/useBusinessProfileStore';

interface TimelineSection {
    id: string;
    year: string;
    title: string;
    subtitle: string;
    icon?: React.ReactNode;
}

interface TimelineContentProps {
    sections: TimelineSection[];
    timelineData: Timeline;
    sectionRefs: MutableRefObject<{ [key: string]: HTMLElement | null }>;
    businessProfile: Partial<Profile>;
    selectedProvider?: string | null;
    onProviderChange?: (provider: string) => void;
    isGenerating?: boolean;
    // Timeline controls props (moved from sidebar)
    timelineCached?: boolean;
    timelineGeneratedAt?: string | null;
    timelineScenarioType?: ScenarioType | null;
    onRegenerateTimeline?: (profile: Profile, scenarioType: ScenarioType | null, provider: string | null) => Promise<any>;
    currentProfile?: Profile | null;
    onExportPDF?: () => void;
    isExporting?: boolean;
}

export default function TimelineContent({ 
  sections, 
  timelineData, 
  sectionRefs, 
  businessProfile, 
  selectedProvider, 
  onProviderChange, 
  isGenerating = false,
  // Timeline controls props
  timelineCached = false,
  timelineGeneratedAt = null,
  timelineScenarioType = null,
  onRegenerateTimeline,
  currentProfile = null,
  onExportPDF,
  isExporting = false
}: TimelineContentProps) {
  const registerRef = (id: string, element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current[id] = element;
    }
  };
  
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
        await onRegenerateTimeline(currentProfile, timelineScenarioType, selectedProvider);
      } catch (error) {
        console.error('Error regenerating timeline:', error);
      }
    }
  };

  const getSectionContent = (sectionId: string) => {
    const contentMap: { [key: string]: { content: any, highlights: any[] } } = {
      'current-state': {
        content: timelineData.currentState,
        highlights: [
          { label: 'AI Maturity', value: businessProfile.aiMaturityLevel?.charAt(0).toUpperCase() + businessProfile.aiMaturityLevel?.slice(1) || 'N/A' },
          { label: 'Industry', value: businessProfile.industry || 'N/A' },
          { label: 'Company Size', value: businessProfile.companySize?.charAt(0).toUpperCase() + businessProfile.companySize?.slice(1) || 'N/A' }
        ]
      },
      'phase-1': {
        content: timelineData.phases[0],
        highlights: timelineData.phases[0]?.highlights || []
      },
      'phase-2': {
        content: timelineData.phases[1],
        highlights: timelineData.phases[1]?.highlights || []
      },
      'phase-3': {
        content: timelineData.phases[2],
        highlights: timelineData.phases[2]?.highlights || []
      },
      'phase-4': {
        content: timelineData.phases[3],
        highlights: timelineData.phases[3]?.highlights || []
      },
      'future-state': {
        content: timelineData.futureState,
        highlights: timelineData.futureState?.highlights || []
      }
    };
    return contentMap[sectionId] || { content: {}, highlights: [] };
  };
  
  return (
    <div className={styles.timelineContent}>
      {/* Provider & Controls Header Section */}
      {(onProviderChange || timelineGeneratedAt) && (
        <div className={styles.providerHeader}>
          <div className={styles.providerHeaderContent}>
            {onProviderChange && (
              <div className={styles.providerSection}>
                <div className={styles.providerControls}>
                  <ProviderSelector
                    selectedProvider={selectedProvider}
                    onProviderChange={onProviderChange}
                    disabled={isGenerating}
                  />
                </div>
              </div>
            )}
            
            {timelineGeneratedAt && (
              <div className={styles.timelineControlsSection}>
                <div className={styles.cacheInfo}>
                  <div className={styles.cacheStatus}>
                    {timelineCached ? '💾' : '✨'} 
                    <span>
                      {timelineCached ? 'Cached' : 'Fresh'} • {formatGeneratedTime(timelineGeneratedAt)}
                    </span>
                    {timelineScenarioType && (
                      <span className={styles.scenarioInfo}>
                        • Scenario: {timelineScenarioType.charAt(0).toUpperCase() + timelineScenarioType.slice(1)}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.timelineActions}>
                  <button
                    className="btn btn-secondary"
                    onClick={handleRegenerateClick}
                    disabled={isGenerating}
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
                    onClick={onExportPDF}
                    disabled={isExporting || !timelineData}
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
        </div>
      )}

      {/* Timeline Sections */}
      {sections.map((section) => {
        const { content, highlights } = getSectionContent(section.id);
        
        return (
          <section 
            key={section.id}
            id={section.id}
            ref={(el) => registerRef(section.id, el)}
            className={styles.timelineSection}
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionIcon}>{section.icon}</div>
              <div className={styles.sectionMeta}>
                <div className={styles.sectionYear}>{section.year}</div>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
              </div>
            </div>
            
            <div className={styles.sectionBody}>
              {content && (
                <>
                  {content.description && (
                    <div className={styles.sectionDescription}>
                      <p>{content.description}</p>
                    </div>
                  )}
                  
                  {highlights && highlights.length > 0 && (
                    <div className={styles.sectionHighlights}>
                      <h3>Key Highlights</h3>
                      <div className={styles.highlightsGrid}>
                        {highlights.map((highlight: any, index: number) => (
                          <div key={index} className={styles.highlightCard}>
                            <div className={styles.highlightLabel}>{highlight.label}</div>
                            <div className={styles.highlightValue}>{highlight.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {content.initiatives && content.initiatives.length > 0 && (
                    <div className={styles.sectionInitiatives}>
                      <h3>Key Initiatives</h3>
                      <ul className={styles.initiativesList}>
                        {content.initiatives.map((initiative: any, index: number) => (
                          <li key={index} className={styles.initiativeItem}>
                            <div className={styles.initiativeTitle}>{initiative.title}</div>
                            <div className={styles.initiativeDescription}>{initiative.description}</div>
                            {initiative.impact && (
                              <div className={styles.initiativeImpact}>
                                <span className={styles.impactLabel}>Impact:</span> {initiative.impact}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {content.technologies && content.technologies.length > 0 && (
                    <div className={styles.sectionTechnologies}>
                      <h3>Technologies & Tools</h3>
                      <div className={styles.techTags}>
                        {content.technologies.map((tech: string, index: number) => (
                          <span key={index} className={styles.techTag}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {content.outcomes && content.outcomes.length > 0 && (
                    <div className={styles.sectionOutcomes}>
                      <h3>Expected Outcomes</h3>
                      <div className={styles.outcomesGrid}>
                        {content.outcomes.map((outcome: any, index: number) => (
                          <div key={index} className={styles.outcomeCard}>
                            <div className={styles.outcomeMetric}>{outcome.metric}</div>
                            <div className={styles.outcomeValue}>{outcome.value}</div>
                            {outcome.description && (
                               <div className={styles.outcomeDescription}>{outcome.description}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        );
      })}
      
      <div className={styles.timelineEndCard} ref={(el) => registerRef('end-card', el)}>
        <div className={styles.sectionIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className={styles.endCardTitle}>End of Journey</h3>
        <p className={styles.endCardText}>You&apos;ve reached the end of the AI transformation roadmap.</p>
      </div>
    </div>
  );
} 