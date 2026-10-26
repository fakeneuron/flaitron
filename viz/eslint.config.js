import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import { builtinModules, createRequire } from 'node:module';

// Same matcher core `no-restricted-imports` uses for `group` patterns.
// A direct devDependency: eslint's copy is not a dependency this file may import.
const require = createRequire(import.meta.url);
const ignore = require('ignore');

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

// A bare builtin (`'fs'`, `'fs/promises'`) resolves to Node just like `node:fs`.
// `group` is gitignore-style, so the leading `/` anchors each name to the whole
// specifier; unanchored, `fs` would also ban a sibling `./fs`.
const NODE_BUILTIN_GROUP = [
  'node:*',
  ...builtinModules
    .filter((name) => !name.startsWith('node:'))
    .map((name) => `/${name}`),
];

const UI_NODE_IMPORT = {
  group: NODE_BUILTIN_GROUP,
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

// Core `no-restricted-imports` visits ImportDeclaration / export declarations
// only. `import()` is an ImportExpression and a type-position `import('…')` is
// a TSImportType, so the same pattern objects are applied here or either
// specifier bypasses the tier gate.
function staticSpecifier(node) {
  if (node.type === 'Literal' && typeof node.value === 'string') {
    return node.value;
  }
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) {
    const cooked = node.quasis.map((quasi) => quasi.value.cooked);
    if (cooked.every((part) => typeof part === 'string')) {
      return cooked.join('');
    }
  }
  return null;
}

function compileImportPatterns(patterns) {
  return patterns.map((pattern) => {
    if (typeof pattern.regex === 'string') {
      const regex = new RegExp(pattern.regex, pattern.caseSensitive ? 'u' : 'iu');
      return { test: (source) => regex.test(source), message: pattern.message };
    }
    const matcher = ignore({
      allowRelativePaths: true,
      ignorecase: !pattern.caseSensitive,
    }).add(pattern.group);
    return { test: (source) => matcher.ignores(source), message: pattern.message };
  });
}

const flaitronPlugin = {
  meta: { name: 'flaitron' },
  rules: {
    'no-restricted-import-expressions': {
      meta: {
        type: 'problem',
        schema: [
          {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                group: { type: 'array', items: { type: 'string' } },
                regex: { type: 'string' },
                message: { type: 'string' },
                caseSensitive: { type: 'boolean' },
              },
              additionalProperties: false,
            },
          },
          {
            type: 'object',
            properties: { nonStaticMessage: { type: 'string' } },
            required: ['nonStaticMessage'],
            additionalProperties: false,
          },
        ],
        messages: {
          restricted: '{{message}}',
          nonStatic: '{{message}}',
        },
      },
      create(context) {
        const compiled = compileImportPatterns(context.options[0] ?? []);
        const nonStaticMessage = context.options[1].nonStaticMessage;
        function checkSource(node) {
          const specifier = staticSpecifier(node.source);
          if (specifier === null) {
            context.report({
              node: node.source,
              messageId: 'nonStatic',
              data: { message: nonStaticMessage },
            });
            return;
          }
          const source = specifier.trim();
          for (const pattern of compiled) {
            if (pattern.test(source)) {
              context.report({
                node: node.source,
                messageId: 'restricted',
                data: { message: pattern.message },
              });
            }
          }
        }
        return {
          ImportExpression: checkSource,
          // Type-position `import('…')` (`typeof import('x')`, `import('x').T`).
          // TS allows only a string literal here, but the parser still hands a
          // backtick specifier over as a TemplateLiteral.
          TSImportType: checkSource,
        };
      },
    },
  },
};

function tierImportRules(patterns, nonStaticMessage) {
  return {
    plugins: { flaitron: flaitronPlugin },
    rules: {
      'no-restricted-imports': ['error', { patterns }],
      'flaitron/no-restricted-import-expressions': [
        'error',
        patterns,
        { nonStaticMessage },
      ],
      // `/// <reference types="node" />` pulls in Node ambient types with no
      // import node. The recommended `prefer-import` default lets it through.
      '@typescript-eslint/triple-slash-reference': ['error', { types: 'never' }],
    },
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
    ...tierImportRules(
      [UI_NODE_IMPORT, uiParentPattern(false)],
      'Dynamic import() specifiers must be a static string so the SHARED_PURE gate can check them — see README.md §"Hard rule: no Node imports under src/ui/".',
    ),
  },
  {
    // UI tests. Same gates, plus the one non-tier helper they already import.
    files: ['src/ui/**/*.test.{ts,tsx}'],
    ...tierImportRules(
      [UI_NODE_IMPORT, uiParentPattern(true)],
      'Dynamic import() specifiers must be a static string so the SHARED_PURE gate can check them — see README.md §"Hard rule: no Node imports under src/ui/".',
    ),
  },
  {
    // Shared-pure modules are the SHARED_PURE allow-list. They stay
    // Node-free, and a relative import may name only another allow-list module.
    files: SHARED_PURE_FILES,
    ...tierImportRules(
      [
        {
          group: NODE_BUILTIN_GROUP,
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
      'Dynamic import() specifiers must be a static string so the SHARED_PURE gate can check them — see README.md §"Architecture — three tiers".',
    ),
  },
);
