-- ====================================================================
-- Timeline Storage Schema Migration
-- ====================================================================
-- This migration adds the timeline storage columns that the generation API
-- expects, while maintaining backward compatibility with existing timeline_cache
--
-- Run this in your Supabase SQL editor to enable proper timeline persistence
-- ====================================================================

-- Add timeline storage columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS timeline_data JSONB,
ADD COLUMN IF NOT EXISTS last_timeline_generated_at TIMESTAMP WITH TIME ZONE;

-- Create indexes for efficient timeline queries
CREATE INDEX IF NOT EXISTS idx_profiles_timeline_generated_at 
ON profiles(user_id, last_timeline_generated_at);

CREATE INDEX IF NOT EXISTS idx_profiles_timeline_data 
ON profiles USING GIN (timeline_data);

-- Create index for timeline scenario queries
CREATE INDEX IF NOT EXISTS idx_profiles_timeline_scenario 
ON profiles USING GIN ((timeline_data->'scenarioType'));

-- Update function to handle timeline metadata
CREATE OR REPLACE FUNCTION get_timeline_metadata(user_uuid UUID)
RETURNS TABLE(
    has_timeline BOOLEAN,
    generated_at TIMESTAMP WITH TIME ZONE,
    scenario_type TEXT,
    cache_age_minutes INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        timeline_data IS NOT NULL as has_timeline,
        last_timeline_generated_at as generated_at,
        timeline_data->>'scenarioType' as scenario_type,
        EXTRACT(EPOCH FROM (NOW() - last_timeline_generated_at))/60 as cache_age_minutes
    FROM profiles 
    WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_timeline_metadata(UUID) TO authenticated;

-- ====================================================================
-- Migration Notes
-- ====================================================================
-- - timeline_data: Stores the full timeline object with metadata
-- - last_timeline_generated_at: Timestamp for cache invalidation
-- - timeline_cache: Kept for backward compatibility, can be deprecated later
-- - New indexes optimize timeline queries by user and generation time
-- - Function provides timeline metadata for UI state management
-- ==================================================================== 