---
title: ft-task-sop-reverify
status: completed
tags: [docs, procedures]
created: 2026-11-07
due:
related-tasks: [CORE-780, CORE-814, CORE-815.4, CORE-816, CORE-850.2, CORE-857.4, CORE-863]
touches:
  - SPEC/procedures/ft-task.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-876 | ft-task-sop-reverify

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-780]]

## 🎯 Goal

Reconcile `SPEC/procedures/ft-task.md` against every tier-1 `source:` commit that skipped it since its `v7.0.0 · 2026-10-11` stamp, mirror any real drift, and restamp it `v8.3.0 · 2026-11-07`.

## ✅ Acceptance

- [x] Each tier-1 candidate since 2026-10-11 (CORE-814, 815.4, 816, 850.2, 857.4, 863, `72b17a27`, plus the audit filing commit `ece5006a`) adjudicated in Discovery Notes as drift (mirrored) or no-drift (with reason) — `judgment` — adjudication is a reading of diffs against SOP prose
- [x] CORE-850.2's readiness-basis rule (starter `### Acceptance that decides it` criteria copied verbatim, never silently reworded or dropped) mirrored in the SOP — `grep -q 'Acceptance that decides it' SPEC/procedures/ft-task.md`
- [x] Tier-2 `restates: SPEC.md` count skimmed and recorded — `judgment` — advisory count by README contract
- [x] `last-verified:` bumped to `v8.3.0 · 2026-11-07` — `grep -q '^last-verified: v8.3.0 · 2026-11-07$' SPEC/procedures/ft-task.md`
- [x] SOP stays within its 26,000-byte budget — `bash tools/drift-checks.sh context_budget`
- [x] Full validation set green — `just check`

## 🧩 Subtasks

- [x] List tier-1 candidates since 2026-10-11 (source commits not touching the SOP)
- [x] Adjudicate each against the SOP
- [x] Skim tier-2 SPEC.md commits
- [x] Mirror the CORE-850.2 drift into the SOP's Phase 1 Acceptance bullet
- [x] Bump `last-verified:`; record the size in `docs/CONTEXT-BUDGET.md`'s history row
- [x] Run validation + verification receipt

## 🔗 Related

- [[CORE-780]] — predecessor (previous SOP re-check, v7.0.0 stamp)
- [[CORE-850.2]] — the one candidate that drifted (readiness basis)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The stamp (2026-10-11) predates 8 `source:` commits that skipped the SOP; `SPEC/procedures/README.md` §"Frontmatter schema" routes exactly this re-check to a follow-up task.

- [x] Read relevant source files — each candidate's diff restricted to `claude/skills/ft-task/` + `templates/tasknote-template.md`, the full SOP, `SPEC/procedures/README.md` §"Frontmatter schema", `step-3a-promote-starter.md`, `SPEC/post-closure.md` step 3.

- [x] **Best Practices Review** — `N/A`: doc-currency re-check, no code or module boundary.

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Archive skim** (`archive/core/`, `CORE-*` → `archive/core/` confirmed in the README table): CORE-780 is the previous re-check and sets the shape (adjudicate each candidate, skim tier 2, bump stamp). SOP edits after the stamp came from CORE-857.2 / 857.5 / 869.3 / 869.5 / 872 / 867 / 850.5 / 856, so most of the window is already mirrored; their budget history lives in `docs/CONTEXT-BUDGET.md` (SOP 24,673 of 26,000 after CORE-869.5).
- **Drift check:** tier-1 query (`git log --since=2026-10-11 -- claude/skills/ft-task/ templates/tasknote-template.md`, minus commits that also touched the SOP) lists 8 commits — the 7 the PLAN line names plus `ece5006a` (the audit filing commit, which applied three one-line skill fixes). No path drift.
- **CORE-814 (`56d7b902`) and CORE-816 (`f98d202a`) → no drift.** Both only change the example switch-target picks in `step-1.5-model-edge.md` (Fable @ xhigh → high; Astra @ xhigh → high). The SOP routes tiers and picks to the edge fragment / `SPEC/model.md` and prints no pick (`grep -n 'xhigh\|Fable\|Astra'` → none).
- **CORE-815.4 (`b0b9dca6`) → no drift.** `[medium]` → `[moderate]` (legacy alias) in `preamble.md` and the edge fragment. The SOP enumerates no tier token (`grep -n medium` → none).
- **`72b17a27` (align micro routing wording) → no drift.** `SKILL.md` description and `micro-mode.md` now call `--micro` the default route for known work; the SOP's micro-mode row already says "the routing default for known work with no design question".
- **CORE-850.2 (`f492d4fd`) → drift.** `step-3a-promote-starter.md` now copies a starter's `### Acceptance that decides it` criteria in verbatim as the operator-confirmed readiness basis, and Phase 1 "never silently rewords or drops these". The SOP's starter branch delegates to the fragment, but its own Phase 1 "Populate ✅ Acceptance" bullet reads as fresh authoring, and the unattended deciding-spec exception in its Phase 3 depends on that basis surviving verbatim. Mirror: one clause on the Phase 1 Acceptance bullet.
- **CORE-857.4 (`7e28bdc4`) → no drift.** It rewords `SKILL.md`'s unattended paragraph (the SOP already carries "unless a confirmed deciding spec decides it" in Phase 3) and adds a Claude-specific note that post-closure step 3's invocation line is `/ft-task <next-ID>` — the SOP's Step 6 runs the protocol neutrally with no slash dispatch, so nothing to mirror.
- **CORE-863 (`b8801908`) → no drift.** Sentence-initial `Flaitron` → `flaitron` in `SKILL.md` / `unattended-mode.md`; the SOP has no `Flaitron` (`grep` → none).
- **`ece5006a` (audit filing) → no drift.** `step-3a` "Phase 1 Step 5" → "Phase 1's clarifying-questions item", `step-5-loop-mode.md`'s loop-max closure wording, and one `preamble.md` line; the SOP routes starter and loop detail to those fragments.
- **Tier 2 (`restates: SPEC.md`):** 21 commits since 2026-10-11, 6 of which also edited the SOP. The rest: five release cuts (v7.1.0–v8.3.0), the `[moderate]` rename contract (815.2 — SOP names no tier), model routing (814), park-commit (843 — SOP points at `unattended-mode.md` §"The park recipe"), dirty-tree cue (833 — SOP carries `🚧 DIRTY`), installer (851), ft-update parity (852.6), brand casing (863), audit filings, CORE-782 rotation receipt (post-closure, routed). Nothing else the SOP restates.
- No clarifications needed (--unattended). Assumptions: one mirror clause for CORE-850.2, everything else stamp-only; stamp version = current SPEC version `v8.3.0`, date = today; the SOP's budget history row in `docs/CONTEXT-BUDGET.md` gets a "held 26,000 [[CORE-876]]" entry as prior SOP edits did.
- Size estimate: ~4 lines (rename-aware)

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — same shape as CORE-780's re-check (adjudicate, skim tier 2, bump `<version> · <YYYY-MM-DD>`); the mirror clause follows the SOP's existing pointer-not-narrate style (rule in one line, link to the owning module).

