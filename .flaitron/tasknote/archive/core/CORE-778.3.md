---
title: runner-retire
status: completed
tags: []
created: 2026-10-10
due:
related-tasks: [CORE-EPIC-778, CORE-778.2, CORE-778.4, CORE-769.3]
touches:
  - claude/skills/ft-micro-task/
  - codex/skills/ft-micro-task/
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - docs/MIGRATION.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - AGENTS.md
  - tools/drift-checks.sh
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
blocked-by:
  - CORE-778.2
---

# CORE-778.3 | runner-retire

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-778]]

## 🎯 Goal

Hard-cut `/ft-micro-task` now that `/ft-task --micro` carries its shape: delete the Claude and Codex skill directories and update every wiring, roster, migration, and check surface that names the runner as a live skill, following the v7.0.0 `ft-file-followup` precedent.

## ✅ Acceptance

- [x] `claude/skills/ft-micro-task/` and `codex/skills/ft-micro-task/` are gone — `test ! -e claude/skills/ft-micro-task && test ! -e codex/skills/ft-micro-task`
- [x] `SKILL_RENAME.map` carries `ft-micro-task → ft-task`, and a test pins that the real map prunes an adopter's `ft-micro-task` link beside a wired `ft-task` (keep, no swap) — `node --test tools/update-adopters.test.mjs` → 0
- [x] `docs/MIGRATION.md` §"Retired skills" has the v7.0.0 `ft-micro-task` row (the existing MIGRATION-row test binds it), the v7.0.0 upgrade recipe covers it, and §1.2's short roster drops the runner — `grep -c 'ft-micro-task' docs/MIGRATION.md` names only retirement text + `judgment`
- [x] The four `AGENTS-snippet.md` files carry no `ft-micro-task` `ln -s` line, and `claude/AGENTS-snippet.md` + `AGENTS.md` (`CLAUDE.md`) rosters / flags lines no longer name the runner (KEEP IN SYNC pair) — `git grep -n ft-micro-task -- '*AGENTS-snippet.md' AGENTS.md` → empty
- [x] `tools/drift-checks.sh` roster and comment follow the deletion; `step-7.1-mirror-pairs.md` Pair C names `/ft-task --micro` as the micro template's writer — `bash tools/drift-checks.sh` → 0
- [x] Fleet updater syntax checks pass — `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs` → 0

## 🧩 Subtasks

- [x] `git rm -r` both skill directories; remove flaitron-self's local gitignored `.claude/skills/ft-micro-task` + `.agents/skills/ft-micro-task` links
- [x] `tools/update-adopters.mjs`: add `'ft-micro-task': 'ft-task'` to `SKILL_RENAME.map`, update the "four slugs" comment
- [x] `tools/update-adopters.test.mjs`: real-map test — `ft-micro-task` link beside `ft-task` plans as `kept`
- [x] `docs/MIGRATION.md`: retired-skills row, v7.0.0 upgrade recipe (prose count, pair loop, `git grep` list), §1.2 short roster
- [x] Snippets: drop the four `ln -s` lines; `claude/AGENTS-snippet.md` flags / peer-skills / standard-tasknotes lines
- [x] `AGENTS.md` roster and flags lines (KEEP IN SYNC with the snippet)
- [x] `tools/drift-checks.sh`: skill-pin guard roster (7 → 6) and the line-316 comment's example
- [x] `step-7.1-mirror-pairs.md`: Pair C writer for `tasknote-micro-template.md`
- [x] Phase 3: updater suite + syntax, full `drift-checks.sh`, `/code-review medium`

## 🔗 Related

