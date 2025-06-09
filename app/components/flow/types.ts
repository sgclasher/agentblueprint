import { Node } from 'reactflow';

export interface NodeData {
  label: string;
  type: 'useCase' | 'agent' | 'tool' | 'trigger';
  description?: string;
  details: any; // The original object from servicenow
  isCollapsed: boolean;
  childrenCount: number;
  nodeType: 'useCaseNode' | 'agentNode' | 'toolNode' | 'triggerNode';
  parentId: string | null;
  level: number;
  visible?: boolean;
  target_table?: string;
  condition?: string;
  objective?: string;
  role?: string;
  instructions?: string;
  toolType?: string;
  layoutDirection?: 'LR' | 'TB';
  onToggle?: (id: string) => void;
}

export type CustomNode = Node<NodeData>; 