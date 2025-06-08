'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './TimelinePlaceholder.module.css';

export function WelcomeMessage() {
  const router = useRouter();
  return (
    <div className={styles.timelineEmpty}>
      <h2>Welcome to Your AI Transformation Timeline</h2>
      <p>Create a client profile first to generate a personalized AI transformation roadmap.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button 
          className="btn btn-primary" // Using global button classes
          onClick={() => router.push('/profiles')}
        >
          Create Client Profile
        </button>
      </div>
    </div>
  );
}

export function TimelinePlaceholder({ title, message, showButton, buttonText, onButtonClick }) {
  return (
    <div className={styles.timelineEmpty}>
      <div className={styles.loadingSpinner}></div>
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      {showButton && (
        <div style={{ marginTop: '2rem' }}>
          <button className="btn btn-primary" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
} 