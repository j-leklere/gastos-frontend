// eslint.config.mjs
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import pluginImport from "eslint-plugin-import";

export default [
  {
    ignores: ["android/**", "ios/**", "node_modules/**", "build/**", ".expo/**"]
  },
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { __DEV__: "readonly", console: "readonly" }
    },
    plugins: {
      react: pluginReact,
      import: pluginImport,
      prettier: pluginPrettier
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "import/no-unresolved": ["error", { caseSensitive: true }],
      "prettier/prettier": [
        "error",
        { endOfLine: "auto", trailingComma: "none" }
      ]
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx", ".json"] }
      }
    }
  }
];
