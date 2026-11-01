---
name: ft-update
description: Bump an adopter project's pinned flaitron submodule to the latest released tag and reconcile selected skill wiring, including Codex repair at the same version. Show current→target + tag notes, confirm the bump, rewrite the pin line and AGENTS.md Workflow block, prune tracked dangling links, preserve custom destinations, refresh audit forks without clobbering filled rubrics, and smoke-check. Adopter-only; thin procedural skill, no tasknote.
---

# update — flaitron submodule bump (adopter-side)

You are bumping a project's pinned flaitron submodule to the latest released
tag. This is the consumer-side counterpart to `/ft-release` (which cuts the tag
on the producer side). It is a **thin procedural skill** — it performs the bump
and stages the result; it does **not** scaffold a 4-phase tasknote. The skill
takes **no arguments**.

The skill is markdown-only — the assistant runs git inline via its Bash tool, no
shell scripts (per `SPEC/scope-boundaries.md` §"What flaitron does NOT provide").

## Step 0 — Resolve the submodule path + verify cwd is an adopter project

The flaitron submodule lives at `.flaitron/core/`. Resolve `<FT>` (the actual
path) before anything else:

- Parse `.gitmodules` for the submodule whose `url` contains `flaitron` → its `path`. That is `<FT>`.
- Fallback if `.gitmodules` is unclear: `.flaitron/core` when `.flaitron/core/SPEC.md` exists.
- `<FT>` never carries a trailing slash; every command and link target below joins it with `/`.

**Pre-rename layout — stop.** If `.flowtron/` exists (a pre-v6 `.flowtron/core/`
pin, or the older `.flowtron/flowtron/`), stop before any write: v6.0.0 renamed
the whole directory, and this skill does not move it. Point the user at
flaitron's `docs/UPGRADING.md` §"Upgrading an existing adopter from v5.x
(`.flowtron/` → `.flaitron/`)".

Then guard — the skill bails unless this is a flaitron-adopting project:

- `<FT>/SPEC.md` exists (the pinned submodule resolved above).
- `.flaitron/PLAN.md` exists (this project's own PLAN).
- The repo-root `SPEC.md` heading is **not** `# Flaitron — Workflow Specification` — that heading means cwd is the flaitron checkout itself, where there is no submodule to bump.

If no flaitron submodule resolves, or any guard fails, stop. Tell the user `/ft-update` only runs inside a flaitron-adopting project (one with a flaitron submodule under `.flaitron/`). For flaitron's own checkout, releases are cut with `/ft-release`, not bumped. Do not modify any files.

Use `<FT>` in place of the submodule path for every command below.
Record entry submodule HEAD (`git -C <FT> rev-parse HEAD`) and index gitlink
(`git ls-files --stage -- <FT>`) before writes, for repair-only preservation.

**Select the wiring surface.** An explicit operator platform choice wins;
otherwise use the invocation platform. Codex selects `.agents/skills`, even
when absent; Claude selects `.claude/skills`. Cursor uses existing Claude
wiring or its native surface; Grok uses an existing compatible surface or
its native one. Unknown caller → ask. Record the selection. Step 4 also
maintains already-present surfaces; never bootstrap an unselected platform.
When Codex is selected or `.agents/skills` exists (including a dangling
symlink), read the executing
bundle's `codex/reconcile-skills.md` (from flaitron's root) now and retain it
across checkout. It derives data from the adopter pin, including older pins.

## Step 1 — Resolve current pin and latest available tag

- **Re-apply the sparse trim** (`docs/MIGRATION.md` §1.1): if `test -L <FT>` fails (`<FT>` is not a symlink) and `git --version` is 2.35 or newer, run `git -C <FT> sparse-checkout set --no-cone '/*' '!/.flaitron/'`. This keeps flaitron's dogfood archive (`<FT>/.flaitron/`) out of the working tree. The command is idempotent and changes no gitlink. A superproject re-clone drops the per-clone sparse config, and this step restores it on every run that gets past Step 0. It runs first, before the network fetch and before any confirm, so neither an offline fetch nor a declined bump skips it. Every exit and the Step 5 recap say which happened: re-applied (files removed), already sparse, skipped on older git, where the adopter's deny/`.ignore` fence still covers the path, or skipped because `<FT>` is a symlink to a local flaitron checkout, whose own `.flaitron/` the trim would remove.
- **Current version:** read `<FT>/SPEC.md:3` (`**Version:** vX.Y.Z`).
- **Current pinned commit:** `git -C <FT> rev-parse --short HEAD`.
- **Repair wiring at the current pin:** run Step 4's wiring rules now, before
  the fetch or any early exit. For selected/present Codex, execute the
  already-read reconciliation block with `FT_DIR` set to `<FT>`; it creates
  an absent selected root. Stop on conflicts. Record changed paths for Step 5.
  This makes same-version, offline and declined-bump runs useful without a
  checkout or gitlink change. Existing unselected platforms follow their
  Step 4 rules; only selected surfaces may be bootstrapped.
