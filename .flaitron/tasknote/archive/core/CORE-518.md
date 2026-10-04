---
title: roster-utility-skills
status: completed
tags: []
created: 2026-08-30
due:
related-tasks: []
touches:
  - AGENTS.md
---

# CORE-518 | roster-utility-skills

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Add a separate line to `AGENTS.md` §Workflow naming the six non-tasknote utility skills wired into this checkout (`/ft-audit`, `/ft-audit-context`, `/ft-audit-repo`, `/ft-flowtron`, `/ft-stats`, `/ft-new-project`), without touching the `KEEP IN SYNC`-guarded peer-skill roster line.

## ✅ Acceptance

- [ ] `AGENTS.md` §Workflow names all six utility skills (`/ft-audit`, `/ft-audit-context`, `/ft-audit-repo`, `/ft-flowtron`, `/ft-stats`, `/ft-new-project`) on a line separate from the `KEEP IN SYNC`-guarded peer-skill roster
- [ ] The `KEEP IN SYNC`-guarded roster line (`AGENTS.md:16-21`) and its comment are left byte-identical
- [ ] New line matches the surrounding bullet/prose style of §Workflow

## 🧩 Subtasks

- [ ] Confirm the six skills' one-line purposes (from `claude/commands/*.md` or `claude/skills/*/SKILL.md`) to keep the new line factual, not templated
- [ ] Draft and insert the new line in `AGENTS.md` §Workflow, positioned so it reads as distinct from the guarded roster (not appended inside/adjacent to the `KEEP IN SYNC` block)
- [ ] Re-read `AGENTS.md:16-21` to confirm the guarded roster and its comment are unchanged

## 🔗 Related

- [[CORE-517]] — sibling from the same 2026-08-30 audit-context run; also added a missing-surfaces line to `AGENTS.md`, distinct target (§Repo Layout vs §Workflow)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Confirmed `AGENTS.md` §Workflow (lines 16-21, the `KEEP IN SYNC`-guarded block) names only the tasknote-family roster and omits all six utility skills. Confirmed all six exist and are wired (`claude/skills/{ft-audit,ft-audit-context,ft-audit-repo,ft-flowtron,ft-stats,ft-new-project}/` + matching `claude/commands/*.md`). Grepped `AGENTS.md` for their names — zero hits. The PLAN.md claim holds exactly as stated.

