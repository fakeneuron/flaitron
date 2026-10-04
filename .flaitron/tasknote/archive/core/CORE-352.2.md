---
title: ft-spec-skill
status: completed
tags: [enhancement, skill-add, spec-driven, planning-peer]
created: 2026-07-12
due:
related-tasks: [CORE-EPIC-352, CORE-352.1]
---

# CORE-352.2 | ft-spec-skill

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-352]] · [[CORE-352.1]]

## 🎯 Goal

Ship `/ft-spec`: a review-first, optional planning-peer skill that drafts a
lightweight design spec (fixed section order), surfaces it for operator
review, and optionally writes it to `.flowtron/specs/<slug>.md` — never
auto-filing PLAN entries or tasknotes.

## ✅ Acceptance

- [ ] `templates/spec-template.md` exists with the locked six-section order: Goal · Requirements · Design · Tasks · Risks/Open Q · Validation Approach
- [ ] `claude/skills/ft-spec/SKILL.md` drives generate → review → optional write, with two-layout Step 0 path resolution matching sibling skills
- [ ] `claude/commands/ft-spec.md` slash command wraps the skill (`args="$ARGUMENTS"`), documents interactive + `--fast`, and carries a peer-routing footer
- [ ] `codex/skills/ft-spec/SKILL.md` Codex wrapper points at the canonical Claude skill (same shape as `codex/skills/ft-starter-task/`)
- [ ] Review-first is the default; `--fast` skips the review pause but still never auto-writes PLAN/tasknotes
- [ ] Tone aligns with PHILOSOPHY/VISION: optional not mandatory, zero scripts, no new lifecycle phase, no schema/validator, no hooks/daemons
- [ ] Scope boundary respected: no adopter-wiring (`.3`), no EXTERNAL-AGENTS/tasknote-template validation guidance (`.4`), no dogfood (`.5`)
- [ ] Phase 4 doc-drift sweep across README §"AI-referenced docs" (expected: no change — wiring/docs land in later children)

## 🧩 Subtasks

- [ ] Write `templates/spec-template.md` (six locked sections + light Validation Approach prose; philosophy-aligned header note)
- [ ] Write `claude/skills/ft-spec/SKILL.md` (Step 0 paths · args/`--fast` parse · gather brief · draft · review gate · optional write · handoff · notes)
- [ ] Write `claude/commands/ft-spec.md` (description + argument-hint + skill invocation + peer footer)
- [ ] Write `codex/skills/ft-spec/SKILL.md` (thin wrapper mirroring `ft-starter-task`)
- [ ] Phase 3: markdown mental-pass + cross-ref check on the four new files; confirm no accidental `.3`/`.4` surface touched
- [ ] Phase 4: doc-drift sweep + flip `.2` PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-352]] — parent epic (spec-agent-validation)
- [[CORE-352.1]] — Discovery; locked the archetype, section order, review-first/`--fast`, and child split
- [[CORE-352.3]] — adopter wiring fan-out (rosters, MIGRATION counts) — deliberately NOT this task
- [[CORE-352.4]] — EXTERNAL-AGENTS + soft validation/PBT guidance — deliberately NOT this task

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** CORE-352.2 is the primary implementation child of an already-scoped epic. Discovery ([[CORE-352.1]]) locked every material decision (planning-peer archetype, six-section spec order, review-first + `--fast`, `.flowtron/specs/<slug>.md` landing, no auto-PLAN, no new phase/hooks). The deliverable set (skill + command + Codex wrapper + spec template) fits one context window and one clear diff. Nothing has drifted.

- [x] Read relevant source files — `SPEC.md` (Phase 3, "What flowtron does NOT provide", skill namespace), `SPEC/epic.md`, `docs/PHILOSOPHY.md`, `docs/VISION.md` §"What we won't accept", `claude/skills/ft-starter-task/SKILL.md` (peer archetype), `claude/commands/ft-starter-task.md` + `ft-goal-task.md` (command + `--fast` doc pattern), `codex/skills/ft-starter-task/SKILL.md` (wrapper shape), `templates/tasknote-template.md`, `.flowtron/tasknote/README.md` (AI-referenced docs).