- **Fetch tags:** `git -C <FT> fetch --tags --quiet origin`.
- **Latest tag:** `git -C <FT> tag --sort=-v:refname | head -1`.

If fetch fails, report the failure and current-pin repair result; take the
Step 5 repair-only hand-off without inferring a latest release. If the latest
tag's version equals the current `SPEC.md` version, report "already on the
latest release (`vX.Y.Z`)" with the sparse/wiring outcomes; go to Step 5 for
any repair changes instead of returning before staging them. Do not checkout
or stage a gitlink for repair-only runs. Otherwise capture `<current>` and
`<target>` for the rest of the run.

## Step 2 — Surface the bump + tag changelog, confirm

Flaitron has no `CHANGELOG.md` — the annotated tag message is the changelog. Show it:

```sh
git -C <FT> show <target> --no-patch
```

Surface to the user:

```text
flaitron bump (<FT>):
  current: <current>  (pin <short-sha>)
  target:  <target>   (latest tag)

Tag notes (<target>):
  <tag message — adopter-facing release notes + any Migration block>

Proceed with the bump?
```

Below the tag notes, name the follow-through the bump will write — the Step
3.5 `Pinned to:` lines and AGENTS.md `## Workflow` replace (or the skip that
applies to each), and the Step 4 tracked links into `<FT>` whose target path
`<target>` no longer ships (`git -C <FT> cat-file -e <target>:<path under FT>`
fails), which the prune will remove (a link into a sparse-excluded path can
add to that list; the recap names the final set). The bump confirm covers them; there is
no second ask. Judge from the target's tree
(`git -C <FT> show <target>:claude/AGENTS-snippet.md`), not the checked-out
current one.

**Bump gates (before the ask).** The updater's preconditions, so a bump only
starts where any later failure can be undone exactly. If one fails, do not
ask: report it and take Step 5's repair-only hand-off (repair still works on
a dirty tree).

- **Clean tree.** The index is empty (`git diff --cached --quiet`, `<FT>`
  included) and no tracked file has uncommitted changes, apart from an
  unstaged `<FT>` worktree move and this run's Step 1 wiring paths
  (`git status --porcelain --untracked-files=no`), `<FT>`'s own worktree is
  clean (`git -C <FT> status --porcelain`), and HEAD is on a branch
  (`git symbolic-ref --quiet HEAD`). Otherwise ask the operator to commit,
  stash or check out a branch, and rerun.
- **Not pinned ahead.** `<current>` is not newer than `<target>` (a stale tag
  list must never downgrade the pin).
- **Codex roster.** When Codex is selected or `.agents/skills` exists, check
  read-only against `<target>`: neither `.agents` nor `.agents/skills` is a
  symlink or a non-directory; the roster
  (`git -C <FT> show <target>:codex/AGENTS-snippet.md`, the
  `.agents/skills/ft-<slug>` lines) is non-empty; each roster body exists
  (`git -C <FT> cat-file -e <target>:codex/skills/<slug>/SKILL.md`); and
  each roster destination is absent or already the exact link
  `../../<FT>/codex/skills/<slug>`; each single-slug retired row in
  `git -C <FT> show <target>:docs/MIGRATION.md` that the target no longer
  ships has no destination, or only the exact link. Any miss is a conflict — the updater
  skips such an adopter before writing anything.

Use AskUserQuestion (default Yes). If the tag message carries a **Migration** block with required project-side edits, call those out explicitly — the adopter may need to act on them after the pin moves. Do not proceed silently past a non-empty Migration block.

