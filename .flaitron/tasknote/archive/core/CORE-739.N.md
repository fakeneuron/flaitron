---
title: drift-check-integrity audit
status: completed
tags: [drift, ci, tools, audit]
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-739, CORE-739.2, CORE-739.3]
---

# CORE-739.N | drift-check-integrity audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-739]]

## 🎯 Goal

Verify the completed `CORE-EPIC-739` (`drift-check-integrity`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and follow-up filings for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss. (Phase 4: all eighteen entries no change)
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces — `bash tools/drift-checks.sh` → exit 0, 15 `ok`; `node --test tools/drift-checks.test.mjs` → exit 0, 16/16
- [x] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [x] Single `feat: CORE-739.N — audit CORE-EPIC-739` (or `chore: ...` if no code edits land) commit lands (`chore:`, no code edits)
- [x] PLAN.md line for `CORE-739.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-739.N.md`
- [x] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-739` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [x] Phase 4: flip `CORE-739.N` PLAN line to stub form + archive tasknote
- [x] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-739]] — parent epic (drift-check-integrity)
- [[CORE-739.2]] — cohort child: VACUOUS floors
- [[CORE-739.3]] — cohort child: seeded-drift self-test

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — parent `CORE-EPIC-739` active under the top priority section; children `.2` and `.3` closed, `.N` the audit. No `.1`: the epic's Discovery was supplied by `/ft-audit-repo` (2026-10-08).

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `/ft-close-epic CORE-739.N` invoked; pre-flight clean. Both implementation children closed 2026-10-08, so this is a full-cohort audit, not an early one.

- [x] Read relevant source files — archived `CORE-739.2.md` and `CORE-739.3.md`; `tools/drift-checks.sh` header and every floor site; `tools/drift-checks.test.mjs` header and coverage test; `docs/CONVENTIONS.md` §"GitHub Actions CI"; `step-7.1-mirror-pairs.md` run block; the `tools/` lines in AGENTS.md, README.md and SPEC/layout.md.

- [x] **Best Practices Review** — N/A: a verification pass, no new code surface.

- [x] **Archive skim** — `archive/core/` (README row `CORE-*` → `archive/core/` confirmed). Cohort notes are the archive entries; their own skims already covered the non-cohort history (CORE-734.2, .5, .7).

- [x] **Drift check** — every cited path still exists at HEAD; 15 check functions, 13 `VACUOUS` floors + 2 header-exempt (skill_pin_guard_parity, pair_h), matching both children's notes.

- [x] No clarifications needed. Assumption: 739.2 review note 9 (dispatcher-level floor), which both children handed to this audit, is weighed here and filed as a follow-up candidate rather than fixed inline, because it changes a test's contract.

- [x] Subtasks above populated with ordered steps; YAML `touches:` omitted (no file deliverable beyond closure bookkeeping)

**Discovery Notes:**

- **CORE-739.2 (drift-vacuous-floor)** — `tools/drift-checks.sh`: header floor rule, an `n` counter + `VACUOUS <check>` exit on 13 checks, context_budget `n`→`sz`, `/**` MISSING DIR, shipped_skill_parity on captured lists; one `VACUOUS` sentence in `step-7.1-mirror-pairs.md`, two clauses in `step-7.1-standing-checks.md`.
- **CORE-739.3 (drift-self-test)** — `tools/drift-checks.test.mjs` (one seeded case per check, asserts the finding and no `VACUOUS`, coverage test from the dispatcher's regex, git-backed temp copy); the same `node --test` line in CI `validate` and AGENTS.md §Validation (Pair H ok); "seven" → "eight" count prose; three `tools/` inventories; one header shape-rule bullet.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: verification pass, no new code surface

- [x] **Minimal refactor gate** — N/A: no edits

- [x] Implemented the minimal solution — the audit findings below

- [x] Updated/added tests for non-trivial behavior — N/A: no code change

**Implementation Notes:**

Coherence findings: no inconsistencies surfaced.

- Naming: the floor line is `VACUOUS <check>  <unit hint>` at all 13 sites; the self-test's header, its per-case `doesNotMatch(/^VACUOUS /m)`, the script header and the mirror-pairs sentence all use the same word with the same meaning.
- Cross-refs agree: the script header points at the self-test (739.3's bullet) and the self-test says it rejects VACUOUS failures (739.2's floor). The 739.2 Discovery warning that 739.3's copy needs `.git` was honored (`git init && git add -A -f`; the final_newline and pair_q cases assert their real finding).
- Exemptions agree: the header exempts skill_pin_guard_parity and pair_h; the mirror-pairs sentence names only pair_h, which is correct in context — that paragraph covers the `'pair_*' wrapper_name_invariant` walk, which does not run skill_pin_guard_parity.
- Counts agree: AGENTS.md "eight commands", the mirror-pairs Pair H count, and the eight bound `- run:` steps in `validate`; no stale "seven" (`git grep` clean outside `.flaitron/`).
- `docs/CONVENTIONS.md` §"GitHub Actions CI" names neither the floor nor the self-test. Not drift: `validate` still runs AGENTS.md §Validation verbatim, and "the shell of each check lives in exactly one place" still holds (the self-test seeds input, it carries no check shell).

Miss (follow-up candidate):

- **`/ft-file-followup` candidate — missing-floor coverage.** 739.2 review note 9's open half, flagged again by 739.3's Final Summary: nothing fails when a new check lands without a `VACUOUS` floor. The self-test catches a check with no *case*, not one with no *floor*. Cheapest closure, keeping the inline idiom 739.2 chose over a dispatcher-level floor: extend the coverage test to assert each check body contains `VACUOUS <name>` unless it is one of the header's two exempt checks (and that the exempt list matches the header). Rationale for not fixing inline: it changes the self-test's contract and needs its own seeded proof and review.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed; ran the cohort's suites for regression (below)

- [x] Ran lint/type-check on changed code — N/A: markdown bookkeeping only

- [x] **Verification receipt** — Testing Notes

- [x] **External review** — N/A: no inline fix applied; the diff is PLAN.md + this tasknote

- [x] (frontend) N/A — no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash tools/drift-checks.sh` → exit 0, 15 `ok`
- `node --test tools/drift-checks.test.mjs` → exit 0, 16 pass / 0 fail
- `grep -c 'echo "VACUOUS ' tools/drift-checks.sh` → 13 (+ 2 header-exempt = 15 checks)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change to any of the eighteen README §"AI-referenced docs" entries. README.md, AGENTS.md and SPEC/layout.md `tools/` lines already name the self-test (739.3); AGENTS.md §Validation carries the roster line and "eight" count; docs/CONVENTIONS.md and SECURITY.md describe the jobs, not their contents, and stay true; docs/AGENT-NEUTRALITY.md's `wrapper_name_invariant` row is unaffected; SPEC.md, MIGRATION.md, the four AGENTS-snippets, CONTRIBUTING.md, PLATFORMS.md, CAPABILITIES.md, AGENT-COMPAT.md, EXTERNAL-AGENTS.md, WORKTREES.md and VISION.md do not touch the drift script.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A; the floor and self-test rules live in the script header.

**Final Summary:**

The audit found no inconsistencies between CORE-739.2's floors and CORE-739.3's self-test, and no doc drift. Both suites pass. One miss is logged as a `/ft-file-followup` candidate: missing-floor coverage, the open half of 739.2 review note 9. Changed: `.flaitron/PLAN.md` (audit stub, parent flip) and this tasknote; no code. Parent flip: operator confirmed at the 📦 gate; CORE-EPIC-739 stubbed and the cohort moved to the top of `## Completed`, `## High` back to `(none)`.

**Archived:** 2026-10-08
