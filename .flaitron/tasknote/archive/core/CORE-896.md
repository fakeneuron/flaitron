---
title: grok-block-adoption
status: completed
tags: [fleet-standard]
created: 2026-11-14
due:
related-tasks: [CORE-901]
touches:
  - AGENTS.md
  - docs/CONTEXT-BUDGET.md
  - .flaitron/PLAN.md
---

# CORE-896 | grok-block-adoption

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-901]]

## 🎯 Goal

Append natabula's current public Grok Task Notes block to the end of root `AGENTS.md`, byte-exact, keeping `CLAUDE.md` as the single symlink to it and leaking no private workflow identifier.

## ✅ Acceptance

- [x] natabula's public-variant audit passes on this tree (exact payload, one ordered marker pair, pointer resolution, no known private identifiers in root AGENTS/CLAUDE) — `python3 ../natabula/scripts/check-grok-block.py . --variant public` → 0
- [x] The block is the template's bytes, at the end of `AGENTS.md` — `tail -6 AGENTS.md | diff - ../natabula/templates/grok-tasknotes/public.md`
- [x] `CLAUDE.md` is still a symlink to `AGENTS.md` (no duplicated payload) — `test "$(readlink CLAUDE.md)" = AGENTS.md`
- [x] Everything outside the block is unchanged in `AGENTS.md` — `git diff AGENTS.md` shows only added lines at EOF
- [x] The proposed commit carries no private identifier (the checker's ≥25-char tokens from the private template, plus Grok note IDs) — `git diff --cached | grep -E 'NAT-G[0-9]' ; grep -oE '\b[A-Za-z0-9_-]{25,}\b' ../natabula/templates/grok-tasknotes/private.md | grep -F -f - <(git diff --cached)` → both print nothing
- [x] Drift checks stay green — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Append a blank line plus `templates/grok-tasknotes/public.md` to the end of `AGENTS.md`
- [x] Re-measure the `AGENTS.md` row in `docs/CONTEXT-BUDGET.md`
- [x] Run the checker, the tail diff, symlink check, identifier scan, and drift checks

## 🔗 Related

- [[CORE-901]] — sibling owner row: same append-a-natabula-marked-block-to-AGENTS.md shape, same budget re-measure
- natabula `docs/GROK-TASKNOTES.md` §"Canonical block variants" / §"Audit and owner verification" — the contract; `docs/STANDARDS-ADOPTION.md` — flaitron's `install (public variant)` row, routed to this owner row because no wave reaches a self-host

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** `check-grok-block.py . --variant public` exits 1 (`missing/duplicate markers`) today: no block yet. natabula's adoption table lists flaitron as `install (public variant)`, operator-confirmed, left to this row because a self-host has no `.flaitron/core` for the block wave to reach.

- [x] Read relevant source files: natabula `docs/GROK-TASKNOTES.md`, `templates/grok-tasknotes/public.md` (6 lines, UTF-8 with one curly apostrophe, LF), `docs/STANDARDS-ADOPTION.md` flaitron rows, `docs/reviews/NAT-589-grok-v3-wave.md`; `scripts/check-grok-block.py` identifier rule; flaitron `AGENTS.md` (ends with the arch-health block), `CLAUDE.md` (symlink → `AGENTS.md`), `docs/CONTEXT-BUDGET.md` AGENTS row.

- [x] **Best Practices Review** — N/A: a verbatim doc payload, no code or module boundary.

- [x] **Archive skim** — `archive/core/` (README table row `CORE-*`); grep `grok-tasknotes|grok block|CORE-896` → CORE-465, CORE-463.5 (agent-snippet wiring, unrelated), [[CORE-901]] (the sibling precedent: block appended at EOF, CONTEXT-BUDGET re-measured outside the sum, no push).

- [x] **Drift check** — PLAN line says "block v1"; the contract is now v3 and says "An open v1 or v2 adoption row adopts v3 directly", and its audit compares against v3 only. Adopting the current `public.md` (v3) is the row's intent, not a re-scope; closure rewrites the line to a stub anyway. "Retain one CLAUDE import/link or symlink" already holds (symlink). "checkout/closure capability stops" are the v3 payload's own lines (claims and closures are committed markers; stop if the private workflow is unavailable). Public repos get no markers.

- [x] No clarifications needed. Assumptions: public variant (operator's recorded choice in natabula's adoption table); append at EOF after the arch-health block, separated by one blank line; no markers; no `claude/AGENTS-snippet.md` change (natabula: "not a change to the flaitron contract"); no push.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:** Public-ID boundary: natabula task IDs (`NAT-<n>`) already appear in flaitron's public history (AGENTS.md cites a natabula `NAT-` ID), so citing natabula task IDs is precedented. Grok note IDs (`NAT-G<n>`), Drive file IDs and private-template tokens are not. This note and the commit avoid them.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — the [[CORE-901]] shape: natabula marked block appended at EOF of `AGENTS.md`, ledger row re-measured outside the sum.

- [x] **Minimal refactor gate** — no refactor.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: verbatim doc payload; natabula's checker is the test.

**Implementation Notes:** `printf '\n'; cat public.md` appended to `AGENTS.md` (after the arch-health block). `docs/CONTEXT-BUDGET.md`: AGENTS row 9,071 → 9,611 chars (`wc -m`, the unit the prior row used) plus a re-measure line.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: markdown only; no viz/tools code touched.

- [x] Ran lint/type-check on changed code — `bash tools/drift-checks.sh` (covers final newlines, context budgets, pairs).

- [x] **Verification receipt** — below.

- [x] **External review** — `/code-review medium` over the uncommitted diff (this task only): 0 bugs, 4 notes, all triaged below.

- [x] (frontend) Asked the user for visual confirmation — N/A: not frontend.

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

- `check-grok-block.py . --variant public` → 0 (`exact public payload and CLAUDE pointer`); baseline before the edit → 1 (`missing/duplicate markers`)
- `tail -6 AGENTS.md | diff - …/public.md` → 0
- `test "$(readlink CLAUDE.md)" = AGENTS.md` → 0
- `git diff AGENTS.md` removed-line count → 0
- Note-ID grep and private-token grep over the diff + this note → no output (exit 1 each)
- `bash tools/drift-checks.sh` → 0

Review notes: (1) ledger counts chars not bytes — inherited unit; the table header says Chars and the prior row was `wc -m`; kept for consistency, no change. (2) only the AGENTS row re-measured — it sits outside the sum, same as CORE-865/892/901; no change. (3) PLAN line said v1 — fixed: the Completed stub names v3. (4) contributor-facing wording — the block scopes itself to operator-assigned notes and the public variant was the operator's choice; no change.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — `AGENTS.md` is the deliverable; README, SPEC, MIGRATION, snippets: no change (no surface names the block; natabula says it is not a flaitron-contract change).

- [x] Closed — Acceptance ticked, YAML `status: completed`, PLAN.md line → Completed stub at top of `## Completed`, tasknote moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted — see Final Summary.

- [x] **Learnings** — N/A.

**Final Summary:** flaitron's root `AGENTS.md` now ends with natabula's current public Grok Task Notes block (v3, byte-exact; the row's "v1" was superseded by the contract's "open v1 or v2 rows adopt v3 directly"). `CLAUDE.md` stays the single symlink. No markers (public repo), no private identifiers in the diff. Files: `AGENTS.md` (+7), `docs/CONTEXT-BUDGET.md` (AGENTS row 9,071 → 9,611), `.flaitron/PLAN.md`, this note. `touches:` matches `git diff --name-only`. Not pushed — push needs an explicit go.

**Archived:** 2026-11-14
