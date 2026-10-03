// Automated tests for tools/update-adopters.mjs (CORE-360).
// Zero-dep: node:test + temp git fixtures under --root. Never touches ~/code.

import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { lstat, mkdtemp, mkdir, readFile, readlink, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { after, before, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import {
  FLAITRON_REPO,
  PRE_RENAME_SUBMODULE_PATH,
  RENAME_TAG,
  SUBMODULE_PATH,
  applyBump,
  applyMigrate,
  cachedCanonicalTagSha,
  cachedMigrationBearingTags,
  cachedNewSkillWiringSurfaces,
  checkAdopter,
  compareSemver,
  describePin,
  discoverAdopters,
  formatSkillsNote,
  git,
  gitlinkDrift,
  latestReleaseTag,
  migrationBearingTags,
  parseArgs,
  parseSemverTag,
  pinnedVersion,
  realOrResolve,
  renamedDirSegments,
  renamedRemoteUrl,
  tagsInRange,
  verifyPinnedSha,
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
async function makeAdopter(root, name, pinTag) {
  const repo = join(root, name);
  await mkdir(repo, { recursive: true });
  await gitQuiet(repo, 'init', '-q');
  await gitQuiet(repo, 'config', 'user.email', 'core-360@test.local');
  await gitQuiet(repo, 'config', 'user.name', 'CORE-360');
  await gitQuiet(repo, 'config', 'advice.addEmbeddedRepo', 'false');

  const sub = join(repo, SUBMODULE_PATH);
  await execFileAsync('git', [
    'clone',
    '-q',
    '--local',
    '--no-hardlinks',
    join(mirrorDir, 'core'),
    sub,
  ]);
  await gitQuiet(sub, 'checkout', '-q', pinTag);
  await gitQuiet(repo, 'add', SUBMODULE_PATH);
  await gitQuiet(repo, 'commit', '-q', '-m', `pin ${pinTag}`);
  return { name, repo, sub };
}

const PRE_RENAME_URL = 'https://github.com/fakeneuron/flowtron.git';
const RENAMED_URL = 'https://github.com/fakeneuron/flaitron.git';

async function exists(path) {
  try {
    await lstat(path);
    return true;
  } catch {
    return false;
  }
}

/**
 * A pre-rename adopter shaped like the fleet (CORE-711.1 survey): a real
 * submodule at `.flowtron/core` (name == path, absorbed gitdir), tracked
 * `.flowtron/` content, a skill symlink into the submodule, a link onto
 * `.flowtron/` itself, one unrelated link, and a .gitignore rule under
 * `.flowtron/` (18 of 23 adopters ignore `.flowtron/screenshots/`). `.gitmodules` carries the GitHub
 * url while `.git/config` keeps the local mirror, so applyMigrate's fetch never
 * leaves the machine.
 */
async function makePreRenameAdopter(root, name, pinTag) {
  const repo = join(root, name);
  await mkdir(repo, { recursive: true });
  await gitQuiet(repo, 'init', '-q');
  await gitQuiet(repo, 'config', 'user.email', 'core-711-3@test.local');
  await gitQuiet(repo, 'config', 'user.name', 'CORE-711.3');
  await gitQuiet(
    repo,
    '-c',
    'protocol.file.allow=always',
    'submodule',
    'add',
    '-q',
    join(mirrorDir, 'core'),
    PRE_RENAME_SUBMODULE_PATH,
  );
  const sub = join(repo, PRE_RENAME_SUBMODULE_PATH);
  await gitQuiet(sub, 'checkout', '-q', pinTag);
  await gitQuiet(
    repo,
    'config',
    '--file',
    '.gitmodules',
    `submodule.${PRE_RENAME_SUBMODULE_PATH}.url`,
    PRE_RENAME_URL,
  );
  await writeFile(join(repo, '.flowtron', 'PLAN.md'), '# Plan\n');
  await mkdir(join(repo, '.claude', 'skills'), { recursive: true });
  await symlink('../../.flowtron/core/claude/skills/ft-task', join(repo, '.claude', 'skills', 'ft-task'));
  await mkdir(join(repo, 'vault'));
  await symlink('../.flowtron', join(repo, 'vault', 'flowtron'));
  await writeFile(join(repo, 'README.md'), '# readme\n');
  await symlink('README.md', join(repo, 'readme-link'));
  await writeFile(join(repo, '.gitignore'), '.flowtron/screenshots/\nnode_modules/\n');
  await gitQuiet(repo, 'add', '-A');
  await gitQuiet(repo, 'commit', '-q', '-m', `pin ${pinTag}`);
  return { name, repo, sub, preRename: true };
}

/** A tag one major above `tag` — a rename release guaranteed not to exist yet. */
function nextMajor(tag) {
  return `v${parseSemverTag(tag)[0] + 1}.0.0`;
}

describe('parseArgs / pure helpers', () => {
  it('parses --apply and --root', () => {
    assert.deepEqual(parseArgs([]), { apply: false, root: null });
    assert.deepEqual(parseArgs(['--apply']), { apply: true, root: null });
    assert.deepEqual(parseArgs(['--root', '/tmp/ws']), { apply: false, root: '/tmp/ws' });
    assert.deepEqual(parseArgs(['--apply', '--root', '/tmp/ws']), {
      apply: true,
      root: '/tmp/ws',
    });
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

  it('formatSkillsNote', () => {
    assert.equal(formatSkillsNote([]), '');
    assert.match(formatSkillsNote(['Claude .claude/']), /Claude \.claude\//);
    assert.match(
      formatSkillsNote(['Claude .claude/', 'Codex .agents/skills']),
      /Claude \.claude\/ and Codex \.agents\/skills/,
    );
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

describe('checkAdopter classification (fixtures)', () => {
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
    assert.equal(typeof result.skillsNote, 'string');
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
  it('finds .flaitron/core adopters and legacy layout', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-disc-'));
    const adopter = await makeAdopter(root, 'alpha', latest);
    const legacy = join(root, 'legacy-proj');
    await mkdir(join(legacy, '.flowtron', 'flowtron'), { recursive: true });
    const { adopters, legacy: legacyNames } = await discoverAdopters(root);
    assert.ok(adopters.some((a) => a.name === 'alpha' && a.repo === adopter.repo));
    assert.deepEqual(legacyNames, ['legacy-proj']);
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

describe('dry-run CLI (--root fixture)', () => {
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

  it('empty workspace prints no-adopters message', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-empty-'));
    const { stdout } = await runCli(['--root', root]);
    assert.match(stdout, /No \.flaitron\/core or \.flowtron\/core adopters found/);
    await rmTree(root);
  });

  // CORE-601 — a workspace with zero .flaitron/core adopters still reports
  // legacy-layout repos instead of the early return swallowing them.
  it('legacy-only workspace reports legacy repos, not just no-adopters', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-legacy-only-'));
    await mkdir(join(root, 'legacy-proj', '.flowtron', 'flowtron'), { recursive: true });
    const { stdout } = await runCli(['--root', root]);
    assert.match(stdout, /legacy-layout repos skipped.*legacy-proj/);
    assert.match(stdout, /No \.flaitron\/core or \.flowtron\/core adopters found/);
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
    assert.doesNotMatch(stdout, /No \.flaitron\/core or \.flowtron\/core adopters found/);
  });
});

describe('sandboxed --apply', () => {
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

  // CORE-490.3 — the bump commit is a pure gitlink move; adopter-authored
  // pre-commit/commit-msg hooks must not be able to block it.
  it('bumps past a rejecting pre-commit hook (--no-verify)', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-noverify-'));
    const adopter = await makeAdopter(root, 'hooked', previous);

    const hooks = join(adopter.repo, '.git', 'hooks');
    await mkdir(hooks, { recursive: true });
    await writeFile(join(hooks, 'pre-commit'), '#!/bin/sh\nexit 1\n', { mode: 0o755 });
    await gitQuiet(adopter.repo, 'config', 'core.hooksPath', hooks);

    const result = await checkAdopter(adopter, latest);
    assert.equal(result.status, 'bump');
    await applyBump({ ...adopter, current: result.current }, latest);

    assert.equal(await pinnedVersion(join(adopter.sub, 'SPEC.md')), latest);

    await rmTree(root);
  });

  // CORE-424.4 — mid-fleet apply failure must not abort the sweep or exit 0.
  it('continues past a mid-fleet bump failure, counts 1 failed, exits 1', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-midfail-'));
    // Alphabetical discover order: a-ok → b-fail → c-ok so failure is mid-fleet.
    await makeAdopter(root, 'a-ok', previous);
    const failing = await makeAdopter(root, 'b-fail', previous);
    await makeAdopter(root, 'c-ok', previous);

    // Guaranteed apply-path failure (same hook-injection shape as CORE-419.3, but
    // prepare-commit-msg rather than pre-commit — the bump commit now passes
    // --no-verify (CORE-490.3), which skips pre-commit/commit-msg but not this one).
    const hooks = join(failing.repo, '.git', 'hooks');
    await mkdir(hooks, { recursive: true });
    await writeFile(join(hooks, 'prepare-commit-msg'), '#!/bin/sh\nexit 1\n', { mode: 0o755 });
    await gitQuiet(failing.repo, 'config', 'core.hooksPath', hooks);

    const { code, stdout, stderr } = await runCli(['--apply', '--root', root], {
      expectFail: true,
      env: { FLAITRON_UPDATE_LATEST: latest },
    });

    assert.equal(code, 1);
    assert.match(stdout, /⬆ a-ok: bumped/);
    assert.match(stderr, /✗ b-fail: bump failed/);
    assert.match(stdout, /⬆ c-ok: bumped/);
    assert.match(stdout, /Summary:.*bumped 2 · 0 skipped · 1 failed/);

    await rmTree(root);
  });
});

describe('applyBump rollback (CORE-419.3)', () => {
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

  it('unstages the gitlink and restores the submodule when the commit fails', async () => {
    const root = await mkdtemp(join(tmpdir(), 'ft-upd-rb-commit-'));
    const adopter = await makeAdopter(root, 'commit-fail', previous);
    const priorSha = (await git(adopter.sub, 'rev-parse', 'HEAD')).trim();
    const headBefore = (await git(adopter.repo, 'rev-parse', 'HEAD')).trim();

    // Fail at the last step — after `git add` staged the gitlink — so both halves
    // of the rollback have to run. core.hooksPath is pinned explicitly so a global
    // override on the host cannot silently disarm the injection. prepare-commit-msg
    // rather than pre-commit — the bump commit passes --no-verify (CORE-490.3),
    // which skips pre-commit/commit-msg but not this one.
    const hooks = join(adopter.repo, '.git', 'hooks');
    await mkdir(hooks, { recursive: true });
    await writeFile(join(hooks, 'prepare-commit-msg'), '#!/bin/sh\nexit 1\n', { mode: 0o755 });
    await gitQuiet(adopter.repo, 'config', 'core.hooksPath', hooks);

    await assert.rejects(() => applyBump({ ...adopter, current: previous }, latest));

    assert.equal((await git(adopter.sub, 'rev-parse', 'HEAD')).trim(), priorSha);
    assert.equal((await git(adopter.repo, 'diff', '--cached', '--name-only')).trim(), '');
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

describe('rename migration helpers (CORE-711.3)', () => {
  it('renamedDirSegments rewrites every .flowtron path segment, nothing else', () => {
    assert.equal(
      renamedDirSegments('../../.flowtron/core/claude/skills/ft-task'),
      '../../.flaitron/core/claude/skills/ft-task',
    );
    assert.equal(renamedDirSegments('../.flowtron'), '../.flaitron');
    assert.equal(renamedDirSegments('.flowtron/core/.flowtron/x'), '.flaitron/core/.flaitron/x');
    assert.equal(
      renamedDirSegments('# shots (`.flowtron/screenshots/`)\n.flowtron/screenshots/\n!/.flowtron/keep\n'),
      '# shots (`.flaitron/screenshots/`)\n.flaitron/screenshots/\n!/.flaitron/keep\n',
    );
    assert.equal(renamedDirSegments('README.md'), null);
    assert.equal(renamedDirSegments('../flowtron/x'), null);
    assert.equal(renamedDirSegments('../.flowtron-old/x'), null);
    assert.equal(renamedDirSegments('my.flowtron/x'), null);
  });

  it('renamedRemoteUrl renames only a trailing flowtron repo segment', () => {
    assert.equal(renamedRemoteUrl(PRE_RENAME_URL), RENAMED_URL);
    assert.equal(
      renamedRemoteUrl('git@github.com:fakeneuron/flowtron.git'),
      'git@github.com:fakeneuron/flaitron.git',
    );
    assert.equal(
      renamedRemoteUrl('https://github.com/fakeneuron/flowtron'),
      'https://github.com/fakeneuron/flaitron',
    );
    assert.equal(
      renamedRemoteUrl('https://example.com/myflowtron.git'),
      'https://example.com/myflowtron.git',
    );
  });
});

describe('rename migration (CORE-711.3)', () => {
  let root;

  before(async () => {
    root = await mkdtemp(join(tmpdir(), 'ft-upd-mig-'));
  });

  after(async () => {
    await rmTree(root);
  });

  it('discoverAdopters flags a pre-rename adopter', async () => {
    const ws = await mkdtemp(join(tmpdir(), 'ft-upd-mig-disc-'));
    try {
      await makePreRenameAdopter(ws, 'old-layout', latest);
      await makeAdopter(ws, 'new-layout', latest);
      const { adopters } = await discoverAdopters(ws);
      assert.equal(adopters.find((a) => a.name === 'old-layout')?.preRename, true);
      assert.equal(adopters.find((a) => a.name === 'new-layout')?.preRename, undefined);
    } finally {
      await rmTree(ws);
    }
  });

  it('migrate: pre-rename adopter once latest reaches the rename tag', async () => {
    const adopter = await makePreRenameAdopter(root, 'classify-migrate', previous);
    const result = await checkAdopter(adopter, latest, { renameTag: latest });
    assert.equal(result.status, 'migrate');
    assert.equal(result.current, previous);
    assert.equal(typeof result.skillsNote, 'string');
  });

  it('skip: latest below the rename tag', async () => {
    const adopter = await makePreRenameAdopter(root, 'below-floor', previous);
    const renameTag = nextMajor(latest);
    const result = await checkAdopter(adopter, latest, { renameTag });
    assert.equal(result.status, 'skip');
    assert.match(result.reason, /still on \.flowtron\//);
    assert.match(result.reason, new RegExp(`needs ${renameTag.replace(/\./g, '\\.')} or later`));
  });

  it('skip: .flaitron/ already exists alongside .flowtron/', async () => {
    const adopter = await makePreRenameAdopter(root, 'both-layouts', previous);
    await mkdir(join(adopter.repo, '.flaitron'));
    const result = await checkAdopter(adopter, latest, { renameTag: latest });
    assert.equal(result.status, 'skip');
    assert.match(result.reason, /\.flaitron\/ already exists/);
  });

  // v5.0.0 is a real BREAKING release, so it stands in for the rename tag:
  // v4.5.0..v5.0.0 is exactly [v5.0.0].
  it('lift is scoped: only the rename tag, and only for a pre-rename adopter', async () => {
    const pre = await makePreRenameAdopter(root, 'lift-pre', 'v4.5.0');
    const lifted = await checkAdopter(pre, 'v5.0.0', { renameTag: 'v5.0.0' });
    assert.equal(lifted.status, 'migrate');

    // Same range, but v5.0.0 is not the rename tag → still blocks.
    const notRename = await checkAdopter(pre, 'v5.0.0', { renameTag: 'v4.5.0' });
    assert.equal(notRename.status, 'skip');
    assert.match(notRename.reason, /migration-bearing release\(s\) in range: v5\.0\.0/);

    // Same range and rename tag, but an already-renamed adopter gets no lift.
    const renamed = await makeAdopter(root, 'lift-renamed', 'v4.5.0');
    const plain = await checkAdopter(renamed, 'v5.0.0', { renameTag: 'v5.0.0' });
    assert.equal(plain.status, 'skip');
    assert.match(plain.reason, /migration-bearing.*v5\.0\.0/);
  });

  it('apply: one commit moves the layout, renames the submodule, re-points links', async () => {
    const adopter = await makePreRenameAdopter(root, 'apply-migrate', previous);
    const { repo } = adopter;
    await writeFile(join(repo, '.flowtron', 'notes.txt'), 'untracked\n');
    await writeFile(join(repo, 'unrelated.txt'), 'keep out\n');
    await mkdir(join(repo, '.flowtron', 'screenshots'));
    await writeFile(join(repo, '.flowtron', 'screenshots', 'shot.png'), 'png\n');
    const headBefore = (await git(repo, 'rev-parse', 'HEAD')).trim();

    const result = await checkAdopter(adopter, latest, { renameTag: latest });
    assert.equal(result.status, 'migrate');
    await applyMigrate({ ...adopter, current: result.current }, latest);

    // Exactly one new commit, carrying the migration.
    assert.equal((await git(repo, 'rev-parse', 'HEAD~1')).trim(), headBefore);
    const msg = (await git(repo, 'log', '-1', '--format=%s')).trim();
    assert.equal(msg, `chore: migrate .flowtron → .flaitron, bump flaitron ${previous} → ${latest}`);

    // Layout: the whole dir moved, untracked contents included.
    assert.equal(await exists(join(repo, '.flowtron')), false);
    assert.equal(await readFile(join(repo, '.flaitron', 'PLAN.md'), 'utf8'), '# Plan\n');
    assert.equal(await readFile(join(repo, '.flaitron', 'notes.txt'), 'utf8'), 'untracked\n');

    // Submodule renamed end to end: name, path, url, gitdir, gitfile, config.
    const gitmodules = await readFile(join(repo, '.gitmodules'), 'utf8');
    assert.match(gitmodules, /\[submodule "\.flaitron\/core"\]/);
    assert.match(gitmodules, /path = \.flaitron\/core/);
    assert.match(gitmodules, new RegExp(`url = ${RENAMED_URL.replace(/\./g, '\\.')}`));
    assert.doesNotMatch(gitmodules, /flowtron/);
    assert.equal(await exists(join(repo, '.git', 'modules', '.flaitron', 'core')), true);
    assert.equal(await exists(join(repo, '.git', 'modules', '.flowtron')), false);
    assert.equal(
      await readFile(join(repo, SUBMODULE_PATH, '.git'), 'utf8'),
      'gitdir: ../../.git/modules/.flaitron/core\n',
    );
    assert.doesNotMatch(await readFile(join(repo, '.git', 'config'), 'utf8'), /\.flowtron/);
    assert.equal(
      (await git(repo, 'config', `submodule.${SUBMODULE_PATH}.url`)).trim(),
      RENAMED_URL,
    );
    assert.equal(
      (await git(join(repo, SUBMODULE_PATH), 'remote', 'get-url', 'origin')).trim(),
      RENAMED_URL,
    );
    const latestSha = (await git(FLAITRON_REPO, 'rev-parse', `${latest}^{commit}`)).trim();
    assert.equal(
      (await git(repo, 'submodule', 'status')).trimEnd(),
      ` ${latestSha} ${SUBMODULE_PATH} (${latest})`,
    );
    assert.equal((await git(repo, 'rev-parse', `HEAD:${SUBMODULE_PATH}`)).trim(), latestSha);

    // Links through .flowtron/ re-pointed (and resolving); the unrelated one untouched.
    const skillLink = join(repo, '.claude', 'skills', 'ft-task');
    assert.equal(await readlink(skillLink), '../../.flaitron/core/claude/skills/ft-task');
    assert.ok((await stat(skillLink)).isDirectory());
    assert.equal(await readlink(join(repo, 'vault', 'flowtron')), '../.flaitron');
    assert.equal(await readlink(join(repo, 'readme-link')), 'README.md');

    // Ignore rules follow the move, so the moved screenshot stays ignored.
    assert.equal(
      await git(repo, 'show', 'HEAD:.gitignore'),
      '.flaitron/screenshots/\nnode_modules/\n',
    );
    assert.equal(await readFile(join(repo, '.flaitron', 'screenshots', 'shot.png'), 'utf8'), 'png\n');

    // Nothing unrelated landed; nothing the migration touched is left unstaged
    // (and the ignored screenshot does not resurface as untracked).
    const status = (await git(repo, 'status', '--porcelain')).trim().split('\n').sort();
    assert.deepEqual(status, ['?? .flaitron/notes.txt', '?? unrelated.txt']);

    // The result is an ordinary, current renamed adopter.
    const recheck = await checkAdopter({ name: adopter.name, repo }, latest);
    assert.equal(recheck.status, 'current');
  });

  it('rollback: a rejected commit restores the exact pre-migrate repo', async () => {
    const adopter = await makePreRenameAdopter(root, 'migrate-rollback', previous);
    const { repo, sub } = adopter;
    await writeFile(join(repo, '.flowtron', 'notes.txt'), 'untracked\n');
    // Fail at the very last step so every undo has to run. prepare-commit-msg,
    // not pre-commit — the migrate commit passes --no-verify.
    const hooks = join(repo, '.git', 'hooks');
    await mkdir(hooks, { recursive: true });
    await writeFile(join(hooks, 'prepare-commit-msg'), '#!/bin/sh\nexit 1\n', { mode: 0o755 });
    await gitQuiet(repo, 'config', 'core.hooksPath', hooks);

    const snapshot = async () => ({
      head: (await git(repo, 'rev-parse', 'HEAD')).trim(),
      subHead: (await git(sub, 'rev-parse', 'HEAD')).trim(),
      gitmodules: await readFile(join(repo, '.gitmodules'), 'utf8'),
      config: await readFile(join(repo, '.git', 'config'), 'utf8'),
      gitfile: await readFile(join(sub, '.git'), 'utf8'),
      moduleConfig: await readFile(join(repo, '.git', 'modules', '.flowtron', 'core', 'config'), 'utf8'),
      skillLink: await readlink(join(repo, '.claude', 'skills', 'ft-task')),
      dirLink: await readlink(join(repo, 'vault', 'flowtron')),
      gitignore: await readFile(join(repo, '.gitignore'), 'utf8'),
      status: await git(repo, 'status', '--porcelain'),
      submoduleStatus: await git(repo, 'submodule', 'status'),
    });
    const before = await snapshot();

    await assert.rejects(
      () => applyMigrate({ ...adopter, current: previous }, latest),
      (e) => {
        assert.doesNotMatch(e.message, /rollback incomplete/);
        return true;
      },
    );

    assert.deepEqual(await snapshot(), before);
    assert.equal(await exists(join(repo, '.flaitron')), false);
    assert.equal(await exists(join(repo, '.git', 'modules', '.flaitron')), false);
    assert.equal(await readFile(join(repo, '.flowtron', 'notes.txt'), 'utf8'), 'untracked\n');
  });

  it('apply: a .gitignore with unstaged edits is rewritten in place but kept out of the commit', async () => {
    const adopter = await makePreRenameAdopter(root, 'dirty-gitignore', previous);
    const { repo } = adopter;
    await writeFile(join(repo, '.gitignore'), '.flowtron/screenshots/\nnode_modules/\nmine/\n');

    await applyMigrate({ ...adopter, current: previous }, latest);

    assert.equal(
      await readFile(join(repo, '.gitignore'), 'utf8'),
      '.flaitron/screenshots/\nnode_modules/\nmine/\n',
    );
    assert.equal(
      await git(repo, 'show', 'HEAD:.gitignore'),
      '.flowtron/screenshots/\nnode_modules/\n',
    );
    assert.equal((await git(repo, 'status', '--porcelain')).trim(), 'M .gitignore');
  });

  it('dry-run CLI reports a pre-rename adopter by where latest sits against RENAME_TAG', async () => {
    const ws = await mkdtemp(join(tmpdir(), 'ft-upd-mig-cli-'));
    try {
      await makePreRenameAdopter(ws, 'cli-pre', previous);
      const { stdout } = await runCli(['--root', ws], {
        env: { FLAITRON_UPDATE_LATEST: latest },
      });
      // Self-healing like the fixture pair: before the rename release ships the
      // fixture `latest` sits below it; once a later all-clear release exists it won't.
      if (compareSemver(parseSemverTag(latest), parseSemverTag(RENAME_TAG)) < 0) {
        assert.match(
          stdout,
          /⏭ cli-pre \(v[\d.]+\): skipped — still on \.flowtron\/ — the move to \.flaitron\/ needs v6\.0\.0 or later/,
        );
      } else {
        assert.match(stdout, /⬆ cli-pre: would migrate \.flowtron\/ → \.flaitron\/ and bump/);
      }
    } finally {
      await rmTree(ws);
    }
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

  it('cachedNewSkillWiringSurfaces returns the exact same promise for a repeated pair', async () => {
    const p1 = cachedNewSkillWiringSurfaces(previous, latest);
    const p2 = cachedNewSkillWiringSurfaces(previous, latest);
    assert.equal(p1, p2, 'repeated (fromTag, toTag) call must reuse the in-flight/cached promise');
    assert.deepEqual(await p1, await p2);
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
