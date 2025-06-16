-- ====================================================================
-- Agentic AI Flow - Single Profile Database Schema
-- ====================================================================
-- This file contains the Supabase database schema for a single-profile
-- architecture, aligning with the project's refactoring goals.
--
-- Run these commands in your Supabase SQL editor after creating your project.
-- ====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================================================
-- Profiles Table
-- ====================================================================
-- Stores the single business profile associated with each user.
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE, -- Enforces one profile per user
  profile_data JSONB NOT NULL,           -- Flexible profile content
  markdown_content TEXT,                 -- Generated markdown representation
  timeline_cache JSONB,                  -- Cached AI timeline data
  ai_opportunities_cache JSONB,          -- Cached AI opportunities analysis
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- Credentials Table
-- ====================================================================
-- Stores encrypted API credentials for various services per user.
CREATE TABLE credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,            -- e.g., 'openai', 'gemini', 'claude'
  encrypted_credentials TEXT NOT NULL,   -- AES-256-GCM encrypted JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, service_name)
);

-- ====================================================================
-- Row Level Security (RLS) Policies
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

-- Profiles: A user can only access their own single profile.
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = user_id);

-- Credentials: Users can only manage their own credentials.
CREATE POLICY "Users can view their own credentials" 
  ON credentials FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own credentials" 
  ON credentials FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own credentials" 
  ON credentials FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own credentials" 
  ON credentials FOR DELETE 
  USING (auth.uid() = user_id);

-- ====================================================================
-- Functions and Triggers
-- ====================================================================

-- Function to update the updated_at timestamp on any table with the column.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for the 'profiles' table.
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger for the 'credentials' table.
CREATE TRIGGER update_credentials_updated_at 
  BEFORE UPDATE ON credentials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================================================
-- Indexes for Performance
-- ====================================================================

-- Profiles indexes
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
-- Add GIN indexes for faster search on specific JSONB fields if needed
CREATE INDEX idx_profiles_data_company_name ON profiles USING GIN ((profile_data -> 'companyName'));
CREATE INDEX idx_profiles_data_industry ON profiles USING GIN ((profile_data -> 'industry'));


-- Credentials indexes
CREATE INDEX idx_credentials_user_id ON credentials(user_id);
CREATE INDEX idx_credentials_user_service ON credentials(user_id, service_name);

-- ====================================================================
-- Sample Data (Optional - for development)
-- ====================================================================

-- Note: This will be populated automatically when users sign up
-- The handle_new_user() function creates the user profile automatically 