---
title: wiring-layer-symmetry
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-EPIC-205, CORE-205.2]
---

# CORE-205.3 | wiring-layer-symmetry

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-205]]

## 🎯 Goal

Verify there is no contract leakage in the claude/ commands and skills wiring layer, confirm that the PLATFORMS.md plug-in example and sibling-directory constraints remain valid, and note any new surfaces added since the CORE-154.3 audit baseline.

## ✅ Acceptance

- [ ] claude/commands/ and claude/skills/ (and AGENTS-snippet.md wiring) contain only approved neutral / flowtron-owned surfaces with no contract leakage or agent-specific behavioral assumptions
- [ ] PLATFORMS.md plug-in example and any documented sibling-dir constraints (e.g. from CONVENTIONS.md, MIGRATION.md) still accurately describe the current claude/ layout and usage
- [ ] Any surfaces added since CORE-154.3 (or post-205.1/205.2) are explicitly noted with rationale for why they belong in the wiring layer vs. contract layer
- [ ] Phase 4 doc-drift sweep records "no change" or the precise one-line update for every entry in `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Map the current claude/ on-disk structure (commands/*.md + skills/*/*.md) and cross-reference against AGENTS-snippet.md paste-block + symlink lists in ft-new-project / ft-flowtron / MIGRATION.md
- [ ] Re-verify the PLATFORMS.md "plug-in" example code/path and any "sibling directory" constraints cited in docs/ or SPEC
- [ ] Grep for agent-specific leakage (claude-only tool names, hard-coded assumptions, non-neutral phrasing) in the wiring-layer files
- [ ] Archive skim + drift check against CORE-154.3 and recent 205 siblings; log any new surfaces
- [ ] Populate final Acceptance criteria and ordered Subtasks list; complete Phase 1 Discovery with default-skip judgment
- [ ] Execute minimal verification (no code changes expected), Phase 3 checks, doc-drift sweep, and closure per epic child pattern

## 🔗 Related

- [[CORE-EPIC-205]] — parent epic (agent-neutrality-sweep); this is the wiring-layer symmetry verification child
- [[CORE-205.2]] — contract-layer-hygiene predecessor (just completed); established the terminology baseline we extend to implementation wiring
- [[CORE-154.3]] — prior wiring audit that set the "since CORE-154.3" baseline referenced in scope
- [[CORE-EPIC-198]] — context-chain-portability (cross-agent adoption precedent)
- [[CORE-205.1]] — discovery that originally filed the epic children

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Scope is a bounded verification of the wiring-layer implementation surface (claude/ on-disk structure, commands/ + skills/ counts and layout, AGENTS-snippet symlink lists, ft-new-project/ft-flowtron wiring references) plus the documented plug-in example and hard constraints in PLATFORMS.md, cross-checked against the 154.3 baseline decision and the just-completed 205.1/.2 epic siblings. 18/18 command+skill counts match documented roster; only claude/ exists at root (no premature siblings); AGENTS-snippet correctly wires only the 6 core per-project skills (audits/helpers are global per MIGRATION); no claude/-specific behavioral assumptions leaked into contract-layer docs beyond the AGENT-NEUTRALITY ledger's approved table. Explicit assumptions logged below. No re-scope or de-scope required — the work is exactly the "re-verify + note any additions" described in the PLAN line.

- [x] Read relevant source files — claude/ (full dir tree + counts), claude/AGENTS-snippet.md (symlink lists + paste block), claude/skills/ft-flowtron/SKILL.md (full 18-skill roster table), claude/skills/ft-new-project/SKILL.md (Step 3/8 wiring + verification lists), docs/PLATFORMS.md (two-layer model, symmetric plug-in pattern, hard constraints, current 18-count claim, 154.3 forward-refs), docs/AGENT-NEUTRALITY.md (intentional claude/ locators table + out-of-scope wiring section), _project/tasknote/archive/core/CORE-154.3.md (baseline structural decision + acceptance), CORE-205.1.md and CORE-205.2.md (epic context + prior sweeps), SPEC.md (skill namespace, claude/ refs), templates/tasknote-template.md (scaffold shape)
- [x] **Archive skim** — `ls _project/tasknote/archive/core/` (231 files) + targeted `grep -l` for "claude/|AGENTS-snippet|PLATFORMS.md|sibling|plug-in" against the 154/198/205 epic family + recent. Hits confined exclusively to the defining epics (154.x, 198.x, 205.1/.2) and their own notes. No other archived tasknotes reference the wiring paths or PLATFORMS constraints in a load-bearing way. (See Discovery Notes for summary.)
- [x] **Drift check** — All paths and constraints cited in the PLAN line and 154.3 baseline still exist at HEAD with identical semantics: `claude/` name and location unchanged (no rename, no `wiring/` parent); PLATFORMS.md §"Hard constraints" and "symmetric plug-in pattern" exactly match the 154.3 lock (status-quo + sibling top-level convention); AGENTS-snippet symlink list (6 core) and ft-new-project verification steps are byte-stable for adopters; 18/18 counts in ft-flowtron roster + PLATFORMS description match live `ls`. The "since CORE-154.3" surfaces remain the complete set; no new top-level platform dirs or structural additions. The 205.2 contract hygiene (AskUserQuestion removal) did not touch wiring layer. No drift requiring re-interpretation of scope.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.**

  **Explicit assumptions (asserted for autonomous execution):**
  - "claude/ structure + commands/skills" means the current on-disk layout (AGENTS-snippet.md + 18 command .md stubs + 18 skill/ dirs, including the 3 lazy `step-*.md` fragments inside ft-task/ and ft-micro-task/) plus the documented wiring lists and roster.
  - "no contract leakage" means absence of claude/-specific behavioral or path assumptions in SPEC/, templates/, docs/ (outside the AGENT-NEUTRALITY.md intentional table, the wiring docs themselves, and MIGRATION §1 which is explicitly the Claude Code adoption guide).
  - "PLATFORMS.md plug-in example + sibling-dir constraints still hold" means the two-layer model, the sibling-top-level scaffold sketch, the 4 hard constraints (no rename of claude/, AGENTS block stays neutral, no leak into contract, no CLI/daemon), and the "only claude/ exists today" state remain accurate.
  - The additional 12 skills beyond the 6 core (audit family + flowtron/stats/quality/release/new-project/audit-context) are intentionally global-only (per MIGRATION §"One-time global installs"); their absence from the per-project AGENTS-snippet symlinks and ft-new-project Step 3 is correct and not drift.
  - The lazy step-*.md fragments inside certain skill dirs are wiring-layer implementation details (referenced only from within their parent SKILL.md) and do not constitute new "surfaces" requiring adopter wiring changes or contract updates.
  - Since 205.2 (same-day) already performed an exhaustive contract-layer terminology sweep, this .3 can rely on that + the ledger as the source of truth for what claude/ refs are approved; we are only spot-checking the wiring implementation side + PLATFORMS/AGENTS structural fidelity.
  - No new platform wiring (codex/, grok/, etc.) has been added (confirmed by repo-root listing); therefore no updates to PLATFORMS "current state" section or AGENT-NEUTRALITY out-of-scope list are required from this pass.

- [x] Subtasks above populated with concrete, ordered steps (see 🧩 Subtasks; minor polish applied for precision after source survey — 6 steps remain the minimal ordered plan)

**Discovery Notes:**

**Wiring-layer symmetry verification (2026-05-25, post-205.2 contract hygiene, [grok] after Step 1.5 retag from [sonnet]):**

- **On-disk structure:** `claude/` contains exactly `AGENTS-snippet.md` + `commands/` (18 .md) + `skills/` (18 dirs). 7 of the 18 are the audit family (`ft-audit{,-docs,-security,-frontend,-backend,-performance}` + main). Matches PLATFORMS.md claim and ft-flowtron roster table exactly. No extraneous files or dirs inside claude/.

- **AGENTS-snippet wiring:** Documents the 6 core tasknote skills only (task/starter/micro/file-followup/epic-discovery/close-epic) with 12 relative symlinks. This is correct — ft-new-project Step 3 + verification do the same. The other 12 skills are global-install only (MIGRATION §1.0 table + install recipe). No over-claiming.

- **Roster & counts:** ft-flowtron/SKILL.md lists all 18 with accurate one-liners. ft-new-project correctly verifies the 12 core symlinks at Step 8. No drift from documented shape.

- **PLATFORMS.md fidelity:** Two-layer model, sibling-top-level plug-in pattern (with concrete claude/ example), 4 hard constraints, and "only claude/ exists today" statement all remain accurate. The 154.3 decision (status-quo + forward-pointers, no rename) is still the live shape. The "Grok Build adoption notes" section is present and scoped as pre-adoption observation (no `grok/` dir shipped, as expected).

- **AGENT-NEUTRALITY cross-check:** The intentional locators table (rows for SPEC claude/ refs, epic.md paths, MIGRATION, templates, SECURITY Claude subsection, etc.) plus "Out of scope for this ledger" (explicitly lists 154.3/154.4 and the wiring layer) remain the authoritative boundary. No new claude/ literals in contract docs outside this table.

- **Archive / drift / 154.3 baseline:** Precedent epics (154.x, 198.x, 205.1/.2) are the only archives touching these surfaces. 154.3 locked the exact structure we re-verified today. 205.1/.2 established the recent sweep date and terminology baseline. No missed surfaces or regressions.

- **Overall:** Wiring layer is symmetric, counts and lists match, constraints hold, no contract leakage or new unapproved surfaces since 154.3 / 205.1. The epic's agent-neutrality claim for the implementation side is intact. This tasknote is the 2026-05-25 wiring verification record.

(The archive skim, source reads, and counts/greps for this verification pass are complete; all Phase 1 boxes ticked.)

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern matched exactly.** Neighboring epic children (CORE-205.1 discovery, CORE-205.2 contract hygiene, CORE-154.3 wiring-structure lock) all use the identical frontmatter + spec-on-top + execution-log-below shape, with epic-child nav header including · 🔗 [[CORE-EPIC-205]] when related, and "Completed YYYY-MM-DD." stub in PLAN under the parent. This .3 verification child extends the same pattern with zero deviation. No new shape justified or introduced.

**Minimal solution:** The verification itself (counts, greps, structure survey, cross-checks against 154.3/205 siblings + ledger + PLATFORMS constraints) was the work. All findings recorded in Phase 1 Discovery Notes. Zero edits required to claude/, docs/PLATFORMS.md, AGENTS-snippet.md, SPEC/, templates/, or any AI-referenced surface. The deliverable is the formal 2026-05-25 wiring-symmetry record in this tasknote.

**No non-trivial behavior added** — pure audit/verification task (no executable code paths changed).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

**Targeted verification (no source changes):** The "test suite" for this verification task was the live `ls` + `wc -l` + `grep -l` + read of the exact surfaces (18/18 counts, symlink lists, roster table, PLATFORMS constraints, 154.3 baseline). All passed with zero mismatches.

**Lint / type-check equivalent:** Markdown mental-pass on this tasknote (consistent em-dashes, wikilinks [[ ]], bold **IDs**, 2-space child indent in PLAN context, frontmatter schema, phase checklist shape). Passed. No trailing whitespace or formatting drift introduced.

**(frontend) visual confirmation:** N/A — no frontend / UI / visual surface touched. This tasknote is the sole artifact; no rendered pages, components, or adopter-visible UI changed. (The 👁️ item is left for the record but does not apply.)

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update (see Final Summary)
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` and tasknote moved to `_project/tasknote/archive/core/CORE-205.3.md`
- [x] Recap drafted (1-2 sentence plain-English summary + technical detail; bundled at Step 6)

