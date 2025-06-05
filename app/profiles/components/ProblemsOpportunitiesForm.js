'use client';

import React from 'react';
import { Plus, X, ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react';

/**
 * Problems & Opportunities Form Component
 * 
 * Maps business problems to agentic AI solutions:
 * - Current business problems
 * - Agentic AI workflow opportunities
 * - Direct problem → solution mapping
 * 
 * Data Structure:
 * {
 *   problems: {
 *     businessProblems: [
 *       "Customer support tickets manually triaged - 4+ hour response times",
 *       "Invoice processing and approvals take 2-3 weeks"
 *     ],
 *     agenticOpportunities: [
 *       "Intelligent ticket classification and auto-routing to specialists",
 *       "Automated invoice processing with approval workflows"
 *     ]
 *   }
 * }
 */

export default function ProblemsOpportunitiesForm({ data, onChange }) {
  const businessProblems = data.problems?.businessProblems || [];
  const agenticOpportunities = data.problems?.agenticOpportunities || [];

  const updateData = (path, value) => {
    const newData = { ...data };
    const pathArray = path.split('.');
    let current = newData;
    
    // Navigate to the parent object
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }
    
    // Set the value
    current[pathArray[pathArray.length - 1]] = value;
    onChange(newData);
  };

  const addProblem = () => {
    const newProblems = [...businessProblems, ''];
    updateData('problems.businessProblems', newProblems);
  };

  const removeProblem = (index) => {
    const newProblems = businessProblems.filter((_, i) => i !== index);
    updateData('problems.businessProblems', newProblems);
  };

  const updateProblem = (index, value) => {
    const newProblems = [...businessProblems];
    newProblems[index] = value;
    updateData('problems.businessProblems', newProblems);
  };

  const addOpportunity = () => {
    const newOpportunities = [...agenticOpportunities, ''];
    updateData('problems.agenticOpportunities', newOpportunities);
  };

  const removeOpportunity = (index) => {
    const newOpportunities = agenticOpportunities.filter((_, i) => i !== index);
    updateData('problems.agenticOpportunities', newOpportunities);
  };

  const updateOpportunity = (index, value) => {
    const newOpportunities = [...agenticOpportunities];
    newOpportunities[index] = value;
    updateData('problems.agenticOpportunities', newOpportunities);
  };

  // Common business problems suggestions
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

  // Common agentic opportunities suggestions
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

  const addSuggestedProblem = (problem) => {
    if (!businessProblems.includes(problem)) {
      updateData('problems.businessProblems', [...businessProblems, problem]);
    }
  };

  const addSuggestedOpportunity = (opportunity) => {
    if (!agenticOpportunities.includes(opportunity)) {
      updateData('problems.agenticOpportunities', [...agenticOpportunities, opportunity]);
    }
  };

  return (
    <div className="problems-opportunities-form">
      <div className="form-section">
        <div className="section-header">
          <h3>Problems & Agentic AI Opportunities</h3>
          <p>Identify current business problems and map them to specific agentic AI workflow opportunities.</p>
        </div>

        <div className="problems-opportunities-grid">
          {/* Business Problems Section */}
          <div className="problems-section">
            <div className="subsection-header">
              <h4><AlertTriangle size={18} /> Current Business Problems</h4>
              <p>What manual processes, inefficiencies, or pain points does this client face?</p>
            </div>

            <div className="items-list">
              {businessProblems.map((problem, index) => (
                <div key={index} className="item-input">
                  <textarea
                    value={problem}
                    onChange={(e) => updateProblem(index, e.target.value)}
                    placeholder="e.g., Customer support tickets manually triaged - 4+ hour response times"
                    rows={2}
                  />
                  <button
                    type="button"
                    className="btn-icon btn-danger"
                    onClick={() => removeProblem(index)}
                    aria-label="Remove problem"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-secondary btn-add"
                onClick={addProblem}
              >
                <Plus size={16} />
                Add Business Problem
              </button>
            </div>

            {/* Suggested Problems */}
            <div className="suggestions">
              <h5>Common Problems:</h5>
              <div className="suggestion-chips">
                {commonProblems.map((problem, index) => (
                  <button
                    key={index}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => addSuggestedProblem(problem)}
                    disabled={businessProblems.includes(problem)}
                  >
                    {problem}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mapping Arrow */}
          <div className="mapping-arrow">
            <ArrowRight size={24} />
            <span>Maps to</span>
          </div>

          {/* Agentic Opportunities Section */}
          <div className="opportunities-section">
            <div className="subsection-header">
              <h4><Lightbulb size={18} /> Agentic AI Opportunities</h4>
              <p>What specific agentic workflows could solve these problems?</p>
            </div>

            <div className="items-list">
              {agenticOpportunities.map((opportunity, index) => (
                <div key={index} className="item-input">
                  <textarea
                    value={opportunity}
                    onChange={(e) => updateOpportunity(index, e.target.value)}
                    placeholder="e.g., Intelligent ticket classification and auto-routing to specialists"
                    rows={2}
                  />
                  <button
                    type="button"
                    className="btn-icon btn-danger"
                    onClick={() => removeOpportunity(index)}
                    aria-label="Remove opportunity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-secondary btn-add"
                onClick={addOpportunity}
              >
                <Plus size={16} />
                Add Agentic Opportunity
              </button>
            </div>

            {/* Suggested Opportunities */}
            <div className="suggestions">
              <h5>Common Opportunities:</h5>
              <div className="suggestion-chips">
                {commonOpportunities.map((opportunity, index) => (
                  <button
                    key={index}
                    type="button"
                    className="suggestion-chip"
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

        {/* Mapping Guide */}
        <div className="mapping-guide">
          <h5>💡 Mapping Guide</h5>
          <div className="guide-content">
            <div className="guide-item">
              <strong>Manual Process Problem</strong> → <strong>Automation Opportunity</strong>
            </div>
            <div className="guide-item">
              <strong>Data Entry/Processing</strong> → <strong>Intelligent Document Processing</strong>
            </div>
            <div className="guide-item">
              <strong>Approval Delays</strong> → <strong>Smart Workflow Routing</strong>
            </div>
            <div className="guide-item">
              <strong>Customer Service Issues</strong> → <strong>Conversational AI Assistants</strong>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .problems-opportunities-form {
          max-width: 1200px;
        }

        .section-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .section-header h3 {
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .section-header p {
          color: #666;
          margin: 0;
        }

        .problems-opportunities-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .problems-opportunities-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .mapping-arrow {
            order: 2;
            justify-self: center;
          }
          
          .opportunities-section {
            order: 3;
          }
        }

        .subsection-header {
          margin-bottom: 1.5rem;
        }

        .subsection-header h4 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: #333;
          font-size: 1.1rem;
        }

        .subsection-header p {
          color: #666;
          margin: 0;
          font-size: 0.9rem;
        }

        .mapping-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #007bff;
          font-weight: 500;
        }

        .mapping-arrow span {
          margin-top: 0.5rem;
          font-size: 0.9rem;
        }

        .items-list {
          min-height: 200px;
        }

        .item-input {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          align-items: flex-start;
        }

        .item-input textarea {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 0.9rem;
          font-family: inherit;
          resize: vertical;
          min-height: 60px;
        }

        .item-input textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        .btn-icon {
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
        }

        .btn-danger {
          color: #dc3545;
        }

        .btn-danger:hover {
          background: #f8d7da;
        }

        .btn-add {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px dashed #ced4da;
          background: transparent;
          color: #6c757d;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          width: 100%;
          justify-content: center;
        }

        .btn-add:hover {
          border-color: #007bff;
          color: #007bff;
          background: #f8f9fa;
        }

        .suggestions {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e1e5e9;
        }

        .suggestions h5 {
          margin-bottom: 1rem;
          color: #495057;
          font-size: 0.9rem;
        }

        .suggestion-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .suggestion-chip {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          padding: 0.5rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .suggestion-chip:hover:not(:disabled) {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .suggestion-chip:disabled {
          background: #e9ecef;
          color: #6c757d;
          cursor: not-allowed;
        }

        .mapping-guide {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .mapping-guide h5 {
          margin-bottom: 1rem;
          color: #495057;
        }

        .guide-content {
          display: grid;
          gap: 0.75rem;
        }

        .guide-item {
          font-size: 0.9rem;
          color: #495057;
        }

        .guide-item strong:first-child {
          color: #dc3545;
        }

        .guide-item strong:last-child {
          color: #28a745;
        }
      `}</style>
    </div>
  );
} 