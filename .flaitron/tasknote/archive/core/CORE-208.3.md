---
title: micro-audit-fragments
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: [CORE-EPIC-208]
---

# CORE-208.3 | micro-audit-fragments

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-208]]

## 🎯 Goal

Clean `claude/skills/ft-micro-task/SKILL.md`, both `step-1.5-model-edge.md` fragments, and the 4 audit-family skill example grammars for consistent neutral primary labels (`[heavy]🧠` / `[light]🔧`) + "design vs mechanical" prose and emoji visuals, matching the terminology, visuals, and emission patterns locked by CORE-208.1 and applied in sibling children.

## ✅ Acceptance

- [ ] `ft-micro-task/SKILL.md` Step 1 model-segment comment and any grammar example updated to neutral primary-label phrasing (`[heavy]🧠` / `[light]🔧` primary recommended; specific e.g. `opus` / `sonnet` / `grok` remain valid per SPEC) matching ft-task/SKILL.md post-.2
- [ ] Both `step-1.5-model-edge.md` Legacy-entry paragraphs use consistent primary-label recommendation + e.g. list style aligned with SPEC/model.md and sibling fragments
- [ ] The 4 audit-family (backend/frontend/performance/security) + ft-audit + ft-audit-docs §5 "write tickets using ... grammar" examples updated from bare `[opus|sonnet]` to the neutral form used in current SPEC and non-audit skills
- [ ] No residual hard-coded specific-model tokens remain in the example grammars or model-capture comments of the in-scope files (primary labels first; specifics only as documented escape hatch)
- [ ] Pattern survey + drift re-check + archive skim logged; doc-drift sweep at closure confirms only the expected ~9 SKILL.md files among AI-referenced docs

## 🧩 Subtasks

- [ ] Pattern survey of model-segment comment + grammar example sites across ft-micro-task/SKILL + 2×edge + 6×audit-family; cross-reference the updated ft-task/SKILL.md:51 and ft-epic-discovery equivalents (post-CORE-208.2) + SPEC/model.md
- [ ] Edit ft-micro-task/SKILL.md: update the Step 1 capture comment (the `(`opus` | `sonnet`)` line) to the neutral-primary phrasing; confirm surrounding grammar description line is already clean or align it
- [ ] Harmonize both `claude/skills/{ft-task,ft-micro-task}/step-1.5-model-edge.md` Legacy-entry paragraphs (e.g. lists + any "Ask the user..." wording) for full parity with post-208.1/207 standard
- [ ] Update the 6 audit-family SKILL.md files (§5 "Write the proposed tasks" step) grammar examples from `[opus|sonnet]` to the modern neutral primary form (e.g. `[model]` or primary-recommended phrasing with SPEC citation)
- [ ] Phase 3: targeted markdown mental-pass + exact-string verification on the edited files (no executable code / tests)
- [ ] Phase 4: doc-drift sweep across `_project/tasknote/README.md` AI-referenced docs, PLAN.md stub flip + move to Completed, tasknote archive move, recap

## 🔗 Related

- [[CORE-EPIC-208]] — parent epic (`heavy-light-suggestions`); all children deliberately `[light] 🔧`-scoped for mechanical hygiene work
- [[CORE-208.1]] — epic Discovery (2026-05-26) that performed the surface inventory of the remaining hard-coded model examples and locked the `[heavy]🧠`/`[light]🔧` + design-vs-mechanical decisions
- [[CORE-208.2]] — updated the post-closure copy-paste generators in ft-task + ft-epic-discovery to the agent-agnostic shape (direct precedent for phrasing)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Direct continuation of CORE-EPIC-208 after .2 closed (2026-05-26). Scope is narrow mechanical string-hygiene on exactly the sites inventoried in 208.1 (ft-micro-task/SKILL.md + 2×step-1.5-model-edge.md + 4 audit-family grammar examples). Target state (neutral primary labels first with design-vs-mechanical prose + 🧠/🔧 visuals; specifics only as e.g. "remain valid per SPEC") is locked by 208.1 and demonstrated in the .2 edits to ft-task/SKILL.md. No design tradeoffs, no re-scope, no cross-cutting concerns. Matches the deliberate [light] 🔧 scoping for the entire child cohort. Zero open questions.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Relevance:** Scope is a pure follow-up hygiene pass scoped at epic-Discovery time. No deviation from the filed PLAN line or the 208.1 inventory. Verdict: Proceed (no 🛠️ gate).

