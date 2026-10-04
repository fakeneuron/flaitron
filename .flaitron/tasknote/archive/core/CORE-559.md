---
title: touches-scope-contract
status: completed
tags: []
created: 2026-09-10
due:
related-tasks: [CORE-EPIC-558, CORE-557]
touches:
  - SPEC.md
  - SPEC/gates.md
  - SPEC/procedures/ft-task.md
  - templates/tasknote-template.md
  - templates/tasknote-micro-template.md
  - claude/skills/ft-task/SKILL.md
  - claude/skills/ft-micro-task/SKILL.md
  - claude/skills/ft-goal-task/SKILL.md
  - docs/GLOSSARY.md
  - docs/MIGRATION.md
supersedes:
  - CORE-445.2
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

# CORE-559 | touches-scope-contract

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-EPIC-558]] · [[CORE-557]]

## 🎯 Goal

Make YAML `touches:` a declared-scope contract — expected on code tasks by the Phase 1→2 gate, and reconciled at Phase 4 against `git diff --name-only` so the evidence-based recap names undeclared changed paths as a recorded fact surfaced at 📦, never a blocking validator.

## ✅ Acceptance

- [x] `SPEC.md` §"Tasknote frontmatter" states `touches:` as the **declared-scope** claim expected on any file-editing task, and the omit-when-absent paragraph distinguishes "exempt" (no file deliverable) from "undeclared"
- [x] `SPEC.md` §"📝 Phase 1: Discovery" carries the declare clause on an **existing** checklist box — no new box, no new gate
- [x] `SPEC.md` §"🚀 Phase 4" evidence-based recap carries the reconciliation (`git diff --name-only` vs declared) in the stated signal shape, surfacing at 📦
- [x] `SPEC/gates.md` §"Phase 1→2 exit gate" states explicitly that an undeclared or mismatched `touches:` is **not** a 🛠️ fire condition
- [x] `templates/tasknote-template.md` + `templates/tasknote-micro-template.md` checklists mirror the two SPEC clauses; the commented frontmatter block is unchanged
- [x] The three SKILLs + `SPEC/procedures/ft-task.md` carry a one-line pointer each, not a copy of the contract
- [x] `docs/GLOSSARY.md` **touches** entry and `docs/MIGRATION.md`'s optional-planning-YAML sentence no longer call the key purely optional
- [x] No validator, no new checklist box, no new gate, no new lazy module
- [x] Every budgeted surface still under its `docs/CONTEXT-BUDGET.md` cap (`wc -c` recorded)

## 🧩 Subtasks

- [x] `SPEC.md` §"Tasknote frontmatter" — rewrite the `touches:` table row + extend the omit-when-absent paragraph with the exempt-vs-undeclared distinction
- [x] `SPEC.md` §"📝 Phase 1: Discovery" — append the declare clause to the existing "Subtasks above populated" box
- [x] `SPEC.md` §"🚀 Phase 4" — append the reconciliation clause to the existing Evidence-based recap box + one prose sentence giving the signal shape
- [x] `SPEC/gates.md` §"Phase 1→2 exit gate" — one sentence: declaring `touches:` is not a gate condition
- [x] `templates/tasknote-template.md` — mirror the two clauses into its Phase 1 / Phase 4 checklists
- [x] `templates/tasknote-micro-template.md` — mirror in its condensed shape
- [x] `claude/skills/ft-task/SKILL.md` — pointer in Step 4 (Phase 1) + Step 5 (Phase 4)
- [x] `claude/skills/ft-micro-task/SKILL.md` + `claude/skills/ft-goal-task/SKILL.md` — same pointer, their own shapes
- [x] `SPEC/procedures/ft-task.md` — same pointer, agent-neutral prose
- [x] `docs/GLOSSARY.md` + `docs/MIGRATION.md` — de-stale the "optional" wording
- [x] `wc -c` every budgeted surface against `docs/CONTEXT-BUDGET.md`; grep for accidental validator/new-box introduction

## 🔗 Related

