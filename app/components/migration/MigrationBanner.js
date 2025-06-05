'use client';

import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, X, Loader2, Database } from 'lucide-react';
import { ProfileService } from '../../services/profileService';
import useAuthStore from '../../store/useAuthStore';

export default function MigrationBanner() {
  const { user, isAuthenticated } = useAuthStore();
  const [migrationStatus, setMigrationStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [migrationResult, setMigrationResult] = useState(null);

  // Check migration status when user authenticates
  useEffect(() => {
    if (isAuthenticated && user) {
      checkMigrationNeeded();
    }
  }, [isAuthenticated, user]);

  const checkMigrationNeeded = async () => {
    try {
      const status = await ProfileService.checkMigrationStatus();
      setMigrationStatus(status);
      
      // Show banner if migration is needed
      if (status.needsMigration) {
        setIsVisible(true);
      }
    } catch (error) {
      console.error('Error checking migration status:', error);
    }
  };

  const handleMigrate = async () => {
    try {
      setIsLoading(true);
      setMigrationResult(null);
      
      const result = await ProfileService.migrateLocalStorageProfiles();
      setMigrationResult(result);
      
      if (result.success) {
        // Hide banner after successful migration
        setTimeout(() => {
          setIsVisible(false);
          // Refresh the page to show migrated profiles
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error('Migration error:', error);
      setMigrationResult({ 
        success: false, 
        error: 'Migration failed. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal in localStorage to not show again
    localStorage.setItem('migrationBannerDismissed', 'true');
  };

  // Don't show if user is not authenticated or no migration needed
  if (!isAuthenticated || !isVisible || !migrationStatus?.needsMigration) {
    return null;
  }

  // Check if user previously dismissed
  if (localStorage.getItem('migrationBannerDismissed') === 'true') {
    return null;
  }

  return (
    <div className="migration-banner">
      <div className="migration-content">
        <div className="migration-icon">
          <Database size={24} className="text-blue-400" />
        </div>
        
        <div className="migration-info">
          <h3 className="migration-title">
            Welcome back! Secure your profiles in the cloud
          </h3>
          <p className="migration-description">
            We found {migrationStatus.localCount} profile{migrationStatus.localCount !== 1 ? 's' : ''} stored locally. 
            Migrate them to your secure cloud account for access across devices and backup protection.
          </p>
          
          {migrationResult && (
            <div className={`migration-result ${migrationResult.success ? 'success' : 'error'}`}>
              {migrationResult.success ? (
                <div className="result-success">
                  <CheckCircle size={16} />
                  <span>Successfully migrated {migrationResult.migrated} profile{migrationResult.migrated !== 1 ? 's' : ''}!</span>
                </div>
              ) : (
                <div className="result-error">
                  <AlertCircle size={16} />
                  <span>{migrationResult.error}</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="migration-actions">
          <button 
            className="btn btn-primary"
            onClick={handleMigrate}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Migrating...
              </>
            ) : (
              <>
                <Upload size={16} />
                Migrate Now
              </>
            )}
          </button>
          
          <button 
            className="btn btn-ghost"
            onClick={handleDismiss}
            disabled={isLoading}
          >
            <X size={16} />
            Later
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .migration-banner {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }
        
        .migration-content {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .migration-icon {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .migration-info {
          flex: 1;
        }
        
        .migration-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #f1f5f9;
          margin: 0 0 0.5rem 0;
        }
        
        .migration-description {
          color: #cbd5e1;
          margin: 0 0 1rem 0;
          line-height: 1.5;
        }
        
        .migration-result {
          padding: 0.75rem;
          border-radius: 8px;
          margin-top: 1rem;
        }
        
        .migration-result.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        
        .migration-result.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        
        .result-success,
        .result-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        .result-success {
          color: #10b981;
        }
        
        .result-error {
          color: #ef4444;
        }
        
        .migration-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex-shrink: 0;
        }
        
        .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: none;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
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
        
        .btn-ghost {
          background: transparent;
          color: #94a3b8;
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        
        .btn-ghost:hover:not(:disabled) {
          background: rgba(148, 163, 184, 0.1);
          color: #cbd5e1;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .migration-content {
            flex-direction: column;
          }
          
          .migration-actions {
            flex-direction: row;
          }
        }
      `}</style>
    </div>
  );
} 