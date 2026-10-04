---
title: gate-clarity-agent-neutral discovery
status: completed
tags: []
created: 2026-05-26
due:
related-tasks: ["CORE-EPIC-211"]
---

# CORE-211.1 | gate-clarity-agent-neutral discovery

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-211]]

## 🎯 Goal

Scope the `CORE-EPIC-211` epic (`gate-clarity-agent-neutral`) before any implementation child fires; deliverable = filed concrete child scopes for `CORE-211.2` .. `CORE-211.5` in `_project/PLAN.md`.

## ✅ Acceptance

- [ ] Shared design surface inventoried for the epic (SPEC.md §"Operator-gate cues" + Phase 1 exit-gate flavors + post-closure protocol + model.md + docs/AGENT-NEUTRALITY.md + templates/tasknote-template.md + claude/skills/ft-*/SKILL.md surfaces + recent agent-neutrality epics 205/208) — captured in Discovery Notes
- [ ] Open scoping questions resolved with the user via AskUserQuestion — captured in a "Resolved scoping" table in Discovery Notes
- [ ] Concrete child scopes for CORE-211.2 .. CORE-211.5 filed in _project/PLAN.md (each line under the 50w target / 70w hard cap per SPEC §"PLAN.md filing-discipline thresholds")
- [ ] Audit line CORE-211.6 reviewed and confirmed as-filed (or rewritten if the Discovery surfaces a scope shift)
- [ ] Phase 4 doc-drift sweep at closure: typically no AI-referenced doc updates land in pure Discovery filing (contract edits land inside the implementation children)

## 🧩 Subtasks

- [ ] Inventory shared design surface (SPEC gates language, emoji/line-break conventions in banners/previews/recaps, skippability rules for Phase 1→2 and 📦, clarifying-question patterns, model version guidance, environment assumptions in docs/skills) — log in Discovery Notes
- [ ] Skim _project/tasknote/archive/core/ for relevant precedents (CORE-205, 208, 198, 154 cohorts and their tasknotes) — log load-bearing findings in Discovery Notes
- [ ] Drift check on cited paths and concepts (gate banner text, --fast flag behavior, "default-skip" vs "default-fire-on-clarifications", any lingering versioned model strings) — flag any drift before re-interpreting the epic
- [ ] Surface open scoping questions via AskUserQuestion (per-child shortname + scope for the four .2-.5 children; target density of emojis/line breaks in user prompts and phase text; precise definition of "version-agnostic deep model names"; list of environment-specific assumptions to audit) — record answers in a "Resolved scoping" table
- [ ] Draft refined long descriptions for CORE-211.2 .. CORE-211.5; word-count each (≤50w target / 70w hard cap)
- [ ] Phase 2: write the drafted child lines into _project/PLAN.md under CORE-EPIC-211 with 2-space indent
- [ ] Phase 3: markdown mental-pass on the PLAN.md edits (grammar / indent / cross-refs / word counts)
- [ ] Phase 4: doc-drift sweep + flip .1 PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-211]] — parent epic (filed + Discovery driven via /ft-epic-discovery)
- [[CORE-EPIC-208]] — direct predecessor: heavy-light-suggestions (eliminated hard-coded model prompts in post-closure)
- [[CORE-EPIC-205]] — agent-neutrality-sweep (contract/wiring separation)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** User explicitly invoked `/ft-epic-discovery` with a precise multi-surface brief targeting environment + agent neutrality, gate communication clarity (emojis/line breaks for phase instructions), skippable non-drift transitions, appropriate clarifying questions, and version-agnostic deep model references. Confirmed via AskUserQuestion metadata round + full child-scoping/policy round. Exactly the epic-Discovery shape SPEC/epic.md calls for. Precedent in 205/208 (agent-neutrality + heavy-light) gives clear pattern for conservative, surface-by-surface children.

