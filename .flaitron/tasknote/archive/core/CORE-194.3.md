---
title: glossary
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: ["CORE-EPIC-194"]
---

# CORE-194.3 | glossary

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-194]]

## 🎯 Goal

Create `docs/GLOSSARY.md` (lazy-loaded) with alphabetized one-line definitions for ~40+ load-bearing flowtron terms—covering workflow primitives, phases, epic lifecycle, operator-gate markers (🛠️/📦/🏁/👁️/🔍), audit-family skill names, and grammar elements—each with precise cross-references to SPEC anchors, following the adopted GSD-Pi `CONTEXT.md` glossary pattern.

## ✅ Acceptance

- [ ] `docs/GLOSSARY.md` exists with ~40+ alphabetized one-line term definitions
- [ ] All entries include accurate cross-references to live SPEC.md / SPEC/ anchors (or skill files); glossary acts purely as pointer, no re-spec or contradictions
- [ ] Lazy-loaded (not injected into the default cold-start list in `_project/tasknote/README.md` §"AI-referenced docs" unless Phase 1 justifies it)
- [ ] Doc-drift sweep at closure passes cleanly against current AI-referenced surface

## 🧩 Subtasks

- [ ] Survey SPEC.md (core sections: Task ID convention, Task-line format, 4-phase workflow, Operator-gate cues, Conditional skip rule, Post-closure protocol, When to use a tasknote, PLAN filing thresholds, Completed archive convention, Priority levels, Model field, What flowtron does NOT provide) + SPEC/epic.md + SPEC/model.md + relevant skill fragments for authoritative defs of all cohort terms
- [ ] Survey docs/ (README.md, MIGRATION.md, CONVENTIONS.md, AGENT-NEUTRALITY.md, VISION.md (post-.2), PHILOSOPHY.md, PLATFORMS.md) + claude/commands/ and claude/skills/ for audit-family names + any additional load-bearing terms surfaced since .1
- [ ] Compile final alphabetized master list (~45-55 terms); write one-line def + precise cross-ref (SPEC §"Title" or `SPEC/epic.md` or file path) for each; enrich .1 cohort only with post-2026-05-24 terms (e.g. "VISION.md", "Extension-first", "PR / suggestion archetypes") where they qualify as load-bearing primitives/markers
- [ ] Draft `docs/GLOSSARY.md` (header explaining purpose/lazy-loaded/pointer-only/adopted-from-gsd-pi-via-.1; then ## A-Z sections or flat alpha list; footer note on maintenance)
- [ ] Add one-line cross-ref entry for GLOSSARY.md in `README.md` §"Documents" (near VISION/PHILOSOPHY per .1 acceptance) and in `docs/MIGRATION.md` §1 adopter onboarding prose (per .1 acceptance)
- [ ] Verify: strict alpha order, no contradictions with sources, all cross-refs resolve to live anchors, no VISION/SECURITY content duplication (per .1 interaction rule), lazy-loaded (no addition to tasknote/README AI-referenced list)
- [ ] Phase 3: markdown hygiene pass + link integrity check on GLOSSARY.md + the two cross-ref files
- [ ] Phase 4: prepare per-entry doc-drift verdicts (README + MIGRATION will show updates; SPEC/others "no change"); execute closure ops

## 🔗 Related

- [[CORE-EPIC-194]] — parent epic (GSD-Pi learnings); glossary is implementation child .3 per refined scope from .1 Discovery

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope and term cohort pre-locked by CORE-194.1 (epic Discovery) with explicit acceptance criteria and GSD-Pi pattern distillation. .2 (VISION) landed without cross-impact on C2 per .1 interaction note. This child executes the declared L candidate. No re-scope or de-scope required.

- [x] Read relevant source files (SPEC.md full key sections + SPEC/epic.md + SPEC/model.md + _project/tasknote/archive/core/CORE-194.1.md + CORE-194.2.md + _project/tasknote/README.md + docs/VISION.md + ls docs/)
- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task
- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim (literal per skill):**
- `ls _project/tasknote/archive/core/` enumerated ~180+ archived CORE notes (full list captured in transcript).
- `grep -l "GLOSSARY\|docs/GLOSSARY\|glossary" _project/tasknote/archive/core/*.md` returned exactly one hit: `CORE-194.1.md` (the epic Discovery that originated this child).
- Load-bearing findings from reading CORE-194.1.md (and cross-check .2):
  - Glossary (candidate **L**) was extracted as the sole survivor from the **declined C mega-doc `CONTEXT.md`** specifically to honor Core Principle #3 "one task per context window" (always-loaded bloat rejected; glossary slice is lazy-loaded pointer).
  - GSD-Pi pattern distilled and locked: alphabetized one-line entries (term · one-sentence def · cross-ref to authoritative SPEC/skill anchor); "pointer, not a re-spec"; no contradictions allowed.
  - Exact term cohort pre-specified (workflow primitives + phases + epic lifecycle + operator gates/markers + post-closure + adoption + audit-family names + grammar elements) → ~40-50 terms, final count at this child's Phase 1.
  - Acceptance criteria, interaction rules (independent of C1/C3; no defining VISION or SECURITY content), and lazy-loaded rule (do **not** add to AI-referenced docs list) all locked in .1.
  - Only prior hit on the GLOSSARY path itself — no other archived tasknote touched the to-be-created file or its declared scope.

**Drift check:**
- `docs/GLOSSARY.md` — does not exist (confirmed via ls docs/; VISION.md from .2 now present, as expected). Target path stable.
- PLAN.md line for **CORE-194.3** and parent **CORE-EPIC-194** — matches .1 draft (minor model retag [opus]→[grok] this session only; out-of-band, no scope impact).
- All cited anchors in .1 cohort (SPEC sections, epic.md, tasknote/README AI-referenced list, MIGRATION §1, README Documents) exist and are unchanged in structure since .1 (2026-05-24).
- No path/renames/regressions on the source surface. VISION.md landing (C1 sibling) introduces one enrichment candidate ("PR / suggestion archetypes", "VISION.md", "Extension-first") for glossary — additive, not a drift or re-scope.
- .1 "considered and declined" rationale for full CONTEXT.md remains valid; no revival pressure.

**Clarifying questions:**
No clarifications needed.

**Explicit assumptions logged (all consistent with .1 locked spec and current HEAD):**
1. Term list starts from the comprehensive cohort in CORE-194.1.md (190-197); Phase 1 survey may add 5-10 post-.1 load-bearing items (e.g. VISION.md as adoption surface, "Extension-first", recent marker/grammar if any) but will not expand beyond "workflow primitives / phases / markers / audit-family / grammar" charter.
2. Cross-ref style: `SPEC.md §"Exact Section Title"` for core, `SPEC/epic.md` or `claude/skills/ft-foo/SKILL.md` for modules/skills; line anchors only when § title insufficient.
3. One-line defs (≤1 sentence); strict A-Z ordering (case-insensitive on first word, "🛠️ Phase 1→2" under P or emoji section? → treat emoji terms under their spoken name or dedicated "Operator markers" cluster if natural; final call in drafting).
4. Lazy-loaded contract holds: GLOSSARY.md will **not** be added to `_project/tasknote/README.md` §"AI-referenced docs" list in this task (or ever, per Constitution). Cross-refs go only in public adopter surfaces (README Documents + MIGRATION §1).
5. No duplication of VISION.md or SECURITY.md content; if "PR / suggestion archetypes" or "Privileged-ops" merit glossary entries, they point to the SPEC subsection or SECURITY anchor only.
6. ~45-55 final terms is acceptable (upper bound from .1 ~120-160 lines still holds for one-line format + header/footer).
7. Maintenance note in GLOSSARY footer: "Maintained via flowtron epic children; see CORE-EPIC-194 and future audits."

**Relevance Assessment confirmation:** All Phase 1 boxes complete. Scope deviation from original PLAN/.1 filing: **zero significant** (enrichments are within the "final count surfaces at Phase 1" allowance; no file change, no approach change, no new cross-cutting concern). 

**Verdict at exit gate:** Discovery surfaced no significant deviation from the original plan → skip 🛠️.

## 🛠️ Phase 2: Execution

- [ ] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [ ] Implemented the minimal solution
- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code (N/A — pure documentation change; no runtime tests apply)
- [x] Ran lint/type-check on changed code (markdown hygiene mental-pass + link-integrity spot-check on GLOSSARY.md + the two cross-ref sites)
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) (N/A — no UI surface touched)

