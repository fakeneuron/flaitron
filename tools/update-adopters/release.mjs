// update-adopters release reads: the git runner, FLAITRON_REPO's tags and release notes, and the per-sweep caches over them (CORE-EPIC-931).
//
// Retired migrations (CORE-827): the v6.0.0 `.flowtron/` → `.flaitron/` move
// (CORE-711.3) and the v7.0.0 skill-link swap (CORE-769.7) once ran in the updater as
// automatic `migrate` work. Every adopter crossed both, so they were removed;
// a pin still behind either tag now skips at the migration-bearing gate like
// any other breaking range, and a `.flowtron/` repo is not discovered at all.

import { execFile } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

// Two levels up: this module sits in tools/update-adopters/, the repo root
// two directories above it.
export const FLAITRON_REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

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
    const pending = execFileAsync('git', args, {
      cwd,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
      ...options,
    });
    // Closed stdin: an adopter hook that reads it (the bump commit runs hooks)
    // gets EOF instead of hanging the sweep on a pipe nobody writes to.
    pending.child.stdin?.end();
    const { stdout } = await pending;
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

// Sentinel the two SHA resolvers (canonicalTagSha below, recordedGitlinkSha in
// check.mjs) return when git could not answer. It
// used to be a bare `null`, which read identically to "resolved, nothing to
// compare" — so a failed `rev-parse` reached gitlinkDrift as "no drift" and
// checkAdopter reported the adopter as ✓ current off a git failure (CORE-490.2).
// git's exit code can't separate "no committed gitlink yet" from "broken repo"
// (both exit 128), so the sentinel carries git's message and the caller decides;
// it is an object, distinguishable from the SHA string a success returns.
export function unresolved(error) {
  return { unresolved: true, error };
}

export function isUnresolved(value) {
  return value !== null && typeof value === 'object' && value.unresolved === true;
}

// First line of git's own complaint — the useful half of a rev-parse failure.
export function gitErrorLine(e) {
  return ((e.stderr || e.message) ?? '').trim().split('\n')[0] || 'git failed';
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

// Shares its name with viz/src/workspace.ts's latestReleaseTag but not its
// signature: this one always resolves against the fixed FLAITRON_REPO
// constant (this script only ever bumps flaitron adopters), while viz's
// takes an explicit repoDir because it discovers adopter projects at
// arbitrary paths. Same-name-different-signature is deliberate, not a slip —
// see workspaceRoot's mirror comment for the precedent.
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
    if ((await migrationAsk(tag)) !== null) bearing.push(tag);
  }
  return bearing;
}

// True when `tag` names a tag in FLAITRON_REPO — not just any ref: rev-parse
// alone would accept a branch spelled like a release, which tagsInRange never
// lists, so its own Migration block would go unclassified.
export async function isReleaseTag(tag) {
  try {
    await git(FLAITRON_REPO, 'rev-parse', '--quiet', '--verify', `refs/tags/${tag}^{commit}`);
    return true;
  } catch {
    return false;
  }
}

// One tag's verdict for migrationBearingTags above: null when it asks for no
// project-side edits, 'unreadable' when its notes can't be classified at all,
// 'asks' when its Migration block asks. The split is what --accept-migration
// validation needs — only an 'asks' tag has a block an operator could review.
export async function migrationAsk(tag) {
  // %(objecttype) is "tag" for annotated tags, "commit" for lightweight.
  const objecttype = (
    await git(FLAITRON_REPO, 'tag', '-l', '--format=%(objecttype)', tag)
  ).trim();
  const contents = await git(FLAITRON_REPO, 'tag', '-l', '--format=%(contents)', tag);
  // Lightweight / missing / empty-message tags have no release Migration
  // block to trust — treat as bearing rather than silently non-breaking.
  if (objecttype !== 'tag' || !contents.trim()) return 'unreadable';
  const lines = contents.split('\n');
  const headingIdx = lines.findIndex((l) => /^Migration\b/.test(l.trim()));
  if (headingIdx === -1) return null; // annotated but no Migration block → non-breaking
  if (/BREAKING/.test(lines[headingIdx])) return 'asks';
  const firstBody = lines
    .slice(headingIdx + 1)
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  if (!firstBody || !firstBody.toLowerCase().startsWith('no required project-side edits')) {
    return 'asks';
  }
  return null;
}

// Why `tag` cannot be waived by --accept-migration against `target`, or null
// when it can. A waiver must name a reviewed block, so a tag that is unknown,
// past the target, or carries no asking Migration block is refused — the
// waiver would otherwise claim a review of nothing. Both tags are semver
// (parseArgs guarantees it).
export async function acceptMigrationError(tag, target) {
  if (!(await isReleaseTag(tag))) return 'unknown tag';
  if (compareSemver(parseSemverTag(tag), parseSemverTag(target)) > 0) return `after target ${target}`;
  const ask = await migrationAsk(tag);
  if (ask === null) return 'no Migration block to waive';
  if (ask === 'unreadable') return 'release notes unreadable';
  return null;
}

// Per-process memo: `compute(...args)`'s result cached under `keyOf(...args)`.
// `latest` is fixed for a whole sweep and adopters commonly share the same
// `current` pin, so a large sweep would otherwise repeat identical
// FLAITRON_REPO git spawns per adopter (CORE-490, CORE-493). Safe without
// invalidation: a sweep is one short-lived process and FLAITRON_REPO's tags
// don't change mid-run. Caches and returns the in-flight promise itself (not
// an async wrapper around it) so concurrent callers on the same key — and
// tests asserting memoization via promise identity — share the exact same
// underlying computation rather than each awaiting a fresh wrapper promise.
export function memoByKey(keyOf, compute) {
  const cache = new Map();
  return (...args) => {
    const key = keyOf(...args);
    if (!cache.has(key)) cache.set(key, compute(...args));
    return cache.get(key);
  };
}

// Keyed by the `(fromTag, toTag)` pair checkAdopter calls it with.
export const cachedMigrationBearingTags = memoByKey(
  (fromTag, toTag) => `${fromTag}::${toTag}`,
  (fromTag, toTag) => tagsInRange(fromTag, toTag).then((range) => migrationBearingTags(range)),
);

// Single-tag counterpart: `canonicalTagSha` is called once per adopter for the
// sweep-constant `latest` (via gitlinkDrift and the reverse-drift guard) and
// again for a commonly-shared `current` (the missing-pinned-tag guard).
export const cachedCanonicalTagSha = memoByKey(
  (tag) => tag,
  (tag) => canonicalTagSha(tag),
);

// One file of FLAITRON_REPO at `tag`, read once per sweep; null when git can't
// show it. Reading here rather than in the adopter's checkout keeps a sparse
// submodule from hiding a snippet.
export const cachedFlaitronFile = memoByKey(
  (tag, path) => `${tag}:${path}`,
  (tag, path) => git(FLAITRON_REPO, 'show', `${tag}:${path}`).catch(() => null),
);

// The file paths under `dir` in FLAITRON_REPO at `tag`, as a Set — empty when
// the tag can't be resolved, so a caller asking "did this ship at <tag>?" of
// an unknown tag hears "no".
export const cachedFlaitronTree = memoByKey(
  (tag, dir) => `${tag}:${dir}`,
  (tag, dir) =>
    git(FLAITRON_REPO, 'ls-tree', '-r', '--name-only', tag, '--', dir).then(
      (out) => new Set(out.split('\n').filter(Boolean)),
      () => new Set(),
    ),
);
