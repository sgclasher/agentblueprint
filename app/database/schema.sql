-- ====================================================================
-- Phase 3: Authentication System - Database Schema
-- ====================================================================
-- This file contains the Supabase database schema for user management
-- and encrypted credential storage as specified in Phase 3 of the roadmap.
--
-- Run these commands in your Supabase SQL editor after creating your project.
-- ====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================================================
-- User Profiles Table
-- ====================================================================
-- Extends Supabase auth.users with additional profile information
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- User preferences
  theme TEXT DEFAULT 'dark' CHECK (theme IN ('dark', 'light')),
  timezone TEXT DEFAULT 'UTC',
  
  -- Organization info (for future multi-org support)
  organization_id UUID,
  organization_name TEXT
);

-- ====================================================================
-- ServiceNow Connections Table
-- ====================================================================
-- Stores encrypted ServiceNow credentials per user
CREATE TABLE servicenow_connections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  
  name TEXT NOT NULL, -- User-defined name for this connection
  instance_url TEXT NOT NULL,
  
  -- Encrypted credentials (AES-256)
  encrypted_username TEXT,
  encrypted_password TEXT,
  encryption_iv TEXT, -- Initialization vector for encryption
  
  -- Connection metadata
  is_active BOOLEAN DEFAULT true,
  last_tested_at TIMESTAMPTZ,
  test_result JSONB, -- Store last connection test result
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Ensure unique connection names per user
  UNIQUE(user_id, name)
);

-- ====================================================================
-- Client Profiles Table (for Phase 4 migration)
-- ====================================================================
-- This will be used in Phase 4 to migrate from localStorage
CREATE TABLE client_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  
  -- Profile metadata
  name TEXT NOT NULL,
  description TEXT,
  industry TEXT,
  company_size TEXT,
  
  -- Profile data (stored as structured JSONB)
  profile_data JSONB NOT NULL DEFAULT '{}',
  markdown_content TEXT, -- Generated markdown
  
  -- Timeline generation metadata
  last_timeline_generated_at TIMESTAMPTZ,
  timeline_data JSONB,
  
  -- Sharing and collaboration (future feature)
  is_public BOOLEAN DEFAULT false,
  shared_with TEXT[], -- Array of user IDs or email addresses
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- Audit Log Table
-- ====================================================================
-- Track important user actions for security and debugging
CREATE TABLE audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  
  action TEXT NOT NULL, -- 'auth.signin', 'profile.create', 'connection.test', etc.
  resource_type TEXT, -- 'user', 'profile', 'connection', etc.
  resource_id UUID,
  
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- Row Level Security (RLS) Policies
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicenow_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- User Profiles: Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = id);

-- ServiceNow Connections: Users can only see/edit their own connections
CREATE POLICY "Users can view own connections" 
  ON servicenow_connections FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own connections" 
  ON servicenow_connections FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own connections" 
  ON servicenow_connections FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own connections" 
  ON servicenow_connections FOR DELETE 
  USING (auth.uid() = user_id);

-- Client Profiles: Users can only see/edit their own profiles
CREATE POLICY "Users can view own client profiles" 
  ON client_profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own client profiles" 
  ON client_profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own client profiles" 
  ON client_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own client profiles" 
  ON client_profiles FOR DELETE 
  USING (auth.uid() = user_id);

-- Audit Logs: Users can only view their own logs
CREATE POLICY "Users can view own audit logs" 
  ON audit_logs FOR SELECT 
  USING (auth.uid() = user_id);

-- ====================================================================
-- Functions and Triggers
-- ====================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_servicenow_connections_updated_at 
  BEFORE UPDATE ON servicenow_connections 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_profiles_updated_at 
  BEFORE UPDATE ON client_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================================================
-- Indexes for Performance
-- ====================================================================

-- User profile indexes
CREATE INDEX idx_user_profiles_organization_id ON user_profiles(organization_id);

-- ServiceNow connections indexes
CREATE INDEX idx_servicenow_connections_user_id ON servicenow_connections(user_id);
CREATE INDEX idx_servicenow_connections_active ON servicenow_connections(user_id, is_active);

-- Client profiles indexes
CREATE INDEX idx_client_profiles_user_id ON client_profiles(user_id);
CREATE INDEX idx_client_profiles_industry ON client_profiles(industry);
CREATE INDEX idx_client_profiles_created_at ON client_profiles(created_at);

-- Audit logs indexes
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ====================================================================
-- Sample Data (Optional - for development)
-- ====================================================================

-- Note: This will be populated automatically when users sign up
-- The handle_new_user() function creates the user profile automatically 