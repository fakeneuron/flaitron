// Automated tests for tools/update-adopters.mjs (CORE-360).
// Zero-dep: node:test + temp git fixtures under --root. Never touches ~/code.

import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { lstat, mkdtemp, mkdir, readFile, readlink, rm, symlink, unlink, writeFile } from 'node:fs/promises';
import { availableParallelism, tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { after, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import {
  FLAITRON_REPO,
  SUBMODULE_PATH,
  acceptMigrationError,
  applyBump,
  cachedCanonicalTagSha,
  cachedMigrationBearingTags,
  checkAdopter,
  codexRoster,
  compareSemver,
  describePin,
  discoverAdopters,
  git,
  gitlinkDrift,
  isReleaseTag,
  latestReleaseTag,
  migrationAsk,
  migrationBearingTags,
  parseArgs,
  parseSemverTag,
  pinnedVersion,
  realOrResolve,
  replaceWorkflowSection,
  rewritePinLines,
  snippetLinks,
  tagsInRange,
  verifyPinnedSha,
  wiringPlan,
  workflowPasteBlock,
} from './update-adopters.mjs';

const execFileAsync = promisify(execFile);
const SCRIPT = fileURLToPath(new URL('./update-adopters.mjs', import.meta.url));
const WORKSPACE_TS = fileURLToPath(new URL('../viz/src/workspace.ts', import.meta.url));

async function runCli(args, { expectFail = false, env = {} } = {}) {
  try {
    const { stdout, stderr } = await execFileAsync(process.execPath, [SCRIPT, ...args], {
      cwd: FLAITRON_REPO,
      env: { ...process.env, ...env },
    });
    return { code: 0, stdout, stderr };
  } catch (e) {
    if (!expectFail) throw e;
    return { code: e.code ?? 1, stdout: e.stdout ?? '', stderr: e.stderr ?? '' };
  }
}

async function gitQuiet(cwd, ...args) {
  await execFileAsync('git', args, { cwd });
}

/**
 * Temp-root cleanup. A bare `rm(..., {recursive:true})` races git's
 * post-checkout object writes on macOS (`ENOTEMPTY` on `.git/objects`);
 * `maxRetries`/`retryDelay` let `fs.rm` retry past the transient window
 * (CORE-651.3).
 */
async function rmTree(path) {
  await rm(path, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
}

/** Shared local clone mirror — object-copy source for portable fixture cores. */
let mirrorDir;
/**
 * Fixture release pair (TEST-003). Deliberately NOT the newest tag: fixtures
 * that need a bumpable range must sit on a range the migration gate lets
 * through, and `checkAdopter` runs that gate before the staged-changes,
 * dirty-worktree, and bump paths. Tracking the moving head of the tag list
 * meant the first release shipping a real Migration block (v5.15.0) silently
 * converted four reachability fixtures into migration-gate skips.
 *
 * So: scan tags newest-first for the newest ADJACENT pair whose range carries
 * no required project-side edits. Adjacent means `tagsInRange(previous,
 * latest)` is exactly `[latest]`, so classifying that one tag settles the
 * range. Computed rather than hardcoded so the pair self-heals as releases
 * accumulate.
 */
let latest;
let previous;

before(async () => {
  const tags = (await git(FLAITRON_REPO, 'tag', '--sort=-v:refname'))
    .split('\n')
    .map((l) => l.trim())
    .filter((t) => parseSemverTag(t));
  assert.ok(tags.length >= 2, 'need two release tags for behind/drift fixtures');

  for (let i = 0; i + 1 < tags.length; i += 1) {
    if ((await migrationBearingTags([tags[i]])).length === 0) {
      latest = tags[i];
      previous = tags[i + 1];
      break;
    }
  }
  assert.ok(latest, 'need an adjacent non-migration-bearing tag pair for bump fixtures');

  mirrorDir = await mkdtemp(join(tmpdir(), 'ft-upd-mirror-'));
  await execFileAsync('git', [
    'clone',
    '-q',
    '--local',
    '--no-hardlinks',
    FLAITRON_REPO,
    join(mirrorDir, 'core'),
  ]);
});

after(async () => {
  if (mirrorDir) await rmTree(mirrorDir);
});

/**
 * Build a minimal adopter superproject under `root/name` with `.flaitron/core`
 * cloned from the shared mirror and checked out at `pinTag`.
 */
async function makeAdopter(root, name, pinTag, subPath = SUBMODULE_PATH) {
  const repo = join(root, name);
  await mkdir(repo, { recursive: true });
  await gitQuiet(repo, 'init', '-q');
  await gitQuiet(repo, 'config', 'user.email', 'core-360@test.local');
  await gitQuiet(repo, 'config', 'user.name', 'CORE-360');
  await gitQuiet(repo, 'config', 'advice.addEmbeddedRepo', 'false');

  const sub = join(repo, subPath);
  // -n: skip the default-branch checkout the pinTag checkout below replaces
  // anyway — it is most of a fixture's cost (CORE-716.3).
  await execFileAsync('git', [
    'clone',
    '-q',
    '-n',
    '--local',
    '--no-hardlinks',
    join(mirrorDir, 'core'),
    sub,
  ]);
  await gitQuiet(sub, 'checkout', '-q', pinTag);
  await gitQuiet(repo, 'add', subPath);
  await gitQuiet(repo, 'commit', '-q', '-m', `pin ${pinTag}`);
  return { name, repo, sub, subPath };
}

/**
 * Commit a `.gitmodules` that declares `subPath` as the flaitron submodule
 * (CORE-852.3). makeAdopter's embedded clone carries none, so discovery falls
 * back to `.flaitron/core` unless a fixture declares one. An unrelated
 * submodule listed first proves the lookup picks the url naming flaitron.
 */
async function declareSubmodule(repo, subPath) {
  await writeFile(
    join(repo, '.gitmodules'),
    '[submodule "tools"]\n\tpath = vendor/tools\n\turl = https://example.invalid/tools.git\n' +
      `[submodule "flaitron"]\n\tpath = ${subPath}\n\turl = https://example.invalid/flaitron.git\n`,
  );
  await gitQuiet(repo, 'add', '.gitmodules');
  await gitQuiet(repo, 'commit', '-q', '-m', 'declare submodule');
}

/** What `git submodule deinit -f` leaves: the declared path, emptied. */
async function deinitSubmodule(adopter) {
  await rmTree(adopter.sub);
  await mkdir(adopter.sub);
}

const README_REL = '.flaitron/tasknote/README.md';

/**
 * Commit the adopter files the follow-through rewrites (CORE-852.4): the
 * tasknote README and/or AGENTS.md, each only when given.
 */
async function commitFollowThroughFiles(repo, { readme, agents }) {
  const paths = [];
  if (readme !== undefined) {
    await mkdir(join(repo, '.flaitron', 'tasknote'), { recursive: true });
    await writeFile(join(repo, README_REL), readme);
    paths.push(README_REL);
  }
  if (agents !== undefined) {
    await writeFile(join(repo, 'AGENTS.md'), agents);
    paths.push('AGENTS.md');
  }
  await gitQuiet(repo, 'add', '--', ...paths);
  await gitQuiet(repo, 'commit', '-q', '-m', 'follow-through fixtures');
}

/**
 * Install one executable hook. core.hooksPath is pinned explicitly so a global
 * override on the host cannot silently disarm the injection.
 */
async function installHook(repo, name, body) {
  const hooks = join(repo, '.git', 'hooks');
  await mkdir(hooks, { recursive: true });
  await writeFile(join(hooks, name), `#!/bin/sh\n${body}\n`, { mode: 0o755 });
  await gitQuiet(repo, 'config', 'core.hooksPath', hooks);
}

/** Files the HEAD commit touched, sorted. */
async function headFiles(repo) {
  return (await git(repo, 'show', '--name-only', '--pretty=format:', 'HEAD'))
    .trim()
    .split('\n')
    .filter(Boolean)
    .sort();
}

const AGENTS_FIXTURE = '# Project\n\nIntro.\n\n## Workflow\n\nOld workflow text.\n\n## Local notes\n\nKeep me.\n';

describe('parseArgs / pure helpers', () => {
  const DEFAULT_ARGS = {
    apply: false,
    root: null,
    target: null,
    only: [],
    branch: null,
    acceptMigrations: [],
    attendedLedgers: [],
    trailer: null,
  };

  it('parses --apply and --root', () => {
    assert.deepEqual(parseArgs([]), DEFAULT_ARGS);
    assert.deepEqual(parseArgs(['--apply']), { ...DEFAULT_ARGS, apply: true });
    assert.deepEqual(parseArgs(['--root', '/tmp/ws']), { ...DEFAULT_ARGS, root: '/tmp/ws' });
    assert.deepEqual(parseArgs(['--apply', '--root', '/tmp/ws']), {
      ...DEFAULT_ARGS,
      apply: true,
      root: '/tmp/ws',
    });
  });

  it('parses --target, --branch, and repeatable --only / --accept-migration (CORE-852.3)', () => {
    assert.deepEqual(
      parseArgs([
        '--target', 'v2.0.0',
        '--only', 'a',
        '--accept-migration', 'v1.2.0',
        '--branch', 'main',
        '--only', 'b',
        '--accept-migration', 'v2.0.0',
      ]),
      {
        ...DEFAULT_ARGS,
        target: 'v2.0.0',
        only: ['a', 'b'],
        branch: 'main',
        acceptMigrations: ['v1.2.0', 'v2.0.0'],
      },
    );
  });

  it('rejects non-semver --target / --accept-migration and valueless selection flags (CORE-852.3)', () => {
    for (const flag of ['--target', '--accept-migration']) {
      assert.throws(() => parseArgs([flag, 'latest'], { exitOnError: false }), /semver release tag/);
      assert.throws(() => parseArgs([flag], { exitOnError: false }), new RegExp(`${flag} requires a value`));
    }
    for (const flag of ['--only', '--branch', '--trailer']) {
      assert.throws(() => parseArgs([flag], { exitOnError: false }), new RegExp(`${flag} requires a value`));
      assert.throws(() => parseArgs([flag, '--apply'], { exitOnError: false }), /requires a value/);
      assert.throws(() => parseArgs([flag, ''], { exitOnError: false }), /non-empty value/);
    }
  });

  it('parses one --trailer line (CORE-852.4)', () => {
    assert.deepEqual(parseArgs(['--trailer', 'Wave: NAT-494', '--apply']), {
      ...DEFAULT_ARGS,
      apply: true,
      trailer: 'Wave: NAT-494',
    });
  });

  it('collects repeatable --attended-ledger paths in order (CORE-852.2)', () => {
    assert.deepEqual(
      parseArgs(['--attended-ledger', 'a/ledger.json', '--apply', '--attended-ledger', 'b.json'])
        .attendedLedgers,
      ['a/ledger.json', 'b.json'],
    );
  });

  it('rejects --attended-ledger values that are empty, absolute, or escape the adopter root (CORE-852.2)', () => {
    for (const bad of ['', '/abs/ledger.json', '../ledger.json', 'a/../../x', '.']) {
      assert.throws(
        () => parseArgs(['--attended-ledger', bad], { exitOnError: false }),
        /inside each adopter root/,
        `expected a usage error for ${JSON.stringify(bad)}`,
      );
    }
  });

  it('rejects --attended-ledger without a value or with a -- value (CORE-852.2)', () => {
    assert.throws(
      () => parseArgs(['--attended-ledger'], { exitOnError: false }),
      /--attended-ledger requires a value/,
    );
    assert.throws(
      () => parseArgs(['--attended-ledger', '--apply'], { exitOnError: false }),
      /--attended-ledger requires a value/,
    );
  });

  it('throws on unknown arg when exitOnError is false', () => {
    assert.throws(() => parseArgs(['--nope'], { exitOnError: false }), /Unknown arg/);
  });

  it('throws when --root is missing its value (CORE-419.4)', () => {
    assert.throws(
      () => parseArgs(['--apply', '--root'], { exitOnError: false }),
      /--root requires a value/,
    );
  });

  it('throws when --root\'s value starts with -- (CORE-419.4)', () => {
    assert.throws(
      () => parseArgs(['--root', '--apply'], { exitOnError: false }),
      /--root requires a value/,
    );
  });

  it('parseSemverTag / compareSemver', () => {
    assert.deepEqual(parseSemverTag('v5.12.0'), [5, 12, 0]);
    assert.equal(parseSemverTag('nope'), null);
    assert.ok(compareSemver([5, 12, 0], [5, 11, 0]) > 0);
    assert.equal(compareSemver([1, 0, 0], [1, 0, 0]), 0);
  });

  it('pinnedVersion reads Version line', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'ft-upd-spec-'));
    const path = join(dir, 'SPEC.md');
    await writeFile(path, '# X\n\n**Version:** 5.12.0\n');
    assert.equal(await pinnedVersion(path), 'v5.12.0');
    await writeFile(path, '**Version:** v1.2.3\n');
    assert.equal(await pinnedVersion(path), 'v1.2.3');
    assert.equal(await pinnedVersion(join(dir, 'missing.md')), null);
    await rmTree(dir);
  });

  it('verifyPinnedSha passes through on match, throws on mismatch (CORE-366)', () => {
    assert.doesNotThrow(() => verifyPinnedSha('abc123', 'abc123', 'v5.12.0'));
    assert.throws(
      () => verifyPinnedSha('abc123def456', 'deadbeef0000', 'v5.12.0'),
      /checked-out submodule SHA abc123def456 does not match canonical v5\.12\.0 SHA deadbeef0000/,
    );
  });
});