If the bump is declined, retain the current-pin repair and take Step 5's
repair-only hand-off. Do not run Step 3, Step 3.5 or the target-version fork refresh.

## Step 3 — Move the pin

Bumping is **not** `git submodule update` — that command *restores* the commit already recorded in the superproject index (it would undo a bump). Move the pin explicitly:

```sh
git -C <FT> checkout <target>
git add <FT>
```

When Step 1 applied the sparse config, the checkout respects it and never writes the dogfood archive back; on the older-git skip it does. `git add <FT>` records the new gitlink in the superproject. Verify: `git -C <FT> describe --tags` reads `<target>`, and `git diff --cached <FT>` shows the gitlink moving `<current>` → `<target>`.

## Step 3.5 — Follow-through (approved bump only)

The same two adopter-file writes the fleet updater (`tools/update-adopters.mjs`,
"Follow-through") makes, so a single-repo bump and a batch bump commit the
same files. Never on a repair-only run. After the checkout, in this order:

1. **Prune.** Step 4's tracked dangling-link prune.
2. **Codex pass.** When Codex is selected or `.agents/skills` exists, Step 4's
   Codex pass against `<target>` (Step 2 already cleared its roster).
3. **Files.** The pin line and Workflow block below.
4. **Links.** First remove any link Step 1 created this run that the target
   cannot back: it dangles into `<FT>`, or its slug is not in `<target>`'s
   roster for that surface (the updater wires only that roster; untracked,
   it has nothing to stage). Then Step 4's non-Codex rules, which re-create
   any roster link so removed — prune before create, as the updater does.

**Any failure from the checkout through Step 4.6 undoes the bump** — the
updater's rollback. (A commit hook that rejects the Step 5 commit leaves the
staged bump for the operator, as before.) Step 2's clean-tree gate makes it
exact: write back each Step 3.5 file's saved copy (copy a file's bytes aside
before writing it — it may be untracked); remove every link created after the
checkout, any Step 4.5 pass-file copy, and any directory made after the
checkout (`rmdir`, newest first); re-create each untracked link removed after it with its
prior target (record `readlink` before any removal; a Codex `REMOVED` line's
is `../../<FT>/codex/skills/<slug>`); then
`git --literal-pathspecs restore --staged --worktree --` every tracked path
changed after the checkout (pruned links, Codex removals);
`git -C <FT> checkout <entry HEAD>`;
`git --literal-pathspecs restore --staged -- <FT>` (the gate guaranteed
the index matched HEAD at entry). Drop
the target pass's lines from the Codex report, report the failure and the
undone bump, and take Step 5's repair-only hand-off for the Step 1 repair.

A file that is a symlink, or sits under a symlinked directory, is left alone
with a note — the write would land outside the repo while `git add` staged
only the link.

- **Pin line.** In `.flaitron/tasknote/README.md`, rewrite the first
  `Pinned to: vX.Y.Z` on each line to `Pinned to: <target>`. No such line →
  nothing to do.
