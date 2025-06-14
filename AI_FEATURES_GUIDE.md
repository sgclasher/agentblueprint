# AI Features Development Guide

## 🏗️ **Architecture Overview**

The platform uses a **modular, provider-agnostic AI architecture** that allows independent development of AI-powered features while sharing common infrastructure.

### **Core Components**

1. **Centralized AI Service** (`app/services/aiService.ts`)
   - Provider abstraction layer (OpenAI, Gemini, Claude)
   - Credential management integration
   - JSON response validation and repair

2. **Credential Management** (`app/repositories/credentialsRepository.ts`)
   - Encrypted storage of API keys
   - Multi-provider support
   - Admin interface integration

3. **Provider Implementations** (`app/lib/llm/providers/`)
   - `openAIProvider.ts` - OpenAI GPT models
   - `googleServerProvider.ts` - Google Gemini models  
   - `anthropicProvider.ts` - Anthropic Claude models

## 🎯 **Current AI Features**

### **Timeline Generation**
- **Service**: `app/services/timelineService.ts`
- **Prompts**: `app/lib/timeline/prompts/`
- **API**: `app/api/timeline/generate-from-profile/route.ts`
- **Database**: `cached_timeline`, `last_timeline_generated_at`
- **Caching**: 80-90% cost reduction through intelligent caching

### **AI Opportunities Analysis**
- **Service**: `app/services/aiOpportunitiesService.ts`
- **Prompts**: `app/lib/llm/prompts/aiOpportunitiesPrompt.ts`
- **API**: `app/api/profiles/analyze-opportunities/route.ts`
- **Database**: `opportunities_data`, `last_opportunities_generated_at`
- **Caching**: Database-backed with cache invalidation

## 🚀 **Adding New AI Features**

### **Step 1: Create Service Layer**

```typescript
// app/services/yourFeatureService.ts
import { aiService } from './aiService';
import { Profile } from './types';
import { CredentialsRepository } from '../repositories/credentialsRepository';

export class YourFeatureService {
  static async generateAnalysis(
    profile: Profile,
    userId: string,
    credentialsRepo: typeof CredentialsRepository,
    provider?: string
  ): Promise<YourFeatureResult> {
    
    // 1. Validate inputs
    if (!profile || !userId) {
      throw new Error('Profile and user ID are required');
    }

    // 2. Build prompts
    const systemPrompt = YOUR_FEATURE_SYSTEM_PROMPT;
    const userPrompt = buildYourFeaturePrompt(profile);

    // 3. Call AI service
    const aiResponse = await aiService.generateJson(
      systemPrompt,
      userPrompt,
      userId,
      credentialsRepo,
      provider
    );

    // 4. Validate and process response
    return this.validateAndProcessResponse(aiResponse, profile);
  }

  static validateAndProcessResponse(response: any, profile: Profile): YourFeatureResult {
    // Add validation logic
    const requiredFields = ['field1', 'field2', 'field3'];
    const missingFields = requiredFields.filter(field => !response[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    return {
      ...response,
      metadata: {
        generatedAt: new Date().toISOString(),
        profileId: profile.id,
        version: '1.0'
      }
    };
  }
}
```

### **Step 2: Create Prompt System**

```typescript
// app/lib/llm/prompts/yourFeaturePrompt.ts
export const YOUR_FEATURE_SYSTEM_PROMPT = `You are an expert in [domain].

Key capabilities:
- [Capability 1]
- [Capability 2]

Output requirements:
- Generate comprehensive analysis
- Provide specific, actionable recommendations
- Include realistic metrics and projections`;

export const YOUR_FEATURE_USER_PROMPT = (profile: Profile): string => `
Analyze the following profile and generate [specific analysis]:

**Company Profile:**
Company: ${profile.companyName}
Industry: ${profile.industry}
[... other relevant fields]

**Requirements:**
[Specific analysis requirements]

**Output Format:** 
You MUST respond with ONLY a valid JSON object:

{
  "field1": "value",
  "field2": ["array", "values"],
  "field3": {
    "nested": "object"
  }
}