describe('Version regex parity (CORE-366)', () => {
  it('pins the same **Version:** regex source in update-adopters.mjs and viz/src/workspace.ts', async () => {
    const REGEX_SOURCE = String.raw`/^\*\*Version:\*\*\s*(v?\d+\.\d+\.\d+)/m`;
    const toolSource = await readFile(SCRIPT, 'utf8');
    const vizSource = await readFile(WORKSPACE_TS, 'utf8');
    assert.ok(
      toolSource.includes(REGEX_SOURCE),
      'tools/update-adopters.mjs no longer contains the pinned Version regex',
    );
    assert.ok(
      vizSource.includes(REGEX_SOURCE),
      'viz/src/workspace.ts no longer contains the pinned Version regex',
    );
  });
});

describe('migrationBearingTags (real tags)', () => {
  it('classifies v5.0.0 as migration-bearing (BREAKING)', async () => {
    const bearing = await migrationBearingTags(['v5.0.0']);
    assert.deepEqual(bearing, ['v5.0.0']);
  });

  it('classifies all-clear Migration blocks as non-bearing', async () => {
    const bearing = await migrationBearingTags(['v5.10.1', 'v5.11.0']);
    assert.deepEqual(bearing, []);
  });

  // Lightweight tags carry empty %(contents); fail-closed (CORE-424.3).
  it('classifies empty annotation (lightweight tag) as migration-bearing', async () => {
    const tag = `v0.0.0-core-424-3-empty-${process.pid}`;
    try {
      await git(FLAITRON_REPO, 'tag', tag); // lightweight — no -a/-m
      const bearing = await migrationBearingTags([tag]);
      assert.deepEqual(bearing, [tag]);
    } finally {
      try {
        await git(FLAITRON_REPO, 'tag', '-d', tag);
      } catch {
        // already gone
      }
    }
  });

  it('migrationAsk separates asks / all-clear (CORE-852.3)', async () => {
    assert.equal(await migrationAsk('v5.0.0'), 'asks');
    assert.equal(await migrationAsk('v5.10.1'), null);
  });

  // Mirrors wave-bump.test.sh's `rejects` cases; the semver lightweight tag
  // sits below every real release, so no range or latest-tag lookup sees it.
  it('acceptMigrationError names why a tag cannot be waived, null when it can (CORE-852.3)', async () => {
    assert.equal(await acceptMigrationError('v5.0.0', latest), null);
    assert.equal(await acceptMigrationError('v0.0.1', latest), 'unknown tag');
    assert.equal(await acceptMigrationError(latest, previous), `after target ${previous}`);
    assert.equal(await acceptMigrationError('v5.10.1', latest), 'no Migration block to waive');
    const tag = 'v0.0.2';
    try {
      await git(FLAITRON_REPO, 'tag', tag); // lightweight — no -a/-m
      assert.equal(await migrationAsk(tag), 'unreadable');
      assert.equal(await acceptMigrationError(tag, latest), 'release notes unreadable');
    } finally {
      try {
        await git(FLAITRON_REPO, 'tag', '-d', tag);
      } catch {
        // already gone
      }
    }
  });

  // A branch spelled like a release resolves under rev-parse but is no tag —
  // tagsInRange would never list it, so its Migration block would go unread.
  it('isReleaseTag accepts tags only, not a branch spelled like one (CORE-852.3)', async () => {
    assert.equal(await isReleaseTag(latest), true);
    assert.equal(await isReleaseTag('v0.0.1'), false);
    const branch = 'v0.0.3';
    try {
      await git(FLAITRON_REPO, 'branch', branch, latest);
      assert.equal(await isReleaseTag(branch), false);
      assert.equal(await acceptMigrationError(branch, latest), 'unknown tag');
    } finally {
      try {
        await git(FLAITRON_REPO, 'branch', '-D', branch);
      } catch {
        // already gone
      }
    }
  });
});

describe('latestReleaseTag (real tags)', () => {
  // The fixture pair above deliberately skips migration-bearing releases, so
  // it no longer exercises this export incidentally (TEST-003).
  it('returns the newest semver tag in the checkout', async () => {
    const newest = await latestReleaseTag();
    const tags = (await git(FLAITRON_REPO, 'tag', '--sort=-v:refname'))
      .split('\n')
      .map((l) => l.trim())
      .filter((t) => parseSemverTag(t));
    assert.equal(newest, tags[0]);
  });
});

// `{ concurrency: GROUP_CONCURRENCY }` groups (CORE-716.3): every test builds
// its own uniquely named fixture and only reads the shared mirror, so tests
// within the group overlap their git subprocesses — capped at the core count so
// a small CI runner is not flooded. Groups that mutate process-wide state (the
// PATH shim in CORE-585, the lightweight tag in FLAITRON_REPO) stay serial.
const GROUP_CONCURRENCY = availableParallelism();

describe('checkAdopter classification (fixtures)', { concurrency: GROUP_CONCURRENCY }, () => {
  let root;

  before(async () => {
    root = await mkdtemp(join(tmpdir(), 'ft-upd-ws-'));
  });

  after(async () => {
    await rmTree(root);
  });

  it('current: committed gitlink == latest', async () => {
    const adopter = await makeAdopter(root, 'current-repo', latest);
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'current');
    assert.equal(result.current, latest);
  });

  it('drift: worktree SPEC at latest, committed pin older', async () => {
    const adopter = await makeAdopter(root, 'drift-repo', previous);
    // Advance worktree without committing the superproject pin.
    await gitQuiet(adopter.sub, 'checkout', '-q', latest);
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'drift');
    assert.equal(result.current, latest);
    assert.match(result.reason, /gitlink|commit the pin|\/ft-update/i);
    // describePin should name the previous tag when possible
    assert.match(result.reason, new RegExp(previous.replace(/\./g, '\\.')));
  });

  it('drift: committed gitlink already at latest, worktree behind (CORE-459.3)', async () => {
    const adopter = await makeAdopter(root, 'reverse-drift-repo', latest);
    // Move the worktree back without touching the superproject's committed pin.
    await gitQuiet(adopter.sub, 'checkout', '-q', previous);
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'drift');
    assert.equal(result.current, previous);
    assert.match(result.reason, /submodule update|\/ft-update/i);
    assert.match(result.reason, /nothing to commit/i);
  });

  it('skip: committed gitlink unresolvable — never reported current (CORE-490.2)', async () => {
    const adopter = await makeAdopter(root, 'unresolved-gitlink-repo', latest);
    // Injected failure: the submodule (what pinnedVersion reads off disk) stays
    // intact, but the superproject's own git dir is gone, so `rev-parse
    // HEAD:.flaitron/core` fails. This lands in the `current === latest` branch,
    // which used to early-return `current` off that failure.
    await rmTree(join(adopter.repo, '.git'));
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'skip');
    assert.equal(result.current, latest);
    assert.match(result.reason, /could not resolve the committed gitlink/i);
    assert.match(result.reason, /pin left unverified/i);
  });

  it('skip: staged changes in adopter index', async () => {
    const adopter = await makeAdopter(root, 'staged-repo', previous);
    await writeFile(join(adopter.repo, 'extra.txt'), 'staged\n');
    await gitQuiet(adopter.repo, 'add', 'extra.txt');
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'skip');
    assert.match(result.reason, /staged changes/i);
  });

  it('skip: modified tracked file outside the submodule (CORE-852.4)', async () => {
    const adopter = await makeAdopter(root, 'dirty-tracked-repo', previous);
    await commitFollowThroughFiles(adopter.repo, { agents: AGENTS_FIXTURE });
    await writeFile(join(adopter.repo, 'AGENTS.md'), `${AGENTS_FIXTURE}operator edit\n`);
    // Untracked files never count: the follow-through neither touches nor commits them.
    await writeFile(join(adopter.repo, 'scratch.txt'), 'untracked\n');
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'skip');
    assert.equal(result.reason, 'dirty tracked files (AGENTS.md) — commit or stash first');
  });

  it('skip: dirty .flaitron/core worktree', async () => {
    const adopter = await makeAdopter(root, 'dirty-repo', previous);
    await writeFile(join(adopter.sub, 'DIRTY.md'), 'dirt\n');
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'skip');
    assert.match(result.reason, /dirty .*worktree/i);
  });

  it('skip: detached HEAD in adopter repo (CORE-459.2)', async () => {
    const adopter = await makeAdopter(root, 'detached-repo', previous);
    await gitQuiet(adopter.repo, 'checkout', '-q', '--detach', 'HEAD');
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'skip');
    assert.equal(result.current, previous);
    assert.match(result.reason, /detached HEAD/i);
  });

  it('skip: migration-bearing range (pre-v5 pin)', async () => {
    // v4.0.0..latest includes v5.0.0 BREAKING → must not auto-bump.
    const adopter = await makeAdopter(root, 'migrate-repo', 'v4.0.0');
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'skip');
    assert.match(result.reason, /migration-bearing/i);
    assert.match(result.reason, /v5\.0\.0/);
  });

  it('skip: pin newer than latest must not downgrade (CORE-419.2)', async () => {
    // Pin at `latest` but ask the tool to reconcile against the OLDER
    // `previous` — the shape a stale tag list produces. Uses the self-healing
    // fixture pair rather than hardcoding a tag or assuming one exists above it.
    const adopter = await makeAdopter(root, 'ahead-repo', latest);
    const result = await checkAdopter(adopter, previous);
    assert.equal(result.status, 'skip');
    assert.equal(result.current, latest);
    assert.match(result.reason, /pinned ahead/i);
    assert.match(result.reason, /downgrade/i);
    assert.match(result.reason, new RegExp(previous.replace(/\./g, '\\.')));
  });

  it('bump: non-migration range from previous → latest', async () => {
    const adopter = await makeAdopter(root, 'bump-repo', previous);
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'bump');
    assert.equal(result.current, previous);
    assert.equal(result.forkNote, '');
  });

  it('skip: tracked --attended-ledger path, with a suggested owner task (CORE-852.2)', async () => {
    const adopter = await makeAdopter(root, 'ledger-repo', previous);
    await mkdir(join(adopter.repo, 'evidence'), { recursive: true });
    await writeFile(join(adopter.repo, 'evidence', 'ledger.json'), '{}\n');
    await gitQuiet(adopter.repo, 'add', 'evidence/ledger.json');
    await gitQuiet(adopter.repo, 'commit', '-q', '-m', 'ledger');
    const result = await checkAdopter(adopter, latest, {
      attendedLedgers: ['other.json', 'evidence/ledger.json'],
    });
    assert.equal(result.status, 'skip');
    assert.equal(result.current, previous);
    assert.match(result.reason, /attended ledger tracked \(evidence\/ledger\.json\)/);
    assert.match(result.suggestion, /suggested owner task/);
    assert.ok(result.suggestion.includes(`${previous} → ${latest}`));
    assert.match(result.suggestion, /evidence\/ledger\.json/);
  });

  it('bump: an untracked file at an --attended-ledger path does not trip the gate (CORE-852.2)', async () => {
    const adopter = await makeAdopter(root, 'untracked-ledger-repo', previous);
    await writeFile(join(adopter.repo, 'ledger.json'), '{}\n');
    const result = await checkAdopter(adopter, latest, { attendedLedgers: ['ledger.json'] });
    assert.equal(result.status, 'bump');
  });

  it('bump: directory, glob, and pathspec-magic values match no ledger file literally (CORE-852.2)', async () => {
    const adopter = await makeAdopter(root, 'literal-ledger-repo', previous);
    await mkdir(join(adopter.repo, 'evidence'), { recursive: true });
    await writeFile(join(adopter.repo, 'evidence', 'ledger.json'), '{}\n');
    await gitQuiet(adopter.repo, 'add', 'evidence/ledger.json');
    await gitQuiet(adopter.repo, 'commit', '-q', '-m', 'ledger');
    const result = await checkAdopter(adopter, latest, {
      attendedLedgers: ['evidence', 'evidence/', '*.json', 'evidence/*.json', ':(glob)**/ledger.json'],
    });
    assert.equal(result.status, 'bump');
  });

  it('skip: a staged-only ledger is not "tracked" — the staged-changes gate reports it (CORE-852.2)', async () => {
    const adopter = await makeAdopter(root, 'staged-ledger-repo', previous);
    await writeFile(join(adopter.repo, 'ledger.json'), '{}\n');
    await gitQuiet(adopter.repo, 'add', 'ledger.json');
    const result = await checkAdopter(adopter, latest, { attendedLedgers: ['ledger.json'] });
    assert.equal(result.status, 'skip');
    assert.match(result.reason, /staged changes/i);
  });

  it('current: a tracked --attended-ledger path does not affect an up-to-date adopter (CORE-852.2)', async () => {
    const adopter = await makeAdopter(root, 'current-ledger-repo', latest);
    await writeFile(join(adopter.repo, 'ledger.json'), '{}\n');
    await gitQuiet(adopter.repo, 'add', 'ledger.json');
    await gitQuiet(adopter.repo, 'commit', '-q', '-m', 'ledger');
    const result = await checkAdopter(adopter, latest, { attendedLedgers: ['ledger.json'] });
    assert.equal(result.status, 'current');
  });

  // wave-bump.test.sh `offmain`: policy is a flag, so the branch is the caller's.
  it('skip: --branch names a branch the adopter is not on (CORE-852.3)', async () => {
    const adopter = await makeAdopter(root, 'offbranch-repo', previous);
    const onBranch = (await git(adopter.repo, 'symbolic-ref', '--short', 'HEAD')).trim();
    await gitQuiet(adopter.repo, 'checkout', '-q', '-b', 'feature');
    const result = await checkAdopter(adopter, latest, { branch: onBranch });
    assert.equal(result.status, 'skip');
    assert.equal(result.current, previous);
    assert.equal(result.reason, `on branch feature, not ${onBranch}`);
    assert.equal((await checkAdopter(adopter, latest, { branch: 'feature' })).status, 'bump');
    assert.equal((await checkAdopter(adopter, latest)).status, 'bump');
    // A same-named tag makes `symbolic-ref --short` say `heads/feature`.
    await gitQuiet(adopter.repo, 'tag', 'feature');
    assert.equal((await checkAdopter(adopter, latest, { branch: 'feature' })).status, 'bump');
  });

  // wave-bump.test.sh `accept migration`: the waiver covers only the named tags.
  it('bump only when --accept-migration names every bearing tag in range (CORE-852.3)', async () => {
    const adopter = await makeAdopter(root, 'accepted-repo', 'v4.0.0');
    const bearing = await migrationBearingTags(await tagsInRange('v4.0.0', latest));
    assert.ok(bearing.includes('v5.0.0'));
    const partial = await checkAdopter(adopter, latest, { acceptedMigrations: bearing.slice(1) });
    assert.equal(partial.status, 'skip');
    assert.match(partial.reason, new RegExp(`in range: ${bearing[0].replace(/\./g, '\\.')} — `));
    const full = await checkAdopter(adopter, latest, { acceptedMigrations: bearing });
    assert.equal(full.status, 'bump');
  });

  // wave-bump.test.sh "migration waiver cannot bypass semantic review".
  it('skip: --accept-migration never waives a tracked --attended-ledger (CORE-852.3)', async () => {
    const adopter = await makeAdopter(root, 'accepted-ledger-repo', 'v4.0.0');
    await writeFile(join(adopter.repo, 'ledger.json'), '{}\n');
    await gitQuiet(adopter.repo, 'add', 'ledger.json');
    await gitQuiet(adopter.repo, 'commit', '-q', '-m', 'ledger');
    const bearing = await migrationBearingTags(await tagsInRange('v4.0.0', latest));
    const result = await checkAdopter(adopter, latest, {
      attendedLedgers: ['ledger.json'],
      acceptedMigrations: bearing,
    });
    assert.equal(result.status, 'skip');
    assert.match(result.reason, /attended ledger tracked/);
  });

  it('skip: declared submodule not initialised names its path (CORE-852.3)', async () => {
    // Own root: discovery scans the whole directory, and the group's shared
    // root has sibling fixtures mid-construction.
    const own = await mkdtemp(join(tmpdir(), 'ft-upd-uninit-'));
    const adopter = await makeAdopter(own, 'uninit-repo', previous);
    await declareSubmodule(adopter.repo, SUBMODULE_PATH);
    await deinitSubmodule(adopter);
    const [found] = await discoverAdopters(own);
    assert.equal(found.uninitialised, true);
    const result = await checkAdopter(found, latest);
    assert.deepEqual(result, { status: 'skip', reason: `submodule not initialised (${SUBMODULE_PATH})` });
    await rmTree(own);
  });

  it('bump / drift on a non-canonical submodule path read from .gitmodules (CORE-852.3)', async () => {
    const adopter = await makeAdopter(root, 'vendored-repo', previous, 'vendor/flaitron');
    await declareSubmodule(adopter.repo, 'vendor/flaitron');
    assert.equal((await checkAdopter(adopter, latest)).status, 'bump');
    await gitQuiet(adopter.sub, 'checkout', '-q', latest);
    const drift = await checkAdopter(adopter, latest);
    assert.equal(drift.status, 'drift');
    assert.match(drift.reason, /git add vendor\/flaitron/);
  });

  it('skip: pinned tag not found locally (missing-pinned-tag, CORE-459.4)', async () => {
    const adopter = await makeAdopter(root, 'missing-tag-repo', previous);
    // v0.0.1 parses as valid semver but sits below v0.1.0, the repo's oldest
    // real tag — guaranteed not to resolve, while still passing the
    // pinned-ahead guard (it isn't ahead of `latest`).
    await writeFile(join(adopter.sub, 'SPEC.md'), '# X\n\n**Version:** v0.0.1\n');
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'skip');
    assert.equal(result.current, 'v0.0.1');
    assert.match(result.reason, /v0\.0\.1/);
    assert.match(result.reason, /not found/i);
  });

  it('skip: unreadable SPEC version', async () => {
    const adopter = await makeAdopter(root, 'bad-spec-repo', latest);
    await writeFile(join(adopter.sub, 'SPEC.md'), '# no version line\n');
    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'skip');
    assert.match(result.reason, /unreadable/i);
  });

  it('rethrows (does not mask as staged changes) when the staged-diff check fails for a non-1 reason (CORE-366)', async () => {
    const adopter = await makeAdopter(root, 'corrupt-repo', previous);
    // Corrupt the adopter's own .git (not the submodule's) so `git diff
    // --cached --quiet` fails outside the exit-1 "there are staged changes"
    // case (git falls back to --no-index usage-error mode, exit 129).
    await rmTree(join(adopter.repo, '.git'));
    await assert.rejects(() => checkAdopter(adopter, latest), (e) => {
      assert.notEqual(e.code, 1);
      return true;
    });
  });
});

