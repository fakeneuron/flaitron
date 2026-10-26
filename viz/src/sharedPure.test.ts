import { readdirSync, readFileSync } from 'node:fs';
import { builtinModules } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
// eslint.config.js is plain JS; tsconfig allowJs is false, so the import has no types.
// @ts-expect-error TS7016 — named export is the SHARED_PURE allow-list.
import { SHARED_PURE as sharedPureExport } from '../eslint.config.js';

const SHARED_PURE = sharedPureExport as readonly string[];

const srcDir = dirname(fileURLToPath(import.meta.url));
const vizRoot = dirname(srcDir);

// The one viz/src/*.ts module with no `node:` import that is still Node-only.
const NAMED_EXCEPTION = 'tasknote-parse';
const NODE_IMPORT = /['"]node:/;

const eslint = new ESLint({
  cwd: vizRoot,
  overrideConfigFile: join(vizRoot, 'eslint.config.js'),
});

const TIER_RULES = new Set([
  'no-restricted-imports',
  'flaitron/no-restricted-import-expressions',
  '@typescript-eslint/triple-slash-reference',
]);

async function restricted(code: string, filePath: string): Promise<string[]> {
  const [result] = await eslint.lintText(code, { filePath });
  const fatal = result.messages.filter((message) => message.fatal);
  expect(fatal, result.messages.map((message) => message.message).join('\n')).toEqual([]);
  return result.messages
    .filter((message) => message.ruleId !== null && TIER_RULES.has(message.ruleId))
    .map((message) => message.message);
}

// Resolves `extends` and include/exclude globs the way tsc does.
function parseTsconfig(name: string): ts.ParsedCommandLine {
  const path = join(vizRoot, name);
  const { config, error } = ts.readConfigFile(path, ts.sys.readFile);
  expect(error).toBeUndefined();
  const parsed = ts.parseJsonConfigFileContent(config, ts.sys, vizRoot, undefined, path);
  expect(parsed.errors).toEqual([]);
  return parsed;
}

// `import '../parser';`, `import('../parser');`, and
// `typeof import('../parser')` must take the same gate.
function specifierOf(snippet: string): string {
  const match = snippet.match(/^import (['"][^'"]+['"]);\n$/);
  if (!match) {
    throw new Error(`not a static import fixture: ${snippet}`);
  }
  return match[1];
}

async function expectGate(snippet: string, filePath: string, banned: boolean): Promise<void> {
  const specifier = specifierOf(snippet);
  const forms = [
    snippet,
    `import(${specifier});\n`,
    `export type T = typeof import(${specifier});\n`,
  ];
  for (const form of forms) {
    const messages = await restricted(form, filePath);
    if (banned) {
      expect(messages, form).toHaveLength(1);
    } else {
      expect(messages, form).toEqual([]);
    }
  }
}

describe('SHARED_PURE', () => {
  it('classifies every non-test viz/src/*.ts by node: import, except tasknote-parse', () => {
    const files = readdirSync(srcDir).filter(
      (name) => name.endsWith('.ts') && !name.endsWith('.test.ts'),
    );
    const allowed = new Set(SHARED_PURE);

    for (const file of files) {
      const name = file.slice(0, -'.ts'.length);
      const hasNode = NODE_IMPORT.test(readFileSync(join(srcDir, file), 'utf8'));
      if (name === NAMED_EXCEPTION) {
        expect(hasNode, `${name} stays the named exception only while it has no node: import`).toBe(false);
        expect(allowed.has(name)).toBe(false);
        continue;
      }
      expect(allowed.has(name), name).toBe(!hasNode);
    }

    for (const name of SHARED_PURE) {
      expect(files, name).toContain(`${name}.ts`);
    }
  });

  it('typechecks exactly src/ui, main.tsx, and SHARED_PURE in the Node-free browser tsconfig', () => {
    const parsed = parseTsconfig('tsconfig.browser.json');
    expect(parsed.options.types).toEqual([]);

    const files = new Set(parsed.fileNames);
    const ui = readdirSync(join(srcDir, 'ui')).filter((name) => /\.tsx?$/.test(name));
    for (const name of ui) {
      expect(files, `ui/${name}`).toContain(join(srcDir, 'ui', name));
    }
    expect(files).toContain(join(srcDir, 'main.tsx'));

    const topLevel = parsed.fileNames
      .filter((file) => dirname(file) === srcDir && file.endsWith('.ts'))
      .map((file) => file.slice(srcDir.length + 1, -'.ts'.length));
    expect(topLevel.sort()).toEqual([...SHARED_PURE].sort());
  });

  it('typechecks exactly the Node-only src/*.ts and vite.config.ts in the DOM-free node tsconfig', () => {
    const parsed = parseTsconfig('tsconfig.node.json');
    expect(parsed.options.types).toEqual(['node']);
    expect(parsed.options.lib?.filter((lib) => /dom/i.test(lib))).toEqual([]);
    // react-jsx would import react/jsx-runtime, whose globals declare HTMLElement.
    expect(parsed.options.jsx).toBe(ts.JsxEmit.Preserve);

    // A shared-pure module's test is excluded with it.
    const allowed = new Set(SHARED_PURE);
    const nodeOnly = readdirSync(srcDir)
      .filter((name) => name.endsWith('.ts') && !allowed.has(name.replace(/(\.test)?\.ts$/, '')))
      .map((name) => join(srcDir, name));
    expect([...parsed.fileNames].sort()).toEqual([...nodeOnly, join(vizRoot, 'vite.config.ts')].sort());
  });

  it('gates src/ui ../ imports and shared-pure relative imports through the allow-list', async () => {
    const ui = join(vizRoot, 'src/ui/probe.tsx');
    const uiTest = join(vizRoot, 'src/ui/probe.test.tsx');
    const pure = join(vizRoot, 'src/fence.ts');

    await expectGate("import '../parser';\n", ui, false);
    await expectGate("import '../parser.ts';\n", ui, false);
    await expectGate("import './../parser';\n", ui, false);
    await expectGate("import '../devApi';\n", ui, true);
    await expectGate("import '../devApi.ts';\n", ui, true);
    await expectGate("import './../devApi';\n", ui, true);
    await expectGate("import '../tasknote-parse';\n", ui, true);
    await expectGate("import '../tasknote-parse.ts';\n", ui, true);
    await expectGate("import '../test/../devApi';\n", ui, true);
    await expectGate("import '../test/fixtures';\n", ui, true);
    await expectGate("import 'node:fs';\n", ui, true);
    // A bare builtin is Node too; a look-alike sibling or package is not.
    await expectGate("import 'fs';\n", ui, true);
    await expectGate("import 'path';\n", ui, true);
    await expectGate("import 'fs/promises';\n", ui, true);
    await expectGate("import './fs';\n", ui, false);
    await expectGate("import 'fs-extra';\n", ui, false);
    await expectGate("import 'react';\n", ui, false);
    for (const name of builtinModules.filter((builtin) => !builtin.startsWith('node:'))) {
      await expectGate(`import '${name}';\n`, ui, true);
    }

    await expectGate("import '../test/fixtures';\n", uiTest, false);
    await expectGate("import '../test/fixtures.ts';\n", uiTest, false);
    await expectGate("import '../../public/theme-init.js?raw';\n", uiTest, false);
    await expectGate("import '../../public/theme-init.js';\n", uiTest, true);
    await expectGate("import '../../public/theme-init.js?raw';\n", ui, true);
    await expectGate("import 'node:fs';\n", uiTest, true);
    await expectGate("import 'fs';\n", uiTest, true);
    await expectGate("import '../devApi';\n", uiTest, true);

    await expectGate("import './storage';\n", pure, false);
    await expectGate("import './fence.ts';\n", pure, false);
    await expectGate("import './devApi';\n", pure, true);
    await expectGate("import './devApi.ts';\n", pure, true);
    await expectGate("import './tasknote-parse.ts';\n", pure, true);
    await expectGate("import '../src/devApi.ts';\n", pure, true);
    await expectGate("import '../ui/App';\n", pure, true);
    await expectGate("import 'node:fs';\n", pure, true);
    await expectGate("import 'fs';\n", pure, true);
    await expectGate("import 'fs/promises';\n", pure, true);
    await expectGate("import 'fs-extra';\n", pure, false);

    // A static template literal is still a static specifier. A computed one is not on the allow-list.
    expect(await restricted('import(`../parser`);\n', ui)).toEqual([]);
    expect(await restricted('import(`../devApi`);\n', ui)).toHaveLength(1);
    expect(await restricted('import(`./storage`);\n', pure)).toEqual([]);
    expect(await restricted("import('../' + 'devApi');\n", ui)).toEqual([
      'Dynamic import() specifiers must be a static string so the SHARED_PURE gate can check them — see README.md §"Hard rule: no Node imports under src/ui/".',
    ]);
    expect(await restricted('import(`../${"devApi"}`);\n', ui)).toHaveLength(1);
    expect(await restricted("import('./' + 'devApi');\n", pure)).toEqual([
      'Dynamic import() specifiers must be a static string so the SHARED_PURE gate can check them — see README.md §"Architecture — three tiers".',
    ]);
    expect(await restricted("import('./' + 'devApi');\n", uiTest)).toHaveLength(1);

    // A qualified type import without `typeof` is the same TSImportType node.
    expect(await restricted("export type T = import('../devApi').Api;\n", ui)).toHaveLength(1);
    expect(await restricted("export type T = import('../parser').Api;\n", ui)).toEqual([]);
    expect(await restricted("export type T = import('node:fs').Stats;\n", uiTest)).toHaveLength(1);
    expect(await restricted("export type T = import('./devApi').Api;\n", pure)).toHaveLength(1);
    // A backtick type specifier is checked like the value form, not a crash.
    expect(await restricted('export type T = typeof import(`../devApi`);\n', ui)).toHaveLength(1);
    expect(await restricted('export type T = typeof import(`../parser`);\n', ui)).toEqual([]);

    // A triple-slash types directive brings in ambient types with no import node.
    const nodeTypes = '/// <reference types="node" />\nexport type T = NodeJS.Process;\n';
    const tripleSlash = ['Do not use a triple slash reference for node, use `import` style instead.'];
    expect(await restricted(nodeTypes, ui)).toEqual(tripleSlash);
    expect(await restricted(nodeTypes, join(vizRoot, 'src/ui/probe.d.ts'))).toEqual(tripleSlash);
    expect(await restricted(nodeTypes, uiTest)).toEqual(tripleSlash);
    expect(await restricted(nodeTypes, pure)).toEqual(tripleSlash);
    expect(await restricted(nodeTypes, join(vizRoot, 'src/devApi.ts'))).toEqual([]);

    const live = join(vizRoot, 'src/ui/TaskDetailPanel.tsx');
    expect(await restricted(readFileSync(live, 'utf8'), live)).toEqual([]);
  });
});
