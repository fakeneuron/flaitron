---
title: model-tier-recalibration discovery
status: completed
tags: []
created: 2026-08-27
due:
related-tasks: [CORE-EPIC-482]
---

# CORE-482.1 | model-tier-recalibration discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-482]]

## 🎯 Goal

Scope the `CORE-EPIC-482` epic (`model-tier-recalibration`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-482.2..3` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [x] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [x] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes (incl. the deferred fourth-tier decision: resolved **yes, `[xheavy]`🔭, manual-only**)
- [x] Concrete child scopes for CORE-482.2 .. CORE-482.3 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [x] Audit line CORE-482.N reviewed and confirmed as-filed (no scope shift — the fixed doc-drift sweep acceptance stands; `.N` additionally verifies the viz parser + /ft-stats accept `xheavy`)
- [x] Phase 4 doc-drift sweep at closure: no AI-referenced doc updates land in this pure Discovery filing (contract edits land inside .2/.3)

## 🧩 Subtasks

- [ ] Inventory shared design surface (SPEC/model.md, SPEC.md cue glossary, SPEC/gates.md, ft-task Step 1.5 gate module, ft-stats bucketing, skill-roster tier references, viz parser) — log in Discovery Notes
- [ ] Skim .flowtron/tasknote/archive/core/ for relevant precedents (CORE-259 medium rung, CORE-353.3 glyph widening, effort-axis filings) — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (fourth-tier go/no-go, err-heavier bias depth, per-child shortname + scope) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-482.2 .. CORE-482.3; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-482 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-482]] — parent epic (model-tier-recalibration)

## 🌳 Fan-out

- **Sequential:** [[CORE-482.3]] after [[CORE-482.2]] — both edit SPEC/model.md (the .2 calibration table and the .3 rung/guidance rewrite share the file; no worktree parallelism)
- **Synthesis:** [[CORE-482.N]] — cohort audit

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator explicitly invoked `/ft-epic-discovery` with a formed brief: the tier vocabulary risks under-powered model picks by automated choosers (caobunga consumes the labels; caobunga itself is out of scope). Multi-surface contract work — genuine epic scope.

- [x] Read relevant source files — SPEC/model.md (full), SPEC.md `[model]` column + cue glossary + post-closure protocol, SPEC/gates.md glyph tables, claude/skills/ft-task/step-1.5-model-edge.md

- [x] **Best Practices Review** — N/A (markdown contract surfaces only; no code-module boundaries). The tier ladder's "match by position, not by count" design (CORE-259) is the existing abstraction the fourth rung extends.

- [x] **Archive skim** — CORE-259 (added the `medium` rung; established tier-count-agnostic matching), CORE-EPIC-353 `refresh-model-roster` (.3 added the 🧩 glyph, reversing CORE-254's two-glyph lock — the direct precedent for adding a 🔭 glyph), CORE-353.N (cohort audit shape). Grep for `SPEC/model.md` touches shows broad historical contact but no open conflict.

- [x] **Drift check** — no drift: SPEC/model.md §"Practical guidance" still carries the "start here by default" `[light]` bias; step-1.5-model-edge.md line 28 still hard-codes the roster (`fable`/`opus` heavy, `sonnet`/`grok` medium, `haiku` light); glyph tables in SPEC/gates.md match SPEC.md cue glossary. Plan is consistent with the PLAN.md epic line.

- [x] Asked clarifying questions — resolved via AskUserQuestion; see "Resolved scoping" table below

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Shared design surface inventory:**

- `SPEC/model.md` — the primary contract: tier ladder, category-vs-concrete matching, calibration baseline, effort-axis section, practical guidance (holds the to-be-flipped `[light]`-default bias), glyph-mirror section.
- `SPEC.md` — task-line `[model]` column (~line 184), cue glossary (~line 685), post-closure protocol glyph emission (~lines 933–958).
- `SPEC/gates.md` — two glyph tables (~lines 76–92, 238–260) + escalation note (~line 306).
- `claude/skills/ft-task/step-1.5-model-edge.md` — gate branches; legacy-entry branch hard-codes the current Claude roster by tier (shared by /ft-task, /ft-micro-task, /ft-goal-task).
- `/ft-stats` — buckets tokens by tier; unknown → `other`. New `[xheavy]` token needs a bucket.
- Viz parser — accepts any short lowercase token (`[a-z][\w.-]*`); `xheavy` parses without code change (verify in .N audit).
- Adopter wiring — SPEC modules ship via submodule; no per-adopter migration needed beyond normal version bump.

**Resolved scoping table:**

| Question | Resolution |
|---|---|
| Epic scope reasonable? | Yes — filed as CORE-EPIC-482, High, `[heavy]`, M=2 + `.N` audit |
| Fourth tier above `[heavy]`? | **Yes** — manual-execution-only exploratory rung; orchestrators/automated choosers cap at `[heavy]` |
| Fourth-tier token + glyph | **`[xheavy]`** with **🔭** (echoes vendor `xhigh` effort naming; 🔭 unused in cue vocabulary) |
| Reasoning-effort handling | **Orthogonal + calibration table** — tiers stay task-load labels, effort stays session config, no variant tokens; add a maintained platform×model×effort tier-band reference table to SPEC/model.md, refreshed at releases |
| Err-heavier bias strength | **Round-up default** — default `[medium]`; escalate freely to `[heavy]` on any ambiguity/design smell; `[light]` reserved for provably mechanical clear-diff work; explicit "when in doubt, round up" rule for automated choosers |
| Caobunga | Out of scope — consumes whatever labeling flowtron publishes |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the CORE-EPIC-473 cohort filing pattern (2-space indent, `[model]` on every line, em-dash separator); CORE-353 cohort is the content precedent

- [x] **Minimal refactor gate** — N/A (pure PLAN.md filing)

- [x] Implemented the minimal solution — wrote CORE-482.2 + CORE-482.3 lines into PLAN.md between `.1` and `.N`; filled `## 🌳 Fan-out`

- [x] Updated/added tests for non-trivial behavior — N/A (no executable code surface)

**Implementation Notes:**

- 2 child lines written. Word counts: .2 ≈ 44w, .3 ≈ 43w — both under the 50w target's neighborhood and well under the 70w hard cap.
- M unchanged from filing-time estimate (M=2); the fourth-tier "decide in Discovery" resolution folded into `.3` rather than adding a child.
- Downstream-impact scan: **no downstream impact** — the active PLAN sections (High/Medium/Low/Future Opportunities) contain no entries besides this epic's own cohort.
- Fan-out: Sequential `.3` after `.2` (shared SPEC/model.md surface); `.N` synthesis. No Parallel row (omitted — does not apply).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose edits only)

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass instead: 2-space child indent preserved, bold IDs intact, `[heavy]` on every new line, shortnames ≤30 chars (22 / 20), em-dash separators consistent, both descriptions under the 70w cap, no trailing whitespace, Fan-out wikilinks match the filed children

