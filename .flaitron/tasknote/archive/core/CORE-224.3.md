---
title: claude-triggers
status: completed
tags: []
created: 2026-05-30
related-tasks: [CORE-EPIC-224, CORE-224.1, CORE-224.2, CORE-224.4, CORE-224.5]
---

# CORE-224.3 | claude-triggers

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-224]]

## 🎯 Goal

Document Claude Code's capability triggers in the `claude/` wiring layer
(effort/thinking, `--fast`/`-f`, `/model`, `/clear`, structured-ask) as a
reusable per-agent trigger reference, establishing the pattern `.4` mirrors
for non-Claude agents.

## ✅ Acceptance

- [ ] A Claude-Code capability-trigger reference exists in `claude/`, covering the five triggers: effort/thinking levels, `--fast`/`-f`, `/model`, `/clear`, structured-ask
- [ ] Each trigger entry follows one consistent, reusable shape (so `.4` can mirror it for non-Claude agents) — what it is · syntax · what it controls in flowtron · when to reach for it
- [ ] Each Claude-specific surface cross-checked against `docs/AGENT-NEUTRALITY.md`; new rows added only if a *contract-layer* surface is uncovered (wiring-layer content under `claude/` does not get rows by the ledger's own design)
- [ ] Initial provisional last-verified note stamped (mirrors `.2`'s `v4.3.0 · 2026-05-30`; formal convention deferred to `.5`)
- [ ] Contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched
- [ ] Phase 4 doc-drift sweep across the AI-referenced docs

## 🧩 Subtasks

- [ ] Resolve the trigger-doc filename/location within `claude/` (clarifying ask)
- [ ] Write the trigger reference: intro + audience + one consistent per-trigger shape × 5 triggers + last-verified stamp + Related
- [ ] Cross-check each of the 5 triggers against the AGENT-NEUTRALITY.md ledger; record the verdict; add a row / near-neighbor mention only if warranted
- [ ] Add a concrete cross-link to the new doc from `docs/AGENT-COMPAT.md` §"Scope of this matrix" (replaces the generic "Claude's in `claude/`")
- [ ] Phase 3: markdown mental-pass (table/section render, cross-refs, no contract-layer edits)
- [ ] Phase 4: doc-drift sweep + flip PLAN line to stub + archive tasknote

## 🔗 Related

- [[CORE-EPIC-224]] — parent epic (agent-compatibility-surface)
- [[CORE-224.1]] — Discovery; locked this child's scope (Constitution + 4-child split + Clarifications)
- [[CORE-224.2]] — the matrix scaffold this trigger detail sits behind; its scope note points here
- [[CORE-224.4]] — non-Claude triggers (Grok-first); reuses the pattern this child establishes
- [[CORE-224.5]] — last-verified currency convention; finalizes the stamp this child applies provisionally

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `.1` Discovery (archived) locked this child's scope verbatim — Claude trigger reference in `claude/`, the five named triggers, pattern-establishing for `.4`, ledger cross-check, provisional last-verified stamp, contract untouched. `.2` (matrix scaffold) closed and explicitly defers capability-trigger detail to this child. All dependencies cleared.

- [x] Read relevant source files — `docs/AGENT-COMPAT.md` (matrix + its scope note deferring triggers here), `docs/AGENT-NEUTRALITY.md` (the ledger to cross-check), `docs/PLATFORMS.md` (Grok footer / pre-adoption pattern + two-layer model), `claude/AGENTS-snippet.md` (existing `claude/` doc shape), `_project/tasknote/README.md` §"AI-referenced docs", `templates/tasknote-template.md`, and the `.1`/`.2` archives.

- [x] **Archive skim** — `CORE-224.1.md` (Constitution + 4-child Specification + Clarifications) and `CORE-224.2.md` (matrix scaffold; its assumption #1 keeps triggers out of the matrix and explicitly hands them to `.3`/`.4`) are the load-bearing precedents. CORE-154 cohort is the structural precedent (contract/wiring split, AGENT-NEUTRALITY ledger, PLATFORMS plug-in pattern). No prior tasknote created a `claude/`-level reference doc — this child establishes the first one.

- [x] **Drift check** — all cited paths exist (`docs/AGENT-COMPAT.md`, `docs/AGENT-NEUTRALITY.md`, `docs/PLATFORMS.md`, `claude/AGENTS-snippet.md`); the AGENT-COMPAT scope note already reserves "Claude's in `claude/`" for this doc; no `claude/`-level reference doc exists yet (correct — this child creates it). No drift.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **One ask (structured), resolved 2026-05-30:** trigger-doc filename within `claude/` → **`claude/CAPABILITIES.md`** (user pick). Doc stays scoped to the five operator capability triggers despite the broader name (no scope creep); title frames it around capability triggers.

- [x] Subtasks above populated with concrete, ordered steps — filename resolved; remaining subtasks unchanged.

**Discovery Notes:**

- **Filename:** `claude/CAPABILITIES.md` (resolved via structured ask). Scope held to the five triggers; broader name does not widen scope.
- **Scope boundary that matters most:** this child writes the *Claude* trigger reference and the *reusable shape*. `.4` reuses that shape for non-Claude agents in `docs/PLATFORMS.md` (per the AGENT-COMPAT scope note: "the priority non-Claude agents elsewhere in the platform docs") — a different file, same pattern. So the pattern must be portable, not Claude-coupled in structure.
- **Ledger cross-check (preliminary):** the new doc is **wiring-layer** (`claude/`), and AGENT-NEUTRALITY.md tracks only *contract-layer* Claude-specific references. All five triggers already carry ledger coverage for their contract-layer mentions: `--fast`/`-f` (row), `/clear` + `/model` (row), structured-ask (Tool-call-specific terminology table), effort↔`[heavy]`/`[light]` (the `SPEC/model.md` rows). The new doc introduces no *new contract-layer* surface → no new formal row expected; a near-neighbor mention (like the existing `claude/AGENTS-snippet.md` note) is the proportionate touch. Final verdict recorded in Phase 2.
- **Last-verified:** mirror `.2`'s provisional form (`v4.3.0 · 2026-05-30`); `.5` finalizes the convention. Do not pre-empt `.5`.
- **AI-referenced-docs registration deferred to `.5`:** wiring the trigger doc into the doc-drift sweep / cold-start set is explicitly `.5`'s deliverable ("wire a maintenance touchpoint into the audit .6 acceptance + the doc-drift sweep"). Not added to `README.md` §"AI-referenced docs" here.
- Discovery surfaced no significant deviation (one routine filename clarification; same files, same approach) → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — `docs/AGENT-COMPAT.md` + `docs/PLATFORMS.md` are the flowtron reference-doc format precedent (intro + audience + scope/pattern note + table + last-verified/pre-adoption + Related); `claude/AGENTS-snippet.md` confirms `claude/`-level docs share that markdown shape. Extended it rather than inventing a new shape.

- [x] Implemented the minimal solution — created `claude/CAPABILITIES.md`; added a near-neighbor bullet to `docs/AGENT-NEUTRALITY.md` §"Out of scope for this ledger"; made the `docs/AGENT-COMPAT.md` scope-note reference a concrete link to the new doc.

- [x] Updated/added tests for non-trivial behavior — N/A (markdown docs; no executable surface).

**Implementation Notes:**

- `claude/CAPABILITIES.md` — intro + audience + a `> Pattern note (for CORE-224.4)` calling out the fixed per-trigger shape (**what it is · syntax · what it controls in flowtron · when to reach for it**) so `.4` can mirror it; a 5-row trigger table (effort/thinking, `--fast`/`-f`, `/model`, `/clear`, structured ask); an §"Agent-neutrality cross-check"; a provisional §"Last verified" (`v4.3.0 · 2026-05-30`, convention deferred to `.5`); Related.
- **Ledger cross-check verdict (final):** all five triggers already carry contract-layer ledger coverage; the new doc is wiring-layer and introduces **no new contract-layer surface** → **no new formal table row**. Recorded instead as a near-neighbor bullet in §"Out of scope for this ledger", alongside `claude/AGENTS-snippet.md`.
- `docs/AGENT-COMPAT.md` — the scope-note phrase "Claude's in `claude/`" is now a concrete link to `../claude/CAPABILITIES.md` (the doc it had reserved).
- Contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched — only `claude/` + `docs/` (the two ledger/matrix docs) edited.
- Pattern portability held: the trigger shape is Claude-coupled only in cell contents; `.4` reuses the columns for non-Claude agents in `docs/PLATFORMS.md`.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-prose only; no code touched).

- [x] Ran lint/type-check on changed code — N/A; markdown mental-pass run instead (see notes).

- [x] (frontend) Asked the user for visual confirmation — N/A (no frontend surface).

**Testing Notes:**

Markdown mental-pass: `claude/CAPABILITIES.md` trigger table well-formed (5-col header / separator / 5 rows aligned) ✓ · relative links from `claude/` use `../docs/...` and resolve ✓ · `docs/AGENT-COMPAT.md` → `../claude/CAPABILITIES.md` resolves ✓ · `docs/AGENT-NEUTRALITY.md` near-neighbor bullet uses code-span form matching the sibling `AGENTS-snippet.md` entry ✓ · wikilinks `[[CORE-EPIC-224]]` / `[[CORE-224.2]]` / `[[CORE-224.4]]` follow the accepted pattern ✓ · no trailing whitespace ✓.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `README.md`, `SPEC.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`: **no change**. `docs/AGENT-NEUTRALITY.md`: **updated** (near-neighbor bullet for `claude/CAPABILITIES.md` in §"Out of scope for this ledger"). `docs/AGENT-COMPAT.md`: **updated** (scope-note phrase now links to the new doc). `claude/CAPABILITIES.md` is **new** (this task) and is intentionally **not** registered in §"AI-referenced docs" — that wiring is `CORE-224.5`'s deliverable.

- [x] Closed — PLAN.md `.3` line flipped to stub form `Completed 2026-05-30.` (stays under `CORE-EPIC-224`; parent stays open until `.4`–`.6` close); tasknote moved to `_project/tasknote/archive/core/`.

- [x] Recap drafted (bundled into the closure marker below).

**Final Summary:**

Created `claude/CAPABILITIES.md` — the Claude Code capability-trigger reference in the wiring layer, covering the five operator triggers (effort/thinking level, `--fast`/`-f`, `/model`, `/clear`, structured ask) in one fixed, portable shape (what it is · syntax · what it controls in flowtron · when to reach for it). A `> Pattern note` flags that shape for `CORE-224.4` to mirror for non-Claude agents in `docs/PLATFORMS.md`. Ledger cross-check verdict: all five triggers already carry contract-layer coverage in `docs/AGENT-NEUTRALITY.md`; the new doc is wiring-layer and adds no new contract-layer surface → no new formal row, recorded instead as a near-neighbor bullet alongside `claude/AGENTS-snippet.md`. Stamped a provisional `v4.3.0 · 2026-05-30` last-verified note (convention finalized in `.5`). Linked the `docs/AGENT-COMPAT.md` scope note to the new doc. Contract layer (`SPEC.md`, `SPEC/`, `templates/`) untouched.

**Archived:** 2026-05-30
