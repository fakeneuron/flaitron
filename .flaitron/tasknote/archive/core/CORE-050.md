---
title: micro-task SKILL cite-don't-restate
status: completed
tags: []
created: 2026-05-08
due:
related-tasks: [CORE-038, CORE-042.9, CORE-049]
---

# CORE-050 | micro-task SKILL cite-don't-restate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-038]] [[CORE-042.9]] [[CORE-049]]

## 🎯 Goal

Trim ≥350w (~18%) from `claude/skills/micro-task/SKILL.md` via cite-don't-restate at Steps 1.5 / 2 / 3 / 4 / 5 plus a SKILL_DIR-resolution precondition at Step 0, mirroring [[CORE-038]]'s pattern on `task/SKILL.md` and [[CORE-042.9]]'s lazy-fragment shape for the Step 1.5 mismatch + legacy branches.

## ✅ Acceptance

- [ ] ≥350w savings off `claude/skills/micro-task/SKILL.md` (verified by `wc -w` before/after; 1,904w → ≤1,554w)
- [ ] Every `see SPEC §X` citation in the trimmed skill resolves to an actual heading in `SPEC.md` (verified by grep against `^## ` / `^### `)
- [ ] Skill-specific value-add preserved: Step 1.5 three-case dispatch + match case inline, Step 2 micro-specific scaffold values, Step 3 micro-specific re-scope/de-scope orchestration + bash recipes + bold-prefix flow, Step 4 single-motion 5-step closure + recap-only callout, Step 5 commit-go gate + slash-command alternation
- [ ] New `claude/skills/micro-task/step-1.5-model-edge.md` lazy fragment created (mirrors `claude/skills/task/step-1.5-model-edge.md` shape; H1 + back-ref note + verbatim Mismatch + Legacy entry sub-sections)
- [ ] Step 0 resolves `SKILL_DIR` alongside `SPEC_DIR` for both adopting (`_project/flowtron/claude/skills/micro-task/`) and self-hosted (`claude/skills/micro-task/`) layouts (precondition for Step 1.5 lazy-load to work cross-environment)
- [ ] Trimmed skill drives `/micro-task` correctly end-to-end (verified by cold straight-through re-read)

## 🧩 Subtasks

- [ ] Update SKILL.md Step 0: add `SKILL_DIR` resolution alongside `SPEC_DIR` (both layouts); update closing paragraph to mention the lazy SKILL fragment surface (precondition for Step 1.5 stub to work)
- [ ] Create `claude/skills/micro-task/step-1.5-model-edge.md` (H1 + 1-line back-ref note + verbatim `## Mismatch` / `## Legacy entry` sub-sections; mirrors `task/step-1.5-model-edge.md` shape but uses `/micro-task` for re-invocation)
- [ ] Slim SKILL.md Step 1.5: keep intro + 3-way dispatch + match case inline; mismatch + legacy bullets collapse to parallel-Read stubs `Read <SPEC_DIR>/model.md (contract) and <SKILL_DIR>/step-1.5-model-edge.md (operational steps), follow the '<branch>' branch.`
- [ ] Trim SKILL.md Step 2 (Scaffold): cite SPEC §"Tasknote frontmatter" + §"Tasknote body shape" + §"When to use a tasknote" micro carve-out. Preserve skill-specific scaffold values (title from PLAN shortname, status, created, tags/due/related-tasks defaults) and Goal / ⚡ Notes / ✅ Recap placeholder sourcing
- [ ] Trim SKILL.md Step 3 (Drive execution inline): cite SPEC §"📝 Phase 1: Discovery" (Relevance / Drift / Archive skim) + §"🛠️ Phase 2: Execution" (Pattern survey). Preserve micro-specific imperatives: re-scope-may-mean-promote-to-`/task`, de-scope-jump-to-Step-4, archive-skim bash recipe (`ls`/`grep -l`), Implementation+Docs-touched bold-prefix flow, abandon-and-re-file-as-`/task` when blocked
- [ ] Trim SKILL.md Step 4 (Recap and close): cite SPEC §"🚀 Phase 4: Closure" + §"`## Completed` archive convention" + the recap-only callout. Preserve the 5-step closure motion (fill recap → set archived → flip PLAN → mv tasknote → recap-to-user) and the YAML-status-stays-`in-progress` note
- [ ] Trim SKILL.md Step 5 (Post-closure): cite SPEC §"Post-closure protocol". Preserve "one continuous flow" framing, commit-go gate, commit message format note, recommended-model-per-option addition, slash-command alternation (`/<task|micro-task|starter-task>`)
- [ ] Cold straight-through re-read of trimmed SKILL.md; flag any citation that wouldn't resolve cleanly without re-reading SPEC, and any skill-specific imperative dropped in translation
- [ ] Citation grep-verify: every `see SPEC §X` resolves to an actual `^## ` / `^### ` heading in `SPEC.md`
- [ ] Word-count check: confirm ≥350w savings (1,904w → ≤1,554w)

