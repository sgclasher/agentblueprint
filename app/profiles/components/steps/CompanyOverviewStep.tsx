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

  // 🆕 Progressive Complexity - Business Objectives Management
  const addBusinessObjective = () => {
    const currentObjectives = data.businessObjectives || [];
    const newObjective = { objective: '', targetMetric: '' };
    updateData('businessObjectives', [...currentObjectives, newObjective]);
  };

  const updateBusinessObjective = (index: number, field: string, value: string) => {
    const currentObjectives = [...(data.businessObjectives || [])];
    currentObjectives[index] = {
      ...currentObjectives[index],
      [field]: value,
    };
    updateData('businessObjectives', currentObjectives);
  };

  const removeBusinessObjective = (index: number) => {
    const currentObjectives = data.businessObjectives || [];
    const updatedObjectives = currentObjectives.filter((_, i) => i !== index);
    updateData('businessObjectives', updatedObjectives);
  };

  // 🆕 Progressive Complexity - Business Goals Management (SMB)
  const addBusinessGoal = () => {
    const currentGoals = data.businessGoals || [];
    updateData('businessGoals', [...currentGoals, '']);
  };

  const updateBusinessGoal = (index: number, value: string) => {
    const currentGoals = [...(data.businessGoals || [])];
    currentGoals[index] = value;
    updateData('businessGoals', currentGoals);
  };

  const removeBusinessGoal = (index: number) => {
    const currentGoals = data.businessGoals || [];
    const updatedGoals = currentGoals.filter((_, i) => i !== index);
    updateData('businessGoals', updatedGoals);
  };

  // 🆕 Progressive Complexity - Key Challenges Management (SMB)
  const addKeyChallenge = () => {
    const currentChallenges = data.keyChallenges || [];
    updateData('keyChallenges', [...currentChallenges, '']);
  };

  const updateKeyChallenge = (index: number, value: string) => {
    const currentChallenges = [...(data.keyChallenges || [])];
    currentChallenges[index] = value;
    updateData('keyChallenges', currentChallenges);
  };

  const removeKeyChallenge = (index: number) => {
    const currentChallenges = data.keyChallenges || [];
    const updatedChallenges = currentChallenges.filter((_, i) => i !== index);
    updateData('keyChallenges', updatedChallenges);
  };

  // 🆕 Progressive Complexity - Helper Functions
  const getAutoGenerationPreview = () => {
    if (!data.businessGoals || data.businessGoals.length === 0) return null;
    
    const goal = data.businessGoals[0];
    if (goal.toLowerCase().includes('cost')) {
      return 'Cost Reduction Program';
    } else if (goal.toLowerCase().includes('revenue')) {
      return 'Revenue Growth Program';
    } else if (goal.toLowerCase().includes('efficiency')) {
      return 'Operational Efficiency Program';
    }
    return 'Strategic Business Program';
  };

  const isValidForCompanySize = (size: string | undefined) => {
    return size === 'SMB' || size === 'Mid-Market' || size === 'Enterprise';
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

      {/* 🆕 Progressive Complexity - Company Size Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Company Size & Approach</h3>
        <div className={styles.formGroup}>
          <label htmlFor="companySize">Company Size *</label>
          <select
            id="companySize"
            value={data?.companySize || ''}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => updateData('companySize', e.target.value)}
            required
            className={styles.formSelect}
          >
            <option value="">Select company size</option>
            <option value="SMB">🏢 Small-Medium Business (1-500 employees)</option>
            <option value="Mid-Market">🏭 Mid-Market (500-5,000 employees)</option>
            <option value="Enterprise">🏛️ Enterprise (5,000+ employees)</option>
          </select>
        </div>
        
        {!isValidForCompanySize(data?.companySize) && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-primary)', 
            borderRadius: '8px',
            marginTop: '1rem'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Select your company size</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              This determines the complexity of the form and helps us tailor AI recommendations to your business needs.
            </p>
          </div>
        )}
      </div>

      {/* 🆕 Progressive Complexity - Adaptive Business Planning Sections */}
      {data?.companySize === 'SMB' && (
        <>
          {/* SMB Mode - Business Goals */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Business Goals</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              💡 Keep it simple! What are your main business goals? We'll structure the details for you.
            </p>
            
            {(data?.businessGoals || []).map((goal, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => updateBusinessGoal(index, e.target.value)}
                  placeholder="e.g., Reduce production costs by 20%"
                  className={styles.formInput}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => removeBusinessGoal(index)}
                  style={{
                    background: 'var(--accent-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addBusinessGoal}
              style={{
                background: 'var(--accent-blue)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>+</span> Add Goal
            </button>

            {(!data?.businessGoals || data.businessGoals.length === 0) && (
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'var(--text-secondary)', 
                fontStyle: 'italic',
                marginTop: '0.5rem'
              }}>
                At least one business goal is recommended to generate AI insights.
              </p>
            )}
          </div>

          {/* SMB Mode - Key Challenges */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Key Challenges</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              What are your biggest operational challenges? This helps us match AI solutions to your specific problems.
            </p>
            
            {(data?.keyChallenges || []).map((challenge, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  value={challenge}
                  onChange={(e) => updateKeyChallenge(index, e.target.value)}
                  placeholder="e.g., Too much manual work in fulfillment"
                  className={styles.formInput}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => removeKeyChallenge(index)}
                  style={{
                    background: 'var(--accent-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addKeyChallenge}
              style={{
                background: 'var(--accent-green)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>+</span> Add Challenge
            </button>
          </div>

          {/* SMB Mode - Auto-Generation Preview */}
          {getAutoGenerationPreview() && (
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'rgba(59, 130, 246, 0.1)', 
              border: '1px solid rgba(59, 130, 246, 0.3)', 
              borderRadius: '8px',
              marginBottom: '2rem'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>🤖 AI will help create:</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Preview: <strong>{getAutoGenerationPreview()}</strong> with structured business intelligence details.
              </p>
            </div>
          )}

          {/* SMB Mode - Progressive Enhancement Hint */}
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-primary)', 
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              💼 Need more detailed planning? 
              <button 
                type="button"
                onClick={() => updateData('companySize', 'Enterprise')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--accent-blue)', 
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Switch to Enterprise mode
              </button> for full strategic initiative management.
            </p>
          </div>
        </>
      )}

      {(data?.companySize === 'Mid-Market' || data?.companySize === 'Enterprise') && (
        <>
          {/* Enterprise Mode - Business Objectives */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Business Objectives</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              📈 Define high-level strategic objectives that guide your business initiatives.
            </p>
            
            {(data?.businessObjectives || []).map((objective, index) => (
              <div key={index} style={{ 
                border: '1px solid var(--border-primary)', 
                borderRadius: '8px', 
                padding: '1rem', 
                marginBottom: '1rem',
                background: 'var(--bg-secondary)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>Objective {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeBusinessObjective(index)}
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
                    <label>Objective</label>
                    <input
                      type="text"
                      value={objective.objective || ''}
                      onChange={(e) => updateBusinessObjective(index, 'objective', e.target.value)}
                      placeholder="e.g., Increase operational efficiency by 30%"
                      className={styles.formInput}
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label>Target Metric</label>
                    <input
                      type="text"
                      value={objective.targetMetric || ''}
                      onChange={(e) => updateBusinessObjective(index, 'targetMetric', e.target.value)}
                      placeholder="e.g., 30% efficiency gain"
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addBusinessObjective}
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
              <span>+</span> Add Objective
            </button>
          </div>

          {/* Enterprise Mode - Detailed Strategic Planning Note */}
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-primary)', 
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              📋 Detailed strategic planning mode enabled. Use the Strategic Initiatives section below for full program management with contacts, budgets, and timelines.
            </p>
          </div>
        </>
      )}

      {/* Data Preservation Notice */}
      {data?.businessGoals && data.businessGoals.length > 0 && data?.strategicInitiatives && data.strategicInitiatives.length > 0 && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'rgba(34, 197, 94, 0.1)', 
          border: '1px solid rgba(34, 197, 94, 0.3)', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>✅ Data Preserved</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Existing data will be preserved when switching between modes. Your goals and initiatives will be combined intelligently.
          </p>
        </div>
      )}

      {/* Strategic Initiatives */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Strategic Initiatives{data?.companySize === 'SMB' ? ' (Optional)' : ''}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          {data?.companySize === 'SMB' 
            ? "Optional - we&apos;ll help structure these if needed. Add any formal initiatives you already have."
            : "Add key business initiatives and their primary contacts."
          }
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
              
              <p style={{ 
                fontSize: '0.75rem', 
                color: 'var(--text-secondary)', 
                margin: '1rem 0 0 0',
                lineHeight: '1.4'
              }}>
                💡 Tip: Add specific, measurable outcomes and metrics to track initiative success.
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