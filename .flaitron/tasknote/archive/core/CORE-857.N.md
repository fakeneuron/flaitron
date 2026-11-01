---
title: context-redundancy audit
status: completed
tags: [context, epic-audit]
created: 2026-11-01
due:
related-tasks: [CORE-EPIC-857, CORE-857.1, CORE-857.2, CORE-857.3, CORE-857.4, CORE-857.5, CORE-857.6]
touches:
  - docs/CONTEXT-BUDGET.md
---

# CORE-857.N | context-redundancy audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-857]]

## 🎯 Goal

Verify the completed `CORE-EPIC-857` (`context-redundancy`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, a per-runner cold-start re-measure against the CORE-856 survey's byte targets, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — `bash tools/drift-checks.sh` → 0
- [x] Per-runner cold start re-measured against the survey's byte targets (Claude and Codex/Cursor/Grok paths, `wc -c`, `.flaitron/PLAN.md` excluded) — recorded in Implementation Notes
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-857` (Step 5), landing in the audit's closure commit
- [x] Single `chore: CORE-857.N — audit CORE-EPIC-857` commit lands (docs/markdown only, no code edits; this closure commit)
- [x] PLAN.md line for `CORE-857.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-857.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Re-measure the per-runner cold start at HEAD against the survey commit (`63cbb972`) and each child's byte target
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-857.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-857]] — parent epic
- [[CORE-857.1]] · [[CORE-857.2]] · [[CORE-857.3]] · [[CORE-857.4]] · [[CORE-857.5]] · [[CORE-857.6]] — the audited cohort
- [[CORE-856]] — the survey whose byte targets this audit re-measures against

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Invoked via `/ft-close-epic CORE-857.N`. All six children (`.1`–`.6`) closed 2026-11-01, in the order `.2` → `.5` → `.6` → `.4` → `.3`, matching the `.1` Fan-out's Sequential edges. No open siblings, so this is not an early audit.

- [x] Read relevant source files — all six archived cohort notes, `docs/HARNESS-SURVEY.md` §"2026-11-01 — third pass", the `.1` closure's PLAN rows (`af97ca0c`) for each child's filed byte target, `docs/CONTEXT-BUDGET.md` §"Budgets" / §"Cap history" / §"Ledger", and `tools/drift-checks.sh` `context_budget`

- [x] **Best Practices Review** — `N/A`: an audit pass over markdown deliverables; no module boundary

- [x] **Archive skim** — self-referential (the cohort is the archive). Predecessor [[CORE-EPIC-724]]'s harvest rate (44% of gross) is the survey's projection basis and is used below.

- [x] **Drift check** — every child's deliverable paths exist at HEAD. No child moved a SPEC heading (`.6` asserted it; `pair_q` passes). The `.N` PLAN row matches this note's scope.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — no clarifications needed. Assumptions: (1) the survey's "cold start" is its own `wc -c` load-path set, measured here the same way with `PLAN.md` excluded, because PLAN size is rotation and not contract; (2) the §"Ledger" default-path row (chars, a different file set) stays a `/ft-release` §7.1 refresh by rule, as `.4` already left it.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

Cohort deliverables:

- **`.1` context-redundancy discovery:** filed `.2`–`.6` with byte targets and the Fan-out. No contract edits.
- **`.2` procedure-point-not-narrate:** `SPEC/procedures/ft-task.md` 34,197 → 25,042. Six B2 sites and an approved extension are now pointers, and a fact ledger maps each cut to its owner. Cap 34,200 → 26,000.
- **`.3` readme-history-out:** `.flaitron/tasknote/README.md` 11,052 → 6,573, with the history moved to the new `docs/DOC-DRIFT-SWEEP.md` (4,949). Flaitron-self only, so `templates/tasknote-README.md` is untouched.
- **`.4` skill-b2-pointers:** `claude/skills/ft-task/SKILL.md` 27,101 → 23,487. Five B2 sites plus the Phase 3 restatement are now pointers. The file got its own budget row at 27,000.
- **`.5` small-task-routing:** skip wins over an ID, the doc-patch threshold went ~10 → ~25 lines, and standalone skip-tier rows close as a self-contained stub. `/ft-task` Step 1 gains a tier advisory. Micro `N/A` lines fold into one line. Nine files changed, with three budgets recorded as "held".
- **`.6` spec-c-extraction:** `SPEC.md` 44,818 → 43,772 (−1,046, re-scoped from ≥3,000). No heading moved. Cap 49,000 → 48,000.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the inline fix extends the existing headroom-shortfall wording in the `claude/skills/*/SKILL.md` glob row ("under one working unit of headroom, so its next substantial edit extracts")

