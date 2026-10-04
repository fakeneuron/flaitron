---
title: docs-verification-sweep
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: ["CORE-EPIC-211", "CORE-211.4"]
---

# CORE-211.5 | docs-verification-sweep

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-211]] [[CORE-211.4]]

## 🎯 Goal

Confirm that "families only" deep-model naming (primary labels `[heavy]` / `[light]` plus specific names like `opus` / `sonnet` / `grok` strictly as illustrative examples) is used consistently across `docs/AGENT-NEUTRALITY.md`, `docs/GLOSSARY.md`, `SPEC/model.md`, and related docs, with zero pinned version strings or dates remaining in the living contract surfaces.

## ✅ Acceptance

- [ ] `docs/AGENT-NEUTRALITY.md`, `docs/GLOSSARY.md`, `SPEC/model.md`, and all other files in `_project/tasknote/README.md` §"AI-referenced docs" (plus templates/PLAN.md and SPEC.md for model examples) contain only family-level deep-model references; no "Grok 4.x", "Grok 4.3", "Claude 3.5", specific dated versions, or equivalent pins.
- [ ] Any narrative examples of the Step 1.5 model gate (in model.md) are generalized to agent- and version-agnostic phrasing while preserving the educational value of the mismatch scenario.
- [ ] GLOSSARY.md `[model]` and "copy-paste line" entries remain accurate post any edits and continue to describe the primary-label + example-names convention.
- [ ] Phase 4 doc-drift sweep executed in full against the 9 AI-referenced docs; "no change" or precise update recorded for each.
- [ ] Tasknote archived cleanly under the parent epic; .5 deliverable stands as the formal "families only" currency check for CORE-EPIC-211.

## 🧩 Subtasks

- [ ] Pattern survey of prior agent-neutrality + model-guidance cleanups (CORE-211.1 policy lock, 206/207/208 cohort, 154.x ledger) to confirm the exact "families only" phrasing precedent
- [ ] Identify every live deep-model reference in the three named files + 9 AI-referenced docs; isolate the two residual version-pinned example sentences in SPEC/model.md
- [ ] Minimal surgical rephrase of the two sentences in SPEC/model.md (strip "Grok 4.x (2026-05)" and "Grok 4.3"; use "Grok-class model" + "recent session" framing per scope decision)
- [ ] Re-verify the full target surface (AGENT-NEUTRALITY, GLOSSARY, model.md + AI-ref list) contains zero version pins or dates
- [ ] Phase 3 markdown hygiene + link check on the single edited file (no tests, no frontend)
- [ ] Phase 4 doc-drift sweep (expect "no change" on 8/9 + precise note on SPEC/model.md) + clean closure + archive

## 🔗 Related

- [[CORE-EPIC-211]] — parent epic: gate-clarity-agent-neutral (deep focus on version-agnostic model references in docs and gates)
- [[CORE-211.4]] — predecessor: template-phase-text (light mechanical pass under same epic)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Direct child of CORE-EPIC-211 (gate-clarity-agent-neutral). The filed scope is a bounded verification sweep + any minimal surgical fixes to enforce the "families only" deep-model policy that .1 explicitly locked ("Families only, no versions or dates ever... Primary [heavy]🧠 / [light]🔧 remain preferred."). The residual "Grok 4.x" / "Grok 4.3" examples in the live model.md are exactly the class of pin this child was created to catch. No blockers, no hidden cross-cutting work, no re-scope or de-scope warranted. Tight scope confirmed via operator ask.

- [x] Read relevant source files — `docs/AGENT-NEUTRALITY.md` (ledger row on model labels already uses families + examples language), `docs/GLOSSARY.md` (`[model]` and copy-paste-line entries use primary labels + `grok`/`opus` etc. as valid examples), `SPEC/model.md` (the two residual version-pinned example sentences), `docs/GLOSSARY.md` + prior epic artifacts (CORE-211.1 policy lock, 208/206/207 heavy-light + guidance rollout), `_project/tasknote/README.md` (AI-ref list for Phase 4 sweep), sibling CORE-211.4.md (light-pass precedent under same epic), templates/PLAN.md (grammar examples use unversioned tokens).

