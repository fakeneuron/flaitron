---
title: gitleaks-step-fleet-shape
status: completed
tags: [security, ci]
created: 2026-11-14
due:
related-tasks: [CORE-905, CORE-578, CORE-910]
touches:
  - .github/workflows/ci.yml
  - SECURITY.md
  - docs/CONVENTIONS.md
  - .flaitron/audit-overlay/SKILL.md
---

# CORE-909 | gitleaks-step-fleet-shape

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-905]] · [[CORE-578]] · [[CORE-910]]

## 🎯 Goal

Run `ci.yml`'s gitleaks scan once, on a clean checkout before any install or build, in natabula's spine step shape, and drop the `SECURITY.md` caveat that existed only because the scan ran after `npm ci`.

## ✅ Acceptance

- [x] `ci.yml` has a `secret-scan` job (no matrix) whose steps are a pinned checkout then `Secret scan (gitleaks)`; the `validate` job carries no gitleaks step — `node -e` js-yaml parse of the workflow asserts both
- [x] The step body is the spine's: `diff` of the `Secret scan (gitleaks)` step's `env:` + `run:` lines against natabula's `configs/.github/workflows/ci.yml` shows no difference, and `GITLEAKS_VERSION` / `GITLEAKS_SHA256` are unchanged from CORE-905's values — `diff` + `grep -c`
- [x] Pair H and `supply_chain` still pass (new job uses `- name:` + `run:`, pinned checkout, inherits workflow `permissions:`) — `bash tools/drift-checks.sh pair_h` and `bash tools/drift-checks.sh supply_chain`
- [x] `SECURITY.md` drops the "runs after `npm --prefix viz ci`" caveat and counts four jobs; `docs/CONVENTIONS.md` and the audit overlay name the `secret-scan` job instead of a `validate` step — `! grep -n 'after .npm --prefix viz ci' SECURITY.md` and `! grep -n 'three jobs\|all three jobs' SECURITY.md docs/CONVENTIONS.md`
- [x] Whole drift roster and its self-test stay green — `bash tools/drift-checks.sh` and `node --test tools/drift-checks.test.mjs`
- [x] Local scan of the clean tree still exits 0 — `gitleaks dir . --config .gitleaks.toml --no-banner --redact`
- [x] N/A — needs a push, and none was made. The new job actually runs green once pushed — `judgment`: push is the operator's ask; this task never pushes

## 🧩 Subtasks

- [x] Add a `secret-scan` job to `ci.yml` (pinned checkout, spine step verbatim, comment carrying the why) and delete the step from `validate`
- [x] `SECURITY.md`: four jobs, drop the post-install caveat, say the scan now runs on a clean checkout before any dependency code
- [x] `docs/CONVENTIONS.md` §"GitHub Actions CI": four jobs, scan lives in `secret-scan`, "other two jobs" line updated
- [x] `.flaitron/audit-overlay/SKILL.md` line 74: the invocation belongs to the `secret-scan` job, not `validate`
- [x] Run the verify commands and record the receipt

## 🔗 Related

- [[CORE-905]] — parent: pinned the tarball SHA-256; this is its filed-out-of-scope follow-up
- [[CORE-578]] — added the scan as a `validate` step
- [[CORE-910]] — sibling follow-up: `supply_chain` rule for hand-fetched release binaries; touches `tools/drift-checks.sh`, not this task's files

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Still the right work. `ci.yml` today scans after `npm --prefix viz ci` + build in each of the two matrix legs, so the scan sees `viz/node_modules` and `viz/dist`, runs after third-party lifecycle scripts, and runs twice. Natabula's spine (STACK-TENDENCIES §"Continuous integration" → Secret scan, NAT-470) puts it on a clean checkout before setup/install/build, and names "a separate scanner job with its own clean checkout" as a fit.

- [x] Read relevant source files — `.github/workflows/ci.yml`, natabula `configs/.github/workflows/ci.yml` and `docs/STACK-TENDENCIES.md` §"Continuous integration", `SECURITY.md` §"GitHub Actions CI", `docs/CONVENTIONS.md` §"GitHub Actions CI", `tools/drift-checks.sh` (`supply_chain`, `pair_h`)

