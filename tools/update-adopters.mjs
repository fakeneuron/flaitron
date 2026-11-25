#!/usr/bin/env node
// update-adopters — batch-bump flaitron adopter pins to the latest release.
//
// One of the two CLI carve-outs (with install.sh) to SPEC.md §"What flaitron
// does NOT provide" (SPEC/scope-boundaries.md): operator-side fleet
// maintenance across ~/code, not workflow machinery inside a project. It
// batches the /ft-update recipe: for every adopter pinned behind the latest
// released tag, move the .flaitron/core submodule pin, carry the
// follow-through (apply.mjs) and commit — locally only, never pushing.
//
// Modules (tools/update-adopters/, each header carrying its own contract):
//   release.mjs    the git runner, FLAITRON_REPO's tags and release notes;
//                  the retired migrations
//   workspace.mjs  the workspace root, path helpers, pinned-version read and
//                  adopter discovery (the submodule-path rule below)
//   text.mjs       pure markdown rewrites and reads behind the follow-through
//   wiring.mjs     skill wiring and audit forks
//   check.mjs      the per-adopter safety gates and gitlink drift
//   apply.mjs      the follow-through, mid-bump rollback and commit contract
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
// Not covered (by design — run /ft-update in the repo for these): wiring a
// platform the adopter has no surface for yet; copying a newly shipped pass
// file into a full-copy fork (skipped: check.mjs) or re-reconciling a drifted
// fork and moving its marker (noted: wiring.mjs); resolving a Codex conflict; removing an
// untracked retired link (reconcile-skills.md's retirement pass unlinks an
// exact-owned one, this sweep keeps it); re-applying the docs/MIGRATION.md
// §1.1 sparse trim; and /ft-update Step 4.7's agent-home shadow check, which
// reads outside the adopter. The dry run previews none of the follow-through.

import { isAbsolute, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  FLAITRON_REPO,
  acceptMigrationError,
  isReleaseTag,
  latestReleaseTag,
  parseSemverTag,
} from './update-adopters/release.mjs';
import {
  SUBMODULE_PATH,
  discoverAdopters,
  pinnedVersion,
  realOrResolve,
  workspaceRoot,
} from './update-adopters/workspace.mjs';
import { checkAdopter } from './update-adopters/check.mjs';
import { applyBump } from './update-adopters/apply.mjs';

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
export { applyBump, verifyPinnedSha } from './update-adopters/apply.mjs';

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
