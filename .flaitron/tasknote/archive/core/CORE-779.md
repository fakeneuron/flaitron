---
title: release v7.0.0
status: completed
tags: []
created: 2026-10-11
due:
related-tasks: [CORE-EPIC-769, CORE-EPIC-768, CORE-EPIC-778, CORE-EPIC-770, CORE-767]
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
  - claude/skills/ft-adopt/SKILL.md
  - tools/update-adopters.mjs
  - CONTRIBUTING.md
  - docs/AGENT-NEUTRALITY.md
  - docs/CONVENTIONS.md
  - docs/EXTERNAL-AGENTS.md
  - .flaitron/PLAN.md
  - .flaitron/tasknote/archive/core/CORE-779.md
---

# CORE-779 | release v7.0.0

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-769]] [[CORE-EPIC-768]] [[CORE-EPIC-778]] [[CORE-EPIC-770]] [[CORE-767]]

## 🎯 Goal

Cut v7.0.0 major release tagging CORE-EPIC-769 (skill renames + command-stub retirement) + CORE-EPIC-768 (automatic Completed rotation + epic parent auto-flip) + CORE-EPIC-778 (`/ft-micro-task` folded into `/ft-task --micro`) + CORE-EPIC-770 (global-layer alignment) since v6.1.0.

## ✅ Acceptance

- [x] SPEC.md `**Version:** v6.1.0` → `v7.0.0`
- [x] docs/MIGRATION.md example pin bumped `v6.1.0` → `v7.0.0`
- [x] SECURITY.md release-tag example pin bumped `v6.1.0` → `v7.0.0`
- [x] Dogfood gate resolved — every dogfooded row (Claude / Grok / Codex / Cursor) refreshed from a real verification run at `v7.0.0`, or recorded `skipped @ v7.0.0` (per `docs/AGENT-COMPAT.md` §"Reading the cells")
- [x] SOP-currency check run — `SPEC/procedures/*.md` reported clean, or drift candidates adjudicated and a follow-up filed (stamps left un-bumped either way)
- [x] Phase 4 doc-drift sweep run across all `.flaitron/tasknote/README.md` §"AI-referenced docs" entries
- [x] Single `feat: CORE-779 — flaitron v7.0.0 (...)` commit lands
- [x] Annotated `v7.0.0` tag created with adopter-facing release notes
- [x] `docs/VERSION-HISTORY.md` prepended with a curated entry for `v7.0.0` (major: headline + 2–4 main bullets + optional secondary)
- [x] Tag pushed to origin
- [x] PLAN.md line flipped to stub form under `## Completed`
- [x] Tasknote archived to `.flaitron/tasknote/archive/core/CORE-779.md`

## 🧩 Subtasks

- [x] Apply the 3 version edits (SPEC.md, docs/MIGRATION.md, SECURITY.md) v6.1.0 → v7.0.0
- [x] Walk the dogfood-gate + SOP-currency fragment (`claude/skills/ft-release/step-5-dogfood-sop.md`)
- [x] Run the standing viz + fleet-updater validation gate, plus CI status check and dependency audit
- [x] Run the `/ft-audit docs ai-referenced` subroutine and the §7.1 standing-checks + mirror-pairs fragments
- [x] Draft and lock the annotated tag message + VERSION-HISTORY entry (§7.2)
- [x] Commit, tag, and push on 🟢 GO

## 🔗 Related

- [[CORE-EPIC-769]] — skill-surface rename wave: four hard-cut renames, `claude/commands/` retired, fleet-updater migrate mode
- [[CORE-EPIC-768]] — `## Completed` rotation made automatic; epic parent auto-flip on last child close
- [[CORE-EPIC-778]] — `/ft-micro-task` retired into `/ft-task --micro`
- [[CORE-EPIC-770]] — global layer 1/2 aligned with flaitron v7 (out-of-repo edits + project-20 handoff rows)
- [[CORE-767]] — prior release (v6.1.0); precedent for the 6-line subtask shape

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md — filed via Step 1.1 this session.

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** v6.1.0 matches `SPEC.md:3` and `git describe`. Six `feat!:` commits (CORE-769.2–.7) with `BREAKING CHANGE:` trailers → major; the PLAN target v7.0.0 agrees.

