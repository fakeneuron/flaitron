---
title: suggestion-ux-cleanup
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: ["CORE-EPIC-208"]
---

# CORE-208.7 | suggestion-ux-cleanup

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-208]]

## 🎯 Goal

Update the post-closure suggestion output (next-move candidates + copy-paste helper) across flowtron skills to drop explicit `[light]`/`[heavy]` (or specific model) tokens in favor of emoji visuals only (`[heavy]🧠` / `[light]🔧`) plus "design vs mechanical" prose, and replace the fragile `/clear then /model ...` copy-paste instruction with a reliable visual cue pattern ("clear session + [wrench] /ft-task").

## ✅ Acceptance

- [ ] Post-closure "suggest next move" text uses only emoji primary labels + design/mechanical prose; no hard-coded `opus`/`sonnet`/`grok`/etc. tokens or bare `[light]`/`[heavy]` in the emitted UX.
- [ ] Copy-paste line updated from literal `/clear then /model <token> then /<skill>` to a stable visual form (e.g. `clear session + 🔧 /ft-task <ID>` or equivalent approved pattern).
- [ ] All emission sites updated consistently (ft-task Step 6 primary; ft-micro-task, ft-close-epic, ft-epic-discovery, ft-release and any doc examples that mirror the pattern).
- [ ] Doc-drift sweep (Phase 4) across `_project/tasknote/README.md` §"AI-referenced docs" records "no change" or the precise updates made.
- [ ] Suggestion output remains scannable and aligns with the agent-neutral convention established by parent [[CORE-EPIC-208]].

## 🧩 Subtasks

- [ ] Survey (done) — only 4 residual generator strings (ft-task:148 & ft-epic-discovery:236 post-.2 form with e.g.; micro:122 & close-epic:196 still hard `<opus|sonnet>`). step-1.5 e.g. lists are intentional valid-token docs.
- [ ] Lock UX (done via Ask) — "Tighter visual only, drop [model] from printed list". New cue: clear-session + 🔧 /ft-task instruction (no `/clear then /model` literal in printed text). Printed candidate bullets: emoji + prose only.
- [ ] Pattern survey of the 4 emission sites + 208.2 precedent (minimal targeted string hygiene; preserve contract text around the generators).
- [ ] Edit the four SKILL.md generator instructions to produce the new visual cue + token-free printed candidate lists.
- [ ] Phase 3: markdown hygiene + inspection of new suggestion shape in guidance (no executable code/tests).
- [ ] Phase 4: doc-drift sweep (AI-referenced docs), PLAN stub flip + archive move for .7, recap.

## 🔗 Related

- [[CORE-EPIC-208]] — Parent epic: eliminate hard-coded specific-model prompts from skill post-closure text; adopt [heavy]🧠/[light]🔧 primary labels with design-vs-mechanical prose and emoji visuals. All children [light]-scoped.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Direct continuation of CORE-EPIC-208 (heavy-light-suggestions). Prior children (.1 discovery, .2 ft-task-epic-copy-paste generator cleanup, .3–.5 micro/CLAUDE/verify, .6 audit) have addressed most surfaces; this child targets the final user-facing post-closure *suggestion output* UX (the markdown the assistant actually prints for next-move candidates + copy-paste helper). Scope is mechanical string hygiene on the emission guidance in the four primary skills. Matches the deliberate [light] 🔧 scoping for the entire cohort. No re-scope or de-scope.

- [x] Read relevant source files
- [x] **Archive skim** — `ls _project/tasknote/archive/core/` (237 entries) then `grep -l` for the four in-scope paths (ft-task/SKILL.md, ft-micro-task/SKILL.md, ft-close-epic/SKILL.md, ft-epic-discovery/SKILL.md) hit the expected recent cohort: CORE-208.1.md (inventory of the exact residual strings), CORE-208.2.md (ft-task + ft-epic-discovery generator cleanup; explicitly scoped micro/close out), CORE-205.x / 207 / 189/190 (precedent grammar + agent-neutrality work). Load-bearing: 208.1 locked the terminology + "all children light-scoped" + identified the post-closure UX emission as the gap; 208.2 cleaned the *instructions to the AI* in two files but left the actual emitted suggestion phrasing and the other two skills (micro, close-epic) with legacy `/clear then /model <opus|sonnet>` hardcodes. No file moves, regressions, or hardlink notes relevant to suggestion output shape.
- [x] **Drift check** — All paths and cited concepts in the PLAN line (post-closure suggestion output, ft-task Step 6, sibling skills) match current HEAD exactly. The legacy generator strings identified in 208.1 are still present in the four files (re-verified via grep before edits). No drift since epic filing.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
  **Clarification surfaced (one AskUserQuestion):** Exact emitted UX for the new visual cue + whether the printed suggest-next candidate list should drop the `[light]🔧` tokens from user view.

  **Locked decision (user choice):** "Tighter visual only, drop [model] from printed list."
  - New copy-paste helper the assistant emits: a short "Clear your session, then use 🔧 /ft-task <ID>" cue (exact wording to be finalized in Phase 2 for scannability; no literal `/clear then /model ...` anywhere in the printed suggestion).
  - Printed suggest-next bullets: show only emoji visuals + "design vs mechanical" prose + shortname/description; omit the bracketed `[light] 🔧` token from what the user sees in chat. The full PLAN.md grammar line (with [model]) remains the source of truth for the AI when it reads PLAN; only the *output* to the human drops the explicit token.

  This directly shapes the replacement strings in Phase 2 but did not change target files or overall mechanical approach.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Survey + Clarification (Phase 1, 2026-05-26):** 
