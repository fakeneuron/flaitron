---
title: contract-guard-gaps audit
status: completed
tags: [audit, drift-checks, sidequest]
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-742, CORE-742.2, CORE-742.3]
---

# CORE-742.N | contract-guard-gaps audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-742]]

## 🎯 Goal

Verify the completed `CORE-EPIC-742` (`contract-guard-gaps`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs) — stale-claim greps in Discovery Notes; content `judgment`
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — `bash tools/drift-checks.sh`, `node --test tools/drift-checks.test.mjs` each → 0
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (none surfaced)
- [x] Single `chore: CORE-742.N — audit CORE-EPIC-742` commit lands (no code edits)
- [x] PLAN.md line for `CORE-742.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-742.N.md`
- [x] Parent-flip prompt surfaced after audit closure — user confirms or declines flipping `CORE-EPIC-742` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-742.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: prompt the user in the 📦 bundle; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-742]] — parent epic (contract-guard-gaps)
- [[CORE-742.2]] — cohort child: `sidequest_orphan` check (closed-row orphans) + CORE-714 stub retirement
- [[CORE-742.3]] — cohort child: `PROMOTED STUB` branch (stub beside an active or archived tasknote)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-742` active under `## Medium`; `.2` and `.3` both `[x]` (closed 2026-10-08); no `.1` (Discovery supplied by `/ft-audit-repo`, per the parent line); `.N` is `[medium]`, which the Opus session satisfies.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both implementation children are closed, so this audits the full cohort. Pre-flight was clean: tree clean, no archive collision.

- [x] Read relevant source files — archived `CORE-742.2` / `CORE-742.3`; cohort commits `53a0ac3d`, `b0d14c41` (`git show --stat`); `tools/drift-checks.sh` (header + `sidequest_orphan()`), `tools/drift-checks.test.mjs` `CASES.sidequest_orphan`, `docs/CONVENTIONS.md` §"GitHub Actions CI", `claude/skills/ft-file-followup/park-mode.md` §Notes "Promotion", `claude/skills/ft-task/unattended-mode.md` (model-mismatch park vs. existing stub), `docs/GLOSSARY.md` "sidequest".

- [x] **Best Practices Review** — N/A: verification pass, no code edit.

- [x] **Archive skim** — `archive/core/` (README row `CORE-*` → `archive/core/` confirmed). The cohort notes are the archive entries, and their own skims covered the non-cohort history (CORE-606, CORE-359.3, CORE-714, CORE-739.2/.3).

- [x] **Drift check** — every path the cohort cites exists at HEAD `b0d14c41`. The PLAN line matches `SPEC/epic.md` §"Audit acceptance — fixed doc-drift line".

- [x] No clarifications needed. Assumptions: audit scope is the two-child cohort as filed; the parent flip is offered in the 📦 bundle, borrowing `/ft-close-epic` Step 8's shape, as CORE-741.N did under `/ft-task`.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable) — omitted: no file deliverable beyond the closure pair.

**Discovery Notes:**

**Cohort inventory.**

- **.2** — `sidequest_orphan()` in `tools/drift-checks.sh`: `ORPHANED STUB  <path>` when a stub's ID has a checked row in `PLAN.md` or `PLAN-ARCHIVE.md`. `MISSING FILE` when either file is absent. The `VACUOUS` floor is on the closed-ID read, not on the stub count. Two-orphan seeded case. `CORE-714.md` retired. Script header + `docs/CONVENTIONS.md` "Three checks…" sentence. Filed .3 from its external review (note 2).
- **.3** — same function, extra branch: `PROMOTED STUB  <stub>  (tasknote <path>)` when the ID has an active or archived tasknote. A closed row short-circuits with `continue`, so a stub never double-reports. The seed grew to four stubs. CONVENTIONS sentence extended. The script header was left as is on purpose.

**Stale-claim sweep** (`git grep -i sidequest` over the live tree, excluding archive, PLAN, PLAN-ARCHIVE and VERSION-HISTORY, filtered for orphan/retire/leftover/backstop/manual):

