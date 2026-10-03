import { join, sep } from 'node:path';
import { safeReaddir, safeRealpath } from './fsSafe.ts';
import { readTasknoteDir } from './tasknoteRead.ts';
import type { Tasknote } from './tasknote.ts';
import type { ProjectDescriptor } from './workspace.ts';

async function readArchive(project: ProjectDescriptor): Promise<Tasknote[]> {
  // Containment base is the project root resolved through symlinks, not the
  // archive dir: if `archive/` (or `tasknote/`, or `.flaitron/`) is itself a
  // symlink, everything under its target is trivially "inside" it, so only the
  // root is a meaningful bound. Symlinked project roots stay legitimate:
  // they resolve first, then nothing below may escape.
  const realRoot = await safeRealpath(project.root);
  if (realRoot === null) return [];
  const areas = (await safeReaddir(project.archiveDir)).filter((e) => e.isDirectory());
  const nested = await Promise.all(
    areas.map((area) => readTasknoteDir(realRoot, join(project.archiveDir, area.name))),
  );
  return nested.flat();
}

export interface ArchiveCache {
  get(project: ProjectDescriptor): Promise<Tasknote[]>;
  invalidate(filepath: string, projects: Iterable<ProjectDescriptor>): boolean;
  invalidateProject(name: string): boolean;
  clear(): void;
}

// Bounds fleet-wide retention by structure rather than by how many projects a
// session happens to visit — precedent: devApi.ts's MAX_SSE_CLIENTS.
const MAX_CACHED_PROJECTS = 5;

export function createArchiveCache(): ArchiveCache {
  const cache = new Map<string, Promise<Tasknote[]>>();

  return {
    get(project) {
      let cached = cache.get(project.name);
      if (cached) {
        // Touch: re-insert to move this key to the Map's most-recently-used
        // (last) position in iteration order.
        cache.delete(project.name);
        cache.set(project.name, cached);
        return cached;
      }
      cached = readArchive(project).catch((err) => {
        if (cache.get(project.name) === cached) cache.delete(project.name);
        throw err;
      });
      cache.set(project.name, cached);
      if (cache.size > MAX_CACHED_PROJECTS) {
        // Map iterates in insertion order and every hit re-inserts, so the
        // first key is always the least-recently-used one.
        const oldest = cache.keys().next().value;
        if (oldest !== undefined) cache.delete(oldest);
      }
      return cached;
    },
    invalidate(filepath, projects) {
      for (const p of projects) {
        if (filepath.startsWith(p.archiveDir + sep)) {
          cache.delete(p.name);
          return true;
        }
      }
      return false;
    },
    invalidateProject(name) {
      return cache.delete(name);
    },
    clear() {
      cache.clear();
    },
  };
}
