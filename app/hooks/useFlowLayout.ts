'use client';

import { useState, useCallback, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import { useReactFlow, Edge } from 'reactflow';
import { applyDagreLayout } from '../utils/layoutGraph';
import { CustomNode, NodeData } from '../components/flow/types';

export function useFlowLayout(
  nodes: CustomNode[],
  setNodes: Dispatch<SetStateAction<CustomNode[]>>,
  edges: Edge[],
  setEdges: Dispatch<SetStateAction<Edge[]>>
) {
  const [layoutDirection, setLayoutDirection] = useState<'LR' | 'TB'>('LR');
  const [autoFitEnabled, setAutoFitEnabled] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const reactFlowInstance = useReactFlow<NodeData, Edge>();

  const lastCollapseStateRef = useRef<{ [key: string]: boolean }>({});
  const isLayoutNecessaryRef = useRef<boolean>(false);

  const updateDescendantVisibility = useCallback((nodesToUpdate: CustomNode[], parentId: string, hidden: boolean): CustomNode[] => {
    const children = nodesToUpdate.filter(node => node.data.parentId === parentId);

    children.forEach(child => {
      const childIndex = nodesToUpdate.findIndex(n => n.id === child.id);
      if (childIndex !== -1) {
        const grandChildren = nodesToUpdate.filter(n => n.data.parentId === child.id);
        const hasGrandChildren = grandChildren.length > 0;

        nodesToUpdate[childIndex] = {
          ...nodesToUpdate[childIndex],
          hidden: hidden,
          data: {
            ...nodesToUpdate[childIndex].data,
            isCollapsed: hasGrandChildren ? true : nodesToUpdate[childIndex].data.isCollapsed
          }
        };
        
        updateDescendantVisibility(nodesToUpdate, child.id, hidden);
      }
    });
    
    return nodesToUpdate;
  }, []);

  const toggleNodeExpansion = useCallback((nodeId: string) => {
    console.log(`Toggle expansion for node: ${nodeId}`);
    
    setNodes(currentNodes => {
      const nodeIndex = currentNodes.findIndex(n => n.id === nodeId);
      if (nodeIndex === -1) {
        console.error(`Node with id ${nodeId} not found`);
        return currentNodes;
      }

      const node = currentNodes[nodeIndex];
      const isCollapsed = !node.data.isCollapsed;
      
      console.log(`Setting node ${nodeId} collapsed state to: ${isCollapsed}`);
      
      const updatedNodes = [...currentNodes];
      updatedNodes[nodeIndex] = {
        ...node,
        data: {
          ...node.data,
          isCollapsed
        }
      };
      
      const childNodes = currentNodes.filter(n => n.data.parentId === nodeId);
      const hasChildren = childNodes.length > 0;
      
      if (hasChildren) {
        console.log(`Node ${nodeId} has ${childNodes.length} children, updating their visibility`);
        
        childNodes.forEach(childNode => {
          const childIndex = updatedNodes.findIndex(n => n.id === childNode.id);
          if (childIndex !== -1) {
            const grandChildren = currentNodes.filter(n => n.data.parentId === childNode.id);
            const hasGrandChildren = grandChildren.length > 0;
            
            updatedNodes[childIndex] = {
              ...updatedNodes[childIndex],
              hidden: isCollapsed,
              data: {
                ...updatedNodes[childIndex].data,
                isCollapsed: hasGrandChildren ? true : updatedNodes[childIndex].data.isCollapsed
              }
            };
            
            if (isCollapsed) {
              updateDescendantVisibility(updatedNodes, childNode.id, true);
            }
          }
        });
        
        setLastUpdate(`${nodeId} ${isCollapsed ? 'collapsed' : 'expanded'} at ${new Date().toLocaleTimeString()}`);
        isLayoutNecessaryRef.current = true;
        
        const visibleNodeIds = new Set(
          updatedNodes
            .filter(node => !node.hidden)
            .map(node => node.id)
        );
        
        setEdges(currentEdges => 
          currentEdges.map(edge => ({
            ...edge,
            hidden: !(visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target))
          }))
        );
        
        if (autoFitEnabled) {
          window.requestAnimationFrame(() => {
            setTimeout(() => {
              reactFlowInstance.fitView({
                padding: 0.6,
                includeHiddenNodes: false,
                duration: 800,
                minZoom: 0.3,
                maxZoom: 1.5
              });
            }, 400);
          });
        }
      }
      
      return updatedNodes;
    });
  }, [setNodes, setEdges, reactFlowInstance, updateDescendantVisibility, autoFitEnabled]);

  const expandAllNodes = useCallback(() => {
    setLastUpdate(`Expanding all nodes: ${new Date().toLocaleTimeString()}`);
    
    setNodes(nodes => {
      const expandedNodes = nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          isCollapsed: false
        },
        hidden: false
      }));
      
      setEdges(currentEdges => 
        currentEdges.map(edge => ({ ...edge, hidden: false }))
      );
      
      isLayoutNecessaryRef.current = true;
      
      if (autoFitEnabled) {
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            reactFlowInstance.fitView({
              padding: 0.3,
              includeHiddenNodes: false,
              minZoom: 0.5,
              maxZoom: 1.5
            });
          }, 300);
        });
      }
      
      return expandedNodes;
    });
  }, [setNodes, setEdges, reactFlowInstance, autoFitEnabled]);

  const collapseAllNodes = useCallback(() => {
    setLastUpdate(`Collapsing to show only top-level nodes: ${new Date().toLocaleTimeString()}`);
    
    setNodes(nodes => {
      const updatedNodes = nodes.map(node => {
        if (node.data.level === 0) {
          return {
            ...node,
            data: {
              ...node.data,
              isCollapsed: true
            },
            hidden: false
          };
        }
        return {
          ...node,
          data: {
            ...node.data,
            isCollapsed: true
          },
          hidden: true
        };
      });
      
      const visibleNodeIds = new Set(
        updatedNodes
          .filter(node => !node.hidden)
          .map(node => node.id)
      );
      
      setTimeout(() => {
        setEdges(currentEdges => 
          currentEdges.map(edge => ({
            ...edge,
            hidden: !(visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target))
          }))
        );
      }, 0);
      
      isLayoutNecessaryRef.current = true;
      
      if (autoFitEnabled) {
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            reactFlowInstance.fitView({
              padding: 0.3,
              includeHiddenNodes: false,
              minZoom: 0.5,
              maxZoom: 1.5
            });
          }, 300);
        });
      }
      
      return updatedNodes;
    });
  }, [setNodes, setEdges, reactFlowInstance, autoFitEnabled]);

  useEffect(() => {
    if (nodes.length === 0 || edges.length === 0) return;
    
    let hasCollapseStateChanged = false;
    const currentCollapseState: { [key: string]: boolean } = {};
    const changedNodeIds: string[] = [];
    
    nodes.forEach(node => {
      if (node.data && node.data.isCollapsed !== undefined) {
        currentCollapseState[node.id] = node.data.isCollapsed;
        if (lastCollapseStateRef.current[node.id] !== node.data.isCollapsed) {
          hasCollapseStateChanged = true;
          changedNodeIds.push(node.id);
        }
      }
    });
    
    if (hasCollapseStateChanged || isLayoutNecessaryRef.current) {
      const updateType = hasCollapseStateChanged ? 
        `Node(s) ${changedNodeIds.join(', ')} toggled` : 
        'Layout direction changed';
      
      setLastUpdate(`${updateType} - applying layout: ${new Date().toLocaleTimeString()}`);
      lastCollapseStateRef.current = {...currentCollapseState};
      isLayoutNecessaryRef.current = false;
      
      const visibleNodes = nodes.filter(node => !node.hidden);
      const visibleNodeIds = new Set(visibleNodes.map(node => node.id));
      
      const updatedEdges = edges.map(edge => {
        if (visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)) {
          return { ...edge, hidden: false };
        } else {
          return { ...edge, hidden: true };
        }
      });
      
      const { nodes: layoutedNodes, edges: layoutedEdges } = applyDagreLayout(
        visibleNodes,
        updatedEdges,
        {
          direction: layoutDirection,
          nodeSeparation: 200,
          rankSeparation: 300,
        }
      ) as { nodes: CustomNode[], edges: Edge[] };

      const mergedNodes = nodes.map(node => {
        const layoutedNode = layoutedNodes.find(n => n.id === node.id);
        if (layoutedNode) {
          return {
            ...node,
            position: layoutedNode.position
          };
        }
        return node;
      });

      setNodes(mergedNodes);
      setEdges(layoutedEdges);

      if (autoFitEnabled) {
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            reactFlowInstance.fitView({ 
              padding: 0.6,
              includeHiddenNodes: false,
              duration: 800,
              minZoom: 0.3,
              maxZoom: 1.5
            });
          }, 400);
        });
      }
    }
  }, [nodes, edges, layoutDirection, setNodes, setEdges, reactFlowInstance, autoFitEnabled]);

  const handleLayoutChange = useCallback((direction: 'LR' | 'TB') => {
    setLayoutDirection(direction);
    isLayoutNecessaryRef.current = true;
    setLastUpdate(`Layout direction changed to ${direction}: ${new Date().toLocaleTimeString()}`);
  }, []);

  return {
    layoutDirection,
    autoFitEnabled,
    lastUpdate,
    setAutoFitEnabled,
    toggleNodeExpansion,
    expandAllNodes,
    collapseAllNodes,
    handleLayoutChange
  };
} 