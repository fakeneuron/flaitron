---
title: dirty-tree-cue
status: completed
tags: []
created: 2026-10-26
due:
related-tasks: []
touches:
  - SPEC/cue-vocabulary.md
  - SPEC.md
  - SPEC/procedures/ft-task.md
  - SPEC/gate-postures.md
  - claude/skills/ft-task/preamble.md
  - claude/skills/ft-task/unattended-mode.md
  - claude/skills/ft-open-epic/SKILL.md
  - claude/skills/ft-close-epic/SKILL.md
  - claude/skills/ft-close-epic/unattended-close-epic.md
  - docs/AGENT-COMPAT.md
  - docs/DOGFOOD.md
---

# CORE-833 | dirty-tree-cue

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[RELATED]]

## 🎯 Goal

Give the foreign-dirt gate one inline stop marker, `🚧 DIRTY — commit, stash, or discard first:`, followed by the dirt list, and use that wording in every skill and SPEC copy of the gate.

## ✅ Acceptance

- [x] `SPEC/cue-vocabulary.md` registers 🚧 `DIRTY` in the event-cue table, with the emission `🚧 DIRTY — commit, stash, or discard first:` — `grep -q '| Dirty tree | 🚧 | `DIRTY`' SPEC/cue-vocabulary.md`
- [x] No skill or SPEC copy still tells the runner to "surface the dirt list" — `grep -R "surface the dirt list" --include='*.md' SPEC claude/skills` prints nothing
- [x] Each attended gate copy emits the marker — `grep -l '🚧 DIRTY — commit, stash, or discard first:' SPEC.md SPEC/procedures/ft-task.md SPEC/cue-vocabulary.md claude/skills/ft-task/preamble.md claude/skills/ft-open-epic/SKILL.md claude/skills/ft-close-epic/SKILL.md` lists all six
- [x] `--unattended` still writes nothing and keeps `⏸ --unattended stop — foreign-dirt:`, and emits the marker plus the path list ahead of that line — `grep -q '🚧 DIRTY — commit, stash, or discard first:' claude/skills/ft-task/unattended-mode.md`
- [x] The non-render label roster includes `DIRTY` — `grep -q 'DIRTY' docs/AGENT-COMPAT.md`
- [x] Budgeted copies stay under cap — `bash tools/drift-checks.sh context_budget`

## 🧩 Subtasks

- [x] Add the 🚧 `DIRTY` row and emission note to `SPEC/cue-vocabulary.md`
- [x] Replace the plain STOP wording in `SPEC.md`, `SPEC/procedures/ft-task.md`, `preamble.md`, `ft-open-epic`, and `ft-close-epic`
- [x] Point the `--unattended` dirt stop at the same marker without dropping the machine-readable `⏸` line
- [x] Add `DIRTY` to the `docs/AGENT-COMPAT.md` label roster
- [x] Run `just check` (full validation set)

## 🔗 Related

- None cited on the PLAN.md line.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The foreign-dirt gate still says STOP and "surface the dirt list"; 🚧 is unused. The PLAN line matches that gap.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Area `CORE-*` → `archive/core/` from the README table. Priority Low. `[light]` on Grok 4.7 (heavy-band at this session's effort, above the tag) — satisfied. Tree clean. No existing tasknote, archive note, or sidequest stub. Description is under 70 words.

**Best Practices Review:** N/A for module boundaries. The cue table in `SPEC/cue-vocabulary.md` is the owner, the same shape [[CORE-820]] used for 📭 `EMPTY`. Skills emit; they do not invent a second glyph.

**Archive skim:** `archive/core/` is the declared folder and is populated. Load-bearing hits: [[CORE-820]] registers a cue in the vocabulary table, emits it from the owning contract, and adds the label to `docs/AGENT-COMPAT.md`. [[CORE-358]] / [[CORE-473.2]] own the gate's behavior: attended STOP, and under `--unattended` write nothing (a parked note would itself be dirt). The machine-readable line is `⏸ --unattended stop — foreign-dirt:`.

**Drift check:** Attended STOP wording lives in `SPEC.md` §"Paper-complete guard", `SPEC/procedures/ft-task.md`, `claude/skills/ft-task/preamble.md`, `ft-open-epic/SKILL.md`, and `ft-close-epic/SKILL.md`. `SPEC/gate-postures.md`'s matrix cell says STOP as the halt verb, shared with the model-mismatch row, and the same section forbids minting a cue glyph in that table — so the cell stays STOP and the prose names `DIRTY`. The `⏸` line is not plain STOP wording and stays. `ft-open-epic/SKILL.md` is 32,927 / 33,000 bytes, so that copy's replacement must not grow the file.

No clarifications needed (--fast). Assumptions: the marker is an event-cue inline prefix, not a banner; `--fast` does not suppress it; `--unattended` emits the marker and the path list, then the existing `⏸` line, and still writes nothing; `docs/AGENT-COMPAT.md` gains `DIRTY` and `docs/GLOSSARY.md` does not (it has no per-event-cue entries); the viz has no cue renderer.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the event-cue table the way [[CORE-820]] extended the next-task table. Attended copies now emit the marker and then the porcelain lines. `--unattended` emits that block and then the existing `⏸ --unattended stop — foreign-dirt:` line, and still writes nothing. The posture matrix cell stays `STOP`: that table forbids minting a cue glyph, and `STOP` is the halt verb it already uses for model-mismatch. No code, so no new test. `docs/DOGFOOD.md`'s render list gained `DIRTY`, and `EMPTY`, which that "full vocabulary" list had already dropped.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A, no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

`--unattended` full set: `just check` → 0 (viz 627 tests, typecheck, lint, build, updater tests, drift-checks self-test, `bash tools/drift-checks.sh`). After the review fixes, `bash tools/drift-checks.sh` → 0, including `context_budget`. `SPEC/procedures/ft-task.md` is 34,176 bytes (cap 34,200). `ft-open-epic/SKILL.md` is 32,906 (cap 33,000).

Acceptance greps: cue row present; `surface the dirt list` has no matches; the six attended paths contain the marker; `unattended-mode.md` contains the marker and the `⏸` line; `docs/AGENT-COMPAT.md` contains `DIRTY`.

Structural half: the gate wording is one marker, not a second stop recipe. No dead code. `docs/GLOSSARY.md` unchanged — it has no per-event-cue entries.

**External review:** no blockers. Notes, all fixed: the procedure's unattended sentence now names the `⏸` line without applying it to archive collisions; `gate-postures.md` prose names the full marker and the `⏸` line (the matrix cell stays `STOP`); `/ft-close-epic`'s unattended fragment no longer asks the `⏸` line to repeat porcelain paths; `docs/DOGFOOD.md` render list gained `🚧 DIRTY` and the already-missing `📭 EMPTY`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

The foreign-dirt gate now stops with `🚧 DIRTY — commit, stash, or discard first:` and the dirt list. Attended skills and `SPEC.md` use that line. An `--unattended` run emits it and then `⏸ --unattended stop — foreign-dirt:`, and still writes nothing.

Doc-drift: `SPEC.md` and `docs/AGENT-COMPAT.md` updated. `docs/DOGFOOD.md` updated (outside the sweep set; the render list claims the full vocabulary). `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change. No deferred operator step. unattended-candidates: none.

`touches:` reconciliation: the diff is the eleven declared paths. No refactor. One cue, one emission shape.

**Learnings:** N/A

**Archived:** 2026-10-26
