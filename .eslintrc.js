/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:solid/typescript",
  ],
  plugins: [
    "solid",
    "simple-import-sort"
  ],
  ignorePatterns: [
    "dist/**/*",
  ],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  }
};
