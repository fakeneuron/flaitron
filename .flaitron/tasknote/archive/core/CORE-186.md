---
title: ft-audit-context skill
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-186 | ft-audit-context skill

[← PLAN.md](../PLAN.md) · ✅ Completed

## 🎯 Goal

Add a bundled `/ft-audit-context` skill that audits adopter context surfaces (`CLAUDE.md`, `AGENTS.md`, `.claude/{commands,skills}`) for context bloat, redundancy with flowtron's `AGENTS.md` paste-block, `ft-*` namespace conflicts, and workflow drift — surfacing soft conversational recommendations plus an offer to file PLAN.md tickets at the end (no auto-write).

## ✅ Acceptance

- [ ] `claude/skills/ft-audit-context/SKILL.md` created — 4-pass structure (Bloat · Redundancy · Namespace · Drift), softer-conversational output (no `Finding #N` scaffold), end-of-run `AskUserQuestion` offering to file PLAN tickets
- [ ] `claude/commands/ft-audit-context.md` stub created
- [ ] `claude/skills/ft-flowtron/SKILL.md` roster table gains a `/ft-audit-context` row
- [ ] `docs/PLATFORMS.md` skill counts bumped (17→18) in the "Today's surface" table and the "Worked example: Claude Code" section; audit-family enumeration stays at six (forked-family is unchanged)
- [ ] `docs/MIGRATION.md` §1.0 global-install table gains a `/ft-audit-context` row (alongside `/ft-new-project`, `/ft-flowtron`, `/ft-stats`, `/ft-quality`)
- [ ] `claude/skills/ft-new-project/SKILL.md` Step 8 hand-off mentions `/ft-audit-context` as a recommended follow-up
- [ ] `docs/MIGRATION.md` §1.7 (Verify) + §3.8 (Post-migration cleanup) surface `/ft-audit-context` as suggested follow-up (§2.6 drift: no such heading — §2 delegates to §3.5–§3.9; honored via §3.8)
- [ ] No `claude/AGENTS-snippet.md` changes (global-install, not per-project bundle)
- [ ] AI-referenced docs walked at Phase 4 closure (per `_project/tasknote/README.md` §"AI-referenced docs")

## 🧩 Subtasks

