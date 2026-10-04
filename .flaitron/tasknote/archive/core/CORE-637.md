---
title: root-justfile-viz
status: completed
tags: []
created: 2026-09-20
due:
related-tasks: []
touches:
  - justfile
---

# CORE-637 | root-justfile-viz

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add a hand-authored root `justfile` mapping `setup`/`dev`/`test`/`lint`/`typecheck`/`build` to `npm --prefix viz …`, so flowtron's `viz/`-only layout (no root manifest, outside natabula's auto-adapt subdir set) is no longer permanently `refused` by caobunga's suite discovery.

## ✅ Acceptance

- [x] Root `justfile` exists with `setup`/`dev`/`test`/`lint`/`typecheck`/`build` recipes, each delegating to `npm --prefix viz …` — `test -f justfile`
- [x] `just --list` enumerates exactly those six recipes (plus the standard `default`) with no errors — `just --list`
- [x] Each recipe body matches the command CLAUDE.md §"Validation"/§"Dev Server" and `viz/README.md` already document for that verb — `judgment` (cross-check against those two docs; no single command decides equivalence)
- [x] `just setup`, `just lint`, `just typecheck`, `just test`, `just build` all exit 0 against the current `viz/` tree — `just setup && just lint && just typecheck && just test && just build`

## 🧩 Subtasks

