Directory structure:
└── sgclasher-agentblueprint/
    ├── README.md
    ├── AI_INTEGRATION_SETUP.md
    ├── best-practice-instructions.md
    ├── CLIENT_PROFILE_SYSTEM.md
    ├── COMPREHENSIVE_TESTING_CHECKLIST.md
    ├── ENVIRONMENT_SETUP.md
    ├── instructions.md
    ├── jest.config.ts
    ├── jest.setup.ts
    ├── MODULAR_FORMS_COMPLETE.md
    ├── MVP_TESTING_SUMMARY.md
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package.json
    ├── project-summary.md
    ├── SUPABASE_SETUP.md
    ├── tsconfig.json
    ├── .cursorignore
    ├── .cursorrules
    ├── app/
    │   ├── globals.css
    │   ├── Home.module.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── __mocks__/
    │   │   └── @supabase/
    │   │       └── supabase-js.js
    │   ├── __tests__/
    │   │   ├── admin/
    │   │   │   └── fetch-models.test.ts
    │   │   └── features/
    │   │       ├── ai-timeline.test.js
    │   │       ├── client-profiles.test.js
    │   │       ├── google-provider.test.ts
    │   │       ├── manual-test-checklist.md
    │   │       ├── run-all-features.test.js
    │   │       ├── servicenow-flow.test.js
    │   │       ├── simple-smoke-tests.js
    │   │       └── timeline-provider-selection.test.js
    │   ├── admin/
    │   │   ├── Admin.module.css
    │   │   ├── page.tsx
    │   │   ├── types.ts
    │   │   └── components/
    │   │       ├── AddServiceForm.module.css
    │   │       └── AddServiceForm.tsx
    │   ├── api/
    │   │   ├── admin/
    │   │   │   ├── debug-credentials/
    │   │   │   │   └── route.ts
    │   │   │   ├── encrypt-credentials/
    │   │   │   │   └── route.ts
    │   │   │   ├── fetch-models/
    │   │   │   │   └── route.ts
    │   │   │   ├── generate-encryption-key/
    │   │   │   │   └── route.ts
    │   │   │   ├── save-credentials/
    │   │   │   │   └── route.ts
    │   │   │   ├── test-connection/
    │   │   │   │   └── route.ts
    │   │   │   └── test-credentials/
    │   │   │       └── route.ts
    │   │   ├── debug-env/
    │   │   │   └── route.ts
    │   │   ├── servicenow/
    │   │   │   ├── route.ts
    │   │   │   ├── fetch-agentic-data/
    │   │   │   │   └── route.ts
    │   │   │   └── get-credentials/
    │   │   │       └── route.ts
    │   │   ├── test-ai/
    │   │   │   └── route.ts
    │   │   └── timeline/
    │   │       ├── export-pdf/
    │   │       │   └── route.ts
    │   │       ├── generate/
    │   │       │   └── route.ts
    │   │       ├── generate-from-profile/
    │   │       │   ├── route.test.ts
    │   │       │   └── route.ts
    │   │       ├── get-providers/
    │   │       │   └── route.ts
    │   │       └── stream/
    │   │           └── route.ts
    │   ├── auth/
    │   │   ├── Auth.module.css
    │   │   ├── callback/
    │   │   │   └── page.tsx
    │   │   ├── signin/
    │   │   │   └── page.tsx
    │   │   └── signup/
    │   │       └── page.tsx
    │   ├── components/
    │   │   ├── FlowVisualizer.tsx
    │   │   ├── GlobalHeader.tsx
    │   │   ├── NodeIcons.tsx
    │   │   ├── Providers.tsx
    │   │   ├── ServiceNowConnector.tsx
    │   │   ├── auth/
    │   │   │   ├── AuthModal.tsx
    │   │   │   ├── AuthProvider.tsx
    │   │   │   ├── LoginForm.tsx
    │   │   │   ├── SignupForm.tsx
    │   │   │   └── UserMenu.tsx
    │   │   ├── flow/
    │   │   │   ├── FlowCanvas.tsx
    │   │   │   ├── SelectedNodePanel.module.css
    │   │   │   ├── SelectedNodePanel.tsx
    │   │   │   └── types.ts
    │   │   ├── migration/
    │   │   │   └── SupabaseSetupCheck.tsx
    │   │   ├── nodes/
    │   │   │   ├── AgentNode.tsx
    │   │   │   ├── ToolNode.tsx
    │   │   │   ├── TriggerNode.tsx
    │   │   │   └── UseCaseNode.tsx
    │   │   └── theme/
    │   │       └── ThemeProvider.tsx
    │   ├── database/
    │   │   ├── admin-credentials-schema.sql
    │   │   ├── fix-rls-policies-proper.sql
    │   │   ├── fix-rls-policies.sql
    │   │   ├── rate-limiting-schema.sql
    │   │   ├── restore-rls-secure.sql
    │   │   └── schema.sql
    │   ├── hooks/
    │   │   ├── useFlowData.ts
    │   │   ├── useFlowLayout.ts
    │   │   └── useTimeline.ts
    │   ├── lib/
    │   │   ├── debug-supabase.ts
    │   │   ├── DynamicEnvDebugger.js
    │   │   ├── env-check.js
    │   │   ├── supabase.ts
    │   │   └── llm/
    │   │       ├── prompts/
    │   │       │   └── timelinePrompts.ts
    │   │       └── providers/
    │   │           ├── claudeServerProvider.ts
    │   │           ├── googleServerProvider.ts
    │   │           └── openaiServerProvider.ts
    │   ├── profile/
    │   │   └── page.tsx
    │   ├── profiles/
    │   │   ├── page.tsx
    │   │   ├── [id]/
    │   │   │   ├── page.tsx
    │   │   │   ├── ProfileDetail.module.css
    │   │   │   ├── __tests__/
    │   │   │   │   └── page.test.js
    │   │   │   └── edit/
    │   │   │       └── page.tsx
    │   │   └── components/
    │   │       ├── ProblemsOpportunitiesForm.module.css
    │   │       ├── ProblemsOpportunitiesForm.tsx
    │   │       ├── ProfileWizard.module.css
    │   │       ├── ProfileWizard.tsx
    │   │       ├── StrategicInitiativesForm.module.css
    │   │       ├── StrategicInitiativesForm.tsx
    │   │       ├── __tests__/
    │   │       │   └── ProfileWizard.test.js
    │   │       └── steps/
    │   │           ├── AIAssessmentStep.module.css
    │   │           ├── AIAssessmentStep.tsx
    │   │           ├── CompanyOverviewStep.module.css
    │   │           ├── CompanyOverviewStep.tsx
    │   │           ├── DecisionStep.module.css
    │   │           ├── DecisionStep.tsx
    │   │           ├── ImpactStep.module.css
    │   │           ├── ImpactStep.tsx
    │   │           ├── SolutionStep.module.css
    │   │           ├── SolutionStep.tsx
    │   │           ├── SummaryStep.module.css
    │   │           └── SummaryStep.tsx
    │   ├── repositories/
    │   │   ├── credentialsRepository.ts
    │   │   └── profileRepository.ts
    │   ├── services/
    │   │   ├── aiService.ts
    │   │   ├── demoDataService.ts
    │   │   ├── markdownService.ts
    │   │   ├── profileService.ts
    │   │   ├── timelineService.ts
    │   │   ├── types.ts
    │   │   └── __tests__/
    │   │       ├── aiService.test.ts
    │   │       ├── markdownService.test.js
    │   │       └── profileService.test.js
    │   ├── store/
    │   │   ├── useAgenticStore.ts
    │   │   ├── useAuthStore.ts
    │   │   └── useBusinessProfileStore.ts
    │   ├── timeline/
    │   │   ├── README.md
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── timeline.css
    │   │   ├── Timeline.module.css
    │   │   └── components/
    │   │       ├── BusinessProfileForm.tsx
    │   │       ├── BusinessProfileModal.module.css
    │   │       ├── BusinessProfileModal.tsx
    │   │       ├── MetricsCards.tsx
    │   │       ├── MetricsWidget.module.css
    │   │       ├── MetricsWidget.tsx
    │   │       ├── ProviderSelector.module.css
    │   │       ├── ProviderSelector.tsx
    │   │       ├── ScenarioSelector.tsx
    │   │       ├── TimelineContent.module.css
    │   │       ├── TimelineContent.tsx
    │   │       ├── TimelineHeader.tsx
    │   │       ├── TimelinePlaceholder.module.css
    │   │       ├── TimelinePlaceholder.tsx
    │   │       ├── TimelinePDFTemplate.tsx
    │   │       ├── TimelinePDFTemplate.module.css
    │   │       ├── TimelineSidebar.module.css
    │   │       ├── TimelineSidebar.tsx
    │   │       └── TimelineVisualization.tsx
    │   └── utils/
    │       ├── encryption.ts
    │       ├── layoutGraph.ts
    │       ├── nodeUtils.ts
    │       ├── rateLimiter.ts
    │       ├── transformAgenticData.ts
    │       └── validation.ts
    ├── public/
    │   └── images/
    ├── stories/
    │   ├── button.css
    │   ├── Button.stories.ts
    │   ├── Button.tsx
    │   ├── header.css
    │   ├── Header.stories.ts
    │   ├── Header.tsx
    │   ├── page.css
    │   ├── Page.stories.ts
    │   ├── Page.tsx
    │   └── assets/
    │       └── avif-test-image.avif
    └── .github/
        └── workflows/
            └── test.yml

