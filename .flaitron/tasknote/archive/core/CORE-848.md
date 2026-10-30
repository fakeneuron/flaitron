---
title: release v8.1.0
status: completed
tags: []
created: 2026-10-30
due:
related-tasks: [CORE-843, CORE-842, CORE-844, CORE-845, CORE-846, CORE-847, CORE-841]
touches:
  - SPEC.md
  - docs/MIGRATION.md
  - SECURITY.md
  - docs/VERSION-HISTORY.md
  - docs/CONTEXT-BUDGET.md
  - README.md
  - docs/AGENT-COMPAT.md
  - docs/AGENT-NEUTRALITY.md
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-848.md
---

# CORE-848 | release v8.1.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-843]] [[CORE-842]] [[CORE-841]]

## 🎯 Goal

Cut v8.1.0 minor release tagging CORE-843 + CORE-842 since v8.0.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v8.0.0` → `v8.1.0`
- [x] docs/MIGRATION.md example pin bumped `v8.0.0` → `v8.1.0`
- [x] SECURITY.md release-tag example pin bumped `v8.0.0` → `v8.1.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v8.1.0`, or recorded `skipped @ v8.1.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-848 — flaitron v8.1.0 (...)` commit lands
- [x] Annotated `v8.1.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v8.1.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-848.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v8.0.0 → v8.1.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-843]] — an unattended park commits its tasknote alone when that note is the only uncommitted path
- [[CORE-842]] — GitHub secret scanning + push protection enabled on the repo (repo settings only)
- [[CORE-844]] / [[CORE-845]] / [[CORE-846]] / [[CORE-847]] — audit-docs inline fixes (2026-10-30)
- [[CORE-841]] — prior release (v8.0.0); precedent for the 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — filed via Step 1.1 this session.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v8.0.0 matches `SPEC.md:3` and `git describe --tags --abbrev=0`. 5 commits since: 1 `feat:` (CORE-843), 4 `chore:`, no `BREAKING CHANGE:`. Highest rank minor; PLAN target v8.1.0 agrees. Operator confirmed the drafted line.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:486` (`describe --tags` pin), `SECURITY.md:130` (release-tag pin). All three read v8.0.0.

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-841 (v8.0.0) is the direct precedent: same 6-line subtasks, same touches set (stamps + CONTEXT-BUDGET ledger + README counter). No structural drift.

- [x] **Drift check** — pins at `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:130` read v8.0.0. Other `v8.0.0` hits: dogfood stamps (refreshed/skipped in §5), `docs/CONTEXT-BUDGET.md` ledger (§7.1), README's breaking-majors sentence (historical, stays). `main` is 3 commits ahead of `origin/main` (CORE-842, CORE-843 + filing, audit-docs chore), so §6.1 has no run for HEAD until those are pushed.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — no clarifications needed: minor bump, no adopter-action commit.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Version lock:** v8.0.0 → v8.1.0 (minor). Operator accepted the Step 1.1 draft (`CORE-848`).
- **Commit rank:** 0 major, 1 minor (`62a0fc8a` CORE-843), 4 patch.
- **Adopter migration impact** (for the §7.2 tag message):
  - **No required project-side edits.**
  - **CORE-843 — behavior only.** An `--unattended` park whose tasknote is the only uncommitted path now commits it alone (`chore: park <ID> — <code>`, never pushed, no 🏁), so the next dispatch's foreign-dirt gate does not stop on it. Any other dirt leaves the park uncommitted as before. Attended parks are unchanged.
  - **CORE-842 — flaitron repo settings only** (secret scanning + push protection); nothing ships to adopters.
  - **CORE-844–847 — doc wording fixes** (overlay size figures, MIGRATION/UPGRADING bump wording, roster guard wording, README breaking-majors sentence). No adopter action.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — canonical release recipe (CORE-841 precedent); no new shape.

- [x] **Minimal refactor gate** — no refactor; version-string and stamp substitutions only.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, markdown-only edits. Standing validation gate is Phase 3.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:130` v8.0.0 → v8.1.0. Residual `v8.0.0` hits: `docs/CONTEXT-BUDGET.md` ledger (§7.1 refresh), README's breaking-majors sentence and `docs/VERSION-HISTORY.md` (historical).
- Dogfood ledger (walk-start `git status --porcelain` on the three stamp files empty; diff re-read after each agent's write, each grew by that agent's rows only):
  - Claude → `v8.1.0 · 2026-10-30 (dogfooded)` — written (this session's own run; SPEC.md reads v8.1.0, Phase 1 of CORE-848 complete) — `docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`
  - Grok → `v8.1.0 · 2026-10-30 (dogfooded)` — written (receipt: v8.1.0; My row `v8.0.0 · 2026-10-27 (dogfooded)` matched; Phase-1 drive CORE-641, exit-gate skip) — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Codex → `v8.1.0 · 2026-10-30 (dogfooded)` — written (receipt: v8.1.0; My row `v7.5.0 · 2026-10-25 (dogfooded; skipped @ v8.0.0)` matched the shared skip stamp, and the operator labeled the receipt Codex; Phase-1 drive CORE-848, exit-gate skip) — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Cursor → `v7.5.0 · 2026-10-25 (dogfooded; skipped @ v8.1.0)` — written (no receipt) — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Step-5 re-verify loop: printed nothing. Matrix eyeball matches the ledger.
- SOP currency: clean. Four tier-1 candidates on `SPEC/procedures/ft-task.md` — `72b17a27`, `f98d202a` CORE-816, `b0b9dca6` CORE-815.4, `56d7b902` CORE-814 — the same four CORE-841 dismissed, same reasons. CORE-843 touched the SOP alongside its source (in-sync mirror, filtered). Tier-2 note: 8 `SPEC.md` commits since 2026-10-11 (7 at CORE-841 plus that cut's own version bump). Not material.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a fresh read-only reviewer ran the §7.1 docs sweep twice. Its one finding (Low, neutrality-ledger row) was fixed in this cut, and the re-run was clean.

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A. This cut edits only version pins, stamps, and docs; it ships no viz change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `npm --prefix viz test` → 0 (647/647) · `npm --prefix viz run typecheck` → 0 · `npm --prefix viz run lint` → 0 · `npm --prefix viz run build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (77/77) · `node --check tools/update-adopters.test.mjs` → 0 · `node --check tools/update-adopters.mjs` → 0
- `node --test tools/drift-checks.test.mjs` → 0 (21/21) · `bash tools/drift-checks.sh` → 0 (19/19 ok).
- §6.2 `npm --prefix viz audit --audit-level=high` → 0 (0 vulnerabilities).
- Markdown mental-pass: single-token substitutions on the three pins; stamp edits are the same shape. No frontmatter or fences broken.
- §6.1: HEAD `0d0cc9fe` was 3 commits ahead of origin. Operator approved pushing them; `git push origin main` moved `120a4bda..0d0cc9fe`. Release edits stayed unstaged. `gh run list --commit 0d0cc9fe`: CI completed success (https://github.com/fakeneuron/flaitron/actions/runs/41142768682).
- §7.1 sweep 1 (fresh read-only reviewer, tracked overlay, `docs ai-referenced`): gate `pair_q final_newline context_budget` → 0; full drift 19/19 ok. One held finding — **[Low] `docs/AGENT-NEUTRALITY.md` missing a ledger row** for `SPEC/gate-postures.md`'s two `claude/skills/ft-task/unattended-mode.md` path facts (:11 intro from CORE-604.2, :216 "Commit the lone park" from CORE-843). Operator chose **Stop**. Fixed here: added a `SPEC/gate-postures.md` row after the `SPEC/model.md` → `preamble.md` row.
- §7.1 sweep 2 (same reviewer, full re-run): gate → 0, full drift 19/19 ok, 5 passes clean. Finding #1 cleared; row format, 2-site count, credits, and links verified. No other CORE-843 line in the contract layer names an unledgered Claude wiring path.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - Subroutine `docs ai-referenced` (tracked overlay; no `.flaitron/audit-decisions/`), two runs as above. Per-doc verdicts: `docs/AGENT-NEUTRALITY.md` updated (ledger row); `README.md` updated (task counter 1260, as of 2026-10-30); `SPEC.md`, `docs/MIGRATION.md`, `SECURITY.md` updated (version pins); `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` updated (dogfood stamps); `docs/CONTEXT-BUDGET.md` ledger refreshed at v8.1.0 (cold-start sum 112,348 → 112,924). Every other AI-referenced entry: no change.
  - Standing checks: wiring-consumer both greps empty (exit 1); shipped-skill parity ok; installed-surface four diffs empty; local self-wiring clean (audit link resolves to the overlay). README counter 1257 → 1260; dated stamps 1257 vs 1260 files (gap of 3, the known handful, not filed). Completed rotation 51 rows (bound 60). Context budget ok after the ledger refresh. Mirror pairs: `pair_*` + `skill_name_invariant` 13/13 ok; Pair A templates all named; Pair K1/K2 printed nothing.
  - Advisories: viz majors chokidar 5.0.0→6.0.0, ignore 5.3.2→7.0.14, typescript 5.9.3→7.0.2 (typescript parked as CORE-641). Global wiring: clean (0 dangling, 1 casing `/Users/fakeneuron/Code/flaitron`, 0 over-install).
  - Exploratory (not a finding): `SPEC.md:642` and `claude/skills/ft-task/preamble.md:46` still say "an uncommitted `--unattended` model-mismatch park"; true, but since CORE-843 that case covers only pre-v8.1.0 parks or a failed park commit. Optional cleanup, not filed.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — in the 📦 gate. `touches:` plus `docs/AGENT-NEUTRALITY.md` (the §7.1 fix); `README.md` and `docs/CONTEXT-BUDGET.md` are the standing-check edits.

- [x] **Learnings** — N/A for the always-loaded layer. The reviewer noted CORE-843's acceptance greps checked every mirror but not the neutrality ledger; the ledger's own §"Ledger currency" already states the duty.

**Final Summary:** Cut flaitron v8.1.0, a minor release. An --unattended park whose tasknote is the working tree's only uncommitted path now commits that note alone (`chore: park <ID> — <code>`, never pushed), so the next dispatch's foreign-dirt gate no longer stops on it (CORE-843). Doc wording fixes from the 2026-10-30 audit (CORE-844–847) ride along. The cut bumped the three version pins and refreshed Claude (this session), Grok and Codex (operator-pasted receipts) to v8.1.0; Cursor was recorded as skipped. The §7.1 sweep held one Low finding, a missing neutrality-ledger row for `SPEC/gate-postures.md`'s `unattended-mode.md` path facts. The operator chose Stop; it was fixed in this cut and the re-run came back clean. The three unpushed commits were pushed first so CI could gate HEAD `0d0cc9fe` (green). SOP currency clean. Adopter impact: no required project-side edits.

**Archived:** 2026-10-30
