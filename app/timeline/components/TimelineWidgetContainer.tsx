'use client';

import React, { useState, ReactNode } from 'react';
import styles from './TimelineWidgetContainer.module.css';

interface TimelineWidgetContainerProps {
  title: string;
  children: ReactNode;
  className?: string;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  defaultExpanded?: boolean;
}

const TimelineWidgetContainer: React.FC<TimelineWidgetContainerProps> = ({
  title,
  children,
  className = '',
  expanded,
  onToggle,
  defaultExpanded = false
}) => {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  
  // Use controlled expanded state if provided, otherwise use internal state
  const isExpanded = expanded !== undefined ? expanded : internalExpanded;
  
  const handleToggle = () => {
    const newExpanded = !isExpanded;
    
    if (expanded === undefined) {
      // Uncontrolled mode - update internal state
      setInternalExpanded(newExpanded);
    }
    
    // Call onToggle callback if provided
    if (onToggle) {
      onToggle(newExpanded);
    }
  };

  const handleHeaderClick = () => {
    handleToggle();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  return (
    <div 
      className={`${styles.widgetContainer} ${className}`}
      data-expanded={isExpanded}
    >
      <div 
        className={styles.header}
        onClick={handleHeaderClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls="widget-content"
      >
        <h4 className={styles.title}>{title}</h4>
        <button 
          type="button"
          className={styles.expandButton}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          tabIndex={-1} // Header handles keyboard interaction
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>
      
      <div 
        id="widget-content"
        className={`${styles.content} ${isExpanded ? styles.expanded : styles.collapsed}`}
        aria-hidden={!isExpanded}
      >
        {isExpanded && children}
      </div>
    </div>
  );
};

export default TimelineWidgetContainer; 