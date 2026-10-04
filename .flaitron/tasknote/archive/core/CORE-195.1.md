---
title: ft-debug-skill discovery
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: [CORE-EPIC-195]
---

# CORE-195.1 | ft-debug-skill discovery

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-195]]

## 🎯 Goal

Scope the `CORE-EPIC-195` epic (`ft-debug-skill`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-195.2..4` in `_project/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (SKILL.md shape, command wiring, SPEC integration, adopter symlink, AGENTS-snippet entry) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-195.2 .. CORE-195.4 filed in `_project/PLAN.md` (each line under the 50w target / 70w hard cap per SPEC §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-195.5 reviewed and confirmed as-filed (or rewritten if Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface — survey the existing skill family (`ft-task`, `ft-micro-task`, `ft-starter-task`, `ft-file-followup`, `ft-epic-discovery`, `ft-close-epic`) for the SKILL.md anatomy template
- [ ] Survey adopter-wiring surfaces: `claude/AGENTS-snippet.md` skills list, `claude/skills/ft-new-project/SKILL.md` Step 3 symlink list, `docs/MIGRATION.md` §1.2
- [ ] Survey SPEC contract impact: `SPEC.md` §"When to use a tasknote (and when not to)", `SPEC/epic.md`, any phase-related sections
- [ ] Skim `_project/tasknote/archive/core/` for relevant precedents — especially `CORE-186` (ft-audit-context skill addition) and any skill-authoring tasknote
- [ ] Read obra/superpowers `systematic-debugging` skill content (WebFetch) to capture the canonical hypothesis-first pattern before re-interpreting for flowtron
- [ ] Drift check on cited paths and concepts — verify skill-family file paths and SPEC anchors still match HEAD
- [ ] Surface open scoping questions via AskUserQuestion (typical: should `/ft-debug` use the 4-phase template or a debug-specific tasknote shape? does it close as a regular task or as a follow-up to a parent bug?) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-195.2 .. CORE-195.4; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into `_project/PLAN.md` under CORE-EPIC-195 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs / model tag / shortname)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-195]] — parent epic
- [[CORE-186]] — recent precedent: ft-audit-context skill addition

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-epic-discovery` after the superpowers-vs-flowtron research surfaced `/ft-debug` as the strongest adoption candidate (hypothesis-first debugging cadence — no current skill owns the bug-hunt shape). Scope is multi-child (SKILL+command, adopter wiring, SPEC integration, audit), warranting the epic bracket.

- [x] Read relevant source files — `claude/skills/ft-audit-context/SKILL.md` (most recent skill-add precedent, soft-tone, global-install); `claude/AGENTS-snippet.md` (paste-block + §1.2 symlink list); `_project/tasknote/archive/core/CORE-186.md` (ft-audit-context tasknote — closest precedent for skill-add wiring surfaces); `templates/tasknote-template.md` (standard 4-phase template); `docs/MIGRATION.md` §§1.0-1.2 (global-install vs per-project bundle vs forked); `SPEC.md` heading map (esp. §"Skill namespace", §"When to use a tasknote", §"Tasknote body shape").
- [x] **Archive skim** — `CORE-186` is the canonical recent skill-addition precedent (touched 7 surfaces: SKILL + command + roster + 2 MIGRATION sections + ft-new-project Step 8 + PLATFORMS.md counts). The .3 wiring child mirrors that surface list. Pre-CORE-186 audit-family origin lives at [[CORE-101]] but is less applicable — that was a 6-skill batch with forked install pattern, not a single per-project skill.
- [x] **Drift check:**
  - `claude/skills/` count: ✅ 18 directories (matches PLATFORMS.md post-CORE-186 18/18 claim) — bump target for `/ft-debug` is 18→19.
  - `claude/commands/` count: ✅ 18 files — same bump.
  - `claude/AGENTS-snippet.md` §"One-time symlink wiring": ✅ exists (lines 25-45), 6 skills currently symlinked (`ft-task`, `ft-starter-task`, `ft-micro-task`, `ft-file-followup`, `ft-epic-discovery`, `ft-close-epic`).
  - `docs/MIGRATION.md` §1.2: ✅ exists (line 59) — "Flowtron ships six tasknote slash commands inside the submodule" — six → seven on `/ft-debug` landing.
  - `SPEC.md` §"When to use a tasknote (and when not to)" line 528: ✅ exists.
  - `SPEC.md` §"Skill namespace" line 81: ✅ exists.
  - `templates/tasknote-template.md`: ✅ exists; the standard 4-phase shape works for debug flow (no new template needed — debug methodology lives in the skill drive, not in the template).
- [x] Asked clarifying questions via AskUserQuestion (Archetype · Strictness · SPEC slot) — all three landed; design confirmed below.
- [x] Subtasks above populated with concrete, ordered steps.

**Discovery Notes:**

**Resolved scoping (AskUserQuestion answers):**

| # | Question | Answer | Implication |
|---|---|---|---|
| 1 | Archetype | **New tasknote skill (peer to /ft-task)** | Per-project install via §1.2 symlink bundle. Skill scaffolds + drives a tasknote with a PLAN.md entry. Six tasknote skills → seven. |
| 2 | Strictness | **Soft (flowtron tone)** | Conversational guidance; no Iron Law framing. No new operator-gate cues beyond standard 🛠️/📦/🏁. Hypothesis-first cadence lives in Phase 1 Discovery prompts (expected vs. observed → hypothesis → minimal repro) — drive, not gate. |
| 3 | SPEC slot | **Add new bullet to §"When to use a tasknote"** | SPEC.md gets a new entry positioning `/ft-debug` for bugs/unexpected behavior. §"Skill namespace" enumeration also bumps. |

**Three structural decisions:**

1. **Standard 4-phase template, not a new one.** `/ft-debug` reuses `templates/tasknote-template.md` like `/ft-task` does (not a new debug-template like `/ft-micro-task` has). Debug methodology lives in the SKILL.md's Phase-1 drive — the template shape stays standard. Keeps SPEC §"Tasknote body shape" unchanged.

2. **Invocation: `/ft-debug <ID>` with task ID arg.** Matches `/ft-task <ID>` pattern. The skill scaffolds a tasknote and walks it through the standard 4-phase, with Phase 1 emphasizing hypothesis-first prompts (expected/observed/hypothesis/minimal repro), Phase 2 emphasizing minimal-fix-addressing-root-cause, Phase 3 emphasizing verifying root cause is fixed (not just symptom).

3. **Adopter wiring is the same shape as CORE-186 minus PLATFORMS edits parity.** Touches `claude/AGENTS-snippet.md` (both paste-block enumeration + symlink list), `claude/skills/ft-new-project/SKILL.md`, `docs/MIGRATION.md` §1.2 (count "six" → "seven"), `claude/skills/ft-flowtron/SKILL.md` roster, `docs/PLATFORMS.md` skill counts (18→19 in two spots).

**Children plan (.2-.4):**

- `.2` [opus] | skill-and-command — author SKILL.md + command file
- `.3` [opus] | adopter-wiring — 5 wiring surfaces
- `.4` [opus] | spec-integration — `SPEC.md` §"When to use a tasknote" + §"Skill namespace"
- `.5` [opus] | audit — existing line; reviewed and confirmed as-filed

**Exit gate judgment.** Discovery surfaced and resolved 3 clarifications via AskUserQuestion. Per the skill's `default-fire-on-clarifications` flavor (epic Discovery, not /ft-task's `default-skip`), the 🛠️ Phase 1→2 banner fires below before Phase 2 commits child lines to PLAN.md.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — read CORE-EPIC-194's child cohort (lines 19-23 in PLAN.md) as the immediate precedent for the cohort-children filing pattern (2-space indent, `[opus]` tag, em-dash separator, ≤50w descriptions).
- [x] Implemented the minimal solution — three child lines written to `_project/PLAN.md` under CORE-EPIC-195 between `.1` and `.5`.
- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable code surface).

**Implementation Notes:**

Three child lines written (word-counts in parens):
- `.2 skill-and-command` (31w) — author SKILL.md + command file
- `.3 adopter-wiring` (40w) — 5 wiring surfaces
- `.4 spec-integration` (39w) — SPEC §"When to use a tasknote" + §"Skill namespace"

All under the 50w target, well under the 70w hard cap. N stays at 5 — Discovery surfaced no scope shift; audit number `.5` unchanged.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only).
- [x] Ran lint/type-check on changed code — markdown mental-pass on the PLAN.md edit: 2-space indent preserved on all 5 child lines; `**CORE-195.M**` bold IDs intact; `[opus]` tag on every line; `| <shortname>` segments all ≤30 chars (max: `spec-integration` at 16); em-dash separator consistent; no trailing whitespace.
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend).

**Testing Notes:**

No viz/parser surface touched (no PLAN.md task-line grammar change beyond child additions, which match the established grammar). Phase 4 PLAN edit (`.1` flip to stub) is mechanical.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep:**
  - `README.md` — no change (no skill enumeration; Discovery filing only).
  - `SPEC.md` — no change (the §"Skill namespace" + §"When to use a tasknote" edits land inside `.4 spec-integration`, not in this Discovery closure).
  - `docs/MIGRATION.md` — no change (the §1.2 "six → seven" edit lands inside `.3 adopter-wiring`).
  - `claude/AGENTS-snippet.md` — no change (paste-block + symlink-list edits land inside `.3 adopter-wiring`).
  - `docs/CONVENTIONS.md` — no change.
  - `CONTRIBUTING.md` — no change.
  - `SECURITY.md` — no change.
  - `docs/AGENT-NEUTRALITY.md` — no change.
  - `docs/PLATFORMS.md` — no change (skill-count bumps 18→19 land inside `.3 adopter-wiring`).
- [x] Closed — PLAN.md line flipped to stub form and tasknote archived to `_project/tasknote/archive/core/CORE-195.1.md`.
- [x] Recap drafted (bundled into the closure response below; this filing matches the 📦 conditional-skip rule — pure PLAN.md edits + tasknote scaffold/archive, no frontend, no privileged-ops surface, no perf concern).

**Final Summary:**

Filed `CORE-EPIC-195` (`ft-debug-skill`) and drove its `.1` Discovery to closure. Epic adds a `/ft-debug` skill modeled after obra/superpowers' `systematic-debugging` — a per-project tasknote skill (peer to `/ft-task` in §1.2's symlink bundle) that drives hypothesis-first debugging cadence (expected/observed → hypothesis → minimal repro → fix → verify) within the standard 4-phase template. Soft tone per flowtron's register (no Iron Law framing; no new operator-gate cues). Three implementation children filed (`.2` SKILL+command authoring, `.3` adopter wiring across 5 surfaces, `.4` SPEC integration); existing `.5` audit line confirmed as-filed. N=5 unchanged from filing-time estimate.

**Archived:** 2026-05-25
