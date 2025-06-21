-- ====================================================================
-- Focused Timelines Schema Migration
-- ====================================================================
-- This migration creates the new timelines table to support multiple
-- timelines per profile, including master and focused (initiative) timelines.
--
-- This maintains backward compatibility with existing timeline_data in profiles
-- while enabling focused timelines for individual strategic initiatives.
--
-- Run this in your Supabase SQL editor to enable focused timeline functionality
-- ====================================================================

-- ====================================================================
-- Timelines Table
-- ====================================================================
-- Stores multiple timelines per profile with support for different types
CREATE TABLE timelines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Timeline identification
  timeline_type TEXT NOT NULL CHECK (timeline_type IN ('master', 'focused')),
  initiative_id TEXT, -- References strategic initiative ID from profile_data
  initiative_name TEXT, -- Cached initiative name for easy querying
  
  -- Timeline content and metadata
  timeline_data JSONB NOT NULL,
  scenario_type TEXT DEFAULT 'balanced' CHECK (scenario_type IN ('conservative', 'balanced', 'aggressive')),
  
  -- Quality and versioning
  quality_score INTEGER CHECK (quality_score >= 0 AND quality_score <= 100),
  prompt_version TEXT, -- Track which prompt version generated this timeline
  ai_model TEXT, -- Track which AI model was used
  
  -- User feedback
  user_rating INTEGER CHECK (user_rating >= 1 AND user_rating <= 5),
  feedback_notes TEXT,
  
  -- Generation metadata
  generation_duration_ms INTEGER,
  tokens_used INTEGER,
  cost_cents INTEGER, -- Track AI API costs
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT timelines_master_no_initiative CHECK (
    (timeline_type = 'master' AND initiative_id IS NULL) OR 
    (timeline_type = 'focused' AND initiative_id IS NOT NULL)
  )
);

-- ====================================================================
-- Indexes for Performance
-- ====================================================================

-- Primary access patterns
CREATE INDEX idx_timelines_profile_id ON timelines(profile_id);
CREATE INDEX idx_timelines_user_id ON timelines(user_id);
CREATE INDEX idx_timelines_profile_type ON timelines(profile_id, timeline_type);

-- Initiative-specific queries
CREATE INDEX idx_timelines_initiative ON timelines(profile_id, initiative_id) WHERE timeline_type = 'focused';

-- Timeline content searches
CREATE INDEX idx_timelines_data ON timelines USING GIN (timeline_data);
CREATE INDEX idx_timelines_scenario ON timelines(profile_id, scenario_type);

-- Quality and feedback analysis
CREATE INDEX idx_timelines_quality ON timelines(timeline_type, quality_score, created_at);
CREATE INDEX idx_timelines_rating ON timelines(user_rating, created_at) WHERE user_rating IS NOT NULL;

-- Performance monitoring
CREATE INDEX idx_timelines_generation_time ON timelines(ai_model, generation_duration_ms, created_at);

-- ====================================================================
-- Row Level Security (RLS) Policies
-- ====================================================================

-- Enable RLS
ALTER TABLE timelines ENABLE ROW LEVEL SECURITY;

-- Users can only access their own timelines
CREATE POLICY "Users can view their own timelines" 
  ON timelines FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own timelines" 
  ON timelines FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own timelines" 
  ON timelines FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own timelines"
  ON timelines FOR DELETE
  USING (auth.uid() = user_id);

-- ====================================================================
-- Functions and Triggers
-- ====================================================================

-- Trigger for updated_at timestamp
CREATE TRIGGER update_timelines_updated_at 
  BEFORE UPDATE ON timelines 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to get timeline summary for a profile
