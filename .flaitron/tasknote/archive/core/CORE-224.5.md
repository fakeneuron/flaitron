---
title: last-verified-currency
status: completed
tags: []
created: 2026-05-30
due:
related-tasks: [CORE-EPIC-224, CORE-224.1, CORE-224.4, CORE-224.6]
---

# CORE-224.5 | last-verified-currency

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-224]]

## 🎯 Goal

Formalize the `last-verified vX/date` note convention in `docs/AGENT-COMPAT.md`, remove provisional caveats from `claude/CAPABILITIES.md`, and add `claude/CAPABILITIES.md` to the doc-drift sweep so the surface stays verifiable at every Phase 4 closure.

## ✅ Acceptance

- [ ] `docs/AGENT-COMPAT.md` "Reading the cells" → Last verified bullet is canonical: no "provisional" language, full format + tier definitions present
- [ ] `claude/CAPABILITIES.md` "Last verified" section carries the stamp only — no "convention is provisional / formalized by CORE-224.5" caveat
- [ ] `claude/CAPABILITIES.md` added to `_project/tasknote/README.md` §"AI-referenced docs"
- [ ] Audit .6 PLAN.md description already references last-verified notes (verify only — no edit needed)
- [ ] No wiring bundles created; contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched

## 🧩 Subtasks

- [ ] Formalize convention in `docs/AGENT-COMPAT.md` — upgrade Last verified bullet in "Reading the cells" to canonical definition (format, tier table, update obligation)
- [ ] Remove provisional caveat from `claude/CAPABILITIES.md` "Last verified" section
- [ ] Add `claude/CAPABILITIES.md` to `_project/tasknote/README.md` §"AI-referenced docs"
- [x] Phase 3 markdown mental-pass
- [ ] Phase 4 closure

## 🔗 Related

- [[CORE-EPIC-224]] — parent epic (agent-compatibility-surface)
- [[CORE-224.1]] — Discovery; locked this child's scope
- [[CORE-224.4]] — nonclaude-triggers; noted `claude/CAPABILITIES.md` not yet in AI-referenced docs as `.5`'s deliverable
- [[CORE-224.6]] — closing audit; its PLAN.md description already includes "last-verified notes" as a verification target

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All four predecessor subtasks are closed. AGENT-COMPAT.md and CAPABILITIES.md both carry "provisional" caveats pointing here. `.4`'s Phase 4 notes explicitly name `claude/CAPABILITIES.md` as "not yet in AI-referenced docs — `.5`'s deliverable." The .6 PLAN.md line already says "Verify doc currency, per-agent trigger wiring, last-verified notes" — audit touchpoint is already wired. All dependencies cleared.

- [x] Read relevant source files — `docs/AGENT-COMPAT.md` (provisional Last verified bullet in "Reading the cells"; matrix rows carry stamps already), `claude/CAPABILITIES.md` (provisional Last verified section with caveat to remove), `_project/tasknote/README.md` §"AI-referenced docs" (AGENT-COMPAT.md present; CAPABILITIES.md absent), `docs/PLATFORMS.md` §"Non-Claude capability triggers" (per-agent last-verified stamps: no provisional language), CORE-224.4 archive (explicit `.5` deliverable noted)

- [x] **Archive skim** — CORE-224.1–4 archives read. .4's Final Summary explicitly notes the doc-drift sweep entry for CAPABILITIES.md as `.5`'s deliverable. Prior tasknotes (CORE-042, CORE-057, CORE-154, CORE-194, CORE-195, CORE-198) touched README.md AI-referenced docs; none touched `claude/CAPABILITIES.md` (created by .3). No conflicts.

- [x] **Drift check** — `docs/AGENT-COMPAT.md` ✓ (provisional bullet intact), `claude/CAPABILITIES.md` ✓ (provisional caveat intact: "convention is provisional and is formalized by `CORE-224.5`"), `_project/tasknote/README.md` §"AI-referenced docs" ✓ (CAPABILITIES.md absent as expected), `docs/PLATFORMS.md` last-verified stamps ✓ (no provisional language — no edit needed there). .6 PLAN.md line ✓ ("last-verified notes" present in description). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Explicit assumptions:
  - Convention home: `docs/AGENT-COMPAT.md` "Reading the cells" → Last verified bullet — already the provisional home; upgrade to canonical there
  - Convention format: `vX.Y.Z · YYYY-MM[-DD] (context-tag)` where context-tag is `dogfooded` / `docs-only · YYYY-MM (pre-adoption)` / `unverified`
  - `docs/PLATFORMS.md` needs no edit — per-agent last-verified stamps are already in place with no provisional language
  - `docs/CONVENTIONS.md` needs no edit — the convention definition lives in AGENT-COMPAT.md
  - README.md entry for CAPABILITIES.md: one-line, matches existing style

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

