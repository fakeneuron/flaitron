---
title: gitleaks-ci-step
status: completed
tags: []
created: 2026-09-12
due:
related-tasks: []
touches:
  - .gitleaks.toml
  - .github/workflows/ci.yml
  - docs/CONVENTIONS.md
---

# CORE-578 | gitleaks-ci-step

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add gitleaks secret-scanning to flowtron's own CI `validate` job, using natabula's canonical `.gitleaks.toml` baseline.

## ✅ Acceptance

- [x] `.gitleaks.toml` deposited at repo root, matching natabula's canonical `configs/.gitleaks.toml` — `judgment` (content diff review against the source) — copied byte-identical
- [x] `gitleaks` step wired into `.github/workflows/ci.yml`'s `validate` job, pinned to v8.30.1, scanning with `--config .gitleaks.toml` — `judgment` (no test harness for CI YAML; verified by running gitleaks locally against the repo tree) — step added, YAML parse-verified
- [x] Local gitleaks run against the repo tree with the new config exits 0 (or documents accepted findings) — `gitleaks dir . --config .gitleaks.toml --no-banner --redact` — exit 0, "no leaks found"

## 🧩 Subtasks

- [x] Copy natabula's `configs/.gitleaks.toml` to flowtron's repo root as `.gitleaks.toml`
- [x] Add a `Secret scan (gitleaks)` step to the `validate` job in `.github/workflows/ci.yml`, matching natabula's pinned-curl-fetch shape
- [x] Run `gitleaks dir . --config .gitleaks.toml --no-banner --redact` locally against the flowtron tree and confirm exit code
- [x] Doc-drift sweep + closure

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** PLAN.md line as filed asked for two deposits — `.gitleaks.toml` and `.pre-commit-config.yaml` — plus the CI step, auto-routed from natabula's fleet backfill (NAT-245) without checking flowtron-self's own documented conventions. `docs/CONVENTIONS.md` §"Pre-commit hooks" is a deliberate, reasoned decision that flowtron does not ship pre-commit hooks (tied to the "Zero scripts" philosophy; Phase 3 is the inline gate). The CI gitleaks step does not conflict — flowtron already reversed its no-CI stance for exactly this off-machine-gate reason (`docs/CONVENTIONS.md` §"GitHub Actions CI"). Presented the operator a scope choice (CI-only vs. carve out a documented exception); operator chose CI-only. PLAN.md line re-scoped accordingly to drop the `.pre-commit-config.yaml` deposit.

- [x] Read relevant source files — `.github/workflows/ci.yml` (validate job), `docs/CONVENTIONS.md` §"GitHub Actions CI" and §"Pre-commit hooks", `.flowtron/tasknote/README.md` §"Archive layout" / §"AI-referenced docs", template. Read (with explicit operator approval for the out-of-repo paths) natabula's `configs/.gitleaks.toml`, `configs/.pre-commit-config.yaml`, and `.github/workflows/ci.yml` for the canonical shape.

- [x] **Best Practices Review** — the gitleaks step is a self-contained curl-fetch + scan step with no dependency on other steps in the job; no existing abstraction to extend beyond copying natabula's proven shape verbatim (adjusting only the `--config` path since flowtron deposits the file at repo root, not under `configs/`).

- [x] **Archive skim** — `archive/core/` skimmed for prior tasknotes touching `.gitleaks.toml` / CI. One hit, `CORE-292.md` (settings.json permission cleanup), which already carried a `gitleaks *` Bash allowlist entry — not load-bearing for this task's implementation, but confirms gitleaks usage was anticipated.

- [x] **Drift check** — `.gitleaks.toml` and `.pre-commit-config.yaml` confirmed absent from flowtron's repo root; `.github/workflows/ci.yml`'s `validate` job matches the PLAN.md description. The one drift found (pre-commit-vs-CONVENTIONS.md conflict) is captured above and resolved via re-scope.

- [x] Asked clarifying questions — surfaced the pre-commit/CONVENTIONS.md conflict via AskUserQuestion; operator chose "CI step only, skip pre-commit."

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared (`.gitleaks.toml`, `.github/workflows/ci.yml`)

**Discovery Notes:**

Natabula's `configs/.gitleaks.toml` extends the upstream default ruleset and allowlists three measured false-positive classes (flowtron tasknote archive `.md` files, test fixtures, committed placeholder/template files) — all directly applicable to flowtron's own tree, so it copies verbatim with no adaptation needed. Natabula's own `ci.yml` gitleaks step uses `--config configs/.gitleaks.toml` because natabula is where that file canonically lives; flowtron deposits `.gitleaks.toml` at its own repo root (per the PLAN.md line), so the step uses `--config .gitleaks.toml` instead — this is a path difference only, not a shape difference. Both the natabula pre-commit config and the gitleaks CI step are pinned to gitleaks v8.30.1; keep the CI step's `GITLEAKS_VERSION` in step with the deposited config's own documentation (the natabula file's header comment notes both consumers should stay in step — that comment lives in the `.pre-commit-config.yaml` header, which flowtron is not depositing, so flowtron's `.gitleaks.toml` carries no such cross-reference to keep in step; nothing further to adapt).

