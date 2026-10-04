---
title: contract-layer-hygiene
status: completed
tags: []
created: 2026-05-25
due:
related-tasks: []
---

# CORE-205.2 | contract-layer-hygiene

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Audit SPEC.md, templates/, and docs/ for "AskUserQuestion" residuals and other Claude-tool names; replace with neutral "structured ask" (or equivalent) per the AGENT-NEUTRALITY ledger. Hygiene only — no behavior, wiring, or contract changes.

## ✅ Acceptance

- [ ] Grep + read survey of every file in the explicit scope (SPEC.md + all 5 templates/*.md + docs/ + claude/AGENTS-snippet.md + top-level AI-referenced markdown) completed for "AskUserQuestion" (and close variants) plus other Claude-tool name residuals.
- [ ] Zero *unintentional* occurrences of the old tool name remain in the living contract layer; the single match is the intentional historical explanation row in docs/AGENT-NEUTRALITY.md (preserved per the ledger's own rules).
- [ ] Survey cross-referenced against CORE-205.1 (sibling discovery) + the full AGENT-NEUTRALITY.md ledger + post-CORE-154.2 state; confirms the generalization is complete for these surfaces with no behavior impact.
- [ ] Phase 4 doc-drift sweep will record "no change" (or the specific one-line update) for every entry in `_project/tasknote/README.md` §"AI-referenced docs"; this tasknote itself serves as the 2026-05-25 hygiene verification record for the epic.

## 🧩 Subtasks

- [ ] Enumerate and read the exact files in scope per task desc + AI-referenced list in _project/tasknote/README.md + templates/ directory listing.
- [ ] Run targeted greps for "AskUserQuestion|ask_user_question" (and variants) across SPEC.md, templates/, docs/, claude/AGENTS-snippet.md, README.md, CONTRIBUTING.md, SECURITY.md; log exact hits + context.
- [ ] Read docs/AGENT-NEUTRALITY.md (full) to internalize the intentional surfaces table, the "structured ask" / "prose ask" canonical terminology, and what must not be edited.
- [ ] Read archived sibling CORE-205.1.md for epic context, prior archive skim of 154/198 precedents, the exact residual callout that motivated this child, and the "Resolved scoping" table.
- [ ] Perform archive skim (grep hits on scoped paths/strings in archive/CORE/*.md) + drift check on cited paths; record findings + explicit assumptions for "No clarifications needed".
- [ ] Populate concrete Acceptance + Subtasks lists, tick all Phase 1 boxes, apply default-skip 🛠️ exit gate judgment, then execute minimal Phase 2 verification + Phase 4 doc-drift + closure.

## 🔗 Related

- [[CORE-EPIC-205]] — parent epic: agent-neutrality-sweep (contract-layer hygiene child)
- [[CORE-205.1]] — discovery subtask that filed the children (completed 2026-05-25)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md
- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The filed scope (SPEC.md + templates/ + docs/ for "AskUserQuestion" residuals + other Claude-tool names, hygiene only) is precise, actionable, and exactly matches the terminology-drift motivation explicitly called out in sibling CORE-205.1 Discovery Notes. Fresh greps (2026-05-25, post model retag to [grok]) confirm the primary term has already been eliminated from all *living contract-layer* files in scope. The only remaining occurrence is the intentional historical row in the ledger itself (must stay per ledger rules). This is a verification + record-keeping pass with zero behavior impact risk. No re-scope or de-scope; the work is the hygiene audit as planned under the epic.

- [x] Read relevant source files — docs/AGENT-NEUTRALITY.md (full ledger + intentional surfaces table + "structured ask"/"prose ask" terminology), all 5 files in templates/ (tasknote-template.md, tasknote-starter-template.md, tasknote-micro-template.md, tasknote-README.md, PLAN.md), SPEC.md, docs/ (MIGRATION.md, PLATFORMS.md, CONVENTIONS.md, AGENT-NEUTRALITY.md, etc.), claude/AGENTS-snippet.md, top-level AI-referenced (README.md, CONTRIBUTING.md, SECURITY.md); plus the archived CORE-205.1.md for direct epic context and prior sweep.

- [x] **Archive skim** — Direct sibling CORE-205.1.md (and its own prior skim of CORE-154.*, 198.*, 139, 138, 132, 195.1, 200, 204 archives) already performed the heavy precedent review and explicitly identified the "AskUserQuestion" residual in generic scaffold/epic-discovery text as the trigger for filing this .2 child. Our fresh grep across `_project/tasknote/archive/CORE/*.md` for the term shows it now lives *only* in historical pre-generalization tasknotes, the .1 notes, one same-day CORE-207.md entry, and the intentional history table in the ledger. No load-bearing new findings for the *living* surfaces in this task's scope. (Full summary in Discovery Notes below.)

- [x] **Drift check** — All paths cited in the PLAN line (SPEC.md, templates/, docs/) exist at HEAD with current expected content and structure. AGENT-NEUTRALITY.md ledger entries (paths 15-48) remain valid. The CORE-154.2 generalization to neutral "structured ask" is already reflected in live SPEC contract text and the ledger. The filed .2 description is consistent with what .1 delivered to PLAN.md (minor note: .1 notes mentioned ft-epic-discovery/SKILL.md examples, but the authoritative PLAN line + ledger scope this child to contract layer only). No drift requiring re-interpretation.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — **No clarifications needed.**

  **Explicit assumptions (asserted for autonomous execution):**
  - Scope is exactly the living files named in the PLAN line + the AI-referenced docs list in _project/tasknote/README.md (SPEC.md, templates/*.md, docs/*.md + claude/AGENTS-snippet.md as the primary neutral adopter surface). Wiring-layer implementation (claude/skills/*/*.md, commands/) and the global ~/.claude/ CLAUDE.md are out of scope per the ledger's wiring/contract separation and the README "on-demand" note.
  - The single `AskUserQuestion` hit in docs/AGENT-NEUTRALITY.md is *intentional historical documentation* of the 154.2 change and is explicitly protected by the ledger's "Intentional Claude-specific surfaces" table and "Tool-call-specific terminology" section — do not edit.
  - "Other Claude-tool names" = any additional direct references to Claude Code execution primitives (specific slash commands, tool names) leaking into contract-layer *explanatory* text outside the curated ledger table. Survey found none requiring action.
  - Archived tasknotes (including CORE-205.1 and older) are write-once per SPEC §"Tasknote frontmatter" write-once policy; we record their state for context but never edit them.
  - Because the primary term is already absent from the scoped *living* surfaces (confirmed by exhaustive greps on 2026-05-25), the hygiene outcome for this child is either zero edits or trivial consistency polish only. The value is the formal verification record for the epic.

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Contract-layer hygiene sweep for "AskUserQuestion" + Claude-tool names (2026-05-25, [grok] session after Step 1.5 retag):**

