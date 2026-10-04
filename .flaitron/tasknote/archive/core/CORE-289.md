---
title: promote-audit-orphans
status: completed
tags: []
created: 2026-06-05
due:
related-tasks: []
---

# CORE-289 | promote-audit-orphans

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Evaluate whether commonly-forked adopter audit skills with no upstream counterpart (api / database / e2e) should be promoted into bundled `ft-audit-*` skills, so adopters carry only project-specific thin overlays.

## ✅ Acceptance

- [ ] Evaluation of all three surfaces (api / database / e2e) documented against §523 precedent gate and overlap with existing bundled skills
- [ ] A 2-3 sentence adopter guidance note added to `docs/MIGRATION.md` §1.2.1 directing api/database needs to `ft-audit-backend` overlay and naming e2e as out-of-scope pending precedent
- [ ] No new skill files created (§523 gate: FinTown-only precedent)

## 🧩 Subtasks

- [ ] Evaluate api surface: assess §523 gate + overlap with ft-audit-backend Pass 1 (Input & contracts)
- [ ] Evaluate database surface: assess §523 gate + overlap with ft-audit-backend Pass 3 (Persistence)
- [ ] Evaluate e2e surface: assess §523 gate + distinctness from existing skills
- [ ] Add 2-3 sentence "surfaces without a bundled scaffold" guidance note to `docs/MIGRATION.md` §1.2.1 (after the overlay template entry, before "Optional section" close)
- [ ] Doc-drift sweep + Phase 4 closure

## 🔗 Related

- [[CORE-287]] — sanctioned thin-overlay path (prerequisite; overlay template is what adopters use for these surfaces)
- [[CORE-288]] — fork-provenance markers (sibling FinTown audit-context idea)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The evaluation is on-label: api/database/e2e surfaces do have genuine gaps in the bundled roster. However, SPEC §523 blocks promotion without ≥2-project precedent, and the task was surfaced from FinTown alone (speculative). The evaluation resolves to "defer promotion; document overlay guidance instead" — still worth shipping as a short MIGRATION.md note that prevents future re-filing.

- [x] Read relevant source files

- [x] **Archive skim** — CORE-287 (overlay path) and CORE-288 (provenance markers) are the directly adjacent prior tasknotes; both list CORE-289 as a sibling. No prior accept/reject decision on api/database/e2e promotion. New ground.

- [x] **Drift check** — `docs/MIGRATION.md` §1.2.1, `claude/skills/ft-audit-*/SKILL.md`, `templates/audit-overlay-template.md` all exist and were updated by CORE-287/288 this same session. No drift.

- [x] Asked clarifying questions — user confirmed: FinTown-only precedent (speculative); deliverable is scaffold-if-yes (none trigger since §523 not cleared).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Six bundled skills read.** `ft-audit` (catch-all, 5 passes: Security · Idioms · Hygiene · Orphans · Doc drift) + `ft-audit-backend` (5 passes: Input & contracts · Error & lifecycle · Persistence · Async correctness · Observability) + `-docs` / `-security` / `-frontend` / `-performance`. No `-api`, `-database`, `-e2e` exists.
- **Overlap analysis for api surface.** `ft-audit-backend` Pass 1 (Input & contracts) already covers: untyped request bodies, missing response model, silent type coercion, missing field validation, contract drift (OpenAPI vs handler). An `ft-audit-api` would be a narrower scope variant, not a new domain. Overlay with a REST/GraphQL glob + API-contract rubric files covers the gap with zero new abstraction.
- **Overlap analysis for database surface.** `ft-audit-backend` Pass 3 (Persistence) already covers: N+1 queries, missing eager-load, unwrapped multi-statement writes, missing index on hot WHERE column, raw SQL concat, ORM session leaks, irreversible migrations. An `ft-audit-database` would be a schema-focused variant. Overlay with a migrations glob + schema/ADR rubric files covers the gap.
- **e2e surface distinctness.** Test quality / coverage / flakiness / test-infrastructure hygiene are NOT covered by any of the six bundled skills. Genuinely distinct domain. Blocked only by §523 (one-project precedent).
- **§523 verdict for all three.** Source is FinTown audit-context 2026-06-05 — one project. SPEC §523: "Promote a helper into flowtron only when ≥2 projects need the same shape." None promote. If/when a second adopter independently demonstrates api, database, or e2e audit skill needs, re-open.
- **Deliverable shape.** A 2-3 sentence note in `docs/MIGRATION.md` §1.2.1 (after the "Splitting" paragraph, before the "Optional section" close) — consistent with CORE-287's doc-convention altitude. Naming: api/database → overlay `ft-audit-backend`; e2e → no bundled scaffold yet; revisit at two-project precedent.
- **Exit-gate judgment.** Discovery surfaced no significant deviation — clarifications confirmed the lightest altitude (doc note only, no scaffold) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Pattern survey.** Consistent with CORE-287/288's doc-convention altitude — additive doc prose, no new skill files. Insertion point after the fork-provenance markers paragraph in §1.2.1, before "Optional section" close.
- **§523 evaluation results.** api: defer — overlaps ft-audit-backend Pass 1 (Input & contracts); overlay with API glob + contract rubric covers it. database: defer — overlaps ft-audit-backend Pass 3 (Persistence); overlay with migrations glob + schema rubric covers it. e2e: defer — genuinely distinct domain but FinTown-only precedent (speculative); no bundled scaffold warranted yet. Zero new skill files.
- **`docs/MIGRATION.md` §1.2.1** — added "Surfaces not covered by the six bundled scaffolds" paragraph directing api/database needs to `ft-audit-backend` overlay (with concrete scoping guidance) and naming e2e as unbundled-start-from-ft-audit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Docs-only change (`docs/MIGRATION.md`). No `viz/` code touched → no targeted suite / lint / type-check applies; no frontend surface. Verified `git diff --name-only` shows only `docs/MIGRATION.md`. Checked README.md and SPEC.md for §1.2.1-level references — no updates needed (new paragraph adds no new template, file, or term).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep verdicts:**

- `README.md` — no change (doesn't reference §1.2.1 contents at paragraph granularity)
- `SPEC.md` — no change (only references §1.2.1 as a pointer for `templates/` and skill namespace; new paragraph adds no new template or term)
- `docs/MIGRATION.md` — **updated** ("Surfaces not covered by the six bundled scaffolds" paragraph added — primary deliverable)
- `claude/AGENTS-snippet.md` — no change (audit family remains forked-not-symlinked; no wiring change)
- `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` · `claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` — no change

**Final Summary:**

Evaluated api / database / e2e audit surfaces against SPEC §523 (≥2-project precedent required). All three fail: surfaced from FinTown alone (speculative). api and database are well-served by overlaying `ft-audit-backend` with a narrowed scope; e2e is genuinely distinct but lacks precedent. Shipped a single-paragraph guidance note to `docs/MIGRATION.md` §1.2.1 directing adopters to the right approach for each surface — prevents re-filing without creating premature abstraction.

**Archived:** 2026-06-05
