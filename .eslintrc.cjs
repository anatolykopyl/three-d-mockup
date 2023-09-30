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
    "simple-import-sort",
    "@typescript-eslint"
  ],
  ignorePatterns: [
    "dist/**/*",
  ],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "semi": "error",
    "quotes": ["error", "double"],
  }
};
