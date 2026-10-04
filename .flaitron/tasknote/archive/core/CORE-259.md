---
title: model-tier-third-rung
status: completed
tags: []
created: 2026-06-01
related-tasks: [CORE-256, CORE-206, CORE-240]
---

# CORE-259 | model-tier-third-rung

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-256]]

## 🎯 Goal

Explore whether flowtron should add a 3rd model-cognition tier between `light`
and `heavy` in the `[model]` category ladder — and if so, name it, define its
meaning, and cascade the vocabulary — or conclude with a reasoned keep-2-tiers
decision.

## ✅ Acceptance

- [ ] A clear verdict recorded: add a concrete 3rd tier, or keep 2 tiers (reasoned)
- [ ] If add: tier name + one-line meaning defined; ladder ordering fixed
- [ ] If add: cascade applied across the *actually-affected* surfaces (see Discovery ripple audit)
- [ ] If keep-2: rationale documented so the question doesn't re-open without new evidence
- [ ] Doc-drift sweep recorded for every entry in `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Design locked: tier name `medium`; ladder `light < medium < heavy`; calibration heavy=opus/GPT-5.5 · medium=sonnet,grok · light=haiku-class
- [ ] `SPEC/model.md` — ladder line + rewrite the "two tiers / not pre-built" note; add `medium` to the calibration baseline (move sonnet/grok to medium); fix grok "light-tier" wording in the gate bullet + match-table example; add a `[medium]` block to Practical guidance; add the next-move-glyph-stays-binary note
- [ ] `SPEC.md` §"Task-line format" — add `[medium]` to the recommended primary labels
- [ ] `claude/skills/ft-task/SKILL.md` — Step 1.5 parenthetical + Step 6 next-move medium→nearest-glyph note
- [ ] `claude/skills/ft-task/step-1.5-model-edge.md` — parentheticals + reconcile grok "light-tier" wording in the under-tier branch
- [ ] `templates/PLAN.md` — add a `[medium]` example line + fix the HTML-comment grok-`[light]` wording
- [ ] Phase 3 verification: doc-integrity grep (ladder anchors, no stale "two tiers", parser still parses `[medium]`)
- [ ] Phase 4: doc-drift sweep + PLAN.md flip + archive

**De-scoped (documented):** `viz/src/parser.ts` (already tier-agnostic — `[medium]` parses unchanged); `/ft-stats` named buckets (category labels all bucket as `other` today — a pre-existing gap, optional follow-up); a 3rd next-move glyph (keep binary 🔧/🧠 — avoid widening CORE-254's locked cue vocabulary).

## 🔗 Related

- [[CORE-256]] — defined the tier-count-agnostic ladder rule (`light < heavy`) and explicitly deferred the 3rd-rung vocabulary expansion to this task
- [[CORE-206]] — introduced the neutral `[heavy]`/`[light]` primary labels
- [[CORE-240]] — cascaded the vocabulary into SPEC.md + templates

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed — add a concrete `[medium]` tier (operator decision via
  AskUserQuestion).
  **Rationale:** This is an *Explore* task; the operator chose to add the middle
  rung now (`light < medium < heavy`) rather than keep two tiers. The gate
  matching is already tier-count-agnostic (CORE-256), so the change is
  pure-vocabulary.

- [x] Read relevant source files — `SPEC/model.md`, `SPEC.md` §"Task-line format"+§"Model field", `viz/src/parser.ts`, `claude/skills/ft-stats/SKILL.md`, `templates/PLAN.md`, `templates/tasknote-template.md`

- [x] **Archive skim** — read `archive/core/CORE-256.md` (direct parent). CORE-256 deliberately shipped `light < heavy` with a **tier-count-agnostic** rule "so a future middle tier slots in without changing the matching logic … a 3rd-rung expansion is tracked separately, not pre-built here." The matching logic therefore needs **no** change to support a 3rd tier — only vocabulary. CORE-206/CORE-240 introduced + cascaded the neutral labels.

- [x] **Drift check** — the PLAN line's cited ripple list is partly inaccurate (logged below). Verified at HEAD.

- [x] Asked clarifying questions — operator chose "Add [medium] now" (ladder `light < medium < heavy`)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Ripple-list audit (drift finding).** The PLAN line claims the change "would
ripple through `SPEC/model.md` vocabulary, `viz/src/parser.ts`, `/ft-stats`
buckets, SPEC task-line grammar, and templates." Verified against HEAD:

| Cited surface | Actual ripple |
|---|---|
| `SPEC/model.md` vocabulary | **Yes** — the tier ladder + model→tier calibration live here |
| `viz/src/parser.ts` | **No** — `TaskModel = string`; regex `[a-z][\w.-]*` accepts any token. A `[medium]` tag parses today with zero code change |
| `/ft-stats` buckets | **Minimal/pre-existing gap** — only `opus`/`sonnet` get named buckets; `heavy`/`light` *already* fall to `other`. A 3rd tier doesn't worsen this; the real gap (category labels unbucketed) predates 259 |
| SPEC task-line grammar (SPEC.md line 145) | **Yes, light** — one table-cell sentence lists `[heavy]`/`[light]` as recommended labels |
| templates | **Minor** — `templates/PLAN.md` lines 12-13/38 carry `[heavy]`/`[light]` examples; `tasknote-template.md` has no model labels |

Net: the *matching logic* is already tier-count-agnostic (CORE-256). Adding a
tier is a **pure-vocabulary** change touching `SPEC/model.md` + a couple of
doc/template example lines — far smaller than the PLAN line implies, and with
no executable/parser surface.

**Conceptual tension to resolve with the operator.** The category labels
describe **task cognitive load** (`light`/`heavy` task shape), but the same
ladder is reused for **model capability self-assessment** (model→tier). The
PLAN line's motivation ("grok-class sits below opus/GPT-5.5 deep-reasoning yet
above purely mechanical work") is a *model-capability* observation — yet
CORE-256 already deliberately calibrated grok as **light-tier** for the gate.
So a 3rd rung conflates two axes:
- a 3rd **task-complexity** bucket (where is the medium/heavy line? inherently fuzzy), and
- a 3rd **model-capability** band (mid-models between mechanical-only and deep-reasoning).

**Design forks for the operator (Phase 1 clarifying question):** add a concrete
`[medium]` tier now vs. keep 2 tiers with a documented rationale. Flowtron has
a strong minimalism + reject-scope-creep posture (SPEC §"What flowtron does NOT
provide"; CORE-251/252), and the rule is *already* future-proofed — so
keep-2-with-rationale is a fully legitimate, arguably default, outcome.

**Operator decision (AskUserQuestion):** **Add `[medium]` now.** Ladder
`light < medium < heavy`. Calibration: heavy=opus/GPT-5.5-class · medium=sonnet,
grok · light=haiku-class/fast-mechanical.

**Mid-flow sub-decision (surfaced, defaulted):** the next-move suggestion glyph
is a **binary** design-vs-mechanical cue (🔧 `LIGHT` / 🧠 `HEAVY`) registered in
CORE-254's locked cue vocabulary (SPEC.md cue glossary + `SPEC/gates.md`). A 3rd
*task tier* doesn't map onto a 2-glyph binary. **Decision: keep the glyph binary
— a `[medium]` candidate takes the nearer glyph at suggestion time.** No 3rd
glyph, no new glossary row (mirrors how CORE-256 kept ⚠️ off the glossary to
avoid widening CORE-254's vocabulary). The tier ladder governs the *gate*; the
suggestion glyph stays a coarse design/mechanical hint.

**Exit-gate judgment (`default-skip` flavor):** Discovery surfaced a significant
design fork → resolved directly by the operator's AskUserQuestion answer, which
*is* the 🛠️ go for the add-`[medium]` approach. The new glyph sub-decision is
surfaced with a strong minimal default. The approach is operator-authorized →
proceed to Phase 2 (no separate 🛠️ banner needed).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing shapes: the ladder stays a `light < … < heavy` ordered-position rule (CORE-256); the `[medium]` block mirrors the existing `[light]`/`[heavy]` Practical-guidance blocks; the next-move-glyph note follows CORE-256's precedent of keeping a non-gate signal out of the locked cue glossary. No new operator-gate vocabulary.

- [x] Implemented the minimal solution — pure-vocabulary, 11 files:
  - `SPEC/model.md` — ladder → `light < medium < heavy`; rewrote the "two tiers / not pre-built" note; added the `medium` calibration band (moved sonnet/grok to medium); fixed grok "light-tier" wording in the gate bullet + match-table; added a `[medium]` Practical-guidance block; added a "Tier ladder vs. next-move suggestion glyph" note.
  - `SPEC.md` §"Task-line format" — `[medium]` added to recommended primary labels.
  - `claude/skills/ft-task/SKILL.md` — Step 1.5 parenthetical + Step 6 next-move medium→nearest-glyph note.
  - `claude/skills/ft-task/step-1.5-model-edge.md` — parentheticals + reconciled grok "light-tier" wording; legacy-entry labels gained `[medium]`.
  - `claude/skills/ft-{epic-discovery,starter-task,file-followup}/SKILL.md` — the three filing skills' stale grok-`[light]` realistic-default hint → medium calibration.
  - `templates/PLAN.md` — `[medium]` example line + HTML-comment grok wording.
  - Doc-drift (Phase 4 sweep): `claude/CAPABILITIES.md`, `claude/AGENTS-snippet.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`.

- [x] Updated/added tests for non-trivial behavior — N/A (markdown contract + skill docs; no executable surface). The only code consumer is `viz/src/parser.ts`, which is already tier-agnostic (`TaskModel = string`; regex `[a-z][\w.-]*`) — verified `[medium]` parses with zero change.

**Implementation Notes:**

- **No parser change** — confirmed the description's claim of a `viz/src/parser.ts` ripple was inaccurate (drift finding). `[medium]` parses today.
- **Next-move glyph kept binary** — deliberate: a 3rd tier on a binary design/mechanical cue would widen CORE-254's locked vocabulary. `[medium]` → nearer glyph. Documented in `SPEC/model.md`.
- **`/ft-stats` deliberately untouched** — category labels (`heavy`/`light`/`medium`) all bucket as `other` today; that pre-existing gap is a separate concern, not introduced by the 3rd rung.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no executable surface). Confirmed the parser regex token class accepts `medium` via a one-liner node check.

- [x] Ran lint/type-check on changed code — N/A (markdown only). Ran a doc-integrity sweep instead: zero stale `light < heavy` / "two tiers" / "not pre-built" / grok-"light-tier" / grok-`[light]`-default leftovers across `*.md`+`*.ts` (excl. archive + this tasknote + the historical PLAN line); the new `light < medium < heavy` ladder + `[medium]` label present in SPEC.md, SPEC/model.md, templates/PLAN.md.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Verification gates (substituting for automated tests): doc-integrity grep (clean) + parser token-class check (`[medium]` → `"medium"`).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip — diff is markdown/skill-doc only; signals clear)

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | no change — no model-label enumeration |
| `SPEC.md` | **updated** — §"Task-line format" recommended-labels cell gained `[medium]` (this is a primary contract surface, edited in Phase 2) |
| `docs/MIGRATION.md` | no change — no label enumeration |
| `claude/AGENTS-snippet.md` | **updated** — stale grok-`[light]` realistic-default → mid-tier `[medium]` calibration |
| `docs/CONVENTIONS.md` | no change |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | **updated** — two ledger rows' label enumerations gained `[medium]`; grok-`[light]` note → Grok/Sonnet medium-tier; +[[CORE-259]] cites |
| `docs/PLATFORMS.md` | **updated** — two Grok-wiring rows' `[heavy]`/`[light]` token enumerations gained `[medium]` (grok-3/grok-4 session mapping prose left intact) |
| `claude/CAPABILITIES.md` | **updated** — effort/thinking row + neutrality-ledger bullet gained `[medium]`; the `/model` row's binary suggestion glyph (`[heavy]🧠`/`[light]🔧`) left intact (binary by design) |
| `docs/AGENT-COMPAT.md` | no change |

**Final Summary:**

Added a concrete middle tier `[medium]` to the model-cognition ladder
(`light < medium < heavy`), resolving CORE-256's deferred 3rd-rung follow-up.
Because CORE-256 built the Step 1.5 gate to read the ladder by position not
count, this was a **pure-vocabulary** change with zero gate-logic and zero
parser change. `[medium]` = moderate, multi-step but well-scoped work;
calibration recalibrates capable mid-tier models (`sonnet`, `grok`) from
light to medium, with `heavy` reserved for deep-reasoning models (`opus`,
GPT-5.5-class) and `light` for fast mechanical models (`haiku`-class).

Technical detail:
- **Vocabulary core:** `SPEC/model.md` (ladder, calibration band, Practical-guidance block, glyph-vs-ladder note), `SPEC.md` §"Task-line format", `templates/PLAN.md`.
- **Skill consistency:** `ft-task` SKILL + step-1.5 fragment; the three filing skills (`ft-epic-discovery`/`ft-starter-task`/`ft-file-followup`) lost the stale grok-`[light]` hint.
- **Doc-drift sweep:** `CAPABILITIES.md`, `AGENTS-snippet.md`, `AGENT-NEUTRALITY.md`, `PLATFORMS.md`.
- **Design decisions:** (1) next-move suggestion glyph stays binary 🔧/🧠 — `[medium]` takes the nearer glyph, no glossary widening; (2) `viz/src/parser.ts` untouched (already tier-agnostic — corrects the PLAN line's inaccurate ripple claim); (3) `/ft-stats` named buckets untouched (pre-existing category-label gap, optional follow-up).
- **Signal trips (Conditional skip rule):** all clear — markdown/skill-doc only, no frontend, no privileged-ops, no perf narrative → Skip branch (autonomous commit).

**Archived:** 2026-06-01
