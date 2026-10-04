---
title: gate-postures-headroom
status: completed
tags: [context-budget]
created: 2026-09-22
due:
related-tasks: [CORE-670.N, CORE-631.3, CORE-665]
touches:
  - SPEC/gate-postures.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-671 | gate-postures-headroom

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-670.N]]

## 🎯 Goal

Restore `SPEC/gate-postures.md` to ≥10% / ≥1.5 working units of headroom under its 23,000 cap by trimming redundant prose (no contract change, no cap raise), and record which headroom measure — flat 10% or each row's working-unit sizing — governs `claude/skills/ft-release/**`.

## ✅ Acceptance

- [x] A1 `SPEC/gate-postures.md` ≤ 20,700 chars (≥10%; ≥2,100 = 1.5 × ~1,400 units) — `test $(wc -c < SPEC/gate-postures.md) -le 20700`
- [x] A2 Cap unchanged — ``grep -q '^| `SPEC/gate-postures.md` | 23,000 |' docs/CONTEXT-BUDGET.md``
- [x] A3 Every `##`/`###` heading and every inbound-cited bold lead (`Implied by the [unattended] row marker`) survives — `diff <(git show HEAD:SPEC/gate-postures.md | grep -E '^#{2,3} ') <(grep -E '^#{2,3} ' SPEC/gate-postures.md)` empty, plus `grep -q 'Implied by the `\[unattended\]` row marker' SPEC/gate-postures.md`
- [x] A4 Pair K2 still holds for `**Runtime stays out.**` — `grep -A6 -e '^\*\*Runtime stays out\.\*\*' SPEC/gate-postures.md | grep -q 'VISION\.md'`
- [x] A5 `docs/CONTEXT-BUDGET.md` states that each row's working-unit sizing, not a flat percentage, governs headroom, and Cap history records the trim — `grep -q 'CORE-671' docs/CONTEXT-BUDGET.md && grep -c 'CORE-671' docs/CONTEXT-BUDGET.md` → ≥2
- [x] A6 CI budget + section-citation checks green — the `drift`-job context-budget script and Pair Q resolver run by hand → exit 0
- [x] A7 No contract meaning lost — `judgment`: every cut is a restatement of text that survives elsewhere in the same file or a provenance aside; reviewed by External review

## 🧩 Subtasks

- [x] Trim redundancies in `SPEC/gate-postures.md` (lead blockquote list, §Flag-precedence lead, matrix "four surfaces" re-enumeration, `--fast` closing paragraph, "Not a widening" provenance, Park-conversions delegation re-statement)
- [x] Measure; iterate until ≤ 20,700
- [x] `docs/CONTEXT-BUDGET.md`: add headroom-measure sentence after §Budgets Precedence; append CORE-671 to gate-postures Cap history
- [x] Run A1–A6 verify commands

## 🔗 Related

