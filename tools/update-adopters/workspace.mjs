// update-adopters workspace and path code: the workspace root, path helpers (incl. pathKind's symlink-safety read), the pinned-version read and adopter discovery — the submodule-path rule is in ../update-adopters.mjs's header (CORE-EPIC-931).

import { lstat, readdir, readFile, realpath, stat } from 'node:fs/promises';
import { homedir } from 'node:os';
import { isAbsolute, join, normalize, resolve } from 'node:path';

import { FLAITRON_REPO, git } from './release.mjs';

export const FLAITRON_DIR = '.flaitron';
export const SUBMODULE_PATH = join(FLAITRON_DIR, 'core');

// expandHome/workspaceRoot/isFile mirror viz/src/workspace.ts verbatim (bar
// workspaceRoot's arg shape — root string here, env object there). Left
// duplicated rather than shared: the updater's modules have no package.json
// and run via plain `node`, so a shared module would either be plain JS imported
// across the tools/↔viz/src boundary (new coupling between two currently
// independent surfaces) or TS requiring a loader this script doesn't have —
// either breaks the zero-dep standalone property it's built on.
function expandHome(path) {
  if (path === '~') return homedir();
  if (path.startsWith('~/')) return join(homedir(), path.slice(2));
  return path;
}

export function workspaceRoot(rootArg) {
  const raw = rootArg ?? process.env.FLAITRON_VIZ_WORKSPACE;
  return expandHome(raw && raw.length > 0 ? raw : '~/code');
}

// See the expandHome comment above — same zero-dep tradeoff applies here.
async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

// realpath resolves symlinks and (on case-insensitive volumes) canonicalizes
// case, so two paths that only differ by case-insensitive spelling compare
// equal here. Falls back to resolve() for a path that doesn't exist (e.g. a
// broken symlink entry from readdir) rather than throwing.
export async function realOrResolve(path) {
  try {
    return await realpath(path);
  } catch {
    return resolve(path);
  }
}

// Same Version-line contract viz/src/workspace.ts's pinnedVersion reads — now
// name-aligned with that mirror too (was readFlowtronVersion; CORE-479).
export async function pinnedVersion(specPath) {
  try {
    const text = await readFile(specPath, 'utf8');
    const m = /^\*\*Version:\*\*\s*(v?\d+\.\d+\.\d+)/m.exec(text);
    if (!m) return null;
    return m[1].startsWith('v') ? m[1] : `v${m[1]}`;
  } catch {
    return null;
  }
}

// A url whose last path segment is the flaitron repo (`…/flaitron`,
// `…/Flaitron.git` [brand-casing: fixture], `git@host:org/flaitron`) — not any url merely containing
// the word, which would also catch e.g. a `flaitron-brand-assets` submodule.
const FLAITRON_URL = /(?:^|[/:])flaitron(?:\.git)?\/?$/i;

// The paths .gitmodules declares for submodules whose url names flaitron, in
// file order (natabula wave-bump takes the first; discoverAdopters prefers the
// first one checked out). Any git failure — no .gitmodules, no url entries, an
// unparsable file — reads as none, so the caller falls back to SUBMODULE_PATH
// as it did before this lookup existed. A declared path that is absolute or
// escapes the repo is ignored.
async function declaredSubmodulePaths(repo) {
  if (!(await isFile(join(repo, '.gitmodules')))) return [];
  const paths = [];
  try {
    const urls = await git(repo, 'config', '-z', '-f', '.gitmodules', '--get-regexp', '^submodule\\..*\\.url$');
    for (const entry of urls.split('\0')) {
      const nl = entry.indexOf('\n');
      if (nl === -1 || !FLAITRON_URL.test(entry.slice(nl + 1).trim())) continue;
      const pathKey = `${entry.slice(0, nl).replace(/\.url$/, '')}.path`;
      // Trailing separator stripped: it would otherwise reach rev-parse
      // HEAD:<path> and the commit pathspec.
      const path = normalize((await git(repo, 'config', '-f', '.gitmodules', '--get', pathKey)).trim()).replace(/\/+$/, '');
      if (isAbsolute(path) || path === '' || path === '.' || path === '..' || path.startsWith('../')) continue;
      paths.push(path);
    }
  } catch {
    // keep whatever resolved before the failure
  }
  return paths;
}

export async function discoverAdopters(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const flaitronReal = await realOrResolve(FLAITRON_REPO);
  const adopters = [];
  for (const entry of entries) {
    if (!(entry.isDirectory() || entry.isSymbolicLink())) continue;
    if (entry.name.startsWith('.')) continue;
    const repo = join(root, entry.name);
    if ((await realOrResolve(repo)) === flaitronReal) continue; // flaitron itself: /ft-release territory
    // First checked-out candidate wins; SUBMODULE_PATH stays last so a stale
    // or second flaitron-named entry never hides a working .flaitron/core.
    const declared = await declaredSubmodulePaths(repo);
    let subPath = null;
    for (const candidate of [...declared, SUBMODULE_PATH]) {
      if (await isFile(join(repo, candidate, 'SPEC.md'))) {
        subPath = candidate;
        break;
      }
    }
    if (subPath !== null) {
      adopters.push({ name: entry.name, repo, subPath });
    } else if (declared.length > 0) {
      // Declared but never checked out: no pin to read, but dropping it here
      // would remove it from the report without anyone noticing.
      adopters.push({ name: entry.name, repo, subPath: declared[0], uninitialised: true });
    }
  }
  adopters.sort((a, b) => a.name.localeCompare(b.name));
  return adopters;
}

// What the follow-through may do with `path` in `repo`, expecting a `type`
// ('file' or 'dir'): `type` itself (it is one, and resolves to itself inside
// the repo), 'symlink' (it or a parent directory is a symlink — a write would
// land elsewhere while `git add` staged only the link or refused the path),
// 'other' (present but not a `type`), or null when absent.
export async function pathKind(repo, path, type = 'file') {
  const abs = join(repo, path);
  let s;
  try {
    s = await lstat(abs);
  } catch {
    return null;
  }
  if (s.isSymbolicLink()) return 'symlink';
  if (!(type === 'dir' ? s.isDirectory() : s.isFile())) return 'other';
  return (await realOrResolve(abs)) === join(await realOrResolve(repo), path) ? type : 'symlink';
}
