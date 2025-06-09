import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
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
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/layout.tsx',
    '!app/page.tsx',
    '!app/timeline/layout.tsx',
    '!app/timeline/page.tsx',
    '!app/profiles/page.tsx',
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
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig); 