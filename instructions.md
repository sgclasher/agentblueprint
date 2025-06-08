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

### **Phase 6.2: Multi-Provider AI Implementation (NEXT - 1-2 weeks)**
**Goal**: Enable user-configurable multi-provider AI support using the new admin interface.

**Implementation Approach:**
1.  **Update AI Service Architecture**
    -   Modify `aiService.js` to read user credentials from the admin interface.
    -   Create a credential resolution service for user-specific provider access.
    -   Implement provider selection logic based on user preferences.
    -   Add fallback handling when user credentials are not configured.
2.  **Create New Provider Implementations**
    -   Implement `geminiServerProvider.js` using admin-configured credentials.
    -   Implement `claudeServerProvider.js` using admin-configured credentials.
    -   Update `openaiServerProvider.js` to support both environment and user credentials.
    -   Standardize the provider interface for consistent behavior.
3.  **User Experience Enhancements**
    -   Add provider selection to the timeline generation UI.
    -   Display the current provider and costs in the timeline interface.
    -   Implement provider switching for existing cached timelines.
    -   Add provider performance metrics and recommendations.

**Proposed Technical Architecture:**
```javascript
// Enhanced aiService with user credential support
class AIService {
  async generateJson(systemPrompt, userPrompt, options = {}) {
    const { userId, provider } = options;
    const selectedProvider = await this.getConfiguredProvider(userId, provider);
    return await selectedProvider.generateJson(systemPrompt, userPrompt, options);
  }
  
  async getConfiguredProvider(userId, preferredProvider) {
    // Get user's configured credentials from admin interface
    // Fall back to environment variables if user hasn't configured
  }
}

// Provider Implementations
app/lib/llm/providers/
  ├── openaiServerProvider.js               // ✅ Existing OpenAI implementation
  ├── geminiServerProvider.js               // 🔄 New Gemini provider
  ├── claudeServerProvider.js               // 🔄 New Claude provider
  └── providerInterface.js                  // 🔄 Standardized provider interface
```

**Key Benefits:**
- ✅ **User Choice**: Each user can configure their preferred AI providers.
- ✅ **Cost Control**: Users manage their own API costs and limits.
- ✅ **No Environment Dependencies**: Eliminates need for server-side API key management.
- ✅ **Scalable**: Easy to add new providers through the admin interface.
- ✅ **Secure**: All credentials encrypted and user-isolated.

### **Phase 7: Professional PDF Export (AFTER 6.2 - 2-3 weeks)**
**Goal**: Generate professional timeline documents with high-quality LLM content.

**Why This Sequence Makes Sense:**
- **Quality First**: Ensure excellent content before creating professional documents.
- **Provider Flexibility**: Users can choose the best provider for their use case.
- **Cost Optimization**: Multi-provider support reduces costs before PDF generation.
- **Enterprise Ready**: High-quality, customizable documents for executive presentations.

---

## ✅ Completed Milestones
*A reverse-chronological log of implemented features.*

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
- **Removed `localStorage`**: Eliminated all `localStorage` fallbacks, storage logic, and migration tools.
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
<details>
<summary><strong>Legacy Project Plan (Archived)</strong></summary>

## Project Vision
Transform Agent Blueprint into a robust, scalable platform that serves as a comprehensive business intelligence tool, featuring ServiceNow integration, AI-powered insights, and secure multi-user support.

## Core Objectives
1. **Testing Excellence**: Achieve comprehensive test coverage and implement CI/CD pipelines
2. **Scalable Architecture**: Build a modular, extensible system ready for future features
3. **Secure Authentication**: Implement user management with encrypted credential storage
4. **Cloud Database Integration**: Migrate from localStorage to Supabase for persistence
5. **AI-Powered Intelligence**: Generate dynamic timelines using LLMs based on client profiles
6. **Export Capabilities**: Enable PDF generation for timeline visualizations

## Implementation Phases

### Phase 1: Testing Optimization (Week 1-2)
**Goal**: Establish robust testing infrastructure and achieve 80%+ coverage

#### 1.1 Testing Infrastructure
- [ ] Implement comprehensive unit tests for all services
  - ProfileService (expand from 25 to 40+ tests)
  - MarkdownService (expand from 20 to 35+ tests)
  - TimelineService (create 30+ tests)
  - DemoDataService (create 15+ tests)
- [ ] Add integration tests for API routes
  - `/api/servicenow/*` endpoints
  - `/api/timeline/generate` endpoint
