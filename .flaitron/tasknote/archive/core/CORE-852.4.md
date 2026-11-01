---
title: follow-through-commit-contract
status: completed
tags: [fleet, pin-bump, updater]
created: 2026-10-31
due:
related-tasks: [CORE-EPIC-852, CORE-852.1, CORE-852.3, CORE-852.5, CORE-490.3, CORE-419.3]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - SECURITY.md
  - docs/MIGRATION.md
blocked-by:
  - CORE-852.3
supersedes:
  - CORE-490.3
---

# CORE-852.4 | follow-through-commit-contract

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-852]] [[CORE-852.1]] [[CORE-852.3]] [[CORE-852.5]] [[CORE-490.3]] [[CORE-419.3]]

## 🎯 Goal

Give `applyBump` natabula `wave-bump.sh`'s follow-through — dirty-tracked skip, `Pinned to:` line, AGENTS.md `## Workflow` replace, `--trailer` — and replace the `--no-verify` gitlink-only commit with a named-path commit that runs hooks and rolls back every written path on any failure.

## ✅ Acceptance

- [x] An adopter with a modified tracked file (outside the submodule entry) is skipped `dirty tracked files`; a dirty submodule worktree still reports its own reason — `node --test tools/update-adopters.test.mjs`
- [x] `--apply` rewrites every `Pinned to: vX.Y.Z` in `.flaitron/tasknote/README.md` to the target and commits it; no line (or a symlinked README) → untouched — `node --test tools/update-adopters.test.mjs`
- [x] `--apply` replaces AGENTS.md's single `## Workflow` section with the target `claude/AGENTS-snippet.md` paste block; a symlinked AGENTS.md or more than one `## Workflow` heading → untouched, skip note on the ⬆ line — `node --test tools/update-adopters.test.mjs`
- [x] `--trailer <line>` (one value, non-empty) lands as its own paragraph in the bump commit message — `node --test tools/update-adopters.test.mjs`
- [x] The commit names only the paths this run wrote and runs hooks: `grep -c -- "'--no-verify'" tools/update-adopters.mjs` prints `0`; a rejecting `pre-commit` hook yields ✗ carrying the hook's first output line and exit 1 — `node --test tools/update-adopters.test.mjs`
- [x] Any failure after the checkout restores README/AGENTS.md bytes, the submodule SHA and the index, with HEAD unmoved — `node --test tools/update-adopters.test.mjs`
- [x] Hook-based failure fixtures use `pre-commit` (the hook now in reach), not the `prepare-commit-msg` workaround — `grep -c prepare-commit-msg tools/update-adopters.test.mjs` prints `0`
- [x] Header comment, `SECURITY.md` and `docs/MIGRATION.md` describe the new commit contract (no `--no-verify` claim left) — `grep -c 'no-verify' SECURITY.md` prints `1` (the "never" sentence) and `judgment` on the header prose
- [x] Syntax + drift — `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs && bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] `parseArgs`: `--trailer <line>` (single, non-empty); USAGE + header usage lines
- [x] `checkAdopter`: dirty-tracked gate after the staged-index gate, excluding the submodule's own entry (its gate keeps its reason)
- [x] `applyBump`: follow-through after `checkoutVerified` — pin line, Workflow block — capturing original bytes per written path; returns change/skip notes
- [x] Commit: `--literal-pathspecs commit -m <subject> [-m <trailer>] -- <written paths>`, no `--no-verify`; failure message = first hook/stderr line
- [x] Rollback: restore written bytes, submodule SHA, unstage every staged path; residue appended
- [x] `reportResult`: carry notes on the ⬆ line; thread `--trailer` through `main`
- [x] Header: rewrite the `--no-verify` and rollback paragraphs; follow-through + dirty gate in the gate list
- [x] Tests: rework the three hook fixtures to `pre-commit`; new cases for each Acceptance row
- [x] `SECURITY.md`: replace the `--no-verify` bullet; note the README/AGENTS.md writes

## 🔗 Related

- [[CORE-EPIC-852]] — parent epic
- [[CORE-852.1]] — Discovery; locked the commit rule (hooks run, full rollback) and the Workflow-block guard
- [[CORE-852.3]] — predecessor (sequential); per-adopter `subPath` the writes build on
- [[CORE-852.5]] — follow-up (sequential); wiring + prune land inside this task's rollback window
- [[CORE-490.3]] — superseded: `--no-verify` justified as a pure gitlink move, no longer true
- [[CORE-419.3]] — rollback window this widens

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.3` landed the selection gates and the per-adopter `subPath`; the follow-through and commit contract are the next unported block of the `.1` matrix, and `.5`'s link writes need this task's widened rollback window to land in.

