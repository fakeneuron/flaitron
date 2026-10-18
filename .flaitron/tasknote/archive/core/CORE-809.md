---
title: release v7.2.0
status: completed
tags: []
created: 2026-10-18
due:
related-tasks: [CORE-802, CORE-803, CORE-800, CORE-801, CORE-797, CORE-798, CORE-799, CORE-796]
touches:
  - SPEC.md
  - docs/MIGRATION.md
  - SECURITY.md
  - docs/VERSION-HISTORY.md
  - docs/CONTEXT-BUDGET.md
  - README.md
  - AGENTS.md
  - docs/AGENT-COMPAT.md
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - docs/AGENT-NEUTRALITY.md
  - claude/skills/ft-adopt/SKILL.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-809.md
---

# CORE-809 | release v7.2.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-802]] [[CORE-803]] [[CORE-800]] [[CORE-801]] [[CORE-797]] [[CORE-798]] [[CORE-799]] [[CORE-796]]

## 🎯 Goal

Cut v7.2.0 minor release tagging CORE-802 (adopter-owned `/ft-audit` decisions file) + CORE-803 (release CI line moves to Step 8) + CORE-800 (brand chamber reference) since v7.1.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v7.1.0` → `v7.2.0`
- [x] docs/MIGRATION.md example pin bumped `v7.1.0` → `v7.2.0`
- [x] SECURITY.md release-tag example pin bumped `v7.1.0` → `v7.2.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v7.2.0`, or recorded `skipped @ v7.2.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-809 — flaitron v7.2.0 (...)` commit lands
- [x] Annotated `v7.2.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v7.2.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-809.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v7.1.0 → v7.2.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-802]] — `/ft-audit` reads and appends `.flaitron/audit-decisions/<domain>.md`
- [[CORE-803]] — `/ft-release` release-commit CI line moves to Step 8 (flaitron-self)
- [[CORE-800]] — brand chamber reference (+ chamber-growth still) (flaitron-self)
- [[CORE-801]] — public privacy scrub of the working tree (flaitron-self)
- [[CORE-797]] / [[CORE-798]] / [[CORE-799]] — `/ft-prep-unattended` dry run, guard wording, split collisions
- [[CORE-796]] — prior release (v7.1.0); precedent for the 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — filed via Step 1.1 this session.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v7.1.0 matches `SPEC.md:3` and `git describe`. `feat:` commits (CORE-800, chamber-growth, CORE-802, CORE-803), no `feat!:` / `BREAKING CHANGE:` → minor; PLAN target v7.2.0 agrees.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:486` (`describe --tags` pin), `SECURITY.md:125` (release-tag pin).

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-796 (v7.1.0) is the direct precedent: same 6-line subtasks. Its learning (read a new cross-reference's target, don't recall it) carries forward into §7.1.

- [x] **Drift check** — pins at `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:125` read v7.1.0. PLAN line matches the Step 1.1 draft.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — version confirmed at the Step 1.1 draft; no breaking commits, adopter impact is additive.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Adopter migration impact:
  - **CORE-802 — new optional repo file, no required action.** `/ft-audit` reads every `.flaitron/audit-decisions/<domain>.md` before its passes, holds back findings matching a settled entry (named in the Summary), and at its write step asks by-design / won't-fix / not-now per dropped finding, appending the first two. Thin overlays inherit it on bump; full-copy forks gain it only on re-reconcile. Forks carrying a pasted "settled decisions" list should move it into the decisions file (`docs/MIGRATION.md` §1.2.1).
  - **CORE-797/798/799 — behavior, no action.** `/ft-prep-unattended` guard wording tightened (pins need an existing deciding test command) and two split collisions now settle as stay.
  - **Snippet wording only** — codex/cursor/grok snippets name the `.flaitron/core/.flaitron/` ignore line explicitly; re-paste optional.
  - **CORE-800, chamber-growth, CORE-801, CORE-803 — flaitron-self only** (brand kit stills, privacy scrub, `/ft-release` CI line).
- Mid-cut interruption (2026-10-18): operator asked to park the cut for a "park asks for priority" fix. Investigation: flaitron already ships the no-ask park (CORE-781, `f08b798e`, in v7.1.0); all 24 `~/Code` adopters pin v7.0.0, whose park-mode P2 asks. No code fix needed — the remedy is this release plus a fleet bump. Operator chose to continue the cut.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: release recipe; CORE-796 precedent followed.

- [x] **Minimal refactor gate** — N/A: no code.

- [x] Implemented the minimal solution — 3 version edits + dogfood stamps (plus §7.1 standing-check refreshes and the VERSION-HISTORY entry at closure).

- [x] Updated/added tests for non-trivial behavior — N/A: markdown-only cut.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:125` v7.1.0 → v7.2.0. Remaining `v7.1.0` grep hits are history (MIGRATION:484 provenance, VERSION-HISTORY entry, CONTEXT-BUDGET measurement stamps — refreshed at §7.1).
- Dogfood ledger (stamp files clean at walk start and before write):
  - `Claude → v7.2.0 · 2026-10-18 (dogfooded) — written` (this session's own drive)
  - `Grok → v7.2.0 · 2026-10-18 (dogfooded) — written` (verbatim receipt: version v7.2.0, My row `v7.1.0 · 2026-10-15 (dogfooded)` matched, Phase-1 drive CORE-641 / skip ✅)
  - `Codex → v7.2.0 · 2026-10-18 (dogfooded) — written` (verbatim receipt: version v7.2.0, My row matched, Phase-1 drive CORE-809 / skip ✅)
  - `Cursor → v7.2.0 · 2026-10-18 (dogfooded) — written` (verbatim receipt: version v7.2.0, My row matched, Phase-1 drive CORE-809 / skip ✅)
  - File-state re-verify: no `MISSING`; matrix 4/4, PLATFORMS footers 3/3, CAPABILITIES 1/1.
- SOP currency: clean — `ft-task` 0 tier-1 candidates; tier-2 note 2 `SPEC.md` commits since 2026-10-11 (the v7.0.0 / v7.1.0 version-line bumps only).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — standing gate, below.

- [x] Ran lint/type-check on changed code — standing gate, below.

- [x] **Verification receipt** — Testing Notes below; dogfood ledger re-verified from file state.

- [x] **External review** — `/ft-audit docs ai-referenced` across three read-only reviewers (Phase 4).

- [x] (frontend) N/A — no UI change.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- Standing gate (2026-10-18): viz test (614/614) / typecheck / lint / build, fleet suite (102/102), both `node --check` — all exit 0.
- §6.1: HEAD `e7e051e7` was 18 commits unpushed (no CI run); operator chose push-main-now → CI run 39131670298 `completed success`.
- §6.2: `npm audit --audit-level=high` — 0 vulnerabilities.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - Run 1 (2026-10-18, three read-only reviewers over the 18-entry set; gate `pair_q final_newline context_budget` ok; no `.flaitron/audit-decisions/` files, so nothing settled): 0 Critical/High. 10 Medium/Low, all verified on disk; the README counter was deferred to the §7.1 standing check, leaving 9 held. Operator chose **Stop**; all fixed in this tree:
    - Medium: `SECURITY.md` threat model and mitigations now name `.flaitron/audit-decisions/*.md` (an injected entry suppresses a finding; the Summary "Settled" line is the tell); `docs/AGENT-NEUTRALITY.md` `/loop` row now covers `SPEC.md` §"Loop tasks" (restored at CORE-558.2) in place of a false "no longer names the runner" clause; `claude/CAPABILITIES.md` `/code-review` row widened to the task's own diff (a CORE-805 mirror miss).
    - Low: `docs/MIGRATION.md:68` checkout size; new `docs/VISION.md` ledger row (2 sites); AGENTS.md / README.md repo-layout root entries; `docs/PLATFORMS.md:35` pass count (6 for `context`); AGENT-NEUTRALITY plan-filing row `/ft-audit*` → `/ft-audit`, `/ft-audit-repo`; CAPABILITIES `--park`/`--starter` site claims.
  - Run 2 (one fresh read-only reviewer over the fix diff): 7/9 verified, drift-checks 17/17 ok. 6 new Medium/Low held — CAPABILITIES `--park`/`--starter` bullets still undercounting and over-claiming (Medium); VISION-row wording (`:46` reads "or any equivalent runner"); sparse size ~2.9 → ~3.0 MB; a stale "`/ft-close-epic` placement rule" clause in the plan-filing ledger row (removed by CORE-768.4); `.editorconfig` / `LOGO.webp` absent from both layout lists; `templates/loop-heartbeat-template.md:3-4` `/loop` mention unledgered. Operator chose **Stop**; all fixed (the bullets no longer restate a count and point at the `git grep`). The sibling grep caught one more instance of the same size claim, `claude/skills/ft-adopt/SKILL.md:64` (~18.5 → ~2.9 MB), fixed too.
  - Run 3 (inline re-check): no `18.5` / `~2.9 MB` left outside history, full `bash tools/drift-checks.sh` 17/17 ok. **Zero findings** — §7.1 continues.
  - Standing checks + mirror pairs: wiring-consumer (rc=1 ×2), installed-surface (4 diffs empty), local self-wiring (no output), Pair A (10 templates named), Pair K1/K2, `'pair_*' skill_name_invariant` 11/11 ok, shipped-skill parity + context budget ok. README counter refreshed 1193 → 1201 (2026-10-15 → 2026-10-18; counted before this note's archive). `docs/CONTEXT-BUDGET.md` ledger refreshed at v7.2.0 (cold-start sum 111,956 → 112,018; `AGENTS.md` 9,054 → 9,422; `unattended-candidacy.md` 15,444 → 16,493; `ft-release` 35,869 → 36,893, directory 108,155 → 109,241). Advisories: global wiring clean (0 dangling, 1 casing, 0 over-install); completed rotation 48 rows (bound 60); viz major typescript 5.9.3→7.0.2 (CORE-641).

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form at the top of `## Completed`, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — in the 📦 gate. `touches:` reconciliation: `git diff --name-only` = the 13 declared tracked paths plus this archived note.

- [x] **Learnings** — a sweep fix that rewrites a claim about *where* something appears needs the full `git grep` before the wording, not after: run 1's `--park`/`--starter` rewrite named the directories it had seen and over-claimed coverage, and run 2 caught both halves. The fix that held stopped restating the count and pointed at the grep, the same "stop counting, start deriving" lesson CORE-465 recorded. Carries forward CORE-779's grep-the-siblings learning, which caught `ft-adopt/SKILL.md:64` this cut.

**Final Summary:** Cut flaitron v7.2.0, a minor release tagging CORE-802 (`/ft-audit` reads and appends adopter-owned `.flaitron/audit-decisions/<domain>.md`, holding back settled findings and asking by-design / won't-fix / not-now at its write step) and CORE-797/798/799 (`/ft-prep-unattended` guard wording and split collisions). CORE-803 (release CI line moved to Step 8), CORE-800 (brand chamber stills), and CORE-801 (privacy scrub) are flaitron-self only. The cut bumped the three version pins, refreshed all four dogfood rows to v7.2.0 (Grok, Codex, and Cursor on verbatim receipts), pushed main for a green CI base (run 39131670298), refreshed the README counter (1201) and the context-budget ledger, and prepended the VERSION-HISTORY entry. The §7.1 sweep took three runs under two operator Stops: 0 Critical/High; 16 Medium/Low doc fixes (9 + 6 + one sibling) landed in this cut (SECURITY threat model names the decisions file; agent-neutrality ledger rows for `/loop`, `docs/VISION.md`, the heartbeat template, and plan-filing; CAPABILITIES `/code-review` scope and flag-site claims; PLATFORMS pass count; MIGRATION + ft-adopt checkout sizes; both repo-layout lists). SOP currency clean. Mid-cut, the operator asked to park the cut for a "park asks for priority" fix; flaitron already ships it (CORE-781, v7.1.0), and all 24 adopters pin v7.0.0, so the remedy is a fleet bump onto this release. Adopter impact: no required edits; full-copy audit forks re-reconcile to gain the decisions file; adopters bumping from v7.0.0 also gain the no-ask `--park`.

**Archived:** 2026-10-18
