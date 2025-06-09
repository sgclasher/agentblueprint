'use client';

import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import ThemeProvider from './theme/ThemeProvider';

const AuthProvider = dynamic(() => import('./auth/AuthProvider'), {
  ssr: false,
});

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
} 