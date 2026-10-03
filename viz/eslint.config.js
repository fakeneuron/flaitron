import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  { ignores: ['dist/**', 'public/**', 'node_modules/**'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
      // Enable only the two canonical React Hooks rules. The v7
      // `configs.flat.recommended` preset additionally bundles the React
      // Compiler ruleset (set-state-in-effect, refs, purity, …), which flags
      // well-established correct patterns here (fetch-on-mount effects, the
      // ref-latest-value idiom in useProjectData) as errors — out of scope
      // for this guardrail. Revisit the full preset only on a deliberate
      // React Compiler adoption.
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    // Codifies the ui-tier hard rule from README.md §"Hard rule: no Node
    // imports under src/ui/" — src/ui/ is a Node-free tier, never a
    // Node-only tier module or a node: builtin.
    files: ['src/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['node:*'],
              message:
                'src/ui/ must not import Node builtins — see README.md §"Hard rule: no Node imports under src/ui/".',
            },
            {
              group: [
                '**/devApi',
                '**/devApi.ts',
                '**/workspace',
                '**/workspace.ts',
                '**/fsSafe',
                '**/fsSafe.ts',
                '**/tasknoteRead',
                '**/tasknoteRead.ts',
                '**/tasknote-parse',
                '**/tasknote-parse.ts',
                '**/archiveCache',
                '**/archiveCache.ts',
                '**/flaitronWatch',
                '**/flaitronWatch.ts',
                '**/watchSet',
                '**/watchSet.ts',
                '**/originGuard',
                '**/originGuard.ts',
                '**/apiResponse',
                '**/apiResponse.ts',
              ],
              message:
                'src/ui/ must not import Node-only tier modules — see README.md §"Hard rule: no Node imports under src/ui/".',
            },
          ],
        },
      ],
    },
  },
  {
    // Codifies the shared-pure tier's Node-free convention from README.md
    // §"Architecture — three tiers" — these eight modules are usable from
    // the browser bundle, so they must never import Node builtins either.
    files: [
      'src/parser.ts',
      'src/tasknote.ts',
      'src/fence.ts',
      'src/sseChange.ts',
      'src/storage.ts',
      'src/viewMode.ts',
      'src/visibilityPrefs.ts',
      'src/projectStorage.ts',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['node:*'],
              message:
                'Shared-pure modules must not import Node builtins — see README.md §"Architecture — three tiers".',
            },
          ],
        },
      ],
    },
  },
);
