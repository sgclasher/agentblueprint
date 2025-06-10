'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from './store/useAuthStore';
import DashboardPage from './dashboard/page';

export default function Home() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, initialize } = useAuthStore();

  useEffect(() => {
    // Initialize auth on mount
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Redirect based on auth status once loading is complete
    if (!isLoading) {
      if (!isAuthenticated) {
        // User is not authenticated, redirect to sign in
        router.push('/auth/signin');
      }
      // If user is authenticated, stay on this page and show dashboard
    }
  }, [isLoading, isAuthenticated, router]);

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}>
        <div style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--backdrop-blur))',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--border-radius-xl)',
          padding: 'var(--spacing-xxl)',
          textAlign: 'center',
          maxWidth: '400px',
          boxShadow: 'var(--shadow-xl)'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--accent-blue)',
            borderTop: '3px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto var(--spacing-lg) auto'
          }}></div>
          <h2 style={{ 
            margin: '0 0 var(--spacing-sm) 0',
            fontSize: '1.25rem',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            Loading Agent Blueprint...
          </h2>
          <p style={{ 
            margin: '0',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
          }}>
            Initializing your workspace
          </p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If user is authenticated, show the dashboard
  if (isAuthenticated) {
    return <DashboardPage />;
  }

  // This shouldn't be reached due to the redirect effect, but provide fallback
  return null;
} 