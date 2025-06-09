'use client';

import React, { FC, ChangeEvent } from 'react';
import { Profile } from '../../../services/types';
import styles from './AIAssessmentStep.module.css';

interface StepProps {
    data: Profile;
    updateData: (path: string, value: any) => void;
}

const AIAssessmentStep: FC<StepProps> = ({ data, updateData }) => {
    const handleOpportunityUpdate = (index: number, field: string, value: string | number) => {
      const opportunities = [...(data.aiOpportunityAssessment?.opportunities || [])];
      if (!opportunities[index]) {
        opportunities[index] = {} as any;
      }
      (opportunities[index] as any)[field] = value;
      updateData('aiOpportunityAssessment.opportunities', opportunities);
    };
  
    const addOpportunity = () => {
      const opportunities = [...(data.aiOpportunityAssessment?.opportunities || [])];
      opportunities.push({
        name: '',
        department: '',
        process: '',
        currentState: '',
        aiSolution: '',
        estimatedImpact: '',
        implementationEffort: 'Medium',
        timeline: '',
        priorityScore: 5
      });
      updateData('aiOpportunityAssessment.opportunities', opportunities);
    };
  
    const removeOpportunity = (index: number) => {
      const opportunities = [...(data.aiOpportunityAssessment?.opportunities || [])];
      opportunities.splice(index, 1);
      updateData('aiOpportunityAssessment.opportunities', opportunities);
    };
  
    const updateQuickWin = (index: number, field: string, value: string) => {
      const quickWins = [...(data.aiOpportunityAssessment?.quickWins || [])];
      if (!quickWins[index]) quickWins[index] = {} as any;
      (quickWins[index] as any)[field] = value;
      updateData('aiOpportunityAssessment.quickWins', quickWins);
    };
  
    const addQuickWin = () => {
      const quickWins = [...(data.aiOpportunityAssessment?.quickWins || [])];
      quickWins.push({ name: '', impact: '', timeline: '' });
      updateData('aiOpportunityAssessment.quickWins', quickWins);
    };
  
    const removeQuickWin = (index: number) => {
      const quickWins = [...(data.aiOpportunityAssessment?.quickWins || [])];
      quickWins.splice(index, 1);
      updateData('aiOpportunityAssessment.quickWins', quickWins);
    };
  
    return (
      <div className={styles.wizardStep}>
        <h2>AI/Automation Opportunity Assessment</h2>
        <p>Evaluate current technology landscape and identify AI opportunities.</p>
        
        <div className={styles.formSection}>
          <h3>Current Technology Landscape</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="primaryERP">Primary ERP</label>
              <input
                id="primaryERP"
                type="text"
                value={data.aiOpportunityAssessment?.currentTechnology?.erp || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('aiOpportunityAssessment.currentTechnology.erp', e.target.value)}
                placeholder="SAP, Oracle, NetSuite, etc."
                className={styles.formInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="crmSystem">CRM System</label>
              <input
                id="crmSystem"
                type="text"
                value={data.aiOpportunityAssessment?.currentTechnology?.crm || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('aiOpportunityAssessment.currentTechnology.crm', e.target.value)}
                placeholder="Salesforce, HubSpot, etc."
                className={styles.formInput}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="collaborationTools">Collaboration Tools</label>
              <input
                id="collaborationTools"
                type="text"
                value={data.aiOpportunityAssessment?.currentTechnology?.collaboration || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('aiOpportunityAssessment.currentTechnology.collaboration', e.target.value)}
                placeholder="Microsoft 365, Google Workspace, Slack"
                className={styles.formInput}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default AIAssessmentStep; 