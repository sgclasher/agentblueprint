'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../store/useAuthStore';
import GlobalHeader from '../components/GlobalHeader';
import { CredentialsRepository } from '../repositories/credentialsRepository';
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

// ServiceForm Component
function ServiceForm({ isOpen, onClose, onSave, editingCredential = null, selectedServiceType = 'ai_provider' }) {
  console.log('🏗️ ServiceForm rendered with:', { isOpen, hasOnSave: !!onSave, editingCredential: !!editingCredential, selectedServiceType });
  
  const [formData, setFormData] = useState({
    serviceType: selectedServiceType,
    serviceName: '',
    displayName: '',
    credentials: {},
    configuration: {},
    isActive: true,
    isDefault: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Service configurations
  const serviceConfigs = {
    ai_provider: {
      openai: {
        name: 'OpenAI',
        description: 'GPT-4o, GPT-3.5 Turbo, and other OpenAI models',
        credentialFields: [
          { key: 'api_key', label: 'API Key', type: 'password', required: true, placeholder: 'sk-proj-...' }
        ],
        configFields: [
          { key: 'model', label: 'Default Model', type: 'select', options: ['gpt-4o', 'gpt-4', 'gpt-3.5-turbo'], default: 'gpt-4o' },
          { key: 'max_tokens', label: 'Max Tokens', type: 'number', default: 4000 },
          { key: 'temperature', label: 'Temperature', type: 'number', step: 0.1, min: 0, max: 2, default: 0.7 }
        ]
      },
      gemini: {
        name: 'Google Gemini',
        description: 'Gemini Pro and other Google AI models',
        credentialFields: [
          { key: 'api_key', label: 'Google API Key', type: 'password', required: true, placeholder: 'AIza...' }
        ],
        configFields: [
          { key: 'model', label: 'Default Model', type: 'select', options: ['gemini-pro', 'gemini-pro-vision'], default: 'gemini-pro' }
        ]
      },
      claude: {
        name: 'Anthropic Claude',
        description: 'Claude 3.5 Sonnet and other Anthropic models',
        credentialFields: [
          { key: 'api_key', label: 'Anthropic API Key', type: 'password', required: true, placeholder: 'sk-ant-...' }
        ],
        configFields: [
          { key: 'model', label: 'Default Model', type: 'select', options: ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229'], default: 'claude-3-5-sonnet-20241022' }
        ]
      }
    },
    crm_system: {
      servicenow: {
        name: 'ServiceNow',
        description: 'ServiceNow instance for workflow automation',
        credentialFields: [
          { key: 'username', label: 'Username', type: 'text', required: true, placeholder: 'your.username' },
          { key: 'password', label: 'Password', type: 'password', required: true }
        ],
        configFields: [
          { key: 'instance_url', label: 'Instance URL', type: 'url', required: true, placeholder: 'https://company.service-now.com' },
          { key: 'scope_id', label: 'Application Scope ID', type: 'text', placeholder: 'Optional scope ID' }
        ]
      },
      hubspot: {
        name: 'HubSpot',
        description: 'HubSpot CRM for contact and deal management',
        credentialFields: [
          { key: 'api_key', label: 'HubSpot API Key', type: 'password', required: true, placeholder: 'pat-na1-...' }
        ]
      }
    }
  };

  // Initialize form when editing
  useEffect(() => {
    if (editingCredential) {
      setFormData({
        id: editingCredential.id,
        serviceType: editingCredential.service_type,
        serviceName: editingCredential.service_name,
        displayName: editingCredential.display_name,
        credentials: {}, // Empty for security - user must re-enter
        configuration: editingCredential.configuration || {},
        isActive: editingCredential.is_active,
        isDefault: editingCredential.is_default
      });
    } else {
      setFormData({
        serviceType: selectedServiceType,
        serviceName: '',
        displayName: '',
        credentials: {},
        configuration: {},
        isActive: true,
        isDefault: false
      });
    }
    setErrors({});
  }, [editingCredential, selectedServiceType, isOpen]);

  // Auto-generate display name
  useEffect(() => {
    if (formData.serviceName && !editingCredential) {
      const config = serviceConfigs[formData.serviceType]?.[formData.serviceName];
      if (config) {
        setFormData(prev => ({
          ...prev,
          displayName: `${config.name} (${formData.serviceType === 'ai_provider' ? 'AI' : 'CRM'})`
        }));
      }
    }
  }, [formData.serviceName, formData.serviceType, editingCredential]);

  const handleInputChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleDirectChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const validateForm = () => {
    console.log('🔍 validateForm called');
    console.log('📋 Current formData:', { ...formData, credentials: '[HIDDEN]' });
    
    const newErrors = {};
    const config = serviceConfigs[formData.serviceType]?.[formData.serviceName];
    console.log('🔧 Config found:', !!config);
    
    if (!formData.serviceName) {
      newErrors.serviceName = 'Service is required';
      console.log('❌ Missing serviceName');
    }
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
      console.log('❌ Missing displayName');
    }
    
    if (config) {
      // Validate credential fields
      config.credentialFields.forEach(field => {
        if (field.required && !formData.credentials[field.key]) {
          newErrors[`credentials.${field.key}`] = `${field.label} is required`;
          console.log(`❌ Missing required credential: ${field.key}`);
        }
      });
      
      // Validate required config fields
      config.configFields?.forEach(field => {
        if (field.required && !formData.configuration[field.key]) {
          newErrors[`configuration.${field.key}`] = `${field.label} is required`;
          console.log(`❌ Missing required config: ${field.key}`);
        }
      });
    }
    
    console.log('📊 Validation errors:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('✅ Form validation result:', isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 ServiceForm handleSubmit called');
    
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    console.log('✅ Form validation passed, submitting...');
    console.log('📋 Form data being submitted:', { ...formData, credentials: '[HIDDEN]' });

    setIsSubmitting(true);
    try {
      console.log('📞 Calling onSave with formData...');
      await onSave(formData);
      console.log('✅ onSave completed successfully');
      onClose();
    } catch (error) {
      console.error('💥 ServiceForm handleSubmit error:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentConfig = serviceConfigs[formData.serviceType]?.[formData.serviceName];
  const availableServices = Object.entries(serviceConfigs[formData.serviceType] || {});

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} style={{ maxWidth: '600px', maxHeight: '90vh', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-lg)',
          paddingBottom: 'var(--spacing-md)',
          borderBottom: '1px solid var(--border-primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-secondary)',
              borderRadius: 'var(--border-radius)',
              color: 'var(--accent-blue)'
            }}>
              <Key size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'var(--font-weight-semibold)' }}>
                {editingCredential ? 'Edit Service' : 'Add New Service'}
              </h2>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Configure your external service credentials
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: 'var(--border-radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ maxHeight: 'calc(90vh - 200px)', overflowY: 'auto' }}>
          {/* Service Selection */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 'var(--font-weight-medium)' }}>
              Service Information
            </h3>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                Service Type
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => {
                  handleDirectChange('serviceType', e.target.value);
                  handleDirectChange('serviceName', '');
                }}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-primary)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
                disabled={editingCredential}
              >
                <option value="ai_provider">AI Provider</option>
                <option value="crm_system">CRM System</option>
              </select>
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                Service
              </label>
              <select
                value={formData.serviceName}
                onChange={(e) => handleDirectChange('serviceName', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                  border: `1px solid ${errors.serviceName ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
                disabled={editingCredential}
              >
                <option value="">Choose a service...</option>
                {availableServices.map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.name}
                  </option>
                ))}
              </select>
              {errors.serviceName && (
                <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                  {errors.serviceName}
                </span>
              )}
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => handleDirectChange('displayName', e.target.value)}
                placeholder="e.g., OpenAI Production"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                  border: `1px solid ${errors.displayName ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* Credentials */}
          {currentConfig && (
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 'var(--font-weight-medium)' }}>
                Credentials
              </h3>
              {currentConfig.credentialFields.map(field => (
                <div key={field.key} style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                    {field.label}
                    {field.required && <span style={{ color: 'var(--accent-red)', marginLeft: '4px' }}>*</span>}
                  </label>
                  <input
                    type={field.type}
                    value={formData.credentials[field.key] || ''}
                    onChange={(e) => handleInputChange('credentials', field.key, e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--border-primary)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Configuration */}
          {currentConfig && currentConfig.configFields && (
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 'var(--font-weight-medium)' }}>
                Configuration
              </h3>
              {currentConfig.configFields.map(field => (
                <div key={field.key} style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData.configuration[field.key] || field.default || ''}
                      onChange={(e) => handleInputChange('configuration', field.key, e.target.value)}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        borderRadius: 'var(--border-radius)',
                        border: '1px solid var(--border-primary)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem'
                      }}
                    >
                      {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData.configuration[field.key] || field.default || ''}
                      onChange={(e) => handleInputChange('configuration', field.key, e.target.value)}
                      placeholder={field.placeholder}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        borderRadius: 'var(--border-radius)',
                        border: '1px solid var(--border-primary)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Options */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ marginBottom: 'var(--spacing-sm)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleDirectChange('isActive', e.target.checked)}
                />
                <span style={{ fontSize: '0.9rem' }}>Active</span>
              </label>
            </div>

            <div style={{ marginBottom: 'var(--spacing-sm)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => handleDirectChange('isDefault', e.target.checked)}
                />
                <span style={{ fontSize: '0.9rem' }}>Set as default provider</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="btn btn-primary"
              onClick={(e) => {
                console.log('🖱️ Save button clicked!');
                console.log('📝 Button type:', e.currentTarget.type);
                console.log('🚫 Is submitting:', isSubmitting);
                console.log('📋 Current form data:', { ...formData, credentials: '[HIDDEN]' });
                // Don't prevent default - let form submission happen naturally
              }}
            >
              {isSubmitting ? (editingCredential ? 'Updating...' : 'Saving...') : (editingCredential ? 'Update Service' : 'Save Service')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('ai_provider');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCredential, setEditingCredential] = useState(null);
  const [testingConnections, setTestingConnections] = useState(new Set());

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, router]);

  // Load credentials on mount and when tab changes
  useEffect(() => {
    if (user) {
      loadCredentials();
    }
  }, [user, selectedTab]);

  const loadCredentials = async () => {
    try {
      setLoading(true);
      const data = await CredentialsRepository.getCredentials(user.id, selectedTab);
      setCredentials(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async (credentialId) => {
    setTestingConnections(prev => new Set([...prev, credentialId]));
    
    try {
      const credential = credentials.find(c => c.id === credentialId);
      await CredentialsRepository.testConnection(user.id, credentialId);
      
      // Reload credentials to get updated test status
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

  const handleSetDefault = async (credentialId) => {
    try {
      await CredentialsRepository.setDefaultProvider(user.id, credentialId);
      await loadCredentials();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (credentialId) => {
    if (!confirm('Are you sure you want to delete this credential? This action cannot be undone.')) {
      return;
    }

    try {
      await CredentialsRepository.deleteCredentials(user.id, credentialId);
      await loadCredentials();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveCredential = async (formData) => {
    console.log('🎯 handleSaveCredential called with formData:', { ...formData, credentials: '[HIDDEN]' });
    console.log('👤 User ID:', user?.id);
    
    try {
      console.log('📞 Calling CredentialsRepository.saveCredentials...');
      const result = await CredentialsRepository.saveCredentials(user.id, formData);
      console.log('✅ CredentialsRepository.saveCredentials completed:', { resultId: result?.id });
      
      console.log('🔄 Calling loadCredentials to refresh...');
      await loadCredentials();
      console.log('✅ loadCredentials completed');
    } catch (err) {
      console.error('💥 handleSaveCredential error:', err);
      throw new Error(err.message);
    }
  };

  const serviceTypes = [
    {
      id: 'ai_provider',
      name: 'AI Providers',
      icon: Zap,
      description: 'OpenAI, Gemini, Claude, and other LLM providers'
    },
    {
      id: 'crm_system',
      name: 'CRM Systems',
      icon: Users,
      description: 'ServiceNow, HubSpot, Salesforce integrations'
    },
    {
      id: 'productivity_tool',
      name: 'Productivity Tools',
      icon: Briefcase,
      description: 'Microsoft 365, Google Workspace, Slack'
    },
    {
      id: 'integration_platform',
      name: 'Integration Platforms',
      icon: Monitor,
      description: 'Zapier, Make, custom APIs'
    }
  ];

  const getStatusIcon = (testStatus) => {
    switch (testStatus) {
      case 'success':
        return <CheckCircle className={styles.statusSuccess} size={16} />;
      case 'failed':
        return <XCircle className={styles.statusError} size={16} />;
      case 'testing':
        return <Clock className={styles.statusTesting} size={16} />;
      default:
        return <AlertTriangle className={styles.statusUntested} size={16} />;
    }
  };

  const getStatusText = (testStatus) => {
    switch (testStatus) {
      case 'success':
        return 'Connected';
      case 'failed':
        return 'Failed';
      case 'testing':
        return 'Testing...';
      default:
        return 'Untested';
    }
  };

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className={styles.container}>
      <GlobalHeader />
      
      <div className={styles.content}>
        {/* Header */}
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

        {/* Service Type Tabs */}
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

        {/* Error Message */}
        {error && (
          <div className={styles.error}>
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        {/* Credentials List */}
        <div className={styles.credentialsList}>
          <div className={styles.credentialsHeader}>
            <h2 className={styles.credentialsTitle}>
              {serviceTypes.find(t => t.id === selectedTab)?.name || 'Services'}
            </h2>
            <button
              onClick={() => setShowAddForm(true)}
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
                onClick={() => setShowAddForm(true)}
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
                        onClick={() => setEditingCredential(credential)}
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
                      <span className={styles.serviceType}>{credential.service_type.replace('_', ' ')}</span>
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

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingCredential) && (
        <ServiceForm
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