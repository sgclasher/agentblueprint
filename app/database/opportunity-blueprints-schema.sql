-- Migration: Add Opportunity-Blueprints Multi-Blueprint Support
-- Description: Adds opportunity_blueprints column for storing multiple blueprints per opportunity in the profiles table
-- Date: January 2025
-- Phase: 1 - Foundation (Database Migration & Type Definitions)

-- Start transaction for atomic migration
BEGIN;

-- Add opportunity_blueprints column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS opportunity_blueprints JSONB[] DEFAULT '{}';

-- Add index for efficient querying of opportunity blueprints
CREATE INDEX IF NOT EXISTS idx_profiles_opportunity_blueprints 
ON profiles USING gin (opportunity_blueprints) 
WHERE opportunity_blueprints IS NOT NULL AND array_length(opportunity_blueprints, 1) > 0;

-- Add index for searching within opportunity blueprint data
-- Default GIN operator class works correctly with JSONB arrays
CREATE INDEX IF NOT EXISTS idx_profiles_opportunity_blueprints_search  
ON profiles USING gin (opportunity_blueprints)
WHERE opportunity_blueprints IS NOT NULL;

-- Add comment explaining the column purpose
COMMENT ON COLUMN profiles.opportunity_blueprints IS 
'Array of opportunity-specific blueprint data, each containing: opportunityId, opportunity context, generated blueprint, metadata. Enables multiple blueprints per profile linked to specific AI opportunities.';

-- Note: Data validation will be handled at the application layer
-- PostgreSQL CHECK constraints cannot contain subqueries, so we rely on:
-- 1. TypeScript validateOpportunityBlueprint() function  
-- 2. PostgreSQL functions with proper validation logic
-- 3. Application-level type safety

-- Create function to safely add opportunity blueprint
CREATE OR REPLACE FUNCTION add_opportunity_blueprint(
  p_user_id UUID,
  p_opportunity_blueprint JSONB
) RETURNS BOOLEAN AS $$
DECLARE
  existing_index INTEGER;
  existing_blueprints JSONB[];
  opportunity_id TEXT;
BEGIN
  -- Extract opportunity ID for validation
  opportunity_id := p_opportunity_blueprint->>'opportunityId';
  
  IF opportunity_id IS NULL THEN
    RAISE EXCEPTION 'OpportunityId is required in blueprint data';
  END IF;
  
  -- Get current blueprints array
  SELECT opportunity_blueprints INTO existing_blueprints
  FROM profiles 
  WHERE user_id = p_user_id;
  
  IF existing_blueprints IS NULL THEN
    existing_blueprints := '{}';
  END IF;
  
  -- Find existing blueprint with same opportunity ID
  SELECT idx INTO existing_index
  FROM unnest(existing_blueprints) WITH ORDINALITY AS t(elem, idx)
  WHERE elem->>'opportunityId' = opportunity_id;
  
  IF existing_index IS NOT NULL THEN
    -- Replace existing blueprint
    existing_blueprints[existing_index] := p_opportunity_blueprint;
  ELSE
    -- Add new blueprint
    existing_blueprints := array_append(existing_blueprints, p_opportunity_blueprint);
  END IF;
  
  -- Update the profile
  UPDATE profiles 
  SET opportunity_blueprints = existing_blueprints,
      updated_at = NOW()
  WHERE user_id = p_user_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get opportunity blueprint by ID
CREATE OR REPLACE FUNCTION get_opportunity_blueprint(
  p_user_id UUID,
  p_opportunity_id TEXT
) RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT elem INTO result
  FROM profiles,
       unnest(opportunity_blueprints) AS elem
  WHERE user_id = p_user_id 
    AND elem->>'opportunityId' = p_opportunity_id;
    
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to list all opportunity blueprints for a user
CREATE OR REPLACE FUNCTION list_opportunity_blueprints(
  p_user_id UUID
) RETURNS JSONB[] AS $$
DECLARE
  result JSONB[];
BEGIN
  SELECT opportunity_blueprints INTO result
  FROM profiles 
  WHERE user_id = p_user_id;
  
  RETURN COALESCE(result, '{}');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to remove opportunity blueprint
