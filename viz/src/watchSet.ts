import { dirname, sep } from 'node:path';
import type { ChangeScope } from './sseChange.ts';
import type { ProjectDescriptor } from './workspace.ts';

// Both watchers start at each project's `.flaitron/` directory, which exists
// at dev-server startup even if the tasknote and archive directories appear
// later. The hot and archive reach lives in the `depth` and `ignored` options
// in `flaitronWatch.ts`.
//
// Chokidar treats these paths literally. Pass directory names with `[` or `*`
// through unchanged.
export function watchRoots(projects: Iterable<ProjectDescriptor>): string[] {
  return [...projects].map((p) => dirname(p.planPath));
}

// Active tasknotes live directly in tasknoteDir. Archive files live one
// extra level down (archive/<area>/), so dirname distinguishes them.
export function projectForActiveTasknote(
  filepath: string,
  projects: Iterable<ProjectDescriptor>,
): ProjectDescriptor | undefined {
  for (const p of projects) {
    if (dirname(filepath) === p.tasknoteDir) return p;
  }
  return undefined;
}

// Owner *and kind* of any watched path (PLAN.md, active tasknote, or archive
// file). Used to attribute SSE change events; not a substitute for
// projectForActiveTasknote, which must stay unlink-only.
//
// The scope is what lets the client refetch one endpoint instead of four.
// Precedence is load-bearing: archiveDir is tasknoteDir/archive, so an
// archive file's dirname is `…/archive/<area>` and never equals tasknoteDir
// — the active test can safely run first.
export function projectForPath(
  filepath: string,
  projects: Iterable<ProjectDescriptor>,
): { project: ProjectDescriptor; scope: ChangeScope } | undefined {
  for (const p of projects) {
    if (filepath === p.planPath) return { project: p, scope: 'plan' };
    if (dirname(filepath) === p.tasknoteDir) return { project: p, scope: 'active' };
    if (filepath.startsWith(p.archiveDir + sep)) return { project: p, scope: 'archive' };
  }
  return undefined;
}
