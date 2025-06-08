'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTimeline } from '../hooks/useTimeline';
import GlobalHeader from '../components/GlobalHeader';
import TimelineSidebar from './components/TimelineSidebar';
import TimelineContent from './components/TimelineContent';
import MetricsWidget from './components/MetricsWidget';
import styles from './Timeline.module.css';
import './timeline.css';
import { TimelinePlaceholder, WelcomeMessage } from './components/TimelinePlaceholder';

export default function TimelinePage() {
  const {
    timelineData,
    businessProfile,
    currentProfile,
    isLoading,
    activeSection,
    scrollProgress,
    timelineSections,
    theme,
    contentRef,
    sectionRefs,
    handleSectionClick,
    toggleTheme,
    regenerateTimeline,
    isProfileTimeline,
    // Cache metadata
    timelineCached,
    timelineGeneratedAt,
    timelineScenarioType
  } = useTimeline();

  const router = useRouter();

  const renderContent = () => {
    if (isLoading) {
      const message = isProfileTimeline 
        ? "Generating personalized roadmap from your profile..."
        : "Creating your personalized transformation roadmap...";
      return <TimelinePlaceholder title="Loading Your AI Timeline" message={message} />;
    }

    if (!timelineData) {
      return <WelcomeMessage />;
    }
    
    return (
      <TimelineContent 
        sections={timelineSections}
        timelineData={timelineData}
        sectionRefs={sectionRefs}
        businessProfile={businessProfile}
      />
    );
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <GlobalHeader />
      <div className={styles.timelineContainer} data-timeline-theme={theme}>
        <TimelineSidebar 
          sections={timelineSections}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          theme={theme}
          onThemeToggle={toggleTheme}
          // Cache functionality props
          timelineCached={timelineCached}
          timelineGeneratedAt={timelineGeneratedAt}
          timelineScenarioType={timelineScenarioType}
          onRegenerateTimeline={regenerateTimeline}
          isGenerating={isLoading}
          currentProfile={currentProfile}
        />
        
        <div className={styles.timelineMain} ref={contentRef}>
          {renderContent()}
        </div>
        
        {timelineData && !isLoading && (
          <MetricsWidget 
            activeSection={activeSection}
            timelineData={timelineData}
            scrollProgress={scrollProgress}
          />
        )}
      </div>
    </div>
  );
} 