---
title: audit
status: completed
tags: []
created: 2026-05-09
due:
related-tasks: [CORE-EPIC-057, CORE-057.1, CORE-057.2, CORE-057.3, CORE-057.4, CORE-057.5]
---

# CORE-057.6 | audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-057]]

## 🎯 Goal

Verify the 4 newly-shipped skills (/release, /epic-discovery, /close-epic, /file-followup) sit coherently with the existing 4 shipped skills (/task, /starter-task, /micro-task, /new-project) on naming consistency, snippet style parity, and MIGRATION.md currency.

## ✅ Acceptance

- [x] **Naming consistency** — all 8 SKILL.md `name:` frontmatter fields match their directory names; all 8 commands exist at `claude/commands/<name>.md`; slash-command verbal references in SPEC.md / SPEC/epic.md / MIGRATION.md / CLAUDE-snippet.md / tasknote/README.md use consistent `/<name>` form. ✓
- [x] **Snippet style parity** — cite-don't-restate pattern (per CORE-038/050/051) applied where SPEC owns the contract; no inline restatements of SPEC §s in the 4 new SKILLs. ✓ (SPEC § citation density: release 18, epic-discovery 22, close-epic 18, file-followup 10 — on par with trimmed existing SKILLs.)
- [x] **MIGRATION.md currency** — adopter-skill section lists all 6 adopter-facing skills with accurate per-skill descriptions; symlink count + names match `/new-project` Step 3 wiring at HEAD; `/release` correctly excluded as flowtron-self-only. ✓ after §1.6 / §1.7 / §3.8 fixes (this audit).
- [x] **CLAUDE-snippet.md currency** — workflow block + symlink section + verify command list the correct adopter-skill set (6 commands, 12 symlinks). ✓
- [x] **SPEC currency** — SPEC.md §"When to use" + §"PLAN.md filing-discipline thresholds" cite `/file-followup`; SPEC/epic.md "**Skills.**" paragraph cites both `/epic-discovery` and `/close-epic`; tasknote/README.md AI-referenced docs list still accurate. ✓ at the section-level; SPEC/epic.md inline-step drift filed as CORE-057.7.
- [x] **Fixed doc-drift sweep** (per SPEC/epic.md §"Audit acceptance") — `README.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: 3 updates landed (§1.6 git add block / §1.7 verify / §3.8 smoke check) · `claude/CLAUDE-snippet.md`: no change.
- [x] **Audit follow-ups filed** — CORE-057.7 (SPEC/epic.md inline-step drift) + CORE-057.8 (command-stub cross-ref polish) filed as `.7+` children under CORE-EPIC-057 in PLAN.md `## Medium`, both `[opus]`. Per SPEC/epic.md §"Audit follow-ups" "few small follow-ups" path — no second-wave audit subtask filed.

## 🧩 Subtasks