CREATE OR REPLACE FUNCTION get_profile_timelines_summary(profile_uuid UUID)
RETURNS TABLE(
    timeline_type TEXT,
    initiative_id TEXT,
    initiative_name TEXT,
    scenario_type TEXT,
    quality_score INTEGER,
    user_rating INTEGER,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.timeline_type,
        t.initiative_id,
        t.initiative_name,
        t.scenario_type,
        t.quality_score,
        t.user_rating,
        t.created_at,
        t.updated_at
    FROM timelines t
    JOIN profiles p ON t.profile_id = p.id
    WHERE p.id = profile_uuid
    ORDER BY 
        CASE t.timeline_type 
            WHEN 'master' THEN 1 
            WHEN 'focused' THEN 2 
        END,
        t.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if a focused timeline exists for an initiative
CREATE OR REPLACE FUNCTION has_focused_timeline(profile_uuid UUID, init_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS(
        SELECT 1 
        FROM timelines t
        JOIN profiles p ON t.profile_id = p.id
        WHERE p.id = profile_uuid 
        AND t.timeline_type = 'focused' 
        AND t.initiative_id = init_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get quality metrics for prompt optimization
CREATE OR REPLACE FUNCTION get_timeline_quality_metrics(days_back INTEGER DEFAULT 30)
RETURNS TABLE(
    timeline_type TEXT,
    ai_model TEXT,
    prompt_version TEXT,
    avg_quality_score NUMERIC,
    avg_user_rating NUMERIC,
    total_timelines BIGINT,
    avg_generation_time_ms NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.timeline_type,
        t.ai_model,
        t.prompt_version,
        AVG(t.quality_score::NUMERIC) as avg_quality_score,
        AVG(t.user_rating::NUMERIC) as avg_user_rating,
        COUNT(*) as total_timelines,
        AVG(t.generation_duration_ms::NUMERIC) as avg_generation_time_ms
    FROM timelines t
    WHERE t.created_at >= NOW() - INTERVAL '%s days' % days_back
    GROUP BY t.timeline_type, t.ai_model, t.prompt_version
    ORDER BY avg_quality_score DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION get_profile_timelines_summary(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION has_focused_timeline(UUID, TEXT) TO authenticated;

-- Grant execute on quality metrics function to service role (for admin analysis)
GRANT EXECUTE ON FUNCTION get_timeline_quality_metrics(INTEGER) TO service_role;

-- ====================================================================
-- Data Migration (Optional)
-- ====================================================================
-- Migrate existing timeline_data from profiles table to new timelines table
-- This preserves existing master timelines while preparing for focused ones

INSERT INTO timelines (
    profile_id, 
    user_id, 
    timeline_type, 
    timeline_data, 
    scenario_type,
    created_at,
    updated_at
)
SELECT 
    p.id as profile_id,
    p.user_id,
    'master' as timeline_type,
    p.timeline_data,
    COALESCE(p.timeline_data->>'scenarioType', 'balanced') as scenario_type,
    COALESCE(p.last_timeline_generated_at, p.created_at) as created_at,
    COALESCE(p.last_timeline_generated_at, p.updated_at) as updated_at
FROM profiles p 
WHERE p.timeline_data IS NOT NULL
AND NOT EXISTS (
    SELECT 1 FROM timelines t 
    WHERE t.profile_id = p.id AND t.timeline_type = 'master'
);

-- ====================================================================
-- Migration Notes
-- ====================================================================
-- BREAKING CHANGES: None - this is additive
-- 
-- NEW FEATURES ENABLED:
-- - Multiple timelines per profile (master + focused)
-- - Quality scoring and user feedback collection
-- - Performance monitoring and prompt optimization
-- - Initiative-specific timeline generation
-- 
-- BACKWARD COMPATIBILITY:
-- - Existing timeline_data in profiles table is preserved
-- - Migration automatically copies existing timelines to new table
-- - Old timeline APIs will continue to work with profiles.timeline_data
-- 
-- NEXT STEPS AFTER RUNNING THIS MIGRATION:
-- 1. Update timeline repository to use new table
-- 2. Create focused timeline generation APIs
-- 3. Update frontend to support multiple timeline types
-- ==================================================================== 