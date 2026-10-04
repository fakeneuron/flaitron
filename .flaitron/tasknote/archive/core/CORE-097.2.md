---
title: /ft-stats skill — model/velocity/area stats from PLAN.md
status: completed
tags: []
created: 2026-05-18
due:
related-tasks: [CORE-EPIC-097, CORE-097.1]
---

# CORE-097.2 | /ft-stats skill — model/velocity/area stats from PLAN.md

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-097]] · [[CORE-097.1]]

## 🎯 Goal

Add a `/ft-stats` skill that aggregates `[model]` distribution, completion
velocity, and per-area volume from PLAN.md's `## Completed` section — the
structured dataset flowtron uniquely produces.

## ✅ Acceptance

- [ ] `claude/skills/ft-stats/SKILL.md` created with canonical YAML frontmatter (`name: ft-stats` + 1-line description) and step-by-step body mirroring the read-only info-skill shape of `ft-flowtron`
- [ ] `claude/commands/ft-stats.md` command stub created (delegates to the skill, per CORE-104 / ft-flowtron precedent)
- [ ] Skill outputs three sections: **Model distribution**, **Completion velocity**, **Per-area volume** — each with side-by-side **All** and **Last 30d** columns
- [ ] Subtasks (`<AREA>-<N>.<SUB>`) and parent epics (`<AREA>-EPIC-<N>`) both count as separate data points; child indent (2-space prefix in PLAN.md) does not change the data-point grain
- [ ] Legacy entries (no `[model]` tag) bucketed as `legacy` in model distribution and surfaced transparently (no silent drop)
- [ ] Optional `--write` flag: when present, flushes the same screen content to `_project/STATS.md` (overwrite) in addition to printing it; default (no arg) prints only
- [ ] Skill operates from both flowtron-self and adopter projects against `_project/PLAN.md` (identical relative path in both contexts; no Step 0 dual-path branch needed)
- [ ] `/ft-flowtron`'s "Bundled skills" table includes a `/ft-stats` row with the canonical one-liner
- [ ] Dogfood pass: ran `/ft-stats` (mentally / via the skill body) against `_project/PLAN.md` HEAD; verified the model-distribution numbers add up and area buckets match the data
- [ ] Phase 4 doc-drift sweep records updates to every AI-referenced doc that lists shipped skills (README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md), per `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Scaffold `claude/skills/ft-stats/SKILL.md` + `claude/commands/ft-stats.md` mirroring `ft-flowtron`'s read-only info-skill shape (frontmatter + step structure + final "stop after printing")
- [ ] In SKILL.md, codify the PLAN.md parsing rules: task-line grammar per SPEC §"Task-line format" + `## Completed` stub form per SPEC §"`## Completed` archive convention" + the area-prefix list per SPEC §"Task ID convention"
- [ ] Define the three computed sections (Model distribution / Completion velocity / Per-area volume), each with **All** + **Last 30d** columns; document how counts are computed and what the denominator is for each percentage
- [ ] Define `--write` flag behavior: same content flushed to `_project/STATS.md` (overwrite); default no-arg path prints only to conversation
- [ ] Document edge-case handling: legacy entries (no `[model]`) → `legacy` bucket; empty `## Completed` → friendly empty-state message; malformed lines → skip + 1-line warning footer
- [ ] Wire `/ft-stats` into `claude/skills/ft-flowtron/SKILL.md` "Bundled skills" table (alphabetically; one-line description); sweep other AI-referenced docs for shipped-skill listings and update
- [ ] Phase 3: markdown mental-pass on SKILL.md + command stub + any updated docs (frontmatter valid, fence langtags per CORE-079/CORE-086, no trailing whitespace, wikilinks well-formed)
- [ ] Phase 4: doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"; flip PLAN.md `CORE-097.2` to stub form; move tasknote to `_project/tasknote/archive/core/`

## 🔗 Related

- [[CORE-EPIC-097]] — parent epic (external-skill-survey)
- [[CORE-097.1]] — sibling Discovery (P1.a adoption shape recommended this skill)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed and approved as P1.a by the sibling Discovery `CORE-097.1` (`/ft-stats` ranked top among 5 recommended adoptions). Parent epic `CORE-EPIC-097` motivates the adoption; the PLAN.md description is concrete (three named metrics from a structured dataset flowtron uniquely produces). No scope ambiguity that warrants re-scope or de-scope; small skill (~80 LOC est.) with bounded surface area.

