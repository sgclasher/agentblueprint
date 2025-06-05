'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/useAuthStore';
import GlobalHeader from '../../components/GlobalHeader';
import { UserPlus, Mail, Lock, User, ArrowLeft } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, user, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

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
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await signUp(formData.email, formData.password);
      setSuccessMessage('Account created! Please check your email to confirm your account.');
    } catch (err) {
      console.error('Sign up error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              backgroundColor: 'var(--accent-green)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto var(--spacing-md)'
            }}>
              <UserPlus size={24} color="white" />
            </div>
            
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-sm) 0'
            }}>Create Account</h1>
            
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.95rem'
            }}>
              Join us to manage client profiles and generate AI transformation timelines
            </p>
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

          {/* Sign Up Form */}
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
                  border: `1px solid ${validationErrors.email ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                  borderRadius: 'var(--border-radius)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  transition: 'border-color var(--transition-fast) ease'
                }}
                onFocus={(e) => !validationErrors.email && (e.target.style.borderColor = 'var(--accent-blue)')}
                onBlur={(e) => !validationErrors.email && (e.target.style.borderColor = 'var(--border-primary)')}
              />
              {validationErrors.email && (
                <span style={{
                  color: 'var(--accent-red)',
                  fontSize: '0.8rem',
                  marginTop: 'var(--spacing-xs)',
                  display: 'block'
                }}>
                  {validationErrors.email}
                </span>
              )}
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
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
                required
                placeholder="Create a password (min. 6 characters)"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  background: 'var(--bg-secondary)',
                  border: `1px solid ${validationErrors.password ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                  borderRadius: 'var(--border-radius)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  transition: 'border-color var(--transition-fast) ease'
                }}
                onFocus={(e) => !validationErrors.password && (e.target.style.borderColor = 'var(--accent-blue)')}
                onBlur={(e) => !validationErrors.password && (e.target.style.borderColor = 'var(--border-primary)')}
              />
              {validationErrors.password && (
                <span style={{
                  color: 'var(--accent-red)',
                  fontSize: '0.8rem',
                  marginTop: 'var(--spacing-xs)',
                  display: 'block'
                }}>
                  {validationErrors.password}
                </span>
              )}
            </div>

            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label style={{
                display: 'block',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-sm)',
                fontSize: '0.9rem'
              }}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  background: 'var(--bg-secondary)',
                  border: `1px solid ${validationErrors.confirmPassword ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                  borderRadius: 'var(--border-radius)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  transition: 'border-color var(--transition-fast) ease'
                }}
                onFocus={(e) => !validationErrors.confirmPassword && (e.target.style.borderColor = 'var(--accent-blue)')}
                onBlur={(e) => !validationErrors.confirmPassword && (e.target.style.borderColor = 'var(--border-primary)')}
              />
              {validationErrors.confirmPassword && (
                <span style={{
                  color: 'var(--accent-red)',
                  fontSize: '0.8rem',
                  marginTop: 'var(--spacing-xs)',
                  display: 'block'
                }}>
                  {validationErrors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="btn btn-primary"
              style={{
                width: '100%',
                marginBottom: 'var(--spacing-lg)',
                justifyContent: 'center',
                background: 'var(--accent-green)'
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
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
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
              Already have an account?{' '}
              <a 
                href="/auth/signin" 
                style={{ 
                  color: 'var(--accent-blue)', 
                  textDecoration: 'none',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                Sign in here
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