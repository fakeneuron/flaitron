// update-adopters skill wiring and audit-fork reads: the wiring plan, the link follow-through with its dangling-link prune, and the audit-fork marker, pass-gap and drift reads (CORE-EPIC-931).
//
// Skill wiring (CORE-852.5, the /ft-update Step 4 rules): on each wiring
// surface the adopter already has as a real directory (.claude/,
// .agents/skills, .cursor/skills, .grok/skills — none is ever bootstrapped),
// applyBump first removes each tracked dangling link on that surface whose
// target points into the submodule (a skill retired or renamed upstream — the
// new name is a missing link, so a rename needs no special case), then creates
// every link the target's AGENTS-snippet roster lists that is still missing,
// with the snippet's relative target and the submodule path substituted — one
// whose body the target does not ship is noted, never created dangling. An
// untracked dangling link is the operator's own and is kept; one pointing
// anywhere else (or whose target can't be checked) is kept too; both are
// noted. Rosters are read from
// FLAITRON_REPO at the target. Codex follows codex/reconcile-skills.md rather
// than a plain `ln -s` parse: roster = `.agents/skills/ft-<slug>` lines, link
// target built as `../../<FT>/codex/skills/<slug>`, and a redirected root, a
// roster body missing at the target, or any other entry at a roster path is a
// conflict that skips the adopter (a check.mjs gate). The other surfaces never replace an
// existing destination (a custom one is noted) and skip, with a note, a root
// reached through a symlink. A destination git ignores is noted, not created
// or force-added. Each created or removed link is staged and committed.
//
// Audit forks: a real skill directory under .claude/skills or .agents/skills
// whose SKILL.md carries `flaitron-reconciled: vX.Y.Z` and `flaitron-tracks:
// <slug>` (other values are not read as a marker). A fork whose tracked
// scaffold changed since its marker gets a drift note on its row; a full-copy
// ft-audit fork (passes/ beside SKILL.md) missing a pass file the bundle
// shipped after the marker skips the adopter, since the copy is /ft-update's
// per-file confirm. A file the bundle already had at the marker was deleted on
// purpose and never counts; a thin overlay (no passes/) inherits new files.

import { lstat, mkdir, readdir, readFile, readlink, stat, symlink, unlink } from 'node:fs/promises';
import { dirname, join, resolve, sep } from 'node:path';

import { FLAITRON_REPO, cachedFlaitronFile, cachedFlaitronTree, git, memoByKey, parseSemverTag } from './release.mjs';
import { codexRoster, snippetLinks } from './text.mjs';
import { pathKind } from './workspace.mjs';

// The per-project skill-wiring surfaces (CORE-852.5). `root` is what must
// already exist as a real directory for the surface to count as present — the
// updater never bootstraps a platform the repo lacks — and the tree the
// dangling-link prune walks; `skillsDir` is where the snippet's links land.
// Claude's root is the whole .claude/ (W's surface: retired .claude/commands
// links dangle there too), with its worktrees/ checkouts left out of the walk.
const WIRING_SURFACES = [
  { platform: 'claude', root: '.claude', skillsDir: '.claude/skills', snippetPath: 'claude/AGENTS-snippet.md' },
  { platform: 'codex', root: '.agents/skills', skillsDir: '.agents/skills', snippetPath: 'codex/AGENTS-snippet.md' },
  { platform: 'cursor', root: '.cursor/skills', skillsDir: '.cursor/skills', snippetPath: 'cursor/AGENTS-snippet.md' },
  { platform: 'grok', root: '.grok/skills', skillsDir: '.grok/skills', snippetPath: 'grok/AGENTS-snippet.md' },
];
const PRUNE_SKIP = new Set([join('.claude', 'worktrees')]);

