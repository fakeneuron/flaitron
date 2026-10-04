---
title: plan-none-convention-doc
status: completed
tags: []
created: 2026-09-22
due:
related-tasks: [CORE-668]
touches:
  - SPEC/plan-filing.md
---

# CORE-669 | plan-none-convention-doc

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-668]]

## 🎯 Goal

Document the `(none)` empty-section placeholder convention in `SPEC/plan-filing.md`, so a future drift like CORE-668's has a contract to point at.

## ✅ Acceptance

- [x] `SPEC/plan-filing.md` states `(none)` as the canonical empty-section placeholder, citing `templates/PLAN.md` (the shape) and `viz/src/parser.test.ts` (the parser coverage) — `grep -n "(none)" SPEC/plan-filing.md`
- [x] No file other than `SPEC/plan-filing.md` changed — `git diff --stat` (working tree, pre-closure)

## 🧩 Subtasks

- [x] Add an "Empty-section placeholder" section to `SPEC/plan-filing.md` stating the convention, its scope (every empty priority section, `## Completed` included), and its evidence trail
- [x] Adjust the file's intro paragraph to name the fourth section alongside the existing three

## 🔗 Related

- [[CORE-668]] — parent: restored the dropped `(none)` line in the live PLAN.md and filed this follow-up to document the convention it was implicitly relying on

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The task description's claim checks out against current state — `templates/PLAN.md` ships `(none)` under every empty section, `viz/src/parser.test.ts` has two dedicated tests for it, and `SPEC/plan-filing.md` (the file CORE-668's PLAN.md line names as the destination) says nothing about it. Confirmed by direct reads, not recollection.

- [x] Read relevant source files — `SPEC/plan-filing.md` (full), `templates/PLAN.md` (full), the two `(none)`-related tests in `viz/src/parser.test.ts`, and the archived `CORE-668.md` tasknote for the original drift evidence and Learnings note.

- [x] **Best Practices Review** — N/A. Pure documentation addition to an existing SPEC module; no code, module boundary, or dependency direction involved.

- [x] **Archive skim** — `CORE-668.md` (the parent) already carries the full drift evidence (`git show b39eb024`) and states explicitly in its Learnings that no SPEC module covers the convention. No other archived note references `(none)` as a convention (grepped `archive/core/` — hits are unrelated uses of the string, e.g. "N/A" answers). No further reading needed.

- [x] **Drift check** — Re-confirmed live: `templates/PLAN.md` still ships `(none)` under all five headings (`## High`/`Medium`/`Low`/`Future Opportunities`/`Completed`); `viz/src/parser.test.ts` still carries `ignores empty-section placeholder lines` and a second fixture using `(none)` as inert prose; `SPEC/plan-filing.md` still has no mention of `(none)`. The task's premise holds exactly as CORE-668 left it. `SPEC/plan-filing.md`'s own citation style for provenance is plain `CORE-NNN` text, not `[[wikilink]]` brackets (checked: zero `[[CORE` hits in the file) — matched in the new section below.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumption: "document" means a short, evidence-backed section in `SPEC/plan-filing.md` (the file the PLAN.md line names) — not a rewrite of `templates/PLAN.md`'s existing HTML-comment guidance, which already demonstrates the shape correctly and needs no change.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:**