- [ ] Author root `justfile` with header comment (per natabula's shipped `templates/justfile` style) noting this is a hand-authored, non-auto-adapting body for the `viz/`-only layout
- [ ] Add `default` (list recipes), `setup`, `dev`, `test`, `lint`, `typecheck`, `build` recipes, each a one-line `npm --prefix viz <script>` delegation
- [ ] Run each recipe once to confirm it exits 0
- [ ] Doc-drift sweep: confirm no `AI-referenced docs` entry needs updating (justfile is an additive convenience per natabula's "tendency, not a gate" convention — CLAUDE.md/AGENTS.md's canonical validation commands are unchanged)

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line, `CLAUDE.md` §"Validation"/§"Dev Server", and `viz/package.json` all still match — no drift. `viz/` has no root manifest and sits outside natabula's `frontend`/`backend`/`landing`/`worker` auto-adapt set, confirmed by `natabula/docs/STACK-TENDENCIES.md` §"Non-standard repos hand-author bodies" (which names this exact task, CORE-637, as one of its fleet cases).

- [x] Read relevant source files — `viz/package.json` (scripts: `dev`, `build`, `preview`, `test`, `typecheck`, `lint` — no `setup` script, so `setup` maps to `npm --prefix viz install`), `CLAUDE.md` §"Validation"/§"Dev Server" (canonical commands run from repo root with `--prefix viz`), `viz/README.md` (module-tier + no-Node-under-`src/ui/` rule, doesn't affect justfile shape), natabula's `templates/justfile` (shipped auto-adapt shape, for header-comment style and verb naming only — not reused verbatim since it doesn't cover a `viz/`-only layout).

- [x] **Best Practices Review** — single new root file, no existing abstraction to extend at the repo-root level; matched the six verb names and one-line-delegation shape natabula's own fleet uses for its other hand-authored cases (stockshock/delparte, pidlyse, email-manager, 3pnf) per `STACK-TENDENCIES.md` §"Non-standard repos hand-author bodies". No refactor implied.

- [x] **Archive skim** — `archive/core/` has no prior justfile-related tasknote (`ls` + name skim; no hits to grep for a nonexistent `justfile` path). No prior design decisions to reconcile.

- [x] **Drift check** — none: PLAN.md line, `CLAUDE.md`, `viz/package.json` scripts, and the natabula spec section all agree on the shape.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: (1) only the six verbs named in the PLAN.md line are in scope — no `e2e`/`coverage`/`default`-beyond-list extras from natabula's fuller template; (2) `setup` delegates to `npm --prefix viz install` since `viz/package.json` has no `setup` script of its own; (3) this justfile is a flat, non-auto-adapting body (single stack, no subdir detection needed) matching the "non-standard repos hand-author bodies" convention, not the shipped auto-adapt template.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:** Confirmed via `natabula/docs/STACK-TENDENCIES.md` (sibling repo under `~/Code`, read-only per the standing exception) that this exact task is already named there as a fleet case: "a nested `viz/` visualizer outside the subdir set and with no root manifest (`flowtron` — every body `npm --prefix viz …`, filed as flowtron `CORE-637`)." No open design question remains — the shape is fully specified by the PLAN.md line plus that natabula section.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A framing: no in-repo justfile pattern to extend (this is flowtron's first); followed natabula's fleet convention for hand-authored non-auto-adapting bodies (keep verb names, adapt bodies) instead of inventing a new shape.

- [x] **Minimal refactor gate** — N/A, no existing code touched; new standalone file only.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, a justfile has no unit-testable logic; verified instead by running each recipe (Phase 3).

**Implementation Notes:** Added root `justfile` with `default`/`setup`/`dev`/`test`/`lint`/`typecheck`/`build` recipes, each a one-line `npm --prefix viz …` delegation. `dev` is a long-running server — not exercised by an exit-code check (verified by inspection against `viz/package.json`'s `dev` script and `viz/README.md`'s pinned-port note instead).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `just test` (delegates to `viz` vitest suite; no viz source changed, ran as the acceptance-criterion verify command)

- [x] Ran lint/type-check on changed code — `just lint`, `just typecheck` (justfile itself has no linter; viz lint/typecheck untouched and still green)

- [x] **Verification receipt** — no avoidable duplication/dead code/unexplained complexity (7 one-line recipes, natabula fleet shape); no public-surface growth beyond the new root `justfile`; no stale docs (doc-drift sweep below).

  - `test -f justfile` → 0
  - `just --list` → 0, lists exactly `default`/`build`/`dev`/`lint`/`setup`/`test`/`typecheck`
  - Cross-check against CLAUDE.md §"Validation"/§"Dev Server" and `viz/README.md`: `judgment` — recipe bodies (`npm --prefix viz install/run dev/test/run lint/run typecheck/run build`) match those docs' commands verbatim
  - `just setup && just lint && just typecheck && just test && just build` → 0 (setup: audited 358 packages, 0 vulnerabilities; lint: clean; typecheck: clean; test: 568/568 passed, 29 files; build: `tsc --noEmit && vite build` succeeded, `dist/` produced and gitignored)

- [x] (frontend) Asked the user for visual confirmation — N/A, no frontend UI changed (root tooling file only)

**Testing Notes:** All four acceptance verify commands pass. `dev` recipe not exit-code-tested (long-running server); verified by inspection against `viz/package.json`'s `dev` script instead.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change to any listed doc. The justfile is an additive convenience wrapper per natabula's "tendency, not a gate" convention (`STACK-TENDENCIES.md` §"Non-standard repos hand-author bodies"): the underlying `npm --prefix viz …` commands CLAUDE.md §"Validation"/§"Dev Server" and `viz/README.md` document remain the canonical, still-accurate commands. `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the platform snippets, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` — none reference a root justfile or its absence, so none drift.

- [x] Closed

- [x] **Evidence-based recap** drafted (below)

**Final Summary:** Added root `justfile` (7 recipes: `default`/`setup`/`dev`/`test`/`lint`/`typecheck`/`build`, ~35 LOC) delegating to `npm --prefix viz …`, unblocking caobunga's suite discovery for flowtron's `viz/`-only layout (natabula NAT-304). No existing code touched — new standalone file only, so no refactor was needed or deferred. Verification: `just setup && just lint && just typecheck && just test && just build` all exit 0 (lint/typecheck clean, 568/568 viz tests passed, build succeeded). `touches:` reconciliation — declared `justfile`; `git diff --name-only` (untracked) shows `justfile` + this tasknote, matching. Doc-drift sweep found nothing to update (see above). Maintainability effect: gives flowtron the same `just <verb>` muscle-memory interface as the rest of the natabula fleet, with zero change to the underlying commands or CI.

**Archived:** 2026-09-20
