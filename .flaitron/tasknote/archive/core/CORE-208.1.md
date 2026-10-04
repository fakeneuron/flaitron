---
title: heavy-light-suggestions discovery
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: [CORE-EPIC-208]
---

# CORE-208.1 | heavy-light-suggestions discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-208]]

## 🎯 Goal

> Scope the `CORE-EPIC-208` epic (`heavy-light-suggestions`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-208.2..5` in `_project/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-208.2 .. CORE-208.5 filed in _project/PLAN.md (each line under the 50w target / 70w hard cap per SPEC §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-208.6 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [ ] Skim _project/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-208.2 .. CORE-208.5; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into _project/PLAN.md under CORE-EPIC-208 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-208]] — parent epic (filed via /ft-epic-discovery)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-epic-discovery` with a clear multi-surface terminology/UX hygiene brief targeting residual specific-model prompts after the 205/206/207 sweeps. Confirmed via two AskUserQuestion rounds (success criteria, global CLAUDE.md inclusion, heavy/light + 🧠/🔧 direction, agent-agnostic copy-paste text, epic scope with all children light-scoped). Matches epic-Discovery shape.

- [x] Read relevant source files
- [x] **Archive skim** — light scope: relied on PLAN.md history + recent CORE-205/206/207 precedents (agent-neutrality + model-vocab); no deep ls/grep of archive/core/* required for this mechanical hygiene pass. No load-bearing prior attempts at these exact UX strings surfaced.
- [x] **Drift check** — all cited strings/paths matched HEAD exactly (see Discovery Notes). No drift.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — two structured AskUserQuestion passes completed with user answers locked (see conversation + Discovery Notes). No further open scoping questions.
- [x] Subtasks above populated with concrete, ordered steps — pre-filled by scaffold per ft-epic-discovery contract; sufficient for light execution.

**Discovery Notes:**

**Inventory (Phase 1, 2026-05-26):** Key surfaces still emitting user-visible specific-model suggestions (the root cause of the reported "copy-paste /clear then /model opus then ..." prompts):

✅ Phase 1 Discovery complete; entering Phase 2 Execution (no clarifications surfaced after the two pre-filing AskUserQuestion rounds; all user choices locked).

- `claude/skills/ft-task/SKILL.md:51` — outdated comment example: `(`opus` | `sonnet`)`
- `claude/skills/ft-task/SKILL.md:148` — post-closure copy-paste generator hardcodes `/clear then /model <opus|sonnet>`
- `claude/skills/ft-epic-discovery/SKILL.md:236` — identical copy-paste generator text
- `claude/skills/ft-micro-task/SKILL.md` — symmetric copy-paste + Step 1 comment (from prior grep)
- `claude/skills/ft-task/step-1.5-model-edge.md:16` + ft-micro equivalent — legacy Ask text still lists `opus`, `sonnet` in "e.g." after already recommending `[heavy]`/`[light]`
- Global `~/.claude/Claude.md:44` (Model Selection) — "Default to Opus for design... prefer Sonnet for mechanical"
- 4 audit-family skills (`ft-audit-backend` etc.) — example filing grammar uses `[opus|sonnet]`
- `SPEC/model.md` — already clean post-CORE-206/207 (primary `[heavy]`/`[light]`, specific names documented as valid escape hatch only). No changes needed here.
- No hits in `claude/commands/`, `templates/`, or `docs/AGENT-NEUTRALITY.md` (the latter correctly references the model-vocab work).

**Drift check:** All cited paths and strings matched HEAD exactly (no prior partial cleanup on the UX emission sites). Recent agent-neutrality + model-vocab epics (205/206/207) addressed SPEC guidance and contract layer but left the executable "suggest this to the user" strings in the skills untouched — exactly the gap reported.

**Scope for light children:** All 4 implementation children (.2–.5) deliberately scoped to single-surface or single-file mechanical edits (no cross-cutting refactors). Discovery itself kept to inventory + minimal targeted replaces.

**Relevance:** Proceed. Explicit user invocation of `/ft-epic-discovery` + confirmed answers on terminology (stick to heavy/light + design-vs-mechanical prose + 🧠/🔧 visuals only in suggestions) + global CLAUDE.md in-scope. No clarifications needed beyond the AskUserQuestion gates already answered.

## 🛠️ Phase 2: Execution

- [ ] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [ ] Implemented the minimal solution
- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code
- [ ] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs": "no change" (pure Discovery filing: only PLAN.md + tasknote scaffold/archive touched; no edits to the 9 AI-referenced contract docs)
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-26.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/core/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Final Summary:**

Epic CORE-EPIC-208 (`heavy-light-suggestions`) filed + .1 Discovery closed in one motion. 4 light-scoped implementation children (.2–.5) + .6 audit now in PLAN.md under High; all children use [light] 🔧 per operator request for mechanical execution. Surfaces inventoried (ft-task, ft-epic, ft-micro, step fragments, audit skills, global CLAUDE.md, SPEC/model.md). No audit-number bump (N=6 stable). 5 new PLAN lines added (parent + .1 + 4 children + .6); all descriptions ≤50w target.

**Archived:** 2026-05-26
