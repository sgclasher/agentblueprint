'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/useAuthStore';
import GlobalHeader from '../../components/GlobalHeader';
import { LogIn, Mail, Lock, Zap, ArrowLeft } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, signInWithOtp, user, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [authMode, setAuthMode] = useState('password'); // 'password' or 'magic-link'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if already signed in
  useEffect(() => {
    if (user) {
      router.push('/profiles');
    }
  }, [user, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSignIn = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    setIsSubmitting(true);
    try {
      await signIn(formData.email, formData.password);
      // Success will be handled by the useEffect above
    } catch (err) {
      console.error('Sign in error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMagicLinkSignIn = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    try {
      await signInWithOtp(formData.email);
      setSuccessMessage('Magic link sent! Check your email and click the link to sign in.');
    } catch (err) {
      console.error('Magic link error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = authMode === 'password' ? handlePasswordSignIn : handleMagicLinkSignIn;

  return (
    <div style={{ minHeight: '100vh' }}>
      <GlobalHeader />
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: 'var(--spacing-lg)',
        background: 'var(--bg-primary)'
      }}>
        <div style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--backdrop-blur))',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--border-radius-xl)',
          padding: 'var(--spacing-xxl)',
          width: '100%',
          maxWidth: '400px',
          boxShadow: 'var(--shadow-xl)'
        }}>
          {/* Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 'var(--spacing-xl)'
          }}>
            <div style={{
              backgroundColor: 'var(--accent-blue)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto var(--spacing-md)'
            }}>
              <LogIn size={24} color="white" />
            </div>
            
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-sm) 0'
            }}>Welcome Back</h1>
            
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem'
            }}>
              Sign in to access your client profiles and AI timelines
            </p>
          </div>

          {/* Auth Mode Toggle */}
          <div style={{
            display: 'flex',
            marginBottom: 'var(--spacing-lg)',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--border-radius)',
            padding: '4px'
          }}>
            <button
              type="button"
              onClick={() => setAuthMode('password')}
              style={{
                flex: 1,
                padding: 'var(--spacing-sm) var(--spacing-md)',
                background: authMode === 'password' ? 'var(--accent-blue)' : 'transparent',
                color: authMode === 'password' ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '0.875rem',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast) ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-xs)'
              }}
            >
              <Lock size={16} />
              Password
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('magic-link')}
              style={{
                flex: 1,
                padding: 'var(--spacing-sm) var(--spacing-md)',
                background: authMode === 'magic-link' ? 'var(--accent-blue)' : 'transparent',
                color: authMode === 'magic-link' ? 'white' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: 'var(--border-radius-sm)',
                fontSize: '0.875rem',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast) ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-xs)'
              }}
            >
              <Zap size={16} />
              Magic Link
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              color: 'var(--accent-green)',
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--border-radius)',
              marginBottom: 'var(--spacing-lg)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)'
            }}>
              <Mail size={16} />
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--accent-red)',
              padding: 'var(--spacing-md)',
              borderRadius: 'var(--border-radius)',
              marginBottom: 'var(--spacing-lg)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{
                display: 'block',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '0.9rem'
              }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--border-radius)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  transition: 'border-color var(--transition-fast) ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-primary)'}
              />
            </div>

            {authMode === 'password' && (
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{
                  display: 'block',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--spacing-sm)',
                  fontSize: '0.9rem'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={authMode === 'password'}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--border-radius)',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    transition: 'border-color var(--transition-fast) ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-blue)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-primary)'}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLoading || (!formData.email || (authMode === 'password' && !formData.password))}
              className="btn btn-primary"
              style={{
                width: '100%',
                marginBottom: 'var(--spacing-lg)',
                justifyContent: 'center'
              }}
            >
              {isSubmitting || isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid currentColor',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: 'var(--spacing-sm)'
                  }}></div>
                  {authMode === 'password' ? 'Signing In...' : 'Sending Magic Link...'}
                </>
              ) : (
                <>
                  {authMode === 'password' ? <LogIn size={18} /> : <Zap size={18} />}
                  {authMode === 'password' ? 'Sign In' : 'Send Magic Link'}
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            paddingTop: 'var(--spacing-lg)',
            borderTop: '1px solid var(--border-secondary)'
          }}>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              marginBottom: 'var(--spacing-md)'
            }}>
              Don't have an account?{' '}
              <a 
                href="/auth/signup" 
                style={{ 
                  color: 'var(--accent-blue)', 
                  textDecoration: 'none',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Sign up here
              </a>
            </p>
            
            <button
              type="button"
              onClick={() => router.push('/')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                margin: '0 auto',
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--border-radius)',
                transition: 'color var(--transition-fast) ease'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--text-secondary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              <ArrowLeft size={14} />
              Back to App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 