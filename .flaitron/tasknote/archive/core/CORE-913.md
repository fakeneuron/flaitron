---
title: seed-grouped-stays
status: completed
tags: []
created: 2026-11-17
due:
related-tasks: []
touches:
  - claude/skills/ft-seed-unattended/SKILL.md
---

# CORE-913 | seed-grouped-stays

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-897]]

## 🎯 Goal

Shorten `/ft-seed-unattended`'s Step 3 review on large plans: stays that share one reason and clause collapse to one line listing their IDs.

## ✅ Acceptance

- [x] Step 3's Stays item defines the grouped line `<ID>, <ID>, … — stay — <reason>` for stays whose reason (clause included) is byte-identical, IDs in PLAN order; a lone stay keeps the one-line form — `grep -qF '<ID>, <ID>, … — stay — <reason>' claude/skills/ft-seed-unattended/SKILL.md && grep -q 'byte-identical' claude/skills/ft-seed-unattended/SKILL.md`
- [x] Grouping changes only the display: counts still count each row, and the reply grammar is unchanged (stays are not reply targets) — `judgment`: prose reading of Step 3 items 1 and 5
- [x] SKILL.md stays under its 33,000 budget — `bash tools/drift-checks.sh context_budget`
- [x] Drift checks pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Rewrite Step 3 item 4 (Stays) in `claude/skills/ft-seed-unattended/SKILL.md` with the grouped form
- [x] Run drift checks + context budget
- [x] External review over this diff

## 🔗 Related

- [[CORE-897]] — last substantial edit to the seeder body
- natabula NAT-627.4 — source: grouped-stays form routed upstream after the 2026-11-15 fleet walk (one 43-row plan)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** SKILL.md Step 3 item 4 still reads "`ID — stay — <reason>`, one line each"; no grouped form exists anywhere.

- [x] Read relevant source files — `claude/skills/ft-seed-unattended/SKILL.md` (whole); `scope-and-question.md` §"Step 3"; `SPEC/unattended-candidacy.md` §"Three postures" Stays bullet and **Stay reason**; codex wrapper (no stay text)

- [x] **Best Practices Review** — N/A: prose skill edit, no code

- [x] **Archive skim** — `archive/core/` (README: `CORE-*` → `archive/core/`); hits on the SKILL.md path include CORE-897, CORE-895, CORE-858, CORE-850.x, CORE-815.4, CORE-812.3 — none defines or relies on the one-per-line stays shape. Source note natabula NAT-627.4 read: row filed at `ae707873`, no shape beyond the PLAN line.

- [x] **Drift check** — PLAN line matches SKILL.md line 266 text; the SPEC module's Stays bullet ("Every other declined row, with one reason") stays true under grouping, so no SPEC edit. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: group only on a byte-identical reason line (clause suffix included), so rows whose reason names a row-specific path or note never merge; always group (no row-count threshold); groups ordered by the first member's PLAN position; counts and reply grammar untouched; the SPEC module's Stays bullet needs no change.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Budget: SKILL.md 27,942 of 33,000; a one-bullet rewrite fits.
- `scope-and-question.md` adds cap stays (`scope deferred — cap`, `question deferred — cap`); these carry no row-specific text and so group naturally — the common large-plan case.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing Step 3 item-4 line shape (`ID — stay — <reason>`) with a multi-ID variant; no new section

- [x] **Minimal refactor gate** — no refactor

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: prose skill; no test reads Step 3's display shape

**Implementation Notes:**

- One sentence pair added to Step 3 item 4. A first draft also said "a reason naming a row's own path or note never merges"; dropped as redundant with byte-identical and ambiguous for a shared keyword path. SKILL.md 27,942 → 28,178.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no tests read the skill text; acceptance greps below

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh`, `git diff --check`

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -qF '<ID>, <ID>, … — stay — <reason>' SKILL.md && grep -q 'byte-identical' SKILL.md  → 0
bash tools/drift-checks.sh context_budget                                               → 0 (SKILL.md 28,230 / 33,000)
bash tools/drift-checks.sh                                                              → 0
git diff --check                                                                        → 0
```

Acceptance 2 (judgment): item 4 says "Display only: each row still counts, and a stay ID is not a reply target"; items 1 and 5 unchanged.

External review: `/code-review medium` over this task's working-tree diff, 7 notes, no blockers. Fixed 6: the opener "one line each" contradicted grouping (now "in PLAN order" + a **Grouped:** sentence); stays' base order unstated (PLAN order added); the no-gate report path now names item 4's grouped form; Acceptance 1's grep passed before the edit (now greps the grouped form); stay IDs as reply targets (now stated); mid-sentence placement (own sentence). No change on 1: rows whose reasons carry per-row text (`over cap — <N> words`, a keyword path) do not group. That is the intended byte-identical rule.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update — no change: no doc that names the seeder (README, GLOSSARY, MIGRATION, EXTERNAL-AGENTS, PLATFORMS, AGENT-NEUTRALITY, SPEC/unattended-candidacy.md) describes the stays display; the SPEC Stays bullet stays true; CONTEXT-BUDGET's skill-body ledger re-measures at release

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

`/ft-seed-unattended` Step 3 now groups stays whose reason line is byte-identical onto one line listing their IDs in PLAN order. Cap and clause stays on a large plan now take a few lines instead of one per row. Counts and the reply grammar are unchanged.

- Changed: `claude/skills/ft-seed-unattended/SKILL.md` (Step 3 item 4 + the no-gate report sentence; 27,942 → 28,230), plus this note and the PLAN stub.
- Verification: four commands in Testing Notes, all exit 0. External review: 7 notes, 6 fixed, 1 no-change with reason.
- `touches:` reconciliation: diff matches the declared SKILL.md path (plus workflow files).
- Maintainability: display rule only; the predicate and Stay-reason order stay single-sourced in the SPEC module.

**Archived:** 2026-11-17
