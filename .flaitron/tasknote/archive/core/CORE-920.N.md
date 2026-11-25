---
title: near-cap-trims-2 audit
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-920, CORE-920.2, CORE-920.3, CORE-920.4, CORE-941, CORE-942]
touches:
  - docs/CONTEXT-BUDGET.md
  - .flaitron/PLAN.md
---

# CORE-920.N | near-cap-trims-2 audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-920]]

## 🎯 Goal

Verify the completed `CORE-EPIC-920` (`near-cap-trims-2`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — one parity miss (cap policy), fixed inline
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — `context_budget` ok, full drift scan 0, self-test 50/50
- [x] Audit findings recorded in Implementation Notes. No miss needed a child row: the cap miss was fixed inline, and the two unfiled review findings became standalone Low parks ([[CORE-941]], [[CORE-942]]), so they don't hold the epic open
- [x] Single `chore: CORE-920.N — audit CORE-EPIC-920` commit lands (docs and PLAN only, no code)
- [x] PLAN.md line for `CORE-920.N` flipped to stub form `Completed 2026-11-24.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-920.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — cumulative doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-920.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-920]] — parent epic (near-cap-trims-2; Theme: Budget trims don't hold).
- [[CORE-920.2]] / [[CORE-920.3]] / [[CORE-920.4]] — the audited cohort.
- [[CORE-941]] / [[CORE-942]] — Low parks filed from [[CORE-920.2]]'s unfiled review findings.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** operator invoked `/ft-close-epic CORE-920.N`; pre-flight passed. All three implementation children closed 2026-11-24 (`493fee98`, `73dfc108`, `02801e78`); no early audit. The epic has no `.1` — Discovery was supplied by audit-repo 2026-11-24.

- [x] Read relevant source files — the three archived cohort tasknotes in full; `docs/CONTEXT-BUDGET.md` §"Budgets" (the six rows) and §"Cap history"; `tools/update-adopters/text.mjs` `workflowPasteBlock`; `tools/drift-checks.sh` `updater_roster`.

- [x] **Best Practices Review** — `N/A`: audit of markdown contract trims; no module boundary moves.

- [x] **Archive skim** — self-referential (`CORE-*` → `archive/core/`, confirmed against the README table); the cohort notes already cite their precedents ([[CORE-869.5]], [[CORE-891]], [[CORE-915]], [[CORE-929]]).

- [x] **Drift check** — HEAD `02801e78`: `bash tools/drift-checks.sh context_budget` → `ok`, full scan → 0. Sizes match each child's Final Summary: post-closure 8,911 / 10,000, tasknote-selection 11,161 / 12,500, procedure 23,667 / 26,000, snippet 11,574 / 13,800, ft-release SKILL.md 31,264 / 33,000, ft-release/** 95,996 / 104,000.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Cohort deliverables:
- [[CORE-920.2]] — `SPEC/post-closure.md` 9,579 → 8,911, `SPEC/tasknote-selection.md` 12,190 → 11,161; caps held, two `held` Cap-history entries.
- [[CORE-920.3]] — `SPEC/procedures/ft-task.md` 24,763 → 23,667, `claude/AGENTS-snippet.md` 13,544 → 11,574 (paste-block −180); caps held, two `held` entries.
- [[CORE-920.4]] — `ft-release/SKILL.md` 38,425 → 31,264, `ft-release/**` 108,536 → 95,996; caps **ratcheted** (40,000 → 33,000 at 97%, 113,000 → 104,000) after review flagged slack past the rows' own "measured + ~1.5 units" rule. Its Learnings hand this audit the question of whether .2 / .3's held rows carry the same excess.

Clarifications surfaced:
1. **Cap-policy parity.** Slack to cap in the rows' own units: post-closure 1,089 (~1.1 of a ~1,000 unit) and tasknote-selection 1,339 (~1.3) sit inside ~1.5. The procedure's 2,333 is ~2.6 upper-bound units (892) and the snippet's 2,226 is ~6 (363), both past the rule .4 ratcheted on. The procedure row's "Why" cell also still narrates "1,104 left", which .3 kept as a dated step.
2. **Unfiled review findings.** [[CORE-920.2]]'s External review surfaced two out-of-diff findings "to the operator for filing" that never reached PLAN.md: `text.mjs` `workflowPasteBlock` opens only on column-0 backtick fences, though `fenceOpeners` admits tilde and indented ones; `drift-checks.sh` `updater_roster`'s anchored sed skips roster lines with leading or trailing whitespace. That second one fails closed, as `UNLISTED MODULE`. Both are still present at HEAD.

AskUserQuestion with the 🛠️ Phase 1→2 cue (default-fire-on-clarifications). Operator: tighten both caps inline; file both findings as Low parks. Assumptions: re-size to measured + ~1.5 units in the row's own unit, rounded to 100 as the ft-release row is; give the procedure the snippet's 97% NEAR CAP override, since 1.5 units is ~5% there too; the §"Ledger" snapshots stay `/ft-release`'s job.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-920.4]]'s re-size (measured + ~1.5 units, NEAR CAP at 97% where 1.5 units is about 5%, [[CORE-891]]'s override)

- [x] **Minimal refactor gate** — two Budgets rows, two Cap-history entries, two PLAN rows; nothing else

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: cap values in a doc table; `context_budget` is the guard

**Implementation Notes:**

- Cohort inventory: .2 trimmed two SPEC modules and .3 trimmed the procedure and the snippet, both holding their caps; .4 trimmed the ft-release body and directory and ratcheted both caps. All six surfaces named by the epic row now print no NEAR CAP.
- Coherence: the trims follow the same shape (restatement → pointer, headings and guarded literals kept, §"Ledger" left to `/ft-release`). The one inconsistency was cap policy. .4 re-sized while .2 and .3 held, and two held rows carried slack well beyond their own "measured + ~1.5 units" rule.
- Inline fix, `docs/CONTEXT-BUDGET.md`:
  - `SPEC/procedures/ft-task.md`: 26,000 → 25,000 (23,667 + 1.5 × 892), with NEAR CAP at 97%, so 750 chars are left when it fires. The "Why" cell's dated CORE-857.5 / 869.5 / 876 narration is replaced by the re-size; Cap history still holds it.
  - `claude/AGENTS-snippet.md`: 13,800 → 12,100 (11,574 + 1.5 × 363). Its 97% line now leaves exactly one upper unit, 363, replacing 414.
  - Each row gets a `[[CORE-920.N]]` Cap-history entry.
  - post-closure (1,089 slack) and tasknote-selection (1,339) sit inside ~1.5 units of their ~1,000 unit, so they are left held.
- Misses filed as epic child rows: none.
- Open hand-offs: [[CORE-920.2]]'s two "surfaced to the operator for filing" findings had no PLAN row. They are filed as standalone Low parks: [[CORE-941]] (`workflowPasteBlock` opener forms) and [[CORE-942]] (`updater_roster` whitespace).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `context_budget`, full drift scan, drift-check self-test

- [x] Ran lint/type-check on changed code — `git diff --check` clean; no code changed

- [x] **Verification receipt** — receipt below; no code changed, so the structural assertions are `N/A`

- [x] **External review** — a fresh general-purpose subagent graded the diff; findings below

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
bash tools/drift-checks.sh context_budget                → 0   (ok; procedure 23,667 / 25,000, snippet 11,574 / 12,100)
bash -c '[[ $why =~ NEAR\ CAP\ at\ ([0-9]+)% ]]' per row → 97% for both rows
bash tools/drift-checks.sh                               → 0   (full scan)
node --test tools/drift-checks.test.mjs                  → 0   (50 pass, 0 fail)
git diff --check                                         → 0
```

External review: no blocker, three notes.
- **Fixed**, snippet "Why" cell: "over the last twenty touching commits" was ambiguous after the re-size. It now reads "…commits at [[CORE-881]])".
- **Fixed**, [[CORE-942]] row: an all-skipped or tab-trailed roster also yields `VACUOUS` / `STALE ROSTER LINE`. The row now names all three outcomes.
- **No change**, the "Surfaced by [[CORE-920.2]]'s review" tail on the new rows: it is intended provenance.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — every entry: no change (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/` / `codex/` / `cursor/` / `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`). None of them states a cap figure; `git grep` finds the old caps only in `docs/CONTEXT-BUDGET.md`. The cumulative check across the cohort's three per-task sweeps finds no new staleness. `docs/AGENT-COMPAT.md`'s fuller race history, which [[CORE-920.4]] noted, is a doc that isn't budgeted, so no cap or contract rests on it.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A` for the always-loaded layer. For the next near-cap epic: decide hold-vs-re-size once at the epic level, so the children don't diverge.

**Final Summary:**

The CORE-EPIC-920 cohort holds together. All six surfaces are clear of NEAR CAP, and with this audit all six caps sit near the "measured + ~1.5 units" rule, so the freed room can't silently regrow. Two review findings left unfiled by CORE-920.2 are now Low parks.

Recap:
- **Changed:** `docs/CONTEXT-BUDGET.md` (procedure cap 26,000 → 25,000 at 97%, snippet cap 13,800 → 12,100, two "Why" cells, two Cap-history entries) and `.flaitron/PLAN.md` ([[CORE-941]] and [[CORE-942]] filed, the audit stubbed, the parent flipped and the cohort moved to `## Completed`).
- **Verification:** see Testing Notes; every command exits 0.
- **Refactors:** none.
- **Docs:** no drift.
- **Scope:** declared 2 files plus this note; changed 2.
- **Maintainability:** the procedure and the snippet now raise NEAR CAP after about one substantial edit, not three to six, matching the ft-release rows.

**Archived:** 2026-11-24
