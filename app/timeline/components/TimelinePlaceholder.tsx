'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './TimelinePlaceholder.module.css';

interface WelcomeMessageProps {
  onGenerate: () => void;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ onGenerate }) => {
  return (
    <div className={styles.timelineEmpty}>
      <h2>Generate Your AI Transformation Timeline</h2>
      <p>Your business profile is ready. Click the button below to generate your personalized AI transformation roadmap.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button 
          className="btn btn-primary"
          onClick={onGenerate}
        >
          Generate AI Timeline
        </button>
      </div>
    </div>
  );
}

interface TimelinePlaceholderProps {
    title: string;
    message?: string;
    showButton?: boolean;
    buttonText?: string;
    onButtonClick?: () => void;
    isGenerating?: boolean;
    isLoadingCached?: boolean;
}

export const TimelinePlaceholder: React.FC<TimelinePlaceholderProps> = ({ 
  title, 
  message, 
  showButton, 
  buttonText, 
  onButtonClick,
  isGenerating = false,
  isLoadingCached = false
}) => {
  const getLoadingContent = () => {
    if (isGenerating) {
      return (
        <>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingDots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </>
      );
    } else if (isLoadingCached) {
      return <div className={styles.loadingSpinnerFast}></div>;
    } else {
      return <div className={styles.loadingSpinner}></div>;
    }
  };

  const getEstimatedTime = () => {
    if (isGenerating) {
      return "This usually takes 2-3 minutes...";
    } else if (isLoadingCached) {
      return "Loading your saved timeline...";
    }
    return null;
  };

  return (
    <div className={styles.timelineEmpty}>
      {(isGenerating || isLoadingCached) && getLoadingContent()}
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      {getEstimatedTime() && (
        <p className={styles.estimatedTime}>{getEstimatedTime()}</p>
      )}
      {showButton && (
        <div style={{ marginTop: '2rem' }}>
          <button className="btn btn-primary" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}

// New component for when timeline exists but user might want to regenerate
interface TimelineActionsProps {
  timelineGeneratedAt: string | null;
  timelineScenarioType: string | null;
  onRegenerate: () => void;
  isGenerating: boolean;
}

export const TimelineActions: React.FC<TimelineActionsProps> = ({
  timelineGeneratedAt,
  timelineScenarioType,
  onRegenerate,
  isGenerating
}) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.timelineActions}>
      <div className={styles.timelineInfo}>
        <p>Generated: {formatDate(timelineGeneratedAt)}</p>
        <p>Scenario: {timelineScenarioType || 'Balanced'}</p>
      </div>
      <button 
        className="btn btn-secondary btn-sm"
        onClick={onRegenerate}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Regenerate Timeline'}
      </button>
    </div>
  );
}; 