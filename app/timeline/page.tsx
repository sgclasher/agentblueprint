'use client';

import React from 'react';
import { useTimeline } from '../hooks/useTimeline';
import useBusinessProfileStore from '../store/useBusinessProfileStore';
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
    timelineCached,
    timelineGeneratedAt,
    timelineScenarioType,
    // Profile selection functionality
    availableProfiles,
    isLoadingProfiles,
    selectedProfileId,
    handleProfileSelect
  } = useTimeline();

  // Get provider state from store
  const { selectedProvider, setSelectedProvider } = useBusinessProfileStore();

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
        selectedProvider={selectedProvider}
        onProviderChange={setSelectedProvider}
        isGenerating={isLoading}
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
          timelineData={timelineData}
          businessProfile={businessProfile}
          availableProfiles={availableProfiles}
          isLoadingProfiles={isLoadingProfiles}
          selectedProfileId={selectedProfileId}
          onProfileSelect={handleProfileSelect}
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