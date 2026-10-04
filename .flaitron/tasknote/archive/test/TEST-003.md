---
title: updater-fixture-tag-coupling
status: completed
tags: []
created: 2026-08-03
due:
related-tasks: []
---

# TEST-003 | updater-fixture-tag-coupling

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Decouple `tools/update-adopters.test.mjs` fixtures from live `git tag` data so the 6 currently-failing tests exercise their intended classification paths instead of short-circuiting on the migration-bearing v5.15.0 release.

## ✅ Acceptance

- [ ] All 24 `tools/update-adopters.test.mjs` tests pass (`node --test`), including the 6 currently red
- [ ] Fixture `latest` / `previous` no longer track the moving head of the tag list — a future migration-bearing release cannot re-break the suite
- [ ] The two CLI subprocess tests still assert the end-to-end would-bump / bumped paths (no coverage weakened)
- [ ] `migrationBearingTags (real tags)` retains its deliberate real-tag coverage of the classifier
- [ ] Both files pass `node --check`; `git diff --check` clean

## 🧩 Subtasks

- [ ] Add the `FLOWTRON_UPDATE_LATEST` test seam to `main()` in `tools/update-adopters.mjs`
- [ ] Replace the `before()` hook's newest-tag derivation with a newest-clean-adjacent-pair scan
- [ ] Thread an `env` option through the test helper `runCli`
- [ ] Pass the fixture `latest` via env in both CLI subprocess tests
- [ ] Run the full updater suite + `node --check` on both files

## 🔗 Related

- [[CORE-360]] — introduced the updater suite and its shared local-clone fixture architecture
- [[TEST-002.3]] — prior fixture-portability repair (`--no-hardlinks` at both clone layers)
- [[TEST-002.4]] — registered the suite as a `/ft-release` gate
- [[CORE-366]] — added the non-1 rethrow behavior one of the red tests covers

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The filed failure reproduces exactly as described — `node --test tools/update-adopters.test.mjs` is 18 pass / 6 fail, and every failure traces to the `before()` hook deriving `latest` from the live newest tag, which is now the migration-bearing v5.15.0.

- [x] Read relevant source files — `tools/update-adopters.test.mjs`, `tools/update-adopters.mjs`, the `v5.15.0` / `v5.14.1` tag annotations, and the archived `TEST-002.3` / `TEST-002.4` fixture tasknotes

- [x] **Best Practices Review** — the coupling lives entirely in the test file's `before()` hook and `runCli` helper, both established by [[CORE-360]]; the fixture layer keeps its shared-mirror + `makeAdopter` shape. The one production edit is a single env-read at the CLI entrypoint (`main()`), which is the only place the "which tag is latest" decision is made and not already injectable — `checkAdopter` / `applyBump` / `gitlinkDrift` all take `latest` as a parameter. No refactor, no new abstraction, no exported-surface growth; deferred cleanup: none identified.

