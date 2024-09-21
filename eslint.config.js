import path from "node:path";
import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import pluginJs from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  includeIgnoreFile(gitignorePath),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["tests/**"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.all.rules,
      "vitest/no-hooks": "off",
      "vitest/prefer-expect-assertions": ["warn", { onlyFunctionsWithAsyncKeyword: true }],
    },
  },
  {
    rules: {
      "no-param-reassign": ["error", { props: true }],
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",

      // https://github.com/vuejs/eslint-config-typescript/blob/60b143bfc734f3832a51bd5ddccd9970e3fc8c86/recommended.js
      "no-var": "error",
      "prefer-const": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
    },
  },
];
