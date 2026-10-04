---
title: EXTERNAL-AGENTS.md — unattended-candidates row
status: completed
tags: []
created: 2026-09-12
due:
related-tasks: [CORE-577.N]
touches:
  - docs/EXTERNAL-AGENTS.md
---

# CORE-579 | EXTERNAL-AGENTS.md — unattended-candidates row

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-577.N]]

## 🎯 Goal

Add a `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" row classifying the `unattended-candidates:` line as a stable, versioned-release-only surface.

## ✅ Acceptance

- [ ] New row added to the §"Stable surfaces for callers" table naming the `unattended-candidates:` literal prefix, bare comma-separated IDs in PLAN order or `none`, transcript-only under `--fast` / standalone `--unattended`, and persistence in the discharging runner's Final Summary / `## ✅ Recap` — `judgment`: row content matches CORE-577.N's Miss #1 recommendation verbatim in substance
- [ ] Row's Owner column cites `SPEC/unattended-candidacy.md` §"Three postures" · §"Persistence" — `grep -n 'unattended-candidates' docs/EXTERNAL-AGENTS.md`
- [ ] Table formatting (pipe alignment, row placement) consistent with surrounding rows — `judgment`: visual diff review

## 🧩 Subtasks

- [ ] Re-read `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" current table and `SPEC/unattended-candidacy.md` §"Three postures" / §"Persistence" for exact wording to cite
- [ ] Add the new row per CORE-577.N's Miss #1 recommendation
- [ ] Doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🔗 Related

- [[CORE-577.N]] — audit that surfaced this as Miss #1 (`docs/EXTERNAL-AGENTS.md` did not classify the `unattended-candidates:` line)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line, CORE-577.N Miss #1 finding, and current `docs/EXTERNAL-AGENTS.md` state all agree — the row is missing and the recommendation is fully specified. No re-scope needed.

- [ ] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — doc-only table-row addition; no code touched. New row must match the exact 3-column (`Surface` / `What a caller may rely on` / `Owner`) shape and citation style of the eleven existing rows — no new abstraction, no restructuring of the table.

- [x] **Archive skim** — `archive/core/` grepped for `EXTERNAL-AGENTS.md` and `unattended-candidates`. CORE-577.2 authored the module and EXTERNAL-AGENTS.md's step 2 pointer; CORE-577.N (this task's source) is the only tasknote touching the "Stable surfaces for callers" table itself. No other prior tasknote edited this section.

- [x] **Drift check** — `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" table (lines 83-94) and `SPEC/unattended-candidacy.md` §"Three postures" (lines ~106-125) / §"Persistence" (lines ~126-145) confirmed still current at HEAD; PLAN.md line matches CORE-577.N's Miss #1 wording verbatim. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed (--fast)**. Assumption: the PLAN.md description is the row content to add (it is copied near-verbatim from CORE-577.N's own recommendation), so no further design decision is needed — this is a transcription task, not a design task.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

CORE-577.N (`.flowtron/tasknote/archive/core/CORE-577.N.md`) Miss #1 spells out the exact row content: Owner `SPEC/unattended-candidacy.md` §"Three postures" · §"Persistence"; "what a caller may rely on" = literal `unattended-candidates:` prefix, bare comma-separated IDs in PLAN order or `none`, transcript-only under `--fast` / standalone `--unattended`, persisted in the discharging runner's Final Summary / `## ✅ Recap`. The PLAN.md CORE-579 line is a near-verbatim copy of this. This is Discovery-complete; skip 🛠️ Phase 1→2 gate (no deviation from the filed scope).

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing 3-column table pattern (Surface / What a caller may rely on / Owner); no new shape.

- [x] **Minimal refactor gate** — N/A: single row insert, no surrounding text touched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: doc-only change, no test surface.

**Implementation Notes:**

Added one row to `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers", immediately after the `[unattended]` marker row (thematic proximity — both are unattended-posture surfaces). Content matches CORE-577.N Miss #1 verbatim: literal `unattended-candidates:` prefix, bare comma-separated IDs in PLAN order or `none`, transcript-only under `--fast` / standalone `--unattended`, persisted in the discharging runner's Final Summary / `## ✅ Recap`. Owner cites `SPEC/unattended-candidacy.md` §"Three postures" · §"Persistence".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: doc-only, no test suite covers this file

- [x] Ran lint/type-check on changed code — N/A: markdown only; trailing-whitespace grep clean

- [x] **Verification receipt** — see Testing Notes below; no avoidable duplication (row matches sibling-row shape exactly), no dead code, no complexity added, no public-surface growth beyond the intended one row, and the doc-drift sweep (Phase 4) confirms no other doc needs the same update.

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -n "unattended-candidates" docs/EXTERNAL-AGENTS.md` → 0 (found at lines 63, 88)
- `grep -n ' $' docs/EXTERNAL-AGENTS.md` → 0 (no trailing whitespace)
- Visual review of table rows 83-94 → row formatting consistent with sibling rows (`judgment`)
- No `docs/CONTEXT-BUDGET.md` entry for `docs/EXTERNAL-AGENTS.md`, so no size-budget gate applies

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Added a `unattended-candidates:` line row to `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers", closing the gap CORE-577.N's audit found: the table promised or disclaimed every other operator-less-posture surface but was silent on this one. Row content is verbatim from CORE-577.N Miss #1 — literal prefix, bare comma-separated IDs or `none`, transcript-only under `--fast`/`--unattended`, persisted in the discharging runner's Final Summary / `## ✅ Recap` — with Owner citing `SPEC/unattended-candidacy.md` §"Three postures" · §"Persistence". Placed directly after the `[unattended]` marker row for thematic proximity.

- **Changed:** `docs/EXTERNAL-AGENTS.md` (+1 table row, 1 line). `touches:` reconciliation: declared `docs/EXTERNAL-AGENTS.md`; `git diff --name-only` will also show `.flowtron/PLAN.md` (stub flip) and this tasknote's move to archive — both are closure-mechanic paths, not undeclared scope.
- **Verification:** `grep -n "unattended-candidates" docs/EXTERNAL-AGENTS.md` → exit 0 (lines 63, 88); trailing-whitespace grep → exit 0 (clean); table formatting visually consistent with sibling rows.
- **Refactors:** none made or deferred — single additive row, no surrounding structure touched.
- **Documentation:** doc-drift sweep below; only `docs/EXTERNAL-AGENTS.md` itself changed.
- **Maintainability effect:** closes an out-of-contract ambiguity — a caller can now tell that hooking `unattended-candidates:` is contract, not courtesy, without reading `SPEC/unattended-candidacy.md` directly.

**Doc-drift sweep:**

- `README.md` — no change
- `AGENTS.md` — no change
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `codex/AGENTS-snippet.md` — no change
- `cursor/AGENTS-snippet.md` — no change
- `grok/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change
- `claude/CAPABILITIES.md` — no change
- `docs/AGENT-COMPAT.md` — no change
- `docs/EXTERNAL-AGENTS.md` — updated (this task's deliverable): new stable-surfaces row for `unattended-candidates:`
- `docs/WORKTREES.md` — no change
- `docs/VISION.md` — no change

**Archived:** 2026-09-12
