'use client';

import React, { FC, ChangeEvent } from 'react';
import { Profile } from '../../../services/types';
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

  const companySizes = [
    '1-50 employees',
    '51-200 employees',
    '201-1000 employees',
    '1000+ employees'
  ];

  return (
    <div className={styles.wizardStep}>
      <h2>Company Overview</h2>
      <p>Let's start with basic information about your client.</p>

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
          <label>Company Size *</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {companySizes.map(size => (
              <label key={size} className={`${styles.radioLabel} ${data.size === size ? styles.radioLabelSelected : ''}`}>
                <input
                  type="radio"
                  name="companySize"
                  value={size}
                  checked={data.size === size}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('size', e.target.value)}
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="annualRevenue">Annual Revenue</label>
          <input
            id="annualRevenue"
            type="text"
            value={data.annualRevenue || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('annualRevenue', e.target.value)}
            placeholder="e.g., 50M, 1.2B"
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="employeeCount">Employee Count</label>
          <input
            id="employeeCount"
            type="number"
            value={data.employeeCount || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('employeeCount', e.target.value)}
            placeholder="Number of employees"
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
      </div>
    </div>
  );
}

export default CompanyOverviewStep; 