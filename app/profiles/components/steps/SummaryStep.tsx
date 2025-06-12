'use client';

import React, { FC, ChangeEvent } from 'react';
import { Profile } from '../../../services/types';
import styles from './CompanyOverviewStep.module.css';

interface SummaryStepProps {
  data: Profile;
  updateData: (path: string, value: any) => void;
  onGenerateTimeline?: (profile: Profile) => void;
  isGenerating?: boolean;
}

const SummaryStep: FC<SummaryStepProps> = ({ data, updateData, onGenerateTimeline, isGenerating }) => {
  return (
    <div className={styles.wizardStep}>
      <h2>Review & Complete</h2>
      <p>Review your client profile information before creating the profile.</p>

      {/* Company Information Summary */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Company Information</h3>
        <div style={{ 
          background: 'var(--bg-secondary)', 
          border: '1px solid var(--border-primary)', 
          borderRadius: '8px', 
          padding: '1rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <strong>Company Name:</strong> {data.companyName || 'Not specified'}
            </div>
            <div>
              <strong>Industry:</strong> {data.industry || 'Not specified'}
            </div>
            <div>
              <strong>Employee Count:</strong> {data.employeeCount || 'Not specified'}
            </div>
            <div>
              <strong>Annual Revenue:</strong> {data.annualRevenue || 'Not specified'}
            </div>
            <div>
              <strong>Primary Location:</strong> {data.primaryLocation || 'Not specified'}
            </div>
            <div>
              <strong>Website:</strong> {data.websiteUrl ? (
                <a href={data.websiteUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-blue)' }}>
                  {data.websiteUrl}
                </a>
              ) : 'Not specified'}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Initiatives Summary */}
      {data.strategicInitiatives && data.strategicInitiatives.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Strategic Initiatives ({data.strategicInitiatives.length})</h3>
          {data.strategicInitiatives.map((initiative, index) => (
            <div key={index} style={{ 
              background: 'var(--bg-secondary)', 
              border: '1px solid var(--border-primary)', 
              borderRadius: '8px', 
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: 'var(--text-primary)' }}>
                {initiative.initiative || `Initiative ${index + 1}`}
              </h4>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {initiative.contact?.name && (
                  <div><strong>Contact:</strong> {initiative.contact.name} {initiative.contact.title && `(${initiative.contact.title})`}</div>
                )}
                {initiative.contact?.email && (
                  <div><strong>Email:</strong> {initiative.contact.email}</div>
                )}
                {initiative.contact?.phone && (
                  <div><strong>Phone:</strong> {initiative.contact.phone}</div>
                )}
                {initiative.contact?.linkedin && (
                  <div><strong>LinkedIn:</strong> {initiative.contact.linkedin}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completion Notes */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Notes (Optional)</h3>
        <div className={styles.formGroup}>
          <label htmlFor="notes">Additional notes about this client</label>
          <textarea
            id="notes"
            value={data.notes || ''}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateData('notes', e.target.value)}
            placeholder="Add any additional context, observations, or next steps..."
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border-primary)',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        background: 'var(--bg-secondary)', 
        border: '1px solid var(--border-primary)', 
        borderRadius: '8px', 
        padding: '1rem',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)' }}>
          Ready to create this client profile? You can always edit it later.
        </p>
        {onGenerateTimeline && (
          <button
            type="button"
            onClick={() => onGenerateTimeline(data)}
            disabled={isGenerating}
            style={{
              background: 'var(--accent-green)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              opacity: isGenerating ? 0.7 : 1,
              marginRight: '1rem'
            }}
          >
            {isGenerating ? 'Generating...' : 'Generate AI Timeline'}
          </button>
        )}
      </div>
    </div>
  );
}

export default SummaryStep; 