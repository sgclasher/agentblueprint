'use client';

import { useState } from 'react';
import { Users, TrendingUp, LogIn } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import UserMenu from './auth/UserMenu';
import AuthModal from './auth/AuthModal';

export default function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { isAuthenticated, isLoading } = useAuthStore();

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header 
        style={{
          width: '100%',
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgb(55, 65, 81)',
          position: 'relative',
          zIndex: 40
        }}
        className="auth-header"
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            {/* Logo and Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#2563eb',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>AI</span>
                </div>
                <h1 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  margin: 0
                }}>
                  Agentic AI Flow
                </h1>
              </div>
            </div>

            {/* Navigation */}
            <nav style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px'
            }} className="hidden-mobile">
              <a
                href="/"
                style={{
                  color: '#d1d5db',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#d1d5db';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                ServiceNow Flows
              </a>
              <a
                href="/timeline"
                style={{
                  color: '#d1d5db',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#d1d5db';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <TrendingUp style={{ width: '16px', height: '16px' }} />
                <span>AI Timeline</span>
              </a>
              <a
                href="/profiles"
                style={{
                  color: '#d1d5db',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#d1d5db';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <Users style={{ width: '16px', height: '16px' }} />
                <span>Client Profiles</span>
              </a>
            </nav>

            {/* Authentication */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {isLoading ? (
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#374151',
                  borderRadius: '50%',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }} />
              ) : isAuthenticated ? (
                <UserMenu />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleAuthClick('login')}
                    style={{
                      color: '#d1d5db',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'white';
                      e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#d1d5db';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#1d4ed8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#2563eb';
                    }}
                  >
                    <LogIn style={{ width: '16px', height: '16px' }} />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div style={{
          display: 'none',
          borderTop: '1px solid rgb(55, 65, 81)'
        }} className="mobile-nav">
          <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a
              href="/"
              style={{
                display: 'block',
                color: '#d1d5db',
                padding: '8px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              ServiceNow Flows
            </a>
            <a
              href="/timeline"
              style={{
                display: 'block',
                color: '#d1d5db',
                padding: '8px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              AI Timeline
            </a>
            <a
              href="/profiles"
              style={{
                display: 'block',
                color: '#d1d5db',
                padding: '8px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Client Profiles
            </a>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
} 