- [[CORE-EPIC-558]] — predecessor; `.2`/`.3`/`.4` restored the exact surfaces this task edits (`depends-on:`, now closed 2026-09-10)
- [[CORE-557]] — same Phase 3/4 evidence theme (`related-decision:`)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The sequencing precondition holds — [[CORE-EPIC-558]] and all six children closed 2026-09-10, so the `.2`/`.3`/`.4` collision the PLAN line warned about is gone. The named surfaces all exist and all still carry the prose the line describes. The recorded-fact form the line prescribes is the one shape that does not trip `SPEC/scope-boundaries.md`'s schema-validator rejection.

- [x] Read relevant source files — no probe needed; the read set was named exactly by the PLAN line (six surfaces) plus `SPEC/scope-boundaries.md`, `docs/CONTEXT-BUDGET.md`, and the CORE-445 archive cohort

- [x] **Best Practices Review** — contract-layer markdown edit, not a module-boundary change. Touched responsibility: the tasknote frontmatter contract (`SPEC.md`) and its Phase 1 / Phase 4 restatements. Dependency direction is one-way (SKILLs and `SPEC/procedures/` cite `SPEC.md`, never the reverse), and the established abstraction to extend is the **labeled-mirror / canonical-source pattern** ratified in `docs/CONVENTIONS.md` §"Canonical source with labeled mirrors" — write once, point six times. Nearby duplication is the exact hazard the PLAN line flags; no in-scope refactor required, and no new mirror Pair filed (that would be scope creep on top of open [[CORE-562]]).

- [x] **Archive skim** — `grep -l "touches:" .flowtron/tasknote/archive/core/*.md` returns 119 notes, nearly all mere *users* of the key; narrowed to the cohort that **decided** its contract: `CORE-445.1` (discovery) and `CORE-445.2` (the shipping note). Findings logged below.

- [x] **Drift check** — all six named surfaces still carry the cited prose (line refs current as of this read). One real drift found and one live tension, both logged below.

- [x] Asked clarifying questions — three structured asks fired (reach / template shape / siting); answers recorded below

- [x] Subtasks above populated with concrete, ordered steps

**Discovery Notes:**

**Sequencing precondition cleared.** `CORE-EPIC-558` + `.1`–`.5` + `.N` are all `- [x] Completed 2026-09-10` (PLAN.md L34–40) and `git status --porcelain` is clean. The "would collide" warning on the PLAN line is discharged.

**Archive skim — the decision this task revises.** `CORE-445.2` (graph-lite yaml surface, 2026-08-17) shipped `touches:` and its three siblings as *optional, omit-when-absent, no validator*, with the templates carrying them as **comments** so "the happy-path scaffold pays nothing at parse time". `CORE-445.1` recorded the reasoning verbatim: "Templates: comment-or-omit in the shipped YAML (happy path pays nothing)" and "Omitted means *undeclared*, not 'touches nothing' / 'safe with everyone.'" CORE-559 revises the first half of that decision — `touches:` stops being merely optional and becomes *expected* on file-editing tasks — while preserving the second half and the no-validator posture intact. That is a partial supersession of a recorded decision, so this note carries `supersedes: [CORE-445.2]` per `SPEC.md` §"Tasknote frontmatter". **Correction made at Phase 4:** this note first assumed `CORE-445.2` was also owed a ⚠️ `Superseded by` pointer. It is not — `SPEC/superseded-claims.md` §"Scope is narrow" names "a superseded decision" as the *first* explicitly excluded case ("Decisions changing is the system working, not a defect… never via this ⚠️ pointer"). The ⚠️ pointer is for a claim that was **factually false about the repo**, which `CORE-445.2` never was. `supersedes:` on this note is the whole record; the archive is left untouched.

**Drift found — PLAN line wording vs. this repo.** The line says "required before the Phase 1→2 gate on **code tasks**". Flowtron self-hosts and virtually every one of its own tasks is a markdown-contract edit, so a literal "code tasks" rule would ship a scope contract flowtron never exercises on itself. Surfaced to the operator rather than silently corrected.