`(none)` is the established, evidence-backed convention for every empty PLAN.md priority section — demonstrated in `templates/PLAN.md`, safely ignored by the parser per `viz/src/parser.test.ts`'s dedicated coverage — but stated nowhere in `SPEC/`. `SPEC/plan-filing.md` is the right home: it already owns the three other PLAN.md-row contracts (filing commits, the Completed stub form, rotation), and the CORE-668 PLAN.md line names it directly. `plan-filing.md` is unbudgeted in `docs/CONTEXT-BUDGET.md` (listed under "Not budgeted, deliberately"), so a short new section carries no cap pressure. Plan: append a new "Empty-section placeholder" section, and touch the file's intro paragraph only enough to name it — no other section's content changes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Extended the file's existing section shape exactly: `## Heading` + prose, plain `CORE-NNN` provenance citations (matching the file's own style — zero `[[wikilink]]` uses elsewhere in it) rather than `[[CORE-NNN]]` brackets.

- [x] **Minimal refactor gate** — N/A. Additive doc section plus a one-sentence intro edit; no other section touched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, documentation-only change; the parser behavior it documents is already covered by the cited existing `viz/src/parser.test.ts` fixtures.

**Implementation Notes:**

Appended a new `## Empty-section placeholder` section to `SPEC/plan-filing.md` (after `## Completed` rotation) stating the `(none)` convention, its scope (every empty priority section), its evidence (`templates/PLAN.md`'s shape, `viz/src/parser.test.ts`'s dedicated coverage), and the CORE-668 drift it exists to prevent recurring. Edited the intro paragraph to name it as a fourth item alongside the existing three contracts. No other section's content changed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no test suite targets `SPEC/` markdown content (a doc file, not code under `viz/`)

- [x] Ran lint/type-check on changed code — N/A, no linter targets `SPEC/` markdown content; verified `.editorconfig` compliance manually instead (UTF-8, LF, no trailing whitespace, final newline)

- [x] **Verification receipt** — recorded below; no avoidable duplication/dead code/complexity concerns apply to an additive documentation section

- [x] **External review** — `/code-review medium`, scoped to the `SPEC/plan-filing.md` diff only (sidequest deletion and tasknote creation excluded as workflow scaffolding, not deliverable). Zero findings — every factual claim verified against the codebase, including tracing `parser.ts`'s `parseTaskLine` to confirm the "never surfaces as an unparsed line" claim isn't an overclaim, and confirming `docs/CONTEXT-BUDGET.md`'s `plan-filing.md` size figure is a release-time-only measurement (not CI-enforced), so this diff creates no drift there. No blockers, no notes.

- [x] (frontend) Asked the user for visual confirmation — N/A, not a frontend/UI change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
grep -n "(none)" SPEC/plan-filing.md                          → 0 (3 hits, new section)
git diff --stat                                                → 0
  .flowtron/sidequest/CORE-669.md | 20 ------------------
  SPEC/plan-filing.md             | 23 ++++++++++++++++++++++-
  2 files changed, 22 insertions(+), 21 deletions(-)
```

Both Acceptance criteria verified directly: the new section exists and cites `templates/PLAN.md` + `viz/src/parser.test.ts`; the only content-changed file is `SPEC/plan-filing.md` (the sidequest deletion is the CORE-668 follow-up's own stub retiring itself per the promotion protocol, not a second deliverable).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep**

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed` (standalone row), tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

- [x] **Learnings**

**Doc-drift sweep (19 entries).** Checked every doc that mentions `plan-filing.md` by name (`AGENTS.md`, `SPEC.md`, `README.md`, `docs/CONTEXT-BUDGET.md`, `docs/CONVENTIONS.md`, `docs/EXTERNAL-AGENTS.md`, `docs/MIGRATION.md`, `docs/AGENT-NEUTRALITY.md`, `docs/VERSION-HISTORY.md`, `docs/GLOSSARY.md`, `claude/AGENTS-snippet.md`) against the diff. All 19 AI-referenced docs — **no change**. `SPEC.md`'s own introduction of `plan-filing.md`'s contents is explicitly scoped to "what happens to a PLAN.md row *after* it is filed" — the new Empty-section placeholder section is the stated inverse case (what a section carries with no rows), so it falls outside that paragraph's claim by design, not by omission. `docs/AGENT-NEUTRALITY.md`'s `plan-filing.md` row tracks agent-neutral flowtron-skill-name citations specifically; the new section cites no skill name, so nothing to add there. `docs/CONTEXT-BUDGET.md`'s listed `plan-filing.md` byte count (15,991) is now stale (grew to ~17,176) but that figure lives in the unbudgeted, release-time-only "Lazy SPEC/ modules" list — not CI-enforced, refreshed at release cuts, not a drift this closure owns.

**Evidence-based recap.** Changed: `SPEC/plan-filing.md` (+22/-1 lines net per `git diff --stat`: a new `## Empty-section placeholder` section appended after `## Completed rotation`, plus a one-sentence edit to the file's intro paragraph naming it as a fourth item). No LOC elsewhere as a deliverable — `.flowtron/sidequest/CORE-669.md` deletion is the CORE-668 follow-up's own stub retiring itself per the promotion protocol (`ft-file-followup/park-mode.md` §Notes → "Promotion"), not a second deliverable. Verification: `grep -n "(none)" SPEC/plan-filing.md` → 3 hits in the new section (exit 0); `git diff --stat` confirms `SPEC/plan-filing.md` is the only content-changed file (exit 0); `/code-review medium` scoped to that diff returned zero findings, having traced `parser.ts`'s `parseTaskLine` to confirm the section's claims aren't overclaims. No refactor made or deferred — pure addition. Documentation verdict: this task *is* the documentation fix; no other doc needed a change (see sweep above). `touches:` reconciliation: declared `SPEC/plan-filing.md`; `git diff --name-only` (content changes) confirms exactly that path — no undeclared paths. Maintainability effect: the `(none)` empty-section placeholder convention — previously implicit only in `templates/PLAN.md` + `viz/src/parser.test.ts`, which let it silently drop from the live plan once (CORE-668) — now has a SPEC contract a future drift or audit can point at directly, closing the gap CORE-668's Learnings note identified.

**Learnings.** N/A — this task's own deliverable *is* the learning CORE-668 surfaced (the `(none)` convention needed a documented home); nothing further to carry into the always-loaded layer.

**Final Summary:**

Added a `## Empty-section placeholder` section to `SPEC/plan-filing.md` documenting the `(none)` convention every empty PLAN.md priority section uses — sourced from `templates/PLAN.md`'s canonical shape and `viz/src/parser.test.ts`'s dedicated parser coverage — and naming the CORE-655→657 / CORE-668 incident it exists to prevent recurring. Updated the file's intro paragraph to list it as a fourth section alongside the existing three PLAN.md-row contracts. `/code-review medium` returned zero findings on the diff; doc-drift sweep found no other AI-referenced doc needing a change.

**Archived:** 2026-09-22
