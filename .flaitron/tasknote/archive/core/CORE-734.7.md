---
title: pair-h-a-narrow
status: completed
tags: []
created: 2026-10-07
due:
related-tasks: [CORE-EPIC-734, CORE-734.3, CORE-734.6, CORE-734.N]
touches:
  - docs/CONVENTIONS.md
  - .flaitron/tasknote/README.md
  - claude/skills/ft-release/SKILL.md
  - claude/skills/ft-release/step-7.1-mirror-pairs.md
  - tools/drift-checks.sh
  - README.md
---

# CORE-734.7 | pair-h-a-narrow

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-734]] · [[CORE-734.3]] · [[CORE-734.6]] · [[CORE-734.N]]

## 🎯 Goal

Collapse the prose restatements behind Pairs H and A into pointers — CONVENTIONS, the tasknote README quick commands and the `/ft-release` Step 6 fence point at `AGENTS.md` §"Validation", README's templates clause points at `SPEC/layout.md` — so `pair_h` keeps only its `ci.yml` verbatim half and `pair_a` leaves CI, with every pair count updated.

## ✅ Acceptance

- [x] CONVENTIONS, the tasknote README and the `/ft-release` Step 6 section no longer restate the seven commands — `grep -c -F 'node --check tools/update-adopters.mjs'` on each → 0 (Step 6 via the `awk` scope)
- [x] `pair_h` is the CI-verbatim half only — `grep -c 'MISSING VALIDATION CMD' tools/drift-checks.sh` → 0, and `bash tools/drift-checks.sh pair_h` → 0
- [x] `pair_a` is gone and README's templates clause points at `SPEC/layout.md` — `grep -c '^pair_a()' tools/drift-checks.sh` → 0; `grep -c 'tasknote templates (full' README.md` → 0; `grep -q 'SPEC/layout.md' <(sed -n '/^- `templates\/`/p' README.md)`
- [x] Every pair count matches ten lifted pairs — `git grep -n -i -E 'eleven|fourteen|A, B, C, H'` over live files prints no pair-count hit (judgment on residual hits)
- [x] The tree passes every drift check — `bash tools/drift-checks.sh` → 0, `'pair_*' wrapper_name_invariant` run prints eleven `ok` lines

## 🧩 Subtasks

- [x] Point CONVENTIONS §"GitHub Actions CI" (L54, L56) at `AGENTS.md` §"Validation"; fix L58's pair list and function count
- [x] Replace the tasknote README §"Project quick commands" bullets with a pointer
- [x] Replace the `/ft-release` Step 6 fence with a pointer; fix the SKILL.md "eleven pairs" line
- [x] Narrow `pair_h` to the verbatim half; drop `pair_a`; fix the script header's heredoc shape rule
- [x] Rewrite the Pair H and Pair A catalogue entries; fix the "Two kinds", `ok`-line and Pair K CI-subset counts
- [x] Point README's `templates/` bullet at `SPEC/layout.md`
- [x] Phase 3: acceptance greps, full drift run, external review

## 🔗 Related

- [[CORE-EPIC-734]] — parent epic (mirror-tax)
- [[CORE-734.3]] — census that classified H and A as collapsible (partial) and set the 10-check target
- [[CORE-734.6]] — predecessor sibling: pointer-swap shape, retired-stub wording
- [[CORE-734.N]] — audit that verifies 12 live Pairs / 10 `pair_*` checks

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** At HEAD all three H prose sites still list the seven commands verbatim and `pair_a` is still in CI; the census verdicts ([[CORE-734.3]]) hold unchanged.

- [x] Read relevant source files — broad or unknown read set: consider a **probe** (`templates/subagent-probe-template.md`)

- [x] **Best Practices Review** — code or module-boundary work: responsibilities, dependency direction, abstractions, duplication (otherwise `N/A` with reason)

- [x] **Archive skim** — grep `.flaitron/tasknote/archive/<area>/` for the paths in scope and follow Related / `supersedes` / ⚠️ pointers; more than ~3 hits → hand the reading to a **probe**; re-check `<area>` against the README table before logging "no prior tasknotes"

- [x] **Drift check** — cited paths, lines, and hypotheses match current code, **and** the plan matches its `PLAN.md` line and the SPEC (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- **Read set.** `tools/drift-checks.sh` (header, `pair_a`, `pair_h`, dispatcher); `step-7.1-mirror-pairs.md` L1–30, Pair H, Pair K; `ft-release/SKILL.md` Step 6 and L288; `docs/CONVENTIONS.md` L52–60; `.flaitron/tasknote/README.md` §"Project quick commands"; README L301; `SPEC/layout.md` L43; `ci.yml`.
- **Best Practices Review.** `AGENTS.md` §"Validation" owns the roster; `ci.yml` is the one restatement with a separate consumer (the runner), so it stays bound. `SPEC/layout.md` owns the templates roster. No behavior changes beyond two drift checks shrinking.
- **Archive skim.** `archive/core/` confirmed against the README table. `pair_a`/`pair_h` hits: [[CORE-734.2]] (script move) and [[CORE-734.3]] (census). The census already weighed Pair H's minting history (CORE-430.N F2, CORE-433.4, [[CORE-622.4]]): every miss it records was a prose mirror going stale, which a pointer removes. [[CORE-734.6]] gives the pointer-swap shape.
- **Drift check.** The PLAN line matches HEAD. Counts beyond those it names: "fourteen functions" (CONVENTIONS L58 → thirteen), "Twelve `ok` lines" (§7.1 L15 → eleven), Pair K's CI-subset list (§7.1 L99), and CONVENTIONS L58 "Pairs D and K, and Pair A's content half". The script header's "Pair H's heredoc terminator" shape rule loses its only heredoc. Left alone: `AGENTS.md` L113, CONVENTIONS L60 and the `ci.yml` comment — all describe the verbatim half, which stays. `claude/skills/ft-new-project`, `docs/MIGRATION.md` and `templates/tasknote-README.md` cite the adopter seed's "Project quick commands", not this file.
- **Downstream-impact scan.** Not triggered; `.N` already holds the 10-check target this lands.
- **No clarifications needed.** Assumptions:
  - Pair A stays live (12-pair target counts it) as a release-only pair with its content half — disk ↔ `SPEC/layout.md` — and joins D, K in the "keep their shell here" set.
  - Pair H's title becomes roster ↔ `ci.yml`; its entry records what [[CORE-734.7]] collapsed.
  - The tasknote README pointer also names `AGENTS.md` §"Dev Server", since the dropped bullets carried `run dev` and the bare in-`viz/` forms, both of which AGENTS.md states.
  - No `.1` Fan-out exists, so no YAML echo.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: two checks shrank, none gained logic; the drift run is the test

**Implementation Notes:**

- *Pattern survey.* Pointer swaps follow [[CORE-734.6]]: the source keeps the content, each former mirror names it by `§` citation (so Pair Q now guards the pointers). The narrowed entries keep the "what it guarded, who replaced it" shape of the retired stubs, but stay live.
- *Script.* `pair_a` removed. `pair_h` keeps only the `AGENTS.md` ↔ `ci.yml` diff; its comment says why `ci.yml` is the one copy left. With no loop left, the `bad=` accumulator went too (`diff … || exit 1`). The header's column-0 rule now cites "a heredoc terminator" generically, since Pair H's was the only one.
- *Catalogue.* Pair A: `SPEC/layout.md` is the one clause; judgment half and its `grep` now read that file only. Pair H: retitled roster ↔ `ci.yml`, minting history kept, prose mirrors recorded as collapsed. Counts: "Ten pairs — B, C, H, …", "the other pairs — A, D, K", "run the ten", "Eleven `ok` lines", Pair K's CI subset.
- *Pointers.* CONVENTIONS L54 / L56 (and L58: pair list, "Pairs A, D and K", thirteen functions); tasknote README §"Project quick commands" → `AGENTS.md` §"Validation" + §"Dev Server"; `/ft-release` Step 6 fence → one sentence; SKILL.md L289 "ten pairs"; README `templates/` bullet → `SPEC/layout.md` §"Working in the flaitron repo itself".
- *Minimal refactor gate.* Left alone: `AGENTS.md` L113, CONVENTIONS L60, the `ci.yml` comment (all describe the surviving verbatim half); pre-existing shellcheck infos outside `pair_h`; `docs/CONTEXT-BUDGET.md` ledger figures (release-refreshed).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh pair_h` and the full script (below); negative test for the empty-side guard

- [x] Ran lint/type-check on changed code — `bash -n` clean; `shellcheck` reports only pre-existing infos/warnings outside `pair_h`

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt (second pass, after the review blocker was fixed):

```text
grep -c -F 'node --check tools/update-adopters.mjs' CONVENTIONS / tasknote README / Step 6 awk → 0 / 0 / 0
grep -c 'MISSING VALIDATION CMD' tools/drift-checks.sh            → 0
grep -c '^pair_a()' tools/drift-checks.sh                         → 0
grep -c 'tasknote templates (full' README.md                      → 0
grep -q 'SPEC/layout.md' <README templates bullet>                → 0
git grep eleven|fourteen|A, B, C, H (live)                        → 3 hits, judgment: §7.1 "Eleven `ok` lines" (the new, correct count), standing-checks "eleven-slug" (history), CODEX-VERIFICATION wrappers — none a pair count
bash tools/drift-checks.sh                                        → 0 (15 ok)
bash tools/drift-checks.sh 'pair_*' wrapper_name_invariant        → 11 ok lines
negative: AGENTS `## Validation` renamed in a scratch worktree    → pair_h exit 1, "NO VALIDATION ROSTER  AGENTS.md"
```

External review: `/code-review medium` over the working-tree diff. It found **1 blocker** and **6 notes**.

- **Blocker, fixed.** The narrowed `pair_h` failed open: two empty extractions diff clean, and the dropped presence loop had been what caught a missing roster. It now reports `NO VALIDATION ROSTER` / `NO VALIDATE RUN STEPS` for an empty side. The first fix exited silently under `bash -e` (an empty `grep` in an assignment), which the negative test caught, so the greps carry `|| true`. The catalogue entry names both findings. Phase 3 re-ran from the top.
- **Notes**, fixed in place unless stated:
  1. The new pointers hard-coded "seven", an unchecked count → dropped from Step 6 and CONVENTIONS L54. The Pair H catalogue entry keeps "seven" as the pair's own description.
  2. §6.1 opened "The commands above" → "The Step 6 gate".
  3. The header's heredoc rule had no heredoc left → bullet removed; the first shape rule already states the column-0 requirement.
  4. A reworded `SPEC/layout.md` clause would make Pair A's grep print nothing → the entry now calls an empty grep a finding. Losing CI coverage for that clause is the tradeoff the census ([[CORE-734.3]]) accepted.
  5. Unticked Phase 2 → no change: the review raced the notes write; Phase 2 was already ticked.
  6. The tasknote README pointer dropped the bare `npm run dev` → it now says to drop `--prefix viz` inside `viz/`, with `npm run dev` as the example.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

**Doc-drift sweep:**
- `README.md` and `docs/CONVENTIONS.md` are updated as deliverables.
- `.flaitron/tasknote/README.md` (§"Project quick commands") is updated as a deliverable.
- `AGENTS.md`: no change. L113 still describes the verbatim half, which stays.
- No change to the other entries (`SPEC.md`, `docs/MIGRATION.md`, the four snippets, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`). None restates the validation roster or the templates clause.

**Recap.** Pairs H and A are narrowed:
- Three prose copies of the validation roster now point at `AGENTS.md` §"Validation": CONVENTIONS, the tasknote README, and the `/ft-release` Step 6 fence.
- README's templates bullet now points at `SPEC/layout.md`.
- `pair_h` keeps only the `AGENTS.md` ↔ `ci.yml` diff, and now fails on an empty side.
- `pair_a` is out of CI. Pair A stays as a release-time judgment check.
- Counts are updated: 10 lifted pairs, 13 release-walk functions, 11 `ok` lines.

Details:
- **Changed files:** the six in `touches:` and this note.
- **Verification:** the receipt above. All checks pass on the second pass.
- **Refactors:** none beyond Acceptance.
- **`touches:` reconciliation:** `git diff --name-only` matches the declared six exactly, plus this note.
- **Maintainability:** the three prose mirrors are gone, and `tools/drift-checks.sh` loses about 60 lines. A roster change now edits `AGENTS.md` and `ci.yml` only, and `pair_h` binds those two.

**Learnings:** N/A. The pointer rule already lives in CONVENTIONS §"Canonical source with labeled mirrors", and Pair Q guards the new `§` citations.

**Archived:** 2026-10-07
