---
title: doc-count-and-layout-currency
status: completed
tags: []
created: 2026-05-31
due:
related-tasks: []
---

# CORE-244 | doc-count-and-layout-currency

[← PLAN.md](../PLAN.md) · 🟢 In progress

## 🎯 Goal

Refresh the "~53" glossary-term count stamp in GLOSSARY.md and README.md to the actual count, and expand the README §"Repo layout" docs one-liner to cover all doc files currently omitted.

## ✅ Acceptance

- [ ] `docs/GLOSSARY.md:7` and `README.md:20` reflect the actual term count (exact number or updated approximation)
- [ ] `README.md:130` (§"Repo layout" docs one-liner) covers glossary, vision, agent-compat, and worktrees entries

## 🧩 Subtasks

- [ ] Count actual glossary terms in docs/GLOSSARY.md
- [ ] Update the term-count stamp in docs/GLOSSARY.md:7
- [ ] Update the term-count stamp in README.md:20
- [ ] Read README.md §"Repo layout" section and identify the gaps
- [ ] Expand/genericize the docs one-liner in README.md:130

## 🔗 Related

(none)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Two clear doc patches: (1) stamp ~53→~51 in GLOSSARY.md:7 + README.md:20; (2) expand README.md:130 docs one-liner to cover all omitted docs.

- [x] Read relevant source files

- [x] **Archive skim** — CORE-235 last touched the count stamp (updated ~48→~53 on 2026-05-30 using `grep -c '^\*\*'` which miscounted — included intro + footer paragraphs). CORE-243 explicitly deferred the count fix here. No other load-bearing findings.

- [x] **Drift check** — GLOSSARY.md:7 `~53 entries` confirmed; README.md:20 `~53 load-bearing terms` confirmed; README.md:130 confirmed missing vision/glossary/agent-compat/worktrees. All line numbers match the PLAN description.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**
- Actual term count: 51 (53 `grep -c '^\*\*'` hits − 1 intro `**Lazy-loaded...**` − 1 footer `**Maintenance.**`)
- CORE-235 miscounted: included the two structural paragraphs in its grep-c result
- README.md:130 missing: vision, glossary, agent-compat, worktrees (in Documents-section order)
- No clarifications needed. Assumptions: (1) `~53` → `~51` in both files, keeping `~` prefix per CORE-235 style; (2) docs one-liner expanded to match Documents section order.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended CORE-235 precedent: keep `~` prefix, use `grep -c '^\*\*'` minus structural paragraphs for actual count. README.md:130 follows the list-based one-liner shape established for other sections in the same block.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A (doc-only patch)

**Implementation Notes:**
- GLOSSARY.md:7: `~53 entries` → `~51 entries`
- README.md:20: `~53 load-bearing terms` → `~51 load-bearing terms`
- README.md:130: added vision, glossary, agent-compat, worktrees to docs one-liner (matching Documents section order); changed trailing "guides" to "docs" to be generic

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A (markdown-only)

- [x] Ran lint/type-check on changed code — N/A (markdown-only)

- [x] (frontend) Asked the user for visual confirmation (👁️ prefix on the prose ask) — N/A (no frontend surface)

**Testing Notes:**
Doc-only patch; no test suite, lint, or visual confirmation needed.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — for each entry in `_project/tasknote/README.md` §"AI-referenced docs", state "no change" or the update

- [x] Closed — PLAN.md line flipped to stub form `Completed 2026-05-31.` and tasknote moved to `_project/tasknote/archive/core/`

- [x] Recap drafted (surfaces inline on conditional skip)

**Doc-drift sweep results:**
- `README.md` — updated: count stamp ~53→~51 (line 20) and docs one-liner expanded to include vision/glossary/agent-compat/worktrees (line 130)
- All other 10 AI-referenced docs — no change

**Final Summary:**
Corrected the glossary term-count stamp from ~53 to ~51 in docs/GLOSSARY.md and README.md (CORE-235's `grep -c '^\*\*'` approach miscounted by including the intro and footer structural paragraphs). Expanded README.md §"Repo layout" `docs/` one-liner to cover all nine doc files, including the four previously omitted (vision, glossary, agent-compat, worktrees).

**Archived:** 2026-05-31
