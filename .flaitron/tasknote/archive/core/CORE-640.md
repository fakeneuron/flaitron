---
title: js-yaml-5-gray-matter
status: completed
tags: []
created: 2026-09-21
due:
related-tasks: [CORE-639.3, CORE-575.3]
touches:
  - viz/src/tasknote-parse.ts
  - viz/src/tasknote.test.ts
  - viz/package.json
  - viz/package-lock.json
  - viz/README.md
  - .flowtron/PLAN.md
---

# CORE-640 | js-yaml-5-gray-matter

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-639.3]] · [[CORE-575.3]]

## 🎯 Goal

Replace `gray-matter` with an in-repo frontmatter splitter in `viz/src/tasknote-parse.ts` so `js-yaml` can bump 4→5 without waiting on an upstream that has not shipped since 2021.

## ✅ Acceptance

- [x] `gray-matter` and its `$js-yaml` override are gone from `viz/package.json`; `js-yaml` is `^5.x` — `! grep -q 'gray-matter' viz/package.json && grep -q '"js-yaml": "\^5' viz/package.json`
- [x] No `gray-matter` in the resolved tree — `! grep -q '"node_modules/gray-matter"' viz/package-lock.json`
- [x] Frontmatter parse behaviour preserved (existing `tasknote.test.ts` suite green, including the `---js` engine-disabled and `!!omap` / merge-key tests) plus new splitter edge-case tests — `npm --prefix viz test`
- [x] Type-check, lint, build green — `npm --prefix viz run typecheck && npm --prefix viz run lint && npm --prefix viz run build`
- [x] `viz/README.md` module-tier line for `tasknote-parse.ts` no longer names gray-matter — `! grep -q 'gray-matter' viz/README.md`

## 🧩 Subtasks

- [x] Write `splitFrontmatter(text)` in `tasknote-parse.ts` (bare `---` open, `---` close, CRLF-tolerant; `---<lang>` open → throw; unclosed → throw)
- [x] Route the block through the existing `parseYamlFrontmatter`; drop the `matter` import and the engine-override comments that no longer apply
- [x] Add splitter edge-case tests to `tasknote.test.ts` (no frontmatter, CRLF, unclosed, `---yaml` open, empty block)
- [x] `npm --prefix viz uninstall gray-matter` · remove the `overrides` block · `npm --prefix viz install js-yaml@5` · drop `@types/js-yaml` (5.x ships its own types)
- [x] Update `viz/README.md:96` module-tier comment
- [x] Run the roster: test / typecheck / lint / build

## 🔗 Related

- [[CORE-639.3]] — predecessor: isolate-bumped js-yaml 5, reverted on gray-matter `safeLoad.bind` TypeError, parked this row
- [[CORE-575.3]] — added the `$js-yaml` override this task removes (`supersedes:`-adjacent: the override has no purpose once gray-matter is gone)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** The filed precondition ("once gray-matter no longer bind()s js-yaml 3 safeLoad at import") is unchanged since yesterday's re-check and structurally unlikely to change: npm `gray-matter` latest is 4.0.3, last code release 2021-04-24, registry metadata last touched 2023-07-12; `master` still `yaml.safeLoad.bind`. Waiting is open-ended. Meanwhile `tasknote-parse.ts` already overrides *both* gray-matter engines (`javascript` → throw, `yaml` → direct `js-yaml` `load` + `CORE_SCHEMA`), so gray-matter contributes only `---` delimiter splitting — ~20 lines to own. Operator chose the re-scope (AskUserQuestion, 2026-09-21): drop gray-matter, then bump js-yaml. Removes an unmaintained dependency and the CORE-575.3 override in the same move.

- [x] Read relevant source files — `viz/src/tasknote-parse.ts` (single `matter()` call site, both engines overridden), `viz/src/tasknoteRead.ts:45-50` (parse failures are catch-and-skip, so a stricter splitter that throws on malformed input lands on the existing path), `viz/src/tasknote.ts:92` (`parseFrontmatter({})` → `null`, so "no frontmatter" must surface as `{}`), `viz/src/tasknote.test.ts:797-840` (three engine/security tests that must keep passing), `viz/package.json` (deps + `overrides`), js-yaml 5.4.2 tarball `dist/js-yaml.d.ts` (ships its own types; `load(input, { schema: CORE_SCHEMA })` signature unchanged; CORE_SCHEMA is now the default and still excludes `!!merge`/`!!omap`).

- [x] **Best Practices Review** — Touched responsibility: frontmatter *splitting* moves from a dependency into `tasknote-parse.ts`, next to the YAML *parsing* it already owns; same module, same tier (Node-only per `viz/README.md`). Dependency direction unchanged (parse → tasknote.ts helpers). No nearby duplication: nothing else in `viz/src` splits frontmatter. Required in-scope refactor: none beyond the swap; the `DISABLED_JS_ENGINE` shim becomes dead code and is removed (its guarantee — never eval a `---js` block — is now enforced by the splitter rejecting any non-bare `---` open, and the FE-071 test still asserts it). Deferred: nothing.

- [x] **Archive skim** — `archive/core/` confirmed via README table. `grep -l gray-matter` → 19 notes; load-bearing: CORE-575.3 (added the `$js-yaml` override; warned that a naive `rm -rf node_modules package-lock.json && npm install` causes unrelated version drift — apply dep changes surgically with `npm uninstall` / `npm install <pkg>@<ver>`), CORE-639.3 (the revert: `TypeError: Cannot read properties of undefined (reading 'bind')` loading `vite.config.ts`; the `$js-yaml` override is why root 5.x could not hide behind nested 3.x), CORE-233 (`dep-gray-matter-stale`, 2026-05 — gray-matter staleness already noted once). CORE-575.3 also records the 57 `tasknote.test.ts` tests covering the engine overrides.