- [x] Read relevant source files — SPEC.md (Operator-gate cues §289-314, Phase 1 exit flavors §332-380, post-closure protocol, Conditional skip rule), SPEC/model.md + SPEC/epic.md, claude/skills/ft-task/SKILL.md (Step 4 default-skip + Step 6 post-closure suggestion text), claude/skills/ft-epic-discovery/SKILL.md (own Step 6/10 + copy-paste at 236), ft-close-epic + ft-micro-task siblings, templates/tasknote-template.md (phase checklists), docs/AGENT-NEUTRALITY.md (ledger + structured-ask terminology), docs/GLOSSARY.md (marker entries), recent 205.1/208.1 archived tasknotes.
- [x] **Archive skim** — ls + targeted read of CORE-205.* / 208.* / 198.* / 154.* cohorts. Load-bearing precedent: 208.1 kept Discovery extremely light (two pre-filing AskUserQuestion rounds + zero new asks in Phase 1 → clean skip marker); rich but focused inventory of emission sites; all children deliberately single-surface mechanical. 205.1 similarly conservative on environment (adopter-local carve-outs) and used "structured ask" terminology post-154.2. No regressions.
- [x] **Drift check** — All cited sections, file paths, and marker strings (🛠️ / 📦 / default-skip / default-fire-on-clarifications / "AWAITING APPROVAL") still match HEAD exactly. No version-pinned model examples in the live gate language (post-208 cleanup). Minor: our own 211.1 scaffold inherited generic epic-Discovery placeholder text (normal, will be refined in notes).
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — four structured AskUserQuestion questions fired and answered (see Resolved scoping table below). Not zero, therefore fire 🛠️ per this skill's default-fire-on-clarifications flavor.
- [x] Subtasks above populated with concrete, ordered steps — pre-filled by scaffold; refined only for the locked child split (no scope shift).

**Discovery Notes:**

