---
title: installer-anchor-drift-check
status: completed
tags: [drift-checks, installer]
created: 2026-11-06
due:
related-tasks: [CORE-EPIC-868, CORE-868.3, CORE-863, CORE-861]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - docs/CONVENTIONS.md
---

# CORE-868.2 | installer-anchor-drift-check

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-868]]

## 🎯 Goal

Add a `tools/drift-checks.sh` check, with its seeded-drift self-test case, that fails when HEAD stops matching what `install.sh` parses: `SPEC.md` line 1 under `is_flaitron_tree`, a non-empty `ln -s` roster from each `*/AGENTS-snippet.md` under `wire_project`'s awk, and the `Installer exception` marker in `claude/skills/ft-adopt/SKILL.md`.

## ✅ Acceptance

- [x] `installer_anchors` passes on HEAD — `bash tools/drift-checks.sh installer_anchors`
- [x] It runs `install.sh`'s own `is_flaitron_tree` / `agent_snippet` / `agent_dir` / `wire_project` bodies and reads the marker literal from `install.sh`, restating none of them — `judgment` (External review reads the function)
- [x] Seeded drift case plus a per-anchor fixture test (heading, roster, unmapped and deleted snippet, marker, reshaped installer) fail with their own finding lines; coverage and floor tests stay green — `node --test tools/drift-checks.test.mjs`
- [x] `docs/CONVENTIONS.md` names the new check beside the other no-rule/no-catalogue checks — `grep -q installer_anchors docs/CONVENTIONS.md`
- [x] Every drift check still passes — `bash tools/drift-checks.sh`
- [x] Full validation set green — `just check`

## 🧩 Subtasks

- [x] Add `installer_anchors` to `tools/drift-checks.sh` (after `sidequest_orphan`), with a `VACUOUS` floor; header list of no-rule checks updated
- [x] Add the `CASES` entry and a per-anchor fixture `describe` in `tools/drift-checks.test.mjs`
- [x] Name the check in `docs/CONVENTIONS.md` §"GitHub Actions CI"'s no-rule list
- [x] Run acceptance commands + `just check`

## 🔗 Related

- [[CORE-EPIC-868]] — parent epic (gate-blind-spots)
- [[CORE-868.3]] — sibling: adds the anchor files to `install-test.yml`'s path filter
- [[CORE-863]] — made `is_flaitron_tree` accept both heading casings; added `brand_casing` (shape precedent)
- [[CORE-861]] — found the heading rename would break `install.sh` on older pins

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** No check binds the three anchors today; `install-test.yml` is path-filtered to `install.sh` and its test, so an edit to `SPEC.md` line 1, a snippet's `ln -s` block, or ft-adopt's marker passes CI and only breaks a real install.

- [x] Read relevant source files — `install.sh` (`is_flaitron_tree` :60, `agent_snippet`/`agent_dir` :103-117, `wire_project` :224-238, marker grep :335), `tools/drift-checks.sh` (header shape rules, `sidequest_orphan`, `pair_t`, dispatcher), `tools/drift-checks.test.mjs` (CASES, coverage + floor tests, isolated fixture describes), the four `*/AGENTS-snippet.md` (7 `ln -s` lines each), `claude/skills/ft-adopt/SKILL.md:26`, `docs/CONVENTIONS.md:58`, `claude/skills/ft-release/step-7.1-mirror-pairs.md:12-15`.