- [x] Read relevant source files — `tools/update-adopters.mjs` (all 1142 lines), `tools/update-adopters.test.mjs` (fixtures, hook tests, rollback group), natabula `scripts/wave-bump.sh` (`follow_through`, apply loop, header), `claude/AGENTS-snippet.md` (paste-block fence), `SECURITY.md` §"Fleet updater".

- [x] **Best Practices Review** — `applyBump` keeps one try/rollback window; follow-through goes inside it after `checkoutVerified` (the snippet is read from the checked-out target). Original bytes are captured in memory per written path so rollback does not depend on git state. Gates stay inline in `checkAdopter` (CORE-479). No fleet knowledge enters: the README path and Workflow heading are flaitron's own adopter layout, `--trailer` is caller-supplied.

- [x] **Archive skim** — `.1`'s skim covers this file (CORE-490.3, CORE-419.3, CORE-827, CORE-486, CORE-479). Load-bearing here: CORE-490.3's three hook fixtures use `prepare-commit-msg` only because `--no-verify` skipped `pre-commit`; CORE-419.3 pins the rollback assertions (submodule SHA, empty index, HEAD unmoved); `.3`'s doc-drift sweep left `SECURITY.md`'s `--no-verify` bullet saying "flaitron submodule gitlink".

- [x] **Drift check** — PLAN line matches the `.1` locked decisions. Code drift: none against the line. Doc drift found: `SECURITY.md:226-230` asserts the `--no-verify` contract this task removes, and its "Literal pathspecs" bullet says the commit cannot widen "beyond the gitlink" — both updated here. W's own behaviour to mirror: pin regex `Pinned to: v\d+.\d+.\d+` (first per line), Workflow replace from the `## Workflow` line to the next `## ` heading with a blank line kept before it, body = the ```` ```markdown ```` fence after `## Block to paste into AGENTS.md`, skip when that body does not open with `## Workflow`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (1) `--trailer` takes one value, as W does (the wrapper passes one); (2) dry-run stays as today — W's dry run does not preview follow-through either; (3) the dirty gate ignores the submodule's own porcelain entry so the existing `dirty <subPath> worktree` reason survives; (4) a symlinked tasknote README is skipped like a symlinked AGENTS.md — a write would land outside the repo while `git add` stages only the link (small guard beyond W); (5) a successful bump's ⬆ line lists the follow-through notes, W-style (`pin line`, `workflow block`, `workflow skipped (…)`).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Commit-failure message: git sends hook stdout to stderr, so `gitErrorLine(e)` (first stderr line) is the hook's first line.
- `git commit -m A -m B` joins paragraphs with a blank line — W's `printf '%s\n\n%s'` shape without a shell.
- Pathspec commit (`-- paths`) commits exactly the named paths' worktree state, which equals what was staged; unrelated untracked files stay out (existing `bumps pin + pathspec commit only` test keeps holding).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `applyBump`'s single try/rollback window (CORE-419.3), the inline gate shape in `checkAdopter` (CORE-479), `parseArgs`' `takeValue` + non-empty check (CORE-419.4, `.3`'s `--only`/`--branch` branch), and the existing fixture groups (`makeAdopter`, `runCli`)

