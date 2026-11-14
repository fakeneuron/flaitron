---
title: supply-chain-latest-download
status: completed
tags: []
created: 2026-11-14
due:
related-tasks: [CORE-910, CORE-905, CORE-904, CORE-907]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - tools/drift-checks.sh
  - tools/drift-checks.test.mjs
  - SECURITY.md
  - docs/CONVENTIONS.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-911 | supply-chain-latest-download

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-910]] · [[CORE-905]] · [[CORE-904]] · [[CORE-907]]

## 🎯 Goal

Make `supply_chain` in `tools/drift-checks.sh` catch the two unpinned release-fetch shapes CORE-910's literal `releases/download` match misses — `releases/latest/download` URLs and `gh release download` steps — and settle how each fails.

## ✅ Acceptance

- [x] The live tree still passes (both fetches are `releases/download` + pinned) — `bash tools/drift-checks.sh supply_chain`
- [x] A workflow line carrying `releases/latest/download` fails as `LATEST RELEASE FETCH`, and one carrying `gh release download` fails as `GH RELEASE FETCH`, each as its own finding; a comment line trips neither — the seeded `supply_chain` case in `node --test tools/drift-checks.test.mjs`
- [x] The whole drift roster still passes — `bash tools/drift-checks.sh`
- [x] `SECURITY.md` §"GitHub Actions CI" and `docs/CONVENTIONS.md`'s `supply_chain` description state the new rule — `grep -q 'releases/latest/download' SECURITY.md && grep -q 'releases/latest/download' docs/CONVENTIONS.md`

## 🧩 Subtasks

- [x] Add the two `LATEST RELEASE FETCH` / `GH RELEASE FETCH` matches to the release-fetch awk block in `supply_chain`; extend the function's header comment
- [x] Extend the seeded `supply_chain` case (a `latest/download` step, a `gh release download` step, and a comment-only mention) and its finding regex
- [x] State the rule in `SECURITY.md` §"GitHub Actions CI" and `docs/CONVENTIONS.md`'s `supply_chain` description
- [x] Run the targeted check, the node test, and the full drift roster

## 🔗 Related

- [[CORE-910]] — parent; built the `releases/download` pin+verify rule and filed this from its external review
- [[CORE-905]] — gitleaks digest pin (one of the two live fetches)
- [[CORE-904]] — built `supply_chain`; the function this extends
- [[CORE-907]] — same function's line-by-line YAML parsing limits; this rule inherits them

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `supply_chain`'s fetch rule matches the literal `releases/download` only (`tools/drift-checks.sh:545`), so `releases/latest/download` and `gh release download` still slip past. The task line still describes the gap, and no live workflow uses either shape, so the live tree stays green.

- [x] Read relevant source files — `supply_chain` (`tools/drift-checks.sh:484-563`), its seeded case and finding regex (`tools/drift-checks.test.mjs:128-177`), the rule bullets in `SECURITY.md:224-226` and `docs/CONVENTIONS.md:58`, and the CORE-910 archived note.

- [x] **Best Practices Review** — Extend the same awk block in the per-workflow loop; same `bad=` accumulator, same `LABEL  file:line :: text` shape, no new function. The two new matches are independent of the step-pin bookkeeping (they fail outright), so they print immediately instead of joining the `END` pin/verify loop.

- [x] **Archive skim** — `archive/core/` hits on `drift-checks.sh`: CORE-910 (the rule being extended; filed this), CORE-904 (built `supply_chain`), CORE-905, CORE-909. Nothing contradicts the plan. CORE-910's note records the mawk constraint (no `{n}` interval) and that comment lines count for nothing — both carry over.

- [x] **Drift check** — Cited names exist: `supply_chain`, `releases/download` at line 545, the test case at 128-177. Live fetches: `ci.yml:72` (gitleaks) and `install-test.yml:53` (shellcheck), both `releases/download`; no `latest/download` or `gh release download` anywhere in `.github`, `install.sh`, or `tools/` (grep run). `install-test.yml:4` mentions `releases/latest` in a comment only, which comment lines skip. No SPEC contract touched.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  Asked one question: `gh release download` fails outright (operator picked it over "same pin+verify" and "pin+verify plus tag required"). Settled without asking: `releases/latest/download` fails outright too, because a digest cannot pin a moving asset and a "pinned version" is then just `releases/download/v<ver>`, which the CORE-910 rule already governs. Assumptions: both findings are per-line and need no step bookkeeping; a comment line trips neither; CORE-907's parsing limits are inherited, not fixed.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Carried from the retired sidequest stub:

