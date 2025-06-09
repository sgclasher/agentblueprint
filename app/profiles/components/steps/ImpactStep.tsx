'use client';

import React, { FC, ChangeEvent } from 'react';
import { Profile, ValueSellingFramework } from '../../../services/types';
import styles from './ImpactStep.module.css';

interface StepProps {
    data: Profile;
    updateData: (path: string, value: any) => void;
}

const ImpactStep: FC<StepProps> = ({ data, updateData }) => {
    return (
      <div className={styles.wizardStep}>
        <h2>Impact Analysis</h2>
        <p>Quantify the cost of current challenges.</p>
        
        <div className={styles.formSection}>
          <h3>Hard Costs (Annual)</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="laborCosts">Labor costs from manual processes ($)</label>
              <input
                id="laborCosts"
                type="number"
                value={data.valueSellingFramework?.impact?.laborCosts || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.impact.laborCosts', e.target.value)}
                placeholder="450000"
                className={styles.formInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="errorCosts">Error correction costs ($)</label>
              <input
                id="errorCosts"
                type="number"
                value={data.valueSellingFramework?.impact?.errorCosts || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.impact.errorCosts', e.target.value)}
                placeholder="75000"
                className={styles.formInput}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="downtimeCosts">System downtime costs ($)</label>
              <input
                id="downtimeCosts"
                type="number"
                value={data.valueSellingFramework?.impact?.downtimeCosts || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.impact.downtimeCosts', e.target.value)}
                placeholder="120000"
                className={styles.formInput}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="complianceCosts">Compliance penalties/risk ($)</label>
              <input
                id="complianceCosts"
                type="number"
                value={data.valueSellingFramework?.impact?.complianceCosts || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.impact.complianceCosts', e.target.value)}
                placeholder="25000"
                className={styles.formInput}
              />
            </div>
          </div>
        </div>
  
        <div className={styles.formSection}>
          <h3>Soft Costs</h3>
          <div className={styles.formGrid}>
            {[
              { key: 'employeeImpact', label: 'Employee frustration/turnover impact' },
              { key: 'customerImpact', label: 'Customer satisfaction impact' },
              { key: 'competitiveImpact', label: 'Competitive disadvantage' },
              { key: 'reputationRisk', label: 'Brand/reputation risk' }
            ].map(({ key, label }) => (
              <div key={key} className={styles.formGroup}>
                <label>{label}</label>
                <select
                  value={data.valueSellingFramework?.impact?.[key as keyof ValueSellingFramework['impact']] || ''}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => updateData(`valueSellingFramework.impact.${key}`, e.target.value)}
                  className={styles.formSelect}
                >
                  <option value="">Select impact level</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="totalAnnualImpact">Total Estimated Annual Impact ($) *</label>
          <input
            id="totalAnnualImpact"
            type="number"
            value={data.valueSellingFramework?.impact?.totalAnnualImpact || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.impact.totalAnnualImpact', e.target.value)}
            placeholder="850000"
            required
            className={styles.formInput}
          />
        </div>
      </div>
    );
  }

  export default ImpactStep; 