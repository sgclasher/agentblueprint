-- Proper RLS Fix for Server-Side Authentication
-- This maintains security while allowing the API routes to work

-- Enable RLS (if disabled)
ALTER TABLE external_service_credentials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own service credentials" ON external_service_credentials;
DROP POLICY IF EXISTS "Users can insert own service credentials" ON external_service_credentials;
DROP POLICY IF EXISTS "Users can update own service credentials" ON external_service_credentials;
DROP POLICY IF EXISTS "Users can delete own service credentials" ON external_service_credentials;

-- Create proper policies that work with service role
-- The API routes use the service role key, which bypasses RLS automatically
-- But we need policies for client-side access

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