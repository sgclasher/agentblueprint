-- ====================================================================
-- AI Opportunities Analysis - Database Migration
-- ====================================================================
-- This migration adds the necessary columns for AI Opportunities Analysis
-- feature to the client_profiles table.
--
-- Run this in your Supabase SQL editor to add the missing columns.
-- ====================================================================

-- Add opportunities analysis columns to client_profiles table
ALTER TABLE client_profiles 
ADD COLUMN IF NOT EXISTS opportunities_data JSONB,
ADD COLUMN IF NOT EXISTS last_opportunities_generated_at TIMESTAMPTZ;

-- Add index for opportunities queries
CREATE INDEX IF NOT EXISTS idx_client_profiles_opportunities_generated 
ON client_profiles(user_id, last_opportunities_generated_at);

-- Add comment for documentation
COMMENT ON COLUMN client_profiles.opportunities_data IS 'Cached AI opportunities analysis results in JSON format';
COMMENT ON COLUMN client_profiles.last_opportunities_generated_at IS 'Timestamp when opportunities analysis was last generated';

-- Verify the columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'client_profiles' 
AND column_name IN ('opportunities_data', 'last_opportunities_generated_at'); 