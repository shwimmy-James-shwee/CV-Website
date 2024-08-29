/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  parser: "@typescript-eslint/parser",

  settings: {
    "import/resolver": {
      typescript: {
        project: "tsconfig.json",

        tsconfigRootDir: process.cwd()
      }
    }
  },
  plugins: ["@typescript-eslint/eslint-plugin", "@typescript-eslint"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "eslint-config-turbo",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
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

    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",

    "prettier/prettier": ["error"]
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"]
};