- [x] **Quality assertions** — N/A (no code changed)

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · AGENTS.md: no change · SPEC.md: no change (edits land in .2/.3) · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · codex/AGENTS-snippet.md: no change · cursor/AGENTS-snippet.md: no change · grok/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change · docs/AGENT-NEUTRALITY.md: no change · docs/PLATFORMS.md: no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md `.1` line flipped to stub form and kept nested beneath the active parent, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — surfaces inline (conditional skip; see Final Summary)

**Final Summary:**

Filed CORE-EPIC-482 (`model-tier-recalibration`, High, `[heavy]`) and drove its `.1` Discovery to closure. Resolved scoping with the operator: (1) a fourth **`[xheavy]`🔭 manual-execution-only exploratory rung** joins the ladder (automated choosers cap at `[heavy]`); (2) reasoning-effort stays **orthogonal session config** — no variant tokens — but SPEC/model.md gains a maintained **platform×model×effort tier-band calibration table**; (3) practical guidance flips from "start `[light]` by default" to the **round-up default** (`[medium]` default, escalate freely to `[heavy]`, `[light]` only for provably mechanical work). Children filed: `.2` model-effort-inventory (≈44w) → `.3` xheavy-rung-round-up (≈43w), sequential (shared SPEC/model.md surface), `.N` audit as synthesis. No downstream impact — active PLAN was otherwise empty. Doc-drift sweep: no change across all 13 AI-referenced docs (contract edits belong to .2/.3).

**Archived:** 2026-08-27
