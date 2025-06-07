-- ====================================================================
-- Phase 6.1.5: Admin Interface - External Service Credentials
-- ====================================================================
-- Unified table for managing all external service credentials per user
-- Supports AI providers (OpenAI, Gemini, Claude), CRM systems, and future integrations
-- ====================================================================

-- External Service Credentials Table
CREATE TABLE external_service_credentials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  
  -- Service identification
  service_type TEXT NOT NULL, -- 'ai_provider', 'crm_system', 'productivity_tool', etc.
  service_name TEXT NOT NULL, -- 'openai', 'gemini', 'claude', 'servicenow', 'hubspot', etc.
  display_name TEXT NOT NULL, -- User-friendly name: "OpenAI GPT-4o", "ServiceNow Production", etc.
  
  -- Credential storage (AES-256-GCM encrypted)
  credentials_encrypted JSONB NOT NULL, -- Encrypted credential data
  encryption_metadata JSONB NOT NULL,   -- IVs, auth tags, algorithm info
  
  -- Configuration and metadata
  configuration JSONB DEFAULT '{}',     -- Service-specific config (models, endpoints, etc.)
  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false,     -- Default provider for service type
  
  -- Connection testing
  last_tested_at TIMESTAMPTZ,
  test_result JSONB,                    -- Last connection test results
  test_status TEXT DEFAULT 'untested', -- 'untested', 'success', 'failed'
  
  -- Usage tracking
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Constraints
  UNIQUE(user_id, service_type, service_name), -- One config per service per user
  CHECK (service_type IN ('ai_provider', 'crm_system', 'productivity_tool', 'integration_platform')),
  CHECK (test_status IN ('untested', 'testing', 'success', 'failed'))
);

-- Enable RLS
ALTER TABLE external_service_credentials ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own service credentials" 
  ON external_service_credentials FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own service credentials" 
  ON external_service_credentials FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own service credentials" 
  ON external_service_credentials FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own service credentials" 
  ON external_service_credentials FOR DELETE 
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_external_service_credentials_user_id ON external_service_credentials(user_id);
CREATE INDEX idx_external_service_credentials_service_type ON external_service_credentials(user_id, service_type);
CREATE INDEX idx_external_service_credentials_active ON external_service_credentials(user_id, is_active);
CREATE INDEX idx_external_service_credentials_default ON external_service_credentials(user_id, service_type, is_default);

-- Updated trigger for updated_at
CREATE TRIGGER update_external_service_credentials_updated_at 
  BEFORE UPDATE ON external_service_credentials 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to ensure only one default per service type per user
CREATE OR REPLACE FUNCTION ensure_single_default_service()
RETURNS TRIGGER AS $$
BEGIN
  -- If this record is being set as default, unset all other defaults for this user/service_type
  IF NEW.is_default = true THEN
    UPDATE external_service_credentials 
    SET is_default = false 
    WHERE user_id = NEW.user_id 
      AND service_type = NEW.service_type 
      AND id != NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to maintain single default
CREATE TRIGGER ensure_single_default_service_trigger
  BEFORE INSERT OR UPDATE ON external_service_credentials
  FOR EACH ROW EXECUTE FUNCTION ensure_single_default_service();

-- ====================================================================
-- Sample Service Configurations (for reference)
-- ====================================================================

-- Example AI Provider configurations:
/*
OpenAI:
{
  "model": "gpt-4o",
  "max_tokens": 4000,
  "temperature": 0.7,
  "endpoint": "https://api.openai.com/v1"
}

Gemini:
{
  "model": "gemini-pro",
  "max_tokens": 4000,
  "temperature": 0.7,
  "endpoint": "https://generativelanguage.googleapis.com/v1"
}

Claude:
{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 4000,
  "temperature": 0.7,
  "endpoint": "https://api.anthropic.com/v1"
}
*/

-- Example CRM System configurations:
/*
ServiceNow:
{
  "instance_url": "company.service-now.com",
  "scope_id": "uuid-here",
  "api_version": "v1"
}

HubSpot:
{
  "api_version": "v3",
  "endpoint": "https://api.hubapi.com"
}
*/

-- ====================================================================
-- Migration Helper Functions
-- ====================================================================

-- Function to migrate existing ServiceNow connections (if any exist)
CREATE OR REPLACE FUNCTION migrate_servicenow_connections()
RETURNS void AS $$
DECLARE
  connection_record RECORD;
BEGIN
  -- Migrate existing servicenow_connections to new unified table
  FOR connection_record IN 
    SELECT * FROM servicenow_connections WHERE is_active = true
  LOOP
    INSERT INTO external_service_credentials (
      user_id,
      service_type,
      service_name,
      display_name,
      credentials_encrypted,
      encryption_metadata,
      configuration,
      is_active,
      is_default,
      last_tested_at,
      test_result,
      created_at,
      updated_at
    ) VALUES (
      connection_record.user_id,
      'crm_system',
      'servicenow',
      connection_record.name,
      jsonb_build_object(
        'username', connection_record.encrypted_username,
        'password', connection_record.encrypted_password
      ),
      jsonb_build_object(
        'username_iv', connection_record.encryption_iv,
        'algorithm', 'aes-256-gcm'
      ),
      jsonb_build_object(
        'instance_url', connection_record.instance_url
      ),
      connection_record.is_active,
      true, -- Set as default for now
      connection_record.last_tested_at,
      connection_record.test_result,
      connection_record.created_at,
      connection_record.updated_at
    )
    ON CONFLICT (user_id, service_type, service_name) DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql; 