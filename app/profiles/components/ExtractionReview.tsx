'use client';

import React, { FC } from 'react';
import styles from './ExtractionReview.module.css';
import { Profile } from '../../services/types';

interface ExtractedField {
  value: any;
  confidence: number;
}

interface ExtractionResult {
  success: boolean;
  data: Record<string, ExtractedField>;
  hasLowConfidenceFields?: boolean;
  lowConfidenceFields?: string[];
  validationWarnings?: string[];
  error?: string;
}

interface ExtractionReviewProps {
  extractionResult: ExtractionResult;
  onApply: (profile: Partial<Profile>) => void;
  onCancel: () => void;
  isApplying?: boolean;
}

const ExtractionReview: FC<ExtractionReviewProps> = ({ 
  extractionResult, 
  onApply, 
  onCancel,
  isApplying = false 
}) => {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return styles.confidenceHigh;
    if (confidence >= 0.5) return styles.confidenceMedium;
    return styles.confidenceLow;
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return 'High';
    if (confidence >= 0.5) return 'Medium';
    return 'Low';
  };

  const formatFieldName = (fieldName: string) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const renderFieldValue = (field: ExtractedField) => {
    const { value, confidence } = field;

    if (Array.isArray(value)) {
      return (
        <div className={styles.arrayValue}>
          {value.length > 0 ? (
            <ul className={styles.arrayList}>
              {value.map((item, index) => (
                <li key={index} className={styles.arrayItem}>
                  {typeof item === 'object' ? JSON.stringify(item, null, 2) : item}
                </li>
              ))}
            </ul>
          ) : (
            <span className={styles.emptyValue}>No items</span>
          )}
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <pre className={styles.objectValue}>
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }

    return <span className={styles.primitiveValue}>{value || <span className={styles.emptyValue}>Empty</span>}</span>;
  };

  const handleApply = () => {
    const profile: Partial<Profile> = {};
    
    // Map extracted data to profile schema, excluding low confidence fields
    Object.entries(extractionResult.data).forEach(([key, field]) => {
      if (field.confidence >= 0.3) { // Only include fields with reasonable confidence
        profile[key] = field.value;
      }
    });

    onApply(profile);
  };

  if (!extractionResult.success) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorIcon}>❌</div>
        <h3 className={styles.errorTitle}>Extraction Failed</h3>
        <p className={styles.errorMessage}>{extractionResult.error || 'An unknown error occurred'}</p>
        <button className="btn btn-secondary" onClick={onCancel}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.reviewContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Review Extracted Data</h2>
        <p className={styles.subtitle}>
          Please review the extracted information below. Fields with low confidence scores may need manual correction.
        </p>
      </div>

      {extractionResult.hasLowConfidenceFields && (
        <div className={styles.warning}>
          <span className={styles.warningIcon}>⚠️</span>
          <span>
            Some fields have low confidence scores and may be inaccurate: {' '}
            {extractionResult.lowConfidenceFields?.map(formatFieldName).join(', ')}
          </span>
        </div>
      )}

      {extractionResult.validationWarnings && extractionResult.validationWarnings.length > 0 && (
        <div className={styles.validationWarnings}>
          <h4 className={styles.warningTitle}>Validation Warnings:</h4>
          <ul className={styles.warningList}>
            {extractionResult.validationWarnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.fieldsContainer}>
        {Object.entries(extractionResult.data).map(([fieldName, field]) => (
          <div key={fieldName} className={styles.fieldRow}>
            <div className={styles.fieldHeader}>
              <span className={styles.fieldName}>{formatFieldName(fieldName)}</span>
              <div className={`${styles.confidenceBadge} ${getConfidenceColor(field.confidence)}`}>
                <span className={styles.confidenceValue}>{Math.round(field.confidence * 100)}%</span>
                <span className={styles.confidenceLabel}>{getConfidenceLabel(field.confidence)}</span>
              </div>
            </div>
            <div className={styles.fieldValue}>
              {renderFieldValue(field)}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <button 
          className="btn btn-secondary" 
          onClick={onCancel}
          disabled={isApplying}
        >
          Cancel
        </button>
        <button 
          className="btn btn-primary" 
          onClick={handleApply}
          disabled={isApplying}
        >
          {isApplying ? (
            <>
              <span className={styles.spinner}></span>
              Applying...
            </>
          ) : (
            'Apply to Profile'
          )}
        </button>
      </div>
    </div>
  );
};

export default ExtractionReview; 