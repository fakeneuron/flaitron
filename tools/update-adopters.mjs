#!/usr/bin/env node
// update-adopters — batch-bump flaitron adopter pins to the latest release.
//
// The singular script exception to SPEC.md §"What flaitron does NOT provide"
// (see the carve-out there): operator-side fleet maintenance across ~/code,
// not workflow machinery inside a project. It batches the /ft-update recipe:
// for every adopter pinned behind the latest released tag, move the
// .flaitron/core submodule pin and commit — locally only, never pushing.
//
// Usage:
//   node tools/update-adopters.mjs            # dry-run: report what would happen
//   node tools/update-adopters.mjs --apply    # perform the bumps + commits
//   node tools/update-adopters.mjs --root <dir>   # workspace override
//                                             # (default $FLAITRON_VIZ_WORKSPACE or ~/code)
//
// Exit codes: 0 = every adopter checked (or bumped) cleanly — skips and drift
// are reported outcomes, not failures; 1 = at least one adopter failed its
// check or bump (the ✗ lines, which go to stderr), or a pre-flight guard
// aborted; 2 = usage error (bad CLI args, or FLAITRON_UPDATE_LATEST set to a
// non-semver value). A failure never aborts the sweep, so the exit status is
// what a wrapper script has to read.
//
// Per-adopter safety gates (any hit → skip that repo, report why):
//   - .flaitron/core/SPEC.md's Version line is unreadable → the current pin
//     can't be established, so no range can be reasoned about
//   - adopter repo's HEAD is detached (tag checkout, mid-bisect, mid-rebase)
//     → a bump commit here would have no branch to land on and be orphaned
//   - adopter pinned NEWER than the latest known release → bumping would
//     downgrade it (usually a stale tag list in this checkout)
//   - pinned tag can't be resolved locally (deleted/renamed upstream, or a
//     hand-edited SPEC.md Version line) → no real commit to reason a range
//     from; skip rather than compute a range against a nonexistent tag
//   - release range carries a real Migration block (BREAKING or required
//     project-side edits) → manual /ft-update required
//   - release range carries a tag whose notes can't be classified at all
//     (lightweight tag, or annotated with an empty message) → fail closed
//     rather than assume non-breaking; see migrationBearingTags
//   - staged changes in the adopter's index → a commit here would surprise
//   - dirty .flaitron/core submodule worktree
//   - the committed gitlink (or the latest tag's commit) can't be resolved at
//     all → the pin can't be verified either way, so report the git error
//     rather than the ✓ current this used to fall through to
//
// Rename migration (v6.0.0, CORE-711.3): an adopter still on the pre-rename
// .flowtron/core layout is classified `migrate`, not `bump` — automatically, no
// flag. --apply then moves .flowtron/ → .flaitron/ (untracked contents travel),
// renames the submodule (path, name, .git/modules dir, gitfile, .git/config
// section), points the .gitmodules url at the renamed repo, re-points tracked
// symlinks whose target runs through .flowtron/, rewrites tracked .gitignore
// rules naming it (else files they ignored, moved along, resurface as
// untracked), and bumps the pin — all in one commit, unwound on any failure. Every gate above still applies, on the
// pre-rename submodule path, plus two of its own: the latest release must be
// RENAME_TAG or later (a v5 pin moved into .flaitron/ would read paths that do
// not exist there), and .flaitron/ must not already exist. The migration-bearing
// gate is lifted for RENAME_TAG only — its Migration block is exactly the move
// this performs; any other bearing release in the range still skips.
//
// Gitlink-drift detection: even when the checked-out .flaitron/core/SPEC.md reads
// the latest release, the superproject's committed submodule pin can still record
// an older commit (the tag was checked out inside .flaitron/core but the pin was
// never committed). The submodule worktree is clean, so the dirty-worktree gate
// misses it — a fresh clone would revert to the stale pin. Such a repo is reported
// as `drift` (not `current`); the fix is `git add .flaitron/core` + commit, or
// /ft-update. Report-only — never auto-committed. When either side of that
// comparison can't be resolved, the lookup returns an unresolved sentinel and
// the adopter is skipped with git's message: an unverifiable pin is reported as
// unverified, never as current.
//
// The reverse also happens: the committed pin already matches the latest tag,
// but the checked-out .flaitron/core worktree (what SPEC.md reads) is behind —
// e.g. after a superproject checkout without `git submodule update`. Left
// undetected, `checkAdopter` would classify this as an ordinary `bump` and
// `applyBump` would stage a gitlink identical to HEAD, then fail to commit it
// ("nothing to commit"); the resulting rollback resets the worktree back to
// the stale SHA, un-fixing a repo that only needed `git submodule update`. So
// this direction is detected up front too and reported as `drift` before any
// bump-path work runs. (Neither drift direction applies to a migrate: its
// commit restages the gitlink alongside the layout move, so it is never empty.)
//
// Mid-bump rollback: applyBump mutates the adopter (submodule checkout, then a
// staged gitlink) before it commits, and every step after the checkout can fail.
// Without recovery a failed bump leaves the repo half-updated — submodule at the
// new tag, gitlink possibly staged, nothing committed — and the residue is
// self-concealing: the worktree now reads the new version, so a re-run classifies
// the repo as current/drift rather than bump and the failure never resurfaces. So
// the prior submodule SHA is captured before the checkout and restored (plus the
// gitlink unstaged, when it got that far) on any later failure. The original error
// still propagates to the ✗ report line; a rollback that itself fails is appended
// to it rather than swallowed.
//
// The bump commit itself passes --no-verify: it is a pathspec commit touching only
// the .flaitron/core gitlink, a pure pin move with no adopter-authored content for a
// pre-commit or commit-msg hook to lint. --no-verify skips only those two hooks
// (prepare-commit-msg and post-commit still run); during a fleet-wide sweep,
// skipping pre-commit/commit-msg keeps the commit's success contingent only on
// the gitlink move that produced it, rather than on unrelated adopter-hook
// failures or side effects. The migrate commit passes it for the same reason: it
// carries only what the migration itself staged.
//
// Not covered (by design — run /ft-update in the repo for these): per-project
// symlink wiring for newly shipped skills, and audit-fork drift scans. When a
// bumped range ships a new *per-project-wired* skill (one named in a platform
// AGENTS-snippet ln -s block), the report flags the repo and names the affected
// wiring surface.