- `claude/skills/ft-task/SKILL.md` / `ft-micro-task/SKILL.md` / `SPEC/procedures/ft-task.md` Step 3b retirement prose — current. "Instead of relying on the promoter to remember a rule…" still describes the runner-side fix; the CI check is an added backstop, not a contradiction.
- `park-mode.md` §Notes "Promotion" — the delete rule the check enforces; the hand-expanded-starter path is covered by `PROMOTED STUB` (any tasknote status).
- `unattended-mode.md` model-mismatch park — leaves an existing stub untouched and writes **no** tasknote. So an `--unattended` stop cannot leave a stub-plus-tasknote pair that would trip `PROMOTED STUB`. The two contracts agree.
- `docs/GLOSSARY.md` "sidequest" — "deleting the stub on promotion" is current.
- `docs/CONVENTIONS.md` — names the check with both IDs, and the "Three checks" count is still right. The release walk's "thirteen functions" count is unchanged: `sidequest_orphan` is not in `'pair_*' wrapper_name_invariant`, same as `final_newline`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass, no edit.

- [x] **Minimal refactor gate** — no refactor.

- [x] Implemented the minimal solution — audit findings below; no inline fix needed.

- [x] Updated/added tests for non-trivial behavior — N/A (no code change; the cohort's seeded case is green).

**Implementation Notes:**

- **Cohort coherence: no inconsistencies.** Both finding lines share the `<KIND> STUB  <path>` shape (two-space separator, like the script's other findings). One function, one `bad=` accumulator, one VACUOUS floor. The seeded case covers all four branches (PLAN-ARCHIVE column-0 row, nested PLAN child, active note, archived note), and its regex requires all four lines. The design-note comment cites CORE-606, CORE-742.3, and the three historical orphans.
- **Observation, not a miss.** Script header line 20 credits the check to `CORE-742.2` only, while CONVENTIONS cites `.2` and `.3`. That is consistent with the header's convention of naming each check by its originating task (`CORE-729`, `CORE-621`), and the function comment credits .3. Left as is (.3 made the same call).
- **Theme coverage.** The parent's theme is "Prose rules without mechanical guards". The audit-repo run filed one guard, and its review added the promotion-time variant. Nothing else in this cohort's surface shows an unguarded prose rule, so no follow-up is filed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — no code changed; regression check below

- [x] Ran lint/type-check on changed code — N/A (no code change)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: the audit's diff is the closure pair (PLAN row flips + this archived note), with no code or contract prose to grade.

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A, no frontend change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (HEAD `b0d14c41`):

- `bash tools/drift-checks.sh` → 0 (all 16 checks `ok`, incl. `sidequest_orphan ok` with live stub `CORE-641` present)
- `node --test tools/drift-checks.test.mjs` → 0 (18/18)
- Stale-claim grep (Discovery Notes) → no stale hits

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry:
  - `README.md` — no change (does not enumerate drift checks)
  - `AGENTS.md` — no change ("seeds one known drift per check" covers the new seed generically)
  - `SPEC.md` — no change (no drift-check or sidequest-retirement text)
  - `docs/MIGRATION.md` — no change (the self-host CI check is not adopter-facing)
  - `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change (already updated by .2/.3; current)
  - `CONTRIBUTING.md`, `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change (no Claude-specific surface added)
  - `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change (the sidequest stub path is not a stable-surface row that moved)
  - `docs/WORKTREES.md`, `docs/VISION.md` — no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A. The cohort closed cleanly; nothing for the always-loaded layer.

**Final Summary:**

Audited the two-child `CORE-EPIC-742` (contract-guard-gaps) cohort and found it coherent. `sidequest_orphan` now catches both leftover-stub cases: `ORPHANED STUB` (the ID has a closed row) and `PROMOTED STUB` (the ID already has a tasknote). Both cases live in one function with one floor and a four-branch seeded case. Its docs agree with the promotion contract in park-mode.md, the runners' Step 3b, and the `--unattended` model-mismatch park. No inline fix, no follow-up filed. Verification: drift checks 0 (16/16 ok), drift self-test 18/18. Doc sweep: every entry no change. `touches:` omitted (no file deliverable); actual diff is the closure pair only (`.flaitron/PLAN.md` + this archived note). Parent flip: confirmed (commit-go) — `CORE-EPIC-742` flipped to stub form and moved with its three children to the top of `## Completed`; `## Medium` restored to `(none)`.

**Archived:** 2026-10-08
