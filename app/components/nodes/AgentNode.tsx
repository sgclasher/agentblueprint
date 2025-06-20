'use client';

import { memo, useCallback, MouseEvent } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import useAgenticStore from '../../store/useAgenticStore';
import { generateServiceNowUrl } from '../../utils/nodeUtils';
import { ExternalLinkIcon } from '../NodeIcons';
import { NodeData } from '../flow/types';

const AgentNode: React.FC<NodeProps<NodeData>> = ({ data, id }) => {
  const { 
    layoutDirection, onToggle, isCollapsed, label, childrenCount, 
    description, role, details
  } = data || {};
  
  const serviceNowUrl = useAgenticStore(state => state.serviceNowUrl);
  
  const targetPosition = layoutDirection === 'TB' ? Position.Top : Position.Left;
  const sourcePosition = layoutDirection === 'TB' ? Position.Bottom : Position.Right;

  const handleToggle = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (typeof onToggle === 'function') {
      onToggle(id);
    }
  }, [id, onToggle]);

  const handleExternalLinkClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    const url = generateServiceNowUrl(serviceNowUrl, 'agent', details?.sys_id);
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [serviceNowUrl, details?.sys_id]);
  
  const hasChildren = childrenCount > 0;
  
  const canNavigate = Boolean(serviceNowUrl && details?.sys_id);

  return (
    <div className="node agent-node"
         onClick={(e: MouseEvent) => e.stopPropagation()}>
      <Handle type="target" position={targetPosition} />
      <Handle type="source" position={sourcePosition} />
      
      <div className="node-header">
        <div className="header-content">
          <div className="node-type">AGENT</div>
          <div className="node-title">{label}</div>
        </div>
        
        <div className="node-header-buttons">
          {canNavigate && (
            <button 
              className="node-external-link"
              onClick={handleExternalLinkClick}
              onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
              title="Open in ServiceNow"
            >
              <ExternalLinkIcon />
            </button>
          )}
          
          {hasChildren && (
            <button 
              className="expand-button"
              onClick={handleToggle}
              onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
              title={isCollapsed ? "Show child nodes" : "Hide child nodes"}
            >
              {isCollapsed ? '+' : '−'}
            </button>
          )}
        </div>
      </div>
      <div className="node-content">
        {description && (
          <div className="node-description">{description}</div>
        )}
        {role && (
          <div className="node-field">
            <span className="field-label">Role:</span> {role}
          </div>
        )}
        {hasChildren && (
          <div className="node-children-info">
            {childrenCount} child node{childrenCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(AgentNode);
