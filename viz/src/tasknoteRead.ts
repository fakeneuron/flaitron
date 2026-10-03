import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseTasknote } from './tasknote-parse.ts';
import { realpathWithin, safeReaddir } from './fsSafe.ts';
import type { Tasknote } from './tasknote.ts';

// Read every `*.md` tasknote directly inside `dir`. Shared by
// `devApi.createActiveHandler` (the active `.flaitron/tasknote/` dir) and
// `archiveCache.readArchive` (one archive area dir per call): both need the
// identical readdir → containment → parse → drop loop, and a leaf module keeps
// them from importing each other.
//
// `realBase` must be the project root already resolved through symlinks (via
// `safeRealpath`), never `dir` itself. Anchoring containment on the leaf
// directory would be vacuous: if `tasknote/` (or `archive/`, or `.flaitron/`)
// is itself a symlink, everything under its target is trivially "inside" it, so
// only the root is a meaningful bound. Symlinked project roots stay legitimate:
// the root resolves first, then nothing below it may escape.
// Callers resolve the root and handle its `null` themselves because TypeScript
// cannot narrow a captured `string | null` inside the `files.map` closure.
//
// Two silent per-file drops, both deliberate, neither fatal to the listing:
//   * resolves outside the project root — no user action possible;
//   * unreadable or malformed — legacy archived tasknotes may carry malformed
//     YAML frontmatter (write-once policy in SPEC.md) and a TOCTOU delete
//     between readdir and readFile is routine during live editing. Per-file
//     warnings would be a wall of noise on every `npm run dev` for anyone with
//     old adopter checkouts.
//
// The parsed note records the pre-realpath `path`, matching what callers show
// the operator; the resolved path is used only to read the bytes.
export async function readTasknoteDir(
  realBase: string,
  dir: string,
): Promise<Tasknote[]> {
  const entries = await safeReaddir(dir);
  const files = entries.filter((e) => e.isFile() && e.name.endsWith('.md'));
  const notes = await Promise.all(
    files.map(async (e) => {
      const id = e.name.replace(/\.md$/, '');
      const path = join(dir, e.name);
      const realPath = await realpathWithin(realBase, path);
      if (realPath === null) return null;
      try {
        const text = await readFile(realPath, 'utf8');
        return parseTasknote(id, path, text);
      } catch {
        return null;
      }
    }),
  );
  return notes.filter((t): t is Tasknote => t !== null);
}
