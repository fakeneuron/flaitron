---
title: drift-check-batching
status: completed
tags: [drift-checks, performance]
created: 2026-11-06
due:
related-tasks: [CORE-EPIC-869, CORE-860, CORE-610.2]
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
---

# CORE-869.2 | drift-check-batching

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-869]]

## 🎯 Goal

Replace the one-process-per-file loops in `brand_nearmiss` and `pair_p` with single-pass calls that print the same findings, so local `bash tools/drift-checks.sh` wall time at least halves.

## ✅ Acceptance

- [x] Self-test stays green — `node --test tools/drift-checks.test.mjs`
- [x] Full drift scan passes on the live tree — `bash tools/drift-checks.sh`
- [x] Same findings as before — old (HEAD) and new `brand_nearmiss` / `pair_p` print byte-identical output on a seeded copy of the tree — `diff` of the two outputs (recorded in Testing Notes)
- [x] Local wall time at least halves — `time bash tools/drift-checks.sh`, before vs after, same machine, recorded in Testing Notes
- [x] No per-file process loop left in either function — `judgment` (read the two function bodies; a loop over a handful of tracked symlinks is not a per-file loop over the tree)

## 🧩 Subtasks

- [x] Rewrite `brand_nearmiss` as a `git grep -l` prefilter plus one `grep -H`, symlinks always candidates so their findings stay identical
- [x] Rewrite `pair_p` as one awk pass over the archive glob, buffering per file so output order matches
- [x] Add a multi-file `pair_p` test (per-file state reset, stamp at end of file) and a symlink `brand_nearmiss` test
- [x] Equivalence diff old vs new on seeded copies; time before/after

## 🔗 Related

- [[CORE-EPIC-869]] — parent epic (carrying-cost).
- [[CORE-860]] — introduced `brand_nearmiss` (null-delimited read, POSIX boundaries, `grep -I`, rc handling).
- [[CORE-610.2]] — introduced `pair_p` (the `|| true` trap note).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both functions still spawn processes per file (`brand_nearmiss`: one grep per 1,567 tracked files; `pair_p`: up to five processes per each of 1,297 archived notes). Profiled per check: `brand_nearmiss` 6.7 s, `pair_p` 9.0 s, `pair_q` 4.9 s, everything else ≤ 1 s each; the full run measured 49.2 s wall before the change.

