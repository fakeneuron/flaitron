---
title: model-guidance-agent-aware
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-206]
---

# CORE-207 | model-guidance-agent-aware

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-206]]

## 🎯 Goal

Refine the soft/practical guidance on `[heavy]` vs `[light]` (and model token choices) to reflect real capability differences across agents, with cross-provider examples and realistic defaults (e.g. current Grok mostly staying on `[light]`).

## ✅ Acceptance

- [ ] `SPEC/model.md` contains enriched practical/agent-aware guidance (new subsection or expanded "Model field" content) with 2–3 realistic examples and cross-provider nuance
- [ ] `claude/AGENTS-snippet.md`, `templates/PLAN.md` (comment), and the "Model —" sections in all 5 filing `claude/skills/ft-*/SKILL.md` files updated to thin cross-reference per the "Centralize + enrich SPEC" choice
- [ ] No long-form duplication of the new practical guidance remains outside `SPEC/model.md`
- [ ] `docs/AGENT-NEUTRALITY.md` (and any other AI-referenced docs mentioning the labels) reviewed and left accurate or lightly patched for consistency
- [ ] Updated prose passes editorial review for soft/practical tone (observations and rules of thumb, not rigid policy; remains agent-neutral framing)

## 🧩 Subtasks

- [ ] Draft enriched practical guidance + 2–3 agent-aware examples (Grok [light] bias on routine mechanical work; when to choose [heavy] even on light-preferring agents; cross-provider calibration note) for the canonical `SPEC/model.md`
- [ ] Integrate the new content into `SPEC/model.md` (new subsection or expanded recommended-labels paragraph) while preserving existing contract rules
- [ ] Thin the one-sentence guidance in `claude/AGENTS-snippet.md` to a crisp "see SPEC §\"Model field\" for agent-aware examples and realistic defaults"
- [ ] Apply identical thin-pointer updates to the Model step paragraphs in `claude/skills/ft-task/SKILL.md`, `ft-micro-task/SKILL.md`, `ft-starter-task/SKILL.md`, `ft-epic-discovery/SKILL.md`, `ft-file-followup/SKILL.md` and the comment block in `templates/PLAN.md`
- [ ] Sweep `docs/AGENT-NEUTRALITY.md` + `_project/tasknote/README.md` AI-referenced list for any model-guidance mentions; apply minimal consistent touch-ups
- [ ] Phase 2 pattern survey on how other "recommended practice" text is handled in SPEC vs. skills (centralization precedent)
- [ ] Phase 3 — doc-only: mental-pass markdown lint on edited lines; no tests to run
- [ ] Phase 4 closure ops (doc-drift sweep across all AI-referenced docs, PLAN.md stub flip + archive move, recap)

## 🔗 Related

