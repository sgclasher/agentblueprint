'use client';

import { useEffect } from 'react';
import { useReactFlow, Node, Edge } from 'reactflow';
import { transformAgenticData } from '../utils/transformAgenticData';
import { applyDagreLayout } from '../utils/layoutGraph';
import { AgenticData } from '../store/useAgenticStore';
import { NodeData } from '../components/flow/types';

type CustomNode = Node<NodeData>;

export function useFlowData(
  agenticData: AgenticData | null,
  layoutDirection: 'LR' | 'TB',
  setNodes: (nodes: CustomNode[] | ((nodes: CustomNode[]) => CustomNode[])) => void,
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void,
  onError: (error: Error) => void
) {
  const reactFlowInstance = useReactFlow<NodeData, Edge>();

  useEffect(() => {
    if (agenticData) {
      try {
        const { nodes: rawNodes, edges: rawEdges } = transformAgenticData(agenticData) as { nodes: CustomNode[], edges: Edge[] };
        
        if (!rawNodes.length && !rawEdges.length) {
          throw new Error('Unable to transform the data into a valid flow diagram');
        }
        
        console.log(`Successfully transformed data: ${rawNodes.length} nodes, ${rawEdges.length} edges`);
        
        const childrenMap: { [key: string]: string[] } = {};
        rawNodes.forEach(node => {
          if (node.data.parentId) {
            if (!childrenMap[node.data.parentId]) {
              childrenMap[node.data.parentId] = [];
            }
            childrenMap[node.data.parentId].push(node.id);
          }
        });
        
        const initializedNodes: CustomNode[] = rawNodes.map(node => {
          const nodeChildren = childrenMap[node.id] || [];
          const hasChildren = nodeChildren.length > 0;
          
          if (node.data.level === 0) {
            return {
              ...node,
              data: { ...node.data, isCollapsed: true, childrenCount: nodeChildren.length },
              hidden: false,
            };
          } else {
            return {
              ...node,
              data: { ...node.data, isCollapsed: hasChildren, childrenCount: nodeChildren.length },
              hidden: true,
            };
          }
        });
        
        const visibleNodesInitial = initializedNodes.filter(node => !node.hidden);
        const visibleNodeIdsInitial = new Set(visibleNodesInitial.map(node => node.id));
        
        const visibleEdgesInitial = rawEdges.filter(edge => 
          visibleNodeIdsInitial.has(edge.source) && visibleNodeIdsInitial.has(edge.target)
        );

        const { nodes: layoutedNodes, edges: layoutedEdges } = applyDagreLayout(
          visibleNodesInitial,
          visibleEdgesInitial,
          {
            direction: layoutDirection,
            nodeSeparation: 200,
            rankSeparation: 300,
          }
        ) as { nodes: CustomNode[], edges: Edge[] };
        
        const finalNodes = initializedNodes.map(node => {
          const layoutedNode = layoutedNodes.find(n => n.id === node.id);
          if (layoutedNode) {
            return { ...node, position: layoutedNode.position };
          }
          return node; 
        });

        setNodes(finalNodes);
        setEdges(rawEdges); 
        
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            reactFlowInstance?.fitView?.({
              padding: 0.6,
              includeHiddenNodes: false,
              duration: 800,
              minZoom: 0.3,
              maxZoom: 1.5
            });
          }, 400);
        });
      } catch (error: any) {
        console.error("Error processing agentic data:", error);
        if (onError) {
          onError(error);
        }
      }
    }
  }, [agenticData, layoutDirection, setNodes, setEdges, reactFlowInstance, onError]);
} 