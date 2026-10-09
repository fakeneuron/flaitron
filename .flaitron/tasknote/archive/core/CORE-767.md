---
title: release v6.1.0
status: completed
tags: []
created: 2026-10-08
due:
related-tasks: [CORE-EPIC-741, CORE-EPIC-742, CORE-EPIC-724, CORE-721, CORE-717, CORE-712]
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
  - claude/skills/ft-update/SKILL.md
  - docs/AGENT-NEUTRALITY.md
  - docs/CONVENTIONS.md
  - docs/EXTERNAL-AGENTS.md
  - docs/GLOSSARY.md
  - docs/VISION.md
  - docs/WORKTREES.md
  - .flaitron/tasknote/README.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-767.md
---

# CORE-767 | release v6.1.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-741]] [[CORE-EPIC-742]] [[CORE-EPIC-724]] [[CORE-721]] [[CORE-717]] [[CORE-712]]

## 🎯 Goal

Cut v6.1.0 minor release tagging CORE-EPIC-741 (effort-tiers) + CORE-EPIC-742 (sidequest guards) + CORE-EPIC-724 (context-diet) + CORE-721 (audit-overlay-home) + CORE-717 (plan-filing-commit) since v6.0.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v6.0.0` → `v6.1.0`
- [x] docs/MIGRATION.md example pin bumped `v6.0.0` → `v6.1.0`
- [x] SECURITY.md release-tag example pin bumped `v6.0.0` → `v6.1.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v6.1.0`, or recorded `skipped @ v6.1.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-767 — flaitron v6.1.0 (...)` commit lands
- [x] Annotated `v6.1.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v6.1.0` (minor: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-767.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v6.0.0 → v6.1.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-EPIC-741]] — effort tiers: `[frontier]💎` rung, tier × platform effort map, routing sweep, viz glyph
- [[CORE-EPIC-742]] — sidequest orphan/promoted drift guards (flaitron-self)
- [[CORE-EPIC-724]] — context diet: cold-start + lazy-module trims, adopter-surface trim, two SPEC modules retired
- [[CORE-721]] — tracked home for flaitron-self's `/audit` overlay
- [[CORE-717]] — `/ft-audit-repo` and `/ft-epic-discovery` commit their own PLAN filings
- [[CORE-712]] — prior release (v6.0.0); precedent for the 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — filed via Step 1.1 this session.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v6.0.0 matches `SPEC.md:3` and `git describe`. Prefix classification gives minor (plain `feat:` commits, no `feat!:`, no `BREAKING CHANGE:` trailer); the PLAN target v6.1.0 agrees.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:476` (`describe --tags` pin), `SECURITY.md:125` (release-tag pin).

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-712 (v6.0.0) is the direct precedent: same 6-line subtasks and `touches:` set. Its learnings (run the context-budget block under bash; CI on the parent before tagging) carry forward.

- [x] **Drift check** — pins at `SPEC.md:3`, `docs/MIGRATION.md:476`, `SECURITY.md:125` read v6.0.0. `SPEC/gate-discipline.md` and `SPEC/purpose-blurb.md` were deleted (CORE-724.3); no live citers outside archived tasknotes and history rows.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — version confirmed at the Step 1.1 draft; minor bump, no ambiguous adopter impact.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- Adopter migration impact (none required; all additive or optional):
  - **CORE-EPIC-741 — additive.** New chooser-assignable `[frontier]💎` tier between `[heavy]` and `[xheavy]`; next-move cues now print `model @ effort`. Existing `[model]` tokens keep working.
  - **CORE-735.4 — optional, automatic.** Sparse-checkout of `.flaitron/core` without flaitron's own `.flaitron/` (~18.5 → ~2.9 MB working tree, git ≥ 2.35). `/ft-update` re-applies it at Step 1 on every run; the `Read(...)` deny rule stays as fallback.
  - **CORE-724.5 — optional.** AGENTS.md paste-block condensed (6.4k → 3.7k chars); re-pasting is optional. v5.x/v4.x rename recipes moved from MIGRATION.md to new `docs/UPGRADING.md`.
  - **CORE-724.3 — repoint if cited.** `SPEC/gate-discipline.md` → `docs/GATE-DISCIPLINE.md`; `SPEC/purpose-blurb.md` → `SPEC/cue-vocabulary.md` §"🎯 Purpose blurb". Only matters to adopter files citing those paths.
  - **CORE-717 — behavior change, no action.** `/ft-audit-repo` and `/ft-epic-discovery` now commit their own PLAN.md filing.
  - **CORE-EPIC-742, CORE-721, CORE-734/739/740 drift work — flaitron-self only.**
