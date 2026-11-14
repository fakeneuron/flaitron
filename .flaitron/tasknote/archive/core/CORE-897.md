---
title: seeder-fleet-gaps
status: completed
tags: [seed-unattended, fleet-feedback]
created: 2026-11-09
due:
related-tasks: [CORE-619, CORE-EPIC-812, CORE-850.4]
touches:
  - SPEC/unattended-candidacy.md
  - SPEC/plan-filing.md
  - claude/skills/ft-seed-unattended/
---

# CORE-897 | seeder-fleet-gaps

[← PLAN.md](../PLAN.md) · ✅ Completed · 🔗 [[CORE-619]] [[CORE-EPIC-812]] [[CORE-850.4]]

## 🎯 Goal

Resolve the ten `/ft-seed-unattended` gaps from Natabula NAT-551 by deciding each policy and landing it in the candidacy module, the seeder body and fragment, and (for padding) `SPEC/plan-filing.md`, preserving the one attended review, exact bytes, fresh re-scan, and dependency cascades.

## ✅ Acceptance

- [x] Every finding above has a recorded disposition and an exact before/after worked case for changed behavior; retained restrictions have rationale — judgment: markdown procedure behavior requires semantic review, not a grep that merely finds its own words.
- [x] Canonical rules, the seeder body and its question fragment agree; parser grammar remains authoritative and dependency/drop/re-scan invariants remain intact — judgment: review against the ten cases and existing workflow contracts.
- [x] Section citations, mirrors and context budgets pass — `bash tools/drift-checks.sh`.

## 🧩 Subtasks

- [x] `SPEC/unattended-candidacy.md` — clause 3 keyword matching (5); Never-autonomous split exception (1); §"Seeding an existing plan" walk scope (3), marks/corrections (2), one stay reason (4); §"Preparing declined rows" Correction bullet (2), Split exception (1), Stay edits, **Notes and stubs** (9, 10), **Stay reason** (4), **Row length** (6); surfaces table row
- [x] `SPEC/plan-filing.md` §"ID allocation" step 4 — mixed-padding width rule (7)
- [x] `claude/skills/ft-seed-unattended/SKILL.md` — Step 1 parser-aligned collection + counts (3); Step 2 note read before marks (9), per-operation collisions (10), correction class (2), pin cap (6), glyph follows source (8), Never-autonomous split screen (1), stay reason (4); Step 3 counts / `untouched:` / correction / stay line / not-seeded list; Step 4 re-scan + recognized hunks; Step 5 + Notes
- [x] `claude/skills/ft-seed-unattended/scope-and-question.md` — option ≤70 words (6); standalone-question collision pointer (10)
- [x] Worked before/after cases for all ten recorded in Implementation Notes
- [x] `bash tools/drift-checks.sh` + body under its 33,000 cap

## 🔗 Related

- [[CORE-619]] — `/ft-seed-unattended` origin
- [[CORE-EPIC-812]] — pin / split drafting absorbed into the seeder
- [[CORE-850.4]] — scope and question dispositions
- Natabula NAT-551 (external) — source routing task and fleet evidence; NAT-547/548/549/550 out of scope

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** All ten gaps reproduce in the current text (drift check below); the operator chose one task over a split or epic.

- [x] Read relevant source files — `SPEC/unattended-candidacy.md`, `claude/skills/ft-seed-unattended/SKILL.md` + `scope-and-question.md`, `SPEC/plan-filing.md` §"ID allocation", `SPEC/plan-parser.md` (exclusions), `SPEC/tasknote-selection.md` thresholds, `viz/src/parser.ts` `BULLET_CHECKBOX`

