import globals from "globals";

/** @type {import('eslint').Linter.Config} */
export default {
  overrides: [
    {
      files: ["**/*.js"],
      languageOptions: {
        sourceType: "commonjs",
        globals: { ...globals.browser, ...globals.node }
      }
    }
  ]
};
