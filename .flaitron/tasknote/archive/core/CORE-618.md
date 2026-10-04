---
title: plan-grammar-fixtures
status: completed
tags: [spec, parser, fixtures]
created: 2026-09-19
due:
related-tasks: []
touches:
  - SPEC/fixtures/plan/
  - SPEC/plan-parser.md
  - SPEC/layout.md
  - viz/src/parser.test.ts
---

# CORE-618 | plan-grammar-fixtures

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-502]] [[CORE-494]] [[CORE-598.3]]

## 🎯 Goal

Ship `SPEC/fixtures/plan/` — PLAN.md samples paired with expected-parse JSON — as the shared conformance suite for the task-line grammar, cited from `SPEC/plan-parser.md` and consumed by `viz/src/parser.test.ts`, so the three independent parsers (viz TS, caobunga Python, natabula awk) test against one set of cases.

## ✅ Acceptance

- [x] `SPEC/fixtures/plan/` holds ≥5 `<case>.md` / `<case>.json` pairs plus a `README.md` consumer contract — `ls SPEC/fixtures/plan/*.md SPEC/fixtures/plan/*.json`
- [x] Every `.md` has a `.json` sibling and vice versa — asserted inside the new vitest block (`npm --prefix viz test -- parser`)
- [x] `viz/src/parser.test.ts` runs every fixture through `parsePlanWithDiagnostics` and asserts tasks, unparsed, and nearMissHeadings — `npm --prefix viz test -- parser` → exit 0
- [x] Fixture coverage spans every shape `SPEC.md` §"Task-line format" and `SPEC/plan-parser.md` name (canonical segments, tolerances, `[unattended]`/`[handoff]` + footguns, long-description conventions, exclusions, legacy `## Critical`, rotated month headings) — `judgment`: reviewed against the two contract files' prose, per fixture README table
- [x] `SPEC/plan-parser.md` cites the fixture dir — `grep -q 'SPEC/fixtures/plan' SPEC/plan-parser.md`
- [x] Expected JSON hand-audited against SPEC prose, not just generated — `judgment`: each `.json` reviewed row-by-row in Phase 2
- [x] Downstream consumability spot-checked: caobunga's `grammar.TASK_LINE` agrees on task membership for every fixture — scratchpad Python run against `~/Code/caobunga`, recorded in Testing Notes (read-only; CBN-203 wires it for real)
- [x] `npm --prefix viz run typecheck` and `npm --prefix viz run lint` → exit 0

## 🧩 Subtasks

- [x] Write six fixture samples under `SPEC/fixtures/plan/` (`canonical`, `tolerances`, `markers`, `descriptions`, `exclusions`, `rotated-history`) using a synthetic `FX-*` area prefix
- [x] Generate expected JSON with the reference parser (`viz/src/parser.ts`), then hand-audit every row against `SPEC.md` §"Task-line format" and `SPEC/plan-parser.md`
- [x] Write `SPEC/fixtures/plan/README.md`: file pairing, JSON shape, `description` vs `descriptionRaw`, partial-consumption rule, per-file coverage table
- [x] Add a `describe('SPEC/fixtures/plan conformance')` block to `viz/src/parser.test.ts` (pairing guard + per-fixture assertions)
- [x] Cite the fixtures from `SPEC/plan-parser.md`; add the dir to `SPEC/layout.md`'s `SPEC/` bullet
- [x] Spot-check caobunga's parser against the fixtures from the scratchpad
- [x] Run viz test / typecheck / lint

## 🔗 Related

- [[CORE-502]] — suggestion glyph on either side of the trailing-token run (a tolerance the fixtures pin)
- [[CORE-494]] — `[unattended]` captured from the trailing-token run
- [[CORE-598.3]] — `[handoff]` marker; footguns documented in `SPEC/plan-parser.md`
- caobunga `CBN-203` / natabula `NAT-294` — downstream consumers (depends-on: this task)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** No `SPEC/fixtures/` exists; the three parsers each carry their own inline cases (viz: 1140-line `parser.test.ts`; caobunga: `backend/tests/test_flowtron.py` inline; natabula: `scripts/fleet-pulse.test.sh`). CBN-203 and NAT-294 are filed and waiting on the path `SPEC/fixtures/plan/`. Scope as filed is right-sized.

