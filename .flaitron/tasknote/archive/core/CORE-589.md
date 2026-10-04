---
title: agents-snippet-plan-archive-mention
status: completed
tags: [docs, adopter-snippet]
created: 2026-09-13
due:
related-tasks: []
touches:
  - claude/AGENTS-snippet.md
---

# CORE-589 | agents-snippet-plan-archive-mention

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add a short `## Completed` rotation clause to the canonical `claude/AGENTS-snippet.md` "Plans live in `.flowtron/PLAN.md`." bullet so every adopter picks up the `.flowtron/PLAN-ARCHIVE.md` convention on the next version bump instead of re-patching the gap per repo.

## ✅ Acceptance

- [x] The paste-block's `Plans live in` bullet names `.flowtron/PLAN-ARCHIVE.md` and points at the rotation contract — `grep -q 'PLAN-ARCHIVE.md' claude/AGENTS-snippet.md && grep -q 'Completed\` rotation' claude/AGENTS-snippet.md`
- [x] The clause uses adopter-relative paths (`.flowtron/core/SPEC/...`), not self-host paths — `grep -c '\`SPEC/tasknote-selection.md' claude/AGENTS-snippet.md` returns 0
- [x] Mirror check: self-host `CLAUDE.md` still carries its own rotation bullet and neither surface contradicts the other — `grep -q 'PLAN-ARCHIVE.md' CLAUDE.md` + `judgment` (prose differs by design per the KEEP IN SYNC comment)
- [x] Clause is short (one sentence appended to the existing bullet) — `judgment`: the paste-block is always-loaded at adopters; CORE-510 keeps detail out of the fence

## 🧩 Subtasks

- [x] Append a one-sentence rotation clause to the `Plans live in` bullet in `claude/AGENTS-snippet.md:16`, pointing at `.flowtron/core/SPEC/tasknote-selection.md` §"`## Completed` rotation"
- [x] Re-read `CLAUDE.md` §Workflow's rotation bullet and its KEEP IN SYNC comment; confirm no edit needed
- [x] Run the Acceptance grep receipts

## 🔗 Related

- [[CORE-467]] — `related-decision:` introduced `## Completed` rotation + `PLAN-ARCHIVE.md`; explicitly left `claude/AGENTS-snippet.md` untouched ("wiring only"), which is the gap this task closes
- [[CORE-510]] — `related-decision:` paste-block names skills and points at SPEC rather than restating detail; this clause follows the same shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Verified live: `claude/AGENTS-snippet.md:16` reads only `Plans live in \`.flowtron/PLAN.md\`.` with no `PLAN-ARCHIVE.md` mention anywhere in the paste-block, while self-host `CLAUDE.md` §Workflow already carries a dedicated rotation bullet. The gap is exactly as filed; a one-sentence clause closes it.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

- **Source read.** `claude/AGENTS-snippet.md` (paste-block lines 12–33; KEEP IN SYNC comment at line 9 names the path-convention bullet as mirrored with self-host `CLAUDE.md` in "slightly different prose"), `CLAUDE.md` §Workflow (already has `Rotated \`## Completed\` rows live in \`.flowtron/PLAN-ARCHIVE.md\` …`), `SPEC/tasknote-selection.md` §"`## Completed` rotation" (bound 100 rows, whole-month blocks, verbatim + append-only), `docs/MIGRATION.md:287` (already tells adopters the file appears later), `docs/CONTEXT-BUDGET.md` (snippet is in the informational Ledger at 15,015 chars, **not** in the CI-enforced Budgets table — a small growth is safe; the Ledger is re-measured by `/ft-release` §7.1, so its figure is left alone here).
- **Best Practices Review.** N/A for code — docs-only. Surface check: `codex/`, `cursor/`, `grok/AGENTS-snippet.md` carry no paste-block with a `Plans live in` bullet (grep empty), so `claude/AGENTS-snippet.md` is the single canonical adopter surface for this clause. No duplication introduced.
- **Archive skim.** `grep -l AGENTS-snippet archive/core/*.md` → 439 hits (too broad); narrowed to the intersection with `PLAN-ARCHIVE` → 12 notes. Load-bearing: [[CORE-467]] (plan-completed-rotation) introduced the rotation and its doc-drift table recorded `claude/ … grok/AGENTS-snippet.md` as "No change — wiring only" — i.e. the adopter paste-block was consciously skipped at origin, which is the gap. [[CORE-470]] (ft-stats-plan-archive) and [[CORE-471]] (release v5.19.0) shipped it; neither touched the paste-block. [[CORE-510]] set the paste-block rule "name the skill, point at SPEC, keep detail out of the fence" — the new clause follows it.
- **Drift check.** Task cites `claude/AGENTS-snippet.md` bullet "Plans live in `.flowtron/PLAN.md`." — matches line 16 verbatim. Cited SPEC section exists. No contradiction with SPEC (rotation is optional/operator-run; the clause describes, it does not mandate). Adopter-side claims (natabula NAT-251/252, marscharts CORE-220.N) are not verified here — out of repo — and are not load-bearing for the edit.
- **No clarifications needed.** Assumptions: (1) extend the existing bullet with one sentence rather than adding a sibling bullet, since the task says "add a short rotation clause to the canonical bullet"; (2) adopter-relative path `.flowtron/core/SPEC/tasknote-selection.md`; (3) self-host `CLAUDE.md` needs no edit — it already carries the clause; the KEEP IN SYNC comments on both sides remain accurate as written; (4) `docs/CONTEXT-BUDGET.md` Ledger figure not refreshed — that is the release cut's job.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