- [x] **Best Practices Review** — N/A beyond one note: Pair H extracts every `      - run: ` line in the whole of `ci.yml`, so any new step must keep the `- name:` + `run:` shape; `supply_chain` needs the workflow-level `permissions:` (inherited) and a SHA-pinned `uses:` on the new checkout.

- [x] **Archive skim** — `archive/core/` confirmed from the README table. Hits on `workflows/ci.yml`: many; load-bearing are [[CORE-578]] (added the step as last `validate` step, "matching project-20's pinned-curl-fetch shape") and [[CORE-905]] (hash pin; filed this follow-up). No decision there argues for the post-install position; CORE-578 placed it last because that was the simplest edit.

- [x] **Drift check** — PLAN line matches ci.yml (step is after `npm --prefix viz ci`, inside the Node 24/26 matrix). Sidequest said "narrow-claim note in SECURITY.md can drop": confirmed, it is the last sentence of the gitleaks bullet. Found beyond the sidequest: `SECURITY.md` says "All three jobs"; `docs/CONVENTIONS.md` says "three jobs" and "the other two jobs"; audit overlay line 74 calls the invocation "the CI `validate` job's". All become stale with a fourth job and are in scope. `docs/CONVENTIONS.md` and `SECURITY.md` are in the AI-referenced doc set.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) a separate job, not a step gated by `if: matrix.node == 24` — the gate would couple the scan to one matrix leg and silently vanish if that Node line left the matrix, and natabula's spine names a separate scanner job as conforming; (2) default-depth checkout is enough, since `gitleaks dir` scans files not history (natabula's `fetch-depth: 0` serves its coverage gate, not the scan); (3) the step body is natabula's, byte for byte, keeping CORE-905's version and digest; (4) no push.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Carried from the retired sidequest stub:

> **Idea** — `ci.yml`'s gitleaks scan sits in the `validate` job after `npm --prefix viz ci`/build: it scans `viz/node_modules` + `viz/dist`, runs after third-party lifecycle scripts (which could shadow `sha256sum`/`tar` via `$GITHUB_PATH`), and runs once per Node-matrix leg. Move it ahead of install (or into its own job / `if: matrix.node == 24`), and adopt natabula's spine-deposit step shape so `/natabula-layer-drift` stops classifying it diverged (NAT-462 skipped flaitron for shape). Then narrow-claim note in SECURITY.md can drop. Mind Pair H (`- name:` + `run:` shape).
>
> **Resume anchor** — CORE-905 Phase 3, filing out-of-scope `/code-review medium` notes (findings 1-3, 5) before closure.

Spine step differs from today's only in the tarball path (`tgz="$RUNNER_TEMP/gitleaks.tar.gz"`) and `tar -xzf "$tgz" -C "$RUNNER_TEMP" gitleaks`. Spine's `ci.yml` is spine-standardized, not byte-uniform, so layer-drift will keep reporting the whole file `≠`; the step is what matches.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern: the `drift` and `coverage` jobs already sit beside `validate` as checkout-only jobs with `- name:` + `run:` steps, and the step body is natabula's spine step verbatim.

- [x] **Minimal refactor gate** — no refactor. Ordinal job references in `docs/CONVENTIONS.md` ("second job", "third job") became name references, because a fourth job placed between `validate` and `drift` made them wrong.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: workflow YAML and prose; the existing `pair_h` / `supply_chain` checks and `drift-checks.test.mjs` already bind the shapes this touches.

**Implementation Notes:**

