---
title: unattended-prep audit
status: completed
tags: []
created: 2026-10-13
due:
related-tasks: [CORE-EPIC-783, CORE-783.1, CORE-783.2, CORE-783.3]
# Optional planning keys — omit when absent (SPEC.md §Tasknote frontmatter).
# Omitted means undeclared, not "touches nothing" / "safe with everyone".
touches:
  - .flaitron/PLAN.md
  - docs/PLATFORMS.md
# blocked-by:
#   - TASK-ID
# parallel-safe-with:
#   - TASK-ID
# supersedes:
#   - TASK-ID
---

# CORE-783.N | unattended-prep audit

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-783]]

## 🎯 Goal

Verify the completed CORE-EPIC-783 (`unattended-prep`) cohort sits coherently in the codebase: cumulative doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs", naming/style consistency across the cohort's deliverables, and a child row filed for any miss.

## ✅ Acceptance

- [x] **Doc-drift sweep (fixed line, per SPEC/epic.md §"Audit acceptance — fixed doc-drift line")** — for each entry in `.flaitron/tasknote/README.md` §"AI-referenced docs", state "no change" or the specific update. Always present; surfaces cumulative slice-local staleness that per-task Phase 4 closures can miss.
- [x] Cohort coherence inventory: each implementation child's deliverables read against the others (naming consistency, style parity, no contradictory cross-refs)
- [x] No regressions surfaced in earlier-shipped cohort children's surfaces
- [x] Audit findings recorded in Implementation Notes; each miss filed as an open child row of `CORE-EPIC-783` (Step 5), landing in the audit's closure commit — no child row; one inline fix
- [x] Single `feat: CORE-783.N — audit CORE-EPIC-783` (or `chore: ...` if no code edits land) commit lands — `chore:` (prose count fix, no code)
- [x] PLAN.md line for `CORE-783.N` flipped to stub form `Completed YYYY-MM-DD.`
- [x] Tasknote moved to `.flaitron/tasknote/archive/core/CORE-783.N.md`

## 🧩 Subtasks

- [x] Inventory cohort children's archived tasknotes — read each implementation child's Final Summary + Implementation Notes; capture deliverables in Discovery Notes
- [x] Walk `.flaitron/tasknote/README.md` §"AI-referenced docs" entries — fixed doc-drift sweep
- [x] Cohort coherence pass — naming consistency, style parity, no contradictory cross-refs across the cohort's deliverables
- [x] Surface audit findings in Implementation Notes; file each miss as an open child row (Step 5) — one inline fix, no child row
- [x] Phase 4: flip `CORE-783.N` PLAN line to stub form + archive tasknote

## 🔗 Related

- [[CORE-EPIC-783]] — parent epic
- [[CORE-783.1]] · [[CORE-783.2]] · [[CORE-783.3]] — audited cohort

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** Operator-invoked `/ft-task CORE-783.N`. Implementation children `.1`–`.3` were already `[x]` (2026-10-13). Full-cohort audit. Parent `CORE-EPIC-783` is still open under Medium.

- [x] Read relevant source files — the three archived cohort notes, `SPEC/unattended-candidacy.md` (clause 3 and §"Preparing declined rows"), `SPEC/plan-filing.md` §"Filing commits", `claude/skills/ft-prep-unattended/SKILL.md`, and the roster sentences the children edited

- [x] **Best Practices Review** — N/A: verification pass over shipped prose. The predicate and the pin/split/stay taxonomy stay in `SPEC/unattended-candidacy.md`. The skill Reads that section and does not restate clause 3.

- [x] **Archive skim** — `<area>` is `archive/core/` (README table). The cohort notes are the archive set. Clause 3 precedents ([[CORE-577.2]], [[CORE-598.3]], [[CORE-724.4]], [[CORE-736]]) were already graded by [[CORE-783.2]] and were not re-read. No ⚠️ pointer on the cohort notes.

- [x] **Drift check** — the PLAN line is the fixed audit row from `SPEC/epic.md`. Shipped paths exist. `ls claude/skills` and `ls codex/skills` are the same 12 slugs. The worked examples in `docs/PLATFORMS.md` still said 11 and omitted `ft-prep-unattended` from the Claude name list. That is in-scope staleness, not a re-scope.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions — No clarifications needed. Dated records stay as written: `docs/CODEX-VERIFICATION.md` (2026-10-01, twelve wrappers under the pre-v7 names), `docs/VERSION-HISTORY.md`'s rename note, and the standing-check sentence about the retired eleven-slug gate. "The seven filing motions" stays the original set. Seed and prep are named beside it, the same shape as Pair O.

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

Cohort inventory:

- **[[CORE-783.1]] unattended-prep discovery** — filed `.2` (45w) and `.3` (34w). Fan-out: Sequential `.3` after `.2`, Synthesis `.N`. Withdrew "seed is the only writer." Project-07 mirror left as a handoff. Commit `3777620b`.
- **[[CORE-783.2]] candidacy-prep-boundary** — clause 3 is two layers. The keyword list is unchanged. A miss is not a semantic pass. An LLM filer and `/ft-prep-unattended` decline a person-shaped row. No visual keywords. `[handoff]` stays definitive. Project-07 row `CBN-361` filed in that repo (`07fe6cf0`); `selection.py` was not edited from this checkout. Commit `487e3a7a`.
- **[[CORE-783.3]] prep-unattended-skill** — attended flagless `/ft-prep-unattended`. Taxonomy in §"Preparing declined rows". Filing message `chore: prep unattended — <N> rows`. Adopter-subset roster beside seed. Pin-guard is the seventh body. Commit `f6c6ccd9`.

