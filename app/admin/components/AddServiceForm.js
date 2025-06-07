'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, TestTube, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import styles from './AddServiceForm.module.css';

export default function AddServiceForm({ 
  isOpen, 
  onClose, 
  onSave, 
  editingCredential = null,
  selectedServiceType = 'ai_provider'
}) {
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
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  // Service configurations
  const serviceConfigs = {
    ai_provider: {
      openai: {
        name: 'OpenAI',
        fields: [
          { name: 'api_key', label: 'API Key', type: 'password', required: true },
          { 
            name: 'model', 
            label: 'Model', 
            type: 'select', 
            required: true,
            options: [
              { value: 'o3-mini', label: 'o3 Mini (Latest Reasoning)' },
              { value: 'o1', label: 'o1 (Full Reasoning)' },
              { value: 'o1-mini', label: 'o1 Mini (Fast Reasoning)' },
              { value: 'o1-preview', label: 'o1 Preview (Advanced Reasoning)' },
              { value: 'gpt-4o', label: 'GPT-4o (Multimodal)' },
              { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Fast)' },
              { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
              { value: 'gpt-4', label: 'GPT-4' },
              { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
            ]
          },
          { name: 'base_url', label: 'Base URL (Optional)', type: 'url', required: false },
          { name: 'timeout', label: 'Timeout (seconds)', type: 'number', required: false, defaultValue: 30 }
        ]
      },
      gemini: {
        name: 'Google Gemini',
        fields: [
          { name: 'api_key', label: 'API Key', type: 'password', required: true },
          { 
            name: 'model', 
            label: 'Model', 
            type: 'select', 
            required: true,
            options: [
              { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Latest Hybrid)' },
              { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Advanced Thinking)' },
              { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
              { value: 'gemini-2.0-flash-thinking', label: 'Gemini 2.0 Flash Thinking' },
              { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
              { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
              { value: 'gemini-1.5-flash-8b', label: 'Gemini 1.5 Flash 8B' }
            ]
          },
          { name: 'base_url', label: 'Base URL (Optional)', type: 'url', required: false },
          { name: 'timeout', label: 'Timeout (seconds)', type: 'number', required: false, defaultValue: 30 }
        ]
      },
      claude: {
        name: 'Anthropic Claude',
        fields: [
          { name: 'api_key', label: 'API Key', type: 'password', required: true },
          { 
            name: 'model', 
            label: 'Model', 
            type: 'select', 
            required: true,
            options: [
              { value: 'claude-opus-4', label: 'Claude Opus 4 (Most Capable)' },
              { value: 'claude-sonnet-4', label: 'Claude Sonnet 4 (High Performance)' },
              { value: 'claude-3-7-sonnet', label: 'Claude 3.7 Sonnet (Hybrid Reasoning)' },
              { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
              { value: 'claude-3-5-haiku', label: 'Claude 3.5 Haiku (Fast)' },
              { value: 'claude-3-opus', label: 'Claude 3 Opus' },
              { value: 'claude-3-haiku', label: 'Claude 3 Haiku' }
            ]
          },
          { name: 'base_url', label: 'Base URL (Optional)', type: 'url', required: false },
          { name: 'timeout', label: 'Timeout (seconds)', type: 'number', required: false, defaultValue: 30 }
        ]
      }
    },
    crm_system: {
      servicenow: {
        name: 'ServiceNow',
        description: 'ServiceNow instance for workflow automation and data access',
        credentialFields: [
          { key: 'username', label: 'Username', type: 'text', required: true, placeholder: 'your.username' },
          { key: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Your ServiceNow password' }
        ],
        configFields: [
          { key: 'instance_url', label: 'Instance URL', type: 'url', required: true, placeholder: 'https://company.service-now.com' },
          { key: 'scope_id', label: 'Application Scope ID', type: 'text', placeholder: 'Optional: sys_id of target scope' }
        ]
      },
      hubspot: {
        name: 'HubSpot',
        description: 'HubSpot CRM for contact and deal management',
        credentialFields: [
          { key: 'api_key', label: 'HubSpot API Key', type: 'password', required: true, placeholder: 'pat-na1-...' }
        ],
        configFields: [
          { key: 'portal_id', label: 'Portal ID', type: 'text', placeholder: 'Optional: Your HubSpot portal ID' }
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
        credentials: {}, // Will be empty for security - user must re-enter
        configuration: editingCredential.configuration || {},
        isActive: editingCredential.is_active,
        isDefault: editingCredential.is_default
      });
    } else {
      // Reset for new credential
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
    setTestResult(null);
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
    
    // Clear related errors
    if (errors[`${section}.${key}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${section}.${key}`];
        return newErrors;
      });
    }
  };

  const handleDirectChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
    
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const config = serviceConfigs[formData.serviceType]?.[formData.serviceName];
    
    if (!formData.serviceName) {
      newErrors.serviceName = 'Service is required';
    }
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }
    
    if (config) {
      // Validate credential fields
      config.fields.forEach(field => {
        if (field.required && !formData.credentials[field.name]) {
          newErrors[`credentials.${field.name}`] = `${field.label} is required`;
        }
      });
      
      // Validate required config fields
      config.configFields?.forEach(field => {
        if (field.required && !formData.configuration[field.key]) {
          newErrors[`configuration.${field.key}`] = `${field.label} is required`;
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTestConnection = async () => {
    if (!validateForm()) {
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      // For testing, we'll call the test API directly with credentials
      const response = await fetch('/api/admin/test-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: formData.serviceType,
          serviceName: formData.serviceName,
          credentials: formData.credentials,
          configuration: formData.configuration
        })
      });

      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Connection test failed',
        details: error.message
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentConfig = serviceConfigs[formData.serviceType]?.[formData.serviceName];
  const availableServices = Object.entries(serviceConfigs[formData.serviceType] || {});

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerIcon}>
              <Key size={20} />
            </div>
            <div>
              <h2 className={styles.title}>
                {editingCredential ? 'Edit Service' : 'Add New Service'}
              </h2>
              <p className={styles.subtitle}>
                Configure your external service credentials
              </p>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Service Selection */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Service Information</h3>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Service Type</label>
              <select
                value={formData.serviceType}
                onChange={(e) => {
                  handleDirectChange('serviceType', e.target.value);
                  handleDirectChange('serviceName', ''); // Reset service name
                }}
                className={styles.select}
                disabled={editingCredential} // Can't change type when editing
              >
                <option value="ai_provider">AI Provider</option>
                <option value="crm_system">CRM System</option>
                <option value="productivity_tool">Productivity Tool</option>
                <option value="integration_platform">Integration Platform</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Service</label>
              <select
                value={formData.serviceName}
                onChange={(e) => handleDirectChange('serviceName', e.target.value)}
                className={`${styles.select} ${errors.serviceName ? styles.error : ''}`}
                disabled={editingCredential} // Can't change service when editing
              >
                <option value="">Choose a service...</option>
                {availableServices.map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.name}
                  </option>
                ))}
              </select>
              {errors.serviceName && <span className={styles.errorText}>{errors.serviceName}</span>}
            </div>

            {currentConfig && (
              <div className={styles.serviceDescription}>
                <p>{currentConfig.description}</p>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.label}>Display Name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => handleDirectChange('displayName', e.target.value)}
                placeholder="e.g., OpenAI Production, ServiceNow Dev"
                className={`${styles.input} ${errors.displayName ? styles.error : ''}`}
              />
              {errors.displayName && <span className={styles.errorText}>{errors.displayName}</span>}
            </div>
          </div>

          {/* Credentials Section */}
          {currentConfig && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Credentials</h3>
              {currentConfig.fields.map(field => (
                <div key={field.name} className={styles.formGroup}>
                  <label className={styles.label}>
                    {field.label}
                    {field.required && <span className={styles.required}>*</span>}
                  </label>
                  <input
                    type={field.type}
                    value={formData.credentials[field.name] || ''}
                    onChange={(e) => handleInputChange('credentials', field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className={`${styles.input} ${errors[`credentials.${field.name}`] ? styles.error : ''}`}
                  />
                  {errors[`credentials.${field.name}`] && (
                    <span className={styles.errorText}>{errors[`credentials.${field.name}`]}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Configuration Section */}
          {currentConfig && currentConfig.configFields && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Configuration</h3>
              {currentConfig.configFields.map(field => (
                <div key={field.key} className={styles.formGroup}>
                  <label className={styles.label}>
                    {field.label}
                    {field.required && <span className={styles.required}>*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData.configuration[field.key] || field.default || ''}
                      onChange={(e) => handleInputChange('configuration', field.key, e.target.value)}
                      className={`${styles.select} ${errors[`configuration.${field.key}`] ? styles.error : ''}`}
                    >
                      {field.options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData.configuration[field.key] || field.default || ''}
                      onChange={(e) => handleInputChange('configuration', field.key, e.target.value)}
                      placeholder={field.placeholder}
                      step={field.step}
                      min={field.min}
                      max={field.max}
                      className={`${styles.input} ${errors[`configuration.${field.key}`] ? styles.error : ''}`}
                    />
                  )}
                  {errors[`configuration.${field.key}`] && (
                    <span className={styles.errorText}>{errors[`configuration.${field.key}`]}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Options Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Options</h3>
            
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleDirectChange('isActive', e.target.checked)}
                />
                <span className={styles.checkboxText}>Active</span>
              </label>
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => handleDirectChange('isDefault', e.target.checked)}
                />
                <span className={styles.checkboxText}>Set as default provider</span>
              </label>
            </div>
          </div>

          {/* Test Results */}
          {testResult && (
            <div className={`${styles.testResult} ${testResult.success ? styles.testSuccess : styles.testError}`}>
              <div className={styles.testResultHeader}>
                {testResult.success ? (
                  <CheckCircle size={16} className={styles.testSuccessIcon} />
                ) : (
                  <XCircle size={16} className={styles.testErrorIcon} />
                )}
                <span>{testResult.success ? 'Connection Successful' : 'Connection Failed'}</span>
              </div>
              {testResult.message && <p>{testResult.message}</p>}
              {testResult.error && <p className={styles.errorDetail}>{testResult.error}</p>}
              {testResult.details && (
                <div className={styles.testDetails}>
                  <strong>Details:</strong>
                  <pre>{JSON.stringify(testResult.details, null, 2)}</pre>
                </div>
              )}
            </div>
          )}

          {/* Form Errors */}
          {errors.submit && (
            <div className={styles.formError}>
              <AlertTriangle size={16} />
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={`btn btn-secondary ${styles.cancelButton}`}
            >
              Cancel
            </button>
            
            {currentConfig && (
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting || isSubmitting}
                className={`btn btn-outline ${styles.testButton}`}
              >
                {isTesting ? (
                  <>
                    <div className={styles.spinner}></div>
                    Testing...
                  </>
                ) : (
                  <>
                    <TestTube size={16} />
                    Test Connection
                  </>
                )}
              </button>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting || isTesting}
              className={`btn btn-primary ${styles.saveButton}`}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner}></div>
                  {editingCredential ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                editingCredential ? 'Update Service' : 'Save Service'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 