- [x] Walk `claude/skills/` + `claude/commands/` — verified all 8 skill dirs have SKILL.md + matching command stub; captured `name:` from each SKILL frontmatter (all match dir names).
- [x] Audited naming consistency across SPEC.md, SPEC/epic.md, MIGRATION.md, CLAUDE-snippet.md, tasknote/README.md — clean.
- [x] Audited snippet style parity — SPEC § citation density on par with cite-don't-restate-trimmed existing SKILLs. No inline SPEC restatement found.
- [x] Audited MIGRATION.md currency — found 3 drifts (§1.6, §1.7, §3.8) where the 3 cohort-added commands were missing from skill lists.
- [x] Audited CLAUDE-snippet.md currency — clean (lists all 6 adopter-facing commands; 12 symlinks).
- [x] Audited SPEC currency — SPEC.md clean; SPEC/epic.md "Skills." paragraph clean; inline lifecycle steps 2 + 4 drift filed as CORE-057.7.
- [x] Ran fixed doc-drift sweep — see Acceptance row.
- [x] Filed non-doc misses as CORE-057.7 + CORE-057.8 directly in PLAN.md (functional equivalent of `/file-followup`, performed inline since I'm in `/task` not `/file-followup`).
- [ ] Phase 4 closure: flip CORE-057.6 PLAN.md line to stub; archive tasknote; conversationally prompt user about CORE-EPIC-057 parent state (now blocked on .7 + .8 — parent stays `## Medium` until those close).

## 🔗 Related

- [[CORE-EPIC-057]] — parent epic
- [[CORE-057.1]] — Discovery (scopes the cohort)
- [[CORE-057.2]] — /release skill shipped
- [[CORE-057.3]] — /epic-discovery skill shipped
- [[CORE-057.4]] — /close-epic skill shipped
- [[CORE-057.5]] — /file-followup skill shipped

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-057.1-.5 all closed today (2026-05-09); 4 new skills present at HEAD (`claude/skills/{release,epic-discovery,close-epic,file-followup}/`). This is the canonical closing audit subtask per SPEC/epic.md, and the doc-drift sweep is itself part of the standard Phase 4 closure — fits naturally.

- [x] Read relevant source files (cohort SKILLs + AI-referenced docs to be read in Phase 2; tasknote/README.md + SPEC/epic.md read here)
- [x] **Archive skim** — pulled Final Summaries from CORE-057.1/.2/.3/.4/.5 (cohort), CORE-054 (candidate walk), CORE-051/050 (cite-don't-restate baseline). Findings logged below.
- [x] **Drift check** — no specific file paths or line numbers cited in PLAN.md description; the 4 new skill dirs all exist (verified via `ls`); the 4 existing skill dirs all exist (task, micro-task, starter-task, new-project). No drift to flag at scoping time.
- [x] Asked clarifying questions — driver skill (continue via `/task`) and audit depth (coherence skim) both confirmed via AskUserQuestion.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Cohort context (from archive Final Summaries):**

- **CORE-057.1 (Discovery):** Locked 4 design decisions — `/epic-discovery` files-epic-and-scaffolds-`.1` in one motion; `/close-epic` runs audit `.N` with fixed doc-drift acceptance + parent-flip prompt; `/file-followup` writes one PLAN.md line + conversational paragraph (no tasknote artifact); `/release` flowtron-self only via global symlink. CORE-057.6 (this) line confirmed as-is.
- **CORE-057.2 (`/release`):** 2 new files (SKILL + command stub) + 2 global symlinks. Strict no-args, auto-propose bump kind, auto-draft tag message. `## Notes` surfaces lessons.
- **CORE-057.3 (`/epic-discovery`):** ~205 lines, mirrors `/release` shape but adopter-facing. 2 new files + 4 edited surfaces (new-project SKILL Step 3/7/8; MIGRATION §1.2; CLAUDE-snippet workflow + symlink + verify; SPEC/epic.md). Ask 5 questions in Step 2 (area + shortname + priority + model + N). Drives full 4 phases inline. SPEC/epic.md gained "**Skill.**" paragraph (singular).
- **CORE-057.4 (`/close-epic`):** ~210 lines, bracket twin of `/epic-discovery`. Same 2-file + 4-surface diff shape. Validates ID is highest `.N` child; warn-and-proceed on open siblings. SPEC/epic.md "Skill." paragraph extended to "**Skills.**" (plural) citing both bracket twins. Defers note-only follow-up handling to `/file-followup`. Records final state: 8 SKILLs / 8 commands / 12 symlinks per adopter.
- **CORE-057.5 (`/file-followup`):** Lightest filing-only skill. 2 new files + 4 edited surfaces (SPEC.md §"When to use" + §"PLAN.md filing-discipline thresholds"; new-project SKILL Step 3/7/8; MIGRATION §1.2; CLAUDE-snippet). >70w filings declined and routed to `/starter-task`.
- **CORE-054 (candidate walk):** Approved the 4-skill cohort. Drift surfaced at promotion: starter's `/release` framing referenced `docs/MIGRATION.md §3` but the bump procedure actually lives in the "Pinning and bumping" section — captured in Discovery Notes for CORE-057.2 to use. (Useful precedent for what "MIGRATION.md currency" means at audit time: section names matter, not just content.)
- **CORE-051/050 (cite-don't-restate baseline):** Trim pattern for existing skills (starter-task -175w / -13%; micro-task -355w / -18.6% + new lazy fragment). Sets the snippet style parity bar — new skills should follow cite-don't-restate where SPEC owns the contract.

**Coherence axes locked from the PLAN.md description:**

1. Naming consistency (across the 8 skills + 4 docs).
2. Snippet style parity (cite-don't-restate from CORE-038/050/051).
3. MIGRATION.md currency (per the CORE-054 precedent — section names + per-skill descriptions + symlink count must all match HEAD).
4. **Plus the SPEC/epic.md-mandated fixed doc-drift sweep** (canonical for every audit subtask).

**Driver-skill choice (user-confirmed):** Continue via `/task` (file already scaffolded). Forgo the dogfood — `/close-epic` will validate on the next epic. At Phase 4 closure I'll prompt the user manually to flip the CORE-EPIC-057 parent line + move cohort to `## Completed` (the auto-prompt that `/close-epic` would have provided).

**Sweep depth (user-confirmed):** Coherence skim per SPEC/epic.md §"Audit follow-ups" — fix doc-drift findings inline (canonical for the doc-drift sweep), file non-doc misses as `.7+` via `/file-followup`. No deep line-by-line per-SKILL audit unless a specific drift surfaces.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — audit shape mirrors prior closing-audit subtasks (CORE-042.9 epic-finalizer; CORE-049 token-axis audit) — sweep, log, file follow-ups, fix doc-drift inline. Same shape extended; no new shape needed.
- [x] Implemented the minimal solution — 3 inline doc edits in `docs/MIGRATION.md` + 2 new follow-up lines in `_project/PLAN.md`.
- [x] No tests added — audit produces docs + PLAN.md edits only; no code changed.

**Implementation Notes:**

**Files touched:**
- `docs/MIGRATION.md` — 3 edits:
  - §1.6 git add block: added 3 missing command stubs (`file-followup.md` / `epic-discovery.md` / `close-epic.md`) and 3 missing skill dirs (matching paths) so adopter migrations stage all 12 symlinks, not just 6.
  - §1.7 Verify: expanded the "alongside `/starter-task` and `/micro-task`" parenthetical to cover all 5 sibling commands.
  - §3.8 Post-migration smoke: same expansion in the smoke-check item.
- `_project/PLAN.md` — 2 new lines under CORE-EPIC-057 in `## Medium`: CORE-057.7 + CORE-057.8 (both `[opus]`, both audit follow-ups per SPEC/epic.md §"Audit follow-ups").

**Files reviewed but not edited:**
- `README.md` — no change (line 87 cites `/task`, `/new-project` illustratively; comprehensive index lives elsewhere by design).
- `SPEC.md` — no change (cohort already correctly cited in §"When to use" and §"PLAN.md filing-discipline thresholds").
- `claude/CLAUDE-snippet.md` — no change (workflow block + symlinks + verify all current).
- `claude/skills/{release,epic-discovery,close-epic,file-followup}/SKILL.md` — no change (cite-don't-restate compliance verified via SPEC § citation density).
- `claude/commands/*.md` — no edits (cross-ref asymmetry filed as CORE-057.8, not fixed inline).

**Audit consequence on parent epic:** CORE-EPIC-057 now has 8 children (.1-.8) instead of 6. Parent line stays in `## Medium` until .7 + .8 close. The `/close-epic`-style auto-prompt to flip the parent at this audit's closure does NOT fire — the audit surfaced new children. This is the canonical SPEC/epic.md §"Audit follow-ups" "few small follow-ups" path.

## 🧪 Phase 3: Testing & Linting

- [x] No targeted test suite — audit produces docs + PLAN.md edits, no code touched. Verified MIGRATION.md edits via grep (all 3 fixes landed at lines 116-118, 127, 302) and PLAN.md additions via re-read (.7 + .8 nested correctly under CORE-EPIC-057, both under 70w cap: 41w + 35w).
- [x] No lint/type-check needed — markdown edits only.
- [x] No frontend changes.

**Testing Notes:** Verification grep confirmed: MIGRATION.md §1.6 git add now stages all 6 command stubs + 6 skill dirs; §1.7 + §3.8 list all 5 sibling commands. PLAN.md `.7`/`.8` filings sit under CORE-EPIC-057 in `## Medium` with correct grammar and word counts well under the 70w cap.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: no change · `SPEC.md`: no change · `docs/MIGRATION.md`: 3 inline updates landed (§1.6 git add block / §1.7 verify / §3.8 smoke) · `claude/CLAUDE-snippet.md`: no change.
- [x] Closed — PLAN.md CORE-057.6 line flipped to stub form per SPEC §"`## Completed` archive convention"; tasknote moved to `_project/tasknote/archive/core/`.
- [ ] Recapped changes with the user and got confirmation

**Final Summary:**

Closing audit subtask of CORE-EPIC-057 — verified the 4 newly-shipped skills (/release, /epic-discovery, /close-epic, /file-followup) sit coherently with the existing 4 (/task, /starter-task, /micro-task, /new-project) on naming consistency, snippet style parity, and MIGRATION.md currency. **3 doc-drift fixes landed inline; 2 audit follow-ups filed.**

**Doc-drift fixes (docs/MIGRATION.md):** §1.6 git add block staged only 3 of 6 command stubs and 3 of 6 skill dirs — adopters following this would have committed only half the symlinks. §1.7 Verify and §3.8 Post-migration smoke both still cited the v1.0 set ("alongside `/starter-task` and `/micro-task`"), missing the 3 cohort additions. All three sites now list the full 5-sibling set.

**Audit follow-ups filed as `.<N+1>` children per SPEC/epic.md §"Audit follow-ups"** (CORE-057.7, CORE-057.8 — both `[opus]`, both `## Medium`):

- **CORE-057.7** — SPEC/epic.md lifecycle steps 2 + 4 cite only `/task <ID>.1` / `/task <ID>.<final>`, while the bottom "**Skills.**" paragraph names `/epic-discovery` + `/close-epic` as canonical. Inline-step drift; first-time SPEC reader misses the cohort. (40w)
- **CORE-057.8** — Command stub cross-references in `task.md`, `micro-task.md`, `starter-task.md`, `release.md` are sparser than the cohort-shipped stubs (`close-epic.md` / `epic-discovery.md` / `file-followup.md`). Polish item; equalize "For X, use /Y" sibling lists. (35w)

**Naming consistency (verified clean):** All 8 SKILL.md `name:` frontmatter fields ↔ dir names ↔ command stub names align. CLAUDE-snippet.md workflow block (line 17) lists 6 adopter-facing skills correctly; symlink section (lines 31-42) wires 12 symlinks; verify line (47) cites the right 5 siblings.

**Snippet style parity (verified clean):** SPEC § citation density in the new SKILLs (release: 18, epic-discovery: 22, close-epic: 18, file-followup: 10) is on par with or higher than the cite-don't-restate-trimmed existing SKILLs (task: 17, starter-task: 14, micro-task: 19). New SKILLs follow the CORE-038/050/051 baseline.

**Parent-epic state:** CORE-EPIC-057 now has 8 children (.1-.8) instead of 6. The "few small follow-ups" path of SPEC/epic.md §"Audit follow-ups" applies — close this audit (.6), execute .7 + .8 as normal children, no second-wave audit needed. Parent line stays in `## Medium` until both close.

**Touched files:**

- `docs/MIGRATION.md` (3 edits)
- `_project/PLAN.md` (CORE-057.6 line flipped to stub + moved to `## Completed`; CORE-057.7 + CORE-057.8 lines added under CORE-EPIC-057)
- `_project/tasknote/CORE-057.6.md` → `_project/tasknote/archive/core/CORE-057.6.md` (this file)

**Archived:** 2026-05-09