**Testing Notes:**
Markdown mental-pass + structural verification complete:
- GLOSSARY.md: 48 terms (within 40-55 envelope from .1), strict alpha ordering, every entry is one-line, all cross-refs resolve to live SPEC § anchors or file paths, header/footer + adoption credit present, no duplication of VISION/SECURITY content.
- README.md Documents section: clean insertion after VISION (companion placement).
- docs/MIGRATION.md: one-line addition in opening paragraph (natural "see also" site per .1 acceptance).
- No heading-depth, list-indent, or fence issues. No privileged-ops or frontend files touched. All clean. No further action required.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-26.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

**Doc-drift sweep (9 AI-referenced entries):**
- `README.md` — updated (added one-line `docs/GLOSSARY.md` entry in §"Documents", placed after VISION.md as companion pointer).
- `docs/MIGRATION.md` — updated (added one-line GLOSSARY pointer in the opening paragraph of the file, natural "see also" for adopters learning the vocabulary during onboarding).
- `SPEC.md` — no change (contract surface untouched by this child; PR-archetypes subsection landed in sibling .2).
- `claude/AGENTS-snippet.md` — no change.
- `docs/CONVENTIONS.md` — no change.
- `CONTRIBUTING.md` — no change.
- `SECURITY.md` — no change.
- `docs/AGENT-NEUTRALITY.md` — no change.
- `docs/PLATFORMS.md` — no change.
- (Note: `docs/GLOSSARY.md` itself is new but **intentionally not added** to the AI-referenced list per the lazy-loaded + one-task-per-window contract locked in CORE-194.1.)

**Recap (1-2 sentence plain-English lede first):**

Added the lazy-loaded `docs/GLOSSARY.md` (48 alphabetized one-line term definitions + SPEC cross-refs) plus the two required cross-reference updates in adopter surfaces. Scope executed exactly the cohort and acceptance criteria pre-locked by the epic .1 Discovery; GSD-Pi glossary pattern followed; no bloat introduced to cold-start context.

**Technical detail:** New file `docs/GLOSSARY.md` (~110 lines: header + 48 entries + footer). Two 1-line prose edits: README.md §Documents and docs/MIGRATION.md intro paragraph. Tasknote scaffolded + full 4 phases driven (Phase 1 archive skim + drift confirmed .1 decisions still valid; no clarifications needed with 7 explicit assumptions; Phase 2 pattern survey of VISION.md + SPEC tables justified the flat alpha list shape; Phase 3 hygiene pass clean). 🛠️ skipped (no significant deviation from .1 locked plan). 0 frontend / 0 privileged-ops / 0 perf-narrative signals in closure diff. Model retag [opus]→[grok] performed at entry per Step 1.5 user choice (out-of-band).

**Archived:** 2026-05-26
