---
title: neutrality-ledger-gaps
status: completed
tags: []
created: 2026-08-24
due:
related-tasks: [CORE-463.N]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
# touches:
#   - path/or/glob
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-466 | neutrality-ledger-gaps

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-463.N]]

## 🎯 Goal

Register the three unledgered contract-layer Claude-specific references in `docs/AGENT-NEUTRALITY.md` and state who owns keeping the ledger current.

## ✅ Acceptance

- [x] `docs/AGENT-NEUTRALITY.md` table gains a row covering `templates/loop-heartbeat-template.md:1,8` (`` `.claude/loop.md` `` in the file's own title + copy-instruction)
- [x] `docs/AGENT-NEUTRALITY.md` table gains a row covering `SPEC/loop.md:17` (`` `.claude/loop.md` `` inside the "Loop tasks" intro, distinct from the already-ledgered "Runtime vs. contract" / "Gate collapse" sections of the same file)
- [x] `docs/AGENT-NEUTRALITY.md` table gains a row covering `SPEC.md:126-135` (the "Wrapper-name invariant (grep-able)" block's `` `claude/commands/<name>.md` `` references)
- [x] `docs/AGENT-NEUTRALITY.md` states who is responsible for keeping the ledger current going forward

## 🧩 Subtasks

- [ ] Add ledger row for `templates/loop-heartbeat-template.md:1,8`
- [ ] Add ledger row for `SPEC/loop.md:17`
- [ ] Add ledger row for `SPEC.md:126-135`
- [ ] Add a ledger-currency ownership statement to `docs/AGENT-NEUTRALITY.md` §"Out of scope for this ledger"
- [ ] Spot-check the three cited files for any other nearby unledgered Claude-specific reference the audit finding didn't call out by exact line
- [ ] Phase 4 doc-drift sweep + closure

## 🔗 Related

- [[CORE-463.N]] — audit-structure run (2026-08-23) that surfaced this finding (Finding #4, Medium)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Small, well-scoped doc-hygiene fix. The ledger's own "Out of scope" section already disclaims re-surveying the contract layer, but never says whose job it is to keep pace with new leaks as they're introduced — exactly the gap the audit flagged. Task is self-contained and matches its `[light]🔧` tag.

- [x] Read relevant source files — `docs/AGENT-NEUTRALITY.md` (full file), `templates/loop-heartbeat-template.md:1-17`, `SPEC/loop.md:1-40`, `SPEC.md:100-140`, `.flowtron/tasknote/README.md` §"AI-referenced docs", `claude/skills/ft-audit/SKILL.md:97` (§7.1 subroutine reference), `claude/skills/ft-release/SKILL.md:252-266` (§7.1 doc-drift sweep definition)

- [x] **Best Practices Review** — N/A (prose/doc edit only; no code, no module boundaries touched)

- [x] **Archive skim** — `grep -l AGENT-NEUTRALITY` against `archive/core/` returns ~250 hits, nearly all of them the standard Phase 4 doc-drift-sweep "no change" boilerplate line every tasknote carries — not load-bearing here. The two load-bearing precedents: [[CORE-154.2]] (introduced the ledger and its "cite the table, don't re-flag" contract) and [[CORE-463.N]] (the audit-structure run that surfaced this exact finding, 2026-08-23). No prior tasknote addressed ledger-currency ownership.

- [x] **Drift check** — Verified all three cited locations against current code:
  - `templates/loop-heartbeat-template.md:1` (`# Heartbeat loop — `.claude/loop.md`) and `:8` (`Copy this file to `.claude/loop.md`...`) — both cite `.claude/loop.md`, no ledger row exists for this file at all. Matches.
  - `SPEC/loop.md:17` — `(copy to `.claude/loop.md`, replace its Duties, run under a loop runner).` — sits in the "Loop tasks" intro (before the `## Runtime vs. contract` heading at line 19). The existing ledger row for `SPEC/loop.md` only covers "Runtime vs. contract — the boundary" + "Gate collapse"; the intro section (and this `.claude/loop.md` mention specifically) is a distinct, uncovered site. Matches.
  - `SPEC.md:126-135` — the "Wrapper-name invariant (grep-able)" block under §"Skill namespace", citing `claude/commands/<name>.md` twice (prose + fenced shell check). The existing "Skill namespace" ledger row only covers the `.claude/` adopter-directory mention earlier in that section, not this block. Matches.
  - No SPEC contract contradiction: adding rows is exactly what the ledger's own "Intentional Claude-specific surfaces" table is for.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  **No clarifications needed.** Explicit assumptions:
  1. The ownership statement is prose only — no new automated check, gate, or SPEC/gates.md hook. The task's Medium severity and `[light]` tag both point at a documentation fix, not new tooling.
  2. Ownership lands as an added bullet in `docs/AGENT-NEUTRALITY.md` §"Out of scope for this ledger", alongside the existing "Re-survey the contract layer for new leaks" bullet it's clarifying — natural fit, no new heading.
  3. Ownership statement: the task/epic that *introduces* a new intentional Claude-specific surface in the contract layer is responsible for adding its own ledger row in the same commit (mirrors how every other row in the table already carries its introducing task ID) — the ledger is written-at-introduction, not swept periodically.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

`docs/AGENT-NEUTRALITY.md`'s table format: `| File | Section / context | Reference | Why it stays |`, with the "Why it stays" cell typically closing on the introducing task ID(s) in `[[wikilink]]` form. New rows will follow this shape exactly. `SPEC/loop.md`'s existing combined row (`SPEC/loop.md` + `SPEC.md`) stays as-is — the new `SPEC/loop.md:17` row is additive, not a merge, since it covers a different section of the same file.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the ledger's existing table shape exactly (`| File | Section / context | Reference | Why it stays |`, "Why it stays" closing on the introducing task ID); the ownership statement extends the existing "Out of scope" bullet list style with one new labeled paragraph rather than a new heading.

- [x] **Minimal refactor gate** — N/A, no code touched; the `SPEC/loop.md` + `SPEC.md` combined row was left as-is (additive new row, not a merge) per Discovery Notes reasoning.

- [x] Implemented the minimal solution — three new table rows + one ownership paragraph, all in `docs/AGENT-NEUTRALITY.md`.

- [x] Updated/added tests for non-trivial behavior — N/A, prose-only doc edit.

**Implementation Notes:**

`docs/AGENT-NEUTRALITY.md` changes:
- Added a row after the existing "Skill namespace" / `.claude/` row for the "Wrapper-name invariant (grep-able)" block (`SPEC.md:126-135`, `` `claude/commands/<name>.md` ``).
- Added a row after the existing `SPEC/loop.md` + `SPEC.md` combined row for the "Loop tasks" intro's `.claude/loop.md` mention (`SPEC/loop.md:17`), explicitly noting it's distinct from the existing row's coverage.
- Added a row for `templates/loop-heartbeat-template.md` (had none) covering its title (line 1) and copy instruction (line 8), both citing `.claude/loop.md`.
- Added a **Ledger currency** paragraph to §"Out of scope for this ledger", right after the existing "Re-survey the contract layer for new leaks" bullet: the introducing task/epic owns registering its own row in the same commit; nothing re-audits the ledger on a cadence.
- First attempt at the heartbeat-template row used nested double/single backtick spans to reproduce the file's literal title text and left a malformed span (stray backtick before "# Heartbeat"); caught it while verifying and simplified to plain-word section references instead of trying to quote the heading verbatim.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A, no code changed (`AGENTS.md` §"Validation" 6-command set covers `viz/` + Node scripts only, none touched here).

- [x] Ran lint/type-check on changed code — no project markdown linter installed; verified structurally instead: `awk -F'|'` column-count check confirms all 26 table data rows split into a consistent field count (no row broken by a stray unescaped `|`), and `[[CORE-466]]` wikilink count (4) matches the 3 new table rows + 1 in the new "Ledger currency" paragraph.

- [x] **Quality assertions** — no duplication (the additive `SPEC/loop.md` row is deliberately distinct from, not a copy of, the existing combined row — reasoning recorded inline); no dead code; the new prose matches the table's existing "Why it stays" density and the "Out of scope" bullet-list's existing voice; no public-surface growth (doc-only).

- [x] (frontend) N/A — no frontend/UI surface touched.

> **Choosing a test strategy (guidance, not a gate).** Default to targeted
> tests on the changed behavior. Where the input space is wide — parsers,
> encoders, round-trips, invariants that must hold across many inputs — a
> property-based test earns its keep; reach for one when example tests would
> leave large gaps. Visual confirmation covers UI surfaces that assertions
> can't. This is engineering judgment folded into Phase 3, never a new
> lifecycle phase or a schema/validator.

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs" (17 entries):
  - `README.md` — no change
  - `AGENTS.md` — no change
  - `SPEC.md` — no change (this task adds a ledger row *about* SPEC.md's own content; it doesn't edit SPEC.md itself)
  - `docs/MIGRATION.md` — no change
  - `claude/AGENTS-snippet.md` — no change
  - `codex/AGENTS-snippet.md` — no change
  - `cursor/AGENTS-snippet.md` — no change
  - `grok/AGENTS-snippet.md` — no change
  - `docs/CONVENTIONS.md` — no change
  - `CONTRIBUTING.md` — no change
  - `SECURITY.md` — no change
  - `docs/AGENT-NEUTRALITY.md` — **updated** (this task's deliverable): 3 new ledger rows + "Ledger currency" ownership paragraph
  - `docs/PLATFORMS.md` — no change
  - `claude/CAPABILITIES.md` — no change
  - `docs/AGENT-COMPAT.md` — no change
  - `docs/EXTERNAL-AGENTS.md` — no change
  - `docs/WORKTREES.md` — no change

- [x] Closed — every `## ✅ Acceptance` criterion ticked; YAML `status:` flipped to `completed`; PLAN.md line flipped to stub form; tasknote moved to `.flowtron/tasknote/archive/core/`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Registered the three unledgered Claude-specific contract-layer references `/ft-audit structure` flagged (2026-08-23, Finding #4, Medium) in `docs/AGENT-NEUTRALITY.md`'s table, and closed the "who keeps this current" gap the finding implied. **File:** `docs/AGENT-NEUTRALITY.md` (+13 lines: 3 table rows + 1 "Ledger currency" paragraph). **New rows:** `SPEC.md:126-135` (Wrapper-name invariant grep block, `claude/commands/<name>.md`); `SPEC/loop.md:17` (Loop tasks intro's `.claude/loop.md` mention, additive alongside the file's existing combined row which covers different sections); `templates/loop-heartbeat-template.md:1,8` (had no row at all — title + copy instruction, both `.claude/loop.md`). **Ownership statement:** added to §"Out of scope for this ledger" — the task/epic introducing a new Claude-specific surface registers its own row in the same commit; the ledger is written-at-introduction, not periodically re-audited. **Verification:** no project markdown linter exists; verified structurally — `awk`-based table column-count check confirms all 26 data rows remain well-formed (one row's first draft had a malformed nested-backtick span, caught and simplified before commit), and `[[CORE-466]]` wikilink count (4) matches the 3 new rows + 1 ownership paragraph. **Refactors:** none — doc-only, no code touched. **Documentation:** doc-drift swept clean; this task's own deliverable *is* the doc update. **Maintainability effect:** closes the exact gap the audit named — a future contract-layer edit that introduces a new Claude-specific reference now has an explicit, ledgered owner (itself) rather than an implicit assumption that "someone" re-surveys.

**Archived:** 2026-08-24