- [ ] Write `claude/skills/ft-audit-context/SKILL.md` — sections: Step 0 resolve scope (cwd preflight + flowtron-mode detection); Steps 1-4 the four passes (Bloat / Redundancy / Namespace / Drift) with severity heuristics + 5-finding caps; Step 5 summary + `AskUserQuestion` offering ticket-file; Hard rules (no source edits, no `Finding #N` scaffold, subroutine-safe, no trailing summary).
- [ ] Write `claude/commands/ft-audit-context.md` stub — short description, invocation summary, pointer to global-install in `docs/MIGRATION.md` §1.0.
- [ ] Update `claude/skills/ft-flowtron/SKILL.md` roster table — add `/ft-audit-context` row.
- [ ] Update `docs/PLATFORMS.md` — skill counts 17→18 in two spots (Today's surface table line 31 + Worked example bullet line 170-173); add `ft-audit-context.md` to global-install group enumeration alongside `ft-new-project.md` / `ft-release.md` / `ft-flowtron.md` / `ft-stats.md` / `ft-quality.md`; leave "the six `/ft-audit*` skills" forked-family enumeration unchanged (this skill is global-install, not forked).
- [ ] Update `docs/MIGRATION.md` §1.0 global-install table — add `/ft-audit-context` row.
- [ ] Update `claude/skills/ft-new-project/SKILL.md` Step 8 hand-off — append a "Recommended follow-up: `/ft-audit-context` to scan your new context surfaces" line.
- [ ] Update `docs/MIGRATION.md` §1.7 (Verify) — add a one-line "Recommended follow-up: `/ft-audit-context`" note after the verify steps. Update §3.8 (Post-migration cleanup) — add a smoke-section bullet suggesting `/ft-audit-context` to catch context bloat carried over from legacy.
- [ ] Phase 3: lint/type-check (markdown-only — visual scan of new SKILL.md + command stub; verify no viz/parser breakage since no PLAN.md structural change).
- [ ] Phase 4: AI-referenced-docs sweep + PLAN.md flip + archive.

## 🔗 Related

- [[CORE-101]] — original audit-family bundle (5-pass scaffold, writes-tickets shape); `/ft-audit-context` deliberately diverges with softer prose + opt-in filing
- [[CORE-104]] — `ft-` namespace reservation (pass c references this)
- [[CORE-091]] — single-source-of-truth posture for `AGENTS-snippet.md` (pass b references the paste-block)
- [[CORE-149]] — recent `/ft-new-project` AGENTS.md seeding; Step 8 hand-off touched here
- [[CORE-154.1]] — agent-neutrality constitution; PLATFORMS.md skill-count edits cross this surface
- [[CORE-127]] — `ft-flowtron` key-docs surface; roster row added here

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Fresh-filed 2026-05-24 with a clear gap (adopter context bloat against Claude Code's 40k threshold; `ft-*` namespace pollution risk; redundancy between project-local `CLAUDE.md` and flowtron's `AGENTS-snippet.md`). Output-mode (soft + offer-to-file) is distinct from existing `/ft-audit*` family's auto-write behavior — new skill, not a duplicate.

- [x] Read relevant source files (SPEC.md · ft-audit + ft-audit-docs SKILL/command · ft-new-project SKILL · MIGRATION.md · AGENTS-snippet.md · ft-flowtron SKILL · PLATFORMS.md · skills/commands dir listings)
- [x] **Archive skim** — 207 archived tasknotes under `_project/tasknote/archive/core/`. Load-bearing priors: [[CORE-101]] (audit-family bundle origin — 5-pass / Finding# / writes-tickets shape; the new skill deliberately diverges to soft prose + opt-in filing), [[CORE-104]] / [[CORE-106]] (`ft-` namespace reservation — pass c's contract), [[CORE-91]] (single-source-of-truth posture for AGENTS-snippet.md — pass b's reference), [[CORE-149]] (recent `/ft-new-project` AGENTS.md seeding — Step 8 hand-off surface), [[CORE-EPIC-154]] (agent-neutrality / PLATFORMS.md two-layer model — skill-count edits cross this).
- [x] **Drift check:**
  - Skill counts `(17→18)` in PLAN.md description: ✅ confirmed — current bundle is 17 commands / 17 skills (just listed).
  - `docs/MIGRATION.md §1.0 global-install table`: ✅ exists (lines 14-44).
  - `docs/MIGRATION.md §1.7` (Verify): ✅ exists (lines 133-137).
  - `docs/MIGRATION.md §2.6`: ❌ **drift** — §2 only has §2.1 (`Convert plan.json…`) and §2.2-2.6 (which delegates to §3.5-§3.9). No standalone §2.6 heading. Intent maps to §3.8 (Post-migration cleanup) via the delegation chain — honor by editing §3.8 only.
  - `docs/MIGRATION.md §3.8` (Post-migration cleanup): ✅ exists (lines 273-286).
  - `claude/AGENTS-snippet.md if symlinked`: hedge resolved via Q1 — global-install means snippet is **not touched**.
- [x] Asked clarifying questions via AskUserQuestion (Install pattern · Output style · Pass count) — all three landed on the recommended defaults; design confirmed, not reshaped.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Three structural decisions:

1. **Install pattern: Global** (per-machine `~/.claude/` symlink), not per-project bundle / not forked. Aligns with `/ft-new-project`, `/ft-flowtron`, `/ft-stats`, `/ft-quality` in MIGRATION.md §1.0 table. Skill is meta-level (audits the AI-coding context surface itself), so it belongs in the same tier — not in the tasknote-workflow bundle (`/ft-task` et al.) and not in the forked audit family (`/ft-audit*` at §1.2.1).

2. **Output shape: softer conversational.** Findings grouped under four `## (a) ... ## (d) ...` pass headings, prose with severity tags inline (no `Finding #N – Severity – Pass # / Category` scaffold). End with explicit `AskUserQuestion` offering ticket-filing (none / pick subset / all / show again). This is the deliberate distinction from `/ft-audit*` family.

3. **Pass count: 4** matching the explicit a/b/c/d checks from the PLAN description — Bloat / Redundancy / Namespace / Drift. 5-finding cap per pass (matching audit-family convention).

**Naming reconciliation.** Skill carries the `ft-audit-` prefix but is global-install (not in the §1.2.1 forked audit family). In PLATFORMS.md's "Today's surface" table, list it alongside the global-install group (`ft-new-project` / `ft-release` / `ft-flowtron` / `ft-stats` / `ft-quality`), not inside "the six `/ft-audit*` skills" enumeration. The forked-family count stays at six.

**Exit gate judgment.** Discovery surfaced no significant deviation — all three clarifying questions confirmed defaults; no file additions/removals, no approach pivot, no root-cause reframing. The §2.6 drift is a description-level inaccuracy (the user knew the intent), not a scope reshape. **→ skip 🛠️** per SPEC §"📝 Phase 1: Discovery" exit gate, `default-skip` flavor.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — read `claude/skills/ft-audit/SKILL.md` and `claude/skills/ft-audit-docs/SKILL.md` to extend the audit-family SKILL.md shape (§0 scope / §1-N passes / §"Hard rules" closer). Deliberately diverged on output mode per Q2 (softer prose, no `Finding #N` scaffold, opt-in filing) and pass count per Q3 (4 not 5). Skipped the audit-family's §0 Forker checklist since this skill is global-install — no per-project fork to walk.
- [x] Implemented the minimal solution — 7 surfaces touched (1 new skill, 1 new command, 5 doc updates).
- [x] Updated/added tests for non-trivial behavior — N/A (markdown-only changes; no executable logic).

**Implementation Notes:**

- `claude/skills/ft-audit-context/SKILL.md` (new, ~6KB) — §0 scope with adopter / flowtron-self / no-flowtron mode detection; §§1-4 the four passes with explicit severity heuristics and 5-finding caps; §5 summary + `AskUserQuestion` with 4 options (file all / pick subset / file none / show again); §6 hard rules (no source edits, no `Finding #N` scaffold, subroutine-safe, no trailing summary).
- `claude/commands/ft-audit-context.md` (new) — short invocation stub per audit-family convention.
- `claude/skills/ft-flowtron/SKILL.md` — added row between `/ft-audit-performance` and `/ft-stats`, after the audit-family cluster.
- `docs/PLATFORMS.md` — two edits: (1) Today's surface table line 31 — added `/ft-audit-context` to the global-install enumeration (`/ft-new-project` / `/ft-release` / `/ft-flowtron` / `/ft-stats` / `/ft-quality` / `/ft-audit-context`); (2) Worked example bullets — bumped `17 .md` → `18 .md` and `17 SKILL.md` → `18 SKILL.md`, added `ft-audit-context.md` to the global-install group in the commands enumeration. Left "the six `/ft-audit*` skills" forked-family count unchanged — this skill is global-install, not forked.
- `docs/MIGRATION.md` — three edits: §1.0 table gains a row; §1.7 Verify section gains a "Recommended follow-up" paragraph; §3.8 Post-migration cleanup gains a "Context-surface audit" bullet between the slash-menu smoke and final-pin checks.
- `claude/skills/ft-new-project/SKILL.md` Step 8 — added a "Recommended follow-up" bullet at the end of the hand-off list.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A; no code surfaces touched.
- [x] Ran lint/type-check on changed code — visual scan of new SKILL.md frontmatter + command-stub frontmatter (both parse cleanly via `head -5`); filesystem counts match PLATFORMS.md's 18/18 claim post-write.
- [x] (frontend) Asked the user for visual confirmation — N/A; no frontend changes.

**Testing Notes:**

`ls claude/commands/ | wc -l` returned `18`; `ls claude/skills/ | wc -l` returned `18`. `claude/skills/ft-audit-context/SKILL.md` and `claude/commands/ft-audit-context.md` both have valid YAML frontmatter (closing `---` confirmed). No viz/parser surface touched (no PLAN.md task-line grammar change beyond Phase 4's routine `[x]` flip + stub-form rewrite).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep:**
  - `README.md` — no change (no skill enumeration).
  - `SPEC.md` — **updated** — added `/ft-audit-context` to §"Skill namespace" bundled-skill enumeration (line ~87); deliberately NOT added to the `/ft-audit-{docs,backend,frontend,performance,security}` brace-glob, which is the forked-family-only enumeration per §1.2.1.
  - `docs/MIGRATION.md` — **updated** — §1.0 global-install table row added; §1.7 "Recommended follow-up" paragraph; §3.8 "Context-surface audit" bullet.
  - `claude/AGENTS-snippet.md` — no change (global-install pattern means snippet stays out of the per-project bundle).
  - `docs/CONVENTIONS.md` — no change (no skill enumeration; only generic "bundled skills" prose).
  - `CONTRIBUTING.md` — no change (no skill enumeration).
  - `SECURITY.md` — no change (line ~19 enumeration ends with "and others" — non-exhaustive by design).
  - `docs/AGENT-NEUTRALITY.md` — no change (no skill enumeration).
  - `docs/PLATFORMS.md` — **updated** — Today's surface table (line 31) adds `/ft-audit-context` to global-install group; Worked example bullets bumped 17→18 for both `commands/` and `skills/`, added `ft-audit-context.md` to global-install enumeration.
- [x] Closed — PLAN.md line flipped to stub form and tasknote archived to `_project/tasknote/archive/core/CORE-186.md`.
- [x] Recap drafted (bundled into the 📦 ready-to-commit motion below).

**Final Summary:**

Added `/ft-audit-context` as a new bundled flowtron skill — a soft, conversational audit of adopter context surfaces (`CLAUDE.md`, `AGENTS.md`, `.claude/{commands,skills}`) across four passes (Bloat against Claude Code's ~40k threshold · Redundancy with flowtron's `AGENTS.md` paste-block · `ft-*` namespace conflicts · Workflow drift from flowtron's lean-context principle). Output is prose with severity tags inline (no `Finding #N` scaffold); ticket-filing into PLAN.md is opt-in via `AskUserQuestion` at the end. Installed globally per `docs/MIGRATION.md` §1.0 (alongside `/ft-new-project`, `/ft-flowtron`, `/ft-stats`, `/ft-quality`) — works in any cwd, no per-project wiring. Hand-offs wired into `/ft-new-project` Step 8, `MIGRATION.md` §1.7 (Verify), and §3.8 (Post-migration cleanup). Bundle count bumped 17→18 across `ft-flowtron` roster, `SPEC.md` namespace enumeration, and `PLATFORMS.md`'s two skill-count surfaces.

**Archived:** 2026-05-24