**Archive skim (core/, 238 entries):** 
- Key load-bearing for ft-micro-task/SKILL.md + edges: CORE-208.1.md (exact inventory of these + the 4 audit grammar sites + "all children light-scoped" + locked visuals), CORE-208.7.md, CORE-207.md (model-guidance), CORE-191.md (sibling-skill cosmetic drift that touched the edge fragments), CORE-154.5.md (multi-agent portability audit touching many audit-family + edges).
- Key for audit-family SKILLs: CORE-154.5.md, CORE-170.md (audit scaffold), CORE-185.md (pass-name layering), CORE-186.md (ft-audit-context), CORE-142.md (restore-generic).
- No file moves, no regressions, no hardlink notes relevant to the grammar strings. The `[opus|sonnet]` example lines have been stable since the audit-family introduction (154/170 era). No prior 208-cohort cleanup of these specific strings (by design — they were carved out for this child).

**Drift check:** Confirmed clean. 
- ft-micro-task/SKILL.md:50 still carries the legacy `(`opus` | `sonnet`)` capture comment (exactly as 208.1 cited).
- Both step-1.5-model-edge.md:16 still list `opus`, `sonnet` in the e.g. after the primary-label recommendation (as 208.1 flagged).
- All 6 audit SKILL files (ft-audit + docs + 4 specialized) carry the identical `[opus|sonnet]` grammar example in their §5 "write tickets" step.
- Line numbers/paths in 208.1 still resolve to the strings on current HEAD (re-verified via read + grep immediately before edits). No drift.

**Clarifying questions:** No clarifications needed (mechanical, zero ambiguity).
**Explicit assumptions:** 
(1) "4 audit-skill" = the 4 specialized (backend/frontend/performance/security) per 208.1 text; ft-audit/SKILL.md and ft-audit-docs/SKILL.md carry the identical legacy string and are cleaned in the same pass for consistency (no scope expansion — they are the same family).
(2) The two step-1.5 fragments are already mostly updated (primary labels present); only light harmonization of e.g. lists + any surrounding prose needed for full parity with ft-task fragment + SPEC/model.md.
(3) ft-micro-task/SKILL.md primary delta is the Step 1 capture comment (update to match ft-task/SKILL.md:51 post-.2 style exactly: "(`[heavy]` / `[light]` primary recommended; specific names e.g. `opus` / `sonnet` / `grok` remain valid per SPEC §\"Model field\")").
(4) Grammar example updates in audit files will use the modern phrasing already present in ft-task/SKILL.md and SPEC (no invention of new text).
(5) Pure documentation/UX-text hygiene; no runtime behavior, no tests, no user-visible command changes.
(6) After the  ~9 small edits, the Phase 4 doc-drift sweep will report only these SKILL.md files (plus this tasknote) among the AI-referenced cohort.

**Subtasks populated:** See 🧩 above (ordered, concrete, minimal). Discovery surfaced no significant deviation from the original PLAN line → skip 🛠️ per default-skip flavor.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:** 
- Reference shape: ft-task/SKILL.md:51 (post-CORE-208.2) — "The optional `[model]` segment (`[heavy]` / `[light]` primary recommended; specific names e.g. `opus` / `sonnet` / `grok` remain valid per SPEC §"Model field")"
- ft-epic-discovery, ft-starter-task, ft-file-followup, ft-close-epic already use primary-first or `[model]` + SPEC citation.
- SPEC/model.md: primary `[heavy]`/`[light]` first, "specific names ... remain fully valid tokens", practical guidance section.
- Audit-family grammar examples were the last large cohort still emitting the bare pre-206 `[opus|sonnet]` literal in the "how to write a ticket" instruction.
- ft-audit-context already modern (`[model]` + `[sonnet]` default note) — left untouched.
- No new shape required; direct string replacement extending the 208.2 / 207 / 206 pattern. All changes are 1-line or near-1-line prose/example hygiene.

