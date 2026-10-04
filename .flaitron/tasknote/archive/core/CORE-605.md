---
title: plan-filing-off-default-path
status: completed
tags: []
created: 2026-09-18
due:
related-tasks: [CORE-604.N]
touches:
  - SPEC.md
  - templates/tasknote-template.md
  - claude/skills/ft-micro-task/SKILL.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-605 | plan-filing-off-default-path

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-604.N]]

## 🎯 Goal

Reword the three Closed-line/Step-3 citations of `SPEC/plan-filing.md` §"`## Completed` archive convention" from inline "per ..." loads to consult-when-unclear pointers, since the stub form and placement rule are already stated inline at each site.

## ✅ Acceptance

- [ ] `templates/tasknote-template.md` Closed line no longer reads as a required load — `grep -c 'per SPEC/plan-filing.md' templates/tasknote-template.md` → 0
- [ ] `SPEC.md` Phase 4 Closed line no longer reads as a required load — `grep -c 'per \[.SPEC/plan-filing.md' SPEC.md` → 0
- [ ] `claude/skills/ft-micro-task/SKILL.md` Step 3 no longer reads as a required load — `grep -c 'per SPEC/plan-filing.md' claude/skills/ft-micro-task/SKILL.md` → 0
- [ ] All three sites still state the stub form + placement rule inline (no information lost) — `judgment` (diff review; the parenthetical placement clause is preserved verbatim, only the citation's framing changes)
- [ ] `docs/CONTEXT-BUDGET.md` default-path cold-start sum drops `SPEC/plan-filing.md` and recomputes the total — `grep -q 'SPEC/plan-filing.md' docs/CONTEXT-BUDGET.md` still true (module still listed in the Lazy `SPEC/` modules section) but absent from the "Default-path cold start" sum line — `judgment` (line-level check, no single grep isolates the sum line)
- [ ] `SPEC/plan-filing.md` itself is unedited (this task only touches its citers) — `git diff --stat SPEC/plan-filing.md` → empty

## 🧩 Subtasks

- [ ] Reword `templates/tasknote-template.md:97` Closed line citation
- [ ] Reword `SPEC.md:507` Phase 4 Closed line citation (mirrors the template line)
- [ ] Reword `claude/skills/ft-micro-task/SKILL.md:126` Step 3 citation
- [ ] Update `docs/CONTEXT-BUDGET.md`: drop `SPEC/plan-filing.md` from the "Default-path cold start" sum + total, and adjust the "near-universal in practice" claim at the Lazy `SPEC/` modules note
- [ ] Doc-drift sweep + verification receipts

## 🔗 Related

- [[CORE-604.N]] — audit that surfaced this as Finding F4 and filed this row (`Q3`: file a `[light]` follow-up rather than reopen the closed epic)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** PLAN.md line, `SPEC/model.md` (Sonnet 5 = medium tier, tagged `[light]`, proceeds silently), and the `CORE-604.N` audit note (F4/Q3) all still match current repo state; no drift found.

- [x] Read relevant source files — grepped all repo-wide citers of `plan-filing.md`, then read the three in-scope sites (`SPEC.md:507`, `templates/tasknote-template.md:97`, `claude/skills/ft-micro-task/SKILL.md:126`) plus `SPEC/plan-filing.md` §"`## Completed` archive convention" (the cited section itself) and `docs/CONTEXT-BUDGET.md`'s default-path ledger.

- [x] **Best Practices Review** — this is a wording-only change to three existing citation clauses plus one ledger recompute; no new abstraction, no module boundary touched. `N/A` beyond following the existing citation-softening pattern already used elsewhere in the repo (e.g. plain "see X if unclear" phrasing).

- [x] **Archive skim** — `grep -l plan-filing archive/core/*.md` hit CORE-596, CORE-598.1/.2, CORE-599, CORE-603.2/.3/.N, CORE-604.1/.2/.3/.N (the epic that split/trimmed `gates.md`/`tasknote-selection.md`/`plan-filing.md` and produced the F4 finding this task closes). Read CORE-604.N directly (source of this task); the others are `plan-filing.md` mentions in unrelated closure lines (stub-form citations, not edits to the citation wording) — no additional load-bearing precedent beyond CORE-604.N itself.

- [x] **Drift check** — `SPEC.md:507`, `templates/tasknote-template.md:97`, and `claude/skills/ft-micro-task/SKILL.md:126` all still carry the exact citation phrasing the PLAN.md line and the CORE-604.N F4 finding describe (verified via grep above); `docs/CONTEXT-BUDGET.md`'s default-path sum still counts `SPEC/plan-filing.md` (15,771 chars) in the 139,621-char total, confirming the "flagless load" the task description names is still live. No divergence from the PLAN.md line or SPEC contract.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Assumptions: (1) scope is exactly the three citation sites the PLAN.md description names plus the `docs/CONTEXT-BUDGET.md` ledger line that measures their effect (in-scope because the task's stated purpose — "cut plan-filing.md off the flagless closure path" — is literally what that ledger sums); (2) `SPEC.md:568` ("Filing commits") and `SPEC.md:766` (the descriptive §"When to use a tasknote" pointer paragraph) are out of scope — neither sits on the Closed-line/Step-3 flagless path, both are already framed as reference pointers rather than restated-inline citations; (3) `SPEC/plan-filing.md` itself is not edited — only its citers.

