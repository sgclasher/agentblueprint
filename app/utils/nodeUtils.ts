type NodeType = 'useCase' | 'agent' | 'tool' | 'trigger';

export function generateServiceNowUrl(baseUrl: string | null | undefined, nodeType: NodeType, sysId: string | null | undefined, toolType?: string): string | null {
  if (!baseUrl || !sysId) return null;
  
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  switch (nodeType) {
    case 'useCase':
      return `${cleanBaseUrl}/now/agent-studio/usecase-guided-setup/${sysId}/params/step/details`;
      
    case 'agent':
      return `${cleanBaseUrl}/now/agent-studio/agent-setup/${sysId}`;
    
    case 'trigger':
      return `${cleanBaseUrl}/now/nav/ui/classic/params/target/sn_aia_trigger_configuration.do%3Fsys_id%3D${sysId}%26sysparm_view%3D%26sysparm_record_target%3Dsn_aia_trigger_configuration%26sysparm_record_row%3D1%26sysparm_record_list%3DORDERBYusecase%26sysparm_record_rows%3D5`;
      
    case 'tool':
      return `${cleanBaseUrl}/now/nav/ui/classic/params/target/sn_aia_tool.do%3Fsys_id%3D${sysId}`;
      
    default:
      return null;
  }
}
