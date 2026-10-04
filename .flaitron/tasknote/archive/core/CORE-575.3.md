---
title: gray-matter-js-yaml-residue
status: completed
tags: []
created: 2026-09-11
due:
related-tasks: [CORE-EPIC-575, CORE-575.2]
touches:
  - viz/package.json
  - viz/package-lock.json
---

# CORE-575.3 | gray-matter-js-yaml-residue

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-575]]

## 🎯 Goal

Resolve the leftover js-yaml 3.x audit advisory pulled in via gray-matter — either an `overrides` pin to 4.x (verifying `tasknote.test.ts` engine-override tests still pass) or a named accept in `SECURITY.md` — so `npm audit` exits 0 or every remaining advisory is documented with a reason.

## ✅ Acceptance

- [x] `viz/package.json` pins gray-matter's nested `js-yaml` to the top-level 4.x line via npm `overrides` — `grep -n '"overrides"' viz/package.json` → `25:  "overrides": {`
- [x] Lockfile shows a single resolved `js-yaml` (no nested `gray-matter/node_modules/js-yaml`) — confirmed: only `node_modules/@types/js-yaml` and `node_modules/js-yaml` remain
- [x] `tasknote.test.ts` engine-override tests still pass — 57/57 passed
- [x] `npm audit` exits 0 — 0 vulnerabilities
- [x] Full validation gates still pass — test 531/531, typecheck clean, lint clean

## 🧩 Subtasks

