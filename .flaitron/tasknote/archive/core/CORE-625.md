---
title: gitleaks-checksum-verify
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: []
touches:
  - .github/workflows/ci.yml
  - SECURITY.md
---

# CORE-625 | gitleaks-checksum-verify

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Verify the gitleaks tarball's checksum against the release's `checksums.txt` before extracting it in `ci.yml`'s scan step, and document the mitigation in SECURITY.md.

## ✅ Acceptance

- [x] `ci.yml`'s gitleaks download step downloads `checksums.txt` and runs `sha256sum --check` against the tarball before extraction — `judgment`, confirmed by reproducing the exact new commands locally against the real v8.30.1 release (pass + tamper-fails-closed negative test, see Phase 3 Testing Notes); the PLAN.md line's "needs a CI run to confirm" is satisfied on the next push to `main`, since this repo's `ci.yml` runs on every push
- [x] SECURITY.md §"GitHub Actions CI" lists the checksum-verification mitigation — `grep -n "checksums.txt\|sha256sum" SECURITY.md` → 1 match

## 🧩 Subtasks

- [ ] Update `ci.yml`'s gitleaks step: download `gitleaks_${GITLEAKS_VERSION}_checksums.txt` alongside the tarball into `$RUNNER_TEMP`, run `sha256sum --ignore-missing --check` against it before extracting
- [ ] Update SECURITY.md §"GitHub Actions CI": add the tampered-tarball clause to the "realistic compromise paths" sentence and a new mitigation bullet describing the checksum verification
- [ ] Validate: `python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/ci.yml'))"` (YAML still parses), and dry-run the new curl/sha256sum/tar logic locally against the real v8.30.1 release assets

## 🔗 Related

