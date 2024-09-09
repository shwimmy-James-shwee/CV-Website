module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/app.*.ts',
    '!<rootDir>/node_modules/',
    'src/api/**/*.controller.ts',
    'src/api/**/*.module.ts',
    'src/database/**/*.controller.ts',
    'src/database/**/*.module.ts',
    'src/database/**/*.service.ts',
    'src/guard/**/*.ts',
    '!src/guard/auth/**/azuread.*.ts', // do not try to test azuread, it will fail
    '!<rootDir>/**/*.spec.ts',
  ],
  coverageDirectory: '../coverage',

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
  setupFilesAfterEnv: ['<rootDir>/test-e2e/setup.ts'],
};