- [x] Read relevant source files
- [x] **Archive skim** — see Discovery Notes
- [x] **Drift check** — see Discovery Notes
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Source files reviewed

- `_project/tasknote/archive/core/CORE-097.1.md` — sibling Discovery; ranked `/ft-stats` as P1.a with claude-leverage's `/leverage-stats` as inspiration; documents the per-candidate findings table that locked this adoption shape
- `claude/skills/ft-flowtron/SKILL.md` + `claude/commands/ft-flowtron.md` — closest existing analogue (read-only info-skill, no writes, no follow-up prompts); shape to mirror
- `claude/skills/` directory — current 15-skill roster; confirms `/ft-stats` is greenfield (no existing skill with this name or stats-aggregation role)
- `SPEC.md` §"Task-line format" (lines 100-127) + §"`## Completed` archive convention" (lines 653-674) + §"Task ID convention" (lines 75-94) — canonical grammar the parser must honor
- `_project/PLAN.md` — actual `## Completed` data the skill will consume; line 40+ in flowtron-self, mix of `[opus]` / `[sonnet]` / legacy (no `[model]`) entries, both parent epics and `<AREA>-<N>.<SUB>` subtasks present
- `_project/tasknote/README.md` §"AI-referenced docs" — Phase 4 closure sweep target list

### Archive skim findings

Skimmed `_project/tasknote/archive/core/` (CORE-001 through CORE-097.1). Most relevant precedents:

- **CORE-097.1** (2026-05-18) — sibling Discovery that filed this task; locks the adoption shape, source inspiration (claude-leverage `/leverage-stats`), and cost estimate (~80 LOC). Load-bearing.
- **CORE-084** (2026-05-11) — `flowtron-info-skill` (now `ft-flowtron`); the canonical read-only info-skill precedent. Shape: YAML frontmatter + step-by-step body + "stop after printing" footer. Direct template for `/ft-stats`.
- **CORE-104** (2026-05-17) — skill namespace prefix; confirms `ft-` prefix is canonical for shipped skills + `claude/commands/<name>.md` stub is the wiring shape. Already followed by ft-flowtron.
- **CORE-079 / CORE-086** (2026-05-11 / 2026-05-14) — fence langtag hygiene; relevant for the markdown mental-pass in subtask #7.
- **CORE-040** (2026-05-05) — PLAN.md filing-discipline thresholds; not directly relevant since `/ft-stats` is read-only on PLAN.md (does not file new tasks), but a useful reference for the parser's handling of bullet word-counts (not in scope here).

No prior tasknote has consumed PLAN.md `## Completed` data programmatically — this is greenfield parser/analysis surface. No drift impact from prior tasknotes.

### Drift check

- `_project/PLAN.md` `## Completed` section — present at line 40; populated with the documented stub form ✓
- `[model]` tag present on the majority of completed entries; legacy entries without `[model]` confirmed present (e.g., `CORE-001` line 195, `CORE-006` line 200) → `legacy` bucket is a real and necessary case ✓
- Stub form `- [x] **TASK-ID** [model] | shortname — Completed YYYY-MM-DD.` — confirmed in SPEC.md §"`## Completed` archive convention" line 658 ✓
- 2-space child indent on epic subtasks in PLAN.md `## Completed` — confirmed (e.g., CORE-042.1-.9 indent under CORE-EPIC-042 line 141-150) ✓
- `claude/skills/` + `claude/commands/` wiring shape — confirmed via ft-flowtron pair ✓
- `_project/tasknote/README.md` §"AI-referenced docs" list — README.md / SPEC.md / docs/MIGRATION.md / claude/CLAUDE-snippet.md ✓
- claude-leverage `/leverage-stats` external reference — recorded as inspiration only; not verified against the upstream repo (deferred — CORE-097.1 already surveyed it at moderate depth)

### Resolved scoping (from AskUserQuestion)

| Question | Answer |
|---|---|
| Output shape | **Both** — in-conversation screen by default + optional `--write` flag flushing to `_project/STATS.md` |
| Time-window arg | **Always show All + Last 30d** side-by-side; no arg surface for windowing |
| Subtask counting | **Count subtasks separately**; parent epic lines also count as one data point each (each closed unit-of-work is one data point) |

