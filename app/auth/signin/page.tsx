'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '../../store/useAuthStore';
import GlobalHeader from '../../components/GlobalHeader';
import { LogIn, Mail, Lock, Zap, ArrowLeft } from 'lucide-react';
import styles from '../Auth.module.css';

type AuthMode = 'password' | 'magic-link';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, signInWithMagicLink, user, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [authMode, setAuthMode] = useState<AuthMode>('password');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      // Get the redirect parameter from URL, or default to dashboard
      const redirectUrl = searchParams.get('redirect') || '/';
      router.push(redirectUrl);
    }
  }, [user, router, searchParams]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const result = await signIn(formData.email, formData.password);
      if(result.error) setError(result.error);
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMagicLinkSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');
    try {
      const result = await signInWithMagicLink(formData.email);
      if(result.error) {
        setError(result.error);
      } else {
        setSuccessMessage('Magic link sent! Check your email and click the link to sign in.');
      }
    } catch (err: any) {
      console.error('Magic link error:', err);
      setError(err.message || 'An unexpected error occurred.');
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
          <div className={styles.header}>
            <div className={`${styles.headerIcon} ${styles.signin}`}>
              <LogIn size={24} color="white" />
            </div>
            
            <h1 className={styles.title}>Welcome Back</h1>
            
            <p className={styles.subtitle}>
              Sign in to access your client profiles and AI timelines
            </p>
          </div>

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

          {successMessage && (
            <div className={`${styles.message} ${styles.success}`}>
              <Mail size={16} />
              {successMessage}
            </div>
          )}

          {error && (
            <div className={`${styles.message} ${styles.error}`}>
              {error}
            </div>
          )}

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