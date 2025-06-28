/**
 * Simple Domain Detection Test
 * Isolated test to verify domain patterns work correctly
 */

describe('Simple Domain Detection Test', () => {
  
  test('should load domain patterns module', () => {
    const domainPatterns = require('../../lib/llm/patterns/domainAgentPatterns');
    
    expect(domainPatterns.detectBusinessDomain).toBeDefined();
    expect(domainPatterns.getDomainAgentPattern).toBeDefined();
  });

  test('should detect procurement domain correctly', () => {
    const { detectBusinessDomain } = require('../../lib/llm/patterns/domainAgentPatterns');
    
    const domain = detectBusinessDomain(
      'Process Automation',
      'Automate procurement workflows with RFP and vendor management',
      'Manufacturing'
    );
    
    expect(domain).toBe('procurement');
  });

  test('should get procurement agent pattern', () => {
    const { getDomainAgentPattern } = require('../../lib/llm/patterns/domainAgentPatterns');
    
    const pattern = getDomainAgentPattern('procurement');
    
    expect(pattern.domain).toBe('procurement');
    expect(pattern.coordinationPattern).toBe('Manager-Workers');
    expect(pattern.agentRoles.length).toBeGreaterThan(0);
    expect(pattern.agentRoles[0].role).toBe('procurement-coordinator');
  });

}); 