# AI Business Advisory Platform - Development Instructions

## 🎯 Current Task: Fix Agentic Pattern Implementation

### **Task Overview**
**Problem**: Blueprint generation uses hard-coded 5-agent template instead of implementing actual agentic design patterns  
**Goal**: Complete prompt service redesign with dynamic pattern implementation  
**Approach**: Make pattern selection actually change the blueprint structure, not just the labels

### **Implementation Plan**

#### **Phase 1: Analysis and Refactoring Preparation** (1 hour)
- [x] **Step 1.1: Create pattern-specific agent structure definitions** ✅ **COMPLETE**
  - Primary files: Create `app/lib/llm/patterns/agenticPatternDefinitions.ts`
  - Define agent structures for each of the 12 patterns from KB_AGENTIC_DESIGN_PATTERNS.md
  - Map patterns to specific agent counts, roles, and interactions

- [x] **Step 1.2: Create pattern-specific prompt templates** ✅ **COMPLETE**
  - Primary files: Create `app/lib/llm/patterns/patternPromptTemplates.ts`
  - Design modular prompt sections for each pattern type
  - Define pattern-specific JSON response schemas

- [x] **Step 1.3: Write tests for pattern implementations** ✅ **COMPLETE**
  - Primary files: Create `app/__tests__/features/pattern-specific-blueprints.test.ts`
  - Define test cases for each of the 12 patterns
  - Verify correct agent counts and structures per pattern
  - **VALIDATION**: Existing tests failing as expected (9 failures showing hard-coded 5-agent issues)

#### **Phase 2: Core Prompt Service Redesign** (2 hours)
- [x] **Step 2.1: Refactor agenticBlueprintPrompt.ts** ✅ **COMPLETE**
  - Primary files: `app/lib/llm/prompts/agenticBlueprintPrompt.ts`
  - Remove hard-coded 5-agent model
  - Implement dynamic prompt generation based on selected pattern
  - Update JSON response interface to support variable agent counts
  - **DELIVERED**: Pattern-based system with legacy fallback, new interfaces, auto-pattern selection

- [x] **Step 2.2: Update blueprint service for pattern selection** ✅ **COMPLETE**
  - Primary files: `app/services/agenticBlueprintService.ts`
  - Add pattern selection logic based on AI Opportunities analysis
  - Pass selected pattern to prompt generation
  - Update validation to handle variable agent counts
  - **DELIVERED**: Auto-pattern selection, pattern-aware validation, updated types

- [x] **Step 2.3: Create pattern-specific validation logic** ✅ **COMPLETE**
  - Primary files: Update `validateAgenticBlueprintResponse` in `agenticBlueprintPrompt.ts`
  - Remove hard-coded 5-agent validation
  - Implement pattern-specific validation rules
  - Ensure each pattern's requirements are met
  - **DELIVERED**: Pattern-aware validation with legacy fallback, agent count validation per pattern

#### **Phase 3: UI Updates for Dynamic Agent Support** (1 hour)
- [x] **Step 3.1: Update AIBlueprintTab component** ⏳ **IN PROGRESS**
  - Primary files: `app/profile/components/AIBlueprintTab.tsx`
  - Remove "5 Specialist Agents" assumption
  - Support dynamic agent count display
  - Add pattern visualization/explanation

- [ ] **Step 3.2: Update BlueprintExecutiveSummary component**
  - Primary files: `app/profile/components/BlueprintExecutiveSummary.tsx`
  - Update agent count references
  - Add pattern-specific ROI justifications

- [ ] **Step 3.3: Update type definitions**
  - Primary files: `app/services/types.ts`
  - Update AgenticBlueprint interface to support variable agent arrays
  - Add pattern-specific metadata fields

#### **Phase 4: Testing and Validation** (1 hour)
- [ ] **Step 4.1: Run pattern-specific tests**
  - Execute new test suite for all 12 patterns
  - Verify correct agent generation per pattern
  - Validate pattern selection logic

- [ ] **Step 4.2: End-to-end testing**
  - Test complete flow from AI Opportunities → Blueprint generation
  - Verify pattern selection influences agent structure
  - Test with different business contexts