- [x] Read relevant source files — `SPEC.md` §"Task-line format", `SPEC/plan-parser.md` (whole), `viz/src/parser.ts` (whole), `viz/src/fence.ts`, `viz/src/parser.test.ts` (test roster + import style), `viz/vite.config.ts` (vitest config), `viz/tsconfig.json` (`resolveJsonModule`, `include: src/**`), `templates/PLAN.md`, `.github/workflows/ci.yml`, `docs/CONTEXT-BUDGET.md` §Budgets. Sibling consumers (read-only): `~/Code/caobunga/backend/caobunga/flowtron/{grammar,reader,dto}.py`, `~/Code/natabula/scripts/fleet-pulse.sh` awk block.

- [x] **Best Practices Review** — Touched responsibilities: (a) contract data (`SPEC/fixtures/plan/`), (b) contract prose citation (`SPEC/plan-parser.md`), (c) the reference parser's test. Dependency direction: test → fixtures (read via `node:fs`, fine — test files are not under `src/ui/`, and sibling tests already import `node:fs`). No parser code changes; fixtures pin current behaviour. No new abstraction: one `describe` block, one small normalizer. Duplication: inline tests stay — they document *why* per case; fixtures are the cross-parser contract.

- [x] **Archive skim** — `archive/core/` confirmed via README table (`CORE-*` → `archive/core/`). 40 notes mention `plan-parser.md` / `parser.test.ts`; none mention a fixture dir or conformance suite. Load-bearing: CORE-502 (glyph on either side of trailing run — both orders must be fixture cases), CORE-494 (`[unattended]` capture + the pre-`[model]` footgun), CORE-598.3 (`[handoff]`; the `[!handoff]` footgun), CORE-336 (HTML-comment blanking preserves line numbers — an exclusions case), CORE-333 (TASK_ID_BODY threaded through five regex slots — lettered/nested IDs are fixture cases). Filing commit `dc8d929` names the downstream consumers.

- [x] **Drift check** — PLAN line paths all current: `SPEC/plan-parser.md` exists and is the tolerances module; `viz/src/parser.test.ts` exists (1140 lines). `SPEC/fixtures/plan/` does not exist yet (expected — it is the deliverable). No SPEC contract contradicted: fixtures pin behaviour already documented in `SPEC.md` §"Task-line format" and `SPEC/plan-parser.md`. `plan-parser.md` mentions a `[A-Z]+-[0-9]+` wikilink-integrity grep; no such gate is live in CI or `/ft-release` today — fixtures use a synthetic `FX-*` prefix anyway so sample wikilinks can never be mistaken for real cross-refs.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit

**Discovery Notes:**

No clarifications needed. Explicit assumptions:

1. **Expected JSON uses the reference parser's field names** (`viz/src/parser.ts` `Task`: `id`, `completed`, `priority`, `critical`, `unattended`, `handoff`, `model`, `shortname`, `description`, `completedDate`, `relatedTasks`, `blockedBy`) plus `line` (1-based, in the sample file). Absent optionals are JSON `null`. Consumers map names locally (caobunga: `task_id`, `blocked_by`).
2. **`description` vs `descriptionRaw`.** viz's `Task.description` is *presentation-cleaned* (`Completed YYYY-MM-DD.` stamp removed, `**` stripped, whitespace collapsed, leading/trailing `.` trimmed); caobunga stores the raw captured segment (`.strip()` only). Both are legitimate readings, so the JSON carries both: `descriptionRaw` (the grammar-level ` — ` segment, trimmed) and `description` (the reference cleaning). A consumer asserts whichever it models.
3. **Partial-consumption rule.** A consumer must agree on task *membership and order* (which lines parse, under which priority, checked or not) and on every field it models; it ignores fields and top-level keys (`unparsed`, `nearMissHeadings`) it has no channel for. natabula's awk only decides membership + section + checked + stamp — that is a valid conformance run.
4. **Scope excludes `groupTasks` nesting** (a viz view over IDs, not line grammar) and tasknote frontmatter (not PLAN.md).
5. **`rotated-history` is flagged optional** in the README: month headings are `PLAN-ARCHIVE.md` grammar; a consumer that never reads the archive may skip that file by name.
6. **Generation method.** Expected JSON is produced by running the reference parser over each sample, then audited row-by-row against SPEC prose before commit. Pinning the reference parser's current output is the point (regression pin for viz; contract for the siblings), but the audit is what makes it a *contract* rather than a snapshot.
7. **Synthetic `FX` area prefix** for all fixture IDs so no sample row collides with a real task in any adopter.
8. No `docs/CONTEXT-BUDGET.md` change: fixtures are never loaded to run a task.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Test block extends the existing `describe(...)` roster in `parser.test.ts`; file reads use `node:fs` + `node:path` like sibling tests (`archiveCache.test.ts`, `devApi.test.ts`). `__dirname` (vitest-injected) rather than `import.meta.url`: under the jsdom environment the `URL` global is jsdom's, which Node's `fileURLToPath` rejects. No parser change. The README follows `SPEC/procedures/README.md`'s "directory owns its contract" shape.

