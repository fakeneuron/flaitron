---
title: moderate-tier-contract
status: completed
tags: []
created: 2026-10-20
due:
related-tasks: [CORE-EPIC-815, CORE-815.1, CORE-815.3]
touches:
  - SPEC.md
  - SPEC/model.md
  - SPEC/cue-vocabulary.md
  - SPEC/task-line-segments.md
  - SPEC/post-closure.md
  - SPEC/unattended-candidacy.md
  - SPEC/plan-parser.md
  - SPEC/fixtures/plan/*.md
  - SPEC/fixtures/plan/*.json
---

# CORE-815.2 | moderate-tier-contract

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-815]]

## 🎯 Goal

Rename the `[medium]` model tier to `[moderate]` across the SPEC contract and the plan fixtures, state `[medium]` as a permanent read-only legacy alias (writers emit `[moderate]`), and draft the optional adopter open-row sed migration beside the alias rule in `SPEC/model.md`.

## ✅ Acceptance

- [x] `SPEC.md` §"Model field" ladder and bullet name `moderate`; §"Priority levels" `Medium` and `/code-review medium` unchanged — `grep -q 'light  <  moderate  <  heavy' SPEC.md && grep -q '^- \*\*Medium\*\* — standard' SPEC.md && grep -q '/code-review medium' SPEC.md`
- [x] `SPEC/model.md` uses `moderate` for every tier meaning, states the legacy-alias rule (gate tier match, candidacy, parser; writers emit `[moderate]`), and carries the optional open-row sed — `grep -n -i medium SPEC/model.md` → hits only in the alias paragraph and §"Effort vocabulary"
- [x] `SPEC/cue-vocabulary.md` 🧩 label is `MODERATE` — `grep -q 'MODERATE' SPEC/cue-vocabulary.md && ! grep -q 'MEDIUM' SPEC/cue-vocabulary.md`
- [x] `SPEC/task-line-segments.md`, `SPEC/post-closure.md` carry no tier `[medium]` — `! grep -n '\[medium\]' SPEC/task-line-segments.md SPEC/post-closure.md`
- [x] `SPEC/unattended-candidacy.md` clause 1 (and its two echoes) admit `[moderate]` with legacy `[medium]` named once — `grep -n '\[medium\]\|\[moderate\]' SPEC/unattended-candidacy.md` reviewed
- [x] `SPEC/plan-parser.md` glyph tolerance names `moderate` and a legacy-`[medium]` paragraph sits beside the `## Critical` one — `grep -n -i 'medium\|moderate' SPEC/plan-parser.md` reviewed
- [x] Fixtures move to `[moderate]`, one legacy `[medium]` alias row retained, JSON hand-edited to match; the reference parser still conforms — `npm --prefix viz test`
- [x] The sed rewrites only open-row `[medium]` model tokens (glyph kept; closed rows, priority headings and descriptions untouched) — scratch run on a sample PLAN, diff recorded in Testing Notes
- [x] Drift checks and budgets pass — `bash tools/drift-checks.sh`
- [x] Vendor effort `medium` and `## Medium` priority unchanged — `git diff -U0 | grep '^-[^-]' | grep -i medium` reviewed: every removed hit is a tier meaning (`judgment` — no command separates the three axes)

## 🧩 Subtasks

- [x] `SPEC.md` §"Model field": ladder + bullet → `moderate`; one alias clause
- [x] `SPEC/model.md`: every tier `[medium]` / `medium`-tier → `moderate`; add the legacy-alias paragraph with the optional sed
- [x] `SPEC/cue-vocabulary.md`: 🧩 glyph-reuse row, next-task row, fallback label list, ladder mirror
- [x] `SPEC/task-line-segments.md`: primary-label list + DEPLOY-012 example
- [x] `SPEC/post-closure.md`: candidate-label list + example row
- [x] `SPEC/unattended-candidacy.md`: clause 1 + the `.N` and split echoes
- [x] `SPEC/plan-parser.md`: glyph tolerance + legacy-`[medium]` paragraph
- [x] Fixtures: rename `[medium]` rows to `[moderate]`, keep one legacy alias row, hand-edit JSON `model`/`shortname`
- [x] Phase 3: viz tests, drift checks, sed scratch run, External review

## 🔗 Related

- [[CORE-EPIC-815]] — parent epic (moderate-tier-rename)
- [[CORE-815.1]] — Discovery: surface inventory and resolved scoping
- [[CORE-815.3]] — next: viz parser tests encode the alias rule stated here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.1` scoped this child with the alias + migration resolution; HEAD still carries `[medium]` everywhere it listed. The rename is wording plus one alias rule, and parser logic does not change.

- [x] Read relevant source files — `SPEC.md` §"Priority levels" + §"Model field", `SPEC/model.md` (gate, calibration, round-up, typical work, worked case, glyph map), `SPEC/cue-vocabulary.md` glyph rows, `SPEC/unattended-candidacy.md` clauses 1/6 + split, `SPEC/plan-parser.md` tolerances, `SPEC/fixtures/plan/README.md`, `docs/MIGRATION.md` §"Pinning and bumping", `tools/update-adopters.mjs` `migrationBearingTags`

- [x] **Best Practices Review** — N/A: vocabulary rename plus one alias rule; no module boundary changes

- [x] **Archive skim** — `archive/core/` confirmed against the README table (1,056 notes; 128 cite `SPEC/model.md`). `.1` already skimmed the load-bearing ones (CORE-482.1, CORE-259, CORE-353.3); a grep for "legacy alias" / "read-only alias" hits only CORE-815.1. Live precedent: `SPEC/plan-parser.md`'s legacy `## Critical` soft-migrate paragraph, which already uses this compat shape (old form parses as the new one, migration optional).

- [x] **Drift check** — every `.1` surface still carries `[medium]` at HEAD c5542ba0; the PLAN line matches `.1`'s resolution; no other SPEC module carries a tier `medium` (the rest are `## Medium` priority or `/code-review medium` effort)

- [x] Asked clarifying questions — resolved via AskUserQuestion; see Discovery Notes

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

*Resolved:*

| Question | Resolution |
|---|---|
| Sed home | Paragraph on the alias rule in `SPEC/model.md`. It has no version number and adopters can run it any time; the tag message points at it. |
| Tag framing | **Optional.** The Migration block opens with "No required project-side edits" and then gives the optional sed. `update-adopters.mjs` `migrationBearingTags` keeps auto-bumping the fleet, and the alias keeps unmigrated rows valid. |

*Assumptions:*

- The parser stores the token raw (`model: "medium"` stays `"medium"`). The alias is semantic and lives in readers: the gate, candidacy and glyph bucketing. Fixture JSON therefore follows the `.md` token one for one.
- Fixture alias row: `tolerances.md` FX-161 (`[medium]🧩`, closed) keeps `[medium]` as the legacy case, and its shortname is renamed to say so. Every other `[medium]` row moves to `[moderate]`. No line numbers shift.
- Budgets: `post-closure.md` 9,603/10,000 (+4 bytes); `SPEC.md` 43,366/49,000; `model.md` unbudgeted.
- `.flaitron/PLAN.md` rows `.4` / `.N` stay `[medium]` (`.4`'s own sweep renames them), as do the skill / docs / template prose (`.4`) and viz (`.3`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the `SPEC/plan-parser.md` legacy `## Critical` soft-migrate shape: the old form reads as the new one, and migration is optional cleanup

- [x] **Minimal refactor gate** — no refactor; line-addressed renames plus two new paragraphs

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — fixtures moved to `[moderate]`, and FX-161 kept as the legacy `[medium]` alias case (JSON hand-edited per the fixtures README rule; no line numbers shifted)

**Implementation Notes:**

- `SPEC/model.md`: 17 tier renames (ladder, gate intro, calibration, table, round-up default, typical work, worked case, primary labels, glyph map). New **Legacy `[medium]` alias** paragraph plus the optional open-row sed, placed after the ladder block in §"Category-vs-concrete matching". `[medium]` is also named inline in both category-tag lists and the glyph map (review notes 2–3). §"Effort vocabulary" `medium` kept.
- `SPEC.md` §"Model field": ladder + `moderate` bullet with a one-line alias clause. The gate's Satisfied path never reads `model.md`, so the alias has to be visible in the always-loaded core.
- `SPEC/cue-vocabulary.md`: 🧩 label `MEDIUM` (moderate) → `MODERATE`; the old gloss was the new label's own word.
- `SPEC/unattended-candidacy.md`: clause 1 admits `[moderate]` (legacy `[medium]` included); the `.N` and split echoes name `[moderate]`.
- `SPEC/plan-parser.md`: glyph tolerance → moderate, plus a legacy-`[medium]` paragraph beside the `## Critical` one (stored as written; readers alias).
- `SPEC/task-line-segments.md`, `SPEC/post-closure.md`: labels and examples → `[moderate]`. post-closure now says a legacy row prints `[moderate]🧩` (review note 4).
- Fixtures: 9 rows across canonical / markers / rotated-history / tolerances → `[moderate]`; FX-161 stays `[medium]🧩` with shortname `closed legacy alias with glyph`; README Covers row, tolerances header and `describes` name the case.
- **Release tag draft (for `/ft-release`):** Migration block opens `No required project-side edits.`, so `migrationBearingTags` keeps the fleet auto-bump. Then: *Optional — the `[medium]` model tier is now `[moderate]`; `[medium]` stays a permanent read-only alias. To migrate open rows, run the sed in `SPEC/model.md` §"Category-vs-concrete matching" → "Legacy `[medium]` alias" from the project root.*

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test` (fixture conformance)

- [x] Ran lint/type-check on changed code — N/A: no TypeScript changed

- [x] **Verification receipt** — see Testing Notes; no duplication or dead prose left behind

- [x] **External review** — `/code-review medium` on the working-tree diff: 6 notes, 0 blockers; dispositions below

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- A1 SPEC.md grep trio → 0
- A2 `grep -n -i medium SPEC/model.md` → hits only in the alias paragraph, the two category lists' and glyph map's `(legacy [medium])`, and §"Effort vocabulary"
- A3 cue-vocabulary MODERATE / no MEDIUM → 0
- A4 `! grep '\[medium\]'` segments + post-closure → 0 (post-closure's added `legacy [medium] prints` clause landed after this run; it is an alias statement, not a tier use)
- A5 candidacy grep → clause 1 names `[moderate]` + legacy `[medium]`; echoes `[moderate]`
- A6 plan-parser grep → glyph tolerance moderate; legacy paragraph present
- A7 `npm --prefix viz test` → 0 (29 files, 614 tests), re-run after review fixes → 0
- A8 sed scratch run → 0. It rewrites open rows (plain, `[!critical]`, ⏸ chip + 🧩 glyph, nested child + `[unattended]`, open row under `## Medium`, tab indent, and double-space gaps after the review fix). It leaves alone the closed row, a code-span `[medium]` in a description, `[mediumish]`, stacked `[fable] [medium]` and the `## Medium` heading. No `.bak` remains.
- A9 `bash tools/drift-checks.sh` → 0 (re-run after fixes → 0); budgets: SPEC.md 43,433/49,000, post-closure.md 9,651/10,000, task-line-segments.md 6,203/10,000
- A10 `git diff -U0 | grep '^-[^-]' | grep -i medium` → every removed hit is a tier meaning; `## Medium`, `/code-review medium`, effort `medium` and the exclusions near-miss heading are untouched

*External review dispositions (all notes):*

1. Sed matched single spaces only, while the parser accepts `\s+` → **fixed** (`[[:space:]]+` at each gap; re-tested).
2. Category-tag lists omitted `[medium]`, so a literal reader could take the concrete branch → **fixed** (inline `(legacy [medium])` at lines 24 and 55).
3. Glyph map lacked `[medium]` → **fixed** (inline in the map).
4. Suggestion print for a legacy row was unspecified → **fixed** (post-closure: prints `[moderate]🧩`).
5. Candidacy `.N` and split echoes name only `[moderate]` → **no change**. A split row is a new write, and writers emit `[moderate]`. The `.N` echo is a parenthetical under clause 1, which governs and names the alias.
6. 🧩 cue row lost its parenthetical → **no change**. The old gloss `(moderate)` is now the label itself, and post-closure's prose slot still reads "moderate", so the lists still line up.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change for every entry (README.md, AGENTS.md, SPEC.md beyond this task's own §"Model field" edit, docs/MIGRATION.md, the claude/codex/cursor/grok snippets, docs/CONVENTIONS.md, CONTRIBUTING.md, SECURITY.md, docs/EXTERNAL-AGENTS.md (no stable-surface row names a tier), docs/WORKTREES.md, docs/VISION.md). The tier `[medium]` left in docs/AGENT-NEUTRALITY.md, docs/PLATFORMS.md, claude/CAPABILITIES.md and docs/AGENT-COMPAT.md is CORE-815.4's scoped sweep, and the alias keeps it valid until then

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A

**Final Summary:**

The contract now names the rung `[moderate]` everywhere a tier is meant, and `[medium]` is a permanent read-only alias, stated in SPEC.md, `SPEC/model.md` (rule plus the optional open-row sed), candidacy clause 1 and `SPEC/plan-parser.md`, and pinned by fixture FX-161. Changed files: SPEC.md, SPEC/model.md, SPEC/cue-vocabulary.md, SPEC/task-line-segments.md, SPEC/post-closure.md, SPEC/unattended-candidacy.md, SPEC/plan-parser.md, SPEC/fixtures/plan/{README.md, canonical, markers, rotated-history, tolerances}.{md,json}, plus PLAN.md and this tasknote. `touches:` reconciliation: every changed path falls inside the declared set (fixtures README under `SPEC/fixtures/plan/*.md`). Verification: viz 614/614, drift checks ok, sed scratch run clean. Maintainability: tier and priority vocabularies no longer share a word in the contract. The skill/docs/template prose (.4) and viz (.3) still say `medium` until their children land, and the alias covers that gap.

**Archived:** 2026-10-20
