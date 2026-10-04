---
title: neutrality-ledger-enumerations
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: [CORE-466, CORE-520]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - docs/AGENT-NEUTRALITY.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-521 | neutrality-ledger-enumerations

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-466]]

## 🎯 Goal

Correct the two drifted enumerations audit-docs flagged in `docs/AGENT-NEUTRALITY.md`: the `--fast` ledger row's heading lists/counts, and the §"Out of scope" CAPABILITIES bullet's trigger list.

## ✅ Acceptance

- [ ] The `--fast` ledger row's `SPEC.md` heading list includes §"🎯 Scaffold-time purpose blurb" and its count reads 6
- [ ] The `--fast` ledger row's `SPEC/gates.md` heading list and count are corrected to match the sections SPEC.md actually names
- [ ] The §"Out of scope" `claude/CAPABILITIES.md` bullet's trigger list includes `--deep`
- [ ] No other ledger rows or unrelated content changed

## 🧩 Subtasks

- [ ] Edit `docs/AGENT-NEUTRALITY.md`'s `--fast` ledger row: add §"🎯 Scaffold-time purpose blurb" to the SPEC.md list (5→6 sites), and correct the SPEC/gates.md list from "§Conditional skip rule (1 site)" to the three sections SPEC.md explicitly names-and-links (§"Phase 1→2 exit gate", §"`--fast` operator override", §"Conditional skip rule") (3 sites)
- [ ] Edit the §"Out of scope" CAPABILITIES bullet's trigger-flag list to add `--deep`, in the order `claude/CAPABILITIES.md`'s own table uses it
- [ ] Re-read both edits for grammar/format consistency with the rest of the file
- [ ] Run the doc-drift sweep and close

## 🔗 Related