- New file inside an existing skill dir (`claude/skills/ft-task/preamble.md`) rides the directory symlink; no new skills, so no re-wiring.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: release recipe; CORE-712 precedent followed.

- [x] **Minimal refactor gate** — N/A: no code.

- [x] Implemented the minimal solution — 3 version edits, dogfood stamps (plus the §7.1 standing-check refreshes and the VERSION-HISTORY entry at closure).

- [x] Updated/added tests for non-trivial behavior — N/A: markdown-only cut.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:476`, `SECURITY.md:125` v6.0.0 → v6.1.0. Remaining `v6.0.0` grep hits are history (rename references, UPGRADING recipe, CONTEXT-BUDGET measurement stamps) or the Cursor skip stamp.
- Dogfood ledger (stamp files clean at walk start and before write):
  - `Claude → v6.1.0 · 2026-10-08 (dogfooded) — written` (this session's own drive)
  - `Grok → v6.1.0 · 2026-10-08 (dogfooded) — written` (verbatim receipt: version v6.1.0, My row `v5.35.0 · 2026-10-02 (dogfooded; skipped @ v6.0.0)` matched, Phase-1 drive CORE-767 / skip ✅)
  - `Codex → v6.1.0 · 2026-10-08 (dogfooded) — written` (verbatim receipt: version v6.1.0, My row `v6.0.0 · 2026-10-04 (dogfooded)` matched, Phase-1 drive CORE-767 / skip ✅)
  - `Cursor → v5.33.0 · 2026-09-23 (dogfooded; skipped @ v6.1.0) — written` (no receipt)
  - File-state re-verify: no `MISSING`.
- SOP currency: clean — 7 `ft-task` tier-1 candidates dismissed with operator concurrence (CORE-746 tier list, SOP defers to `SPEC/model.md`; CORE-729/730 skill/pin guard, Claude wiring only; CORE-733 micro-task resume, out of SOP scope; CORE-725 aligned the skill to the SOP's existing order; CORE-724.5 template box titles kept; CORE-724.2 Claude pointer repoint, SOP pointer `SPEC/gates.md:145` still resolves). Tier-2 note: 8 `SPEC.md` commits since stamp.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — standing gate, below.

- [x] Ran lint/type-check on changed code — standing gate, below.

- [x] **Verification receipt** — Testing Notes below; dogfood ledger re-verified from file state.

- [x] **External review** — `/ft-audit docs ai-referenced` across three read-only reviewers (Phase 4).

- [x] (frontend) N/A — no UI change.

**Testing Notes:**

- Standing gate (2026-10-08): viz test (591/591) / typecheck / lint / build, fleet suite, both `node --check` — all exit 0.
- §6.1: HEAD `6cb01efe` was 102 commits unpushed (no CI run); operator chose push-main-now → CI run 37897565747 `completed success` (drift, validate 24, validate 26).
- §6.2: `npm audit --audit-level=high` — 0 vulnerabilities.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — run 1 (2026-10-08/09, three read-only reviewers over the 18-entry set; gate `pair_q final_newline context_budget` ok): 1 High fixed inline (`docs/WORKTREES.md` Start fence lacked `git -C "$WT_DIR" submodule update --init`, so an adopter worktree's `.flaitron/core` was empty — verified in a scratch repo, 0 → 1 files). 20 Medium/Low held; operator chose **Stop** at the §7.1 ask — fix in this tree, then re-run §7.1:
  - Medium: `claude/AGENTS-snippet.md:111` no agent-home install warning (siblings have one); `claude/CAPABILITIES.md:58` `/clear` ledger claim unbacked; `docs/CONVENTIONS.md:58` drift-job account omits `skill_frontmatter_yaml`; `docs/AGENT-NEUTRALITY.md:40` `docs/GATE-DISCIPLINE.md` flag sites unregistered; same row site counts stale (`SPEC.md` 4→5, `gate-postures.md` 9→10); `docs/VISION.md:22` Zero-scripts silent on `tools/drift-checks.sh`.
  - Low: `README.md:124,311` CONTRIBUTING blurb lacks maintainer wiring; `docs/MIGRATION.md:186` example `v5.2.0` → `vX.Y.Z`; `docs/MIGRATION.md:200` "v5.x" → v5.15.0; `docs/PLATFORMS.md:298` fragment list incomplete; `docs/PLATFORMS.md:486` stale pre-adoption sentence; `docs/AGENT-COMPAT.md:141-143` Grok compat-only wording; `claude/CAPABILITIES.md:39` `/model` cell omits `[frontier]`; `codex/AGENTS-snippet.md:81` missing "which `/ft-update` adds"; `docs/AGENT-NEUTRALITY.md:39` plan-filing row omits `/ft-seed`; `docs/AGENT-NEUTRALITY.md:59` template example names; `docs/EXTERNAL-AGENTS.md:49` Refused list omits skill/pin stop; `docs/CONVENTIONS.md:95` Pair K overstated; `docs/VISION.md:30` sibling-section citation; `docs/VISION.md:42` Claude-only permission-hooks wording.
  - Run 2 (one fresh read-only reviewer over the fix diffs; full `bash tools/drift-checks.sh` ok): all 21 cleared; 4 new held — Medium `docs/WORKTREES.md` End `git worktree remove` fails on a worktree with an initialized submodule (regression from the run-1 High fix; reproduced on git 2.55); Low `claude/CAPABILITIES.md:58` `/clear` reasoning missed two passing mentions; Low `docs/AGENT-NEUTRALITY.md:40` GATE-DISCIPLINE attribution; Low `claude/skills/ft-update/SKILL.md:109` `v5.2.0` example. Operator chose **Stop** again; all 4 fixed in this tree (End line verified in a scratch repo: dirty worktree kept, clean one removed with `--force`).
  - Run 3 (fresh reviewer over the 4 fixes): all 4 cleared; 1 new Low — the worktree procedure is no longer "four commands" each way (5 live sites: `docs/WORKTREES.md:5,35`, `README.md:107`, `.flaitron/tasknote/README.md:73`, `docs/GLOSSARY.md:155`). Operator chose **Stop**; count dropped at all 5 sites.
  - Run 4 (inline re-check of that 5-line diff): no live count claim left (`docs/WORKTREES.md:15` is the retired skills' history; `docs/CONTEXT-BUDGET.md:122` is unrelated); `pair_q final_newline context_budget` ok. **Zero findings** — §7.1 continues.
  - Standing checks + mirror pairs: wiring-consumer, shipped parity, installed-surface (8-slug SSOT), local self-wiring, context budget, Pairs A/B/C/H/J/K1/K2/M/N/O/P/Q/R + wrapper-name invariant — all clean; full `bash tools/drift-checks.sh` exit 0. README counter 1064 → 1135 (2026-04-28 → 2026-10-08, as of 2026-10-09; counted before this note's archive, per the v6.0.0 convention). `docs/CONTEXT-BUDGET.md` ledger refreshed at v6.1.0 (cold-start sum 121,646 → 113,578 with `preamble.md` first counted; retired `gate-discipline.md` / `purpose-blurb.md` rows dropped). Advisories: global wiring clean (operator-approved scan: 0 dangling, 1 casing, 0 over-install); completed rotation 201 rows (>60); viz major typescript 5.9.3→7.0.2 (CORE-641).

- [x] Closed — every `## ✅ Acceptance` criterion ticked or explicitly annotated, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and placed, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — in the 📦 gate.