- [ ] Component testing with React Testing Library
  - FlowVisualizer and child components
  - ProfileWizard and form steps
  - Timeline components
- [ ] E2E testing setup with Playwright
  - User journey: ServiceNow connection → Flow visualization
  - User journey: Profile creation → Timeline generation
  - User journey: Timeline interaction → PDF export

#### 1.2 CI/CD Pipeline
- [ ] GitHub Actions workflow for automated testing
- [ ] Pre-commit hooks with Husky
- [ ] Code coverage reporting with Codecov
- [ ] Automated dependency updates with Dependabot

### Phase 2: Architecture Optimization (Week 2-3)
**Goal**: Create a modular, plugin-based architecture for extensibility

#### 2.1 Core Architecture Refactoring
- [ ] Implement Repository Pattern for data access
  ```typescript
  interface IProfileRepository {
    create(profile: Profile): Promise<Profile>
    update(id: string, profile: Partial<Profile>): Promise<Profile>
    delete(id: string): Promise<void>
    findById(id: string): Promise<Profile | null>
    findAll(userId: string): Promise<Profile[]>
  }
  ```
- [✅] **Centralized AI Service**: Implemented a provider-agnostic `aiService.js` to handle all LLM interactions.
  ```javascript
  // app/services/aiService.js
  class AIService {
    async generateJson(systemPrompt, userPrompt, options = {}) {
      // ... delegates to a configured provider
    }
  }
  ```
- [ ] Implement Strategy Pattern for export formats
  ```typescript
  interface IExportStrategy {
    export(timeline: Timeline): Promise<Blob>
    getFileExtension(): string
    getMimeType(): string
  }
  ```

#### 2.2 Feature Module System
- [ ] Create feature flags system for gradual rollouts
- [ ] Implement plugin architecture for adding new node types
- [ ] Design extensible timeline phase system
- [ ] Build modular export pipeline (PDF, PNG, DOCX ready)

#### 2.3 Error Handling & Monitoring
- [ ] Centralized error boundary implementation
- [ ] Structured logging with Winston/Pino
- [ ] Application performance monitoring setup
- [ ] User activity tracking (privacy-compliant)

### Phase 3: Authentication System (Week 3-4)
**Goal**: Secure multi-user support with encrypted credential management

#### 3.1 Authentication Infrastructure
- [ ] Integrate Supabase Auth
  - Email/password authentication
  - OAuth providers (Google, Microsoft)
  - Magic link authentication
- [ ] User profile schema design
  ```typescript
  interface UserProfile {
    id: string
    email: string
    name: string
    organizationId?: string
    serviceNowCredentials?: EncryptedCredentials
    preferences: UserPreferences
    createdAt: Date
    updatedAt: Date
  }
  ```

#### 3.2 Credential Management
- [ ] Implement credential encryption service
  - AES-256 encryption for ServiceNow credentials
  - Secure key management with environment variables
  - Credential rotation reminders
- [ ] Multi-instance ServiceNow support
  - Store multiple ServiceNow connections per user
  - Instance switching UI
  - Connection health monitoring

#### 3.3 Authorization & Access Control
- [ ] Role-based access control (RBAC)
  - Admin, User, Viewer roles
  - Feature-level permissions
- [ ] Row-level security for client profiles
- [ ] API route protection middleware
- [ ] Session management with refresh tokens

### Phase 4: Centralized Database (Week 4-5)
**Goal**: Centralize all profile data in Supabase, requiring user authentication and removing all localStorage dependencies.

#### 4.1 Database Schema Design
- [x] Design normalized schema
  ```sql
  -- Core tables
  users, organizations, user_organizations
  client_profiles, profile_versions, profile_collaborators
  timelines, timeline_phases, timeline_metrics
  service_now_connections, flow_visualizations
  ```
- [x] Implement database migrations with Supabase CLI
- [x] Create database indexes for performance
- [x] Set up database backups and recovery

#### 4.2 Repository Implementation
- [x] ProfileRepository with Supabase client, removing all localStorage fallbacks.
- [ ] TimelineRepository with caching layer
- [ ] FlowDataRepository for ServiceNow data
- [ ] Implement optimistic updates for better UX

### Phase 5: UI Consistency & Design System (Week 5-6)
**Goal**: Standardize design system and implement global light/dark mode across entire application

#### 5.1 Design System Standardization
- [ ] **Audit Current UI State**
  - Catalog inconsistencies across pages (ServiceNow, Profiles, Timeline, Auth)
  - Document current color usage and CSS organization
  - Identify hardcoded styles that need conversion to variables

