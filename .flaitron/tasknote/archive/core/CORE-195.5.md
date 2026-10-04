---
title: ft-debug-skill audit
status: completed
tags: []
created: 2026-05-29
due:
related-tasks: [CORE-EPIC-195, CORE-195.1, CORE-195.2, CORE-195.3, CORE-195.4]
---

# CORE-195.5 | ft-debug-skill audit

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-195]]

## 🎯 Goal

Verify the completed `CORE-EPIC-195` (`ft-debug-skill`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables (`claude/skills/ft-debug/SKILL.md` + `claude/commands/ft-debug.md` + 5 adopter-wiring surfaces + 2 SPEC.md hunks), and follow-up filings for any miss.

## ✅ Acceptance

- [ ] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [ ] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [ ] No regressions surfaced in earlier-shipped cohort children's surfaces
- [ ] Audit findings recorded in Implementation Notes; misses cited as candidates for `/ft-file-followup <NEW-ID>` filing (filed AFTER audit closure to preserve `/ft-file-followup`'s filing-discipline gate)
- [ ] Single `feat: CORE-195.5 — audit CORE-EPIC-195` (or `chore: ...` if no code edits land) commit lands
- [ ] PLAN.md line for `CORE-195.5` flipped to stub form `Completed YYYY-MM-DD.`
- [ ] Tasknote moved to `_project/tasknote/archive/core/CORE-195.5.md`
- [ ] Parent-flip prompt surfaced after audit closure (skill Step 8) — user confirms or declines flipping `CORE-EPIC-195` to `Completed` and moving the cohort to `## Completed`

## 🧩 Subtasks

- [ ] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [ ] Walk `_project/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [ ] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables (skill body + command stub + AGENTS-snippet + ft-new-project + MIGRATION + ft-flowtron roster + PLATFORMS + SPEC.md)
- [ ] Surface audit findings in Implementation Notes; cite each miss as a `/ft-file-followup <NEW-ID>` candidate
- [ ] Phase 4: flip `CORE-195.5` PLAN line to stub form + archive tasknote
- [ ] Parent-flip: skill Step 8 prompts user; on confirm, atomic flip parent line + move cohort to `## Completed`

## 🔗 Related

- [[CORE-EPIC-195]] — parent epic
- [[CORE-195.1]] — discovery (scoped + filed cohort)
- [[CORE-195.2]] — skill-and-command authoring
- [[CORE-195.3]] — adopter wiring (5 surfaces)
- [[CORE-195.4]] — SPEC integration

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — `CORE-195.5` is the highest `.N` child of `CORE-EPIC-195`; siblings `.1-.4` all `[x]`; parent epic line + cohort live under `## Medium`. Skill Step 2 pre-flight passed: highest-`.N` check ✓, no open siblings ✓.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-close-epic CORE-195.5`; Step 2 pre-flight passed (highest `.N`, all siblings closed); cohort is ready for the cumulative doc-drift sweep + coherence pass + parent-flip prompt. No early-audit decision (all four implementation children landed clean).

- [x] Read relevant source files — all four cohort archives (`_project/tasknote/archive/core/CORE-195.{1,2,3,4}.md`); `_project/tasknote/README.md` §"AI-referenced docs"; cohort deliverables at HEAD (`claude/skills/ft-debug/SKILL.md`, `claude/commands/ft-debug.md`, `claude/AGENTS-snippet.md`, `claude/skills/ft-new-project/SKILL.md`, `docs/MIGRATION.md`, `claude/skills/ft-flowtron/SKILL.md`, `docs/PLATFORMS.md`, `SPEC.md` §"Skill namespace" + §"When to use a tasknote (and when not to)").

- [x] **Archive skim** — self-referential for an epic audit; the cohort children are themselves archive entries (read in the previous bullet). No older tasknotes touch `claude/skills/ft-debug/` paths (green-field surface confirmed in CORE-195.2's archive skim). `CORE-186` (ft-audit-context wiring) is the established precedent both authoring and wiring chained against; no need to re-pull.

- [x] **Drift check** — verified every cohort claim against HEAD:
  - `claude/skills/ft-debug/SKILL.md` exists, 145 lines (matches .2 Final Summary).
  - `claude/commands/ft-debug.md` exists, 16 lines (slightly shorter than .2's "~30 lines" estimate but file is real and well-formed; no concern).
  - On-disk skill+command counts both = 19 each (matches .3 claim of 18→19 bumps).
  - `claude/AGENTS-snippet.md`: paste-block bullet at line 18; symlinks at lines 38 + 45. ✓
  - `claude/skills/ft-new-project/SKILL.md`: Step 3 heading line 58; Step 7 git add lines 97-98; Step 8 readlink lines 121 + 128. ✓
  - `docs/MIGRATION.md`: §1.2 lines 59 + 61 ("seven" + enumeration); §1.6 lines 125 + 128 (git add); §1.7 line 137 (smoke menu); §3.8 line 288 (smoke confirmation). ✓
  - `claude/skills/ft-flowtron/SKILL.md`: roster row at line 50. ✓
  - `docs/PLATFORMS.md`: line 31 enumeration ("Seven"); lines 169 + 174 ("19"). ✓
  - `SPEC.md`: §"Skill namespace" line 86; §"When to use a tasknote" paired block lines 591-603; trailing-paragraph line 597. ✓

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.** Cohort is fully landed; audit scope is verification + cumulative sweep. No scope ambiguity surfaced.

- [x] Subtasks above populated with concrete, ordered steps — pre-filled by Step 3 scaffold; reviewed and consistent with the work actually executed below.

**Discovery Notes:**

**Cohort children inventory:**

| Child | Model | Deliverable | Surfaces touched |
|---|---|---|---|
| `.1` discovery | opus | 3 clarifications resolved (archetype=tasknote skill, strictness=soft, SPEC slot=§"When to use"); filed `.2-.4` long descriptions; reaffirmed `.5` audit | PLAN.md only (cohort filing) |
| `.2` skill-and-command | grok | `claude/skills/ft-debug/SKILL.md` (145 lines) + `claude/commands/ft-debug.md` (16 lines) | 2 new files |
| `.3` adopter-wiring | opus | 5 files, 13 hunks: AGENTS-snippet (paste+symlinks), ft-new-project (Step 3/7/8), MIGRATION (§§1.2/1.6/1.7/3.8), ft-flowtron roster, PLATFORMS (line 31 + 169/174) | 5 files |
| `.4` spec-integration | opus | 2 hunks in `SPEC.md`: §"Skill namespace" enumeration + §"When to use a tasknote" paired block + trailing-paragraph | 1 file |

**Cohort coherence pass — findings:**

- **Naming**: `ft-debug` slug and `/ft-debug` invocation form consistent across all 8+ surfaces. ✓
- **Tone**: Soft pragmatic register preserved (no "Iron Law" framing leaked in). ✓
- **Cluster ordering**: New skill appended to the tasknote-runner cluster (`ft-task → ft-starter-task → ft-micro-task → ft-file-followup → ft-epic-discovery → ft-close-epic → ft-debug`) consistently across AGENTS-snippet symlinks, ft-new-project Step 3/7/8, SPEC.md namespace, MIGRATION.md §1.2, PLATFORMS.md line 31. ✓
- **Counts**: 19/19 skill+command count, "seven" tasknote-skills wording, "Seven" PLATFORMS enumeration — all match on-disk reality. ✓
- **Cross-references**: SKILL.md line 144 ("see SPEC §..., ft-flowtron roster, MIGRATION §1.2") — all three exist as named. ✓
- **Drift finding #1 (worth surfacing) — cadence-summary phrasing inconsistency**:
  - **Canonical** SKILL.md Step 4 drives a 4-prompt cadence: Expected vs Observed → Hypotheses (rank) → Minimal repro design → Run repro + update beliefs. Plus a Phase 3 re-verify obligation.
  - `SPEC.md` line 597 trailing-paragraph: `expected/observed → ranked hypotheses → minimal repro → re-verify` (4-step, faithful) ✓
  - `claude/AGENTS-snippet.md` line 18: `expected/observed → ranked hypotheses → minimal repro → bisect → fix → re-verify` (6-step — over-promises a "bisect" step the canonical drive doesn't enumerate; conflates the Phase 2 "fix" action with a cadence step alongside the Phase 3 "re-verify" obligation)
  - `claude/skills/ft-flowtron/SKILL.md` line 50 roster row: same 6-step over-promise
  - **Fix**: trim both to match SPEC.md line 597's 4-step canonical form. Applied inline in Phase 2 (per skill Step 5's "small + in-scope fix → apply inline" branch).
- **Drift finding #2 (note only — no fix)**: PLAN.md `CORE-EPIC-195` long description carries the old `bisect → verify` cadence. Will dissolve at parent-flip (long description → stub form). No action needed; would be filing-time artifact if parent-flip declined.

**Exit gate judgment** (skill is `default-fire-on-clarifications` flavor; no clarifications fired): emit inline marker, proceed to Phase 2.

**✅ Phase 1 Discovery complete; entering Phase 2 Execution.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `SPEC.md` line 597 trailing-paragraph is the established canonical short-form cadence summary (`expected/observed → ranked hypotheses → minimal repro → re-verify`). AGENTS-snippet + ft-flowtron roster appended a longer over-promising form (`→ bisect → fix → re-verify`) that doesn't appear in the canonical SKILL.md Step 4 drive. Pattern to extend: standardize the surface summaries on SPEC.md's 4-step form.

- [x] Implemented the minimal solution — two single-line edits:
  - `claude/AGENTS-snippet.md` line 18: trimmed cadence summary from `… minimal repro → bisect → fix → re-verify` to `… minimal repro → re-verify`.
  - `claude/skills/ft-flowtron/SKILL.md` line 50: same trim on the roster row.

- [x] Updated/added tests for non-trivial behavior — N/A (markdown phrasing tweaks; no executable surface, no parser/grammar impact, no viz surface).

**Implementation Notes:**

**Audit findings (recorded for the record):**

- ✅ Naming, tone, cluster ordering, counts, cross-references — all coherent across the cohort's deliverables.
- ✅ All cited paths/line numbers in cohort archives verified at HEAD (skills 19/19, commands 19/19, "seven" wording propagated, SPEC.md line 86 + 591-603 intact, MIGRATION.md §§1.2/1.6/1.7/3.8 + PLATFORMS.md line 31/169/174 + ft-flowtron line 50 + AGENTS-snippet line 18+38+45 + ft-new-project Step 3/7/8 all wired).
- 🔧 **Cadence-summary phrasing drift (fixed inline)**: AGENTS-snippet line 18 + ft-flowtron line 50 advertised a 6-step cadence (`→ bisect → fix → re-verify`) that over-promises relative to the canonical SKILL.md Step 4's 4-prompt drive. Standardized both to SPEC.md line 597's 4-step canonical form. 2 files, 2 lines changed, +0 net lines.
- 📝 **Cohort-only follow-ups identified**: none worth a `/ft-file-followup` filing. The cadence drift was the only real surface, and it was small + clearly in scope per skill Step 5, so applied inline rather than deferred.

**Cohort closure totals (informational):**

- `.2`: 2 new files (skill SKILL.md + command stub), +161 lines
- `.3`: 5 files, 13 hunks, ~12 net new lines
- `.4`: 1 file (SPEC.md), 2 hunks, +17 net new lines
- `.5` (this audit): 2 files, 2 line edits (no net line change)
- Total cohort: 2 new files + 7 edited files; `/ft-debug` is now live across SKILL + command + 5 adopter-wiring surfaces + 2 SPEC.md hunks, with no remaining coherence misses.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown phrasing edits; no executable surface in `claude/skills/*/SKILL.md` or `claude/AGENTS-snippet.md`).

- [x] Ran lint/type-check on changed code — structural mental-pass on the two edits: `grep -n "ft-debug" claude/AGENTS-snippet.md claude/skills/ft-flowtron/SKILL.md` returned the expected hits with `→ re-verify` as the cadence terminator (no orphaned `→ bisect →` segments left over). Markdown table cell in ft-flowtron line 50 still well-formed (pipe alignment preserved). No frontmatter or fence syntax issues introduced.

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (markdown documentation surface; no viz/UI/browser impact).

**Testing Notes:**

The two cadence-summary edits are sub-line phrasing trims (removed `→ bisect → fix` segment from two single-line cadence enumerations). No PLAN.md grammar change, no viz parser surface touched, no skill SKILL.md re-loaded by other skills in a way that would require cache invalidation. Phase 4 doc-drift sweep is the last gate.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — walked `_project/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change.
  - `SPEC.md` — no change (line 597's 4-step canonical form was already faithful; this audit's cadence fix targeted the over-promising surfaces, not SPEC).
  - `docs/MIGRATION.md` — no change (cohort wiring landed in [[CORE-195.3]]).
  - `claude/AGENTS-snippet.md` — **updated (this audit)**: line 18 cadence summary trimmed from `… minimal repro → bisect → fix → re-verify` to `… minimal repro → re-verify` (4-step canonical form matching SPEC.md line 597).
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change.
  - `docs/PLATFORMS.md` — no change.
  - (Also touched, outside AI-referenced docs set per README §"AI-referenced docs" lazy-module note): `claude/skills/ft-flowtron/SKILL.md` line 50 — same cadence-summary trim on the bundled-skill roster row.

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-29.` and tasknote moved to `_project/tasknote/archive/core/CORE-195.5.md` (held until Step 9 bundle).

- [x] Recap drafted (held for Step 9's 📦 bundle alongside the parent-flip prompt + commit message).

**Final Summary:**

Closed `CORE-EPIC-195` (`ft-debug-skill`) with its audit child `.5`. Cohort verified coherent at HEAD: naming, tone, cluster ordering, counts, cross-references all consistent across the cohort's 7 edited surfaces + 2 new files. One coherence finding surfaced — a cadence-summary phrasing drift where `claude/AGENTS-snippet.md` line 18 and `claude/skills/ft-flowtron/SKILL.md` line 50 advertised a 6-step cadence (`expected/observed → ranked hypotheses → minimal repro → bisect → fix → re-verify`) that over-promised relative to the canonical `claude/skills/ft-debug/SKILL.md` Step 4's 4-prompt drive. Trimmed both inline to `expected/observed → ranked hypotheses → minimal repro → re-verify` (matching `SPEC.md` line 597's already-canonical form). 2 files, 2 line edits. No follow-ups worth `/ft-file-followup` filing.

**Archived:** 2026-05-29
