'use client';

import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import styles from './ProviderSelector.module.css';
import { supabase } from '../../lib/supabase';
import { CredentialsRepository } from '../../repositories/credentialsRepository';

interface Provider {
    service_name: string;
    display_name: string;
    is_default: boolean;
}

interface ProviderSelectorProps {
    selectedProvider: string | null;
    onProviderChange: (provider: string) => void;
    disabled?: boolean;
}

const ProviderSelector: FC<ProviderSelectorProps> = ({ selectedProvider, onProviderChange, disabled }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setIsLoading(true);
        
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setProviders([]);
          setIsLoading(false);
          return;
        }

        const data = await CredentialsRepository.getProvidersByType(supabase, user.id, 'ai_provider');
        
        const typedProviders = data as Provider[];
        setProviders(typedProviders);

        if (typedProviders.length > 0 && !selectedProvider) {
          const defaultProvider = typedProviders.find(p => p.is_default) || typedProviders[0];
          if (defaultProvider) {
            onProviderChange(defaultProvider.service_name);
          }
        }
      } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching AI providers:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, [selectedProvider, onProviderChange]);

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
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onProviderChange(e.target.value)}
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

export default ProviderSelector; 