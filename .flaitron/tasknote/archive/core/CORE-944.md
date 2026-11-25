---
title: release v8.6.0
status: completed
tags: []
created: 2026-11-25
due:
related-tasks: [CORE-913, CORE-915, CORE-936, CORE-918, CORE-919, CORE-931, CORE-943, CORE-912]
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
  - .flaitron/audit-overlay/SKILL.md
  - claude/AGENTS-snippet.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-944.md
---

# CORE-944 | release v8.6.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-915]] [[CORE-913]] [[CORE-936]] [[CORE-912]]

## 🎯 Goal

Cut v8.6.0 minor release tagging the direct-edit path (CORE-915), grouped seeder stays (CORE-913), the new `updater_roster` / `plan_placeholder` / `reconciled_pin` drift checks (CORE-936 / CORE-918.3 / CORE-919.3), and the fleet-updater module split (CORE-EPIC-931) since v8.5.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v8.5.0` → `v8.6.0` — `grep -q '^\*\*Version:\*\* v8.6.0$' SPEC.md`
- [x] docs/MIGRATION.md example pin bumped `v8.5.0` → `v8.6.0` — `grep -q '(e.g., `v8.6.0`)' docs/MIGRATION.md`
- [x] SECURITY.md release-tag example pin bumped `v8.5.0` → `v8.6.0` — `grep -q 'release tags (e.g. `v8.6.0`)' SECURITY.md`
- [x] README.md Quickstart installer URL tag bumped `v8.5.0` → `v8.6.0` — `grep -c "flaitron/v8.6.0/install.sh" README.md` → `1`
- [x] `.flaitron/audit-overlay/SKILL.md` `flaitron-reconciled:` → `v8.6.0` (§5 scaffold-diff triage) — `bash tools/drift-checks.sh reconciled_pin`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v8.6.0`, or recorded `skipped @ v8.6.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells") — `step-5-dogfood-sop.md` step 5 grep loop prints nothing
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way) — `judgment` (fragment walk)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — `judgment` (audit subroutine)
- [x] Single `feat: CORE-944 — flaitron v8.6.0 (...)` commit lands — `git log -1 --format=%s`
- [x] Annotated `v8.6.0` tag created with adopter-facing release notes — `git cat-file -t v8.6.0` → `tag`
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v8.6.0` (minor: headline + 2–4 main bullets + optional secondary) — `grep -q 'v8.6.0' docs/VERSION-HISTORY.md`
- [x] Tag pushed to origin — `git ls-remote --tags origin v8.6.0`
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-944.md`

## 🧩 Subtasks

- [x] Apply the 4 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md, README.md) v8.5.0 → v8.6.0, plus the audit-overlay pin after scaffold-diff triage
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO
- [x] Post-push: CI line for the release commit, install line for the new tag

## 🔗 Related

- [[CORE-912]] — prior release (v8.5.0); precedent for the subtask shape
- [[CORE-915]] — direct-edit path; changed the `ft-audit` scaffold, so the overlay pin needed triage
- [[CORE-919]] — `reconciled_pin` drift check (CORE-919.3), first cut it gates

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — no pending `release v*` row existed; Step 1.1 filed CORE-944 under `## Medium` (uncommitted until the release commit).

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v8.5.0 matches `SPEC.md:3` and `git describe --tags --abbrev=0`. 74 commits since: 5 `feat:` (CORE-915, CORE-913, CORE-936, CORE-918.3, CORE-919.3), no `BREAKING CHANGE:`. Highest rank minor; v8.6.0.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:488` (`describe --tags` pin), `SECURITY.md:130` (release-tag pin), `README.md:37` (installer URL), `.flaitron/audit-overlay/SKILL.md:4` (`flaitron-reconciled:`). All five read v8.5.0.

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-912 (v8.5.0) is the direct precedent: same subtask and touches shape, pre-cut push of `main` so §6.1 has a CI run on HEAD. New since then: the audit-overlay pin is part of the recipe (CORE-919.3).

- [x] **Drift check** — pins as above, one each. Other `v8.5.0` hits are dogfood stamps (`docs/AGENT-COMPAT.md:36-39`, `docs/PLATFORMS.md:564,598,621`, `claude/CAPABILITIES.md:77`) for §5 and the `docs/CONTEXT-BUDGET.md` ledger for §7.1. Working tree: untracked `.flaitron/tasknote/CORE-933.md` (operator-owned blocked note, not part of this cut). `main` is 45 commits ahead of `origin/main`; HEAD has no CI runs.

- [x] Asked clarifying questions — two: (1) push `main` now so §6.1 has a CI run on HEAD — yes, pushed `88a13b52..d5dc0ca4`; (2) dogfood rows — operator chose Claude and pasted Grok / Codex / Cursor reports.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- **Version lock:** v8.5.0 → v8.6.0 (minor).
- **Overlay scaffold-diff triage:** `git diff --stat v8.5.0 -- claude/skills/ft-audit/` → `SKILL.md` only, from CORE-915 (§5 trivial-fix carve-out now points at `SPEC/tasknote-selection.md` §"Direct-edit path (skip tier)", adds per-fix verification and `git diff --cached --check`). The overlay carries no inline-fix or carve-out delta and runs passes by reference, so nothing to re-reconcile; pin bumps.
- **Adopter migration impact** (for the §7.2 tag message):
  - **Direct-edit path (CORE-915):** the skip-the-tasknote tier is now a defined path in `SPEC/tasknote-selection.md` §"Direct-edit path (skip tier)" with eligibility and verification; `ft-task` preamble, the Codex procedure and `/ft-audit`'s inline-fix carve-out point at it. A thin audit overlay inherits it; a full-copy fork gets the `/ft-update` drift warning for `ft-audit` and should re-reconcile §5.
  - **`/ft-update` keeps marked sections (CORE-916):** the `## Workflow` replace stops at an unfenced `<!-- <name>:start -->` marker, so a section after the Workflow block survives a bump. Behavioral.
  - **Installer (CORE-943):** `install.sh` refuses a conflicting parent gitlink before reporting a verified release or changing a staged pin.
  - **Closure `(none)` restore (CORE-918.2 / 918.4):** a Phase 4 move that empties a PLAN section puts `(none)` back (SPEC, template, Codex procedure). Template text change only.
  - **`/ft-seed-unattended` (CORE-913):** stays with an identical reason group onto one line. Display only.
  - **Epic audits (CORE-927):** `/ft-close-epic` no longer scaffolds the fixed doc-drift Acceptance line in the `.N` audit (windowed; CORE-933 tracks the restore read).
  - **flaitron-self only:** drift checks `updater_roster` (CORE-936, 942), `plan_placeholder` (CORE-918.3), `reconciled_pin` (CORE-919.3), mirror-parity / flag helper (CORE-923, 924); fleet-updater split into `tools/update-adopters/*.mjs` (CORE-EPIC-931, CORE-921, 932, 935); headroom trims (CORE-EPIC-920); arch-health refresh (CORE-917); viz board-load robustness (FE-153 / 154 / 155).
  - **No required project-side edits** beyond the usual `/ft-update`.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-912 recipe, plus the CORE-919.3 overlay-pin bump.