describe('discoverAdopters', () => {
  it('finds .flaitron/core adopters and nothing else', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-disc-'));
    const adopter = await makeAdopter(root, 'alpha', latest);
    await mkdir(join(root, 'plain-proj'), { recursive: true });
    // The retired pre-rename layout is not an adopter any more (CORE-827).
    await mkdir(join(root, 'pre-rename', '.flowtron', 'core'), { recursive: true });
    await writeFile(join(root, 'pre-rename', '.flowtron', 'core', 'SPEC.md'), '**Version:** v5.0.0\n');
    const adopters = await discoverAdopters(root);
    assert.deepEqual(adopters, [{ name: 'alpha', repo: adopter.repo, subPath: SUBMODULE_PATH }]);
    await rmTree(root);
  });

  // CORE-852.3 — wave-bump's submodule_path: the url naming flaitron decides,
  // whatever the path; an undeclared, unchecked-out repo stays invisible.
  it('resolves the submodule path from .gitmodules and flags a declared, uninitialised one', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-disc-gm-'));
    const vendored = await makeAdopter(root, 'vendored', latest, 'vendor/flaitron');
    await declareSubmodule(vendored.repo, 'vendor/flaitron');
    const uninit = await makeAdopter(root, 'uninit', latest);
    await declareSubmodule(uninit.repo, SUBMODULE_PATH);
    await deinitSubmodule(uninit);
    const undeclared = await makeAdopter(root, 'undeclared', latest);
    await deinitSubmodule(undeclared);
    assert.deepEqual(await discoverAdopters(root), [
      { name: 'uninit', repo: uninit.repo, subPath: SUBMODULE_PATH, uninitialised: true },
      { name: 'vendored', repo: vendored.repo, subPath: 'vendor/flaitron' },
    ]);
    await rmTree(root);
  });

  // CORE-852.3 review notes: a stale or second flaitron entry never hides a
  // working .flaitron/core; the url match is on the last segment, any case; a
  // trailing slash on the declared path is dropped.
  it('prefers a checked-out candidate, matches the url segment case-insensitively, strips a trailing slash', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-disc-gm2-'));
    const write = async (repo, body) => {
      await writeFile(join(repo, '.gitmodules'), body);
      await gitQuiet(repo, 'add', '.gitmodules');
      await gitQuiet(repo, 'commit', '-q', '-m', 'gitmodules');
    };
    const stale = await makeAdopter(root, 'stale', latest);
    await write(stale.repo, '[submodule "old"]\n\tpath = old/flaitron\n\turl = ../flaitron\n');
    const cased = await makeAdopter(root, 'cased', latest, 'vendor/ft');
    await write(
      cased.repo,
      '[submodule "assets"]\n\tpath = vendor/assets\n\turl = https://example.invalid/flaitron-brand-assets.git\n' +
        '[submodule "ft"]\n\tpath = vendor/ft/\n\turl = git@example.invalid:Org/Flaitron.git\n',
    );
    const lookalike = await makeAdopter(root, 'lookalike', latest);
    await write(lookalike.repo, '[submodule "assets"]\n\tpath = vendor/assets\n\turl = https://example.invalid/flaitron-assets.git\n');
    await deinitSubmodule(lookalike);
    assert.deepEqual(await discoverAdopters(root), [
      { name: 'cased', repo: cased.repo, subPath: 'vendor/ft' },
      { name: 'stale', repo: stale.repo, subPath: SUBMODULE_PATH },
    ]);
    await rmTree(root);
  });

  // CORE-540 — an unreadable root must surface as a failure, not a silent
  // "no adopters" result: readdir rejects and the caller (main) is the one
  // that turns that into an exit-1 guard, so this asserts the propagation.
  it('rejects when root does not exist', async () => {
    const root = join(tmpdir(), 'ft-upd-disc-missing-does-not-exist');
    await assert.rejects(() => discoverAdopters(root), /ENOENT/);
  });

  // CORE-592 — a bare `resolve(repo) === FLAITRON_REPO` string compare never
  // matches when the two sides reach the same real directory via differently
  // spelled paths (e.g. a workspace root that differs from the invocation
  // path only by case, on a case-insensitive volume). A symlink alias is the
  // portable stand-in: same defect shape, deterministic on every filesystem.
  it('realOrResolve resolves a symlink alias to the same real path as its target', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-realpath-'));
    const alias = join(root, 'flaitron-alias');
    await symlink(FLAITRON_REPO, alias, 'dir');
    const [aliasReal, repoReal] = await Promise.all([
      realOrResolve(alias),
      realOrResolve(FLAITRON_REPO),
    ]);
    assert.equal(aliasReal, repoReal);
    // The comparison the old code used would have missed this alias.
    assert.notEqual(resolve(alias), FLAITRON_REPO);
    await rmTree(root);
  });
});

describe('gitlinkDrift / describePin', () => {
  it('returns null when pin matches latest', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-gl-'));
    const adopter = await makeAdopter(root, 'ok', latest);
    assert.equal(await gitlinkDrift(adopter.repo, latest), null);
    await rmTree(root);
  });

  it('returns the unresolved sentinel — not null — when the gitlink lookup fails (CORE-490.2)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-gl-unres-'));
    const adopter = await makeAdopter(root, 'broken', latest);
    await rmTree(join(adopter.repo, '.git'));
    const drift = await gitlinkDrift(adopter.repo, latest);
    assert.notEqual(drift, null, 'a failed lookup must not read as "no drift"');
    assert.equal(drift.unresolved, true);
    assert.match(drift.error, /could not resolve the committed gitlink/i);
    await rmTree(root);
  });

  it('describePin resolves a tagged SHA', async () => {
    const sha = (await git(FLAITRON_REPO, 'rev-parse', `${latest}^{commit}`)).trim();
    assert.equal(await describePin(sha), latest);
  });
});

describe('FLAITRON_UPDATE_LATEST seam validation (CORE-432.4)', () => {
  it('exits 2 naming the env var when set to empty', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-env-empty-'));
    const { code, stderr } = await runCli(['--root', root], {
      expectFail: true,
      env: { FLAITRON_UPDATE_LATEST: '' },
    });
    assert.equal(code, 2);
    assert.match(stderr, /FLAITRON_UPDATE_LATEST/);
    assert.match(stderr, /invalid/);
    await rmTree(root);
  });

  it('exits 2 naming the env var when set to non-semver', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-env-bad-'));
    const { code, stderr } = await runCli(['--root', root], {
      expectFail: true,
      env: { FLAITRON_UPDATE_LATEST: 'not-a-tag' },
    });
    assert.equal(code, 2);
    assert.match(stderr, /FLAITRON_UPDATE_LATEST/);
    assert.match(stderr, /not-a-tag/);
    await rmTree(root);
  });
});