- [x] **Best Practices Review** — policy lives once in the module, procedure in the body/fragment (the skill's own Notes rule); padding goes in plan-filing (shared rule), not a seeder duplicate

- [x] **Archive skim** — `archive/core/` confirmed against the README table. Load-bearing: CORE-850.4 (in-flight note on a heavy row stays — kept, generalized by case 9; failed drafts free cap slots), CORE-812.3 (re-scan must re-run collision checks on every kept preparation — extended to `untouched:` files), CORE-797/799 (sidequest-stub collision origin — kept for split/scope)

- [x] **Drift check** — starter filed at `19bbe250`; only `7fb43f47` touched an in-scope file since (`tasknote-selection.md` header, unrelated). Every cited rule reproduces: Never-autonomous "never a split", marks with no defect path, Step 1 collecting every `- [ ]`, "first clause that failed", undefined keyword matching, ≤50 on split rows only, "zero-padded like", `[light]🔧`/`[moderate]🧩`, starter-only Basis read, blanket collision stay. PLAN line matches the starter. Codex wrapper is a pointer (449 bytes), no mirror edit.

- [x] Asked clarifying questions OR logged "No clarifications needed" with explicit assumptions

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared (omit only with no file deliverable)

**Discovery Notes:**

**Decisions (operator, AskUserQuestion, 2026-11-14) — every case took the recommended option:**

| # | Decision |
|---|---|
| 1 | Separable-act split: a Never-autonomous row may split when its act is distinct from a local slice; the mechanical row passes the full predicate (Never autonomous included) plus both Split tests; the remainder keeps the act. Never a pin/scope/mark for the act. Not for undecided design (question path) or opening an epic. |
| 2 | Corrections on mechanical evidence only: a verify `grep` whose search covers PLAN.md and whose pattern the row's own text holds, or a backticked missing path with exactly one git rename. Such an admitted row is a `correction` (pin-shaped + token item) or a stay naming the defect. Marked rows: reported, never repaired. |
| 3 | Walk exactly parser task rows + legacy `## Critical` (stay, clause 2); ID-less checkbox / comment / fence lines counted `not tasks`; ID-bearing grammar failures listed `malformed — not seeded`. |
| 4 | One decisive stay reason: structural → Never-autonomous item → note state → collision → cap → first failed clause; collisions/caps carry no clause number. |
| 5 | Keywords match case-insensitively anywhere inside a word (deploys, Redeploy, Secrets trip; migrate, employ don't). |
| 6 | Pins, corrections and question options ≤70 words; new mechanical + remainder ≤50; pointer suffix excluded; over → draft fails `over cap — N words`; no override. |
| 7 | Pad to the written width of the ID holding max N (wider on a tie). |
| 8 | Mechanical row carries a glyph only when its source row does. |
| 9 | Read every walked row's note before marks: `blocked` → stay clause 4 `parked — <park-reason>`; other non-starter → `note in flight`; archived note on an open row → `archived note`; never touched. |
| 10 | Per operation: mark / pin / correction / standalone question proceed beside a `status: starter` note or sidequest stub (gate shows `untouched: <path>`, re-scan checks it unchanged); split / scope / riding question stay `collision — <path>`. |

Assumptions: corrections are a seeder-only class (filers draft fresh rows); the worked before/after cases live in this note, not the module (keeps the lazy module lean; the starter asked for cases, not a doc table).

Starter context, preserved verbatim (the Acceptance cites its table):

> _Captured 2026-11-09 by Natabula NAT-551 from the 2026-11-07 fleet seeding walk. Drift-checked against flaitron HEAD `19bbe25030cde6b05e5d52755640dd17ef46c2de` (`v8.4.0-7-g19bbe250`). Promote in the owning flaitron checkout; this filing does not authorize implementation decisions._
>
> **Why this exists**
>
> The v8.3.0 fleet walk found ten gaps or ambiguities. They remain in the current markdown procedure/contract. These are static procedure reproductions, not a claim that a new live fleet walk was executed. Historical repository examples below are evidence captured by NAT-551's original starter, not freshly verified application state.
>
> | # | Current evidence and minimal case | Required outcome to decide upstream |
> |---|---|---|
> | 1 | `SPEC/unattended-candidacy.md` / Never autonomous requires a stay and says never a split. A mixed row containing an independent local code slice plus a real deployment act cannot reach the otherwise clean Split test. Historical cases: adppro DATA-48/DEPLOY-12, fakeneuron-nas NAS-19, cloutomaton CORE-57, siteguy CORE-129, stockshock SS-65. | Decide a narrow attended split exception; keep the person act in the remainder, require the slice to work and ship without it, and screen the exact new row. Never admit the person act. |
> | 2 | Seeder Step 2 immediately makes an admitted row a mark; preparations are only for declined rows. An otherwise admitted light row with a Verify grep matching its own PLAN description gets no correction path. Historical cases: pidlyse PID-104, aetherlace AL-045, blastimage BI-083, marscharts CORE-495 (Verify hand-fixed Nov 7); stale refs BE-530 and false fact FS-042. | Offer bounded factual corrections under the same attended review, re-screen exact bytes, and re-scan before writing. Decide evidence limits; do not silently repair already-marked rows. |
> | 3 | Seeder Step 1 collects every open checkbox bullet, including ID-less prose that `SPEC/plan-parser.md` excludes. Conversely, `- **PID-030** ...` has no checkbox: both the reference parser (`BULLET_CHECKBOX`) and seeder exclude it. The original report's implication that the parser accepts it was incorrect. Comments/fences and legacy Critical headings also need an explicit policy. | Align eligible tasks with parser grammar/exclusions and report malformed ID-bearing bullets separately. Do not silently count or seed them as valid tasks. Historical invisibrain ID-less count: 10/11; pidlyse PID-030 malformed bullet. |
> | 4 | Seeder Step 2 and module / Seeding an existing plan demand the first failed clause, but collision stays have no clause. A heavy epic parent fails clause 1 before structural clause 5; a heavy .N can likewise be reported merely as a tier stay. | Specify whether semantic/structural dispositions override predicate-order reporting, and give collisions/caps a non-clause reason. Keep candidacy conservative. |
> | 5 | Clause 3 says words deploy, secret, migration etc., without defining case, boundaries or inflections. Cases such as deploys, Redeploy, secrets, migrations can yield different mechanical screens; the semantic layer still applies. | Specify normalization/matching with positive and negative examples; preserve skipped own-ID/backtick spans and the independent semantic refusal. Do not assume arbitrary substring matching. |
> | 6 | The general active-row cap exists in `SPEC/tasknote-selection.md`, but seeder Step 2 explicitly applies 50 words only to split rows. Pin and question-option drafting/re-scan have no corresponding explicit check. Historical studio3pnf CORE-055 option a reached 81 words. | Enforce the existing target/hard cap for every drafted rewritten row and option, excluding only the established pointer suffix; specify over-cap handling without inventing an override. |
> | 7 | `SPEC/plan-filing.md` / ID allocation says zero-pad like existing IDs, without resolving mixed padded/unpadded history (historical cloutomaton CORE-58). | State a deterministic tie-break or bounded operator decision; preserve numeric max+1 and collision rules. This is an ambiguity in the shared rule, not an absent allocation rule. |
> | 8 | Seeder Step 2 requires new mechanical rows as [light]🔧 or [moderate]🧩, while parser docs call these glyphs decorative. Historical glyph-free plans: wandora and natabula. | Decide whether mechanical rows follow the plan's glyph style; preserve model tiers and token placement. |
> | 9 | Clause 4 checks row-text Blocked by, not an active note's status: blocked. Step 2 Basis read only reads starters; an otherwise admitted light row whose note is parked can become a mark before collision checks for declined rows run. Historical NAT-537 and delparte DP-136. | Define parked-note handling before admitting marks; preserve blocked runner semantics, record the reason, and never mutate/restart the note here. |
> | 10 | Seeder Step 2 and Stay bullet make every source note/stub collision a stay, even for a pin or standalone question that creates no starter. Historical bidviz TEST-005 and marscharts FE-547. | Decide operation-specific collision rules with consistency and re-scan duties; retain protection against overwriting notes/orphaning stubs. A pre-existing stub may itself need a consistency rule, so simply removing the guard is insufficient. |
>
> **Solution shape**
>
> - Resolve the open policy choices in Phase 1, then update canonical candidacy rules and their seeder procedure/fragment together. Shared padding belongs in plan-filing, not a seeder-only duplicate.
> - Preserve one attended review, exact proposed bytes, fresh re-scan, dependency cascades, filing commit verification, no autonomous token write, and no second fleet-wrapper predicate.
> - Use table-driven worked cases for marks/preparations/stays, skipped and malformed counts, blocked notes, collisions, caps and dependency drops. Do not add an executable seeder, schema validator, or cross-project API.
> - If Discovery finds implementation too broad, split through the owning workflow before source changes; this starter preserves the full intake without pretending the policy is settled.
>
> **Files to touch (preliminary survey — drift-check at promotion)**
>
> - `SPEC/unattended-candidacy.md` — authoritative eligibility/preparation/reporting policy.
> - `claude/skills/ft-seed-unattended/SKILL.md` — collect/classify/draft/review/re-scan/write/report.
> - `claude/skills/ft-seed-unattended/scope-and-question.md` — question options and operation-specific collisions.
> - `SPEC/plan-filing.md` — mixed-padding ambiguity only, if resolved here.
> - Read `SPEC/plan-parser.md`, `viz/src/parser.ts`, and `SPEC/tasknote-selection.md` as authorities; no grammar change implied. Update mirrors/docs only where the chosen implementation requires them.
>
> **Explicitly out of scope**
>
> - Natabula wrappers (NAT-547/NAT-548), audit-filer hygiene (NAT-549), and Caobunga hints/coverage (NAT-550).
> - Editing adopter application rows or rerunning fleet seeding; changing Natabula's submodule pin; release, push, merge or deploy.
> - Relaxing Never autonomous for actual external/person acts or granting unanswered choices approval.
>
> **Open at promotion (Phase 1 should resolve)**
>
> - Settle the narrow split exception, bounds on admitted-row corrections, parser diagnostic policy, reason precedence and keyword matching from cases 1–5.
> - Settle over-cap handling, mixed-padding style, glyph policy, parked-note eligibility and operation-specific note/stub consistency from cases 6–10.
> - Decide whether the implementation should be decomposed after Discovery; do not mark this unresolved policy work unattended.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended existing shapes: the Correction bullet copies the Pin bullet's form; **Notes and stubs** / **Stay reason** / **Row length** follow the bold-lead paragraph shape of **Per-walk caps**; the split exception mirrors the existing question exception in §"Never autonomous"

- [x] **Minimal refactor gate** — no refactor; the old collision sentence (Stay bullet, body Step 2) was replaced, not duplicated

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — N/A: markdown procedure, no executable seeder (out of scope by the starter); the worked cases below are the check

**Implementation Notes:**

Changed: `SPEC/unattended-candidacy.md` (30,955 → 37,114; lazy, unbudgeted), `SPEC/plan-filing.md` (27,119 → 27,293), `claude/skills/ft-seed-unattended/SKILL.md` (24,685 → 27,942 of 33,000), `scope-and-question.md` (12,972 → 13,157). Final sizes after the review fixes.

Worked before/after cases (one per finding):

| # | Input | Before | After |
|---|---|---|---|
| 1 | `- [ ] **DATA-48** [moderate] \| cache layer — Add the read-through cache in `src/cache.ts`, then deploy to production.` | stay — Never autonomous (deploy) | split: remainder `DATA-48` keeps the deploy; mechanical `DATA-49 [moderate] \| read-through cache — Add the read-through cache in `src/cache.ts`.` screened by keyword + meaning, both Split tests; item fires if clauses 1–6 admit it. A row that is only "deploy v2" still stays (whole row is the act). |
| 2 | `- [ ] **PID-104** [light] \| x — Add flag; verify `grep -rq "useFlag" .`` (row text holds `useFlag`) | mark as it stands (verify passes on PLAN.md) | correction: `grep -rq --exclude-dir=.flaitron "useFlag" .` + `defect:` line + item. Same row already `[unattended]` → `already marked — self-matching verify; not repaired`. `grep -q x .flaitron/PLAN.md` → stay naming the defect. |
| 3 | `- [ ] add docs` (no ID); `- [ ] **PID-030** …` inside a fence; `- **PID-030** …` no checkbox; row under `## Critical` | ID-less line walked as a row; fenced line walked; no-checkbox bullet silently ignored; `## Critical` rows not walked | `not tasks: 2`; `malformed — not seeded` (line N) for the bare bullet; Critical row walked as High + `[!critical]` → stay — clause 2 |
| 4 | `- [ ] **CORE-EPIC-9** [heavy] \| x`; heavy `.N`; row with a stub on a split | `stay — clause 1`; `.N` as tier stay; collision with no clause | `stay — epic parent — clause 5`; `stay — .N audit — clause 6`; `stay — collision — .flaitron/sidequest/X.md` (no clause) |
| 5 | Light rows reading "Redeploy the worker", "rotate Secrets", "migrate the table" | undefined: depends on the reader's matching | first two trip clause 3 (inside-word, any case); "migrate" does not trip mechanically, semantic layer still reads it |
| 6 | studio3pnf CORE-055 question option a at 81 words | offered | dropped (`over cap`); fewer than two options → `question — unbounded`. A pin over 70 → split or stay `over cap — N words`. |
| 7 | cloutomaton history `CORE-057`, `CORE-58` | "pad like existing IDs" — ambiguous | max N = 58 written unpadded → `CORE-59`; `CORE-058` alone → `CORE-059`; 58 written both ways → wider |
| 8 | split of a glyph-free source `[heavy] \| x` | mechanical `[light]🔧` | mechanical `[light]`; source `[heavy]🧠` → `[light]🔧` |
| 9 | light row `NAT-537` whose note is `status: blocked`, `park-reason: dependency — X` | mark | `stay — parked — dependency — X — clause 4`; note untouched; in-progress note → `note in flight`; archived note on open row → `archived note` |
| 10 | light row `TEST-005` with `.flaitron/sidequest/TEST-005.md`, declined, a pin fits | stay — collision | pin with `untouched: .flaitron/sidequest/TEST-005.md`; re-scan rechecks the stub; a split/scope on the same row still `collision — <path>` |

Retained restrictions and why: Never-autonomous items still never pin/scope/mark (the act is the person); epic-opening and undecided design never split (whole row / question path); split, scope and riding question still collide (they write or contradict a starter, CORE-797/799); corrections limited to two provable defects (anything else is judgment the walk cannot prove by reading); scope rows exempt from row length (description verbatim).

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh` (the markdown suite; no code changed)

- [x] Ran lint/type-check on changed code — N/A: markdown only; drift checks cover citations, mirrors, budgets, final newlines

- [x] **Verification receipt** — each Acceptance verify command in Testing Notes as `command → exit code` (+ first failure line); changed code free of duplication, dead code, and stale docs (otherwise `N/A` with reason)

- [x] **External review** — a non-author context graded the diff against `## ✅ Acceptance`; findings recorded below (**blocker** → back to Phase 2; **note** → fixed or filed), or `N/A` with reason

- [x] (frontend) Asked the user for visual confirmation (`👁️ **CONFIRM**` on its own line) — N/A: no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

Receipt: `bash tools/drift-checks.sh` → 0 (before and after the review fixes; only pre-existing NEAR CAP lines on files this task did not touch). Seeder body 27,942 of 33,000.

External review — `/code-review medium` over this task's uncommitted diff (10 findings, all notes; none a blocker):

1. Rename detection used `git log --follow`, which traces backward → fixed: `git log -M --diff-filter=R --name-status`, read for `R… <old> <new>`.
2. Inside-word matching trips *reproduction* / *cooperator* → kept (operator decision, case 5); the module now names this as the accepted false-negative cost.
3. A light mark beside a starter skipped the starter's open questions → fixed: a starter with a non-empty `### Open at promotion` keeps the row a stay, `starter open — <path>` (module + body). (Not a regression: before this task, marks read no note at all.)
4. Row length counted "every row" and made 50 a hard limit → fixed: counts the long description; the ≤50 limit is the split rows' existing body rule, with the reason stated.
5. Over-cap correction had no "next class" → fixed: it stays, naming the defect; never a mark.
6. Stay-reason clause endings were ambiguous → fixed: caps enumerated, and which reasons name a clause is spelled out.
7. The "secret" split example failed the Split bullet's own safe-to-ship test → fixed: replaced with a migration-script example, under the Split tests.
8. Step 1 diverged from the parser (emphasis lines, near-miss headings) → fixed: emphasis-less checkbox lines are `not tasks`; emphasized rejects, checkbox-less bold-ID bullets, and near-miss headings are `malformed — not seeded`.
9. "Never repairs" vs the correction class → fixed: the module says the seeder rewrites only as a kept preparation, with every defect but the Correction's two left as is; the body's Notes say "never repairs unasked".
10. Re-scan didn't recheck correction facts → fixed: a kept correction whose defect no longer holds or whose fix target is gone is skipped.

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — no change. `claude/AGENTS-snippet.md` line 25 lists the declined-row preparations and points at §"Seeding an existing plan"; a correction acts on admitted rows, so the line stays true (and the snippet is at 97% of its cap). `docs/EXTERNAL-AGENTS.md`, `README.md`, `SPEC.md`, `docs/MIGRATION.md` name no changed rule. Codex wrapper is a pointer.

- [x] Closed — Acceptance ticked or annotated (`N/A` / not met + reason), YAML `status: completed`, PLAN.md line → `Completed YYYY-MM-DD.` stub (standalone → top of `## Completed`; epic child → stays nested under its parent), then tasknote moved to `.flaitron/tasknote/archive/<area>/`

- [x] **Evidence-based recap** drafted — changed files, verification results, refactors, doc verdict, `touches:` reconciliation (`git diff --name-only` vs declared), maintainability effect

- [x] **Learnings** — N/A: seeder-local policy; nothing for the always-loaded layer

**Final Summary:**

All ten NAT-551 seeder gaps are resolved per the operator's picks: a separable-act split exception to §"Never autonomous"; a seeder-only **Correction** class for two provable defects (self-matching root grep, a missing path with one recorded rename); parser-aligned collection with `not tasks` / `malformed — not seeded` reporting (legacy `## Critical` walked, staying on clause 2); one decisive **Stay reason**; inside-word, case-insensitive keyword matching; a **Row length** rule (pins, corrections and options ≤70, split rows ≤50); padding to the max ID's written width (`SPEC/plan-filing.md`); a glyph on a mechanical row only when its source has one; and **Notes and stubs**, which reads every walked row's note before marks (blocked → parked on clause 4, in flight, archived, starter-with-open-items) and makes collisions per operation. Verification: `bash tools/drift-checks.sh` → 0. The external review raised 10 notes: 9 fixed, 1 kept by operator decision. `touches:` reconciliation: diff = the four declared deliverables + PLAN.md + this note. Maintainability: the policy stays in the module, the procedure in the body; the body has 5,058 bytes of headroom.

**Archived:** 2026-11-14
