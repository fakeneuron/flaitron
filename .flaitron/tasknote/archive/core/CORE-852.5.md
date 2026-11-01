---
title: wiring-and-forks
status: completed
tags: [fleet, pin-bump, updater]
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-852, CORE-852.1, CORE-852.4, CORE-852.6, CORE-769.7]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - SECURITY.md
  - docs/MIGRATION.md
  - claude/AGENTS-snippet.md
blocked-by:
  - CORE-852.4
---

# CORE-852.5 | wiring-and-forks

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-852]] [[CORE-852.1]] [[CORE-852.4]] [[CORE-852.6]]

## 🎯 Goal

Have `applyBump` reconcile skill wiring inside .4's rollback window — create missing skill links on present surfaces (Codex per `codex/reconcile-skills.md`), prune tracked dangling links into the submodule, skip a full-copy audit fork missing a newly shipped pass file, note fork drift — and rewrite the header's "Not covered" paragraph.

## ✅ Acceptance

- [x] `--apply` creates each missing roster link on a present non-Codex surface (`.claude`, `.cursor/skills`, `.grok/skills`) with the target snippet's relative target (submodule path substituted) and commits it; an absent surface is untouched; an existing destination is never replaced (a custom one is noted) — `node --test tools/update-adopters.test.mjs`
- [x] Codex follows `codex/reconcile-skills.md`: a present `.agents/skills` gets each missing roster link at `../../<FT>/codex/skills/<slug>`; a symlinked `.agents` / `.agents/skills`, a custom entry at a roster path, or a roster body missing at the target skips the adopter `codex wiring conflict (…)` in dry-run and apply alike, pin unmoved — `node --test tools/update-adopters.test.mjs`
- [x] A tracked dangling link into the submodule on a present surface is removed and the removal committed; an untracked one (`kept untracked`) and a dangling link pointing elsewhere (`kept broken`) stay, noted — `node --test tools/update-adopters.test.mjs`
- [x] A link destination git ignores is not created, and is noted — `node --test tools/update-adopters.test.mjs`
- [x] A full-copy `ft-audit` fork (`passes/` beside a marked `SKILL.md`, in `.claude/skills` or `.agents/skills`) missing a pass file shipped after its `flaitron-reconciled:` skips `audit fork needs pass-file copy (…)`; a file present at the reconcile point (deliberately deleted) and a thin overlay do not — `node --test tools/update-adopters.test.mjs`
- [x] A marked fork whose tracked scaffold changed since `flaitron-reconciled:` gets a drift note on its ⬆ or pass-gap ⏭ line; a non-semver `flaitron-reconciled:` or non-slug `flaitron-tracks:` is ignored, never passed to git — `node --test tools/update-adopters.test.mjs`
- [x] A failure after the wiring writes unlinks created links and directories and restores removed links to their prior target; index clean, HEAD unmoved — `node --test tools/update-adopters.test.mjs`
- [x] The retired new-skill flag is gone — `grep -cE 'newSkillWiringSurfaces|formatSkillsNote|skillsNote' tools/update-adopters.mjs tools/update-adopters.test.mjs` prints `0` for both
- [x] Header "Not covered" paragraph rewritten; `SECURITY.md` §"Fleet updater" and `docs/MIGRATION.md` describe the link writes — `grep -c 'not its per-platform wiring repair' SECURITY.md` prints `0`, plus `judgment` on the prose
- [x] Syntax + drift — `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs && bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Replace the `WIRING_SURFACES` flag config with surface descriptors (root, skills dir, snippet, Codex flag); delete `newSkillWiringSurfaces`, `formatSkillsNote`, `cachedNewSkillWiringSurfaces`, `wiredSkillKeys`, `addedFilesForSurface`
- [x] Roster readers from `FLAITRON_REPO` at the target (cached per tag): fenced `ln -s` pairs for Claude/Cursor/Grok; reconcile-skills roster + body set for Codex
- [x] `wiringPlan(repo, subPath, latest)`: present-surface detection (real dir, realpath-contained), per-destination create / keep / custom note / Codex conflict, one `check-ignore` call
- [x] `checkAdopter`: Codex-conflict gate and audit-fork pass-gap gate; fork drift note on bump and pass-gap rows; gate-count comment
- [x] `followThrough`: create links (+ `mkdir`), prune dangling links (recursive walk, `.claude/worktrees` pruned), stage each; record links and dirs in `ctx` before each write
- [x] `rollbackBump`: undo links (created → unlink, removed → re-link) and created dirs
- [x] `reportResult`: `skillsNote` → fork note; wiring notes on the ⬆ line
- [x] Header: wiring/fork paragraphs, gate list, "Not covered" rewrite
- [x] Tests: drop the flag's tests; new cases per Acceptance row
- [x] `SECURITY.md` §"Fleet updater" and `docs/MIGRATION.md` §"Sweeping…" sentence

## 🔗 Related

- [[CORE-EPIC-852]] — parent epic
- [[CORE-852.1]] — Discovery; matrix rows "New-skill wiring", "Dangling links", "Fork pass-file gap", "Fork drift"
- [[CORE-852.4]] — predecessor (sequential); the `ctx.written` / `ctx.staged` rollback window these writes land in
- [[CORE-852.6]] — follow-up (sequential); mirrors the prune into `/ft-update`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.4` landed the follow-through and the `{ written, staged }` rollback window; wiring, prune and the fork gates are the last unported W-only rows of the `.1` matrix, and `.6` mirrors the prune once it is settled here.