- [x] **Archive skim** — `archive/core/CORE-352.1.md` is the direct Discovery deliverable (locks table + child split). Skill-add precedents from that skim: [[CORE-195.1]] (`/ft-debug` = template + methodology-in-skill), [[CORE-330.1]] (`/ft-goal-task` = separate wiring child, VISION boundary redraw). No prior `ft-spec` / `.flowtron/specs/` surface exists in archive or HEAD. Codex-wrapper anatomy from [[CORE-EPIC-271]]: every new skill lands a Codex wrapper.

- [x] **Drift check** (2026-07-12 HEAD): `claude/skills/` = 25 dirs, `claude/commands/` = 25, `codex/skills/` = 25 (confirmed) — adding `/ft-spec` makes 26 in each (the roster/count bumps themselves are `.3`, not touched here). `.flowtron/specs/` does not yet exist (created lazily on first write, not by this task). `templates/` has no `spec-template.md` yet. All Discovery-cited paths match HEAD.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** Discovery ran the AskUserQuestion round for this epic and locked all decisions (operator confirmed via Phase 1→2 go). Re-asking would relitigate settled scope. Explicit assumptions below.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Locked design (from [[CORE-352.1]], carried verbatim into execution)

- **Archetype:** planning/filing peer (like `/ft-starter-task`) — no PLAN line required to run; output is a reviewable artifact, not a task driver.
- **Landing:** review-first; optional write to `.flowtron/specs/<slug>.md`. Default interactive (review pause before write); `--fast` skips the pause but still never auto-writes PLAN/tasknotes.
- **Spec format:** fixed section order — Goal · Requirements · Design · Tasks · Risks/Open Q · Validation Approach. Editable markdown, not a schema.
- **Tasks section:** suggests Flowtron work types (epic / task / starter / micro / sidequest / PLAN one-liner) + handoff cues; conversion stays operator/skill-driven — `/ft-spec` never files anything into PLAN or `tasknote/`.
- **Spec evolution:** living markdown, edit-in-place; no version machine.

### Explicit assumptions (locks asserted, no operator re-ask)

1. `args` = optional free-text brief/topic + optional `--fast`; when both absent and no conversation brief exists, ask once for the brief.
2. Slug derived from the spec title (kebab-case); operator can override at the review gate.
3. `.flowtron/specs/` is an optional operator scratchpad, documented as such — **not** a parallel PLAN or a required subsystem. Created lazily (`mkdir -p`) on first write only.
4. The spec template's "Validation Approach" is one of the six locked sections and ships here with **light** prose only. The heavier soft-validation / PBT guidance woven into `templates/tasknote-template.md` + Phase 3 is CORE-352.4 — not touched here.

### Scope boundary (what this task does NOT do)

- **`.3` (wiring):** MIGRATION §1.2 counts, `claude`/`codex` AGENTS-snippets, `ft-new-project`, `ft-flowtron` roster, root `Agents.md` peer list, `SPEC/tasknote-selection.md` when-to-use bullet — all deferred. `/ft-spec`'s own command/skill footers may reference peers (self-contained), but I will not edit other skills' rosters.
- **`.4` (docs/validation):** `docs/EXTERNAL-AGENTS.md`, tasknote-template validation bullets, PBT guidance — deferred.
- **`.5` (dogfood):** running `/ft-spec` on a real goal — deferred.

### Philosophy alignment checklist (tone gate for every new file)

Zero scripts (cp/mv/edit + lazy mkdir only) · no new lifecycle phase · no schema/validator · no hooks/daemons · optional never mandatory · operator review over autonomy · agent-neutral (Claude-rich skill + thin Codex wrapper + neutral spec template).

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — modeled the skill on `/ft-starter-task` (closest planning/filing peer: Step 0 two-layout resolve, args parse, gather-from-conversation, review-before-write, handoff, notes). Command file mirrors `ft-starter-task.md` / `ft-goal-task.md` (description + argument-hint + `args="$ARGUMENTS"` invocation + peer-routing footer; `--fast` usage block from `ft-goal-task.md`). Codex wrapper copied verbatim-shape from `codex/skills/ft-starter-task/SKILL.md`. No new shape invented.

