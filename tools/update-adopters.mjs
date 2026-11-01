#!/usr/bin/env node
// update-adopters — batch-bump flaitron adopter pins to the latest release.
//
// The singular script exception to SPEC.md §"What flaitron does NOT provide"
// (see the carve-out there): operator-side fleet maintenance across ~/code,
// not workflow machinery inside a project. It batches the /ft-update recipe:
// for every adopter pinned behind the latest released tag, move the
// .flaitron/core submodule pin, carry the follow-through (below) and commit —
// locally only, never pushing.
//
// Usage:
//   node tools/update-adopters.mjs            # dry-run: report what would happen
//   node tools/update-adopters.mjs --apply    # perform the bumps + commits
//   node tools/update-adopters.mjs --root <dir>   # workspace override
//                                             # (default $FLAITRON_VIZ_WORKSPACE or ~/code)
//   node tools/update-adopters.mjs --attended-ledger <relpath>   # repeatable;
//                                             # skip any adopter tracking <relpath>
//   node tools/update-adopters.mjs --target <tag>     # bump to <tag>, not the newest
//   node tools/update-adopters.mjs --only <repo>      # repeatable; limit the sweep to
//                                             # these top-level workspace dirs
//   node tools/update-adopters.mjs --branch <name>    # skip adopters not on <name>
//   node tools/update-adopters.mjs --accept-migration <tag>   # repeatable; waive
//                                             # that one tag's Migration block
//   node tools/update-adopters.mjs --trailer <line>   # append <line> as its own
//                                             # paragraph in every bump commit
//
// Selection: --only names adopters by their directory under the workspace root.
// Every other adopter is neither listed nor counted; a name that matches no
// adopter prints a skip row (once, however often it is repeated), never a
// silent drop. --target, --branch and --only carry the caller's fleet policy;
// like --attended-ledger, the script knows none of its own.
//
// --accept-migration records that the operator reviewed one tag's Migration
// block. Each tag is validated before any adopter is read — it must resolve,
// sit at or before the target, and carry a readable Migration block that asks
// for edits — else the run exits 2. It waives the migration-bearing gate for
// that tag only: other tags in range are still checked, and it never waives an
// attended ledger. The Migration's own unscripted steps still need follow-up.
//
// Submodule path: read from .gitmodules — a submodule whose url's last segment
// is flaitron — else .flaitron/core; the first of those with a checked-out
// SPEC.md wins. A declared submodule with no checked-out SPEC.md (never
// initialised, or deinit'd) is reported as a skip row, not dropped from the
// sweep.
//
// Exit codes: 0 = every adopter checked (or bumped) cleanly — skips and drift
// are reported outcomes, not failures; 1 = at least one adopter failed its
// check or bump (the ✗ lines, which go to stderr), or a pre-flight guard
// aborted; 2 = usage error (bad CLI args, a --target or --accept-migration tag
// that fails validation, or FLAITRON_UPDATE_LATEST set to a non-semver value).
// A failure never aborts the sweep, so the exit status is what a wrapper script
// has to read.
//
// Per-adopter safety gates (any hit → skip that repo, report why):
//   - the declared flaitron submodule is not initialised → no pin to read
//   - .flaitron/core/SPEC.md's Version line is unreadable → the current pin
//     can't be established, so no range can be reasoned about
//   - adopter repo's HEAD is detached (tag checkout, mid-bisect, mid-rebase)
//     → a bump commit here would have no branch to land on and be orphaned
//   - --branch given and the adopter is on a different branch
//   - adopter pinned NEWER than the target release → bumping would
//     downgrade it (usually a stale tag list in this checkout)
//   - pinned tag can't be resolved locally (deleted/renamed upstream, or a
//     hand-edited SPEC.md Version line) → no real commit to reason a range
//     from; skip rather than compute a range against a nonexistent tag
//   - adopter tracks a path named by --attended-ledger (relative to the adopter
//     root) → that path records an attended review of a particular revision,
//     so its owner must bump and refresh it together in one task. The report
//     prints a suggested owner-task line; filing it stays the operator's act.
//     The caller supplies the paths; this script knows none of its own.
//   - release range carries a real Migration block (BREAKING or required
//     project-side edits) not waived by --accept-migration → manual
//     /ft-update required
//   - release range carries a tag whose notes can't be classified at all
//     (lightweight tag, or annotated with an empty message) → fail closed
//     rather than assume non-breaking; see migrationBearingTags
//   - staged changes in the adopter's index → a commit here would surprise
//   - modified tracked files (the submodule's own entry aside) → the
//     follow-through below rewrites adopter files, and an uncommitted edit
//     there would be overwritten, committed, or lost to a rollback
//   - dirty .flaitron/core submodule worktree
//   - the adopter's Codex wiring conflicts with the target roster under
//     codex/reconcile-skills.md (see "Skill wiring" below) → /ft-update
//   - a full-copy audit fork lacks a pass file shipped after its marker (see
//     "Audit forks" below) → /ft-update copies it on a per-file confirm
//   - the committed gitlink (or the latest tag's commit) can't be resolved at
//     all → the pin can't be verified either way, so report the git error
//     rather than the ✓ current this used to fall through to
//
// Retired migrations (CORE-827): the v6.0.0 `.flowtron/` → `.flaitron/` move
// (CORE-711.3) and the v7.0.0 skill-link swap (CORE-769.7) once ran here as
// automatic `migrate` work. Every adopter crossed both, so they were removed;
// a pin still behind either tag now skips at the migration-bearing gate like
// any other breaking range, and a `.flowtron/` repo is not discovered at all.
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
// bump-path work runs.
//
// Follow-through (CORE-852.4, ported from natabula wave-bump): after the
// checkout, applyBump also rewrites, and stages, two adopter files when they
// apply — every `Pinned to: vX.Y.Z` in .flaitron/tasknote/README.md (first per
// line) moves to the target, and AGENTS.md's `## Workflow` section is replaced
// wholesale with the target's claude/AGENTS-snippet.md paste block, read from
// FLAITRON_REPO at the target tag. Either file is left alone, with a note, when
// it or a parent directory is a symlink (a write would land outside the repo
// while `git add` staged only the link); the Workflow replace is also skipped
// when AGENTS.md carries more than one exact `## Workflow` heading or the
// snippet or its paste block is missing. The ⬆ line lists what changed and
// what was skipped.
//
// Skill wiring (CORE-852.5, the /ft-update Step 4 rules): on each wiring
// surface the adopter already has as a real directory (.claude/,
// .agents/skills, .cursor/skills, .grok/skills — none is ever bootstrapped),
// applyBump first removes each tracked dangling link on that surface whose
// target points into the submodule (a skill retired or renamed upstream — the
// new name is a missing link, so a rename needs no special case), then creates
// every link the target's AGENTS-snippet roster lists that is still missing,
// with the snippet's relative target and the submodule path substituted — one
// whose body the target does not ship is noted, never created dangling. An
// untracked dangling link is the operator's own and is kept; one pointing
// anywhere else (or whose target can't be checked) is kept too; both are
// noted. Rosters are read from
// FLAITRON_REPO at the target. Codex follows codex/reconcile-skills.md rather
// than a plain `ln -s` parse: roster = `.agents/skills/ft-<slug>` lines, link
// target built as `../../<FT>/codex/skills/<slug>`, and a redirected root, a
// roster body missing at the target, or any other entry at a roster path is a
// conflict that skips the adopter (above). The other surfaces never replace an
// existing destination (a custom one is noted) and skip, with a note, a root
// reached through a symlink. A destination git ignores is noted, not created
// or force-added. Each created or removed link is staged and committed.
//
// Audit forks: a real skill directory under .claude/skills or .agents/skills
// whose SKILL.md carries `flaitron-reconciled: vX.Y.Z` and `flaitron-tracks:
// <slug>` (other values are not read as a marker). A fork whose tracked
// scaffold changed since its marker gets a drift note on its row; a full-copy
// ft-audit fork (passes/ beside SKILL.md) missing a pass file the bundle
// shipped after the marker skips the adopter, since the copy is /ft-update's
// per-file confirm. A file the bundle already had at the marker was deleted on
// purpose and never counts; a thin overlay (no passes/) inherits new files.
//
// Mid-bump rollback: applyBump mutates the adopter (submodule checkout, the
// follow-through writes and link changes, then each path staged) before it commits, and every
// step after the checkout can fail. Without recovery a failed bump leaves the
// repo half-updated — submodule at the new tag, files rewritten, paths possibly
// staged, nothing committed — and the residue is self-concealing: the worktree
// now reads the new version, so a re-run classifies the repo as current/drift
// rather than bump and the failure never resurfaces. So the prior submodule SHA
// and each rewritten file's bytes are captured before they change (each link
// change, with its prior target, as it happens), and on any later failure the
// links are put back, directories made for them removed, the files written
// back, the submodule checked out at the prior SHA, and every path this run
// staged unstaged (checkAdopter verified
// the index and tracked files were otherwise clean, so that restores them
// exactly). The original error still propagates to the ✗ report line; a
// rollback that itself fails is appended to it rather than swallowed.
//
// Commit contract: one pathspec commit naming only the paths this run wrote
// (the gitlink plus whichever follow-through files and links changed), with the
// adopter's hooks running — no --no-verify. CORE-490.3 skipped pre-commit/
// commit-msg when the commit was a pure gitlink move; once it carries README
// and AGENTS.md edits, an adopter hook that validates them (a pin check, a
// lint) is exactly what must run. A rejecting hook is a failed bump: the full
// rollback above runs, the ✗ line carries the hook's first output line (git
// sends hook stdout to stderr), and the run exits 1. --trailer appends its
// line as a separate paragraph of the message.
//
// Not covered (by design — run /ft-update in the repo for these): wiring a
// platform the adopter has no surface for yet; copying a newly shipped pass
// file into a full-copy fork (skipped above) or re-reconciling a drifted fork
// and moving its marker (noted above); resolving a Codex conflict; removing an
// untracked retired link (reconcile-skills.md's retirement pass unlinks an
// exact-owned one, this sweep keeps it); re-applying the docs/MIGRATION.md
// §1.1 sparse trim; and /ft-update Step 4.7's agent-home shadow check, which
// reads outside the adopter. The dry run previews none of the follow-through.

