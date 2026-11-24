---
title: roster-covers-modules
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-932]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-936 | roster-covers-modules

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-932]]

## 🎯 Goal

Add a drift check that fails when a `tools/update-adopters/*.mjs` module has no `node --check` line in AGENTS.md §"Validation" (or the roster names a module that no longer exists).

## ✅ Acceptance

- [x] A new check in `tools/drift-checks.sh` lists `tools/update-adopters/*.mjs` and diffs it against the `node --check tools/update-adopters/` lines of AGENTS.md §"Validation" — `bash tools/drift-checks.sh updater_roster` exits 0 on the live tree
- [x] A module on disk with no roster line fails with a named finding, and a roster line with no module fails too — `node --test tools/drift-checks.test.mjs` (seeded case for both)
- [x] The check fails `VACUOUS` when it reads no module or no roster line, so a moved directory or renamed heading cannot pass it — covered by the same self-test's coverage rule (case present) and read in the diff
- [x] The whole drift suite and the self-test stay green — `bash tools/drift-checks.sh` and `node --test tools/drift-checks.test.mjs`
- [x] No new `node --check` line is owed: `tools/drift-checks.test.mjs` is already in the roster; `drift-checks.sh` is run, not syntax-checked by `node` — `judgment`

## 🧩 Subtasks

- [x] Add `updater_roster` to `tools/drift-checks.sh` after `coverage_pin`, with its design comment; list it in the header's "neither a source rule nor a catalogue entry" sentence
- [x] Add its seeded case (unlisted module + stale roster line) to `CASES` in `tools/drift-checks.test.mjs`
- [x] Run the check live, the self-test, and the full drift suite

## 🔗 Related

- [[CORE-932]] — parent; its External review surfaced this gap (added the six module `node --check` lines)
- [[CORE-830]] — `pair_t`, the justfile ↔ AGENTS.md binding this check complements
- [[CORE-928]] — already tracks the stale "Six checks have neither…" list in `docs/CONVENTIONS.md`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `pair_h` binds AGENTS.md ↔ ci.yml and `pair_t` binds AGENTS.md ↔ justfile; both read the roster as plain lines, so a new module under `tools/update-adopters/` left off AGENTS.md is absent from all three surfaces and nothing notices. Live check: the eight roster lines match the six modules on disk plus the entrypoint and test. Still true as filed.

- [x] Read relevant source files — read `tools/drift-checks.sh` (header shape rules, `pair_h`, `pair_t`, `coverage_pin`, dispatcher), `tools/drift-checks.test.mjs` (`CASES`, harness), AGENTS.md §"Validation", justfile `check`, ci.yml `validate`. No probe needed.

- [x] **Best Practices Review** — the roster read is the third copy of `ssot=$(awk '/^## Validation$/,/^## Dev Server$/' AGENTS.md | grep …)` (`pair_h`, `pair_t`). It needs a narrower filter (only `node --check tools/update-adopters/` lines), so it is its own extraction and does not share a helper; `pair_t` already notes "widen one, widen the other", and this one binds to the same heading pair. Binding AGENTS.md alone covers ci.yml and the justfile transitively, via H and T.

- [x] **Archive skim** — `grep -l 'drift-checks' archive/core/*.md` hits CORE-918.2, 919.2, 924, 931.2/3/6/7, 932. Read CORE-932 (filed this) and CORE-924 (the closest precedent: `coverage_pin` and `snippet_roster_parity` — non-pair checks with no catalogue entry, a `VACUOUS` floor and a seeded case). Nothing contradicts the plan.

- [x] **Drift check** — PLAN line, stub and code agree: roster in AGENTS.md lines 105-112, six modules in `tools/update-adopters/`. Stub says `ls` diff; I use a shell glob loop (house style, bash 3.2) and report each direction as its own finding.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) the new check is a non-pair function (`updater_roster`), so no §7.1 catalogue entry — same as `coverage_pin`; (2) only direct children `tools/update-adopters/*.mjs` count (the roster has no subdirectory); (3) the entrypoint `tools/update-adopters.mjs` and the test file are out of scope, they are not under the directory; (4) the stale `docs/CONVENTIONS.md` check list is CORE-928's, not edited here.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Carried from the retired sidequest stub:

