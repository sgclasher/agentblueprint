import { LucideIcon } from 'lucide-react';

export type ServiceType = 'ai_provider' | 'crm_system' | 'productivity_tool' | 'integration_platform';
export type TestStatus = 'success' | 'failed' | 'testing' | 'untested' | null;

export interface Credential {
  id: string;
  user_id: string;
  service_type: ServiceType;
  service_name: string;
  display_name: string;
  credentials_encrypted: string;
  encryption_metadata: object;
  configuration: { [key: string]: any };
  is_active: boolean;
  is_default: boolean;
  test_status: TestStatus;
  test_result: object | null;
  last_tested_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CredentialFormData {
    id?: string;
    serviceType: ServiceType;
    serviceName: string;
    displayName: string;
    credentials: { [key: string]: any };
    configuration: { [key: string]: any };
    isActive: boolean;
    isDefault: boolean;
}

export interface ServiceTypeInfo {
    id: ServiceType;
    name: string;
    icon: LucideIcon;
    description: string;
}

export interface ServiceField {
    name: string;
    label: string;
    type: string;
    required: boolean;
    options?: { value: string, label: string }[];
    placeholder?: string;
    defaultValue?: string | number;
    step?: number;
    min?: number;
    max?: number;
    key?: string;
}

export interface ServiceConfig {
    name: string;
    description?: string;
    fields: ServiceField[];
}

export interface ServiceConfigs {
    [key: string]: {
        [key:string]: ServiceConfig;
    }
}

// Dynamic model refresh types
export interface ModelOption {
    id: string;
    name: string;
    description: string;
    created?: number | null;
}

export interface ModelRefreshState {
    loading: boolean;
    error: string | null;
    lastRefreshed: Date | null;
}

export interface FetchModelsResponse {
    success: boolean;
    provider: string;
    models?: ModelOption[];
    cached?: boolean;
    cachedAt?: string;
    fetchedAt?: string;
    error?: string;
    fallbackModels?: ModelOption[];
    remaining?: number;
    resetTime?: number;
} 