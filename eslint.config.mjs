import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // The admin panel is a dark-mode island that uses plain anchors for its
    // list -> edit -> back navigation. Next's Link rule does not apply to the
    // admin route tree.
    files: ["src/app/admin/**/*.{ts,tsx}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    // The legacy root-level helper scripts are CommonJS and outside the app.
    files: ["*.js", "scripts/*.js", "update_*.js", "seed_*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);

export default eslintConfig;