`ci.yml`: new `secret-scan` job (pinned checkout, default depth, spine step) placed after `validate`; the gitleaks step and its comment moved out of `validate`. Comment on the job carries the why and the Pair H note. `SECURITY.md`: four jobs; the post-`npm ci` caveat replaced with a statement of what the clean-checkout placement gives. `docs/CONVENTIONS.md`: four jobs, scan described under `secret-scan`, ordinals removed, "other three jobs". `audit-overlay/SKILL.md` line 74: invocation attributed to `secret-scan`. The sidequest stub's deletion is staged (`git rm --cached`) because `pair_q` lists tracked files and fails on a deleted-but-unstaged stub.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/drift-checks.test.mjs` (44 pass); the viz suite is untouched by this diff

- [x] Ran lint/type-check on changed code — N/A for viz; workflow YAML parsed with js-yaml and the drift roster (Pair H, `supply_chain`) covers its shape

- [x] **Verification receipt** — see Testing Notes; no duplication, dead code or stale docs: the old step and its comment left `validate`, and the three stale job-count / `validate`-step references are rewritten

- [x] **External review** — `/code-review medium` graded the diff; no blocker; dispositions in Testing Notes

- [x] (frontend) Asked the user for visual confirmation — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt:

```text
node -e (js-yaml parse of ci.yml)                    → 0   jobs: validate,secret-scan,drift,coverage; validate has no gitleaks; secret-scan has no matrix
grep -A12 'name: Secret scan (gitleaks)' ci.yml  vs natabula configs ci.yml → step lines identical (only the 13th, following-context line differs)
bash tools/drift-checks.sh pair_h                    → 0
bash tools/drift-checks.sh supply_chain              → 0
bash tools/drift-checks.sh                           → 0   (first run → 1: pair_q opened the deleted-but-unstaged sidequest stub; passes once the deletion is staged)
node --test tools/drift-checks.test.mjs              → 0   44 pass
gitleaks dir . --config .gitleaks.toml --no-banner --redact → 0
! grep 'after .npm --prefix viz ci' SECURITY.md      → 0
! grep -E 'all three jobs|in three jobs|other two jobs' SECURITY.md docs/CONVENTIONS.md → 0
```

External review (`/code-review medium`, six findings, no blocker):

- **note — step reshaped from the CORE-905 form** (`$TARBALL` → `$tgz`, one-line URL): declined. Adopting natabula's step shape is this task's Acceptance 2, and the step is byte-identical to the spine's.
- **note — `viz/dist` and `viz/node_modules` no longer scanned**: declined, by design. It is the defect the task fixes (the old scan ran after third-party lifecycle scripts); `SECURITY.md` states what the placement gives and no longer overstates it. A scan of build output would be a separate job, not filed: nothing in `dist` is a secret source here, as the viz bundle reads no env.
- **note — required-check names**: checked, `gh api .../branches/main/protection` → 404 "Branch not protected". N/A.
- **notes — `viz/src/originGuard.ts`, `viz/src/devApi.ts`**: not in this task's diff (FE-152's, already committed); the reviewer swept past the working tree. N/A here, not filed from this task.
- **note — "every step uses `- name:` + `run:`" overstates** (the checkout is a `uses:` step): fixed, in the `ci.yml` comment and the `docs/CONVENTIONS.md` sentence I wrote. The same sentence already in the `coverage` job's comment is not mine; left.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SECURITY.md`, `docs/CONVENTIONS.md`, and the audit overlay updated in this diff; `README.md` line 336 (`.gitleaks.toml` — "config for CI's secret scan") still true; `AGENTS.md` line 137 names `docs/CONVENTIONS.md` §"GitHub Actions CI", which now says `secret-scan`; the rest: no change

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — in the Final Summary below and the 📦 response

- [x] **Learnings** — N/A

**Final Summary:**

The gitleaks scan now runs once, in its own `secret-scan` job on a clean checkout before any install or build, using natabula's spine step with CORE-905's pinned version and digest. `validate` no longer carries it. `SECURITY.md` drops the post-`npm ci` caveat; `docs/CONVENTIONS.md` and the audit overlay name the new job. Declared 4 files, changed 4 plus the tasknote, PLAN row and sidequest stub deletion. Undeclared: none. Not observed: the new job running on GitHub, since nothing was pushed.

**Archived:** 2026-11-14
