'use client';

import React, { FC, ChangeEvent } from 'react';
import { Profile } from '../../../services/types';
import styles from './DecisionStep.module.css';

interface StepProps {
    data: Profile;
    updateData: (path: string, value: any) => void;
}

const DecisionStep: FC<StepProps> = ({ data, updateData }) => {
    const evaluationCriteria = [
      'Technical fit',
      'Cost/ROI',
      'Vendor reputation',
      'Implementation timeline',
      'Support quality'
    ];
  
    return (
      <div className={styles.wizardStep}>
        <h2>Decision Process</h2>
        <p>Who are the key stakeholders and decision makers?</p>
        
        <div className={styles.formSection}>
          <h3>Key Decision Makers</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="economicBuyerName">Economic Buyer Name *</label>
              <input
                id="economicBuyerName"
                type="text"
                value={data.valueSellingFramework?.decisionMakers?.economicBuyer?.name || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.decisionMakers.economicBuyer.name', e.target.value)}
                placeholder="Sarah Chen"
                required
                className={styles.formInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="economicBuyerTitle">Economic Buyer Title</label>
              <input
                id="economicBuyerTitle"
                type="text"
                value={data.valueSellingFramework?.decisionMakers?.economicBuyer?.title || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.decisionMakers.economicBuyer.title', e.target.value)}
                placeholder="CEO"
                className={styles.formInput}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="economicBuyerBudget">Budget Authority ($)</label>
              <input
                id="economicBuyerBudget"
                type="number"
                value={data.valueSellingFramework?.decisionMakers?.economicBuyer?.budget || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.decisionMakers.economicBuyer.budget', e.target.value)}
                placeholder="1000000"
                className={styles.formInput}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="technicalBuyerName">Technical Buyer Name</label>
              <input
                id="technicalBuyerName"
                type="text"
                value={data.valueSellingFramework?.decisionMakers?.technicalBuyer?.name || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.decisionMakers.technicalBuyer.name', e.target.value)}
                placeholder="Mike Rodriguez"
                className={styles.formInput}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="technicalBuyerTitle">Technical Buyer Title</label>
              <input
                id="technicalBuyerTitle"
                type="text"
                value={data.valueSellingFramework?.decisionMakers?.technicalBuyer?.title || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.decisionMakers.technicalBuyer.title', e.target.value)}
                placeholder="CTO"
                className={styles.formInput}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="championName">Champion Name</label>
              <input
                id="championName"
                type="text"
                value={data.valueSellingFramework?.decisionMakers?.champion?.name || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.decisionMakers.champion.name', e.target.value)}
                placeholder="Lisa Park"
                className={styles.formInput}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="championTitle">Champion Title</label>
              <input
                id="championTitle"
                type="text"
                value={data.valueSellingFramework?.decisionMakers?.champion?.title || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.decisionMakers.champion.title', e.target.value)}
                placeholder="VP Operations"
                className={styles.formInput}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="influencers">Influencers</label>
              <input
                id="influencers"
                type="text"
                value={data.valueSellingFramework?.decisionMakers?.influencers || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.decisionMakers.influencers', e.target.value)}
                placeholder="Head of Customer Success, Engineering Manager"
                className={styles.formInput}
              />
            </div>
          </div>
        </div>
  
        <div className={styles.formSection}>
          <h3>Buying Process</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="timeline">Decision timeline</label>
              <input
                id="timeline"
                type="text"
                value={data.valueSellingFramework?.buyingProcess?.timeline || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.buyingProcess.timeline', e.target.value)}
                placeholder="6 months"
                className={styles.formInput}
              />
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="budgetCycle">Budget cycle</label>
              <input
                id="budgetCycle"
                type="text"
                value={data.valueSellingFramework?.buyingProcess?.budgetCycle || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.buyingProcess.budgetCycle', e.target.value)}
                placeholder="Q1 planning cycle"
                className={styles.formInput}
              />
            </div>
          </div>
  
          <div className={styles.formGroup}>
            <label>Evaluation criteria</label>
            <div className={styles.checkboxGrid}>
              {evaluationCriteria.map(criteria => (
                <label key={criteria} className={`${styles.checkboxCard} ${
                  data.valueSellingFramework?.buyingProcess?.evaluationCriteria?.includes(criteria) ? styles.checkboxCardSelected : ''
                }`}>
                  <input
                    type="checkbox"
                    checked={data.valueSellingFramework?.buyingProcess?.evaluationCriteria?.includes(criteria) || false}
                    onChange={() => {
                      const current = data.valueSellingFramework?.buyingProcess?.evaluationCriteria || [];
                      const updated = current.includes(criteria) 
                        ? current.filter((c: string) => c !== criteria)
                        : [...current, criteria];
                      updateData('valueSellingFramework.buyingProcess.evaluationCriteria', updated);
                    }}
                  />
                  <span className={styles.checkboxText}>{criteria}</span>
                </label>
              ))}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="evaluationOther">Other evaluation criteria</label>
              <input
                id="evaluationOther"
                type="text"
                value={data.valueSellingFramework?.buyingProcess?.evaluationOther || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.buyingProcess.evaluationOther', e.target.value)}
                placeholder="Specify other criteria"
                className={styles.formInput}
              />
            </div>
          </div>
        </div>
  
        <div className={styles.formSection}>
          <h3>Risks of Inaction</h3>
          <p>Consequences of doing nothing:</p>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="costEscalation">Continued cost escalation (annually) ($)</label>
              <input
                id="costEscalation"
                type="number"
                value={data.valueSellingFramework?.risksOfInaction?.costEscalation || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.risksOfInaction.costEscalation', e.target.value)}
                placeholder="1200000"
                className={styles.formInput}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="employeeAttrition">Employee attrition risk</label>
              <select
                id="employeeAttrition"
                value={data.valueSellingFramework?.risksOfInaction?.employeeAttrition || ''}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => updateData('valueSellingFramework.risksOfInaction.employeeAttrition', e.target.value)}
                className={styles.formSelect}
              >
                <option value="">Select risk level</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
  
            <div className={styles.formGroup}>
              <label htmlFor="threeYearCost">Estimated cost of inaction (3 years) ($)</label>
              <input
                id="threeYearCost"
                type="number"
                value={data.valueSellingFramework?.risksOfInaction?.threeYearCost || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateData('valueSellingFramework.risksOfInaction.threeYearCost', e.target.value)}
                placeholder="3600000"
                className={styles.formInput}
              />
            </div>
          </div>
  
          <div className={styles.formGroup}>
            <label htmlFor="competitiveDisadvantage">Competitive disadvantage</label>
            <textarea
              id="competitiveDisadvantage"
              value={data.valueSellingFramework?.risksOfInaction?.competitiveDisadvantage || ''}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateData('valueSellingFramework.risksOfInaction.competitiveDisadvantage', e.target.value)}
              placeholder="Describe the competitive impact of inaction"
              rows={2}
              className={styles.formTextarea}
            />
          </div>
  
          <div className={styles.formGroup}>
            <label htmlFor="customerSatisfaction">Customer satisfaction decline</label>
            <textarea
              id="customerSatisfaction"
              value={data.valueSellingFramework?.risksOfInaction?.customerSatisfaction || ''}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateData('valueSellingFramework.risksOfInaction.customerSatisfaction', e.target.value)}
              placeholder="Describe the customer impact"
              rows={2}
              className={styles.formTextarea}
            />
          </div>
  
          <div className={styles.formGroup}>
            <label htmlFor="complianceRisk">Regulatory compliance risk</label>
            <textarea
              id="complianceRisk"
              value={data.valueSellingFramework?.risksOfInaction?.complianceRisk || ''}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateData('valueSellingFramework.risksOfInaction.complianceRisk', e.target.value)}
              placeholder="Describe compliance risks"
              rows={2}
              className={styles.formTextarea}
            />
          </div>
        </div>
      </div>
    );
  }

  export default DecisionStep; 