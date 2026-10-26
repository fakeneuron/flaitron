---
title: agents-snippet-drift-pair
status: completed
tags: []
created: 2026-10-25
due:
related-tasks: []
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - claude/skills/ft-release/SKILL.md
  - AGENTS.md
  - claude/AGENTS-snippet.md
  - docs/CONVENTIONS.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-826 | agents-snippet-drift-pair

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-510]]

## 🎯 Goal

Bind the AGENTS.md ↔ claude/AGENTS-snippet.md KEEP IN SYNC trio with a drift check, so a flag, the do-not-skip sentence, or a peer-skill slug cannot change on one side only.

## ✅ Acceptance

- [x] `pair_s` in `tools/drift-checks.sh` byte-compares the `/ft-task` flags bullet and the "Do not skip phases once … not to)" sentence between `AGENTS.md` and `claude/AGENTS-snippet.md` after collapsing whitespace and stripping `.flaitron/core/`, and compares peer-skill slug sets after dropping the checkout-specific version-bump skill (`ft-release` vs `ft-update`) — `bash tools/drift-checks.sh pair_s`
- [x] `tools/drift-checks.test.mjs` has one seeded case that makes `pair_s` fail on a planted flags-text drift — `node --test tools/drift-checks.test.mjs`
- [x] `claude/skills/ft-release/step-7.1-mirror-pairs.md` has a Pair S catalogue entry (purpose, `Check: pair_s`, what a finding means) and its lifted-pair count includes S — judgment (the entry is the criterion; the count sentences in that file, `docs/CONVENTIONS.md`, and `claude/skills/ft-release/SKILL.md` stay coherent with the new pair)
- [x] Both KEEP IN SYNC guard comments name `pair_s`: `AGENTS.md` §Workflow and `claude/AGENTS-snippet.md` — judgment

## 🧩 Subtasks

- [x] Add `pair_s` (indented helpers, VACUOUS floor, three findings)
- [x] Seed one flags-text case in `tools/drift-checks.test.mjs`
- [x] Catalogue Pair S and update the pair-count sentences that name the set
- [x] Name `pair_s` in both KEEP IN SYNC guard comments

## 🔗 Related

- [[CORE-510]] — names-only roster; the flags line sits beside it
- [[CORE-516]] — `[model]` bullet is the same concept, not the same bytes, so this check does not compare it
- [[CORE-519]] — planted the do-not-skip sentence this check byte-compares

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The KEEP IN SYNC comments name the trio and nothing executes them. Pairs B, J, and M read skill frontmatter, not these two files.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Phase 1 → 2 default-skip: Proceed. The plan line is the diff. No significant deviation.
- Best practices: N/A for new module boundaries. The check extends the existing `drift-checks.sh` function shape.
- Archive skim (`archive/core/`): CORE-510 kept the roster names-only; CORE-516 kept the `[model]` bullet the same concept, not the same bytes; CORE-519 made the do-not-skip sentences match and recorded no automated check. Those three constrain the comparison. No prior check existed.
- Drift check: the live flags bullet hard-wraps in AGENTS.md and is one line in the paste block; an HTML comment sits inside the self-host list item. The plan matches that.
- Clarifications: `No clarifications needed (--fast)`. Assumptions: collapse whitespace and strip `.flaitron/core/` before the byte compare; the skip anchor is `Do not skip phases once` through `not to)".` so the guard comment's quoted phrase is not the match; peer slugs come from the self-host `peer skills:` bullet and, on the adopter side, the `Start a task with` plus `Peer skills:` bullets, dropping `ft-release` vs `ft-update`; the `[model]` bullet and the path bullets are not compared; count sentences that enumerate the pair set are updated with the new pair.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern: `pair_h`'s unified diff on a normalized line, plus `pair_r`'s `n=$((n+1))` style and a one-line VACUOUS floor. Helpers are indented so the column-0 dispatcher does not treat them as checks.
- Findings: `FLAGS DRIFT`, `NO FLAGS LINE`, `SKIP DRIFT`, `NO SKIP SENTENCE`, `SLUG DRIFT`, `NO PEER SLUGS`. `grep` under `bash -e` is `|| true`.
- The seeded case appends `--zz-drift` to the flags bullet. The harness allows one case per check, so skip and slug drifts are not separately seeded.
- Catalogue counts that name the set moved with it: eleven pairs including S, twelve `ok` lines, fourteen release-walk functions, Pair A–S.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A, no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Acceptance:

- `bash tools/drift-checks.sh pair_s` → 0 (`pair_s ok`), including after the review fixes
- `node --test tools/drift-checks.test.mjs` → 0 (20 pass, 0 fail), re-run after the review fixes → 0

Full validation set (AGENTS.md §"Validation"), plus the drift script CI runs:

- `npm --prefix viz test` → 0 (616 pass)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- `npm --prefix viz run build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (102 pass)
- `node --check tools/update-adopters.test.mjs` → 0
- `node --check tools/update-adopters.mjs` → 0
- `bash tools/drift-checks.sh` → 0 (18 checks, `pair_s ok` included)
- `bash tools/drift-checks.sh context_budget` → 0 after the catalogue wording fix

External review (read-only probe, not the author): blockers none. Notes, and what this run did with them:

- Catalogue purpose credited CORE-516 and CORE-519 with the flags bullet. Fixed: CORE-510 owns the roster, CORE-519 the skip sentence, CORE-516 the `[model]` bullet.
- The `n`-counted VACUOUS line could not run, because `n` incremented before the reads. Removed it. The floor the self-test matches is the missing-file exit, and a renamed anchor still fails as `NO FLAGS LINE` / `NO SKIP SENTENCE` / `NO PEER SLUGS`.
- The adopter slug read kept only the anchor line, so a hard-wrap would drop continuation slugs. Both sides now keep wrapped continuation lines. Live `pair_s` still matches.
- `claude/skills/ft-release/**` is under the 113,000 cap but short of one working unit. Not fixed here. Filed CORE-829.

No duplication introduced. The dead VACUOUS line from the first draft is gone.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`pair_s` now fails the drift check when the flags bullet, the do-not-skip sentence, or the peer-skill slug set drifts between the self-host guide and the adopter paste block. The `[model]` bullet stays a comment guard, as CORE-516 left it.

Verification: the receipts above, all exit 0. Refactor: none beyond the check's own helpers. Doc verdict: `docs/CONVENTIONS.md`, `AGENTS.md`, and `claude/AGENTS-snippet.md` updated; every other AI-referenced doc does not restate this pair roster (no change). `touches:` is those seven paths. The closure also edits `.flaitron/PLAN.md` and moves this note; that is the close, not a deliverable. Maintainability: one more column-0 check, one seeded case, one catalogue entry.

unattended-candidates: none

**Archived:** 2026-10-25
