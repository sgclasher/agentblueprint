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
