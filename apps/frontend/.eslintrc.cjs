module.exports = {
  root: true,
  extends: ['@repo/eslint-config/typescript'],
  plugins: ['react-refresh', 'react', 'react-hooks', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['**/schema.ts'],
};
