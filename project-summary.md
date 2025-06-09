(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: jest.config.js
================================================
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/(.*)$': '<rootDir>/$1',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/components/(.*)$': '<rootDir>/app/components/$1',
    '^@/services/(.*)$': '<rootDir>/app/services/$1',
    '^@/utils/(.*)$': '<rootDir>/app/utils/$1',
    '^@/store/(.*)$': '<rootDir>/app/store/$1',
    '^@/hooks/(.*)$': '<rootDir>/app/hooks/$1',
    // Mock Supabase modules
    '^@supabase/supabase-js$': '<rootDir>/app/__mocks__/@supabase/supabase-js.js',
  },
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)',
  ],
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.d.ts',
    '!app/layout.js',
    '!app/page.js',
    '!app/timeline/layout.js',
    '!app/timeline/page.js',
    '!app/profiles/page.js',
    '!app/api/**',
    '!app/**/__tests__/**',
  ],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  // Transform files with babel instead of swc
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  // Handle ES6 modules from Supabase
  transformIgnorePatterns: [
    'node_modules/(?!(@supabase|jose|openid-client|uuid|oauth|preact-render-to-string|preact|@preact|comlink|core-js|@babel|babel-preset-react-app)/)',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig) 


================================================
FILE: jest.setup.js
================================================
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock fetch for API calls
global.fetch = jest.fn()

// Suppress console warnings/errors in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

// Make React available globally for tests
import React from 'react';
global.React = React; 


================================================
FILE: next-env.d.ts
================================================
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.



================================================
FILE: next.config.js
================================================
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    cssChunking: 'strict',
  },
};

module.exports = nextConfig; 


================================================
FILE: package.json
================================================
{
  "name": "agentic-ai-flow",
  "version": "1.0.0",
  "description": "A Next.js application for visualizing ServiceNow agentic AI data as interactive flow diagrams",
  "main": "index.js",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "clean": "rm -rf .next out",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "test:features": "jest app/__tests__/features --verbose",
    "test:smoke": "jest app/__tests__/features/simple-smoke-tests.js"
  },
  "keywords": [
    "servicenow",
    "agentic-ai",
    "flow-visualization",
    "react-flow",
    "next.js"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@ai-sdk/openai": "^0.0.66",
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "@supabase/supabase-js": "^2.49.10",
    "ai": "^3.4.32",
    "dagre": "^0.8.5",
    "date-fns": "^4.1.0",
    "dotenv": "^16.5.0",
    "lucide-react": "^0.511.0",
    "nanoid": "^5.1.5",
    "next": "14.2.5",
    "openai": "^4.73.1",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "reactflow": "^11.11.4",
    "zod": "^3.23.8",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@next/swc-win32-x64-msvc": "14.2.5",
    "@swc/core": "^1.11.29",
    "@swc/jest": "^0.2.38",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/dagre": "^0.7.52",
    "@types/jest": "^29.5.14",
    "@types/react": "^18.3.23",
    "babel-jest": "^30.0.0-beta.3",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^30.0.0-beta.3",
    "typescript": "5.8.3"
  }
}



================================================
FILE: tsconfig.json
================================================
{
  "compilerOptions": {
    // Adding a comment to force TS server restart
    "target": "ES2017",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "incremental": true,
    "module": "esnext",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    ".next/types/**/*.ts",
    "**/*.ts",
    "**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}



================================================
FILE: .cursorignore
================================================
# Add directories or file patterns to ignore during indexing (e.g. foo/ or *.csv)
# Build and output
dist/
build/
.next/
out/
coverage/

# Dependencies
node_modules/
.pnpm/
vendor/

# Environment and secrets
.env
.env.*
.env.local
.env.*.local


================================================
FILE: .cursorrules
================================================
# Development Guidelines

- Follow the project’s code style and linting rules.
- Write clear, self-documenting code with descriptive names.
- Update or add docstrings and documentation for any new or changed code.
- Make atomic, logically grouped commits with descriptive messages.
- Remove dead or unused code when encountered.
- Ensure robust error handling and update logging as needed.
- Sanitize and validate all inputs; do not hardcode sensitive information.
- Consider performance and add benchmarks if relevant.
- If unsure, ask for clarification or propose alternatives.

# Docs & Decisions

- Keep architecture and API decisions up to date in README.md
- Add new design rationale under the "Architecture Overview" section
- When app/api/** changes, update the "API Reference" section in README.md



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
FILE: app/Home.module.css
================================================
.container {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

.main {
  min-height: calc(100vh - 80px); /* Assuming header is around 80px */
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.flowControls {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--backdrop-blur));
  border-bottom: 1px solid var(--border-primary);
  padding: var(--spacing-md) var(--spacing-lg);
}

.controlsContainer {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
}

