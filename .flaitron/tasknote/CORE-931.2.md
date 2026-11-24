---
title: release-module
status: starter
tags: [refactor, updater]
created: 2026-11-24
related-tasks: [CORE-EPIC-931]
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters/release.mjs
  - tools/update-adopters.test.mjs
---

# CORE-931.2 | release-module

[← PLAN.md](../PLAN.md) · 🌱 Starter (filed 2026-11-24)

## 🌱 Starter context

_Captured 2026-11-24 during the `/ft-refactor tools/update-adopters.mjs` depth survey — promote to full tasknote at `/ft-task` checkout._

### Why this exists

`tools/update-adopters.mjs` is 1,671 lines holding seven responsibilities.
CORE-EPIC-931 splits it into modules under `tools/update-adopters/`, moving
the modules with no internal imports first, behind the entry as a
re-exporting facade. This step goes first for two reasons. It lands the
characterization pins every later step stands on. It also moves the
module with no internal imports (git runner + FLAITRON_REPO release reads),
which every later module imports.

Two behaviours the split puts at risk are unpinned today. One is the
entry's exact export set: the suite imports 29 names from it. The other is
`FLAITRON_REPO`, worked out from `import.meta.url` + `'..'`. Moving it one
directory deeper silently retargets every tag read unless it becomes
`'..', '..'`.

### Solution shape

- **Pin first (green before any move):** a suite test asserting the entry's
  export names equal today's 29 exactly, and one asserting `FLAITRON_REPO`
  resolves to the repo root (the directory holding this `SPEC.md`).
- Create `tools/update-adopters/release.mjs` and move: `execFileAsync`,
  `FLAITRON_REPO` (re-derived for the new depth), `git()`, `gitErrorLine`,
  `unresolved`/`isUnresolved`, `parseSemverTag`, `compareSemver`,
  `describePin`, `canonicalTagSha` + `cachedCanonicalTagSha`,
  `latestReleaseTag`, `tagsInRange`, `migrationBearingTags`,
  `isReleaseTag`, `migrationAsk`, `acceptMigrationError`,
  `cachedMigrationBearingTags`, `cachedFlaitronFile`, `cachedFlaitronTree`.
- Replace the four per-sweep memo maps moved here with one small memo
  helper (key → cached in-flight promise). The fifth (`forkDriftCache`) adopts
  it in CORE-931.5. The promise-identity tests (CORE-490.4, CORE-493) must
  still pass unchanged.
- The entry imports what it still uses and re-exports every moved public
  name; its export set is unchanged.
- Acceptance seeds: characterization pins written and green **before** the
  move; the move is behavior-preserving and never mixed with feature
  change; suite green after; entry export set unchanged.

### Files to touch (preliminary survey — drift-check at promotion)

- `tools/update-adopters.mjs` — remove moved code; add imports + re-exports.
- `tools/update-adopters/release.mjs` — new.
- `tools/update-adopters.test.mjs` — the two pins only; existing imports stay on the entry.

### Explicitly out of scope

- `recordedGitlinkSha` / `gitlinkDrift`: they move with `checkAdopter` in CORE-931.6, because their `SUBMODULE_PATH` default would make release.mjs import from workspace.mjs and create an import cycle.
- `fetchTimeoutMs`: moves with `applyBump` in CORE-931.7.
- Path constants, discovery and the viz mirrors: CORE-931.3.
- Header comment split and doc pointers (SECURITY.md's `git()` line): CORE-931.8.

### Decisions locked in this conversation

| Decision | Choice | Rationale |
|---|---|---|
| Entry path | `tools/update-adopters.mjs` stays the CLI and the facade | CLI callers (natabula wave-bump), CI and every doc name it |
| Test file | One file, importing via the entry | Keeps the CI and Pair H `node --check` lists unchanged |
| `node --check` list | Unchanged | Pair H binds it to `/ft-release` (95% budget, CORE-920.4); `node --test` loads every module, so syntax errors still fail CI |
| Module dir | `tools/update-adopters/` | Plain relative ESM imports keep the zero-dependency plain-`node` property |
| Interim header | Entry header stays whole until CORE-931.8; each new module opens with a one-line pointer to it | One seam per step |

### Acceptance that decides it

- Entry export set pinned and unchanged — `node --test tools/update-adopters.test.mjs`
- Syntax — `node --check tools/update-adopters.mjs && node --check tools/update-adopters/release.mjs`

### Open at promotion (Phase 1 should resolve)

- The Node ≥20 guard sits in the entry's body, and static imports evaluate before it runs. Check that release.mjs does no top-level work an old Node would choke on before the guard prints. Lean: keep modules free of top-level side effects; no guard move needed.

### Related

- [[CORE-EPIC-931]] — parent epic.
- [[CORE-931.3]] — next step (`blocked-by:` this).
- [[CORE-479]] — related-decision: checkAdopter left inline.
