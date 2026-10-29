---
title: github-secret-controls
status: completed
tags: []
created: 2026-10-29
due:
related-tasks: [CORE-719, CORE-578]
touches:
  - .flaitron/PLAN.md
---

# CORE-842 | github-secret-controls

[← PLAN.md](../../PLAN.md) · ✅ Completed · 🔗 [[CORE-719]] · [[CORE-578]]

## 🎯 Goal

Enable GitHub secret scanning and secret-scanning push protection on the public fakeneuron/flaitron repo and verify both read `enabled`, leaving the gitleaks CI scan untouched.

## ✅ Acceptance

- [x] Secret scanning reads `enabled` — `gh api repos/fakeneuron/flaitron --jq .security_and_analysis.secret_scanning.status` prints `enabled`
- [x] Push protection reads `enabled` — `gh api repos/fakeneuron/flaitron --jq .security_and_analysis.secret_scanning_push_protection.status` prints `enabled`
- [x] Repo stays public; no alert values read — `gh api repos/fakeneuron/flaitron --jq .visibility` prints `public`; `judgment` that no `secret-scanning/alerts` endpoint was called (transcript)
- [x] gitleaks preserved — `grep -q gitleaks .github/workflows/ci.yml && test -f .gitleaks.toml`

## 🧩 Subtasks

- [x] Recheck `security_and_analysis` metadata (visibility, owner type, current statuses)
- [x] Get operator authorization for the settings write
- [x] `PATCH repos/fakeneuron/flaitron` enabling `secret_scanning` then `secret_scanning_push_protection`
- [x] Re-GET and verify both statuses + visibility

## 🔗 Related

- [[CORE-719]] — predecessor: enabled Dependabot alerts via `gh api`; its recap noted secret scanning still disabled
- [[CORE-578]] — gitleaks CI secret scan, preserved here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Live `gh api repos/fakeneuron/flaitron` on 2026-10-29 still reads `secret_scanning` and `secret_scanning_push_protection` as `disabled`; repo is public and user-owned, so both controls are free.

- [x] Read relevant source files — repo metadata via `gh api` (visibility, owner type, `security_and_analysis` block); no source code in scope

- [x] **Best Practices Review** — N/A: a repository-settings change through `gh api`, no code or module boundary touched

- [x] **Archive skim** — `archive/core/` (CORE row confirmed in README table). Hits: CORE-719 (Dependabot enablement via `gh api` PUT; recap flagged secret scanning as still disabled, out of scope) and CORE-578 (gitleaks CI step + `.gitleaks.toml`, to preserve). Nothing load-bearing beyond the `gh api` route precedent.

- [x] **Drift check** — no drift: PLAN.md line's NAT-471 reading (both disabled) matches live state; SPEC route (no code deliverable, PLAN-only `touches:`) matches the CORE-719 precedent

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — asked for write authorization; operator chose "Enable both" (secret scanning + push protection only; non-provider patterns and validity checks stay off)

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Live metadata 2026-10-29: `visibility: public`, owner `User`, `dependabot_security_updates: enabled`, `secret_scanning: disabled`, `secret_scanning_push_protection: disabled`, `secret_scanning_non_provider_patterns: disabled`, `secret_scanning_validity_checks: disabled`.
- Scope is the two PLAN-named controls only. Non-provider patterns and validity checks are left as they are (not named; validity checks would call out to providers with found tokens).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the CORE-719 `gh api` repo-settings route

- [x] **Minimal refactor gate** — N/A: no code touched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: GitHub setting, no code

**Implementation Notes:**

- `gh api -X PATCH repos/fakeneuron/flaitron` with `{"security_and_analysis":{"secret_scanning":{"status":"enabled"}}}` → response `secret_scanning: enabled`.
- Second PATCH with `secret_scanning_push_protection` → response `secret_scanning_push_protection: enabled`.
- Gotcha: plain `GET repos/fakeneuron/flaitron` served a cached body still showing push protection `disabled` for several reads; a `Cache-Control: no-cache` + cache-busting query read showed `enabled`, after which the plain GET also returned `enabled`. Not a failed write.
- Non-provider patterns and validity checks left `disabled` per operator choice. No `secret-scanning/alerts` endpoint called; visibility untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: no code changed

- [x] Ran lint/type-check on changed code — N/A: no code changed

- [x] **Verification receipt** — receipts below; no code changed

- [x] **External review** — N/A: the repo diff is a PLAN.md stub flip plus this tasknote; the deliverable is a GitHub setting verified directly via `gh api`

- [x] (frontend) Asked the user for visual confirmation — N/A: not frontend

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `gh api repos/fakeneuron/flaitron --jq .security_and_analysis.secret_scanning.status` → 0 (`enabled`)
- `gh api repos/fakeneuron/flaitron --jq .security_and_analysis.secret_scanning_push_protection.status` → 0 (`enabled`; first reads returned a cached `disabled`, see Implementation Notes)
- `gh api repos/fakeneuron/flaitron --jq .visibility` → 0 (`public`)
- `grep -q gitleaks .github/workflows/ci.yml && test -f .gitleaks.toml` → 0

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change: `git grep -i -E "secret scanning|secret-scanning|push protection" -- '*.md'` (archive excluded) hits nothing outside this task

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A (the GET-cache gotcha is recorded here; not an always-loaded rule)

**Final Summary:**

Secret scanning and push protection are now enabled on fakeneuron/flaitron, both verified with `gh api` (repo still public, gitleaks CI unchanged). Changed files: `.flaitron/PLAN.md` (Completed stub; the now-empty High section reads `(none)`) and this tasknote. `touches:` reconciliation: `git diff --name-only` → `.flaitron/PLAN.md`, matching the declared scope. No refactors. Non-provider patterns and validity checks stay off by operator choice.

**Archived:** 2026-10-29
