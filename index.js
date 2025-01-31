// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import nodStudioConfigTs from "@nodstudio/eslint-config-ts";
import typescriptParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...nodStudioConfigTs,
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parser: typescriptParser,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    plugins: { react: reactPlugin },
    rules: {
      "react/jsx-fragments": ["error", "syntax"],
    },
  },
  ...tailwind.configs["flat/recommended"],
  ...compat.extends("plugin:react-hooks/recommended"),
];
