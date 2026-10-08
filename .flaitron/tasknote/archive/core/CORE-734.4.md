---
title: pair-l-retire
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-734, CORE-734.2, CORE-734.3, CORE-734.N, CORE-631.2, CORE-546]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - tools/drift-checks.sh
  - SPEC/layout.md
  - claude/skills/ft-release/step-7.1-standing-checks.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - docs/CONVENTIONS.md
  - docs/CONTEXT-BUDGET.md
  - docs/AGENT-NEUTRALITY.md
  - .flaitron/PLAN.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-734.4 | pair-l-retire

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-734]] · [[CORE-734.2]] · [[CORE-734.3]] · [[CORE-734.N]] · [[CORE-631.2]] · [[CORE-546]]

## 🎯 Goal

Make `tools/drift-checks.sh` the only shell for `wrapper_name_invariant`, `shipped_skill_parity` and `context_budget`, so each of their source surfaces points at a function instead of carrying a copy. Drop the eleven `Reads:` lines, and retire Pair L, which then has nothing left to bind.

## ✅ Acceptance

- [x] No source fence remains for the three checks: the source surfaces name the function instead. Verify: `grep -q 'for f in claude/commands/ft-' SPEC/layout.md` → 1; `grep -qE '^exact=\$\(awk|^find claude/skills -mindepth' claude/skills/ft-release/step-7.1-standing-checks.md` → 1; and `grep -q 'drift-checks.sh wrapper_name_invariant' SPEC/layout.md` plus `grep -q 'drift-checks.sh shipped_skill_parity'` and `grep -q 'drift-checks.sh context_budget'` on the standing checks → 0 each
- [x] The §7.1 walk runs all three: each standing block invokes its own function, and the mirror-pairs local run adds `wrapper_name_invariant`. Verify: `grep -qF "drift-checks.sh 'pair_*' wrapper_name_invariant" claude/skills/ft-release/step-7.1-mirror-pairs.md` → 0, and each of the three invocations → 0
- [x] The eleven catalogue `Reads:` lines are gone, and no fact lived only there. Verify: `grep -c '^Reads: ' claude/skills/ft-release/step-7.1-mirror-pairs.md` → 0. Whether every dropped fact is still in its function is `judgment`, checked line by line in Phase 2.
- [x] Pair L is a retired stub shaped like G, and the letter count is unchanged. Verify: `grep -q '^\*\*Pair L — retired\.\*\*'` → 0; `grep -c '^\*\*Pair [A-Z]' claude/skills/ft-release/step-7.1-mirror-pairs.md` → 17
- [x] No live surface still claims a Pair L binding, a "copy", or a `Reads:` line. Verify: a `git grep` for `Pair L`, `Reads:` and `copy` outside the archives and VERSION-HISTORY; each remaining hit is `judgment` (history or the retired stub)
- [x] The `context_budget` design notes the fence prose carried survive as `#` comments in the function. `judgment`: compare the removed prose with the function's comments.
- [x] The tree passes and the release directory shrinks. Verify: `bash tools/drift-checks.sh` → 0; `find claude/skills/ft-release -type f -exec cat {} + | wc -c` < 120,145

## 🧩 Subtasks

- [x] `tools/drift-checks.sh`: rewrite the header (one kind of check, no Pair L). Move the `context_budget` fence's design notes into its comments. Drop the Pair L property note in `pair_n`.
- [x] `SPEC/layout.md`: replace the wrapper-name fence with a pointer to the function
- [x] `step-7.1-standing-checks.md`: shipped-skill parity and context-budget blocks invoke their function; rewrite "Lifted into the CI `drift` job" and "On the globs"
- [x] `step-7.1-mirror-pairs.md`: drop the eleven `Reads:` lines, rewrite the "Two kinds of pair" preamble, add `wrapper_name_invariant` to the local run, and replace Pair L with a retired stub
- [x] `docs/CONVENTIONS.md` §"GitHub Actions CI" and the dependency-audit paragraph; `docs/CONTEXT-BUDGET.md` §"How this is enforced"; the `docs/AGENT-NEUTRALITY.md` row
- [x] Phase 3: Acceptance greps, full drift run, external review

