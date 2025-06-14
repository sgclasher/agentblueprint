import React from 'react';
import { checkEnvVars } from './env-check';

// Client-side debug component
export function EnvDebugger(): JSX.Element | null {
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