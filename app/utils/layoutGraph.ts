import * as dagre from 'dagre';
import { Node, Edge } from 'reactflow';
import { CustomNode } from '../components/flow/types';

interface LayoutOptions {
    direction?: 'LR' | 'TB';
    nodeSeparation?: number;
    rankSeparation?: number;
}

interface NodeDimensions {
    width: number;
    height: number;
}

export function applyDagreLayout(nodes: CustomNode[], edges: Edge[], options: LayoutOptions = {}): { nodes: CustomNode[], edges: Edge[] } {
  const direction = options.direction || 'LR';
  const nodeSeparation = options.nodeSeparation || 100;
  const rankSeparation = options.rankSeparation || 200;
  
  const visibleNodes = nodes.filter(node => !node.hidden);
  
  const visibleNodeIds = new Set(visibleNodes.map(node => node.id));
  
  const visibleEdges = edges.filter(edge => 
    visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
  );
  
  const updatedEdges = edges.map(edge => {
    if (visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)) {
      return { ...edge, hidden: false };
    } else {
      return { ...edge, hidden: true };
    }
  });
  
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: direction,
    nodesep: nodeSeparation,
    ranksep: rankSeparation,
    marginx: 25,
    marginy: 25,
    acyclicer: 'greedy',
    ranker: 'network-simplex'
  });
  g.setDefaultEdgeLabel(() => ({}));
  
  const getNodeDimensions = (node: CustomNode): NodeDimensions => {
    const defaultDimensions = { width: 250, height: 100 };
    
    if (node.data.isCollapsed) {
      return { width: 180, height: 50 };
    }
    
    if (node.data.nodeType === 'useCaseNode') {
      return { width: 260, height: node.data.description ? 130 : 80 };
    }
    
    if (node.data.nodeType === 'triggerNode') {
      const hasFields = node.data.target_table || node.data.condition || node.data.objective;
      return { width: 270, height: hasFields ? 160 : 80 };
    }
    
    if (node.data.nodeType === 'agentNode') {
      const hasDetails = node.data.role || node.data.instructions;
      const hasDescription = node.data.description;
      
      if (hasDetails && (node as any).data.expanded) {
        return { width: 280, height: 240 };
      } else if (hasDescription) {
        return { width: 260, height: 120 };
      }
      return { width: 230, height: 80 };
    }
    
    if (node.data.nodeType === 'toolNode') {
      return { width: 230, height: node.data.description ? 110 : 70 };
    }
    
    return defaultDimensions;
  };
  
  visibleNodes.forEach((node) => {
    const { width, height } = getNodeDimensions(node);
    g.setNode(node.id, { width, height, id: node.id });
  });
  
  visibleEdges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });
  
  try {
    dagre.layout(g);
  } catch (error) {
    console.error("Error during layout calculation:", error);
    return { nodes, edges: updatedEdges };
  }
  
  const positionedNodes: CustomNode[] = nodes.map((node) => {
    if (node.hidden) {
      const parentNode = node.data.parentId ? nodes.find(n => n.id === node.data.parentId) : null;
      if (parentNode && parentNode.position) {
        return {
          ...node,
          position: {
            x: parentNode.position.x,
            y: parentNode.position.y + 200
          }
        };
      }
      return node;
    }

    const graphNode = g.node(node.id);
    
    if (!graphNode) {
      console.warn(`Node ${node.id} was not positioned correctly by Dagre`);
      return node;
    }
    
    const { width, height } = getNodeDimensions(node);
    
    return {
      ...node,
      position: {
        x: graphNode.x - width / 2,
        y: graphNode.y - height / 2,
      },
      width,
      height,
    };
  });
  
  return { nodes: positionedNodes, edges: updatedEdges };
} 