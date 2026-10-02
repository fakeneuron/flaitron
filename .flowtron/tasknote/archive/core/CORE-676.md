---
title: platforms-grok-4.7
status: completed
tags: []
created: 2026-10-02
due:
related-tasks:
  - CBN-254
touches:
  - docs/PLATFORMS.md
---

# CORE-676 | platforms-grok-4.7

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CBN-254]]

## 🎯 Goal

Refresh the xAI row of the platform×model×effort calibration table so its current roster and effort ladder match `grok-4.7`.

## ✅ Acceptance

- [x] The xAI roster cell names Grok 4.7 as the default and `grok-4.7-build-fast` as the fast sibling — `grep -F 'Grok 4.7 (default; \`grok-4.7-build-fast\` fast sibling)' docs/PLATFORMS.md`
- [x] The same row's effort ladder states default `high` and that `xhigh` dates from 4.6 — `grep -F 'default \`high\`; \`xhigh\` since 4.6' docs/PLATFORMS.md`
- [x] The full-table as-of stamp stays 2026-08-27 and the xAI recheck is dated 2026-10-02 — `grep -F 'As of 2026-08-27' docs/PLATFORMS.md` and `grep -F 'xAI \`grok\` row rechecked 2026-10-02' docs/PLATFORMS.md`
- [x] Band and equivalence stay `medium` and `grok@xhigh` ≈ heavy-band — `grep -F '| xAI | \`grok\` |' docs/PLATFORMS.md` shows both
- [x] `SPEC/model.md`'s historical sentence that `xhigh` arrived with Grok 4.6 is unchanged — `grep -F 'the \`xhigh\` rung arrived with Grok 4.6' SPEC/model.md`
- [x] The Grok Build effort trigger states the same ladder (review note, fixed) — `grep -F '\`low\` / \`medium\` / \`high\` / \`xhigh\` (default \`high\`; \`xhigh\` since 4.6' docs/PLATFORMS.md`

## 🧩 Subtasks

- [x] Recheck `grok models` and the published reasoning-effort ladder
- [x] Update the xAI roster cell, effort-ladder cell, and the as-of recheck clause
- [x] Leave the historical Grok 4.6 session sentence and `SPEC/model.md` arrival sentence in place

## 🔗 Related

- [[CBN-254]] — caobunga pin refresh that first recorded `grok models` defaulting to `grok-4.7` (2026-09-24); related-decision, other repo

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `docs/PLATFORMS.md` still names Grok 4.6 as the top of the `grok` family, and a live `grok models` listing defaults to `grok-4.7`.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; when the grep returns more than a handful of notes (~3 is a fair line), prefer handing the reading to a **probe**; log relevant findings in Discovery Notes before re-interpreting the task; an absent or empty `archive/<area>/` is a prompt to re-check `<area>` against the README table before logging "no prior tasknotes" — a derived-and-wrong folder is indistinguishable from a genuinely empty one

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit (omit only on a task with no file deliverable)

**Discovery Notes:**

Area resolves to `archive/core/` from `.flowtron/tasknote/README.md` §"Archive layout" (`CORE-*`). `[light]` is satisfied by this medium-tier session (over-tier proceeds silently). The PLAN row carries `[unattended]`, so this attended run with no mode flag is autonomous mode. Tree was clean. No tasknote, archive hit, or sidequest stub. `## Completed` holds 41 checked rows, under the 60-row rotation advisory. The long description is under 70 words.

Live `grok models` (2026-10-02): default `grok-4.7`; also listed `grok-4.7-build-fast`, `grok-4.6`, `grok-4.5`. Same inventory CBN-254 recorded on 2026-09-24. Published reasoning docs (docs.x.ai, 2026-09-29) say `grok-4.7` and `grok-4.6` take `low` / `medium` / `high` (default) / `xhigh`, and models that lack `xhigh` (example `grok-4.5`) treat it as `high`. The Grok 4.7 product page describes the fast variant as the same model on faster infrastructure, exposed in Grok Build as `grok-4.7-build-fast`.

Archive: CORE-482.2 (2026-08-27) wrote the table with Grok 4.6 and `xhigh` new at 4.6. CORE-604.3 moved the table to `docs/PLATFORMS.md`; `SPEC/model.md` kept the arrival sentence. The first-use paragraph's "Grok 4.6 session (CORE-456.N)" is a dated observation, not the roster.

