---
title: update-adopters migrate mode
status: completed
tags: [rebrand, breaking, fleet, tools]
created: 2026-10-03
due:
related-tasks: [CORE-EPIC-711, CORE-711.1, CORE-711.2, CORE-711.4, CORE-711.7]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - .flowtron/PLAN.md
  - .flowtron/tasknote/CORE-711.3.md
parallel-safe-with:
  - CORE-711.2
---

# CORE-711.3 | update-adopters migrate mode

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-711]] [[CORE-711.1]] [[CORE-711.7]]

## 🎯 Goal

Teach `tools/update-adopters.mjs` to migrate a pre-rename adopter (`.flowtron/core`) to the `.flaitron/core` layout and the v6.0.0 pin in one atomic, rollback-safe commit, and hard-cut the tool's own `FLOWTRON_*` names to `FLAITRON_*`, so `.7` can run the fleet wave with the ordinary dry-run → `--apply` pair.

## ✅ Acceptance

- [x] Pre-rename adopters (`.flowtron/core/SPEC.md`) are discovered and classified `migrate` automatically (no new flag) when latest ≥ the rename tag and every existing gate passes; with latest below it they skip with a reason naming the rename tag; a pre-existing `.flaitron/` skips — `node --test tools/update-adopters.test.mjs`
- [x] BREAKING lift is scoped: the rename tag's own Migration block is lifted for a pre-rename adopter only; any other migration-bearing tag in range still skips (real `v5.0.0` as the BREAKING stand-in) — `node --test tools/update-adopters.test.mjs`
- [x] `--apply` migrate lands one commit: `.flowtron/` → `.flaitron/` (untracked contents travel), submodule renamed (`.gitmodules` section + path, `.git/config` section, `.git/modules/<name>` dir, gitfile), `.gitmodules` url → `flaitron` + `submodule sync`, tracked `.flowtron`-segment symlinks re-pointed (others untouched), tracked `.gitignore` rules naming `.flowtron/` rewritten (review blocker), gitlink at the canonical latest SHA; unrelated work stays out — `node --test tools/update-adopters.test.mjs`
- [x] A failure after the layout moves (commit rejected by a hook) rolls the adopter back to its exact prior layout, config, symlinks, index, and submodule SHA — `node --test tools/update-adopters.test.mjs`
- [x] `FLOWTRON_*` env vars / constants renamed to `FLAITRON_*`; remaining `flowtron` spellings in `tools/**` are only the pre-rename layout the migration reads — `! grep -n 'FLOWTRON' tools/*.mjs` + `judgment` review of `grep -ni flowtron tools/*.mjs`
- [x] Release-gate suite + syntax checks pass — `node --test tools/update-adopters.test.mjs && node --check tools/update-adopters.test.mjs && node --check tools/update-adopters.mjs`

## 🧩 Subtasks

- [x] Constants: `FLAITRON_REPO`, `SUBMODULE_PATH = .flaitron/core`, `PRE_RENAME_DIR` / `PRE_RENAME_SUBMODULE_PATH`, `RENAME_TAG = v6.0.0`; env `FLAITRON_{VIZ_WORKSPACE,UPDATE_LATEST,FETCH_TIMEOUT_MS}`; snippet key patterns → `.flaitron/core`; user-facing strings + header comment
- [x] `discoverAdopters`: pre-rename layout → adopter with `preRename: true` (checked first, so a both-layouts repo reaches the `.flaitron/ exists` gate)
- [x] `checkAdopter(adopter, latest, { renameTag })`: pre-rename branch — rename-tag floor gate, `.flaitron/` exists gate, skip both drift guards (the migrate commit restages the gitlink), shared gates on the pre-rename sub path, rename-tag-only lift → `status: 'migrate'`
- [x] Extract `checkoutVerified(sub, latest)` from `applyBump` (shared by both apply paths)
- [x] `applyMigrate`: fetch → verified checkout → `git mv` → module-dir relocation + gitfile/`core.worktree` → section renames + url + `submodule sync` → symlink re-point → stage → one `--no-verify` commit; undo stack unwound in reverse on any failure
- [x] `reportResult`: `migrate` lines (dry-run + apply), counted with bumps
- [x] Tests: env renames; `makePreRenameAdopter` real-submodule fixture; classify (migrate / below-floor / lift-scoped / `.flaitron` exists); discovery; apply end-to-end; rollback; CLI dry-run skip line
- [x] Run release-gate suite + `node --check` pair

## 🔗 Related

