---
title: release v7.4.0
status: completed
tags: []
created: 2026-10-20
due:
related-tasks: [CORE-814, CORE-EPIC-815, CORE-816, CORE-813]
touches:
  - SPEC.md
  - docs/MIGRATION.md
  - SECURITY.md
  - docs/VERSION-HISTORY.md
  - docs/CONTEXT-BUDGET.md
  - README.md
  - docs/AGENT-COMPAT.md
  - docs/AGENT-NEUTRALITY.md
  - claude/skills/ft-release/SKILL.md
  - docs/PLATFORMS.md
  - claude/CAPABILITIES.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-817.md
---

# CORE-817 | release v7.4.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-814]] [[CORE-EPIC-815]] [[CORE-816]] [[CORE-813]]

## 🎯 Goal

Cut v7.4.0 minor release tagging CORE-814 (model-routing calibration) + CORE-EPIC-815 (`[medium]` tier renamed `[moderate]`, legacy alias kept) + CORE-816 (quality-first tier × platform map) since v7.3.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v7.3.0` → `v7.4.0`
- [x] docs/MIGRATION.md example pin bumped `v7.3.0` → `v7.4.0`
- [x] SECURITY.md release-tag example pin bumped `v7.3.0` → `v7.4.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v7.4.0`, or recorded `skipped @ v7.4.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-817 — flaitron v7.4.0 (...)` commit lands
- [x] Annotated `v7.4.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v7.4.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-817.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v7.3.0 → v7.4.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-814]] — model-routing calibration: narrower `[frontier]` triggers, Claude `[medium]` cell → Sonnet @ high, vendor-default effort inside a range
- [[CORE-EPIC-815]] — `[medium]` tier renamed `[moderate]`; `[medium]` stays a permanent read-only alias; optional open-row sed in `SPEC/model.md`
- [[CORE-816]] — quality-first calibration: Claude `[light]`/`[moderate]`/`[heavy]` → Sonnet @ high / Opus @ medium / Opus @ high; Haiku off the map
- [[CORE-813]] — prior release (v7.3.0); precedent for the 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — filed via Step 1.1 this session.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v7.3.0 matches `SPEC.md:3` and `git describe`. `feat:` commits (CORE-814, CORE-815.1–.4, CORE-816), no `feat!:` / `BREAKING CHANGE:` → minor; PLAN target v7.4.0 agrees. The tier rename keeps `[medium]` as a permanent alias, so no adopter row breaks.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:486` (`describe --tags` pin), `SECURITY.md:130` (release-tag pin).

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-813 (v7.3.0) is the direct precedent: same 6-line subtasks. Its learning (re-derive both cells of a ledger row; grep the prior release's cleanup pointers) carries into §7.1.

- [x] **Drift check** — pins at `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:130` read v7.3.0 (unchanged lines since CORE-813). PLAN line matches the Step 1.1 draft. CI on HEAD `f98d202a`: `CI completed success`; main already in sync with origin.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — version confirmed at the Step 1.1 draft; no breaking commits.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

- Adopter migration impact:
  - **CORE-EPIC-815 — optional action.** The `[medium]` model tier is now `[moderate]`. `[medium]` stays a permanent read-only alias (gate tier match, candidacy clause 1, parser), so existing rows keep working; writers emit `[moderate]`. `SPEC/model.md` carries an optional sed that rewrites open-row `[medium]` tokens only.
  - **CORE-814 / CORE-816 — no action.** Routing recalibration: `[frontier]` triggers narrowed (open decision **and** hard to unwind); Claude Code map now prints Sonnet @ high / Opus @ medium / Opus @ high for light / moderate / heavy; Haiku only on an explicit concrete tag; effort cells take the vendor default inside a range. Rows already filed keep their tier; only the printed pick changes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — canonical release recipe (CORE-813 precedent); no new shape.

- [x] **Minimal refactor gate** — no refactor; version-string and stamp substitutions only.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A, markdown-only edits.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:486`, `SECURITY.md:130` v7.3.0 → v7.4.0. Residual `v7.3.0` grep hits are historical refs (MIGRATION retired-table row and roster line, AGENTS-snippet bump note) and the CONTEXT-BUDGET ledger (refreshed in §7.1).
- Dogfood ledger (walk-start `git status --porcelain` on the three stamp files empty; re-checked before writing):
  - Claude → `v7.4.0 · 2026-10-20 (dogfooded)` — written (this session's own run) — `docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`
  - Grok → `v7.4.0 · 2026-10-20 (dogfooded)` — written (receipt: v7.4.0, row `v7.3.0 · 2026-10-18 (dogfooded)` matched, Phase-1 drive CORE-641 skip ✅) — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Codex → `v7.4.0 · 2026-10-20 (dogfooded)` — written (receipt: v7.4.0, row matched, Phase-1 drive CORE-817 skip ✅) — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Cursor → `v7.4.0 · 2026-10-20 (dogfooded)` — written (receipt: v7.4.0, row `v7.2.0 · 2026-10-18 (dogfooded; skipped @ v7.3.0)` matched, Phase-1 drive CORE-641 skip ✅); skip suffix dropped — `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`
  - Receipts arrived pasted inline without their `Log:` prefixes; content otherwise matches the `docs/DOGFOOD.md` template on all three checks.
  - Step-5 re-verify loop: printed nothing.
- SOP currency: `SPEC/procedures/ft-task.md` — 3 tier-1 candidates (`f98d202a` CORE-816, `b0b9dca6` CORE-815.4, `56d7b902` CORE-814), all touching `claude/skills/ft-task/step-1.5-model-edge.md` (+ `preamble.md` tier list in 815.4). Dismissed: the SOP reads step-1.5 by reference (line 182) and restates no tier names, map cells, or effort examples. Tier-2 note: 5 `SPEC.md` commits since 2026-10-11. Verdict: clean.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code

- [x] Ran lint/type-check on changed code

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — the §7.1 doc-drift sweep runs through a fresh read-only reviewer context; findings recorded under Phase 4.

**Testing Notes:**

- `npm --prefix viz test` → 0 (616/616) · `npm --prefix viz run typecheck` → 0 · `npm --prefix viz run lint` → 0 · `npm --prefix viz run build` → 0
- `node --test tools/update-adopters.test.mjs` → 0 (102/102) · `node --check tools/update-adopters.test.mjs` → 0 · `node --check tools/update-adopters.mjs` → 0
- §6.1 CI on `f98d202a`: `CI completed success`.
- §6.2 `npm --prefix viz audit --audit-level=high` → 0 (0 vulnerabilities).
- Markdown mental-pass: single-token substitutions; no frontmatter or fences touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update
  - Run 1 (fresh read-only reviewer, audit overlay `docs ai-referenced`; gate `bash tools/drift-checks.sh pair_q final_newline context_budget` ok; no `.flaitron/audit-decisions/`): health 9/10, 0 Critical/High, 1 Low — Pass 3: dangling `[[CORE-815]]` at `docs/AGENT-NEUTRALITY.md:53` (also `claude/skills/ft-release/SKILL.md:46`, outside the set); the epic's ID is `CORE-EPIC-815`. Passes 1, 2, 4, 5 zero; no tier-meaning `[medium]` left in scope. Operator chose **Stop**; both links fixed to `[[CORE-EPIC-815]]`.
  - Run 2 (inline re-check): `git grep '\[\[CORE-815\]\]'` outside the archive → none; full `bash tools/drift-checks.sh` 17/17 ok. **Zero findings** — §7.1 continued.
  - Per-doc verdicts: `docs/AGENT-NEUTRALITY.md` updated (wikilink); `README.md` updated (task counter); `docs/AGENT-COMPAT.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md` updated (dogfood stamps); `SPEC.md`, `docs/MIGRATION.md`, `SECURITY.md` updated (version pins); every other entry no change.
  - Standing checks + mirror pairs: wiring-consumer (rc=1 ×2), installed-surface (4 diffs empty), local self-wiring (no output), Pair A (10 templates named), Pair K1/K2 clean, `'pair_*' skill_name_invariant` 11/11 ok, shipped-skill parity + context budget ok. README counter 1209 → 1217, as-of 2026-10-18 → 2026-10-20 (counted before this note's archive). `docs/CONTEXT-BUDGET.md` ledger refreshed at v7.4.0 (cold-start sum 112,018 → 112,172; `SPEC.md` 43,301 → 43,433; `preamble.md` 7,512 → 7,534; `model.md` 17,614 → 20,728; `plan-parser.md` 9,668 → 10,021; skill bodies +2–61; `ft-release` dir 109,315; `ft-task` dir 91,704; `templates/PLAN.md` 3,071). Advisories: global wiring clean (0 dangling, 1 casing, 0 over-install); completed rotation 41 rows before this flip (bound 60); viz majors chokidar 5.0.0→6.0.0, typescript 5.9.3→7.0.2 (CORE-641).

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — in the 📦 gate. `touches:` reconciliation: `git diff --name-only` = the declared tracked paths plus this archived note.

- [x] **Learnings** — an epic's wikilink is `[[<AREA>-EPIC-<N>]]`, never the bare number: only its children own `<AREA>-<N>.<sub>` tasknotes, so a bare `[[CORE-815]]` resolves to nothing. Pair Q checks `§` citations, not wikilinks, so this class reaches the release sweep.

**Final Summary:** Cut flaitron v7.4.0, a minor release tagging CORE-EPIC-815 (the `[medium]` model tier renamed `[moderate]` across contract, skills, docs, templates and viz, with `[medium]` kept as a permanent read-only alias and an optional open-row sed in `SPEC/model.md`), CORE-814 (`[frontier]` triggers gated on decision-still-open AND hard-to-unwind; printed cells take the vendor-default effort) and CORE-816 (quality-first tier × platform map: Claude Code light/moderate/heavy → Sonnet @ high / Opus @ medium / Opus @ high, Haiku off the map). The cut bumped the three version pins, refreshed all four dogfood rows to v7.4.0 (Grok, Codex and Cursor on receipts), fixed a dangling `[[CORE-815]]` wikilink after an operator Stop, refreshed the README counter (1217) and the context-budget ledger, and prepended the VERSION-HISTORY entry. SOP currency clean (3 candidates dismissed). Adopter impact: no required edits; existing `[medium]` rows keep working, and the optional sed migrates open rows.

**Archived:** 2026-10-20