**Live tension — `SPEC/scope-boundaries.md`.** The rejection list names **schema validators** ("markdown is the schema; runtime checkers reintroduce the friction the v0.1.0 cut removed") and `CORE-445.2` shipped "no validator" as an explicit Acceptance criterion. The PLAN line already anticipates this and prescribes the recorded-fact form. Holding to it strictly: **no** Phase 1→2 refusal, **no** checker, **no** new checklist box — the reconciliation is one line of evidence inside a recap that already exists.

**Clarifications (3 asks fired):**

| Question | Answer | Consequence |
|---|---|---|
| Reach of the declare rule | **Any file-editing task** — code or markdown; pure-Discovery/audit tasks whose deliverable is a PLAN filing are exempt | Mechanism is dogfooded in flowtron itself; this very tasknote declares `touches:` |
| Template shape | **Keep the frontmatter block commented** | `CORE-445.2`'s "happy path pays nothing" decision survives; no empty array on exempt notes. The *checklists* in the templates still mirror the two new SPEC clauses — that is a different surface from the commented YAML block |
| Siting across six surfaces | **Canonical in `SPEC.md` + one-line pointers** | Extends the labeled-mirror pattern; cheapest in bytes; avoids minting a lazy module that would need an inline trigger on all six surfaces anyway to ever be loaded |

**Budget headroom measured before writing** (`docs/CONTEXT-BUDGET.md` caps in parentheses): `SPEC.md` 51,566 (57,000) → 5,434 free · `SPEC/gates.md` 35,382 (40,000) → 4,618 · `ft-task` 29,355 (33,000) → 3,645 · `ft-goal-task` 27,140 (33,000) → 5,860 · `ft-micro-task` 19,654 (33,000) → 13,346. Unbudgeted by design: `SPEC/procedures/`, `templates/`, `docs/`. The pointer-not-copy siting is what keeps the two tight surfaces comfortable.

**Not read, deliberately.** The PLAN line cites evidence in `natabula`'s `docs/QUALITY-STACK.md`. That is outside this checkout; `SPEC/scope-boundaries.md` §"Cross-repo edit remit" governs the edit direction and the operator's standing path rule governs the read. The routed PLAN line carries everything needed to execute.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the **canonical-source-with-labeled-mirrors** pattern ratified in `docs/CONVENTIONS.md`: the contract is written once in `SPEC.md`, and the eight downstream surfaces cite it rather than restating it. Rejected the alternative shape (a new `SPEC/touches.md`) on the ground that a lazy module only runs if something triggers the load, so all six restatement surfaces would still need an inline trigger — strictly more bytes for a contract this small. DRY holds: there is exactly one statement of what `touches:` means and what Phase 4 does with it.

- [x] **Minimal refactor gate** — no refactor. Both new clauses were appended to checklist boxes that already existed (`Subtasks above populated`, `Evidence-based recap`), so the box count is unchanged on every surface. No unrelated cleanup taken.

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`, markdown contract change; the repo's executable suites (`viz/`, `tools/`) are untouched. The CI `drift` job was still run locally as the nearest executable check (see Testing Notes).

**Implementation Notes:**

Ten files, one contract, written once:

| Surface | Change |
|---|---|
| `SPEC.md` §"Tasknote frontmatter" | `touches:` row reworded to **Declared scope**; new paragraph giving it the lifecycle duty the other three planning keys lack, and defining the *only* exemption (no file deliverable) |
| `SPEC.md` §"📝 Phase 1" | Declare clause appended to the existing "Subtasks above populated" box |
| `SPEC.md` §"🚀 Phase 4" | Reconciliation appended to the existing recap box, plus a `**Scope reconciliation.**` paragraph carrying the literal signal shape in a fenced block |
| `SPEC/gates.md` §"Phase 1→2 exit gate" | One paragraph: `touches:` is **not** a gate condition — absent, partial, or later wrong, it never fires 🛠️ |
| `templates/tasknote-template.md` | Both clauses mirrored into its Phase 1 / Phase 4 checklists. Commented frontmatter block **unchanged** |
| `templates/tasknote-micro-template.md` | New `**Declared scope:**` line in `## ⚡ Notes`; reconciliation folded into the Recap prompt |
| `claude/skills/ft-task` · `ft-micro-task` · `ft-goal-task` | One-line pointer each at their Phase 1 and Phase 4 restatements |
| `SPEC/procedures/ft-task.md` | Same pointer, agent-neutral prose |
| `docs/GLOSSARY.md` · `docs/MIGRATION.md` | De-staled the "optional planning YAML" wording |

