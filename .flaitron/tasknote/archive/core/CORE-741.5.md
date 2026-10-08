---
title: viz-frontier-tier
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-741, CORE-741.2, CORE-741.3, CORE-741.4]
blocked-by: [CORE-741.2]
parallel-safe-with: [CORE-741.3, CORE-741.4]
touches:
  - viz/src/parser.ts
  - viz/src/parser.test.ts
  - viz/src/ui/ModelChip.tsx
  - viz/src/ui/ModelChip.test.tsx
  - viz/src/ui/App.test.tsx
  - SPEC/plan-parser.md
  - SPEC/fixtures/plan/tolerances.md
  - SPEC/fixtures/plan/tolerances.json
  - SPEC/fixtures/plan/markers.md
  - SPEC/fixtures/plan/markers.json
  - SPEC/fixtures/plan/README.md
---

# CORE-741.5 | viz-frontier-tier

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-741]]

## 🎯 Goal

Teach the viz parser and ModelChip the `[frontier]`💎 rung, and bucket `fable` to it, without changing `[xheavy]`🔭 handling.

## ✅ Acceptance

- [x] `SUGGESTION_GLYPH` accepts 💎 with and without a space, and on either side of `[unattended]`, with `model: frontier` — `npm --prefix viz test -- --run src/parser.test.ts`
- [x] `ModelChip` renders 💎 for `frontier`, `fable`, and `mythos`; 🧠 for `opus` and `heavy`; 🔭 only for `xheavy` — `npm --prefix viz test -- --run src/ui/ModelChip.test.tsx`
- [x] A `[fable]` row renders 💎 in the task row — `npm --prefix viz test -- --run src/ui/App.test.tsx`
- [x] `SPEC/fixtures/plan/` tolerances and markers pin the frontier glyph (no-space, spaced, both marker orders) and leave the `[xheavy]`🔭 rows in place — same parser test (conformance) and `grep -q '\\[xheavy\\]🔭' SPEC/fixtures/plan/tolerances.md SPEC/fixtures/plan/markers.md`
- [x] `SPEC/plan-parser.md` names 💎 as the frontier suggestion glyph — `grep -q '💎' SPEC/plan-parser.md`

## 🧩 Subtasks

- [ ] Add 💎 to `SUGGESTION_GLYPH` and the parser comment that lists the tolerated glyphs
- [ ] Split `FRONTIER_MODELS` out of `HEAVY_MODELS` (`frontier`, `fable`, `mythos`) and render 💎 before the heavy branch
- [ ] Extend tolerances and markers fixtures (md + hand-edited json) and the fixture README count
- [ ] Name 💎 in `SPEC/plan-parser.md`'s suggestion-glyph tolerance
- [ ] Add parser, ModelChip, and App row tests; keep the existing xheavy cases

## 🔗 Related

- [[CORE-EPIC-741]] — parent epic (effort-tiers)
- [[CORE-741.2]] — predecessor: frontier-rung contract and the glyph table this chip mirrors (`blocked-by`)
- [[CORE-741.3]] — parallel sibling: PLATFORMS map (`parallel-safe-with`; closed)
- [[CORE-741.4]] — parallel sibling: routing-skill sweep (`parallel-safe-with`; closed)
- [[FE-108]] — predecessor shape: `XHEAVY_MODELS` set beside `HEAVY_MODELS`

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The open `[medium]` child matches the code: `frontier` is not in the suggestion-glyph alternation, and `fable` still sits in `HEAVY_MODELS`.

- [x] Read relevant source files — bounded read, no probe: `viz/src/parser.ts` (glyph alternation), `viz/src/ui/ModelChip.tsx`, `ModelChip.test.tsx`, the fable row assertion in `App.test.tsx`, `SPEC/plan-parser.md` §"Parser tolerances", `SPEC/model.md` §"Tier ladder vs. the next-move suggestion glyph", `SPEC/fixtures/plan/{tolerances,markers}.{md,json}` and `README.md`.

- [x] **Best Practices Review** — `ModelChip` already uses one `Set` per rung that draws a glyph (`HEAVY_MODELS`, `XHEAVY_MODELS`). A third `FRONTIER_MODELS` set extends that shape. The parser already drops suggestion glyphs; 💎 joins the existing alternation. No new abstraction. Medium and light stay glyph-free (FE-078 asymmetric chip).

- [x] **Archive skim** — area `archive/core/` confirmed in `.flaitron/tasknote/README.md`. Load-bearing hits, not a full path dump: [[CORE-741.1]] Fan-out (this child after .2, parallel with .3/.4 — both now closed), [[CORE-741.2]] (`fable`→💎, `opus` stays 🧠, `mythos` is the frontier sibling), [[FE-108]] (xheavy chip; leave that branch first so a token cannot match two glyphs). `archive/fe/` holds FE-108. No ⚠️ superseded pointer on those notes.

