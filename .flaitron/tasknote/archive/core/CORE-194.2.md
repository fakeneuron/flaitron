---
title: vision-md
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-EPIC-194, CORE-194.1]
---

# CORE-194.2 | vision-md

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-194]] [[CORE-194.1]]

## 🎯 Goal

Add `docs/VISION.md` (outward identity: who-it's-for + principles + "what-we-won't-accept" prose + brief why-exists) and extend `SPEC.md` §"What flowtron does NOT provide" with an AI-visible PR-shape subsection; cross-link both directions.

## ✅ Acceptance

- [ ] `docs/VISION.md` exists with 5 sections (header · Who it's for · Principles · What we won't accept · Why this exists). Principles section: **6 bullets** (5 SPEC Core Principles + 'Extension-first' as 6th — per Q1 resolution this Phase 1).
- [ ] `SPEC.md` §"What flowtron does NOT provide" gains a `### PR / suggestion archetypes flowtron does not accept` subsection (~15 lines) with **4 archetypes** (schema validators · abstractions-without-two-project-precedent · cross-project query layers · multi-user/team features — per Q2 resolution at .1 Discovery + user trim this Phase 1).
- [ ] VISION ↔ SPEC subsection cross-link both directions (VISION points to SPEC for AI-facing terse version; SPEC subsection points back to VISION for prose version).
- [ ] `README.md` §"Documents" gains a one-line entry for VISION.md, inserted near the existing PHILOSOPHY entry (companion placement).
- [ ] PHILOSOPHY.md unchanged (non-overlap contract from .1 Constitution holds; optional forward-link to VISION is a Phase 4 doc-drift-sweep decision).
- [ ] No section in VISION.md duplicates PHILOSOPHY.md content (PHILOSOPHY = retrospective historical narrative; VISION = forward-looking outward identity).
- [ ] `_project/tasknote/README.md` AI-referenced docs list: SPEC.md stays listed (contract changed); VISION.md **NOT** added (lazy per Q3 resolution at .1 Discovery).
- [ ] Phase 4 doc-drift sweep at closure: README.md cross-link added; SPEC.md re-listed (already there); everything else "no change".

## 🧩 Subtasks

- [ ] Phase 2: Draft VISION.md content (~80 lines): header paragraph + Who it's for + Principles (6 bullets) + What we won't accept (4 archetypes, prose) + Why this exists.
- [ ] Phase 2: Write `docs/VISION.md`.
- [ ] Phase 2: Extend `SPEC.md` §"What flowtron does NOT provide" with `### PR / suggestion archetypes flowtron does not accept` subsection (~15 lines, 4 terse bullets with cross-refs).
- [ ] Phase 2: Cross-link VISION ↔ SPEC subsection both directions.
- [ ] Phase 2: Add VISION.md to `README.md` §"Documents" near PHILOSOPHY (insertion point: between PHILOSOPHY and MIGRATION entries).
- [ ] Phase 3: Markdown mental-pass on all three files (heading depths · list indent · code-fence langtags · cross-link integrity).
- [ ] Phase 4: Doc-drift sweep across 9 AI-referenced docs.
- [ ] Phase 4: Flip PLAN.md line to stub form + archive tasknote.

## 🔗 Related

- [[CORE-EPIC-194]] — parent epic (gsd-pi-learnings)
- [[CORE-194.1]] — Discovery; locked deliverable, Q1-Q4 resolutions, drift-patched Spec

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.1` Discovery (`/ft-epic-discovery --deep`) pre-locked the deliverable down to file paths, section structure, and acceptance criteria. This child executes the locked spec; two pre-deferred Phase 1 questions (Q1 principles count, Q2 archetype list) resolved this turn. Not a re-scope (children fit the .1 locked envelope); not a de-scope (the work is real, ~80-line new file + ~15-line SPEC subsection + 3 cross-link edits).

- [x] Read relevant source files (`SPEC.md` full · `SPEC/epic.md` · `docs/PHILOSOPHY.md` · `README.md` · `_project/tasknote/README.md` · `_project/tasknote/archive/core/CORE-194.1.md` Discovery archive · `templates/tasknote-template.md`)
- [x] **Archive skim** — see Discovery Notes below
- [x] **Drift check** — see Discovery Notes below
- [x] Asked clarifying questions — 2 resolved this turn (Q1 principles count → **6, promote Extension-first**; Q2 archetype list → **4: schema validators · abstractions-without-two-project-precedent · cross-project query layers · multi-user/team features**); back-propagated into Acceptance + Subtasks above
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim — load-bearing findings (delta from `.1` already-done scan):**

The `.1` Discovery already ran a heavy archive skim and recorded 4 load-bearing precedents (CORE-121 SECURITY.md AI-referenced inclusion · CORE-EPIC-099 + CORE-EPIC-097 survey-epic archive convention · CORE-013 CHANGELOG removal). At child level, a targeted grep for `VISION|PHILOSOPHY|does NOT provide|won't accept` returned ~17 archive hits — none introduce new design constraints beyond what `.1` already surfaced. Key confirmations:

- **`VISION.md` is a clean slate** — zero prior consideration in archives; no in-flight design to align with (matches `.1` finding).
- **`§"What flowtron does NOT provide"` is touched lightly in archives** — CORE-097.5, CORE-098.3, CORE-098.15, CORE-194.1 cite it for context; no prior structural edits to that section. Adding a `### PR / suggestion archetypes` H3 subsection at section's tail is a clean, additive change.
- **PHILOSOPHY §"What flowtron deliberately is not"** (line 49-51) is a single prose paragraph recapping the SPEC feature-non-goal list — *different shape* from VISION's planned `## What we won't accept` archetype list. **Non-overlap contract holds**: PHILOSOPHY recaps features-we-don't-have; VISION rejects shapes-of-PR-suggestions. Same flavor, different angle.

**Drift check — verdicts:**

- **`docs/VISION.md` does not exist (CONFIRMED).** `ls docs/` returns 6 entries (PHILOSOPHY · MIGRATION · CONVENTIONS · AGENT-NEUTRALITY · PLATFORMS · existing-only); VISION.md is new — no overwrite risk.
- **`SPEC.md §"What flowtron does NOT provide"` at HEAD (CONFIRMED).** Section at line 649, last section of SPEC.md (file ends at 663). Existing content: opening "deliberately omits" sentence → 5-bullet feature non-goal list (CLI · schema validation · DB · cross-project query API · per-project CI) → closing "If you find yourself wanting these..." outro paragraph. **Insertion point for `### PR / suggestion archetypes` H3 subsection: after the closing outro paragraph, at the very end of SPEC.md.** Existing closing outro naturally wraps the bullet list (features); new H3 introduces a different concern (PR-shape rejection patterns).
- **`SPEC.md §"Core principles"` has 5 principles at HEAD (CONFIRMED).** Order: markdown-over-JSON · zero-scripts · one-task-per-window · relevance-before-action · versioned-and-pinned. VISION's Principles section (6 bullets per Q1 resolution) adds Extension-first as 6th — VISION will note the asymmetry inline ("SPEC §'Core principles' enumerates 5 contract principles; this 6th — Extension-first — promotes the existing SPEC §'🛠️ Phase 2: Execution' → 'Pattern survey' mandatory step to outward-facing principle status").
- **`README.md §"Documents"` has 8 entries at HEAD (CONFIRMED).** Order at lines 12-32: SPEC · PHILOSOPHY · MIGRATION · CONVENTIONS · AGENT-NEUTRALITY · PLATFORMS · CONTRIBUTING · SECURITY. **Insertion point for VISION entry: between PHILOSOPHY (line 14-15) and MIGRATION (line 16-17)** — VISION is PHILOSOPHY's outward-facing companion (PHILOSOPHY = history/why-it-exists; VISION = identity/who-it's-for/principles).
- **`_project/tasknote/README.md §"AI-referenced docs"` has 9 entries at HEAD (CONFIRMED).** VISION.md will **NOT** be added to this list per Q3 resolution at `.1` Discovery (lazy-loaded to protect one-task-per-window).
- **No path drift on this child** — all cited paths from `.1` Spec (docs/VISION.md, SPEC.md, README.md, PHILOSOPHY.md, root SECURITY.md path) match HEAD layout.

