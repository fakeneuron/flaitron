---
title: Retire "Pinned to:" from adopter seed surface
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: []
---

# CORE-212 | Retire "Pinned to:" from adopter seed surface

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Retire the "Pinned to: vX.Y.Z" seeding block and its replacement instructions from the adopter bootstrap surfaces (template + MIGRATION §1.5 + ft-new-project) so new projects no longer receive or are instructed to maintain a pinned-version line in their `_project/tasknote/README.md`.

## ✅ Acceptance

- [ ] `templates/tasknote-README.md` — entire `## Flowtron version` block (heading + Pinned line + two explanatory paragraphs) deleted
- [ ] `docs/MIGRATION.md` §1.5 — the single "Replace `vX.Y.Z` in `Pinned to: vX.Y.Z`" bullet removed from the "Then fill it in:" list; surrounding prose still flows
- [ ] `claude/skills/ft-new-project/SKILL.md` Step 6 — the "Edit `_project/tasknote/README.md`: replace the `vX.Y.Z` placeholder..." paragraph removed (cp of template remains; no-op on pinned)
- [ ] No other files touched (per explicit scope in PLAN line); AGENTS-snippet and SPEC/versioning.md references left as-is

## 🧩 Subtasks

- [ ] Delete the `## Flowtron version` block from `templates/tasknote-README.md`
- [ ] Remove the pinned-version replacement bullet from `docs/MIGRATION.md` §1.5 "Then fill it in" list
- [ ] Remove the pinned-version edit instruction paragraph from `claude/skills/ft-new-project/SKILL.md` Step 6
- [ ] Run Phase 3 checks (markdown hygiene on the three edited files)
- [ ] Execute Phase 4 doc-drift sweep + PLAN flip + archive move

## 🔗 Related

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Narrow, mechanical, well-scoped retirement of a superseded seeding feature (the "Pinned to:" block + bootstrap instructions). Matches the PLAN filing description exactly; no hidden cross-cutting concerns, no re-interpretation of root cause or files. Clear diff in 3 docs.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim (area=core, 254 files):** Content grep for the three in-scope paths surfaced dozens of historical hits (primarily early wiring CORE-004–057 family + bootstrap evolution). Load-bearing prior decisions:

- CORE-108 (2026-05-17) deliberately *added* the exact `## Flowtron version` block + `ft-new-project` Step 6 substitution + MIGRATION §1.5 note to close a gap (SPEC/versioning.md + AGENTS-snippet claimed the adopter README records the pinned version; template and bootstrap did not deliver it). CORE-108's acceptance criteria and implementation notes map 1:1 to the three surfaces we are now editing in reverse.
- CORE-026 (earlier) had removed a prior "Pinned to:" line as "redundant" because the bootstrap never populated it.
- CORE-020 and related wiring tasks reference the MIGRATION §1.5 instruction in the context of onboarding docs.

The retirement in CORE-212 is a deliberate reversal of CORE-108's addition after a short life in the seed surface (per 2026-06 audit Finding #1). No file moves or renames in scope; the decision is purely "no longer seed this for new adopters."

**Drift check:** Clean. PLAN line cites the exact current files and sections (`templates/tasknote-README.md`, `MIGRATION §1.5`, `ft-new-project bootstrap`). All three still contain the Pinned/replacement strings we read; no line-number or content drift. Self-host's own `_project/tasknote/README.md` never had the block (custom), so unaffected.

**Clarifications:** No clarifications needed.

**Explicit assumptions (asserted for autonomous execution):**
- "delete block" = the entire `## Flowtron version` section (heading + `Pinned to: vX.Y.Z` line + the two explanatory paragraphs on submodule pinning + release tasknotes). Deleting only the line would orphan prose.
- In `docs/MIGRATION.md` remove only the single replacement bullet under "Then fill it in:". The `cp` command, the "Then fill it in:" lead-in, and the other 3 bullets (area prefixes, quick commands, AI-referenced docs) remain verbatim.
- In `claude/skills/ft-new-project/SKILL.md` remove only the substitution "Edit ... replace the `vX.Y.Z`..." paragraph in Step 6. The `mkdir -p ... cp` block and the following descriptive paragraph ("The README includes a description...") stay (still accurate post-removal).
- No other files are in scope (AGENTS-snippet.md, SPEC/versioning.md, self-host README, command stubs, etc. left untouched even if they mention pinning conceptually).
- Existing adopters retain whatever is in their local `_project/tasknote/README.md`; this change only affects *future* fresh adoptions via the template + bootstrap.
- After these edits the "Pinned to:" concept is fully retired from the *adopter seed surface* (the goal of the task); historical records and any remaining conceptual docs are out of scope.

