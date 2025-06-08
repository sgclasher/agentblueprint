Directory structure:
└── sgclasher-agentblueprint/
    ├── README.md
    ├── AI_INTEGRATION_SETUP.md
    ├── CLIENT_PROFILE_SYSTEM.md
    ├── COMPREHENSIVE_TESTING_CHECKLIST.md
    ├── ENVIRONMENT_SETUP.md
    ├── instructions.md
    ├── jest.config.js
    ├── jest.setup.js
    ├── MODULAR_FORMS_COMPLETE.md
    ├── MVP_TESTING_SUMMARY.md
    ├── next.config.js
    ├── package.json
    ├── project-summary.md
    ├── SUPABASE_SETUP.md
    ├── .cursorignore
    ├── .cursorrules
    ├── app/
    │   ├── globals.css
    │   ├── Home.module.css
    │   ├── layout.js
    │   ├── page.js
    │   ├── __mocks__/
    │   │   └── @supabase/
    │   │       └── supabase-js.js
    │   ├── __tests__/
    │   │   └── features/
    │   │       ├── ai-timeline.test.js
    │   │       ├── client-profiles.test.js
    │   │       ├── manual-test-checklist.md
    │   │       ├── run-all-features.test.js
    │   │       ├── servicenow-flow.test.js
    │   │       └── simple-smoke-tests.js
    │   ├── admin/
    │   │   ├── Admin.module.css
    │   │   ├── page.js
    │   │   └── components/
    │   │       ├── AddServiceForm.js
    │   │       └── AddServiceForm.module.css
    │   ├── api/
    │   │   ├── admin/
    │   │   │   ├── debug-credentials/
    │   │   │   │   └── route.js
    │   │   │   ├── encrypt-credentials/
    │   │   │   │   └── route.js
    │   │   │   ├── generate-encryption-key/
    │   │   │   │   └── route.js
    │   │   │   ├── save-credentials/
    │   │   │   │   └── route.js
    │   │   │   ├── test-connection/
    │   │   │   │   └── route.js
    │   │   │   └── test-credentials/
    │   │   │       └── route.js
    │   │   ├── debug-env/
    │   │   │   └── route.js
    │   │   ├── servicenow/
    │   │   │   ├── route.js
    │   │   │   ├── fetch-agentic-data/
    │   │   │   │   └── route.js
    │   │   │   └── get-credentials/
    │   │   │       └── route.js
    │   │   ├── test-ai/
    │   │   │   └── route.js
    │   │   └── timeline/
    │   │       ├── generate/
    │   │       │   └── route.js
    │   │       ├── generate-from-profile/
    │   │       │   └── route.js
    │   │       └── stream/
    │   │           └── route.js
    │   ├── auth/
    │   │   ├── Auth.module.css
    │   │   ├── callback/
    │   │   │   └── page.js
    │   │   ├── signin/
    │   │   │   └── page.js
    │   │   └── signup/
    │   │       └── page.js
    │   ├── components/
    │   │   ├── FlowVisualizer.js
    │   │   ├── GlobalHeader.js
    │   │   ├── Header.js
    │   │   ├── NodeIcons.js
    │   │   ├── Providers.js
    │   │   ├── ServiceNowConnector.js
    │   │   ├── auth/
    │   │   │   ├── AuthModal.js
    │   │   │   ├── AuthProvider.js
    │   │   │   ├── LoginForm.js
    │   │   │   ├── SignupForm.js
    │   │   │   └── UserMenu.js
    │   │   ├── flow/
    │   │   │   └── FlowCanvas.js
    │   │   ├── migration/
    │   │   │   └── SupabaseSetupCheck.js
    │   │   ├── nodes/
    │   │   │   ├── AgentNode.js
    │   │   │   ├── ToolNode.js
    │   │   │   ├── TriggerNode.js
    │   │   │   └── UseCaseNode.js
    │   │   └── theme/
    │   │       └── ThemeProvider.js
    │   ├── database/
    │   │   ├── admin-credentials-schema.sql
    │   │   ├── fix-rls-policies-proper.sql
    │   │   ├── fix-rls-policies.sql
    │   │   ├── restore-rls-secure.sql
    │   │   └── schema.sql
    │   ├── hooks/
    │   │   ├── useFlowData.js
    │   │   ├── useFlowLayout.js
    │   │   └── useTimeline.js
    │   ├── lib/
    │   │   ├── debug-supabase.js
    │   │   ├── DynamicEnvDebugger.js
    │   │   ├── env-check.js
    │   │   ├── supabase.js
    │   │   └── llm/
    │   │       ├── prompts/
    │   │       │   └── timelinePrompts.js
    │   │       └── providers/
    │   │           └── openaiServerProvider.js
    │   ├── profile/
    │   │   └── page.js
    │   ├── profiles/
    │   │   ├── page.js
    │   │   ├── profile-detail.css
    │   │   ├── [id]/
    │   │   │   ├── page.js
    │   │   │   ├── __tests__/
    │   │   │   │   └── page.test.js
    │   │   │   └── edit/
    │   │   │       └── page.js
    │   │   └── components/
    │   │       ├── ProblemsOpportunitiesForm.js
    │   │       ├── ProfileWizard.js
    │   │       ├── ProfileWizard.module.css
    │   │       ├── StrategicInitiativesForm.js
    │   │       └── __tests__/
    │   │           └── ProfileWizard.test.js
    │   ├── repositories/
    │   │   ├── credentialsRepository.js
    │   │   └── profileRepository.js
    │   ├── services/
    │   │   ├── aiService.js
    │   │   ├── demoDataService.js
    │   │   ├── markdownService.js
    │   │   ├── profileService.js
    │   │   ├── timelineService.js
    │   │   └── __tests__/
    │   │       ├── markdownService.test.js
    │   │       └── profileService.test.js
    │   ├── store/
    │   │   ├── useAgenticStore.js
    │   │   ├── useAuthStore.js
    │   │   └── useBusinessProfileStore.js
    │   ├── timeline/
    │   │   ├── README.md
    │   │   ├── layout.js
    │   │   ├── page.js
    │   │   ├── timeline.css
    │   │   └── components/
    │   │       ├── BusinessProfileForm.js
    │   │       ├── BusinessProfileModal.js
    │   │       ├── MetricsCards.js
    │   │       ├── MetricsWidget.js
    │   │       ├── ScenarioSelector.js
    │   │       ├── TimelineContent.js
    │   │       ├── TimelineHeader.js
    │   │       ├── TimelineSidebar.js
    │   │       └── TimelineVisualization.js
    │   └── utils/
    │       ├── encryption.js
    │       ├── layoutGraph.js
    │       ├── nodeUtils.js
    │       ├── transformAgenticData.js
    │       └── validation.js
    ├── public/
    │   └── images/
    └── .github/
        └── workflows/
            └── test.yml
