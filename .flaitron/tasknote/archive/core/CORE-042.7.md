---
title: 4-phase dedup
status: completed
tags: []
created: 2026-05-06
due:
related-tasks: [CORE-042.6, CORE-EPIC-042, CORE-042.4]
---

# CORE-042.7 | 4-phase dedup

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-042.6]] [[CORE-EPIC-042]] [[CORE-042.4]]

## 🎯 Goal

Apply the surgical Shape A trim proposed in [[CORE-042.6]] §B3/§B5 — drop 4 redundant 4-phase checklist boxes in SPEC §"The 4-phase workflow" and `templates/tasknote-template.md`, preserving phase shape and viz indexing.

## ✅ Acceptance

- [ ] SPEC §"The 4-phase workflow" reflects the four dedup edits (P3 box 4 dropped; P2/P3 targeted-tests pair merged; P4 box 1 dropped; P4 PLAN-flip + archive merged)
- [ ] `templates/tasknote-template.md` checklist mirrors SPEC exactly
- [ ] `claude/skills/task/SKILL.md` Step 5 P4 paraphrase trimmed to match (drops "verify prior phases" and "fix everything you introduced" mirror language)
- [ ] Phase shape (4 phases, P1/P2/P3/P4 emoji subheadings) unchanged
- [ ] Viz `[1,2,3,4]` indexing untouched (no parser change required)
- [ ] SPEC version bumped v0.9.0 → v0.9.1 (patch — clarification only; no archived tasknote becomes invalid)
- [ ] Viz tests still pass (54/54) and tsc clean
- [ ] Non-negotiable contracts (relevance, drift, archive skim, pattern survey) all still present

## 🧩 Subtasks

- [ ] Edit `SPEC.md` §"The 4-phase workflow":
  - P2 final box: drop "Ran targeted tests on changed files" (merged into P3 box 1)
  - P3 box 1: keep "Ran targeted test suite for changed code"
  - P3 final box: drop "Fixed all introduced issues" (outcome, not step)
  - P4 box 1: drop "Verified all prior phases complete" (redundant)
  - P4: merge "Updated PLAN.md (status flipped...)" + "Moved this tasknote to archive..." into single closure box
- [ ] Sweep SPEC body prose around §"The 4-phase workflow" for any explanatory paragraphs that reference dropped/merged boxes
- [ ] Edit `templates/tasknote-template.md` Phase 2/3/4 checklists to mirror SPEC
- [ ] Edit `claude/skills/task/SKILL.md` Step 5 line 158 — drop "verify prior phases" and "fix everything you introduced" mirror phrases from the paraphrase
- [ ] Bump `SPEC.md` `**Version:**` v0.9.0 → v0.9.1
- [ ] Run viz tests + `tsc --noEmit`
- [ ] Confirm Phase 4 closure list now has 3 boxes (was 5): Update docs/inventories · Closure write (PLAN flip + archive) · Recap

## 🔗 Related

- [[CORE-042.6]] — Discovery that proposed Shape A; §B3 names the 4 dedup edits, §B4-B5 the cost/win rationale
- [[CORE-EPIC-042]] — parent epic; this is one of the implementation children
- [[CORE-042.4]] — precedent: already dropped one P4 box (nav-chip) and rewrote SPEC §"Tasknote body shape" — same surgical-trim pattern

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed today (2026-05-06) by [[CORE-042.6]] §B5 with explicit user disposition (3-option AskUserQuestion → "Ship Shape A as new child"). Predecessor closed in same session; no time has elapsed for invalidating evidence. Trim scope is small (~30-45min estimate from §B5), well-bounded by §B3's enumerated 4 edits.

- [x] Read relevant source files — `SPEC.md` §"The 4-phase workflow" (lines 226-300), `SPEC/versioning.md`, `templates/tasknote-template.md`, `claude/skills/task/SKILL.md`, `_project/tasknote/archive/core/CORE-042.6.md`
- [x] **Archive skim** — see Discovery Notes §A
- [x] **Drift check** — see Discovery Notes §B; one downstream surface beyond CORE-042.6's stated scope (SKILL.md Step 5 paraphrase); user confirmed inclusion via AskUserQuestion
- [x] Asked clarifying questions — "Should SKILL.md Step 5 cleanup be in scope?" → user picked "Include (Recommended)"; Acceptance + Subtasks updated to reflect 3-surface scope (SPEC + template + SKILL.md)
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Archive skim

