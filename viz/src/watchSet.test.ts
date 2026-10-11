import { describe, expect, it } from 'vitest';
import { join } from 'node:path';
import { projectForActiveTasknote, projectForPath, watchRoots } from './watchSet';
import type { ProjectDescriptor } from './workspace';

function project(name: string, root: string): ProjectDescriptor {
  const flaitron = join(root, name, '.flaitron');
  const tasknoteDir = join(flaitron, 'tasknote');
  return {
    name,
    root: join(root, name),
    planPath: join(flaitron, 'PLAN.md'),
    planArchivePath: join(flaitron, 'PLAN-ARCHIVE.md'),
    tasknoteDir,
    archiveDir: join(tasknoteDir, 'archive'),
    flaitronVersion: null,
  };
}

describe('watchRoots', () => {
  it("returns each project's .flaitron/ dir — present even before tasknote/ exists", () => {
    const alpha = project('alpha', '/ws');
    const beta = project('beta', '/ws');

    expect(watchRoots([alpha, beta])).toEqual([join('/ws', 'alpha', '.flaitron'), join('/ws', 'beta', '.flaitron')]);
  });

  it('returns no roots for no projects', () => {
    expect(watchRoots([])).toEqual([]);
  });

  // chokidar 4 removed glob support, so v5 reads every watch path literally.
  // Escaping glob metacharacters would corrupt such a path.
  it('leaves glob metacharacters in project paths untouched (chokidar 5)', () => {
    const bracketed = project('foo[wip]', '/ws');
    const [root] = watchRoots([bracketed]);

    expect(root).toContain('foo[wip]');
    expect(root).not.toContain('\\[');
  });
});

describe('projectForActiveTasknote', () => {
  const alpha = project('alpha', '/ws');
  const beta = project('beta', '/ws');
  const projects = [alpha, beta];

  it('matches a file directly in tasknoteDir', () => {
    expect(projectForActiveTasknote(join(alpha.tasknoteDir, 'CORE-001.md'), projects)).toBe(alpha);
  });

  it('does not match archive files (one extra dirname level)', () => {
    const archived = join(alpha.archiveDir, 'core', 'CORE-001.md');
    expect(projectForActiveTasknote(archived, projects)).toBeUndefined();
  });

  it('does not match PLAN.md', () => {
    expect(projectForActiveTasknote(alpha.planPath, projects)).toBeUndefined();
  });

  it('is per-project', () => {
    expect(projectForActiveTasknote(join(beta.tasknoteDir, 'FE-001.md'), projects)).toBe(beta);
  });
});

describe('projectForPath', () => {
  const alpha = project('alpha', '/ws');
  const beta = project('beta', '/ws');
  const projects = [alpha, beta];

  it('matches PLAN.md, active tasknotes, and archive files', () => {
    expect(projectForPath(alpha.planPath, projects)?.project).toBe(alpha);
    expect(projectForPath(join(alpha.tasknoteDir, 'CORE-001.md'), projects)?.project).toBe(alpha);
    expect(projectForPath(join(alpha.archiveDir, 'core', 'CORE-001.md'), projects)?.project).toBe(
      alpha,
    );
  });

  // The scope is what lets a client refetch one endpoint instead of four.
  // `plan` covers /api/plan and /api/plan-archive together.
  it('reports which kind of watched path fired', () => {
    expect(projectForPath(alpha.planPath, projects)?.scope).toBe('plan');
    expect(projectForPath(join(alpha.tasknoteDir, 'CORE-001.md'), projects)?.scope).toBe('active');
    expect(projectForPath(join(alpha.archiveDir, 'core', 'CORE-001.md'), projects)?.scope).toBe(
      'archive',
    );
  });

  // archiveDir is tasknoteDir/archive, so the active test (dirname equality)
  // must not swallow archive files even though it runs first.
  it('does not misread an archive file as an active tasknote', () => {
    expect(projectForPath(join(alpha.archiveDir, 'fe', 'FE-001.md'), projects)?.scope).toBe(
      'archive',
    );
  });

  it('is per-project', () => {
    expect(projectForPath(beta.planPath, projects)?.project).toBe(beta);
    expect(projectForPath(join(beta.archiveDir, 'fe', 'FE-001.md'), projects)?.project).toBe(beta);
  });

  it('returns undefined for an unknown path', () => {
    expect(projectForPath('/ws/other/.flaitron/PLAN.md', projects)).toBeUndefined();
  });

  it('does not match a sibling path that string-prefixes archiveDir without being inside it', () => {
    expect(projectForPath(`${alpha.archiveDir}-other/fe/FE-001.md`, projects)).toBeUndefined();
  });
});
