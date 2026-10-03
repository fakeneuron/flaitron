import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createArchiveCache } from './archiveCache';
import type { ProjectDescriptor } from './workspace';

let root: string;
let outside: string;

beforeEach(async () => {
  root = await mkdtemp(join(tmpdir(), 'flaitron-viz-archive-cache-'));
  outside = await mkdtemp(join(tmpdir(), 'flaitron-viz-archive-outside-'));
});

afterEach(async () => {
  await rm(root, { recursive: true, force: true });
  await rm(outside, { recursive: true, force: true });
});

async function makeProject(
  name: string,
  files: Record<string, string> = {},
): Promise<ProjectDescriptor> {
  const projectRoot = join(root, name);
  const projectDir = join(projectRoot, '.flaitron');
  const tasknoteDir = join(projectDir, 'tasknote');
  const archiveDir = join(tasknoteDir, 'archive');
  await mkdir(archiveDir, { recursive: true });
  for (const [relPath, content] of Object.entries(files)) {
    const fullPath = join(archiveDir, relPath);
    await mkdir(join(fullPath, '..'), { recursive: true });
    await writeFile(fullPath, content);
  }
  return {
    name,
    root: projectRoot,
    planPath: join(projectDir, 'PLAN.md'),
    planArchivePath: join(projectDir, 'PLAN-ARCHIVE.md'),
    tasknoteDir,
    archiveDir,
    flaitronVersion: null,
  };
}

function tasknote(id: string, title: string): string {
  return `---
title: ${title}
status: completed
created: 2026-05-10
---

# ${id} | ${title}
`;
}

