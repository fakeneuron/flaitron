---
title: model-label-valid-set
status: completed
tags: []
created: 2026-06-01
due:
related-tasks: [CORE-EPIC-254, CORE-206, CORE-240]
---

# CORE-256 | model-label-valid-set

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-254]]

## 🎯 Goal

Codify how Step 1.5's model gate matches a **category** `[model]` tag
(`[heavy]`/`[light]`) against a **concrete** active model (opus/sonnet/grok/…),
so running a concrete model on a category-tagged task no longer false-fires the
mismatch block — closing the currently-undefined category-vs-concrete case in
`SPEC/model.md` + the step-1.5 fragment.

## ✅ Acceptance

- [ ] `SPEC/model.md` defines the category-vs-concrete match rule explicitly (no longer undefined)
- [ ] `claude/skills/ft-task/step-1.5-model-edge.md` reflects the same rule so the executable gate matches the contract
- [ ] The three existing branches (match / differ / absent) are reconciled with the new category branch — no contradictions
- [ ] Auto-retag question resolved and documented (keep category vs rewrite to concrete)
- [ ] Doc-drift sweep recorded for every entry in `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] `SPEC/model.md` — add a "Category-vs-concrete matching" subsection: the ordered tier ladder (`light < heavy`, extensible), model→tier as guidance + self-assessment (opus/GPT-5.5-class = heavy; sonnet/grok/haiku-class = light; explicitly note grok reads light-tier), and the 4-case match rule; state no auto-retag
- [ ] `SPEC/model.md` — reconcile the existing 3-bullet gate list (lines 23-28) so "match/differ" are scoped to concrete-vs-concrete and the category branch is consistent
- [ ] `claude/skills/ft-task/step-1.5-model-edge.md` — add a "Category tag vs concrete active model" section (the ⚠️ under-tier soft-note shape + proceed); clarify the existing "Mismatch" section is concrete-vs-concrete
- [ ] `claude/skills/ft-task/SKILL.md` — Step 1.5 branch list: route category tags to the fragment's category handling (so an under-tier category case is a soft note, not the concrete-mismatch STOP)
- [ ] File CORE-259 in PLAN.md — 3rd-tier model-vocabulary expansion follow-up
- [ ] Phase 4: doc-drift sweep + PLAN.md flip + archive

## 🔗 Related

- [[CORE-EPIC-254]] — cross-agent operator cues; category labels are the agent-neutral cognitive-load signal a `[heavy]` task may run on any provider's heavy model
- [[CORE-206]] — introduced the neutral `[heavy]`/`[light]` primary labels
- [[CORE-240]] — cascaded the vocabulary into SPEC.md + templates

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and live — `SPEC/model.md` lines 23-28 enumerate
  only match / differ / absent, and "match" is implicitly string-equality, which
  means a `[light]`-tagged line run on `sonnet` falls through to the "differs →
  block" branch and false-fires. The task is a pure design+codify with no code
  surface.

- [x] Read relevant source files — `SPEC/model.md`, `claude/skills/ft-task/step-1.5-model-edge.md`, `SPEC.md` §"Task-line format" + §"Model field", `templates/tasknote-template.md`

- [x] **Archive skim** — grepped `archive/core/` for `model.md` / `step-1.5` / "model gate"/"mismatch"; reviewed CORE-240 (vocab cascade) + CORE-199 (orthogonal user-config reduction). **No prior tasknote defines category-vs-concrete matching** — grep for `category`/`set of`/`membership`/`⊇`/`concrete model` across the model-rationale notes returned zero hits. The gap is genuinely open.

- [x] **Drift check** — verified at HEAD: `SPEC/model.md:23-28` carries the three-branch gate; `step-1.5-model-edge.md` carries Mismatch + Legacy branches only (no category branch). Description's claim "currently undefined" confirmed accurate — no drift.

- [x] Asked clarifying questions — two rounds of AskUserQuestion (design forks resolved; see Decisions)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **The undefined case:** Step 1.5 "match" is implicitly string-equality. When the
  tag is a category (`[heavy]`/`[light]`) and the active model is concrete
  (`opus`/`sonnet`/`grok`/`gpt-5`/…), neither "matches" (string ≠) nor a clean
  "differs" (the operator didn't file a *specific* model) describes the situation.
  Today it falls through to "differs → block" → a false-positive STOP.

**Decisions (resolved via clarifying questions):**

1. **Match mechanism → capability-ordered tier ladder, not a flat set.** The
   user's input reframed the original "satisfied by a set" framing: grok is *not*
   a heavy (deep-reasoning, large-context) model — that's opus / upper-tier GPT-5.5.
   So a category tag is matched against the *tier* of the active model, where
   tiers form an ordered ladder (`light < heavy`). Model→tier is **guidance +
   agent self-assessment in `model.md`**, NOT a frozen lookup table (preserves
   the "observations, not rigid policy" stance + agent-neutrality from
   [[CORE-EPIC-254]]).
2. **Match rule (4 cases):**
   - active tier **==** tag tier → proceed silently.
   - active tier **>** tag tier (heavier model on lighter task) → proceed; no flag (overkill is harmless).
   - active tier **<** tag tier (lighter model on heavier task, e.g. grok on `[heavy]`) → **soft ⚠️ advisory note, proceed** (operator decides; not a STOP).
   - **concrete-vs-concrete** divergence (PLAN `[opus]` vs active grok) → **unchanged hard block** (operator filed a specific assignment).
   - category tag vs category active → N/A (active model is always concrete).
3. **No auto-retag.** Category labels are preserved; never rewritten to the
   concrete running model (keeps the cognitive-load signal that feeds
   `/ft-stats` buckets + scannable agent-neutral filing).
4. **2 tiers now, extensible rule.** Ship `light < heavy`; design the rule to
   read the ladder so a 3rd tier slots in with zero rule changes. The 3rd-tier
   vocabulary expansion is **filed as a separate follow-up** (CORE-259) — it
   ripples through viz parser + `/ft-stats` + SPEC grammar + templates, beyond
   CORE-256's gate-matching scope.

**Scope note (surfaced at 🛠️ gate):** the PLAN line names `SPEC/model.md` + the
step-1.5 fragment, but the executable gate also needs `claude/skills/ft-task/SKILL.md`
Step 1.5's branch list updated — today its binary "Matches → proceed / Differs →
STOP" routes a category tag's under-tier case to a STOP. The dispatcher needs a
clause routing category tags to the fragment's new handling.

**Exit-gate judgment (`default-skip` flavor):** Discovery's clarifications
changed the approach (flat-set → tier-ladder + soft-note), added a cross-cutting
follow-up (CORE-259), and widened the file set (+SKILL.md dispatcher) → **fire 🛠️.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing shapes rather than inventing: the gate stays a branch-list in both `model.md` and `SKILL.md` Step 1.5; the ⚠️ under-tier note follows the inline-emoji-prefix convention already used by `👁️` (Phase 3) — an advisory, not a banner; the fragment's new section mirrors the existing "Mismatch"/"Legacy entry" section shape. No new operator-gate vocabulary introduced (deliberately kept off SPEC.md's cue glossary, which CORE-254 owns).

- [x] Implemented the minimal solution — 4 files:
  - `SPEC/model.md` — reconciled the gate bullets (match→"satisfied", added the category-under-tier bullet) + new `## Category-vs-concrete matching` section (tier ladder, model→tier guidance, 4-case rule table, no-auto-retag).
  - `claude/skills/ft-task/step-1.5-model-edge.md` — scoped "Mismatch" to concrete-vs-concrete + new `## Category under-tier` branch (⚠️ note shape, proceed).
  - `claude/skills/ft-task/SKILL.md` — Step 1.5 dispatch split from binary (match/differ) into 4 branches (Satisfied / Category under-tier / Concrete mismatch / Absent).
  - `_project/PLAN.md` — filed CORE-259 (3rd-tier follow-up).