## 🔗 Related

- [[CORE-EPIC-734]] — parent epic (mirror-tax)
- [[CORE-734.3]] — predecessor: the census that classified Pair L as collapsible and filed this child
- [[CORE-734.2]] — predecessor: moved the drift shell into `tools/drift-checks.sh`, which made this collapse possible
- [[CORE-734.N]] — the audit that verifies 12 live Pairs, with L counted as retired
- [[CORE-631.2]] — related-decision: split the catalogue from the shell, which is where the `Reads:` lines came from
- [[CORE-546]] — related-decision: the CI-copy failure Pair L was minted for, which goes away along with the copies

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Pair L exists because two shells for one check can disagree ([[CORE-546]]). Since [[CORE-734.2]], CI and §7.1 both run the script, so if the three sources stop carrying a fence, there is only one shell left and nothing to bind. The `Reads:` lines only restate a function that `Check:` already names. The `ft-release/**` directory sits at 120,145 of its 125,000 budget, and this frees part of that.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Read set.**
  - `step-7.1-mirror-pairs.md` in full.
  - In `step-7.1-standing-checks.md`: the shipped-skill parity block (L18–25), the context-budget block, "Lifted into the CI `drift` job" and "On the globs" (L152–223, L285–297).
  - `SPEC/layout.md` §"Skill namespace" (the L82 fence) and its L48 `tools/` bullet.
  - In `tools/drift-checks.sh`: the header, the three source-copy functions, the `pair_n` and `pair_q` comments, and the dispatcher.
  - `docs/CONVENTIONS.md` L54–64, `docs/CONTEXT-BUDGET.md` §"How this is enforced", the `docs/AGENT-NEUTRALITY.md` L37 row, and `ft-release/SKILL.md` §7.1 (L280–296).
- **Live Pair L / `Reads:` surfaces** (from `git grep`, excluding the archives and VERSION-HISTORY):
  - Pair L binding claims to rewrite: the script header (L12–22) and `pair_n` (L307); mirror-pairs L9, the Pair L entry (L156–213) and the eleven `Reads:` lines; standing checks L214–223; CONVENTIONS L58, L60 and L64 (`Pairs D, F, I, K, and L`); CONTEXT-BUDGET L327.
  - History to keep: `.flaitron/tasknote/README.md` L120 (CORE-543 narrative) and Pair Q's "and Pair L took the third". Both stay true once the stub exists.
- **Best Practices Review.**
  - *Responsibility:* the script becomes the only owner of every check's shell. The SPEC and §7.1 surfaces keep only what the script cannot say: the rule (layout), and the release-time interpretation (context budget §"Known over budget", the parity meaning).
  - *Dependency direction:* CI → script ← §7.1. `SPEC/layout.md` points at the script. That is already the direction the `tools/` bullet (L48) states.
  - *Duplication:* removes three duplicated shells, eleven duplicated read lists, and the 50-line Pair L checker.
  - *Behavior gap:* the `context_budget` copy differs from the fence in one way. It loops `for f in $surface`, where the fence uses `eval "ls -d $surface"`, because the fence had to survive zsh. The script always runs under bash (its shebang and `bash -e` re-exec), so the zsh half of "On the globs" retires with the fence, and the keep-as-globs half moves into the function comment.
- **Archive skim.** `archive/core/` confirmed against the README table.
  - Read [[CORE-734.3]] (census: L is collapsible; the `Reads:` line restates the function) and [[CORE-734.2]] (script move, shape rules, bash 3.2, Pair L rebound).
  - Pair L's minting history ([[CORE-543]], [[CORE-546]], [[CORE-631.2]]) is summarized in its own entry, and that summary was used. The failure it guards is "a copy left behind by a correct source repair". With one shell there is no copy, so retiring the pair follows from the guard's own premise.
