import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import pluginImport from "eslint-plugin-import";

export default [
  {
    ignores: [
      "node_modules/**",
      "android/**",
      "ios/**",
      ".expo/**",
      "build/**",
      "dist/**",
      "babel.config.js"
    ]
  },
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{ts,tsx}", "app.config.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      },
      globals: { __DEV__: "readonly", console: "readonly" }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
      import: pluginImport,
      prettier: pluginPrettier
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "import/no-unresolved": [
        "error",
        { ignore: ["dotenv/config"], caseSensitive: true }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" }
      ],
      "prettier/prettier": [
        "error",
        { endOfLine: "auto", trailingComma: "none" }
      ]
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
          alwaysTryTypes: true
        },
        alias: {
          map: [["@", "./src"]],
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
        },
        node: { extensions: [".ts", ".tsx", ".js", ".jsx", ".json"] }
      }
    }
  },
  {
    files: ["**/*.{js,jsx}"],
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
        node: { extensions: [".js", ".jsx", ".ts", ".tsx", ".json"] },
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
        }
      }
    }
  },
  {
    files: ["app.config.ts"],
    languageOptions: {
      globals: {
        ...require("globals").node
      }
    }
  }
];