- [x] Subtasks above populated with concrete, ordered steps, and YAML `touches:` declared with the paths this task expects to edit.

**Discovery Notes:**

Task closes CORE-604.N's Finding F4 (Info-severity): `SPEC/plan-filing.md` (15,771 chars) is the single largest remaining item in `docs/CONTEXT-BUDGET.md`'s flagless default-path cold-start sum (139,621 chars total). The three citing sites already restate the stub form (`Completed YYYY-MM-DD.`) and the placement rule (standalone → top of `## Completed`; epic child → nested beneath active parent) inline — the `per SPEC/plan-filing.md §"..."` citation adds no information an agent needs to complete the Closed step, it just reads as something to open. Rewording it to a parenthetical "see ... if unclear" pointer preserves discoverability for the genuine edge cases `plan-filing.md` covers (exception carve-outs, rotation, filing commits) without pulling the whole 15.8k-char module into every closure.

`docs/CONTEXT-BUDGET.md` explicitly measures this exact load, so recomputing its sum once the citations no longer force the read is part of this task's own deliverable, not a separate doc-drift nit — leaving the ledger stale would misreport the very trend `CORE-EPIC-604` (and this follow-up) exist to cut.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — followed the existing "see X §Y if unclear" parenthetical shape already used elsewhere in the repo's own citation conventions; no new abstraction introduced.

- [x] **Minimal refactor gate** — touched only the four sites Discovery named: three citation clauses reworded in place, one ledger sum + one ledger sentence recomputed to match. No unrelated cleanup.

- [x] Implemented the minimal solution — `SPEC.md:507`, `templates/tasknote-template.md:97`, `claude/skills/ft-micro-task/SKILL.md:126` reworded; `docs/CONTEXT-BUDGET.md` default-path sum (139,621 → 123,850 chars) and the Lazy `SPEC/` modules note updated to reflect `plan-filing.md` no longer being near-universal in practice.

- [x] Updated/added tests for non-trivial behavior — `N/A`; markdown-only wording/ledger change, no test surface.

**Implementation Notes:**

Verified the parenthetical placement clause (`standalone → top of ## Completed; epic child → kept nested beneath its active parent`) is preserved verbatim at both Closed-line sites — only the citation's framing moved from a leading "per ..." to a trailing "see ... if unclear." `SPEC/plan-filing.md` itself was not edited (confirmed no diff below).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`; markdown-only, no test suite covers these files.

- [x] Ran lint/type-check on changed code — `N/A`; no lint/type-check surface for markdown in this repo.

- [x] **Verification receipt**:
  - `grep -c 'per SPEC/plan-filing.md' templates/tasknote-template.md` → `0`
  - `grep -c 'per \`SPEC/plan-filing.md' SPEC.md` → `0`
  - `grep -c 'per SPEC/plan-filing.md' claude/skills/ft-micro-task/SKILL.md` → `0`
  - `git diff --stat SPEC/plan-filing.md` → empty (unedited)
  - `grep -rn ' $' SPEC.md templates/tasknote-template.md claude/skills/ft-micro-task/SKILL.md docs/CONTEXT-BUDGET.md` → `none` (no trailing whitespace introduced)
  - Placement-clause preservation and `docs/CONTEXT-BUDGET.md` sum recompute — `judgment`: confirmed by direct diff review above (139,621 → 123,850 chars; `SPEC/plan-filing.md` (15,771) dropped from the sum line, still present in the Lazy `SPEC/` modules list). No avoidable duplication, dead code, or stale code-facing documentation introduced.

