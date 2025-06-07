'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, TestTube, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

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
      config.credentialFields.forEach(field => {
        if (field.required && !formData.credentials[field.key]) {
          newErrors[`credentials.${field.key}`] = `${field.label} is required`;
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
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 'var(--spacing-lg)'
    }}>
      <div style={{
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--border-radius-lg)',
        padding: 0,
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--spacing-lg)',
          borderBottom: '1px solid var(--border-primary)',
          background: 'var(--glass-bg-subtle)'
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
        <form onSubmit={handleSubmit} style={{
          padding: 'var(--spacing-lg)',
          maxHeight: 'calc(90vh - 120px)',
          overflowY: 'auto'
        }}>
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
                <option value="productivity_tool">Productivity Tool</option>
                <option value="integration_platform">Integration Platform</option>
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

            {currentConfig && (
              <div style={{
                background: 'var(--glass-bg)',
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--border-secondary)',
                marginBottom: 'var(--spacing-md)'
              }}>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {currentConfig.description}
                </p>
              </div>
            )}

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => handleDirectChange('displayName', e.target.value)}
                placeholder="e.g., OpenAI Production, ServiceNow Dev"
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
              {errors.displayName && (
                <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                  {errors.displayName}
                </span>
              )}
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
                      border: `1px solid ${errors[`credentials.${field.key}`] ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem'
                    }}
                  />
                  {errors[`credentials.${field.key}`] && (
                    <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors[`credentials.${field.key}`]}
                    </span>
                  )}
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
                    {field.required && <span style={{ color: 'var(--accent-red)', marginLeft: '4px' }}>*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData.configuration[field.key] || field.default || ''}
                      onChange={(e) => handleInputChange('configuration', field.key, e.target.value)}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        borderRadius: 'var(--border-radius)',
                        border: `1px solid ${errors[`configuration.${field.key}`] ? 'var(--accent-red)' : 'var(--border-primary)'}`,
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
                      step={field.step}
                      min={field.min}
                      max={field.max}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        borderRadius: 'var(--border-radius)',
                        border: `1px solid ${errors[`configuration.${field.key}`] ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem'
                      }}
                    />
                  )}
                  {errors[`configuration.${field.key}`] && (
                    <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors[`configuration.${field.key}`]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Options */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 'var(--font-weight-medium)' }}>
              Options
            </h3>
            
            <div style={{ marginBottom: 'var(--spacing-sm)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleDirectChange('isActive', e.target.checked)}
                  style={{ marginRight: '8px' }}
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
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '0.9rem' }}>Set as default provider</span>
              </label>
            </div>
          </div>

          {/* Form Errors */}
          {errors.submit && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-md)',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--border-radius)',
              color: 'var(--accent-red)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <AlertTriangle size={16} />
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            justifyContent: 'flex-end',
            paddingTop: 'var(--spacing-lg)',
            borderTop: '1px solid var(--border-primary)'
          }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                editingCredential ? 'Updating...' : 'Saving...'
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