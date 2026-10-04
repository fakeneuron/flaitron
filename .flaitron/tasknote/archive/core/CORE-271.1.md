---
title: cross-agent-skill-projection discovery
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-EPIC-271]
---

# CORE-271.1 | cross-agent-skill-projection discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-271]]

## 🎯 Goal

Scope the `CORE-EPIC-271` epic (`cross-agent-skill-projection`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-271.2..(N-1)` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (sources, adopter wiring, SPEC contract impact, templates) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-271.2 .. CORE-271.(N-1) filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-271.N reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (source files, adopter-wiring surfaces, SPEC contract impact, templates) — log in Discovery Notes
- [ ] Skim .flowtron/tasknote/archive/core/ for relevant precedents — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (typical: per-child shortname + scope + adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-271.2 .. CORE-271.(N-1); word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-271 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-271]] — parent epic
- [[CORE-270]] — architecture decisions locked at filing (proof slice = ft-task, SOP dir = SPEC/procedures/, generator = hand-author first then separate epic)
- [[CORE-269]] — dogfood-prompt-template; landed docs/DOGFOOD.md as operator verification runbook (separate layer from SPEC/procedures/ agent-loaded SOPs)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Architecture decisions are locked from CORE-270: SOP dir = SPEC/procedures/, proof slice = ft-task, wrappers = thin pointer stubs in new grok/ + codex/ sibling dirs, generator deferred. `SPEC/procedures/` is absent at HEAD (new dir, expected). All prerequisite work (CORE-269 DOGFOOD.md, CORE-267 dogfood gate) confirmed complete.

- [x] Read relevant source files — ft-task/SKILL.md (SOP source material), docs/PLATFORMS.md (two-layer model + sibling-dir plug-in pattern), docs/AGENT-NEUTRALITY.md (intentional Claude surfaces ledger), SPEC/epic.md, SPEC/ module inventory, claude/skills/ inventory

- [x] **Archive skim** — CORE-270 (architecture decisions locked: thin pointers, SPEC/procedures/, hand-author first, DOGFOOD.md stays in docs/); CORE-269 (DOGFOOD.md landed as operator verification runbook — separate layer, no collision); CORE-091 (single-source-collapse precedent: "route, don't copy" exact analogue); CORE-154.x (wiring-layer structure locked, sibling-top-level dirs pattern). No precedent for a `SPEC/procedures/` lazy module; closest = existing SPEC/ lazy modules (gates.md, epic.md).

- [x] **Drift check** — `SPEC/procedures/`: absent (new dir, expected ✓); `claude/skills/ft-task/SKILL.md`: exists ✓; `docs/PLATFORMS.md`: exists ✓; `docs/AGENT-NEUTRALITY.md`: exists ✓; `grok/` + `codex/` sibling dirs: absent (new, expected ✓); `docs/DOGFOOD.md`: exists (stays in docs/, separate layer ✓). No drift.

- [x] Asked clarifying questions — resolved below in "Resolved scoping" table

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### Shared design surface

| Surface | Role | Epic impact |
|---|---|---|
| `SPEC/procedures/` (new dir) | Lazy-SPEC-module extension; agent-neutral SOPs load on demand | Create dir; define SOP format; register in SPEC.md |
| `claude/skills/ft-task/SKILL.md` | Claude-specific ft-task driver; source material for the neutral SOP | Stays as-is — SOP is additive; generator epic reconciles later |
| `docs/PLATFORMS.md` | Two-layer model + sibling-dir plug-in pattern | Add `grok/` + `codex/` rows when wiring lands; register procedures layer |
| `docs/AGENT-NEUTRALITY.md` | Intentional Claude surfaces ledger | May need new rows if SOP content carries Claude-specific references |
| `docs/AGENT-COMPAT.md` | Per-agent matrix (consume-mode, entry-point, primitive) | Update Grok + Codex rows to note the new SOP pointer |
| `claude/AGENTS-snippet.md` | Adopter paste-block + wiring commands | Update only if contract-only agents need a new load directive for SPEC/procedures/ |
| `grok/procedures/ft-task.md` (new) | Thin pointer stub routing Grok to SPEC/procedures/ft-task.md | Create in CORE-271.4 |
| `codex/procedures/ft-task.md` (new) | Thin pointer stub routing Codex to SPEC/procedures/ft-task.md | Create in CORE-271.4 |

### Resolved scoping

| Question | Answer |
|---|---|
| Per-agent pointer wrapper location | New `grok/` + `codex/` sibling dirs per PLATFORMS.md plug-in pattern; thin stub files that say "follow SPEC/procedures/ft-task.md" |
| Child carving | 4 implementation children: .2 spec-dir · .3 ft-task-sop · .4 per-agent-wrappers · .5 doc-updates |
| claude/skills/ft-task/SKILL.md changes | Stays as-is; SOP is additive; generator epic reconciles |
| DOGFOOD.md migration | No — stays in docs/ as operator verification runbook; SPEC/procedures/ = agent-loaded SOPs, different layer |

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

- [x] **Doc-drift sweep** — README.md · SPEC.md · docs/MIGRATION.md · claude/AGENTS-snippet.md · docs/CONVENTIONS.md · CONTRIBUTING.md · SECURITY.md · docs/AGENT-NEUTRALITY.md · docs/PLATFORMS.md · claude/CAPABILITIES.md · docs/AGENT-COMPAT.md — all no change (pure Discovery filing; doc updates land inside implementation children)

- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**

Filed CORE-EPIC-271 Discovery (CORE-271.1): scoped 4 implementation children (.2 spec-dir · .3 ft-task-sop · .4 per-agent-wrappers · .5 doc-updates) + audit at .6. Architecture locked from CORE-270: `SPEC/procedures/` = agent-neutral SOP source of truth; `grok/` + `codex/` sibling dirs = thin pointer stubs per PLATFORMS.md plug-in pattern; `claude/skills/ft-task/SKILL.md` stays unchanged (SOP is additive). All child lines filed in PLAN.md; audit bumped from placeholder .2 → .6.

**Archived:** 2026-06-02