- **Primary term ("AskUserQuestion" / "ask_user_question") survey results:**
  - SPEC.md: 0 matches
  - templates/ (5 files: tasknote-template.md + starter + micro + tasknote-README.md + PLAN.md): 0 matches (the generic Phase 1 "clarifying questions" item already uses neutral phrasing)
  - docs/ + claude/AGENTS-snippet.md + top-level AI-referenced (README, CONTRIBUTING, SECURITY): 1 match total — the intentional historical row in docs/AGENT-NEUTRALITY.md:57 ("Was previously named `AskUserQuestion` ... generalized via [[CORE-154.2]]"). This is curated and protected by the ledger.
  - No other residuals of the old tool name in any contract-layer instructional or explanatory text.

- **Archive skim summary:** The .1 sibling (and its precedents sweep) already did the heavy lifting. Current archive hits for the term are purely historical (pre-154 tasknotes documenting the change, the .1 notes that filed this child, one 2026-05-25 CORE-207 entry). Consistent with .1's finding that live SPEC was already clean and the residual lived in wiring examples + scaffold pre-fills (the latter now also clean in templates/).

- **Other Claude-tool name notes:** No additional direct tool-primitive leaks into contract explanations were surfaced outside the AGENT-NEUTRALITY.md intentional table (which lists the approved claude/ factual refs, /ft-* command names in skill context, `--fast` flag, `/model` + `/clear` UI commands, etc.). All such entries have documented "Why it stays" rationales.

- **Overall state:** The contract layer surfaces in this task's scope are already in the desired post-154.2 neutral state for the primary terminology. This .2 is a successful verification + point-in-time record for CORE-EPIC-205. No string replacements or behavior changes were (or will be) required in the audited files.

- **Ledger cross-check:** docs/AGENT-NEUTRALITY.md is current and authoritative. The "structured ask" / "prose ask" canonical names are already in use in SPEC and the ledger. .5 (neutrality-ledger-update) can record this 2026-05-25 verification sweep date if no new intentional refs are found by .3.

(The archive skim + source reads for this hygiene pass are complete; all Phase 1 boxes ticked.)

## 🛠️ Phase 2: Execution

- [ ] **Pattern survey** — looked at neighboring code for an existing pattern to extend; justified the new shape if none fits
- [ ] Implemented the minimal solution
- [ ] Updated/added tests for non-trivial behavior

**Implementation Notes:**

## 🧪 Phase 3: Testing & Linting

- [ ] Ran targeted test suite for changed code
- [ ] Ran lint/type-check on changed code
- [ ] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask)

**Testing Notes:**

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update (see Final Summary + post-closure protocol)
- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-25.` and tasknote moved to `_project/tasknote/archive/CORE/CORE-205.2.md`
- [x] Recap drafted (1-2 sentence plain-English summary + technical detail; bundled at Step 6)

**Final Summary:**

**Verification complete with zero contract-layer changes.** Grep survey (2026-05-25) of SPEC.md, all templates/*.md, docs/, claude/AGENTS-snippet.md and top-level AI-referenced markdown found *zero unintentional "AskUserQuestion" residuals*. The sole occurrence is the protected historical note in docs/AGENT-NEUTRALITY.md (per its own ledger rules and "Intentional" table). Cross-checked against CORE-205.1 discovery context and the full AGENT-NEUTRALITY.md — the post-CORE-154.2 neutral state ("structured ask" / "prose ask") is already in effect for these surfaces. No edits, no behavior impact, no drift. This tasknote + the Phase 1 Discovery Notes are the formal 2026-05-25 hygiene verification record for CORE-EPIC-205.

**Archived:** 2026-05-25
