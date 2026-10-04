---
title: compat-matrix
status: completed
tags: []
created: 2026-05-30
related-tasks: [CORE-EPIC-224, CORE-224.1, CORE-224.3, CORE-224.4, CORE-224.5]
---

# CORE-224.2 | compat-matrix

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-224]]

## 🎯 Goal

Create `docs/AGENT-COMPAT.md` — the canonical living matrix scaffold for the
7 in-scope agents (consume-mode, context entry-point, skill/command primitive,
last-verified), cross-linked from `PLATFORMS.md` and registered in the
self-host AI-referenced docs.

## ✅ Acceptance

- [ ] `docs/AGENT-COMPAT.md` exists with a matrix covering all 7 agents (Claude Code, Grok Build, Codex CLI, Cursor, Gemini CLI, Aider, Sourcegraph Amp)
- [ ] Matrix carries the four scaffold columns: consume-mode · context entry-point · skill/command primitive · last-verified
- [ ] No agent-specific **capability trigger** (effort levels, `--fast`, context-load quirks) appears — those are deferred to the `.3`/`.4` trigger docs; the matrix stays structural/meta
- [ ] Reconciles with (does not duplicate/contradict) `PLATFORMS.md` §"Today's surface"; pre-adoption framing on the 6 unshipped agents mirrors the existing Grok Build footer
- [ ] `docs/PLATFORMS.md` cross-links to `AGENT-COMPAT.md`
- [ ] `_project/tasknote/README.md` §"AI-referenced docs" gains an `AGENT-COMPAT.md` entry
- [ ] Contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched
- [ ] Phase 4 doc-drift sweep across the AI-referenced docs

## 🧩 Subtasks

