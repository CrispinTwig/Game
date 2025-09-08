import { defineConfig, globalIgnores  } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';

export default defineConfig([
    { files: [ '**/*.{js,mjs,cjs}' ] },
    { files: [ '**/*.{js,mjs,cjs}' ], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    { files: [ '**/*.{js,mjs,cjs}' ], plugins: { js }, extends: [ 'js/recommended' ] },
    {
        rules: {
            quotes: [ 'error', 'single', { avoidEscape: true } ],
            indent: [ 'error', 4, { 'SwitchCase' : 1 } ],
            semi: [ 'error', 'always' ],
            'object-curly-spacing': [ 'error', 'always' ],
            'array-bracket-spacing': [ 'error', 'always' ],
            'comma-spacing': [ 'error', { 'before': false, 'after': true } ]
        }
    },
    globalIgnores([
        'dist/*',
        'src_orig/*'
    ]),
]);
