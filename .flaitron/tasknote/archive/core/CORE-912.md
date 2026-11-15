---
title: release v8.5.0
status: completed
tags: []
created: 2026-11-14
due:
related-tasks: [CORE-895, CORE-897, CORE-901, CORE-902, CORE-904, CORE-910, CORE-911, FE-152, CORE-892]
touches:
  - SPEC.md
  - docs/MIGRATION.md
  - SECURITY.md
  - README.md
  - docs/VERSION-HISTORY.md
  - docs/CONTEXT-BUDGET.md
  - docs/AGENT-COMPAT.md
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-912.md
---

# CORE-912 | release v8.5.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-895]] [[CORE-897]] [[CORE-904]] [[CORE-892]]

## 🎯 Goal

Cut v8.5.0 minor release tagging `/ft-import-task` (CORE-895), the seeder fleet-gap fixes (CORE-897), arch-health adoption (CORE-901), and the supply-chain hardening run (CORE-902 / CORE-904 / CORE-910 / CORE-911, plus FE-152's `/api` host guard) since v8.4.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v8.4.0` → `v8.5.0` — `grep -q '^\*\*Version:\*\* v8.5.0$' SPEC.md`
- [x] docs/MIGRATION.md example pin bumped `v8.4.0` → `v8.5.0` — `grep -q '(e.g., `v8.5.0`)' docs/MIGRATION.md`
- [x] SECURITY.md release-tag example pin bumped `v8.4.0` → `v8.5.0` — `grep -q 'release tags (e.g. `v8.5.0`)' SECURITY.md`
- [x] README installer URL tag-pinned at `v8.5.0` — `grep -c "flaitron/v8.5.0/install.sh" README.md` → `1`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v8.5.0`, or recorded `skipped @ v8.5.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells") — `step-5-dogfood-sop.md` step 5 grep loop prints nothing
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way) — `judgment` (fragment walk)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — `judgment` (audit subroutine)
- [x] Single `feat: CORE-912 — flaitron v8.5.0 (...)` commit lands — `git log -1 --format=%s`
- [x] Annotated `v8.5.0` tag created with adopter-facing release notes — `git cat-file -t v8.5.0` → `tag`
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v8.5.0` (minor: headline + 2–4 main bullets + optional secondary) — `grep -q 'v8.5.0' docs/VERSION-HISTORY.md`
- [x] Tag pushed to origin — `git ls-remote --tags origin v8.5.0`
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-912.md`

## 🧩 Subtasks

- [x] Apply the 4 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md, README.md) v8.4.0 → v8.5.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO
- [x] Post-push: CI line for the release commit, install line for the new tag

## 🔗 Related

- [[CORE-892]] — prior release (v8.4.0); precedent for the subtask shape
- [[CORE-895]] — `/ft-import-task`, new adopter-wired skill
- [[CORE-904]] — `supply_chain` drift check, extended by CORE-907 / CORE-910 / CORE-911

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — no pending `release v*` row existed; Step 1.1 filed CORE-912 under `## Medium` (uncommitted until the release commit).

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v8.4.0 matches `SPEC.md:3` and `git describe --tags --abbrev=0`. 29 commits since: 8 `feat:`, 7 `fix:`, 2 `docs:`, 12 `chore:`, no `BREAKING CHANGE:`. Highest rank minor; v8.5.0.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:488` (`describe --tags` pin), `SECURITY.md:130` (release-tag pin), `README.md:37` (installer URL). All four read v8.4.0.

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-892 (v8.4.0) is the direct precedent: same subtask and touches shape, pre-cut push of `main` so §6.1 has a CI run on HEAD.

- [x] **Drift check** — pins as above, one each. Other `v8.4.0` hits are dogfood stamps (`docs/AGENT-COMPAT.md:36-39`, `docs/PLATFORMS.md:564,598,621`, `claude/CAPABILITIES.md:77`) for §5 and the `docs/CONTEXT-BUDGET.md` ledger for §7.1. Working tree was clean before the PLAN.md filing. `main` is 21 commits ahead of `origin/main`.

- [x] Asked clarifying questions — two: (1) push `main` now so §6.1 has a CI run on HEAD — yes, pushed `9a734d1f..f7cbb330`; (2) dogfood rows — operator chose Claude and pasted Grok / Codex / Cursor receipts.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- **Version lock:** v8.4.0 → v8.5.0 (minor).
- **Adopter migration impact** (for the §7.2 tag message):
  - **New skill `/ft-import-task` (CORE-895):** read-only attended importer for starter-shaped notes written elsewhere; wired into the adopter subset for Claude, Codex, Cursor and Grok, and named in `claude/AGENTS-snippet.md`'s Workflow block. `/ft-update` wires it and rewrites the Workflow block; no hand edits. Portable input format in `SPEC/starter.md` §"Importing a starter".
  - **`/ft-seed-unattended` fleet gaps (CORE-897):** ten behavior fixes from natabula NAT-551 (separable-act split exception, correction class, parser-aligned collection, row-length caps, ID padding, …) in `SPEC/unattended-candidacy.md`. Behavioral, no migration.
  - **flaitron-self only:** `supply_chain` drift check (CORE-904 / 907 / 910 / 911), gitleaks hash pin + own job + allowlist scoping (CORE-905 / 909 / 903), shellcheck pin (CORE-902), arch-health workflow (CORE-901), Grok block in AGENTS.md (CORE-896), viz `/api` host guard (FE-152, CORE-908), DOGFOOD render outcome (CORE-893), `/ft-release` mid-cut defect ask (CORE-894).
  - **No required project-side edits.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-892 recipe, unchanged.

- [x] **Minimal refactor gate** — none.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: version strings and stamps.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:488`, `SECURITY.md:130`, `README.md:37` v8.4.0 → v8.5.0; `grep -c "flaitron/v8.5.0/install.sh" README.md` → 1. Remaining `v8.4.0` hits are the `docs/CONTEXT-BUDGET.md` ledger history only.
- Dogfood ledger (walk-start dirty check on the three stamp files: clean). Receipts for Grok, Codex and Cursor pasted by the operator; each reads v8.5.0, its "My row" matches the stamp held at walk start, and its Phase-1 drive names CORE-912 with exit-gate decision `skip ✅`. Grok's cue-render line reads `Operator: [no glyph outcome given]` — not one of the three scored checks, so it does not demote the row; noted here. Claude refreshed on this session's own run.
  - `Claude → v8.5.0 · 2026-11-14 (dogfooded)` — written (`docs/AGENT-COMPAT.md:36`, `claude/CAPABILITIES.md:77`)
  - `Grok → v8.5.0 · 2026-11-14 (dogfooded)` — written (`docs/AGENT-COMPAT.md:37`, `docs/PLATFORMS.md:564`)
  - `Codex → v8.5.0 · 2026-11-14 (dogfooded)` — written (`docs/AGENT-COMPAT.md:38`, `docs/PLATFORMS.md:598`)
  - `Cursor → v8.5.0 · 2026-11-14 (dogfooded)` — written (`docs/AGENT-COMPAT.md:39`, `docs/PLATFORMS.md:621`)
  - Re-verified from file state with the step-5 grep loop: printed nothing; 4 matrix rows + 3 footers carry the stamp, no `skipped @` suffix left on a row.
