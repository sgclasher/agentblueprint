'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import useAgenticStore from '../store/useAgenticStore';
import { useTheme } from './theme/ThemeProvider';

export default function ServiceNowConnector() {
  const { theme } = useTheme();
  const router = useRouter();
  
  const [instanceUrl, setInstanceUrl] = useState('');
  const [scopeId, setScopeId] = useState('');

  useEffect(() => {
    fetch('/api/servicenow/get-credentials')
      .then(res => res.json())
      .then(data => {
        setInstanceUrl(data.instanceUrl || '');
        setScopeId(data.scopeId || '');
      })
      .catch(() => {
      });
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAgenticData = useAgenticStore((state) => state.setAgenticData);
  const setConnectionDetails = useAgenticStore((state) => state.setConnectionDetails);

  const handleFetchData = async () => {
    setIsLoading(true);
    setError(null);

    if (!instanceUrl || !scopeId) {
      setError('Instance URL and Scope ID are required.');
      setIsLoading(false);
      return;
    }

    try {
      let formattedUrl = instanceUrl.trim();
      if (!formattedUrl.startsWith('https://') && !formattedUrl.startsWith('http://')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      if (formattedUrl.endsWith('/')) {
        formattedUrl = formattedUrl.slice(0, -1);
      }

      const connectionDetails = {
        instanceUrl: formattedUrl,
        scopeId
      };
      
      const response = await fetch('/api/servicenow/fetch-agentic-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connectionDetails),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to fetch data from ServiceNow';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          errorMessage = `${errorMessage}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setConnectionDetails(connectionDetails);
      setAgenticData(data);

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      width: '100%',
      padding: 'var(--spacing-lg)'
    }}>
      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--border-radius-xl)',
        padding: 'var(--spacing-xxl)',
        width: '100%',
        maxWidth: '500px',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <div style={{ 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
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
            marginBottom: 'var(--spacing-md)'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="white" fill="none" strokeWidth="1"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12" stroke="white" strokeWidth="1"></line>
            </svg>
          </div>
          
          <h2 style={{ 
            fontSize: '1.5rem', 
            margin: '0 0 var(--spacing-sm) 0', 
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)'
          }}>Agentic AI Visualizer</h2>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: 'var(--spacing-md)'
          }}>
            <img 
              src={theme === 'dark' ? "/images/Full Logo Dark.png" : "/images/Full Logo Light.png"}
              alt="Agent Blueprint Logo" 
              width={120} 
              height={30} 
              style={{ display: 'block' }}
            />
          </div>
          
          <p style={{ 
            fontSize: '0.9rem', 
            color: 'var(--text-secondary)', 
            margin: '0'
          }}>
            Connect to your ServiceNow instance to visualize Agentic AI flows
          </p>
        </div>
        
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label htmlFor="instanceUrl" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              fontWeight: 'var(--font-weight-medium)', 
              fontSize: '0.9rem', 
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--text-primary)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem', marginRight: 'var(--spacing-sm)' }}>
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              Instance URL
            </label>
            <input
              type="text"
              id="instanceUrl"
              value={instanceUrl}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInstanceUrl(e.target.value)}
              placeholder="your-instance.service-now.com"
              style={{ 
                width: '100%', 
                padding: 'var(--spacing-md)', 
                borderRadius: 'var(--border-radius)', 
                border: '1px solid var(--border-primary)', 
                fontSize: '0.9rem', 
                color: 'var(--text-primary)',
                background: 'var(--bg-secondary)'
              }}
            />
          </div>
          
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <label htmlFor="scopeId" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              fontWeight: 'var(--font-weight-medium)', 
              fontSize: '0.9rem', 
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--text-primary)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem', marginRight: 'var(--spacing-sm)' }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Application Scope Sys ID
            </label>
            <input
              type="text"
              id="scopeId"
              value={scopeId}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setScopeId(e.target.value)}
              placeholder="Enter the sys_id of the target scope"
              readOnly
              style={{ 
                width: '100%', 
                padding: 'var(--spacing-md)', 
                borderRadius: 'var(--border-radius)', 
                border: '1px solid var(--border-primary)', 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)',
                background: 'var(--bg-tertiary)'
              }}
            />
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            padding: 'var(--spacing-md)', 
            borderRadius: 'var(--border-radius)', 
            marginBottom: 'var(--spacing-xl)',
            border: '1px solid var(--border-secondary)'
          }}>
            <p style={{ 
              fontSize: '0.85rem', 
              color: 'var(--text-secondary)', 
              margin: '0', 
              display: 'flex', 
              alignItems: 'center'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem', marginRight: 'var(--spacing-sm)' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
              <strong>Secure Connection:</strong> Authentication is handled server-side using environment variables.
            </p>
          </div>
        </div>
        
        {error && (
          <div style={{ 
            margin: '0 0 var(--spacing-xl) 0', 
            padding: 'var(--spacing-md)', 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--accent-red)', 
            borderRadius: 'var(--border-radius)', 
            display: 'flex', 
            alignItems: 'center',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem', marginRight: 'var(--spacing-sm)' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}
        
        <button
          onClick={handleFetchData}
          disabled={isLoading}
          className="btn btn-primary"
          style={{ 
            width: '100%', 
            marginBottom: 'var(--spacing-xl)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            fontSize: '0.9rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {isLoading ? (
            <>
              <svg className="spinner" viewBox="0 0 50 50" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', animation: 'spin 1s linear infinite' }}>
                <circle className="path" cx="25" cy="25" r="20" fill="none" stroke="white" strokeWidth="5"></circle>
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }}>
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
              Connect & Visualize
            </>
          )}
        </button>
        
        <div style={{ 
          marginTop: 'var(--spacing-xl)', 
          textAlign: 'center',
          paddingTop: 'var(--spacing-xl)',
          borderTop: '1px solid var(--border-secondary)'
        }}>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.9rem', 
            marginBottom: 'var(--spacing-md)' 
          }}>
            Or explore our client intelligence tools:
          </p>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--spacing-md)', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <button
              type="button"
              onClick={() => router.push('/profiles')}
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Client Profiles
            </button>
            <button
              type="button"
              onClick={() => router.push('/timeline')}
              className="btn btn-success"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              AI Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 