'use client';

import React from 'react';
import Link from 'next/link';
import { useTimeline } from '../hooks/useTimeline';
import GlobalHeader from '../components/GlobalHeader';
import TimelineSidebar from './components/TimelineSidebar';
import TimelineContent from './components/TimelineContent';
import MetricsWidget from './components/MetricsWidget';
import styles from './Timeline.module.css';
import './timeline.css';
import { TimelinePlaceholder, WelcomeMessage } from './components/TimelinePlaceholder';

// New component for when a user has no profile
const NoProfileMessage: React.FC = () => (
    <div className={styles.noProfileContainer}>
        <h2>Create a Business Profile to Begin</h2>
        <p>
            To generate a personalized AI Transformation Timeline, you first need to create your business profile.
            This profile captures key information about your company that our AI uses to build your roadmap.
        </p>
        <Link href="/profile" className="btn btn-primary">
            Go to Your Profile
        </Link>
        <p className={styles.subtleText}>
            Your profile is where you'll manage all your business information.
        </p>
    </div>
);

export default function TimelinePage() {
  const {
    timelineData,
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
    timelineCached,
    timelineGeneratedAt,
    timelineScenarioType,
    hasProfile,
  } = useTimeline();

  const renderContent = () => {
    if (isLoading) {
      const message = hasProfile 
        ? "Generating personalized roadmap from your profile..."
        : "Checking for your profile...";
      return <TimelinePlaceholder title="Loading Your AI Timeline" message={message} />;
    }
    
    if (!hasProfile) {
        return <NoProfileMessage />;
    }

    if (!timelineData) {
      return <WelcomeMessage onGenerate={() => regenerateTimeline()} />;
    }
    
    if (!currentProfile) {
        return <TimelinePlaceholder title="Error" message="Could not load profile." />;
    }

    return (
      <TimelineContent 
        sections={timelineSections}
        timelineData={timelineData}
        sectionRefs={sectionRefs}
        businessProfile={currentProfile} // Pass the profile to the content
      />
    );
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <GlobalHeader />
      
      <div className={styles.timelineContainer} data-timeline-theme={theme}>
        <TimelineSidebar 
          sections={timelineSections}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          theme={theme}
          onThemeToggle={toggleTheme}
          timelineCached={timelineCached}
          timelineGeneratedAt={timelineGeneratedAt}
          timelineScenarioType={timelineScenarioType}
          onRegenerateTimeline={regenerateTimeline}
          isGenerating={isLoading}
          currentProfile={currentProfile}
          hasProfile={hasProfile}
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