describe('createArchiveCache', () => {
  it('cold-populates and returns parsed tasknotes', async () => {
    const project = await makeProject('alpha', {
      'frontend/FE-001.md': tasknote('FE-001', 'one'),
      'core/CORE-001.md': tasknote('CORE-001', 'two'),
    });
    const cache = createArchiveCache();

    const result = await cache.get(project);

    expect(result).toHaveLength(2);
    expect(result.map((t) => t.id).sort()).toEqual(['CORE-001', 'FE-001']);
  });

  it('returns empty array for project with no archive dir', async () => {
    const project: ProjectDescriptor = {
      name: 'empty',
      root: join(root, 'empty'),
      planPath: join(root, 'empty', '.flaitron', 'PLAN.md'),
      planArchivePath: join(root, 'empty', '.flaitron', 'PLAN-ARCHIVE.md'),
      tasknoteDir: join(root, 'empty', '.flaitron', 'tasknote'),
      archiveDir: join(root, 'empty', '.flaitron', 'tasknote', 'archive'),
      flaitronVersion: null,
    };
    const cache = createArchiveCache();

    await expect(cache.get(project)).resolves.toEqual([]);
  });

  it('serves second call from cache without re-reading files', async () => {
    const project = await makeProject('alpha', {
      'frontend/FE-001.md': tasknote('FE-001', 'original'),
    });
    const cache = createArchiveCache();

    const first = await cache.get(project);
    await writeFile(
      join(project.archiveDir, 'frontend', 'FE-001.md'),
      tasknote('FE-001', 'mutated'),
    );
    const second = await cache.get(project);

    expect(second).toBe(first);
    expect(second[0].frontmatter?.title).toBe('original');
  });

  it('returns the same in-flight promise to concurrent first-time callers', async () => {
    const project = await makeProject('alpha', {
      'frontend/FE-001.md': tasknote('FE-001', 'one'),
    });
    const cache = createArchiveCache();

    const p1 = cache.get(project);
    const p2 = cache.get(project);

    expect(p1).toBe(p2);
    const [r1, r2] = await Promise.all([p1, p2]);
    expect(r1).toBe(r2);
  });

  it('invalidate() drops the matching project cache and the next get() re-reads', async () => {
    const project = await makeProject('alpha', {
      'frontend/FE-001.md': tasknote('FE-001', 'original'),
    });
    const cache = createArchiveCache();

    await cache.get(project);
    await writeFile(
      join(project.archiveDir, 'frontend', 'FE-001.md'),
      tasknote('FE-001', 'mutated'),
    );
    const hit = cache.invalidate(join(project.archiveDir, 'frontend', 'FE-001.md'), [project]);
    const after = await cache.get(project);

    expect(hit).toBe(true);
    expect(after[0].frontmatter?.title).toBe('mutated');
  });

  it('invalidate() returns false for filepaths outside any archive dir', async () => {
    const project = await makeProject('alpha', {
      'frontend/FE-001.md': tasknote('FE-001', 'one'),
    });
    const cache = createArchiveCache();

    const first = await cache.get(project);
    const hit = cache.invalidate(join(project.tasknoteDir, 'FE-002.md'), [project]);
    const second = await cache.get(project);

    expect(hit).toBe(false);
    expect(second).toBe(first);
  });

  it('invalidate() returns false for a sibling path that string-prefixes archiveDir without being inside it', async () => {
    const project = await makeProject('alpha', {
      'frontend/FE-001.md': tasknote('FE-001', 'one'),
    });
    const cache = createArchiveCache();

    const first = await cache.get(project);
    const hit = cache.invalidate(`${project.archiveDir}-other/FE-002.md`, [project]);
    const second = await cache.get(project);

    expect(hit).toBe(false);
    expect(second).toBe(first);
  });

  it('invalidateProject() drops that project and leaves others intact', async () => {
    const a = await makeProject('alpha', { 'frontend/FE-001.md': tasknote('FE-001', 'a') });
    const b = await makeProject('beta', { 'frontend/FE-001.md': tasknote('FE-001', 'b') });
    const cache = createArchiveCache();

    const aFirst = await cache.get(a);
    const bFirst = await cache.get(b);
    const hit = cache.invalidateProject(a.name);
    const aAfter = await cache.get(a);
    const bAfter = await cache.get(b);

    expect(hit).toBe(true);
    expect(aAfter).not.toBe(aFirst);
    expect(bAfter).toBe(bFirst);
  });

  it('invalidateProject() returns false for an unknown name', () => {
    const cache = createArchiveCache();
    expect(cache.invalidateProject('missing')).toBe(false);
  });

  it('invalidate() is per-project: dropping A does not flush B', async () => {
    const a = await makeProject('alpha', { 'frontend/FE-001.md': tasknote('FE-001', 'a') });
    const b = await makeProject('beta', { 'frontend/FE-001.md': tasknote('FE-001', 'b') });
    const cache = createArchiveCache();

    const aFirst = await cache.get(a);
    const bFirst = await cache.get(b);
    cache.invalidate(join(a.archiveDir, 'frontend', 'FE-001.md'), [a, b]);
    const aAfter = await cache.get(a);
    const bAfter = await cache.get(b);

    expect(aAfter).not.toBe(aFirst);
    expect(bAfter).toBe(bFirst);
  });

  it('drops files with malformed frontmatter and returns the rest', async () => {
    const project = await makeProject('alpha', {
      'frontend/FE-001.md': tasknote('FE-001', 'good-one'),
      'frontend/FE-002.md': '---\nkey:\n\tdrops-good-rest\n---\nbody\n',
      'core/CORE-001.md': tasknote('CORE-001', 'good-two'),
    });
    const cache = createArchiveCache();

    const result = await cache.get(project);

    expect(result.map((t) => t.id).sort()).toEqual(['CORE-001', 'FE-001']);
  });

  it('recovers a dropped malformed file once it is fixed and the cache invalidates', async () => {
    const project = await makeProject('alpha', {
      'frontend/FE-001.md': '---\nkey: [unclosed-recovers-fixed\n---\nbody\n',
    });
    const cache = createArchiveCache();

    const first = await cache.get(project);
    expect(first).toEqual([]);

    await writeFile(
      join(project.archiveDir, 'frontend', 'FE-001.md'),
      tasknote('FE-001', 'recovered'),
    );
    cache.invalidate(join(project.archiveDir, 'frontend', 'FE-001.md'), [project]);
    const second = await cache.get(project);

    expect(second).toHaveLength(1);
    expect(second[0].frontmatter?.title).toBe('recovered');
  });

  it('drops archive files that resolve outside the project root', async () => {
    // The archive dir itself is the symlink — the dirent `isFile()` filter
    // cannot see this, only realpath containment against the root can.
    const stash = join(outside, 'stash', 'core');
    await mkdir(stash, { recursive: true });
    await writeFile(join(stash, 'SECRET-001.md'), tasknote('SECRET-001', 'leaked'));
    const projectRoot = join(root, 'escaper');
    const tasknoteDir = join(projectRoot, '.flaitron', 'tasknote');
    await mkdir(tasknoteDir, { recursive: true });
    await symlink(join(outside, 'stash'), join(tasknoteDir, 'archive'));
    const project: ProjectDescriptor = {
      name: 'escaper',
      root: projectRoot,
      planPath: join(projectRoot, '.flaitron', 'PLAN.md'),
      planArchivePath: join(projectRoot, '.flaitron', 'PLAN-ARCHIVE.md'),
      tasknoteDir,
      archiveDir: join(tasknoteDir, 'archive'),
      flaitronVersion: null,
    };

    expect(await createArchiveCache().get(project)).toEqual([]);
  });

  it('still reads archives under a symlinked project root', async () => {
    const realProject = join(outside, 'linked-adopter');
    const archiveDir = join(realProject, '.flaitron', 'tasknote', 'archive');
    await mkdir(join(archiveDir, 'core'), { recursive: true });
    await writeFile(join(archiveDir, 'core', 'CORE-001.md'), tasknote('CORE-001', 'kept'));
    const linkedRoot = join(root, 'linked');
    await symlink(realProject, linkedRoot);
    const project: ProjectDescriptor = {
      name: 'linked',
      root: linkedRoot,
      planPath: join(linkedRoot, '.flaitron', 'PLAN.md'),
      planArchivePath: join(linkedRoot, '.flaitron', 'PLAN-ARCHIVE.md'),
      tasknoteDir: join(linkedRoot, '.flaitron', 'tasknote'),
      archiveDir: join(linkedRoot, '.flaitron', 'tasknote', 'archive'),
      flaitronVersion: null,
    };

    const notes = await createArchiveCache().get(project);

    expect(notes.map((t) => t.id)).toEqual(['CORE-001']);
  });

  it('evicts the least-recently-used project once more than 5 are cached', async () => {
    const cache = createArchiveCache();
    const projects = await Promise.all(
      ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'].map((name) =>
        makeProject(name, { [`frontend/FE-${name}.md`]: tasknote(`FE-${name}`, name) }),
      ),
    );
    const firsts = [];
    for (const project of projects) firsts.push(await cache.get(project));

    // p1 was the least-recently touched when p6 (the 6th distinct project)
    // was inserted, so it should have been evicted; the next get() re-reads.
    const p1Again = await cache.get(projects[0]);
    expect(p1Again).not.toBe(firsts[0]);
    // p6 (most recently inserted) and p2..p5 stay cached.
    const p6Again = await cache.get(projects[5]);
    expect(p6Again).toBe(firsts[5]);
  });

  it('get() touches a project, protecting it from being the next eviction', async () => {
    const cache = createArchiveCache();
    const projects = await Promise.all(
      ['p1', 'p2', 'p3', 'p4', 'p5'].map((name) =>
        makeProject(name, { [`frontend/FE-${name}.md`]: tasknote(`FE-${name}`, name) }),
      ),
    );
    const firsts = [];
    for (const project of projects) firsts.push(await cache.get(project));

    // Touch p1 so p2 becomes the least-recently-used instead.
    await cache.get(projects[0]);
    const p6 = await makeProject('p6', { 'frontend/FE-p6.md': tasknote('FE-p6', 'p6') });
    await cache.get(p6);

    const p1Again = await cache.get(projects[0]);
    expect(p1Again).toBe(firsts[0]);
    const p2Again = await cache.get(projects[1]);
    expect(p2Again).not.toBe(firsts[1]);
  });

  it('clear() drops every cached project', async () => {
    const a = await makeProject('alpha', { 'frontend/FE-001.md': tasknote('FE-001', 'a') });
    const b = await makeProject('beta', { 'frontend/FE-001.md': tasknote('FE-001', 'b') });
    const cache = createArchiveCache();

    const aFirst = await cache.get(a);
    const bFirst = await cache.get(b);
    cache.clear();
    const aAfter = await cache.get(a);
    const bAfter = await cache.get(b);

    expect(aAfter).not.toBe(aFirst);
    expect(bAfter).not.toBe(bFirst);
  });
});