**Implementation:**
- 1 file (ft-micro-task/SKILL.md): updated the Step 1 model-segment capture bullet to the neutral primary phrasing (exact match to ft-task sibling).
- 2 files (step-1.5-model-edge.md ×2): minor e.g. list harmonization (commas → slashes, added `grok` for 208-cohort parity; primary recommendation text was already correct).
- 6 files (ft-audit + ft-audit-docs + 4 specialized): updated the §5 "write tickets using ... grammar" illustrative line from `[opus|sonnet]` to `[model]` + parenthetical primary-label guidance + SPEC cross-ref. Kept the instructional tone and length minimal.
- Total: 9 files touched, all pure documentation strings. No behavior, no new prose beyond the locked terminology from 208.1.
- No tests exist for these SKILL prompt strings; verification is exact-match + mental pass (Phase 3).

**Key decisions:** 
- Used `[model]` as the placeholder in the audit grammar examples (matches ft-audit-context and the grammar descriptions in ft-task/SKILL.md) rather than embedding the full primary-label sentence in every audit file (keeps the example lines short and scannable while still citing the primary labels + SPEC in the parenthetical).
- Emoji visuals (🧠/🔧) not added inside the audit "write tickets" examples — those visuals are for the printed suggest-next UX in post-closure (already handled in .2/.7); the grammar examples are internal instructions to the auditor AI.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

**Verification pass (doc-only changes, no binary tests/lint applicable):**
- Strict negative grep across the 6 audit-family SKILL.md files: no remaining `[opus|sonnet]` literal in the grammar-example lines (PASS).
- ft-micro-task/SKILL.md model-segment comment: now contains the exact neutral primary phrasing matching ft-task/SKILL.md post-208.2 (PASS).
- Both step-1.5-model-edge.md: legacy comma e.g. lists eliminated; now use slash style + `grok` for 208-cohort parity (PASS).
- Markdown hygiene: all edits preserve house style (em-dashes, backticks, § cross-refs, wikilink-free in these contexts, consistent parentheticals). No new formatting drift introduced.
- No frontend surface touched → no 👁️ visual confirmation required (the 👁️ gate is explicitly for UI changes per SPEC).
- No Python/TS/Go etc. code changed → no pytest / vitest / type-check / eslint runs applicable. The "targeted suite" for prose is exact-string + mental pass against the locked target state from 208.1 + SPEC/model.md.
- All 9 files re-read post-edit; diffs are minimal, isolated, and traceable to the single intent (remove hard specific-model examples from example grammars and model-capture comments).

No issues found. Ready for closure.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Recap (1-2 sentence plain-English first):**  
Completed the narrow mechanical hygiene pass for CORE-EPIC-208 on the remaining surfaces that still emitted hard-coded specific-model examples in their grammar text and model-capture comments. 9 SKILL.md / fragment files updated to the neutral primary-label convention (`[heavy]🧠` / `[light]🔧` first) with specifics only as documented escape hatches per SPEC.

**Technical detail:**  
- ft-micro-task/SKILL.md:1-line update to the Step 1 capture comment (now byte-parallel to ft-task/SKILL.md:51 post-208.2).  
- 2× step-1.5-model-edge.md: e.g. list harmonization (no functional change; primary recommendation was already correct).  
- 6× audit-family SKILL.md (ft-audit + docs + 4 specialized): replaced the  `[opus|sonnet]` grammar illustration in §5 "Write the proposed tasks" step with `[model]` + parenthetical guidance citing primary labels + SPEC.  
- Archive skim, drift check, and pattern survey all clean against 208.1 inventory. Phase 3 verification (strict grep) confirmed zero legacy bare tokens remain in the edited sites.  
- Doc-drift sweep (this closure): all 9 entries in `_project/tasknote/README.md` §"AI-referenced docs" → "no change" (edits were confined to on-demand `claude/skills/*` per the README note; this tasknote itself is not in the cold-start list).  
- Files changed in this tasknote cycle: 9 SKILL/fragment files + this tasknote (for the 4-phase record).

**Archived:** 2026-05-26
