import { dirname, sep } from 'node:path';
import type { ChangeScope } from './sseChange.ts';
import type { ProjectDescriptor } from './workspace.ts';

interface WatchSets {
  hot: string[];
  archive: string[];
}

// Hot paths are polled (PLAN.md + active tasknotes). Archive roots are
// watched natively — the fleet-scale cost is the 200ms poll, not the watch.
//
// These are literal paths, not globs: chokidar 4 removed glob support
// and v5 treats every path literally, so escaping `[` or `*` in a project
// directory name would corrupt the path rather than protect it. The `*.md` /
// `*/*.md` reach the globs used to carry now lives in the `depth` + `ignored`
// options beside the watchers in `flaitronWatch.ts`.
export function watchSets(projects: Iterable<ProjectDescriptor>): WatchSets {
  const hot: string[] = [];
  const archive: string[] = [];
  for (const p of projects) {
    hot.push(p.planPath, p.tasknoteDir);
    archive.push(p.archiveDir);
  }
  return { hot, archive };
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