- [x] **Minimal refactor gate** — none.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: version strings and stamps.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:488`, `SECURITY.md:130`, `README.md:37` v8.5.0 → v8.6.0; `grep -c "flaitron/v8.6.0/install.sh" README.md` → 1. Overlay pin `.flaitron/audit-overlay/SKILL.md:4` → v8.6.0 after scaffold-diff triage (Discovery Notes); `bash tools/drift-checks.sh reconciled_pin` → `ok`.
- Dogfood ledger (walk-start dirty check on the three stamp files: clean). Grok and Codex receipts pasted by the operator read v8.6.0, their "My row" matches the v8.5.0 stamp held at walk start, and each Phase-1 drive names a task (Grok CORE-933, Codex CORE-944) with exit-gate decision `skip ✅`. Grok's cue-render line kept the template placeholder `[your glyph outcome]` — not one of the three scored checks. Cursor's paste was a prose summary (SPEC version, entry point, row state), not the three `Log:` lines, and named no Phase-1 drive → Skipped. Claude refreshed on this session's own run.
  - `Claude → v8.6.0 · 2026-11-25 (dogfooded)` — written (`docs/AGENT-COMPAT.md:36`, `claude/CAPABILITIES.md:77`)
  - `Grok → v8.6.0 · 2026-11-25 (dogfooded)` — written (`docs/AGENT-COMPAT.md:37`, `docs/PLATFORMS.md:564`)
  - `Codex → v8.6.0 · 2026-11-25 (dogfooded)` — written (`docs/AGENT-COMPAT.md:38`, `docs/PLATFORMS.md:598`)
  - `Cursor → v8.5.0 · 2026-11-14 (dogfooded; skipped @ v8.6.0)` — written (`docs/AGENT-COMPAT.md:39`, `docs/PLATFORMS.md:621`)
  - Re-verified from file state with the step-5 grep loop: printed nothing; matrix eyeballed per agent.
- SOP currency: two tier-1 candidates on `SPEC/procedures/ft-task.md`, both dismissed — 3af2d8dd (CORE-918.2) was carried into the SOP by ba252b22 (CORE-918.4, `SPEC/procedures/ft-task.md:338`); c610ca1f (CORE-879) dismissed as at v8.4.0 / v8.5.0 (Claude-only usage string). Tier-2 note: 3 `SPEC.md` commits. Stamp left un-bumped. Clean.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — N/A: release cut; the diff is version strings, stamps, ledger numbers and three doc-drift fixes, graded by the §7.1 sweep (a non-author context) and the mirror-pair gates.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `npm --prefix viz test` → 0 (691 tests, 32 files); `typecheck` → 0; `lint` → 0; `build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (126/126); `node --check` on the test file, entry and six `tools/update-adopters/*.mjs` modules → 0; `node --test tools/drift-checks.test.mjs` → 0 (51/51)
- `npm --prefix viz audit --audit-level=high` → 0 (0 vulnerabilities)
- §6.1 CI on HEAD `d5dc0ca4` (after pushing `main`): `CI` and `Install test` completed/success
- §7.1 docs `ai-referenced` subroutine (delegated, read-only): 18 of 18 docs swept; no bootstrap gap; `pair_q final_newline context_budget` → 0; relative links and wikilinks resolve. Three Low defects, verified, operator chose **Stop** (fix in tree):
  1. `claude/AGENTS-snippet.md:73` cited `tools/update-adopters.mjs` for `snippetLinks()` / `codexRoster()`, which CORE-931 moved to `tools/update-adopters/text.mjs` → repointed.
  2. `README.md:319` §"Repo layout" `SPEC/` bullet listed only `fixtures/plan/` → now names `fixtures/` with `plan/`, `fence/` (CORE-922), `workflow-block/` (CORE-921), matching `SPEC/layout.md:36-38`.
  3. `.flaitron/audit-overlay/SKILL.md:71` Verification gates line (outside the declared doc set; surfaced as an observation) claimed the `validate` job's commands but lacked the six `node --check tools/update-adopters/*.mjs` lines → added.
  - Re-run after fixes: `bash tools/drift-checks.sh` (all) → 0; `pair_q final_newline context_budget` → 0; `node --test tools/update-adopters.test.mjs` → 0.
