---
title: budget-shipped-surfaces
status: completed
tags: [docs, context-budget]
created: 2026-11-07
due:
related-tasks: [CORE-535.1, CORE-724.5, CORE-869.3]
touches:
  - docs/CONTEXT-BUDGET.md
---

# CORE-881 | budget-shipped-surfaces

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-535.1]] · [[CORE-724.5]] · [[CORE-869.3]]

## 🎯 Goal

Make `docs/CONTEXT-BUDGET.md` account for every shipped always-loaded surface: cap `claude/AGENTS-snippet.md` with an enforced §"Budgets" row, and exempt the three shipped templates by name with a reason.

## ✅ Acceptance

- [x] §"Budgets" carries a `claude/AGENTS-snippet.md` row sized as the file plus ~1.5 working units, the unit measured over the last twenty commits touching it — `grep -qE '^\| \`claude/AGENTS-snippet.md\` \| [0-9,]+ \|' docs/CONTEXT-BUDGET.md`
- [x] `context_budget` measures and enforces the new row (a lowered cap fails it) — `bash tools/drift-checks.sh context_budget` plus a temp-copy negative probe (Testing Notes)
- [x] "Not budgeted, deliberately" names `templates/tasknote-README.md`, `templates/PLAN.md` and `templates/tasknote-template.md` with a reason — `awk '/^\*\*Not budgeted, deliberately/,/^## Cap history/' docs/CONTEXT-BUDGET.md | grep -oE 'templates/(tasknote-README|PLAN|tasknote-template)\.md' | sort -u | wc -l` = 3
- [x] §"Cap history" records the new row's first cap — `grep -q 'AGENTS-snippet.md\` | budgeted' docs/CONTEXT-BUDGET.md`

## 🧩 Subtasks

- [x] Measure the snippet's size and its per-commit deltas over the last twenty touching commits
- [x] Add the §"Budgets" row (after the `SPEC/procedures/ft-task.md` row)
- [x] Add the §"Cap history" row
- [x] Extend "Not budgeted, deliberately" with the three templates and a reason
- [x] Run `context_budget`, the negative probe, and the full validation set

## 🔗 Related

- [[CORE-535.1]] — first measured the adopter-side surfaces (ledger only)
- [[CORE-724.5]] — recorded that neither the snippet nor the template carries a §"Budgets" row
- [[CORE-869.3]] — the `NEAR CAP` line the new row will print

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The gap is real and still open. `claude/AGENTS-snippet.md` (13,232 bytes) appears only in §"Ledger" → "Adopter-side always-loaded". The three templates are not named in §"Budgets" or in "Not budgeted, deliberately". `templates/tasknote-template.md` is a §"Ledger" row under "Always loaded to run one task".

- [x] Read relevant source files — `docs/CONTEXT-BUDGET.md` (§Budgets, precedence and headroom paragraphs, "Not budgeted", §Cap history, §Ledger adopter-side, §"How this is enforced"); `tools/drift-checks.sh` `context_budget()`; `claude/AGENTS-snippet.md` KEEP IN SYNC header.

- [x] **Best Practices Review** — N/A: docs-table edit, no code or module boundary.

- [x] **Archive skim** — area `core` confirmed against the README table (`CORE-*` → `archive/core/`). Ten hits for `CONTEXT-BUDGET` + `AGENTS-snippet`. Load-bearing: CORE-535.1 measured the adopter-side trio as ledger figures only, never budgeted. CORE-724.5 confirmed "neither the snippet nor the template carries a §Budgets row (ledger only)" and left the ledger refresh to `/ft-release`. Nobody ever recorded a decision to exempt them, so the gap is an omission, not a choice being reversed.

- [x] **Drift check** — The PLAN figure of 13,187 is the snippet at `c610ca1f`. The current file is 13,232 (CORE-880 +9, plus 36 from CORE-879 already counted). Only the figure drifted. The ledger figure belongs to `/ft-release` and is not refreshed here (CORE-724.5 precedent). `context_budget` reads every `| \`path\` | N |` row between `## Budgets` and `## Known over budget` with `wc -c`, so a plain-path row is enforced with no script edit. The §Cap-history rows sit in that range but do not match the number-cell regex.