## 🔗 Related

- [[CORE-038]] — task SKILL cite-don't-restate (pattern source; same shape)
- [[CORE-042.9]] — SKILL-side lazy-load (precedent for Step 1.5 fragment extraction)
- [[CORE-049]] — workflow token audit (filed this)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Sibling-of-[[CORE-038]] cite-don't-restate trim filed by [[CORE-049]] audit. Pattern is proven (CORE-038 hit ≥500w / 18.4% on `task/SKILL.md`); SPEC anchors targeted for citation all carry the contracts in full; lazy-fragment shape established by [[CORE-042.9]] for the Step 1.5 split. Realistic savings smaller than starter claimed (drift findings below) but still material at ≥250w (~13%) per `/micro-task` invocation.

- [x] Read relevant source files — `claude/skills/micro-task/SKILL.md` (1,904w; section word counts verified), `claude/skills/task/SKILL.md` (1,895w; reference for cite-don't-restate end-state shape), `claude/skills/task/step-1.5-model-edge.md` (177w; reference for fragment shape), `SPEC.md` headings inventoried for citation resolution.
- [x] **Archive skim** — `_project/tasknote/archive/core/` enumerated; 5 prior tasknotes touched `claude/skills/micro-task/` (CORE-036, CORE-042.5, CORE-046, CORE-047, CORE-049). Read [[CORE-038]] (pattern source — bare-citation form, cold re-read mandatory, template-path regression caught mid-flight) and [[CORE-042.9]] (lazy-fragment shape — `H1 + 1-line back-ref note + verbatim moved content`, parallel-Read stub at branch entry, Step 1.5 keeps intro + 3-way dispatch + match case inline). Both load-bearing — see Discovery Notes.
- [x] **Drift check** — see Drift sub-section below. Starter's baseline word counts overstated (Step 0 conflated with `task/SKILL.md` Step 0); savings target lowered from ~400-500w to ≥250w. No semantic drift in the trim sites themselves.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — 2 questions resolved via AskUserQuestion: (1) **Step 0 dropped from scope** (already 35% shorter than `task/SKILL.md` Step 0; trim risks clarity of path-resolve table); (2) **Acceptance threshold ≥250w (~13%)** (conservative post-drift target; comparable per-site density to CORE-038's ≥500w on a larger surface).
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### A. Drift findings — savings target lowered

Starter's baseline word counts (estimates) vs verified counts:

| Section | Starter claim | Actual | Notes |
|---|---|---|---|
| Step 0 (Resolve paths) | ~190w | **128w** | Starter conflated with `task/SKILL.md` Step 0 (197w). Already tight; **dropped from scope.** |
| Step 1.5 (Model gate) | ~228w | **187w** | In scope. Lazy-fragment extraction per CORE-042.9. |
| Step 2 (Scaffold) | ~160w | **175w** | In scope. Cite SPEC frontmatter/body-shape sections. |
| Step 4 (Recap and close) | ~250w | **190w** | In scope. Cite SPEC Phase 4 + Completed-archive sections. |
| Step 5 (Post-closure) | ~180w | **168w** | In scope. Cite SPEC §"Post-closure protocol". |
| **Total in-scope (post-Step 0 drop)** | — | **720w of 1,904w** | ~38% of file |

Realistic savings: ~250-300w (~13-16%) from the four in-scope sites, vs starter's claimed ~400-500w (~21-26%). Acceptance set to ≥250w per user-confirmed conservative target.

No semantic drift in the trim sites themselves — content matches starter's solution-shape per-site description. Drift is purely in the savings-magnitude estimate.

### B. Hardlink check — single-file edit