Full text of decline: `docs/CONVENTIONS.md` §"Pre-commit hooks" — "Flowtron does not ship pre-commit hooks... Hooks would duplicate that check at commit time on the same machine... it does not catch a landed change the way §'GitHub Actions CI' does by running off the authoring machine." This reasoning applies cleanly to a hypothetical flowtron pre-commit gitleaks hook too, so no exception is warranted without an explicit operator decision — which was sought and declined in favor of CI-only.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended natabula's canonical `.gitleaks.toml` shape verbatim (fleet-canonical deposit, kept byte-identical for `/natabula-layer-refresh` diffability); the CI step copies natabula's own `ci.yml` gitleaks step shape (pinned curl-fetch), adjusting only `--config` to point at the repo-root deposit path instead of `configs/.gitleaks.toml`.

- [x] **Minimal refactor gate** — no refactor; additive only (new file + one new CI step). Confirmed the addition doesn't disturb `docs/CONVENTIONS.md` §7.1 Pair H (validation-command presence check) — verified all six pinned validation command strings still `grep -F` in `ci.yml`.

- [x] Implemented the minimal solution — `.gitleaks.toml` deposited at repo root; `Secret scan (gitleaks)` step added to the `validate` job.

- [x] Updated/added tests for non-trivial behavior — `N/A`, no test harness for CI YAML in this repo; verified by local gitleaks run instead (see Testing Notes).

**Implementation Notes:**

`.gitleaks.toml` copied byte-identical from natabula `configs/.gitleaks.toml` (title, `[extend] useDefault = true`, and the three measured allowlist classes — flowtron's own `.flowtron/tasknote/archive/*.md` files match the first allowlist pattern already). The CI step is placed as the last step of the `validate` job (after the existing six commands, before the `drift` job), pinned to `GITLEAKS_VERSION: '8.30.1'` matching the locally-installed gitleaks version used for verification.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`, no test suite covers `.gitleaks.toml` / `ci.yml`; verified instead by a local gitleaks run (below) and a YAML/TOML parse check.

- [x] Ran lint/type-check on changed code — `N/A`, no linter targets YAML/TOML in this repo; validated via parse checks below.

- [x] **Verification receipt** — see commands below; no duplication, dead code, or stale docs introduced (doc-drift sweep below covers the one prose update needed).

- [ ] (frontend) Asked the user for visual confirmation — `N/A`, not a frontend change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `gitleaks dir . --config .gitleaks.toml --no-banner --redact` (local, gitleaks v8.30.1, matching the CI pin) → exit 0, "no leaks found"
- `js-yaml` parse of `.github/workflows/ci.yml` → OK, `validate` job now has 10 steps, new step parses as expected
- `python3 tomllib` parse of `.gitleaks.toml` → OK
- Pair H's six pinned validation-command strings (`AGENTS.md` §"Validation") confirmed still present in `ci.yml` via `grep -F` — the new step doesn't disturb that release-gate check

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `docs/CONVENTIONS.md` — **updated**: §"GitHub Actions CI" now names the new gitleaks step and clarifies it sits outside the Pair H "passing" roster.
  - `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`'s other sections, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change (none reference the CI validate-job step list or secret-scanning).

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form and placed at top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted below.

**Final Summary:**

Added gitleaks secret-scanning to flowtron's own CI. Deposited `.gitleaks.toml` at repo root (byte-identical copy of natabula's canonical `configs/.gitleaks.toml` baseline — upstream default ruleset + three measured allowlist classes, already applicable to flowtron's own tree). Wired a pinned-v8.30.1 `Secret scan (gitleaks)` step into `.github/workflows/ci.yml`'s `validate` job, scanning with `--config .gitleaks.toml` (path differs from natabula's own workflow since flowtron deposits at repo root, not `configs/`).

**Re-scoped mid-flight:** the original PLAN.md line also asked for a `.pre-commit-config.yaml` deposit (auto-routed from natabula's fleet backfill, NAT-245, without checking flowtron-self's own conventions). That contradicts `docs/CONVENTIONS.md` §"Pre-commit hooks" — a deliberate, reasoned decision flowtron does not ship pre-commit hooks. Surfaced the conflict to the operator; decided CI-only, dropping the pre-commit deposit and keeping the documented policy intact. PLAN.md line and this tasknote were re-scoped accordingly before Phase 2.

**Verification:** local `gitleaks dir . --config .gitleaks.toml --no-banner --redact` (v8.30.1, matching the CI pin) → exit 0, no leaks found. `.github/workflows/ci.yml` YAML-parse verified (`js-yaml`, 10 steps in `validate`). `.gitleaks.toml` TOML-parse verified (`tomllib`). Confirmed the addition doesn't disturb `docs/CONVENTIONS.md` §7.1 Pair H — all six pinned validation-command strings still present in `ci.yml` via `grep -F`.

**Documentation:** `docs/CONVENTIONS.md` §"GitHub Actions CI" updated to name the new step.

**`touches:` reconciliation:** declared `.gitleaks.toml`, `.github/workflows/ci.yml`, `docs/CONVENTIONS.md`; `git diff --name-only` plus this tasknote's own edit and the PLAN.md line change match — no undeclared paths.

**Maintainability effect:** additive only, no refactor. One new deposit file (byte-identical to its canonical fleet source, so future `/natabula-layer-refresh` diffs cleanly) and one new CI step scoped entirely to its own block; no coupling introduced to existing jobs or steps.

**Archived:** 2026-09-12
