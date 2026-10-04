---
title: adopter-version-status
status: completed
tags: []
created: 2026-06-11
due:
related-tasks: []
---

# CORE-312 | adopter-version-status

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add adopter version-currency tracking: a green/red dot on viz project chips showing whether each adopter is at the current flowtron release, plus a backend CLI to batch-push core updates across all adopters (non-breaking releases first); frontend stays read-only.

## ✅ Acceptance

- [x] Viz project chips show a green dot (adopter pinned at the latest flowtron release), red dot (behind), or no dot (version unknown — e.g. flowtron itself), with accessible labels; frontend stays read-only.
- [x] `/api/projects` serves the latest released tag resolved server-side from the flowtron repo's git tags (no hardcoded version).
- [x] Batch-update CLI exists in the repo: discovers `.flowtron/core` adopters under the workspace root, skips dirty worktrees and release ranges carrying a Migration block, bumps + commits clean non-breaking adopters, never pushes to remotes, and supports a dry-run/report mode.
- [x] SPEC §"What flowtron does NOT provide" carries an explicit narrow carve-out for the batch-update CLI (mirroring the viz exception) so the constitution stays coherent.
- [x] viz lint, typecheck, and test suites pass on changed code.

## 🧩 Subtasks

- [x] Server: resolve the latest released tag (`git tag --sort=-v:refname`) at dev-server startup and extend the `/api/projects` payload with it; unit tests in `devApi.test.ts` / `workspace.test.ts`.
- [x] Client: thread `latestRelease` through `useProjects.ts`; render the green/red/absent dot on `ProjectSelector.tsx` chips with `aria-label` coverage; component tests.
- [x] CLI: new committed script (Node, zero-dep) — adopter discovery, currency check vs latest tag, dirty-worktree + Migration-block skip gates, pin bump + `git add` + commit per repo, no push, dry-run default with explicit apply flag, summary table output.
- [x] SPEC amendment: narrow CLI carve-out in §"What flowtron does NOT provide"; document the new script location in the repo-layout prose (PR-archetypes mirror judged unnecessary — the bullet's own "singular exception, not a precedent" carries the guard).
- [x] Run viz lint/typecheck/test; manually exercise the CLI in dry-run against `~/code`.

## 🔗 Related

- `/ft-update` (CORE-272) — canonical single-repo bump recipe the CLI batches.
- `natabula-align` (natabula-owned) — read-only currency report; same latest-tag reference semantics.

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Version-currency is already half-plumbed in viz (per-project `flowtronVersion` served by `/api/projects` since FE-048); the dot is a natural completion. The batch-update tool fills a real gap (`/ft-update` is single-repo, `natabula-align` is report-only) — but its *form* needs operator input because SPEC §"What flowtron does NOT provide" excludes CLI tools (clarifying question below).

- [x] Read relevant source files

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code; flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  1. **Batch-tool form** → **Real Node/bash CLI** (operator override of the markdown-skill recommendation). Requires a narrow SPEC carve-out in §"What flowtron does NOT provide", mirroring the viz exception.
  2. **"Current release" reference** → **latest git tag, resolved server-side** (natabula-align semantics; no hardcoded version).
  3. **Batch depth** → **bump + commit per adopter repo**; skip dirty worktrees and Migration-block release ranges; never `git push`.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Existing plumbing (frontend is mostly wired):** `viz/src/workspace.ts` reads each adopter's pinned version from `.flowtron/core/SPEC.md` (`flowtronVersion`, `v`-normalized, `null` when absent). `/api/projects` (`viz/src/devApi.ts:createProjectsHandler`) already serves `{name, flowtronVersion}`. `useProjects.ts` exposes `projectVersions`; `App.tsx:282` shows the active project's version in the header. `ProjectSelector.tsx` renders plain buttons — the dot is the only missing UI piece.
- **Missing piece — "current release" reference:** nothing in viz knows the latest released tag. Candidates: (a) server-side `git tag --sort=-v:refname | head -1` in the flowtron repo (matches `natabula-align` semantics), (b) client-side `VIZ_VERSION` constant (`viz/src/ui/constants.ts`, bumped by /ft-release).
- **Prior art:** `natabula-align` skill (global, natabula-owned) does the same currency check read-only across `~/code` using the latest-tag reference and warns "do not hardcode a version". `/ft-update` SKILL.md holds the canonical single-repo bump recipe (resolve `<FT>` path from `.gitmodules`, fetch tags, checkout tag, `git add <FT>`, symlink re-wire, smoke check) — the batch tool is essentially this looped.
- **SPEC tension:** SPEC §"What flowtron does NOT provide" — "A CLI tool (use `cp`, `mv`, and your editor)"; core principle 2 "Zero scripts". A literal batch CLI script contradicts the constitution; a markdown skill (à la `/ft-update`) is the constitutional shape. Surfaced as clarifying question.
- **Archive skim:** `archive/fe/` has no FE-048/FE-056 tasknotes (done as micros); FE-054 (dedupe `safeReaddir`), FE-055 (active-handler partial tolerance) touched `devApi.ts` — no constraints on this work. CORE-262 renamed the viz version constant to `VIZ_VERSION` (single source, /ft-release bumps it). CORE-272 built `/ft-update`; CORE-288 added its fork-drift warning.
- **Drift check:** no drift — PLAN line's "viz project chips" = `ProjectSelector.tsx`; per-adopter version extraction exists as described; no backend CLI exists yet (greenfield as expected).
- **Edge case (assumption):** `flowtronVersion: null` projects (flowtron itself — no `.flowtron/core/`; legacy layouts) get **no dot**, not a red dot — unknown ≠ stale.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- **Server:** `workspace.ts` gains `latestReleaseTag(repoDir)` (`git tag --sort=-v:refname`, first entry, null on no-repo/no-tags — extends the file's existing null-tolerant async-helper shape). Resolved once at dev-server startup in `vite.config.ts` from the viz dir (git walks up to the flowtron checkout). `createProjectsHandler` gains a `latestRelease` param; `/api/projects` response changed from a bare array to the envelope `{ latestRelease, projects }`.
- **Client:** `useProjects.ts` parses the envelope and exposes `latestRelease`. New `versionCurrency(version, latest)` helper in `ui/utils.ts` (`current | behind | unknown`). `ProjectSelector.tsx` gains optional `versions` + `latestRelease` props and renders a green (`bg-emerald-500`) / red (`bg-red-500`) dot before the chip name with `data-currency` markers; currency is appended to the `aria-label` and mirrored in `title`. `unknown` (null pin — e.g. flowtron itself — or no tag) renders no dot. `App.tsx` threads the two new props.
- **CLI:** new `tools/update-adopters.mjs` (zero-dep Node ESM, ~270 lines). Dry-run by default, `--apply` to act, `--root` / `$FLOWTRON_VIZ_WORKSPACE` workspace override. Discovers `.flowtron/core` adopters (legacy `.flowtron/flowtron` reported, not touched; flowtron checkout excluded). Per-adopter gates: migration-bearing tag in range (Migration block not opening with "No required project-side edits", or BREAKING heading) → skip; staged index changes → skip; dirty submodule worktree → skip. Apply path mirrors /ft-update: fetch tags, checkout tag, verify SPEC version, `git add`, pathspec-scoped commit (`chore: bump flowtron <cur> → <target>` — only the gitlink lands). Never pushes. Symlink re-wire + fork-drift scan deliberately not replicated — the report flags repos whose range shipped new skills and points at /ft-update.
- **SPEC amendment:** §"What flowtron does NOT provide" CLI bullet now carries the narrow carve-out (operator-side fleet maintenance, singular exception like viz); repo-layout list gains the `tools/` line.
- **Single-repo update stretch goal:** not taken — `/ft-update` already owns it.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

- `npm --prefix viz run lint` ✓, `typecheck` ✓.
- Full viz suite: 186/187 — the one failure is the FE-045-documented `navigateToTask` contention flake (timeout under parallel jsdom); passes 28/28 in isolation. Not related to this change.
- New tests: `latestReleaseTag` (3 cases, hermetic temp git repos), `versionCurrency` (3 cases), `createProjectsHandler` envelope (2 cases), `ProjectSelector` dot rendering (2 cases). Fixture `seedFetch` updated to the envelope shape (+ optional `projectVersions`/`latestRelease` seeds).
- CLI: `node --check` ✓; dry-run against `~/code` ✓ — 13 adopters, 12 would-bump v5.5.0/v5.4.0 → v5.6.0, stockshock correctly skipped (staged changes), flowtron excluded, new-skills note fires (v5.6.0 shipped ft-audit-repo). `--apply` not exercised (operator-side action).
- 👁️ visual confirmation requested at the 📦 gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

  - `README.md` — updated: Visualizer section gains the version-currency-dot sentence; Repo layout gains the `tools/` line.
  - `SPEC.md` — updated in-task: CLI carve-out in §"What flowtron does NOT provide"; `tools/` line in §"Working in the flowtron repo itself".
  - `docs/MIGRATION.md` — updated: §"Pinning and bumping" gains a pointer to `tools/update-adopters.mjs` for fleet-wide non-breaking sweeps.
  - `claude/AGENTS-snippet.md` — no change (adopter-facing surface unaffected).
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change (CLI is operator-run local tooling; submodule-bump trust posture unchanged — it only fast-forwards pins to signed-off release tags, never pushes).
  - `docs/AGENT-NEUTRALITY.md` — no change (CLI and viz changes are agent-neutral).
  - `docs/PLATFORMS.md` — no change.
  - `claude/CAPABILITIES.md` — no change.
  - `docs/AGENT-COMPAT.md` — no change.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-06-11.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Adopter version-currency is now visible and actionable. Viz project chips carry a green/red dot (pinned-at-latest vs behind, no dot when unreadable), backed by a new server-side latest-tag resolution (`latestReleaseTag()` in `workspace.ts`, `/api/projects` envelope `{ latestRelease, projects }`). A new zero-dep batch updater `tools/update-adopters.mjs` (the SPEC-carved singular CLI exception) sweeps `~/code` adopters: dry-run by default, per-repo safety gates (migration-bearing range / staged index / dirty submodule), pathspec-scoped local commits, never pushes. Dry-run against the live workspace found 13 adopters, 12 bump-ready, 1 correctly gated. Frontend: +10 tests across 4 files; lint/typecheck/suite green (one pre-existing FE-045 contention flake, passes isolated). Docs: README, SPEC, MIGRATION updated. Single-repo update stretch goal deliberately not taken — `/ft-update` owns it.

**Archived:** 2026-06-11