- [x] **Best Practices Review** — one self-contained check function. Dependency direction: the check reads `install.sh` and calls its functions, so the installer stays the single owner of the parse (no second copy to drift, unlike `pair_t`'s "copy of pair_h's").

- [x] **Archive skim** — `archive/core/` (confirmed against the README table). `install.sh` hits: CORE-439, 468, 851, 855, 857.6, 861, 862, 863. Load-bearing: CORE-861 found `is_flaitron_tree` byte-compares line 1 and runs on older pins; CORE-863 made it accept both casings and is the shape precedent for a new check (CASES entry + isolated fixture + floor; catalogue entry because brand guards run in §7.1). No prior check on these anchors.

- [x] **Drift check** — cited anchors match current code: `is_flaitron_tree` at `install.sh:60`, the roster awk at :230-231, the marker grep at :335, all four snippets carry 7 `ln -s` lines, ft-adopt carries `**Installer exception.**` at :26. PLAN row matches the epic filing (commit 7b2a9abc). No `.1` Discovery note exists for this epic ("Discovery supplied by audit-repo"), so no Fan-out to echo.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed (--fast). Assumptions: (1) the check executes `install.sh`'s functions, extracted by name, rather than restating its patterns; (2) agents are enumerated from the `*/AGENTS-snippet.md` glob and each must also be the path `agent_snippet` returns; (3) "non-empty roster" is the bar — target existence is out of scope; (4) CI-only like `sidequest_orphan`: no `/ft-release` §7.1 invocation or catalogue edit (CORE-868.3 owns the ft-release change), so docs/CONVENTIONS.md's "neither a source rule nor a catalogue entry" list grows by one.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- `wire_project` reads `.flaitron/core/<snippet>` relative to cwd; the check runs it in a temp dir whose `.flaitron/core` is a symlink to the checkout, with `say`/`die`/`link_one`/`report_dangling`/`mkdir` stubbed so it only prints the parsed roster.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

  Extended the `tools/drift-checks.sh` one-function-per-check shape (`bad=` accumulator, `n` counter, `VACUOUS` floor, header title line) and the self-test's CASES entry + isolated-fixture `describe` (the `brand_casing` shape from CORE-863, here with `beforeEach` since cases mutate different files). New sub-shape justified: the check cuts `install.sh`'s functions out by name and `eval`s them, so the installer stays the single owner of the parse; `pair_t`'s "copy of pair_h's" alternative would leave a second copy to drift.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

  No refactor. Pre-existing shellcheck infos elsewhere in `drift-checks.sh` left alone (the file is not shellcheck-gated).

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `installer_anchors` (after `sidequest_orphan`): evals `say`, `is_flaitron_tree`, `agent_snippet`, `agent_dir`, `wire_project` from `install.sh` (ANCHOR UNREAD if one is missing, unparsable, or not defined after eval); calls `is_flaitron_tree .`; for each agent in (agents `agent_snippet` maps ∪ dirs with a snippet on disk) runs `wire_project` in a temp dir whose `.flaitron/core` links to the checkout, with `die`/`mkdir`/`link_one`/`report_dangling` stubbed, so an empty roster or a missing snippet reports `install.sh`'s own `die` text; reads the ft-adopt marker literal off `install.sh`'s grep line (exactly one) and greps ft-adopt for it. Temp dir removed by an EXIT trap.
- Self-test: CASES seed renames the marker in ft-adopt; `installer anchor matching` fixture covers both heading casings accepted, a bad line 1, a roster the awk drops, an unmapped snippet, a deleted mapped snippet, a second marker grep, a missing marker, and a renamed `wire_project`.
- `docs/CONVENTIONS.md` §"GitHub Actions CI": "Three checks have neither…" → four, with the new entry; script header list updated to match.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no rendered surface (shell check + node test + one doc line), so no ask and no park.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Scope guardrails (both Phase 3 entries): paths `docs/CONVENTIONS.md`, `tools/drift-checks.sh`, `tools/drift-checks.test.mjs` + this note — all in `touches:`; size 1+1 / 60+3 / 75+1 = 141 lines < 400.

Receipt (final run, after review fixes):

- `bash tools/drift-checks.sh installer_anchors` → 0
- `node --test tools/drift-checks.test.mjs` → 0 (36 pass, 0 fail)
- `grep -q installer_anchors docs/CONVENTIONS.md` → 0
- `bash tools/drift-checks.sh` → 0 (22 `ok`, `installer_anchors` included)
- `just check` → 0 (full validation set: viz 647 tests pass + typecheck + lint + build; `update-adopters` 122 pass + both `node --check`; drift self-test; drift checks). `just check` reaches `test`/`typecheck`/`lint` (`just --show check`), so no extra recipe.
- `shellcheck tools/drift-checks.sh` → no finding on the new lines (two eval false positives annotated `SC2034,SC2329`); the file's pre-existing infos are outside scope and not gated.

External review — `/code-review medium` over this task's uncommitted diff only. Five notes, no blockers; all fixed:

| # | Finding | Grade | Disposition |
|---|---|---|---|
| 1 | Glob-only agent loop misses a deleted/renamed snippet that `install.sh` still maps | note | fixed: loop over mapped ∪ on-disk agents; test "deleted snippet" |
| 2 | Marker sed could return two lines, and `grep -q` passes on either | note | fixed: require exactly one; test "second marker grep" |
| 3 | Temp dir leaks on an early exit | note | fixed: `trap … EXIT` |
| 4 | CONVENTIONS list had a stray "and" | note | fixed |
| 5 | Function cut assumes column-0 `}`; a cut could leave a partial/unparsable body | note | fixed in part: eval failure or undefined function → ANCHOR UNREAD; column-0 `}` documented as `install.sh`'s shape |

Duplication / dead code / stale docs: none — the check restates no parse, and the one doc naming the no-rule checks is updated.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  `docs/CONVENTIONS.md` **changed** (in scope): the no-rule/no-catalogue list names `installer_anchors`. `AGENTS.md` no change (§"Validation" says the `drift` job runs every check, "among others"). `README.md`, `SPEC.md`, `SPEC/epic.md`, `SPEC/gate-postures.md`, `SPEC/loop.md`, `SPEC/scope-boundaries.md`, `PLAN.md`, `CONTRIBUTING.md`, `SECURITY.md`, the four `*/AGENTS-snippet.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md`, `docs/DOC-DRIFT-SWEEP.md`, `docs/EXTERNAL-AGENTS.md`, `docs/MIGRATION.md`, `docs/PLATFORMS.md`, `docs/VISION.md`, `docs/WORKTREES.md`: no change — none enumerates drift checks or counts them. Out-of-scope drift: none, so nothing filed.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  `N/A` — the "run the owner's code, don't restate it" choice is recorded in the check's own header comment, where the next editor of it reads.

**Final Summary:**

Added `installer_anchors` to `tools/drift-checks.sh`. It runs `install.sh`'s own `is_flaitron_tree` and `wire_project` against HEAD: `SPEC.md` line 1, a non-empty `ln -s` roster for every agent the installer maps or that has a snippet, and the ft-adopt `Installer exception` marker, whose literal it reads off `install.sh`. An edit to any of those texts now fails the CI `drift` job instead of the next real install. A reshaped installer fails as `ANCHOR UNREAD`, never as a silent pass. The self-test has the seeded case plus an eight-test fixture. `docs/CONVENTIONS.md` and the script header list it among the checks with no source rule or catalogue entry, since it runs in CI only and is not in the `/ft-release` §7.1 walk (CORE-868.3 owns the release side). The External review returned five notes, all fixed. `just check` → 0. `touches:` reconciled: the three declared paths changed, plus this note and PLAN.md. Maintainability: the check copies no parse logic, so it cannot drift from the installer. No refactor. No deferred operator step, so nothing filed (`unattended-candidates:` n/a, no filing ran).

**Archived:** 2026-11-06
