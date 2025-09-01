import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import { globalIgnores } from "eslint/config";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    globalIgnores(["eslint.config.mjs", "dist/**/*", "vite.config.js"]),
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
        },
    },
);
