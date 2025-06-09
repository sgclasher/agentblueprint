'use client';

import React, { FC, ChangeEvent } from 'react';
import { Profile } from '../../../services/types';
import styles from './SummaryStep.module.css';

interface SummaryStepProps {
    data: Profile;
    updateData: (path: string, value: any) => void;
    onGenerateTimeline: () => void;
    isGenerating: boolean;
}

const SummaryStep: FC<SummaryStepProps> = ({ data, updateData, onGenerateTimeline, isGenerating }) => {
  return (
    <div className={styles.wizardStep}>
      <h2>Summary & Next Steps</h2>
      <p>Review your client profile and define next steps.</p>

      <div className={styles.formGroup}>
        <label htmlFor="currentState">Current State Summary</label>
        <textarea
          id="currentState"
          value={data.summary?.currentState || ''}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateData('summary.currentState', e.target.value)}
          placeholder="Brief description of key challenges and costs"
          rows={3}
          className={styles.formTextarea}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="recommendedApproach">Recommended Approach</label>
        <textarea
          id="recommendedApproach"
          value={data.summary?.recommendedApproach || ''}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateData('summary.recommendedApproach', e.target.value)}
          placeholder="High-level strategy recommendation"
          rows={3}
          className={styles.formTextarea}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="notes">Notes & Additional Context</label>
        <textarea
          id="notes"
          value={data.summary?.notes || ''}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateData('summary.notes', e.target.value)}
          placeholder="Additional observations, quotes from stakeholders, competitive insights, etc."
          rows={4}
          className={styles.formTextarea}
        />
      </div>

      <div className={styles.formGroup}>
        <button 
          type="button"
          className={styles.btnTimeline}
          onClick={onGenerateTimeline}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : '🚀 Generate AI Timeline'}
        </button>
      </div>
    </div>
  );
}

export default SummaryStep; 