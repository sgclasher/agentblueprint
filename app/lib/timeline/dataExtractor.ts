import { Profile, StrategicInitiative, SystemApplication } from '../../services/types';
import { extractProfileDataSummary, ProfileDataSummary } from './validation';

/**
 * Timeline Data Extractor Service
 * 
 * This service extracts and formats profile data specifically for timeline generation,
 * separate from general markdown generation. It provides clean, structured data
 * optimized for AI timeline creation.
 */

interface TimelineProfileData {
  companyProfile: CompanyProfile;
  strategicContext: StrategicContext;
  technicalContext: TechnicalContext;
  businessContext: BusinessContext;
  metadata: ProfileMetadata;
}

interface CompanyProfile {
  name: string;
  industry: string;
  size: {
    employees?: string;
    revenue?: string;
  };
  location?: string;
  website?: string;
}

interface StrategicContext {
  initiatives: ProcessedInitiative[];
  totalInitiatives: number;
  highPriorityCount: number;
  inProgressCount: number;
  hasBusinessMetrics: boolean;
}

interface ProcessedInitiative {
  name: string;
  priority?: 'High' | 'Medium' | 'Low';
  status?: 'Planning' | 'In Progress' | 'On Hold' | 'Completed';
  timeline?: string;
  budget?: string;
  contact?: {
    name: string;
    title: string;
  };
  businessProblems: string[];
  expectedOutcomes: string[];
  successMetrics: string[];
  businessValue: string; // Calculated summary
}

interface TechnicalContext {
  systems: ProcessedSystem[];
  systemsByCategory: { [category: string]: ProcessedSystem[] };
  totalSystems: number;
  criticalSystemsCount: number;
  hasModernTech: boolean;
}

interface ProcessedSystem {
  name: string;
  category: string;
  vendor?: string;
  criticality?: 'High' | 'Medium' | 'Low';
  description?: string;
}

interface BusinessContext {
  allBusinessProblems: string[];
  problemsByInitiative: { [initiative: string]: string[] };
  totalProblems: number;
  keyPainPoints: string[];
  opportunityAreas: string[];
}

interface ProfileMetadata {
  completenessScore: number;
  dataQuality: 'High' | 'Medium' | 'Low';
  timelineReadiness: boolean;
  missingCriticalData: string[];
  recommendations: string[];
}

/**
 * Main extraction function that processes a profile into timeline-optimized data
 */
export function extractTimelineData(profile: Partial<Profile>): TimelineProfileData {
  console.log('🔍 [extractTimelineData] Processing profile for timeline generation...');
  
  const companyProfile = extractCompanyProfile(profile);
  const strategicContext = extractStrategicContext(profile);
  const technicalContext = extractTechnicalContext(profile);
  const businessContext = extractBusinessContext(profile);
  const metadata = extractProfileMetadata(profile);
  
  console.log('📊 Timeline data extraction complete:', {
    companyName: companyProfile.name,
    initiativesCount: strategicContext.totalInitiatives,
    systemsCount: technicalContext.totalSystems,
    problemsCount: businessContext.totalProblems,
    completenessScore: metadata.completenessScore
  });
  
  return {
    companyProfile,
    strategicContext,
    technicalContext,
    businessContext,
    metadata
  };
}

/**
 * Extracts company profile information
 */
function extractCompanyProfile(profile: Partial<Profile>): CompanyProfile {
  return {
    name: profile.companyName || 'Unknown Company',
    industry: profile.industry || 'Unknown Industry',
    size: {
      employees: profile.employeeCount,
      revenue: profile.annualRevenue
    },
    location: profile.primaryLocation,
    website: profile.websiteUrl
  };
}

/**
 * Extracts and processes strategic initiatives
 */