- [x] No clarifications needed (--fast). Assumptions: (a) the budget caps the whole snippet file (what `context_budget` measures), not just the fenced paste-block; (b) the ledger's stale 13,187 stays for the next release cut; (c) "sized like its siblings" means file + ~1.5 upper-bound substantial units, rounded to the nearest 100.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

**Working unit (last twenty commits touching the snippet, byte delta each):** +9, +36, 0, +31, +215, +16, +73, +56, +154, +70, −243, +44, +255, +363, +204, −248, +69, +40, +61, +33. Substantial edits run +154 to +363 and routine ones 0 to +73. ~1.5 upper-bound units = ~545, so 13,232 + 545 = 13,777, rounded to **13,800**.

**`NEAR CAP` consequence.** Because the unit is small, ~1.5 units is about 4% of the file, so the row prints `CORE-869.3`'s non-failing `NEAR CAP` line from the day it lands (13,232 of 13,800 = 95%). That follows from the row's "per row, in working units" headroom rule and matches the existing `SPEC/procedures/ft-task.md` row, which already prints NEAR CAP. The row's cell will say so. A 14,000 cap would keep the line quiet, but at ~2.1 units it breaks the sizing the PLAN row asks for.

**Template exemption reason.** `/ft-update` re-syncs the snippet's paste-block on every bump, so flaitron's copy is what an adopter loads, and capping it bounds that load. The templates are copied once and then owned by the copy. The adopter's `PLAN.md` and tasknote README grow with that project's own rows. A task's filled note is what loads, not the template, and the template's shape follows `SPEC.md` §"Tasknote body shape", which is already capped through `SPEC.md`. A cap on the shipped template therefore bounds nothing a runner loads, and §"Ledger" keeps their sizes in view.

Size estimate: ~8 lines (rename-aware).

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: a docs-table row with no code change. `context_budget` already enforces any plain-path row, as the negative probe in Testing Notes shows.

**Implementation Notes:**