- [x] **Archive skim** — `grep -l update-adopters .flowtron/tasknote/archive/**/*.md` surfaced 33 notes; the load-bearing ones are [[CORE-360]] (built the suite, shared local-clone mirror, temp adopter roots), [[TEST-002.3]] (made both clone layers portable with `--no-hardlinks`; explicitly preserved the two-layer mirror as deliberate), [[TEST-002.4]] (registered the suite as a `/ft-release` gate — so red here blocks releases), and [[CORE-366]] (added the non-1 rethrow guard that failing test #8 covers). Both TEST-002 notes record a 21-test baseline; the suite is now 24 — growth since, not drift.

- [x] **Drift check** — every cited fact still matches current code. `before()` at `tools/update-adopters.test.mjs:59-78` derives `latest` via `latestReleaseTag()` and `previous` as the next distinct semver tag. The migration gate at `tools/update-adopters.mjs:346-354` runs *before* the staged-changes, dirty-worktree, and bump paths, which is why the short-circuit masks four distinct expectations. `main()` reads `latest` at `tools/update-adopters.mjs:449`. PLAN.md line and the SPEC contracts (`§"What flowtron does NOT provide"` — the updater is the carved-out CLI exception) are consistent with this work; no contradiction.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — Asked one: how to decouple the two CLI subprocess tests, which cannot reach `main()`'s internal `latestReleaseTag()` call. Operator chose the **env seam on the latest tag** (one production line) over a synthetic-origin-repo rewrite or weakening the CLI assertions.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

The suite's fragility is not that it reads real tags — historical tag
annotations are immutable — but that it tracks the **moving head** of the tag
list. Any release whose Migration block requires project-side edits silently
converts four "this path is reachable" fixtures into migration-gate skips.
v5.15.0 is simply the first release to do so since the suite was written.

Fix shape: pin the fixtures to the newest *adjacent tag pair whose range is
non-migration-bearing*, computed rather than hardcoded, so the pair
self-heals if v5.14.1 ever stops qualifying. Verified against real data —
v5.15.0 is bearing; v5.14.1, v5.14.0, v5.13.0, v5.12.0, v5.11.0, v5.10.1 all
open with the all-clear sentinel — so the scan currently resolves to
`latest = v5.14.1`, `previous = v5.14.0`.

The `migrationBearingTags (real tags)` describe block stays on real tags
(v5.0.0 BREAKING, v5.10.1/v5.11.0 all-clear): that block is testing the
classifier itself, where real annotations are the point, not incidental
coupling.

Discovery surfaced no significant scope deviation — the clarifying question
resolved an implementation choice within the filed scope, not a change to
which files are touched or what the task delivers → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — kept [[CORE-360]]'s shared-mirror + `makeAdopter` fixture architecture and [[TEST-002.3]]'s `--no-hardlinks` clone policy untouched; the change is confined to how `before()` picks its tag pair and how `runCli` forwards env. The `env` option threads through `runCli`'s existing options-object shape rather than adding a second parameter, matching the `expectFail` precedent.

- [x] **Minimal refactor gate** — no refactor. The one production edit is a single env-read at `main()`, the only place `latest` is chosen internally; every other entry point already accepts it as a parameter, so no threading or signature change was needed. Deferred cleanup: none identified.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — added `latestReleaseTag (real tags)`, a one-assertion block restoring coverage the fixture change orphaned

**Implementation Notes:**

Three edits, 50 insertions / 9 deletions across two files:

1. `tools/update-adopters.mjs:449` — `main()` now reads
   `process.env.FLOWTRON_UPDATE_LATEST ?? (await latestReleaseTag())`, with a
   comment naming it a test seam and explaining why this is the only site that
   needs one. Default behavior is byte-identical when the env var is unset.
2. `tools/update-adopters.test.mjs` `before()` — replaced the
   newest-tag-and-its-successor derivation with a newest-first scan for the
   first adjacent pair whose range is non-migration-bearing. Adjacency is what
   makes the single-tag `migrationBearingTags([tags[i]])` check sufficient:
   `tagsInRange(previous, latest)` is exactly `[latest]` for an adjacent pair.
3. `runCli` gained an `env` option (merged over `process.env`), and both CLI
   subprocess tests pass `FLOWTRON_UPDATE_LATEST: latest` so the child process
   classifies against the same fixture pair as the in-process tests.

The `latestReleaseTag` import became unused once `before()` stopped calling it
— rather than drop the import and silently lose the export's only coverage, a
targeted test asserts it returns the newest semver tag in the checkout. That
keeps the real-tag behavior pinned while the fixtures move off it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs`: **25 tests, 25 pass, 0 fail / cancelled / skipped** (was 24 tests, 18 pass / 6 fail)

- [x] Ran lint/type-check on changed code — `node --check` clean on both files; `git diff --check` clean

- [x] **Quality assertions** — the seam adds one env-read and no exported surface; `FLOWTRON_UPDATE_LATEST` is documented in place as test-only. The `before()` scan replaces two derivation lines with a bounded loop over an already-materialized tag list — no new helper, no duplication with `tagsInRange` (which it deliberately leans on adjacency to avoid calling). No dead code: the orphaned `latestReleaseTag` import is now covered by a real assertion rather than left dangling. No stale comments — the shared-mirror comment from [[TEST-002.3]] still describes what it describes.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (test fixtures + one CLI line; no frontend or rendered surface)

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

- Pre-change baseline: 24 tests / 18 pass / 6 fail, every failure tracing to
  the migration gate short-circuiting fixtures pinned at the live `previous`.
- Post-change: 25 / 25 green. The added test is the `latestReleaseTag` block.
- Seam regression check — ran the CLI against an empty temp workspace both
  ways: with no env it still reports `latest release: v5.15.0` (live tag,
  unchanged default); with `FLOWTRON_UPDATE_LATEST=v5.14.1` it reports
  `v5.14.1`. The seam is inert unless explicitly set.
- The fixture scan currently resolves to `latest = v5.14.1` /
  `previous = v5.14.0`. When a future clean release lands, the scan moves the
  pair forward on its own; when a bearing one lands, it skips past it.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — grepped all twelve AI-referenced docs for `update-adopters`; four mention it, none describe the fixture design or the CLI's internal latest-tag resolution, so none go stale:

  - `README.md` — no change (line 245 names the suite's existence only)
  - `SPEC.md` — no change (lines 58 / 751 cover the CLI carve-out, not internals)
  - `docs/MIGRATION.md` — no change (lines 208 / 483 cite the suite as a gate and the fleet-sweep behavior)
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change (line 90 cites the suite as a release gate; still accurate and still green)
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — all five Acceptance criteria ticked; YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed 2026-08-03.` and moved to the top of `## Completed`, tasknote moved to `.flowtron/tasknote/archive/TEST/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

Cleared the registered release gate: `tools/update-adopters.test.mjs` went from
24 tests / 6 failing to 25 / 25 green, and its fixtures no longer break when a
release ships a Migration block.

The suite's `before()` hook had derived `latest` from the live newest tag, so
the migration-bearing v5.15.0 short-circuited `checkAdopter`'s migration gate
ahead of the staged-changes, dirty-worktree, bump, and rethrow paths four
fixtures were written to exercise. Fixtures now scan newest-first for the
newest *adjacent* tag pair whose range is non-migration-bearing (currently
v5.14.0 → v5.14.1), computed rather than hardcoded so the pair advances on its
own as releases land. The two CLI subprocess tests, which can't reach `main()`'s
internal `latestReleaseTag()` call, get a one-line `FLOWTRON_UPDATE_LATEST` env
seam — chosen by the operator over a synthetic-origin-repo rewrite or weakening
the CLI assertions, so the end-to-end would-bump and `--apply` paths stay
covered.

Diff is 50 insertions / 9 deletions across two files. Verification:
`node --test` 25/25; `node --check` clean on both files; `git diff --check`
clean; and a direct check that the CLI's default output is unchanged when the
seam env var is unset. No refactor was needed or deferred. All twelve
AI-referenced docs verified current — four mention the suite, none describe its
internals. Maintainability effect: the release gate is green again and is now
insulated from the one event that reliably broke it, so a future breaking
release no longer silently converts four reachability fixtures into skips.

**Archived:** 2026-08-03
