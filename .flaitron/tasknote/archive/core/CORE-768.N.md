---
title: plan-auto-rotate audit
status: completed
tags: []
created: 2026-10-09
due:
related-tasks: [CORE-EPIC-768, CORE-768.1, CORE-768.2, CORE-768.3, CORE-768.4]
touches:
  - SPEC/plan-filing.md
  - .flaitron/PLAN.md
---

# CORE-768.N | plan-auto-rotate audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-768]]

## 🎯 Goal

Verify the completed `CORE-EPIC-768` (`plan-auto-rotate`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-768` (Step 5), landing in the audit's closure commit
- [x] Single `feat: CORE-768.N — audit CORE-EPIC-768` (or `chore: ...` if no code edits land) commit lands
- [x] PLAN.md line for `CORE-768.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-768.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-768.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-768]] — parent epic
- [[CORE-768.1]] — Discovery
- [[CORE-768.2]] — auto-rotate-contract
- [[CORE-768.3]] — rotation-advisory-retire
- [[CORE-768.4]] — epic-parent-auto-flip

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All four implementation children (.1–.4) closed 2026-10-09, no open siblings, so a full-cohort audit (no early-audit decision).

- [x] Read relevant source files — the four cohort archives (`archive/core/CORE-768.{1,2,3,4}.md`) in full; `SPEC/plan-filing.md` §"Epic parent flip" + §"`## Completed` rotation"; `SPEC/post-closure.md` (full); `SPEC/epic.md` (full); the cohort's mirror sites via `git grep`

- [x] **Best Practices Review** — `N/A`: verification pass over markdown contract; no code or module boundary in scope

- [x] **Archive skim** — self-referential: the cohort children are the load-bearing archive entries, and each already carried its own skim ([[CORE-467]], [[CORE-604.4]], [[CORE-638.3]], [[CORE-089]], [[CORE-473.5]], [[CORE-620]]). No non-cohort surfaces in scope

- [x] **Drift check** — every surface the cohort cited resolves at `938a457f`; the PLAN parent row and `.N` row match this scope. No drift

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: archived notes, `docs/VERSION-HISTORY.md`, and `docs/CODEX-VERIFICATION.md` are historical and excluded from the stale-wording greps

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Active model Opus 5.5 under a `[heavy]` tag: satisfied.

Cohort deliverables:
- [[CORE-768.1]] — scoping only: filed .2–.4, resolved mechanism (agent procedure, no script), separate `chore:` rotation commit, >60 → 40 hysteresis, parent auto-flip in any closing runner.
- [[CORE-768.2]] — `SPEC/plan-filing.md` §"`## Completed` rotation" rewritten as a five-step agent procedure; `SPEC/post-closure.md` step 2 hook + `· rotated` 🏁 suffix; first self-rotation `b8f262f1` (204 → 39 rows).
- [[CORE-768.3]] — runner advisories retired (preamble, SOP, `/ft-close-epic`); `/ft-release` §7.1 relabelled an advisory backstop with a Step 8 rotation bullet; mirrors (GLOSSARY, MIGRATION, templates/PLAN.md, EXTERNAL-AGENTS, SPEC.md) reworded.
- [[CORE-768.4]] — `SPEC/plan-filing.md` §"Epic parent flip" + post-closure pre-step-1 hook + `· flipped` suffix; `/ft-close-epic` Yes/No prompt and `--unattended` deferral retired across skill, fragment, command doc, Codex wrapper, gates/gate-postures, and mirrors; audit misses now filed as open children in the audit's own closure commit.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `N/A`: verification pass; the one inline fix is a one-word rewording in place

- [x] **Minimal refactor gate** — no refactor

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown prose only

**Implementation Notes:**

