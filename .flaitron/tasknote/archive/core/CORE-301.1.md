---
title: plan-cohesion-blast-radius discovery
status: completed
tags: []
created: 2026-06-07
due:
related-tasks: [CORE-EPIC-301]
---

# CORE-301.1 | plan-cohesion-blast-radius discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-301]]

## 🎯 Goal

Scope the `CORE-EPIC-301` epic (`plan-cohesion-blast-radius`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-301.2..5` in `.flowtron/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (SPEC filing-discipline contract, every skill that writes new PLAN lines, PLAN.md cohesion conventions) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-301.2 .. CORE-301.5 filed in .flowtron/PLAN.md (each line under the 50w target / 70w hard cap per SPEC/tasknote-selection.md §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-301.6 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (SPEC modules, the filing skills — ft-file-followup / ft-epic-discovery / ft-starter-task / ft-task inline suggestions, PLAN cohesion conventions) — log in Discovery Notes
- [ ] Skim .flowtron/tasknote/archive/core/ for relevant precedents (filing-discipline, PLAN cohesion, prior skill-wiring epics) — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (per-child shortname + scope; where the reconciliation contract lives; which skills get the wiring; adopter-wiring policy) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-301.2 .. CORE-301.5; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into .flowtron/PLAN.md under CORE-EPIC-301 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-301]] — parent epic (plan-cohesion-blast-radius)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-epic-discovery` to bracket a recurring, cross-cutting correctness gap — newly filed tasks/decisions don't reconcile against existing downstream PLAN entries (the blastimage auth-vs-api drift). Multi-surface (SPEC contract + multiple filing skills + adopter docs) → epic scope, not single task.

- [x] Read relevant source files — `claude/skills/ft-file-followup/SKILL.md`, `claude/skills/ft-starter-task/SKILL.md`, `claude/skills/ft-epic-discovery/SKILL.md` (this skill), `SPEC/tasknote-selection.md`, `SPEC/epic.md`, `.flowtron/tasknote/README.md`

- [x] **Archive skim** — grepped `.flowtron/tasknote/archive/` for `blast.?radius|downstream.impact|plan.cohesion|reconcil` and `filing.discipline`. No prior tasknote codifies a downstream-impact/cohesion scan; closest precedents (CORE-040 filing-discipline, CORE-024 PLAN signal-extraction) govern line *length*, not cross-task *cohesion*. Greenfield contract.

- [x] **Drift check** — all six filing skills + `SPEC/tasknote-selection.md` + `SPEC/epic.md` exist at HEAD. blastimage anecdote is an external adopter (no repo path) — motivating example only. No drift.

- [x] Asked clarifying questions — four scoping decisions resolved with the user (see Resolved scoping table)

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Shared design surface inventoried:**
- **SPEC contract:** `SPEC/tasknote-selection.md` — already lazy-loaded by every filing skill (its loader line lists `/ft-task`, `/ft-starter-task`, `/ft-micro-task`, `/ft-file-followup`, `/ft-debug`, `/ft-epic-discovery`, `/ft-close-epic` …). A new §"Downstream-impact reconciliation" here incurs zero new lazy-load.
- **Filing skills (write new PLAN lines, no downstream scan today):** `ft-file-followup` (Step 4 appends one line), `ft-starter-task` (Step 5 appends), `ft-epic-discovery` (Phase 2 files child cohort), plus the decision-driven path inside `ft-task` Phase 2.
- **The gap:** every filer appends-and-stops. None enumerates *existing active PLAN entries* to check whether the new task/decision makes a downstream task stale, contradictory, or redundant. The blastimage case was decision-driven (a direction change), so the trigger surface is broader than new-task filing alone.
- **Adopter surface:** `claude/AGENTS-snippet.md`, `docs/MIGRATION.md`, glossary — propagate the new contract on next bump.

**Resolved scoping:**

| Question | Resolution |
|---|---|
| Contract home | Section in `SPEC/tasknote-selection.md` (already loaded by all filers; zero new lazy-load) |
| Trigger scope | Filing **and** mid-flow direction-changing decisions (covers the blastimage decision case) |
| Scan rigor | Structured: enumerate impacted lines → classify → propose explicit reconcile actions (merge/nest/edit/delete/leave) → user-confirm gate |
| Child split (.2–.5) | .2 SPEC contract · .3 wire ft-file-followup + ft-starter-task · .4 wire ft-epic-discovery + ft-task decision path · .5 docs+adopter sweep |
| N / audit | N=6 unchanged; audit `.6` confirmed as-filed |

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-EPIC-057 / CORE-254 child cohorts are the precedent (2-space indent under parent, `[model]` on every line, em-dash separator, ≤50w descriptions)

- [x] Implemented the minimal solution — wrote `CORE-301.2..5` into PLAN.md between `.1` and the `.6` audit

- [x] Updated/added tests for non-trivial behavior — N/A (pure PLAN.md filing; no executable surface)

**Implementation Notes:** Four child lines written, each word-counted ≤50w (`.2` ~35w, `.3` ~33w, `.4` ~33w, `.5` ~29w). No audit-number bump — N=6 held; `.6` audit confirmed as-filed. Child split landed exactly as the Resolved scoping table: .2 SPEC contract · .3 inline filers · .4 epic-discovery + ft-task decision path · .5 adopter docs.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass instead (below)

- [x] (frontend) Asked the user for visual confirmation — N/A

**Testing Notes:** Markdown mental-pass on the new PLAN.md block: 2-space child indent preserved on all four lines · `**CORE-301.N**` bold IDs intact · `[heavy]🧠` tag on every line · `| <shortname>` segments ≤30 chars · em-dash separators consistent · all descriptions ≤70w cap · no trailing whitespace. Pass.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per entry in `.flowtron/tasknote/README.md` §"AI-referenced docs": `README.md` no change · `SPEC.md` no change · `docs/MIGRATION.md` no change · `claude/AGENTS-snippet.md` no change · `docs/CONVENTIONS.md` no change · `CONTRIBUTING.md` no change · `SECURITY.md` no change · `docs/AGENT-NEUTRALITY.md` no change · `docs/PLATFORMS.md` no change · `claude/CAPABILITIES.md` no change · `docs/AGENT-COMPAT.md` no change. All "no change" — contract + skill + adopter-doc edits land inside children `.2`–`.5`, not in pure Discovery filing.

- [x] Closed — PLAN.md `.1` line flipped to stub form `Completed 2026-06-07.` and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip)

**Final Summary:** Filed `CORE-EPIC-301` (`plan-cohesion-blast-radius`) and drove its `.1` Discovery to closure. Deliverable met: four implementation children `.2..5` scoped and filed. The epic introduces a structured downstream-impact reconciliation discipline — newly filed tasks and direction-changing mid-flow decisions scan active PLAN entries for impacted tasks and propose merge/nest/edit/delete actions behind a user-confirm gate. Contract lands in `SPEC/tasknote-selection.md` (zero new lazy-load), wired into the inline filers, epic-discovery, and the ft-task decision path, then propagated to the adopter surface. N=6 held; audit `.6` confirmed as-filed.

**Archived:** 2026-06-07