CREATE OR REPLACE FUNCTION remove_opportunity_blueprint(
  p_user_id UUID,
  p_opportunity_id TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  existing_blueprints JSONB[];
  filtered_blueprints JSONB[];
BEGIN
  -- Get current blueprints array
  SELECT opportunity_blueprints INTO existing_blueprints
  FROM profiles 
  WHERE user_id = p_user_id;
  
  IF existing_blueprints IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Filter out the blueprint with matching opportunity ID
  SELECT array_agg(elem) INTO filtered_blueprints
  FROM unnest(existing_blueprints) AS elem
  WHERE elem->>'opportunityId' != p_opportunity_id;
  
  -- Update the profile
  UPDATE profiles 
  SET opportunity_blueprints = COALESCE(filtered_blueprints, '{}'),
      updated_at = NOW()
  WHERE user_id = p_user_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Migration utility function to convert existing single blueprint to opportunity-based
CREATE OR REPLACE FUNCTION migrate_legacy_blueprint_to_opportunity(
  p_user_id UUID,
  p_opportunity_data JSONB DEFAULT NULL
) RETURNS BOOLEAN AS $$
DECLARE
  legacy_blueprint JSONB;
  opportunity_blueprint JSONB;
  opportunity_id TEXT;
BEGIN
  -- Get existing single blueprint
  SELECT agentic_blueprint_cache INTO legacy_blueprint
  FROM profiles 
  WHERE user_id = p_user_id
    AND agentic_blueprint_cache IS NOT NULL;
  
  IF legacy_blueprint IS NULL THEN
    RETURN FALSE; -- No legacy blueprint to migrate
  END IF;
  
  -- Generate opportunity ID for legacy migration
  opportunity_id := 'legacy_migration_' || extract(epoch from now())::text;
  
  -- Create opportunity blueprint structure
  opportunity_blueprint := jsonb_build_object(
    'opportunityId', opportunity_id,
    'opportunity', COALESCE(p_opportunity_data, jsonb_build_object(
      'title', 'Legacy Blueprint Migration',
      'description', 'Migrated from single blueprint storage',
      'category', 'Process Automation',
      'businessImpact', jsonb_build_object(
        'primaryMetrics', '["Migrated from legacy blueprint"]',
        'estimatedROI', 'See blueprint details',
        'timeToValue', 'Immediate',
        'confidenceLevel', 'Medium'
      ),
      'implementation', jsonb_build_object(
        'complexity', 'Medium',
        'timeframe', 'See blueprint timeline',
        'prerequisites', '[]',
        'riskFactors', '[]'
      ),
      'relevantInitiatives', '[]',
      'aiTechnologies', '["Legacy Blueprint"]'
    )),
    'blueprint', legacy_blueprint,
    'generatedAt', legacy_blueprint->>'createdAt',
    'aiModel', COALESCE(legacy_blueprint->>'aiModel', 'legacy')
  );
  
  -- Add to opportunity blueprints array
  RETURN add_opportunity_blueprint(p_user_id, opportunity_blueprint);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add migration status tracking
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'migration_status'
    ) THEN
        ALTER TABLE profiles 
        ADD COLUMN migration_status JSONB DEFAULT '{}';
    END IF;
END $$;

-- Verify the migration was successful
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'opportunity_blueprints'
    ) THEN
        RAISE NOTICE 'SUCCESS: opportunity_blueprints column added to profiles table';
    ELSE
        RAISE EXCEPTION 'FAILED: opportunity_blueprints column was not added to profiles table';
    END IF;
    
    -- Check indexes
    IF EXISTS (
        SELECT 1 
        FROM pg_indexes 
        WHERE tablename = 'profiles' 
        AND indexname = 'idx_profiles_opportunity_blueprints'
    ) THEN
        RAISE NOTICE 'SUCCESS: GIN index created for opportunity_blueprints';
    ELSE
        RAISE EXCEPTION 'FAILED: GIN index was not created for opportunity_blueprints';
    END IF;
    
    -- Check functions
    IF EXISTS (
        SELECT 1 
        FROM information_schema.routines 
        WHERE routine_name = 'add_opportunity_blueprint'
    ) THEN
        RAISE NOTICE 'SUCCESS: Helper functions created for opportunity blueprint management';
    ELSE
        RAISE EXCEPTION 'FAILED: Helper functions were not created';
    END IF;
END $$;

-- Commit the transaction
COMMIT;

-- Display final status
SELECT 
  'Migration completed successfully' as status,
  now() as completed_at,
  'Added opportunity_blueprints JSONB[] column with indexes and helper functions' as details; 