## Key Features Implemented

### ✅ PDF Export for AI Timelines (Latest Feature)
**Professional timeline reports with executive-ready formatting:**
- **PDF Template Component**: `TimelinePDFTemplate.tsx` - React component optimized for PDF generation
- **Print-Optimized Styling**: `TimelinePDFTemplate.module.css` - A4 page layout with professional typography
- **Secure API Endpoint**: `/api/timeline/export-pdf` - Server-side PDF generation using Puppeteer
- **Dual Export UI**: Export buttons in both timeline header and sidebar for user convenience
- **Authentication Integration**: User authentication required for secure PDF generation
- **Intelligent Naming**: Auto-generated filenames with company name and timestamp
- **Comprehensive Coverage**: All timeline phases, initiatives, technologies, outcomes, and risk factors

### ✅ Multi-Provider AI Platform
**Complete AI integration with latest 2025 models:**
- **OpenAI Integration**: GPT-4o, GPT-4.1, o1 series with provider-agnostic architecture
- **Google Gemini**: Latest 2.5 Pro Preview models with JSON response validation
- **Anthropic Claude**: Claude Sonnet 4, Opus 4, and other 2025 models with proper authentication
- **Provider Selection UI**: Dynamic dropdown allowing users to switch between configured providers
- **Credential Management**: Secure, encrypted storage with test-before-save functionality
- **Dynamic Model Refresh**: One-click refresh to fetch latest models from all providers