`grep -l` across `_project/tasknote/archive/{core,frontend}/*.md` for the surfaces in scope (template + 4-phase workflow + closure-box text) returned 41 hits — most consume the 4-phase shape but don't shape it. Load-bearing precedents:

- **[[CORE-018]]** — original spec-on-top + log-below body shape; introduced Phase 4 nav-header closure box (later dropped by [[CORE-042.4]]). Establishes the SPEC §"Tasknote body shape" + template + skill triad pattern this trim follows.
- **[[CORE-042.4]]** — direct precedent: surgically dropped one Phase 4 box (nav-chip update) + rewrote SPEC §"Tasknote body shape" so the chip is render-derived. Same surgical-trim shape; same minor-bump motion (v0.7.0 → v0.8.0). Distinction: .4 was a minor bump because it changed a body-shape contract (chip render derivation); this task is a patch bump because it only deletes/merges checklist items without altering field/parser/contract semantics.
- **[[CORE-031]]** — added Phase 1 archive-skim box; minor bump (v0.6.2 → v0.7.0) because adding a new template section. Reverse motion of this task.
- **[[CORE-040]]** — patch-bump precedent (v0.6.0 → v0.6.1): "clarification only; no parser/schema/template change". This task touches the template but only checklist text — no field/parser/schema change → patch bump still appropriate per [[SPEC/versioning.md]] "clarifications, doc fixes, no project-side changes needed".
- **[[CORE-038]]** — established cite-don't-restate norm for SKILL.md vs SPEC. This trim's SKILL.md edit (drop two mirror phrases from Step 5 paraphrase) extends that norm — paraphrase shouldn't quote-mirror checklist box text the SPEC just deleted.
- **[[CORE-042.6]]** — direct predecessor that proposed Shape A; §B3 enumerates the 4 dedup edits, §B4 the cost matrix, §B5 the recommendation, §B6 the contracts-survival check. All re-verified against current state below.

### B. Drift check vs CORE-042.6 §B3 + scope sweep

Box-text greps confirm §B3's 4 edits target the exact box wording:

| §B3 edit | SPEC.md line | Template line | Match? |
|---|---|---|---|
| Drop P3 "Fixed all introduced issues" | 280 | 64 | ✓ exact |
| Merge P2 "Ran targeted tests on changed files" + P3 "Ran targeted test suite for changed code" | 262 + 277 | 55 + 61 | ✓ exact |
| Drop P4 "Verified all prior phases complete" | 286 | 70 | ✓ exact |
| Merge P4 "Updated PLAN.md (status flipped to ...)" + "Moved this tasknote to archive..." | 288-289 | 72-73 | ✓ exact |

No box-text drift. The §B3 enumeration is verbatim-applicable.

**Scope sweep beyond §B3:** searched `SPEC.md`, `templates/tasknote-template.md`, `claude/skills/task/SKILL.md`, `docs/MIGRATION.md`, `README.md` for the dropped box phrases. Hits:

- `SPEC.md` + `templates/tasknote-template.md` — in-scope per §B3.
- `claude/skills/task/SKILL.md:158` (Step 5 prose paraphrase of Phase 4) — out-of-scope per CORE-042.6 §B4 ("AI-driving cost: None — SKILL Step 4 wording unchanged"), but Step 5 ≠ Step 4. The Step 5 paraphrase contains "verify prior phases" + "fix everything you introduced" — both mirror dropped boxes. **User confirmed inclusion** (AskUserQuestion above). Added to Subtasks + Acceptance.
- `docs/MIGRATION.md`, `README.md` — no hits. Clean.

**Phase 2/3/4 prose around the boxes** (SPEC.md lines 264-300): two paragraphs follow the checklists ("Keep edits tightly scoped..." after Phase 2; "Run the full test suite only..." after Phase 3; "The recap has two parts..." + "The tasknote is closed when archived..." after Phase 4). None of these paragraphs reference the dropped/merged box text. The Phase 4 paragraph mentions "the recap" which still maps to the surviving recap box. Safe — no prose rewrites needed.

**Versioning verdict:** v0.9.0 → v0.9.1 patch bump per [[SPEC/versioning.md]]: this is a clarification (deduplication of redundant boxes) with no field/parser/schema change; archived tasknotes parse identically; no adopter-side action required. Echoes [[CORE-040]] precedent.

### C. Non-negotiable contracts survival re-check

