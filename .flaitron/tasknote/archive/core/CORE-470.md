---
title: ft-stats-plan-archive
status: completed
tags: []
created: 2026-08-24
due:
related-tasks:
  - CORE-467
  - FE-094
touches:
  - claude/skills/ft-stats/SKILL.md
  - claude/skills/ft-flowtron/SKILL.md
---

# CORE-470 | ft-stats-plan-archive

[← PLAN.md](../../PLAN.md) · ✅ Completed · 🔗 [[CORE-467]] [[FE-094]]

## 🎯 Goal

Extend `/ft-stats` Step 1 so it aggregates from both `.flowtron/PLAN.md` and `.flowtron/PLAN-ARCHIVE.md` (missing archive = empty), keeping all-time velocity and model distribution whole after rotation — and adopt the SPEC date-resolution fallback so inline-audit-fix rows dated via `Surfaced by … YYYY-MM-DD` count instead of being skip-warned.

## ✅ Acceptance

- [x] `/ft-stats` Step 1 reads `.flowtron/PLAN.md` `## Completed` **and** `.flowtron/PLAN-ARCHIVE.md` (all `## Completed <YYYY-MM>` blocks); a missing archive file is treated as empty, never an error
- [x] Date resolution matches `SPEC/tasknote-selection.md` §"`## Completed` rotation": prefer `Completed <YYYY-MM-DD>.`, else `Surfaced by <label> <YYYY-MM-DD>`; only rows with neither are skip-warned
- [x] Screen Source line names both files (or PLAN alone when archive is absent) and the parsed entry count reflects the merge
- [x] `ft-flowtron` roster one-liner (and any skill `description:`) no longer claim PLAN.md-only aggregation
- [x] Codex wrapper remains a thin pointer (no duplicated parse rules)

## 🧩 Subtasks

- [x] Update `claude/skills/ft-stats/SKILL.md` Step 0–3 for dual-file parse + date-resolution fallback + Source line
- [x] Update `claude/skills/ft-flowtron/SKILL.md` `/ft-stats` roster one-liner
- [x] Spot-check against this repo's real PLAN + ARCHIVE (≈829 checked rows; 25 Surfaced-by-only should parse, not skip)
- [x] Doc-drift sweep at closure

## 🔗 Related

- [[CORE-467]] — predecessor; introduced PLAN-ARCHIVE rotation and filed this consumer gap (incl. Surfaced-by date hole)
- [[FE-094]] — sibling; visualizer already reads both files; out of scope here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** After CORE-467's rotation, `/ft-stats` only sees ~209 of ~829 closed rows; the SPEC Consumers paragraph already requires both-files reads, and FE-094 landed the viz half. The Surfaced-by skip gap (25 rows) is the same date-resolution rule the rotation contract already locked.

- [x] Read relevant source files — when the read set is broad or its shape is unknown, consider isolating the search in a **probe** (`templates/subagent-probe-template.md`) and recording only its distilled return in Discovery Notes

- [x] **Best Practices Review** — for code or module-boundary work, identified touched responsibilities, dependency direction, existing abstractions, nearby duplication, and any required in-scope refactor or deferred cleanup (otherwise `N/A` with reason)

- [x] **Archive skim** — skim `.flowtron/tasknote/archive/<area>/` for prior tasknotes that touched the source paths in scope (prefer YAML `touches:` when set); also follow Related / `supersedes` / ⚠️ pointers; log relevant findings in Discovery Notes before re-interpreting the task

