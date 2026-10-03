---
title: viz hard-cut
status: completed
tags: [rebrand, breaking, viz]
created: 2026-10-03
due:
related-tasks: [CORE-EPIC-711, CORE-711.1, CORE-711.3, CORE-711.4]
touches:
  - viz/**
  - .flowtron/PLAN.md
  - .flowtron/tasknote/CORE-711.2.md
parallel-safe-with:
  - CORE-711.3
---

# CORE-711.2 | viz hard-cut

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-711]] [[CORE-711.1]] [[CORE-711.3]] [[CORE-711.4]]

## 🎯 Goal

Rename every live `flowtron` surface under `viz/` to `flaitron` — workspace paths (`.flaitron/`), localStorage keys (`flaitron-viz-*`), the `FLAITRON_VIZ_WORKSPACE` env var, identifiers, tests and viz docs — with no old-name fallback.

## ✅ Acceptance

- [x] No live `flowtron` reference left in `viz/` outside the deliberate legacy-data fence (parser fixture/comment citing the historical `**flowtron v5.2.0 bump**` row) — `git grep -n -i flowtron -- viz ':!viz/package-lock.json' | grep -v 'flowtron v5.2.0 bump'` prints nothing
- [x] Workspace scan reads `.flaitron/` only and honors `FLAITRON_VIZ_WORKSPACE` — `npm --prefix viz test` (workspace.test.ts asserts both)
- [x] localStorage keys renamed in app code and `public/theme-init.js`, no `flowtron-viz-*` fallback — `git grep -n 'flowtron-viz' -- viz` prints nothing
- [x] Full viz suite, typecheck, lint, build pass — `npm --prefix viz test && npm --prefix viz run typecheck && npm --prefix viz run lint && npm --prefix viz run build`
- [x] Header renders `Flaitron — <project>` against a `.flaitron/` workspace — `👁️` visual check (title text change) — operator confirmed 2026-10-03

## 🧩 Subtasks

- [x] `git mv viz/src/flowtronWatch{,.test}.ts → flaitronWatch{,.test}.ts`; update imports (`vite.config.ts`, test) and `eslint.config.js` boundary rule
- [x] Longest-first substitution across `viz/**` (excl. `node_modules`, `dist`, legacy fence): `FLOWTRON_` → `FLAITRON_`, `Flowtron` → `Flaitron`, `flowtron` → `flaitron`
- [x] Restore the legacy-data fence (`**flowtron v5.2.0 bump**` fixture in `parser.test.ts` + its cite in `parser.ts`) verbatim
- [x] `package.json` + `package-lock.json` name → `flaitron-viz`
- [x] Re-read the diff for prose that should keep the old name (none expected beyond the fence)
- [x] Run viz test / typecheck / lint / build

## 🔗 Related

- [[CORE-EPIC-711]] — parent epic
- [[CORE-711.1]] — Discovery (inventory + ownership boundaries)
- [[CORE-711.3]] — parallel-safe-with: tools/ side; adopts the same `FLAITRON_VIZ_WORKSPACE`
- [[CORE-711.4]] — follow-up: docs outside `viz/` (README/SECURITY/MIGRATION/snippets cite the env var + paths) and the self-host `.flowtron/` move

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.1` closed today; viz still carries 239 `flowtron` hits across 36 files, all matching the inventory.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason) — pure rename; no responsibility or dependency change. The `flowtronWatch` → `flaitronWatch` file rename must keep the `eslint.config.js` Node-only boundary rule (it lists the module by name) in step, or the no-Node-under-`src/ui/` guard silently stops covering it.

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Surface (2026-10-03).** 239 hits / 36 files in `viz/` (excl. `node_modules`, `dist`). Classes: `.flowtron` path segments (`workspace.ts` + tests), localStorage keys (`theme.ts`, `theme-init.js`, `viewMode.ts`, `projectStorage.ts`, `visibilityPrefs.ts` + tests), env `FLOWTRON_VIZ_WORKSPACE` (`workspace.ts` + test), identifiers (`flowtronVersion` across workspace/devApi/useProjects/fixtures, `flowtronWatch` module, `flowtronApi` plugin, `flowtron-api` plugin name, `DEV_CSP_NONCE = 'flowtron-dev'`), UI copy (`index.html` title, `AppHeader` heading + version suffix, `ProjectSelector` aria labels), package name `flowtron-viz`, prose comments.
- **Cross-boundary refs.** No file outside `viz/` imports or cites `flowtronWatch`, `flowtronVersion`, `flowtron-api`, `flowtron-dev`, or `flowtron-viz`. `FLOWTRON_VIZ_WORKSPACE` is cited in README/SECURITY/MIGRATION/WORKTREES/AGENTS-snippet (→ `.4`) and read by `tools/update-adopters.mjs` (→ `.3`). Transient divergence between `.2` and `.3`/`.4` is accepted by the `.1` ownership boundaries.
- **Archive skim.** `.1`'s probe already covered the rename precedents (CORE-264/265 `_project/` → `.flowtron/`: hard cut, archives untouched). Grep for `theme-init.js` / `flowtron-viz-theme` → CORE-231 (theme-init extracted for CSP; nonce `flowtron-dev` is a static string matched only in `vite.config.ts` — safe to rename). 9 core notes touch `viz/src/workspace.ts`; none bear on naming.
- **Drift check.** PLAN line items all exist as described. Hard-cut matches the epic's posture. Consequence (expected, not drift): after this lands the viz finds no projects until `.4` moves self-host and `.7` migrates the fleet.
- **No clarifications needed.** Assumptions: (1) the pre-existing `'theme'` legacy-key fallback stays — it is not a flowtron name; (2) `parser.test.ts`'s `**flowtron v5.2.0 bump**` fixture and its cite in `parser.ts` stay verbatim — they model real historical adopter rows (archive content is fenced from the rename), and the parser must keep handling them; (3) arbitrary project-name strings in tests (`'flowtron'`) rename to `'flaitron'` — this checkout becomes `flaitron` at `.5`; (4) the comment cite of `FLOWTRON_REPO` in `workspace.ts` follows the end state (`FLAITRON_REPO`, renamed by `.3`).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling — followed the CORE-264 rename precedent (`git mv` + longest-first substitution, legacy data fenced); no new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup — `N/A`, rename only

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — existing tests renamed in step (workspace.test.ts now asserts `.flaitron/` paths + `FLAITRON_VIZ_WORKSPACE`); no new behavior to cover

**Implementation Notes:**

- `git mv viz/src/flowtronWatch{,.test}.ts → flaitronWatch{,.test}.ts`; imports in `vite.config.ts` + test and the `eslint.config.js` Node-only boundary list updated together.
- Substitution over every `viz/**` file with a hit (`git grep -l`, so `node_modules`/`dist` excluded): `FLOWTRON_`→`FLAITRON_`, `Flowtron`→`Flaitron`, `flowtron`→`flaitron`, with a negative lookahead fencing `flowtron v5.2.0 bump` (parser fixture + its cite in `parser.ts`). `package-lock.json`'s two `"name"` fields edited by hand-pattern (no reinstall).
- Renamed surfaces: `.flaitron/` workspace paths, `FLAITRON_VIZ_WORKSPACE`, localStorage `flaitron-viz-{theme,view,active-project,prefs:}` (app + `public/theme-init.js`), `flaitronVersion` (devApi JSON field ↔ useProjects, both viz-internal), `flaitronApi`/`flaitron-api` plugin, CSP nonce `flaitron-dev`, UI copy (`<title>`, header, selector aria labels), package `flaitron-viz`, viz README + comments. The pre-existing `'theme'` legacy-key fallback is untouched (not a flowtron name). 36 files, rename-only.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — full viz suite (rename touches 36 files across the tree)

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line) — operator confirmed "Flaitron — demo" header with only `demo` listed (decoy `.flowtron/` project hidden)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `git grep -n -i flowtron -- viz ':!viz/package-lock.json' | grep -v 'flowtron v5.2.0 bump'` → 1 (no match = pass)
- `git grep -n 'flowtron-viz' -- viz` → 1 (no match = pass)
- `npm --prefix viz test` → 0 (587/587)
- `npm --prefix viz run typecheck` → 0 · `npm --prefix viz run lint` → 0 · `npm --prefix viz run build` → 0
- Dev-server self-check against a scratch workspace (`FLAITRON_VIZ_WORKSPACE=<scratch>/ws`, projects `demo/.flaitron/` + decoy `legacy/.flowtron/`): `<title>Flaitron — PLAN.md</title>`; `/api/projects` → `[{"name":"demo","flaitronVersion":null}]` (decoy ignored — hard cut); CSP carries `nonce-flaitron-dev`.
- Quality assertions: no duplication, dead code, or public-surface growth — rename only; viz README module list updated in step.
- External review (`/code-review medium`, working-tree scope): no findings. Confirmed field/key/nonce consistency across producer/consumer pairs, eslint boundary coverage of the renamed module, no outside-`viz/` callers. Two expected effects (empty viz until `.4`/`.7`; outside docs + tools keep `FLOWTRON_VIZ_WORKSPACE` until `.3`/`.4`) — already recorded, no disposition needed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update — `README.md`, `SECURITY.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/WORKTREES.md` still cite `FLOWTRON_VIZ_WORKSPACE` / `.flowtron/` scan paths → known drift, owned by CORE-711.4 per the `.1` ownership boundaries (not edited here: `viz/**` only). No change: AGENTS, SPEC, codex/cursor/grok snippets, CONVENTIONS, CONTRIBUTING, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT, VISION. EXTERNAL-AGENTS: no stable-surface row moved (parser grammar untouched) → no caller-side row

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line — `N/A`

**Final Summary:**

Renamed every live `flowtron` surface in `viz/` to `flaitron` with no fallback: `.flaitron/` workspace scan, `FLAITRON_VIZ_WORKSPACE`, `flaitron-viz-*` localStorage keys (app + `theme-init.js`), `flaitronVersion` API field, `flaitronWatch` module (git mv) + eslint boundary entry, `flaitron-api` plugin, `flaitron-dev` CSP nonce, UI copy, package name, viz README. Legacy fence kept: the `**flowtron v5.2.0 bump**` parser fixture + cite. 36 files (2 renames), rename-only. Verification: viz test 587/587, typecheck/lint/build 0, both residual greps empty, scratch-workspace dev check (decoy `.flowtron/` project ignored), external review no findings, 👁️ confirmed. `touches:` reconciliation: diff = `viz/**` + PLAN.md + this note — matches declared. Effect: viz renders nothing against real repos until CORE-711.4 (self-host move) and CORE-711.7 (fleet wave); outside docs + `tools/` keep the old env name until .3/.4.

**Archived:** 2026-10-03
