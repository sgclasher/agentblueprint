'use client';

import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useNodesState, useEdgesState, Node, Edge, OnEdgesChange } from 'reactflow';
import 'reactflow/dist/style.css';

import useAgenticStore from '../store/useAgenticStore';
import { useFlowLayout } from '../hooks/useFlowLayout';
import { useFlowData } from '../hooks/useFlowData';
import FlowCanvas from './flow/FlowCanvas';
import { CustomNode, NodeData } from './flow/types';

interface FlowVisualizerProps {
  onError: (error: Error) => void;
}

export interface FlowVisualizerHandles {
  expandAllNodes: () => void;
  collapseAllNodes: () => void;
}

const FlowVisualizer = forwardRef<FlowVisualizerHandles, FlowVisualizerProps>(({ onError }, ref) => {
  const { agenticData } = useAgenticStore();
  
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  
  const {
    layoutDirection,
    toggleNodeExpansion,
    expandAllNodes,
    collapseAllNodes,
  } = useFlowLayout(nodes, setNodes, edges, setEdges);
  
  useFlowData(agenticData, layoutDirection, setNodes, setEdges, onError);
  
  useImperativeHandle(ref, () => ({
    expandAllNodes,
    collapseAllNodes
  }));

  const onNodeClickHandler = useCallback((event: React.MouseEvent, node: Node<NodeData>) => {
    setSelectedNode(node as CustomNode);
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0 
    }}>
      {!agenticData ? (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', color: '#666', fontSize: '1.1rem' }}>
            <p>No data available. Please connect to ServiceNow to visualize agentic AI flows.</p>
          </div>
        </div>
      ) : (
        <FlowCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange as OnEdgesChange}
          setEdges={setEdges}
          onNodeClick={onNodeClickHandler}
          selectedNode={selectedNode}
          layoutDirection={layoutDirection}
          toggleNodeExpansion={toggleNodeExpansion}
        />
      )}
    </div>
  );
});

FlowVisualizer.displayName = 'FlowVisualizer';

export default FlowVisualizer; 