- Pattern: the new §"Budgets" row follows the sibling "Why this number" shape (what it is, why it's budgeted, sized like its siblings with the measured unit, a headroom note). The §"Cap history" row uses the bare first-budget form (`budgeted N [[ID]]`). The template exemption extends the existing by-name clause (`docs/MIGRATION.md` / `docs/PLATFORMS.md`) in the same paragraph.
- No refactor. `tools/drift-checks.sh` is unchanged because a plain-path row is enforced as-is.
- Review round 1 rewrote two sentences (see Testing Notes → External review).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface (one markdown doc)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (`--unattended`, so this is the full validation set: `just check`, whose dependencies `test typecheck lint build` cover every other recipe the justfile defines):

- `bash tools/drift-checks.sh context_budget` → 0 (prints `NEAR CAP  claude/AGENTS-snippet.md  13232 of 13800 (95%)`, expected per Discovery)
- Negative probe: a temp copy of the tree with the row's cap lowered to 13,000 → `bash tools/drift-checks.sh context_budget` → 1 (`OVER BUDGET  claude/AGENTS-snippet.md  13232 > 13000`). The row is enforced.
- `grep -qE '^\| \`claude/AGENTS-snippet.md\` \| [0-9,]+ \|' docs/CONTEXT-BUDGET.md` → 0
- `awk … | grep -oE 'templates/(tasknote-README|PLAN|tasknote-template)\.md' | sort -u | wc -l` → 3. The first form, `grep -c`, gave 2 because two names share a line, so the criterion's command was corrected to count names.
- `grep -q 'AGENTS-snippet.md\` | budgeted' docs/CONTEXT-BUDGET.md` → 0
- `bash tools/drift-checks.sh pair_q final_newline` → 0
- `just check` → 0 (run before and after the review fixes; node suites `fail 0`, every drift check ok)

Scope guardrails (Phase 3 entry): paths `docs/CONTEXT-BUDGET.md` plus this note, all in scope. Size 11 added + 0 deleted, against the 400 cap.

Changed code is free of duplication and dead code. The ledger's 13,187 for the snippet is stale (now 13,232) and left for `/ft-release` §7.1, which owns ledger refreshes ([[CORE-724.5]] precedent).

External review: `/code-review medium docs/CONTEXT-BUDGET.md`, this task's own uncommitted diff only. Findings:

1. **Blocker, fixed.** The exemption said `templates/tasknote-template.md` is "copied, not loaded", which is false: `/ft-task` and `/ft-open-epic` read it at scaffold, and §Ledger lists it as always-loaded. Rewritten: the three templates *do* load, as seeds read once and written out; §Ledger watches them; a template re-read mid-task earns a row.
2. **Note, fixed.** "Paragraph's own rule says exempt items aren't loaded." The rewrite now says "unlike the list above they do load".
3. **Note, fixed.** "SPEC.md's row caps the template" was a false bound. The clause is removed.
4. **Note, fixed.** The snippet row said "this file is what adopters load", but adopters load only the fenced paste-block. Reworded: the row caps the whole file because `context_budget` measures files, so setup prose counts too, conservatively.
5. **Note, no change.** The unit was measured on whole-file deltas. That is consistent with a whole-file cap.
6. **Note, filed.** `NEAR CAP` fires permanently on this small-unit row. The PLAN row's sizing rule (~1.5 units) produces it; a per-row threshold or a re-size is a design call → filed CORE-891.
7. **Note, no change.** The ledger's stale 13,187 belongs to `/ft-release` (see above).
8. **Note, fixed plus filed.** "exempt by name too" wording → "as well". The other four templates (`tasknote-micro-template.md`, `tasknote-starter-template.md`, `sidequest-template.md`, `subagent-probe-template.md`) are neither budgeted nor exempted → filed CORE-890.
9. **Note, no change.** The shipped tasknote-README seeds the adopter copy's starting size. True, but the adopter copy grows on its own, which is what the exemption reason states.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  `README.md` no change (links the doc by purpose only) · `AGENTS.md` no change (names the doc, no surfaces) · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change (it is the newly budgeted surface; its content is untouched) · `codex/` · `cursor/` · `grok/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change (names the `context_budget` check, not its rows) · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` · `claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` · `docs/EXTERNAL-AGENTS.md` · `docs/WORKTREES.md` · `docs/VISION.md` no change (none cites the budget table). `docs/CONTEXT-BUDGET.md` is deliberately off the list (its own §"Not on the doc-drift sweep list") and is this task's deliverable. Post-sweep scope check: same two paths, 11 lines, clear.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? N/A

**Final Summary:**

- **Changed:** `docs/CONTEXT-BUDGET.md` only (+11/−0). It adds a §"Budgets" row capping `claude/AGENTS-snippet.md` at 13,800 (13,232 + ~1.5 units of +363), a §"Cap history" row, and a by-name exemption with a reason for `templates/tasknote-README.md`, `templates/PLAN.md` and `templates/tasknote-template.md`.
- **Verification:** `context_budget` → 0 and enforces the row (the lowered-cap probe → 1). `just check` → 0. All four Acceptance commands → 0 / 3.
- **Refactors:** none. **Doc verdict:** every sweep entry no change.
- **`touches:` reconciliation:** declared `docs/CONTEXT-BUDGET.md`; `git diff --name-only` gives `docs/CONTEXT-BUDGET.md` plus the workflow paths (this note, `.flaitron/PLAN.md`). Match.
- **Maintainability:** every shipped always-loaded surface is now either capped or exempt by name. The new row prints `NEAR CAP` by construction (see CORE-891).
- **Filed:** CORE-890 (remaining templates), CORE-891 (NEAR CAP on small-unit rows). Both are review notes, filed through `/ft-file-task --unattended` and riding this closure commit.

unattended-candidates: none

**Archived:** 2026-11-07
