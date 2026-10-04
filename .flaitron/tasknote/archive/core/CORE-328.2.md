---
title: agent-memory-positioning
status: completed
tags: []
created: 2026-07-02
due:
related-tasks: [CORE-EPIC-328]
---

# CORE-328.2 | agent-memory-positioning

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-328]]

## 🎯 Goal

Position flowtron's markdown state model (PLAN.md + tasknote/ + archive/, git-versioned) explicitly as the filesystem persistent-memory layer for autonomous Claude Code agents and sub-agents — one positioning doc section, zero machinery.

## ✅ Acceptance

- [ ] One new `README.md` section positions `PLAN.md` + `tasknote/` + `archive/` (git-versioned) as the filesystem persistent-memory layer for autonomous Claude Code agents and sub-agents
- [ ] Placed as a sibling to §"Working in markdown vaults" (the CORE-022 positioning precedent), ~≤20 content lines, extending that section's shape (positioning paragraph + feature bullets + closing framing line)
- [ ] Zero machinery: prose only — no new files, skills, tooling, or SPEC changes
- [ ] Phrasing stays consistent with SPEC/VISION vocabulary and contradicts nothing in VISION §"What we won't accept" (no wiki-layer / query-API / scanner implications)
- [ ] No overlap with the CORE-328.4 autonomous-loop-guidance scope (loop mechanics stay out; this is positioning only)

## 🧩 Subtasks

- [ ] Decide the doc home (done in Phase 1: README.md via AskUserQuestion)
- [ ] Phase 2: draft the section after §"Working in markdown vaults", extending its positioning shape
- [ ] Phase 2: vocabulary cross-check vs SPEC.md / VISION.md (memory framing must not imply rejected machinery)
- [ ] Phase 3: markdown mental-pass on the new section
- [ ] Phase 4: doc-drift sweep + PLAN.md flip to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-328]] — parent epic (cc-agent-alignment); this is implementation child .2, filed by [[CORE-328.1]] Discovery

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Filed 2026-07-02 by [[CORE-328.1]] Discovery after clearing the epic's net-positive filter (gap 3: "tasknotes-as-agent-memory is implicit, never positioned"). Nothing has shifted since filing (same day); the positioning gap is real — grep confirms no doc frames the state model as agent memory (only "working memory" re context-window sizing).

- [x] Read relevant source files — `README.md` (candidate home + §"Working in markdown vaults" precedent shape), `docs/VISION.md`, `docs/PHILOSOPHY.md`, `SPEC.md` (vocabulary + "won't accept" guardrails), `.flowtron/tasknote/archive/core/CORE-328.1.md` (epic Discovery scoring).

- [x] **Archive skim** — `CORE-022` is the load-bearing precedent: the Obsidian positioning was deliberately re-scoped from a dedicated ~250-line `docs/OBSIDIAN.md` down to a 17-line README section because README is where prospective adopters scan first and a dedicated doc fails the lightweight-in-six-months filter. Also: CORE-099 cohort later generalized that section to "Working in markdown vaults"; CORE-137 stripped tool-specific attribution from SPEC wikilink prose. Same discipline applies here.

- [x] **Drift check** — `PLAN.md` + `tasknote/` + `archive/<area>/` all exist as described in the task line; `README.md` §"Working in markdown vaults" sits between §Visualizer and §"Repo layout" as expected. No drift.

- [x] Asked clarifying questions — AskUserQuestion on the section's home (the decision the filing explicitly deferred to this Phase 1). **Answer: README.md**, sibling to §"Working in markdown vaults" — matching the CORE-022 precedent and the .1 scoring note ("sibling to the Obsidian positioning").

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Home decision:** README.md, new section directly after §"Working in markdown vaults" (before §"Repo layout"). Both are companion-surface positioning sections; CORE-022 precedent governs shape and length (~≤20 content lines).
- **Vocabulary guardrails:** the section must read as *describing what already exists* (files-in-git are the memory), never as announcing a memory subsystem — VISION rejects wiki layers, query APIs, and validators; PHILOSOPHY's "the validator is the assistant" logic extends to "the memory store is the filesystem".
- **Boundary vs [[CORE-EPIC-328]] sibling .4:** autonomous-loop/`/clear` coupling guidance belongs to CORE-328.4; this section may name sub-agents/fresh sessions as the audience but must not document loop patterns.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the §"Working in markdown vaults" positioning shape (CORE-022 lineage): positioning paragraph → bullets mapping existing features to the frame → closing no-extra-wiring line. No new shape needed.

- [x] Implemented the minimal solution — one new `## Agent memory` section in `README.md`, directly after §"Working in markdown vaults" (before §"Repo layout").

- [x] Updated/added tests for non-trivial behavior — N/A (prose-only README section; no executable surface).

**Implementation Notes:**

- Section is 21 content lines: intro paragraph (audience: Claude Code sessions, sub-agents, fresh context windows) · four bullets (`PLAN.md` = durable intent · `tasknote/<ID>.md` = working state a fresh session resumes from · `archive/<area>/` = long-term memory with the Phase 1 archive skim as the recall step · git history = provenance/time-travel) · closing line.
- Closing line "markdown files in git are the memory" deliberately mirrors SPEC §"What flowtron does NOT provide" ("markdown files in git are the database") — describes what exists, announces nothing new; consistent with VISION "won't accept" (no wiki layer, no query API, no memory subsystem).
- No wikilinks used in README (avoids the wikilink-integrity grep concern); SPEC cite uses the standard `[SPEC.md](SPEC.md)` + § prose form.
- Boundary held: no autonomous-loop/`/clear` guidance (that's [[CORE-328.4]]).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown prose only; no code paths touch README).

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass run instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass on the new section: `##` heading level matches siblings ✓ · bullets use `- ` with bold-free inline-code leads matching README bullet style ✓ · relative link `[SPEC.md](SPEC.md)` valid from repo root ✓ · cited heading `§"📝 Phase 1: Discovery"` exists in SPEC.md ✓ · no bare wikilinks ✓ · no trailing whitespace ✓ · section placement between §"Working in markdown vaults" and §"Repo layout" confirmed ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`: **updated** (new §"Agent memory" — the task's deliverable). All other entries — `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md` (README is public-facing, not contract-layer; naming Claude Code there needs no ledger entry), `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`: **no change**.

- [x] Closed — PLAN.md `.2` line flipped to stub form `Completed 2026-07-02.` (in place under the open epic, per the `.1` precedent); tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the conditional-skip marker).

**Final Summary:**

Added a 21-line `## Agent memory` section to `README.md` (between §"Working in markdown vaults" and §"Repo layout") positioning flowtron's markdown state model as the filesystem persistent-memory layer for autonomous Claude Code agents and sub-agents: `PLAN.md` = durable intent, `tasknote/<ID>.md` = resumable working state, `archive/<area>/` = long-term memory with the Phase 1 archive skim as the recall step, git history = provenance. Home decided in Phase 1 via operator ask (README.md, per the CORE-022 Obsidian-positioning precedent). Zero machinery — prose only; closing line mirrors SPEC's "markdown files in git are the database" framing. Loop-pattern guidance deliberately left to [[CORE-328.4]].

**Archived:** 2026-07-02