- [x] Implemented the minimal solution — four files: `templates/spec-template.md` (six locked sections), `claude/skills/ft-spec/SKILL.md`, `claude/commands/ft-spec.md`, `codex/skills/ft-spec/SKILL.md`.

- [x] Updated/added tests for non-trivial behavior — N/A (markdown skill/template/command surface; no executable code).

**Implementation Notes:**

- Spec template ships all six locked sections (Goal · Requirements · Design · Tasks · Risks/Open Q · Validation Approach). Validation Approach kept to **light** prose (heavier tasknote-template/PBT guidance is `.4`).
- Skill: default review-first (Step 4 pause → optional Step 5 write); `--fast` skips the pause but Step 1/4/5 all reassert PLAN + tasknotes are never written. `.flowtron/specs/` created lazily via `mkdir -p` on first write only; documented as optional operator scratchpad, not a subsystem.
- Philosophy tone woven into template header note, skill preamble + Notes, and command footer: optional-not-mandatory, zero scripts, no new phase, no schema/validator, no hooks.
- Scope boundary held: touched **only** the four new files. No roster/MIGRATION/`ft-flowtron`/`ft-new-project`/AGENTS-snippet/tasknote-selection edits (`.3`); no EXTERNAL-AGENTS or tasknote-template edits (`.4`). `/ft-spec`'s own footers reference peers but edit no other skill's roster.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no executable code; markdown skill/template/command surface). Markdown mental-pass instead.

- [x] Ran lint/type-check on changed code — N/A; markdown structure checks run instead (below).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

- ✅ `templates/spec-template.md` — six locked sections present in exact order: Goal · Requirements · Design · Tasks · Risks/Open Questions · Validation Approach.
- ✅ Frontmatter opens correctly on all four new markdown files.
- ✅ No stray `[[TASK-ID]]` wikilinks in the skill/command/template (peers referenced as `/ft-X` slash form — no wikilink-integrity exposure).
- ✅ Codex wrapper `../../../claude/skills/ft-spec/SKILL.md` target resolves (3-level path correct for `codex/skills/ft-spec/`).
- ✅ `git status` shows exactly the four new files + this tasknote; no `.3` (wiring/roster) or `.4` (docs/validation) surface touched.
- ✅ Tasknote `[[CORE-352.3]]` / `[[CORE-352.4]]` targets exist in PLAN.md.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `.flowtron/tasknote/README.md` §"AI-referenced docs":
  - `README.md` — no change (skill roster / counts land in wiring child `.3`)
  - `SPEC.md` — no change (§"Skill namespace" list update is roster wiring → `.3`)
  - `docs/MIGRATION.md` — no change (adopter wiring → `.3`)
  - `claude/AGENTS-snippet.md` — no change (`.3`)
  - `codex/AGENTS-snippet.md` — no change (`.3`)
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change (skill is agent-neutral: Claude skill + Codex wrapper + neutral template; no new Claude-only surface to ledger)
  - `docs/PLATFORMS.md` — no change (skill-inventory / wiring → `.3`)
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-12.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**

Shipped `/ft-spec`, an optional review-first planning-peer skill that drafts a fixed-section design spec and, on operator go, writes it to `.flowtron/specs/<slug>.md` — never filing PLAN entries or tasknotes. Technical: four new files — `templates/spec-template.md` (six locked sections: Goal · Requirements · Design · Tasks · Risks/Open Q · Validation Approach), `claude/skills/ft-spec/SKILL.md` (Step 0 two-layout resolve → args/`--fast` parse → gather brief → draft → review gate → optional lazy-`mkdir` write → handoff), `claude/commands/ft-spec.md`, and `codex/skills/ft-spec/SKILL.md` (thin wrapper). Tone held to PHILOSOPHY/VISION (optional, zero scripts, no new phase, no schema/validator, no hooks). Scope boundary respected: roster/wiring deferred to `.3`, EXTERNAL-AGENTS/validation-guidance to `.4`, dogfood to `.5`. Parent epic stays open (flips at `.N` audit).

**Archived:** 2026-07-12
