'use client';

import React, { useState } from 'react';
import { useTimeline } from '../hooks/useTimeline';
import useBusinessProfileStore from '../store/useBusinessProfileStore';
import GlobalHeader from '../components/GlobalHeader';
import TimelineSidebar from './components/TimelineSidebar';
import TimelineContent from './components/TimelineContent';
import MetricsWidget from './components/MetricsWidget';
import styles from './Timeline.module.css';
import './timeline.css';
import { TimelinePlaceholder, WelcomeMessage } from './components/TimelinePlaceholder';
import { supabase } from '../lib/supabase';

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
  
  // Export PDF state
  const [isExporting, setIsExporting] = useState(false);

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
        // Timeline controls props (moved from sidebar)
        timelineCached={timelineCached}
        timelineGeneratedAt={timelineGeneratedAt}
        timelineScenarioType={timelineScenarioType}
        onRegenerateTimeline={regenerateTimeline}
        currentProfile={currentProfile}
        onExportPDF={handleExportPDF}
        isExporting={isExporting}
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
          // Profile selection props
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