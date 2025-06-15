import { Profile, StrategicInitiative, SystemApplication } from '../../services/types';

interface TimelineValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  completenessScore: number;  // 0-100
  recommendations: string[];
}

export interface ProfileDataSummary {
  companyName: string;
  industry: string;
  employeeCount?: string;
  strategicInitiativesCount: number;
  businessProblemsCount: number;
  systemsCount: number;
  hasContactInfo: boolean;
  hasBusinessMetrics: boolean;
}

/**
 * Validates profile data for timeline generation
 * Ensures all required fields are present and data is complete enough for meaningful timeline
 */
export function validateProfileForTimeline(profile: Partial<Profile>): TimelineValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Required fields validation
  if (!profile.companyName || profile.companyName.trim().length === 0) {
    errors.push('Company name is required for timeline generation');
  }

  if (!profile.industry || profile.industry.trim().length === 0) {
    errors.push('Industry is required for timeline generation');
  }

  // Strategic initiatives validation
  if (!profile.strategicInitiatives || profile.strategicInitiatives.length === 0) {
    errors.push('At least one strategic initiative is required for meaningful timeline generation');
  } else {
    const initiativeValidation = validateStrategicInitiatives(profile.strategicInitiatives);
    errors.push(...initiativeValidation.errors);
    warnings.push(...initiativeValidation.warnings);
    recommendations.push(...initiativeValidation.recommendations);
  }

  // Company context validation
  if (!profile.employeeCount) {
    warnings.push('Employee count not provided - timeline sizing may be generic');
    recommendations.push('Add company size information for more accurate timeline recommendations');
  }

  if (!profile.annualRevenue) {
    warnings.push('Annual revenue not provided - ROI projections may be less accurate');
    recommendations.push('Add revenue information for better financial projections');
  }

  // Systems validation (helpful but not required)
  if (!profile.systemsAndApplications || profile.systemsAndApplications.length === 0) {
    warnings.push('No systems information provided - technology recommendations may be generic');
    recommendations.push('Add current systems information for more specific technology recommendations');
  }

  // Calculate completeness score
  const completenessScore = calculateCompletenessScore(profile);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completenessScore,
    recommendations
  };
}

/**
 * Validates strategic initiatives for timeline generation
 */
function validateStrategicInitiatives(initiatives: StrategicInitiative[]): TimelineValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  let hasBusinessProblems = false;
  let hasContactInfo = false;
  let hasBusinessMetrics = false;

  initiatives.forEach((initiative, index) => {
    const initiativePrefix = `Initiative ${index + 1} (${initiative.initiative})`;

    // Validate initiative name
    if (!initiative.initiative || initiative.initiative.trim().length === 0) {
      errors.push(`${initiativePrefix}: Initiative name is required`);
    }

    // Validate business problems
    if (!initiative.businessProblems || initiative.businessProblems.length === 0) {
      warnings.push(`${initiativePrefix}: No business problems specified - timeline may be generic`);
    } else {
      hasBusinessProblems = true;
      const validProblems = initiative.businessProblems.filter(p => p && p.trim().length > 0);
      if (validProblems.length !== initiative.businessProblems.length) {
        warnings.push(`${initiativePrefix}: Some business problems are empty`);
      }
    }

    // Validate contact information
    if (initiative.contact && initiative.contact.name && initiative.contact.title) {
      hasContactInfo = true;
    } else {
      warnings.push(`${initiativePrefix}: Contact information incomplete`);
    }

    // Validate business metrics (Phase 1 fields)
    if (initiative.expectedOutcomes?.length || initiative.successMetrics?.length || 
        initiative.estimatedBudget || initiative.targetTimeline) {
      hasBusinessMetrics = true;
    }

    // Validate priority and status
    if (!initiative.priority) {
      warnings.push(`${initiativePrefix}: Priority not set - may affect timeline sequencing`);
    }

    if (!initiative.status) {
      warnings.push(`${initiativePrefix}: Status not set - may affect timeline planning`);
    }
  });

  // Overall recommendations
  if (!hasBusinessProblems) {
    recommendations.push('Add specific business problems to initiatives for more targeted timeline recommendations');
  }

  if (!hasContactInfo) {
    recommendations.push('Add contact information to initiatives for stakeholder-specific timeline planning');
  }

  if (!hasBusinessMetrics) {
    recommendations.push('Add expected outcomes, success metrics, or budget information for more accurate ROI projections');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    completenessScore: 0, // Not calculated at this level
    recommendations
  };
}

/**
 * Calculates a completeness score (0-100) for profile data quality
 */
export function calculateCompletenessScore(profile: Partial<Profile>): number {
  let score = 0;
  const maxScore = 100;

  // Essential fields (40 points)
  if (profile.companyName) score += 10;
  if (profile.industry) score += 10;
  if (profile.strategicInitiatives && profile.strategicInitiatives.length > 0) score += 20;

  // Company context (20 points)
  if (profile.employeeCount) score += 5;
  if (profile.annualRevenue) score += 5;
  if (profile.primaryLocation) score += 5;
  if (profile.websiteUrl) score += 5;

  // Strategic initiative quality (25 points)
  if (profile.strategicInitiatives) {
    const totalInitiatives = profile.strategicInitiatives.length;
    const initiativesWithProblems = profile.strategicInitiatives.filter(
      init => init.businessProblems && init.businessProblems.length > 0
    ).length;
    const initiativesWithContacts = profile.strategicInitiatives.filter(
      init => init.contact && init.contact.name
    ).length;
    const initiativesWithMetrics = profile.strategicInitiatives.filter(
      init => init.expectedOutcomes?.length || init.successMetrics?.length
    ).length;

    if (totalInitiatives > 0) {
      score += Math.round((initiativesWithProblems / totalInitiatives) * 10);
      score += Math.round((initiativesWithContacts / totalInitiatives) * 8);
      score += Math.round((initiativesWithMetrics / totalInitiatives) * 7);
    }
  }

  // Systems information (15 points)
  if (profile.systemsAndApplications && profile.systemsAndApplications.length > 0) {
    score += 10;
    const systemsWithCategories = profile.systemsAndApplications.filter(
      sys => sys.category && sys.category.trim().length > 0
    ).length;
    if (systemsWithCategories === profile.systemsAndApplications.length) {
      score += 5;
    }
  }

  return Math.min(score, maxScore);
}

/**
 * Extracts a summary of profile data for debugging and logging
 */
export function extractProfileDataSummary(profile: Partial<Profile>): ProfileDataSummary {
  const businessProblemsCount = profile.strategicInitiatives
    ?.flatMap(init => init.businessProblems || [])
    .filter(problem => problem && problem.trim().length > 0)
    .length || 0;

  const hasContactInfo = profile.strategicInitiatives
    ?.some(init => init.contact && init.contact.name) || false;

  const hasBusinessMetrics = profile.strategicInitiatives
    ?.some(init => init.expectedOutcomes?.length || init.successMetrics?.length || 
                   init.estimatedBudget || init.targetTimeline) || false;

  return {
    companyName: profile.companyName || 'Unknown',
    industry: profile.industry || 'Unknown',
    employeeCount: profile.employeeCount,
    strategicInitiativesCount: profile.strategicInitiatives?.length || 0,
    businessProblemsCount,
    systemsCount: profile.systemsAndApplications?.length || 0,
    hasContactInfo,
    hasBusinessMetrics
  };
}

/**
 * Checks if profile has sufficient data for high-quality timeline generation
 */
export function isProfileReadyForTimeline(profile: Partial<Profile>): boolean {
  const validation = validateProfileForTimeline(profile);
  return validation.isValid && validation.completenessScore >= 60;
} 