---
title: nonclaude-triggers
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: [CORE-EPIC-224, CORE-224.1, CORE-224.2, CORE-224.3, CORE-224.5]
---

# CORE-224.4 | nonclaude-triggers

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-224]]

## 🎯 Goal

Document non-Claude capability triggers in `docs/PLATFORMS.md` using `.3`'s fixed trigger shape (what it is · syntax · what it controls in flowtron · when to reach for it), covering Grok Build in full and five other agents (Codex, Cursor, Gemini CLI, Aider, Amp) as shallow stubs, with pre-adoption-verification framing throughout.

## ✅ Acceptance

- [ ] A "Non-Claude capability triggers" section exists in `docs/PLATFORMS.md`, mirroring the per-trigger shape from `claude/CAPABILITIES.md`
- [ ] Grok Build trigger reference is complete: all five trigger categories addressed (reasoning depth, force-skip, model switch, context freshness, structured ask) using the same 4-column table shape
- [ ] Codex CLI, Cursor, Gemini CLI, Aider, Sourcegraph Amp appear as shallow stubs with honest "no trigger research conducted" framing
- [ ] Pre-adoption-verification framing throughout — mirrors PLATFORMS.md §"Grok Build adoption notes" footer; no claims beyond vendor documentation
- [ ] Per-agent last-verified notes stamped (`docs-only · 2026-05 (pre-adoption)` for Grok Build; `unverified` for remainder)
- [ ] No wiring bundles shipped (`grok/`, `codex/`, etc. directories not created)
- [ ] AGENT-COMPAT.md scope note updated to link concretely to the new section (replaces "elsewhere in the platform docs")
- [ ] Contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched
- [ ] Phase 4 doc-drift sweep across AI-referenced docs

## 🧩 Subtasks

