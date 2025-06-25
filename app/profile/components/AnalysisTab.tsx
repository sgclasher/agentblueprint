'use client';

import React, { FC } from 'react';
import { Profile, StrategicInitiative } from '../../services/types';
import { 
  BarChart3, CheckCircle, Clock, AlertTriangle, Target, 
  DollarSign, Calendar, TrendingUp, User, Mail, Phone, 
  Linkedin, Building2, Lightbulb, Settings
} from 'lucide-react';
import styles from '../../profiles/[id]/ProfileDetail.module.css';

interface AnalysisTabProps {
  profile: Profile;
  isEditing: boolean;
  updateProfile?: (path: string, value: any) => void;
}

const AnalysisTab: FC<AnalysisTabProps> = ({ profile, isEditing, updateProfile }) => {
  const initiatives = profile.strategicInitiatives || [];

  // Helper function to update a specific initiative
  const updateInitiative = (initiativeIndex: number, field: string, value: any) => {
    if (!updateProfile) return;
    
    const updatedInitiatives = [...initiatives];
    if (field.includes('.')) {
      // Handle nested fields like 'contact.name'
      const [parentField, childField] = field.split('.');
      const currentInitiative = updatedInitiatives[initiativeIndex];
      if (parentField === 'contact') {
        updatedInitiatives[initiativeIndex] = {
          ...currentInitiative,
          contact: {
            ...currentInitiative.contact,
            [childField]: value
          }
        };
      }
    } else {
      updatedInitiatives[initiativeIndex] = {
        ...updatedInitiatives[initiativeIndex],
        [field]: value
      };
    }
    updateProfile('strategicInitiatives', updatedInitiatives);
  };

  // Helper function to update array fields
  const updateArrayField = (initiativeIndex: number, field: string, newArray: string[]) => {
    updateInitiative(initiativeIndex, field, newArray);
  };

  // Helper function to add item to array
  const addArrayItem = (initiativeIndex: number, field: string) => {
    const currentArray = (initiatives[initiativeIndex] as any)[field] || [];
    updateArrayField(initiativeIndex, field, [...currentArray, '']);
  };

  // Helper function to remove item from array
  const removeArrayItem = (initiativeIndex: number, field: string, itemIndex: number) => {
    const currentArray = (initiatives[initiativeIndex] as any)[field] || [];
    const newArray = currentArray.filter((_: any, i: number) => i !== itemIndex);
    updateArrayField(initiativeIndex, field, newArray);
  };

  // Helper function to update array item
  const updateArrayItem = (initiativeIndex: number, field: string, itemIndex: number, value: string) => {
    const currentArray = [...((initiatives[initiativeIndex] as any)[field] || [])];
    currentArray[itemIndex] = value;
    updateArrayField(initiativeIndex, field, currentArray);
  };

  // 🆕 Phase 1 ROI Enhancement: Process Metrics Helper Functions
  const updateProcessMetrics = (initiativeIndex: number, field: string, value: string) => {
    if (!updateProfile) return;
    
    const updatedInitiatives = [...initiatives];
    const currentMetrics = updatedInitiatives[initiativeIndex].processMetrics || {};
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      processMetrics: {
        ...currentMetrics,
        [field]: value
      }
    };
    updateProfile('strategicInitiatives', updatedInitiatives);
  };

  // 🆕 Phase 1 ROI Enhancement: Investment Context Helper Functions
  const updateInvestmentContext = (initiativeIndex: number, field: string, value: string) => {
    if (!updateProfile) return;
    
    const updatedInitiatives = [...initiatives];
    const currentContext = updatedInitiatives[initiativeIndex].investmentContext || {};
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      investmentContext: {
        ...currentContext,
        [field]: value
      }
    };
    updateProfile('strategicInitiatives', updatedInitiatives);
  };

  const getPriorityConfig = (priority: string) => {
    const config: { [key: string]: {
      color: string;
      bg: string;
      border: string;
      label: string;
    }} = {
      'High': { 
        color: 'text-red-600', 
        bg: 'bg-red-100', 
        border: 'border-red-200',
        label: 'High Priority'
      },
      'Medium': { 
        color: 'text-yellow-600', 
        bg: 'bg-yellow-100', 
        border: 'border-yellow-200',
        label: 'Medium Priority'
      },
      'Low': { 
        color: 'text-green-600', 
        bg: 'bg-green-100', 
        border: 'border-green-200',
        label: 'Low Priority'
      }
    };
    
    return config[priority] || config['Medium'];
  };

  const getStatusConfig = (status: string) => {
    const config: { [key: string]: {
      color: string;
      bg: string;
      icon: React.ReactNode;
      label: string;
    }} = {
      'Planning': { 
        color: 'text-blue-600', 
        bg: 'rgba(59, 130, 246, 0.1)',
        icon: <Lightbulb size={16} />,
        label: 'Planning'
      },
      'In Progress': { 
        color: 'text-orange-600', 
        bg: 'rgba(245, 158, 11, 0.1)',
        icon: <Clock size={16} />,
        label: 'In Progress'
      },
      'On Hold': { 
        color: 'text-gray-600', 
        bg: 'rgba(107, 114, 128, 0.1)',
        icon: <AlertTriangle size={16} />,
        label: 'On Hold'
      },
      'Completed': { 
        color: 'text-green-600', 
        bg: 'rgba(16, 185, 129, 0.1)',
        icon: <CheckCircle size={16} />,
        label: 'Completed'
      }
    };
    
    return config[status] || config['Planning'];
  };

  // Editable render functions
  const renderEditableContactInfo = (contact: StrategicInitiative['contact'], initiativeIndex: number) => {
    return (
      <div style={{ 
        padding: '1rem', 
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderRadius: 'var(--border-radius)',
        border: '1px solid rgba(59, 130, 246, 0.1)'
      }}>
        <h5 style={{ 
          margin: '0 0 0.75rem 0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          color: 'var(--accent-blue)'
        }}>
          <User size={16} />
          Project Contact
        </h5>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
              Name
            </label>
            <input
              type="text"
              className={styles.editableInput}
              value={contact?.name || ''}
              onChange={(e) => updateInitiative(initiativeIndex, 'contact.name', e.target.value)}
              placeholder="Contact name"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
              Title
            </label>
            <input
              type="text"
              className={styles.editableInput}
              value={contact?.title || ''}
              onChange={(e) => updateInitiative(initiativeIndex, 'contact.title', e.target.value)}
              placeholder="Job title"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
              Email
            </label>
            <input
              type="email"
              className={styles.editableInput}
              value={contact?.email || ''}
              onChange={(e) => updateInitiative(initiativeIndex, 'contact.email', e.target.value)}
              placeholder="email@company.com"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
              Phone
            </label>
            <input
              type="tel"
              className={styles.editableInput}
              value={contact?.phone || ''}
              onChange={(e) => updateInitiative(initiativeIndex, 'contact.phone', e.target.value)}
              placeholder="555-0123"
            />
          </div>
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)' }}>
              LinkedIn
            </label>
            <input
              type="url"
              className={styles.editableInput}
              value={contact?.linkedin || ''}
              onChange={(e) => updateInitiative(initiativeIndex, 'contact.linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderEditableArrayField = (
    items: string[], 
    initiativeIndex: number, 
    fieldName: string, 
    title: string, 
    icon: React.ReactNode,
    color: string,
    placeholder: string
  ) => {
    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h5 style={{ 
            margin: 0, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color
          }}>
            {icon}
            {title}
          </h5>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => addArrayItem(initiativeIndex, fieldName)}
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
          >
            + Add
          </button>
        </div>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {items.map((item, itemIndex) => (
            <div key={itemIndex} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="text"
                className={styles.editableInput}
                value={item}
                onChange={(e) => updateArrayItem(initiativeIndex, fieldName, itemIndex, e.target.value)}
                placeholder={placeholder}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => removeArrayItem(initiativeIndex, fieldName, itemIndex)}
                style={{
                  padding: '0.5rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: 'var(--border-radius)',
                  color: '#dc2626',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                ×
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
              No {title.toLowerCase()} added yet. Click &quot;Add&quot; to create one.
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderContactInfo = (contact: StrategicInitiative['contact']) => {
    if (!contact || !contact.name) return null;

    return (
      <div style={{ 
        padding: '1rem', 
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        borderRadius: 'var(--border-radius)',
        border: '1px solid rgba(59, 130, 246, 0.1)'
      }}>
        <h5 style={{ 
          margin: '0 0 0.75rem 0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          color: 'var(--accent-blue)'
        }}>
          <User size={16} />
          Project Contact
        </h5>
        <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.9rem' }}>
          <div>
            <strong>{contact.name}</strong>
            {contact.title && <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>{contact.title}</div>}
          </div>
          {contact.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={14} />
              <a href={`mailto:${contact.email}`} style={{ color: 'var(--accent-blue)' }}>{contact.email}</a>
            </div>
          )}
          {contact.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={14} />
              <a href={`tel:${contact.phone}`} style={{ color: 'var(--accent-blue)' }}>{contact.phone}</a>
            </div>
          )}
          {contact.linkedin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Linkedin size={14} />
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>LinkedIn Profile</a>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBusinessProblems = (problems: string[]) => {
    if (!problems || problems.length === 0) return null;

    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <h5 style={{ 
          margin: '0 0 0.75rem 0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          color: 'var(--text-primary)'
        }}>
          <AlertTriangle size={16} />
          Business Problems
        </h5>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          {problems.map((problem, index) => (
            <li key={index} style={{ marginBottom: '0.5rem', lineHeight: 'var(--line-height)' }}>
              {problem}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderExpectedOutcomes = (outcomes: string[]) => {
    if (!outcomes || outcomes.length === 0) return null;

    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <h5 style={{ 
          margin: '0 0 0.75rem 0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          color: 'var(--accent-blue)'
        }}>
          <Target size={16} />
          Expected Outcomes
        </h5>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          {outcomes.map((outcome, index) => (
            <li key={index} style={{ 
              marginBottom: '0.5rem', 
              lineHeight: 'var(--line-height)',
              color: 'var(--accent-blue)'
            }}>
              {outcome}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderSuccessMetrics = (metrics: string[]) => {
    if (!metrics || metrics.length === 0) return null;

    return (
      <div style={{ marginBottom: '1.5rem' }}>
        <h5 style={{ 
          margin: '0 0 0.75rem 0', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          color: 'var(--accent-purple)'
        }}>
          <TrendingUp size={16} />
          Success Metrics
        </h5>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          {metrics.map((metric, index) => (
            <li key={index} style={{ 
              marginBottom: '0.5rem', 
              lineHeight: 'var(--line-height)',
              color: 'var(--accent-purple)'
            }}>
              {metric}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (initiatives.length === 0) {
    return (
      <div className={styles.tabContent}>
        <div className={styles.emptyOpportunities}>
          <BarChart3 size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
          <h3>No Strategic Initiatives</h3>
          <p>Add strategic initiatives to track your business goals, priorities, and progress with comprehensive business intelligence.</p>
          {!isEditing && (
            <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>
              <Settings size={18} style={{ marginRight: '0.5rem' }} />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tabContent}>
      {/* Strategic Initiatives Overview */}
      <div className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0 }}>
            <BarChart3 size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Strategic Initiatives Overview
          </h3>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            {initiatives.length} Initiative{initiatives.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {/* Summary Statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {/* Status Distribution */}
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--accent-blue)' }}>Status Distribution</h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {['Planning', 'In Progress', 'On Hold', 'Completed'].map(status => {
                const count = initiatives.filter(i => (i.status || 'Planning') === status).length;
                const config = getStatusConfig(status);
                return (
                  <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <span style={{ color: config.color }}>{config.icon}</span>
                    <span style={{ minWidth: '80px' }}>{config.label}:</span>
                    <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Priority Distribution */}
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--accent-green)' }}>Priority Distribution</h4>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {['High', 'Medium', 'Low'].map(priority => {
                const count = initiatives.filter(i => (i.priority || 'Medium') === priority).length;
                const config = getPriorityConfig(priority);
                return (
                  <div key={priority} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <div style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%',
                      backgroundColor: config.color.includes('red') ? '#ef4444' : 
                                      config.color.includes('yellow') ? '#f59e0b' : '#10b981'
                    }} />
                    <span style={{ minWidth: '80px' }}>{config.label}:</span>
                    <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Budget Overview */}
          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--accent-purple)' }}>Budget Overview</h4>
            <div style={{ fontSize: '0.9rem' }}>
              {initiatives.filter(i => i.estimatedBudget).length > 0 ? (
                <div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong>{initiatives.filter(i => i.estimatedBudget).length}</strong> of {initiatives.length} initiatives have budget estimates
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Budget planning: {Math.round((initiatives.filter(i => i.estimatedBudget).length / initiatives.length) * 100)}% complete
                  </div>
                </div>
              ) : (
                <div style={{ color: 'var(--text-muted)' }}>
                  No budget estimates available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Individual Initiative Cards */}
      {initiatives.map((initiative, index) => {
        const priorityConfig = getPriorityConfig(initiative.priority || 'Medium');
        const statusConfig = getStatusConfig(initiative.status || 'Planning');

        return (
          <div key={index} className={styles.analysisCard} style={{ marginBottom: '2rem' }}>
            {isEditing ? (
              /* Edit Mode */
              <div>
                {/* Editable Initiative Header */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      Initiative Name
                    </label>
                    <input
                      type="text"
                      className={styles.editableInput}
                      value={initiative.initiative}
                      onChange={(e) => updateInitiative(index, 'initiative', e.target.value)}
                      placeholder="Strategic initiative name"
                      style={{ fontSize: '1.2rem', fontWeight: 'var(--font-weight-semibold)' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Priority
                      </label>
                      <select
                        className={styles.editableSelect}
                        value={initiative.priority || 'Medium'}
                        onChange={(e) => updateInitiative(index, 'priority', e.target.value)}
                      >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Status
                      </label>
                      <select
                        className={styles.editableSelect}
                        value={initiative.status || 'Planning'}
                        onChange={(e) => updateInitiative(index, 'status', e.target.value)}
                      >
                        <option value="Planning">Planning</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Target Timeline
                      </label>
                      <input
                        type="text"
                        className={styles.editableInput}
                        value={initiative.targetTimeline || ''}
                        onChange={(e) => updateInitiative(index, 'targetTimeline', e.target.value)}
                        placeholder="Q3 2025, 6 months, etc."
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Estimated Budget
                      </label>
                      <input
                        type="text"
                        className={styles.editableInput}
                        value={initiative.estimatedBudget || ''}
                        onChange={(e) => updateInitiative(index, 'estimatedBudget', e.target.value)}
                        placeholder="$500K, $2M-5M, etc."
                      />
                    </div>
                  </div>
                </div>

                {/* 🆕 Phase 1 ROI Enhancement: Process Metrics Section */}
                <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'rgba(59, 130, 246, 0.03)', borderRadius: 'var(--border-radius)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                  <h5 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ⚡ Process Baseline Metrics <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>(Optional - for ROI calculations)</span>
                  </h5>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Current Cycle Time
                      </label>
                      <input
                        type="text"
                        className={styles.editableInput}
                        value={initiative.processMetrics?.currentCycleTime || ''}
                        onChange={(e) => updateProcessMetrics(index, 'currentCycleTime', e.target.value)}
                        placeholder="e.g., 5 days, 2 hours, 45 minutes"
                      />
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Current Volume
                      </label>
                      <input
                        type="text"
                        className={styles.editableInput}
                        value={initiative.processMetrics?.currentVolume || ''}
                        onChange={(e) => updateProcessMetrics(index, 'currentVolume', e.target.value)}
                        placeholder="e.g., 50 per month, daily, weekly"
                      />
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Current Error Rate
                      </label>
                      <input
                        type="text"
                        className={styles.editableInput}
                        value={initiative.processMetrics?.currentErrorRate || ''}
                        onChange={(e) => updateProcessMetrics(index, 'currentErrorRate', e.target.value)}
                        placeholder="e.g., 15%, 3 per week, low/medium/high"
                      />
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Current Cost Level
                      </label>
                      <select
                        className={styles.editableSelect}
                        value={initiative.processMetrics?.currentCost || ''}
                        onChange={(e) => updateProcessMetrics(index, 'currentCost', e.target.value)}
                      >
                        <option value="">Select cost level</option>
                        <option value="low">💚 Low Cost</option>
                        <option value="medium">🟡 Medium Cost</option>
                        <option value="high">🔴 High Cost</option>
                        <option value="very high">🚨 Very High Cost</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Labor Intensity
                      </label>
                      <select
                        className={styles.editableSelect}
                        value={initiative.processMetrics?.laborIntensity || ''}
                        onChange={(e) => updateProcessMetrics(index, 'laborIntensity', e.target.value)}
                      >
                        <option value="">Select intensity</option>
                        <option value="low">🤖 Low - Mostly Automated</option>
                        <option value="medium">⚖️ Medium - Mixed Manual/Auto</option>
                        <option value="high">👥 High - Mostly Manual</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Process Complexity
                      </label>
                      <select
                        className={styles.editableSelect}
                        value={initiative.processMetrics?.processComplexity || ''}
                        onChange={(e) => updateProcessMetrics(index, 'processComplexity', e.target.value)}
                      >
                        <option value="">Select complexity</option>
                        <option value="simple">🟢 Simple - Few Steps</option>
                        <option value="moderate">🟡 Moderate - Some Complexity</option>
                        <option value="complex">🔴 Complex - Many Dependencies</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 🆕 Phase 1 ROI Enhancement: Investment Context Section */}
                <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.03)', borderRadius: 'var(--border-radius)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                  <h5 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    💰 Investment Context <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>(Optional - for ROI planning)</span>
                  </h5>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Budget Range
                      </label>
                      <select
                        className={styles.editableSelect}
                        value={initiative.investmentContext?.budgetRange || ''}
                        onChange={(e) => updateInvestmentContext(index, 'budgetRange', e.target.value)}
                      >
                        <option value="">Select budget range</option>
                        <option value="under $100K">💰 Under $100K</option>
                        <option value="$100K-500K">💰💰 $100K - $500K</option>
                        <option value="$500K-1M">💰💰💰 $500K - $1M</option>
                        <option value="$1M+">💰💰💰💰 $1M+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Timeframe Preference
                      </label>
                      <select
                        className={styles.editableSelect}
                        value={initiative.investmentContext?.timeframePreference || ''}
                        onChange={(e) => updateInvestmentContext(index, 'timeframePreference', e.target.value)}
                      >
                        <option value="">Select timeframe</option>
                        <option value="6 months">⚡ 6 months - Quick Win</option>
                        <option value="1 year">📅 1 year - Standard</option>
                        <option value="18 months">🏗️ 18 months - Comprehensive</option>
                        <option value="flexible">🤷 Flexible - Quality Over Speed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Implementation Readiness
                      </label>
                      <select
                        className={styles.editableSelect}
                        value={initiative.investmentContext?.implementationReadiness || ''}
                        onChange={(e) => updateInvestmentContext(index, 'implementationReadiness', e.target.value)}
                      >
                        <option value="">Select readiness</option>
                        <option value="low">🔴 Low - Need Preparation</option>
                        <option value="medium">🟡 Medium - Some Preparation Needed</option>
                        <option value="high">🟢 High - Ready to Start</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Risk Tolerance
                      </label>
                      <select
                        className={styles.editableSelect}
                        value={initiative.investmentContext?.riskTolerance || ''}
                        onChange={(e) => updateInvestmentContext(index, 'riskTolerance', e.target.value)}
                      >
                        <option value="">Select tolerance</option>
                        <option value="conservative">🛡️ Conservative - Safe Approach</option>
                        <option value="moderate">⚖️ Moderate - Balanced Risk</option>
                        <option value="aggressive">🚀 Aggressive - High Upside</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Success Definition
                      </label>
                      <select
                        className={styles.editableSelect}
                        value={initiative.investmentContext?.successDefinition || ''}
                        onChange={(e) => updateInvestmentContext(index, 'successDefinition', e.target.value)}
                      >
                        <option value="">Select primary goal</option>
                        <option value="cost reduction">💰 Cost Reduction</option>
                        <option value="efficiency gains">⚡ Efficiency Gains</option>
                        <option value="quality improvement">✨ Quality Improvement</option>
                        <option value="revenue growth">📈 Revenue Growth</option>
                        <option value="risk mitigation">🛡️ Risk Mitigation</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ fontSize: '0.875rem', fontWeight: 'var(--font-weight-medium)', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                        Stakeholder Buy-in
                      </label>
                      <select
                        className={styles.editableSelect}
                        value={initiative.investmentContext?.stakeholderBuyIn || ''}
                        onChange={(e) => updateInvestmentContext(index, 'stakeholderBuyIn', e.target.value)}
                      >
                        <option value="">Select buy-in level</option>
                        <option value="low">🔴 Low - Need Convincing</option>
                        <option value="medium">🟡 Medium - Cautiously Supportive</option>
                        <option value="high">🟢 High - Strong Support</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Editable Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                  {/* Left Column: Editable Arrays */}
                  <div>
                    {renderEditableArrayField(
                      initiative.businessProblems || [], 
                      index, 
                      'businessProblems', 
                      'Business Problems', 
                      <AlertTriangle size={16} />,
                      'var(--text-primary)',
                      'Describe a business problem or challenge'
                    )}
                    {renderEditableArrayField(
                      initiative.expectedOutcomes || [], 
                      index, 
                      'expectedOutcomes', 
                      'Expected Outcomes', 
                      <Target size={16} />,
                      'var(--accent-blue)',
                      'Expected outcome or goal'
                    )}
                    {renderEditableArrayField(
                      initiative.successMetrics || [], 
                      index, 
                      'successMetrics', 
                      'Success Metrics', 
                      <TrendingUp size={16} />,
                      'var(--accent-purple)',
                      'KPI or success metric'
                    )}
                  </div>

                  {/* Right Column: Editable Contact */}
                  <div>
                    {renderEditableContactInfo(initiative.contact || { name: '', title: '', email: '', phone: '', linkedin: '' }, index)}
                  </div>
                </div>
              </div>
            ) : (
              /* View Mode - Original Display */
              <div>
                {/* Initiative Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1.3rem' }}>
                      {initiative.initiative}
                    </h3>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {/* Priority Badge */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.25rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--border-radius)',
                        fontSize: '0.75rem',
                        fontWeight: 'var(--font-weight-medium)',
                        backgroundColor: priorityConfig.color.includes('red') ? 'rgba(239, 68, 68, 0.1)' :
                                        priorityConfig.color.includes('yellow') ? 'rgba(245, 158, 11, 0.1)' :
                                        'rgba(16, 185, 129, 0.1)',
                        color: priorityConfig.color.includes('red') ? '#dc2626' :
                               priorityConfig.color.includes('yellow') ? '#d97706' :
                               '#059669'
                      }}>
                        {priorityConfig.label}
                      </div>

                      {/* Status Badge */}
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--border-radius)',
                        fontSize: '0.75rem',
                        fontWeight: 'var(--font-weight-medium)',
                        backgroundColor: statusConfig.bg,
                        color: statusConfig.color
                      }}>
                        {statusConfig.icon}
                        {statusConfig.label}
                      </div>
                    </div>
                  </div>

                  {/* Timeline and Budget */}
                  <div style={{ textAlign: 'right', fontSize: '0.9rem' }}>
                    {initiative.targetTimeline && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Calendar size={14} />
                        <span style={{ color: 'var(--text-secondary)' }}>Target: {initiative.targetTimeline}</span>
                      </div>
                    )}
                    {initiative.estimatedBudget && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <DollarSign size={14} />
                        <span style={{ color: 'var(--text-secondary)' }}>Budget: {initiative.estimatedBudget}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 🆕 ROI Summary Display */}
                {(initiative.processMetrics || initiative.investmentContext) && (
                  <div style={{ 
                    marginBottom: '1.5rem', 
                    padding: '1.25rem', 
                    background: 'rgba(59, 130, 246, 0.02)', 
                    borderRadius: 'var(--border-radius)',
                    border: '1px solid rgba(59, 130, 246, 0.08)'
                  }}>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: '600', 
                      color: 'var(--text-primary)', 
                      marginBottom: '1rem',
                      paddingBottom: '0.5rem',
                      borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem' 
                    }}>
                      💰 ROI Context
                    </div>
                    
                    {/* Process Metrics Row */}
                    {(initiative.processMetrics?.currentCycleTime || initiative.processMetrics?.currentVolume || initiative.processMetrics?.currentCost || initiative.processMetrics?.laborIntensity) && (
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>
                          Process Baseline
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
                          {initiative.processMetrics?.currentCycleTime && (
                            <div style={{ fontSize: '0.85rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Cycle Time</div>
                              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{initiative.processMetrics.currentCycleTime}</div>
                            </div>
                          )}
                          {initiative.processMetrics?.currentVolume && (
                            <div style={{ fontSize: '0.85rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Volume</div>
                              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{initiative.processMetrics.currentVolume}</div>
                            </div>
                          )}
                          {initiative.processMetrics?.currentCost && (
                            <div style={{ fontSize: '0.85rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Cost Level</div>
                              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                                {initiative.processMetrics.currentCost === 'low' ? 'Low Cost' :
                                 initiative.processMetrics.currentCost === 'medium' ? 'Medium Cost' :
                                 initiative.processMetrics.currentCost === 'high' ? 'High Cost' :
                                 initiative.processMetrics.currentCost === 'very high' ? 'Very High Cost' :
                                 initiative.processMetrics.currentCost}
                              </div>
                            </div>
                          )}
                          {initiative.processMetrics?.laborIntensity && (
                            <div style={{ fontSize: '0.85rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Labor Intensity</div>
                              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                                {initiative.processMetrics.laborIntensity === 'low' ? 'Mostly Automated' :
                                 initiative.processMetrics.laborIntensity === 'medium' ? 'Mixed Manual/Auto' :
                                 initiative.processMetrics.laborIntensity === 'high' ? 'Mostly Manual' :
                                 initiative.processMetrics.laborIntensity}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Investment Context Row */}
                    {(initiative.investmentContext?.budgetRange || initiative.investmentContext?.timeframePreference || initiative.investmentContext?.implementationReadiness || initiative.investmentContext?.successDefinition) && (
                      <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>
                          Investment Planning
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
                          {initiative.investmentContext?.budgetRange && (
                            <div style={{ fontSize: '0.85rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Budget Range</div>
                              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{initiative.investmentContext.budgetRange}</div>
                            </div>
                          )}
                          {initiative.investmentContext?.timeframePreference && (
                            <div style={{ fontSize: '0.85rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Timeline</div>
                              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{initiative.investmentContext.timeframePreference}</div>
                            </div>
                          )}
                          {initiative.investmentContext?.implementationReadiness && (
                            <div style={{ fontSize: '0.85rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Readiness</div>
                              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                                {initiative.investmentContext.implementationReadiness === 'low' ? 'Need Preparation' :
                                 initiative.investmentContext.implementationReadiness === 'medium' ? 'Some Prep Needed' :
                                 initiative.investmentContext.implementationReadiness === 'high' ? 'Ready to Start' :
                                 initiative.investmentContext.implementationReadiness}
                              </div>
                            </div>
                          )}
                          {initiative.investmentContext?.successDefinition && (
                            <div style={{ fontSize: '0.85rem', padding: '0.5rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Success Goal</div>
                              <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                                {initiative.investmentContext.successDefinition === 'cost reduction' ? 'Cost Reduction' :
                                 initiative.investmentContext.successDefinition === 'efficiency gains' ? 'Efficiency Gains' :
                                 initiative.investmentContext.successDefinition === 'quality improvement' ? 'Quality Improvement' :
                                 initiative.investmentContext.successDefinition === 'revenue growth' ? 'Revenue Growth' :
                                 initiative.investmentContext.successDefinition === 'risk mitigation' ? 'Risk Mitigation' :
                                 initiative.investmentContext.successDefinition}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Initiative Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                  {/* Left Column: Problems, Outcomes, Metrics */}
                  <div>
                    {renderBusinessProblems(initiative.businessProblems || [])}
                    {renderExpectedOutcomes(initiative.expectedOutcomes || [])}
                    {renderSuccessMetrics(initiative.successMetrics || [])}
                  </div>

                  {/* Right Column: Contact */}
                  <div>
                    {renderContactInfo(initiative.contact)}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AnalysisTab; 