**Defect found and fixed mid-execution.** The reconciliation as first written would have flagged the task's own tasknote and its `PLAN.md` row on *every* closure — both are rewritten by closure itself, so they carry no scope signal and would have buried the paths that do. `SPEC.md` now excludes them explicitly, and this note's own declaration was trimmed from 11 paths to 10 to match the rule it ships.

**Three things deliberately not done.** No new checklist box (verified by count). No new mirror Pair in `/ft-release` §7.1 binding `SPEC.md`'s checklists to the templates' — the drift is real but filing it belongs with open [[CORE-562]], not bolted on here. No ⚠️ pointer on `CORE-445.2` (see the Phase 1 correction).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `N/A`: no executable code changed. `viz/` and `tools/` are untouched, so their suites cover nothing in this diff. Ran the CI `drift` job locally instead, which is the only automated gate that reads these files.

- [x] Ran lint/type-check on changed code — `N/A` for the same reason; `git diff --check` substituted (`.editorconfig` compliance: LF, no trailing whitespace, final newline).

- [x] **Quality assertions** — no duplication introduced (the pointer-not-copy siting is the whole point), no dead prose, no public-surface growth (zero new keys, boxes, gates, flags, or modules), no stale code-facing docs left behind (`GLOSSARY` + `MIGRATION` de-staled in the same commit).

- [x] (frontend) Visual confirmation — `N/A`, no frontend surface touched.

**Testing Notes:**

```
git diff --check                                    → clean
bash <drift job steps from .github/workflows/ci.yml> → exit 0, no output (must print nothing)
```

**Budget check** (`wc -c` vs `docs/CONTEXT-BUDGET.md`) — every budgeted surface passes, and the two tight ones keep more than one working unit of headroom:

| Surface | Bytes | Cap | Free |
|---|---|---|---|
| `SPEC.md` | 53,631 | 57,000 | 3,369 |
| `SPEC/gates.md` | 35,936 | 40,000 | 4,064 |
| `claude/skills/ft-task/SKILL.md` | 29,692 | 33,000 | 3,308 |
| `claude/skills/ft-goal-task/SKILL.md` | 27,325 | 33,000 | 5,675 |
| `claude/skills/ft-micro-task/SKILL.md` | 19,931 | 33,000 | 13,069 |

`SPEC/procedures/`, `templates/`, and `docs/` are unbudgeted by design.

**Structural invariants asserted:**

```
new unchecked boxes, SPEC.md                → 27 → 27 (unchanged)
new unchecked boxes, tasknote-template.md   → 23 → 23 (unchanged)
markdown fences, SPEC.md                    → 14 (balanced)
grep '+' lines for validator|refuse|must fail|AWAITING APPROVAL
                                            → 5 hits, all five negations
                                              ("no validator", "never refuses",
                                               "recorded fact, not a check",
                                               "the schema-validator archetype … rejects")
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — walked all 18 entries in `.flowtron/tasknote/README.md` §"AI-referenced docs". `SPEC.md` and `docs/MIGRATION.md`: **updated by this task**. The other sixteen: **no change** — a grep for `touches` / `declared scope` / `planning keys` across the set returned exactly one other hit, `CONTRIBUTING.md` L29 ("if your change touches a skill"), unrelated English. `docs/VISION.md` §"What we won't accept" was read specifically to test for conflict: it rejects "a JSON-schema validator (or equivalent runtime checker)", and this task ships neither — the reconciliation is the assistant catching drift in prose, which is the behavior VISION names as the alternative to a validator. No change.

- [x] Closed — every `## ✅ Acceptance` criterion ticked, YAML `status:` flipped to `completed`, PLAN.md line flipped to stub form and moved to the top of `## Completed`, tasknote moved to `.flowtron/tasknote/archive/core/`

