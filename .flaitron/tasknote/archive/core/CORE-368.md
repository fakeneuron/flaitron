---
title: contract-doc-sync
status: completed
tags: []
created: 2026-07-26
due:
related-tasks: []
---

# CORE-368 | contract-doc-sync

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Sync SPEC/CAPABILITIES/SKILL.md docs to reflect the current `--fast` invoker list, the `## Completed` archive-convention citation, and CORE-365's 9-template enumeration.

## ✅ Acceptance

- [ ] SPEC/gates.md §"`--fast` operator override" invoker list includes `/ft-debug` and `/ft-goal-task`, and notes `/ft-spec`'s distinct review-pause-only `--fast` variant
- [ ] claude/CAPABILITIES.md's `--fast` / `-f` row mirrors the same widened invoker list + `/ft-spec` note
- [ ] The `## Completed` archive-convention citation in all 6 audit-family SKILL.md files (`ft-audit`, `ft-audit-docs`, `ft-audit-backend`, `ft-audit-frontend`, `ft-audit-security`, `ft-audit-performance`) points to `SPEC/tasknote-selection.md` §"`## Completed` archive convention" instead of a bare `SPEC` citation
- [ ] SPEC.md §"Working in the flowtron repo itself" and README.md §"Repo layout" `templates/` lines mirror CORE-365's fuller template enumeration (full/micro/starter/sidequest/spec/loop-heartbeat/audit-overlay templates + PLAN.md/tasknote-README.md seed files)

## 🧩 Subtasks

- [ ] Widen the `--fast` invoker list in SPEC/gates.md §"`--fast` operator override"
- [ ] Widen the `--fast` row in claude/CAPABILITIES.md to match
- [ ] Repoint the archive-convention citation in the 6 audit-family SKILL.md files
- [ ] Mirror the 9-template enumeration into SPEC.md §repo-layout
- [ ] Mirror the 9-template enumeration into README.md §"Repo layout"
- [ ] Grep-verify all edited citations resolve to real headings

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Pure doc-sync task surfaced by the 2026-07-26 audit; all three citations verified stale against current code (see Drift check). No blocking dependency, no scope ambiguity.

- [x] Read relevant source files

- [x] **Best Practices Review** — N/A (doc-only edits; no code/module-boundary changes)

- [x] **Archive skim** — skimmed `.flowtron/tasknote/archive/core/` for prior tasknotes touching SPEC/gates.md, claude/CAPABILITIES.md, SPEC.md, and README.md. Frequent hits (CORE-330.4, CORE-353.*, CORE-358, CORE-362.*, CORE-363, CORE-366, CORE-EPIC-208) are routine doc-sync/gate-wiring precedent from the same audit lineage — nothing load-bearing beyond "these contract files get touched often for citation upkeep." CORE-365 (immediate predecessor, same audit batch) is the direct precedent for the template-enumeration mirror: it widened ft-flowtron/SKILL.md's `templates/` parenthetical from `(full, micro, starter, sidequest)` to add `plus spec, loop-heartbeat, and audit-overlay templates` (commit 3fa7f6d).

