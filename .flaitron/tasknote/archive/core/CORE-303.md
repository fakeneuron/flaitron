---
title: fable-model-vocab
status: completed
tags: []
created: 2026-06-09
due:
related-tasks: []
---

# CORE-303 | fable-model-vocab

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add Anthropic's Fable 5 (`claude-fable-5`, new tier above Opus) to flowtron's model vocabulary: heavy-tier calibration baseline in SPEC/model.md, example concrete-token lists, ft-stats bucket decision, and viz ModelChip 🧠 + parser.ts tiering comment.

## ✅ Acceptance

- [x] `SPEC/model.md` heavy-tier calibration baseline names `fable` as the new top-tier concrete example (above `opus`)
- [x] Example concrete-token lists updated: SPEC.md §"Task-line format" table, GLOSSARY.md `[model]` entry, ft-task + ft-micro-task `step-1.5-model-edge.md` legacy-entry lists
- [x] `/ft-stats` buckets `fable` as its own named row alongside `opus`/`sonnet` (operator-confirmed decision)
- [x] viz `ModelChip` renders 🧠 for `fable` (in addition to `opus`); `parser.ts` tiering comment reflects the new top tier
- [x] viz tests + lint + typecheck pass

## 🧩 Subtasks

- [x] Update `SPEC/model.md` heavy-tier calibration baseline
- [x] Update SPEC.md task-line-format `[model]` row example names
- [x] Update GLOSSARY.md `[model]` entry example names
- [x] Update ft-task + ft-micro-task `step-1.5-model-edge.md` example token lists
- [x] Add `fable` bucket to ft-stats SKILL.md (rule, field enum, Section A table, always-shown note)
- [x] Update viz `ModelChip.tsx` (🧠 for `fable`) + `parser.ts` tiering comment; cover with a test
- [x] Run viz test / lint / typecheck

## 🔗 Related

- (none filed on the PLAN line)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Fable 5 (`claude-fable-5`) shipped after the last vocab sweep (CORE-240/259); flowtron's model vocabulary still tops out at `opus`. Mechanical multi-surface vocab addition, exactly as filed.

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Model facts verified against the claude-api reference (not memory): Fable 5 = `claude-fable-5`, new tier above Opus, 1M context. Short PLAN token: `fable` (matches the `opus`/`sonnet` short-name convention; full model IDs are never used as PLAN tokens).
- Archive skim: [[CORE-240]] (model-vocab-cascade) set the heavy/light primary-label vocabulary across SPEC.md + templates; [[CORE-256]] built the tier-ladder gate position-based (tier-count-agnostic); [[CORE-259]] added the `medium` rung with zero comparison-logic change; [[CORE-263]] set the ft-stats model buckets. Adding `fable` is a calibration-example + bucket addition — no ladder or gate-logic change.
- Drift check: all cited surfaces match — SPEC/model.md heavy baseline (~line 74), SPEC.md `[model]` table row (~line 157), GLOSSARY.md `[model]` entry (~line 63), both step-1.5 fragments' legacy-entry token lists, ft-stats SKILL.md bucket rule/table, viz `ModelChip.tsx` (🧠 keyed on `'opus'` only) + `parser.ts` tiering comment (lines 8–11, still says "Recommended set: 'opus' | 'sonnet'"). No drift.
- Clarification asked + answered: `[fable]` gets its **own named ft-stats bucket** alongside `opus`/`sonnet` (operator picked the recommended option).
- 🧠 next-move glyph and tier-ladder logic are untouched per [[CORE-256]]/[[CORE-259]] design — `fable` is heavy-tier by calibration prose, not a code change.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Followed the [[CORE-240]]/[[CORE-259]] vocab-cascade pattern: prose example additions only, no ladder/gate-logic changes. Token chosen: `fable` (short-name convention, matching `opus`/`sonnet`).
- Files: `SPEC/model.md` (heavy baseline), `SPEC.md` (`[model]` table row), `docs/GLOSSARY.md` (`[model]` entry), `claude/skills/ft-task/step-1.5-model-edge.md` + `claude/skills/ft-micro-task/step-1.5-model-edge.md` (legacy-entry token lists), `claude/skills/ft-stats/SKILL.md` (bucket rule + field enum + Section A row + always-shown note + render hint), `viz/src/ui/ModelChip.tsx` (🧠 for `fable`), `viz/src/parser.ts` (tiering comment).
- New test `viz/src/ui/ModelChip.test.tsx` (3 cases: opus 🧠, fable 🧠, sonnet → nothing) — per-component test-file pattern already established by `ProjectSelector.test.tsx` / `WikilinkMarkdown.test.tsx`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `npm --prefix viz run test` — 178/178 pass (14 files, includes the 3 new ModelChip cases).
- `npm --prefix viz run lint` + `run typecheck` — clean.
- 👁️ ask surfaced at the 📦 gate with the caveat that no `[fable]`-tagged PLAN row exists yet, so the chip has nothing to render visually; behavior covered by the unit test.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see SPEC/tasknote-selection.md §"`## Completed` archive convention") and tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Added Anthropic's Fable 5 to flowtron's model vocabulary as the new heavy-tier
concrete token `fable` (tier above `opus`): SPEC/model.md heavy calibration
baseline, concrete-token example lists (SPEC.md task-line table, GLOSSARY,
both step-1.5 fragments), a named `fable` /ft-stats bucket (operator-confirmed
over `other`), viz ModelChip 🧠 + parser.ts tiering comment, and the
AGENT-NEUTRALITY ledger row (doc-drift sweep). No tier-ladder or gate-logic
changes — calibration examples only, per the position-based design from
[[CORE-256]]/[[CORE-259]]. viz: 178/178 tests, lint + typecheck clean.

Doc-drift sweep: `docs/AGENT-NEUTRALITY.md` SPEC/model.md ledger row updated
(example set + CORE-303 citation); SPEC.md updated as task scope; all other
AI-referenced docs (README, MIGRATION, AGENTS-snippet, CONVENTIONS,
CONTRIBUTING, SECURITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT) — no change
(MIGRATION's `[opus]`/`[sonnet]` cross-walk examples and CAPABILITIES'
`/model opus` example remain valid tokens, not vocab claims).

**Archived:** 2026-06-10