- [x] **Drift check** — PLAN line matches HEAD. `SUGGESTION_GLYPH` is `🧠|🔧|🧩|🔭` (`parser.ts`), so `[frontier]💎` fails the line today. `HEAVY_MODELS` is `opus`, `fable`, `mythos`, `heavy`. `SPEC/model.md` already maps `[frontier]`→💎 and `fable`→💎. `SPEC/plan-parser.md` still lists four glyphs. Fixture README says "all four". `[xheavy]` rows FX-123 / FX-204 / FX-205 are the ones to leave intact. No line-number or function-name drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

No clarifications needed. Assumptions:

- `mythos` moves with `fable`. `SPEC/model.md` bands it as fable's frontier sibling, and it lives in the same `HEAVY_MODELS` set. The PLAN line names `fable`; leaving `mythos` on 🧠 would contradict the inherent-tier rule the chip cites.
- `gpt-5` and `codex` stay glyph-free. Frontier for those tokens is effort-conditional (Astra @ xhigh), not inherent the way `fable` is.
- Medium and light chips stay absent. This task adds the frontier rung to the existing asymmetric chip. It does not start drawing 🔧 or 🧩.
- `SPEC/plan-parser.md` and `SPEC/fixtures/plan/README.md` are in scope because a grammar change lands in the prose, the fixture JSON, and the parser together (`SPEC/fixtures/plan/README.md`). Canonical fixtures are not extended; the PLAN line names markers and tolerances only.
- `[xheavy]` parsing, the 🔭 chip, and the existing xheavy fixture rows are not rewritten.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Pattern survey — third `Set` beside `HEAVY_MODELS` / `XHEAVY_MODELS`, checked after xheavy and before heavy, and 💎 appended to the existing `SUGGESTION_GLYPH` alternation. No new component. Minimal refactor gate — nothing else restructured. `parser.ts` category comment now names `frontier` and `xheavy`. Fixtures: FX-125/FX-126 (tight and spaced 💎) and FX-226/FX-227 (💎 on either side of `[unattended]`). Existing `[xheavy]`🔭 rows left as written. `SPEC/plan-parser.md` lists 💎 (frontier) with the other suggestion glyphs.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Targeted parser, ModelChip, and App tests, then typecheck and lint. Not the full viz suite: the diff is the glyph alternation, one chip, and fixtures.

Verification receipt:

- `npm --prefix viz test -- --run src/parser.test.ts src/ui/ModelChip.test.tsx src/ui/App.test.tsx` → 0 (190 passed)
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0
- `grep -q '💎' SPEC/plan-parser.md` → 0
- `grep -q '\[xheavy\]🔭' SPEC/fixtures/plan/tolerances.md SPEC/fixtures/plan/markers.md` → 0

After the review notes: `npm --prefix viz test -- --run src/parser.test.ts src/ui/ModelChip.test.tsx` → 0 (126 passed).

Structural half: three tier sets, one glyph alternation, no dead branch. Medium and light still return null. `plan-parser.md` and the fixture README match the new glyph. No public export added.

External review (read-only subagent, working-tree diff): blockers none. Notes, all fixed:

1. `markers.md` FX-207 still painted 🧠 on `[fable]`. Fixed: the decorative glyph is now 💎. The row's expected parse is unchanged (glyphs are dropped).
2. Fixture README said tolerances pin the glyph on either side of the trailing run. Fixed: tolerances cell says frontier tight and spaced; markers cell says 💎 on either side.
3. Medium/light ModelChip cases only asserted 🧠 was absent. Fixed: they also assert 💎 and 🔭 are absent.

Operator visual confirm: `good` (2026-10-08). The open plan has no `[frontier]` or `[fable]` row, so the board does not show 💎 yet.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

The viz parser now accepts the 💎 suggestion glyph, and ModelChip draws 💎 for `frontier`, `fable`, and `mythos`. `[xheavy]`🔭 is unchanged. Parser, ModelChip, and App tests, typecheck, and lint passed. No refactor beyond a third tier set beside the existing two.

`touches:` reconciliation: declared paths match the deliverable diff (`viz/src/parser.ts`, `viz/src/parser.test.ts`, `viz/src/ui/ModelChip.tsx`, `viz/src/ui/ModelChip.test.tsx`, `viz/src/ui/App.test.tsx`, `SPEC/plan-parser.md`, `SPEC/fixtures/plan/tolerances.md`, `SPEC/fixtures/plan/tolerances.json`, `SPEC/fixtures/plan/markers.md`, `SPEC/fixtures/plan/markers.json`, `SPEC/fixtures/plan/README.md`). PLAN.md and this tasknote are the closure pair, excluded from the declaration.

Doc-drift sweep: no change — `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`. The glyph contract this task extended lives in `SPEC/plan-parser.md`, which is outside the sweep set and was updated in the diff. `docs/PLATFORMS.md` already bands `fable` frontier.

No superseded-claim pointer. FE-108's 🧠-for-fable result was true when that note was written. This change follows the CORE-741.2 reband.

**Learnings:** N/A

**Archived:** 2026-10-08