- **Drift check.**
  - The PLAN line matches the code. There are exactly three source rows and eleven catalogue rows in Pair L's shell.
  - One gap the line names: the §7.1 walk never ran `wrapper_name_invariant` at all. Only CI and the SPEC fence ran it. "The §7.1 local run invokes them" closes that gap.
  - `ft-release/SKILL.md` L288 ("opening with the local runner for the eleven pairs whose shell lives in `tools/drift-checks.sh`") stays accurate once the runner also runs one non-pair check, so it is left alone.
  - No SPEC contract is contradicted. The retirement follows the Pair G precedent.
- **Downstream-impact scan.** Not triggered. No direction-changing decision reaches beyond the task. `.5`–`.7` edit other pairs, and `.N` already counts L as retired.
- **Clarifications (AskUserQuestion, 2026-10-07).** *§7.1 local run* → **per-block calls.** The shipped-skill parity and context-budget blocks each run `bash tools/drift-checks.sh <fn>` where their judgment reads the output. The mirror-pairs runner becomes `bash tools/drift-checks.sh 'pair_*' wrapper_name_invariant`.
- **Assumptions.**
  - Shell-mechanics notes from the context-budget prose (`$exact`, the `**` arm and its ordering, keep-as-globs) become `#` comments in `context_budget()`, the convention the pair functions already follow. The release-time judgment, "Why this check exists", and the ledger refresh stay in the standing checks.
  - The `docs/CODEX-VERIFICATION.md` L255 row is a dated record and is left alone.
  - The `docs/CONTEXT-BUDGET.md` ledger numbers are refreshed at the next cut, not here.
  - No `.1` note exists, so there is no Fan-out echo.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: no new logic. The check bodies are unchanged; the drift script run below is the test.

**Implementation Notes:**

- *Pattern survey.*
  - The pair functions already show the target shape: the shell is in the script, design notes are `#` comments in the body, and the catalogue line names the function. The three source checks were moved into the same shape.
  - The retired stub copies Pair G's: what it guarded, why there is nothing left, and "The letter is kept so later pair citations stay stable."
  - Each source surface (`SPEC/layout.md`, the two standing blocks) keeps its rule and its release-time reading, and swaps its fence for a `bash tools/drift-checks.sh <fn>` line.
- *Edits.*
  - `tools/drift-checks.sh`: the header paragraph now describes one kind of check, names the three source-rule checks, and drops Pair L from the shape-rules lead.
  - `context_budget()` gained the fence prose's mechanics as comments: the `$exact` most-specific-row rule, the `/**` directory-total arm and why it is first, and the keep-as-globs note restated for bash.
  - `pair_n` lost its Pair L property note.
  - `SPEC/layout.md`: the wrapper-name fence became a pointer.
  - Standing checks: the shipped-skill parity fence became a function call (output described). The context-budget fence and its mechanics paragraph became a function call and a one-line output reading. "Lifted into the CI `drift` job" became "Also run per push by the CI `drift` job", and its Pair L sentence went. "On the globs" was deleted: its keep-as-globs half now lives in the function, and its zsh half was about the fence's `eval "ls -d"`, which no longer exists (bash runs the function; [[CORE-714]] was the zsh fix).
  - Mirror pairs: the preamble now reads "the only one", drops `Reads:` from the catalogue shape and L from the release-only list, and says the run also carries the wrapper-name invariant. The runner gained `wrapper_name_invariant`, and the expected output is now 12 `ok` lines.
  - The eleven `Reads:` lines were dropped. Each was checked for a fact that existed nowhere else, and only Pair C's had one: its `Check:` said "that link", meaning the `../../PLAN.md` named on the `Reads:` line. The link is now written into `Check:`. Pair Q's scope prose and Pair N/O's `ft-release/` exclusion are already comments in their functions.
  - Pair L's entry became the retired stub.
  - `docs/CONVENTIONS.md`: L58 now has one shell and pointers, drops L from the release-only list, says the release walk runs fourteen functions, and loses the "ships unbound — §"Pair L"" clause. L60 replaces the Pair L binding with "needs no binding", keeps the history, and adds the rule that a check's shell goes only in the script. In L64 L leaves the list. L76 (Pair P) loses "bound to its source by Pair L".
  - `docs/CONTEXT-BUDGET.md` §"How this is enforced" now describes one shell that CI and the cut both run.
  - `docs/AGENT-NEUTRALITY.md`: the wrapper-name row now says the check is the script function, not a fenced `sh` check.