- [x] **Archive skim** — skim `_project/tasknote/archive/core/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

**Archive skim findings:** 252 files in `archive/core/`. 
- AGENT-NEUTRALITY.md hits: full 154.x neutrality epic + 211.1 (policy) + scattered later (expected; no conflicting decisions).
- GLOSSARY.md hits: 194.x (creation + audit) + 209 (link fix) + 211.1 (cross-ref in epic discovery).
- model.md / model naming: historical 042/049/052/056/058/070/097/132/138/141 (grammar evolution + early model field) + 154.x + 211.1.
- "families only / heavy-light / version-agnostic" concept hits cluster in the 205/208/211 cohorts and the defining 206/207 model work.
Load-bearing: CORE-211.1 explicitly recorded the operator decision "Families only, no versions or dates ever" with the preferred phrasing examples; 208.8/207/206 are the rollout that introduced the primary labels. No prior tasknote left contradictory "version pin OK in guidance" decisions. The pins now visible in model.md are the sole remaining live surface the .5 sweep was scoped to confirm-and-clean.

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

**Drift check:** 
- All paths cited in the PLAN line (`AGENT-NEUTRALITY.md`, `GLOSSARY.md`, `model.md` + "related docs") resolve to live files with identical locations.
- The "families only" policy locked in CORE-211.1 (and referenced in the epic header) remains the active intent.
- The specific residual strings ("Grok 4.x usage (2026-05)", "active assistant Grok 4.3") in SPEC/model.md:77 and :51 are exactly the content the verification child exists to address; their presence is not "drift" — it is the pre-.5 state.
- No file moves, renames, or semantic changes to the model guidance surface since the epic was filed. The terse PLAN description still precisely describes the work.
- No drift requiring re-interpretation of scope. Proceed.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

**Clarifying questions surfaced via structured ask (operator answered):**

1. Scope of "related docs": **User choice** — named three (AGENT-NEUTRALITY + GLOSSARY + model.md) + the 9 AI-referenced docs in tasknote/README.md only. templates/PLAN.md and root SPEC.md explicitly out of edit scope for this sweep (grammar examples in templates are illustrative and already unversioned).

2. Rephrase style for the two pinned sentences: Not explicitly selected in the response payload; defaulted per "fewest tokens changed" delegation option to the minimal conservative generalization (strip specific versions/dates, keep a light "recent Grok-class session" anecdote framing that still teaches the retag gate without pinning builds or calendar dates).

**Explicit assumptions (post-ask confirmation):**
- Only SPEC/model.md requires edit; the other two named files + 9 AI-ref surfaces are already compliant (verification pass will confirm "no change" for them in Phase 4).
- The edit will be the smallest diff that removes "Grok 4.x (2026-05)" and "Grok 4.3" while preserving teaching value. "Grok-class model" + "recent session" language is acceptable and agent-neutral enough.
- No updates needed to GLOSSARY or AGENT-NEUTRALITY entries (they already say the right thing).
- Phase 3 is pure markdown hygiene + link integrity on the one changed file (no frontend → no 👁️ ask required even under default flow).
- This child stays strictly inside "confirm + any surgical fixes the sweep surfaces"; larger model guidance polish is future work or .6 audit follow-up.
- Parent epic .6 will perform its own mandatory fixed doc-drift sweep (this .5's work is input to that).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Exit-gate judgment (per SPEC §"📝 Phase 1: Discovery" `default-skip` flavor):** Discovery surfaced no significant scope deviation. Straight "Proceed" verdict from operator-confirmed tight scope. One clarifying ask (answered: narrow file set), subtasks populated exactly to the verification + minimal-fix shape, archive + drift confirmed policy and paths are stable, only one live file carries the pins the child was filed to catch. No re-structuring, no cross-cutting additions, no Re-scope/De-scope. → **Skip 🛠️.**

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:** Direct precedent in the CORE-211.1 locked policy table ("Families only, no versions or dates ever...") and the 206/207/208 cohort that introduced the `[heavy]`/`[light]` primary vocabulary + agent-aware notes in the same model.md file. The 154.x neutrality ledger already phrases the model row with "Primary labels `[heavy]` / `[light]` + `opus`/`sonnet`/`grok` as examples". The two residual sentences were the only live surfaces still using the old "Grok 4.x (2026-05)" and "Grok 4.3" framing (self-referential to the guidance task itself). No other pattern to extend — this is a pure cleanup pass.

**Minimal solution:** Two surgical one-line rephrases in `SPEC/model.md` only (per operator-confirmed scope):
- L51: "Current Grok 4.x usage (2026-05)" → "In practice on current Grok-class models" (removes version + date).
- L77: "active assistant Grok 4.3" → "active assistant on a Grok-class model" (removes specific build pin).

Zero other files touched. Diff is 4 lines changed, pure generalization, teaching value of the retag-gate anecdote preserved.

(No non-trivial behavior to test; docs-only verification child.)

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `git diff --stat`: 1 file changed, 2 insertions(+), 2 deletions(-) — exactly the two targeted sentences in SPEC/model.md.
- `git diff --check`: clean (no whitespace or trailing issues introduced).
- Manual review: both edits are single-line generalizations; surrounding sentences and the "primary labels" closing paragraph remain byte-identical. No new version strings, no dates, no breakage to the cross-provider calibration paragraph or the rule-of-thumb guidance.
- Link / reference integrity: the two edited sites are pure prose inside the "Practical guidance..." subsection; no wikilinks, code fences, or cross-refs were near the changed tokens.
- No frontend surfaces changed → no 👁️ visual confirmation prose ask required (per SPEC §"🧪 Phase 3").
- "Test suite" for this verification child is the post-edit re-grep across the full target surface (AGENT-NEUTRALITY + GLOSSARY + model.md + the 9 AI-ref docs) confirming zero remaining "Grok 4" / "4.x" / version-dated pins. All clean.
- Phase 3 complete; zero issues.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (per `_project/tasknote/README.md` §"AI-referenced docs"):**

- `README.md` — no change
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change (already used families + examples language per the 154/211.1 baseline)
- `docs/PLATFORMS.md` — no change

(Note: `SPEC/model.md` — the lazy module explicitly called out as "not part of the default cold-start sweep" — **updated** with two version-agnostic rephrases per this task's scope. The 9 AI-ref surfaces themselves required zero edits; the verification pass confirmed they were already compliant with the CORE-211.1 "families only" policy. GLOSSARY.md (intentionally omitted from the AI-ref list) was also clean.)

**Final Summary:**

Docs-verification-sweep complete for CORE-EPIC-211. Confirmed "families only" deep-model naming (primary `[heavy]`/`[light]` + specific names strictly as examples, zero version pins or dates) across the three explicitly named surfaces + the 9 AI-referenced docs. Only residual was two example sentences in the live `SPEC/model.md`; both generalized with minimal diff ("Grok 4.x (2026-05)" and "Grok 4.3" removed; "Grok-class model" + "recent session" framing retained for teaching value). All other targeted files already compliant. Phase 3 hygiene clean. Doc-drift: 8/9 AI-ref "no change"; model.md note recorded for the epic audit.

_Technical:_ 1 file edited (`SPEC/model.md`, +2/-2). Scope exactly as operator-confirmed in Phase 1 ask (named three + AI-ref list only). Pattern survey + archive skim tied the work to the 211.1 policy lock and 206/207/208 rollout. 🛠️ skipped (no deviation). 0 frontend / 0 privileged / 0 perf signals. Model tag [light] matched the mechanical verification shape.

**Archived:** 2026-05-26
