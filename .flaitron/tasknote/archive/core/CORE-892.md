---
title: release v8.4.0
status: completed
tags: []
created: 2026-11-08
due:
related-tasks: [CORE-860, CORE-863, CORE-864, CORE-866, CORE-868.3, CORE-869.3, CORE-872, FE-151, CORE-855]
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
  - .flaitron/tasknote/archive/core/CORE-892.md
---

# CORE-892 | release v8.4.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-860]] [[CORE-863]] [[CORE-864]] [[CORE-866]] [[CORE-855]]

## 🎯 Goal

Cut v8.4.0 minor release tagging the brand-casing guard (CORE-860 / CORE-863), the handoff-row drift check (CORE-866), release-installs-new-tag (CORE-868.3), the context-budget near-cap work (CORE-869 / CORE-872 / CORE-891) and FE-151 viz-quality-stack since v8.3.0, with the CORE-864 casing note carried in the tag message.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v8.3.0` → `v8.4.0` — `grep -q '^\*\*Version:\*\* v8.4.0$' SPEC.md`
- [x] docs/MIGRATION.md example pin bumped `v8.3.0` → `v8.4.0` — `grep -q '(e.g., `v8.4.0`)' docs/MIGRATION.md`
- [x] SECURITY.md release-tag example pin bumped `v8.3.0` → `v8.4.0` — `grep -q 'release tags (e.g. `v8.4.0`)' SECURITY.md`
- [x] README installer URL tag-pinned at `v8.4.0` — `grep -c "flaitron/v8.4.0/install.sh" README.md` → `1`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v8.4.0`, or recorded `skipped @ v8.4.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells") — `step-5-dogfood-sop.md` step 5 grep loop prints nothing
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way) — `judgment` (fragment walk)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — `judgment` (audit subroutine)
- [x] Single `feat: CORE-892 — flaitron v8.4.0 (...)` commit lands — `git log -1 --format=%s`
- [x] Annotated `v8.4.0` tag created with adopter-facing release notes, including the CORE-864 lowercase-heading note — `git cat-file -t v8.4.0` → `tag`
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v8.4.0` (minor: headline + 2–4 main bullets + optional secondary) — `grep -q 'v8.4.0' docs/VERSION-HISTORY.md`
- [x] Tag pushed to origin — `git ls-remote --tags origin v8.4.0`
- [x] PLAN.md line flipped to stub form under `## Completed`; CORE-864 closed with this release
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-892.md`

## 🧩 Subtasks

- [x] Apply the 4 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md, README.md) v8.3.0 → v8.4.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO
- [x] Post-push: CI line for the release commit, install line for the new tag

## 🔗 Related

- [[CORE-855]] — prior release (v8.3.0); precedent for the subtask shape
- [[CORE-864]] — Low row: the tag notes must say `SPEC.md`'s line-1 heading is now lowercase; closes with this release
- [[CORE-863]] — brand-casing guard that lowercased the heading
- [[CORE-868.3]] — `/ft-release` Step 8 install line; first exercised by this cut

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — no pending `release v*` row existed; Step 1.1 filed CORE-892 under `## Medium` (uncommitted until the release commit).

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v8.3.0 matches `SPEC.md:3` and `git describe --tags --abbrev=0`. 45 commits since: 13 `feat:`, 6 `fix:`, the rest `docs:`/`chore:`, no `BREAKING CHANGE:`. Highest rank minor; proposed v8.4.0.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:488` (`describe --tags` pin), `SECURITY.md:130` (release-tag pin), `README.md:37` (installer URL). All four read v8.3.0.

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-855 (v8.3.0) is the direct precedent: same subtask and touches shape, pre-cut push so §6.1 has a CI run on HEAD. CORE-868.3 added the Step 8 install line this cut exercises first.

- [x] **Drift check** — pins as above, one each. Other `v8.3.0` hits are dogfood stamps (`docs/PLATFORMS.md:564,598,621`, `claude/CAPABILITIES.md:77`, `docs/AGENT-COMPAT.md:36-39`) for §5 and the `docs/CONTEXT-BUDGET.md` ledger for §7.1. `SPEC/procedures/ft-task.md:5` carries `last-verified: v8.3.0` (CORE-876), left un-bumped per the SOP-currency rule. Working tree was clean before the PLAN.md filing.

- [x] Asked clarifying questions — two: (1) push `main` now so §6.1 has a CI run on HEAD — yes, pushed `02d856f2..28b12975`; (2) dogfood rows — operator will refresh some (receipts held for §5).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- **Version lock:** v8.3.0 → v8.4.0 (minor).
- **Adopter migration impact** (for the §7.2 tag message):
  - **Required reading, no project edits: `SPEC.md` line 1 is now lowercase (CORE-863 / CORE-864).** Heading reads `# flaitron — Workflow Specification`. An `install.sh` from an earlier tag refuses that core (`update` dies "does not hold flaitron"; global ft-adopt skipped), so fetch the installer from this tag. `install.sh` itself now accepts both casings, so older pinned cores keep installing.
  - **New drift checks in `tools/drift-checks.sh`:** `brand_casing`, `brand_nearmiss` (CORE-860 / 863), `installer_anchors` (CORE-868.2), `handoff_rows` (CORE-866), `pair_r` UNCHECKED STUB (CORE-873), non-failing NEAR CAP report with per-row `NEAR CAP at N%` (CORE-869.3 / 891). Flaitron-self; adopters unaffected.
  - **`handoff_rows` (CORE-866):** tasknotes archived on or after 2026-11-08 must cite a PLAN row in their hand-off block or say "none deferred"; `/ft-close-epic`'s audit files each open hand-off as a standalone row. Behavioral, no migration.
  - **`--unattended` hardening:** Phase 4 doc sweep edits only in-scope docs (CORE-867); the 400-line cap counts renames by content delta, parking out-of-scope at the Phase 1→2 exit (CORE-872).
  - **`/ft-release` Step 8** proves the README installer URL once the release is published (CORE-868.3); flaitron-self only.
  - **viz quality stack (FE-151):** `eslint --max-warnings 0`, `noUncheckedIndexedAccess`, diff-cover 80% changed-line gate. Visualizer only; no behavior change.
  - CI job timeouts set to NAT-528 defaults (CORE-862); minimatch pinned via viz overrides (CORE-868.4).
  - **No required project-side edits** beyond fetching the installer from the new tag.