- *Minimal refactor gate.*
  - Left alone because they are still accurate: `ft-release/SKILL.md` L288, the `SPEC/layout.md` L48 and `AGENTS.md` `tools/` bullets ("§7.1 pair walk"), `.flaitron/tasknote/README.md` L120 and Pair Q's "Pair L took the third" (history), and the `docs/CODEX-VERIFICATION.md` L255 dated record.
  - Out of scope and left alone: `.flaitron/sidequest/CORE-714.md` is a leftover stub for a task that is already `Completed`, and it still cites the deleted §"On the globs" in prose. Noted for the operator; not filed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — the drift script is the suite for this change (receipt below); no viz or updater code changed

- [x] Ran lint/type-check on changed code — `bash -n` and `shellcheck` on `tools/drift-checks.sh`; markdown is covered by the drift checks

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (second pass, after the review blocker was fixed):

```text
grep -q 'for f in claude/commands/ft-' SPEC/layout.md                 → 1
grep -qE '^exact=\$\(awk|^find claude/skills -mindepth' standing-checks → 1
grep -q 'drift-checks.sh wrapper_name_invariant' SPEC/layout.md        → 0
grep -q 'drift-checks.sh shipped_skill_parity' standing-checks         → 0
grep -q 'drift-checks.sh context_budget' standing-checks               → 0
grep -qF "drift-checks.sh 'pair_*' wrapper_name_invariant" mirror-pairs → 0
grep -c '^Reads: ' mirror-pairs                                        → 0
grep -q '^\*\*Pair L — retired\.\*\*' mirror-pairs                    → 0
grep -c '^\*\*Pair [A-Z]' mirror-pairs                                 → 17
bash tools/drift-checks.sh 'pair_*' wrapper_name_invariant             → 0 (12 ok)
bash tools/drift-checks.sh shipped_skill_parity / context_budget       → 0 / 0
bash tools/drift-checks.sh                                             → 0 (16 ok)
find claude/skills/ft-release -type f -exec cat {} + | wc -c            → 110,142 (< 120,145; −10,003)
bash -n tools/drift-checks.sh                                          → 0
shellcheck -f gcc tools/drift-checks.sh | wc -l                        → 13 (HEAD: 13; all pre-existing, in unchanged bodies)
git grep 'Pair L' / '^Reads:' (live surfaces)                          → history only: tasknote README L120, Pair Q, CONVENTIONS L58/L60, the stub
```

Judgment criteria:

- *No fact lived only on a `Reads:` line.* Pair C's "that link" was fixed in Phase 2. The review then found Pair R's `PLAN-ARCHIVE.md` scope, which existed nowhere else; it was fixed. The other nine pairs' read sets are in their prose or in their function comments.
- *The context-budget notes survive.* `$exact` / most-specific-row, `tr`, the `/**` arm (counted once, ordering, the find idiom shared with the ledger refresh), and the keep-as-globs exception to §"Glob-free by design" are all now comments in `context_budget()`.

External review: `/code-review medium` over the working-tree diff. It found **1 blocker** and **8 notes**.