// What the wiring follow-through would do in `repo` for a bump to `latest`
// (CORE-852.5), computed without writing. `create` lists the missing links
// ({ dst, target }); `conflicts` the Codex entries codex/reconcile-skills.md
// refuses to work around (any one skips the adopter); `notes` the ⬆-line
// remarks; `roots` the present surface roots the dangling-link prune walks.
// Only a surface whose root already exists as a real directory takes part.
// Codex follows reconcile-skills.md: a roster body missing at the target, a
// redirected root, or any entry at a roster path that is not the exact link is
// a conflict. The other surfaces keep /ft-update's report-only rule: an
// existing destination is never replaced, a custom one is noted, and a
// redirected root skips that surface with a note.
export async function wiringPlan(repo, subPath, latest) {
  const plan = { create: [], conflicts: [], notes: [], roots: [] };
  const want = []; // { dst, target } before the existence checks
  for (const surface of WIRING_SURFACES) {
    const kind = await pathKind(repo, surface.root, 'dir');
    if (kind === null) continue;
    if (surface.platform === 'codex') {
      if (kind !== 'dir') {
        plan.conflicts.push(`skill root ${surface.root}`);
        continue;
      }
      const snippet = await cachedFlaitronFile(latest, surface.snippetPath);
      const slugs = snippet === null ? [] : codexRoster(snippet);
      if (slugs.length === 0) {
        plan.conflicts.push('empty pinned Codex roster');
        continue;
      }
      const bodies = await cachedFlaitronTree(latest, 'codex/skills/');
      const missing = slugs.filter((slug) => !bodies.has(`codex/skills/${slug}/SKILL.md`));
      if (missing.length > 0) {
        plan.conflicts.push(`missing pinned body ${missing.join(', ')}`);
        continue;
      }
      for (const slug of slugs) {
        const dst = `${surface.skillsDir}/${slug}`;
        const target = `../../${subPath}/codex/skills/${slug}`;
        const have = await linkTarget(repo, dst);
        if (have === undefined) want.push({ dst, target });
        else if (have !== target) plan.conflicts.push(`preserved ${dst}`);
      }
    } else {
      const skillsKind = surface.skillsDir === surface.root ? kind : await pathKind(repo, surface.skillsDir, 'dir');
      if (kind !== 'dir' || (skillsKind !== null && skillsKind !== 'dir')) {
        plan.notes.push(`${surface.platform} wiring skipped (redirected ${kind !== 'dir' ? surface.root : surface.skillsDir})`);
        continue;
      }
      const snippet = await cachedFlaitronFile(latest, surface.snippetPath);
      for (const link of snippet === null ? [] : snippetLinks(snippet, surface.skillsDir, subPath)) {
        const have = await linkTarget(repo, link.dst);
        if (have !== undefined) {
          if (have !== link.target) plan.notes.push(`kept custom ${link.dst}`);
          continue;
        }
        // A link to a body the target does not ship would dangle on arrival
        // (and the next sweep's prune would remove it): note it instead.
        const body = link.target.slice(`../../${subPath}/`.length);
        if (!(await cachedFlaitronTree(latest, `${dirname(body)}/`)).has(`${body}/SKILL.md`)) {
          plan.notes.push(`not wired (missing pinned body) ${link.dst}`);
        } else {
          want.push(link);
        }
      }
    }
    plan.roots.push(surface.root);
  }
  const ignored = await ignoredPaths(repo, want.map((link) => link.dst));
  for (const link of want) {
    if (ignored.has(link.dst)) plan.notes.push(`not wired (ignored) ${link.dst}`);
    else plan.create.push(link);
  }
  return plan;
}

// `path`'s symlink target, null when it exists but is not a symlink, or
// undefined when nothing is there.
async function linkTarget(repo, path) {
  try {
    if (!(await lstat(join(repo, path))).isSymbolicLink()) return null;
  } catch {
    return undefined;
  }
  return readlink(join(repo, path));
}

// Which of `paths` git would ignore in `repo` — a link created there could not
// be staged, and /ft-update never force-adds one (one call answers for all).
async function ignoredPaths(repo, paths) {
  if (paths.length === 0) return new Set();
  try {
    return new Set((await git(repo, 'check-ignore', '--', ...paths)).split('\n').filter(Boolean));
  } catch (e) {
    if (e.code === 1) return new Set(); // exit 1: none ignored
    throw e;
  }
}

// Symlinks under `root` whose target does not exist, walked without following
// links (a symlinked directory is itself a candidate, never traversed);
// PRUNE_SKIP subtrees are left out. Only ENOENT / ENOTDIR count as dangling: a
// target behind an unreadable directory or a link loop is not proof the
// target was retired, so such a link is never pruned.
async function danglingLinks(repo, root) {
  const found = [];
  const walk = async (rel) => {
    if (PRUNE_SKIP.has(rel)) return;
    for (const entry of await readdir(join(repo, rel), { withFileTypes: true })) {
      const path = join(rel, entry.name);
      if (entry.isSymbolicLink()) {
        try {
          await stat(join(repo, path));
        } catch (e) {
          if (e.code === 'ENOENT' || e.code === 'ENOTDIR') found.push(path);
        }
      } else if (entry.isDirectory()) {
        await walk(path);
      }
    }
  };
  await walk(root);
  return found.sort();
}

// Paths among `paths` that the index tracks (literal pathspecs: these names
// come from the adopter's filesystem).
async function trackedPaths(repo, paths) {
  if (paths.length === 0) return new Set();
  return new Set((await git(repo, '--literal-pathspecs', 'ls-files', '-z', '--', ...paths)).split('\0').filter(Boolean));
}

