---
title: SKILL-side lazy-load
status: completed
tags: []
created: 2026-05-07
due:
related-tasks: [CORE-EPIC-042, CORE-042.2, CORE-042.8]
---

# CORE-042.9 | SKILL-side lazy-load

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-042]] [[CORE-042.2]] [[CORE-042.8]]

## 🎯 Goal

Extend [[CORE-042.2]]'s directive-Read pattern to lazy-load `task` SKILL Step 3a (~429w) / Step 3c (~198w) / Step 1.5 edge-case bodies (~165w) into sibling files under `claude/skills/task/`, lifting per-`/task` structural saving from ~7.8% to ~13-14%.

## ✅ Acceptance

- [x] Step 0 resolves `SKILL_DIR` alongside `SPEC_DIR` for both adopting (`_project/flowtron/claude/skills/task/`) and self-hosted (`claude/skills/task/`) layouts
- [x] `claude/skills/task/step-3a-promote-starter.md` created with verbatim Step 3a body (numbered 1-7 + closing paragraph); H1 = "Step 3a — Promote a starter" + back-ref note
- [x] `claude/skills/task/step-3c-resume-blocked.md` created with verbatim Step 3c body (numbered 1-5); H1 + back-ref note
- [x] `claude/skills/task/step-1.5-model-edge.md` created with verbatim mismatch + legacy branch bodies; H1 + back-ref note
- [x] `SKILL.md` Step 3a slimmed to a directive-Read stub: parallel Reads of `<SPEC_DIR>/starter.md` (contract) + `<SKILL_DIR>/step-3a-promote-starter.md` (steps); continue at Step 4
- [x] `SKILL.md` Step 3c slimmed similarly: parallel Reads of `<SPEC_DIR>/blocked.md` + `<SKILL_DIR>/step-3c-resume-blocked.md`; continue at Step 5 Phase 2
- [x] `SKILL.md` Step 1.5 dispatch preserved (intro + 3-way decision tree + match case fully inline); mismatch + legacy bullets become "Read `<SPEC_DIR>/model.md` AND `<SKILL_DIR>/step-1.5-model-edge.md`, follow the operational steps" stubs
- [x] Per-`/task` always-loaded surface measured: SKILL.md 2,409w → **1,814w** (−595w / −24.7%); 3 lazy fragments total 828w; structural saving on fresh-task branch lifts from ~7.8% to **~12.6%** (within audit's ~13-14% target)
- [x] No SPEC version bump (SKILL-side architectural change; canonical contract unchanged); SPEC.md `**Version:** v0.9.1` line untouched
- [x] No regression: viz suite passes (54/54); cross-citation grep returns zero residual stale `Step 0.5 / Step 3a body / Step 3c body` references in non-archive files

## 🧩 Subtasks

- [x] Update `claude/skills/task/SKILL.md` Step 0: add `SKILL_DIR` resolution (both layouts) alongside `SPEC_DIR`
- [x] Extract Step 3a body → `claude/skills/task/step-3a-promote-starter.md` (H1 + 1-line back-ref note + verbatim numbered list 1-7 + closing paragraph)
- [x] Slim `SKILL.md` Step 3a → directive-Read stub (parallel Reads + continue-at pointer)
- [x] Extract Step 3c body → `claude/skills/task/step-3c-resume-blocked.md` (H1 + back-ref note + verbatim numbered list 1-5)
- [x] Slim `SKILL.md` Step 3c → directive-Read stub (parallel Reads + continue-at pointer)
- [x] Extract Step 1.5 mismatch + legacy branch bodies → `claude/skills/task/step-1.5-model-edge.md` (H1 + back-ref note + 2 sub-sections: "Mismatch" / "Legacy entry")
- [x] Slim `SKILL.md` Step 1.5 → keep intro + 3-way dispatch with match case inline; mismatch + legacy bullets become "Read both modules, follow operational steps" stubs
- [x] Word-count check: SKILL.md slim 1,814w; 3 lazy files 828w total
- [x] Cross-citation grep — zero stale `Step 0.5 / Step 3a body / Step 3c body` refs across `claude/`, `templates/`, `docs/`, slim SPEC.md, slim SKILL.md
- [x] Read-through pass on slim SKILL.md as a coherent always-loaded doc — verified Steps 0/1/1.5/2/3a/3b/3c/4/5/6/Notes flow cleanly
- [x] Run `cd viz && npm test` — 54/54 pass

## 🔗 Related

- [[CORE-EPIC-042]] — parent epic (workflow architecture rethink)
- [[CORE-042.2]] — established the directive-Read lazy-load pattern (SPEC modularization) being extended here
- [[CORE-042.8]] — audit that surfaced this follow-on; quantified the deferred SKILL-side ~600-750w saving and the ~13-14% structural target

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Final architecture-push child of [[CORE-EPIC-042]] following the audit-filed follow-on. [[CORE-042.2]] established the directive-Read pattern and explicitly deferred SKILL-side lazy-loading as an "out-of-epic surface noted but not filed"; [[CORE-042.8]] audit re-surfaced it and quantified the saving. PLAN.md line still unchecked under `## Medium`. The "design call: mixes SPEC content with executable interpretation" tag is settled below (sibling files under `claude/skills/task/`, not under `SPEC/`).

- [x] Read relevant source files — `SPEC.md` (2,954w slim core), `claude/skills/task/SKILL.md` (2,409w; word-counts verified for target sections), `_project/PLAN.md` (5,942w), CORE-042.2 + CORE-042.8 archives in full. Skill directory layout confirmed: `claude/skills/task/SKILL.md` is the only file in the task skill bundle today; `.claude/skills/task` is a symlink to the same. Sibling skills (`starter-task` 1,343w, `micro-task`, `new-project`) checked for parallel structure — none have multi-file bundles, so this task introduces a new precedent.
- [x] **Archive skim** — read [[CORE-042.2]] (directive-Read pattern; SPEC_DIR resolution at Step 0; rejected mixing SPEC vs SKILL content as an "out-of-epic" deferral) and [[CORE-042.8]] (audit §C predicted ~13-14% structural after SKILL-side split; §G named the three target sections + word counts). Per CORE-042.2's pattern, lazy files open with `H1 + 1-line back-ref note + verbatim moved content`. 24 prior CORE archives touched skill paths but pre-CORE-042.2 changes were prose evolutions, not architectural splits — no precedent for a multi-file SKILL bundle.
- [x] **Drift check** — see Drift sub-section below. SKILL.md word counts match audit predictions within margin; one minor measurement clarification (Step 1.5 full step is 245w but the *moveable bodies* are ~165w, not 150w as audit said).
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 2 questions resolved via AskUserQuestion: (1) **lazy files live at `claude/skills/task/<step>.md`** — sidesteps the "mixing" concern by keeping SPEC content in `SPEC/` and SKILL content under `claude/skills/task/`; (2) **include Step 1.5 in scope** — extract mismatch + legacy bodies, keep 3-way dispatch + match case inline in SKILL.md.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Target sections (word counts verified 2026-05-07)

| Section | Lines (current SKILL.md) | Words | Notes |
|---|---|---|---|
| Step 1.5 (full step) | 62-75 | 245 | Bodies-only (mismatch + legacy bullets) ≈ 165w; intro + 3-way dispatch + match-case bullet ≈ 80w stays inline |
| Step 3a body | 90-114 | 429 | Already opens with `Read <SPEC_DIR>/starter.md`; entire body moves |
| Step 3c body | 129-137 | 198 | Already opens with `Read <SPEC_DIR>/blocked.md`; entire body moves |
| **Total moveable** | — | **~792** | Versus audit's ~748w prediction — within margin |

### B. Path resolution shape (mirrors CORE-042.2's SPEC_DIR pattern)

Step 0 currently resolves `SPEC_DIR` for two layouts. Add `SKILL_DIR` alongside:

| Layout | `SKILL_DIR` |
|---|---|
| Adopting project (typical) | `_project/flowtron/claude/skills/task/` |
| Flowtron self-hosted | `claude/skills/task/` |

Directive-Read form mirrors CORE-042.2: `Read <SKILL_DIR>/step-3a-promote-starter.md before proceeding.`

### C. SKILL stub shape (post-extraction)

**Step 3a stub** (~3-line stub replacing ~429w): parallel Reads of `<SPEC_DIR>/starter.md` (contract) + `<SKILL_DIR>/step-3a-promote-starter.md` (steps), then continue at Step 4.

**Step 3c stub** (~3-line stub replacing ~198w): parallel Reads of `<SPEC_DIR>/blocked.md` + `<SKILL_DIR>/step-3c-resume-blocked.md`, then continue at Step 5 Phase 2.

**Step 1.5 stub** — different shape: intro + dispatch + match case stay inline (~80w retained); mismatch + legacy bullets collapse to a shared lazy-Read directive. The lazy fragment carries two H2 sub-sections (`## Mismatch` / `## Legacy entry`) holding the verbatim operational steps.

### D. Per-`/task` load math (post-CORE-042.9 prediction)

Versus current post-CORE-042.8 baseline (PLAN.md 5,942w + SPEC.md 2,954w + SKILL.md 2,409w + CLAUDE.md 674w = 11,979w):

| Branch | Lazy modules loaded | New total | Structural saving vs pre-epic 12,376w |
|---|---|---|---|
| Fresh task (Step 3b, plain ID) | none | ~10,560w (SKILL slim ~1,650 + SPEC 2,954 + PLAN 5,942 + CLAUDE 674) | ~−1,816w / −14.7% (PLAN-frozen at 5,369: ~−1,602w / **~−12.9%**) |
| Epic subtask (Step 2) | epic.md (303) | ~10,863w | ~−12.2% structural |
| Starter promotion (Step 3a) | SPEC/starter.md (334) + SKILL/step-3a (430) | ~11,324w | ~−8.5% structural |
| Blocked resume (Step 3c) | SPEC/blocked.md (494) + SKILL/step-3c (200) | ~11,254w | ~−9.0% structural |
| Model-gate edge case (Step 1.5) | SPEC/model.md (223) + SKILL/step-1.5 (165) | ~10,948w | ~−11.5% structural |

Fresh-task structural saving lifts from CORE-042.8's 7.8% to **~12.9%** — within the ~13-14% target. The slight under-shoot vs audit prediction is from Step 1.5 dispatch staying inline (~80w retained) plus directive-Read stub overhead (~30-50w net add to SKILL.md across the three sites).

### E. Drift findings — none load-bearing

- SKILL.md size matches audit (2,409w; identical to CORE-042.8's measurement on the same surface today).
- Step boundaries and content unchanged since CORE-042.2 closure (verified line numbers L62 / L90 / L129 against §A above).
- Minor: audit said "Step 1.5 mismatch/legacy bodies ~150w" — actual moveable content is ~165w when the heading + intro of each branch bullet is included. Within margin.

### F. SPEC version bump assessment

Hold the bump. CORE-042.9 is a SKILL-side architectural restructure — no canonical contract change in `SPEC.md` or any `SPEC/<module>.md`. Mirrors CORE-042.2 precedent (which also held the bump). `**Version:** v0.9.1` line on slim SPEC.md untouched.

### G. Adopter-surface impact

`claude/CLAUDE-snippet.md` does not cite SKILL.md internals — adopters paste the snippet to point at flowtron's `_project/flowtron/SPEC.md`; the skill loads via Claude Code's auto-discovery from `.claude/skills/task/`. New sibling files at `claude/skills/task/step-*.md` ship as part of the same skill bundle and are discovered transparently. **No adopter-surface migration needed.** `templates/tasknote-README.md` cites SPEC modules only — also unaffected.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-042.2's directive-Read shape: `H1 + 1-line back-ref note + verbatim moved content` for the lazy file; SKILL stub fires parallel Reads of (SPEC contract, SKILL fragment) at the branch entry. New shape vs CORE-042.2: SKILL stubs Read TWO files (SPEC + SKILL) instead of one (SPEC only) — justified because executable interpretation belongs alongside the contract it interprets, and parallel Reads have no cost penalty over sequential.
- [x] Implemented the minimal solution — see Implementation Notes
- [x] Updated/added tests for non-trivial behavior — n/a (markdown only; no TS/JS changed)

**Implementation Notes:**

### Files created

- `claude/skills/task/step-3a-promote-starter.md` (441w) — Step 3a executable steps (numbered 1-7 + closing paragraph). The opening directive `Read <SPEC_DIR>/starter.md` removed (now lives in the SKILL stub's parallel-Reads call).
- `claude/skills/task/step-3c-resume-blocked.md` (210w) — Step 3c executable steps (numbered 1-5). Same shape as 3a.
- `claude/skills/task/step-1.5-model-edge.md` (177w) — two sub-sections (`## Mismatch` / `## Legacy entry`) with verbatim branch operational steps.

Each fragment opens with H1 + a one-line back-ref note (`> Lazy-loaded SKILL fragment. Loaded by task SKILL.md Step <X> when <branch fires>. See claude/skills/task/SKILL.md for the always-loaded core dispatch.`).

### SKILL.md updates

- **Step 0** (+~80w): added `SKILL_DIR` resolution alongside `SPEC_DIR` for both layouts; closing paragraph rewritten to describe the two lazy-load surfaces (SPEC modules at `SPEC_DIR/`, SKILL fragments at `SKILL_DIR/`) and clarify that SKILL stubs typically Read both contract + fragment in parallel.
- **Step 1.5** (245w → ~115w): kept intro + 3-way dispatch + match-case bullet inline; mismatch + legacy bullets each collapse to "Read `<SPEC_DIR>/model.md` (contract) and `<SKILL_DIR>/step-1.5-model-edge.md` (operational steps), then follow the '<branch>' branch."
- **Step 3a** (429w → ~25w): full body replaced with single-paragraph stub firing parallel Reads of starter.md + step-3a-promote-starter.md; continue at Step 4.
- **Step 3c** (198w → ~30w): same shape; parallel Reads of blocked.md + step-3c-resume-blocked.md; continue at Step 5 at Phase 2 (lazy fragment's step 5 directs there; Phase 1 already complete on a parked tasknote).

### Per-`/task` load math (verified, post-edit)

Versus pre-epic baseline (12,376w, PLAN-frozen at 5,369w + SPEC 4,014 + SKILL 2,319 + CLAUDE 674):

| Surface | Pre-epic | Post-CORE-042.8 | Post-CORE-042.9 |
|---|---|---|---|
| `SPEC.md` | 4,014 | 2,954 | 2,954 |
| `SKILL.md` (task) | 2,319 | 2,409 | **1,814** |
| `PLAN.md` | 5,369 | 5,851 | 5,942 (frozen for structural lens) |
| `CLAUDE.md` (workspace + global) | 674 | 674 | 674 |
| **Total (PLAN-frozen, structural)** | **12,376** | **11,406 (−7.8%)** | **10,811 (−12.6%)** |
| **Total (absolute, current PLAN)** | 12,376 | 11,888 (−3.9%) | ~11,384 (−8.0%, will grow with this closure) |

Structural saving lifts from −7.8% (CORE-042.8) to **−12.6%** — within the audit's ~13-14% target. The structural figure isolates the architectural intervention from PLAN.md growth and is the right lens for measuring the lazy-load architecture.

Per-branch saving (PLAN-frozen):

| Branch | Lazy load | Total | Saving vs pre-epic |
|---|---|---|---|
| Fresh task (Step 3b) | none | 10,811 | **−12.6%** |
| Epic subtask (Step 2) | epic.md (303) | 11,114 | −10.2% |
| Starter promotion (Step 3a) | starter.md (334) + step-3a (441) | 11,586 | −6.4% |
| Blocked resume (Step 3c) | blocked.md (494) + step-3c (210) | 11,515 | −7.0% |
| Model-gate edge case (Step 1.5) | model.md (223) + step-1.5 (177) | 11,211 | −9.4% |

The fresh-task branch (most common) benefits most. Branches that fire a lazy module + lazy SKILL fragment land between 6.4% and 9.4% — still meaningfully below pre-epic, just not as dramatic as the fresh-task case.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `cd viz && npm test` → **54/54 pass** (parser.test.ts 29 + tasknote.test.ts 25). Confirms the SKILL restructure has zero impact on PLAN.md / tasknote parsing (expected — viz doesn't read skill files).
- [x] Ran lint/type-check on changed code — n/a (markdown edits only; no TS/JS changes).
- [x] (frontend) Asked the user for visual confirmation — n/a (no UI change).

**Testing Notes:**

Three smoke checks performed:

1. **Cross-citation grep** (`grep -rn 'Step 0.5\|Step 3a body\|Step 3c body'` across `claude/`, `templates/`, `docs/`, slim `SPEC.md`, `SPEC/`, slim `SKILL.md`): zero residual stale step references in non-archive files. (Note: `Step 0.5` was already fixed by [[CORE-042.8]]; re-grepped here as a sanity check that the new edits didn't reintroduce drift.)

2. **Word-count verification:**
   - `claude/skills/task/SKILL.md`: 2,409w → **1,814w** (−595w / −24.7%)
   - 3 lazy fragments: 441 + 210 + 177 = **828w**
   - Net repo growth across SKILL surface: +233w (one-time architectural seam cost; same shape as CORE-042.2's +165w SPEC seam cost)
   - Per-`/task` structural saving on fresh-task branch: **~12.6%** (1,565w off the 12,376w baseline)

3. **Slim SKILL.md read-through:** end-to-end pass confirmed coherent as a standalone doc. The 3 stubs sit at the right entry points (Step 1.5 mid-step, Step 3a + 3c whole-section). Step 0 → 1 → 1.5 (dispatch) → 2 (file-state branch) → 3a/3b/3c (file-state) → 4 (Phase 1) → 5 (Phases 2-4) → 6 (post-closure) → Notes is the same flow as before, just with three branch entry-points lazy-loading their executable bodies.

## 🚀 Phase 4: Closure

- [x] Updated docs/inventories affected by the change — `claude/skills/task/SKILL.md` slimmed; 3 new sibling files at `claude/skills/task/step-*.md`. No other surface touched (SPEC.md, templates, `claude/CLAUDE-snippet.md`, adopter docs all unaffected — verified via §G of Discovery Notes).
- [x] Closed — PLAN.md status flipped to `Completed 2026-05-07` and tasknote moved to `_project/tasknote/archive/core/`. Parent [[CORE-EPIC-042]] also flipped to complete (final child closing).
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

CORE-042.9 was the **architecture-push** follow-up to [[CORE-042.8]]'s audit, closing [[CORE-EPIC-042]] (workflow architecture rethink) by extending [[CORE-042.2]]'s directive-Read lazy-load pattern from SPEC content to SKILL content.

**Architecture landed:**

- 3 lazy SKILL fragments at `claude/skills/task/step-{1.5,3a,3c}-*.md` (828w combined) — each opens with H1 + back-ref note + verbatim moved body. Mirrors CORE-042.2's `SPEC/<name>.md` shape.
- `claude/skills/task/SKILL.md` slimmed: 2,409w → **1,814w** (−595w / −24.7%). Step 0 resolves `SKILL_DIR`; Step 1.5 / 3a / 3c bodies replaced with directive-Read stubs that fire parallel Reads of the SPEC contract module + SKILL fragment.
- "Mixing SPEC vs interpretation" design call resolved by separating: SPEC content stays in `SPEC/` (canonical contract); SKILL content stays in `claude/skills/task/` (executable interpretation). The two surfaces never share a directory.

**Per-`/task` load impact** (PLAN-frozen structural lens, vs pre-epic 12,376w):

| Branch | Saving | % |
|---|---|---|
| Fresh task (Step 3b) | −1,565w | **−12.6%** |
| Epic subtask (Step 2) | −1,262w | −10.2% |
| Starter promotion (Step 3a) | −790w | −6.4% |
| Blocked resume (Step 3c) | −861w | −7.0% |
| Model-gate edge case (Step 1.5) | −1,165w | −9.4% |

Fresh-task structural saving lifts from CORE-042.8's −7.8% to **−12.6%** — within the audit's ~13-14% target. The slight under-shoot vs audit prediction comes from Step 1.5 dispatch staying inline (~80w retained, kept for clarity of the always-loaded gate logic) plus ~30-50w of directive-Read stub overhead.

**Decisions captured (2 user-confirmed via AskUserQuestion):**

1. **Lazy file location** — sibling files under `claude/skills/task/` (not under `SPEC/`). Sidesteps the "mixing SPEC vs interpretation" concern by keeping the two surfaces separated. Matches Claude Code's "skill bundle" model (SKILL.md + auxiliary files in the same skill dir).
2. **Step 1.5 in scope** — extracted mismatch + legacy branch bodies into a third lazy fragment; kept intro + 3-way dispatch + match-case bullet inline. The full ~13-14% target was preferable to the simpler 2-fragment ~12% saving.

**No regressions** — viz suite passed (54/54), cross-citation grep returned zero residual stale `Step 0.5 / Step 3a body / Step 3c body` references in non-archive files. SPEC.md untouched (no contract change). No SPEC version bump (mirrors CORE-042.2 precedent for SKILL-side restructures).

**No adopter-surface migration needed** — adopters get the new sibling files transparently as part of the same skill bundle when they pull a flowtron version that includes this change. `claude/CLAUDE-snippet.md` doesn't cite SKILL internals; `templates/tasknote-README.md` cites SPEC modules only.

**Method note:** The directive-Read pattern's natural extension from SPEC to SKILL was straightforward, but the design tension PLAN.md flagged ("mixes SPEC content with executable interpretation") was real — the resolution wasn't to put SKILL content in `SPEC/`, but to put it in a parallel lazy-load surface that lives alongside the SKILL it serves. Two lazy directories (`SPEC/` for contract, `claude/skills/task/` for interpretation) are clearer than one mixed directory.

**Epic close:** [[CORE-EPIC-042]] (workflow architecture rethink) closes with this child. Final per-`/task` structural saving: **−12.6% on fresh-task branch**, vs the original [[CORE-042.1]] §A4 prediction of ~17%. The remaining gap comes from PLAN.md growth (closure summaries are write-once and accumulate) and the inevitable seam overhead of any lazy-load architecture (back-ref notes + dispatch directives). The architecture is now established for both `SPEC/` and `claude/skills/task/`; future modules of either type slot in without growing the always-loaded core.

**Archived:** 2026-05-07
