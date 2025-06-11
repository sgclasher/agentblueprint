'use client';

import { memo, useCallback, MouseEvent } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import useAgenticStore from '../../store/useAgenticStore';
import { NodeHeaderButtons } from '../NodeIcons';
import { NodeData } from '../flow/types';
import { generateServiceNowUrl } from '../../utils/nodeUtils';

const UseCaseNode: React.FC<NodeProps<NodeData>> = ({ data, id }) => {
  const { 
    layoutDirection, onToggle, isCollapsed, label, childrenCount, 
    description, details
  } = data || {};
  
  const serviceNowUrl = useAgenticStore(state => state.serviceNowUrl);
  
  const targetPosition = layoutDirection === 'TB' ? Position.Top : Position.Left;
  const sourcePosition = layoutDirection === 'TB' ? Position.Bottom : Position.Right;

  const handleToggle = useCallback(() => {
    if (typeof onToggle === 'function') {
      onToggle(id);
    }
  }, [id, onToggle]);

  const handleExternalLinkClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    const url = generateServiceNowUrl(serviceNowUrl, 'useCase', details?.sys_id);
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [serviceNowUrl, details?.sys_id]);

  const hasChildren = childrenCount > 0;
  
  const canNavigate = Boolean(serviceNowUrl && details?.sys_id);

  return (
    <div className="node use-case-node"
         onClick={(e: MouseEvent) => e.stopPropagation()}>
      <Handle type="target" position={targetPosition} />
      <Handle type="source" position={sourcePosition} />
      
      <div className="node-header use-case-header">
        <div className="header-content">
          <div className="node-type">AGENTIC WORKFLOW</div>
          <div className="node-title">{label}</div>
        </div>
        
        <NodeHeaderButtons 
          id={id}
          isCollapsed={isCollapsed}
          hasChildren={hasChildren}
          onToggle={handleToggle}
          canNavigate={canNavigate}
          onExternalLinkClick={handleExternalLinkClick}
        />
      </div>
      <div className="node-content">
        {description && (
          <div className="node-description">{description}</div>
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

export default memo(UseCaseNode); 