Re-verified [[CORE-042.6]] §B6 against the post-edit shape:

| Contract | Box | Survives? |
|---|---|---|
| Relevance Assessment | P1 box 2 | ✓ untouched |
| Drift check | P1 box 5 | ✓ untouched |
| Archive skim | P1 box 4 | ✓ untouched |
| Pattern survey | P2 box 1 | ✓ untouched |

All four non-negotiable contracts live in P1/P2; this trim only touches P2-final / P3 / P4. Safe to ship.

### D. Final post-edit box count

Before: P1=7 + P2=4 + P3=4 + P4=5 = 20 boxes
After: P1=7 + P2=3 + P3=2 + P4=3 = **15 boxes** (-5 vs current; -1 more than §B3's "16-box" target, which counted P2/P3 targeted-tests as a single merged box in the merged half — confirmed)

Wait — re-checking §B3's arithmetic: `20 - 4 = 16`, but my post-edit count gives 15. The discrepancy: §B3 lists 4 deltas but two of them are merges (P2+P3 targeted-tests, P4 PLAN+archive); merges reduce by 1 each, not 2. Actual deltas: drop P3 box 4 (-1) + merge P2+P3 targeted-tests (-1) + drop P4 box 1 (-1) + merge P4 PLAN+archive (-1) = -4 boxes total. So 20 - 4 = 16. But Phase 2 is currently 4 boxes; if I drop P2 box 4, P2 becomes 3. If I keep P3 box 1, P3 starts at 4. If I drop P3 box 4, P3 becomes 3. Then P3=3, P2=3 → wait, P3 box 1 ("Ran targeted test suite for changed code") absorbs the merged content from P2 box 4, so P3 stays at 4 minus the box 4 drop = 3. And P2 drops box 4 = 3. So P2=3 + P3=3 = 6 (was 8) = -2. P4 drops box 1 (-1) and merges 3+4 (-1) = -2 (5 → 3). Total: -4 → 20 - 4 = 16 boxes. My math above was wrong. **Final: 16 boxes.** ✓ matches §B3.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — closest precedent is [[CORE-042.4]]'s surgical Phase 4 trim (same SPEC §"4-phase workflow" + template mirror motion). Patch-bump shape mirrors [[CORE-040]] (clarification-only, no parser/schema/template change). [[CORE-038]]'s cite-don't-restate norm justifies the SKILL.md Step 5 paraphrase trim.
- [x] Implemented the minimal solution — 4 dedup edits to SPEC.md §"The 4-phase workflow", same 4 edits mirrored to `templates/tasknote-template.md`, plus Step 5 paraphrase trim in `claude/skills/task/SKILL.md` (lines 157-158, P3 + P4 paraphrases). SPEC version bumped v0.9.0 → v0.9.1. SKILL.md hardlink confirmed (inode 80297339 — both `.claude/` and `claude/` paths in sync from a single Edit).
- [x] Updated/added tests for non-trivial behavior — n/a (no code change; doc-only trim)

**Implementation Notes:**

Final SPEC §"The 4-phase workflow" box count: P1=7 + P2=3 + P3=3 + P4=3 = **16 boxes** (was 20; -4 per [[CORE-042.6]] §B3 target). Distribution:

- P2: dropped "Ran targeted tests on changed files" (merged into P3 box 1)
- P3: dropped "Fixed all introduced issues"
- P4: dropped "Verified all prior phases complete"; merged "Updated PLAN.md..." + "Moved this tasknote to archive..." into one "Closed — ..." line

**Dogfood:** This tasknote's own Phase 2/3/4 checklists were rewritten in-flight to match the new shape — making CORE-042.7 the first tasknote to ship on the post-trim contract.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `cd viz && npm test -- --run` → 54/54 pass (parser 29 + tasknote 25); same count as pre-edit baseline.
- [x] Ran lint/type-check on changed code — `cd viz && npx tsc --noEmit` → clean (no output).
- [x] (frontend) Asked the user for visual confirmation — n/a (no UI changes; viz parser/tasknote tests already cover render-path)

**Testing Notes:**

No code touched — all edits are markdown checklists in SPEC.md, the template, and SKILL.md. Viz tests run as a sanity check that the parser/tasknote layer still parses live PLAN.md + active tasknotes correctly with the new content. No regressions.

## 🚀 Phase 4: Closure

- [x] Updated docs/inventories affected by the change — `grep -rn "v0\.9\.0\|four phase\|4-phase\|four-phase"` across README + docs/ + SPEC + SPEC/ + templates surfaced 14 hits; none reference dropped box text. All "4-phase" mentions describe the abstract phase rhythm (preserved by this trim). No additional doc edits needed beyond the three primary surfaces (SPEC.md, template, SKILL.md).
- [x] Closed — PLAN.md status flipped to `Completed 2026-05-06` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

CORE-042.7 implemented the surgical Shape A trim proposed in [[CORE-042.6]] §B5 — surface-level dedup of 4 redundant boxes in SPEC §"The 4-phase workflow" + mirrored to `templates/tasknote-template.md` + downstream paraphrase cleanup in `claude/skills/task/SKILL.md` Step 5. SPEC v0.9.0 → v0.9.1 (patch — clarification only).

**Edits landed (-4 boxes; 20 → 16 total):**

| Edit | Surface line(s) |
|---|---|
| Phase 2: drop "Ran targeted tests on changed files" (merged into P3 box 1) | SPEC.md:262 + template:55 |
| Phase 3: drop "Fixed all introduced issues" (outcome, not step) | SPEC.md:280 + template:64 |
| Phase 4: drop "Verified all prior phases complete" (redundant — if you can't tick closure boxes, prior phases aren't complete) | SPEC.md:286 + template:70 |
| Phase 4: merge "Updated PLAN.md..." + "Moved this tasknote to archive..." → "Closed — ..." | SPEC.md:288-289 + template:72-73 |

**Final phase distribution:** P1=7 + P2=3 + P3=3 + P4=3 = 16 boxes.

**Decisions and notable findings:**

- **SKILL.md scope expansion** — Phase 1 drift-check surfaced that `claude/skills/task/SKILL.md` Step 5 line 158 paraphrase contained "verify prior phases" + "fix everything you introduced" mirror language. CORE-042.6 §B4's "AI-driving cost: None — SKILL Step 4 wording unchanged" claim referenced phase-gating language only (Step 4); Step 5 prose paraphrase was out of that claim's scope. User confirmed inclusion via AskUserQuestion. Edits the SKILL.md downstream paraphrase consistent with the SPEC checklist per [[CORE-038]]'s cite-don't-restate norm.
- **Patch bump rationale** — followed [[CORE-040]] precedent: clarifications/dedup with no parser/schema/template-section change → patch bump. The template *content* changes here (boxes deleted) but no field is added/removed; existing parser tolerates the new shape (proven by 54/54 viz tests passing).
- **Hardlink atomicity** — single Edit to `claude/skills/task/SKILL.md` updated `.claude/skills/task/SKILL.md` simultaneously (inode 80297339 confirmed shared per [[CORE-032]]/[[CORE-038]] findings).
- **Dogfood** — this tasknote's own Phase 2/3/4 checklists were rewritten in-flight to the new shape, making it the first tasknote to ship on the post-trim contract.
- **Box-count math correction** — initial drafting in §D miscounted. The 4 deltas net to -4 (drop -1, merge -1, drop -1, merge -1; drops of P2 box 4 + P3 box 4 reduce P2 + P3 by 1 each, totaling -2 across P2/P3; P4 drop + P4 merge reduce P4 by -2). 20 → 16 ✓ matches §B3.
- **Non-negotiable contracts** — all four (Relevance / Drift / Archive skim / Pattern survey) live in P1 box 2 / P1 box 5 / P1 box 4 / P2 box 1 respectively; none touched by this trim.

**Verification:** 54/54 viz tests pass; `tsc --noEmit` clean; SKILL.md hardlink intact.

**Children remaining under [[CORE-EPIC-042]]:** CORE-042.8 (audit) — the parent epic line stays open per SPEC §"Epic lifecycle" until .8 ships.

**Out-of-task items (none filed):**

- The Future Opportunities marker option for radical phase-shape rethink (Shape B continuous-flow flat list) was explicitly rejected in [[CORE-042.6]] §B5 — case has weakened, not strengthened, post-hybrid; no Future-Opportunities filing needed.
- viz `[1,2,3,4]` phase indexing refactor remains an implicit concern from [[CORE-042.5]] (micro tasknotes show "Phase 4 active"); Shape A doesn't change phase counts so creates no new pressure.

**Archived:** 2026-05-06

**Final Summary:**

**Archived:** YYYY-MM-DD