- [ ] **Step 4.3: Update existing tests**
  - Primary files: `app/__tests__/features/agentic-blueprint-quality.test.ts`
  - Remove assumptions about 5-agent structure
  - Update quality scoring for variable agent counts

---

## 🎯 Current Status

### **Phase 2 Complete** ✅
- ✅ **AI Opportunities Enhancement**: Agentic design patterns integration complete
- ✅ **Cross-Tab Integration**: Seamless opportunity-to-blueprint workflow implemented
- ✅ **Strategic Initiative Selection**: UI and API infrastructure complete
- ✅ **Agent Blueprint System**: Production-ready with cross-provider support

**Platform Status**: Production-ready MVP with comprehensive AI advisory capabilities

---

## 🚨 **CRITICAL ISSUE IDENTIFIED**

### **Blueprint Generation Architectural Flaw**

**Problem**: Blueprint generation uses hard-coded 5-agent template instead of implementing actual agentic design patterns from `KB_AGENTIC_DESIGN_PATTERNS.md`

**Evidence**: 
- AI Opportunities correctly identify "Manager-Workers" pattern with specific rationale
- Blueprint generation ignores this and forces generic coordinator/researcher/analyst/quality-checker/actuator roles
- Pattern selection is cosmetic only - doesn't change actual agent structure or interactions

**Root Cause**: 
- Prompt template hard-codes exactly 5 agents with predefined roles
- No integration with actual pattern definitions from knowledge base
- Agent interactions don't match any real agentic design pattern

**Required Fix**: Complete prompt service redesign needed:
1. Remove hard-coded 5-agent model
2. Create pattern-specific blueprint generators  
3. Implement dynamic agent structures based on selected patterns
4. Use actual pattern definitions from KB_AGENTIC_DESIGN_PATTERNS.md
5. Make agent count and roles flexible per pattern requirements

---

## 🚨 **CURRENT CRITICAL ISSUES - NEXT SHIFT PRIORITY**

### **ISSUE 1: Blueprint Generation Context Disconnection** ⚠️ **HIGH PRIORITY**

**Problem**: Blueprint generation not using AI Opportunity context when user clicks specific opportunity
- User clicks specific AI opportunity → expects focused blueprint for THAT opportunity  
- Instead gets generic company-wide blueprint that "does not resemble in the slightest the ai opportunity"
- Pattern selection working but content context is lost

**Investigation Required**:
- **Primary files**: `app/profile/components/AIBlueprintTab.tsx`, `app/api/profiles/generate-blueprint/route.ts`
- **Debug flow**: AI Opportunity click → Blueprint API call → Context preservation
- **Check**: How `blueprintFocusContext` and `selectedInitiativeIndex` flow through system
- **Expected**: Blueprint should specialize ALL agents around selected opportunity workflow

### **ISSUE 2: Claude Partial Response Generation** ⚠️ **HIGH PRIORITY**

**Problem**: Claude generating incomplete JSON responses
- Only generating `digitalTeam` (4 agents, correct count for Manager-Workers)
- Missing: `businessObjective`, `humanCheckpoints`, `agenticTimeline`, `kpiImprovements`
- Pattern-specific prompts enhanced but still failing

**Investigation Required**:
- **Primary files**: `app/lib/llm/patterns/patternPromptTemplates.ts`
- **Test**: Try OpenAI/Gemini providers to isolate Claude-specific issue
- **Check**: Token limits, prompt complexity, JSON schema enforcement
- **Debug logs**: `[AI Response]` and `[Field Analysis]` showing what Claude actually returns

### **COMPLETED WORK** ✅

**Phase 1 & 2 Architecture Complete**:
- ✅ Pattern definitions implemented (`agenticPatternDefinitions.ts`)
- ✅ Pattern-specific prompt templates created (`patternPromptTemplates.ts`) 
- ✅ Auto-pattern selection working (Manager-Workers correctly selected)
- ✅ Validation logic updated for variable agent counts
- ✅ JSON structure templates with proper agent roles

**What's Working**:
- AI Opportunities correctly identify agentic patterns with rationale
- Pattern selection flows from opportunities to blueprint generation
- Agent count validation matches pattern requirements (4 for Manager-Workers)