- [[CORE-EPIC-778]] — parent epic: fold `/ft-micro-task` into `/ft-task --micro`
- [[CORE-778.2]] — predecessor: added `--micro` and reduced `/ft-micro-task` to a redirect
- [[CORE-778.4]] — follow-up: removes the contract-layer carve-outs (SPEC, posture, fragments, PLATFORMS, CAPABILITIES)
- [[CORE-778.5]] — follow-up: sweeps the remaining doc mentions to an empty `git grep`
- [[CORE-769.3]] — precedent: the `ft-file-followup → ft-file-task` hard cut at v7.0.0

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** [[CORE-778.2]] closed at `0db364e4`; `/ft-micro-task` is now a redirect stop to `/ft-task <ID> --micro` and nothing else depends on its body. The sequential chain puts this child next.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Read set.** `.flaitron/PLAN.md` rows 23–29; `.1` / `.2` archived notes; `tools/update-adopters.mjs` header + `SKILL_RENAME` + `checkAdopter` + `skillLinkPlan` + `applyBump`; the skill-rename test group in `tools/update-adopters.test.mjs`; `docs/MIGRATION.md` §1.2 and §"Retired skills" + §"Upgrading to v7.0.0"; the four `AGENTS-snippet.md` wiring blocks; `AGENTS.md` roster; `tools/drift-checks.sh` `skill_pin_guard_parity` and the Pair J comment; `step-7.1-mirror-pairs.md` Pair A / C; a full `git grep -n ft-micro-task` outside the archive and VERSION-HISTORY.

**Key finding — v7.0.0 is unreleased.** `git tag` tops out at `v6.1.0` and `SPEC.md` reads `v6.1.0`; the v7.0.0 rename (CORE-EPIC-769) is staged but not cut. So the "major bump at release" this epic needs is that same v7.0.0, and `ft-micro-task` joins `SKILL_RENAME.map` under the existing tag with no updater refactor. The map's semantics already give retirement: `skillLinkPlan` prunes an old link whose new name is already wired (`kept`), and every adopter wires `ft-task`; an adopter that somehow lacks `ft-task` gets the link swapped to it, which is also correct. The MIGRATION-row test (`every SKILL_RENAME entry has its MIGRATION retired-skills row`) binds the row by regex `` | `ft-micro-task` | v7.0.0 | `/ft-task ``. The new test pins the real map, not the fixture: an `ft-micro-task` link beside `ft-task` must plan as `kept`.

**Best Practices Review.** No new shape. The retirement reuses the rename map, the MIGRATION row + hand recipe, and the snippet roster edits exactly as [[CORE-769.3]] did. `skill_pin_guard_parity` counts adopter-subset bodies that carry the byte-identical guard (7 today, including `ft-micro-task`), so it drops to 6.

**Archive skim.** [[CORE-769.3]] (the `ft-file-followup` hard cut): `git mv`, four snippet `ln -s` lines, rosters, drift-check slug list, MIGRATION row; operator follow-up re-pointed flaitron-self's gitignored `.claude/skills` / `.agents/skills` links. [[CORE-571]] (`ft-goal-task` → `--loop`): a runner folded into a flag. Deletion plus retired-skills row, and adopters see the dangling symlink at `/ft-update` Step 4.6. Both match this child.

**Drift check.** Every surface the PLAN line names exists at HEAD `0db364e4`. `CLAUDE.md` is a symlink to `AGENTS.md`, so the "`CLAUDE.md`" item is the `AGENTS.md` roster (KEEP IN SYNC with `claude/AGENTS-snippet.md`). Scope boundary: mentions in SPEC modules, shared `ft-task` fragments and `ft-task/SKILL.md` ("shared with `/ft-micro-task`"), `ft-file-task` routing, PLATFORMS, CAPABILITIES, and EXTERNAL-AGENTS belong to [[CORE-778.4]]. GLOSSARY, README, CONTEXT-BUDGET, AGENT-NEUTRALITY, CODEX-VERIFICATION, and the templates belong to [[CORE-778.5]]. This child edits beyond its line only where the deletion would break a check (`drift-checks.sh` comment, Pair C writer row). It also fixes the `AGENTS.md` / snippet flags lines, which name `/ft-micro-task` as a flag-taker and sit on the roster pair this child owns.

