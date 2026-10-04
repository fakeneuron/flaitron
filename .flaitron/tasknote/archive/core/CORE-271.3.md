---
title: ft-task procedure SOP
status: completed
tags: []
created: 2026-06-02
due:
related-tasks: [CORE-EPIC-271, CORE-271.1, CORE-271.2, CORE-270]
---

# CORE-271.3 | ft-task procedure SOP

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-271]] · 🔗 [[CORE-271.2]] · 🔗 [[CORE-271.1]] · 🔗 [[CORE-270]]

## 🎯 Goal

Author `SPEC/procedures/ft-task.md` — the agent-neutral procedure SOP for driving the flowtron 4-phase tasknote workflow, derived from the SPEC contract (not copied from `claude/skills/ft-task/SKILL.md`), on the schema CORE-271.2 defined.

## ✅ Acceptance

- [ ] `SPEC/procedures/ft-task.md` exists, carrying the CORE-271.2 frontmatter schema (`procedure:` / `source:` / `last-verified:`)
- [ ] Body covers the full ft-task arc in agent-neutral steps: locate task → status gate → model check → 4 phases → post-closure protocol
- [ ] Claude-specific primitives are substituted with neutral equivalents (structured ask / prose ask; no slash dispatch); operator-cue glyphs+labels preserved per the contract
- [ ] Content is derived from the contract (SPEC.md + lazy modules), routing to the canonical contract rather than restating it ("route, don't copy")
- [ ] Scope boundary held: only `SPEC/procedures/ft-task.md` authored (no wrappers, no doc updates — those are .4/.5)
- [ ] Phase 4 doc-drift sweep across README §"AI-referenced docs"

## 🧩 Subtasks

- [ ] Write `SPEC/procedures/ft-task.md` frontmatter per the CORE-271.2 schema
- [ ] Author the SOP body: when-invoked trigger, locate-in-PLAN + status gate, model check, the 4 phases, gate cues, post-closure protocol — agent-neutral, citing the canonical SPEC sections
- [ ] Substitute Claude-specific surfaces (structured ask / prose ask; conversational trigger in place of slash dispatch); preserve operator-cue glyph+label vocabulary
- [ ] Markdown mental-pass: cross-refs resolve, fences/indent clean, scope boundary held
- [ ] Phase 4: doc-drift sweep + flip PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-271]] — parent epic (cross-agent-skill-projection)
- [[CORE-271.2]] — defined the `SPEC/procedures/` dir + SOP frontmatter schema this SOP fills
- [[CORE-271.1]] — discovery; locked the 4-child carve + shared design surface
- [[CORE-270]] — architecture: neutral SOP is the long-term SoT; Claude skill stays canonical wiring until the generator epic; "route, don't copy"

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Architecture fully locked from CORE-270/271.1; the dir + frontmatter schema landed in CORE-271.2 (HEAD). This task is the proof slice — the first concrete SOP on that schema. All prerequisites complete; `SPEC/procedures/ft-task.md` absent at HEAD (new file, expected).

- [x] Read relevant source files — `SPEC.md` (4-phase workflow, post-closure protocol, operator-cue glossary, task-line/ID conventions), `SPEC/gates.md` (full gate contract, cue vocabulary, Phase 1→2 flavors, conditional skip rule, `--fast`), `SPEC/epic.md` (epic-subtask lifecycle), `SPEC/procedures/README.md` (the schema this SOP fills), `docs/AGENT-NEUTRALITY.md` (Claude-specific surface ledger + structured/prose-ask terminology), `claude/skills/ft-task/SKILL.md` (the `source:` reference — read as derivation anchor, not copy target), `templates/tasknote-template.md` (canonical body shape).