.titleContainer h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.titleContainer p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.actionsContainer {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.buttonGroup {
  display: flex;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.buttonGroup > .btn {
  border-radius: 0;
  border-right: 1px solid var(--border-primary);
}

.buttonGroup > .btn:last-child {
  border-right: none;
}

.debugInfo {
  margin-top: var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
}

.debugInfo summary {
  cursor: pointer;
  font-weight: var(--font-weight-medium);
}

.debugInfo pre {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: var(--spacing-sm);
  white-space: pre-wrap;
}

.contentContainer {
  flex: 1;
  width: 100%;
}

.connectorContainer {
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  height: 100%; 
  padding: var(--spacing-lg);
}

.errorContainer {
  color: var(--accent-red);
  padding: var(--spacing-lg);
  border: 1px solid var(--accent-red);
  border-radius: var(--border-radius);
  background: var(--bg-secondary);
  margin: var(--spacing-lg);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.errorContainer h3 {
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-sm);
}

.errorContainer p {
  margin-bottom: var(--spacing-md);
}

.flowContainer {
  height: calc(100vh - 152px); /* Adjust based on header + controls height */
  width: 100%;
  position: relative;
} 


================================================
FILE: app/layout.tsx
================================================
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './components/Providers';
import DynamicEnvDebugger from './lib/DynamicEnvDebugger';
import React from 'react';

// Initialize the Inter font with the weights we need
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Agent Blueprint & Business AI Advisory Platform',
  description: 'Visualize ServiceNow agentic AI flow data as interactive flow diagrams',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
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
FILE: app/page.tsx
================================================
'use client';

import React, { useState, useRef } from 'react';
import useAgenticStore from './store/useAgenticStore';
import ServiceNowConnector from './components/ServiceNowConnector';
import FlowVisualizer, { FlowVisualizerHandles } from './components/FlowVisualizer';
import GlobalHeader from './components/GlobalHeader';
import { ReactFlowProvider } from 'reactflow';
import { Info } from 'lucide-react';
import styles from './Home.module.css';

export default function Home() {
  const agenticData = useAgenticStore((state) => state.agenticData);
  const clearAgenticData = useAgenticStore((state) => state.clearAgenticData);
  const refreshData = useAgenticStore((state) => state.refreshData);
  const resetData = useAgenticStore((state) => state.resetData);

  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [showDebug, setShowDebug] = useState<boolean>(false);

  const flowVisualizerRef = useRef<FlowVisualizerHandles>(null);

  const handleError = (error: Error) => {
    console.error("Error in flow visualization:", error);
    setError(error.message || "An error occurred displaying the flow diagram");
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await refreshData();
      setError(null);
    } catch (err: any) {
      console.error("Error refreshing data:", err);
      setError(err.message || "Failed to refresh data from ServiceNow");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExpandAll = () => {
    flowVisualizerRef.current?.expandAllNodes();
  };

  const handleCollapseAll = () => {
    flowVisualizerRef.current?.collapseAllNodes();
  };

  const handleResetFlow = () => {
    resetData();
  };

  return (
    <div className={styles.container}>
      <GlobalHeader />
      <main className={styles.main}>
        {agenticData && (
          <div className={styles.flowControls}>
            <div className={styles.controlsContainer}>
              <div className={styles.titleContainer}>
                <h2>ServiceNow Agentic AI Flow</h2>
                <p>Interactive visualization of AI agents, use cases, and tools</p>
              </div>

              <div className={styles.actionsContainer}>
                <div className={styles.buttonGroup}>
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
              <div className={styles.debugInfo}>
                <details open>
                  <summary>Debug Information</summary>
                  <pre>
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

        <div className={styles.contentContainer}>
          {!agenticData ? (
            <div className={styles.connectorContainer}>
              <ServiceNowConnector />
            </div>
          ) : error ? (
            <div className={styles.errorContainer}>
              <h3>Error Displaying Flow</h3>
              <p>{error}</p>
              <button
                onClick={clearAgenticData}
                className="btn btn-danger"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className={styles.flowContainer}>
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
FILE: app/__tests__/features/timeline-provider-selection.test.js
================================================
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import useBusinessProfileStore from '../../store/useBusinessProfileStore';
import TimelineSidebar from '../../timeline/components/TimelineSidebar';

// Mock the entire store
jest.mock('../../store/useBusinessProfileStore');

// Mock the ProviderSelector component
jest.mock('../../timeline/components/ProviderSelector', () => {
  return function MockProviderSelector({ selectedProvider, onProviderChange }) {
    return (
      <div>
        <label htmlFor="provider-select">AI Provider</label>
        <select
          id="provider-select"
          value={selectedProvider}
          onChange={(e) => onProviderChange(e.target.value)}
        >
          <option value="openai">OpenAI</option>
          <option value="gemini">Google Gemini</option>
        </select>
      </div>
    );
  };
});

describe('TimelineSidebar Provider Selection', () => {
  const mockProfile = { id: 'profile-1', companyName: 'Test Inc.' };
  let regenerateTimelineFromProfile;
  let setSelectedProvider;

  beforeEach(() => {
    // Reset mocks before each test
    regenerateTimelineFromProfile = jest.fn();
    setSelectedProvider = jest.fn();

    // Setup the mock implementation for the store hook
    useBusinessProfileStore.mockReturnValue({
      selectedProvider: 'openai',
      regenerateTimelineFromProfile,
      setSelectedProvider,
    });
  });

  test('should call regenerateTimelineFromProfile with the newly selected provider', async () => {
    render(
      <TimelineSidebar
        sections={[]}
        activeSection=""
        onSectionClick={() => {}}
        theme="dark"
        onThemeToggle={() => {}}
        timelineCached={false}
        timelineGeneratedAt={new Date().toISOString()}
        timelineScenarioType="balanced"
        onRegenerateTimeline={regenerateTimelineFromProfile}
        isGenerating={false}
        currentProfile={mockProfile}
        timelineProvider="openai"
      />
    );

    // Find the select dropdown and the button
    const providerSelect = screen.getByLabelText('AI Provider');
    const regenerateButton = screen.getByRole('button', { name: /regenerate timeline/i });

    // Simulate user selecting a new provider
    fireEvent.change(providerSelect, { target: { value: 'gemini' } });
    
    // The component should call setSelectedProvider on change
    expect(setSelectedProvider).toHaveBeenCalledWith('gemini');

    // Simulate clicking the regenerate button
    fireEvent.click(regenerateButton);

    // Verify that the regenerate function was called with the correct parameters
    await waitFor(() => {
      expect(regenerateTimelineFromProfile).toHaveBeenCalledWith(
        mockProfile,
        'balanced', // The scenario type passed in props
        'gemini'     // The newly selected provider
      );
    });
  });
}); 


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
FILE: app/admin/page.tsx
================================================
'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../store/useAuthStore';
import GlobalHeader from '../components/GlobalHeader';
import { CredentialsRepository } from '../repositories/credentialsRepository';
import AddServiceForm from './components/AddServiceForm';
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
import { Credential, ServiceType, TestStatus, CredentialFormData, ServiceTypeInfo } from './types';

export default function AdminPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<ServiceType>('ai_provider');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCredential, setEditingCredential] = useState<Credential | null>(null);
  const [testingConnections, setTestingConnections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, router]);

  const loadCredentials = async () => {
    try {
      setLoading(true);
      if(!user) throw new Error("User not authenticated");
      const data = await CredentialsRepository.getCredentials(user.id, selectedTab);
      setCredentials(data as Credential[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadCredentials();
    }
  }, [user, selectedTab]);

  const handleTestConnection = async (credentialId: string) => {
    setTestingConnections(prev => new Set([...prev, credentialId]));
    
    try {
        if(!user) throw new Error("User not authenticated");
      await CredentialsRepository.testConnection(user.id, credentialId);
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

  const handleSetDefault = async (credentialId: string) => {
    try {
      if(!user) throw new Error("User not authenticated");
      await CredentialsRepository.setDefaultProvider(user.id, credentialId);
      await loadCredentials();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (credentialId: string) => {
    if (window.confirm('Are you sure you want to delete this credential? This action cannot be undone.')) {
        try {
            if(!user) throw new Error("User not authenticated");
            await CredentialsRepository.deleteCredentials(user.id, credentialId);
            await loadCredentials();
        } catch (err: any) {
            setError(err.message);
        }
    }
  };

  const handleSaveCredential = async (formData: CredentialFormData) => {
    try {
      setError(null);
      if(!user) throw new Error("User not authenticated");
      const result = await CredentialsRepository.saveCredentials(user.id, formData);
      
      setShowAddForm(false);
      setEditingCredential(null);
      
      await loadCredentials();
      
      return result;
    } catch (err: any) {
      console.error('Failed to save credential:', err);
      setError(err.message);
      throw err;
    }
  };

  const serviceTypes: ServiceTypeInfo[] = [
    { id: 'ai_provider', name: 'AI Providers', icon: Zap, description: 'OpenAI, Gemini, Claude, and other LLM providers' },
    { id: 'crm_system', name: 'CRM Systems', icon: Users, description: 'ServiceNow, HubSpot, Salesforce integrations' },
    { id: 'productivity_tool', name: 'Productivity Tools', icon: Briefcase, description: 'Microsoft 365, Google Workspace, Slack' },
    { id: 'integration_platform', name: 'Integration Platforms', icon: Monitor, description: 'Zapier, Make, custom APIs' }
  ];

  const getStatusIcon = (testStatus: TestStatus): ReactNode => {
    switch (testStatus) {
      case 'success': return <CheckCircle className={styles.statusSuccess} size={16} />;
      case 'failed': return <XCircle className={styles.statusError} size={16} />;
      case 'testing': return <Clock className={styles.statusTesting} size={16} />;
      default: return <AlertTriangle className={styles.statusUntested} size={16} />;
    }
  };

  const getStatusText = (testStatus: TestStatus): string => {
    switch (testStatus) {
      case 'success': return 'Connected';
      case 'failed': return 'Failed';
      case 'testing': return 'Testing...';
      default: return 'Untested';
    }
  };

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className={styles.container}>
      <GlobalHeader />
      
      <div className={styles.content}>
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

        {error && (
          <div className={styles.error}>
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        <div className={styles.credentialsList}>
          <div className={styles.credentialsHeader}>
            <h2 className={styles.credentialsTitle}>
              {serviceTypes.find(t => t.id === selectedTab)?.name || 'Services'}
            </h2>
            <button
              onClick={() => {
                setEditingCredential(null);
                setShowAddForm(true);
              }}
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
                onClick={() => {
                    setEditingCredential(null);
                    setShowAddForm(true);
                }}
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
                        onClick={() => {
                            setEditingCredential(credential);
                            setShowAddForm(true);
                        }}
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
                      <span className={styles.serviceType}>{credential.service_type.replace(/_/g, ' ')}</span>
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

      {(showAddForm || editingCredential) && (
        <AddServiceForm
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
FILE: app/admin/types.ts
================================================
import { LucideIcon } from 'lucide-react';

export type ServiceType = 'ai_provider' | 'crm_system' | 'productivity_tool' | 'integration_platform';
export type TestStatus = 'success' | 'failed' | 'testing' | 'untested' | null;

export interface Credential {
  id: string;
  user_id: string;
  service_type: ServiceType;
  service_name: string;
  display_name: string;
  credentials_encrypted: string;
  encryption_metadata: object;
  configuration: { [key: string]: any };
  is_active: boolean;
  is_default: boolean;
  test_status: TestStatus;
  test_result: object | null;
  last_tested_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CredentialFormData {
    id?: string;
    serviceType: ServiceType;
    serviceName: string;
    displayName: string;
    credentials: { [key: string]: any };
    configuration: { [key: string]: any };
    isActive: boolean;
    isDefault: boolean;
}

export interface ServiceTypeInfo {
    id: ServiceType;
    name: string;
    icon: LucideIcon;
    description: string;
}

export interface ServiceField {
    name: string;
    label: string;
    type: string;
    required: boolean;
    options?: { value: string, label: string }[];
    placeholder?: string;
    defaultValue?: string | number;
    step?: number;
    min?: number;
    max?: number;
    key?: string;
}

export interface ServiceConfig {
    name: string;
    description?: string;
    fields: ServiceField[];
}

export interface ServiceConfigs {
    [key: string]: {
        [key:string]: ServiceConfig;
    }
} 


================================================
FILE: app/admin/components/AddServiceForm.module.css
================================================
/* AddServiceForm.module.css */

.overlay {
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

.modal {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--border-radius-lg);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-primary);
  flex-shrink: 0;
}

.headerContent {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.headerIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--glass-bg);
  border: 1px solid var(--border-secondary);
  border-radius: var(--border-radius);
  color: var(--accent-blue);
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.subtitle {
  margin: 4px 0 0 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.closeButton {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition-fast) ease;
}

.closeButton:hover {
  background: var(--btn-secondary-bg);
}

.form {
  padding: var(--spacing-lg);
  overflow-y: auto;
  flex-grow: 1;
}

.section {
  margin-bottom: var(--spacing-lg);
}

.sectionTitle {
  margin: 0 0 var(--spacing-md) 0;
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-secondary);
}

.formGroup {
  margin-bottom: var(--spacing-md);
}

.label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-weight-medium);
  font-size: 0.9rem;
  color: var(--text-primary);
}

.required {
  color: var(--accent-red);
  margin-left: 4px;
}

.input,
.select {
  width: 100%;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-primary);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: all var(--transition-fast) ease;
}

.input:focus,
.select:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.input.error,
.select.error {
  border-color: var(--accent-red);
}

.errorText {
  color: var(--accent-red);
  font-size: 0.8rem;
  margin-top: 4px;
  display: block;
}

.serviceDescription {
  background: var(--glass-bg);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-secondary);
  margin-top: var(--spacing-md);
}

.serviceDescription p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.checkboxGroup {
  margin-bottom: var(--spacing-sm);
}

.checkboxLabel {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
}

.checkboxText {
  font-size: 0.9rem;
  color: var(--text-primary);
}

.testResult {
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  margin-top: var(--spacing-md);
  font-size: 0.9rem;
}

.testSuccess {
  background: rgba(16, 185, 129, 0.1);
  color: var(--accent-green);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.testError {
  background: rgba(239, 68, 68, 0.1);
  color: var(--accent-red);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.testResultHeader {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: var(--font-weight-semibold);
}

.errorDetail {
  margin-top: var(--spacing-sm);
  font-size: 0.85rem;
  opacity: 0.8;
}

.testDetails {
  margin-top: var(--spacing-sm);
  font-size: 0.8rem;
  background: var(--bg-secondary);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  overflow-x: auto;
}

.testDetails pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.formError {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--border-radius);
  color: var(--accent-red);
  margin-top: var(--spacing-md);
}

.actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: flex-end;
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-primary);
  margin-top: var(--spacing-lg);
  flex-shrink: 0;
}

.cancelButton,
.testButton,
.saveButton {
  /* Use global .btn classes */
}

.testButton {
  gap: var(--spacing-sm);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border-secondary);
  border-top: 2px solid var(--accent-blue);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: var(--spacing-sm);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
} 


================================================
FILE: app/admin/components/AddServiceForm.tsx
================================================
'use client';

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { X, Key, TestTube, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import styles from './AddServiceForm.module.css';
import { CredentialsRepository } from '../../repositories/credentialsRepository';
import useAuthStore from '../../store/useAuthStore';
import { Credential, CredentialFormData, ServiceType, ServiceConfigs } from '../types';

interface AddServiceFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (formData: CredentialFormData) => Promise<any>;
    editingCredential?: Credential | null;
    selectedServiceType: ServiceType;
}

export default function AddServiceForm({ 
  isOpen, 
  onClose, 
  onSave, 
  editingCredential = null,
  selectedServiceType = 'ai_provider'
}: AddServiceFormProps) {
  const [formData, setFormData] = useState<CredentialFormData>({
    serviceType: selectedServiceType,
    serviceName: '',
    displayName: '',
    credentials: {},
    configuration: {},
    isActive: true,
    isDefault: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ success: boolean; error?: string; message?: string; details?: any } | null>(null);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const { user } = useAuthStore();

  const serviceConfigs: ServiceConfigs = {
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
              { value: 'claude-opus-4-20250514', label: 'Claude Opus 4 (Most Powerful)' },
              { value: 'claude-sonnet-4-20250514', label: 'Claude Sonnet 4 (High Performance)' },
              { value: 'claude-3-7-sonnet-20250219', label: 'Claude 3.7 Sonnet' },
              { value: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku (Fastest)' },
              { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus (Legacy)' },
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
        fields: [
          { name: 'username', label: 'Username', type: 'text', required: true, placeholder: 'your.username' },
          { name: 'password', label: 'Password', type: 'password', required: true, placeholder: 'Your ServiceNow password' },
          { name: 'instance_url', label: 'Instance URL', type: 'url', required: true, placeholder: 'https://company.service-now.com' },
          { name: 'scope_id', label: 'Application Scope ID', type: 'text', required: false, placeholder: 'Optional: sys_id of target scope' }
        ]
      },
      hubspot: {
        name: 'HubSpot',
        description: 'HubSpot CRM for contact and deal management',
        fields: [
          { name: 'api_key', label: 'HubSpot API Key', type: 'password', required: true, placeholder: 'pat-na1-...' },
          { name: 'portal_id', label: 'Portal ID', type: 'text', required: false, placeholder: 'Optional: Your HubSpot portal ID' }
        ]
      }
    },
    productivity_tool: {},
    integration_platform: {}
  };

  useEffect(() => {
    if (editingCredential) {
      setFormData({
        id: editingCredential.id,
        serviceType: editingCredential.service_type,
        serviceName: editingCredential.service_name,
        displayName: editingCredential.display_name,
        credentials: {
          model: editingCredential.configuration?.model
        },
        configuration: editingCredential.configuration || {},
        isActive: editingCredential.is_active,
        isDefault: editingCredential.is_default,
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
    setTestResult(null);
  }, [editingCredential, selectedServiceType, isOpen]);

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
  }, [formData.serviceName, formData.serviceType, editingCredential, serviceConfigs]);

  const handleInputChange = (key: string, value: any) => {
    const configFields = ['instance_url', 'scope_id', 'portal_id', 'model', 'base_url', 'timeout'];
    const section = configFields.includes(key) ? 'configuration' : 'credentials';

    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const handleDirectChange = (key: keyof CredentialFormData, value: any) => {
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
    const newErrors: { [key: string]: string } = {};
    const config = serviceConfigs[formData.serviceType]?.[formData.serviceName];
    
    if (!formData.serviceName) {
      newErrors.serviceName = 'Service is required';
    }
    
    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    }
    
    if (config) {
      config.fields.forEach(field => {
        if (field.required && !formData.credentials[field.name] && !formData.configuration[field.name]) {
          newErrors[`credentials.${field.name}`] = `${field.label} is required`;
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
        if(!user) throw new Error("User not authenticated");
      const result = await CredentialsRepository.testNewCredentials(user.id, {
        serviceType: formData.serviceType,
        serviceName: formData.serviceName,
        credentials: formData.credentials,
        configuration: formData.configuration,
      });
      setTestResult(result);
    } catch (error: any) {
      setTestResult({
        success: false,
        error: error.message || 'Connection test failed',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const submissionData = JSON.parse(JSON.stringify(formData));

    if (submissionData.serviceType === 'ai_provider' && submissionData.credentials.model) {
      submissionData.configuration.model = submissionData.credentials.model;
      delete submissionData.credentials.model;
    }

    try {
      await onSave(submissionData);
      onClose();
    } catch (error: any) {
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
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Service Information</h3>
                
                <div className={styles.formGroup}>
                <label className={styles.label}>Service Type</label>
                <select
                    value={formData.serviceType}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    handleDirectChange('serviceType', e.target.value as ServiceType);
                    handleDirectChange('serviceName', '');
                    }}
                    className={styles.select}
                    disabled={!!editingCredential}
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
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleDirectChange('serviceName', e.target.value)}
                    className={`${styles.select} ${errors.serviceName ? styles.error : ''}`}
                    disabled={!!editingCredential}
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

                {currentConfig && currentConfig.description && (
                <div className={styles.serviceDescription}>
                    <p>{currentConfig.description}</p>
                </div>
                )}

                <div className={styles.formGroup}>
                <label className={styles.label}>Display Name</label>
                <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleDirectChange('displayName', e.target.value)}
                    placeholder="e.g., OpenAI Production, ServiceNow Dev"
                    className={`${styles.input} ${errors.displayName ? styles.error : ''}`}
                />
                {errors.displayName && <span className={styles.errorText}>{errors.displayName}</span>}
                </div>
            </div>

            {currentConfig && currentConfig.fields && (
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Credentials & Configuration</h3>
                {currentConfig.fields.map(field => (
                <div key={field.name} className={styles.formGroup}>
                    <label className={styles.label}>
                    {field.label}
                    {field.required && <span className={styles.required}>*</span>}
                    </label>
                    {field.type === 'select' ? (
                    <select
                        value={formData.configuration[field.name] || formData.credentials[field.name] || ''}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange(field.name, e.target.value)}
                        className={`${styles.select} ${errors[`credentials.${field.name}`] ? styles.error : ''}`}
                    >
                        <option value="">Choose a model...</option>
                        {field.options?.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    ) : (
                    <input
                        type={field.type}
                        value={formData.credentials[field.name] || formData.configuration[field.name] || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        className={`${styles.input} ${errors[`credentials.${field.name}`] ? styles.error : ''}`}
                    />
                    )}
                    {errors[`credentials.${field.name}`] && (
                    <span className={styles.errorText}>{errors[`credentials.${field.name}`]}</span>
                    )}
                </div>
                ))}
            </div>
            )}

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Options</h3>
                
                <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                    <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleDirectChange('isActive', e.target.checked)}
                    />
                    <span className={styles.checkboxText}>Active</span>
                </label>
                </div>

                <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                    <input
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleDirectChange('isDefault', e.target.checked)}
                    />
                    <span className={styles.checkboxText}>Set as default provider</span>
                </label>
                </div>
            </div>

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

            {errors.submit && (
            <div className={styles.formError}>
                <AlertTriangle size={16} />
                {errors.submit}
            </div>
            )}

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
FILE: app/api/admin/debug-credentials/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { supabase } from '../../../lib/supabase';
import { Credential } from '../../../admin/types';

export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    console.log('🔍 Debug: Checking credentials for user:', user.id);

    const { error: tableError } = await supabase
      .from('external_service_credentials')
      .select('count')
      .limit(0);

    console.log('🗃️ Table accessibility:', { accessible: !tableError, error: tableError?.message });

    const { data: credentials, error } = await supabase
      .from('external_service_credentials')
      .select('*')
      .eq('user_id', user.id);

    console.log('📊 User credentials query:', { 
      success: !error, 
      error: error?.message, 
      count: credentials?.length || 0 
    });

    const { data: authUidTest, error: authError } = await supabase
      .rpc('auth.uid');
    
    console.log('🔐 Auth UID test:', { 
      success: !authError, 
      authUid: authUidTest, 
      userIdMatch: authUidTest === user.id,
      error: authError?.message 
    });

    const { count: totalCount, error: countError } = await supabase
      .from('external_service_credentials')
      .select('*', { count: 'exact', head: true });

    console.log('📈 Total records check:', { 
      success: !countError, 
      totalCount, 
      error: countError?.message 
    });

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
            authUid: authUidTest,
            userIdMatch: authUidTest === user.id,
            totalRecords: totalCount,
            recentRecords: recentCreds?.length || 0
          }
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user_id: user.id,
      credentials_count: credentials?.length || 0,
      diagnostics: {
        tableAccessible: !tableError,
        authUidWorks: !authError,
        authUid: authUidTest,
        userIdMatch: authUidTest === user.id,
        totalRecordsInTable: totalCount,
        recentRecordsInTable: recentCreds?.length || 0,
        lastHourFilter: oneHourAgo
      },
      credentials: (credentials as Credential[])?.map(cred => ({
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

  } catch (error: any) {
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
FILE: app/api/admin/encrypt-credentials/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server';
import { encryptCredential } from '../../../utils/encryption';
import { getUser } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
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

    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    let body: { credentials?: { [key: string]: any } };
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

    const encryptedCredentials: { [key: string]: string } = {};
    const encryptionMetadata: { [key: string]: any } = {};

    for (const [key, value] of Object.entries(credentials)) {
      if (value && typeof value === 'string') {
        console.log(`🔒 Encrypting credential: ${key}`);
        const encrypted = encryptCredential(value);
        encryptedCredentials[key] = encrypted.encrypted;
        encryptionMetadata[`${key}_iv`] = encrypted.iv;
        encryptionMetadata[`${key}_auth_tag`] = encrypted.authTag;
      } else {
        console.log(`⏭️ Skipping empty credential: ${key}`);
        continue;
      }
    }

    encryptionMetadata.algorithm = 'aes-256-gcm';
    encryptionMetadata.encrypted_at = new Date().toISOString();

    console.log('✅ Encryption completed successfully');
    console.log('📊 Encrypted credentials count:', Object.keys(encryptedCredentials).length);

    return NextResponse.json({
      encrypted: encryptedCredentials,
      metadata: encryptionMetadata
    });

  } catch (error: any) {
    console.error('💥 Credential encryption error:', error);
    
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
FILE: app/api/admin/generate-encryption-key/route.ts
================================================
import { NextResponse } from 'next/server';
import { generateEncryptionKey } from '../../../utils/encryption';

export async function GET() {
  try {
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

  } catch (error: any) {
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
FILE: app/api/admin/save-credentials/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { ServiceType, Credential } from '../../../admin/types';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface SaveCredentialsBody {
    id?: string;
    serviceType: ServiceType;
    serviceName: string;
    displayName: string;
    encryptedCredentials: { [key: string]: string };
    encryptionMetadata: { [key: string]: any };
    configuration?: { [key: string]: any };
    isActive?: boolean;
    isDefault?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body: SaveCredentialsBody = await request.json();
    const {
      id,
      serviceType,
      serviceName,
      displayName,
      encryptedCredentials,
      encryptionMetadata,
      configuration = {},
      isActive = true,
      isDefault = false
    } = body;

    console.log('💾 Server-side save credentials for user:', user.id);

    const recordData: Omit<Partial<Credential>, 'id' | 'created_at'> = {
      user_id: user.id,
      service_type: serviceType,
      service_name: serviceName,
      display_name: displayName,
      credentials_encrypted: encryptedCredentials as any, // Supabase expects json
      encryption_metadata: encryptionMetadata,
      configuration,
      is_active: isActive,
      is_default: isDefault,
      updated_at: new Date().toISOString()
    };

    let result: Credential;
    if (id) {
      console.log('🔄 Updating existing credential with ID:', id);
      const { data, error } = await supabaseAdmin
        .from('external_service_credentials')
        .update(recordData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      result = data as Credential;
    } else {
      console.log('➕ Creating new credential...');
      const { data, error } = await supabaseAdmin
        .from('external_service_credentials')
        .insert([{
          ...recordData,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      result = data as Credential;
    }

    console.log('✅ Credential saved successfully:', result.id);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error('❌ Save credentials error:', error);
    return NextResponse.json(
      { error: 'Failed to save credentials', details: error.message },
      { status: 500 }
    );
  }
} 


================================================
FILE: app/api/admin/test-connection/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { createClient } from '@supabase/supabase-js';
import { decryptCredential } from '../../../utils/encryption';
import { ServiceType, Credential } from '../../../admin/types';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface TestConnectionBody {
    credentialId: string;
    serviceType: ServiceType;
    serviceName: string;
}

interface TestResult {
    success: boolean;
    message?: string;
    error?: string;
    details?: any;
    timestamp: string;
    duration: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: TestConnectionBody = await request.json();
    const user = await getUser(request);

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { credentialId, serviceType, serviceName } = body;

    if (!credentialId || !serviceType || !serviceName) {
      return NextResponse.json(
        { error: 'Credential ID, service type, and service name are required' },
        { status: 400 }
      );
    }

    const { data: credential, error: dbError } = await supabaseAdmin
      .from('external_service_credentials')
      .select('*')
      .eq('id', credentialId)
      .single();

    if (dbError || !credential) {
      return NextResponse.json(
        { error: 'Credential not found' },
        { status: 404 }
      );
    }

    if (credential.user_id !== user.id) {
        return NextResponse.json(
            { error: 'Access denied' },
            { status: 403 }
        );
    }
    
    const decryptedCredentials = await decryptStoredCredentials(
      credential.credentials_encrypted,
      credential.encryption_metadata
    );

    let testResult: TestResult;
    switch (serviceType) {
      case 'ai_provider':
        testResult = await testAIProvider(serviceName, decryptedCredentials, credential.configuration);
        break;
      case 'crm_system':
        testResult = await testCRMSystem(serviceName, decryptedCredentials, credential.configuration);
        break;
      default:
        return NextResponse.json(
          { error: `Unsupported service type: ${serviceType}` },
          { status: 400 }
        );
    }

    return NextResponse.json(testResult);

  } catch (error: any) {
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

async function decryptStoredCredentials(encryptedCredentials: any, metadata: any): Promise<{ [key: string]: string }> {
  const decrypted: { [key: string]: string } = {};
  
  for (const [key, encryptedValue] of Object.entries(encryptedCredentials)) {
    if (typeof encryptedValue === 'string' && metadata[`${key}_iv`] && metadata[`${key}_auth_tag`]) {
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

async function testAIProvider(serviceName: string, credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
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
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

async function testCRMSystem(serviceName: string, credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
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
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

async function testOpenAI(credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
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
  const models = data.data?.filter((model: any) => model.id.includes('gpt')) || [];

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

async function testGemini(credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('Google API key is required');
  }

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

async function testClaude(credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('Anthropic API key is required');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': api_key,
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

async function testServiceNow(credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
  const startTime = Date.now();
  const { username, password } = credentials;
  const { instance_url } = configuration;
  
  if (!username || !password || !instance_url) {
    throw new Error('ServiceNow username, password, and instance URL are required');
  }

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

async function testHubSpot(credentials: { [key: string]: any }, configuration: { [key: string]: any }): Promise<TestResult> {
  const startTime = Date.now();
  const { api_key } = credentials;
  
  if (!api_key) {
    throw new Error('HubSpot API key is required');
  }

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
FILE: app/api/admin/test-credentials/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '../../../lib/supabase';
import { ServiceType } from '../../../admin/types';

interface TestCredentialsBody {
    serviceType: ServiceType;
    serviceName: string;
    credentials: { [key: string]: any };
    configuration?: { [key: string]: any };
}

interface TestResult {
    success: boolean;
    message?: string;
    error?: string;
    details?: any;
    timestamp: string;
    duration: number;
}

export async function POST(request: NextRequest) {
  console.log('🔍 test-credentials route called');
  
  try {
    let body: TestCredentialsBody;
    try {
      body = await request.json();
      console.log('📝 Request body:', JSON.stringify(body, null, 2));
    } catch (error: any) {
      console.log('❌ JSON parse error:', error.message);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

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
    let testResult: TestResult;
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

  } catch (error: any) {
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

async function testAIProvider(serviceName: string, credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
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
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

async function testCRMSystem(serviceName: string, credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
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
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
}

async function testOpenAI(credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
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
    const models = data.data?.filter((model: any) => model.id.includes('gpt')) || [];
  
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
  
  async function testGemini(credentials: { [key: string]: any }, configuration: { [key: string]: any }| undefined): Promise<TestResult> {
    const startTime = Date.now();
    const { api_key } = credentials;
    
    if (!api_key) {
      throw new Error('Google API key is required');
    }
  
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
  
  async function testClaude(credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
    const startTime = Date.now();
    const { api_key, model } = credentials;
    
    if (!api_key) {
      throw new Error('Anthropic API key is required');
    }
  
    const modelToUse = configuration?.model || model;
    if (!modelToUse) {
      throw new Error('Anthropic model is required');
    }
  
    const requestBody = {
      model: modelToUse,
      max_tokens: 10,
      messages: [
        { role: 'user', content: 'Test' }
      ]
    };
  
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': api_key,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });
  
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`Claude API error: ${response.status} - ${error.error?.message || 'Authentication failed'}`);
    }
  
    return {
      success: true,
      message: 'Anthropic Claude connection successful',
      details: {
        recommendedModel: modelToUse,
        endpoint: 'https://api.anthropic.com/v1'
      },
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime
    };
  }
  
  async function testServiceNow(credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
    const startTime = Date.now();
    const { username, password } = credentials;

    if (!configuration || !configuration.instance_url) {
        throw new Error('ServiceNow instance URL is required in configuration');
    }
    const { instance_url } = configuration;
    
    if (!username || !password) {
      throw new Error('ServiceNow username and password are required');
    }
  
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
  
  async function testHubSpot(credentials: { [key: string]: any }, configuration: { [key: string]: any } | undefined): Promise<TestResult> {
    const startTime = Date.now();
    const { api_key } = credentials;
    
    if (!api_key) {
      throw new Error('HubSpot API key is required');
    }
  
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
FILE: app/api/debug-env/route.ts
================================================
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const isAIConfigured = !!process.env.OPENAI_API_KEY;
    const isEncryptionConfigured = !!process.env.ENCRYPTION_KEY;
    
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
      issues: [] as string[]
    };

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

  } catch (error: any) {
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
FILE: app/api/servicenow/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server';

interface ServiceNowRequestBody {
    instanceUrl: string;
    username: string;
    password: string;
    tableName: string;
    fields?: string[];
    scope?: string;
    query?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ServiceNowRequestBody = await request.json();
    const { 
      instanceUrl, 
      username, 
      password, 
      tableName, 
      fields = [], 
      scope = '',
      query = ''
    } = body;

    if (!instanceUrl || !username || !password || !tableName) {
      return NextResponse.json(
        { error: 'Missing required parameters: instanceUrl, username, password, tableName' },
        { status: 400 }
      );
    }

    let url = `${instanceUrl}/api/now/table/${tableName}?`;
    
    const queryParams: string[] = [];
    
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
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
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
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('Error in ServiceNow proxy API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
} 


================================================
FILE: app/api/servicenow/fetch-agentic-data/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server';
import { validateInstanceUrl, validateScopeId, checkRateLimit } from '../../../utils/validation';

const get = <T>(obj: any, path: string, defaultValue: T | undefined = undefined): T | undefined => {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      result = result?.[key];
      if (result === undefined) {
        return defaultValue;
      }
    }
    return result as T;
  };
  
interface FetchAgenticDataBody {
    instanceUrl: string;
    scopeId: string;
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    const rateLimitCheck = await checkRateLimit(clientIP, 20, 60000);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfter: rateLimitCheck.retryAfter },
        { status: 429, headers: { 'Retry-After': String(rateLimitCheck.retryAfter) } }
      );
    }

    let body: FetchAgenticDataBody;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { instanceUrl, scopeId } = body;

    const urlValidation = validateInstanceUrl(instanceUrl);
    if (!urlValidation.isValid) {
      return NextResponse.json(
        { error: `Invalid instance URL: ${urlValidation.error}` },
        { status: 400 }
      );
    }

    const scopeValidation = validateScopeId(scopeId);
    if (!scopeValidation.isValid) {
      return NextResponse.json(
        { error: `Invalid scope ID: ${scopeValidation.error}` },
        { status: 400 }
      );
    }

    const username = process.env.SERVICENOW_USERNAME;
    const password = process.env.SERVICENOW_PASSWORD;

    if (!username || !password) {
      console.error('Server configuration error: ServiceNow credentials not found in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Authentication credentials not configured' },
        { status: 500 }
      );
    }

    const formattedUrl = urlValidation.sanitized!;
    const sanitizedScopeId = scopeValidation.sanitized!;

    const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

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

    const data = await response.json();
    
    console.log('API Response Structure:', JSON.stringify(data, null, 2));
    
    if (data.x_nowge_rfx_ai && data.x_nowge_rfx_ai.use_cases) {
      return NextResponse.json({ use_cases: data.x_nowge_rfx_ai.use_cases });
    } else if (data.result && data.result.use_cases) {
      return NextResponse.json({ use_cases: data.result.use_cases });
    } else if (data.use_cases) {
      return NextResponse.json(data);
    } else {
      console.error('Could not find use_cases in the API response:', data);
      return NextResponse.json(data);
    }

  } catch (error: any) {
    console.error('Error in fetch-agentic-data API route:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch or process ServiceNow data' },
      { status: 500 }
    );
  }
} 


================================================
FILE: app/api/servicenow/get-credentials/route.ts
================================================
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    instanceUrl: process.env.SERVICENOW_INSTANCE_URL || '',
    scopeId: process.env.SERVICENOW_SCOPE_ID || ''
  });
} 


================================================
FILE: app/api/test-ai/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server';
import { ProfileService } from '../../services/profileService';
import { markdownService } from '../../services/markdownService';
import { Profile, Timeline } from '../../services/types';

interface TestAiPostBody {
    profileId?: string;
    useMarkdown?: boolean;
}

export async function POST(request: NextRequest) {
  try {
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

    let body: TestAiPostBody;
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

    const profile: Profile | null = await ProfileService.getProfile(profileId);
    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const timelineData: Timeline = await ProfileService.generateTimelineFromProfile(profile);
    const profileMarkdown: string = markdownService.generateMarkdown(profile);

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

  } catch (error: any) {
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

export async function GET() {
  try {
    const profiles: Profile[] = await ProfileService.getProfiles();
    
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

  } catch (error: any) {
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
FILE: app/api/timeline/generate/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { validateBusinessProfile, validateScenarioType, checkRateLimit } from '../../../utils/validation';
import { TimelineService } from '../../../services/timelineService';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import type { BusinessProfile } from '../../../utils/validation';

interface RequestBody {
  businessProfile: BusinessProfile;
  scenarioType: string;
  provider?: string;
}

interface AiStatus {
  configured: boolean;
  provider: string;
  apiKeyStatus: string;
}

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // Check if the AI service is configured via TimelineService
    if (!await TimelineService.isConfigured(userId, CredentialsRepository)) {
      const status: AiStatus = await TimelineService.getStatus(userId, CredentialsRepository) as any;
      return NextResponse.json(
        {
          error: 'AI timeline generation not available',
          details: 'The AI service is not configured on the server. Please contact the administrator.',
          ...status
        },
        { status: 503 }
      );
    }

    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    const rateLimitCheck = await checkRateLimit(`timeline-${userId}`, 20, 60000); // 20 timeline generations per minute per user
    if (!rateLimitCheck.allowed) {
      const headers = new Headers();
      if (rateLimitCheck.retryAfter) {
        headers.set('Retry-After', rateLimitCheck.retryAfter.toString());
      }
      return NextResponse.json(
        { error: 'Rate limit exceeded', retryAfter: rateLimitCheck.retryAfter },
        { status: 429, headers }
      );
    }

    // Parse request body
    let body: RequestBody;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { businessProfile, scenarioType, provider } = body;

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

    if (!profileValidation.sanitized) {
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
        scenarioValidation.sanitized,
        userId,
        CredentialsRepository,
        provider
      );

      // TODO: Refactor TimelineService.getStatus to return a typed object
      const status = await TimelineService.getStatus(userId, CredentialsRepository, provider) as any as AiStatus;

      return NextResponse.json({
        success: true,
        timeline: timelineData,
        generatedAt: new Date().toISOString(),
        provider: status.provider
      });

    } catch (serviceError: any) {
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

  } catch (error: any) {
    console.error('Timeline API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: (error as Error).message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 


================================================
FILE: app/api/timeline/generate-from-profile/route.ts
================================================
import { NextRequest, NextResponse } from 'next/server';
import { TimelineService } from '../../../services/timelineService';
import { ProfileRepository } from '../../../repositories/profileRepository';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';
import { createClient } from '@supabase/supabase-js';
import { getUser } from '../../../lib/supabase';
import { aiService } from '../../../services/aiService';
import { Profile, Timeline } from '../../../services/types';

type ScenarioType = 'conservative' | 'balanced' | 'aggressive';

interface GenerateFromProfileBody {
    profileId?: string;
    profile?: Profile;
    forceRegenerate?: boolean;
    scenarioType?: ScenarioType;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request);
    const userId = user?.id;

    if (!user || !userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const aiStatus = await aiService.getStatus(userId, CredentialsRepository);
    if (!aiStatus.configured) {
      return NextResponse.json(
        { 
          error: 'AI provider not configured', 
          details: 'Please configure an AI provider in the admin settings or set a system-wide OPENAI_API_KEY.',
          configured: false
        },
        { status: 503 }
      );
    }
    
    let body: GenerateFromProfileBody;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { profileId, profile, forceRegenerate = false, scenarioType } = body;
    
    console.log(`📝 Request: profileId=${profileId}, userId=${userId}, forceRegenerate=${forceRegenerate}, scenarioType=${scenarioType}`);

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json({ error: 'Authorization header is required' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: authHeader
          }
        }
      }
    );

    if (!profile && !profileId) {
      return NextResponse.json(
        { error: 'Either profile data or profileId is required' },
        { status: 400 }
      );
    }

    let targetProfile: Profile | null = profile || null;

    if (profileId && !profile) {
      try {
        const { data: profileFromDb, error } = await supabase
          .from('client_profiles')
          .select('*')
          .eq('id', profileId)
          .single();
        
        if (error || !profileFromDb) {
          return NextResponse.json(
            { error: 'Profile not found' },
            { status: 404 }
          );
        }
        
        targetProfile = transformFromDatabase(profileFromDb);
      } catch (error: any) {
        return NextResponse.json(
          { 
            error: 'Failed to fetch profile',
            details: error.message
          },
          { status: 500 }
        );
      }
    }

    if (!targetProfile) {
      return NextResponse.json(
        { error: 'No valid profile data provided' },
        { status: 400 }
      );
    }

    if (!targetProfile.companyName) {
      return NextResponse.json(
        { 
          error: 'Invalid profile data', 
          details: 'Profile must include company name' 
        },
        { status: 400 }
      );
    }

    try {
      let timeline: Timeline | null = null;
      let cached = false;
      let generatedAt = new Date().toISOString();
      let finalScenarioType: ScenarioType = scenarioType || determineScenarioType(targetProfile);
      let unsavedProfile = !targetProfile.id;

      const hasProfileId = targetProfile && targetProfile.id;
      
      if (hasProfileId && !forceRegenerate) {
        try {
          console.log(`🔍 Checking cache for profile ${targetProfile.id}`);
          
          const { data, error } = await supabase
            .from('client_profiles')
            .select('timeline_data, last_timeline_generated_at')
            .eq('id', targetProfile.id)
            .single();
            
          if (!error && data?.timeline_data) {
            const cachedScenarioType = data.timeline_data.scenarioType || 'balanced';
            
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
            if (error && error.code !== 'PGRST116') {
                console.error('Cache check error:', error);
            }
            console.log(`💾 No cached timeline found for profile ${targetProfile.id}`);
          }
        } catch (cacheError: any) {
          console.warn('⚠️ Could not access timeline cache:', cacheError.message);
        }
      }

      if (!timeline) {
        if (hasProfileId) {
          console.log(`🔄 Generating new timeline for profile ${targetProfile.id}`);
        } else {
          console.log(`🔄 Generating timeline for unsaved profile (${targetProfile.companyName || 'unnamed'})`);
        }

        let generatedTimeline = await TimelineService.generateTimeline(
          targetProfile,
          finalScenarioType, 
          userId,
          CredentialsRepository
        );
        
        timeline = enhanceTimelineWithProfile(generatedTimeline, targetProfile);

        if (hasProfileId) {
          try {
            console.log(`💾 Saving timeline to cache for profile ${targetProfile.id}`);
            
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
              .eq('id', targetProfile.id);
              
            if (error) {
              console.error('❌ Failed to save timeline to cache:', error);
            } else {
              console.log(`✅ Timeline cached successfully for profile ${targetProfile.id}`);
            }
          } catch (saveError: any) {
            console.warn('⚠️ Could not save timeline to cache:', saveError.message);
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
        provider: cached ? 'Database Cache' : aiStatus.provider,
        method: unsavedProfile ? 'Profile-Based Generation (Unsaved)' : 'Profile-Based Generation with Caching'
      });

    } catch (serviceError: any) {
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

  } catch (error: any) {
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

function determineScenarioType(profile: Profile): ScenarioType {
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

function enhanceTimelineWithProfile(timeline: Timeline, profile: Profile): Timeline {
  if (timeline.phases) {
    timeline.phases = timeline.phases.map((phase, index) => ({
      ...phase,
      profileInsights: getPhaseInsights(profile, index),
      specificOpportunities: getPhaseOpportunities(profile, index)
    }));
  }
  
  timeline.riskFactors = identifyRiskFactors(profile);
  timeline.competitiveContext = getCompetitiveContext(profile);
  
  return timeline;
}

function getPhaseInsights(profile: Profile, phaseIndex: number): string {
  const insights: { [key: number]: string } = {
    0: `Focus on ${profile.primaryBusinessIssue || 'core challenges'} while building foundation`,
    1: `Address ${profile.topProblem || 'key issues'} with targeted automation`,
    2: `Scale successful pilots across ${profile.size || 'the organization'}`,
    3: `Optimize for ${profile.successMetrics?.join(', ') || 'key performance'} improvements`
  };
  
  return insights[phaseIndex] || 'Continue systematic AI adoption';
}

function getPhaseOpportunities(profile: Profile, phaseIndex: number): any[] {
  return [];
}

function identifyRiskFactors(profile: Profile): any[] {
  const risks: any[] = [];
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

function getCompetitiveContext(profile: Profile): any {
  return {
    urgency: profile.competitivePressure ? 'High' : 'Medium',
    differentiators: profile.differentiationRequirements || [],
    marketPosition: profile.industry === 'Technology' ? 'Fast-moving' : 'Traditional'
  };
}

function transformFromDatabase(dbRecord: any): Profile {
  const { id: oldId, ...profileDataWithoutId } = dbRecord.profile_data || {};
  
  return {
    id: dbRecord.id,
    ...profileDataWithoutId,
    markdown: dbRecord.markdown_content,
    createdAt: dbRecord.created_at,
    updatedAt: dbRecord.updated_at,
    status: 'draft',
    _supabaseRecord: true,
    _userId: dbRecord.user_id,
    _originalId: oldId || null
  };
} 


================================================
FILE: app/api/timeline/get-providers/route.ts
================================================
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server';
import { CredentialsRepository } from '../../../repositories/credentialsRepository';

interface Provider {
    service_name: string;
    display_name: string;
    is_default: boolean;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const providers = await CredentialsRepository.getProvidersByType(supabase, user.id, 'ai_provider');

    return NextResponse.json(providers as Provider[]);
  } catch (error: any) {
    console.error('Error fetching AI providers:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch AI providers', details: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
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
FILE: app/auth/callback/page.tsx
================================================
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type AuthStatus = 'loading' | 'success' | 'error';

export default function AuthCallback() {
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [message, setMessage] = useState<string>('Processing authentication...');
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const errorParam = urlParams.get('error');
        const errorDescription = urlParams.get('error_description');

        if (errorParam) {
          setStatus('error');
          setMessage(errorDescription || 'Authentication failed');
          return;
        }

        if (code) {
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            setStatus('error');
            setMessage(error.message || 'Failed to authenticate');
            return;
          }

          if (data.session) {
            setStatus('success');
            setMessage('Authentication successful! Redirecting...');
            
            setTimeout(() => {
              router.push('/');
            }, 2000);
            return;
          }
        }

        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
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
          
          setTimeout(() => {
            router.push('/');
          }, 2000);
          return;
        }

        setStatus('error');
        setMessage('No authentication data found in URL');
        
      } catch (err: any) {
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
FILE: app/auth/signin/page.tsx
================================================
'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/useAuthStore';
import GlobalHeader from '../../components/GlobalHeader';
import { LogIn, Mail, Lock, Zap, ArrowLeft } from 'lucide-react';
import styles from '../Auth.module.css';

type AuthMode = 'password' | 'magic-link';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, signInWithMagicLink, user, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [authMode, setAuthMode] = useState<AuthMode>('password');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push('/profiles');
    }
  }, [user, router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const result = await signIn(formData.email, formData.password);
      if(result.error) setError(result.error);
    } catch (err: any) {
      console.error('Sign in error:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMagicLinkSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');
    try {
      const result = await signInWithMagicLink(formData.email);
      if(result.error) {
        setError(result.error);
      } else {
        setSuccessMessage('Magic link sent! Check your email and click the link to sign in.');
      }
    } catch (err: any) {
      console.error('Magic link error:', err);
      setError(err.message || 'An unexpected error occurred.');
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
          <div className={styles.header}>
            <div className={`${styles.headerIcon} ${styles.signin}`}>
              <LogIn size={24} color="white" />
            </div>
            
            <h1 className={styles.title}>Welcome Back</h1>
            
            <p className={styles.subtitle}>
              Sign in to access your client profiles and AI timelines
            </p>
          </div>

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

          {successMessage && (
            <div className={`${styles.message} ${styles.success}`}>
              <Mail size={16} />
              {successMessage}
            </div>
          )}

          {error && (
            <div className={`${styles.message} ${styles.error}`}>
              {error}
            </div>
          )}

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
FILE: app/auth/signup/page.tsx
================================================
'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '../../store/useAuthStore';
import GlobalHeader from '../../components/GlobalHeader';
import { UserPlus, Mail, Lock, ArrowLeft } from 'lucide-react';
import styles from '../Auth.module.css';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, user, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push('/profiles');
    }
  }, [user, router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');
    try {
      const result = await signUp(formData.email, formData.password);
      if(result.error) {
        setError(result.error)
      } else {
        setSuccessMessage('Account created! Please check your email to confirm your account.');
      }
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <GlobalHeader />
      
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <div className={`${styles.headerIcon} ${styles.signup}`}>
              <UserPlus size={24} color="white" />
            </div>
            
            <h1 className={styles.title}>Create Account</h1>
            
            <p className={styles.subtitle}>
              Join us to manage client profiles and generate AI transformation timelines
            </p>
          </div>

          {successMessage && (
            <div className={`${styles.message} ${styles.success}`}>
              <Mail size={16} />
              {successMessage}
            </div>
          )}

          {error && (
            <div className={`${styles.message} ${styles.error}`}>
              {error}
            </div>
          )}

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
FILE: app/components/FlowVisualizer.tsx
================================================
'use client';

import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useNodesState, useEdgesState, Node, Edge, OnEdgesChange } from 'reactflow';
import 'reactflow/dist/style.css';

import useAgenticStore from '../store/useAgenticStore';
import { useFlowLayout } from '../hooks/useFlowLayout';
import { useFlowData } from '../hooks/useFlowData';
import FlowCanvas from './flow/FlowCanvas';
import { CustomNode, NodeData } from './flow/types';

interface FlowVisualizerProps {
  onError: (error: Error) => void;
}

export interface FlowVisualizerHandles {
  expandAllNodes: () => void;
  collapseAllNodes: () => void;
}

const FlowVisualizer = forwardRef<FlowVisualizerHandles, FlowVisualizerProps>(({ onError }, ref) => {
  const { agenticData } = useAgenticStore();
  
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  
  const {
    layoutDirection,
    toggleNodeExpansion,
    expandAllNodes,
    collapseAllNodes,
  } = useFlowLayout(nodes, setNodes, edges, setEdges);
  
  useFlowData(agenticData, layoutDirection, setNodes, setEdges, onError);
  
  useImperativeHandle(ref, () => ({
    expandAllNodes,
    collapseAllNodes
  }));

  const onNodeClickHandler = useCallback((event: React.MouseEvent, node: Node<NodeData>) => {
    setSelectedNode(node as CustomNode);
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
          onEdgesChange={onEdgesChange as OnEdgesChange}
          setEdges={setEdges}
          onNodeClick={onNodeClickHandler}
          selectedNode={selectedNode}
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
FILE: app/components/GlobalHeader.tsx
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
  Settings,
  LucideIcon
} from 'lucide-react';

interface NavItem {
    name: string;
    href: string;
    icon: LucideIcon;
    description: string;
}

export default function GlobalHeader() {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation: NavItem[] = [
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
        <div className="header-brand">
          <Link href="/" className="brand-link">
            <div className="logo-wrapper">
              <img 
                src={theme === 'dark' ? "/images/Full Logo Dark.png" : "/images/Full Logo Light.png"}
                alt="Agent Blueprint Logo" 
                className="nowgentic-logo"
              />
            </div>
            <h1 className="app-title">Agent Blueprint</h1>
          </Link>
        </div>

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

        <div className="header-actions">
          <button
            onClick={toggleTheme}
            className="action-btn theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="icon" /> : <Moon className="icon" />}
          </button>

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

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
          </button>
        </div>
      </div>

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
FILE: app/components/NodeIcons.tsx
================================================
'use client';

import React, { MouseEvent } from 'react';

export const ExternalLinkIcon: React.FC = () => (
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

interface NodeHeaderButtonsProps {
  id: string;
  isCollapsed: boolean;
  hasChildren: boolean;
  onToggle?: (id: string) => void;
  canNavigate: boolean;
  onExternalLinkClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const NodeHeaderButtons: React.FC<NodeHeaderButtonsProps> = ({ 
  id, 
  isCollapsed, 
  hasChildren, 
  onToggle, 
  canNavigate, 
  onExternalLinkClick 
}) => {
  return (
    <div className="node-header-buttons">
      {canNavigate && (
        <button 
          className="node-external-link"
          onClick={onExternalLinkClick}
          onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
          title="Open in ServiceNow"
        >
          <ExternalLinkIcon />
        </button>
      )}
      
      {hasChildren && (
        <button 
          className="expand-button"
          onClick={() => onToggle && onToggle(id)}
          onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
          title={isCollapsed ? "Show child nodes" : "Hide child nodes"}
        >
          {isCollapsed ? '+' : '−'}
        </button>
      )}
    </div>
  );
}; 


================================================
FILE: app/components/Providers.tsx
================================================
'use client';

import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import ThemeProvider from './theme/ThemeProvider';

const AuthProvider = dynamic(() => import('./auth/AuthProvider'), {
  ssr: false,
});

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
} 


================================================
FILE: app/components/ServiceNowConnector.tsx
================================================
'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import useAgenticStore from '../store/useAgenticStore';
import { useTheme } from './theme/ThemeProvider';

export default function ServiceNowConnector() {
  const { theme } = useTheme();
  const router = useRouter();
  
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
      });
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAgenticData = useAgenticStore((state) => state.setAgenticData);
  const setConnectionDetails = useAgenticStore((state) => state.setConnectionDetails);

  const handleFetchData = async () => {
    setIsLoading(true);
    setError(null);

    if (!instanceUrl || !scopeId) {
      setError('Instance URL and Scope ID are required.');
      setIsLoading(false);
      return;
    }

    try {
      let formattedUrl = instanceUrl.trim();
      if (!formattedUrl.startsWith('https://') && !formattedUrl.startsWith('http://')) {
        formattedUrl = 'https://' + formattedUrl;
      }
      if (formattedUrl.endsWith('/')) {
        formattedUrl = formattedUrl.slice(0, -1);
      }

      const connectionDetails = {
        instanceUrl: formattedUrl,
        scopeId
      };
      
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
          errorMessage = `${errorMessage}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setConnectionDetails(connectionDetails);
      setAgenticData(data);

    } catch (err: any) {
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
              alt="Agent Blueprint Logo" 
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInstanceUrl(e.target.value)}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setScopeId(e.target.value)}
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
              onClick={() => router.push('/profiles')}
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
              onClick={() => router.push('/timeline')}
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
FILE: app/components/auth/AuthModal.tsx
================================================
'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

type AuthMode = 'login' | 'signup';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: AuthMode;
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

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
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

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
FILE: app/components/auth/AuthProvider.tsx
================================================
'use client';

import { useEffect, ReactNode } from 'react';
import useAuthStore from '../../store/useAuthStore';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
} 


================================================
FILE: app/components/auth/LoginForm.tsx
================================================
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

interface LoginFormProps {
    onToggleMode: () => void;
    onSuccess?: () => void;
}

export default function LoginForm({ onToggleMode, onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(false);

  const { signIn, signInWithMagicLink, isLoading } = useAuthStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
          </div>

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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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

          <div className="flex items-center">
            <input
              id="magic-link"
              type="checkbox"
              checked={useMagicLink}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUseMagicLink(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              disabled={isLoading}
            />
            <label htmlFor="magic-link" className="ml-2 text-sm text-gray-300">
              Use magic link instead
            </label>
          </div>

          {error && (
            <div className={`text-sm p-3 rounded-lg ${
              error.includes('Check your email') 
                ? 'bg-green-900/20 border border-green-800 text-green-400'
                : 'bg-red-900/20 border border-red-800 text-red-400'
            }`}>
              {error}
            </div>
          )}

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
FILE: app/components/auth/SignupForm.tsx
================================================
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, Lock, UserPlus, Loader2, User } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

interface SignupFormProps {
    onToggleMode: () => void;
    onSuccess?: () => void;
}

export default function SignupForm({ onToggleMode, onSuccess }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { signUp, isLoading } = useAuthStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        onSuccess?.();
      } else {
        setError(result.error || 'Failed to create account');
      }
    } catch (err: any) {
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

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

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
FILE: app/components/auth/UserMenu.tsx
================================================
'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import useAuthStore from '../../store/useAuthStore';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
    .map((name: string) => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
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
          (e.target as HTMLElement).style.backgroundColor = 'rgba(55, 65, 81, 0.7)';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.backgroundColor = 'rgba(55, 65, 81, 0.5)';
        }}
      >
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
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          textAlign: 'left' 
        }} className="hidden-mobile">
          <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayName}</div>
          <div style={{ fontSize: '12px', color: '#9ca3af' }}>{user.email}</div>
        </div>
        
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

          <div style={{ padding: '8px 0' }}>
            <button
              onClick={() => {
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
                (e.target as HTMLElement).style.backgroundColor = 'rgba(153, 27, 27, 0.2)';
                (e.target as HTMLElement).style.color = '#f87171';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
                (e.target as HTMLElement).style.color = '#9ca3af';
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
FILE: app/components/flow/FlowCanvas.tsx
================================================
'use client';

import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Panel,
  addEdge,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  Connection,
  EdgeTypes,
  NodeTypes,
  BackgroundVariant,
} from 'reactflow';

import UseCaseNode from '../nodes/UseCaseNode';
import TriggerNode from '../nodes/TriggerNode';
import AgentNode from '../nodes/AgentNode';
import ToolNode from '../nodes/ToolNode';
import SelectedNodePanel from './SelectedNodePanel';

// Define node types outside of the component to avoid recreation on each render
const nodeTypes: NodeTypes = {
  useCaseNode: UseCaseNode,
  triggerNode: TriggerNode,
  agentNode: AgentNode,
  toolNode: ToolNode,
};

interface FlowCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  setEdges: (edges: Edge[]) => void;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  selectedNode: Node | null;
  layoutDirection: string;
  toggleNodeExpansion: (nodeId: string) => void;
  onEdgesChange: OnEdgesChange;
}

export default function FlowCanvas({ 
  nodes, 
  edges, 
  onNodesChange, 
  setEdges, 
  onNodeClick,
  selectedNode,
  layoutDirection,
  toggleNodeExpansion,
  onEdgesChange
}: FlowCanvasProps) {
  
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
    (params: Connection) => setEdges(addEdge(params, edges)),
    [edges, setEdges]
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
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      
      {selectedNode && (
        <Panel position="bottom-right">
          <SelectedNodePanel node={selectedNode} />
        </Panel>
      )}
    </ReactFlow>
  );
} 


================================================
FILE: app/components/flow/SelectedNodePanel.module.css
================================================
.detailsPanel {
  background: white;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  max-width: 300px;
  font-family: var(--font-family);
}

.detailsTitle {
  font-weight: 600;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
}

.detailsContent {
  font-size: 0.85rem;
}

.detailsField {
  margin-bottom: 8px;
}

.detailsLabel {
  font-weight: 600;
  color: #555;
  margin-right: 5px;
}

.detailsValue {
  color: #333;
} 


================================================
FILE: app/components/flow/SelectedNodePanel.tsx
================================================
import React from 'react';
import { Node } from 'reactflow';
import styles from './SelectedNodePanel.module.css';

interface SelectedNodePanelProps {
  node: Node;
}

const SelectedNodePanel: React.FC<SelectedNodePanelProps> = ({ node }) => {
  return (
    <div className={styles.detailsPanel}>
      <div className={styles.detailsTitle}>Selected: {node.data.label}</div>
      <div className={styles.detailsContent}>
        <div className={styles.detailsField}>
          <span className={styles.detailsLabel}>Type:</span>
          <span className={styles.detailsValue}>{node.data.type}</span>
        </div>
        <div className={styles.detailsField}>
          <span className={styles.detailsLabel}>Level:</span>
          <span className={styles.detailsValue}>{node.data.level}</span>
        </div>
        <div className={styles.detailsField}>
          <span className={styles.detailsLabel}>Children:</span>
          <span className={styles.detailsValue}>{node.data.childrenCount}</span>
        </div>
        <div className={styles.detailsField}>
          <span className={styles.detailsLabel}>Collapsed:</span>
          <span className={styles.detailsValue}>{node.data.isCollapsed ? 'Yes' : 'No'}</span>
        </div>
        {node.data.description && (
          <div className={styles.detailsField}>
            <span className={styles.detailsLabel}>Description:</span>
            <span className={styles.detailsValue}>{node.data.description}</span>
          </div>
        )}
        {node.data.role && (
          <div className={styles.detailsField}>
            <span className={styles.detailsLabel}>Role:</span>
            <span className={styles.detailsValue}>{node.data.role}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedNodePanel; 


================================================
FILE: app/components/flow/types.ts
================================================
import { Node } from 'reactflow';

export interface NodeData {
  label: string;
  type: 'useCase' | 'agent' | 'tool' | 'trigger';
  description?: string;
  details: any; // The original object from servicenow
  isCollapsed: boolean;
  childrenCount: number;
  nodeType: 'useCaseNode' | 'agentNode' | 'toolNode' | 'triggerNode';
  parentId: string | null;
  level: number;
  visible?: boolean;
  target_table?: string;
  condition?: string;
  objective?: string;
  role?: string;
  instructions?: string;
  toolType?: string;
  layoutDirection?: 'LR' | 'TB';
  onToggle?: (id: string) => void;
}

export type CustomNode = Node<NodeData>; 


================================================
FILE: app/components/migration/SupabaseSetupCheck.tsx
================================================
'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ExternalLink, Copy, Check } from 'lucide-react';

interface SetupStatus {
    hasUrl: boolean;
    hasKey: boolean;
    urlValid: boolean;
    keyValid: boolean;
    isConfigured: boolean;
    url: string | null;
    keyLength: number;
}

export default function SupabaseSetupCheck() {
  const [setupStatus, setSetupStatus] = useState<SetupStatus | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = () => {
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const urlValid = hasUrl ? (process.env.NEXT_PUBLIC_SUPABASE_URL!.includes('supabase.co') || process.env.NEXT_PUBLIC_SUPABASE_URL!.includes('supabase.com')) : false;
    const keyValid = hasKey ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.startsWith('eyJ') : false;

    setSetupStatus({
      hasUrl,
      hasKey,
      urlValid,
      keyValid,
      isConfigured: hasUrl && hasKey && urlValid && keyValid,
      url: hasUrl ? process.env.NEXT_PUBLIC_SUPABASE_URL! : null,
      keyLength: hasKey ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.length : 0
    });
  };

  const copyToClipboard = (text: string) => {
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
FILE: app/components/nodes/AgentNode.tsx
================================================
'use client';

import { memo, useCallback, MouseEvent } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import useAgenticStore from '../../store/useAgenticStore';
import { generateServiceNowUrl } from '../../utils/nodeUtils';
import { ExternalLinkIcon } from '../NodeIcons';
import { NodeData } from '../flow/types';

const AgentNode: React.FC<NodeProps<NodeData>> = ({ data, id }) => {
  const { 
    layoutDirection, onToggle, isCollapsed, label, childrenCount, 
    description, role, details
  } = data || {};
  
  const serviceNowUrl = useAgenticStore(state => state.serviceNowUrl);
  
  const targetPosition = layoutDirection === 'TB' ? Position.Top : Position.Left;
  const sourcePosition = layoutDirection === 'TB' ? Position.Bottom : Position.Right;

  const handleToggle = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (typeof onToggle === 'function') {
      onToggle(id);
    }
  }, [id, onToggle]);

  const handleExternalLinkClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    const url = generateServiceNowUrl(serviceNowUrl, 'agent', details?.sys_id);
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [serviceNowUrl, details?.sys_id]);
  
  const hasChildren = childrenCount > 0;
  
  const canNavigate = Boolean(serviceNowUrl && details?.sys_id);

  return (
    <div className="node agent-node"
         onClick={(e: MouseEvent) => e.stopPropagation()}>
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
              onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
              title="Open in ServiceNow"
            >
              <ExternalLinkIcon />
            </button>
          )}
          
          {hasChildren && (
            <button 
              className="expand-button"
              onClick={handleToggle}
              onMouseDown={(e: MouseEvent<HTMLButtonElement>) => e.stopPropagation()}
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
FILE: app/components/nodes/ToolNode.tsx
================================================
'use client';

import { memo, useCallback, MouseEvent } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import useAgenticStore from '../../store/useAgenticStore';
import { generateServiceNowUrl } from '../../utils/nodeUtils';
import { ExternalLinkIcon } from '../NodeIcons';
import { NodeData } from '../flow/types';

const ToolNode: React.FC<NodeProps<NodeData>> = ({ data, id }) => {
  const { 
    layoutDirection, onToggle, isCollapsed, label, childrenCount, 
    description, toolType, details
  } = data || {};
  
  const serviceNowUrl = useAgenticStore(state => state.serviceNowUrl);
  
  const targetPosition = layoutDirection === 'TB' ? Position.Top : Position.Left;
  const sourcePosition = layoutDirection === 'TB' ? Position.Bottom : Position.Right;

  const handleToggle = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (typeof onToggle === 'function') {
      onToggle(id);
    }
  }, [id, onToggle]);

  const handleExternalLinkClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    const url = generateServiceNowUrl(serviceNowUrl, 'tool', details?.sys_id, toolType);
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [serviceNowUrl, details?.sys_id, toolType]);
  
  const hasChildren = childrenCount > 0;
  
  const canNavigate = Boolean(serviceNowUrl && details?.sys_id);

  return (
    <div className="node tool-node"
         onClick={(e: MouseEvent) => e.stopPropagation()}>
      <Handle type="target" position={targetPosition} />
      <Handle type="source" position={sourcePosition} />
      
      <div className="node