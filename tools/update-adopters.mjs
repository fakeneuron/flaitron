#!/usr/bin/env node
// update-adopters — batch-bump flaitron adopter pins to the latest release.
//
// One of the two CLI carve-outs (with install.sh) to SPEC.md §"What flaitron
// does NOT provide" (SPEC/scope-boundaries.md): operator-side fleet
// maintenance across ~/code, not workflow machinery inside a project. It
// batches the /ft-update recipe: for every adopter pinned behind the latest
// released tag, move the .flaitron/core submodule pin, carry the
// follow-through (below) and commit — locally only, never pushing.
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
// what was skipped. SPEC/fixtures/workflow-block/cases.json pins the AGENTS.md
// bytes and skips (workflowFollowThrough); /ft-update follows the same cases.
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

import { readFile, rmdir, symlink, unlink, writeFile } from 'node:fs/promises';
import { isAbsolute, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  FLAITRON_REPO,
  acceptMigrationError,
  cachedCanonicalTagSha,
  cachedFlaitronFile,
  git,
  gitErrorLine,
  isReleaseTag,
  isUnresolved,
  latestReleaseTag,
  parseSemverTag,
} from './update-adopters/release.mjs';
import {
  PIN_LINE,
  rewritePinLines,
  workflowFollowThrough,
  workflowPasteBlock,
} from './update-adopters/text.mjs';
import {
  FLAITRON_DIR,
  SUBMODULE_PATH,
  discoverAdopters,
  pathKind,
  pinnedVersion,
  realOrResolve,
  workspaceRoot,
} from './update-adopters/workspace.mjs';
import { wireSkills } from './update-adopters/wiring.mjs';
import { checkAdopter } from './update-adopters/check.mjs';

// The moved public names stay importable from this entry (CORE-EPIC-931).
export {
  acceptMigrationError,
  cachedCanonicalTagSha,
  cachedMigrationBearingTags,
  compareSemver,
  describePin,
  git,
  isReleaseTag,
  latestReleaseTag,
  migrationAsk,
  migrationBearingTags,
  parseSemverTag,
  tagsInRange,
} from './update-adopters/release.mjs';
export {
  codexRoster,
  fenceOpeners,
  rewritePinLines,
  snippetLinks,
  workflowFollowThrough,
  workflowPasteBlock,
} from './update-adopters/text.mjs';
export { wiringPlan } from './update-adopters/wiring.mjs';
export { checkAdopter, gitlinkDrift } from './update-adopters/check.mjs';

if (Number(process.versions.node.split('.')[0]) < 20) {
  console.error(`update-adopters requires Node ≥20 (found ${process.version})`);
  process.exit(1);
}

// FLAITRON_FETCH_TIMEOUT_MS override read at call time (not cached at module
// load) so tests can shrink it per-case without a child-process boundary.
function fetchTimeoutMs() {
  const raw = Number(process.env.FLAITRON_FETCH_TIMEOUT_MS);
  return Number.isFinite(raw) && raw > 0 ? raw : 30000;
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

// The target's Workflow paste block. A snippet git can't show reads as null —
// the same "snippet block not found" skip note as a snippet without the block,
// never a failed bump.
async function cachedWorkflowBlock(tag) {
  const snippet = await cachedFlaitronFile(tag, 'claude/AGENTS-snippet.md');
  return snippet === null ? null : workflowPasteBlock(snippet);
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
    const result = workflowFollowThrough(before.toString('utf8'), await cachedWorkflowBlock(latest));
    if (result.skip) {
      notes.push(`workflow skipped (${result.skip})`);
    } else if (result.text !== null && (await rewrite(AGENTS_MD, before, result.text))) {
      notes.push('workflow block');
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

export { FLAITRON_REPO, SUBMODULE_PATH, discoverAdopters, pinnedVersion, realOrResolve };
