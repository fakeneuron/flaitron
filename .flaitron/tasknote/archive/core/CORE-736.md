---
title: audit-row-sibling-gate
status: completed
tags: [unattended, candidacy, ft-seed]
created: 2026-10-08
due:
related-tasks: [CORE-577.2, CORE-619, CORE-738]
touches:
  - SPEC/unattended-candidacy.md
  - claude/skills/ft-seed/SKILL.md
  - claude/skills/ft-epic-discovery/SKILL.md
  - claude/skills/ft-refactor/SKILL.md
  - docs/CONTEXT-BUDGET.md
---

# CORE-736 | audit-row-sibling-gate

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-577.2]] · [[CORE-619]] · [[CORE-738]]

## 🎯 Goal

Make `SPEC/unattended-candidacy.md` clause 6 admit a `.N` audit row only when every other open child of its epic is already `- [x]` or is a candidate in the same pass, and mirror that in `/ft-seed`.

## ✅ Acceptance

- [x] Clause 6 gates `.N` on every other child (settled: `- [x]` or a same-pass candidate), not on clauses 1–4 alone — `grep -q 'waits on every other child of its' SPEC/unattended-candidacy.md && ! grep -q 'qualifies only when clauses 1–4 admit it' SPEC/unattended-candidacy.md`
- [x] An open sibling already carrying the token does not settle a `.N` (conservative; no dispatch-order guarantee exists) — `! grep -q 'already dispatchable' SPEC/unattended-candidacy.md claude/skills/ft-seed/SKILL.md && grep -q 'does not count' claude/skills/ft-seed/SKILL.md`
- [x] A dropped candidate cascades to every kept candidate leaning on it, on every gate shape, and the confirm-gate mirrors say so — `grep -q 'leaned on it, transitively' SPEC/unattended-candidacy.md && [ $(cat claude/skills/ft-seed/SKILL.md claude/skills/ft-refactor/SKILL.md claude/skills/ft-epic-discovery/SKILL.md | grep -c 'every kept row leaning on it') = 3 ]`
- [x] §"Seeding an existing plan" states the audit reading — `grep -q 'and an audit resolves last' SPEC/unattended-candidacy.md`
- [x] `/ft-seed` mirrors it: `.N` resolved last, display names every sibling, the ask warns of the cascade — `grep -q 'A `.N` audit row' claude/skills/ft-seed/SKILL.md && grep -q 'waits on every sibling' claude/skills/ft-seed/SKILL.md && grep -q 'dropping a row also drops every candidate' claude/skills/ft-seed/SKILL.md`
- [x] `/ft-epic-discovery` Step 7 keeps `.N` reachable (`.1` read as closed) — `grep -q 'the `.N` likewise reads `.1` as closed' claude/skills/ft-epic-discovery/SKILL.md`
- [x] Drift checks (Pair N mirror labels, context budget) pass — `bash tools/drift-checks.sh`

## 🧩 Subtasks

- [x] Rewrite clause 6's `.N` sentence in `SPEC/unattended-candidacy.md`
- [x] Add the `.N` reading to §"Seeding an existing plan"
- [x] Mirror in `claude/skills/ft-seed/SKILL.md` Step 2
- [x] One clause in `claude/skills/ft-epic-discovery/SKILL.md` Step 7 so `.N` still reads `.1` as closed
- [x] Run drift checks

## 🔗 Related