> **Idea** — CORE-910's release-fetch rule in `supply_chain` (`tools/drift-checks.sh`) matches only the literal `releases/download`. A `releases/latest/download/<asset>` URL or a `gh release download` step is an unpinned binary fetch the rule never sees. Extend the match, and decide whether `latest` fails outright (a digest cannot pin a moving asset) or must name a pinned version. Add a seeded case to `tools/drift-checks.test.mjs`. Found by CORE-910's external review.
>
> **Resume anchor** — CORE-910 Phase 3 closing: step ids made global across jobs (review blocker fixed); next is the Acceptance tick-through and closure.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: extended the release-fetch awk block CORE-910 added in `supply_chain`, same `LABEL  file:line :: text` shape and `bad=` accumulator; no new function. Minimal refactor gate: none needed.

Two one-line rules beside the `releases/download` match: `LATEST RELEASE FETCH` for `releases/latest/download` and `GH RELEASE FETCH` for `gh release download`. Both print on their own line, so they need no step bookkeeping and fail whether or not a pin is present. Comment lines are already skipped at the top of the block. `releases/latest/download` does not contain the literal `releases/download`, so it never double-reports.

Seeded case: two new steps in `install-test.yml` (a `latest/download` curl and a `gh release download v1`) plus two comment lines naming both shapes. The finding regex is one contiguous sequence, so a comment that tripped a finding would break the match. Docs: one sentence in `SECURITY.md`, one clause in `docs/CONVENTIONS.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
bash tools/drift-checks.sh supply_chain          → 0
node --test tools/drift-checks.test.mjs          → 0   (44 pass, 0 fail)
bash tools/drift-checks.sh                       → 0
bash -n tools/drift-checks.sh; node --check tools/drift-checks.test.mjs → 0
grep -q 'releases/latest/download' SECURITY.md && grep -q 'releases/latest/download' docs/CONVENTIONS.md → 0
```

Negative check: with `tools/drift-checks.sh` stashed (test edits kept), the seeded `supply_chain` case fails (1 fail), so the new regex is not vacuous.

One mid-run failure: the first full roster run failed `pair_q` because the deleted sidequest stub was still in the git index; the awk could not open it. Staged the deletion (it ships in the closure commit anyway); roster → 0. A cause found and fixed, not a rerun to see green.

**External review** (`/code-review medium`, eight findings, no blocker):

1. **note — declined:** the patterns also match trailing comments and `name:` text, since only whole-line comments are skipped. Same line-grep limit the `uses:` and `releases/download` rules already carry; hardening it is [[CORE-907]]'s remit.
2. **note — declined:** other spellings pass (`gh -R x release download`, a `\` continuation, `gh release view` plus curl of `browser_download_url`, a bare `releases/latest` redirect). The check is a line grep, not a fetch detector; [[CORE-907]] covers this class.
3. **note — declined:** a URL built from variables or split across lines hides the literal. Same reason as 2.
4. **note — declined:** a tagged, digest-verified `gh release download vX` fails too. Deliberate, per the operator's pick at Discovery: `gh` with no tag fetches latest, and detecting a tag by awk is fragile. The remedy is curl on a `releases/download/v<ver>` URL (the fleet shape).
5. **note — declined:** the new findings print in scan order while `NO SHA256` findings print in `END`. The seeded regex is one contiguous sequence and CORE-910's already depended on the same order; a reorder fails loudly, which is the intent.
6. **note — declined:** the seed covers `install-test.yml` and whole-line comments only. The rule is two one-line regexes with no per-file or per-form logic, so broader seeds would test awk, not this rule.
7. **note — declined:** `docs/CONVENTIONS.md` line 58 is already one paragraph and this adds one clause to the existing `supply_chain` sentence, as CORE-910 did. The drift roster (context budgets included) passes.
8. **note — declined:** private-release assets have no sanctioned pinned path. No workflow fetches one; revisit when one does.

No re-run needed: no code changed after the review.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`supply_chain` now fails a workflow line carrying `releases/latest/download` (`LATEST RELEASE FETCH`) or `gh release download` (`GH RELEASE FETCH`), pinned or not: a digest cannot pin a moving asset, and `gh` with no tag fetches latest. The seeded case adds both shapes plus two comment lines that must trip nothing. `SECURITY.md` and `docs/CONVENTIONS.md` state the rule.

Doc-drift sweep: `SECURITY.md` and `docs/CONVENTIONS.md` updated; the rest of §"AI-referenced docs" → no change.

Learnings: N/A.

Touches: declared 4 files, changed 4. Undeclared: `.flaitron/sidequest/CORE-911.md` (the retired stub, deleted).

Maintainability: two one-line awk rules beside the CORE-910 block, no new function.

**Archived:** 2026-11-14