- [[CORE-670.N]] — surfaced this (gate-postures 6.1%, ft-release/** 8.8%)
- [[CORE-631.3]] — measured the ~1,400-char posture working unit; row says next substantial edit should trim/extract before raising
- [[CORE-665]] — added the "Not a widening any more" paragraph being compressed

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** HEAD matches the PLAN figure exactly (21,592 / 23,000 = 6.1%, headroom 1,408 ≈ 1.0 unit). The row itself prescribes trim-or-extract before a raise.

- [x] Read relevant source files — `SPEC/gate-postures.md` (whole), `docs/CONTEXT-BUDGET.md` (whole), `claude/skills/ft-release/step-7.1-mirror-pairs.md` Pair K2.

- [x] **Best Practices Review** — N/A for code; for prose: each cut must be a restatement whose canonical copy stays in the same file (DRY within the module).

- [x] **Archive skim** — `archive/core/` confirmed against README table (`CORE-*` → `archive/core/`). Hits: CORE-631.3 (measured posture unit ≈ +1,400 from CORE-536 +1,438 / CORE-617 +1,383; judged no ~1,400-byte duplication *then* at 20,412 — since then CORE-665/667 added ~1,180, incl. the 780-char "Not a widening" provenance paragraph); CORE-670.N (surfaced this; ft-release/** 113,985/125,000 = 8.8% ≈ 2+ units at +4,000–5,300 — "fine by the row's own measure, short only on the flat 10% heuristic"); CORE-604.2 (split origin).

- [x] **Drift check** — paths and figures match HEAD; ft-release dir total re-measured 113,985. Mechanical guards on this file: Pair K2 (`**Runtime stays out.**` + 6 lines must name VISION.md); inbound `§` cites target the ## / ### headings plus `→ "Implied by the [unattended] row marker"` bold lead — all preserved. No inbound quote of any trim candidate (grepped). No SPEC contract changes.

- [x] No clarifications needed (--fast). Assumptions: (1) the "flat 10%" was CORE-EPIC-670's headline goal, not a standing rule — each §Budgets row's working-unit sizing governs, so `ft-release/**` (≈2 units) needs no action; recorded once in `docs/CONTEXT-BUDGET.md`. (2) Trim, not extract — the redundancies are within-file restatements; no section is narrow enough to earn its own module. (3) Ledger figures stay release-refreshed; the new size is recorded in Cap history only.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:** see boxes above. Target ≤ 20,700 (both ≥10% and ≥1.5 × 1,400 = 2,100 headroom).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only; mechanical guards are the CI budget / Pair Q / K2 checks

**Implementation Notes:** Pattern: CORE-664 / CORE-670.3's hold-the-cap trim. Six within-file restatement cuts in `SPEC/gate-postures.md`: lead-blockquote gate list; §Flag-precedence lead (dup of intro); matrix reading's four-surface re-enumeration (kept in §`--fast`); `--fast` closing paragraph (dup of its own lead, and its "the one surface" miscount); "Not a widening any more" CORE-665 provenance compressed to its current-state claim; Park-conversions delegation sentence (dup of §What is inherited). Fixed "why three of them" → "four" (🛠️/destructive/👁️/✋ follow — HEAD miscounted). `docs/CONTEXT-BUDGET.md`: new "Headroom is judged per row, in working units" paragraph (ft-release/** decision: row sizing governs, 8.8% ≈ 2 units, no action) + Cap-history entry. No refactor beyond acceptance.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — CI `Context budget`, `Pair Q`, `Final newline` step bodies extracted from ci.yml and run

- [x] Ran lint/type-check on changed code — N/A, markdown only

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) N/A — no rendered surface; no 👁️ ask emitted

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**
- A1 `test $(wc -c < SPEC/gate-postures.md) -le 20700` → 0 (20,409; headroom 2,591 = 11.3%, ≈1.85 units)
- A2 cap-row grep → 0
- A3 heading diff vs HEAD → 0 (empty); bold-lead grep → 0
- A4 K2 grep → 0
- A5 `grep -c CORE-671 docs/CONTEXT-BUDGET.md` → 2
- A6 CI `Context budget` → 0 · `Pair Q` → 0 · `Final newline` → 0
- A7 judgment — confirmed by external review
- External review (general-purpose subagent, read-only): no blockers. Note 1 — lead blockquote dropped the "`SPEC.md` for the always-loaded core spec" pointer every sibling module carries → fixed (restored, +46). Note 2 — "each row names its own unit" overclaimed (post-closure / task-line-segments are "sized like its siblings") → fixed (reworded). Reviewer also confirmed the three→four recount and that no live file quotes removed wording.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — N/A — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Doc-drift sweep:** all 19 §"AI-referenced docs" entries — no change. SPEC.md / README / snippets / EXTERNAL-AGENTS / VISION / CONVENTIONS cite only preserved headings; AGENT-NEUTRALITY's 9-site count for gate-postures holds (no section removed, each still names a flag).

**Final Summary:** `SPEC/gate-postures.md` 21,592 → 20,409 (−1,183; headroom 6.1% → 11.3%, ≈1.0 → 1.85 units) by six within-file restatement cuts plus one miscount fix — cap held at 23,000, no heading or cited lead touched. `docs/CONTEXT-BUDGET.md` now states that each §Budgets row's working-unit sizing, not a flat 10%, governs headroom, which settles `claude/skills/ft-release/**` (8.8% ≈ 2 units) as needing no action. `touches:` reconciliation: diff = SPEC/gate-postures.md, docs/CONTEXT-BUDGET.md (+ workflow files) — matches declared.

**Archived:** 2026-09-22
