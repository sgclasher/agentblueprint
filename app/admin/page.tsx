'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../store/useAuthStore';
import GlobalHeader from '../components/GlobalHeader';
import { CredentialsRepository } from '../repositories/credentialsRepository';
import AddServiceForm from './components/AddServiceForm';
import {
  Settings,
  Key,
  TestTube,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Edit3,
  Trash2,
  Star,
  AlertTriangle,
  Zap,
  Monitor,
  Users,
  Briefcase,
  X
} from 'lucide-react';
import styles from './Admin.module.css';
import { Credential, ServiceType, TestStatus, CredentialFormData, ServiceTypeInfo } from './types';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<ServiceType>('ai_provider');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null);
  const [testingConnections, setTestingConnections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, router]);

  const loadCredentials = async () => {
    try {
      setLoading(true);
      if(!user) throw new Error("User not authenticated");
      const data = await CredentialsRepository.getCredentials(user.id, selectedTab);
      setCredentials(data as Credential[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadCredentials();
    }
  }, [user, selectedTab]);

  const handleTestConnection = async (credentialId: string) => {
    setTestingConnections(prev => new Set([...prev, credentialId]));
    
    try {
        if(!user) throw new Error("User not authenticated");
      await CredentialsRepository.testConnection(user.id, credentialId);
      await loadCredentials();
    } catch (err) {
      console.error('Test connection failed:', err);
    } finally {
      setTestingConnections(prev => {
        const newSet = new Set(prev);
        newSet.delete(credentialId);
        return newSet;
      });
    }
  };

  const handleSetDefault = async (credentialId: string) => {
    try {
      if(!user) throw new Error("User not authenticated");
      await CredentialsRepository.setDefaultProvider(user.id, credentialId);
      await loadCredentials();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (credentialId: string) => {
    if (window.confirm('Are you sure you want to delete this credential? This action cannot be undone.')) {
        try {
            if(!user) throw new Error("User not authenticated");
            await CredentialsRepository.deleteCredentials(user.id, credentialId);
            await loadCredentials();
        } catch (err: any) {
            setError(err.message);
        }
    }
  };

  const handleSaveCredential = async (formData: CredentialFormData) => {
    try {
      setError(null);
      if(!user) throw new Error("User not authenticated");
      const result = await CredentialsRepository.saveCredentials(user.id, formData);
      
      setShowAddForm(false);
      setEditingCredential(null);
      
      await loadCredentials();
      
      return result;
    } catch (err: any) {
      console.error('Failed to save credential:', err);
      setError(err.message);
      throw err;
    }
  };

  const serviceTypes: ServiceTypeInfo[] = [
    { id: 'ai_provider', name: 'AI Providers', icon: Zap, description: 'OpenAI, Gemini, Claude, and other LLM providers' },
    { id: 'crm_system', name: 'CRM Systems', icon: Users, description: 'ServiceNow, HubSpot, Salesforce integrations' },
    { id: 'productivity_tool', name: 'Productivity Tools', icon: Briefcase, description: 'Microsoft 365, Google Workspace, Slack' },
    { id: 'integration_platform', name: 'Integration Platforms', icon: Monitor, description: 'Zapier, Make, custom APIs' }
  ];

  const getStatusIcon = (testStatus: TestStatus): ReactNode => {
    switch (testStatus) {
      case 'success': return <CheckCircle className={styles.statusSuccess} size={16} />;
      case 'failed': return <XCircle className={styles.statusError} size={16} />;
      case 'testing': return <Clock className={styles.statusTesting} size={16} />;
      default: return <AlertTriangle className={styles.statusUntested} size={16} />;
    }
  };

  const getStatusText = (testStatus: TestStatus): string => {
    switch (testStatus) {
      case 'success': return 'Connected';
      case 'failed': return 'Failed';
      case 'testing': return 'Testing...';
      default: return 'Untested';
    }
  };

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className={styles.container}>
      <GlobalHeader />
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <Settings size={24} />
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Service Configuration</h1>
            <p className={styles.subtitle}>
              Manage your external service credentials and API connections
            </p>
          </div>
        </div>

        <div className={styles.tabs}>
          {serviceTypes.map((serviceType) => (
            <button
              key={serviceType.id}
              onClick={() => setSelectedTab(serviceType.id)}
              className={`${styles.tab} ${selectedTab === serviceType.id ? styles.tabActive : ''}`}
            >
              <serviceType.icon size={18} />
              <div className={styles.tabContent}>
                <span className={styles.tabName}>{serviceType.name}</span>
                <span className={styles.tabDescription}>{serviceType.description}</span>
              </div>
            </button>
          ))}
        </div>

        {error && (
          <div className={styles.error}>
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        <div className={styles.credentialsList}>
          <div className={styles.credentialsHeader}>
            <h2 className={styles.credentialsTitle}>
              {serviceTypes.find(t => t.id === selectedTab)?.name || 'Services'}
            </h2>
            <button
              onClick={() => {
                setEditingCredential(null);
                setShowAddForm(true);
              }}
              className={`btn btn-primary ${styles.addButton}`}
            >
              <Plus size={16} />
              Add Service
            </button>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              Loading credentials...
            </div>
          ) : credentials.length === 0 ? (
            <div className={styles.empty}>
              <Key size={48} className={styles.emptyIcon} />
              <h3>No services configured</h3>
              <p>Add your first {serviceTypes.find(t => t.id === selectedTab)?.name.toLowerCase()} to get started.</p>
              <button
                onClick={() => {
                    setEditingCredential(null);
                    setShowAddForm(true);
                }}
                className="btn btn-primary"
              >
                <Plus size={16} />
                Add Service
              </button>
            </div>
          ) : (
            <div className={styles.credentialsGrid}>
              {credentials.map((credential) => (
                <div key={credential.id} className={styles.credentialCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>
                      <h3>{credential.display_name}</h3>
                      {credential.is_default && (
                        <div className={styles.defaultBadge}>
                          <Star size={12} />
                          Default
                        </div>
                      )}
                    </div>
                    <div className={styles.cardActions}>
                      <button
                        onClick={() => {
                            setEditingCredential(credential);
                            setShowAddForm(true);
                        }}
                        className={styles.actionButton}
                        title="Edit"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(credential.id)}
                        className={`${styles.actionButton} ${styles.actionDanger}`}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.serviceInfo}>
                      <span className={styles.serviceName}>{credential.service_name}</span>
                      <span className={styles.serviceType}>{credential.service_type.replace(/_/g, ' ')}</span>
                    </div>

                    <div className={styles.statusRow}>
                      <div className={styles.status}>
                        {getStatusIcon(credential.test_status)}
                        <span>{getStatusText(credential.test_status)}</span>
                      </div>
                      
                      {credential.last_tested_at && (
                        <span className={styles.lastTested}>
                          Last tested: {new Date(credential.last_tested_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <div className={styles.cardFooter}>
                      <button
                        onClick={() => handleTestConnection(credential.id)}
                        disabled={testingConnections.has(credential.id)}
                        className={`btn btn-secondary ${styles.testButton}`}
                      >
                        {testingConnections.has(credential.id) ? (
                          <>
                            <div className={styles.spinner}></div>
                            Testing...
                          </>
                        ) : (
                          <>
                            <TestTube size={14} />
                            Test Connection
                          </>
                        )}
                      </button>

                      {!credential.is_default && (
                        <button
                          onClick={() => handleSetDefault(credential.id)}
                          className={`btn btn-outline ${styles.defaultButton}`}
                        >
                          <Star size={14} />
                          Set Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(showAddForm || editingCredential) && (
        <AddServiceForm
          isOpen={true}
          onClose={() => {
            setShowAddForm(false);
            setEditingCredential(null);
          }}
          onSave={handleSaveCredential}
          editingCredential={editingCredential}
          selectedServiceType={selectedTab}
        />
      )}
    </div>
  );
} 