**Resolved clarifications (this turn — back-propagated into Acceptance + Subtasks above):**

| # | Question (deferred at .1 Discovery to child Phase 1) | Resolution | Downstream impact |
|---|---|---|---|
| Q1 | VISION.md Principles section — 5 bullets (match SPEC exactly) or 6 (promote 'Extension-first')? | **6 — promote Extension-first** | VISION Principles section: 6 bullets, with cross-link note explaining SPEC has 5 contract principles + 'Extension-first' as outward-facing 6th (promoted from SPEC §"🛠️ Phase 2: Execution" → 'Pattern survey'). |
| Q2 | Stick with the .1-drafted 6 PR-archetypes, trim to 4, or custom-draft? | **Trim to 4** — schema validators · abstractions-without-two-project-precedent (subsumes helper-not-canonical) · cross-project query layers · multi-user/team features | Both VISION's "What we won't accept" prose section AND SPEC's new PR-shape subsection use the same 4 archetypes. 2 archetypes (schema validators, cross-project query) cross-ref the existing SPEC feature-non-goal bullets in the same section (PR-rejection mirror of feature-non-goal). 2 archetypes (two-project-precedent, multi-user) are NEW additions that go beyond the feature list into PR-shape patterns. |

**Exit gate (default-skip flavor):** Discovery surfaced two routine content-detail picks within the `.1`-locked envelope (bullet count + archetype trim) — neither changed file scope, subtask shape, root cause, approach, or cross-cutting concern. The principles cross-link note is a 1-2 sentence in-VISION explanation, not a restructure. **Skip 🛠️.**

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `docs/PHILOSOPHY.md` is the closest sibling (same `docs/` shelf, identity-adjacent): uses H1 + H2 plain-prose sections, first-person retrospective. VISION extends the same H2-section structure on the same shelf but with distinct voice (third-person outward-facing, declarative, present-tense) — extends-the-pattern verdict, not parallel-shape. SPEC's existing H3 subsections (`### Conditional skip rule`, `### Long-description conventions`) modeled the new PR-shape H3: intro paragraph + bullet list + cross-refs.
- [x] Implemented the minimal solution — 3 file edits (1 create, 2 edits).
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-prose only; no executable surface).

