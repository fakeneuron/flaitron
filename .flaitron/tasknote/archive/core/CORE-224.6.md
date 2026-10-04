---
title: audit
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: [CORE-EPIC-224, CORE-224.1, CORE-224.2, CORE-224.3, CORE-224.4, CORE-224.5]
---

# CORE-224.6 | audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-224]]

## 🎯 Goal

Verify that CORE-EPIC-224's deliverables (AGENT-COMPAT.md matrix, claude/CAPABILITIES.md trigger wiring, nonclaude platform triggers, last-verified currency convention) sit well in the codebase, with no doc drift, broken cross-refs, or stale entries.

## ✅ Acceptance

- [ ] Doc-drift sweep across `_project/tasknote/README.md` §"AI-referenced docs" complete (per-entry verdict)
- [ ] AGENT-COMPAT.md matrix reviewed for correctness and cross-ref integrity
- [ ] claude/CAPABILITIES.md trigger wiring verified against PLATFORMS.md and AGENT-COMPAT.md
- [ ] Non-Claude platform trigger entries (PLATFORMS.md) reviewed
- [ ] Last-verified convention notes reviewed for consistency

## 🧩 Subtasks

- [ ] Archive skim for prior tasknotes touching epic-224 deliverables
- [ ] Read all five deliverable files produced by .1–.5
- [ ] Audit: cross-ref integrity (wikilinks, section cites, file paths)
- [ ] Audit: doc currency / last-verified entries consistent with convention
- [ ] Audit: per-agent trigger wiring complete and non-contradictory
- [ ] Identify any findings worth filing as follow-up tasks
- [ ] Doc-drift sweep (Phase 4 fixed acceptance line)
- [ ] Close tasknote + flip PLAN.md

## 🔗 Related

- [[CORE-EPIC-224]] — parent epic: living agent-compatibility surface
- [[CORE-224.1]] — discovery (filed children)
- [[CORE-224.2]] — compat-matrix (AGENT-COMPAT.md)
- [[CORE-224.3]] — claude-triggers (claude/CAPABILITIES.md)
- [[CORE-224.4]] — nonclaude-triggers (PLATFORMS.md non-Claude entries)
- [[CORE-224.5]] — last-verified-currency (convention + wiring)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All five epic children (.1-.5) closed and archived. Three new docs delivered: `docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md §"Non-Claude capability triggers"`. One genuine inconsistency found (see Discovery Notes). Standard final-subtask audit.

- [x] Read relevant source files — `docs/AGENT-COMPAT.md`, `claude/CAPABILITIES.md`, `docs/PLATFORMS.md`, `_project/tasknote/README.md` §"AI-referenced docs", all five `.1`–`.5` archived tasknotes.

- [x] **Archive skim** — `_project/tasknote/archive/core/`: CORE-224.1–.5 all present. Load-bearing findings: .2 deliberately added Gemini CLI to AGENT-COMPAT.md (7-agent set per .1 Clarifications Q2) while noting that PLATFORMS.md §"Today's surface" roster was 6 (no Gemini CLI in that table); .4 added the non-Claude triggers section to PLATFORMS.md including a Gemini CLI stub; neither .2 nor .4 updated the "Today's surface" table to include Gemini CLI. No other prior tasknotes touch these docs.

- [x] **Drift check** — all three deliverable files exist at cited paths; AGENT-COMPAT.md has 7-row matrix, CAPABILITIES.md has the 5-trigger table, PLATFORMS.md has the "Non-Claude capability triggers" section. PLATFORMS.md "Today's surface" table still lists 5 contract-only agents (no Gemini CLI) — confirmed inconsistency with AGENT-COMPAT.md and PLATFORMS.md §"Non-Claude capability triggers".

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions:
  - The Gemini CLI omission from PLATFORMS.md "Today's surface" table is an oversight (not intentional): it's listed in AGENT-COMPAT.md, in PLATFORMS.md §"Non-Claude capability triggers", and in PLATFORMS.md's own pre-adoption footer (line 81) — but not in the "Today's surface" table. Fix inline.
  - Fix is minimal: add `, Gemini CLI` to the second row of the "Today's surface" table.
  - No contract-layer edits. No new ledger rows.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **All acceptance criteria verified against live files:**
  - ✅ `docs/AGENT-COMPAT.md` exists with 7-row matrix (Claude Code, Grok Build, Codex CLI, Cursor, Gemini CLI, Aider, Sourcegraph Amp) — four scaffold columns; no capability triggers; pre-adoption framing on 6 non-Claude rows.
  - ✅ `claude/CAPABILITIES.md` exists with 5-trigger table (effort/thinking, `--fast`/`-f`, `/model`, `/clear`, structured ask); no provisional language; canonical `v4.3.0 · 2026-05-30 (dogfooded)` last-verified stamp; cross-ref to AGENT-COMPAT.md §"Reading the cells".
  - ✅ PLATFORMS.md §"Non-Claude capability triggers" section present; Grok Build has 5-row trigger table with `docs-only · 2026-05 (pre-adoption)` stamp; five other agents (Codex CLI, Cursor, Gemini CLI, Aider, Amp) have `unverified` stubs.
  - ✅ Last-verified convention canonical in AGENT-COMPAT.md §"Reading the cells": format (`vX.Y.Z · YYYY-MM[-DD] (context-tag)`), three tiers (dogfooded / docs-only / unverified), update obligation, cross-reference.
  - ✅ AGENT-COMPAT.md scope note links to `../claude/CAPABILITIES.md` (concrete) and `PLATFORMS.md#non-claude-capability-triggers` (concrete).
  - ✅ AGENT-NEUTRALITY.md has near-neighbor bullet for `claude/CAPABILITIES.md`.
  - ✅ `claude/CAPABILITIES.md` added to `_project/tasknote/README.md` §"AI-referenced docs".
  - ✅ CAPABILITIES.md Pattern note: `(for CORE-224.4)` task-tracking tag removed; anchor link in place.
  - ✅ Commands/skills count: 21/21 (matches PLATFORMS.md §"Worked example: Claude Code").
  - ✅ Contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched; no wiring bundles created.

