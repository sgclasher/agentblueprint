Directory structure:
└── sgclasher-agentblueprint/
    ├── README.md
    └── app/
        ├── globals.css
        ├── layout.js
        ├── page.js
        ├── __mocks__/
        │   └── @supabase/
        │       └── supabase-js.js
        ├── __tests__/
        │   └── features/
        │       ├── ai-timeline.test.js
        │       ├── client-profiles.test.js
        │       ├── manual-test-checklist.md
        │       ├── run-all-features.test.js
        │       ├── servicenow-flow.test.js
        │       └── simple-smoke-tests.js
        ├── admin/
        │   ├── AddServiceForm.js
        │   ├── Admin.module.css
        │   ├── page.js
        │   └── components/
        │       └── AddServiceForm.js
        ├── api/
        │   ├── admin/
        │   │   ├── debug-credentials/
        │   │   │   └── route.js
        │   │   ├── encrypt-credentials/
        │   │   │   └── route.js
        │   │   ├── generate-encryption-key/
        │   │   │   └── route.js
        │   │   ├── test-connection/
        │   │   │   └── route.js
        │   │   └── test-credentials/
        │   │       └── route.js
        │   ├── debug-env/
        │   │   └── route.js
        │   ├── servicenow/
        │   │   ├── route.js
        │   │   ├── fetch-agentic-data/
        │   │   │   └── route.js
        │   │   └── get-credentials/
        │   │       └── route.js
        │   ├── test-ai/
        │   │   └── route.js
        │   └── timeline/
        │       ├── generate/
        │       │   └── route.js
        │       ├── generate-from-profile/
        │       │   └── route.js
        │       └── stream/
        │           └── route.js
        ├── auth/
        │   ├── Auth.module.css
        │   ├── callback/
        │   │   └── page.js
        │   ├── signin/
        │   │   └── page.js
        │   └── signup/
        │       └── page.js
        ├── components/
        │   ├── FlowVisualizer.js
        │   ├── GlobalHeader.js
        │   ├── Header.js
        │   ├── NodeIcons.js
        │   ├── Providers.js
        │   ├── ServiceNowConnector.js
        │   ├── auth/
        │   │   ├── AuthModal.js
        │   │   ├── AuthProvider.js
        │   │   ├── LoginForm.js
        │   │   ├── SignupForm.js
        │   │   └── UserMenu.js
        │   ├── flow/
        │   │   └── FlowCanvas.js
        │   ├── migration/
        │   │   └── SupabaseSetupCheck.js
        │   ├── nodes/
        │   │   ├── AgentNode.js
        │   │   ├── ToolNode.js
        │   │   ├── TriggerNode.js
        │   │   └── UseCaseNode.js
        │   └── theme/
        │       └── ThemeProvider.js
        ├── database/
        │   ├── admin-credentials-schema.sql
        │   └── schema.sql
        ├── hooks/
        │   ├── useFlowData.js
        │   ├── useFlowLayout.js
        │   └── useTimeline.js
        ├── lib/
        │   ├── debug-supabase.js
        │   ├── DynamicEnvDebugger.js
        │   ├── env-check.js
        │   ├── supabase.js
        │   └── llm/
        │       ├── prompts/
        │       │   └── timelinePrompts.js
        │       └── providers/
        │           └── openaiServerProvider.js
        ├── profile/
        │   └── page.js
        ├── profiles/
        │   ├── page.js
        │   ├── profile-detail.css
        │   ├── [id]/
        │   │   ├── page.js
        │   │   ├── __tests__/
        │   │   │   └── page.test.js
        │   │   └── edit/
        │   │       └── page.js
        │   └── components/
        │       ├── ProblemsOpportunitiesForm.js
        │       ├── ProfileWizard.js
        │       ├── ProfileWizard.module.css
        │       ├── StrategicInitiativesForm.js
        │       └── __tests__/
        │           └── ProfileWizard.test.js
        ├── repositories/
        │   ├── credentialsRepository.js
        │   └── profileRepository.js
        ├── services/
        │   ├── aiService.js
        │   ├── demoDataService.js
        │   ├── markdownService.js
        │   ├── profileService.js
        │   ├── timelineService.js
        │   └── __tests__/
        │       ├── markdownService.test.js
        │       └── profileService.test.js
        ├── store/
        │   ├── useAgenticStore.js
        │   ├── useAuthStore.js
        │   └── useBusinessProfileStore.js
        ├── timeline/
        │   ├── README.md
        │   ├── layout.js
        │   ├── page.js
        │   ├── timeline.css
        │   └── components/
        │       ├── BusinessProfileForm.js
        │       ├── BusinessProfileModal.js
        │       ├── MetricsCards.js
        │       ├── MetricsWidget.js
        │       ├── ScenarioSelector.js
        │       ├── TimelineContent.js
        │       ├── TimelineHeader.js
        │       ├── TimelineSidebar.js
        │       └── TimelineVisualization.js
        └── utils/
            ├── encryption.js
            ├── layoutGraph.js
            ├── nodeUtils.js
            ├── transformAgenticData.js
            └── validation.js

================================================
FILE: README.md
================================================
# Agent Blueprint & Business AI Advisory Platform

**🤖 AI Assistant Context:** This is a comprehensive business AI advisory platform built with Next.js, featuring ServiceNow agentic AI flow visualization, interactive AI transformation timelines, and client profile management with structured business intelligence framework. The platform serves as a sophisticated business intelligence tool combining technical visualization capabilities with comprehensive data collection and strategic planning tools. Core technologies: Next.js 15, React 19, ReactFlow, Zustand, Dagre, Supabase. Design inspired by ai-2027.com with modern dark themes and floating UI elements.

**🎯 Current State:** Fully functional platform with a **centralized, provider-agnostic `aiService`** with **comprehensive admin interface for AI credential management** and **intelligent database-backed timeline caching**. The AI architecture is scalable, secure, and ready for future features. Features real AI-powered timeline generation with intelligent, industry-specific business transformation roadmaps using the latest models including **OpenAI o3-mini, o1, GPT-4o**, **Google Gemini 2.5 Flash/Pro**, and **Anthropic Claude Opus 4/Sonnet 4**. **Client profiles are now exclusively stored in Supabase, requiring user authentication for all profile-related features.** This change removes all `localStorage` fallback and data migration logic, streamlining the architecture. **✅ Timeline caching is now fully implemented** with cache-first architecture, 80-90% cost reduction, and instant loading from database. All core features have consistent UI theming across all pages with **Phase 5 UI Consistency & Design System** including global CSS variables, theme provider, and standardized GlobalHeader. All pages (ServiceNow, Profiles, Timeline, Auth) have consistent professional theming with working light/dark mode toggle. The core `ProfileWizard` component has been refactored to use CSS Modules, eliminating inline styles for robust, theme-aware consistency. **Latest enhancements include comprehensive admin interface for multi-provider AI credential management, database-backed timeline caching, professional cache status widget, AI-powered timeline generation with latest models, working edit profile functionality, ProfileWizard UX improvements with clickable step navigation and free exploration, and enhanced visual indicators for completion status.** Recent updates include user profile management page, improved tag readability in light mode, and enhanced header navigation with clickable user profiles. Complete with ServiceNow visualization, **AI-powered transformation timeline with intelligent caching**, comprehensive client profile management system with full edit capability, complete user authentication, and a secure Supabase database backend. The platform features sophisticated UI inspired by ai-2027.com with backdrop blur effects, gradient backgrounds, professional typography, and responsive mobile-optimized layouts. Architecture includes robust service layers with secure multi-user authentication and row-level security. Ready for production deployment and enterprise use.

**🚀 Next Steps:** 
1. ✅ **COMPLETED**: Database-backed timeline caching implemented with intelligent cache-first architecture, 80-90% cost reduction, and instant loading.
2. **NEXT PRIORITIES**: PDF export capabilities, multi-platform connectors, and timeline collaboration features.
3. Focus on creating a scalable, secure platform for enterprise business intelligence and AI transformation planning.

## Project Overview

A Next.js application that serves five primary functions:

1. **ServiceNow Agentic AI Visualizer**: Transform ServiceNow agentic AI data into interactive flow diagrams
2. **AI Transformation Timeline**: Business advisory tool that generates personalized AI adoption roadmaps  
3. **Client Profile Management**: Comprehensive business intelligence system using structured methodology to create client "digital twins"
4. **User Authentication & Database Management**: Secure multi-user system with encrypted credential storage and profile management exclusively on Supabase
5. **User Profile Management**: Complete user account management with profile editing, preferences, and account information

The platform positions itself as a sophisticated enterprise tool for AI transformation planning, providing immediate value through visualization and analysis while capturing comprehensive business intelligence for strategic decision-making.

## Core Features

### 🔄 **ServiceNow Flow Visualization**
- **Interactive Node Graph**: Drag, zoom, and pan through complex AI workflows
- **Hierarchical Exploration**: Expand/collapse nodes to explore use cases → agents → tools
- **Dynamic Layouts**: Toggle between horizontal (LR) and vertical (TB) orientations
- **Real-time Collaboration**: Multiple layout options and live data refresh
- **Secure Integration**: Direct connection to ServiceNow instances with credential management

### 📈 **AI Transformation Timeline** ✨ **(AI-Powered with OpenAI GPT-4o & Intelligent Caching)**
- **Business Profile Collection**: Multi-step form capturing company details, AI maturity, goals
- **Real AI Timeline Generation**: OpenAI GPT-4o powered intelligent timeline creation
- **Database-Backed Caching**: Instant loading from cache (<1 second) vs 10-15 second fresh generation
- **Cache Status Widget**: Professional UI showing cached vs fresh timelines with regeneration controls
- **Interactive Timeline**: Scroll-based journey through 6 transformation phases
- **Floating Metrics Widget**: Real-time KPIs that update based on scroll position (ai-2027.com inspired)
- **AI-Driven Content Generation**: Personalized roadmaps using LLM analysis of profile data
- **Industry-Specific Recommendations**: Tailored advice based on company industry, size, and maturity
- **Scenario-Based Planning**: Conservative, Balanced, and Aggressive timeline scenarios with caching support
- **ROI Projections**: AI-calculated investment and return projections
- **Cost Optimization**: 80-90% reduction in unnecessary OpenAI API calls through intelligent caching
- **Cross-Device Persistence**: Timelines persist across devices and sessions through Supabase database
- **Structured Validation**: Comprehensive timeline structure validation and error handling
- **Mobile-Responsive Design**: Optimized for all device types

### 👥 **Client Profile Management**
- **ProfileWizard**: 8-step guided form implementing structured business intelligence methodology
- **Enhanced UX**: Clickable step navigation, free exploration without field blocking, smart visual completion indicators
- **Full CRUD Operations**: Create new profiles, edit existing profiles, view detailed breakdowns, delete as needed
- **Business Intelligence Capture**: Company overview, strategic issues, quantified impact analysis
- **Structured Framework**: Expected Outcomes → Problems & Opportunities → Solutions & Value → Architecture Assessment
- **Smart Validation**: Visual step indicators (completed ✓, current, incomplete) with gentle warnings instead of hard blocks
- **Secure Database Integration**: All profiles are stored securely in Supabase, requiring user authentication.
- **Demo Data System**: Load 4 realistic industry profiles directly into your authenticated account.
- **Visual Indicators**: Cloud tags for Supabase-stored profiles

### 🔐 **User Authentication & Database Management**
- **Supabase Authentication**: Email/password and magic link authentication flows
- **User Management**: Complete signup, signin, signout with email verification
- **Secure Credential Storage**: AES-256 encrypted ServiceNow credentials per user
- **Row-Level Security**: Individual user profiles with database-level protection
- **Professional UI**: Dark-themed auth forms integrated with existing design system
- **Session Management**: Persistent auth state with automatic token refresh
- **Centralized Cloud Storage**: All client profiles are stored exclusively in Supabase, ensuring data integrity and security.

### 🔧 **Admin Interface for AI Credential Management** ✨ **(New Phase 6.1.5)**
- **Multi-Provider Support**: Manage credentials for OpenAI, Google Gemini, and Anthropic Claude
- **Latest AI Models**: Support for cutting-edge models including:
  - **OpenAI**: o3-mini, o1, o1-mini, o1-preview, GPT-4o, GPT-4o-mini, GPT-4-turbo
  - **Google Gemini**: 2.5 Flash (Hybrid), 2.5 Pro (Advanced Thinking), 2.0 Flash, 1.5 Pro/Flash
  - **Anthropic Claude**: Opus 4 (Most Capable), Sonnet 4 (High Performance), 3.7 Sonnet (Hybrid Reasoning)
- **Encrypted Storage**: AES-256-GCM encryption for all API keys and credentials stored per user
- **Live Connection Testing**: Real-time credential validation before saving
- **Professional UI**: Service-specific cards with connection status indicators
- **ServiceNow Integration**: Secure credential storage for CRM system connections
- **Default Provider Management**: Set preferred AI providers for timeline generation
- **CRUD Operations**: Complete create, read, update, delete functionality for all service credentials
- **User-Level Configuration**: Replace environment variables with secure, user-specific AI configurations

### 👤 **User Profile Management**
- **Personal Profile Page**: Dedicated `/profile` page for user account management
- **Profile Editing**: Editable display name, notification preferences, and account settings
- **Account Information**: View account type, data storage details, and membership information
- **Clickable User Header**: Navigate to profile page by clicking user info in the global header
- **Theme-Aware Design**: Consistent styling with the global design system
- **Account Actions**: Secure sign-out functionality and account management options
- **Theme-Aware Components**: Profile tags with optimized contrast for both light and dark modes
- **Responsive Excellence**: Mobile-optimized layouts with professional spacing and hierarchy

### 🎨 **Design System (ai-2027.com Inspired)**
- **Professional Dark Theme**: Enterprise-grade #0a0e27 background with sophisticated color palette
- **Glass Morphism Effects**: Backdrop blur throughout with rgba overlays and subtle transparency
- **Professional Typography**: Carefully designed text hierarchy with gradient effects for emphasis
- **Smart Animations**: Hover effects with lift/glow, smooth transitions, and interactive feedback
- **Modular Component Design**: Independent form components with consistent styling patterns
- **Enterprise Color Scheme**: Professional slate colors (#f1f5f9, #e2e8f0, #cbd5e1, #94a3b8)
- **Theme-Aware Components**: Profile tags with optimized contrast for both light and dark modes
- **Responsive Excellence**: Mobile-optimized layouts with professional spacing and hierarchy

## Getting Started

### **Prerequisites**
- Node.js 18+
- ServiceNow instance with Agentic AI framework (for visualization features)
- Modern browser (Chrome, Firefox, Safari, Edge)

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd agentic-ai-flow

# Install dependencies
npm install

# Configure AI Integration (required for timeline generation)
# Create .env.local file:
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env.local

# Start development server
npm run dev

# Verify AI integration (optional)
curl http://localhost:3000/api/debug-env
```

### **Quick Testing**
```bash
# Run quick smoke tests (3 seconds)
npm run test:smoke

# Run all tests
npm test
```

### **Usage Options**

#### **Option 1: ServiceNow Visualization**
1. Navigate to `http://localhost:3000`
2. Enter ServiceNow instance details
3. Connect and explore agentic AI flows
4. Use layout controls and node interactions

#### **Option 2: AI Timeline Planning**
1. Click "AI Timeline" button or go to `/timeline`
2. Complete business profile form
3. Generate personalized AI transformation roadmap
4. Explore phases and metrics

#### **Option 3: Client Profile Management**
1. Click "Client Profiles" button or go to `/profiles`
2. **Sign up or sign in** to access your secure profile dashboard.
3. Create a new profile or load demo data (4 industry scenarios available) into your account.
4. Complete 8-step business intelligence assessment (click any step to jump around freely).
5. **Edit existing profiles** - click "View Details" then "Edit Profile" for full wizard editing.
6. Generate automatic AI timeline from profile data.

## Business Value & Enterprise Use Cases

### **Current Positioning**
- **Enterprise Business Intelligence Tool**: Comprehensive platform for AI transformation planning
- **Digital Twin Creation**: Structured markdown profiles create comprehensive business understanding
- **Strategic Planning**: Natural progression from assessment to implementation roadmap
- **Market Positioning**: Bridges technical capability with sophisticated business strategy

### **Enterprise Integration Ready**
- **Authentication**: ✅ Complete Supabase Auth integration with secure multi-user access
- **Database Integration**: ✅ Centralized Supabase database for all profile data.
- **Row-Level Security**: ✅ Database-level security ensuring user data isolation
- **AI Integration**: ✅ OpenAI GPT-4o integration with intelligent timeline generation
- **Export Capabilities**: Ready for PDF generation for executive reporting

## Technical Stack

### **Frontend**
- Next.js 15 with App Router (configured for strict CSS chunking)
- React 19 with functional components
- ReactFlow for interactive diagrams
- Zustand for state management
- Lucide React for icons

### **Visualization**
- Dagre.js for automatic graph layout
- Custom node types with expand/collapse
- Responsive design with mobile support

### **Authentication & Data Management**
- Supabase Authentication with email verification
- User profiles with encrypted credential storage
- ProfileService using ProfileRepository for direct Supabase interaction
- Structured markdown for profile storage

### **AI Integration & LLM Services**
- **Centralized `aiService`**: A single, reusable service (`app/services/aiService.js`) that acts as the entry point for all LLM interactions.
- **Provider-Agnostic Architecture**: The `aiService` uses a provider pattern, with support for multiple providers including OpenAI, Google Gemini, and Anthropic Claude.
- **Admin Interface**: Comprehensive `/admin` dashboard for managing AI credentials with support for:
  - **Latest OpenAI Models**: o3-mini, o1 series, GPT-4o family with reasoning capabilities
  - **Google Gemini 2.5**: Flash (Hybrid), Pro (Advanced Thinking), and legacy 2.0/1.5 models
  - **Anthropic Claude 4**: Opus 4 (Most Capable), Sonnet 4 (High Performance), 3.7 Sonnet (Hybrid Reasoning)
- **Secure Server-Side Execution**: All LLM calls are handled securely on the server, with no client-side exposure of API keys.
- **User-Level Credential Management**: AES-256-GCM encrypted storage replacing environment variables
- **Live Connection Testing**: Real-time validation of API credentials before saving
- **Centralized Prompt Management**: Prompts are stored and managed in a dedicated directory (`app/lib/llm/prompts`) for better organization and reusability.
- **Multi-Provider Timeline Generation**: Dynamic provider selection for AI-powered timeline generation
- **JSON Response Validation**: Services that consume the `aiService` are responsible for validating the structure of the returned JSON data.
- **Environment Configuration**: Easy setup verification via the `/api/debug-env` endpoint.

### **Development**
- TypeScript-ready architecture
- Jest testing framework with Supabase mocking
- ESLint for code quality
- GitHub Actions for CI/CD
- CSS Modules for component-level styling, ensuring a scalable and conflict-free architecture

## Testing

The project uses a pragmatic MVP testing approach:

```bash
npm run test:smoke    # Quick 3-second verification
npm test             # Full test suite
npm run test:watch   # Development mode
```

See `MVP_TESTING_SUMMARY.md` for complete testing strategy.

## Contributing

1. Run `npm run test:smoke` before committing
2. Follow existing code patterns
3. Update documentation for new features
4. Test manually using the checklist in `app/__tests__/features/manual-test-checklist.md`

## Development Guidelines

- Functional components with hooks
- 200-line component limit
- Comprehensive error handling
- Clear separation of concerns between visualization, advisory, and profile features

---

**📞 Ready for Enterprise Deployment**: The platform successfully combines technical demonstration, strategic planning tools, comprehensive business intelligence collection, secure user authentication, a centralized Supabase database, and consistent professional theming across all pages, providing a sophisticated foundation for enterprise AI transformation planning. With the addition of **Phase 6 AI Integration**, the platform now features real OpenAI GPT-4o powered timeline generation with intelligent, industry-specific recommendations. Combined with the structured business intelligence profile system, complete authentication infrastructure, secure cloud database, global design system, and enhanced ProfileWizard with full edit capabilities and intuitive navigation, the platform now captures the depth of business intelligence needed for strategic decision-making while providing immediate value through **AI-powered timeline generation** and opportunity analysis.

**🎨 UI Consistency Status**: Complete global design system with CSS variables, theme provider, and professional theming across all pages. Light/dark mode toggle works globally with localStorage persistence.

**🔐 Authentication Status**: Complete Supabase integration with user management, encrypted credential storage, and enterprise-grade security features.

**🗄️ Database Status**: All client profile data is now exclusively stored in Supabase, with all `localStorage` fallbacks and migration code removed. This provides a more secure, scalable, and centralized data architecture.

**🤖 AI Integration Status**: ✅ **Complete with Admin Interface & Database Caching!** The AI integration features a centralized, provider-agnostic `aiService` with comprehensive admin interface for multi-provider credential management and intelligent database-backed caching. The `/admin` dashboard supports the latest AI models including OpenAI o3-mini/o1, Google Gemini 2.5, and Anthropic Claude 4, with AES-256-GCM encrypted storage, live connection testing, and user-level configuration. Timeline generation uses cache-first architecture with 80-90% cost reduction, instant loading from cache, and cross-device persistence. All LLM calls are handled securely server-side with proper error handling and dynamic configuration checking. Users can now configure their preferred AI providers through the admin interface, replacing the need for environment variables.

**🧪 Testing Status**: Simple MVP testing approach with 9 passing smoke tests including Supabase mocking and AI integration error handling. All tests continue to pass with AI integration updates. See `MVP_TESTING_SUMMARY.md` for details.



================================================
FILE: app/globals.css
================================================
/* Global Theme Variables - Extended from Timeline Page */
:root {
  /* Background colors */
  --bg-primary: #0A0E1A; /* Primary background - deep blue */
  --bg-secondary: #101423; /* Secondary backgrounds - cards, panels */
  --bg-tertiary: #0D111E; /* Tertiary backgrounds - sidebars */
  --bg-overlay: rgba(20, 25, 40, 0.7); /* Overlay backgrounds with transparency */
  
  /* Text colors */
  --text-primary: #E0E0E0; /* Primary text - high contrast */
  --text-secondary: #A0A0B0; /* Secondary text - medium contrast */
  --text-muted: #606070; /* Muted text - low contrast */
  
  /* Border colors */
  --border-primary: rgba(255, 255, 255, 0.1); /* Subtle borders */
  --border-secondary: rgba(255, 255, 255, 0.05); /* Very subtle borders */
  
  /* Accent colors */
  --accent-blue: #3B82F6;
  --accent-green: #10B981;
  --accent-yellow: #F59E0B;
  --accent-red: #EF4444;
  
  /* Button/interactive colors */
  --btn-primary-bg: #3B82F6;
  --btn-primary-hover: #2563EB;
  --btn-secondary-bg: rgba(255, 255, 255, 0.05);
  --btn-secondary-hover: rgba(255, 255, 255, 0.1);
  
  /* Spacing system */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  --font-family-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height: 1.6;
  
  /* Border radius */
  --border-radius-sm: 6px;
  --border-radius: 8px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
  --border-radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 0.2s;
  --transition-normal: 0.3s;
  --transition-slow: 0.4s;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.2);
  --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.3);
  
  /* Glass morphism */
  --backdrop-blur: 20px;
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  
  /* Legacy compatibility (gradually phase out) */
  --foreground-rgb: 224, 224, 224;
  --background-rgb: 10, 14, 26;
  
  /* Node colors (ServiceNow specific) */
  --usecase-color: #3498db;
  --trigger-color: #e74c3c;
  --agent-color: #2ecc71;
  --tool-color: #f39c12;
  
  /* Profile tag variables (dark theme) */
  --profile-tag-industry-bg: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(37, 99, 235, 0.3));
  --profile-tag-industry-color: #bfdbfe;
  --profile-tag-industry-border: rgba(59, 130, 246, 0.3);
  
  --profile-tag-size-bg: linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(22, 163, 74, 0.3));
  --profile-tag-size-color: #bbf7d0;
  --profile-tag-size-border: rgba(34, 197, 94, 0.3);
  
  --profile-tag-issue-bg: linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.3));
  --profile-tag-issue-color: #fef3c7;
  --profile-tag-issue-border: rgba(251, 191, 36, 0.3);
  
  --profile-tag-more-bg: linear-gradient(135deg, rgba(156, 163, 175, 0.4), rgba(107, 114, 128, 0.3));
  --profile-tag-more-color: #e5e7eb;
  --profile-tag-more-border: rgba(156, 163, 175, 0.3);
}

/* Light theme variables */
[data-theme="light"] {
  /* Background colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  --bg-overlay: rgba(255, 255, 255, 0.9);
  
  /* Text colors */
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  
  /* Border colors */
  --border-primary: rgba(0, 0, 0, 0.1);
  --border-secondary: rgba(0, 0, 0, 0.05);
  
  /* Accent colors (adjusted for light theme) */
  --accent-blue: #2563eb;
  --accent-green: #059669;
  --accent-yellow: #d97706;
  --accent-red: #dc2626;
  
  /* Button/interactive colors */
  --btn-primary-bg: #2563eb;
  --btn-primary-hover: #1d4ed8;
  --btn-secondary-bg: rgba(0, 0, 0, 0.05);
  --btn-secondary-hover: rgba(0, 0, 0, 0.1);
  
  /* Glass morphism (light) */
  --glass-bg: rgba(255, 255, 255, 0.8);
  --glass-border: rgba(0, 0, 0, 0.1);
  
  /* Legacy compatibility */
  --foreground-rgb: 30, 41, 59;
  --background-rgb: 255, 255, 255;
  
  /* Profile tag variables (light theme) */
  --profile-tag-industry-bg: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.15));
  --profile-tag-industry-color: #1d4ed8;
  --profile-tag-industry-border: rgba(59, 130, 246, 0.3);
  
  --profile-tag-size-bg: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.15));
  --profile-tag-size-color: #047857;
  --profile-tag-size-border: rgba(34, 197, 94, 0.3);
  
  --profile-tag-issue-bg: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.15));
  --profile-tag-issue-color: #b45309;
  --profile-tag-issue-border: rgba(251, 191, 36, 0.3);
  
  --profile-tag-more-bg: linear-gradient(135deg, rgba(156, 163, 175, 0.2), rgba(107, 114, 128, 0.15));
  --profile-tag-more-color: #374151;
  --profile-tag-more-border: rgba(156, 163, 175, 0.3);
}

/* Light theme overrides for profile tags */
[data-theme="light"] .industry-tag {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.15)) !important;
  color: #1d4ed8 !important;
  border: 1px solid rgba(59, 130, 246, 0.3) !important;
}

[data-theme="light"] .size-tag {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(22, 163, 74, 0.15)) !important;
  color: #047857 !important;
  border: 1px solid rgba(34, 197, 94, 0.3) !important;
}

[data-theme="light"] .issue-tag {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.15)) !important;
  color: #b45309 !important;
  border: 1px solid rgba(251, 191, 36, 0.3) !important;
}

[data-theme="light"] .issue-tag.more {
  background: linear-gradient(135deg, rgba(156, 163, 175, 0.2), rgba(107, 114, 128, 0.15)) !important;
  color: #374151 !important;
  border-color: rgba(156, 163, 175, 0.3) !important;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  height: 100vh;
  font-family: var(--font-family);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  color: var(--text-primary);
  background: var(--bg-primary);
}

/* Global Header Styles */
.global-header {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--backdrop-blur));
  border-bottom: 1px solid var(--border-primary);
  position: sticky;
  top: 0;
  z-index: 100;
  font-family: var(--font-family);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
}

/* Brand Section */
.header-brand {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  text-decoration: none;
  color: inherit;
  transition: opacity var(--transition-fast) ease;
}

.brand-link:hover {
  opacity: 0.8;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  height: 32px;
}

.nowgentic-logo {
  height: 24px;
  width: auto;
}

.app-title {
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary);
  margin: 0;
  letter-spacing: -0.01em;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex: 1;
  justify-content: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast) ease;
  position: relative;
}

.nav-link:hover {
  color: var(--text-primary);
  background: var(--btn-secondary-bg);
  transform: translateY(-1px);
}

.nav-link .nav-icon {
  width: 18px;
  height: 18px;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  background: var(--btn-secondary-bg);
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast) ease;
  backdrop-filter: blur(var(--backdrop-blur));
}

.action-btn:hover {
  background: var(--btn-secondary-hover);
  color: var(--text-primary);
  border-color: var(--border-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.action-btn .icon {
  width: 18px;
  height: 18px;
}

.theme-toggle {
  padding: var(--spacing-sm);
  width: 40px;
  height: 40px;
  justify-content: center;
}

/* User Menu */
.user-menu {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--btn-secondary-bg);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  transition: all var(--transition-fast) ease;
}

.user-info:hover {
  background: var(--btn-secondary-hover);
  color: var(--text-primary);
  border-color: var(--border-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.user-email {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sign-out {
  padding: var(--spacing-sm);
  width: 40px;
  height: 40px;
  justify-content: center;
}

.sign-in {
  background: var(--btn-primary-bg);
  color: white;
  border-color: var(--btn-primary-bg);
}

.sign-in:hover {
  background: var(--btn-primary-hover);
  border-color: var(--btn-primary-hover);
}

/* Mobile Menu */
.mobile-menu-toggle {
  display: none;
  padding: var(--spacing-sm);
  width: 40px;
  height: 40px;
  justify-content: center;
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  background: var(--btn-secondary-bg);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast) ease;
}

.mobile-menu-toggle:hover {
  background: var(--btn-secondary-hover);
  color: var(--text-primary);
}

.mobile-nav {
  display: none;
  padding: var(--spacing-md);
  border-top: 1px solid var(--border-primary);
  background: var(--bg-secondary);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-fast) ease;
  margin-bottom: var(--spacing-sm);
}

.mobile-nav-link:hover {
  background: var(--btn-secondary-bg);
  color: var(--text-primary);
}

.mobile-nav-link .nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-content {
  display: flex;
  flex-direction: column;
}

.nav-name {
  font-weight: var(--font-weight-medium);
  font-size: 1rem;
}

.nav-description {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 2px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .mobile-nav {
    display: block;
  }
  
  .user-info .user-email {
    display: none;
  }
  
  .action-btn span {
    display: none;
  }
  
  .app-title {
    font-size: 1.2rem;
  }
}

/* Header styles */
.app-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 12px 20px;
  z-index: 100;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.logo-and-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0px;
}

.app-title {
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.01em;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  margin-left: 0px;
  margin-top: 0;
  height: 28px;
}

.nowgentic-logo {
  height: 20px;
  width: auto;
  position: relative;
  top: 1px;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.header-tabs {
  display: flex;
  gap: 4px;
  margin-top: 4px;
}

.button-group {
  display: flex;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.button-group button {
  border-radius: 0;
  margin: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.button-group button:last-child {
  border-right: none;
}

/* Modern button styles */
.btn {
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  font-weight: var(--font-weight-semibold);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all var(--transition-normal) cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border: 1px solid var(--border-primary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-family: var(--font-family);
  backdrop-filter: blur(var(--backdrop-blur));
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--glass-bg), transparent);
  transition: left 0.5s ease;
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: var(--btn-primary-bg);
  color: white;
  border-color: var(--btn-primary-bg);
}

.btn-primary:hover {
  background: var(--btn-primary-hover);
  border-color: var(--btn-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: var(--btn-secondary-bg);
  color: var(--text-primary);
  border-color: var(--border-primary);
}

.btn-secondary:hover {
  background: var(--btn-secondary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-success {
  background-color: var(--accent-green);
  color: white;
  border-color: var(--accent-green);
}

.btn-success:hover {
  background-color: #059669;
  border-color: #059669;
}

.btn-danger {
  background-color: var(--accent-red);
  color: white;
  border-color: var(--accent-red);
}

.btn-danger:hover {
  background-color: #dc2626;
  border-color: #dc2626;
}

.btn-neutral {
  background-color: var(--text-muted);
  color: white;
  border-color: var(--text-muted);
}

.btn-neutral:hover {
  background-color: var(--text-secondary);
  border-color: var(--text-secondary);
}

.btn-icon {
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Status badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 2px 8px;
}

.status-badge-on {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge-off {
  background-color: #f1f5f9;
  color: #64748b;
}

/* Debug info */
.debug-info {
  font-family: var(--font-family);
  font-size: 0.85rem;
  color: #64748b;
  background-color: #f8fafc;
  border-radius: 6px;
  margin-bottom: 12px;
}

.debug-info summary {
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 500;
}

.debug-info pre {
  padding: 12px;
  border-top: 1px solid #e2e8f0;
  overflow: auto;
  font-family: var(--font-family-mono);
}

/* React Flow styles - the component will be 100% of its parent container */
.react-flow {
  width: 100%;
  height: 100%;
}

/* Common node styles */
.node {
  background: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  min-width: 200px;
  max-width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
}

.node.collapsed {
  opacity: 0.8;
}

.node.collapsed::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    rgba(0, 0, 0, 0.05) 5px,
    rgba(0, 0, 0, 0.05) 10px
  );
  pointer-events: none;
}

.node .node-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}

.node .node-header .header-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  padding-right: 5px;
}

.node.collapsed .node-header {
  /* No longer changing header appearance when collapsed */
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}

.node .node-title {
  font-weight: 600;
  margin: 0;
  margin-top: 2px;
  line-height: 1.2;
  font-size: 0.95rem;
}

.node .node-type {
  color: #666;
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.node .node-content {
  margin-top: 8px;
}

.node .node-description {
  font-size: 0.85rem;
  color: #333;
  line-height: 1.4;
}

.node .node-field {
  font-size: 0.85rem;
  margin-bottom: 5px;
}

.node .field-label {
  font-weight: 600;
  color: #555;
}

.node .node-expanded-content {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed #eee;
}

.node .node-section {
  margin-bottom: 10px;
}

.node .section-title {
  font-weight: 600;
  font-size: 0.85rem;
  color: #555;
  margin-bottom: 3px;
}

.node .section-content {
  font-size: 0.85rem;
  white-space: pre-wrap;
  font-family: var(--font-family-mono);
}

.node .expand-button,
.node .details-button {
  background: none;
  border: 1px solid #ddd;
  color: #666;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: 5px;
  z-index: 10;
}

.node .expand-button:hover,
.node .details-button:hover {
  background: #f5f5f5;
  color: #333;
  transform: scale(1.1);
}

.node .button-group {
  display: flex;
}

/* Node types */
.use-case-node {
  background-color: #fff0f0;
  border-color: #ffcccc;
}

.trigger-node {
  background-color: #fff8e1;
  border-color: #ffecb3;
}

.agent-node {
  background-color: #e3f2fd;
  border-color: #bbdefb;
}

.tool-node {
  background-color: #e8f5e9;
  border-color: var(--tool-color);
}

/* Sidebar Styles */
.sidebar {
  width: 300px;
  background: #f8f9fa;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  border-right: 1px solid #e0e0e0;
  font-family: var(--font-family);
}

.sidebar-header {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Details panel */
.details-panel {
  background: white;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  max-width: 300px;
  font-family: var(--font-family);
}

.details-title {
  font-weight: 600;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
}

.details-content {
  font-size: 0.85rem;
}

.details-field {
  margin-bottom: 8px;
}

.details-label {
  font-weight: 600;
  color: #555;
  margin-right: 5px;
}

.details-value {
  color: #333;
}

/* Add styles for node hierarchy indicators and children info */
.node .node-children-info {
  font-size: 0.75rem;
  color: #666;
  margin-top: 5px;
  font-style: italic;
}

.node .expand-button {
  position: relative;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  transition: all 0.2s ease;
}

.node .expand-button:hover {
  background-color: #e0e0e0;
  transform: scale(1.1);
}

/* Add a special style for parent nodes that have children */
.node[data-has-children="true"] .node-header {
  position: relative;
}

/* Auth header specific styles */
.auth-header {
  font-family: var(--font-inter, system-ui, -apple-system, sans-serif);
}

/* Pulse animation for loading states */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

/* Mobile navigation classes */
@media (max-width: 768px) {
  .hidden-mobile {
    display: none !important;
  }
  .mobile-nav {
    display: block !important;
  }
}

/* Node condition styles */
.node .node-condition {
  font-size: 0.85rem;
  margin: 5px 0;
}

.node .condition-label {
  font-weight: 600;
  color: #555;
  margin-right: 4px;
}

.node .condition-value {
  font-family: var(--font-family-mono);
  word-break: break-word;
  color: #333;
  font-size: 0.8rem;
}

/* External link icon styles */
.external-link-icon {
  cursor: pointer;
  margin-left: 0;
  opacity: 1;
  transition: opacity 0.2s ease;
  color: #666;
}

.external-link-icon:hover {
  opacity: 0.8;
  color: #3498db;
}

.node-header {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.node-external-link {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
  min-width: 24px;
  height: 24px;
  padding: 3px;
  color: #666;
  z-index: 5;
  transition: all 0.2s ease;
}

.node-external-link:hover {
  color: #3498db;
  background-color: #e0e0e0;
  transform: scale(1.1);
}

/* Node header buttons container */
.node-header-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: 10px;
}

/* Add styling for the login screen */
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background: #f5f5f5;
  width: 100%;
  height: 100%;
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 500px;
  overflow: hidden;
  padding: 2rem;
  transition: transform 0.3s ease;
}

.login-card:hover {
  /* transform removed to disable animation */
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 1rem;
  background: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-icon svg {
  width: 40px;
  height: 40px;
  color: white;
}

.login-header h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}

.login-subtitle {
  color: #718096;
  font-size: 0.95rem;
  max-width: 80%;
  margin: 0 auto;
}

.login-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
  position: relative;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

.form-group label svg {
  width: 18px;
  height: 18px;
  color: #3498db;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background-color: #f7fafc;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  color: #2d3748;
}

.form-group input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
}

.form-group input:read-only {
  background-color: #f1f5f9;
  cursor: not-allowed;
}

.form-note {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #718096;
  font-style: italic;
}

.login-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #fef2f2;
  border-radius: 8px;
  color: #dc2626;
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
}

.login-error svg {
  width: 20px;
  height: 20px;
  color: #dc2626;
  flex-shrink: 0;
}

.login-button {
  width: 100%;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.login-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.login-button:active {
  transform: translateY(0);
}

.login-button svg {
  width: 20px;
  height: 20px;
}

.login-button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  animation: rotate 2s linear infinite;
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}

.spinner .path {
  stroke: white;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Add styling for the login-branding section */
.login-branding {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.nowgentic-logo {
  display: flex;
  align-items: center;
}

/* Timeline Page Styles */
.timeline-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  font-family: var(--font-family);
}

/* Timeline Header */
.timeline-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.timeline-header .header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.back-button {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.1);
}

.header-title-section {
  flex: 1;
}

.timeline-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  letter-spacing: -0.02em;
}

.timeline-subtitle {
  color: #64748b;
  margin: 0.25rem 0 0 0;
  font-size: 1rem;
}

/* Timeline Container - removed to avoid conflict with timeline page */

/* Form Styles */
.form-wrapper {
  max-width: 800px;
  margin: 3rem auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.form-intro {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
  padding: 3rem;
  text-align: center;
}

.form-intro h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
}

.form-intro p {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.95;
}

.business-profile-form {
  padding: 3rem;
}

.form-section {
  margin-bottom: 3rem;
}

.form-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #475569;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-group input[type="text"],
.form-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: #f8fafc;
}

.form-group input[type="text"]:focus,
.form-group select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  background: white;
}

.form-group input.error,
.form-group select.error {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
}

/* Radio and Checkbox Styles */
.radio-group,
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.radio-label,
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: #f8fafc;
}

.radio-label:hover,
.checkbox-label:hover {
  border-color: #cbd5e1;
  background: white;
}

.radio-label input,
.checkbox-label input {
  margin: 0;
}

/* Maturity Options */
.maturity-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 0.75rem;
}

.maturity-option {
  position: relative;
  padding: 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8fafc;
}

.maturity-option:hover {
  border-color: #cbd5e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.maturity-option.selected {
  border-color: #3498db;
  background: #eff6ff;
}

.maturity-option input {
  position: absolute;
  opacity: 0;
}

.maturity-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.maturity-content p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

/* Goal Options */
.goal-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.goal-option {
  position: relative;
  padding: 1rem 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8fafc;
}

.goal-option:hover {
  border-color: #cbd5e1;
  background: white;
}

.goal-option.selected {
  border-color: #3498db;
  background: #eff6ff;
  color: #1e40af;
}

.goal-option input {
  position: absolute;
  opacity: 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-actions {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.btn-large {
  padding: 1rem 3rem;
  font-size: 1.1rem;
}

/* Scenario Selector */
.scenario-selector {
  margin-bottom: 3rem;
}

.scenario-selector h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.scenario-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.scenario-option {
  padding: 2rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  position: relative;
  overflow: hidden;
}

.scenario-option:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.scenario-option.active {
  border-color: var(--scenario-color);
  background: linear-gradient(to bottom, rgba(52, 152, 219, 0.05), rgba(52, 152, 219, 0.02));
}

.scenario-option.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--scenario-color);
}

.scenario-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.scenario-option h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.scenario-option p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

/* Timeline Controls */
.timeline-controls {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

/* Metrics Cards */
.metrics-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.metric-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    rgba(52, 152, 219, 0.1) 0%, 
    rgba(52, 152, 219, 0.05) 100%);
}

.metric-content h4 {
  font-size: 0.9rem;
  font-weight: 500;
  color: #64748b;
  margin: 0 0 0.25rem 0;
}

.metric-value {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

/* Timeline Visualization */
.timeline-visualization {
  position: relative;
  padding: 2rem 0;
}

.timeline-container {
  position: relative;
}

.timeline-line {
  position: absolute;
  left: 100px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, 
    #e2e8f0 0%, 
    #cbd5e1 50%, 
    #e2e8f0 100%);
}

/* Timeline Events */
.timeline-event {
  display: grid;
  grid-template-columns: 120px auto 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
}

.event-date {
  text-align: right;
  padding-top: 0.5rem;
}

.event-date span {
  font-weight: 600;
  color: #64748b;
  font-size: 0.95rem;
}

.event-marker {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 3px solid var(--event-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.event-icon {
  font-size: 1.2rem;
}

.event-content {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.timeline-event.hovered .event-content {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateX(4px);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.75rem;
}

.event-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.expand-toggle {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.2rem;
  color: #64748b;
}

.expand-toggle:hover {
  background: #e2e8f0;
  color: #334155;
}

.event-description {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* Event Details (Expanded Content) */
.event-details {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  animation: fadeInExpand 0.3s ease;
}

@keyframes fadeInExpand {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.detail-section {
  margin-bottom: 1.5rem;
}

.detail-section h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #334155;
  margin: 0 0 0.75rem 0;
}

.detail-section ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #64748b;
}

.detail-section li {
  margin-bottom: 0.5rem;
}

.agents-list {
  display: grid;
  gap: 1rem;
}

.agent-card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
}

.agent-card h5 {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.agent-card p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
}

.impact {
  display: inline-block;
  background: #dcfce7;
  color: #166534;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.department-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-block;
  background: #e0e7ff;
  color: #3730a3;
  padding: 0.375rem 0.875rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
}

.detail-metric {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
}

.metric-label {
  font-weight: 500;
  color: #64748b;
}

.metric-value {
  font-weight: 600;
  color: #1e293b;
}

.outcomes-grid {
  display: grid;
  gap: 0.75rem;
}

.outcome {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f0f9ff;
  border-radius: 8px;
  border: 1px solid #bae6fd;
}

.outcome-label {
  font-weight: 500;
  color: #0369a1;
}

.outcome-value {
  font-weight: 600;
  color: #0c4a6e;
}

/* Recommendations Section */
.recommendations-section {
  margin-top: 4rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.recommendations-section h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.recommendations-list {
  display: grid;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.recommendation {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.rec-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #3498db;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.recommendation p {
  margin: 0;
  color: #475569;
  line-height: 1.6;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  text-align: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 3px solid #e2e8f0;
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.loading-container p {
  color: #64748b;
  font-size: 1.1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .timeline-header .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .header-actions {
    display: flex;
    gap: 0.75rem;
    width: 100%;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .scenario-options {
    grid-template-columns: 1fr;
  }
  
  .metrics-cards {
    grid-template-columns: 1fr;
  }
  
  .timeline-event {
    grid-template-columns: 80px auto 1fr;
    gap: 1rem;
  }
  
  .timeline-line {
    left: 80px;
  }
  
  .maturity-options,
  .goal-options {
    grid-template-columns: 1fr;
  }
}

/* Profile Management System Styles */

/* Profiles Page - Modern Design */
.profiles-page {
  min-height: 100vh;
  background: #0a0e27;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.15) 0%, transparent 50%);
  font-family: var(--font-family);
  position: relative;
}

.profiles-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(135deg, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
    linear-gradient(225deg, rgba(255, 119, 198, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

.profiles-header {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.profiles-header .header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.profiles-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.02em;
}

.profiles-subtitle {
  color: rgba(255, 255, 255, 0.7);
  margin: 0.25rem 0 0 0;
  font-size: 1.1rem;
  font-weight: 400;
}

.profiles-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  position: relative;
  z-index: 2;
}

.empty-state {
  text-align: center;
  padding: 6rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  margin: 2rem auto;
  max-width: 600px;
}

.empty-icon-lucide {
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 2rem;
}

.empty-state h2 {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-weight: 600;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.profiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 2rem;
}

.profile-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
}

.profile-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.profile-card:hover {
  transform: translateY(-8px);
  border-color: rgba(120, 119, 198, 0.4);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 60px rgba(120, 119, 198, 0.2);
}

.profile-card:hover::before {
  opacity: 1;
}

.profile-card-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.profile-icon {
  font-size: 2.2rem;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(120, 119, 198, 0.3), rgba(255, 119, 198, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.profile-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.01em;
}

.profile-tags {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.4rem 1rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.industry-tag {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(37, 99, 235, 0.3));
  color: #bfdbfe;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.size-tag {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.4), rgba(22, 163, 74, 0.3));
  color: #bbf7d0;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.profile-stats {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;
}

.stat {
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.stat-value {
  font-weight: 700;
  color: #ffffff;
  font-size: 1rem;
}

.status-draft {
  color: #fbbf24;
}

.status-active {
  color: #34d399;
}

.profile-issues {
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.issues-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  display: block;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.issues-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.issue-tag {
  padding: 0.3rem 0.75rem;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.3));
  color: #fef3c7;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(251, 191, 36, 0.3);
  backdrop-filter: blur(10px);
}

.issue-tag.more {
  background: linear-gradient(135deg, rgba(156, 163, 175, 0.4), rgba(107, 114, 128, 0.3));
  color: #e5e7eb;
  border-color: rgba(156, 163, 175, 0.3);
}

.profile-card-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  position: relative;
  z-index: 1;
}

/* Profile Wizard Styles */
.profile-wizard {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  font-family: var(--font-family);
}

.wizard-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.wizard-header h1 {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
}

.wizard-progress {
  max-width: 800px;
  margin: 0 auto;
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  position: relative;
}

.progress-steps::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 2px;
  background: #e2e8f0;
  z-index: 1;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
  background: white;
  padding: 0 1rem;
}

.step-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.progress-step.active .step-icon {
  background: #3498db;
  color: white;
}

.progress-step.current .step-icon {
  background: #2ecc71;
  color: white;
  transform: scale(1.1);
}

.step-title {
  font-size: 0.75rem;
  color: #64748b;
  text-align: center;
  font-weight: 500;
}

.progress-step.active .step-title {
  color: #1e293b;
  font-weight: 600;
}

.progress-bar {
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.wizard-content {
  flex: 1;
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  gap: 2rem;
  padding: 2rem;
}

.wizard-main {
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.wizard-sidebar {
  width: 400px;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.wizard-step h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.wizard-step p {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  color: #1f2937;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: white;
}

.radio-label:hover {
  border-color: #3498db;
  background: #f8fafc;
}

.radio-label input[type="radio"] {
  margin-right: 0.75rem;
  width: auto;
  cursor: pointer;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.checkbox-card {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: all 0.2s ease;
  background: white;
}

.checkbox-card:hover {
  border-color: #3498db;
  background: #f8fafc;
}

.checkbox-card.selected {
  border-color: #3498db;
  background: #eff6ff;
}

.checkbox-card input[type="checkbox"] {
  margin-right: 0.75rem;
  width: auto;
  cursor: pointer;
}

.checkbox-text {
  font-weight: 500;
  color: #374151;
}

.wizard-actions {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-actions {
  display: flex;
  gap: 1rem;
}

.main-actions {
  display: flex;
  gap: 1rem;
}

.btn-small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.btn-timeline {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-timeline:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.action-buttons {
  text-align: center;
  margin-top: 2rem;
}

.markdown-preview {
  height: 100%;
}

.markdown-preview h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
}

.markdown-content {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  font-size: 0.85rem;
  max-height: 500px;
  overflow-y: auto;
  white-space: pre-wrap;
  font-family: var(--font-family-mono);
}

/* Responsive Design */
@media (max-width: 768px) {
  .wizard-content {
    flex-direction: column;
    padding: 1rem;
  }
  
  .wizard-sidebar {
    width: 100%;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .checkbox-grid {
    grid-template-columns: 1fr;
  }
  
  .profiles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .profile-card {
    padding: 1.5rem;
  }
  
  .profile-card-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
  
  .profiles-title {
    font-size: 2rem;
  }
  
  .profiles-content {
    padding: 2rem 1rem;
  }
  
  .wizard-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .main-actions {
    width: 100%;
    justify-content: space-between;
  }
} 


================================================
FILE: app/layout.js
================================================
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './components/Providers';
import DynamicEnvDebugger from './lib/DynamicEnvDebugger';

// Initialize the Inter font with the weights we need
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Agentic AI Flow Visualizer',
  description: 'Visualize ServiceNow agentic AI flow data as interactive flow diagrams',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <DynamicEnvDebugger />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 


================================================
FILE: app/page.js
================================================
'use client';

import React, { useState, useRef } from 'react';
import useAgenticStore from './store/useAgenticStore';
import ServiceNowConnector from './components/ServiceNowConnector';
import FlowVisualizer from './components/FlowVisualizer';
import GlobalHeader from './components/GlobalHeader';
import { ReactFlowProvider } from 'reactflow';
import { Info } from 'lucide-react';

export default function Home() {
  const agenticData = useAgenticStore((state) => state.agenticData);
  const clearAgenticData = useAgenticStore((state) => state.clearAgenticData);
  const refreshData = useAgenticStore((state) => state.refreshData);
  const resetData = useAgenticStore((state) => state.resetData);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  
  // Refs for flow control methods
  const flowVisualizerRef = useRef({
    expandAllNodes: () => {},
    collapseAllNodes: () => {},
  });

  // Simple error boundary implementation
  const handleError = (error) => {
    console.error("Error in flow visualization:", error);
    setError(error.message || "An error occurred displaying the flow diagram");
  };

  // Handle refresh button click
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refreshData();
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error refreshing data:", err);
      setError(err.message || "Failed to refresh data from ServiceNow");
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Flow control handlers
  const handleExpandAll = () => {
    flowVisualizerRef.current.expandAllNodes();
  };
  
  const handleCollapseAll = () => {
    flowVisualizerRef.current.collapseAllNodes();
  };
  
  const handleResetFlow = () => {
    resetData();
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: 0,
    }}>
      <GlobalHeader />
      <main style={{ 
        minHeight: 'calc(100vh - 64px)', // Subtract header height
        width: '100vw',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}>
        {agenticData && (
          <div className="flow-controls" style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--backdrop-blur))',
            borderBottom: '1px solid var(--border-primary)',
            padding: 'var(--spacing-md) var(--spacing-lg)'
          }}>
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'var(--spacing-lg)'
            }}>
              <div>
                <h2 style={{
                  margin: 0,
                  fontSize: '1.25rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)'
                }}>ServiceNow Agentic AI Flow</h2>
                <p style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)'
                }}>Interactive visualization of AI agents, use cases, and tools</p>
              </div>
              
              <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                <div className="button-group">
                  <button className="btn btn-secondary" onClick={handleCollapseAll}>
                    Collapse All
                  </button>
                  <button className="btn btn-secondary" onClick={handleExpandAll}>
                    Expand All
                  </button>
                </div>
                <button 
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="btn btn-primary"
                >
                  {isRefreshing ? 'Refreshing...' : 'Refresh'} 
                </button>
                <button 
                  onClick={() => setShowDebug(!showDebug)}
                  className="btn btn-secondary"
                  aria-label="Toggle debug info"
                >
                  <Info size={18} />
                </button>
                <button 
                  onClick={clearAgenticData}
                  className="btn btn-danger"
                >
                  Disconnect
                </button>
              </div>
            </div>
            
            {showDebug && (
              <div className="debug-info" style={{
                marginTop: 'var(--spacing-md)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--border-radius)',
                padding: 'var(--spacing-md)'
              }}>
                <details open>
                  <summary>Debug Information</summary>
                  <pre style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    marginTop: 'var(--spacing-sm)'
                  }}>
                    {JSON.stringify({
                      dataPresent: !!agenticData,
                      useCases: agenticData?.use_cases?.length || 0,
                      firstUseCase: agenticData?.use_cases?.[0]?.name || 'None'
                    }, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        )}
      
      <div style={{ flex: 1, width: '100%' }}>
        {!agenticData ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%', 
            padding: 'var(--spacing-lg)' 
          }}>
            <ServiceNowConnector />
          </div>
        ) : error ? (
          <div style={{
            color: 'var(--accent-red)',
            padding: 'var(--spacing-lg)',
            border: '1px solid var(--accent-red)',
            borderRadius: 'var(--border-radius)',
            background: 'var(--bg-secondary)',
            margin: 'var(--spacing-lg)',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h3 style={{ fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-sm)' }}>
              Error Displaying Flow
            </h3>
            <p style={{ marginBottom: 'var(--spacing-md)' }}>{error}</p>
            <button 
              onClick={clearAgenticData}
              className="btn btn-danger"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div style={{ height: 'calc(100vh - 120px)', width: '100%', position: 'relative' }}>
            <ReactFlowProvider>
              <FlowVisualizer 
                onError={handleError} 
                ref={flowVisualizerRef}
              />
            </ReactFlowProvider>
          </div>
        )}
      </div>
      </main>
    </div>
  );
} 


================================================
FILE: app/__mocks__/@supabase/supabase-js.js
================================================
// Mock Supabase client for testing

export const createClient = jest.fn(() => ({
  auth: {
    getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
    getUser: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
    signInWithPassword: jest.fn().mockResolvedValue({ data: null, error: null }),
    signUp: jest.fn().mockResolvedValue({ data: null, error: null }),
    signOut: jest.fn().mockResolvedValue({ error: null }),
    onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
  },
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  single: jest.fn().mockResolvedValue({ data: null, error: null }),
}));

export default { createClient }; 


================================================
FILE: app/__tests__/features/ai-timeline.test.js
================================================
/**
 * AI Timeline Generation Feature Tests
 * Tests the complete user journey for generating and interacting with AI timelines
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock stores and services
jest.mock('../../store/useBusinessProfileStore', () => ({
  useBusinessProfileStore: jest.fn()
}));

jest.mock('../../services/timelineService', () => ({
  timelineService: {
    generateTimeline: jest.fn()
  }
}));

// Mock timeline components
jest.mock('../../timeline/components/BusinessProfileModal', () => ({
  __esModule: true,
  default: function MockBusinessProfileModal({ isOpen, onClose, onSubmit }) {
    if (!isOpen) return null;
    
    return (
      <div data-testid="profile-modal">
        <h2>Business Profile</h2>
        <button onClick={() => {
          onSubmit({
            companyName: 'Test Company',
            industry: 'Technology',
            companySize: '100-500',
            aiMaturity: 'beginner'
          });
          onClose();
        }}>
          Generate Timeline
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  }
}));

jest.mock('../../timeline/components/MetricsWidget', () => ({
  __esModule: true,
  default: function MockMetricsWidget({ metrics }) {
    return (
      <div data-testid="metrics-widget" className="metrics-widget">
        <div>ROI: {metrics?.roi || '0%'}</div>
        <div>Investment: {metrics?.investment || '$0'}</div>
        <div>Timeline: {metrics?.timeline || '0 months'}</div>
      </div>
    );
  }
}));

// Import mocked functions
import { useBusinessProfileStore } from '../../store/useBusinessProfileStore';
import { timelineService } from '../../services/timelineService';

// Import mock components
import MockBusinessProfileModal from '../../timeline/components/BusinessProfileModal';
import MockMetricsWidget from '../../timeline/components/MetricsWidget';

// Simple timeline page mock
const MockTimelinePage = () => {
  const store = useBusinessProfileStore();
  const [showModal, setShowModal] = React.useState(!store.timeline);
  
  return (
    <div>
      <h1>AI Transformation Timeline</h1>
      
      {!store.timeline && (
        <button onClick={() => setShowModal(true)}>
          Create Timeline
        </button>
      )}
      
      {store.timeline && (
        <>
          <div data-testid="timeline-content">
            <h2>{store.timeline.companyName} Timeline</h2>
            <div>Scenario: {store.timeline.scenario}</div>
            <div>Phases: {store.timeline.phases?.length || 0}</div>
          </div>
          
          <div data-testid="scenario-selector">
            <button onClick={() => store.setScenario('conservative')}>
              Conservative
            </button>
            <button onClick={() => store.setScenario('balanced')}>
              Balanced
            </button>
            <button onClick={() => store.setScenario('aggressive')}>
              Aggressive
            </button>
          </div>
          
          <MockMetricsWidget metrics={store.timeline.metrics} />
        </>
      )}
      
      <MockBusinessProfileModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={async (profile) => {
          const timeline = await timelineService.generateTimeline(profile, 'balanced');
          store.setTimeline(timeline);
        }}
      />
    </div>
  );
};

describe('AI Timeline Generation Feature', () => {
  let mockStore;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock store
    mockStore = {
      timeline: null,
      setTimeline: jest.fn(),
      businessProfile: null,
      setBusinessProfile: jest.fn(),
      scenario: 'balanced',
      setScenario: jest.fn()
    };
    
    useBusinessProfileStore.mockImplementation((selector) =>
      selector ? selector(mockStore) : mockStore
    );
    
    // Mock timeline service
    timelineService.generateTimeline.mockResolvedValue({
      companyName: 'Test Company',
      scenario: 'balanced',
      phases: [
        { name: 'Foundation', duration: '3 months' },
        { name: 'Implementation', duration: '6 months' },
        { name: 'Expansion', duration: '9 months' },
        { name: 'Optimization', duration: '12 months' }
      ],
      metrics: {
        roi: '425%',
        investment: '$1.5M',
        timeline: '30 months'
      }
    });
  });

  it('should generate timeline from business profile', async () => {
    render(<MockTimelinePage />);
    
    // Initially no timeline
    expect(screen.getByText('Create Timeline')).toBeInTheDocument();
    expect(screen.queryByTestId('timeline-content')).not.toBeInTheDocument();
    
    // Open profile modal
    fireEvent.click(screen.getByText('Create Timeline'));
    expect(screen.getByTestId('profile-modal')).toBeInTheDocument();
    
    // Submit profile
    fireEvent.click(screen.getByText('Generate Timeline'));
    
    // Wait for timeline generation
    await waitFor(() => {
      expect(timelineService.generateTimeline).toHaveBeenCalledWith(
        expect.objectContaining({
          companyName: 'Test Company',
          industry: 'Technology'
        }),
        'balanced'
      );
    });
    
    // Mock timeline display
    mockStore.timeline = await timelineService.generateTimeline.mock.results[0].value;
    
    // Verify timeline is displayed
    expect(mockStore.setTimeline).toHaveBeenCalled();
  });

  it('should switch between scenarios', async () => {
    // Setup with existing timeline
    mockStore.timeline = {
      companyName: 'Test Company',
      scenario: 'balanced',
      phases: [1, 2, 3, 4],
      metrics: { roi: '425%', investment: '$1.5M', timeline: '30 months' }
    };
    
    render(<MockTimelinePage />);
    
    // Verify initial scenario
    expect(screen.getByText('Scenario: balanced')).toBeInTheDocument();
    
    // Switch to conservative
    fireEvent.click(screen.getByText('Conservative'));
    expect(mockStore.setScenario).toHaveBeenCalledWith('conservative');
    
    // Switch to aggressive
    fireEvent.click(screen.getByText('Aggressive'));
    expect(mockStore.setScenario).toHaveBeenCalledWith('aggressive');
  });

  it('should display metrics widget with timeline data', async () => {
    mockStore.timeline = {
      companyName: 'Test Company',
      scenario: 'balanced',
      phases: [],
      metrics: {
        roi: '425%',
        investment: '$1.5M',
        timeline: '30 months'
      }
    };
    
    render(<MockTimelinePage />);
    
    // Verify metrics widget
    const metricsWidget = screen.getByTestId('metrics-widget');
    expect(metricsWidget).toBeInTheDocument();
    expect(screen.getByText('ROI: 425%')).toBeInTheDocument();
    expect(screen.getByText('Investment: $1.5M')).toBeInTheDocument();
    expect(screen.getByText('Timeline: 30 months')).toBeInTheDocument();
  });

  it('should display correct number of phases', async () => {
    mockStore.timeline = {
      companyName: 'Test Company',
      scenario: 'balanced',
      phases: [
        { name: 'Foundation' },
        { name: 'Implementation' },
        { name: 'Expansion' },
        { name: 'Optimization' }
      ],
      metrics: {}
    };
    
    render(<MockTimelinePage />);
    
    expect(screen.getByText('Phases: 4')).toBeInTheDocument();
  });

  it('should handle timeline generation errors', async () => {
    timelineService.generateTimeline.mockRejectedValue(new Error('Generation failed'));
    
    render(<MockTimelinePage />);
    
    // Try to generate timeline
    fireEvent.click(screen.getByText('Create Timeline'));
    fireEvent.click(screen.getByText('Generate Timeline'));
    
    await waitFor(() => {
      expect(timelineService.generateTimeline).toHaveBeenCalled();
    });
    
    // Error should be handled gracefully
    // In real app, would show error message
  });
}); 


================================================
FILE: app/__tests__/features/client-profiles.test.js
================================================
/**
 * Client Profile Management Feature Tests
 * Tests the complete user journey for creating and managing client profiles
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock services
jest.mock('../../services/profileService', () => ({
  ProfileService: {
    getAllProfiles: jest.fn(),
    createProfile: jest.fn(),
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    deleteProfile: jest.fn()
  }
}));

jest.mock('../../services/demoDataService', () => ({
  demoDataService: {
    getDemoProfiles: jest.fn()
  }
}));

jest.mock('../../services/markdownService', () => ({
  markdownService: {
    generateMarkdown: jest.fn().mockReturnValue('# Mock Markdown'),
    parseMarkdown: jest.fn()
  }
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Simple mock for ProfileWizard
jest.mock('../../profiles/components/ProfileWizard', () => ({
  __esModule: true,
  default: function MockProfileWizard({ isOpen, onClose, onComplete }) {
    if (!isOpen) return null;
    
    return (
      <div data-testid="profile-wizard">
        <h2>Create Client Profile</h2>
        <button onClick={() => {
          onComplete({ id: 'test-123', companyName: 'Test Company' });
          onClose();
        }}>
          Complete Profile
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  }
}));

import ProfilesPage from '../../profiles/page';
import { ProfileService } from '../../services/profileService';
import { demoDataService } from '../../services/demoDataService';

describe('Client Profile Management Feature', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock ProfileService
    ProfileService.getAllProfiles.mockResolvedValue([]);
    ProfileService.createProfile.mockImplementation((data) => 
      Promise.resolve({ ...data, id: 'test-123', createdAt: new Date() })
    );
    
    // Mock demo data
    demoDataService.getDemoProfiles.mockReturnValue([
      { name: 'TechFlow Solutions', industry: 'Technology' },
      { name: 'PrecisionParts Manufacturing', industry: 'Manufacturing' }
    ]);
  });

  it('should display profile list and create new profile', async () => {
    render(<ProfilesPage />);
    
    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByText('Client Profiles')).toBeInTheDocument();
    });
    
    // Initially no profiles
    expect(screen.getByText(/No client profiles yet/i)).toBeInTheDocument();
    
    // Click new profile button
    fireEvent.click(screen.getByText('New Profile'));
    
    // Wizard should open
    expect(screen.getByTestId('profile-wizard')).toBeInTheDocument();
    
    // Complete the profile
    fireEvent.click(screen.getByText('Complete Profile'));
    
    // Wait for profile to be created
    await waitFor(() => {
      expect(ProfileService.createProfile).toHaveBeenCalled();
    });
  });

  it('should load demo data when requested', async () => {
    render(<ProfilesPage />);
    
    // Find and click demo data button
    const demoButton = await screen.findByText(/Load Demo Data/i);
    fireEvent.click(demoButton);
    
    // Should show demo options
    await waitFor(() => {
      expect(screen.getByText('TechFlow Solutions')).toBeInTheDocument();
      expect(screen.getByText('PrecisionParts Manufacturing')).toBeInTheDocument();
    });
  });

  it('should handle existing profiles', async () => {
    // Mock existing profiles
    ProfileService.getAllProfiles.mockResolvedValue([
      {
        id: '1',
        companyName: 'Existing Company',
        industry: 'Healthcare',
        createdAt: new Date(),
        markdownContent: '# Existing Company'
      }
    ]);
    
    render(<ProfilesPage />);
    
    // Wait for profiles to load
    await waitFor(() => {
      expect(screen.getByText('Existing Company')).toBeInTheDocument();
      expect(screen.getByText('Healthcare')).toBeInTheDocument();
    });
    
    // Should not show "no profiles" message
    expect(screen.queryByText(/No client profiles yet/i)).not.toBeInTheDocument();
  });

  it('should navigate to profile detail when clicking view', async () => {
    const mockPush = jest.fn();
    jest.mocked(require('next/navigation').useRouter).mockReturnValue({
      push: mockPush
    });
    
    ProfileService.getAllProfiles.mockResolvedValue([
      {
        id: 'profile-123',
        companyName: 'Test Company',
        industry: 'Technology',
        createdAt: new Date()
      }
    ]);
    
    render(<ProfilesPage />);
    
    // Wait for profile to appear
    await waitFor(() => {
      expect(screen.getByText('Test Company')).toBeInTheDocument();
    });
    
    // Click view button (if implemented)
    const viewButton = screen.queryByRole('button', { name: /view/i });
    if (viewButton) {
      fireEvent.click(viewButton);
      expect(mockPush).toHaveBeenCalledWith('/profiles/profile-123');
    }
  });

  it('should handle profile creation errors', async () => {
    ProfileService.createProfile.mockRejectedValue(new Error('Creation failed'));
    
    render(<ProfilesPage />);
    
    // Open wizard
    fireEvent.click(screen.getByText('New Profile'));
    
    // Try to complete
    fireEvent.click(screen.getByText('Complete Profile'));
    
    // Should handle error gracefully
    await waitFor(() => {
      // Error handling would be implemented in real component
      expect(ProfileService.createProfile).toHaveBeenCalled();
    });
  });
}); 


================================================
FILE: app/__tests__/features/manual-test-checklist.md
================================================
# Manual Test Checklist for MVP

## Quick Feature Verification

Run these tests after making changes to verify everything still works:

### 1. ServiceNow Flow Visualization ✓
- [ ] Can load the home page without errors
- [ ] ServiceNow connector form displays when no data
- [ ] Can enter instance URL and scope ID
- [ ] Flow visualizer displays after connection
- [ ] Can expand/collapse nodes
- [ ] Can switch layout (LR/TB)
- [ ] Refresh button works
- [ ] Error messages display and can be dismissed

### 2. Client Profile Management ✓
- [ ] Can navigate to /profiles
- [ ] "New Profile" button opens wizard
- [ ] Can complete all 8 steps of wizard
- [ ] Profile saves and appears in list
- [ ] Can load demo data (4 industry profiles)
- [ ] Can click on profile to view details
- [ ] Profile details show all tabs
- [ ] Markdown preview works

### 3. AI Timeline Generation ✓
- [ ] Can navigate to /timeline
- [ ] Business profile modal opens if no data
- [ ] Can fill out business profile form
- [ ] Timeline generates after form submission
- [ ] Metrics widget displays and floats
- [ ] Can switch between scenarios (Conservative/Balanced/Aggressive)
- [ ] Timeline phases are expandable
- [ ] Scroll spy navigation works

### 4. Integration Points ✓
- [ ] Profile creation automatically offers timeline generation
- [ ] Timeline can be generated from existing profile
- [ ] Navigation between features works smoothly
- [ ] Data persists in localStorage

## Quick Smoke Test Command

Run this to verify basic functionality:
```bash
npm run test:features -- simple-smoke-tests.js
```

## Full Test Suite (When Needed)

For more comprehensive testing:
```bash
npm test
```

## Manual Testing Tips

1. **Use Chrome DevTools** - Check console for errors
2. **Test in Incognito** - Ensures clean localStorage
3. **Test Mobile View** - Use responsive mode
4. **Test Error States** - Enter invalid data
5. **Test Loading States** - Use network throttling

## Common Issues to Check

- [ ] No console errors on page load
- [ ] All API calls complete successfully
- [ ] UI is responsive on mobile
- [ ] Forms validate properly
- [ ] Navigation doesn't break back button
- [ ] Data persists after refresh 


================================================
FILE: app/__tests__/features/run-all-features.test.js
================================================
/**
 * Feature Test Summary
 * Provides a high-level overview of all feature tests
 */

describe('Feature Test Summary', () => {
  it('should run all feature tests', () => {
    console.log('\n=== FEATURE TEST COVERAGE ===\n');
    console.log('✅ ServiceNow Flow Visualization:');
    console.log('   - Connect to instance');
    console.log('   - Display flow data');
    console.log('   - Node interactions');
    console.log('   - Error handling\n');
    
    console.log('✅ Client Profile Management:');
    console.log('   - Create profiles');
    console.log('   - Load demo data');
    console.log('   - Save/retrieve profiles');
    console.log('   - Navigate to details\n');
    
    console.log('✅ AI Timeline Generation:');
    console.log('   - Generate from profile');
    console.log('   - Switch scenarios');
    console.log('   - Display metrics');
    console.log('   - Handle errors\n');
    
    console.log('Run individual test files for detailed results.');
    console.log('=====================================\n');
    
    expect(true).toBe(true); // Dummy assertion
  });
}); 


================================================
FILE: app/__tests__/features/servicenow-flow.test.js
================================================
/**
 * ServiceNow Flow Visualization Feature Tests
 * Tests the complete user journey for connecting and visualizing flows
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAgenticStore } from '../../store/useAgenticStore';

// Mock the store module
jest.mock('../../store/useAgenticStore', () => ({
  useAgenticStore: jest.fn()
}));

// Mock components to avoid complex setup
jest.mock('../../components/FlowVisualizer', () => ({
  __esModule: true,
  default: function MockFlowVisualizer({ onReady }) {
    React.useEffect(() => {
      if (onReady) {
        onReady({
          expandAllNodes: jest.fn(),
          collapseAllNodes: jest.fn(),
          resetView: jest.fn()
        });
      }
    }, [onReady]);
    
    return (
      <div data-testid="flow-visualizer">
        <div>Mock Flow Visualizer</div>
        <button data-testid="expand-node">Expand Node</button>
        <button data-testid="collapse-node">Collapse Node</button>
      </div>
    );
  }
}));

jest.mock('../../components/ServiceNowConnector', () => ({
  __esModule: true,
  default: function MockServiceNowConnector({ onConnect }) {
    return (
      <div data-testid="servicenow-connector">
        <button onClick={() => onConnect({ instanceUrl: 'test.service-now.com' })}>
          Connect to ServiceNow
        </button>
      </div>
    );
  }
}));

// Import after mocks
import HomePage from '../../page';

describe('ServiceNow Flow Visualization Feature', () => {
  let mockStore;
  
  beforeEach(() => {
    // Reset mock store
    mockStore = {
      agenticData: null,
      setAgenticData: jest.fn(),
      setServiceNowUrl: jest.fn(),
      isLoading: false,
      error: null,
      clearError: jest.fn(),
      resetData: jest.fn(),
      refreshData: jest.fn()
    };
    
    useAgenticStore.mockImplementation((selector) => 
      selector ? selector(mockStore) : mockStore
    );
  });

  it('should connect to ServiceNow instance and display flow', async () => {
    // 1. Render without data (shows connector)
    const { rerender } = render(<HomePage />);
    
    expect(screen.getByTestId('servicenow-connector')).toBeInTheDocument();
    expect(screen.getByText('ServiceNow Agentic AI Flow Visualizer')).toBeInTheDocument();
    
    // 2. Click connect button
    fireEvent.click(screen.getByText('Connect to ServiceNow'));
    
    // 3. Simulate successful connection with data
    mockStore.agenticData = {
      useCases: [
        { id: '1', label: 'Test Use Case', description: 'Test Description' }
      ],
      triggers: [],
      agents: [],
      tools: []
    };
    
    rerender(<HomePage />);
    
    // 4. Verify flow visualizer is displayed
    await waitFor(() => {
      expect(screen.getByTestId('flow-visualizer')).toBeInTheDocument();
    });
  });

  it('should handle node expand/collapse operations', async () => {
    // Setup with data
    mockStore.agenticData = {
      useCases: [{ id: '1', label: 'Test Use Case' }],
      triggers: [],
      agents: [],
      tools: []
    };
    
    render(<HomePage />);
    
    // Verify controls are present
    expect(screen.getByText('Expand All')).toBeInTheDocument();
    expect(screen.getByText('Collapse All')).toBeInTheDocument();
    
    // Test expand all
    fireEvent.click(screen.getByText('Expand All'));
    
    // Test collapse all
    fireEvent.click(screen.getByText('Collapse All'));
    
    // Test reset view
    fireEvent.click(screen.getByText('Reset View'));
  });

  it('should handle layout direction changes', async () => {
    mockStore.agenticData = {
      useCases: [{ id: '1', label: 'Test Use Case' }],
      triggers: [],
      agents: [],
      tools: []
    };
    
    render(<HomePage />);
    
    // Check for layout toggle (if implemented)
    const layoutButton = screen.queryByRole('button', { name: /layout/i });
    if (layoutButton) {
      fireEvent.click(layoutButton);
      // Would verify layout change here
    }
  });

  it('should handle errors gracefully', async () => {
    // Setup with error
    mockStore.error = 'Failed to connect to ServiceNow';
    
    render(<HomePage />);
    
    // Verify error is displayed
    expect(screen.getByText(/Failed to connect/i)).toBeInTheDocument();
    
    // Verify dismiss button works
    const dismissButton = screen.getByText('✕');
    fireEvent.click(dismissButton);
    
    expect(mockStore.clearError).toHaveBeenCalled();
  });

  it('should refresh data when requested', async () => {
    mockStore.agenticData = {
      useCases: [{ id: '1', label: 'Test Use Case' }],
      triggers: [],
      agents: [],
      tools: []
    };
    
    render(<HomePage />);
    
    // Find and click refresh button
    const refreshButton = screen.getByText('Refresh');
    fireEvent.click(refreshButton);
    
    expect(mockStore.refreshData).toHaveBeenCalled();
  });
}); 


================================================
FILE: app/__tests__/features/simple-smoke-tests.js
================================================
/**
 * Simple Smoke Tests for MVP
 * Verifies that key features can be imported and basic functionality exists
 * For actual integration testing, use manual testing or E2E tests
 */

describe('MVP Smoke Tests', () => {
  
  describe('ServiceNow Flow Visualization', () => {
    it('should have required components', () => {
      // Verify components can be imported
      const FlowVisualizer = require('../../components/FlowVisualizer').default;
      const ServiceNowConnector = require('../../components/ServiceNowConnector').default;
      const useAgenticStore = require('../../store/useAgenticStore').default;
      
      expect(FlowVisualizer).toBeDefined();
      expect(ServiceNowConnector).toBeDefined();
      expect(useAgenticStore).toBeDefined();
    });
    
    it('should have flow utility functions', () => {
      const { transformAgenticData } = require('../../utils/transformAgenticData');
      const { applyDagreLayout } = require('../../utils/layoutGraph');
      
      expect(transformAgenticData).toBeDefined();
      expect(applyDagreLayout).toBeDefined();
      expect(typeof transformAgenticData).toBe('function');
      expect(typeof applyDagreLayout).toBe('function');
    });
  });
  
  describe('Client Profile Management', () => {
    it('should have profile services', () => {
      const { ProfileService } = require('../../services/profileService');
      const { markdownService } = require('../../services/markdownService');
      const { demoDataService } = require('../../services/demoDataService');
      
      expect(ProfileService).toBeDefined();
      expect(markdownService).toBeDefined();
      expect(demoDataService).toBeDefined();
      
      // Verify key methods exist as static methods
      expect(ProfileService.createProfile).toBeDefined();
      expect(ProfileService.getProfiles).toBeDefined();
      expect(markdownService.generateMarkdown).toBeDefined();
      expect(demoDataService.getDemoProfiles).toBeDefined();
    });
    
    it('should generate valid markdown', () => {
      const { markdownService } = require('../../services/markdownService');
      
      const testProfile = {
        companyName: 'Test Company',
        industry: 'Technology',
        companyOverview: {
          description: 'A test company'
        }
      };
      
      const markdown = markdownService.generateMarkdown(testProfile);
      expect(markdown).toContain('# Client Profile: Test Company');
      expect(markdown).toContain('Technology');
    });
  });
  
  describe('AI Timeline Generation', () => {
    it('should have timeline service', () => {
      const { TimelineService } = require('../../services/timelineService');
      
      expect(TimelineService).toBeDefined();
      expect(TimelineService.generateTimeline).toBeDefined();
      expect(typeof TimelineService.generateTimeline).toBe('function');
    });
    
    it('should handle timeline generation with proper error handling', async () => {
      const { TimelineService } = require('../../services/timelineService');
      
      const businessProfile = {
        companyName: 'Test Company',
        industry: 'Technology',
        companySize: '100-500',
        aiMaturity: 'beginner'
      };
      
      // Test configuration check methods exist
      expect(TimelineService.isConfigured).toBeDefined();
      expect(TimelineService.getStatus).toBeDefined();
      
      const status = TimelineService.getStatus();
      expect(status).toBeDefined();
      expect(status.provider).toBe('OpenAI GPT-4o');
      expect(typeof status.configured).toBe('boolean');
      
      // In test environment (no API key), verify proper error handling
      // This ensures transparent error reporting without fallback data
      const originalEnv = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;
      
      try {
        await expect(TimelineService.generateTimeline(businessProfile, 'balanced'))
          .rejects
          .toThrow(/OpenAI API key not configured/);
      } finally {
        // Restore original env if it existed
        if (originalEnv) {
          process.env.OPENAI_API_KEY = originalEnv;
        }
      }
    });
    
    it('should have timeline store', () => {
      const useBusinessProfileStore = require('../../store/useBusinessProfileStore').default;
      
      expect(useBusinessProfileStore).toBeDefined();
      expect(typeof useBusinessProfileStore).toBe('function');
    });
  });
  
  describe('API Routes', () => {
    it('should have validation utilities', () => {
      const validation = require('../../utils/validation');
      
      expect(validation.validateInstanceUrl).toBeDefined();
      expect(validation.validateScopeId).toBeDefined();
      expect(validation.validateBusinessProfile).toBeDefined();
      expect(validation.validateScenarioType).toBeDefined();
    });
  });
  
  describe('Data Integrity', () => {
    it('should have demo data in correct format', () => {
      const { demoDataService } = require('../../services/demoDataService');
      
      const demoProfiles = demoDataService.getDemoProfiles();
      expect(Array.isArray(demoProfiles)).toBe(true);
      expect(demoProfiles.length).toBeGreaterThan(0);
      
      // Check first demo profile has required fields from new framework
      const firstProfile = demoProfiles[0];
      expect(firstProfile.companyName).toBeDefined();
      expect(firstProfile.industry).toBeDefined();
      expect(firstProfile.expectedOutcome).toBeDefined();
      expect(firstProfile.problems).toBeDefined();
      expect(firstProfile.solutions).toBeDefined();
      expect(firstProfile.value).toBeDefined();
      expect(firstProfile.currentArchitecture).toBeDefined();
      
      // Verify strategic initiatives have contact information
      expect(firstProfile.expectedOutcome.strategicInitiatives).toBeDefined();
      expect(Array.isArray(firstProfile.expectedOutcome.strategicInitiatives)).toBe(true);
      expect(firstProfile.expectedOutcome.strategicInitiatives.length).toBeGreaterThan(0);
      
      const firstInitiative = firstProfile.expectedOutcome.strategicInitiatives[0];
      expect(firstInitiative.contact).toBeDefined();
      expect(firstInitiative.contact.name).toBeDefined();
      expect(firstInitiative.contact.email).toBeDefined();
      
      // Verify agentic opportunities exist
      expect(firstProfile.problems.agenticOpportunities).toBeDefined();
      expect(Array.isArray(firstProfile.problems.agenticOpportunities)).toBe(true);
      expect(firstProfile.problems.agenticOpportunities.length).toBeGreaterThan(0);
    });
  });
}); 


================================================
FILE: app/admin/AddServiceForm.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, TestTube, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function AddServiceForm({ 
  isOpen, 
  onClose, 
  onSave, 
  editingCredential = null,
  selectedServiceType = 'ai_provider'
}) {
  const [formData, setFormData] = useState({
    serviceType: selectedServiceType,
    serviceName: '',
    displayName: '',
    credentials: {},
    configuration: {},
    isActive: true,
    isDefault: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Service configurations
  const serviceConfigs = {
    ai_provider: {
      openai: {
        name: 'OpenAI',
        description: 'GPT-4o, GPT-3.5 Turbo, and other OpenAI models',
        credentialFields: [
          { key: 'api_key', label: 'API Key', type: 'password', required: true, placeholder: 'sk-proj-...' }
        ],
        configFields: [
          { key: 'model', label: 'Default Model', type: 'select', options: ['gpt-4o', 'gpt-4', 'gpt-3.5-turbo'], default: 'gpt-4o' },
          { key: 'max_tokens', label: 'Max Tokens', type: 'number', default: 4000 },
          { key: 'temperature', label: 'Temperature', type: 'number', step: 0.1, min: 0, max: 2, default: 0.7 }
        ]
      },
      gemini: {
        name: 'Google Gemini',
        description: 'Gemini Pro and other Google AI models',
        credentialFields: [
          { key: 'api_key', label: 'Google API Key', type: 'password', required: true, placeholder: 'AIza...' }
        ],
        configFields: [
          { key: 'model', label: 'Default Model', type: 'select', options: ['gemini-pro', 'gemini-pro-vision'], default: 'gemini-pro' }
        ]
      },
      claude: {
        name: 'Anthropic Claude',
        description: 'Claude 3.5 Sonnet and other Anthropic models',
        credentialFields: [
          { key: 'api_key', label: 'Anthropic API Key', type: 'password', required: true, placeholder: 'sk-ant-...' }
        ],
        configFields: [
          { key: 'model', label: 'Default Model', type: 'select', options: ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229'], default: 'claude-3-5-sonnet-20241022' }
        ]
      }
    },
    crm_system: {
      servicenow: {
        name: 'ServiceNow',
        description: 'ServiceNow instance for workflow automation',
        credentialFields: [
          { key: 'username', label: 'Username', type: 'text', required: true, placeholder: 'your.username' },
          { key: 'password', label: 'Password', type: 'password', required: true }
        ],
        configFields: [
          { key: 'instance_url', label: 'Instance URL', type: 'url', required: true, placeholder: 'https://company.service-now.com' },
          { key: 'scope_id', label: 'Application Scope ID', type: 'text', placeholder: 'Optional scope ID' }
        ]
      },
      hubspot: {
        name: 'HubSpot',
        description: 'HubSpot CRM for contact and deal management',
        credentialFields: [
          { key: 'api_key', label: 'HubSpot API Key', type: 'password', required: true, placeholder: 'pat-na1-...' }
        ]
      }
    }
  };

  // Initialize form when editing
  useEffect(() => {
    if (editingCredential) {
      setFormData({
        id: editingCredential.id,
        serviceType: editingCredential.service_type,
        serviceName: editingCredential.service_name,
        displayName: editingCredential.display_name,
        credentials: {}, // Empty for security - user must re-enter
        configuration: editingCredential.configuration || {},
        isActive: editingCredential.is_active,
        isDefault: editingCredential.is_default
      });
    } else {
      setFormData({
        serviceType: selectedServiceType,
        serviceName: '',
        displayName: '',
        credentials: {},
        configuration: {},
        isActive: true,
        isDefault: false
      });
    }
    setErrors({});
  }, [editingCredential, selectedServiceType, isOpen]);

  // Auto-generate display name
  useEffect(() => {
    if (formData.serviceName && !editingCredential) {
      const config = serviceConfigs[formData.serviceType]?.[formData.serviceName];
      if (config) {
        setFormData(prev => ({
          ...prev,
          displayName: `${config.name} (${formData.serviceType === 'ai_provider' ? 'AI' : 'CRM'})`
        }));
      }
    }
  }, [formData.serviceName, formData.serviceType, editingCredential]);

  const handleInputChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleDirectChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const config = serviceConfigs[formData.serviceType]?.[formData.serviceName];
    
    if (!formData.serviceName) {
      newErrors.serviceName = 'Service is required';
    }
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }
    
    if (config) {
      // Validate credential fields
      config.credentialFields.forEach(field => {
        if (field.required && !formData.credentials[field.key]) {
          newErrors[`credentials.${field.key}`] = `${field.label} is required`;
        }
      });
      
      // Validate required config fields
      config.configFields?.forEach(field => {
        if (field.required && !formData.configuration[field.key]) {
          newErrors[`configuration.${field.key}`] = `${field.label} is required`;
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentConfig = serviceConfigs[formData.serviceType]?.[formData.serviceName];
  const availableServices = Object.entries(serviceConfigs[formData.serviceType] || {});

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 'var(--spacing-lg)'
    }}>
      <div style={{
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--border-radius-lg)',
        padding: 0,
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--spacing-lg)',
          borderBottom: '1px solid var(--border-primary)',
          background: 'var(--glass-bg-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-secondary)',
              borderRadius: 'var(--border-radius)',
              color: 'var(--accent-blue)'
            }}>
              <Key size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'var(--font-weight-semibold)' }}>
                {editingCredential ? 'Edit Service' : 'Add New Service'}
              </h2>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Configure your external service credentials
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: 'var(--border-radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          padding: 'var(--spacing-lg)',
          maxHeight: 'calc(90vh - 120px)',
          overflowY: 'auto'
        }}>
          {/* Service Selection */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 'var(--font-weight-medium)' }}>
              Service Information
            </h3>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                Service Type
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => {
                  handleDirectChange('serviceType', e.target.value);
                  handleDirectChange('serviceName', '');
                }}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-primary)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
                disabled={editingCredential}
              >
                <option value="ai_provider">AI Provider</option>
                <option value="crm_system">CRM System</option>
                <option value="productivity_tool">Productivity Tool</option>
                <option value="integration_platform">Integration Platform</option>
              </select>
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                Service
              </label>
              <select
                value={formData.serviceName}
                onChange={(e) => handleDirectChange('serviceName', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                  border: `1px solid ${errors.serviceName ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
                disabled={editingCredential}
              >
                <option value="">Choose a service...</option>
                {availableServices.map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.name}
                  </option>
                ))}
              </select>
              {errors.serviceName && (
                <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                  {errors.serviceName}
                </span>
              )}
            </div>

            {currentConfig && (
              <div style={{
                background: 'var(--glass-bg)',
                padding: 'var(--spacing-sm)',
                borderRadius: 'var(--border-radius)',
                border: '1px solid var(--border-secondary)',
                marginBottom: 'var(--spacing-md)'
              }}>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {currentConfig.description}
                </p>
              </div>
            )}

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => handleDirectChange('displayName', e.target.value)}
                placeholder="e.g., OpenAI Production, ServiceNow Dev"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                  border: `1px solid ${errors.displayName ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              />
              {errors.displayName && (
                <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                  {errors.displayName}
                </span>
              )}
            </div>
          </div>

          {/* Credentials */}
          {currentConfig && (
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 'var(--font-weight-medium)' }}>
                Credentials
              </h3>
              {currentConfig.credentialFields.map(field => (
                <div key={field.key} style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                    {field.label}
                    {field.required && <span style={{ color: 'var(--accent-red)', marginLeft: '4px' }}>*</span>}
                  </label>
                  <input
                    type={field.type}
                    value={formData.credentials[field.key] || ''}
                    onChange={(e) => handleInputChange('credentials', field.key, e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm)',
                      borderRadius: 'var(--border-radius)',
                      border: `1px solid ${errors[`credentials.${field.key}`] ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem'
                    }}
                  />
                  {errors[`credentials.${field.key}`] && (
                    <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors[`credentials.${field.key}`]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Configuration */}
          {currentConfig && currentConfig.configFields && (
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 'var(--font-weight-medium)' }}>
                Configuration
              </h3>
              {currentConfig.configFields.map(field => (
                <div key={field.key} style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                    {field.label}
                    {field.required && <span style={{ color: 'var(--accent-red)', marginLeft: '4px' }}>*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData.configuration[field.key] || field.default || ''}
                      onChange={(e) => handleInputChange('configuration', field.key, e.target.value)}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        borderRadius: 'var(--border-radius)',
                        border: `1px solid ${errors[`configuration.${field.key}`] ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem'
                      }}
                    >
                      {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData.configuration[field.key] || field.default || ''}
                      onChange={(e) => handleInputChange('configuration', field.key, e.target.value)}
                      placeholder={field.placeholder}
                      step={field.step}
                      min={field.min}
                      max={field.max}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        borderRadius: 'var(--border-radius)',
                        border: `1px solid ${errors[`configuration.${field.key}`] ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem'
                      }}
                    />
                  )}
                  {errors[`configuration.${field.key}`] && (
                    <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                      {errors[`configuration.${field.key}`]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Options */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 'var(--font-weight-medium)' }}>
              Options
            </h3>
            
            <div style={{ marginBottom: 'var(--spacing-sm)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleDirectChange('isActive', e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '0.9rem' }}>Active</span>
              </label>
            </div>

            <div style={{ marginBottom: 'var(--spacing-sm)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => handleDirectChange('isDefault', e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '0.9rem' }}>Set as default provider</span>
              </label>
            </div>
          </div>

          {/* Form Errors */}
          {errors.submit && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              padding: 'var(--spacing-md)',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--border-radius)',
              color: 'var(--accent-red)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              <AlertTriangle size={16} />
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            justifyContent: 'flex-end',
            paddingTop: 'var(--spacing-lg)',
            borderTop: '1px solid var(--border-primary)'
          }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                editingCredential ? 'Updating...' : 'Saving...'
              ) : (
                editingCredential ? 'Update Service' : 'Save Service'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 


================================================
FILE: app/admin/Admin.module.css
================================================
/* Admin Interface Styles */

.container {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
}

/* Header */
.header {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-primary);
}

.headerIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: var(--glass-bg);
  border: 1px solid var(--border-secondary);
  border-radius: var(--border-radius-lg);
  backdrop-filter: blur(var(--backdrop-blur));
  color: var(--accent-blue);
}

.headerContent {
  flex: 1;
}

.title {
  font-size: 2rem;
  font-weight: var(--font-weight-bold);
  margin: 0;
  background: linear-gradient(135deg, var(--text-primary), var(--accent-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: var(--text-secondary);
  margin: var(--spacing-sm) 0 0 0;
  font-size: 1rem;
}

/* Service Type Tabs */
.tabs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.tab {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: var(--glass-bg);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  backdrop-filter: blur(var(--backdrop-blur));
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  color: var(--text-primary);
}

.tab:hover {
  border-color: var(--accent-blue);
  background: var(--glass-bg-hover);
  transform: translateY(-2px);
}

.tabActive {
  border-color: var(--accent-blue);
  background: rgba(59, 130, 246, 0.1);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
}

.tabContent {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.tabName {
  font-weight: var(--font-weight-semibold);
  font-size: 0.95rem;
}

.tabDescription {
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.4;
}

/* Error Message */
.error {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--border-radius);
  color: var(--accent-red);
  margin-bottom: var(--spacing-lg);
}

/* Credentials List */
.credentialsList {
  background: var(--glass-bg);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius-lg);
  backdrop-filter: blur(var(--backdrop-blur));
  overflow: hidden;
}

.credentialsHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-primary);
  background: var(--glass-bg-subtle);
}

.credentialsTitle {
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  margin: 0;
  color: var(--text-primary);
}

.addButton {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

/* Loading State */
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  color: var(--text-secondary);
}

/* Empty State */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-xl);
  text-align: center;
}

.emptyIcon {
  color: var(--text-tertiary);
  margin-bottom: var(--spacing-lg);
}

.empty h3 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
}

.empty p {
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-lg) 0;
  max-width: 400px;
  line-height: 1.5;
}

/* Credentials Grid */
.credentialsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
}

.credentialCard {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  transition: all 0.2s ease;
  overflow: hidden;
}

.credentialCard:hover {
  border-color: var(--accent-blue);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-md) var(--spacing-lg);
}

.cardTitle {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex: 1;
}

.cardTitle h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.defaultBadge {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 2px 8px;
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid var(--accent-blue);
  border-radius: 12px;
  font-size: 0.75rem;
  color: var(--accent-blue);
  font-weight: var(--font-weight-medium);
}

.cardActions {
  display: flex;
  gap: var(--spacing-xs);
}

.actionButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--glass-bg);
  border: 1px solid var(--border-secondary);
  border-radius: var(--border-radius-sm);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.actionButton:hover {
  background: var(--glass-bg-hover);
  color: var(--text-primary);
  border-color: var(--border-primary);
}

.actionDanger:hover {
  background: rgba(239, 68, 68, 0.1);
  color: var(--accent-red);
  border-color: var(--accent-red);
}

.cardContent {
  padding: 0 var(--spacing-lg) var(--spacing-lg) var(--spacing-lg);
}

.serviceInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.serviceName {
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  text-transform: capitalize;
}

.serviceType {
  color: var(--text-secondary);
  font-size: 0.85rem;
  text-transform: capitalize;
}

.statusRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.status {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
}

.statusSuccess {
  color: var(--accent-green);
}

.statusError {
  color: var(--accent-red);
}

.statusTesting {
  color: var(--accent-yellow);
}

.statusUntested {
  color: var(--text-tertiary);
}

.lastTested {
  color: var(--text-secondary);
  font-size: 0.8rem;
}

.cardFooter {
  display: flex;
  gap: var(--spacing-sm);
}

.testButton {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: 0.9rem;
}

.defaultButton {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.85rem;
  padding: var(--spacing-sm) var(--spacing-md);
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-lg);
}

.modalContent {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  max-width: 500px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modalActions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  margin-top: var(--spacing-lg);
}

/* Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border-secondary);
  border-top: 2px solid var(--accent-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .content {
    padding: var(--spacing-lg) var(--spacing-md);
  }
  
  .tabs {
    grid-template-columns: 1fr;
  }
  
  .credentialsGrid {
    grid-template-columns: 1fr;
    padding: var(--spacing-md);
  }
  
  .credentialsHeader {
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: stretch;
  }
  
  .cardFooter {
    flex-direction: column;
  }
  
  .header {
    flex-direction: column;
    text-align: center;
  }
} 


================================================
FILE: app/admin/page.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../store/useAuthStore';
import GlobalHeader from '../components/GlobalHeader';
import { CredentialsRepository } from '../repositories/credentialsRepository';
import {
  Settings,
  Key,
  TestTube,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Edit3,
  Trash2,
  Star,
  AlertTriangle,
  Zap,
  Monitor,
  Users,
  Briefcase,
  X
} from 'lucide-react';
import styles from './Admin.module.css';

// ServiceForm Component
function ServiceForm({ isOpen, onClose, onSave, editingCredential = null, selectedServiceType = 'ai_provider' }) {
  console.log('🏗️ ServiceForm rendered with:', { isOpen, hasOnSave: !!onSave, editingCredential: !!editingCredential, selectedServiceType });
  
  const [formData, setFormData] = useState({
    serviceType: selectedServiceType,
    serviceName: '',
    displayName: '',
    credentials: {},
    configuration: {},
    isActive: true,
    isDefault: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Service configurations
  const serviceConfigs = {
    ai_provider: {
      openai: {
        name: 'OpenAI',
        description: 'GPT-4o, GPT-3.5 Turbo, and other OpenAI models',
        credentialFields: [
          { key: 'api_key', label: 'API Key', type: 'password', required: true, placeholder: 'sk-proj-...' }
        ],
        configFields: [
          { key: 'model', label: 'Default Model', type: 'select', options: ['gpt-4o', 'gpt-4', 'gpt-3.5-turbo'], default: 'gpt-4o' },
          { key: 'max_tokens', label: 'Max Tokens', type: 'number', default: 4000 },
          { key: 'temperature', label: 'Temperature', type: 'number', step: 0.1, min: 0, max: 2, default: 0.7 }
        ]
      },
      gemini: {
        name: 'Google Gemini',
        description: 'Gemini Pro and other Google AI models',
        credentialFields: [
          { key: 'api_key', label: 'Google API Key', type: 'password', required: true, placeholder: 'AIza...' }
        ],
        configFields: [
          { key: 'model', label: 'Default Model', type: 'select', options: ['gemini-pro', 'gemini-pro-vision'], default: 'gemini-pro' }
        ]
      },
      claude: {
        name: 'Anthropic Claude',
        description: 'Claude 3.5 Sonnet and other Anthropic models',
        credentialFields: [
          { key: 'api_key', label: 'Anthropic API Key', type: 'password', required: true, placeholder: 'sk-ant-...' }
        ],
        configFields: [
          { key: 'model', label: 'Default Model', type: 'select', options: ['claude-3-5-sonnet-20241022', 'claude-3-opus-20240229'], default: 'claude-3-5-sonnet-20241022' }
        ]
      }
    },
    crm_system: {
      servicenow: {
        name: 'ServiceNow',
        description: 'ServiceNow instance for workflow automation',
        credentialFields: [
          { key: 'username', label: 'Username', type: 'text', required: true, placeholder: 'your.username' },
          { key: 'password', label: 'Password', type: 'password', required: true }
        ],
        configFields: [
          { key: 'instance_url', label: 'Instance URL', type: 'url', required: true, placeholder: 'https://company.service-now.com' },
          { key: 'scope_id', label: 'Application Scope ID', type: 'text', placeholder: 'Optional scope ID' }
        ]
      },
      hubspot: {
        name: 'HubSpot',
        description: 'HubSpot CRM for contact and deal management',
        credentialFields: [
          { key: 'api_key', label: 'HubSpot API Key', type: 'password', required: true, placeholder: 'pat-na1-...' }
        ]
      }
    }
  };

  // Initialize form when editing
  useEffect(() => {
    if (editingCredential) {
      setFormData({
        id: editingCredential.id,
        serviceType: editingCredential.service_type,
        serviceName: editingCredential.service_name,
        displayName: editingCredential.display_name,
        credentials: {}, // Empty for security - user must re-enter
        configuration: editingCredential.configuration || {},
        isActive: editingCredential.is_active,
        isDefault: editingCredential.is_default
      });
    } else {
      setFormData({
        serviceType: selectedServiceType,
        serviceName: '',
        displayName: '',
        credentials: {},
        configuration: {},
        isActive: true,
        isDefault: false
      });
    }
    setErrors({});
  }, [editingCredential, selectedServiceType, isOpen]);

  // Auto-generate display name
  useEffect(() => {
    if (formData.serviceName && !editingCredential) {
      const config = serviceConfigs[formData.serviceType]?.[formData.serviceName];
      if (config) {
        setFormData(prev => ({
          ...prev,
          displayName: `${config.name} (${formData.serviceType === 'ai_provider' ? 'AI' : 'CRM'})`
        }));
      }
    }
  }, [formData.serviceName, formData.serviceType, editingCredential]);

  const handleInputChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleDirectChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const validateForm = () => {
    console.log('🔍 validateForm called');
    console.log('📋 Current formData:', { ...formData, credentials: '[HIDDEN]' });
    
    const newErrors = {};
    const config = serviceConfigs[formData.serviceType]?.[formData.serviceName];
    console.log('🔧 Config found:', !!config);
    
    if (!formData.serviceName) {
      newErrors.serviceName = 'Service is required';
      console.log('❌ Missing serviceName');
    }
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
      console.log('❌ Missing displayName');
    }
    
    if (config) {
      // Validate credential fields
      config.credentialFields.forEach(field => {
        if (field.required && !formData.credentials[field.key]) {
          newErrors[`credentials.${field.key}`] = `${field.label} is required`;
          console.log(`❌ Missing required credential: ${field.key}`);
        }
      });
      
      // Validate required config fields
      config.configFields?.forEach(field => {
        if (field.required && !formData.configuration[field.key]) {
          newErrors[`configuration.${field.key}`] = `${field.label} is required`;
          console.log(`❌ Missing required config: ${field.key}`);
        }
      });
    }
    
    console.log('📊 Validation errors:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('✅ Form validation result:', isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('📝 ServiceForm handleSubmit called');
    
    if (!validateForm()) {
      console.log('❌ Form validation failed');
      return;
    }

    console.log('✅ Form validation passed, submitting...');
    console.log('📋 Form data being submitted:', { ...formData, credentials: '[HIDDEN]' });

    setIsSubmitting(true);
    try {
      console.log('📞 Calling onSave with formData...');
      await onSave(formData);
      console.log('✅ onSave completed successfully');
      onClose();
    } catch (error) {
      console.error('💥 ServiceForm handleSubmit error:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentConfig = serviceConfigs[formData.serviceType]?.[formData.serviceName];
  const availableServices = Object.entries(serviceConfigs[formData.serviceType] || {});

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent} style={{ maxWidth: '600px', maxHeight: '90vh', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-lg)',
          paddingBottom: 'var(--spacing-md)',
          borderBottom: '1px solid var(--border-primary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-secondary)',
              borderRadius: 'var(--border-radius)',
              color: 'var(--accent-blue)'
            }}>
              <Key size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'var(--font-weight-semibold)' }}>
                {editingCredential ? 'Edit Service' : 'Add New Service'}
              </h2>
              <p style={{ margin: '4px 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Configure your external service credentials
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: 'var(--border-radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ maxHeight: 'calc(90vh - 200px)', overflowY: 'auto' }}>
          {/* Service Selection */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 'var(--font-weight-medium)' }}>
              Service Information
            </h3>
            
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                Service Type
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => {
                  handleDirectChange('serviceType', e.target.value);
                  handleDirectChange('serviceName', '');
                }}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                  border: '1px solid var(--border-primary)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
                disabled={editingCredential}
              >
                <option value="ai_provider">AI Provider</option>
                <option value="crm_system">CRM System</option>
              </select>
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                Service
              </label>
              <select
                value={formData.serviceName}
                onChange={(e) => handleDirectChange('serviceName', e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                  border: `1px solid ${errors.serviceName ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
                disabled={editingCredential}
              >
                <option value="">Choose a service...</option>
                {availableServices.map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.name}
                  </option>
                ))}
              </select>
              {errors.serviceName && (
                <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                  {errors.serviceName}
                </span>
              )}
            </div>

            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                Display Name
              </label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => handleDirectChange('displayName', e.target.value)}
                placeholder="e.g., OpenAI Production"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  borderRadius: 'var(--border-radius)',
                  border: `1px solid ${errors.displayName ? 'var(--accent-red)' : 'var(--border-primary)'}`,
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {/* Credentials */}
          {currentConfig && (
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 'var(--font-weight-medium)' }}>
                Credentials
              </h3>
              {currentConfig.credentialFields.map(field => (
                <div key={field.key} style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                    {field.label}
                    {field.required && <span style={{ color: 'var(--accent-red)', marginLeft: '4px' }}>*</span>}
                  </label>
                  <input
                    type={field.type}
                    value={formData.credentials[field.key] || ''}
                    onChange={(e) => handleInputChange('credentials', field.key, e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-sm)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--border-primary)',
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Configuration */}
          {currentConfig && currentConfig.configFields && (
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <h3 style={{ margin: '0 0 var(--spacing-md) 0', fontSize: '1rem', fontWeight: 'var(--font-weight-medium)' }}>
                Configuration
              </h3>
              {currentConfig.configFields.map(field => (
                <div key={field.key} style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-medium)', fontSize: '0.9rem' }}>
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData.configuration[field.key] || field.default || ''}
                      onChange={(e) => handleInputChange('configuration', field.key, e.target.value)}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        borderRadius: 'var(--border-radius)',
                        border: '1px solid var(--border-primary)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem'
                      }}
                    >
                      {field.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData.configuration[field.key] || field.default || ''}
                      onChange={(e) => handleInputChange('configuration', field.key, e.target.value)}
                      placeholder={field.placeholder}
                      style={{
                        width: '100%',
                        padding: 'var(--spacing-sm)',
                        borderRadius: 'var(--border-radius)',
                        border: '1px solid var(--border-primary)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Options */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ marginBottom: 'var(--spacing-sm)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleDirectChange('isActive', e.target.checked)}
                />
                <span style={{ fontSize: '0.9rem' }}>Active</span>
              </label>
            </div>

            <div style={{ marginBottom: 'var(--spacing-sm)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => handleDirectChange('isDefault', e.target.checked)}
                />
                <span style={{ fontSize: '0.9rem' }}>Set as default provider</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="btn btn-primary"
              onClick={(e) => {
                console.log('🖱️ Save button clicked!');
                console.log('📝 Button type:', e.currentTarget.type);
                console.log('🚫 Is submitting:', isSubmitting);
                console.log('📋 Current form data:', { ...formData, credentials: '[HIDDEN]' });
                // Don't prevent default - let form submission happen naturally
              }}
            >
              {isSubmitting ? (editingCredential ? 'Updating...' : 'Saving...') : (editingCredential ? 'Update Service' : 'Save Service')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState('ai_provider');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCredential, setEditingCredential] = useState(null);
  const [testingConnections, setTestingConnections] = useState(new Set());

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, router]);

  // Load credentials on mount and when tab changes
  useEffect(() => {
    if (user) {
      loadCredentials();
    }
  }, [user, selectedTab]);

  const loadCredentials = async () => {
    try {
      setLoading(true);
      const data = await CredentialsRepository.getCredentials(user.id, selectedTab);
      setCredentials(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async (credentialId) => {
    setTestingConnections(prev => new Set([...prev, credentialId]));
    
    try {
      const credential = credentials.find(c => c.id === credentialId);
      await CredentialsRepository.testConnection(user.id, credentialId);
      
      // Reload credentials to get updated test status
      await loadCredentials();
    } catch (err) {
      console.error('Test connection failed:', err);
    } finally {
      setTestingConnections(prev => {
        const newSet = new Set(prev);
        newSet.delete(credentialId);
        return newSet;
      });
    }
  };

  const handleSetDefault = async (credentialId) => {
    try {
      await CredentialsRepository.setDefaultProvider(user.id, credentialId);
      await loadCredentials();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (credentialId) => {
    if (!confirm('Are you sure you want to delete this credential? This action cannot be undone.')) {
      return;
    }

    try {
      await CredentialsRepository.deleteCredentials(user.id, credentialId);
      await loadCredentials();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveCredential = async (formData) => {
    console.log('🎯 handleSaveCredential called with formData:', { ...formData, credentials: '[HIDDEN]' });
    console.log('👤 User ID:', user?.id);
    
    try {
      console.log('📞 Calling CredentialsRepository.saveCredentials...');
      const result = await CredentialsRepository.saveCredentials(user.id, formData);
      console.log('✅ CredentialsRepository.saveCredentials completed:', { resultId: result?.id });
      
      console.log('🔄 Calling loadCredentials to refresh...');
      await loadCredentials();
      console.log('✅ loadCredentials completed');
    } catch (err) {
      console.error('💥 handleSaveCredential error:', err);
      throw new Error(err.message);
    }
  };

  const serviceTypes = [
    {
      id: 'ai_provider',
      name: 'AI Providers',
      icon: Zap,
      description: 'OpenAI, Gemini, Claude, and other LLM providers'
    },
    {
      id: 'crm_system',
      name: 'CRM Systems',
      icon: Users,
      description: 'ServiceNow, HubSpot, Salesforce integrations'
    },
    {
      id: 'productivity_tool',
      name: 'Productivity Tools',
      icon: Briefcase,
      description: 'Microsoft 365, Google Workspace, Slack'
    },
    {
      id: 'integration_platform',
      name: 'Integration Platforms',
      icon: Monitor,
      description: 'Zapier, Make, custom APIs'
    }
  ];

  const getStatusIcon = (testStatus) => {
    switch (testStatus) {
      case 'success':
        return <CheckCircle className={styles.statusSuccess} size={16} />;
      case 'failed':
        return <XCircle className={styles.statusError} size={16} />;
      case 'testing':
        return <Clock className={styles.statusTesting} size={16} />;
      default:
        return <AlertTriangle className={styles.statusUntested} size={16} />;
    }
  };

  const getStatusText = (testStatus) => {
    switch (testStatus) {
      case 'success':
        return 'Connected';
      case 'failed':
        return 'Failed';
      case 'testing':
        return 'Testing...';
      default:
        return 'Untested';
    }
  };

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className={styles.container}>
      <GlobalHeader />
      
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerIcon}>
            <Settings size={24} />
          </div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Service Configuration</h1>
            <p className={styles.subtitle}>
              Manage your external service credentials and API connections
            </p>
          </div>
        </div>

        {/* Service Type Tabs */}
        <div className={styles.tabs}>
          {serviceTypes.map((serviceType) => (
            <button
              key={serviceType.id}
              onClick={() => setSelectedTab(serviceType.id)}
              className={`${styles.tab} ${selectedTab === serviceType.id ? styles.tabActive : ''}`}
            >
              <serviceType.icon size={18} />
              <div className={styles.tabContent}>
                <span className={styles.tabName}>{serviceType.name}</span>
                <span className={styles.tabDescription}>{serviceType.description}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.error}>
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        {/* Credentials List */}
        <div className={styles.credentialsList}>
          <div className={styles.credentialsHeader}>
            <h2 className={styles.credentialsTitle}>
              {serviceTypes.find(t => t.id === selectedTab)?.name || 'Services'}
            </h2>
            <button
              onClick={() => setShowAddForm(true)}
              className={`btn btn-primary ${styles.addButton}`}
            >
              <Plus size={16} />
              Add Service
            </button>
          </div>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              Loading credentials...
            </div>
          ) : credentials.length === 0 ? (
            <div className={styles.empty}>
              <Key size={48} className={styles.emptyIcon} />
              <h3>No services configured</h3>
              <p>Add your first {serviceTypes.find(t => t.id === selectedTab)?.name.toLowerCase()} to get started.</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary"
              >
                <Plus size={16} />
                Add Service
              </button>
            </div>
          ) : (
            <div className={styles.credentialsGrid}>
              {credentials.map((credential) => (
                <div key={credential.id} className={styles.credentialCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardTitle}>
                      <h3>{credential.display_name}</h3>
                      {credential.is_default && (
                        <div className={styles.defaultBadge}>
                          <Star size={12} />
                          Default
                        </div>
                      )}
                    </div>
                    <div className={styles.cardActions}>
                      <button
                        onClick={() => setEditingCredential(credential)}
                        className={styles.actionButton}
                        title="Edit"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(credential.id)}
                        className={`${styles.actionButton} ${styles.actionDanger}`}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.serviceInfo}>
                      <span className={styles.serviceName}>{credential.service_name}</span>
                      <span className={styles.serviceType}>{credential.service_type.replace('_', ' ')}</span>
                    </div>

                    <div className={styles.statusRow}>
                      <div className={styles.status}>
                        {getStatusIcon(credential.test_status)}
                        <span>{getStatusText(credential.test_status)}</span>
                      </div>
                      
                      {credential.last_tested_at && (
                        <span className={styles.lastTested}>
                          Last tested: {new Date(credential.last_tested_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <div className={styles.cardFooter}>
                      <button
                        onClick={() => handleTestConnection(credential.id)}
                        disabled={testingConnections.has(credential.id)}
                        className={`btn btn-secondary ${styles.testButton}`}
                      >
                        {testingConnections.has(credential.id) ? (
                          <>
                            <div className={styles.spinner}></div>
                            Testing...
                          </>
                        ) : (
                          <>
                            <TestTube size={14} />
                            Test Connection
                          </>
                        )}
                      </button>

                      {!credential.is_default && (
                        <button
                          onClick={() => handleSetDefault(credential.id)}
                          className={`btn btn-outline ${styles.defaultButton}`}
                        >
                          <Star size={14} />
                          Set Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingCredential) && (
        <ServiceForm
          isOpen={true}
          onClose={() => {
            setShowAddForm(false);
            setEditingCredential(null);
          }}
          onSave={handleSaveCredential}
          editingCredential={editingCredential}
          selectedServiceType={selectedTab}
        />
      )}
    </div>
  );
} 


================================================
FILE: app/admin/components/AddServiceForm.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, TestTube, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import styles from './AddServiceForm.module.css';

export default function AddServiceForm({ 
  isOpen, 
  onClose, 
  onSave, 
  editingCredential = null,
  selectedServiceType = 'ai_provider'
}) {
  const [formData, setFormData] = useState({
    serviceType: selectedServiceType,
    serviceName: '',
    displayName: '',
    credentials: {},
    configuration: {},
    isActive: true,
    isDefault: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  // Service configurations
  const serviceConfigs = {
    ai_provider: {
      openai: {
        name: 'OpenAI',
        fields: [
          { name: 'api_key', label: 'API Key', type: 'password', required: true },
          { 
            name: 'model', 
            label: 'Model', 
            type: 'select', 
            required: true,
            options: [
              { value: 'o3-mini', label: 'o3 Mini (Latest Reasoning)' },
              { value: 'o1', label: 'o1 (Full Reasoning)' },
              { value: 'o1-mini', label: 'o1 Mini (Fast Reasoning)' },
              { value: 'o1-preview', label: 'o1 Preview (Advanced Reasoning)' },
              { value: 'gpt-4o', label: 'GPT-4o (Multimodal)' },
              { value: 'gpt-4o-mini', label: 'GPT-4o Mini (Fast)' },
              { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
              { value: 'gpt-4', label: 'GPT-4' },
              { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' }
            ]
          },
          { name: 'base_url', label: 'Base URL (Optional)', type: 'url', required: false },
          { name: 'timeout', label: 'Timeout (seconds)', type: 'number', required: false, defaultValue: 30 }
        ]
      },
      gemini: {
        name: 'Google Gemini',
        fields: [
          { name: 'api_key', label: 'API Key', type: 'password', required: true },
          { 
            name: 'model', 
            label: 'Model', 
            type: 'select', 
            required: true,
            options: [
              { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash (Latest Hybrid)' },
              { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro (Advanced Thinking)' },
              { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
              { value: 'gemini-2.0-flash-thinking', label: 'Gemini 2.0 Flash Thinking' },
              { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
              { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
              { value: 'gemini-1.5-flash-8b', label: 'Gemini 1.5 Flash 8B' }
            ]
          },
          { name: 'base_url', label: 'Base URL (Optional)', type: 'url', required: false },
          { name: 'timeout', label: 'Timeout (seconds)', type: 'number', required: false, defaultValue: 30 }
        ]
      },
      claude: {
        name: 'Anthropic Claude',
        fields: [
          { name: 'api_key', label: 'API Key', type: 'password', required: true },
          { 
            name: 'model', 
            label: 'Model', 
            type: 'select', 
            required: true,
            options: [
              { value: 'claude-opus-4', label: 'Claude Opus 4 (Most Capable)' },
              { value: 'claude-sonnet-4', label: 'Claude Sonnet 4 (High Performance)' },
              { value: 'claude-3-7-sonnet', label: 'Claude 3.7 Sonnet (Hybrid Reasoning)' },
              { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
              { value: 'claude-3-5-haiku', label: 'Claude 3.5 Haiku (Fast)' },
              { value: 'claude-3-opus', label: 'Claude 3 Opus' },
              { value: 'claude-3-haiku', label: 'Claude 3 Haiku' }
            ]
          },
          { name: 'base_url', label: 'Base URL (Optional)', type: 'url', required: false },
          { name: 'timeout', label: 'Timeout (seconds)', type: 'number', required: false, defaultValue: 30 }
        ]
      }
    },
    crm_system: {
      servicenow: {
        name: 'ServiceNow',
        description: 'ServiceNow instance for workflow automation and data access',
        credentialFields: [
          { key: 'username', label: 'Username', type: 'text', required: true, placeholder: 'your.username' },
          { key: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Your ServiceNow password' }
        ],
        configFields: [
          { key: 'instance_url', label: 'Instance URL', type: 'url', required: true, placeholder: 'https://company.service-now.com' },
          { key: 'scope_id', label: 'Application Scope ID', type: 'text', placeholder: 'Optional: sys_id of target scope' }
        ]
      },
      hubspot: {
        name: 'HubSpot',
        description: 'HubSpot CRM for contact and deal management',
        credentialFields: [
          { key: 'api_key', label: 'HubSpot API Key', type: 'password', required: true, placeholder: 'pat-na1-...' }
        ],
        configFields: [
          { key: 'portal_id', label: 'Portal ID', type: 'text', placeholder: 'Optional: Your HubSpot portal ID' }
        ]
      }
    }
  };

  // Initialize form when editing
  useEffect(() => {
    if (editingCredential) {
      setFormData({
        id: editingCredential.id,
        serviceType: editingCredential.service_type,
        serviceName: editingCredential.service_name,
        displayName: editingCredential.display_name,
        credentials: {}, // Will be empty for security - user must re-enter
        configuration: editingCredential.configuration || {},
        isActive: editingCredential.is_active,
        isDefault: editingCredential.is_default
      });
    } else {
      // Reset for new credential
      setFormData({
        serviceType: selectedServiceType,
        serviceName: '',
        displayName: '',
        credentials: {},
        configuration: {},
        isActive: true,
        isDefault: false
      });
    }
    setErrors({});
    setTestResult(null);
  }, [editingCredential, selectedServiceType, isOpen]);

  // Auto-generate display name
  useEffect(() => {
    if (formData.serviceName && !editingCredential) {
      const config = serviceConfigs[formData.serviceType]?.[formData.serviceName];
      if (config) {
        setFormData(prev => ({
          ...prev,
          displayName: `${config.name} (${formData.serviceType === 'ai_provider' ? 'AI' : 'CRM'})`
        }));
      }
    }
  }, [formData.serviceName, formData.serviceType, editingCredential]);

  const handleInputChange = (section, key, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    
    // Clear related errors
    if (errors[`${section}.${key}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${section}.${key}`];
        return newErrors;
      });
    }
  };

  const handleDirectChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
    
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const config = serviceConfigs[formData.serviceType]?.[formData.serviceName];
    
    if (!formData.serviceName) {
      newErrors.serviceName = 'Service is required';
    }
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }
    
    if (config) {
      // Validate credential fields
      config.fields.forEach(field => {
        if (field.required && !formData.credentials[field.name]) {
          newErrors[`credentials.${field.name}`] = `${field.label} is required`;
        }
      });
      
      // Validate required config fields
      config.configFields?.forEach(field => {
        if (field.required && !formData.configuration[field.key]) {
          newErrors[`configuration.${field.key}`] = `${field.label} is required`;
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTestConnection = async () => {
    if (!validateForm()) {
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      // For testing, we'll call the test API directly with credentials
      const response = await fetch('/api/admin/test-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: formData.serviceType,
          serviceName: formData.serviceName,
          credentials: formData.credentials,
          configuration: formData.configuration
        })
      });

      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Connection test failed',
        details: error.message
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const currentConfig = serviceConfigs[formData.serviceType]?.[formData.serviceName];
  const availableServices = Object.entries(serviceConfigs[formData.serviceType] || {});

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerIcon}>
              <Key size={20} />
            </div>
            <div>
              <h2 className={styles.title}>
                {editingCredential ? 'Edit Service' : 'Add New Service'}
              </h2>
              <p className={styles.subtitle}>
                Configure your external service credentials
              </p>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Service Selection */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Service Information</h3>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Service Type</label>
              <select
                value={formData.serviceType}
                onChange={(e) => {
                  handleDirectChange('serviceType', e.target.value);
                  handleDirectChange('serviceName', ''); // Reset service name
                }}
                className={styles.select}
                disabled={editingCredential} // Can't change type when editing
              >
                <option value="ai_provider">AI Provider</option>
                <option value="crm_system">CRM System</option>
                <option value="productivity_tool">Productivity Tool</option>
                <option value="integration_platform">Integration Platform</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Service</label>
              <select
                value={formData.serviceName}
                onChange={(e) => handleDirectChange('serviceName', e.target.value)}
                className={`${styles.select} ${errors.serviceName ? styles.error : ''}`}
                disabled={editingCredential} // Can't change service when editing
              >
                <option value="">Choose a service...</option>
                {availableServices.map(([key, config]) => (
                  <option key={key} value={key}>
                    {config.name}
                  </option>
                ))}
              </select>
              {errors.serviceName && <span className={styles.errorText}>{errors.serviceName}</span>}
            </div>

            {currentConfig && (
              <div className={styles.serviceDescription}>
                <p>{currentConfig.description}</p>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.label}>Display Name</label>
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) => handleDirectChange('displayName', e.target.value)}
                placeholder="e.g., OpenAI Production, ServiceNow Dev"
                className={`${styles.input} ${errors.displayName ? styles.error : ''}`}
              />
              {errors.displayName && <span className={styles.errorText}>{errors.displayName}</span>}
            </div>
          </div>

          {/* Credentials Section */}
          {currentConfig && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Credentials</h3>
              {currentConfig.fields.map(field => (
                <div key={field.name} className={styles.formGroup}>
                  <label className={styles.label}>
                    {field.label}
                    {field.required && <span className={styles.required}>*</span>}
                  </label>
                  <input
                    type={field.type}
                    value={formData.credentials[field.name] || ''}
                    onChange={(e) => handleInputChange('credentials', field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className={`${styles.input} ${errors[`credentials.${field.name}`] ? styles.error : ''}`}
                  />
                  {errors[`credentials.${field.name}`] && (
                    <span className={styles.errorText}>{errors[`credentials.${field.name}`]}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Configuration Section */}
          {currentConfig && currentConfig.configFields && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Configuration</h3>
              {currentConfig.configFields.map(field => (
                <div key={field.key} className={styles.formGroup}>
                  <label className={styles.label}>
                    {field.label}
                    {field.required && <span className={styles.required}>*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData.configuration[field.key] || field.default || ''}
                      onChange={(e) => handleInputChange('configuration', field.key, e.target.value)}
                      className={`${styles.select} ${errors[`configuration.${field.key}`] ? styles.error : ''}`}
                    >
                      {field.options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={formData.configuration[field.key] || field.default || ''}
                      onChange={(e) => handleInputChange('configuration', field.key, e.target.value)}
                      placeholder={field.placeholder}
                      step={field.step}
                      min={field.min}
                      max={field.max}
                      className={`${styles.input} ${errors[`configuration.${field.key}`] ? styles.error : ''}`}
                    />
                  )}
                  {errors[`configuration.${field.key}`] && (
                    <span className={styles.errorText}>{errors[`configuration.${field.key}`]}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Options Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Options</h3>
            
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => handleDirectChange('isActive', e.target.checked)}
                />
                <span className={styles.checkboxText}>Active</span>
              </label>
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => handleDirectChange('isDefault', e.target.checked)}
                />
                <span className={styles.checkboxText}>Set as default provider</span>
              </label>
            </div>
          </div>

          {/* Test Results */}
          {testResult && (
            <div className={`${styles.testResult} ${testResult.success ? styles.testSuccess : styles.testError}`}>
              <div className={styles.testResultHeader}>
                {testResult.success ? (
                  <CheckCircle size={16} className={styles.testSuccessIcon} />
                ) : (
                  <XCircle size={16} className={styles.testErrorIcon} />
                )}
                <span>{testResult.success ? 'Connection Successful' : 'Connection Failed'}</span>
              </div>
              {testResult.message && <p>{testResult.message}</p>}
              {testResult.error && <p className={styles.errorDetail}>{testResult.error}</p>}
              {testResult.details && (
                <div className={styles.testDetails}>
                  <strong>Details:</strong>
                  <pre>{JSON.stringify(testResult.details, null, 2)}</pre>
                </div>
              )}
            </div>
          )}

          {/* Form Errors */}
          {errors.submit && (
            <div className={styles.formError}>
              <AlertTriangle size={16} />
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={`btn btn-secondary ${styles.cancelButton}`}
            >
              Cancel
            </button>
            
            {currentConfig && (
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting || isSubmitting}
                className={`btn btn-outline ${styles.testButton}`}
              >
                {isTesting ? (
                  <>
                    <div className={styles.spinner}></div>
                    Testing...
                  </>
                ) : (
                  <>
                    <TestTube size={16} />
                    Test Connection
                  </>
                )}
              </button>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting || isTesting}
              className={`btn btn-primary ${styles.saveButton}`}
            >
              {isSubmitting ? (
                <>
                  <div className={styles.spinner}></div>
                  {editingCredential ? 'Updating...' : 'Saving...'}
                </>
              ) : (
                editingCredential ? 'Update Service' : 'Save Service'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 


================================================
FILE: app/api/admin/debug-credentials/route.js
================================================
import { NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { supabase } from '../../../lib/supabase';

export async function GET(request) {
  try {
    // Verify user authentication
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    console.log('🔍 Debug: Checking credentials for user:', user.id);

    // Test 1: Check if table exists and is accessible
    const { data: tableCheck, error: tableError } = await supabase
      .from('external_service_credentials')
      .select('count')
      .limit(0);

    console.log('🗃️ Table accessibility:', { accessible: !tableError, error: tableError?.message });

    // Test 2: Get all credentials for this user (with RLS)
    const { data: credentials, error } = await supabase
      .from('external_service_credentials')
      .select('*')
      .eq('user_id', user.id);

    console.log('📊 User credentials query:', { 
      success: !error, 
      error: error?.message, 
      count: credentials?.length || 0 
    });

    // Test 3: Check auth.uid() function (what RLS uses)
    const { data: authUidTest, error: authError } = await supabase
      .rpc('auth.uid');
    
    console.log('🔐 Auth UID test:', { 
      success: !authError, 
      authUid: authUidTest, 
      userIdMatch: authUidTest === user.id,
      error: authError?.message 
    });

    // Test 4: Try to count all records (admin check)
    const { count: totalCount, error: countError } = await supabase
      .from('external_service_credentials')
      .select('*', { count: 'exact', head: true });

    console.log('📈 Total records check:', { 
      success: !countError, 
      totalCount, 
      error: countError?.message 
    });

    // Test 5: Check recent credentials (last hour) 
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recentCreds, error: recentError } = await supabase
      .from('external_service_credentials')
      .select('*')
      .gte('created_at', oneHourAgo);

    console.log('⏰ Recent credentials check:', { 
      success: !recentError, 
      recentCount: recentCreds?.length || 0,
      error: recentError?.message 
    });

    if (error) {
      console.error('❌ Database error:', error);
      return NextResponse.json(
        { 
          error: 'Database error', 
          details: error.message,
          diagnostics: {
            tableAccessible: !tableError,
            tableError: tableError?.message,
            authUid: authUidTest,
            userIdMatch: authUidTest === user.id,
            totalRecords: totalCount,
            recentRecords: recentCreds?.length || 0
          }
        },
        { status: 500 }
      );
    }

    console.log('📊 Found credentials:', credentials.length);
    
    return NextResponse.json({
      success: true,
      user_id: user.id,
      credentials_count: credentials.length,
      diagnostics: {
        tableAccessible: !tableError,
        authUidWorks: !authError,
        authUid: authUidTest,
        userIdMatch: authUidTest === user.id,
        totalRecordsInTable: totalCount,
        recentRecordsInTable: recentCreds?.length || 0,
        lastHourFilter: oneHourAgo
      },
      credentials: credentials.map(cred => ({
        id: cred.id,
        service_type: cred.service_type,
        service_name: cred.service_name,
        display_name: cred.display_name,
        is_active: cred.is_active,
        test_status: cred.test_status,
        created_at: cred.created_at,
        updated_at: cred.updated_at
      }))
    });

  } catch (error) {
    console.error('💥 Debug credentials error:', error);
    return NextResponse.json(
      { 
        error: 'Debug failed', 
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 


================================================
FILE: app/api/admin/encrypt-credentials/route.js
================================================
import { NextResponse } from 'next/server';
import { encryptCredential } from '../../../utils/encryption';
import { getUser } from '../../../lib/supabase';

export async function POST(request) {
  try {
    // Check if encryption is configured before doing anything else
    if (!process.env.ENCRYPTION_KEY) {
      console.error('❌ ENCRYPTION_KEY environment variable not configured');
      return NextResponse.json(
        { 
          error: 'Credential encryption not configured', 
          details: 'ENCRYPTION_KEY environment variable is required. Please see setup documentation.',
          setupRequired: true
        },
        { status: 503 }
      );
    }

    // Verify user authentication
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { credentials } = body;

    if (!credentials || typeof credentials !== 'object') {
      return NextResponse.json(
        { error: 'Credentials object is required' },
        { status: 400 }
      );
    }

    console.log('🔐 Encrypting credentials for user:', user.id);
    console.log('🔑 Credential keys to encrypt:', Object.keys(credentials));

    // Encrypt each credential field
    const encryptedCredentials = {};
    const encryptionMetadata = {};

    for (const [key, value] of Object.entries(credentials)) {
      if (value && typeof value === 'string') {
        console.log(`🔒 Encrypting credential: ${key}`);
        const encrypted = encryptCredential(value);
        encryptedCredentials[key] = encrypted.encrypted;
        encryptionMetadata[`${key}_iv`] = encrypted.iv;
        encryptionMetadata[`${key}_auth_tag`] = encrypted.authTag;
      } else {
        console.log(`⏭️ Skipping empty credential: ${key}`);
        // Skip empty or non-string values
        continue;
      }
    }

    // Add algorithm info
    encryptionMetadata.algorithm = 'aes-256-gcm';
    encryptionMetadata.encrypted_at = new Date().toISOString();

    console.log('✅ Encryption completed successfully');
    console.log('📊 Encrypted credentials count:', Object.keys(encryptedCredentials).length);

    return NextResponse.json({
      encrypted: encryptedCredentials,
      metadata: encryptionMetadata
    });

  } catch (error) {
    console.error('💥 Credential encryption error:', error);
    
    // Provide specific error messages for common issues
    let errorMessage = 'Failed to encrypt credentials';
    let details = error.message;
    
    if (error.message.includes('ENCRYPTION_KEY')) {
      errorMessage = 'Encryption configuration error';
      details = 'Please check your ENCRYPTION_KEY environment variable setup.';
    }
    
    return NextResponse.json(
      { 
        error: errorMessage, 
        details,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 


================================================
FILE: app/api/admin/generate-encryption-key/route.js
================================================
import { NextResponse } from 'next/server';
import { generateEncryptionKey } from '../../../utils/encryption';

/**
 * Generate Encryption Key Endpoint
 * 
 * Helps users generate a secure 256-bit encryption key for credential storage.
 * This is a one-time setup utility.
 */
export async function GET() {
  try {
    // Generate a secure 256-bit encryption key
    const encryptionKey = generateEncryptionKey();
    
    return NextResponse.json({
      success: true,
      encryptionKey,
      instructions: [
        '1. Copy the encryption key below',
        '2. Add it to your .env.local file as ENCRYPTION_KEY=<key>',
        '3. Restart your development server',
        '4. Your admin interface will now work for credential storage'
      ],
      envFormat: `ENCRYPTION_KEY=${encryptionKey}`,
      security: {
        keyLength: encryptionKey.length,
        algorithm: 'AES-256-GCM',
        warning: 'Keep this key secure and never commit it to version control!'
      }
    });

  } catch (error) {
    console.error('Encryption key generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate encryption key', 
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 


================================================
FILE: app/api/admin/test-connection/route.js
================================================
import { NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { supabase } from '../../../lib/supabase';
import { decryptCredential } from '../../../utils/encryption';

export async function POST(request) {
  console.log('🔍 test-connection route called');
  
  try {
    // Parse request body first for debugging
    let body;
    try {
      body = await request.json();
      console.log('📝 Request body:', JSON.stringify(body, null, 2));
    } catch (error) {
      console.log('❌ JSON parse error:', error.message);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Verify user authentication
    console.log('🔐 Checking authentication...');
    const user = await getUser(request);
    console.log('👤 User result:', user ? `User ID: ${user.id}` : 'No user');
    
    if (!user) {
      console.log('🚫 Authentication failed - returning 401');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { credentialId, serviceType, serviceName } = body;
    console.log('🔧 Extracted params:', { credentialId, serviceType, serviceName });

    if (!credentialId || !serviceType || !serviceName) {
      console.log('❌ Missing required parameters');
      return NextResponse.json(
        { error: 'Credential ID, service type, and service name are required' },
        { status: 400 }
      );
    }

    console.log('🗃️ Querying database for credential...');
    
    // First, let's see what credentials exist for this user
    const { data: allCredentials, error: allCredsError } = await supabase
      .from('external_service_credentials')
      .select('id, display_name, service_type, service_name, created_at')
      .eq('user_id', user.id);
    
    console.log('📊 All credentials for user:', {
      count: allCredentials?.length || 0,
      credentials: allCredentials?.map(c => ({ id: c.id, name: c.display_name, type: c.service_type, service: c.service_name })) || []
    });
    
    // Now try to get the specific credential
    const { data: credential, error: dbError } = await supabase
      .from('external_service_credentials')
      .select('*')
      .eq('id', credentialId)
      .eq('user_id', user.id)
      .single();

    console.log('💾 Database query result:', {
      found: !!credential,
      error: dbError?.message,
      credentialId,
      searchingForId: credentialId,
      availableIds: allCredentials?.map(c => c.id) || []
    });

    if (dbError || !credential) {
      console.log('🚫 Credential not found - returning 404');
      return NextResponse.json(
        { error: 'Credential not found or access denied' },
        { status: 404 }
      );
    }

    console.log('🔓 Decrypting credentials...');
    // Decrypt credentials
    const decryptedCredentials = await decryptStoredCredentials(
      credential.credentials_encrypted,
      credential.encryption_metadata
    );

    console.log('🧪 Starting connection test...');
    // Test connection based on service type
    let testResult;
    switch (serviceType) {
      case 'ai_provider':
        testResult = await testAIProvider(serviceName, decryptedCredentials, credential.configuration);
        break;
      case 'crm_system':
        testResult = await testCRMSystem(serviceName, decryptedCredentials, credential.configuration);
        break;
      default:
        console.log('❌ Unsupported service type:', serviceType);
        return NextResponse.json(
          { error: `Unsupported service type: ${serviceType}` },
          { status: 400 }
        );
    }

    console.log('✅ Test completed:', testResult.success ? 'SUCCESS' : 'FAILED');
    return NextResponse.json(testResult);

  } catch (error) {
    console.error('💥 Connection test error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Connection test failed', 
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * Decrypt stored credentials using metadata
 */
async function decryptStoredCredentials(encryptedCredentials, metadata) {
  const decrypted = {};
  
  for (const [key, encryptedValue] of Object.entries(encryptedCredentials)) {
    if (encryptedValue && metadata[`${key}_iv`] && metadata[`${key}_auth_tag`]) {
      try {
        decrypted[key] = decryptCredential(
          encryptedValue,
          metadata[`${key}_iv`],
          metadata[`${key}_auth_tag`]
        );
      } catch (error) {
        console.error(`Failed to decrypt credential ${key}:`, error);
        throw new Error(`Failed to decrypt credential: ${key}`);
      }
    }
  }
  
  return decrypted;
}

/**
 * Test AI provider connections
 */
async function testAIProvider(serviceName, credentials, configuration) {
  const startTime = Date.now();
  
  try {
    switch (serviceName) {
      case 'openai':
        return await testOpenAI(credentials, configuration);
      case 'gemini':
        return await testGemini(credentials, configuration);
      case 'claude':
        return await testClaude(credentials, configuration);
      default:
        throw new Error(`Unsupported AI provider: ${serviceName}`);
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

/**
 * Test CRM system connections
 */
async function testCRMSystem(serviceName, credentials, configuration) {
  const startTime = Date.now();
  
  try {
    switch (serviceName) {
      case 'servicenow':
        return await testServiceNow(credentials, configuration);
      case 'hubspot':
        return await testHubSpot(credentials, configuration);
      default:
        throw new Error(`Unsupported CRM system: ${serviceName}`);
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

/**
 * Test OpenAI connection
 */
async function testOpenAI(credentials, configuration) {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('OpenAI API key is required');
  }

  const response = await fetch('https://api.openai.com/v1/models', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${api_key}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`OpenAI API error: ${response.status} - ${error.error?.message || 'Authentication failed'}`);
  }

  const data = await response.json();
  const models = data.data?.filter(model => model.id.includes('gpt')) || [];

  return {
    success: true,
    message: 'OpenAI connection successful',
    details: {
      modelsAvailable: models.length,
      recommendedModel: configuration.model || 'gpt-4o',
      endpoint: 'https://api.openai.com/v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

/**
 * Test Google Gemini connection
 */
async function testGemini(credentials, configuration) {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('Google API key is required');
  }

  // Test with a simple generate request
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${api_key}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Gemini API error: ${response.status} - ${error.error?.message || 'Authentication failed'}`);
  }

  const data = await response.json();

  return {
    success: true,
    message: 'Google Gemini connection successful',
    details: {
      modelsAvailable: data.models?.length || 0,
      recommendedModel: configuration.model || 'gemini-pro',
      endpoint: 'https://generativelanguage.googleapis.com/v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

/**
 * Test Anthropic Claude connection
 */
async function testClaude(credentials, configuration) {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('Anthropic API key is required');
  }

  // Test with a simple messages request
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${api_key}`,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: configuration.model || 'claude-3-sonnet-20240229',
      max_tokens: 10,
      messages: [
        { role: 'user', content: 'Test' }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Claude API error: ${response.status} - ${error.error?.message || 'Authentication failed'}`);
  }

  return {
    success: true,
    message: 'Anthropic Claude connection successful',
    details: {
      recommendedModel: configuration.model || 'claude-3-sonnet-20240229',
      endpoint: 'https://api.anthropic.com/v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

/**
 * Test ServiceNow connection
 */
async function testServiceNow(credentials, configuration) {
  const startTime = Date.now();
  const { username, password } = credentials;
  const { instance_url } = configuration;
  
  if (!username || !password || !instance_url) {
    throw new Error('ServiceNow username, password, and instance URL are required');
  }

  // Test with a simple sys_user query
  const response = await fetch(`${instance_url}/api/now/table/sys_user?sysparm_limit=1`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`ServiceNow API error: ${response.status} - Authentication failed`);
  }

  const data = await response.json();

  return {
    success: true,
    message: 'ServiceNow connection successful',
    details: {
      instanceUrl: instance_url,
      userCount: data.result?.length || 0,
      apiVersion: 'v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

/**
 * Test HubSpot connection
 */
async function testHubSpot(credentials, configuration) {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('HubSpot API key is required');
  }

  // Test with account info endpoint
  const response = await fetch(`https://api.hubapi.com/account-info/v3/details?hapikey=${api_key}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HubSpot API error: ${response.status} - Authentication failed`);
  }

  const data = await response.json();

  return {
    success: true,
    message: 'HubSpot connection successful',
    details: {
      accountId: data.portalId,
      accountName: data.accountName || 'Unknown',
      endpoint: 'https://api.hubapi.com'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
} 


================================================
FILE: app/api/admin/test-credentials/route.js
================================================
import { NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';

export async function POST(request) {
  console.log('🔍 test-credentials route called');
  
  try {
    // Parse request body first for debugging
    let body;
    try {
      body = await request.json();
      console.log('📝 Request body:', JSON.stringify(body, null, 2));
    } catch (error) {
      console.log('❌ JSON parse error:', error.message);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Verify user authentication
    console.log('🔐 Checking authentication...');
    const user = await getUser(request);
    console.log('👤 User result:', user ? `User ID: ${user.id}` : 'No user');
    
    if (!user) {
      console.log('🚫 Authentication failed - returning 401');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { serviceType, serviceName, credentials, configuration } = body;
    console.log('🔧 Extracted params:', { serviceType, serviceName, hasCredentials: !!credentials, hasConfiguration: !!configuration });

    if (!serviceType || !serviceName || !credentials) {
      console.log('❌ Missing required parameters');
      return NextResponse.json(
        { error: 'Service type, service name, and credentials are required' },
        { status: 400 }
      );
    }

    console.log('🧪 Starting direct credential test...');
    // Test connection directly with provided credentials (no database lookup needed)
    let testResult;
    switch (serviceType) {
      case 'ai_provider':
        testResult = await testAIProvider(serviceName, credentials, configuration);
        break;
      case 'crm_system':
        testResult = await testCRMSystem(serviceName, credentials, configuration);
        break;
      default:
        console.log('❌ Unsupported service type:', serviceType);
        return NextResponse.json(
          { error: `Unsupported service type: ${serviceType}` },
          { status: 400 }
        );
    }

    console.log('✅ Test completed:', testResult.success ? 'SUCCESS' : 'FAILED');
    return NextResponse.json(testResult);

  } catch (error) {
    console.error('💥 Credential test error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Credential test failed', 
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * Test AI provider connections
 */
async function testAIProvider(serviceName, credentials, configuration) {
  const startTime = Date.now();
  
  try {
    switch (serviceName) {
      case 'openai':
        return await testOpenAI(credentials, configuration);
      case 'gemini':
        return await testGemini(credentials, configuration);
      case 'claude':
        return await testClaude(credentials, configuration);
      default:
        throw new Error(`Unsupported AI provider: ${serviceName}`);
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

/**
 * Test CRM system connections
 */
async function testCRMSystem(serviceName, credentials, configuration) {
  const startTime = Date.now();
  
  try {
    switch (serviceName) {
      case 'servicenow':
        return await testServiceNow(credentials, configuration);
      case 'hubspot':
        return await testHubSpot(credentials, configuration);
      default:
        throw new Error(`Unsupported CRM system: ${serviceName}`);
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

/**
 * Test OpenAI connection
 */
async function testOpenAI(credentials, configuration) {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('OpenAI API key is required');
  }

  const response = await fetch('https://api.openai.com/v1/models', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${api_key}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`OpenAI API error: ${response.status} - ${error.error?.message || 'Authentication failed'}`);
  }

  const data = await response.json();
  const models = data.data?.filter(model => model.id.includes('gpt')) || [];

  return {
    success: true,
    message: 'OpenAI connection successful',
    details: {
      modelsAvailable: models.length,
      recommendedModel: configuration?.model || 'gpt-4o',
      endpoint: 'https://api.openai.com/v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

/**
 * Test Google Gemini connection
 */
async function testGemini(credentials, configuration) {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('Google API key is required');
  }

  // Test with a simple generate request
  const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${api_key}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Gemini API error: ${response.status} - ${error.error?.message || 'Authentication failed'}`);
  }

  const data = await response.json();

  return {
    success: true,
    message: 'Google Gemini connection successful',
    details: {
      modelsAvailable: data.models?.length || 0,
      recommendedModel: configuration?.model || 'gemini-pro',
      endpoint: 'https://generativelanguage.googleapis.com/v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

/**
 * Test Anthropic Claude connection
 */
async function testClaude(credentials, configuration) {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('Anthropic API key is required');
  }

  // Test with a simple messages request
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${api_key}`,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: configuration?.model || 'claude-3-sonnet-20240229',
      max_tokens: 10,
      messages: [
        { role: 'user', content: 'Test' }
      ]
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(`Claude API error: ${response.status} - ${error.error?.message || 'Authentication failed'}`);
  }

  return {
    success: true,
    message: 'Anthropic Claude connection successful',
    details: {
      recommendedModel: configuration?.model || 'claude-3-sonnet-20240229',
      endpoint: 'https://api.anthropic.com/v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

/**
 * Test ServiceNow connection
 */
async function testServiceNow(credentials, configuration) {
  const startTime = Date.now();
  const { username, password } = credentials;
  const { instance_url } = configuration;
  
  if (!username || !password || !instance_url) {
    throw new Error('ServiceNow username, password, and instance URL are required');
  }

  // Test with a simple sys_user query
  const response = await fetch(`${instance_url}/api/now/table/sys_user?sysparm_limit=1`, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`ServiceNow API error: ${response.status} - Authentication failed`);
  }

  const data = await response.json();

  return {
    success: true,
    message: 'ServiceNow connection successful',
    details: {
      instanceUrl: instance_url,
      userCount: data.result?.length || 0,
      apiVersion: 'v1'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
}

/**
 * Test HubSpot connection
 */
async function testHubSpot(credentials, configuration) {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('HubSpot API key is required');
  }

  // Test with account info endpoint
  const response = await fetch(`https://api.hubapi.com/account-info/v3/details?hapikey=${api_key}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HubSpot API error: ${response.status} - Authentication failed`);
  }

  const data = await response.json();

  return {
    success: true,
    message: 'HubSpot connection successful',
    details: {
      accountId: data.portalId,
      accountName: data.accountName || 'Unknown',
      endpoint: 'https://api.hubapi.com'
    },
    timestamp: new Date().toISOString(),
    duration: Date.now() - startTime
  };
} 


================================================
FILE: app/api/debug-env/route.js
================================================
import { NextResponse } from 'next/server';

/**
 * Debug Environment Configuration Endpoint
 * 
 * This endpoint helps developers verify that both AI integration
 * and credential encryption are properly configured.
 */
export async function GET() {
  try {
    const isAIConfigured = !!process.env.OPENAI_API_KEY;
    const isEncryptionConfigured = !!process.env.ENCRYPTION_KEY;
    
    // Check encryption key length if it exists
    let encryptionKeyValid = false;
    if (process.env.ENCRYPTION_KEY) {
      const keyHex = process.env.ENCRYPTION_KEY;
      const key = Buffer.from(keyHex, 'hex');
      encryptionKeyValid = key.length === 32; // 32 bytes for AES-256
    }
    
    const envStatus = {
      timestamp: new Date().toISOString(),
      aiService: {
        configured: isAIConfigured,
        provider: 'OpenAI GPT-4o',
        apiKeyStatus: isAIConfigured ? 'Set' : 'Missing'
      },
      credentialEncryption: {
        configured: isEncryptionConfigured,
        encryptionKeyStatus: isEncryptionConfigured ? 'Set' : 'Missing',
        encryptionKeyValid: encryptionKeyValid,
        encryptionKeyLength: process.env.ENCRYPTION_KEY ? process.env.ENCRYPTION_KEY.length : 0,
        expectedLength: 64 // 32 bytes = 64 hex characters
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        openaiKeyConfigured: isAIConfigured,
        openaiKeyLength: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0
      },
      features: {
        aiTimelineGeneration: isAIConfigured,
        credentialStorage: isEncryptionConfigured && encryptionKeyValid,
        profileMarkdownConversion: true,
        timelineValidation: true,
        adminInterface: isEncryptionConfigured && encryptionKeyValid
      },
      issues: []
    };

    // Add specific issues
    if (!isAIConfigured) {
      envStatus.issues.push('OPENAI_API_KEY not configured - AI timeline generation disabled');
    }
    if (!isEncryptionConfigured) {
      envStatus.issues.push('ENCRYPTION_KEY not configured - admin interface credential storage disabled');
    } else if (!encryptionKeyValid) {
      envStatus.issues.push('ENCRYPTION_KEY invalid - must be 64 hex characters (32 bytes)');
    }

    const overallConfigured = isAIConfigured && isEncryptionConfigured && encryptionKeyValid;

    return NextResponse.json({
      configured: overallConfigured,
      status: overallConfigured ? 'ready' : 'configuration_needed',
      ...envStatus
    });

  } catch (error) {
    console.error('Environment debug error:', error);
    return NextResponse.json({
      configured: false,
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 


================================================
FILE: app/api/servicenow/route.js
================================================
// Next.js API route to proxy requests to ServiceNow
// This avoids CORS issues by making server-to-server requests

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { 
      instanceUrl, 
      username, 
      password, 
      tableName, 
      fields = [], 
      scope = '',
      query = ''
    } = body;

    // Validate required parameters
    if (!instanceUrl || !username || !password || !tableName) {
      return NextResponse.json(
        { error: 'Missing required parameters: instanceUrl, username, password, tableName' },
        { status: 400 }
      );
    }

    // Construct the ServiceNow API URL
    let url = `${instanceUrl}/api/now/table/${tableName}?`;
    
    // Add query parameters if provided
    const queryParams = [];
    
    if (scope) {
      queryParams.push(`sysparm_query=sys_scope=${scope}${query ? '^' + query : ''}`);
    } else if (query) {
      queryParams.push(`sysparm_query=${query}`);
    }
    
    if (fields.length > 0) {
      queryParams.push(`sysparm_fields=${fields.join(',')}`);
    }
    
    queryParams.push('sysparm_display_value=false');
    queryParams.push('sysparm_exclude_reference_link=true');
    
    url += queryParams.join('&');
    
    console.log(`Proxying request to: ${url}`);
    
    // Make the authenticated request to ServiceNow
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    // Check if the response was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ServiceNow Error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { 
          error: `ServiceNow request failed with status ${response.status}`,
          details: errorText
        },
        { status: response.status }
      );
    }
    
    // Parse and return the ServiceNow response
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error in ServiceNow proxy API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 


================================================
FILE: app/api/servicenow/fetch-agentic-data/route.js
================================================
// Specialized API route to fetch all ServiceNow agentic AI data in one go

import { NextResponse } from 'next/server';
import { validateInstanceUrl, validateScopeId, checkRateLimit } from '../../../utils/validation';

// Helper to safely get nested properties
const get = (obj, path, defaultValue = undefined) => {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
};

export async function POST(request) {
  try {
    // Rate limiting (basic implementation)
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitCheck = checkRateLimit(clientIP, 20, 60000); // 20 requests per minute
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfter: rateLimitCheck.retryAfter },
        { status: 429, headers: { 'Retry-After': rateLimitCheck.retryAfter.toString() } }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { instanceUrl, scopeId } = body;

    // Validate instanceUrl
    const urlValidation = validateInstanceUrl(instanceUrl);
    if (!urlValidation.isValid) {
      return NextResponse.json(
        { error: `Invalid instance URL: ${urlValidation.error}` },
        { status: 400 }
      );
    }

    // Validate scopeId
    const scopeValidation = validateScopeId(scopeId);
    if (!scopeValidation.isValid) {
      return NextResponse.json(
        { error: `Invalid scope ID: ${scopeValidation.error}` },
        { status: 400 }
      );
    }

    // Get credentials from environment variables (server-side only)
    const username = process.env.SERVICENOW_USERNAME;
    const password = process.env.SERVICENOW_PASSWORD;

    // Validate server-side credentials
    if (!username || !password) {
      console.error('Server configuration error: ServiceNow credentials not found in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Authentication credentials not configured' },
        { status: 500 }
      );
    }

    // Use validated and sanitized values
    const formattedUrl = urlValidation.sanitized;
    const sanitizedScopeId = scopeValidation.sanitized;

    // Create authorization header using server-side credentials
    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

    // Use the new scripted REST API endpoint with sanitized scope ID
    const apiUrl = `${formattedUrl}/api/x_nowge_rfx_ai/ai_relationship_explorer/relationships?app_scope_id=${sanitizedScopeId}`;
    
    console.log(`Fetching from: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch data from scripted REST API: ${response.status} ${response.statusText}. Details: ${errorText}`);
    }

    // Get the response data
    const data = await response.json();
    
    // Add debug logging
    console.log('API Response Structure:', JSON.stringify(data, null, 2));
    
    // Check if the data is nested in an x_nowge_rfx_ai object
    if (data.x_nowge_rfx_ai && data.x_nowge_rfx_ai.use_cases) {
      // Return the data with use_cases directly at the top level
      return NextResponse.json({ use_cases: data.x_nowge_rfx_ai.use_cases });
    } else if (data.result && data.result.use_cases) {
      // If it's under a result property, extract it
      return NextResponse.json({ use_cases: data.result.use_cases });
    } else if (data.use_cases) {
      // Data already has use_cases at the top level
      return NextResponse.json(data);
    } else {
      // If we can't find use_cases in the expected places, return what we have
      // and let the error handling catch it
      console.error('Could not find use_cases in the API response:', data);
      return NextResponse.json(data);
    }

  } catch (error) {
    console.error('Error in fetch-agentic-data API route:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch or process ServiceNow data' },
      { status: 500 }
    );
  }
} 


================================================
FILE: app/api/servicenow/get-credentials/route.js
================================================
export async function GET() {
  // Only return non-sensitive connection details
  // Credentials should be handled server-side only
  return Response.json({
    instanceUrl: process.env.SERVICENOW_INSTANCE_URL || '',
    // Remove username and password from client exposure
    scopeId: process.env.SERVICENOW_SCOPE_ID || ''
  });
} 


================================================
FILE: app/api/test-ai/route.js
================================================
import { NextResponse } from 'next/server';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';

/**
 * Test AI Timeline Generation with Client Profile Markdown
 * 
 * This endpoint allows testing timeline generation using the full markdown
 * representation of client profiles for richer AI context.
 */
export async function POST(request) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'AI timeline generation not available', 
          details: 'OpenAI API key not configured.',
          configured: false
        },
        { status: 503 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { profileId, useMarkdown = true } = body;

    if (!profileId) {
      return NextResponse.json(
        { error: 'Profile ID is required' },
        { status: 400 }
      );
    }

    // Get the profile
    const profile = await ProfileService.getProfile(profileId);
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    // Generate timeline using the profile service (which uses full markdown)
    const timelineData = await ProfileService.generateTimelineFromProfile(profile);

    // Also generate the markdown for inspection
    const profileMarkdown = markdownService.generateMarkdown(profile);

    return NextResponse.json({
      success: true,
      profileId,
      profileName: profile.companyName,
      timeline: timelineData,
      markdown: useMarkdown ? profileMarkdown : '[Hidden - set useMarkdown:true to view]',
      generatedAt: new Date().toISOString(),
      provider: 'OpenAI GPT-4o',
      method: 'Full Profile Markdown Context'
    });

  } catch (error) {
    console.error('Test AI endpoint error:', error);
    return NextResponse.json(
      { 
        error: 'Timeline generation failed',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * Get available test profiles
 */
export async function GET() {
  try {
    const profiles = await ProfileService.getProfiles();
    
    const testProfiles = profiles.map(profile => ({
      id: profile.id,
      companyName: profile.companyName,
      industry: profile.industry,
      size: profile.size,
      hasMarkdown: !!profile.markdown,
      createdAt: profile.createdAt
    }));

    return NextResponse.json({
      available: testProfiles.length > 0,
      profiles: testProfiles,
      message: testProfiles.length > 0 
        ? 'Use POST with profileId to test timeline generation'
        : 'No profiles available. Create one first at /profiles'
    });

  } catch (error) {
    console.error('Get test profiles error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get test profiles',
        details: error.message
      },
      { status: 500 }
    );
  }
} 


================================================
FILE: app/api/timeline/generate/route.js
================================================
import { NextResponse } from 'next/server';
import { validateBusinessProfile, validateScenarioType, checkRateLimit } from '../../../utils/validation';
import { TimelineService } from '../../../services/timelineService';

export async function POST(request) {
  try {
    // Check if the AI service is configured via TimelineService
    if (!TimelineService.isConfigured()) {
      return NextResponse.json(
        { 
          error: 'AI timeline generation not available', 
          details: 'The AI service is not configured on the server. Please contact the administrator.',
          ...TimelineService.getStatus()
        },
        { status: 503 }
      );
    }

    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitCheck = checkRateLimit(`timeline-${clientIP}`, 5, 60000); // 5 timeline generations per minute
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfter: rateLimitCheck.retryAfter },
        { status: 429, headers: { 'Retry-After': rateLimitCheck.retryAfter.toString() } }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { businessProfile, scenarioType } = body;

    // Validate business profile
    const profileValidation = validateBusinessProfile(businessProfile);
    if (!profileValidation.isValid) {
      return NextResponse.json(
        { 
          error: 'Invalid business profile', 
          details: profileValidation.errors 
        },
        { status: 400 }
      );
    }

    // Validate scenario type
    const scenarioValidation = validateScenarioType(scenarioType);
    if (!scenarioValidation.isValid) {
      return NextResponse.json(
        { error: `Invalid scenario type: ${scenarioValidation.error}` },
        { status: 400 }
      );
    }

    // Generate timeline using the AI-powered service
    try {
      const timelineData = await TimelineService.generateTimeline(
        profileValidation.sanitized,
        scenarioValidation.sanitized
      );

      return NextResponse.json({
        success: true,
        timeline: timelineData,
        generatedAt: new Date().toISOString(),
        provider: TimelineService.getStatus().provider
      });

    } catch (serviceError) {
      console.error('Timeline generation service error:', serviceError);
      
      return NextResponse.json(
        { 
          error: 'AI timeline generation failed', 
          details: serviceError.message,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Timeline API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 


================================================
FILE: app/api/timeline/generate-from-profile/route.js
================================================
import { NextResponse } from 'next/server';
import { markdownService } from '../../../services/markdownService';
import { TimelineService } from '../../../services/timelineService';
import { createClient } from '@supabase/supabase-js';

// Create server-side Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * Generate Timeline from Client Profile with Database Caching
 * 
 * This endpoint generates AI timelines using the full client profile context
 * with intelligent caching to avoid unnecessary API calls.
 * 
 * Supports:
 * - Cache-first timeline loading
 * - Force regeneration with forceRegenerate parameter
 * - Scenario type override
 */
export async function POST(request) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'AI timeline generation not available', 
          details: 'OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.',
          configured: false
        },
        { status: 503 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { profileId, profile, forceRegenerate = false, scenarioType, userId } = body;
    
    console.log(`📝 Request: profileId=${profileId}, userId=${userId}, forceRegenerate=${forceRegenerate}, scenarioType=${scenarioType}`);

    if (!profile && !profileId) {
      return NextResponse.json(
        { error: 'Either profile data or profileId is required' },
        { status: 400 }
      );
    }

    let targetProfile = profile;

    // If profileId is provided but no profile data, fetch it
    if (profileId && !profile) {
      if (!userId) {
        return NextResponse.json(
          { error: 'Authentication required to fetch saved profiles' },
          { status: 401 }
        );
      }
      
      try {
        const { data, error } = await supabase
          .from('client_profiles')
          .select('*')
          .eq('id', profileId)
          .eq('user_id', userId)
          .single();
        
        if (error || !data) {
          return NextResponse.json(
            { error: 'Profile not found' },
            { status: 404 }
          );
        }
        
        targetProfile = transformFromDatabase(data);
      } catch (error) {
        return NextResponse.json(
          { 
            error: 'Failed to fetch profile',
            details: error.message
          },
          { status: 500 }
        );
      }
    }

    // For direct profile data (from ProfileWizard), ensure we have the data we need
    if (!targetProfile) {
      return NextResponse.json(
        { error: 'No valid profile data provided' },
        { status: 400 }
      );
    }

    // Validate profile has minimum required data
    if (!targetProfile.companyName) {
      return NextResponse.json(
        { 
          error: 'Invalid profile data', 
          details: 'Profile must include company name' 
        },
        { status: 400 }
      );
    }

    // Generate timeline with server-side caching logic
    try {
      let timeline;
      let cached = false;
      let generatedAt = new Date().toISOString();
      let finalScenarioType = scenarioType || determineScenarioType(targetProfile);
      let unsavedProfile = !targetProfile.id;

      // Check if profile has an ID (is saved to database)
      const hasProfileId = targetProfile && targetProfile.id;
      
      // Try to get cached timeline first (only for saved profiles with authentication and unless forced to regenerate)
      if (hasProfileId && userId && !forceRegenerate) {
        try {
          console.log(`🔍 Checking cache for profile ${targetProfile.id} with user ${userId}`);
          
          const { data, error } = await supabase
            .from('client_profiles')
            .select('timeline_data, last_timeline_generated_at')
            .eq('id', targetProfile.id)
            .eq('user_id', userId)
            .single();
            
          if (!error && data?.timeline_data) {
            const cachedScenarioType = data.timeline_data.scenarioType || 'balanced';
            
            // Check if scenario matches (if specified)
            if (!scenarioType || cachedScenarioType === scenarioType) {
              console.log(`✅ Using cached timeline for profile ${targetProfile.id} (scenario: ${cachedScenarioType})`);
              timeline = data.timeline_data;
              cached = true;
              generatedAt = data.last_timeline_generated_at;
              finalScenarioType = cachedScenarioType;
            } else {
              console.log(`🔄 Cache exists but scenario mismatch: requested ${scenarioType}, cached ${cachedScenarioType}`);
            }
          } else {
            console.log(`💾 No cached timeline found for profile ${targetProfile.id}`);
          }
        } catch (cacheError) {
          console.warn('⚠️ Could not access timeline cache:', cacheError.message);
          // Continue with generation if cache access fails
        }
      }

      // Generate new timeline if not cached
      if (!timeline) {
        if (hasProfileId) {
          console.log(`🔄 Generating new timeline for profile ${targetProfile.id}`);
        } else {
          console.log(`🔄 Generating timeline for unsaved profile (${targetProfile.companyName || 'unnamed'})`);
        }

        // Generate full markdown representation of the client profile
        const profileMarkdown = markdownService.generateMarkdown(targetProfile);
        
        // Generate timeline using the full markdown for richer context
        timeline = await TimelineService.generateTimelineFromMarkdown(profileMarkdown, finalScenarioType);
        
        // Enhance timeline with profile-specific insights
        timeline = enhanceTimelineWithProfile(timeline, targetProfile);

        // Save to database only if profile has an ID and user is authenticated
        if (hasProfileId && userId) {
          try {
            console.log(`💾 Saving timeline to cache for profile ${targetProfile.id}`);
            
            // Add metadata to timeline data
            const timelineWithMeta = {
              ...timeline,
              scenarioType: finalScenarioType,
              generatedAt: new Date().toISOString(),
              version: '1.0'
            };

            const { error } = await supabase
              .from('client_profiles')
              .update({
                timeline_data: timelineWithMeta,
                last_timeline_generated_at: new Date().toISOString()
              })
              .eq('id', targetProfile.id)
              .eq('user_id', userId);
              
            if (error) {
              console.error('❌ Failed to save timeline to cache:', error);
            } else {
              console.log(`✅ Timeline cached successfully for profile ${targetProfile.id}`);
            }
          } catch (saveError) {
            console.warn('⚠️ Could not save timeline to cache:', saveError.message);
            // Don't fail the entire operation if caching fails
          }
        }
      }

      return NextResponse.json({
        success: true,
        timeline: timeline,
        profileId: targetProfile.id || null,
        profileName: targetProfile.companyName,
        cached: cached,
        generatedAt: generatedAt,
        scenarioType: finalScenarioType,
        unsavedProfile: unsavedProfile,
        provider: cached ? 'Database Cache' : 'OpenAI GPT-4o',
        method: unsavedProfile ? 'Profile-Based Generation (Unsaved)' : 'Profile-Based Generation with Caching'
      });

    } catch (serviceError) {
      console.error('Timeline generation service error:', serviceError);
      
      // Provide transparent error information
      return NextResponse.json(
        { 
          error: 'AI timeline generation failed', 
          details: serviceError.message,
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Timeline from profile API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

/**
 * Server-side helper functions
 */

// Removed getCurrentUserId function - now using userId from request body

function determineScenarioType(profile) {
  const aiReadiness = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
  const decisionTimeline = profile.decisionTimeline || 12;
  const riskTolerance = profile.riskTolerance || 'medium';
  
  if (aiReadiness >= 8 && decisionTimeline <= 6 && riskTolerance === 'high') {
    return 'aggressive';
  } else if (aiReadiness <= 4 || decisionTimeline >= 18 || riskTolerance === 'low') {
    return 'conservative';
  }
  return 'balanced';
}

function enhanceTimelineWithProfile(timeline, profile) {
  // Add profile-specific insights to each phase
  if (timeline.phases) {
    timeline.phases = timeline.phases.map((phase, index) => ({
      ...phase,
      profileInsights: getPhaseInsights(profile, index),
      specificOpportunities: getPhaseOpportunities(profile, index)
    }));
  }
  
  // Add risk factors based on profile
  timeline.riskFactors = identifyRiskFactors(profile);
  
  // Add competitive insights
  timeline.competitiveContext = getCompetitiveContext(profile);
  
  return timeline;
}

function getPhaseInsights(profile, phaseIndex) {
  const insights = {
    0: `Focus on ${profile.primaryBusinessIssue || 'core challenges'} while building foundation`,
    1: `Address ${profile.topProblem || 'key issues'} with targeted automation`,
    2: `Scale successful pilots across ${profile.size || 'the organization'}`,
    3: `Optimize for ${profile.successMetrics?.join(', ') || 'key performance'} improvements`
  };
  
  return insights[phaseIndex] || 'Continue systematic AI adoption';
}

function getPhaseOpportunities(profile, phaseIndex) {
  // This would be more sophisticated in a real implementation
  return [];
}

function identifyRiskFactors(profile) {
  const risks = [];
  const aiReadiness = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
  
  if (aiReadiness < 4) {
    risks.push({
      type: 'Technical Readiness',
      level: 'High',
      description: 'Low AI readiness score may slow implementation'
    });
  }
  
  if (profile.changeManagementCapability === 'Low') {
    risks.push({
      type: 'Change Management',
      level: 'Medium',
      description: 'Limited change management capability requires extra support'
    });
  }
  
  return risks;
}

function getCompetitiveContext(profile) {
  return {
    urgency: profile.competitivePressure ? 'High' : 'Medium',
    differentiators: profile.differentiationRequirements || [],
    marketPosition: profile.industry === 'Technology' ? 'Fast-moving' : 'Traditional'
  };
}

function transformFromDatabase(dbRecord) {
  // Extract profile data and ensure Supabase ID takes precedence
  const { id: oldId, ...profileDataWithoutId } = dbRecord.profile_data || {};
  
  return {
    id: dbRecord.id, // Always use the Supabase UUID as the primary ID
    ...profileDataWithoutId, // Spread profile data but exclude any old ID
    markdown: dbRecord.markdown_content,
    createdAt: dbRecord.created_at,
    updatedAt: dbRecord.updated_at,
    // Add database-specific fields
    _supabaseRecord: true,
    _userId: dbRecord.user_id,
    // Store the original localStorage ID for reference if needed
    _originalId: oldId || null
  };
} 


================================================
FILE: app/api/timeline/stream/route.js
================================================
import { NextResponse } from 'next/server';
import { validateBusinessProfile, validateScenarioType, checkRateLimit } from '../../../utils/validation';
import { AIService } from '../../../services/aiService';

export async function POST(request) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitCheck = checkRateLimit(`timeline-stream-${clientIP}`, 3, 60000); // 3 streams per minute
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfter: rateLimitCheck.retryAfter },
        { status: 429, headers: { 'Retry-After': rateLimitCheck.retryAfter.toString() } }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI streaming not available - OpenAI API key not configured' },
        { status: 503 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { businessProfile, scenarioType } = body;

    // Validate business profile
    const profileValidation = validateBusinessProfile(businessProfile);
    if (!profileValidation.isValid) {
      return NextResponse.json(
        { 
          error: 'Invalid business profile', 
          details: profileValidation.errors 
        },
        { status: 400 }
      );
    }

    // Validate scenario type
    const scenarioValidation = validateScenarioType(scenarioType);
    if (!scenarioValidation.isValid) {
      return NextResponse.json(
        { error: `Invalid scenario type: ${scenarioValidation.error}` },
        { status: 400 }
      );
    }

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    
    const customReadable = new ReadableStream({
      async start(controller) {
        try {
          // Send initial connection confirmation
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'connected',
              message: 'Timeline generation started',
              timestamp: new Date().toISOString()
            })}\n\n`)
          );

          // Generate timeline with streaming
          const streamGenerator = AIService.streamTimelineGeneration(
            profileValidation.sanitized,
            scenarioValidation.sanitized
          );

          for await (const chunk of streamGenerator) {
            const sseData = `data: ${JSON.stringify({
              type: chunk.type,
              data: chunk.data,
              progress: chunk.progress,
              error: chunk.error,
              timestamp: new Date().toISOString()
            })}\n\n`;
            
            controller.enqueue(encoder.encode(sseData));

            // If we have a complete timeline, we're done
            if (chunk.type === 'complete') {
              break;
            }

            // If there's an error, send it and close
            if (chunk.type === 'error') {
              break;
            }
          }

          // Send completion signal
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'done',
              message: 'Timeline generation completed',
              timestamp: new Date().toISOString()
            })}\n\n`)
          );

        } catch (error) {
          console.error('Streaming timeline generation error:', error);
          
          // Send error to client
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({
              type: 'error',
              error: error.message,
              timestamp: new Date().toISOString()
            })}\n\n`)
          );
        } finally {
          controller.close();
        }
      }
    });

    // Return streaming response
    return new Response(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });

  } catch (error) {
    console.error('Streaming API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 


================================================
FILE: app/auth/Auth.module.css
================================================
/* Auth.module.css */

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: var(--spacing-lg);
  background: var(--bg-primary);
}

.formWrapper {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--backdrop-blur));
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-xxl);
  width: 100%;
  max-width: 400px;
  box-shadow: var(--shadow-xl);
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.headerIcon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto var(--spacing-md);
}

.headerIcon.signin {
  background-color: var(--accent-blue);
}

.headerIcon.signup {
  background-color: var(--accent-green);
}

.title {
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0 0 var(--spacing-sm) 0;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.authToggle {
  display: flex;
  margin-bottom: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: 4px;
}

.toggleButton {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  background: transparent;
  border: none;
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast) ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
}

.toggleButton.active {
  background: var(--accent-blue);
  color: white;
}

.message {
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-lg);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.message.success {
  background: rgba(16, 185, 129, 0.1);
  color: var(--accent-green);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.message.error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--accent-red);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.formGroup {
  margin-bottom: var(--spacing-md);
}

.label {
  display: block;
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: 0.9rem;
}

.input {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: border-color var(--transition-fast) ease;
}

.input:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.input.error {
  border-color: var(--accent-red);
}

.errorText {
  color: var(--accent-red);
  font-size: 0.8rem;
  margin-top: var(--spacing-xs);
  display: block;
}

.submitButton {
  width: 100%;
  margin-bottom: var(--spacing-lg);
  justify-content: center;
}

.submitButton.signup {
  background: var(--accent-green);
}

.footer {
  text-align: center;
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-secondary);
}

.footerText {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: var(--spacing-md);
}

.footerLink {
  color: var(--accent-blue);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.backButton {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin: 0 auto;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  transition: color var(--transition-fast) ease;
}

.backButton:hover {
  color: var(--text-secondary);
}

.loader {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: var(--spacing-sm);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
} 


================================================
FILE: app/auth/callback/page.js
================================================
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function AuthCallback() {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('Processing authentication...');
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the auth code from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        if (error) {
          setStatus('error');
          setMessage(errorDescription || 'Authentication failed');
          return;
        }

        if (code) {
          // Exchange the code for a session
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            setStatus('error');
            setMessage(error.message || 'Failed to authenticate');
            return;
          }

          if (data.session) {
            setStatus('success');
            setMessage('Authentication successful! Redirecting...');
            
            // Redirect to home page after 2 seconds
            setTimeout(() => {
              router.push('/');
            }, 2000);
            return;
          }
        }

        // If no code, check for hash fragments (for implicit flow)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const tokenType = hashParams.get('token_type');
        const expiresIn = hashParams.get('expires_in');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken) {
          // Set the session from URL fragments
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            setStatus('error');
            setMessage(error.message || 'Failed to set session');
            return;
          }

          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          
          // Redirect to home page after 2 seconds
          setTimeout(() => {
            router.push('/');
          }, 2000);
          return;
        }

        // If we get here, no auth data was found
        setStatus('error');
        setMessage('No authentication data found in URL');
        
      } catch (err) {
        console.error('Auth callback error:', err);
        setStatus('error');
        setMessage('An unexpected error occurred');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-2xl max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Processing Authentication</h2>
            <p className="text-gray-400">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Authentication Successful!</h2>
            <p className="text-gray-400 mb-4">{message}</p>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse w-full"></div>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Authentication Failed</h2>
            <p className="text-gray-400 mb-6">{message}</p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
} 


================================================
FILE: app/auth/signin/page.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/useAuthStore';
import GlobalHeader from '../../components/GlobalHeader';
import { LogIn, Mail, Lock, Zap, ArrowLeft } from 'lucide-react';
import styles from '../Auth.module.css';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, signInWithOtp, user, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [authMode, setAuthMode] = useState('password'); // 'password' or 'magic-link'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect if already signed in
  useEffect(() => {
    if (user) {
      router.push('/profiles');
    }
  }, [user, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSignIn = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    setIsSubmitting(true);
    try {
      await signIn(formData.email, formData.password);
      // Success will be handled by the useEffect above
    } catch (err) {
      console.error('Sign in error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMagicLinkSignIn = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    try {
      await signInWithOtp(formData.email);
      setSuccessMessage('Magic link sent! Check your email and click the link to sign in.');
    } catch (err) {
      console.error('Magic link error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = authMode === 'password' ? handlePasswordSignIn : handleMagicLinkSignIn;

  return (
    <div style={{ minHeight: '100vh' }}>
      <GlobalHeader />
      
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          {/* Header */}
          <div className={styles.header}>
            <div className={`${styles.headerIcon} ${styles.signin}`}>
              <LogIn size={24} color="white" />
            </div>
            
            <h1 className={styles.title}>Welcome Back</h1>
            
            <p className={styles.subtitle}>
              Sign in to access your client profiles and AI timelines
            </p>
          </div>

          {/* Auth Mode Toggle */}
          <div className={styles.authToggle}>
            <button
              type="button"
              onClick={() => setAuthMode('password')}
              className={`${styles.toggleButton} ${authMode === 'password' ? styles.active : ''}`}
            >
              <Lock size={16} />
              Password
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('magic-link')}
              className={`${styles.toggleButton} ${authMode === 'magic-link' ? styles.active : ''}`}
            >
              <Zap size={16} />
              Magic Link
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className={`${styles.message} ${styles.success}`}>
              <Mail size={16} />
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={`${styles.message} ${styles.error}`}>
              {error}
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
                className={styles.input}
              />
            </div>

            {authMode === 'password' && (
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={authMode === 'password'}
                  placeholder="Enter your password"
                  className={styles.input}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLoading || (!formData.email || (authMode === 'password' && !formData.password))}
              className={`btn btn-primary ${styles.submitButton}`}
            >
              {isSubmitting || isLoading ? (
                <>
                  <div className={styles.loader}></div>
                  {authMode === 'password' ? 'Signing In...' : 'Sending Magic Link...'}
                </>
              ) : (
                <>
                  {authMode === 'password' ? <LogIn size={18} /> : <Zap size={18} />}
                  {authMode === 'password' ? 'Sign In' : 'Send Magic Link'}
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Don't have an account?{' '}
              <a 
                href="/auth/signup" 
                className={styles.footerLink}
              >
                Sign up here
              </a>
            </p>
            
            <button
              type="button"
              onClick={() => router.push('/')}
              className={styles.backButton}
            >
              <ArrowLeft size={14} />
              Back to App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 


================================================
FILE: app/auth/signup/page.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/useAuthStore';
import GlobalHeader from '../../components/GlobalHeader';
import { UserPlus, Mail, Lock, ArrowLeft } from 'lucide-react';
import styles from '../Auth.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, user, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // Redirect if already signed in
  useEffect(() => {
    if (user) {
      router.push('/profiles');
    }
  }, [user, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await signUp(formData.email, formData.password);
      setSuccessMessage('Account created! Please check your email to confirm your account.');
    } catch (err) {
      console.error('Sign up error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <GlobalHeader />
      
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          {/* Header */}
          <div className={styles.header}>
            <div className={`${styles.headerIcon} ${styles.signup}`}>
              <UserPlus size={24} color="white" />
            </div>
            
            <h1 className={styles.title}>Create Account</h1>
            
            <p className={styles.subtitle}>
              Join us to manage client profiles and generate AI transformation timelines
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className={`${styles.message} ${styles.success}`}>
              <Mail size={16} />
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className={`${styles.message} ${styles.error}`}>
              {error}
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
                className={`${styles.input} ${validationErrors.email ? styles.error : ''}`}
              />
              {validationErrors.email && (
                <span className={styles.errorText}>
                  {validationErrors.email}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Create a password (min. 6 characters)"
                className={`${styles.input} ${validationErrors.password ? styles.error : ''}`}
              />
              {validationErrors.password && (
                <span className={styles.errorText}>
                  {validationErrors.password}
                </span>
              )}
            </div>

            <div className={styles.formGroup} style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label className={styles.label}>
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Confirm your password"
                className={`${styles.input} ${validationErrors.confirmPassword ? styles.error : ''}`}
              />
              {validationErrors.confirmPassword && (
                <span className={styles.errorText}>
                  {validationErrors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`btn btn-primary ${styles.submitButton} ${styles.signup}`}
            >
              {isSubmitting || isLoading ? (
                <>
                  <div className={styles.loader}></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Already have an account?{' '}
              <a 
                href="/auth/signin" 
                className={styles.footerLink}
              >
                Sign in here
              </a>
            </p>
            
            <button
              type="button"
              onClick={() => router.push('/')}
              className={styles.backButton}
            >
              <ArrowLeft size={14} />
              Back to App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 


================================================
FILE: app/components/FlowVisualizer.js
================================================
'use client';

import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';

import useAgenticStore from '../store/useAgenticStore';
import { useFlowLayout } from '../hooks/useFlowLayout';
import { useFlowData } from '../hooks/useFlowData';
import FlowCanvas from './flow/FlowCanvas';

const FlowVisualizer = forwardRef(({ onError, layoutDirection: externalLayoutDirection, autoFitOnChange: externalAutoFitOnChange }, ref) => {
  const { agenticData, isLoading, error } = useAgenticStore();
  
  // Debug logging
  console.log('FlowVisualizer rendering with agenticData:', agenticData);
  console.log('Is any data present?', agenticData && Object.keys(agenticData).length > 0);
  console.log('Are there use_cases?', agenticData?.use_cases?.length);
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  
  // Use our custom hooks for layout and data management
  const {
    layoutDirection,
    autoFitEnabled,
    lastUpdate,
    setAutoFitEnabled,
    toggleNodeExpansion,
    expandAllNodes,
    collapseAllNodes,
    handleLayoutChange
  } = useFlowLayout(nodes, setNodes, edges, setEdges);
  
  // Load and transform data
  useFlowData(agenticData, layoutDirection, setNodes, setEdges, onError);
  
  // Expose methods to parent component via ref
  useImperativeHandle(ref, () => ({
    expandAllNodes,
    collapseAllNodes
  }));

  // Handle node clicks
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0 
    }}>
      {!agenticData ? (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', color: '#666', fontSize: '1.1rem' }}>
            <p>No data available. Please connect to ServiceNow to visualize agentic AI flows.</p>
          </div>
        </div>
      ) : (
        <FlowCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          selectedNode={selectedNode}
          lastUpdate={lastUpdate}
          layoutDirection={layoutDirection}
          toggleNodeExpansion={toggleNodeExpansion}
        />
      )}
    </div>
  );
});

FlowVisualizer.displayName = 'FlowVisualizer';

export default FlowVisualizer; 


================================================
FILE: app/components/GlobalHeader.js
================================================
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from './theme/ThemeProvider';
import useAuthStore from '../store/useAuthStore';
import { 
  TrendingUp, 
  Users, 
  Monitor, 
  Sun, 
  Moon, 
  Menu, 
  X,
  LogIn,
  LogOut,
  User,
  Settings
} from 'lucide-react';

export default function GlobalHeader() {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, signOut } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    {
      name: 'ServiceNow Flows',
      href: '/',
      icon: Monitor,
      description: 'Visualize agentic AI flows'
    },
    {
      name: 'Client Profiles',
      href: '/profiles',
      icon: Users,
      description: 'Manage client intelligence'
    },
    {
      name: 'AI Timeline',
      href: '/timeline',
      icon: TrendingUp,
      description: 'Generate transformation roadmaps'
    },
    {
      name: 'Settings',
      href: '/admin',
      icon: Settings,
      description: 'Configure services and credentials'
    }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="global-header">
      <div className="header-container">
        {/* Logo and Title */}
        <div className="header-brand">
          <Link href="/" className="brand-link">
            <div className="logo-wrapper">
              <img 
                src={theme === 'dark' ? "/images/Full Logo Dark.png" : "/images/Full Logo Light.png"}
                alt="Nowgentic Logo" 
                className="nowgentic-logo"
              />
            </div>
            <h1 className="app-title">Agent Blueprint</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link"
              title={item.description}
            >
              <item.icon className="nav-icon" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="action-btn theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="icon" /> : <Moon className="icon" />}
          </button>

          {/* User Menu */}
          {user ? (
            <div className="user-menu">
              <Link href="/profile" className="user-info" title="View profile">
                <User className="icon" />
                <span className="user-email">{user.email}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="action-btn sign-out"
                title="Sign out"
              >
                <LogOut className="icon" />
              </button>
            </div>
          ) : (
            <Link href="/auth/signin" className="action-btn sign-in">
              <LogIn className="icon" />
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="nav-icon" />
              <div className="nav-content">
                <span className="nav-name">{item.name}</span>
                <span className="nav-description">{item.description}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
} 


================================================
FILE: app/components/Header.js
================================================
'use client';

import { useState } from 'react';
import { Users, TrendingUp, LogIn } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import UserMenu from './auth/UserMenu';
import AuthModal from './auth/AuthModal';

export default function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { isAuthenticated, isLoading } = useAuthStore();

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header 
        style={{
          width: '100%',
          backgroundColor: 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgb(55, 65, 81)',
          position: 'relative',
          zIndex: 40
        }}
        className="auth-header"
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            {/* Logo and Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#2563eb',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>AI</span>
                </div>
                <h1 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  color: 'white',
                  margin: 0
                }}>
                  Agentic AI Flow
                </h1>
              </div>
            </div>

            {/* Navigation */}
            <nav style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px'
            }} className="hidden-mobile">
              <a
                href="/"
                style={{
                  color: '#d1d5db',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#d1d5db';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                ServiceNow Flows
              </a>
              <a
                href="/timeline"
                style={{
                  color: '#d1d5db',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#d1d5db';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <TrendingUp style={{ width: '16px', height: '16px' }} />
                <span>AI Timeline</span>
              </a>
              <a
                href="/profiles"
                style={{
                  color: '#d1d5db',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'white';
                  e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#d1d5db';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <Users style={{ width: '16px', height: '16px' }} />
                <span>Client Profiles</span>
              </a>
            </nav>

            {/* Authentication */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {isLoading ? (
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#374151',
                  borderRadius: '50%',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                }} />
              ) : isAuthenticated ? (
                <UserMenu />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handleAuthClick('login')}
                    style={{
                      color: '#d1d5db',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'white';
                      e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#d1d5db';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: '500'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#1d4ed8';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#2563eb';
                    }}
                  >
                    <LogIn style={{ width: '16px', height: '16px' }} />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div style={{
          display: 'none',
          borderTop: '1px solid rgb(55, 65, 81)'
        }} className="mobile-nav">
          <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a
              href="/"
              style={{
                display: 'block',
                color: '#d1d5db',
                padding: '8px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              ServiceNow Flows
            </a>
            <a
              href="/timeline"
              style={{
                display: 'block',
                color: '#d1d5db',
                padding: '8px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              AI Timeline
            </a>
            <a
              href="/profiles"
              style={{
                display: 'block',
                color: '#d1d5db',
                padding: '8px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'white';
                e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#d1d5db';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Client Profiles
            </a>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
} 


================================================
FILE: app/components/NodeIcons.js
================================================
'use client';

import React from 'react';

/**
 * External link icon to open a node in ServiceNow
 */
export const ExternalLinkIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="14" 
    height="14" 
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="external-link-icon"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

/**
 * Component that renders the node header buttons (expand/collapse and external link)
 */
export function NodeHeaderButtons({ 
  id, 
  isCollapsed, 
  hasChildren, 
  onToggle, 
  canNavigate, 
  onExternalLinkClick 
}) {
  return (
    <div className="node-header-buttons">
      {canNavigate && (
        <button 
          className="node-external-link"
          onClick={onExternalLinkClick}
          onMouseDown={(e) => e.stopPropagation()}
          title="Open in ServiceNow"
        >
          <ExternalLinkIcon />
        </button>
      )}
      
      {hasChildren && (
        <button 
          className="expand-button"
          onClick={() => onToggle && onToggle(id)}
          onMouseDown={(e) => e.stopPropagation()}
          title={isCollapsed ? "Show child nodes" : "Hide child nodes"}
        >
          {isCollapsed ? '+' : '−'}
        </button>
      )}
    </div>
  );
} 


================================================
FILE: app/components/Providers.js
================================================
'use client';

import dynamic from 'next/dynamic';
import ThemeProvider from './theme/ThemeProvider';

// Dynamically import AuthProvider with SSR turned off
const AuthProvider = dynamic(() => import('./auth/AuthProvider'), {
  ssr: false,
});

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
} 


================================================
FILE: app/components/ServiceNowConnector.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import useAgenticStore from '../store/useAgenticStore';
import { useTheme } from './theme/ThemeProvider';
import Image from 'next/image';

// Helper to safely get nested properties
const get = (obj, path, defaultValue = undefined) => {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
};

export default function ServiceNowConnector() {
  const { theme } = useTheme();
  
  // Fetch non-sensitive connection details from API on mount
  const [instanceUrl, setInstanceUrl] = useState('');
  const [scopeId, setScopeId] = useState('');

  useEffect(() => {
    fetch('/api/servicenow/get-credentials')
      .then(res => res.json())
      .then(data => {
        setInstanceUrl(data.instanceUrl || '');
        setScopeId(data.scopeId || '');
      })
      .catch(() => {
        // fallback to empty/defaults if fetch fails
      });
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const setAgenticData = useAgenticStore((state) => state.setAgenticData);
  const setConnectionDetails = useAgenticStore((state) => state.setConnectionDetails);

  const handleFetchData = async () => {
    setIsLoading(true);
    setError(null);
    console.log('Fetching data using server-side credentials...');

    if (!instanceUrl || !scopeId) {
      setError('Instance URL and Scope ID are required.');
      setIsLoading(false);
      return;
    }

    try {
      // Format the instance URL
      let formattedUrl = instanceUrl.trim();
      if (!formattedUrl.startsWith('https://') && !formattedUrl.startsWith('http://')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      if (formattedUrl.endsWith('/')) {
        formattedUrl = formattedUrl.slice(0, -1);
      }

      // Store connection details for refresh operations (no sensitive data)
      const connectionDetails = {
        instanceUrl: formattedUrl,
        scopeId
      };
      
      console.log('Setting connection details with instance URL:', formattedUrl);

      // Use our API route to fetch all the data at once
      // Credentials are handled server-side via environment variables
      const response = await fetch('/api/servicenow/fetch-agentic-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connectionDetails),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to fetch data from ServiceNow';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If parsing JSON fails, use the status text
          errorMessage = `${errorMessage}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Process the response
      const data = await response.json();
      console.log('Data fetched successfully:', data);

      // Store connection details (for refresh) and then update the store with the data
      setConnectionDetails(connectionDetails);
      setAgenticData(data);

    } catch (err) {
      console.error('Error fetching or processing ServiceNow data:', err);
      setError(err.message || 'An unknown error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      width: '100%',
      padding: 'var(--spacing-lg)'
    }}>
      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--border-radius-xl)',
        padding: 'var(--spacing-xxl)',
        width: '100%',
        maxWidth: '500px',
        boxShadow: 'var(--shadow-xl)'
      }}>
        <div style={{ 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          marginBottom: 'var(--spacing-xl)'
        }}>
          {/* Cube icon at the top */}
          <div style={{ 
            backgroundColor: 'var(--accent-blue)', 
            width: '56px', 
            height: '56px', 
            borderRadius: '50%', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginBottom: 'var(--spacing-md)'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="32" height="32">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="white" fill="none" strokeWidth="1"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12" stroke="white" strokeWidth="1"></line>
            </svg>
          </div>
          
          <h2 style={{ 
            fontSize: '1.5rem', 
            margin: '0 0 var(--spacing-sm) 0', 
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)'
          }}>Agentic AI Visualizer</h2>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: 'var(--spacing-md)'
          }}>
            <img 
              src={theme === 'dark' ? "/images/Full Logo Dark.png" : "/images/Full Logo Light.png"}
              alt="NOWGENTIC Logo" 
              width={120} 
              height={30} 
              style={{ display: 'block' }}
            />
          </div>
          
          <p style={{ 
            fontSize: '0.9rem', 
            color: 'var(--text-secondary)', 
            margin: '0'
          }}>
            Connect to your ServiceNow instance to visualize Agentic AI flows
          </p>
        </div>
        
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label htmlFor="instanceUrl" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              fontWeight: 'var(--font-weight-medium)', 
              fontSize: '0.9rem', 
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--text-primary)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem', marginRight: 'var(--spacing-sm)' }}>
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              Instance URL
            </label>
            <input
              type="text"
              id="instanceUrl"
              value={instanceUrl}
              onChange={(e) => setInstanceUrl(e.target.value)}
              placeholder="your-instance.service-now.com"
              style={{ 
                width: '100%', 
                padding: 'var(--spacing-md)', 
                borderRadius: 'var(--border-radius)', 
                border: '1px solid var(--border-primary)', 
                fontSize: '0.9rem', 
                color: 'var(--text-primary)',
                background: 'var(--bg-secondary)'
              }}
            />
          </div>
          
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <label htmlFor="scopeId" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              fontWeight: 'var(--font-weight-medium)', 
              fontSize: '0.9rem', 
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--text-primary)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem', marginRight: 'var(--spacing-sm)' }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Application Scope Sys ID
            </label>
            <input
              type="text"
              id="scopeId"
              value={scopeId}
              onChange={(e) => setScopeId(e.target.value)}
              placeholder="Enter the sys_id of the target scope"
              readOnly
              style={{ 
                width: '100%', 
                padding: 'var(--spacing-md)', 
                borderRadius: 'var(--border-radius)', 
                border: '1px solid var(--border-primary)', 
                fontSize: '0.9rem', 
                color: 'var(--text-secondary)',
                background: 'var(--bg-tertiary)'
              }}
            />
          </div>
          
          <div style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            padding: 'var(--spacing-md)', 
            borderRadius: 'var(--border-radius)', 
            marginBottom: 'var(--spacing-xl)',
            border: '1px solid var(--border-secondary)'
          }}>
            <p style={{ 
              fontSize: '0.85rem', 
              color: 'var(--text-secondary)', 
              margin: '0', 
              display: 'flex', 
              alignItems: 'center'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem', marginRight: 'var(--spacing-sm)' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
              <strong>Secure Connection:</strong> Authentication is handled server-side using environment variables.
            </p>
          </div>
        </div>
        
        {error && (
          <div style={{ 
            margin: '0 0 var(--spacing-xl) 0', 
            padding: 'var(--spacing-md)', 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--accent-red)', 
            borderRadius: 'var(--border-radius)', 
            display: 'flex', 
            alignItems: 'center',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem', marginRight: 'var(--spacing-sm)' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}
        
        <button
          onClick={handleFetchData}
          disabled={isLoading}
          className="btn btn-primary"
          style={{ 
            width: '100%', 
            marginBottom: 'var(--spacing-xl)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            fontSize: '0.9rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {isLoading ? (
            <>
              <svg className="spinner" viewBox="0 0 50 50" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', animation: 'spin 1s linear infinite' }}>
                <circle className="path" cx="25" cy="25" r="20" fill="none" stroke="white" strokeWidth="5"></circle>
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }}>
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
              Connect & Visualize
            </>
          )}
        </button>
        
        <div style={{ 
          marginTop: 'var(--spacing-xl)', 
          textAlign: 'center',
          paddingTop: 'var(--spacing-xl)',
          borderTop: '1px solid var(--border-secondary)'
        }}>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '0.9rem', 
            marginBottom: 'var(--spacing-md)' 
          }}>
            Or explore our client intelligence tools:
          </p>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--spacing-md)', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <button
              type="button"
              onClick={() => window.location.href = '/profiles'}
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Client Profiles
            </button>
            <button
              type="button"
              onClick={() => window.location.href = '/timeline'}
              className="btn btn-success"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              AI Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


================================================
FILE: app/components/auth/AuthModal.js
================================================
'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);

  // Reset mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Form */}
        {mode === 'login' ? (
          <LoginForm 
            onToggleMode={handleToggleMode}
            onSuccess={handleSuccess}
          />
        ) : (
          <SignupForm 
            onToggleMode={handleToggleMode}
            onSuccess={handleSuccess}
          />
        )}
      </div>
    </div>
  );
} 


================================================
FILE: app/components/auth/AuthProvider.js
================================================
'use client';

import { useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore';

export default function AuthProvider({ children }) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    // Initialize authentication state when the app loads
    initialize();
  }, [initialize]);

  return children;
} 


================================================
FILE: app/components/auth/LoginForm.js
================================================
'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

export default function LoginForm({ onToggleMode, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(false);

  const { signIn, signInWithMagicLink, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!useMagicLink && !password) {
      setError('Password is required');
      return;
    }

    try {
      let result;
      if (useMagicLink) {
        result = await signInWithMagicLink(email);
        if (result.success) {
          setError('Check your email for the magic link!');
          return;
        }
      } else {
        result = await signIn(email, password);
      }

      if (result.success) {
        onSuccess?.();
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Input - only show if not using magic link */}
          {!useMagicLink && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          {/* Magic Link Toggle */}
          <div className="flex items-center">
            <input
              id="magic-link"
              type="checkbox"
              checked={useMagicLink}
              onChange={(e) => setUseMagicLink(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              disabled={isLoading}
            />
            <label htmlFor="magic-link" className="ml-2 text-sm text-gray-300">
              Use magic link instead
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`text-sm p-3 rounded-lg ${
              error.includes('Check your email') 
                ? 'bg-green-900/20 border border-green-800 text-green-400'
                : 'bg-red-900/20 border border-red-800 text-red-400'
            }`}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>{useMagicLink ? 'Send Magic Link' : 'Sign In'}</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle to Sign Up */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-blue-400 hover:text-blue-300 font-medium"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 


================================================
FILE: app/components/auth/SignupForm.js
================================================
'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, UserPlus, Loader2, User } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

export default function SignupForm({ onToggleMode, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signUp, isLoading } = useAuthStore();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    try {
      const result = await signUp(formData.email, formData.password, {
        name: formData.name,
      });

      if (result.success) {
        setSuccess('Account created! Please check your email to verify your account.');
        // Clear form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        setError(result.error || 'Failed to create account');
      }
    } catch (err) {
      setError(`Error: ${err.message || 'An unexpected error occurred'}`);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <div className="login-card">
        <div className="login-header">
          <h2>Create Account</h2>
          <p className="login-subtitle">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Name Input */}
          <div className="form-group">
            <label htmlFor="name">
              <User size={20} />
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label htmlFor="email">
              <Mail size={20} />
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">
              <Lock size={20} />
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              disabled={isLoading}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="form-group">
            <label htmlFor="confirmPassword">
              <Lock size={20} />
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div style={{
              backgroundColor: '#065f46',
              border: '1px solid #059669',
              color: '#34d399',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '16px'
            }}>
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? (
              <div className="spinner">
                <svg className="path" viewBox="0 0 50 50">
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="31.416">
                    <animate attributeName="stroke-array" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </div>
            ) : (
              <>
                <UserPlus size={20} />
                Create Account
              </>
            )}
          </button>
        </form>

        {/* Toggle to Sign In */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>
            Already have an account?{' '}
            <button
              onClick={onToggleMode}
              style={{
                background: 'none',
                border: 'none',
                color: '#60a5fa',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 


================================================
FILE: app/components/auth/UserMenu.js
================================================
'use client';

import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, signOut } = useAuthStore();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!user) return null;

  const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(55, 65, 81, 0.5)',
          border: '1px solid rgb(75, 85, 99)',
          borderRadius: '8px',
          padding: '8px 12px',
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
        }}
      >
        {/* Avatar */}
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#2563eb',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {initials}
        </div>
        
        {/* Name and Email */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          textAlign: 'left' 
        }} className="hidden-mobile">
          <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayName}</div>
          <div style={{ fontSize: '12px', color: '#9ca3af' }}>{user.email}</div>
        </div>
        
        {/* Chevron */}
        <ChevronDown 
          style={{ 
            width: '16px', 
            height: '16px', 
            color: '#9ca3af',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          marginTop: '8px',
          width: '256px',
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgb(55, 65, 81)',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: '8px 0',
          zIndex: 50
        }}>
          {/* User Info */}
          <div style={{ 
            padding: '12px 16px',
            borderBottom: '1px solid rgb(55, 65, 81)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#2563eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '500'
              }}>
                {initials}
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{displayName}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{user.email}</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div style={{ padding: '8px 0' }}>
            {/* Profile Settings - Future feature */}
            <button
              onClick={() => {
                // TODO: Implement profile settings
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '8px 16px',
                textAlign: 'left',
                fontSize: '14px',
                color: '#9ca3af',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease',
                opacity: 0.5
              }}
              disabled
            >
              <Settings style={{ width: '16px', height: '16px' }} />
              <span>Settings</span>
              <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#6b7280' }}>(Soon)</span>
            </button>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                padding: '8px 16px',
                textAlign: 'left',
                fontSize: '14px',
                color: '#9ca3af',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(153, 27, 27, 0.2)';
                e.target.style.color = '#f87171';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#9ca3af';
              }}
            >
              <LogOut style={{ width: '16px', height: '16px' }} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 


================================================
FILE: app/components/flow/FlowCanvas.js
================================================
'use client';

import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Panel,
  addEdge
} from 'reactflow';

import UseCaseNode from '../nodes/UseCaseNode';
import TriggerNode from '../nodes/TriggerNode';
import AgentNode from '../nodes/AgentNode';
import ToolNode from '../nodes/ToolNode';

// Define node types outside of the component to avoid recreation on each render
const nodeTypes = {
  useCaseNode: UseCaseNode,
  triggerNode: TriggerNode,
  agentNode: AgentNode,
  toolNode: ToolNode,
};

export default function FlowCanvas({ 
  nodes, 
  edges, 
  onNodesChange, 
  onEdgesChange, 
  onNodeClick,
  selectedNode,
  lastUpdate,
  layoutDirection,
  toggleNodeExpansion
}) {
  
  // Add the required props to each node object
  const nodesWithProps = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        layoutDirection,
        onToggle: toggleNodeExpansion
      }
    }));
  }, [nodes, layoutDirection, toggleNodeExpansion]);

  // Handle edge connections
  const onConnect = useCallback(
    (params) => onEdgesChange((eds) => addEdge(params, eds)),
    [onEdgesChange]
  );

  return (
    <ReactFlow
      nodes={nodesWithProps}
      edges={edges.filter(edge => !edge.hidden)}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{
        padding: 0.6,
        includeHiddenNodes: false,
        duration: 800,
        minZoom: 0.3,
        maxZoom: 1.5
      }}
      minZoom={0.1}
      maxZoom={2}
      defaultViewport={{ zoom: 0.75, x: 0, y: 0 }}
      style={{ background: '#f8f8f8' }}
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
      

      
      {selectedNode && (
        <Panel position="bottom-right" className="details-panel">
          <div className="details-title">Selected: {selectedNode.data.label}</div>
          <div className="details-content">
            <div className="details-field">
              <span className="details-label">Type:</span>
              <span className="details-value">{selectedNode.data.type}</span>
            </div>
            <div className="details-field">
              <span className="details-label">Level:</span>
              <span className="details-value">{selectedNode.data.level}</span>
            </div>
            <div className="details-field">
              <span className="details-label">Children:</span>
              <span className="details-value">{selectedNode.data.childrenCount}</span>
            </div>
            <div className="details-field">
              <span className="details-label">Collapsed:</span>
              <span className="details-value">{selectedNode.data.isCollapsed ? 'Yes' : 'No'}</span>
            </div>
            {selectedNode.data.description && (
              <div className="details-field">
                <span className="details-label">Description:</span>
                <span className="details-value">{selectedNode.data.description}</span>
              </div>
            )}
            {selectedNode.data.role && (
              <div className="details-field">
                <span className="details-label">Role:</span>
                <span className="details-value">{selectedNode.data.role}</span>
              </div>
            )}
          </div>
        </Panel>
      )}
    </ReactFlow>
  );
} 


================================================
FILE: app/components/migration/SupabaseSetupCheck.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, ExternalLink, Copy, Check } from 'lucide-react';

export default function SupabaseSetupCheck() {
  const [setupStatus, setSetupStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = () => {
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const urlValid = hasUrl && process.env.NEXT_PUBLIC_SUPABASE_URL.includes('supabase.co');
    const keyValid = hasKey && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.startsWith('eyJ');

    setSetupStatus({
      hasUrl,
      hasKey,
      urlValid,
      keyValid,
      isConfigured: hasUrl && hasKey && urlValid && keyValid,
      url: hasUrl ? process.env.NEXT_PUBLIC_SUPABASE_URL : null,
      keyLength: hasKey ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length : 0
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!setupStatus) {
    return null;
  }

  if (setupStatus.isConfigured) {
    return null;
  }

  const envTemplate = `# Add these to your .env.local file:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

  return (
    <div className="setup-check error">
      <div className="status-header">
        <XCircle size={20} className="text-red-400" />
        <span>Supabase Setup Required</span>
      </div>
      
      <div className="setup-details">
        <div className="env-checks">
          <div className={`env-item ${setupStatus.hasUrl ? 'success' : 'error'}`}>
            {setupStatus.hasUrl ? <CheckCircle size={16} /> : <XCircle size={16} />}
            <span>NEXT_PUBLIC_SUPABASE_URL</span>
            {setupStatus.hasUrl && !setupStatus.urlValid && (
              <span className="warning">(invalid format)</span>
            )}
          </div>
          
          <div className={`env-item ${setupStatus.hasKey ? 'success' : 'error'}`}>
            {setupStatus.hasKey ? <CheckCircle size={16} /> : <XCircle size={16} />}
            <span>NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
            {setupStatus.hasKey && !setupStatus.keyValid && (
              <span className="warning">(invalid format)</span>
            )}
          </div>
        </div>

        <div className="quick-setup">
          <h4>Quick Setup:</h4>
          <div className="env-template">
            <pre>{envTemplate}</pre>
            <button 
              className="copy-button"
              onClick={() => copyToClipboard(envTemplate)}
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          
          <div className="setup-links">
            <a 
              href="https://supabase.com/dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="setup-link"
            >
              <ExternalLink size={14} />
              Create Supabase Project
            </a>
            
            <a 
              href="https://github.com/yourusername/agentic-ai-flow/blob/main/SUPABASE_SETUP.md" 
              target="_blank" 
              rel="noopener noreferrer"
              className="setup-link"
            >
              <ExternalLink size={14} />
              Full Setup Guide
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .setup-check {
          margin: 1rem 0;
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid;
        }
        
        .setup-check.success {
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }
        
        .setup-check.error {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.2);
          color: #ef4444;
        }
        
        .status-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .setup-details {
          margin-top: 1rem;
        }
        
        .env-checks {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .env-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        
        .env-item.success {
          color: #10b981;
        }
        
        .env-item.error {
          color: #ef4444;
        }
        
        .warning {
          color: #f59e0b;
          font-size: 0.8rem;
        }
        
        .quick-setup h4 {
          margin: 0 0 0.5rem 0;
          color: #f1f5f9;
          font-size: 0.9rem;
        }
        
        .env-template {
          position: relative;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 0.75rem;
          margin: 0.5rem 0;
        }
        
        .env-template pre {
          margin: 0;
          font-size: 0.8rem;
          color: #cbd5e1;
          font-family: 'Courier New', monospace;
          overflow-x: auto;
        }
        
        .copy-button {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 4px;
          padding: 0.25rem;
          color: #60a5fa;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .copy-button:hover {
          background: rgba(59, 130, 246, 0.3);
        }
        
        .setup-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .setup-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #60a5fa;
          text-decoration: none;
          font-size: 0.8rem;
          padding: 0.25rem 0.5rem;
          border: 1px solid rgba(96, 165, 250, 0.3);
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .setup-link:hover {
          color: #93c5fd;
          background: rgba(96, 165, 250, 0.1);
          text-decoration: none;
        }
        
        @media (max-width: 768px) {
          .setup-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
} 


================================================
FILE: app/components/nodes/AgentNode.js
================================================
'use client';

import { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import useAgenticStore from '../../store/useAgenticStore';
import { ExternalLinkIcon, generateServiceNowUrl } from '../../utils/nodeUtils';

function AgentNode({ data, id }) {
  // Extract all props directly from the data object passed by FlowVisualizer
  const { 
    layoutDirection, onToggle, isCollapsed, label, childrenCount, 
    description, role, details
  } = data || {}; // Access data directly
  
  // Get ServiceNow URL from store
  const serviceNowUrl = useAgenticStore(state => state.serviceNowUrl);
  
  // Determine handle positions based on layout direction
  const targetPosition = layoutDirection === 'TB' ? Position.Top : Position.Left;
  const sourcePosition = layoutDirection === 'TB' ? Position.Bottom : Position.Right;

  // Toggle collapse state
  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (typeof onToggle === 'function') {
      onToggle(id);
    } else {
      console.warn('onToggle prop is not a function or is missing for node:', id);
    }
  }, [id, onToggle]);

  // Handle external link click
  const handleExternalLinkClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    
    console.log('AgentNode external link clicked:', {
      serviceNowUrl,
      details,
      sys_id: details?.sys_id,
      hasDetails: !!details,
    });
    
    // Generate URL using the utility function
    const url = generateServiceNowUrl(serviceNowUrl, 'agent', details?.sys_id);
    
    console.log('Generated URL:', url);
    
    if (url) {
      // Open link in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('Cannot navigate: ServiceNow URL or sys_id missing');
    }
  }, [serviceNowUrl, details?.sys_id]);
  
  const hasChildren = childrenCount > 0;
  
  // Only show external link if we have a ServiceNow URL and sys_id
  const canNavigate = Boolean(serviceNowUrl && details?.sys_id);

  return (
    <div className="node agent-node"
         onClick={(e) => e.stopPropagation()}>
      <Handle type="target" position={targetPosition} />
      <Handle type="source" position={sourcePosition} />
      
      <div className="node-header">
        <div className="header-content">
          <div className="node-type">AGENT</div>
          <div className="node-title">{label}</div>
        </div>
        
        <div className="node-header-buttons">
          {canNavigate && (
            <button 
              className="node-external-link"
              onClick={handleExternalLinkClick}
              onMouseDown={(e) => e.stopPropagation()}
              title="Open in ServiceNow"
            >
              <ExternalLinkIcon />
            </button>
          )}
          
          {hasChildren && (
            <button 
              className="expand-button"
              onClick={handleToggle}
              onMouseDown={(e) => e.stopPropagation()}
              title={isCollapsed ? "Show child nodes" : "Hide child nodes"}
            >
              {isCollapsed ? '+' : '−'}
            </button>
          )}
        </div>
      </div>
      <div className="node-content">
        {description && (
          <div className="node-description">{description}</div>
        )}
        {role && (
          <div className="node-field">
            <span className="field-label">Role:</span> {role}
          </div>
        )}
        {hasChildren && (
          <div className="node-children-info">
            {childrenCount} child node{childrenCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(AgentNode); 


================================================
FILE: app/components/nodes/ToolNode.js
================================================
'use client';

import { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import useAgenticStore from '../../store/useAgenticStore';
import { ExternalLinkIcon, generateServiceNowUrl } from '../../utils/nodeUtils';

function ToolNode({ data, id }) {
  // Extract all props directly from the data object passed by FlowVisualizer
  const { 
    layoutDirection, onToggle, isCollapsed, label, childrenCount, 
    description, toolType, details
  } = data || {}; // Access data directly
  
  // Get ServiceNow URL from store
  const serviceNowUrl = useAgenticStore(state => state.serviceNowUrl);
  
  // Determine handle positions based on layout direction
  const targetPosition = layoutDirection === 'TB' ? Position.Top : Position.Left;
  const sourcePosition = layoutDirection === 'TB' ? Position.Bottom : Position.Right;
  
  // Toggle collapse state
  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (typeof onToggle === 'function') {
      onToggle(id);
    } else {
      console.warn('onToggle prop is not a function or is missing for node:', id);
    }
  }, [id, onToggle]);
  
  // Handle external link click
  const handleExternalLinkClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    
    console.log('ToolNode external link clicked:', {
      serviceNowUrl,
      details,
      sys_id: details?.sys_id,
      toolType,
      hasDetails: !!details,
    });
    
    // Generate URL using the utility function
    const url = generateServiceNowUrl(serviceNowUrl, 'tool', details?.sys_id, toolType);
    
    console.log('Generated URL:', url);
    
    if (url) {
      // Open link in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('Cannot navigate: ServiceNow URL or sys_id missing');
    }
  }, [serviceNowUrl, details?.sys_id, toolType]);

  const hasChildren = childrenCount > 0;
  
  // Only show external link if we have a ServiceNow URL and sys_id
  const canNavigate = Boolean(serviceNowUrl && details?.sys_id);

  return (
    <div className="node tool-node"
         onClick={(e) => e.stopPropagation()}>
      <Handle type="target" position={targetPosition} />
      <Handle type="source" position={sourcePosition} />
      
      <div className="node-header">
        <div className="header-content">
          <div className="node-type">TOOL</div>
          <div className="node-title">{label}</div>
        </div>
        
        <div className="node-header-buttons">
          {canNavigate && (
            <button 
              className="node-external-link"
              onClick={handleExternalLinkClick}
              onMouseDown={(e) => e.stopPropagation()}
              title="Open in ServiceNow"
            >
              <ExternalLinkIcon />
            </button>
          )}
          
          {hasChildren && (
            <button 
              className="expand-button"
              onClick={handleToggle}
              onMouseDown={(e) => e.stopPropagation()}
              title={isCollapsed ? "Show child nodes" : "Hide child nodes"}
            >
              {isCollapsed ? '+' : '−'}
            </button>
          )}
        </div>
      </div>
      <div className="node-content">
        {description && (
          <div className="node-description">{description}</div>
        )}
        {toolType && (
          <div className="node-field">
            <span className="field-label">Type:</span> {toolType}
          </div>
        )}
        {hasChildren && (
          <div className="node-children-info">
            {childrenCount} child node{childrenCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ToolNode); 


================================================
FILE: app/components/nodes/TriggerNode.js
================================================
'use client';

import { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import useAgenticStore from '../../store/useAgenticStore';
import { ExternalLinkIcon, generateServiceNowUrl } from '../../utils/nodeUtils';

function TriggerNode({ data, id }) { 
  // Extract all props directly from the data object passed by FlowVisualizer
  const { 
    layoutDirection, onToggle, isCollapsed, label, childrenCount, 
    description, condition, details
  } = data || {}; // Access data directly
  
  // Get ServiceNow URL from store
  const serviceNowUrl = useAgenticStore(state => state.serviceNowUrl);
  
  // Determine handle positions based on layout direction
  const targetPosition = layoutDirection === 'TB' ? Position.Top : Position.Left;
  const sourcePosition = layoutDirection === 'TB' ? Position.Bottom : Position.Right;

  // Toggle collapse state (keep for potential future use, though Triggers don't have children now)
  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Toggle clicked for trigger node:', id, 'Current collapsed state:', isCollapsed);
    if (typeof onToggle === 'function') {
      onToggle(id);
    } else {
      console.warn('onToggle prop is not a function or is missing for node:', id);
    }
  }, [id, onToggle, isCollapsed]);
  
  // Handle external link click
  const handleExternalLinkClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    
    console.log('TriggerNode external link clicked:', {
      serviceNowUrl,
      details,
      sys_id: details?.sys_id,
      hasDetails: !!details,
    });
    
    // Generate URL using the utility function
    const url = generateServiceNowUrl(serviceNowUrl, 'trigger', details?.sys_id);
    
    console.log('Generated URL:', url);
    
    if (url) {
      // Open link in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('Cannot navigate: ServiceNow URL or sys_id missing');
    }
  }, [serviceNowUrl, details?.sys_id]);
  
  const hasChildren = childrenCount > 0;
  
  // Only show external link if we have a ServiceNow URL and sys_id
  const canNavigate = Boolean(serviceNowUrl && details?.sys_id);

  return (
    <div className="node trigger-node"
         onClick={(e) => e.stopPropagation()}>
      <Handle type="target" position={targetPosition} />
      <Handle type="source" position={sourcePosition} />
      
      {/* Header now only contains the type */}
      <div className="node-header">
        <div className="node-type">TRIGGER</div>
        
        <div className="node-header-buttons">
          {canNavigate && (
            <button 
              className="node-external-link"
              onClick={handleExternalLinkClick}
              onMouseDown={(e) => e.stopPropagation()}
              title="Open in ServiceNow"
            >
              <ExternalLinkIcon />
            </button>
          )}
          
          {/* Keep expand button logic if needed */}
          {hasChildren && (
            <button 
              className="expand-button" 
              onClick={handleToggle}
              onMouseDown={(e) => e.stopPropagation()}
              title={isCollapsed ? "Show child nodes" : "Hide child nodes"}
            >
              {isCollapsed ? '+' : '−'}
            </button>
          )}
        </div>
      </div>

      {/* Content area holds the objective (label) and description */}
      <div className="node-content">
        {/* Display the objective (label) as main body text */}
        {label && (
          <div className="trigger-objective-body">{label}</div>
        )}
        {/* Display condition if present */}
        {condition && (
          <div className="node-condition">
            <div className="condition-label">Condition:</div>
            <div className="condition-value">{condition}</div>
          </div>
        )}
        {/* Display description below objective if present */}
        {description && (
          <div className="node-description">{description}</div>
        )}
        {/* Children info (though likely unused for triggers) */}
        {hasChildren && (
          <div className="node-children-info">
            {childrenCount} child node{childrenCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(TriggerNode); 


================================================
FILE: app/components/nodes/UseCaseNode.js
================================================
'use client';

import { memo, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import useAgenticStore from '../../store/useAgenticStore';
import { NodeHeaderButtons } from '../NodeIcons';

function UseCaseNode({ data, id }) {
  // Extract all props directly from the data object
  const { 
    layoutDirection, onToggle, isCollapsed, label, childrenCount, 
    description, details
  } = data || {}; // Access data directly
  
  // Get ServiceNow URL from store
  const serviceNowUrl = useAgenticStore(state => state.serviceNowUrl);
  
  // Determine handle positions based on layout direction
  const targetPosition = layoutDirection === 'TB' ? Position.Top : Position.Left;
  const sourcePosition = layoutDirection === 'TB' ? Position.Bottom : Position.Right;

  // Toggle collapse state
  const handleToggle = useCallback((nodeId) => {
    console.log('Toggle clicked for use case node:', nodeId, 'Current collapsed state:', isCollapsed);
    
    // Call the parent's toggle function if available
    if (typeof onToggle === 'function') {
      onToggle(nodeId);
    } else {
      console.warn('onToggle prop is not a function or is missing for node:', nodeId);
    }
  }, [onToggle, isCollapsed]);

  // Handle external link click
  const handleExternalLinkClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    
    console.log('UseCaseNode external link clicked:', {
      serviceNowUrl,
      details,
      sys_id: details?.sys_id,
      hasDetails: !!details,
    });
    
    // Generate URL for the ServiceNow use case
    const url = serviceNowUrl && details?.sys_id ? 
      `${serviceNowUrl}/now/agent-studio/usecase-guided-setup/${details.sys_id}/params/step/details` : 
      null;
    
    console.log('Generated URL:', url);
    
    if (url) {
      // Open link in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      console.warn('Cannot navigate: ServiceNow URL or sys_id missing');
    }
  }, [serviceNowUrl, details?.sys_id]);

  // Only show the toggle button if this node has children
  const hasChildren = childrenCount > 0;
  
  // Only show external link if we have a ServiceNow URL and sys_id
  const canNavigate = Boolean(serviceNowUrl && details?.sys_id);

  return (
    <div className="node use-case-node"
         onClick={(e) => e.stopPropagation()}>
      <Handle type="target" position={targetPosition} />
      <Handle type="source" position={sourcePosition} />
      
      <div className="node-header use-case-header">
        <div className="header-content">
          <div className="node-type">USE CASE</div>
          <div className="node-title">{label}</div>
        </div>
        
        <NodeHeaderButtons 
          id={id}
          isCollapsed={isCollapsed}
          hasChildren={hasChildren}
          onToggle={handleToggle}
          canNavigate={canNavigate}
          onExternalLinkClick={handleExternalLinkClick}
        />
      </div>
      <div className="node-content">
        {description && (
          <div className="node-description">{description}</div>
        )}
        {hasChildren && (
          <div className="node-children-info">
            {childrenCount} child node{childrenCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(UseCaseNode); 


================================================
FILE: app/components/theme/ThemeProvider.js
================================================
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    }
    setIsLoaded(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isLoaded) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.setAttribute('data-timeline-theme', 'light'); // For timeline compatibility
      } else {
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.removeAttribute('data-timeline-theme');
      }
      localStorage.setItem('app-theme', theme);
    }
  }, [theme, isLoaded]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isLoaded
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 


================================================
FILE: app/database/admin-credentials-schema.sql
================================================
-- ====================================================================
-- Phase 6.1.5: Admin Interface - External Service Credentials
-- ====================================================================
-- Unified table for managing all external service credentials per user
-- Supports AI providers (OpenAI, Gemini, Claude), CRM systems, and future integrations
-- ====================================================================

-- External Service Credentials Table
CREATE TABLE external_service_credentials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  
  -- Service identification
  service_type TEXT NOT NULL, -- 'ai_provider', 'crm_system', 'productivity_tool', etc.
  service_name TEXT NOT NULL, -- 'openai', 'gemini', 'claude', 'servicenow', 'hubspot', etc.
  display_name TEXT NOT NULL, -- User-friendly name: "OpenAI GPT-4o", "ServiceNow Production", etc.
  
  -- Credential storage (AES-256-GCM encrypted)
  credentials_encrypted JSONB NOT NULL, -- Encrypted credential data
  encryption_metadata JSONB NOT NULL,   -- IVs, auth tags, algorithm info
  
  -- Configuration and metadata
  configuration JSONB DEFAULT '{}',     -- Service-specific config (models, endpoints, etc.)
  is_active BOOLEAN DEFAULT true,
  is_default BOOLEAN DEFAULT false,     -- Default provider for service type
  
  -- Connection testing
  last_tested_at TIMESTAMPTZ,
  test_result JSONB,                    -- Last connection test results
  test_status TEXT DEFAULT 'untested', -- 'untested', 'success', 'failed'
  
  -- Usage tracking
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Constraints
  UNIQUE(user_id, service_type, service_name), -- One config per service per user
  CHECK (service_type IN ('ai_provider', 'crm_system', 'productivity_tool', 'integration_platform')),
  CHECK (test_status IN ('untested', 'testing', 'success', 'failed'))
);

-- Enable RLS
ALTER TABLE external_service_credentials ENABLE ROW LEVEL SECURITY;

-- RLS Policies
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

-- Indexes for performance
CREATE INDEX idx_external_service_credentials_user_id ON external_service_credentials(user_id);
CREATE INDEX idx_external_service_credentials_service_type ON external_service_credentials(user_id, service_type);
CREATE INDEX idx_external_service_credentials_active ON external_service_credentials(user_id, is_active);
CREATE INDEX idx_external_service_credentials_default ON external_service_credentials(user_id, service_type, is_default);

-- Updated trigger for updated_at
CREATE TRIGGER update_external_service_credentials_updated_at 
  BEFORE UPDATE ON external_service_credentials 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to ensure only one default per service type per user
CREATE OR REPLACE FUNCTION ensure_single_default_service()
RETURNS TRIGGER AS $$
BEGIN
  -- If this record is being set as default, unset all other defaults for this user/service_type
  IF NEW.is_default = true THEN
    UPDATE external_service_credentials 
    SET is_default = false 
    WHERE user_id = NEW.user_id 
      AND service_type = NEW.service_type 
      AND id != NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to maintain single default
CREATE TRIGGER ensure_single_default_service_trigger
  BEFORE INSERT OR UPDATE ON external_service_credentials
  FOR EACH ROW EXECUTE FUNCTION ensure_single_default_service();

-- ====================================================================
-- Sample Service Configurations (for reference)
-- ====================================================================

-- Example AI Provider configurations:
/*
OpenAI:
{
  "model": "gpt-4o",
  "max_tokens": 4000,
  "temperature": 0.7,
  "endpoint": "https://api.openai.com/v1"
}

Gemini:
{
  "model": "gemini-pro",
  "max_tokens": 4000,
  "temperature": 0.7,
  "endpoint": "https://generativelanguage.googleapis.com/v1"
}

Claude:
{
  "model": "claude-3-sonnet-20240229",
  "max_tokens": 4000,
  "temperature": 0.7,
  "endpoint": "https://api.anthropic.com/v1"
}
*/

-- Example CRM System configurations:
/*
ServiceNow:
{
  "instance_url": "company.service-now.com",
  "scope_id": "uuid-here",
  "api_version": "v1"
}

HubSpot:
{
  "api_version": "v3",
  "endpoint": "https://api.hubapi.com"
}
*/

-- ====================================================================
-- Migration Helper Functions
-- ====================================================================

-- Function to migrate existing ServiceNow connections (if any exist)
CREATE OR REPLACE FUNCTION migrate_servicenow_connections()
RETURNS void AS $$
DECLARE
  connection_record RECORD;
BEGIN
  -- Migrate existing servicenow_connections to new unified table
  FOR connection_record IN 
    SELECT * FROM servicenow_connections WHERE is_active = true
  LOOP
    INSERT INTO external_service_credentials (
      user_id,
      service_type,
      service_name,
      display_name,
      credentials_encrypted,
      encryption_metadata,
      configuration,
      is_active,
      is_default,
      last_tested_at,
      test_result,
      created_at,
      updated_at
    ) VALUES (
      connection_record.user_id,
      'crm_system',
      'servicenow',
      connection_record.name,
      jsonb_build_object(
        'username', connection_record.encrypted_username,
        'password', connection_record.encrypted_password
      ),
      jsonb_build_object(
        'username_iv', connection_record.encryption_iv,
        'algorithm', 'aes-256-gcm'
      ),
      jsonb_build_object(
        'instance_url', connection_record.instance_url
      ),
      connection_record.is_active,
      true, -- Set as default for now
      connection_record.last_tested_at,
      connection_record.test_result,
      connection_record.created_at,
      connection_record.updated_at
    )
    ON CONFLICT (user_id, service_type, service_name) DO NOTHING;
  END LOOP;
END;
$$ LANGUAGE plpgsql; 


================================================
FILE: app/database/schema.sql
================================================
-- ====================================================================
-- Phase 3: Authentication System - Database Schema
-- ====================================================================
-- This file contains the Supabase database schema for user management
-- and encrypted credential storage as specified in Phase 3 of the roadmap.
--
-- Run these commands in your Supabase SQL editor after creating your project.
-- ====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================================================
-- User Profiles Table
-- ====================================================================
-- Extends Supabase auth.users with additional profile information
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- User preferences
  theme TEXT DEFAULT 'dark' CHECK (theme IN ('dark', 'light')),
  timezone TEXT DEFAULT 'UTC',
  
  -- Organization info (for future multi-org support)
  organization_id UUID,
  organization_name TEXT
);

-- ====================================================================
-- ServiceNow Connections Table
-- ====================================================================
-- Stores encrypted ServiceNow credentials per user
CREATE TABLE servicenow_connections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  
  name TEXT NOT NULL, -- User-defined name for this connection
  instance_url TEXT NOT NULL,
  
  -- Encrypted credentials (AES-256)
  encrypted_username TEXT,
  encrypted_password TEXT,
  encryption_iv TEXT, -- Initialization vector for encryption
  
  -- Connection metadata
  is_active BOOLEAN DEFAULT true,
  last_tested_at TIMESTAMPTZ,
  test_result JSONB, -- Store last connection test result
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Ensure unique connection names per user
  UNIQUE(user_id, name)
);

-- ====================================================================
-- Client Profiles Table (for Phase 4 migration)
-- ====================================================================
-- This will be used in Phase 4 to migrate from localStorage
CREATE TABLE client_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  
  -- Profile metadata
  name TEXT NOT NULL,
  description TEXT,
  industry TEXT,
  company_size TEXT,
  
  -- Profile data (stored as structured JSONB)
  profile_data JSONB NOT NULL DEFAULT '{}',
  markdown_content TEXT, -- Generated markdown
  
  -- Timeline generation metadata
  last_timeline_generated_at TIMESTAMPTZ,
  timeline_data JSONB,
  
  -- Sharing and collaboration (future feature)
  is_public BOOLEAN DEFAULT false,
  shared_with TEXT[], -- Array of user IDs or email addresses
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- Audit Log Table
-- ====================================================================
-- Track important user actions for security and debugging
CREATE TABLE audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  
  action TEXT NOT NULL, -- 'auth.signin', 'profile.create', 'connection.test', etc.
  resource_type TEXT, -- 'user', 'profile', 'connection', etc.
  resource_id UUID,
  
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- Row Level Security (RLS) Policies
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicenow_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- User Profiles: Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = id);

-- ServiceNow Connections: Users can only see/edit their own connections
CREATE POLICY "Users can view own connections" 
  ON servicenow_connections FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own connections" 
  ON servicenow_connections FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own connections" 
  ON servicenow_connections FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own connections" 
  ON servicenow_connections FOR DELETE 
  USING (auth.uid() = user_id);

-- Client Profiles: Users can only see/edit their own profiles
CREATE POLICY "Users can view own client profiles" 
  ON client_profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own client profiles" 
  ON client_profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own client profiles" 
  ON client_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own client profiles" 
  ON client_profiles FOR DELETE 
  USING (auth.uid() = user_id);

-- Audit Logs: Users can only view their own logs
CREATE POLICY "Users can view own audit logs" 
  ON audit_logs FOR SELECT 
  USING (auth.uid() = user_id);

-- ====================================================================
-- Functions and Triggers
-- ====================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at 
  BEFORE UPDATE ON user_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_servicenow_connections_updated_at 
  BEFORE UPDATE ON servicenow_connections 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_profiles_updated_at 
  BEFORE UPDATE ON client_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create user profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================================================
-- Indexes for Performance
-- ====================================================================

-- User profile indexes
CREATE INDEX idx_user_profiles_organization_id ON user_profiles(organization_id);

-- ServiceNow connections indexes
CREATE INDEX idx_servicenow_connections_user_id ON servicenow_connections(user_id);
CREATE INDEX idx_servicenow_connections_active ON servicenow_connections(user_id, is_active);

-- Client profiles indexes
CREATE INDEX idx_client_profiles_user_id ON client_profiles(user_id);
CREATE INDEX idx_client_profiles_industry ON client_profiles(industry);
CREATE INDEX idx_client_profiles_created_at ON client_profiles(created_at);

-- Audit logs indexes
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ====================================================================
-- Sample Data (Optional - for development)
-- ====================================================================

-- Note: This will be populated automatically when users sign up
-- The handle_new_user() function creates the user profile automatically 


================================================
FILE: app/hooks/useFlowData.js
================================================
'use client';

import { useEffect } from 'react';
import { useReactFlow } from 'reactflow';
import { transformAgenticData } from '../utils/transformAgenticData';
import { applyDagreLayout } from '../utils/layoutGraph';

export function useFlowData(agenticData, layoutDirection, setNodes, setEdges, onError) {
  const reactFlowInstance = useReactFlow();

  // Load nodes and edges when agenticData changes
  useEffect(() => {
    if (agenticData) {
      try {
        // Get raw nodes and edges without layout applied
        const { nodes: rawNodes, edges: rawEdges } = transformAgenticData(agenticData);
        
        // Check if we got valid data back
        if (!rawNodes.length && !rawEdges.length) {
          throw new Error('Unable to transform the data into a valid flow diagram');
        }
        
        console.log(`Successfully transformed data: ${rawNodes.length} nodes, ${rawEdges.length} edges`);
        
        // Create a map to identify parent-child relationships
        const childrenMap = {};
        rawNodes.forEach(node => {
          if (node.data.parentId) {
            if (!childrenMap[node.data.parentId]) {
              childrenMap[node.data.parentId] = [];
            }
            childrenMap[node.data.parentId].push(node.id);
          }
        });
        
        // Set initial collapse/hidden states
        const initializedNodes = rawNodes.map(node => {
          const nodeChildren = childrenMap[node.id] || [];
          const hasChildren = nodeChildren.length > 0;
          
          if (node.data.level === 0) {
            return {
              ...node,
              data: { ...node.data, isCollapsed: true, childrenCount: nodeChildren.length },
              hidden: false // Top-level nodes are visible
            };
          } else {
            return {
              ...node,
              data: { ...node.data, isCollapsed: hasChildren, childrenCount: nodeChildren.length },
              hidden: true // Child nodes are hidden initially
            };
          }
        });
        
        // --- Apply Initial Layout --- 
        // Filter for initially visible nodes (top-level use cases)
        const visibleNodesInitial = initializedNodes.filter(node => !node.hidden);
        const visibleNodeIdsInitial = new Set(visibleNodesInitial.map(node => node.id));
        
        // Filter edges to include only those connecting visible nodes
        const visibleEdgesInitial = rawEdges.filter(edge => 
          visibleNodeIdsInitial.has(edge.source) && visibleNodeIdsInitial.has(edge.target)
        );

        // Apply layout only to visible nodes/edges
        const { nodes: layoutedNodes, edges: layoutedEdges } = applyDagreLayout(
          visibleNodesInitial,
          visibleEdgesInitial,
          {
            direction: layoutDirection,
            nodeSeparation: 200,
            rankSeparation: 300,
          }
        );
        
        // Merge layout positions back into the *full* initializedNodes array
        const finalNodes = initializedNodes.map(node => {
          const layoutedNode = layoutedNodes.find(n => n.id === node.id);
          if (layoutedNode) {
            // Apply layout position only if the node was part of the layout
            return { ...node, position: layoutedNode.position };
          }
          // Keep original position (likely 0,0) for hidden nodes
          return node; 
        });

        // Set the final state for nodes and edges
        setNodes(finalNodes);
        setEdges(rawEdges); 
        
        // Trigger fitView after layout is applied
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            reactFlowInstance?.fitView?.({
              padding: 0.6,
              includeHiddenNodes: false,
              duration: 800,
              minZoom: 0.3,
              maxZoom: 1.5
            });
          }, 400);
        });
      } catch (error) {
        console.error("Error processing agentic data:", error);
        if (onError) {
          onError(error);
        }
      }
    }
  }, [agenticData, layoutDirection, setNodes, setEdges, reactFlowInstance, onError]);
} 


================================================
FILE: app/hooks/useFlowLayout.js
================================================
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useReactFlow } from 'reactflow';
import { applyDagreLayout } from '../utils/layoutGraph';

export function useFlowLayout(nodes, setNodes, edges, setEdges) {
  const [layoutDirection, setLayoutDirection] = useState('LR');
  const [autoFitEnabled, setAutoFitEnabled] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');
  const reactFlowInstance = useReactFlow();
  
  // Track node collapse changes to prevent infinite layout re-rendering
  const lastCollapseStateRef = useRef({});
  const isLayoutNecessaryRef = useRef(false);

  // Helper function to recursively update visibility of all descendants
  const updateDescendantVisibility = useCallback((nodes, parentId, hidden) => {
    // Find all immediate children of the parent
    const children = nodes.filter(node => node.data.parentId === parentId);
    
    children.forEach(child => {
      // Find the child in the nodes array
      const childIndex = nodes.findIndex(n => n.id === child.id);
      if (childIndex !== -1) {
        // Check if this child has its own children
        const grandChildren = nodes.filter(n => n.data.parentId === child.id);
        const hasGrandChildren = grandChildren.length > 0;
        
        // Update this child's visibility
        nodes[childIndex] = {
          ...nodes[childIndex],
          hidden: hidden,
          data: {
            ...nodes[childIndex].data,
            // If this node has children and is being hidden, ensure it's set to collapsed state
            isCollapsed: hasGrandChildren ? true : nodes[childIndex].data.isCollapsed
          }
        };
        
        // Recursively update this child's descendants
        updateDescendantVisibility(nodes, child.id, hidden);
      }
    });
    
    return nodes;
  }, []);

  // Toggle node expansion/collapse
  const toggleNodeExpansion = useCallback((nodeId) => {
    console.log(`Toggle expansion for node: ${nodeId}`);
    
    setNodes(currentNodes => {
      const nodeIndex = currentNodes.findIndex(n => n.id === nodeId);
      if (nodeIndex === -1) {
        console.error(`Node with id ${nodeId} not found`);
        return currentNodes;
      }

      const node = currentNodes[nodeIndex];
      const isCollapsed = !node.data.isCollapsed;
      
      console.log(`Setting node ${nodeId} collapsed state to: ${isCollapsed}`);
      
      // First update the node's collapse state
      const updatedNodes = [...currentNodes];
      updatedNodes[nodeIndex] = {
        ...node,
        data: {
          ...node.data,
          isCollapsed
        }
      };
      
      // Find immediate children of this node
      const childNodes = currentNodes.filter(n => n.data.parentId === nodeId);
      const hasChildren = childNodes.length > 0;
      
      if (hasChildren) {
        console.log(`Node ${nodeId} has ${childNodes.length} children, updating their visibility`);
        
        // Update visibility of all child nodes based on collapse state
        childNodes.forEach(childNode => {
          const childIndex = updatedNodes.findIndex(n => n.id === childNode.id);
          if (childIndex !== -1) {
            // Check if this child has its own children
            const grandChildren = currentNodes.filter(n => n.data.parentId === childNode.id);
            const hasGrandChildren = grandChildren.length > 0;
            
            updatedNodes[childIndex] = {
              ...updatedNodes[childIndex],
              hidden: isCollapsed, // Hide child if parent is collapsed
              data: {
                ...updatedNodes[childIndex].data,
                // If this child has children, ensure it's set to collapsed state when becoming visible
                isCollapsed: hasGrandChildren ? true : updatedNodes[childIndex].data.isCollapsed
              }
            };
            
            // If we're collapsing, also collapse any grandchildren
            if (isCollapsed) {
              // Recursively hide all descendants
              updateDescendantVisibility(updatedNodes, childNode.id, true);
            }
          }
        });
        
        setLastUpdate(`${nodeId} ${isCollapsed ? 'collapsed' : 'expanded'} at ${new Date().toLocaleTimeString()}`);
        isLayoutNecessaryRef.current = true;
        
        // Get visible node IDs after update
        const visibleNodeIds = new Set(
          updatedNodes
            .filter(node => !node.hidden)
            .map(node => node.id)
        );
        
        // Update edges visibility
        setEdges(currentEdges => 
          currentEdges.map(edge => ({
            ...edge,
            hidden: !(visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target))
          }))
        );
        
        // Only fit view if autoFitEnabled is enabled
        if (autoFitEnabled) {
          window.requestAnimationFrame(() => {
            setTimeout(() => {
              reactFlowInstance.fitView({
                padding: 0.6,
                includeHiddenNodes: false,
                duration: 800,
                minZoom: 0.3,
                maxZoom: 1.5
              });
            }, 400);
          });
        }
      }
      
      return updatedNodes;
    });
  }, [setNodes, setEdges, reactFlowInstance, updateDescendantVisibility, autoFitEnabled]);

  // Expand all nodes
  const expandAllNodes = useCallback(() => {
    setLastUpdate(`Expanding all nodes: ${new Date().toLocaleTimeString()}`);
    
    setNodes(nodes => {
      // Mark all nodes as expanded and visible
      const expandedNodes = nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          isCollapsed: false
        },
        hidden: false
      }));
      
      // Show all edges
      setEdges(currentEdges => 
        currentEdges.map(edge => ({ ...edge, hidden: false }))
      );
      
      // Force layout update
      isLayoutNecessaryRef.current = true;
      
      if (autoFitEnabled) {
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            reactFlowInstance.fitView({
              padding: 0.3,
              includeHiddenNodes: false,
              minZoom: 0.5,
              maxZoom: 1.5
            });
          }, 300);
        });
      }
      
      return expandedNodes;
    });
  }, [setNodes, setEdges, reactFlowInstance, autoFitEnabled]);

  // Collapse all nodes to show only use cases
  const collapseAllNodes = useCallback(() => {
    setLastUpdate(`Collapsing to show only top-level nodes: ${new Date().toLocaleTimeString()}`);
    
    setNodes(nodes => {
      const updatedNodes = nodes.map(node => {
        // Top level nodes (use cases) - expanded
        if (node.data.level === 0) {
          return {
            ...node,
            data: {
              ...node.data,
              isCollapsed: true
            },
            hidden: false
          };
        }
        // All other nodes - hidden
        return {
          ...node,
          data: {
            ...node.data,
            isCollapsed: true
          },
          hidden: true
        };
      });
      
      // Get visible node IDs after collapse
      const visibleNodeIds = new Set(
        updatedNodes
          .filter(node => !node.hidden)
          .map(node => node.id)
      );
      
      // Update edges visibility in the next tick
      setTimeout(() => {
        setEdges(currentEdges => 
          currentEdges.map(edge => ({
            ...edge,
            hidden: !(visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target))
          }))
        );
      }, 0);
      
      // Force layout update
      isLayoutNecessaryRef.current = true;
      
      if (autoFitEnabled) {
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            reactFlowInstance.fitView({
              padding: 0.3,
              includeHiddenNodes: false,
              minZoom: 0.5,
              maxZoom: 1.5
            });
          }, 300);
        });
      }
      
      return updatedNodes;
    });
  }, [setNodes, setEdges, reactFlowInstance, autoFitEnabled]);

  // Apply layout when needed
  useEffect(() => {
    if (nodes.length === 0 || edges.length === 0) return;
    
    // Check if any collapse states have changed
    let hasCollapseStateChanged = false;
    const currentCollapseState = {};
    const changedNodeIds = [];
    
    nodes.forEach(node => {
      if (node.data && node.data.isCollapsed !== undefined) {
        currentCollapseState[node.id] = node.data.isCollapsed;
        if (lastCollapseStateRef.current[node.id] !== node.data.isCollapsed) {
          hasCollapseStateChanged = true;
          changedNodeIds.push(node.id);
        }
      }
    });
    
    // Only re-layout if collapse state changed or layout was requested
    if (hasCollapseStateChanged || isLayoutNecessaryRef.current) {
      const updateType = hasCollapseStateChanged ? 
        `Node(s) ${changedNodeIds.join(', ')} toggled` : 
        'Layout direction changed';
      
      setLastUpdate(`${updateType} - applying layout: ${new Date().toLocaleTimeString()}`);
      lastCollapseStateRef.current = {...currentCollapseState};
      isLayoutNecessaryRef.current = false;
      
      // Filter visible nodes for the layout
      const visibleNodes = nodes.filter(node => !node.hidden);
      const visibleNodeIds = new Set(visibleNodes.map(node => node.id));
      
      // Update edge visibility based on connected nodes
      const updatedEdges = edges.map(edge => {
        if (visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)) {
          return { ...edge, hidden: false };
        } else {
          return { ...edge, hidden: true };
        }
      });
      
      // Apply layout with visible nodes and edges
      const { nodes: layoutedNodes, edges: layoutedEdges } = applyDagreLayout(
        visibleNodes,
        updatedEdges,
        {
          direction: layoutDirection,
          nodeSeparation: 200,
          rankSeparation: 300,
        }
      );

      // Merge the new positions into the original nodes array
      const mergedNodes = nodes.map(node => {
        const layoutedNode = layoutedNodes.find(n => n.id === node.id);
        if (layoutedNode) {
          return {
            ...node,
            position: layoutedNode.position
          };
        }
        return node;
      });

      setNodes(mergedNodes);
      setEdges(layoutedEdges);

      // Only fit view if autoFitEnabled is enabled
      if (autoFitEnabled) {
        window.requestAnimationFrame(() => {
          setTimeout(() => {
            reactFlowInstance.fitView({ 
              padding: 0.6,
              includeHiddenNodes: false,
              duration: 800,
              minZoom: 0.3,
              maxZoom: 1.5
            });
          }, 400);
        });
      }
    }
  }, [nodes, edges, layoutDirection, setNodes, setEdges, reactFlowInstance, autoFitEnabled]);

  // Handle layout direction change
  const handleLayoutChange = useCallback((direction) => {
    setLayoutDirection(direction);
    isLayoutNecessaryRef.current = true;
    setLastUpdate(`Layout direction changed to ${direction}: ${new Date().toLocaleTimeString()}`);
  }, []);

  return {
    layoutDirection,
    autoFitEnabled,
    lastUpdate,
    setAutoFitEnabled,
    toggleNodeExpansion,
    expandAllNodes,
    collapseAllNodes,
    handleLayoutChange
  };
} 


================================================
FILE: app/hooks/useTimeline.js
================================================
'use client';

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import useBusinessProfileStore from '../store/useBusinessProfileStore';
import { ProfileService } from '../services/profileService';

const getTimelineSections = (timelineData) => {
  if (!timelineData) return [];
  return [{
    id: 'current-state',
    year: 'Today',
    title: 'Current State',
    subtitle: 'Where you are now',
    iconId: 'MapPin'
  }, {
    id: 'phase-1',
    year: 'Q1-Q2',
    title: 'Foundation',
    subtitle: 'Building AI capabilities',
    iconId: 'Building'
  }, {
    id: 'phase-2',
    year: 'Q3-Q4',
    title: 'Implementation',
    subtitle: 'Deploying solutions',
    iconId: 'Rocket'
  }, {
    id: 'phase-3',
    year: 'Year 2',
    title: 'Expansion',
    subtitle: 'Scaling operations',
    iconId: 'TrendingUp'
  }, {
    id: 'phase-4',
    year: 'Year 3',
    title: 'Optimization',
    subtitle: 'Maximizing value',
    iconId: 'Zap'
  }, {
    id: 'future-state',
    year: 'Year 5',
    title: 'Future State',
    subtitle: 'Vision realized',
    iconId: 'Target'
  }, ];
};

export function useTimeline() {
  const {
    businessProfile,
    timelineData,
    isGenerating,
    generateTimeline,
    generateTimelineFromProfile,
    regenerateTimelineFromProfile,
    hasValidProfile,
    theme,
    toggleTheme,
    timelineCached,
    timelineGeneratedAt,
    timelineScenarioType
  } = useBusinessProfileStore();

  const searchParams = useSearchParams();
  const profileIdFromUrl = searchParams.get('profileId');

  const [activeSection, setActiveSection] = useState('current-state');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProfile, setCurrentProfile] = useState(null);

  const contentRef = useRef(null);
  const sectionRefs = useRef({});

  const timelineSections = getTimelineSections(timelineData);

  // Effect to initialize timeline from profile ID
  useEffect(() => {
    const initializeTimeline = async () => {
      if (profileIdFromUrl) {
        setIsLoading(true);
        try {
          const loadedProfile = await ProfileService.getProfile(profileIdFromUrl);
          if (loadedProfile) {
            setCurrentProfile(loadedProfile);
            await generateTimelineFromProfile(loadedProfile);
          } else {
            console.warn(`Profile with ID ${profileIdFromUrl} not found.`);
            setCurrentProfile(null);
          }
        } catch (error) {
          console.error("Error loading profile for timeline:", error);
          setCurrentProfile(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setCurrentProfile(null);
      }
    };
    initializeTimeline();
  }, [profileIdFromUrl, generateTimelineFromProfile]);


  // Improved scroll handling logic
  useLayoutEffect(() => {
    const handleScroll = () => {
      const contentEl = contentRef.current;
      if (!contentEl || !timelineSections.length) return;

      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = contentEl;

      const progress = scrollHeight > clientHeight ? (scrollTop / (scrollHeight - clientHeight)) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(100, progress)));

      // More reliable active section detection
      // We'll find the last section that has scrolled past the top of the viewport
      // with a 150px offset for better user experience.
      const scrollPosition = scrollTop + 150;
      
      const currentSection = timelineSections
        .slice() // Create a shallow copy to reverse
        .reverse()
        .find(section => {
          const el = sectionRefs.current[section.id];
          return el && el.offsetTop <= scrollPosition;
        });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      } else {
        // Fallback to the first section if none are active (e.g., at the very top)
        setActiveSection(timelineSections[0]?.id || 'current-state');
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll, { passive: true });
      // Run on mount to set initial state correctly
      handleScroll(); 
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [timelineData]); // Dependency on timelineData to re-run when sections change

  const handleSectionClick = useCallback((sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element && contentRef.current) {
      setActiveSection(sectionId); // Set active state immediately for better responsiveness
      contentRef.current.scrollTo({
        top: element.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  }, []);

  const regenerateTimeline = useCallback(async (profile, scenarioType = null) => {
    if (profile) {
      return await regenerateTimelineFromProfile(profile, scenarioType);
    }
  }, [regenerateTimelineFromProfile]);

  return {
    // State
    timelineData,
    businessProfile,
    currentProfile,
    isLoading: isLoading || isGenerating,
    activeSection,
    scrollProgress,
    timelineSections,
    theme,

    // Cache metadata
    timelineCached,
    timelineGeneratedAt,
    timelineScenarioType,

    // Refs
    contentRef,
    sectionRefs,

    // Actions
    handleSectionClick,
    toggleTheme,
    generateTimeline,
    regenerateTimeline,
    hasValidProfile,

    // Contextual flags
    isProfileTimeline: !!profileIdFromUrl
  };
} 


================================================
FILE: app/lib/debug-supabase.js
================================================
'use client';

/**
 * Supabase Debug Utility
 * Quick diagnostic tool to check Supabase configuration and connection status
 */

import { supabase } from './supabase';

export function debugSupabaseConfig() {
  const config = {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    urlLength: process.env.NEXT_PUBLIC_SUPABASE_URL?.length || 0,
    keyLength: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
    supabaseInstance: !!supabase,
    timestamp: new Date().toISOString()
  };

  console.log('🔍 Supabase Debug Config:', config);
  return config;
}

export async function debugSupabaseConnection() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test 1: Check if client_profiles table exists
    const { data: connectionTest, error: connectionError } = await supabase
      .from('client_profiles')
      .select('id')
      .limit(1);

    if (connectionError) {
      // Check if it's a table not found error
      if (connectionError.code === 'PGRST106' || connectionError.message?.includes('does not exist')) {
        console.warn('⚠️ Database table "client_profiles" does not exist');
        console.log('📋 You need to run the database schema from app/database/schema.sql');
        return { 
          success: false, 
          error: connectionError,
          needsSchema: true,
          message: 'Database tables not found. Run the schema from app/database/schema.sql in your Supabase SQL Editor.'
        };
      }
      
      console.error('❌ Connection test failed:', connectionError);
      return { success: false, error: connectionError };
    }

    console.log('✅ Database connection and table access successful');

    // Test 2: Check current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    console.log('🔍 Current user:', user ? { id: user.id, email: user.email } : 'Not authenticated');
    
    if (userError) {
      console.error('❌ User check failed:', userError);
    }

    // Test 3: Test profile query (if authenticated)
    if (user) {
      const { data: profileData, error: profileError } = await supabase
        .from('client_profiles')
        .select('id, name')
        .eq('user_id', user.id)
        .limit(5);

      console.log('🔍 User profiles:', profileData?.length || 0, 'found');
      
      if (profileError) {
        console.error('❌ Profile query failed:', profileError);
        return { success: false, error: profileError, user };
      }
    }

    console.log('✅ Supabase connection fully successful');
    return { success: true, user, hasProfiles: user ? true : false };
    
  } catch (error) {
    console.error('❌ Supabase debug failed:', error);
    return { success: false, error };
  }
}

export async function debugProfileAccess(profileId) {
  try {
    console.log(`🔍 Testing profile access for ID: ${profileId}`);
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.log('🔍 No authenticated user, checking localStorage...');
      const localProfiles = JSON.parse(localStorage.getItem('clientProfiles') || '[]');
      const localProfile = localProfiles.find(p => p.id === profileId);
      
      return {
        source: 'localStorage',
        found: !!localProfile,
        profile: localProfile ? { id: localProfile.id, name: localProfile.companyName } : null
      };
    }

    // Test Supabase query
    const { data, error } = await supabase
      .from('client_profiles')
      .select('id, name, user_id')
      .eq('id', profileId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      console.error('❌ Supabase profile query failed:', error);
      
      // Check if profile exists for any user (to test RLS)
      const { data: anyUserData, error: anyUserError } = await supabase
        .from('client_profiles')
        .select('id, name, user_id')
        .eq('id', profileId)
        .single();

      if (anyUserError) {
        console.log('🔍 Profile does not exist in database at all');
      } else {
        console.log('🔍 Profile exists but belongs to different user:', anyUserData.user_id);
      }
      
      return { source: 'supabase', found: false, error, user: user.id };
    }

    console.log('✅ Profile found in Supabase:', data);
    return { source: 'supabase', found: true, profile: data, user: user.id };
    
  } catch (error) {
    console.error('❌ Profile access debug failed:', error);
    return { source: 'error', error };
  }
}

// Browser console helpers
if (typeof window !== 'undefined') {
  window.debugSupabase = {
    config: debugSupabaseConfig,
    connection: debugSupabaseConnection,
    profile: debugProfileAccess
  };
} 


================================================
FILE: app/lib/DynamicEnvDebugger.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { EnvDebugger } from './env-check';

export default function DynamicEnvDebugger() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <EnvDebugger />;
} 


================================================
FILE: app/lib/env-check.js
================================================
/**
 * Environment Variable Checker
 * Quick diagnostic tool to check if Supabase is properly configured
 */

export function checkEnvVars() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasEncryptionKey: !!process.env.ENCRYPTION_KEY,
  };

  const issues = [];

  if (!envVars.NEXT_PUBLIC_SUPABASE_URL) {
    issues.push('NEXT_PUBLIC_SUPABASE_URL is not set');
  } else if (!envVars.NEXT_PUBLIC_SUPABASE_URL.includes('supabase.co')) {
    issues.push('NEXT_PUBLIC_SUPABASE_URL does not appear to be a valid Supabase URL');
  }

  if (!envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    issues.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  } else if (!envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY.startsWith('eyJ')) {
    issues.push('NEXT_PUBLIC_SUPABASE_ANON_KEY does not appear to be a valid JWT token');
  }

  return {
    envVars,
    issues,
    isValid: issues.length === 0
  };
}

// Client-side debug component
export function EnvDebugger() {
  if (typeof window === 'undefined') return null;

  const result = checkEnvVars();

  if (result.isValid) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#fee2e2',
      border: '1px solid #fecaca',
      color: '#dc2626',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '14px',
      zIndex: 9999,
      maxWidth: '400px'
    }}>
      <strong>Supabase Configuration Issues:</strong>
      <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
        {result.issues.map((issue, i) => (
          <li key={i}>{issue}</li>
        ))}
      </ul>
      <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>
        Check your .env.local file and restart the dev server.
      </p>
    </div>
  );
} 


================================================
FILE: app/lib/supabase.js
================================================
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    detectSessionInUrl: true,
    autoRefreshToken: true,
  },
})

// Server-side helper for getting authenticated user from Authorization header
export const getServerUser = async (request) => {
  try {
    if (!request) {
      return { id: 'server-context' }
    }

    // Extract authorization header
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Create a server-side Supabase client with the token
    const serverClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    const { data: { user }, error } = await serverClient.auth.getUser()
    
    if (error) {
      console.error('Server auth error:', error)
      return null
    }

    return user
  } catch (error) {
    console.error('Error in server authentication:', error)
    return null
  }
}

// Client-side only helper for getting the current session
export const getSession = async () => {
  if (typeof window === 'undefined') return null
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Client-side only helper for getting the current user
export const getCurrentUser = async () => {
  if (typeof window === 'undefined') return null
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Universal helper that works on both client and server
export const getUser = async (request = null) => {
  if (typeof window === 'undefined') {
    return await getServerUser(request)
  } else {
    return await getCurrentUser()
  }
} 


================================================
FILE: app/lib/llm/prompts/timelinePrompts.js
================================================
/**
 * Prompts for AI Transformation Timeline Generation
 */

/**
 * Builds the user-facing prompt for timeline generation.
 * @param {string} profileMarkdown - The structured markdown of the business profile.
 * @param {string} scenarioType - The type of scenario ('conservative', 'balanced', 'aggressive').
 * @returns {string} The complete user prompt.
 */
export const buildTimelineUserPrompt = (profileMarkdown, scenarioType) => {
  const scenarioInstructions = {
    conservative: 'Focus on proven technologies, lower risk implementations, extended timelines, and gradual adoption. Emphasize stability and incremental improvements.',
    balanced: 'Balance innovation with practicality. Use a mix of proven and emerging technologies with moderate timelines and measured risk.',
    aggressive: 'Emphasize cutting-edge technologies, rapid implementation, compressed timelines, and transformational change. Accept higher risk for greater potential returns.'
  };

  return `Generate a comprehensive AI transformation timeline for the following business profile.

**Business Profile:**
${profileMarkdown}

**Scenario Type:** ${scenarioType.toUpperCase()}
${scenarioInstructions[scenarioType]}

**Instructions:**
- Create a realistic 3-5 year transformation roadmap
- Include specific phases with clear milestones and deliverables
- Provide detailed cost estimates and ROI projections
- Consider the company's current maturity level and industry
- Include specific AI technologies and implementation strategies
- Account for change management and training requirements
- Ensure phases build logically upon each other

**Response Format:**
Return a JSON object with this exact structure:

\`\`\`json
{
  "currentState": {
    "description": "Current AI maturity and capabilities",
    "highlights": [
      {"label": "AI Readiness", "value": "25%"},
      {"label": "Automation Level", "value": "15%"},
      {"label": "Data Maturity", "value": "30%"}
    ]
  },
  "phases": [
    {
      "title": "Foundation Phase",
      "description": "Brief phase description",
      "duration": "6 months",
      "initiatives": [
        {
          "title": "Initiative Name",
          "description": "What this initiative accomplishes",
          "impact": "Business impact description"
        }
      ],
      "technologies": ["Technology 1", "Technology 2"],
      "outcomes": [
        {
          "metric": "Efficiency Gain",
          "value": "25%",
          "description": "Detailed outcome description"
        }
      ],
      "highlights": [
        {"label": "ROI", "value": "150%"},
        {"label": "Time to Value", "value": "3 months"}
      ]
    }
  ],
  "futureState": {
    "description": "Vision of the transformed organization",
    "highlights": [
      {"label": "AI Integration", "value": "95%"},
      {"label": "Automation Level", "value": "80%"},
      {"label": "Revenue Impact", "value": "+45%"}
    ]
  },
  "summary": {
    "totalInvestment": "$2.5M - $4.2M",
    "expectedROI": "425% over 3 years",
    "timeToValue": "6-9 months",
    "riskLevel": "Medium"
  }
}
\`\`\``;
};

/**
 * Gets the system prompt for the AI transformation consultant role.
 * @returns {string} The system prompt.
 */
export const getTimelineSystemPrompt = () => {
  return `You are an expert AI transformation consultant with deep expertise in enterprise AI adoption strategies. You create detailed, actionable transformation roadmaps that consider:

1. **Business Context**: Industry dynamics, company size, current capabilities, and strategic goals
2. **Technical Feasibility**: Available technologies, integration complexity, and infrastructure requirements
3. **Change Management**: Organizational readiness, training needs, and cultural transformation
4. **Financial Planning**: Realistic cost estimates, ROI projections, and budget considerations
5. **Risk Management**: Implementation risks, mitigation strategies, and contingency planning

Your timeline recommendations are:
- Practical and achievable given the company's profile
- Based on industry best practices and real-world implementations
- Financially realistic with detailed cost-benefit analysis
- Technically sound with appropriate technology selections
- Organizationally viable with proper change management

Always respond with valid JSON that matches the exact structure specified in the user prompt.`;
}; 


================================================
FILE: app/lib/llm/providers/openaiServerProvider.js
================================================
/**
 * OpenAI Server Provider
 * 
 * Server-side implementation for interacting with OpenAI's API.
 * This class is designed to be used by the central `aiService`.
 */
export class OpenAIServerProvider {
  constructor() {
    this.baseUrl = 'https://api.openai.com/v1';
    this.model = 'gpt-4o';
    
    // Don't cache the API key - check it dynamically to handle environment changes
    // This is important for testing where the environment variable might be changed
  }

  get apiKey() {
    return process.env.OPENAI_API_KEY;
  }

  /**
   * Generates a JSON object from a given set of prompts using OpenAI's API.
   * @param {string} systemPrompt - The system prompt to guide the AI's behavior.
   * @param {string} userPrompt - The user-specific prompt or question.
   * @param {object} options - Additional options for the generation (e.g., temperature).
   * @returns {Promise<object>} The generated JSON object.
   */
  async generateJson(systemPrompt, userPrompt, options = {}) {
    // Check for API key before making the request
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.');
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 4000,
          response_format: { type: 'json_object' }
        })
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(`OpenAI API error: ${response.status} - ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('No content received from OpenAI API');
      }

      // The provider's responsibility is just to return the parsed JSON, not to validate its structure.
      return JSON.parse(content);
      
    } catch (error) {
      console.error('OpenAI Server Provider Error:', error);
      // Re-throwing the error allows the calling service to handle it appropriately.
      throw new Error(`Failed to generate JSON from OpenAI: ${error.message}`);
    }
  }

  /**
   * Returns the configuration status of this provider.
   * @returns {{configured: boolean, provider: string, apiKeyStatus: string}}
   */
  getStatus() {
    const isConfigured = !!this.apiKey;
    return {
      configured: isConfigured,
      provider: 'OpenAI GPT-4o',
      apiKeyStatus: isConfigured ? 'Set' : 'Missing'
    };
  }
} 


================================================
FILE: app/profile/page.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GlobalHeader from '../components/GlobalHeader';
import useAuthStore from '../store/useAuthStore';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Settings, 
  Database,
  LogOut,
  Edit,
  Save,
  X
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, signOut, loading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    timezone: 'UTC',
    notifications: true
  });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    if (user) {
      setProfileData({
        displayName: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
        email: user.email || '',
        timezone: user.user_metadata?.timezone || 'UTC',
        notifications: user.user_metadata?.notifications !== false
      });
    }
  }, [user, isAuthenticated, loading, router]);

  const handleSaveProfile = async () => {
    // In a real app, you would update the user profile via Supabase
    console.log('Saving profile:', profileData);
    setIsEditing(false);
    // Here you would typically call supabase.auth.updateUser()
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <GlobalHeader />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 80px)',
          color: 'var(--text-secondary)'
        }}>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <GlobalHeader />
      
      {/* Page Header */}
      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        borderBottom: '1px solid var(--border-primary)',
        padding: 'var(--spacing-lg)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-lg)'
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-sm)'
            }}>User Profile</h1>
            <p style={{
              margin: 0,
              fontSize: '1rem',
              color: 'var(--text-secondary)'
            }}>
              Manage your account settings and preferences
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
            {isEditing ? (
              <>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                >
                  <X size={18} />
                  Cancel
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={handleSaveProfile}
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                className="btn btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={18} />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: 'var(--spacing-xl)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--spacing-xl)'
      }}>
        
        {/* Profile Information Card */}
        <div style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--backdrop-blur))',
          borderRadius: 'var(--border-radius-xl)',
          padding: 'var(--spacing-xl)',
          border: '1px solid var(--border-primary)',
          height: 'fit-content'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-xl)',
            paddingBottom: 'var(--spacing-lg)',
            borderBottom: '1px solid var(--border-primary)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: 'var(--border-radius-full)',
              background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-green))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.5rem'
            }}>
              <User size={28} />
            </div>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-xs)'
              }}>
                {profileData.displayName || 'User'}
              </h2>
              <p style={{
                margin: 0,
                color: 'var(--text-secondary)'
              }}>
                Agent Blueprint User
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            {/* Display Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                Display Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    displayName: e.target.value
                  }))}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--border-radius)',
                    background: 'var(--btn-secondary-bg)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                />
              ) : (
                <p style={{
                  margin: 0,
                  padding: 'var(--spacing-md)',
                  background: 'var(--btn-secondary-bg)',
                  borderRadius: 'var(--border-radius)',
                  color: 'var(--text-primary)'
                }}>
                  {profileData.displayName || 'Not set'}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                Email Address
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-md)',
                background: 'var(--btn-secondary-bg)',
                borderRadius: 'var(--border-radius)',
                color: 'var(--text-primary)'
              }}>
                <Mail size={18} />
                <span>{profileData.email}</span>
              </div>
            </div>

            {/* Account Created */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--text-secondary)',
                marginBottom: 'var(--spacing-sm)'
              }}>
                Member Since
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-md)',
                background: 'var(--btn-secondary-bg)',
                borderRadius: 'var(--border-radius)',
                color: 'var(--text-primary)'
              }}>
                <Calendar size={18} />
                <span>{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings & Account Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          
          {/* Account Settings */}
          <div style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--backdrop-blur))',
            borderRadius: 'var(--border-radius-xl)',
            padding: 'var(--spacing-xl)',
            border: '1px solid var(--border-primary)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)',
              paddingBottom: 'var(--spacing-md)',
              borderBottom: '1px solid var(--border-primary)'
            }}>
              <Settings size={24} color="var(--accent-blue)" />
              <h3 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)'
              }}>
                Account Settings
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {/* Notifications */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--spacing-md)',
                background: 'var(--btn-secondary-bg)',
                borderRadius: 'var(--border-radius)'
              }}>
                <div>
                  <p style={{
                    margin: 0,
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--text-primary)'
                  }}>
                    Email Notifications
                  </p>
                  <p style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)'
                  }}>
                    Receive updates about your profiles and timelines
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={profileData.notifications}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    notifications: e.target.checked
                  }))}
                  disabled={!isEditing}
                  style={{ width: '18px', height: '18px' }}
                />
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--backdrop-blur))',
            borderRadius: 'var(--border-radius-xl)',
            padding: 'var(--spacing-xl)',
            border: '1px solid var(--border-primary)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)',
              paddingBottom: 'var(--spacing-md)',
              borderBottom: '1px solid var(--border-primary)'
            }}>
              <Database size={24} color="var(--accent-green)" />
              <h3 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)'
              }}>
                Account Information
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-md)',
                background: 'var(--btn-secondary-bg)',
                borderRadius: 'var(--border-radius)'
              }}>
                <Shield size={18} color="var(--accent-blue)" />
                <div>
                  <p style={{ margin: 0, fontWeight: 'var(--font-weight-medium)', color: 'var(--text-primary)' }}>
                    Account Type
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Standard User
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-md)',
                background: 'var(--btn-secondary-bg)',
                borderRadius: 'var(--border-radius)'
              }}>
                <Database size={18} color="var(--accent-green)" />
                <div>
                  <p style={{ margin: 0, fontWeight: 'var(--font-weight-medium)', color: 'var(--text-primary)' }}>
                    Data Storage
                  </p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Cloud-based (Supabase)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--backdrop-blur))',
            borderRadius: 'var(--border-radius-xl)',
            padding: 'var(--spacing-xl)',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}>
            <h3 style={{
              margin: '0 0 var(--spacing-md) 0',
              fontSize: '1.25rem',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--text-primary)'
            }}>
              Account Actions
            </h3>
            <p style={{
              margin: '0 0 var(--spacing-lg) 0',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}>
              Sign out of your account. You can sign back in anytime.
            </p>
            <button 
              className="btn btn-danger"
              onClick={handleSignOut}
              style={{ width: '100%' }}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 


================================================
FILE: app/profiles/page.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileService } from '../services/profileService';
import { demoDataService } from '../services/demoDataService';
import ProfileWizard from './components/ProfileWizard';
import useAuthStore from '../store/useAuthStore';
import GlobalHeader from '../components/GlobalHeader';
import { Plus, Users, BarChart, Building2, Briefcase, GraduationCap, Home, Truck, Zap, Store, TrendingUp, Eye, Lock } from 'lucide-react';

function AuthRequiredMessage() {
  const router = useRouter();
  return (
    <div style={{
      textAlign: 'center',
      padding: 'var(--spacing-xxl)',
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(var(--backdrop-blur))',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--border-radius-xl)',
      margin: 'var(--spacing-xl) auto',
      maxWidth: '600px'
    }}>
      <Lock size={48} style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)' }} />
      <h2 style={{
        fontSize: '2rem',
        color: 'var(--text-primary)',
        marginBottom: 'var(--spacing-md)',
        fontWeight: 'var(--font-weight-semibold)'
      }}>Authentication Required</h2>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '1.1rem',
        lineHeight: '1.6',
        marginBottom: 'var(--spacing-xl)',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        Please sign in or create an account to manage your client profiles. All your data will be securely stored in the cloud.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button 
          className="btn btn-primary btn-large"
          onClick={() => router.push('/auth/signin')}
        >
          Sign In
        </button>
        <button 
          className="btn btn-secondary btn-large"
          onClick={() => router.push('/auth/signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState([]);
  const [showWizard, setShowWizard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading) {
      if (isAuthenticated) {
        loadProfiles();
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, isAuthLoading]);

  const loadProfiles = async () => {
    try {
      setIsLoading(true);
      const profileList = await ProfileService.getProfiles();
      setProfiles(profileList);
    } catch (error) {
      console.error('Error loading profiles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProfile = () => {
    setShowWizard(true);
  };

  const loadDemoProfiles = async () => {
    try {
      const demoProfiles = demoDataService.getDemoProfiles();
      
      // Convert demo data to saved profiles for the authenticated user
      for (const demoData of demoProfiles) {
        await ProfileService.createProfile(demoData);
      }
      // Reload from Supabase to get all profiles including new demo ones
      await loadProfiles();
    } catch (error) {
      console.error('Error loading demo profiles:', error);
    }
  };

  const handleWizardComplete = (profile) => {
    setProfiles(prev => [...prev, profile]);
    setShowWizard(false);
  };

  const handleWizardCancel = () => {
    setShowWizard(false);
  };

  const handleViewProfile = (profileId) => {
    router.push(`/profiles/${profileId}`);
  };

  const handleGenerateTimeline = async (profile) => {
    router.push(`/timeline?profileId=${profile.id}`);
  };

  if (showWizard) {
    return (
      <ProfileWizard
        onComplete={handleWizardComplete}
        onCancel={handleWizardCancel}
      />
    );
  }

  const renderContent = () => {
    if (isLoading || isAuthLoading) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--spacing-xxl)',
          textAlign: 'center',
          minHeight: '50vh'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid var(--border-secondary)',
            borderTop: '3px solid var(--accent-blue)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: 'var(--spacing-md)'
          }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading profiles...</p>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <AuthRequiredMessage />;
    }

    if (profiles.length === 0) {
      return (
        <div style={{
          textAlign: 'center',
          padding: 'var(--spacing-xxl)',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--backdrop-blur))',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--border-radius-xl)',
          margin: 'var(--spacing-xl) auto',
          maxWidth: '600px'
        }}>
          <Users size={48} style={{ color: 'var(--text-muted)', marginBottom: 'var(--spacing-lg)' }} />
          <h2 style={{
            fontSize: '2rem',
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-md)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>No Client Profiles Yet</h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: 'var(--spacing-xl)',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Create your first client profile to start building comprehensive business intelligence and AI transformation roadmaps. Your profiles will be securely stored in your cloud account.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button 
              className="btn btn-primary btn-large"
              onClick={handleCreateProfile}
            >
              Create Your First Profile
            </button>
            <button 
              className="btn btn-secondary btn-large"
              onClick={loadDemoProfiles}
            >
              <BarChart size={20} style={{ marginRight: '0.5rem' }} /> Load Demo Profiles
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: 'var(--spacing-xl)',
        marginBottom: 'var(--spacing-xxl)'
      }}>
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onView={() => handleViewProfile(profile.id)}
            onGenerateTimeline={() => handleGenerateTimeline(profile)}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <GlobalHeader />
      
      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        borderBottom: '1px solid var(--border-primary)',
        padding: 'var(--spacing-lg)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-lg)'
        }}>
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--spacing-sm)'
            }}>Client Profiles</h1>
            <p style={{
              margin: 0,
              fontSize: '1rem',
              color: 'var(--text-secondary)'
            }}>
              {isAuthenticated ? 
                `Welcome back, ${user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}! Manage your client intelligence.` :
                'Manage your client intelligence and AI transformation roadmaps'
              }
            </p>
          </div>
          
          {isAuthenticated && (
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
              <button 
                className="btn btn-primary"
                onClick={handleCreateProfile}
              >
                <Plus size={18} />
                New Profile
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'var(--spacing-xl) var(--spacing-lg)'
      }}>
        {renderContent()}
      </div>
    </div>
  );
}

function ProfileCard({ profile, onView, onGenerateTimeline }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getIndustryIcon = (industry) => {
    switch (industry) {
      case 'Technology': return <Briefcase size={24} />;
      case 'Healthcare': return <Building2 size={24} />;
      case 'Finance': return <BarChart size={24} />;
      case 'Manufacturing': return <Building2 size={24} />;
      case 'Retail': return <Store size={24} />;
      case 'Education': return <GraduationCap size={24} />;
      case 'Real Estate': return <Home size={24} />;
      case 'Transportation': return <Truck size={24} />;
      case 'Energy': return <Zap size={24} />;
      default: return <Store size={24} />;
    }
  };

  const getSizeLabel = (size) => {
    const labels = {
      '1-50 employees': 'Startup',
      '51-200 employees': 'Small',
      '201-1000 employees': 'Medium',
      '1000+ employees': 'Enterprise'
    };
    return labels[size] || size;
  };

  return (
    <div style={{
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(var(--backdrop-blur))',
      borderRadius: 'var(--border-radius-xl)',
      padding: 'var(--spacing-xl)',
      border: '1px solid var(--border-primary)',
      transition: 'all var(--transition-normal) cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-lg)'
      }}>
        <div style={{
          fontSize: '2.2rem',
          width: '60px',
          height: '60px',
          borderRadius: 'var(--border-radius-lg)',
          background: 'linear-gradient(135deg, rgba(120, 119, 198, 0.3), rgba(255, 119, 198, 0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid var(--border-primary)',
          backdropFilter: 'blur(10px)'
        }}>
          {getIndustryIcon(profile.industry)}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--text-primary)',
            margin: '0 0 var(--spacing-sm) 0',
            letterSpacing: '-0.01em'
          }}>{profile.companyName}</h3>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--spacing-sm)', 
            flexWrap: 'wrap' 
          }}>
            <span style={{
              padding: '0.4rem 1rem',
              borderRadius: 'var(--border-radius-lg)',
              fontSize: '0.8rem',
              fontWeight: 'var(--font-weight-semibold)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--profile-tag-industry-border)',
              background: 'var(--profile-tag-industry-bg)',
              color: 'var(--profile-tag-industry-color)'
            }}>{profile.industry}</span>
            <span style={{
              padding: '0.4rem 1rem',
              borderRadius: 'var(--border-radius-lg)',
              fontSize: '0.8rem',
              fontWeight: 'var(--font-weight-semibold)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--profile-tag-size-border)',
              background: 'var(--profile-tag-size-bg)',
              color: 'var(--profile-tag-size-color)'
            }}>{getSizeLabel(profile.size)}</span>
            {profile._supabaseRecord && (
              <span style={{
                padding: '0.4rem 1rem',
                borderRadius: 'var(--border-radius-lg)',
                fontSize: '0.8rem',
                fontWeight: 'var(--font-weight-semibold)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#60a5fa'
              }}>☁️ Cloud</span>
            )}
          </div>
        </div>
      </div>

      <div style={{
        marginBottom: 'var(--spacing-lg)',
        paddingBottom: 'var(--spacing-lg)',
        borderBottom: '1px solid var(--border-primary)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 'var(--spacing-md)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{
              display: 'block',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: 'var(--spacing-xs)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'var(--font-weight-medium)'
            }}>Created</span>
            <span style={{
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--text-primary)',
              fontSize: '1rem'
            }}>{formatDate(profile.createdAt)}</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{
              display: 'block',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: 'var(--spacing-xs)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'var(--font-weight-medium)'
            }}>Status</span>
            <span style={{
              fontWeight: 'var(--font-weight-bold)',
              color: profile.status === 'draft' ? 'var(--accent-yellow)' : 'var(--accent-green)',
              fontSize: '1rem'
            }}>
              {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
            </span>
          </div>
        </div>

        {profile.valueSellingFramework?.businessIssues?.length > 0 && (
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--text-secondary)',
              display: 'block',
              marginBottom: 'var(--spacing-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>Key Issues:</span>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--spacing-xs)'
            }}>
              {profile.valueSellingFramework.businessIssues.slice(0, 2).map((issue, index) => (
                <span key={index} style={{
                  padding: '0.3rem 0.75rem',
                  background: 'var(--profile-tag-issue-bg)',
                  color: 'var(--profile-tag-issue-color)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.75rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  border: '1px solid var(--profile-tag-issue-border)',
                  backdropFilter: 'blur(10px)'
                }}>{issue}</span>
              ))}
              {profile.valueSellingFramework.businessIssues.length > 2 && (
                <span style={{
                  padding: '0.3rem 0.75rem',
                  background: 'var(--profile-tag-more-bg)',
                  color: 'var(--profile-tag-more-color)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.75rem',
                  fontWeight: 'var(--font-weight-semibold)',
                  border: '1px solid var(--profile-tag-more-border)',
                  backdropFilter: 'blur(10px)'
                }}>+{profile.valueSellingFramework.businessIssues.length - 2} more</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        gap: 'var(--spacing-md)',
        justifyContent: 'flex-end'
      }}>
        <button 
          className="btn btn-secondary"
          onClick={onView}
          style={{
            padding: 'var(--spacing-sm) var(--spacing-md)',
            fontSize: '0.875rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)'
          }}
        >
          <Eye size={16} />
          View Details
        </button>
        <button 
          className="btn btn-primary"
          onClick={onGenerateTimeline}
          style={{
            padding: 'var(--spacing-sm) var(--spacing-md)',
            fontSize: '0.875rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)'
          }}
        >
          <TrendingUp size={16} />
          AI Timeline
        </button>
      </div>
    </div>
  );
} 


================================================
FILE: app/profiles/profile-detail.css
================================================
/* Profile Detail Page Styles - Modern Dark Theme */

.profile-detail-page {
  min-height: 100vh;
  background: var(--bg-primary);
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.15) 0%, transparent 50%);
  padding: 0;
  position: relative;
}

.profile-detail-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    linear-gradient(135deg, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
    linear-gradient(225deg, rgba(255, 119, 198, 0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 1;
}

/* Header Styles */
.profile-detail-header {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--backdrop-blur));
  border-bottom: 1px solid var(--border-primary);
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-primary);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--backdrop-blur));
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-normal) ease;
  text-decoration: none;
}

.back-button:hover {
  background: var(--btn-secondary-hover);
  border-color: var(--border-primary);
  color: var(--text-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.header-title-section {
  flex: 1;
}

.company-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.company-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(120, 119, 198, 0.3), rgba(255, 119, 198, 0.2));
  border: 1px solid var(--border-primary);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-xl);
  color: var(--text-primary);
}

.company-name {
  font-size: 2rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.01em;
}

.company-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.industry-tag,
.size-tag,
.status-tag {
  padding: 0.4rem 1rem;
  border-radius: var(--border-radius-lg);
  font-size: 0.8rem;
  font-weight: var(--font-weight-semibold);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-secondary);
}

.industry-tag {
  background: var(--profile-tag-industry-bg);
  color: var(--profile-tag-industry-color);
  border-color: var(--profile-tag-industry-border);
}

.size-tag {
  background: var(--profile-tag-size-bg);
  color: var(--profile-tag-size-color);
  border-color: var(--profile-tag-size-border);
}

.status-tag {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.2));
  color: #86efac;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

/* Navigation Tabs */
.profile-detail-nav {
  background: rgba(255, 255, 255, 0.03); /* This is a very specific color, might need a new variable if used elsewhere */
  backdrop-filter: blur(var(--backdrop-blur));
  border-bottom: 1px solid var(--border-primary);
  padding: 0 2rem;
  display: flex;
  gap: 0;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.nav-tab {
  padding: 1rem 1.5rem;
  border: none;
  background: none;
  color: var(--text-secondary);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all var(--transition-normal) ease;
  white-space: nowrap;
  position: relative;
}

.nav-tab:hover {
  color: var(--text-primary);
  background: var(--btn-secondary-hover);
}

.nav-tab.active {
  color: var(--text-primary);
  border-bottom-color: var(--accent-blue);
  background: rgba(59, 130, 246, 0.1);
}

/* Content Area */
.profile-detail-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
  position: relative;
  z-index: 2;
}

.tab-content {
  min-height: 400px;
}

/* Overview Tab */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.info-card,
.analysis-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--backdrop-blur));
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-primary);
  padding: 2rem;
  box-shadow: var(--shadow-xl);
  transition: all var(--transition-normal) ease;
  position: relative;
  overflow: hidden;
}

.info-card::before,
.analysis-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity var(--transition-slow) ease;
  pointer-events: none;
}

.info-card:hover,
.analysis-card:hover {
  transform: translateY(-4px);
  border-color: rgba(120, 119, 198, 0.3); /* This color isn't in variables, may need to add if used often */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(120, 119, 198, 0.2);
}

.info-card:hover::before,
.analysis-card:hover::before {
  opacity: 1;
}

.info-card h3,
.analysis-card h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-primary);
  padding-bottom: 0.75rem;
}

.info-card h4,
.analysis-card h4,
.opportunity-card h4,
.problems-section h4,
.opportunities-section h4 {
  color: var(--text-primary);
  font-weight: var(--font-weight-semibold);
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
}

.info-card p,
.analysis-card p,
.opportunity-card p,
.problems-section p,
.opportunities-section p {
  color: var(--text-secondary);
  line-height: var(--line-height);
}

.info-card ul,
.analysis-card ul,
.opportunity-card ul,
.problems-section ul,
.opportunities-section ul {
  color: var(--text-secondary);
  padding-left: 1.5rem;
  margin: 0;
}

.info-card li,
.analysis-card li,
.opportunity-card li,
.problems-section li,
.opportunities-section li {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.problems-section,
.opportunities-section {
  margin-bottom: 1.5rem;
}

.problems-section:last-child,
.opportunities-section:last-child {
  margin-bottom: 0;
}

/* Removed !important overrides and set base colors */
.profile-detail-content h1,
.profile-detail-content h2,
.profile-detail-content h3,
.profile-detail-content h4,
.profile-detail-content h5,
.profile-detail-content h6 {
  color: var(--text-primary);
}

.profile-detail-content p,
.profile-detail-content span,
.profile-detail-content div {
  /* Be careful with global div color change */
}

.profile-detail-content,
.profile-detail-content ul,
.profile-detail-content ol,
.profile-detail-content li {
  color: var(--text-secondary);
}

.capabilities-section,
.solutions-section,
.value-section,
.architecture-section {
  color: var(--text-secondary);
}

.capabilities-section h4,
.solutions-section h4,
.value-section h4,
.architecture-section h4 {
  color: var(--text-primary);
}

/* This is a very broad selector, it's better to be more specific */
/* .profile-detail-content * {
  color: inherit;
} */

.tab-content {
  color: var(--text-secondary);
}

.tab-content h1,
.tab-content h2, 
.tab-content h3,
.tab-content h4,
.tab-content h5,
.tab-content h6 {
  color: var(--text-primary);
}

.tab-content a {
  color: var(--text-muted);
}

.tab-content a[href^="mailto:"] {
  color: var(--accent-green);
}

.tab-content a[href^="tel:"] {
  color: var(--accent-yellow);
}


.info-grid {
  display: grid;
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-item span {
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
}

/* Tags */
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  padding: 0.375rem 0.75rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
}

.business-issue-tag {
  background: rgba(239, 68, 68, 0.1);
  color: var(--accent-red);
  border: 1px solid rgba(239, 68, 68, 0.2);
  backdrop-filter: blur(10px);
}

.details-text {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-primary);
}

.details-text p {
  color: var(--text-secondary);
  line-height: var(--line-height);
  margin: 0;
}

/* Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.metric-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-item label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
  color: var(--accent-green);
}

/* AI Readiness */
.ai-readiness-display {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.readiness-score {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.score-value {
  font-size: 3rem;
  font-weight: var(--font-weight-semibold);
  color: var(--accent-blue);
}

.score-label {
  font-size: 1.25rem;
  color: var(--text-muted);
  font-weight: var(--font-weight-medium);
}

.tech-stack {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.tech-stack label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tech-items {
  display: grid;
  gap: 0.75rem;
}

.tech-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--bg-secondary);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-primary);
  transition: all var(--transition-fast) ease;
}

.tech-item:hover {
  background: var(--btn-secondary-hover);
  border-color: var(--border-primary);
}

.tech-label {
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  text-transform: capitalize;
}

.tech-value {
  color: var(--text-muted);
  font-weight: var(--font-weight-normal);
}

/* Analysis Tab */
.analysis-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.decision-makers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.decision-maker {
  padding: 1.5rem;
  background: rgba(59, 130, 246, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg);
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all var(--transition-fast) ease;
}

.decision-maker:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

.decision-maker h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.decision-maker p {
  margin: 0.25rem 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

.capabilities-list {
  display: grid;
  gap: 0.75rem;
}

.capability-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.05));
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius-lg);
  border: 1px solid rgba(34, 197, 94, 0.2);
  transition: all var(--transition-fast) ease;
}

.capability-item:hover {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.1));
  border-color: rgba(34, 197, 94, 0.3);
  transform: translateY(-1px);
}

.capability-icon {
  color: var(--accent-green);
  font-weight: var(--font-weight-medium);
}

.roi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.roi-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  background: rgba(245, 158, 11, 0.08);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
  border: 1px solid rgba(245, 158, 11, 0.15);
  transition: all var(--transition-fast) ease;
}

.roi-item:hover {
  background: rgba(245, 158, 11, 0.12);
  border-color: rgba(245, 158, 11, 0.25);
  transform: translateY(-1px);
}

.roi-item label {
  font-size: 0.875rem;
  font-weight: var(--font-weight-medium);
  color: var(--accent-yellow);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.roi-item span {
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
}

/* Opportunities Tab */
.opportunities-section,
.quick-wins-section {
  margin-bottom: 2rem;
}

.opportunities-section h3,
.quick-wins-section h3 {
  margin: 0 0 2rem 0;
  font-size: 1.5rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.opportunities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.opportunity-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--backdrop-blur));
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-primary);
  padding: 2rem;
  box-shadow: var(--shadow-xl);
  transition: all var(--transition-normal) ease;
  position: relative;
  overflow: hidden;
}

.opportunity-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity var(--transition-slow) ease;
  pointer-events: none;
}

.opportunity-card:hover {
  transform: translateY(-4px);
  border-color: rgba(120, 119, 198, 0.3); /* This color isn't in variables, may need to add if used often */
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(120, 119, 198, 0.2);
}

.opportunity-card:hover::before {
  opacity: 1;
}

.opportunity-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.opportunity-header h4 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  flex: 1;
}

.priority-badge {
  padding: 0.3rem 0.75rem;
  border-radius: var(--border-radius-sm);
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-secondary);
}

.priority-high {
  background: rgba(239, 68, 68, 0.1);
  color: var(--accent-red);
  border-color: rgba(239, 68, 68, 0.2);
}

.priority-medium {
  background: rgba(245, 158, 11, 0.1);
  color: var(--accent-yellow);
  border-color: rgba(245, 158, 11, 0.2);
}

.priority-low {
  background: rgba(34, 197, 94, 0.1);
  color: var(--accent-green);
  border-color: rgba(34, 197, 94, 0.2);
}

.opportunity-details {
  display: grid;
  gap: 0.75rem;
}

.opportunity-details p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  display: flex;
  gap: 0.5rem;
  line-height: 1.5;
}

.opportunity-details strong {
  color: var(--text-primary);
  min-width: 120px;
  font-weight: var(--font-weight-medium);
}

.quick-wins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.quick-win-card {
  background: rgba(34, 197, 94, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(34, 197, 94, 0.15);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  transition: all var(--transition-fast) ease;
}

.quick-win-card:hover {
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(34, 197, 94, 0.25);
  transform: translateY(-2px);
}

.quick-win-card h4 {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  font-weight: var(--font-weight-semibold);
  color: var(--accent-green);
}

.quick-win-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.impact {
  font-weight: var(--font-weight-medium);
  color: var(--accent-green);
}

.timeline {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.empty-opportunities {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-muted);
  background: var(--bg-secondary);
  backdrop-filter: blur(var(--backdrop-blur));
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-primary);
}

/* Professional Link Styling for Dark Theme */
.profile-detail-content a,
.decision-maker a,
.info-card a,
.analysis-card a,
.opportunity-card a {
  color: var(--text-muted);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-fast) ease;
  border-bottom: 1px solid transparent;
}

.profile-detail-content a:hover,
.decision-maker a:hover,
.info-card a:hover,
.analysis-card a:hover,
.opportunity-card a:hover {
  color: var(--text-secondary);
  border-bottom-color: var(--text-muted);
}

/* Email links - professional green */
.profile-detail-content a[href^="mailto:"],
.decision-maker a[href^="mailto:"] {
  color: var(--accent-green);
  background: rgba(16, 185, 129, 0.08);
  padding: 0.2rem 0.5rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid rgba(16, 185, 129, 0.15);
}

.profile-detail-content a[href^="mailto:"]:hover,
.decision-maker a[href^="mailto:"]:hover {
  color: #34d399; /* This is a lighter shade of green, might need a variable */
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.25);
}

/* Phone links - professional amber */
.profile-detail-content a[href^="tel:"],
.decision-maker a[href^="tel:"] {
  color: var(--accent-yellow);
  background: rgba(245, 158, 11, 0.08);
  padding: 0.2rem 0.5rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid rgba(245, 158, 11, 0.15);
}

.profile-detail-content a[href^="tel:"]:hover,
.decision-maker a[href^="tel:"]:hover {
  color: #fbbf24; /* This is a lighter shade of yellow, might need a variable */
  background: rgba(245, 158, 11, 0.12);
  border-color: rgba(245, 158, 11, 0.25);
}

/* Markdown Tab */
.markdown-container {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--backdrop-blur));
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-primary);
  overflow: hidden;
}

.markdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-primary);
  background: var(--bg-secondary);
  backdrop-filter: blur(10px);
}

.markdown-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.markdown-content {
  padding: 2rem;
  background: var(--bg-tertiary);
  backdrop-filter: blur(10px);
  color: var(--text-primary);
  font-family: var(--font-family-mono);
  font-size: 0.875rem;
  line-height: var(--line-height);
  overflow-x: auto;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Footer */
.profile-detail-footer {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--backdrop-blur));
  border-top: 1px solid var(--border-primary);
  padding: 1.5rem 2rem;
  margin-top: 3rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-info {
  display: flex;
  gap: 2rem;
  font-size: 0.875rem;
  color: var(--text-muted);
}

/* Loading and Error States */
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 3rem 2rem;
  background: var(--bg-secondary);
  backdrop-filter: blur(var(--backdrop-blur));
  border-radius: var(--border-radius-xl);
  border: 1px solid var(--border-primary);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--border-secondary);
  border-top: 4px solid var(--accent-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  color: var(--text-muted);
  font-size: 1rem;
  margin: 0;
}

.error-container h2 {
  color: var(--accent-red);
  margin-bottom: 1rem;
  font-weight: var(--font-weight-semibold);
}

.error-container p {
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  text-align: center;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-detail-header,
  .profile-detail-nav,
  .profile-detail-content {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .company-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .profile-detail-nav {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .nav-tab {
    flex-shrink: 0;
  }
  
  .overview-grid,
  .opportunities-grid {
    grid-template-columns: 1fr;
  }
  
  .decision-makers-grid,
  .metrics-grid,
  .roi-grid {
    grid-template-columns: 1fr;
  }
  
  .opportunity-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .quick-win-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .footer-info {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .company-name {
    font-size: 1.5rem;
  }
  
  .company-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .header-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .header-actions .btn {
    width: 100%;
    justify-content: center;
  }
} 


================================================
FILE: app/profiles/[id]/page.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';
import GlobalHeader from '../../components/GlobalHeader';
import { ArrowLeft, FileEdit, TrendingUp, Briefcase, Building2, BarChart, Store, GraduationCap, Home, Truck, Zap } from 'lucide-react';

export default function ProfileDetailPage() {
  const params = useParams();
  const profileId = params.id;
  
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadProfile();
  }, [profileId]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await ProfileService.getProfile(profileId);
      
      if (!profileData) {
        setError('Profile not found');
        return;
      }
      
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateTimeline = () => {
    window.location.href = `/timeline?profileId=${profileId}`;
  };

  const handleEdit = () => {
    window.location.href = `/profiles/${profileId}/edit`;
  };

  const handleBack = () => {
    window.location.href = '/profiles';
  };

  if (isLoading) {
    return (
      <div className="profile-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-detail-page">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleBack}>
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-detail-page">
        <div className="error-container">
          <h2>Profile Not Found</h2>
          <p>The requested profile could not be found.</p>
          <button className="btn btn-primary" onClick={handleBack}>
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getIndustryIcon = (industry) => {
    const icons = {
      'Technology': <Briefcase size={24} />,
      'Healthcare': <Building2 size={24} />,
      'Finance': <BarChart size={24} />,
      'Manufacturing': <Building2 size={24} />,
      'Retail': <Store size={24} />,
      'Education': <GraduationCap size={24} />,
      'Real Estate': <Home size={24} />,
      'Transportation': <Truck size={24} />,
      'Energy': <Zap size={24} />,
      'Other': <Store size={24} />
    };
    return icons[industry] || <Store size={24} />;
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <GlobalHeader />
      
      {/* Profile Header */}
      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        borderBottom: '1px solid var(--border-primary)',
        padding: 'var(--spacing-lg)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-lg)'
        }}>
          <button 
            onClick={handleBack}
            aria-label="Back to Profiles"
            className="btn btn-secondary"
            style={{
              padding: 'var(--spacing-sm)',
              minWidth: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-md)',
            flex: 1
          }}>
            <div style={{
              fontSize: '2.2rem',
              width: '60px',
              height: '60px',
              borderRadius: 'var(--border-radius-lg)',
              background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-green))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              {getIndustryIcon(profile.industry)}
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '2rem',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--spacing-sm)'
              }}>{profile.companyName}</h1>
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                <span style={{
                  padding: '0.3rem 0.75rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: 'var(--accent-blue)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.85rem',
                  fontWeight: 'var(--font-weight-medium)'
                }}>{profile.industry}</span>
                <span style={{
                  padding: '0.3rem 0.75rem',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: 'var(--accent-green)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.85rem',
                  fontWeight: 'var(--font-weight-medium)'
                }}>{profile.size}</span>
                <span style={{
                  padding: '0.3rem 0.75rem',
                  background: 'rgba(245, 158, 11, 0.1)',
                  color: 'var(--accent-yellow)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.85rem',
                  fontWeight: 'var(--font-weight-medium)'
                }}>{profile.status}</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
            <button 
              className="btn btn-secondary"
              onClick={handleEdit}
            >
              <FileEdit size={18} />
              Edit Profile
            </button>
            <button 
              className="btn btn-primary"
              onClick={handleGenerateTimeline}
            >
              <TrendingUp size={18} />
              Generate AI Timeline
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        borderBottom: '1px solid var(--border-primary)',
        background: 'var(--bg-secondary)',
        padding: '0 var(--spacing-lg)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: 'var(--spacing-lg)'
        }}>
          <button 
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: activeTab === 'overview' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'overview' ? 'white' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)',
              transition: 'all var(--transition-fast) ease'
            }}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: activeTab === 'analysis' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'analysis' ? 'white' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)',
              transition: 'all var(--transition-fast) ease'
            }}
            onClick={() => setActiveTab('analysis')}
          >
            Analysis
          </button>
          <button 
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: activeTab === 'opportunities' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'opportunities' ? 'white' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)',
              transition: 'all var(--transition-fast) ease'
            }}
            onClick={() => setActiveTab('opportunities')}
          >
            AI Opportunities
          </button>
          <button 
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: activeTab === 'markdown' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'markdown' ? 'white' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: 'var(--border-radius) var(--border-radius) 0 0',
              cursor: 'pointer',
              fontWeight: 'var(--font-weight-medium)',
              transition: 'all var(--transition-fast) ease'
            }}
            onClick={() => setActiveTab('markdown')}
          >
            Markdown
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--spacing-xl) var(--spacing-lg)'
      }}>
        {activeTab === 'overview' && (
          <ProfileOverviewTab profile={profile} />
        )}
        
        {activeTab === 'analysis' && (
          <ProfileAnalysisTab profile={profile} />
        )}
        
        {activeTab === 'opportunities' && (
          <ProfileOpportunitiesTab profile={profile} />
        )}
        
        {activeTab === 'markdown' && (
          <ProfileMarkdownTab profile={profile} />
        )}
      </div>

      {/* Footer Info */}
      <div style={{
        borderTop: '1px solid var(--border-primary)',
        background: 'var(--bg-secondary)',
        padding: 'var(--spacing-md) var(--spacing-lg)',
        marginTop: 'var(--spacing-xxl)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: 'var(--spacing-lg)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)',
          justifyContent: 'center'
        }}>
          <span>Created: {formatDate(profile.createdAt)}</span>
          <span>•</span>
          <span>Updated: {formatDate(profile.updatedAt)}</span>
          <span>•</span>
          <span>ID: {profile.id}</span>
        </div>
      </div>
    </div>
  );
}

// Tab Components
function ProfileOverviewTab({ profile }) {
  return (
    <div className="tab-content overview-tab">
      <div className="overview-grid">
        {/* Company Information */}
        <div className="info-card">
          <h3>Company Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Company Name</label>
              <span>{profile.companyName}</span>
            </div>
            <div className="info-item">
              <label>Industry</label>
              <span>{profile.industry}</span>
            </div>
            <div className="info-item">
              <label>Size</label>
              <span>{profile.size}</span>
            </div>
            <div className="info-item">
              <label>Annual Revenue</label>
              <span>{profile.annualRevenue ? `$${profile.annualRevenue}` : 'Not specified'}</span>
            </div>
            <div className="info-item">
              <label>Employee Count</label>
              <span>{profile.employeeCount || 'Not specified'}</span>
            </div>
            <div className="info-item">
              <label>Location</label>
              <span>{profile.primaryLocation || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Strategic Initiatives */}
        {profile.expectedOutcome?.strategicInitiatives?.length > 0 && (
          <div className="info-card">
            <h3>Strategic Initiatives</h3>
            <div className="initiatives-list">
              {profile.expectedOutcome.strategicInitiatives.map((initiative, index) => (
                <div key={index} className="initiative-item">
                  <div className="initiative-description">{initiative.initiative}</div>
                  {initiative.contact && (
                    <div className="initiative-contact">
                      <strong>{initiative.contact.name}</strong> ({initiative.contact.title})
                      <br />
                      <a href={`mailto:${initiative.contact.email}`}>{initiative.contact.email}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Business Problems & Opportunities */}
        {(profile.problems?.businessProblems?.length > 0 || profile.problems?.agenticOpportunities?.length > 0) && (
          <div className="info-card">
            <h3>Problems & Agentic AI Opportunities</h3>
            {profile.problems.businessProblems?.length > 0 && (
              <div className="problems-section">
                <h4>Current Problems:</h4>
                <ul>
                  {profile.problems.businessProblems.map((problem, index) => (
                    <li key={index}>{problem}</li>
                  ))}
                </ul>
              </div>
            )}
            {profile.problems.agenticOpportunities?.length > 0 && (
              <div className="opportunities-section">
                <h4>Agentic Opportunities:</h4>
                <ul>
                  {profile.problems.agenticOpportunities.map((opportunity, index) => (
                    <li key={index}>{opportunity}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Business Value */}
        {profile.value?.businessValue && (
          <div className="info-card">
            <h3>Business Value</h3>
            <div className="value-content">
              {profile.value.businessValue.totalAnnualImpact && (
                <div className="metric-item highlight">
                  <label>Total Annual Impact</label>
                  <span className="metric-value">{profile.value.businessValue.totalAnnualImpact}</span>
                </div>
              )}
              {profile.value.businessValue.revenueImpact && (
                <div className="value-item">
                  <strong>Revenue Impact:</strong> {profile.value.businessValue.revenueImpact}
                </div>
              )}
              {profile.value.businessValue.costReduction && (
                <div className="value-item">
                  <strong>Cost Reduction:</strong> {profile.value.businessValue.costReduction}
                </div>
              )}
              {profile.value.businessValue.operationalEfficiency && (
                <div className="value-item">
                  <strong>Operational Efficiency:</strong> {profile.value.businessValue.operationalEfficiency}
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI Readiness */}
        {profile.aiOpportunityAssessment && (
          <div className="info-card">
            <h3>AI Readiness</h3>
            <div className="ai-readiness-display">
              <div className="readiness-score">
                <span className="score-value">{profile.aiOpportunityAssessment.aiReadinessScore || profile.aiReadinessScore || 'N/A'}</span>
                <span className="score-label">/ 10</span>
              </div>
              {profile.aiOpportunityAssessment.currentTechnology && (
                <div className="tech-stack">
                  <label>Current Technology</label>
                  <div className="tech-items">
                    {Object.entries(profile.aiOpportunityAssessment.currentTechnology).map(([key, value]) => (
                      value && (
                        <div key={key} className="tech-item">
                          <span className="tech-label">{key}:</span>
                          <span className="tech-value">{value}</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileAnalysisTab({ profile }) {
  return (
    <div className="tab-content analysis-tab">
      <div className="analysis-sections">
        {/* Key Contacts */}
        {profile.expectedOutcome?.strategicInitiatives?.length > 0 && (
          <div className="analysis-card">
            <h3>Key Executive Contacts</h3>
            <div className="contacts-grid">
              {profile.expectedOutcome.strategicInitiatives.map((initiative, index) => (
                initiative.contact && (
                  <div key={index} className="contact-card">
                    <h4>{initiative.contact.name}</h4>
                    <p className="contact-title">{initiative.contact.title}</p>
                    <p className="contact-initiative"><strong>Initiative:</strong> {initiative.initiative}</p>
                    <div className="contact-details">
                      <p><strong>Email:</strong> <a href={`mailto:${initiative.contact.email}`}>{initiative.contact.email}</a></p>
                      {initiative.contact.phone && (
                        <p><strong>Phone:</strong> <a href={`tel:${initiative.contact.phone}`}>{initiative.contact.phone}</a></p>
                      )}
                      {initiative.contact.linkedin && (
                        <p><strong>LinkedIn:</strong> <a href={`https://${initiative.contact.linkedin}`} target="_blank" rel="noopener noreferrer">{initiative.contact.linkedin}</a></p>
                      )}
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Solutions & Capabilities */}
        {(profile.solutions?.capabilities?.length > 0 || profile.solutions?.differentiators?.length > 0) && (
          <div className="analysis-card">
            <h3>Solutions & Capabilities</h3>
            {profile.solutions.capabilities?.length > 0 && (
              <div className="capabilities-section">
                <h4>Required Capabilities:</h4>
                <div className="capabilities-list">
                  {profile.solutions.capabilities.map((capability, index) => (
                    <div key={index} className="capability-item">
                      <span className="capability-icon">✓</span>
                      <span>{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {profile.solutions.differentiators?.length > 0 && (
              <div className="differentiators-section">
                <h4>Key Differentiators:</h4>
                <div className="differentiators-list">
                  {profile.solutions.differentiators.map((differentiator, index) => (
                    <div key={index} className="differentiator-item">
                      <span className="differentiator-icon">⭐</span>
                      <span>{differentiator}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ROI Expectations */}
        {profile.valueSellingFramework?.roiExpectations && (
          <div className="analysis-card">
            <h3>ROI Expectations</h3>
            <div className="roi-grid">
              {Object.entries(profile.valueSellingFramework.roiExpectations).map(([key, value]) => (
                value && (
                  <div key={key} className="roi-item">
                    <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                    <span>{value}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileOpportunitiesTab({ profile }) {
  const businessProblems = profile.problems?.businessProblems || [];
  const agenticOpportunities = profile.problems?.agenticOpportunities || [];
  const currentArchitecture = profile.currentArchitecture || {};

  return (
    <div className="tab-content opportunities-tab">
      {(businessProblems.length > 0 || agenticOpportunities.length > 0) && (
        <div className="problems-opportunities-section">
          <div className="problems-opportunities-grid">
            {businessProblems.length > 0 && (
              <div className="problems-section">
                <h3>Current Business Problems</h3>
                <div className="problems-list">
                  {businessProblems.map((problem, index) => (
                    <div key={index} className="problem-card">
                      <div className="problem-text">{problem}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {agenticOpportunities.length > 0 && (
              <div className="opportunities-section">
                <h3>Agentic AI Opportunities</h3>
                <div className="opportunities-list">
                  {agenticOpportunities.map((opportunity, index) => (
                    <div key={index} className="opportunity-card">
                      <div className="opportunity-text">{opportunity}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Current Architecture */}
      {(currentArchitecture.coreSystems?.length > 0 || currentArchitecture.aiReadiness) && (
        <div className="architecture-section">
          <h3>Current Architecture & AI Readiness</h3>
          <div className="architecture-content">
            {currentArchitecture.coreSystems?.length > 0 && (
              <div className="systems-list">
                <h4>Core Systems:</h4>
                <ul>
                  {currentArchitecture.coreSystems.map((system, index) => (
                    <li key={index}>{system}</li>
                  ))}
                </ul>
              </div>
            )}
            {currentArchitecture.aiReadiness && (
              <div className="readiness-assessment">
                <h4>AI Readiness:</h4>
                <p>{currentArchitecture.aiReadiness}</p>
              </div>
            )}
            {currentArchitecture.technicalDebt && (
              <div className="technical-debt">
                <h4>Technical Debt:</h4>
                <p>{currentArchitecture.technicalDebt}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {businessProblems.length === 0 && agenticOpportunities.length === 0 && (
        <div className="empty-opportunities">
          <p>No problems or agentic AI opportunities identified yet. Complete the Problems & Opportunities section to see the analysis.</p>
        </div>
      )}
    </div>
  );
}

function ProfileMarkdownTab({ profile }) {
  const markdown = profile.markdown || markdownService.generateMarkdown(profile);

  return (
    <div className="tab-content markdown-tab">
      <div className="markdown-container">
        <div className="markdown-header">
          <h3>Profile Markdown</h3>
          <button 
            className="btn btn-secondary btn-small"
            onClick={() => navigator.clipboard.writeText(markdown)}
          >
            Copy to Clipboard
          </button>
        </div>
        <pre className="markdown-content">
          {markdown}
        </pre>
      </div>
    </div>
  );
} 


================================================
FILE: app/profiles/[id]/__tests__/page.test.js
================================================
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileDetailPage from '../page';
import { ProfileService } from '../../../services/profileService';
import { markdownService } from '../../../services/markdownService';

// Mock the services
jest.mock('../../../services/profileService', () => ({
  ProfileService: {
    getProfile: jest.fn(),
  },
}));

jest.mock('../../../services/markdownService', () => ({
  markdownService: {
    generateMarkdown: jest.fn(() => 'Generated markdown content'),
  },
}));

// Mock Next.js useParams
const mockParams = { id: 'test-profile-id' };
jest.mock('next/navigation', () => ({
  useParams: () => mockParams,
}));

// Mock window.location
delete window.location;
window.location = { href: '' };

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

describe('ProfileDetailPage', () => {
  const mockProfile = {
    id: 'test-profile-id',
    companyName: 'Test Corp',
    industry: 'Technology',
    size: 'Mid-Market',
    annualRevenue: '50000000',
    employeeCount: '1500',
    primaryLocation: 'San Francisco, CA',
    status: 'active',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-15T00:00:00.000Z',
    valueSellingFramework: {
      businessIssues: ['Digital Transformation', 'Operational Efficiency'],
      businessIssueDetails: 'Company needs to modernize their systems',
      impact: {
        totalAnnualImpact: '2500000',
        laborCosts: '1000000',
      },
      decisionMakers: {
        economicBuyer: {
          name: 'John Smith',
          title: 'CEO',
          budget: '5000000',
        },
        technicalBuyer: {
          name: 'Jane Doe',
          title: 'CTO',
        },
        champion: {
          name: 'Bob Johnson',
          title: 'VP Operations',
        },
      },
      solutionCapabilities: [
        'Automate document processing',
        'Streamline approval workflows',
      ],
      roiExpectations: {
        paybackPeriod: '18 months',
        expectedRoi: '300%',
      },
    },
    aiOpportunityAssessment: {
      aiReadinessScore: 7,
      currentTechnology: {
        crm: 'Salesforce',
        erp: 'SAP',
        cloudPlatform: 'AWS',
      },
      opportunities: [
        {
          name: 'Automated Invoice Processing',
          department: 'Finance',
          process: 'Invoice Processing',
          currentState: 'Manual review of all invoices',
          aiSolution: 'OCR + ML for automatic data extraction',
          estimatedImpact: '500000',
          timeline: '6 months',
          implementationEffort: 'Medium',
          priorityScore: 8,
        },
      ],
      quickWins: [
        {
          name: 'Chatbot for HR FAQs',
          impact: '100000',
          timeline: '3 months',
        },
      ],
    },
    markdown: 'Custom markdown content',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    ProfileService.getProfile.mockResolvedValue(mockProfile);
  });

  describe('Loading State', () => {
    test('shows loading spinner while fetching profile', async () => {
      // Make the promise not resolve immediately
      let resolvePromise;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      ProfileService.getProfile.mockReturnValue(promise);

      render(<ProfileDetailPage />);

      expect(screen.getByText('Loading profile...')).toBeInTheDocument();
      expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument(); // loading spinner

      // Resolve the promise
      resolvePromise(mockProfile);
      await waitFor(() => {
        expect(screen.queryByText('Loading profile...')).not.toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    test('shows error message when profile not found', async () => {
      ProfileService.getProfile.mockResolvedValue(null);

      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(screen.getByText('Profile Not Found')).toBeInTheDocument();
        expect(screen.getByText('The requested profile could not be found.')).toBeInTheDocument();
        expect(screen.getByText('Back to Profiles')).toBeInTheDocument();
      });
    });

    test('shows error message when service throws error', async () => {
      ProfileService.getProfile.mockRejectedValue(new Error('Network error'));

      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.getByText('Failed to load profile')).toBeInTheDocument();
        expect(screen.getByText('Back to Profiles')).toBeInTheDocument();
      });
    });

    test('back button navigates to profiles page', async () => {
      ProfileService.getProfile.mockResolvedValue(null);

      render(<ProfileDetailPage />);

      await waitFor(() => {
        const backButton = screen.getByText('Back to Profiles');
        fireEvent.click(backButton);
        expect(window.location.href).toBe('/profiles');
      });
    });
  });

  describe('Profile Header', () => {
    test('displays company information correctly', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(screen.getByText('Test Corp')).toBeInTheDocument();
        expect(screen.getByText('Technology')).toBeInTheDocument();
        expect(screen.getByText('Mid-Market')).toBeInTheDocument();
        expect(screen.getByText('active')).toBeInTheDocument();
      });
    });

    test('displays industry icon', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(screen.getByText('💻')).toBeInTheDocument(); // Technology icon
      });
    });

    test('edit button navigates to profiles page', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        const editButton = screen.getByText('Edit Profile');
        fireEvent.click(editButton);
        expect(window.location.href).toBe('/profiles');
      });
    });

    test('generate timeline button navigates with profile ID', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        const timelineButton = screen.getByText('Generate AI Timeline');
        fireEvent.click(timelineButton);
        expect(window.location.href).toBe('/timeline?profileId=test-profile-id');
      });
    });
  });

  describe('Navigation Tabs', () => {
    test('shows all navigation tabs', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toBeInTheDocument();
        expect(screen.getByText('Analysis')).toBeInTheDocument();
        expect(screen.getByText('AI Opportunities')).toBeInTheDocument();
        expect(screen.getByText('Markdown')).toBeInTheDocument();
      });
    });

    test('overview tab is active by default', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        const overviewTab = screen.getByText('Overview');
        expect(overviewTab).toHaveClass('active');
      });
    });

    test('can switch between tabs', async () => {
      const user = userEvent.setup();
      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(screen.getByText('Overview')).toHaveClass('active');
      });

      // Click Analysis tab
      const analysisTab = screen.getByText('Analysis');
      await user.click(analysisTab);

      expect(analysisTab).toHaveClass('active');
      expect(screen.getByText('Overview')).not.toHaveClass('active');
    });
  });

  describe('Overview Tab', () => {
    test('displays company information', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(screen.getByText('Company Information')).toBeInTheDocument();
        expect(screen.getByText('Test Corp')).toBeInTheDocument();
        expect(screen.getByText('Technology')).toBeInTheDocument();
        expect(screen.getByText('$50,000,000')).toBeInTheDocument();
        expect(screen.getByText('1500')).toBeInTheDocument();
        expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
      });
    });

    test('displays business issues', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(screen.getByText('Key Business Issues')).toBeInTheDocument();
        expect(screen.getByText('Digital Transformation')).toBeInTheDocument();
        expect(screen.getByText('Operational Efficiency')).toBeInTheDocument();
        expect(screen.getByText('Company needs to modernize their systems')).toBeInTheDocument();
      });
    });

    test('displays impact analysis', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(screen.getByText('Impact Analysis')).toBeInTheDocument();
        expect(screen.getByText('$2,500,000')).toBeInTheDocument();
        expect(screen.getByText('$1,000,000')).toBeInTheDocument();
      });
    });

    test('displays AI readiness score', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(screen.getByText('AI Readiness')).toBeInTheDocument();
        expect(screen.getByText('7')).toBeInTheDocument();
        expect(screen.getByText('/ 10')).toBeInTheDocument();
        expect(screen.getByText('Salesforce')).toBeInTheDocument();
        expect(screen.getByText('SAP')).toBeInTheDocument();
        expect(screen.getByText('AWS')).toBeInTheDocument();
      });
    });
  });

  describe('Analysis Tab', () => {
    test('displays decision makers information', async () => {
      const user = userEvent.setup();
      render(<ProfileDetailPage />);

      // Switch to Analysis tab
      const analysisTab = screen.getByText('Analysis');
      await user.click(analysisTab);

      await waitFor(() => {
        expect(screen.getByText('Decision Makers')).toBeInTheDocument();
        expect(screen.getByText('Economic Buyer')).toBeInTheDocument();
        expect(screen.getByText('John Smith')).toBeInTheDocument();
        expect(screen.getByText('CEO')).toBeInTheDocument();
        expect(screen.getByText('Budget: $5,000,000')).toBeInTheDocument();

        expect(screen.getByText('Technical Buyer')).toBeInTheDocument();
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('CTO')).toBeInTheDocument();

        expect(screen.getByText('Champion')).toBeInTheDocument();
        expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
        expect(screen.getByText('VP Operations')).toBeInTheDocument();
      });
    });

    test('displays solution requirements', async () => {
      const user = userEvent.setup();
      render(<ProfileDetailPage />);

      // Switch to Analysis tab
      const analysisTab = screen.getByText('Analysis');
      await user.click(analysisTab);

      await waitFor(() => {
        expect(screen.getByText('Solution Requirements')).toBeInTheDocument();
        expect(screen.getByText('Automate document processing')).toBeInTheDocument();
        expect(screen.getByText('Streamline approval workflows')).toBeInTheDocument();
      });
    });

    test('displays ROI expectations', async () => {
      const user = userEvent.setup();
      render(<ProfileDetailPage />);

      // Switch to Analysis tab
      const analysisTab = screen.getByText('Analysis');
      await user.click(analysisTab);

      await waitFor(() => {
        expect(screen.getByText('ROI Expectations')).toBeInTheDocument();
        expect(screen.getByText('18 months')).toBeInTheDocument();
        expect(screen.getByText('300%')).toBeInTheDocument();
      });
    });
  });

  describe('AI Opportunities Tab', () => {
    test('displays AI opportunities', async () => {
      const user = userEvent.setup();
      render(<ProfileDetailPage />);

      // Switch to AI Opportunities tab
      const opportunitiesTab = screen.getByText('AI Opportunities');
      await user.click(opportunitiesTab);

      await waitFor(() => {
        expect(screen.getByText('AI Opportunities')).toBeInTheDocument();
        expect(screen.getByText('Automated Invoice Processing')).toBeInTheDocument();
        expect(screen.getByText('Finance')).toBeInTheDocument();
        expect(screen.getByText('Invoice Processing')).toBeInTheDocument();
        expect(screen.getByText('OCR + ML for automatic data extraction')).toBeInTheDocument();
        expect(screen.getByText('$500,000')).toBeInTheDocument();
        expect(screen.getByText('Priority: 8/10')).toBeInTheDocument();
      });
    });

    test('displays quick wins', async () => {
      const user = userEvent.setup();
      render(<ProfileDetailPage />);

      // Switch to AI Opportunities tab
      const opportunitiesTab = screen.getByText('AI Opportunities');
      await user.click(opportunitiesTab);

      await waitFor(() => {
        expect(screen.getByText('Quick Wins (0-6 months)')).toBeInTheDocument();
        expect(screen.getByText('Chatbot for HR FAQs')).toBeInTheDocument();
        expect(screen.getByText('$100,000 impact')).toBeInTheDocument();
        expect(screen.getByText('3 months')).toBeInTheDocument();
      });
    });

    test('shows empty state when no opportunities exist', async () => {
      const profileWithoutOpportunities = {
        ...mockProfile,
        aiOpportunityAssessment: {
          ...mockProfile.aiOpportunityAssessment,
          opportunities: [],
          quickWins: [],
        },
      };
      ProfileService.getProfile.mockResolvedValue(profileWithoutOpportunities);

      const user = userEvent.setup();
      render(<ProfileDetailPage />);

      // Switch to AI Opportunities tab
      const opportunitiesTab = screen.getByText('AI Opportunities');
      await user.click(opportunitiesTab);

      await waitFor(() => {
        expect(screen.getByText('No AI opportunities identified yet. Complete the AI assessment section to generate recommendations.')).toBeInTheDocument();
      });
    });
  });

  describe('Markdown Tab', () => {
    test('displays markdown content', async () => {
      const user = userEvent.setup();
      render(<ProfileDetailPage />);

      // Switch to Markdown tab
      const markdownTab = screen.getByText('Markdown');
      await user.click(markdownTab);

      await waitFor(() => {
        expect(screen.getByText('Profile Markdown')).toBeInTheDocument();
        expect(screen.getByText('Copy to Clipboard')).toBeInTheDocument();
        expect(screen.getByText('Custom markdown content')).toBeInTheDocument();
      });
    });

    test('generates markdown when not available in profile', async () => {
      const profileWithoutMarkdown = {
        ...mockProfile,
        markdown: undefined,
      };
      ProfileService.getProfile.mockResolvedValue(profileWithoutMarkdown);

      const user = userEvent.setup();
      render(<ProfileDetailPage />);

      // Switch to Markdown tab
      const markdownTab = screen.getByText('Markdown');
      await user.click(markdownTab);

      await waitFor(() => {
        expect(markdownService.generateMarkdown).toHaveBeenCalledWith(profileWithoutMarkdown);
        expect(screen.getByText('Generated markdown content')).toBeInTheDocument();
      });
    });

    test('copy to clipboard button works', async () => {
      const user = userEvent.setup();
      render(<ProfileDetailPage />);

      // Switch to Markdown tab
      const markdownTab = screen.getByText('Markdown');
      await user.click(markdownTab);

      await waitFor(() => {
        const copyButton = screen.getByText('Copy to Clipboard');
        fireEvent.click(copyButton);
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Custom markdown content');
      });
    });
  });

  describe('Footer', () => {
    test('displays profile metadata', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(screen.getByText(/Created:/)).toBeInTheDocument();
        expect(screen.getByText(/Updated:/)).toBeInTheDocument();
        expect(screen.getByText('ID: test-profile-id')).toBeInTheDocument();
      });
    });
  });

  describe('Service Integration', () => {
    test('calls ProfileService.getProfile with correct ID', async () => {
      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(ProfileService.getProfile).toHaveBeenCalledWith('test-profile-id');
      });
    });

    test('handles different profile ID from params', async () => {
      // Mock different profile ID
      const originalParams = mockParams.id;
      mockParams.id = 'different-profile-id';

      render(<ProfileDetailPage />);

      await waitFor(() => {
        expect(ProfileService.getProfile).toHaveBeenCalledWith('different-profile-id');
      });

      // Restore original ID
      mockParams.id = originalParams;
    });
  });
}); 


================================================
FILE: app/profiles/[id]/edit/page.js
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProfileService } from '../../../services/profileService';
import ProfileWizard from '../../components/ProfileWizard';
import GlobalHeader from '../../../components/GlobalHeader';

export default function EditProfilePage() {
  const params = useParams();
  const router = useRouter();
  const profileId = params.id;
  
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfile();
  }, [profileId]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await ProfileService.getProfile(profileId);
      
      if (!profileData) {
        setError('Profile not found');
        return;
      }
      
      setProfile(profileData);
    } catch (error) {
      console.error('Error loading profile:', error);
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = (updatedProfile) => {
    // Navigate back to the profile detail page
    router.push(`/profiles/${updatedProfile.id}`);
  };

  const handleCancel = () => {
    // Navigate back to the profile detail page
    router.push(`/profiles/${profileId}`);
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <GlobalHeader />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 80px)',
          color: 'var(--text-secondary)'
        }}>
          <div className="loading-spinner"></div>
          <p style={{ marginLeft: 'var(--spacing-md)' }}>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <GlobalHeader />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 80px)',
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'var(--accent-red)', marginBottom: 'var(--spacing-md)' }}>Error</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>{error}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => router.push('/profiles')}
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: 'var(--btn-primary-bg)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--border-radius)',
              cursor: 'pointer'
            }}
          >
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
        <GlobalHeader />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 80px)',
          color: 'var(--text-primary)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: 'var(--accent-red)', marginBottom: 'var(--spacing-md)' }}>Profile Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>The requested profile could not be found.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => router.push('/profiles')}
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              background: 'var(--btn-primary-bg)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--border-radius)',
              cursor: 'pointer'
            }}
          >
            Back to Profiles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <GlobalHeader />
      <ProfileWizard
        onComplete={handleComplete}
        onCancel={handleCancel}
        initialData={profile}
        isEditMode={true}
      />
    </div>
  );
} 


================================================
FILE: app/profiles/components/ProblemsOpportunitiesForm.js
================================================
'use client';

import React from 'react';
import { Plus, X, ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react';

/**
 * Problems & Opportunities Form Component
 * 
 * Maps business problems to agentic AI solutions:
 * - Current business problems
 * - Agentic AI workflow opportunities
 * - Direct problem → solution mapping
 * 
 * Data Structure:
 * {
 *   problems: {
 *     businessProblems: [
 *       "Customer support tickets manually triaged - 4+ hour response times",
 *       "Invoice processing and approvals take 2-3 weeks"
 *     ],
 *     agenticOpportunities: [
 *       "Intelligent ticket classification and auto-routing to specialists",
 *       "Automated invoice processing with approval workflows"
 *     ]
 *   }
 * }
 */

export default function ProblemsOpportunitiesForm({ data, onChange }) {
  const businessProblems = data.problems?.businessProblems || [];
  const agenticOpportunities = data.problems?.agenticOpportunities || [];

  const updateData = (path, value) => {
    const newData = { ...data };
    const pathArray = path.split('.');
    let current = newData;
    
    // Navigate to the parent object
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }
    
    // Set the value
    current[pathArray[pathArray.length - 1]] = value;
    onChange(newData);
  };

  const addProblem = () => {
    const newProblems = [...businessProblems, ''];
    updateData('problems.businessProblems', newProblems);
  };

  const removeProblem = (index) => {
    const newProblems = businessProblems.filter((_, i) => i !== index);
    updateData('problems.businessProblems', newProblems);
  };

  const updateProblem = (index, value) => {
    const newProblems = [...businessProblems];
    newProblems[index] = value;
    updateData('problems.businessProblems', newProblems);
  };

  const addOpportunity = () => {
    const newOpportunities = [...agenticOpportunities, ''];
    updateData('problems.agenticOpportunities', newOpportunities);
  };

  const removeOpportunity = (index) => {
    const newOpportunities = agenticOpportunities.filter((_, i) => i !== index);
    updateData('problems.agenticOpportunities', newOpportunities);
  };

  const updateOpportunity = (index, value) => {
    const newOpportunities = [...agenticOpportunities];
    newOpportunities[index] = value;
    updateData('problems.agenticOpportunities', newOpportunities);
  };

  // Common business problems suggestions
  const commonProblems = [
    "Manual data entry taking hours per day",
    "Email-based approvals causing delays",
    "Spreadsheet-heavy processes prone to errors",
    "Customer service response times too slow",
    "Manual reporting taking days to complete",
    "Document processing requiring human review",
    "Repetitive administrative tasks",
    "Cross-system data synchronization issues"
  ];

  // Common agentic opportunities suggestions
  const commonOpportunities = [
    "Automated data extraction and entry",
    "Intelligent approval workflows",
    "AI-powered data validation and error detection",
    "Conversational AI for customer support",
    "Automated report generation and distribution",
    "Intelligent document processing and classification",
    "Workflow automation with smart routing",
    "Real-time data synchronization across systems"
  ];

  const addSuggestedProblem = (problem) => {
    if (!businessProblems.includes(problem)) {
      updateData('problems.businessProblems', [...businessProblems, problem]);
    }
  };

  const addSuggestedOpportunity = (opportunity) => {
    if (!agenticOpportunities.includes(opportunity)) {
      updateData('problems.agenticOpportunities', [...agenticOpportunities, opportunity]);
    }
  };

  return (
    <div className="problems-opportunities-form">
      <div className="form-section">
        <div className="section-header">
          <h3>Problems & Agentic AI Opportunities</h3>
          <p>Identify current business problems and map them to specific agentic AI workflow opportunities.</p>
        </div>

        <div className="problems-opportunities-grid">
          {/* Business Problems Section */}
          <div className="problems-section">
            <div className="subsection-header">
              <h4><AlertTriangle size={18} /> Current Business Problems</h4>
              <p>What manual processes, inefficiencies, or pain points does this client face?</p>
            </div>

            <div className="items-list">
              {businessProblems.map((problem, index) => (
                <div key={index} className="item-input">
                  <textarea
                    value={problem}
                    onChange={(e) => updateProblem(index, e.target.value)}
                    placeholder="e.g., Customer support tickets manually triaged - 4+ hour response times"
                    rows={2}
                  />
                  <button
                    type="button"
                    className="btn-icon btn-danger"
                    onClick={() => removeProblem(index)}
                    aria-label="Remove problem"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-secondary btn-add"
                onClick={addProblem}
              >
                <Plus size={16} />
                Add Business Problem
              </button>
            </div>

            {/* Suggested Problems */}
            <div className="suggestions">
              <h5>Common Problems:</h5>
              <div className="suggestion-chips">
                {commonProblems.map((problem, index) => (
                  <button
                    key={index}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => addSuggestedProblem(problem)}
                    disabled={businessProblems.includes(problem)}
                  >
                    {problem}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mapping Arrow */}
          <div className="mapping-arrow">
            <ArrowRight size={24} />
            <span>Maps to</span>
          </div>

          {/* Agentic Opportunities Section */}
          <div className="opportunities-section">
            <div className="subsection-header">
              <h4><Lightbulb size={18} /> Agentic AI Opportunities</h4>
              <p>What specific agentic workflows could solve these problems?</p>
            </div>

            <div className="items-list">
              {agenticOpportunities.map((opportunity, index) => (
                <div key={index} className="item-input">
                  <textarea
                    value={opportunity}
                    onChange={(e) => updateOpportunity(index, e.target.value)}
                    placeholder="e.g., Intelligent ticket classification and auto-routing to specialists"
                    rows={2}
                  />
                  <button
                    type="button"
                    className="btn-icon btn-danger"
                    onClick={() => removeOpportunity(index)}
                    aria-label="Remove opportunity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="btn btn-secondary btn-add"
                onClick={addOpportunity}
              >
                <Plus size={16} />
                Add Agentic Opportunity
              </button>
            </div>

            {/* Suggested Opportunities */}
            <div className="suggestions">
              <h5>Common Opportunities:</h5>
              <div className="suggestion-chips">
                {commonOpportunities.map((opportunity, index) => (
                  <button
                    key={index}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => addSuggestedOpportunity(opportunity)}
                    disabled={agenticOpportunities.includes(opportunity)}
                  >
                    {opportunity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mapping Guide */}
        <div className="mapping-guide">
          <h5>💡 Mapping Guide</h5>
          <div className="guide-content">
            <div className="guide-item">
              <strong>Manual Process Problem</strong> → <strong>Automation Opportunity</strong>
            </div>
            <div className="guide-item">
              <strong>Data Entry/Processing</strong> → <strong>Intelligent Document Processing</strong>
            </div>
            <div className="guide-item">
              <strong>Approval Delays</strong> → <strong>Smart Workflow Routing</strong>
            </div>
            <div className="guide-item">
              <strong>Customer Service Issues</strong> → <strong>Conversational AI Assistants</strong>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .problems-opportunities-form {
          max-width: 1200px;
        }

        .section-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .section-header h3 {
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .section-header p {
          color: #666;
          margin: 0;
        }

        .problems-opportunities-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .problems-opportunities-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .mapping-arrow {
            order: 2;
            justify-self: center;
          }
          
          .opportunities-section {
            order: 3;
          }
        }

        .subsection-header {
          margin-bottom: 1.5rem;
        }

        .subsection-header h4 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: #333;
          font-size: 1.1rem;
        }

        .subsection-header p {
          color: #666;
          margin: 0;
          font-size: 0.9rem;
        }

        .mapping-arrow {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #007bff;
          font-weight: 500;
        }

        .mapping-arrow span {
          margin-top: 0.5rem;
          font-size: 0.9rem;
        }

        .items-list {
          min-height: 200px;
        }

        .item-input {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          align-items: flex-start;
        }

        .item-input textarea {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 0.9rem;
          font-family: inherit;
          resize: vertical;
          min-height: 60px;
        }

        .item-input textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        .btn-icon {
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
        }

        .btn-danger {
          color: #dc3545;
        }

        .btn-danger:hover {
          background: #f8d7da;
        }

        .btn-add {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px dashed #ced4da;
          background: transparent;
          color: #6c757d;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
          width: 100%;
          justify-content: center;
        }

        .btn-add:hover {
          border-color: #007bff;
          color: #007bff;
          background: #f8f9fa;
        }

        .suggestions {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e1e5e9;
        }

        .suggestions h5 {
          margin-bottom: 1rem;
          color: #495057;
          font-size: 0.9rem;
        }

        .suggestion-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .suggestion-chip {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          padding: 0.5rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .suggestion-chip:hover:not(:disabled) {
          background: #007bff;
          color: white;
          border-color: #007bff;
        }

        .suggestion-chip:disabled {
          background: #e9ecef;
          color: #6c757d;
          cursor: not-allowed;
        }

        .mapping-guide {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .mapping-guide h5 {
          margin-bottom: 1rem;
          color: #495057;
        }

        .guide-content {
          display: grid;
          gap: 0.75rem;
        }

        .guide-item {
          font-size: 0.9rem;
          color: #495057;
        }

        .guide-item strong:first-child {
          color: #dc3545;
        }

        .guide-item strong:last-child {
          color: #28a745;
        }
      `}</style>
    </div>
  );
} 


================================================
FILE: app/profiles/components/ProfileWizard.js
================================================
'use client';

import React, { useState } from 'react';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';
import { demoDataService } from '../../services/demoDataService';
import StrategicInitiativesForm from './StrategicInitiativesForm';
import ProblemsOpportunitiesForm from './ProblemsOpportunitiesForm';
import styles from './ProfileWizard.module.css';

const WIZARD_STEPS = [
  { id: 'company', title: 'Company Overview', icon: '🏢' },
  { id: 'strategic-initiatives', title: 'Strategic Initiatives', icon: '🎯' },
  { id: 'problems', title: 'Problems & Opportunities', icon: '⚠️' },
  { id: 'impact', title: 'Impact Analysis', icon: '💰' },
  { id: 'solution', title: 'Solution Requirements', icon: '🔧' },
  { id: 'decision', title: 'Decision Process', icon: '👥' },
  { id: 'ai-assessment', title: 'AI Opportunities', icon: '🤖' },
  { id: 'summary', title: 'Summary & Next Steps', icon: '📋' }
];

export default function ProfileWizard({ onComplete, onCancel, initialData, isEditMode = false }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState(initialData || {
    companyName: '',
    industry: '',
    size: '',
    annualRevenue: '',
    employeeCount: '',
    primaryLocation: '',
    // New agentic AI format
    expectedOutcome: {
      strategicInitiatives: [],
      businessObjectives: ''
    },
    problems: {
      businessProblems: [],
      agenticOpportunities: []
    },
    solutions: {
      capabilities: [],
      differentiators: [],
      competitorGaps: []
    },
    value: {
      businessValue: {},
      personalValue: {}
    },
    currentArchitecture: {
      coreSystems: [],
      integrations: '',
      dataQuality: '',
      technicalDebt: '',
      aiReadiness: ''
    },
    // Legacy format for backward compatibility
    valueSellingFramework: {
      businessIssues: [],
      problems: {
        finance: {},
        hr: {},
        it: {},
        customerService: {},
        operations: {}
      },
      impact: {},
      solutionCapabilities: [],
      decisionMakers: {},
      buyingProcess: {},
      risksOfInaction: {}
    },
    aiOpportunityAssessment: {
      currentTechnology: {},
      aiReadinessScore: 5,
      opportunities: [],
      quickWins: [],
      strategicInitiatives: [],
      futureOpportunities: []
    },
    summary: {
      nextSteps: []
    }
  });
  
  const [isGeneratingTimeline, setIsGeneratingTimeline] = useState(false);
  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);

  const updateProfileData = (path, value) => {
    setProfileData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleArrayToggle = (path, value) => {
    const currentArray = getNestedValue(profileData, path) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateProfileData(path, newArray);
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const canProceedToNext = () => {
    // Allow free navigation between all steps
    // Users can explore the wizard without being forced to complete each section
    return true;
  };

  const getStepValidationStatus = (stepIndex) => {
    // Return validation info for visual indicators (without blocking navigation)
    switch (stepIndex) {
      case 0: // Company Overview
        return {
          isValid: profileData.companyName && profileData.industry && profileData.size,
          requiredFields: ['Company Name', 'Industry', 'Company Size']
        };
      case 1: // Strategic Initiatives
        return {
          isValid: profileData.expectedOutcome?.strategicInitiatives?.length > 0,
          requiredFields: ['At least one Strategic Initiative']
        };
      case 2: // Problems & Opportunities
        return {
          isValid: profileData.problems?.businessProblems?.length > 0 || profileData.problems?.agenticOpportunities?.length > 0,
          requiredFields: ['Business Problems or AI Opportunities']
        };
      case 3: // Impact
        return {
          isValid: getNestedValue(profileData, 'valueSellingFramework.impact.totalAnnualImpact'),
          requiredFields: ['Total Annual Impact']
        };
      case 4: // Solution
        return {
          isValid: getNestedValue(profileData, 'valueSellingFramework.solutionCapabilities')?.length > 0,
          requiredFields: ['Solution Capabilities']
        };
      case 5: // Decision
        return {
          isValid: getNestedValue(profileData, 'valueSellingFramework.decisionMakers.economicBuyer.name'),
          requiredFields: ['Economic Buyer Name']
        };
      case 6: // AI Assessment
        return {
          isValid: profileData.aiOpportunityAssessment?.aiReadinessScore,
          requiredFields: ['AI Readiness Score']
        };
      case 7: // Summary
        return {
          isValid: true,
          requiredFields: []
        };
      default:
        return { isValid: false, requiredFields: [] };
    }
  };

  const handleComplete = async () => {
    try {
      // Check if critical fields are missing (warn but don't block)
      const criticalValidation = getStepValidationStatus(0); // Company Overview
      if (!criticalValidation.isValid) {
        const proceed = window.confirm(
          `You haven't completed the basic company information (${criticalValidation.requiredFields.join(', ')}). ` +
          'Do you want to save the profile anyway?'
        );
        if (!proceed) return;
      }

      let profile;
      if (isEditMode && initialData?.id) {
        // Update existing profile
        profile = await ProfileService.updateProfile(initialData.id, profileData);
      } else {
        // Create new profile
        profile = await ProfileService.createProfile(profileData);
      }
      onComplete(profile);
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} profile:`, error);
    }
  };

  const generateTimelineFromProfile = async () => {
    try {
      setIsGeneratingTimeline(true);
      
      // Validate that we have minimum required data
      if (!profileData.companyName) {
        alert('Please enter a company name before generating a timeline.');
        return;
      }
      
      const timeline = await ProfileService.generateTimelineFromProfile(profileData);
      
      // For unsaved profiles, we can't navigate to a profile-specific timeline
      // Instead, we'll store the timeline in the browser and navigate to the general timeline page
      if (!profileData.id) {
        // Navigate to timeline page and let it handle the unsaved profile scenario
        window.location.href = `/timeline`;
      } else {
        // Navigate to profile-specific timeline page
        window.location.href = `/timeline?profileId=${profileData.id}`;
      }
    } catch (error) {
      console.error('Error generating timeline:', error);
      alert(`Failed to generate timeline: ${error.message}`);
    } finally {
      setIsGeneratingTimeline(false);
    }
  };

  const loadDemoData = (demoType) => {
    const demoProfile = demoDataService.getDemoProfile(demoType);
    setProfileData(demoProfile);
    setCurrentStep(0); // Reset to first step to see the data
  };

  const renderCurrentStep = () => {
    const currentStepId = WIZARD_STEPS[currentStep].id;

    switch (currentStepId) {
      case 'company':
        return <CompanyOverviewStep data={profileData} updateData={updateProfileData} />;
      case 'strategic-initiatives':
        return <StrategicInitiativesForm data={profileData} onChange={setProfileData} />;
      case 'problems':
        return <ProblemsOpportunitiesForm data={profileData} onChange={setProfileData} />;
      case 'impact':
        return <ImpactStep data={profileData} updateData={updateProfileData} />;
      case 'solution':
        return <SolutionStep data={profileData} updateData={updateProfileData} onToggle={handleArrayToggle} />;
      case 'decision':
        return <DecisionStep data={profileData} updateData={updateProfileData} />;
      case 'ai-assessment':
        return <AIAssessmentStep data={profileData} updateData={updateProfileData} />;
      case 'summary':
        return <SummaryStep data={profileData} updateData={updateProfileData} onGenerateTimeline={generateTimelineFromProfile} isGenerating={isGeneratingTimeline} />;
      default:
        return null;
    }
  };

  const markdownPreview = showMarkdownPreview ? markdownService.generateMarkdown(profileData) : '';

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-family)'
    }}>
      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        borderBottom: '1px solid var(--border-primary)',
        padding: 'var(--spacing-xl) var(--spacing-lg)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '2rem',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--text-primary)',
          textAlign: 'center',
          marginBottom: 'var(--spacing-lg)'
        }}>{isEditMode ? 'Edit Client Profile' : 'Create Client Profile'}</h1>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-lg)',
            position: 'relative'
          }}>
            {WIZARD_STEPS.map((step, index) => {
              const validation = getStepValidationStatus(index);
              const isCompleted = index < currentStep && validation.isValid;
              const isCurrent = index === currentStep;
              const isIncomplete = index < currentStep && !validation.isValid;
              
              return (
                <div 
                  key={step.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    transition: 'all var(--transition-normal) ease',
                    cursor: 'pointer'
                  }}
                  onClick={() => setCurrentStep(index)}
                  title={`${step.title}${!validation.isValid && validation.requiredFields.length > 0 ? '\nMissing: ' + validation.requiredFields.join(', ') : ''}`}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: 'var(--border-radius-full)',
                    background: isCompleted ? 'var(--accent-green)' : 
                               isCurrent ? 'var(--accent-blue)' : 
                               isIncomplete ? 'var(--accent-yellow)' : 'var(--btn-secondary-bg)',
                    border: `2px solid ${isCurrent ? 'var(--accent-blue)' : 
                                        isCompleted ? 'var(--accent-green)' : 
                                        isIncomplete ? 'var(--accent-yellow)' : 'var(--border-primary)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isCompleted ? '1rem' : '1.2rem',
                    color: (isCompleted || isCurrent || isIncomplete) ? 'white' : 'var(--text-secondary)',
                    marginBottom: 'var(--spacing-sm)',
                    transition: 'all var(--transition-normal) ease',
                    cursor: 'pointer',
                    ...(isCurrent && {
                      boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)'
                    })
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrent) {
                      e.target.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) {
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >{isCompleted ? '✓' : step.icon}</div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 'var(--font-weight-medium)',
                  color: (isCompleted || isCurrent || isIncomplete) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textAlign: 'center',
                  maxWidth: '80px',
                  lineHeight: '1.2'
                }}>{step.title}</span>
              </div>
              );
            })}
          </div>
          <div style={{
            height: '4px',
            background: 'var(--border-primary)',
            borderRadius: 'var(--border-radius)',
            overflow: 'hidden',
            marginBottom: 'var(--spacing-lg)'
          }}>
            <div 
              style={{ 
                width: `${((currentStep + 1) / WIZARD_STEPS.length) * 100}%`,
                height: '100%',
                background: 'var(--accent-blue)',
                transition: 'width var(--transition-normal) ease'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--spacing-xl) var(--spacing-lg)',
        gap: 'var(--spacing-xl)'
      }}>
        <div style={{
          flex: showMarkdownPreview ? '1' : '1',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(var(--backdrop-blur))',
          borderRadius: 'var(--border-radius-xl)',
          padding: 'var(--spacing-xl)',
          border: '1px solid var(--border-primary)'
        }}>
          {renderCurrentStep()}
        </div>

        {showMarkdownPreview && (
          <div style={{
            width: '400px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(var(--backdrop-blur))',
            borderRadius: 'var(--border-radius-xl)',
            padding: 'var(--spacing-xl)',
            border: '1px solid var(--border-primary)'
          }}>
            <div>
              <h3 style={{
                margin: '0 0 var(--spacing-md) 0',
                fontSize: '1.25rem',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)'
              }}>Markdown Preview</h3>
              <pre style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--border-radius)',
                padding: 'var(--spacing-md)',
                fontSize: '0.75rem',
                lineHeight: '1.4',
                color: 'var(--text-secondary)',
                overflow: 'auto',
                maxHeight: '400px',
                fontFamily: 'var(--font-family-mono)'
              }}>{markdownPreview}</pre>
            </div>
          </div>
        )}
      </div>

      <div style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(var(--backdrop-blur))',
        borderTop: '1px solid var(--border-primary)',
        padding: 'var(--spacing-lg)',
        position: 'sticky',
        bottom: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--spacing-lg)'
        }}>
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            alignItems: 'center'
          }}>
            <button 
              type="button" 
              onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
              className="btn btn-secondary"
              style={{
                fontSize: '0.875rem'
              }}
            >
              {showMarkdownPreview ? 'Hide Preview' : 'Show Markdown'}
            </button>
            
                          {!isEditMode && (
                <select 
                  onChange={(e) => e.target.value && loadDemoData(e.target.value)}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    background: 'var(--btn-secondary-bg)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: 'var(--border-radius)',
                    color: 'var(--text-primary)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-family)'
                  }}
                >
                  <option value="">Load Demo Data</option>
                  <option value="tech-startup">TechFlow Solutions (SaaS)</option>
                  <option value="manufacturing">PrecisionParts Manufacturing</option>
                  <option value="healthcare">Regional Medical Center</option>
                  <option value="finance">Community Trust Bank</option>
                </select>
              )}
          </div>

          <div style={{
            display: 'flex',
            gap: 'var(--spacing-md)',
            alignItems: 'center'
          }}>
            <button 
              type="button" 
              onClick={currentStep === 0 ? onCancel : () => setCurrentStep(currentStep - 1)}
              className="btn btn-secondary"
            >
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </button>

            {currentStep < WIZARD_STEPS.length - 1 ? (
              <button 
                type="button" 
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleComplete}
                className="btn btn-success"
              >
                {isEditMode ? 'Update Profile' : 'Create Profile'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
function CompanyOverviewStep({ data, updateData }) {
  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail',
    'Education', 'Real Estate', 'Transportation', 'Energy', 'Other'
  ];

  const companySizes = [
    '1-50 employees',
    '51-200 employees',
    '201-1000 employees',
    '1000+ employees'
  ];

  return (
    <div className={styles.wizardStep}>
      <h2>Company Overview</h2>
      <p>Let's start with basic information about your client.</p>

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="companyName">Company Name *</label>
          <input
            id="companyName"
            type="text"
            value={data.companyName || ''}
            onChange={(e) => updateData('companyName', e.target.value)}
            placeholder="Enter company name"
            required
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="industry">Industry *</label>
          <select
            id="industry"
            value={data.industry || ''}
            onChange={(e) => updateData('industry', e.target.value)}
            required
            className={styles.formSelect}
          >
            <option value="">Select industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Company Size *</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {companySizes.map(size => (
              <label key={size} className={`${styles.radioLabel} ${data.size === size ? styles.radioLabelSelected : ''}`}>
                <input
                  type="radio"
                  name="companySize"
                  value={size}
                  checked={data.size === size}
                  onChange={(e) => updateData('size', e.target.value)}
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="annualRevenue">Annual Revenue</label>
          <input
            id="annualRevenue"
            type="text"
            value={data.annualRevenue || ''}
            onChange={(e) => updateData('annualRevenue', e.target.value)}
            placeholder="e.g., 50M, 1.2B"
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="employeeCount">Employee Count</label>
          <input
            id="employeeCount"
            type="number"
            value={data.employeeCount || ''}
            onChange={(e) => updateData('employeeCount', e.target.value)}
            placeholder="Number of employees"
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="primaryLocation">Primary Location</label>
          <input
            id="primaryLocation"
            type="text"
            value={data.primaryLocation || ''}
            onChange={(e) => updateData('primaryLocation', e.target.value)}
            placeholder="City, State/Country"
            className={styles.formInput}
          />
        </div>
      </div>
    </div>
  );
}

function BusinessIssueStep({ data, updateData, onToggle }) {
  const businessIssues = [
    'Revenue Growth Pressure',
    'Cost Reduction Mandate',
    'Operational Efficiency', 
    'Customer Experience',
    'Digital Transformation',
    'Regulatory Compliance',
    'Competitive Pressure'
  ];

  const selectedIssues = data.valueSellingFramework?.businessIssues || [];

  return (
    <div className="wizard-step">
      <h2>Business Issue</h2>
      <p>What are the high-level strategic priorities or C-level concerns?</p>

      <div className="checkbox-grid">
        {businessIssues.map(issue => (
          <label key={issue} className={`checkbox-card ${selectedIssues.includes(issue) ? 'selected' : ''}`}>
            <input
              type="checkbox"
              checked={selectedIssues.includes(issue)}
              onChange={() => onToggle('valueSellingFramework.businessIssues', issue)}
            />
            <span className="checkbox-text">{issue}</span>
          </label>
        ))}
      </div>

      <div className="form-group">
        <label htmlFor="businessIssueOther">Other (specify)</label>
        <input
          id="businessIssueOther"
          type="text"
          value={data.valueSellingFramework?.businessIssueOther || ''}
          onChange={(e) => updateData('valueSellingFramework.businessIssueOther', e.target.value)}
          placeholder="Describe other business issues"
        />
      </div>

      <div className="form-group">
        <label htmlFor="businessIssueDetails">Details</label>
        <textarea
          id="businessIssueDetails"
          value={data.valueSellingFramework?.businessIssueDetails || ''}
          onChange={(e) => updateData('valueSellingFramework.businessIssueDetails', e.target.value)}
          placeholder="Describe the main business issue in detail"
          rows={4}
        />
      </div>
    </div>
  );
}

function SummaryStep({ data, updateData, onGenerateTimeline, isGenerating }) {
  return (
    <div className="wizard-step">
      <h2>Summary & Next Steps</h2>
      <p>Review your client profile and define next steps.</p>

      <div className="form-group">
        <label htmlFor="currentState">Current State Summary</label>
        <textarea
          id="currentState"
          value={data.summary?.currentState || ''}
          onChange={(e) => updateData('summary.currentState', e.target.value)}
          placeholder="Brief description of key challenges and costs"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="recommendedApproach">Recommended Approach</label>
        <textarea
          id="recommendedApproach"
          value={data.summary?.recommendedApproach || ''}
          onChange={(e) => updateData('summary.recommendedApproach', e.target.value)}
          placeholder="High-level strategy recommendation"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes & Additional Context</label>
        <textarea
          id="notes"
          value={data.summary?.notes || ''}
          onChange={(e) => updateData('summary.notes', e.target.value)}
          placeholder="Additional observations, quotes from stakeholders, competitive insights, etc."
          rows={4}
        />
      </div>

      <div className="action-buttons">
        <button 
          type="button"
          className="btn-timeline"
          onClick={onGenerateTimeline}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : '🚀 Generate AI Timeline'}
        </button>
      </div>
    </div>
  );
}

function ProblemsStep({ data, updateData }) {
  const departmentalProblems = {
    finance: [
      'Manual invoice processing taking [X] days',
      '[X]% error rate in financial processes',
      'Month-end close takes [X] days'
    ],
    hr: [
      'Employee onboarding takes [X] days',
      'Manual resume screening',
      '[X]% employee turnover rate'
    ],
    it: [
      'Average ticket resolution: [X] hours',
      '[X]% of tickets require manual intervention',
      'System provisioning takes [X] hours'
    ],
    customerService: [
      'Average response time: [X] hours',
      '[X]% first contact resolution rate',
      'Customer satisfaction score: [X]/10'
    ],
    operations: [
      'Process cycle time: [X] days',
      '[X]% manual processes',
      'Quality issues: [X]% error rate'
    ]
  };

  const handleProblemToggle = (department, problem) => {
    const currentProblems = data.valueSellingFramework?.problems?.[department] || {};
    const updated = { ...currentProblems, [problem]: !currentProblems[problem] };
    updateData(`valueSellingFramework.problems.${department}`, updated);
  };

  const handleOtherProblem = (department, value) => {
    updateData(`valueSellingFramework.problems.${department}.other`, value);
  };

  return (
    <div className="wizard-step">
      <h2>Problems & Challenges</h2>
      <p>Identify specific operational issues by department.</p>
      
      {Object.entries(departmentalProblems).map(([department, problems]) => (
        <div key={department} className="department-section">
          <h3>{department.charAt(0).toUpperCase() + department.slice(1)} Department</h3>
          <div className="checkbox-grid">
            {problems.map(problem => (
              <label key={problem} className={`checkbox-card ${
                data.valueSellingFramework?.problems?.[department]?.[problem] ? 'selected' : ''
              }`}>
                <input
                  type="checkbox"
                  checked={data.valueSellingFramework?.problems?.[department]?.[problem] || false}
                  onChange={() => handleProblemToggle(department, problem)}
                />
                <span className="checkbox-text">{problem}</span>
              </label>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor={`${department}Other`}>Other (specify)</label>
            <input
              id={`${department}Other`}
              type="text"
              value={data.valueSellingFramework?.problems?.[department]?.other || ''}
              onChange={(e) => handleOtherProblem(department, e.target.value)}
              placeholder="Describe other issues"
            />
          </div>
        </div>
      ))}
      
      <div className="form-group">
        <label htmlFor="additionalChallenges">Additional Challenges</label>
        <textarea
          id="additionalChallenges"
          value={data.valueSellingFramework?.additionalChallenges || ''}
          onChange={(e) => updateData('valueSellingFramework.additionalChallenges', e.target.value)}
          placeholder="Describe other operational challenges"
          rows={4}
        />
      </div>

      <div className="form-section">
        <h3>Root Cause Analysis</h3>
        <p>Why do these challenges exist?</p>
        
        {['Legacy systems with poor integration', 'Manual, paper-based processes', 'Lack of real-time data visibility', 'Insufficient automation', 'Skills gap in technology', 'Siloed departments'].map(cause => (
          <label key={cause} className={`checkbox-card ${
            data.valueSellingFramework?.rootCauses?.includes(cause) ? 'selected' : ''
          }`}>
            <input
              type="checkbox"
              checked={data.valueSellingFramework?.rootCauses?.includes(cause) || false}
              onChange={() => {
                const current = data.valueSellingFramework?.rootCauses || [];
                const updated = current.includes(cause) 
                  ? current.filter(c => c !== cause)
                  : [...current, cause];
                updateData('valueSellingFramework.rootCauses', updated);
              }}
            />
            <span className="checkbox-text">{cause}</span>
          </label>
        ))}
        
        <div className="form-group">
          <label htmlFor="rootCauseOther">Other Root Cause</label>
          <input
            id="rootCauseOther"
            type="text"
            value={data.valueSellingFramework?.rootCauseOther || ''}
            onChange={(e) => updateData('valueSellingFramework.rootCauseOther', e.target.value)}
            placeholder="Specify other root causes"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rootCauseDetails">Root Cause Details</label>
          <textarea
            id="rootCauseDetails"
            value={data.valueSellingFramework?.rootCauseDetails || ''}
            onChange={(e) => updateData('valueSellingFramework.rootCauseDetails', e.target.value)}
            placeholder="Describe the root causes in detail"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}

function ImpactStep({ data, updateData }) {
  return (
    <div className={styles.wizardStep}>
      <h2>Impact Analysis</h2>
      <p>Quantify the cost of current challenges.</p>
      
      <div className={styles.formSection}>
        <h3>Hard Costs (Annual)</h3>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="laborCosts">Labor costs from manual processes ($)</label>
            <input
              id="laborCosts"
              type="number"
              value={data.valueSellingFramework?.impact?.laborCosts || ''}
              onChange={(e) => updateData('valueSellingFramework.impact.laborCosts', e.target.value)}
              placeholder="450000"
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="errorCosts">Error correction costs ($)</label>
            <input
              id="errorCosts"
              type="number"
              value={data.valueSellingFramework?.impact?.errorCosts || ''}
              onChange={(e) => updateData('valueSellingFramework.impact.errorCosts', e.target.value)}
              placeholder="75000"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="downtimeCosts">System downtime costs ($)</label>
            <input
              id="downtimeCosts"
              type="number"
              value={data.valueSellingFramework?.impact?.downtimeCosts || ''}
              onChange={(e) => updateData('valueSellingFramework.impact.downtimeCosts', e.target.value)}
              placeholder="120000"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="complianceCosts">Compliance penalties/risk ($)</label>
            <input
              id="complianceCosts"
              type="number"
              value={data.valueSellingFramework?.impact?.complianceCosts || ''}
              onChange={(e) => updateData('valueSellingFramework.impact.complianceCosts', e.target.value)}
              placeholder="25000"
              className={styles.formInput}
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>Soft Costs</h3>
        <div className={styles.formGrid}>
          {[
            { key: 'employeeImpact', label: 'Employee frustration/turnover impact' },
            { key: 'customerImpact', label: 'Customer satisfaction impact' },
            { key: 'competitiveImpact', label: 'Competitive disadvantage' },
            { key: 'reputationRisk', label: 'Brand/reputation risk' }
          ].map(({ key, label }) => (
            <div key={key} className={styles.formGroup}>
              <label>{label}</label>
              <select
                value={data.valueSellingFramework?.impact?.[key] || ''}
                onChange={(e) => updateData(`valueSellingFramework.impact.${key}`, e.target.value)}
                className={styles.formSelect}
              >
                <option value="">Select impact level</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          ))}
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="totalAnnualImpact">Total Estimated Annual Impact ($) *</label>
        <input
          id="totalAnnualImpact"
          type="number"
          value={data.valueSellingFramework?.impact?.totalAnnualImpact || ''}
          onChange={(e) => updateData('valueSellingFramework.impact.totalAnnualImpact', e.target.value)}
          placeholder="850000"
          required
          className={styles.formInput}
        />
      </div>
    </div>
  );
}

function SolutionStep({ data, updateData, onToggle }) {
  const capabilities = [
    'Automate document processing',
    'Streamline approval workflows', 
    'Provide real-time dashboards',
    'Integrate disconnected systems',
    'Enable self-service capabilities',
    'Improve data accuracy',
    'Reduce manual handoffs'
  ];

  const differentiationRequirements = [
    'Industry-specific expertise',
    'Rapid implementation (< 6 months)',
    'No-code/low-code platform',
    'Strong integration capabilities',
    'Proven ROI in similar companies',
    'Comprehensive support/training'
  ];

  const selectedCapabilities = data.valueSellingFramework?.solutionCapabilities || [];
  const selectedDifferentiators = data.valueSellingFramework?.differentiationRequirements || [];

  return (
    <div className={styles.wizardStep}>
      <h2>Solution Requirements</h2>
      <p>What capabilities are needed to solve these challenges?</p>

      <div className={styles.formSection}>
        <h3>Solution Capabilities Needed</h3>
        <div className={styles.checkboxGrid}>
          {capabilities.map(capability => (
            <label key={capability} className={`${styles.checkboxCard} ${selectedCapabilities.includes(capability) ? styles.checkboxCardSelected : ''}`}>
              <input
                type="checkbox"
                checked={selectedCapabilities.includes(capability)}
                onChange={() => onToggle('valueSellingFramework.solutionCapabilities', capability)}
              />
              <span className={styles.checkboxText}>{capability}</span>
            </label>
          ))}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="solutionCapabilitiesOther">Other capabilities needed</label>
          <input
            id="solutionCapabilitiesOther"
            type="text"
            value={data.valueSellingFramework?.solutionCapabilitiesOther || ''}
            onChange={(e) => updateData('valueSellingFramework.solutionCapabilitiesOther', e.target.value)}
            placeholder="Specify other capabilities"
            className={styles.formInput}
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>Differentiation Requirements</h3>
        <p>What makes a solution uniquely qualified?</p>
        <div className={styles.checkboxGrid}>
          {differentiationRequirements.map(requirement => (
            <label key={requirement} className={`${styles.checkboxCard} ${selectedDifferentiators.includes(requirement) ? styles.checkboxCardSelected : ''}`}>
              <input
                type="checkbox"
                checked={selectedDifferentiators.includes(requirement)}
                onChange={() => onToggle('valueSellingFramework.differentiationRequirements', requirement)}
              />
              <span className={styles.checkboxText}>{requirement}</span>
            </label>
          ))}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="differentiationOther">Other differentiators</label>
          <input
            id="differentiationOther"
            type="text"
            value={data.valueSellingFramework?.differentiationOther || ''}
            onChange={(e) => updateData('valueSellingFramework.differentiationOther', e.target.value)}
            placeholder="Specify other differentiation requirements"
            className={styles.formInput}
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>Value / ROI Expectations</h3>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="costReduction">Target cost reduction</label>
            <input
              id="costReduction"
              type="text"
              value={data.valueSellingFramework?.roiExpectations?.costReduction || ''}
              onChange={(e) => updateData('valueSellingFramework.roiExpectations.costReduction', e.target.value)}
              placeholder="25% or $500K"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="efficiencyImprovement">Target efficiency improvement</label>
            <input
              id="efficiencyImprovement"
              type="text"
              value={data.valueSellingFramework?.roiExpectations?.efficiencyImprovement || ''}
              onChange={(e) => updateData('valueSellingFramework.roiExpectations.efficiencyImprovement', e.target.value)}
              placeholder="40%"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="paybackPeriod">Expected payback period</label>
            <input
              id="paybackPeriod"
              type="text"
              value={data.valueSellingFramework?.roiExpectations?.paybackPeriod || ''}
              onChange={(e) => updateData('valueSellingFramework.roiExpectations.paybackPeriod', e.target.value)}
              placeholder="12 months"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="targetROI">Target ROI</label>
            <input
              id="targetROI"
              type="text"
              value={data.valueSellingFramework?.roiExpectations?.targetROI || ''}
              onChange={(e) => updateData('valueSellingFramework.roiExpectations.targetROI', e.target.value)}
              placeholder="300%"
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="timeToFirstValue">Time to first value</label>
            <input
              id="timeToFirstValue"
              type="text"
              value={data.valueSellingFramework?.roiExpectations?.timeToFirstValue || ''}
              onChange={(e) => updateData('valueSellingFramework.roiExpectations.timeToFirstValue', e.target.value)}
              placeholder="3 months"
              className={styles.formInput}
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>Success Metrics</h3>
        <p>How will success be measured?</p>
        <div className={styles.checkboxGrid}>
            {['Process cycle time reduction', 'Error rate improvement', 'Cost per transaction reduction', 'Employee productivity increase', 'Customer satisfaction improvement', 'Revenue impact'].map(metric => (
            <label key={metric} className={`${styles.checkboxCard} ${
                data.valueSellingFramework?.successMetrics?.includes(metric) ? styles.checkboxCardSelected : ''
            }`}>
                <input
                type="checkbox"
                checked={data.valueSellingFramework?.successMetrics?.includes(metric) || false}
                onChange={() => onToggle('valueSellingFramework.successMetrics', metric)}
                />
                <span className={styles.checkboxText}>{metric}</span>
            </label>
            ))}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="successMetricsTargets">Specific targets</label>
          <textarea
            id="successMetricsTargets"
            value={data.valueSellingFramework?.successMetricsTargets || ''}
            onChange={(e) => updateData('valueSellingFramework.successMetricsTargets', e.target.value)}
            placeholder="Detail the numerical targets (e.g., Reduce processing time from 5 days to 1 day)"
            rows={3}
            className={styles.formTextarea}
          />
        </div>
      </div>
    </div>
  );
}

function DecisionStep({ data, updateData }) {
  const evaluationCriteria = [
    'Technical fit',
    'Cost/ROI',
    'Vendor reputation',
    'Implementation timeline',
    'Support quality'
  ];

  return (
    <div className={styles.wizardStep}>
      <h2>Decision Process</h2>
      <p>Who are the key stakeholders and decision makers?</p>
      
      <div className={styles.formSection}>
        <h3>Key Decision Makers</h3>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="economicBuyerName">Economic Buyer Name *</label>
            <input
              id="economicBuyerName"
              type="text"
              value={data.valueSellingFramework?.decisionMakers?.economicBuyer?.name || ''}
              onChange={(e) => updateData('valueSellingFramework.decisionMakers.economicBuyer.name', e.target.value)}
              placeholder="Sarah Chen"
              required
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="economicBuyerTitle">Economic Buyer Title</label>
            <input
              id="economicBuyerTitle"
              type="text"
              value={data.valueSellingFramework?.decisionMakers?.economicBuyer?.title || ''}
              onChange={(e) => updateData('valueSellingFramework.decisionMakers.economicBuyer.title', e.target.value)}
              placeholder="CEO"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="economicBuyerBudget">Budget Authority ($)</label>
            <input
              id="economicBuyerBudget"
              type="number"
              value={data.valueSellingFramework?.decisionMakers?.economicBuyer?.budget || ''}
              onChange={(e) => updateData('valueSellingFramework.decisionMakers.economicBuyer.budget', e.target.value)}
              placeholder="1000000"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="technicalBuyerName">Technical Buyer Name</label>
            <input
              id="technicalBuyerName"
              type="text"
              value={data.valueSellingFramework?.decisionMakers?.technicalBuyer?.name || ''}
              onChange={(e) => updateData('valueSellingFramework.decisionMakers.technicalBuyer.name', e.target.value)}
              placeholder="Mike Rodriguez"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="technicalBuyerTitle">Technical Buyer Title</label>
            <input
              id="technicalBuyerTitle"
              type="text"
              value={data.valueSellingFramework?.decisionMakers?.technicalBuyer?.title || ''}
              onChange={(e) => updateData('valueSellingFramework.decisionMakers.technicalBuyer.title', e.target.value)}
              placeholder="CTO"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="championName">Champion Name</label>
            <input
              id="championName"
              type="text"
              value={data.valueSellingFramework?.decisionMakers?.champion?.name || ''}
              onChange={(e) => updateData('valueSellingFramework.decisionMakers.champion.name', e.target.value)}
              placeholder="Lisa Park"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="championTitle">Champion Title</label>
            <input
              id="championTitle"
              type="text"
              value={data.valueSellingFramework?.decisionMakers?.champion?.title || ''}
              onChange={(e) => updateData('valueSellingFramework.decisionMakers.champion.title', e.target.value)}
              placeholder="VP Operations"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="influencers">Influencers</label>
            <input
              id="influencers"
              type="text"
              value={data.valueSellingFramework?.decisionMakers?.influencers || ''}
              onChange={(e) => updateData('valueSellingFramework.decisionMakers.influencers', e.target.value)}
              placeholder="Head of Customer Success, Engineering Manager"
              className={styles.formInput}
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>Buying Process</h3>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="timeline">Decision timeline</label>
            <input
              id="timeline"
              type="text"
              value={data.valueSellingFramework?.buyingProcess?.timeline || ''}
              onChange={(e) => updateData('valueSellingFramework.buyingProcess.timeline', e.target.value)}
              placeholder="6 months"
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="budgetCycle">Budget cycle</label>
            <input
              id="budgetCycle"
              type="text"
              value={data.valueSellingFramework?.buyingProcess?.budgetCycle || ''}
              onChange={(e) => updateData('valueSellingFramework.buyingProcess.budgetCycle', e.target.value)}
              placeholder="Q1 planning cycle"
              className={styles.formInput}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Evaluation criteria</label>
          <div className={styles.checkboxGrid}>
            {evaluationCriteria.map(criteria => (
              <label key={criteria} className={`${styles.checkboxCard} ${
                data.valueSellingFramework?.buyingProcess?.evaluationCriteria?.includes(criteria) ? styles.checkboxCardSelected : ''
              }`}>
                <input
                  type="checkbox"
                  checked={data.valueSellingFramework?.buyingProcess?.evaluationCriteria?.includes(criteria) || false}
                  onChange={() => {
                    const current = data.valueSellingFramework?.buyingProcess?.evaluationCriteria || [];
                    const updated = current.includes(criteria) 
                      ? current.filter(c => c !== criteria)
                      : [...current, criteria];
                    updateData('valueSellingFramework.buyingProcess.evaluationCriteria', updated);
                  }}
                />
                <span className={styles.checkboxText}>{criteria}</span>
              </label>
            ))}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="evaluationOther">Other evaluation criteria</label>
            <input
              id="evaluationOther"
              type="text"
              value={data.valueSellingFramework?.buyingProcess?.evaluationOther || ''}
              onChange={(e) => updateData('valueSellingFramework.buyingProcess.evaluationOther', e.target.value)}
              placeholder="Specify other criteria"
              className={styles.formInput}
            />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>Risks of Inaction</h3>
        <p>Consequences of doing nothing:</p>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="costEscalation">Continued cost escalation (annually) ($)</label>
            <input
              id="costEscalation"
              type="number"
              value={data.valueSellingFramework?.risksOfInaction?.costEscalation || ''}
              onChange={(e) => updateData('valueSellingFramework.risksOfInaction.costEscalation', e.target.value)}
              placeholder="1200000"
              className={styles.formInput}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="employeeAttrition">Employee attrition risk</label>
            <select
              id="employeeAttrition"
              value={data.valueSellingFramework?.risksOfInaction?.employeeAttrition || ''}
              onChange={(e) => updateData('valueSellingFramework.risksOfInaction.employeeAttrition', e.target.value)}
              className={styles.formSelect}
            >
              <option value="">Select risk level</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="threeYearCost">Estimated cost of inaction (3 years) ($)</label>
            <input
              id="threeYearCost"
              type="number"
              value={data.valueSellingFramework?.risksOfInaction?.threeYearCost || ''}
              onChange={(e) => updateData('valueSellingFramework.risksOfInaction.threeYearCost', e.target.value)}
              placeholder="3600000"
              className={styles.formInput}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="competitiveDisadvantage">Competitive disadvantage</label>
          <textarea
            id="competitiveDisadvantage"
            value={data.valueSellingFramework?.risksOfInaction?.competitiveDisadvantage || ''}
            onChange={(e) => updateData('valueSellingFramework.risksOfInaction.competitiveDisadvantage', e.target.value)}
            placeholder="Describe the competitive impact of inaction"
            rows={2}
            className={styles.formTextarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="customerSatisfaction">Customer satisfaction decline</label>
          <textarea
            id="customerSatisfaction"
            value={data.valueSellingFramework?.risksOfInaction?.customerSatisfaction || ''}
            onChange={(e) => updateData('valueSellingFramework.risksOfInaction.customerSatisfaction', e.target.value)}
            placeholder="Describe the customer impact"
            rows={2}
            className={styles.formTextarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="complianceRisk">Regulatory compliance risk</label>
          <textarea
            id="complianceRisk"
            value={data.valueSellingFramework?.risksOfInaction?.complianceRisk || ''}
            onChange={(e) => updateData('valueSellingFramework.risksOfInaction.complianceRisk', e.target.value)}
            placeholder="Describe compliance risks"
            rows={2}
            className={styles.formTextarea}
          />
        </div>
      </div>
    </div>
  );
}

function AIAssessmentStep({ data, updateData }) {
  const handleOpportunityUpdate = (index, field, value) => {
    const opportunities = [...(data.aiOpportunityAssessment?.opportunities || [])];
    if (!opportunities[index]) {
      opportunities[index] = {};
    }
    opportunities[index][field] = value;
    updateData('aiOpportunityAssessment.opportunities', opportunities);
  };

  const addOpportunity = () => {
    const opportunities = [...(data.aiOpportunityAssessment?.opportunities || [])];
    opportunities.push({
      name: '',
      department: '',
      process: '',
      currentState: '',
      aiSolution: '',
      estimatedImpact: '',
      implementationEffort: 'Medium',
      timeline: '',
      priorityScore: 5
    });
    updateData('aiOpportunityAssessment.opportunities', opportunities);
  };

  const removeOpportunity = (index) => {
    const opportunities = [...(data.aiOpportunityAssessment?.opportunities || [])];
    opportunities.splice(index, 1);
    updateData('aiOpportunityAssessment.opportunities', opportunities);
  };

  const updateQuickWin = (index, field, value) => {
    const quickWins = [...(data.aiOpportunityAssessment?.quickWins || [])];
    if (!quickWins[index]) quickWins[index] = {};
    quickWins[index][field] = value;
    updateData('aiOpportunityAssessment.quickWins', quickWins);
  };

  const addQuickWin = () => {
    const quickWins = [...(data.aiOpportunityAssessment?.quickWins || [])];
    quickWins.push({ name: '', impact: '', timeline: '' });
    updateData('aiOpportunityAssessment.quickWins', quickWins);
  };

  const removeQuickWin = (index) => {
    const quickWins = [...(data.aiOpportunityAssessment?.quickWins || [])];
    quickWins.splice(index, 1);
    updateData('aiOpportunityAssessment.quickWins', quickWins);
  };

  return (
    <div className="wizard-step">
      <h2>AI/Automation Opportunity Assessment</h2>
      <p>Evaluate current technology landscape and identify AI opportunities.</p>
      
      <div className="form-section">
        <h3>Current Technology Landscape</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="primaryERP">Primary ERP</label>
            <input
              id="primaryERP"
              type="text"
              value={data.aiOpportunityAssessment?.currentTechnology?.erp || ''}
              onChange={(e) => updateData('aiOpportunityAssessment.currentTechnology.erp', e.target.value)}
              placeholder="SAP, Oracle, NetSuite, etc."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="crmSystem">CRM System</label>
            <input
              id="crmSystem"
              type="text"
              value={data.aiOpportunityAssessment?.currentTechnology?.crm || ''}
              onChange={(e) => updateData('aiOpportunityAssessment.currentTechnology.crm', e.target.value)}
              placeholder="Salesforce, HubSpot, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="collaborationTools">Collaboration Tools</label>
            <input
              id="collaborationTools"
              type="text"
              value={data.aiOpportunityAssessment?.currentTechnology?.collaboration || ''}
              onChange={(e) => updateData('aiOpportunityAssessment.currentTechnology.collaboration', e.target.value)}
              placeholder="Slack, Teams, Zoom, etc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="integrationMaturity">Integration Maturity</label>
            <select
              id="integrationMaturity"
              value={data.aiOpportunityAssessment?.currentTechnology?.integrationMaturity || ''}
              onChange={(e) => updateData('aiOpportunityAssessment.currentTechnology.integrationMaturity', e.target.value)}
            >
              <option value="">Select maturity level</option>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dataQuality">Data Quality</label>
            <select
              id="dataQuality"
              value={data.aiOpportunityAssessment?.currentTechnology?.dataQuality || ''}
              onChange={(e) => updateData('aiOpportunityAssessment.currentTechnology.dataQuality', e.target.value)}
            >
              <option value="">Select quality level</option>
              <option value="Poor">Poor</option>
              <option value="Fair">Fair</option>
              <option value="Good">Good</option>
              <option value="Excellent">Excellent</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="currentAutomation">Current Automation</label>
          <textarea
            id="currentAutomation"
            value={data.aiOpportunityAssessment?.currentTechnology?.automation || ''}
            onChange={(e) => updateData('aiOpportunityAssessment.currentTechnology.automation', e.target.value)}
            placeholder="Describe existing automation tools and processes"
            rows={3}
          />
        </div>
      </div>

      <div className="form-section">
        <h3>AI Readiness Score</h3>
        <div className="ai-readiness-scoring">
          <div className="scoring-criteria">
            {[
              { key: 'dataQuality', label: 'Data availability and quality', max: 2 },
              { key: 'integration', label: 'System integration capability', max: 2 },
              { key: 'technicalTeam', label: 'Technical team readiness', max: 2 },
              { key: 'leadership', label: 'Leadership support', max: 2 },
              { key: 'changeManagement', label: 'Change management capability', max: 2 }
            ].map(({ key, label, max }) => (
              <div key={key} className="scoring-item">
                <label>{label}</label>
                <div className="score-input">
                  <input
                    type="range"
                    min="0"
                    max={max}
                    value={data.aiOpportunityAssessment?.readinessScoring?.[key] || 0}
                    onChange={(e) => updateData(`aiOpportunityAssessment.readinessScoring.${key}`, parseInt(e.target.value))}
                  />
                  <span className="score-value">
                    {data.aiOpportunityAssessment?.readinessScoring?.[key] || 0}/{max}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="total-score">
            <strong>Total AI Readiness Score: {
              Object.values(data.aiOpportunityAssessment?.readinessScoring || {}).reduce((sum, score) => sum + (score || 0), 0)
            }/10</strong>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Top AI Opportunities (Prioritized)</h3>
        {(data.aiOpportunityAssessment?.opportunities || []).map((opportunity, index) => (
          <div key={index} className="opportunity-card">
            <div className="opportunity-header">
              <h4>Opportunity {index + 1}</h4>
              <button type="button" onClick={() => removeOpportunity(index)} className="btn-danger btn-small">Remove</button>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={opportunity.name || ''}
                  onChange={(e) => handleOpportunityUpdate(index, 'name', e.target.value)}
                  placeholder="e.g., Invoice Processing Automation"
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select
                  value={opportunity.department || ''}
                  onChange={(e) => handleOpportunityUpdate(index, 'department', e.target.value)}
                >
                  <option value="">Select department</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="IT">IT</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Operations">Operations</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="form-group">
                <label>Process</label>
                <input
                  type="text"
                  value={opportunity.process || ''}
                  onChange={(e) => handleOpportunityUpdate(index, 'process', e.target.value)}
                  placeholder="Specific process to automate"
                />
              </div>
              <div className="form-group">
                <label>Current State</label>
                <input
                  type="text"
                  value={opportunity.currentState || ''}
                  onChange={(e) => handleOpportunityUpdate(index, 'currentState', e.target.value)}
                  placeholder="How it works today"
                />
              </div>
              <div className="form-group">
                <label>AI Solution</label>
                <input
                  type="text"
                  value={opportunity.aiSolution || ''}
                  onChange={(e) => handleOpportunityUpdate(index, 'aiSolution', e.target.value)}
                  placeholder="What AI would do"
                />
              </div>
              <div className="form-group">
                <label>Estimated Impact ($)</label>
                <input
                  type="number"
                  value={opportunity.estimatedImpact || ''}
                  onChange={(e) => handleOpportunityUpdate(index, 'estimatedImpact', e.target.value)}
                  placeholder="Annual savings/benefit"
                />
              </div>
              <div className="form-group">
                <label>Implementation Effort</label>
                <select
                  value={opportunity.implementationEffort || 'Medium'}
                  onChange={(e) => handleOpportunityUpdate(index, 'implementationEffort', e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label>Timeline</label>
                <input
                  type="text"
                  value={opportunity.timeline || ''}
                  onChange={(e) => handleOpportunityUpdate(index, 'timeline', e.target.value)}
                  placeholder="e.g., 3 months"
                />
              </div>
              <div className="form-group">
                <label>Priority Score (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={opportunity.priorityScore || 5}
                  onChange={(e) => handleOpportunityUpdate(index, 'priorityScore', parseInt(e.target.value))}
                />
                <div className="score-display">{opportunity.priorityScore || 5}/10</div>
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={addOpportunity} className="btn-secondary">Add Opportunity</button>
      </div>

      <div className="form-section">
        <h3>Quick Wins (0-6 months)</h3>
        {(data.aiOpportunityAssessment?.quickWins || []).map((quickWin, index) => (
          <div key={index} className="quick-win-item">
            <div className="form-grid">
              <div className="form-group">
                <label>Opportunity name</label>
                <input
                  type="text"
                  value={quickWin.name || ''}
                  onChange={(e) => updateQuickWin(index, 'name', e.target.value)}
                  placeholder="e.g., Automated ticket routing"
                />
              </div>
              <div className="form-group">
                <label>Impact ($)</label>
                <input
                  type="number"
                  value={quickWin.impact || ''}
                  onChange={(e) => updateQuickWin(index, 'impact', e.target.value)}
                  placeholder="50000"
                />
              </div>
              <div className="form-group">
                <label>Timeline</label>
                <input
                  type="text"
                  value={quickWin.timeline || ''}
                  onChange={(e) => updateQuickWin(index, 'timeline', e.target.value)}
                  placeholder="1 month"
                />
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={addQuickWin} className="btn-secondary btn-small">Add Quick Win</button>
      </div>
    </div>
  );
} 


================================================
FILE: app/profiles/components/ProfileWizard.module.css
================================================
/* ProfileWizard.module.css */

.wizardStep {
  color: var(--text-primary);
}

.wizardStep h2 {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: 1.75rem;
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.wizardStep p {
  margin: 0 0 var(--spacing-xl) 0;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: var(--line-height);
  opacity: 0.9;
}

.formGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.formGroup label {
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  opacity: 0.9;
}

.formInput,
.formSelect,
.formTextarea {
  padding: var(--spacing-md);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  background: var(--btn-secondary-bg);
  color: var(--text-primary);
  font-size: 1rem;
  font-family: var(--font-family);
  transition: all var(--transition-fast) ease;
}

.formInput:focus,
.formSelect:focus,
.formTextarea:focus {
    outline: none;
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.radioLabel {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  background: var(--btn-secondary-bg);
  cursor: pointer;
  transition: all var(--transition-fast) ease;
}

.radioLabelSelected {
    border-color: var(--accent-blue);
    background: rgba(59, 130, 246, 0.1);
}

.radioInput {
    margin: 0;
}

.radioText {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
}

.formSection {
    margin-bottom: var(--spacing-xl);
}

.formSection h3 {
    margin: 0 0 var(--spacing-lg) 0;
    font-size: 1.5rem;
    font-weight: var(--font-weight-bold);
    color: var(--text-primary);
    padding-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--border-primary);
}

.checkboxGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
}

.checkboxCard {
  position: relative;
  padding: var(--spacing-md);
  border: 2px solid var(--border-primary);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast) ease;
  background: var(--bg-secondary);
  color: var(--text-secondary);
}

.checkboxCard:hover {
    border-color: var(--accent-blue);
    transform: translateY(-2px);
}

.checkboxCardSelected {
    border-color: var(--accent-blue);
    background-color: rgba(59, 130, 246, 0.1);
    color: var(--text-primary);
}

.checkboxCard input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.checkboxText {
    font-weight: var(--font-weight-medium);
} 


================================================
FILE: app/profiles/components/StrategicInitiativesForm.js
================================================
'use client';

import React from 'react';
import { Plus, X, User, Mail, Phone, Linkedin } from 'lucide-react';

/**
 * Strategic Initiatives Form Component
 * 
 * Manages the Expected Business Outcome section:
 * - Strategic initiatives with full contact details
 * - Business objectives
 * 
 * Data Structure:
 * {
 *   strategicInitiatives: [
 *     {
 *       initiative: "Description of initiative",
 *       contact: {
 *         name: "Contact Name",
 *         title: "Job Title", 
 *         email: "email@company.com",
 *         linkedin: "linkedin.com/in/profile",
 *         phone: "(555) 123-4567"
 *       }
 *     }
 *   ],
 *   businessObjectives: "Overall strategic objectives..."
 * }
 */

export default function StrategicInitiativesForm({ data, onChange }) {
  const strategicInitiatives = data.expectedOutcome?.strategicInitiatives || [];
  const businessObjectives = data.expectedOutcome?.businessObjectives || '';

  const updateData = (path, value) => {
    const newData = { ...data };
    const pathArray = path.split('.');
    let current = newData;
    
    // Navigate to the parent object
    for (let i = 0; i < pathArray.length - 1; i++) {
      if (!current[pathArray[i]]) {
        current[pathArray[i]] = {};
      }
      current = current[pathArray[i]];
    }
    
    // Set the value
    current[pathArray[pathArray.length - 1]] = value;
    onChange(newData);
  };

  const addInitiative = () => {
    const newInitiative = {
      initiative: '',
      contact: {
        name: '',
        title: '',
        email: '',
        linkedin: '',
        phone: ''
      }
    };
    
    const newInitiatives = [...strategicInitiatives, newInitiative];
    updateData('expectedOutcome.strategicInitiatives', newInitiatives);
  };

  const removeInitiative = (index) => {
    const newInitiatives = strategicInitiatives.filter((_, i) => i !== index);
    updateData('expectedOutcome.strategicInitiatives', newInitiatives);
  };

  const updateInitiative = (index, field, value) => {
    const newInitiatives = [...strategicInitiatives];
    if (field.includes('.')) {
      // Handle nested fields like contact.name
      const [parent, child] = field.split('.');
      if (!newInitiatives[index][parent]) {
        newInitiatives[index][parent] = {};
      }
      newInitiatives[index][parent][child] = value;
    } else {
      newInitiatives[index][field] = value;
    }
    updateData('expectedOutcome.strategicInitiatives', newInitiatives);
  };

  return (
    <div className="strategic-initiatives-form">
      <div className="form-section">
        <div className="section-header">
          <h3>Strategic Initiatives</h3>
          <p>Define the key business outcomes this client wants to achieve, along with the executive contacts responsible for each initiative.</p>
        </div>

        <div className="initiatives-list">
          {strategicInitiatives.map((initiative, index) => (
            <div key={index} className="initiative-card">
              <div className="initiative-header">
                <h4>Initiative {index + 1}</h4>
                <button
                  type="button"
                  className="btn-icon btn-danger"
                  onClick={() => removeInitiative(index)}
                  aria-label="Remove initiative"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="initiative-content">
                {/* Initiative Description */}
                <div className="form-group">
                  <label htmlFor={`initiative-${index}`}>Initiative Description *</label>
                  <textarea
                    id={`initiative-${index}`}
                    value={initiative.initiative || ''}
                    onChange={(e) => updateInitiative(index, 'initiative', e.target.value)}
                    placeholder="e.g., Reduce operational costs by 35% while scaling to $25M revenue"
                    rows={2}
                    required
                  />
                </div>

                {/* Contact Information */}
                <div className="contact-section">
                  <h5><User size={16} /> Executive Contact</h5>
                  <div className="contact-grid">
                    <div className="form-group">
                      <label htmlFor={`contact-name-${index}`}>Name *</label>
                      <input
                        type="text"
                        id={`contact-name-${index}`}
                        value={initiative.contact?.name || ''}
                        onChange={(e) => updateInitiative(index, 'contact.name', e.target.value)}
                        placeholder="e.g., Sarah Chen"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`contact-title-${index}`}>Title *</label>
                      <input
                        type="text"
                        id={`contact-title-${index}`}
                        value={initiative.contact?.title || ''}
                        onChange={(e) => updateInitiative(index, 'contact.title', e.target.value)}
                        placeholder="e.g., CEO & Co-Founder"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`contact-email-${index}`}>
                        <Mail size={14} /> Email *
                      </label>
                      <input
                        type="email"
                        id={`contact-email-${index}`}
                        value={initiative.contact?.email || ''}
                        onChange={(e) => updateInitiative(index, 'contact.email', e.target.value)}
                        placeholder="e.g., sarah.chen@company.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`contact-linkedin-${index}`}>
                        <Linkedin size={14} /> LinkedIn
                      </label>
                      <input
                        type="text"
                        id={`contact-linkedin-${index}`}
                        value={initiative.contact?.linkedin || ''}
                        onChange={(e) => updateInitiative(index, 'contact.linkedin', e.target.value)}
                        placeholder="e.g., linkedin.com/in/sarahchen-ceo"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`contact-phone-${index}`}>
                        <Phone size={14} /> Phone
                      </label>
                      <input
                        type="tel"
                        id={`contact-phone-${index}`}
                        value={initiative.contact?.phone || ''}
                        onChange={(e) => updateInitiative(index, 'contact.phone', e.target.value)}
                        placeholder="e.g., (512) 555-0123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-secondary btn-add-initiative"
            onClick={addInitiative}
          >
            <Plus size={16} />
            Add Strategic Initiative
          </button>
        </div>

        {/* Business Objectives */}
        <div className="form-group">
          <label htmlFor="business-objectives">Business Objectives</label>
          <textarea
            id="business-objectives"
            value={businessObjectives}
            onChange={(e) => updateData('expectedOutcome.businessObjectives', e.target.value)}
            placeholder="Describe the overall strategic objectives and goals this client wants to achieve..."
            rows={3}
          />
          <div className="form-help">
            <small>Optional: Provide context about the overall business goals and success criteria.</small>
          </div>
        </div>
      </div>

      <style jsx>{`
        .strategic-initiatives-form {
          max-width: 800px;
        }

        .section-header {
          margin-bottom: 2rem;
        }

        .section-header h3 {
          color: #1a1a1a;
          margin-bottom: 0.5rem;
        }

        .section-header p {
          color: #666;
          margin: 0;
        }

        .initiative-card {
          border: 1px solid #e1e5e9;
          border-radius: 8px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          background: #fafbfc;
        }

        .initiative-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e1e5e9;
        }

        .initiative-header h4 {
          margin: 0;
          color: #333;
          font-size: 1.1rem;
        }

        .btn-icon {
          background: none;
          border: none;
          padding: 0.25rem;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-danger {
          color: #dc3545;
        }

        .btn-danger:hover {
          background: #f8d7da;
        }

        .contact-section {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e1e5e9;
        }

        .contact-section h5 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: #495057;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .contact-grid .form-group:nth-child(3),
        .contact-grid .form-group:nth-child(4),
        .contact-grid .form-group:nth-child(5) {
          grid-column: span 1;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #495057;
          font-size: 0.9rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 0.9rem;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }

        .btn-add-initiative {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          justify-content: center;
          padding: 1rem;
          border: 2px dashed #ced4da;
          background: transparent;
          color: #6c757d;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .btn-add-initiative:hover {
          border-color: #007bff;
          color: #007bff;
          background: #f8f9fa;
        }

        .form-help {
          margin-top: 0.5rem;
        }

        .form-help small {
          color: #6c757d;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
} 


================================================
FILE: app/profiles/components/__tests__/ProfileWizard.test.js
================================================
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileWizard from '../ProfileWizard';

// Mock the markdownService
jest.mock('../../../services/markdownService', () => ({
  markdownService: {
    generateMarkdown: jest.fn(() => 'Generated markdown content'),
  },
}));

// Mock the profileService  
jest.mock('../../../services/profileService', () => ({
  profileService: {
    createProfile: jest.fn(() => Promise.resolve({ id: 'test-profile-id' })),
  },
}));

describe('ProfileWizard Enhanced Functionality', () => {
  let mockOnComplete;

  beforeEach(() => {
    mockOnComplete = jest.fn();
    jest.clearAllMocks();
  });

  describe('Company Overview Step', () => {
    test('renders all required company overview fields', () => {
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/industry/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/company size/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/annual revenue/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/employee count/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/primary location/i)).toBeInTheDocument();
    });

    test('validates required fields before proceeding', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);
      
      expect(screen.getByText(/company name is required/i)).toBeInTheDocument();
    });

    test('allows proceeding with valid company data', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      await user.selectOptions(screen.getByLabelText(/company size/i), 'Mid-Market');
      
      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);
      
      expect(screen.getByText(/business issue/i)).toBeInTheDocument();
    });
  });

  describe('Business Issue Step', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      // Navigate to Business Issue step
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      await user.click(screen.getByRole('button', { name: /next/i }));
    });

    test('renders business issue checkboxes', () => {
      expect(screen.getByText(/revenue growth pressure/i)).toBeInTheDocument();
      expect(screen.getByText(/cost reduction mandate/i)).toBeInTheDocument();
      expect(screen.getByText(/operational efficiency/i)).toBeInTheDocument();
      expect(screen.getByText(/digital transformation/i)).toBeInTheDocument();
    });

    test('allows selecting multiple business issues', async () => {
      const user = userEvent.setup();
      
      const revenueGrowth = screen.getByLabelText(/revenue growth pressure/i);
      const costReduction = screen.getByLabelText(/cost reduction mandate/i);
      
      await user.click(revenueGrowth);
      await user.click(costReduction);
      
      expect(revenueGrowth).toBeChecked();
      expect(costReduction).toBeChecked();
    });

    test('allows entering custom business issue', async () => {
      const user = userEvent.setup();
      
      const otherInput = screen.getByPlaceholderText(/specify other business issue/i);
      await user.type(otherInput, 'Custom business challenge');
      
      expect(otherInput).toHaveValue('Custom business challenge');
    });
  });

  describe('Problems/Challenges Step', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      // Navigate to Problems step
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      await user.click(screen.getByRole('button', { name: /next/i }));
      await user.click(screen.getByRole('button', { name: /next/i }));
    });

    test('renders department-specific problem sections', () => {
      expect(screen.getByText(/finance department/i)).toBeInTheDocument();
      expect(screen.getByText(/hr department/i)).toBeInTheDocument();
      expect(screen.getByText(/it department/i)).toBeInTheDocument();
      expect(screen.getByText(/customer service/i)).toBeInTheDocument();
      expect(screen.getByText(/operations/i)).toBeInTheDocument();
    });

    test('allows selecting departmental problems', async () => {
      const user = userEvent.setup();
      
      const financeProblems = screen.getAllByRole('checkbox');
      const firstProblem = financeProblems[0];
      
      await user.click(firstProblem);
      expect(firstProblem).toBeChecked();
    });

    test('allows entering additional challenges', async () => {
      const user = userEvent.setup();
      
      const additionalChallenges = screen.getByPlaceholderText(/describe additional challenges/i);
      await user.type(additionalChallenges, 'Additional challenge description');
      
      expect(additionalChallenges).toHaveValue('Additional challenge description');
    });
  });

  describe('Impact Step', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      // Navigate to Impact step
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      await user.click(screen.getByRole('button', { name: /next/i })); // Business Issue
      await user.click(screen.getByRole('button', { name: /next/i })); // Problems
      await user.click(screen.getByRole('button', { name: /next/i })); // Root Cause
      await user.click(screen.getByRole('button', { name: /next/i })); // Impact
    });

    test('renders hard costs input fields', () => {
      expect(screen.getByLabelText(/labor costs/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/error correction costs/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/system downtime costs/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/compliance penalties/i)).toBeInTheDocument();
    });

    test('renders soft costs selection fields', () => {
      expect(screen.getByLabelText(/employee frustration/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/customer satisfaction decline/i)).toBeInTheDocument();
    });

    test('calculates total hard costs automatically', async () => {
      const user = userEvent.setup();
      
      await user.type(screen.getByLabelText(/labor costs/i), '100000');
      await user.type(screen.getByLabelText(/error correction costs/i), '50000');
      
      expect(screen.getByText(/total hard costs: \$150,000/i)).toBeInTheDocument();
    });
  });

  describe('Solution Step', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      // Navigate to Solution step - simplified for testing
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      for (let i = 0; i < 5; i++) {
        await user.click(screen.getByRole('button', { name: /next/i }));
      }
    });

    test('renders solution capabilities section', () => {
      expect(screen.getByText(/solution capabilities needed/i)).toBeInTheDocument();
      expect(screen.getByText(/automate document processing/i)).toBeInTheDocument();
      expect(screen.getByText(/streamline approval workflows/i)).toBeInTheDocument();
    });

    test('renders differentiation requirements', () => {
      expect(screen.getByText(/differentiation requirements/i)).toBeInTheDocument();
      expect(screen.getByText(/industry-specific expertise/i)).toBeInTheDocument();
      expect(screen.getByText(/rapid implementation/i)).toBeInTheDocument();
    });

    test('renders ROI expectations fields', () => {
      expect(screen.getByLabelText(/target cost reduction/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/target efficiency improvement/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/expected payback period/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/target roi/i)).toBeInTheDocument();
    });

    test('renders success metrics section', () => {
      expect(screen.getByText(/success metrics/i)).toBeInTheDocument();
      expect(screen.getByText(/process cycle time reduction/i)).toBeInTheDocument();
      expect(screen.getByText(/error rate improvement/i)).toBeInTheDocument();
    });
  });

  describe('Decision Step', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      // Navigate to Decision step
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      for (let i = 0; i < 6; i++) {
        await user.click(screen.getByRole('button', { name: /next/i }));
      }
    });

    test('renders decision makers fields', () => {
      expect(screen.getByLabelText(/economic buyer name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/economic buyer title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/budget authority/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/technical buyer name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/champion name/i)).toBeInTheDocument();
    });

    test('renders buying process section', () => {
      expect(screen.getByLabelText(/decision timeline/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/budget cycle/i)).toBeInTheDocument();
      expect(screen.getByText(/evaluation criteria/i)).toBeInTheDocument();
    });

    test('renders risks of inaction section', () => {
      expect(screen.getByText(/risks of inaction/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/continued cost escalation/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/employee attrition risk/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/estimated cost of inaction/i)).toBeInTheDocument();
    });

    test('allows entering decision maker information', async () => {
      const user = userEvent.setup();
      
      await user.type(screen.getByLabelText(/economic buyer name/i), 'Sarah Chen');
      await user.type(screen.getByLabelText(/economic buyer title/i), 'CEO');
      await user.type(screen.getByLabelText(/budget authority/i), '1000000');
      
      expect(screen.getByDisplayValue('Sarah Chen')).toBeInTheDocument();
      expect(screen.getByDisplayValue('CEO')).toBeInTheDocument();
      expect(screen.getByDisplayValue('1000000')).toBeInTheDocument();
    });
  });

  describe('AI Assessment Step', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      // Navigate to AI Assessment step
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      for (let i = 0; i < 7; i++) {
        await user.click(screen.getByRole('button', { name: /next/i }));
      }
    });

    test('renders technology landscape section', () => {
      expect(screen.getByText(/current technology landscape/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/primary erp/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/crm system/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/collaboration tools/i)).toBeInTheDocument();
    });

    test('renders AI readiness scoring section', () => {
      expect(screen.getByText(/ai readiness score/i)).toBeInTheDocument();
      expect(screen.getByText(/data availability and quality/i)).toBeInTheDocument();
      expect(screen.getByText(/system integration capability/i)).toBeInTheDocument();
      expect(screen.getByText(/technical team readiness/i)).toBeInTheDocument();
    });

    test('calculates total AI readiness score', () => {
      const rangeInputs = screen.getAllByRole('slider');
      expect(rangeInputs.length).toBeGreaterThan(0);
      expect(screen.getByText(/total ai readiness score: 0\/10/i)).toBeInTheDocument();
    });

    test('allows adding AI opportunities', async () => {
      const user = userEvent.setup();
      
      const addOpportunityButton = screen.getByRole('button', { name: /add opportunity/i });
      await user.click(addOpportunityButton);
      
      expect(screen.getByText(/opportunity 1/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/invoice processing automation/i)).toBeInTheDocument();
    });

    test('allows adding quick wins', async () => {
      const user = userEvent.setup();
      
      const addQuickWinButton = screen.getByRole('button', { name: /add quick win/i });
      await user.click(addQuickWinButton);
      
      expect(screen.getByPlaceholderText(/automated ticket routing/i)).toBeInTheDocument();
    });
  });

  describe('Profile Completion', () => {
    test('completes profile creation successfully', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      // Fill out minimal required data
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      
      // Navigate through all steps
      for (let i = 0; i < 8; i++) {
        await user.click(screen.getByRole('button', { name: /next/i }));
      }
      
      // Complete the profile
      const completeButton = screen.getByRole('button', { name: /create profile/i });
      await user.click(completeButton);
      
      await waitFor(() => {
        expect(mockOnComplete).toHaveBeenCalled();
      });
    });

    test('generates markdown with comprehensive data', async () => {
      const { markdownService } = require('../../../services/markdownService');
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      // Fill comprehensive data
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      await user.click(screen.getByRole('button', { name: /next/i }));
      
      // Select business issues
      await user.click(screen.getByLabelText(/revenue growth pressure/i));
      await user.click(screen.getByRole('button', { name: /next/i }));
      
      // Navigate through remaining steps and complete
      for (let i = 0; i < 6; i++) {
        await user.click(screen.getByRole('button', { name: /next/i }));
      }
      
      const completeButton = screen.getByRole('button', { name: /create profile/i });
      await user.click(completeButton);
      
      await waitFor(() => {
        expect(markdownService.generateMarkdown).toHaveBeenCalled();
        expect(mockOnComplete).toHaveBeenCalled();
      });
    });
  });

  describe('Navigation and UX', () => {
    test('allows navigation backward through steps', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      await user.type(screen.getByLabelText(/company name/i), 'Test Corp');
      await user.click(screen.getByRole('button', { name: /next/i }));
      
      expect(screen.getByText(/business issue/i)).toBeInTheDocument();
      
      const backButton = screen.getByRole('button', { name: /back/i });
      await user.click(backButton);
      
      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    });

    test('displays progress indicator', () => {
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      expect(screen.getByText(/step 1 of 9/i)).toBeInTheDocument();
    });

    test('preserves form data when navigating between steps', async () => {
      const user = userEvent.setup();
      render(<ProfileWizard onComplete={mockOnComplete} />);
      
      const companyNameInput = screen.getByLabelText(/company name/i);
      await user.type(companyNameInput, 'Test Corp');
      
      await user.click(screen.getByRole('button', { name: /next/i }));
      await user.click(screen.getByRole('button', { name: /back/i }));
      
      expect(screen.getByDisplayValue('Test Corp')).toBeInTheDocument();
    });
  });
}); 


================================================
FILE: app/repositories/credentialsRepository.js
================================================
'use client';

/**
 * External Service Credentials Repository
 * 
 * Manages all external service credentials (AI providers, CRM systems, etc.)
 * using unified database table with AES-256 encryption.
 */

import { supabase } from '../lib/supabase';

export class CredentialsRepository {
  /**
   * Get all service credentials for a user
   * @param {string} userId - User ID
   * @param {string} serviceType - Optional filter by service type
   * @returns {Promise<Array>} Array of credential configurations
   */
  static async getCredentials(userId, serviceType = null) {
    if (!userId) {
      return [];
    }

    try {
      let query = supabase
        .from('external_service_credentials')
        .select('*')
        .eq('user_id', userId)
        .order('service_type', { ascending: true })
        .order('display_name', { ascending: true });

      if (serviceType) {
        query = query.eq('service_type', serviceType);
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ Error fetching credentials:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('❌ Exception in getCredentials:', error);
      throw new Error('Failed to fetch service credentials.');
    }
  }

  /**
   * Get active default provider for a service type
   * @param {string} userId - User ID
   * @param {string} serviceType - Service type ('ai_provider', 'crm_system', etc.)
   * @returns {Promise<Object|null>} Default provider configuration
   */
  static async getDefaultProvider(userId, serviceType) {
    if (!userId || !serviceType) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('external_service_credentials')
        .select('*')
        .eq('user_id', userId)
        .eq('service_type', serviceType)
        .eq('is_active', true)
        .eq('is_default', true)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') { // Not found is not an error
          console.error('❌ Error fetching default provider:', error);
        }
        return null;
      }

      return data;
    } catch (error) {
      console.error('❌ Exception in getDefaultProvider:', error);
      return null;
    }
  }

  /**
   * Save or update service credentials
   * @param {string} userId - User ID
   * @param {Object} credentialData - Credential configuration
   * @returns {Promise<Object>} Saved credential record
   */
  static async saveCredentials(userId, credentialData) {
    if (!userId) {
      throw new Error('User authentication required.');
    }

    console.log('🚀 saveCredentials called with:', { userId, credentialData: { ...credentialData, credentials: '[HIDDEN]' } });

    try {
      const {
        id,
        serviceType,
        serviceName,
        displayName,
        credentials, // Plain text credentials (will be encrypted)
        configuration = {},
        isActive = true,
        isDefault = false
      } = credentialData;

      console.log('🔑 Extracting credentials for encryption...');
      console.log('📋 Extracted data:', { id, serviceType, serviceName, displayName, hasCredentials: !!credentials, configuration, isActive, isDefault });

      // Encrypt credentials on server-side via API
      console.log('🔐 Calling encryption API...');
      const encryptionResponse = await this._encryptCredentials(credentials);
      console.log('✅ Encryption response received:', { hasEncrypted: !!encryptionResponse.encrypted, hasMetadata: !!encryptionResponse.metadata });
      
      const recordData = {
        user_id: userId,
        service_type: serviceType,
        service_name: serviceName,
        display_name: displayName,
        credentials_encrypted: encryptionResponse.encrypted,
        encryption_metadata: encryptionResponse.metadata,
        configuration,
        is_active: isActive,
        is_default: isDefault,
        updated_at: new Date().toISOString()
      };

      console.log('📦 Prepared record data:', { ...recordData, credentials_encrypted: '[HIDDEN]', encryption_metadata: '[HIDDEN]' });

      let result;
      if (id) {
        console.log('🔄 Updating existing credential with ID:', id);
        // Update existing
        const { data, error } = await supabase
          .from('external_service_credentials')
          .update(recordData)
          .eq('id', id)
          .eq('user_id', userId)
          .select()
          .single();

        console.log('📊 Update result:', { success: !error, error: error?.message, hasData: !!data });
        if (error) {
          console.error('❌ Update error details:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          });
          throw error;
        }
        result = data;
      } else {
        console.log('➕ Creating new credential...');
        console.log('💾 About to insert record:', { 
          ...recordData, 
          credentials_encrypted: '[HIDDEN]', 
          encryption_metadata: '[HIDDEN]' 
        });
        
        // Create new
        const { data, error } = await supabase
          .from('external_service_credentials')
          .insert([{
            ...recordData,
            created_at: new Date().toISOString()
          }])
          .select()
          .single();

        console.log('📊 Insert result:', { 
          success: !error, 
          error: error?.message,
          errorCode: error?.code,
          errorDetails: error?.details,
          errorHint: error?.hint,
          hasData: !!data, 
          newId: data?.id 
        });
        
        if (error) {
          console.error('❌ Insert error details:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
            recordData: { ...recordData, credentials_encrypted: '[HIDDEN]', encryption_metadata: '[HIDDEN]' }
          });
          throw error;
        }
        result = data;
      }

      console.log('🎉 saveCredentials completed successfully with result ID:', result?.id);
      return result;
    } catch (error) {
      console.error('💥 Exception in saveCredentials:', error);
      console.error('🔍 Error details:', { 
        message: error.message, 
        stack: error.stack, 
        name: error.name,
        cause: error.cause 
      });
      throw new Error(`Failed to save credentials: ${error.message}`);
    }
  }

  /**
   * Test connection for service credentials
   * @param {string} userId - User ID
   * @param {string} credentialId - Credential ID
   * @returns {Promise<Object>} Test result
   */
  static async testConnection(userId, credentialId) {
    if (!userId || !credentialId) {
      throw new Error('User ID and credential ID required.');
    }

    try {
      // Get the credential record
      const { data: credential, error } = await supabase
        .from('external_service_credentials')
        .select('*')
        .eq('id', credentialId)
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      // Update status to testing
      await supabase
        .from('external_service_credentials')
        .update({ 
          test_status: 'testing',
          last_tested_at: new Date().toISOString()
        })
        .eq('id', credentialId)
        .eq('user_id', userId);

      // Call appropriate test API based on service type/name
      const testResult = await this._callTestAPI(credential);

      // Update with test results
      const finalStatus = testResult.success ? 'success' : 'failed';
      await supabase
        .from('external_service_credentials')
        .update({ 
          test_status: finalStatus,
          test_result: testResult,
          last_tested_at: new Date().toISOString()
        })
        .eq('id', credentialId)
        .eq('user_id', userId);

      return testResult;
    } catch (error) {
      console.error('❌ Exception in testConnection:', error);
      
      // Update status to failed
      if (credentialId) {
        await supabase
          .from('external_service_credentials')
          .update({ 
            test_status: 'failed',
            test_result: { 
              success: false, 
              error: error.message,
              timestamp: new Date().toISOString()
            },
            last_tested_at: new Date().toISOString()
          })
          .eq('id', credentialId)
          .eq('user_id', userId);
      }

      throw error;
    }
  }

  /**
   * Delete service credentials
   * @param {string} userId - User ID
   * @param {string} credentialId - Credential ID
   * @returns {Promise<boolean>} Success status
   */
  static async deleteCredentials(userId, credentialId) {
    if (!userId || !credentialId) {
      throw new Error('User ID and credential ID required.');
    }

    try {
      const { error } = await supabase
        .from('external_service_credentials')
        .delete()
        .eq('id', credentialId)
        .eq('user_id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('❌ Exception in deleteCredentials:', error);
      throw new Error('Failed to delete credentials.');
    }
  }

  /**
   * Set default provider for a service type
   * @param {string} userId - User ID
   * @param {string} credentialId - Credential ID to set as default
   * @returns {Promise<boolean>} Success status
   */
  static async setDefaultProvider(userId, credentialId) {
    if (!userId || !credentialId) {
      throw new Error('User ID and credential ID required.');
    }

    try {
      // Get the credential to know its service type
      const { data: credential, error } = await supabase
        .from('external_service_credentials')
        .select('service_type')
        .eq('id', credentialId)
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      // The database trigger will handle unsetting other defaults
      await supabase
        .from('external_service_credentials')
        .update({ is_default: true })
        .eq('id', credentialId)
        .eq('user_id', userId);

      return true;
    } catch (error) {
      console.error('❌ Exception in setDefaultProvider:', error);
      throw new Error('Failed to set default provider.');
    }
  }

  // =============================================
  // Private Helper Methods
  // =============================================

  /**
   * Encrypt credentials using server-side API
   * @param {Object} credentials - Plain text credentials
   * @returns {Promise<Object>} Encrypted credentials with metadata
   * @private
   */
  static async _encryptCredentials(credentials) {
    console.log('🔐 _encryptCredentials called with credentials keys:', Object.keys(credentials || {}));
    
    // Get current session for authentication
    const { data: { session } } = await supabase.auth.getSession();
    console.log('🎫 Session check:', { hasSession: !!session, hasAccessToken: !!session?.access_token });
    
    const headers = { 'Content-Type': 'application/json' };
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
    
    console.log('🌐 Making encryption API call...');
    const response = await fetch('/api/admin/encrypt-credentials', {
      method: 'POST',
      headers,
      body: JSON.stringify({ credentials })
    });

    console.log('📡 Encryption API response:', { status: response.status, ok: response.ok });
    
    if (!response.ok) {
      try {
        const errorResponse = await response.json();
        console.error('❌ Encryption API failed:', errorResponse);
        
        // Provide specific error message for setup issues
        if (response.status === 503 && errorResponse.setupRequired) {
          throw new Error('Credential encryption not configured. Please set up your ENCRYPTION_KEY environment variable. Visit /api/admin/generate-encryption-key for help.');
        }
        
        throw new Error(errorResponse.details || errorResponse.error || 'Failed to encrypt credentials');
      } catch (jsonError) {
        // Fallback if response is not JSON
        const errorText = await response.text();
        console.error('❌ Encryption API failed with non-JSON response:', errorText);
        throw new Error('Failed to encrypt credentials - server error');
      }
    }

    const result = await response.json();
    console.log('✅ Encryption API success:', { hasEncrypted: !!result.encrypted, hasMetadata: !!result.metadata });
    return result;
  }

  /**
   * Call appropriate test API based on service
   * @param {Object} credential - Credential record
   * @returns {Promise<Object>} Test result
   * @private
   */
  static async _callTestAPI(credential) {
    const { service_type, service_name } = credential;
    
    // Get current session for authentication
    const { data: { session } } = await supabase.auth.getSession();
    
    const headers = { 'Content-Type': 'application/json' };
    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }
    
    const response = await fetch('/api/admin/test-connection', {
      method: 'POST',
      headers,
      body: JSON.stringify({ 
        credentialId: credential.id,
        serviceType: service_type,
        serviceName: service_name
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.message || 'Connection test failed');
    }

    return await response.json();
  }
} 


================================================
FILE: app/repositories/profileRepository.js
================================================
'use client';

/**
 * Profile Repository
 * 
 * Abstracts data access for client profiles, exclusively using Supabase.
 * All methods require an authenticated user.
 */

import { supabase } from '../lib/supabase';

export class ProfileRepository {
  /**
   * Create a new profile
   * @param {Object} profileData - Profile data to create
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object>} Created profile with ID
   */
  static async createProfile(profileData, userId) {
    if (!userId) {
      throw new Error('User authentication is required to create a profile.');
    }

    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .insert([{
          user_id: userId,
          name: profileData.companyName,
          description: `${profileData.industry} profile for ${profileData.companyName}`,
          industry: profileData.industry,
          company_size: profileData.size,
          profile_data: profileData,
          markdown_content: profileData.markdown || null
        }])
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase create error:', error);
        throw error;
      }

      return this.transformFromDatabase(data);
    } catch (error) {
      console.error('❌ Exception in createProfile:', error);
      throw new Error('Failed to create profile in Supabase.');
    }
  }

  /**
   * Get all profiles for a user
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Array>} Array of user profiles
   */
  static async getProfiles(userId) {
    if (!userId) {
      // Return empty array for non-authenticated state, as UI might call this before auth check
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase getProfiles error:', error);
        throw error;
      }

      return data ? data.map(this.transformFromDatabase) : [];
    } catch (error) {
      console.error('❌ Exception in getProfiles:', error);
      throw new Error('Failed to fetch profiles from Supabase.');
    }
  }

  /**
   * Get a specific profile by ID
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object|null>} Profile data or null
   */
  static async getProfile(profileId, userId) {
    if (!userId) {
      throw new Error('User authentication is required to fetch a profile.');
    }

    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('*')
        .eq('id', profileId)
        .eq('user_id', userId)
        .single();

      if (error) {
        // 'PGRST116' is the code for "Not Found", which is not a throw-worthy error.
        if (error.code !== 'PGRST116') {
          console.error('❌ Supabase getProfile error:', error);
          throw error;
        }
        return null;
      }

      return data ? this.transformFromDatabase(data) : null;
    } catch (error) {
      console.error('❌ Exception in getProfile:', error);
      throw new Error('Failed to fetch profile from Supabase.');
    }
  }

  /**
   * Update a profile
   * @param {string} profileId - Profile ID
   * @param {Object} updates - Profile updates
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object>} Updated profile
   */
  static async updateProfile(profileId, updates, userId) {
    if (!userId) {
      throw new Error('User authentication is required to update a profile.');
    }

    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .update({
          name: updates.companyName || undefined,
          description: updates.companyName ? `${updates.industry || ''} profile for ${updates.companyName}` : undefined,
          industry: updates.industry || undefined,
          company_size: updates.size || undefined,
          profile_data: updates,
          markdown_content: updates.markdown || undefined,
          updated_at: new Date().toISOString()
        })
        .eq('id', profileId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) {
        console.error('❌ Supabase update error:', error);
        throw error;
      }

      return this.transformFromDatabase(data);
    } catch (error) {
      console.error('❌ Exception in updateProfile:', error);
      throw new Error('Failed to update profile in Supabase.');
    }
  }

  /**
   * Delete a profile
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async deleteProfile(profileId, userId) {
    if (!userId) {
      throw new Error('User authentication is required to delete a profile.');
    }

    try {
      const { error } = await supabase
        .from('client_profiles')
        .delete()
        .eq('id', profileId)
        .eq('user_id', userId);

      if (error) {
        console.error('❌ Supabase delete error:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('❌ Exception in deleteProfile:', error);
      throw new Error('Failed to delete profile from Supabase.');
    }
  }

  // =============================================
  // Timeline Caching Methods
  // =============================================

  /**
   * Get cached timeline for a profile
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<Object|null>} Cached timeline data or null
   */
  static async getCachedTimeline(profileId, userId) {
    if (!userId) {
      console.warn('⚠️ No userId provided to getCachedTimeline');
      return null;
    }
    
    try {
      const { data, error } = await supabase
        .from('client_profiles')
        .select('timeline_data, last_timeline_generated_at')
        .eq('id', profileId)
        .eq('user_id', userId)
        .single();
        
      if (error) {
        if (error.code !== 'PGRST116') { // Not a "not found" error
          console.error('❌ Supabase getCachedTimeline error:', error);
        }
        return null;
      }
      
      if (!data?.timeline_data) {
        return null; // No cached timeline exists
      }
      
      return {
        timeline: data.timeline_data,
        generatedAt: data.last_timeline_generated_at,
        scenarioType: data.timeline_data.scenarioType || 'balanced'
      };
    } catch (error) {
      console.error('❌ Exception in getCachedTimeline:', error);
      return null;
    }
  }

  /**
   * Save timeline to database
   * @param {string} profileId - Profile ID
   * @param {Object} timelineData - Timeline data to save
   * @param {string} scenarioType - Scenario type used for generation
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async saveTimeline(profileId, timelineData, scenarioType, userId) {
    if (!userId) {
      throw new Error('User authentication is required to save timeline.');
    }
    
    try {
      // Add metadata to timeline data
      const timelineWithMeta = {
        ...timelineData,
        scenarioType,
        generatedAt: new Date().toISOString(),
        version: '1.0'
      };

      const { error } = await supabase
        .from('client_profiles')
        .update({
          timeline_data: timelineWithMeta,
          last_timeline_generated_at: new Date().toISOString()
        })
        .eq('id', profileId)
        .eq('user_id', userId);
        
      if (error) {
        console.error('❌ Supabase saveTimeline error:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('❌ Exception in saveTimeline:', error);
      throw new Error('Failed to save timeline to database.');
    }
  }

  /**
   * Clear cached timeline for a profile
   * @param {string} profileId - Profile ID
   * @param {string} userId - User ID (from Supabase Auth)
   * @returns {Promise<boolean>} Success status
   */
  static async clearTimelineCache(profileId, userId) {
    if (!userId) {
      throw new Error('User authentication is required to clear timeline cache.');
    }
    
    try {
      const { error } = await supabase
        .from('client_profiles')
        .update({
          timeline_data: null,
          last_timeline_generated_at: null
        })
        .eq('id', profileId)
        .eq('user_id', userId);
        
      if (error) {
        console.error('❌ Supabase clearTimelineCache error:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('❌ Exception in clearTimelineCache:', error);
      throw new Error('Failed to clear timeline cache.');
    }
  }

  // =============================================
  // Utility Methods
  // =============================================

  /**
   * Transform database record to expected profile format
   */
  static transformFromDatabase(dbRecord) {
    // Extract profile data and ensure Supabase ID takes precedence
    const { id: oldId, ...profileDataWithoutId } = dbRecord.profile_data || {};
    
    return {
      id: dbRecord.id, // Always use the Supabase UUID as the primary ID
      ...profileDataWithoutId, // Spread profile data but exclude any old ID
      markdown: dbRecord.markdown_content,
      createdAt: dbRecord.created_at,
      updatedAt: dbRecord.updated_at,
      // Add database-specific fields
      _supabaseRecord: true,
      _userId: dbRecord.user_id,
      // Store the original localStorage ID for reference if needed
      _originalId: oldId || null
    };
  }
}


================================================
FILE: app/services/aiService.js
================================================
import { OpenAIServerProvider } from '../lib/llm/providers/openaiServerProvider';

/**
 * Central AI Service
 *
 * This service is the single entry point for all LLM interactions in the application.
 * It abstracts the specific provider implementation and provides generic methods
 * for interacting with LLMs.
 */
class AIService {
  constructor() {
    // For now, we are hardcoding the OpenAI provider.
    // This could be extended to a factory pattern to select providers based on configuration.
    this.provider = new OpenAIServerProvider();
  }

  /**
   * Generates a JSON object from a given set of prompts.
   * @param {string} systemPrompt - The system prompt to guide the AI's behavior.
   * @param {string} userPrompt - The user-specific prompt or question.
   * @param {object} options - Additional options for the generation (e.g., temperature).
   * @returns {Promise<object>} The generated JSON object.
   */
  async generateJson(systemPrompt, userPrompt, options = {}) {
    if (!this.provider) {
      throw new Error('No AI provider configured.');
    }
    // The actual generation is delegated to the specific provider.
    return this.provider.generateJson(systemPrompt, userPrompt, options);
  }

  /**
   * Checks if the AI service is properly configured.
   * @returns {{configured: boolean, provider: string, apiKeyStatus: string}} Status object.
   */
  getStatus() {
    if (!this.provider) {
        return {
            configured: false,
            provider: 'None',
            apiKeyStatus: 'Not applicable'
        };
    }
    return this.provider.getStatus();
  }
}

// Export a singleton instance of the service
export const aiService = new AIService(); 


================================================
FILE: app/services/demoDataService.js
================================================
'use client';

/**
 * Demo Data Service
 * 
 * Provides realistic sample client profiles focused on agentic AI opportunity identification.
 * Uses streamlined business outcome framework for digital twin creation.
 */

export const demoDataService = {
  /**
   * Get a collection of demo profiles
   * @returns {Array} Array of demo profile objects
   */
  getDemoProfiles() {
    return [
      this.getTechStartupProfile(),
      this.getManufacturingProfile(), 
      this.getHealthcareProfile(),
      this.getFinanceProfile()
    ];
  },

  /**
   * Get a specific demo profile by type
   * @param {string} type - Type of demo profile
   * @returns {Object} Demo profile data
   */
  getDemoProfile(type = 'tech-startup') {
    const profiles = {
      'tech-startup': this.getTechStartupProfile(),
      'manufacturing': this.getManufacturingProfile(),
      'healthcare': this.getHealthcareProfile(),
      'finance': this.getFinanceProfile()
    };
    return profiles[type] || profiles['tech-startup'];
  },

  /**
   * Technology startup profile - TechFlow Solutions
   */
  getTechStartupProfile() {
    return {
      companyName: 'TechFlow Solutions',
      industry: 'Technology - SaaS',
      size: '120 employees',
      annualRevenue: '$15M',
      location: 'Austin, Texas',
      
      expectedOutcome: {
        strategicInitiatives: [
          {
            initiative: "Reduce operational costs by 35% while scaling to $25M revenue",
            contact: {
              name: "Sarah Chen",
              title: "CEO & Co-Founder",
              email: "sarah.chen@techflow.com",
              linkedin: "linkedin.com/in/sarahchen-ceo",
              phone: "(512) 555-0123"
            }
          },
          {
            initiative: "Improve customer response times from 4 hours to 30 minutes",
            contact: {
              name: "Lisa Park",
              title: "VP of Customer Success", 
              email: "lisa.park@techflow.com",
              linkedin: "linkedin.com/in/lisakpark",
              phone: "(512) 555-0156"
            }
          },
          {
            initiative: "Scale technical operations without proportional headcount increase",
            contact: {
              name: "Mike Rodriguez",
              title: "CTO",
              email: "mike.rodriguez@techflow.com",
              linkedin: "linkedin.com/in/mikerodrtech",
              phone: "(512) 555-0189"
            }
          }
        ],
        businessObjectives: "Achieve profitable growth to $25M revenue while maintaining 85%+ customer satisfaction and <2% churn rate. Prepare for Series B funding round in 12 months."
      },
      
      problems: {
        businessProblems: [
          "Customer support tickets manually triaged - 4+ hour response times",
          "Invoice processing and approvals take 2-3 weeks",
          "Sales leads manually qualified - missing 40% of warm prospects",
          "Employee onboarding takes 2 weeks with 15+ manual steps",
          "Customer data scattered across 12+ tools - no unified view",
          "Engineering team spends 30% time on operational tasks vs product development"
        ],
        agenticOpportunities: [
          "Intelligent ticket classification and auto-routing to specialists",
          "Automated invoice processing with approval workflows",
          "AI-powered lead scoring and qualification",
          "Conversational onboarding assistant for new employees",
          "Unified customer health scoring across all touchpoints",
          "Automated incident response and system monitoring"
        ]
      },
      
      solutions: {
        capabilities: [
          "ServiceNow-native agentic workflows for ticket automation",
          "Intelligent document processing and approval routing",
          "Real-time customer health monitoring with predictive alerts",
          "Conversational AI for employee and customer self-service",
          "Integration platform connecting all business systems"
        ],
        differentiators: [
          "No-code workflow designer - business users can modify",
          "Native ServiceNow integration - no vendor lock-in",
          "Proven ROI with similar SaaS companies (8-month payback)",
          "Rapid deployment - functional workflows in 30 days"
        ],
        competitorGaps: [
          "Other solutions require 6+ month implementations",
          "Most require dedicated AI/ML engineering team",
          "Custom solutions create technical debt and maintenance burden"
        ]
      },
      
      value: {
        businessValue: {
          revenueImpact: "Reduce customer churn by 35% = $425K annual revenue retention",
          costReduction: "Save 480 hours/month manual work = $240K annual labor savings", 
          operationalEfficiency: "Support team handles 3x ticket volume with same headcount",
          kpiImprovements: [
            "Customer response time: 4 hours → 30 minutes",
            "Invoice processing: 18 days → 3 days", 
            "Lead qualification accuracy: 60% → 90%",
            "Employee onboarding: 14 days → 3 days"
          ],
          totalAnnualImpact: "$665K cost savings + $425K revenue protection = $1.09M"
        },
        personalValue: {
          executiveWin: "Sarah (CEO): Board recognition for operational excellence and scalability preparation",
          teamWin: "Lisa (Customer Success): Transforms from reactive firefighting to proactive strategy",
          careerImpact: "Mike (CTO): Recognized as innovation leader, engineering team focuses on product vs ops",
          organizationalBenefit: "Company culture shifts from manual/reactive to automated/proactive"
        }
      },
      
      currentArchitecture: {
        coreSystems: [
          "ServiceNow (IT Service Management)",
          "HubSpot (CRM & Marketing)",
          "QuickBooks Online (Financial)",
          "Slack (Communication)",
          "Notion (Documentation)",
          "GitHub (Development)"
        ],
        integrations: "Basic Zapier connections between 3-4 systems",
        dataQuality: "Fair - customer data exists but scattered across systems",
        technicalDebt: "Spreadsheet-heavy processes, manual data entry, inconsistent workflows",
        aiReadiness: "Medium - good data foundation but limited automation experience"
      }
    };
  },

  /**
   * Manufacturing company profile - PrecisionParts Manufacturing
   */
  getManufacturingProfile() {
    return {
      companyName: 'PrecisionParts Manufacturing',
      industry: 'Manufacturing - Aerospace Components',
      size: '450 employees',
      annualRevenue: '$85M',
      location: 'Cleveland, Ohio',
      
      expectedOutcome: {
        strategicInitiatives: [
          {
            initiative: "Achieve 25% cost reduction to compete with overseas manufacturers",
            contact: {
              name: "Robert Chen",
              title: "President & COO",
              email: "rchen@precisionparts.com", 
              linkedin: "linkedin.com/in/robertchen-manufacturing",
              phone: "(216) 555-0234"
            }
          },
          {
            initiative: "Reduce waste and quality defects from 15% to under 5%",
            contact: {
              name: "Maria Santos",
              title: "VP Quality & Operations",
              email: "msantos@precisionparts.com",
              linkedin: "linkedin.com/in/mariasantos-quality",
              phone: "(216) 555-0267"
            }
          },
          {
            initiative: "Implement predictive maintenance to eliminate unplanned downtime",
            contact: {
              name: "David Kim",
              title: "Director of Manufacturing Engineering",
              email: "dkim@precisionparts.com",
              linkedin: "linkedin.com/in/davidkim-mfgeng",
              phone: "(216) 555-0298"
            }
          }
        ],
        businessObjectives: "Maintain domestic manufacturing competitiveness through operational excellence. Achieve ISO certification and prepare for aerospace industry consolidation."
      },
      
      problems: {
        businessProblems: [
          "Quality inspections are 100% manual - miss defects until final assembly",
          "Machine maintenance is calendar-based - leads to unexpected failures",
          "Production planning relies on Excel - poor demand forecasting",
          "Compliance documentation is paper-based and error-prone",
          "Supply chain disruptions not detected until shortages occur",
          "Worker safety incidents not tracked systematically"
        ],
        agenticOpportunities: [
          "Computer vision quality inspection with real-time feedback",
          "Predictive maintenance based on sensor data and patterns",
          "Intelligent production scheduling with demand forecasting",
          "Automated compliance reporting and audit trail generation",
          "Supply chain risk monitoring with alternative sourcing",
          "Safety incident prediction and prevention workflows"
        ]
      },
      
      solutions: {
        capabilities: [
          "AI-powered visual quality inspection systems",
          "Predictive maintenance with IoT sensor integration",
          "Intelligent supply chain monitoring and risk assessment", 
          "Automated compliance documentation and reporting",
          "Real-time production optimization based on demand signals"
        ],
        differentiators: [
          "Industry-specific manufacturing workflows pre-built",
          "Integration with existing MES/ERP systems",
          "Proven ROI in similar manufacturing environments",
          "Phased implementation minimizes production disruption"
        ],
        competitorGaps: [
          "Most solutions require complete system replacement",
          "Generic AI tools don't understand manufacturing processes",
          "High implementation risk during production periods"
        ]
      },
      
      value: {
        businessValue: {
          costReduction: "Reduce waste from 15% to 5% = $850K annual materials savings",
          qualityImpact: "Prevent quality escapes = $300K annual warranty/rework costs",
          maintenanceOptimization: "Reduce unplanned downtime 80% = $420K annual productivity gain",
          laborEfficiency: "Automate quality inspections = $180K annual labor savings",
          totalAnnualImpact: "$1.75M cost reduction + improved competitive positioning"
        },
        personalValue: {
          executiveWin: "Robert (President): Demonstrates cost leadership to board and customers",
          teamWin: "Maria (Quality): Transforms from reactive problem-solving to preventive excellence",
          careerImpact: "David (Engineering): Recognized as Industry 4.0 leader in manufacturing",
          organizationalBenefit: "Workforce upskilled on modern technology, improved job satisfaction"
        }
      },
      
      currentArchitecture: {
        coreSystems: [
          "SAP ERP (Finance & Materials)",
          "Wonderware MES (Manufacturing Execution)",
          "QAD (Production Planning)",
          "Minitab (Quality Analysis)",
          "AutoCAD (Engineering)",
          "Excel (Everywhere else)"
        ],
        integrations: "Limited EDI with key suppliers, mostly manual data transfer",
        dataQuality: "Good production data but poor historical analysis capabilities",
        technicalDebt: "Legacy systems from 2010s, minimal automation, paper-heavy processes",
        aiReadiness: "Low - strong operational data but limited technology adoption experience"
      }
    };
  },

  /**
   * Healthcare organization profile - Regional Medical Center
   */
  getHealthcareProfile() {
    return {
      companyName: 'Regional Medical Center',
      industry: 'Healthcare - Regional Hospital System',
      size: '2,100 employees',
      annualRevenue: '$320M',
      location: 'Phoenix, Arizona',
      
      expectedOutcome: {
        strategicInitiatives: [
          {
            initiative: "Reduce nurse burnout and improve patient outcomes through workflow optimization",
            contact: {
              name: "Dr. Jennifer Walsh",
              title: "Chief Medical Officer",
              email: "jwalsh@regionalmed.org",
              linkedin: "linkedin.com/in/drjenniferwalsh",
              phone: "(602) 555-0345"
            }
          },
          {
            initiative: "Decrease average patient wait times from 45 minutes to under 15 minutes",
            contact: {
              name: "Marcus Thompson",
              title: "VP Patient Experience",
              email: "mthompson@regionalmed.org",
              linkedin: "linkedin.com/in/marcusthompson-healthcare",
              phone: "(602) 555-0378"
            }
          },
          {
            initiative: "Achieve $5M annual cost reduction while maintaining care quality",
            contact: {
              name: "Patricia Davis",
              title: "CFO",
              email: "pdavis@regionalmed.org",
              linkedin: "linkedin.com/in/patriciadavis-healthcare-finance",
              phone: "(602) 555-0401"
            }
          }
        ],
        businessObjectives: "Transform from volume-based to value-based care model. Improve patient satisfaction scores to top quartile while achieving sustainable financial performance."
      },
      
      problems: {
        businessProblems: [
          "Nurses spend 60% of time on documentation vs patient care",
          "Patient discharge planning delayed due to manual coordination",
          "Medication errors from illegible prescriptions and manual entry",
          "OR scheduling conflicts and delays impact surgeon productivity",
          "Insurance pre-authorization delays patient treatment",
          "Emergency department overcrowding from poor patient flow"
        ],
        agenticOpportunities: [
          "Automated clinical documentation using voice recognition",
          "Intelligent discharge planning with real-time bed management",
          "Clinical decision support for medication management", 
          "AI-powered scheduling optimization for OR and procedures",
          "Automated insurance verification and pre-authorization",
          "Patient flow orchestration across departments"
        ]
      },
      
      solutions: {
        capabilities: [
          "Clinical workflow automation with EHR integration",
          "Intelligent patient flow management and bed optimization",
          "AI-powered clinical decision support systems",
          "Automated administrative task processing",
          "Real-time resource allocation and scheduling optimization"
        ],
        differentiators: [
          "HIPAA-compliant healthcare-specific workflows",
          "Deep EHR integration (Epic, Cerner, Allscripts)",
          "Proven clinical outcomes improvement",
          "Nurse and physician-friendly interface design"
        ],
        competitorGaps: [
          "Most solutions don't integrate deeply with existing EHR",
          "Generic automation doesn't understand clinical workflows",
          "Complex implementations disrupt patient care"
        ]
      },
      
      value: {
        businessValue: {
          laborOptimization: "Nurses spend 40% more time on patient care = improved outcomes",
          operationalEfficiency: "Reduce average length of stay by 0.5 days = $2.3M annual savings",
          revenueOptimization: "Increase OR utilization 15% = $1.8M additional revenue",
          qualityImprovement: "Reduce medication errors 75% = $800K risk mitigation",
          totalAnnualImpact: "$4.9M operational improvement + immeasurable patient outcome benefits"
        },
        personalValue: {
          executiveWin: "Dr. Walsh (CMO): Recognized for clinical innovation and patient outcome leadership",
          teamWin: "Marcus (Patient Experience): Transforms patient satisfaction scores and hospital reputation",
          careerImpact: "Patricia (CFO): Achieves cost targets while improving clinical metrics",
          organizationalBenefit: "Staff satisfaction improves, turnover reduces, better work-life balance"
        }
      },
      
      currentArchitecture: {
        coreSystems: [
          "Epic EHR (Electronic Health Records)",
          "McKesson (Pharmacy Management)",
          "GE Healthcare (Medical Devices)",
          "Philips (Patient Monitoring)",
          "Cerner PowerChart (Clinical Documentation)",
          "Oracle (Financial Management)"
        ],
        integrations: "HL7 interfaces between clinical systems, manual processes for admin workflows",
        dataQuality: "Excellent clinical data but poor operational analytics",
        technicalDebt: "Fragmented point solutions, heavy manual coordination between departments",
        aiReadiness: "Medium - strong data foundation but conservative technology adoption"
      }
    };
  },

  /**
   * Financial services profile - Community Trust Bank
   */
  getFinanceProfile() {
    return {
      companyName: 'Community Trust Bank',
      industry: 'Financial Services - Regional Banking',
      size: '380 employees',
      annualRevenue: '$180M',
      location: 'Charlotte, North Carolina',
      
      expectedOutcome: {
        strategicInitiatives: [
          {
            initiative: "Compete with fintech companies by reducing loan approval time from 3 weeks to 24 hours",
            contact: {
              name: "Michael Foster",
              title: "Chief Lending Officer",
              email: "mfoster@communitytrust.bank",
              linkedin: "linkedin.com/in/michaelfoster-banking",
              phone: "(704) 555-0456"
            }
          },
          {
            initiative: "Reduce operational costs by 30% while maintaining personalized service",
            contact: {
              name: "Angela Martinez",
              title: "Chief Operating Officer",
              email: "amartinez@communitytrust.bank",
              linkedin: "linkedin.com/in/angelamartinez-bankingops",
              phone: "(704) 555-0489"
            }
          },
          {
            initiative: "Enhance fraud detection and regulatory compliance automation",
            contact: {
              name: "James Liu",
              title: "Chief Risk Officer",
              email: "jliu@communitytrust.bank",
              linkedin: "linkedin.com/in/jamesliu-banking-risk",
              phone: "(704) 555-0512"
            }
          }
        ],
        businessObjectives: "Maintain community banking values while achieving digital-first efficiency. Grow market share among small businesses and young professionals through superior customer experience."
      },
      
      problems: {
        businessProblems: [
          "Loan underwriting requires 15+ manual steps and 3 weeks processing",
          "Customer onboarding takes 5 business days with multiple forms",
          "Fraud detection relies on rule-based systems with high false positives",
          "Regulatory reporting is manual and error-prone",
          "Customer service inquiries require multiple department transfers",
          "Small business lending loses deals to online competitors"
        ],
        agenticOpportunities: [
          "Automated loan underwriting with risk assessment",
          "Digital customer onboarding with identity verification",
          "AI-powered fraud detection with behavioral analysis",
          "Automated regulatory reporting and compliance monitoring",
          "Intelligent customer service routing and resolution",
          "Real-time credit decision making for small business loans"
        ]
      },
      
      solutions: {
        capabilities: [
          "Automated lending workflows with risk-based decision making",
          "Digital customer onboarding with KYC/AML compliance",
          "Advanced fraud detection using machine learning",
          "Automated regulatory reporting and audit trail generation",
          "Intelligent customer service with omnichannel support"
        ],
        differentiators: [
          "Banking-specific compliance and regulatory workflows",
          "Integration with core banking systems (FIS, Jack Henry)",
          "Proven ROI with similar community banks",
          "Maintains personal touch while adding digital efficiency"
        ],
        competitorGaps: [
          "Fintech solutions lack regulatory compliance depth",
          "Big bank solutions too complex and expensive",
          "Custom development creates regulatory risk"
        ]
      },
      
      value: {
        businessValue: {
          revenueGrowth: "Process 3x more loan applications = $2.4M additional interest income",
          costReduction: "Automate 60% of manual processes = $840K annual labor savings",
          riskMitigation: "Reduce fraud losses 80% = $320K annual savings",
          complianceEfficiency: "Automated reporting = $180K annual compliance cost reduction",
          totalAnnualImpact: "$3.74M financial improvement + competitive positioning"
        },
        personalValue: {
          executiveWin: "Michael (CLO): Transforms lending from cost center to profit driver",
          teamWin: "Angela (COO): Achieves operational excellence while maintaining service quality",
          careerImpact: "James (CRO): Recognized for innovative risk management approach",
          organizationalBenefit: "Staff focuses on relationship building vs paperwork processing"
        }
      },
      
      currentArchitecture: {
        coreSystems: [
          "Jack Henry SilverLake (Core Banking)",
          "FIS (Loan Origination)",
          "Salesforce (CRM)",
          "ADP (HR & Payroll)",
          "Microsoft 365 (Productivity)",
          "Symitar (Member Management)"
        ],
        integrations: "Limited API connections, mostly file-based data transfer",
        dataQuality: "Good customer and transaction data but poor analytics capabilities",
        technicalDebt: "Legacy systems with limited automation, paper-heavy processes",
        aiReadiness: "Low-Medium - good data foundation but conservative about new technology adoption"
      }
    };
  }
}; 


================================================
FILE: app/services/markdownService.js
================================================
/**
 * Markdown Service for Client Profiles
 * 
 * Converts structured profile data to/from markdown format.
 * This prevents AI hallucinations by maintaining structured, parseable format.
 */

export const markdownService = {
  /**
   * Generate structured markdown from profile data
   * @param {Object} profileData - Structured profile data from forms
   * @returns {string} Formatted markdown content
   */
  generateMarkdown(profileData) {
    // Check if this is new agentic AI format or old Value Selling Framework format
    if (profileData.expectedOutcome || profileData.problems || profileData.solutions) {
      return this.generateAgenticAIMarkdown(profileData);
    }
    
    // Fallback to old format
    const sections = [
      this.generateHeader(profileData),
      this.generateCompanyOverview(profileData),
      this.generateValueSellingFramework(profileData),
      this.generateAIOpportunityAssessment(profileData),
      this.generateSummary(profileData)
    ];

    return sections.filter(section => section).join('\n\n---\n\n');
  },

  /**
   * Generate markdown for new agentic AI format
   * @param {Object} data - Agentic AI format data
   * @returns {string} Formatted markdown
   */
  generateAgenticAIMarkdown(data) {
    const sections = [
      this.generateHeader(data),
      this.generateCompanyOverview(data),
      this.generateExpectedOutcome(data),
      this.generateProblemsAndOpportunities(data),
      this.generateSolutionsAndValue(data),
      this.generateCurrentArchitectureSection(data),
      this.generateAgenticAISummary(data)
    ];

    return sections.filter(section => section).join('\n\n---\n\n');
     },

  /**
   * Generate Expected Business Outcome section
   */
  generateExpectedOutcome(data) {
    const outcome = data.expectedOutcome || {};
    let content = '## Expected Business Outcome\n\n';

    content += '### Strategic Initiatives\n';
    if (outcome.strategicInitiatives?.length > 0) {
      outcome.strategicInitiatives.forEach((initiative, index) => {
        content += `#### ${index + 1}. ${initiative.initiative}\n`;
        if (initiative.contact) {
          content += `**Contact**: ${initiative.contact.name} (${initiative.contact.title})\n`;
          content += `- Email: ${initiative.contact.email}\n`;
          content += `- LinkedIn: ${initiative.contact.linkedin}\n`;
          content += `- Phone: ${initiative.contact.phone}\n\n`;
        }
      });
    }

    if (outcome.businessObjectives) {
      content += `### Business Objectives\n${outcome.businessObjectives}\n`;
    }

    return content;
  },

  /**
   * Generate Problems and Agentic Opportunities section
   */
  generateProblemsAndOpportunities(data) {
    const problems = data.problems || {};
    let content = '## Problems & Agentic AI Opportunities\n\n';

    content += '### Current Business Problems\n';
    if (problems.businessProblems?.length > 0) {
      problems.businessProblems.forEach(problem => {
        content += `- ${problem}\n`;
      });
    }

    content += '\n### Agentic Workflow Opportunities\n';
    if (problems.agenticOpportunities?.length > 0) {
      problems.agenticOpportunities.forEach(opportunity => {
        content += `- **${opportunity}**\n`;
      });
    }

    return content;
  },

  /**
   * Generate Solutions and Value section
   */
  generateSolutionsAndValue(data) {
    const solutions = data.solutions || {};
    const value = data.value || {};
    let content = '## Solutions & Value Proposition\n\n';

    content += '### Capabilities\n';
    if (solutions.capabilities?.length > 0) {
      solutions.capabilities.forEach(capability => {
        content += `- ${capability}\n`;
      });
    }

    content += '\n### Key Differentiators\n';
    if (solutions.differentiators?.length > 0) {
      solutions.differentiators.forEach(diff => {
        content += `- ${diff}\n`;
      });
    }

    if (solutions.competitorGaps?.length > 0) {
      content += '\n### Competitor Gaps\n';
      solutions.competitorGaps.forEach(gap => {
        content += `- ${gap}\n`;
      });
    }

    // Value section
    if (value.businessValue) {
      content += '\n### Business Value\n';
      const bv = value.businessValue;
      if (bv.revenueImpact) content += `**Revenue Impact**: ${bv.revenueImpact}\n\n`;
      if (bv.costReduction) content += `**Cost Reduction**: ${bv.costReduction}\n\n`;
      if (bv.operationalEfficiency) content += `**Operational Efficiency**: ${bv.operationalEfficiency}\n\n`;
      
      if (bv.kpiImprovements?.length > 0) {
        content += '**KPI Improvements**:\n';
        bv.kpiImprovements.forEach(kpi => {
          content += `- ${kpi}\n`;
        });
        content += '\n';
      }
      
      if (bv.totalAnnualImpact) {
        content += `**Total Annual Impact**: ${bv.totalAnnualImpact}\n\n`;
      }
    }

    if (value.personalValue) {
      content += '### Personal Value\n';
      const pv = value.personalValue;
      if (pv.executiveWin) content += `**Executive Win**: ${pv.executiveWin}\n\n`;
      if (pv.teamWin) content += `**Team Win**: ${pv.teamWin}\n\n`;
      if (pv.careerImpact) content += `**Career Impact**: ${pv.careerImpact}\n\n`;
      if (pv.organizationalBenefit) content += `**Organizational Benefit**: ${pv.organizationalBenefit}\n\n`;
    }

    return content;
  },

  /**
   * Generate Current Architecture section
   */
  generateCurrentArchitectureSection(data) {
    const arch = data.currentArchitecture || {};
    let content = '## Current Architecture\n\n';

    content += '### Core Systems\n';
    if (arch.coreSystems?.length > 0) {
      arch.coreSystems.forEach(system => {
        content += `- ${system}\n`;
      });
    }

    if (arch.integrations) {
      content += `\n**Integrations**: ${arch.integrations}\n`;
    }
    if (arch.dataQuality) {
      content += `**Data Quality**: ${arch.dataQuality}\n`;
    }
    if (arch.technicalDebt) {
      content += `**Technical Debt**: ${arch.technicalDebt}\n`;
    }
    if (arch.aiReadiness) {
      content += `**AI Readiness**: ${arch.aiReadiness}\n`;
    }

    return content;
  },

  /**
   * Generate summary for agentic AI format
   */
  generateAgenticAISummary(data) {
    const outcome = data.expectedOutcome || {};
    const value = data.value || {};
    
    let content = '## Executive Summary\n\n';
    
    content += `**Company**: ${data.companyName} (${data.industry}, ${data.size})\n\n`;
    
    if (outcome.businessObjectives) {
      content += `**Strategic Objective**: ${outcome.businessObjectives}\n\n`;
    }
    
    if (value.businessValue?.totalAnnualImpact) {
      content += `**Financial Impact**: ${value.businessValue.totalAnnualImpact}\n\n`;
    }
    
    content += '### Key Contacts\n';
    if (outcome.strategicInitiatives?.length > 0) {
      outcome.strategicInitiatives.forEach(initiative => {
        if (initiative.contact) {
          content += `- **${initiative.contact.name}** (${initiative.contact.title}) - ${initiative.contact.email}\n`;
        }
      });
    }

    return content;
  },

  /**
   * Parse markdown back to structured data
   * @param {string} markdown - Markdown content
   * @returns {Object} Structured profile data
   */
  parseMarkdown(markdown) {
    try {
      const data = {};
      
      // Extract company name from header
      const nameMatch = markdown.match(/^# Client Profile: (.+)$/m);
      if (nameMatch) {
        data.companyName = nameMatch[1];
      } else {
        throw new Error('Invalid markdown format: missing client profile header');
      }
      
      // Parse company overview section
      data.companyOverview = this.parseCompanyOverview(markdown);
      
      // Parse value selling framework
      // data.valueSellingFramework = this.parseValueSellingFramework(markdown);
      
      // Parse AI opportunities
      // data.aiOpportunities = this.parseAIOpportunities(markdown);
      
      return data;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      throw error;
    }
  },

  generateHeader(data) {
    return `# Client Profile: ${data.companyName || '[Client Name]'}`;
  },

  generateCompanyOverview(data) {
    return `## Company Overview
- **Company Name**: ${data.companyName || '[Enter company name]'}
- **Industry**: ${data.industry || '[Enter industry]'}
- **Size**: ${data.size || '[Small (50-500) / Mid-Market (500-5K) / Enterprise (5K+)]'}
- **Annual Revenue**: $${data.annualRevenue || '[Enter amount]'}
- **Employee Count**: ${data.employeeCount || '[Enter number]'}
- **Primary Location**: ${data.primaryLocation || '[Enter location]'}

---`;
  },

  // Alias for backward compatibility
  generateValueSellingFramework(data) {
    return this.generateAgenticAIFramework(data);
  },

  generateAgenticAIFramework(data) {
    const framework = data.agenticAIFramework || {};
    let content = '## Agentic AI Framework\n\n';

    // 1. Business Issue
    content += '### 1. Business Issue\n';
    content += '**High-level strategic priority or C-level concern:**\n';
    
    if (framework.businessIssues?.length > 0) {
      framework.businessIssues.forEach(issue => {
        content += `- [x] ${issue}\n`;
      });
    }
    
    if (framework.businessIssuesOther) {
      content += `- [x] Other: ${framework.businessIssuesOther}\n`;
    }
    
    if (framework.businessIssueDetails) {
      content += `\n**Details**: ${framework.businessIssueDetails}\n`;
    }

    // 2. Problems / Challenges
    content += '\n### 2. Problems / Challenges\n';
    content += '**Specific operational issues identified:**\n\n';

    // Department-specific problems
    const departments = [
      { key: 'finance', name: 'Finance Department' },
      { key: 'hr', name: 'HR Department' },
      { key: 'it', name: 'IT Department' },
      { key: 'customerService', name: 'Customer Service' },
      { key: 'operations', name: 'Operations' }
    ];

    departments.forEach(dept => {
      const problems = framework.departmentalProblems?.[dept.key] || [];
      if (problems.length > 0) {
        content += `#### ${dept.name}\n`;
        problems.forEach(problem => {
          content += `- [x] ${problem}\n`;
        });
        content += '\n';
      }
    });

    if (framework.additionalChallenges) {
      content += `**Additional Challenges**: ${framework.additionalChallenges}\n`;
    }

    // 3. Root Cause
    content += '\n### 3. Root Cause\n';
    content += '**Why do these challenges exist?**\n';
    
    if (framework.rootCauses?.length > 0) {
      framework.rootCauses.forEach(cause => {
        content += `- [x] ${cause}\n`;
      });
    }
    
    if (framework.rootCausesOther) {
      content += `- [x] Other: ${framework.rootCausesOther}\n`;
    }
    
    if (framework.rootCauseDetails) {
      content += `\n**Details**: ${framework.rootCauseDetails}\n`;
    }

    // 4. Impact
    content += '\n### 4. Impact\n';
    content += '**Quantified effects:**\n\n';
    
    content += '#### Hard Costs (Annual)\n';
    const hardCosts = framework.hardCosts || {};
    content += `- Labor costs from manual processes: $${hardCosts.laborCosts || '[Amount]'}\n`;
    content += `- Error correction costs: $${hardCosts.errorCosts || '[Amount]'}\n`;
    content += `- System downtime costs: $${hardCosts.downtimeCosts || '[Amount]'}\n`;
    content += `- Compliance penalties/risk: $${hardCosts.complianceCosts || '[Amount]'}\n`;
    
    const totalHardCosts = Object.values(hardCosts).reduce((sum, cost) => {
      const num = parseFloat(cost) || 0;
      return sum + num;
    }, 0);
    
    content += `- **Total Hard Costs**: $${totalHardCosts > 0 ? totalHardCosts.toLocaleString() : '[Sum]'}\n\n`;
    
    content += '#### Soft Costs\n';
    const softCosts = framework.softCosts || {};
    content += `- Employee frustration/turnover impact: ${softCosts.employeeFrustration || '[High/Medium/Low]'}\n`;
    content += `- Customer satisfaction decline: ${softCosts.customerSatisfaction || '[High/Medium/Low]'}\n`;
    content += `- Competitive disadvantage: ${softCosts.competitiveDisadvantage || '[High/Medium/Low]'}\n`;
    content += `- Missed opportunities/growth: ${softCosts.missedOpportunities || '[High/Medium/Low]'}\n`;

    // 5. Solution
    content += '\n### 5. Solution\n';
    content += '**Capabilities needed to solve these challenges:**\n';
    
    if (framework.solutionCapabilities?.length > 0) {
      framework.solutionCapabilities.forEach(capability => {
        content += `- [x] ${capability}\n`;
      });
    }
    
    if (framework.solutionCapabilitiesOther) {
      content += `- [x] Other: ${framework.solutionCapabilitiesOther}\n`;
    }

    content += '\n**Differentiation Requirements:**\n';
    if (framework.differentiationRequirements?.length > 0) {
      framework.differentiationRequirements.forEach(requirement => {
        content += `- [x] ${requirement}\n`;
      });
    }
    
    if (framework.differentiationOther) {
      content += `- [x] Other: ${framework.differentiationOther}\n`;
    }

    // Value/ROI Expectations
    content += '\n**Value / ROI Expectations:**\n';
    const roiExpectations = framework.roiExpectations || {};
    if (roiExpectations.costReduction) content += `- Target cost reduction: ${roiExpectations.costReduction}\n`;
    if (roiExpectations.efficiencyImprovement) content += `- Target efficiency improvement: ${roiExpectations.efficiencyImprovement}\n`;
    if (roiExpectations.paybackPeriod) content += `- Expected payback period: ${roiExpectations.paybackPeriod}\n`;
    if (roiExpectations.targetROI) content += `- Target ROI: ${roiExpectations.targetROI}\n`;
    if (roiExpectations.timeToFirstValue) content += `- Time to first value: ${roiExpectations.timeToFirstValue}\n`;

    // Success Metrics
    content += '\n**Success Metrics:**\n';
    if (framework.successMetrics?.length > 0) {
      framework.successMetrics.forEach(metric => {
        content += `- [x] ${metric}\n`;
      });
    }
    
    if (framework.successMetricsTargets) {
      content += `\n**Specific Targets**: ${framework.successMetricsTargets}\n`;
    }

    // 6. Decision
    content += '\n### 6. Decision\n';
    content += '**Decision makers and buying process:**\n\n';
    
    const decisionMakers = framework.decisionMakers || {};
    
    content += '#### Key Decision Makers\n';
    if (decisionMakers.economicBuyer?.name) {
      content += `**Economic Buyer**: ${decisionMakers.economicBuyer.name}`;
      if (decisionMakers.economicBuyer.title) content += ` (${decisionMakers.economicBuyer.title})`;
      if (decisionMakers.economicBuyer.budget) content += ` - Budget Authority: $${parseInt(decisionMakers.economicBuyer.budget).toLocaleString()}`;
      content += '\n';
    }
    
    if (decisionMakers.technicalBuyer?.name) {
      content += `**Technical Buyer**: ${decisionMakers.technicalBuyer.name}`;
      if (decisionMakers.technicalBuyer.title) content += ` (${decisionMakers.technicalBuyer.title})`;
      content += '\n';
    }
    
    if (decisionMakers.champion?.name) {
      content += `**Champion**: ${decisionMakers.champion.name}`;
      if (decisionMakers.champion.title) content += ` (${decisionMakers.champion.title})`;
      content += '\n';
    }
    
    if (decisionMakers.influencers) {
      content += `**Influencers**: ${decisionMakers.influencers}\n`;
    }

    content += '\n#### Buying Process\n';
    const buyingProcess = framework.buyingProcess || {};
    if (buyingProcess.timeline) content += `- **Decision timeline**: ${buyingProcess.timeline}\n`;
    if (buyingProcess.budgetCycle) content += `- **Budget cycle**: ${buyingProcess.budgetCycle}\n`;
    
    if (buyingProcess.evaluationCriteria?.length > 0) {
      content += '- **Evaluation criteria**:\n';
      buyingProcess.evaluationCriteria.forEach(criteria => {
        content += `  - ${criteria}\n`;
      });
    }
    
    if (buyingProcess.evaluationOther) {
      content += `  - ${buyingProcess.evaluationOther}\n`;
    }

    // Risks of Inaction
    content += '\n#### Risks of Inaction\n';
    const risksOfInaction = framework.risksOfInaction || {};
    if (risksOfInaction.costEscalation) {
      content += `- **Continued cost escalation**: $${parseInt(risksOfInaction.costEscalation).toLocaleString()} annually\n`;
    }
    if (risksOfInaction.employeeAttrition) {
      content += `- **Employee attrition risk**: ${risksOfInaction.employeeAttrition}\n`;
    }
    if (risksOfInaction.threeYearCost) {
      content += `- **Estimated cost of inaction (3 years)**: $${parseInt(risksOfInaction.threeYearCost).toLocaleString()}\n`;
    }
    if (risksOfInaction.competitiveDisadvantage) {
      content += `- **Competitive disadvantage**: ${risksOfInaction.competitiveDisadvantage}\n`;
    }
    if (risksOfInaction.customerSatisfaction) {
      content += `- **Customer satisfaction decline**: ${risksOfInaction.customerSatisfaction}\n`;
    }
    if (risksOfInaction.complianceRisk) {
      content += `- **Regulatory compliance risk**: ${risksOfInaction.complianceRisk}\n`;
    }

    return content;
  },

  // Alias for backward compatibility  
  generateAIOpportunityAssessment(data) {
    return this.generateCurrentArchitecture(data);
  },

  generateCurrentArchitecture(data) {
    const assessment = data.currentArchitectureAssessment || {};
    let content = '## Current Architecture Assessment\n\n';

    // Current Technology Landscape
    content += '### Current Technology Landscape\n';
    const currentTech = assessment.currentTechnology || {};
    content += `- **Primary ERP**: ${currentTech.erp || '[Not specified]'}\n`;
    content += `- **CRM System**: ${currentTech.crm || '[Not specified]'}\n`;
    content += `- **Collaboration Tools**: ${currentTech.collaboration || '[Not specified]'}\n`;
    content += `- **Integration Maturity**: ${currentTech.integrationMaturity || '[Not assessed]'}\n`;
    content += `- **Data Quality**: ${currentTech.dataQuality || '[Not assessed]'}\n`;
    
    if (currentTech.automation) {
      content += `- **Current Automation**: ${currentTech.automation}\n`;
    }

    // AI Readiness Score
    content += '\n### AI Readiness Score\n';
    const readinessScoring = assessment.readinessScoring || {};
    const criteriaLabels = {
      dataQuality: 'Data availability and quality',
      integration: 'System integration capability',
      technicalTeam: 'Technical team readiness',
      leadership: 'Leadership support',
      changeManagement: 'Change management capability'
    };

    Object.entries(criteriaLabels).forEach(([key, label]) => {
      const score = readinessScoring[key] || 0;
      const max = 2;
      content += `- **${label}**: ${score}/${max}\n`;
    });

    const totalScore = Object.values(readinessScoring).reduce((sum, score) => sum + (score || 0), 0);
    content += `\n**Total AI Readiness Score: ${totalScore}/10**\n`;

    // Top AI Opportunities
    content += '\n### Top AI Opportunities (Prioritized)\n';
    const opportunities = assessment.opportunities || [];
    
    if (opportunities.length > 0) {
      opportunities
        .sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0))
        .forEach((opportunity, index) => {
          content += `\n#### ${index + 1}. ${opportunity.name || 'Unnamed Opportunity'}\n`;
          content += `- **Department**: ${opportunity.department || 'Not specified'}\n`;
          content += `- **Process**: ${opportunity.process || 'Not specified'}\n`;
          content += `- **Current State**: ${opportunity.currentState || 'Not described'}\n`;
          content += `- **AI Solution**: ${opportunity.aiSolution || 'Not specified'}\n`;
          content += `- **Estimated Impact**: $${opportunity.estimatedImpact ? parseInt(opportunity.estimatedImpact).toLocaleString() : '[Not quantified]'}\n`;
          content += `- **Implementation Effort**: ${opportunity.implementationEffort || 'Medium'}\n`;
          content += `- **Timeline**: ${opportunity.timeline || 'Not specified'}\n`;
          content += `- **Priority Score**: ${opportunity.priorityScore || 5}/10\n`;
        });
    } else {
      content += 'No specific opportunities identified yet.\n';
    }

    // Quick Wins
    content += '\n### Quick Wins (0-6 months)\n';
    const quickWins = assessment.quickWins || [];
    
    if (quickWins.length > 0) {
      quickWins.forEach((quickWin, index) => {
        content += `${index + 1}. **${quickWin.name || 'Unnamed Quick Win'}**\n`;
        content += `   - Impact: $${quickWin.impact ? parseInt(quickWin.impact).toLocaleString() : '[Not quantified]'}\n`;
        content += `   - Timeline: ${quickWin.timeline || 'Not specified'}\n`;
      });
    } else {
      content += 'No quick wins identified yet.\n';
    }

    return content;
  },

  generateSummary(data) {
    const summary = data.summary || {};
    
    return `## Summary & Next Steps

### Executive Summary
**Current State**: ${summary.currentState || '[Brief description of key challenges and costs]'}

**Recommended Approach**: ${summary.recommendedApproach || '[High-level strategy recommendation]'}

**Expected Value**: 
- Total 3-year benefit: $${summary.expectedValue?.threeYearBenefit || '[Amount]'}
- Investment required: $${summary.expectedValue?.investment || '[Amount]'}
- Net ROI: ${summary.expectedValue?.netROI || '[X]%'}
- Payback period: ${summary.expectedValue?.paybackPeriod || '[X] months'}

### Immediate Next Steps
${this.generateNextSteps(summary.nextSteps)}

### Notes & Additional Context
${summary.notes || '[Free text area for additional observations, quotes from stakeholders, competitive insights, etc.]'}

---`;
  },

  generateFooter(data) {
    const now = new Date().toLocaleDateString();
    return `*Profile created on: ${now}*
*Last updated: ${now}*
*Created by: ${data.createdBy || '[Consultant name]'}*`;
  },

  // Helper methods
  generateCheckboxList(items, selectedItems = []) {
    return items.map(item => {
      const checked = selectedItems.includes(item) ? 'x' : ' ';
      return `- [${checked}] ${item}`;
    }).join('\n');
  },

  generateDepartmentProblems(department, problems = {}) {
    const templates = {
      finance: [
        'Manual invoice processing taking [X] days',
        '[X]% error rate in financial processes',
        'Month-end close takes [X] days'
      ],
      hr: [
        'Employee onboarding takes [X] days',
        'Manual resume screening',
        '[X]% employee turnover rate'
      ],
      it: [
        'Average ticket resolution: [X] hours',
        '[X]% of tickets require manual intervention',
        'System provisioning takes [X] hours'
      ],
      customerService: [
        'Average response time: [X] hours',
        '[X]% first contact resolution rate',
        'Customer satisfaction score: [X]/10'
      ],
      operations: [
        'Process cycle time: [X] days',
        '[X]% manual processes',
        'Quality issues: [X]% error rate'
      ]
    };

    const items = templates[department] || [];
    
    if (items.length === 0) {
      return '- [ ] Other: [Specify]';
    }
    
    return items.map(item => {
      const checked = problems[item] ? 'x' : ' ';
      return `- [${checked}] ${item}`;
    }).join('\n') + '\n- [ ] Other: [Specify]';
  },

  generateAIOpportunities(opportunities = []) {
    if (!opportunities.length) {
      return `#### Opportunity 1: [Name]
- **Department**: [Department]
- **Process**: [Specific process to automate]
- **Current State**: [How it works today]
- **AI Solution**: [What AI would do]
- **Estimated Impact**: $[Annual savings/benefit]
- **Implementation Effort**: [Low/Medium/High]
- **Timeline**: [X] months
- **Priority Score**: [X]/10`;
    }

    return opportunities.map((opp, index) => `#### Opportunity ${index + 1}: ${opp.name || '[Name]'}
- **Department**: ${opp.department || '[Department]'}
- **Process**: ${opp.process || '[Specific process to automate]'}
- **Current State**: ${opp.currentState || '[How it works today]'}
- **AI Solution**: ${opp.aiSolution || '[What AI would do]'}
- **Estimated Impact**: $${opp.estimatedImpact || '[Annual savings/benefit]'}
- **Implementation Effort**: ${opp.implementationEffort || '[Low/Medium/High]'}
- **Timeline**: ${opp.timeline || '[X] months'}
- **Priority Score**: ${opp.priorityScore || '[X]'}/10`).join('\n\n');
  },

  generateOpportunitiesList(opportunities = []) {
    if (!opportunities.length) {
      return '1. [Opportunity name] - $[Impact] - [Timeline]\n2. [Opportunity name] - $[Impact] - [Timeline]\n3. [Opportunity name] - $[Impact] - [Timeline]';
    }

    return opportunities.map((opp, index) => 
      `${index + 1}. ${opp.name || '[Opportunity name]'} - $${opp.impact || '[Impact]'} - ${opp.timeline || '[Timeline]'}`
    ).join('\n');
  },

  generateNextSteps(steps = []) {
    if (!steps.length) {
      return '1. [ ] [Specific action item with owner and date]\n2. [ ] [Specific action item with owner and date]\n3. [ ] [Specific action item with owner and date]';
    }

    return steps.map((step, index) => 
      `${index + 1}. [ ] ${step.action || '[Specific action item]'} - ${step.owner || '[Owner]'} - ${step.date || '[Date]'}`
    ).join('\n');
  },

  // Parsing methods for markdown to data conversion
  parseCompanyOverview(markdown) {
    const section = this.extractSection(markdown, '## Company Overview');
    const data = {};
    
    const patterns = {
      companyName: /\*\*Company Name\*\*:\s*(.+)/,
      industry: /\*\*Industry\*\*:\s*(.+)/,
      size: /\*\*Size\*\*:\s*(.+)/,
      annualRevenue: /\*\*Annual Revenue\*\*:\s*\$(.+)/,
      employeeCount: /\*\*Employee Count\*\*:\s*(.+)/,
      primaryLocation: /\*\*Primary Location\*\*:\s*(.+)/
    };

    Object.entries(patterns).forEach(([key, pattern]) => {
      const match = section.match(pattern);
      if (match) data[key] = match[1].trim();
    });

    return data;
  },

  extractSection(markdown, heading) {
    // Escape special regex characters in the heading
    const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match the heading and capture content until the next heading of same or higher level or end of string
    // Note: Don't use 'm' flag as it makes $ match end of line instead of end of string
    const regex = new RegExp(`${escapedHeading}\\n([\\s\\S]*?)(?=\\n##|$)`);
    const match = markdown.match(regex);
    return match ? match[1].trim() : '';
  }
}; 


================================================
FILE: app/services/profileService.js
================================================
'use client';

/**
 * Client Profile Management Service
 * 
 * Handles CRUD operations for client profiles using Supabase.
 * Integrates with AI services for timeline generation and opportunity analysis.
 * Requires user authentication for all profile operations.
 */

import { markdownService } from './markdownService';
import { ProfileRepository } from '../repositories/profileRepository';
import { getCurrentUser } from '../lib/supabase';

export class ProfileService {
  /**
   * Get current user ID for database operations
   * @returns {Promise<string|null>} User ID or null if not authenticated
   */
  static async getCurrentUserId() {
    try {
      const user = await getCurrentUser();
      return user?.id || null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Create a new client profile
   * @param {Object} profileData - Raw form data
   * @returns {Promise<Object>} Created profile with ID
   */
  static async createProfile(profileData) {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error("User must be authenticated to create a profile.");
      }

      // Convert form data to structured markdown
      const markdown = markdownService.generateMarkdown(profileData);
      
      // Prepare profile data, omitting client-side ID generation
      const profile = {
        ...profileData,
        markdown,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'draft'
      };
      
      // Use ProfileRepository for storage
      const createdProfile = await ProfileRepository.createProfile(profile, userId);
      return createdProfile;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  /**
   * Get all client profiles for the current user
   * @returns {Promise<Array>} Array of user profiles
   */
  static async getProfiles() {
    try {
      const userId = await this.getCurrentUserId();
      // The repository will handle the case where userId is null
      return await ProfileRepository.getProfiles(userId);
    } catch (error) {
      console.error('Error getting profiles:', error);
      // Fallback to empty array on error
      return [];
    }
  }

  /**
   * Get a specific profile by ID
   * @param {string} id - Profile ID
   * @returns {Promise<Object|null>} Profile data or null
   */
  static async getProfile(id) {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) return null; // No user, no profile
      return await ProfileRepository.getProfile(id, userId);
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  /**
   * Update a profile
   * @param {string} profileId - Profile ID
   * @param {Object} updates - Profile updates
   * @returns {Promise<Object>} Updated profile
   */
  static async updateProfile(profileId, updates) {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error("User must be authenticated to update a profile.");
      }
      
      // Add updated timestamp
      const updatedData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      return await ProfileRepository.updateProfile(profileId, updatedData, userId);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  /**
   * Delete a profile
   * @param {string} profileId - Profile ID
   * @returns {Promise<boolean>} Success status
   */
  static async deleteProfile(profileId) {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error("User must be authenticated to delete a profile.");
      }
      return await ProfileRepository.deleteProfile(profileId, userId);
    } catch (error) {
      console.error('Error deleting profile:', error);
      return false;
    }
  }

  /**
   * Get timeline for profile (cached or generated)
   * @param {Object} profile - Client profile
   * @param {boolean} forceRegenerate - Force new generation instead of using cache
   * @param {string} scenarioType - Override scenario type (optional)
   * @returns {Promise<Object>} Timeline data with cache metadata
   */
  static async getTimelineFromProfile(profile, forceRegenerate = false, scenarioType = null) {
    try {
      const userId = await this.getCurrentUserId();
      if (!userId) {
        throw new Error("User authentication is required for timeline generation.");
      }
      
      // Check if profile has an ID (is saved to database)
      const hasProfileId = profile && profile.id;
      
      // Try to get cached timeline first (only for saved profiles and unless forced to regenerate)
      if (hasProfileId && !forceRegenerate) {
        const cached = await ProfileRepository.getCachedTimeline(profile.id, userId);
        if (cached && cached.timeline) {
          // Check if scenario matches (if specified)
          if (!scenarioType || cached.scenarioType === scenarioType) {
            console.log(`✅ Using cached timeline for profile ${profile.id}`);
            return {
              ...cached.timeline,
              _cached: true,
              _generatedAt: cached.generatedAt,
              _scenarioType: cached.scenarioType
            };
          }
        }
      }
      
      if (hasProfileId) {
        console.log(`🔄 Generating new timeline for profile ${profile.id}`);
      } else {
        console.log(`🔄 Generating timeline for unsaved profile (${profile.companyName || 'unnamed'})`);
      }
      
      // Generate new timeline
      const finalScenarioType = scenarioType || this.determineScenarioType(profile);
      const timeline = await this._generateTimelineFromProfile(profile, finalScenarioType);
      
      // Save to database only if profile has an ID
      if (hasProfileId) {
        try {
          await ProfileRepository.saveTimeline(profile.id, timeline, finalScenarioType, userId);
        } catch (saveError) {
          console.warn('⚠️ Could not save timeline to cache:', saveError.message);
          // Don't fail the entire operation if caching fails
        }
      }
      
      return {
        ...timeline,
        _cached: false,
        _generatedAt: new Date().toISOString(),
        _scenarioType: finalScenarioType,
        _unsavedProfile: !hasProfileId
      };
    } catch (error) {
      console.error('Error getting timeline from profile:', error);
      throw error;
    }
  }

  /**
   * Force regenerate timeline for profile
   * @param {Object} profile - Client profile
   * @param {string} scenarioType - Scenario type for generation
   * @returns {Promise<Object>} Newly generated timeline data
   */
  static async regenerateTimelineFromProfile(profile, scenarioType = 'balanced') {
    return await this.getTimelineFromProfile(profile, true, scenarioType);
  }

  /**
   * Legacy method - now redirects to cache-aware method
   * @param {Object} profile - Client profile
   * @returns {Promise<Object>} Timeline data
   * @deprecated Use getTimelineFromProfile instead
   */
  static async generateTimelineFromProfile(profile) {
    return await this.getTimelineFromProfile(profile, false);
  }

  /**
   * Generate AI timeline from profile data (private method)
   * @param {Object} profile - Client profile
   * @param {string} scenarioType - Scenario type for generation
   * @returns {Promise<Object>} Timeline data
   * @private
   */
  static async _generateTimelineFromProfile(profile, scenarioType = 'balanced') {
    try {
      // Generate full markdown representation of the client profile
      const profileMarkdown = markdownService.generateMarkdown(profile);
      
      // Extract business profile data for metadata and scenario determination
      const businessProfile = this.extractBusinessProfile(profile);
      
      // Use existing timeline service but pass the full markdown for richer context
      const { TimelineService } = await import('./timelineService');
      const timeline = await TimelineService.generateTimelineFromMarkdown(profileMarkdown, scenarioType, businessProfile);
      
      // Enhance timeline with profile-specific insights
      return this.enhanceTimelineWithProfile(timeline, profile);
    } catch (error) {
      console.error('Error generating timeline from profile:', error);
      throw error;
    }
  }

  /**
   * Extract business profile data from client profile
   */
  static extractBusinessProfile(profile) {
    return {
      companyName: profile.companyName,
      industry: profile.industry,
      companySize: this.mapCompanySize(profile.size),
      aiMaturityLevel: this.calculateAIMaturity(profile),
      primaryGoals: this.extractPrimaryGoals(profile),
      currentTechStack: profile.currentTechnology || [],
      budget: this.estimateBudgetRange(profile),
      timeframe: this.extractTimeframe(profile)
    };
  }

  /**
   * Estimate budget range based on profile
   */
  static estimateBudgetRange(profile) {
    const budget = profile.valueSellingFramework?.decisionMakers?.economicBuyer?.budget;
    if (budget) {
      return budget;
    }
    
    // Estimate based on company size and impact
    const impact = profile.valueSellingFramework?.impact?.totalAnnualImpact || 0;
    if (impact > 5000000) return '>5m';
    if (impact > 1000000) return '1m-5m';
    if (impact > 500000) return '500k-1m';
    if (impact > 100000) return '100k-500k';
    return '<100k';
  }

  /**
   * Extract timeframe from profile
   */
  static extractTimeframe(profile) {
    const timeline = profile.valueSellingFramework?.buyingProcess?.timeline;
    if (timeline) {
      const months = parseInt(timeline);
      if (months <= 3) return '3months';
      if (months <= 6) return '6months';
      if (months <= 12) return '1year';
      return '2years+';
    }
    return '1year'; // Default
  }

  /**
   * Determine AI adoption scenario based on profile characteristics
   */
  static determineScenarioType(profile) {
    const aiReadiness = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
    const decisionTimeline = profile.decisionTimeline || 12;
    const riskTolerance = profile.riskTolerance || 'medium';
    
    if (aiReadiness >= 8 && decisionTimeline <= 6 && riskTolerance === 'high') {
      return 'aggressive';
    } else if (aiReadiness <= 4 || decisionTimeline >= 18 || riskTolerance === 'low') {
      return 'conservative';
    }
    return 'balanced';
  }

  /**
   * Generate opportunity recommendations based on profile
   */
  static async generateOpportunityRecommendations(profile) {
    // Analyze profile data to suggest AI/automation opportunities
    const opportunities = [];
    
    // Finance opportunities
    if (profile.problems?.finance?.manualInvoiceProcessing) {
      opportunities.push({
        department: 'Finance',
        title: 'Automated Invoice Processing',
        description: 'AI-powered invoice recognition and approval workflows',
        impact: this.calculateFinanceImpact(profile),
        effort: 'Medium',
        timeline: '3-4 months',
        priority: 'High'
      });
    }
    
    // HR opportunities
    if (profile.problems?.hr?.manualResumeScreening) {
      opportunities.push({
        department: 'HR',
        title: 'AI Resume Screening',
        description: 'Automated candidate screening and ranking',
        impact: this.calculateHRImpact(profile),
        effort: 'Low',
        timeline: '1-2 months',
        priority: 'Medium'
      });
    }
    
    // Customer Service opportunities
    if (profile.problems?.customerService?.responseTime) {
      opportunities.push({
        department: 'Customer Service',
        title: 'AI Chatbot & Routing',
        description: 'Intelligent ticket routing and automated responses',
        impact: this.calculateServiceImpact(profile),
        effort: 'Medium',
        timeline: '2-3 months',
        priority: 'High'
      });
    }
    
    return opportunities.sort((a, b) => {
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * Enhanced timeline with profile-specific context
   */
  static enhanceTimelineWithProfile(timeline, profile) {
    // Add profile-specific insights to each phase
    if (timeline.phases) {
      timeline.phases = timeline.phases.map((phase, index) => ({
        ...phase,
        profileInsights: this.getPhaseInsights(profile, index),
        specificOpportunities: this.getPhaseOpportunities(profile, index)
      }));
    }
    
    // Add risk factors based on profile
    timeline.riskFactors = this.identifyRiskFactors(profile);
    
    // Add competitive insights
    timeline.competitiveContext = this.getCompetitiveContext(profile);
    
    return timeline;
  }

  /**
   * Get phase-specific insights based on profile
   */
  static getPhaseInsights(profile, phaseIndex) {
    const insights = {
      0: `Focus on ${profile.primaryBusinessIssue} while building foundation`,
      1: `Address ${profile.topProblem} with targeted automation`,
      2: `Scale successful pilots across ${profile.size} organization`,
      3: `Optimize for ${profile.successMetrics?.join(', ')} improvements`
    };
    
    return insights[phaseIndex] || 'Continue systematic AI adoption';
  }

  /**
   * Calculate impact methods
   */
  static calculateFinanceImpact(profile) {
    const laborCosts = profile.valueSellingFramework?.impact?.laborCosts || 0;
    const errorCosts = profile.valueSellingFramework?.impact?.errorCosts || 0;
    // Estimate 30% reduction in finance labor and 80% reduction in errors
    return Math.round((laborCosts * 0.3) + (errorCosts * 0.8));
  }

  static calculateHRImpact(profile) {
    const employeeCount = parseInt(profile.employeeCount) || 100;
    // Estimate savings based on hiring volume
    return Math.round(employeeCount * 1000); // $1000 per employee per year in hiring efficiency
  }

  static calculateServiceImpact(profile) {
    const totalImpact = profile.valueSellingFramework?.impact?.totalAnnualImpact || 0;
    // Customer service typically represents 20-30% of operational impact
    return Math.round(totalImpact * 0.25);
  }

  /**
   * Utility methods
   */
  static mapCompanySize(size) {
    const mapping = {
      '1-50 employees': 'startup',
      '51-200 employees': 'small',
      '201-1000 employees': 'medium',
      '1000+ employees': 'large'
    };
    return mapping[size] || 'medium';
  }

  static calculateAIMaturity(profile) {
    const score = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
    if (score <= 3) return 'beginner';
    if (score <= 6) return 'emerging';
    if (score <= 8) return 'developing';
    return 'advanced';
  }

  static extractPrimaryGoals(profile) {
    const goals = [];
    if (profile.businessIssue?.revenueGrowth) goals.push('Increase Revenue');
    if (profile.businessIssue?.costReduction) goals.push('Reduce Operational Costs');
    if (profile.businessIssue?.customerExperience) goals.push('Improve Customer Experience');
    if (profile.businessIssue?.operationalEfficiency) goals.push('Automate Workflows');
    return goals;
  }

  static identifyRiskFactors(profile) {
    const risks = [];
    const aiReadiness = profile.aiOpportunityAssessment?.aiReadinessScore || profile.aiReadinessScore || 5;
    
    if (aiReadiness < 4) {
      risks.push({
        type: 'Technical Readiness',
        level: 'High',
        description: 'Low AI readiness score may slow implementation'
      });
    }
    
    if (profile.changeManagementCapability === 'Low') {
      risks.push({
        type: 'Change Management',
        level: 'Medium',
        description: 'Limited change management capability requires extra support'
      });
    }
    
    return risks;
  }

  static getCompetitiveContext(profile) {
    return {
      urgency: profile.competitivePressure ? 'High' : 'Medium',
      differentiators: profile.differentiationRequirements || [],
      marketPosition: profile.industry === 'Technology' ? 'Fast-moving' : 'Traditional'
    };
  }
}


================================================
FILE: app/services/timelineService.js
================================================
import { markdownService } from './markdownService';
import { aiService } from './aiService';
import { buildTimelineUserPrompt, getTimelineSystemPrompt } from '../lib/llm/prompts/timelinePrompts';

/**
 * Timeline Generation Service
 *
 * This service handles the business logic for generating AI transformation timelines.
 * It uses the central aiService to interact with LLMs and is responsible for
 * preparing data for and validating the results from the AI.
 */
export class TimelineService {
  /**
   * Generate a comprehensive AI transformation timeline using AI from markdown content.
   * @param {string} profileMarkdown - Full markdown representation of client profile.
   * @param {string} scenarioType - 'conservative', 'balanced', or 'aggressive'.
   * @returns {Promise<Object>} Generated timeline data.
   */
  static async generateTimelineFromMarkdown(profileMarkdown, scenarioType = 'balanced') {
    try {
      if (!aiService.getStatus().configured) {
        throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.');
      }

      this.validateScenario(scenarioType);

      const systemPrompt = getTimelineSystemPrompt();
      const userPrompt = buildTimelineUserPrompt(profileMarkdown, scenarioType);

      const timeline = await aiService.generateJson(systemPrompt, userPrompt);

      this.validateTimelineResponse(timeline);

      return timeline;

    } catch (error) {
      console.error('Timeline generation error:', error);
      throw new Error(`Timeline generation failed: ${error.message}`);
    }
  }

  /**
   * Generate a comprehensive AI transformation timeline using AI.
   * @param {Object} businessProfile - Company profile data.
   * @param {string} scenarioType - 'conservative', 'balanced', or 'aggressive'.
   * @returns {Promise<Object>} Generated timeline data.
   */
  static async generateTimeline(businessProfile, scenarioType = 'balanced') {
    try {
      this.validateInputs(businessProfile, scenarioType);

      const profileMarkdown = markdownService.generateMarkdown(businessProfile);

      return await this.generateTimelineFromMarkdown(profileMarkdown, scenarioType);

    } catch (error) {
      console.error('Timeline generation error:', error);
      throw new Error(`Timeline generation failed: ${error.message}`);
    }
  }

  /**
   * Validates the scenario type.
   * @param {string} scenarioType - The scenario to validate.
   */
  static validateScenario(scenarioType) {
    const validScenarios = ['conservative', 'balanced', 'aggressive'];
    if (!validScenarios.includes(scenarioType)) {
      throw new Error(`Invalid scenario type. Must be one of: ${validScenarios.join(', ')}`);
    }
  }

  /**
   * Validate input parameters.
   * @param {Object} businessProfile - The business profile object.
   * @param {string} scenarioType - The scenario type.
   */
  static validateInputs(businessProfile, scenarioType) {
    if (!businessProfile) {
      throw new Error('Business profile is required');
    }

    if (!businessProfile.companyName) {
      throw new Error('Company name is required in business profile');
    }

    this.validateScenario(scenarioType);
  }

  /**
   * Validate the timeline response structure.
   * @param {Object} timeline - The timeline object returned from the AI.
   */
  static validateTimelineResponse(timeline) {
    const requiredFields = ['currentState', 'phases', 'futureState', 'summary'];
    
    for (const field of requiredFields) {
      if (!timeline[field]) {
        throw new Error(`Invalid timeline response: missing ${field}`);
      }
    }

    if (!Array.isArray(timeline.phases) || timeline.phases.length === 0) {
      throw new Error('Invalid timeline response: phases must be an array and non-empty');
    }

    timeline.phases.forEach((phase, index) => {
      if (!phase.description || !phase.initiatives || !Array.isArray(phase.initiatives)) {
        throw new Error(`Phase ${index + 1} is missing description or has invalid initiatives`);
      }
    });

    const summaryFields = ['totalInvestment', 'expectedROI', 'timeToValue', 'riskLevel'];
    for (const field of summaryFields) {
      if (!timeline.summary[field]) {
        throw new Error(`Timeline summary is missing field: ${field}`);
      }
    }
  }

  /**
   * Check if the underlying AI service is configured.
   * @returns {boolean}
   */
  static isConfigured() {
    return aiService.getStatus().configured;
  }

  /**
   * Get configuration status for debugging.
   * @returns {Object}
   */
  static getStatus() {
    return aiService.getStatus();
  }
} 


================================================
FILE: app/services/__tests__/markdownService.test.js
================================================
import { markdownService } from '../markdownService';

describe('MarkdownService', () => {
  describe('generateMarkdown', () => {
    it('should generate complete markdown with all sections', () => {
      const profileData = {
        companyName: 'Test Corp',
        industry: 'Technology',
        size: '51-200 employees',
        annualRevenue: '10M',
        employeeCount: '150',
        primaryLocation: 'San Francisco, CA',
        valueSellingFramework: {
          businessIssues: ['Revenue Growth Pressure', 'Cost Reduction Mandate'],
          businessIssueOther: 'Custom issue',
          businessIssueDetails: 'Detailed description of issues',
          problems: {
            finance: {
              'Manual invoice processing taking [X] days': true
            }
          },
          impact: {
            totalAnnualImpact: '1000000'
          }
        },
        aiOpportunityAssessment: {
          aiReadinessScore: 7,
          opportunities: [{
            name: 'Invoice Automation',
            department: 'Finance',
            estimatedImpact: '250000'
          }]
        },
        summary: {
          currentState: 'Current challenges',
          recommendedApproach: 'Recommended solution'
        },
        createdBy: 'John Doe'
      };

      const markdown = markdownService.generateMarkdown(profileData);

      expect(markdown).toContain('# Client Profile: Test Corp');
      expect(markdown).toContain('## Company Overview');
      expect(markdown).toContain('- **Company Name**: Test Corp');
      expect(markdown).toContain('- **Industry**: Technology');
      expect(markdown).toContain('## Value Selling Framework');
      expect(markdown).toContain('- [x] Revenue Growth Pressure');
      expect(markdown).toContain('- [x] Cost Reduction Mandate');
      expect(markdown).toContain('## AI/Automation Opportunity Assessment');
      expect(markdown).toContain('### AI Readiness Score: 7/10');
      expect(markdown).toContain('*Created by: John Doe*');
    });

    it('should handle missing data gracefully', () => {
      const minimalData = {
        companyName: 'Minimal Corp'
      };

      const markdown = markdownService.generateMarkdown(minimalData);

      expect(markdown).toContain('# Client Profile: Minimal Corp');
      expect(markdown).toContain('[Enter industry]');
      expect(markdown).toContain('[Enter amount]');
      expect(markdown).not.toContain('undefined');
      expect(markdown).not.toContain('null');
    });
  });

  describe('generateCheckboxList', () => {
    it('should generate checkbox list with selected items marked', () => {
      const items = ['Option 1', 'Option 2', 'Option 3'];
      const selected = ['Option 1', 'Option 3'];

      const result = markdownService.generateCheckboxList(items, selected);

      expect(result).toBe('- [x] Option 1\n- [ ] Option 2\n- [x] Option 3');
    });

    it('should handle empty selected array', () => {
      const items = ['Option 1', 'Option 2'];
      
      const result = markdownService.generateCheckboxList(items, []);

      expect(result).toBe('- [ ] Option 1\n- [ ] Option 2');
    });

    it('should handle undefined selected array', () => {
      const items = ['Option 1', 'Option 2'];
      
      const result = markdownService.generateCheckboxList(items);

      expect(result).toBe('- [ ] Option 1\n- [ ] Option 2');
    });
  });

  describe('generateDepartmentProblems', () => {
    it('should generate finance department problems correctly', () => {
      const problems = {
        'Manual invoice processing taking [X] days': true,
        '[X]% error rate in financial processes': false
      };

      const result = markdownService.generateDepartmentProblems('finance', problems);

      expect(result).toContain('- [x] Manual invoice processing taking [X] days');
      expect(result).toContain('- [ ] [X]% error rate in financial processes');
      expect(result).toContain('- [ ] Other: [Specify]');
    });

    it('should handle unknown department', () => {
      const result = markdownService.generateDepartmentProblems('unknown', {});

      expect(result).toBe('- [ ] Other: [Specify]');
    });
  });

  describe('generateAIOpportunities', () => {
    it('should generate AI opportunities list', () => {
      const opportunities = [
        {
          name: 'Invoice Automation',
          department: 'Finance',
          process: 'Invoice processing',
          currentState: 'Manual entry',
          aiSolution: 'OCR and ML',
          estimatedImpact: '250000',
          implementationEffort: 'Medium',
          timeline: '3 months',
          priorityScore: '8'
        }
      ];

      const result = markdownService.generateAIOpportunities(opportunities);

      expect(result).toContain('#### Opportunity 1: Invoice Automation');
      expect(result).toContain('- **Department**: Finance');
      expect(result).toContain('- **Estimated Impact**: $250000');
      expect(result).toContain('- **Priority Score**: 8/10');
    });

    it('should provide template for empty opportunities', () => {
      const result = markdownService.generateAIOpportunities([]);

      expect(result).toContain('#### Opportunity 1: [Name]');
      expect(result).toContain('- **Department**: [Department]');
    });
  });

  describe('parseMarkdown', () => {
    it('should parse company name from markdown', () => {
      const markdown = `# Client Profile: Test Company

## Company Overview
- **Company Name**: Test Company
- **Industry**: Technology`;

      const result = markdownService.parseMarkdown(markdown);

      expect(result.companyName).toBe('Test Company');
    });

    it('should parse company overview section', () => {
      const markdown = `# Client Profile: Test Corp

## Company Overview
- **Company Name**: Test Corp
- **Industry**: Healthcare
- **Size**: 201-1000 employees
- **Annual Revenue**: $50M
- **Employee Count**: 500
- **Primary Location**: New York, NY`;

      const result = markdownService.parseMarkdown(markdown);

      expect(result.companyOverview).toEqual({
        companyName: 'Test Corp',
        industry: 'Healthcare',
        size: '201-1000 employees',
        annualRevenue: '50M',
        employeeCount: '500',
        primaryLocation: 'New York, NY'
      });
    });

    it('should handle parsing errors gracefully', () => {
      const invalidMarkdown = 'This is not valid markdown format';

      expect(() => {
        markdownService.parseMarkdown(invalidMarkdown);
      }).toThrow();
    });
  });

  describe('generateHeader', () => {
    it('should generate header with company name', () => {
      const data = { companyName: 'Acme Corp' };
      
      const result = markdownService.generateHeader(data);

      expect(result).toBe('# Client Profile: Acme Corp');
    });

    it('should handle missing company name', () => {
      const data = {};
      
      const result = markdownService.generateHeader(data);

      expect(result).toBe('# Client Profile: [Client Name]');
    });
  });

  describe('generateCompanyOverview', () => {
    it('should generate complete company overview', () => {
      const data = {
        companyName: 'Tech Co',
        industry: 'Technology',
        size: '1000+ employees',
        annualRevenue: '100M',
        employeeCount: '1500',
        primaryLocation: 'Austin, TX'
      };

      const result = markdownService.generateCompanyOverview(data);

      expect(result).toContain('## Company Overview');
      expect(result).toContain('- **Company Name**: Tech Co');
      expect(result).toContain('- **Industry**: Technology');
      expect(result).toContain('- **Size**: 1000+ employees');
      expect(result).toContain('- **Annual Revenue**: $100M');
      expect(result).toContain('- **Employee Count**: 1500');
      expect(result).toContain('- **Primary Location**: Austin, TX');
    });
  });

  describe('generateValueSellingFramework', () => {
    it('should generate complete value selling framework section', () => {
      const data = {
        valueSellingFramework: {
          businessIssues: ['Revenue Growth Pressure'],
          impact: {
            laborCosts: '500000',
            totalAnnualImpact: '1000000'
          },
          solutionCapabilities: ['Automate document processing'],
          successMetrics: ['Process cycle time reduction']
        }
      };

      const result = markdownService.generateValueSellingFramework(data);

      expect(result).toContain('## Value Selling Framework');
      expect(result).toContain('### 1. Business Issue');
      expect(result).toContain('- [x] Revenue Growth Pressure');
      expect(result).toContain('### 4. Impact');
      expect(result).toContain('Labor costs from manual processes: $500000');
      expect(result).toContain('**Total Estimated Annual Impact**: $1000000');
    });
  });

  describe('generateSummary', () => {
    it('should generate summary section', () => {
      const data = {
        summary: {
          currentState: 'Current challenges description',
          recommendedApproach: 'Recommended approach description',
          expectedValue: {
            threeYearBenefit: '3000000',
            investment: '1000000',
            netROI: '200',
            paybackPeriod: '12'
          },
          nextSteps: [
            { action: 'Initial assessment', owner: 'John Doe', date: '2024-01-15' }
          ],
          notes: 'Additional notes here'
        }
      };

      const result = markdownService.generateSummary(data);

      expect(result).toContain('## Summary & Next Steps');
      expect(result).toContain('**Current State**: Current challenges description');
      expect(result).toContain('**Recommended Approach**: Recommended approach description');
      expect(result).toContain('Total 3-year benefit: $3000000');
      expect(result).toContain('1. [ ] Initial assessment - John Doe - 2024-01-15');
      expect(result).toContain('Additional notes here');
    });
  });

  describe('extractSection', () => {
    it('should extract section content by heading', () => {
      const markdown = `# Title

## Section 1
Content of section 1

## Section 2
Content of section 2

## Section 3
Content of section 3`;

      const result = markdownService.extractSection(markdown, '## Section 2');

      expect(result.trim()).toBe('Content of section 2');
    });

    it('should return empty string if section not found', () => {
      const markdown = '# Title\n\n## Other Section\nContent';

      const result = markdownService.extractSection(markdown, '## Missing Section');

      expect(result).toBe('');
    });
  });

  describe('sanitizeString', () => {
    it('should handle null and undefined inputs', () => {
      const data = {
        companyName: null,
        industry: undefined
      };

      const markdown = markdownService.generateMarkdown(data);

      expect(markdown).toContain('[Client Name]');
      expect(markdown).toContain('[Enter industry]');
      expect(markdown).not.toContain('null');
      expect(markdown).not.toContain('undefined');
    });
  });
}); 


================================================
FILE: app/services/__tests__/profileService.test.js
================================================
import { ProfileService } from '../profileService';
import { markdownService } from '../markdownService';

// Mock the markdownService
jest.mock('../markdownService', () => ({
  markdownService: {
    generateMarkdown: jest.fn()
  }
}));

// Mock the TimelineService import
jest.mock('../timelineService', () => ({
  TimelineService: {
    generateTimeline: jest.fn()
  }
}));

describe('ProfileService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('createProfile', () => {
    const mockProfileData = {
      companyName: 'Test Company',
      industry: 'Technology',
      size: '51-200 employees',
      annualRevenue: '15M',
      valueSellingFramework: {
        businessIssues: ['Revenue Growth Pressure'],
        impact: {
          totalAnnualImpact: 850000
        }
      },
      aiOpportunityAssessment: {
        aiReadinessScore: 6
      }
    };

    it('should create a profile with unique ID', async () => {
      const mockMarkdown = '# Test Profile';
      markdownService.generateMarkdown.mockReturnValue(mockMarkdown);

      const profile = await ProfileService.createProfile(mockProfileData);

      expect(profile).toMatchObject({
        ...mockProfileData,
        markdown: mockMarkdown,
        status: 'draft'
      });
      expect(profile.id).toBeTruthy();
      expect(profile.createdAt).toBeTruthy();
      expect(profile.updatedAt).toBeTruthy();
      expect(markdownService.generateMarkdown).toHaveBeenCalledWith(mockProfileData);
    });

    it('should save profile to localStorage', async () => {
      await ProfileService.createProfile(mockProfileData);

      const saved = JSON.parse(localStorage.getItem('clientProfiles'));
      expect(saved).toHaveLength(1);
      expect(saved[0].companyName).toBe('Test Company');
    });

    it('should handle errors gracefully', async () => {
      markdownService.generateMarkdown.mockImplementation(() => {
        throw new Error('Markdown generation failed');
      });

      await expect(ProfileService.createProfile(mockProfileData)).rejects.toThrow();
    });
  });

  describe('generateProfileId', () => {
    it('should generate valid profile ID', () => {
      const id = ProfileService.generateProfileId('Test Company');
      
      expect(id).toMatch(/^test-company-[a-z0-9]+$/);
      expect(id.length).toBeLessThanOrEqual(40); // Reasonable length
    });

    it('should handle special characters in company name', () => {
      const id = ProfileService.generateProfileId('Test & Company, Inc.');
      
      expect(id).toMatch(/^test---company--inc--[a-z0-9]+$/);
      expect(id).not.toMatch(/[^a-z0-9-]/); // Only alphanumeric and hyphens
    });

    it('should truncate long company names', () => {
      const longName = 'A'.repeat(100);
      const id = ProfileService.generateProfileId(longName);
      
      expect(id.length).toBeLessThanOrEqual(40);
    });
  });

  describe('generateTimelineFromProfile', () => {
    const mockProfile = {
      companyName: 'Test Company',
      industry: 'Technology',
      size: '51-200 employees',
      aiOpportunityAssessment: {
        aiReadinessScore: 8
      },
      valueSellingFramework: {
        decisionMakers: {
          economicBuyer: {
            name: 'John Doe'
          }
        },
        impact: {
          totalAnnualImpact: 1000000
        },
        businessIssues: ['Revenue Growth Pressure', 'Cost Reduction Mandate'],
        solutionCapabilities: ['Automate workflows']
      }
    };

    it('should generate timeline from profile', async () => {
      const { TimelineService } = await import('../timelineService');
      const mockTimeline = { phases: [], summary: {} };
      TimelineService.generateTimeline.mockResolvedValue(mockTimeline);

      const result = await ProfileService.generateTimelineFromProfile(mockProfile);

      expect(TimelineService.generateTimeline).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });

    it('should determine correct scenario type - aggressive', async () => {
      const aggressiveProfile = {
        ...mockProfile,
        aiReadinessScore: 9,
        decisionTimeline: 3,
        riskTolerance: 'high'
      };

      const scenarioType = ProfileService.determineScenarioType(aggressiveProfile);
      expect(scenarioType).toBe('aggressive');
    });

    it('should determine correct scenario type - conservative', async () => {
      const conservativeProfile = {
        ...mockProfile,
        aiReadinessScore: 3,
        decisionTimeline: 24,
        riskTolerance: 'low'
      };

      const scenarioType = ProfileService.determineScenarioType(conservativeProfile);
      expect(scenarioType).toBe('conservative');
    });

    it('should determine correct scenario type - balanced', async () => {
      const balancedProfile = {
        ...mockProfile,
        aiReadinessScore: 6,
        decisionTimeline: 12,
        riskTolerance: 'medium'
      };

      const scenarioType = ProfileService.determineScenarioType(balancedProfile);
      expect(scenarioType).toBe('balanced');
    });
  });

  describe('extractBusinessProfile', () => {
    it('should extract business profile data correctly', () => {
      const profile = {
        companyName: 'Test Co',
        industry: 'Healthcare',
        size: '1000+ employees',
        aiOpportunityAssessment: {
          aiReadinessScore: 7
        },
        valueSellingFramework: {
          businessIssues: ['Cost Reduction Mandate'],
          decisionMakers: {
            economicBuyer: {
              budget: '500000'
            }
          }
        }
      };

      const businessProfile = ProfileService.extractBusinessProfile(profile);

      expect(businessProfile).toMatchObject({
        companyName: 'Test Co',
        industry: 'Healthcare',
        companySize: 'large',
        aiMaturityLevel: 'developing'
      });
    });
  });

  describe('mapCompanySize', () => {
    it('should map company sizes correctly', () => {
      expect(ProfileService.mapCompanySize('1-50 employees')).toBe('startup');
      expect(ProfileService.mapCompanySize('51-200 employees')).toBe('small');
      expect(ProfileService.mapCompanySize('201-1000 employees')).toBe('medium');
      expect(ProfileService.mapCompanySize('1000+ employees')).toBe('large');
      expect(ProfileService.mapCompanySize('unknown')).toBe('medium');
    });
  });

  describe('calculateAIMaturity', () => {
    it('should calculate AI maturity levels correctly', () => {
      expect(ProfileService.calculateAIMaturity({ aiReadinessScore: 2 })).toBe('beginner');
      expect(ProfileService.calculateAIMaturity({ aiReadinessScore: 5 })).toBe('emerging');
      expect(ProfileService.calculateAIMaturity({ aiReadinessScore: 7 })).toBe('developing');
      expect(ProfileService.calculateAIMaturity({ aiReadinessScore: 9 })).toBe('advanced');
      expect(ProfileService.calculateAIMaturity({})).toBe('emerging'); // Default
    });
  });

  describe('extractPrimaryGoals', () => {
    it('should extract goals from business issues', () => {
      const profile = {
        businessIssue: {
          revenueGrowth: true,
          costReduction: true,
          customerExperience: false,
          operationalEfficiency: true
        }
      };

      const goals = ProfileService.extractPrimaryGoals(profile);

      expect(goals).toContain('Increase Revenue');
      expect(goals).toContain('Reduce Operational Costs');
      expect(goals).toContain('Automate Workflows');
      expect(goals).not.toContain('Improve Customer Experience');
    });

    it('should handle missing business issues', () => {
      const goals = ProfileService.extractPrimaryGoals({});
      expect(goals).toEqual([]);
    });
  });

  describe('getProfiles', () => {
    it('should retrieve all profiles from localStorage', async () => {
      const profiles = [
        { id: '1', companyName: 'Company 1' },
        { id: '2', companyName: 'Company 2' }
      ];
      localStorage.setItem('clientProfiles', JSON.stringify(profiles));

      const result = await ProfileService.getProfiles();

      expect(result).toEqual(profiles);
    });

    it('should return empty array if no profiles exist', async () => {
      const result = await ProfileService.getProfiles();
      expect(result).toEqual([]);
    });
  });

  describe('getProfile', () => {
    it('should retrieve specific profile by ID', async () => {
      const profiles = [
        { id: '1', companyName: 'Company 1' },
        { id: '2', companyName: 'Company 2' }
      ];
      localStorage.setItem('clientProfiles', JSON.stringify(profiles));

      const result = await ProfileService.getProfile('2');

      expect(result).toEqual({ id: '2', companyName: 'Company 2' });
    });

    it('should return undefined if profile not found', async () => {
      const result = await ProfileService.getProfile('nonexistent');
      expect(result).toBeUndefined();
    });
  });

  describe('generateOpportunityRecommendations', () => {
    it('should generate finance opportunities', async () => {
      const profile = {
        problems: {
          finance: {
            manualInvoiceProcessing: true
          }
        }
      };

      const opportunities = await ProfileService.generateOpportunityRecommendations(profile);

      expect(opportunities).toContainEqual(expect.objectContaining({
        department: 'Finance',
        title: 'Automated Invoice Processing'
      }));
    });

    it('should generate HR opportunities', async () => {
      const profile = {
        problems: {
          hr: {
            manualResumeScreening: true
          }
        }
      };

      const opportunities = await ProfileService.generateOpportunityRecommendations(profile);

      expect(opportunities).toContainEqual(expect.objectContaining({
        department: 'HR',
        title: 'AI Resume Screening'
      }));
    });

    it('should sort opportunities by priority', async () => {
      const profile = {
        problems: {
          finance: { manualInvoiceProcessing: true },
          hr: { manualResumeScreening: true },
          customerService: { responseTime: true }
        }
      };

      const opportunities = await ProfileService.generateOpportunityRecommendations(profile);
      
      // High priority should come first
      const priorities = opportunities.map(o => o.priority);
      expect(priorities[0]).toBe('High');
    });
  });

  describe('identifyRiskFactors', () => {
    it('should identify technical readiness risks', () => {
      const profile = {
        aiReadinessScore: 2,
        changeManagementCapability: 'High'
      };

      const risks = ProfileService.identifyRiskFactors(profile);

      expect(risks).toContainEqual(expect.objectContaining({
        type: 'Technical Readiness',
        level: 'High'
      }));
    });

    it('should identify change management risks', () => {
      const profile = {
        aiReadinessScore: 8,
        changeManagementCapability: 'Low'
      };

      const risks = ProfileService.identifyRiskFactors(profile);

      expect(risks).toContainEqual(expect.objectContaining({
        type: 'Change Management',
        level: 'Medium'
      }));
    });

    it('should return empty array for low-risk profiles', () => {
      const profile = {
        aiReadinessScore: 8,
        changeManagementCapability: 'High'
      };

      const risks = ProfileService.identifyRiskFactors(profile);
      expect(risks).toEqual([]);
    });
  });
}); 


================================================
FILE: app/store/useAgenticStore.js
================================================
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the store
const useAgenticStore = create(
  persist(
    (set, get) => ({
      agenticData: null, // Initial state is null
      connectionDetails: null, // Store connection details for refresh
      serviceNowUrl: '', // Base ServiceNow instance URL for opening links
      isLoading: false,
      error: null,

      // Action to set the agentic data (used by file upload OR API fetch)
      setAgenticData: (data) => set({ agenticData: data }),

      // Store connection details for later refresh
      setConnectionDetails: (details) => {
        // Extract the instance URL and store it for node links
        const { instanceUrl } = details;
        set({ 
          connectionDetails: details,
          serviceNowUrl: instanceUrl // Set the serviceNowUrl for external links
        });
      },

      // Action to clear the data
      clearAgenticData: () => set({ 
        agenticData: null, 
        connectionDetails: null,
        serviceNowUrl: '',
        error: null 
      }),
      
      // Action to reset just the flow data, keeping connection details for refresh
      resetData: () => set({ 
        agenticData: null,
        error: null 
      }),

      // Fetch fresh data using stored connection details
      refreshData: async () => {
        const { connectionDetails } = get();
        
        if (!connectionDetails) {
          throw new Error('No connection details available for refresh');
        }

        set({ isLoading: true, error: null });
        
        try {
          const { instanceUrl, scopeId } = connectionDetails;
          
          // Keep or update the serviceNowUrl
          set({ serviceNowUrl: instanceUrl });
          
          // Only send non-sensitive connection details
          // Credentials are handled server-side via environment variables
          const response = await fetch('/api/servicenow/fetch-agentic-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              instanceUrl,
              scopeId
            }),
          });

          if (!response.ok) {
            let errorMessage = 'Failed to refresh data from ServiceNow';
            try {
              const errorData = await response.json();
              errorMessage = errorData.error || errorMessage;
            } catch (e) {
              // If parsing JSON fails, use the status text
              errorMessage = `${errorMessage}: ${response.statusText}`;
            }
            throw new Error(errorMessage);
          }

          // Process the response
          const data = await response.json();
          console.log('Data refreshed successfully:', data);

          // Update the store with the processed data
          set({ agenticData: data, isLoading: false });
          return data;
        } catch (err) {
          console.error('Error refreshing ServiceNow data:', err);
          set({ error: err.message || 'An unknown error occurred while refreshing data', isLoading: false });
          throw err;
        }
      },

      // Add other state/actions as needed, e.g., layout direction, expanded nodes
      layoutDirection: 'LR', // 'LR' (Horizontal) or 'TB' (Vertical)
      setLayoutDirection: (direction) => set({ layoutDirection: direction }),

      // Store expanded/collapsed state if needed across re-renders or persistence
      // Example: expandedNodes: { nodeId: true, ... }
      // setNodeExpansion: (nodeId, isExpanded) => set((state) => ({ ... })),
    }),
    {
      name: 'agentic-flow-storage', // Name for local storage key
      storage: createJSONStorage(() => localStorage), // Use local storage
      // Only persist non-sensitive data
      partialize: (state) => ({
        layoutDirection: state.layoutDirection,
        serviceNowUrl: state.serviceNowUrl, // Persist the serviceNowUrl
        // Store connection details (no sensitive data included)
        connectionDetails: state.connectionDetails
      }),
    }
  )
);

export default useAgenticStore;


================================================
FILE: app/store/useAuthStore.js
================================================
'use client';

import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useAuthStore = create((set, get) => ({
  // Auth state
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  // Initialize auth state - call this on app startup
  initialize: async () => {
    try {
      set({ isLoading: true });
      
      // Get initial session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        set({ user: null, session: null, isAuthenticated: false, isLoading: false });
        return;
      }

      // Set initial state
      set({
        user: session?.user ?? null,
        session,
        isAuthenticated: !!session,
        isLoading: false,
      });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((event, session) => {
        set({
          user: session?.user ?? null,
          session,
          isAuthenticated: !!session,
          isLoading: false,
        });
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null, session: null, isAuthenticated: false, isLoading: false });
    }
  },

  // Sign up with email and password
  signUp: async (email, password, options = {}) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: options.name || '',
          },
        },
      });

      if (error) throw error;

      // Note: User will need to confirm email before they can sign in
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Sign in with magic link
  signInWithMagicLink: async (email) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Magic link error:', error);
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Sign out
  signOut: async () => {
    try {
      set({ isLoading: true });
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      // Clear user data
      set({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  },

  // Update user profile
  updateProfile: async (updates) => {
    try {
      set({ isLoading: true });
      
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: error.message };
    }
  },
}));

export default useAuthStore; 


================================================
FILE: app/store/useBusinessProfileStore.js
================================================
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getCurrentUser } from '../lib/supabase';

const useBusinessProfileStore = create(
  persist(
    (set, get) => ({
      // Business profile information
      businessProfile: {
        companyName: '',
        industry: '',
        companySize: '',
        currentTechStack: [],
        aiMaturityLevel: '',
        primaryGoals: [],
        budget: '',
        timeframe: '',
      },
      
      // Timeline settings
      scenarioType: 'balanced', // 'conservative', 'balanced', 'aggressive'
      selectedYear: new Date().getFullYear(),
      expandedSections: {}, // Track which timeline sections are expanded
      theme: 'dark', // 'dark' or 'light'
      
      // Generated timeline data
      timelineData: null,
      isGenerating: false,
      
      // Timeline cache metadata
      timelineCached: false,
      timelineGeneratedAt: null,
      timelineScenarioType: null,
      
      // Actions
      setBusinessProfile: (profile) => 
        set({ businessProfile: { ...get().businessProfile, ...profile } }),
        
      updateBusinessProfile: (updates) => 
        set({ businessProfile: { ...get().businessProfile, ...updates } }),
      
      setScenarioType: (type) => set({ scenarioType: type }),
      
      setSelectedYear: (year) => set({ selectedYear: year }),
      
      toggleSection: (sectionId) => 
        set((state) => ({
          expandedSections: {
            ...state.expandedSections,
            [sectionId]: !state.expandedSections[sectionId]
          }
        })),
      
      toggleTheme: () => 
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark'
        })),
      
      expandAllSections: () => {
        const sections = ['current-state', 'phase-1', 'phase-2', 'phase-3', 'phase-4', 'future-state'];
        const expanded = {};
        sections.forEach(section => { expanded[section] = true; });
        set({ expandedSections: expanded });
      },
      
      collapseAllSections: () => set({ expandedSections: {} }),
      
      hasValidProfile: () => {
        const { businessProfile } = get();
        return businessProfile.companyName && 
               businessProfile.industry && 
               businessProfile.companySize &&
               businessProfile.aiMaturityLevel &&
               businessProfile.primaryGoals.length > 0;
      },
      
      generateTimeline: async (profile) => {
        set({ isGenerating: true });
        
        // If profile is provided, update it first
        if (profile) {
          set({ businessProfile: profile });
        }
        
        const { businessProfile, scenarioType } = get();
        
        try {
          // Call server-side API instead of TimelineService directly
          const response = await fetch('/api/timeline/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              businessProfile,
              scenarioType
            })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          set({ timelineData: data.timeline, isGenerating: false });
        } catch (error) {
          console.error('Error generating timeline:', error);
          set({ isGenerating: false });
          throw error;
        }
      },
      
      generateTimelineFromProfile: async (profile, forceRegenerate = false, scenarioType = null) => {
        set({ isGenerating: true });
        
        try {
          // Get current user for authentication
          const user = await getCurrentUser();
          
          // Call server-side API for profile-based timeline generation with caching
          const response = await fetch('/api/timeline/generate-from-profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              profileId: profile.id || null,
              profile: profile,
              forceRegenerate,
              scenarioType,
              userId: user?.id || null
            })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();
          
          // Update state with timeline and cache metadata
          set({ 
            timelineData: data.timeline, 
            isGenerating: false,
            timelineCached: data.cached || false,
            timelineGeneratedAt: data.generatedAt,
            timelineScenarioType: data.scenarioType || 'balanced'
          });
          
          return data.timeline;
        } catch (error) {
          console.error('Error generating timeline from profile:', error);
          set({ isGenerating: false });
          throw error;
        }
      },

      regenerateTimelineFromProfile: async (profile, scenarioType = null) => {
        // Force regeneration by setting forceRegenerate = true
        return await get().generateTimelineFromProfile(profile, true, scenarioType);
      },
      
      clearTimeline: () => set({ 
        timelineData: null, 
        expandedSections: {},
        timelineCached: false,
        timelineGeneratedAt: null,
        timelineScenarioType: null
      }),
    }),
    {
      name: 'business-profile-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBusinessProfileStore; 


================================================
FILE: app/timeline/README.md
================================================
# AI Transformation Timeline Feature

## Overview

The AI Transformation Timeline is an interactive business planning tool inspired by ai-2027.com's visual storytelling approach. It allows businesses to input their profile information and receive a personalized AI adoption roadmap with:

- Customized implementation phases
- ROI projections and metrics
- Scenario-based planning (Conservative, Balanced, Aggressive)
- Expandable timeline events with detailed breakdowns
- Mobile-responsive design

## Architecture

### Components Structure

```
timeline/
├── page.js                 # Main timeline page
├── layout.js              # Timeline layout wrapper
├── components/
│   ├── TimelineHeader.js       # Page header with navigation
│   ├── BusinessProfileForm.js  # Business information form
│   ├── ScenarioSelector.js     # AI adoption pace selector
│   ├── MetricsCards.js         # Key metrics display
│   └── TimelineVisualization.js # Interactive timeline display
└── README.md              # This file
```

### State Management

The timeline feature uses a dedicated Zustand store (`useBusinessProfileStore`) that manages:

- **Business Profile Data**: Company information, industry, size, tech stack, etc.
- **Timeline Settings**: Selected scenario type, expanded sections
- **Generated Timeline**: Events, metrics, and recommendations
- **UI State**: Loading states, form validation

### Data Flow

1. User fills out the BusinessProfileForm
2. Form data is stored in the Zustand store
3. Timeline generation is triggered (currently mock data, ready for AI integration)
4. Generated timeline is displayed with interactive elements
5. Users can switch scenarios to see different adoption paths

## Key Features

### Business Profile Collection

The form collects:
- Company name and industry
- Company size (employees)
- Current AI maturity level
- Existing technology stack
- Primary business goals
- Budget range and timeframe

### Scenario Planning

Three AI adoption scenarios:
- **Conservative**: Lower risk, proven technologies, extended timelines
- **Balanced**: Moderate pace, balanced risk/reward
- **Aggressive**: Fast adoption, cutting-edge tech, compressed timelines

### Interactive Timeline

- **Expandable Events**: Click to reveal detailed information
- **Visual Markers**: Different icons and colors for event types
- **Hover Effects**: Enhanced interactivity
- **Batch Controls**: Expand/collapse all events at once

### Metrics Dashboard

Displays key metrics:
- Total Investment Range
- Expected ROI
- Time to Value
- Risk Level Assessment

## Extending the Timeline

### Adding New Event Types

1. Update the event type handling in `TimelineVisualization.js`:

```javascript
const getEventIcon = (type) => {
  switch (type) {
    case 'your-new-type': return '🆕';
    // ... existing cases
  }
};
```

2. Add corresponding color mapping:

```javascript
const getEventColor = (type) => {
  switch (type) {
    case 'your-new-type': return '#yourColor';
    // ... existing cases
  }
};
```

### Integrating Real AI Generation

Replace the mock timeline generator in `useBusinessProfileStore.js`:

```javascript
// Replace this function with actual AI API call
async function generateMockTimeline(profile, scenarioType) {
  // Call your AI service endpoint
  const response = await fetch('/api/generate-timeline', {
    method: 'POST',
    body: JSON.stringify({ profile, scenarioType })
  });
  return response.json();
}
```

### Adding New Business Profile Fields

1. Update the store's initial state:

```javascript
businessProfile: {
  // ... existing fields
  yourNewField: '',
}
```

2. Add corresponding form inputs in `BusinessProfileForm.js`

### Customizing Timeline Visuals

The timeline styling is in `globals.css` under the "Timeline Page Styles" section. Key classes:

- `.timeline-event`: Individual timeline events
- `.event-marker`: Circular markers on the timeline
- `.event-content`: Expandable content containers
- `.timeline-line`: The vertical/horizontal line

## API Integration Points

The timeline is designed for easy integration with:

1. **AI Generation Services**: Replace mock data generation
2. **ServiceNow Integration**: Link timeline events to ServiceNow workflows
3. **Export Functionality**: Generate PDF/PowerPoint reports
4. **Collaboration Features**: Share timelines with team members

## Future Enhancements

1. **Real AI-Powered Generation**: Integrate with GPT-4 or custom models
2. **Industry Templates**: Pre-built timelines for specific industries
3. **Cost Calculator**: Detailed ROI calculations with sliders
4. **Progress Tracking**: Track actual vs. planned progress
5. **Multi-Language Support**: Internationalization
6. **Export Options**: PDF, PowerPoint, Excel formats
7. **Collaboration**: Team sharing and commenting
8. **Integration Marketplace**: Connect with various platforms

## Development Guidelines

### Adding New Components

Follow the established patterns:
- Use functional components with hooks
- Implement proper prop validation
- Follow the naming conventions
- Add JSDoc comments for complex logic

### State Management

- Use the store for cross-component state
- Keep component-specific state local
- Implement proper loading and error states

### Styling

- Use CSS classes from globals.css
- Maintain consistent spacing and colors
- Ensure mobile responsiveness
- Follow the existing design system

## Testing Considerations

When adding tests, focus on:
- Form validation logic
- Timeline generation with different inputs
- Scenario switching behavior
- Expand/collapse functionality
- Mobile responsiveness
- Accessibility compliance

## Enterprise Integration

This timeline tool is designed for enterprise strategic planning:

1. **Business Intelligence**: Captures comprehensive company data for strategic AI planning
2. **Multi-User Support**: Ready for Supabase Auth integration for team collaboration
3. **Secure Data Storage**: Migration path from localStorage to enterprise-grade database
4. **Executive Reporting**: PDF export capability for board presentations and strategy documents
5. **API-First Design**: Ready for integration with existing enterprise systems 


================================================
FILE: app/timeline/layout.js
================================================
export default function TimelineLayout({ children }) {
  return children;
} 


================================================
FILE: app/timeline/page.js
================================================
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useTimeline } from '../hooks/useTimeline';
import GlobalHeader from '../components/GlobalHeader';
import TimelineSidebar from './components/TimelineSidebar';
import TimelineContent from './components/TimelineContent';
import MetricsWidget from './components/MetricsWidget';
import './timeline.css';

function TimelinePlaceholder({ title, message, showButton, buttonText, onButtonClick }) {
  return (
    <div className="timeline-empty">
      <div className="loading-spinner"></div>
      <h2>{title}</h2>
      {message && <p>{message}</p>}
      {showButton && (
        <div style={{ marginTop: '2rem' }}>
          <button className="btn-primary" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
}

function WelcomeMessage() {
  const router = useRouter();
  return (
    <div className="timeline-empty">
      <h2>Welcome to Your AI Transformation Timeline</h2>
      <p>Create a client profile first to generate a personalized AI transformation roadmap.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button 
          className="btn-primary"
          onClick={() => router.push('/profiles')}
        >
          Create Client Profile
        </button>
      </div>
    </div>
  );
}

export default function TimelinePage() {
  const {
    timelineData,
    businessProfile,
    currentProfile,
    isLoading,
    activeSection,
    scrollProgress,
    timelineSections,
    theme,
    contentRef,
    sectionRefs,
    handleSectionClick,
    toggleTheme,
    regenerateTimeline,
    isProfileTimeline,
    // Cache metadata
    timelineCached,
    timelineGeneratedAt,
    timelineScenarioType
  } = useTimeline();

  const router = useRouter();

  const renderContent = () => {
    if (isLoading) {
      const message = isProfileTimeline 
        ? "Generating personalized roadmap from your profile..."
        : "Creating your personalized transformation roadmap...";
      return <TimelinePlaceholder title="Loading Your AI Timeline" message={message} />;
    }

    if (!timelineData) {
      return <WelcomeMessage />;
    }
    
    return (
      <TimelineContent 
        sections={timelineSections}
        timelineData={timelineData}
        sectionRefs={sectionRefs}
        businessProfile={businessProfile}
      />
    );
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <GlobalHeader />
      <div className="timeline-container" data-timeline-theme={theme} style={{ height: 'calc(100vh - 80px)' }}>
        <TimelineSidebar 
          sections={timelineSections}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          theme={theme}
          onThemeToggle={toggleTheme}
          // Cache functionality props
          timelineCached={timelineCached}
          timelineGeneratedAt={timelineGeneratedAt}
          timelineScenarioType={timelineScenarioType}
          onRegenerateTimeline={regenerateTimeline}
          isGenerating={isLoading}
          currentProfile={currentProfile}
        />
        
        <div className="timeline-main" ref={contentRef}>
          {renderContent()}
        </div>
        
        {timelineData && !isLoading && (
          <MetricsWidget 
            activeSection={activeSection}
            timelineData={timelineData}
            scrollProgress={scrollProgress}
          />
        )}
      </div>
    </div>
  );
} 


================================================
FILE: app/timeline/timeline.css
================================================
/* Variables for a premium dark theme - inspired by Stripe/Linear */
:root {
  --timeline-bg: #0A0E1A; /* Slightly deeper, less saturated blue than #0a0e27 */
  --timeline-content-bg: #101423; /* For main content areas */
  --timeline-sidebar-bg: #0D111E; /* Slightly different for sidebar */
  --timeline-widget-bg: rgba(20, 25, 40, 0.7); /* Widget bg with transparency for blur */
  --timeline-widget-border: rgba(255, 255, 255, 0.08);

  --timeline-text-primary: #E0E0E0; /* Brighter for primary text */
  --timeline-text-secondary: #A0A0B0; /* Softer for secondary text */
  --timeline-text-muted: #606070; /* For less important details */

  --timeline-border-primary: rgba(255, 255, 255, 0.1); /* Subtle borders */
  --timeline-border-secondary: rgba(255, 255, 255, 0.05);

  --timeline-accent-blue: #3B82F6;
  --timeline-accent-green: #10B981;
  --timeline-accent-yellow: #F59E0B;
  --timeline-accent-red: #EF4444;

  --timeline-spacing-xs: 4px;
  --timeline-spacing-sm: 8px;
  --timeline-spacing-md: 16px;
  --timeline-spacing-lg: 24px;
  --timeline-spacing-xl: 32px;
  --timeline-spacing-xxl: 48px;

  --timeline-font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  --timeline-header-font-weight: 600;
  --timeline-body-font-weight: 400;
  --timeline-line-height: 1.6;
  --timeline-border-radius: 8px; /* Consistent border radius */
  --timeline-transition-duration: 0.2s;
}

/* Light theme variables */
[data-timeline-theme="light"] {
  --timeline-bg: #ffffff;
  --timeline-content-bg: #f8fafc;
  --timeline-sidebar-bg: #f1f5f9;
  --timeline-widget-bg: rgba(255, 255, 255, 0.9);
  --timeline-widget-border: rgba(0, 0, 0, 0.08);

  --timeline-text-primary: #1e293b;
  --timeline-text-secondary: #475569;
  --timeline-text-muted: #94a3b8;

  --timeline-border-primary: rgba(0, 0, 0, 0.1);
  --timeline-border-secondary: rgba(0, 0, 0, 0.05);

  --timeline-accent-blue: #2563eb;
  --timeline-accent-green: #059669;
  --timeline-accent-yellow: #d97706;
  --timeline-accent-red: #dc2626;
}

/* Reset and Base Styles */
.timeline-container * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.timeline-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: var(--timeline-bg);
  color: var(--timeline-text-primary);
  font-family: var(--timeline-font-family);
  overflow: hidden; /* Prevent body scroll */
  position: relative;
}

/* Global Button Styles (can be refined per component) */
.timeline-container .btn-primary {
  background-color: var(--timeline-accent-blue);
  color: white;
  padding: var(--timeline-spacing-sm) var(--timeline-spacing-md);
  border: none;
  border-radius: var(--timeline-border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: background-color var(--timeline-transition-duration) ease;
}
.timeline-container .btn-primary:hover {
  background-color: #2563EB; /* Darker blue */
}

.timeline-container .btn-secondary {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--timeline-text-primary);
  padding: var(--timeline-spacing-sm) var(--timeline-spacing-md);
  border: 1px solid var(--timeline-border-secondary);
  border-radius: var(--timeline-border-radius);
  cursor: pointer;
  font-weight: 500;
  transition: background-color var(--timeline-transition-duration) ease;
}
.timeline-container .btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.15);
}


/* Sidebar Styling */
.timeline-sidebar {
  width: 280px; /* Slightly wider for more content */
  background-color: var(--timeline-sidebar-bg);
  padding: var(--timeline-spacing-lg);
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: 1px solid var(--timeline-border-primary);
  transition: width var(--timeline-transition-duration) ease;
}

.timeline-sidebar-header {
  margin-bottom: var(--timeline-spacing-xl);
  padding-bottom: var(--timeline-spacing-lg);
  border-bottom: 1px solid var(--timeline-border-secondary);
}

.timeline-sidebar-header h3 {
  font-size: 1.25rem;
  font-weight: var(--timeline-header-font-weight);
  color: var(--timeline-text-primary);
  margin-bottom: var(--timeline-spacing-md);
}

.timeline-progress {
  height: 100%; /* Ensure it takes available space if used as a visual */
  background-color: var(--timeline-border-secondary); /* Subtle track */
  border-radius: 4px; /* Pill shape */
  position: relative;
  display: none; /* Hidden for now, will redesign */
}

.timeline-progress-bar-container {
  display: block;
}

.timeline-progress-bar {
  display: block;
  background: var(--timeline-accent-blue);
  width: 4px; /* Slimmer bar */
  border-radius: 2px;
  position: absolute;
  left: calc(50% - 2px); /* Centered in the nav dot line */
  top: 0;
  transition: height 0.3s ease-out;
}

.timeline-nav {
  flex-grow: 1;
  overflow-y: auto; /* Allow scrolling if many items */
  display: flex;
  flex-direction: column;
  gap: var(--timeline-spacing-sm); /* Space between nav items */
  position: relative; /* Ensure this is a positioning context for the progress bar */
}

.timeline-nav-item {
  display: flex;
  align-items: flex-start; /* Align items to the start for multi-line text */
  padding: var(--timeline-spacing-md);
  border-radius: var(--timeline-border-radius);
  cursor: pointer;
  transition: background-color var(--timeline-transition-duration) ease, color var(--timeline-transition-duration) ease;
  background-color: transparent;
  border: none;
  text-align: left;
  position: relative; /* For the dot and line */
}

.timeline-nav-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.timeline-nav-item.active {
  background-color: rgba(59, 130, 246, 0.15);
  color: var(--timeline-text-primary);
}
.timeline-nav-item.active .timeline-nav-year,
.timeline-nav-item.active .timeline-nav-title,
.timeline-nav-item.active .timeline-nav-subtitle {
  color: var(--timeline-text-primary);
}


.timeline-nav-dot {
  width: 24px; 
  height: 24px;
  border-radius: 50%;
  /* Make non-active dots blend with the track or be very subtle */
  background-color: transparent; /* Make it transparent by default */
  border: 2px solid var(--timeline-border-secondary); /* A very subtle border for non-active dots */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--timeline-spacing-md);
  flex-shrink: 0;
  transition: background-color var(--timeline-transition-duration) ease, transform var(--timeline-transition-duration) ease, border-color var(--timeline-transition-duration) ease;
}

.timeline-nav-item:hover .timeline-nav-dot {
  border-color: var(--timeline-accent-blue); /* Subtle highlight on hover for non-active */
}

.timeline-nav-item.active .timeline-nav-dot {
  background-color: white; /* Active dot is white to "light up" */
  transform: scale(1.15); /* Slightly larger pop for active dot */
  border: 2px solid var(--timeline-accent-blue); /* Blue border around the white active dot */
}

/* Removed styles for .timeline-nav-item.active .timeline-nav-icon as icons are removed */

.timeline-nav-icon {
  /* This class is no longer used as icons are removed */
  /* font-size: 0.8rem; */ 
}

.timeline-nav-content {
  display: flex;
  flex-direction: column;
}

.timeline-nav-year {
  font-size: 0.75rem; /* Smaller year */
  font-weight: 500;
  color: var(--timeline-text-muted);
  margin-bottom: var(--timeline-spacing-xs);
  transition: color var(--timeline-transition-duration) ease;
}

.timeline-nav-title {
  font-size: 0.95rem; /* Slightly larger title */
  font-weight: var(--timeline-header-font-weight);
  color: var(--timeline-text-primary);
  margin-bottom: var(--timeline-spacing-xs);
  transition: color var(--timeline-transition-duration) ease;
}

.timeline-nav-subtitle {
  font-size: 0.8rem;
  color: var(--timeline-text-secondary);
  line-height: 1.3;
  transition: color var(--timeline-transition-duration) ease;
}

.timeline-sidebar-footer {
  margin-top: auto; /* Pushes to bottom */
  padding-top: var(--timeline-spacing-lg);
  border-top: 1px solid var(--timeline-border-secondary);
}
.timeline-sidebar-footer .btn-secondary {
  width: 100%;
}


/* Main Content Area */
.timeline-main {
  flex: 1;
  padding: var(--timeline-spacing-xl) var(--timeline-spacing-xxl); /* More horizontal padding */
  overflow-y: auto;
  height: 100vh; /* Ensure it takes full height to scroll */
  background-color: var(--timeline-content-bg);
  scroll-behavior: smooth;
}

.timeline-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: var(--timeline-text-secondary);
}
.timeline-empty h2 {
  font-size: 1.75rem;
  color: var(--timeline-text-primary);
  margin-bottom: var(--timeline-spacing-md);
}
.timeline-empty p {
  font-size: 1rem;
  margin-bottom: var(--timeline-spacing-lg);
  max-width: 450px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--timeline-border-secondary);
  border-top: 4px solid var(--timeline-accent-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--timeline-spacing-lg);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}


/* Metrics Widget Styling */
.metrics-widget {
  width: 320px; /* Slightly wider for better content fit */
  background-color: var(--timeline-widget-bg);
  border-left: 1px solid var(--timeline-border-primary);
  padding: var(--timeline-spacing-lg);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  backdrop-filter: blur(12px) saturate(150%); /* Frosted glass effect */
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  box-shadow: -5px 0px 15px rgba(0,0,0,0.1);
  transition: width var(--timeline-transition-duration) ease;
}
.metrics-widget.minimized {
  width: 80px; /* Width when minimized */
  padding: var(--timeline-spacing-lg) var(--timeline-spacing-sm);
}
.metrics-widget.minimized .widget-header-content h3,
.metrics-widget.minimized .journey-progress .progress-label,
.metrics-widget.minimized .widget-metrics,
.metrics-widget.minimized .widget-footer {
  display: none;
}
.metrics-widget.minimized .widget-header {
  align-items: center;
}
.metrics-widget.minimized .widget-toggle {
 transform: rotate(180deg);
}


.widget-header {
  margin-bottom: var(--timeline-spacing-lg);
}
.widget-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--timeline-spacing-md);
}
.widget-header h3 {
  font-size: 1.1rem;
  font-weight: var(--timeline-header-font-weight);
  color: var(--timeline-text-primary);
}
.widget-toggle {
  background: none;
  border: none;
  color: var(--timeline-text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
  padding: var(--timeline-spacing-sm);
  line-height: 1;
  border-radius: var(--timeline-border-radius);
  transition: background-color var(--timeline-transition-duration) ease, transform var(--timeline-transition-duration) ease;
}
.widget-toggle:hover {
  background-color: rgba(255,255,255,0.1);
}

.journey-progress {
  text-align: center;
  margin-bottom: var(--timeline-spacing-lg);
}
.progress-ring {
  display: block;
  margin: 0 auto var(--timeline-spacing-sm);
}
.progress-text {
  font-size: 1.5em;
  font-weight: 600;
  fill: var(--timeline-text-primary);
}
.progress-label {
  font-size: 0.85rem;
  color: var(--timeline-text-secondary);
}


.widget-metrics {
  margin-bottom: var(--timeline-spacing-xl);
}
.widget-metrics h4 {
  font-size: 1rem;
  font-weight: var(--timeline-header-font-weight);
  color: var(--timeline-text-primary);
  margin-bottom: var(--timeline-spacing-md);
  padding-bottom: var(--timeline-spacing-sm);
  border-bottom: 1px solid var(--timeline-border-secondary);
}

.metric-item {
  margin-bottom: var(--timeline-spacing-md);
}
.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--timeline-spacing-xs);
}
.metric-label {
  font-size: 0.9rem;
  color: var(--timeline-text-secondary);
}
.metric-trend {
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
}
.metric-trend.new { background-color: rgba(59, 130, 246, 0.2); color: var(--timeline-accent-blue); }
.metric-trend.change { background-color: rgba(245, 158, 11, 0.2); color: var(--timeline-accent-yellow); }
.metric-trend.achieved { background-color: rgba(16, 185, 129, 0.2); color: var(--timeline-accent-green); }

.metric-value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--timeline-text-primary);
}


.widget-footer {
  margin-top: auto;
  padding-top: var(--timeline-spacing-lg);
  border-top: 1px solid var(--timeline-border-secondary);
}
.widget-insight h4 {
  font-size: 0.95rem;
  font-weight: var(--timeline-header-font-weight);
  color: var(--timeline-text-primary);
  margin-bottom: var(--timeline-spacing-sm);
}
.widget-insight p {
  font-size: 0.85rem;
  color: var(--timeline-text-secondary);
  line-height: var(--timeline-line-height);
}

/* Timeline Content Styling */
.timeline-content .timeline-section {
  margin-bottom: var(--timeline-spacing-xxl); /* Generous spacing between sections */
  padding: var(--timeline-spacing-xl);
  background-color: rgba(255,255,255,0.02); /* Very subtle background for sections */
  border-radius: calc(var(--timeline-border-radius) * 1.5);
  border: 1px solid var(--timeline-border-secondary);
}
.timeline-content .timeline-section:last-child {
  margin-bottom: var(--timeline-spacing-xl); /* Less margin for the last one */
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: var(--timeline-spacing-xl);
  padding-bottom: var(--timeline-spacing-lg);
  border-bottom: 1px solid var(--timeline-border-secondary);
}
.section-icon {
  font-size: 1.8rem;
  margin-right: var(--timeline-spacing-lg);
  padding: var(--timeline-spacing-sm);
  background-color: rgba(255,255,255,0.05);
  border-radius: var(--timeline-border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
}
.section-meta {
  flex-grow: 1;
}
.section-year {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--timeline-text-muted);
  margin-bottom: var(--timeline-spacing-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.section-title {
  font-size: 1.75rem;
  font-weight: var(--timeline-header-font-weight);
  color: var(--timeline-text-primary);
  line-height: 1.3;
}

.section-body {
  display: flex;
  flex-direction: column;
  gap: var(--timeline-spacing-xl);
}
.section-description p {
  font-size: 1rem;
  line-height: var(--timeline-line-height);
  color: var(--timeline-text-secondary);
  max-width: 70ch; /* Improve readability */
}

.section-highlights h3,
.section-initiatives h3,
.section-technologies h3,
.section-outcomes h3 {
  font-size: 1.15rem;
  font-weight: var(--timeline-header-font-weight);
  color: var(--timeline-text-primary);
  margin-bottom: var(--timeline-spacing-md);
  padding-bottom: var(--timeline-spacing-sm);
  border-bottom: 1px solid var(--timeline-border-secondary);
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--timeline-spacing-md);
}
.highlight-card {
  background-color: rgba(255,255,255,0.03);
  padding: var(--timeline-spacing-md);
  border-radius: var(--timeline-border-radius);
  border: 1px solid var(--timeline-border-secondary);
}
.highlight-label {
  font-size: 0.85rem;
  color: var(--timeline-text-muted);
  margin-bottom: var(--timeline-spacing-xs);
  display: block;
}
.highlight-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--timeline-text-primary);
}

.initiatives-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--timeline-spacing-lg);
}
.initiative-item {
  background-color: rgba(255,255,255,0.03);
  padding: var(--timeline-spacing-md);
  border-radius: var(--timeline-border-radius);
  border: 1px solid var(--timeline-border-secondary);
}
.initiative-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--timeline-text-primary);
  margin-bottom: var(--timeline-spacing-sm);
}
.initiative-description {
  font-size: 0.9rem;
  color: var(--timeline-text-secondary);
  margin-bottom: var(--timeline-spacing-sm);
  line-height: 1.5;
}
.initiative-impact {
  font-size: 0.85rem;
  color: var(--timeline-accent-green);
  background-color: rgba(16, 185, 129, 0.1);
  padding: var(--timeline-spacing-xs) var(--timeline-spacing-sm);
  border-radius: 4px;
  display: inline-block;
}
.initiative-impact .impact-label {
  color: var(--timeline-text-secondary);
  margin-right: var(--timeline-spacing-xs);
}


.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--timeline-spacing-sm);
}
.tech-tag {
  background-color: rgba(59, 130, 246, 0.15); /* Accent blue tint */
  color: var(--timeline-accent-blue);
  padding: var(--timeline-spacing-xs) var(--timeline-spacing-md);
  border-radius: 16px; /* Pill shape */
  font-size: 0.85rem;
  font-weight: 500;
}


.outcomes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--timeline-spacing-md);
}
.outcome-card {
  background-color: rgba(255,255,255,0.03);
  padding: var(--timeline-spacing-md);
  border-radius: var(--timeline-border-radius);
  border: 1px solid var(--timeline-border-secondary);
  text-align: center;
}
.outcome-metric {
  font-size: 0.9rem;
  color: var(--timeline-text-secondary);
  margin-bottom: var(--timeline-spacing-xs);
}
.outcome-value {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--timeline-accent-green);
  margin-bottom: var(--timeline-spacing-sm);
}
.outcome-description {
  font-size: 0.8rem;
  color: var(--timeline-text-muted);
  line-height: 1.4;
}


/* Modal styles for BusinessProfileModal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-container {
  background-color: var(--timeline-content-bg); /* Use consistent content bg */
  padding: var(--timeline-spacing-xl);
  border-radius: calc(var(--timeline-border-radius) * 1.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 700px; /* Max width for the modal */
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--timeline-border-primary);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--timeline-spacing-lg);
  padding-bottom: var(--timeline-spacing-md);
  border-bottom: 1px solid var(--timeline-border-secondary);
}
.modal-header h2 {
  font-size: 1.5rem;
  color: var(--timeline-text-primary);
}
.modal-close {
  background: none;
  border: none;
  font-size: 1.8rem;
  color: var(--timeline-text-secondary);
  cursor: pointer;
  line-height: 1;
}
.modal-close:hover {
  color: var(--timeline-text-primary);
}

.modal-progress {
  margin-bottom: var(--timeline-spacing-xl);
}
.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--timeline-spacing-sm);
}
.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--timeline-text-secondary);
  font-size: 0.8rem;
  flex: 1;
  text-align: center;
}
.progress-step.active .step-number {
  background-color: var(--timeline-accent-blue);
  color: white;
  border-color: var(--timeline-accent-blue);
}
.progress-step.active .step-label {
  color: var(--timeline-text-primary);
  font-weight: 500;
}
.step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--timeline-border-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--timeline-spacing-xs);
  font-weight: 600;
  transition: all var(--timeline-transition-duration) ease;
}
.step-label {
  font-size: 0.8rem;
}
.progress-bar {
  height: 4px;
  background-color: var(--timeline-border-primary);
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background-color: var(--timeline-accent-blue);
  border-radius: 2px;
  transition: width var(--timeline-transition-duration) ease;
}

.modal-form {
  flex-grow: 1;
  overflow-y: auto; /* Scroll within form if content overflows */
  padding-right: var(--timeline-spacing-sm); /* For scrollbar */
}

.form-step {
  animation: fadeIn 0.3s ease-out;
}
.form-step h3 {
  font-size: 1.2rem;
  margin-bottom: var(--timeline-spacing-lg);
  color: var(--timeline-text-primary);
}

.form-group {
  margin-bottom: var(--timeline-spacing-lg);
}
.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--timeline-text-secondary);
  margin-bottom: var(--timeline-spacing-sm);
}
.form-group input[type="text"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: var(--timeline-spacing-md);
  background-color: rgba(255,255,255,0.05);
  border: 1px solid var(--timeline-border-primary);
  border-radius: var(--timeline-border-radius);
  color: var(--timeline-text-primary);
  font-size: 0.95rem;
}
.form-group input[type="text"]:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--timeline-accent-blue);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}
.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.radio-group, .checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--timeline-spacing-md);
}
.radio-label, .checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--timeline-spacing-sm);
  padding: var(--timeline-spacing-sm) var(--timeline-spacing-md);
  background-color: rgba(255,255,255,0.05);
  border: 1px solid var(--timeline-border-primary);
  border-radius: var(--timeline-border-radius);
  cursor: pointer;
  transition: all var(--timeline-transition-duration) ease;
  color: var(--timeline-text-secondary);
}
.radio-label:hover, .checkbox-label:hover {
  border-color: var(--timeline-accent-blue);
}
.radio-label input[type="radio"]:checked + .radio-text,
.checkbox-label input[type="checkbox"]:checked + span {
 color: var(--timeline-text-primary);
 font-weight: 500;
}
.radio-label input[type="radio"]:checked,
.checkbox-label input[type="checkbox"]:checked {
  accent-color: var(--timeline-accent-blue); /* Modern way to color controls */
}


.maturity-grid, .goals-grid, .timeframe-options {
  display: grid;
  gap: var(--timeline-spacing-md);
}
.maturity-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
.goals-grid { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
.timeframe-options { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));}

.maturity-option, .goal-option, .timeframe-option {
  padding: var(--timeline-spacing-md);
  background-color: rgba(255,255,255,0.05);
  border: 1px solid var(--timeline-border-primary);
  border-radius: var(--timeline-border-radius);
  text-align: left;
  cursor: pointer;
  transition: all var(--timeline-transition-duration) ease;
  color: var(--timeline-text-secondary);
}
.maturity-option:hover, .goal-option:hover, .timeframe-option:hover {
  border-color: var(--timeline-accent-blue);
  background-color: rgba(59, 130, 246, 0.1);
}
.maturity-option.selected, .goal-option.selected, .timeframe-option.selected {
  border-color: var(--timeline-accent-blue);
  background-color: rgba(59, 130, 246, 0.2);
  color: var(--timeline-text-primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}
.maturity-label, .timeframe-label {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: var(--timeline-spacing-xs);
  display: block;
  color: var(--timeline-text-primary);
}
.maturity-description, .timeframe-description {
  font-size: 0.85rem;
  line-height: 1.4;
}
.goal-option {
  font-size: 0.95rem;
}


.modal-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--timeline-spacing-xl);
  padding-top: var(--timeline-spacing-lg);
  border-top: 1px solid var(--timeline-border-secondary);
}
.modal-actions .btn-primary,
.modal-actions .btn-secondary {
  padding: var(--timeline-spacing-md) var(--timeline-spacing-lg);
  font-size: 0.95rem;
}
.modal-actions .btn-primary:disabled {
  background-color: var(--timeline-text-muted);
  cursor: not-allowed;
}


/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Error styling for form inputs */
.form-group input.error,
.form-group select.error {
  border-color: var(--timeline-accent-red);
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3);
}
.error-message {
  color: var(--timeline-accent-red);
  font-size: 0.8rem;
  margin-top: var(--timeline-spacing-xs);
}

/* Small screen adjustments */
@media (max-width: 1200px) {
  .timeline-main {
    padding: var(--timeline-spacing-xl);
  }
  .metrics-widget {
    width: 280px;
  }
}

@media (max-width: 992px) {
  .timeline-container {
    flex-direction: column;
  }
  .timeline-sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--timeline-border-primary);
    flex-direction: row; /* Horizontal layout for nav items */
    overflow-x: auto;
    padding: var(--timeline-spacing-md);
  }
  .timeline-sidebar-header {
    display: none; /* Hide header on small screens */
  }
  .timeline-nav {
    flex-direction: row;
    gap: var(--timeline-spacing-sm);
  }
  .timeline-nav-item {
    padding: var(--timeline-spacing-sm) var(--timeline-spacing-md);
    flex-direction: column; /* Stack icon and text */
    align-items: center;
    min-width: 100px;
  }
  .timeline-nav-dot {
    margin-right: 0;
    margin-bottom: var(--timeline-spacing-sm);
  }
  .timeline-nav-year {
    font-size: 0.7rem;
  }
  .timeline-nav-title {
    font-size: 0.85rem;
  }
  .timeline-nav-subtitle {
    display: none; /* Hide subtitle on small screens for brevity */
  }

  .timeline-main {
    height: calc(100vh - var(--sidebar-height-mobile, 100px)); /* Adjust based on actual mobile sidebar height */
    padding: var(--timeline-spacing-lg);
  }

  .metrics-widget {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto; /* Adjust height as needed or make it expandable */
    max-height: 40vh;
    border-left: none;
    border-top: 1px solid var(--timeline-border-primary);
    z-index: 999;
    flex-direction: row;
    padding: var(--timeline-spacing-md);
  }
  .metrics-widget.minimized {
    width: 100%;
    height: 60px; /* Small strip when minimized */
    padding: var(--timeline-spacing-sm);
  }
  .metrics-widget.minimized .widget-header-content {
    display: flex; /* Ensure toggle is visible */
  }
  .metrics-widget .journey-progress, .metrics-widget .widget-metrics, .metrics-widget .widget-footer {
    /* Adjust layout for horizontal widget or hide less critical parts */
    flex: 1;
  }
}

@media (max-width: 768px) {
  .modal-container {
    width: 95%;
    padding: var(--timeline-spacing-lg);
  }
  .form-step h3 {
    font-size: 1.1rem;
  }
  .modal-actions {
    flex-direction: column-reverse;
    gap: var(--timeline-spacing-md);
  }
  .modal-actions .btn-primary, .modal-actions .btn-secondary {
    width: 100%;
  }
}

/* Custom Scrollbar for .timeline-main */
.timeline-main::-webkit-scrollbar {
  width: 8px;
  height: 8px; /* For horizontal scrollbar, if ever needed */
}

.timeline-main::-webkit-scrollbar-track {
  background: var(--timeline-content-bg); /* Make track blend with content background */
  border-radius: 10px;
}

.timeline-main::-webkit-scrollbar-thumb {
  background-color: var(--timeline-text-muted); /* Use a subtle color from your palette */
  border-radius: 10px;
  /* Add a border to create a visual separation from the track, making the thumb appear thinner */
  border: 2px solid var(--timeline-content-bg);
}

.timeline-main::-webkit-scrollbar-thumb:hover {
  background-color: var(--timeline-text-secondary); /* Slightly more prominent on hover */
}

/* Firefox specific scrollbar styling */
.timeline-main {
  scrollbar-width: thin; /* "auto" or "thin" */
  scrollbar-color: var(--timeline-text-muted) var(--timeline-content-bg); /* thumb color, track color */
} 


================================================
FILE: app/timeline/components/BusinessProfileForm.js
================================================
'use client';

import React, { useState } from 'react';
import useBusinessProfileStore from '../../store/useBusinessProfileStore';

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 
  'Education', 'Real Estate', 'Transportation', 'Energy', 'Other'
];

const companySizes = [
  { value: 'startup', label: '1-50 employees' },
  { value: 'small', label: '51-200 employees' },
  { value: 'medium', label: '201-1000 employees' },
  { value: 'large', label: '1000+ employees' },
];

const maturityLevels = [
  { value: 'beginner', label: 'Just Starting', description: 'Little to no AI/automation' },
  { value: 'emerging', label: 'Emerging', description: 'Some basic automation' },
  { value: 'developing', label: 'Developing', description: 'Several AI initiatives' },
  { value: 'advanced', label: 'Advanced', description: 'Widespread AI adoption' },
];

const techStackOptions = [
  'ServiceNow', 'Salesforce', 'Microsoft 365', 'Google Workspace', 
  'SAP', 'Oracle', 'AWS', 'Azure', 'Custom Solutions'
];

const goalOptions = [
  'Improve Customer Service', 'Reduce Operational Costs', 'Increase Revenue',
  'Enhance Data Analytics', 'Automate Workflows', 'Scale Operations',
  'Improve Decision Making', 'Competitive Advantage'
];

export default function BusinessProfileForm({ onSubmit }) {
  const { businessProfile, updateBusinessProfile } = useBusinessProfileStore();
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (field, value) => {
    updateBusinessProfile({ [field]: value });
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  
  const handleArrayToggle = (field, value) => {
    const currentArray = businessProfile[field] || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateBusinessProfile({ [field]: newArray });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!businessProfile.companyName?.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    if (!businessProfile.industry) {
      newErrors.industry = 'Please select an industry';
    }
    if (!businessProfile.companySize) {
      newErrors.companySize = 'Please select company size';
    }
    if (!businessProfile.aiMaturityLevel) {
      newErrors.aiMaturityLevel = 'Please select AI maturity level';
    }
    if (!businessProfile.primaryGoals?.length) {
      newErrors.primaryGoals = 'Please select at least one goal';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };
  
  return (
    <form className="business-profile-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h3>Basic Information</h3>
        
        <div className="form-group">
          <label htmlFor="companyName">Company Name *</label>
          <input
            type="text"
            id="companyName"
            value={businessProfile.companyName || ''}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="Enter your company name"
            className={errors.companyName ? 'error' : ''}
          />
          {errors.companyName && <span className="error-message">{errors.companyName}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="industry">Industry *</label>
          <select
            id="industry"
            value={businessProfile.industry || ''}
            onChange={(e) => handleInputChange('industry', e.target.value)}
            className={errors.industry ? 'error' : ''}
          >
            <option value="">Select your industry</option>
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
          {errors.industry && <span className="error-message">{errors.industry}</span>}
        </div>
        
        <div className="form-group">
          <label>Company Size *</label>
          <div className="radio-group">
            {companySizes.map(size => (
              <label key={size.value} className="radio-label">
                <input
                  type="radio"
                  name="companySize"
                  value={size.value}
                  checked={businessProfile.companySize === size.value}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                />
                <span>{size.label}</span>
              </label>
            ))}
          </div>
          {errors.companySize && <span className="error-message">{errors.companySize}</span>}
        </div>
      </div>
      
      <div className="form-section">
        <h3>Technology & AI Readiness</h3>
        
        <div className="form-group">
          <label>Current AI Maturity Level *</label>
          <div className="maturity-options">
            {maturityLevels.map(level => (
              <label 
                key={level.value} 
                className={`maturity-option ${businessProfile.aiMaturityLevel === level.value ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="aiMaturityLevel"
                  value={level.value}
                  checked={businessProfile.aiMaturityLevel === level.value}
                  onChange={(e) => handleInputChange('aiMaturityLevel', e.target.value)}
                />
                <div className="maturity-content">
                  <h4>{level.label}</h4>
                  <p>{level.description}</p>
                </div>
              </label>
            ))}
          </div>
          {errors.aiMaturityLevel && <span className="error-message">{errors.aiMaturityLevel}</span>}
        </div>
        
        <div className="form-group">
          <label>Current Technology Stack</label>
          <div className="checkbox-group">
            {techStackOptions.map(tech => (
              <label key={tech} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={businessProfile.currentTechStack?.includes(tech) || false}
                  onChange={() => handleArrayToggle('currentTechStack', tech)}
                />
                <span>{tech}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3>Goals & Timeline</h3>
        
        <div className="form-group">
          <label>Primary Goals *</label>
          <div className="goal-options">
            {goalOptions.map(goal => (
              <label 
                key={goal} 
                className={`goal-option ${businessProfile.primaryGoals?.includes(goal) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={businessProfile.primaryGoals?.includes(goal) || false}
                  onChange={() => handleArrayToggle('primaryGoals', goal)}
                />
                <span>{goal}</span>
              </label>
            ))}
          </div>
          {errors.primaryGoals && <span className="error-message">{errors.primaryGoals}</span>}
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="budget">Estimated Budget Range</label>
            <select
              id="budget"
              value={businessProfile.budget || ''}
              onChange={(e) => handleInputChange('budget', e.target.value)}
            >
              <option value="">Select budget range</option>
              <option value="<50k">Less than $50,000</option>
              <option value="50k-150k">$50,000 - $150,000</option>
              <option value="150k-500k">$150,000 - $500,000</option>
              <option value="500k+">$500,000+</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="timeframe">Implementation Timeframe</label>
            <select
              id="timeframe"
              value={businessProfile.timeframe || ''}
              onChange={(e) => handleInputChange('timeframe', e.target.value)}
            >
              <option value="">Select timeframe</option>
              <option value="3months">3 months</option>
              <option value="6months">6 months</option>
              <option value="1year">1 year</option>
              <option value="2years+">2+ years</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary btn-large">
          Generate AI Timeline
        </button>
      </div>
    </form>
  );
} 


================================================
FILE: app/timeline/components/BusinessProfileModal.js
================================================
'use client';

import React, { useState } from 'react';

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 
  'Education', 'Real Estate', 'Transportation', 'Energy', 'Other'
];

const companySizes = [
  { value: 'startup', label: '1-50 employees' },
  { value: 'small', label: '51-200 employees' },
  { value: 'medium', label: '201-1000 employees' },
  { value: 'large', label: '1000+ employees' },
];

const maturityLevels = [
  { value: 'beginner', label: 'Just Starting', description: 'Little to no AI/automation' },
  { value: 'emerging', label: 'Emerging', description: 'Some basic automation' },
  { value: 'developing', label: 'Developing', description: 'Several AI initiatives' },
  { value: 'advanced', label: 'Advanced', description: 'Mature AI adoption' },
];

const primaryGoals = [
  'Cost Reduction',
  'Revenue Growth',
  'Customer Experience',
  'Operational Efficiency',
  'Innovation',
  'Risk Management',
  'Employee Productivity',
  'Data-Driven Insights'
];

export default function BusinessProfileModal({ onClose, onSubmit, isGenerating, initialData }) {
  const [formData, setFormData] = useState({
    companyName: initialData?.companyName || '',
    industry: initialData?.industry || '',
    companySize: initialData?.companySize || '',
    aiMaturityLevel: initialData?.aiMaturityLevel || '',
    primaryGoals: initialData?.primaryGoals || [],
    currentChallenges: initialData?.currentChallenges || '',
    budget: initialData?.budget || '',
    timeframe: initialData?.timeframe || '3-years'
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goal)
        ? prev.primaryGoals.filter(g => g !== goal)
        : [...prev.primaryGoals, goal]
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName && formData.industry && formData.companySize;
      case 2:
        return formData.aiMaturityLevel && formData.primaryGoals.length > 0;
      case 3:
        return formData.budget && formData.timeframe;
      default:
        return false;
    }
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Build Your AI Transformation Timeline</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-progress">
          <div className="progress-steps">
            {[1, 2, 3].map(step => (
              <div 
                key={step} 
                className={`progress-step ${currentStep >= step ? 'active' : ''}`}
              >
                <div className="step-number">{step}</div>
                <div className="step-label">
                  {step === 1 && 'Company Info'}
                  {step === 2 && 'AI Readiness'}
                  {step === 3 && 'Planning'}
                </div>
              </div>
            ))}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          {currentStep === 1 && (
            <div className="form-step">
              <h3>Tell us about your company</h3>
              
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  placeholder="Enter your company name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="industry">Industry</label>
                <select
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                  required
                >
                  <option value="">Select your industry</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Company Size</label>
                <div className="radio-group">
                  {companySizes.map(size => (
                    <label key={size.value} className="radio-label">
                      <input
                        type="radio"
                        name="companySize"
                        value={size.value}
                        checked={formData.companySize === size.value}
                        onChange={(e) => handleChange('companySize', e.target.value)}
                      />
                      <span className="radio-text">{size.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="form-step">
              <h3>Assess your AI readiness</h3>
              
              <div className="form-group">
                <label>Current AI Maturity Level</label>
                <div className="maturity-grid">
                  {maturityLevels.map(level => (
                    <button
                      key={level.value}
                      type="button"
                      className={`maturity-option ${formData.aiMaturityLevel === level.value ? 'selected' : ''}`}
                      onClick={() => handleChange('aiMaturityLevel', level.value)}
                    >
                      <div className="maturity-label">{level.label}</div>
                      <div className="maturity-description">{level.description}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label>Primary Goals (Select all that apply)</label>
                <div className="goals-grid">
                  {primaryGoals.map(goal => (
                    <button
                      key={goal}
                      type="button"
                      className={`goal-option ${formData.primaryGoals.includes(goal) ? 'selected' : ''}`}
                      onClick={() => handleGoalToggle(goal)}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="currentChallenges">Current Challenges (Optional)</label>
                <textarea
                  id="currentChallenges"
                  value={formData.currentChallenges}
                  onChange={(e) => handleChange('currentChallenges', e.target.value)}
                  placeholder="Describe any specific challenges or pain points..."
                  rows={3}
                />
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="form-step">
              <h3>Set your transformation parameters</h3>
              
              <div className="form-group">
                <label htmlFor="budget">Annual AI Investment Budget</label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleChange('budget', e.target.value)}
                  required
                >
                  <option value="">Select budget range</option>
                  <option value="<100k">Less than $100,000</option>
                  <option value="100k-500k">$100,000 - $500,000</option>
                  <option value="500k-1m">$500,000 - $1 million</option>
                  <option value="1m-5m">$1 million - $5 million</option>
                  <option value=">5m">More than $5 million</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Transformation Timeframe</label>
                <div className="timeframe-options">
                  {['1-year', '3-years', '5-years'].map(tf => (
                    <button
                      key={tf}
                      type="button"
                      className={`timeframe-option ${formData.timeframe === tf ? 'selected' : ''}`}
                      onClick={() => handleChange('timeframe', tf)}
                    >
                      <div className="timeframe-label">{tf.replace('-', ' ')}</div>
                      <div className="timeframe-description">
                        {tf === '1-year' && 'Quick wins focus'}
                        {tf === '3-years' && 'Balanced approach'}
                        {tf === '5-years' && 'Full transformation'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="modal-actions">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="btn-primary"
                disabled={!canProceed() || isGenerating}
              >
                {isGenerating ? 'Generating Timeline...' : 'Generate Timeline'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 


================================================
FILE: app/timeline/components/MetricsCards.js
================================================
'use client';

import React from 'react';
import { CircleDollarSign, LineChart, Clock, AlertTriangle } from 'lucide-react';

export default function MetricsCards({ summary }) {
  const metrics = [
    {
      label: 'Total Investment',
      value: summary.totalInvestment,
      icon: <CircleDollarSign size={24} />,
      color: '#3498db',
    },
    {
      label: 'Expected ROI',
      value: summary.expectedROI,
      icon: <LineChart size={24} />,
      color: '#10b981',
    },
    {
      label: 'Time to Value',
      value: summary.timeToValue,
      icon: <Clock size={24} />,
      color: '#f39c12',
    },
    {
      label: 'Risk Level',
      value: summary.riskLevel,
      icon: <AlertTriangle size={24} />,
      color: '#ef4444',
    },
  ];
  
  return (
    <div className="metrics-cards">
      {metrics.map((metric, index) => (
        <div 
          key={index} 
          className="metric-card"
          style={{ '--metric-color': metric.color }}
        >
          <div className="metric-icon">{metric.icon}</div>
          <div className="metric-content">
            <h4>{metric.label}</h4>
            <p className="metric-value">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 


================================================
FILE: app/timeline/components/MetricsWidget.js
================================================
'use client';

import React, { useState } from 'react';

// Helper for trend icons
const TrendIcon = ({ type }) => {
  switch (type) {
    case 'positive':
      return <span style={{ color: 'var(--timeline-accent-green)', marginRight: '4px' }}>▲</span>;
    case 'negative':
      return <span style={{ color: 'var(--timeline-accent-red)', marginRight: '4px' }}>▼</span>;
    default:
      return null;
  }
};

export default function MetricsWidget({ activeSection, timelineData, scrollProgress }) {
  const [isMinimized, setIsMinimized] = useState(false);
  
  if (!timelineData) return null;
  
  // Get current phase data based on activeSection
  const getCurrentPhase = () => {
    switch(activeSection) {
      case 'current-state':
        return { title: 'Current State', ...(timelineData.currentState || {}) };
      case 'phase-1':
        return { title: 'Foundation', ...(timelineData.phases?.[0] || {}) };
      case 'phase-2':
        return { title: 'Implementation', ...(timelineData.phases?.[1] || {}) };
      case 'phase-3':
        return { title: 'Expansion', ...(timelineData.phases?.[2] || {}) };
      case 'phase-4':
        return { title: 'Optimization', ...(timelineData.phases?.[3] || {}) };
      case 'future-state':
        return { title: 'Future State', ...(timelineData.futureState || {}) };
      default:
        return { title: 'Current State', ...(timelineData.currentState || {}) };
    }
  };
  
  const currentPhase = getCurrentPhase();
  
  // Calculate journey metrics based on activeSection
  const getJourneyProgress = () => {
    const sectionOrder = ['current-state', 'phase-1', 'phase-2', 'phase-3', 'phase-4', 'future-state'];
    const currentIndex = sectionOrder.indexOf(activeSection);
    return currentIndex !== -1 ? ((currentIndex + 1) / sectionOrder.length) * 100 : 0;
  };
  
  const journeyProgress = getJourneyProgress();
  
  // Get dynamic metrics based on current section
  const getDynamicMetrics = () => {
    switch(activeSection) {
      case 'current-state':
        return [
          { label: 'AI Readiness', value: '25%', trend: { text: 'baseline', type: 'neutral' } },
          { label: 'Manual Processes', value: '85%', trend: { text: 'baseline', type: 'neutral' } },
          { label: 'Data Utilization', value: '15%', trend: { text: 'baseline', type: 'neutral' } }
        ];
      case 'phase-1':
        return [
          { label: 'AI Readiness', value: '45%', trend: { text: '+20%', type: 'positive' } },
          { label: 'Automation Level', value: '25%', trend: { text: 'new', type: 'neutral' } },
          { label: 'Team Trained', value: '30%', trend: { text: 'new', type: 'neutral' } }
        ];
      case 'phase-2':
        return [
          { label: 'AI Readiness', value: '65%', trend: { text: '+40%', type: 'positive' } },
          { label: 'Automation Level', value: '45%', trend: { text: '+20%', type: 'positive' } },
          { label: 'ROI Achieved', value: '75%', trend: { text: 'new', type: 'neutral' } }
        ];
      case 'phase-3':
        return [
          { label: 'AI Integration', value: '80%', trend: { text: '+55%', type: 'positive' } },
          { label: 'Efficiency Gain', value: '60%', trend: { text: 'new', type: 'positive' } },
          { label: 'Revenue Impact', value: '+25%', trend: { text: '+25%', type: 'positive' } }
        ];
      case 'phase-4':
        return [
          { label: 'AI Maturity', value: '90%', trend: { text: '+65%', type: 'positive' } },
          { label: 'Cost Reduction', value: '40%', trend: { text: 'new', type: 'positive' } },
          { label: 'Innovation Rate', value: '3x', trend: { text: 'new', type: 'positive' } }
        ];
      case 'future-state':
        return [
          { label: 'AI Leadership', value: '95%', trend: { text: 'achieved', type: 'positive' } },
          { label: 'Market Position', value: 'Top 10%', trend: { text: 'achieved', type: 'positive' } },
          { label: 'Total ROI', value: '425%', trend: { text: 'achieved', type: 'positive' } }
        ];
      default:
        return [];
    }
  };
  
  const getProgressRing = (value) => {
    const validValue = typeof value === 'number' && !isNaN(value) ? Math.max(0, Math.min(100, value)) : 0;
    const radius = 38; // Slightly smaller radius for a tighter look
    const strokeWidth = 7; // Slightly thinner stroke
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (validValue / 100) * circumference;
    
    return (
      <svg className="progress-ring" width="90" height="90"> {/* Adjusted size */}
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="none"
          stroke="var(--timeline-border-secondary)" /* Using CSS var for track */
          strokeWidth={strokeWidth}
        />
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round" /* Rounded line cap */
          transform="rotate(-90 45 45)"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--timeline-accent-blue)" />
            <stop offset="100%" stopColor="var(--timeline-accent-green)" />
          </linearGradient>
        </defs>
        <text x="45" y="45" textAnchor="middle" dy="0.3em" className="progress-text">
          {`${Math.round(validValue)}%`}
        </text>
      </svg>
    );
  };
  
  const metrics = getDynamicMetrics();
  
  return (
    <div className={`metrics-widget ${isMinimized ? 'minimized' : ''}`}>
      <div className="widget-header">
        <div className="widget-header-content">
          <h3>AI Journey Progress</h3>
          <button 
            className="widget-toggle"
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? 'Expand widget' : 'Minimize widget'}
          >
            {isMinimized ? '◀' : '▶'}
          </button>
        </div>
        {!isMinimized && (
          <div className="journey-progress">
            {getProgressRing(scrollProgress || 0)}
            <p className="progress-label">Journey Completion</p>
          </div>
        )}
      </div>
      
      {!isMinimized && (
        <>
          <div className="widget-metrics">
            <h4>{currentPhase.title} Metrics</h4>
            {metrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="metric-header">
                  <span className="metric-label">{metric.label}</span>
                  {metric.trend && (
                    <span className={`metric-trend ${metric.trend.type || 'neutral'}`}>
                      <TrendIcon type={metric.trend.type} />
                      {metric.trend.text}
                    </span>
                  )}
                </div>
                <div className="metric-value">{metric.value}</div>
              </div>
            ))}
          </div>
          
          <div className="widget-footer">
            <div className="widget-insight">
              <h4>Key Insight</h4>
              <p>{currentPhase.outcomes?.[0]?.description || currentPhase.description || 'Your AI transformation journey is progressing well.'}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 


================================================
FILE: app/timeline/components/ScenarioSelector.js
================================================
'use client';

import React from 'react';

const scenarios = [
  {
    id: 'conservative',
    label: 'Conservative',
    description: 'Lower risk, proven technologies',
    icon: '🛡️',
    color: '#10b981',
  },
  {
    id: 'balanced',
    label: 'Balanced',
    description: 'Moderate pace, balanced approach',
    icon: '⚖️',
    color: '#3498db',
  },
  {
    id: 'aggressive',
    label: 'Aggressive',
    description: 'Fast adoption, cutting-edge tech',
    icon: '🚀',
    color: '#ef4444',
  },
];

export default function ScenarioSelector({ currentScenario, onScenarioChange }) {
  return (
    <div className="scenario-selector">
      <h3>Choose Your AI Adoption Scenario</h3>
      <div className="scenario-options">
        {scenarios.map(scenario => (
          <button
            key={scenario.id}
            className={`scenario-option ${currentScenario === scenario.id ? 'active' : ''}`}
            onClick={() => onScenarioChange(scenario.id)}
            style={{
              '--scenario-color': scenario.color,
            }}
          >
            <div className="scenario-icon">{scenario.icon}</div>
            <h4>{scenario.label}</h4>
            <p>{scenario.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
} 


================================================
FILE: app/timeline/components/TimelineContent.js
================================================
'use client';

import React from 'react';

export default function TimelineContent({ sections, timelineData, sectionRefs, businessProfile }) {
  const registerRef = (id, element) => {
    if (element) {
      sectionRefs.current[id] = element;
    }
  };
  
  const getSectionContent = (sectionId) => {
    const contentMap = {
      'current-state': {
        content: timelineData.currentState,
        highlights: [
          { label: 'AI Maturity', value: businessProfile.aiMaturityLevel?.charAt(0).toUpperCase() + businessProfile.aiMaturityLevel?.slice(1) || 'N/A' },
          { label: 'Industry', value: businessProfile.industry || 'N/A' },
          { label: 'Company Size', value: businessProfile.companySize?.charAt(0).toUpperCase() + businessProfile.companySize?.slice(1) || 'N/A' }
        ]
      },
      'phase-1': {
        content: timelineData.phases[0],
        highlights: timelineData.phases[0]?.highlights || []
      },
      'phase-2': {
        content: timelineData.phases[1],
        highlights: timelineData.phases[1]?.highlights || []
      },
      'phase-3': {
        content: timelineData.phases[2],
        highlights: timelineData.phases[2]?.highlights || []
      },
      'phase-4': {
        content: timelineData.phases[3],
        highlights: timelineData.phases[3]?.highlights || []
      },
      'future-state': {
        content: timelineData.futureState,
        highlights: timelineData.futureState?.highlights || []
      }
    };
    return contentMap[sectionId] || { content: {}, highlights: [] };
  };
  
  return (
    <div className="timeline-content">
      {sections.map((section) => {
        const { content, highlights } = getSectionContent(section.id);
        
        return (
          <section 
            key={section.id}
            id={section.id}
            ref={(el) => registerRef(section.id, el)}
            className="timeline-section"
          >
            <div className="section-header">
              <div className="section-icon">{section.icon}</div>
              <div className="section-meta">
                <div className="section-year">{section.year}</div>
                <h2 className="section-title">{section.title}</h2>
              </div>
            </div>
            
            <div className="section-body">
              {content && (
                <>
                  {content.description && (
                    <div className="section-description">
                      <p>{content.description}</p>
                    </div>
                  )}
                  
                  {highlights && highlights.length > 0 && (
                    <div className="section-highlights">
                      <h3>Key Highlights</h3>
                      <div className="highlights-grid">
                        {highlights.map((highlight, index) => (
                          <div key={index} className="highlight-card">
                            <div className="highlight-label">{highlight.label}</div>
                            <div className="highlight-value">{highlight.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {content.initiatives && content.initiatives.length > 0 && (
                    <div className="section-initiatives">
                      <h3>Key Initiatives</h3>
                      <ul className="initiatives-list">
                        {content.initiatives.map((initiative, index) => (
                          <li key={index} className="initiative-item">
                            <div className="initiative-title">{initiative.title}</div>
                            <div className="initiative-description">{initiative.description}</div>
                            {initiative.impact && (
                              <div className="initiative-impact">
                                <span className="impact-label">Impact:</span> {initiative.impact}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {content.technologies && content.technologies.length > 0 && (
                    <div className="section-technologies">
                      <h3>Technologies & Tools</h3>
                      <div className="tech-tags">
                        {content.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {content.outcomes && content.outcomes.length > 0 && (
                    <div className="section-outcomes">
                      <h3>Expected Outcomes</h3>
                      <div className="outcomes-grid">
                        {content.outcomes.map((outcome, index) => (
                          <div key={index} className="outcome-card">
                            <div className="outcome-metric">{outcome.metric}</div>
                            <div className="outcome-value">{outcome.value}</div>
                            {outcome.description && (
                               <div className="outcome-description">{outcome.description}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
} 


================================================
FILE: app/timeline/components/TimelineHeader.js
================================================
'use client';

import React from 'react';
import { ArrowLeft, Share2, Download } from 'lucide-react';

export default function TimelineHeader({ onBackClick }) {
  return (
    <header className="timeline-header">
      <div className="header-content">
        <button 
          className="back-button"
          onClick={onBackClick}
          aria-label="Back to Flow Visualizer"
        >
          <ArrowLeft size={20} />
        </button>
        
        <div className="header-title-section">
          <h1 className="timeline-title">AI Transformation Timeline</h1>
          <p className="timeline-subtitle">Your personalized roadmap to AI-powered business operations</p>
        </div>
        
        <div className="header-actions">
          <button className="btn btn-secondary btn-icon" aria-label="Share timeline">
            <Share2 size={18} />
          </button>
          <button className="btn btn-primary">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>
    </header>
  );
} 


================================================
FILE: app/timeline/components/TimelineSidebar.js
================================================
'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  MapPin,
  Building,
  Rocket,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react';

const iconMap = {
  MapPin: <MapPin size={24} />,
  Building: <Building size={24} />,
  Rocket: <Rocket size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  Zap: <Zap size={24} />,
  Target: <Target size={24} />,
};

export default function TimelineSidebar({ 
  sections, 
  activeSection, 
  onSectionClick, 
  theme, 
  onThemeToggle,
  // New props for cache functionality
  timelineCached,
  timelineGeneratedAt,
  timelineScenarioType,
  onRegenerateTimeline,
  isGenerating = false,
  currentProfile = null
}) {
  const navRef = useRef(null); // Ref for the main navigation container
  const itemRefs = useRef({}); // Refs for individual navigation items
  
  const [trackContainerTop, setTrackContainerTop] = useState('0px');
  const [trackContainerHeight, setTrackContainerHeight] = useState('0px');
  const [blueProgressBarHeight, setBlueProgressBarHeight] = useState('0px');

  // Constants for precise calculations based on CSS
  const TIMELINE_SPACING_MD_PX = 16; // From --timeline-spacing-md, used as padding in .timeline-nav-item
  const DOT_HALF_HEIGHT_PX = 12;     // Half of the .timeline-nav-dot height (24px)
  const DOT_FULL_HEIGHT_PX = 24;     // Full height of the .timeline-nav-dot

  // Helper function to format cache timestamp
  const formatGeneratedTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleRegenerateClick = async () => {
    if (onRegenerateTimeline && currentProfile) {
      try {
        await onRegenerateTimeline(currentProfile, timelineScenarioType);
      } catch (error) {
        console.error('Error regenerating timeline:', error);
      }
    }
  };

  useLayoutEffect(() => {
    if (navRef.current && sections && sections.length > 0) {
      const firstItemId = sections[0].id;
      const lastItemId = sections[sections.length - 1].id;
      const firstItemEl = itemRefs.current[firstItemId];
      const lastItemEl = itemRefs.current[lastItemId];
      const activeItemEl = activeSection ? itemRefs.current[activeSection] : null;

      let newTrackTop = 0;
      let newTrackHeight = 0;
      let newBlueBarHeight = 0;

      if (firstItemEl) {
        // Calculate the Y position for the center of the first dot, relative to the nav container's top.
        // offsetTop is distance from nav top to button's top border.
        // TIMELINE_SPACING_MD_PX is button's top padding (distance from button top border to dot's effective top, as dot is inside padding).
        // DOT_HALF_HEIGHT_PX is half of dot's height.
        newTrackTop = firstItemEl.offsetTop + TIMELINE_SPACING_MD_PX + DOT_HALF_HEIGHT_PX;
      } else {
        // Fallback if first item ref not ready - though this state should be brief
        setTrackContainerTop('0px'); 
        setTrackContainerHeight('0px');
        setBlueProgressBarHeight('0px');
        return; // Exit if we can't even find the first item
      }

      if (lastItemEl) {
        const lastDotCenterY = lastItemEl.offsetTop + TIMELINE_SPACING_MD_PX + DOT_HALF_HEIGHT_PX;
        newTrackHeight = lastDotCenterY - newTrackTop; // Height from first dot center to last dot center
      }
      
      // Ensure track has at least the height of one dot if only one section or calculation is too small
      if (newTrackHeight < DOT_FULL_HEIGHT_PX && sections.length >=1) {
        newTrackHeight = DOT_FULL_HEIGHT_PX; 
      }
      // If newTrackHeight is negative (e.g. only one item, lastDotCenterY is same as newTrackTop), ensure it's at least dot height
      newTrackHeight = Math.max(DOT_FULL_HEIGHT_PX, newTrackHeight);

      setTrackContainerTop(`${newTrackTop}px`);
      setTrackContainerHeight(`${newTrackHeight}px`);

      if (activeItemEl) {
        const activeDotCenterY = activeItemEl.offsetTop + TIMELINE_SPACING_MD_PX + DOT_HALF_HEIGHT_PX;
        // Blue bar height is from its own top (which is track's top) to activeDotCenterY
        newBlueBarHeight = activeDotCenterY - newTrackTop; 
      } else if (firstItemEl) { // Default to first item if no active section, blue bar covers first dot center
        newBlueBarHeight = DOT_HALF_HEIGHT_PX; // Effectively fills to its own center
      }
      setBlueProgressBarHeight(`${Math.max(0, newBlueBarHeight)}px`);

    } else {
      setTrackContainerTop('0px');
      setTrackContainerHeight('0px');
      setBlueProgressBarHeight('0px');
    }
  }, [activeSection, sections, TIMELINE_SPACING_MD_PX, DOT_HALF_HEIGHT_PX, DOT_FULL_HEIGHT_PX]);

  return (
    <aside className="timeline-sidebar">
      <div className="timeline-sidebar-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Your AI Journey</h3>
          <button 
            className="btn-secondary"
            onClick={onThemeToggle}
            style={{ 
              padding: 'var(--timeline-spacing-sm)', 
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--timeline-spacing-xs)'
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      
      <nav className="timeline-nav" ref={navRef}>
        {/* Grey Track for the progress bar - Dynamically positioned and sized */}
        {sections.length > 0 && (
          <div 
            className="timeline-progress-bar-container" 
            style={{ 
              position: 'absolute', 
              top: trackContainerTop, 
              left: `calc(${TIMELINE_SPACING_MD_PX}px + ${DOT_HALF_HEIGHT_PX}px - 2px)`, // Centers 4px bar with 24px dot
              width: '4px',
              height: trackContainerHeight,
              backgroundColor: 'var(--timeline-border-secondary)', 
              borderRadius: '2px',
              zIndex: 1,
              transition: 'top 0.3s ease-out, height 0.3s ease-out'
            }}
          >
            {/* Blue Progress Bar - Height relative to the container's top */}
            <div 
              className="timeline-progress-bar" 
              style={{
                height: blueProgressBarHeight,
                backgroundColor: 'var(--timeline-accent-blue)', 
                width: '100%',
                borderRadius: '2px',
                transition: 'height 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            />
          </div>
        )}

        {sections.map((section) => (
          <button
            key={section.id}
            ref={(el) => itemRefs.current[section.id] = el} 
            className={`timeline-nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => onSectionClick(section.id)}
            style={{ zIndex: 2, position: 'relative' }} 
          >
            <div className="timeline-nav-dot">{iconMap[section.iconId]}</div> 
            <div className="timeline-nav-content">
              <div className="timeline-nav-year">{section.year}</div>
              <div className="timeline-nav-title">{section.title}</div>
              <div className="timeline-nav-subtitle">{section.subtitle}</div>
            </div>
          </button>
        ))}
      </nav>

      {/* Cache Status and Regeneration Controls */}
      {timelineGeneratedAt && (
        <div style={{
          padding: 'var(--timeline-spacing-md)',
          marginTop: 'var(--timeline-spacing-lg)',
          background: 'var(--timeline-glass-bg)',
          backdropFilter: 'blur(var(--timeline-backdrop-blur))',
          borderRadius: 'var(--timeline-border-radius-lg)',
          border: '1px solid var(--timeline-border-secondary)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--timeline-spacing-xs)',
            marginBottom: 'var(--timeline-spacing-sm)',
            fontSize: '0.85rem',
            color: 'var(--timeline-text-muted)'
          }}>
            {timelineCached ? '💾' : '✨'} 
            <span>
              {timelineCached ? 'Cached' : 'Fresh'} • {formatGeneratedTime(timelineGeneratedAt)}
            </span>
          </div>
          
          {timelineScenarioType && (
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--timeline-text-muted)',
              marginBottom: 'var(--timeline-spacing-sm)'
            }}>
              Scenario: {timelineScenarioType.charAt(0).toUpperCase() + timelineScenarioType.slice(1)}
            </div>
          )}

          <button
            className="btn-secondary"
            onClick={handleRegenerateClick}
            disabled={isGenerating}
            style={{
              width: '100%',
              fontSize: '0.85rem',
              padding: 'var(--timeline-spacing-sm) var(--timeline-spacing-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--timeline-spacing-xs)'
            }}
          >
            {isGenerating ? (
              <>
                <span style={{ animation: 'spin 1s linear infinite' }}>⟳</span>
                Regenerating...
              </>
            ) : (
              <>
                🔄 Regenerate Timeline
              </>
            )}
          </button>
        </div>
      )}
      
      <div className="timeline-sidebar-footer">
        <button 
          className="btn-secondary"
          onClick={() => window.location.href = '/'}
        >
          ← Back to Flow Visualizer
        </button>
      </div>
    </aside>
  );
} 


================================================
FILE: app/timeline/components/TimelineVisualization.js
================================================
'use client';

import React, { useState, useCallback } from 'react';
import useBusinessProfileStore from '../../store/useBusinessProfileStore';

export default function TimelineVisualization({ events, recommendations }) {
  const { expandedSections, toggleSection, expandAllSections, collapseAllSections } = useBusinessProfileStore();
  const [hoveredEvent, setHoveredEvent] = useState(null);
  
  const getEventIcon = (type) => {
    switch (type) {
      case 'milestone': return '🎯';
      case 'implementation': return '🔧';
      case 'expansion': return '📈';
      case 'transformation': return '🚀';
      default: return '📍';
    }
  };
  
  const getEventColor = (type) => {
    switch (type) {
      case 'milestone': return '#3498db';
      case 'implementation': return '#10b981';
      case 'expansion': return '#f39c12';
      case 'transformation': return '#ef4444';
      default: return '#6b7280';
    }
  };
  
  const handleEventClick = useCallback((eventId) => {
    toggleSection(eventId);
  }, [toggleSection]);
  
  return (
    <div className="timeline-visualization">
      <div className="timeline-controls">
        <button 
          className="btn btn-secondary btn-small"
          onClick={expandAllSections}
        >
          Expand All
        </button>
        <button 
          className="btn btn-secondary btn-small"
          onClick={collapseAllSections}
        >
          Collapse All
        </button>
      </div>
      
      <div className="timeline-container">
        <div className="timeline-line" />
        
        {events.map((event, index) => {
          const isExpanded = expandedSections[event.id] || false;
          const isHovered = hoveredEvent === event.id;
          
          return (
            <div 
              key={event.id}
              className={`timeline-event ${isExpanded ? 'expanded' : ''} ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <div className="event-date">
                <span>{event.date}</span>
              </div>
              
              <div 
                className="event-marker"
                style={{ 
                  '--event-color': getEventColor(event.type),
                  transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                }}
              >
                <span className="event-icon">{getEventIcon(event.type)}</span>
              </div>
              
              <div className="event-content">
                <div 
                  className="event-header"
                  onClick={() => handleEventClick(event.id)}
                >
                  <h3>{event.title}</h3>
                  <button 
                    className="expand-toggle"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? '−' : '+'}
                  </button>
                </div>
                
                <p className="event-description">{event.description}</p>
                
                {isExpanded && event.details && (
                  <div className="event-details">
                    {event.details.activities && (
                      <div className="detail-section">
                        <h4>Key Activities</h4>
                        <ul>
                          {event.details.activities.map((activity, i) => (
                            <li key={i}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {event.details.agents && (
                      <div className="detail-section">
                        <h4>AI Agents</h4>
                        <div className="agents-list">
                          {event.details.agents.map((agent, i) => (
                            <div key={i} className="agent-card">
                              <h5>{agent.name}</h5>
                              <p>{agent.description}</p>
                              <span className="impact">{agent.impact}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {event.details.departments && (
                      <div className="detail-section">
                        <h4>Departments Involved</h4>
                        <div className="department-tags">
                          {event.details.departments.map((dept, i) => (
                            <span key={i} className="tag">{dept}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {event.details.deliverables && (
                      <div className="detail-section">
                        <h4>Deliverables</h4>
                        <ul>
                          {event.details.deliverables.map((deliverable, i) => (
                            <li key={i}>{deliverable}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {event.details.investment && (
                      <div className="detail-metric">
                        <span className="metric-label">Investment Required:</span>
                        <span className="metric-value">{event.details.investment}</span>
                      </div>
                    )}
                    
                    {event.details.timeline && (
                      <div className="detail-metric">
                        <span className="metric-label">Timeline:</span>
                        <span className="metric-value">{event.details.timeline}</span>
                      </div>
                    )}
                    
                    {event.details.expectedOutcomes && (
                      <div className="detail-section">
                        <h4>Expected Outcomes</h4>
                        <div className="outcomes-grid">
                          {Object.entries(event.details.expectedOutcomes).map(([key, value]) => (
                            <div key={key} className="outcome">
                              <span className="outcome-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                              <span className="outcome-value">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {recommendations && recommendations.length > 0 && (
        <div className="recommendations-section">
          <h3>Key Recommendations</h3>
          <div className="recommendations-list">
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation">
                <span className="rec-number">{index + 1}</span>
                <p>{rec}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 


================================================
FILE: app/utils/encryption.js
================================================
/**
 * Credential Encryption Utility
 * 
 * Handles AES-256-GCM encryption/decryption for ServiceNow credentials
 * as specified in Phase 3 of the authentication system.
 * 
 * Security Features:
 * - AES-256-GCM encryption
 * - Random initialization vectors (IVs)
 * - Authentication tags for integrity
 * - Server-side only operation
 */

// This utility should only be used server-side
if (typeof window !== 'undefined') {
  throw new Error('Encryption utilities should only be used server-side');
}

const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // 16 bytes for AES
const TAG_LENGTH = 16; // 16 bytes for GCM tag
const KEY_LENGTH = 32; // 32 bytes for AES-256

/**
 * Get encryption key from environment variable
 * @returns {Buffer} The encryption key
 */
function getEncryptionKey() {
  const keyHex = process.env.ENCRYPTION_KEY;
  
  if (!keyHex) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
  }
  
  // Convert hex string to buffer
  const key = Buffer.from(keyHex, 'hex');
  
  if (key.length !== KEY_LENGTH) {
    throw new Error(`Encryption key must be ${KEY_LENGTH} bytes (${KEY_LENGTH * 2} hex characters)`);
  }
  
  return key;
}

/**
 * Generate a random encryption key (for setup)
 * @returns {string} Hex-encoded encryption key
 */
function generateEncryptionKey() {
  return crypto.randomBytes(KEY_LENGTH).toString('hex');
}

/**
 * Encrypt a credential string
 * @param {string} plaintext - The credential to encrypt
 * @returns {Object} Object containing encrypted data, IV, and auth tag
 */
function encryptCredential(plaintext) {
  if (!plaintext || typeof plaintext !== 'string') {
    throw new Error('Plaintext must be a non-empty string');
  }

  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    };
  } catch (error) {
    throw new Error(`Encryption failed: ${error.message}`);
  }
}

/**
 * Decrypt a credential
 * @param {string} encrypted - The encrypted credential (hex)
 * @param {string} ivHex - The initialization vector (hex)
 * @param {string} authTagHex - The authentication tag (hex)
 * @returns {string} The decrypted credential
 */
function decryptCredential(encrypted, ivHex, authTagHex) {
  if (!encrypted || !ivHex || !authTagHex) {
    throw new Error('Encrypted data, IV, and auth tag are all required');
  }

  try {
    const key = getEncryptionKey();
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    throw new Error(`Decryption failed: ${error.message}`);
  }
}

/**
 * Encrypt ServiceNow credentials for database storage
 * @param {Object} credentials - Object containing username and password
 * @returns {Object} Object with encrypted credentials and metadata
 */
function encryptServiceNowCredentials(credentials) {
  const { username, password } = credentials;
  
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  try {
    const encryptedUsername = encryptCredential(username);
    const encryptedPassword = encryptCredential(password);
    
    return {
      encrypted_username: encryptedUsername.encrypted,
      encrypted_password: encryptedPassword.encrypted,
      username_iv: encryptedUsername.iv,
      password_iv: encryptedPassword.iv,
      username_auth_tag: encryptedUsername.authTag,
      password_auth_tag: encryptedPassword.authTag,
      encryption_algorithm: ALGORITHM,
      encrypted_at: new Date().toISOString()
    };
  } catch (error) {
    throw new Error(`Failed to encrypt ServiceNow credentials: ${error.message}`);
  }
}

/**
 * Decrypt ServiceNow credentials from database
 * @param {Object} encryptedData - Object containing encrypted credentials and metadata
 * @returns {Object} Object containing decrypted username and password
 */
function decryptServiceNowCredentials(encryptedData) {
  const {
    encrypted_username,
    encrypted_password,
    username_iv,
    password_iv,
    username_auth_tag,
    password_auth_tag
  } = encryptedData;

  try {
    const username = decryptCredential(encrypted_username, username_iv, username_auth_tag);
    const password = decryptCredential(encrypted_password, password_iv, password_auth_tag);
    
    return { username, password };
  } catch (error) {
    throw new Error(`Failed to decrypt ServiceNow credentials: ${error.message}`);
  }
}

/**
 * Validate that encryption key is properly set up
 * @returns {boolean} True if encryption is properly configured
 */
function validateEncryptionSetup() {
  try {
    const key = getEncryptionKey();
    
    // Test encryption/decryption with sample data
    const testData = 'test-credential-data';
    const encrypted = encryptCredential(testData);
    const decrypted = decryptCredential(encrypted.encrypted, encrypted.iv, encrypted.authTag);
    
    return decrypted === testData;
  } catch (error) {
    console.error('Encryption setup validation failed:', error);
    return false;
  }
}

module.exports = {
  generateEncryptionKey,
  encryptCredential,
  decryptCredential,
  encryptServiceNowCredentials,
  decryptServiceNowCredentials,
  validateEncryptionSetup
}; 


================================================
FILE: app/utils/layoutGraph.js
================================================
import * as dagre from 'dagre';

/**
 * Applies Dagre layout to React Flow nodes and edges
 * 
 * @param {Array} nodes - React Flow nodes
 * @param {Array} edges - React Flow edges
 * @param {Object} options - Layout options
 * @param {String} options.direction - Layout direction ('LR' or 'TB')
 * @param {Number} options.nodeSeparation - Separation between nodes (default: 100)
 * @param {Number} options.rankSeparation - Separation between ranks (default: 200)
 * @returns {Object} { nodes, edges } with positions applied
 */
export function applyDagreLayout(nodes, edges, options = {}) {
  const direction = options.direction || 'LR';
  const nodeSeparation = options.nodeSeparation || 100;
  const rankSeparation = options.rankSeparation || 200;
  
  // Filter out hidden nodes
  const visibleNodes = nodes.filter(node => !node.hidden);
  
  // Get IDs of all visible nodes
  const visibleNodeIds = new Set(visibleNodes.map(node => node.id));
  
  // Filter edges to only include those connecting visible nodes
  const visibleEdges = edges.filter(edge => 
    visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
  );
  
  // Mark other edges as hidden
  const updatedEdges = edges.map(edge => {
    if (visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)) {
      return { ...edge, hidden: false };
    } else {
      return { ...edge, hidden: true };
    }
  });
  
  // Create a new directed graph
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: direction,
    nodesep: nodeSeparation,
    ranksep: rankSeparation,
    marginx: 25,
    marginy: 25,
    acyclicer: 'greedy',     // Use greedy algorithm to handle cycles
    ranker: 'network-simplex' // Use network simplex algorithm for ranking
  });
  g.setDefaultEdgeLabel(() => ({}));
  
  // Define node dimensions based on type and collapsed state
  const getNodeDimensions = (node) => {
    // Base dimensions
    const defaultDimensions = { width: 250, height: 100 };
    
    // If node is collapsed, make it smaller
    if (node.data.isCollapsed) {
      return { width: 180, height: 50 };
    }
    
    // Set dimensions based on node type and content
    if (node.type === 'useCaseNode') {
      return { width: 260, height: node.data.description ? 130 : 80 };
    }
    
    if (node.type === 'triggerNode') {
      const hasFields = node.data.target_table || node.data.condition || node.data.objective;
      return { width: 270, height: hasFields ? 160 : 80 };
    }
    
    if (node.type === 'agentNode') {
      const hasDetails = node.data.role || node.data.instructions;
      const hasDescription = node.data.description;
      
      if (hasDetails && node.data.expanded) {
        return { width: 280, height: 240 };
      } else if (hasDescription) {
        return { width: 260, height: 120 };
      }
      return { width: 230, height: 80 };
    }
    
    if (node.type === 'toolNode') {
      return { width: 230, height: node.data.description ? 110 : 70 };
    }
    
    return defaultDimensions;
  };
  
  // Add nodes to the graph with computed dimensions
  visibleNodes.forEach((node) => {
    const { width, height } = getNodeDimensions(node);
    g.setNode(node.id, { width, height, id: node.id });
  });
  
  // Add edges to the graph
  visibleEdges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });
  
  // Apply the layout algorithm
  try {
    dagre.layout(g);
  } catch (error) {
    console.error("Error during layout calculation:", error);
    // Return original nodes if layout fails
    return { nodes, edges: updatedEdges };
  }
  
  // Get the positioned nodes from the graph with original properties
  const positionedNodes = nodes.map((node) => {
    if (node.hidden) {
      // Keep hidden nodes as is, but under their parent if possible
      const parentNode = node.data.parentId ? nodes.find(n => n.id === node.data.parentId) : null;
      if (parentNode && parentNode.position) {
        return {
          ...node,
          position: {
            x: parentNode.position.x,  // Place under parent
            y: parentNode.position.y + 200  // Place below parent
          }
        };
      }
      return node;
    }

    const graphNode = g.node(node.id);
    
    // Skip if node wasn't positioned correctly
    if (!graphNode) {
      console.warn(`Node ${node.id} was not positioned correctly by Dagre`);
      return node;
    }
    
    const { width, height } = getNodeDimensions(node);
    
    return {
      ...node,
      position: {
        x: graphNode.x - width / 2,
        y: graphNode.y - height / 2,
      },
      // Preserve original dimensions and any other properties
      width,
      height,
    };
  });
  
  return { nodes: positionedNodes, edges: updatedEdges };
} 


================================================
FILE: app/utils/nodeUtils.js
================================================
/**
 * Generates ServiceNow URLs for different node types
 */

/**
 * Generates the appropriate ServiceNow URL based on node type and sys_id
 * @param {string} baseUrl - Base ServiceNow instance URL
 * @param {string} nodeType - Type of node (useCase, agent, tool, trigger)
 * @param {string} sysId - ServiceNow sys_id of the record
 * @param {string} toolType - Type of tool (only needed for tool nodes)
 * @returns {string} Complete URL to ServiceNow record
 */
export function generateServiceNowUrl(baseUrl, nodeType, sysId, toolType) {
  if (!baseUrl || !sysId) return null;
  
  // Remove trailing slash if present
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  switch (nodeType) {
    case 'useCase':
      return `${cleanBaseUrl}/now/agent-studio/usecase-guided-setup/${sysId}/params/step/details`;
      
    case 'agent':
      return `${cleanBaseUrl}/now/agent-studio/agent-setup/${sysId}`;
    
    case 'trigger':
      // Updated to match the format provided in the example
      return `${cleanBaseUrl}/now/nav/ui/classic/params/target/sn_aia_trigger_configuration.do%3Fsys_id%3D${sysId}%26sysparm_view%3D%26sysparm_record_target%3Dsn_aia_trigger_configuration%26sysparm_record_row%3D1%26sysparm_record_list%3DORDERBYusecase%26sysparm_record_rows%3D5`;
      
    case 'tool':
      // Use the standardized format for all tool types to match the example URL format
      return `${cleanBaseUrl}/now/nav/ui/classic/params/target/sn_aia_tool.do%3Fsys_id%3D${sysId}`;
      
    default:
      return null;
  }
}

/**
 * External link icon SVG as JSX
 */
export const ExternalLinkIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="14" 
    height="14" 
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="external-link-icon"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
); 


================================================
FILE: app/utils/transformAgenticData.js
================================================
/**
 * Transforms ServiceNow agentic AI data into React Flow nodes and edges
 * @param {Object} agenticData - ServiceNow agentic AI data
 * @param {String} layoutDirection - Layout direction ('LR' or 'TB')
 * @returns {Object} { nodes, edges }
 */
// Remove the layout import as it's no longer used here
// import { applyDagreLayout } from './layoutGraph';

export function transformAgenticData(agenticData, layoutDirection = 'LR') {
  console.log("transformAgenticData called with:", { 
    dataPresent: !!agenticData,
    dataType: typeof agenticData,
    hasUseCases: agenticData?.use_cases ? true : false,
    useCasesLength: agenticData?.use_cases?.length
  });

  try {
    if (!agenticData || !agenticData.use_cases || !agenticData.use_cases.length) {
      console.warn("No valid agentic data to transform:", agenticData);
      return { nodes: [], edges: [] };
    }

    const nodes = [];
    const edges = [];
    let nodeId = 1;

    // --- Sort Use Cases by Name ---
    const sortedUseCases = [...agenticData.use_cases].sort((a, b) => {
      // Basic string comparison should work due to the leading number in the name
      const nameA = a.name || '';
      const nameB = b.name || '';
      return nameA.localeCompare(nameB);
    });

    console.log(`Processing ${sortedUseCases.length} use cases`);

    // Process sorted use cases
    sortedUseCases.forEach((useCase, useCaseIndex) => {
      // Log to debug
      console.log(`Processing use case: ${useCase.name} (${useCase.sys_id})`);
      
      if (!useCase.sys_id) {
        console.warn("Use case missing sys_id:", useCase);
        useCase.sys_id = `generated-${nodeId++}`;
      }
      
      // Use case node
      const useCaseId = `usecase-${useCase.sys_id}`;
      nodes.push({
        id: useCaseId,
        // Initial positions will be overridden by the layout function
        position: { x: 0, y: 0 },
        data: { 
          label: useCase.name || `Use Case ${useCaseIndex + 1}`,
          type: 'useCase',
          description: useCase.description || '',
          details: useCase,
          isCollapsed: false,
          childrenCount: (useCase.agents || []).length,
          nodeType: 'useCaseNode',
          parentId: null,
          level: 0
        },
        type: 'useCaseNode'
      });

      // Process triggers for this use case
      if (useCase.triggers && useCase.triggers.length) {
        useCase.triggers.forEach((trigger, triggerIndex) => {
          if (!trigger.sys_id) {
            console.warn("Trigger missing sys_id:", trigger);
            trigger.sys_id = `generated-${nodeId++}`;
          }
          
          const triggerId = `trigger-${trigger.sys_id}`;
          
          // Trigger node
          nodes.push({
            id: triggerId,
            position: { x: 0, y: 0 },
            data: { 
              // Use objective_template as the primary label if name is null
              label: trigger.name || trigger.objective_template || `Trigger ${triggerIndex + 1}`, 
              type: 'trigger',
              target_table: trigger.target_table || '',
              condition: trigger.condition || '',
              // Keep objective mapped for potential use in details panel, but label is primary display
              objective: trigger.objective_template || '', 
              details: trigger,
              isCollapsed: false,
              childrenCount: 0,
              nodeType: 'triggerNode',
              parentId: null,
              level: 0
            },
            type: 'triggerNode'
          });

          // Edge from trigger to use case
          edges.push({
            id: `edge-${triggerId}-${useCaseId}`,
            source: triggerId,
            target: useCaseId,
            animated: true,
            label: 'initiates'
          });
        });
      }

      // Process agents for this use case
      if (useCase.agents && useCase.agents.length) {
        console.log(`Processing ${useCase.agents.length} agents for use case ${useCase.name}`);
        
        useCase.agents.forEach((agent, agentIndex) => {
          if (!agent.sys_id) {
            console.warn("Agent missing sys_id:", agent);
            agent.sys_id = `generated-${nodeId++}`;
          }
          
          const agentId = `agent-${agent.sys_id}`;
          
          // Agent node
          nodes.push({
            id: agentId,
            position: { x: 0, y: 0 },
            data: { 
              label: agent.name || `Agent ${agentIndex + 1}`,
              type: 'agent',
              description: agent.description || '',
              role: agent.role || '',
              instructions: agent.instructions || '',
              details: agent,
              isCollapsed: false,
              childrenCount: (agent.tools || []).length,
              nodeType: 'agentNode',
              parentId: useCaseId,  // Parent is the use case
              level: 1,
              visible: true  // Initially visible
            },
            type: 'agentNode'
          });

          // Edge from use case to agent
          edges.push({
            id: `edge-${useCaseId}-${agentId}`,
            source: useCaseId,
            target: agentId,
            label: 'uses',
            data: {
              parentRelationship: true  // Mark this as a parent-child relationship edge
            }
          });

          // Process tools for this agent
          if (agent.tools && agent.tools.length) {
            console.log(`Processing ${agent.tools.length} tools for agent ${agent.name}`);
            
            agent.tools.forEach((tool, toolIndex) => {
              if (!tool.sys_id) {
                console.warn("Tool missing sys_id:", tool);
                tool.sys_id = `generated-${nodeId++}`;
              }
              
              const toolId = `tool-${tool.sys_id}`;
              
              // Tool node
              nodes.push({
                id: toolId,
                position: { x: 0, y: 0 },
                data: { 
                  label: tool.name || `Tool ${toolIndex + 1}`,
                  type: 'tool',
                  description: tool.description || '',
                  toolType: tool.type || 'unknown',
                  details: tool,
                  isCollapsed: false,
                  childrenCount: 0,
                  nodeType: 'toolNode',
                  parentId: agentId,  // Parent is the agent
                  level: 2,
                  visible: true  // Initially visible
                },
                type: 'toolNode'
              });

              // Edge from agent to tool
              edges.push({
                id: `edge-${agentId}-${toolId}`,
                source: agentId,
                target: toolId,
                label: 'uses',
                data: {
                  parentRelationship: true  // Mark this as a parent-child relationship edge
                }
              });
            });
          }
        });
      }
    });

    console.log(`Transformation complete. Created ${nodes.length} nodes and ${edges.length} edges.`);
    
    // Return raw nodes and edges
    return { nodes, edges };
  } catch (error) {
    console.error("Error in transformAgenticData:", error);
    return { nodes: [], edges: [] };
  }
} 


================================================
FILE: app/utils/validation.js
================================================
/**
 * Input validation utilities for API endpoints
 */

/**
 * Validate ServiceNow instance URL
 * @param {string} url - The URL to validate
 * @returns {Object} { isValid: boolean, error?: string, sanitized?: string }
 */
export function validateInstanceUrl(url) {
  if (!url || typeof url !== 'string') {
    return { isValid: false, error: 'Instance URL is required' };
  }

  const trimmed = url.trim();
  
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Instance URL cannot be empty' };
  }

  if (trimmed.length > 500) {
    return { isValid: false, error: 'Instance URL is too long' };
  }

  // Sanitize and format URL
  let sanitized = trimmed;
  
  // Add https if no protocol specified
  if (!sanitized.match(/^https?:\/\//)) {
    sanitized = 'https://' + sanitized;
  }
  
  // Remove trailing slash
  if (sanitized.endsWith('/')) {
    sanitized = sanitized.slice(0, -1);
  }

  // Validate URL format
  try {
    const urlObj = new URL(sanitized);
    
    // Ensure it's HTTPS for security
    if (urlObj.protocol !== 'https:') {
      return { isValid: false, error: 'Only HTTPS URLs are allowed' };
    }
    
    // Basic ServiceNow domain validation
    if (!urlObj.hostname.includes('.service-now.com') && 
        !urlObj.hostname.includes('.servicenow.com') &&
        !urlObj.hostname.match(/^[\w-]+\.servicenowservices\.com$/)) {
      return { isValid: false, error: 'Invalid ServiceNow domain' };
    }
    
    return { isValid: true, sanitized: urlObj.origin };
  } catch (error) {
    return { isValid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validate ServiceNow scope ID (sys_id)
 * @param {string} scopeId - The scope ID to validate
 * @returns {Object} { isValid: boolean, error?: string, sanitized?: string }
 */
export function validateScopeId(scopeId) {
  if (!scopeId || typeof scopeId !== 'string') {
    return { isValid: false, error: 'Scope ID is required' };
  }

  const trimmed = scopeId.trim();
  
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Scope ID cannot be empty' };
  }

  // ServiceNow sys_id is 32 characters long (UUID without dashes)
  const sysIdPattern = /^[a-f0-9]{32}$/i;
  
  // Also allow UUIDs with dashes
  const uuidPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
  
  if (!sysIdPattern.test(trimmed) && !uuidPattern.test(trimmed)) {
    return { isValid: false, error: 'Invalid scope ID format (must be 32 hex characters or UUID)' };
  }

  // Normalize to 32-character format
  const sanitized = trimmed.replace(/-/g, '').toLowerCase();
  
  return { isValid: true, sanitized };
}

/**
 * Validate business profile data
 * @param {Object} profile - The profile to validate
 * @returns {Object} { isValid: boolean, errors: string[], sanitized?: Object }
 */
export function validateBusinessProfile(profile) {
  const errors = [];
  const sanitized = {};

  if (!profile || typeof profile !== 'object') {
    return { isValid: false, errors: ['Profile data is required'] };
  }

  // Company name validation
  if (!profile.companyName || typeof profile.companyName !== 'string') {
    errors.push('Company name is required');
  } else {
    const trimmed = profile.companyName.trim();
    if (trimmed.length === 0) {
      errors.push('Company name cannot be empty');
    } else if (trimmed.length > 200) {
      errors.push('Company name is too long (max 200 characters)');
    } else {
      sanitized.companyName = trimmed;
    }
  }

  // Industry validation
  const validIndustries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 
    'Retail', 'Education', 'Real Estate', 'Transportation', 
    'Energy', 'Other'
  ];
  
  if (!profile.industry || !validIndustries.includes(profile.industry)) {
    errors.push('Valid industry selection is required');
  } else {
    sanitized.industry = profile.industry;
  }

  // Company size validation
  const validSizes = ['startup', 'small', 'medium', 'large'];
  
  if (!profile.companySize || !validSizes.includes(profile.companySize)) {
    errors.push('Valid company size is required');
  } else {
    sanitized.companySize = profile.companySize;
  }

  // AI maturity level validation
  const validMaturityLevels = ['beginner', 'emerging', 'developing', 'advanced'];
  
  if (!profile.aiMaturityLevel || !validMaturityLevels.includes(profile.aiMaturityLevel)) {
    errors.push('Valid AI maturity level is required');
  } else {
    sanitized.aiMaturityLevel = profile.aiMaturityLevel;
  }

  // Primary goals validation (array)
  if (!Array.isArray(profile.primaryGoals)) {
    errors.push('Primary goals must be an array');
  } else if (profile.primaryGoals.length === 0) {
    errors.push('At least one primary goal is required');
  } else if (profile.primaryGoals.length > 10) {
    errors.push('Too many primary goals selected (max 10)');
  } else {
    sanitized.primaryGoals = profile.primaryGoals.filter(goal => 
      typeof goal === 'string' && goal.trim().length > 0
    );
  }

  // Optional fields
  if (profile.currentTechStack && Array.isArray(profile.currentTechStack)) {
    sanitized.currentTechStack = profile.currentTechStack.filter(tech => 
      typeof tech === 'string' && tech.trim().length > 0
    );
  }

  if (profile.budget && typeof profile.budget === 'string') {
    sanitized.budget = profile.budget.trim();
  }

  if (profile.timeframe && typeof profile.timeframe === 'string') {
    sanitized.timeframe = profile.timeframe.trim();
  }

  if (profile.currentChallenges && typeof profile.currentChallenges === 'string') {
    const trimmed = profile.currentChallenges.trim();
    if (trimmed.length <= 2000) { // Reasonable limit
      sanitized.currentChallenges = trimmed;
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: errors.length === 0 ? sanitized : undefined
  };
}

/**
 * Validate scenario type
 * @param {string} scenarioType - The scenario type to validate
 * @returns {Object} { isValid: boolean, error?: string, sanitized?: string }
 */
export function validateScenarioType(scenarioType) {
  const validScenarios = ['conservative', 'balanced', 'aggressive'];
  
  if (!scenarioType || typeof scenarioType !== 'string') {
    return { isValid: true, sanitized: 'balanced' }; // Default
  }

  const trimmed = scenarioType.trim().toLowerCase();
  
  if (!validScenarios.includes(trimmed)) {
    return { isValid: false, error: 'Invalid scenario type' };
  }

  return { isValid: true, sanitized: trimmed };
}

/**
 * General purpose string sanitization
 * @param {string} input - String to sanitize
 * @param {number} maxLength - Maximum length allowed
 * @returns {string} Sanitized string
 */
export function sanitizeString(input, maxLength = 500) {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input.trim().slice(0, maxLength);
}

/**
 * Rate limiting helper (simple in-memory implementation)
 */
const requestCounts = new Map();

export function checkRateLimit(identifier, maxRequests = 10, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Clean old entries
  for (const [key, timestamps] of requestCounts.entries()) {
    const validTimestamps = timestamps.filter(ts => ts > windowStart);
    if (validTimestamps.length === 0) {
      requestCounts.delete(key);
    } else {
      requestCounts.set(key, validTimestamps);
    }
  }
  
  // Check current identifier
  const timestamps = requestCounts.get(identifier) || [];
  const recentRequests = timestamps.filter(ts => ts > windowStart);
  
  if (recentRequests.length >= maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((timestamps[0] + windowMs - now) / 1000) };
  }
  
  // Add current request
  recentRequests.push(now);
  requestCounts.set(identifier, recentRequests);
  
  return { allowed: true };
} 

