---
title: headroom-spec-modules
status: completed
tags: [context-budget, spec]
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-920, CORE-869.5, CORE-915, CORE-920.N]
touches:
  - SPEC/post-closure.md
  - SPEC/tasknote-selection.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-920.2 | headroom-spec-modules

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-920]] [[CORE-869.5]] [[CORE-915]] [[CORE-920.N]]

## 🎯 Goal

Bring `SPEC/post-closure.md` and `SPEC/tasknote-selection.md` below their 95% NEAR CAP lines with pointer-not-narrate cuts, taking every genuine restatement or rationale cut found so the headroom lasts, and record both in `docs/CONTEXT-BUDGET.md` §"Cap history".

## ✅ Acceptance

- [x] `context_budget` prints no `NEAR CAP` line for either file (post-closure < 9,500; tasknote-selection < 11,875), caps unchanged — landed 8,911 / 11,161 — `bash tools/drift-checks.sh context_budget`
- [x] Both Cap-history rows carry a `held <cap> [[CORE-920.2]] (<before> → <after>)` entry — `grep -c 'CORE-920.2' docs/CONTEXT-BUDGET.md` = 2
- [x] Every inbound citation still resolves (the three `##` headings, `### Direct-edit path (skip tier)`, bold leads "Rotation, before 🏁" and "File a starter") and the full drift scan passes — `bash tools/drift-checks.sh`
- [x] The rotation command stays byte-identical to `claude/skills/ft-release/step-7.1-standing-checks.md`'s copy — `grep -qF "awk '/^## Completed\$/{f=1;next}/^## /{f=0} f' .flaitron/PLAN.md | grep -c '^\s*- \[x\]'" SPEC/post-closure.md`
- [x] No unique rule lost — every cut is a restatement (pointer kept), rationale tail, or within-file duplicate — `judgment`: meaning-preservation is a reading, graded by the External review

## 🧩 Subtasks

- [x] Trim `SPEC/post-closure.md`: preamble's duplicate gates.md pointer and step list; Step 1 accepted-reply restatement; 🏁 parenthetical, SHA-check restatement; audit-family self-check tail; `/clear` rationale tail; context-dependent-skills rationale
- [x] Trim `SPEC/tasknote-selection.md`: reconciliation motivation paragraph, user-confirm rationale tail, closing skill-pointer paragraph; filing-discipline intro rationale and skill-mechanism restatement; debug-mode `--fast` restatement; duplicate micro Re-scope sentence
- [x] Add two `held` Cap-history entries in `docs/CONTEXT-BUDGET.md`
- [x] Run `context_budget`, the full drift scan, and the rotation-command grep

## 🔗 Related

- [[CORE-EPIC-920]] — parent epic (near-cap-trims-2; Theme: Budget trims don't hold).
- [[CORE-869.5]] — prior near-cap trim of `post-closure.md` (9,877 → 9,396); the shape this follows.
- [[CORE-915]] — added the direct-edit path to `tasknote-selection.md` (11,199 → 12,190), the growth this offsets.
- [[CORE-920.N]] — the epic audit.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `context_budget` at HEAD `8201f351` prints `NEAR CAP` for both files: post-closure 9,579 of 10,000 (95%) and tasknote-selection 12,190 of 12,500 (97%). Those are the figures the row names.

- [x] Read relevant source files — both target files in full; `SPEC.md`; `SPEC/epic.md`; `docs/CONTEXT-BUDGET.md` §"Budgets" / §"Cap history"; the `context_budget` threshold logic in `tools/drift-checks.sh`; restatement targets in `SPEC/cue-vocabulary.md`, `claude/skills/ft-task/step-4-debug-mode.md` / `step-0-flags.md`, `claude/skills/ft-file-task/SKILL.md`.

- [x] **Best Practices Review** — `N/A`: markdown contract trims; no code or module boundary moves.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). 15 hits on the two paths, so I read the trim precedents directly. [[CORE-869.5]] (same file, same motion) cut only restatements, kept the cap, and logged a `held` Cap-history entry, keeping cited headings and bold leads. Its guard says the rotation command stays identical to the copy in `step-7.1-standing-checks.md`. [[CORE-915]] added the direct-edit path; it is recent operator-approved content, so it stays uncut.

- [x] **Drift check** — sizes and the PLAN line match. The NEAR CAP line is 95% for both rows: neither row's "Why" cell sets `NEAR CAP at N%`, and the check fires at `sz*100 >= budget*95`. Inbound citations: `tasknote-selection.md` §"When to use a tasknote (and when not to)" (18), §"PLAN.md filing-discipline thresholds" (5), §"Downstream-impact reconciliation" (7), §"Direct-edit path (skip tier)" (4), and bold lead §"File a starter" (2). For `post-closure.md` there is bold lead §"Rotation, before 🏁" (1) plus step-number references ("step 2", "step 3"). No drift pair reads these files' text, but the rotation command has a mirror copy.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  AskUserQuestion on trim depth. Options were just under the line, every genuine cut (chosen), or trim plus lower caps. Assumptions: caps stay put and each row gets a `held` entry (the CORE-869.5 shape). §"Ledger" stays `/ft-release`'s job. Step numbering and every cited heading and bold lead are preserved.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** Each cut was checked as a restatement before it went on the list:
- The accepted-reply members and the `okay`/`looks good` exclusion are in `SPEC/cue-vocabulary.md` §"Accepted gate replies".
- The debug `--fast` composition is in `step-0-flags.md` and `step-4-debug-mode.md`.
- The `/ft-file-task` >70w decline is in its `SKILL.md`.
- The SHA rule is in `SPEC.md` §"Paper-complete guard" §3.
- The skip/fire pointer to `gates.md` appears twice in post-closure's own opening.