- [ ] (frontend) Asked the user for visual confirmation — `N/A`; no frontend surface touched.

**Testing Notes:**

All four Acceptance criteria verified above. No refactor beyond the four named edits; nothing deferred.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked `.flowtron/tasknote/README.md` §"AI-referenced docs" (16 entries):
  - `README.md`, `AGENTS.md`, `docs/MIGRATION.md`, `claude/AGENTS-snippet.md`, `docs/AGENT-NEUTRALITY.md`, `docs/EXTERNAL-AGENTS.md` — grepped for `plan-filing`/`Closed line`/`archive convention`; each cites `SPEC/plan-filing.md` §"`## Completed` rotation" or §"Filing commits" or describes it as a reference surface (not the specific Closed-line/Step-3 citation shape this task reworded) — section titles and content are unchanged, so these citations remain valid as written. No change.
  - `SPEC.md` — updated (this task's own edit, item 1 above).
  - `codex/AGENTS-snippet.md`, `cursor/AGENTS-snippet.md`, `grok/AGENTS-snippet.md`, `docs/CONVENTIONS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `docs/PLATFORMS.md`, `claude/CAPABILITIES.md`, `docs/AGENT-COMPAT.md`, `docs/WORKTREES.md`, `docs/VISION.md` — no `plan-filing`/Closed-line/archive-convention mentions found. No change.

- [x] Closed — every `## ✅ Acceptance` criterion ticked/annotated above; YAML `status:` flipped below; PLAN.md line to be flipped to stub form `Completed 2026-09-18.` at the top of `## Completed` (standalone task); tasknote to be moved to `.flowtron/tasknote/archive/core/CORE-605.md`.

- [x] **Evidence-based recap** drafted — see Final Summary below.

**Final Summary:**

Reworded three `SPEC/plan-filing.md` §"`## Completed` archive convention" citations from inline "per ..." loads to consult-when-unclear pointers — `SPEC.md:507`, `templates/tasknote-template.md:97` (both Closed-line), `claude/skills/ft-micro-task/SKILL.md:126` (Step 3) — since all three already state the stub form and placement rule inline. Recomputed `docs/CONTEXT-BUDGET.md`'s "Default-path cold start" ledger to drop `SPEC/plan-filing.md` (15,771 chars) from the flagless-closure sum (139,621 → 123,850 chars) and updated its "near-universal in practice" claim accordingly; `plan-filing.md` stays listed in the Lazy `SPEC/` modules table (still a real, sized module) but is no longer counted as force-loaded by the citation chain.

Files changed: `SPEC.md`, `templates/tasknote-template.md`, `claude/skills/ft-micro-task/SKILL.md`, `docs/CONTEXT-BUDGET.md` — 4 files, single-clause/sentence edits each, no LOC of substance beyond the reworded prose. `SPEC/plan-filing.md` itself is unedited (confirmed via `git diff --stat`).

Verification: five grep/diff receipts recorded in Phase 3, all passing. No test suite applies (markdown-only). No refactor beyond the four named edits — nothing deferred. Documentation verdict: `docs/CONTEXT-BUDGET.md` update is in-scope (not a drift-sweep nit) because it's the exact ledger this task's stated purpose ("cut plan-filing.md off the flagless closure path") targets.

`touches:` reconciliation — declared `SPEC.md`, `templates/tasknote-template.md`, `claude/skills/ft-micro-task/SKILL.md`, `docs/CONTEXT-BUDGET.md`; `git diff --name-only` (below, run at commit time) is expected to match exactly plus this tasknote's own move to `archive/core/` and the PLAN.md stub flip.

Maintainability effect: closure-path agents no longer pull in a 15.8k-char module to learn a stub form and placement rule already spelled out at the point of use; the module remains one grep/read away for the genuine edge cases (exceptions, rotation, filing-commit authority) it still owns.

**Archived:** 2026-09-18