function extractStrategicContext(profile: Partial<Profile>): StrategicContext {
  const initiatives = profile.strategicInitiatives || [];
  
  const processedInitiatives = initiatives.map(init => processInitiative(init));
  
  const highPriorityCount = processedInitiatives.filter(init => init.priority === 'High').length;
  const inProgressCount = processedInitiatives.filter(init => init.status === 'In Progress').length;
  const hasBusinessMetrics = processedInitiatives.some(init => 
    init.expectedOutcomes.length > 0 || init.successMetrics.length > 0 || init.budget
  );
  
  return {
    initiatives: processedInitiatives,
    totalInitiatives: initiatives.length,
    highPriorityCount,
    inProgressCount,
    hasBusinessMetrics
  };
}

/**
 * Processes a single strategic initiative
 */
function processInitiative(initiative: StrategicInitiative): ProcessedInitiative {
  const businessProblems = (initiative.businessProblems || []).filter(p => p && p.trim().length > 0);
  const expectedOutcomes = (initiative.expectedOutcomes || []).filter(o => o && o.trim().length > 0);
  const successMetrics = (initiative.successMetrics || []).filter(m => m && m.trim().length > 0);
  
  // Calculate business value summary
  let businessValue = 'Strategic initiative';
  if (expectedOutcomes.length > 0) {
    businessValue = `Expected: ${expectedOutcomes[0]}`;
    if (expectedOutcomes.length > 1) {
      businessValue += ` (+${expectedOutcomes.length - 1} more outcomes)`;
    }
  }
  if (initiative.estimatedBudget) {
    businessValue += ` | Budget: ${initiative.estimatedBudget}`;
  }
  
  return {
    name: initiative.initiative,
    priority: initiative.priority,
    status: initiative.status,
    timeline: initiative.targetTimeline,
    budget: initiative.estimatedBudget,
    contact: initiative.contact ? {
      name: initiative.contact.name,
      title: initiative.contact.title
    } : undefined,
    businessProblems,
    expectedOutcomes,
    successMetrics,
    businessValue
  };
}

/**
 * Extracts and processes technical systems context
 */
function extractTechnicalContext(profile: Partial<Profile>): TechnicalContext {
  const systems = profile.systemsAndApplications || [];
  
  const processedSystems = systems.map(sys => processSystem(sys));
  
  // Group by category
  const systemsByCategory: { [category: string]: ProcessedSystem[] } = {};
  processedSystems.forEach(system => {
    const category = system.category || 'Other';
    if (!systemsByCategory[category]) {
      systemsByCategory[category] = [];
    }
    systemsByCategory[category].push(system);
  });
  
  const criticalSystemsCount = processedSystems.filter(sys => sys.criticality === 'High').length;
  
  // Determine if they have modern tech stack
  const modernTechCategories = ['Cloud Platform', 'Analytics', 'API', 'DevOps'];
  const hasModernTech = Object.keys(systemsByCategory).some(category => 
    modernTechCategories.includes(category)
  );
  
  return {
    systems: processedSystems,
    systemsByCategory,
    totalSystems: systems.length,
    criticalSystemsCount,
    hasModernTech
  };
}

/**
 * Processes a single system/application
 */
function processSystem(system: SystemApplication): ProcessedSystem {
  return {
    name: system.name,
    category: system.category || 'Other',
    vendor: system.vendor,
    criticality: system.criticality,
    description: system.description
  };
}

/**
 * Extracts business context including problems and opportunities
 */
function extractBusinessContext(profile: Partial<Profile>): BusinessContext {
  const initiatives = profile.strategicInitiatives || [];
  
  const allBusinessProblems: string[] = [];
  const problemsByInitiative: { [initiative: string]: string[] } = {};
  
  initiatives.forEach(initiative => {
    const problems = (initiative.businessProblems || []).filter(p => p && p.trim().length > 0);
    problemsByInitiative[initiative.initiative] = problems;
    allBusinessProblems.push(...problems);
  });
  
  // Identify key pain points (problems mentioned multiple times or in high-priority initiatives)
  const keyPainPoints = identifyKeyPainPoints(allBusinessProblems, initiatives);
  
  // Identify opportunity areas based on problems and systems
  const opportunityAreas = identifyOpportunityAreas(allBusinessProblems, profile.systemsAndApplications || []);
  
  return {
    allBusinessProblems,
    problemsByInitiative,
    totalProblems: allBusinessProblems.length,
    keyPainPoints,
    opportunityAreas
  };
}

