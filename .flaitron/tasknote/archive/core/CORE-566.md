---
title: model-md-history-trim
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-565.2]
touches:
  - SPEC/model.md
---

# CORE-566 | model-md-history-trim

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-565.2]]

## 🎯 Goal

Trim `SPEC/model.md` of decision history and anecdotes so the file loaded on every non-Satisfied model gate carries only the rules and the dated calibration table.

## ✅ Acceptance

- [x] Tier-ladder rationale paragraph gone — `grep -c "tier-count-agnostic" SPEC/model.md` → 0
- [x] CORE-353.2 supersession note gone — `grep -c "CORE-353.2" SPEC/model.md` → 0
- [x] Pre-CORE-482 bias parenthetical gone — `grep -c "pre-CORE-482" SPEC/model.md` → 0
- [x] First-person Grok edge case gone — `grep -c "Grok 4.3" SPEC/model.md` → 0
- [x] §"Tier ladder" History block gone — `grep -c "^\*\*History\.\*\*" SPEC/model.md` → 0
- [x] Rules and dated calibration table stay — `grep -c "^## " SPEC/model.md` → 5 (no heading removed) and `grep -q "As of 2026-08-27" SPEC/model.md` → 0
- [ ] File shrinks by ~2.5k — `wc -c SPEC/model.md` < 16,500 — **not met**: 18,699 → 17,089 (−1,610). The five named passages measure 1,610 chars, not the ~2.5k [[CORE-565.2]] estimated; scope held to the PLAN line's list rather than widened to hit the estimate.
- [x] Nothing else in the file changes — `judgment`: `git diff --stat SPEC/model.md` shows deletions only, no insertions beyond a possible one-line rejoin

## 🧩 Subtasks

- [x] Delete the "Four tiers. The rule reads the ladder by position…" paragraph (L71-75)
- [x] Delete the "Maintaining this table supersedes CORE-353.2's…" paragraph (L185-188)
- [x] Delete the "(This flips the pre-CORE-482 … roster.)" parenthetical (L221-223)
- [x] Delete the "The model edge case exercised at the very start of *this* task…" bullet (L269-272)
- [x] Delete the "**History.** The glyph set was deliberately binary…" paragraph (L294-302)
- [x] Run the Acceptance greps + `wc -c`

## 🔗 Related

- [[CORE-565.2]] — lifecycle-value audit that filed this task (predecessor)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All five named passages are present at the cited lines and are pure decision history / anecdote — every fact they carry is already recorded elsewhere (`docs/AGENT-NEUTRALITY.md` L51 names CORE-259 / CORE-482.2 / CORE-482.3 and the CORE-353.2 supersession; the superseding tasknotes carry `supersedes:`; the Grok retag anecdote lives in its own archived note). Removing them loses no rule and no contract.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- `SPEC/model.md` is 18,699 chars; five H2 headings (Category-vs-concrete matching · Effort axis · Platform×model×effort calibration table · Practical guidance · Tier ladder vs. glyph). All headings survive the trim — `viz/src/parser.ts:15` and `viz/src/ui/ModelChip.tsx:5` cite §"Category-vs-concrete matching" by name; no live doc cites any of the five passages.
- **Best practices:** N/A — prose-only deletion in one SPEC module; no module boundary or code touched.
- **Archive skim:** 87 notes mention `SPEC/model.md`; read targeted instead of a probe, since the trim targets are five line ranges [[CORE-565.2]] already enumerated (row 33: L71-75, 185-188, 220-223, 269-272, 294-302). [[CORE-565.2]] L122/L150/L195 filed this as "~2.5k history/anecdote". The CORE-353.2 supersession is a *superseded decision* under `SPEC/superseded-claims.md` — recorded via `supersedes:` on the later note and in `docs/AGENT-NEUTRALITY.md`, never owed a home in the SPEC module. The `docs/CONTEXT-BUDGET.md` §"Ledger" row (`model.md` 18,699) is release-refreshed by `/ft-release` §7.1, not per task — leave it.
- **Drift check:** line numbers match the file as read today; the PLAN line's five-item list maps 1:1 onto the CORE-565.2 row-33 ranges. No SPEC contract contradicted.
- **Clarifications:** No clarifications needed. Assumptions: (1) scope is exactly the five named passages — borderline anecdotal lines outside the list (e.g. "Current Grok 4.x usage (2026-05)" L238-240) stay untouched; (2) the ledger byte count is not updated here; (3) no adopter-visible surface changes, so no release is bundled.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose deletion; no repo test covers SPEC prose

