---
title: ft-audit-restore-generic-scaffold
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: [CORE-143, CORE-144, CORE-145]
---

# CORE-142 | ft-audit-restore-generic-scaffold

[← PLAN.md](../PLAN.md) · ✅ Completed (de-scoped) · 🔗 [[CORE-143]] [[CORE-144]] [[CORE-145]]

## 🎯 Goal

Restore generic stack-neutral scaffold content to `claude/skills/ft-audit/SKILL.md` per the 2026-05-23 audit (Findings #2 and #3): §0 forker checklist with flowtron-as-worked-example framing, canonical pass-name structure, accurate frontmatter description, and an opening paragraph that doesn't self-reference or claim false ownership.

## ✅ Acceptance

- [x] Drift confirmed: `claude/skills/ft-audit/SKILL.md` at HEAD already satisfies all four cited issues from audit Findings #2 and #3.
- [x] User confirmed De-scope.
- [x] PLAN.md line flipped to `## Completed` stub; tasknote archived; closure recorded.

## 🧩 Subtasks

- [x] Read `claude/skills/ft-audit/SKILL.md` and the sibling audit-family SKILL.md files.
- [x] Confirm the file's current state via `git log` on the file (last touched 2026-05-19 by commit `f32fc67`).
- [x] Cross-check each cited issue (§0 checklist · canonical pass names · frontmatter description · self-referential opening / false ownership) against current state.
- [x] Surface the drift to the user; request De-scope confirmation.
- [x] Phase 4 closure (no code changes).

## 🔗 Related

- [[CORE-143]] — sibling audit Finding #1 (stray `ft-stats/ft-stats` symlink cleanup)
- [[CORE-144]] — sibling audit Finding #5 (`ft-release` SKILL.md doc-list update)
- [[CORE-145]] — sibling audit Finding #4 (AGENTS-snippet viz cmd parity)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** De-scope (pending user confirmation)
  **Rationale:** Findings #2 and #3 from the 2026-05-23 audit appear stale — the four cited issues are already fixed in the file at HEAD. The token-economy-pass commit `f32fc67` (2026-05-19) rewrote the opening paragraph from second-person ("You are a principal engineer…") to descriptive ("Principal-engineer audit…"), already named the file as a "stack-neutral scaffold — fork, don't symlink", already has a §0 forker checklist with sacred-invariant examples (paper-mode, schema-corruption, auth-bypass), and already uses the canonical "Security · Idioms · Hygiene · Orphans · Doc drift" pass names. The frontmatter description matches that structure. Asking the user before closing.

- [x] Read relevant source files (`claude/skills/ft-audit/SKILL.md`, `ft-audit-docs/SKILL.md`, `ft-audit-backend/SKILL.md`, `ft-audit-frontend/SKILL.md`)
- [x] **Archive skim** — `_project/tasknote/archive/core/` searched for `ft-audit`-related tasknotes. Hits: CORE-097.1, CORE-097.2, CORE-097.5, CORE-097.6 (epic 097 external-skill-survey), CORE-104 (ft- skill namespace prefix), CORE-105 / CORE-106 / CORE-110 (cohort follow-ups), CORE-123 (audit-docs SKILL fork sync), CORE-129/130/132 (recent AGENTS / self-host wiring). No prior tasknote dedicated to "restoring generic scaffold content" — the current generic-scaffold form has been in place since the 2026-05-19 token-economy pass (commit `f32fc67`, which touched all 6 audit-family SKILL.md files together).
- [x] **Drift check** — confirmed. Findings #2 and #3 cite four issues none of which are present in the file at HEAD:
  - "Add §0 forker checklist" — §0 already exists (lines 12-25), with sacred-invariant examples.
  - "Replace flowtron-specific pass names with canonical Security · Idioms · Hygiene · Orphans · Doc drift" — §2 pass names already match this structure.
  - "Fix frontmatter description" — frontmatter already declares the canonical 5-pass structure + stack-neutral scaffold framing.
  - "Fix self-referential opening paragraph and false ownership claim" — opening was rewritten to third-person descriptive in `f32fc67`; the "flowtron stack-neutral code-audit skill" framing is accurate (this IS a flowtron skill), not a false-ownership claim.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The 2026-05-23 audit cohort produced 5 findings → 4 PLAN-line tickets (CORE-142, -143, -144, -145). CORE-142 bundles audit Findings #2 and #3, both High/Medium. The other three siblings (CORE-143 symlink, CORE-144 doc-list, CORE-145 viz-cmd parity) appear independently valid on cursory inspection — the symlink artifact is visible in `git status` (`?? claude/skills/ft-stats/ft-stats`). So this isn't an "audit-wide bogus run" — Findings #2 and #3 specifically read like a stale-context regression where the auditor cited the *pre-f32fc67* state.

Recommended verdict: **De-scope CORE-142**. Recap should record the drift cause (stale-state audit on a file last changed 2026-05-19) so future auditors don't repeat. CORE-143 / -144 / -145 unaffected.

## 🛠️ Phase 2: Execution

_N/A — De-scope verdict from Phase 1. No source files changed._

## 🧪 Phase 3: Testing & Linting

_N/A — no code changes; nothing to test or lint._

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — AI-referenced docs (`_project/tasknote/README.md` §"AI-referenced docs"):
  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-23.` and tasknote moved to `_project/tasknote/archive/core/`.
- [x] Recap drafted.

**Final Summary:**

De-scoped. The 2026-05-23 audit cohort filed CORE-142 for four issues in `claude/skills/ft-audit/SKILL.md` (no §0 forker checklist · flowtron-specific pass names · wrong frontmatter description · self-referential opening / false-ownership claim). All four were already fixed by the 2026-05-19 token-economy-pass commit `f32fc67` — four days before the audit ran. The auditor cited a stale pre-`f32fc67` state. Sibling tickets from the same audit cohort (CORE-143 stray symlink · CORE-144 ft-release doc-list update · CORE-145 AGENTS-snippet viz-cmd parity) are independently valid and untouched. Future audits of the audit-family SKILL.md surface should anchor to current HEAD before reasoning about scaffold state.

**Archived:** 2026-05-23