**Best practices:** N/A — one dated vendor-fact cell in an existing table, no code or module boundary.

**Drift:** the cited path and the Grok 4.6 roster claim still match. The plan does not contradict `SPEC/model.md`: that file's "xhigh arrived with Grok 4.6" sentence stays true and is not the current-roster cell. Assumption: do not edit `SPEC/model.md` or the historical session sentence. Assumption: do not restamp the whole table to 2026-10-02; only the xAI row was rechecked, so the 2026-08-27 full-table stamp stays and gains a recheck clause. Band stays `medium`; `grok@xhigh` ≈ heavy-band stays. No clarifications needed.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Extended the existing xAI row. Roster cell now names Grok 4.7 as the default and `grok-4.7-build-fast` as the fast sibling, replacing `grok-build` coding sibling. Effort cell keeps the same ladder and states default `high` explicitly, with `xhigh` since 4.6. The as-of line keeps 2026-08-27 for the full table and records the xAI recheck date. The Grok Build **Effort / thinking level** trigger in the same file still said `none` / `low` / `medium` / `high` with a varying default; that cell now matches the calibration ladder. No new section. No refactor. Tests N/A — the verify commands are greps over the prose fact; there is no behavioral code.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — recorded each Acceptance verify command in Testing Notes as `command → exit code`, with the first failure line when non-zero; and, for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] **External review** — a context that did not write the diff graded it against `## ✅ Acceptance`, and every finding is recorded below with its disposition (**blocker** → back to Phase 2; **note** → fixed or filed). `N/A` with a one-line reason when the diff is too small to grade

- [x] (frontend) Asked the user for visual confirmation (emphasized `👁️ **CONFIRM**` ask on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Targeted tests and lint/type-check: N/A — prose-only edit, no code. Structural half: N/A — one table cell and one trigger cell; no duplication, dead code, or public-surface growth. Frontend 👁️: N/A — not a UI change. Autonomous mode (from the row's `[unattended]` marker) would suppress the ask anyway.

Verification receipt (re-run after the trigger fix):

- `grep -F 'Grok 4.7 (default; \`grok-4.7-build-fast\` fast sibling)' docs/PLATFORMS.md` → 0
- `grep -F 'default \`high\`; \`xhigh\` since 4.6' docs/PLATFORMS.md` → 0
- `grep -F 'As of 2026-08-27' docs/PLATFORMS.md` → 0
- `grep -F 'xAI \`grok\` row rechecked 2026-10-02' docs/PLATFORMS.md` → 0
- `grep -F '| xAI | \`grok\` |' docs/PLATFORMS.md` → 0 (row shows `medium` and `grok@xhigh` ≈ heavy-band)
- `grep -F 'the \`xhigh\` rung arrived with Grok 4.6' SPEC/model.md` → 0
- `grep -F '\`low\` / \`medium\` / \`high\` / \`xhigh\` (default \`high\`; \`xhigh\` since 4.6' docs/PLATFORMS.md` → 0

External review (read-only subagent, calibration hunk only): blockers none. Note `docs/PLATFORMS.md:426` — the Grok Build effort trigger still listed `none` / `low` / `medium` / `high` and a varying default. Fixed in the same file; the trigger now states the calibration ladder. Not re-graded; the fix is the disposition.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed (standalone → top of `## Completed`; epic child → kept nested beneath its active parent — see SPEC/plan-filing.md §"`## Completed` archive convention" if unclear), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, the `touches:` scope reconciliation (`git diff --name-only` vs declared; name undeclared paths), and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

- [x] **Learnings** — did this task teach something the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

The xAI calibration row now names Grok 4.7, and the Grok Build effort trigger uses the same ladder. `docs/PLATFORMS.md` only (roster cell, effort cell, as-of recheck clause, effort-trigger syntax cell). Grep receipt all exit 0. No refactor. Doc-drift: `docs/PLATFORMS.md` updated; every other AI-referenced doc no change (`README.md`, `AGENTS.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md`). `SPEC/model.md` is outside the sweep and was left unchanged on purpose — its "`xhigh` arrived with Grok 4.6" sentence is still true. `touches:` is `docs/PLATFORMS.md`; the tasknote and PLAN row are the closure pair, not undeclared deliverables. A chooser reading the table no longer treats Grok 4.6 as the top of the family. Learnings: N/A. No deferred hand-off.

**Archived:** 2026-10-02
