---
title: updater-followthrough-owner
status: completed
tags: []
created: 2026-11-24
due:
related-tasks: [CORE-853, CORE-916, CORE-922, CORE-852.6]
touches:
  - SPEC/fixtures/workflow-block/cases.json
  - tools/update-adopters.mjs
  - tools/update-adopters.test.mjs
  - claude/skills/ft-update/SKILL.md
  - codex/skills/ft-update/SKILL.md
  - SPEC/layout.md
---

# CORE-921 | updater-followthrough-owner

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-853]] · [[CORE-916]]

## 🎯 Goal

Give the adopter bump follow-through (Workflow-block replace, skill wiring, fork drift) one owner shared by `/ft-update` and `tools/update-adopters.mjs`, then hand the 1,655-line updater to `/ft-refactor` for a split that keeps the safety gates in one module.

## ✅ Acceptance

- [x] `SPEC/fixtures/workflow-block/cases.json` exists and parses, and its cases cover every Workflow-replace rule the skill currently restates: plain swap, last section to EOF, heading on line 1, H1 end, fenced `#` line, tilde/longer fence, fenced `## Workflow`, `<!-- name:start -->` stop (trailing whitespace/CR, first body line), fenced/`:end`/indented marker not a stop, no heading (incl. `## Workflows (CI)`), heading with trailing whitespace, doubled-heading skip, missing-block skip — `node -e "const c=require('./SPEC/fixtures/workflow-block/cases.json');if(!c.describes||c.cases.length<15)process.exit(1)"`
- [x] One exported pure function decides the AGENTS.md write; `followThrough` calls it and the updater suite runs every fixture case through it — `node --test tools/update-adopters.test.mjs` + `grep -c 'workflowFollowThrough(' tools/update-adopters.mjs` ≥ 2
- [x] `/ft-update` Step 3.5 names the fixture as the byte contract (case wins over prose) instead of restating the edge rules — `grep -q 'SPEC/fixtures/workflow-block/cases.json' claude/skills/ft-update/SKILL.md`
- [x] The Codex wrapper defers to Step 3.5 instead of restating its order — `! grep -q 'dangling-link prune' codex/skills/ft-update/SKILL.md`
- [x] `SPEC/layout.md` lists the new fixture beside `fence/` — `grep -q 'SPEC/fixtures/workflow-block/cases.json' SPEC/layout.md`
- [x] Full validation set green — `just check`
- [x] `/ft-refactor tools/update-adopters.mjs` handed off as the post-closure next move (operator choice: run after closure, own review gate and filing commit) — `judgment` (it is a later skill run; no command decides a hand-off) — met: named as the post-commit next move

## 🧩 Subtasks

- [x] Write `SPEC/fixtures/workflow-block/cases.json` (`describes` + `cases[{name, agents, block, expected | skip}]`, line arrays as in `fence/`), migrating the CORE-852.4/853/916 inline `replaceWorkflowSection` cases into it and adding the no-heading / doubled / missing-block / trailing-whitespace cases
- [x] `tools/update-adopters.mjs`: extract the heading-count + skip + replace decision from `followThrough` into exported `workflowFollowThrough(agents, block)`; `followThrough` calls it; header "Follow-through" comment names the fixture
- [x] `tools/update-adopters.test.mjs`: replace the inline `replaceWorkflowSection` assertions with a fixture loop over `workflowFollowThrough`; keep the `## Workflows (CI)` apply-level test and the `workflowPasteBlock` unit test
- [x] `claude/skills/ft-update/SKILL.md` Step 3.5 Workflow bullet: short rule + pointer to `<FT>/SPEC/fixtures/workflow-block/cases.json` as the byte contract
- [x] `codex/skills/ft-update/SKILL.md`: drop the restated Step 3.5 sequence; defer to source Step 3.5
- [x] `SPEC/layout.md`: list the fixture
- [x] Run the validation roster (`just check`)

## 🔗 Related

- [[CORE-853]] — predecessor; needed paired skill + updater edits
- [[CORE-916]] — predecessor; needed paired skill + updater edits

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The duplication is live: `claude/skills/ft-update/SKILL.md` Step 3.5 restates the updater's Workflow-replace byte rules (fence-aware headings, H1/H2/marker end, blank-line shape, doubled-heading skip) line for line, and `codex/skills/ft-update/SKILL.md` restates the Step 3.5 order. CORE-853 and CORE-916 each edited both.

