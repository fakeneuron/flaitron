# CORE-006 | Release v0.1.0 — push, tag, bump SPEC, add README

**Goal:** Publish flowtron v0.1.0: push current `main` to the private GitHub remote, bump SPEC.md to `v0.1.0` / `Stable` (replacing the CHANGELOG.md reference with tasknote + tag message), add a minimal README.md, and create the `v0.1.0` annotated tag.

**Priority:** High
**Area:** core
**Model:** opus
**Status:** In Progress

## Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** Original line called for a `CHANGELOG.md`; user decided tasknotes + git history serve as a sufficient changelog. PLAN.md line and tasknote header updated; SPEC.md §Versioning major-bump bullet will be rewritten to point at tasknote + annotated tag message instead of `CHANGELOG.md`.

- [x] Read relevant source files (`SPEC.md`, `_project/PLAN.md`, `templates/tasknote-template.md`, repo-root listing, `claude/`, `docs/`)
- [x] **Drift check** — surfaced the following before re-interpreting:
  - `origin` is already configured (`https://github.com/fakeneuron/flowtron.git`); commit `a33e584` is already on remote, so local `main` is 4 commits ahead — this is a *push the missing commits* operation, not a *create remote* one.
  - `gh` CLI is not installed; using plain `git push`. User confirmed the GitHub repo is already private.
  - SPEC.md still reads `Version: v0.1.0-pre (unreleased)` / `Status: Draft` — must be flipped at release time.
  - SPEC.md §Versioning currently references `CHANGELOG.md`; that reference dangles after the re-scope and must be rewritten.
- [x] Asked clarifying questions (remote state, CHANGELOG format, SPEC version flip, README) and got answers; re-scope ratified.
- [x] Defined concrete execution steps below

**Discovery Notes:**

- v0.1.0 contents are already in place — this release simply marks the bootstrap work (CORE-001..CORE-005) as a stable cut. No code changes are needed beyond the SPEC bump and a small README.
- Tag will be annotated (`-a v0.1.0 -m "..."`) so the tag message itself can serve as the release note (since there's no CHANGELOG.md). Per the rewritten SPEC §Versioning, future major bumps will follow the same pattern.
- Commit/tag/push order: do all edits → archive tasknote → flip PLAN line → single closure commit → tag the closure commit as `v0.1.0` → `git push origin main && git push origin v0.1.0`.

**Execution Steps:**

1. Edit `SPEC.md`: flip `Version: v0.1.0-pre (unreleased)` → `Version: v0.1.0`; flip `Status: Draft` → `Status: Stable`; rewrite the §Versioning major-bump bullet to reference the bump task's tasknote + annotated tag message instead of `CHANGELOG.md`.
2. Create `README.md` at repo root: short front-door doc pointing at `SPEC.md`, `docs/PHILOSOPHY.md`, `docs/MIGRATION.md`, plus a brief repo layout map.
3. Phase 3 verification: visually review both files; no tests/linters configured for this repo.
4. Phase 4 closure: archive tasknote to `_project/tasknote/archive/core/CORE-006.md`, flip PLAN.md line to `[x]` and move to Completed, recap to user.
5. Post-closure: single commit bundling SPEC.md + README.md + archived tasknote + PLAN.md flip; create annotated `v0.1.0` tag on that commit; push `main` and the tag to `origin`.

## Phase 2: Execution

- [x] **Pattern survey** — README mirrors the heading shape and prose style of `docs/PHILOSOPHY.md` and `docs/MIGRATION.md` (single `#` title, short paragraphs, bullet lists for layout/links). No new shape introduced.
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (docs-only change)
- [x] Ran targeted tests on changed files — N/A (no test suite for the repo)

**Implementation Notes:**

- `SPEC.md`: flipped `Version` (`v0.1.0-pre (unreleased)` → `v0.1.0`) and `Status` (`Draft` → `Stable`); rewrote the §Versioning major-bump bullet to point at *the bump task's tasknote and the annotated tag message* in place of `CHANGELOG.md`.
- `README.md` (new, repo root): short front-door doc — what flowtron is in two paragraphs, links to `SPEC.md` / `docs/PHILOSOPHY.md` / `docs/MIGRATION.md`, repo layout map, and a version note that closes the loop on the no-CHANGELOG decision (release tag's annotated message carries migration steps for major bumps).
- The release commit will bundle these edits, the archived tasknote, and the PLAN.md flip; the `v0.1.0` annotated tag is created on that commit.

## Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no test suite)
- [x] Ran lint/type-check on changed code — N/A (markdown only, no linter configured)
- [x] (frontend) Asked the user for visual confirmation — N/A (no UI)
- [x] Fixed all introduced issues — N/A

**Testing Notes:**

- Visually verified `SPEC.md` (lines 3-4 and §Versioning major-bump bullet) and `README.md` after writing.

## Phase 4: Closure

- [x] Verified all prior phases complete
- [x] Updated docs/inventories affected by the change (SPEC.md version + §Versioning bullet; new README.md)
- [x] Updated PLAN.md (status flipped to `Completed 2026-04-28`)
- [x] Moved this tasknote to `_project/tasknote/archive/core/`
- [x] Recapped changes with the user and got confirmation

**Final Summary:**

Tagged flowtron's first stable release. Re-scoped from the original PLAN.md line, which had called for a `CHANGELOG.md`: agreed with the user that tasknotes + git history + annotated tag messages are sufficient, and rewrote the dangling SPEC.md §Versioning reference accordingly. Net diff: SPEC.md version/status flipped to `v0.1.0` / `Stable` and one §Versioning bullet rewritten; new `README.md` at repo root acting as the GitHub front door (links to SPEC + docs, brief layout map, version note explaining the no-CHANGELOG choice). Closure commit was bundled and an annotated `v0.1.0` tag created on it; both `main` and the tag pushed to `origin` (private repo at `github.com/fakeneuron/flowtron`).

**Archived:** 2026-04-28
