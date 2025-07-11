import {FlatCompat} from "@eslint/eslintrc";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const customRules = {
  rules: {
    "react-hooks/exhaustive-deps": "error",
    "no-console": "warn",
    "no-debugger": "warn",
    "prefer-const": "warn",
    "import/no-anonymous-default-export": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/jsx-curly-spacing": ["error", "never"],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
  },
};

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  customRules,
  {
    ignores: [
      "**/node_modules/*",
      ".next/*",
      "out/*",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/__mocks__/*",
      "**/__tests__/*",
      "**/*.d.ts",
    ],
  },
];

export default eslintConfig;