- [[CORE-577.2]] — authored the candidacy predicate (clause 6's `.N` carve-out originates there, via CORE-577.1's note)
- [[CORE-619]] — `/ft-seed`, the surface that exposed the gap
- [[CORE-738]] — follow-up: runtime sibling guard in `/ft-close-epic --unattended` plus the deferred review notes

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Clause 6 still reads "A `.N` audit row qualifies only when clauses 1–4 admit it" (`SPEC/unattended-candidacy.md:74-76`), so the reported failure (judedelparte JD-041.N marked with .2/.3 open) is reproducible from the text as written.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md`, `claude/skills/ft-seed/SKILL.md`, `codex/skills/ft-seed/SKILL.md` (thin pointer, no change), the candidacy mirrors in `ft-epic-discovery` / `ft-refactor` / `ft-file-followup`.

- [x] **Best Practices Review** — N/A: contract prose, no code. The rule stays in the module once; mirrors carry only surface specifics (CORE-724.4's cut rule).

- [x] **Archive skim** — `archive/core/` (README table confirms `CORE-*`). Hits: CORE-577.1 (origin of the `.N` "clauses 1–4" note — reasoning was only that `/ft-close-epic` accepts `--unattended`, nothing about sibling order), CORE-577.N, CORE-603.1 / CORE-604.1 (applied clause 6 to `.N` only via clause 1), CORE-724.4 (mirrors keep only clause-6 specifics, never restate the predicate), CORE-726 (retag re-runs candidacy over the whole cohort — consistent with a `.N` that depends on siblings).

- [x] **Drift check** — PLAN line matches the module text; `/ft-seed` Step 2's "Resolve predecessors first, then dependents" has no `.N` case. Found one surface the PLAN line does not name: `/ft-epic-discovery` Step 7 evaluates `.N` while its own `.1` is still open (closes at Step 9). Under the new rule an open, never-candidate `.1` would block `.N` permanently there; its mirror reads `.1` as closed only for "the implementation child with no filed predecessor". One clause extends that to `.N`. `ft-epic-discovery` is 32,195 / 33,000 bytes — a one-clause add, not the substantial edit that budget row says should extract a fragment. `/ft-refactor` files no `.1`, so the module rule applies there unchanged.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

  No clarifications needed. Assumptions: "sibling" means every other child of the same parent, `.1` included (an open `.1` is never a candidate, so it holds `.N` back — an unscoped epic cannot have its audit dispatched); "same candidacy" means the sibling is itself a candidate in the pass; Fan-out does not change the `.N` rule (an audit follows every child regardless of chain shape).

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:** see the boxes above.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended clause 6's existing "same pass with the same candidacy" wording for `.N`, and the existing per-surface clause-6 specifics in the two mirrors (CORE-724.4 shape: no predicate restatement)

- [x] **Minimal refactor gate** — no refactor; four prose edits only

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: contract prose; grep checks + drift Pair N cover it

**Implementation Notes:**

- `SPEC/unattended-candidacy.md` clause 6: `.N` now qualifies only when every other child of its parent, `.1` included, is `- [x]` or a same-pass candidate; the `/ft-close-epic --unattended` coherence note kept. §"Seeding an existing plan": one sentence — `.N` waits on every open sibling, resolved after them.
- Final shape (after four review rounds): clause 6 defines **settled** once — `- [x]` or a same-pass candidate — and applies it to `.k` (stem predecessor) and `.N` / legacy numeric audit (every other child, `.1` included). The predicate intro now says it reads "the siblings clause 6 names". The attended branch gains a surface-neutral transitive cascade: a reply that drops a candidate drops every kept candidate leaning on it. §"Seeding an existing plan" restates the reading for an existing plan.
- `claude/skills/ft-seed/SKILL.md`: Step 2 resolves `.N` last and says an open, already-marked sibling does not count; Step 3 display names every sibling a `.N` waits on, and the ask warns about the cascade; the reply rule names the cascaded rows in the Step 5 report.
- `claude/skills/ft-epic-discovery/SKILL.md` Step 7: "the `.N` likewise reads `.1` as closed" — keeps `.N` reachable on the surface where `.1` is read as closed; its review-prompt reply rule and `/ft-refactor` Step 4's name the cascade (32,195 → 32,296 / 33,000).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (no code tests apply to SPEC/skill prose)

- [x] Ran lint/type-check on changed code — N/A: markdown only; `final_newline` + drift checks pass

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — five `/code-review medium` rounds; findings and dispositions in Testing Notes; — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no frontend change. Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line)

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

(Round-1 receipt, superseded by the final re-run at the end of these notes.)
- `grep -q 'every other child of its parent' … && ! grep -q 'qualifies only when clauses 1–4 admit it' SPEC/unattended-candidacy.md` → 0
- `grep -q '\.N. audit row waits on every' SPEC/unattended-candidacy.md` → 0
- `bash tools/drift-checks.sh` → 0 (pair_n ok, context_budget ok)

Review round 1 (`/code-review medium`, 7 findings): **blocker** — `/ft-seed` reply dropping a sibling still kept `.N` (JD-041 failure via the gate) → fixed (cascade). Notes fixed: already-marked sibling never settled `.N` (idempotency), `ft-epic-discovery` mirror ambiguous on `.1`, `/ft-seed` display named one predecessor, CONTEXT-BUDGET ledger stale. Notes filed as [[CORE-738]]: later sibling filing behind a marked `.N`, and no runtime sibling check in `/ft-close-epic --unattended`.

Round 2 (9 findings, after the Phase 2 return): cascade missing on `/ft-epic-discovery` and for ID-list / `all but` replies → moved the cascade into the module's attended branch once (transitive, every reply shape); `.k`/`.N` asymmetry on "already marked" → clause 6 rewritten around one **settled** definition for both; ft-seed's "an open `.1` declines it" contradiction and its Step 1 not recording marker state → fixed; long line → rewrapped; stale byte count → fixed; altitude (three wordings of the `.N` rule) → the two mirrors now carry only surface specifics (`resolve it last`; `.1` read as closed). Remaining: later sibling filing → same follow-up.

Round 3 (10 findings): **blocker** — "already marked" counted a mis-positioned token or a `[handoff]` row as settled, reopening JD-041 → *settled* now requires **dispatchable**. Notes fixed: stale receipt/notes, cascade sentence read as prose-gate-only ("On either gate shape"), no cascade warning at the `/ft-seed` gate, wrap-dependent acceptance grep. Notes to the follow-up: runtime ordering (a marked sibling running after `.N`), the `--fast` / `--unattended` `unattended-candidates:` line not showing `.N`'s dependency, the `/ft-epic-discovery` Step 7→9 interruption window.

Round 4 (9 findings): **blocker** — "already dispatchable" still settled a marked sibling that is `Blocked by` / `[!critical]`; each round found another hole in that arm, and no dispatch-order guarantee makes a marked-open sibling run before `.N` anyway → **removed the arm**: settled is `- [x]` or a same-pass candidate, the original conservative pair. Cost, accepted: an operator who drops `.N` in one `/ft-seed` run is not re-offered it while marked siblings stay open (false negative = status quo; hand-mark remains). Notes fixed: confirm-gate mirrors (`/ft-refactor`, `/ft-epic-discovery`) now name the cascade; predicate intro updated; legacy numeric audit child covered; rewrap; Subtasks ticked. To the follow-up: runtime ordering and later-sibling filing (same as rounds 1/3).

Round 5 (9 findings, all notes): fixed — legacy numeric audit in the `/ft-seed` mirror, attended display names every open sibling for an audit row, idempotency sentence corrected to the conservative behavior, seeding-section restatement realigned, `/ft-refactor` line rewrapped. To the follow-up: Step 7→9 interruption window in `/ft-epic-discovery`, where `/ft-refactor` / `/ft-epic-discovery` report cascaded rows. Recorded, not fixed: `ft-epic-discovery` held under cap again (32,296 / 33,000) — the next edit there must extract a fragment. Review loop stopped here: rounds 4–5 surfaced no blocker against the final shape.

Final receipt (after round 5 fixes) — all seven Acceptance verify commands → 0 (cascade grep: 1 hit in each of the three mirrors); `bash tools/drift-checks.sh` → 0.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — README, AGENTS.md, SPEC.md, MIGRATION, the four AGENTS-snippets, CONVENTIONS, CONTRIBUTING, SECURITY, AGENT-NEUTRALITY, PLATFORMS, CAPABILITIES, AGENT-COMPAT: no change (none restates clause 6); EXTERNAL-AGENTS: no change (cites the module, no stable-surface row moved); — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A for the always-loaded layer; — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

Clause 6 of `SPEC/unattended-candidacy.md` now gates a `.N` (or legacy numeric) audit row on every other child of its epic, `.1` included, being *settled* — `- [x]` or a same-pass candidate — and the attended branch carries a transitive cascade: a reply that drops a candidate drops every kept candidate leaning on it. `/ft-seed` resolves audits last, shows every sibling an audit waits on, and warns of the cascade at its gate; `/ft-refactor` and `/ft-epic-discovery` mirrors name the cascade, and `/ft-epic-discovery` reads its own `.1` as closed for `.N` too.

- Changed: `SPEC/unattended-candidacy.md`, `claude/skills/ft-seed/SKILL.md`, `claude/skills/ft-epic-discovery/SKILL.md`, `claude/skills/ft-refactor/SKILL.md`, `docs/CONTEXT-BUDGET.md` (ledger: `ft-epic-discovery` 32,296 / 33,000, cap held).
- Verification: seven Acceptance greps → 0; `bash tools/drift-checks.sh` → 0.
- Key decision: an open sibling already carrying `[unattended]` does **not** settle a dependent. Admitting it (rounds 1–3) kept surfacing holes — mis-positioned token, `[handoff]`, `Blocked by`, dispatch order — so the arm was removed for the original conservative pair; the cost is a false negative on re-seeding, which the module accepts by design.
- `touches:` reconciliation: declared 5 paths = `git diff --name-only` 5 deliverable paths (`claude/skills/ft-refactor/SKILL.md` and `docs/CONTEXT-BUDGET.md` added mid-task, declared before closure), plus PLAN.md / tasknote workflow paths.
- Maintainability: the rule lives once in the module; mirrors carry only surface specifics. `ft-epic-discovery` has ~700 bytes left — its next edit must extract a fragment.
- Deferred: [[CORE-738]] (runtime sibling guard + review notes).

**Archived:** 2026-10-08
