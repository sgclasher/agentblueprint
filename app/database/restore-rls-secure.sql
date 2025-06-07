-- Restore RLS with Secure Policies
-- This provides both database-level and application-level security

-- Enable RLS
ALTER TABLE external_service_credentials ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own service credentials" ON external_service_credentials;
DROP POLICY IF EXISTS "Users can insert own service credentials" ON external_service_credentials;
DROP POLICY IF EXISTS "Users can update own service credentials" ON external_service_credentials;
DROP POLICY IF EXISTS "Users can delete own service credentials" ON external_service_credentials;

-- Policy 1: Users can access their own records (for client-side queries)
CREATE POLICY "Users can access own credentials" 
  ON external_service_credentials 
  FOR ALL 
  USING (auth.uid() = user_id);

-- Policy 2: Service role can access all records (for server-side API routes)
CREATE POLICY "Service role full access" 
  ON external_service_credentials 
  FOR ALL 
  TO service_role 
  USING (true);

-- This gives us:
-- ✅ Client-side queries: Protected by user authentication
-- ✅ Server-side API routes: Full access for authenticated operations
-- ✅ Double security: Database + Application level 