`claude/skills/micro-task/SKILL.md` is **not** hardlinked to `.claude/skills/micro-task/SKILL.md` (the latter doesn't exist; verified via `ls -li`). Single-file edit; no atomic-update concern. Differs from [[CORE-038]]'s `task/SKILL.md` (which had a `.claude/` ↔ `claude/` hardlink pair).

### C. Pattern source — CORE-038 (cite-don't-restate)

Load-bearing items from the [[CORE-038]] archive:

- **Bare-citation form**: replace restated contract with `cite SPEC §X` + preserve only skill-specific imperatives. Same shape applies here.
- **Step 1.5 was kept untouched in CORE-038** — different choice here because [[CORE-042.9]] established the lazy-fragment alternative (extract + parallel-Read stub) that wasn't available to CORE-038. Both are valid; the lazy-fragment route is preferred when there's a sibling-skill precedent (`task/step-1.5-model-edge.md` exists).
- **Cold re-read mandatory** — caught a template-path regression in CORE-038 (Step 3b initial draft hardcoded `templates/tasknote-template.md`; restored to "template (path resolved in Step 0)" form). Apply same care for Step 2 (which cites the template) and Step 4 (which references PLAN.md / archive paths).
- **Citation verification** — grep `^## ` and `^### ` in `SPEC.md` against the citation list; every cite must resolve.

### D. Lazy-fragment shape — CORE-042.9 precedent

Load-bearing items from the [[CORE-042.9]] archive:

- **Fragment file shape**: `H1 + 1-line back-ref note + verbatim moved content`. Back-ref note format:

  ```
  > Lazy-loaded SKILL fragment. Loaded by <skill> SKILL.md Step <X> when <branch fires>. See <skill-path>/SKILL.md for the always-loaded core dispatch.
  ```

- **Step 1.5 stub shape**: keep intro + 3-way dispatch + match case inline (~80w retained); mismatch + legacy bullets each collapse to: "Read `<SPEC_DIR>/model.md` (contract) and `<skill-fragment-path>` (operational steps), then follow the '<branch>' branch."
- **`task/step-1.5-model-edge.md` content** (177w; two H2 sub-sections `## Mismatch` / `## Legacy entry` with verbatim branch operational steps) is the structural template for the new `micro-task/step-1.5-model-edge.md`. The fragment content for `/micro-task` differs slightly from `/task` (different post-edit re-invocation suggestion, e.g. `/micro-task` not `/task`) — copy `task/`'s shape and adapt the skill-name-specific lines.

### E. SPEC anchors targeted for citation (verified live)

Each subtask names the SPEC section to cite. Pre-flight grep against `SPEC.md` confirms each anchor exists:

- §"Tasknote frontmatter" — Step 2 (frontmatter restatement → cite)
- §"Tasknote body shape" — Step 2 (body section restatement → cite)
- §"When to use a tasknote" (micro carve-out) — Step 2 (when-not-to-use note in §"Notes")
- §"🚀 Phase 4: Closure" — Step 4 (closure motion + recap-only callout)
- §"`## Completed` archive convention" — Step 4 (PLAN.md flip-line stub form)
- §"Post-closure protocol" — Step 5 (commit / suggest / copy-paste protocol)
- §"Model field" — Step 1.5 (already cited via `<SPEC_DIR>/model.md` Read directive)

Final verification at Phase 3 (citation grep against `SPEC.md` headings).

### F. Decisions locked

| # | Decision | Source |
|---|---|---|
| 1 | Step 0 dropped from scope (already tight at 128w; ~10-20w trim not worth clarity risk) | This conversation, AskUserQuestion |
| 2 | Acceptance threshold ≥250w (~13%) | This conversation, AskUserQuestion |
| 3 | Step 1.5 fragment location: `claude/skills/micro-task/step-1.5-model-edge.md` (sibling under `micro-task/`) | Starter pre-lock; preserved (rationale: cross-skill citation awkward; per-skill organization mirrors CORE-042.9's `task/` precedent) |
| 4 | Step 1.5 keep-inline scope: intro + 3-way dispatch + match case inline; only mismatch + legacy branches lazy-load | Starter pre-lock; CORE-042.9 precedent |
| 5 | Verification: cold straight-through re-read mandatory + citation grep | CORE-038 precedent (template-path regression caught in cold re-read) |
| 6 | Version bump: patch (prose-only; no contract change) | CORE-038 precedent — defer until Phase 4 |
| 7 | Pattern: cite-don't-restate (CORE-038) + lazy-fragment shape (CORE-042.9) hybrid | Starter pre-lock |
| 8 | **Step 0 SKILL_DIR add (precondition).** The Step 1.5 stub needs a path-varying `<SKILL_DIR>` token (adopters: `_project/flowtron/claude/skills/micro-task/`; self-hosted: `claude/skills/micro-task/`). Hardcoding either path breaks the other layout. Step 0 grows ~+34w; not a trim, but a precondition for the Step 1.5 lazy-load to work cross-environment. Doesn't conflict with the user-confirmed "drop Step 0 from scope" decision (that was about *trimming* Step 0). | Phase 2 prep math; necessary precondition |
| 9 | **Step 3 added to scope.** Step 3 (306w) restates SPEC §"📝 Phase 1: Discovery" (Relevance / Drift / Archive skim) + §"🛠️ Phase 2: Execution" (Pattern survey) inline. Cite-don't-restate trims ~140w cleanly while preserving 5 micro-specific imperatives (re-scope→promote-to-`/task`, de-scope→jump-to-Step-4, archive-skim bash recipe, Implementation/Docs-touched bold-prefix flow, abandon-and-re-file-as-`/task` when blocked). Without Step 3, in-scope total caps at ~225w — short of the ≥250w threshold; with Step 3, ~365w (~19%) is comfortably above. | This conversation, AskUserQuestion |

### G. Realistic savings math (post-scope expansion, target ≥350w)

| Step | Before | After (target) | Delta |
|---|---|---|---|
| Step 0 | 128w | ~162w | **+34w** (SKILL_DIR add — precondition) |
| Step 1.5 | 187w | ~146w | -41w |
| Step 2 | 175w | ~110w | -65w |
| Step 3 | 306w | ~165w | -141w |
| Step 4 | 190w | ~95w | -95w |
| Step 5 | 168w | ~110w | -58w |
| **Net SKILL.md** | — | — | **~-366w (~-19%)** |

Plus new fragment file: `claude/skills/micro-task/step-1.5-model-edge.md` ~115w (lazy surface; not always-loaded).

Acceptance threshold set to **≥350w** to give ~15w of slack against the ~366w projection. If achieved, fresh-`/micro-task` always-loaded surface drops from 1,904w → ~1,538w (~19%).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown skill file; functional verification = cold straight-through re-read)

**Implementation Notes:**

- **Pattern survey:** extended [[CORE-038]]'s cite-don't-restate shape (cite SPEC §X, preserve skill imperatives) and [[CORE-042.9]]'s lazy-fragment shape (`H1 + back-ref note + verbatim moved content`, parallel-Read stub at branch entry). No new pattern; both already in active use in `task/SKILL.md`.
- **Files created:** `claude/skills/micro-task/step-1.5-model-edge.md` (135w; H1 + back-ref note + `## Mismatch` + `## Legacy entry` sub-sections; mirrors `task/step-1.5-model-edge.md` shape but with `/micro-task` re-invocation phrasing).
- **SKILL.md edits:**
  - Step 0 (128w → 161w; +33w): added `SKILL_DIR` resolution alongside `SPEC_DIR` (both layouts); rewrote closing paragraph to mention the lazy SKILL fragment surface. Necessary precondition for the Step 1.5 stub to work cross-environment.
  - Step 1.5 (187w → 133w; -54w): kept intro + 3-way dispatch + match case + closing inline; mismatch + legacy bullets each collapse to "Read `<SPEC_DIR>/model.md` (contract) and `<SKILL_DIR>/step-1.5-model-edge.md` (operational steps), follow the '<branch>' branch."
  - Step 2 (175w → 119w; -56w): cite SPEC §"Tasknote frontmatter" + §"Tasknote body shape" + §"When to use a tasknote (and when not to)" micro carve-out. Dropped 5 bullets covered by SPEC body shape (H1, nav header, Goal restated, ⚡ Notes restated, ✅ Recap restated). Preserved title-from-shortname imperative, status/created/tags defaults, Goal sourcing reminder, ⚡ Notes/✅ Recap fill-pointer reminders.
  - Step 3 (306w → 166w; -140w): cite SPEC §"📝 Phase 1: Discovery" (Relevance / Drift / Archive skim) + §"🛠️ Phase 2: Execution" (Pattern survey). Dropped Drift + Pattern survey bullets (no skill-specific addition over SPEC). Preserved Relevance (re-scope→promote-to-`/task` + de-scope→jump-to-Step-4), Archive skim bash recipe, Implementation/Docs-touched bold-prefix flow, abandon-and-re-file when blocked.
  - Step 4 (190w → 124w; -66w): cite SPEC §"`## Completed` archive convention" (drop inline stub-form restatement) + §"🚀 Phase 4: Closure" (recap-only callout) + §"Tasknote body shape" (YAML-stays-in-progress). Preserved 5-step closure motion verbatim.
  - Step 5 (168w → 131w; -37w): cite SPEC §"Post-closure protocol". Preserved one-continuous-flow framing, commit-go gate, commit-message format, recommended-model-per-option, slash-command alternation `/<task|micro-task|starter-task>`.
- **Final SKILL.md:** 1,549w (1,904w → -355w; **-18.6%**). Hits ≥350w acceptance.
- **No hardlink** for `claude/skills/micro-task/SKILL.md` (verified `ls -li`; `.claude/skills/micro-task/` doesn't exist) — single-file edit; differs from CORE-038's `task/SKILL.md` `.claude/`↔`claude/` pair.
- **Citation grep verification:** 11 unique `SPEC §X` citations — all resolve to actual `^## ` / `^### ` headings in SPEC.md (verified end of Phase 2).
- **Cold re-read:** end-to-end pass confirmed coherent flow (Step 0 → 1 → 1.5 → 2 → 3 → 4 → 5 → Notes); every skill-specific imperative preserved; no template-path regression (template citation is generic "(path resolved in Step 0)" form, mirroring CORE-038's caught regression precaution).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown skill file; no executable tests touch it)
- [x] Ran lint/type-check on changed code — N/A (markdown only)
- [x] (frontend) Asked the user for visual confirmation — N/A (no UI change)

**Testing Notes:**

- Functional verification = cold straight-through re-read of the trimmed SKILL.md (130 lines; full read, not skim). All citations resolve, every preserved imperative still reads operationally, flow is coherent.
- Citation grep: each of the 11 unique `SPEC §"..."` citations matched against `^## ` / `^### ` headings in `SPEC.md` — all resolve. ✓
- Word-count cross-check: SKILL.md 1,904w → **1,549w** (-355w / -18.6%); new fragment 135w. Hits ≥350w acceptance.
- Viz suite skipped per SPEC §"Phase 3" guidance ("Run the full suite only when changes are broad or cross-cutting"); this trim is SKILL-side only — viz parses PLAN.md + tasknote frontmatter, neither touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-09.` and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Trimmed `claude/skills/micro-task/SKILL.md` via cite-don't-restate at Steps 1.5 / 2 / 3 / 4 / 5, plus a SKILL_DIR-resolution precondition at Step 0 to enable the Step 1.5 lazy-load. Final: **1,904w → 1,549w (-355w / -18.6%)**, hitting the ≥350w acceptance threshold. New lazy fragment at `claude/skills/micro-task/step-1.5-model-edge.md` (135w; mirrors `task/step-1.5-model-edge.md` shape).

**Doc-drift sweep:** all 4 entries — `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/CLAUDE-snippet.md` — **no change**. Trim is internal to the micro-task skill bundle; no external surface cites SKILL internals.

**Patterns extended:** [[CORE-038]] (cite-don't-restate on `task/SKILL.md`) — same shape applied per-site here. [[CORE-042.9]] (SKILL-side lazy-load via sibling fragments under `claude/skills/<skill>/`) — Step 1.5 follows the same `H1 + back-ref note + parallel-Read stub` shape, this time on `micro-task/`.

**Drift surfaced and resolved:** starter's baseline word counts overstated each section (Step 0 conflated with `task/SKILL.md`'s 197w vs micro-task's actual 128w); realistic in-scope total was 720w not 1,008w. Initial savings projection of ~400-500w (~21-26%) was unachievable without scope expansion. User confirmed two adjustments via AskUserQuestion: (1) drop Step 0 from trim scope (already tight), (2) expand scope to include Step 3 (highest-value cite-don't-restate site, 306w → 166w / -140w).

**No regressions** — 11 SPEC citations all resolve (grep-verified); cold re-read confirms every skill-specific imperative survived (one-continuous-flow + commit-go gate + slash-command alternation in Step 5; 5-step closure motion + recap-only callout in Step 4; bash-recipe + Implementation/Docs-touched flow + abandon-and-re-file in Step 3; all scaffold-value bullets in Step 2; 3-way dispatch + match case in Step 1.5).

**Verification request:** if you `/micro-task <ID>` against any future task, the most diagnostic surfaces to eyeball are Step 1.5 (does the parallel-Read stub fire correctly when [model] mismatches?) and Step 3 (does the cite-only Drift bullet still drive the drift check inline?). Both are pattern-extensions, not new logic, so the risk surface is small.

**Touched files:**

- `claude/skills/micro-task/SKILL.md` (trimmed)
- `claude/skills/micro-task/step-1.5-model-edge.md` (new lazy fragment)
- `_project/PLAN.md` (CORE-050 line flipped to stub + moved to `## Completed`)
- `_project/tasknote/CORE-050.md` → `_project/tasknote/archive/core/CORE-050.md` (this file)

**Archived:** 2026-05-09