- [x] **Archive skim** — CORE-271.2 (defined `SPEC/procedures/README.md`: 3-field frontmatter `procedure:`/`source:`/`last-verified:`, wrapper-routing loading convention, layer-separation from DOGFOOD.md); CORE-271.1 (4-child carve; scope boundary: this task = SOP content only); CORE-270 (architecture decisions: route-don't-copy, neutral SOP as long-term SoT); CORE-091 (single-source-collapse "route, don't copy" precedent). No prior tasknote authored a procedure SOP — this is the first.

- [x] **Drift check** — `SPEC/procedures/ft-task.md`: absent (new, expected ✓); `SPEC/procedures/README.md`: present, schema matches cited shape (`procedure:`/`source:`/`last-verified:`) ✓; `claude/skills/ft-task/SKILL.md`: present (derivation anchor) ✓; `docs/AGENT-NEUTRALITY.md` structured/prose-ask terminology + Claude-surface ledger: present ✓; SPEC version v5.1.0 (matches PLAN/release state) ✓. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** Explicit assumptions: (1) SOP is hand-authored *from* the contract, routing to canonical SPEC sections rather than restating rules (per CORE-270 "route, don't copy" + README `source:` framing); (2) `last-verified:` stamp = `v5.1.0 · 2026-06-02` (current release + today); (3) the SOP describes the conversational equivalent of slash dispatch (a contract-only agent is *asked* to run the procedure) and uses "structured ask"/"prose ask" per the AGENT-NEUTRALITY ledger; (4) `--fast` is documented as an operator-requestable autonomous mode (concept is platform-neutral per the ledger) without prescribing a flag syntax; (5) scope strictly the one file — wrappers (.4) and doc updates (.5) excluded.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

### What the SOP must be (and must not be)

- **Is:** an agent-neutral, plain-language execution guide a contract-only agent loads (via its per-platform pointer wrapper) to drive the `/ft-task` 4-phase workflow conversationally — the *floor* that narrows the adherence gap.
- **Is not:** a copy of `claude/skills/ft-task/SKILL.md` (which carries Claude-specific lazy-load dispatch, `--fast` flag parsing, structured-ask calls), nor a restatement of the SPEC rules. It **routes** to the canonical SPEC sections per "route, don't copy" ([[CORE-091]], [[CORE-270]]).

### Neutrality substitutions (per docs/AGENT-NEUTRALITY.md)

| Claude-specific surface | Neutral equivalent in the SOP |
|---|---|
| Slash dispatch (`/ft-task <ID>`) | Conversational trigger: "when asked to start task `<ID>`" |
| `AskUserQuestion` tool | **structured ask** |
| Free-prose question | **prose ask** |
| `--fast` skill flag | Operator-requestable autonomous mode (concept neutral; no flag syntax prescribed) |
| Lazy-module load dispatch | Inline pointer: "consult `SPEC/<module>.md` when …" |

Operator-cue glyph+label vocabulary (🛠️/📦/🟢/👁️/🏁/✅/🔧/🧠/🗄️/▶️/✋/🔍) is **preserved verbatim** — it is contract-layer (cross-agent), not Claude-specific.

### Pattern survey target
No existing procedure SOP to extend (this is the first). Closest shapes: `SPEC/procedures/README.md` (sibling artifact — frontmatter + prose, route-don't-copy tone) and the existing `SPEC/*.md` lazy modules (`> Lazy-loaded …` loader prose + cite-the-core posture). The SOP follows the README's neutral-prose + cross-ref-the-contract shape.

→ Discovery surfaced no significant deviation (Proceed; lean assumptions logged; single new file on a locked schema) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — no prior procedure SOP exists (this is the first). Followed `SPEC/procedures/README.md`'s neutral-prose + route-to-contract shape and the lazy-module `> Loaded by …` loader-line convention. No new shape invented — extends the README's established posture.

- [x] Implemented the minimal solution — authored `SPEC/procedures/ft-task.md` only. One file; no wrappers, no doc updates (scope boundary held → .4/.5).

- [x] Updated/added tests for non-trivial behavior — N/A (agent-neutral markdown SOP; no code path).

**Implementation Notes:**

`SPEC/procedures/ft-task.md` carries the CORE-271.2 frontmatter (`procedure: ft-task` / `source: claude/skills/ft-task/SKILL.md` / `last-verified: v5.1.0 · 2026-06-02`) and a loader-line header marking it agent-loaded (Claude Code uses the SKILL directly). Body: a "route, don't copy" preamble naming the contract as authority, a when-to-run trigger (+ skip-the-tasknote pointer), an **agent-neutral primitives** table (structured ask / prose ask / trigger / autonomous mode) substituting the Claude-specific surfaces per `docs/AGENT-NEUTRALITY.md`, an explicit note that the operator-cue glyph+label vocabulary is preserved verbatim, then six steps (locate + status gate · area + model · open/scaffold with the 4-way status branch · Phase 1 · Phases 2-4 · post-closure protocol) — each routing to the canonical `SPEC.md` / `SPEC/gates.md` / `SPEC/{model,epic,starter,blocked,tasknote-selection}.md` section rather than restating the rule.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (no code changed; viz suite is unrelated to SPEC/ doc edits).

- [x] Ran lint/type-check on changed code — N/A (markdown). Ran a link-integrity pass instead: all 11 relative-link targets resolve (`claude/skills/ft-task/SKILL.md`, `README.md`, `SPEC.md`, `docs/AGENT-NEUTRALITY.md`, `SPEC/{gates,tasknote-selection,model,epic,starter,blocked}.md`, `templates/tasknote-template.md`); every cited SPEC.md / gates.md section anchor exists; wikilinks match the README's `[[CORE-NNN]]` convention.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

`git status`: `?? SPEC/procedures/ft-task.md` (new file; the `SPEC/procedures/` dir is already tracked via its README). No other surface touched.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across `.flowtron/tasknote/README.md` §"AI-referenced docs": `README.md` · `SPEC.md` · `docs/MIGRATION.md` · `claude/AGENTS-snippet.md` · `docs/CONVENTIONS.md` · `CONTRIBUTING.md` · `SECURITY.md` · `docs/AGENT-NEUTRALITY.md` · `docs/PLATFORMS.md` · `claude/CAPABILITIES.md` · `docs/AGENT-COMPAT.md` — **all no change.** `SPEC.md` already registered the `SPEC/procedures/` layer in CORE-271.2; the PLATFORMS / AGENT-COMPAT / AGENT-NEUTRALITY / AGENTS-snippet updates are explicitly CORE-271.5's scope. (Slice-local note: `SPEC/procedures/README.md`'s "the first SOP … lands in CORE-271.3" forward-ref is now satisfied but left as an accurate historical pointer; not in the cold-start set.)

- [x] Closed — PLAN.md `CORE-271.3` line flipped to stub form (nested under CORE-EPIC-271; parent stays open until the epic closes) and tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] Recap drafted

**Final Summary:**

Authored `SPEC/procedures/ft-task.md` — the first agent-neutral procedure SOP, the proof slice of CORE-EPIC-271. It carries the CORE-271.2 frontmatter (`procedure`/`source`/`last-verified`), a loader-line header marking it agent-loaded (Claude Code uses the SKILL directly), an agent-neutral-primitives table substituting the Claude-specific surfaces (structured ask / prose ask / conversational trigger / autonomous mode) per `docs/AGENT-NEUTRALITY.md`, and six steps (locate + status gate · area + model · open/scaffold 4-way branch · Phase 1 Discovery · Phases 2-4 · post-closure protocol). Every step **routes to** the canonical `SPEC.md` / `SPEC/gates.md` / `SPEC/{model,epic,starter,blocked,tasknote-selection}.md` section rather than restating the rule, per the "route, don't copy" posture ([[CORE-091]], [[CORE-270]]); the operator-cue glyph+label vocabulary is preserved verbatim as contract-layer. Scope held to the one file (wrappers → .4, doc updates → .5). All 11 cross-ref targets and cited section anchors verified.

**Archived:** 2026-06-02
