---
title: micro-default-wording
status: completed
tags: []
created: 2026-10-27
due:
related-tasks: [CORE-818]
touches:
  - claude/skills/ft-task/SKILL.md
  - codex/skills/ft-task/SKILL.md
  - claude/skills/ft-task/micro-mode.md
  - claude/skills/ft-file-task/SKILL.md
---

# CORE-838 | micro-default-wording

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-818]]

## 🎯 Goal

Align all requested `--micro` routing prose with the v7.5.0 default for known-scope work without a design question.

## ✅ Acceptance

- [x] The Claude and Codex `/ft-task` descriptions describe `--micro` as the default route for known work — `grep -qF 'default route for known work' claude/skills/ft-task/SKILL.md && grep -qF 'default route for known work' codex/skills/ft-task/SKILL.md`
- [x] `micro-mode.md` cites the known-scope/no-design-question routing rule — `grep -qF 'scope is known and it carries no design question' claude/skills/ft-task/micro-mode.md`
- [x] `/ft-file-task` no longer calls the `--micro` route “one-shot” — `! grep -qF 'for a one-shot' claude/skills/ft-file-task/SKILL.md`
- [x] Required drift guards pass — `bash tools/drift-checks.sh pair_b pair_m context_budget`

## 🧩 Subtasks

- [x] Replace the two `/ft-task` description phrases while preserving every flag token.
- [x] Align the micro-mode routing sentence with the canonical selection rule.
- [x] Replace the two stale `/ft-file-task` “one-shot” route descriptions.
- [x] Run the requested drift guards and inspect the task diff.

## 🔗 Related

- [[CORE-818]] — established the v7.5.0 routing default for known work without a design question.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All four requested surfaces still use pre-v7.5.0 sizing or “one-shot” language, while `SPEC/tasknote-selection.md` defines the current default route by known scope and absence of a design question.

- [x] Read relevant source files — the four requested skill files, `SPEC/tasknote-selection.md` routing section, and CORE-818's archived tasknote.

- [x] **Best Practices Review** — N/A: narrow contract-prose alignment with no code or module boundary.

- [x] **Archive skim** — README confirms `CORE-*` → `archive/core/`; CORE-818 is the load-bearing predecessor. Its decision: known work with no design question routes to explicit `--micro`, while unknown scope, tradeoffs, `--loop`, and `--debug` stay full.

- [x] **Drift check** — the PLAN line's four named locations exist and contain the stale phrases; the selection contract at `SPEC/tasknote-selection.md:81-99` supplies the replacement rule. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — `--unattended` prevents questions; assume the requested descriptions should say “default route for known work,” and the file-task invocation examples should name `--micro` for known work with no design question.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- This task deliberately changes only the four locations named in PLAN.md. Existing flag tokens and argument hints remain verbatim so Pair B/M grammar bindings continue to hold.
- Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing one-line routing descriptions in place.

- [x] **Minimal refactor gate** — prose-only substitutions; no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: contract prose; drift checks cover the bound formatting and context budgets.

**Implementation Notes:**

- Replaced both task-runner descriptions with “default route for known work,” while preserving all documented flags and aliases.
- Rewrote the micro fragment's routing pointer with the exact canonical qualifiers: known scope and no design question.
- Replaced both `/ft-file-task` “one-shot” labels with the canonical known-work/no-design-question route. No refactor or unrelated cleanup.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh pair_b pair_m context_budget` → 0.

- [x] Ran lint/type-check on changed code — N/A: Markdown-only skill prose; `git diff --check` → 0.

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: four one-line wording substitutions with direct grep and drift-check receipts; no meaningful independent code review surface.

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no frontend surface.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -qF 'default route for known work' claude/skills/ft-task/SKILL.md && grep -qF 'default route for known work' codex/skills/ft-task/SKILL.md` → 0
- `grep -qF 'scope is known and it carries no design question' claude/skills/ft-task/micro-mode.md` → 0
- `! grep -qF 'for a one-shot' claude/skills/ft-file-task/SKILL.md` → 0
- `bash tools/drift-checks.sh pair_b pair_m context_budget` → 0 (`context_budget`, `pair_b`, `pair_m` ok)
- `git diff --check` → 0. The changed prose has no duplicated routing rule or stale “one-shot” / sizing claim.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all AI-referenced docs unchanged: the routing alignment is confined to excluded skill surfaces; no always-loaded or public documentation restates these exact descriptions.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-10-27.` stub, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A: narrow language-alignment task; the drift pairs already bind the relevant flag-token invariants.

**Final Summary:**

Aligned all four requested `--micro` descriptions with the v7.5.0 default route: known work with no design question. The `/ft-task` descriptions now name the default, the micro fragment names its canonical qualifiers, and `/ft-file-task` no longer characterizes the route as a one-shot.

- Changed: `claude/skills/ft-task/SKILL.md`, `codex/skills/ft-task/SKILL.md`, `claude/skills/ft-task/micro-mode.md`, and `claude/skills/ft-file-task/SKILL.md`.
- Verification: targeted acceptance greps, `bash tools/drift-checks.sh pair_b pair_m context_budget`, and `git diff --check` all passed.
- Refactors: none. Doc verdict: all AI-referenced docs unchanged.
- `touches:` reconciliation: declared four deliverable paths = changed deliverable paths; this tasknote and PLAN.md are lifecycle records.
- Maintainability: the skills now consistently direct users to the canonical default rather than obsolete size/one-shot wording.

**Archived:** 2026-10-27
