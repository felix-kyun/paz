import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    globalIgnores(["node_modules/", "dist/", "*.config.{js,mjs,ts}"]),
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
        },
    },
];
