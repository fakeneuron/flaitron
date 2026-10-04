---
title: audit-skip-threshold-inline
status: completed
tags: []
created: 2026-06-05
due:
related-tasks: [CORE-285]
---

# CORE-286 | audit-skip-threshold-inline

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-285]]

## 🎯 Goal

When an audit finding's fix is trivial enough to hit the skip-the-tasknote path (single-line doc patch, trivial config edit), let the audit skills execute it inline and record it directly under `## Completed` instead of filing an intermediate `## Low` ticket that needs a separate `/ft-task` cycle.

## ✅ Acceptance

- [x] Each of the 6 ticket-writing audit skills (`ft-audit`, `-backend`, `-docs`, `-frontend`, `-performance`, `-security`) gains a **trivial-fix carve-out** in §5: a finding whose fix hits the skip-the-tasknote threshold (single-line doc patch, formatting tweak, ~10-line-or-under doc edit, trivial config) is presented as a distinct "Proposed inline fixes" block and, on the same write-step confirmation that lands the tickets, applied inline and recorded directly under `## Completed`.
- [x] The recorded `## Completed` line is **self-contained** (retains a short description + `Surfaced by <audit-label> YYYY-MM-DD (Finding #N, <severity>), fixed inline`) — because there is no tasknote/archive file to be the canonical record.
- [x] §6 "Write tickets, not fixes" hard rule in each of the 6 skills references the carve-out so the auditor doesn't read a flat contradiction.
- [x] Carve-out rides the **existing** review-then-write confirmation — no new gate; stays consistent with each skill's "make no changes without explicit confirmation" posture. Anything above the skip threshold still files a normal ticket.
- [x] `ft-audit-context` left untouched (out of scope per operator answer; preserves its CORE-186 no-auto-write design).
- [x] SPEC/tasknote-selection.md §"`## Completed` archive convention" gets a one-line exception noting that inline audit-fix lines retain their description (no archive to be canonical). **(gate-approved)**

## 🧩 Subtasks

- [ ] Draft the shared carve-out block (§5) + the §6 amendment, with per-skill provenance label + per-skill "no code changes" wording matched.
- [ ] Apply to `ft-audit`, `ft-audit-backend`, `ft-audit-docs`, `ft-audit-frontend`, `ft-audit-performance`, `ft-audit-security`.
- [ ] (if gate-approved) Add the one-line exception to SPEC/tasknote-selection.md §"`## Completed` archive convention".
- [ ] Doc-drift sweep + closure.

## 🔗 Related

- [[CORE-285]] — sibling inline-flow task (ft-release-inline), filed in the same commit.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The 6 ticket-writing audit skills carry §5 "write tickets to PLAN.md" + §6 "Write tickets, not fixes / No code changes" + an intro "make no changes without explicit confirmation" — exactly the posture CORE-286 carves a narrow exception into. Live and accurate; no re-scope needed.

- [x] Read relevant source files — all 6 audit `SKILL.md` §5/§6, `ft-audit-context` (scope check), SPEC/tasknote-selection.md (skip threshold + Completed-archive convention), template.

