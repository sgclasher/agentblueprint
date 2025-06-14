# Contributing to Agent Blueprint Platform

## 🎯 Overview

This platform uses a **modular, independent feature architecture** designed for safe, parallel development. Each major feature (Timeline Generation, AI Opportunities, Profile Management) can be developed independently while sharing stable infrastructure.

## 🏗️ Architecture Principles

### **Feature Independence**
- **Timeline ↔️ AI Opportunities**: Zero cross-dependencies
- **Profile Management**: JSONB schema provides flexibility
- **AI Features**: Share common `aiService` but isolated logic
- **Database**: Additive changes only, backward compatible

### **Shared Infrastructure (Stable)**
These components are shared across features - coordinate changes:
- `app/services/aiService.ts` - Provider-agnostic AI integration
- `app/repositories/credentialsRepository.ts` - Secure credential management  
- `app/repositories/profileRepository.ts` - Database operations
- Authentication patterns and security middleware

## 🚀 Development Patterns

### **Adding New AI Features**

Follow this proven 5-step pattern (see `AI_FEATURES_GUIDE.md` for details):

```
1. Service Layer: `app/services/[feature]Service.ts`
2. Prompts: `app/lib/llm/prompts/[feature]Prompt.ts`  
3. API Route: `app/api/[feature]/route.ts`
4. UI Component: `app/[feature]/` directory
5. Caching: Add methods to profileRepository.ts
```

### **Database Changes**

#### ✅ **Safe Changes (No Review Required)**
```sql
-- Adding new columns
ALTER TABLE client_profiles ADD COLUMN new_feature_cache JSONB;

-- Adding JSONB fields (backward compatible)
UPDATE client_profiles SET profile_data = profile_data || '{"newField": "value"}';
```

#### ⚠️ **Requires Architecture Review**
```sql
-- Modifying existing columns
ALTER TABLE client_profiles ALTER COLUMN existing_field TYPE new_type;

-- Removing columns (breaking change)
ALTER TABLE client_profiles DROP COLUMN old_field;

-- Schema changes that affect RLS policies
```

### **AI Provider Integration**

Always use the centralized `aiService` with user credentials:

```typescript
import { aiService } from '../services/aiService';
import { CredentialsRepository } from '../repositories/credentialsRepository';

// ✅ Correct pattern
const result = await aiService.generateJson(
  systemPrompt,
  userPrompt, 
  userId,
  CredentialsRepository,
  preferredProvider  // Optional
);

// ❌ Don't call AI providers directly
const response = await openai.chat.completions.create(...); // Wrong!
```

### **Security Patterns**

#### **API Route Security (Service Role Pattern)**
```typescript
import { createClient } from '@supabase/supabase-js';

// ✅ Secure: Service role with explicit authorization
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const { data } = await supabase
  .from('client_profiles')
  .select('*')
  .eq('id', profileId)
  .eq('user_id', user.id);  // Always verify user ownership
```

#### **Client-Side Security (RLS Pattern)**
```typescript
import { supabase } from '../lib/supabase';

// ✅ Client-side: Uses RLS policies automatically
const { data } = await supabase
  .from('client_profiles')
  .select('*'); // RLS handles user filtering
```

## 📋 Development Checklist

### **Before Starting**
- [ ] Review `AI_FEATURES_GUIDE.md` for your feature type
- [ ] Check if feature requires new AI provider capabilities
- [ ] Identify if changes affect shared infrastructure
- [ ] Plan database schema changes (additive only)

### **During Development**
- [ ] Follow established file/folder naming conventions
- [ ] Add comprehensive error handling and logging
- [ ] Use TypeScript interfaces from `app/services/types.ts`
- [ ] Add input validation and sanitization
- [ ] Implement caching for AI operations (80-90% cost savings)

### **Before Submitting**
- [ ] Run tests: `npm run test:smoke` (should pass 6/8 tests)
- [ ] Test manually with checklist: `app/__tests__/features/manual-test-checklist.md`
- [ ] Verify authentication works in all scenarios
- [ ] Test with multiple AI providers (OpenAI, Gemini, Claude)
- [ ] Document any new configuration requirements

### **Code Review Focus Areas**
- [ ] Security: All database queries include user authorization
- [ ] Performance: AI operations use caching when appropriate
- [ ] Error Handling: Graceful failure modes with user feedback
- [ ] Types: Proper TypeScript usage with existing interfaces
- [ ] Independence: Feature doesn't create unwanted dependencies

## 🔧 Technical Standards

