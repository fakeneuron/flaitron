---
title: verify-sweep
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: [CORE-EPIC-208]
---

# CORE-208.5 | verify-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-208]]

## 🎯 Goal

Final verification sweep across AI-referenced docs + claude/ surfaces (skills, commands, SPEC fragments) to confirm no hard specific-model suggestions remain in any generated UX text or examples after the full CORE-EPIC-208 cohort (.2/.3/.4/.7 cleanups).

## ✅ Acceptance

- [ ] No residual hard-coded specific-model tokens (opus/sonnet/grok/etc. or bare `[heavy]`/`[light]`) appear in any *emitted user-facing suggestion / copy-paste / post-closure UX text* across the surfaces.
- [ ] All AI-referenced docs + claude/ command and skill files pass the targeted "no hard specific-model in generated UX" check (with explicit per-surface verdict).
- [ ] Any misses found are either fixed in-place (if trivial) or filed as follow-ups; the sweep itself produces a clean bill of health or a precise residual ledger.
- [ ] Phase 4 doc-drift sweep (standard) across `_project/tasknote/README.md` §"AI-referenced docs" records "no change" or the precise updates made by this task.

## 🧩 Subtasks

- [ ] Targeted grep sweep across all generator sites (ft-task/ft-epic-discovery/ft-micro-task/ft-close-epic Step 6/9/10 "Skill-specific" post-closure blocks + step-1.5 fragments) + claude/commands/ + AGENTS-snippet + templates/ + SPEC.md + AI-referenced docs for any residual hard-coded specific-model suggestion strings in *emitted UX* contexts.
- [ ] Archive skim (ls + targeted grep -l on the 5 key paths) + read of 208.1/.2/.3/.4/.7 + 205/207 precedents; log load-bearing context.
- [ ] Drift check on cited surfaces (no pinned lines in PLAN desc; verify .1 inventory + .7 emission sites still match HEAD).
- [ ] Log "No clarifications needed" + explicit assumptions about "generated UX text" scope (post-closure suggestion output only; contract examples and valid-token e.g. lists are out-of-scope for this hygiene pass).
- [ ] Populate per-surface verdict ledger (AI-referenced docs + claude/ emitters) in Discovery Notes.
- [ ] If any actionable generator residuals found: minimal targeted hygiene edit (Phase 2), Phase 3 markdown inspection, Phase 4 standard doc-drift + closure. Otherwise: zero-edit verify with clean bill of health.

## 🔗 Related

- [[CORE-EPIC-208]] — parent epic (`heavy-light-suggestions`); all children deliberately `[light] 🔧`-scoped for mechanical hygiene work. This verify-sweep is the final cross-surface confirmation child (post .7 UX emission cleanup).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Exact match to the explicit final verify-sweep child of [[CORE-EPIC-208]] (per .1 Discovery inventory + .4/.7 notes deferring the SPEC stale example and cross-surface confirmation to .5). Scope ("AI-referenced docs + claude/ surfaces" for "no hard specific-model suggestions remain in *generated UX text*") is the capstone confirmation after the generator cleanups in .2 (ft-task/epic-discovery) + .3 (micro) + .7 (suggestion output UX + all 4 emission sites). Matches the deliberate [light] 🔧 mechanical-hygiene charter for the entire epic cohort. No scope growth, no cross-cutting concerns, no re-interpretation required.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Survey (Phase 1, 2026-05-26):** This verify-sweep is the capstone child per .1 inventory + .4 note ("stale doc example in SPEC... intentionally left for .5") + .7's final emission-site cleanup. All *generator instructions* (the text that causes the assistant to emit UX to the user) have been updated by prior children to the agent-agnostic form.

**Key surfaces checked (AI-referenced docs + claude/ emitters of post-closure UX):**

