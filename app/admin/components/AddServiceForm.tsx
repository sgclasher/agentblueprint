'use client';

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { X, Key, TestTube, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import styles from './AddServiceForm.module.css';
import { CredentialsRepository } from '../../repositories/credentialsRepository';
import useAuthStore from '../../store/useAuthStore';
import { Credential, CredentialFormData, ServiceType, ServiceConfigs } from '../types';

interface AddServiceFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (formData: CredentialFormData) => Promise<any>;
    editingCredential?: Credential | null;
    selectedServiceType: ServiceType;
}

export default function AddServiceForm({ 
  isOpen, 
  onClose, 
  onSave, 
  editingCredential = null,
  selectedServiceType = 'ai_provider'
}: AddServiceFormProps) {
  const [formData, setFormData] = useState<CredentialFormData>({
    serviceType: selectedServiceType,
    serviceName: '',
    displayName: '',
    credentials: {},
    configuration: {},
    isActive: true,
    isDefault: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; error?: string; message?: string; details?: any } | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const { user } = useAuthStore();

  const serviceConfigs: ServiceConfigs = {
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
              { value: 'gpt-4o', label: 'GPT-4o (Recommended)' },
              { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Cost-Effective)' },
              { value: 'gpt-4-turbo', label: 'GPT-4 Turbo (Legacy)' },
              { value: 'gpt-4.1', label: 'GPT-4.1 (Latest - 1M Context)' },
              { value: 'o1', label: 'o1 (Advanced Reasoning)' },
              { value: 'o1-preview', label: 'o1 Preview (Reasoning Beta)' },
              { value: 'o1-mini', label: 'o1 Mini (Fast Reasoning)' },
              { value: 'gpt-4', label: 'GPT-4 (Classic)' }
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
              { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash (Recommended)' },
              { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro (Advanced)' },
              { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash (Latest Stable)' },
              { value: 'gemini-1.5-flash-8b', label: 'Gemini 1.5 Flash 8B (Fast & Efficient)' },
              { value: 'gemini-2.5-pro-preview-06-05', label: 'Gemini 2.5 Pro Preview (Most Advanced)' },
              { value: 'gemini-2.5-flash-preview-05-20', label: 'Gemini 2.5 Flash Preview (Experimental)' }
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
              { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet (Recommended)' },
              { value: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku (Fast)' },
              { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus (Advanced)' },
              { value: 'claude-sonnet-4-20250514', label: 'Claude Sonnet 4 (Latest - May 2025)' },
              { value: 'claude-opus-4-20250514', label: 'Claude Opus 4 (Most Intelligent)' },
              { value: 'claude-3-7-sonnet-20250219', label: 'Claude 3.7 Sonnet (Hybrid Reasoning)' }
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
        fields: [
          { name: 'username', label: 'Username', type: 'text', required: true, placeholder: 'your.username' },
          { name: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Your ServiceNow password' },
          { name: 'instance_url', label: 'Instance URL', type: 'url', required: true, placeholder: 'https://company.service-now.com' },
          { name: 'scope_id', label: 'Application Scope ID', type: 'text', required: false, placeholder: 'Optional: sys_id of target scope' }
        ]
      },
      hubspot: {
        name: 'HubSpot',
        description: 'HubSpot CRM for contact and deal management',
        fields: [
          { name: 'api_key', label: 'HubSpot API Key', type: 'password', required: true, placeholder: 'pat-na1-...' },
          { name: 'portal_id', label: 'Portal ID', type: 'text', required: false, placeholder: 'Optional: Your HubSpot portal ID' }
        ]
      }
    },
    productivity_tool: {},
    integration_platform: {}
  };

  useEffect(() => {
    if (editingCredential) {
      setFormData({
        id: editingCredential.id,
        serviceType: editingCredential.service_type,
        serviceName: editingCredential.service_name,
        displayName: editingCredential.display_name,
        credentials: {
          model: editingCredential.configuration?.model
        },
        configuration: editingCredential.configuration || {},
        isActive: editingCredential.is_active,
        isDefault: editingCredential.is_default,
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
    setTestResult(null);
  }, [editingCredential, selectedServiceType, isOpen]);

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
  }, [formData.serviceName, formData.serviceType, editingCredential, serviceConfigs]);

  const handleInputChange = (key: string, value: any) => {
    const configFields = ['instance_url', 'scope_id', 'portal_id', 'model', 'base_url', 'timeout'];
    const section = configFields.includes(key) ? 'configuration' : 'credentials';

    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const handleDirectChange = (key: keyof CredentialFormData, value: any) => {
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
    const newErrors: { [key: string]: string } = {};
    const config = serviceConfigs[formData.serviceType]?.[formData.serviceName];
    
    if (!formData.serviceName) {
      newErrors.serviceName = 'Service is required';
    }
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }
    
    if (config) {
      config.fields.forEach(field => {
        if (field.required && !formData.credentials[field.name] && !formData.configuration[field.name]) {
          newErrors[`credentials.${field.name}`] = `${field.label} is required`;
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
        if(!user) throw new Error("User not authenticated");
      const result = await CredentialsRepository.testNewCredentials(user.id, {
        serviceType: formData.serviceType,
        serviceName: formData.serviceName,
        credentials: formData.credentials,
        configuration: formData.configuration,
      });
      setTestResult(result);
      // Log to browser console
      if (result.success) {
        console.log(`[Admin] Test Connection SUCCESS for provider: ${formData.serviceName}`);
      } else {
        console.log(`[Admin] Test Connection FAILED for provider: ${formData.serviceName}. Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      setTestResult({
        success: false,
        error: error.message || 'Connection test failed',
      });
      // Log to browser console
      console.log(`[Admin] Test Connection FAILED for provider: ${formData.serviceName}. Error: ${error.message || 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const submissionData = JSON.parse(JSON.stringify(formData));

    if (submissionData.serviceType === 'ai_provider' && submissionData.credentials.model) {
      submissionData.configuration.model = submissionData.credentials.model;
      delete submissionData.credentials.model;
    }

    try {
      // For AI providers, ensure credentials use 'apiKey' and always include 'model' in the encrypted JSON
      if (submissionData.serviceType === 'ai_provider') {
        const { api_key, model } = submissionData.credentials;
        if (!api_key) {
          throw new Error('API key is required for AI providers');
        }
        // Normalize to { apiKey, model }
        submissionData.credentials = { apiKey: api_key, model: model || submissionData.configuration.model };
      }
      await onSave(submissionData);
      onClose();
    } catch (error: any) {
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
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Service Information</h3>
                
                <div className={styles.formGroup}>
                <label className={styles.label}>Service Type</label>
                <select
                    value={formData.serviceType}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    handleDirectChange('serviceType', e.target.value as ServiceType);
                    handleDirectChange('serviceName', '');
                    }}
                    className={styles.select}
                    disabled={!!editingCredential}
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
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDirectChange('serviceName', e.target.value)}
                    className={`${styles.select} ${errors.serviceName ? styles.error : ''}`}
                    disabled={!!editingCredential}
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

                {currentConfig && currentConfig.description && (
                <div className={styles.serviceDescription}>
                    <p>{currentConfig.description}</p>
                </div>
                )}

                <div className={styles.formGroup}>
                <label className={styles.label}>Display Name</label>
                <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleDirectChange('displayName', e.target.value)}
                    placeholder="e.g., OpenAI Production, ServiceNow Dev"
                    className={`${styles.input} ${errors.displayName ? styles.error : ''}`}
                />
                {errors.displayName && <span className={styles.errorText}>{errors.displayName}</span>}
                </div>
            </div>

            {currentConfig && currentConfig.fields && (
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Credentials & Configuration</h3>
                {currentConfig.fields.map(field => (
                <div key={field.name} className={styles.formGroup}>
                    <label className={styles.label}>
                    {field.label}
                    {field.required && <span className={styles.required}>*</span>}
                    </label>
                    {field.type === 'select' ? (
                    <select
                        value={formData.configuration[field.name] || formData.credentials[field.name] || ''}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(field.name, e.target.value)}
                        className={`${styles.select} ${errors[`credentials.${field.name}`] ? styles.error : ''}`}
                    >
                        <option value="">Choose a model...</option>
                        {field.options?.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    ) : (
                    <input
                        type={field.type}
                        value={formData.credentials[field.name] || formData.configuration[field.name] || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={`${styles.input} ${errors[`credentials.${field.name}`] ? styles.error : ''}`}
                    />
                    )}
                    {errors[`credentials.${field.name}`] && (
                    <span className={styles.errorText}>{errors[`credentials.${field.name}`]}</span>
                    )}
                </div>
                ))}
            </div>
            )}

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Options</h3>
                
                <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                    <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleDirectChange('isActive', e.target.checked)}
                    />
                    <span className={styles.checkboxText}>Active</span>
                </label>
                </div>

                <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                    <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleDirectChange('isDefault', e.target.checked)}
                    />
                    <span className={styles.checkboxText}>Set as default provider</span>
                </label>
                </div>
            </div>

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

            {errors.submit && (
            <div className={styles.formError}>
                <AlertTriangle size={16} />
                {errors.submit}
            </div>
            )}

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