- [x] Read relevant source files — `claude/skills/ft-update/SKILL.md` (full), `codex/skills/ft-update/SKILL.md`, `tools/update-adopters.mjs` header + L996–1505 (follow-through, wiring, forks, applyBump), `tools/update-adopters.test.mjs` L1030–1117 + Codex procedure suite head, `codex/reconcile-skills.md` head, `SPEC/fixtures/fence/cases.json`

- [x] **Best Practices Review** — The Workflow write's decision (count unfenced headings → none / skip / replace) sits inline in `followThrough`, so only `replaceWorkflowSection` is unit-testable; the skip branches are tested only through `applyBump`. Extracting one pure `workflowFollowThrough(agents, block)` gives the fixture a single entry point covering the skips too, and keeps `followThrough` as the I/O shell. Dependency direction stays as is: skill prose → fixture ← updater tests; neither implementation imports the other.

- [x] **Archive skim** — `archive/core/` confirmed against the README table (`CORE-*` → `archive/core/`). `update-adopters` hits 251 notes, so narrowed to the mechanism: `grep -l "replaceWorkflowSection\|Workflow block"` → 14; read CORE-853, CORE-916, CORE-922 (summaries + Acceptance) and grepped CORE-852.1/.4/.6. Load-bearing: CORE-922 set the shared-fixture precedent (`SPEC/fixtures/fence/cases.json`, `{describes, cases}` with line arrays, listed in `SPEC/layout.md`). CORE-852.1 Ties: "`/ft-update` stays the single-repo path (caobunga uses it)", so delegating the skill to the updater would cut against a recorded tie. CORE-852.6 made the skill mirror the updater (the origin of this duplication).

- [x] **Drift check** — PLAN line says 1,655 lines; the file is 1,663 now (minor, CORE-922 grew it). Its "Steps 3–4" is really Step 3.5's Files bullet plus Step 4's prune and rules. No SPEC drift: `SPEC/scope-boundaries.md` keeps the updater an operator-side carve-out, and the skill is markdown-only ("no shell scripts", Step 0 preamble), which the fixture option preserves.

- [x] Asked clarifying questions — operator chose **shared fixtures** as the owner (over skill→updater delegation) and **run `/ft-refactor` after closure** as its own skill run (over inside-task or filing a row). Assumptions: fixtures cover the AGENTS.md Workflow write only, the byte transform where both paired edits happened. The pin-line regex (unchanged since CORE-852.4) and the state-dependent wiring and fork-drift rules keep their current prose. They are not byte transforms a before/after fixture can pin.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Owner model: the fixture is the byte contract. The updater's suite runs it; `/ft-update` reads it from `<FT>` (sparse trim removes only `/.flaitron/`, so `SPEC/fixtures/` ships to adopters). A future rule change edits the fixture + the updater; the skill's prose pointer stays put.
- `workflowPasteBlock` (snippet → block) stays a separate unit test; fixture cases take `block` directly (`null` = snippet block not found).
- Wiring and fork drift remain dual-implemented by design (operator choice); the skill already says "as the updater does" at each such rule.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-922's shared-fixture shape: `SPEC/fixtures/<topic>/cases.json` with `describes` + `cases`, line arrays, a fixture loop in the consumer suite, listed in `SPEC/layout.md`.