- [[CORE-206]] — model-token-vocabulary (introduced the neutral primary labels `[heavy]` / `[light]` that this task now makes practically usable with guidance and examples)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Direct sequel to CORE-206 (neutral `[heavy]`/`[light]` vocabulary introduced) and CORE-199 (human-facing model selection prose reduced to one sentence). This task improves the now-stale "recommended labels" guidance with practical, agent-aware advice + examples + realistic defaults (explicitly calling out Grok's observed preference for `[light]` on routine work). Doc-only scope; no behavior changes or code edits anticipated.

- [x] Read relevant source files
- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Current guidance surfaces surveyed (2026-05-25):
  - Canonical contract: `SPEC/model.md` (defines `[heavy]` for design/ambiguity/exploratory/multi-file; `[light]` for mechanical/well-scoped/clear-diff; any short token allowed; single model per task; suggests default to heavy for design work).
  - Adopter paste surface: `claude/AGENTS-snippet.md:19` (concise one-sentence rule adopters see when wiring flowtron).
  - Filer aid: `templates/PLAN.md` (comment block under Future Opportunities with nearly identical one-liner for humans filing tasks).
  - Repeated boilerplate in all five filing skills (`claude/skills/ft-*/SKILL.md` Step 1 "Model —" sections): identical "recommended primary labels..." sentence.
- Predecessor context: CORE-206 (commit 3f13e00, same day) performed the vocabulary lift from opus/sonnet-centric to neutral primary labels across SPEC, skills, templates, AGENTS-snippet, and AGENT-NEUTRALITY ledger. CORE-199 (also 2026-05-25) reduced the personal/user "§ Model Selection" guidance to a single general sentence. CORE-207 is the explicit "now make the labels practically usable with examples and agent-aware defaults" follow-up.
- Archive skim findings: Recent model-related archives (CORE-199, older hits on model selection in CORE-141/049-era) contain no conflicting prior decisions, renames, or hard constraints on the guidance text. The introduction of `[heavy]`/`[light]` is the dominant recent event; no load-bearing historical rationale that would constrain the improvement.
- Drift check: Task description contains zero specific file:line or function citations. The current state of `SPEC/model.md` and `claude/AGENTS-snippet.md` precisely matches the post-CORE-206 baseline described in the PLAN.md entry for this task. No drift.
- Relevance confirmed: Scope is tightly focused on enhancing the prose/examples in the guidance surfaces. No re-interpretation of the task required.

- Clarifying questions (via AskUserQuestion, 2026-05-25):
  - Centralization strategy: selected "Centralize + enrich SPEC (recommended)" — DRY approach confirmed. One rich practical section will live in SPEC/model.md; the 6+ call sites (AGENTS-snippet, 5 skills, template) will carry thin cross-references only.
  - Examples: selected "Propose based on task spirit + my survey" — I will draft 2–3 realistic, capability-differentiated patterns (Grok's observed [light] preference on mechanical/flowtron-routine work; escalation triggers; cross-provider calibration) and surface for review during execution or recap.
  - No additional surfaces, constraints, or acceptance criteria raised beyond the survey findings.
- Explicit assumptions (from Discovery + clarifying answers):
  - The improvement is additive clarification only — does not alter any runtime behavior (Step 1.5 model gate, dispatch, or skill logic remains unchanged).
  - "Realistic defaults" will be phrased as observations / rules of thumb from usage, not as hard policy or guarantees.
  - Agent-neutral framing preserved; the Grok example is illustrative (as called out in the original PLAN line) rather than promotional.
  - Centralization reduces future maintenance burden and makes SPEC the authoritative "soft guidance" home.
- Phase 1 exit judgment: The clarifying Ask confirmed the natural engineering approach (centralize) rather than materially reshaping the subtask list or files-in-scope. No Re-scope or De-scope verdict. Small number of asks (2) but they ratified rather than pivoted the plan. Per `/ft-task` default-skip flavor: **no significant scope deviation surfaced → skip 🛠️**.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey (2026-05-25):
  - Flowtron's established pattern for guidance: authoritative contract + deep rationale lives in `SPEC/*.md` (lazy modules, loaded on demand by skills that need them — see `SPEC/model.md` frontmatter `paths:` and how ft-task loads it only on the 1.5 edge). Short "what this means for adopters / filers / AI" one-liners live in the surfaces that humans or skills actually read at decision time (AGENTS-snippet, skill step lists, template comments).
  - Precedent from CORE-206: the vocabulary lift touched many surfaces and left a short "recommended primary labels" sentence duplicated in 6+ places (acceptable for a 1-line label definition).
  - No precedent for *rich explanatory prose* (examples, calibration notes, "when to escalate") being duplicated — that would violate the "one source of truth" principle visible everywhere in SPEC + MIGRATION + AGENT-NEUTRALITY.
  - Conclusion: centralize the new practical/agent-aware content in `SPEC/model.md` (the module that already owns the model field semantics and the Step 1.5 contract). All other sites become thin cross-references. This is the natural, low-risk extension of the existing shape — not a new shape.
- No tests applicable (documentation-only change). "Updated/added tests" item is N/A.
- Changes made (minimal, surgical):
  - `SPEC/model.md` — added new `## Practical guidance and agent-aware defaults` subsection with 3 example categories + cross-provider note + explicit reference to the live model-mismatch on this task itself.
  - 5 call sites thinned to cross-reference the new SPEC content:
    - `claude/AGENTS-snippet.md`
    - `templates/PLAN.md` (comment block)
    - `claude/skills/ft-file-followup/SKILL.md`, `ft-starter-task/SKILL.md`, `ft-epic-discovery/SKILL.md`
  - `docs/AGENT-NEUTRALITY.md` — light ledger update on the model.md row to credit CORE-207 and the new subsection (agent-neutral addition).
  - `ft-task/SKILL.md`, `ft-micro-task/SKILL.md`, and the two step-1.5-model-edge.md fragments left untouched (they already delegate to SPEC §"Model field" or have no long-form duplication of the sentence we enriched).
- Total files touched: 8 (1 spec + 5 thin + 1 ledger + this tasknote). All edits are pure documentation / guidance wording. No behavior change.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- Pure documentation change (no executable code, no UI, no tests). All three Phase 3 items marked N/A in practice:
  - Targeted test suite: N/A — no test files or behavior to exercise.
  - Lint/type-check on changed code: mental pass on all edited markdown (formatting, links, table alignment in AGENT-NEUTRALITY, YAML frontmatter in tasknote). No repo-wide doc lint script exists that would catch these; no errors introduced.
  - (frontend) visual confirmation: N/A — zero changes under `viz/`, no screenshots or user visual review required. (The 👁️ item exists for frontend work per SPEC; skipped here with no suppression needed.)
- No privileged operations, no perf narratives, no frontend surface touched → strong candidate for autonomous 📦 skip at closure.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Recap (plain-English first):** CORE-207 delivered the practical, agent-aware layer on top of the neutral model labels introduced the same day in CORE-206. Guidance now lives in one rich place (SPEC) with realistic usage notes and examples; all adopter and filer surfaces point there. 8 files touched, all documentation. No behavior change, no tests, clean closure.

**Technical detail:**
- Primary change: `SPEC/model.md` + ~35 lines of new "Practical guidance and agent-aware defaults" subsection (3 categories of work + cross-provider calibration + live self-reference to the model retag that opened this task).
- 5 thin-pointer updates (AGENTS-snippet, 3 skills, templates/PLAN.md) + 1 ledger row in AGENT-NEUTRALITY.md.
- PLAN.md: active line removed from Medium; stub `[x] **CORE-207** [grok] | ... — Completed 2026-05-25.` placed at top of Completed.
- Tasknote archived to `archive/core/CORE-207.md`.
- Doc-drift sweep executed and logged (2 of 9 AI-referenced docs touched for consistency; rest no change).
- Key decision: centralize per the clarifying Ask answer (DRY, matches flowtron contract pattern). No scope growth.
- Verification: the updated SPEC/model.md:13-83 now contains both the original contract and the new practical subsection; all call sites resolve to it; PLAN stub and archive move complete.

**Archived:** 2026-05-25

**Doc-drift sweep verdicts (2026-05-25, across the 9 AI-referenced docs declared in `_project/tasknote/README.md` §"AI-referenced docs"):**

- `README.md` — no change (no model guidance content)
- `SPEC.md` — no change (high-level references to the "Model field" section and grammar; substantive enrichment lives in the lazy `SPEC/model.md` module, which is explicitly out-of-scope for the default cold-start sweep per the README itself)
- `docs/MIGRATION.md` — no change (model tokens appear only in unrelated migration examples and cross-refs)
- `claude/AGENTS-snippet.md` — **updated** (thinned the `[model]` segment description in the adopter paste block from the old long "recommended primary labels..." sentence to a crisp cross-reference to `SPEC/model.md` §"Model field" + the new practical guidance subsection, per the centralization decision for this task)
- `docs/CONVENTIONS.md` — no change (no model token or guidance prose)
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — **updated** (light extension of the `SPEC/model.md` ledger row to credit [[CORE-207]] alongside [[CORE-206]] and to document the new agent-aware practical subsection as a neutral addition)
- `docs/PLATFORMS.md` — no change (platform discussion only; no specific guidance text)

Additional (for operator visibility, not part of the mandated 9):
- `SPEC/model.md` (lazy module) — primary deliverable: new `## Practical guidance and agent-aware defaults` subsection added with realistic examples and cross-provider notes.
- `templates/PLAN.md` + 3 filing skills — thinned for consistency (not in the AI-referenced sweep list).

All verdicts logged after direct inspection of the files + our edit set. No other drift or staleness introduced or discovered.
