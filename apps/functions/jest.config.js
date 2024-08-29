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
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
      files: 70
    }
  },
  coveragePathIgnorePatterns: [],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'ts'],

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testRegex: '.*\\.test\\.ts$',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts']
};