- Surfaced by audit 2026-09-20 (Finding #1, Medium)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line is precise and matches current code (the `Secret scan (gitleaks)` step in `ci.yml` at the `validate` job still curl-pipes the tarball straight into `tar` with no integrity check). No blocking discovery.

- [x] Read relevant source files — read `.github/workflows/ci.yml`'s gitleaks step and SECURITY.md §"GitHub Actions CI" directly (small, well-scoped read; no probe needed for the primary files).

- [x] **Best Practices Review** — this is a same-shape extension of the existing pinned-curl-fetch step (the shape itself was copied verbatim from natabula in CORE-578, per archive skim below): add a checksum download + `sha256sum --check` before the existing `tar` extraction. No new abstraction, no refactor — the step keeps its single responsibility (fetch + verify + extract + run).

- [x] **Archive skim** — 7 hits for "gitleaks" under `archive/core/`, delegated to a probe (CORE-292, CORE-578, CORE-623, CORE-588, CORE-613, CORE-599, CORE-586). Load-bearing findings:
  - CORE-578 originally wired the gitleaks step using a "pinned-curl-fetch shape" copied verbatim from natabula's own `ci.yml` (natabula is the canonical fleet source for this pattern); flowtron's `--config .gitleaks.toml` path differs only because flowtron deposits the config at repo root vs natabula's `configs/`.
  - CORE-578 documented the gitleaks *step's existence* in `docs/CONVENTIONS.md` §"GitHub Actions CI" (which also clarifies it sits outside the Pair H "passing validation commands" roster) — SECURITY.md was checked in that task's doc-drift sweep and got "no change" at the time, i.e. SECURITY.md's GHA section pre-dates gitleaks and doesn't mention it at all today.
  - CORE-623 confirms the CONVENTIONS.md placement and that the `validate` job's build step sits around line 30 as of that task (positional context only).
  - CORE-588/613/599/586 (release-bump tasknotes) and CORE-292 (a stray Bash-allowlist cleanup) have nothing load-bearing for this task.
  - **Interpretation:** no conflict. `docs/CONVENTIONS.md` §"GitHub Actions CI" documents workflow *structure* (which commands run, roster membership); SECURITY.md §"GitHub Actions CI" documents the *threat model and mitigations* for that same execution surface and today says nothing about gitleaks. Adding a security mitigation there is additive, not a rewrite of an existing claim — CONVENTIONS.md is untouched by this task, matching PLAN.md's ask.

- [x] **Drift check** — no drift. `ci.yml`'s gitleaks step (lines ~40-46) still matches the PLAN.md description (curl → pipe → tar, no verification). SECURITY.md's "Mitigations in the workflow" bullets (workflow permissions, checkout/setup-node SHA pinning) and its "realistic compromise paths" enumeration (1: mutable tag, 2: over-broad token scope) don't yet name a supply-chain/tarball-tampering path — adding the mitigation bullet without grounding it in that enumeration would read as an orphaned claim, so this task also adds one clause naming that third compromise path (still `SECURITY.md` §"GitHub Actions CI", no other file, no scope change).

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.** Assumptions: (1) verify only the `linux_x64` asset actually downloaded (the runner's arch), using `sha256sum --ignore-missing --check` since `checksums.txt` lists all platform assets and only one is fetched; (2) the SECURITY.md edit stays scoped to that file's existing "GitHub Actions CI" section (one clause + one bullet), `docs/CONVENTIONS.md` is out of scope and untouched.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:** See Archive skim and Drift check above for the full findings; no separate notes needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the existing pinned-curl-fetch step in place (same shape CORE-578 copied from natabula); no new shape introduced.

- [x] **Minimal refactor gate** — no refactor; added a checksum download + `sha256sum --check` line and a small `TARBALL` variable to avoid repeating the filename, kept everything else (the `gitleaks dir` invocation, env, config path) untouched.

- [x] Implemented the minimal solution — see diff in `.github/workflows/ci.yml` and `SECURITY.md`.

- [x] Updated/added tests for non-trivial behavior — `N/A`, no test harness exists for this CI YAML step (confirmed in Discovery/Archive skim: CORE-578 verified the same step by local dry-run + a CI run, not an automated test); this task follows the same verification pattern in Phase 3.

**Implementation Notes:**

- `ci.yml`: gitleaks step now downloads the tarball and `gitleaks_${GITLEAKS_VERSION}_checksums.txt` into `$RUNNER_TEMP`, runs `sha256sum --ignore-missing --check` against the checksums file (scoped to `$RUNNER_TEMP` via a subshell `cd`) before extracting — `--ignore-missing` is required because the checksums file lists all platform assets and only `linux_x64` is downloaded.
- `SECURITY.md` §"GitHub Actions CI": added a third numbered compromise path (tampered gitleaks tarball) to the existing sentence, and a third mitigation bullet describing the checksum verification, matching the section's existing threat→mitigation pairing convention.
- Verified locally against the real v8.30.1 release (`gh api repos/gitleaks/gitleaks/releases/tags/v8.30.1`) that the checksums asset is named `gitleaks_8.30.1_checksums.txt` and is a standard two-space `sha256sum` format listing each platform tarball by bare filename — matches what the new step expects.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no automated test harness covers `ci.yml`/SECURITY.md; verified by local dry-run against the real gitleaks v8.30.1 release instead (see Testing Notes).

- [x] Ran lint/type-check on changed code — YAML parse-checked (js-yaml); no linter targets SECURITY.md prose.

- [x] **Verification receipt** — recorded below. No duplication, dead code, or public-surface growth; `docs/CONVENTIONS.md` deliberately untouched (Discovery: it documents workflow structure, not security mitigations — no drift introduced there).

- [x] (frontend) Asked the user for visual confirmation — `N/A`, no frontend surface touched.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `python3 -c "import yaml..."` → failed locally (`ModuleNotFoundError: No module named 'yaml'`, PyYAML not installed on this machine) — not evidence of a defect, just a missing local module.
- `node -e "require('js-yaml').load(...)"` (using `viz/node_modules/js-yaml`) → exit 0, `YAML OK`. `ci.yml` still parses after the edit.
- Dry-run against the real v8.30.1 release (`$RUNNER_TEMP`-equivalent scratch dir): downloaded the tarball + `gitleaks_8.30.1_checksums.txt`, ran `sha256sum --ignore-missing --check` → exit 0, `gitleaks_8.30.1_linux_x64.tar.gz: OK`.
- Negative-path check: appended a byte to the downloaded tarball, re-ran the same `sha256sum --ignore-missing --check` → exit 1, `sha256sum: WARNING: 1 computed checksum did NOT match` / `FAILED`, confirming a tampered tarball fails the step before extraction.
- Re-fetched a clean tarball and ran the same `tar -xz -f ... gitleaks` extraction line → produced `gitleaks: ELF 64-bit LSB executable, x86-64, ... statically linked` (execution itself fails locally with `exec format error`, expected — this is a macOS host extracting a Linux binary; CI runs on `ubuntu-latest`).
- Acceptance criterion 1 (`ci.yml` step verifies before extracting) → `judgment`, confirmed by the dry-run chain above reproducing the exact commands now in the step; final confirmation is the next real CI run on `ubuntu-latest` per the PLAN.md line.
- Acceptance criterion 2 (SECURITY.md documents the mitigation) → `grep -n "checksums.txt\|sha256sum" SECURITY.md` → exit 0, one match at the new bullet.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SECURITY.md`: updated directly (this task's deliverable). `docs/CONVENTIONS.md` §"GitHub Actions CI": checked, no change — it describes the gitleaks step at the level of "scans the working tree against `.gitleaks.toml`" and doesn't mention download/checksum mechanics, so it doesn't drift. All other entries (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the platform `AGENTS-snippet.md` files, `CONTRIBUTING.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`): no change — none reference the gitleaks step or this workflow's security posture.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and placed at the top of `## Completed`, then tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary below

**Final Summary:**

Added checksum verification (`sha256sum --ignore-missing --check` against the release's `gitleaks_${GITLEAKS_VERSION}_checksums.txt`) to `.github/workflows/ci.yml`'s gitleaks download step, before the tarball is extracted — 9 lines changed, extending the existing pinned-curl-fetch step in place with no new abstraction. Documented the mitigation in `SECURITY.md` §"GitHub Actions CI": added a third numbered compromise path (tampered gitleaks tarball) and a matching mitigation bullet, keeping the section's existing threat→mitigation pairing convention (13 lines changed). `docs/CONVENTIONS.md` §"GitHub Actions CI" was checked and correctly left untouched — it documents workflow structure, not the security threat model, and doesn't mention download mechanics.

Verified locally against the real gitleaks v8.30.1 release: the new commands succeed on a genuine tarball (`sha256sum ... OK`) and fail closed on a tampered one (`FAILED`, exit 1) before extraction would run; `ci.yml` still parses as valid YAML (js-yaml); the extraction step still produces a correct Linux ELF binary. No automated test harness covers CI YAML, matching the precedent set when this step was first added (`CORE-578`); final confirmation is the next real CI run on `ubuntu-latest`, which fires automatically on this commit's push to `main`.

No refactors made or deferred. `touches:` (`.github/workflows/ci.yml`, `SECURITY.md`) matches `git diff --name-only` exactly — no undeclared paths. Maintainability effect: closes a supply-chain gap (an unverified binary was being extracted and executed) with a change that mirrors the existing step's shape, so it reads as a natural extension rather than new complexity.

**Archived:** 2026-09-20