- [x] **Drift check** — PLAN row cites `engines.js TypeError` and CORE-639.3's revert: both still true. `viz/README.md:96` says `tasknote-parse.ts — Node-only (gray-matter frontmatter parse)` — will drift after this task; in `touches:`. SPEC contradiction: none — the visualizer is outside the workflow contract. PLAN.md line divergence: the Re-scope rewrites the row's description (was "bump once gray-matter fixes upstream"; now "drop gray-matter, then bump").

- [x] Asked clarifying questions — one AskUserQuestion (halt again vs re-scope vs stop); operator chose Re-scope. Assumptions: (1) only bare `---` opens frontmatter — `---yaml` / `---js` / any `---<lang>` open throws (gray-matter accepted `---yaml`; no tasknote in this repo or the templates uses it, and rejecting is the safer default); (2) an unclosed `---` block throws rather than gray-matter's behaviour of treating the whole file as YAML; (3) `@types/js-yaml` is dropped because 5.x bundles `.d.ts`; (4) `[light]` tier stays — bounded diff, single module.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- gray-matter open/close semantics being replaced: open = file starts with `---` (optionally followed by a language name, then newline); close = first subsequent line that is exactly `---`; content = everything after the close line. Missing close → gray-matter silently parses the rest of the file as YAML (content `''`). Missing open → `data = {}`, content = whole file.
- js-yaml 5.4.2: `load('')` returns `undefined` per the d.ts (`unknown`); `parseYamlFrontmatter` already maps `undefined`/`null` → `{}`. Verify empirically after install (the sidequest stub noted an empty-input throw as a possible 5.x change).
- Dependency surgery order (CORE-575.3 lesson): `npm uninstall gray-matter @types/js-yaml` → edit out `overrides` → `npm install js-yaml@^5` — never wipe the lockfile.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the module's existing shape: `parseYamlFrontmatter` already lived in `tasknote-parse.ts` as the YAML half; `splitFrontmatter` sits beside it as the delimiter half and composes the two. No other frontmatter split exists in `viz/src`; no shared helper warranted for one call site

- [x] **Minimal refactor gate** — removed `DISABLED_JS_ENGINE` (dead once no engine table exists; the FE-071 test still asserts the `---js` guarantee via the splitter's bare-`---` rule) and rewrote the two comment blocks that described gray-matter engine aliasing. Nothing else touched

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — 7 splitter cases (no frontmatter, CRLF, close-at-EOF, empty block, unclosed, `---yaml` open, body `---` hr)

**Implementation Notes:**

- js-yaml 5 does throw `expected a document, but the input is empty` on `''` (and on comment-only input) — the sidequest stub's secondary concern was real. `parseYamlFrontmatter` now returns `{}` on a whitespace-only block before calling `load`; comment-only blocks throw and land on `tasknoteRead.ts`'s catch-and-skip, which is acceptable (no title → `null` frontmatter either way).
- Dep surgery: `npm uninstall gray-matter @types/js-yaml` → delete `overrides` → `npm install js-yaml@^5`. Lockfile diff is removals only (gray-matter + its 5 transitive deps, `@types/js-yaml`) plus the one js-yaml entry; no unrelated drift. `@types/js-yaml` dropped because 5.x ships `dist/js-yaml.d.ts`.
- `npm audit` → 0 vulnerabilities after the swap.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) N/A — Node-only parse module; no rendered surface changed

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `! grep -q 'gray-matter' viz/package.json && grep -q '"js-yaml": "\^5' viz/package.json` → 0
- `! grep -q '"node_modules/gray-matter"' viz/package-lock.json` → 0
- `npm --prefix viz test` → 0 (29 files, 575 tests; was 568)
- `npm --prefix viz run typecheck && npm --prefix viz run lint && npm --prefix viz run build` → 0
- `! grep -q 'gray-matter' viz/README.md` → 0
- Structural: no duplication (one splitter, one call site); dead code removed (`DISABLED_JS_ENGINE`, `matter` import); public surface unchanged (`splitFrontmatter` is module-private); code-facing doc updated (`viz/README.md` tier line).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, all four `AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md` (names neither package), `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`: no change — visualizer-internal dependency swap. Outside the sweep set: `viz/README.md` updated (in `touches:`)

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Replaced `gray-matter` with a 15-line `splitFrontmatter()` in `viz/src/tasknote-parse.ts` (bare `---` open only; language-tagged or unclosed blocks throw onto the existing catch-and-skip path), removed the CORE-575.3 `$js-yaml` override and `@types/js-yaml`, and bumped `js-yaml` 4.3.2→5.4.2 — the bump CORE-639.3 had to revert. js-yaml 5's empty-input throw is guarded before `load`. Tests 568→575 (7 splitter cases; the three FE-071/CVE engine tests pass unchanged). Roster green; `npm audit` clean. `touches:` reconciliation: declared 6 paths; diff also removes `.flowtron/sidequest/CORE-640.md` (stub retirement, expected) and adds the archive move. Maintainability effect: one fewer dependency (unmaintained since 2021, plus 5 transitive), no `overrides` block to explain, and the frontmatter contract is now readable in-repo.

**Archived:** 2026-09-21