describe('dry-run CLI (--root fixture)', { concurrency: GROUP_CONCURRENCY }, () => {
  it('reports current / drift / would-bump / skipped in one workspace', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-cli-'));
    await makeAdopter(root, 'cli-current', latest);

    const drifted = await makeAdopter(root, 'cli-drift', previous);
    await gitQuiet(drifted.sub, 'checkout', '-q', latest);

    await makeAdopter(root, 'cli-behind', previous);

    const staged = await makeAdopter(root, 'cli-staged', previous);
    await writeFile(join(staged.repo, 'x.txt'), 'x\n');
    await gitQuiet(staged.repo, 'add', 'x.txt');

    const { stdout } = await runCli(['--root', root], {
      env: { FLAITRON_UPDATE_LATEST: latest },
    });
    assert.match(stdout, /DRY-RUN/);
    assert.match(stdout, /✓ cli-current: current/);
    assert.match(stdout, /⚠ cli-drift .*gitlink drift/);
    assert.match(stdout, /⬆ cli-behind: would bump/);
    assert.match(stdout, /⏭ cli-staged .*skipped — staged changes/);
    assert.match(stdout, /Summary:.*1 current · 1 drift · would bump 1 · 1 skipped/);
    await rmTree(root);
  });

  it('--attended-ledger prints the skip row and its suggested owner task (CORE-852.2)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-ledger-'));
    const ledgered = await makeAdopter(root, 'cli-ledger', previous);
    await writeFile(join(ledgered.repo, 'ledger.json'), '{}\n');
    await gitQuiet(ledgered.repo, 'add', 'ledger.json');
    await gitQuiet(ledgered.repo, 'commit', '-q', '-m', 'ledger');
    await makeAdopter(root, 'cli-plain', previous);

    const { stdout } = await runCli(['--root', root, '--attended-ledger', 'ledger.json'], {
      env: { FLAITRON_UPDATE_LATEST: latest },
    });
    assert.match(stdout, /⏭ cli-ledger .*skipped — attended ledger tracked \(ledger\.json\)/);
    assert.match(stdout, /\n {6}↳ suggested owner task: bump flaitron .* and refresh ledger\.json/);
    assert.match(stdout, /⬆ cli-plain: would bump/);
    assert.match(stdout, /Summary:.*would bump 1 · 1 skipped · 0 failed/);
    await rmTree(root);
  });

  // wave-bump.test.sh `only`: named repos alone are listed and counted; an
  // unknown name is one skip row however often it repeats.
  it('--only limits the sweep and reports an unmatched name once (CORE-852.3)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-only-'));
    await makeAdopter(root, 'only-a', previous);
    await makeAdopter(root, 'only-b', previous);
    await mkdir(join(root, 'plain'), { recursive: true });

    const { stdout } = await runCli(
      ['--root', root, '--only', 'only-a', '--only', 'nosuch', '--only', 'nosuch', '--only', 'plain'],
      { env: { FLAITRON_UPDATE_LATEST: latest } },
    );
    assert.match(stdout, /⬆ only-a: would bump/);
    assert.doesNotMatch(stdout, /only-b/);
    assert.equal(stdout.match(/⏭ nosuch: skipped — no adopter at this exact name under /g)?.length, 1);
    assert.match(stdout, /⏭ plain: skipped — no adopter at this exact name/);
    assert.match(stdout, /Summary: 0 current · 0 drift · would bump 1 · 2 skipped · 0 failed/);

    // An empty workspace still reports the name rather than "no adopters".
    const empty = await mkdtemp(join(tmpdir(), 'ft-upd-only-empty-'));
    const { stdout: emptyOut } = await runCli(['--root', empty, '--only', 'gone'], {
      env: { FLAITRON_UPDATE_LATEST: latest },
    });
    assert.match(emptyOut, /⏭ gone: skipped — no adopter at this exact name/);
    assert.doesNotMatch(emptyOut, /No \.flaitron\/core adopters found/);
    await rmTree(empty);
    await rmTree(root);
  });

  it('--target bumps to the named tag over FLAITRON_UPDATE_LATEST (CORE-852.3)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-target-'));
    await makeAdopter(root, 'tgt-behind', previous);
    const { stdout } = await runCli(['--root', root, '--target', latest], {
      env: { FLAITRON_UPDATE_LATEST: previous },
    });
    assert.match(stdout, new RegExp(`target release: ${latest.replace(/\./g, '\\.')}`));
    assert.match(stdout, new RegExp(`⬆ tgt-behind: would bump ${previous.replace(/\./g, '\\.')} → ${latest.replace(/\./g, '\\.')}`));
    await rmTree(root);
  });

  it('rejects an unknown --target or an unwaivable --accept-migration before reading any repo (CORE-852.3)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-reject-'));
    await makeAdopter(root, 'untouched', previous);
    const cases = [
      [['--target', 'v0.0.1'], /Unknown --target tag .*v0\.0\.1/],
      [['--accept-migration', 'v0.0.1'], /Cannot --accept-migration v0\.0\.1: unknown tag/],
      [['--target', previous, '--accept-migration', latest], /Cannot --accept-migration .*: after target/],
      [['--accept-migration', 'v5.10.1'], /Cannot --accept-migration v5\.10\.1: no Migration block to waive/],
    ];
    for (const [extra, expected] of cases) {
      const { code, stdout, stderr } = await runCli(['--root', root, ...extra], {
        expectFail: true,
        env: { FLAITRON_UPDATE_LATEST: latest },
      });
      assert.equal(code, 2, `exit 2 for ${extra.join(' ')}`);
      assert.match(stderr, expected);
      assert.doesNotMatch(stdout, /workspace:|untouched/, 'no adopter read before the reject');
    }
    await rmTree(root);
  });

  it('accepted migrations are named in the header (CORE-852.3)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-accept-hdr-'));
    await makeAdopter(root, 'hdr', previous);
    const { stdout } = await runCli(['--root', root, '--accept-migration', 'v5.0.0'], {
      env: { FLAITRON_UPDATE_LATEST: latest },
    });
    assert.match(stdout, /migration accepted \(reviewed\): v5\.0\.0/);
    await rmTree(root);
  });

  // wave-bump.test.sh `uninit`: never a silent drop.
  it('a declared, uninitialised submodule prints a skip row (CORE-852.3)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-uninit-cli-'));
    const uninit = await makeAdopter(root, 'cli-uninit', previous);
    await declareSubmodule(uninit.repo, SUBMODULE_PATH);
    await deinitSubmodule(uninit);
    const { stdout } = await runCli(['--root', root], { env: { FLAITRON_UPDATE_LATEST: latest } });
    assert.match(stdout, /⏭ cli-uninit: skipped — submodule not initialised \(\.flaitron\/core\)/);
    assert.match(stdout, /1 skipped · 0 failed/);
    await rmTree(root);
  });

  it('empty workspace prints no-adopters message', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-empty-'));
    const { stdout } = await runCli(['--root', root]);
    assert.match(stdout, /No \.flaitron\/core adopters found/);
    await rmTree(root);
  });

  // CORE-540 — a nonexistent/unreadable --root must fail loudly (exit 1), not
  // report "no adopters" and exit 0 as if the workspace were merely empty.
  it('nonexistent --root exits 1 instead of reporting no adopters', async () => {
    const root = join(tmpdir(), 'ft-upd-cli-missing-does-not-exist');
    const { code, stdout, stderr } = await runCli(['--root', root], {
      expectFail: true,
      env: { FLAITRON_UPDATE_LATEST: latest },
    });
    assert.equal(code, 1);
    assert.match(stderr, /not a readable directory/);
    assert.doesNotMatch(stdout, /No \.flaitron\/core adopters found/);
  });
});

describe('follow-through text helpers (CORE-852.4)', () => {
  it('rewritePinLines moves every Pinned to: line, first match per line', () => {
    assert.equal(
      rewritePinLines('a\nPinned to: v1.2.3 (core)\nb Pinned to: v0.1.0, Pinned to: v0.1.0\nPinned to: latest\n', 'v9.0.0'),
      'a\nPinned to: v9.0.0 (core)\nb Pinned to: v9.0.0, Pinned to: v0.1.0\nPinned to: latest\n',
    );
  });

  it('workflowPasteBlock returns the fenced ## Workflow block, else null', () => {
    const snippet = '# S\n\n## Block to paste into AGENTS.md\n\n<!-- c -->\n\n```markdown\n## Workflow\n\nBody.\n```\n\n## Other\n';
    assert.equal(workflowPasteBlock(snippet), '## Workflow\n\nBody.');
    assert.equal(workflowPasteBlock(snippet.replace('## Block to paste', '## Block to copy')), null);
    assert.equal(workflowPasteBlock(snippet.replace('```markdown\n## Workflow', '```markdown\n## Flow')), null);
    assert.equal(workflowPasteBlock('## Block to paste into AGENTS.md\n```markdown\n## Workflow\n'), null);
  });

  it('replaceWorkflowSection swaps the section, keeping one blank line before the next heading', () => {
    assert.equal(
      replaceWorkflowSection(AGENTS_FIXTURE, '## Workflow\n\nNew.'),
      '# Project\n\nIntro.\n\n## Workflow\n\nNew.\n\n## Local notes\n\nKeep me.\n',
    );
    // Last section: replaced through EOF.
    assert.equal(replaceWorkflowSection('# P\n\n## Workflow\n\nOld.\n', '## Workflow\n\nNew.'), '# P\n\n## Workflow\n\nNew.\n');
    // First line of the file.
    assert.equal(replaceWorkflowSection('## Workflow\nOld.\n## Next\n', '## Workflow\nNew.'), '## Workflow\nNew.\n\n## Next\n');
    // An H1 ends the section too: the appendix survives.
    assert.equal(
      replaceWorkflowSection('## Workflow\nOld.\n# Appendix\n## Notes\n', '## Workflow\nNew.'),
      '## Workflow\nNew.\n\n# Appendix\n## Notes\n',
    );
  });

  it('a project\'s own ## Workflows… heading is not the flaitron section', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-follow-ci-'));
    const adopter = await makeAdopter(root, 'ci-workflows', previous);
    const agents = '# P\n\n## Workflows (CI)\n\nGitHub Actions.\n';
    await commitFollowThroughFiles(adopter.repo, { agents });
    await applyBump({ ...adopter, current: previous }, latest);
    assert.deepEqual(await headFiles(adopter.repo), ['.flaitron/core']);
    assert.equal(await readFile(join(adopter.repo, 'AGENTS.md'), 'utf8'), agents);
    await rmTree(root);
  });
});

