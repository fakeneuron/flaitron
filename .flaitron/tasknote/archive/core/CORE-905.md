---
title: gitleaks-tarball-hash-pin
status: completed
tags: [security, ci]
created: 2026-11-14
due:
related-tasks: [CORE-625, CORE-902]
touches:
  - .github/workflows/ci.yml
  - SECURITY.md
---

# CORE-905 | gitleaks-tarball-hash-pin

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-625]] · [[CORE-902]]

## 🎯 Goal

Pin the gitleaks linux x64 tarball's SHA-256 in `ci.yml`, the same way `install-test.yml` pins shellcheck, so a swapped release cannot pass verification, and make `SECURITY.md` describe what the check actually guarantees.

## ✅ Acceptance

- [x] `ci.yml`'s gitleaks step carries `GITLEAKS_SHA256` beside `GITLEAKS_VERSION` and checks the tarball with `sha256sum -c` against it before extraction; the same-release `checksums.txt` fetch is gone — `grep -q "GITLEAKS_SHA256: '551f6fc8" .github/workflows/ci.yml && ! grep -q checksums.txt .github/workflows/ci.yml`
- [x] The pinned hash is the real v8.30.1 linux_x64 digest, and the new step's commands pass on the real tarball and fail closed on a tampered one — `judgment`: local reproduction of the step commands (receipt in Testing Notes); a GitHub runner only confirms it on the next push
- [x] `SECURITY.md` §"GitHub Actions CI" describes the in-workflow pin and no longer claims a release-sourced checksums file catches a swapped tarball — `grep -n "GITLEAKS_SHA256" SECURITY.md && ! grep -q "checksums.txt" SECURITY.md`
- [x] Drift checks still pass (Pair H extracts the `validate` job's `- run:` lines) — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Rewrite the gitleaks step in `ci.yml` to the CORE-902 shape (`set -euo pipefail`, `curl -fsSL --retry 3 --retry-all-errors`, `echo "$SHA  $file" | sha256sum -c -`), with a comment naming the hash source and "bump both together"
- [x] Reproduce the step locally: pass on the real tarball, fail on a tampered one
- [x] Rewrite the `SECURITY.md` mitigation bullet
- [x] Run drift checks and the actionlint-free YAML sanity check

## 🔗 Related

- [[CORE-625]] — predecessor: added the same-release `checksums.txt` verification this replaces
- [[CORE-902]] — pattern source: shellcheck hash pin in `install-test.yml` (natabula NAT-461 standard)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `ci.yml:57-59` still fetches `gitleaks_<v>_checksums.txt` from the same release URL as the tarball, so anyone who can replace release assets can replace both; `SECURITY.md:215-218` claims a swapped tarball fails. Both match the audit finding.

- [x] Read relevant source files — `.github/workflows/ci.yml` (gitleaks step, L46-61), `.github/workflows/install-test.yml` (shellcheck pin, L35-57), `SECURITY.md` §"GitHub Actions CI" (L190-226)

- [x] **Best Practices Review** — N/A: a CI step and a doc bullet, no module boundaries.

- [x] **Archive skim** — `archive/core/` (README table: `CORE-*` → `archive/core/`). Hits: CORE-625 (added the checksums.txt check; Phase 3 did a local pass + tamper negative test — reuse that verification shape), CORE-902 (shellcheck pin; standard from natabula NAT-461: `*_VERSION` beside `*_SHA256`, `curl -fsSL --retry 3 --retry-all-errors`, `sha256sum -c`, take the hash from the GitHub asset digest). CORE-851 mentions checksums for the installer — unrelated.

- [x] **Drift check** — PLAN line, cited files and lines all match current code. `docs/VERSION-HISTORY.md:183` says "checksum-verified" — historical release note, leave it.

- [x] No clarifications needed. Assumptions: (1) drop the `checksums.txt` fetch entirely rather than keep it alongside the pin, since the pin is strictly stronger and CORE-902's shape has none; (2) hash source is the GitHub asset digest for `gitleaks_8.30.1_linux_x64.tar.gz` (`sha256:551f6fc83ea457d62a0d98237cbad105af8d557003051f41f3e7ca7b3f2470eb`), cross-checked equal to the release `checksums.txt` line; (3) adopt CORE-902's `curl -fsSL --retry` flags (current `-sSL` lacks `-f`, so an HTTP error page would only fail at the checksum).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Pair H: `ci.yml`'s `validate` job lines matching `^      - run: ` are diffed against AGENTS.md §"Validation". The gitleaks step is `- name:` + `run: |`, so editing its body cannot leak into that extraction — keep that shape.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `install-test.yml`'s shellcheck pin (CORE-902 / NAT-461 shape): `*_VERSION` beside `*_SHA256`, `set -euo pipefail`, `curl -fsSL --retry 3 --retry-all-errors`, `echo "$SHA  $file" | sha256sum -c -`, then extract.

- [x] **Minimal refactor gate** — no refactor; the `tar` / `gitleaks dir` lines are unchanged.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: a CI step with no test harness; verified by local replay (Phase 3).

**Implementation Notes:**

- `ci.yml`: added `GITLEAKS_SHA256`, a comment naming the hash source and "bump both together", and replaced the `checksums.txt` download + `--ignore-missing --check` with a check against the pinned digest. `curl -sSL` → `-fsSL --retry 3 --retry-all-errors` so an HTTP error fails at the fetch, not at the checksum.
- `SECURITY.md` mitigation bullet now says the digest lives in this repo, so a release whose checksums file was swapped along with the tarball still fails. §"What remains" already says a PR that "swaps a SHA" in `ci.yml` needs review, which covers editing the pin; no change there.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — local replay of the step (below)

- [x] Ran lint/type-check on changed code — `ruby -ryaml` parse of `ci.yml` → ok; actionlint not installed locally (N/A)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — N/A: CI + doc change, no UI

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Hash source: `gh api repos/gitleaks/gitleaks/releases/tags/v8.30.1` asset digest for `gitleaks_8.30.1_linux_x64.tar.gz` = `sha256:551f6fc8…2470eb`; identical to that release's `checksums.txt` line.
- A1 `grep -q "GITLEAKS_SHA256: '551f6fc8" .github/workflows/ci.yml && ! grep -q checksums.txt .github/workflows/ci.yml` → 0
- A2 replay (bash, `set -euo pipefail`, the step's exact curl + `sha256sum -c -` + `tar` lines, `RUNNER_TEMP` = scratchpad) → 0, `…linux_x64.tar.gz: OK`, extracted `gitleaks` is an ELF x86-64 binary. Tamper (appended one byte, same check) → 1, `sha256sum: WARNING: 1 computed checksum did NOT match`; the line after the check never ran. A GitHub runner confirms it on the next push.
- A3 `grep -n "GITLEAKS_SHA256" SECURITY.md && ! grep -q "checksums.txt" SECURITY.md` → 0 (L216)
- A4 `bash tools/drift-checks.sh` → 0
- External review (`/code-review medium`, this task's uncommitted diff only): pin, curl flags, `sha256sum -c -` and Pair H shape confirmed correct. Six notes, no blocker against Acceptance:
  1. **Fixed** — the new bullet's "before any untrusted code runs" overclaimed: the scan runs after `npm --prefix viz ci` in the same job (verified at `ci.yml:33`). Narrowed to "before the downloaded binary runs", and added that it does not guard against a compromised npm dependency.
  6. **Fixed** — §"What remains" now names the hand-set `GITLEAKS_SHA256`, no Dependabot tracking, and the bump procedure (both together, digest from GitHub's asset digest).
  2, 3, 5. **Filed** [[CORE-909]] (park) — move the scan ahead of `npm ci`, run once rather than per Node leg, adopt natabula's spine-deposit shape. Pre-existing step placement; out of this row's scope.
  4. **Filed** [[CORE-910]] (park) — `supply_chain` drift rule enforcing in-step `*_SHA256` + `sha256sum -c` for `releases/download` fetches.
- After the fixes: A1 → 0, A3 → 0 (L216, L231), drift → 0.
- Stale docs: `docs/VERSION-HISTORY.md:183` ("checksum-verified") is a historical release note — left as is. No duplication or dead code introduced.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SECURITY.md` (the one listed doc on this surface) is a deliverable and updated; every other AI-referenced doc: no change. `docs/VERSION-HISTORY.md:183` is history, left as is.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A: the hash-pin standard already lives in CORE-902 / natabula NAT-461; CORE-910 would make it enforced rather than conventional.

**Final Summary:**

- Changed: `.github/workflows/ci.yml` (gitleaks step: `GITLEAKS_SHA256` pin + `sha256sum -c -`, `checksums.txt` fetch removed, `curl -fsSL --retry 3 --retry-all-errors`, `set -euo pipefail`, source comment); `SECURITY.md` (mitigation bullet rewritten and scoped honestly; residual pin-maintenance risk added to §"What remains").
- Verification: A1/A3/A4 greps + drift → 0; A2 local replay passes on the real v8.30.1 tarball and fails closed on a one-byte tamper. A GitHub runner confirms it on the next push.
- Refactors: none. `touches:` reconciliation: `git diff --name-only` = `.github/workflows/ci.yml`, `SECURITY.md` — matches declared.
- Follow-ups: [[CORE-909]], [[CORE-910]] (both parked Low).
- Maintainability: one more hand-bumped hash beside the version, mirrored on shellcheck's; the comment and SECURITY.md name the bump procedure.

**Archived:** 2026-11-14
