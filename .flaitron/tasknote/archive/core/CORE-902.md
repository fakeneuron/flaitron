---
title: install-test-shellcheck-pin
status: completed
tags: []
created: 2026-11-14
due:
related-tasks: [CORE-851]
touches:
  - .github/workflows/install-test.yml
---

# CORE-902 | install-test-shellcheck-pin

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-851]]

## 🎯 Goal

`install-test.yml`'s shellcheck job runs a pinned shellcheck release, fetched by hand and checked against a SHA-256, instead of the one on the floating `ubuntu-latest` image.

## ✅ Acceptance

- [x] The shellcheck job declares `SHELLCHECK_VERSION` and `SHELLCHECK_SHA256` and fetches the release asset — `grep -q 'SHELLCHECK_VERSION' .github/workflows/install-test.yml && grep -q 'SHELLCHECK_SHA256' .github/workflows/install-test.yml`
- [x] The step downloads to a file with `curl -fsSL --retry 3 --retry-all-errors`, checks it with `sha256sum -c`, and only then extracts — `grep -q 'sha256sum -c' .github/workflows/install-test.yml && grep -q 'retry-all-errors' .github/workflows/install-test.yml`
- [x] The pinned hash is the asset's real GitHub digest — `gh api repos/koalaman/shellcheck/releases/tags/v0.11.0 --jq '.assets[]|select(.name|test("linux.x86_64.tar.xz"))|.digest'` equals the workflow's `SHELLCHECK_SHA256`
- [x] The workflow is valid YAML — `ruby -ryaml -e 'YAML.load_file(".github/workflows/install-test.yml")'`
- [x] The pinned version lints the repo clean, the same as the CI command — `shellcheck -s sh install.sh tools/install.test.sh` (local shellcheck is 0.11.0, the pinned version)
- [x] The live CI run of the pinned job is green — `judgment`: N/A here, not run; it needs a push, which needs an explicit go
- [x] `bash tools/drift-checks.sh` passes — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Replace the `shellcheck (POSIX sh)` step with the pinned-fetch step (shape: fakeneuron-nas `ci.yml` "Shell lint")
- [x] Add a short comment above the job naming why (image floats, NAT-458) and where the hash came from (GitHub digest; shellcheck ships no checksums file)
- [x] Doc-drift check on `docs/CONVENTIONS.md` §CI install-test paragraph

## 🔗 Related

- [[CORE-851]] — predecessor; created `install-test.yml`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `install-test.yml` still runs a bare `shellcheck` from the runner image; the PLAN line matches the file.

- [x] Read relevant source files — `.github/workflows/install-test.yml`, natabula `docs/STACK-TENDENCIES.md` §"Runner image", fakeneuron-nas `.github/workflows/ci.yml` shellcheck step

- [x] **Best Practices Review** — `N/A`: one CI step; no module boundaries or abstractions involved

- [x] **Archive skim** — `archive/core/` grepped for `install-test` / `shellcheck`: CORE-851 (created the workflow) is the only relevant hit; nothing contradicts the change

- [x] **Drift check** — PLAN line and the workflow agree; the natabula standard and the precedent agree on shape. `e2e` and `install.sh` are untouched

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

