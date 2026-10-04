---
title: spec-wikilink-obsidian-attribution
status: completed
tags: []
created: 2026-05-23
due:
related-tasks: [CORE-132]
---

# CORE-137 | spec-wikilink-obsidian-attribution

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-132]]

## 🎯 Goal

Remove the brand-attributing phrase "Obsidian-style" from the wikilink prose at SPEC.md:276, since tool attribution is already handled in the following sentence's tool list.

## ✅ Acceptance

- [ ] SPEC.md:276 no longer reads "Obsidian-style `[[...]]`"; the wikilink syntax is described without brand attribution
- [ ] Surrounding prose remains grammatically correct and consistent

## 🧩 Subtasks

- [ ] Edit SPEC.md:276 to drop "Obsidian-style"
- [ ] Verify the full surrounding paragraph reads naturally
- [ ] Phase 3 lint/doc-drift sweep
- [ ] Phase 4 closure

## 🔗 Related

- [[CORE-132]] — audit that surfaced this finding (Finding #3.1, Low, 2026-05-22)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Target phrase "Obsidian-style" confirmed present at SPEC.md:276. Fix is unambiguous — one two-word phrase removal; no design tradeoffs.

- [x] Read relevant source files
- [x] **Archive skim** — CORE-132 archive is the authoritative source: Finding #3.1 documents the exact location, rationale (wikilink syntax predates Obsidian; the following sentence already names the tools), and the prescribed fix. CORE-022 background: "Working in Obsidian" README section establishes that Obsidian is positioning, not a flowtron requirement — consistent with this fix.
- [x] **Drift check** — SPEC.md:276 still reads `use Obsidian-style [[<TASK-ID>]] wikilinks`; no drift from CORE-132's description.
- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions
- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

No clarifications needed. Assumption: drop "Obsidian-style " (two words + trailing space) so the sentence reads "…use `[[<TASK-ID>]]` wikilinks throughout." The following sentence (`are first-class in markdown-vault tooling (Obsidian, Foam, Logseq)`) already carries the tool-positioning context.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — CORE-133–136, CORE-139 siblings: in-place single-phrase doc edits; same shape.
- [x] Implemented the minimal solution
- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

Removed "Obsidian-style " from SPEC.md:276. Surrounding paragraph confirmed grammatically correct. No tests apply to a doc-only change.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code
- [x] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

Doc-only change; no test suite or lint applies. Grep confirms "Obsidian-style" is absent from all normative prose (only retained in PLAN.md task description, active tasknote, and historical archives — all appropriate).

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README.md: no change · SPEC.md: updated (removed "Obsidian-style " from Cross-linking prose) · docs/MIGRATION.md: no change · claude/AGENTS-snippet.md: no change · docs/CONVENTIONS.md: no change · CONTRIBUTING.md: no change · SECURITY.md: no change
- [x] Closed — PLAN.md line flipped to stub form and tasknote moved to archive
- [x] Recap drafted

**Final Summary:**

Removed the two-word phrase "Obsidian-style" from SPEC.md:276 so the Cross-linking paragraph no longer attributes `[[wikilink]]` syntax to a specific tool. Changed 1 line in SPEC.md; the following sentence's tool list (Obsidian, Foam, Logseq) retains the positioning context.

**Archived:** 2026-05-23
