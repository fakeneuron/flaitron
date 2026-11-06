---
title: near-cap-trims
status: completed
tags: [context-budget]
created: 2026-11-06
due:
related-tasks: [CORE-EPIC-869, CORE-869.3, CORE-870]
touches:
  - SPEC/gate-postures.md
  - SPEC/post-closure.md
  - claude/skills/ft-open-epic/SKILL.md
  - SPEC/procedures/ft-task.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-869.5 | near-cap-trims

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-869]]

## 🎯 Goal

Bring the five context-budget surfaces at 97% of their cap or above back to 95% or below, by trimming or by re-basing a cap with its reason in `docs/CONTEXT-BUDGET.md`.

## ✅ Acceptance

- [x] Each of the five surfaces measures ≤95% of its unchanged cap (gate-postures ≤20,900; post-closure ≤9,500; ft-open-epic SKILL.md ≤31,350; procedures/ft-task.md ≤24,700; ft-release/** ≤107,350), and `context_budget` prints no `NEAR CAP` line for any of them — `bash tools/drift-checks.sh context_budget`
- [x] Caps unchanged; each of the five rows' Cap history carries a `held <cap> [[CORE-869.5]] (<before> → <after>)` entry — `grep -c 'CORE-869.5' docs/CONTEXT-BUDGET.md` ≥ 5
- [x] Full drift scan passes (Pair Q resolves every citation; Pairs N/O literals kept) — `bash tools/drift-checks.sh`
- [x] Pair K (release-only shell) still prints nothing — K1/K2 fences from `step-7.1-mirror-pairs.md`
- [x] No unique rule lost — every cut is a restatement (pointer kept), archaeology, or duplicate within the file — `judgment`: meaning-preservation is a reading, graded by the External review

## 🧩 Subtasks

- [x] Trim `SPEC/post-closure.md` (≥377): duplicate 🏁/rotation ordering sentence, audit-fork restatement, rationale tails
- [x] Trim `SPEC/gate-postures.md` (≥1,098): intro restatement, full-validation rationale, External-review and close-epic restatements; keep every cited heading/bold-lead and K2's VISION.md pointer
- [x] Trim `claude/skills/ft-open-epic/SKILL.md` (≥1,617): post-closure step 2–3 re-narration → pointer; redundant Notes bullets; stale CORE-EPIC-057 / CORE-042.4 archaeology; keep Pair O/N/J/M surfaces
- [x] Trim `SPEC/procedures/ft-task.md` (≥1,097): routing-preface, rationale tails, restated shapes; keep Phase 4 deltas and §"Agent-neutral primitives"
- [x] Trim `ft-release` mirror-pairs + standing-checks fragments (≥2,634): per-pair incident archaeology, duplicated "why" sentences
- [x] Add five `held` Cap-history entries in `docs/CONTEXT-BUDGET.md`
- [x] Run `context_budget`, the full drift scan, and the Pair K shell

## 🔗 Related

- [[CORE-EPIC-869]] — parent epic (carrying-cost).
- [[CORE-869.3]] — predecessor: the `NEAR CAP` report that names these five surfaces.
- [[CORE-870]] — follow-up waiting on this task's `ft-release/**` headroom.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `context_budget` (CORE-869.3) prints `NEAR CAP` for exactly the five surfaces the row names, at 97–99%; each row's "Why this number" already says the next edit trims before the cap raises, and CORE-870 is waiting on `ft-release/**` headroom.

- [x] Read relevant source files — all four single files in full; `step-7.1-mirror-pairs.md` and `step-7.1-standing-checks.md` in full (the two archaeology-heavy fragments, 55.7K of the 110K directory); `docs/CONTEXT-BUDGET.md` §"Budgets" / §"Cap history" / §"How this is enforced"; `tools/drift-checks.sh` check roster.

- [x] **Best Practices Review** — `N/A`: markdown contract trims, no code or module boundary moves.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). Hits: 55 / 40 / 11 / 200 / 231 — too many to read whole, so read the prior trim tasks on these files directly: [[CORE-724.2]] (restatement map; "no cited heading or bold lead renamed"), [[CORE-857.2]] (procedure: no drift pair reads its text; keep Phase 4 deltas and mode narration; `last-verified:` stays unbumped; [[CORE-724.4]]'s blockers were cuts that took a unique rule with them), [[CORE-671]] (hold-the-cap trim pattern, Pair K2 guard), [[CORE-750]] (ft-release/** sizing).

- [x] **Drift check** — sizes match the `NEAR CAP` report at HEAD `2f0eb6af`; PLAN line matches. Out-of-scope drift noticed, not edited (collateral-flip ban): the CORE-869.3 PLAN row reads `- [ ]` with a `Completed 2026-11-06.` stub — its box was never ticked.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  AskUserQuestion: trim all five (chosen) vs re-base `ft-release/**` vs extract. Assumptions: caps stay put and each Cap-history row gets a `held` entry (CORE-867 / CORE-872 shape); §"Ledger" stays `/ft-release`'s job; `last-verified:` on the procedure stays unbumped (CORE-857.2).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** Targets (95% of cap) and required cuts: gate-postures 21,998 → ≤20,900 (−1,098); post-closure 9,877 → ≤9,500 (−377); ft-open-epic 32,967 → ≤31,350 (−1,617); procedure 25,797 → ≤24,700 (−1,097); ft-release/** 109,984 → ≤107,350 (−2,634).

Guards on the cut text: Pair Q (every inbound `§"…"` — gate-postures' 11 cited headings plus bold leads "Each delegation is bounded", "Implied by the `[unattended]` row marker", "What is inherited, and what is not"; post-closure's "Rotation, before 🏁"; the procedure's §"Agent-neutral primitives"); Pair K2 (`**Runtime stays out.**` + VISION.md within 6 lines); Pair O (ft-open-epic Step 4's `auto-commit = `, whole-index `git diff --cached`, `SPEC/plan-filing.md` §"Filing commits"); Pair N (ft-open-epic Step 7's labeled mirror + `unattended-candidates:`); Pairs J/M (frontmatter untouched); standing-checks' `(global-only)` rows (the over-install allowlist reads them) and the rotation command (kept identical to post-closure step 2).

Phase 1→2: Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended [[CORE-671]] / [[CORE-724.2]]'s hold-the-cap trim: each rule keeps its canonical statement, restatements become pointers, archaeology goes; no cited heading or bold lead touched

- [x] **Minimal refactor gate** — no restructuring; headings, step order and every guarded literal unchanged

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown contract; `context_budget`, Pair Q and the Pair K shell are the checks

**Implementation Notes:**

| Surface | Before | After | % of cap | Cuts |
|---|---|---|---|---|
| `SPEC/gate-postures.md` | 21,998 | 20,732 | 94.2% | intro restating the blockquote; transferee rationale (ladder rung 2 keeps it); paper-complete part restatement; full-validation rationale + "no `check`" clause (implied by "each other one … `check` does not reach") + motivating-case archaeology; External-review and `/ft-close-epic` restatements of §"What `--unattended` never relaxes"; `/ft-refactor` sentence compressed |
| `SPEC/post-closure.md` | 9,877 | 9,396 | 94.0% | "Nothing before Phase 4 loads it"; duplicate rotation-before-next-move sentence (step 2 tail keeps it); re-read and terminal-form rationale tails; audit-fork naming (step 3 keeps it) |
| `claude/skills/ft-open-epic/SKILL.md` | 32,967 | 30,606 | 92.7% | post-closure steps 2–3 re-narration → pointer (as `ft-task` did at [[CORE-857.4]]); Notes bullets duplicating Step 2 / Step 4 / Step 7; stale CORE-EPIC-057 and CORE-042.4 references; `--deep` sentence duplicating Step 1.5's bullet |
| `SPEC/procedures/ft-task.md` | 25,797 | 24,689 | 95.0% | routing preface; glyph list; purpose-blurb, ✋ and downstream-scan rationale tails; unattended stop-list restatement; Acceptance and 👁️ shape restatements; model-edge branch summary (fragment owns it; the under-tier "warns and proceeds" delta kept). `last-verified:` unbumped |
| `claude/skills/ft-release/**` | 109,984 | 106,784 | 94.5% | per-pair incident archaeology in `step-7.1-mirror-pairs.md` (J, K, M, N, O, P, Q, R, S); `step-7.1-standing-checks.md`: v5.15.0 retirement tally, CORE-544 codex note, CORE-613 incident, CI-paragraph and ledger-refresh duplicates |

`docs/CONTEXT-BUDGET.md`: five `held` Cap-history entries; the glob row's "largest ordinary body" now names `ft-update` (30,715 > `ft-open-epic` 30,606); the procedure row's headroom sentence updated (235 → 1,311).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (the markdown contract's checks); no code changed, so the viz / updater suites are out of scope

- [x] Ran lint/type-check on changed code — `final_newline` + `pair_q` in the same scan; `N/A` beyond that (markdown only)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (working tree, after the review fix):

- `bash tools/drift-checks.sh context_budget` → 0; `context_budget ok`, no `NEAR CAP` line. Sizes: gate-postures 20,732 / 22,000 (94.2%); post-closure 9,396 / 10,000 (94.0%); ft-open-epic 30,606 / 33,000 (92.7%); procedure 24,689 / 26,000 (94.96%); ft-release/** 106,784 / 113,000 (94.5%)
- `grep -c 'CORE-869.5' docs/CONTEXT-BUDGET.md` → 7 (five Cap-history entries + two cell updates)
- `bash tools/drift-checks.sh` → 0; 22 `ok` lines
- Pair K1/K2 shell from `step-7.1-mirror-pairs.md` → printed nothing
- Structural: no dead text introduced; the one cross-surface claim the trim made stale (glob row's "largest ordinary body — `ft-open-epic`") was updated to `ft-update`.

External review (`/code-review medium`, forked context, working-tree diff vs `2f0eb6af` only): no blockers, four notes.
1. Procedure Step 2 lost the concrete-mismatch "stops" summary (fragment owns it) — **fixed**: restored "a concrete mismatch stops" (+27 bytes; figures updated to 24,689 / 1,311).
2. gate-postures' atomic-commit clause — survives in `SPEC.md` §"Paper-complete guard"; no change.
3. gate-postures' "never the targeted default" — the bold lead carries it; no change.
4. CONTEXT-BUDGET §"Ledger" → "Skill bodies" still names `ft-open-epic` largest until `/ft-release` refreshes it — the ledger is the release's job (§"How this is enforced"); no change, noted in the recap.
Verified by the reviewer: no cited heading or bold lead renamed; all size figures match `wc -c`; Pair O / N literals, the `(global-only)` allowlist rows and the rotation-command copy unchanged.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` (its `--deep` row's "byte-identical" claim is its own, still true), `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change. `docs/AGENT-NEUTRALITY.md` — no change: its any-mention site counts for `SPEC/gate-postures.md` (10 sections) and `SPEC/post-closure.md` (1) still hold, and the gate-postures intro keeps its "executable interpretation" path fact.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  `N/A`. One for the budget doc's readers, already true of its rows: incident archaeology in the `/ft-release` §7.1 catalogue lines is the cheapest headroom in that directory — the "why this pair runs per push" sentence carries the rationale; the per-incident detail lives in the cited tasknotes.

**Final Summary:** Five near-cap surfaces trimmed back under 95% of their unchanged caps (3,200 + 1,266 + 481 + 2,361 + 1,108 = 8,416 bytes cut in all), each by cutting restatements, rationale tails and incident archaeology whose canonical statement survives elsewhere. `docs/CONTEXT-BUDGET.md` records five `held` Cap-history entries, names `ft-update` as the glob row's largest body, and updates the procedure row's headroom (1,311). `touches:` reconciliation: `git diff --name-only` = the seven declared paths, exactly. Maintainability: each surface now holds ~1–2 working units again, so CORE-870's sentence in `step-7.1-standing-checks.md` fits without a trim. Out-of-scope drift seen, not edited: the CORE-869.3 PLAN row is `- [ ]` with a Completed stub.

**Archived:** 2026-11-06