- [x] **Minimal refactor gate** — `rollbackBump`'s boolean `staged` became a `{ written, staged }` context (Acceptance: rollback must cover every written path); the three hook fixtures' inline hook setup folded into `installHook` since all three were rewritten anyway. Nothing else touched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `tools/update-adopters.mjs`: `--trailer` (single, non-empty) → `args.trailer`, threaded `main` → `reportResult` → `applyBump(…, { trailer })` as a second `-m` paragraph. New dirty-tracked gate after the staged-index gate (`status --porcelain -z --untracked-files=no`, the `subPath` entry filtered out so the submodule gate keeps its reason; up to 3 paths shown). New `followThrough()` inside the rollback window after `checkoutVerified` + gitlink add: pin line (`rewritePinLines`), then Workflow block (`workflowPasteBlock` read via `git show <latest>:claude/AGENTS-snippet.md` from FLAITRON_REPO — immune to an adopter's sparse checkout — and `replaceWorkflowSection`); each changed file's prior bytes go into `ctx.written` before the write and its path into `ctx.staged` before `git add`. Commit = `--literal-pathspecs commit --quiet -m … [-m trailer] -- <ctx.staged>`, no `--no-verify`; a failure rethrows as `commit failed (hook?) — <first stderr line>`. `rollbackBump` writes bytes back, checks out `priorSha`, resets every staged path. `applyBump` returns the notes; the ⬆ line prints them after `committed —`.
- Header: new "Follow-through" and "Commit contract" paragraphs; "Mid-bump rollback" widened; dirty-tracked gate added to the gate list and the gate-count comment (twelve → thirteen). The "Not covered" paragraph is `.5`'s.
- `tools/update-adopters.test.mjs`: `DEFAULT_ARGS.trailer`; `--trailer` parse + valueless cases; dirty-tracked skip; pure tests for the three text helpers; apply cases for the full follow-through (+ `--trailer`, exact message body) and the three skip guards; "bumps past a rejecting pre-commit hook (--no-verify)" inverted to "runs the adopter pre-commit hook"; mid-fleet failure and commit-fail rollback reworked to `pre-commit`, now asserting the hook's first line and restored README/AGENTS.md bytes.
- `SECURITY.md` §"Fleet updater": intro names the follow-through writes; the `--no-verify` bullet replaced by "Bump commits run the adopter's hooks" (trust note + rollback); literal-pathspecs bullet → "beyond the paths the run wrote".
- Deliberate deviations from W (after review): exact `## Workflow` heading match, section end at H1 or H2, and a parent-directory symlink guard. Parity in `.7` compares repo plans, not file bytes, so none affects it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `node --check` on both files (the tool has no linter config; zero-dep plain Node)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: no frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test tools/update-adopters.test.mjs` → exit 0, 113/113 pass (18 suites). The seven `(CORE-852.4)` cases plus the reworked "runs the adopter pre-commit hook" and "mid-fleet bump failure" cases confirmed by a `--test-name-pattern` re-run → all ✔.
- `grep -c -- "'--no-verify'" tools/update-adopters.mjs` → prints `0`
- `grep -c prepare-commit-msg tools/update-adopters.test.mjs` → prints `0`
- `grep -c 'no-verify' SECURITY.md` → prints `1` ("The script never passes `--no-verify`"); header prose re-read — no stale gitlink-only / `--no-verify` claim (`grep -nE 'only the (submodule )?gitlink|pure (pin|gitlink) move'` hits only the "CORE-490.3 skipped … when the commit was a pure gitlink move" history line)
- `node --check tools/update-adopters.mjs && node --check tools/update-adopters.test.mjs` → exit 0
- `bash tools/drift-checks.sh` → exit 0, every check `ok`
- Structural: no duplication (the three text helpers are single-use but exported for pure tests, same as `formatSkillsNote`); no dead code (`rollbackBump`'s old boolean path removed with its only caller).

**External review** (`/code-review medium`, scoped to the uncommitted working-tree diff of the three files) → 10 findings:

| # | Finding | Rung | Disposition |
|---|---|---|---|
| 4 | `^## Workflow` prefix match replaces a project's own `## Workflows (CI)` section | **blocker** (Acceptance row 3) | fixed: exact heading `^## Workflow[ \t]*\r?$`; test "a project's own ## Workflows… heading" |
| 3 | Section end ignores a following H1 (and a `## ` inside a fence) | **blocker** for the H1 half | fixed: section ends at `^#{1,2} `; H1 case in the helper test. Fence half → note, not fixed: neither the snippet block nor W handles it, and no adopter Workflow section carries a fence |
| 5 | Symlinked parent dir (`.flaitron/tasknote`) still sends the write outside | **blocker** (SECURITY.md claim) | fixed: `fileKind` also requires `realpath(file) === realpath(repo)/path`; `dir-linked` fixture |
| 1 | Hooks inherit an open stdin pipe — a reading hook hangs the sweep | note | fixed: `git()` ends the child's stdin; the hook test now `cat`s stdin (an open pipe was confirmed to hang `cat` until killed) |
| 2 | Hook output >1 MB trips execFile `maxBuffer` mid-commit | note | fixed: 64 MB `maxBuffer` on the commit call |
| 6, 10 | `git show` of the snippet fails the bump; re-read per adopter | note | fixed: `cachedWorkflowBlock(tag)` (one read per sweep, failure → "snippet block not found" note) |
| 7 | Formatter hooks + pathspec commit can diverge from what was written | note | not fixed: git's `--only` temp-index behaviour, and the locked "named paths" rule; the result is a visible dirty file, not a lost one |
| 8 | Dirty-gate `subPath` compare is not normalized | note | no change: `declaredSubmodulePaths` already normalizes and strips trailing `/`; rename entries are caught by the staged gate first |
| 9 | CRLF / non-UTF-8 files decoded as UTF-8 | note | not fixed: same as W's awk; markdown in these two files is UTF-8/LF in practice |

Phase 3 re-run after the fixes: `node --check` both → 0 · `node --test tools/update-adopters.test.mjs` → exit 0, 114/114 · the three `grep -c` receipts → `0` / `0` / `1` · `bash tools/drift-checks.sh` → exit 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md` no change (names the tool, not its contract) · `AGENTS.md` no change (validation commands unchanged) · `SPEC.md` no change (carve-out wording is `.6`'s) · `docs/MIGRATION.md` **updated** — one sentence on the dirty-tracked skip, the pin-line and Workflow follow-through, hooks running, and rollback · `claude/` `codex/` `cursor/` `grok/` `AGENTS-snippet.md` no change (the paste block is read, not edited) · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` **updated** (Implementation Notes) · `docs/AGENT-NEUTRALITY.md` `docs/PLATFORMS.md` `claude/CAPABILITIES.md` `docs/AGENT-COMPAT.md` `docs/EXTERNAL-AGENTS.md` `docs/WORKTREES.md` `docs/VISION.md` no change (no updater-contract content)

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A: the open-stdin hang is a code comment in `git()`, where the next hook-running call will see it

**Final Summary:**

`applyBump` now carries natabula `wave-bump.sh`'s follow-through. Bumps skip a repo with modified tracked files. They rewrite `Pinned to:` lines in the tasknote README and replace AGENTS.md's single `## Workflow` section with the target's paste block (skipped, with a note, behind any symlink or on a doubled heading). The commit names only the paths written, with `--trailer` as an optional second paragraph. It runs the adopter's hooks; CORE-490.3's `--no-verify` is gone. Any failure restores file bytes, the submodule and the index, and the ✗ line carries the hook's first output line. External review raised three blockers (prefix heading match, H1 section end, parent-dir symlink) and three cheap notes (open stdin hang, `maxBuffer`, per-adopter snippet read); all six were fixed with regression tests, and four notes were recorded without change.

- **Changed files:** `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs`, `SECURITY.md`, `docs/MIGRATION.md`, `.flaitron/PLAN.md` (stub), this note (archived).
- **Verification:** 114/114 tests; `node --check` ×2; Acceptance greps `0`/`0`/`1`; drift checks exit 0 — receipt in Testing Notes.
- **Refactors:** `rollbackBump(…, staged:boolean)` → `{ written, staged }` context; `installHook` test helper for the three reworked hook fixtures.
- **Doc verdict:** `SECURITY.md`, `docs/MIGRATION.md` updated; rest no change.
- **`touches:` reconciliation:** declared `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs`, `SECURITY.md`; diff adds `docs/MIGRATION.md` (doc-drift sweep, added to `touches:`) and the workflow bookkeeping (PLAN + note).
- **Maintainability:** one engine now owns the commit contract `.5`'s link writes slot into (`ctx.written`/`ctx.staged` already cover any path they add); the three W deviations are named in Implementation Notes so `.7`'s parity run and NAT-494 do not mistake them for drift.

**Archived:** 2026-10-31
