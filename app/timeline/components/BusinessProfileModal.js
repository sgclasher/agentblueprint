'use client';

import React, { useState } from 'react';
import styles from './BusinessProfileModal.module.css';

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 
  'Education', 'Real Estate', 'Transportation', 'Energy', 'Other'
];

const companySizes = [
  { value: 'startup', label: '1-50 employees' },
  { value: 'small', label: '51-200 employees' },
  { value: 'medium', label: '201-1000 employees' },
  { value: 'large', label: '1000+ employees' },
];

const maturityLevels = [
  { value: 'beginner', label: 'Just Starting', description: 'Little to no AI/automation' },
  { value: 'emerging', label: 'Emerging', description: 'Some basic automation' },
  { value: 'developing', label: 'Developing', description: 'Several AI initiatives' },
  { value: 'advanced', label: 'Advanced', description: 'Mature AI adoption' },
];

const primaryGoals = [
  'Cost Reduction',
  'Revenue Growth',
  'Customer Experience',
  'Operational Efficiency',
  'Innovation',
  'Risk Management',
  'Employee Productivity',
  'Data-Driven Insights'
];

export default function BusinessProfileModal({ onClose, onSubmit, isGenerating, initialData }) {
  const [formData, setFormData] = useState({
    companyName: initialData?.companyName || '',
    industry: initialData?.industry || '',
    companySize: initialData?.companySize || '',
    aiMaturityLevel: initialData?.aiMaturityLevel || '',
    primaryGoals: initialData?.primaryGoals || [],
    currentChallenges: initialData?.currentChallenges || '',
    budget: initialData?.budget || '',
    timeframe: initialData?.timeframe || '3-years'
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter(g => g !== goal)
        : [...prev.primaryGoals, goal]
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName && formData.industry && formData.companySize;
      case 2:
        return formData.aiMaturityLevel && formData.primaryGoals.length > 0;
      case 3:
        return formData.budget && formData.timeframe;
      default:
        return false;
    }
  };
  
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Build Your AI Transformation Timeline</h2>
          <button className={styles.modalClose} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.modalProgress}>
          <div className={styles.progressSteps}>
            {[1, 2, 3].map(step => (
              <div 
                key={step} 
                className={`${styles.progressStep} ${currentStep >= step ? styles.active : ''}`}
              >
                <div className={styles.stepNumber}>{step}</div>
                <div className={styles.stepLabel}>
                  {step === 1 && 'Company Info'}
                  {step === 2 && 'AI Readiness'}
                  {step === 3 && 'Planning'}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {currentStep === 1 && (
            <div className={styles.formStep}>
              <h3>Tell us about your company</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  placeholder="Enter your company name"
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="industry">Industry</label>
                <select
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  required
                >
                  <option value="">Select your industry</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Company Size</label>
                <div className={styles.radioGroup}>
                  {companySizes.map(size => (
                    <label key={size.value} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="companySize"
                        value={size.value}
                        checked={formData.companySize === size.value}
                        onChange={(e) => handleChange('companySize', e.target.value)}
                      />
                      <span className={styles.radioText}>{size.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className={styles.formStep}>
              <h3>Assess your AI readiness</h3>
              
              <div className={styles.formGroup}>
                <label>Current AI Maturity Level</label>
                <div className={styles.maturityGrid}>
                  {maturityLevels.map(level => (
                    <button
                      key={level.value}
                      type="button"
                      className={`${styles.maturityOption} ${formData.aiMaturityLevel === level.value ? styles.selected : ''}`}
                      onClick={() => handleChange('aiMaturityLevel', level.value)}
                    >
                      <div className={styles.maturityLabel}>{level.label}</div>
                      <div className={styles.maturityDescription}>{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Primary Goals (Select all that apply)</label>
                <div className={styles.goalsGrid}>
                  {primaryGoals.map(goal => (
                    <button
                      key={goal}
                      type="button"
                      className={`${styles.goalOption} ${formData.primaryGoals.includes(goal) ? styles.selected : ''}`}
                      onClick={() => handleGoalToggle(goal)}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="currentChallenges">Current Challenges (Optional)</label>
                <textarea
                  id="currentChallenges"
                  value={formData.currentChallenges}
                  onChange={(e) => handleChange('currentChallenges', e.target.value)}
                  placeholder="Describe any specific challenges or pain points..."
                  rows={3}
                />
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className={styles.formStep}>
              <h3>Set your transformation parameters</h3>
              
              <div className={styles.formGroup}>
                <label htmlFor="budget">Annual AI Investment Budget</label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                  required
                >
                  <option value="">Select budget range</option>
                  <option value="<100k">Less than $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="500k-1m">$500,000 - $1 million</option>
                  <option value="1m-5m">$1 million - $5 million</option>
                  <option value=">5m">More than $5 million</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label>Transformation Timeframe</label>
                <div className={styles.timeframeOptions}>
                  {['1-year', '3-years', '5-years'].map(tf => (
                    <button
                      key={tf}
                      type="button"
                      className={`${styles.timeframeOption} ${formData.timeframe === tf ? styles.selected : ''}`}
                      onClick={() => handleChange('timeframe', tf)}
                    >
                      <div className={styles.timeframeLabel}>{tf.replace('-', ' ')}</div>
                      <div className={styles.timeframeDescription}>
                        {tf === '1-year' && 'Quick wins focus'}
                        {tf === '3-years' && 'Balanced approach'}
                        {tf === '5-years' && 'Full transformation'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className={styles.modalActions}>
            {currentStep > 1 && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
                disabled={!canProceed() || isGenerating}
              >
                {isGenerating ? 'Generating Timeline...' : 'Generate Timeline'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 