- Standard (natabula STACK-TENDENCIES §"Runner image", NAT-461): a tool preinstalled on the image owns its own pin. Fetch a fixed release, put `*_VERSION` beside `*_SHA256`, download to a file with `curl -fsSL --retry 3 --retry-all-errors`, check with `sha256sum -c`, then extract. Take the hash from the GitHub asset digest when the release has no checksums file (shellcheck has none).
- Precedent: fakeneuron-nas `ci.yml` "Shell lint (shellcheck)" step pins `0.11.0` with the `.tar.xz` linux x86_64 digest `8c3be12b…7198`. I re-checked that digest against the GitHub release API for `koalaman/shellcheck` v0.11.0 and it matches. Local shellcheck is also 0.11.0, so the local and CI findings stay the same.
- Only the `shellcheck` job needs the pin. `e2e` runs on macOS too and never calls shellcheck.
- Unlike the precedent, the binary is run directly from the extracted dir and not added to `GITHUB_PATH`, because nothing else in this workflow calls `shellcheck`.
- No clarifications needed. Assumptions: version 0.11.0 (the fleet pin and the local version); linux x86_64 `.tar.xz` asset; no `justfile` or local-mirror version check, since flaitron has none for shellcheck and the task does not ask for one. No tracked doc cites the unpinned behavior, so the doc-drift check only needs to confirm `docs/CONVENTIONS.md` still reads true.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: extended the fakeneuron-nas "Shell lint" pin shape (version + SHA env, `curl -fsSL --retry 3 --retry-all-errors`, `sha256sum -c`, then `tar -xJf`). Same version and hash, so the two repos' pins match.
- Minimal refactor gate: none. Only the `shellcheck` job's step changed, plus a comment above it. The shellcheck arguments (`-s sh install.sh tools/install.test.sh`) are unchanged.
- Dropped the precedent's `GITHUB_PATH` line: this job runs the binary by its full path and nothing else calls shellcheck.
- Tests: `N/A` — a CI step has no unit-test home. Instead I downloaded the real release asset to the scratchpad and confirmed its SHA-256 and that the `shellcheck-v0.11.0/shellcheck` tar member exists, which is the extraction path the step uses.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) `N/A` — no UI change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Targeted tests: `N/A` — a CI step has no unit-test home. The real release asset was fetched to the scratchpad: its SHA-256 matched the pin and the `shellcheck-v0.11.0/shellcheck` member exists, so the step's extraction path is real.
- Lint: `shellcheck -s sh install.sh tools/install.test.sh` → 0 (local shellcheck 0.11.0 = the pin); `ruby -ryaml … YAML.load_file` → 0.
- Receipt (re-run after the last comment edit):
  - `grep -q SHELLCHECK_VERSION … && grep -q SHELLCHECK_SHA256 …` → 0
  - `grep -q 'sha256sum -c' … && grep -q retry-all-errors …` → 0
  - pinned hash == GitHub API digest for the linux x86_64 `.tar.xz` (`gh api repos/koalaman/shellcheck/releases/tags/v0.11.0`) → 0
  - YAML load → 0
  - `shellcheck -s sh install.sh tools/install.test.sh` → 0
  - `bash tools/drift-checks.sh` → 0
  - Not run: the live `install-test.yml` run (needs a push; no push without an explicit go).
- Duplication / dead code / stale docs: none; one step replaced, comment added.
- External review (`/code-review medium`, this task's diff only): no correctness findings, 3 notes.
  - Ticket-ID mismatch in the comment (NAT-458 vs NAT-461) — fixed: both are correct for different things (458 = the runner-image verdict, 461 = the hash pin), so the comment now cites each for its own claim.
  - Hard-coded tarball layout / x86_64 asset name — no change: the comment says bump both pins together, and a mismatch fails loudly at `tar`; the nas precedent has the same shape.
  - No explicit `shell:` while using `pipefail` — no change: `ubuntu-latest` defaults to bash, and the precedent is identical.
  - The reviewer did not re-check the digest; I did (receipt line 3).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

`install-test.yml`'s `shellcheck` job now fetches shellcheck 0.11.0 (linux x86_64 `.tar.xz`) with `SHELLCHECK_VERSION` + `SHELLCHECK_SHA256`, checks it with `sha256sum -c`, and runs the extracted binary — the fakeneuron-nas pin shape. The hash was confirmed against the GitHub release digest. Doc-drift sweep: no change (`docs/CONVENTIONS.md` still describes the job correctly). `touches:` reconciled: `git diff --name-only` shows only `.github/workflows/install-test.yml` (plus this tasknote and PLAN.md closure files). Live CI run not yet observed — it needs a push.

**Archived:** 2026-11-14