- [ ] Write `docs/AGENT-COMPAT.md`: intro + scope note (structural, not triggers) + 7-row matrix + last-verified cell semantics (provisional; convention finalized in `.5`) + pre-adoption footer + Related
- [ ] Add the new AI-referenced-docs entry to `docs/AGENT-COMPAT.md` purpose line in `_project/tasknote/README.md`
- [ ] Add a cross-link to `AGENT-COMPAT.md` from `docs/PLATFORMS.md` (§"Today's surface" pointer + Related)
- [ ] Phase 3: markdown mental-pass (table render, cross-refs, no contract-layer edits)
- [ ] Phase 4: doc-drift sweep + flip PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-224]] — parent epic (agent-compatibility-surface)
- [[CORE-224.1]] — Discovery; locked the design (Constitution + 4-child split + Clarifications)
- [[CORE-224.3]] — Claude capability triggers; populates trigger detail behind this matrix
- [[CORE-224.4]] — non-Claude capability triggers (Grok-first); feeds rows/cells
- [[CORE-224.5]] — `last-verified` currency convention; finalizes this matrix's last-verified column

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.1` Discovery (archived) locked this child's scope verbatim — new `docs/AGENT-COMPAT.md`, 7-agent set, the four scaffold columns, cross-link + AI-referenced-docs registration. All cleared dependencies; first implementation child of the epic.

- [x] Read relevant source files — `docs/PLATFORMS.md` (§"Today's surface" + Grok footer to reconcile against), `docs/AGENT-NEUTRALITY.md` (ledger), `_project/tasknote/README.md` §"AI-referenced docs", `templates/tasknote-template.md`, and the `.1` Discovery archive (Constitution + Specification + Clarifications).

- [x] **Archive skim** — `_project/tasknote/archive/core/CORE-224.1.md` (this epic's Discovery) is the load-bearing precedent; it carries the locked Constitution (6 CORE-154-inherited principles), the 4-child Specification, and the Clarifications table resolving all scoping. CORE-154 cohort is the structural precedent AGENT-COMPAT builds the capability/currency layer on top of. No prior tasknote touches `docs/AGENT-COMPAT.md` (it doesn't exist yet).

- [x] **Drift check** — `docs/PLATFORMS.md`, `docs/AGENT-NEUTRALITY.md`, `_project/tasknote/README.md` all exist as cited; `docs/AGENT-COMPAT.md` does not yet exist (correct — this child creates it). PLATFORMS.md §"Today's surface" roster = Claude Code + {Codex CLI, Cursor, Amp, Aider, Grok Build} = 6; AGENT-COMPAT adds Gemini CLI for the full 7 per Clarifications Q2. No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" — **No clarifications needed.** The `.1` deep pre-pass resolved all scoping via structured ask. Explicit assumptions for this child:
  1. The matrix is **structural/meta** — its columns are consume-mode, entry-point, primitive, last-verified. Per-agent *capability triggers* (effort levels, `--fast`, context quirks) are out of scope here and land in `.3`/`.4`. The `.2` matrix must not pre-empt them.
  2. **`docs/` is allowed agent-specific content** (Constitution P1's "contract layer" no-leak rule targets `SPEC.md`/`SPEC/`/`templates/`; `docs/` carries agent-specific content with neutral framing, exactly as PLATFORMS.md already does).
  3. **Last-verified cells are provisional in `.2`** — Claude Code dogfooded (`v4.3.0 · 2026-05-30`); the other 6 are pre-adoption/unverified mirroring the Grok footer. The formal `last-verified vX/date` convention is `.5`'s deliverable; `.2` notes this forward-dependency rather than inventing the convention.
  4. **Primitive cells stay at PLATFORMS.md's established depth** — Claude (full `ft-*` bundle) and Grok (`.grok/skills/`, researched) are detailed; the other 5 are "native primitive exists; no flowtron bundle". Deep per-agent primitive survey is `.4`'s job.
  5. **AI-referenced-docs registration is self-host only** (`_project/tasknote/README.md`), not the adopter seed `templates/tasknote-README.md` — AGENT-COMPAT is a flowtron-development doc like PLATFORMS.md / AGENT-NEUTRALITY.md.

- [x] Subtasks above populated with concrete, ordered steps.

**Discovery Notes:**

- **Scope boundary that matters most:** `.2` is the *scaffold*. It builds the table and registers the doc; `.3`/`.4` populate capability-trigger detail; `.5` formalizes the currency mechanism for the last-verified column. Keeping the matrix structural (no trigger leakage) is both an acceptance criterion and the cleanest way to avoid stepping on the later children.
- **Reconciliation with PLATFORMS.md:** AGENT-COMPAT is the *capability/currency* companion; PLATFORMS.md is the *structural* (where-wiring-lives) doc. AGENT-COMPAT references PLATFORMS.md's "Today's surface" for consume-mode rather than re-deriving it — single-source-of-truth (Constitution P5).
- Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `docs/PLATFORMS.md` is the format precedent: a `docs/` markdown doc with intro + audience note + tables + cross-ref'd "Related". AGENT-COMPAT mirrors that shape and references PLATFORMS.md §"Today's surface" for consume-mode rather than re-deriving it (single-source-of-truth, Constitution P5).

- [x] Implemented the minimal solution — created `docs/AGENT-COMPAT.md` (intro + scope note + 7-row matrix + cell-reading guide + pre-adoption footer + Related); added the AI-referenced-docs entry to `_project/tasknote/README.md`; added two cross-links to PLATFORMS.md (§"Today's surface" pointer + Related bullet).

- [x] Updated/added tests for non-trivial behavior — N/A (markdown docs; no executable surface).

**Implementation Notes:**

- `docs/AGENT-COMPAT.md` — 7-row matrix, four scaffold columns. Claude Code = `Wiring + contract` / dogfooded `v4.3.0 · 2026-05-30`; the other 6 = `Contract only`, pre-adoption (Grok `docs-only`, the rest `unverified`). No capability triggers in the matrix — deferred to `.3`/`.4`. Last-verified cell semantics flagged provisional; convention formalized in `.5`.
- Reconciles with PLATFORMS.md rather than duplicating: consume-mode and Grok specifics reference PLATFORMS.md §"Today's surface" / §"Grok Build adoption notes".
- Contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched — confirmed: only `docs/` + `_project/tasknote/README.md` edited.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose only; no code touched).

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass run instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass: AGENT-COMPAT matrix is well-formed (5-column header / separator / 7 rows all aligned) ✓ · relative links (`PLATFORMS.md`, `AGENT-NEUTRALITY.md`, `MIGRATION.md`) resolve within `docs/` ✓ · wikilinks `[[CORE-EPIC-224]]` / `[[CORE-154.4]]` follow the accepted PLATFORMS.md pattern ✓ · PLATFORMS.md back-links to AGENT-COMPAT.md (bidirectional) ✓ · README AI-referenced-docs entry one-line purpose ✓ · no trailing whitespace ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/AGENT-NEUTRALITY.md`: **no change**. `docs/PLATFORMS.md`: **updated** (cross-link pointer in §"Today's surface" + Related bullet). `docs/AGENT-COMPAT.md`: **new** (created this task; registered in the AI-referenced-docs list this sweep walks).

- [x] Closed — PLAN.md `.2` line flipped to stub form `Completed 2026-05-30.` (stays under `CORE-EPIC-224`; parent stays open until `.3`–`.6` close); tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the closure marker below).

**Final Summary:**

Created `docs/AGENT-COMPAT.md` — the canonical living agent-compatibility matrix for the 7 in-scope agents (Claude Code, Grok Build, Codex CLI, Cursor, Gemini CLI, Aider, Sourcegraph Amp) with the four scaffold columns (consume-mode · context entry-point · skill/command primitive · last-verified). Claude Code is the sole `Wiring + contract` / dogfooded row; the other six are `Contract only` with pre-adoption framing mirroring the existing Grok Build footer. The matrix is deliberately structural — no capability triggers leak in (those land in `.3`/`.4`), and the last-verified cell convention is flagged provisional pending `.5`. Cross-linked bidirectionally with `docs/PLATFORMS.md` (its structural companion) and registered in `_project/tasknote/README.md` §"AI-referenced docs". Contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched.

**Archived:** 2026-05-30
