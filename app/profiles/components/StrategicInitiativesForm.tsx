'use client';

import React, { FC, ChangeEvent } from 'react';
import { Plus, X, User, Mail, Phone, Linkedin } from 'lucide-react';
import styles from './StrategicInitiativesForm.module.css';

interface Contact {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  phone: string;
}

interface StrategicInitiative {
  initiative: string;
  contact: Contact;
}

interface ExpectedOutcome {
  strategicInitiatives: StrategicInitiative[];
  businessObjectives: string;
}

interface FormData {
  expectedOutcome?: ExpectedOutcome;
  [key: string]: any;
}

interface StrategicInitiativesFormProps {
  data: FormData;
  onChange: (data: FormData) => void;
}

const StrategicInitiativesForm: FC<StrategicInitiativesFormProps> = ({ data, onChange }) => {
  const strategicInitiatives = data.expectedOutcome?.strategicInitiatives || [];
  const businessObjectives = data.expectedOutcome?.businessObjectives || '';

  const updateData = (path: string, value: any) => {
    const newData = { ...data };
    const pathArray = path.split('.');
    // TODO: This is not type safe, but it's a generic way to update nested properties.
    // A better implementation might use a library like lodash.set or a recursive function with generics.
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

  const addInitiative = () => {
    const newInitiative: StrategicInitiative = {
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

  const removeInitiative = (index: number) => {
    const newInitiatives = strategicInitiatives.filter((_, i) => i !== index);
    updateData('expectedOutcome.strategicInitiatives', newInitiatives);
  };

  const updateInitiative = (index: number, field: string, value: string) => {
    const newInitiatives = [...strategicInitiatives];
    if (field.includes('.')) {
      const [parent, child] = field.split('.') as [keyof StrategicInitiative, keyof Contact];
      if (!newInitiatives[index][parent]) {
        // @ts-ignore
        newInitiatives[index][parent] = {};
      }
      // @ts-ignore
      newInitiatives[index][parent][child] = value;
    } else {
      // @ts-ignore
      newInitiatives[index][field] = value;
    }
    updateData('expectedOutcome.strategicInitiatives', newInitiatives);
  };

  return (
    <div className={styles['strategic-initiatives-form']}>
      <div className="form-section">
        <div className={styles['section-header']}>
          <h3>Strategic Initiatives</h3>
          <p>Define the key business outcomes this client wants to achieve, along with the executive contacts responsible for each initiative.</p>
        </div>

        <div className={styles['initiatives-list']}>
          {strategicInitiatives.map((initiative, index) => (
            <div key={index} className={styles['initiative-card']}>
              <div className={styles['initiative-header']}>
                <h4>Initiative {index + 1}</h4>
                <button
                  type="button"
                  className={`btn-icon ${styles['btn-danger']}`}
                  onClick={() => removeInitiative(index)}
                  aria-label="Remove initiative"
                >
                  <X size={16} />
                </button>
              </div>

              <div className={styles['initiative-content']}>
                <div className={styles['form-group']}>
                  <label htmlFor={`initiative-${index}`}>Initiative Description *</label>
                  <textarea
                    id={`initiative-${index}`}
                    value={initiative.initiative || ''}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateInitiative(index, 'initiative', e.target.value)}
                    placeholder="e.g., Reduce operational costs by 35% while scaling to $25M revenue"
                    rows={2}
                    required
                  />
                </div>

                <div className={styles['contact-section']}>
                  <h5><User size={16} /> Executive Contact</h5>
                  <div className={styles['contact-grid']}>
                    <div className={styles['form-group']}>
                      <label htmlFor={`contact-name-${index}`}>Name *</label>
                      <input
                        type="text"
                        id={`contact-name-${index}`}
                        value={initiative.contact?.name || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateInitiative(index, 'contact.name', e.target.value)}
                        placeholder="e.g., Sarah Chen"
                        required
                      />
                    </div>

                    <div className={styles['form-group']}>
                      <label htmlFor={`contact-title-${index}`}>Title *</label>
                      <input
                        type="text"
                        id={`contact-title-${index}`}
                        value={initiative.contact?.title || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateInitiative(index, 'contact.title', e.target.value)}
                        placeholder="e.g., CEO & Co-Founder"
                        required
                      />
                    </div>

                    <div className={styles['form-group']}>
                      <label htmlFor={`contact-email-${index}`}>
                        <Mail size={14} /> Email *
                      </label>
                      <input
                        type="email"
                        id={`contact-email-${index}`}
                        value={initiative.contact?.email || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateInitiative(index, 'contact.email', e.target.value)}
                        placeholder="e.g., sarah.chen@company.com"
                        required
                      />
                    </div>

                    <div className={styles['form-group']}>
                      <label htmlFor={`contact-linkedin-${index}`}>
                        <Linkedin size={14} /> LinkedIn
                      </label>
                      <input
                        type="text"
                        id={`contact-linkedin-${index}`}
                        value={initiative.contact?.linkedin || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateInitiative(index, 'contact.linkedin', e.target.value)}
                        placeholder="e.g., linkedin.com/in/sarahchen-ceo"
                      />
                    </div>

                    <div className={styles['form-group']}>
                      <label htmlFor={`contact-phone-${index}`}>
                        <Phone size={14} /> Phone
                      </label>
                      <input
                        type="tel"
                        id={`contact-phone-${index}`}
                        value={initiative.contact?.phone || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => updateInitiative(index, 'contact.phone', e.target.value)}
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
            className={`btn btn-secondary ${styles['btn-add-initiative']}`}
            onClick={addInitiative}
          >
            <Plus size={16} />
            Add Strategic Initiative
          </button>
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="business-objectives">Business Objectives</label>
          <textarea
            id="business-objectives"
            value={businessObjectives}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateData('expectedOutcome.businessObjectives', e.target.value)}
            placeholder="Describe the overall strategic objectives and goals this client wants to achieve..."
            rows={3}
          />
          <div className={styles['form-help']}>
            <small>Optional: Provide context about the overall business goals and success criteria.</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StrategicInitiativesForm; 