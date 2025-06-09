'use client';

import React, { useState, FC } from 'react';
import styles from './MetricsWidget.module.css';
import { Timeline } from '../../services/types';

interface TrendIconProps {
  type: 'positive' | 'negative' | 'neutral';
}

const TrendIcon: FC<TrendIconProps> = ({ type }) => {
  switch (type) {
    case 'positive':
      return <span style={{ color: 'var(--timeline-accent-green)', marginRight: '4px' }}>▲</span>;
    case 'negative':
      return <span style={{ color: 'var(--timeline-accent-red)', marginRight: '4px' }}>▼</span>;
    default:
      return null;
  }
};

interface MetricsWidgetProps {
    activeSection: string;
    timelineData: Timeline;
    scrollProgress: number;
}

interface Metric {
    label: string;
    value: string;
    trend: {
        text: string;
        type: 'positive' | 'negative' | 'neutral';
    };
}

export default function MetricsWidget({ activeSection, timelineData, scrollProgress }: MetricsWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  
  if (!timelineData) return null;
  
  const getCurrentPhase = () => {
    switch(activeSection) {
      case 'current-state':
        return { title: 'Current State', ...(timelineData.currentState || {}) };
      case 'phase-1':
        return { title: 'Foundation', ...(timelineData.phases?.[0] || {}) };
      case 'phase-2':
        return { title: 'Implementation', ...(timelineData.phases?.[1] || {}) };
      case 'phase-3':
        return { title: 'Expansion', ...(timelineData.phases?.[2] || {}) };
      case 'phase-4':
        return { title: 'Optimization', ...(timelineData.phases?.[3] || {}) };
      case 'future-state':
        return { title: 'Future State', ...(timelineData.futureState || {}) };
      default:
        return { title: 'Current State', ...(timelineData.currentState || {}) };
    }
  };
  
  const currentPhase = getCurrentPhase();
  
  const getDynamicMetrics = (): Metric[] => {
    switch(activeSection) {
      case 'current-state':
        return [
          { label: 'AI Readiness', value: '25%', trend: { text: 'baseline', type: 'neutral' } },
          { label: 'Manual Processes', value: '85%', trend: { text: 'baseline', type: 'neutral' } },
          { label: 'Data Utilization', value: '15%', trend: { text: 'baseline', type: 'neutral' } }
        ];
      case 'phase-1':
        return [
          { label: 'AI Readiness', value: '45%', trend: { text: '+20%', type: 'positive' } },
          { label: 'Automation Level', value: '25%', trend: { text: 'new', type: 'neutral' } },
          { label: 'Team Trained', value: '30%', trend: { text: 'new', type: 'neutral' } }
        ];
      case 'phase-2':
        return [
          { label: 'AI Readiness', value: '65%', trend: { text: '+40%', type: 'positive' } },
          { label: 'Automation Level', value: '45%', trend: { text: '+20%', type: 'positive' } },
          { label: 'ROI Achieved', value: '75%', trend: { text: 'new', type: 'neutral' } }
        ];
      case 'phase-3':
        return [
          { label: 'AI Integration', value: '80%', trend: { text: '+55%', type: 'positive' } },
          { label: 'Efficiency Gain', value: '60%', trend: { text: 'new', type: 'positive' } },
          { label: 'Revenue Impact', value: '+25%', trend: { text: '+25%', type: 'positive' } }
        ];
      case 'phase-4':
        return [
          { label: 'AI Maturity', value: '90%', trend: { text: '+65%', type: 'positive' } },
          { label: 'Cost Reduction', value: '40%', trend: { text: 'new', type: 'positive' } },
          { label: 'Innovation Rate', value: '3x', trend: { text: 'new', type: 'positive' } }
        ];
      case 'future-state':
        return [
          { label: 'AI Leadership', value: '95%', trend: { text: 'achieved', type: 'positive' } },
          { label: 'Market Position', value: 'Top 10%', trend: { text: 'achieved', type: 'positive' } },
          { label: 'Total ROI', value: '425%', trend: { text: 'achieved', type: 'positive' } }
        ];
      default:
        return [];
    }
  };
  
  const getProgressRing = (value: number) => {
    const validValue = typeof value === 'number' && !isNaN(value) ? Math.max(0, Math.min(100, value)) : 0;
    const radius = 38;
    const strokeWidth = 7;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (validValue / 100) * circumference;
    
    return (
      <svg className={styles.progressRing} width="90" height="90">
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="none"
          stroke="var(--timeline-border-secondary)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          className={styles.progressRingCircle}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--timeline-accent-blue)" />
            <stop offset="100%" stopColor="var(--timeline-accent-green)" />
          </linearGradient>
        </defs>
        <text x="45" y="45" textAnchor="middle" dy="0.3em" className={styles.progressText}>
          {`${Math.round(validValue)}%`}
        </text>
      </svg>
    );
  };
  
  const metrics = getDynamicMetrics();
  
  return (
    <div className={`${styles.metricsWidget} ${isMinimized ? styles.minimized : ''}`}>
      <div className={styles.widgetHeader}>
        <div className={styles.widgetHeaderContent}>
          <h3>AI Journey Progress</h3>
          <button 
            className={styles.widgetToggle}
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? 'Expand widget' : 'Minimize widget'}
          >
            {isMinimized ? '◀' : '▶'}
          </button>
        </div>
        {!isMinimized && (
          <div className={styles.journeyProgress}>
            {getProgressRing(scrollProgress || 0)}
            <p className={styles.progressLabel}>Journey Completion</p>
          </div>
        )}
      </div>
      
      {!isMinimized && (
        <>
          <div className={styles.widgetMetrics}>
            <h4>{currentPhase.title} Metrics</h4>
            {metrics.map((metric, index) => (
              <div key={index} className={styles.metricItem}>
                <div className={styles.metricHeader}>
                  <span className={styles.metricLabel}>{metric.label}</span>
                  {metric.trend && (
                    <span className={`${styles.metricTrend} ${styles[metric.trend.type] || styles.neutral}`}>
                      <TrendIcon type={metric.trend.type} />
                      {metric.trend.text}
                    </span>
                  )}
                </div>
                <div className={styles.metricValue}>{metric.value}</div>
              </div>
            ))}
          </div>
          
          <div className={styles.widgetFooter}>
            <div className={styles.widgetInsight}>
              <h4>Key Insight</h4>
              <p>{currentPhase.outcomes?.[0]?.description || currentPhase.description || 'Your AI transformation journey is progressing well.'}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 