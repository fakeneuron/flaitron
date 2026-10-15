---
title: release v7.1.0
status: completed
tags: []
created: 2026-10-15
due:
related-tasks: [CORE-EPIC-783, CORE-781, CORE-787, CORE-788, CORE-789, CORE-782, CORE-779]
touches:
  - SPEC.md
  - docs/MIGRATION.md
  - SECURITY.md
  - docs/VERSION-HISTORY.md
  - docs/CONTEXT-BUDGET.md
  - README.md
  - docs/AGENT-COMPAT.md
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - claude/AGENTS-snippet.md
  - codex/AGENTS-snippet.md
  - cursor/AGENTS-snippet.md
  - grok/AGENTS-snippet.md
  - docs/WORKTREES.md
  - docs/EXTERNAL-AGENTS.md
  - docs/CODEX-VERIFICATION.md
  - SPEC/plan-filing.md
  - claude/skills/ft-seed-unattended/SKILL.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-796.md
---

# CORE-796 | release v7.1.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-783]] [[CORE-781]] [[CORE-787]] [[CORE-788]] [[CORE-789]] [[CORE-782]] [[CORE-779]]

## 🎯 Goal

Cut v7.1.0 minor release tagging CORE-EPIC-783 (`/ft-prep-unattended`) + CORE-781 (auto-priority) + CORE-787 (overlay-reconcile-pin) + CORE-788 (brand-pilot-provenance) + CORE-789/782 fixes since v7.0.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v7.0.0` → `v7.1.0`
- [x] docs/MIGRATION.md example pin bumped `v7.0.0` → `v7.1.0`
- [x] SECURITY.md release-tag example pin bumped `v7.0.0` → `v7.1.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v7.1.0`, or recorded `skipped @ v7.1.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-796 — flaitron v7.1.0 (...)` commit lands
- [x] Annotated `v7.1.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v7.1.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-796.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v7.0.0 → v7.1.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-EPIC-783]] — unattended-prep: candidacy clause 3 two-layer boundary (.2) + new attended `/ft-prep-unattended` (.3)
- [[CORE-781]] — auto-priority: filing paths stop asking for priority
- [[CORE-787]] — audit overlay reconciled and pinned against the v7.0.0 scaffold (flaitron-self)
- [[CORE-788]] — brand kit provenance declared (flaitron-self)
- [[CORE-789]] — Codex wiring bootstrap/repair in `/ft-adopt` + `/ft-update`
- [[CORE-782]] — rotation receipt printed before the finish marker
- [[CORE-779]] — prior release (v7.0.0); precedent for the 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — filed via Step 1.1 this session.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v7.0.0 matches `SPEC.md:3` and `git describe`. `feat:` commits (CORE-783.1–.3, 781, 787, 788), no `feat!:` / `BREAKING CHANGE:` → minor; PLAN target v7.1.0 agrees.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:484` (`describe --tags` pin), `SECURITY.md:125` (release-tag pin).

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-779 (v7.0.0) is the direct precedent: same 6-line subtasks. Its learning (after a sweep fix that edits a number or claim, `git grep` the old value repo-wide before re-running) carries forward.

- [x] **Drift check** — pins at `SPEC.md:3`, `docs/MIGRATION.md:484`, `SECURITY.md:125` read v7.0.0. PLAN line matches the Step 1.1 draft.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — version confirmed at the Step 1.1 draft; no breaking commits, adopter impact is additive.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- Adopter migration impact:
  - **CORE-783.3 — new optional skill.** `/ft-prep-unattended` (attended, flagless) ships beside `/ft-seed-unattended`. Adopters who want it wire `claude/skills/ft-prep-unattended` (Codex wrapper `codex/skills/ft-prep-unattended`) and re-paste the AGENTS.md snippet block (utility roster now names it).
  - **CORE-789 — Codex wiring repair, no manual action.** `/ft-adopt` and `/ft-update` now establish and repair the pinned Codex repo skill subset (also on same-version / offline / declined-bump exits), via `codex/reconcile-skills.md`. Running `/ft-update` heals partial Codex wiring.
  - **CORE-781 — behavior, no action.** `/ft-file-task` (incl. `--park`) and `/ft-open-epic` no longer ask for priority; the AI picks the section and names it at the existing review surface. Park priority flags still override.
  - **CORE-782 — behavior, no action.** Every closer prints `Completed rotation: <N> rows (bound 60)` before 🏁.
  - **CORE-783.2 — behavior, no action.** Candidacy clause 3: keyword list is a mechanical screen; a keyword miss is not a semantic pass.
  - **CORE-787, CORE-788 — flaitron-self only** (audit overlay pin; brand kit provenance).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: release recipe; CORE-779 precedent followed.

- [x] **Minimal refactor gate** — N/A: no code.

- [x] Implemented the minimal solution — 3 version edits + dogfood stamps (plus §7.1 standing-check refreshes and the VERSION-HISTORY entry at closure).

- [x] Updated/added tests for non-trivial behavior — N/A: markdown-only cut.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:484`, `SECURITY.md:125` v7.0.0 → v7.1.0. Remaining `v7.0.0` grep hits are history (v7.0.0 rename rows/recipe, CONTEXT-BUDGET measurement stamps, SOP `last-verified:`, CODEX-VERIFICATION dated record).
- Dogfood ledger (stamp files clean at walk start):
  - `Claude → v7.1.0 · 2026-10-15 (dogfooded) — written` (this session's own drive)
  - `Grok → v7.1.0 · 2026-10-15 (dogfooded) — written` (verbatim receipt: version v7.1.0, My row `v7.0.0 · 2026-10-11 (dogfooded)` matched, Phase-1 drive CORE-641 / skip ✅)
  - `Codex → v7.1.0 · 2026-10-15 (dogfooded) — written` (verbatim receipt: version v7.1.0, My row `v7.0.0 · 2026-10-11 (dogfooded)` matched, Phase-1 drive CORE-796 / skip ✅)
  - `Cursor → v7.1.0 · 2026-10-15 (dogfooded) — written` (verbatim receipt: version v7.1.0, My row `v5.33.0 · 2026-09-23 (dogfooded; skipped @ v7.0.0)` matched, Phase-1 drive CORE-641 / skip ✅; skip suffix dropped)
  - File-state re-verify: no `MISSING`; matrix 4/4, PLATFORMS footers 3/3.
- SOP currency: clean — `ft-task` 0 tier-1 candidates, 0 tier-2 `SPEC.md` commits since 2026-10-11 (CORE-782 touched SOP + sources together).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — standing gate, below.

- [x] Ran lint/type-check on changed code — standing gate, below.

- [x] **Verification receipt** — Testing Notes below; dogfood ledger re-verified from file state.

- [x] **External review** — `/ft-audit docs ai-referenced` across three read-only reviewers (Phase 4).

- [x] (frontend) N/A — no UI change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Standing gate (2026-10-15): viz test (614/614) / typecheck / lint / build, fleet suite (102/102), both `node --check` — all exit 0.
- §6.1: HEAD `d1a6c6fd` was 7 commits unpushed (no CI run; origin/main `db037dcb` green); operator chose push-main-now → CI run 38820302234 `completed success` (drift, validate 24, validate 26).
- §6.2: `npm audit --audit-level=high` — 0 vulnerabilities.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - Run 1 (2026-10-15, three read-only reviewers over the 18-entry set; gate `pair_q final_newline context_budget` ok): 0 Critical/High. 11 Medium/Low held (all verified on disk); operator chose **Stop** — all fixed in this tree, full `bash tools/drift-checks.sh` ok, sibling-restatement grep clean:
    - Medium: cursor+grok snippet Pinning notes lacked CORE-789's same-pin `/ft-update` repair; claude+codex snippets' `ln -s` parser list lacked `codex/reconcile-skills.md`; `docs/WORKTREES.md:94` claimed post-closure unchanged in a worktree (rotation is skipped there); `SECURITY.md:129` review scope lacked `codex/` (reconcile shell block runs in adopter trees). README task counter (1180, as of 2026-10-11) deferred to the §7.1 standing check.
    - Low: `docs/PLATFORMS.md` Codex inventory (tree + worked example) lacked `reconcile-skills.md`; `docs/MIGRATION.md:482` lacked `/ft-prep-unattended` provenance; `README.md:112` + `docs/CODEX-VERIFICATION.md` intro lacked the CORE-789 receipt; `SECURITY.md:181` overstated the fleet updater as the whole `/ft-update` recipe; `docs/EXTERNAL-AGENTS.md` lacked the `--park` candidacy exception and the rotation-receipt out-of-contract bullet; (outside the sweep set) `SPEC/plan-filing.md:214` omitted `/ft-prep-unattended`'s write.
  - Run 2 (one fresh read-only reviewer over the fix diff): all 9 fix groups verified true, drift-checks 17/17 ok; 2 new Low held — `docs/EXTERNAL-AGENTS.md` rotation bullet cited [The Return] (which never mentions rotation; this cut's own miss); `claude/skills/ft-seed-unattended/SKILL.md:9` unqualified "Every filing skill … proposes" (pre-existing sibling of the `--park` fix). Operator chose **Stop**; both fixed (citation → `SPEC/plan-filing.md` §"`## Completed` rotation"; `--park` exception added).
  - Run 3 (inline re-check of that diff): `pair_q` resolves the new citation, full `bash tools/drift-checks.sh` ok, no unqualified "Every filing skill" sibling left. **Zero findings** — §7.1 continues.
  - Standing checks + mirror pairs: wiring-consumer, installed-surface (4 diffs), local self-wiring, Pair A, Pairs B/C/H/J/M/N/O/P/Q/R + skill-name invariant + shipped-skill parity + context budget — all clean. README counter refreshed 1180 → 1193 (2026-10-11 → 2026-10-15; counted before this note's archive). `docs/CONTEXT-BUDGET.md` ledger refreshed at v7.1.0 (cold-start sum 111,474 → 111,956; `unattended-candidacy.md` 13,116 → 15,444; `ft-update` 20,350 → 23,084). Advisories: global wiring clean (0 dangling, 1 casing, 0 over-install); completed rotation 56 rows (bound 60); viz major typescript 5.9.3→7.0.2 (CORE-641). Observation (not filed): `.flaitron/audit-overlay/SKILL.md` keeps `flaitron-reconciled: v7.0.0`; `claude/skills/ft-audit/` is unchanged since v7.0.0, so the pin is still accurate.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form at the top of `## Completed`, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — in the 📦 gate. `touches:` reconciliation: `git diff --name-only` = the 19 declared tracked paths plus this archived note.

- [x] **Learnings** — a sweep fix that adds a cross-reference needs its target read, not recalled: run 1's EXTERNAL-AGENTS bullet cited [The Return] for a rotation fact that section never states, and only run 2's fix-diff reviewer caught it (`pair_q` resolves section citations, not in-page anchors or what they claim). Carries forward CORE-779's grep-the-siblings learning, which caught nothing new this cut but cleared the `--park` sibling run 2 named.

**Final Summary:** Cut flaitron v7.1.0, a minor release tagging CORE-783.3 (new attended `/ft-prep-unattended`, adopter subset + Codex wrapper), CORE-783.2 (candidacy clause 3 as a mechanical screen), CORE-781 (filing skills stop asking for priority), CORE-782 (rotation receipt before 🏁), and CORE-789 (Codex wiring bootstrap/repair in `/ft-adopt` and `/ft-update`); CORE-787/788 are flaitron-self only. The cut bumped the three version pins, refreshed all four dogfood rows to v7.1.0 (Grok, Codex, and Cursor on verbatim receipts — Cursor's first refresh since v5.33.0), pushed main for a green CI base (run 38820302234), refreshed the README counter (1193) and the context-budget ledger, and prepended the VERSION-HISTORY entry. The §7.1 sweep took three runs under two operator Stops: 0 Critical/High; 13 Medium/Low doc fixes landed in this cut (snippet siblings on same-pin repair and the Codex block's parsers, SECURITY review scope and fleet-updater remit, WORKTREES rotation skip, EXTERNAL-AGENTS `--park` and rotation-receipt bullets, PLATFORMS/MIGRATION/README/CODEX-VERIFICATION inventory, `SPEC/plan-filing.md` and `ft-seed-unattended` siblings). SOP currency clean. Adopter impact: no required edits; `/ft-update` wires `/ft-prep-unattended` and heals partial Codex wiring; optional AGENTS.md re-paste for the new roster line.

**Archived:** 2026-10-15
