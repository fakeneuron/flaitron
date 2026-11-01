---
title: release v8.3.0
status: completed
tags: []
created: 2026-11-01
due:
related-tasks: [CORE-851, CORE-EPIC-857, CORE-856, CORE-858, CORE-859, CORE-854]
touches:
  - SPEC.md
  - docs/MIGRATION.md
  - SECURITY.md
  - docs/VERSION-HISTORY.md
  - docs/CONTEXT-BUDGET.md
  - README.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - tools/install.test.sh
  - docs/AGENT-COMPAT.md
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-855.md
---

# CORE-855 | release v8.3.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-851]] [[CORE-EPIC-857]] [[CORE-854]]

## 🎯 Goal

Cut v8.3.0 minor release tagging CORE-851 (one-line installer carve-out) + CORE-EPIC-857 (context-redundancy) + CORE-856 / CORE-858 / CORE-859 since v8.2.0, so the README's tag-pinned installer URL resolves, then confirm the live install CI and the installer → `/ft-adopt` hand-off.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v8.2.0` → `v8.3.0` — `grep -q '^\*\*Version:\*\* v8.3.0$' SPEC.md`
- [x] docs/MIGRATION.md example pin bumped `v8.2.0` → `v8.3.0` — `grep -q '(e.g., `v8.3.0`)' docs/MIGRATION.md`
- [x] SECURITY.md release-tag example pin bumped `v8.2.0` → `v8.3.0` — `grep -q 'release tags (e.g. `v8.3.0`)' SECURITY.md`
- [x] README installer URL tag-pinned at `v8.3.0` — `grep -c "flaitron/v8.3.0/install.sh" README.md` → `1`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v8.3.0`, or recorded `skipped @ v8.3.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells") — `step-5-dogfood-sop.md` step 5 grep loop prints nothing
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way) — `judgment` (fragment walk)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — `judgment` (audit subroutine)
- [x] Single `feat: CORE-855 — flaitron v8.3.0 (...)` commit lands — `git log -1 --format=%s`
- [x] Annotated `v8.3.0` tag created with adopter-facing release notes — `git cat-file -t v8.3.0` → `tag`
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v8.3.0` (minor: headline + 2–4 main bullets + optional secondary) — `grep -q 'v8.3.0' docs/VERSION-HISTORY.md`
- [x] Tag pushed to origin — `git ls-remote --tags origin v8.3.0`
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-855.md`

## 🧩 Subtasks

- [x] Apply the 4 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md; README already at v8.3.0) v8.2.0 → v8.3.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO
- [ ] Post-push: `install-test.yml` green on ubuntu + macOS; installer one-liner + `/ft-adopt` hand-off on a scratch repo

## 🔗 Related

- [[CORE-851]] — one-line installer (`install.sh`) + third CLI carve-out; its deferred live-CI and hand-off checks land here
- [[CORE-EPIC-857]] — context-redundancy: SOP / skill-body / SPEC pointer cuts, size-first small-task routing
- [[CORE-856]] — agent-baseline-redundancy survey (HARNESS-SURVEY third pass)
- [[CORE-858]] — seed-question-only ask wording
- [[CORE-859]] — `/ft-file-task` nested placement
- [[CORE-854]] — prior release (v8.2.0); precedent for the subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — pre-filed line under `## Medium`; entered via `/ft-task CORE-855`, which handed off to `/ft-release` before scaffolding (the release recipe lives there).

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v8.2.0 matches `SPEC.md:3` and `git describe --tags --abbrev=0`. 16 commits since: 1 `feat:` (CORE-851), 7 `docs:`, 8 `chore:`, no `BREAKING CHANGE:`. Highest rank minor; PLAN target v8.3.0 agrees.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:488` (`describe --tags` pin), `SECURITY.md:130` (release-tag pin), `README.md:37` (installer URL). The first three read v8.2.0; the README already reads v8.3.0 (set by CORE-851).

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-854 (v8.2.0) is the direct precedent: same subtask and touches shape, with a pre-cut push so §6.1 had a CI run on HEAD. CORE-851 defers two checks here: the live `install-test.yml` run and the `/ft-adopt` hand-off on a tag that ships the ft-adopt Step 0 installer exception.

- [x] **Drift check** — pins as above; README edit 4 is a no-op this cut. Other `v8.2.0` hits are dogfood stamps (`docs/PLATFORMS.md:564,598,621`, `claude/CAPABILITIES.md:77`, `docs/AGENT-COMPAT.md` matrix) for §5 and the `docs/CONTEXT-BUDGET.md` ledger (:124, :325, :368) for §7.1. `main` is 16 commits ahead of `origin/main`, so HEAD has no CI run yet (§6.1).

- [x] Asked clarifying questions — three, all answered with the recommended option: (1) push `main` now so §6.1 has a CI run on HEAD — pushed `6954ca82..91b38a36`; (2) the post-push checks get recorded in a follow-up local `chore:` commit against the archived note (it rides the next push); (3) the scratch-repo installer run uses a sandboxed `HOME` / `FLAITRON_HOME` under the session scratchpad — real `~` untouched; the operator can run `/ft-adopt` there by hand for the full end-to-end check.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- **Version lock:** v8.2.0 → v8.3.0 (minor).
- **Adopter migration impact** (for the §7.2 tag message):
  - **No required project-side edits.**
  - **New optional install path (CORE-851).** `curl -fsSL https://raw.githubusercontent.com/fakeneuron/flaitron/v8.3.0/install.sh | sh` pins the submodule to a verified release tag, wires detected agents' skill links, links one global `ft-adopt`, and hands off to `/ft-adopt`. Existing adopters are unaffected; `/ft-update` remains the bump path.
  - **Smaller always-loaded context (CORE-EPIC-857).** `SPEC.md`, the `/ft-task` body, `SPEC/procedures/ft-task.md` and the tasknote README point at owners instead of re-narrating. Picked up by the next `/ft-update`; no action.
  - **Small-task routing (CORE-857.5).** A doc patch under ~25 lines can skip the tasknote even with a PLAN ID; `/ft-task` flags a tier mismatch in one line. Behavioral, no migration.

