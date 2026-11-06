---
title: release-installs-new-tag
status: completed
tags: [installer, release, ci]
created: 2026-11-06
due:
related-tasks: [CORE-EPIC-868, CORE-868.2, CORE-851, CORE-855]
touches:
  - claude/skills/ft-release/SKILL.md
  - .github/workflows/install-test.yml
  - docs/CONVENTIONS.md
---

# CORE-868.3 | release-installs-new-tag

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-868]]

## 🎯 Goal

Have `/ft-release` prove the advertised installer URL once the tag and GitHub Release are live, by running the tag's `tools/install.test.sh` against the file that URL serves and printing the result, and make `install-test.yml` runnable by hand.

## ✅ Acceptance

- [x] `/ft-release` Step 8 carries an `Install:` line (flag-don't-block, beside the `CI:` line): read the URL from `git show vA.B.C:README.md`, fetch it, `cmp` against `git show vA.B.C:install.sh`, run the tag's `install.test.sh` against it, pass only when it exits 0 and printed `pin is latest (vA.B.C)`; push-go No prints `Install: not pushed` — `grep -q '^- \*\*Install line' claude/skills/ft-release/SKILL.md && grep -q 'Install: not pushed' claude/skills/ft-release/SKILL.md && grep -q 'git show vA.B.C:tools/install.test.sh' claude/skills/ft-release/SKILL.md`
- [x] `install-test.yml` has `workflow_dispatch`, and its filters keep the anchor files out (re-scoped in Phase 3, see Testing Notes) — `grep -q '^  workflow_dispatch:' .github/workflows/install-test.yml && ! grep -qE '^      - (SPEC.md|"\*/AGENTS-snippet.md"|claude/skills/ft-adopt/SKILL.md)$' .github/workflows/install-test.yml`
- [x] Workflow YAML still parses — `ruby -ryaml -e 'YAML.load_file(".github/workflows/install-test.yml")'`
- [x] `docs/CONVENTIONS.md` names the manual trigger and why the anchors stay out of the filter — `grep -q 'workflow_dispatch' docs/CONVENTIONS.md && grep -q 'installer_anchors' docs/CONVENTIONS.md`
- [x] Context budgets hold and every drift check passes — `bash tools/drift-checks.sh`
- [x] Full validation set green — `just check`

## 🧩 Subtasks

- [x] Add the `Install:` bullet to `claude/skills/ft-release/SKILL.md` Step 8, after the Release-commit CI line
- [x] Add `workflow_dispatch` to `.github/workflows/install-test.yml` (anchor paths added, then dropped after review)
- [x] Update `docs/CONVENTIONS.md` §"GitHub Actions CI" install-test paragraph
- [x] Run acceptance commands + `just check`; dry-run the Step 8 block against v8.3.0

## 🔗 Related

- [[CORE-EPIC-868]] — parent epic (gate-blind-spots)
- [[CORE-868.2]] — sibling: `installer_anchors` drift check, which binds the anchor texts at HEAD
- [[CORE-851]] — shipped `install.sh`, `install-test.yml`, and the README tag-URL release edit
- [[CORE-855]] — v8.3.0 cut that checked the live install by hand post-push (precedent for this step)
- [[CORE-863]] — added the lowercase-heading checks that make HEAD's test fail on v8.3.0's installer (why the step runs the tag's test)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Nothing in `/ft-release` runs the installer after the tag lands; CORE-855 did it by hand once. `install-test.yml` has no manual trigger.

- [x] Read relevant source files — `claude/skills/ft-release/SKILL.md` §5 item 4 (README URL edit), §7.5 (commit/tag/push/`gh release create --latest`), §8 (🏁 marker, `CI:` line); `.github/workflows/install-test.yml`; `tools/install.test.sh` (header, `LATEST` from installer output, `check "pin is latest ($LATEST)"`); `install.sh` (`REPO_URL`, `RELEASES_API`); `docs/CONVENTIONS.md:64`; `tools/drift-checks.sh:303-306`; `SECURITY.md:185`; `docs/CONTEXT-BUDGET.md` ft-release rows.

- [x] **Best Practices Review** — doc + workflow change. The new step reuses `tools/install.test.sh` unchanged: its `ok   pin is latest (vX)` line already names the version it resolved, so the release step greps that instead of adding a version argument to the test.

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`). `install.test.sh` hits: CORE-851, 855, 861, 863. Load-bearing: CORE-851 put the network e2e in a separate path-filtered workflow so it never joins `validate`; the README URL 404s until the tag is pushed. CORE-855 verified "install-test.yml green on ubuntu + macOS; installer one-liner" post-push by hand.

- [x] **Drift check** — PLAN row matches the epic filing; anchor set matches CORE-868.2's (`SPEC.md` line 1, `*/AGENTS-snippet.md`, `claude/skills/ft-adopt/SKILL.md`). `install.test.sh` resolves "latest" through `releases/latest` (or highest ls-remote tag), so the step must run after `gh release create --latest`, i.e. in Step 8, not §7.5. No `.1` note, no Fan-out to echo. Budget: SKILL.md 37,336 / 40,000; directory 106,845 / 113,000.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Asked. Operator chose: (1) record as a Step 8 `Install:` line, flag-don't-block, nothing committed; (2) run the test against the file fetched from the README URL, after a `cmp` with `git show vA.B.C:install.sh`. Assumption: `SECURITY.md:185` (posture only) needs no change.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- The glob `*/AGENTS-snippet.md` must be quoted in YAML (a leading `*` is an alias). Moot after the re-scope.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

  Extended Step 8's Release-commit CI line shape: one flag-don't-block status line under the 🏁 marker, a `sh` block, pass/fail/not-pushed spellings. `workflow_dispatch` is the stock GitHub trigger; no new shape.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

  No refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

  `N/A` — no code; the Step 8 block was dry-run end to end against v8.3.0 instead (Testing Notes).

**Implementation Notes:**

- Step 8 `Install line` bullet, after the `CI:` line: `S=$(mktemp -d)`; URL read from the tag's README (`grep -o 'https://raw[^ ]*/vA.B.C/install.sh'`, so a missed §5 README edit fails the step); `curl` + `cmp` with the tag's `install.sh`; the **tag's** `install.test.sh` (written to `$S/t.sh`) run against the fetched file; `grep -qxF 'ok   pin is latest (vA.B.C)'`. FAIL lines from `$S/o` go on the `Install: FAIL` line; one rerun on a green test that missed the pin (API lag).
- `install-test.yml`: `workflow_dispatch:`; header comment says why the anchor texts stay out of the filter.
- `docs/CONVENTIONS.md` install-test paragraph: manual trigger, the anchors-out rationale, and the Step 8 rerun.
- Budget: trimmed the bullet hard. Directory row ends at 107,497 / 113,000, 147 bytes over the non-failing 95% `NEAR CAP` line; the operator accepted that. Body 37,988 / 40,000.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — `N/A`: no rendered surface (one skill bullet, one workflow trigger, one doc paragraph).

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final run):

- Acceptance 1 grep chain → 0
- Acceptance 2 grep chain → 0
- `ruby -ryaml -e 'YAML.load_file(".github/workflows/install-test.yml")'` → 0 (triggers `push`, `pull_request`, `workflow_dispatch`; paths are the original three)
- Acceptance 4 grep chain → 0
- `bash tools/drift-checks.sh` → 0 (every check `ok`; one non-failing `NEAR CAP claude/skills/ft-release/**` line, accepted)
- `just check` → 0
- Dry run of the Step 8 block at `v8.3.0` (the current latest release): URL extracted once, fetch + `cmp` → 0, `pin is latest (v8.3.0)` present. First run used HEAD's `tools/install.test.sh` → 1 (`FAIL flaitron repo (lowercase heading) refused` ×2: CORE-863's checks postdate v8.3.0's installer). Rerun with `git show v8.3.0:tools/install.test.sh` → 0, 77 `ok`, 0 `FAIL`. So the block now runs the tag's test.

External review — `/code-review medium` over this task's uncommitted diff only. Eight notes, no blockers:

| # | Finding | Grade | Disposition |
|---|---|---|---|
| 1 | Acceptance grep named the bullet's old title | note | fixed: grep now `^- \*\*Install line` |
| 2 | Anchor paths in the filter trigger a run that installs the *released* tag, so it never tests the edit (and every `SPEC.md` edit costs a networked run) | note | fixed by operator decision: paths dropped, `workflow_dispatch` kept, PLAN row rewritten, rationale in workflow + CONVENTIONS |
| 3 | CONVENTIONS / drift-check comment overstated what the anchor triggers cover | note | fixed with #2: drift-check comment reverted (accurate again), CONVENTIONS says the anchors stay out and why |
| 4 | Hardcoded URL would pass with a missed §5 README edit | note | fixed: URL read from `git show vA.B.C:README.md` |
| 5 | `$S` undefined and unquoted | note | fixed: `S=$(mktemp -d)`, quoted |
| 6 | `releases/latest` may lag right after `gh release create` | note | fixed: one rerun when the test is green but missed the pin |
| 7 | FAIL line gave no cause | note | fixed: the `$S/o` FAIL lines go on the line |
| 8 | Working-tree test ≠ the tag's test | note | fixed: the dry run proved it (2 FAILs at v8.3.0); the block runs the tag's test |

Re-scope (Phase 3, operator-confirmed): the PLAN row's "add the anchor files' paths to `install-test.yml`'s filter" is dropped. Downstream-impact scan: only this row cited it (the archived CORE-868.2 Related line is historical, left as is).

Duplication / dead code / stale docs: none. The drift-check header is back to its original, accurate text.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

  `docs/CONVENTIONS.md` **changed** (in scope). `AGENTS.md` no change (`:70` and `:138` still say "path-filtered", still true). `README.md:337`, `SECURITY.md:185` (posture: `contents: read` + pinned checkout, unchanged), `SPEC/layout.md:50`: no change. `docs/CONTEXT-BUDGET.md`: no change (its per-skill figures are a release-time re-measure, `:127`). `SPEC.md`, the `SPEC/` modules, the four `*/AGENTS-snippet.md`, `CONTRIBUTING.md`, `docs/MIGRATION.md`, `docs/PLATFORMS.md`, `docs/AGENT-COMPAT.md`: no change, since none describes the release Step 8 lines or the install-test triggers. Out-of-scope drift: none.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

  `N/A`. The one surprise (HEAD's test fails an older tag's installer) is now encoded in the step itself.

**Final Summary:**

`/ft-release` Step 8 gains an `Install:` line, printed under `CI:` once the release is published. It reads the installer URL from the tag's README, fetches it, byte-compares it with the tag's `install.sh`, and runs the tag's own `install.test.sh` against it, passing only when the run is green and pinned `vA.B.C`. Like the `CI:` line, it flags and does not block. `install-test.yml` gains `workflow_dispatch`. The PLAN row also asked for the anchor files in its path filter. Review showed that run installs the released tag, so it can never test an anchor edit, and the operator dropped it; `installer_anchors` already covers them at HEAD. A dry run of the block at v8.3.0 passes (77 ok), and that run is why the block uses the tag's test: HEAD's test fails v8.3.0's installer. All 8 review notes were fixed. `just check` → 0. `touches:` reconciled: the three declared paths changed, plus PLAN.md and this note (`tools/drift-checks.sh` edited then reverted, so dropped). Maintainability: no new script; one bullet reuses the existing test, at the cost of `ft-release/**` sitting just past 95% of its budget (accepted).

**Archived:** 2026-11-06