- [x] **Minimal refactor gate** — No refactor. Inline tests left in place: they carry the *why* per case (task IDs, rationale); fixtures are the cross-parser *what*. Deferred: nothing.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- `SPEC/fixtures/plan/` — 6 sample/expected pairs + `README.md` (consumer contract). 94 task rows, 14 unparsed rows, 1 near-miss heading across the set.
- Expected JSON was produced by running `viz/src/parser.ts` over each sample (scratchpad script, not committed — "Zero scripts"), then audited row-by-row against `SPEC.md` §"Task-line format" and `SPEC/plan-parser.md`. One row reshaped during audit: `FX-352` originally pinned `"Landed early, , ahead of the cut"` — an artifact of mid-sentence stamp removal, not a contract worth exporting — rewritten so the cleaned form reads naturally while still pinning "stamp extracted wherever it sits".
- JSON carries both `descriptionRaw` (grammar capture) and `description` (reference cleaning) — caobunga stores the former, viz the latter; neither is wrong.
- `viz/src/parser.test.ts` +64: `describe('SPEC/fixtures/plan conformance')` — pairing guard (every `.md` ↔ `.json`, non-empty) + `it.each` over the cases asserting `tasks`, `unparsed`, `nearMissHeadings`. `toTask` maps JSON `null` → `undefined` and drops `line` / `descriptionRaw`, which this parser does not expose.
- `SPEC/plan-parser.md` +10: "Conformance fixtures" paragraph after the canonical-reference sentence. `SPEC/layout.md` +1: `SPEC/fixtures/plan/` bullet.
- README rule refined after the caobunga spot-check (Phase 3): `unparsed` / `nearMissHeadings` are the reference parser's diagnostics — reader policy, not grammar; membership + "never invert a diagnostic" are the invariants.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — `N/A` (no UI change; test + fixtures + SPEC prose)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `ls SPEC/fixtures/plan/*.md SPEC/fixtures/plan/*.json` → 0 (6 + 6 + README)
- `npm --prefix viz test -- parser` → 0 — 110 passed (103 prior + 7 new)
- Mutation check: flipped `markers.json` `FX-200.unattended` → `false` → `1 failed | 109 passed`; restored → 110 passed. The block is not vacuous.
- `npm --prefix viz run typecheck` → 0
- `npm --prefix viz run lint` → 0 (first run flagged two `_unused` destructured names; `toTask` rewritten as an explicit object literal)
- `grep -q 'SPEC/fixtures/plan' SPEC/plan-parser.md` → 0
- Coverage judgment: every bullet in `SPEC/plan-parser.md` (legacy `## Critical`; three decorative tolerances; both marker footguns; rewrite-preservation is authoring guidance, not parse behaviour — no fixture; three adopter near-misses; bare bullets; HTML comments; legacy label lines; wikilink / `Blocked by` conventions incl. code spans) and every example row in `SPEC.md` §"Task-line format" has a fixture row. Month headings from `SPEC/plan-filing.md` in `rotated-history`.
- Downstream spot-check (read-only, `~/Code/caobunga/backend/.venv` python over the fixture dir): `canonical` / `tolerances` / `markers` / `descriptions` / `exclusions` — task membership, order, `line`, `critical`, `model`, `shortname`, `unattended`, `handoff`, `blocked_by`, raw `description` all agree on every row. `rotated-history`: caobunga yields 1/5 (no month-heading support) — the file the README flags optional, confirmed as the right flag. `exclusions` `unparsed`: caobunga's CBN-115 set differs (flags the bare `- [ ] prose` bullet and skips `- [ ]**ID**` and the legacy-shaped rows) — reader policy, which drove the README wording refinement above. Rule 3 (no diagnostic inverted) holds on both sides. Wiring it for real is CBN-203's.
- `.editorconfig`: no trailing whitespace, LF, final newline on every new/changed file.
- Structural quality: no duplication (one normalizer, one `it.each`), no dead code, no public-surface growth in `parser.ts` (untouched), code-facing docs updated (`plan-parser.md`, `layout.md`, fixture README).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: updated (`SPEC/` bullet names `fixtures/plan/`). `AGENTS.md`: updated (Repo Layout `SPEC/` bullet names `SPEC/fixtures/plan/`). `SPEC.md`: no change (§"Task-line format" already delegates to `SPEC/plan-parser.md`, which now cites the fixtures). `docs/MIGRATION.md`: no change (adopters reach the dir through the existing submodule pin; no new wiring). `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`: no change. `docs/CONVENTIONS.md`: no change. `CONTRIBUTING.md`: no change. `SECURITY.md`: no change. `docs/AGENT-NEUTRALITY.md`: no change (fixtures are agent-neutral data).

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Shipped `SPEC/fixtures/plan/` as the shared conformance suite for the PLAN.md task-line grammar: six whole-file samples (`canonical`, `tolerances`, `markers`, `descriptions`, `exclusions`, `rotated-history`) paired with expected-parse JSON — 94 task rows, 14 unparsed diagnostics, 1 near-miss heading — plus a `README.md` consumer contract (JSON shape, `descriptionRaw` vs `description`, the partial-consumption rule, "the JSON is the contract; a grammar change edits prose + fixture + parser in one commit"). `viz/src/parser.test.ts` gained a 7-test conformance block (pairing guard + `it.each` over the cases); `SPEC/plan-parser.md` cites the dir; `SPEC/layout.md`, `AGENTS.md`, `README.md` name it.

**Verification:** `npm --prefix viz test -- parser` → 0 (110 passed); mutation check on `markers.json` → 1 failed, restored → 110; `typecheck` → 0; `lint` → 0. Read-only spot-check of caobunga's parser over the fixtures: every field it models agrees on every row of the five core files; `rotated-history` (unsupported there) and caobunga's own `unparsed` policy are the two boundaries, and the README now states both as reader policy rather than grammar. **Refactors:** none; inline tests kept as the per-case *why*. **Documentation:** `plan-parser.md` +10, `layout.md` +1, `AGENTS.md` +1, `README.md` +1, fixture README new. **`touches:` reconciliation:** declared `SPEC/fixtures/plan/`, `SPEC/plan-parser.md`, `SPEC/layout.md`, `viz/src/parser.test.ts`; actual adds `AGENTS.md` and `README.md` (doc-drift sweep, one line each) — undeclared but in-scope closure edits. **Maintainability effect:** the three fleet parsers (viz TS, caobunga Python, natabula awk) can now run one case set through the pinned submodule — CBN-203 and NAT-294 are unblocked; a grammar change lands with its fixture diff in the same commit, so drift between parsers surfaces on the bump instead of on a real board row (the CORE-579 → CBN-167 pattern).

**Archived:** 2026-09-19