- [x] **Minimal refactor gate** — none; no adjacent prose touched.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: prose-only contract mirror; the drift-check suite covers budgets and citations.

**Implementation Notes:**

- `SPEC/procedures/ft-task.md` Step 4 "Populate ✅ Acceptance" bullet: added one sentence after the SPEC contract pointer — a promoted starter's `### Acceptance that decides it` criteria arrive verbatim, placeholders skipped; add to them and surface a drifted one, never silently reword or drop them (`SPEC/starter.md`). Frontmatter `last-verified: v7.0.0 · 2026-10-11` → `v8.3.0 · 2026-11-07`.
- `docs/CONTEXT-BUDGET.md`: SOP history row gains `→ held 26,000 [[CORE-876]] (… 24,673 → 24,896, crossing the 95% NEAR CAP line)`; the cap rationale's headroom note now reads 1,104 left.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — full validation set instead (`--unattended`): `just check`.

- [x] Ran lint/type-check on changed code — inside `just check` (`lint`, `typecheck` recipes) plus `bash tools/drift-checks.sh`.

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface; no 👁️ ask, no park.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- **Scope guardrails** (each Phase 3 entry and post-sweep): paths `SPEC/procedures/ft-task.md`, `docs/CONTEXT-BUDGET.md` (both in `touches:`) plus this note; size 7 + 4 = 11 lines (`git diff -M --numstat HEAD`) — clear.
- **Receipt** (post-review re-run):
  - `just check` → 0 (viz test/typecheck/lint/build, update-adopters suite + `--check`s, drift-checks self-test, `bash tools/drift-checks.sh` all ok)
  - `bash tools/drift-checks.sh context_budget` → 0 (prints `NEAR CAP SPEC/procedures/ft-task.md 24896 of 26000 (95%)` — advisory, recorded in the budget row)
  - `grep -q 'Acceptance that decides it' SPEC/procedures/ft-task.md` → 0
  - `grep -q '^last-verified: v8.3.0 · 2026-11-07$' SPEC/procedures/ft-task.md` → 0
- **External review** — `/code-review medium` over this task's working-tree diff only. Six notes, no blocker; all fixed:
  1. Budget criterion named a nonexistent check `budgets` → fixed to `context_budget`.
  2. Mirror omitted the drift-surface rule → clause now says "surface a drifted one".
  3. Clause sat under the `SPEC.md` §"Tasknote body shape" citation, which doesn't own it → moved after that citation with its own `SPEC/starter.md` pointer.
  4. Mirror omitted the `<Criterion>` placeholder skip → "placeholders skipped".
  5. Cap rationale still claimed 1,327 headroom → updated to 1,104.
  6. Edit crosses the 95% NEAR CAP line unrecorded → recorded in the history row. No offsetting trim: the cap row's trim rule binds only an edit past the headroom, and this one is within it.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change (the edit mirrors an existing `SPEC/starter.md` rule into the SOP; no AI-referenced doc restates the SOP's Acceptance bullet or stamp). Post-sweep guardrails re-run: clear.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-07.` stub at top of `## Completed`, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`: the re-check routine is already contract (`SPEC/procedures/README.md`).

**Final Summary:**

Re-checked the agent-neutral `ft-task` SOP against the 8 `source:` commits that skipped it since 2026-10-11. Seven were no-drift (model-pick examples, `[moderate]` rename, micro wording, a Claude-only invocation note, brand casing, audit wording fixes). One — CORE-850.2's starter readiness basis — was real drift: the SOP's Phase 1 Acceptance bullet now says promoted-starter criteria arrive verbatim (placeholders skipped), are added to, and are surfaced when drifted, never silently reworded or dropped, pointing at `SPEC/starter.md`. Restamped `v8.3.0 · 2026-11-07`.

- **Changed:** `SPEC/procedures/ft-task.md` (+5/−2), `docs/CONTEXT-BUDGET.md` (+2/−2), `.flaitron/PLAN.md` (flip).
- **Verification:** `just check` → 0; all four Acceptance commands → 0.
- **`touches:` reconciliation:** `git diff --name-only` = the two declared paths plus workflow paths; no strays.
- **Maintainability:** SOP at 24,896 / 26,000 bytes (95%, NEAR CAP) — the next substantial SOP edit should offset with a trim.
- **Deferred hand-offs:** none.

**Archived:** 2026-11-07
