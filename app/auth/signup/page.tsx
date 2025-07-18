'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuthStore from '../../store/useAuthStore';
import GlobalHeader from '../../components/GlobalHeader';
import { UserPlus, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import styles from '../Auth.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp, user, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
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
    
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');
    try {
      const result = await signUp(formData.email, formData.password);
      if(result.error) {
        setError(result.error)
      } else {
        setSuccessMessage('Account created! Please check your email to confirm your account.');
      }
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <GlobalHeader />
      
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <div className={`${styles.headerIcon} ${styles.signup}`}>
              <UserPlus size={24} color="white" />
            </div>
            
            <h1 className={styles.title}>Create Account</h1>
            
            <p className={styles.subtitle}>
              Join us to manage client profiles and generate AI transformation timelines
            </p>
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
                className={`${styles.input} ${validationErrors.email ? styles.error : ''}`}
              />
              {validationErrors.email && (
                <span className={styles.errorText}>
                  {validationErrors.email}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Create a password (min. 6 characters)"
                className={`${styles.input} ${validationErrors.password ? styles.error : ''}`}
              />
              {validationErrors.password && (
                <span className={styles.errorText}>
                  {validationErrors.password}
                </span>
              )}
            </div>

            <div className={styles.formGroup} style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label className={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
                className={`${styles.input} ${validationErrors.confirmPassword ? styles.error : ''}`}
              />
              {validationErrors.confirmPassword && (
                <span className={styles.errorText}>
                  {validationErrors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`btn btn-primary ${styles.submitButton} ${styles.signup}`}
            >
              {isSubmitting || isLoading ? (
                <>
                  <div className={styles.loader}></div>
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

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Already have an account?{' '}
              <a 
                href="/auth/signin" 
                className={styles.footerLink}
              >
                Sign in here
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