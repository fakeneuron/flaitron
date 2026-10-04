---
title: ft-spec-dogfood
status: completed
tags: []
created: 2026-07-12
related-tasks: [CORE-EPIC-352, CORE-352.1, CORE-352.2, CORE-352.3, CORE-352.4]
---

# CORE-352.5 | ft-spec-dogfood

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-352]] · [[CORE-352.2]] · [[CORE-352.4]]

## 🎯 Goal

Dogfood `/ft-spec` end-to-end on a real Flowtron design goal, capture friction in the skill prompt + spec format, refine from that friction, and file follow-ups only if the friction warrants it.

## ✅ Acceptance

- [ ] `/ft-spec` run for real on a chosen Flowtron design goal — a filled six-section draft produced (Goal · Requirements · Design · Tasks · Risks/Open Q · Validation Approach)
- [ ] Friction log captured: concrete rough edges in the skill prompt flow (`claude/skills/ft-spec/SKILL.md`) and the spec format (`templates/spec-template.md`) observed during the run
- [ ] Refinements applied to `ft-spec` skill and/or `templates/spec-template.md` where friction clearly warranted it (or explicitly logged "no refinement needed" with rationale)
- [ ] Codex wrapper (`codex/skills/ft-spec/SKILL.md`) kept in sync if the Claude skill's contract changed
- [ ] Follow-ups filed **only if needed** (dogfood surfaced work beyond this task's scope) — else logged "none warranted"
- [ ] Phase 4 doc-drift sweep across `.flowtron/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Pick the real Flowtron design goal to dogfood (operator-confirmed)
- [ ] Run `/ft-spec` on it: gather brief → draft six sections → review gate → optional write to `.flowtron/specs/<slug>.md`, noting friction at each step
- [ ] Write the friction log into Discovery/Implementation Notes (skill-prompt friction + spec-format friction, separated)
- [ ] Apply warranted refinements to `claude/skills/ft-spec/SKILL.md` and/or `templates/spec-template.md`; sync `codex/skills/ft-spec/SKILL.md` if the contract changed
- [ ] Decide follow-ups: file via `/ft-file-followup` only if friction exceeds this task's scope; else log "none"
- [ ] Phase 3: markdown mental-pass on any edits + verify the produced spec renders/reads cleanly
- [ ] Phase 4: doc-drift sweep + flip `.5` PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-352]] — parent epic (spec-agent-validation)
- [[CORE-352.2]] — shipped the `/ft-spec` skill being dogfooded here
- [[CORE-352.4]] — docs + soft validation guidance; spec-template Validation Approach language

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.5` is the dogfood child of an already-scoped epic. `/ft-spec` shipped (`.2`), wired (`.3`), docs+validation (`.4`) — all in HEAD. The task's deliverable is an authentic run + friction-driven refinement, not net-new design. Nothing has drifted.

- [x] Read relevant source files — `claude/skills/ft-spec/SKILL.md`, `codex/skills/ft-spec/SKILL.md`, `templates/spec-template.md`, `SPEC/epic.md`, epic siblings [[CORE-352.1]] / [[CORE-352.4]]

- [x] **Archive skim** — `.flowtron/tasknote/archive/core/` for CORE-352.* — all four prior children read; the `/ft-spec` contract (planning peer, review-first, optional write, six fixed sections, files nothing) is fully established. No prior dogfood tasknote.

- [x] **Drift check** — `/ft-spec` skill + spec-template match HEAD; `.flowtron/specs/` does not exist yet (created lazily on first write). ✅

- [x] Asked clarifying questions — **one AskUserQuestion round.** The dogfood *target* is genuinely operator's call (no open PLAN item to borrow; High = only this epic, Medium/Low/Future empty). **Operator chose "Spec→work handoff"**: design letting `/ft-epic-discovery` + `/ft-starter-task` optionally consume an existing `.flowtron/specs/<slug>.md` as their brief. Picked among offered candidates — did not change which files this task edits or the approach.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Dogfood target (operator-confirmed):** *Spec→work handoff* — a design for letting the conversion skills (`/ft-epic-discovery`, `/ft-starter-task`) optionally read an existing spec file as their brief, so a drafted spec flows into filed work without re-typing. Rich design tension (couples specs toward the lifecycle vs. the optional-not-mandatory / planning-peer constraint) → exercises all six spec sections.

**How the dogfood runs:** Phase 2 = execute `/ft-spec` on this target per its own SKILL.md (gather brief → draft six sections → review gate → optional write), logging friction at each step in two buckets — *skill-prompt friction* and *spec-format friction*. Refinements to `claude/skills/ft-spec/SKILL.md` / `templates/spec-template.md` (Codex wrapper synced if contract changes) land only where friction clearly warrants; follow-ups filed only if scope exceeds this task.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — ran `/ft-spec` faithfully per its own `claude/skills/ft-spec/SKILL.md` (Steps 0→6) rather than inventing a dogfood shape; refinement follows the skill's existing one-line-clarification prose style. The produced spec follows `templates/spec-template.md` verbatim (six fixed sections + header blockquote).

- [x] Implemented the minimal solution — (a) ran the dogfood and produced `.flowtron/specs/spec-to-work-handoff.md` (operator chose the Step-5 write, exercising lazy specs-dir creation); (b) applied the one warranted refinement to `claude/skills/ft-spec/SKILL.md` Step 4.

- [x] Updated/added tests for non-trivial behavior — N/A (skill-prose + a markdown spec artifact; no executable surface).

**Implementation Notes:**

**Dogfood run (target: spec→work handoff).** Executed `/ft-spec` end-to-end: brief assembled from conversation (no "one short question" fallback needed) → drafted six sections → Step-4 review gate → operator confirmed write → `.flowtron/specs/spec-to-work-handoff.md` created (specs dir did not exist; `mkdir -p` created it lazily as designed).

**Friction log (two buckets):**

- *Skill-prompt friction #1 (fixed):* Step 3 derives frontmatter `slug:` from the title; Step 4 lets the operator **override** the slug; Step 5 writes to `.flowtron/specs/<slug>.md` — but nothing tied an override to update **both** the filename and the frontmatter `slug:` field, so they could silently diverge. → Applied a one-line clarification to Step 4.
- *Skill-prompt friction #2 (log only):* `related-tasks` frontmatter guidance minor; worked fine (`[[CORE-EPIC-352]]`). Below change bar.
- *Spec-format friction #3 (no change):* six sections + the `**[type]** <scope> — file via <skill>` Tasks format mapped 1:1 to real work. Format is good as shipped.
- *Spec-format friction #4 (no change):* "Risks / Open Questions" bundles two kinds under one heading; fine for this topic — splitting would add ceremony against VISION's lean stance.

**Refinement applied:** `claude/skills/ft-spec/SKILL.md` Step 4 — slug override now updates both the write filename and the frontmatter `slug:`. Codex wrapper (`codex/skills/ft-spec/SKILL.md`) is a thin delegator (reads the Claude skill) → inherits automatically; no Codex edit and no `description`-frontmatter change, so no sync needed.

**Follow-ups:** none *warranted* by friction — the skill/template are sound. The dogfood's *design finding* (the spec→work-handoff capability itself) is captured in the written spec as an optional future direction; filing it as real work is an operator call at closure, not a friction-driven necessity (task says "file follow-ups only if needed").

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown/skill-prose only; no test-bearing code).