- [x] Re-run `npm --prefix viz audit` to confirm current advisory state (CORE-575.2's recap flagged this may already be 0) — confirmed 0
- [x] Confirm gray-matter's default `yaml`/`javascript` engines are never invoked at runtime (both overridden in `viz/src/tasknote-parse.ts`) — read the source and gray-matter's `lib/engines.js`
- [x] Add an `overrides` entry to `viz/package.json` pinning gray-matter's `js-yaml` to the root `js-yaml` version (`"gray-matter": { "js-yaml": "$js-yaml" }`)
- [x] Apply the override and regenerate the lockfile — done surgically (`npm ci` + targeted `npm install gray-matter@4.0.3`) after a naive full reinstall proved to cause unrelated version drift (see Implementation Notes)
- [x] Run the full validation gates (test / typecheck / lint) and `npm audit`
- [x] Decide whether a short `SECURITY.md` note is warranted — decided no: there is no active advisory to accept (audit is already 0), so there's nothing to document under the existing threat-model/scanner-allowlist sections; the override's rationale lives in this tasknote (discoverable via the archive-skim convention, same as CORE-575.2's pointer forward to this task)

## 🔗 Related

- [[CORE-EPIC-575]] — parent epic (viz-dependency-posture)
- [[CORE-575.2]] — predecessor (npm-audit-fix-in-range)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The epic's own goal ("settle the gray-matter → js-yaml 3.x residue") is broader than the audit exit code, which CORE-575.2 already cleared as a side effect. The residue (a duplicate, functionally-dead js-yaml 3.x copy under gray-matter) is still real and worth resolving via `overrides` now that Discovery confirmed it's safe to do so.

- [x] Read relevant source files — `viz/src/tasknote-parse.ts` (both gray-matter engines overridden — `javascript` disabled, `yaml` routed through the top-level js-yaml's `load` + `CORE_SCHEMA`), `viz/node_modules/gray-matter/lib/engines.js` (gray-matter's own default engines, confirmed unused here), `viz/package.json` / `viz/package-lock.json` (dependency graph), `SECURITY.md` (no existing "named accept" precedent for dependency advisories — only a scanner-allowlist section, not applicable)

- [x] **Best Practices Review** — the fix is a dependency-tree change (`overrides` key), not a code change; no module-boundary or abstraction work involved. `tasknote-parse.ts` already isolates all gray-matter engine usage behind explicit overrides, so there's no other call site to audit.

- [x] **Archive skim** — `archive/core/CORE-575.2.md` (predecessor, same epic) explicitly flagged: "npm audit fix... bumped gray-matter's nested js-yaml from a vulnerable 3.x to 3.15.2... the js-yaml/gray-matter residue targeted by CORE-575.3 may already be resolved; that task's Discovery should re-run npm audit before deciding its own scope." Followed that pointer directly (see Drift check below). No other archived tasknote references `overrides` + `js-yaml` in a comparable way.

- [x] **Drift check** — Confirmed drift from the PLAN.md line's premise: `npm --prefix viz audit` already exits 0 (0 vulnerabilities) as of CORE-575.2's `audit fix` run, which incidentally patched gray-matter's nested js-yaml to 3.15.2 (fixes GHSA-2883/GHSA-5p4m). So the "npm audit exits 0" disjunct of the Acceptance line is *already* trivially true — no active advisory needs a SECURITY.md accept. What's left is the epic's architectural ask: eliminate the now-unused duplicate js-yaml 3.x copy. Verified an `overrides` pin is actually safe to apply (this was the real risk worth checking): gray-matter@4.0.3 is the current `latest` on npm (no newer major exists) and still hard-depends on `js-yaml ^3.13.1` with no upstream migration — so pinning is only possible via `overrides`, not a version bump. gray-matter's `lib/engines.js` eagerly does `yaml.safeLoad.bind(yaml)` / `yaml.safeDump.bind(yaml)` at module-load time; on js-yaml 4.x, `safeLoad`/`safeDump` exist as functions but *throw if called* ("removed in js-yaml 4"). Confirmed empirically that `.bind()` alone does not invoke them, so gray-matter's import does not crash. And since `tasknote-parse.ts`'s single `matter()` call site always overrides both `javascript` and `yaml` engines, gray-matter's own bound `safeLoad`/`safeDump` are never actually called. Net: the `overrides` pin is safe.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumption: given the pin is confirmed safe and the epic explicitly wants the residue "settled" (not just the audit signal restored), proceed with the `overrides` pin as the primary fix; a `SECURITY.md` note is optional documentation of the decision, not a required "accept" (there's no active advisory to accept).

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:** See Drift check above — full reasoning chain for why `overrides` is chosen over a SECURITY.md accept, and why it's verified safe despite gray-matter having no upstream js-yaml 4.x migration.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: pure dependency-tree change (npm `overrides` key), no code pattern involved

- [x] **Minimal refactor gate** — N/A: no code refactor; the fix is entirely in `viz/package.json` + the resolved lockfile

- [x] Implemented the minimal solution — added `"overrides": { "gray-matter": { "js-yaml": "$js-yaml" } }` to `viz/package.json` (the `$js-yaml` form references the root `js-yaml` dependency's own version spec, so the override tracks it automatically rather than duplicating a hardcoded version string)

- [x] Updated/added tests for non-trivial behavior — N/A, no source behavior changed; existing `tasknote.test.ts` engine-override tests are the relevant regression guard and were re-run (see Testing Notes)

**Implementation Notes:** Applying the override was not as simple as `npm install` — an incremental install (even `--force`) left the lockfile untouched ("up to date"); npm only re-evaluates a package's override-affected subtree when that package itself is reinstalled. A full `rm -rf node_modules package-lock.json && npm install` did apply the override correctly, but also silently re-resolved ~20 unrelated transitive packages to newer semver-matching versions (react 19.2.8→19.3.0, eslint 8.67.0→8.70.0, etc.) — clear scope creep for a task that should touch only the gray-matter/js-yaml edge. Recovered by restoring the original lockfile (`git checkout`), running `npm ci` for an exact clean baseline, then `npm install gray-matter@4.0.3` (reinstalling the same already-declared version) — this re-evaluates only gray-matter's subtree against the new override without touching anything else. Final lockfile diff is a clean 41-line removal: `gray-matter/node_modules/js-yaml` (3.15.2) plus its own now-orphaned transitive deps (`argparse@1.0.10`, `sprintf-js@1.0.3`, `esprima@4.0.1`) — no other package version changed.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `npm --prefix viz test -- tasknote.test.ts` (57/57 passed, includes the engine-override tests)

- [x] Ran lint/type-check on changed code — `npm --prefix viz run typecheck` and `npm --prefix viz run lint` both clean

- [x] **Verification receipt** — see Testing Notes below; no duplication/dead-code/public-surface growth (one `overrides` key added, no code touched); no doc drift (SECURITY.md needs no change — no active advisory to accept, see Discovery/Implementation Notes)

- [x] N/A — dependency/audit maintenance task, no UI or frontend surface changed

**Testing Notes:**
- `npm --prefix viz audit` → 0 (0 vulnerabilities, unchanged — was already 0 after CORE-575.2, confirmed still 0 with the residue removed)
- `npm --prefix viz test -- tasknote.test.ts` → 0 (57/57 passed)
- `npm --prefix viz test` (full suite) → 0 (531/531 passed)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- `find node_modules/gray-matter -maxdepth 2` → confirms no nested `node_modules/js-yaml` under gray-matter; `node_modules/js-yaml` resolves to a single shared 4.3.2

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change to any entry in `.flowtron/tasknote/README.md` §"AI-referenced docs"; this is a viz-local dependency-tree change with no workflow contract, delegation, template, or skill-wiring surface touched

- [x] Closed — every `## ✅ Acceptance` criterion ticked; `status:` flipped to `completed`; PLAN.md line flipped to stub form, kept nested under active parent `CORE-EPIC-575`; tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary below

**Final Summary:**

Added an npm `overrides` entry to `viz/package.json` (`"gray-matter": { "js-yaml": "$js-yaml" }`) pinning gray-matter's nested `js-yaml` dependency to the top-level 4.x line, eliminating the last duplicate/unused copy from the tree. Discovery first confirmed drift from the PLAN.md line's premise: `npm audit` already exited 0 as a side effect of CORE-575.2's `audit fix` run (which incidentally patched the nested js-yaml to 3.15.2), so there was no active advisory left to accept in `SECURITY.md` — but the epic's own goal was to "settle" the residue, not just clear the audit signal, and Discovery verified the `overrides` pin was safe despite gray-matter (latest = 4.0.3, no newer major, no upstream js-yaml 4.x migration) never having moved off js-yaml 3.x: its default engines are bound but never invoked, since `viz/src/tasknote-parse.ts`'s single `matter()` call site always overrides both the `javascript` and `yaml` engines.

Applying the change was not a plain `npm install` — an incremental install left the lockfile untouched, and a full `rm -rf node_modules package-lock.json && npm install` did apply the override but also silently bumped ~20 unrelated transitive packages (react, eslint, typescript-eslint, etc.) to newer semver-matching versions, which would have been unwarranted scope creep. Recovered via `git checkout` of the lockfile + `npm ci` for an exact baseline, then `npm install gray-matter@4.0.3` (reinstalling the already-declared version) to re-resolve only gray-matter's subtree against the new override. Final `viz/package-lock.json` diff is a clean 41-line removal (`gray-matter/node_modules/js-yaml@3.15.2` and its now-orphaned transitive deps `argparse@1.0.10`, `sprintf-js@1.0.3`, `esprima@4.0.1`) — no other package version changed.

Verification: `npm --prefix viz audit` → 0 vulnerabilities (unchanged, confirms the fix didn't regress); `npm --prefix viz test` → 531/531 passed (including the 57 `tasknote.test.ts` tests covering the gray-matter engine overrides); `npm --prefix viz run typecheck` and `npm --prefix viz run lint` both clean. `touches:` scope matches exactly: `viz/package.json` (+6/-1 lines) + `viz/package-lock.json` (-41 lines). No code changed, no refactor needed, no docs drifted. Maintainability effect: the dependency tree no longer carries a duplicate, functionally-dead js-yaml 3.x copy that could resurface in a future `npm audit` if a new advisory targets that line — closing the residue the epic was filed to address, entirely via lockfile hygiene rather than a code or `SECURITY.md` change.

**Archived:** 2026-09-11
