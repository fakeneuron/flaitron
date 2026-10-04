---
title: cross-agent-skill-projection
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-EPIC-267, CORE-269]
---

# CORE-270 | cross-agent-skill-projection

[← PLAN.md](../PLAN.md) · ✅ Completed 2026-06-02 · 🔗 [[CORE-EPIC-267]] · 🔗 [[CORE-269]]

## 🎯 Goal

File the cross-agent skill projection epic (CORE-EPIC-271) in PLAN.md, capturing the resolved architecture decisions so that `/ft-epic-discovery CORE-EPIC-271` starts with full context.

## ✅ Acceptance

- [x] Architecture decisions confirmed (SOP dir = SPEC/procedures/, proof slice = ft-task, generator = hand-author first)
- [x] "Open at promotion" questions resolved
- [x] CORE-EPIC-271 parent line filed in PLAN.md
- [x] CORE-270 PLAN.md line flipped to Completed

## 🧩 Subtasks

- [x] Confirm architecture decisions still hold (cross-check with CORE-269 landing and current SPEC/docs state)
- [x] Resolve "Open at promotion" questions (proof-slice skill, SOP dir, hand-author vs generator order)
- [x] File CORE-EPIC-271 parent line in PLAN.md (with architecture context)
- [x] Close CORE-270

## 🔗 Related

- [[CORE-EPIC-267]] — dogfood gate whose "refresh from real verification" obligation exposed this gap
- [[CORE-269]] — dogfood-prompt-template; landed `docs/DOGFOOD.md` as the first manual agent-neutral procedure; stays in docs/ as an operator verification runbook (separate layer from SPEC/procedures/ SOPs)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Architecture is fully grounded — observed quality gap (Claude with skills > contract-only agents on procedure adherence) is confirmed by CORE-268 dogfood runs (Grok PASS, Codex flagged cue-subset gap). Thin-wrapper + neutral SOP approach is consistent with flowtron's neutrality posture (AGENT-NEUTRALITY.md) and the CORE-091 single-source-collapse precedent. All "Open at promotion" questions resolved. Epic-sized scope confirmed.

- [x] Read relevant source files — SPEC/epic.md (epic lifecycle convention: parent + .1 + audit placeholder at filing; implementation children filed by discovery). docs/PLATFORMS.md, docs/AGENT-NEUTRALITY.md confirmed at HEAD. DOGFOOD.md now exists in docs/ (CORE-269, completed today).

- [x] **Archive skim** — `archive/core/` scanned. Key hits:
  - **CORE-269** (2026-06-02): landed `docs/DOGFOOD.md` — first manually authored agent-neutral procedure SOP. Its Discovery Notes flag that if CORE-270 introduces `SPEC/procedures/`, DOGFOOD.md can be absorbed or redirected. DOGFOOD.md is an operator verification runbook (different layer from agent-loaded workflow SOPs — stays in docs/).
  - **CORE-091** (2026-05-14): single-source collapse precedent — collapsed duplicated wiring blocks to pointer paragraphs. Direct analogue to the thin-wrapper architecture ("generate routing, not procedure").

- [x] **Drift check** — all paths cited in starter context verified at HEAD:
  - `claude/skills/ft-*` — all present (ft-task, ft-close-epic, ft-epic-discovery, ft-release, etc.) ✓
  - `docs/PLATFORMS.md`, `docs/AGENT-NEUTRALITY.md` — exist ✓
  - `SPEC/epic.md`, `SPEC/gates.md` — exist ✓
  - `SPEC/procedures/` — absent (new dir, as expected) ✓
  - **New state since filing:** `docs/DOGFOOD.md` now exists (CORE-269, completed 2026-06-02). No decisions invalidated; DOGFOOD.md stays in docs/ as operator-facing, separate from the new SPEC/procedures/ agent-loaded SOPs.

- [x] Asked clarifying questions — resolved below

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Architecture decisions (locked at filing, confirmed at promotion)

| Decision | Choice | Rationale |
|---|---|---|
| Thin pointers vs. thick copies | **Thin pointers** | Thick copies manufacture staleness drift and K-way diff noise — the exact drift CORE-267 dogfood gate exists to catch |
| Source of truth | **Neutral SOP, not the Claude skill** | "Claude skill as source" puts canonical content in a Claude-specific file; a pure copy is broken on arrival (Grok has no AskUserQuestion) |
| Generator placement | **Standalone, not in ft-release** | Release-only projection lags HEAD; ft-release should gate on currency, not own generation |
| Gap flowtron can close | **Narrow it, don't erase it** | Claude skills enforce gates deterministically; contract-only agents reading SOPs can skip steps — residual gap is agent capability, not wiring |

### "Open at promotion" — resolved

1. **Proof slice:** `ft-task` 4-phase driver (user confirmed; highest-value, most-exercised — one end-to-end vertical slice dogfooded under Grok before rolling the rest)
2. **SOP location:** `SPEC/procedures/` (new dir — extends the lazy-SPEC-module pattern; DOGFOOD.md stays in docs/ as operator verification; separation of concerns is clean)
3. **Generator timing:** hand-author the proof slice first, then generator in a later epic

### SPEC/procedures/ vs docs/ layer separation

DOGFOOD.md (operator runbook: "how to run a dogfood session") and SPEC/procedures/ft-task.md (agent-loaded SOP: "how to drive the ft-task 4-phase workflow") serve different audiences and are loaded at different times. No collision. DOGFOOD.md does NOT migrate to SPEC/procedures/.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — epic parent lines follow `- [ ] **CORE-EPIC-N** [model] | shortname — description` with indented children. CORE-EPIC-267 (5 children), CORE-EPIC-254 (6 children), CORE-EPIC-224 (5 children) as reference shapes. Filed CORE-EPIC-271 + .1 discovery + .2 audit placeholder.

- [x] Implemented the minimal solution — added CORE-EPIC-271 parent + .1 discovery + .2 audit placeholder to PLAN.md under ## Medium

- [x] Updated/added tests for non-trivial behavior — N/A (PLAN.md edit only)

**Implementation Notes:**

Added to PLAN.md `## Medium` section (after CORE-270):
- `CORE-EPIC-271` parent line: architecture description with resolved decisions (SOP dir, proof slice, generator timing)
- `CORE-271.1` discovery child: scope implementation children + finalize SOP format
- `CORE-271.2` audit placeholder: N updated after discovery

DOGFOOD.md layer decision: stays in `docs/` as operator verification runbook; SPEC/procedures/ agent-loaded SOPs are a distinct layer. No migration needed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (PLAN.md markdown edit only)

- [x] Ran lint/type-check on changed code — N/A (no code changed)

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:**

PLAN.md mental-pass: CORE-EPIC-271 parent line grammar matches the task-line format (`- [ ] **ID** [model] | shortname — description`). Children are correctly indented with 2 spaces. .1 description is ≤70 words. .2 audit placeholder is clearly marked. No broken markdown.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**

Promoted the CORE-270 starter to a full tasknote, resolved all "Open at promotion" architecture decisions (proof slice = ft-task, SOP dir = SPEC/procedures/, generator = hand-author first then separate epic), and filed CORE-EPIC-271 with its .1 discovery and .2 audit placeholder in PLAN.md. The key architectural clarity delivered: DOGFOOD.md stays in docs/ as operator verification; SPEC/procedures/ is the new agent-loaded SOP layer; the CORE-091 single-source-collapse precedent is the direct design analogue.

**Archived:** 2026-06-02
