---
title: audit-context-always-runs
status: completed
tags: []
created: 2026-10-25
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - templates/audit-overlay-template.md
  - docs/MIGRATION.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-825 | audit-context-always-runs

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-661]]

## 🎯 Goal

State in `templates/audit-overlay-template.md` that the `context` audit domain carries no forker slots and always runs through `/audit` whatever the Domains list says, and make `docs/MIGRATION.md`'s adopter-facing audit invocations lead with the fork name `/audit`.

## ✅ Acceptance

- [x] Template §"Domains" says `context` has no forker slots and always runs, regardless of the domain list — `grep -qi 'context.*always' templates/audit-overlay-template.md`
- [x] MIGRATION adopter-facing mentions (§1.2.1 invoke line, post-adopt follow-up, migration checklist) lead with `/audit` and name `/ft-audit` as the unforked form — `grep -n '/ft-audit context\|/ft-audit <domain>\|/ft-audit backend' docs/MIGRATION.md` shows no mention that leads with the bundled name where an adopter would type the fork name
- [x] Doc-drift gates stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Edit `templates/audit-overlay-template.md` §"Domains" (placeholder line + one sentence on `context`)
- [x] Edit `docs/MIGRATION.md` L116 / L330 / L485 to lead with the fork name
- [x] Record whether `/ft-update` reaches the template prose (Discovery Notes)
- [x] Run `bash tools/drift-checks.sh`

## 🔗 Related

- [[CORE-661]] — cleared every placeholder from `passes/context.md`, which is why `context` runs unforked

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** the gap is real — `templates/audit-overlay-template.md` §"Domains" offers a subset example ("backend, security, docs only") but never says `context` is exempt from the list, while `passes/context.md` carries no forker placeholders and runs unforked (CORE-661). MIGRATION L330/L485 lead with `/ft-audit context` and parenthesize the fork name.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Read: template, `passes/context.md`, MIGRATION §1.2.1 + L330/L485, `ft-update` Step 4.5, flaitron-self overlay `.flaitron/audit-overlay/SKILL.md` §Domains (already correct: "`context` needs no delta").
- Best Practices: docs-only; N/A for code boundaries.
- Archive skim: 29 hits on the template path (long-lived file); only CORE-661 (placeholders cleared from `passes/context.md`) bears on this — it is the reason `context` is unforked. No prior tasknote touched the Domains example.
- Drift check: PLAN cites MIGRATION L103/330/485. L103 describes the bundled dispatcher (`/ft-audit <domain>`), correctly named for the scaffold. The adopter-facing invocation line is L116 ("Invoke as `/ft-audit backend …`"). Treating L116/L330/L485 as the adopter-facing set; L103 left as is.
- `/ft-update` Step 4.5 greps `git log <reconciled>..<target> -- claude/skills/<flaitron-tracks>/`; it does not track `templates/audit-overlay-template.md`, so a template Domains edit does **not** reach existing overlays. Out of scope to change ft-update; the four repos' overlays are corrected by their own sessions after release (as PLAN says).
- Clarifications: none needed. Assumptions: wording-only change, no version bump in this task; `docs/MIGRATION.md` is budget-exempt by name.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: wording-only; extended the template's existing prose paragraph under §"Domains" and MIGRATION's existing "(your fork's name …)" parentheticals — no new shape.
- Template: added a three-line paragraph under §"Domains" saying `context` is not a domain to list or omit, always runs, and must never be called "not configured".
- MIGRATION: L116 invoke line, L330 follow-up, L485 checklist now lead with `/audit …` and name `/ft-audit …` as the unforked form. L103 (scaffold description) and the L538/L549 release-history rows deliberately keep the bundled name.
- No tests apply (markdown only).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `grep -qi 'context.*always' templates/audit-overlay-template.md` → exit 0
- `grep -n '/ft-audit context\|/ft-audit backend\|/ft-audit <domain>' docs/MIGRATION.md` → remaining hits are L32/L103 (bundled-scaffold descriptions), L538/L549 (release-history rows), and the two unforked parentheticals at L330/L485 — none lead where an adopter types the fork name.
- `bash tools/drift-checks.sh` → exit 0 (all checks ok, incl. context_budget, pair_q, final_newline).
- External review: N/A — 8-line prose diff across two markdown files, no code; graded against Acceptance by the verify commands above.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A (the ft-update coverage gap is recorded in the Final Summary, not an always-loaded-layer rule)

**Final Summary:**

Changed: `templates/audit-overlay-template.md` (+4 lines: `context` always runs, never "not configured") and `docs/MIGRATION.md` (L116, L330, L485 lead with the fork name `/audit`, bundled `/ft-audit` named as the unforked form). Verification: all three Acceptance commands pass (exit 0). Refactors: none. Doc-drift sweep: `docs/MIGRATION.md` is the one swept doc touched, edited in place; no other AI-referenced doc cites these lines — no change. `touches:` reconciliation: `git diff --name-only` = the two declared paths, match. Maintainability effect: adopters copying the template no longer pick up the "subset ⇒ context unconfigured" reading.

**Finding for follow-up (not fixed here, per PLAN's "check first").** `/ft-update`'s audit-fork refresh (Step 4.5) diffs only `claude/skills/<flaitron-tracks>/`, not `templates/audit-overlay-template.md`, so this Domains prose never reaches existing overlays automatically. bananapeel, bidviz, InvisiPaw, and siteguy each need the wording corrected by their own session after the next release.

**Archived:** 2026-10-25
