---
title: release v7.3.0
status: completed
tags: []
created: 2026-10-18
due:
related-tasks: [CORE-EPIC-812, CORE-810, CORE-811, CORE-809]
touches:
  - SPEC.md
  - docs/MIGRATION.md
  - SECURITY.md
  - docs/VERSION-HISTORY.md
  - docs/CONTEXT-BUDGET.md
  - README.md
  - CONTRIBUTING.md
  - SPEC/plan-filing.md
  - claude/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - docs/AGENT-NEUTRALITY.md
  - docs/AGENT-COMPAT.md
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-813.md
---

# CORE-813 | release v7.3.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-812]] [[CORE-810]] [[CORE-811]] [[CORE-809]]

## 🎯 Goal

Cut v7.3.0 minor release tagging CORE-EPIC-812 (`/ft-prep-unattended` folded into `/ft-seed-unattended`) + CORE-810 + CORE-811 (split-guard tightening) since v7.2.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v7.2.0` → `v7.3.0`
- [x] docs/MIGRATION.md example pin bumped `v7.2.0` → `v7.3.0`
- [x] SECURITY.md release-tag example pin bumped `v7.2.0` → `v7.3.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v7.3.0`, or recorded `skipped @ v7.3.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-813 — flaitron v7.3.0 (...)` commit lands
- [x] Annotated `v7.3.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v7.3.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-813.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v7.2.0 → v7.3.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-EPIC-812]] — seed-prep-merge: `/ft-seed-unattended` absorbs `/ft-prep-unattended` (.2 contract, .3 seed body, .4 slug retired, .N audit)
- [[CORE-810]] — split guard: the mechanical slice must be safe to ship before the act; mechanical row inserted right after its source
- [[CORE-811]] — split guard: drafted mechanical row self-screened against candidacy clauses 1–5
- [[CORE-809]] — prior release (v7.2.0); precedent for the 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — filed via Step 1.1 this session.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v7.2.0 matches `SPEC.md:3` and `git describe`. `feat:` commits (CORE-812.1/.3/.4), no `feat!:` / `BREAKING CHANGE:` → minor; PLAN target v7.3.0 agrees. The `ft-prep-unattended` retirement is a fold with no alias, minor on the `ft-debug` (v5.15.0) / v5.27.0 / v5.29.0 precedent; the MIGRATION retired-table row already names v7.3.0.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:486` (`describe --tags` pin), `SECURITY.md:130` (release-tag pin).

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-809 (v7.2.0) is the direct precedent: same 6-line subtasks. Its learning (run the full `git grep` before rewording a where-it-appears claim) carries into §7.1.

- [x] **Drift check** — pins at `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:130` read v7.2.0 (SECURITY moved 125 → 130 since CORE-809). PLAN line matches the Step 1.1 draft.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — version confirmed at the Step 1.1 draft; no breaking commits.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Adopter migration impact:
  - **CORE-EPIC-812 — retired skill, small action.** `/ft-prep-unattended` is gone; `/ft-seed-unattended`'s one attended walk now also prepares declined rows (pin / split / stay) behind the same prose gate and one `chore: seed [unattended]` commit. A prepared row the predicate admits carries a dependent token item (drop it for the old prep-only outcome). Codex reconcile prunes the exact-owned `.agents/skills` link; delete the dangling Claude/Cursor/Grok link `/ft-update` Step 4.6 reports. Calls to `/ft-prep-unattended` in your own skills/docs need the new name. Snippet paste-blocks changed (Utilities line, `ln -s` roster) — re-paste.
  - **CORE-810 / CORE-811 — behavior, no action.** Split guard now also requires the mechanical slice be safe to ship before the act, inserts the mechanical row directly after its source, and self-screens the drafted row against candidacy clauses 1–5 (a remaining trip → stay).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: release recipe; CORE-809 precedent followed.

- [x] **Minimal refactor gate** — N/A: no code.

- [x] Implemented the minimal solution — 3 version edits + dogfood stamps (plus §7.1 standing-check refreshes and the VERSION-HISTORY entry at closure).

- [x] Updated/added tests for non-trivial behavior — N/A: markdown-only cut.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:130` v7.2.0 → v7.3.0. Remaining `v7.2.0` grep hits are dogfood stamps (resolved below), the VERSION-HISTORY entry, and CONTEXT-BUDGET measurement stamps (refreshed at §7.1).
- Dogfood ledger (stamp files clean at walk start and before each write):
  - `Claude → v7.3.0 · 2026-10-18 (dogfooded) — written` (this session's own drive)
  - `Codex → v7.3.0 · 2026-10-18 (dogfooded) — written` (verbatim receipt: version v7.3.0, My row `v7.2.0 · 2026-10-18 (dogfooded)` matched, Phase-1 drive CORE-813 / skip ✅)
  - `Grok → v7.3.0 · 2026-10-18 (dogfooded) — written` (verbatim receipt: version v7.3.0, My row matched, Phase-1 drive CORE-641 / skip ✅)
  - `Cursor → v7.2.0 · 2026-10-18 (dogfooded; skipped @ v7.3.0) — written` (operator: no Cursor session this round)
  - File-state re-verify: no `MISSING`; matrix 4/4, PLATFORMS footers 3/3, CAPABILITIES 1/1.
- SOP currency: clean — `ft-task` 0 tier-1 candidates; tier-2 note 2 `SPEC.md` commits since 2026-10-11 (version-line bumps).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — standing gate, below.

- [x] Ran lint/type-check on changed code — standing gate, below.

- [x] **Verification receipt** — Testing Notes below; dogfood ledger re-verified from file state.

- [x] **External review** — `/ft-audit docs ai-referenced` read-only reviewers (Phase 4).

- [x] (frontend) N/A — no UI change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Standing gate (2026-10-18): viz test (614/614) / typecheck / lint / build, fleet suite (102/102), both `node --check` — all exit 0.
- §6.1: HEAD `9f0ba450` was 10 commits unpushed (no CI run); operator chose push-main-now → CI run 39177799485 `completed success`.
- §6.2: `npm audit --audit-level=high` — 0 vulnerabilities.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - Run 1 (2026-10-18, three read-only reviewers over the 18-entry set; gate `pair_q final_newline context_budget` ok; no `.flaitron/audit-decisions/` files, so nothing settled; no `prep-unattended` residue outside history): 0 Critical/High. 9 Medium/Low, all verified on disk. Operator chose **Stop**; all fixed in this tree:
    - Medium: README glossary count 74 → 73; cursor/grok/claude snippet bump notes repointed to MIGRATION §"Retired skills leave dangling symlinks" with v7.3.0 named; AGENT-NEUTRALITY `SPEC/tasknote-selection.md` row reference cell → the five names the file carries (`/ft-close-epic`, `/ft-release` left at CORE-595; `/ft-audit` added); CAPABILITIES `--micro` / `--loop` bullets + AGENT-NEUTRALITY:126 now disclose their unregistered sites (pointing at the `git grep`, no count).
    - Low: claude snippet Utilities bullet — starter is part of a split, not a third outcome; CONTRIBUTING dangling-link comments name the v7.1.0–v7.2.0 `ft-prep-unattended` link; AGENT-NEUTRALITY `--fast` gates.md site §"Operator-gate cues" → the trigger line; PLATFORMS "grok-cli" → Grok Build (2 sites, last two outside history); AGENT-NEUTRALITY + PLATFORMS no longer use shipped codex/grok/cursor as future-platform examples.
    - Full `bash tools/drift-checks.sh` 17/17 ok after fixes.
  - Run 2 (one fresh read-only reviewer over the fix diff): 7/9 verified; 4 new Medium/Low held — AGENT-NEUTRALITY row-38 Section cell covered only the `/ft-refactor` block (Medium; the `--park` bullet already claimed the whole §"When to use"); CAPABILITIES `--micro`/`--loop` + AGENT-NEUTRALITY:126 "unregistered" claims ignored the `SPEC/procedures/ft-task.md` row; `SPEC/plan-filing.md:64` "plus a starter" (fix-5 sibling); a 100-char wrap at `docs/PLATFORMS.md:175` from fix 9. Operator chose **Stop**; all fixed (row 38 now names the whole §"When to use" and lists the two later sections as unregistered, consistent with the `--starter` bullet).
  - Run 3 (inline re-check): no `plus a starter` left outside the already-conditional seed body; full `bash tools/drift-checks.sh` 17/17 ok. **Zero findings** — §7.1 continues.
  - Standing checks + mirror pairs: wiring-consumer (rc=1 ×2), installed-surface (4 diffs empty), local self-wiring (no output), Pair A (10 templates named), Pair K1/K2, `'pair_*' skill_name_invariant` 11/11 ok, shipped-skill parity + context budget ok. README counter refreshed 1201 → 1209 (as-of 2026-10-18 unchanged; counted before this note's archive). `docs/CONTEXT-BUDGET.md` ledger refreshed at v7.3.0 (cold-start sum 112,018 held; `AGENTS.md` 9,422 → 9,399; `unattended-candidacy.md` 16,493 → 18,840; `plan-filing.md` 25,866 → 25,844; `layout.md` 6,290 → 6,267; `task-line-segments.md` 6,199 → 6,209; ft-prep-unattended body row dropped; snippet 12,815 → 12,642; `ft-release` directory 109,241 → 109,254). Advisories: global wiring clean (0 dangling, 1 casing, 0 over-install); completed rotation 57 rows (bound 60); viz major typescript 5.9.3→7.0.2 (CORE-641).

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form at the top of `## Completed`, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — in the 📦 gate. `touches:` reconciliation: `git diff --name-only` = the 16 declared tracked paths plus this archived note.

- [x] **Learnings** — a ledger row's Reference cell and Section cell are two claims about one file, and fixing one without re-deriving the other leaves the row half-true: run 1 corrected the names, run 2 caught that the sites listed no longer held them all. Same shape as CORE-809's "grep before rewording a where-it-appears claim", one cell over. A retirement also strands every surface that told readers where to clean up after the *last* retirement (the snippet bump notes still pointed at v7.0.0's section) — grep for the prior release's cleanup pointers when a release retires a skill.

**Final Summary:** Cut flaitron v7.3.0, a minor release tagging CORE-EPIC-812 (`/ft-prep-unattended` folded into `/ft-seed-unattended`: one attended walk marks admitted rows and prepares declined ones — pin, or split with a starter when the remainder needs one — behind one prose gate and one filing commit; the prep slug retired with no alias and a v7.3.0 retired-table row) and CORE-810/811 (split guard: the mechanical slice must be safe to ship before the act, is inserted after its source, and is self-screened against candidacy clauses 1–5). The cut bumped the three version pins, refreshed Claude/Grok/Codex dogfood rows to v7.3.0 (Grok and Codex on verbatim receipts) and recorded Cursor `skipped @ v7.3.0`, pushed main for a green CI base (run 39177799485), refreshed the README counter (1209) and the context-budget ledger, and prepended the VERSION-HISTORY entry. The §7.1 sweep took three runs under two operator Stops: 0 Critical/High; 13 Medium/Low doc fixes (9 + 4) landed in this cut (snippet bump notes repointed to MIGRATION §"Retired skills leave dangling symlinks"; Claude snippet Utilities and `SPEC/plan-filing.md` tie the starter to a split; agent-neutrality ledger rows and CAPABILITIES `--micro`/`--loop` coverage; PLATFORMS Grok Build naming and wrap; CONTRIBUTING self-host cleanup comments; README glossary count). SOP currency clean. Adopter impact: no required edits; Codex prunes its `ft-prep-unattended` link, `/ft-update` Step 4.6 reports the Claude/Cursor/Grok one, and callers of `/ft-prep-unattended` switch to `/ft-seed-unattended`.

**Archived:** 2026-10-18
