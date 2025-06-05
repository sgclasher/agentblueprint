'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, Database, ArrowRight, X } from 'lucide-react';
import { ProfileService } from '../../services/profileService';
import useAuthStore from '../../store/useAuthStore';

export default function MigrationBanner() {
  const { user, isAuthenticated } = useAuthStore();
  const [migrationStatus, setMigrationStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationResult, setMigrationResult] = useState(null);

  useEffect(() => {
    checkMigrationStatus();
  }, [isAuthenticated, user]);

  const checkMigrationStatus = async () => {
    if (!isAuthenticated || !user) {
      setIsVisible(false);
      return;
    }

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
    setIsMigrating(true);
    try {
      const result = await ProfileService.migrateLocalStorageProfiles();
      setMigrationResult(result);
      
      if (result.success) {
        setIsVisible(false);
        // Refresh the page or emit an event to update profile lists
        window.dispatchEvent(new CustomEvent('profilesMigrated'));
      }
    } catch (error) {
      console.error('Migration error:', error);
      setMigrationResult({
        success: false,
        error: 'Migration failed. Please try again.'
      });
    } finally {
      setIsMigrating(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal in localStorage to avoid showing again this session
    localStorage.setItem('migrationBannerDismissed', 'true');
  };

  const handleSkip = () => {
    setIsVisible(false);
    // Store permanent skip preference
    localStorage.setItem('migrationSkipped', 'true');
  };

  // Don't show if not authenticated, no migration needed, or previously dismissed
  if (!isVisible || !migrationStatus?.needsMigration) {
    return null;
  }

  // Check if user has dismissed or skipped migration
  if (localStorage.getItem('migrationBannerDismissed') === 'true' || 
      localStorage.getItem('migrationSkipped') === 'true') {
    return null;
  }

  return (
    <div className="migration-banner">
      <div className="migration-banner-content">
        <div className="migration-icon">
          <Database size={24} className="text-blue-400" />
        </div>
        
        <div className="migration-text">
          <h3 className="migration-title">
            Welcome back! Migrate your profiles to cloud storage
          </h3>
          <p className="migration-description">
            We found {migrationStatus.localCount} profile{migrationStatus.localCount !== 1 ? 's' : ''} 
            stored locally. Migrate them to your secure cloud account for access across devices.
          </p>
          
          {migrationResult && (
            <div className={`migration-result ${migrationResult.success ? 'success' : 'error'}`}>
              {migrationResult.success ? (
                <CheckCircle size={16} className="text-green-400" />
              ) : (
                <XCircle size={16} className="text-red-400" />
              )}
              <span>{migrationResult.message || migrationResult.error}</span>
            </div>
          )}
        </div>

        <div className="migration-actions">
          <button
            onClick={handleMigrate}
            disabled={isMigrating}
            className="btn btn-primary btn-sm migration-btn-migrate"
          >
            {isMigrating ? (
              <>
                <div className="loading-spinner-sm"></div>
                Migrating...
              </>
            ) : (
              <>
                <ArrowRight size={16} />
                Migrate Now
              </>
            )}
          </button>
          
          <button
            onClick={handleSkip}
            className="btn btn-ghost btn-sm migration-btn-skip"
          >
            Skip
          </button>
          
          <button
            onClick={handleDismiss}
            className="migration-btn-close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .migration-banner {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1));
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          margin: 1rem 0;
          padding: 1rem 1.5rem;
          backdrop-filter: blur(10px);
          animation: slideDown 0.3s ease-out;
        }

        .migration-banner-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .migration-icon {
          flex-shrink: 0;
          padding: 0.5rem;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 8px;
        }

        .migration-text {
          flex: 1;
        }

        .migration-title {
          font-size: 1rem;
          font-weight: 600;
          color: #f1f5f9;
          margin: 0 0 0.25rem 0;
        }

        .migration-description {
          font-size: 0.875rem;
          color: #cbd5e1;
          margin: 0;
          line-height: 1.4;
        }

        .migration-result {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.5rem;
          font-size: 0.875rem;
        }

        .migration-result.success {
          color: #10b981;
        }

        .migration-result.error {
          color: #f87171;
        }

        .migration-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
        }

        .migration-btn-migrate {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .migration-btn-skip {
          color: #94a3b8;
        }

        .migration-btn-skip:hover {
          color: #cbd5e1;
        }

        .migration-btn-close {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .migration-btn-close:hover {
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.1);
        }

        .loading-spinner-sm {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .migration-banner {
            margin: 0.5rem 0;
            padding: 1rem;
          }

          .migration-banner-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .migration-actions {
            align-self: flex-end;
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
} 