- [x] Add "## Non-Claude capability triggers" section to `docs/PLATFORMS.md` after §"Grok Build adoption notes" — intro + Grok Build trigger table (5 categories × 4 columns) + shallow stubs for Codex CLI, Cursor, Gemini CLI, Aider, Sourcegraph Amp + per-agent last-verified stamps
- [x] Update AGENT-COMPAT.md scope note: replace "elsewhere in the platform docs" with a concrete link to the new PLATFORMS.md section
- [x] Remove the task-tracking `(for CORE-224.4)` reference from the Pattern note in `claude/CAPABILITIES.md` (the note stays — its guidance remains useful — but the task-ID tag becomes stale once this child lands)
- [x] Phase 3: markdown mental-pass (table render, cross-refs, no contract-layer edits)
- [x] Phase 4: doc-drift sweep + flip PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-224]] — parent epic (agent-compatibility-surface)
- [[CORE-224.1]] — Discovery; locked this child's scope
- [[CORE-224.2]] — matrix scaffold; its scope note references "the priority non-Claude agents elsewhere in the platform docs"
- [[CORE-224.3]] — Claude trigger reference; establishes the shape this child mirrors
- [[CORE-224.5]] — last-verified currency convention; finalizes the stamp this child applies provisionally

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.1` Discovery locked this child's scope verbatim — non-Claude trigger references in `docs/PLATFORMS.md`, Grok Build in full, five other agents as shallow stubs. `.3` is complete and `claude/CAPABILITIES.md` exists with a Pattern note pointing `.4` here, confirming the 5-column shape. `docs/AGENT-COMPAT.md` scope note already defers non-Claude triggers to "elsewhere in the platform docs" (= PLATFORMS.md). All dependencies cleared.

- [x] Read relevant source files — `claude/CAPABILITIES.md` (pattern to mirror; its Pattern note explicitly targets `.4` + PLATFORMS.md), `docs/PLATFORMS.md` (target file; §"Grok Build adoption notes" covers context-load + skill primitives; trigger section goes after it), `docs/AGENT-COMPAT.md` (scope note + matrix; Grok row `docs-only · 2026-05`, others `unverified`), `_project/tasknote/README.md` §"AI-referenced docs", CORE-224.3 archive (shape confirmation + placement decision).

- [x] **Archive skim** — CORE-224.1/2/3 archives are the load-bearing precedents (all read). CORE-219 touched PLATFORMS.md only in a no-change doc-drift pass. No prior tasknote created a non-Claude trigger reference — this child is first. CORE-154.4 (platforms-doc, archived) created PLATFORMS.md as the structural companion; the placement decision is confirmed from its `docs/` location and AGENT-COMPAT.md references.

- [x] **Drift check** — all cited paths exist: `claude/CAPABILITIES.md` ✓, `docs/PLATFORMS.md` ✓, `docs/AGENT-COMPAT.md` ✓. Pattern note in CAPABILITIES.md confirms "Non-Claude agents … filed in `../docs/PLATFORMS.md`" ✓. Grok Build adoption notes section in PLATFORMS.md exists as the anchor ✓. AGENT-COMPAT.md lists the six contract-only agents correctly ✓. No `grok/`, `codex/` dirs exist ✓. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions:
  - New section title: `## Non-Claude capability triggers` placed after `## Grok Build adoption notes` and before `## When this doc is useful`
  - Grok Build "full" = 5-row trigger table using the same 4-column shape as CAPABILITIES.md, populated from vendor documentation (pre-adoption)
  - "Shallow stubs" = brief stub paragraph per agent (no trigger research, `unverified`, update-on-first-use prompt)
  - AGENT-COMPAT.md scope note update: "elsewhere in the platform docs" → concrete anchor link to the new PLATFORMS.md section
  - Remove `(for CORE-224.4)` task-tracking tag from CAPABILITIES.md Pattern note; the guidance itself stays
  - Last-verified stamps: Grok Build `docs-only · 2026-05 (pre-adoption)`; remaining five `unverified`

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Placement confirmed:** `## Non-Claude capability triggers` after `## Grok Build adoption notes` in `docs/PLATFORMS.md`. CAPABILITIES.md Pattern note and AGENT-COMPAT.md scope note both explicitly target PLATFORMS.md as the home for non-Claude triggers.
- **Pattern shape (from CAPABILITIES.md):** 4-column table: `Trigger | Syntax | What it controls in flowtron | When to reach for it`. Five trigger categories: effort/thinking level, force-skip (`--fast` equivalent), model switch, context freshness, structured ask. For non-Claude agents, cell contents replace Claude-specific syntax with the agent's equivalent or a "no equivalent / pre-adoption" note.
- **Grok Build trigger research (pre-adoption):** (1) Effort/thinking — grok-4 has extended thinking per launch coverage; syntax is model selection at session start; maps to `[heavy]`/`[light]`. (2) Force-skip — no `--fast` equivalent without a shipped bundle; skills accept args but no flowtron bundle exists; note that a future `grok/` contributor could mirror the arg. (3) Model switch — session-level (not in-session); closest equivalent is restarting with a different model flag. (4) Context freshness — new session; no `/clear` in-session command. (5) Structured ask — no equivalent to AskUserQuestion; contract falls back to prose ask.
- **Shallow stubs (Codex, Cursor, Gemini CLI, Aider, Amp):** One brief paragraph each: agent consumes flowtron via contract-only, no trigger research conducted, `unverified` stamp, update-on-first-use instruction.
- **CAPABILITIES.md Pattern note cleanup:** the `(for CORE-224.4)` tag is a task-tracking artifact; once `.4` lands, it becomes a stale reference in the text. Removing it and tightening the note to be permanently useful costs one line edit.
- **AGENT-COMPAT.md update:** scope note currently says "the priority non-Claude agents elsewhere in the platform docs" — post-`.4`, replace with a concrete anchor link, e.g. "in [`PLATFORMS.md` §"Non-Claude capability triggers"](PLATFORMS.md)".
- Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `claude/CAPABILITIES.md` is the established pattern (4-column trigger table, pre-adoption-verification footer, last-verified stamp); `docs/PLATFORMS.md` §"Grok Build adoption notes" provides the matching prose/table/footer shape already in use. Extended both rather than inventing new forms.