- Standing checks: wiring-consumer derivation clean (both greps exit 1); `shipped_skill_parity ok`; installed-surface expected-set diff → 0 and `snippet_roster_parity ok`; local self-wiring clean (no missing, dangling, copied or miswired entry); global wiring clean (operator approved the scan; no dangling, one casing line, no over-install); `context_budget ok`, no NEAR CAP lines.
- README counter 1339 → 1389 tasks, dated 2026-11-25 (archive held 1388; includes this note). `docs/CONTEXT-BUDGET.md` ledger re-measured at v8.6.0: cold-start sum 106,657 → 107,152; ft-release 38,018 → 31,264 (dir 107,927 → 95,996); `claude/AGENTS-snippet.md` 13,489 → 11,579.
- `bash tools/drift-checks.sh 'pair_*' skill_name_invariant brand_nearmiss brand_casing reconciled_pin` → 0, sixteen `ok`; Pair A clean (every `templates/` file named in `SPEC/layout.md:50`); K1/K2 clean. Full `bash tools/drift-checks.sh` → 0 after the ledger and counter edits.
- Advisories: Completed rotation 55 rows (bound 60) before this row; viz majors pending: @testing-library/jest-dom 7.0.1→8.0.0, chokidar 5.0.0→6.0.0, ignore 5.3.2→7.0.17, jsdom 30.0.1→31.0.1, typescript 5.9.3→7.0.2.
- Tag-message sentinel: first `Migration:` line starts `No required project-side edits`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: 18 swept; `claude/AGENTS-snippet.md` (updater function path) and `README.md` (fixtures bullet, task counter) updated, the rest no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — in the 📦 gate at commit-go

- [x] **Learnings** — N/A for the always-loaded layer. Procedure note: CORE-931.8 repointed one updater citation (SECURITY.md) but missed two (the snippet's parse claim, the overlay's gates line); a module split's citation sweep should grep every doc for the old entry-file name followed by a moved function. `touches:` reconciliation: `README.md`, `claude/AGENTS-snippet.md` and `.flaitron/audit-overlay/SKILL.md` carry the mid-cut fixes; `claude/AGENTS-snippet.md` was undeclared at scaffold time (added by the Stop decision).

**Final Summary:** Cut flaitron v8.6.0 (minor) tagging the direct-edit path (CORE-915), grouped seeder stays (CORE-913), `/ft-update`'s marker-preserving Workflow replace and stricter paste-block reading (CORE-916, CORE-930 / 937 / 938), the installer's parent-gitlink check (CORE-943), viz board-load recovery (FE-153 / 154 / 155), and three flaitron-self drift checks (CORE-936, CORE-918.3, CORE-919.3) alongside the fleet-updater module split (CORE-EPIC-931). Adopter impact: no required project-side edits; full-copy `ft-audit` forks get a drift warning to re-reconcile §5. Dogfood: Claude, Grok and Codex refreshed at v8.6.0; Cursor skipped (no receipt). Three Low doc-drift defects fixed in-cut on the operator's Stop.

**Archived:** 2026-11-25