**CRITICAL FOR GEMINI:** No markdown formatting, start with { and end with }.
`;
```

### **Step 3: Create API Endpoint**

```typescript
// app/api/profiles/your-feature/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { YourFeatureService } from '../../../services/yourFeatureService';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import { ProfileRepository } from '../../../repositories/profileRepository';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate request
    const { profileId, forceRegenerate = false, preferredProvider } = await request.json();
    
    // 2. Authenticate user
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // 3. Get profile with user verification
    const { data: profileData, error: profileError } = await supabase
      .from('client_profiles')
      .select('*')
      .eq('id', profileId)
      .eq('user_id', user.id)
      .single();
    
    if (profileError || !profileData) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const profile = ProfileRepository.transformFromDatabase(profileData);

    // 4. Check cache (unless forcing regeneration)
    if (!forceRegenerate && profileData.your_feature_data) {
      return NextResponse.json({
        success: true,
        data: profileData.your_feature_data,
        cached: true,
        generatedAt: profileData.last_your_feature_generated_at
      });
    }

    // 5. Generate new analysis
    const result = await YourFeatureService.generateAnalysis(
      profile,
      user.id,
      CredentialsRepository,
      preferredProvider
    );

    // 6. Cache result
    await supabase
      .from('client_profiles')
      .update({
        your_feature_data: result,
        last_your_feature_generated_at: new Date().toISOString()
      })
      .eq('id', profileId)
      .eq('user_id', user.id);

    return NextResponse.json({
      success: true,
      data: result,
      cached: false,
      generatedAt: result.metadata.generatedAt
    });

  } catch (error: any) {
    console.error('[Your Feature] Generation failed:', error);
    return NextResponse.json(
      { success: false, error: 'Analysis generation failed' },
      { status: 500 }
    );
  }
}
```

### **Step 4: Add Database Schema**

```sql
-- Add caching columns following established pattern
ALTER TABLE client_profiles ADD COLUMN your_feature_data JSONB;
ALTER TABLE client_profiles ADD COLUMN last_your_feature_generated_at TIMESTAMP;
```

### **Step 5: Add Gemini Auto-Fix (If Needed)**

If your feature returns complex JSON that Gemini might return incomplete:

```typescript
// In your API route, add after AI generation:
if (missingFields.length > 0) {
  const isGeminiProvider = actualProvider?.toLowerCase().includes('gemini');
  
  if (isGeminiProvider) {
    console.log('🔧 [AUTO-FIX] Attempting to fix incomplete Gemini response...');
    const fixedResponse = attemptYourFeatureAutoFix(aiResponse, profile);
    if (fixedResponse && missingFields.every(field => fixedResponse[field])) {
      Object.assign(aiResponse, fixedResponse);
    }
  }
}

function attemptYourFeatureAutoFix(incomplete: any, profile: Profile): any {
  const fixed = { ...incomplete };
  
  // Generate missing fields based on profile data
  if (!fixed.missingField) {
    fixed.missingField = generateDefaultValue(profile);
  }
  
  return fixed;
}
```

## 🔄 **Database Change Best Practices**

### **✅ Safe Changes**

1. **Add New Columns**
   ```sql
   ALTER TABLE client_profiles ADD COLUMN new_feature_data JSONB;
   ALTER TABLE client_profiles ADD COLUMN new_feature_setting TEXT;
   ```

2. **Extend JSONB Data**
   ```typescript
   // Profile data is flexible - just add to interface
   interface Profile {
     // existing fields...
     newField?: string;
     newSettings?: NewSettingsType;
   }
   ```

