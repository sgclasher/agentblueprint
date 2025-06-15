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
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/components/(.*)$': '<rootDir>/app/components/$1',
    '^@/services/(.*)$': '<rootDir>/app/services/$1',
    '^@/utils/(.*)$': '<rootDir>/app/utils/$1',
    '^@/store/(.*)$': '<rootDir>/app/store/$1',
    '^@/hooks/(.*)$': '<rootDir>/app/hooks/$1',
    '^@/lib/(.*)$': '<rootDir>/app/lib/$1',
    // Mock Supabase modules
    '^@supabase/supabase-js$': '<rootDir>/app/__mocks__/@supabase/supabase-js.js',
    // Handle CSS modules
    '\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Handle static assets
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/*.stories.{js,jsx,ts,tsx}',
    '!app/**/__tests__/**',
  ],
  // Windows-compatible settings
  watchPathIgnorePatterns: ['node_modules'],
  // Increase timeout for slower Windows file operations
  testTimeout: 10000,
  // Use Node.js resolution algorithm
  resolver: undefined,
  // Clear mocks between tests
  clearMocks: true,
  // Restore mocks between tests
  restoreMocks: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig); 