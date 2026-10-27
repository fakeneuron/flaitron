---
title: release v8.0.0
status: completed
tags: []
created: 2026-10-27
due:
related-tasks: [FE-148, FE-150, FE-131, FE-133, FE-134, FE-135, FE-136, FE-137, FE-138, FE-139, FE-140, FE-141, FE-142, FE-143, CORE-826, CORE-827, CORE-828, CORE-829, CORE-830, CORE-833, CORE-835, CORE-837, CORE-824]
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
  - .flaitron/tasknote/archive/core/CORE-841.md
---

# CORE-841 | release v8.0.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[FE-148]] [[FE-150]] [[CORE-827]] [[CORE-835]] [[CORE-837]] [[CORE-824]]

## 🎯 Goal

Cut v8.0.0 major release tagging FE-148 (breaking `/api/active` shape) + FE-150 + viz typecheck tiers (FE-131, FE-133–FE-143) + CORE-826, CORE-827, CORE-828, CORE-829, CORE-830, CORE-833, CORE-835, CORE-837 since v7.5.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v7.5.0` → `v8.0.0`
- [x] docs/MIGRATION.md example pin bumped `v7.5.0` → `v8.0.0`
- [x] SECURITY.md release-tag example pin bumped `v7.5.0` → `v8.0.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v8.0.0`, or recorded `skipped @ v8.0.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-841 — flaitron v8.0.0 (...)` commit lands
- [x] Annotated `v8.0.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v8.0.0` (major: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-841.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v7.5.0 → v8.0.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[FE-148]] — breaking: `GET /api/active` returns `{ tasknotes, unparsable }` instead of a bare array
- [[FE-150]] — active-parse report alongside the visibility change
- [[FE-131]] — viz typecheck tiers (FE-131, FE-133–FE-143)
- [[CORE-827]] — updater drops the finished v6 rename and v7 link-swap migrations
- [[CORE-835]] — `[unattended]` declines a row whose work changes a rendered surface
- [[CORE-837]] — `/ft-open-epic` model gate after the filing commit
- [[CORE-824]] — prior release (v7.5.0); precedent for the 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — filed via Step 1.1 this session.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v7.5.0 matches `SPEC.md:3` and `git describe --tags --abbrev=0`. 62 commits since: 1 breaking (`feat(viz)!:` FE-148, body `BREAKING CHANGE:`), 21 `feat:`, 40 patch. Highest rank is major. PLAN target v8.0.0 agrees. Operator confirmed the drafted line.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:486` (`describe --tags` pin), `SECURITY.md:130` (release-tag pin). All three read v7.5.0.

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-824 (v7.5.0) is the direct precedent: same 6-line subtasks. CORE-048's subtasks still shift `SPEC/versioning.md` examples and cite `_project/` paths; the current recipe does not. CORE-779 (v7.0.0) is the last major: its migration block named required re-wiring. This major's break is the visualizer API, not a skill rename.

