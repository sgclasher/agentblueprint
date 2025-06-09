import { Node, Edge } from 'reactflow';
import { AgenticData, UseCase } from '../store/useAgenticStore';
import { CustomNode } from '../components/flow/types';

export function transformAgenticData(agenticData: AgenticData | null): { nodes: CustomNode[], edges: Edge[] } {
  if (!agenticData || !agenticData.use_cases || !agenticData.use_cases.length) {
    return { nodes: [], edges: [] };
  }

  const nodes: CustomNode[] = [];
  const edges: Edge[] = [];
  let nodeId = 1;

  const sortedUseCases = [...agenticData.use_cases].sort((a, b) => {
    const nameA = a.name || '';
    const nameB = b.name || '';
    return nameA.localeCompare(nameB);
  });

  sortedUseCases.forEach((useCase, useCaseIndex) => {
    if (!useCase.sys_id) {
      useCase.sys_id = `generated-${nodeId++}`;
    }
    
    const useCaseId = `usecase-${useCase.sys_id}`;
    nodes.push({
      id: useCaseId,
      position: { x: 0, y: 0 },
      data: { 
        label: useCase.name || `Use Case ${useCaseIndex + 1}`,
        type: 'useCase',
        description: useCase.description || '',
        details: useCase,
        isCollapsed: false,
        childrenCount: (useCase.agents || []).length,
        nodeType: 'useCaseNode',
        parentId: null,
        level: 0
      },
      type: 'useCaseNode'
    });

    if (useCase.triggers && useCase.triggers.length) {
      useCase.triggers.forEach((trigger, triggerIndex) => {
        if (!trigger.sys_id) {
          trigger.sys_id = `generated-${nodeId++}`;
        }
        
        const triggerId = `trigger-${trigger.sys_id}`;
        
        nodes.push({
          id: triggerId,
          position: { x: 0, y: 0 },
          data: { 
            label: trigger.name || trigger.objective_template || `Trigger ${triggerIndex + 1}`, 
            type: 'trigger',
            target_table: trigger.target_table || '',
            condition: trigger.condition || '',
            objective: trigger.objective_template || '', 
            details: trigger,
            isCollapsed: false,
            childrenCount: 0,
            nodeType: 'triggerNode',
            parentId: null,
            level: 0
          },
          type: 'triggerNode'
        });

        edges.push({
          id: `edge-${triggerId}-${useCaseId}`,
          source: triggerId,
          target: useCaseId,
          animated: true,
          label: 'initiates'
        });
      });
    }

    if (useCase.agents && useCase.agents.length) {
      useCase.agents.forEach((agent, agentIndex) => {
        if (!agent.sys_id) {
          agent.sys_id = `generated-${nodeId++}`;
        }
        
        const agentId = `agent-${agent.sys_id}`;
        
        nodes.push({
          id: agentId,
          position: { x: 0, y: 0 },
          data: { 
            label: agent.name || `Agent ${agentIndex + 1}`,
            type: 'agent',
            description: agent.description || '',
            role: agent.role || '',
            instructions: agent.instructions || '',
            details: agent,
            isCollapsed: false,
            childrenCount: (agent.tools || []).length,
            nodeType: 'agentNode',
            parentId: useCaseId,
            level: 1,
            visible: true
          },
          type: 'agentNode'
        });

        edges.push({
          id: `edge-${useCaseId}-${agentId}`,
          source: useCaseId,
          target: agentId,
          label: 'uses',
          data: {
            parentRelationship: true
          }
        });

        if (agent.tools && agent.tools.length) {
          agent.tools.forEach((tool, toolIndex) => {
            if (!tool.sys_id) {
              tool.sys_id = `generated-${nodeId++}`;
            }
            
            const toolId = `tool-${tool.sys_id}`;
            
            nodes.push({
              id: toolId,
              position: { x: 0, y: 0 },
              data: { 
                label: tool.name || `Tool ${toolIndex + 1}`,
                type: 'tool',
                description: tool.description || '',
                toolType: tool.type || 'unknown',
                details: tool,
                isCollapsed: false,
                childrenCount: 0,
                nodeType: 'toolNode',
                parentId: agentId,
                level: 2,
                visible: true
              },
              type: 'toolNode'
            });

            edges.push({
              id: `edge-${agentId}-${toolId}`,
              source: agentId,
              target: toolId,
              label: 'uses',
              data: {
                parentRelationship: true
              }
            });
          });
        }
      });
    }
  });
  
  return { nodes, edges };
}
