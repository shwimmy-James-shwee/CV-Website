// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  rootDir: 'src',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: '../coverage',

  collectCoverageFrom: ['**/*.(t|j)s', '!**/__test__/*', '!<rootDir>/node_modules/', '!<rootDir>/**/*.module.ts'],
  // An array of regexp pattern strings used to skip coverage collection

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 90,
      lines: 90,
      statements: 90,
      files: 90,
    },
    'src/api/**/*.ts': {
      functions: 75,
    },
  },
  coveragePathIgnorePatterns: [
    'src/api/v1/file/file.validator.ts', // dynamic import is not supported in Jest and will throw an error
    'src/database/*',
    'src/shared/schema*',
    'src/test-unit/',
    'src/shared/questionnaire*',
    'src/utilities/logger',
    'src/utilities/antivirus',
    'src/guard/',
    'src/main.ts',
    'src/all-exceptions-filter.ts',
    'src/prisma.env.ts',
    'src/middleware/',
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'ts'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testRegex: '.*\\.spec\\.ts$',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // setupFilesAfterEnv: ['<rootDir>/src/test/singleton.ts'],
};
