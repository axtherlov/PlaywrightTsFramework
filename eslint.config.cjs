


const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const playwrightPlugin = require("eslint-plugin-playwright");
const globals = require("globals");

module.exports = [
    {
        ignores: ["node_modules/**", "playwright-report/**", "test-results/**"],
    },
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        },
    },
    {
        files: ["tests/**/*.ts"],
        plugins: {
            playwright: playwrightPlugin,
        },
        rules: {
            ...playwrightPlugin.configs.recommended.rules,
        },
    },
];