Discovery surfaced no significant deviation → skip 🛠️ (the three asks were recipe decisions, answered).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-854 recipe, unchanged.

- [x] **Minimal refactor gate** — none.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: version strings and stamps; the §6.1 CI fix is a lint directive.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:488`, `SECURITY.md:130` v8.2.0 → v8.3.0. `README.md:37` already read `flaitron/v8.3.0/install.sh` (CORE-851) — edit 4 a no-op; `grep -c` → 1.
- Dogfood ledger (operator: skip all three non-Claude rows; no receipts):
  - `Claude → v8.3.0 · 2026-11-01 (dogfooded)` — written (`docs/AGENT-COMPAT.md:36`, `claude/CAPABILITIES.md:77`); this session's own `/ft-task` → `/ft-release` drive.
  - `Grok → v8.2.0 · 2026-11-01 (dogfooded; skipped @ v8.3.0)` — written (`docs/AGENT-COMPAT.md:37`, `docs/PLATFORMS.md:564`)
  - `Codex → v8.2.0 · 2026-11-01 (dogfooded; skipped @ v8.3.0)` — written (`docs/AGENT-COMPAT.md:38`, `docs/PLATFORMS.md:598`)
  - `Cursor → v7.5.0 · 2026-10-25 (dogfooded; skipped @ v8.3.0)` — written (`docs/AGENT-COMPAT.md:39`, `docs/PLATFORMS.md:621`)
  - Step 5 re-verify loop → printed nothing. Stamp files were clean at walk start.
- SOP currency: clean. Tier-1 candidates on `SPEC/procedures/ft-task.md`: `72b17a27`, `f98d202a` CORE-816, `b0b9dca6` CORE-815.4, `56d7b902` CORE-814, `f492d4fd` CORE-850.2 (dismissed at earlier cuts, same reasons) and new `7e28bdc4` CORE-857.4 — a pointer trim of the `/ft-task` body with no rule change; the SOP got its own pointer cut in CORE-857.2. Tier-2 note: 13 `SPEC.md` commits since 2026-10-11. Not material.
- §6.1 fix: `install-test.yml`'s shellcheck job failed on `91b38a36` — the ubuntu runner's pre-0.11 shellcheck reports the `check()`-invoked helpers as SC2317 (0.11 calls it SC2329, already disabled). Added SC2317 to the file-level directive in `tools/install.test.sh:7`; committed `9ffe2d6e` (`fix: CORE-855`) and pushed on operator go. Both e2e jobs (ubuntu + macOS) had passed on `91b38a36`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — standing gate below.

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — the §7.1 `docs ai-referenced` sweep runs in a fresh read-only reviewer context; that is this cut's non-author grading.

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend change.

**Testing Notes:**

- Standing gate: `npm --prefix viz test` → 0 (647 passed) · `typecheck` → 0 · `lint` → 0 · `build` → 0 · `node --test tools/update-adopters.test.mjs` → 0 (122 pass) · `node --check` ×2 → 0.
- §6.2 `npm --prefix viz audit --audit-level=high` → 0.
- `shellcheck -s sh install.sh tools/install.test.sh` (local 0.11.0) → 0, before and after the fix.
- §6.1 CI: `91b38a36` CI success, Install test failure (shellcheck only) → fixed in `9ffe2d6e`. `9ffe2d6e`: CI success, Install test success (shellcheck + e2e ubuntu + macOS).
- Receipt (Acceptance, pre-commit): SPEC `grep -q` → 0 · MIGRATION `grep -q` → 0 · SECURITY `grep -q` → 0 · README `grep -c` → 1 · VERSION-HISTORY `grep -q` → 0 · dogfood step-5 loop → no output · `bash tools/drift-checks.sh` → 0. Commit / tag / push criteria are verified at §7.5 (`git log -1`, `git cat-file -t v8.3.0`, `git ls-remote`).
- §7.1 sweep 1 (fresh read-only reviewer, tracked overlay, `docs ai-referenced`): gate `pair_q final_newline context_budget` → 0; four held findings — [Medium] `SECURITY.md:217` "singular script exception" predates `install.sh`; [Medium] the four `*/AGENTS-snippet.md` parser lists omit `install.sh`'s `wire_project`; [Low] `SECURITY.md` §"GitHub Actions CI" silent on `install-test.yml`; [Low] README §"All documentation" missing `docs/DOC-DRIFT-SWEEP.md`. Operator chose **Stop**; all four fixed here.
- §7.1 sweep 2: gate → 0, all four cleared, no new findings.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - Subroutine `docs ai-referenced` (tracked overlay), two runs as in Testing Notes. Per-doc verdicts: `SPEC.md` updated (version pin); `docs/MIGRATION.md` updated (version pin); `SECURITY.md` updated (version pin; script-exception count; install-test CI posture); `README.md` updated (DOC-DRIFT-SWEEP index bullet; task counter 1277 → 1289, as of 2026-11-01; installer URL already v8.3.0); `claude/` `codex/` `cursor/` `grok/` `AGENTS-snippet.md` updated (`install.sh` named as an `ln -s` parser); `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` updated (dogfood stamps); `docs/CONTEXT-BUDGET.md` ledger refreshed at v8.3.0 (cold-start sum 114,045 → 106,250). Every other AI-referenced entry: no change.
  - Standing checks: wiring-consumer both greps empty (exit 1); shipped-skill parity ok; installed-surface four diffs empty (7 policy slugs); local self-wiring clean. README counter 1289; dated stamps 1286 vs 1289 files (the known handful, not filed). Completed rotation 42 rows (bound 60). Context budget ok after the ledger refresh. Mirror pairs: `pair_*` + `skill_name_invariant` 13/13 ok; Pair A templates all named; Pair K1/K2 printed nothing. (Run from a scratchpad script; the path-access hook reads `../../.flaitron/core` grep patterns as paths.)
  - Advisories: viz majors chokidar 5.0.0→6.0.0, ignore 5.3.2→7.0.14, typescript 5.9.3→7.0.2 (typescript parked as CORE-641). Global wiring (operator approved the read): clean (0 dangling, 1 casing `/Users/fakeneuron/Code/flaitron`, 0 over-install).
  - Reviewer notes, not findings: `.flaitron/audit-overlay/SKILL.md:4` still `flaitron-reconciled: v7.5.0`; the claude snippet's parser sentence covers "the three platform blocks" though `install.sh` / the updater also parse the claude block (pre-existing); `SPEC/scope-boundaries.md`'s "writes nothing a manual adoption would not" omits `.flaitron/backup/`. Not filed.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — in the 📦 gate. `git diff --name-only` matches `touches:` (`tools/install.test.sh` landed in its own `fix:` commit `9ffe2d6e` ahead of the cut).

- [x] **Learnings** — N/A for the always-loaded layer. The release recipe's shellcheck lives only in the path-filtered `install-test.yml`, so a runner-version lint gap surfaced first at the cut; §6.1 caught it as designed.

**Post-push (recorded after the release push, per operator):** pending.

**Final Summary:** Cut flaitron v8.3.0, a minor release. A new adopter can install flaitron with one tag-pinned command: `install.sh` pins `.flaitron/core` to a verified release tag, wires each detected agent's skill links from the pinned snippets, links one global `ft-adopt` and hands off to `/ft-adopt` (CORE-851). SPEC.md, the `/ft-task` body and the agent-neutral ft-task procedure now point at the module that owns each rule, cutting the default cold-start path from 114,045 to 106,250 chars, and small doc patches route by size first (CORE-EPIC-857). The 16 unpushed commits were pushed first so CI could gate HEAD. `install-test.yml`'s shellcheck job was red there (the runner's pre-0.11 shellcheck reports SC2317), fixed in `9ffe2d6e` and green on both OSes. The cut bumped the three version pins (the README URL was already v8.3.0). Claude was refreshed to v8.3.0; Grok, Codex and Cursor were recorded as skipped. The §7.1 sweep held four doc findings; the operator chose Stop, they were fixed here, and the re-run came back clean. SOP currency clean. Adopter impact: no required project-side edits.

**Archived:** 2026-11-01
