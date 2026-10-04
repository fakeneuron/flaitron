---
title: audit-scaffold-misfire-in-adopter
status: completed
tags: []
created: 2026-05-24
due:
related-tasks: []
---

# CORE-184 | audit-next-move-flag

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a 🔍 emoji prefix convention to `/ft-task`'s post-closure suggest-next-move output (Step 6) so that whenever the AI references an `/ft-audit*` slash command as the next move, the line is visually flagged as audit-family — a cheap, no-restructure guard that pre-empts the silent `/ft-audit-docs` misfire vector in adopter context without touching the carefully-crafted audit SKILL.md scaffolds.

## ✅ Acceptance

- [ ] `claude/skills/ft-task/SKILL.md` Step 6 documents the 🔍 prefix rule: when the next-move candidate references an `/ft-audit*` slash command, prefix the candidate line AND the copy-paste line with 🔍.
- [ ] The rule includes a one-line rationale pointer ("audit-family is forked per project per MIGRATION.md §1.2.1 — in adopter context, the local fork is unprefixed").
- [ ] No changes to the audit SKILL.md files themselves (`.claude/skills/ft-audit*/` or `claude/skills/ft-audit-*/`).
- [ ] No changes to MIGRATION.md or other AI-referenced docs (doc-drift sweep at Phase 4 confirms no drift).

## 🧩 Subtasks

- [ ] Read `claude/skills/ft-task/SKILL.md` Step 6 + skim "Notes" tail for surface to extend.
- [ ] Insert the 🔍 next-move-flag convention into Step 6 (one bullet under the existing "Skill-specific" block, sibling to the copy-paste-line line).
- [ ] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs".
- [ ] Close (PLAN.md line → stub form, tasknote → archive/core/).

## 🔗 Related

- [[CORE-104]] — established the `ft-` namespace contract that produced the flowtron-self forked `.claude/skills/ft-audit*/`, which is the upstream cause of the misfire surface this task flags.
- [[CORE-166]] — sync'd audit scaffold `description:` frontmatter to confirm adopter forks drop the `ft-` prefix (`.claude/skills/audit-docs/`, etc.).

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Re-scope
  **Rationale:** Original framing (pick a structural fix among bail-in-adopter / untrack / doc callout) was confirmed valid — the misfire surface is real (2 skills wired into flowtron-self `.claude/`: `ft-audit-docs` + `ft-audit`; other 4 audit-family scaffolds only ship as source, not registered) — but the user redirected to a lighter AI-output convention: 🔍 emoji prefix on `/ft-task`'s suggest-next-move when the candidate is `/ft-audit*`. No SKILL.md modifications, no restructure. Goal + Acceptance + Subtasks rewritten accordingly; PLAN.md line updated.

- [x] Read relevant source files
- [x] **Archive skim** — relevant prior decisions:
  - **CORE-104** (skill namespace prefix, 2026-05-17) — intentionally renamed flowtron-self forks `audit-docs/` → `ft-audit-docs/` to align with the `ft-` namespace contract. Adopter forks remain unprefixed (`audit-docs/`) per MIGRATION.md §1.2.1. The submodule-side ship of flowtron-self's prefixed forks is the upstream mechanism behind the misfire surface this task flags.
  - **CORE-166** (audit-scaffold fork-path, 2026-05-23) — corrected `description:` frontmatter across 6 audit scaffolds to claim `.claude/skills/<name>/` (no `ft-` prefix), confirming the install asymmetry: source scaffold is `claude/skills/ft-audit*`, adopter fork lands at `.claude/skills/audit*` (unprefixed).
  - **CORE-123** (audit-docs SKILL fork CORE-121 sync, 2026-05-20) — confirms the flowtron-self fork is hand-maintained for flowtron's own AI-referenced docs set (was 6-file, now 9-file), and is unambiguously NOT meant for adopter consumption.

