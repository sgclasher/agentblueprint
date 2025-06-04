/**
 * Environment Variable Checker
 * Quick diagnostic tool to check if Supabase is properly configured
 */

export function checkEnvVars() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasEncryptionKey: !!process.env.ENCRYPTION_KEY,
  };

  const issues = [];

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

// Client-side debug component
export function EnvDebugger() {
  if (typeof window === 'undefined') return null;

  const result = checkEnvVars();

  if (result.isValid) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#fee2e2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '14px',
      zIndex: 9999,
      maxWidth: '400px'
    }}>
      <strong>Supabase Configuration Issues:</strong>
      <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
        {result.issues.map((issue, i) => (
          <li key={i}>{issue}</li>
        ))}
      </ul>
      <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
        Check your .env.local file and restart the dev server.
      </p>
    </div>
  );
} 