- **Provisional language locations confirmed:** (1) `docs/AGENT-COMPAT.md` "Reading the cells" Last verified bullet: "convention is provisional in this scaffold and is formalized by `CORE-224.5`" — replace with canonical definition. (2) `claude/CAPABILITIES.md` Last verified section: two-sentence provisional caveat — remove, leaving just the stamp.
- **Convention tiers in use:** `v4.3.0 · 2026-05-30 (dogfooded)` (Claude Code row + CAPABILITIES.md), `docs-only · 2026-05 (pre-adoption)` (Grok Build), `unverified` (Codex CLI, Cursor, Gemini CLI, Aider, Amp). Convention definition must cover all three tiers.
- **`.4` explicit callout:** "claude/CAPABILITIES.md (not yet in AI-referenced docs — `.5`'s deliverable)" — the README.md edit is mandatory.
- **.6 touchpoint already wired:** PLAN.md description "Verify doc currency, per-agent trigger wiring, last-verified notes" — no edit to PLAN.md or SPEC needed. Constitution P3 (zero automation) means the maintenance is always manual; the touchpoint is the audit wording.
- Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — convention definition extends the existing provisional bullet in `docs/AGENT-COMPAT.md` "Reading the cells"; README.md entry follows the `- \`path\` — one-line purpose` pattern already in use.

- [x] Implemented the minimal solution — formalized convention in AGENT-COMPAT.md; removed provisional caveat from CAPABILITIES.md; added CAPABILITIES.md to README.md AI-referenced docs.

- [x] Updated/added tests for non-trivial behavior — N/A (markdown docs; no executable surface).

**Implementation Notes:**

- `docs/AGENT-COMPAT.md` — "Reading the cells" Last verified bullet replaced with canonical definition: format (`vX.Y.Z · YYYY-MM[-DD] (context-tag)`), tier table (dogfooded / docs-only / unverified), update obligation, and cross-reference to per-agent trigger-reference Last verified sections. "Provisional" language removed entirely.
- `claude/CAPABILITIES.md` — Last verified section: removed two-sentence provisional caveat; stamp line kept + added cross-reference pointer to AGENT-COMPAT.md §"Reading the cells" for the format contract.
- `_project/tasknote/README.md` §"AI-referenced docs" — added `claude/CAPABILITIES.md` entry (before AGENT-COMPAT.md, as a wiring-layer doc with a last-verified stamp); entry carries an explicit "doc-drift sweep should verify on each version bump" note.
- `docs/PLATFORMS.md` — no edit; per-agent last-verified stamps already in final form with no provisional language.
- .6 PLAN.md description already carries "last-verified notes" — audit touchpoint verified, no edit needed. Contract layer untouched.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown docs; no executable surface).

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass run instead.

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass: AGENT-COMPAT.md Last verified bullet canonical (no "provisional" language; format line, tier sub-list, update obligation, cross-reference ✓) · CAPABILITIES.md Last verified stamp line kept + pointer to AGENT-COMPAT.md §"Reading the cells" ✓ · relative link `../docs/AGENT-COMPAT.md` from `claude/` resolves ✓ · AGENT-COMPAT.md link `../claude/CAPABILITIES.md` resolves ✓ · README.md AI-referenced docs entry added above AGENT-COMPAT.md ✓ · contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched ✓ · no new wiring bundles ✓ · .6 PLAN.md description "last-verified notes" verified present ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`: **no change**. `docs/AGENT-COMPAT.md`: **updated** (Last verified bullet formalized). `claude/CAPABILITIES.md`: **updated** (provisional caveat removed; pointer to AGENT-COMPAT.md §"Reading the cells" added); first sweep entry for this doc.

- [x] Closed — PLAN.md `.5` line flipped to stub form `Completed 2026-05-30.` (stays under `CORE-EPIC-224`; parent stays open until `.6` closes); tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (bundled into closure below).

**Final Summary:**

Formalized the `last-verified vX/date` convention in `docs/AGENT-COMPAT.md` §"Reading the cells": replaced provisional placeholder with a canonical definition covering format (`vX.Y.Z · YYYY-MM[-DD] (context-tag)`), three tiers (dogfooded / docs-only / unverified), update obligation, and cross-reference to per-agent trigger-reference Last verified sections. Removed the "convention is provisional" caveat from `claude/CAPABILITIES.md` and replaced it with a compact stamp line + pointer to the canonical definition. Added `claude/CAPABILITIES.md` to `_project/tasknote/README.md` §"AI-referenced docs" (explicitly noted as this task's deliverable in CORE-224.4's closure). Audit .6 touchpoint verified present in PLAN.md description ("last-verified notes"). No wiring bundles created. Contract layer untouched.

**Archived:** 2026-05-30
