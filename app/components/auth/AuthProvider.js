'use client';

import { useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore';

export default function AuthProvider({ children }) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    // Initialize authentication state when the app loads
    initialize();
  }, [initialize]);

  return children;
} 