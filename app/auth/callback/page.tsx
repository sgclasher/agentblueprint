'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type AuthStatus = 'loading' | 'success' | 'error';

export default function AuthCallback() {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [message, setMessage] = useState<string>('Processing authentication...');
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const errorParam = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        if (errorParam) {
          setStatus('error');
          setMessage(errorDescription || 'Authentication failed');
          return;
        }

        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            setStatus('error');
            setMessage(error.message || 'Failed to authenticate');
            return;
          }

          if (data.session) {
            setStatus('success');
            setMessage('Authentication successful! Redirecting...');
            
            setTimeout(() => {
              router.push('/');
            }, 2000);
            return;
          }
        }

        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            setStatus('error');
            setMessage(error.message || 'Failed to set session');
            return;
          }

          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          setTimeout(() => {
            router.push('/');
          }, 2000);
          return;
        }

        setStatus('error');
        setMessage('No authentication data found in URL');
        
      } catch (err: any) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setMessage('An unexpected error occurred');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-2xl max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Processing Authentication</h2>
            <p className="text-gray-400">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Authentication Successful!</h2>
            <p className="text-gray-400 mb-4">{message}</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse w-full"></div>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Authentication Failed</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
} 