- [x] Implemented the minimal solution — added `## Non-Claude capability triggers` section to `docs/PLATFORMS.md` (Grok Build trigger table + five shallow stubs + per-agent last-verified stamps); updated `docs/AGENT-COMPAT.md` scope note to link concretely to the new section; removed the `(for CORE-224.4)` task-tracking tag from `claude/CAPABILITIES.md` Pattern note and added an anchor link matching the new section.

- [x] Updated/added tests for non-trivial behavior — N/A (markdown docs; no executable surface).

**Implementation Notes:**

- `docs/PLATFORMS.md` — new `## Non-Claude capability triggers` section added after `## Grok Build adoption notes`, before `## When this doc is useful`. Intro paragraph frames pre-adoption posture. Grok Build: 5-row trigger table (effort/thinking, force-skip, model/session switch, context freshness, structured ask) × 4 columns, followed by a pre-adoption-verification footer matching the existing Grok Build adoption notes style, and a `Last verified: docs-only · 2026-05 (pre-adoption)` stamp. Codex CLI, Cursor, Gemini CLI, Aider, Sourcegraph Amp: one paragraph each (contract-only, no trigger research, AGENT-COMPAT.md pointer, update-on-first-use), with `unverified` stamp.
- `docs/AGENT-COMPAT.md` — scope note phrase "the priority non-Claude agents elsewhere in the platform docs" replaced with a concrete anchor link to `PLATFORMS.md#non-claude-capability-triggers`.
- `claude/CAPABILITIES.md` — Pattern note: removed `(for CORE-224.4)` task-tracking tag; added anchor link to the new PLATFORMS.md section in place of the bare file reference. Note itself remains useful as permanent cross-platform guidance.
- No wiring bundles created. Contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown docs; no executable surface).

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass run instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass: new `## Non-Claude capability triggers` section in PLATFORMS.md well-formed (4-col table header + separator + 5 data rows ✓; prose stubs × 5 ✓; pre-adoption footer + per-agent stamps ✓) · anchor `#non-claude-capability-triggers` matches heading ✓ · relative link `../claude/CAPABILITIES.md` from `docs/` resolves ✓ · `AGENT-COMPAT.md` link from stubs resolves ✓ · AGENT-COMPAT.md scope note anchor link `PLATFORMS.md#non-claude-capability-triggers` resolves ✓ · CAPABILITIES.md Pattern note: no task-tracking tag, anchor link matches ✓ · contract layer untouched ✓ · no `grok/` or `codex/` dirs created ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`: **no change**. `docs/PLATFORMS.md`: **updated** (new `## Non-Claude capability triggers` section with Grok Build trigger table + five shallow stubs + per-agent last-verified stamps). `docs/AGENT-COMPAT.md`: **updated** (scope note now links concretely to `PLATFORMS.md#non-claude-capability-triggers`). `claude/CAPABILITIES.md` (not yet in AI-referenced docs — `.5`'s deliverable): **updated** (Pattern note cleanup).

- [x] Closed — PLAN.md `.4` line flipped to stub form `Completed 2026-05-30.` (stays under `CORE-EPIC-224`; parent stays open until `.5`–`.6` close); tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the closure marker below).

**Final Summary:**

Added `## Non-Claude capability triggers` to `docs/PLATFORMS.md` — the non-Claude capability-trigger reference, mirroring `claude/CAPABILITIES.md`'s fixed 4-column shape (what it is · syntax · what it controls in flowtron · when to reach for it). Grok Build receives a full 5-row trigger table (effort/thinking, force-skip, model/session switch, context freshness, structured ask) with pre-adoption-verification framing and a `docs-only · 2026-05 (pre-adoption)` last-verified stamp; Codex CLI, Cursor, Gemini CLI, Aider, and Sourcegraph Amp receive brief `unverified` stubs. Updated `docs/AGENT-COMPAT.md`'s scope note from a vague "elsewhere in the platform docs" to a concrete anchor link. Cleaned up `claude/CAPABILITIES.md`'s Pattern note (removed the task-tracking `(for CORE-224.4)` tag; added the anchor link). No wiring bundles created. Contract layer untouched.

**Archived:** 2026-05-30
