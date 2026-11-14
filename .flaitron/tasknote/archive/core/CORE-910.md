---
title: supply-chain-release-pin
status: completed
tags: []
created: 2026-11-14
due:
related-tasks: [CORE-905, CORE-902, CORE-904, CORE-907, CORE-911]
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

# CORE-910 | supply-chain-release-pin

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-905]] · [[CORE-902]] · [[CORE-904]] · [[CORE-907]]

## 🎯 Goal

Make `supply_chain` in `tools/drift-checks.sh` fail any workflow step that fetches a `releases/download` URL without a pinned `*_SHA256` env and a `sha256sum -c` in that same step.

## ✅ Acceptance

- [x] The live tree passes the extended check (both existing fetches — gitleaks in `ci.yml`, shellcheck in `install-test.yml` — are compliant) — `bash tools/drift-checks.sh supply_chain`
- [x] The check reports a dropped pin, a dropped verify, and a new unpinned fetch, each as its own finding, and a pin or verify in a different step or only in a comment does not satisfy a fetch — the seeded `supply_chain` case in `node --test tools/drift-checks.test.mjs`
- [x] The whole drift roster still passes (context budgets, final newlines, Pair Q citations on the edited docs) — `bash tools/drift-checks.sh`
- [x] `SECURITY.md` §"GitHub Actions CI" and `docs/CONVENTIONS.md`'s `supply_chain` description state the new rule — `grep -q 'releases/download' SECURITY.md && grep -q 'releases/download' docs/CONVENTIONS.md`

## 🧩 Subtasks

- [x] Add the release-fetch awk block to the `supply_chain` workflow loop; extend the function's header comment
- [x] Extend the seeded `supply_chain` case in `tools/drift-checks.test.mjs` (dropped pin, dropped verify, unpinned fetch added; decoy pin/verify in another step)
- [x] State the rule in `SECURITY.md` §"GitHub Actions CI" and in `docs/CONVENTIONS.md`'s `supply_chain` description
- [x] Run the targeted check, the node test, and the full drift roster

## 🔗 Related

- [[CORE-905]] — parent; pinned gitleaks to an in-workflow digest and filed this as the enforcing follow-up
- [[CORE-902]] — shellcheck hash pin (the other fetch this rule covers)
- [[CORE-904]] — built `supply_chain`; the function this extends
- [[CORE-907]] — same function's line-by-line YAML parsing limits; this rule inherits them (not fixed here)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Both fetches are convention-only today: nothing fails if a pin or `sha256sum -c` is dropped or a third unpinned fetch is added. `supply_chain` still pins only `uses:`, so the gap is real and the task line still describes it.

- [x] Read relevant source files — `supply_chain` (`tools/drift-checks.sh:484-536`), its seeded case (`tools/drift-checks.test.mjs:128-157`), and the two fetch steps (`ci.yml:63-75`, `install-test.yml:41-55`).

- [x] **Best Practices Review** — Extend the existing per-workflow loop with one more awk block beside the `UNPINNED ACTION` one; same `bad=` accumulator, same `LABEL  file:line :: text` finding shape, no new function (the shape rules make each top-level function a separate check). No duplication to refactor.

- [x] **Archive skim** — `archive/core/` hits on `drift-checks.sh`: CORE-904 (built `supply_chain`), CORE-905 (filed this), CORE-902, CORE-909. Nothing contradicts the plan; CORE-905's note records that the pin lives in the workflow, not the release, which is why the rule checks for an in-step literal digest rather than a checksums-file fetch.

- [x] **Drift check** — Task line names `supply_chain` in `tools/drift-checks.sh` and `releases/download`; both exist as cited. The stub's two `SHA256` names (`GITLEAKS_SHA256`, `SHELLCHECK_SHA256`) and both `sha256sum -c -` lines are as described. No SPEC contract touched; `SECURITY.md` and `docs/CONVENTIONS.md` describe `supply_chain` and need the new clause.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: "in-step" means the same YAML list item under `steps:` (not job- or workflow-level `env:`); a pin is an uppercase `*_SHA256:` key with a literal 64-hex value (quotes and trailing comment allowed); verify is a non-comment line with `sha256sum -c` / `--check`; comment lines count for nothing; `gh release download` and other fetch shapes are out of scope; CORE-907's parsing limits (quoted keys, `steps:` forms) are inherited, not fixed.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Carried from the retired sidequest stub:

