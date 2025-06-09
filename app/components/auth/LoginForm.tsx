'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

interface LoginFormProps {
    onToggleMode: () => void;
    onSuccess?: () => void;
}

export default function LoginForm({ onToggleMode, onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(false);

  const { signIn, signInWithMagicLink, isLoading } = useAuthStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!useMagicLink && !password) {
      setError('Password is required');
      return;
    }

    try {
      let result;
      if (useMagicLink) {
        result = await signInWithMagicLink(email);
        if (result.success) {
          setError('Check your email for the magic link!');
          return;
        }
      } else {
        result = await signIn(email, password);
      }

      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
          </div>

          {!useMagicLink && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center">
            <input
              id="magic-link"
              type="checkbox"
              checked={useMagicLink}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUseMagicLink(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              disabled={isLoading}
            />
            <label htmlFor="magic-link" className="ml-2 text-sm text-gray-300">
              Use magic link instead
            </label>
          </div>

          {error && (
            <div className={`text-sm p-3 rounded-lg ${
              error.includes('Check your email') 
                ? 'bg-green-900/20 border border-green-800 text-green-400'
                : 'bg-red-900/20 border border-red-800 text-red-400'
            }`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>{useMagicLink ? 'Send Magic Link' : 'Sign In'}</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-blue-400 hover:text-blue-300 font-medium"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 