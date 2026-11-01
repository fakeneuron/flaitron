---
title: procedure-point-not-narrate
status: completed
tags: [context, procedure]
created: 2026-11-01
due:
related-tasks: [CORE-EPIC-857, CORE-857.1, CORE-856, CORE-724.4]
touches:
  - SPEC/procedures/ft-task.md
  - docs/CONTEXT-BUDGET.md
parallel-safe-with:
  - CORE-857.3
  - CORE-857.6
---

# CORE-857.2 | procedure-point-not-narrate

[← PLAN.md](../PLAN.md) · 🟢 In progress · 🔗 [[CORE-EPIC-857]] [[CORE-857.1]] [[CORE-856]] [[CORE-724.4]]

## 🎯 Goal

Cut `SPEC/procedures/ft-task.md` from 34,197 B to ≤26,000 B by replacing its SPEC re-narrations with one-line pointers to the owning sections, keeping every executable fact and CI-guarded literal, and lower its CONTEXT-BUDGET cap to match.

## ✅ Acceptance

- [x] `SPEC/procedures/ft-task.md` is ≤26,000 B — `test $(wc -c < SPEC/procedures/ft-task.md) -le 26000` → 0 (25,042; the ~24,500 landing I aimed for gave back 205 B to pass-2 review fixes, leaving ~1.1–1.8 units for `.5`)
- [x] The six named re-narrations (Phase 4 list, parking paragraph, downstream-impact scan, Step 6, marker-vs-mode, Archive skim) are each a pointer to the owning section, plus only the deltas that section lacks — `! grep -q 'Parking, in one paragraph' SPEC/procedures/ft-task.md && grep -q 'Downstream-impact reconciliation"' SPEC/procedures/ft-task.md` + `judgment` (pointer shape is read, not grepped)
- [x] No executable fact lost: every fact cut has an owner section that carries it, or stays compressed in place (operator rule: fact beats bytes) — `judgment`, decided by the fact ledger in Implementation Notes and the External review
- [x] Every new or kept `§"…"` pointer resolves, and inbound citations (`§"Agent-neutral primitives"`) still land — `bash tools/drift-checks.sh pair_q`
- [x] `docs/CONTEXT-BUDGET.md` cap for the procedure lowered to 26,000 with a cap-history entry — `grep -qF '| \`SPEC/procedures/ft-task.md\` | 26,000 |' docs/CONTEXT-BUDGET.md && bash tools/drift-checks.sh context_budget`
- [x] SPEC.md untouched (`.6` edits it in parallel) and the full drift job green — `git diff --quiet HEAD -- SPEC.md && bash tools/drift-checks.sh`
- [x] Phase 4 doc-drift sweep across `.flaitron/tasknote/README.md` §"AI-referenced docs" — `judgment`: all "no change" (below)

## 🧩 Subtasks

- [ ] Fact ledger per cut site: owner section, facts it carries, deltas that stay (Implementation Notes)
- [ ] Six named sites → pointers (Phase 4 list, parking, downstream scan, Step 6, marker-vs-mode, Archive skim)
- [ ] Extended B2 sites: unattended row → read-now, purpose blurb, Step 2 area / model / epic, Step 3 dirt gate + C trims, Phase 1 bullets, exit gate, Phase 2 core, Phase 3 receipt / review prose, cross-repo
- [ ] Measure; iterate to ~24,500 B without dropping a ledger fact
- [ ] `docs/CONTEXT-BUDGET.md`: cap 34,200 → 26,000 + history row
- [ ] Phase 3: `pair_q`, `context_budget`, full `drift-checks.sh`, `git diff --check`, External review
- [ ] Phase 4 closure

## 🔗 Related

- [[CORE-EPIC-857]] — parent epic
- [[CORE-857.1]] — Discovery that filed this child (Fan-out: parallel with `.3`, `.6`; `.5` follows this)
- [[CORE-856]] — the survey whose bucket table measured the 14,650 B re-narration
- [[CORE-724.4]] — the prior point-not-narrate pass on this file (9 blockers: cuts that took a unique rule with them)

---

## 📝 Phase 1: Discovery

- [x] Reviewed the task entry in PLAN.md

- [x] **Relevance Assessment**

  **Verdict:** Proceed
  **Rationale:** The six named blocks measure exactly as the survey reported. The ≤26,000 target holds once the pass extends to the file's other B2 sites, which the operator chose; the file set (procedure + CONTEXT-BUDGET) is unchanged.

