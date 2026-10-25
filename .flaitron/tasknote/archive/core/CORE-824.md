---
title: release v7.5.0
status: completed
tags: []
created: 2026-10-25
due:
related-tasks: [CORE-818, CORE-819, CORE-820, CORE-817]
touches:
  - SPEC.md
  - docs/MIGRATION.md
  - SECURITY.md
  - docs/VERSION-HISTORY.md
  - docs/CONTEXT-BUDGET.md
  - README.md
  - docs/AGENT-COMPAT.md
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-824.md
---

# CORE-824 | release v7.5.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-818]] [[CORE-819]] [[CORE-820]] [[CORE-817]]

## 🎯 Goal

Cut v7.5.0 minor release tagging CORE-818 (`--micro` as the default route for known work) + CORE-819 (`chore:` subjects for workflow-only closures) + CORE-820 (📭 `EMPTY` cue for the PLAN-exhausted terminal state) since v7.4.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v7.4.0` → `v7.5.0`
- [x] docs/MIGRATION.md example pin bumped `v7.4.0` → `v7.5.0`
- [x] SECURITY.md release-tag example pin bumped `v7.4.0` → `v7.5.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v7.5.0`, or recorded `skipped @ v7.5.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-824 — flaitron v7.5.0 (...)` commit lands
- [x] Annotated `v7.5.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v7.5.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-824.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v7.4.0 → v7.5.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-818]] — known work with no design question (small multi-file included) routes to `/ft-task --micro` by default; Re-scope promotes
- [[CORE-819]] — workflow-only closure diffs (PLAN.md + tasknotes, incl. a `.1` scope closure) commit as `chore:`
- [[CORE-820]] — 📭 `EMPTY` registered as the PLAN-exhausted next-move cue
- [[CORE-817]] — prior release (v7.4.0); precedent for the 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — filed via Step 1.1 this session.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v7.4.0 matches `SPEC.md:3` and `git describe`. 11 commits since: `feat:` CORE-818, CORE-819, CORE-820; `docs:` CORE-821, CORE-822; `fix:` FE-129; the rest `chore:`. No `feat!:` / `BREAKING CHANGE:` → minor; PLAN target v7.5.0 agrees.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:486` (`describe --tags` pin), `SECURITY.md:130` (release-tag pin).

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-817 (v7.4.0) is the direct precedent: same 6-line subtasks. Its learning (epic wikilinks are `[[<AREA>-EPIC-<N>]]`) carries into §7.1.

- [x] **Drift check** — pins at `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:130` read v7.4.0 (same lines as CORE-817). PLAN line matches the Step 1.1 draft. `main` is 11 commits ahead of `origin/main` (`105355e9`, CI success); HEAD `74db6994` has no CI run yet (unpushed) — handled at §6.1.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — version confirmed at the Step 1.1 draft; no breaking commits.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Adopter migration impact — no required edits:
  - **CORE-818 — behavior change, no action.** `/ft-task` routing now starts known, design-free work (small multi-file included) on `--micro`; Re-scope promotes to the full tasknote. Unknown scope, tradeoffs, `--loop`, `--debug` stay full.
  - **CORE-819 — no action.** Closures whose diff is only `.flaitron/` workflow files commit as `chore:`; `/ft-open-epic` proposes `chore:` for `.1`.
  - **CORE-820 — no action.** New 📭 `EMPTY` cue in transcripts; viz unchanged.
  - **CORE-821 / CORE-822 / FE-129 — no action.** Docs-only decisions (Fable @ medium gets no ladder cell; third refused `--unattended` 👁️ carve-out) and a viz lockfile advisory bump.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — canonical release recipe (CORE-817 precedent); no new shape.

- [x] **Minimal refactor gate** — no refactor; version-string and stamp substitutions only.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, markdown-only edits.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:130` v7.4.0 → v7.5.0. Residual `v7.4.0` grep hits outside the dogfood stamps are the CONTEXT-BUDGET ledger (refreshed in §7.1).
- Dogfood ledger (walk-start `git status --porcelain` on the three stamp files empty; re-checked before writing):
  - Claude → `v7.5.0 · 2026-10-25 (dogfooded)` — written (this session's own run) — `docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`
  - Grok → `v7.5.0 · 2026-10-25 (dogfooded)` — written (receipt: v7.5.0, row `v7.4.0 · 2026-10-20 (dogfooded)` matched, Phase-1 drive CORE-641 skip ✅) — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Codex → `v7.5.0 · 2026-10-25 (dogfooded)` — written (receipt: v7.5.0, row matched, Phase-1 drive CORE-824 skip ✅) — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Cursor → `v7.5.0 · 2026-10-25 (dogfooded)` — written (receipt: v7.5.0, row matched, Phase-1 drive CORE-641 skip ✅) — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Receipts arrived pasted inline without their `Log:` prefixes; content otherwise matches the `docs/DOGFOOD.md` template on all three checks. A first `perl -pi` attempt matched nothing (UTF-8 `·` quoting) and wrote nothing; re-applied via python.
  - Step-5 re-verify loop: printed nothing.
- SOP currency: `SPEC/procedures/ft-task.md` — the same 3 tier-1 candidates CORE-817 dismissed (`f98d202a` CORE-816, `b0b9dca6` CORE-815.4, `56d7b902` CORE-814; all `step-1.5-model-edge.md`). Dismissed again: the SOP reads step-1.5 by reference (line 182) and restates no tier names or map cells. CORE-818 touched the SOP in-commit (in sync). Tier-2 note: 7 `SPEC.md` commits since 2026-10-11. Verdict: clean.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — the §7.1 doc-drift sweep runs through a fresh read-only reviewer context; findings recorded under Phase 4.

**Testing Notes:**

- `npm --prefix viz test` → 0 (616/616) · `npm --prefix viz run typecheck` → 0 · `npm --prefix viz run lint` → 0 · `npm --prefix viz run build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 · `node --check tools/update-adopters.test.mjs` → 0 · `node --check tools/update-adopters.mjs` → 0
- `bash tools/drift-checks.sh` → 17/17 ok.
- §6.1: HEAD `74db6994` had no CI run (11 commits unpushed). Operator chose to push `main` first; CI on `74db6994`: `CI completed success` (+ Dependabot Updates success).
- §6.2 `npm --prefix viz audit --audit-level=high` → 0 (0 vulnerabilities).
- Markdown mental-pass: single-token substitutions; no frontmatter or fences touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - Run 1 (fresh read-only reviewer, audit overlay `docs ai-referenced`; gate `bash tools/drift-checks.sh pair_q final_newline context_budget` ok; no `.flaitron/audit-decisions/`): health 95/100, 0 Critical/High, 3 Low — #1 `README.md` §"Version" called the contract break-free outside v6.0.0/v7.0.0 while minors retired skills with no alias; #2 `docs/MIGRATION.md:330` listed four context-audit concerns, missing adopter-mode pass 5 "Tooling & orphans"; #3 `docs/MIGRATION.md` §"Retired skills leave dangling symlinks" table out of order (`ft-debug` v5.15.0 above the v5.27.0 rows). Operator chose **Stop**; all three fixed (README clause naming skill retirements a wiring-layer change `/ft-update` reports; "and tooling/orphans"; `ft-debug` row moved beside the other v5.15.0 rows).
  - Run 2 (inline re-check): each finding's site re-read; full `bash tools/drift-checks.sh` 17/17 ok. **Zero findings** — §7.1 continued.
  - Per-doc verdicts: `README.md` updated (Version clause, task counter); `docs/MIGRATION.md` updated (context-audit list, table order, version pin); `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` updated (dogfood stamps); `SPEC.md`, `SECURITY.md` updated (version pins); every other entry no change.
  - Standing checks + mirror pairs: wiring-consumer (rc=1 ×2), installed-surface (4 diffs empty), local self-wiring (no output), Pair A (10 templates named), Pair K1/K2 clean, `'pair_*' skill_name_invariant` 11/11 ok, shipped-skill parity + context budget ok. README counter 1217 → 1224, as-of 2026-10-20 → 2026-10-24 (counted before this note's archive). `docs/CONTEXT-BUDGET.md` ledger refreshed at v7.5.0 (cold-start sum held at 112,172; `cue-vocabulary.md` 16,833 → 17,376; `post-closure.md` 9,651 → 9,877; `tasknote-selection.md` 10,580 → 10,723; `procedures/ft-task.md` 33,909 → 34,041; `ft-open-epic` 32,884 → 32,927; `ft-audit-repo` 11,813 → 11,776, correcting a stale v7.4.0 reading; `ft-task` dir 91,704 → 91,823; `templates/tasknote-README.md` 4,904 → 4,920). Advisories: global wiring clean (0 dangling, 1 casing, 0 over-install); completed rotation 50 rows before this flip (bound 60); viz majors chokidar 5.0.0→6.0.0, typescript 5.9.3→7.0.2 (CORE-641).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — in the 📦 gate. `touches:` reconciliation: `git diff --name-only` = the declared tracked paths plus this archived note.

- [x] **Learnings** — §6.1 reads CI on the commit the cut builds on, so an unpushed `main` has no run to read. Pushing the pre-release commits first, before any release edit is staged, gives §6.1 a real verdict without a wait loop inside the cut. And `perl -pi -e "s/\Q$var\E/…/"` under `-CSD` silently matched nothing on a `·`-bearing stamp; step 5's re-verify loop is what caught it.

**Final Summary:** Cut flaitron v7.5.0, a minor release tagging CORE-818 (known work with no design question, small multi-file included, routes to `/ft-task --micro` by default; Re-scope promotes), CORE-819 (closures touching only `.flaitron/` workflow files commit as `chore:`, including a `.1` scope closure) and CORE-820 (📭 `EMPTY` cue for the PLAN-exhausted next-move form), plus the CORE-821 / CORE-822 docs decisions and FE-129's viz advisory bump. The cut bumped the three version pins, refreshed all four dogfood rows to v7.5.0 (Grok, Codex and Cursor on receipts), pushed the 11 pre-release commits so §6.1 could read a green CI run, fixed three Low doc-drift findings after an operator Stop, refreshed the README counter (1224) and the context-budget ledger, and prepended the VERSION-HISTORY entry. SOP currency clean (3 candidates dismissed). Adopter impact: no required edits.

**Archived:** 2026-10-25