// Prune tracked dangling links into the submodule on the present surfaces,
// then create the links still missing, staging each change. Pruning first
// means a stale link at a roster path is replaced by the right one rather than
// kept as "custom" and then deleted, and a link this run created is never seen
// by the prune. `ctx.links` records each link change once it has happened
// ({ path, target }: target null for a created link, the prior target for a
// removed one) and `ctx.dirs` each directory made, so rollback can undo
// exactly what this run did. A dangling link that is untracked (the
// operator's own local state, which git could not restore) or that points
// outside the submodule is kept and noted.
export async function wireSkills(repo, subPath, latest, ctx) {
  const { conflicts, roots } = await wiringPlan(repo, subPath, latest);
  // checkAdopter skipped any adopter with a conflict; one appearing since then
  // fails the bump closed rather than writing around it.
  if (conflicts.length > 0) throw new Error(`codex wiring conflict (${conflicts.join(', ')})`);
  const notes = [];
  const stage = async (path) => {
    ctx.staged.push(path);
    await git(repo, '--literal-pathspecs', 'add', '--', path);
  };
  const sub = resolve(repo, subPath);
  for (const root of roots) {
    const dangling = await danglingLinks(repo, root);
    const tracked = await trackedPaths(repo, dangling);
    for (const path of dangling) {
      const target = await readlink(join(repo, path));
      const abs = resolve(repo, dirname(path), target);
      if (abs !== sub && !abs.startsWith(sub + sep)) {
        notes.push(`kept broken ${path}`);
      } else if (!tracked.has(path)) {
        notes.push(`kept untracked ${path}`);
      } else {
        await unlink(join(repo, path));
        ctx.links.push({ path, target });
        await stage(path);
        notes.push(`removed ${path}`);
      }
    }
  }
  // Re-planned after the prune: the removals change which roster links are missing.
  const plan = await wiringPlan(repo, subPath, latest);
  if (plan.conflicts.length > 0) throw new Error(`codex wiring conflict (${plan.conflicts.join(', ')})`);
  notes.push(...plan.notes);
  for (const { dst, target } of plan.create) {
    if ((await pathKind(repo, dirname(dst), 'dir')) === null) {
      await mkdir(join(repo, dirname(dst)));
      ctx.dirs.push(dirname(dst));
    }
    await symlink(target, join(repo, dst));
    ctx.links.push({ path: dst, target: null });
    await stage(dst);
    notes.push(`wired ${dst}`);
  }
  return notes;
}

// Local audit forks (CORE-852.5) — /ft-update Step 4.5's test: a real skill
// directory under .claude/skills or .agents/skills whose real SKILL.md carries
// `flaitron-reconciled:` and `flaitron-tracks:`. A value that is not a semver
// tag or a skill slug is not read as a marker, so nothing adopter-authored
// reaches a git rev range or pathspec unvalidated. `fullCopy`: a passes/
// directory sits beside SKILL.md (a thin overlay has none and inherits new
// pass files from the bundle at run time).
const FORK_ROOTS = ['.claude/skills', '.agents/skills'];
export async function auditForks(repo) {
  const forks = [];
  for (const root of FORK_ROOTS) {
    if ((await pathKind(repo, root, 'dir')) !== 'dir') continue;
    for (const entry of await readdir(join(repo, root), { withFileTypes: true })) {
      if (!entry.isDirectory()) continue; // a linked skill directory is the submodule's
      const dir = `${root}/${entry.name}`;
      if ((await pathKind(repo, `${dir}/SKILL.md`)) !== 'file') continue;
      const text = await readFile(join(repo, dir, 'SKILL.md'), 'utf8');
      const reconciled = /^flaitron-reconciled:[ \t]*(\S+)/m.exec(text)?.[1];
      const tracks = /^flaitron-tracks:[ \t]*(\S+)/m.exec(text)?.[1];
      if (!reconciled || !parseSemverTag(reconciled) || !tracks || !/^[a-z0-9-]+$/.test(tracks)) continue;
      forks.push({ dir, reconciled, tracks, fullCopy: (await pathKind(repo, `${dir}/passes`, 'dir')) === 'dir' });
    }
  }
  return forks;
}

// Pass files shipped at `latest` that a full-copy ft-audit fork lacks and that
// did not exist at its reconcile point, as `<dir>/passes/<file>`. A file the
// bundle had at the reconcile point was deliberately deleted by the forker and
// is never counted; a reconcile tag this checkout can't resolve counts every
// missing file (fail closed — the copy needs /ft-update's per-file confirm).
export async function forkPassGaps(repo, fork, latest) {
  if (!fork.fullCopy || fork.tracks !== 'ft-audit') return [];
  const passes = 'claude/skills/ft-audit/passes/';
  const shipped = await cachedFlaitronTree(latest, passes);
  const before = await cachedFlaitronTree(fork.reconciled, passes);
  const gaps = [];
  for (const path of shipped) {
    const file = `${fork.dir}/passes/${path.slice(passes.length)}`;
    if (before.has(path) || (await pathKind(repo, file)) !== null) continue;
    gaps.push(file);
  }
  return gaps.sort();
}

// True when the fork's tracked scaffold changed between its reconcile point and
// `latest`; a reconcile tag git can't range over reads as drifted, so a stale
// marker is reported rather than silently trusted.
export const cachedForkDrift = memoByKey(
  (fork, latest) => `${fork.reconciled}::${fork.tracks}::${latest}`,
  (fork, latest) =>
    git(FLAITRON_REPO, 'log', '--oneline', '-1', `${fork.reconciled}..${latest}`, '--', `claude/skills/${fork.tracks}/`).then(
      (out) => out.trim() !== '',
      () => true,
    ),
);