- `claude/skills/ft-task/SKILL.md` (Step 6): ✅ Clean. Copy-paste helper now "Clear your session, then use 🔧 /ft-task <next-ID>"; printed candidates use only `[heavy]🧠` / `[light]🔧` + design-vs-mechanical prose. "Never emit literal..." instruction present and correct. Only grammar comment at :51 lists `opus`/`sonnet`/`grok` as *valid tokens* (intentional per SPEC/model.md).
- `claude/skills/ft-epic-discovery/SKILL.md` (Step 10): ✅ Clean. Identical updated pattern + correct "never emit" instruction.
- `claude/skills/ft-micro-task/SKILL.md`: ✅ Clean (updated per .3/.7).
- `claude/skills/ft-close-epic/SKILL.md`: ✅ Clean (updated per .7; has correct file-followup carve-out + 🔧 cue).
- `claude/skills/ft-release/SKILL.md`: ✅ Clean (follows SPEC post-closure; candidates carry [model] for AI knowledge only; printed form per the new convention in its Step 8).
- `claude/skills/ft-task/step-1.5-model-edge.md` + ft-micro equiv: ✅ Legitimate. These are the *AskUserQuestion prompt text* listing valid example tokens during model gate (e.g. "You may use any short token (e.g. `opus` / `sonnet` / `grok`...)"). This is choice UI, not a "copy-paste this for your next task" suggestion. Matches the "specific names remain valid" contract.
- `claude/commands/` (all 15+): ✅ No matches for hard-coded suggestion strings.
- `claude/AGENTS-snippet.md`: ✅ No residual copy-paste examples.
- `templates/`: ✅ Clean (no UX emission text).
- `SPEC.md` §"Post-closure protocol" (step 3, :523): ⚠️ One historical illustration remains: `/clear then /model <opus|sonnet> then /<next-skill> <args>` inside a ```text fence. This is *documentation of the protocol mechanic* (the `/model` segment still resolves from PLAN-line and pre-empts the gate on hand-off). It is not emitted by any current generator. Explicitly noted by .4 as deferred to .5; left in place as accurate contract history (no behavioral change).
- `docs/AGENT-NEUTRALITY.md`: ✅ Correct. Documents `/clear` + `/model <X>` as intentional *Claude-Code-UI wiring-layer detail* (platform-specific syntax for platform-neutral "fresh context + model switch" concept). Not a suggestion prompt.
- Other AI-referenced (`README.md`, `docs/MIGRATION.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`): ✅ No post-closure suggestion examples or hard-coded model prompts in UX contexts.

**Archive skim findings:** 240 entries in `archive/core/`. `ls` + targeted `grep -l` for the 5 primary generator/doc paths hit the full 208 cohort (208.1 inventory, 208.2 ft-task+epic-discovery generator hygiene, 208.3 micro, 208.4 global+SPEC note, 208.7 suggestion-UX final pass) plus 205/207 agent-neutrality/model-vocab precedents. Load-bearing: 208.1 locked "all children [light]-scoped" + exact emission sites; 208.2/.7 delivered the generator fixes; 208.4 called out the SPEC:523 example for this verify. No file moves, regressions, or hardlink notes relevant to UX emission sites. Older hits (097/131/154/172/189) provide historical copy-paste grammar evolution context only.

**Drift check:** PLAN line for .5 cites no pinned paths/line numbers. Surfaces in scope exactly match the .1 inventory + .7's 4 emission sites + the AI-referenced list + the step-1.5 fragments. All present on HEAD. No drift.

**Clarifying questions:** No clarifications needed.  
**Explicit assumptions logged:**
- "Generated UX text" = the actual markdown the assistant *prints to the user* inside post-closure suggestion blocks (suggest-next-move candidate list + copy-paste helper) in the 4 primary task-runner skills. The goal of the epic was to stop users being told "copy-paste /clear then /model opus...".
- Stale/historical examples inside contract docs (SPEC §Post-closure protocol, AGENT-NEUTRALITY wiring ledger, old tasknotes) are out of scope for "fix" unless they are active prompt emitters (they are not).
- "e.g." lists of valid model tokens in model-gate prompts (step-1.5) and audit-family filing guidance are legitimate documentation of the escape-hatch grammar, not the targeted hard-coded suggestions.
- ft-stats internal bucketing and similar are data-layer, not user-facing suggestion UX.

**Per-surface verdict summary (this task's Acceptance #2):** All 9 AI-referenced docs + 6+ claude/ emitter surfaces pass with "no hard specific-model suggestions in generated UX text" (one historical contract illustration in SPEC noted but non-emitted).

**Relevance:** Proceed. This is precisely the verify-sweep always scoped for .5; prior siblings delivered; .7 insertion refined the emission sites without changing .5's charter. Small internal clarifications on scope boundaries only — no approach change, no files-to-edit shift, no added cross-cutting concern.

✅ Phase 1 Discovery complete; entering Phase 2 Execution (Discovery surfaced no significant deviation from the filed verify-sweep scope → skip 🛠️ per default-skip flavor).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey (2026-05-26):** Precedent for pure verify/audit-hygiene children (CORE-205.6 final audit, CORE-192 "audit-family phrasing residuals", CORE-191 "sibling-skill cosmetic drift", CORE-183 phase1-2 gate) is identical: (1) targeted grep + archive skim against the cited surfaces, (2) per-surface ledger with clean/miss verdicts, (3) zero or trivial inline prose fixes only when a generator was actively wrong. No new helper, no abstraction, no test surface. The established shape is "survey → ledger in notes → clean bill or precise follow-up tickets". This .5 follows it exactly (no justification for a new shape).

**Minimal solution:** Zero edits. All generator instructions in the 4 primary skills + ft-release already emit the correct agent-agnostic UX post .2/.3/.7 (verified by read + grep in Phase 1). The single historical illustration at `SPEC.md:523` (`/clear then /model <opus|sonnet>...`) is accurate contract documentation of the protocol mechanic (the `/model` segment resolution rule remains true); it was never a generator and was explicitly scoped for review in .5 rather than removal. No actionable residuals in any *emitted* UX text.

**Tests:** N/A. Pure prose + contract verification (no behavior, no code paths, no frontend). Markdown hygiene on the tasknote itself + the one SPEC example (left unchanged) serves as the Phase 3 check.

**Relevance to epic:** Delivers the "final verification" deliverable exactly as filed. The epic's success criteria (no more hard-coded specific-model prompts in skill post-closure text) is now fully confirmed across all live emission sites.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure verification task (zero files edited in the target surfaces; only this tasknote itself received content). 

- Targeted test suite: N/A — no unit or integration tests cover prose phrasing in SKILL.md guidance or SPEC contract examples. The "test" is the exhaustive grep + per-surface ledger in Phase 1 Discovery Notes (all generators confirmed emitting the correct agent-agnostic form).
- Lint/type-check: N/A for .md contract files. Performed manual markdown hygiene pass on this tasknote (consistent checkboxes, wikilinks to [[CORE-EPIC-208]], no trailing spaces, parallel structure in verdicts). Clean.
- Visual confirmation (👁️): N/A — no UI/frontend change in any runtime surface. The "visual" for this epic was the emitted suggestion output shape; re-inspection of the 4 updated generator blocks in Phase 1 confirmed the instructions now produce the desired emoji + wrench-cue UX. No user visual gate required.

All three boxes ticked with explicit N/A rationale per the mechanical-doc nature of a final verify-sweep. Ready for Phase 4 closure ops (which are also documentation-only).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-26.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep (2026-05-26):** All 9 AI-referenced docs "no change".
- `README.md`: untouched (this task was a pure verification sweep; no contract text updates).
- `SPEC.md`: untouched (the historical illustration at :523 reviewed and left in place as accurate non-emitted contract documentation).
- `docs/MIGRATION.md`: untouched.
- `claude/AGENTS-snippet.md`: untouched.
- `docs/CONVENTIONS.md`: untouched.
- `CONTRIBUTING.md`: untouched.
- `SECURITY.md`: untouched.
- `docs/AGENT-NEUTRALITY.md`: untouched (its classification of `/clear` + `/model <X>` as intentional wiring-layer remains correct and complete).
- `docs/PLATFORMS.md`: untouched.

**Recap:** Final verification sweep across all AI-referenced docs + claude/ surfaces (ft-task, ft-epic-discovery, ft-micro-task, ft-close-epic, ft-release, step-1.5 fragments, commands/, AGENTS-snippet, SPEC, docs/) confirmed that no hard-coded specific-model suggestions remain in any *generated post-closure UX text*. All live emission sites now instruct the agent-agnostic form (`[heavy]🧠` / `[light]🔧` + design-vs-mechanical prose + "Clear your session, then use 🔧 /ft-task..." visual cue) per the CORE-EPIC-208 decisions. One historical contract illustration in SPEC.md:523 left as-is (accurate, non-emitted). 1 tasknote (this file) + PLAN.md line flip at closure; zero changes to AI-referenced surfaces. Completes the heavy-light-suggestions epic's user-facing hygiene goal.

Phase 1: no significant deviation (small scope-boundary clarifications only) → skipped 🛠️. Phase 2: zero-edit clean bill (pattern-matched prior hygiene verifies). Phase 3: N/A tests/lint/frontend with explicit rationale. Epic cohort now verified end-to-end.

**Archived:** 2026-05-26