- [x] Read relevant source files — `SPEC.md:3`, `docs/MIGRATION.md:474` (`describe --tags` pin), `SECURITY.md:125` (release-tag pin).

- [x] **Best Practices Review** — N/A. Release cut; no code or module-boundary work.

- [x] **Archive skim** — CORE-767 (v6.1.0) is the direct precedent: same 6-line subtasks. Its learning (re-run §7.1 scoped to the fix diff after an inline fix) carries forward.

- [x] **Drift check** — pins at `SPEC.md:3`, `docs/MIGRATION.md:474`, `SECURITY.md:125` read v6.1.0. MIGRATION already carries the six v7.0.0 retired-skill rows (`:519-524`) and §"Upgrading to v7.0.0 (skill renames)" (`:538`); `tools/update-adopters.mjs:163` `SKILL_RENAME.tag` is `v7.0.0`, so the release tag name must be exactly `v7.0.0` for the migrate mode to fire.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — version confirmed at the Step 1.1 draft; adopter impact is documented by the BREAKING CHANGE trailers and the MIGRATION v7.0.0 recipe.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared

**Discovery Notes:**

- Adopter migration impact:
  - **CORE-769.2 — BREAKING.** `claude/commands/` no longer ships. Delete dangling `.claude/commands/ft-*.md` links (`/ft-update` Step 4.6 reports them) and any agent-home `~/.claude/commands/ft-*.md`; a copied audit stub `.claude/commands/<fork>.md` is a real file — delete by hand; an audit fork's `SKILL.md` `name:` is now its slash name.
  - **CORE-769.3/.4/.6 — BREAKING renames, no alias.** `ft-file-followup` → `ft-file-task`, `ft-epic-discovery` → `ft-open-epic`, `ft-seed` → `ft-seed-unattended`. Re-wire per the snippet, delete the dangling old links, rename calls in own skills/docs.
  - **CORE-769.5 — BREAKING, agent home.** `ft-new-project` → `ft-adopt` (global-only). Re-link in `~/.claude/skills/` (and Codex/Cursor/Grok user dirs); `/ft-update` Step 4.6 does not scan there.
  - **CORE-778.3 — BREAKING, no alias.** `/ft-micro-task` → `/ft-task <ID> --micro`. Delete the dangling `ft-micro-task` link; finish in-progress micro notes before bumping (a parked old-shape note upgrades on `/ft-task <ID>`).
  - **CORE-769.7 — tooling.** `tools/update-adopters.mjs --apply` re-wires tracked renamed links and prunes `.claude/commands/` links in the bump commit; prose sweeps stay per-project. MIGRATION §"Upgrading to v7.0.0 (skill renames)" is the manual recipe.
  - **CORE-EPIC-768 — behavior change, no action.** `## Completed` rotation runs automatically after closures (>60 → ≤40, separate `chore:` commit); the closure that finishes an epic's last child flips the parent itself (`/ft-close-epic`'s Yes/No prompt retired).
  - **CORE-776.6 — behavior, no action.** `SPEC/plan-filing.md` §"ID allocation" is the single home for new-ID allocation.
  - **CORE-EPIC-775, CORE-777 — fleet-updater hardening, operator-side.** **FE-EPIC-127, FE-128 — viz-only.** **CORE-EPIC-770 — out-of-repo + project-20 handoff.** CORE-683/727/773/774 — single-model restore notes.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — N/A: release recipe; CORE-767 precedent followed.

- [x] **Minimal refactor gate** — N/A: no code.

- [x] Implemented the minimal solution — 3 version edits + dogfood stamps (plus the §7.1 standing-check refreshes and the VERSION-HISTORY entry at closure).

- [x] Updated/added tests for non-trivial behavior — N/A: markdown-only cut.

**Implementation Notes:**