- [x] **Minimal refactor gate** — two `## Budgets` cells corrected; no cap, ledger, or history row touched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: no executable surface

**Implementation Notes:**

**Per-runner cold-start re-measure** (`wc -c`, survey commit `63cbb972` → HEAD `ad8ae237`, `.flaitron/PLAN.md` excluded; the survey's own totals included it at 7,867):

| Path | Survey (contract) | HEAD | Δ | Survey projection (44% harvest) | Gross upper bound |
|---|---|---|---|---|---|
| Claude flagless `/ft-task` | 128,434 | 120,249 | **−8,185 (−6.4%)** | ~10.3 KB (7.6%) | 23,491 |
| Codex / Cursor / Grok | 127,960 | 114,003 | **−13,957 (−10.9%)** | ~15.4 KB (11.4%) | 35,041 |

Harvest relative to gross is 35% on the Claude path and 40% on the others. CORE-724.1 recorded 44%. Both paths land about 80–90% of the realistic projection.

Where the bytes came from:

| File | Survey | HEAD | Δ | Child | Filed target | Met |
|---|---|---|---|---|---|---|
| `SPEC.md` | 44,818 | 43,772 | −1,046 | `.6` | ≥3,000 out → re-scoped ~1,000 | yes (re-scope); −1,954 short of filed |
| `claude/skills/ft-task/SKILL.md` | 27,158 | 23,487 | −3,671 | `.4` (+`.5` −57) | ≤23,500 | yes |
| `claude/skills/ft-task/preamble.md` | 7,513 | 8,524 | +1,011 | `.5` | — | cost of the tier advisory |
| `.flaitron/tasknote/README.md` | 11,052 | 6,573 | −4,479 | `.3` | ≤6,600 | yes |
| `SPEC/procedures/ft-task.md` | 34,197 | 25,765 | −8,432 | `.2` (−9,155) + `.5` (+723) | ≤26,000 | yes |
| template, `gates.md`, `post-closure.md`, `AGENTS.md` | — | — | 0 | — | — | untouched |

The Claude shortfall against the projection (~2.1 KB) splits into `.6`'s re-scope (−1,954 vs filed) and `.5`'s preamble growth (+1,011). Both are recorded in their own notes as deliberate: CORE-657 guard clauses, and the tier advisory the operator selected. Off the cold-start path, `.5` also grew `tasknote-selection.md` +457, `plan-filing.md` +612, `micro-mode.md` +515, and the micro template +312.

**Coherence findings:**

- **Threshold:** "~25 lines" appears in exactly the four places `.5` named (`tasknote-selection.md:20`, procedure `:33`, `ft-audit/SKILL.md:96`, survey history). No "~10" remains in any contract or skill file.
- **Skip-tier stub:** the anchor `plan-filing.md` §"Exception — skip-tier closures" is cited consistently from `tasknote-selection.md:25` and `plan-filing.md:50`. `docs/GLOSSARY.md` and `templates/tasknote-README.md` describe micro as "above the skip threshold" and still agree.
- **Pointer targets:** `.4` repointed after `.6`, and `.6` moved no heading. `pair_q`, `pair_s`, and the full drift job are green.
- **`.3` history move:** the README keeps one pointer (L76). `DOC-DRIFT-SWEEP.md` is not in the sweep list, by its own exclusion record.
- **`.6` VISION pointer:** `docs/VISION.md:19` still names SPEC §"Core principles" as canonical, so there is no circular canonicity. `step-7.1-mirror-pairs.md:92` was restated by `.6` to match.
- **Micro fold:** `docs/EXTERNAL-AGENTS.md` §"Stable surfaces for callers" pins only the full template's phase headings and `**Final Summary:**` / `**Archived:**`, so the micro `**N/A:**` fold changes no stable surface.
- **Miss (fixed inline):** two `docs/CONTEXT-BUDGET.md` §"Budgets" cells now describe headroom that `.5` spent. `SPEC/procedures/ft-task.md` claimed "~1.1–1.8 working units" with 235 B left, which is less than one substantial edit (+524). `preamble.md` claimed "~1.5 working units" with 476 B left, about a third of a sibling unit (~1,400). `.5` had flagged the procedure (".N should note it"). Both cells now record the remaining headroom and the next edit's remedy (trim or extract before the cap raises). No cap changed: raising would undo the ratchet the epic exists to set.

**Not changed, by rule:** §"Ledger" → "Default-path cold start" still reads CORE-854's figures (`ft-task/SKILL.md` 27,158, README 11,052, …). Its own header assigns the refresh to `/ft-release` §7.1, so the next cut (CORE-855, already queued) re-measures it.

**Misses filed as child rows:** none. The one miss was fixed inline.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: markdown only

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` → 0 (`context_budget` re-reads the edited table)

- [x] **Verification receipt** — see Testing Notes

- [x] **External review** — `N/A`: two prose cells with no executable surface, and their numbers are verifiable from the receipt

- [x] (frontend) `N/A`

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash tools/drift-checks.sh` → 0
- `git diff --check` → 0
- `wc -c SPEC/procedures/ft-task.md claude/skills/ft-task/preamble.md` → 25,765 / 8,524 (caps 26,000 / 9,000: 235 / 476 headroom, matching the cell text)
- Re-measure command: per-file `git show 63cbb972:<f> | wc -c` vs `wc -c < <f>` over the survey's load-path set → the tables above

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — cumulative over the cohort, per §"AI-referenced docs" entry. `README.md` no change (its layout list names `SPEC/` modules and `docs/` generically). `AGENTS.md` no change (the `docs/` bullet is generic, and `DOC-DRIFT-SWEEP.md` is a history record). `SPEC.md` no change (`.6`'s edits are internally consistent; L434-436's "skipped the tasknote altogether" defers to `tasknote-selection.md`, so it tracks `.5`). `docs/MIGRATION.md` no change (no threshold or routing restatement). `claude/AGENTS-snippet.md` no change (it defers the use/skip decision to `tasknote-selection.md`). `codex/` / `cursor/` / `grok/AGENTS-snippet.md` no change (no routing prose; they point at the procedure, whose path is unchanged). `docs/CONVENTIONS.md` no change (its §"Core principles" #5 and `scope-boundaries.md` citations still resolve). `CONTRIBUTING.md` no change. `SECURITY.md` no change. `docs/AGENT-NEUTRALITY.md` no change (the procedure row cites §"Agent-neutral primitives", which `.2` kept). `docs/PLATFORMS.md` no change (procedure-pointer rows are path-level). `claude/CAPABILITIES.md` no change. `docs/AGENT-COMPAT.md` no change. `docs/EXTERNAL-AGENTS.md` no change (the micro `**N/A:**` fold touches no stable-surface row; the full template is untouched). `docs/WORKTREES.md` no change. `docs/VISION.md` no change (L19 still names SPEC canonical, and the new SPEC → VISION pointer agrees). Outside the list: `docs/CONTEXT-BUDGET.md` got two §"Budgets" cells corrected (Implementation Notes).

- [x] Closed — Acceptance ticked, `status: completed`, the `.N` row is a `Completed 2026-11-01.` stub, the parent `CORE-EPIC-857` flipped and moved with its cohort to the top of `## Completed` (`## High` back to `(none)`), and the note moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — Final Summary below

- [x] **Learnings** — `N/A`: the lesson (a planned consumer of a just-lowered cap should update that cap's "Why" cell in the same closure) is recorded in the corrected cells themselves, and the always-loaded layer needs no line for it

**Final Summary:**

The `context-redundancy` cohort holds together. Cold start fell by 8,185 B on Claude (−6.4%) and 13,957 B on Codex/Cursor/Grok (−10.9%), about 80–90% of the survey's realistic projection. The one miss is fixed inline: two budget rows described headroom that `.5` had already spent.

- **Re-measure:** survey `63cbb972` → HEAD, `wc -c`, PLAN excluded. Claude 128,434 → 120,249; others 127,960 → 114,003. Harvest is 35% / 40% of gross (CORE-724.1: 44%). `.2`, `.3`, and `.4` met their filed targets. `.6` met its re-scoped ~1,000 (−1,954 vs the filed ≥3,000). `.5` added +1,011 to the every-run preamble.
- **Coherence:** "~25 lines" stands in exactly the four places `.5` named. Skip-tier stub citations agree. No heading moved, and `pair_q` / `pair_s` / the drift job are green. The VISION pointer is not circular, and the micro fold touches no caller stable surface.
- **Inline fix:** `docs/CONTEXT-BUDGET.md` §"Budgets": the `SPEC/procedures/ft-task.md` cell (235 B left, less than one substantial edit) and the `preamble.md` cell (476 B left, about a third of a sibling unit) now say so and name the remedy (trim or extract before the cap raises). No cap changed.
- **Left by rule:** §"Ledger" default-path cold start is refreshed by `/ft-release` §7.1 at the next cut (CORE-855).
- **Misses filed:** none. The parent epic flips in this closure.
- **Scope reconciliation:** declared `docs/CONTEXT-BUDGET.md`; changed `docs/CONTEXT-BUDGET.md` plus `.flaitron/` workflow metadata. No undeclared deliverable.
- **Verification:** `bash tools/drift-checks.sh` → 0; `git diff --check` → 0.

**Archived:** 2026-11-01