- SOP currency: one tier-1 candidate, c610ca1f (CORE-879), dismissed as at v8.4.0 (Claude-only `/ft-task` usage string; not restated by `SPEC/procedures/ft-task.md`); tier-2 note 1 `SPEC.md` commit. Stamp left un-bumped. Clean.
- §7.1 standing-check fixes landed inline (High): README task counter 1323 → 1339 tasks, dated 2026-11-14 (includes this note); `.claude/skills/ft-import-task` self-host link missing since CORE-895 (gitignored, no commit carries it; operator re-created it — the path guard blocks the agent's relative-target `ln -s`); `docs/CONTEXT-BUDGET.md` ledger re-measured at v8.5.0.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: release cut; the diff is version-string and stamp edits, graded by the §7.1 sweep and mirror-pair gates.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `npm --prefix viz test` → 0 (661 tests); `typecheck` → 0; `lint` → 0; `build` → 0
- `node --test tools/update-adopters.test.mjs` → 0; `node --check` on both files → 0; `node --test tools/drift-checks.test.mjs` → 0
- `npm --prefix viz audit --audit-level=high` → 0 (0 vulnerabilities)
- §6.1 CI on HEAD `f7cbb330` (after pushing `main`): `CI` and `Install test` completed/success
- §7.1 docs `ai-referenced` subroutine (delegated, read-only): 18 of 18 docs swept; `pair_q final_newline context_budget` → 0. One Low finding dismissed: README counter 1339 vs archive 1338 at sweep time — the release commit archives this note, so the committed tree holds 1339, matching the CORE-892 precedent ("includes this note"). Observation only: the overlay's `docs:` scope note still says 129 files at v8.3.0 (131 now).
- Standing checks: wiring-consumer derivation clean; `shipped_skill_parity ok`; installed-surface diffs ×4 → 0; local self-wiring found `.claude/skills/ft-import-task` missing (fixed, see Implementation Notes); global wiring clean (one casing line, no dangling, no over-install); `context_budget ok` (NEAR CAP: AGENTS-snippet 97%, ft-release SKILL.md and ft-release/** 95%, procedures/ft-task.md 95%)
- `bash tools/drift-checks.sh 'pair_*' skill_name_invariant brand_nearmiss brand_casing` → 0, fifteen `ok`; Pair A and K1/K2 clean
- Advisories: Completed rotation 50 rows (bound 60) before this row; viz majors pending: chokidar 5.0.0→6.0.0, ignore 5.3.2→7.0.14, jsdom 30.0.1→31.0.1, typescript 5.9.3→7.0.2

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: 18 swept, no change beyond the README counter

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — in the 📦 gate at commit-go

- [x] **Learnings** — N/A for the always-loaded layer. Two procedure gaps: CORE-895 shipped a skill without its flaitron-self `.claude/skills/` link (only the release gate caught it), and the path guard blocks an agent's relative-target `ln -s` for that link, so the fix needs an operator `!` command.

**Final Summary:** Cut flaitron v8.5.0 (minor) tagging `/ft-import-task` (CORE-895), the `/ft-seed-unattended` fleet-gap fixes (CORE-897), the `supply_chain` drift check and its extensions (CORE-904 / 907 / 910 / 911), pinned gitleaks and shellcheck downloads (CORE-902 / 903 / 905 / 909), arch-health adoption (CORE-901) and the viz `/api` host guard (FE-152 / CORE-908). Adopter impact: no required project-side edits; `/ft-update` wires `/ft-import-task` and refreshes the AGENTS.md Workflow block. Dogfood: all four rows refreshed at v8.5.0 (Claude on this session; Grok, Codex and Cursor from pasted receipts).

**Archived:** 2026-11-14