### Implicit assumptions (no further clarification needed)

- **PLAN.md location is identical** in flowtron-self and adopter contexts (`_project/PLAN.md` in both), so the skill needs no dual-path branch (unlike `/ft-task`'s Step 0).
- **Legacy entries without `[model]`** are reported as a `legacy` bucket in model distribution (not silently dropped). They still count toward per-area volume and completion velocity.
- **Velocity** is computed from `Completed YYYY-MM-DD.` markers in the stub-form line (canonical per SPEC §"`## Completed` archive convention"); legacy paragraph-form entries that carry the same `Completed YYYY-MM-DD.` token also parse.
- **Last 30d** window uses today's date relative to the host machine's clock; documented in the skill body so the reader knows the cutoff is wall-clock today, not a session-start date.
- **`--write` output path** is `_project/STATS.md` (overwrite-each-run). Not tracked as a Phase 4 artifact; users may `.gitignore` or commit at their discretion (skill body notes this).
- **No CLI / executable surface**: per SPEC §"What flowtron does NOT provide", the skill is markdown-only — the LLM does the parsing inline at invocation time, like every other flowtron skill.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `ft-flowtron` (CORE-084 / CORE-090) is the canonical read-only info-skill precedent: YAML frontmatter (`name:` + 1-line `description:`) + step-numbered body + "stop after printing" footer. `/ft-stats` mirrors this shape exactly. Per CORE-104, `ft-` prefix is canonical for bundled skills; `claude/commands/<name>.md` stub is the wiring shape (delegates to the skill).
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior — N/A (markdown skill body, no executable surface; dogfood pass against `_project/PLAN.md` is the verification).

**Implementation Notes:**

### Files created

| File | Role |
|---|---|
| `claude/skills/ft-stats/SKILL.md` | Skill body — Step 0 inputs/args → Step 1 PLAN.md parse → Step 2 compute 3 sections → Step 3 render screen → Step 4 optional `--write` → Step 5 stop |
| `claude/commands/ft-stats.md` | Command stub (delegates to the skill; CORE-104 wiring pattern) |

### Files edited

| File | Edit |
|---|---|
| `claude/skills/ft-flowtron/SKILL.md` | Added `/ft-stats` row to "Bundled skills" table (between `/ft-audit-performance` and `/ft-new-project`) |
| `SPEC.md` | Added `/ft-stats` to the bundled-skills slug list in §"Skill namespace" (line 62) |
| `docs/MIGRATION.md` | Added `/ft-stats` global-install symlink block in §1.0 (adopter-facing, between `/ft-flowtron` and `/ft-release` blocks) |

### Key design decisions

- **PLAN.md path is identical** in flowtron-self and adopter contexts (`_project/PLAN.md`); no Step 0 dual-path branch needed (unlike `/ft-task` and `/ft-flowtron`).
- **No `--write` Step 4 if absent** — keeps the no-arg path purely read-only, matching the ft-flowtron precedent.
- **`legacy` bucket is always considered**, but the model-distribution row is omitted entirely if `legacy` count is zero in both windows (clean for new adopters whose entries all carry `[model]`).
- **Per-area rows omit zero-zero areas** — keeps the table tight for projects using only 1-2 area prefixes.
- **Today's-date source documented** — prefer `# currentDate` reminder, fall back to `date +%Y-%m-%d`. Single source for both screen header and Last 30d cutoff.
- **Global install pattern** — `/ft-stats` is wired in `docs/MIGRATION.md` §1.0 alongside `/ft-flowtron`, not in `claude/CLAUDE-snippet.md` §"One-time symlink wiring". Same precedent as `/ft-flowtron`: read-only info skills are globally installable, workflow-lifecycle skills go in CLAUDE-snippet.

### Dogfood pass (against flowtron's own `_project/PLAN.md`)

Walked the `## Completed` section (lines 42-200, skipping blank line 151) and validated the parse against expected outputs:

- **158 entries parsed** (109 lines L42-150 + 49 lines L152-200) ✓
- **5 parent epic lines** (CORE-EPIC-009 / 042 / 057 / 098, FE-EPIC-033) — counted as separate data points per the locked grain ✓
- **18 subtask lines** (CORE-042.1-.9, CORE-057.1-.8, CORE-097.1) — counted separately ✓
- **2 areas** (CORE, FE) → per-area table renders 2 rows ✓
- **3 model buckets** present (opus / sonnet / legacy); legacy comes from pre-`[model]` entries (CORE-001..CORE-022 + FE-001 / FE-004 / FE-005, 22 entries) ✓
- **All entries fall within Last 30d** because flowtron is only 20 days old (first commit 2026-04-28) → All-time and Last 30d columns currently coincide. Not a bug — a data quirk that resolves as the project ages.
- **Velocity sanity check**: 158 tasks / 20 days ≈ 7.9 tasks/day ≈ 55 tasks/week — consistent with the rapid early-build cadence visible in commit history.
- **Edge cases exercised**: blank line 151 → silently skipped ✓; legacy paragraph-form entries with `Completed YYYY-MM-DD.` token (e.g., line 200 `CORE-006`) → parse cleanly into `legacy` bucket ✓; no malformed lines requiring footer warning ✓.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown skill body + 3 doc edits; no executable surface).
- [x] Ran lint/type-check on changed code — markdown mental-pass: SKILL.md frontmatter valid YAML; fence langtags `text` / `sh` per CORE-079 / CORE-086; tables well-formed; no trailing whitespace; bundled-skills table row alignment preserved; SPEC.md slug list line-wrap preserved; MIGRATION.md symlink block alignment matches the surrounding `/ft-flowtron` and `/ft-release` blocks.
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