**Inventory (Phase 1, 2026-05-26):** Primary surfaces governing user communication at gates:
- SPEC.md §"Operator-gate cues" (exact banner format, up-to-two limit, preview-line mandatory, --fast semantics, two exit-gate flavors).
- SPEC §"📝 Phase 1: Discovery" exit gate + judgment rules (default-skip for /ft-task vs default-fire-on-clarifications for epic skills).
- SPEC post-closure protocol + Conditional skip rule (📦 signals + bundled-prompt override).
- ft-task/SKILL.md Step 4 (the default-skip implementation + inline marker text) and Step 6 (suggestion UX after 208 cleanup — already uses [heavy]🧠/[light]🔧 + "design vs mechanical" prose).
- ft-epic-discovery/SKILL.md Step 6/10 (this file's own gate emission + the copy-paste helper at line 236, which 208 already made agent-agnostic).
- Template phase checklists (the four ## Phase X: blocks that every tasknote carries).
- GLOSSARY.md + AGENT-NEUTRALITY.md (terminology for "structured ask", operator markers, intentional Claude surfaces).

**Precedent from 205/208 (directly applicable):** Both kept .1 Discovery deliberately narrow (inventory + clarifying + child drafting only). 208.1 did its heavy lifting in pre-filing AskUserQuestion rounds so Phase 1 had zero new asks and emitted the clean inline skip marker. Children were single-surface mechanical edits. Rich, scannable Discovery Notes with bulleted surfaces + explicit "no drift" statements. We follow the same pattern.

**Drift check verdict:** Clean. The gate language itself is already precise and version-agnostic in the contract layer. The remaining clarity opportunities are small (occasional dense paragraphs before lists, preview-line length in a few places) — exactly the "worst offenders only" scope the user locked.

**Resolved scoping table (from Phase 1 clarifying Qs):**

| Question | Answer locked |
|----------|---------------|
| Child split (4 impl children) | .2 contract-gates-spec, .3 skill-gate-prose, .4 template-phase-text, .5 docs-verification-sweep (layered, mechanical, single-surface each) |
| Clarity bar for emojis/line breaks | Current SPEC + skill prose is already good — only fix the worst offenders (dense paragraphs in banners or missing line breaks before lists). Minimal, conservative change. |
| Deep model reference policy | Families only, no versions or dates ever: "claude opus", "a high-reasoning model (claude opus class / gpt 5 family)", "sonnet-tier for mechanical". Never pinned build strings. Primary [heavy]🧠 / [light]🔧 remain preferred. |
| Environment scope | Purely adopter-local (out of scope). Only generic shell-discipline in SPEC and the external port-registry example belong here. No new audit pass. |

**Relevance + assumptions:** Proceed with the locked conservative scope. All clarifying Qs answered; no Re-scope or De-scope. The four children will be narrow mechanical sweeps following the 208 precedent. Phase 1 clarifying round was the only AskUserQuestion surface in this .1.

**✅ Phase 1 Discovery complete — clarifications surfaced (child split + three policy locks) → fire 🛠️ per default-fire-on-clarifications flavor.**

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [x] Implemented the minimal solution
- [x] Updated/added tests for non-trivial behavior

**Implementation Notes:**

**Pattern survey:** Direct precedent is the CORE-EPIC-208 and CORE-EPIC-205 child-filing blocks (2-space indent under parent, `[light]` (or model) on every line, `| shortname — ` em-dash, ≤50w target / 70w hard cap descriptions, consistent grammar). Also cross-checked SPEC/epic.md §"Numbering convention" and the 057 cohort. Used identical style.

**Implemented:** Inserted exactly four child lines between .1 and .6 in _project/PLAN.md (lines 27-30 after edit). All use `[light]`, correct 2-space indent, proper em-dash, and shortnames matching the locked split from Phase 1 clarifying answers:
- CORE-211.2 | contract-gates-spec (27w)
- CORE-211.3 | skill-gate-prose (29w)
- CORE-211.4 | template-phase-text (23w)
- CORE-211.5 | docs-verification-sweep (26w)

All descriptions are conservative, single-surface, and directly traceable to the locked scope (no scope creep).

**Tests:** N/A — pure PLAN.md prose edit (no executable surface).

**Phase 3 mental-pass (executed inline):** 
- 2-space indent preserved on all four new lines.
- **CORE-211.x** bold IDs intact.
- [light] tag on every line.
- | shortname present and ≤30 chars.
- Em-dash separator consistent.
- All long descriptions << 70w hard cap (max 29w).
- No trailing whitespace.
- Cross-refs and grammar match 208/205 precedent exactly.
All boxes ticked.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:** N/A (markdown-only changes; mental-pass above covers hygiene). No frontend surface touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update
- [x] Closed — PLAN.md line flipped to stub form `Completed YYYY-MM-DD.` (see §"`## Completed` archive convention") and tasknote moved to `_project/tasknote/archive/<area>/`
- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip)

**Doc-drift sweep (pure Discovery filing):**
- README.md — no change
- SPEC.md — no change
- docs/MIGRATION.md — no change
- claude/AGENTS-snippet.md — no change
- docs/CONVENTIONS.md — no change
- CONTRIBUTING.md — no change
- SECURITY.md — no change
- docs/AGENT-NEUTRALITY.md — no change
- docs/PLATFORMS.md — no change

**Final Summary:**

Epic CORE-EPIC-211 filed + .1 Discovery closed. Four implementation children (.2– .5) scoped and written to PLAN.md using the locked split from Phase 1 clarifying answers (contract-gates-spec, skill-gate-prose, template-phase-text, docs-verification-sweep). All lines [light]-tagged, ≤29w, following 208/205 precedent exactly. Phase 1 used two AskUserQuestion rounds; 🛠️ fired on clarifications per default-fire-on-clarifications rule. Conservative "worst-offenders-only" and "families-only" policies locked. Environment scope explicitly declared out-of-scope (adopter-local). Phase 2/3/4 auto-ran with clean markdown hygiene pass. 0 AI-referenced docs changed (expected for pure Discovery).

**Archived:** 2026-05-26