- [x] Read relevant source files — `AGENTS.md` (full), `claude/AGENTS-snippet.md` (mirror, checked for the same gap), `claude/commands/{ft-audit,ft-audit-context,ft-audit-repo,ft-flowtron,ft-stats,ft-new-project}.md` (one-line purposes), `SPEC.md` §"Skill namespace" (lines 105-124, already lists all six by name for the `ft-` prefix convention — a different purpose than this task's "what is this skill for" pointer)

- [x] **Best Practices Review** — N/A (docs-only change, one additive bullet; no code/module boundaries touched)

- [x] **Archive skim** — `grep -l "AGENTS.md\|AGENTS-snippet"` over `archive/CORE/` returns broad noise (most release-adjacent notes touch the file), so narrowed to the same 2026-08-30 audit-context batch. [[CORE-517]] (same day, same file, immediately preceding sibling task) added a missing-surfaces bullet to §Repo Layout using the "confirm exists → one factual bullet in existing style → verify guarded block untouched" pattern this task reuses. [[CORE-510]] (also same batch) established "reference, not restate" — point at a canonical section instead of re-deriving detail — which this task applies by pointing at `SPEC.md` §"Skill namespace" rather than describing each skill inline. Neither task, nor any other archive hit, previously touched the utility-skill gap this task closes.

- [x] **Drift check** — No drift. `AGENTS.md:16-21` content matches the task description exactly (six named skills absent, guarded roster block intact as cited). No SPEC contract requires AGENTS.md to list only tasknote-family skills or forbids adding this bullet — `SPEC.md` §"Skill namespace" is descriptive of naming convention, not prescriptive of which doc surfaces mention which skills.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (1) "a separate line" means outside the `KEEP IN SYNC`-guarded fence (lines 16-21), not appended inside it — the guard exists precisely because that block is mirrored verbatim in `claude/AGENTS-snippet.md`, and these six skills are self-host-only (no adopter paste-block lists them either); (2) per the CORE-510 "reference, not restate" precedent, the new line names the six skills and points at `SPEC.md` §"Skill namespace" rather than re-describing each one's purpose inline.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Placement: insert the new bullet after the existing `[model]` bullet (`AGENTS.md:37`) and before the closing "Flowtron self-hosts its own roadmap." paragraph (`:39`) — same bullet list, clearly after the guarded fence (`:16-21`) and its own `KEEP IN SYNC (CORE-516)` comment (`:36`), so no ambiguity about which block a future editor is meant to sync.

`claude/AGENTS-snippet.md` (the adopter mirror) was checked and correctly does *not* need this bullet — the six utility skills are self-host-only tooling (audits, stats, bootstrapping), not part of what an adopter's paste-block wires. No mirror edit required, unlike CORE-516/CORE-517's dual-file pattern.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the "reference, not restate" shape [[CORE-510]] established: name the six skills, point at `SPEC.md` §"Skill namespace" for the canonical roster, no per-skill descriptions inline (avoids a second place these six purposes could drift). Matches the plain-bullet style already used by the `[model]` bullet directly above it.

- [x] **Minimal refactor gate** — one additive bullet only; the guarded roster block (`:16-35`) and everything else in the file is untouched. No refactor needed.

- [x] Implemented the minimal solution — added the bullet to `AGENTS.md` §Workflow, lines 38-41

- [x] N/A — docs-only change, no test-worthy behavior

**Implementation Notes:**

One file, four lines added (`AGENTS.md:38-41`). Inserted immediately after the `[model]` bullet (`:37`) and its own `KEEP IN SYNC (CORE-516)` comment (`:36`), before the closing "Flowtron self-hosts its own roadmap." paragraph. The guarded roster fence (`:16-35`) is unchanged — confirmed by re-reading the full block post-edit.

## 🧪 Phase 3: Testing & Linting

- [x] N/A — no test suite applies to a prose doc addition. In place of a suite: confirmed the cited `SPEC.md` §"Skill namespace" heading resolves (`grep -n "^## Skill namespace" SPEC.md` → line 105).

- [x] N/A — no lint/type-check applies to markdown prose

- [x] **Quality assertions** — `git diff --stat` shows exactly 4 additive lines in `AGENTS.md`, nothing else touched; no duplication (the six skills are named once, purposes deferred to the SPEC.md pointer rather than restated); guarded roster fence re-read post-edit and confirmed byte-identical

- [x] N/A — no frontend surface touched

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 17 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `AGENTS.md` — **updated** (this task's target)
  - `SPEC.md` — no change (§"Skill namespace" already lists all six skills for the `ft-` naming convention; this task only added a pointer to it elsewhere, didn't alter it)
  - `docs/MIGRATION.md`, `docs/PLATFORMS.md` — no change (both already correctly categorize these six as standalone/global-utility skills in their own tables; this task's bullet doesn't contradict or duplicate that content)
  - `claude/AGENTS-snippet.md`, `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md` — no change (adopter-facing wiring; these six are self-host-only tooling, confirmed absent from the adopter paste-block and rightly so)
  - `README.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/EXTERNAL-AGENTS.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no change (none carry a skill-roster claim this bullet affects)

- [x] Closed — both `## ✅ Acceptance` criteria met: all six utility skills now named in `AGENTS.md` §Workflow on a line separate from the guarded roster, matching surrounding bullet style; guarded roster block (`:16-35`) confirmed byte-identical

- [x] **Evidence-based recap** drafted — see Final Summary below

**Final Summary:**

Added one bullet (`AGENTS.md:38-41`) naming the six utility skills wired into this checkout but previously absent from `AGENTS.md` — `/ft-audit`, `/ft-audit-context`, `/ft-audit-repo`, `/ft-flowtron`, `/ft-stats`, `/ft-new-project` — closing the gap audit-context surfaced without touching the `KEEP IN SYNC`-guarded tasknote-family roster (`:16-35`). Followed the CORE-510 "reference, not restate" precedent: names the six, points at `SPEC.md` §"Skill namespace" (verified the heading resolves) rather than re-describing each one inline. 1 file, 4 lines added, no code changed; no tests apply. 17-entry doc-drift sweep: 1 updated, 16 no change — confirmed `claude/AGENTS-snippet.md` correctly needs no mirror, since these six are self-host-only tooling never wired into an adopter's paste-block.

**Archived:** 2026-08-30