> **Idea** — The CORE-902 (shellcheck) and CORE-905 (gitleaks) hash pins are convention only: `supply_chain` in `tools/drift-checks.sh` pins `uses:` actions to SHAs but never checks hand-fetched binaries. Add a rule: every `releases/download` URL in a workflow step needs a pinned `*_SHA256` env and a `sha256sum -c` in the same step, so dropping a pin or adding an unpinned fetch fails drift. Add a seeded case to `tools/drift-checks.test.mjs`. Coordinate with CORE-907 (same function's line-by-line parsing limits).
>
> **Resume anchor** — CORE-905 Phase 3, filing out-of-scope `/code-review medium` notes (finding 4) before closure.

Design: no `{n}` interval in the awk (mawk on ubuntu runners may lack it), so the 64-hex pin is checked by `length` plus `[0-9a-f]+`. A fetch outside any `steps:` list has step 0 and always fails, so it fails closed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey: extended the per-workflow loop in `supply_chain` with a second awk block beside `UNPINNED ACTION`, same `bad=` accumulator and `LABEL  file:line :: text` shape; no new function, because a top-level function is its own check.

Minimal refactor gate: none needed. Step boundaries are tracked inside the new awk (a `- ` item at the first item's indent under `steps:`), and the existing `uses:` block is untouched.

Findings are `NO SHA256 PIN` and `NO SHA256 VERIFY`, reported separately per fetch. A fetch outside any `steps:` list fails both. Docs: `SECURITY.md` §"GitHub Actions CI" gets one bullet and `docs/CONVENTIONS.md`'s `supply_chain` description gets one clause. The seeded case adds a new unpinned step whose pin and verify exist only in comments, a verify dropped from the gitleaks step (the next step's pin does not cover it), and the shellcheck pin dropped.

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
node --test tools/drift-checks.test.mjs          → 0   (44 pass, 0 fail; supply_chain case extended)
bash tools/drift-checks.sh                       → 0   (NEAR CAP lines are pre-existing, none on files this task touched)
grep -q 'releases/download' SECURITY.md && grep -q 'releases/download' docs/CONVENTIONS.md → 0
bash -n tools/drift-checks.sh; node --check tools/drift-checks.test.mjs → 0
```

Acceptance 2 (decoys) is decided by the seeded case: its finding regex expects the gitleaks step to report `NO SHA256 VERIFY` only, so the zz step's comment pin and the neighbouring step's pin did not leak across steps.

Duplication, dead code, stale docs: none; the header comment, SECURITY.md and CONVENTIONS.md name the new rule.

**External review** (`/code-review medium`, five findings):

1. **blocker — fixed.** Step numbers restarted per `steps:` block, so a pin or verify in job A's step N covered an unpinned fetch in job B's step N. Step ids are now numbered across the file (`step = ++sid`); the seeded case adds a `zz-job` whose third step fetches unpinned while `secret-scan`'s third step holds a pin. Confirmed the case fails with the old `step++` and passes with the fix.
2. **note — filed** [[CORE-911]]: `releases/latest/download` and `gh release download` do not match the literal `releases/download`.
3. **note — declined:** pin and verify are independent presence checks, and a trailing inline `# sha256sum -c` counts. That is the stated rule (pin env plus `sha256sum -c` in the same step); linking the two is CORE-907-class line-parsing hardening.
4. **note — declined:** a pin hoisted to job or workflow `env:` fails closed, and uppercase hex digests are rejected. Both are deliberate: the task says "in the same step", and the failure says which fetch lacks a pin.
5. **note — addressed in part:** the cross-job case is now seeded (finding 1). `latest/download` coverage waits on CORE-911 and a hoisted pin is declined (4).

Re-run after the fix: `node --test tools/drift-checks.test.mjs` → 0 (44 pass); `bash tools/drift-checks.sh` → 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`supply_chain` now fails any workflow step that fetches a `releases/download` URL without a literal 64-hex `*_SHA256` env and a `sha256sum -c` in that same step (`NO SHA256 PIN` / `NO SHA256 VERIFY`, per fetch). The seeded case covers a dropped pin, a dropped verify, a new unpinned step with decoy comments, and a cross-job step-index collision the external review caught. `SECURITY.md` and `docs/CONVENTIONS.md` state the rule.

Doc-drift sweep: `SECURITY.md` and `docs/CONVENTIONS.md` updated; the rest of §"AI-referenced docs" → no change (the audit overlay's invariant (5) already covers the pin posture at severity-guide level).

Touches: declared 4 files, changed 4 plus the retired `.flaitron/sidequest/CORE-910.md`. Undeclared: `.flaitron/sidequest/CORE-911.md` (the filed follow-up's stub).

Maintainability: one awk block beside the existing `uses:` check, no new function.

Follow-ups: [[CORE-911]] (latest/download, `gh release download`); [[CORE-907]] (inherited line-parsing limits).

**Archived:** 2026-11-14