- [x] Updated/added tests for non-trivial behavior — N/A (markdown contract + skill docs; no executable surface). The only consumer of any changed file is `viz/src/parser.ts` (parses PLAN.md); the CORE-259 line mirrors the sibling CORE-256 `[heavy]🧠` shape exactly, so parser behavior is unchanged.

**Implementation Notes:**

- **⚠️ kept as an inline advisory, not a registered cue.** It signals an advisory that *proceeds*, not an approval gate — so it doesn't fit any existing labeled cue (GO/CONFIRM/RUN/ACTION) and adding a glossary row would widen scope into CORE-254's just-closed cue vocabulary. Documented inline in `model.md` + the fragment instead.
- **SKILL.md was touched though the PLAN line named only model.md + the fragment** — flagged at the 🛠️ gate and approved. The dispatcher's binary match/differ was the actual source of the under-tier false-STOP, so the executable fix required it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no executable surface; see Phase 2).

- [x] Ran lint/type-check on changed code — N/A (markdown only). Ran a doc-integrity sweep instead: `## Category-vs-concrete matching` anchor resolves; all three cross-refs (model.md self, fragment, SKILL.md) point at it; the fragment's `## Category under-tier` branch exists and SKILL.md routes to it; all 4 SKILL.md branches present; CORE-259 line parses per grammar. ✓

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Verification gates (substituting for automated tests): see the doc-integrity sweep grep above — anchors, cross-refs, branch coverage, and PLAN-line grammar all confirmed at HEAD.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts below

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-01.` and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip — diff is markdown-only; signals clear)

**Doc-drift sweep verdicts** (per `_project/tasknote/README.md` §"AI-referenced docs"):

| Doc | Verdict |
|---|---|
| `README.md` | no change |
| `SPEC.md` | no change — §"Model field" points to `SPEC/model.md` (canonical, where the new matching subsection lives); task-line table describes labels generically, gate-matching not restated |
| `docs/MIGRATION.md` | no change |
| `claude/AGENTS-snippet.md` | no change |
| `docs/CONVENTIONS.md` | no change (the "bump tier" hits are SemVer version tiers, unrelated to model tiers) |
| `CONTRIBUTING.md` | no change |
| `SECURITY.md` | no change |
| `docs/AGENT-NEUTRALITY.md` | no change — the tier model is agent-neutral (applies cross-provider); no new Claude-specific surface |
| `docs/PLATFORMS.md` | no change (line 234 is a dated CORE-257 verification log; write-once record, still accurate) |
| `claude/CAPABILITIES.md` | **updated** — the `/model` row's trigger cell said reach for `/model` when the next `[model]` "differs"; refined to "isn't satisfied by the current model — a concrete mismatch, or a `[heavy]` task on a lighter-tier model" so a tier-satisfied category tag (e.g. `[light]` on opus) no longer wrongly prompts a switch |
| `docs/AGENT-COMPAT.md` | no change |

**Final Summary:**

Closed the previously-undefined category-vs-concrete case in the Step 1.5 model
gate. A category `[model]` tag (`[heavy]`/`[light]`) is now matched by **tier**
on an ordered ladder (`light < heavy`, extensible) rather than string-equality —
so `[light]` on sonnet (or `[heavy]` on opus) proceeds silently instead of
false-firing the mismatch block. A lighter-than-tagged model (e.g. grok on
`[heavy]`) gets a ⚠️ inline advisory and proceeds; the hard block stays reserved
for concrete-vs-concrete divergence. Category tags are never auto-retagged.

Technical detail:
- **`SPEC/model.md`** — reconciled the gate bullets + new `## Category-vs-concrete matching` section (tier ladder, model→tier as agent self-assessment guidance not a frozen table, 4-case rule table, no-auto-retag rationale). `grok` explicitly calibrated as light-tier per the operator's input.
- **`claude/skills/ft-task/step-1.5-model-edge.md`** — scoped "Mismatch" to concrete-vs-concrete + new `## Category under-tier` branch (⚠️ note, proceed).
- **`claude/skills/ft-task/SKILL.md`** — Step 1.5 dispatch: binary match/differ → 4 branches (Satisfied / Category under-tier / Concrete mismatch / Absent).
- **`claude/CAPABILITIES.md`** — `/model` trigger-cell precision fix (doc-drift sweep).
- **`_project/PLAN.md`** — filed **CORE-259** (3rd-tier vocabulary-expansion follow-up; the operator's "grok isn't heavy" observation, deferred out of CORE-256's gate-matching scope).
- **Design decisions** (two rounds of clarifying questions): tier-ladder over flat set; 2 tiers now with a tier-count-agnostic rule; soft-note (not block) on under-tier; no auto-retag.
- **Scope note:** `SKILL.md` was touched beyond the PLAN line's named files — flagged + approved at the 🛠️ gate (the dispatcher's binary was the actual source of the under-tier false-STOP).
- **Signal trips (Conditional skip rule):** all clear — markdown/skill-doc only, no frontend files, no privileged-ops paths, no perf narrative → Skip branch (autonomous commit).

**Archived:** 2026-06-01