import { execFile } from 'node:child_process';
import {
  lstat,
  mkdir,
  readdir,
  readFile,
  readlink,
  realpath,
  rename,
  rmdir,
  stat,
  symlink,
  unlink,
  writeFile,
} from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

if (Number(process.versions.node.split('.')[0]) < 20) {
  console.error(`update-adopters requires Node ≥20 (found ${process.version})`);
  process.exit(1);
}

const execFileAsync = promisify(execFile);

const FLAITRON_REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FLAITRON_DIR = '.flaitron';
const SUBMODULE_PATH = join(FLAITRON_DIR, 'core');
// The pre-rename layout the v6 migration reads. The old name survives in this
// script only where the migration (or the legacy .flowtron/flowtron detection)
// has to read it.
const PRE_RENAME_DIR = '.flowtron';
const PRE_RENAME_SUBMODULE_PATH = join(PRE_RENAME_DIR, 'core');
// The release that ships the rename. Its own Migration block is the move
// applyMigrate performs, so only this tag is lifted from the migration gate.
const RENAME_TAG = 'v6.0.0';
// Cursor and Grok are "thin bundle" wiring surfaces: neither ships its own
// skills directory — both symlink canonical claude/skills/ bodies into their
// own <platform>/skills/ path — so their surface config is identical bar
// `label` and `snippetPath`.
function thinClaudeSkillsSurface(label, snippetPath) {
  return {
    label,
    snippetPath,
    diffPaths: ['claude/skills/'],
    snippetKeyPattern: /\.flaitron\/core\/(claude\/skills\/\S+)/,
    addedKeyForFile(path) {
      const skill = path.match(/^(claude\/skills\/[^/]+)/);
      return skill ? skill[1] : null;
    },
  };
}

const WIRING_SURFACES = [
  {
    label: 'Claude .claude/',
    snippetPath: 'claude/AGENTS-snippet.md',
    diffPaths: ['claude/skills/', 'claude/commands/'],
    snippetKeyPattern: /\.flaitron\/core\/(claude\/(?:skills|commands)\/\S+)/,
    addedKeyForFile(path) {
      const skill = path.match(/^(claude\/skills\/[^/]+)/);
      if (skill) return skill[1];
      const command = path.match(/^(claude\/commands\/[^/]+\.md)$/);
      if (command) return command[1];
      return null;
    },
  },
  {
    label: 'Codex .agents/skills',
    snippetPath: 'codex/AGENTS-snippet.md',
    diffPaths: ['codex/skills/'],
    snippetKeyPattern: /\.flaitron\/core\/(codex\/skills\/\S+)/,
    addedKeyForFile(path) {
      const skill = path.match(/^(codex\/skills\/[^/]+)/);
      return skill ? skill[1] : null;
    },
  },
  thinClaudeSkillsSurface('Cursor .cursor/skills', 'cursor/AGENTS-snippet.md'),
  thinClaudeSkillsSurface('Grok .grok/skills', 'grok/AGENTS-snippet.md'),
];

// FLAITRON_FETCH_TIMEOUT_MS override read at call time (not cached at module
// load) so tests can shrink it per-case without a child-process boundary.
function fetchTimeoutMs() {
  const raw = Number(process.env.FLAITRON_FETCH_TIMEOUT_MS);
  return Number.isFinite(raw) && raw > 0 ? raw : 30000;
}

// A trailing plain-object arg is popped off as execFile options (e.g.
// `{ timeout }` for the one call site that hits the network) — additive to
// the rest-args signature every other call site already uses. GIT_TERMINAL_PROMPT=0
// always applies: without it, a git spawned against a repo needing credentials
// blocks on an interactive prompt this script has no stdin to answer, hanging
// the sweep the same way a stalled remote does.
export async function git(cwd, ...args) {
  const options =
    args.length > 0 && typeof args[args.length - 1] === 'object' && args[args.length - 1] !== null
      ? args.pop()
      : {};
  try {
    const { stdout } = await execFileAsync('git', args, {
      cwd,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
      ...options,
    });
    return stdout;
  } catch (e) {
    // Node's own timeout error never says "timeout" anywhere, which would
    // otherwise render as an unreadable ✗ line.
    if (options.timeout && e.killed) {
      e.message = `git ${args.join(' ')} timed out after ${options.timeout}ms`;
    }
    throw e;
  }
}

const USAGE = 'Usage: node tools/update-adopters.mjs [--apply] [--root <dir>]';

function usageError(firstLine, exitOnError) {
  if (exitOnError) {
    console.error(firstLine);
    console.error(USAGE);
    process.exit(2);
  }
  const err = new Error(`${firstLine}\n${USAGE}`);
  err.code = 'USAGE';
  throw err;
}

export function parseArgs(argv, { exitOnError = true } = {}) {
  const args = { apply: false, root: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--apply') args.apply = true;
    else if (argv[i] === '--root') {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) {
        usageError('--root requires a value', exitOnError);
      }
      args.root = value;
      i += 1;
    } else {
      usageError(`Unknown arg: ${argv[i]}`, exitOnError);
    }
  }
  return args;
}

// expandHome/workspaceRoot/isFile mirror viz/src/workspace.ts verbatim (bar
// workspaceRoot's arg shape — root string here, env object there). Left
// duplicated rather than shared: this script has no package.json and runs
// via plain `node`, so a shared module would either be plain JS imported
// across the tools/↔viz/src boundary (new coupling between two currently
// independent surfaces) or TS requiring a loader this script doesn't have —
// either breaks the zero-dep standalone property it's built on.
function expandHome(path) {
  if (path === '~') return homedir();
  if (path.startsWith('~/')) return join(homedir(), path.slice(2));
  return path;
}

function workspaceRoot(rootArg) {
  const raw = rootArg ?? process.env.FLAITRON_VIZ_WORKSPACE;
  return expandHome(raw && raw.length > 0 ? raw : '~/code');
}

