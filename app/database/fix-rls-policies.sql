-- Fix RLS Policies for Server-Side Authentication
-- Run this in your Supabase SQL Editor

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own service credentials" ON external_service_credentials;
DROP POLICY IF EXISTS "Users can insert own service credentials" ON external_service_credentials;
DROP POLICY IF EXISTS "Users can update own service credentials" ON external_service_credentials;
DROP POLICY IF EXISTS "Users can delete own service credentials" ON external_service_credentials;

-- Disable RLS temporarily to allow server-side access
ALTER TABLE external_service_credentials DISABLE ROW LEVEL SECURITY;

-- Alternative: Create more permissive policies that work with server-side auth
-- Uncomment these if you want to keep RLS enabled:

/*
-- Create new policies that work with both client and server-side auth
CREATE POLICY "Users can view own service credentials" 
  ON external_service_credentials FOR SELECT 
  USING (
    auth.uid() = user_id OR 
    auth.uid() IS NULL  -- Allow server-side access
  );

CREATE POLICY "Users can insert own service credentials" 
  ON external_service_credentials FOR INSERT 
  WITH CHECK (
    auth.uid() = user_id OR 
    auth.uid() IS NULL  -- Allow server-side access
  );

CREATE POLICY "Users can update own service credentials" 
  ON external_service_credentials FOR UPDATE 
  USING (
    auth.uid() = user_id OR 
    auth.uid() IS NULL  -- Allow server-side access
  );

CREATE POLICY "Users can delete own service credentials" 
  ON external_service_credentials FOR DELETE 
  USING (
    auth.uid() = user_id OR 
    auth.uid() IS NULL  -- Allow server-side access
  );
*/ 