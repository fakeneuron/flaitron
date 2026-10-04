---
title: cross-agent-skill-projection audit
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-EPIC-271, CORE-271.1, CORE-271.2, CORE-271.3, CORE-271.4, CORE-271.5]
---

# CORE-271.6 | cross-agent-skill-projection audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-271]]

## 🎯 Goal

Verify the completed `CORE-EPIC-271` (`cross-agent-skill-projection`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-271.6 — audit CORE-EPIC-271` commit lands
- [ ] PLAN.md line for `CORE-271.6` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-271.6.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-271` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-271.6` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-271]] — parent epic (cross-agent-skill-projection)
- [[CORE-271.1]] — discovery
- [[CORE-271.2]] — SPEC/procedures/ scaffold + SOP schema
- [[CORE-271.3]] — ft-task procedure SOP
- [[CORE-271.4]] — per-agent pointer wrappers
- [[CORE-271.5]] — doc-updates

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-close-epic CORE-271.6`. All 5 implementation siblings (CORE-271.1–271.5) are [x] closed; CORE-271.6 is the highest `.SUB` for its parent. No open siblings; audit fires on the complete cohort.

- [x] Read relevant source files — read all 5 sibling archived tasknotes; read all cohort deliverables at HEAD: `SPEC/procedures/README.md`, `SPEC/procedures/ft-task.md`, `grok/procedures/ft-task.md`, `codex/procedures/ft-task.md`, `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md`, `claude/AGENTS-snippet.md`, `SPEC.md` (procedures registrations at lines 51 and 83)

- [x] **Archive skim** — cohort children are themselves archive entries; read all 5. No non-cohort tasknotes touched the new `SPEC/procedures/`, `grok/`, or `codex/` surfaces (all newly created by this epic).

- [x] **Drift check** — all deliverable files verified at HEAD:
  - `SPEC/procedures/README.md` ✓ (exists; content matches CORE-271.2 scope)
  - `SPEC/procedures/ft-task.md` ✓ (exists; `procedure: ft-task` / `source: claude/skills/ft-task/SKILL.md` / `last-verified: v5.1.0 · 2026-06-02`)
  - `grok/procedures/ft-task.md` ✓ (exists; minimal pointer stub routing to `../../SPEC/procedures/ft-task.md`)
  - `codex/procedures/ft-task.md` ✓ (exists; minimal pointer stub routing to `../../SPEC/procedures/ft-task.md`)
  - `SPEC.md` §"Working in the flowtron repo itself" bullet (line 51) + §"Procedure SOPs" subsection (line 83) ✓
  - `docs/PLATFORMS.md` ✓ (SPEC/procedures/ in contract-layer table; grok/codex pointer wrappers noted in "What ships" + quirks table)
  - `docs/AGENT-COMPAT.md` ✓ (Grok/Codex rows include pointer wrapper info)
  - `docs/AGENT-NEUTRALITY.md` ✓ (new row for SPEC.md §"Procedure SOPs" SKILL dispatch contrast reference)
  - `claude/AGENTS-snippet.md` ✓ (contract-only fallback note in `/ft-task` bullet)
  - No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** Audit scope is the complete 5-child cohort; no early-audit or deferred-child ambiguity.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Cohort children inventoried

| Child | Deliverables |
|---|---|
| CORE-271.1 (discovery) | Filed 4 implementation children + audit in PLAN.md. No files changed. Architecture locked: `SPEC/procedures/` = agent-neutral SOP source of truth; `grok/` + `codex/` sibling dirs = thin pointer stubs per PLATFORMS.md plug-in pattern. |
| CORE-271.2 (spec-dir) | Created `SPEC/procedures/README.md` (materializes dir; defines `procedure:`/`source:`/`last-verified:` frontmatter schema + loading convention); registered the layer in `SPEC.md` (§"Working in the flowtron repo itself" bullet + §"Lazy SPEC module frontmatter" subsection). |
| CORE-271.3 (ft-task-sop) | Created `SPEC/procedures/ft-task.md` — agent-neutral procedure SOP. Frontmatter per CORE-271.2 schema; body routes to canonical SPEC sections per "route, don't copy"; Claude-specific surfaces substituted per AGENT-NEUTRALITY.md; operator-cue vocabulary preserved verbatim. |
| CORE-271.4 (per-agent-wrappers) | Created `grok/procedures/ft-task.md` + `codex/procedures/ft-task.md` as thin pointer stubs. Scaffolded `grok/` and `codex/` sibling dirs. |
| CORE-271.5 (doc-updates) | Updated `docs/PLATFORMS.md` (SPEC/procedures/ in contract layer; pointer wrapper entries for grok/codex), `docs/AGENT-COMPAT.md` (Grok/Codex rows updated), `docs/AGENT-NEUTRALITY.md` (new SPEC.md §"Procedure SOPs" row), `claude/AGENTS-snippet.md` (contract-only fallback note). |

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A for audit (verification pass over existing cohort deliverables; no new code surface).

- [x] Implemented the minimal solution — coherence pass complete; no inline fixes required; findings recorded below.

- [x] Updated/added tests for non-trivial behavior — N/A (audit verification pass; no code changed).

**Implementation Notes:**

### Cohort coherence findings

**Naming consistency:** "procedure" (dir slug) / "SOP" (artifact type) / "pointer wrapper" (per-agent stub) used consistently across `SPEC/procedures/README.md`, `SPEC/procedures/ft-task.md`, both pointer stubs, `SPEC.md` registrations, `PLATFORMS.md`, `AGENT-COMPAT.md`, and `AGENTS-snippet.md`. No inconsistency.

**Style parity:** All three new `SPEC/procedures/` files follow the prescribed shape: schema README → frontmatter SOP → minimal pointer stubs. The grok and codex pointer stubs are symmetric (identical structure and link target). Consistent with `SPEC/procedures/README.md` §"Loading convention".

**Cross-refs verified:**
- Both pointer wrappers link to `../../SPEC/procedures/ft-task.md` ✓ (relative path correct from `<platform>/procedures/`)
- `SPEC.md` §"Working in the flowtron repo itself" bullet → `SPEC/procedures/README.md` ✓
- `SPEC.md` §"Procedure SOPs" subsection → `SPEC/procedures/README.md` ✓
- `PLATFORMS.md` contract-layer "Where it lives" cell includes `SPEC/procedures/` ✓
- `PLATFORMS.md` Grok Build quirks table has "Procedure pointer" row ✓
- `AGENT-COMPAT.md` Grok/Codex rows include pointer wrapper info ✓
- `AGENT-NEUTRALITY.md` new row for SPEC.md §"Procedure SOPs" SKILL dispatch contrast reference ✓
- `AGENTS-snippet.md` `/ft-task` bullet has contract-only agent fallback note ✓

**Minor observation (no action):** `PLATFORMS.md` Grok Build quirks table "Procedure pointer" row has 3 cells in a 4-column table (the "When to reach for it" cell is absent). GFM renders it as an empty 4th cell; no semantic miss — the trigger is self-evident from the row context ("when asked to start a flowtron task"). Below the follow-up filing threshold.

**No regressions in earlier-shipped cohort children's surfaces.**

**No misses to file as `/ft-file-followup` candidates.**

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (audit verification pass; no code changed).

- [x] Ran lint/type-check on changed code — N/A (markdown-only audit; no code changed).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown-prose verification only. All cohort deliverables verified at HEAD via direct file reads; all cross-ref targets resolve; no broken links or stale paths.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep (fixed line)** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (cohort did not touch the public README)
  - `SPEC.md` — no change (registrations landed in CORE-271.2; content accurate at HEAD)
  - `docs/MIGRATION.md` — no change (adopter contract-only fallback instruction lives in `AGENTS-snippet.md`, the correct home per CORE-091 single-source posture)
  - `claude/AGENTS-snippet.md` — no change (contract-only fallback note landed in CORE-271.5; accurate)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change (new SPEC.md §"Procedure SOPs" row landed in CORE-271.5; accurate)
  - `docs/PLATFORMS.md` — no change (all cohort updates landed in CORE-271.5; verified accurate)
  - `claude/CAPABILITIES.md` — no change (last-verified: `v5.1.0 · 2026-06-02 (dogfooded)`; not impacted by this cohort)
  - `docs/AGENT-COMPAT.md` — no change (pointer wrapper updates landed in CORE-271.5; verified accurate)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-02.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate)

**Final Summary:**

Audit passed clean. CORE-EPIC-271 (`cross-agent-skill-projection`) cohort ships a coherent, well-documented `SPEC/procedures/` layer: `README.md` (schema + loading convention), `ft-task.md` (agent-neutral SOP), symmetric `grok/` + `codex/` pointer stubs, and four doc updates registering the layer across PLATFORMS, AGENT-COMPAT, AGENT-NEUTRALITY, and AGENTS-snippet. No naming inconsistencies, no contradictory cross-refs, no regressions. One minor observation (PLATFORMS.md Grok quirks table "Procedure pointer" row missing "When to reach for it" cell — below follow-up threshold). No follow-up tasks to file. Parent-flip: CORE-EPIC-271 flipped to `Completed` and cohort moved to `## Completed` atomically.

**Archived:** 2026-06-02
