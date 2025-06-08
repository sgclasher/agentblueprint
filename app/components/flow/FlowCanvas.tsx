'use client';

import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Panel,
  addEdge,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  Connection,
  EdgeTypes,
  NodeTypes,
  BackgroundVariant,
} from 'reactflow';

import UseCaseNode from '../nodes/UseCaseNode';
import TriggerNode from '../nodes/TriggerNode';
import AgentNode from '../nodes/AgentNode';
import ToolNode from '../nodes/ToolNode';
import SelectedNodePanel from './SelectedNodePanel';

// Define node types outside of the component to avoid recreation on each render
const nodeTypes: NodeTypes = {
  useCaseNode: UseCaseNode,
  triggerNode: TriggerNode,
  agentNode: AgentNode,
  toolNode: ToolNode,
};

interface FlowCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  setEdges: (edges: Edge[]) => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  selectedNode: Node | null;
  layoutDirection: string;
  toggleNodeExpansion: (nodeId: string) => void;
  onEdgesChange: OnEdgesChange;
}

export default function FlowCanvas({ 
  nodes, 
  edges, 
  onNodesChange, 
  setEdges, 
  onNodeClick,
  selectedNode,
  layoutDirection,
  toggleNodeExpansion,
  onEdgesChange
}: FlowCanvasProps) {
  
  // Add the required props to each node object
  const nodesWithProps = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        layoutDirection,
        onToggle: toggleNodeExpansion
      }
    }));
  }, [nodes, layoutDirection, toggleNodeExpansion]);

  // Handle edge connections
  const onConnect = useCallback(
    (params: Connection) => setEdges(addEdge(params, edges)),
    [edges, setEdges]
  );

  return (
    <ReactFlow
      nodes={nodesWithProps}
      edges={edges.filter(edge => !edge.hidden)}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{
        padding: 0.6,
        includeHiddenNodes: false,
        duration: 800,
        minZoom: 0.3,
        maxZoom: 1.5
      }}
      minZoom={0.1}
      maxZoom={2}
      defaultViewport={{ zoom: 0.75, x: 0, y: 0 }}
      style={{ background: '#f8f8f8' }}
    >
      <Controls />
      <MiniMap />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      
      {selectedNode && (
        <Panel position="bottom-right">
          <SelectedNodePanel node={selectedNode} />
        </Panel>
      )}
    </ReactFlow>
  );
} 