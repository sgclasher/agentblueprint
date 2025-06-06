'use client';

import dynamic from 'next/dynamic';
import ThemeProvider from './theme/ThemeProvider';

// Dynamically import AuthProvider with SSR turned off
const AuthProvider = dynamic(() => import('./auth/AuthProvider'), {
  ssr: false,
});

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
} 