- [x] **Drift check** — task description claims "and the rest of the audit family" silently resolves to the submodule. Verified against current state: only `ft-audit-docs` and `ft-audit` are wired into flowtron-self's `.claude/skills/` (real SKILL.md files + real `.claude/commands/ft-audit*.md` stubs). The other four (`ft-audit-backend`, `ft-audit-frontend`, `ft-audit-performance`, `ft-audit-security`) exist ONLY as source scaffolds under `claude/skills/`, not registered into `.claude/`. So the silent-misfire surface is narrower than the description implied — 2 skills, not 6. Documented here; doesn't change the re-scoped fix surface (we're not touching the audit scaffolds anyway).

- [x] Asked clarifying questions — user redirected to the 🔍-flag approach; one round of AskUserQuestion exchanged for fix-path + scope.
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Re-scope rationale.** The user's pivot ("simpler fix, just as effective; don't tip-toe around carefully crafted skills") trades structural defense (runtime bail / untrack / doc callout) for an AI-output convention: prefix `/ft-audit*` next-move recommendations with 🔍. This catches the realistic misfire vector (AI in adopter context suggesting `/ft-audit-docs` as the next chat) without modifying audit SKILL.md scaffolds, without restructuring the submodule, and without burdening MIGRATION.md prose. The 🔍 marker doubles as a behavioral cue: any AI emitting `/ft-audit*` as next-move sees the flag rule and self-checks ("am I in adopter context? should this be the unprefixed local fork?").

**Implementation surface.** Single-file edit to `claude/skills/ft-task/SKILL.md` Step 6 (Post-closure protocol — Skill-specific bullets). Insert one bullet after the existing copy-paste-line bullet documenting the 🔍 prefix rule + rationale pointer to MIGRATION.md §1.2.1. The bullet does NOT specify additional emoji conventions or extend to other skills (`/ft-micro-task`, `/ft-starter-task`, `/ft-close-epic`) — those stay out of scope; if the convention proves valuable, follow-up tasks can extend it.

**Out-of-scope (acknowledged):** The slash-menu still registers `/ft-audit-docs` + `/ft-audit` in adopter context if Claude Code walks the submodule's `.claude/skills/`. A user manually typing `/ft-audit-docs` would still hit the flowtron-self fork. The 🔍 convention is a partial guard — it catches AI-suggested misfires but not human-direct ones. The user has accepted this tradeoff for simplicity.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — Step 6's "Skill-specific" block already carries two bullets (`[model]`-inline candidate-line shape, `/clear then /model … then /ft-* <NEXT-ID>` copy-paste shape). The 🔍 audit-family flag is a sibling — same bullet shape, same scope (suggest-next-move output), same depth. Extending the existing block, not introducing a new section or pattern.
- [x] Implemented the minimal solution — 1 bullet inserted into `claude/skills/ft-task/SKILL.md` Step 6 Skill-specific block (3 lines added).
- [x] Updated/added tests for non-trivial behavior — N/A; SKILL.md doc edit, no test toolchain applies.

**Implementation Notes:**

Single edit to `claude/skills/ft-task/SKILL.md` Step 6 "Skill-specific" block, appending a third bullet:

> **Audit-family flag.** When a next-move candidate is an `/ft-audit*` slash command, prefix both the candidate line and the copy-paste line with 🔍. Audit-family skills are forked per project per `docs/MIGRATION.md` §1.2.1 — in adopter context the local fork is unprefixed (e.g., `/audit-docs`), not `/ft-audit-docs`. The 🔍 marker doubles as a self-check for any AI about to emit `/ft-audit*` as next move.

The bullet states the rule (prefix candidate + copy-paste with 🔍), the why (audit-family is forked per project), and the doubled function (self-check for emitting AI). Pointer to MIGRATION.md §1.2.1 lets the reader trace the forking contract without restating it inline.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A; doc edit to SKILL.md, no test suite applies.
- [x] Ran lint/type-check on changed code — N/A; doc edit, no toolchain.
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A; no frontend.

**Testing Notes:**

Pure SKILL.md doc edit. No test, lint, or visual surface affected. Verification is by inspection: the inserted bullet sits cleanly alongside the existing two bullets in Step 6, the markdown renders, and the rule is unambiguous enough to be applied at next post-closure protocol fire.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md no change · SPEC.md no change · docs/MIGRATION.md no change · claude/AGENTS-snippet.md no change · docs/CONVENTIONS.md no change · CONTRIBUTING.md no change · SECURITY.md no change · docs/AGENT-NEUTRALITY.md no change · docs/PLATFORMS.md no change. The 🔍 flag is `/ft-task`-specific; the model-tag convention is in SPEC §"Post-closure protocol" but the 🔍 audit-flag stays a skill-specific extension and doesn't reshape the canonical contract.
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-24.` and tasknote moved to `_project/tasknote/archive/core/`.
- [x] Recap drafted.

**Final Summary:**

Added a 🔍 emoji prefix convention to `/ft-task`'s post-closure suggest-next-move output: when a next-move candidate references an `/ft-audit*` slash command, prefix both the candidate line and the copy-paste line with 🔍, signaling that audit-family skills are forked per project per MIGRATION.md §1.2.1. Re-scoped from a structural fix (modify audit SKILL.md scaffolds or untrack the submodule's `.claude/` forks) to a lighter AI-output convention per user direction — catches the realistic misfire vector (AI in adopter context suggesting `/ft-audit-docs` as next chat) without touching the carefully-crafted audit skills. Surface: 1 file changed (`claude/skills/ft-task/SKILL.md`), 3 lines added.

**Archived:** 2026-05-24
