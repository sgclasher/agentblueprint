'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ExternalLink, Copy, Check } from 'lucide-react';

interface SetupStatus {
    hasUrl: boolean;
    hasKey: boolean;
    urlValid: boolean;
    keyValid: boolean;
    isConfigured: boolean;
    url: string | null;
    keyLength: number;
}

export default function SupabaseSetupCheck() {
  const [setupStatus, setSetupStatus] = useState<SetupStatus | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = () => {
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const urlValid = hasUrl ? (process.env.NEXT_PUBLIC_SUPABASE_URL!.includes('supabase.co') || process.env.NEXT_PUBLIC_SUPABASE_URL!.includes('supabase.com')) : false;
    const keyValid = hasKey ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.startsWith('eyJ') : false;

    setSetupStatus({
      hasUrl,
      hasKey,
      urlValid,
      keyValid,
      isConfigured: hasUrl && hasKey && urlValid && keyValid,
      url: hasUrl ? process.env.NEXT_PUBLIC_SUPABASE_URL! : null,
      keyLength: hasKey ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.length : 0
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!setupStatus) {
    return null;
  }

  if (setupStatus.isConfigured) {
    return null;
  }

  const envTemplate = `# Add these to your .env.local file:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

  return (
    <div className="setup-check error">
      <div className="status-header">
        <XCircle size={20} className="text-red-400" />
        <span>Supabase Setup Required</span>
      </div>
      
      <div className="setup-details">
        <div className="env-checks">
          <div className={`env-item ${setupStatus.hasUrl ? 'success' : 'error'}`}>
            {setupStatus.hasUrl ? <CheckCircle size={16} /> : <XCircle size={16} />}
            <span>NEXT_PUBLIC_SUPABASE_URL</span>
            {setupStatus.hasUrl && !setupStatus.urlValid && (
              <span className="warning">(invalid format)</span>
            )}
          </div>
          
          <div className={`env-item ${setupStatus.hasKey ? 'success' : 'error'}`}>
            {setupStatus.hasKey ? <CheckCircle size={16} /> : <XCircle size={16} />}
            <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
            {setupStatus.hasKey && !setupStatus.keyValid && (
              <span className="warning">(invalid format)</span>
            )}
          </div>
        </div>

        <div className="quick-setup">
          <h4>Quick Setup:</h4>
          <div className="env-template">
            <pre>{envTemplate}</pre>
            <button 
              className="copy-button"
              onClick={() => copyToClipboard(envTemplate)}
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          
          <div className="setup-links">
            <a 
              href="https://supabase.com/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="setup-link"
            >
              <ExternalLink size={14} />
              Create Supabase Project
            </a>
            
            <a 
              href="https://github.com/yourusername/agentic-ai-flow/blob/main/SUPABASE_SETUP.md" 
              target="_blank" 
              rel="noopener noreferrer"
              className="setup-link"
            >
              <ExternalLink size={14} />
              Full Setup Guide
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .setup-check {
          margin: 1rem 0;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid;
        }
        
        .setup-check.success {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .setup-check.error {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .status-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .setup-details {
          margin-top: 1rem;
        }
        
        .env-checks {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .env-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        .env-item.success {
          color: #10b981;
        }
        
        .env-item.error {
          color: #ef4444;
        }
        
        .warning {
          color: #f59e0b;
          font-size: 0.8rem;
        }
        
        .quick-setup h4 {
          margin: 0 0 0.5rem 0;
          color: #f1f5f9;
          font-size: 0.9rem;
        }
        
        .env-template {
          position: relative;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 0.75rem;
          margin: 0.5rem 0;
        }
        
        .env-template pre {
          margin: 0;
          font-size: 0.8rem;
          color: #cbd5e1;
          font-family: 'Courier New', monospace;
          overflow-x: auto;
        }
        
        .copy-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 4px;
          padding: 0.25rem;
          color: #60a5fa;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .copy-button:hover {
          background: rgba(59, 130, 246, 0.3);
        }
        
        .setup-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .setup-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #60a5fa;
          text-decoration: none;
          font-size: 0.8rem;
          padding: 0.25rem 0.5rem;
          border: 1px solid rgba(96, 165, 250, 0.3);
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .setup-link:hover {
          color: #93c5fd;
          background: rgba(96, 165, 250, 0.1);
          text-decoration: none;
        }
        
        @media (max-width: 768px) {
          .setup-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
} 