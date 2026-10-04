---
title: spec-model-grammar-anthropic-lock
status: completed
tags: []
created: 2026-05-22
due:
related-tasks: [CORE-132]
---

# CORE-138 | spec-model-grammar-anthropic-lock

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-132]]

## 🎯 Goal

Decide whether SPEC §"Model field" + `SPEC/model.md`'s `opus | sonnet` grammar should generalize to allow custom model tokens, or be explicitly documented as a flowtron-self / current-Anthropic-tiering convention, and apply the chosen fix.

## ✅ Acceptance

- [ ] `SPEC.md` §"Task-line format" row for `[model]` describes a recommended set (`opus | sonnet`) with adopters-may-substitute language; no `opus or sonnet only` lock
- [ ] `SPEC/model.md` grammar paragraph reframed: `[model]` is a short token, recommended set is `opus | sonnet` (flowtron's convention mirroring current Anthropic tiering), adopters MAY substitute their own tokens; opus-for-design / sonnet-for-mechanical recommendation preserved as flowtron-self default
- [ ] `viz/src/parser.ts` — `TaskModel = string`; `TASK_LINE` regex capture loosened from `(opus|sonnet)` to `([a-z][\w.-]*)`; legacy entries still parse
- [ ] `viz/src/parser.test.ts` — existing "rejects unknown model values" test flipped to "accepts any short token shape"; rejected-shape edge cases (empty `[]`, leading uppercase, leading digit) covered
- [ ] `claude/skills/ft-stats/SKILL.md` — Section A model-distribution bucketing distinguishes `opus` / `sonnet` / `other` (present-but-unknown) / `legacy` (absent); `[<model>]` description loosened
- [ ] `templates/PLAN.md` rule-comment generalized to remove the `(opus | sonnet)` enum
- [ ] Viz tests + typecheck + lint clean
- [ ] Follow-up filed: bundled-SKILL prompts (ft-task / ft-micro-task step-1.5 default, audit-family ticket-line examples, etc.) — decide whether to generalize or keep as flowtron-self defaults

## 🧩 Subtasks

- [ ] SPEC.md:142 task-line-format row — generalize `[model]` description
- [ ] SPEC/model.md — rewrite opening paragraph (line 9) for generalized grammar; preserve recommendation block (lines 29-30) as flowtron-self default convention
- [ ] viz/src/parser.ts — `TaskModel` → `string`; loosen `TASK_LINE` regex `(opus|sonnet)` → `([a-z][\w.-]*)`
- [ ] viz/src/parser.test.ts — flip the "rejects unknown" test; add reject-cases for invalid shapes (`[]`, `[Opus]`, `[3x]`)
- [ ] claude/skills/ft-stats/SKILL.md:44 + Section A table — add `other` bucket alongside `opus`/`sonnet`/`legacy`
- [ ] templates/PLAN.md:36 rule-comment — generalize the `(opus | sonnet)` parenthetical
- [ ] Run `npm test --prefix viz` + `npm run typecheck --prefix viz` + `npm run lint --prefix viz`
- [ ] File follow-up: `/ft-file-followup CORE-141` for bundled-SKILL prompts decision
- [ ] Phase 4 closure (doc-drift sweep · PLAN.md flip · archive · recap)

## 🔗 Related

- [[CORE-132]] — parent audit (Finding #4.1, Medium) that surfaced this task

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Finding #4.1 from CORE-132 (Medium) is the largest of the 8 user-flavored-audit tickets and the only one with runtime ripple beyond pure SPEC prose. The lock is real and adopter-facing: viz/src/parser.ts:42 enum-validates the capture group `(opus|sonnet)`, so a PLAN.md line with `[haiku]` or `[gpt-5]` silently drops the model field to `undefined`. SPEC.md:142 + SPEC/model.md:9 mirror the lock. Generalizing is additive (legacy entries keep parsing) and unblocks adopters on Haiku / GPT / Gemini / local models without forcing them to fork SPEC.

- [x] Read relevant source files — SPEC.md (§"Task-line format" + §"Model field"), SPEC/model.md, viz/src/parser.ts, viz/src/parser.test.ts, viz/src/ui/ModelChip.tsx, viz/src/ui/TaskRowInner.tsx, claude/skills/ft-stats/SKILL.md, templates/PLAN.md.
- [x] **Archive skim** — `_project/tasknote/archive/core/` skimmed for prior tasknotes on `[model]` grammar:
  - [[CORE-023]] (2026-05-02) — original task that introduced the `[model]` segment + the viz parser regex + retired the YAML `model:` field; established `opus | sonnet` as the literal grammar. This task opens that lock without breaking the source-of-truth shift CORE-023 landed.
  - [[CORE-058]] (2026-05-09) — task-skill early model-switch catch; refined the Step 1.5 model-gate flow. Unaffected — gate logic is string-comparison, not enum-validation.
  - [[CORE-064]] (2026-05-09) — equalize step-1.5 fragments across ft-task / ft-micro-task. The AskUserQuestion prompt at step-1.5-model-edge.md:16 hardcodes `opus or sonnet` — confirmed in scope of the deferred follow-up (CORE-141), not this task.
  - [[CORE-122]] (2026-05-20) — most recent model-field touch; reframed `docs/PHILOSOPHY.md`'s model-field history. Doesn't conflict.
  - No prior tasknote opened the grammar lock.
- [x] **Drift check** — all cited paths/lines current at HEAD 2026-05-22: SPEC.md:142 reads `opus or sonnet only`; SPEC/model.md:9 reads `(opus | sonnet)`; viz/src/parser.ts:8 declares `TaskModel = 'opus' | 'sonnet'`; viz/src/parser.ts:42 regex captures `(opus|sonnet)`; viz/src/parser.test.ts:151 has the negative-case test for `[haiku]`; ft-stats SKILL.md:44 + 60 bucket as `opus | sonnet | legacy`; templates/PLAN.md:36 cites `(opus | sonnet)`. No drift.
- [x] Asked clarifying questions — three resolved via AskUserQuestion: Q1 → **Generalize with recommended set** (additive: keeps `opus | sonnet` as flowtron's recommended convention, opens grammar to adopter tokens); Q2 → **SPEC + viz + ft-stats only** (~6 files; defer SKILL prompt decision to follow-up); Q3 → **No version bump** (next /ft-release task picks it up).
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Locked design

**Grammar (SPEC contract):** `[model]` is a short token. Recommended set: `opus | sonnet` (flowtron's default convention, mirroring current Anthropic tiering). Adopters MAY substitute project-specific tokens (e.g., `haiku`, `gpt-5`, `gemini-pro`, `llama-3.3`). Downstream tooling treats unknown tokens as an `other` bucket; absent `[model]` stays `legacy`.

**Regex shape:** `[a-z][\w.-]*` — starts lowercase, allows letters/digits/underscore/hyphen/dot. Rejects `[]`, `[Opus]`, `[3x]` defensively (typo guard).

**ModelChip rendering:** unchanged from existing behavior — `TaskRowInner.tsx:42` already hardcodes `task.model === 'opus'` for chip visibility, so non-opus tokens (`sonnet`, `haiku`, anything) stay invisible. No visual regression risk for opus/sonnet rows. (Whether the chip should branch on other tokens is its own UX decision, out of scope here.)

**ft-stats bucketing:** Section A table grows a fourth row `other` between `sonnet` and `legacy`:
- `opus` — present and literal `opus`
- `sonnet` — present and literal `sonnet`
- `other` — present, valid grammar, but not in the recommended set (e.g., `[haiku]`, `[gpt-5]`)
- `legacy` — absent `[model]` tag entirely

Both `other` and `legacy` follow the existing "omit if 0 in both windows" rule.

### Scope guardrails

**In scope (this task):** SPEC.md:142 · SPEC/model.md:9 · viz/src/parser.ts (type + regex) · viz/src/parser.test.ts (flip + new edges) · claude/skills/ft-stats/SKILL.md (bucketing) · templates/PLAN.md:36 (rule-comment).

**Out of scope (follow-up CORE-141):** ~14 SKILL/template references that hardcode `opus | sonnet` in prompts and example task-lines (`ft-task`/`ft-micro-task`/`ft-starter-task`/`ft-file-followup`/`ft-epic-discovery`/`ft-close-epic`/`ft-release`/`ft-audit` family ×5 / `AGENTS-snippet.md`). These are flowtron's recommended convention for users on Anthropic models, not the contract grammar — opening them or keeping them as defaults is a separate UX decision worth its own ticket.

**No version bump.** Next `/ft-release` picks up this change in its batch.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extending the existing single-regex `TASK_LINE` shape (CORE-023 precedent), the existing describe/it shape in `parser.test.ts`, and the existing Section A table in `ft-stats` SKILL. No new shapes invented.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Files changed (6):

- `SPEC.md` — §"Task-line format" `[model]` row generalized: recommended set is `opus | sonnet` (flowtron's default convention, mirroring current Anthropic tiering); adopters MAY substitute project-specific tokens; downstream tooling buckets unknown tokens as `other`. Lock language (`opus or sonnet only`) removed.
- `SPEC/model.md` — opening paragraph reframed: model assignment is a short token; recommended set `opus | sonnet` is flowtron-self default; visualizer parser accepts `[a-z][\w.-]*`; `/ft-stats` buckets unknown tokens as `other`. Recommendation block (opus-for-design / sonnet-for-mechanical) preserved as flowtron-self default convention.
- `viz/src/parser.ts` — `TaskModel = string` (with documenting comment); `TASK_LINE` regex `[model]` capture loosened from `(opus|sonnet)` to `([a-z][\w.-]*)`. The cast `as TaskModel | undefined` at line 183 stays semantically correct (now a no-op since `TaskModel = string`).
- `viz/src/parser.test.ts` — flipped the "rejects unknown model values" test to "accepts adopter model tokens beyond opus|sonnet" (covers `haiku`, `gpt-5`, `gemini-pro`). Added "silently skips lines with malformed model-token shapes" preserving the typo-guard semantic (covers empty `[]`, leading uppercase `[Opus]`, leading digit `[3x]`). +2 tests net.
- `claude/skills/ft-stats/SKILL.md` — Section A Model distribution table gains an `other` bucket between `sonnet` and `legacy`; Step 1 parse rule clarified (`opus`/`sonnet` keep their own buckets; any other token → `other`; absent → `legacy`); per-field-table model values list updated. Omit-if-zero rule extended to cover both `other` and `legacy`.
- `templates/PLAN.md` — rule-comment `(opus | sonnet)` parenthetical generalized to "recommended: `opus` | `sonnet`; adopters MAY substitute other tokens — see SPEC §"Task-line format"".

Filed mid-flow follow-up: `CORE-141` [sonnet] | skill-prompts-model-tokens-generalize — defers the ~14 SKILL/template prompt hardcodings (ft-task/ft-micro-task step-1.5 default, ft-starter-task/ft-file-followup/ft-epic-discovery model fields, ft-audit-family ticket-line examples, AGENTS-snippet, command stubs) to a separate decision since they're flowtron's recommended convention for users on Anthropic models, not the contract grammar.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm test --prefix viz`: 163/163 pass (was 161 → +2 net for the new grammar coverage).
- [x] Ran lint/type-check on changed code — `npm run typecheck --prefix viz`: clean. `npm run lint --prefix viz`: clean.
- [x] (frontend) N/A — viz UI rendering is unaffected by this change. `TaskRowInner.tsx:42` already hardcodes `task.model === 'opus'` for chip visibility, so non-opus tokens (sonnet/haiku/anything) continue to render no chip — same behavior as before, no visual regression on opus/sonnet rows.

**Testing Notes:**

Verification per CORE-023 precedent:

1. **Test deltas:** the negative-case test at `parser.test.ts:151` (asserting `[haiku]` causes silent skip) flipped to a positive-case test (asserting `[haiku]`, `[gpt-5]`, `[gemini-pro]` parse with their token as `model`). Added complementary test for invalid shapes (`[]`, `[Opus]`, `[3x]`) preserving the prior typo-guard behavior (silent line skip).
2. **Regex backtracking sanity:** the `[model]` capture sits inside `(?:\s+\[(...)\])?`. When the inner shape fails (e.g., `[Opus]`), the optional group skips — but the rest of the line still carries `[Opus] — desc`, so the whole TASK_LINE regex fails to match `\s*$`. Result: line is silently dropped. Matches the prior typo-guard behavior of the old enum.
3. **ModelChip rendering unchanged:** `viz/src/ui/TaskRowInner.tsx:42` reads `task.model === 'opus'` literally; non-opus tokens (sonnet, haiku, anything) render no chip. Pre-existing behavior, not in scope here.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see results below
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-22.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces behind the 📦 ready-to-commit gate; signal fired on viz/ frontend files)

**Doc-drift sweep results:**

- `README.md` — **no change** (no model-grammar mentions).
- `SPEC.md` — **updated** (this task's primary edit: §"Task-line format" `[model]` row generalized).
- `docs/MIGRATION.md` — **no change** (line 31 generic `[model] distribution` description; lines 244-245 are stack-neutral grammar examples covered separately by CORE-136).
- `claude/AGENTS-snippet.md` — **no change** (line 19's `opus / sonnet` framing deferred to CORE-141 per scope decision; still accurate as the recommended set).
- `docs/CONVENTIONS.md` — **no change** (no model-grammar mentions).
- `CONTRIBUTING.md` — **no change** (no model-grammar mentions).
- `SECURITY.md` — **no change** (no model-grammar mentions).

**Final Summary:**

Generalized the PLAN.md `[model]` grammar lock surfaced by CORE-132 Finding #4.1 (Medium). The SPEC contract previously enumerated `opus | sonnet` as the only valid tokens — viz/parser.ts:42 enum-validated the capture group, silently dropping unknown tokens like `[haiku]` or `[gpt-5]` to `undefined` and preventing adopters on non-Anthropic models (or Anthropic Haiku tier) from using the grammar position without forking SPEC. CORE-138 opens the grammar to any short lowercase token (`[a-z][\w.-]*`) while preserving `opus | sonnet` as flowtron's recommended convention; additive change with no breaking impact on legacy entries. **Files (6):** SPEC.md §"Task-line format" `[model]` row reframed (recommended set + adopters-may-substitute language); SPEC/model.md opening paragraph rewritten (grammar generalized; opus-for-design / sonnet-for-mechanical recommendation preserved as flowtron-self default); viz/src/parser.ts (`TaskModel = string`; regex capture loosened from `(opus|sonnet)` to `([a-z][\w.-]*)`); viz/src/parser.test.ts (flipped negative-case test to positive `accepts adopter tokens`, added defensive `silently skips malformed shapes` test preserving prior typo-guard behavior; +2 tests net); claude/skills/ft-stats/SKILL.md (Section A Model distribution table gains an `other` bucket for unknown tokens; bucketing rule + per-field table updated; omit-if-zero extended); templates/PLAN.md (rule-comment `(opus | sonnet)` parenthetical generalized). **Verification:** `npm test --prefix viz` 163/163 pass (+2 net), `npm run typecheck --prefix viz` clean, `npm run lint --prefix viz` clean. **Scope guardrail:** the ~14 SKILL/template prompt references that hardcode `opus | sonnet` (ft-task / ft-micro-task step-1.5 default, ft-starter-task / ft-file-followup / ft-epic-discovery model fields, ft-audit-family ticket-line examples, AGENTS-snippet, command stubs) were deferred to a follow-up — CORE-141 filed under `## Low` for that decision. **No version bump:** next `/ft-release` task picks this up alongside its batch.

**Archived:** 2026-05-22
