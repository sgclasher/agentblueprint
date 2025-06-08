Directory structure:
└── sgclasher-agentblueprint/
    ├── README.md
    ├── AI_INTEGRATION_SETUP.md
    ├── best-practice-instructions.md
    ├── CLIENT_PROFILE_SYSTEM.md
    ├── COMPREHENSIVE_TESTING_CHECKLIST.md
    ├── ENVIRONMENT_SETUP.md
    ├── instructions.md
    ├── jest.config.js
    ├── jest.setup.js
    ├── MODULAR_FORMS_COMPLETE.md
    ├── MVP_TESTING_SUMMARY.md
    ├── next-env.d.ts
    ├── next.config.js
    ├── package.json
    ├── project-summary.md
    ├── SUPABASE_SETUP.md
    ├── tsconfig.json
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
    │   │       │   └── route.ts
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
    │   │   │   ├── FlowCanvas.tsx
    │   │   │   ├── SelectedNodePanel.module.css
    │   │   │   └── SelectedNodePanel.tsx
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
    │   │   ├── rate-limiting-schema.sql
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
    │   │           ├── claudeServerProvider.js
    │   │           ├── claudeServerProvider.ts
    │   │           ├── openaiServerProvider.js
    │   │           └── openaiServerProvider.ts
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
    │   │   ├── credentialsRepository.ts
    │   │   ├── profileRepository.js
    │   │   └── profileRepository.ts
    │   ├── services/
    │   │   ├── aiService.js
    │   │   ├── aiService.ts
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
    │   │   ├── Timeline.module.css
    │   │   └── components/
    │   │       ├── BusinessProfileForm.js
    │   │       ├── BusinessProfileModal.js
    │   │       ├── BusinessProfileModal.module.css
    │   │       ├── MetricsCards.js
    │   │       ├── MetricsWidget.js
    │   │       ├── MetricsWidget.module.css
    │   │       ├── ScenarioSelector.js
    │   │       ├── TimelineContent.js
    │   │       ├── TimelineContent.module.css
    │   │       ├── TimelineHeader.js
    │   │       ├── TimelineSidebar.js
    │   │       ├── TimelineSidebar.module.css
    │   │       └── TimelineVisualization.js
    │   └── utils/
    │       ├── encryption.js
    │       ├── layoutGraph.js
    │       ├── nodeUtils.js
    │       ├── transformAgenticData.js
    │       ├── validation.js
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
    ├── .github/
    │   └── workflows/
    │       └── test.yml
    └── .storybook/
        ├── main.ts
        └── preview.ts