- **One genuine finding — PLATFORMS.md "Today's surface" table missing Gemini CLI:**
  - Table row 2 lists: "Codex CLI, Cursor, Sourcegraph Amp, Aider, Grok Build" — 5 agents, no Gemini CLI.
  - AGENT-COMPAT.md matrix lists 7 agents (includes Gemini CLI); PLATFORMS.md §"Non-Claude capability triggers" includes a Gemini CLI stub; PLATFORMS.md's own pre-adoption footer (line 81) mentions Gemini CLI.
  - The AGENT-COMPAT.md pointer ("For the at-a-glance per-agent view...see AGENT-COMPAT.md") partially mitigates, but the table itself is stale.
  - Fix: add `, Gemini CLI` to the "Codex CLI, Cursor, Sourcegraph Amp, Aider, Grok Build" cell.

Discovery surfaced no significant scope deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — PLATFORMS.md "Today's surface" table existing row pattern used; extending a cell by adding one agent name.

- [x] Implemented the minimal solution — added `, Gemini CLI` to the second row of PLATFORMS.md §"Today's surface" table: "Codex CLI, Cursor, Sourcegraph Amp, Aider, **Gemini CLI**, Grok Build" (alphabetically positioned between Aider and Grok Build).

- [x] Updated/added tests for non-trivial behavior — N/A (markdown doc; no executable surface).

**Implementation Notes:**

- `docs/PLATFORMS.md` — single cell edit: "Codex CLI, Cursor, Sourcegraph Amp, Aider, Grok Build" → "Codex CLI, Cursor, Sourcegraph Amp, Aider, Gemini CLI, Grok Build". Table now lists 6 contract-only agents, matching AGENT-COMPAT.md's 7-row matrix (1 wiring + 6 contract-only). No other changes.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown doc; no executable surface).

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass run instead.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass on PLATFORMS.md table edit: "Today's surface" table now lists Codex CLI, Cursor, Sourcegraph Amp, Aider, Gemini CLI, Grok Build (6 contract-only agents) ✓ · matches AGENT-COMPAT.md 7-row matrix (1 wiring + 6 contract-only) ✓ · matches PLATFORMS.md §"Non-Claude capability triggers" stubs (Grok + 5 others including Gemini CLI) ✓ · matches PLATFORMS.md pre-adoption footer (line 81) listing ✓ · no trailing whitespace ✓ · contract layer untouched ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 11 AI-referenced docs walked:
  - `README.md` — no change
  - `SPEC.md` — no change
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — no change
  - `docs/PLATFORMS.md` — **updated** (added Gemini CLI to §"Today's surface" table; now 6 contract-only agents consistent with AGENT-COMPAT.md)
  - `claude/CAPABILITIES.md` — no change (canonical last-verified stamp, no provisional language; all cross-refs valid)
  - `docs/AGENT-COMPAT.md` — no change (7-row matrix, canonical last-verified convention, all cross-refs valid)

- [x] Closed — PLAN.md `.6` and parent `CORE-EPIC-224` lines flipped to stub form `Completed 2026-05-30.`; parent + all children moved to `## Completed`; tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (surfaces at the 📦 ready-to-commit gate, or inline on conditional skip).

**Final Summary:**

Closed CORE-EPIC-224 (agent-compatibility-surface) with the final audit subtask. All five deliverables verified: `docs/AGENT-COMPAT.md` 7-row matrix, `claude/CAPABILITIES.md` 5-trigger reference, `docs/PLATFORMS.md §"Non-Claude capability triggers"`, last-verified convention, and cross-ref/doc-drift wiring. One genuine inconsistency found and fixed inline: PLATFORMS.md §"Today's surface" table was missing Gemini CLI (present in AGENT-COMPAT.md matrix and the non-Claude triggers section) — added to the table cell. All other cross-references, stamps, and doc-drift touchpoints verified correct. Contract layer untouched throughout the epic.

**Archived:** 2026-05-30