- [x] **Drift check** — pins at `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:130` read v7.5.0. PLAN line matches the Step 1.1 draft. Other `v7.5.0` hits are the dogfood stamps (refreshed in §5) and the `docs/CONTEXT-BUDGET.md` ledger (refreshed in §7.1). `main` is 1 commit ahead of `origin/main`: HEAD `215b2642` (FE-148) is unpushed, so §6.1 has no run to read until that commit is pushed.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — operator locked the migration block: no required project-side edits; custom `/api/active` clients read `.tasknotes`; CORE-827 notes the already-manual pre-v7.4.0 path; CORE-837 / CORE-835 / CORE-833 are behavior-only.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Version lock:** v7.5.0 → v8.0.0 (major). Operator accepted the Step 1.1 draft (`CORE-841`).
- **Commit rank:** 1 major, 21 minor, 40 patch. The sole major signal is `215b2642` `feat(viz)!:` FE-148, body `BREAKING CHANGE: /api/active returns { tasknotes, unparsable } instead of a bare tasknote array.`
- **Adopter migration impact** (locked at Phase 1 for the §7.2 tag message):
  - **No required project-side edits** for a normal submodule bump. The visualizer is one global instance run from flaitron's own checkout (`docs/MIGRATION.md` §"Visualizer"), and the bundled board already reads the new shape.
  - **FE-148 — custom clients only.** `GET /api/active` returns `{ tasknotes, unparsable }`. A custom client must read `.tasknotes`. Malformed active notes stay visible instead of failing the board.
  - **CORE-827 — no new action.** `/ft-update` no longer runs the finished v6 `.flowtron/` → `.flaitron/` move or the v7 skill-link swap. Adopters on v7.4.0+ are unaffected. A checkout still below that pin already uses `docs/UPGRADING.md` and `docs/MIGRATION.md` §"Upgrading to v7.0.0" by hand.
  - **Behavior, no file edits:** CORE-837 (`/ft-open-epic` stops after filing on an under-tier `.1`; resume with `/ft-open-epic <AREA>-<N>.1`); CORE-835 (`[unattended]` declines a row whose described work changes a rendered surface); CORE-833 (dirty tree stops with 🚧 `DIRTY`).
  - **Viz typecheck tiers (FE-131, FE-133–FE-143), FE-150, CORE-826/828/829/830, and the patch set — no adopter action.** Build and lint internals, drift pairs, and doc/chore commits.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — canonical release recipe (CORE-824 precedent); no new shape.