- [ ] **Extend Timeline CSS Variables System**
  ```css
  // Apply timeline's professional CSS variables system globally
  :root {
    /* Dark theme (current default) */
    --bg-primary: #0a0e27;
    --bg-secondary: rgba(255, 255, 255, 0.05);
    --text-primary: #e2e8f0;
    // ... complete variable set
  }
  
  [data-theme="light"] {
    /* Light theme overrides */
    --bg-primary: #ffffff;
    --bg-secondary: rgba(0, 0, 0, 0.03);
    --text-primary: #1f2937;
    // ... complete variable set
  }
  ```

- [ ] **Global Theme Infrastructure**
  - Create global theme context/state management
  - Implement theme persistence in localStorage
  - Add theme toggle to global header navigation
  - Ensure theme changes apply immediately across all pages

#### 5.2 Page-by-Page Conversion
- [ ] **ServiceNow Flow Visualizer Page**
  - Convert hardcoded colors to CSS variables
  - Implement light mode styles
  - Test flow diagram readability in both themes

- [ ] **Client Profiles Pages**
  - Standardize profile cards, forms, and detail views
  - Convert authentication pages to use design system
  - Ensure migration UI components use consistent styling

- [ ] **Global Components**
  - Header navigation with theme toggle
  - Authentication forms (login, signup)
  - Loading states and error messages
  - Buttons, inputs, and form elements

#### 5.3 Professional UI Enhancements
- [ ] **Consistent Glass Morphism Effects**
  - Standardize backdrop-filter usage across all components
  - Consistent border radius and spacing system
  - Professional hover states and animations

- [ ] **Typography System**
  - Consistent font families, weights, and sizes
  - Proper text hierarchy across all pages
  - Improved contrast ratios for accessibility

- [ ] **Component Library Foundation**
  - Standardized button variants (primary, secondary, danger)
  - Form component consistency (inputs, selects, textareas)
  - Card and modal styling standardization

### Phase 6: AI Integration (Week 7-8)
**Goal**: Generate intelligent timelines using LLM providers

#### 6.1 LLM Provider Integration
- [✅] **OpenAI GPT-4o Integration**: Integrated via the central `aiService`.
- [✅] **Prompt Engineering Framework**: Centralized in `app/lib/llm/prompts`.
  - Template system for different industries.
  - Context injection from client profiles.
  - Response formatting and validation.

#### 6.2 AI Service Layer
- [✅] **Centralized `aiService`**: Implemented `aiService.js` as the single entry point for all LLM calls, abstracting provider details.
- [🔄] **Multi-Provider Support**: **Phase 6.2 IN PROGRESS** - Expanding to support Gemini and Claude providers
- [🔄] **Provider Selection UI**: **Phase 6.2 IN PROGRESS** - User interface for choosing preferred AI provider
- [🔄] **Cost Optimization**: **Phase 6.2 IN PROGRESS** - Intelligent routing to most cost-effective provider
- [✅] **Response caching**: Database-backed caching system implemented in Phase 6.1
- [ ] **Token usage tracking** and optimization analytics
- [ ] **Streaming responses** for better UX (future enhancement)

#### 6.3 AI-Enhanced Features
- [ ] Timeline generation from profiles
  - Industry-specific recommendations
  - ROI calculations based on profile data
  - Risk assessment and mitigation strategies
- [ ] Profile enrichment suggestions
- [ ] Automated opportunity identification
- [ ] Intelligent phase recommendations

### Phase 7: Export Capabilities (Week 8-9)
**Goal**: Professional PDF exports with customization options

#### 7.1 PDF Generation Service
- [ ] Integrate PDF generation library (react-pdf or puppeteer)
- [ ] Design professional PDF templates
  - Executive summary page
  - Timeline visualization
  - Detailed phase breakdowns
  - Metrics and ROI projections
- [ ] Custom branding options
  - Logo placement
  - Color schemes
  - Font selection

#### 7.2 Export Pipeline
- [ ] Implement export queue for large documents
- [ ] Progress tracking for exports
- [ ] Email delivery option
- [ ] Cloud storage integration (optional)

#### 7.3 Export Formats
- [ ] PDF export (primary)
- [ ] PNG/JPEG image export
- [ ] PowerPoint export (future)
- [ ] Excel data export (future)
</details>

---

**Last Updated**: January 2025
**Version**: 2.1
**Status**: Production Ready (Dark Mode), Light Mode Documentation Complete
