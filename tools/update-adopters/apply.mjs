// update-adopters write path: the bump's checkout, SHA verification, follow-through rewrites, commit and rollback (CORE-EPIC-931).
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

import { readFile, rmdir, symlink, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import {
  FLAITRON_REPO,
  cachedCanonicalTagSha,
  cachedFlaitronFile,
  git,
  gitErrorLine,
  isUnresolved,
} from './release.mjs';
import { PIN_LINE, rewritePinLines, workflowFollowThrough, workflowPasteBlock } from './text.mjs';
import { wireSkills } from './wiring.mjs';
import { FLAITRON_DIR, SUBMODULE_PATH, pathKind, pinnedVersion } from './workspace.mjs';

// FLAITRON_FETCH_TIMEOUT_MS override read at call time (not cached at module
// load) so tests can shrink it per-case without a child-process boundary.
function fetchTimeoutMs() {
  const raw = Number(process.env.FLAITRON_FETCH_TIMEOUT_MS);
  return Number.isFinite(raw) && raw > 0 ? raw : 30000;
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
    // work; hooks run (see "Commit contract" in this module's header).
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
