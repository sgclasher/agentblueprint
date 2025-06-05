'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Database, Loader2, ExternalLink } from 'lucide-react';
import { debugSupabaseConnection } from '../../lib/debug-supabase';

export default function DatabaseSetupCheck() {
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleCheckDatabase = async () => {
    try {
      setIsChecking(true);
      setCheckResult(null);
      
      const result = await debugSupabaseConnection();
      setCheckResult(result);
    } catch (error) {
      console.error('Database check error:', error);
      setCheckResult({ 
        success: false, 
        error: 'Failed to check database connection' 
      });
    } finally {
      setIsChecking(false);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="database-setup-check">
      <button 
        className="toggle-button"
        onClick={toggleVisibility}
      >
        <Database size={16} />
        Database Setup
        {checkResult && (
          <span className={`status-indicator ${checkResult.success ? 'success' : 'error'}`}>
            {checkResult.success ? <CheckCircle size={14} /> : <XCircle size={14} />}
          </span>
        )}
      </button>
      
      {isVisible && (
        <div className="setup-panel">
          <h3>Database Setup Verification</h3>
          <p>Check if your Supabase database is properly configured for profile storage.</p>
          
          {!checkResult && (
            <button 
              className="btn btn-primary"
              onClick={handleCheckDatabase}
              disabled={isChecking}
            >
              {isChecking ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Database size={16} />
                  Check Database
                </>
              )}
            </button>
          )}
          
          {checkResult && (
            <div className={`check-result ${checkResult.success ? 'success' : 'error'}`}>
              <div className="result-header">
                {checkResult.success ? (
                  <>
                    <CheckCircle size={20} className="text-green-400" />
                    <span>Database Connected Successfully!</span>
                  </>
                ) : (
                  <>
                    <XCircle size={20} className="text-red-400" />
                    <span>Database Connection Issues</span>
                  </>
                )}
              </div>
              
              <div className="result-details">
                {checkResult.success ? (
                  <div className="success-details">
                    <p>✅ Supabase connection established</p>
                    <p>✅ Client profiles table accessible</p>
                    {checkResult.user ? (
                      <p>✅ User authenticated: {checkResult.user.email}</p>
                    ) : (
                      <p>ℹ️ Not currently authenticated (will use localStorage)</p>
                    )}
                  </div>
                ) : (
                  <div className="error-details">
                    <p>❌ {checkResult.error?.message || checkResult.error || 'Unknown error'}</p>
                    
                    <div className="setup-instructions">
                      <h4>Setup Required:</h4>
                      <ol>
                        <li>
                          Ensure your Supabase project is created and configured
                        </li>
                        <li>
                          Run the database schema from <code>app/database/schema.sql</code>
                        </li>
                        <li>
                          Verify your environment variables:
                          <ul>
                            <li><code>NEXT_PUBLIC_SUPABASE_URL</code></li>
                            <li><code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                          </ul>
                        </li>
                      </ol>
                      
                      <a 
                        href="https://github.com/yourusername/agentic-ai-flow/blob/main/SUPABASE_SETUP.md" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="setup-link"
                      >
                        <ExternalLink size={14} />
                        View Complete Setup Guide
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                className="btn btn-secondary btn-small"
                onClick={() => setCheckResult(null)}
              >
                Check Again
              </button>
            </div>
          )}
        </div>
      )}
      
      <style jsx>{`
        .database-setup-check {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        
        .toggle-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 12px;
          color: #cbd5e1;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        
        .toggle-button:hover {
          background: rgba(15, 23, 42, 1);
          border-color: rgba(148, 163, 184, 0.3);
          transform: translateY(-1px);
        }
        
        .status-indicator {
          display: flex;
          align-items: center;
        }
        
        .status-indicator.success {
          color: #10b981;
        }
        
        .status-indicator.error {
          color: #ef4444;
        }
        
        .setup-panel {
          position: absolute;
          bottom: 100%;
          right: 0;
          width: 400px;
          max-width: 90vw;
          margin-bottom: 10px;
          padding: 1.5rem;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }
        
        .setup-panel h3 {
          margin: 0 0 0.5rem 0;
          color: #f1f5f9;
          font-size: 1.1rem;
          font-weight: 600;
        }
        
        .setup-panel p {
          margin: 0 0 1rem 0;
          color: #cbd5e1;
          font-size: 0.9rem;
          line-height: 1.4;
        }
        
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          color: white;
        }
        
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        
        .btn-secondary {
          background: transparent;
          color: #94a3b8;
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        
        .btn-secondary:hover:not(:disabled) {
          background: rgba(148, 163, 184, 0.1);
          color: #cbd5e1;
        }
        
        .btn-small {
          padding: 0.5rem 0.75rem;
          font-size: 0.8rem;
        }
        
        .check-result {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 8px;
        }
        
        .check-result.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        
        .check-result.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        
        .result-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .result-details p {
          margin: 0.5rem 0;
          font-size: 0.8rem;
        }
        
        .setup-instructions {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
        }
        
        .setup-instructions h4 {
          margin: 0 0 0.5rem 0;
          color: #f1f5f9;
          font-size: 0.9rem;
        }
        
        .setup-instructions ol {
          margin: 0.5rem 0;
          padding-left: 1.2rem;
        }
        
        .setup-instructions li {
          margin: 0.3rem 0;
          font-size: 0.8rem;
          color: #cbd5e1;
        }
        
        .setup-instructions ul {
          margin: 0.25rem 0;
          padding-left: 1rem;
        }
        
        .setup-instructions code {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.1rem 0.3rem;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
        }
        
        .setup-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #60a5fa;
          text-decoration: none;
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
        
        .setup-link:hover {
          color: #93c5fd;
          text-decoration: underline;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .database-setup-check {
            bottom: 10px;
            right: 10px;
          }
          
          .setup-panel {
            width: 300px;
          }
        }
      `}</style>
    </div>
  );
} 