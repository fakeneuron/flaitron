// update-adopters adopter check: the committed-gitlink reads, the attended-ledger lookup, and checkAdopter's sequential skip/drift gates (CORE-EPIC-931).
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
//     follow-through (apply.mjs) rewrites adopter files, and an uncommitted edit
//     there would be overwritten, committed, or lost to a rollback
//   - dirty .flaitron/core submodule worktree
//   - the adopter's Codex wiring conflicts with the target roster under
//     codex/reconcile-skills.md (see "Skill wiring" in wiring.mjs) → /ft-update
//   - a full-copy audit fork lacks a pass file shipped after its marker (see
//     "Audit forks" in wiring.mjs) → /ft-update copies it on a per-file confirm
//   - the committed gitlink (or the latest tag's commit) can't be resolved at
//     all → the pin can't be verified either way, so report the git error
//     rather than the ✓ current this used to fall through to
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

import { join, normalize } from 'node:path';

import {
  FLAITRON_REPO,
  cachedCanonicalTagSha,
  cachedMigrationBearingTags,
  compareSemver,
  describePin,
  git,
  gitErrorLine,
  isUnresolved,
  parseSemverTag,
  unresolved,
} from './release.mjs';
import { auditForks, cachedForkDrift, forkPassGaps, wiringPlan } from './wiring.mjs';
import { SUBMODULE_PATH, pinnedVersion } from './workspace.mjs';

// The superproject's committed submodule gitlink SHA at HEAD, or the unresolved
// sentinel when git can't answer (no committed gitlink yet, unreadable repo).
async function recordedGitlinkSha(repo, subPath) {
  try {
    return (await git(repo, 'rev-parse', `HEAD:${subPath}`)).trim();
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
