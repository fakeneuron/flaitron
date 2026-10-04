---
title: Conventions Declines Count
status: completed
tags: []
created: 2026-07-27
due:
related-tasks: []
---

# CORE-374 | Conventions Declines Count

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Fix `README.md:25` and `CONTRIBUTING.md:35` to state `docs/CONVENTIONS.md` declines five things (adding the missing "CI / GitHub Actions" item), not four.

## ✅ Acceptance

- [x] `README.md:25` lists all five declines including CI / GitHub Actions
- [x] `CONTRIBUTING.md:35` lists all five declines including CI / GitHub Actions
- [x] Wording matches `docs/CONVENTIONS.md`'s actual decline list

## 🧩 Subtasks

- [x] Add "CI / GitHub Actions" to the decline list in `README.md:25-26`
- [x] Add "CI / GitHub Actions" to the decline list in `CONTRIBUTING.md:35`
- [x] Re-verify both against `docs/CONVENTIONS.md`'s actual five-item list

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed drift is real and current — both `README.md` and `CONTRIBUTING.md` still summarize the decline list as four items, missing "CI / GitHub Actions" which is a live §heading in `docs/CONVENTIONS.md`. Straightforward doc fix, no scope ambiguity.

- [x] Read relevant source files

- [x] **Best Practices Review** — N/A: pure documentation-text fix, no code/module boundaries touched.

- [x] **Archive skim** — `archive/core/CORE-375.md` and `CORE-377.md` are the immediate predecessor docs-currency tasks (citation-drift fixes in `docs/AGENT-NEUTRALITY.md` / `docs/PLATFORMS.md`, filed from the same 2026-07-27 audit-docs run). Same shape: minimal targeted text edit, no code, no other files. No blockers or hardlink notes.

- [x] **Drift check** — Task description's `README.md:25` / `CONTRIBUTING.md:35` line citations match current file content. `docs/CONVENTIONS.md` §"CI / GitHub Actions" (line 86) is a real, currently-declined convention with rationale (validation runs inline in Phase 3 + `/ft-release`, so CI would duplicate without adding enforcement). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumption: fix is wording-only — append "CI / GitHub Actions" (or equivalent short form) to both summary lists, matching each doc's existing phrasing style, without otherwise rewording the surrounding sentence.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

`docs/CONVENTIONS.md` §"Declines" lists five items in doc order: CHANGELOG.md, ADRs as a separate registry, Release automation, Pre-commit hooks, CI / GitHub Actions (lines 54-92 approx). Both `README.md:25-26` and `CONTRIBUTING.md:35` list only the first four, in the same order, then stop before CI/GitHub Actions — a straight omission, not a reordering or renaming. Fix is to append the fifth item to each list, keeping each file's existing parenthetical-list style intact.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing parenthetical-list pattern each doc already used for the decline summary; no new shape needed.

- [x] **Minimal refactor gate** — N/A: no refactor, single-phrase insertion only.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: doc-text-only change, no testable behavior.

**Implementation Notes:**

Two one-line edits: `README.md:25-26` and `CONTRIBUTING.md:35`, each appending ", CI / GitHub Actions" to the existing parenthetical decline list. No other files touched, no wording changed beyond the addition.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown-only change, no test suite covers doc prose.

- [x] Ran lint/type-check on changed code — N/A: no code changed.

- [x] **Quality assertions** — N/A: two-word insertion into an existing list, no duplication/dead-code/complexity/public-surface concerns.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A: no frontend surface touched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep**
  - `README.md` — updated (this task's fix: decline list now includes CI / GitHub Actions)
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change (source of truth; untouched)
  - `CONTRIBUTING.md` — updated (this task's fix: decline list now includes CI / GitHub Actions)
  - `SECURITY.md` — no change

- [x] Closed — PLAN.md line flipped to stub form, moved to top of `## Completed`; tasknote archived to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted (below)

**Final Summary:**

Fixed a decline-count drift: `README.md:25-26` and `CONTRIBUTING.md:35` both summarized `docs/CONVENTIONS.md`'s declined-conventions list as four items, omitting the fifth (§"CI / GitHub Actions", added in a prior doc pass). Appended "CI / GitHub Actions" to both parenthetical lists, verified against the canonical five-item list in `docs/CONVENTIONS.md`. Two one-line text edits, no code, no tests affected, no other files touched.

**Archived:** 2026-07-27