- [x] **Learnings** — a fix landed under the §7.1 sweep is itself unswept until re-run: the run-1 High fix (worktree submodule init) minted a Medium regression in the End half, and its fix minted a count drift. Re-running §7.1 scoped to the fix diff is what caught both; worth keeping as the default re-run shape.

**Final Summary:** Cut flaitron v6.1.0, a minor release tagging CORE-EPIC-741 (the `[frontier]💎` tier and `model @ effort` routing), CORE-EPIC-724 (the context diet: cold-start path 121,646 → 113,578 chars, paste-block 6.4k → 3.7k, two lazy SPEC modules retired), CORE-735.4 (adopter sparse-checkout, ~18.5 → ~2.9 MB), CORE-717 (self-committing filings), and the skill/pin guard. The cut bumped the three version pins, refreshed Claude, Codex and Grok to v6.1.0 (Codex and Grok on verbatim receipts) and recorded Cursor skipped, refreshed the README counter and the context-budget ledger, and prepended the VERSION-HISTORY entry. The §7.1 sweep took four runs under two operator Stops: 1 High (adopter worktrees left `.flaitron/core` empty) plus 25 Medium/Low doc fixes landed in this cut. Adopter impact: no required edits; optional re-paste of the condensed AGENTS.md block and repointing of any citation of the two retired modules.

**Archived:** 2026-10-09