- [x] Read relevant source files — `tools/drift-checks.sh` (header shape rules, dispatcher, `brand_nearmiss`, `brand_casing`, `pair_p`), `tools/drift-checks.test.mjs` (CASES entries, brand near-miss fixture), `claude/skills/ft-release/step-7.1-mirror-pairs.md` (Pair P + brand catalogue entries), `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor".

- [x] **Best Practices Review** — shell performance work inside the existing one-function-per-check dispatcher; no new top-level function (the header forbids non-check functions), no shared helper. Semantics kept per file: the floor, first-stamp match, exact `status: completed` line, Acceptance window reset per file.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). CORE-860 (brand_nearmiss design: null-delimited paths, POSIX ERE boundary, `-I`, rc 0/1/other). CORE-863 recorded `brand_nearmiss` at 12.5 s vs `brand_casing` 1.6 s, which is already the motivating measurement. CORE-610.2's `|| true` note is about grep-in-substitution under `bash -e`; a single awk pass removes those substitutions.

- [x] **Drift check** — PLAN line, function names and test file match current code; the 811→884 line figures are 869.4's, not this task's.

- [x] No clarifications needed (--fast). Assumptions: "same findings" means the same finding lines in the same order for any tree; `BRAND SCAN ERROR` becomes one whole-scan line (per-file read errors are no longer separable), and that message's catalogue wording ("a file could not be scanned") still holds. Wall time is measured locally on this machine, before vs after.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Tracked symlink `CLAUDE.md → AGENTS.md`: the old per-file `grep` follows it and scans AGENTS.md's text under the CLAUDE.md path; `git grep` would scan the link text instead. Keep symlinks on a per-file grep (one file today) and exclude them from the `git grep` pathspec so findings stay identical.
- `git grep` reads tracked worktree files, same set as `git ls-files` + `[ -f ]`; `-I` skips binaries as `grep -I` did; `-z` keeps paths unquoted.
- Phase 1→2: Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `brand_nearmiss` keeps its own shape (null-delimited `git ls-files`, `[ -f ]`, the same ERE, rc 0/1/other, `BRAND SCAN ERROR`, `n` floor) and moves only the process boundary. `brand_casing` already prefilters with `git grep -lIiz`; the near-miss prefilter follows it. `pair_p` keeps CORE-610.2's rules verbatim, moved into one awk program. New tests follow the isolated-fixture `describe` blocks already in the file.

- [x] **Minimal refactor gate** — no refactor; the two function bodies and their design comments only, plus one header line naming `pair_p`'s in-awk counter.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `brand_nearmiss`: builtins-only path loop builds the file list; `git grep -laiz -E` (threaded) names candidates; one `grep -HnEiI` over the candidates prints `path:line:text`, prefixed by one `sed`. Candidates also include every tracked symlink (grep reads through the link, `git grep` reads the link text: `CLAUDE.md → AGENTS.md`), every path containing a newline (the newline-joined list cannot hold it), and every file when the prefilter itself fails. `-a` on the prefilter means git's binary rules can never drop a file; the final `grep -I` still skips binaries.
- A single `grep` over all 1,567 files was tried first: correct, but 2.7 s for this check alone and only a 0.53 ratio overall, short of the halving bar. The prefilter takes it to 0.6 s.
- `pair_p`: one `LC_ALL=C awk` over the glob. The stamp sits at a note's foot, so findings are buffered per note and flushed on the next `FILENAME` (and at END), keeping the old status-then-boxes order. The stamp regex spells out its repeats for mawk. Unreadable notes are filtered in the glob loop (awk would die on them; the old `grep … || true` skipped them). The stale `[[ < ]]` and `|| true` comment bullets were replaced, since neither construct remains.
- The self-test's floor rule (`VACUOUS <name>` on a line with no `#`) rejected a `${#files[@]}` floor, so `brand_nearmiss` keeps its `n` counter, as the header asks.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs

- [x] **External review** — `/code-review medium` over this task's uncommitted diff; findings recorded below

- [ ] (frontend) Asked the user for visual confirmation — N/A: no rendered surface (shell check + node test only), so no 👁️ ask and no park

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Scope guardrails (`--unattended`), run at Phase 3 entry, again after the review fixes, and after the doc-drift sweep: paths `tools/drift-checks.sh`, `tools/drift-checks.test.mjs`, both in `touches:`, plus this note; size 118 + 37 = 155 lines against the 400 cap. Clear each time.

Receipt (full validation set, `--unattended`):

- `just check` → 0 (its deps `test` / `typecheck` / `lint` / `build` for viz, then the updater suite + two `node --check`, `node --test tools/drift-checks.test.mjs`, `bash tools/drift-checks.sh`; `check` reaches every other recipe the justfile defines among test/lint/typecheck).
- `node --test tools/drift-checks.test.mjs` → 0 (38 tests, 38 pass; 36 at HEAD, plus the symlink test and the `pair_p across notes` test).
- `bash tools/drift-checks.sh` → 0 (22 `ok` lines).
- `shellcheck -f gcc tools/drift-checks.sh` → 13 findings, same as HEAD's 13; none inside the two changed functions.
- Equivalence (old HEAD script vs new, two fresh clones in a temp dir, same seeds): near misses in README, AGENTS.md read through the `CLAUDE.md` symlink, a path with spaces, a path with `"`, a tracked binary, a late-NUL file, a tracked file deleted in the worktree, an uncommitted edit; archive notes with bare + annotated + nested boxes, two Acceptance windows, Subtasks boxes, a first stamp after the boxes, a later pre-floor stamp, pre-floor, unstamped, `status: completed ` (trailing space), `status: complete`, a note without a final newline, an empty note, and an unreadable (mode 000) note. `diff` of the outputs → identical stdout, both rc 1. One addition seeded afterwards, a path containing a newline, differs only cosmetically: both report the finding and fail, but the old loop left the continuation line unprefixed and the new grep `-H` + `sed` prefixes it.
- Wall time, in-repo, HEAD script vs new, three alternating runs: old 15.76 / 16.38 / 15.28 s (mean 15.81), new 6.83 / 6.60 / 6.34 s (mean 6.59) → ratio 0.42. (A cold first run measured 49.2 s before the change; the warm alternating figures are the fair comparison.) Per check after: `brand_nearmiss` 0.6 s (was 6.7), `pair_p` 0.6 s (was 9.0); `pair_q` at 3.5 s is now the slowest.
- Mutation check on the new tests: dropping the symlink branch → symlink test fails (caught); dropping the first-stamp guard → `pair_p across notes` fails (caught); dropping `d == ""` from `flush` survives, which is an equivalent mutant (an empty date already compares below the floor).
- Per-file process loop judgment: `brand_nearmiss` spawns `git ls-files`, `git grep`, `tr`, `grep`, `sed` once each; its two `for` loops are builtins. `pair_p` spawns one `awk`; its glob loop is builtins.

