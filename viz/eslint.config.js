import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';

// Shared-pure tier: viz/src/<name>.ts modules with no `node:` import.
// `tasknote-parse` is absent on purpose — Node-only despite no direct
// `node:` import. The tier test in src/sharedPure.test.ts is the check.
export const SHARED_PURE = [
  'parser',
  'tasknote',
  'fence',
  'sseChange',
  'storage',
  'viewMode',
  'visibilityPrefs',
  'projectStorage',
];

const SHARED_PURE_FILES = SHARED_PURE.map((name) => `src/${name}.ts`);
const SHARED_PURE_NAME = SHARED_PURE.join('|');

// Parent import, including a redundant `./` prefix (`./../devApi`). Optional
// fixture alternative is test files only — production UI cannot import it.
function uiParentImport(allowFixtures) {
  // Tests may also import the pre-render script as source (FE-132). The
  // second `../` is required so `../public/…` (under src/) stays banned.
  const themeInitRaw = '(?:\\.\\./)public/theme-init\\.js\\?raw$';
  const allowed = allowFixtures
    ? `(?:${SHARED_PURE_NAME})(?:\\.ts)?$|test/fixtures(?:\\.ts)?$|${themeInitRaw}`
    : `(?:${SHARED_PURE_NAME})(?:\\.ts)?$`;
  return `^(?:\\./)*\\.\\./(?!${allowed}).+`;
}

// Relative import that is not `./<name>` or `./<name>.ts` (extra `./`
// prefixes allowed). That also rejects `../src/devApi` and `../ui/App`.
const SHARED_PURE_RELATIVE =
  `^(?!(?:\\./)*(?:${SHARED_PURE_NAME})(?:\\.ts)?$)(?:\\./|\\.\\./).+`;

const UI_NODE_IMPORT = {
  group: ['node:*'],
  message:
    'src/ui/ must not import Node builtins — see README.md §"Hard rule: no Node imports under src/ui/".',
};

function uiParentPattern(allowFixtures) {
  return {
    regex: uiParentImport(allowFixtures),
    caseSensitive: true,
    message:
      'src/ui/ may import only SHARED_PURE modules via ../ — see README.md §"Hard rule: no Node imports under src/ui/".',
  };
}

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
    // Production UI. Parent imports are an allow-list (SHARED_PURE).
    // Test files are a separate block so only they may import the fixture helper.
    files: ['src/ui/**/*.{ts,tsx}'],
    ignores: ['src/ui/**/*.test.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [UI_NODE_IMPORT, uiParentPattern(false)] },
      ],
    },
  },
  {
    // UI tests. Same gates, plus the one non-tier helper they already import.
    files: ['src/ui/**/*.test.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [UI_NODE_IMPORT, uiParentPattern(true)] },
      ],
    },
  },
  {
    // Shared-pure modules are the SHARED_PURE allow-list. They stay
    // Node-free, and a relative import may name only another allow-list module.
    files: SHARED_PURE_FILES,
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
            {
              regex: SHARED_PURE_RELATIVE,
              caseSensitive: true,
              message:
                'Shared-pure modules may import only other SHARED_PURE modules via ./ — see README.md §"Architecture — three tiers".',
            },
          ],
        },
      ],
    },
  },
);