describe('sandboxed --apply', { concurrency: GROUP_CONCURRENCY }, () => {
  it('bumps pin + pathspec commit only', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-apply-'));
    const adopter = await makeAdopter(root, 'apply-me', previous);

    // Unrelated unstaged file must not land in the bump commit.
    await writeFile(join(adopter.repo, 'unrelated.txt'), 'keep out\n');

    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'bump');
    await applyBump({ ...adopter, current: result.current }, latest);

    const pin = (await git(adopter.repo, 'rev-parse', `HEAD:${SUBMODULE_PATH}`)).trim();
    const latestSha = (await git(FLAITRON_REPO, 'rev-parse', `${latest}^{commit}`)).trim();
    assert.equal(pin, latestSha);
    assert.equal(await pinnedVersion(join(adopter.sub, 'SPEC.md')), latest);

    const msg = (await git(adopter.repo, 'log', '-1', '--format=%s')).trim();
    assert.match(msg, new RegExp(`bump flaitron ${previous.replace(/\./g, '\\.')} → ${latest.replace(/\./g, '\\.')}`));

    // Pathspec: commit touches only the gitlink.
    const files = (await git(adopter.repo, 'show', '--name-only', '--pretty=format:', 'HEAD'))
      .trim()
      .split('\n')
      .filter(Boolean);
    assert.deepEqual(files, [SUBMODULE_PATH]);

    // CLI apply path also works end-to-end on a second behind adopter.
    await makeAdopter(root, 'apply-cli', previous);
    const { stdout } = await runCli(['--apply', '--root', root], {
      env: { FLAITRON_UPDATE_LATEST: latest },
    });
    assert.match(stdout, /APPLY/);
    // apply-me is already current after applyBump; apply-cli should bump.
    assert.match(stdout, /⬆ apply-cli: bumped/);
    assert.match(stdout, /✓ apply-me: current/);

    await rmTree(root);
  });

  it('bumps and commits a non-canonical submodule path read from .gitmodules (CORE-852.3)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-apply-vendored-'));
    const adopter = await makeAdopter(root, 'vendored', previous, 'vendor/flaitron');
    await declareSubmodule(adopter.repo, 'vendor/flaitron');

    const { stdout } = await runCli(['--apply', '--root', root], {
      env: { FLAITRON_UPDATE_LATEST: latest },
    });
    assert.match(stdout, /⬆ vendored: bumped/);
    const pin = (await git(adopter.repo, 'rev-parse', 'HEAD:vendor/flaitron')).trim();
    const latestSha = (await git(FLAITRON_REPO, 'rev-parse', `${latest}^{commit}`)).trim();
    assert.equal(pin, latestSha);
    const files = (await git(adopter.repo, 'show', '--name-only', '--pretty=format:', 'HEAD')).trim();
    assert.equal(files, 'vendor/flaitron');
    await rmTree(root);
  });

  it('commits the pin line, Workflow block and gitlink together, with --trailer (CORE-852.4)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-follow-'));
    const adopter = await makeAdopter(root, 'follow', previous);
    const readme = `# Tasknotes\n\nPinned to: ${previous}\nOther: Pinned to: v0.0.1\n`;
    await commitFollowThroughFiles(adopter.repo, { readme, agents: AGENTS_FIXTURE });

    const { stdout } = await runCli(['--apply', '--root', root, '--trailer', 'Wave: test'], {
      env: { FLAITRON_UPDATE_LATEST: latest },
    });
    assert.match(stdout, /⬆ follow: bumped .*, committed — pin line, workflow block/);

    assert.deepEqual(await headFiles(adopter.repo), ['.flaitron/core', 'AGENTS.md', README_REL].sort());
    assert.equal(
      await readFile(join(adopter.repo, README_REL), 'utf8'),
      `# Tasknotes\n\nPinned to: ${latest}\nOther: Pinned to: ${latest}\n`,
    );
    const block = workflowPasteBlock(await git(FLAITRON_REPO, 'show', `${latest}:claude/AGENTS-snippet.md`));
    assert.ok(block, `${latest}'s snippet carries a Workflow paste block`);
    assert.equal(
      await readFile(join(adopter.repo, 'AGENTS.md'), 'utf8'),
      `# Project\n\nIntro.\n\n${block}\n\n## Local notes\n\nKeep me.\n`,
    );
    assert.equal(
      (await git(adopter.repo, 'log', '-1', '--format=%B')).trim(),
      `chore: bump flaitron ${previous} → ${latest}\n\nWave: test`,
    );
    assert.equal((await git(adopter.repo, 'status', '--porcelain', '--untracked-files=no')).trim(), '');

    await rmTree(root);
  });

  it('leaves a symlinked AGENTS.md / README and a doubled ## Workflow untouched, noting why (CORE-852.4)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-follow-skip-'));
    const linked = await makeAdopter(root, 'linked', previous);
    await writeFile(join(linked.repo, 'REAL.md'), AGENTS_FIXTURE);
    await writeFile(join(linked.repo, 'NOTES.md'), `Pinned to: ${previous}\n`);
    await mkdir(join(linked.repo, '.flaitron', 'tasknote'), { recursive: true });
    await symlink('REAL.md', join(linked.repo, 'AGENTS.md'));
    await symlink('../../NOTES.md', join(linked.repo, README_REL));
    await gitQuiet(linked.repo, 'add', '--', 'REAL.md', 'NOTES.md', 'AGENTS.md', README_REL);
    await gitQuiet(linked.repo, 'commit', '-q', '-m', 'linked fixtures');

    const doubled = await makeAdopter(root, 'doubled', previous);
    const twice = `${AGENTS_FIXTURE}\n## Workflow\n\nSecond.\n`;
    await commitFollowThroughFiles(doubled.repo, { agents: twice });

    // A symlinked parent directory: the README itself is a regular file.
    const dirLinked = await makeAdopter(root, 'dir-linked', previous);
    await mkdir(join(dirLinked.repo, 'shared'));
    await writeFile(join(dirLinked.repo, 'shared', 'README.md'), `Pinned to: ${previous}\n`);
    await symlink('../shared', join(dirLinked.repo, '.flaitron', 'tasknote'));
    await gitQuiet(dirLinked.repo, 'add', '--', 'shared/README.md', '.flaitron/tasknote');
    await gitQuiet(dirLinked.repo, 'commit', '-q', '-m', 'dir-linked fixtures');

    const { stdout } = await runCli(['--apply', '--root', root], { env: { FLAITRON_UPDATE_LATEST: latest } });
    assert.match(stdout, /⬆ dir-linked: bumped .*, committed — pin line skipped \(README\.md is a symlink\)/);
    assert.equal(await readFile(join(dirLinked.repo, 'shared', 'README.md'), 'utf8'), `Pinned to: ${previous}\n`);
    assert.deepEqual(await headFiles(dirLinked.repo), ['.flaitron/core']);
    assert.match(
      stdout,
      /⬆ linked: bumped .*, committed — pin line skipped \(README\.md is a symlink\), workflow skipped \(AGENTS\.md is a symlink\)/,
    );
    assert.match(stdout, /⬆ doubled: bumped .*, committed — workflow skipped \(more than one ## Workflow heading\)/);

    assert.deepEqual(await headFiles(linked.repo), ['.flaitron/core']);
    assert.equal(await readFile(join(linked.repo, 'REAL.md'), 'utf8'), AGENTS_FIXTURE);
    assert.equal(await readFile(join(linked.repo, 'NOTES.md'), 'utf8'), `Pinned to: ${previous}\n`);
    assert.deepEqual(await headFiles(doubled.repo), ['.flaitron/core']);
    assert.equal(await readFile(join(doubled.repo, 'AGENTS.md'), 'utf8'), twice);

    await rmTree(root);
  });

  // CORE-852.4 supersedes CORE-490.3: hooks now run on the bump commit.
  it('runs the adopter pre-commit hook on the bump commit', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-hookrun-'));
    const adopter = await makeAdopter(root, 'hooked', previous);
    // Reads stdin to EOF first: an open stdin pipe would hang here forever.
    await installHook(adopter.repo, 'pre-commit', 'cat >/dev/null\n: > "$(git rev-parse --git-dir)/pre-commit-ran"');

    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'bump');
    await applyBump({ ...adopter, current: result.current }, latest);

    assert.equal(await pinnedVersion(join(adopter.sub, 'SPEC.md')), latest);
    await lstat(join(adopter.repo, '.git', 'pre-commit-ran'));

    await rmTree(root);
  });

  // CORE-424.4 — mid-fleet apply failure must not abort the sweep or exit 0.
  it('continues past a mid-fleet bump failure, counts 1 failed, exits 1', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-midfail-'));
    // Alphabetical discover order: a-ok → b-fail → c-ok so failure is mid-fleet.
    await makeAdopter(root, 'a-ok', previous);
    const failing = await makeAdopter(root, 'b-fail', previous);
    await makeAdopter(root, 'c-ok', previous);

    // Guaranteed apply-path failure (same hook-injection shape as CORE-419.3): a
    // rejecting pre-commit hook, which the bump commit runs since CORE-852.4.
    await installHook(failing.repo, 'pre-commit', 'echo "pin check: refused"\necho "detail line"\nexit 1');

    const { code, stdout, stderr } = await runCli(['--apply', '--root', root], {
      expectFail: true,
      env: { FLAITRON_UPDATE_LATEST: latest },
    });

    assert.equal(code, 1);
    assert.match(stdout, /⬆ a-ok: bumped/);
    // The ✗ line carries the hook's first output line, not git's command echo.
    assert.match(stderr, /✗ b-fail: bump failed — commit failed \(hook\?\) — pin check: refused\n/);
    assert.doesNotMatch(stderr, /detail line/);
    assert.match(stdout, /⬆ c-ok: bumped/);
    assert.match(stdout, /Summary:.*bumped 2 · 0 skipped · 1 failed/);

    await rmTree(root);
  });
});

describe('applyBump rollback (CORE-419.3)', { concurrency: GROUP_CONCURRENCY }, () => {
  it('restores the prior submodule SHA when a post-checkout verify fails', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-rb-verify-'));

    // Forge a non-canonical `latest`: a content-identical commit (amend keeps the
    // tree, so SPEC.md still reads `latest`) carrying a fresh SHA, with the tag
    // moved onto it. A natural clone of the same tag always resolves to the same
    // commit (CORE-366), so verifyPinnedSha's mismatch branch is otherwise
    // unreachable through the real code path. The forgery lives in a *separate
    // origin* rather than in the adopter's own submodule because applyBump opens
    // with `git fetch --tags`, which exits 1 rather than clobbering a diverged
    // local tag — that would abort before the rollback window and pass vacuously.
    const forged = join(root, 'forged-core');
    await execFileAsync('git', [
      'clone', '-q', '--local', '--no-hardlinks', join(mirrorDir, 'core'), forged,
    ]);
    await gitQuiet(forged, 'config', 'user.email', 'core-419-3@test.local');
    await gitQuiet(forged, 'config', 'user.name', 'CORE-419.3');
    await gitQuiet(forged, 'checkout', '-q', latest);
    await gitQuiet(forged, 'commit', '-q', '--amend', '--no-edit', '--allow-empty');
    await gitQuiet(forged, 'tag', '-f', latest);

    const adopter = await makeAdopter(root, 'verify-fail', previous);
    const priorSha = (await git(adopter.sub, 'rev-parse', 'HEAD')).trim();
    await gitQuiet(adopter.sub, 'tag', '-d', latest);
    await gitQuiet(adopter.sub, 'remote', 'set-url', 'origin', forged);

    await assert.rejects(
      () => applyBump({ ...adopter, current: previous }, latest),
      /does not match canonical/,
    );

    // Failure landed before `git add`, so only the checkout needed undoing.
    assert.equal((await git(adopter.sub, 'rev-parse', 'HEAD')).trim(), priorSha);
    assert.equal((await git(adopter.repo, 'diff', '--cached', '--name-only')).trim(), '');

    await rmTree(root);
  });

  it('restores rewritten files, the submodule and the index when a hook rejects the commit (CORE-852.4)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-rb-commit-'));
    const adopter = await makeAdopter(root, 'commit-fail', previous);
    const readme = `Pinned to: ${previous}\n`;
    await commitFollowThroughFiles(adopter.repo, { readme, agents: AGENTS_FIXTURE });
    const priorSha = (await git(adopter.sub, 'rev-parse', 'HEAD')).trim();
    const headBefore = (await git(adopter.repo, 'rev-parse', 'HEAD')).trim();

    // Fail at the last step — after the follow-through rewrote and staged both
    // files and the gitlink — so every part of the rollback has to run.
    await installHook(adopter.repo, 'pre-commit', 'echo "lint: AGENTS.md rejected" >&2\nexit 1');

    await assert.rejects(
      () => applyBump({ ...adopter, current: previous }, latest),
      /^Error: commit failed \(hook\?\) — lint: AGENTS\.md rejected$/,
    );

    assert.equal((await git(adopter.sub, 'rev-parse', 'HEAD')).trim(), priorSha);
    assert.equal((await git(adopter.repo, 'diff', '--cached', '--name-only')).trim(), '');
    assert.equal((await git(adopter.repo, 'status', '--porcelain', '--untracked-files=no')).trim(), '');
    assert.equal((await git(adopter.repo, 'rev-parse', 'HEAD')).trim(), headBefore);
    assert.equal(await readFile(join(adopter.repo, README_REL), 'utf8'), readme);
    assert.equal(await readFile(join(adopter.repo, 'AGENTS.md'), 'utf8'), AGENTS_FIXTURE);

    await rmTree(root);
  });
});

/** Create each `{ path: target }` symlink (parents made) and commit them. */
async function commitLinks(repo, links, { commit = true } = {}) {
  for (const [path, target] of Object.entries(links)) {
    await mkdir(join(repo, path, '..'), { recursive: true });
    await symlink(target, join(repo, path));
  }
  if (!commit) return;
  await gitQuiet(repo, 'add', '--', ...Object.keys(links));
  await gitQuiet(repo, 'commit', '-q', '-m', 'links');
}

/** Commit a local audit fork's SKILL.md (+ optional passes/ files) under `dir`. */
async function commitFork(repo, dir, frontmatter, passes = null) {
  await mkdir(join(repo, dir), { recursive: true });
  await writeFile(join(repo, dir, 'SKILL.md'), `---\nname: audit\n${frontmatter}---\n\n# fork\n`);
  const paths = [`${dir}/SKILL.md`];
  if (passes !== null) {
    await mkdir(join(repo, dir, 'passes'), { recursive: true });
    for (const file of passes) {
      await writeFile(join(repo, dir, 'passes', file), 'filled\n');
      paths.push(`${dir}/passes/${file}`);
    }
  }
  await gitQuiet(repo, 'add', '--', ...paths);
  await gitQuiet(repo, 'commit', '-q', '-m', `fork ${dir}`);
}

const PASSES = 'claude/skills/ft-audit/passes/';
async function passFiles(tag) {
  return (await git(FLAITRON_REPO, 'ls-tree', '--name-only', tag, '--', PASSES))
    .split('\n')
    .filter(Boolean)
    .map((p) => p.slice(PASSES.length));
}