- [x] **Archive skim** — 21 prior tasknotes touched audit skills. Most relevant: **CORE-186** (built `ft-audit-context` deliberately as *no-auto-write / soft prose* → confirms leaving it out of an inline-**execute** carve-out is the right call, matching the operator's scope answer). Others (CORE-213 cross-ref hygiene, CORE-217/219 fork-shadow wiring) are about install/wiring, not the no-edit posture. No prior tasknote loosened the "no code changes" rule — this is the first carve-out.

- [x] **Drift check** — clean. All 6 skills file findings into `## High`/`## Medium`/`## Low`/`## Future` per §5.3; the task's "intermediate `## Low` entry" framing matches. `ft-audit-security` already carries an `**Exception:**` clause pattern (secret-leaked) in §5 step 4 — a precedent shape to mirror.

- [x] Asked clarifying questions — Confirm model: operator delegated ("use your best judgement") → **Ride the existing write gate** (no new gate; consistent with "no changes without explicit confirmation"). Scope: **6 ticket-writing audits** (ft-audit-context excluded).

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Completed-line shape divergence.** The normal `## Completed` stub convention (SPEC/tasknote-selection.md) drops the long description because the archived tasknote is canonical. An inline audit-fix has **no** tasknote/archive, so its Completed line must be self-contained (retain description + provenance). This is a sanctioned divergence — and the one item that pushes a sliver beyond the "6 skills" scope: SPEC §"`## Completed` archive convention" should gain a one-line exception, else a reader checking the authority sees an apparent violation. Flagging at the 🛠️ gate for in/out decision rather than silently expanding scope.
- Edits target repo `claude/skills/ft-audit*/SKILL.md` (canonical source; adopters fork these per MIGRATION §1.2.1).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — mirrored `ft-audit-security`'s existing `**Exception:**` clause shape in §5 step 4 (precedent for carve-outs to "No code changes"); reused the canonical skip-the-tasknote threshold language from SPEC/tasknote-selection.md verbatim; matched each skill's existing §5 step-4 + §6 "Write tickets, not fixes" wording rather than inventing a uniform replacement.

- [x] Implemented the minimal solution — identical carve-out block + step-4 pointer + §6 exception clause across all 6 skills (provenance label + per-skill "no code changes" wording matched), plus the SPEC corollary one-liner.

- [x] Updated/added tests for non-trivial behavior — N/A (prose skill/spec files; no executable behavior).

**Implementation Notes:**

- Per skill: (1) appended a one-line pointer to §5 step 4, (2) inserted the **Trivial-fix carve-out** block after step 5 (before the "Zero findings" line), (3) appended an **Exception** clause to the §6 "Write tickets, not fixes" rule. `ft-audit-security` got tailored wording ("trivial hygiene only — never apply an actual security fix inline"); `ft-audit-docs` got a note that doc audits hit the carve-out often.
- `ft-audit-context` deliberately untouched (no-auto-write design, operator-scoped out).
- SPEC/tasknote-selection.md §"`## Completed` archive convention": added an **Exception — inline audit fixes** paragraph (self-contained line retains description; no archive to be canonical).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code; prose files).

- [x] Ran lint/type-check on changed code — markdown lint pass: fenced-block balance even in all 7 files (6 skills = 4 each; SPEC = 2); carve-out present in exactly the 6 in-scope skills; `ft-audit-context` = 0; §6 exception clause in all 6; corrected an internal cross-ref ("§3 tickets" → "the proposed-ticket list") since proposed tickets live in §4, not §3.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

- `grep` verification: 6 carve-out blocks, 0 in `ft-audit-context`, all fences even.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 cold-start AI-referenced docs: **no change**. Edits touched only on-demand files (6 audit `SKILL.md` + `SPEC/tasknote-selection.md`), which the README explicitly excludes from the cold-start sweep. `docs/MIGRATION.md:68` ("writes-tickets skill") stays accurate — the carve-out is a narrow exception, not a redefinition.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-05.` and tasknote moved to `.flowtron/tasknote/archive/core/CORE-286.md`.

- [x] Recap drafted (inline on conditional skip — closure diff is prose/spec only, no signal trips).

**Final Summary:**

Added an identical **trivial-fix carve-out** to all 6 ticket-writing audit skills (`ft-audit`, `-backend`, `-docs`, `-frontend`, `-performance`, `-security`): when a finding's fix is small enough to hit the skip-the-tasknote threshold, the auditor presents it under a "Proposed inline fixes" heading and — on the *same* write-step confirmation that lands the PLAN.md tickets — applies it inline and records a self-contained line directly under `## Completed`, instead of filing a throwaway `## Low` ticket that needs its own `/ft-task` cycle. The carve-out rides the existing review-then-write gate (no new gate; consistent with each skill's "no changes without explicit confirmation"); anything above the skip threshold still files a normal ticket. Per-skill: a §5 step-4 pointer, the carve-out block, and a §6 "Write tickets, not fixes" exception clause — with tailored wording for `-security` (trivial hygiene only, never a real security fix inline) and `-docs` (hits the carve-out often). `ft-audit-context` left untouched (no-auto-write design). A corollary one-liner in SPEC/tasknote-selection.md §"`## Completed` archive convention" documents why these inline-fix lines retain their description (no archive to be the canonical record).

**Archived:** 2026-06-05