- [x] Read relevant source files — `tools/update-adopters.mjs` (all 1325 lines), `tools/update-adopters.test.mjs` (fixtures, `.4` apply cases, Codex procedure group), `codex/reconcile-skills.md`, `claude/skills/ft-update/SKILL.md` Steps 4–4.6, natabula `scripts/wave-bump.sh` (header, `fork_pass_gaps`, `fork_drift`, `follow_through`, gate chain), the four `*/AGENTS-snippet.md` `ln -s` blocks, `docs/MIGRATION.md` §"Retired skills leave dangling symlinks", `SECURITY.md` §"Fleet updater".

- [x] **Best Practices Review** — wiring writes go inside `applyBump`'s one rollback window after the checkout, beside `followThrough`'s file writes; rollback gains link entries (created → unlink, removed → re-link to the captured target) and created directories. Rosters are read from `FLAITRON_REPO` at the target tag (cached per tag), as `.4` reads the Workflow block, so a sparse adopter checkout cannot hide them. Gates stay inline in `checkAdopter` (CORE-479). Adopter-authored values that reach git (`flaitron-reconciled:`, `flaitron-tracks:`) are validated (semver / slug) before use: an unvalidated `reconciled` in a `<a>..<b>` rev range is an option-injection surface. No fleet knowledge enters.

- [x] **Archive skim** — `.1`'s skim covers this file (CORE-490.3, CORE-419.3, CORE-827, CORE-486, CORE-479). Load-bearing here: **CORE-769.7** (the `--no-renames` new-skill flag — a renamed slug needs a fresh link); **CORE-852.4** (rollback context, symlink-parent guard via `realpath`, deliberate W deviations, dry-run shows no follow-through preview).

