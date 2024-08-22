module.exports = {
  root: true,
  extends: ["@repo/eslint-config/typescript"],
  plugins: ["@typescript-eslint/eslint-plugin", "@typescript-eslint", "prettier"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  }
};
