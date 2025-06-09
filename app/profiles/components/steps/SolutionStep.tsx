'use client';

import React, { FC, ChangeEvent } from 'react';
import { Profile } from '../../../services/types';
import styles from './SolutionStep.module.css';

interface StepProps {
    data: Profile;
    updateData: (path: string, value: any) => void;
    onToggle: (path: string, value: string) => void;
}

const SolutionStep: FC<StepProps> = ({ data, updateData, onToggle }) => {
    const capabilities = [
      'Automate document processing',
      'Streamline approval workflows', 
      'Provide real-time dashboards',
      'Integrate disconnected systems',
      'Enable self-service capabilities',
      'Improve data accuracy',
      'Reduce manual handoffs'
    ];
  
    const differentiationRequirements = [
      'Industry-specific expertise',
      'Rapid implementation (< 6 months)',
      'No-code/low-code platform',
      'Strong integration capabilities',
      'Proven ROI in similar companies',
      'Comprehensive support/training'
    ];
  
    const selectedCapabilities = data.valueSellingFramework?.solutionCapabilities || [];
    const selectedDifferentiators = data.valueSellingFramework?.differentiationRequirements || [];
  
    return (
      <div className={styles.wizardStep}>
        <h2>Solution Requirements</h2>
        <p>What capabilities are needed to solve these challenges?</p>
  
        <div className={styles.formSection}>
          <h3>Solution Capabilities Needed</h3>
          <div className={styles.checkboxGrid}>
            {capabilities.map(capability => (
              <label key={capability} className={`${styles.checkboxCard} ${selectedCapabilities.includes(capability) ? styles.checkboxCardSelected : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedCapabilities.includes(capability)}
                  onChange={() => onToggle('valueSellingFramework.solutionCapabilities', capability)}
                />
                <span className={styles.checkboxText}>{capability}</span>
              </label>
            ))}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="solutionCapabilitiesOther">Other capabilities needed</label>
            <input
              id="solutionCapabilitiesOther"
              type="text"
              value={data.valueSellingFramework?.solutionCapabilitiesOther || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.solutionCapabilitiesOther', e.target.value)}
              placeholder="Specify other capabilities"
              className={styles.formInput}
            />
          </div>
        </div>
  
        <div className={styles.formSection}>
          <h3>Differentiation Requirements</h3>
          <p>What makes a solution uniquely qualified?</p>
          <div className={styles.checkboxGrid}>
            {differentiationRequirements.map(requirement => (
              <label key={requirement} className={`${styles.checkboxCard} ${selectedDifferentiators.includes(requirement) ? styles.checkboxCardSelected : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedDifferentiators.includes(requirement)}
                  onChange={() => onToggle('valueSellingFramework.differentiationRequirements', requirement)}
                />
                <span className={styles.checkboxText}>{requirement}</span>
              </label>
            ))}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="differentiationOther">Other differentiators</label>
            <input
              id="differentiationOther"
              type="text"
              value={data.valueSellingFramework?.differentiationOther || ''}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.differentiationOther', e.target.value)}
              placeholder="Specify other differentiation requirements"
              className={styles.formInput}
            />
          </div>
        </div>
  
        <div className={styles.formSection}>
          <h3>Value / ROI Expectations</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="costReduction">Target cost reduction</label>
              <input
                id="costReduction"
                type="text"
                value={data.valueSellingFramework?.roiExpectations?.costReduction || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.roiExpectations.costReduction', e.target.value)}
                placeholder="25% or $500K"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="efficiencyImprovement">Target efficiency improvement</label>
              <input
                id="efficiencyImprovement"
                type="text"
                value={data.valueSellingFramework?.roiExpectations?.efficiencyImprovement || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.roiExpectations.efficiencyImprovement', e.target.value)}
                placeholder="40%"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="paybackPeriod">Expected payback period</label>
              <input
                id="paybackPeriod"
                type="text"
                value={data.valueSellingFramework?.roiExpectations?.paybackPeriod || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.roiExpectations.paybackPeriod', e.target.value)}
                placeholder="12 months"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="targetROI">Target ROI</label>
              <input
                id="targetROI"
                type="text"
                value={data.valueSellingFramework?.roiExpectations?.targetROI || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.roiExpectations.targetROI', e.target.value)}
                placeholder="300%"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="timeToFirstValue">Time to first value</label>
              <input
                id="timeToFirstValue"
                type="text"
                value={data.valueSellingFramework?.roiExpectations?.timeToFirstValue || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.roiExpectations.timeToFirstValue', e.target.value)}
                placeholder="3 months"
                className={styles.formInput}
              />
            </div>
          </div>
        </div>
  
        <div className={styles.formSection}>
          <h3>Success Metrics</h3>
          <p>How will success be measured?</p>
          <div className={styles.checkboxGrid}>
              {['Process cycle time reduction', 'Error rate improvement', 'Cost per transaction reduction', 'Employee productivity increase', 'Customer satisfaction improvement', 'Revenue impact'].map(metric => (
              <label key={metric} className={`${styles.checkboxCard} ${
                  data.valueSellingFramework?.successMetrics?.includes(metric) ? styles.checkboxCardSelected : ''
              }`}>
                  <input
                  type="checkbox"
                  checked={data.valueSellingFramework?.successMetrics?.includes(metric) || false}
                  onChange={() => onToggle('valueSellingFramework.successMetrics', metric)}
                  />
                  <span className={styles.checkboxText}>{metric}</span>
              </label>
              ))}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="successMetricsTargets">Specific targets</label>
            <textarea
              id="successMetricsTargets"
              value={data.valueSellingFramework?.successMetricsTargets || ''}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateData('valueSellingFramework.successMetricsTargets', e.target.value)}
              placeholder="Detail the numerical targets (e.g., Reduce processing time from 5 days to 1 day)"
              rows={3}
              className={styles.formTextarea}
            />
          </div>
        </div>
      </div>
    );
  }

  export default SolutionStep; 