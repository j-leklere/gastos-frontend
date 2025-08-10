import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import pluginImport from "eslint-plugin-import";

export default [
  { ignores: ["android/**", "ios/**", "node_modules/**", "build/**"] },

  js.configs.recommended,

  pluginReact.configs.flat.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        __DEV__: "readonly",
        console: "readonly"
      }
    },
    plugins: {
      react: pluginReact,
      import: pluginImport,
      prettier: pluginPrettier
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      "no-undef": "error",
      "react/jsx-no-undef": "error",
      "import/no-unresolved": [
        "error",
        { commonjs: true, caseSensitive: true }
      ],

      "prettier/prettier": [
        "error",
        { endOfLine: "auto", trailingComma: "none" }
      ],

      "comma-dangle": ["off"]
    },
    settings: {
      react: { version: "detect" },

      "import/core-modules": [
        "react",
        "react-native",
        "expo",
        "expo-status-bar",
        "expo-linear-gradient",
        "@expo/vector-icons",
        "@react-navigation/native",
        "@react-navigation/bottom-tabs",
        "@react-navigation/native-stack",
        "@react-native-async-storage/async-storage",
        "axios"
      ],
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".json"] }
      }
    }
  }
];
