'use client';

import React, { FC, ChangeEvent } from 'react';
import { Profile, StrategicInitiative } from '../../../services/types';
import styles from './CompanyOverviewStep.module.css';

interface StepProps {
    data: Profile;
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
              value={data.companyName || ''}
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
              value={data.industry || ''}
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
              value={data.employeeCount || ''}
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
              value={data.annualRevenue || ''}
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
              value={data.primaryLocation || ''}
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
              value={data.websiteUrl || ''}
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
        
        {data.strategicInitiatives?.map((initiative, index) => (
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

            {/* Business Problems Section */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h5 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600' }}>
                  Business Problems
                </h5>
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
                  No business problems added yet. Click "Add Problem" to start.
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
                        title="Remove problem"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {(initiative.businessProblems || []).length > 0 && (
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--text-secondary)', 
                  margin: '0.75rem 0 0 0',
                  lineHeight: '1.4'
                }}>
                  💡 Tip: Be specific about problems this initiative aims to solve (e.g., "Customer support response time averages 24 hours").
                </p>
              )}
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
    </div>
  );
}

export default CompanyOverviewStep; 