- **Workflow block.** Replace AGENTS.md's `## Workflow` section — the line
  that is exactly `## Workflow` through the line before the next H1 or H2
  heading, or to EOF — with the paste block from `<FT>/claude/AGENTS-snippet.md`
  (now at `<target>`): the body of the first ```` ```markdown ```` fence after
  `## Block to paste into AGENTS.md`, fence lines dropped. Bytes, as the
  updater writes them: the lines before the heading, the block, then either
  one blank line and the rest from the next heading on, or — section to EOF —
  a single final newline. Headings are matched line by line, as the
  updater does, skipping every line inside a code fence (``` or ~~~, up to
  3 spaces of indent; closed by a run of the same character at least as
  long) — a fenced `#` line or `## Workflow` is never a heading. No AGENTS.md, or
  no exact `## Workflow` heading (trailing whitespace allowed) → nothing to
  do. Skip with a note when there is more than one, or the snippet has no
  such block or it does not open with `## Workflow`. A `## Workflows (CI)`
  section is never touched.

Record each changed file for Step 5 staging and each skip for its recap.

## Step 4 — Reconcile per-project skill wiring

Run at the current pin in Step 1 and again after an approved Step 3 checkout.
Existing correct relative links follow the pin; missing skills need links.
Create an absent root only for the selected platform, and maintain other
already-present roots. Record exact created/removed paths for staging.

After an approved bump, Step 3.5 sequences the prune, the Codex pass and the
non-Codex rules.

**Tracked dangling-link prune (after an approved Step 3 checkout only, Step
3.5 item 1).** The fleet updater's rule, so both paths
remove the same links. On each present surface root — `.claude/` (its whole
tree, `.claude/worktrees/` left out), `.agents/skills`, `.cursor/skills`,
`.grok/skills` — walk without following symlinks and collect each link whose
target is missing (a path component absent or not a directory; a link loop or
an unreadable directory is not dangling). A surface whose root or skills
directory is a symlink, or is present but not a directory, is left out of the
prune, as the updater skips it. Remove a link only when git tracks it
(`git --literal-pathspecs ls-files -z -- <path>` prints anything) **and** its
target, joined to the link's directory lexically (no realpath), lies under
`<FT>`: a skill retired or renamed upstream; the new name is a missing link
the rules below create. Keep an untracked one (the operator's own state,
which git cannot restore; Step 3.5 item 4 handles links Step 1 created) or
one pointing anywhere else, and leave it to Step 4.6's report. Repair-only runs skip this prune.

Handle each platform wiring surface independently:

- **Claude Code:** authoritative list is the `ln -s … .claude/skills/<name>` block in the current `<FT>/claude/AGENTS-snippet.md` §"One-time symlink wiring". If selected or `.claude/` exists, create missing symlinks in `.claude/skills` with the same relative form (substituting the resolved `<FT>`). Otherwise report "Claude wiring not selected or present; skipped `.claude/` symlink check."
- **Codex:** authoritative list is the derived literal block in the current `<FT>/codex/AGENTS-snippet.md` §"One-time skill wiring". If selected or `.agents/skills` exists (including a dangling root symlink), run the retained `codex/reconcile-skills.md` block with `FT_DIR=<FT>`. It creates an absent selected root, adds missing subset links, keeps correct links, prunes only exact-owned absent-body retired links, and reports conflicts without overwriting custom entries. A conflict stops the run (after a bump, through Step 3.5's undo). Otherwise report "Codex wiring not selected or present; skipped `.agents/skills` check."
- **Cursor:** authoritative list is the Cursor-only `ln -s … .cursor/skills/<name>` block in the current `<FT>/cursor/AGENTS-snippet.md` §"One-time symlink wiring" (targets are canonical `claude/skills/` bodies). If selected or `.cursor/skills/` exists, create missing symlinks with the snippet's relative form (substituting `<FT>`). Otherwise skip. Projects using Claude compatibility need no native Cursor root.
- **Grok:** authoritative list is the Grok-only block in the current `<FT>/grok/AGENTS-snippet.md` §"One-time symlink wiring" (canonical `claude/skills` targets). If selected or `.grok/skills/` exists, create missing links with the snippet's relative form (substituting `<FT>`). Otherwise skip. Projects using an existing compatibility surface need no native Grok root.

For non-Codex roots, never create a link whose `SKILL.md` body the pinned
`<FT>` lacks, or whose destination git ignores (`git check-ignore -q`); note
it instead, as the updater does. Preserve existing files/directories and
custom or dangling links; report conflicts rather than using a force-link command. A symlinked
root is a conflict, not a directory to traverse. Beyond the Codex block's
retirement pass, removal is the tracked prune above; anything else dangling is
Step 4.6's report.

Report the added symlinks per platform (or "no new skills to wire"). Note: global/by-reference skills (`/ft-adopt`, `/ft-audit-repo`) are picked up by the user's agent-home wiring when desired, not per-project — do not add extra repo-scoped symlinks beyond each platform's snippet list. `/ft-update` is intentionally in the adopter subset; `/ft-release` is flaitron-self-only.

## Step 4.5 — Audit-fork drift scan & pass-file refresh

Scan the adopter's skill roots for local audit forks that carry fork-provenance markers — these signal which bundled scaffold a fork was last reconciled against so that silent upstream drift becomes visible. The roots are `.claude/skills` and, if present, `.agents/skills` (where the Codex wrapper installs a fork); `<root>` below is whichever one the fork lives in.

For each file matching `.claude/skills/*/SKILL.md` or `.agents/skills/*/SKILL.md` whose skill **directory** is not a symlink and whose `SKILL.md` is a regular file (`test ! -L "$(dirname <path>)" && test ! -L <path>`) and that contains a `flaitron-reconciled:` frontmatter field:

The directory test is the one that matters: every adopter-wired skill directory, Claude or Codex, is a symlink into the submodule, and the `SKILL.md` reached *through* that link is itself a regular file, so testing the file alone passes for all of them and classifies submodule-owned skills as local forks.

1. Parse the file's YAML frontmatter to read:
   - `flaitron-reconciled:` — the version tag the fork was last reconciled against (e.g. `vX.Y.Z`).
   - `flaitron-tracks:` — the bundled scaffold name (e.g. `ft-audit`).

2. If either field is missing or empty, skip this file and note it was skipped.

3. Check whether the tracked scaffold changed between the reconciled version and `<target>`:

   ```sh
   git -C <FT> log <reconciled>..<target> --oneline -- claude/skills/<flaitron-tracks>/
   ```

   Scope the path to the scaffold **directory**, not just its `SKILL.md` — a
   scaffold like `ft-audit` carries a sibling `passes/` library whose per-domain
   pass bodies are exactly what a fork reconciles against.

4. If the log is non-empty, emit a **non-blocking warning** for that fork:

   ```text
   ⚠️  Audit fork drift: <root>/<dir>/SKILL.md
       Reconciled at: <reconciled>  →  bumping to: <target>
       Scaffold `claude/skills/<flaitron-tracks>/` changed in N commit(s) since <reconciled>.
       Review the upstream diff, re-reconcile your fork, then update `flaitron-reconciled:` to <target>:

         git -C <FT> diff <reconciled>..<target> -- claude/skills/<flaitron-tracks>/
   ```

5. **Pass-file refresh (full-copy forks only).** A fork is **full-copy** when a `passes/` directory sits beside its `SKILL.md`; a fork with no `passes/` sibling is a **thin overlay** — it resolves pass files from the bundled scaffold at run time and therefore picks up newly shipped domains automatically. Report an overlay as `inherits new pass files automatically; no action` and skip the rest of this item.

   For a full-copy fork whose `flaitron-tracks:` is `ft-audit`, compare its `passes/` against the bundled set — at the target *and* at the reconcile point:

   ```sh
   ls <root>/<dir>/passes/                                                            # the fork has
   git -C <FT> ls-tree --name-only <target>     -- claude/skills/ft-audit/passes/     # bundled now
   git -C <FT> ls-tree --name-only <reconciled> -- claude/skills/ft-audit/passes/     # bundled then
   ```

   Classify every bundled-at-`<target>` file the fork lacks. The `<reconciled>` listing is the discriminator — it separates "the forker never saw this" from "the forker saw it and removed it":

   - **Newly shipped** — *absent* from the `<reconciled>` listing. Upstream added the domain after this fork was last reconciled, so the forker has never had the chance to decide against it. **Offer to copy it in**, one confirm per file:

     ```sh
     cp <FT>/claude/skills/ft-audit/passes/<domain>.md <root>/<dir>/passes/<domain>.md
     ```

     A copied file lands as an **unfilled scaffold** — say so, and point at the fork's §0 forker checklist for the slots it needs. `/ft-audit`'s own scaffold bootstrap will also catch them on the first run of that domain, so a deferred fill degrades to a prompt rather than to silence.

   - **Deliberately deleted** — *present* in the `<reconciled>` listing. The forker had the file and removed it; the scaffold's §0 explicitly sanctions deleting pass files for surfaces a project doesn't have. **Report only — never re-add.** Re-adding would silently undo a deliberate decision on every bump.

   Files present in **both** the fork and the bundle are never read, diffed, or written by this step. That is exactly where filled rubrics, gate commands, and sacred invariants live, and this refresh must not be able to reach them. Changes to pass files the fork already has are the drift *warning*'s job (item 4), not this item's.

   Copies are the only write this step makes, and only on an explicit per-file `AskUserQuestion` confirm. Declining is a valid answer and changes nothing.

6. If no `.claude/skills/*/SKILL.md` or `.agents/skills/*/SKILL.md` file carries `flaitron-reconciled:`, emit:
   `No provenance-marked audit forks found; skipping drift scan.`

Drift warnings are **informational only** — the bump proceeds regardless. After the adopter reviews and re-reconciles, they manually update `flaitron-reconciled:` to `<target>`. The item-5 pass-file copies are the one exception to report-only, and they are gated behind a per-file confirm; declining leaves the fork untouched. Report all warnings, copies, and skips (if any) before continuing to Step 5.

## Step 4.6 — Dangling symlink check

A release can retire or fold a skill (see `docs/MIGRATION.md` §"Retired skills leave dangling symlinks"). Step 4 prunes exact-owned retired Codex links with absent bodies and, after a bump, tracked dangling links into `<FT>`. Check remaining dangling links here, report-only; missing targets alone do not prove ownership.

For each wiring surface confirmed present in Step 4:

```sh
find .claude -type l ! -exec test -e {} \; -print          # if .claude/ is present
find .agents/skills -type l ! -exec test -e {} \; -print   # if .agents/skills/ is present
find .cursor/skills -type l ! -exec test -e {} \; -print   # if .cursor/skills/ is present
find .grok/skills -type l ! -exec test -e {} \; -print      # if .grok/skills/ is present
```

If any of those commands print hits, name each one's replacement. Take the link's slug (its basename, minus any `.md`) and find its row in the **Retired** column of the table in `<FT>/docs/MIGRATION.md` §"Retired skills leave dangling symlinks"; a `.claude/commands/*.md` hit matches the `claude/commands/ft-*.md` row, and a brace group in a cell (`ft-audit-{backend,…}`) stands for each slug it expands to. The **Replacement** cell's leading command, or `none`, is the `→` value; a slug with no row reads `→ not in the retired table`. Surface them:

```text
⚠️  Dangling symlink(s) found — target no longer resolves in the bumped submodule:
    <path>  → <replacement, e.g. /ft-file-task (renamed in v7.0.0)>
    <path>  → <replacement>
Each replacement comes from <FT>/docs/MIGRATION.md §"Retired skills leave dangling symlinks". For a renamed skill in the snippet list, Step 4 has already wired the new name. Verify each link's type and exact target before deciding to remove it; these remaining hits have not been proven owned by Flaitron.
```

If all present-surface commands print nothing, report "No dangling symlinks found." This remaining-link check is informational only; it performs no deletion.

## Step 4.7 — Agent-home shadow check

An agent-home copy of an adopter-subset slug shadows this project's repo-scoped wiring, so its body runs instead of the pin just recorded. A copy carrying the skill/pin guard stops the run wherever the runtime names its base directory, and an older or unnamed copy runs silently (`<FT>/docs/PLATFORMS.md` §"One canonical install path per project"). Agent homes lie outside the project, so **ask before probing**: one AskUserQuestion (default Skip) naming `~/.claude/skills`, `~/.claude/commands`, `~/.agents/skills`, `~/.codex/skills`, `~/.cursor/skills` and `~/.grok/skills`. On approval, probe only the slugs in Step 4's Claude list. Never list an agent home, since its other entries are the user's:

```sh
for d in ~/.claude/skills ~/.agents/skills ~/.codex/skills ~/.cursor/skills ~/.grok/skills; do
  for s in <slugs from Step 4's Claude list>; do [ -e "$d/$s" ] && echo "$d/$s"; done
done
for s in <slugs from Step 4's Claude list>; do [ -e ~/.claude/commands/$s.md ] && echo ~/.claude/commands/$s.md; done
```

Any hits:

```text
⚠️  Agent-home copies shadow this project's pinned skills (their bodies run, not <FT>'s):
    <path>
Remove them yourself, keeping only the global-only utilities (ft-adopt, ft-audit-repo). /ft-update never deletes outside the project.
```

No hits → "No agent-home shadows found." Declined, or a refused read (a path-access guard) → "Agent-home shadow check not run — <declined | read refused>." A refused read names the remedy: the refusing guard needs a `read` root for each refused home, and arming it is the operator's act. Report-only; the bump proceeds regardless.

## Step 5 — Smoke check, stage, hand off

For repair-only paths, run Step 4.6's remaining dangling-link report before
this hand-off; do not run the target-version fork refresh. This also reports
unknown/grouped links the bounded Codex retirement procedure preserved.

- **Symlink resolve check:** for each wiring surface present, verify one canonical link resolves into `<FT>`:
  - Claude: `readlink .claude/skills/ft-task` resolves into `<FT>/claude/skills/ft-task`.
  - Codex: `readlink .agents/skills/ft-task` resolves into `<FT>/codex/skills/ft-task`.
  - Cursor: `readlink .cursor/skills/ft-task` resolves into `<FT>/claude/skills/ft-task` (thin bundle — targets are Claude bodies).
  - Grok: `readlink .grok/skills/ft-task` resolves into `<FT>/claude/skills/ft-task` (thin bundle — targets are Claude bodies).
  A broken link means the submodule isn't checked out or the symlink target is stale — surface it.
  For Codex, verify **all** pinned roster links' exact targets and readable
  `SKILL.md` bodies, as required by `codex/reconcile-skills.md`.
- **Version confirm:** re-read `<FT>/SPEC.md:3` — `<target>` after a bump,
  `<current>` on repair-only runs. For repair-only, verify both submodule HEAD
  and superproject gitlink/index are unchanged from entry.
- Optionally **offer** (do not auto-run) a full `/ft-task <ID>` against a real PLAN.md entry as a deeper smoke test.

Stage the bump only if Step 3 ran, plus the Step 3.5 files it changed and
exact wiring paths created/removed by this run (do **not** stage whole skill
roots, `git add .` or `-A`):

Accumulate reports from both pins and stage **net** changes only: existing
destinations (including symlinks) and index-tracked removals. Skip removed
untracked paths, which have nothing to stage. Use the net-path selector in
`codex/reconcile-skills.md` for Codex; apply the same rule to other surfaces.
The Step 4 prune's removals, `.agents/skills` included, are not in the Codex
report — add each to the staged set directly.

```sh
git add <FT>                       # approved bump only
git add -- <step-3.5-changed-files>   # approved bump only
git add -- <net-changed-wiring-paths> # existing additions + tracked removals
```

Only the Codex block can create an ignored path (Step 4 never does for the
other surfaces). Leave it unstaged with a note, as the updater never
force-adds; the operator may edit the ignore rule or force-add by hand. No changes → report the
wiring/sparse outcomes and stop without proposing an empty commit.

Surface a recap (current→target, tag headline, the Step 3.5 writes and skips, any new symlinks wired and tracked links pruned, any Step 4.7 shadow hits, the Step 1 sparse outcome, any Migration action items) and a proposed commit message:

```text
chore: bump flaitron <current> → <target>
```

For repair-only runs, report the reason (same version, offline, or declined
bump), unchanged pin and wiring changes; propose `chore: repair flaitron
skill wiring at <current>`. Do not run target-version fork refresh or claim
that an offline run established the latest release. Static smoke checks are
distinct from discovery: restart Codex and inspect `/skills` or `$ft-task`
before claiming runtime verification.

Do **not** commit unprompted. Commit on the user's go, then stop — `/ft-update` drives no further workflow.

## Notes

- **Adopter-only — inverse of `/ft-release`.** `/ft-release` runs only in flaitron's own checkout; `/ft-update` runs only in adopter projects. Both are layout-guarded; `/ft-update` is wired repo-scoped (Step 4.7 reports an agent-home copy).
- **Submodule path is resolved, not assumed.** Step 0 reads the real path from `.gitmodules`; a pre-rename `.flowtron/` layout stops with a pointer to the v6 move rather than bumping in place.
- **Thin procedural skill.** No tasknote, no 4-phase flow. If you want the bump tracked in PLAN.md, file a line first (e.g. `**<AREA>-NNN** [light] | bump flaitron <target>`) or wrap it in `/ft-task <ID> --micro`; `/ft-update` itself just performs the mechanical bump.
- **Why not `git submodule update`.** Plain `git submodule update` checks out the commit recorded in the superproject index — it restores the *current* pin, not a new one. Bumping requires checking out the new tag inside the submodule and re-recording the gitlink with `git add <FT>` (Step 3).
- **Supersedes the manual prose.** Replaces `claude/AGENTS-snippet.md` §"Bumping the pinned flaitron version" as the executable path; the prose now points here.