- Pattern survey: extended the existing `Plans live in` bullet in place (the task's own wording), following the [[CORE-510]] paste-block shape — one sentence of claim + a `§` pointer into `.flowtron/core/SPEC/`, no restated detail (bound, month granularity, never-split rules all stay in SPEC).
- Minimal refactor gate: no refactor; one line changed in `claude/AGENTS-snippet.md:16`.
- Tests: N/A — prose edit, no test surface. Verification is the Acceptance grep set.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Targeted tests / lint: N/A — markdown-only change, no code touched; no markdown linter in this repo.
- Verification receipt:
  - `grep -q 'PLAN-ARCHIVE.md' claude/AGENTS-snippet.md && grep -q 'Completed\` rotation' claude/AGENTS-snippet.md` → 0
  - `grep -c '\`SPEC/tasknote-selection.md' claude/AGENTS-snippet.md` → prints `0` (exit 1 = no self-host-relative path in the snippet), as required
  - `grep -q 'PLAN-ARCHIVE.md' CLAUDE.md` → 0; judgment: self-host bullet says "Rotated rows live in …", adopter clause says "rows rotate verbatim into …" — same layout, both point at the same SPEC section, no contradiction
  - Clause length: one sentence appended; snippet 15,015 → 15,260 chars (+245). Not in the CI-enforced Budgets table (Ledger row only).
- Structural quality: no duplication (codex/cursor/grok snippets carry no paste-block path bullets), no stale doc pointers (SPEC section name verified live).
- 👁️ CONFIRM: N/A — no frontend change.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

- **Doc-drift sweep** (`.flowtron/tasknote/README.md` §"AI-referenced docs"): `claude/AGENTS-snippet.md` — **updated** (the deliverable). `AGENTS.md`/`CLAUDE.md` — no change (already carries its own rotation bullet; KEEP IN SYNC comment remains accurate). `docs/MIGRATION.md` — no change (§1.4 already describes when `PLAN-ARCHIVE.md` appears). `README.md`, `SPEC.md`, `codex/` · `cursor/` · `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md` — no change.
- **Changed:** `claude/AGENTS-snippet.md` (1 line, +245 chars) — the paste-block's `Plans live in` bullet now names `.flowtron/PLAN-ARCHIVE.md` (verbatim, append-only, absent until first rotation) and points at `.flowtron/core/SPEC/tasknote-selection.md` §"`## Completed` rotation".
- **Verification:** three grep receipts above, all as expected; two judgment criteria recorded.
- **Refactors:** none. **Docs verdict:** deliverable is itself the doc update; nothing else drifted.
- **`touches:` reconciliation:** declared `claude/AGENTS-snippet.md`; `git diff --name-only` → `claude/AGENTS-snippet.md` (+ workflow files PLAN.md / this tasknote). No undeclared deliverable paths. `CLAUDE.md` was dropped from the declaration during Discovery once it was confirmed already correct.
- **Maintainability effect:** adopters pick the rotation convention up on their next `/ft-update` re-paste instead of re-patching per repo (marscharts CORE-220.N) and losing it on the next fleet re-paste (natabula NAT-252).

**Archived:** 2026-09-13