- [x] Read relevant source files — the whole procedure, `SPEC.md`, and each owning section the pointers target: `SPEC/gate-postures.md`, `claude/skills/ft-task/step-0-flags.md`, `unattended-mode.md` §§"The park recipe" / "What `--unattended` never relaxes", `SPEC/blocked.md` §"Park reason", `SPEC/unattended-candidacy.md` §"Persistence", `SPEC/task-line-segments.md` §"Segment table", `SPEC/tasknote-selection.md` §"Downstream-impact reconciliation", `SPEC/post-closure.md`, `SPEC/gates.md` §§"Phase 1→2 exit gate" / "Conditional skip rule", `SPEC/cue-vocabulary.md` §"🎯 Purpose blurb"

- [x] **Best Practices Review** — Markdown contract surface. The boundary is SPEC (and its lazy modules) owns the rule; the SOP owns the step order, the read-now instruction, and the deltas no owner states. Dependency one-way SOP → owner. No code.

- [x] **Archive skim** — `.1` measured ~192 path hits on this file in `archive/core/`, so I read the direct predecessor rather than probe the lot: [[CORE-724.4]] (findings below), plus the cap-history chain in `docs/CONTEXT-BUDGET.md` (CORE-608 / 670.3 / 678.2 / 724.4 / 738 / 741.4 / 850.5)

- [x] **Drift check** — `wc -c` 34,197 ✓; the survey's six line ranges match HEAD ✓; CONTEXT-BUDGET cap 34,200 ✓; PLAN row read fresh. Every SPEC.md heading I will cite sits outside `.6`'s extraction list (§What is Flaitron / §Core principles / §What flaitron does NOT provide / §Phase 3 test-strategy prose), and `.1` records that `.6` moves prose, never headings ✓. No drift.

- [x] Asked clarifying questions — resolved via AskUserQuestion, table below

- [x] Subtasks above populated with ordered steps; YAML `touches:` declared

**Discovery Notes:**

**Budget arithmetic.** The six named blocks total 8,484 B. Even cut to nothing, minus ~1,500 B of pointers, they net ~7,000 — short of the 8,197 the target needs. Reaching ≤26,000 therefore requires the file's other B2 sites (14,650 B of B2 in all, per the survey table).

**Archive: [[CORE-724.4]] is the risk map.** Its 9 blockers on this file and its siblings were cuts that took a unique rule with them. The ones on this file, each now a fact that must survive: Phase 4 "flip nothing unless the commit lands this turn" (gate on items 3–8); unattended Re-scope "no PLAN edit / no tasknote deletion"; write-once anti-misread clause at the `status:` flip; epic-child nesting "until the closure that leaves every child `[x]` moves the cohort"; recap/handoff ordered **before** verify and move; `--fast` Re-scope behaviour cited to gate-postures §"`--fast` operator override" (not §"Park conversions"). Its operator decision kept the Phase 2–3 mode narration; that decision stands (below).

**Guards on this file.** No drift-check pair and no `/ft-release` mirror pair reads the procedure's text (`git grep`): its CI surface is `pair_q` (every `§"…"` resolves), `context_budget`, and `final_newline`. Inbound citation to keep: `§"Agent-neutral primitives"` (`claude/CAPABILITIES.md`, `docs/AGENT-NEUTRALITY.md`). `last-verified:` is a SOP↔source sync stamp; content edits (724.4, 850.5) have not bumped it, and this task does not run the tier-1 source walk, so it stays.

**Owner coverage (verified by reading, not recall).**