- [[CORE-466]] — established this ledger's row format and the per-heading site-count convention this task is correcting drift in
- [[CORE-520]] — audit-docs 2026-08-30 pass that surfaced this finding (Findings #2 + #3, Medium)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Single-file doc-table fix, well-scoped, matches the [[CORE-466]] precedent exactly (same file, same row-editing pattern, no code touched).

- [x] Read relevant source files — grepped every literal `--fast` occurrence in `SPEC.md` and `SPEC/gates.md` and mapped each to its enclosing heading, rather than trusting the existing ledger cell.

- [x] **Best Practices Review** — N/A, doc-only prose-table edit; no code touched, no module boundaries involved.

- [x] **Archive skim** — `grep -l AGENT-NEUTRALITY .flowtron/tasknote/archive/core/*.md` found 10 hits. [[CORE-466]] is the direct precedent: it introduced this exact ledger row format (heading list + per-file site count) and the "ledger is written-at-introduction, not periodically re-audited" ownership note in §"Out of scope for this ledger" — this task is a drift-correction of an existing row, not a new-surface registration, so that ownership clause doesn't apply here. [[CORE-520]] (audit-docs-default-scope, same day) is the sibling finding that surfaced CORE-521 but touches a different file (`docs/MIGRATION.md` + `ft-release/SKILL.md`) — no overlap.

- [x] **Drift check** — verified both counts against current file content:
  - `SPEC.md`: grepped literal `--fast` (6 hits across headings: §"Operator-gate cues" line 681 — generic link to the whole of `SPEC/gates.md`, no section anchor; §"🎯 Scaffold-time purpose blurb" lines 765-766 — **currently missing from the ledger row, confirmed drift**; §"📝 Phase 1: Discovery" line 828 — links to `SPEC/gates.md` §"Phase 1→2 exit gate"; §"🧪 Phase 3: Testing & Linting" lines 891/893 — links to `SPEC/gates.md` §"`--fast` operator override"; §"Loop tasks" line 1008 — links to `SPEC/loop.md`, not gates.md, for its canonical contract; §"Post-closure protocol" line 1017 — links to `SPEC/gates.md` §"Conditional skip rule"). That's 6 distinct SPEC.md headings carrying `--fast` content, confirming the task's "omits §Scaffold-time purpose blurb" claim and that the count should read 6, not 5.
  - `SPEC/gates.md`: the ledger's "1 site (§Conditional skip rule)" undercounts. Of the 6 SPEC.md headings above, three carry an *explicit named link* into `SPEC/gates.md`: §"Phase 1→2 exit gate" (from Phase 1 Discovery), §"`--fast` operator override" (from Phase 3 Testing), and §"Conditional skip rule" (from Post-closure protocol). §"Operator-gate cues" links to gates.md generically (no section anchor), and §"🎯 Scaffold-time purpose blurb" / §"Loop tasks" don't link into gates.md for `--fast` at all. So the accurate count is **3 named sites in `SPEC/gates.md`**, not 1 — this task corrects both halves of the row, not just the SPEC.md half named in the PLAN.md line.

- [x] **Second finding verified** — the PLAN.md description's second clause: the §"Out of scope" CAPABILITIES bullet's trigger list `(effort/thinking, --fast, --unattended, --debug, --worktree, --park, /model, /clear, structured ask, and sub-agent / isolated exploration)` omits `--deep`. Confirmed against `claude/CAPABILITIES.md`, which documents `--deep` as a real trigger (line 35, on `/ft-epic-discovery`) — omission confirmed, not a stale claim.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: "site" in this ledger means a heading in the target file that the source file explicitly names/links for `--fast` content (matching the existing row's own methodology of naming SPEC.md headings), not every raw string occurrence — this is what makes the SPEC.md list's existing 5 headings (now 6) internally consistent, and the same yardstick applied to gates.md yields 3.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:** PLAN.md's description bundled two findings in the same file: (1) the `--fast` ledger row omits §"🎯 Scaffold-time purpose blurb" from its SPEC.md list, plus an open "re-check" of the paired gates.md count; (2) the §"Out of scope" CAPABILITIES bullet's trigger list omits `--deep`. Discovery confirmed both and resolved the open re-check: the gates.md count is also wrong (1 → 3), using the same site-counting convention the row already uses on its SPEC.md half. No re-scope — both are the same class of fix (a stale enumeration in the same file) with a concrete answer now in hand for each.

✅ Phase 1 Discovery complete; entering Phase 2 Execution. Discovery surfaced no significant deviation from the PLAN.md line (the "re-check" was explicitly open-ended and resolved in-scope) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extends the exact row-editing pattern [[CORE-466]] established; no new shape needed.

- [x] **Minimal refactor gate** — N/A, no refactor; single table-cell text edit.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose documentation only, no testable behavior.

**Implementation Notes:** Two edits, both in `docs/AGENT-NEUTRALITY.md`. (1) The `--fast`/`-f` ledger row's "Section / context" cell (line 40): added `§"🎯 Scaffold-time purpose blurb"` to the SPEC.md heading list (count 5→6), and replaced the SPEC/gates.md half from `§"Conditional skip rule" (1 site in \`SPEC/gates.md\`)` to `§"Phase 1→2 exit gate", §"\`--fast\` operator override", §"Conditional skip rule" (3 sites in \`SPEC/gates.md\`)`, preserving heading order matching document order in each file. (2) The §"Out of scope" `claude/CAPABILITIES.md` bullet's trigger list: inserted `--deep` after `--park`, matching `claude/CAPABILITIES.md`'s own table row order (`--fast` → `--unattended` → `--debug` → `--worktree` → `--park` → `--deep`). No other row or prose in the file touched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no test suite covers prose table content; verified structurally instead (see Testing Notes).

- [x] Ran lint/type-check on changed code — N/A, no linter configured for markdown in this repo (confirmed by [[CORE-520]]'s same-day finding that `docs` declares no markdown-lint slot).

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation — N/A, single markdown table-cell edit; no code surface affected.

- [ ] (frontend) Asked the user for visual confirmation — N/A, not a frontend change.

**Testing Notes:** Verified structurally: re-ran the same greps used in Discovery against the edited file to confirm the ledger row's cell text now lists 6 SPEC.md headings and 3 SPEC/gates.md headings, confirmed the table's column count (pipe count) on the edited row still matches its neighbors (no broken table syntax introduced), and grepped the §"Out of scope" bullet to confirm `--deep` now appears in the trigger list, matching `claude/CAPABILITIES.md`'s own documented trigger.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs" (18 entries):
  - `README.md` — no change
  - `AGENTS.md` — no change
  - `SPEC.md` — no change (this task corrects a ledger row *about* SPEC.md's content; it doesn't edit SPEC.md itself)
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `cursor/AGENTS-snippet.md` — no change
  - `grok/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — **updated** (this task's deliverable): corrected the `--fast` ledger row's SPEC.md heading list/count (5→6) and SPEC/gates.md heading list/count (1→3); added `--deep` to the §"Out of scope" CAPABILITIES trigger list
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change
  - `docs/VISION.md` — no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Corrected two drifted enumerations in `docs/AGENT-NEUTRALITY.md`. **File:** `docs/AGENT-NEUTRALITY.md` (2 lines edited, both single table/list cells). **(1) `--fast`/`-f` ledger row (line 40)**, stale on both halves: added the missing §"🎯 Scaffold-time purpose blurb" heading (which states `--fast` doesn't suppress the blurb) to the SPEC.md list, 5→6, confirmed by grepping every literal `--fast` occurrence in `SPEC.md` and mapping each to its enclosing heading; and, resolving the PLAN.md line's open "re-check", corrected the paired SPEC/gates.md list from "§Conditional skip rule (1 site)" to the three sections SPEC.md explicitly names-and-links — §"Phase 1→2 exit gate", §"`--fast` operator override", §"Conditional skip rule" — using the same site-counting convention the row already applies to its SPEC.md half, 1→3. **(2) §"Out of scope" CAPABILITIES bullet:** added the missing `--deep` trigger to the flag list, in `claude/CAPABILITIES.md`'s own table order, confirmed against that file's line 35 which documents `--deep` as a real `/ft-epic-discovery` trigger. **Verification:** structural — re-grepped both edited spots post-edit against source content, and confirmed the ledger row's table column (pipe) count still matches its neighbors (no broken table syntax). **Refactors:** none — two single-cell text corrections. **Documentation:** this task's deliverable *is* the doc correction; doc-drift sweep swept clean otherwise. **Maintainability effect:** the ledger's whole purpose is to let future audits trust its enumerations instead of re-deriving them from scratch ([[CORE-466]]); stale counts and omitted flags defeat that purpose exactly where an auditor would otherwise stop looking — this closes both gaps.

**Archived:** 2026-08-30