- [x] **Drift check** — confirmed all three citations:
  - SPEC/gates.md line ~302 currently reads "`--fast` applies to `/ft-task` and `/ft-micro-task` only" — stale; `/ft-debug` and `/ft-goal-task` SKILL.md files both document accepting `--fast`.
  - claude/CAPABILITIES.md line 30's `--fast` row says "Trailing arg on `/ft-task` and `/ft-micro-task`" — same staleness.
  - `/ft-spec` (claude/commands/ft-spec.md) has its own independent `--fast` that only skips the review pause before writing — confirmed genuinely distinct from the ft-task-family gate-suppression semantics, worth a explicit note rather than folding into the invoker list.
  - The 6 audit-family SKILL.md files (`ft-audit`, `ft-audit-docs`, `ft-audit-backend`, `ft-audit-frontend`, `ft-audit-security`, `ft-audit-performance`) all cite `SPEC §"`## Completed` archive convention"` — the section actually lives in `SPEC/tasknote-selection.md` (confirmed via grep; SPEC.md's own Phase-4 checklist item already correctly cites `SPEC/tasknote-selection.md` at line 483).
  - SPEC.md line 53 and README.md line 197 both still say the old 3-item enumeration ("canonical tasknote and PLAN.md templates, plus the audit-overlay fork template" / "canonical tasknote, `PLAN.md`, and audit-overlay fork templates") — pre-dates CORE-365's ft-flowtron widening. `templates/` holds 9 files total: `tasknote-template.md`, `tasknote-micro-template.md`, `tasknote-starter-template.md`, `sidequest-template.md`, `spec-template.md`, `loop-heartbeat-template.md`, `audit-overlay-template.md`, `PLAN.md`, `tasknote-README.md`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) "9-template enumeration" refers to the full file count in `templates/` (7 named template kinds + the `PLAN.md`/`tasknote-README.md` seed files), mirroring CORE-365's phrasing style extended to the two spots named in the task; (2) the `/ft-spec` note is additive prose distinguishing its variant, not a merge into the shared invoker list.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** All three citation-drift claims in the PLAN.md line confirmed accurate against current code — no re-interpretation needed. Discovery surfaced no significant scope deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — mirrored the exact citation/phrasing style already used at each edit site (e.g. CORE-365's `templates/` parenthetical shape for SPEC.md/README.md; the existing `--fast` invoker sentence structure in gates.md/CAPABILITIES.md; the existing `see SPEC §"..."` clause shape in the audit-family files, just repointed)

- [x] **Minimal refactor gate** — N/A; no refactor, four surgical prose edits only, each traced directly to a PLAN.md description clause

- [x] Implemented the minimal solution — 4 edits across 10 files: SPEC/gates.md, claude/CAPABILITIES.md, the 6 audit-family SKILL.md files, SPEC.md, README.md

- [x] Updated/added tests for non-trivial behavior — N/A, doc-only changes

**Implementation Notes:** `git diff --stat` confirms exactly the 10 files scoped in Acceptance changed (2 lines each in the 6 audit files, CAPABILITIES.md, SPEC.md, README.md; 8 lines in gates.md for the added `/ft-spec` sentence). No collateral edits.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, prose/markdown only, no test suite covers doc content

- [x] Ran lint/type-check on changed code — N/A, no code changed

- [x] **Quality assertions** — confirmed all 4 edit sites read correctly in context (re-grepped post-edit), no broken `[[wikilinks]]` introduced, `docs/MIGRATION.md` (referenced by the SPEC.md edit) exists

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend surface touched

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** —
  - `README.md` — updated (this task, §"Repo layout" `templates/` line)
  - `SPEC.md` — updated (this task, §"Working in the flowtron repo itself" `templates/` line)
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — updated (this task, `--fast` row)
  - `docs/AGENT-COMPAT.md` — no change (mentions `--fast` generically, no invoker-list enumeration to drift)

- [x] Closed — PLAN.md line flipped to stub form, moved to top of `## Completed`; tasknote to be archived on commit

- [x] **Evidence-based recap** drafted — see Final Summary

**Final Summary:** Fixed 3 doc-drift findings from the 2026-07-26 audit (#15/#16/#17), all confirmed real during Discovery. 10 files, 15 insertions / 11 deletions, prose-only:
- SPEC/gates.md + claude/CAPABILITIES.md: widened the `--fast` invoker list to include `/ft-debug` and `/ft-goal-task` (both already documented `--fast` support in their own SKILL.md but were missing from the two ledger docs); added a note distinguishing `/ft-spec`'s own unrelated `--fast` (review-pause-only, no gate-surface overlap).
- 6 audit-family SKILL.md files (`ft-audit`, `ft-audit-docs`, `ft-audit-backend`, `ft-audit-frontend`, `ft-audit-security`, `ft-audit-performance`): repointed the `## Completed` archive-convention citation from a bare `SPEC §"..."` to `SPEC/tasknote-selection.md §"..."`, where the section actually lives.
- SPEC.md + README.md: expanded the stale 3-item `templates/` enumeration to mirror CORE-365's fuller listing (full/micro/starter/sidequest/spec/loop-heartbeat/audit-overlay templates + `PLAN.md`/`tasknote-README.md` seed files) — 9 files total in `templates/`, verified via `ls`.

No refactors, no tests added (doc-only). No maintainability regression; citations now resolve to their actual current locations and the invoker lists match what the referenced skills actually implement.

**Archived:** 2026-07-26
