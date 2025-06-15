import { Profile, StrategicInitiative, SystemApplication } from './types';

export const markdownService = {
  /**
   * Generates a complete markdown document from a profile object.
   * @param {Partial<Profile>} profileData - The profile data to use.
   * @returns {string} The generated markdown string.
   */
  generateMarkdown(profileData: Partial<Profile>): string {
    const sections = [
      this.generateHeader(profileData),
      this.generateCompanyOverview(profileData),
      this.generateStrategicInitiatives(profileData.strategicInitiatives),
      this.generateSystemsAndApplications(profileData.systemsAndApplications),
      this.generateNotes(profileData.notes),
    ];

    return sections.filter(section => section).join('\n---\n\n');
  },

  /**
   * Generates the main header for the markdown document.
   */
  generateHeader(data: Partial<Profile>): string {
    return `# Client Profile: ${data.companyName || '[Client Name]'}`;
  },

  /**
   * Generates the Company Overview section.
   */
  generateCompanyOverview(data: Partial<Profile>): string {
    const overviewParts = [
      `**Company Name**: ${data.companyName || ''}`,
      `**Industry**: ${data.industry || ''}`,
      `**Employee Count**: ${data.employeeCount || ''}`,
      `**Annual Revenue**: ${data.annualRevenue || ''}`,
      `**Primary Location**: ${data.primaryLocation || ''}`,
      `**Website**: ${data.websiteUrl || ''}`,
    ];
    const filteredParts = overviewParts.filter(p => p.split(':')[1]?.trim());

    if (filteredParts.length === 0) {
      return '';
    }
    
    return '## Company Overview\n' + filteredParts.join('\n');
  },

  /**
   * Generates the Strategic Initiatives section.
   */
  generateStrategicInitiatives(initiatives: StrategicInitiative[] = []): string {
    if (!initiatives || initiatives.length === 0) {
      return '';
    }

    let content = '## Strategic Initiatives\n';
    initiatives.forEach((initiative, index) => {
      content += `\n### ${index + 1}. ${initiative.initiative || `Initiative ${index + 1}`}\n`;
      
      const details = [
        { label: 'Status', value: initiative.status },
        { label: 'Priority', value: initiative.priority },
        { label: 'Timeline', value: initiative.targetTimeline },
        { label: 'Budget', value: initiative.estimatedBudget },
      ];
      
      details.forEach(detail => {
        if (detail.value) content += `**${detail.label}**: ${detail.value}\n`;
      });

      if (initiative.contact?.name) {
        content += `**Leader**: ${initiative.contact.name}${initiative.contact.title ? ` (${initiative.contact.title})` : ''}\n`;
      }

      const sections = [
        { title: 'Business Problems', items: initiative.businessProblems },
        { title: 'Expected Outcomes', items: initiative.expectedOutcomes },
        { title: 'Success Metrics', items: initiative.successMetrics },
      ];

      sections.forEach(section => {
        if (section.items && section.items.length > 0) {
          content += `\n#### ${section.title}\n`;
          section.items.forEach(item => {
            content += `- ${item}\n`;
          });
        }
      });
    });

    return content;
  },

  /**
   * Generates the Systems & Applications section.
   */
  generateSystemsAndApplications(systems: SystemApplication[] = []): string {
    if (!systems || systems.length === 0) {
      return '';
    }

    let content = '## Systems & Applications\n';
    systems.forEach(system => {
      content += `\n### ${system.name}\n`;
      if (system.category) content += `**Category**: ${system.category}\n`;
      if (system.vendor) content += `**Vendor**: ${system.vendor}\n`;
      if (system.version) content += `**Version**: ${system.version}\n`;
      if (system.criticality) content += `**Criticality**: ${system.criticality}\n`;
      if (system.description) content += `> ${system.description}\n`;
    });

    return content;
  },

  /**
   * Generates the Notes section.
   */
  generateNotes(notes?: string): string {
    if (!notes) {
      return '';
    }
    return `## Notes\n\n${notes}`;
  },

  /**
   * Parses markdown into a profile object. (Currently a placeholder)
   * @param {string} markdown - The markdown content to parse.
   * @returns {Partial<Profile>} A partial profile object.
   */
  parseMarkdown(markdown: string): Partial<Profile> {
    try {
      const data: Partial<Profile> = {};
      const nameMatch = markdown.match(/^# Client Profile: (.+)$/m);
      if (nameMatch) {
        data.companyName = nameMatch[1];
      }
      return data;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      throw error;
    }
  },
};