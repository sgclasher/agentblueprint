'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Lock, UserPlus, Loader2, User } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

interface SignupFormProps {
    onToggleMode: () => void;
    onSuccess?: () => void;
}

export default function SignupForm({ onToggleMode, onSuccess }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signUp, isLoading } = useAuthStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    try {
      const result = await signUp(formData.email, formData.password, {
        name: formData.name,
      });

      if (result.success) {
        setSuccess('Account created! Please check your email to verify your account.');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        onSuccess?.();
      } else {
        setError(result.error || 'Failed to create account');
      }
    } catch (err: any) {
      setError(`Error: ${err.message || 'An unexpected error occurred'}`);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <div className="login-card">
        <div className="login-header">
          <h2>Create Account</h2>
          <p className="login-subtitle">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">
              <User size={20} />
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <Mail size={20} />
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={20} />
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <Lock size={20} />
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {success && (
            <div style={{
              backgroundColor: '#065f46',
              border: '1px solid #059669',
              color: '#34d399',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '16px'
            }}>
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? (
              <div className="spinner">
                <svg className="path" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
                    <animate attributeName="stroke-array" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </div>
            ) : (
              <>
                <UserPlus size={20} />
                Create Account
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>
            Already have an account?{' '}
            <button
              onClick={onToggleMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#60a5fa',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 