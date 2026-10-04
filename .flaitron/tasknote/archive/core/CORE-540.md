---
title: updater-unreadable-root-exit
status: completed
tags: []
created: 2026-09-08
due:
related-tasks: []
---

# CORE-540 | updater-unreadable-root-exit

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

`tools/update-adopters.mjs` exits 1 (not 0) when `--root` / `FLOWTRON_VIZ_WORKSPACE` names an unreadable or nonexistent directory, and the `parseArgs` usage-string and `WIRING_SURFACES` thin-bundle duplication are folded.

## ✅ Acceptance

- [x] `discoverAdopters(root)` propagates a `readdir` failure instead of swallowing it into `{ adopters: [], legacy: [] }`
- [x] `main()` catches that failure and exits 1 with a clear "Workspace root is not a readable directory" message, instead of printing "No .flowtron/core adopters found." and exiting 0
- [x] An existing, readable-but-empty workspace still prints "No .flowtron/core adopters found." and exits 0 (regression preserved)
- [x] `parseArgs`'s duplicated `Usage: node tools/update-adopters.mjs [--apply] [--root <dir>]` string (4 copies) is folded into one `USAGE` constant + `usageError()` helper, with existing error-message substrings (`--root requires a value`, `Unknown arg: ...`) unchanged
- [x] `WIRING_SURFACES`'s byte-identical Cursor/Grok thin-bundle entries are folded into a `thinClaudeSkillsSurface(label, snippetPath)` factory, with identical resulting field shape
- [x] Full `tools/update-adopters.test.mjs` suite passes, including new regression tests for the unreadable-root case

## 🧩 Subtasks

- [x] Read `discoverAdopters`, `main`, `parseArgs`, and `WIRING_SURFACES` to confirm current behavior and duplication
- [x] Probe archive for prior design history on these three surfaces
- [x] Fold `WIRING_SURFACES` Cursor/Grok entries into a `thinClaudeSkillsSurface` factory
- [x] Fold `parseArgs`'s usage-string duplication into a `USAGE` constant + `usageError` helper
- [x] Make `discoverAdopters` propagate `readdir` errors instead of swallowing them
- [x] Wrap the `discoverAdopters(root)` call in `main()` to exit 1 with a clear message on failure
- [x] Add regression tests: `discoverAdopters` rejects on a nonexistent root; CLI exits 1 (not 0) on a nonexistent `--root`
- [x] Run the full test suite + syntax checks

## 🔗 Related

