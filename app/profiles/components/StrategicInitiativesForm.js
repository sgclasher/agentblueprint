'use client';

import React from 'react';
import { Plus, X, User, Mail, Phone, Linkedin } from 'lucide-react';

/**
 * Strategic Initiatives Form Component
 * 
 * Manages the Expected Business Outcome section:
 * - Strategic initiatives with full contact details
 * - Business objectives
 * 
 * Data Structure:
 * {
 *   strategicInitiatives: [
 *     {
 *       initiative: "Description of initiative",
 *       contact: {
 *         name: "Contact Name",
 *         title: "Job Title", 
 *         email: "email@company.com",
 *         linkedin: "linkedin.com/in/profile",
 *         phone: "(555) 123-4567"
 *       }
 *     }
 *   ],
 *   businessObjectives: "Overall strategic objectives..."
 * }
 */

export default function StrategicInitiativesForm({ data, onChange }) {
  const strategicInitiatives = data.expectedOutcome?.strategicInitiatives || [];
  const businessObjectives = data.expectedOutcome?.businessObjectives || '';

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

  const addInitiative = () => {
    const newInitiative = {
      initiative: '',
      contact: {
        name: '',
        title: '',
        email: '',
        linkedin: '',
        phone: ''
      }
    };
    
    const newInitiatives = [...strategicInitiatives, newInitiative];
    updateData('expectedOutcome.strategicInitiatives', newInitiatives);
  };

  const removeInitiative = (index) => {
    const newInitiatives = strategicInitiatives.filter((_, i) => i !== index);
    updateData('expectedOutcome.strategicInitiatives', newInitiatives);
  };

  const updateInitiative = (index, field, value) => {
    const newInitiatives = [...strategicInitiatives];
    if (field.includes('.')) {
      // Handle nested fields like contact.name
      const [parent, child] = field.split('.');
      if (!newInitiatives[index][parent]) {
        newInitiatives[index][parent] = {};
      }
      newInitiatives[index][parent][child] = value;
    } else {
      newInitiatives[index][field] = value;
    }
    updateData('expectedOutcome.strategicInitiatives', newInitiatives);
  };

  return (
    <div className="strategic-initiatives-form">
      <div className="form-section">
        <div className="section-header">
          <h3>Strategic Initiatives</h3>
          <p>Define the key business outcomes this client wants to achieve, along with the executive contacts responsible for each initiative.</p>
        </div>

        <div className="initiatives-list">
          {strategicInitiatives.map((initiative, index) => (
            <div key={index} className="initiative-card">
              <div className="initiative-header">
                <h4>Initiative {index + 1}</h4>
                <button
                  type="button"
                  className="btn-icon btn-danger"
                  onClick={() => removeInitiative(index)}
                  aria-label="Remove initiative"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="initiative-content">
                {/* Initiative Description */}
                <div className="form-group">
                  <label htmlFor={`initiative-${index}`}>Initiative Description *</label>
                  <textarea
                    id={`initiative-${index}`}
                    value={initiative.initiative || ''}
                    onChange={(e) => updateInitiative(index, 'initiative', e.target.value)}
                    placeholder="e.g., Reduce operational costs by 35% while scaling to $25M revenue"
                    rows={2}
                    required
                  />
                </div>

                {/* Contact Information */}
                <div className="contact-section">
                  <h5><User size={16} /> Executive Contact</h5>
                  <div className="contact-grid">
                    <div className="form-group">
                      <label htmlFor={`contact-name-${index}`}>Name *</label>
                      <input
                        type="text"
                        id={`contact-name-${index}`}
                        value={initiative.contact?.name || ''}
                        onChange={(e) => updateInitiative(index, 'contact.name', e.target.value)}
                        placeholder="e.g., Sarah Chen"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`contact-title-${index}`}>Title *</label>
                      <input
                        type="text"
                        id={`contact-title-${index}`}
                        value={initiative.contact?.title || ''}
                        onChange={(e) => updateInitiative(index, 'contact.title', e.target.value)}
                        placeholder="e.g., CEO & Co-Founder"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`contact-email-${index}`}>
                        <Mail size={14} /> Email *
                      </label>
                      <input
                        type="email"
                        id={`contact-email-${index}`}
                        value={initiative.contact?.email || ''}
                        onChange={(e) => updateInitiative(index, 'contact.email', e.target.value)}
                        placeholder="e.g., sarah.chen@company.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`contact-linkedin-${index}`}>
                        <Linkedin size={14} /> LinkedIn
                      </label>
                      <input
                        type="text"
                        id={`contact-linkedin-${index}`}
                        value={initiative.contact?.linkedin || ''}
                        onChange={(e) => updateInitiative(index, 'contact.linkedin', e.target.value)}
                        placeholder="e.g., linkedin.com/in/sarahchen-ceo"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`contact-phone-${index}`}>
                        <Phone size={14} /> Phone
                      </label>
                      <input
                        type="tel"
                        id={`contact-phone-${index}`}
                        value={initiative.contact?.phone || ''}
                        onChange={(e) => updateInitiative(index, 'contact.phone', e.target.value)}
                        placeholder="e.g., (512) 555-0123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-secondary btn-add-initiative"
            onClick={addInitiative}
          >
            <Plus size={16} />
            Add Strategic Initiative
          </button>
        </div>

        {/* Business Objectives */}
        <div className="form-group">
          <label htmlFor="business-objectives">Business Objectives</label>
          <textarea
            id="business-objectives"
            value={businessObjectives}
            onChange={(e) => updateData('expectedOutcome.businessObjectives', e.target.value)}
            placeholder="Describe the overall strategic objectives and goals this client wants to achieve..."
            rows={3}
          />
          <div className="form-help">
            <small>Optional: Provide context about the overall business goals and success criteria.</small>
          </div>
        </div>
      </div>

      <style jsx>{`
        .strategic-initiatives-form {
          max-width: 800px;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-header h3 {
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .section-header p {
          color: #666;
          margin: 0;
        }

        .initiative-card {
          border: 1px solid #e1e5e9;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          background: #fafbfc;
        }

        .initiative-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e1e5e9;
        }

        .initiative-header h4 {
          margin: 0;
          color: #333;
          font-size: 1.1rem;
        }

        .btn-icon {
          background: none;
          border: none;
          padding: 0.25rem;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-danger {
          color: #dc3545;
        }

        .btn-danger:hover {
          background: #f8d7da;
        }

        .contact-section {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e1e5e9;
        }

        .contact-section h5 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: #495057;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .contact-grid .form-group:nth-child(3),
        .contact-grid .form-group:nth-child(4),
        .contact-grid .form-group:nth-child(5) {
          grid-column: span 1;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #495057;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 0.9rem;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        .btn-add-initiative {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          justify-content: center;
          padding: 1rem;
          border: 2px dashed #ced4da;
          background: transparent;
          color: #6c757d;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .btn-add-initiative:hover {
          border-color: #007bff;
          color: #007bff;
          background: #f8f9fa;
        }

        .form-help {
          margin-top: 0.5rem;
        }

        .form-help small {
          color: #6c757d;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
} 