---
title: validate FLOWTRON_UPDATE_LATEST at the seam; exit 2 naming the env var
status: completed
tags: []
created: 2026-08-10
due:
related-tasks: [CORE-EPIC-432]
---

# CORE-432.4 | validate FLOWTRON_UPDATE_LATEST at the seam; exit 2 naming the env var

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-432]]

## 🎯 Goal

Validate `FLOWTRON_UPDATE_LATEST` at the update-adopters seam and exit 2 with a message that names the env var when the value is invalid.

## ✅ Acceptance

- [x] When `FLOWTRON_UPDATE_LATEST` is set to a non-semver value (including empty), `main` exits 2 and the stderr message names `FLOWTRON_UPDATE_LATEST`
- [x] When unset, behavior is unchanged (`latestReleaseTag()` + exit 1 only if no tags)
- [x] When set to a valid `vX.Y.Z` tag, the CLI proceeds with that value (existing dry-run / apply fixtures still pass)
- [x] `node --test tools/update-adopters.test.mjs` passes; `node --check` clean on both updater files

## 🧩 Subtasks

- [x] In `main()`, when `process.env.FLOWTRON_UPDATE_LATEST !== undefined`, require `parseSemverTag(override)`; on failure `console.error` naming the env var + bad value, `process.exit(2)`
- [x] Extend header Exit-codes line so exit 2 covers invalid env override (usage/config error)
- [x] Add CLI tests: empty string → exit 2 + name; garbage → exit 2 + name
- [x] Run suite + `node --check` on both files

## 🔗 Related

- [[CORE-EPIC-432]] — parent epic: honest edge states
- [[CORE-432.2]] — sibling (completed): header version unknown display
- [[CORE-432.3]] — sibling (completed): prune epic children under filter
- [[CORE-432.N]] — terminal audit (not yet run)
- [[TEST-003]] — introduced the `FLOWTRON_UPDATE_LATEST` test seam
- [[CORE-424.2]] — exit-code contract (0 / 1 / 2)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Seam at `tools/update-adopters.mjs:553` still reads the env with bare `??` and only treats falsy `latest` as "No release tag found" (exit 1) — empty/garbage overrides are misreported. Matches epic theme.

- [x] Read relevant source files — `tools/update-adopters.mjs` (`main` 546–594, `parseSemverTag` 159–163, `latestReleaseTag` 237–240, `parseArgs` exit-2 pattern 108–138, header Exit codes 17–20); `tools/update-adopters.test.mjs` (`runCli` + CLI fixtures pinning the env)

- [x] **Best Practices Review** — responsibility is pure input validation at the single site that chooses `latest` internally; validator already exists (`parseSemverTag`); exit-2 + `console.error` matches `parseArgs` usage-error shape (CORE-419.4 / CORE-424.2). No new export; no dependency-boundary change. Deferred: none.

- [x] **Archive skim** — load-bearing hits: [[TEST-003]] (seam intro; unset = default); [[CORE-424.2]] (exit 0/1/2 contract; 2 = usage); [[CORE-424.4]] (mid-fleet exit 1). No prior validation of the env override.

- [x] **Drift check** — `FLOWTRON_UPDATE_LATEST` still only at `:553`; line numbers match PLAN epic citation. Header already documents exit 2 as usage error. No SPEC contract on this env var. PLAN shortname matches the plan formed here.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- Dishonest edge: `??` only nullishes on null/undefined. `FLOWTRON_UPDATE_LATEST=""` → `latest === ""` → `if (!latest)` → exit 1 *"No release tag found in …"* — blames missing tags, not the env. Non-semver like `garbage` propagates into `checkAdopter`/`tagsInRange` and fails opaquely.
- Validation rule: if env is **set** (including empty), require `parseSemverTag(value)`; else exit 2 naming `FLOWTRON_UPDATE_LATEST` and showing the bad value. Do **not** require the tag to exist in the checkout (overreach; tests pin real tags already; existence failures still surface later via git).
- Unset path unchanged: `await latestReleaseTag()` then exit 1 only when no tags.
- Assumptions: (1) "invalid" = fails `parseSemverTag` (`^v(\d+)\.(\d+)\.(\d+)$`); (2) exit 2 is the correct bucket (header: usage error), not exit 1 (adopter/preflight failure).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended `parseArgs` exit-2 + `console.error` usage-error shape and reused existing `parseSemverTag` (no new validator). DRY: single validation site at the only internal `latest` choice point.

- [x] **Minimal refactor gate** — no refactor; only the seam read + header Exit-codes clause. Deferred: none.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — two CLI cases under `describe('FLOWTRON_UPDATE_LATEST seam validation (CORE-432.4)')`

**Implementation Notes:**

`tools/update-adopters.mjs` (+18/−4 around the seam + header):
- When `FLOWTRON_UPDATE_LATEST` is set, require `parseSemverTag(override)`; else stderr names the env var and shows the bad value via `JSON.stringify`, `process.exit(2)`.
- Unset path still calls `latestReleaseTag()`; exit 1 only when no tags remain.
- Header Exit codes: exit 2 now documents "bad CLI args, or FLOWTRON_UPDATE_LATEST set to a non-semver value".

`tools/update-adopters.test.mjs` (+26): empty string and `not-a-tag` both assert `code === 2` and stderr names `FLOWTRON_UPDATE_LATEST`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs` → **34 pass, 0 fail** (108.5s; was 32)

- [x] Ran lint/type-check on changed code — `node --check` clean on both updater files

- [x] **Quality assertions** — no new export; validation reuses `parseSemverTag`; no dead code; header Exit-codes clause updated in the same diff (no stale code-facing doc)

- [x] (frontend) Asked the user for visual confirmation — N/A (operator CLI + tests only; no frontend)

**Testing Notes:**

- New suite block green; existing dry-run / apply fixtures still pass with valid `FLOWTRON_UPDATE_LATEST: latest`.
- Frontend 👁️ N/A.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 14 AI-referenced docs: **no change**. Grepped for `FLOWTRON_UPDATE` / exit-code claims: none of the cold-start docs assert env-override validation; tool header was the only surface carrying the exit-2 contract and was updated in Phase 2.

- [x] Closed — all Acceptance ticked; YAML `status: completed`; PLAN.md child line stubbed under active parent; tasknote → `archive/core/CORE-432.4.md`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Empty or garbage `FLOWTRON_UPDATE_LATEST` no longer pretends the checkout has no release tags. When the env var is set, the update-adopters seam validates with `parseSemverTag` and exits 2 naming the var; unset behavior is unchanged.

**Changed:** `tools/update-adopters.mjs` (+18/−4) — seam validation + header Exit-codes clause; `tools/update-adopters.test.mjs` (+26) — two exit-2 CLI cases.

**Verified:** suite 34/34 pass; `node --check` clean on both files.

**Docs:** AI-referenced set no change; tool header updated with the change.

**Maintainability:** dishonest empty/garbage path becomes an explicit usage error at the single internal `latest` choice site; no new API surface.

**Archived:** 2026-08-10