import { execFile } from 'node:child_process';
import { lstat, mkdir, readdir, readFile, readlink, realpath, rmdir, stat, symlink, unlink, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, isAbsolute, join, normalize, resolve, sep } from 'node:path';
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
// The per-project skill-wiring surfaces (CORE-852.5). `root` is what must
// already exist as a real directory for the surface to count as present — the
// updater never bootstraps a platform the repo lacks — and the tree the
// dangling-link prune walks; `skillsDir` is where the snippet's links land.
// Claude's root is the whole .claude/ (W's surface: retired .claude/commands
// links dangle there too), with its worktrees/ checkouts left out of the walk.
const WIRING_SURFACES = [
  { platform: 'claude', root: '.claude', skillsDir: '.claude/skills', snippetPath: 'claude/AGENTS-snippet.md' },
  { platform: 'codex', root: '.agents/skills', skillsDir: '.agents/skills', snippetPath: 'codex/AGENTS-snippet.md' },
  { platform: 'cursor', root: '.cursor/skills', skillsDir: '.cursor/skills', snippetPath: 'cursor/AGENTS-snippet.md' },
  { platform: 'grok', root: '.grok/skills', skillsDir: '.grok/skills', snippetPath: 'grok/AGENTS-snippet.md' },
];
const PRUNE_SKIP = new Set([join('.claude', 'worktrees')]);

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