/**
 * Identifies key pain points from business problems
 */
function identifyKeyPainPoints(problems: string[], initiatives: StrategicInitiative[]): string[] {
  const keyPainPoints: string[] = [];
  
  // Get problems from high-priority initiatives
  const highPriorityProblems = initiatives
    .filter(init => init.priority === 'High')
    .flatMap(init => init.businessProblems || [])
    .filter(p => p && p.trim().length > 0);
  
  keyPainPoints.push(...highPriorityProblems);
  
  // Find common problem themes
  const problemThemes = analyzeProblemsForThemes(problems);
  keyPainPoints.push(...problemThemes);
  
  // Remove duplicates and limit to top 5
  return [...new Set(keyPainPoints)].slice(0, 5);
}

/**
 * Analyzes problems to identify common themes
 */
function analyzeProblemsForThemes(problems: string[]): string[] {
  const themes: string[] = [];
  const problemsLower = problems.map(p => p.toLowerCase());
  
  const commonThemes = [
    { keywords: ['manual', 'automation', 'process'], theme: 'Manual processes need automation' },
    { keywords: ['efficiency', 'slow', 'time'], theme: 'Operational efficiency challenges' },
    { keywords: ['data', 'information', 'reporting'], theme: 'Data and reporting issues' },
    { keywords: ['cost', 'expense', 'budget'], theme: 'Cost management concerns' },
    { keywords: ['customer', 'client', 'service'], theme: 'Customer experience challenges' },
    { keywords: ['communication', 'collaboration', 'coordination'], theme: 'Communication and collaboration gaps' }
  ];
  
  for (const themeData of commonThemes) {
    const matchingProblems = problemsLower.filter(problem => 
      themeData.keywords.some(keyword => problem.includes(keyword))
    );
    
    if (matchingProblems.length >= 2) {
      themes.push(themeData.theme);
    }
  }
  
  return themes;
}

/**
 * Identifies opportunity areas based on problems and systems
 */
function identifyOpportunityAreas(problems: string[], systems: SystemApplication[]): string[] {
  const opportunities: string[] = [];
  const problemsText = problems.join(' ').toLowerCase();
  const systemCategories = systems.map(s => s.category.toLowerCase());
  
  // Process automation opportunities
  if (problemsText.includes('manual') || problemsText.includes('repetitive')) {
    opportunities.push('Process Automation');
  }
  
  // Analytics opportunities
  if (problemsText.includes('data') || problemsText.includes('reporting') || systemCategories.includes('database')) {
    opportunities.push('Data Analytics & Intelligence');
  }
  
  // Customer experience opportunities
  if (problemsText.includes('customer') || systemCategories.includes('crm')) {
    opportunities.push('Customer Experience Enhancement');
  }
  
  // Integration opportunities
  if (systems.length > 3 && !systemCategories.includes('api')) {
    opportunities.push('System Integration & Orchestration');
  }
  
  // Decision support opportunities
  if (problemsText.includes('decision') || problemsText.includes('choice') || problemsText.includes('planning')) {
    opportunities.push('Decision Support Systems');
  }
  
  return opportunities;
}

/**
 * Extracts profile metadata for timeline generation assessment
 */