- [[CORE-EPIC-711]] — parent epic
- [[CORE-711.1]] — Discovery; Fan-out: Parallel with `.2`
- [[CORE-711.2]] — `parallel-safe-with:` (owns `viz/**`; shared env name `FLAITRON_VIZ_WORKSPACE`)
- [[CORE-711.4]] — owns the docs that describe this tool (MIGRATION.md §non-breaking sweep, SECURITY.md mutation list)
- [[CORE-711.7]] — consumer: runs this migrate mode as the fleet wave

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.1` filed this today; `.2` landed (viz already reads `FLAITRON_VIZ_WORKSPACE` and names a `FLAITRON_REPO` constant in `workspace.ts`), nothing has touched `tools/**` since. The PLAN line's mechanics all still match the code.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason) — see Discovery Notes §Best practices

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

**Fleet facts (read-only scan of `~/Code/*`, 2026-10-03).** 23 repos carry `.flowtron/core/SPEC.md`; all uniform: submodule name == path `.flowtron/core`, url `https://github.com/fakeneuron/flowtron.git`, absorbed gitdir (gitfile `gitdir: ../../.git/modules/.flowtron/core`), one submodule (cloutomaton has 2 — the second is unrelated), all pinned `v5.33.0`, no `.flaitron/` anywhere, `.claude/` tracked everywhere. Tracked symlink targets with a `.flowtron` segment: 226 `../../.flowtron/core/claude/skills/*`, 184 `…/claude/commands/*`, 16 `…/codex/skills/*`, and one `../.flowtron` (sciphoenix `vault/flowtron`). The link's *name* `vault/flowtron` is adopter content → `.7`'s prose sweep, not this tool. Range `v5.33.0..v5.35.0` is all-clear (v5.34/v5.35 Migration = "No required project-side edits"), so the wave's only bearing tag will be v6.0.0 itself.

**git behavior (scratch experiment, git 2.55).** `git mv .flowtron .flaitron` with a nested absorbed submodule: renames the whole dir (untracked files travel), rewrites `.gitmodules` `path =` and the module's `core.worktree`, stages `.gitmodules` + the renames. It does **not** touch the submodule *name*: `[submodule ".flowtron/core"]`, `.git/modules/.flowtron/core`, the gitfile `gitdir:` line, and the `.git/config` section all keep the old name. No git builtin renames a submodule → the tool does it: section renames in `.gitmodules` and `.git/config`, `rename()` the module dir, rewrite gitfile + `core.worktree` as paths relative to each other, then `git submodule sync` re-points `.git/config` url + the module's `remote.origin.url`.

**Archive skim.** 144 archived CORE notes cite `tools/update-adopters`; `.1`'s probe already distilled the load-bearing ones (CORE-264/265 precedent, 272/273 nested-move hazard, 312 BREAKING skip + no symlink re-wiring, 592 realpath self-skip, 642 concurrent edits), and the in-code comments carry the per-gate lessons by ID (CORE-366 non-1 exit rethrow, 419.2 downgrade, 419.3 rollback, 432.4 env seam, 459.x drift/detached/missing tag, 490.x unresolved sentinel + `--no-verify` + caches, 585 fetch timeout). Applied: the migrate path reuses every existing gate, keeps the `--no-verify` + rollback discipline, and reads the submodule name/gitdir from git instead of hard-coding (lesson 2).

**Best practices.** `checkAdopter` already threads state through nine sequential gates (CORE-479 chose inline over an array); the pre-rename branch rides the same function with a `preRename` sub-path switch rather than a parallel `checkMigrate` that would duplicate six gates. `applyBump`'s checkout + version + SHA verification is extracted to `checkoutVerified` so both apply paths share it (DRY, in-scope). `applyMigrate` gets its own undo stack (reverse-order closures, residue collected like `rollbackBump`); `rollbackBump` stays as-is (no unrelated refactor). Test seam for the rename tag: an options default on `checkAdopter` (`{ renameTag = RENAME_TAG }`), since no real v6.0.0 exists yet and minting a fake one in the real checkout would collide with `/ft-release`. Dependency direction unchanged: zero-dep, `node:` builtins only.

**Drift check.** PLAN line matches code: `FLOWTRON_REPO` L104, `SUBMODULE_PATH` L105, legacy `.flowtron/flowtron` detection L507, env reads L154/L231/L810, BREAKING skip L648–655. No SPEC contract contradicted (the tool's scope carve-out in `SPEC/scope-boundaries.md` is unchanged; it still only moves pins + commits locally, now with a layout move as part of the bump). Docs describing the tool (`docs/MIGRATION.md` L566 "non-breaking releases", `SECURITY.md` L175–214 mutation list) are `.4`'s territory per `.1`'s ownership boundaries — flagged at closure.

**Clarifications (AskUserQuestion).** Trigger = **automatic** (pre-rename adopters classify as `migrate`; no flag). Commit = **one atomic commit** per adopter. Submodule **name renamed too** (not path-only). Assumed: rename tag hard-coded `v6.0.0` (epic: "Breaking v6.0.0"); `.gitmodules` url rewrite only rewrites a trailing `flowtron(.git)` repo segment (all 23 match); the legacy `.flowtron/flowtron` layout detection stays as-is; migrate counts fold into the existing bumped/planned counters.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling — pre-rename rides `checkAdopter`'s existing gate chain via a sub-path switch (no parallel `checkMigrate`); `applyMigrate` follows `applyBump`'s fetch-outside-window / `--no-verify` / rollback-residue shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup — one in-scope extraction: `checkoutVerified` (checkout + Version + canonical-SHA check) out of `applyBump`, to avoid duplicating it in `applyMigrate`; `rollbackBump` deliberately left as-is

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `tools/update-adopters.mjs`: `FLOWTRON_REPO` → `FLAITRON_REPO`; `SUBMODULE_PATH` → `.flaitron/core` (via new `FLAITRON_DIR`); new `PRE_RENAME_DIR` / `PRE_RENAME_SUBMODULE_PATH` / `RENAME_TAG = 'v6.0.0'`; env `FLAITRON_{VIZ_WORKSPACE,UPDATE_LATEST,FETCH_TIMEOUT_MS}`; snippet key patterns `.flaitron/core`; banner, commit subject (`bump flaitron`), no-adopters line; header gains a "Rename migration" note.
- `discoverAdopters`: pre-rename checked first → `{ preRename: true }`.
- `checkAdopter(adopter, latest, { renameTag = RENAME_TAG })`: pre-rename branch adds the rename-tag floor gate + `.flaitron/ exists` gate (`pathExists` uses `lstat`), skips both drift guards, runs the shared gates on the pre-rename path, filters only `renameTag` out of the bearing list, returns `migrate`.
- `applyMigrate`: captures every value an undo needs up front (physical paths via `realpath`, so the relative gitfile ⇄ `core.worktree` pair is right under macOS `/var` → `/private/var`), then checkout → `git mv` → gitdir move + gitfile/`core.worktree` → `.gitmodules` + `.git/config` section renames, url, `submodule sync` → symlink re-point → stage → one `--no-verify` commit (no pathspec — the index was verified clean). Undo stack (`unwind`) runs newest-first; residue appended like `rollbackBump`.
- First rollback test run caught one residue: the forward `mkdir` left an empty `.git/modules/.flaitron/` after unwind → undo now `rmdir`s it (mirrors the forward `rmdir` of the old parent).
- Pure helpers `renamedLinkTarget` (every `.flowtron` path segment, global) and `renamedRemoteUrl` (trailing `flowtron(.git)` segment only) exported for unit tests.
- `reportResult`: `⬆ <name>: would migrate .flowtron/ → .flaitron/ and bump …` / `migrated … and bumped …, committed`; failures print `migrate failed`. Migrations count as bumps in the summary.
- Tests (+10, 54 → 64): helper units; `makePreRenameAdopter` (real `git submodule add` fixture, GitHub url in `.gitmodules`, mirror url in `.git/config` so fetch stays local); discovery flag; classify migrate / below-floor / `.flaitron` exists; scoped lift with real BREAKING `v5.0.0` (lifted only as the rename tag, only for pre-rename); apply end-to-end (one commit, untracked travels, name/path/url/gitdir/gitfile/config/origin, links, clean status, re-check = `current`); rollback byte-identical snapshot; CLI dry-run self-healing against `RENAME_TAG`.
- Live dry-run against `~/code` (read-only): all 23 adopters `⏭ still on .flowtron/ — the move to .flaitron/ needs v6.0.0 or later (latest is v5.35.0)`. Consequence: until v6.0.0 is tagged the tool cannot batch-bump the fleet to v5.35.0 (consistent with the epic's "no v5.x release first").

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — `N/A`, no UI (`tools/**` only)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt (final pass, after the review blocker fix):
- `node --test tools/update-adopters.test.mjs` → 0 (65/65; was 54 — +11 migration tests)
- `node --check tools/update-adopters.test.mjs` → 0
- `node --check tools/update-adopters.mjs` → 0
- `! grep -n 'FLOWTRON' tools/*.mjs` → 0 (no hits)
- `grep -ni flowtron tools/update-adopters.mjs` → `judgment`: every hit is the pre-rename layout the migration reads (`PRE_RENAME_DIR`, the segment/url regexes, comments describing them), the legacy `.flowtron/flowtron` detection + its message, or the historical `readFlowtronVersion` (CORE-479) note. `.N`'s zero-stray grep needs a `tools/` fence for these.
- `git diff --check` → 0
- Lint/type-check: `tools/` has no linter or tsconfig (zero-dep `node` script); `node --check` is its gate.
- Quality: no duplication (`checkoutVerified` extracted rather than copied; one segment-rename helper shared by links and ignore rules); no dead code; public surface grows by `applyMigrate` + two pure helpers + two constants, all exported for tests only (same pattern as the existing exports); header comment updated for the new mode.
- Live read-only dry-run (`node tools/update-adopters.mjs`, workspace `~/code`) → 0; 23 skipped "still on .flowtron/ … needs v6.0.0 or later (latest is v5.35.0)".

External review (`/code-review medium`, scoped to this task's uncommitted diff, no prior commits in range):
- **Blocker** — `applyMigrate` moved ignored files (`.flowtron/screenshots/`, ignored in 18/23 adopters; marscharts also `.flowtron/backups/`; nested in invisibrain `frontend/` + natabula `configs/`) into `.flaitron/` with no matching ignore rule → they resurface as untracked and a later `git add -A` commits them. Fails the spirit of Acceptance #3 (a complete, clean move). → back to Phase 2: new step 5 rewrites `.flowtron` path segments in every tracked `.gitignore` (dirty ones rewritten in place, left unstaged); `renamedLinkTarget` generalized to `renamedDirSegments` (boundary `(?<![\w.-])\.flowtron(?![\w.-])`, also catches backticked comment paths); fixture + apply/rollback tests extended, new dirty-`.gitignore` test. `info/exclude` checked across the fleet: none name `.flowtron` → not handled. Phase 3 re-run from the top (receipt above).
- Reviewer verified correct: reverse-order undo, the full submodule rename, scoped `v6.0.0` lift, both-layouts skip, tracked-symlink coverage, `git mv` path/`core.worktree` behavior on git 2.55.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update — **drift, deferred to `.4` by ownership boundary** (its PLAN line amended this closure, operator-confirmed): `docs/MIGRATION.md` updater paragraph ("skips any repo whose range carries real migration steps" no longer holds for the rename tag) and `SECURITY.md` §"Fleet updater (`tools/`)" (`FLOWTRON_UPDATE_LATEST`/`FLOWTRON_REPO` names; "pathspec commit touching only the gitlink" is bump-only now). **No change:** README, AGENTS (validation commands unchanged), SPEC (L806 carve-out still accurate), the four AGENTS-snippets (their `ln -s` blocks are parsed at `toTag` ≥ v6, which `.4` writes as `.flaitron/core`), CONVENTIONS, CONTRIBUTING, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, EXTERNAL-AGENTS (no stable-surface row names the updater or its env vars), WORKTREES, VISION (one bounded updater — still true)

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`: the non-obvious git facts (`git mv` leaves the submodule name behind; physical paths for the gitfile ⇄ `core.worktree` pair) live in the code comments where the next editor needs them

**Final Summary:**

`tools/update-adopters.mjs` now auto-classifies pre-rename (`.flowtron/core`) adopters as `migrate` and, on `--apply`, moves them to `.flaitron/` in one rollback-safe commit: dir move (untracked travels), full submodule rename (name, path, `.git/modules`, gitfile, `.git/config`), url → flaitron + sync, `.flowtron`-segment symlinks and `.gitignore` rules rewritten, pin bumped to the canonical latest SHA. Gated on latest ≥ `v6.0.0` and no pre-existing `.flaitron/`; the BREAKING skip is lifted for `v6.0.0` only, for pre-rename adopters only. `FLOWTRON_*` → `FLAITRON_*` hard cut. 2 files, +~765/−130 LOC; suite 54 → 65, all green. External review surfaced one blocker (stale ignore rules) — fixed. Downstream: `.4` line amended to document the mode; `.N` grep fence amended for the tool's deliberate pre-rename reads. Operational note for `.5`/`.7`: until v6.0.0 is tagged the tool holds all 23 adopters (skip), so it cannot batch-bump to v5.35.0 meanwhile. `touches:` reconciliation: diff = `tools/update-adopters.mjs`, `tools/update-adopters.test.mjs`, `.flowtron/PLAN.md`, this note (→ archive) — matches declared.

**Archived:** 2026-10-03