**Clarifications.** No clarifications needed. Assumptions: the retirement rides the unreleased v7.0.0 (the epic's "major bump"); `templates/tasknote-micro-template.md` stays (rewritten for `--micro` by [[CORE-778.2]]); archived micro notes and VERSION-HISTORY are untouched.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern: the [[CORE-769.3]] hard cut, minus the `git mv` (a fold has no new directory) — the rename map, the MIGRATION row and hand recipe, the snippet `ln -s` lines, and the rosters.

- **Deleted:** `claude/skills/ft-micro-task/SKILL.md`, `codex/skills/ft-micro-task/SKILL.md` (`git rm`). Local only: flaitron-self's gitignored `.claude/skills/ft-micro-task` and `.agents/skills/ft-micro-task` links removed so nothing dangles here.
- **`tools/update-adopters.mjs`** — `'ft-micro-task': 'ft-task'` in `SKILL_RENAME.map` under the unreleased `v7.0.0`, with a comment marking it a fold. The header comment names CORE-778.3. No logic change: `skillLinkPlan`'s existing `kept` branch prunes the old link when `ft-task` is wired.
- **`tools/update-adopters.test.mjs`** — new `plan: the real map folds ft-micro-task …` test: an adopter wired with `ft-task` + `ft-micro-task` under `.claude/skills` and `.agents/skills` plans exactly two entries, both `kept` with no `newPath`. It runs against the real `SKILL_RENAME`, not the fixture, so a future edit that turns the fold into a swap fails here.
- **`docs/MIGRATION.md`** — the v7.0.0 `ft-micro-task` retired row (shaped to match the existing row-binding test's regex), the "Upgrading to v7.0.0" prose (five slugs / six rows), the hand-recipe pair loop, and the `git grep` sweep pattern. §1.2's short version now lists `--micro` under `/ft-task` instead of naming the runner.
- **Snippets** — the `ft-micro-task` `ln -s` line dropped from all four. `claude/AGENTS-snippet.md` also loses the runner from the `--fast` / `--unattended` flags line and the peer-skills line, and its standard-tasknotes line now names `/ft-task --micro`.
- **`AGENTS.md`** (`CLAUDE.md` symlink) — the roster and flags lines changed the same way (KEEP IN SYNC with the snippet).
- **`tools/drift-checks.sh`** — `skill_pin_guard_parity` 7 → 6 bodies (count, message, roster). The Pair J comment's foreign-slug example moved to `ft-open-epic`'s `` `/ft-file-task [ID] --starter` `` because the old example file is gone.
- **`tools/drift-checks.test.mjs`** (undeclared) — the guard-parity seeded-drift regex `1 6|6 1` → `1 5|5 1`, forced by the roster change.
- **`step-7.1-mirror-pairs.md`** — Pair C now names `/ft-task --micro` as the writer of `tasknote-micro-template.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` (release-gate suite; the new fold test included) and `node --test tools/drift-checks.test.mjs`

- [x] Ran lint/type-check on changed code — `node --check` on both updater files; `bash tools/drift-checks.sh` for markdown/shell surfaces

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

**Verification receipt** (final pass, after the review fixes):

- `test ! -e claude/skills/ft-micro-task && test ! -e codex/skills/ft-micro-task` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (79 pass, 0 fail). First run before the MIGRATION row → 1: `every SKILL_RENAME entry has its MIGRATION retired-skills row — ft-micro-task → ft-task`, which was expected and passes once the row landed.
- `grep -c ft-micro-task docs/MIGRATION.md` → 4, all retirement text: the row, the in-progress-note clause, the recipe pair, and the sweep pattern. §1.2 no longer names the runner (judgment ✓).
- `git grep -n ft-micro-task -- '*AGENTS-snippet.md' AGENTS.md` → 1 (empty)
- `bash tools/drift-checks.sh` → 0 (`skill_pin_guard_parity` at 6)
- `node --test tools/drift-checks.test.mjs` → 0 (19 pass). First run → 1: `skill_pin_guard_parity fails on its seeded drift`, because the seed regex expected `1 6|6 1`. Updated to `1 5|5 1` and re-ran → 0.
- `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs` → 0

Structural: no duplication. The fold reuses `skillLinkPlan`'s `kept` branch, and the snippet's duplicate `--micro` sentence was removed on review. No dead code. Stale docs are left only where [[CORE-778.4]] / [[CORE-778.5]] own them.

**External review** — `/code-review medium` over the working tree, 7 findings, 0 blockers:

| # | Finding | Grade | Disposition |
|---|---|---|---|
| 1 | `ft-update/SKILL.md` L244 says "wrap it in `/ft-micro-task`", and no child owns it | note | fixed → `/ft-task <ID> --micro` |
| 2 | `ft-seed-unattended/SKILL.md` L204 says "a `/ft-micro-task`", and no child owns it | note | fixed → `/ft-task --micro` |
| 3 | MIGRATION row gives no path for an in-progress old-shape note | note | fixed: the row says to finish it before bumping |
| 4 | The updater header still describes only the swap/global-only cases | note | fixed: the header names the prune-when-wired fold |
| 5 | §1.2 calls `--micro` "the one-shot", which reads as the old lighter ceremony | note | fixed → "micro-sized work recorded in one Notes log" |
| 6 | The snippet's standard-tasknotes line repeats the flags-line `--micro` definition | note | fixed: the sentence is dropped |
| 7 | Heading "Upgrading to v7.0.0 (skill renames)" now also covers a fold | note | no change: [[CORE-769.7]] / [[CORE-769.N]] point the v7.0.0 release's Migration block at that exact heading, so renaming it would break the pending pointer. The body names the fold |

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  `AGENTS.md`: updated (roster and flags lines drop the runner). `claude/AGENTS-snippet.md`: updated (same lines, KEEP IN SYNC, plus the `ln -s` line). `codex/` / `cursor/` / `grok/` `AGENTS-snippet.md`: updated (`ln -s` line). `docs/MIGRATION.md`: updated (retired row, v7.0.0 recipe, §1.2). No change here to `SPEC.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, or `docs/EXTERNAL-AGENTS.md`, whose remaining micro mentions are [[CORE-778.4]]'s. Same for `README.md`, `docs/GLOSSARY.md`, `docs/AGENT-NEUTRALITY.md`, and `docs/CONTEXT-BUDGET.md`, which are [[CORE-778.5]]'s. No change to `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`, or `docs/VISION.md` (no runner or roster content).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  N/A. The reusable fact is that a fold into an already-wired skill is a rename-map entry whose `kept` branch does the pruning. It now lives in the updater header, which is where the next retirement will read it.

**Final Summary:**

`/ft-micro-task` is gone. Its Claude and Codex directories are deleted, and adopters bumping to the unreleased v7.0.0 have the old link pruned beside their existing `ft-task` link: by the fleet updater, or by hand from the MIGRATION recipe.

- **Deleted:** `claude/skills/ft-micro-task/SKILL.md`, `codex/skills/ft-micro-task/SKILL.md`, plus flaitron-self's local gitignored links. **Edited:** `tools/update-adopters.mjs` (map entry + header), `tools/update-adopters.test.mjs` (real-map fold test), `docs/MIGRATION.md` (row, recipe, §1.2), four `AGENTS-snippet.md` files, `AGENTS.md`, `tools/drift-checks.sh` (guard roster 7 → 6, Pair J example), `tools/drift-checks.test.mjs` (seed regex), `step-7.1-mirror-pairs.md` (Pair C writer), and two dangling skill-body mentions found in review (`ft-update`, `ft-seed-unattended`).
- **Decision:** v7.0.0 is not yet tagged (latest is `v6.1.0`), so the fold rides that release's existing `SKILL_RENAME`, with no second migration tag and no updater refactor.
- **Verification:** every Acceptance receipt passes (Testing Notes). External review: 7 notes, 6 fixed, 1 no-change with reason.
- **`touches:` reconciliation:** three undeclared paths edited. `tools/drift-checks.test.mjs` was forced by the guard-roster change; `claude/skills/ft-update/SKILL.md` and `claude/skills/ft-seed-unattended/SKILL.md` were review findings 1–2. Every declared path was edited.
- **Maintainability:** the roster has one fewer skill, and every remaining `ft-micro-task` mention outside the archive and VERSION-HISTORY is owned by [[CORE-778.4]] or [[CORE-778.5]]. At the v7.0.0 release, the tag's Migration block should name the fold alongside the four renames.

**Archived:** 2026-10-10
