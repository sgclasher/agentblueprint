# Database Schema Documentation

## 🗄️ Core Tables

### **client_profiles**
Primary table for all profile data with JSONB flexibility.

```sql
CREATE TABLE client_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_data JSONB NOT NULL,           -- Flexible profile content
  markdown_content TEXT,                 -- Generated markdown representation
  timeline_cache JSONB,                  -- Cached AI timeline data
  ai_opportunities_cache JSONB,          -- Cached AI opportunities analysis
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **credentials**
Encrypted storage for user API credentials.

```sql
CREATE TABLE credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,            -- 'openai', 'gemini', 'claude', etc.
  encrypted_credentials TEXT NOT NULL,   -- AES-256-GCM encrypted JSON
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, service_name)
);
```

## 📊 JSONB Schema Flexibility

### **profile_data Structure**
The `profile_data` JSONB column stores profile information with **backward compatibility**:

```json
{
  "companyName": "TechCorp Solutions",
  "industry": "Technology",
  "employeeCount": "250-500",
  "annualRevenue": "$50M-100M", 
  "primaryLocation": "San Francisco, CA",
  "websiteUrl": "https://techcorp.com",
  "strategicInitiatives": [
    {
      "initiative": "Digital Transformation Program",
      "contact": {
        "name": "John Smith",
        "title": "Chief Digital Officer",
        "email": "john.smith@techcorp.com"
      },
      "priority": "High",
      "status": "In Progress",
      "targetTimeline": "Q3 2025",
      "estimatedBudget": "$2M-5M",
      "businessProblems": [
        "Manual processes slow down operations",
        "Limited data visibility across departments"
      ],
      "expectedOutcomes": [
        "60% reduction in manual processing time",
        "Real-time operational dashboards"
      ],
      "successMetrics": [
        "Process automation rate: 80%",
        "Data accuracy improvement: 95%"
      ]
    }
  ],
  "systemsAndApplications": [
    {
      "name": "Salesforce CRM",
      "category": "CRM",
      "vendor": "Salesforce",
      "version": "Enterprise",
      "criticality": "High",
      "description": "Primary customer relationship management system"
    }
  ]
}
```

### **Cache Structures**

#### **timeline_cache**
```json
{
  "timeline": { /* AI-generated timeline object */ },
  "scenarioType": "balanced",
  "generatedAt": "2025-01-15T10:30:00Z",
  "provider": "gemini-2.5-pro-preview-06-05"
}
```

#### **ai_opportunities_cache**  
```json
{
  "opportunities": { /* AI opportunities analysis */ },
  "generatedAt": "2025-01-15T10:30:00Z",
  "provider": "openai",
  "analysisMetadata": {
    "initiativeCount": 3,
    "problemCount": 8,
    "systemCount": 5
  }
}
```

## 🔐 Row Level Security (RLS)

### **Security Policies**
```sql
-- Users can only access their own profiles
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profiles" ON client_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profiles" ON client_profiles  
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profiles" ON client_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own profiles" ON client_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Similar policies for credentials table
ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;
-- ... (similar policies)
```

## ✅ Safe Database Changes

### **Adding New Features (Safe)**
These changes are **backward compatible** and safe to implement:

```sql
-- ✅ Adding new columns
ALTER TABLE client_profiles ADD COLUMN new_feature_cache JSONB;
ALTER TABLE client_profiles ADD COLUMN feature_metadata TEXT;

-- ✅ Adding JSONB fields (backward compatible)
-- Old profiles will ignore new fields, new profiles can use them
UPDATE client_profiles 
SET profile_data = profile_data || '{"newFeature": "defaultValue"}'
WHERE profile_data->>'newFeature' IS NULL;

-- ✅ Adding indexes for performance
CREATE INDEX idx_profiles_company_name ON client_profiles 
USING GIN ((profile_data->>'companyName'));

-- ✅ New tables for independent features
CREATE TABLE workflow_visualizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES client_profiles(id) ON DELETE CASCADE,
  workflow_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Changes Requiring Review (Potentially Breaking)**

