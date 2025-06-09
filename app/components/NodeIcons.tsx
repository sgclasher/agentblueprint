'use client';

import React, { MouseEvent } from 'react';

export const ExternalLinkIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="14" 
    height="14" 
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="external-link-icon"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

interface NodeHeaderButtonsProps {
  id: string;
  isCollapsed: boolean;
  hasChildren: boolean;
  onToggle?: (id: string) => void;
  canNavigate: boolean;
  onExternalLinkClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const NodeHeaderButtons: React.FC<NodeHeaderButtonsProps> = ({ 
  id, 
  isCollapsed, 
  hasChildren, 
  onToggle, 
  canNavigate, 
  onExternalLinkClick 
}) => {
  return (
    <div className="node-header-buttons">
      {canNavigate && (
        <button 
          className="node-external-link"
          onClick={onExternalLinkClick}
          onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
          title="Open in ServiceNow"
        >
          <ExternalLinkIcon />
        </button>
      )}
      
      {hasChildren && (
        <button 
          className="expand-button"
          onClick={() => onToggle && onToggle(id)}
          onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
          title={isCollapsed ? "Show child nodes" : "Hide child nodes"}
        >
          {isCollapsed ? '+' : '−'}
        </button>
      )}
    </div>
  );
}; 