- [x] **Drift check** — file paths, line numbers, function names, and root-cause hypotheses cited in the task description still match current code, **and** the plan this tasknote is forming neither contradicts a SPEC contract nor diverges from its `PLAN.md` line (read both, don't recall them); flag any drift before re-interpreting the task

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Read set.** `claude/skills/ft-stats/SKILL.md` (whole), `codex/skills/ft-stats/SKILL.md` (thin wrapper), `SPEC/tasknote-selection.md` §"`## Completed` rotation" (Date resolution + Consumers), `.flowtron/PLAN-ARCHIVE.md` header + month headings, archived CORE-467 + FE-094, `docs/MIGRATION.md` `/ft-stats` row, `claude/skills/ft-flowtron/SKILL.md` roster line. No probe — narrow markdown skill surface.

**Counts (this repo, 2026-08-24).** PLAN.md: 209 checked / 200 with `Completed` token / 9 Surfaced-by-only. PLAN-ARCHIVE.md: 620 checked / 604 with `Completed` / 16 Surfaced-by-only. Neither-date rows: 0. Today `/ft-stats` would parse ~200 and skip-warn 9; after this task it should parse ~829 across both files with 0 skips.

**Archive skim.** Load-bearing:
- **CORE-467** — rotation contract; Consumers explicitly name `/ft-stats`; mid-execution found the 25 Surfaced-by rows and folded the stats gap into CORE-470; FE-094 + CORE-470 filed as dual consumers.
- **FE-094** — viz half already shipped; assumptions note CORE-470 owns the `/ft-stats` half; month headings are `## Completed YYYY-MM`; absence = empty.
- **CORE-263 / CORE-359.3 / CORE-457.2** — prior ft-stats work (buckets, STATS.md write, gitignore policy); no conflict with dual-file read.
No ⚠️ superseded pointers on the hits.

**Drift check.** PLAN line still matches: skill Step 1 is PLAN.md-only; Step 1 item 4 still skip-warns missing `Completed` token. SPEC Consumers paragraph already mandates both-files concatenation + absence-as-empty — skill is the lagging consumer. `docs/MIGRATION.md` already advertises PLAN-ARCHIVE for `/ft-stats`; `ft-flowtron` roster and skill `description:` still say PLAN.md-only. No SPEC contradiction; execution aligns skill with the already-shipped contract.

**Best Practices Review.** Markdown-only skill (no executable surface). Single source of parse rules in `claude/skills/ft-stats/SKILL.md`; Codex wrapper stays a pointer. Date resolution must mirror the SPEC rotation rule (prefer `Completed`, else `Surfaced by`) rather than inventing a stats-only variant. Nearby doc mirrors: `ft-flowtron` roster one-liner + skill frontmatter `description:` — update in-scope. Deferred: regenerating committed `.flowtron/STATS.md` (gitignored / regeneratable artifact; operator runs `--write` if wanted).

**Design decisions.**
1. **One Step-1 recipe over both files**, not a separate archive parser — same stub grammar, same counting grain; only the heading walk differs (`## Completed` in PLAN; every `## Completed <YYYY-MM>` in ARCHIVE).
2. **Adopt SPEC date resolution** (not "reconsider and leave") — PLAN's "worth reconsidering" + CORE-467's folded gap = treat Surfaced-by as a first-class date source; still skip-warn only when neither token resolves.
3. **Prefer `Completed` when both present** (e.g. FE-077) — matches rotation's Date resolution order.
4. **Source line** names both files when archive contributed rows (or existed-and-was-empty); PLAN-only wording when archive file is absent.

**No clarifications needed.** Explicit assumptions: (1) missing `PLAN-ARCHIVE.md` = empty set, never an error; (2) rows are not duplicated across files (rotation moves them); (3) Surfaced-by fallback is in scope this task; (4) Codex wrapper needs no body change; (5) no code/tests — skill is assistant-parsed markdown.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an established pattern or justified a new shape; checked DRY and single-responsibility (SRP) boundaries; preferred composition when it reduced coupling

- [x] **Minimal refactor gate** — refactored only for Acceptance or to prevent duplication, obscured responsibility, or a dependency-boundary violation in the touched path; recorded the reason and deferred unrelated cleanup

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — **N/A**: markdown-only skill; verification is the real-file spot-check in Testing Notes

**Implementation Notes:**

**Pattern survey.** Extended the existing Step-1 stub parse rather than inventing a second recipe. Date resolution copies the SPEC rotation contract's order verbatim. Codex wrapper left as the thin pointer FE-094's sibling pattern expects.

**Minimal refactor gate.** No refactor — only additive Step 0/1/3 wording + frontmatter/`ft-flowtron` mirrors. Deferred: regenerating `.flowtron/STATS.md` via `--write` (operator-owned regeneratable artifact).

**Implemented.**
- `claude/skills/ft-stats/SKILL.md` — Step 0 adds optional PLAN-ARCHIVE path (absence = empty); Step 1 walks PLAN's bare `## Completed` plus every archive `## Completed <YYYY-MM>` block, concatenates, and applies Completed-then-Surfaced-by date resolution; Step 3 Source line optionally names the archive; `description:` updated.
- `claude/skills/ft-flowtron/SKILL.md` — `/ft-stats` roster one-liner no longer PLAN.md-only.
- `codex/skills/ft-stats/SKILL.md` — untouched (thin pointer).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — **N/A**: no executable code; spot-checked the new recipe against real files (below)

- [x] Ran lint/type-check on changed code — **N/A**: markdown skill text only

- [x] **Quality assertions** — for changed code, confirmed no avoidable duplication, dead code, unexplained complexity, unnecessary public-surface growth, or stale code-facing documentation (otherwise `N/A` with reason)

- [x] (frontend) Asked the user for visual confirmation — **N/A**: no frontend

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

**Spot-check (2026-08-24, this repo).** Applied the new Step-1 rules to `.flowtron/PLAN.md` + `.flowtron/PLAN-ARCHIVE.md`:
- PLAN: 209 parsed / 0 skipped / 9 Surfaced-by fallback
- ARCHIVE: 620 parsed / 0 skipped / 16 Surfaced-by fallback
- **Total: 829 parsed, 0 skipped, 25 Surfaced-by dates** — matches Discovery counts; previous recipe would have truncated to ~200 and skip-warned 9.

**Quality assertions.** No duplicated parse rules in Codex. No public executable surface growth. `docs/MIGRATION.md` already named PLAN-ARCHIVE for `/ft-stats` (CORE-467) — no stale cold-start doc left claiming PLAN-only.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated (`N/A` / not-met with a one-line reason), YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` and placed per SPEC/tasknote-selection.md §"`## Completed` archive convention" (standalone → top of `## Completed`; epic child → kept nested beneath its active parent), then tasknote moved to `.flowtron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files/LOC where meaningful, verification commands/results, refactors made or deferred with rationale, documentation verdict, and concrete maintainability effect (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Taught `/ft-stats` to read `.flowtron/PLAN-ARCHIVE.md` alongside `PLAN.md` and to date inline-audit-fix rows via `Surfaced by … YYYY-MM-DD`, so all-time velocity/model distribution stay whole after CORE-467's rotation instead of truncating to the live `## Completed` window.

| Path | Change |
|---|---|
| `claude/skills/ft-stats/SKILL.md` | Dual-file Step 1 + date resolution + Source line + `description:` (~+42/−17) |
| `claude/skills/ft-flowtron/SKILL.md` | Roster one-liner mirror |
| `.flowtron/PLAN.md` + archive tasknote | Closure stub |

**Verification.** Real-file spot-check → 829 parsed / 0 skipped / 25 Surfaced-by. No executable suite.

**Doc-drift.** AI-referenced set: all **no change** (`docs/MIGRATION.md` already correct from CORE-467). On-demand skill bodies updated as deliverables.

**Maintainability.** `/ft-stats` and viz (FE-094) now share the same both-files consumer contract; date resolution is one SPEC rule, not a stats-only exception.

**Archived:** 2026-08-24
