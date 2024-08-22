const { resolve } = require("node:path");

// const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

// module.exports = {
//     extends: [
//         'plugin:@typescript-eslint/recommended',
//         require.resolve('eslint-config-turbo'),
//     ],
//     parser: '@typescript-eslint/parser',
//     parserOptions: {
//         project,
//     },
//     globals: {
//         React: true,
//         JSX: true,
//     },
//     settings: {
//         'import/resolver': {
//             typescript: {
//                 project,
//             },
//         },
//     },
//     ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js'],
//     // add rules configurations here
//     rules: {
//         'import/no-default-export': 'off',
//     },
// };

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    // tsconfigRootDir: __dirname,
    tsconfigRootDir: process.cwd(),
    sourceType: "module"
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: "tsconfig.json",

        tsconfigRootDir: process.cwd()
      }
    }
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "eslint-config-turbo"],
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  ignorePatterns: [".eslintrc.js", "!prisma/*.ts"],
  rules: {
    camelcase: "error",
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/no-unused-vars": [
      "error", // or "warn"
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }
    ],
    "@typescript-eslint/no-var-requires": 0,
    "no-console": "error",
    "no-restricted-syntax": [
      "error",
      {
        selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
        message: "Unexpected property on console object was called"
      }
    ],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": ["error"]
  }
};