> **Idea** — `pair_h` and `pair_t` only compare AGENTS.md §"Validation", `ci.yml` and the justfile `check` recipe to each other, so a module added under `tools/update-adopters/` and left off all three passes every drift check unchecked. `node --check` reads one file per call, so a glob is no fix. Add a drift check that diffs `ls tools/update-adopters/*.mjs` against the `node --check tools/update-adopters/` lines in the AGENTS.md roster, plus a self-test seed in `tools/drift-checks.test.mjs`. Surfaced by the CORE-932 External review.
>
> **Resume anchor** — Closing CORE-932: External review notes fixed or filed; closure checks and the commit are next.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: extended the `coverage_pin` / `snippet_roster_parity` shape — a non-pair check after `coverage_pin`, a `bad=`/`n=` accumulator, a `VACUOUS` floor on each read, `bash 3.2` constructs only (`n=$((n+1))`, a heredoc loop instead of a pipe into `while`). Minimal refactor gate: none needed. `updater_roster` reads the `node --check tools/update-adopters/` lines out of AGENTS.md §"Validation" (same `## Validation` … `## Dev Server` range as `pair_h` / `pair_t`), then loops `tools/update-adopters/*.mjs`: a module with no roster line prints `UNLISTED MODULE`, a roster line with no file prints `STALE ROSTER LINE`. Binding AGENTS.md alone covers ci.yml and the justfile through `pair_h` / `pair_t`. Header comment lists the check beside the other no-source-rule checks. Seeded case in `CASES` plants one of each finding.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `bash tools/drift-checks.sh updater_roster` → 0 (`updater_roster ok`)
- `node --test tools/drift-checks.test.mjs` → 0 (49 pass, 0 fail; `updater_roster fails on its seeded drift` passes)
- `bash tools/drift-checks.sh` → 0 (no `FAILED`; `pair_q` needed the deleted sidequest stub's removal staged first — the script reads tracked files)
- `node --check tools/drift-checks.test.mjs` → 0; `shellcheck -s bash tools/drift-checks.sh` → only the two pre-existing SC2016 infos at lines 113–114
- Acceptance 3 (VACUOUS floors): judged by reading the diff — both floors print `VACUOUS updater_roster …` and `exit 1`; the self-test's coverage rule requires the case, which exists.
- Acceptance 5: `judgment` — `tools/drift-checks.test.mjs` is already on the roster; `drift-checks.sh` is bash, run by the CI `drift` job, and no `node --check` applies to it.

**External review** (`/code-review medium`, this task's diff only): 4 notes, no blocker.
- Header comment line 23 unwrapped → **fixed** (re-flowed).
- Trailing whitespace in a roster line reads as UNLISTED → **not changed**: `pair_h` compares the same lines byte-for-byte and fails first on it, and the failure is fail-safe.
- `awk` range runs to EOF if `## Dev Server` is renamed → **not changed**: it is a deliberate copy of `pair_h` / `pair_t`'s range ("widen one, widen the other"); tightening one would split them.
- Neither VACUOUS floor has its own seed → **not changed**: the self-test's rule is one seeded case per check (CORE-739.3); no other check seeds its floor.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`updater_roster` is a new drift check in `tools/drift-checks.sh`. It diffs `tools/update-adopters/*.mjs` against the `node --check tools/update-adopters/` lines in AGENTS.md §"Validation", so a module left off the roster (and therefore off ci.yml and the justfile, which `pair_h` / `pair_t` tie to AGENTS.md) now fails with `UNLISTED MODULE`, and a roster line for a deleted module fails with `STALE ROSTER LINE`. Both reads carry a `VACUOUS` floor. The self-test seeds both findings.

Doc-drift sweep: no change. `docs/CONVENTIONS.md` §"GitHub Actions CI" has a stale list of checks with no source rule; CORE-928 and CORE-929 already own that list, and `updater_roster` belongs on it when they land. `touches:` reconciled: `git diff --name-only` is `tools/drift-checks.sh` and `tools/drift-checks.test.mjs` as declared; the extras are the retired CORE-936 sidequest stub and the PLAN/tasknote closure writes. Learnings: N/A.

**Archived:** 2026-11-24
