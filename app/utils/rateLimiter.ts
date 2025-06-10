// Simple in-memory rate limiter for model refresh functionality
// Prevents abuse while not being too restrictive

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Rate limit configuration
const RATE_LIMIT_CONFIG = {
  maxRequests: 10, // 10 requests per window
  windowMs: 5 * 60 * 1000, // 5 minutes
};

export interface RateLimitResult {
  allowed: boolean;
  resetTime?: number;
  remaining?: number;
}

/**
 * Check if a request is within rate limits
 * @param identifier - Unique identifier for the rate limit (e.g., IP address)
 * @returns Rate limit result
 */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Clean up expired entries periodically
  if (Math.random() < 0.1) { // 10% chance to clean up
    cleanupExpiredEntries(now);
  }

  if (!entry || now > entry.resetTime) {
    // First request or window expired, create new entry
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + RATE_LIMIT_CONFIG.windowMs,
    };
    rateLimitStore.set(identifier, newEntry);
    
    return {
      allowed: true,
      remaining: RATE_LIMIT_CONFIG.maxRequests - 1,
    };
  }

  if (entry.count >= RATE_LIMIT_CONFIG.maxRequests) {
    // Rate limit exceeded
    return {
      allowed: false,
      resetTime: entry.resetTime,
    };
  }

  // Increment count and allow request
  entry.count += 1;
  rateLimitStore.set(identifier, entry);

  return {
    allowed: true,
    remaining: RATE_LIMIT_CONFIG.maxRequests - entry.count,
  };
}

/**
 * Clean up expired rate limit entries to prevent memory leaks
 */
function cleanupExpiredEntries(now: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

/**
 * Get client identifier from request (IP address or fallback)
 */
export function getClientIdentifier(request: Request): string {
  // Try to get real IP from various headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = request.headers.get('x-client-ip');
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  if (clientIP) {
    return clientIP;
  }
  
  // Fallback to a generic identifier
  return 'unknown-client';
} 