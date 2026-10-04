---
title: CI workflow hardening
status: completed
tags: []
created: 2026-08-12
due:
related-tasks: [CORE-430.N]
---

# CORE-434 | CI workflow hardening

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-430.N]]

## 🎯 Goal

Harden `.github/workflows/ci.yml` with least-privilege `GITHUB_TOKEN` permissions and SHA-pinned actions, and document the CI surface in `SECURITY.md`'s threat model.

## ✅ Acceptance

- [x] `.github/workflows/ci.yml` declares workflow-level `permissions: contents: read`
- [x] `actions/checkout` and `actions/setup-node` are pinned to full-length commit SHAs of their current v4.x releases, with a `# vX.Y.Z` comment
- [x] `SECURITY.md` has a threat-model entry for the CI surface covering `permissions:`, SHA pins, and `pull_request` (not `pull_request_target`)
- [x] Existing `run:` steps (install + six AGENTS.md §Validation commands) are unchanged

## 🧩 Subtasks

- [x] Add workflow-level `permissions: contents: read` to `.github/workflows/ci.yml`
- [x] Pin `actions/checkout` to `11d5960a326750d5838078e36cf38b85af677262` (`# v4.4.0`) and `actions/setup-node` to `49933ea5288caeca8642d1e84afbd3f7d6820020` (`# v4.4.0`)
- [x] Add `SECURITY.md` §"GitHub Actions CI" under Threat model
- [x] Parse-check the workflow YAML; confirm `run:` steps still match AGENTS.md §Validation

## 🔗 Related

- [[CORE-430.N]] — audit that surfaced this as F3
- [[CORE-EPIC-430]] / [[CORE-430.2]] — shipped the workflow this hardens
- [[CORE-435]] / [[CORE-436]] — sibling CORE-430.N follow-ups (hooks-vs-CI rationale; README badge); out of scope here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line still matches HEAD — `ci.yml` has no `permissions:` and pins `@v4` tags; `SECURITY.md` still has no CI threat-model entry.

- [x] Read relevant source files — `.github/workflows/ci.yml` (full), `SECURITY.md` (full threat model), `docs/CONVENTIONS.md` §"GitHub Actions CI", archived [[CORE-430.N]] F3 + [[CORE-430.2]] Implementation Notes. No probe — two deliverable files, enumerable.

- [x] **Best Practices Review** — GitHub's hardening guide is the established pattern: workflow-level `permissions:` (least privilege for `GITHUB_TOKEN`) and full-length commit SHA pins with a version comment (immutable release + Dependabot-readable). In-repo, `ci.yml` is the sole workflow; extend it in place, do not add a second file. `SECURITY.md` threat-model sections are short named `###` blocks with mitigations; add a sibling, do not fold CI into prompt-injection or submodule-pin prose. No in-scope refactor. Deferred: major-bump of checkout/setup-node off v4 (PLAN says pin, not bump); Dependabot for action updates; CONVENTIONS.md mention of SHA pins (CORE-435/436 own adjacent CI docs).

- [x] **Archive skim** — `archive/core/` hits on `ci.yml` / `SECURITY.md`: [[CORE-430.2]] authored the workflow with mutable `@v4` tags and no `permissions:`; [[CORE-430.N]] F3 is this task's source (hardening + doc gap, not a live vuln — `pull_request` not `pull_request_target`); [[CORE-433.4]] Pair H diffs AGENTS.md §Validation fences against `ci.yml` `run:` steps minus the install — `uses:` / `permissions:` edits must not touch `run:` lines. Later SECURITY.md edits (CORE-438.4 Cursor line, CORE-425.4 viz bullets, CORE-427 tag pin) do not cover CI.

- [x] **Drift check** — PLAN.md cites `.github/workflows/ci.yml` and `SECURITY.md`; both paths exist and the cited gaps are still true (`uses: actions/checkout@v4` / `setup-node@v4`, no `permissions:` block, threat model has Prompt injection / Submodule supply-chain / Visualizer only). SPEC.md does not contract the CI workflow (CORE-430.N: "CI lives outside the workflow contract layer"). No contradiction with Pair H: it scopes `run:` steps, not `uses:`.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No clarifications needed. Assumptions:

- Pin the current v4.x line (latest: checkout `v4.4.0`, setup-node `v4.4.0`), not a major bump to v5/v6/v7.
- Workflow-level `permissions:` (GitHub recommended), not job-level — one job, same effect, matches the least-privilege default pattern.
- Trailing `# v4.4.0` comments on SHA pins (human + Dependabot convention).
- SHAs resolved live from `gh api repos/actions/{checkout,setup-node}/git/ref/tags/v4.4.0` (both `type: commit`): checkout `11d5960a326750d5838078e36cf38b85af677262`, setup-node `49933ea5288caeca8642d1e84afbd3f7d6820020`.
- `SECURITY.md` gets a new `### GitHub Actions CI` threat-model section; CONVENTIONS.md / README / AGENTS.md unchanged.
- Do not add repository secrets, `pull_request_target`, or extra jobs.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern: GitHub hardening guide (workflow-level `permissions:` + full-length SHA pins with version comments) plus `SECURITY.md`'s existing short `###` threat-model blocks. Extended both in place; no second workflow file, no fold-in to prompt-injection or submodule sections.

Minimal refactor: none. `run:` steps left byte-identical so Pair H stays green. Deferred: major-bump off v4; Dependabot for action updates; CONVENTIONS.md mention of SHA pins (CORE-435/436 own adjacent CI docs).

Tests: N/A — no test harness for workflow YAML; Phase 3 parse-check + Pair H CI-verbatim stand in.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- `ruby -ryaml` parse of `.github/workflows/ci.yml` → `permissions={contents=>read}`; both `uses:` are 40-char SHAs; `run:` list unchanged (install + six AGENTS commands).
- Pair H CI-verbatim (`AGENTS.md` §Validation fences vs `ci.yml` `run:` minus install) → clean, exit 0.
- Frontend 👁️ N/A — no UI surface.
- Quality: no duplication, no dead code, no public-surface growth. `SECURITY.md` one-liner in the AI-referenced list still names the threat-model purpose; CI is a new subsection of that same doc.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
  - `SECURITY.md` — **updated** (new `### GitHub Actions CI` threat-model section)
  - `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` — no change (CI security posture is not their surface; CONVENTIONS.md still correctly describes the command roster)

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Hardened the CI workflow CORE-430.2 shipped: least-privilege `GITHUB_TOKEN` and immutable action pins, plus the threat-model entry CORE-430.N F3 said was missing.

- `.github/workflows/ci.yml` — workflow-level `permissions: contents: read`; `actions/checkout@11d5960a…` (`# v4.4.0`) and `actions/setup-node@49933ea5…` (`# v4.4.0`); `run:` steps unchanged.
- `SECURITY.md` — new `### GitHub Actions CI` covering `permissions:`, SHA pins, `pull_request` vs `pull_request_target`, and PR-review residual risk.
- Verification: YAML parses; Pair H CI-verbatim clean.
- Refactors: none. Deferred major-bump off v4, Dependabot, CONVENTIONS.md SHA-pin mention.
- Documentation: `SECURITY.md` updated; remaining AI-referenced docs no change (CI lives outside the SPEC contract layer; CONVENTIONS.md describes the command roster, not the security posture).
- Maintainability: a retagged `@v4` can no longer silently change what CI runs; token scope is declared in-tree instead of inherited.

**Archived:** 2026-08-12