describe('skill wiring and audit forks (CORE-852.5)', { concurrency: GROUP_CONCURRENCY }, () => {
  /** The target rosters, read the way the updater reads them. */
  let claudeLinks;
  let grokLinks;
  let codexSlugs;
  /** A real tag whose ft-audit passes/ lacks a file `latest` ships. */
  let olderPassTag;
  let newlyShipped;
  before(async () => {
    const show = (path) => git(FLAITRON_REPO, 'show', `${latest}:${path}`);
    claudeLinks = snippetLinks(await show('claude/AGENTS-snippet.md'), '.claude/skills');
    grokLinks = snippetLinks(await show('grok/AGENTS-snippet.md'), '.grok/skills');
    codexSlugs = codexRoster(await show('codex/AGENTS-snippet.md'));
    assert.ok(claudeLinks.length > 0 && grokLinks.length > 0 && codexSlugs.length > 0);
    const now = new Set(await passFiles(latest));
    const tags = (await git(FLAITRON_REPO, 'tag', '--sort=-v:refname')).split('\n').filter((t) => parseSemverTag(t));
    for (const tag of tags) {
      const then = await passFiles(tag);
      if (then.length > 0 && then.length < now.size && then.every((f) => now.has(f))) {
        olderPassTag = tag;
        newlyShipped = [...now].filter((f) => !then.includes(f)).sort();
        break;
      }
    }
    assert.ok(olderPassTag, 'need a tag whose passes/ is a strict subset of the latest one');
  });

  it('snippetLinks takes fenced ln -s pairs under the surface, swapping the submodule path', () => {
    const snippet = [
      'ln -s ../../.flaitron/core/claude/skills/ft-prose .claude/skills/ft-prose',
      '```sh',
      'mkdir -p .claude/skills',
      'ln -s ../../.flaitron/core/claude/skills/ft-task   .claude/skills/ft-task',
      'ln -s AGENTS.md CLAUDE.md',
      'ln -s ../../elsewhere/ft-x .claude/skills/ft-x',
      'ln -s ../../.flaitron/core/claude/skills/ft-deep .claude/skills/nested/ft-deep',
      '```',
      '```markdown',
      'ln -s ../../.flaitron/core/claude/skills/ft-md .claude/skills/ft-md',
      '```',
    ].join('\n');
    assert.deepEqual(snippetLinks(snippet, '.claude/skills', 'vendor/flaitron'), [
      { dst: '.claude/skills/ft-task', target: '../../vendor/flaitron/claude/skills/ft-task' },
    ]);
    assert.deepEqual(
      codexRoster('ln -s ../../.flaitron/core/codex/skills/ft-task .agents/skills/ft-task\nln -s x .agents/skills/custom\n'),
      ['ft-task'],
    );
  });

  it('--apply wires missing roster links on present surfaces only, keeping a custom entry', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-wire-'));
    const adopter = await makeAdopter(root, 'wire', previous);
    // .claude has one correct link already and one custom directory; .agents/skills
    // and .grok/skills exist empty; .cursor/skills does not exist.
    const [kept, custom] = claudeLinks;
    await commitLinks(adopter.repo, { [kept.dst]: kept.target });
    await mkdir(join(adopter.repo, custom.dst), { recursive: true });
    await writeFile(join(adopter.repo, custom.dst, 'SKILL.md'), 'mine\n');
    await gitQuiet(adopter.repo, 'add', '--', custom.dst);
    await gitQuiet(adopter.repo, 'commit', '-q', '-m', 'custom');
    await mkdir(join(adopter.repo, '.agents', 'skills'), { recursive: true });
    await mkdir(join(adopter.repo, '.grok', 'skills'), { recursive: true });

    const { stdout } = await runCli(['--apply', '--root', root], { env: { FLAITRON_UPDATE_LATEST: latest } });
    assert.match(stdout, /⬆ wire: bumped .*, committed — /);
    assert.match(stdout, new RegExp(`kept custom ${custom.dst.replace(/\./g, '\\.')}`));

    const created = [
      ...claudeLinks.slice(2),
      ...codexSlugs.map((slug) => ({ dst: `.agents/skills/${slug}`, target: `../../.flaitron/core/codex/skills/${slug}` })),
      ...grokLinks,
    ];
    for (const { dst, target } of created) {
      assert.equal(await readlink(join(adopter.repo, dst)), target, dst);
      assert.match(stdout, new RegExp(`wired ${dst.replace(/\./g, '\\.')}`));
    }
    assert.equal(await readlink(join(adopter.repo, kept.dst)), kept.target);
    assert.equal(await readFile(join(adopter.repo, custom.dst, 'SKILL.md'), 'utf8'), 'mine\n');
    await assert.rejects(() => lstat(join(adopter.repo, '.cursor')), /ENOENT/);
    assert.deepEqual(await headFiles(adopter.repo), [SUBMODULE_PATH, ...created.map((l) => l.dst)].sort());
    assert.equal((await git(adopter.repo, 'status', '--porcelain', '--untracked-files=no')).trim(), '');

    await rmTree(root);
  });

  it('links a vendored submodule path and notes an ignored destination instead of creating it', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-wire-vendor-'));
    const adopter = await makeAdopter(root, 'vendor', previous, 'vendor/flaitron');
    const [ignored, ...rest] = grokLinks;
    await writeFile(join(adopter.repo, '.gitignore'), `${ignored.dst}\n`);
    await gitQuiet(adopter.repo, 'add', '.gitignore');
    await gitQuiet(adopter.repo, 'commit', '-q', '-m', 'ignore');
    await mkdir(join(adopter.repo, '.grok', 'skills'), { recursive: true });

    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'bump');
    const notes = await applyBump({ ...adopter, current: result.current }, latest);
    assert.ok(notes.includes(`not wired (ignored) ${ignored.dst}`), notes.join(', '));
    await assert.rejects(() => lstat(join(adopter.repo, ignored.dst)), /ENOENT/);
    for (const { dst } of rest) {
      assert.equal(
        await readlink(join(adopter.repo, dst)),
        `../../vendor/flaitron/${dst.replace('.grok/skills/', 'claude/skills/')}`,
      );
    }

    await rmTree(root);
  });

  it('removes tracked dangling links into the submodule, keeps untracked and foreign ones', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-prune-'));
    const adopter = await makeAdopter(root, 'prune', previous);
    // Already-wired roster, so the only changes are the prune's.
    await commitLinks(adopter.repo, {
      ...Object.fromEntries(claudeLinks.map((l) => [l.dst, l.target])),
      '.claude/skills/ft-gone': '../../.flaitron/core/claude/skills/ft-gone',
      '.claude/commands/ft-old.md': '../../.flaitron/core/claude/commands/ft-old.md',
      '.claude/skills/mine': '../../nowhere/mine',
      '.claude/worktrees/wt/ft-gone': '../../../.flaitron/core/claude/skills/ft-gone',
    });
    await commitLinks(adopter.repo, { '.claude/skills/ft-local': '../../.flaitron/core/claude/skills/ft-local' }, { commit: false });

    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'bump');
    const notes = await applyBump({ ...adopter, current: result.current }, latest);
    assert.deepEqual(notes.sort(), [
      'kept broken .claude/skills/mine',
      'kept untracked .claude/skills/ft-local',
      'removed .claude/commands/ft-old.md',
      'removed .claude/skills/ft-gone',
    ]);
    assert.deepEqual(await headFiles(adopter.repo), [
      '.claude/commands/ft-old.md',
      '.claude/skills/ft-gone',
      SUBMODULE_PATH,
    ]);
    await assert.rejects(() => lstat(join(adopter.repo, '.claude/skills/ft-gone')), /ENOENT/);
    await lstat(join(adopter.repo, '.claude/skills/ft-local'));
    await lstat(join(adopter.repo, '.claude/worktrees/wt/ft-gone'));
    assert.equal((await git(adopter.repo, 'status', '--porcelain', '--untracked-files=no')).trim(), '');

    await rmTree(root);
  });

  it('replaces a stale in-submodule link at a roster path instead of keeping it as custom', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-stale-'));
    const adopter = await makeAdopter(root, 'stale', previous);
    const [stale, ...rest] = claudeLinks;
    const oldTarget = `../../.flaitron/core/claude/commands/${stale.dst.split('/').at(-1)}.md`;
    await commitLinks(adopter.repo, {
      ...Object.fromEntries(rest.map((l) => [l.dst, l.target])),
      [stale.dst]: oldTarget,
    });

    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'bump');
    const notes = await applyBump({ ...adopter, current: result.current }, latest);
    assert.deepEqual(notes, [`removed ${stale.dst}`, `wired ${stale.dst}`]);
    assert.equal(await readlink(join(adopter.repo, stale.dst)), stale.target);
    assert.deepEqual(await headFiles(adopter.repo), [stale.dst, SUBMODULE_PATH].sort());
    assert.equal((await git(adopter.repo, 'status', '--porcelain', '--untracked-files=no')).trim(), '');

    await rmTree(root);
  });

  it('skips a Codex wiring conflict in dry-run and apply, leaving the pin unmoved', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-codex-conflict-'));
    const custom = await makeAdopter(root, 'custom', previous);
    const slug = codexSlugs[0];
    await mkdir(join(custom.repo, '.agents', 'skills', slug), { recursive: true });
    await writeFile(join(custom.repo, '.agents', 'skills', slug, 'SKILL.md'), 'mine\n');
    await gitQuiet(custom.repo, 'add', '--', '.agents');
    await gitQuiet(custom.repo, 'commit', '-q', '-m', 'custom codex');

    const linked = await makeAdopter(root, 'linked-root', previous);
    await mkdir(join(linked.repo, 'elsewhere'));
    await mkdir(join(linked.repo, '.agents'));
    await symlink('../elsewhere', join(linked.repo, '.agents', 'skills'));

    // .agents itself redirected; .agents/skills is a real directory over there.
    const linkedParent = await makeAdopter(root, 'linked-parent', previous);
    await mkdir(join(linkedParent.repo, 'shared-agents', 'skills'), { recursive: true });
    await symlink('shared-agents', join(linkedParent.repo, '.agents'));

    const priorPins = [
      (await git(custom.repo, 'rev-parse', `HEAD:${SUBMODULE_PATH}`)).trim(),
      (await git(linked.repo, 'rev-parse', `HEAD:${SUBMODULE_PATH}`)).trim(),
    ];
    for (const args of [['--root', root], ['--apply', '--root', root]]) {
      const { stdout } = await runCli(args, { env: { FLAITRON_UPDATE_LATEST: latest } });
      assert.match(stdout, new RegExp(`⏭ custom \\(.*\\): skipped — codex wiring conflict \\(preserved \\.agents/skills/${slug}\\) — run /ft-update`));
      assert.match(stdout, /⏭ linked-root \(.*\): skipped — codex wiring conflict \(skill root \.agents\/skills\)/);
      assert.match(stdout, /⏭ linked-parent \(.*\): skipped — codex wiring conflict \(skill root \.agents\/skills\)/);
    }
    assert.deepEqual((await git(linkedParent.repo, 'ls-tree', '-r', '--name-only', 'HEAD')).trim(), SUBMODULE_PATH);
    assert.deepEqual(
      [
        (await git(custom.repo, 'rev-parse', `HEAD:${SUBMODULE_PATH}`)).trim(),
        (await git(linked.repo, 'rev-parse', `HEAD:${SUBMODULE_PATH}`)).trim(),
      ],
      priorPins,
    );
    // A target without a Codex roster (v5.0.0 shipped no codex/ snippet) conflicts too.
    assert.deepEqual((await wiringPlan(custom.repo, SUBMODULE_PATH, 'v5.0.0')).conflicts, ['empty pinned Codex roster']);

    await rmTree(root);
  });

  it('skips a full-copy fork missing a newly shipped pass file, never one deleted on purpose', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-fork-gap-'));
    // Reconciled before the newest pass files shipped, with passes/ emptied: only
    // the newly shipped ones count, the rest were deleted on purpose.
    const gap = await makeAdopter(root, 'gap', previous);
    await commitFork(gap.repo, '.claude/skills/audit', `flaitron-reconciled: ${olderPassTag}\nflaitron-tracks: ft-audit\n`, []);
    const gapResult = await checkAdopter(gap, latest);
    assert.equal(gapResult.status, 'skip');
    assert.equal(
      gapResult.reason,
      `audit fork needs pass-file copy (${newlyShipped.map((f) => `.claude/skills/audit/passes/${f}`).join(', ')}) — run /ft-update`,
    );
    assert.match(gapResult.forkNote, new RegExp(`audit fork drift: \\.claude/skills/audit@${olderPassTag.replace(/\./g, '\\.')}`));

    // Same fork with the newly shipped files present → no gap.
    const filled = await makeAdopter(root, 'filled', previous);
    await commitFork(filled.repo, '.agents/skills/audit', `flaitron-reconciled: ${olderPassTag}\nflaitron-tracks: ft-audit\n`, newlyShipped);
    assert.equal((await checkAdopter(filled, latest)).status, 'bump');

    // Thin overlay (no passes/) at the same marker: drift note only.
    const thin = await makeAdopter(root, 'thin', previous);
    await commitFork(thin.repo, '.claude/skills/audit', `flaitron-reconciled: ${olderPassTag}\nflaitron-tracks: ft-audit\n`);
    const thinResult = await checkAdopter(thin, latest);
    assert.equal(thinResult.status, 'bump');
    assert.match(thinResult.forkNote, /audit fork drift: \.claude\/skills\/audit@/);

    const { stdout } = await runCli(['--root', root], { env: { FLAITRON_UPDATE_LATEST: latest } });
    assert.match(stdout, /⏭ gap \(.*\): skipped — audit fork needs pass-file copy .* \(audit fork drift: /);
    assert.match(stdout, /⬆ thin: would bump .* \(audit fork drift: \.claude\/skills\/audit@.* — review and re-reconcile\)/);

    await rmTree(root);
  });

  it('reads no marker from an unvalidated value, a linked skill dir, or a current fork', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-fork-markers-'));
    const adopter = await makeAdopter(root, 'markers', previous);
    await commitFork(adopter.repo, '.claude/skills/a', 'flaitron-reconciled: --output=/dev/null\nflaitron-tracks: ft-audit\n', []);
    await commitFork(adopter.repo, '.claude/skills/b', `flaitron-reconciled: ${olderPassTag}\nflaitron-tracks: ../ft-audit\n`, []);
    await commitFork(adopter.repo, '.claude/skills/c', `flaitron-reconciled: ${latest}\nflaitron-tracks: ft-audit\n`, []);
    await commitFork(adopter.repo, 'shared/d', `flaitron-reconciled: ${olderPassTag}\nflaitron-tracks: ft-audit\n`, []);
    await commitLinks(adopter.repo, { '.claude/skills/d': '../../shared/d' });

    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'bump');
    assert.equal(result.forkNote, '');

    await rmTree(root);
  });

  it('rollback unlinks created links and the directory made for them, and restores removed links', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-rb-links-'));
    const adopter = await makeAdopter(root, 'rb-links', previous);
    // .claude present without skills/: the run must mkdir it, then undo that.
    await commitLinks(adopter.repo, { '.claude/commands/ft-old.md': '../../.flaitron/core/claude/commands/ft-old.md' });
    const headBefore = (await git(adopter.repo, 'rev-parse', 'HEAD')).trim();
    // The hook records what was staged, proving the link changes happened before
    // the rollback had anything to undo.
    await installHook(
      adopter.repo,
      'pre-commit',
      'git diff --cached --name-only > "$(git rev-parse --git-dir)/staged-at-hook"\necho "refused" >&2\nexit 1',
    );

    await assert.rejects(
      () => applyBump({ ...adopter, current: previous }, latest),
      /^Error: commit failed \(hook\?\) — refused$/,
    );

    const staged = (await readFile(join(adopter.repo, '.git', 'staged-at-hook'), 'utf8')).split('\n').filter(Boolean);
    assert.ok(staged.includes('.claude/commands/ft-old.md'), staged.join(', '));
    assert.ok(staged.includes(claudeLinks[0].dst), staged.join(', '));
    await assert.rejects(() => lstat(join(adopter.repo, '.claude', 'skills')), /ENOENT/);
    assert.equal(
      await readlink(join(adopter.repo, '.claude/commands/ft-old.md')),
      '../../.flaitron/core/claude/commands/ft-old.md',
    );
    assert.equal((await git(adopter.repo, 'diff', '--cached', '--name-only')).trim(), '');
    assert.equal((await git(adopter.repo, 'status', '--porcelain', '--untracked-files=no')).trim(), '');
    assert.equal((await git(adopter.repo, 'rev-parse', 'HEAD')).trim(), headBefore);

    await rmTree(root);
  });
});

