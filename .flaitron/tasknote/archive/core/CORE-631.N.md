---
title: budget-headroom audit
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: [CORE-EPIC-631, CORE-631.2, CORE-631.3]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-631.N | budget-headroom audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-631]]

## 🎯 Goal

Verify the completed `CORE-EPIC-631` (`budget-headroom`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss. (See Final Summary — all 18 entries no change.)
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — no inconsistencies found.
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — `drift` CI job's Context budget / Final newline / Pair Q steps all green locally.
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate) — N/A, no misses found.
- [x] Single `feat: CORE-631.N — audit CORE-EPIC-631` (or `chore: ...` if no code edits land) commit lands — pending this closure's commit (no code edits landed → `chore:`).
- [x] PLAN.md line for `CORE-631.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flowtron/tasknote/archive/core/CORE-631.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-631` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `.flowtron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-631.N` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-631]] — parent epic (budget-headroom)
- [[CORE-631.2]] — lifted-pairs-single-body
- [[CORE-631.3]] — procedures-postures-headroom

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both cohort children (`CORE-631.2`, `CORE-631.3`) are closed and archived; no open siblings remain (checked PLAN.md nested children under `CORE-EPIC-631`). Standard end-of-epic audit — verify the cohort's deliverables still hold at HEAD and sit coherently together.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Logged "No clarifications needed" — cohort is fully closed (no early-audit partial-cohort scenario), no ambiguity in scope

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Cohort inventoried.** `CORE-631.2` (lifted-pairs-single-body): made `.github/workflows/ci.yml` the single body for the ten §7.1 mirror pairs (A, B, C, H, J, M, N, O, P, Q); `step-7.1-mirror-pairs.md` now catalogues each pair (purpose / `Reads:` / CI step name / findings glossary) instead of duplicating the shell; Pair L rewritten to compare CI step paths against each entry's `Reads:` line. `claude/skills/ft-release/**` dropped from 122,895 → 108,576 / 125,000 (~3.1 units headroom). Changed: `ci.yml`, `step-7.1-mirror-pairs.md`, `docs/CONVENTIONS.md`, `SKILL.md`. `CORE-631.3` (procedures-postures-headroom): re-measured the working unit for `SPEC/gate-postures.md` (≈+1,400/edit, 20,412/23,000, ~1.8 units headroom) and `SPEC/procedures/ft-task.md` (≈+524–892/edit, 35,933/38,000, ~2.3 units headroom) from each file's own commit history rather than a borrowed unit; both caps left unchanged, only `docs/CONTEXT-BUDGET.md`'s two "Why this number" cells rewritten. Changed: `docs/CONTEXT-BUDGET.md` only.
- **No overlap.** The two children's declared `touches:` sets are disjoint (`CORE-631.2`: `ci.yml`, `step-7.1-mirror-pairs.md`, `docs/CONVENTIONS.md`, `SKILL.md`; `CORE-631.3`: `docs/CONTEXT-BUDGET.md`), and each cites the other + `CORE-631.N` in `related-tasks`/`## 🔗 Related` — no contradictory cross-refs.
- **Drift check (re-verified at HEAD, no commits landed on either surface since 96becfd).** `find claude/skills/ft-release -type f -exec cat {} + | wc -c` → 108,576 (matches CORE-631.2's closing figure). `SPEC/gate-postures.md` → 20,412 bytes, `SPEC/procedures/ft-task.md` → 35,933 bytes (both match CORE-631.3's closing figures exactly). `docs/CONTEXT-BUDGET.md` rows for all three surfaces (`gate-postures.md` 23,000 cap, `ft-release/**` 125,000 cap, `procedures/ft-task.md` 38,000 cap) and the `CORE-631.3` provenance citations (2 of 2 present) confirmed via grep. `docs/CONTEXT-BUDGET.md` §Ledger stamp (`Measured 2026-09-20 at v5.30.0, refreshed by [[CORE-629]]`) untouched, per CORE-556.2. No drift.
- **Regression check.** Extracted and ran the `drift` CI job's "Context budget" step (green, exit 0 — no surface over budget), "Final newline" step (green), and "Pair Q — section citations resolve" step (green — no citation added by either child's docs edits went stale). `ci.yml` still parses as YAML (`ruby -ryaml`).
- **Doc-drift sweep, cumulative (walked `.flowtron/tasknote/README.md` §"AI-referenced docs" against both children's diffs together).** `docs/CONVENTIONS.md` §"GitHub Actions CI" already restates the flipped CORE-631.2 shape correctly ("For the ten mirror pairs the workflow step *is* the shell (`CORE-631.2`)"); read against HEAD, still accurate — no further change. `AGENTS.md`, `README.md`, `SPEC.md` reference `CONTEXT-BUDGET.md` / `gate-postures.md` / `ft-release` only by pointer, never restating a byte figure or working-unit claim — no change. Remaining entries (`docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`) — none names either surface. No change anywhere.
- **Cohort coherence.** Both children close in the same Final Summary shape (Changed / Verification / Refactors / `touches:` reconciliation / Maintainability effect), both cite the CORE-555 / CORE-558.5 provenance-cell voice consistently, and both correctly note their sibling in Related. No naming or style drift between them.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A, verification-only audit, no new code surface

- [x] **Minimal refactor gate** — N/A, no code edits applied

- [x] Implemented the minimal solution — N/A; audit found no misses requiring an inline fix (see Implementation Notes)

- [x] Updated/added tests for non-trivial behavior — N/A, no code changed

**Implementation Notes:**

- **Cohort children inventoried:** `CORE-631.2` (lifted-pairs-single-body — ten §7.1 mirror pairs made single-bodied in `ci.yml`, directory dropped to 108,576/125,000), `CORE-631.3` (procedures-postures-headroom — re-measured working units for `gate-postures.md` and `procedures/ft-task.md`, both caps confirmed unchanged with re-measured provenance recorded).
- **Coherence findings:** no inconsistencies surfaced. Declared `touches:` sets are disjoint, cross-references between the two children (and to this audit) are mutually consistent, closing Final Summary shape matches across both, and both closing figures still hold exactly at HEAD (no commits landed on either surface since).
- **Regression findings:** no inconsistencies surfaced. `Context budget`, `Final newline`, and `Pair Q` CI checks all green locally on HEAD; `ci.yml` parses as YAML.
- **Doc-drift findings:** no inconsistencies surfaced. Every `.flowtron/tasknote/README.md` §"AI-referenced docs" entry reads "no change" against this cohort (see Discovery Notes for the full per-entry pass).
- **Inline fixes applied:** none — no miss surfaced that needed one.
- **Misses logged for `/ft-file-followup`:** none.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no code changed; ran the relevant `drift` CI steps as verification instead (see Testing Notes)

- [x] Ran lint/type-check on changed code — N/A, no code changed; `ci.yml` YAML-parse-checked instead

- [x] **Verification receipt** — recorded below; N/A for duplication/dead-code/complexity checks since no code changed

- [x] (frontend) N/A — no frontend surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `find claude/skills/ft-release -type f -exec cat {} + | wc -c` → `108576` (matches CORE-631.2 closing figure) → exit 0
- `wc -c SPEC/gate-postures.md` → `20412`, `wc -c SPEC/procedures/ft-task.md` → `35933` (both match CORE-631.3 closing figures) → exit 0
- `grep -E '^\| `SPEC/(gate-postures|procedures/ft-task)\.md`' docs/CONTEXT-BUDGET.md | grep -c 'CORE-631.3'` → `2` → exit 0
- `grep -q '^Measured 2026-09-20 at v5.30.0, refreshed by \[\[CORE-629\]\]' docs/CONTEXT-BUDGET.md` → exit 0
- `drift` job "Context budget" step, extracted from `ci.yml` and run under `bash -e` → no output → exit 0
- `drift` job "Final newline" step, extracted and run under `bash -e` → no output → exit 0
- `drift` job "Pair Q — section citations resolve" step, extracted and run under `bash -e` → no output → exit 0
- `ruby -ryaml -e 'YAML.load_file(".github/workflows/ci.yml")'` → exit 0

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update: `README.md` — no change. `AGENTS.md` — no change. `SPEC.md` — no change. `docs/MIGRATION.md` — no change. `claude/AGENTS-snippet.md` — no change. `codex/AGENTS-snippet.md` — no change. `cursor/AGENTS-snippet.md` — no change. `grok/AGENTS-snippet.md` — no change. `docs/CONVENTIONS.md` — no further change (§"GitHub Actions CI" already restates the CORE-631.2 shape correctly, re-verified accurate at HEAD). `CONTRIBUTING.md` — no change. `SECURITY.md` — no change. `docs/AGENT-NEUTRALITY.md` — no change. `docs/PLATFORMS.md` — no change. `claude/CAPABILITIES.md` — no change. `docs/AGENT-COMPAT.md` — no change. `docs/EXTERNAL-AGENTS.md` — no change. `docs/WORKTREES.md` — no change. `docs/VISION.md` — no change.

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Doc-drift sweep (`.flowtron/tasknote/README.md` §"AI-referenced docs"): all 18 entries — **no change** (full per-entry list above; `docs/CONVENTIONS.md` was already updated correctly by `CORE-631.2` and re-verified accurate).

Audited the closed `CORE-EPIC-631` (budget-headroom) cohort — `CORE-631.2` (lifted-pairs-single-body) and `CORE-631.3` (procedures-postures-headroom); no `.1` Discovery sibling was filed (discovery was supplied directly by `/ft-audit-repo` 2026-09-20). Both children's closing figures re-verified byte-for-byte at HEAD (`claude/skills/ft-release/**` 108,576/125,000; `SPEC/gate-postures.md` 20,412/23,000; `SPEC/procedures/ft-task.md` 35,933/38,000; `docs/CONTEXT-BUDGET.md`'s two re-measured provenance cells intact) — no drift since either child's commit. Ran the `drift` CI job's "Context budget", "Final newline", and "Pair Q" checks locally: all green, confirming neither child's edits regressed a budgeted surface or broke a section citation. Cohort coherence checked: declared `touches:` sets are disjoint, cross-references between the two children (and to this audit) are mutually consistent, and both close in the same Final Summary shape. No inconsistencies, regressions, or doc drift surfaced — no `/ft-file-followup` filings needed.

- Changed (1 file): `.flowtron/tasknote/CORE-631.N.md` (this audit tasknote) plus its PLAN.md line and archive move; no source files edited.
- Verification: all commands and results recorded in Testing Notes above; all exit 0.
- Refactors: none — verification-only audit, no code changed.
- `touches:` reconciliation: no `touches:` declared (no file deliverable beyond this tasknote and PLAN.md/archive bookkeeping).
- Maintainability effect: confirms the `budget-headroom` cohort's two closing measurements still hold and the touched CI/docs surfaces regressed nothing, closing the epic with a positive integration signal rather than an assumed one.

**Parent-flip:** Operator confirmed Yes. `CORE-EPIC-631` flipped to stub form and, with its full cohort (`CORE-631.2`, `CORE-631.3`, `CORE-631.N`), moved atomically to the top of PLAN.md's `## Completed`.

**Archived:** 2026-09-20