```sql
-- ⚠️ Modifying existing columns
ALTER TABLE client_profiles ALTER COLUMN profile_data TYPE TEXT; -- BREAKING!

-- ⚠️ Removing columns  
ALTER TABLE client_profiles DROP COLUMN markdown_content; -- BREAKING!

-- ⚠️ Changing RLS policies
DROP POLICY "Users can view own profiles" ON client_profiles; -- SECURITY RISK!

-- ⚠️ Renaming tables or columns
ALTER TABLE client_profiles RENAME TO user_profiles; -- BREAKING!
```

## 🚀 Development Patterns

### **Adding Cache for New AI Feature**
```sql
-- 1. Add cache column
ALTER TABLE client_profiles ADD COLUMN my_feature_cache JSONB;

-- 2. Create index if needed
CREATE INDEX idx_profiles_my_feature_cache ON client_profiles 
USING GIN (my_feature_cache);
```

```typescript
// 3. Add repository methods
async saveMyCacheFeature(profileId: string, userId: string, cacheData: any) {
  const { error } = await this.supabase
    .from('client_profiles')
    .update({ my_feature_cache: cacheData, updated_at: new Date().toISOString() })
    .eq('id', profileId)
    .eq('user_id', userId);
    
  if (error) throw error;
}

async getMyCacheFeature(profileId: string, userId: string) {
  const { data, error } = await this.supabase
    .from('client_profiles')
    .select('my_feature_cache')
    .eq('id', profileId)
    .eq('user_id', userId)
    .single();
    
  return data?.my_feature_cache;
}
```

### **Handling JSONB Updates**
```typescript
// ✅ Safe: Add new fields to existing profiles
const newProfileData = {
  ...existingProfile,
  newFeature: newData  // Old profiles ignore this
};

// ✅ Safe: Update specific JSONB paths
await supabase
  .from('client_profiles')
  .update({ 
    profile_data: supabase.rpc('jsonb_set', {
      target: 'profile_data',
      path: '{strategicInitiatives,0,newField}',
      new_value: '"newValue"'
    })
  })
  .eq('id', profileId)
  .eq('user_id', userId);
```

## 📊 Performance Considerations

### **JSONB Indexing**
```sql
-- Index frequently queried JSON fields
CREATE INDEX idx_profiles_company_name ON client_profiles 
USING GIN ((profile_data->>'companyName'));

CREATE INDEX idx_profiles_industry ON client_profiles 
USING GIN ((profile_data->>'industry'));

-- Index for array fields
CREATE INDEX idx_profiles_initiatives ON client_profiles 
USING GIN ((profile_data->'strategicInitiatives'));
```

### **Cache Strategy**
- **Timeline Cache**: ~15KB per profile, 80-90% cost reduction
- **AI Opportunities Cache**: ~25KB per profile, significant API savings
- **Cache Invalidation**: Clear when profile_data changes
- **Cache TTL**: Consider time-based invalidation for evolving AI models

## 🔧 Migration Patterns

### **Adding New Profile Fields**
```typescript
// Migration function for adding business problems to initiatives
export function migrateProfileData(profileData: any): any {
  if (!profileData.strategicInitiatives) return profileData;
  
  return {
    ...profileData,
    strategicInitiatives: profileData.strategicInitiatives.map((initiative: any) => ({
      ...initiative,
      businessProblems: initiative.businessProblems || [], // Safe default
      expectedOutcomes: initiative.expectedOutcomes || [],
      successMetrics: initiative.successMetrics || []
    }))
  };
}
```

### **Schema Version Management**
```json
// Consider adding schema version to profile_data
{
  "_schemaVersion": "2.1",
  "companyName": "...",
  // ... rest of profile data
}
```

---

## 📋 Quick Reference

### **Safe Operations**
- ✅ Adding new columns
- ✅ Adding JSONB fields with defaults
- ✅ Creating new indexes
- ✅ Adding new tables
- ✅ Extending JSONB structures

### **Requires Review**
- ⚠️ Modifying existing columns
- ⚠️ Removing columns or tables
- ⚠️ Changing RLS policies
- ⚠️ Breaking JSONB structure changes
- ⚠️ Performance-impacting changes

### **Development Checklist**
- [ ] Will existing profiles work with this change?
- [ ] Do I need data migration for existing records?
- [ ] Are new fields optional with sensible defaults?
- [ ] Does this require new indexes for performance?
- [ ] Are security policies maintained? 