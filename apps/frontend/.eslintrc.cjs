module.exports = {
    root: true,
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'prettier', 'plugin:storybook/recommended', '@repo/eslint-config/react-internal'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    ignorePatterns: ['dist', '.eslintrc.cjs', 'src/server/*', 'src/shared/'],
    plugins: ['react-refresh', 'react', 'react-hooks', '@typescript-eslint', 'prettier'],
    settings: {
        'import/resolver': {
            typescript: {},
        },
        react: {
            version: 'detect',
        },
    },
};