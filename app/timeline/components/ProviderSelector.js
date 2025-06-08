'use client';

import React, { useState, useEffect } from 'react';
import styles from './ProviderSelector.module.css';
import { supabase } from '../../lib/supabase';
import { CredentialsRepository } from '../../repositories/credentialsRepository';

export default function ProviderSelector({ selectedProvider, onProviderChange, disabled }) {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setIsLoading(true);
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          // It's possible the user session isn't available on the first check.
          // We can simply show a "loading" or "no providers" state without erroring.
          setProviders([]);
          setIsLoading(false);
          return;
        }

        // Use the repository directly with the client-side supabase instance,
        // which is already authenticated.
        const data = await CredentialsRepository.getProvidersByType(supabase, user.id, 'ai_provider');
        
        setProviders(data);

        // If providers are found and none is selected yet, set a default.
        if (data && data.length > 0 && !selectedProvider) {
          const defaultProvider = data.find(p => p.is_default) || data[0];
          if (defaultProvider) {
            onProviderChange(defaultProvider.service_name);
          }
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching AI providers:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, []); // The dependency array is empty, so this runs once on mount.

  if (isLoading) {
    return <div className={styles.loading}>Loading providers...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (providers.length === 0) {
    return <div className={styles.noProviders}>No AI providers configured.</div>;
  }

  return (
    <div className={styles.providerSelector}>
      <label htmlFor="provider-select">AI Provider</label>
      <select
        id="provider-select"
        value={selectedProvider || ''}
        onChange={(e) => onProviderChange(e.target.value)}
        disabled={disabled || providers.length === 0}
        className={styles.select}
      >
        {providers.map((provider) => (
          <option key={provider.service_name} value={provider.service_name}>
            {provider.display_name}{provider.is_default ? ' (Default)' : ''}
          </option>
        ))}
      </select>
    </div>
  );
} 