- [x] Ran lint/type-check on changed code — N/A; markdown verification sweep run instead (below).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface; viz parser untouched — no new PLAN grammar).

**Testing Notes:**

- `git diff --check` clean (no trailing whitespace / missing newline) across the SKILL edit + new spec.
- Produced spec: frontmatter `slug: spec-to-work-handoff` **matches** the filename `spec-to-work-handoff.md` (verifies the very refinement just applied).
- Spec section order matches `templates/spec-template.md` exactly (Goal · Requirements · Design · Tasks · Risks/Open Q · Validation Approach); header blockquote present.
- SKILL.md Step 4 edit reads cleanly; no other skill step references the slug in a way the edit contradicts.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — 12 AI-referenced ledger entries, all **no change** (the only touched skill, `claude/skills/ft-spec/SKILL.md`, is a lazy module not in the ledger; `/ft-spec` was already wired in `.3`; the specs dir is an optional operator scratchpad, not a cold-start doc):
  - `README.md` — no change · `SPEC.md` — no change · `docs/MIGRATION.md` — no change · `claude/AGENTS-snippet.md` — no change · `codex/AGENTS-snippet.md` — no change · `docs/CONVENTIONS.md` — no change · `CONTRIBUTING.md` — no change · `SECURITY.md` — no change (external/dogfood run stays inside the review-gated flow; no new attack surface) · `docs/AGENT-NEUTRALITY.md` — no change · `docs/PLATFORMS.md` — no change · `claude/CAPABILITIES.md` — no change · `docs/AGENT-COMPAT.md` — no change

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-07-12.` (stays nested under the open `CORE-EPIC-352` in `## High`; cohort moves to `## Completed` when the epic closes at `.N`) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on the conditional skip branch — all signals clear)

**Final Summary:**

Dogfooded `/ft-spec` end-to-end on the operator-chosen target *spec→work handoff*: assembled the brief from conversation, drafted the six fixed sections, honored the Step-4 review gate, and wrote `.flowtron/specs/spec-to-work-handoff.md` (first-ever specs-dir write — exercised lazy `mkdir -p` creation). The run surfaced one clearly-warranted skill-prompt friction — a Step-4 slug override didn't tie the write filename to the frontmatter `slug:` field — fixed with a one-line clarification to `claude/skills/ft-spec/SKILL.md`; the Codex wrapper inherits it (thin delegator, no sync). Three other observations logged as below-the-bar (spec format is sound as shipped). No follow-ups warranted by friction; the spec→work-handoff *capability* is captured in the written spec as an optional future direction, left for the operator to convert (not a friction-driven necessity). Verified: `git diff --check` clean; the produced spec's `slug` matches its filename (validates the very fix applied). Markdown/skill-prose only — no code, no viz, no contract change.

**Archived:** 2026-07-12
