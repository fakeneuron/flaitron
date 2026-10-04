---
title: viz-mvp-residue
status: completed
tags: []
created: 2026-05-10
due:
related-tasks: [FE-002, CORE-073]
---

# CORE-077 | viz-mvp-residue

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[FE-002]] [[CORE-073]]

## 🎯 Goal

Drop the "(single-project MVP)" qualifier from the viz bullet on README.md:91 so the line reflects FE-002's shipped multi-project workspace scanner.

## ✅ Acceptance

- [x] README.md:91 reads `- \`viz/\` — Vite/React Kanban visualizer` with the `(single-project MVP)` qualifier removed.
- [x] No other live (non-archive) "single-project" residue remains in flowtron's doc-set.
- [x] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" surfaces only this README.md edit.

## 🧩 Subtasks

- [x] Edit README.md:91 — strip ` (single-project MVP)` from the viz bullet.
- [x] Re-grep `single-project` across `*.md` to confirm only archive references remain.
- [x] Phase 3 visual confirmation skipped — markdown prose edit, no UI change (note: 👁️-prefix step in Phase 3 is for *frontend* changes; not applicable).
- [x] Phase 4 doc-drift sweep across AI-referenced docs (`README.md` / `SPEC.md` / `docs/MIGRATION.md` / `claude/CLAUDE-snippet.md`) — per-entry verdict.

## 🔗 Related

- [[FE-002]] — cross-project viz (closed 2026-05-08); shipped the workspace scanner that made the MVP qualifier stale.
- [[CORE-073]] — audit-flowtron-self 2026-05-10 (Finding #3, Medium); surfaced the residue.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Drift confirmed at HEAD — `README.md:91` literally reads `- \`viz/\` — Vite/React Kanban visualizer (single-project MVP)`. FE-002 (2026-05-08) shipped the workspace scanner and rewrote README's `## Visualizer` section but never touched §"Repo layout"'s viz bullet. CORE-073 audit (2026-05-10, Finding #3, Medium) caught the residue. One-line markdown edit; no implementation risk.

- [x] Read relevant source files — `README.md:75-102` (Repo layout block + neighbors); `_project/tasknote/README.md` §"AI-referenced docs" (Phase 4 sweep targets); current state of all `single-project` matches across `*.md`.
- [x] **Archive skim** — `_project/tasknote/archive/core/` enumerated (60 tasknotes), grepped for `README.md`. Load-bearing prior tasknotes:
  - **FE-002** (2026-05-08, `archive/frontend/FE-002.md`) — promoted viz to workspace-wide; updated README's `## Visualizer` section and `claude/CLAUDE-snippet.md` / `docs/MIGRATION.md`, but left the §"Repo layout" viz bullet untouched. This is the task that *should have* swept the qualifier; CORE-077 closes the gap.
  - **CORE-070** (2026-05-10, `archive/core/CORE-070.md`) — most recent restructure of README §"Repo layout": inserted `SPEC/` bullet, reworded `claude/` line. Explicitly stayed narrow to SPEC/ + claude/ entries (per its filing scope); did not touch `viz/` bullet. Confirms the §"Repo layout" bullet shape is `\`path/\` — short description` (uniform across all 7 bullets).
  - **CORE-073** (2026-05-10, `archive/core/CORE-073.md`) — surfacing audit; this task is its Finding #3.
- [x] **Drift check** — `README.md:91` confirmed at HEAD as the only live residue. Repo-wide `grep` for `single-project` in `*.md`:
  - `README.md:91` — live target (this task removes it).
  - `_project/PLAN.md:24` — the CORE-077 line itself; flips to stub at closure.
  - `archive/frontend/FE-001.md`, `archive/frontend/FE-002.md`, `archive/frontend/FE-028.md` — historical archive references describing the FE-001 → FE-002 promotion arc; archive is write-once at closure (per SPEC), NOT touched. Frozen historical record.
  No drift from task-description hypotheses.
- [x] Asked clarifying questions — No clarifications needed. Assumptions: (1) the residue is the parenthetical only — bullet stays "Vite/React Kanban visualizer" with no replacement qualifier (matches the uniform `\`path/\` — short description` shape of the other 6 bullets). (2) Archive references are out of scope (write-once per SPEC). (3) Frontend visual-confirmation step in Phase 3 is N/A — markdown prose edit, no viz UI change.
- [x] Subtasks above populated with concrete, ordered steps.

**Discovery Notes:**

- **Target line at HEAD:** `README.md:91` — `- \`viz/\` — Vite/React Kanban visualizer (single-project MVP)`. Sole live token.
- **Edit shape:** strip the trailing ` (single-project MVP)` (12 chars + leading space). Result: `- \`viz/\` — Vite/React Kanban visualizer`. Conforms to the uniform §"Repo layout" bullet shape used by the other 6 bullets (CORE-070 confirmed this shape).
- **Doc-drift footprint:** only `README.md` is in scope; SPEC.md / MIGRATION.md / CLAUDE-snippet.md do not mirror this phrasing.
- **Predecessor accountability:** FE-002 left the residue; CORE-073 audit caught it; CORE-077 closes it. Pattern reinforces the value of post-major-feature audits.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — README.md §"Repo layout" bullets uniformly follow `\`path/\` — short description` shape across all 7 entries (verified L85-91 at HEAD; CORE-070 2026-05-10 confirmed this shape when it inserted `SPEC/` and reworded `claude/`). Stripping the parenthetical conforms exactly; no new shape introduced.
- [x] Implemented the minimal solution — single surgical Edit on README.md:91 stripping ` (single-project MVP)` (12 chars + leading space). No code path touched.
- [x] Updated/added tests for non-trivial behavior — N/A. Markdown prose edit; no functional behavior to test.

**Implementation Notes:**

- **Net delta:** README.md L91 — 1 line modified, 20 chars removed. No surrounding bullets touched. No cross-references broken (no doc cited "(single-project MVP)" by name).
- **Result at HEAD:** `- \`viz/\` — Vite/React Kanban visualizer` — aligned with the other 6 bullets in §"Repo layout".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown prose edit, no test surface).
- [x] Ran lint/type-check on changed code — N/A (flowtron ships no markdown linter; CORE-070 set this precedent for §"Repo layout" edits). Mental render-pass on L83-92 confirms the 7-bullet list is uniform, blank lines balanced, no syntax disruption.
- [x] (frontend) Asked the user for visual confirmation — N/A. The viz UI is unchanged; only the README's prose description of the `viz/` directory was edited.

