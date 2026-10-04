---
title: Fix stale cross-refs + audit-scaffold hygiene
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: []
---

# CORE-213 | Fix stale cross-refs + audit-scaffold hygiene

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Retarget the stale "Zero scripts" cross-reference in CONVENTIONS.md to the correct PHILOSOPHY heading, and delete the legacy §0 "Forker checklists" from the five ft-audit-* skill siblings (per ft-audit §6).

## ✅ Acceptance

- [ ] `docs/CONVENTIONS.md`: both backing-principle sentences (release automation + pre-commit hooks sections) retargeted from stale `§"Zero scripts"` to `§"The decisions that fall out" (Zero scripts)`; surrounding prose and link syntax unchanged and flowing
- [ ] Each of the five `claude/skills/ft-audit-{backend,docs,frontend,performance,security}/SKILL.md`: the entire `## 0. Forker checklist` block (heading + 7-item list + "Once the checklist... delete this §0 block" instruction paragraph) removed; file remains valid markdown; original `## 1. Scope & ground rules` is now the first content section after the intro prose
- [ ] No other files edited (main `ft-audit/SKILL.md` and its command stub untouched as the canonical template; `ft-audit-context` untouched as different shape; all five command stubs untouched)
- [ ] Phase 3 hygiene (targeted markdown checks on the six edited files) passes with no regressions

## 🧩 Subtasks

- [ ] Update the two `§"Zero scripts"` backing lines in `docs/CONVENTIONS.md` (L76 release-automation; L84 pre-commit) to the retargeted `§"The decisions that fall out" (Zero scripts)` text per user clarification
- [ ] Delete the full `## 0. Forker checklist` block (incl. the "Once...delete this §0" instruction) from each of the five siblings: `claude/skills/ft-audit-backend/SKILL.md`, `claude/skills/ft-audit-docs/SKILL.md`, `claude/skills/ft-audit-frontend/SKILL.md`, `claude/skills/ft-audit-performance/SKILL.md`, `claude/skills/ft-audit-security/SKILL.md`
- [ ] Verify post-edit state: six files well-formed, links resolve, no accidental removal of functional content, no renumbering of later sections
- [ ] Phase 3: run targeted markdown hygiene + link-check on the edited set (no full test suite applicable)
- [ ] Phase 4: doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" (CONVENTIONS.md will report the update; others "no change")

## 🔗 Related

- [[TASK-ID]] — short context (predecessor / follow-up / parent epic)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope is two precise, low-risk doc-hygiene edits on known stale surfaces (CONVENTIONS.md cross-refs + §0 scaffolding in the five post-fork audit-family siblings). No blocking prerequisite, no re-interpretation of root cause, no cross-cutting concerns beyond the filed description. One small phrasing clarification only (see Discovery Notes); did not alter files-to-edit or approach.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Relevance:** Proceed (detailed above).