3. **Add New Tables (If Needed)**
   ```sql
   CREATE TABLE feature_analytics (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     profile_id UUID REFERENCES client_profiles(id),
     user_id UUID REFERENCES auth.users(id),
     analytics_data JSONB,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

### **⚠️ Risky Changes**

1. **Changing Existing Columns**
2. **Removing Columns Used by Other Features**
3. **Changing JSONB Structure Without Migration**

### **🔄 Migration Pattern**

```typescript
// app/repositories/profileRepository.ts
static transformFromDatabase(dbData: any): Profile {
  return {
    ...dbData.profile_data,
    
    // Migration: Add default values for new fields
    newField: dbData.profile_data.newField || 'default_value',
    
    // Migration: Transform old structure to new
    strategicInitiatives: dbData.profile_data.strategicInitiatives?.map(init => ({
      ...init,
      newProperty: init.newProperty || 'default'
    })) || []
  };
}
```

## 🎯 **Feature Independence Guidelines**

### **✅ Independent Systems**

- **Timeline**: Can change prompts, logic, caching without affecting AI Opportunities
- **AI Opportunities**: Can modify analysis logic without impacting Timeline
- **Profile Data**: JSONB structure allows adding fields without breaking existing features
- **AI Providers**: Can add new providers without changing feature logic

### **🔗 Shared Dependencies**

- **AI Service**: Changes to core `aiService` affect all features
- **Profile Schema**: Core profile fields used by multiple features
- **Authentication**: Changes to auth affect all API endpoints

### **🛡️ Safety Checklist**

Before making changes:

1. **✅ Profile Changes**: Will existing features still work with new profile structure?
2. **✅ Database Changes**: Are you adding columns rather than modifying existing ones?
3. **✅ AI Service Changes**: Are you maintaining backward compatibility?
4. **✅ Provider Changes**: Are you following the established provider interface?

## 🧪 **Testing Strategy**

### **Feature-Specific Tests**
```typescript
// app/services/__tests__/yourFeatureService.test.ts
describe('YourFeatureService', () => {
  it('should generate analysis for valid profile', async () => {
    const mockProfile = createMockProfile();
    const result = await YourFeatureService.generateAnalysis(mockProfile, 'user-id', MockCredentialsRepository);
    
    expect(result).toHaveProperty('field1');
    expect(result.metadata.generatedAt).toBeDefined();
  });
});
```

### **Integration Tests**
```typescript
// Test that changes don't break existing features
describe('Cross-Feature Compatibility', () => {
  it('should not break timeline when AI opportunities are modified', async () => {
    // Test both features work independently
  });
});
```

## 📋 **Development Checklist**

When adding a new AI feature:

- [ ] **Service Layer**: Created dedicated service class
- [ ] **Prompt System**: Created system and user prompts
- [ ] **API Endpoint**: Following established pattern
- [ ] **Database Schema**: Added caching columns
- [ ] **Gemini Compatibility**: Added auto-fix if needed
- [ ] **Error Handling**: Comprehensive error handling
- [ ] **Caching**: Database caching for cost optimization
- [ ] **Authentication**: Proper user verification
- [ ] **Testing**: Unit and integration tests
- [ ] **Documentation**: Updated this guide

## 🔮 **Future Considerations**

### **Potential Enhancements**

1. **Feature Analytics**
   - Track usage patterns
   - A/B test different prompts
   - Monitor provider performance

2. **Advanced Caching**
   - TTL-based cache invalidation
   - Dependency-based cache clearing
   - Cross-feature cache optimization

3. **Provider Intelligence**
   - Automatic provider selection based on task type
   - Fallback providers for reliability
   - Cost optimization routing

4. **Prompt Versioning**
   - Version control for prompts
   - A/B testing different prompt variations
   - Rollback capabilities

## 🆘 **Troubleshooting**

### **Common Issues**

1. **Gemini Incomplete Responses**
   - Solution: Add auto-fix function
   - Pattern: Check for missing fields and generate defaults

2. **Provider Authentication Failures**
   - Check credential encryption/decryption
   - Verify API key validity in admin interface

3. **Caching Issues**
   - Verify database column exists
   - Check user_id filtering in queries

4. **Profile Data Structure Changes**
   - Add migration logic in ProfileRepository.transformFromDatabase
   - Maintain backward compatibility

Remember: The modular architecture allows independent development of AI features while sharing robust infrastructure! 