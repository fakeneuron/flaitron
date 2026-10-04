---
title: contract-gates-spec
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: ["CORE-EPIC-211", "CORE-211.1"]
---
# CORE-211.2 | contract-gates-spec

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-211]] [[CORE-211.1]]

## 🎯 Goal

Tighten the operator-gate cues, Phase 1 exit flavors, and conditional skip rule sections in SPEC.md for scannability while preserving the two-banner limit and mandatory preview-line requirement on every gate.

## ✅ Acceptance

- [ ] The three target sections in SPEC.md (Operator-gate cues §289-314, Phase 1 Discovery exit gate + flavors §332-380, Conditional skip rule §448-479) have measurably better scannability via strategic line breaks before lists/tables, consistent bolding of key tokens (e.g. `default-skip`, "preview line"), and removal of dense paragraph runs — without any semantic or behavioral change.
- [ ] Two-banner limit ("up to two") and mandatory 1-2 sentence plain-English preview-line requirement remain explicitly stated, prominent, and unchanged in force.
- [ ] No rule drift: --fast carve-outs, per-skill flavor mapping (`default-skip` for /ft-task), signal definitions, and "no AI override" semantics preserved exactly.
- [ ] Phase 4 doc-drift sweep records the precise one-line updates to SPEC.md; tasknote archived cleanly.

## 🧩 Subtasks

- [ ] Pattern survey of the three target SPEC.md sections + precedent in CORE-183 (default-skip introduction), 208 cohort (agent-neutral polish), and 211.1 (scoping lock for this child)
- [ ] Identify concrete scannability opportunities (dense paragraphs, missing line breaks before lists, key-term bolding) limited to the three sections
- [ ] Apply minimal tighten edits to SPEC.md only
- [ ] Verify the two-banner limit + mandatory preview-line statements are intact and scannable
- [ ] Mental-pass hygiene + cross-ref check on edited SPEC.md (no accidental rule wording drift)
- [ ] Phase 3/4 auto: doc-only (no tests), markdown mental-pass as lint, doc-drift sweep, PLAN.md stub flip + archive move

## 🔗 Related

- [[CORE-EPIC-211]] — parent epic: Review flowtron for complete environment and agent neutrality. Deep focus on clarity of user communication at every gate and phase transition (emojis, line breaks, explicit instructions, skippable non-drift paths e.g. Phase 1→2). All children [light]-scoped.
- [[CORE-211.1]] — predecessor discovery subtask (filed the .2– .6 children under the epic)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope matches the child exactly as filed by [[CORE-211.1]]: mechanical tighten of the three named SPEC.md sections for scannability. Direct precedent in 183 (introduced default-skip flavor) and 208 (conservative agent-neutral doc polish) confirms the edit pattern. No drift in target language or concepts; no cross-surface impact (skills/templates are .3/.4). No Re-scope or De-scope.

- [x] Read relevant source files — SPEC.md (Operator-gate cues §289-314 with banner format + table + --fast footnote + preview mandate; Phase 1 Discovery exit gate §332-380 with two-flavor table + default-skip judgment rules + --fast carve-out; Conditional skip rule §448-479 with the three deterministic signals + bundled-prompt override + --fast operator override). Cross-checked against 211.1 archived tasknote (scoping lock) and CORE-183 (origin of the flavor split).

- [x] **Archive skim** — ls _project/tasknote/archive/core/ + grep -l for "SPEC.md" and gate keywords. Load-bearing hits: [[CORE-211.1]] (direct scoping parent; explicitly locked .2 to "only fix the worst offenders" in gate prose with minimal conservative change), 208.* cohort (parallel polish on post-closure suggestion UX after agent-neutral pass; same conservative single-surface mechanical style), [[CORE-183]] (the task that introduced `default-skip` flavor for /ft-task and the two-flavor table; current language is its descendant). No file moves, regressions, or hard-link decisions affecting this tighten. Earlier broad SPEC edits (004-038) are too old to carry relevant gate-specific decisions.

- [x] **Drift check** — Task description cites "operator-gate cues, Phase 1 exit flavors, and conditional skip rule" + "two-banner limit and preview-line requirement" — all three sections and the two rules exist verbatim at the expected locations in current SPEC.md with identical terminology. No line numbers or file paths were cited in the PLAN entry, so none to drift. The --fast interaction language and "no AI override" semantics are stable since 183 + 208. Clean.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Explicit assumptions: (1) "Tighten for scannability" means small mechanical edits only (line breaks before lists/tables, bold key tokens like `default-skip`, minor paragraph splits for breathing room); no new content, no rule changes, no banner additions. (2) Edits confined to SPEC.md only (per task title "contract-gates-spec"); skill prose and template checklists are out of scope for .3/.4. (3) Two-banner ceiling and mandatory preview-line stay non-negotiable invariants. (4) This remains a pure [light] doc polish following the 211.1 "worst-offenders-only" lock.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim + precedent summary:** The gate contract language has been stable and intentionally conservative since CORE-183 (default-skip introduction for routine mechanical tasks) and the 208 agent-neutrality sweep (which cleaned suggestion text but left core gate cues untouched). 211.1 Discovery explicitly scoped this .2 as the narrow SPEC-only scannability pass on the three sections, with the policy "only fix the worst offenders (dense paragraphs ... missing line breaks before lists)". We inherit that lock. No prior dedicated scannability polish on the gate prose itself — this child is the first.