describe('applyBump fetch timeout (CORE-585)', () => {
  it('rejects with a timeout message instead of hanging on a stalled remote', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-fetch-timeout-'));

    // A `git` shim ahead of the real one on PATH: it hangs forever on `fetch`
    // (standing in for a remote that's up but never answers) and forwards
    // every other subcommand to the real binary, resolved once up front so
    // the shim doesn't re-find itself through the very PATH it's prepended to.
    const realGit = (await execFileAsync('which', ['git'])).stdout.trim();
    const shimDir = join(root, 'shim');
    await mkdir(shimDir, { recursive: true });
    await writeFile(
      join(shimDir, 'git'),
      `#!/bin/sh\nif [ "$1" = "fetch" ]; then exec sleep 100; fi\nexec "${realGit}" "$@"\n`,
      { mode: 0o755 },
    );

    const adopter = await makeAdopter(root, 'stalled-fetch', previous);

    const prevTimeout = process.env.FLAITRON_FETCH_TIMEOUT_MS;
    const prevPath = process.env.PATH;
    process.env.FLAITRON_FETCH_TIMEOUT_MS = '300';
    process.env.PATH = `${shimDir}:${prevPath}`;
    try {
      await assert.rejects(
        () => applyBump({ ...adopter, current: previous }, latest),
        /timed out after 300ms/,
      );
    } finally {
      process.env.PATH = prevPath;
      if (prevTimeout === undefined) delete process.env.FLAITRON_FETCH_TIMEOUT_MS;
      else process.env.FLAITRON_FETCH_TIMEOUT_MS = prevTimeout;
    }

    await rmTree(root);
  });
});

describe('tagsInRange', () => {
  it('returns tags strictly after from up to to', async () => {
    const range = await tagsInRange(previous, latest);
    assert.ok(range.includes(latest));
    assert.ok(!range.includes(previous));
  });
});

describe('(fromTag, toTag) memoization (CORE-490.4)', () => {
  it('cachedMigrationBearingTags returns the exact same promise for a repeated pair', async () => {
    const p1 = cachedMigrationBearingTags(previous, latest);
    const p2 = cachedMigrationBearingTags(previous, latest);
    assert.equal(p1, p2, 'repeated (fromTag, toTag) call must reuse the in-flight/cached promise');
    assert.deepEqual(await p1, await p2);
  });

  it('cachedMigrationBearingTags matches the uncached tagsInRange + migrationBearingTags result', async () => {
    const cached = await cachedMigrationBearingTags(previous, latest);
    const range = await tagsInRange(previous, latest);
    const uncached = await migrationBearingTags(range);
    assert.deepEqual(cached, uncached);
  });

  it('cachedMigrationBearingTags does not share a cache entry across different pairs', async () => {
    const shared = cachedMigrationBearingTags(previous, latest);
    const distinct = cachedMigrationBearingTags(latest, latest);
    assert.notEqual(shared, distinct);
  });

  it('checkAdopter reuses the cached promise across adopters sharing the same (current, latest) pair', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-memo-'));
    try {
      const a1 = await makeAdopter(root, 'shared-pin-1', previous);
      const a2 = await makeAdopter(root, 'shared-pin-2', previous);

      await checkAdopter(a1, latest);
      const afterFirst = cachedMigrationBearingTags(previous, latest);

      await checkAdopter(a2, latest);
      const afterSecond = cachedMigrationBearingTags(previous, latest);

      assert.equal(
        afterFirst,
        afterSecond,
        'a second checkAdopter call sharing (current, latest) must not repopulate the cache entry',
      );
    } finally {
      await rmTree(root);
    }
  });
});

describe('canonicalTagSha memoization (CORE-493)', () => {
  it('cachedCanonicalTagSha returns the exact same promise for a repeated tag', async () => {
    const p1 = cachedCanonicalTagSha(latest);
    const p2 = cachedCanonicalTagSha(latest);
    assert.equal(p1, p2, 'repeated tag call must reuse the in-flight/cached promise');
    assert.deepEqual(await p1, await p2);
  });

  it('cachedCanonicalTagSha does not share a cache entry across different tags', async () => {
    const forLatest = cachedCanonicalTagSha(latest);
    const forPrevious = cachedCanonicalTagSha(previous);
    assert.notEqual(forLatest, forPrevious);
    assert.notEqual(await forLatest, await forPrevious);
  });

  it('checkAdopter reuses the cached promise for `latest` across adopters', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-sha-memo-'));
    try {
      const a1 = await makeAdopter(root, 'shared-latest-1', previous);
      const a2 = await makeAdopter(root, 'shared-latest-2', previous);

      await checkAdopter(a1, latest);
      const afterFirst = cachedCanonicalTagSha(latest);

      await checkAdopter(a2, latest);
      const afterSecond = cachedCanonicalTagSha(latest);

      assert.equal(
        afterFirst,
        afterSecond,
        'a second checkAdopter call for the same `latest` must not repopulate the cache entry',
      );
    } finally {
      await rmTree(root);
    }
  });

  it('applyBump reuses the cache checkAdopter already warmed for `latest`', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-sha-memo-apply-'));
    try {
      const adopter = await makeAdopter(root, 'apply-reuses-cache', previous);

      const result = await checkAdopter(adopter, latest);
      assert.equal(result.status, 'bump');
      const afterCheck = cachedCanonicalTagSha(latest);

      await applyBump({ ...adopter, current: result.current }, latest);
      const afterApply = cachedCanonicalTagSha(latest);

      assert.equal(
        afterCheck,
        afterApply,
        'applyBump must resolve `latest` through the same cache entry checkAdopter warmed, not a fresh git spawn',
      );
    } finally {
      await rmTree(root);
    }
  });
});