const USAGE =
  'Usage: node tools/update-adopters.mjs [--apply] [--root <dir>] [--target <tag>] [--only <repo>]...\n' +
  '         [--branch <name>] [--accept-migration <tag>]... [--attended-ledger <relpath>]...\n' +
  '         [--trailer <line>]';

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
  const args = {
    apply: false,
    root: null,
    target: null,
    only: [],
    branch: null,
    acceptMigrations: [],
    attendedLedgers: [],
    trailer: null,
  };
  // Every value-taking flag rejects a missing or `--`-prefixed value (CORE-419.4).
  const takeValue = (i) => {
    const value = argv[i + 1];
    if (value === undefined || value.startsWith('--')) {
      usageError(`${argv[i]} requires a value`, exitOnError);
    }
    return value;
  };
  // Tags are compared numerically downstream, so a non-semver value is a usage
  // error here rather than a confusing failure after the sweep has started.
  const takeTag = (i) => {
    const value = takeValue(i);
    if (!parseSemverTag(value)) {
      usageError(`${argv[i]} takes a semver release tag like v1.2.3 (got ${JSON.stringify(value)})`, exitOnError);
    }
    return value;
  };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--apply') args.apply = true;
    else if (argv[i] === '--root') {
      args.root = takeValue(i);
      i += 1;
    } else if (argv[i] === '--target') {
      args.target = takeTag(i);
      i += 1;
    } else if (argv[i] === '--accept-migration') {
      args.acceptMigrations.push(takeTag(i));
      i += 1;
    } else if (argv[i] === '--only' || argv[i] === '--branch' || argv[i] === '--trailer') {
      const value = takeValue(i);
      if (value === '') usageError(`${argv[i]} requires a non-empty value`, exitOnError);
      if (argv[i] === '--only') args.only.push(value);
      else if (argv[i] === '--branch') args.branch = value;
      else args.trailer = value;
      i += 1;
    } else if (argv[i] === '--attended-ledger') {
      const value = takeValue(i);
      // Empty or root-escaping values would otherwise reach git and fail every
      // adopter's check (exit 1) instead of this usage error (exit 2).
      const normal = normalize(value);
      if (value === '' || isAbsolute(value) || normal === '.' || normal.startsWith('..')) {
        usageError(
          `--attended-ledger takes a file path inside each adopter root (got ${JSON.stringify(value)})`,
          exitOnError,
        );
      }
      args.attendedLedgers.push(value);
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
async function recordedGitlinkSha(repo, subPath) {
  try {
    return (await git(repo, 'rev-parse', `HEAD:${subPath}`)).trim();
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
export async function gitlinkDrift(repo, latest, subPath = SUBMODULE_PATH) {
  const recorded = await recordedGitlinkSha(repo, subPath);
  if (isUnresolved(recorded)) {
    return unresolved(`could not resolve the committed gitlink: ${recorded.error}`);
  }
  const latestSha = await cachedCanonicalTagSha(latest);
  if (isUnresolved(latestSha)) {
    return unresolved(`could not resolve ${latest} in ${FLAITRON_REPO}: ${latestSha.error}`);
  }
  if (recorded === latestSha) return null;
  return `committed gitlink at ${await describePin(recorded)}, worktree SPEC.md at ${latest} — commit the pin (git add ${subPath}) or run /ft-update`;
}

// Shares its name with viz/src/workspace.ts's latestReleaseTag but not its
// signature: this one always resolves against the fixed FLAITRON_REPO
// constant (this script only ever bumps flaitron adopters), while viz's
// takes an explicit repoDir because it discovers adopter projects at
// arbitrary paths. Same-name-different-signature is deliberate, not a slip —
// see the workspaceRoot comment above for the precedent.
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

// The links a non-Codex snippet wires: every `ln -s <src> <dst>` line inside a
// ```sh fence (wave-bump's parse), kept only when <dst> is one slug directly
// under `skillsDir` and <src> reaches into the default submodule path — the
// shape every shipped block has. `src` is returned with that path swapped for
// `subPath`, so a vendored submodule gets links that resolve.
export function snippetLinks(snippet, skillsDir, subPath = SUBMODULE_PATH) {
  const links = [];
  let fenced = false;
  const prefix = `../../${SUBMODULE_PATH}/`;
  for (const line of snippet.split('\n')) {
    if (/^```/.test(line)) {
      fenced = !fenced && /^```sh\b/.test(line);
      continue;
    }
    const m = fenced && /^ln -s +(\S+) +(\S+)\s*$/.exec(line);
    if (!m) continue;
    const [, src, dst] = m;
    if (!src.startsWith(prefix) || !new RegExp(`^${skillsDir.replace(/\./g, '\\.')}/[a-z0-9-]+$`).test(dst)) continue;
    links.push({ dst, target: `../../${subPath}/${src.slice(prefix.length)}` });
  }
  return links;
}

// The Codex roster, read the way codex/reconcile-skills.md reads it: every
// `ln -s` line whose last field is `.agents/skills/ft-<slug>`, the slug kept.
// The link target is built, not parsed (`../../<FT>/codex/skills/<slug>`).
export function codexRoster(snippet) {
  const slugs = [];
  for (const line of snippet.split('\n')) {
    if (!/^ln -s /.test(line)) continue;
    const m = /^\.agents\/skills\/(ft-[a-z-]+)$/.exec(line.trim().split(/\s+/).at(-1));
    if (m) slugs.push(m[1]);
  }
  return slugs;
}

// A url whose last path segment is the flaitron repo (`…/flaitron`,
// `…/Flaitron.git`, `git@host:org/flaitron`) — not any url merely containing
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

// The --attended-ledger paths this adopter tracks as files committed at HEAD —
// what the owner's CI sees; an untracked or merely staged copy asserts
// nothing there. One `ls-tree` call answers for every path. Literal pathspecs
// so a glob or `:` magic never widens the match, and only an exact blob path
// counts (a directory lists as a tree entry and is ignored). A git failure
// rethrows to the ✗ line rather than reading as "not tracked".
async function trackedLedgers(repo, ledgers) {
  if (ledgers.length === 0) return [];
  const wanted = new Map(ledgers.map((path) => [normalize(path), path]));
  const stdout = await git(
    repo,
    '--literal-pathspecs',
    'ls-tree',
    '-z',
    '--full-tree',
    'HEAD',
    '--',
    ...wanted.keys(),
  );
  const tracked = [];
  for (const entry of stdout.split('\0')) {
    const m = /^\d+ blob \S+\t(.+)$/s.exec(entry);
    if (m && wanted.has(m[1])) tracked.push(wanted.get(m[1]));
  }
  return tracked;
}

// Fifteen sequential skip/drift gates below (uninitialised submodule, unreadable
// version, unresolved gitlink, reverse gitlink-drift, detached HEAD, --branch,
// pinned-ahead, missing-tag, attended ledger, migration-bearing, staged
// changes, dirty tracked files, dirty submodule, Codex wiring conflict, audit
// fork pass-file gap).
// Considered extracting them to an ordered array (CORE-479) but each later
// gate consumes state a prior gate computed (current, recordedGitlink, currentVersion/latestVersion,
// range/bearing) — an array of independent gate functions would need a
// threaded context object, a larger refactor than this naming cleanup's
// scope. Left inline.
export async function checkAdopter(
  adopter,
  latest,
  { attendedLedgers = [], branch = null, acceptedMigrations = [] } = {},
) {
  const { repo } = adopter;
  const subPath = adopter.subPath ?? SUBMODULE_PATH;
  const sub = join(repo, subPath);
  if (adopter.uninitialised) {
    return { status: 'skip', reason: `submodule not initialised (${subPath})` };
  }
  const current = await pinnedVersion(join(sub, 'SPEC.md'));
  if (current === null) return { status: 'skip', reason: 'unreadable pinned SPEC.md version' };
  if (current === latest) {
    const drift = await gitlinkDrift(repo, latest, subPath);
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
  const recordedGitlink = await recordedGitlinkSha(repo, subPath);
  if (!isUnresolved(recordedGitlink)) {
    const latestSha = await cachedCanonicalTagSha(latest);
    if (!isUnresolved(latestSha) && recordedGitlink === latestSha) {
      return {
        status: 'drift',
        current,
        reason: `committed gitlink already at ${latest}, worktree SPEC.md at ${current} — run git submodule update in ${subPath} (or /ft-update) to sync the worktree; nothing to commit`,
      };
    }
  }

  // Detached-HEAD guard: applyBump commits the gitlink bump onto `repo`'s
  // current HEAD. A tag checkout, mid-bisect, or mid-rebase adopter has no
  // branch to carry that commit — it would be reachable only from a detached
  // ref, orphaned the moment the operator returns to a branch.
  let headRef;
  try {
    headRef = (await git(repo, 'symbolic-ref', '--quiet', 'HEAD')).trim();
  } catch (e) {
    if (e.code !== 1) throw e;
    return { status: 'skip', current, reason: 'detached HEAD — check out a branch before bumping' };
  }

  // --branch gate: the caller's policy names the one branch a bump may land on
  // (natabula's fleet: main). Absent flag → any branch. Compared as a full ref:
  // `--short` turns `main` into `heads/main` when a same-named tag exists.
  if (branch !== null && headRef !== `refs/heads/${branch}`) {
    return {
      status: 'skip',
      current,
      reason: `on branch ${headRef.replace(/^refs\/heads\//, '')}, not ${branch}`,
    };
  }

  // Pinned-ahead guard: `tagsInRange` is empty when the pin is newer than
  // `latest`, so the migration gate below would pass vacuously and `--apply`
  // would check out the OLDER tag — a silent downgrade. Almost always a stale
  // tag list in this checkout (or a --target below the fleet) rather than a
  // genuinely ahead adopter.
  const currentVersion = parseSemverTag(current);
  const latestVersion = parseSemverTag(latest);
  if (currentVersion && latestVersion && compareSemver(currentVersion, latestVersion) > 0) {
    return {
      status: 'skip',
      current,
      reason: `pinned ahead of target release ${latest} — bumping would downgrade; check --target, or run git fetch --tags in ${FLAITRON_REPO} and re-run`,
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

  // Attended-ledger gate: ahead of the migration gate (natabula wave-bump's
  // order), since no waiver of a Migration block waives the ledger's review.
  const ledgers = await trackedLedgers(repo, attendedLedgers);
  if (ledgers.length > 0) {
    const paths = ledgers.join(', ');
    return {
      status: 'skip',
      current,
      reason: `attended ledger tracked (${paths}) — its owner bumps and refreshes it in one task`,
      suggestion: `suggested owner task: bump flaitron ${current} → ${latest} and refresh ${paths} (attended review)`,
    };
  }

  // --accept-migration waives only the tags it names; the cache keeps the raw
  // bearing list, so the filter runs per adopter.
  const bearing = (await cachedMigrationBearingTags(current, latest)).filter(
    (tag) => !acceptedMigrations.includes(tag),
  );
  if (bearing.length > 0) {
    return {
      status: 'skip',
      current,
      reason: `migration-bearing release(s) in range: ${bearing.join(', ')} — run /ft-update manually`,
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

  // Dirty-tracked gate: the follow-through rewrites adopter files and rollback
  // restores their pre-bump bytes, so an operator's uncommitted edit must not
  // be in reach. Untracked files are never touched or committed and stay out.
  // The submodule's own entry is left to the next gate, which names it.
  const dirty = (await git(repo, 'status', '--porcelain', '-z', '--untracked-files=no'))
    .split('\0')
    .filter((entry) => entry.length > 3 && entry.slice(3) !== subPath)
    .map((entry) => entry.slice(3));
  if (dirty.length > 0) {
    const shown = dirty.length > 3 ? `${dirty.slice(0, 3).join(', ')}, …` : dirty.join(', ');
    return { status: 'skip', current, reason: `dirty tracked files (${shown}) — commit or stash first` };
  }

  const subStatus = await git(sub, 'status', '--porcelain');
  if (subStatus.trim().length > 0) {
    return { status: 'skip', current, reason: `dirty ${subPath} worktree` };
  }

  // Codex-wiring gate (CORE-852.5): codex/reconcile-skills.md moves no pin
  // over a conflict, and neither does a sweep — /ft-update resolves it with
  // the operator. Read-only here; applyBump makes the links.
  const { conflicts } = await wiringPlan(repo, subPath, latest);
  if (conflicts.length > 0) {
    const shown = conflicts.length > 3 ? `${conflicts.slice(0, 3).join(', ')}, …` : conflicts.join(', ');
    return { status: 'skip', current, reason: `codex wiring conflict (${shown}) — run /ft-update` };
  }

  // Audit-fork gates: a full-copy fork missing a newly shipped pass file skips
  // (its copy needs /ft-update's per-file confirm); a fork whose scaffold
  // changed since its marker rides as a note on the row, never a skip.
  const forks = await auditForks(repo);
  const drifted = [];
  const gaps = [];
  for (const fork of forks) {
    if (await cachedForkDrift(fork, latest)) drifted.push(`${fork.dir}@${fork.reconciled}`);
    gaps.push(...(await forkPassGaps(repo, fork, latest)));
  }
  const forkNote = drifted.length > 0 ? ` (audit fork drift: ${drifted.join(', ')} — review and re-reconcile)` : '';
  if (gaps.length > 0) {
    return { status: 'skip', current, reason: `audit fork needs pass-file copy (${gaps.join(', ')}) — run /ft-update`, forkNote };
  }

  return { status: 'bump', current, forkNote };
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

// Undo applyBump's mutations: undo each link change newest first (unlink a
// created link, re-create a removed one at its prior target) and remove each
// directory made for them, write each rewritten file's captured bytes back,
// put the submodule worktree back on `priorSha`, and drop from the index every
// path whose `git add` was attempted (a partial add may have staged it).
// checkAdopter verified the index and tracked files were otherwise clean, so a
// pathspec reset restores the index exactly.
// Best-effort by construction — the caller is already unwinding a failure, so this
// reports what it could not undo rather than throwing over the original error.
// Returns null when the repo is fully restored, else a note naming the residue.
async function rollbackBump(repo, subPath, priorSha, { written, staged, links, dirs }) {
  const residue = [];
  for (const { path, target } of [...links].reverse()) {
    try {
      if (target === null) await unlink(join(repo, path));
      else await symlink(target, join(repo, path));
    } catch (e) {
      residue.push(`${path} link left ${target === null ? 'created' : 'removed'} (${e.message})`);
    }
  }
  for (const dir of [...dirs].reverse()) {
    try {
      await rmdir(join(repo, dir));
    } catch (e) {
      residue.push(`${dir} left created (${e.message})`);
    }
  }
  for (const [path, bytes] of written) {
    try {
      await writeFile(join(repo, path), bytes);
    } catch (e) {
      residue.push(`${path} left rewritten (${e.message})`);
    }
  }
  try {
    await git(join(repo, subPath), 'checkout', '--quiet', priorSha);
  } catch (e) {
    residue.push(`submodule left at the new tag (${e.message})`);
  }
  if (staged.length > 0) {
    try {
      await git(repo, '--literal-pathspecs', 'reset', '--quiet', '--', ...staged);
    } catch (e) {
      residue.push(`${staged.join(', ')} left staged (${e.message})`);
    }
  }
  return residue.length > 0 ? residue.join('; ') : null;
}

// The adopter files the follow-through may rewrite, relative to the adopter root.
const TASKNOTE_README = join(FLAITRON_DIR, 'tasknote', 'README.md');
const AGENTS_MD = 'AGENTS.md';
// `Pinned to:` is natabula wave-bump's sed expression (first match per line).
// The Workflow heading is matched exactly, not by wave-bump's `^## Workflow`
// prefix, so a project's own `## Workflows (CI)` section is never replaced;
// the section ends at the next H1 or H2 (wave-bump: H2 only).
const PIN_LINE = /(Pinned to: )v\d+\.\d+\.\d+/;
const WORKFLOW_HEADING = /^## Workflow[ \t]*\r?$/;
const SECTION_END = /^#{1,2} /;
// A CommonMark fence line: up to 3 spaces, then 3+ backticks or tildes.
const FENCE = /^ {0,3}(`{3,}|~{3,})/;

// Per line, whether it is a heading candidate: false for every line inside a
// fenced code block, fence lines included, so a fenced `# comment` or
// `## Workflow` is never read as a heading (CORE-853). A fence closes on a run
// of the opening character at least as long, with nothing but whitespace after
// it. An unclosed fence runs to EOF.
function headingLines(lines) {
  let open = null;
  return lines.map((line) => {
    const m = FENCE.exec(line);
    if (open === null) {
      if (!m) return true;
      open = m[1];
      return false;
    }
    if (m && m[1][0] === open[0] && m[1].length >= open.length && !line.slice(m[0].length).trim()) {
      open = null;
    }
    return false;
  });
}

// The indices of AGENTS.md's unfenced `## Workflow` headings.
function workflowHeadings(lines) {
  const ok = headingLines(lines);
  return lines.flatMap((l, i) => (ok[i] && WORKFLOW_HEADING.test(l) ? [i] : []));
}

// What the follow-through may do with `path` in `repo`, expecting a `type`
// ('file' or 'dir'): `type` itself (it is one, and resolves to itself inside
// the repo), 'symlink' (it or a parent directory is a symlink — a write would
// land elsewhere while `git add` staged only the link or refused the path),
// 'other' (present but not a `type`), or null when absent.
async function pathKind(repo, path, type = 'file') {
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

// Each `Pinned to: vX.Y.Z` (first per line) rewritten to `tag`.
export function rewritePinLines(text, tag) {
  return text
    .split('\n')
    .map((line) => line.replace(PIN_LINE, `$1${tag}`))
    .join('\n');
}

// The `## Workflow` block inside claude/AGENTS-snippet.md's paste fence (the
// first ```markdown fence after `## Block to paste into AGENTS.md`), without
// the fence lines; null when the snippet has no such block or it does not
// open with a `## Workflow` heading.
export function workflowPasteBlock(snippet) {
  const lines = snippet.split('\n');
  const heading = lines.findIndex((l) => /^## Block to paste into AGENTS\.md/.test(l));
  if (heading === -1) return null;
  const open = lines.findIndex((l, i) => i > heading && /^```markdown/.test(l));
  if (open === -1) return null;
  const close = lines.findIndex((l, i) => i > open && /^```/.test(l));
  if (close === -1) return null;
  const body = lines.slice(open + 1, close);
  return WORKFLOW_HEADING.test(body[0] ?? '') ? body.join('\n') : null;
}

// `agents` with its one `## Workflow` section — that heading through the line
// before the next H1/H2 heading, or to EOF — replaced by `block`, one blank
// line kept before the next heading (wave-bump's awk output shape). Lines
// inside code fences are never headings.
export function replaceWorkflowSection(agents, block) {
  const lines = agents.split('\n');
  const ok = headingLines(lines);
  const start = workflowHeadings(lines)[0];
  const next = lines.findIndex((l, i) => i > start && ok[i] && SECTION_END.test(l));
  const before = lines.slice(0, start).join('\n');
  const head = start > 0 ? `${before}\n` : '';
  if (next === -1) return `${head}${block}\n`;
  return `${head}${block}\n\n${lines.slice(next).join('\n')}`;
}

// One file of FLAITRON_REPO at `tag`, read once per sweep (same per-process
// cache argument as the caches above); null when git can't show it. Reading
// here rather than in the adopter's checkout keeps a sparse submodule from
// hiding a snippet.
const flaitronFileCache = new Map();
function cachedFlaitronFile(tag, path) {
  const key = `${tag}:${path}`;
  if (!flaitronFileCache.has(key)) {
    flaitronFileCache.set(key, git(FLAITRON_REPO, 'show', key).catch(() => null));
  }
  return flaitronFileCache.get(key);
}

// The file paths under `dir` in FLAITRON_REPO at `tag`, as a Set — empty when
// the tag can't be resolved, so a caller asking "did this ship at <tag>?" of
// an unknown tag hears "no".
const flaitronTreeCache = new Map();
function cachedFlaitronTree(tag, dir) {
  const key = `${tag}:${dir}`;
  if (!flaitronTreeCache.has(key)) {
    flaitronTreeCache.set(
      key,
      git(FLAITRON_REPO, 'ls-tree', '-r', '--name-only', tag, '--', dir).then(
        (out) => new Set(out.split('\n').filter(Boolean)),
        () => new Set(),
      ),
    );
  }
  return flaitronTreeCache.get(key);
}

// The target's Workflow paste block. A snippet git can't show reads as null —
// the same "snippet block not found" skip note as a snippet without the block,
// never a failed bump.
async function cachedWorkflowBlock(tag) {
  const snippet = await cachedFlaitronFile(tag, 'claude/AGENTS-snippet.md');
  return snippet === null ? null : workflowPasteBlock(snippet);
}

// What the wiring follow-through would do in `repo` for a bump to `latest`
// (CORE-852.5), computed without writing. `create` lists the missing links
// ({ dst, target }); `conflicts` the Codex entries codex/reconcile-skills.md
// refuses to work around (any one skips the adopter); `notes` the ⬆-line
// remarks; `roots` the present surface roots the dangling-link prune walks.
// Only a surface whose root already exists as a real directory takes part.
// Codex follows reconcile-skills.md: a roster body missing at the target, a
// redirected root, or any entry at a roster path that is not the exact link is
// a conflict. The other surfaces keep /ft-update's report-only rule: an
// existing destination is never replaced, a custom one is noted, and a
// redirected root skips that surface with a note.
export async function wiringPlan(repo, subPath, latest) {
  const plan = { create: [], conflicts: [], notes: [], roots: [] };
  const want = []; // { dst, target } before the existence checks
  for (const surface of WIRING_SURFACES) {
    const kind = await pathKind(repo, surface.root, 'dir');
    if (kind === null) continue;
    if (surface.platform === 'codex') {
      if (kind !== 'dir') {
        plan.conflicts.push(`skill root ${surface.root}`);
        continue;
      }
      const snippet = await cachedFlaitronFile(latest, surface.snippetPath);
      const slugs = snippet === null ? [] : codexRoster(snippet);
      if (slugs.length === 0) {
        plan.conflicts.push('empty pinned Codex roster');
        continue;
      }
      const bodies = await cachedFlaitronTree(latest, 'codex/skills/');
      const missing = slugs.filter((slug) => !bodies.has(`codex/skills/${slug}/SKILL.md`));
      if (missing.length > 0) {
        plan.conflicts.push(`missing pinned body ${missing.join(', ')}`);
        continue;
      }
      for (const slug of slugs) {
        const dst = `${surface.skillsDir}/${slug}`;
        const target = `../../${subPath}/codex/skills/${slug}`;
        const have = await linkTarget(repo, dst);
        if (have === undefined) want.push({ dst, target });
        else if (have !== target) plan.conflicts.push(`preserved ${dst}`);
      }
    } else {
      const skillsKind = surface.skillsDir === surface.root ? kind : await pathKind(repo, surface.skillsDir, 'dir');
      if (kind !== 'dir' || (skillsKind !== null && skillsKind !== 'dir')) {
        plan.notes.push(`${surface.platform} wiring skipped (redirected ${kind !== 'dir' ? surface.root : surface.skillsDir})`);
        continue;
      }
      const snippet = await cachedFlaitronFile(latest, surface.snippetPath);
      for (const link of snippet === null ? [] : snippetLinks(snippet, surface.skillsDir, subPath)) {
        const have = await linkTarget(repo, link.dst);
        if (have !== undefined) {
          if (have !== link.target) plan.notes.push(`kept custom ${link.dst}`);
          continue;
        }
        // A link to a body the target does not ship would dangle on arrival
        // (and the next sweep's prune would remove it): note it instead.
        const body = link.target.slice(`../../${subPath}/`.length);
        if (!(await cachedFlaitronTree(latest, `${dirname(body)}/`)).has(`${body}/SKILL.md`)) {
          plan.notes.push(`not wired (missing pinned body) ${link.dst}`);
        } else {
          want.push(link);
        }
      }
    }
    plan.roots.push(surface.root);
  }
  const ignored = await ignoredPaths(repo, want.map((link) => link.dst));
  for (const link of want) {
    if (ignored.has(link.dst)) plan.notes.push(`not wired (ignored) ${link.dst}`);
    else plan.create.push(link);
  }
  return plan;
}

// `path`'s symlink target, null when it exists but is not a symlink, or
// undefined when nothing is there.
async function linkTarget(repo, path) {
  try {
    if (!(await lstat(join(repo, path))).isSymbolicLink()) return null;
  } catch {
    return undefined;
  }
  return readlink(join(repo, path));
}

// Which of `paths` git would ignore in `repo` — a link created there could not
// be staged, and /ft-update never force-adds one (one call answers for all).
async function ignoredPaths(repo, paths) {
  if (paths.length === 0) return new Set();
  try {
    return new Set((await git(repo, 'check-ignore', '--', ...paths)).split('\n').filter(Boolean));
  } catch (e) {
    if (e.code === 1) return new Set(); // exit 1: none ignored
    throw e;
  }
}

// Symlinks under `root` whose target does not exist, walked without following
// links (a symlinked directory is itself a candidate, never traversed);
// PRUNE_SKIP subtrees are left out. Only ENOENT / ENOTDIR count as dangling: a
// target behind an unreadable directory or a link loop is not proof the
// target was retired, so such a link is never pruned.
async function danglingLinks(repo, root) {
  const found = [];
  const walk = async (rel) => {
    if (PRUNE_SKIP.has(rel)) return;
    for (const entry of await readdir(join(repo, rel), { withFileTypes: true })) {
      const path = join(rel, entry.name);
      if (entry.isSymbolicLink()) {
        try {
          await stat(join(repo, path));
        } catch (e) {
          if (e.code === 'ENOENT' || e.code === 'ENOTDIR') found.push(path);
        }
      } else if (entry.isDirectory()) {
        await walk(path);
      }
    }
  };
  await walk(root);
  return found.sort();
}

// Paths among `paths` that the index tracks (literal pathspecs: these names
// come from the adopter's filesystem).
async function trackedPaths(repo, paths) {
  if (paths.length === 0) return new Set();
  return new Set((await git(repo, '--literal-pathspecs', 'ls-files', '-z', '--', ...paths)).split('\0').filter(Boolean));
}

// Prune tracked dangling links into the submodule on the present surfaces,
// then create the links still missing, staging each change. Pruning first
// means a stale link at a roster path is replaced by the right one rather than
// kept as "custom" and then deleted, and a link this run created is never seen
// by the prune. `ctx.links` records each link change once it has happened
// ({ path, target }: target null for a created link, the prior target for a
// removed one) and `ctx.dirs` each directory made, so rollback can undo
// exactly what this run did. A dangling link that is untracked (the
// operator's own local state, which git could not restore) or that points
// outside the submodule is kept and noted.
async function wireSkills(repo, subPath, latest, ctx) {
  const { conflicts, roots } = await wiringPlan(repo, subPath, latest);
  // checkAdopter skipped any adopter with a conflict; one appearing since then
  // fails the bump closed rather than writing around it.
  if (conflicts.length > 0) throw new Error(`codex wiring conflict (${conflicts.join(', ')})`);
  const notes = [];
  const stage = async (path) => {
    ctx.staged.push(path);
    await git(repo, '--literal-pathspecs', 'add', '--', path);
  };
  const sub = resolve(repo, subPath);
  for (const root of roots) {
    const dangling = await danglingLinks(repo, root);
    const tracked = await trackedPaths(repo, dangling);
    for (const path of dangling) {
      const target = await readlink(join(repo, path));
      const abs = resolve(repo, dirname(path), target);
      if (abs !== sub && !abs.startsWith(sub + sep)) {
        notes.push(`kept broken ${path}`);
      } else if (!tracked.has(path)) {
        notes.push(`kept untracked ${path}`);
      } else {
        await unlink(join(repo, path));
        ctx.links.push({ path, target });
        await stage(path);
        notes.push(`removed ${path}`);
      }
    }
  }
  // Re-planned after the prune: the removals change which roster links are missing.
  const plan = await wiringPlan(repo, subPath, latest);
  if (plan.conflicts.length > 0) throw new Error(`codex wiring conflict (${plan.conflicts.join(', ')})`);
  notes.push(...plan.notes);
  for (const { dst, target } of plan.create) {
    if ((await pathKind(repo, dirname(dst), 'dir')) === null) {
      await mkdir(join(repo, dirname(dst)));
      ctx.dirs.push(dirname(dst));
    }
    await symlink(target, join(repo, dst));
    ctx.links.push({ path: dst, target: null });
    await stage(dst);
    notes.push(`wired ${dst}`);
  }
  return notes;
}

// Local audit forks (CORE-852.5) — /ft-update Step 4.5's test: a real skill
// directory under .claude/skills or .agents/skills whose real SKILL.md carries
// `flaitron-reconciled:` and `flaitron-tracks:`. A value that is not a semver
// tag or a skill slug is not read as a marker, so nothing adopter-authored
// reaches a git rev range or pathspec unvalidated. `fullCopy`: a passes/
// directory sits beside SKILL.md (a thin overlay has none and inherits new
// pass files from the bundle at run time).
const FORK_ROOTS = ['.claude/skills', '.agents/skills'];
async function auditForks(repo) {
  const forks = [];
  for (const root of FORK_ROOTS) {
    if ((await pathKind(repo, root, 'dir')) !== 'dir') continue;
    for (const entry of await readdir(join(repo, root), { withFileTypes: true })) {
      if (!entry.isDirectory()) continue; // a linked skill directory is the submodule's
      const dir = `${root}/${entry.name}`;
      if ((await pathKind(repo, `${dir}/SKILL.md`)) !== 'file') continue;
      const text = await readFile(join(repo, dir, 'SKILL.md'), 'utf8');
      const reconciled = /^flaitron-reconciled:[ \t]*(\S+)/m.exec(text)?.[1];
      const tracks = /^flaitron-tracks:[ \t]*(\S+)/m.exec(text)?.[1];
      if (!reconciled || !parseSemverTag(reconciled) || !tracks || !/^[a-z0-9-]+$/.test(tracks)) continue;
      forks.push({ dir, reconciled, tracks, fullCopy: (await pathKind(repo, `${dir}/passes`, 'dir')) === 'dir' });
    }
  }
  return forks;
}

// Pass files shipped at `latest` that a full-copy ft-audit fork lacks and that
// did not exist at its reconcile point, as `<dir>/passes/<file>`. A file the
// bundle had at the reconcile point was deliberately deleted by the forker and
// is never counted; a reconcile tag this checkout can't resolve counts every
// missing file (fail closed — the copy needs /ft-update's per-file confirm).
async function forkPassGaps(repo, fork, latest) {
  if (!fork.fullCopy || fork.tracks !== 'ft-audit') return [];
  const passes = 'claude/skills/ft-audit/passes/';
  const shipped = await cachedFlaitronTree(latest, passes);
  const before = await cachedFlaitronTree(fork.reconciled, passes);
  const gaps = [];
  for (const path of shipped) {
    const file = `${fork.dir}/passes/${path.slice(passes.length)}`;
    if (before.has(path) || (await pathKind(repo, file)) !== null) continue;
    gaps.push(file);
  }
  return gaps.sort();
}

// True when the fork's tracked scaffold changed between its reconcile point and
// `latest`; a reconcile tag git can't range over reads as drifted, so a stale
// marker is reported rather than silently trusted.
const forkDriftCache = new Map();
function cachedForkDrift(fork, latest) {
  const key = `${fork.reconciled}::${fork.tracks}::${latest}`;
  if (!forkDriftCache.has(key)) {
    forkDriftCache.set(
      key,
      git(FLAITRON_REPO, 'log', '--oneline', '-1', `${fork.reconciled}..${latest}`, '--', `claude/skills/${fork.tracks}/`).then(
        (out) => out.trim() !== '',
        () => true,
      ),
    );
  }
  return forkDriftCache.get(key);
}

// Rewrite the follow-through files in `repo` for a bump to `latest`, staging
// each one that changed. `ctx.written` gets each rewritten path's prior bytes
// before the write, `ctx.staged` each path before its `git add`, so the caller's
// rollback covers a failure at any point. The skill wiring (wireSkills) runs
// last. Returns the ⬆-line notes.
async function followThrough(repo, subPath, latest, ctx) {
  const notes = [];
  const rewrite = async (path, before, after) => {
    if (after === before.toString('utf8')) return false;
    ctx.written.set(path, before);
    await writeFile(join(repo, path), after);
    ctx.staged.push(path);
    await git(repo, '--literal-pathspecs', 'add', '--', path);
    return true;
  };

  const readmeKind = await pathKind(repo, TASKNOTE_README);
  if (readmeKind === 'symlink') {
    notes.push('pin line skipped (README.md is a symlink)');
  } else if (readmeKind === 'file') {
    const before = await readFile(join(repo, TASKNOTE_README));
    const text = before.toString('utf8');
    if (PIN_LINE.test(text) && (await rewrite(TASKNOTE_README, before, rewritePinLines(text, latest)))) {
      notes.push('pin line');
    }
  }

  const agentsKind = await pathKind(repo, AGENTS_MD);
  if (agentsKind === 'symlink') {
    notes.push('workflow skipped (AGENTS.md is a symlink)');
  } else if (agentsKind === 'file') {
    const before = await readFile(join(repo, AGENTS_MD));
    const text = before.toString('utf8');
    const headings = workflowHeadings(text.split('\n')).length;
    if (headings > 1) {
      notes.push('workflow skipped (more than one ## Workflow heading)');
    } else if (headings === 1) {
      const block = await cachedWorkflowBlock(latest);
      if (block === null) {
        notes.push('workflow skipped (snippet block not found)');
      } else if (await rewrite(AGENTS_MD, before, replaceWorkflowSection(text, block))) {
        notes.push('workflow block');
      }
    }
  }
  notes.push(...(await wireSkills(repo, subPath, latest, ctx)));
  return notes;
}

// Check out `latest` in `sub` and prove it is the canonical release: SPEC.md's
// Version line must read it, and the checked-out SHA must match FLAITRON_REPO's
// tag. applyBump calls it inside its rollback window.
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

// Returns the follow-through notes for the ⬆ line (empty when only the
// gitlink moved).
export async function applyBump(adopter, latest, { trailer = null } = {}) {
  const { repo } = adopter;
  const subPath = adopter.subPath ?? SUBMODULE_PATH;
  const sub = join(repo, subPath);
  // Fetch adds refs only — no worktree or index mutation, so it sits outside the
  // rollback window and the prior SHA is captured immediately before the checkout.
  // Timed: the only git call in this script that talks to a remote, so it's the
  // only one that can hang on a stalled peer rather than fail fast.
  await git(sub, 'fetch', '--tags', '--quiet', 'origin', { timeout: fetchTimeoutMs() });
  const priorSha = (await git(sub, 'rev-parse', 'HEAD')).trim();
  // What rollback must undo: each rewritten file's prior bytes, and each path
  // whose `git add` was attempted (recorded before the add — a partial add may
  // already have staged it).
  // (plus each link created or removed, and each directory made, once done).
  const ctx = { written: new Map(), staged: [], links: [], dirs: [] };
  try {
    await checkoutVerified(sub, latest);
    ctx.staged.push(subPath);
    // --literal-pathspecs on every pathspec call: subPath can come from the
    // adopter's .gitmodules, and a glob or `:(…)` magic in it would otherwise
    // widen what gets staged and committed beyond the paths this run wrote.
    await git(repo, '--literal-pathspecs', 'add', '--', subPath);
    const notes = await followThrough(repo, subPath, latest, ctx);
    // Pathspec commit naming only the paths this run wrote, never unrelated
    // work; hooks run (see "Commit contract" above).
    const message = ['-m', `chore: bump flaitron ${adopter.current} → ${latest}`];
    if (trailer !== null) message.push('-m', trailer);
    try {
      // Raised maxBuffer: a hook that lints or tests can print past execFile's
      // 1 MB default, which would kill git mid-commit.
      await git(repo, '--literal-pathspecs', 'commit', '--quiet', ...message, '--', ...ctx.staged, {
        maxBuffer: 64 * 1024 * 1024,
      });
    } catch (e) {
      throw new Error(`commit failed (hook?) — ${gitErrorLine(e)}`);
    }
    return notes;
  } catch (e) {
    const residue = await rollbackBump(repo, subPath, priorSha, ctx);
    // Rethrow the original failure — reportResult renders it as the ✗ line — with
    // the un-undone residue appended when the repo could not be fully restored.
    if (residue) e.message = `${e.message} (rollback incomplete: ${residue})`;
    throw e;
  }
}

// Print one adopter's check result and fold it into the running counts. The
// apply branch performs the bump inline, awaiting applyBump; all other branches
// are pure presentation over the already-computed result.
async function reportResult(adopter, result, latest, apply, counts, trailer = null) {
  if (result.status === 'current') {
    counts.current += 1;
    console.log(`  ✓ ${adopter.name}: current (${result.current})`);
  } else if (result.status === 'drift') {
    counts.drifted += 1;
    console.log(`  ⚠ ${adopter.name} (${result.current}): gitlink drift — ${result.reason}`);
  } else if (result.status === 'skip') {
    counts.skipped += 1;
    const at = result.current ? ` (${result.current})` : '';
    console.log(`  ⏭ ${adopter.name}${at}: skipped — ${result.reason}${result.forkNote ?? ''}`);
    if (result.suggestion) console.log(`      ↳ ${result.suggestion}`);
  } else if (apply) {
    try {
      const notes = await applyBump({ ...adopter, current: result.current }, latest, { trailer });
      counts.bumped += 1;
      const changed = notes.length > 0 ? ` — ${notes.join(', ')}` : '';
      console.log(`  ⬆ ${adopter.name}: bumped ${result.current} → ${latest}, committed${changed}${result.forkNote}`);
    } catch (e) {
      counts.failed += 1;
      console.error(`  ✗ ${adopter.name}: bump failed — ${e.message}`);
    }
  } else {
    counts.planned += 1;
    console.log(`  ⬆ ${adopter.name}: would bump ${result.current} → ${latest}${result.forkNote}`);
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
  // --target wins over both; it is validated below, before any adopter is read.
  const override = process.env.FLAITRON_UPDATE_LATEST;
  let latest;
  if (args.target !== null) {
    latest = args.target;
  } else if (override !== undefined) {
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
  if (args.target !== null && !(await isReleaseTag(latest))) {
    usageError(`Unknown --target tag in ${FLAITRON_REPO}: ${latest}`, true);
  }
  for (const tag of args.acceptMigrations) {
    const why = await acceptMigrationError(tag, latest);
    if (why) usageError(`Cannot --accept-migration ${tag}: ${why}`, true);
  }

  const mode = args.apply ? 'APPLY' : 'DRY-RUN';
  console.log(`flaitron update-adopters — ${mode}`);
  console.log(`  workspace: ${root}`);
  console.log(args.target === null ? `  latest release: ${latest}` : `  target release: ${latest}`);
  if (args.acceptMigrations.length > 0) {
    console.log(`  migration accepted (reviewed): ${args.acceptMigrations.join(', ')}`);
  }
  console.log('');

  let adopters;
  try {
    adopters = await discoverAdopters(root);
  } catch (e) {
    console.error(`Workspace root is not a readable directory: ${root} (${e.message})`);
    process.exitCode = 1;
    return;
  }

  // --only: unnamed adopters are neither listed nor counted; a name that
  // matches nothing becomes one skip row after the sweep (a Set, so a repeated
  // name reports once) — ahead of the empty-workspace return, which would
  // otherwise drop it silently.
  let unmatched = [];
  if (args.only.length > 0) {
    const named = new Set(args.only);
    const discovered = new Set(adopters.map((a) => a.name));
    adopters = adopters.filter((a) => named.has(a.name));
    unmatched = [...named].filter((name) => !discovered.has(name));
  }

  if (adopters.length === 0 && unmatched.length === 0) {
    console.log(`No ${SUBMODULE_PATH} adopters found.`);
    return;
  }

  const counts = { current: 0, drifted: 0, bumped: 0, planned: 0, skipped: 0, failed: 0 };
  for (const adopter of adopters) {
    let result;
    try {
      result = await checkAdopter(adopter, latest, {
        attendedLedgers: args.attendedLedgers,
        branch: args.branch,
        acceptedMigrations: args.acceptMigrations,
      });
    } catch (e) {
      counts.failed += 1;
      console.error(`  ✗ ${adopter.name}: check failed — ${e.message}`);
      continue;
    }
    await reportResult(adopter, result, latest, args.apply, counts, args.trailer);
  }
  for (const name of unmatched) {
    await reportResult(
      { name },
      { status: 'skip', reason: `no adopter at this exact name under ${root}` },
      latest,
      args.apply,
      counts,
    );
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

export { FLAITRON_REPO, SUBMODULE_PATH, realOrResolve };