**Sources read for Discovery:** `templates/tasknote-README.md`, `docs/MIGRATION.md:105-118`, `claude/skills/ft-new-project/SKILL.md:80-92`, `claude/commands/ft-new-project.md`, `_project/tasknote/README.md` (self), `SPEC.md` §"Task ID convention", archive hits + full CORE-108.md + CORE-020.md excerpts.

All Phase 1 boxes now ticked. No significant scope deviation from the original PLAN filing (small-clarifications-only, zero asks). Discovery surfaced no re-scope/de-scope triggers.

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:** Examined prior doc-retirement and bootstrap-cleanup patterns in the archive (CORE-026 "remove redundant Pinned to: line", CORE-108 addition of the exact block now being retired, recent MIGRATION sweeps in CORE-182/209 etc.). The established shape for retiring an obsolete instruction is *exact surgical excision* of the target text with zero surrounding rewrite unless the markdown list/grammar breaks. Here the MIGRATION bullet list remained grammatical after removing the first item; the skill Step 6 flowed cleanly after removing the single "Edit..." paragraph. No new abstractions, helpers, or patterns were needed or justified — pure removal of superseded seed surface.

**Changes (3 files, ~10 lines net removed):**

1. `templates/tasknote-README.md` — deleted the entire `## Flowtron version` section (heading + `Pinned to: vX.Y.Z` + 2 explanatory paragraphs on submodule pinning and release notes). The adopter template now jumps from the intro paragraph directly to `## Layout`. (This is the "block" referenced in the task.)
2. `docs/MIGRATION.md` §1.5 — removed the single replacement bullet "- Replace `vX.Y.Z` in `Pinned to: vX.Y.Z` with the version from §1.1." from the "Then fill it in:" list (now 3 bullets remain; lead-in sentence and cp command untouched).
3. `claude/skills/ft-new-project/SKILL.md` Step 6 — removed the paragraph "Edit `_project/tasknote/README.md`: replace the `vX.Y.Z` placeholder in the `Pinned to: vX.Y.Z` line with the actual pinned version from Step 1. Leave the project-specific...". The `mkdir/cp` fenced block and the following general "The README includes a description..." paragraph remain (still accurate).

No tests exist or are appropriate for pure documentation changes; verification is via the Phase 3 lint + visual review of the resulting markdown.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Documentation-only change (3 small string deletions in markdown). 

- No test suite applies (no behavioral code).
- No formal markdown linter or type-checker configured for repo-root .md files (viz/ has its own eslint for TSX). Performed manual hygiene review on the diffs: list grammar preserved after bullet removal, no orphaned headings, consistent blank-line spacing, no introduced link breakage, heading levels and backticks intact.
- Not a frontend change → no 👁️ visual-confirmation prose ask required or performed.

All Phase 3 boxes complete. Flows directly to Phase 4 closure ops (no gate).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (self-host AI-referenced docs list from _project/tasknote/README.md):**

- `README.md` — no change
- `SPEC.md` — no change
- `docs/MIGRATION.md` — updated: removed the single "Replace `vX.Y.Z` in `Pinned to: vX.Y.Z` with the version from §1.1." bullet from the §1.5 "Then fill it in:" list (CORE-212)
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change

(Note: the primary payload files `templates/tasknote-README.md` and `claude/skills/ft-new-project/SKILL.md` are intentionally outside this default sweep list per the "loaded on demand" note in the same README; their changes are the substance of this task and are recorded in the Implementation Notes above.)

**Final Summary:**

Retired the "Pinned to:" adopter seed block and its replacement instructions from the three bootstrap surfaces. 3 files edited, ~10 lines net removed, zero behavior change for existing adopters. All per exact scope in the PLAN filing (audit Finding #1). Phase 1-4 driven autonomously under default-skip (no 🛠️ or 📦 gates fired).

**Archived:** 2026-05-26