function extractProfileMetadata(profile: Partial<Profile>): ProfileMetadata {
  const summary = extractProfileDataSummary(profile);
  
  const missingCriticalData: string[] = [];
  const recommendations: string[] = [];
  
  // Check for missing critical data
  if (!profile.companyName) missingCriticalData.push('Company name');
  if (!profile.industry) missingCriticalData.push('Industry');
  if (!profile.strategicInitiatives || profile.strategicInitiatives.length === 0) {
    missingCriticalData.push('Strategic initiatives');
  }
  
  // Check business problems
  if (summary.businessProblemsCount === 0) {
    missingCriticalData.push('Business problems');
    recommendations.push('Add specific business problems to strategic initiatives for targeted timeline recommendations');
  }
  
  // Check systems
  if (summary.systemsCount === 0) {
    recommendations.push('Add current systems information for better integration planning');
  }
  
  // Check business metrics
  if (!summary.hasBusinessMetrics) {
    recommendations.push('Add expected outcomes, success metrics, or budget information for ROI projections');
  }
  
  // Calculate data quality
  let dataQuality: 'High' | 'Medium' | 'Low' = 'Low';
  if (missingCriticalData.length === 0 && summary.businessProblemsCount > 0) {
    dataQuality = summary.hasBusinessMetrics ? 'High' : 'Medium';
  } else if (missingCriticalData.length <= 1) {
    dataQuality = 'Medium';
  }
  
  // Calculate completeness score (reuse from validation)
  const completenessScore = calculateTimelineCompletenessScore(summary);
  
  return {
    completenessScore,
    dataQuality,
    timelineReadiness: missingCriticalData.length === 0 && completenessScore >= 60,
    missingCriticalData,
    recommendations
  };
}

/**
 * Calculates timeline-specific completeness score
 */
function calculateTimelineCompletenessScore(summary: ProfileDataSummary): number {
  let score = 0;
  
  // Essential fields (50 points)
  if (summary.companyName !== 'Unknown') score += 15;
  if (summary.industry !== 'Unknown') score += 15;
  if (summary.strategicInitiativesCount > 0) score += 20;
  
  // Business context (30 points)
  if (summary.businessProblemsCount > 0) score += 15;
  if (summary.hasContactInfo) score += 8;
  if (summary.hasBusinessMetrics) score += 7;
  
  // Company size context (10 points)
  if (summary.employeeCount) score += 5;
  if (summary.systemsCount > 0) score += 5;
  
  // Bonus for comprehensive data (10 points)
  if (summary.strategicInitiativesCount >= 3) score += 5;
  if (summary.businessProblemsCount >= 5) score += 5;
  
  return Math.min(score, 100);
}

/**
 * Converts timeline data back to a format suitable for prompts
 */
export function formatTimelineDataForPrompt(timelineData: TimelineProfileData): string {
  const { companyProfile, strategicContext, technicalContext, businessContext } = timelineData;
  
  const sections: string[] = [];
  
  // Company overview
  sections.push(`**COMPANY:** ${companyProfile.name} (${companyProfile.industry})`);
  if (companyProfile.size.employees) {
    sections.push(`**SIZE:** ${companyProfile.size.employees} employees`);
  }
  if (companyProfile.size.revenue) {
    sections.push(`**REVENUE:** ${companyProfile.size.revenue}`);
  }
  
  // Strategic initiatives
  if (strategicContext.totalInitiatives > 0) {
    sections.push(`\n**STRATEGIC INITIATIVES (${strategicContext.totalInitiatives}):**`);
    strategicContext.initiatives.forEach((init, index) => {
      sections.push(`${index + 1}. ${init.name} [${init.priority || 'No priority'}] [${init.status || 'No status'}]`);
      if (init.businessProblems.length > 0) {
        sections.push(`   Problems: ${init.businessProblems.join(', ')}`);
      }
      if (init.expectedOutcomes.length > 0) {
        sections.push(`   Expected: ${init.expectedOutcomes.join(', ')}`);
      }
    });
  }
  
  // Business problems summary
  if (businessContext.totalProblems > 0) {
    sections.push(`\n**KEY BUSINESS PROBLEMS (${businessContext.totalProblems}):**`);
    businessContext.keyPainPoints.forEach(problem => {
      sections.push(`• ${problem}`);
    });
  }
  
  // Technology context
  if (technicalContext.totalSystems > 0) {
    sections.push(`\n**TECHNOLOGY SYSTEMS (${technicalContext.totalSystems}):**`);
    Object.keys(technicalContext.systemsByCategory).forEach(category => {
      const systems = technicalContext.systemsByCategory[category];
      sections.push(`${category}: ${systems.map(s => s.name).join(', ')}`);
    });
  }
  
  return sections.join('\n');
} 