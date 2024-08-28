module.exports = {
  root: true,
  extends: ["@repo/eslint-config/typescript"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
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