- [x] **Minimal refactor gate** — one extraction, for Acceptance: `workflowFollowThrough` lifts the heading-count/skip/replace decision out of `followThrough` so the fixture reaches the skips. `replaceWorkflowSection` lost its `export` (its only external caller, the test, now goes through `workflowFollowThrough`). The 1,663-line split is deferred to `/ft-refactor` per the operator.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Fixture: 19 cases. 13 carried over from the inline `replaceWorkflowSection` assertions (CORE-852.4 / 853 / 916). 6 are new: H3 not an end, trailing-whitespace heading, no heading, `## Workflows (CI)`, only-fenced heading, doubled-heading skip, missing-block skip, no-heading-beats-missing-block.
- Updater: `followThrough` now always resolves the cached paste block before deciding (previously only on exactly one heading). That is a cached `git show` read with null on failure, so notes and writes are unchanged; the existing apply-level tests (symlink/doubled skip, fenced doubled heading, `## Workflows (CI)`) pass unchanged.
- Mutation check: dropping the marker alternative from `SECTION_END` fails the fixture loop on the CORE-916 case; restored.
- Skill Step 3.5 Workflow bullet: 16 lines of restated edge rules → an 11-line summary that names the fixture as the byte contract (case wins over prose). Codex wrapper: the restated Step 3.5 order is replaced by "source Step 3.5 owns the order".

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code — `node --check` on both updater files (zero-dep plain Node, no linter config)

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation — `N/A`: no frontend surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `node --test --test-name-pattern="follow-through|workflow|Workflow" tools/update-adopters.test.mjs` → exit 0, 7/7 (fixture loop + apply-level symlink/doubled/fenced/`## Workflows (CI)` cases).
- Mutation: `SECTION_END` without the marker alternative → the fixture loop fails on "a <!-- name:start --> marker ends the section and is kept (CORE-916)"; restored.
- Receipt (post-review): (1) fixture `node -e …` → exit 0, 19 cases · (2) `node --test tools/update-adopters.test.mjs` → 122/122 pass; `grep -c 'workflowFollowThrough(' tools/update-adopters.mjs` → 2 · (3) `grep -q … claude/skills/ft-update/SKILL.md` → 0 · (4) `! grep -q 'dangling-link prune' codex/skills/ft-update/SKILL.md` → 0 · (5) `grep -q … SPEC/layout.md` → 0 · (6) `just check` → exit 0 (updater 122/122, drift self-test 48/48, all drift checks ok; the six NEAR CAP lines predate this task and are tracked by CORE-EPIC-920; none is a touched file).
- Structural: no duplication (the fixture replaces 13 inline assertions); no dead code (`replaceWorkflowSection` lost only its `export`, and its one external caller now goes through `workflowFollowThrough`).
- **External review** (`/code-review medium`, background fork) — no blockers. In-diff notes, both fixed: (a) the shortened Step 3.5 summary had dropped trailing-whitespace / `## Workflows (CI)` / fenced-heading facts → restored in one sentence; (b) the fixture loop now asserts each case has exactly one of `skip` / `expected`, so a typo fails under the case's name. Pre-existing in a touched file, filed: `workflowPasteBlock` ignores the shared fence rules, and CRLF AGENTS.md gets mixed endings → [[CORE-930]] (park, `e41cbbef`). Out of diff (the reviewer swept earlier commits; not graded here, reported to the operator): `handoff_rows` 4+-space fence indent (CORE-922), `arch-health.yml` `!cancelled()` on timeout, `plan_placeholder` ID shapes (CORE-918.3).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `SPEC/layout.md` updated (fixture listed). No change: `SECURITY.md` §"Bump commits run the adopter's hooks" names the write at path level, not the byte rules; `README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, the four `AGENTS-snippet.md` files, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `docs/PLATFORMS.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` do not restate the Workflow-replace rules (`git grep` sweep).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent); a section this move leaves empty gets its `(none)` back (see `SPEC/plan-filing.md` §"Empty-section placeholder" if unclear), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — `N/A`. The shared-fixture pattern is already discoverable via `SPEC/layout.md`, which now lists two such fixtures.

**Final Summary:**

The AGENTS.md `## Workflow` follow-through now has one owner: `SPEC/fixtures/workflow-block/cases.json` (19 before/after/skip cases, rule in `describes`). The updater's suite runs every case through the new exported `workflowFollowThrough`, which `followThrough` calls, and `/ft-update` Step 3.5 reads it from `<FT>` as the byte contract, with the case winning over the prose summary. The Codex wrapper no longer restates the Step 3.5 order. Wiring and fork drift keep their prose by operator choice (state-dependent, not byte transforms). `touches:` reconciliation: the diff is exactly the six declared paths plus PLAN.md and this note. `/ft-refactor tools/update-adopters.mjs` (1,663 lines) is handed off as the next move per the operator's choice. `just check` → 0.

**Archived:** 2026-11-24
