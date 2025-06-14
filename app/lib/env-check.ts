/**
 * Environment Variable Checker
 * Quick diagnostic tool to check if Supabase is properly configured
 */

export interface EnvVars {
  NEXT_PUBLIC_SUPABASE_URL: string | undefined;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string | undefined;
  hasEncryptionKey: boolean;
}

export interface CheckResult {
  envVars: EnvVars;
  issues: string[];
  isValid: boolean;
}

export function checkEnvVars(): CheckResult {
  const envVars: EnvVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasEncryptionKey: !!process.env.ENCRYPTION_KEY,
  };

  const issues: string[] = [];

  if (!envVars.NEXT_PUBLIC_SUPABASE_URL) {
    issues.push('NEXT_PUBLIC_SUPABASE_URL is not set');
  } else if (!envVars.NEXT_PUBLIC_SUPABASE_URL.includes('supabase.co')) {
    issues.push('NEXT_PUBLIC_SUPABASE_URL does not appear to be a valid Supabase URL');
  }

  if (!envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    issues.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  } else if (!envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY.startsWith('eyJ')) {
    issues.push('NEXT_PUBLIC_SUPABASE_ANON_KEY does not appear to be a valid JWT token');
  }

  return {
    envVars,
    issues,
    isValid: issues.length === 0
  };
} 