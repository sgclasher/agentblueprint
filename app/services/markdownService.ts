import { Profile } from './types';

export const markdownService = {
  generateMarkdown(profileData: Partial<Profile>): string {
    if (profileData.expectedOutcome || profileData.problems || profileData.solutions) {
      return this.generateAgenticAIMarkdown(profileData);
    }
    
    const sections = [
      this.generateHeader(profileData),
      this.generateCompanyOverview(profileData),
      this.generateValueSellingFramework(profileData),
      this.generateAIOpportunityAssessment(profileData),
      this.generateSummary(profileData)
    ];

    return sections.filter(section => section).join('\n\n---\n\n');
  },

  generateAgenticAIMarkdown(data: Partial<Profile>): string {
    const sections = [
      this.generateHeader(data),
      this.generateCompanyOverview(data),
      this.generateExpectedOutcome(data),
      this.generateProblemsAndOpportunities(data),
      this.generateSolutionsAndValue(data),
      this.generateCurrentArchitectureSection(data),
      this.generateAgenticAISummary(data)
    ];

    return sections.filter(section => section).join('\n\n---\n\n');
  },

  generateExpectedOutcome(data: Partial<Profile>): string {
    const outcome = data.expectedOutcome || {};
    let content = '## Expected Business Outcome\n\n';

    content += '### Strategic Initiatives\n';
    if (outcome.strategicInitiatives?.length > 0) {
      outcome.strategicInitiatives.forEach((initiative: any, index: number) => {
        content += `#### ${index + 1}. ${initiative.initiative}\n`;
        if (initiative.contact) {
          content += `**Contact**: ${initiative.contact.name} (${initiative.contact.title})\n`;
          content += `- Email: ${initiative.contact.email}\n`;
          content += `- LinkedIn: ${initiative.contact.linkedin}\n`;
          content += `- Phone: ${initiative.contact.phone}\n\n`;
        }
      });
    }

    if (outcome.businessObjectives) {
      content += `### Business Objectives\n${outcome.businessObjectives}\n`;
    }

    return content;
  },

  generateProblemsAndOpportunities(data: Partial<Profile>): string {
    const problems = data.problems || {};
    let content = '## Problems & Agentic AI Opportunities\n\n';

    content += '### Current Business Problems\n';
    if (problems.businessProblems?.length > 0) {
      problems.businessProblems.forEach((problem: string) => {
        content += `- ${problem}\n`;
      });
    }

    content += '\n### Agentic Workflow Opportunities\n';
    if (problems.agenticOpportunities?.length > 0) {
      problems.agenticOpportunities.forEach((opportunity: string) => {
        content += `- **${opportunity}**\n`;
      });
    }

    return content;
  },

  generateSolutionsAndValue(data: Partial<Profile>): string {
    const solutions = data.solutions || {};
    const value = data.value || {};
    let content = '## Solutions & Value Proposition\n\n';

    content += '### Capabilities\n';
    if (solutions.capabilities?.length > 0) {
      solutions.capabilities.forEach((capability: string) => {
        content += `- ${capability}\n`;
      });
    }

    content += '\n### Key Differentiators\n';
    if (solutions.differentiators?.length > 0) {
      solutions.differentiators.forEach((diff: string) => {
        content += `- ${diff}\n`;
      });
    }

    if (solutions.competitorGaps?.length > 0) {
      content += '\n### Competitor Gaps\n';
      solutions.competitorGaps.forEach((gap: string) => {
        content += `- ${gap}\n`;
      });
    }

    if (value.businessValue) {
      content += '\n### Business Value\n';
      const bv = value.businessValue;
      if (bv.revenueImpact) content += `**Revenue Impact**: ${bv.revenueImpact}\n\n`;
      if (bv.costReduction) content += `**Cost Reduction**: ${bv.costReduction}\n\n`;
      if (bv.operationalEfficiency) content += `**Operational Efficiency**: ${bv.operationalEfficiency}\n\n`;
      
      if (bv.kpiImprovements?.length > 0) {
        content += '**KPI Improvements**:\n';
        bv.kpiImprovements.forEach((kpi: string) => {
          content += `- ${kpi}\n`;
        });
        content += '\n';
      }
      
      if (bv.totalAnnualImpact) {
        content += `**Total Annual Impact**: ${bv.totalAnnualImpact}\n\n`;
      }
    }

    if (value.personalValue) {
      content += '### Personal Value\n';
      const pv = value.personalValue;
      if (pv.executiveWin) content += `**Executive Win**: ${pv.executiveWin}\n\n`;
      if (pv.teamWin) content += `**Team Win**: ${pv.teamWin}\n\n`;
      if (pv.careerImpact) content += `**Career Impact**: ${pv.careerImpact}\n\n`;
      if (pv.organizationalBenefit) content += `**Organizational Benefit**: ${pv.organizationalBenefit}\n\n`;
    }

    return content;
  },

  generateCurrentArchitectureSection(data: Partial<Profile>): string {
    const arch = data.currentArchitecture || {};
    let content = '## Current Architecture\n\n';

    content += '### Core Systems\n';
    if (arch.coreSystems?.length > 0) {
      arch.coreSystems.forEach((system: string) => {
        content += `- ${system}\n`;
      });
    }

    if (arch.integrations) {
      content += `\n**Integrations**: ${arch.integrations}\n`;
    }
    if (arch.dataQuality) {
      content += `**Data Quality**: ${arch.dataQuality}\n`;
    }
    if (arch.technicalDebt) {
      content += `**Technical Debt**: ${arch.technicalDebt}\n`;
    }
    if (arch.aiReadiness) {
      content += `**AI Readiness**: ${arch.aiReadiness}\n`;
    }

    return content;
  },

  generateAgenticAISummary(data: Partial<Profile>): string {
    const outcome = data.expectedOutcome || {};
    const value = data.value || {};
    
    let content = '## Executive Summary\n\n';
    
    content += `**Company**: ${data.companyName} (${data.industry}, ${data.size})\n\n`;
    
    if (outcome.businessObjectives) {
      content += `**Strategic Objective**: ${outcome.businessObjectives}\n\n`;
    }
    
    if (value.businessValue?.totalAnnualImpact) {
      content += `**Financial Impact**: ${value.businessValue.totalAnnualImpact}\n\n`;
    }
    
    content += '### Key Contacts\n';
    if (outcome.strategicInitiatives?.length > 0) {
      outcome.strategicInitiatives.forEach((initiative: any) => {
        if (initiative.contact) {
          content += `- **${initiative.contact.name}** (${initiative.contact.title}) - ${initiative.contact.email}\n`;
        }
      });
    }

    return content;
  },

  parseMarkdown(markdown: string): Partial<Profile> {
    try {
      const data: Partial<Profile> = {};
      
      const nameMatch = markdown.match(/^# Client Profile: (.+)$/m);
      if (nameMatch) {
        data.companyName = nameMatch[1];
      } else {
        throw new Error('Invalid markdown format: missing client profile header');
      }
      
      data.companyOverview = this.parseCompanyOverview(markdown);
      
      return data;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      throw error;
    }
  },

  generateHeader(data: Partial<Profile>): string {
    return `# Client Profile: ${data.companyName || '[Client Name]'}`;
  },

  generateCompanyOverview(data: Partial<Profile>): string {
    return `## Company Overview
- **Company Name**: ${data.companyName || '[Enter company name]'}
- **Industry**: ${data.industry || '[Enter industry]'}
- **Size**: ${data.size || '[Small (50-500) / Mid-Market (500-5K) / Enterprise (5K+)]'}
- **Annual Revenue**: $${data.annualRevenue || '[Enter amount]'}
- **Employee Count**: ${data.employeeCount || '[Enter number]'}
- **Primary Location**: ${data.primaryLocation || '[Enter location]'}

---`;
  },

  generateValueSellingFramework(data: Partial<Profile>): string {
    return this.generateAgenticAIFramework(data);
  },

  generateAgenticAIFramework(data: Partial<Profile>): string {
    const framework = data.agenticAIFramework || {};
    let content = '## Agentic AI Framework\n\n';

    content += '### 1. Business Issue\n';
    content += '**High-level strategic priority or C-level concern:**\n';
    
    if (framework.businessIssues?.length > 0) {
      framework.businessIssues.forEach((issue: string) => {
        content += `- [x] ${issue}\n`;
      });
    }
    
    if (framework.businessIssuesOther) {
      content += `- [x] Other: ${framework.businessIssuesOther}\n`;
    }
    
    if (framework.businessIssueDetails) {
      content += `\n**Details**: ${framework.businessIssueDetails}\n`;
    }

    content += '\n### 2. Problems / Challenges\n';
    content += '**Specific operational issues identified:**\n\n';

    const departments = [
      { key: 'finance', name: 'Finance Department' },
      { key: 'hr', name: 'HR Department' },
      { key: 'it', name: 'IT Department' },
      { key: 'customerService', name: 'Customer Service' },
      { key: 'operations', name: 'Operations' }
    ];

    departments.forEach(dept => {
      const problems = framework.departmentalProblems?.[dept.key] || [];
      if (problems.length > 0) {
        content += `#### ${dept.name}\n`;
        problems.forEach((problem: string) => {
          content += `- [x] ${problem}\n`;
        });
        content += '\n';
      }
    });

    if (framework.additionalChallenges) {
      content += `**Additional Challenges**: ${framework.additionalChallenges}\n`;
    }

    content += '\n### 3. Root Cause\n';
    content += '**Why do these challenges exist?**\n';
    
    if (framework.rootCauses?.length > 0) {
      framework.rootCauses.forEach((cause: string) => {
        content += `- [x] ${cause}\n`;
      });
    }
    
    if (framework.rootCausesOther) {
      content += `- [x] Other: ${framework.rootCausesOther}\n`;
    }
    
    if (framework.rootCauseDetails) {
      content += `\n**Details**: ${framework.rootCauseDetails}\n`;
    }

    content += '\n### 4. Impact\n';
    content += '**Quantified effects:**\n\n';
    
    content += '#### Hard Costs (Annual)\n';
    const hardCosts = framework.hardCosts || {};
    content += `- Labor costs from manual processes: $${hardCosts.laborCosts || '[Amount]'}\n`;
    content += `- Error correction costs: $${hardCosts.errorCosts || '[Amount]'}\n`;
    content += `- System downtime costs: $${hardCosts.downtimeCosts || '[Amount]'}\n`;
    content += `- Compliance penalties/risk: $${hardCosts.complianceCosts || '[Amount]'}\n`;
    
    const totalHardCosts = Object.values(hardCosts).reduce((sum: number, cost: any) => {
      const num = parseFloat(cost) || 0;
      return sum + num;
    }, 0);
    
    content += `- **Total Hard Costs**: $${totalHardCosts > 0 ? totalHardCosts.toLocaleString() : '[Sum]'}\n\n`;
    
    content += '#### Soft Costs\n';
    const softCosts = framework.softCosts || {};
    content += `- Employee frustration/turnover impact: ${softCosts.employeeFrustration || '[High/Medium/Low]'}\n`;
    content += `- Customer satisfaction decline: ${softCosts.customerSatisfaction || '[High/Medium/Low]'}\n`;
    content += `- Competitive disadvantage: ${softCosts.competitiveDisadvantage || '[High/Medium/Low]'}\n`;
    content += `- Missed opportunities/growth: ${softCosts.missedOpportunities || '[High/Medium/Low]'}\n`;

    content += '\n### 5. Solution\n';
    content += '**Capabilities needed to solve these challenges:**\n';
    
    if (framework.solutionCapabilities?.length > 0) {
      framework.solutionCapabilities.forEach((capability: string) => {
        content += `- [x] ${capability}\n`;
      });
    }
    
    if (framework.solutionCapabilitiesOther) {
      content += `- [x] Other: ${framework.solutionCapabilitiesOther}\n`;
    }

    content += '\n**Differentiation Requirements:**\n';
    if (framework.differentiationRequirements?.length > 0) {
      framework.differentiationRequirements.forEach((requirement: string) => {
        content += `- [x] ${requirement}\n`;
      });
    }
    
    if (framework.differentiationOther) {
      content += `- [x] Other: ${framework.differentiationOther}\n`;
    }

    content += '\n**Value / ROI Expectations:**\n';
    const roiExpectations = framework.roiExpectations || {};
    if (roiExpectations.costReduction) content += `- Target cost reduction: ${roiExpectations.costReduction}\n`;
    if (roiExpectations.efficiencyImprovement) content += `- Target efficiency improvement: ${roiExpectations.efficiencyImprovement}\n`;
    if (roiExpectations.paybackPeriod) content += `- Expected payback period: ${roiExpectations.paybackPeriod}\n`;
    if (roiExpectations.targetROI) content += `- Target ROI: ${roiExpectations.targetROI}\n`;
    if (roiExpectations.timeToFirstValue) content += `- Time to first value: ${roiExpectations.timeToFirstValue}\n`;

    content += '\n**Success Metrics:**\n';
    if (framework.successMetrics?.length > 0) {
      framework.successMetrics.forEach((metric: string) => {
        content += `- [x] ${metric}\n`;
      });
    }
    
    if (framework.successMetricsTargets) {
      content += `\n**Specific Targets**: ${framework.successMetricsTargets}\n`;
    }

    content += '\n### 6. Decision\n';
    content += '**Decision makers and buying process:**\n\n';
    
    const decisionMakers = framework.decisionMakers || {};
    
    content += '#### Key Decision Makers\n';
    if (decisionMakers.economicBuyer?.name) {
      content += `**Economic Buyer**: ${decisionMakers.economicBuyer.name}`;
      if (decisionMakers.economicBuyer.title) content += ` (${decisionMakers.economicBuyer.title})`;
      if (decisionMakers.economicBuyer.budget) content += ` - Budget Authority: $${parseInt(decisionMakers.economicBuyer.budget).toLocaleString()}`;
      content += '\n';
    }
    
    if (decisionMakers.technicalBuyer?.name) {
      content += `**Technical Buyer**: ${decisionMakers.technicalBuyer.name}`;
      if (decisionMakers.technicalBuyer.title) content += ` (${decisionMakers.technicalBuyer.title})`;
      content += '\n';
    }
    
    if (decisionMakers.champion?.name) {
      content += `**Champion**: ${decisionMakers.champion.name}`;
      if (decisionMakers.champion.title) content += ` (${decisionMakers.champion.title})`;
      content += '\n';
    }
    
    if (decisionMakers.influencers) {
      content += `**Influencers**: ${decisionMakers.influencers}\n`;
    }

    content += '\n#### Buying Process\n';
    const buyingProcess = framework.buyingProcess || {};
    if (buyingProcess.timeline) content += `- **Decision timeline**: ${buyingProcess.timeline}\n`;
    if (buyingProcess.budgetCycle) content += `- **Budget cycle**: ${buyingProcess.budgetCycle}\n`;
    
    if (buyingProcess.evaluationCriteria?.length > 0) {
      content += '- **Evaluation criteria**:\n';
      buyingProcess.evaluationCriteria.forEach((criteria: string) => {
        content += `  - ${criteria}\n`;
      });
    }
    
    if (buyingProcess.evaluationOther) {
      content += `  - ${buyingProcess.evaluationOther}\n`;
    }

    content += '\n#### Risks of Inaction\n';
    const risksOfInaction = framework.risksOfInaction || {};
    if (risksOfInaction.costEscalation) {
      content += `- **Continued cost escalation**: $${parseInt(risksOfInaction.costEscalation).toLocaleString()} annually\n`;
    }
    if (risksOfInaction.employeeAttrition) {
      content += `- **Employee attrition risk**: ${risksOfInaction.employeeAttrition}\n`;
    }
    if (risksOfInaction.threeYearCost) {
      content += `- **Estimated cost of inaction (3 years)**: $${parseInt(risksOfInaction.threeYearCost).toLocaleString()}\n`;
    }
    if (risksOfInaction.competitiveDisadvantage) {
      content += `- **Competitive disadvantage**: ${risksOfInaction.competitiveDisadvantage}\n`;
    }
    if (risksOfInaction.customerSatisfaction) {
      content += `- **Customer satisfaction decline**: ${risksOfInaction.customerSatisfaction}\n`;
    }
    if (risksOfInaction.complianceRisk) {
      content += `- **Regulatory compliance risk**: ${risksOfInaction.complianceRisk}\n`;
    }

    return content;
  },
  
  generateAIOpportunityAssessment(data: Partial<Profile>): string {
    return this.generateCurrentArchitecture(data);
  },

  generateCurrentArchitecture(data: Partial<Profile>): string {
    const assessment = data.currentArchitectureAssessment || {};
    let content = '## Current Architecture Assessment\n\n';

    content += '### Current Technology Landscape\n';
    const currentTech = assessment.currentTechnology || {};
    content += `- **Primary ERP**: ${currentTech.erp || '[Not specified]'}\n`;
    content += `- **CRM System**: ${currentTech.crm || '[Not specified]'}\n`;
    content += `- **Collaboration Tools**: ${currentTech.collaboration || '[Not specified]'}\n`;
    content += `- **Integration Maturity**: ${currentTech.integrationMaturity || '[Not assessed]'}\n`;
    content += `- **Data Quality**: ${currentTech.dataQuality || '[Not assessed]'}\n`;
    
    if (currentTech.automation) {
      content += `- **Current Automation**: ${currentTech.automation}\n`;
    }

    content += '\n### AI Readiness Score\n';
    const readinessScoring = assessment.readinessScoring || {};
    const criteriaLabels: { [key: string]: string } = {
      dataQuality: 'Data availability and quality',
      integration: 'System integration capability',
      technicalTeam: 'Technical team readiness',
      leadership: 'Leadership support',
      changeManagement: 'Change management capability'
    };

    Object.entries(criteriaLabels).forEach(([key, label]) => {
      const score = readinessScoring[key] || 0;
      const max = 2;
      content += `- **${label}**: ${score}/${max}\n`;
    });

    const totalScore = Object.values(readinessScoring).reduce((sum: number, score) => sum + (score || 0), 0);
    content += `\n**Total AI Readiness Score: ${totalScore}/10**\n`;

    content += '\n### Top AI Opportunities (Prioritized)\n';
    const opportunities = assessment.opportunities || [];
    
    if (opportunities.length > 0) {
      opportunities
        .sort((a: any, b: any) => (b.priorityScore || 0) - (a.priorityScore || 0))
        .forEach((opportunity: any, index: number) => {
          content += `\n#### ${index + 1}. ${opportunity.name || 'Unnamed Opportunity'}\n`;
          content += `- **Department**: ${opportunity.department || 'Not specified'}\n`;
          content += `- **Process**: ${opportunity.process || 'Not specified'}\n`;
          content += `- **Current State**: ${opportunity.currentState || 'Not described'}\n`;
          content += `- **AI Solution**: ${opportunity.aiSolution || 'Not specified'}\n`;
          content += `- **Estimated Impact**: $${opportunity.estimatedImpact ? parseInt(opportunity.estimatedImpact).toLocaleString() : '[Not quantified]'}\n`;
          content += `- **Implementation Effort**: ${opportunity.implementationEffort || 'Medium'}\n`;
          content += `- **Timeline**: ${opportunity.timeline || 'Not specified'}\n`;
          content += `- **Priority Score**: ${opportunity.priorityScore || 5}/10\n`;
        });
    } else {
      content += 'No specific opportunities identified yet.\n';
    }

    content += '\n### Quick Wins (0-6 months)\n';
    const quickWins = assessment.quickWins || [];
    
    if (quickWins.length > 0) {
      quickWins.forEach((quickWin: any, index: number) => {
        content += `${index + 1}. **${quickWin.name || 'Unnamed Quick Win'}**\n`;
        content += `   - Impact: $${quickWin.impact ? parseInt(quickWin.impact).toLocaleString() : '[Not quantified]'}\n`;
        content += `   - Timeline: ${quickWin.timeline || 'Not specified'}\n`;
      });
    } else {
      content += 'No quick wins identified yet.\n';
    }

    return content;
  },

  generateSummary(data: Partial<Profile>): string {
    const summary = data.summary || {};
    
    return `## Summary & Next Steps

### Executive Summary
**Current State**: ${summary.currentState || '[Brief description of key challenges and costs]'}

**Recommended Approach**: ${summary.recommendedApproach || '[High-level strategy recommendation]'}

**Expected Value**: 
- Total 3-year benefit: $${summary.expectedValue?.threeYearBenefit || '[Amount]'}
- Investment required: $${summary.expectedValue?.investment || '[Amount]'}
- Net ROI: ${summary.expectedValue?.netROI || '[X]%'}
- Payback period: ${summary.expectedValue?.paybackPeriod || '[X] months'}

### Immediate Next Steps
${this.generateNextSteps(summary.nextSteps)}

### Notes & Additional Context
${summary.notes || '[Free text area for additional observations, quotes from stakeholders, competitive insights, etc.]'}

---`;
  },
  
  generateNextSteps(steps: any[] = []): string {
    if (!steps.length) {
      return '1. [ ] [Specific action item with owner and date]\n2. [ ] [Specific action item with owner and date]\n3. [ ] [Specific action item with owner and date]';
    }

    return steps.map((step: any, index: number) => 
      `${index + 1}. [ ] ${step.action || '[Specific action item]'} - ${step.owner || '[Owner]'} - ${step.date || '[Date]'}`
    ).join('\n');
  },

  parseCompanyOverview(markdown: string): any {
    const section = this.extractSection(markdown, '## Company Overview');
    const data: { [key: string]: string } = {};
    
    const patterns: { [key: string]: RegExp } = {
      companyName: /\*\*Company Name\*\*:\s*(.+)/,
      industry: /\*\*Industry\*\*:\s*(.+)/,
      size: /\*\*Size\*\*:\s*(.+)/,
      annualRevenue: /\*\*Annual Revenue\*\*:\s*\$(.+)/,
      employeeCount: /\*\*Employee Count\*\*:\s*(.+)/,
      primaryLocation: /\*\*Primary Location\*\*:\s*(.+)/
    };

    Object.entries(patterns).forEach(([key, pattern]) => {
      const match = section.match(pattern);
      if (match) data[key] = match[1].trim();
    });

    return data;
  },

  extractSection(markdown: string, heading: string): string {
    const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`${escapedHeading}\\n([\\s\\S]*?)(?=\\n##|$)`);
    const match = markdown.match(regex);
    return match ? match[1].trim() : '';
  }
};