### ✅ Enterprise-Grade Security & Authentication
**Production-ready security architecture:**
- **Supabase Authentication**: Complete email/password and magic link flows
- **Encrypted Credential Storage**: AES-256-GCM encryption for all external service credentials
- **User-Scoped Data Access**: Application-level authentication with JWT verification
- **Admin Interface**: Comprehensive `/admin` dashboard for credential management
- **Row-Level Security**: Database-level protection for user data isolation

### ✅ AI Timeline Generation with Intelligent Caching
**Real AI-powered business roadmaps:**
- **Database-Backed Caching**: 80-90% cost reduction with instant loading for repeated requests
- **Provider Switching**: Seamless switching between OpenAI, Gemini, and Claude during generation
- **Scenario Planning**: Conservative, Balanced, and Aggressive adoption strategies
- **Industry-Specific Content**: Personalized recommendations based on company profile data
- **Interactive Visualization**: Scroll-based timeline with floating metrics and dynamic progress tracking

### ✅ Comprehensive Client Profile Management
**Structured business intelligence collection:**
- **8-Step ProfileWizard**: Complete business assessment with clickable navigation
- **CRUD Operations**: Full create, read, update, delete functionality for profiles
- **Supabase Integration**: Secure cloud storage with user authentication
- **Demo Data System**: Pre-loaded industry profiles for testing and demonstration
- **Enhanced UX**: Free navigation, visual completion indicators, gentle validation

### ✅ ServiceNow Agentic AI Visualization
**Interactive flow diagrams for AI workflows:**
- **ReactFlow Integration**: Drag, zoom, pan through complex AI agent relationships
- **Hierarchical Data**: Use cases → agents → tools with expand/collapse functionality
- **Dynamic Layouts**: Multiple orientation options with professional styling
- **Real-time Data**: Direct ServiceNow integration with credential management

## Architecture Highlights

### Modern Tech Stack
- **Frontend**: Next.js 14 App Router, React 18, TypeScript, CSS Modules
- **Backend**: Node.js, Supabase (PostgreSQL), RESTful APIs
- **AI Integration**: Provider-agnostic architecture supporting OpenAI, Google, Anthropic
- **PDF Generation**: Puppeteer with server-side rendering and cross-platform compatibility
- **Visualization**: ReactFlow, Dagre.js for automatic graph layout
- **State Management**: Zustand for lightweight, scalable state management

### Production-Ready Features
- **Security**: JWT authentication, encrypted credentials, user-scoped access
- **Performance**: Intelligent caching, rate limiting, optimized database queries
- **Scalability**: Modular architecture, component-based design, API-first approach
- **Testing**: Comprehensive test suite with 15+ passing tests including provider validation
- **Documentation**: Complete README, API reference, and development guidelines

### Enterprise Integration Ready
- **Multi-User Support**: Complete user management with secure data isolation
- **Export Capabilities**: Professional PDF reports suitable for executive presentations
- **API-First Design**: Ready for integration with existing enterprise systems
- **Extensible Architecture**: Easy to add new AI providers, export formats, or data connectors