External review (`/code-review medium`, eight notes, no blockers):

1. Newline in a filename breaks the candidate match → fixed (such paths are always candidates).
2. A `git grep` error stopped the check before printing findings → fixed (error is reported, every file becomes a candidate, findings still print).
3. The prefilter relied on git's binary test matching `grep -I` and on no `.gitattributes` → fixed (prefilter reads with `-a`; `grep -I` decides).
4. Altitude: one `grep` over every file would do → dismissed with a measurement: 0.53 ratio, misses the Acceptance bar; recorded in the function comment.
5. No symlink test → fixed (`reads a tracked symlink through to its target`).
6. awk dies on an unreadable note where the old loop skipped it → fixed (`[ -r ]` filter; verified in the equivalence run).
7. No test for first-stamp-wins or unstamped notes → fixed (ZZ-6, ZZ-7 in the fixture).
8. `n` duplicates `${#files[@]}` → tried, reverted: the self-test's floor rule needs the `VACUOUS` line free of `#`, and the header asks for `n`.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: no change for all 18 (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`). They name the checks and their semantics, never the loop mechanics. `docs/CONVENTIONS.md` §"Archived-tasknote integrity floor" and the catalogue's Pair P / brand entries (`step-7.1-mirror-pairs.md`, not in the set) still read true, including "`BRAND SCAN ERROR` means a file could not be scanned". Nothing out of scope to file.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A for the always-loaded layer. Tool-local: when timing drift checks, compare alternating warm runs of HEAD vs new; a cold first run (49 s here) overstates the baseline threefold.

**Final Summary:**

`brand_nearmiss` and `pair_p` in `tools/drift-checks.sh` no longer spawn processes per file. `brand_nearmiss` builds its list with builtins, prefilters with one threaded `git grep -l` (`-a`, so git's binary rules drop nothing), and prints through one `grep -H`. Tracked symlinks, newline paths, and a failed prefilter always fall through to grep, so findings are what the per-file loop printed. `pair_p` is one awk pass that buffers each note's findings until the next note starts, keeping the old order. Old-vs-new output is byte-identical on a broad seeded clone; the one cosmetic difference is the prefix on a newline filename's continuation line. Local `bash tools/drift-checks.sh` mean wall time 15.81 s → 6.59 s (ratio 0.42). Two fixture tests added (symlink read-through; multi-note `pair_p` order, reset, stamps). `just check` → 0. External review: eight notes, six fixed, one dismissed with a measurement, one tried and reverted for the floor rule. `touches:` reconciled: the two declared paths changed, plus this note and PLAN.md. Maintainability: comments carry the measurements and the symlink/binary reasoning, so a future "simplify to one grep" is answered in place. No refactor. No deferred operator step, so nothing filed (`unattended-candidates:` n/a, no filing ran). Noted, not filed: `pair_q` (3.5 s) is now the slowest check.

**Archived:** 2026-11-06