### **File Organization**
```
app/
├── services/           # Business logic services
├── repositories/       # Database operations  
├── lib/llm/prompts/   # AI prompt engineering
├── api/               # API routes with authentication
├── [feature]/         # Feature-specific UI components
└── __tests__/         # Tests and validation
```

### **Naming Conventions**
- Services: `[feature]Service.ts` (e.g., `aiOpportunitiesService.ts`)
- Prompts: `[feature]Prompt.ts` (e.g., `timelinePrompts.ts`)
- API Routes: `/api/[feature]/route.ts`
- Components: PascalCase React components
- Database: snake_case for columns, camelCase in TypeScript

### **Error Handling Pattern**
```typescript
try {
  // Operation
  const result = await someOperation();
  return NextResponse.json({ success: true, data: result });
} catch (error: any) {
  console.error(`[${operation}] Error:`, error);
  return NextResponse.json(
    { error: 'User-friendly message', details: error.message },
    { status: 500 }
  );
}
```

## 🧪 Testing Guidelines

### **Testing Priorities**
1. **Authentication flows** - Critical for security
2. **AI integration** - Expensive operations must work reliably  
3. **Database operations** - Data integrity is essential
4. **UI components** - User experience validation

### **Current Test Status**
- **Smoke Tests**: 6/8 passing (target baseline)
- **Manual Tests**: Use provided checklist for comprehensive validation
- **Integration**: Test with real AI providers in development

### **Adding Tests**
```typescript
// Follow existing patterns in app/__tests__/
describe('New Feature', () => {
  beforeEach(() => {
    // Setup, including Supabase mocking
  });

  it('should handle the main use case', async () => {
    // Test core functionality
  });

  it('should handle errors gracefully', async () => {
    // Test error conditions
  });
});
```

## 📚 Documentation Requirements

### **For New Features**
- Update `README.md` with feature description
- Add API endpoints to API Reference section  
- Document any new environment variables
- Update this `CONTRIBUTING.md` if adding new patterns

### **For AI Features**
- Document prompt engineering approach
- Explain caching strategy and cache keys
- List supported AI providers and any limitations
- Include sample requests/responses

### **Comments and JSDoc**
```typescript
/**
 * Analyze client profile for AI opportunities
 * @param profile - Client profile with strategic initiatives and systems
 * @param userId - User ID for authentication and credential access
 * @param credentialsRepo - Repository for accessing encrypted AI credentials
 * @param preferredProvider - Optional AI provider preference
 * @returns Comprehensive AI opportunities analysis with ROI projections
 */
export async function analyzeOpportunities(...) {
  // Implementation
}
```

## 🚨 Common Pitfalls to Avoid

### **Security**
- ❌ Using client-side Supabase for API routes
- ❌ Forgetting user authorization in database queries
- ❌ Exposing API keys or credentials in client code
- ❌ Trusting user input without validation

### **Architecture** 
- ❌ Creating tight coupling between independent features
- ❌ Modifying shared infrastructure without coordination
- ❌ Breaking backward compatibility with database changes
- ❌ Adding dependencies that prevent parallel development

### **Performance**
- ❌ Making AI API calls without caching
- ❌ Not implementing proper error retry logic
- ❌ Creating N+1 database query problems
- ❌ Missing loading states in UI

### **Development**
- ❌ Skipping TypeScript types and using `any`
- ❌ Not testing with multiple AI providers
- ❌ Forgetting to update documentation
- ❌ Not following established naming conventions

## 🎯 Success Metrics

### **Code Quality**
- TypeScript strict mode compliance
- Error handling covers edge cases
- Performance optimizations implemented
- Security patterns followed consistently

### **User Experience**
- Features work across all supported AI providers
- Loading states and error messages are helpful
- Mobile responsive design maintained
- Accessibility standards followed

### **Maintainability**
- Code is self-documenting with clear naming
- Features are independent and modular
- Tests provide good coverage of critical paths
- Documentation is current and comprehensive

## 📞 Getting Help

### **Architecture Questions**
- Review `AI_FEATURES_GUIDE.md` for AI feature patterns
- Check `instructions.md` for historical context and decisions
- Look at existing implementations for proven patterns

### **Development Issues**
- Check manual test checklist for common integration issues
- Review existing service implementations for debugging patterns
- Test with multiple AI providers to isolate provider-specific issues

### **Security or Database**
- Follow established security patterns in existing API routes
- Use additive database changes to maintain backward compatibility
- Verify user authorization in all database operations

---

**Remember**: This platform prioritizes **safety**, **modularity**, and **maintainability**. When in doubt, follow existing patterns and keep features independent. 