**Implementation Notes:**

- Five straight deletions in `SPEC/model.md`; no rewording, no heading moved. Pattern: same shape as [[CORE-565.2]]'s own inline trims (delete the history sentence, keep the rule). No refactor.
- Rejoin: removing the "(This flips the pre-CORE-482 …)" parenthetical shortened its host line to "headroom — the asymmetry is the argument." — the single `+` line in the diff.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no code changed; the Acceptance greps are the test

- [x] Ran lint/type-check on changed code — N/A, no markdown linter in the repo; trailing newline verified via `od -c`

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — N/A, no frontend surface

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- `grep -c "tier-count-agnostic" SPEC/model.md` → 0 (exit 1, count 0)
- `grep -c "CORE-353.2" SPEC/model.md` → 0
- `grep -c "pre-CORE-482" SPEC/model.md` → 0
- `grep -c "Grok 4.3" SPEC/model.md` → 0
- `grep -c '^\*\*History\.\*\*' SPEC/model.md` → 0
- `grep -c "^## " SPEC/model.md` → 5 · `grep -q "As of 2026-08-27" SPEC/model.md` → exit 0
- `wc -c SPEC/model.md` → 17,089 (criterion < 16,500 **not met**; see Acceptance annotation)
- `git diff --stat SPEC/model.md` → 1 insertion, 28 deletions; the insertion is the rejoined host line
- Structural assertions: no duplication introduced, no dead prose left dangling (each deleted block was a self-contained paragraph or bullet), no public-surface growth, no code-facing doc affected.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep:** all 18 entries "no change". `docs/AGENT-NEUTRALITY.md` L51 is the one that names `SPEC/model.md`; it records *why* the sections exist and the subsection it cites (§"Practical guidance and agent-aware defaults") survives, so it stays accurate. `docs/CONTEXT-BUDGET.md` §"Ledger" is release-refreshed, not per task (Discovery Notes).

**Final Summary:**

- **Changed:** `SPEC/model.md` — 28 lines deleted, 1 rejoined; 18,699 → 17,089 chars (−1,610). Five passages removed: the tier-count rationale paragraph (§"Category-vs-concrete matching"), the CORE-353.2 supersession note (§"Platform×model×effort calibration table"), the pre-CORE-482 bias parenthetical (§"Practical guidance"), the first-person Grok 4.3 retag anecdote (§"Cross-provider calibration"), and the §"Tier ladder vs. the next-move suggestion glyph" **History** paragraph. Every rule, the match table, the effort axis, the dated calibration table, and all five H2 headings are intact.
- **Verification:** five presence greps → 0; H2 count → 5; as-of stamp present; diff = 1+/28−.
- **Not met:** the `< 16,500` byte criterion — the five named passages total 1,610 chars, not the ~2.5k [[CORE-565.2]] estimated. Scope held to the PLAN line's enumerated list. Borderline anecdotal lines outside it ("Current Grok 4.x usage (2026-05)"; the "Some Claude Opus sessions benefit…" calibration bullet) are left for a deliberate follow-up if the operator wants the extra ~900 chars.
- **Refactors:** none. **Docs:** no drift. **Superseded claims:** none — the ~2.5k figure was a marked estimate, not a falsified fact.
- **`touches:` reconciliation:** declared `SPEC/model.md`; `git diff --name-only` = `SPEC/model.md` + workflow files (PLAN, this note). No undeclared deliverable paths.
- **Maintainability effect:** every non-Satisfied Step 1.5 model-gate branch now loads 1.6k fewer chars of history it never needed; the history remains readable on the archived notes and in `docs/AGENT-NEUTRALITY.md`.

**Archived:** 2026-09-10
