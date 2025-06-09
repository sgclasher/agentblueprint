'use client';

import React, { FC, ChangeEvent } from 'react';
import { Plus, X, ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react';
import styles from './ProblemsOpportunitiesForm.module.css';

interface Problems {
  businessProblems: string[];
  agenticOpportunities: string[];
}

interface FormData {
  problems?: Problems;
  [key: string]: any;
}

interface ProblemsOpportunitiesFormProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

const ProblemsOpportunitiesForm: FC<ProblemsOpportunitiesFormProps> = ({ data, onChange }) => {
  const businessProblems = data.problems?.businessProblems || [];
  const agenticOpportunities = data.problems?.agenticOpportunities || [];

  const updateData = (path: string, value: any) => {
    const newData = { ...data };
    const pathArray = path.split('.');
    let current: any = newData;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }
    
    current[pathArray[pathArray.length - 1]] = value;
    onChange(newData);
  };

  const addProblem = () => {
    const newProblems = [...businessProblems, ''];
    updateData('problems.businessProblems', newProblems);
  };

  const removeProblem = (index: number) => {
    const newProblems = businessProblems.filter((_, i) => i !== index);
    updateData('problems.businessProblems', newProblems);
  };

  const updateProblem = (index: number, value: string) => {
    const newProblems = [...businessProblems];
    newProblems[index] = value;
    updateData('problems.businessProblems', newProblems);
  };

  const addOpportunity = () => {
    const newOpportunities = [...agenticOpportunities, ''];
    updateData('problems.agenticOpportunities', newOpportunities);
  };

  const removeOpportunity = (index: number) => {
    const newOpportunities = agenticOpportunities.filter((_, i) => i !== index);
    updateData('problems.agenticOpportunities', newOpportunities);
  };

  const updateOpportunity = (index: number, value: string) => {
    const newOpportunities = [...agenticOpportunities];
    newOpportunities[index] = value;
    updateData('problems.agenticOpportunities', newOpportunities);
  };

  const commonProblems = [
    "Manual data entry taking hours per day",
    "Email-based approvals causing delays",
    "Spreadsheet-heavy processes prone to errors",
    "Customer service response times too slow",
    "Manual reporting taking days to complete",
    "Document processing requiring human review",
    "Repetitive administrative tasks",
    "Cross-system data synchronization issues"
  ];

  const commonOpportunities = [
    "Automated data extraction and entry",
    "Intelligent approval workflows",
    "AI-powered data validation and error detection",
    "Conversational AI for customer support",
    "Automated report generation and distribution",
    "Intelligent document processing and classification",
    "Workflow automation with smart routing",
    "Real-time data synchronization across systems"
  ];

  const addSuggestedProblem = (problem: string) => {
    if (!businessProblems.includes(problem)) {
      updateData('problems.businessProblems', [...businessProblems, problem]);
    }
  };

  const addSuggestedOpportunity = (opportunity: string) => {
    if (!agenticOpportunities.includes(opportunity)) {
      updateData('problems.agenticOpportunities', [...agenticOpportunities, opportunity]);
    }
  };

  return (
    <div className={styles['problems-opportunities-form']}>
      <div className="form-section">
        <div className={styles['section-header']}>
          <h3>Problems & Agentic AI Opportunities</h3>
          <p>Identify current business problems and map them to specific agentic AI workflow opportunities.</p>
        </div>

        <div className={styles['problems-opportunities-grid']}>
          <div className={styles['problems-section']}>
            <div className={styles['subsection-header']}>
              <h4><AlertTriangle size={18} /> Current Business Problems</h4>
              <p>What manual processes, inefficiencies, or pain points does this client face?</p>
            </div>

            <div className={styles['items-list']}>
              {businessProblems.map((problem, index) => (
                <div key={index} className={styles['item-input']}>
                  <textarea
                    value={problem}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateProblem(index, e.target.value)}
                    placeholder="e.g., Customer support tickets manually triaged - 4+ hour response times"
                    rows={2}
                  />
                  <button
                    type="button"
                    className={`btn-icon ${styles['btn-danger']}`}
                    onClick={() => removeProblem(index)}
                    aria-label="Remove problem"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className={`btn btn-secondary ${styles['btn-add']}`}
                onClick={addProblem}
              >
                <Plus size={16} />
                Add Business Problem
              </button>
            </div>

            <div className={styles.suggestions}>
              <h5>Common Problems:</h5>
              <div className={styles['suggestion-chips']}>
                {commonProblems.map((problem, index) => (
                  <button
                    key={index}
                    type="button"
                    className={styles['suggestion-chip']}
                    onClick={() => addSuggestedProblem(problem)}
                    disabled={businessProblems.includes(problem)}
                  >
                    {problem}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles['mapping-arrow']}>
            <ArrowRight size={24} />
            <span>Maps to</span>
          </div>

          <div className={styles['opportunities-section']}>
            <div className={styles['subsection-header']}>
              <h4><Lightbulb size={18} /> Agentic AI Opportunities</h4>
              <p>What specific agentic workflows could solve these problems?</p>
            </div>

            <div className={styles['items-list']}>
              {agenticOpportunities.map((opportunity, index) => (
                <div key={index} className={styles['item-input']}>
                  <textarea
                    value={opportunity}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateOpportunity(index, e.target.value)}
                    placeholder="e.g., Intelligent ticket classification and auto-routing to specialists"
                    rows={2}
                  />
                  <button
                    type="button"
                    className={`btn-icon ${styles['btn-danger']}`}
                    onClick={() => removeOpportunity(index)}
                    aria-label="Remove opportunity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className={`btn btn-secondary ${styles['btn-add']}`}
                onClick={addOpportunity}
              >
                <Plus size={16} />
                Add Agentic Opportunity
              </button>
            </div>

            <div className={styles.suggestions}>
              <h5>Common Opportunities:</h5>
              <div className={styles['suggestion-chips']}>
                {commonOpportunities.map((opportunity, index) => (
                  <button
                    key={index}
                    type="button"
                    className={styles['suggestion-chip']}
                    onClick={() => addSuggestedOpportunity(opportunity)}
                    disabled={agenticOpportunities.includes(opportunity)}
                  >
                    {opportunity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles['mapping-guide']}>
          <h5>💡 Mapping Guide</h5>
          <div className={styles['guide-content']}>
            <div className={styles['guide-item']}>
              <strong>Manual Process Problem</strong> → <strong>Automation Opportunity</strong>
            </div>
            <div className={styles['guide-item']}>
              <strong>Data Entry/Processing</strong> → <strong>Intelligent Document Processing</strong>
            </div>
            <div className={styles['guide-item']}>
              <strong>Approval Delays</strong> → <strong>Smart Workflow Routing</strong>
            </div>
            <div className={styles['guide-item']}>
              <strong>Customer Service Issues</strong> → <strong>Conversational AI Assistants</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemsOpportunitiesForm; 