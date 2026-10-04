---
title: skill-prompts-model-tokens-generalize
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: [CORE-138, CORE-064]
---

# CORE-141 | skill-prompts-model-tokens-generalize

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-138]] [[CORE-064]]

## 🎯 Goal

Decide whether the ~14 SKILL files that hardcode `opus | sonnet` references should generalize to recommended-set framing (mirroring CORE-138's SPEC update) or stay as flowtron-self defaults, then apply the chosen treatment consistently.

## ✅ Acceptance

- [x] Decision made and recorded (generalize vs. keep)
- [x] All affected SKILL files updated consistently with the decision
- [x] No SKILL prompt implies `opus` / `sonnet` are the only valid tokens where SPEC now says adopters may substitute

## 🧩 Subtasks

- [x] Step 1: Survey all affected files and classify reference types (5 categories; 18 files; ft-stats already done)
- [x] Step 2: Record decision — **Generalize** categories A, B, AGENTS-snippet; change ft-release stubs `[opus]`→`[model]`; leave audit-family examples and copy-paste lines as-is
- [x] Step 3a: Update `step-1.5-model-edge.md` ×2 — broaden AskUserQuestion to acknowledge custom tokens
- [x] Step 3b: Update `ft-starter-task/SKILL.md` lines 42 + 89 — model-field description + confirmation note
- [x] Step 3c: Update `ft-file-followup/SKILL.md` lines 38 + 88 — same treatment
- [x] Step 3d: Update `ft-epic-discovery/SKILL.md:55` — model-field description
- [x] Step 3e: Update `AGENTS-snippet.md:19` — match SPEC recommended-set framing
- [x] Step 3f: Update `ft-release/SKILL.md` lines 15 + 34 — `[opus]` → `[model]`
- [x] Step 3g: Update `commands/ft-release.md:7` — `[opus]` → `[model]`
- [x] Step 4: Verify no broken cross-references or stale examples remain

## 🔗 Related

- [[CORE-138]] — predecessor: generalized SPEC + viz + ft-stats; deferred SKILL prompts here
- [[CORE-064]] — equalized step-1.5 fragments across ft-task/ft-micro-task; confirmed `step-1.5-model-edge.md:16` hardcodes `opus or sonnet`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-138 explicitly deferred SKILL prompt generalization to this task. The SPEC and viz parser are already generalized; the SKILL prompts still say `opus | sonnet` as if they're the only options. Task scope and file set confirmed below.

- [x] Read relevant source files
- [x] **Archive skim** — `_project/tasknote/archive/CORE/` skimmed:
  - [[CORE-138]] — predecessor that opened the generalization; explicitly deferred SKILL prompts here. Decision from Q2: "SPEC + viz + ft-stats only". Filed CORE-141 as the follow-up.
  - [[CORE-064]] — equalized step-1.5 fragments across ft-task/ft-micro-task. Confirmed `step-1.5-model-edge.md:16` hardcodes `opus or sonnet` — in scope here.
  - No other relevant prior tasknotes.
- [x] **Drift check** — all cited files verified at HEAD 2026-05-23:
  - `ft-task/step-1.5-model-edge.md:16` ✅ "choose `opus` or `sonnet`"
  - `ft-micro-task/step-1.5-model-edge.md:16` ✅ same
  - `ft-starter-task/SKILL.md:42,89` ✅ "opus | sonnet"
  - `ft-file-followup/SKILL.md:38,88` ✅ "opus | sonnet"
  - `ft-epic-discovery/SKILL.md:55` ✅ "opus | sonnet"
  - `AGENTS-snippet.md:19` ✅ "`opus` / `sonnet`"
  - `ft-release/SKILL.md:15,34` ✅ "[opus]" example stubs
  - `commands/ft-release.md:7` ✅ "[opus]" example
  - `ft-stats/SKILL.md` ✅ already generalized (CORE-138); no action needed
  - No drift on any cited path.
- [x] Asked clarifying questions — Decision surfaced via AskUserQuestion:
  - **Generalize** categories A (step-1.5), B (model-field descriptions), AGENTS-snippet
  - **Change** ft-release `[opus]` stubs → `[model]` placeholder
  - **Leave as-is:** audit-family `[opus|sonnet]` examples; copy-paste `<opus|sonnet>` lines
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

5 reference categories identified across 18 files (ft-stats already done by CORE-138):
- **Cat A — step-1.5 AskUserQuestion** (2 files): presents only `opus`/`sonnet` as options when no `[model]` tag exists; adopters with custom tokens have no path without the "Other" input
- **Cat B — model-field descriptions** (3 skills, 6 lines): describe `[model]` as `opus | sonnet` only; contradict SPEC/model.md's "adopters MAY substitute" clause
- **Cat C — audit-family ticket-line examples** (6 files): `[opus|sonnet]` as a grammar placeholder → leave as-is (reads as an example, not an enum constraint)
- **Cat D — ft-release stubs** (2 files): `[opus]` as a concrete illustration → change to `[model]` for cleanliness
- **Cat E — copy-paste lines** (4 files): `<opus|sonnet>` with "substitute the PLAN-line tag" → leave as-is (already contextualizes as a placeholder)
- **AGENTS-snippet**: adopter onboarding text; should match SPEC

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — all 18 affected files are parallel siblings (same structure); same recommended-set phrase applied consistently across categories A, B, AGENTS-snippet, and D. No new abstraction shape needed.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — pure markdown; no tests applicable

**Implementation Notes:**

11 edits across 8 files (PLAN.md category):
- **Cat A** (step-1.5 ×2): "choose `opus` or `sonnet`" → "choose a model token. Recommended set: `opus` / `sonnet`. Adopters may substitute…"
- **Cat B** (ft-starter-task, ft-file-followup, ft-epic-discovery ×3 description lines): "`opus | sonnet`, per SPEC" → "recommended: `opus | sonnet`; adopters may substitute… per SPEC"
- **Cat B handoff** (ft-starter-task:89, ft-file-followup:88): `<opus|sonnet>` → `<model>`
- **AGENTS-snippet:19**: "(`opus` / `sonnet`)" → "(recommended: `opus` / `sonnet`; adopters may substitute project-specific tokens)"
- **Cat D ft-release** (SKILL.md:15,34 + commands/ft-release.md:7): `[opus]` → `[model]`
- **Left as-is**: audit-family `[opus|sonnet]` examples (Cat C), copy-paste `<opus|sonnet>` lines (Cat E)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no tests; all changes are markdown prose in SKILL.md files
- [x] Ran lint/type-check on changed code — no linter applies; verified diff is 11 symmetric substitutions across 8 files
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — no frontend changes

**Testing Notes:** `git diff --stat` shows 8 files, 11 ins/11 del — clean symmetric substitutions.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `claude/AGENTS-snippet.md` updated by this task; all other AI-referenced docs (README.md, SPEC.md, docs/MIGRATION.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md) — no change
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-23.` and tasknote moved to `_project/tasknote/archive/CORE/`
- [x] Recap drafted

**Final Summary:** Generalized ~11 SKILL-prompt `opus | sonnet` hardcodes across 8 files to recommended-set framing ("recommended: `opus | sonnet`; adopters may substitute") matching the SPEC/model.md contract opened by CORE-138. step-1.5-model-edge.md (×2) now presents custom tokens as a valid option; ft-starter-task/ft-file-followup/ft-epic-discovery model-field descriptions and AGENTS-snippet updated to match SPEC. ft-release stubs changed from `[opus]` to `[model]` placeholder. Audit-family examples and copy-paste lines left as-is.

**Archived:** 2026-05-23
