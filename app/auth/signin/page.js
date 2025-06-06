'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/useAuthStore';
import GlobalHeader from '../../components/GlobalHeader';
import { LogIn, Mail, Lock, Zap, ArrowLeft } from 'lucide-react';
import styles from '../Auth.module.css';

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
      
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          {/* Header */}
          <div className={styles.header}>
            <div className={`${styles.headerIcon} ${styles.signin}`}>
              <LogIn size={24} color="white" />
            </div>
            
            <h1 className={styles.title}>Welcome Back</h1>
            
            <p className={styles.subtitle}>
              Sign in to access your client profiles and AI timelines
            </p>
          </div>

          {/* Auth Mode Toggle */}
          <div className={styles.authToggle}>
            <button
              type="button"
              onClick={() => setAuthMode('password')}
              className={`${styles.toggleButton} ${authMode === 'password' ? styles.active : ''}`}
            >
              <Lock size={16} />
              Password
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('magic-link')}
              className={`${styles.toggleButton} ${authMode === 'magic-link' ? styles.active : ''}`}
            >
              <Zap size={16} />
              Magic Link
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className={`${styles.message} ${styles.success}`}>
              <Mail size={16} />
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={`${styles.message} ${styles.error}`}>
              {error}
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
                className={styles.input}
              />
            </div>

            {authMode === 'password' && (
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={authMode === 'password'}
                  placeholder="Enter your password"
                  className={styles.input}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLoading || (!formData.email || (authMode === 'password' && !formData.password))}
              className={`btn btn-primary ${styles.submitButton}`}
            >
              {isSubmitting || isLoading ? (
                <>
                  <div className={styles.loader}></div>
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
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Don't have an account?{' '}
              <a 
                href="/auth/signup" 
                className={styles.footerLink}
              >
                Sign up here
              </a>
            </p>
            
            <button
              type="button"
              onClick={() => router.push('/')}
              className={styles.backButton}
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