Regression greps at this HEAD still pass: clause 3 layers, the sentence absent from `claude/skills/`, the filing message, and the flagless skill body (`never writes [unattended]`, no `argument-hint:`). `wc -c claude/skills/ft-prep-unattended/SKILL.md` is 12,068, matching the ledger row [[CORE-783.3]] wrote. Drift checks `skill_name_invariant`, `shipped_skill_parity`, `skill_pin_guard_parity`, `pair_n`, `pair_o`, `pair_q`, and `context_budget` all returned ok.

Discovery surfaced no significant deviation → skip 🛠️.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended an existing pattern or justified a new shape

  Extended the two worked-example sentences already in `docs/PLATFORMS.md`. The policy table and the standalone-skill sentence were already updated by [[CORE-783.3]]. No new shape.

- [x] **Minimal refactor gate** — refactored only for Acceptance or touched-path coherence; deferred unrelated cleanup

  No refactor. The "seven filing motions" phrase and the dated verification records were left as written.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior

  No new test. The change is two prose counts. `bash tools/drift-checks.sh context_budget` still returns ok. A directory compare shows the Claude parenthetical now names the same 12 slugs as `claude/skills/`.

**Implementation Notes:**

One miss, fixed inline. `docs/PLATFORMS.md` §"Worked example: Claude Code" said 11 skill bodies and listed every slug except `ft-prep-unattended`. §"Worked example: Codex CLI" said 11 wrappers, one per Claude slug. Both directories hold 12. The count is now 12, and the Claude list names `ft-prep-unattended` beside `ft-seed-unattended`.

No other roster sentence in the AI-referenced set still omits the skill where it enumerates the shipped inventory or the adopter subset. `SPEC.md` does not roster skills (seed is absent there too). `claude/CAPABILITIES.md` has no slug list. `docs/MIGRATION.md` §1.2 names prep in the policy sentence. The short-version clause still covers the tasknote family and `/ft-update` only, which is how seed was already treated. `CONTRIBUTING.md` wires `.claude/` by glob, so the new slug needs no line. Local `.claude/skills/ft-prep-unattended` resolves. The skill does not copy clause 3. Pair O names the prep commit beside seed. The surfaces table row is present.

No follow-up child. The parent can flip with this audit.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — N/A: prose count fix, no code test surface

- [x] Ran lint/type-check on changed code — N/A: markdown. `bash tools/drift-checks.sh context_budget` → ok

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) N/A — no UI in this change

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Verification receipt:

- Slug compare of the Claude worked-example parenthetical plus the two `ft-audit`-family skills against `ls claude/skills` → exit 0 (missing `[]`, extra `[]`). Codex line contains `12 SKILL.md wrappers`. No remaining `11 SKILL.md`.
- `bash tools/drift-checks.sh context_budget` → exit 0 (`context_budget ok`)
- `grep -q 'A keyword miss is not a semantic pass' SPEC/unattended-candidacy.md && grep -q 'Two layers'` → exit 0. The sentence is absent from `claude/skills/`.
- `grep -F -q 'chore: prep unattended — <N> rows' SPEC/plan-filing.md` → exit 0
- Flagless skill checks (`test -f`, no `argument-hint:`, `never writes [unattended]`) → exit 0

Structural: N/A for code. The edit adds one existing slug to an existing list. No new surface.

External review (read-only probe): no blockers, no notes. It did not grade the tasknote or the closure mechanics. Nothing to fix or file.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — per `.flaitron/tasknote/README.md` §"AI-referenced docs" entry: "no change" or the update

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — anything the always-loaded layer (AGENTS.md / README §AI-referenced docs) should carry? `N/A` or the line

**Final Summary:**

The unattended-prep cohort sits together. Clause 3 still says a keyword miss is not a semantic pass, and `/ft-prep-unattended` still classifies declined rows without writing `[unattended]`. One stale count: the platform worked examples still said 11 skills after the twelfth shipped. That count is now 12.

Doc-drift sweep: `README.md` no change. `AGENTS.md` no change. `SPEC.md` no change. `docs/MIGRATION.md` no change. `claude/AGENTS-snippet.md` no change. `codex/AGENTS-snippet.md` no change. `cursor/AGENTS-snippet.md` no change. `grok/AGENTS-snippet.md` no change. `docs/CONVENTIONS.md` no change. `CONTRIBUTING.md` no change. `SECURITY.md` no change. `docs/AGENT-NEUTRALITY.md` no change. `docs/PLATFORMS.md` updated — worked-example counts 11→12, and the Claude list names `ft-prep-unattended`. `claude/CAPABILITIES.md` no change. `docs/AGENT-COMPAT.md` no change. `docs/EXTERNAL-AGENTS.md` no change. `docs/WORKTREES.md` no change. `docs/VISION.md` no change.

`touches:` reconciliation: declared `.flaitron/PLAN.md` and `docs/PLATFORMS.md`. The tasknote's own archive move is excluded. No other path.

Learnings: N/A. The catch for this count is the audit sweep itself.

**Archived:** 2026-10-13