- [x] **Minimal refactor gate** — no refactor; version-string and stamp substitutions only.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, markdown-only edits. Standing validation gate is Phase 3.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:130` v7.5.0 → v8.0.0. The three pins are clean. Residual `v7.5.0` hits are the skipped dogfood stamps (recorded skips), `docs/VERSION-HISTORY.md`'s v7.5.0 entry (historical), and the `docs/CONTEXT-BUDGET.md` ledger (refreshed in §7.1).
- Dogfood ledger (walk-start `git status --porcelain` on the three stamp files empty; re-checked after the Grok write, diff was that row only). Operator declined the per-agent ask and pasted no receipts, so third-party rows are skips and Grok refreshes from this session:
  - Grok → `v8.0.0 · 2026-10-27 (dogfooded)` — written (this session's own run; SPEC.md reads v8.0.0, Phase 1 of CORE-841 complete) — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Claude → `v7.5.0 · 2026-10-25 (dogfooded; skipped @ v8.0.0)` — written (no receipt) — `docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`
  - Codex → `v7.5.0 · 2026-10-25 (dogfooded; skipped @ v8.0.0)` — written (no receipt) — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Cursor → `v7.5.0 · 2026-10-25 (dogfooded; skipped @ v8.0.0)` — written (no receipt) — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Step-5 re-verify loop: printed nothing. Matrix eyeball matches the ledger.
  - Two receipts arrived after the skips were written. Neither was applied. The CORE-841 receipt's My row was `v7.5.0 · 2026-10-25 (dogfooded)` with no skip suffix, which no current row holds. The CORE-641 receipt's My row matched the shared skip stamp, so it fit Claude, Codex, and Cursor equally; the operator declined to name the agent. Applying it would stamp an agent that did not run it.
- SOP currency: clean. Four tier-1 candidates on `SPEC/procedures/ft-task.md`, all dismissed:
  - `f98d202a` CORE-816, `56d7b902` CORE-814, `b0b9dca6` CORE-815.4 — same three CORE-824 dismissed. They edit `step-1.5-model-edge.md` (and preamble's token list, in CORE-815.4). The SOP reads that fragment by reference (line 182) and restates no tier names.
  - `72b17a27` docs: align micro routing wording — retitles the skill description and `micro-mode.md`'s routing pointer to "default route for known work". SOP line 52 already states that rule and reads `micro-mode.md` by reference; it does not quote the changed sentences.
  - Tier-2 note: 7 `SPEC.md` commits since 2026-10-11. Same count CORE-824 recorded. Not material on its own.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a fresh read-only reviewer ran the docs sweep. One observation, the README closed-task count, was the standing task-counter refresh (1224 → 1257). No other findings.

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A. This cut's edits are version pins and stamps. Viz behavior shipped in its own tasknotes; this session re-ran the standing viz gate only.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `npm --prefix viz test` → 0 (647/647) · `npm --prefix viz run typecheck` → 0 · `npm --prefix viz run lint` → 0 · `npm --prefix viz run build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (77/77) · `node --check tools/update-adopters.test.mjs` → 0 · `node --check tools/update-adopters.mjs` → 0
- `bash tools/drift-checks.sh` → 0 (19/19 ok).
- §6.2 `npm --prefix viz audit --audit-level=high` → 0 (0 vulnerabilities).
- Markdown mental-pass: single-token substitutions on the three pins; stamp edits are the same shape. No frontmatter or fences broken.
- §6.1: operator approved pushing the unpushed FE-148 commit. `git push origin main` moved `14d6f065..215b2642`. `gh run list --commit 215b2642`: CI completed success (https://github.com/fakeneuron/flaitron/actions/runs/40562001086). Release edits stayed unstaged.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - Subroutine `docs ai-referenced` (tracked overlay; no `.flaitron/audit-decisions/`). Gates `bash tools/drift-checks.sh pair_q final_newline context_budget` → 0. Health: no held findings. The README closed-task sentence was stale (1224 / 2026-10-24) and is the standing task-counter's own refresh, not a held finding.
  - Per-doc verdicts: `README.md` updated (task counter 1257, as of 2026-10-27); `SPEC.md`, `docs/MIGRATION.md`, `SECURITY.md` updated (version pins); `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` updated (dogfood stamps); `docs/CONTEXT-BUDGET.md` ledger refreshed at v8.0.0 (cold-start sum 112,172 → 112,348). Every other AI-referenced entry: no change.
  - Standing checks: wiring-consumer both greps empty (exit 1); shipped-skill parity ok; installed-surface four diffs empty; local self-wiring clean (audit link resolves to the overlay). README counter 1224 → 1257; dated stamps 1254 vs 1257 files (gap of 3, the known handful, not filed). Completed rotation 44 rows (bound 60). Context budget ok after the ledger refresh. Mirror pairs: `pair_*` + `skill_name_invariant` 13/13 ok; Pair A templates all named; Pair K1/K2 printed nothing.
  - Advisories: viz majors chokidar 5.0.0→6.0.0, ignore 5.3.2→7.0.14, typescript 5.9.3→7.0.2 (typescript already parked as CORE-641). Global wiring: clean (0 dangling, 1 casing `/Users/fakeneuron/Code/flaitron`, 0 over-install).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — in the 📦 gate. `touches:` plus `README.md` and `docs/CONTEXT-BUDGET.md`, which the standing checks edit and the stage list must name.

- [x] **Learnings** — N/A for the always-loaded layer. The README counter and the context-budget ledger already name this cut.

**Final Summary:** Cut flaitron v8.0.0, a major release. GET /api/active now returns { tasknotes, unparsable } so a malformed active tasknote stays on the board (FE-148, FE-150). Viz typecheck is split into browser and node tiers (FE-131, FE-133–FE-143). /ft-open-epic stops after filing on an under-tier discovery child (CORE-837). [unattended] declines a row whose work changes a rendered surface (CORE-835). A dirty tree stops with the DIRTY cue (CORE-833). /ft-update no longer runs the finished v6 rename or v7 link-swap (CORE-827). The cut bumped the three version pins, refreshed the Grok dogfood row to v8.0.0, and recorded Claude, Codex, and Cursor as skipped at v8.0.0. Two later receipts were not applied: one My-row did not match any current stamp, and the other matched the three skipped rows equally. CI on 215b2642 was green after that commit was pushed. SOP currency clean. Adopter impact: no required project-side edits. A custom /api/active client reads .tasknotes.

**Archived:** 2026-10-27