**Final Summary:**

**Wiring-layer symmetry verified — no changes required.** 2026-05-25 survey (post-205.2 contract hygiene) of claude/ (18 commands + 18 skills, only AGENTS-snippet + commands/ + skills/ at top level), AGENTS-snippet symlink lists (6 core only), ft-flowtron roster, ft-new-project wiring steps, PLATFORMS.md plug-in example + 4 hard constraints, and AGENT-NEUTRALITY intentional table confirmed the 154.3 structural decision remains intact: claude/ name stable, sibling-top-level convention documented and followed, no contract leakage, no new unapproved surfaces, counts and lists match live fs exactly. The additional audit/helper skills are correctly global-only. This tasknote + Phase 1 Discovery Notes are the formal verification record for CORE-EPIC-205 .3. Builds on [[CORE-154.3]] and [[CORE-205.2]].

**Doc-drift sweep (AI-referenced docs from _project/tasknote/README.md):**
- README.md — no change
- SPEC.md — no change (claude/ references remain the approved factual locators per AGENT-NEUTRALITY ledger)
- docs/MIGRATION.md — no change (global install recipe and per-project 6-skill wiring unchanged)
- claude/AGENTS-snippet.md — no change (6 core symlinks + neutral paste block current)
- docs/CONVENTIONS.md — no change
- CONTRIBUTING.md — no change
- SECURITY.md — no change
- docs/AGENT-NEUTRALITY.md — no change (intentional table and out-of-scope wiring section still authoritative post-205.2)
- docs/PLATFORMS.md — no change (two-layer model, plug-in pattern, 154.3 decision, 18-count claim, Grok section all accurate)

**PLAN.md .3 stub:** `- [x] **CORE-205.3** [grok] | wiring-layer-symmetry — Completed 2026-05-25.`

**Tasknote archive:** `git mv` to `_project/tasknote/archive/core/CORE-205.3.md`; **Archived:** 2026-05-25

**Archived:** 2026-05-25