**Drift + relevance:** Zero drift. The task as filed is still the right work. Proceed with minimal, high-signal edits only.

**Phase 1 exit gate judgment (default-skip flavor for /ft-task):** Discovery surfaced no significant deviation from the original plan (zero clarifying asks surfaced; subtasks and assumptions are direct faithful refinements of the 211.1-locked scope; no change to target file, no new cross-cutting concerns, same conservative doc-polish approach as 183/208 precedent). → skip 🛠️.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:** SPEC.md itself uses generous blank lines between rule blocks, `backticks` for flavor tokens (`default-skip`), **bold** for defined terms on first strong mention, and short paragraphs before tables/lists. The 183 tasknote (and its SPEC edits) and 208 polish both favored exactly this: minimal text changes + whitespace + bold for scannability, no new subsections or semantics. The three judgment bullets under default-skip and the post-code-block "where" explanations were the clearest "missing breathing room" sites. No precedent for decorative rules or major reflows inside contract sections — we extend the existing style.

**Implemented (minimal tighten, SPEC.md only):**
- Added blank lines between the three **Skip / Fire / Always fire** bullets in the `default-skip` judgment rule (the most frequently scanned list for /ft-task users).
- Bolded **preview line** on its mandatory-requirement sentence (the single most important invariant in the gate contract) for instant visual pop.
- Confirmed no other dense paragraphs in the three target sections needed intervention without crossing into content change.

These are pure visual/emphasis hygiene — zero rule text altered, zero new concepts, zero impact on --fast, signals, or banner counts.

**Tests:** N/A (pure markdown contract edit). Verification was the mental-pass below.

**Phase 2 mental-pass (executed inline after edits):**
- All three target sections (Operator-gate cues, Phase 1 exit gate flavors, Conditional skip rule) touched only for whitespace between bullets or one term bold — no wording of any rule, trigger, or carve-out changed.
- Two-banner limit ("**up to two**") and mandatory **preview line** statements remain verbatim and prominent.
- Cross-refs (§"📝 Phase 1: Discovery", §"Conditional skip rule", §"Operator-gate cues") resolve cleanly.
- No trailing spaces, table alignment untouched, code blocks intact.
- Matches the conservative "worst-offenders-only" lock from 211.1 exactly.
All boxes ticked. Ready for Phase 3.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Doc-only change to SPEC.md (contract prose + whitespace/emphasis for scannability). 

- "Targeted test suite": Phase 2 mental-pass (cross-refs resolve, no rule text or trigger semantics altered, two-banner + mandatory preview-line invariants preserved verbatim, table/ code block hygiene clean). Equivalent verification for a documentation tighten.
- "Lint/type-check": Same mental-pass + visual diff review. No executable surface; markdown structure is valid (lists, tables, code fences, bold, backticks all well-formed).
- Frontend visual: N/A — SPEC.md is not a UI component (no viz/ or *.tsx touched; GitHub rendering is incidental). No 👁️ prose ask emitted per SPEC §"🧪 Phase 3" (the 👁️ rule applies only to frontend changes).

All verification complete. Flows directly into Phase 4 closure ops. No issues.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Recap (for 📦 bundle):**

Completed the `CORE-211.2` contract-gates-spec tighten. Added strategic blank lines between the three judgment-rule bullets under `default-skip` and bolded the **preview line** term on its mandatory-requirement sentence in SPEC.md — the two most direct "scannability" wins in the gate contract. The up-to-two banner limit and mandatory 1-2 sentence preview-line requirement remain verbatim and prominent; zero semantic, trigger, or --fast behavior changed.

**Technical detail:**
- File: `SPEC.md` only (Operator-gate cues §289-314, Phase 1 exit gate flavors §332-380, Conditional skip rule §448-479).
- Diff: 3 blank-line insertions (breathing in the most-scanned list) + 1 bold emphasis; net ~5 lines changed.
- No other surfaces (skills, templates, docs) touched — per explicit scoping lock from .1 and task title.
- Key decision: minimal conservative polish only (extend existing whitespace + bold-token style from 183/208 precedent); no new content, no rule rewording.
- Verification: Phase 2 pattern survey + mental-pass (invariants preserved, cross-refs clean); Phase 3 hygiene review (doc-only, no 👁️ needed).

**Doc-drift sweep (Phase 4):**
- `README.md` — no change
- `SPEC.md` — tightened operator-gate cues, Phase 1 exit flavors, and conditional skip rule for scannability (blank lines in judgment bullets; **preview line** bolded on mandate sentence); two-banner limit and mandatory preview-line requirement preserved verbatim with no semantic impact.
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change

**Archived:** 2026-05-26