Discovery surfaced no significant deviation → skip 🛠️ (both asks were recipe decisions, answered).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-855 recipe, unchanged.

- [x] **Minimal refactor gate** — none.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: version strings and stamps.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:488`, `SECURITY.md:130`, `README.md:37` v8.3.0 → v8.4.0; `grep -c "flaitron/v8.4.0/install.sh" README.md` → 1.
- Dogfood ledger (operator: refresh Claude and Codex; Codex session declined to issue a receipt because it cannot observe glyph rendering, so Codex resolved as skipped; Grok and Cursor not offered, skipped; Claude receipt pasted by the operator reads v8.4.0, its "My row" stamp matches, names CORE-864 and a skip decision):
  - `Claude → v8.4.0 · 2026-11-08 (dogfooded)` — written (`docs/AGENT-COMPAT.md:36`, `claude/CAPABILITIES.md:77`)
  - `Grok → v8.2.0 · 2026-11-01 (dogfooded; skipped @ v8.4.0)` — written (`docs/AGENT-COMPAT.md:37`, `docs/PLATFORMS.md:564`)
  - `Codex → v8.2.0 · 2026-11-01 (dogfooded; skipped @ v8.4.0)` — written (`docs/AGENT-COMPAT.md:38`, `docs/PLATFORMS.md:598`)
  - `Cursor → v7.5.0 · 2026-10-25 (dogfooded; skipped @ v8.4.0)` — written (`docs/AGENT-COMPAT.md:39`, `docs/PLATFORMS.md:621`)
  - Re-verified from file state with the step-5 grep loop: printed nothing.
- SOP currency: one tier-1 candidate, c610ca1f (CORE-879), dismissed: it only changed the Claude-only `/ft-task` unknown-arg usage string, which `SPEC/procedures/ft-task.md` does not restate. Stamp left un-bumped. Clean.
- Doc-drift fixes landed inline: README task counter 1289 → 1323 tasks, dated 2026-11-08 (includes this note); `docs/CONTEXT-BUDGET.md` ledger re-measured at v8.4.0.
- CORE-864 (Low) closed with this release: the tag message's Migration section carries the lowercase-heading installer note after the `No required project-side edits` sentinel.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: release cut; the diff is version-string and stamp edits, graded by the §7.1 sweep and mirror-pair gates.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `npm --prefix viz test` → 0 (31 files, 647 tests); `typecheck` → 0; `lint` → 0; `build` → 0
- `node --test tools/update-adopters.test.mjs` → 0; `node --check` on both files → 0; `node --test tools/drift-checks.test.mjs` → 0
- `npm --prefix viz audit --audit-level=high` → 0 (0 vulnerabilities)
- §6.1 CI on HEAD `28b12975` (after pushing `main`): `CI` and `Install test` completed/success
- §7.1 docs `ai-referenced` subroutine: 18 of 18 docs swept; 1 Medium finding (stale README counter), fixed inline; `pair_q final_newline context_budget` → 0
- Standing checks: wiring-consumer derivation clean; `shipped_skill_parity ok`; installed-surface diffs ×4 → 0; local self-wiring clean; global wiring clean (one casing line, no dangling, no over-install); `context_budget ok` (NEAR CAP: ft-release SKILL.md, ft-release/**, procedures/ft-task.md at 95%)
- `bash tools/drift-checks.sh 'pair_*' skill_name_invariant brand_nearmiss brand_casing` → 0, fifteen `ok`
- Advisories: Completed rotation 57 rows (bound 60); viz majors pending: chokidar 5.0.0→6.0.0, ignore 5.3.2→7.0.14, jsdom 30.0.1→31.0.0, typescript 5.9.3→7.0.2

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — in the 📦 gate at commit-go

- [x] **Learnings** — N/A. One procedure gap to file after the cut: `docs/DOGFOOD.md` Step 2 asks an agent to confirm glyph rendering it cannot observe; Codex declined the receipt.

**Final Summary:** Cut flaitron v8.4.0 (minor) tagging the brand-casing guard (CORE-860 / CORE-863), handoff-row drift check (CORE-866), release-installs-new-tag (CORE-868.3) and installer-anchor check (CORE-868.2), unattended doc-sweep and rename-aware size cap (CORE-867 / CORE-872), the context-budget near-cap work (CORE-869 / CORE-891) and FE-151 viz-quality-stack. Adopter impact: no required project-side edits; SPEC.md's line-1 heading is now lowercase, so an install.sh from before v8.4.0 refuses this core and adopters fetch the installer from the new tag (CORE-864, closed with this release). Dogfood: Claude refreshed, Grok / Codex / Cursor skipped.

**Archived:** 2026-11-08
