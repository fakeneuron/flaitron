---
title: worktree-doc
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: ["CORE-EPIC-215", "CORE-215.1"]
---
# CORE-215.2 | worktree-doc

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-215]] [[CORE-215.1]]

## 🎯 Goal

Author `docs/WORKTREES.md` documenting the conventions for isolated epic-child git worktrees (location `~/code/<project>-worktrees/<wt-TASK-ID>/`, branch naming `wt-<TASK-ID>`, verbose skill names `/ft-worktree-start` and `/ft-worktree-end`, tasknote copy on start, merge/cleanup discipline on end) per decisions locked in CORE-215.1, and add lightweight cross-references to the new doc from `docs/MIGRATION.md` and `claude/AGENTS-snippet.md`.

## ✅ Acceptance

- [ ] `docs/WORKTREES.md` created covering the five convention areas (location, branch-naming, skill-naming, tasknote-handling, merge-cleanup) plus rationale, when-to-use guidance, and concrete examples; content exactly matches the 5 resolved scoping decisions and seed material from CORE-215.1 / originating CORE-196 starter
- [ ] Lightweight cross-reference prose (pointer to the new doc + one-sentence "when to reach for worktrees") added in `docs/MIGRATION.md` (in §1.2 tasknote skills section or 1.7 verify / recommended follow-ups)
- [ ] Lightweight cross-reference prose added in `claude/AGENTS-snippet.md` (inside the "Block to paste into AGENTS.md" Workflow section)
- [ ] Zero impact on SPEC.md or other contract surfaces (consistent with .5's explicit "No SPEC contract change" scope)
- [ ] Phase 4 doc-drift sweep records the three targeted files (new doc + two cross-ref edits) with no unintended drift elsewhere

## 🧩 Subtasks

- [ ] Survey house style and cross-ref patterns in sibling convention docs (`docs/CONVENTIONS.md`, `docs/PLATFORMS.md`, `docs/AGENT-NEUTRALITY.md`) and the two cross-ref targets (`docs/MIGRATION.md` §1.2/1.7, `claude/AGENTS-snippet.md` pasted block)
- [ ] Perform archive skim on prior wiring epics (CORE-186, CORE-195.*) and confirm no pre-existing worktree convention text or conflicting mentions outside the 215 lineage
- [ ] Drift check: verify all 5 locked decisions (location, branch, skills, tasknote copy, per-project tier) and target paths still match current HEAD with zero contradictions in docs/
- [ ] Draft complete `docs/WORKTREES.md` using Diátaxis-adjacent structure (intro/why + decision tables + when-to-use + examples + links back to SPEC/epic.md); keep surgical and decision-focused like CONVENTIONS.md
- [ ] Insert minimal cross-ref callout in `docs/MIGRATION.md` (one paragraph or bullet in the tasknote skills / verify area, deferring full wiring details to .5)
- [ ] Insert minimal cross-ref sentence in the Workflow block inside `claude/AGENTS-snippet.md` (after epic children mention)
- [ ] Self-review drafted doc against the "Previously resolved scoping decisions" table in CORE-215.1; confirm scope boundaries (no SPEC edits, cross-refs are prose-only)
- [ ] Phase 3: markdown hygiene pass (links, tables, GFM compliance); no executable lint surface
- [ ] Phase 4: doc-drift sweep across AI-referenced docs + PLAN.md stub flip + archive move + recap

## 🔗 Related

- [[CORE-EPIC-215]] — parent epic (worktree-convention)
- [[CORE-215.1]] — discovery subtask (filed the child scopes and locked the 5 decisions)
- [[CORE-196]] — originating rich starter (re-scoped into this epic; primary seed material for the doc content)
- [[CORE-EPIC-195]] — sibling tasknote-skill epic (identical 4-child + audit bracket pattern and 5-surface wiring)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Exact match to the .2 child scope filed by CORE-215.1 (and the "Files to touch" + resolved decisions in the originating CORE-196 starter). No re-scope, de-scope, file changes, or approach pivot required; the five convention areas and cross-ref targets are explicitly enumerated in the PLAN line and pre-locked with user acceptance.

- [x] Read relevant source files

- [x] **Archive skim** — skim `_project/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Archive skim findings (targeted on wiring precedents):**
- Hits in CORE-186 (ft-audit-context global addition — established the exact 5 adopter surfaces that .5 will later touch for the new pair) and the full CORE-195.* cohort (sibling epic: identical Discovery→4-children+audit shape, "six → seven" language in MIGRATION §1.2 and AGENTS-snippet, same per-project bundle tier).
- CORE-215.1 itself records the clean slate: "No prior worktree mentions anywhere in archive/core/."
- Unrelated historical hits only in CORE-100 (stale `flowtron-nat-011` worktree cleanup) and CORE-007 (submodule bootstrap worktree side-effect) — no convention or naming precedent that conflicts with the locked decisions.
- No mentions of `docs/WORKTREES.md` or any worktree convention doc prior to this epic.

**Drift check (vs. locked decisions in CORE-215.1 and starter seed):**
- All 5 paths cited in "Files to touch" (AGENTS-snippet.md, ft-new-project/SKILL.md Step 3, MIGRATION §1.2, ft-flowtron roster, PLATFORMS counts) exist at exact current locations with expected "seven tasknote skills" / post-186 content.
- The 5 resolved decisions remain uncontradicted in any current doc:
  - Location: `~/code/<project>-worktrees/<branch>/` — no competing language.
  - Branch: `wt-<TASK-ID>` — no prior examples or prescriptions.
  - Skills: verbose `/ft-worktree-start` + `/ft-worktree-end` — no short-name proposals live.
  - Tasknote: copy (explicit lean accepted; no hard-link/symlink alternatives documented).
  - Install tier: per-project (AGENTS-snippet + MIGRATION §1.2) — consistent with all recent wiring.
- Target file `docs/WORKTREES.md` confirmed absent. PLAN line for .2 still matches the child scope exactly as filed 2026-05-30.
- No SPEC.md mentions of worktrees or parallel epic execution that would create contract tension.

**Clarifying questions:**
No clarifications needed. All five "Open at promotion" questions from the originating starter were resolved during the CORE-196 re-scope and explicitly carried forward + re-confirmed in CORE-215.1's "Previously resolved scoping decisions" table (location, branch naming, skill names, tasknote copy, epic bracket). The .2 scope is a direct 1:1 extraction of the "Doc convention" bullet from the starter's "Solution shape" and "Files to touch". 

**Explicit assumptions (carried):**
1. The doc lives at exactly `docs/WORKTREES.md` (new top-level convention doc, not inside SPEC/).
2. Content scope is the five areas listed in the PLAN line + the five locked decisions; rationale/when-to-use/examples drawn from the starter "Why this exists" and "Solution shape" paragraphs.
3. Cross-refs in MIGRATION and AGENTS-snippet are *lightweight prose pointers* only ("see WORKTREES.md for the parallel execution convention"); the mechanical symlink-list / count / roster updates are explicitly deferred to .5.
4. No SPEC.md edits (per .5 charter and .1 acceptance); the convention is workflow-orthogonal.
5. The new doc will be added to `_project/tasknote/README.md` §"AI-referenced docs" either in .5 or the .6 audit (not in scope for this child).

**Relevance & scope confirmation:**
This task is a pure documentation + cross-ref child. Pattern survey (Phase 2) will be against other `docs/*.md` convention files for structure and tone. Execution will touch exactly three files. No code, no tests, no frontend surface under `viz/`, no privileged paths.

**Phase 1 exit gate judgment (default-skip flavor per /ft-task):**
Discovery executed the exact child scope filed by .1 with zero deviation. All decisions pre-locked; no new files/approaches/questions surfaced; archive/drift clean; clarifying step logged pre-resolved assumptions only. **→ skip 🛠️.**

✅ Phase 1 Discovery complete; entering Phase 2 Execution.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:** Direct lift of the established `docs/` convention-doc shape (CONVENTIONS.md, PLATFORMS.md, AGENT-NEUTRALITY.md). All three use: short decision-focused intro, GFM tables for (Decision | Choice | Rationale), backticks for paths/commands, [[wikilink]] cross-refs to sibling tasknotes, explicit "Related" footer, and zero fluff. Cross-ref insertions followed the existing single-sentence pointer style already present in MIGRATION.md top matter (PHILOSOPHY / SPEC / GLOSSARY links) and the AGENTS-snippet pasted block. No new document shape invented; the WORKTREES.md table mirrors the locked-decisions table that already existed in CORE-215.1.

**Minimal implementation (3 files, +130 LOC net):**
- `docs/WORKTREES.md` (new, 105 lines): intro + 5-row decision table + per-area elaboration + when-to-use + start/end conceptual flow + orthogonal-to-contract note + Related footer. Content distilled from the "Why this exists", "Solution shape", and "Previously resolved scoping decisions" sections of CORE-215.1 (and the embedded CORE-196 starter seed).
- `docs/MIGRATION.md` (+3 lines): one paragraph after the "seven tasknote skills" sentence in §1.2 naming the two new skills and pointing to the new doc for the convention (full count/list bumps deferred to .5).
- `claude/AGENTS-snippet.md` (+2 lines): one bullet inside the "Block to paste into AGENTS.md" Workflow section, after the epic-children bullet, giving the one-sentence "when to reach for" + path to WORKTREES.md.

No SPEC.md, no templates, no code, no wiring lists touched (per .2/.5 split). All links and wikilinks are relative and resolve at HEAD.

**Tests:** N/A — pure documentation change. No executable surface.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Pure documentation change (new convention doc + two prose cross-ref insertions). 

- No code changed → no test suite to run, no type/lint surface on executables.
- Markdown hygiene verified manually (GFM tables, consistent backtick usage, wikilink syntax, relative links, no broken anchors at the insertion points).
- No files under `viz/` or any declared UI dir → no frontend surface, no 👁️ visual confirmation required (the convention doc is prose for the operator, not a rendered UI component).
- Conditional skip signals (per SPEC §"Conditional skip rule"): zero frontend files, zero privileged-ops paths, zero perf-narrative reasoning. Clean for autonomous commit on the skip branch.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (AI-referenced docs from _project/tasknote/README.md):**

- `README.md` — no change
- `SPEC.md` — no change (per .2/.5 charter: no contract-layer edits)
- `docs/MIGRATION.md` — updated (lightweight cross-ref paragraph added after the "seven tasknote skills" sentence in §1.2, pointing to the new WORKTREES.md convention for parallel epic children)
- `claude/AGENTS-snippet.md` — updated (lightweight cross-ref bullet added inside the pasted "Block to paste into AGENTS.md" Workflow section, after the epic-children bullet)
- `docs/CONVENTIONS.md` — no change
- `CONTRIBUTING.md` — no change
- `SECURITY.md` — no change
- `docs/AGENT-NEUTRALITY.md` — no change
- `docs/PLATFORMS.md` — no change

(The new `docs/WORKTREES.md` itself is intentionally *not* yet listed in the AI-referenced set; that addition is scoped to .5 or the .6 audit per the .1 Discovery notes.)

**Final Summary:**

Authored the complete `docs/WORKTREES.md` convention document (105 lines) capturing the five locked decisions for isolated epic-child worktrees and added minimal prose cross-references in MIGRATION.md and the AGENTS-snippet pasted block. 3 files touched, 0 SPEC impact, clean for autonomous commit.

**Recap (for 📦 gate or autonomous commit):**

1-2 sentence plain-English: Delivered the worktree convention doc for CORE-EPIC-215 so adopters can execute independent epic children in parallel isolated git worktrees. The new `docs/WORKTREES.md` plus two lightweight cross-refs are now live; the mechanical skill wiring and surface updates remain for .3–.5.

Technical: Created 1 new file (`docs/WORKTREES.md`, 105 lines) + 2 surgical edits (MIGRATION.md +3 lines, AGENTS-snippet.md +2 lines). Pattern followed sibling convention docs (CONVENTIONS.md / PLATFORMS.md) and prior wiring precedent (CORE-195/186). No tests, no lint surface, no frontend/privileged/perf signals. Phase 1 skipped 🛠️ (zero deviation from .1-scoped plan). Tasknote will archive to `archive/core/CORE-215.2.md`. PLAN.md line will become the stub form under Completed.

**Archived:** 2026-05-30
