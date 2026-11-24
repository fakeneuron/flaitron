---
title: derived-figures audit
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-EPIC-919, CORE-919.2, CORE-919.3, CORE-919.4]
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

# CORE-919.N | derived-figures audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-919]]

## 🎯 Goal

Verify the completed `CORE-EPIC-919` (`derived-figures`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-919` (Step 5), landing in the audit's closure commit — no misses, nothing filed
- [x] Single `feat: CORE-919.N — audit CORE-EPIC-919` (or `chore: ...` if no code edits land) commit lands — `chore:` (no code edits)
- [x] PLAN.md line for `CORE-919.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-919.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — cumulative doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5)
- [x] Phase 4: flip `CORE-919.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-919]] — parent epic
- [[CORE-919.2]] · [[CORE-919.3]] · [[CORE-919.4]] — audited cohort

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-close-epic` invoked; pre-flight passed. All three implementation children (.2, .3, .4) closed 2026-11-24, no open siblings, no early-audit decision. No `.1` child — Discovery was supplied by `/ft-audit-repo` 2026-11-24.

- [x] Read relevant source files — the three archived cohort tasknotes, `.flaitron/audit-overlay/SKILL.md` (HEAD), `tools/drift-checks.sh` `reconciled_pin`, `claude/skills/ft-release/SKILL.md:198`, `step-7.1-mirror-pairs.md:12-15`, `docs/CONVENTIONS.md:60`

- [x] **Best Practices Review** — N/A: verification pass, no code edits

- [x] **Archive skim** — self-referential (cohort children are the archive entries); CORE-869.4 (prior pass-4 measurement) and CORE-900 (prior hand pin bump) already cited by the cohort notes; no further non-cohort context needed

- [x] **Drift check** — cohort-cited paths all present at HEAD; overlay pin v8.5.0 = `SPEC.md` v8.5.0; `bash tools/drift-checks.sh reconciled_pin` ok

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed: full cohort closed, scope is the three children

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable) — scaffolded list kept; `touches:` omitted (no file deliverable beyond PLAN/tasknote)

**Discovery Notes:**

- **CORE-919.2** (overlay-figures-to-commands) — `.flaitron/audit-overlay/SKILL.md`: pin v8.4.0 → v8.5.0 (scaffold diff empty); docs-scope `(129 files at v8.3.0)` → `| wc -l`; structure pass-4 median/p90/count/outliers → one `git ls-files … | awk` pipeline + `tail -2` variant. Frontend chunk sizes kept as the regression baseline. Filed .3 and .4.
- **CORE-919.3** (reconciled-pin-guard) — `reconciled_pin()` in `tools/drift-checks.sh` (pin vs `SPEC.md` `**Version:**`, `VACUOUS` floor, `STALE PIN` + triage line); seeded self-test case; §7.1 runner line + sixteen-`ok` count; `/ft-release` SKILL.md Acceptance / §5 / §7.4 staging; `docs/CONVENTIONS.md` roster (nine checks).
- **CORE-919.4** (overlay-markdown-counts) — overlay `docs:` line: `1,311 of 1,441 … (as of 2026-11-07)` → archived-count and total commands; "two orders of magnitude" → "the large majority".
- Epic's named stale figures (drift-checks.sh line count in pass 4, the v8.4.0 pin) are both now command-derived or guarded.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass over existing cohort deliverables, no new surface

- [x] **Minimal refactor gate** — no refactor

- [x] Implemented the minimal solution — coherence checklist walked; findings below

- [x] Updated/added tests for non-trivial behavior — N/A: no code fix

**Implementation Notes:**

- Coherence: .2 and .4 use the same convention (command in backticks beside the figure it sizes) on the same file; .3 guards the one figure (`flaitron-reconciled:`) that cannot be a command. Release-recipe text (`ft-release/SKILL.md:198`), runner line (`step-7.1-mirror-pairs.md:12`, sixteen `ok`), `docs/CONVENTIONS.md:60` and the script header all name `reconciled_pin` consistently. No contradictory cross-refs.
- Remaining figures in the overlay: line 82 frontend chunk sizes `at v6.0.0` (deliberate regression baseline, kept by .2 with reason) and line 59 provenance dates (history, not measurements). Not misses.
- Regressions: `bash tools/drift-checks.sh` → 0 (six pre-existing NEAR CAP advisories, owned by CORE-EPIC-920); `reconciled_pin ok`.
- Inline fixes: none.
- Misses filed: none.
- Open hand-offs: none deferred (.2 deferred item became .4 and closed; .3 and .4 state "none deferred" / no hand-off; the `ft-release/**` near-cap note points at filed CORE-920.4).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed

- [x] Ran lint/type-check on changed code — N/A: no code changed

- [x] **Verification receipt** — N/A: markdown-only audit; drift job run as regression check (below)

- [x] **External review** — N/A: no diff beyond PLAN.md flips and this note

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
bash tools/drift-checks.sh                 → 0 (NEAR CAP advisories only, pre-existing)
bash tools/drift-checks.sh reconciled_pin  → 0 (reconciled_pin ok)
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `docs/CONVENTIONS.md`: no change (updated by CORE-919.3; roster and runner line match the script). No change: `README.md`, `AGENTS.md` (overlay named as a path only; drift checks "among others"), `SPEC.md`, `docs/MIGRATION.md` (adopter-side pin flow, unaffected), the four `*/AGENTS-snippet.md`, `CONTRIBUTING.md` (overlay symlink line only), `SECURITY.md` (fork-marker parse rule, unaffected), `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`.

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → `Completed 2026-11-24.` stub; last child, so CORE-EPIC-919 flipped and moved with its cohort to the top of `## Completed`; tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary

- [x] **Learnings** — N/A

**Final Summary:** Audited CORE-EPIC-919 (derived-figures): the three children cohere — .2 and .4 swapped the audit overlay's hand-copied figures for the commands that yield them, .3 added the `reconciled_pin` drift check so the one figure that cannot be a command fails at the release cut. Cross-refs across `tools/drift-checks.sh`, `/ft-release`, the §7.1 runner and `docs/CONVENTIONS.md` agree. No inconsistencies surfaced, no misses filed, no hand-offs deferred. Drift job green. Doc-drift sweep: no change.

**Archived:** 2026-11-24