- Archive skim (ls + grep -l on the 4 in-scope SKILL paths) + reads of 208.1/208.2 + current HEAD confirm the exact residual emission sites. .2 cleaned ft-task + epic-discovery generator *instructions*; micro and close-epic still carry hard `<opus|sonnet>`; the emitted UX phrasing still produces "/clear then /model ..." for the user.
- One AskUserQuestion locked "Tighter visual only, drop [model] from printed list" — refines the target UX strings (new cue shape + token-free printed bullets) but does not alter files-to-edit, edit style (minimal hygiene), or scope. Small clarification only.

**Relevance:** Proceed. Final mechanical child for the suggestion output surface of [[CORE-EPIC-208]].

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

Discovery surfaced no significant deviation (pre-scoped sites + one wording/print-rule clarification that left the execution plan unchanged; no Re-scope/De-scope) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — The direct precedent is CORE-208.2 (targeted string hygiene on the exact post-closure generator sections in ft-task + ft-epic-discovery while preserving surrounding contract text and "substitute the actual PLAN token" intent). Earlier CORE-189 established the minimal-edit shape for copy-paste grammar tweaks. No new abstraction or shape justified; the four sites are the complete residual surface after the rest of the epic.
- [x] Implemented the minimal solution
- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey (2026-05-26):** Confirmed via the Phase 1 grep + reads of 208.2/189 + current state of the four "Skill-specific" post-closure blocks. All four still contained legacy phrasing that would cause the AI to emit the old "/clear then /model ..." cue or hard-coded opus/sonnet examples to the user. The internal "read [model] from PLAN for the AI's knowledge" rule is preserved; only the *printed user-facing output* is changed to emoji-only + new wrench visual cue.

**Implementation:** Four targeted replaces (one per SKILL.md "Skill-specific" section at the end of their post-closure protocol steps). 
- ft-task/SKILL.md and ft-epic-discovery/SKILL.md: updated the two bullets that control printed list formatting and the copy-paste helper text.
- ft-micro-task and ft-close-epic: replaced the remaining hard `<opus|sonnet>` literals + added the new cue + "drop token from printed output" rule.
Net: 4 files, small diff (primarily guidance prose). Zero runtime logic, zero new functions, zero refactors. Matches the "minimal solution" + "pure doc/skill text hygiene" shape of the parent epic's children.

**Verification plan for Phase 3:** Manual inspection that the new guidance text is consistent and would produce the desired user-visible output (emoji visuals only + wrench cue, no `/clear then /model` literal). Markdown hygiene pass. No test suite applies.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure prompt-text / SKILL.md guidance hygiene (no executable code, no behavior change, no frontend surface, no perf impact).

- Targeted "test suite": N/A — no unit/integration tests cover the exact phrasing of post-closure suggestion strings (they are runtime AI output instructions).
- Lint/type-check: N/A for .md files. Performed manual markdown hygiene pass on the four edited blocks (consistent em-dashes, no trailing spaces, wikilink integrity on [[CORE-EPIC-208]], grammar/parallelism of the new bullets across files). All clean.
- Visual confirmation (👁️): N/A — no UI/frontend change. The "visual" here is the new suggestion output shape the AI will emit; verified by re-reading the edited guidance blocks that the instructions now direct the desired emoji-only + wrench-cue output. No user visual check required.

All three boxes ticked with explicit N/A rationale per the mechanical-doc nature of the change. Ready for Phase 4 closure ops.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-26.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep (2026-05-26):** All 9 AI-referenced docs "no change".
- README.md, SPEC.md, docs/MIGRATION.md, claude/AGENTS-snippet.md, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md: untouched (edits were confined to `claude/skills/*/SKILL.md` under the four runner skills; per tasknote/README these are lazy-loaded on demand and explicitly excluded from the default cold-start sweep).

**Recap:** Cleaned the post-closure suggestion output UX (next-move candidate lists + copy-paste helper) across ft-task, ft-epic-discovery, ft-micro-task, and ft-close-epic. Dropped all explicit model tokens from the text the user sees in favor of emoji visuals only (`[heavy]🧠` / `[light]🔧` + design-vs-mechanical prose) and replaced the fragile "/clear then /model ..." literal with the stable "clear session + 🔧 /ft-task" visual cue pattern per the locked "Tighter visual only, drop [model] from printed list" decision.

4 files, minimal targeted prose edits in the "Skill-specific" post-closure sections (no runtime behavior change). Completes the user-facing output hygiene for [[CORE-EPIC-208]] (suggestion-ux-cleanup child). Pattern matched prior epic children (208.2, 189). Phase 1 exit skipped 🛠️ (small clarification only); Phase 3 was pure inspection (N/A for tests/lint/frontend).

**Archived:** 2026-05-26
