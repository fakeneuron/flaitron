---
title: reject-wiki-layer-subsystem
status: completed
tags: [docs]
created: 2026-05-31
due:
related-tasks: [CORE-251, CORE-250, CORE-EPIC-194]
---

# CORE-252 | reject-wiki-layer-subsystem

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-251]] [[CORE-250]] [[CORE-EPIC-194]]

## 🎯 Goal

Record the rejection of the external "Karpathy Wiki Layer" proposal in `docs/VISION.md` §"What we won't accept" (+ terse SPEC.md mirror) so the analysis — and the consciously-declined salvageable kernel — is citable, not re-derived.

## ✅ Acceptance

- [x] One bullet added to `docs/VISION.md` §"What we won't accept" naming the rejected category (LLM knowledge-base / "wiki layer" subsystems) with justification
- [x] Terse PR-rejection mirror added to `SPEC.md` §"PR / suggestion archetypes flowtron does not accept", preserving the 1:1 VISION↔SPEC parity
- [x] Phase 4 doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs"

## 🧩 Subtasks

- [x] Drift-check the starter's cited surfaces against HEAD (post-CORE-251)
- [x] Resolve the open questions (VISION-only vs. mirror → both, for parity; keep separate from CORE-251)
- [x] Write the VISION.md bullet
- [x] Write the SPEC.md mirror bullet
- [x] Doc-drift sweep + close

## 🔗 Related

- [[CORE-251]] — sibling rejection (truvent/MCP security tooling), same session, same archetype
- [[CORE-250]] — the threat-model hardening that session's *yes* half shipped
- [[CORE-EPIC-194]] — precedent: gsd-pi-learnings "considered-and-declined" list pattern this memo mirrors

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Starter filed today with rich, still-current context; the rejection reasoning + salvaged-nugget review are the deliverable. Documentation guardrail, no code surface.

- [x] Read relevant source files — `docs/VISION.md` §"What we won't accept" (now 5 bullets post-CORE-251), `SPEC.md` §"PR / suggestion archetypes flowtron does not accept" (5 mirror bullets), `_project/tasknote/README.md` §"AI-referenced docs".

- [x] **Archive skim** — immediate precedent is the sibling [[CORE-251]] just archived this session; same docs, same shape. Mined the source post for salvageable nuggets before declining (see below).

- [x] **Drift check** — both target sections exist; the runtime-security bullet from CORE-251 is now the last entry before `## Why this exists` (VISION) and the last mirror (SPEC). Anchored the new bullet after it. No other drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — Resolved the starter's two open questions: (1) add to **both** VISION + SPEC mirror, for parity; (2) keep CORE-251/252 as **separate** bullets (different categories, each citable), landed same session per "promote whichever fires first." No user-facing clarification needed.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

Discovery surfaced no significant deviation → skip 🛠️.

**Salvaged-nugget review (post mined before declining).** The post's underlying insight — *distill messy source once, then operate against the clean layer* — is sound and already the spine of flowtron. Coverage map: "distill once / query the clean layer" → `PHILOSOPHY.md` §"One task per context window" + tasknotes-as-distillation + the Discovery archive-skim; concept pages → `SPEC/` + `docs/` + the CORE-EPIC-194 declined-list already *are* concept pages; source-citation → Discovery Notes already cite `[[TASK-ID]]`/archive hits; a `raw/` inbox for un-distilled source → the one genuinely-absent convention, **consciously declined** (distilled note is the artifact; raw source is intentionally ephemeral — invites binary/cruft accumulation). This very rejection ran the wiki pattern by hand with zero new machinery.

Collision table (compressed): `raw/`+`wiki/`+`instructions/` tree → duplicates the tasknote/PLAN/archive SSOT; "Knowledge Gate" 5th phase → 4-phase rhythm is the hardened core (gates cap at two banners), identical to CORE-251's rejected "Security Gate"; `flowtron-wiki` submodule + MCP sync → daemons/runtime, breaks agent-neutrality, redundant with native fs+git, identical to CORE-251's `flowtron-sec`; consistency/missing-link linting → schema validators (markdown is the schema); viz wiki cross-surfacing → viz is the one bounded read-only surface; Obsidian graph/Dataview → positioning for adopters, not a flowtron-native dependency.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the same 5-bullet list CORE-251 just touched; matched the bold-lead + justification + "PRs that … are rejected" shape (VISION) and the terse "PR-rejection mirror of … above" shape (SPEC).

- [x] Implemented the minimal solution — one VISION bullet + one SPEC mirror bullet.

- [x] Updated/added tests — N/A (markdown-only).

**Implementation Notes:**

`docs/VISION.md`: +1 bullet ("LLM knowledge-base / 'wiki layer' subsystems") after the runtime-security bullet, ~3 lines. `SPEC.md`: +1 terse mirror bullet. VISION↔SPEC parity now 6↔6.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown).
- [x] Ran lint/type-check on changed code — markdown mental-pass: bullet grammar, bold lead, inline-code spans balanced, no trailing whitespace.
- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend; `viz/` untouched).

**Testing Notes:**

Markdown-only doc edit; both bullets read in-voice with their neighbors.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per-entry verdict across README.md §"AI-referenced docs":
  - `README.md` — no change · **`SPEC.md` — updated** (task target; terse PR-archetype mirror bullet added) · `docs/MIGRATION.md` — no change · `claude/AGENTS-snippet.md` — no change · `docs/CONVENTIONS.md` — no change · `CONTRIBUTING.md` — no change · `SECURITY.md` — no change · `docs/AGENT-NEUTRALITY.md` — no change (new clause is agent-neutral; the Obsidian reference is descriptive, already-ledgered positioning) · `docs/PLATFORMS.md` — no change · `claude/CAPABILITIES.md` — no change · `docs/AGENT-COMPAT.md` — no change. (`docs/VISION.md`, the other task target, is not in the AI-referenced list.)

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-31.` and moved to `## Completed`; tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (surfaces inline on conditional skip — markdown-only, no frontend/privileged surface).

**Final Summary:**

Recorded the rejection of the external "Karpathy Wiki Layer" proposal as a permanent, citable guardrail — the sibling of [[CORE-251]]. **`docs/VISION.md`** §"What we won't accept" gained a sixth bullet — *LLM knowledge-base / "wiki layer" subsystems* — arguing that tasknotes + `PLAN.md` + `archive/` already are the clean LLM-maintained markdown layer (with `[[wikilinks]]` already present), so a parallel `raw/`+`wiki/`+`instructions/` tree duplicates the SSOT; the good kernel (distill once, query the clean layer) is already the spine of the workflow; and a wiki subsystem / `/ft-wiki-*` skills / "Knowledge Gate" phase / link-linters are rejected like schema validators. **`SPEC.md`** gained the matching terse mirror (parity 6↔6). Notably, the post *was* mined: the only genuinely-absent convention (a `raw/` source inbox) was consciously declined, recorded in this tasknote's Discovery Notes so future AIs see a deliberate decision, not an oversight.

**Archived:** 2026-05-31