**Testing Notes:**

- Re-grep `single-project` across `*.md` confirms only archive references (FE-001, FE-002, FE-028) and this tasknote/PLAN.md line remain — all expected (write-once archive + closure-pending self-references).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — **updated.** §"Repo layout" viz bullet at L91 had the `(single-project MVP)` qualifier stripped. Bullet now reads `- \`viz/\` — Vite/React Kanban visualizer`, matching the uniform `\`path/\` — short description` shape of the other 6 bullets. §"Visualizer" (separate section) was left untouched — FE-002 rewrote it at promotion time and it correctly describes the global multi-project model.
  - `SPEC.md` — **no change.** Grep confirms zero `single-project` matches in SPEC.md or SPEC/*.md modules; SPEC.md does not describe viz scope.
  - `docs/MIGRATION.md` — **no change.** Grep confirms zero `single-project` matches; MIGRATION.md's viz references (in §1.0 and adopter install blocks) describe the global multi-project model post-FE-002.
  - `claude/CLAUDE-snippet.md` — **no change.** Grep confirms zero `single-project` matches; the adopter-facing `## Visualizer` block FE-002 added points at the global viz instance.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-10.` and tasknote moved to `_project/tasknote/archive/core/CORE-077.md`.
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate).

**Final Summary:**

Dropped the stale `(single-project MVP)` qualifier from `README.md:91`'s `viz/` bullet — the visualizer scans the whole `~/code/` workspace and routes per-project as of FE-002 (closed 2026-05-08), so the MVP-era qualifier was actively misleading. Single one-line Edit (`- \`viz/\` — Vite/React Kanban visualizer (single-project MVP)` → `- \`viz/\` — Vite/React Kanban visualizer`), zero net line delta, aligned with the uniform §"Repo layout" bullet shape the other 6 entries use. Repo-wide `single-project` grep confirms no other live residue; only write-once archive tasknotes (FE-001 / FE-002 / FE-028) retain the phrase as historical context. Surfaced by CORE-073 audit 2026-05-10 (Finding #3, Medium); accountability trace: FE-002 left the residue when rewriting `## Visualizer` but never swept §"Repo layout"; CORE-070's 2026-05-10 §"Repo layout" restructure stayed narrow to SPEC/ + claude/ entries by its filing scope. Doc-drift sweep across the 4 AI-referenced docs surfaced only this one line; no follow-ups filed.

**Archived:** 2026-05-10
