/**
 * Input validation utilities for API endpoints
 */

interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitized?: string;
}

interface ProfileValidationResult {
  isValid: boolean;
  errors: string[];
  sanitized?: BusinessProfile;
}

interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number;
}

export interface BusinessProfile {
    companyName: string;
    industry: string;
    companySize: string;
    aiMaturityLevel: string;
    primaryGoals: string[];
    currentTechStack?: string[];
    budget?: string;
    timeframe?: string;
    currentChallenges?: string;
}

/**
 * Validate ServiceNow instance URL
 * @param {string} url - The URL to validate
 * @returns {ValidationResult}
 */
export function validateInstanceUrl(url: string | null | undefined): ValidationResult {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'Instance URL is required' };
  }

  const trimmed = url.trim();
  
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Instance URL cannot be empty' };
  }

  if (trimmed.length > 500) {
    return { isValid: false, error: 'Instance URL is too long' };
  }

  // Sanitize and format URL
  let sanitized = trimmed;
  
  // Add https if no protocol specified
  if (!sanitized.match(/^https?:\/\//)) {
    sanitized = 'https://' + sanitized;
  }
  
  // Remove trailing slash
  if (sanitized.endsWith('/')) {
    sanitized = sanitized.slice(0, -1);
  }

  // Validate URL format
  try {
    const urlObj = new URL(sanitized);
    
    // Ensure it's HTTPS for security
    if (urlObj.protocol !== 'https:') {
      return { isValid: false, error: 'Only HTTPS URLs are allowed' };
    }
    
    // Basic ServiceNow domain validation
    if (!urlObj.hostname.includes('.service-now.com') && 
        !urlObj.hostname.includes('.servicenow.com') &&
        !urlObj.hostname.match(/^[\\w-]+\\.servicenowservices\\.com$/)) {
      return { isValid: false, error: 'Invalid ServiceNow domain' };
    }
    
    return { isValid: true, sanitized: urlObj.origin };
  } catch (error) {
    return { isValid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validate ServiceNow scope ID (sys_id)
 * @param {string} scopeId - The scope ID to validate
 * @returns {ValidationResult}
 */
export function validateScopeId(scopeId: string | null | undefined): ValidationResult {
  if (!scopeId || typeof scopeId !== 'string') {
    return { isValid: false, error: 'Scope ID is required' };
  }

  const trimmed = scopeId.trim();
  
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Scope ID cannot be empty' };
  }

  // ServiceNow sys_id is 32 characters long (UUID without dashes)
  const sysIdPattern = /^[a-f0-9]{32}$/i;
  
  // Also allow UUIDs with dashes
  const uuidPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
  
  if (!sysIdPattern.test(trimmed) && !uuidPattern.test(trimmed)) {
    return { isValid: false, error: 'Invalid scope ID format (must be 32 hex characters or UUID)' };
  }

  // Normalize to 32-character format
  const sanitized = trimmed.replace(/-/g, '').toLowerCase();
  
  return { isValid: true, sanitized };
}

/**
 * Validate business profile data
 * @param {any} profile - The profile to validate
 * @returns {ProfileValidationResult}
 */
export function validateBusinessProfile(profile: any): ProfileValidationResult {
  const errors: string[] = [];
  const sanitized: Partial<BusinessProfile> = {};

  if (!profile || typeof profile !== 'object') {
    return { isValid: false, errors: ['Profile data is required'] };
  }

  // Company name validation
  if (!profile.companyName || typeof profile.companyName !== 'string') {
    errors.push('Company name is required');
  } else {
    const trimmed = profile.companyName.trim();
    if (trimmed.length === 0) {
      errors.push('Company name cannot be empty');
    } else if (trimmed.length > 200) {
      errors.push('Company name is too long (max 200 characters)');
    } else {
      sanitized.companyName = trimmed;
    }
  }

  // Industry validation
  const validIndustries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 
    'Retail', 'Education', 'Real Estate', 'Transportation', 
    'Energy', 'Other'
  ];
  
  if (!profile.industry || !validIndustries.includes(profile.industry)) {
    errors.push('Valid industry selection is required');
  } else {
    sanitized.industry = profile.industry;
  }

  // Company size validation
  const validSizes = ['startup', 'small', 'medium', 'large'];
  
  if (!profile.companySize || !validSizes.includes(profile.companySize)) {
    errors.push('Valid company size is required');
  } else {
    sanitized.companySize = profile.companySize;
  }

  // AI maturity level validation
  const validMaturityLevels = ['beginner', 'emerging', 'developing', 'advanced'];
  
  if (!profile.aiMaturityLevel || !validMaturityLevels.includes(profile.aiMaturityLevel)) {
    errors.push('Valid AI maturity level is required');
  } else {
    sanitized.aiMaturityLevel = profile.aiMaturityLevel;
  }

  // Primary goals validation (array)
  if (!Array.isArray(profile.primaryGoals)) {
    errors.push('Primary goals must be an array');
  } else if (profile.primaryGoals.length === 0) {
    errors.push('At least one primary goal is required');
  } else if (profile.primaryGoals.length > 10) {
    errors.push('Too many primary goals selected (max 10)');
  } else {
    sanitized.primaryGoals = profile.primaryGoals.filter((goal: any) => 
      typeof goal === 'string' && goal.trim().length > 0
    );
  }

  // Optional fields
  if (profile.currentTechStack && Array.isArray(profile.currentTechStack)) {
    sanitized.currentTechStack = profile.currentTechStack.filter((tech: any) => 
      typeof tech === 'string' && tech.trim().length > 0
    );
  }

  if (profile.budget && typeof profile.budget === 'string') {
    sanitized.budget = profile.budget.trim();
  }

  if (profile.timeframe && typeof profile.timeframe === 'string') {
    sanitized.timeframe = profile.timeframe.trim();
  }

  if (profile.currentChallenges && typeof profile.currentChallenges === 'string') {
    const trimmed = profile.currentChallenges.trim();
    if (trimmed.length <= 2000) { // Reasonable limit
      sanitized.currentChallenges = trimmed;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? (sanitized as BusinessProfile) : undefined
  };
}

/**
 * Validate scenario type
 * @param {string} scenarioType - The scenario type to validate
 * @returns {ValidationResult}
 */
export function validateScenarioType(scenarioType: string | null | undefined): ValidationResult {
  const validScenarios = ['conservative', 'balanced', 'aggressive'];
  
  if (!scenarioType || typeof scenarioType !== 'string') {
    return { isValid: true, sanitized: 'balanced' }; // Default
  }

  const trimmed = scenarioType.trim().toLowerCase();
  
  if (!validScenarios.includes(trimmed)) {
    return { isValid: false, error: 'Invalid scenario type' };
  }

  return { isValid: true, sanitized: trimmed };
}

/**
 * General purpose string sanitization
 * @param {string} input - String to sanitize
 * @param {number} maxLength - Maximum length allowed
 * @returns {string} Sanitized string
 */
export function sanitizeString(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input.trim().slice(0, maxLength);
}

import { supabase } from '../lib/supabase';

/**
 * Rate limiting helper (simple in-memory implementation)
 */
export async function checkRateLimit(identifier: string, maxRequests: number = 10, windowMs: number = 60000): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStart = new Date(now - windowMs);

  try {
    // Get recent requests from the database
    const { data: recentRequests, error: selectError } = await supabase
      .from('rate_limit_requests')
      .select('created_at', { count: 'exact' })
      .eq('identifier', identifier)
      .gte('created_at', windowStart.toISOString());

    if (selectError) {
      console.error('Rate limit select error:', selectError);
      // Fail open to not block users
      return { allowed: true };
    }
    
    if (recentRequests && recentRequests.length >= maxRequests) {
      const firstRequestTime = new Date(recentRequests[0].created_at).getTime();
      const retryAfter = Math.ceil((firstRequestTime + windowMs - now) / 1000);
      return { allowed: false, retryAfter };
    }

    // Insert new request
    const { error: insertError } = await supabase
      .from('rate_limit_requests')
      .insert({ identifier });

    if (insertError) {
      console.error('Rate limit insert error:', insertError);
      // Fail open
      return { allowed: true };
    }

    return { allowed: true };

  } catch (error) {
    console.error('Rate limit check failed:', error);
    // Fail open in case of unexpected errors
    return { allowed: true };
  }
} 