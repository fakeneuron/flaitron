---
title: ft-task-sop-learnings
status: completed
tags: []
created: 2026-09-23
due:
related-tasks: [CORE-658, CORE-674]
touches:
  - SPEC/procedures/ft-task.md
---

# CORE-675 | ft-task-sop-learnings

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-658]] · [[CORE-674]]

## 🎯 Goal

Restate the CORE-658 Phase 4 **Learnings** item in `SPEC/procedures/ft-task.md`'s Phase 4 paragraph so non-Claude runners see it.

## ✅ Acceptance

- [x] SOP Phase 4 restatement names the Learnings item and its push-memory target (`AGENTS.md` / README §"AI-referenced docs") — `awk '/^- \*\*Phase 4: Closure/,/^### 6/' SPEC/procedures/ft-task.md | grep -q 'Learnings'`
- [x] SOP stays within its 38,000-byte budget — `test $(wc -c < SPEC/procedures/ft-task.md) -le 38000`
- [x] Restatement agrees with `SPEC.md` §"🚀 Phase 4: Closure" wording (N/A-or-the-line; most closures N/A) — `judgment`: prose parity is not grep-decidable

## 🧩 Subtasks

- [x] Add one Learnings sentence to the SOP's Phase 4 bullet, after the recap and before the no-banner line
- [x] Run acceptance checks

## 🔗 Related

- [[CORE-658]] — added the Learnings item to `SPEC.md` + template (`related-decision:`)
- [[CORE-674]] — v5.33.0 cut whose SOP-currency check filed this

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed: `grep -n Learnings SPEC/procedures/ft-task.md` returns nothing while `SPEC.md:526` and `templates/tasknote-template.md:103` carry the item.

- [x] Read relevant source files — SOP Phase 4 bullet (lines 399-443), `SPEC.md` §"🚀 Phase 4: Closure" (+ push-memory rationale), template Phase 4.

- [x] **Best Practices Review** — `N/A`: single-sentence doc restatement; the SOP routes to SPEC for authority, so the addition names the item and cites its target without duplicating the rationale paragraph.

- [x] **Archive skim** — `archive/core/` (887 notes, area confirmed via README table). CORE-658: added Learnings to SPEC + template only, SOP never touched. CORE-674: SOP-currency check filed this; dismissed the other two candidates (CORE-673, CORE-664); SOP stamp left un-bumped ("flag-don't-bump").

- [x] **Drift check** — PLAN line matches current files; no SPEC contract conflict. `SPEC/procedures/README.md` §"Frontmatter schema": `last-verified:` bumps only when the SOP is re-checked against its watched surfaces — a targeted single-item fix is not that full re-check (CORE-674 left 14 tier-2 `SPEC.md` commits un-skimmed), so the stamp stays.

- [x] No clarifications needed — assumptions: (1) stamp not bumped (above); (2) `docs/CONTEXT-BUDGET.md` byte ledger is release-refreshed, not touched here; (3) no other runner surfaces (codex/cursor/grok pointers) restate Phase 4 — they route to this SOP.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:** See boxes above. Budget headroom: SOP is 34,115 bytes vs 38,000 budget.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only doc edit

**Implementation Notes:** Pattern: the SOP's Phase 4 bullet already restates each SPEC Phase 4 item as one imperative clause routed to `SPEC.md` for authority; added the Learnings item the same way, directly after the recap clause (matching its position as the last Phase 4 checklist item in `SPEC.md` / template). The push-memory rationale paragraph stays SPEC-only — the SOP routes, it doesn't restate. No refactor.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no code; acceptance greps are the check

- [x] Ran lint/type-check on changed code — N/A, markdown only

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A, no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**
- `awk '/^- \*\*Phase 4: Closure/,/^### 6/' SPEC/procedures/ft-task.md | grep -q 'Learnings'` → 0
- `test $(wc -c < SPEC/procedures/ft-task.md) -le 38000` → 0 (34,345 bytes, +230)
- Prose parity (judgment): SOP clause mirrors `SPEC.md:526` — same question, same target pair, same `N/A`-or-the-line answer, plus the "most closures write `N/A`" framing from SPEC's rationale paragraph.
- Structural quality: no duplication beyond the intended one-clause restatement; no dead text.
- External review: N/A — 4-line prose diff restating an existing SPEC sentence; nothing to grade beyond the parity check above.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

Doc-drift sweep: README.md, AGENTS.md, SPEC.md, docs/MIGRATION.md, claude/codex/cursor/grok AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md, docs/AGENT-COMPAT.md, docs/EXTERNAL-AGENTS.md, docs/WORKTREES.md, docs/VISION.md — no change (none restate the SOP's Phase 4 prose). `docs/CONTEXT-BUDGET.md` ledger (34,115) is release-refreshed; left for the next cut.

Learnings: N/A — the SOP-currency check did its job; no new durable insight.

**Final Summary:** Added the CORE-658 **Learnings** item to `SPEC/procedures/ft-task.md`'s Phase 4 restatement, so Codex / Cursor / Grok runners now see every Phase 4 checklist item. 1 file, +4/−1. `last-verified:` stamp intentionally not bumped (targeted fix, not a full re-check). Scope reconciliation: `git diff --name-only` = `SPEC/procedures/ft-task.md`, matching declared `touches:`.

**Archived:** 2026-09-23