- **Blocker, fixed.** Pair R's `Reads:` line was the only place that said the pair also scans `.flaitron/PLAN-ARCHIVE.md`. Its `Check:` line now names both files. Phase 3 re-ran from the top.
- **Notes:**
  1. Retiring L also loses the assertion that each catalogue `Check: pair_<x>` names a function that exists → **recorded** on the Pair L stub as an accepted tradeoff. The census ([[CORE-734.3]]) did not price it, so it is left for [[CORE-734.N]] to rule on. It is not filed here.
  2. `ft-release/SKILL.md` L289 said "eleven pairs" → fixed ("plus the wrapper-name invariant"). This puts a file outside `touches:` into scope; see the recap.
  3. The script header's usage line showed the §7.1 call without `wrapper_name_invariant` → fixed.
  4. The globs comment lost its §"Glob-free by design" exception link and the literal-directory `find` note → fixed.
  5. In adopters, `SPEC/layout.md`'s pointer reads as an adopter-root path → fixed ("from the flaitron repo root"). The old fence had the same assumption, since it ran `claude/commands/` from the root.
  6. Pair K's "(A … Q)" list leaves out R → not fixed: it predates this task ([[CORE-734.2]] also left it), and `.5`–`.7` touch that list's neighbours.
  7. The `/**` comment dropped "once" and the ledger-refresh idiom note → fixed.
  8. CONVENTIONS no longer states a rule for whether a new non-pair check needs a catalogue entry → same root as note 1. The two existing checks with no entry are named; the rule question goes to `.N` with note 1.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Doc-drift sweep:**
- Updated: `docs/CONVENTIONS.md` (§"GitHub Actions CI" L58/L60, the dependency-audit list L64, Pair P L76), `docs/CONTEXT-BUDGET.md` (§"How this is enforced"), `docs/AGENT-NEUTRALITY.md` (wrapper-name row), and `SPEC/*.md` (`layout.md` wrapper-name pointer). In `claude/skills/*/SKILL.md`, `ft-release` L289 was updated.
- No change: `AGENTS.md` (its `tools/` bullet, "§7.1 pair walk", is still true), `README.md`, `SPEC.md`, `SPEC/epic.md`, `SPEC/scope-boundaries.md`, `docs/MIGRATION.md`, `docs/GLOSSARY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, the four `*/AGENTS-snippet.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`, `docs/PHILOSOPHY.md`, `docs/DOGFOOD.md`, and `docs/UPGRADING.md`. None cites Pair L or a `Reads:` line.
- Release-owned: `docs/VERSION-HISTORY.md` and `.flaitron/PLAN-ARCHIVE.md`.

**Recap.** `tools/drift-checks.sh` is now the only shell for every drift check. `SPEC/layout.md` and the two standing blocks state their rule and call `bash tools/drift-checks.sh <fn>`. The context-budget mechanics moved into the function's comments. The eleven `Reads:` lines are gone, and Pair L is a retired stub like G. The §7.1 walk now also runs `wrapper_name_invariant`, which it never ran before.

- **Changed:** `tools/drift-checks.sh`, `SPEC/layout.md`, `claude/skills/ft-release/{SKILL.md,step-7.1-mirror-pairs.md,step-7.1-standing-checks.md}`, `docs/{CONVENTIONS,CONTEXT-BUDGET,AGENT-NEUTRALITY}.md`, `.flaitron/PLAN.md`, and this note.
- **Verification:** the receipt above. All checks pass on the second pass, after one review blocker was fixed.
- **Refactors:** none beyond the collapse itself.
- **`touches:` reconciliation:** `git diff --name-only` is the declared set plus `claude/skills/ft-release/SKILL.md`, which came in with review note 2 (its fragment summary named the runner's scope).
- **Maintainability:** one shell per check, so the "copy left behind" failure class ([[CORE-546]]) no longer exists. `claude/skills/ft-release/**` dropped 120,145 → 110,142 bytes, against a 125,000 budget. There is one acknowledged gap, catalogue ↔ function existence, which is recorded on the stub for `.N`.

**Learnings:** N/A. The rule "a check's shell goes only in the script" now lives in `docs/CONVENTIONS.md` §"GitHub Actions CI", which is already an AI-referenced doc.

**Archived:** 2026-10-07