- [x] **Drift check** — PLAN line matches `.1`'s matrix rows. Facts that shape the port:
  1. W's wiring is a naive parse: every `ln -s` in a ```` ```sh ```` fence of the *checked-out* snippet, skip if the destination exists at all, no conflict reporting. `reconcile-skills.md` for Codex instead: roster = `ln -s` lines whose last field is `.agents/skills/ft-<slug>`; target built as `../../<FT>/codex/skills/<slug>`; every roster body must exist at the pin; a symlinked/non-dir `.agents` or `.agents/skills` is a conflict; an existing destination that is not the exact link is a conflict; any conflict means the pin does not move.
  2. W prunes any dangling link on a surface whose target text contains `<FT>/`: tracked → removed + staged; untracked → kept, reported; other → `kept broken`. `reconcile-skills.md`'s retirement pass also unlinks *untracked* exact-owned retired Codex links; the PLAN line's "keeps untracked" wins for the updater (noted, a deviation `/ft-update` keeps).
  3. W scans forks in `.claude/skills/*` only; `/ft-update` Step 4.5 scans `.claude/skills` and `.agents/skills`.
  4. The existing `newSkillWiringSurfaces` / `formatSkillsNote` flag ("run /ft-update to wire …") becomes false on `--apply` once the updater wires present surfaces.
  5. Fleet survey (`~/Code` adopters, read-only): all 24 track their `.claude` and `.agents/skills` links (none gitignored); 4 also carry `.grok/skills`; no nonstandard Codex `ft-*` link; no dangling links today; 15 carry a thin-overlay `.claude/skills/audit` fork (`flaitron-reconciled: v7.4.0`, one `v7.5.0`), none full-copy — so the pass-gap skip fires on no live repo and the drift note on most.
  6. Docs that this makes false: `docs/MIGRATION.md:573` ("flags ranges that shipped new … skill symlinks — those still go through the per-project flow") and `SECURITY.md:188` ("not its per-platform wiring repair") plus its commit-paths bullet.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — two asked, both answered with the recommended option: (1) **remove** the new-skill flag (`newSkillWiringSurfaces` / `formatSkillsNote` and cache) — `--apply` lists the links it wrote, dry-run previews none; (2) a Codex conflict **skips** the adopter in `checkAdopter` (exit 0, dry-run visible). Assumptions: rosters read from `FLAITRON_REPO` at the target; non-Codex surfaces keep `/ft-update`'s report-only conflict rule (custom destination noted, never replaced; symlinked root → surface skipped with a note); an ignored destination is noted, not created or force-added; forks scanned in `.claude/skills` and `.agents/skills` (`/ft-update` parity, W scans only `.claude`); the drift note rides the ⬆ and pass-gap ⏭ rows only (W prints it on every behind row); untracked exact-owned retired Codex links are kept (PLAN line), unlike `reconcile-skills.md`'s retirement pass.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Pass-file history: `v5.28.0` has 7 `ft-audit/passes/` files, `v5.29.0`+ has 8 — a fork reconciled at a ≤v5.28.0 tag is the real-tag fixture for a newly shipped gap; tests derive the tag rather than hardcode it.