- Surfaced by the 2026-09-08 general audit (Finding #4, Medium; Finding #7, Low) — filed alongside FE-102/FE-103/FE-104/FE-105 in the same audit pass (commit `4d946d0`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The PLAN.md line cites a real, current bug: `discoverAdopters` catches every `readdir` error (ENOENT/ENOTDIR/EACCES alike) and returns empty arrays, so `main()` can't distinguish "root doesn't exist/unreadable" from "root exists and is legitimately empty" — both currently print "No .flowtron/core adopters found." and exit 0. The two dedup asks (parseArgs usage string, WIRING_SURFACES thin bundles) are also real and small. All three are mechanical, clear-diff fixes matching the `[light]` tag.

- [x] Read relevant source files — read `tools/update-adopters.mjs` in full around `discoverAdopters` (L460-482), `main` (L769-830), `parseArgs` (L160-192), and `WIRING_SURFACES` (L105-153), plus `tools/update-adopters.test.mjs` to inventory existing coverage and exact-string assertions before changing anything.

- [x] **Best Practices Review** — `discoverAdopters` and `main`'s error-swallowing conflated two distinct failure classes (a nonexistent/unreadable root vs. a legitimately empty one); the fix restores single-responsibility (discovery reports what happened, the caller decides exit behavior) without adding new abstractions. The two dedup asks (`usageError` helper, `thinClaudeSkillsSurface` factory) remove copy-paste with no behavior change — verified via `newSkillWiringSurfaces`, which reads `WIRING_SURFACES` entries generically by field, never by object identity.

- [x] **Archive skim** — grepped `.flowtron/tasknote/archive/CORE/*.md` for `update-adopters` (109 hits — too broad) and narrowed to `parseArgs|WIRING_SURFACES|discoverAdopters|--root` (19 hits, still over the ~3-note threshold), so handed the reading to a probe. Findings: CORE-419.4 is the direct design precedent — it hardened `--root` argument handling to fail loudly ("missing value" / flag-shaped value swallowed into `--apply`) rather than silently degrading to an unintended workspace, which is the exact posture this task continues for the readdir path. No note discusses deduping the usage string specifically — it was duplicated incrementally by copy-paste (CORE-419.4 reused the existing `Unknown arg`-style shape rather than factoring it), and the only existing test assertions are substring regexes (`/Unknown arg/`, `/--root requires a value/`), not full-string equality, so extraction is safe. CORE-465/CORE-438.3/CORE-438.4/CORE-456.3 confirm Cursor and Grok are deliberately structured as identical-shape "thin bundle" surfaces (no own skills dir, both key off `claude/skills/`) — CORE-465 rejected collapsing the *markdown snippet files*, a different concern from collapsing the JS array shape.

- [x] **Drift check** — the PLAN.md line's description matches current code exactly: `discoverAdopters`'s catch-all still swallows `readdir` errors (confirmed by reading), `parseArgs` still has 4 literal copies of the usage string, and `WIRING_SURFACES`'s Cursor/Grok entries are still byte-identical bar `label`/`snippetPath`. No SPEC contract governs internal script structure here. No re-interpretation needed.

- [x] Asked clarifying questions OR logged "No clarifications needed" — No clarifications needed. The fix scope (exit-1 on unreadable root + the two named dedups) is unambiguous from the PLAN.md line and the code itself; the only judgment call — how to distinguish "unreadable root" from "empty root" — resolves cleanly because `readdir` on an existing empty directory doesn't throw, only a missing/non-directory/permission-denied path does, so letting the error propagate (instead of swallowing it) is sufficient with no new stat-based pre-check needed.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Root cause: `discoverAdopters(root)` wraps `readdir(root, ...)` in a bare `try {} catch { return { adopters: [], legacy: [] } }`, so any failure reason (nonexistent path, a file instead of a directory, permission denied) is indistinguishable from "directory exists and is empty." `main()` then only checks `adopters.length === 0` and prints "No .flowtron/core adopters found." with an implicit exit 0. An existing test (`empty workspace prints no-adopters message`) locks in that exit-0 behavior for a *genuinely empty, readable* directory — that must keep passing.

Fix shape: remove the swallow in `discoverAdopters` (let `readdir` reject), then wrap the `discoverAdopters(root)` call site in `main()` in a `try/catch` that logs `Workspace root is not a readable directory: <root> (<fs error message>)` to stderr and calls `process.exit(1)`. This is a pre-flight guard, already covered by the file's documented exit-code contract ("1 = ... or a pre-flight guard aborted"), so no comment/doc update was needed there.

Verified via `newSkillWiringSurfaces` (reads `surface.label`/`snippetPath`/`diffPaths`/`snippetKeyPattern`/`addedKeyForFile` generically) that no code depends on `WIRING_SURFACES` entries being distinct object literals, so the `thinClaudeSkillsSurface` factory is safe.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the file's existing style: small top-level helper functions (`isDir`/`isFile`/`expandHome` precedent) for `usageError`; a factory function for the two structurally-identical `WIRING_SURFACES` entries (no existing factory pattern in this file for array entries, but the duplication was 100% byte-identical bar two fields, so a factory was the natural minimal shape — no new dependency or abstraction layer introduced).

- [x] **Minimal refactor gate** — the three changes touch only the code named in the PLAN.md line: `discoverAdopters`'s catch block, the `main()` call site, `parseArgs`'s two duplicated branches, and `WIRING_SURFACES`'s Cursor/Grok entries. No unrelated cleanup.

- [x] Implemented the minimal solution — see diff in `tools/update-adopters.mjs`: (1) `thinClaudeSkillsSurface(label, snippetPath)` factory replacing the Cursor/Grok literals; (2) `USAGE` constant + `usageError(firstLine, exitOnError)` helper replacing `parseArgs`'s 4 duplicated usage-string branches; (3) `discoverAdopters` no longer catches `readdir` failures; `main()` wraps the `discoverAdopters(root)` call and exits 1 with a clear message on failure.

- [x] Updated/added tests for non-trivial behavior — added `discoverAdopters` rejects when root does not exist (unit) and `nonexistent --root exits 1 instead of reporting no adopters` (CLI-level, `tools/update-adopters.test.mjs`).

**Implementation Notes:**

`main()`'s destructure changed from `const { adopters, legacy } = await discoverAdopters(root);` to a `let` pair assigned inside a `try/catch`, since `const` destructuring can't be reassigned inside a catch-recovered flow. `process.exit(1)` inside the catch matches the file's existing style (no `return`/`throw` needed after it — every other `process.exit()` call in this file relies on the same immediate-termination semantics).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `node --test tools/update-adopters.test.mjs`: 51/51 pass (49 pre-existing + 2 new).

- [x] Ran lint/type-check on changed code — N/A with reason: `tools/` has no ESLint/TS config (root has none; `viz/`'s lint/typecheck scope `viz/src/` only, per `viz/README.md`); this repo's own validation section names `node --check` as the substitute for `tools/`, which was run and passed on both `tools/update-adopters.mjs` and `tools/update-adopters.test.mjs`.

- [x] **Quality assertions** — no duplication left in the touched surfaces (usage string now single-sourced, Cursor/Grok now share one factory); no dead code; no public-surface growth (`discoverAdopters`'s exported signature is unchanged — only its failure behavior changed, which is the point of the fix); no stale documentation (the file's top-of-file exit-code comment already documents "a pre-flight guard aborted" as an exit-1 case generically, so it already covers this new guard without edit).

- [x] (frontend) Asked the user for visual confirmation — N/A: this is a Node CLI script with no UI surface.

**Testing Notes:**

```
node --check tools/update-adopters.mjs
node --check tools/update-adopters.test.mjs
node --test tools/update-adopters.test.mjs
# ℹ tests 51 · pass 51 · fail 0
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs": no change. None of the listed docs describe `update-adopters.mjs`'s internal `discoverAdopters`/`parseArgs`/`WIRING_SURFACES` implementation details (the change is internal error-handling + dedup, not a documented contract, CLI surface, or exit-code table beyond what the file's own header comment already states generically).

- [x] Closed — every Acceptance criterion above ticked; `status:` flipped to `completed`; PLAN.md line flipped to stub form and moved to top of `## Completed`; tasknote moved to `.flowtron/tasknote/archive/CORE/CORE-540.md`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Fixed `tools/update-adopters.mjs` so a nonexistent or unreadable `--root` / `FLOWTRON_VIZ_WORKSPACE` now fails with exit 1 and a clear stderr message ("Workspace root is not a readable directory: <root> (<reason>)"), instead of being silently misreported as "No .flowtron/core adopters found." with exit 0 — `discoverAdopters` no longer swallows `readdir` failures; `main()` catches them at the call site. A genuinely empty, readable workspace is unaffected (still exits 0 with the "no adopters" message; regression-tested).

Also folded two duplication findings from the same audit: `parseArgs`'s 4-copy `Usage: node tools/update-adopters.mjs [--apply] [--root <dir>]` string into one `USAGE` constant + `usageError()` helper, and `WIRING_SURFACES`'s byte-identical Cursor/Grok "thin bundle" entries into a `thinClaudeSkillsSurface(label, snippetPath)` factory.

Changed files: `tools/update-adopters.mjs` (+27/-46 net across three sites), `tools/update-adopters.test.mjs` (+18, two new regression tests). Full suite: 51/51 passing. No documentation required an update.

**Archived:** 2026-09-08
