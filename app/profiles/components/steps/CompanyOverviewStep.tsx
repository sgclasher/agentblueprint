'use client';

import React, { FC, ChangeEvent } from 'react';
import { Profile, StrategicInitiative, SystemApplication } from '../../../services/types';
import styles from './CompanyOverviewStep.module.css';

interface StepProps {
    data: Partial<Profile>;
    updateData: (path: string, value: any) => void;
}

const CompanyOverviewStep: FC<StepProps> = ({ data, updateData }) => {
  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail',
    'Education', 'Real Estate', 'Transportation', 'Energy', 'Other'
  ];

  const addStrategicInitiative = () => {
    const currentInitiatives = data.strategicInitiatives || [];
    const newInitiative: StrategicInitiative = {
      initiative: '',
      contact: {
        name: '',
        title: '',
        email: '',
        linkedin: '',
        phone: ''
      },
      businessProblems: []
    };
    updateData('strategicInitiatives', [...currentInitiatives, newInitiative]);
  };

  const updateStrategicInitiative = (index: number, field: string, value: string) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    
    if (field.startsWith('contact.')) {
      const contactField = field.replace('contact.', '');
      updatedInitiatives[index] = {
        ...updatedInitiatives[index],
        contact: {
          ...updatedInitiatives[index].contact,
          [contactField]: value
        }
      };
    } else {
      updatedInitiatives[index] = {
        ...updatedInitiatives[index],
        [field]: value
      };
    }
    
    updateData('strategicInitiatives', updatedInitiatives);
  };

  const removeStrategicInitiative = (index: number) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = currentInitiatives.filter((_, i) => i !== index);
    updateData('strategicInitiatives', updatedInitiatives);
  };

  const addBusinessProblem = (initiativeIndex: number) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentProblems = updatedInitiatives[initiativeIndex].businessProblems || [];
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      businessProblems: [...currentProblems, '']
    };
    updateData('strategicInitiatives', updatedInitiatives);
  };

  const removeBusinessProblem = (initiativeIndex: number, problemIndex: number) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentProblems = updatedInitiatives[initiativeIndex].businessProblems || [];
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      businessProblems: currentProblems.filter((_, i) => i !== problemIndex)
    };
    updateData('strategicInitiatives', updatedInitiatives);
  };

  const updateBusinessProblem = (initiativeIndex: number, problemIndex: number, value: string) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentProblems = [...(updatedInitiatives[initiativeIndex].businessProblems || [])];
    currentProblems[problemIndex] = value;
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      businessProblems: currentProblems
    };
    updateData('strategicInitiatives', updatedInitiatives);
  };

  // 🆕 Phase 1: Business Intelligence Helper Functions
  const addExpectedOutcome = (initiativeIndex: number) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentOutcomes = updatedInitiatives[initiativeIndex].expectedOutcomes || [];
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      expectedOutcomes: [...currentOutcomes, '']
    };
    updateData('strategicInitiatives', updatedInitiatives);
  };

  const removeExpectedOutcome = (initiativeIndex: number, outcomeIndex: number) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentOutcomes = updatedInitiatives[initiativeIndex].expectedOutcomes || [];
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      expectedOutcomes: currentOutcomes.filter((_, i) => i !== outcomeIndex)
    };
    updateData('strategicInitiatives', updatedInitiatives);
  };

  const updateExpectedOutcome = (initiativeIndex: number, outcomeIndex: number, value: string) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentOutcomes = [...(updatedInitiatives[initiativeIndex].expectedOutcomes || [])];
    currentOutcomes[outcomeIndex] = value;
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      expectedOutcomes: currentOutcomes
    };
    updateData('strategicInitiatives', updatedInitiatives);
  };

  const addSuccessMetric = (initiativeIndex: number) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentMetrics = updatedInitiatives[initiativeIndex].successMetrics || [];
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      successMetrics: [...currentMetrics, '']
    };
    updateData('strategicInitiatives', updatedInitiatives);
  };

  const removeSuccessMetric = (initiativeIndex: number, metricIndex: number) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentMetrics = updatedInitiatives[initiativeIndex].successMetrics || [];
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      successMetrics: currentMetrics.filter((_, i) => i !== metricIndex)
    };
    updateData('strategicInitiatives', updatedInitiatives);
  };

  const updateSuccessMetric = (initiativeIndex: number, metricIndex: number, value: string) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentMetrics = [...(updatedInitiatives[initiativeIndex].successMetrics || [])];
    currentMetrics[metricIndex] = value;
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      successMetrics: currentMetrics
    };
    updateData('strategicInitiatives', updatedInitiatives);
  };

  // 🆕 Systems & Applications Management Functions
  const addSystemApplication = () => {
    const currentSystems = data.systemsAndApplications || [];
    const newSystem: SystemApplication = {
      name: '',
      category: '',
      vendor: '',
      version: '',
      description: '',
      criticality: undefined,
    };
    updateData('systemsAndApplications', [...currentSystems, newSystem]);
  };

  const updateSystemApplication = (index: number, field: string, value: string) => {
    const currentSystems = [...(data.systemsAndApplications || [])];
    currentSystems[index] = {
      ...currentSystems[index],
      [field]: value,
    };
    updateData('systemsAndApplications', currentSystems);
  };

  const removeSystemApplication = (index: number) => {
    const currentSystems = data.systemsAndApplications || [];
    const updatedSystems = currentSystems.filter((_, i) => i !== index);
    updateData('systemsAndApplications', updatedSystems);
  };

  // 🆕 Phase 1 ROI Enhancement: Process Metrics Helper Functions
  const updateProcessMetrics = (initiativeIndex: number, field: string, value: string) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentMetrics = updatedInitiatives[initiativeIndex].processMetrics || {};
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      processMetrics: {
        ...currentMetrics,
        [field]: value
      }
    };
    updateData('strategicInitiatives', updatedInitiatives);
  };

  // 🆕 Phase 1 ROI Enhancement: Investment Context Helper Functions
  const updateInvestmentContext = (initiativeIndex: number, field: string, value: string) => {
    const currentInitiatives = data.strategicInitiatives || [];
    const updatedInitiatives = [...currentInitiatives];
    const currentContext = updatedInitiatives[initiativeIndex].investmentContext || {};
    updatedInitiatives[initiativeIndex] = {
      ...updatedInitiatives[initiativeIndex],
      investmentContext: {
        ...currentContext,
        [field]: value
      }
    };
    updateData('strategicInitiatives', updatedInitiatives);
  };

  return (
    <div className={styles.wizardStep}>
      <h2>Company Profile</h2>
      <p>Enter the essential information about your client company.</p>

      {/* Basic Company Information */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Basic Information</h3>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="companyName">Company Name *</label>
            <input
              id="companyName"
              type="text"
              value={data?.companyName || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('companyName', e.target.value)}
              placeholder="Enter company name"
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="industry">Industry *</label>
            <select
              id="industry"
              value={data?.industry || ''}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => updateData('industry', e.target.value)}
              required
              className={styles.formSelect}
            >
              <option value="">Select industry</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="employeeCount">Employee Count</label>
            <input
              id="employeeCount"
              type="text"
              value={data?.employeeCount || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('employeeCount', e.target.value)}
              placeholder="e.g., 500, 10,000+, 50-100"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="annualRevenue">Annual Revenue</label>
            <input
              id="annualRevenue"
              type="text"
              value={data?.annualRevenue || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('annualRevenue', e.target.value)}
              placeholder="e.g., $50M, $1.2B"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="primaryLocation">Primary Location</label>
            <input
              id="primaryLocation"
              type="text"
              value={data?.primaryLocation || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('primaryLocation', e.target.value)}
              placeholder="City, State/Country"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="websiteUrl">Website URL</label>
            <input
              id="websiteUrl"
              type="url"
              value={data?.websiteUrl || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('websiteUrl', e.target.value)}
              placeholder="https://company.com"
              className={styles.formInput}
            />
          </div>
        </div>
      </div>

      {/* Strategic Initiatives */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Strategic Initiatives</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Add key business initiatives and their primary contacts.
        </p>
        
        {data?.strategicInitiatives?.map((initiative, index) => (
          <div key={index} style={{ 
            border: '1px solid var(--border-primary)', 
            borderRadius: '8px', 
            padding: '1rem', 
            marginBottom: '1rem',
            background: 'var(--bg-secondary)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>Initiative {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeStrategicInitiative(index)}
                style={{
                  background: 'var(--accent-red)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                <label>Initiative Name</label>
                <input
                  type="text"
                  value={initiative.initiative || ''}
                  onChange={(e) => updateStrategicInitiative(index, 'initiative', e.target.value)}
                  placeholder="e.g., Digital Transformation Program"
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Contact Name</label>
                <input
                  type="text"
                  value={initiative.contact?.name || ''}
                  onChange={(e) => updateStrategicInitiative(index, 'contact.name', e.target.value)}
                  placeholder="John Smith"
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Title</label>
                <input
                  type="text"
                  value={initiative.contact?.title || ''}
                  onChange={(e) => updateStrategicInitiative(index, 'contact.title', e.target.value)}
                  placeholder="CTO"
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  value={initiative.contact?.email || ''}
                  onChange={(e) => updateStrategicInitiative(index, 'contact.email', e.target.value)}
                  placeholder="john@company.com"
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>LinkedIn</label>
                <input
                  type="text"
                  value={initiative.contact?.linkedin || ''}
                  onChange={(e) => updateStrategicInitiative(index, 'contact.linkedin', e.target.value)}
                  placeholder="linkedin.com/in/johnsmith"
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Phone</label>
                <input
                  type="tel"
                  value={initiative.contact?.phone || ''}
                  onChange={(e) => updateStrategicInitiative(index, 'contact.phone', e.target.value)}
                  placeholder="+1-555-0123"
                  className={styles.formInput}
                />
              </div>
            </div>

            {/* Business Intelligence Section */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-primary)' }}>
              <h5 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                📊 Business Intelligence
              </h5>
              
              {/* Priority, Status, Timeline, Budget Row */}
              <div className={styles.formGrid} style={{ marginBottom: '1.5rem' }}>
                <div className={styles.formGroup}>
                  <label>Priority</label>
                  <select
                    value={initiative.priority || ''}
                    onChange={(e) => updateStrategicInitiative(index, 'priority', e.target.value)}
                    className={styles.formSelect}
                  >
                    <option value="">Select priority</option>
                    <option value="High">🔥 High</option>
                    <option value="Medium">⚡ Medium</option>
                    <option value="Low">📋 Low</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Status</label>
                  <select
                    value={initiative.status || ''}
                    onChange={(e) => updateStrategicInitiative(index, 'status', e.target.value)}
                    className={styles.formSelect}
                  >
                    <option value="">Select status</option>
                    <option value="Planning">📝 Planning</option>
                    <option value="In Progress">🚀 In Progress</option>
                    <option value="On Hold">⏸️ On Hold</option>
                    <option value="Completed">✅ Completed</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Target Timeline</label>
                  <input
                    type="text"
                    value={initiative.targetTimeline || ''}
                    onChange={(e) => updateStrategicInitiative(index, 'targetTimeline', e.target.value)}
                    placeholder="e.g., Q3 2025, 18 months"
                    className={styles.formInput}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label>Estimated Budget</label>
                  <input
                    type="text"
                    value={initiative.estimatedBudget || ''}
                    onChange={(e) => updateStrategicInitiative(index, 'estimatedBudget', e.target.value)}
                    placeholder="e.g., $500K, $2M-5M"
                    className={styles.formInput}
                  />
                </div>
              </div>

              {/* Business Problems Section */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h6 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    🚨 Business Problems
                  </h6>
                  <button
                    type="button"
                    onClick={() => addBusinessProblem(index)}
                    style={{
                      background: 'var(--accent-green)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span>+</span> Add Problem
                  </button>
                </div>
                
                {(initiative.businessProblems || []).length === 0 ? (
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--text-secondary)', 
                    fontStyle: 'italic',
                    margin: '0.5rem 0'
                  }}>
                    No business problems added yet. Click &quot;Add Problem&quot; to start.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {(initiative.businessProblems || []).map((problem, problemIndex) => (
                      <div key={problemIndex} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <input
                          type="text"
                          value={problem}
                          onChange={(e) => updateBusinessProblem(index, problemIndex, e.target.value)}
                          placeholder="e.g., Manual data entry causing delays and errors"
                          className={styles.formInput}
                          style={{ flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => removeBusinessProblem(index, problemIndex)}
                          data-testid={`remove-problem-${index}-${problemIndex}`}
                          style={{
                            background: 'var(--accent-red)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '0.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Expected Outcomes Section */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h6 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    🎯 Expected Outcomes
                  </h6>
                  <button
                    type="button"
                    onClick={() => addExpectedOutcome(index)}
                    style={{
                      background: 'var(--accent-blue)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span>+</span> Add Outcome
                  </button>
                </div>
                
                {(initiative.expectedOutcomes || []).length === 0 ? (
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--text-secondary)', 
                    fontStyle: 'italic',
                    margin: '0.5rem 0'
                  }}>
                    No expected outcomes added yet. Click &quot;Add Outcome&quot; to start.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {(initiative.expectedOutcomes || []).map((outcome, outcomeIndex) => (
                      <div key={outcomeIndex} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <input
                          type="text"
                          value={outcome}
                          onChange={(e) => updateExpectedOutcome(index, outcomeIndex, e.target.value)}
                          placeholder="e.g., Reduce operational costs by 25%"
                          className={styles.formInput}
                          style={{ flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => removeExpectedOutcome(index, outcomeIndex)}
                          style={{
                            background: 'var(--accent-red)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '0.5rem',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            minWidth: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Remove outcome"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Success Metrics Section */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h6 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                    📈 Success Metrics
                  </h6>
                  <button
                    type="button"
                    onClick={() => addSuccessMetric(index)}
                    style={{
                      background: 'var(--accent-purple, #8b5cf6)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span>+</span> Add Metric
                  </button>
                </div>
                
                {(initiative.successMetrics || []).length === 0 ? (
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--text-secondary)', 
                    fontStyle: 'italic',
                    margin: '0.5rem 0'
                  }}>
                    No success metrics added yet. Click &quot;Add Metric&quot; to start.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {(initiative.successMetrics || []).map((metric, metricIndex) => (
                      <div key={metricIndex} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                        <input
                          type="text"
                          value={metric}
                          onChange={(e) => updateSuccessMetric(index, metricIndex, e.target.value)}
                          placeholder="e.g., Customer satisfaction > 8.5"
                          className={styles.formInput}
                          style={{ flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => removeSuccessMetric(index, metricIndex)}
                          style={{
                            background: 'var(--accent-red)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '0.5rem',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            minWidth: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Remove metric"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 🆕 Phase 1 ROI Enhancement: Process Metrics Section */}
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <h6 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                  ⚡ Process Baseline Metrics <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>(Optional - for ROI calculations)</span>
                </h6>
                
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Current Cycle Time</label>
                    <input
                      type="text"
                      value={initiative.processMetrics?.currentCycleTime || ''}
                      onChange={(e) => updateProcessMetrics(index, 'currentCycleTime', e.target.value)}
                      placeholder="e.g., 5 days, 2 hours, 45 minutes"
                      className={styles.formInput}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Current Volume</label>
                    <input
                      type="text"
                      value={initiative.processMetrics?.currentVolume || ''}
                      onChange={(e) => updateProcessMetrics(index, 'currentVolume', e.target.value)}
                      placeholder="e.g., 50 per month, daily, weekly"
                      className={styles.formInput}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Current Error Rate</label>
                    <input
                      type="text"
                      value={initiative.processMetrics?.currentErrorRate || ''}
                      onChange={(e) => updateProcessMetrics(index, 'currentErrorRate', e.target.value)}
                      placeholder="e.g., 15%, 3 per week, low/medium/high"
                      className={styles.formInput}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Current Cost Level</label>
                    <select
                      value={initiative.processMetrics?.currentCost || ''}
                      onChange={(e) => updateProcessMetrics(index, 'currentCost', e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Select cost level</option>
                      <option value="low">💚 Low Cost</option>
                      <option value="medium">🟡 Medium Cost</option>
                      <option value="high">🔴 High Cost</option>
                      <option value="very high">🚨 Very High Cost</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Labor Intensity</label>
                    <select
                      value={initiative.processMetrics?.laborIntensity || ''}
                      onChange={(e) => updateProcessMetrics(index, 'laborIntensity', e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Select intensity</option>
                      <option value="low">🤖 Low - Mostly Automated</option>
                      <option value="medium">⚖️ Medium - Mixed Manual/Auto</option>
                      <option value="high">👥 High - Mostly Manual</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Process Complexity</label>
                    <select
                      value={initiative.processMetrics?.processComplexity || ''}
                      onChange={(e) => updateProcessMetrics(index, 'processComplexity', e.target.value)}
                      className={styles.formSelect}
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
              <div style={{ marginBottom: '1.5rem' }}>
                <h6 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                  💰 Investment Context <span style={{ fontSize: '0.8rem', fontWeight: 'normal', color: 'var(--text-secondary)' }}>(Optional - for ROI planning)</span>
                </h6>
                
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Budget Range</label>
                    <select
                      value={initiative.investmentContext?.budgetRange || ''}
                      onChange={(e) => updateInvestmentContext(index, 'budgetRange', e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Select budget range</option>
                      <option value="under $100K">💰 Under $100K</option>
                      <option value="$100K-500K">💰💰 $100K - $500K</option>
                      <option value="$500K-1M">💰💰💰 $500K - $1M</option>
                      <option value="$1M+">💰💰💰💰 $1M+</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Timeframe Preference</label>
                    <select
                      value={initiative.investmentContext?.timeframePreference || ''}
                      onChange={(e) => updateInvestmentContext(index, 'timeframePreference', e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Select timeframe</option>
                      <option value="6 months">⚡ 6 months - Quick Win</option>
                      <option value="1 year">📅 1 year - Standard</option>
                      <option value="18 months">🏗️ 18 months - Comprehensive</option>
                      <option value="flexible">🤷 Flexible - Quality Over Speed</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Implementation Readiness</label>
                    <select
                      value={initiative.investmentContext?.implementationReadiness || ''}
                      onChange={(e) => updateInvestmentContext(index, 'implementationReadiness', e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Select readiness</option>
                      <option value="low">🔴 Low - Need Preparation</option>
                      <option value="medium">🟡 Medium - Some Preparation Needed</option>
                      <option value="high">🟢 High - Ready to Start</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Risk Tolerance</label>
                    <select
                      value={initiative.investmentContext?.riskTolerance || ''}
                      onChange={(e) => updateInvestmentContext(index, 'riskTolerance', e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Select tolerance</option>
                      <option value="conservative">🛡️ Conservative - Safe Approach</option>
                      <option value="moderate">⚖️ Moderate - Balanced Risk</option>
                      <option value="aggressive">🚀 Aggressive - High Upside</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Success Definition</label>
                    <select
                      value={initiative.investmentContext?.successDefinition || ''}
                      onChange={(e) => updateInvestmentContext(index, 'successDefinition', e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Select primary goal</option>
                      <option value="cost reduction">💰 Cost Reduction</option>
                      <option value="efficiency gains">⚡ Efficiency Gains</option>
                      <option value="quality improvement">✨ Quality Improvement</option>
                      <option value="revenue growth">📈 Revenue Growth</option>
                      <option value="risk mitigation">🛡️ Risk Mitigation</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Stakeholder Buy-in</label>
                    <select
                      value={initiative.investmentContext?.stakeholderBuyIn || ''}
                      onChange={(e) => updateInvestmentContext(index, 'stakeholderBuyIn', e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="">Select buy-in level</option>
                      <option value="low">🔴 Low - Need Convincing</option>
                      <option value="medium">🟡 Medium - Cautiously Supportive</option>
                      <option value="high">🟢 High - Strong Support</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <p style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-secondary)', 
                margin: '1rem 0 0 0',
                lineHeight: '1.4'
              }}>
                💡 Tip: Add specific, measurable outcomes and metrics to track initiative success. The process metrics and investment context help generate more accurate ROI projections.
              </p>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addStrategicInitiative}
          style={{
            background: 'var(--accent-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>+</span> Add Strategic Initiative
        </button>
      </div>

      {/* Systems & Applications */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Systems & Applications</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Add key systems, applications, and technology infrastructure used by the client.
        </p>
        
        {(data?.systemsAndApplications || []).map((system, index) => (
          <div key={index} style={{ 
            border: '1px solid var(--border-primary)', 
            borderRadius: '8px', 
            padding: '1rem', 
            marginBottom: '1rem',
            background: 'var(--bg-secondary)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>System {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeSystemApplication(index)}
                style={{
                  background: 'var(--accent-red)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.25rem 0.5rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>System Name *</label>
                <input
                  type="text"
                  value={system.name || ''}
                  onChange={(e) => updateSystemApplication(index, 'name', e.target.value)}
                  placeholder="e.g., Salesforce CRM, SAP ERP"
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Category</label>
                <select
                  value={system.category || ''}
                  onChange={(e) => updateSystemApplication(index, 'category', e.target.value)}
                  className={styles.formSelect}
                >
                  <option value="">Select category</option>
                  <option value="CRM">🤝 CRM</option>
                  <option value="ERP">🏭 ERP</option>
                  <option value="Cloud Platform">☁️ Cloud Platform</option>
                  <option value="Database">🗄️ Database</option>
                  <option value="Analytics">📊 Analytics</option>
                  <option value="Communication">💬 Communication</option>
                  <option value="Security">🔒 Security</option>
                  <option value="DevOps">⚙️ DevOps</option>
                  <option value="Other">📱 Other</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Vendor</label>
                <input
                  type="text"
                  value={system.vendor || ''}
                  onChange={(e) => updateSystemApplication(index, 'vendor', e.target.value)}
                  placeholder="e.g., Salesforce, Microsoft, SAP"
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Version/Edition</label>
                <input
                  type="text"
                  value={system.version || ''}
                  onChange={(e) => updateSystemApplication(index, 'version', e.target.value)}
                  placeholder="e.g., Enterprise, v2023.1, Cloud"
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                <label>Description</label>
                <input
                  type="text"
                  value={system.description || ''}
                  onChange={(e) => updateSystemApplication(index, 'description', e.target.value)}
                  placeholder="Brief description of how this system is used"
                  className={styles.formInput}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Business Criticality</label>
                <select
                  value={system.criticality || ''}
                  onChange={(e) => updateSystemApplication(index, 'criticality', e.target.value)}
                  className={styles.formSelect}
                >
                  <option value="">Select criticality</option>
                  <option value="High">🔥 High - Mission Critical</option>
                  <option value="Medium">⚡ Medium - Important</option>
                  <option value="Low">📋 Low - Supporting</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addSystemApplication}
          style={{
            background: 'var(--accent-green)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span>+</span> Add System/Application
        </button>
      </div>
    </div>
  );
}

export default CompanyOverviewStep; 