- A renamed skill (CORE-769.7's concern) is covered without the flag: the new name is a missing roster link (created), the old one a tracked dangling link (pruned).
- `git add <removed-tracked-path>` stages the deletion and a `-- <path>` pathspec commit records it, so prune reuses `.4`'s staging/commit path unchanged.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `.4`'s shapes: `followThrough` inside `applyBump`'s one rollback window with `ctx` capture before/at each mutation; `fileKind`'s realpath-containment test; the per-process `cached*` promise maps; inline gates in `checkAdopter` (CORE-479); fixture groups (`makeAdopter`, `runCli`, `installHook`, `headFiles`)

- [x] **Minimal refactor gate** — `fileKind` → `pathKind(repo, path, type)` so directory roots share the symlink-containment test (its two callers unchanged in behaviour: they test only `'file'` / `'symlink'`); `cachedWorkflowBlock` now reads through the new `cachedFlaitronFile` instead of a second `git show` cache. Retired flag machinery deleted per operator answer. Nothing else touched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `tools/update-adopters.mjs`: `WIRING_SURFACES` → `{ platform, root, skillsDir, snippetPath }` descriptors; removed `wiredSkillKeys`, `addedFilesForSurface`, `newSkillWiringSurfaces`, `formatSkillsNote`, `cachedNewSkillWiringSurfaces`. New: `snippetLinks` (fenced `ln -s`, dst one slug under the surface, src under `../../.flaitron/core/`, submodule path swapped), `codexRoster` (reconcile-skills.md's roster rule), `cachedFlaitronFile` / `cachedFlaitronTree` (FLAITRON_REPO at a tag), `wiringPlan` (create / Codex conflicts / notes / prune roots; one `check-ignore` call), `wireSkills` (mkdir, symlink, prune tracked dangling links into the submodule; `ctx.links` / `ctx.dirs`), `auditForks`, `forkPassGaps`, `cachedForkDrift`. `checkAdopter` gains the Codex-conflict and pass-gap gates after the dirty-submodule gate and returns `forkNote` (bump + pass-gap skip rows). `rollbackBump` undoes link changes newest first and `rmdir`s created directories before the file/submodule/index steps. `reportResult` prints `forkNote` where `skillsNote` was (and on skip rows).
- Header: two gate-list entries, new "Skill wiring" and "Audit forks" paragraphs, rollback and commit-contract paragraphs widened to links, "Not covered" rewritten (absent platforms, pass-file copy / re-reconcile, Codex conflict resolution, untracked retired-link removal, sparse trim, agent-home shadow check; dry run previews no follow-through).
- `tools/update-adopters.test.mjs`: dropped the three flag tests and the `skillsNote` assertion; new group "skill wiring and audit forks (CORE-852.5)" — 8 cases (pure parse, present-surface wiring + custom entry, vendored path + ignored destination, prune, Codex conflict dry-run/apply/empty roster, fork pass gap/deleted/overlay/CLI rows, unvalidated markers, link rollback). Fixtures derive the roster and the older-passes tag from real tags.
- Mutation checks: disabling `wireSkills` fails the three wiring cases; disabling the link-rollback loop fails the rollback case (which first proved vacuous under the wiring mutation, so its hook now records the staged paths).
- `SECURITY.md` §"Fleet updater": intro no longer says "not its per-platform wiring repair"; commit bullet names the link writes and their containment rules, the marker validation, and links in the rollback. `docs/MIGRATION.md` §1.2 sweep sentence: the new skips, the link writes, untracked links kept, drift noted.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `node --check` on both files (zero-dep plain Node, no linter config)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --check tools/update-adopters.mjs` → exit 0 · `node --check tools/update-adopters.test.mjs` → exit 0
- `node --test tools/update-adopters.test.mjs` → exit 0, 119/119 pass (18 suites); the 8 `(CORE-852.5)` cases cover Acceptance rows 1–7
- `grep -cE 'newSkillWiringSurfaces|formatSkillsNote|skillsNote' tools/update-adopters.mjs tools/update-adopters.test.mjs` → `0` / `0`
- `grep -c 'not its per-platform wiring repair' SECURITY.md` → `0`; header, SECURITY and MIGRATION prose re-read (judgment)
- `bash tools/drift-checks.sh` → exit 0, every check `ok`
- Additive, read-only: `node tools/update-adopters.mjs --root ~/Code` → 24 current (no gate reached); `wiringPlan(…, 'v8.1.0')` over the live fleet → no conflicts, no creates, no notes in all 24 (19 with `.claude` + `.agents/skills`, 5 also `.grok/skills`)
- Structural: no duplication (`pathKind` serves both file and dir callers; one FLAITRON_REPO file cache now backs the Workflow block too); no dead code (the flag's five functions removed with their only callers and tests)

**External review** (`/code-review medium`, scoped to the uncommitted working-tree diff — the tree was clean at start) → 8 findings:

| # | Finding | Rung | Disposition |
|---|---|---|---|
| 4 | A tracked in-submodule dangling link at a roster path is noted "kept custom", then pruned — roster link left missing | **blocker** (row 1) | fixed: `wireSkills` prunes first, then re-plans creates; test "replaces a stale in-submodule link at a roster path" |
| 2, 3 | Non-Codex links get no body check, so a link can be created dangling, and the prune then removes a link this run staged (commit pathspec fails, bump rolls back every run) | **blocker** (row 1) | fixed: per-link body check against FLAITRON_REPO at the target → `not wired (missing pinned body)`; prune-before-create means the prune never sees a created link. No regression fixture: no real tag ships a roster entry without its body |
| 8 | No test for the symlinked `.agents` parent row 2 names | **blocker** (row 2 evidence) | fixed: `linked-parent` fixture in the Codex-conflict test |
| 1 | `claude/AGENTS-snippet.md:80` still names the deleted `wiredSkillKeys()` | note | fixed: names `snippetLinks()` / `codexRoster()`; file added to `touches:` |
| 6 | Redirect note names `.claude/skills` when `.claude` is the link | note | fixed: names whichever path is redirected |
| 7 | Any `stat` error (EACCES, ELOOP) read as dangling, so prunable | note | fixed: only ENOENT / ENOTDIR count. No fixture: a loop into the submodule would dirty the submodule worktree and skip the adopter first |
| 5 | `codexRoster`'s `ft-[a-z-]+` narrower than `snippetLinks`' `[a-z0-9-]+` | note | no change: `ft-[a-z-]+` is `codex/reconcile-skills.md`'s exact roster regex — widening it here would wire what `/ft-update` does not |

Phase 3 re-run after the fixes: `node --check` both → 0 · `node --test tools/update-adopters.test.mjs` → exit 0, 120/120 · flag grep → `0` / `0` · SECURITY grep → `0` · deleted-name sweep over live files → no hits · `bash tools/drift-checks.sh` → exit 0 · live-fleet `wiringPlan` at v8.1.0 → 24 adopters, 0 non-empty plans.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change (names the tool, not its wiring) · `AGENTS.md` no change (validation commands unchanged) · `SPEC.md` no change (carve-out wording is `.6`'s) · `docs/MIGRATION.md` **updated** (§1.2 sweep sentence: new skips, link writes, untracked kept, drift noted) · `claude/AGENTS-snippet.md` **updated** (parser names: `snippetLinks()` / `codexRoster()` for the deleted `wiredSkillKeys()`) · `codex/` `cursor/` `grok/` `AGENTS-snippet.md` no change ("parses it" still true) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` **updated** (§"Fleet updater" intro + commit bullet) · `docs/AGENT-NEUTRALITY.md` `docs/PLATFORMS.md` `claude/CAPABILITIES.md` `docs/AGENT-COMPAT.md` `docs/EXTERNAL-AGENTS.md` `docs/WORKTREES.md` `docs/VISION.md` no change (no updater-wiring content)

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A: the prune-before-create ordering and the ENOENT-only dangling rule are code comments at `wireSkills` / `danglingLinks`, where the next edit will see them

**Final Summary:**

The fleet updater now reconciles skill wiring inside `.4`'s rollback window. On each surface an adopter already has (`.claude`, `.agents/skills`, `.cursor/skills`, `.grok/skills`) it first removes tracked dangling links into the submodule, keeping and noting untracked or foreign ones. It then creates the roster links still missing, read from FLAITRON_REPO at the target with a body check, skipping and noting ignored destinations and keeping and noting custom ones. Codex follows `codex/reconcile-skills.md`: a redirected root, a custom entry at a roster path, or a missing or empty roster skips the adopter (operator decision). Audit forks in `.claude/skills` / `.agents/skills` get a drift note; a full-copy `ft-audit` fork missing a pass file shipped after its marker skips. Marker values are validated before they reach git. The old "run /ft-update to wire" flag is removed (operator decision), and the header's "Not covered" paragraph now lists what still needs `/ft-update`. External review raised 3 blockers: stale roster link kept-then-pruned, no body check, and an untested symlinked `.agents`. It also raised 4 notes; all 7 were fixed, and one note was declined to keep reconcile-skills parity.

- **Changed files:** `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs`, `SECURITY.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `.flaitron/PLAN.md` (stub), this note (archived).
- **Verification:** 120/120 tests (9 new `CORE-852.5` cases, two mutation-checked); `node --check` ×2; flag greps `0`/`0`; SECURITY grep `0`; drift checks exit 0; live-fleet `wiringPlan` at v8.1.0 → 0 non-empty plans across 24 adopters — receipt in Testing Notes.
- **Refactors:** `fileKind` → `pathKind(repo, path, type)` (file + dir); `cachedWorkflowBlock` reads through the new `cachedFlaitronFile`.
- **Doc verdict:** `SECURITY.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md` updated; rest no change.
- **`touches:` reconciliation:** declared `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs`, `SECURITY.md`, `docs/MIGRATION.md`; diff adds `claude/AGENTS-snippet.md` (review note #1, added to `touches:`) plus the workflow bookkeeping (PLAN + note).
- **Maintainability:** one engine now owns pin, follow-through, wiring and fork gates; the deliberate deviations from W (Codex via reconcile-skills, both fork roots, drift note only on bump/pass-gap rows, prune-before-create, body check) and from `reconcile-skills.md` (untracked retired links kept) are named here so `.6`'s `/ft-update` parity work and `.7`'s parity run don't read them as drift.

**Archived:** 2026-10-31