// CORE-789: execute the shipped markdown block, not a second installer.
// This suite covers per-project wiring; the fleet updater's remit is unchanged.
describe('pinned Codex wiring procedure', () => {
  let wiringRoot;
  let wiringBlock;
  let stagingBlock;
  let codexSnippet;
  let migration;
  let expectedSlugs;

  before(async () => {
    wiringRoot = await mkdtemp(join(tmpdir(), 'ft-codex-wiring-'));
    const procedure = await readFile(join(FLAITRON_REPO, 'codex/reconcile-skills.md'), 'utf8');
    const blocks = [...procedure.matchAll(/```sh\n([\s\S]*?)\n```/g)];
    assert.equal(blocks.length, 2);
    wiringBlock = blocks[0][1];
    stagingBlock = blocks[1][1];
    codexSnippet = await readFile(join(FLAITRON_REPO, 'codex/AGENTS-snippet.md'), 'utf8');
    migration = await readFile(join(FLAITRON_REPO, 'docs/MIGRATION.md'), 'utf8');
    const claudeSnippet = await readFile(join(FLAITRON_REPO, 'claude/AGENTS-snippet.md'), 'utf8');
    const slugs = (snippet) => [...snippet.matchAll(/^ln -s .*\/skills\/(ft-[a-z-]+)\s*$/gm)].map((m) => m[1]).sort();
    expectedSlugs = slugs(claudeSnippet);
    assert.ok(expectedSlugs.length > 0);
    assert.deepEqual(slugs(codexSnippet), expectedSlugs, 'Codex roster must derive from Claude');
  });

  after(async () => { if (wiringRoot) await rmTree(wiringRoot); });

  async function fixture(pinPath = '.flaitron/core', snippet = codexSnippet) {
    const repo = await mkdtemp(join(wiringRoot, 'adopter-'));
    await gitQuiet(repo, 'init', '-q');
    const core = join(repo, pinPath);
    await mkdir(join(core, 'codex'), { recursive: true });
    await mkdir(join(core, 'docs'), { recursive: true });
    await writeFile(join(core, 'codex/AGENTS-snippet.md'), snippet);
    await writeFile(join(core, 'docs/MIGRATION.md'), migration);
    for (const slug of expectedSlugs) {
      const dir = join(core, 'codex/skills', slug);
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, 'SKILL.md'), `---\nname: ${slug}\ndescription: Pinned fixture skill\n---\n`);
    }
    return { repo, core, pinPath };
  }

  async function reconcile(f, shell = 'sh') {
    try {
      // zsh -f skips user rc files (a stray `setopt sh_word_split` would mask the bug); /etc/zshenv still loads.
      const args = shell === 'zsh' ? ['-f', '-c', wiringBlock] : ['-c', wiringBlock];
      const { stdout } = await execFileAsync(shell, args, {
        cwd: f.repo, env: { ...process.env, FT_DIR: f.pinPath },
      });
      return { code: 0, stdout };
    } catch (e) {
      return { code: e.code, stdout: e.stdout, stderr: e.stderr };
    }
  }

  async function checkRoster(f, slugs = expectedSlugs) {
    for (const slug of slugs) {
      const link = join(f.repo, '.agents/skills', slug);
      assert.ok((await lstat(link)).isSymbolicLink());
      assert.equal(await readlink(link), `../../${f.pinPath}/codex/skills/${slug}`);
      assert.match(await readFile(join(link, 'SKILL.md'), 'utf8'), new RegExp(`name: ${slug}\\n`));
    }
  }

  it('bootstraps an absent directory from the canonical pinned subset', async () => {
    const f = await fixture();
    const result = await reconcile(f);
    assert.equal(result.code, 0, result.stderr);
    assert.equal(result.stdout.match(/^CREATED /gm).length, expectedSlugs.length);
    await checkRoster(f);
    for (const platform of ['.claude', '.cursor', '.grok']) {
      await assert.rejects(lstat(join(f.repo, platform)), { code: 'ENOENT' });
    }
    for (const excluded of ['ft-release', 'ft-adopt', 'ft-audit-repo', 'ft-audit']) {
      await assert.rejects(lstat(join(f.repo, '.agents/skills', excluded)), { code: 'ENOENT' });
    }
  });

  it('fills a partial install and is idempotent on healthy links', async () => {
    const f = await fixture();
    await mkdir(join(f.repo, '.agents/skills'), { recursive: true });
    const slug = expectedSlugs[0];
    const link = join(f.repo, '.agents/skills', slug);
    await symlink(`../../${f.pinPath}/codex/skills/${slug}`, link);
    const before = await lstat(link);
    assert.equal((await reconcile(f)).code, 0);
    assert.equal((await lstat(link)).ino, before.ino, 'correct link was not replaced');
    const second = await reconcile(f);
    assert.equal(second.code, 0);
    assert.doesNotMatch(second.stdout, /CREATED|REMOVED|CONFLICT/);
    await checkRoster(f);
  });

  it('reads an older pin roster instead of silently installing the current inventory', async () => {
    const omitted = expectedSlugs[0];
    const older = codexSnippet.split('\n').filter((line) => !line.startsWith('ln -s ') || !line.endsWith(`/${omitted}`)).join('\n');
    const f = await fixture('.flaitron/core', older);
    assert.equal((await reconcile(f)).code, 0);
    await checkRoster(f, expectedSlugs.filter((slug) => slug !== omitted));
    await assert.rejects(lstat(join(f.repo, '.agents/skills', omitted)), { code: 'ENOENT' });
  });

  it('uses a resolved relative pin path with spaces', async () => {
    const f = await fixture('vendor/pinned flaitron');
    assert.equal((await reconcile(f)).code, 0);
    await checkRoster(f);
  });

  it('repairs at the same version without changing HEAD or the index gitlink', async () => {
    const f = await fixture();
    await gitQuiet(f.core, 'init', '-q');
    await gitQuiet(f.core, 'add', '.');
    await gitQuiet(f.core, '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-qm', 'pinned fixture');
    const sha = (await execFileAsync('git', ['rev-parse', 'HEAD'], { cwd: f.core })).stdout.trim();
    await gitQuiet(f.repo, 'update-index', '--add', '--cacheinfo', `160000,${sha},${f.pinPath}`);
    const indexBefore = (await execFileAsync('git', ['ls-files', '--stage'], { cwd: f.repo })).stdout;
    assert.equal((await reconcile(f)).code, 0);
    assert.equal((await execFileAsync('git', ['rev-parse', 'HEAD'], { cwd: f.core })).stdout.trim(), sha);
    assert.equal((await execFileAsync('git', ['ls-files', '--stage'], { cwd: f.repo })).stdout, indexBefore);
    assert.equal((await reconcile(f)).code, 0);
    await checkRoster(f);
  });

  it('reconciles renamed/folded links using the pinned retirement table', async () => {
    const f = await fixture();
    await mkdir(join(f.repo, '.agents/skills'), { recursive: true });
    const retired = ['ft-file-followup', 'ft-epic-discovery', 'ft-seed', 'ft-micro-task', 'ft-new-project'];
    for (const slug of retired) {
      assert.ok(migration.includes(`| \`${slug}\` |`), 'fixture retirement must have source evidence');
      await symlink(`../../${f.pinPath}/codex/skills/${slug}`, join(f.repo, '.agents/skills', slug));
    }
    const result = await reconcile(f);
    assert.equal(result.code, 0, result.stderr);
    for (const slug of retired) {
      assert.ok(result.stdout.includes(`REMOVED .agents/skills/${slug}\n`));
      await assert.rejects(lstat(join(f.repo, '.agents/skills', slug)), { code: 'ENOENT' });
    }
    await checkRoster(f);
    assert.doesNotMatch((await reconcile(f)).stdout, /REMOVED/);
  });

  // CORE-849: agents run the block in the login shell, and zsh does not
  // word-split an unquoted `$var`. The static check guards hosts without zsh.
  it('never word-splits a roster from an unquoted variable', () => {
    // Only a bare, unquoted `$(...)` splits in every shell; `"$(...)"` and `$var` do not in zsh.
    assert.doesNotMatch(wiringBlock, /\bfor\s+\w+\s+in\s+(?:["']|\$(?!\())/);
    assert.doesNotMatch(wiringBlock, /(?<!")\$\{?ft_(slugs|retired)\b/, 'roster variables expand only double-quoted');
  });

  it('wires, retires, and fails closed the same under zsh', async (t) => {
    try { await execFileAsync('zsh', ['-f', '-c', 'true']); } catch { t.skip('zsh not installed'); return; }
    const f = await fixture();
    await mkdir(join(f.repo, '.agents/skills'), { recursive: true });
    const retired = 'ft-file-followup';
    await symlink(`../../${f.pinPath}/codex/skills/${retired}`, join(f.repo, '.agents/skills', retired));
    const result = await reconcile(f, 'zsh');
    assert.equal(result.code, 0, `${result.stdout ?? ''}${result.stderr ?? ''}`);
    assert.equal(result.stdout.match(/^CREATED /gm).length, expectedSlugs.length);
    assert.ok(result.stdout.includes(`REMOVED .agents/skills/${retired}\n`));
    await checkRoster(f);
    // A preserved custom destination must still surface through ft_failed.
    const custom = join(f.repo, '.agents/skills', expectedSlugs[0]);
    await unlink(custom);
    await mkdir(custom);
    const conflict = await reconcile(f, 'zsh');
    assert.equal(conflict.code, 1);
    assert.match(conflict.stdout, new RegExp(`^CONFLICT preserved \\.agents/skills/${expectedSlugs[0]}$`, 'm'));
    // A missing body must stop before any link work, one slug per message.
    const g = await fixture();
    await unlink(join(g.core, 'codex/skills', expectedSlugs[1], 'SKILL.md'));
    const missing = await reconcile(g, 'zsh');
    assert.equal(missing.code, 1);
    assert.equal(missing.stdout, `CONFLICT missing pinned body: ${expectedSlugs[1]}\n`);
    await assert.rejects(lstat(join(g.repo, '.agents')), { code: 'ENOENT' });
  });

  it('does not retire a name still shipped by an older pin', async () => {
    const slug = 'ft-seed';
    const older = codexSnippet.replaceAll('ft-seed-unattended', slug);
    const f = await fixture('.flaitron/core', older);
    await mkdir(join(f.core, 'codex/skills', slug));
    await writeFile(join(f.core, 'codex/skills', slug, 'SKILL.md'), `name: ${slug}\n`);
    assert.equal((await reconcile(f)).code, 0);
    assert.equal(await readlink(join(f.repo, '.agents/skills', slug)), `../../${f.pinPath}/codex/skills/${slug}`);
  });

  it('stages net wiring changes across two pins and skips removed untracked links', async () => {
    const older = codexSnippet.replaceAll('ft-seed-unattended', 'ft-seed');
    const f = await fixture('.flaitron/core', older);
    const oldBody = join(f.core, 'codex/skills/ft-seed');
    await mkdir(oldBody);
    await writeFile(join(oldBody, 'SKILL.md'), 'name: ft-seed\n');
    const first = await reconcile(f);
    assert.equal(first.code, 0);
    assert.match(first.stdout, /CREATED .agents\/skills\/ft-seed\n/);
    // One tracked retirement and one untracked retirement at the target pin.
    const tracked = join(f.repo, '.agents/skills/ft-file-followup');
    await symlink(`../../${f.pinPath}/codex/skills/ft-file-followup`, tracked);
    await gitQuiet(f.repo, 'add', '--', '.agents/skills/ft-file-followup');
    await gitQuiet(f.repo, '-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-qm', 'tracked retirement baseline');
    const untracked = join(f.repo, '.agents/skills/ft-micro-task');
    await symlink(`../../${f.pinPath}/codex/skills/ft-micro-task`, untracked);
    await writeFile(join(f.core, 'codex/AGENTS-snippet.md'), codexSnippet);
    await rmTree(oldBody);
    const second = await reconcile(f);
    assert.equal(second.code, 0);
    assert.match(second.stdout, /REMOVED .agents\/skills\/ft-seed\n/);
    const reports = join(f.repo, 'reports.txt');
    await writeFile(reports, first.stdout + second.stdout);
    const { stdout } = await execFileAsync('sh', ['-c', stagingBlock], {
      cwd: f.repo, env: { ...process.env, FT_WIRING_REPORT: reports },
    });
    const paths = stdout.trim().split('\n');
    assert.ok(paths.includes('.agents/skills/ft-file-followup'));
    assert.ok(!paths.includes('.agents/skills/ft-seed'));
    assert.ok(!paths.includes('.agents/skills/ft-micro-task'));
    await gitQuiet(f.repo, 'add', '--', ...paths);
    const staged = (await execFileAsync('git', ['ls-files'], { cwd: f.repo })).stdout.trim().split('\n');
    assert.deepEqual(staged, expectedSlugs.map((slug) => `.agents/skills/${slug}`));
    assert.match((await execFileAsync('git', ['diff', '--cached', '--name-status'], { cwd: f.repo })).stdout,
      /^D\s+\.agents\/skills\/ft-file-followup$/m);
    await checkRoster(f);
  });

  for (const kind of ['file', 'directory', 'live link', 'dangling link', 'wrong pinned slug']) {
    it(`preserves and reports a current-slug conflict: ${kind}`, async () => {
      const f = await fixture();
      await mkdir(join(f.repo, '.agents/skills'), { recursive: true });
      const link = join(f.repo, '.agents/skills', expectedSlugs[0]);
      if (kind === 'file') await writeFile(link, 'custom body');
      else if (kind === 'directory') {
        await mkdir(link);
        await writeFile(join(link, 'SKILL.md'), 'custom body');
      } else {
        const target = kind === 'live link' ? '../../custom' : kind === 'wrong pinned slug'
          ? `../../${f.pinPath}/codex/skills/${expectedSlugs[1]}` : '../../missing-custom';
        if (kind === 'live link') await writeFile(join(f.repo, 'custom'), 'custom body');
        await symlink(target, link);
      }
      const before = await lstat(link);
      const targetBefore = before.isSymbolicLink() ? await readlink(link) : null;
      const result = await reconcile(f);
      assert.equal(result.code, 1);
      assert.ok(result.stdout.includes(`CONFLICT preserved .agents/skills/${expectedSlugs[0]}\n`));
      assert.equal((await lstat(link)).ino, before.ino);
      if (targetBefore) assert.equal(await readlink(link), targetBefore);
      else assert.equal(await readFile(kind === 'file' ? link : join(link, 'SKILL.md'), 'utf8'), 'custom body');
    });
  }

  it('preserves custom retired destinations and unknown dangling links', async () => {
    const f = await fixture();
    await mkdir(join(f.repo, '.agents/skills'), { recursive: true });
    await symlink('../../missing-custom', join(f.repo, '.agents/skills/ft-seed'));
    await mkdir(join(f.repo, '.agents/skills/ft-new-project'));
    await writeFile(join(f.repo, '.agents/skills/ft-new-project/SKILL.md'), 'custom body');
    await symlink(`../../${f.pinPath}/codex/skills/ft-unknown`, join(f.repo, '.agents/skills/ft-unknown'));
    const result = await reconcile(f);
    assert.equal(result.code, 1);
    assert.match(result.stdout, /CONFLICT preserved retired destination .agents\/skills\/ft-seed/);
    assert.equal(await readlink(join(f.repo, '.agents/skills/ft-seed')), '../../missing-custom');
    assert.equal(await readFile(join(f.repo, '.agents/skills/ft-new-project/SKILL.md'), 'utf8'), 'custom body');
    assert.equal(await readlink(join(f.repo, '.agents/skills/ft-unknown')), `../../${f.pinPath}/codex/skills/ft-unknown`);
  });

  for (const rootPath of ['.agents', '.agents/skills']) {
    for (const kind of ['live directory link', 'dangling link', 'file']) {
      it(`refuses a redirected root ${rootPath}: ${kind}`, async () => {
        const f = await fixture();
        if (rootPath.includes('/')) await mkdir(join(f.repo, '.agents'));
        const root = join(f.repo, rootPath);
        if (kind === 'file') await writeFile(root, 'custom root');
        else {
          const external = join(f.repo, 'external');
          if (kind === 'live directory link') await mkdir(external);
          await symlink(external, root);
        }
        const result = await reconcile(f);
        assert.equal(result.code, 1);
        assert.match(result.stdout, /CONFLICT skill root:/);
        assert.doesNotMatch(result.stdout, /CREATED|REMOVED/);
        if (kind === 'file') assert.equal(await readFile(root, 'utf8'), 'custom root');
        else assert.equal(await readlink(root), join(f.repo, 'external'));
      });
    }
  }

  it('leaves other platform surfaces and unrelated skills intact', async () => {
    const f = await fixture();
    const preserved = [];
    for (const platform of ['.claude', '.cursor', '.grok', '.agents']) {
      const root = join(f.repo, platform, 'skills');
      await mkdir(root, { recursive: true });
      const file = join(root, 'custom');
      await writeFile(file, `${platform} user work`);
      const link = join(root, 'unrelated');
      await symlink('custom', link);
      preserved.push({ file, link, ino: (await lstat(link)).ino, text: `${platform} user work` });
    }
    assert.equal((await reconcile(f)).code, 0);
    for (const entry of preserved) {
      assert.equal(await readFile(entry.file, 'utf8'), entry.text);
      assert.equal(await readlink(entry.link), 'custom');
      assert.equal((await lstat(entry.link)).ino, entry.ino);
    }
  });

  it('checks missing bodies and an empty roster before changing destinations', async () => {
    for (const defect of ['body', 'roster']) {
      const f = await fixture();
      if (defect === 'body') await unlink(join(f.core, 'codex/skills', expectedSlugs[0], 'SKILL.md'));
      else await writeFile(join(f.core, 'codex/AGENTS-snippet.md'), '# No roster\n');
      assert.equal((await reconcile(f)).code, 1);
      await assert.rejects(lstat(join(f.repo, '.agents')), { code: 'ENOENT' });
    }
  });

  it('routes current-pin repair before update early exits and retains thin Codex wrappers', async () => {
    const update = await readFile(join(FLAITRON_REPO, 'claude/skills/ft-update/SKILL.md'), 'utf8');
    const step1 = update.split('## Step 1 —')[1].split('## Step 2 —')[0];
    assert.ok(step1.indexOf('**Repair wiring at the current pin:**') < step1.indexOf('**Fetch tags:**'));
    assert.match(step1, /same-version, offline and declined-bump/);
    assert.match(step1, /go to Step 5/);
    for (const slug of ['ft-adopt', 'ft-update']) {
      const wrapper = await readFile(join(FLAITRON_REPO, 'codex/skills', slug, 'SKILL.md'), 'utf8');
      assert.match(wrapper, /\.\.\/\.\.\/reconcile-skills\.md/);
      assert.match(wrapper, /unless the operator explicitly chooses another/);
      assert.match(wrapper, /claude\/skills/);
      assert.match(wrapper, /When Codex is selected/);
    }
  });
});