**What's Broken**:
- Blueprint content doesn't match selected opportunity context
- Claude generating partial JSON responses despite enhanced prompts
- No fallbacks implemented per user requirements (errors should be visible)

### **IMMEDIATE NEXT STEPS FOR NEXT SHIFT**

1. **Fix Context Flow** (1-2 hours):
   - Trace `blueprintFocusContext` from AI Opportunity → Blueprint API
   - Ensure opportunity-specific business problems reach pattern prompts
   - Verify agent specialization around selected opportunity

2. **Debug Claude Response Issue** (1 hour):
   - Test with OpenAI/Gemini to isolate provider-specific problems
   - Check pattern prompt token lengths and complexity
   - Add more aggressive JSON structure enforcement

3. **Validate End-to-End Flow** (30 minutes):
   - Test: Click opportunity → Generate blueprint → Content matches opportunity
   - Verify: Agent roles align with opportunity workflow
   - Confirm: No generic company-wide blueprints

---

## 🛠️ **Quick Reference**

### **Core Files & Architecture**

**Key Application Files**:
- `app/profile/page.tsx` - Main business profile interface with 6-tab dashboard
- `app/profiles/components/ProfileWizard.tsx` - 2-step onboarding wizard
- `app/admin/page.tsx` - AI provider credential management

**Business Logic**:
- `app/services/aiService.ts` - **CRITICAL** - Centralized AI provider abstraction
- `app/services/agenticBlueprintService.ts` - Agent Blueprint generation (NEEDS FIXING)
- `app/services/aiOpportunitiesService.ts` - AI opportunity analysis with patterns
- `app/services/profileService.ts` - Profile data operations and timeline coordination

**Data Layer**:
- `app/repositories/profileRepository.ts` - Database operations with caching
- `app/services/types.ts` - TypeScript interfaces including AgenticPattern types
- `app/lib/llm/prompts/agenticBlueprintPrompt.ts` - Blueprint prompts (NEEDS REBUILDING)

### **Platform Capabilities**
- **Agent Blueprint System**: Production-ready but architecturally flawed (patterns cosmetic only)
- **Business Profile Management**: 6-tab interface with ROI data collection
- **AI Timeline**: Multi-scenario generation with permanent caching
- **AI Opportunities**: Enhanced with agentic pattern recommendations (working correctly)
- **Cross-Provider Support**: OpenAI, Claude, Gemini with provider-specific optimizations

### **Critical Database Migration** (Required)

**BEFORE TESTING Agent Blueprints**, run in Supabase SQL Editor:
```sql
-- Add agentic_blueprint_cache column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS agentic_blueprint_cache JSONB;

-- Add index for efficient querying
CREATE INDEX IF NOT EXISTS idx_profiles_agentic_blueprint_cache 
ON profiles USING gin (agentic_blueprint_cache) 
WHERE agentic_blueprint_cache IS NOT NULL;
```

---

## 🎯 **Future Development Roadmap**

### **Phase 3: Fix Agentic Patterns** (4-5 hours) - **CURRENT PRIORITY**
- Fix blueprint generation to implement actual agentic design patterns
- Create pattern-specific agent structures and interactions
- Remove hard-coded 5-agent assumptions

### **Phase 4: Enhanced Executive Presentation** (2-3 hours)
- PDF export with professional business case format
- Executive-ready presentation materials

### **Phase 5: Smart Defaults & Industry Intelligence** (1-2 hours)
- Industry ROI benchmarks for realistic projections
- ROI validation logic with industry-specific thresholds

---

## 📚 **Knowledge Base Resources**

- **KB_AGENTIC_DESIGN_PATTERNS.md**: 12 foundational patterns for proper implementation
- **KB_AI_AGENT_HANDBOOK.md**: Comprehensive agentic AI implementation guide
- **KB_LLM_MODEL_UPDATES_2025.md**: Latest API changes and model capabilities
- **DEVELOPMENT_HISTORY.md**: Complete development history and detailed implementation records

---

**Last Updated**: January 2025 - End of Session  
**Status**: Phase 2 Architecture Complete, Context Integration Issues Identified  
**Next Session Goal**: Fix blueprint context flow and Claude response generation issues