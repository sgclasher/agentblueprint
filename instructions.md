## TypeScript Migration Plan
*Track the progress of converting the remaining JavaScript files to TypeScript.*

### Phase 1: Profile Components (`app/profiles/components/`)
- [x] `app/profiles/components/StrategicInitiativesForm.js` -> `app/profiles/components/StrategicInitiativesForm.tsx`
- [x] `app/profiles/components/ProblemsOpportunitiesForm.js` -> `app/profiles/components/ProblemsOpportunitiesForm.tsx`
- [x] `app/profiles/components/ProfileWizard.js` -> `app/profiles/components/ProfileWizard.tsx`

### Phase 2: API Routes (`app/api/`)
- [x] `app/api/timeline/stream/route.js` -> `app/api/timeline/stream/route.ts`

### Phase 3: Root Configuration Files
- [x] `jest.setup.js` -> `jest.setup.ts`
- [x] `jest.config.js` -> `jest.config.ts`
- [x] `next.config.js` -> `next.config.mjs` (or `.ts`)

# Agent Blueprint - Project Roadmap

## 🔑 Key Documents
- **[Project README](./README.md)**: High-level overview, feature list, and current project status.
- **[Development Guidelines](./README.md#development-guidelines)**: Rules for contributing to the codebase.
- **[Project Summary](./project-summary.md)**: Complete file listing and codebase summary.

## 🚀 Project Vision & Core Objectives
Transform Agent Blueprint into a robust, scalable platform that serves as a comprehensive business intelligence tool, featuring ServiceNow integration, AI-powered insights, and secure multi-user support.

**Core Objectives:**
1.  **Testing Excellence**: Achieve comprehensive test coverage and implement CI/CD pipelines.
2.  **Scalable Architecture**: Build a modular, extensible system ready for future features.
3.  **Secure Authentication**: Implement user management with encrypted credential storage.
4.  **Cloud Database Integration**: Migrate from localStorage to Supabase for persistence.
5.  **AI-Powered Intelligence**: Generate dynamic timelines using LLMs based on client profiles.
6.  **Export Capabilities**: Enable PDF generation for timeline visualizations.

---

## 🎯 Next Steps & Immediate Priorities

1.  **[x] Implement Frontend UI for Provider Selection**: Add a user interface to the timeline generation view that allows users to select their preferred AI provider from the ones they've configured in the admin dashboard.
2.  **Add PDF Export Capabilities**: Implement a feature to export the generated AI timelines as professional PDF documents for easy sharing and presentation.
3.  **Expand Enterprise Connectors**: Integrate with other enterprise systems beyond ServiceNow, such as Salesforce or HubSpot, to broaden the platform's data visualization and business intelligence capabilities.

---

## ✅ Completed Milestones
*A reverse-chronological log of implemented features.*

### ✅ COMPLETED: Frontend UI for Provider Selection (July 2025)
**What was implemented:**
- **Provider Selection UI**: Added a dropdown menu to the timeline sidebar that allows users to select their preferred AI provider.
- **Dynamic Provider Fetching**: Created a new API endpoint to fetch the list of available AI providers from the user's configured credentials.
- **State Management Integration**: Updated the central state management store to handle the selected provider.
- **Backend Integration**: Modified the timeline generation service and API routes to use the selected provider, allowing for on-the-fly switching between different AI models.

### ✅ COMPLETED: Codebase Refactoring & Best Practices (June 2025)
**What was implemented:**
- **TypeScript Migration**: Converted key components and API routes to TypeScript, enabling strict type checking and improving code quality.
- **Styling Standardization**: Refactored all global CSS into component-specific CSS Modules, eliminating style conflicts and improving maintainability.
- **Component Architecture**: Broke down large components into smaller, single-purpose components for better reusability and clarity.
- **Production Readiness**: Implemented a robust, database-backed rate-limiting strategy and updated unstable dependencies to their latest stable versions.
- **Security Enhancements**: Addressed a critical security vulnerability by implementing session-based authentication for the timeline generation API route.

### ✅ COMPLETED: Multi-Provider AI Backend (Phase 6.2)
**What was implemented:**
- **Provider-Agnostic AI Service**: Refactored the central `aiService` to be fully provider-agnostic. It now dynamically loads the correct AI provider based on the user's saved credentials in the admin interface.
- **Anthropic Claude Provider**: Created a new `claudeServerProvider.js` that correctly interfaces with the Anthropic Claude API, using the API key from the user's configuration.
- **Enhanced OpenAI Provider**: Updated `openaiServerProvider.js` to accept a runtime API key, allowing it to work with both user-configured credentials and the legacy environment variable fallback.
- **Robust Error Handling**: Resolved multiple bugs, including circular dependencies and UI rendering issues, to ensure the new multi-provider system is stable and reliable.
- **Advanced Prompt Engineering**: Re-engineered the prompt-building logic to be significantly more effective. It now extracts key data from the structured profile object (not markdown) and uses an improved example structure to guide the AI, resulting in highly specific and relevant timeline generation.

### ✅ COMPLETED: Codebase Health Check & Refactoring (January 2025)
**What was implemented:**
- **Component Consolidation**: Removed duplicate `AddServiceForm` components and centralized logic into a single reusable component in `app/admin/components/`.
- **Styling Consistency**: Replaced all inline styles on the main page (`app/page.js`) with a dedicated CSS Module (`app/Home.module.css`), ensuring consistency with the project's styling best practices.
- **Improved Navigation**: Refactored navigation in `ServiceNowConnector` to use Next.js's `useRouter` for client-side transitions, eliminating unnecessary full-page reloads.
- **Standardized Data Access**: Updated API routes (`/api/timeline/generate-from-profile`) to consistently use the `ProfileRepository`, centralizing data logic and improving maintainability.
- **API Authentication Fixes**: Corrected server-side authentication for database queries in API routes, ensuring Row Level Security policies are properly enforced and resolving caching issues.
- **Development Bug Fixes**: Addressed a React Strict Mode double-invocation issue in the `useTimeline` hook that caused duplicate AI generation calls.
- **Code Cleanup**: Removed stray `console.log` statements and temporary development scripts from the codebase.

### ✅ COMPLETED: Phase 6.1.5 - Admin Interface (January 2025)
**What was implemented:**
- **Unified Credential Management**: Created comprehensive admin interface for all external service credentials
- **Database Schema Extension**: Added `external_service_credentials` table supporting AI providers, CRM systems, and future integrations
- **Secure Credential Storage**: AES-256-GCM encryption with user-specific encrypted credential storage
- **Security Architecture**: Production-ready security model using application-level authentication with service role database access
- **Connection Testing**: Built API endpoints to test both saved and unsaved credentials for OpenAI, Gemini, Claude, ServiceNow, and HubSpot
- **Professional UI**: Complete admin interface at `/admin` with service tabs, credential cards, and real-time test functionality
- **Service Provider Support**: Full support for OpenAI, Google Gemini, Anthropic Claude, ServiceNow, HubSpot, extensible for future services
- **User-Level Configuration**: Replaced environment variables with secure, user-specific credential management
- **Default Provider Management**: Users can set preferred default providers for each service type
- **Navigation Integration**: Added Settings link to GlobalHeader for easy access
- **Enhanced Form Experience**: Test-before-save functionality, comprehensive validation, smart error handling
- **Production Security Model**: Server-side API routes with JWT authentication, user-scoped data access, encrypted storage

### ✅ COMPLETED: Phase 6.1 - Database-Backed Timeline Caching (January 2025)
**What was implemented:**
- **Cache-First Architecture**: Implemented intelligent caching system that checks database before generating new timelines
- **Server-Side Database Operations**: Refactored API route to use direct Supabase calls instead of client-side modules
- **Authentication Integration**: Enhanced frontend to pass user context for secure database operations
- **API Route Optimization**: Complete refactoring of `/api/timeline/generate-from-profile` with server-side caching logic
- **Frontend Integration**: Updated useBusinessProfileStore to include user authentication in API requests
- **Professional UX**: Cache status widget showing cached vs fresh timelines with regeneration controls
- **Complete Testing**: All 9 smoke tests passing ✅, full functionality verified

### ✅ COMPLETED: Phase 6 - AI Integration (January 2025)
**What was implemented:**
- **Centralized AI Service Architecture**: Refactored all LLM interactions into a generic, reusable `aiService.js`. This central service manages different AI providers and is the single entry point for any feature requiring AI capabilities.
- **Provider-Agnostic Design**: The new architecture abstracts the specific LLM provider, with `openaiServerProvider.js` as the first concrete implementation. Foundation laid for multiple providers (Anthropic, Gemini).
- **Timeline Service Refactor**: `timelineService.js` is now a clean consumer of the central `aiService`, completely decoupled from the underlying AI provider logic.
- **Centralized Prompt Management**: Created a new `app/lib/llm/prompts` directory to store all prompt templates, starting with `timelinePrompts.js`. This separates prompt engineering from application logic.
- **Enhanced Security**: Removed the client-side `openaiProvider.js` to ensure all LLM calls and API keys are handled securely on the server, eliminating any risk of client-side key exposure.
- **OpenAI GPT-4o Integration**: Real LLM-powered timeline generation using OpenAI's GPT-4o model, now managed through the central AI service.
- **Structured Prompt Engineering**: Comprehensive prompts for industry-specific, scenario-based timeline generation, now managed in a dedicated prompts directory.
- **Profile-to-Markdown Pipeline**: Enhanced `markdownService` to convert rich profile data to structured LLM input.
- **Transparent Error Handling**: Clear error messages when the AI service is not configured.
- **Environment Configuration**: Debug endpoint (`/api/debug-env`) to verify AI integration setup.
- **Scenario-Based Generation**: Conservative, Balanced, and Aggressive timeline scenarios with different risk profiles.
- **JSON Response Validation**: Strict validation of LLM responses to ensure consistent timeline structure.
- **Test Integration**: Updated smoke tests to handle both configured and unconfigured AI scenarios.

### ✅ COMPLETED: Phase 5 - UI Consistency & Design System (January 2025)
**What was implemented:**
- **Global CSS Variables System**: Extended timeline's professional CSS variables across entire application
- **Global Theme Provider**: React context for theme management with localStorage persistence
- **Standardized Global Header**: Professional header with theme toggle, navigation, and auth integration
- **Complete Page Consistency**: All pages (ServiceNow, Profiles, Timeline, Auth) now use consistent theming
- **ServiceNow Connector Styling**: Fixed login/connector page to use dark theme and display logo properly
- **Profile Detail Page Updates**: Removed hardcoded colors, added GlobalHeader, uses CSS variables
- **Profile Page Refactoring**: Fully refactored `profile-detail.css` and the `ProfileWizard` component to use the global design system. Replaced all inline styles and hardcoded values with theme-aware CSS Modules, ensuring consistent, maintainable styling across light and dark modes.
- **Authentication Page Refactoring**: Refactored the Sign In and Sign Up pages to use a shared CSS Module (`app/auth/Auth.module.css`), eliminating all inline styles and ensuring a consistent, theme-aware user experience.
- **Next.js Configuration**: Set `experimental.cssChunking` to `'strict'` to prevent inconsistent CSS resolution order between development and production builds.
- **Button System Standardization**: All buttons now use CSS variables instead of hardcoded colors
- **Light/Dark Mode Support**: Global theme toggle works across entire application with persistence
- **App Rebranding**: Updated from "Agentic AI Flow Visualizer" to "Agent Blueprint" throughout
- **User Profile Management**: Complete user profile page at `/profile` with editable settings
- **Profile Tag Readability**: Improved contrast for profile cards tags in both light and dark modes
- **Enhanced Navigation**: Clickable user profile in header for easy access to account management

### ✅ COMPLETED: Modular Forms & Modern UI (Phase 3.5)
**What was implemented:**
- **Modular Architecture**: Replaced monolithic Value Selling Framework with independent form components
- **Strategic Initiatives Form**: Executive contact management with complete business intelligence capture
- **Problems & Opportunities Form**: Visual problem→solution mapping with suggestion chips
- **Professional Dark Theme**: Enterprise-grade UI inspired by ai-2027.com design system
- **Glass Morphism Design**: Backdrop blur effects, gradient backgrounds, sophisticated animations
- **Responsive Design**: Mobile-optimized layouts with professional typography
- **Demo Data Management**: Smart detection and easy clearing of demo profiles
- **Documentation**: Complete implementation guide in `MODULAR_FORMS_COMPLETE.md`

### ✅ COMPLETED: Authentication System (Phase 3)
**What was implemented:**
- **Supabase Integration**: Full authentication with email/password and magic links
- **User Management**: Complete signup, signin, signout flows with email verification
- **Database Schema**: User profiles, encrypted credential storage, audit logs with RLS
- **Security Features**: AES-256 encryption utilities for ServiceNow credentials
- **UI Components**: Professional auth forms matching the dark theme, refactored to use CSS Modules.
- **User Interface**: Global header with user menu and auth state management. Client-side providers are loaded via a central `app/components/Providers.js` component with SSR disabled to prevent server-rendering issues.
- **Documentation**: Complete setup guide in `SUPABASE_SETUP.md`

### ✅ COMPLETED: Phase 4 - Centralized Database (December 2024)
**What was implemented:**
- **Supabase-Only Architecture**: Refactored the data layer to exclusively use Supabase for all client profile storage.
- **Authentication Required**: User authentication is now mandatory for creating, viewing, or managing any client profiles.
- **Removed `localStorage`**: Eliminated all `localStorage` code, including fallbacks and migration tools.
- **Simplified Data Layer**: `ProfileRepository` and `ProfileService` were streamlined for direct Supabase interaction.
- **Secure by Default**: Row-level security in Supabase ensures users can only access their own data.

### ✅ COMPLETED: MVP Testing Setup (Phase 1 - Simplified)
**What was implemented:**
- **Simple Smoke Tests**: 9 passing tests in `app/__tests__/features/simple-smoke-tests.js`
  - Tests all core services can be imported and function
  - Verifies ServiceNow flow utilities, profile services, AI timeline generation
  - Runs in 3 seconds via `npm run test:smoke`
- **Manual Test Checklist**: Located at `app/__tests__/features/manual-test-checklist.md`
- **GitHub Actions**: Optional CI/CD at `.github/workflows/test.yml`
- **Testing Philosophy**: "Test the Features, Not the Functions" - simple MVP approach
- **Documentation**: `MVP_TESTING_SUMMARY.md` explains the full testing strategy
- **Supabase Mocking**: Jest configuration handles Supabase ES6 modules for testing

---

## 🗄️ Architectural & Feature Summaries

<details>
<summary><strong>Security Architecture Summary</strong></summary>

**Production-Ready Security Model Implemented:**
- **Application-Level Authentication**: JWT token verification in all API routes using `getUser(request)`
- **User-Scoped Data Access**: All database queries filtered by authenticated user ID (`user_id`)
- **Service Role Database Access**: Server-side API routes use service role client for reliable database operations
- **AES-256-GCM Encryption**: All credentials encrypted with user-specific keys before database storage
- **No RLS Dependency**: Eliminated complex Row-Level Security debugging while maintaining security through code
- **Industry Standard Pattern**: Follows security patterns used by GitHub, Stripe, Auth0, and other production applications

**Security Guarantees:**
✅ **Authentication Required**: All credential operations require valid JWT token  
✅ **User Isolation**: Users can only access their own credentials via server-side filtering  
✅ **Encrypted Storage**: All sensitive data encrypted before database storage  
✅ **Server-Side Only**: Service role keys and encryption keys never exposed to client  
✅ **Audit Trail**: All operations logged with user context

</details>

<details>
<summary><strong>Database Architecture Summary</strong></summary>

### What Changed
- **Data Storage**: All client profiles are now stored exclusively in Supabase.
- **Authentication**: User authentication is now required to access any profile features.
- **`localStorage` Removed**: Eliminated all `localStorage` code, including fallbacks and migration logic, has been deleted.
- **Simplified Services**: `ProfileService` and `ProfileRepository` are now simpler, with no branching logic for different storage backends.

### Key Benefits
- **Enhanced Security**: Centralized data with Supabase's row-level security.
- **Data Integrity**: Single source of truth for all profile data.
- **Reduced Complexity**: Simplified codebase is easier to maintain and extend.
- **Scalability**: Positioned for future features like collaboration and sharing.

</details>

<details>
<summary><strong>UI Consistency & Design System Summary</strong></summary>

**All major UI inconsistencies have been resolved across the entire application:**

#### ✅ **Global Theme System**
- **Professional CSS Variables System**: Extended timeline's complete theme infrastructure to entire app
- **Global Theme Provider**: React context managing theme state with localStorage persistence
- **Light/Dark Mode Toggle**: Working theme switcher accessible from GlobalHeader on all pages
- **Theme Persistence**: User theme preference persists across sessions and page navigation

#### ✅ **Consistent Page Implementation**
- **ServiceNow Flow Visualizer**: ✅ Now uses CSS variables, proper logo display, dark theme
- **Client Profiles**: ✅ GlobalHeader integrated, hardcoded colors removed, consistent styling
- **Profile Detail Pages**: ✅ Full CSS variable conversion, GlobalHeader, professional navigation
- **Authentication Pages**: ✅ Refactored to use CSS Modules, removing inline styles for a consistent, theme-aware design.
- **Timeline Page**: ✅ Already was the gold standard, now integrated with global system

</details>

<details>
<summary><strong>ProfileWizard UX Enhancements Summary</strong></summary>

#### ✅ **Edit Profile Functionality** (FIXED)
- **Working Edit Button**: Profile detail page edit button now properly opens ProfileWizard in edit mode
- **Edit Route**: New `/profiles/[id]/edit` route with proper loading states and error handling  
- **Update Support**: ProfileWizard now supports both create and update operations
- **Navigation Flow**: Seamless flow from profile detail → edit → back to detail page

#### ✅ **ProfileWizard UX Enhancements** (MAJOR IMPROVEMENT)
- **Clickable Step Navigation**: Users can click any step circle to jump to that section instantly
- **Free Navigation**: Removed field blocking - users can explore all steps without completing each one
- **Smart Visual Indicators**: 
  - 🔵 Blue = Current step
  - 🟢 Green + ✓ = Completed step (all required fields filled)
  - 🟡 Yellow = Visited but incomplete step
  - ⚪ Gray = Unvisited step
- **Enhanced Tooltips**: Hover over incomplete steps to see missing required fields
- **Gentle Validation**: Only warns about missing critical info when saving (non-blocking)
- **Improved Contrast**: Fixed dark text on dark background issues across light/dark themes

</details>

---

**Last Updated**: January 2025
**Version**: 2.1
**Status**: Production Ready (Dark Mode), Light Mode Documentation Complete