| Site | Owner | Owner carries | Delta that stays in the SOP |
|---|---|---|---|
| Parking ¶ L63-87 | `unattended-mode.md` §"The park recipe" + §"What `--unattended` never relaxes"; `blocked.md` §"Park reason" | status/chip/`park-reason:`, stop, lone-park commit, "never performs the operator's motion", paper-complete, deferred filing + `unattended-candidates:` copy, "a park files nothing", clear on resume | the instruction to *read* the fragment: today the unattended row only says "Full contract" (debug / loop / micro rows say "read now") |
| Marker-vs-mode L132-146 | `task-line-segments.md` §"Segment table" `[unattended]` row; gate-postures §"`--fast` operator override" | implies `--fast` only, never the posture; deny-by-default; flaitron never writes it | "say so inline" + read gate-postures |
| Downstream scan L375-391 | `tasknote-selection.md` §"Downstream-impact reconciliation" | triggers, enumerate / classify / propose, confirm gate | inline-not-banner; runs under autonomous mode; unattended → Re-scope → `drift` (also in `unattended-mode.md`, but kept as Phase 2 mode narration) |
| Step 6 L475-505 | `post-closure.md`; gates.md §"Conditional skip rule" | the three steps, rotation, re-read, terminal form, picks, 👇; actual-diff rule; skip marker; flag overrides | read-now + one-sentence mode delta |
| Archive skim L304-316 | SPEC.md §"📝 Phase 1: Discovery" (always loaded) | near-verbatim | the concrete `ls` + grep motion |
| Phase 4 L431-473 | SPEC.md §"🚀 Phase 4" + §"Paper-complete guard" + §"Task-line format" | rules + rationale | the order, the commit-this-turn gate, `**Archived:**` stamp, stub literal, cohort-move cite, mechanical pre-move verify, the two anti-misread clauses |
| Purpose blurb L148-165 | `cue-vocabulary.md` §"🎯 Purpose blurb" | timing, bounds, flag non-suppression, rationale | the emission shape + "emit here, continue" |

**Resolved scoping** (AskUserQuestion, 2026-11-01):

| question | answer |
|---|---|
| Reach beyond the six named sites to hit ≤26,000? | Yes, extend to the other B2 sites (purpose blurb, Step 3 dirt gate, Step 2 model check, exit gate, Step 6 mode deltas, C rationale) |
| Unique fact vs byte target | The fact stays compressed in the SOP; only this file + CONTEXT-BUDGET change; if the target is missed, set the cap to the landed size and say so |
| Phase 2–3 mode narration (CORE-724.4 kept it) | Keep it; cut only the downstream scan (keeping its unattended delta) and lightly trim the non-mode receipt / review prose SPEC.md already carries |

Assumptions: SPEC.md is off-limits (`.6`, parallel). No unique fact moves to an owner module. `last-verified:` stays unbumped.

## 🛠️ Phase 2: Execution

- [x] **Pattern survey** — extended the SOP's own "read `<fragment>` now" shape (its debug / loop / micro rows) to the unattended row, and CORE-724.4's "pointer + executable delta" shape everywhere else

- [x] **Minimal refactor gate** — no restructuring. Step order, headings, and the inbound-cited §"Agent-neutral primitives" are unchanged; only prose inside sections moved to pointers

- [x] Implemented the minimal solution

- [x] Updated/added tests for non-trivial behavior — `N/A`: markdown contract; `pair_q` resolves every pointer

**Implementation Notes:**