No executable code paths touched. The dogfood pass against flowtron's own `_project/PLAN.md` (recorded in Phase 2 Implementation Notes) is the substantive verification — algorithm correctness validated on 158 real entries spanning all three model buckets (opus/sonnet/legacy), two area prefixes (CORE/FE), 5 parent epics, 18 subtasks, one blank-line edge case, and pre-`[model]` legacy paragraph-form entries.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — see Final Summary
- [x] Closed — PLAN.md `CORE-097.2` line flipped to stub form (kept in-place under CORE-EPIC-097 per epic-lifecycle convention — parent epic stays open until audit closes the cohort); tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces inline on conditional skip per SPEC §"Post-closure protocol" §"Conditional skip rule")

**Final Summary:**

### Doc-drift sweep (AI-referenced docs)

| Doc | Verdict |
|---|---|
| `README.md` | no change — only references `/ft-task`, `/ft-release`, `/ft-new-project` as illustrative examples ("skills like …"), not as an exhaustive roster |
| `SPEC.md` | **Updated** — added `/ft-stats` to the bundled-skills slug list in §"Skill namespace" (line 62) |
| `docs/MIGRATION.md` | **Updated** — added adopter-facing `/ft-stats` global-install symlink block in §1.0 (between `/ft-flowtron` and `/ft-release` blocks) |
| `claude/CLAUDE-snippet.md` | no change — adopter snippet lists per-project workflow-lifecycle skills only; `/ft-stats` (like `/ft-flowtron`) is globally installed and discoverable via `/ft-flowtron`'s bundled-skills table |

### Recap

Added `/ft-stats` — a read-only stats screen that aggregates `[model]` distribution, completion velocity, and per-area volume from `_project/PLAN.md` `## Completed` data, with an optional `--write` flag that also flushes the same content to `_project/STATS.md`. First adoption of an external pattern from `CORE-097.1`'s Discovery survey (P1.a; inspired by claude-leverage's `/leverage-stats`); leverages flowtron's unique structured `[model]`-tag dataset.

Files: `claude/skills/ft-stats/SKILL.md` (new, ~110 LOC mirroring `ft-flowtron`'s read-only info-skill shape) + `claude/commands/ft-stats.md` (new, 5-line command stub per CORE-104). Wiring: row added to `/ft-flowtron`'s bundled-skills table; slug added to `SPEC.md` §"Skill namespace"; adopter-facing global-install symlink block added to `docs/MIGRATION.md` §1.0. Dogfood pass against flowtron's own PLAN.md (158 entries) validated the parser on opus/sonnet/legacy buckets, parent epics, subtasks, blank-line skip, and legacy paragraph-form entries.

**Archived:** 2026-05-18
