'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTimeline } from '../hooks/useTimeline';
import GlobalHeader from '../components/GlobalHeader';
import TimelineSidebar from './components/TimelineSidebar';
import TimelineContent from './components/TimelineContent';
import MetricsWidget from './components/MetricsWidget';
import './timeline.css';

function TimelinePlaceholder({ title, message, showButton, buttonText, onButtonClick }) {
  return (
    <div className="timeline-empty">
      <div className="loading-spinner"></div>
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      {showButton && (
        <div style={{ marginTop: '2rem' }}>
          <button className="btn-primary" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}

function WelcomeMessage() {
  const router = useRouter();
  return (
    <div className="timeline-empty">
      <h2>Welcome to Your AI Transformation Timeline</h2>
      <p>Create a client profile first to generate a personalized AI transformation roadmap.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button 
          className="btn-primary"
          onClick={() => router.push('/profiles')}
        >
          Create Client Profile
        </button>
      </div>
    </div>
  );
}

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
      <div className="timeline-container" data-timeline-theme={theme} style={{ height: 'calc(100vh - 80px)' }}>
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
        
        <div className="timeline-main" ref={contentRef}>
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