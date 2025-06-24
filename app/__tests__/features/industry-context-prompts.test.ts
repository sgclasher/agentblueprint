import { 
  generateIndustryContext, 
  getIndustryKPITemplates, 
  getIndustryPainPoints, 
  getIndustryAgentRoles,
  IndustryType 
} from '../../lib/llm/prompts/industryContextPrompts';

describe('Industry Context Prompts', () => {
  describe('generateIndustryContext', () => {
    it('should generate manufacturing-specific context', () => {
      const context = generateIndustryContext('Manufacturing');
      
      expect(context).toContain('production efficiency');
      expect(context).toContain('supply chain');
      expect(context).toContain('quality control');
      expect(context).toContain('lean manufacturing');
    });

    it('should generate technology-specific context', () => {
      const context = generateIndustryContext('Technology');
      
      expect(context).toContain('development velocity');
      expect(context).toContain('system reliability');
      expect(context).toContain('user experience');
      expect(context).toContain('innovation cycles');
    });

    it('should generate healthcare-specific context', () => {
      const context = generateIndustryContext('Healthcare');
      
      expect(context).toContain('patient outcomes');
      expect(context).toContain('regulatory compliance');
      expect(context).toContain('clinical efficiency');
      expect(context).toContain('safety protocols');
    });

    it('should generate financial services context', () => {
      const context = generateIndustryContext('Financial Services');
      
      expect(context).toContain('risk management');
      expect(context).toContain('regulatory compliance');
      expect(context).toContain('customer onboarding');
      expect(context).toContain('fraud detection');
    });
  });

  describe('getIndustryKPITemplates', () => {
    it('should return manufacturing KPI templates', () => {
      const kpis = getIndustryKPITemplates('Manufacturing');
      
      expect(kpis).toContain('Reduce production cycle time by X%');
      expect(kpis).toContain('Improve Overall Equipment Effectiveness (OEE) by X%');
      expect(kpis).toContain('Decrease defect rate by X%');
      expect(kpis).toContain('Reduce inventory holding costs by X%');
    });

    it('should return technology KPI templates', () => {
      const kpis = getIndustryKPITemplates('Technology');
      
      expect(kpis).toContain('Reduce deployment frequency from X to Y');
      expect(kpis).toContain('Improve system uptime to X%');
      expect(kpis).toContain('Decrease bug resolution time by X%');
      expect(kpis).toContain('Increase user engagement by X%');
    });

    it('should return healthcare KPI templates', () => {
      const kpis = getIndustryKPITemplates('Healthcare');
      
      expect(kpis).toContain('Reduce patient wait times by X%');
      expect(kpis).toContain('Improve patient satisfaction scores by X points');
      expect(kpis).toContain('Decrease readmission rates by X%');
      expect(kpis).toContain('Increase care team efficiency by X%');
    });

    it('should return financial services KPI templates', () => {
      const kpis = getIndustryKPITemplates('Financial Services');
      
      expect(kpis).toContain('Reduce loan processing time by X%');
      expect(kpis).toContain('Improve fraud detection accuracy to X%');
      expect(kpis).toContain('Decrease customer onboarding time by X%');
      expect(kpis).toContain('Increase regulatory compliance score by X%');
    });
  });

  describe('getIndustryPainPoints', () => {
    it('should return manufacturing pain points', () => {
      const painPoints = getIndustryPainPoints('Manufacturing');
      
      expect(painPoints).toContain('Equipment downtime');
      expect(painPoints).toContain('Supply chain disruptions');
      expect(painPoints).toContain('Quality control inconsistencies');
      expect(painPoints).toContain('Inventory management inefficiencies');
    });

    it('should return technology pain points', () => {
      const painPoints = getIndustryPainPoints('Technology');
      
      expect(painPoints).toContain('Development bottlenecks');
      expect(painPoints).toContain('System reliability issues');
      expect(painPoints).toContain('Technical debt accumulation');
      expect(painPoints).toContain('Cross-team communication gaps');
    });

    it('should return healthcare pain points', () => {
      const painPoints = getIndustryPainPoints('Healthcare');
      
      expect(painPoints).toContain('Administrative burden');
      expect(painPoints).toContain('Patient data fragmentation');
      expect(painPoints).toContain('Regulatory compliance complexity');
      expect(painPoints).toContain('Staff scheduling inefficiencies');
    });

    it('should return financial services pain points', () => {
      const painPoints = getIndustryPainPoints('Financial Services');
      
      expect(painPoints).toContain('Manual compliance processes');
      expect(painPoints).toContain('Legacy system integration challenges');
      expect(painPoints).toContain('Risk assessment complexity');
      expect(painPoints).toContain('Customer onboarding friction');
    });
  });

  describe('getIndustryAgentRoles', () => {
    it('should return manufacturing-specific agent roles', () => {
      const roles = getIndustryAgentRoles('Manufacturing');
      
      expect(roles).toHaveProperty('coordinator');
      expect(roles).toHaveProperty('researcher');
      expect(roles).toHaveProperty('analyst');
      expect(roles).toHaveProperty('qualityChecker');
      expect(roles).toHaveProperty('actuator');
      
      expect(roles.coordinator).toContain('production scheduling');
      expect(roles.researcher).toContain('equipment data');
      expect(roles.analyst).toContain('production metrics');
      expect(roles.qualityChecker).toContain('quality standards');
      expect(roles.actuator).toContain('production systems');
    });

    it('should return technology-specific agent roles', () => {
      const roles = getIndustryAgentRoles('Technology');
      
      expect(roles.coordinator).toContain('sprint planning');
      expect(roles.researcher).toContain('system logs');
      expect(roles.analyst).toContain('performance metrics');
      expect(roles.qualityChecker).toContain('code quality');
      expect(roles.actuator).toContain('deployment systems');
    });

    it('should return healthcare-specific agent roles', () => {
      const roles = getIndustryAgentRoles('Healthcare');
      
      expect(roles.coordinator).toContain('care coordination');
      expect(roles.researcher).toContain('patient data');
      expect(roles.analyst).toContain('clinical outcomes');
      expect(roles.qualityChecker).toContain('medical protocols');
      expect(roles.actuator).toContain('clinical systems');
    });

    it('should return financial services agent roles', () => {
      const roles = getIndustryAgentRoles('Financial Services');
      
      expect(roles.coordinator).toContain('risk assessment workflow');
      expect(roles.researcher).toContain('market data');
      expect(roles.analyst).toContain('financial metrics');
      expect(roles.qualityChecker).toContain('regulatory requirements');
      expect(roles.actuator).toContain('financial systems');
    });
  });

  describe('edge cases', () => {
    it('should handle unknown industry gracefully', () => {
      const context = generateIndustryContext('Unknown' as IndustryType);
      expect(context).toContain('business processes');
      expect(context).toContain('operational efficiency');
    });

    it('should return generic KPIs for unknown industry', () => {
      const kpis = getIndustryKPITemplates('Unknown' as IndustryType);
      expect(kpis).toContain('Improve process efficiency by X%');
      expect(kpis).toContain('Reduce operational costs by X%');
    });
  });
}); 