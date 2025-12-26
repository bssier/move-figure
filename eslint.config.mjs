import globals from 'globals';
import * as tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export const config =  defineConfig([
    { files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.browser } },
    tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
]);