Phase 1→2: Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-869.5]]'s hold-the-cap trim: restatement → pointer, a `held` Cap-history entry per row, cited headings and bold leads untouched

- [x] **Minimal refactor gate** — no restructuring; sentence-level cuts only

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose contract trims; the drift checks are the guard

**Implementation Notes:**

- `SPEC/post-closure.md` 9,579 → 8,875 (−704, 88.8%). Cuts:
  - the blockquote's `gates.md` pointer, which line 5 repeats;
  - the step-list parenthetical;
  - the reply-set members and the `okay` exclusion (they live in `cue-vocabulary.md` §"Accepted gate replies");
  - "never an invented or reused one" (`SPEC.md` §"Paper-complete guard" §3);
  - the 🛠️ → 📦 → 🏁 mnemonic;
  - the 🔍 self-check tail;
  - the `/clear` rationale tail;
  - the 👇 explanation, compressed to one parenthetical and one reason sentence.
- `SPEC/tasknote-selection.md` 12,190 → 11,161 (−1,029, 89.3%). Cuts:
  - the micro Re-scope sentence, a within-file duplicate of the "When in doubt" paragraph;
  - the debug `--fast` composition, which `step-0-flags.md`, `step-4-debug-mode.md` and `claude/CAPABILITIES.md` already state;
  - the filing-discipline rationale and the `/ft-file-task` >70w decline (its `SKILL.md` and `CAPABILITIES.md` keep it);
  - the reconciliation motivation paragraph, compressed from 9 lines to 4;
  - the human-at-the-gate rationale, whose home is `docs/VISION.md`;
  - the closing "This section is the contract" paragraph, compressed to one sentence.
- The §"Direct-edit path (skip tier)" body ([[CORE-915]]) is untouched.
- `docs/CONTEXT-BUDGET.md` gets two `held` entries. Caps and "Why" cells are unchanged.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh context_budget` and `pair_q`

- [x] Ran lint/type-check on changed code — `git diff --check` clean; no code changed

- [x] **Verification receipt** — receipt below; no code changed, so the structural assertions are `N/A`

- [x] **External review** — `/code-review medium`; findings below

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
bash tools/drift-checks.sh context_budget          → 0   (no NEAR CAP for either file; 4 remaining lines are CORE-920.3 / .4 surfaces)
grep -c 'CORE-920.2' docs/CONTEXT-BUDGET.md         → 2
bash tools/drift-checks.sh pair_q                   → 0
bash tools/drift-checks.sh                          → 0   (full scan)
grep -qF "<rotation awk>" SPEC/post-closure.md      → 0
grep -qF "<rotation awk>" step-7.1-standing-checks  → 0
git diff --check                                    → 0
```

External review (`/code-review medium`):
- **note**, fixed: dropping "never an invented or reused one" left the reused-SHA case only implicit. I restored the clause (post-closure lands at 8,911, not 8,875) and corrected the Cap-history figure to match.
- Two further findings are outside this task's diff. The reviewer's range swept in earlier commits. Neither is a note on this diff, so neither was fixed here; both are surfaced to the operator for filing.
  - `tools/update-adopters/text.mjs:76`: `workflowPasteBlock` matches only column-0 backtick fences, not the tilde and indented fences `fenceOpeners` allows.
  - `tools/drift-checks.sh` `updater_roster`: its anchored sed skips roster lines that have leading or trailing whitespace.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every entry: no change (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`). The trims change no contract; `CAPABILITIES.md` and `VISION.md` already hold restatements the trims removed

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`: the same hold-the-cap trim [[CORE-869.5]] codified; nothing new for the always-loaded layer

**Final Summary:**

Both SPEC modules are back under their NEAR CAP lines, with headroom to spare:
- `SPEC/post-closure.md` 9,579 → 8,911 (89%), 1,089 left.
- `SPEC/tasknote-selection.md` 12,190 → 11,161 (89%), 1,339 left.

Every cut was a restatement, a rationale tail, or a within-file duplicate, and every cited heading and bold lead was kept.

Recap:
- **Changed:** `SPEC/post-closure.md` (−668), `SPEC/tasknote-selection.md` (−1,029), and two `held` entries in `docs/CONTEXT-BUDGET.md` §"Cap history".
- **Verification:** see Testing Notes; every command exits 0.
- **Refactors:** none.
- **Docs:** no drift.
- **Scope:** declared 3 files, changed 3. Nothing undeclared.
- **Maintainability:** each module now absorbs roughly one more ~1,000-char working unit before NEAR CAP fires, against ~80 and ~0 before.

**Archived:** 2026-11-24
