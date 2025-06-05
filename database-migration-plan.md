# Supabase Database Migration Plan

## Phase 4: Database Migration (After Modular Forms)

### Current Architecture
```
Forms → Clean JSON → localStorage
```

### Target Architecture  
```
Forms → Clean JSON → Supabase → Row-Level Security
```

## Database Schema

### 1. `client_profiles` Table
```sql
CREATE TABLE client_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Info
  company_name TEXT NOT NULL,
  industry TEXT,
  size TEXT,
  annual_revenue TEXT,
  location TEXT,
  
  -- Structured Data (JSONB for flexibility)
  expected_outcome JSONB DEFAULT '{}',
  problems JSONB DEFAULT '{}', 
  solutions JSONB DEFAULT '{}',
  value JSONB DEFAULT '{}',
  current_architecture JSONB DEFAULT '{}',
  
  -- Metadata
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Search & Performance
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', 
      coalesce(company_name, '') || ' ' || 
      coalesce(industry, '')
    )
  ) STORED
);

-- Indexes for performance
CREATE INDEX client_profiles_user_id_idx ON client_profiles(user_id);
CREATE INDEX client_profiles_search_idx ON client_profiles USING gin(search_vector);
CREATE INDEX client_profiles_company_idx ON client_profiles(company_name);
```

### 2. Row-Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;

-- Users can only see their own profiles
CREATE POLICY "Users can view own profiles" ON client_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own profiles  
CREATE POLICY "Users can create own profiles" ON client_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own profiles
CREATE POLICY "Users can update own profiles" ON client_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own profiles
CREATE POLICY "Users can delete own profiles" ON client_profiles
  FOR DELETE USING (auth.uid() = user_id);
```

### 3. `profile_timelines` Table (Future)
```sql
CREATE TABLE profile_timelines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES client_profiles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Timeline Data
  scenario_type TEXT DEFAULT 'balanced',
  timeline_data JSONB NOT NULL,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

## Implementation Priority

### Next Chat Focus:
1. Create Supabase tables with the schema above
2. Update ProfileService to use Supabase instead of localStorage  
3. Add migration utility for existing data
4. Test with modular forms
5. Add real-time subscriptions

The modular forms are ready - just need to connect to the database! 