**Implementation Notes:**

- **Created `docs/VISION.md`** (42 lines) with 5 H2 sections per `.1` Spec:
  - Header paragraph (3 sentences) — outward-facing what-it-is + pointers to SPEC + PHILOSOPHY.
  - `## Who it's for` — solo AI-coders running 2-5 side projects; 3-bullet fit list + explicit not-for negation.
  - `## Principles` — 6 bullets (5 Core Principles recap + Extension-first as 6th per Q1 resolution). Intro line cross-links SPEC §"Core principles" as canonical; the 6th bullet notes the asymmetry inline ("VISION-only — not enumerated in SPEC §'Core principles', but operative throughout SPEC").
  - `## What we won't accept` — 4 prose-paragraph archetypes per Q2 resolution (schema validators · abstractions-without-two-project-precedent · cross-project query layers · multi-user/team features). Intro line cross-links the SPEC AI-facing terse mirror.
  - `## Why this exists` — 3-sentence prose, cross-links PHILOSOPHY (history) + SPEC (contract).
- **Extended `SPEC.md` §"What flowtron does NOT provide"** with `### PR / suggestion archetypes flowtron does not accept` H3 subsection (~9 lines: intro + 4 bullets) appended after the existing closing paragraph (lines 664-672). Each bullet either cross-refs the same section's existing feature non-goal ("PR-rejection mirror of X above" for schema validators + cross-project query) or states the new constraint inline (two-project-precedent + multi-user). Subsection intro cross-links VISION as the prose version.
- **Added VISION entry to `README.md` §"Documents"** between PHILOSOPHY (line 14-15) and MIGRATION (line 18-19), companion placement (PHILOSOPHY = history; VISION = identity).
- **Cross-link integrity verified**: VISION → SPEC subsection (line 32) ✓ · SPEC subsection → VISION (line 666) ✓ · VISION → PHILOSOPHY (2 places: opening paragraph + Why-this-exists) ✓ · README → VISION (line 16) ✓.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose only)
- [x] Ran lint/type-check on changed code — N/A (markdown-prose only); mental-pass below
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface)

**Testing Notes:**

Markdown mental-pass across the 3 changed files:

- **`docs/VISION.md`** (new, 42 lines): H1 + 5 H2 ✓ · no H3 (kept flat for ~42-line size) · bold-prefix bullets in Principles ✓ · prose paragraphs in "What we won't accept" ✓ · cross-links all use relative paths (`../SPEC.md`, `PHILOSOPHY.md`) since VISION lives in `docs/` ✓ · italic *(SPEC #N)* suffixes consistent across 5 of 6 Principle bullets; Extension-first uses *(VISION-only — ...)* to mark the asymmetry ✓ · no code fences (none needed) · no trailing whitespace ✓.
- **`SPEC.md`** (new H3 subsection at lines 663-672): H3 heading depth correct under H2 §"What flowtron does NOT provide" ✓ · 4 bold-prefix bullets matching VISION's archetype names ✓ · cross-link to VISION uses repo-root-relative path (`docs/VISION.md`) since SPEC lives at repo root ✓ · no orphan in section structure (placed after existing closing paragraph, no other content follows) ✓ · file still ends with single trailing newline ✓.
- **`README.md`** (1-entry insertion at line 16-18): list-item formatting matches surrounding entries (3-line wrap, 2-space indent on continuation) ✓ · cross-link path `docs/VISION.md` matches PHILOSOPHY/MIGRATION sibling pattern ✓ · description shape (`outward-facing identity: ...`) parallels PHILOSOPHY's (`the "why": ...`) ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdicts across `_project/tasknote/README.md` §"AI-referenced docs" (9 entries):
  - `README.md` — **updated** (added VISION.md entry to §"Documents" between PHILOSOPHY and MIGRATION; 3-line entry, line 16-18)
  - `SPEC.md` — **updated** (added `### PR / suggestion archetypes flowtron does not accept` H3 subsection at file tail, after §"What flowtron does NOT provide" existing content; ~9 lines)
  - `docs/MIGRATION.md` — **no change** (VISION is lazy-loaded per `.1` Q3 resolution; adopter onboarding doesn't reference it)
  - `claude/AGENTS-snippet.md` — **no change** (no agent-neutral surface affected; VISION is human/AI-doc, not assistant-paste-block)
  - `docs/CONVENTIONS.md` — **no change** (conventions reaffirmed by VISION's Principles section but not contradicted or restated authoritatively)
  - `CONTRIBUTING.md` — **no change** (PR-rejection guidance now lives in SPEC subsection + VISION prose; CONTRIBUTING's solo-maintenance model is separate)
  - `SECURITY.md` — **no change**
  - `docs/AGENT-NEUTRALITY.md` — **no change**
  - `docs/PLATFORMS.md` — **no change**
  - **Verdict:** 2/9 updated (README + SPEC); 7/9 no change. VISION.md itself is **NOT** added to AI-referenced docs list per `.1` Q3 resolution (lazy-loaded; protects one-task-per-window).
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` (kept nested under CORE-EPIC-194 per epic subtask convention — full cohort moves to `## Completed` when CORE-194.5 audit closes the epic) and tasknote moved to `_project/tasknote/archive/core/CORE-194.2.md`
- [x] Recap drafted — bundled into 📦 motion below

**Final Summary:**

Added `docs/VISION.md` (42 lines) — flowtron's outward-facing identity statement covering who-it's-for, the 6 principles (5 SPEC Core Principles + Extension-first as VISION-only 6th), the 4 PR-archetypes flowtron rejects (schema validators · abstractions-without-two-project-precedent · cross-project query layers · multi-user/team features), and a one-paragraph why-this-exists pointing to PHILOSOPHY. Mirrored the 4-archetype list into `SPEC.md` §"What flowtron does NOT provide" as a new `### PR / suggestion archetypes flowtron does not accept` H3 subsection (~9 lines, AI-facing terse form, cross-linked to VISION for prose). Added a 3-line VISION entry to `README.md` §"Documents" as PHILOSOPHY's companion. Resolved the 2 child-Phase-1 deferred questions from `.1` Discovery: Q1 chose 6 principles (promote Extension-first); Q2 trimmed the archetype list from .1's 6 drafts to 4 (folded helper-not-canonical into two-project-precedent; dropped scripts/CLI as already covered by the existing feature non-goal bullet).

**Archived:** 2026-05-25