- [x] **Evidence-based recap** drafted

**Final Summary:**

`touches:` is now a **declared-scope contract** rather than an optional label. Phase 1 fills it with the paths a task expects to edit — code or markdown, this repo's own contract edits included — and Phase 4 reconciles it against `git diff --name-only`, printing one line at 📦 that names anything changed without being declared. It is a recorded fact and never a gate: nothing refuses, nothing re-opens a phase, and a task that legitimately grew says so on the same line and closes.

**Scope reconciliation.** Declared 10 files, changed 10. **No undeclared paths.** (Own tasknote + PLAN row excluded per the rule this task ships.)

**Changed files** — 10, all markdown, ~3,400 bytes net:

- `SPEC.md` (+2,929 bytes) — the whole contract: frontmatter meaning, Phase 1 declare clause, Phase 4 reconciliation + signal shape
- `SPEC/gates.md` (+554) — one paragraph asserting `touches:` is not a gate condition
- `templates/tasknote-template.md` (+215), `templates/tasknote-micro-template.md` (+215) — checklist mirrors
- `claude/skills/ft-task` (+337), `ft-goal-task` (+185), `ft-micro-task` (+277), `SPEC/procedures/ft-task.md` — one-line pointers
- `docs/GLOSSARY.md`, `docs/MIGRATION.md` — de-staled "optional" wording

**Verification** — `git diff --check` clean; CI `drift` job run locally, exit 0 with no output; box counts unchanged on every surface (SPEC.md 27→27, template 23→23); SPEC.md fences balanced (14); all five `validator|refuse|must fail` grep hits are negations. Every budgeted surface under cap with >3,300 bytes free (tightest: `ft-task` 29,692/33,000).

**Refactors** — none made; none needed. Both new clauses append to boxes that already existed, which is what kept the box count flat and the budget impact under one working unit on every surface. One deferred: `SPEC.md`'s Phase 1/Phase 4 checklists and `templates/tasknote-template.md`'s copies of them are an unbound mirror pair, and `/ft-release` §7.1 has no Pair covering it. Real, but filing it belongs with open [[CORE-562]] rather than bolted onto this task.

**Documentation verdict** — `SPEC.md` + `docs/MIGRATION.md` updated as deliverables; `docs/GLOSSARY.md` de-staled; sixteen remaining swept docs verified no-change. `docs/VISION.md` specifically cleared for conflict.

**Design decisions recorded** — three operator asks settled the shape. (1) **Reach**: any file-editing task, not the PLAN line's literal "code tasks" — under the literal reading flowtron would ship a scope contract it never exercises on itself. (2) **Template shape**: the commented frontmatter block stays commented, so `CORE-445.2`'s "happy path pays nothing at parse time" survives intact; only the *checklists* changed. (3) **Siting**: canonical in `SPEC.md` with one-line pointers, extending the labeled-mirror pattern — a `SPEC/touches.md` module would have needed an inline trigger on all six surfaces anyway, costing more bytes than it saved.

**Partial supersession, recorded correctly.** This revises the "purely optional" half of `CORE-445.2`'s decision while preserving its no-validator half and its "omitted ≠ nothing" rule. Recorded as `supersedes: [CORE-445.2]` on this note only — `SPEC/superseded-claims.md` explicitly excludes a superseded *decision* from the ⚠️ pointer, and the archive was left untouched.

**Maintainability effect.** Scope sprawl becomes readable in five seconds at the commit gate without opening a diff, and the mechanism costs one line of YAML per task and one line of recap. Because it declares rather than checks, it narrows tasks at the point where narrowing is cheap — Phase 1 — instead of measuring them after they have already sprawled.

**Archived:** 2026-09-10
