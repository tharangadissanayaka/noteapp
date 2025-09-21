module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  testTimeout: 30000,
  // setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'], // Disabled temporarily
  collectCoverageFrom: [
    'tests/**/*.ts',
    '!tests/setup.ts',
    '!tests/utils/**/*'
  ],
  verbose: true
};