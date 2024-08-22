module.exports = {
  root: true,
  extends: ["@repo/eslint-config/typescript", "plugin:react-hooks/recommended", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  plugins: ["react-refresh", "react", "react-hooks"],
  settings: {
    "import/resolver": {
      typescript: {}
    },
    react: {
      version: "detect"
    }
  }
};