export function parseSemverTag(tag) {
  const m = /^v(\d+)\.(\d+)\.(\d+)$/.exec(tag);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

export function compareSemver(a, b) {
  for (let i = 0; i < 3; i += 1) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

// See the expandHome comment above — same zero-dep tradeoff applies here.
async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function isDir(path) {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

// lstat, not stat: a dangling symlink still occupies the name a rename targets.
async function pathExists(path) {
  try {
    await lstat(path);
    return true;
  } catch {
    return false;
  }
}

// realpath resolves symlinks and (on case-insensitive volumes) canonicalizes
// case, so two paths that only differ by case-insensitive spelling compare
// equal here. Falls back to resolve() for a path that doesn't exist (e.g. a
// broken symlink entry from readdir) rather than throwing.
async function realOrResolve(path) {
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

// Resolve a committed gitlink SHA to a human-legible label: a release tag when
// the commit is tagged, else a short SHA.
export async function describePin(sha) {
  try {
    const tags = (await git(FLAITRON_REPO, 'tag', '--points-at', sha))
      .split('\n')
      .map((l) => l.trim())
      .filter((t) => parseSemverTag(t));
    if (tags.length > 0) return tags[0];
  } catch {
    // fall through to the short SHA
  }
  return sha.slice(0, 12);
}

// Sentinel the two SHA resolvers below return when git could not answer. It
// used to be a bare `null`, which read identically to "resolved, nothing to
// compare" — so a failed `rev-parse` reached gitlinkDrift as "no drift" and
// checkAdopter reported the adopter as ✓ current off a git failure (CORE-490.2).
// git's exit code can't separate "no committed gitlink yet" from "broken repo"
// (both exit 128), so the sentinel carries git's message and the caller decides;
// it is an object, distinguishable from the SHA string a success returns.
function unresolved(error) {
  return { unresolved: true, error };
}

function isUnresolved(value) {
  return value !== null && typeof value === 'object' && value.unresolved === true;
}

// First line of git's own complaint — the useful half of a rev-parse failure.
function gitErrorLine(e) {
  return ((e.stderr || e.message) ?? '').trim().split('\n')[0] || 'git failed';
}

// The superproject's committed submodule gitlink SHA at HEAD, or the unresolved
// sentinel when git can't answer (no committed gitlink yet, unreadable repo).
async function recordedGitlinkSha(repo) {
  try {
    return (await git(repo, 'rev-parse', `HEAD:${SUBMODULE_PATH}`)).trim();
  } catch (e) {
    return unresolved(gitErrorLine(e));
  }
}

// The canonical commit SHA a release tag resolves to in FLAITRON_REPO, or the
// unresolved sentinel when the tag can't be resolved locally. Commit SHAs are
// content-identical across clones, so FLAITRON_REPO is the canonical source —
// no adopter-side fetch needed.
async function canonicalTagSha(tag) {
  try {
    return (await git(FLAITRON_REPO, 'rev-parse', `${tag}^{commit}`)).trim();
  } catch (e) {
    return unresolved(gitErrorLine(e));
  }
}

// Compare the superproject's committed submodule gitlink against the latest
// release commit. Returns a reason string when they diverge (drift), the
// unresolved sentinel when either lookup failed (the comparison never
// happened — deliberately NOT null, which the caller reads as "no drift"),
// else null.
export async function gitlinkDrift(repo, latest) {
  const recorded = await recordedGitlinkSha(repo);
  if (isUnresolved(recorded)) {
    return unresolved(`could not resolve the committed gitlink: ${recorded.error}`);
  }
  const latestSha = await cachedCanonicalTagSha(latest);
  if (isUnresolved(latestSha)) {
    return unresolved(`could not resolve ${latest} in ${FLAITRON_REPO}: ${latestSha.error}`);
  }
  if (recorded === latestSha) return null;
  return `committed gitlink at ${await describePin(recorded)}, worktree SPEC.md at ${latest} — commit the pin (git add ${SUBMODULE_PATH}) or run /ft-update`;
}

// Shares its name with viz/src/workspace.ts's latestReleaseTag but not its
// signature: this one always resolves against the fixed FLAITRON_REPO
// constant (this script only ever bumps flaitron adopters), while viz's
// takes an explicit repoDir because it discovers adopter projects at
// arbitrary paths. Same-name-different-signature is deliberate, not a slip —
// see the workspaceRoot comment below for the precedent.
export async function latestReleaseTag() {
  const stdout = await git(FLAITRON_REPO, 'tag', '--sort=-v:refname');
  return stdout.split('\n').map((l) => l.trim()).find((l) => parseSemverTag(l)) ?? null;
}

// Tags strictly after `fromTag` up to and including `toTag`, ascending.
export async function tagsInRange(fromTag, toTag) {
  const from = parseSemverTag(fromTag);
  const to = parseSemverTag(toTag);
  const stdout = await git(FLAITRON_REPO, 'tag', '--sort=v:refname');
  return stdout
    .split('\n')
    .map((l) => l.trim())
    .filter((tag) => {
      const v = parseSemverTag(tag);
      if (!v) return false;
      return (from === null || compareSemver(v, from) > 0) && compareSemver(v, to) <= 0;
    });
}

// A tag is migration-bearing unless its Migration block opens with the
// release convention's all-clear sentinel ("No required project-side edits",
// checked case-insensitively). "Migration (BREAKING — ...)" headings are
// always migration-bearing. Lightweight tags (and annotated tags with an
// empty message) are migration-bearing too — fail closed so the fleet never
// auto-bumps across a release whose notes cannot be read. Note: for
// lightweight tags `%(contents)` returns the *commit* message, not an empty
// string, so emptiness alone is not enough; objecttype must be checked.
export async function migrationBearingTags(tags) {
  const bearing = [];
  for (const tag of tags) {
    // %(objecttype) is "tag" for annotated tags, "commit" for lightweight.
    const objecttype = (
      await git(FLAITRON_REPO, 'tag', '-l', '--format=%(objecttype)', tag)
    ).trim();
    const contents = await git(FLAITRON_REPO, 'tag', '-l', '--format=%(contents)', tag);
    // Lightweight / missing / empty-message tags have no release Migration
    // block to trust — treat as bearing rather than silently non-breaking.
    if (objecttype !== 'tag' || !contents.trim()) {
      bearing.push(tag);
      continue;
    }
    const lines = contents.split('\n');
    const headingIdx = lines.findIndex((l) => /^Migration\b/.test(l.trim()));
    if (headingIdx === -1) continue; // annotated but no Migration block → non-breaking
    if (/BREAKING/.test(lines[headingIdx])) {
      bearing.push(tag);
      continue;
    }
    const firstBody = lines
      .slice(headingIdx + 1)
      .map((l) => l.trim())
      .find((l) => l.length > 0);
    if (!firstBody || !firstBody.toLowerCase().startsWith('no required project-side edits')) {
      bearing.push(tag);
    }
  }
  return bearing;
}

// The per-platform symlink-wiring set: paths named in the freshly-bumped
// AGENTS-snippet ln -s block — the authority /ft-update Step 4 consults.
// Read at toTag to match what the adopter bumps to.
async function wiredSkillKeys(toTag, surface) {
  let snippet;
  try {
    snippet = await git(FLAITRON_REPO, 'show', `${toTag}:${surface.snippetPath}`);
  } catch {
    return null; // snippet unreadable at toTag — caller falls back to coarse check
  }
  const keys = new Set();
  for (const line of snippet.split('\n')) {
    if (!line.includes('ln -s')) continue;
    const m = line.match(surface.snippetKeyPattern);
    if (m) keys.add(m[1]); // e.g. claude/skills/ft-task or codex/skills/ft-task
  }
  return keys;
}

async function addedFilesForSurface(fromTag, toTag, surface) {
  const stdout = await git(
    FLAITRON_REPO,
    'diff',
    '--name-only',
    '--diff-filter=A',
    `${fromTag}..${toTag}`,
    '--',
    ...surface.diffPaths,
  );
  return stdout.split('\n').filter((l) => l.trim().length > 0);
}

async function newSkillWiringSurfaces(fromTag, toTag) {
  const affected = [];
  for (const surface of WIRING_SURFACES) {
    const added = await addedFilesForSurface(fromTag, toTag, surface);
    if (added.length === 0) continue;

    const wired = await wiredSkillKeys(toTag, surface);
    // Snippet unreadable → fall back to the coarse platform signal (better to
    // over-flag a no-op /ft-update than to silently miss a genuine new link).
    if (wired === null) {
      affected.push(surface.label);
      continue;
    }

    const needsWiring = added.some((path) => {
      const key = surface.addedKeyForFile(path);
      return key !== null && wired.has(key);
    });
    if (needsWiring) affected.push(surface.label);
  }
  return affected;
}

export function formatSkillsNote(surfaces) {
  if (surfaces.length === 0) return '';
  const surfaceText =
    surfaces.length === 1
      ? surfaces[0]
      : `${surfaces.slice(0, -1).join(', ')} and ${surfaces.at(-1)}`;
  return ` (new skills shipped in range — run /ft-update to wire ${surfaceText} symlinks)`;
}

export async function discoverAdopters(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const flaitronReal = await realOrResolve(FLAITRON_REPO);
  const adopters = [];
  const legacy = [];
  for (const entry of entries) {
    if (!(entry.isDirectory() || entry.isSymbolicLink())) continue;
    if (entry.name.startsWith('.')) continue;
    const repo = join(root, entry.name);
    if ((await realOrResolve(repo)) === flaitronReal) continue; // flaitron itself: /ft-release territory
    // Pre-rename first: a repo carrying both layouts must reach checkAdopter's
    // `.flaitron/ already exists` gate rather than be bumped with .flowtron/ left behind.
    if (await isFile(join(repo, PRE_RENAME_SUBMODULE_PATH, 'SPEC.md'))) {
      adopters.push({ name: entry.name, repo, preRename: true });
    } else if (await isFile(join(repo, SUBMODULE_PATH, 'SPEC.md'))) {
      adopters.push({ name: entry.name, repo });
    } else if (await isDir(join(repo, PRE_RENAME_DIR, 'flowtron'))) {
      legacy.push(entry.name);
    }
  }
  adopters.sort((a, b) => a.name.localeCompare(b.name));
  return { adopters, legacy };
}

// Per-process caches keyed by the `(fromTag, toTag)` pair checkAdopter calls
// them with. `latest` is fixed for a whole sweep and adopters commonly share
// the same `current` pin, so a large sweep would otherwise repeat identical
// FLAITRON_REPO git spawns per adopter (CORE-490). Safe without invalidation:
// a sweep is one short-lived process and FLAITRON_REPO's tags don't change
// mid-run. Cache and return the in-flight promise itself (not an async
// wrapper around it) so concurrent callers on the same key — and tests
// asserting memoization via promise identity — share the exact same
// underlying computation rather than each awaiting a fresh wrapper promise.
const bearingTagsCache = new Map();
export function cachedMigrationBearingTags(fromTag, toTag) {
  const key = `${fromTag}::${toTag}`;
  if (!bearingTagsCache.has(key)) {
    bearingTagsCache.set(
      key,
      tagsInRange(fromTag, toTag).then((range) => migrationBearingTags(range)),
    );
  }
  return bearingTagsCache.get(key);
}

const skillWiringCache = new Map();
export function cachedNewSkillWiringSurfaces(fromTag, toTag) {
  const key = `${fromTag}::${toTag}`;
  if (!skillWiringCache.has(key)) {
    skillWiringCache.set(key, newSkillWiringSurfaces(fromTag, toTag));
  }
  return skillWiringCache.get(key);
}

// Single-tag counterpart to the (fromTag, toTag) caches above: `canonicalTagSha`
// is called once per adopter for the sweep-constant `latest` (via gitlinkDrift
// and the reverse-drift guard) and again for a commonly-shared `current` (the
// missing-pinned-tag guard) — a large sweep otherwise repeats identical
// FLAITRON_REPO git spawns per adopter for tags that never change mid-run
// (CORE-493). Same safety argument as above: one short-lived process per sweep.
const canonicalShaCache = new Map();
export function cachedCanonicalTagSha(tag) {
  if (!canonicalShaCache.has(tag)) {
    canonicalShaCache.set(tag, canonicalTagSha(tag));
  }
  return canonicalShaCache.get(tag);
}

// Nine sequential skip/drift gates below (unreadable version, unresolved
// gitlink, reverse gitlink-drift, detached HEAD, pinned-ahead, missing-tag,
// migration-bearing, staged changes, dirty submodule). Considered extracting
// them to an ordered array (CORE-479) but each later gate consumes state a
// prior gate computed (current, recordedGitlink, currentVersion/latestVersion,
// range/bearing) — an array of independent gate functions would need a
// threaded context object, a larger refactor than this naming cleanup's
// scope. Left inline. A pre-rename adopter (`adopter.preRename`) rides the same
// gates on its .flowtron/core path — see the header's "Rename migration" note
// for the two gates it adds, the drift guards it skips, and the scoped lift.
// `renameTag` is a test seam: no real RENAME_TAG exists until it ships.
export async function checkAdopter(adopter, latest, { renameTag = RENAME_TAG } = {}) {
  const { repo, preRename = false } = adopter;
  const subPath = preRename ? PRE_RENAME_SUBMODULE_PATH : SUBMODULE_PATH;
  const sub = join(repo, subPath);
  const current = await pinnedVersion(join(sub, 'SPEC.md'));
  if (current === null) return { status: 'skip', reason: 'unreadable pinned SPEC.md version' };
  if (preRename) {
    const latestVersion = parseSemverTag(latest);
    if (!latestVersion || compareSemver(latestVersion, parseSemverTag(renameTag)) < 0) {
      return {
        status: 'skip',
        current,
        reason: `still on ${PRE_RENAME_DIR}/ — the move to ${FLAITRON_DIR}/ needs ${renameTag} or later (latest is ${latest})`,
      };
    }
    if (await pathExists(join(repo, FLAITRON_DIR))) {
      return {
        status: 'skip',
        current,
        reason: `${FLAITRON_DIR}/ already exists alongside ${PRE_RENAME_DIR}/ — reconcile by hand before migrating`,
      };
    }
  } else if (current === latest) {
    const drift = await gitlinkDrift(repo, latest);
    // Unresolved is not "no drift": this branch returns without touching git
    // again, so reporting `current` here would render a git failure as a clean
    // bill of health. Skip and hand the operator git's own message instead.
    if (isUnresolved(drift)) {
      return { status: 'skip', current, reason: `${drift.error} — pin left unverified` };
    }
    if (drift) return { status: 'drift', current, reason: drift };
    return { status: 'current', current };
  }

  // Reverse gitlink-drift guard: the committed pin can already be at `latest`
  // even though the checked-out worktree (what `current` above just read) is
  // behind — e.g. the superproject was checked out without a matching
  // `git submodule update`. Left unclassified, this falls through to `bump`
  // below and `applyBump` stages a gitlink identical to HEAD, then fails to
  // commit it ("nothing to commit"), and the resulting rollback resets the
  // worktree back to the stale SHA it was already recovering from. Detect it
  // up front and report it the same way the forward direction is reported.
  // An unresolved lookup falls through rather than skipping here: unlike the
  // early return above, this path continues into the detached-HEAD and
  // staged-diff gates, which rethrow any non-exit-1 git failure (CORE-366) —
  // a broken repo still fails loudly, it just fails there.
  if (!preRename) {
    const recordedGitlink = await recordedGitlinkSha(repo);
    if (!isUnresolved(recordedGitlink)) {
      const latestSha = await cachedCanonicalTagSha(latest);
      if (!isUnresolved(latestSha) && recordedGitlink === latestSha) {
        return {
          status: 'drift',
          current,
          reason: `committed gitlink already at ${latest}, worktree SPEC.md at ${current} — run git submodule update in ${SUBMODULE_PATH} (or /ft-update) to sync the worktree; nothing to commit`,
        };
      }
    }
  }

  // Detached-HEAD guard: applyBump commits the gitlink bump onto `repo`'s
  // current HEAD. A tag checkout, mid-bisect, or mid-rebase adopter has no
  // branch to carry that commit — it would be reachable only from a detached
  // ref, orphaned the moment the operator returns to a branch.
  try {
    await git(repo, 'symbolic-ref', '--quiet', 'HEAD');
  } catch (e) {
    if (e.code !== 1) throw e;
    return { status: 'skip', current, reason: 'detached HEAD — check out a branch before bumping' };
  }

  // Pinned-ahead guard: `tagsInRange` is empty when the pin is newer than
  // `latest`, so the migration gate below would pass vacuously and `--apply`
  // would check out the OLDER tag — a silent downgrade. Almost always a stale
  // tag list in this checkout rather than a genuinely ahead adopter.
  const currentVersion = parseSemverTag(current);
  const latestVersion = parseSemverTag(latest);
  if (currentVersion && latestVersion && compareSemver(currentVersion, latestVersion) > 0) {
    return {
      status: 'skip',
      current,
      reason: `pinned ahead of latest release ${latest} — bumping would downgrade; run git fetch --tags in ${FLAITRON_REPO} and re-run`,
    };
  }

  // Missing-pinned-tag guard: `current` is just the string `pinnedVersion`
  // parsed out of SPEC.md's Version line — nothing above confirms a tag by
  // that name still exists in FLAITRON_REPO. If it was deleted or renamed
  // upstream (or the pin was hand-edited to a value that never existed),
  // `tagsInRange` below would compute a numeric range against a boundary
  // that was never actually released — silently wrong rather than a clear
  // signal. Verify it resolves before doing any range work.
  if (isUnresolved(await cachedCanonicalTagSha(current))) {
    return {
      status: 'skip',
      current,
      reason: `pinned tag ${current} not found in ${FLAITRON_REPO} — run git fetch --tags in ${FLAITRON_REPO} and re-run`,
    };
  }

  const bearing = await cachedMigrationBearingTags(current, latest);
  // Scoped lift: the rename release's Migration block is the move applyMigrate
  // performs, so a pre-rename adopter clears that one tag — and only that one.
  const blocking = preRename ? bearing.filter((tag) => tag !== renameTag) : bearing;
  if (blocking.length > 0) {
    return {
      status: 'skip',
      current,
      reason: `migration-bearing release(s) in range: ${blocking.join(', ')} — run /ft-update manually`,
    };
  }

  try {
    await git(repo, 'diff', '--cached', '--quiet');
  } catch (e) {
    // Exit 1 means real staged changes; any other code is a genuine git
    // failure (bad repo, corrupted index) that shouldn't be mislabeled.
    if (e.code !== 1) throw e;
    return { status: 'skip', current, reason: 'staged changes in index — commit or unstage first' };
  }

  const subStatus = await git(sub, 'status', '--porcelain');
  if (subStatus.trim().length > 0) {
    return { status: 'skip', current, reason: `dirty ${subPath} worktree` };
  }

  const skillsNote = formatSkillsNote(await cachedNewSkillWiringSurfaces(current, latest));
  return { status: preRename ? 'migrate' : 'bump', current, skillsNote };
}

// Belt-and-suspenders for applyBump: SPEC.md's Version line can't distinguish
// a tag from a wrong commit that happens to carry a matching version string.
// Cross-check the checked-out SHA against the canonical tag SHA in
// FLAITRON_REPO — same source gitlinkDrift already trusts.
export function verifyPinnedSha(checkedOutSha, canonicalSha, latest) {
  if (checkedOutSha !== canonicalSha) {
    throw new Error(
      `checked-out submodule SHA ${checkedOutSha.slice(0, 12)} does not match canonical ${latest} SHA ${canonicalSha.slice(0, 12)}`,
    );
  }
}

// Undo applyBump's mutations: put the submodule worktree back on `priorSha` and,
// when the gitlink was already staged, drop it from the index (checkAdopter
// verified the index was otherwise clean, so a pathspec reset restores it exactly).
// Best-effort by construction — the caller is already unwinding a failure, so this
// reports what it could not undo rather than throwing over the original error.
// Returns null when the repo is fully restored, else a note naming the residue.
async function rollbackBump(repo, sub, priorSha, staged) {
  const residue = [];
  try {
    await git(sub, 'checkout', '--quiet', priorSha);
  } catch (e) {
    residue.push(`submodule left at the new tag (${e.message})`);
  }
  if (staged) {
    try {
      await git(repo, 'reset', '--quiet', '--', SUBMODULE_PATH);
    } catch (e) {
      residue.push(`gitlink left staged (${e.message})`);
    }
  }
  return residue.length > 0 ? residue.join('; ') : null;
}

// Check out `latest` in `sub` and prove it is the canonical release: SPEC.md's
// Version line must read it, and the checked-out SHA must match FLAITRON_REPO's
// tag. Shared by applyBump and applyMigrate; both call it inside their rollback
// window.
async function checkoutVerified(sub, latest) {
  await git(sub, 'checkout', '--quiet', latest);
  const confirmed = await pinnedVersion(join(sub, 'SPEC.md'));
  if (confirmed !== latest) {
    throw new Error(`post-checkout SPEC.md reads ${confirmed}, expected ${latest}`);
  }
  const checkedOutSha = (await git(sub, 'rev-parse', 'HEAD')).trim();
  // Reuses canonicalTagSha's sentinel contract (CORE-490.2) instead of a second
  // hand-inlined `git rev-parse` — and the cache (CORE-493) means this is
  // usually already warm from checkAdopter's own resolution of `latest`.
  const canonicalSha = await cachedCanonicalTagSha(latest);
  if (isUnresolved(canonicalSha)) {
    throw new Error(`could not resolve canonical SHA for ${latest} in ${FLAITRON_REPO}: ${canonicalSha.error}`);
  }
  verifyPinnedSha(checkedOutSha, canonicalSha, latest);
}

export async function applyBump(adopter, latest) {
  const { repo } = adopter;
  const sub = join(repo, SUBMODULE_PATH);
  // Fetch adds refs only — no worktree or index mutation, so it sits outside the
  // rollback window and the prior SHA is captured immediately before the checkout.
  // Timed: the only git call in this script that talks to a remote, so it's the
  // only one that can hang on a stalled peer rather than fail fast.
  await git(sub, 'fetch', '--tags', '--quiet', 'origin', { timeout: fetchTimeoutMs() });
  const priorSha = (await git(sub, 'rev-parse', 'HEAD')).trim();
  let staged = false;
  try {
    await checkoutVerified(sub, latest);
    await git(repo, 'add', SUBMODULE_PATH);
    staged = true;
    // Pathspec commit: only the submodule gitlink lands, never unrelated work.
    // --no-verify: see the "Mid-bump rollback" note above for why pre-commit/
    // commit-msg hooks are skipped here (prepare-commit-msg/post-commit still run).
    const current = adopter.current;
    await git(
      repo,
      'commit',
      '--quiet',
      '--no-verify',
      '-m',
      `chore: bump flaitron ${current} → ${latest}`,
      '--',
      SUBMODULE_PATH,
    );
  } catch (e) {
    const residue = await rollbackBump(repo, sub, priorSha, staged);
    // Rethrow the original failure — reportResult renders it as the ✗ line — with
    // the un-undone residue appended when the repo could not be fully restored.
    if (residue) e.message = `${e.message} (rollback incomplete: ${residue})`;
    throw e;
  }
}

// Every `.flowtron` path segment in `text` (a symlink target, a .gitignore)
// becomes `.flaitron`, or null when none occurs and the caller leaves it alone.
// A segment is `.flowtron` not glued to a neighbouring name character, so
// `../flowtron` and `.flowtron-old` stay put. Global: a link reaching into the
// submodule's own self-host dir renames there too.
export function renamedDirSegments(text) {
  const next = text.replace(/(?<![\w.-])\.flowtron(?![\w.-])/g, FLAITRON_DIR);
  return next === text ? null : next;
}

// …/flowtron(.git) → …/flaitron(.git), https or scp-style; a url not ending in
// the old repo name (a fork, a mirror) comes back unchanged.
export function renamedRemoteUrl(url) {
  return url.replace(/(^|[/:])flowtron(\.git)?$/, `$1flaitron$2`);
}

// The submodule's name as .gitmodules records it for `path` — read, never
// assumed equal to the path (the legacy .flowtron/flowtron move kept old names).
async function submoduleName(repo, path) {
  const out = await git(repo, 'config', '--file', '.gitmodules', '--get-regexp', '^submodule\\..*\\.path$');
  for (const line of out.split('\n')) {
    const space = line.indexOf(' ');
    if (space !== -1 && line.slice(space + 1) === path) {
      return line.slice('submodule.'.length, space - '.path'.length);
    }
  }
  throw new Error(`no .gitmodules entry has path ${path}`);
}

async function trackedGitignores(repo) {
  const out = await git(repo, 'ls-files', '-z', '--', ':(glob)**/.gitignore');
  return out.split('\0').filter(Boolean);
}

async function trackedSymlinks(repo) {
  const out = await git(repo, 'ls-files', '--stage', '-z');
  return out
    .split('\0')
    .filter((entry) => entry.startsWith('120000 '))
    .map((entry) => entry.slice(entry.indexOf('\t') + 1));
}

// Run applyMigrate's undo stack newest-first, so every undo sees the layout its
// own step produced. Best-effort like rollbackBump: returns null when the repo
// is fully restored, else the residue each failed undo left behind.
async function unwind(undo) {
  const residue = [];
  for (const [leftBehind, revert] of undo.reverse()) {
    try {
      await revert();
    } catch (e) {
      residue.push(`${leftBehind} (${e.message})`);
    }
  }
  return residue.length > 0 ? residue.join('; ') : null;
}

// The v6 rename migration (see the header's "Rename migration" note): verified
// checkout of `latest` at the old path, then the layout move, then one commit.
// Each mutation pushes its undo as soon as it lands; any failure unwinds them.
export async function applyMigrate(adopter, latest) {
  const { repo } = adopter;
  const oldSub = join(repo, PRE_RENAME_SUBMODULE_PATH);
  const gitmodules = join(repo, '.gitmodules');
  // Same fetch-outside-the-window shape as applyBump.
  await git(oldSub, 'fetch', '--tags', '--quiet', 'origin', { timeout: fetchTimeoutMs() });

  // Everything an undo restores is captured before the first mutation. Paths are
  // physical (realpath), because the gitfile ⇄ core.worktree pair is written as
  // relative paths and a symlinked prefix (macOS /var → /private/var) would
  // otherwise miscount the `..` hops between them.
  const priorSha = (await git(oldSub, 'rev-parse', 'HEAD')).trim();
  const oldName = await submoduleName(repo, PRE_RENAME_SUBMODULE_PATH);
  const newName = SUBMODULE_PATH; // name == path, git's own default
  const oldModDir = (await git(oldSub, 'rev-parse', '--absolute-git-dir')).trim();
  const superGitDir = await realpath((await git(repo, 'rev-parse', '--absolute-git-dir')).trim());
  const newModDir = join(superGitDir, 'modules', newName);
  const newSub = join(await realpath(repo), SUBMODULE_PATH);
  const gitmodulesText = await readFile(gitmodules, 'utf8');
  const gitfileText = await readFile(join(oldSub, '.git'), 'utf8');
  const oldWorktree = (
    await git(repo, 'config', '--file', join(oldModDir, 'config'), 'core.worktree')
  ).trim();
  const oldUrl = (
    await git(repo, 'config', '--file', '.gitmodules', `submodule.${oldName}.url`)
  ).trim();
  const oldConfigUrl = (await git(repo, 'config', `submodule.${oldName}.url`)).trim();
  const oldOriginUrl = (await git(oldSub, 'remote', 'get-url', 'origin')).trim();

  const undo = [];
  try {
    undo.push(['submodule left at the new tag', () => git(oldSub, 'checkout', '--quiet', priorSha)]);
    await checkoutVerified(oldSub, latest);

    // 1. Move the tree. git mv carries untracked files along and rewrites the
    //    .gitmodules path + core.worktree; checkAdopter verified the index was
    //    clean, so a plain reset restores it exactly.
    await git(repo, 'mv', PRE_RENAME_DIR, FLAITRON_DIR);
    undo.push([
      `${FLAITRON_DIR}/ left in place of ${PRE_RENAME_DIR}/`,
      async () => {
        await rename(join(repo, FLAITRON_DIR), join(repo, PRE_RENAME_DIR));
        await writeFile(gitmodules, gitmodulesText);
        await git(repo, 'config', '--file', join(oldModDir, 'config'), 'core.worktree', oldWorktree);
        await git(repo, 'reset', '--quiet');
      },
    ]);

    // 2. git mv leaves the submodule's name — and so its .git/modules/<name>
    //    gitdir — behind. Move the gitdir under the new name and re-point the
    //    gitfile ⇄ core.worktree pair at each other.
    await mkdir(dirname(newModDir), { recursive: true });
    await rename(oldModDir, newModDir);
    undo.push([
      `submodule gitdir left at ${newModDir}`,
      async () => {
        await mkdir(dirname(oldModDir), { recursive: true });
        await rename(newModDir, oldModDir);
        await rmdir(dirname(newModDir)).catch(() => {});
        await writeFile(join(newSub, '.git'), gitfileText);
      },
    ]);
    // The old name's now-empty parent (.git/modules/.flowtron); rmdir refuses a
    // non-empty dir, so this (and its mirror in the undo) can never take
    // anything else with it.
    await rmdir(dirname(oldModDir)).catch(() => {});
    await writeFile(join(newSub, '.git'), `gitdir: ${relative(newSub, newModDir)}\n`);
    await git(
      repo,
      'config',
      '--file',
      join(newModDir, 'config'),
      'core.worktree',
      relative(newModDir, newSub),
    );

    // 3. Rename the submodule itself, point its url at the renamed repo, and let
    //    `submodule sync` carry that url into .git/config and the gitdir's origin.
    //    (.gitmodules edits are undone by step 1's text restore.)
    await git(repo, 'config', '--file', '.gitmodules', '--rename-section', `submodule.${oldName}`, `submodule.${newName}`);
    await git(repo, 'config', '--file', '.gitmodules', `submodule.${newName}.url`, renamedRemoteUrl(oldUrl));
    await git(repo, 'config', '--rename-section', `submodule.${oldName}`, `submodule.${newName}`);
    undo.push([
      '.git/config submodule section left renamed',
      () => git(repo, 'config', '--rename-section', `submodule.${newName}`, `submodule.${oldName}`),
    ]);
    await git(repo, 'submodule', 'sync', '--quiet', '--', SUBMODULE_PATH);
    undo.push([
      'submodule url left at the renamed repo',
      async () => {
        await git(repo, 'config', `submodule.${newName}.url`, oldConfigUrl);
        await git(newSub, 'remote', 'set-url', 'origin', oldOriginUrl);
      },
    ]);

    // 4. Re-point tracked symlinks whose target runs through the old dir. A
    //    tracked link missing (or retyped) in the worktree is the adopter's own
    //    unstaged change — left alone.
    const toStage = [];
    for (const path of await trackedSymlinks(repo)) {
      const link = join(repo, path);
      const target = await readlink(link).catch(() => null);
      const next = target === null ? null : renamedDirSegments(target);
      if (next === null) continue;
      await unlink(link);
      undo.push([
        `symlink ${path} left re-pointed`,
        async () => {
          await unlink(link).catch(() => {});
          await symlink(target, link);
        },
      ]);
      await symlink(next, link);
      toStage.push(path);
    }

    // 5. Ignore rules naming the old dir (`.flowtron/screenshots/`) stop
    //    matching what step 1 moved, so ignored files would resurface as
    //    untracked. Rewrite every tracked .gitignore; one carrying the adopter's
    //    own unstaged edits is rewritten in place but left unstaged, so the
    //    commit never sweeps those edits in.
    for (const path of await trackedGitignores(repo)) {
      const file = join(repo, path);
      const text = await readFile(file, 'utf8').catch(() => null);
      const next = text === null ? null : renamedDirSegments(text);
      if (next === null) continue;
      let clean = true;
      try {
        await git(repo, 'diff', '--quiet', '--', path);
      } catch (e) {
        if (e.code !== 1) throw e;
        clean = false;
      }
      undo.push([`${path} left rewritten`, () => writeFile(file, text)]);
      await writeFile(file, next);
      if (clean) toStage.push(path);
    }

    // 6. Stage what steps 2–5 left unstaged and commit the whole migration. No
    //    pathspec: the index was clean, so it holds only this migration's work.
    //    --no-verify: same reasoning as the bump commit (header note).
    await git(repo, 'add', '--', '.gitmodules', SUBMODULE_PATH, ...toStage);
    await git(
      repo,
      'commit',
      '--quiet',
      '--no-verify',
      '-m',
      `chore: migrate ${PRE_RENAME_DIR} → ${FLAITRON_DIR}, bump flaitron ${adopter.current} → ${latest}`,
    );
  } catch (e) {
    const residue = await unwind(undo);
    if (residue) e.message = `${e.message} (rollback incomplete: ${residue})`;
    throw e;
  }
}

// Print one adopter's check result and fold it into the running counts. The
// apply branch performs the bump (or migrate) inline, awaiting applyBump or
// applyMigrate; all other branches are pure presentation over the
// already-computed result. A migrate counts as a bump — it is one, plus the move.
async function reportResult(adopter, result, latest, apply, counts) {
  if (result.status === 'current') {
    counts.current += 1;
    console.log(`  ✓ ${adopter.name}: current (${result.current})`);
  } else if (result.status === 'drift') {
    counts.drifted += 1;
    console.log(`  ⚠ ${adopter.name} (${result.current}): gitlink drift — ${result.reason}`);
  } else if (result.status === 'skip') {
    counts.skipped += 1;
    const at = result.current ? ` (${result.current})` : '';
    console.log(`  ⏭ ${adopter.name}${at}: skipped — ${result.reason}`);
  } else if (apply) {
    const migrate = result.status === 'migrate';
    const move = migrate ? `migrated ${PRE_RENAME_DIR}/ → ${FLAITRON_DIR}/ and ` : '';
    try {
      await (migrate ? applyMigrate : applyBump)({ ...adopter, current: result.current }, latest);
      counts.bumped += 1;
      console.log(
        `  ⬆ ${adopter.name}: ${move}bumped ${result.current} → ${latest}, committed${result.skillsNote}`,
      );
    } catch (e) {
      counts.failed += 1;
      console.error(`  ✗ ${adopter.name}: ${migrate ? 'migrate' : 'bump'} failed — ${e.message}`);
    }
  } else {
    counts.planned += 1;
    const move = result.status === 'migrate' ? `migrate ${PRE_RENAME_DIR}/ → ${FLAITRON_DIR}/ and ` : '';
    console.log(`  ⬆ ${adopter.name}: would ${move}bump ${result.current} → ${latest}${result.skillsNote}`);
  }
}

// Print the closing summary line, plus the re-run hint on a dry-run with pending bumps.
function reportSummary(counts, apply) {
  const planned = apply ? `bumped ${counts.bumped}` : `would bump ${counts.planned}`;
  console.log(
    `\nSummary: ${counts.current} current · ${counts.drifted} drift · ${planned} · ${counts.skipped} skipped · ${counts.failed} failed`,
  );
  if (!apply && counts.planned > 0) {
    console.log('Re-run with --apply to perform the bumps. Commits are local only — review and push per repo.');
  }
}

async function main(argv = process.argv.slice(2)) {
  const args = parseArgs(argv);
  const root = workspaceRoot(args.root);
  // Test seam (TEST-003): the suite's CLI fixtures pin a fixed non-migration
  // tag pair so they don't track the moving head of the tag list. Every other
  // entry point takes `latest` as a parameter; this is the only place the
  // choice is made internally. When the env is set, require a semver tag
  // (CORE-432.4) — empty/garbage must not be misreported as "no release tags".
  const override = process.env.FLAITRON_UPDATE_LATEST;
  let latest;
  if (override !== undefined) {
    if (!parseSemverTag(override)) {
      console.error(
        `FLAITRON_UPDATE_LATEST is set but invalid (got ${JSON.stringify(override)}); expected a semver release tag like v1.2.3`,
      );
      process.exit(2);
    }
    latest = override;
  } else {
    latest = await latestReleaseTag();
  }
  if (!latest) {
    console.error(`No release tag found in ${FLAITRON_REPO} — nothing to compare against.`);
    process.exit(1);
  }

  const mode = args.apply ? 'APPLY' : 'DRY-RUN';
  console.log(`flaitron update-adopters — ${mode}`);
  console.log(`  workspace: ${root}`);
  console.log(`  latest release: ${latest}\n`);

  let adopters, legacy;
  try {
    ({ adopters, legacy } = await discoverAdopters(root));
  } catch (e) {
    console.error(`Workspace root is not a readable directory: ${root} (${e.message})`);
    process.exitCode = 1;
    return;
  }
  if (legacy.length > 0) {
    console.log(
      `  legacy-layout repos skipped (migrate .flowtron/flowtron → .flowtron/core first): ${legacy.join(', ')}\n`,
    );
  }

  if (adopters.length === 0) {
    console.log(`No ${SUBMODULE_PATH} or ${PRE_RENAME_SUBMODULE_PATH} adopters found.`);
    return;
  }

  const counts = { current: 0, drifted: 0, bumped: 0, planned: 0, skipped: 0, failed: 0 };
  for (const adopter of adopters) {
    let result;
    try {
      result = await checkAdopter(adopter, latest);
    } catch (e) {
      counts.failed += 1;
      console.error(`  ✗ ${adopter.name}: check failed — ${e.message}`);
      continue;
    }
    await reportResult(adopter, result, latest, args.apply, counts);
  }

  reportSummary(counts, args.apply);
  // A per-adopter failure never aborts the sweep, so the only place the run as a
  // whole can report it is the exit status. `exitCode` (not `exit()`) so the
  // summary above still flushes.
  if (counts.failed > 0) process.exitCode = 1;
}

// CLI entrypoint only when executed directly (importable for tests).
const isMain =
  process.argv[1] != null && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}

export { FLAITRON_REPO, PRE_RENAME_SUBMODULE_PATH, RENAME_TAG, SUBMODULE_PATH, realOrResolve };