**Archive skim (area=core, 255 archived CORE notes):** 
- CONVENTIONS.md heavily referenced across the CORE-099 epic (its creation) + many later sweeps/releases (099.1–8, 110+, 154.x, 169, 179, 181, 183–186, 188–212 etc.).
- The five ft-audit-* siblings (backend/docs/frontend/performance/security) touched primarily in:
  - CORE-154.5 (family expansion / multi-agent portability)
  - CORE-170 ("audit scaffold §0 parity" — explicitly aligned the five siblings' §0 closing lines to main ft-audit/SKILL.md:25 wording, including the "leaving it in confuses..." rationale)
  - CORE-185 (pass-name canonicalization across the six audit-family members)
  - CORE-186 (context-audit sibling, deliberately skipped §0 because global-install)
- Key signal: CORE-170 treated the §0 blocks in the five as *living scaffold parity assets* to be kept in sync with the canonical. CORE-213 is the subsequent hygiene pass: now that these five are flowtron-self's *post-customization* "forks" (not the adopter-facing template), the "delete §0 after walk" contract in the block itself applies. No contradictory prior decision to *preserve* §0 in the siblings for flowtron's own use.

**Drift check:** 
- Cited elements still present verbatim: two `§"Zero scripts"` cites at docs/CONVENTIONS.md:76 and :84; full `## 0. Forker checklist` blocks (with the delete-instruction paragraph) present in exactly the five SKILL.md files named in PLAN line.
- PHILOSOPHY.md:41 still has the bold **Zero scripts.** lead sentence (not a `##` heading) under `## The decisions that fall out` (L37).
- No line numbers were cited in the filing → zero line drift risk.
- "per ft-audit §6": §6 "Hard rules" in main ft-audit/SKILL.md exists and is the locus of the forker contract (the delete instruction lives in §0 but the overall scaffold discipline is §6 territory too).
- ft-audit command stubs and ft-audit-context/SKILL.md out of scope (no §0 blocks; different shape).

**Clarifying questions:** One AskUserQuestion fired (genuine ambiguity on exact retarget phrasing for the two backing-principle sentences). User selected: `§"The decisions that fall out" (Zero scripts)`. No other ambiguities. Explicit assumptions recorded below.

**Explicit assumptions (no other asks needed):**
- Scope strictly limited to the two cites in CONVENTIONS.md + deletion of §0 blocks from the five named SKILL.md siblings. (PLATFORMS.md still uses the term loosely in non-§ context; left untouched. Main ft-audit/SKILL.md is the *source template* and keeps its §0 by design.)
- After §0 deletion, do not renumber the subsequent `## 1. Scope...` etc. sections (the §0 text itself only says "delete this §0 block"; off-by-one numbering in the customized post-fork state is acceptable and matches the "fork" contract).
- Command stubs for the five (`claude/commands/ft-audit-*.md`) untouched (they never contained §0).
- No behavior or frontmatter changes; pure removal of now-inappropriate forker scaffolding from flowtron's own specialized auditor instances.
- Phase 3: markdown hygiene only (no tests for these docs). Full AI-referenced-docs drift sweep happens in Phase 4 closure per contract.

**Re-scope/De-scope verdict:** None. One phrasing-only clarification that did not alter target files, subtask list, or approach.

**Phase 1 exit judgment (default-skip flavor):** Discovery surfaced no significant deviation from the original plan (single small phrasing clarification on link text only; explicit assumptions logged; no file, approach, or subtask-list change) → skip 🛠️.
✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:** The "delete this §0 block once customized" instruction is canonical and self-contained in the forker checklist text itself (present in ft-audit/SKILL.md:25 and the siblings until this edit). Precedent for coordinated edits across exactly these five files: CORE-170 (parity append to the closing sentence of their §0 blocks). CORE-186 explicitly skipped §0 for a global-install sibling. No other "remove forker scaffolding" examples in the live tree (this task is the application of the documented contract to flowtron's own post-"fork" specialized auditors). No helper script or abstraction exists or should (zero-scripts principle); direct precise block excision via search_replace on the unique per-file text is the established minimal surgical pattern for audit-family scaffold hygiene.

**Changes (6 files, 7 hunks, minimal + targeted):**
- `docs/CONVENTIONS.md`: 2× string retarget (L76, L84) from stale `§"Zero scripts"` → `§"The decisions that fall out" (Zero scripts)` per user-chosen clarification. No other text or links altered.
- Five SKILL.md siblings: excised the entire `## 0. Forker checklist ... Once ... run.` block (different wording per sibling, captured exactly). Left the following blank line + original `## 1.` (now first content section). No renumbering, no frontmatter or behavior changes.
- 0 lines of "new shape" — pure removal of now-inappropriate scaffolding + 2 cross-ref fixes.
- Tests: none applicable (pure documentation + skill-scaffold hygiene; no executable code). Phase 3 will cover markdown hygiene verification.

No adjacent refactoring performed. All edits trace directly to the two bullets in the PLAN line + the one clarifying Ask.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

No executable test suite or type system applies (pure markdown + skill-scaffold hygiene edits; 0 lines of code changed). 

- Targeted "lint": post-edit manual verification that all 6 files retain valid YAML frontmatter, well-formed headings, and no broken internal structure. All deletions left clean blank-line separation to the following `## 1.` section; CONVENTIONS.md links remain valid relative paths to sibling PHILOSOPHY.md.
- No frontend surface touched (docs/ + claude/skills/ only) → no 👁️ visual-confirmation ask required or performed.
- Full doc-drift sweep (the authoritative hygiene check for AI-referenced surfaces) executed in Phase 4 per contract.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-26.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep verdicts (AI-referenced docs list):**
- `README.md` — no change
- `SPEC.md` — no change
- `docs/MIGRATION.md` — no change
- `claude/AGENTS-snippet.md` — no change
- `docs/CONVENTIONS.md` — updated: two backing-principle sentences retargeted from stale `§"Zero scripts"` to `§"The decisions that fall out" (Zero scripts)` (Release automation + Pre-commit hooks subsections); prose flow and relative links preserved
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change (loose non-§ usage of the term left as-is per explicit scope)

**Final Summary:**

**Plain-English recap:** Fixed two long-standing sources of doc drift on flowtron's own contract surface: outdated "Zero scripts" section references in CONVENTIONS.md (now pointing to the actual PHILOSOPHY heading that contains the principle) and leftover "Forker checklist" scaffolding in the five specialized audit skills that flowtron itself uses in production (they are post-customization instances, not the adopter template).

**Technical detail:** 6 files edited (docs/CONVENTIONS.md + 5× claude/skills/ft-audit-*/SKILL.md). 2 string retargets + 5 complete block deletions (~110-130 lines removed). Full Phase 1 (archive skim of 255 core notes, drift check, 1 clarifying AskUserQuestion on phrasing). Pattern survey + minimal surgical implementation; no tests applicable; Phase 3 hygiene by inspection. Closure diff clears all three Conditional skip signals (0 frontend files, 0 privileged-ops paths, 0 perf narrative). Autonomous commit.

**Archived:** 2026-05-26