Coherence findings:
- **Rotation numbers agree everywhere.** 60-row bound / 40-row target match across `SPEC/plan-filing.md`, `SPEC/post-closure.md`, `docs/GLOSSARY.md`, `docs/MIGRATION.md`, `templates/PLAN.md`, and `/ft-release` §7.1. No 150/100 remnants.
- **Retired wording is gone** from live surfaces: `git grep` for operator motion / rotation advisory / two advisory checks / never applies it / parent-flip prompt|approval|deferral returns only historical files, apart from the one hit fixed below.
- **Bundled in-📦 prompt** references (gates.md, gate-postures.md, blocked.md, unattended-mode.md, CAPABILITIES, SECURITY.md, ft-task, ft-epic-discovery, ft-release) are all generic or name `/ft-release` push-go, which is still live. Consistent with [[CORE-768.4]]'s explicit assumption.
- **Ordering is consistent.** Flip runs before step 1 staging (lands in the closure commit); rotation counts after the closure SHA (step 2); `· flipped` precedes `· rotated` on 🏁. `SPEC/plan-filing.md`, `SPEC/post-closure.md`, `SPEC/epic.md`, the SOP placement line, `/ft-close-epic` Steps 8–9, and its `--unattended` fragment all agree.
- **Worktree asymmetry is stated on both sides:** rotation skips linked worktrees, the flip does not, and each section says why.
- No regressions in earlier-shipped cohort surfaces: .3's edits did not reintroduce anything .2 retired, and .4's edits left .2's hook and .3's backstop intact.

Inline fix:
- `SPEC/plan-filing.md`:343 §"`## Completed` rotation" → "Consumers": "are the motion's beneficiary" → "are the rotation's beneficiary". Leftover of the retired "operator motion" phrasing that .2's `operator motion` grep could not catch (the word was split from "operator").

Misses filed as child rows: none.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: markdown; `bash tools/drift-checks.sh` is the applicable suite

- [x] Ran lint/type-check on changed code — `N/A`: no code

- [x] **Verification receipt** — see Testing Notes

- [x] **External review** — `N/A`: the only diff is a one-word rewording whose correctness is decided by the grep below; no contract change to grade

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `git grep -n "motion's beneficiary" -- SPEC` → exit 1 (no matches)
- `bash tools/drift-checks.sh` → 0
- `## Completed` row count before the parent flip: 39; after the flip adds the 6-row cohort: 45, under the 60 bound, so no rotation this closure.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC.md`: no change (collateral-flip carve-out and rotation mirror match the contract). `docs/MIGRATION.md`: no change (60 → 40, closure that crosses the bound). `docs/EXTERNAL-AGENTS.md`: no change (item 7 matches §"Epic parent flip"). `claude/CAPABILITIES.md`: no change (`--unattended` row says the flip runs as on any closure). `README.md`, `claude/AGENTS-snippet.md`: no change (neutral rotation wording, still accurate). `docs/WORKTREES.md`: no change ("post-closure protocol unchanged" holds; the skip and the non-skip both live in that protocol). `AGENTS.md`, `codex/`, `cursor/`, `grok/` snippets, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md` (generic bundled-prompt wording), `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`, `docs/VISION.md`: no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`

**Final Summary:**

The `plan-auto-rotate` cohort is coherent. Rotation is an automatic >60 → 40 agent procedure, the runner advisories are retired with `/ft-release` §7.1 kept as a backstop, and an epic parent now flips itself on the closure that leaves its last child `[x]`. The numbers, ordering, worktree asymmetry, and retired wording agree across SPEC, skills, and mirrors.

- Changed: `SPEC/plan-filing.md` (one-word fix, "motion's" → "rotation's"), `.flaitron/PLAN.md` (`.N` stub, plus the parent flip and cohort move), and this archived note.
- Verification: stale-wording grep → no matches; drift checks → 0.
- Follow-ups: none filed.
- `touches:` reconciliation: diff = the declared `SPEC/plan-filing.md` + `.flaitron/PLAN.md`, plus this note.
- Maintainability: no change beyond removing the last trace of the retired operator-motion framing.

**Archived:** 2026-10-09
