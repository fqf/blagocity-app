import js from "@eslint/js";
import { configs } from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import expoConfig from "eslint-config-expo/flat.js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginReactCompiler from "eslint-plugin-react-compiler";

export default defineConfig([
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  pluginReact.configs.flat.recommended,
  eslintPluginReactCompiler.configs.recommended,
  expoConfig,
  {
    rules: {
      "prettier/prettier": "error",
      "react-compiler/react-compiler": "error",
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
]);