- Version edits: `SPEC.md:3`, `docs/MIGRATION.md:474`, `SECURITY.md:125` v6.1.0 → v7.0.0. Remaining `v6.1.0` grep hits are history (CONTEXT-BUDGET measurement stamps, VERSION-HISTORY heading).
- Dogfood ledger (stamp files clean at walk start):
  - `Claude → v7.0.0 · 2026-10-11 (dogfooded) — written` (this session's own drive)
  - `Grok → v7.0.0 · 2026-10-11 (dogfooded) — written` (verbatim receipt: version v7.0.0, My row `v6.1.0 · 2026-10-08 (dogfooded)` matched, Phase-1 drive CORE-641 / skip ✅)
  - `Codex → v7.0.0 · 2026-10-11 (dogfooded) — written` (verbatim receipt: version v7.0.0, My row `v6.1.0 · 2026-10-08 (dogfooded)` matched, Phase-1 drive CORE-779 / skip ✅)
  - `Cursor → v5.33.0 · 2026-09-23 (dogfooded; skipped @ v7.0.0) — written` (no receipt)
  - File-state re-verify: no `MISSING`.
- SOP currency: `ft-task` — 10 tier-1 candidates (7 dismissed at v6.1.0; 3 new: CORE-778.4, CORE-776.5, CORE-769.2, which looked mirrored at SOP `:52`/`:415`/`:423`) + 12 `SPEC.md` commits tier-2. Operator chose a real re-check → filed [[CORE-780]] (`0382b25d`, partial-staged so the CORE-779 row stays for the release commit). Stamp left un-bumped.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — standing gate, below.

- [x] Ran lint/type-check on changed code — standing gate, below.

- [x] **Verification receipt** — Testing Notes below; dogfood ledger re-verified from file state.

- [x] **External review** — `/ft-audit docs ai-referenced` across three read-only reviewers (Phase 4).

- [x] (frontend) N/A — no UI change.

**Testing Notes:**

- Standing gate (2026-10-11): viz test (614/614) / typecheck / lint / build, fleet suite (79/79), both `node --check` — all exit 0.
- §6.1: HEAD `0382b25d` was 37 commits unpushed (no CI run); operator chose push-main-now → CI run 38149344696 `completed success` (drift, validate 24, validate 26).
- §6.2: `npm audit --audit-level=high` — 0 vulnerabilities.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — run 1 (2026-10-11, three read-only reviewers over the 18-entry set; gate `pair_q final_newline context_budget` ok): 2 High fixed inline — `SECURITY.md` §"Fleet updater (`tools/`)" omitted the v7.0.0 skill-link re-wire `applyBump`/`applyMigrate` commit (3 sites); `docs/EXTERNAL-AGENTS.md` step 9 + "The three endings" row didn't allow the automatic `chore: rotate …` commit after a closure. 15 Medium/Low held; operator chose **Stop** — all fixed in this tree, full `bash tools/drift-checks.sh` ok:
  - Medium: `README.md` §Version omitted v7.0.0 as a break; `CONTRIBUTING.md` pre-v7 cleanup missed renamed-slug links (`.claude/skills`, `.agents/skills`); `claude/AGENTS-snippet.md` bump paragraph silent on Step 4.6 dangling links; `claude/CAPABILITIES.md` cross-check list lacked `--micro`; `docs/CONVENTIONS.md:66` called §6.1 flag-don't-block; `docs/AGENT-NEUTRALITY.md:39` cited a nonexistent rotation site and missed §"ID allocation"; `:61` quoted retired "slash commands".
  - Low: README counter 1135 → 1180 (2026-04-28 → 2026-10-11, as of 2026-10-11; counted before this note's archive); `docs/MIGRATION.md:58` ~1,000 → ~1,200 files; "commands" wording at `SECURITY.md:20` / `docs/MIGRATION.md:79`; `docs/PLATFORMS.md` argument-hint overclaim + scaffold `commands/` sketch; `docs/AGENT-NEUTRALITY.md` site count 1→2, `/loop` row §"Frontmatter keys", trigger list `--micro`.
  - Run 2 (one fresh read-only reviewer over the fix diff): all 17 cleared; 5 new held — Medium: the L9 fix split the ~1,000-files fact (4 snippets + `ft-adopt/SKILL.md` still said ~1,000); Low: `SECURITY.md` migrate-commit list lacked the v7 skill-link paths; `docs/AGENT-NEUTRALITY.md:41` fragment list lacked micro; codex/cursor/grok snippets lacked the Step 4.6 / v7 recipe pointer; `tools/update-adopters.mjs:104` header comment (comment-only). Operator chose **Stop**; all 5 fixed (fleet suite 79/79, `node --check` ok).
  - Run 3 (inline re-check of that diff): citation resolves (`docs/MIGRATION.md` §"Upgrading to v7.0.0 (skill renames)", `ft-update` §"Step 4.6"), no `~1,000 files` left outside archives, full `bash tools/drift-checks.sh` ok. **Zero findings** — §7.1 continues.
  - Standing checks + mirror pairs: wiring-consumer, shipped parity, installed-surface (4 diffs), local self-wiring, context budget, Pairs A/B/C/H/J/K1/K2/M/N/O/P/Q/R + skill-name invariant — all clean; full `bash tools/drift-checks.sh` exit 0. README counter refreshed in run 1 (1135 → 1180). `docs/CONTEXT-BUDGET.md` ledger refreshed at v7.0.0 (cold-start sum 111,136 → 111,474; `plan-filing.md` 18,525 → 24,875; `ft-micro-task` retirement noted). Advisories: global wiring 4 dangling (`ft-new-project` in `~/.claude/skills`, `~/.agents/skills`, `~/.claude/commands`; `~/.claude/commands/ft-audit-repo.md`), casing clean, 0 over-install — fix out of band; local `.agents/skills` has 4 dangling pre-rename links (gitignored, not scanned by the blocking half); completed rotation 66 rows (>60) — Step 8 rotates; viz major typescript 5.9.3→7.0.2 (CORE-641).

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form at the top of `## Completed`, then tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — in the 📦 gate.

- [x] **Learnings** — a fix that changes one restatement of a fact splits it from its siblings: run 1's MIGRATION file-count fix left five snippet/skill copies stale, and only run 2's fix-diff review caught it. When a sweep fix edits a number or claim, `git grep` the old value repo-wide before re-running. Separately, the §7.1 local self-wiring check scans `.claude/skills` only; this checkout's `.agents/skills` held 4 dangling pre-rename links nothing flagged (noted, not filed).

**Final Summary:** Cut flaitron v7.0.0, a major release tagging CORE-EPIC-769 (four hard-cut skill renames — `/ft-file-task`, `/ft-open-epic`, `/ft-adopt`, `/ft-seed-unattended` — plus the `claude/commands/` retirement and the fleet updater's v7 link re-wire), CORE-EPIC-778 (`/ft-micro-task` folded into `/ft-task --micro`), CORE-EPIC-768 (automatic `## Completed` rotation and epic parent auto-flip), and CORE-776.6 (single §"ID allocation" home). The cut bumped the three version pins, refreshed Claude, Codex and Grok to v7.0.0 (Codex and Grok on verbatim receipts) and recorded Cursor skipped, filed [[CORE-780]] for the SOP re-check, pushed main for a green CI base, refreshed the README counter and context-budget ledger, and prepended the VERSION-HISTORY entry. The §7.1 sweep took three runs under two operator Stops: 2 High (SECURITY.md understated the fleet updater's write footprint; EXTERNAL-AGENTS's caller contract missed the rotation commit) plus 20 Medium/Low doc fixes landed in this cut. Adopter impact: BREAKING — every existing adopter re-wires renamed skill links once (`docs/MIGRATION.md` §"Upgrading to v7.0.0 (skill renames)"; `tools/update-adopters.mjs --apply` automates the link swap), re-links `ft-adopt` in agent homes, re-pastes the AGENTS.md block, and renames old-slug calls in their own docs.

**Archived:** 2026-10-11
