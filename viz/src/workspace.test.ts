import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { execFile } from 'node:child_process';
import { mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { discoverProjects, latestReleaseTag, workspaceRoot } from './workspace';

const execFileAsync = promisify(execFile);

let root: string;
let outside: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'flaitron-viz-workspace-'));
  outside = await mkdtemp(join(tmpdir(), 'flaitron-viz-outside-'));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
  await rm(outside, { recursive: true, force: true });
});

async function makeAdopter(
  name: string,
  opts: { withTasknoteDir?: boolean } = {},
): Promise<void> {
  const projectDir = join(root, name, '.flaitron');
  await mkdir(projectDir, { recursive: true });
  await writeFile(join(projectDir, 'PLAN.md'), `## High\n\n- [ ] **${name.toUpperCase()}-001** — seed\n`);
  if (opts.withTasknoteDir ?? true) {
    await mkdir(join(projectDir, 'tasknote'), { recursive: true });
  }
}

async function makeNonAdopterDir(name: string): Promise<void> {
  await mkdir(join(root, name), { recursive: true });
}

describe('discoverProjects', () => {
  it('finds dirs with .flaitron/PLAN.md and skips others', async () => {
    await makeAdopter('alpha');
    await makeAdopter('beta');
    await makeNonAdopterDir('gamma');
    await makeNonAdopterDir('node_modules');

    const projects = await discoverProjects(root);

    expect(projects.map((p) => p.name)).toEqual(['alpha', 'beta']);
  });

  it('returns sorted, fully-resolved descriptors', async () => {
    await makeAdopter('zulu');
    await makeAdopter('alpha');
    await makeAdopter('mike');

    const projects = await discoverProjects(root);

    expect(projects.map((p) => p.name)).toEqual(['alpha', 'mike', 'zulu']);
    expect(projects[0]).toEqual({
      name: 'alpha',
      root: join(root, 'alpha'),
      planPath: join(root, 'alpha', '.flaitron', 'PLAN.md'),
      planArchivePath: join(root, 'alpha', '.flaitron', 'PLAN-ARCHIVE.md'),
      tasknoteDir: join(root, 'alpha', '.flaitron', 'tasknote'),
      archiveDir: join(root, 'alpha', '.flaitron', 'tasknote', 'archive'),
      flaitronVersion: null,
    });
  });

  it('still returns a project that has PLAN.md but no tasknote dir', async () => {
    await makeAdopter('lonely', { withTasknoteDir: false });

    const projects = await discoverProjects(root);

    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe('lonely');
    expect(projects[0].tasknoteDir).toBe(join(root, 'lonely', '.flaitron', 'tasknote'));
  });

  it('skips dotfiles and dot-dirs', async () => {
    await makeAdopter('visible');
    await mkdir(join(root, '.hidden', '.flaitron'), { recursive: true });
    await writeFile(join(root, '.hidden', '.flaitron', 'PLAN.md'), '## High\n');

    const projects = await discoverProjects(root);

    expect(projects.map((p) => p.name)).toEqual(['visible']);
  });

  it('returns empty array if workspace root does not exist', async () => {
    const projects = await discoverProjects(join(root, 'does-not-exist'));
    expect(projects).toEqual([]);
  });

  it('drops a project whose PLAN.md resolves outside the project root', async () => {
    await makeAdopter('honest');
    const secret = join(outside, 'secret.md');
    await writeFile(secret, '## High\n\n- [ ] **SECRET-001** — leaked\n');
    await mkdir(join(root, 'escaper', '.flaitron'), { recursive: true });
    await symlink(secret, join(root, 'escaper', '.flaitron', 'PLAN.md'));

    const projects = await discoverProjects(root);

    expect(projects.map((p) => p.name)).toEqual(['honest']);
  });

  it('drops a project whose .flaitron dir resolves outside the project root', async () => {
    await makeAdopter('honest');
    await mkdir(join(outside, 'stash'), { recursive: true });
    await writeFile(join(outside, 'stash', 'PLAN.md'), '## High\n');
    await mkdir(join(root, 'escaper'), { recursive: true });
    await symlink(join(outside, 'stash'), join(root, 'escaper', '.flaitron'));

    const projects = await discoverProjects(root);

    expect(projects.map((p) => p.name)).toEqual(['honest']);
  });

  it('still discovers a project whose root is itself a symlink', async () => {
    const realProject = join(outside, 'linked-adopter');
    await mkdir(join(realProject, '.flaitron', 'tasknote'), { recursive: true });
    await writeFile(join(realProject, '.flaitron', 'PLAN.md'), '## High\n');
    await symlink(realProject, join(root, 'linked'));

    const projects = await discoverProjects(root);

    expect(projects.map((p) => p.name)).toEqual(['linked']);
    expect(projects[0].root).toBe(join(root, 'linked'));
    expect(projects[0].planPath).toBe(join(root, 'linked', '.flaitron', 'PLAN.md'));
  });
});

describe('latestReleaseTag', () => {
  async function git(cwd: string, ...args: string[]): Promise<void> {
    await execFileAsync('git', args, { cwd });
  }

  async function makeTaggedRepo(tags: string[]): Promise<string> {
    const repo = join(root, 'tagged-repo');
    await mkdir(repo, { recursive: true });
    await git(repo, 'init', '--quiet');
    await writeFile(join(repo, 'seed.txt'), 'seed\n');
    await git(repo, 'add', 'seed.txt');
    await git(
      repo,
      '-c',
      'user.name=test',
      '-c',
      'user.email=test@example.com',
      'commit',
      '--quiet',
      '-m',
      'seed',
    );
    for (const tag of tags) await git(repo, 'tag', tag);
    return repo;
  }

  it('returns the highest semver tag', async () => {
    const repo = await makeTaggedRepo(['v0.9.0', 'v0.10.0', 'v0.2.1']);
    expect(await latestReleaseTag(repo)).toBe('v0.10.0');
  });

  it('ignores non-semver tags', async () => {
    const repo = await makeTaggedRepo(['legacy-v0', 'tmp-test', 'v1.2.3']);
    expect(await latestReleaseTag(repo)).toBe('v1.2.3');
  });

  it('returns null for a repo with no tags', async () => {
    const repo = await makeTaggedRepo([]);
    expect(await latestReleaseTag(repo)).toBeNull();
  });

  it('returns null when the dir is not inside a git repo', async () => {
    const bare = join(root, 'not-a-repo');
    await mkdir(bare, { recursive: true });
    expect(await latestReleaseTag(bare)).toBeNull();
  });
});

describe('workspaceRoot', () => {
  it('uses FLAITRON_VIZ_WORKSPACE when set', () => {
    expect(workspaceRoot({ FLAITRON_VIZ_WORKSPACE: '/custom/path' })).toBe('/custom/path');
  });

  it('expands a leading ~ in the env value', () => {
    const out = workspaceRoot({ FLAITRON_VIZ_WORKSPACE: '~/projects' });
    expect(out.startsWith('/')).toBe(true);
    expect(out.endsWith('/projects')).toBe(true);
    expect(out).not.toContain('~');
  });

  it('defaults to ~/code (expanded) when env var is unset or empty', () => {
    const unset = workspaceRoot({});
    expect(unset.endsWith('/code')).toBe(true);
    expect(unset).not.toContain('~');

    const empty = workspaceRoot({ FLAITRON_VIZ_WORKSPACE: '' });
    expect(empty).toBe(unset);
  });
});
