import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';
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

async function restricted(code: string, filePath: string): Promise<string[]> {
  const [result] = await eslint.lintText(code, { filePath });
  const fatal = result.messages.filter((message) => message.fatal);
  expect(fatal, result.messages.map((message) => message.message).join('\n')).toEqual([]);
  return result.messages
    .filter((message) => message.ruleId === 'no-restricted-imports')
    .map((message) => message.message);
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

  it('gates src/ui ../ imports and shared-pure relative imports through the allow-list', async () => {
    const ui = join(vizRoot, 'src/ui/probe.tsx');
    const uiTest = join(vizRoot, 'src/ui/probe.test.tsx');
    const pure = join(vizRoot, 'src/fence.ts');

    expect(await restricted("import '../parser';\n", ui)).toEqual([]);
    expect(await restricted("import '../parser.ts';\n", ui)).toEqual([]);
    expect(await restricted("import './../parser';\n", ui)).toEqual([]);
    expect(await restricted("import '../devApi';\n", ui)).toHaveLength(1);
    expect(await restricted("import '../devApi.ts';\n", ui)).toHaveLength(1);
    expect(await restricted("import './../devApi';\n", ui)).toHaveLength(1);
    expect(await restricted("import '../tasknote-parse';\n", ui)).toHaveLength(1);
    expect(await restricted("import '../tasknote-parse.ts';\n", ui)).toHaveLength(1);
    expect(await restricted("import '../test/../devApi';\n", ui)).toHaveLength(1);
    expect(await restricted("import '../test/fixtures';\n", ui)).toHaveLength(1);
    expect(await restricted("import 'node:fs';\n", ui)).toHaveLength(1);

    expect(await restricted("import '../test/fixtures';\n", uiTest)).toEqual([]);
    expect(await restricted("import '../test/fixtures.ts';\n", uiTest)).toEqual([]);
    expect(await restricted("import '../devApi';\n", uiTest)).toHaveLength(1);

    expect(await restricted("import './storage';\n", pure)).toEqual([]);
    expect(await restricted("import './fence.ts';\n", pure)).toEqual([]);
    expect(await restricted("import './devApi';\n", pure)).toHaveLength(1);
    expect(await restricted("import './devApi.ts';\n", pure)).toHaveLength(1);
    expect(await restricted("import './tasknote-parse.ts';\n", pure)).toHaveLength(1);
    expect(await restricted("import '../src/devApi.ts';\n", pure)).toHaveLength(1);
    expect(await restricted("import '../ui/App';\n", pure)).toHaveLength(1);
    expect(await restricted("import 'node:fs';\n", pure)).toHaveLength(1);
  });
});