`SPEC/procedures/ft-task.md` 34,197 → **24,754** (−9,443, −27.6%). `docs/CONTEXT-BUDGET.md` cap 34,200 → 26,000, giving 1,246 B of headroom (~1.4–2.4 working units, the row's sizing rule). `.5`'s mirror edit is the next expected consumer.

**Fact ledger — what each cut site kept, and where the rest lives.**

| Site | Now | Kept in the SOP (delta the owner lacks, or a 724.4 blocker fact) | Cut, carried by |
|---|---|---|---|
| Unattended row | read-now | **Read `unattended-mode.md` now** + gate-postures + blocked.md; six gates park; 👁️ + Re-scope convert because autonomous mode only delegates them | delegation rationale → gate-postures §"What is inherited, and what is not" |
| Parking ¶ | 2 pointers | the two section cites + "resume is the ordinary blocked path" | every step → `unattended-mode.md` §"The park recipe" (status, chip, `park-reason:`, lone-park commit, stop, never the operator's motion); paper-complete / deferred filing / `unattended-candidates:` copy / parks file nothing → its §"What `--unattended` never relaxes"; clear on resume → `blocked.md` §"Park reason" |
| Cross-repo | 1 line | file it there, never edit from here | CORE-483.3 non-precedent → SPEC.md §"Cross-repo edit remit" → `scope-boundaries.md` |
| Capture ordering | cut | — | SPEC.md §"Task-line format" (always loaded) |
| Marker-vs-mode | 1 ¶ | the bold anti-misread lead; implies autonomous mode, never unattended; say so inline; read gate-postures | operator-vs-caller framing, never written by flaitron, deny-by-default → `task-line-segments.md` §"Segment table" |
| Purpose blurb | shape + bounds | emit-here timing, the 2-line shape, continue same turn, not a cue/gate, no mode suppresses it | rationale → `cue-vocabulary.md` §"🎯 Purpose blurb" |
| Step 2 area | 1 ¶ | lookup table, never derive, no row → ask | default-vs-resolution + `OPS-*` example → SPEC.md §"Task ID convention" |
| Step 2 model | 2 ¶¶ (from 3) | entry-check order + its why; edge-fragment read; three branch behaviors; never silently retag; unattended mismatch parks, never self-retag | "create only when no note/stub; existing note untouched" → gate-postures §"Pre-scaffold stops" |
| Epic IDs | 1 line | read `epic.md` | parent / `.1` / `.N` roles → `epic.md` |
| Step 3 dirt gate | 1 ¶ | porcelain, own-note exemption, `🚧 DIRTY` literal (one line), no auto-clean, unattended stops write-nothing on dirt / collisions / `.N` siblings | `⏸` lines, codes, legacy-numeric caveat → `unattended-mode.md` §"Pre-scaffold stops"; self-dirt rationale → gate-postures |
| Blocked / sidequest | trimmed | every action | C rationale only |
| Phase 1 bullets | motions | Relevance → blocked.md §"Phase 1 entry" + fires exit gate; probe + PLATFORMS fallback; concrete `ls` / `grep -l` archive motion, ~3-hit probe line, re-check `<area>`; both drift halves; Clarify / Acceptance / Subtasks unchanged | probe definition, archive-skim prose, BPR detail → SPEC.md §"📝 Phase 1: Discovery" |
| Exit gate | trimmed | skip marker literal, fire + preview, De-scope always fires, `--fast` Re-scope (cited to §"`--fast` operator override" — 724.4 pass-2 #4), unattended no-PLAN-edit / no-delete (724.4 #2) | example judgment line → gates.md |
| Phase 2 core | 1 sentence | survey / minimal / refactor-gate reason / tests; hard dep → park | detail → SPEC.md §"🛠️ Phase 2: Execution" |
| Downstream scan | pointer + 3 deltas | read the section; beyond-task trigger + inside-task skip; inline not banner; runs under autonomous mode; unattended → Re-scope → `drift` | enumerate / classify / propose / confirm → `tasknote-selection.md` §"Downstream-impact reconciliation" |
| Phase 3 | mode narration kept | unattended validation set, receipt, external review scope + rungs, 👁️ shape, debug re-verify (operator kept Phase 2–3 mode narration) | structural-half list, rung/N/A bound → SPEC.md §"🧪 Phase 3" |
| Phase 4 list | 8 items kept | commit-this-turn gate on 3–8 (724.4 #1); order with recap before verify/move (724.4 pass-2 #1); no nav-chip flip; write-once clause (724.4 #5); `**Archived:**` stamp; stub literal + tokens verbatim; cohort-move cite (724.4 #7); mechanical pre-move verify | annotation forms, `touches:` exclusions, superseded-claim staging, deferred-filing cite, Pair P link → SPEC.md §"🚀 Phase 4: Closure" / §"Paper-complete guard" |
| Step 6 | 1 ¶ | read post-closure now; branch on §"Conditional skip rule" from the actual diff; stage under the guard; autonomous forces skip naming signals; in-📦 prompt fires / parks `input-needed` | marker literal, rotation, re-read, terminal form, picks, copy-paste, 👇 → `post-closure.md` + gates.md; "steps 2–3 never share a turn with 📦" → post-closure intro + SPEC §"Paper-complete guard" |

Added one intro sentence that states the convention: a cited lazy module is read at that step, and a sentence kept beside a citation is a delta its owner lacks. It tells the weakest runner how to read pointers, and tells the next trimmer that those sentences are deliberate.

## 🧪 Phase 3: Testing & Linting

- [x] Ran targeted test suite for changed code — `bash tools/drift-checks.sh pair_q` / `context_budget` (the markdown surface's tests)

- [x] Ran lint/type-check on changed code — full `bash tools/drift-checks.sh` + `git diff --check`

- [x] **Verification receipt** — receipt below; structural half: no duplicated rule introduced, nothing dead, the CONTEXT-BUDGET row restated to match the new size

- [x] **External review** — two `/code-review medium` passes over the working-tree diff. Pass 1: 2 blockers (fixed, back to Phase 2, Phase 3 re-run) + 4 notes. Pass 2: 0 blockers, 8 notes (5 fixed, 3 no change with evidence). Below.

- [x] (frontend) `N/A` — no rendered surface

**Choosing a test strategy:** see SPEC.md §"🧪 Phase 3: Testing & Linting".

**Testing Notes:**

```text
test $(wc -c < SPEC/procedures/ft-task.md) -le 26000                         → 0   (24,754)
! grep -q 'Parking, in one paragraph' … && grep -q 'Downstream-impact reconciliation"' … → 0
bash tools/drift-checks.sh pair_q                                             → 0   (pair_q ok)
grep -qF '| `SPEC/procedures/ft-task.md` | 26,000 |' docs/CONTEXT-BUDGET.md && bash tools/drift-checks.sh context_budget → 0
git diff --quiet HEAD -- SPEC.md                                              → 0
bash tools/drift-checks.sh                                                    → 0   (19/19 ok)
git diff --check                                                              → 0
```

`grep -c '🚧 DIRTY — commit, stash, or discard first:' SPEC/procedures/ft-task.md` → 1. My first draft line-wrapped this literal inside its backticks; caught on re-read and fixed before the receipt.

**External review — pass 1** (`/code-review medium`, working tree; this run made no commits). It confirmed that the cited owner sections carry the facts the pointers lean on. 2 blockers, 4 notes:

1. **Blocker.** The new Relevance line "Either non-`Proceed` verdict fires the exit gate" contradicted the contract: under autonomous mode a Re-scope gets a ⚠️ notice, and under unattended mode it parks. A wrong rule I introduced → reworded to "The exit gate below routes either non-`Proceed` verdict, per mode."
2. **Blocker.** Cutting the parking paragraph dropped its unique translation that `/ft-file-task --unattended` is Claude's spelling of a platform-neutral filing motion. The unattended row now sends a non-Claude runner into a Claude fragment that names it → restored on the row, with `/ft-task` steps read as this SOP's steps, citing SPEC.md §"Deferred hand-off filing".
3. **Note, no change.** Bare `` `unattended-mode.md` §"…" `` cites, not links. That is the form the file already used for the same fragment (old L69), and `pair_q` shape 1 resolves it.
4. **Note, fixed.** Phase 4 item 1 lost the sweep's scope and record → restored as one line (README §"AI-referenced docs", per-entry "no change" or the update).
5. **Note, fixed.** External-review `N/A` lost its bound → "only for a diff too small to grade — one that would have skipped the tasknote" (SPEC.md §"🧪 Phase 3").
6. **Note, no change.** Marker ordering at capture: SPEC.md §"Task-line format" (always loaded) owns it, and both rewrites (Re-scope, the Phase 4 stub) copy the token run *verbatim*, which preserves order by construction.

The fixes cost 354 B (24,754 → 25,108). That left 892 B of headroom, one unit and below the row's sizing rule with `.5` still to land. I recovered it from fragment re-narration whose "read now" fragment carries the text: the loop-row index of step-5, the micro-row log description, the marker's "undecided" gloss, and the in-flight wording. Result: 24,837. Phase 3 re-ran from the top: receipt re-run, all `→ 0`.

**External review — pass 2** (same scope). 0 blockers, 8 notes:

1. **Note, no change — reviewer wrong.** The claim that SPEC lacks the `touches:` exclusion (own tasknote + PLAN row) is false: SPEC.md L507-509 §"Scope reconciliation" states it.
2. **Note, fixed.** Superseded-claim item → "in the same commit" + `SPEC/superseded-claims.md` link.
3. **Note, fixed.** Relevance bullet → restored what each verdict does (Re-scope rewrites the PLAN.md line + header; De-scope closes with the rationale as the final summary), so the exit gate's "still makes its rewrite" doesn't read as autonomous-only.
4. **Note, no change.** `docs/CODEX-VERIFICATION.md` L324 is a dated verification record supporting a `v5.33.0 · 2026-10-01` stamp, already superseded by the SOP's own `v7.0.0 · 2026-10-11`. It is history, and archived evidence is not rewritten. The behaviours it names are still reachable: attended delete-or-park via the `blocked.md` §"Phase 1 entry" cite, the fast park default in the exit gate, scope exclusions in SPEC, fresh re-read in `post-closure.md`.
5. **Note, fixed.** Item 6 → `SPEC.md` §"Deferred hand-off filing" cite restored.
6. **Note, no change.** Bare `unattended-mode.md` §cites, a repeat of pass 1 #3. `pair_q` shape 1 resolves them, so a rename fails CI.
7. **Note, fixed.** Unattended foreign-dirt stop → names the `⏸` stop line after `🚧 DIRTY` (callers parse it), not only "writes nothing".
8. **Note, fixed — fair.** My new intro sentence claimed every kept sentence beside a citation is a delta, but some are the step's executable form or anti-misread restatements. Cut to "A step that cites a lazy module means *read it at that step*." The fact ledger above records which is which.

The fixes net +205 B → **25,042**, leaving 958 B under the 26,000 cap (~1.1–1.8 working units). That fits one substantial edit, `.5`'s queued mirror. I kept the PLAN row's 26,000 target as the cap and restated the row's unit range honestly rather than trim further. Final receipt on this diff:

```text
test $(wc -c < SPEC/procedures/ft-task.md) -le 26000                         → 0   (25,042)
! grep -q 'Parking, in one paragraph' … && grep -q 'Downstream-impact reconciliation"' … → 0
bash tools/drift-checks.sh pair_q                                             → 0
grep -qF '| `SPEC/procedures/ft-task.md` | 26,000 |' … && bash tools/drift-checks.sh context_budget → 0
git diff --quiet HEAD -- SPEC.md                                              → 0
bash tools/drift-checks.sh                                                    → 0   (19/19 ok)
git diff --check                                                              → 0
```

## 🚀 Phase 4: Closure

- [x] **Doc-drift sweep** — all 18 entries "no change". `SPEC.md` is untouched by design (`.6`). README / AGENTS.md / the four snippets / AGENT-COMPAT / PLATFORMS name the procedure only as a routing target (a pointer file exists), with no claim about its prose. `docs/AGENT-NEUTRALITY.md`'s row already covers "flag, model-edge, promotion, resume, debug, loop, micro and unattended fragments; their flag/tool vocabulary", which the new read-now unattended row and its `/ft-file-task --unattended` translation fall under. `claude/CAPABILITIES.md`'s `--debug` / `--micro` rows cite §"Agent-neutral primitives", which is kept. MIGRATION, CONVENTIONS, CONTRIBUTING, SECURITY, EXTERNAL-AGENTS, WORKTREES, VISION: no mention.

- [x] Closed — Acceptance ticked, YAML `status: completed`, `.2` row → `Completed 2026-11-01.` stub nested under CORE-EPIC-857, note moved to `.flaitron/tasknote/archive/core/`

- [x] **Evidence-based recap** — below

- [x] **Learnings** — `N/A`: the lesson (a pointer cut must keep the deltas its owner lacks, including the Claude→neutral translation when it points into a `claude/skills/` fragment) is pull memory in this note and CORE-724.4. The SOP itself now carries the translation pattern.

**Final Summary:**

`SPEC/procedures/ft-task.md`, the Codex/Cursor/Grok runner body, no longer re-narrates SPEC. Each restated section is now a pointer to its owner, plus the few deltas the owner lacks. The file went from 34,197 to 25,042 B (−9,155, −26.8%), and its CONTEXT-BUDGET cap from 34,200 to 26,000.

- **Changed:** `SPEC/procedures/ft-task.md` (the six named sites plus the operator-approved extension: unattended row → read-now with translation, purpose blurb, Step 2 area / model / epic, Step 3 dirt gate, Phase 1 bullets, exit gate, Phase 2 core, Step 6) and `docs/CONTEXT-BUDGET.md` (Budgets row 26,000 + unit range; Cap history entry).
- **Verification:** final receipt all `→ 0` — size test, pointer greps, `pair_q`, `context_budget`, SPEC.md untouched, full drift job 19/19, `git diff --check`.
- **Review:** two `/code-review medium` passes. Pass 1 caught 2 blockers, both the CORE-724.4 failure mode: a Relevance line I wrote that contradicted the mode routing, and a Claude→neutral translation lost with the parking paragraph. Both were fixed and Phase 3 re-ran. Pass 2: 0 blockers; 5 notes fixed, 3 declined with evidence (one factually wrong: SPEC L507-509 carries the `touches:` exclusion).
- **Refactors:** none. Step order, headings, and the inbound-cited §"Agent-neutral primitives" are unchanged.
- **Docs:** the doc-drift sweep is all "no change". `last-verified:` is left unbumped, because this task did not run the tier-1 source walk.
- **Scope:** Declared 2 files, changed 2. Undeclared: none.
- **Maintainability:** the non-Claude cold start drops ~9.2 KB. Every pointer is `pair_q`-checked, so an owner heading rename fails CI rather than silently orphaning a step. The fact ledger in Implementation Notes is the map for `.5` (which mirrors its routing change into this file next) and for `.N`'s re-measure.

**Archived:** 2026-11-01
